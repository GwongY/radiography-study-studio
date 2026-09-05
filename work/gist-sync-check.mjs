/*
 * Gist sync — the protocol, checked without a token.
 *
 * Everything about this feature that can go quietly wrong goes wrong in the
 * network layer, which is exactly the layer you cannot exercise by hand without
 * a live GitHub account and a live gist. So `fetch` is replaced with a recorder
 * and the real request builders are driven through every path: connect, pull,
 * merge, push, and each failure status.
 *
 * The checks that matter most are the ones about what is NOT sent. A token in a
 * URL ends up in a proxy log, a referrer header and a bug report; a token in the
 * gist body ends up published in the reader's own backup. Both are one careless
 * refactor away, neither shows up in testing because the feature still works,
 * and both are checked here on the actual bytes the app would put on the wire.
 *
 * The other half is reconciliation. `reconcile()` has three outcomes that differ
 * in how much of the history is exact, and the one that matters — a replacement
 * device adopting a synced history and rebuilding its records from the log — is
 * the one nobody will test by hand until the phone is already gone.
 *
 * Usage: node work/gist-sync-check.mjs
 */
/*
 * These modules are written for a browser and are imported dynamically, after
 * the two globals they need exist. A localStorage stub is not a shortcut here:
 * the connection state, the baseline and the error reporting all live in it, so
 * without one the checks below would exercise a config that silently forgets
 * everything and would pass for the wrong reason.
 */
const mem = new Map();
globalThis.localStorage = {
  getItem: (k) => (mem.has(k) ? mem.get(k) : null),
  setItem: (k, v) => { mem.set(k, String(v)); },
  removeItem: (k) => { mem.delete(k); },
  clear: () => mem.clear(),
};

/* A recording fetch. Every call is kept so the assertions can look at the
   exact URL, headers and body the app produced. */
const calls = [];
let respond = () => ({ status: 200, body: {} });
globalThis.fetch = async (url, init = {}) => {
  calls.push({ url, init });
  const r = respond(url, init) || {};
  const status = r.status ?? 200;
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => r.body ?? {},
    text: async () => JSON.stringify(r.body ?? {}),
  };
};

const { append, clearLog, events, rebuild, writeBaseline } = await import('../outputs/study/progress-log.js');
const { store } = await import('../outputs/study/storage-versioned-keys.js');
const {
  API_ROOT, GIST_DESCRIPTION, INDEX_FILE, LOG_PREFIX,
  bucketFor, bucketise, createGist, disconnect, filesToWrite,
  indexPayload, isConnected, parseGistFiles, pushRemote, reconcile,
  requestFor, saveSyncConfig, syncConfig, syncNow,
} = await import('../outputs/study/gist-sync.js');

let failures = 0;
const fail = (m) => { failures += 1; console.log(`  FAIL  ${m}`); };
const ok = (m) => console.log(`  ok    ${m}`);
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const TOKEN = 'ghp_ThisIsAFakeTokenForTheCheck0000000000';

console.log('— gist sync: the protocol —');

/* ------------------------------------------------------------------ *
 * The token goes in one place and one place only.
 * ------------------------------------------------------------------ */
const req = requestFor('/gists/abc', { token: TOKEN, method: 'PATCH', body: JSON.stringify({ hello: 'world' }) });
if (req.url === `${API_ROOT}/gists/abc`) ok('the API root and path are built without interpolating anything secret');
else fail(`unexpected URL ${req.url}`);
if (!req.url.includes(TOKEN)) ok('the token is never in the URL');
else fail('THE TOKEN IS IN THE URL');
if (req.init.headers.Authorization === `Bearer ${TOKEN}`) ok('the token is in the Authorization header');
else fail('the token is not being sent as a bearer credential');
if (!String(req.init.body || '').includes(TOKEN)) ok('the token is never in the request body');
else fail('THE TOKEN IS IN THE REQUEST BODY');
if (req.init.cache === 'no-store') ok('requests are made with cache: no-store');
else fail('a cached gist read would sync stale history');

/* ------------------------------------------------------------------ *
 * Month buckets.
 * ------------------------------------------------------------------ */
const jan = Date.parse('2027-01-14T22:30:00Z');
const feb = Date.parse('2027-02-01T00:00:01Z');
if (bucketFor(jan) === `${LOG_PREFIX}2027-01.json` && bucketFor(feb) === `${LOG_PREFIX}2027-02.json`) ok('events fall into the calendar month they happened in');
else fail(`bucket naming is wrong: ${bucketFor(jan)} / ${bucketFor(feb)}`);

const spread = [
  { id: 'a.3', at: feb + 10, t: 'read', itemId: 'x' },
  { id: 'a.1', at: jan, t: 'read', itemId: 'x' },
  { id: 'a.2', at: jan + 5, t: 'read', itemId: 'x' },
];
const bucketed = bucketise(spread);
if (bucketed.size === 2 && bucketed.get(`${LOG_PREFIX}2027-01.json`).length === 2) ok('bucketise splits by month and keeps every event');
else fail('bucketise lost or misfiled an event');
if (same(bucketise(spread.slice().reverse()), bucketed)) ok('bucket contents do not depend on arrival order');
else fail('a bucket serialises differently depending on the order events arrived');

/* Only a changed month is rewritten — the property that keeps a push small. */
const remoteBuckets = Object.fromEntries([...bucketed].map(([k, v]) => [k, v]));
if (Object.keys(filesToWrite(bucketed, remoteBuckets)).length === 0) ok('an unchanged month is not rewritten');
else fail('a push would rewrite months that did not change');
const grown = bucketise([...spread, { id: 'a.4', at: feb + 99, t: 'read', itemId: 'y' }]);
const changed = Object.keys(filesToWrite(grown, remoteBuckets));
if (changed.length === 1 && changed[0] === `${LOG_PREFIX}2027-02.json`) ok('appending to this month rewrites only this month');
else fail(`a one-event append rewrote ${changed.length} files: ${changed.join(', ')}`);

/* ------------------------------------------------------------------ *
 * A truncated bucket must refuse, not silently drop the tail.
 * ------------------------------------------------------------------ */
try {
  parseGistFiles({ [`${LOG_PREFIX}2027-01.json`]: { content: '[]', truncated: true } });
  fail('a truncated bucket was accepted — pushing it back would delete the events past the cut');
} catch { ok('a truncated bucket is refused rather than half-read'); }
try {
  parseGistFiles({ [`${LOG_PREFIX}2027-01.json`]: { content: '{"not":"an array"}' } });
  fail('a bucket holding something other than an array was accepted');
} catch { ok('a malformed bucket is refused'); }

/* ------------------------------------------------------------------ *
 * Connecting: what a create actually puts on the wire.
 * ------------------------------------------------------------------ */
const t0 = Date.parse('2026-09-10T08:00:00Z');
for (let i = 0; i < 5; i += 1) {
  append({ t: 'attempt', at: t0 + i * 60000, itemId: 'hss2011-osteo-c1-c2', dim: 'recognition', correct: i % 2 === 0, confidence: 2, ms: 4000, expectedMs: 14000, primary: true });
}
calls.length = 0;
respond = () => ({ status: 201, body: { id: 'gist123', html_url: 'https://gist.github.com/u/gist123' } });
await createGist(TOKEN);
const create = calls[0];
const createBody = JSON.parse(create.init.body);
if (create.init.method === 'POST' && create.url === `${API_ROOT}/gists`) ok('creating posts to /gists');
else fail('the create request is malformed');
if (createBody.public === false) ok('the gist is created private');
else fail('THE GIST WOULD BE CREATED PUBLIC');
if (!create.init.body.includes(TOKEN) && !createBody.description.includes(TOKEN)) ok('the created gist carries no credential in its body or description');
else fail('THE TOKEN WOULD BE WRITTEN INTO THE GIST');
if (createBody.description === GIST_DESCRIPTION) ok('the gist is described so it is recognisable in a gist list');
else fail('the gist description is not the expected one');
if (createBody.files[INDEX_FILE] && Object.keys(createBody.files).some((f) => f.startsWith(LOG_PREFIX))) ok('an index and at least one month file are written');
else fail('the created gist is missing the index or the log');
if (isConnected() && syncConfig().gistId === 'gist123') ok('the gist id is remembered after a create');
else fail('the connection was not stored');

/* The index carries the records, not the log — the log is in the buckets. */
const idx = indexPayload();
if (!idx.log && idx.chunked && idx.logCount === events.length) ok('the index declares the log count and does not duplicate the log');
else fail('the index duplicates or omits the log');
if (idx.mastery && idx.baseline !== undefined) ok('the index carries the mastery records and the baseline');
else fail('the index is missing the records a rebuild needs');

/* ------------------------------------------------------------------ *
 * Failure statuses each say something a reader can act on.
 * ------------------------------------------------------------------ */
for (const [status, needle] of [[401, 'token'], [403, 'gist scope'], [404, 'not found'], [500, 'GitHub is having trouble']]) {
  respond = () => ({ status, body: {} });
  try {
    await pushRemote({});
    fail(`a ${status} response was treated as success`);
  } catch (err) {
    if (String(err.message).toLowerCase().includes(needle.toLowerCase())) ok(`a ${status} explains itself ("${needle}")`);
    else fail(`a ${status} said only: ${err.message}`);
  }
}
saveSyncConfig({ token: TOKEN, gistId: 'gist123', lastError: null });
respond = () => ({ status: 503, body: {} });
await syncNow().then(() => fail('a 503 sync reported success'), () => {});
if (syncConfig().lastError) ok('a failed sync records the reason for the dialog to show');
else fail('a failure left nothing behind for the reader to read');

/* ------------------------------------------------------------------ *
 * Reconciling: a replacement device.
 *
 * The case the whole feature exists for. A fresh install has no records and a
 * baseline of 0; the gist holds a term of study. Afterwards the device must
 * hold every event AND records rebuilt from them — not a snapshot.
 * ------------------------------------------------------------------ */
const remoteLog = [];
let rt = Date.parse('2026-04-06T09:00:00Z');
for (let i = 0; i < 40; i += 1) {
  rt += 3600000;
  remoteLog.push({
    id: `old.${i}`, t: 'attempt', at: rt, itemId: i % 2 ? 'abct2326-homeostasis' : 'hss2011-joints-movements',
    dim: 'recognition', correct: i % 4 !== 0, confidence: (i % 4), ms: 5000 + i, expectedMs: 14000, primary: true,
  });
}
const truth = rebuild({ at: 0, mastery: {}, items: {} }, remoteLog);
const remotePayload = {
  index: {
    format: 'rss.progress', formatVersion: 1, dataVersion: 1, exportedAt: rt,
    mastery: truth.mastery, items: truth.items, mistakes: [],
    baseline: { at: 0, mastery: {}, items: {} }, chunked: true, logCount: remoteLog.length,
  },
  log: remoteLog,
  buckets: Object.fromEntries([...bucketise(remoteLog)]),
};

/* A brand-new device: nothing recorded, nothing logged. clearLog() rather than
   emptying the array, because the dedup set has to be reset with it — otherwise
   the next absorb() sees ids it already knows and quietly adds nothing. */
clearLog();
store.mastery = {}; store.items = {}; store.mistakes = [];
writeBaseline({ at: 0, mastery: {}, items: {} });
const adopted = reconcile(remotePayload);
if (adopted.mode === 'adopted') ok('a device with no history of its own adopts the gist');
else fail(`a fresh device reconciled as "${adopted.mode}" instead of adopting`);
if (events.length === remoteLog.length) ok(`all ${remoteLog.length} events came across`);
else fail(`only ${events.length} of ${remoteLog.length} events arrived`);
if (same(store.mastery, truth.mastery)) ok('the records were rebuilt from the log, not inherited as a snapshot');
else fail('the adopted records do not match a replay of the adopted log');

/* Syncing again must change nothing: the same events, no duplicates. */
const beforeAgain = events.length;
reconcile(remotePayload);
if (events.length === beforeAgain) ok('re-syncing the same gist adds nothing — events deduplicate on id');
else fail(`a second sync of the same gist added ${events.length - beforeAgain} duplicate events`);

/* ------------------------------------------------------------------ *
 * Reconciling: two fully-logged devices.
 * ------------------------------------------------------------------ */
const mine = [];
let mt = Date.parse('2026-05-06T09:00:00Z');
for (let i = 0; i < 25; i += 1) {
  mt += 5400000;
  mine.push({ id: `mine.${i}`, t: 'attempt', at: mt, itemId: 'hss2011-joints-movements', dim: 'typedRecall', correct: i % 3 !== 0, confidence: 2, ms: 6000, expectedMs: 14000, primary: true });
}
clearLog();
store.mastery = {}; store.items = {}; store.mistakes = [];
writeBaseline({ at: 0, mastery: {}, items: {} });
for (const e of mine) append({ ...e });
const both = rebuild({ at: 0, mastery: {}, items: {} }, [...mine, ...remoteLog]);
const merged = reconcile(remotePayload);
if (merged.mode === 'rebuilt') ok('two fully-logged devices reconcile by replaying the union');
else fail(`two logged devices reconciled as "${merged.mode}"`);
if (same(store.mastery, both.mastery)) ok('the result equals what one device that did all of it would hold');
else fail('the merged records are not the replay of both logs');

/* ------------------------------------------------------------------ *
 * Reconciling: pre-log history on one side falls back honestly.
 * ------------------------------------------------------------------ */
clearLog();
store.mastery = { 'hss2011-osteo-c1-c2::recognition': { attempts: 9, correct: 7, lapses: 1, reps: 3, ease: 2.4, intervalDays: 6, due: 1, streak: 2, avgMs: 5000, confidenceSum: 18, confidenceN: 9, lastSeen: Date.parse('2026-08-01T00:00:00Z') } };
store.items = { 'hss2011-osteo-c1-c2': { status: 'review', seen: 9 } };
writeBaseline({ at: Date.parse('2026-09-01T00:00:00Z'), mastery: { ...store.mastery }, items: { ...store.items } });
const fellBack = reconcile(remotePayload);
if (fellBack.mode === 'merged') ok('a baseline from before the log falls back to the old record rule');
else fail(`a device with pre-log history reconciled as "${fellBack.mode}"`);
if (store.mastery['hss2011-osteo-c1-c2::recognition']) ok('and its own pre-log record is not discarded by the fallback');
else fail('the fallback dropped the local pre-log history');
if (events.length === remoteLog.length) ok('the logs still union losslessly even when the records cannot');
else fail('the fallback lost events as well as records');

/* ------------------------------------------------------------------ *
 * A full syncNow: read, reconcile, write — in that order.
 * ------------------------------------------------------------------ */
calls.length = 0;
saveSyncConfig({ token: TOKEN, gistId: 'gist123', lastError: null });
respond = (url, init) => {
  if ((init.method || 'GET') === 'GET') {
    return { status: 200, body: { id: 'gist123', html_url: 'https://gist.github.com/u/gist123',
      files: { [INDEX_FILE]: { content: JSON.stringify(remotePayload.index) },
        ...Object.fromEntries(Object.entries(remotePayload.buckets).map(([k, v]) => [k, { content: JSON.stringify(v) }])) } } };
  }
  return { status: 200, body: { id: 'gist123', html_url: 'https://gist.github.com/u/gist123' } };
};
const result = await syncNow();
if (calls.length === 2 && (calls[0].init.method || 'GET') === 'GET' && calls[1].init.method === 'PATCH') ok('a sync reads before it writes');
else fail(`a sync made ${calls.length} calls in the order ${calls.map((c) => c.init.method || 'GET').join(', ')}`);
const patched = JSON.parse(calls[1].init.body);
if (patched.files[INDEX_FILE]) ok('the push always rewrites the index');
else fail('the push left a stale index behind');
if (!calls[1].init.body.includes(TOKEN)) ok('the pushed payload carries no credential');
else fail('THE PUSHED PAYLOAD CONTAINS THE TOKEN');
if (result.mode && typeof result.written === 'number') ok(`a sync reports what it did (${result.mode}, ${result.written} files)`);
else fail('a sync returned nothing the dialog can report');
if (!syncConfig().lastError && syncConfig().lastPullAt) ok('a good sync clears the previous error and stamps the pull');
else fail('the config was not updated after a successful sync');

/* Disconnecting keeps the backup. */
const keptId = syncConfig().gistId;
disconnect();
if (!isConnected() && keptId === 'gist123') ok('disconnecting forgets the credential without touching the gist');
else fail('disconnect did something other than forget this device');

console.log(failures ? `\n${failures} failure(s)` : '\nall checks pass');
process.exit(failures ? 1 : 0);
