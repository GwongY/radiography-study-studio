/*
 * Question packs — licensed questions that live on this device and nowhere else.
 *
 * A pack is a publisher test bank reshaped into JSON by work/build-question-pack.mjs.
 * It is legitimate to study from one and it is not legitimate to republish one,
 * so the pack is never in this repository, never in the deployed site, and never
 * in the service worker's shell. It is fetched at runtime from a PRIVATE GitHub
 * repository and kept in IndexedDB on the device that fetched it.
 *
 * WHY ITS OWN DATABASE. The answer log opens `rss-progress`, and adding a store
 * to it would mean a version bump on the database holding four years of history
 * — an upgrade transaction that can fail, on the one dataset that cannot be
 * rebuilt from anywhere else. A pack is disposable: it can be re-fetched in
 * seconds. So it gets `rss-packs`, and the two cannot hurt each other.
 *
 * WHY ITS OWN TOKEN. gist-sync.js uses a classic token scoped to `gist` and
 * nothing else, and says plainly what that buys: someone with the unlocked
 * device gets the reader's gists, not their repositories. A `gist` token cannot
 * read a private repo, and widening it to `repo` would trade that bounded
 * exposure for every repository the reader owns. So a pack uses a SEPARATE
 * fine-grained token, read-only on the one pack repository. Same property,
 * kept rather than spent.
 *
 * WHY CHAPTERS. The Contents API stops returning a file's content above 1 MB
 * and the bank is 1.68 MB, so the pack arrives as one file per chapter behind
 * an index — the same cliff the answer log dodges by bucketing per month.
 *
 * WHAT NEVER LEAVES. An answer on a pack question logs `packAttemptId()` — an
 * id — and an outcome, exactly as a corpus question logs its own id. No stem,
 * no option, no answer text reaches the log, the export file or the gist.
 * work/pack-privacy-check.mjs asserts every one of those on the real builders.
 *
 * Split out per docs/CODEMAP.md. Nothing runs at module scope.
 */
import { $$, STORAGE_PREFIX, esc } from './imports.js';

export const PACK_FORMAT = 'rss.pack';
export const PACK_INDEX_FORMAT = 'rss.pack.index';
export const API_ROOT = 'https://api.github.com';

const DB_NAME = 'rss-packs';
const DB_VERSION = 1;
const STORE = 'packs';
const OPEN_TIMEOUT_MS = 3000;

export const PACK_CONFIG_KEY = STORAGE_PREFIX + 'packcfg';

/* Held in memory for the session. IndexedDB is the durable copy; this is what
   the exam pool reads, so a device with no IndexedDB still works for one run. */
let held = null;

/* ------------------------------------------------------------------ *
 * The request builder
 *
 * One place, so there is one answer to "where does the token go". The raw
 * media type matters: without it the API returns a JSON envelope whose
 * `content` field is empty for anything over 1 MB, which fails by returning
 * a valid-looking object rather than an error.
 * ------------------------------------------------------------------ */
export function packRequestFor(path, { token, method = 'GET', body = null } = {}) {
  const headers = { Accept: 'application/vnd.github.raw' };
  if (token) headers.Authorization = `Bearer ${token}`;
  return {
    url: API_ROOT + path,
    init: { method, headers, cache: 'no-store', ...(body ? { body } : {}) },
  };
}

/*
 * The id an answered pack question is recorded under. Deliberately built from
 * ids alone: this string reaches the append-only log, the export file and the
 * gist, and it must carry nothing that could reconstruct the question.
 */
export function packAttemptId(packId, qid) {
  return `pack:${packId}:${qid}`;
}

export function isPackAttemptId(id) {
  return typeof id === 'string' && id.startsWith('pack:');
}

/* ------------------------------------------------------------------ *
 * Config
 * ------------------------------------------------------------------ */
export function packConfig() {
  try { return JSON.parse(localStorage.getItem(PACK_CONFIG_KEY) || '{}') || {}; }
  catch { return {}; }
}

export function savePackConfig(patch) {
  const next = { ...packConfig(), ...patch };
  try { localStorage.setItem(PACK_CONFIG_KEY, JSON.stringify(next)); } catch { /* quota */ }
  return next;
}

export function isPackConnected() {
  const c = packConfig();
  return !!(c.token && c.repo);
}

/*
 * Disconnecting forgets the credential and the questions on THIS device. It
 * does not touch the remote: a device is being detached, not a pack deleted.
 */
export function forgetPack() {
  try { localStorage.removeItem(PACK_CONFIG_KEY); } catch { /* nothing to do */ }
  held = null;
  return dropStored();
}

/* ------------------------------------------------------------------ *
 * Validation — never trust the file
 *
 * The same suspicion validateProgressFile() applies to a transfer file. A pack
 * arrives over the network from a repository a person edits by hand.
 * ------------------------------------------------------------------ */
export function validatePack(data) {
  if (!data || typeof data !== 'object') return 'That is not a pack file.';
  if (data.format !== PACK_FORMAT) return `Not a question pack (format "${data.format ?? 'missing'}").`;
  if (!Array.isArray(data.questions)) return 'The pack has no questions array.';
  if (!data.packId) return 'The pack has no packId.';
  const bad = data.questions.findIndex((q) => !q || !q.qid || !q.type || !q.stem);
  if (bad >= 0) return `Question ${bad + 1} is missing a qid, a type or a stem.`;
  return null;
}

/* ------------------------------------------------------------------ *
 * Holding a pack
 * ------------------------------------------------------------------ */

/* Hold a pack for this session and persist it. Exported because it is the
   seam work/pack-privacy-check.mjs uses to put a known question in memory and
   then prove it does not appear in the export. */
export function holdPack(pack) {
  held = pack || null;
  return store(pack);
}

export function loadedPack() { return held; }

export function packCounts() {
  if (!held) return { total: 0, mcq: 0, short: 0 };
  const mcq = held.questions.filter((q) => q.type === 'mcq').length;
  return { total: held.questions.length, mcq, short: held.questions.length - mcq };
}

/*
 * The label a pack question is grouped and titled by.
 *
 * A single-bank pack has only chapter numbers, so "Chapter 7" is unambiguous.
 * A merged pack (see --merge in work/build-question-pack.mjs) carries the
 * subject each question came from, and without it two different Chapter 7s
 * collapse into one row of the exam breakdown.
 *
 * On-screen only. Nothing this returns is written to the log, the export or
 * the gist -- work/pack-privacy-check.mjs is what holds that.
 */
export function packSubject(q) {
  const raw = q.subject || q.bank || held?.subject || held?.origin?.subject || held?.packId || '';
  return String(raw).toUpperCase().match(/HSS2011|ABCT2326|HTI17103|APSS1A08|DSAI1202/)?.[0] || null;
}

export function packUnitLabel(q) {
  const chapter = `Chapter ${q.chapter ?? '?'}`;
  return q.subject ? `${q.subject} ${chapter}` : chapter;
}

/*
 * The pack's questions in the shape the corpus uses, so exam-mode.js does not
 * have to know a pack exists. Only mcq: `short` questions are model-answer
 * prose and cannot be marked, so serving them in a timed paper would produce
 * a mark that is quietly wrong. They are not discarded — packShortQuestions()
 * below serves them to the untimed self-marked drill under Exam → Short answer.
 *
 * The pack stores options as {letter, text} and the answer as a LETTER; the
 * corpus stores options as strings and the answer as an INDEX. Converting here
 * rather than at build time keeps the pack file a faithful record of the
 * source and keeps the app's own shape in the app.
 */
export function packQuestions() {
  if (!held) return [];
  const out = [];
  for (const q of held.questions) {
    if (q.type !== 'mcq' || !Array.isArray(q.options)) continue;
    const idx = q.options.findIndex((o) => o.letter === q.answer);
    if (idx < 0) continue;
    const id = packAttemptId(held.packId, q.qid);
    out.push({
      type: 'mcq',
      prompt: q.stem,
      options: q.options.map((o) => o.text),
      answer: idx,
      qid: id,
      itemId: id,
      packId: held.packId,
      subject: packSubject(q),
      /* What the breakdown groups by, and what the review list titles a row.
         Both are on-screen only; neither is written anywhere.

         A merged pack carries `subject`, and it has to appear here: with two
         banks in one pack "Chapter 1" names an anatomy chapter AND a
         physiology one, so a per-unit breakdown would add two unrelated
         chapters into a single row and report a mark for neither. */
      unit: packUnitLabel(q),
      title: `${packUnitLabel(q)} · question ${q.qid}`,
    });
  }
  return out;
}

/*
 * The other half of the bank: everything packQuestions() refuses.
 *
 * `short`, `tf` and `matching` are ~1,150 questions the app held and never
 * showed, because a timed paper cannot mark prose and a mark that is quietly
 * wrong is worse than no mark. That reasoning is about the PAPER, not about
 * the questions — the genuine PolyU past paper for HSS2011 is short-answer,
 * so these are the closest thing in the bank to the real thing.
 *
 * So they get an untimed surface where the reader marks themselves: read,
 * reveal the model answer, say whether you had it. Self-rating is honest here
 * in a way looseMatch() could never be, because the reader is comparing
 * meaning and the matcher would be comparing strings.
 *
 * Same privacy shape as packQuestions(): `qid`/`itemId` are ids and nothing
 * else, and `unit`/`title` are built from the chapter number, so nothing that
 * reaches the log, the export or the gist carries a word of the question.
 */
export function packShortQuestions() {
  if (!held) return [];
  const out = [];
  for (const q of held.questions) {
    if (q.type === 'mcq') continue;
    if (!q.stem || !q.answer) continue;
    const id = packAttemptId(held.packId, q.qid);
    out.push({
      type: q.type,
      prompt: q.stem,
      answer: String(q.answer),
      qid: id,
      itemId: id,
      packId: held.packId,
      subject: packSubject(q),
      chapter: q.chapter ?? null,
      unit: packUnitLabel(q),
      title: `${packUnitLabel(q)} · question ${q.qid}`,
    });
  }
  return out;
}

/* ------------------------------------------------------------------ *
 * Fetching
 * ------------------------------------------------------------------ */
export function packMessageFor(status) {
  if (status === 401) return 'GitHub rejected the token (401). It may have been revoked, expired, or mistyped.';
  if (status === 403) return 'GitHub refused the request (403). The token may lack Contents access to that repository.';
  if (status === 404) return 'Not found (404). Check the repository name and that the token can see it.';
  return `GitHub returned ${status}.`;
}

async function getJSON(path, token) {
  const { url, init } = packRequestFor(path, { token });
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(packMessageFor(res.status));
  const text = await res.text();
  try { return JSON.parse(text); }
  catch { throw new Error('That file is not JSON. Is the path right?'); }
}

/*
 * Index first, then every chapter it names. The index is what makes a partial
 * fetch detectable: without it a pack that lost half its chapters to a network
 * failure would look complete, and the reader would sit a shorter paper than
 * they asked for and never know.
 */
export async function fetchPack({ repo, token, packId } = {}) {
  const cfg = packConfig();
  const useRepo = repo || cfg.repo;
  const useToken = token || cfg.token;
  const usePack = packId || cfg.packId;
  if (!useRepo || !useToken || !usePack) throw new Error('A repository, a token and a pack id are all needed.');

  const base = `/repos/${useRepo}/contents/${usePack}`;
  const index = await getJSON(`${base}/index.json`, useToken);
  if (index.format !== PACK_INDEX_FORMAT) throw new Error(`That is not a pack index (format "${index.format ?? 'missing'}").`);
  if (!Array.isArray(index.files) || !index.files.length) throw new Error('The pack index lists no files.');

  const questions = [];
  for (const f of index.files) {
    const part = await getJSON(`${base}/${f.file}`, useToken);
    if (!Array.isArray(part.questions)) throw new Error(`${f.file} has no questions array.`);
    if (part.questions.length !== f.questions) {
      throw new Error(`${f.file} holds ${part.questions.length} questions, the index says ${f.questions}. Refusing a partial pack.`);
    }
    questions.push(...part.questions);
  }
  if (index.counts?.total && questions.length !== index.counts.total) {
    throw new Error(`Collected ${questions.length} questions, the index says ${index.counts.total}. Refusing a partial pack.`);
  }

  const pack = { format: PACK_FORMAT, packId: usePack, fetchedAt: Date.now(), questions };
  const bad = validatePack(pack);
  if (bad) throw new Error(bad);
  savePackConfig({ repo: useRepo, token: useToken, packId: usePack, lastFetch: Date.now(), lastError: null });
  await holdPack(pack);
  return pack;
}

/* ------------------------------------------------------------------ *
 * IndexedDB — its own database, opened lazily, failing to memory
 * ------------------------------------------------------------------ */
function openDb() {
  return new Promise((resolve) => {
    let settled = false;
    const done = (v) => { if (!settled) { settled = true; resolve(v); } };
    setTimeout(() => done(null), OPEN_TIMEOUT_MS);
    try {
      if (typeof indexedDB === 'undefined' || typeof indexedDB.open !== 'function') return done(null);
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const d = req.result;
        if (!d.objectStoreNames.contains(STORE)) d.createObjectStore(STORE, { keyPath: 'packId' });
      };
      req.onsuccess = () => done(req.result || null);
      req.onerror = () => done(null);
      req.onblocked = () => done(null);
    } catch { done(null); }
  });
}

async function store(pack) {
  if (!pack) return false;
  const db = await openDb();
  if (!db) return false;
  try {
    db.transaction(STORE, 'readwrite').objectStore(STORE).put(pack);
    return true;
  } catch { return false; }
}

async function dropStored() {
  const db = await openDb();
  if (!db) return false;
  try { db.transaction(STORE, 'readwrite').objectStore(STORE).clear(); return true; }
  catch { return false; }
}

export async function restorePack() {
  const db = await openDb();
  if (!db) return null;
  const all = await new Promise((resolve) => {
    try {
      const req = db.transaction(STORE, 'readonly').objectStore(STORE).getAll();
      req.onsuccess = () => resolve(Array.isArray(req.result) ? req.result : []);
      req.onerror = () => resolve([]);
    } catch { resolve([]); }
  });
  const want = packConfig().packId;
  const found = (want && all.find((p) => p.packId === want)) || all[0] || null;
  if (found && !validatePack(found)) held = found;
  return held;
}

/*
 * Told when a pack lands after boot. The Today tiles count the exam pool, and
 * they are drawn before an IndexedDB read can finish -- so without this the
 * card said "246 questions ready" on a device holding 4,287 more, and would
 * have kept saying it until something else happened to redraw.
 */
let onLoaded = null;
export function whenPackLoaded(fn) { onLoaded = fn; }

/* ------------------------------------------------------------------ *
 * Dialog and UI handling
 * ------------------------------------------------------------------ */

export function renderPackDialog() {
  const c = packConfig();
  const counts = packCounts();
  const loaded = loadedPack();

  const summary = $$('packSummary');
  if (summary) {
    summary.textContent = loaded
      ? `Holding pack "${loaded.packId}" (${counts.total} questions, including ${counts.mcq} MCQs in Exam Mode).`
      : 'No question pack is currently loaded on this device.';
  }

  const repoEl = $$('packRepo');
  if (repoEl) repoEl.value = c.repo || '';

  const tokenEl = $$('packToken');
  if (tokenEl) {
    tokenEl.placeholder = c.token ? 'A token is stored — enter a new one to replace it' : 'github_pat_…';
    tokenEl.value = '';
  }

  const idEl = $$('packIdInput');
  if (idEl) idEl.value = c.packId || '';

  const err = $$('packError');
  if (err) {
    if (c.lastError) {
      err.textContent = c.lastError;
      err.classList.remove('hidden');
    } else {
      err.classList.add('hidden');
    }
  }

  const status = $$('packStatus');
  if (status) {
    if (loaded) {
      status.classList.remove('hidden');
      status.innerHTML = `<ul class="facts">
        <li>Pack: <strong>${esc(loaded.packId)}</strong></li>
        <li>Questions: <strong>${counts.total}</strong> (${counts.mcq} multiple-choice, ${counts.short} short-answer).</li>
        <li>Status: <strong>Active in Exam Mode</strong>.</li>
        ${c.lastFetch ? `<li>Last synchronized: <strong>${new Date(c.lastFetch).toLocaleString()}</strong></li>` : ''}
      </ul>`;
    } else {
      status.classList.add('hidden');
    }
  }

  const removeBtn = $$('packRemoveBtn');
  if (removeBtn) removeBtn.disabled = !loaded;
}

export function openPackDialog() {
  renderPackDialog();
  const d = $$('packDialog');
  if (d) {
    if (window.__rssOpenDialog) window.__rssOpenDialog(d);
    else if (typeof d.showModal === 'function') d.showModal();
  }
}

export async function handlePackFile(file) {
  if (!file) return;
  const errEl = $$('packError');
  if (errEl) errEl.classList.add('hidden');

  try {
    const text = await file.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error('The chosen file is not valid JSON.');
    }
    const problem = validatePack(data);
    if (problem) throw new Error(problem);

    await holdPack(data);
    savePackConfig({ packId: data.packId, lastFetch: Date.now(), lastError: null });
    if (onLoaded) onLoaded(data);
    if (window.__rssRenderMore) window.__rssRenderMore();
    renderPackDialog();
    if (window.__rssToast) window.__rssToast(`Loaded question pack "${data.packId}" (${data.questions.length} questions).`);
  } catch (err) {
    if (errEl) {
      errEl.textContent = String(err.message || err);
      errEl.classList.remove('hidden');
    }
  } finally {
    const input = $$('packFileInput');
    if (input) input.value = '';
  }
}

export async function handlePackFetch() {
  const repo = ($$('packRepo')?.value || '').trim() || packConfig().repo;
  const token = ($$('packToken')?.value || '').trim() || packConfig().token;
  const packId = ($$('packIdInput')?.value || '').trim() || packConfig().packId;

  const errEl = $$('packError');
  if (errEl) errEl.classList.add('hidden');

  const btn = $$('packFetchBtn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Fetching…';
  }

  try {
    if (!repo || !token || !packId) {
      throw new Error('Repository, token, and pack ID are all required.');
    }
    const pack = await fetchPack({ repo, token, packId });
    if (onLoaded) onLoaded(pack);
    if (window.__rssRenderMore) window.__rssRenderMore();
    renderPackDialog();
    if (window.__rssToast) window.__rssToast(`Fetched pack "${pack.packId}" (${pack.questions.length} questions).`);
  } catch (err) {
    const msg = String(err.message || err);
    savePackConfig({ lastError: msg });
    if (errEl) {
      errEl.textContent = msg;
      errEl.classList.remove('hidden');
    }
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Fetch from repository';
    }
    renderPackDialog();
  }
}

export async function handlePackRemove() {
  await forgetPack();
  if (onLoaded) onLoaded(null);
  if (window.__rssRenderMore) window.__rssRenderMore();
  renderPackDialog();
  if (window.__rssToast) window.__rssToast('Question pack removed from this device.');
}

/* Runs after every part has evaluated — see the entry point. */
export function init() {
  /*
   * Restoring is deliberately not awaited. A pack is an addition to the exam
   * pool, not a precondition for it, and blocking boot on an IndexedDB open
   * would make a cold start on a slow device wait for questions the reader
   * may not be about to sit. What it does instead is say so when it arrives.
   */
  restorePack()
    .then((pack) => { if (pack && onLoaded) onLoaded(pack); })
    .catch(() => { /* no pack, or no IndexedDB; the corpus is enough */ });
}

