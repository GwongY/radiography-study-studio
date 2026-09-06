/*
 * Question packs — the guard that the licensed half never leaves the device.
 *
 * A question pack is a publisher test bank. It is legitimate to study from one
 * and it is not legitimate to republish one, and the whole design rests on a
 * single claim: the pack reaches the iPad and reaches nothing else. That claim
 * is made in four places at once, and every one of them fails silently.
 *
 *   - A pack file left under outputs/ deploys to a public site, and the app
 *     keeps working, so nothing tells you.
 *   - A pack entry added to the SW SHELL publishes the URL even when the file
 *     itself is private, and the app keeps working.
 *   - A pack folded into buildProgressExport() rides into a gist that the
 *     reader may later share, and the export still imports cleanly.
 *   - An attempt event carrying the stem rather than the id publishes one
 *     question per answer, into a log designed never to be rewritten.
 *
 * None of the four shows up in use. All four are one careless refactor away.
 * So they are checked on the actual bytes: the real export builder, the real
 * logger, the real request builder, and the real tree.
 *
 * Written BEFORE the feature and watched to fail. A privacy check authored
 * afterwards only ever confirms the shape of what was already built.
 *
 * Usage: node work/pack-privacy-check.mjs
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

let failures = 0;
const fail = (m) => { failures += 1; console.log(`  FAIL  ${m}`); };
const ok = (m) => console.log(`  ok    ${m}`);

/*
 * A distinctive stem. Everything below asks the same question of different
 * bytes — does this string appear where it must not — so it is deliberately
 * unlike anything in the corpus, and searched for whole and in part.
 */
const STEM = 'The zygomaticofacial foramen transmits which unlikely structure';
const OPTIONS = ['the pack canary artery', 'the pack canary vein', 'nothing at all'];
const PACK_ID = 'abct2326-bank-v1';
const QID = 'ch07-q042';
const PACK_DIR = 'work/.packs';

/* ------------------------------------------------------------------ *
 * 1. Nothing pack-shaped sits in the deployed directory.
 * ------------------------------------------------------------------ */
console.log('— no pack reaches the deploy —');

const walk = (dir, out = []) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
};

const outputsFiles = walk(join(root, 'outputs')).map((p) => relative(root, p).replace(/\\/g, '/'));
const packish = outputsFiles.filter((p) => /pack/i.test(p) && /\.(json|ndjson|csv|txt)$/i.test(p));
if (!packish.length) ok('no pack data file under outputs/');
else fail(`pack data under outputs/, which deploys publicly: ${packish.join(', ')}`);

/* The module may live under outputs/ — it is code, not content. What it may
   not do is carry questions inline. */
const packModulePath = join(root, 'outputs/study/question-pack.js');
if (existsSync(packModulePath)) {
  const src = readFileSync(packModulePath, 'utf8');
  const answerish = (src.match(/Answer:\s*[A-E]\b/g) || []).length;
  if (!answerish) ok('outputs/study/question-pack.js carries no embedded questions');
  else fail(`outputs/study/question-pack.js has ${answerish} embedded answer lines`);
} else {
  fail('outputs/study/question-pack.js does not exist yet');
}

/* ------------------------------------------------------------------ *
 * 2. The service worker never names a pack.
 * ------------------------------------------------------------------ */
console.log('— the service worker never publishes pack CONTENT —');
const sw = readFileSync(join(root, 'outputs/sw.js'), 'utf8');
const shellStart = sw.indexOf('const SHELL = [');
const shell = shellStart < 0 ? '' : sw.slice(shellStart, sw.indexOf('];', shellStart));
/*
 * The distinction this check exists to hold, and the one it got wrong first
 * time by matching the word "pack" anywhere: question-pack.js is CODE and
 * MUST be in the shell — work/shell-check.mjs fails if a reachable module is
 * not precached, and an app that cannot open offline is the whole point lost.
 * What may never be here is pack CONTENT: a .json of questions, or anything
 * reaching out of outputs/ into work/.packs.
 */
const entries = [...shell.matchAll(/['"]([^'"]+)['"]/g)].map((m) => m[1]);
const dataInShell = entries.filter((e) => /\.(json|ndjson|csv|txt)(\?|$)/i.test(e) && /pack|bank/i.test(e));
const escapes = entries.filter((e) => e.includes('..') || e.includes('.packs'));
if (shellStart < 0) fail('could not find the SHELL list in outputs/sw.js');
else {
  if (!dataInShell.length) ok(`the SW SHELL precaches no pack data (${entries.length} entries, all code or assets)`);
  else fail(`the SW SHELL precaches pack data, publishing it: ${dataInShell.join(', ')}`);
  if (!escapes.length) ok('no SHELL entry reaches outside outputs/');
  else fail(`a SHELL entry reaches outside outputs/: ${escapes.join(', ')}`);
}

/* ------------------------------------------------------------------ *
 * 3. The pack's output directory is ignored, and nothing is tracked.
 * ------------------------------------------------------------------ */
console.log('— the pack cannot be committed by accident —');
let ignored = false;
try {
  execFileSync('git', ['check-ignore', '-q', `${PACK_DIR}/any-pack.json`], { cwd: root });
  ignored = true;
} catch { ignored = false; }
if (ignored) ok(`${PACK_DIR}/ is gitignored`);
else fail(`${PACK_DIR}/ is NOT gitignored — a pack could be committed`);

let tracked = '';
try {
  tracked = execFileSync('git', ['ls-files', '--', PACK_DIR], { cwd: root, encoding: 'utf8' }).trim();
} catch { /* not a repo; the other checks still stand */ }
if (!tracked) ok('git tracks no pack file');
else fail(`git tracks a pack file: ${tracked.split('\n').join(', ')}`);

/* ------------------------------------------------------------------ *
 * 4. The live seams. These need the browser globals the modules assume.
 * ------------------------------------------------------------------ */
const mem = new Map();
globalThis.localStorage = {
  getItem: (k) => (mem.has(k) ? mem.get(k) : null),
  setItem: (k, v) => { mem.set(k, String(v)); },
  removeItem: (k) => { mem.delete(k); },
  clear: () => mem.clear(),
};
globalThis.fetch = async () => ({ ok: true, status: 200, json: async () => ({}), text: async () => '' });

const load = async (rel) => {
  try { return await import(pathToFileURL(join(root, rel)).href); }
  catch (err) { fail(`cannot import ${rel}: ${err.message.split('\n')[0]}`); return null; }
};

const pack = await load('outputs/study/question-pack.js');
const log = await load('outputs/study/progress-log.js');
const transfer = await load('outputs/study/moving-progress-between.js');

/* ------------------------------------------------------------------ *
 * 4a. The token goes in a header. Same rule as gist sync, different endpoint,
 *     and a rule that holds in one place but not the other is not a rule.
 * ------------------------------------------------------------------ */
console.log('— the pack fetch keeps its credential in a header —');
const TOKEN = 'ghp_ThisIsAFakeTokenForTheCheck0000000000';
if (pack && typeof pack.packRequestFor === 'function') {
  const req = pack.packRequestFor('/repos/owner/private-packs/contents/abct2326.json', { token: TOKEN });
  const url = String(req?.url ?? '');
  const body = String(req?.init?.body ?? '');
  if (!url.includes(TOKEN)) ok('the token is never in the pack URL');
  else fail('THE TOKEN IS IN THE PACK URL');
  if (!body.includes(TOKEN)) ok('the token is never in the pack request body');
  else fail('THE TOKEN IS IN THE PACK REQUEST BODY');
  if (req?.init?.headers?.Authorization === `Bearer ${TOKEN}`) ok('the token is in the Authorization header');
  else fail('the token is not in the Authorization header');
} else {
  fail('question-pack.js does not export packRequestFor');
}

/* ------------------------------------------------------------------ *
 * 4b. An attempt on a pack question logs an id and an outcome. Not a stem.
 * ------------------------------------------------------------------ */
console.log('— an answered pack question logs an id, never the question —');
if (pack && log && typeof pack.packAttemptId === 'function') {
  const itemId = pack.packAttemptId(PACK_ID, QID);
  if (typeof itemId === 'string' && itemId.includes(QID) && !/\s/.test(itemId)) {
    ok(`the attempt id is an id: ${itemId}`);
  } else {
    fail(`packAttemptId did not return an id-shaped string: ${String(itemId)}`);
  }
  log.recordAttempt(itemId, 'recall', { correct: true, confidence: 2, ms: 4200, expectedMs: 14000 },
    { qid: QID, qtype: 'mcq', primary: true });
  const serialised = JSON.stringify(log.events);
  const leaks = [STEM, ...OPTIONS, STEM.split(' ').slice(0, 4).join(' ')]
    .filter((s) => serialised.includes(s));
  if (!leaks.length) ok('the event log contains no stem and no option text');
  else fail(`the event log contains question text: ${leaks[0]}`);
} else {
  fail('question-pack.js does not export packAttemptId');
}

/* ------------------------------------------------------------------ *
 * 4c. The export file is what it claims to be. A pack inside it rides into
 *     the gist, and out again onto whatever device reads that next.
 * ------------------------------------------------------------------ */
console.log('— the progress export carries no pack —');
if (pack && transfer && typeof pack.holdPack === 'function') {
  pack.holdPack({
    format: 'rss.pack',
    packId: PACK_ID,
    questions: [{ qid: QID, stem: STEM, options: OPTIONS, answer: 'B' }],
  });
  const built = transfer.buildProgressExport();
  const payload = JSON.stringify(built);
  const leaks = [STEM, ...OPTIONS].filter((s) => payload.includes(s));
  if (!leaks.length) ok('buildProgressExport() output contains no question text');
  else fail(`buildProgressExport() output contains question text: ${leaks[0]}`);
  const packKeys = Object.keys(built).filter((k) => /pack/i.test(k));
  if (!packKeys.length) ok('the export has no pack key');
  else fail(`the export has a pack key: ${packKeys.join(', ')}`);
} else {
  fail('question-pack.js does not export holdPack — cannot prove the export stays clean');
}

console.log(failures ? `\n${failures} FAILED` : '\nALL PASS');
process.exit(failures ? 1 : 0);
