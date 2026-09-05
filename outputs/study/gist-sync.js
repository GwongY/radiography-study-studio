/*
 * Gist sync — the off-device copy, on the one service this app already depends on
 *
 * Split out along the banner sections. See docs/CODEMAP.md.
 */
import { $$, STORAGE_PREFIX, esc } from './imports.js';
import { read, store, write } from './storage-versioned-keys.js';
import { absorb, applyRebuild, events, readBaseline, writeBaseline } from './progress-log.js';
import { applyProgressImport, buildProgressExport, validateProgressFile } from './moving-progress-between.js';
import { toast } from './small-ui-helpers.js';

/* ------------------------------------------------------------------ *
 * Gist sync
 *
 * WHY GITHUB. A record meant to last four years cannot live only in
 * script-writable storage on one phone: iOS gives a Home Screen web app its own
 * container, a reinstall starts a fresh one, and a browser under storage
 * pressure may clear the origin without telling anyone. The fix is an off-device
 * copy that happens without the reader remembering to make it.
 *
 * Of the places that copy could live, a private gist is the only one that adds
 * NO new point of failure: this app is served from GitHub Pages, so a GitHub
 * outage that loses the gist has already taken the app with it. There is no
 * server to keep alive for four years, no free tier that pauses over the summer
 * holiday, and no second account to remember the password to.
 *
 * WHAT IS STORED. Exactly what the export file holds, in the same format --
 * an index with the mastery records, the item records, the mistake log, the
 * meta and the log's baseline, plus the event log itself. A reader who never
 * touches this app again can open the gist on github.com and read their whole
 * history, or download it and import it by hand.
 *
 * WHY THE LOG IS CHUNKED BY MONTH. The gist API truncates a file over 1 MB and
 * hands back a stub with a raw URL on a different host -- a fetch this app has
 * no way to authorise or rely on. Four years of answering will pass 1 MB well
 * before it passes one year, so the log is split into one file per calendar
 * month: `progress-log-2026-09.json`. Month buckets are stable under appending
 * (only the current month grows) and stable under merging (a sync brings back
 * only the months the other device actually studied in), so a push rewrites two
 * or three small files rather than a growing monolith. No bucket approaches the
 * limit: a heavy month is a few hundred kilobytes.
 *
 * THE TOKEN. A classic personal access token scoped to `gist` and nothing else,
 * held in localStorage on this device. That is a real exposure and the dialog
 * says so plainly: anyone with the unlocked device can read the token and, with
 * it, this reader's gists -- not their repositories, not their account. It is
 * the smallest scope GitHub offers that can write a gist, and it is the price
 * of having no server. A token that is wiped along with the rest of the origin
 * is re-pasted from a password manager; the history it protects comes back.
 *
 * WHAT IS NEVER SENT. The token goes in the Authorization header and nowhere
 * else -- never in a URL, never in the payload, never in the gist description.
 * work/gist-sync-check.mjs asserts that over the real request builders.
 * ------------------------------------------------------------------ */

export const SYNC_KEY = STORAGE_PREFIX + 'sync';
export const API_ROOT = 'https://api.github.com';
export const INDEX_FILE = 'progress-index.json';
export const LOG_PREFIX = 'progress-log-';
export const GIST_DESCRIPTION = 'Radiography Study Studio — study progress (private)';

/* A month of heavy study is a few hundred KB; the API truncates at 1 MB. */
export function bucketFor(at) {
  const d = new Date(at);
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `${LOG_PREFIX}${d.getUTCFullYear()}-${m}.json`;
}

export function bucketise(list) {
  const out = new Map();
  for (const e of list) {
    if (!e || typeof e.at !== 'number') continue;
    const name = bucketFor(e.at);
    if (!out.has(name)) out.set(name, []);
    out.get(name).push(e);
  }
  /* Sorted inside each bucket so an unchanged month serialises identically and
     the push can tell "changed" from "merely re-read". */
  for (const arr of out.values()) arr.sort((a, b) => a.at - b.at || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  return out;
}

/* ------------------------------------------------------------------ *
 * Configuration
 * ------------------------------------------------------------------ */

export function syncConfig() {
  const c = read(SYNC_KEY, null);
  return c && typeof c === 'object' && !Array.isArray(c) ? c : {};
}
export function saveSyncConfig(patch) {
  const next = { ...syncConfig(), ...patch };
  write(SYNC_KEY, next);
  return next;
}
export function isConnected() {
  const c = syncConfig();
  return !!(c.token && c.gistId);
}
export function disconnect() {
  /* The gist is deliberately left alone. Disconnecting a device is not a
     request to destroy the backup — it is usually the opposite. */
  write(SYNC_KEY, {});
}

/* ------------------------------------------------------------------ *
 * Requests
 *
 * Every failure mode gets a sentence a tired reader can act on. "Sync failed"
 * tells you to try again forever; "the token no longer has gist access" tells
 * you where to go.
 * ------------------------------------------------------------------ */

export function requestFor(path, { token, method = 'GET', body = null } = {}) {
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body) headers['Content-Type'] = 'application/json';
  return { url: API_ROOT + path, init: { method, headers, cache: 'no-store', ...(body ? { body } : {}) } };
}

function describeStatus(status) {
  if (status === 401) return 'GitHub rejected the token (401). It may have been revoked, expired, or mistyped.';
  if (status === 403) return 'GitHub refused the request (403). Check the token carries the gist scope, or wait — this can also be the hourly rate limit.';
  if (status === 404) return 'That gist was not found (404). Either the id is wrong, or this token cannot see it.';
  if (status === 422) return 'GitHub could not process the payload (422).';
  if (status >= 500) return `GitHub is having trouble (${status}). Nothing was lost — try again later.`;
  return `GitHub returned ${status}.`;
}

async function api(path, opts = {}) {
  const token = opts.token || syncConfig().token;
  if (!token) throw new Error('No token is stored on this device.');
  const { url, init } = requestFor(path, { ...opts, token });
  let res;
  try {
    res = await fetch(url, init);
  } catch {
    throw new Error('Could not reach GitHub. If you are offline, this will retry on its own.');
  }
  if (!res.ok) throw new Error(describeStatus(res.status));
  return res.json();
}

/* ------------------------------------------------------------------ *
 * Reading and writing the gist
 * ------------------------------------------------------------------ */

export function parseGistFiles(files) {
  const index = files && files[INDEX_FILE] ? JSON.parse(files[INDEX_FILE].content) : null;
  const log = [];
  const buckets = {};
  for (const [name, file] of Object.entries(files || {})) {
    if (!name.startsWith(LOG_PREFIX) || !file || typeof file.content !== 'string') continue;
    /*
     * A truncated bucket is a bug in the chunking, not a case to paper over:
     * reading a partial month and pushing it back would DELETE the events that
     * fell past the cut. Refuse, loudly.
     */
    if (file.truncated) throw new Error(`The gist file ${name} is too large for the API to return whole. Nothing was merged; this needs a smaller bucket size.`);
    let parsed = null;
    try { parsed = JSON.parse(file.content); } catch { throw new Error(`The gist file ${name} does not hold valid JSON.`); }
    if (!Array.isArray(parsed)) throw new Error(`The gist file ${name} should hold an array of events.`);
    buckets[name] = parsed;
    for (const e of parsed) log.push(e);
  }
  return { index, log, buckets };
}

export async function fetchRemote() {
  const c = syncConfig();
  const gist = await api(`/gists/${encodeURIComponent(c.gistId)}`);
  const { index, log, buckets } = parseGistFiles(gist.files);
  if (!index) return null;                  /* an empty gist, or someone else's */
  if (index.files && index.files.truncated) throw new Error('The gist index was truncated.');
  const problem = validateProgressFile({ ...index, log });
  if (problem) throw new Error(`The gist does not hold a progress file this app understands — ${problem}`);
  return { index, log, buckets, htmlUrl: gist.html_url };
}

/*
 * Only what actually changed is written. The index always moves (it carries the
 * records and a fresh timestamp); a month bucket moves only if its contents
 * differ from what the gist already holds. In a normal session that is one
 * bucket -- this month's -- so a push over mobile data is a few kilobytes
 * rather than the whole history.
 */
export function filesToWrite(localBuckets, remoteBuckets = {}) {
  const files = {};
  for (const [name, list] of localBuckets) {
    const content = JSON.stringify(list, null, 1);
    const before = remoteBuckets[name] ? JSON.stringify(remoteBuckets[name], null, 1) : null;
    if (content !== before) files[name] = { content };
  }
  return files;
}

export function indexPayload() {
  const p = buildProgressExport();
  /* The log travels in the buckets, not in the index. */
  const { log, ...rest } = p;
  return { ...rest, chunked: true, logCount: log.length };
}

export async function pushRemote(remoteBuckets = {}) {
  const files = filesToWrite(bucketise(events), remoteBuckets);
  files[INDEX_FILE] = { content: JSON.stringify(indexPayload(), null, 1) };
  const body = JSON.stringify({ description: GIST_DESCRIPTION, files });
  const gist = await api(`/gists/${encodeURIComponent(syncConfig().gistId)}`, { method: 'PATCH', body });
  saveSyncConfig({ lastPushAt: Date.now(), gistUrl: gist.html_url, lastError: null });
  return { written: Object.keys(files).length, url: gist.html_url };
}

export async function createGist(token) {
  const files = {};
  for (const [name, list] of bucketise(events)) files[name] = { content: JSON.stringify(list, null, 1) };
  files[INDEX_FILE] = { content: JSON.stringify(indexPayload(), null, 1) };
  const body = JSON.stringify({ public: false, description: GIST_DESCRIPTION, files });
  const gist = await api('/gists', { method: 'POST', body, token });
  saveSyncConfig({ token, gistId: gist.id, gistUrl: gist.html_url, lastPushAt: Date.now(), lastError: null });
  return gist;
}

/* ------------------------------------------------------------------ *
 * Reconciling
 *
 * Three outcomes, and which one happened is reported rather than hidden,
 * because they differ in how much of the history is exact.
 *
 *   ADOPTED  — this device has nothing of its own. Take the remote wholesale.
 *              This is the case that matters most: a replacement phone, or a
 *              reinstall after the container was cleared. Its baseline is 0, so
 *              the record is REBUILT from the log rather than inherited as a
 *              snapshot, and every attempt in the log is accounted for.
 *
 *   REBUILT  — both sides have logs and neither carries pre-log history
 *              (both baselines at 0). The union of the two logs is the complete
 *              set of attempts ever made on either device, so replaying it is
 *              exact: nothing is dropped, nothing is double-counted, and the
 *              result is the record a single device would have had.
 *
 *   MERGED   — at least one side carries a baseline snapshot from before the
 *              log existed, which cannot be folded with the other. Records fall
 *              back to the old rule (newer lastSeen wins, the other is dropped)
 *              while the LOGS still union losslessly. So even here nothing is
 *              destroyed: the complete history survives in the log and a later
 *              rebuild can use it, even though today's derived numbers cannot.
 * ------------------------------------------------------------------ */

export function reconcile(remote) {
  const before = events.length;
  const localBaseline = readBaseline() || { at: 0, mastery: {}, items: {} };
  /* A device holding events is not a blank device, even if its records were
     wiped: merging and replaying its own log is exact, and adopting would
     throw that log away. Blank means blank. */
  const localEmpty = !events.length && !Object.keys(store.mastery).length && !Object.keys(store.items).length;

  if (!remote) return { mode: 'seeded', pulled: 0 };

  const remoteBaseline = remote.index.baseline && typeof remote.index.baseline.at === 'number'
    ? remote.index.baseline : { at: 0, mastery: {}, items: {} };

  if (localEmpty && localBaseline.at === 0) {
    writeBaseline(remoteBaseline);
    applyProgressImport({ ...remote.index, log: remote.log }, 'replace');
    if (remoteBaseline.at === 0) applyRebuild();
    return { mode: 'adopted', pulled: events.length - before };
  }

  applyProgressImport({ ...remote.index, log: remote.log }, 'merge');
  if (localBaseline.at === 0 && remoteBaseline.at === 0) {
    applyRebuild();
    return { mode: 'rebuilt', pulled: events.length - before };
  }
  return { mode: 'merged', pulled: events.length - before };
}

/* ------------------------------------------------------------------ *
 * The sync itself
 * ------------------------------------------------------------------ */

let inFlight = null;
let queued = false;

export async function syncNow() {
  if (!isConnected()) throw new Error('This device is not connected to a gist yet.');
  if (inFlight) { queued = true; return inFlight; }
  inFlight = (async () => {
    try {
      const remote = await fetchRemote();
      const result = reconcile(remote);
      const pushed = await pushRemote(remote ? remote.buckets : {});
      saveSyncConfig({ lastPullAt: Date.now(), lastSyncMode: result.mode, lastError: null });
      return { ...result, ...pushed, events: events.length };
    } catch (err) {
      saveSyncConfig({ lastError: String(err.message || err), lastErrorAt: Date.now() });
      throw err;
    } finally {
      inFlight = null;
    }
  })();
  const out = await inFlight;
  if (queued) { queued = false; return syncNow(); }
  return out;
}

/*
 * The automatic path. Deliberately quiet: a failed background sync writes the
 * reason into the config for the dialog to show and says nothing to a reader in
 * the middle of a question. Nothing the app does depends on it succeeding --
 * the local record is authoritative and complete on its own.
 */
export function syncSoon(delay = 4000) {
  if (!isConnected()) return;
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    saveSyncConfig({ pending: true });
    return;
  }
  clearTimeout(syncSoon._t);
  syncSoon._t = setTimeout(() => {
    saveSyncConfig({ pending: false });
    syncNow().catch(() => { /* recorded in the config; the dialog shows it */ });
  }, delay);
}

export function init() {
  if (!isConnected()) return;
  /* Pull before the reader gets far: a device that was restored elsewhere
     should not spend a session answering against an empty schedule. */
  syncSoon(1500);
  try {
    window.addEventListener('online', () => syncSoon(1000));
    /* pagehide, not unload: iOS does not reliably fire unload, and a session
       ended by swiping the app away is exactly when a push matters. */
    window.addEventListener('pagehide', () => { if (isConnected()) syncNow().catch(() => {}); });
  } catch { /* no window: the node load-check evaluates this file too */ }
}

/* ------------------------------------------------------------------ *
 * The dialog
 *
 * One rule shapes all of it: the stored token is never put back into the DOM.
 * The field says whether a token is held, not what it is, so the secret exists
 * in exactly one place a reader can reach it and screen-sharing a settings
 * screen does not leak it.
 * ------------------------------------------------------------------ */

function ago(t) {
  if (!t) return 'never';
  const s = Math.max(0, Math.round((Date.now() - t) / 1000));
  if (s < 90) return `${s}s ago`;
  if (s < 5400) return `${Math.round(s / 60)} min ago`;
  if (s < 172800) return `${Math.round(s / 3600)} h ago`;
  return `${Math.round(s / 86400)} days ago`;
}

const MODE_WORDS = {
  adopted: 'this device was empty, so the whole history was taken from the gist and rebuilt from the log',
  rebuilt: 'both sides were fully logged, so the records were replayed from the merged log — exact',
  merged: 'logs merged in full; records fell back to newer-wins because there is pre-log history in play',
  seeded: 'the gist was empty, so this device seeded it',
};

export function renderSyncDialog() {
  const c = syncConfig();
  const connected = isConnected();
  $$('syncSummary').textContent = connected
    ? `Connected. ${events.length} answer event${events.length === 1 ? '' : 's'} on this device, across ${bucketise(events).size} month file${bucketise(events).size === 1 ? '' : 's'}.`
    : `Not connected. ${events.length} answer event${events.length === 1 ? '' : 's'} are held on this device and nowhere else.`;
  $$('syncToken').placeholder = c.token ? 'A token is stored — type a new one to replace it' : 'ghp_…';
  $$('syncToken').value = '';
  $$('syncGist').value = c.gistId || '';
  $$('syncConnect').textContent = connected ? 'Reconnect' : 'Connect';
  $$('syncNowBtn').disabled = !connected;
  $$('syncDisconnect').disabled = !connected;
  const err = $$('syncError');
  const box = $$('syncStatus');
  if (c.lastError) {
    err.textContent = `${c.lastError} (${ago(c.lastErrorAt)})`;
    err.classList.remove('hidden');
  } else err.classList.add('hidden');
  if (!connected) { box.classList.add('hidden'); return; }
  box.classList.remove('hidden');
  box.innerHTML = `<ul class="facts">
    <li>Last pulled <strong>${esc(ago(c.lastPullAt))}</strong>, last written <strong>${esc(ago(c.lastPushAt))}</strong>.</li>
    <li>Last merge: <strong>${esc(MODE_WORDS[c.lastSyncMode] || 'not yet synced')}</strong>.</li>
    ${c.pending ? '<li>A sync is waiting for the network.</li>' : ''}
    ${c.gistUrl ? `<li class="mono"><a href="${esc(c.gistUrl)}" target="_blank" rel="noopener">Open the gist on github.com</a></li>` : ''}
  </ul>`;
}

/*
 * Opened through the window hook rather than by importing openDialog: that
 * module touches the DOM as it evaluates, and importing it here would make this
 * file unloadable in node -- which is where the whole sync protocol is checked.
 */
export function openSyncDialog() {
  renderSyncDialog();
  const d = $$('syncDialog');
  if (window.__rssOpenDialog) window.__rssOpenDialog(d); else d.showModal();
}

function busy(on, label) {
  for (const id of ['syncConnect', 'syncNowBtn', 'syncDisconnect']) $$(id).disabled = on;
  if (on) $$('syncConnect').textContent = label;
}

/*
 * Shown AFTER the dialog is re-rendered, never before.
 *
 * renderSyncDialog() decides the error box from the stored config, and a
 * connect that fails before it is ever connected has nothing stored -- so
 * setting the message first and re-rendering second wiped it, and a mistyped
 * token looked like nothing happening at all.
 */
function showError(msg) {
  const el = $$('syncError');
  el.textContent = msg;
  el.classList.remove('hidden');
}

export async function handleConnect() {
  const token = ($$('syncToken').value || '').trim() || syncConfig().token;
  const gistId = ($$('syncGist').value || '').trim();
  $$('syncError').classList.add('hidden');
  if (!token) {
    $$('syncError').textContent = 'A token is needed before this device can reach a gist.';
    $$('syncError').classList.remove('hidden');
    return;
  }
  busy(true, 'Connecting…');
  let problem = null;
  try {
    if (!gistId) {
      const gist = await createGist(token);
      toast(`Created a private gist and wrote ${events.length} event${events.length === 1 ? '' : 's'} to it.`);
      saveSyncConfig({ gistUrl: gist.html_url });
    } else {
      saveSyncConfig({ token, gistId });
      const r = await syncNow();
      toast(`Synced — ${r.pulled} event${r.pulled === 1 ? '' : 's'} pulled in, ${r.written} file${r.written === 1 ? '' : 's'} written.`);
    }
  } catch (err) {
    problem = String(err.message || err);
  } finally {
    busy(false);
    renderSyncDialog();
    if (problem) showError(problem);
  }
}

export async function handleSyncNow() {
  busy(true, 'Syncing…');
  $$('syncError').classList.add('hidden');
  let problem = null;
  try {
    const r = await syncNow();
    toast(`Synced — ${r.pulled} event${r.pulled === 1 ? '' : 's'} pulled in, ${r.written} file${r.written === 1 ? '' : 's'} written.`);
  } catch (err) {
    problem = String(err.message || err);
  } finally {
    busy(false);
    renderSyncDialog();
    if (problem) showError(problem);
  }
}

export function handleDisconnect() {
  disconnect();
  toast('Disconnected. The gist is untouched — reconnect with the same id to pull it back.');
  renderSyncDialog();
}
