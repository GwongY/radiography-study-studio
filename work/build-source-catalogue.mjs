/*
 * Build work/source-catalogue.json — what is on the source drive, so that no
 * session ever has to go and look.
 *
 * WHY THIS EXISTS
 *
 * The shared drive holds 9,998 documents across 13 shared folders and 2,746
 * directories — 26.5 GB. A session that wants to know whether a lecture on the
 * shoulder exists, or where the HSS2011 past papers live, has no way to find
 * out except to walk the drive. That walk is minutes: Google Drive streams
 * every stat over the network and the antivirus scans each one on the way past.
 * Doing it once per session is the single most expensive habit in this repo.
 *
 * So do it once, here, and commit the answer. This is the same bargain
 * work/course-terms.json already makes, and the same one outputs/mesh-index.js
 * makes: a generated file that is never READ, only queried.
 *
 *   node work/query.mjs file <term>     which source documents match
 *   node work/query.mjs where <term>    which folders hold them
 *
 * WHAT IT RECORDS, AND WHAT IT REFUSES TO GUESS
 *
 * Only what is observable from the filesystem: path, size, modification time,
 * how many copies exist, and the subject code where the PATH ITSELF names one.
 * It does not guess whether a file is a lecture or a past paper unless a
 * folder in its path says so in as many words. The source-traceability rule
 * means a wrong guess here would end up cited as evidence; a missing field
 * costs one `ls`.
 *
 * DUPLICATES
 *
 * 3,398 of the 9,998 are the same file re-shared between study groups — the
 * set textbook alone appears five times under four spellings. Same filename
 * and same byte count is treated as the same document: one catalogue row, with
 * every path it lives at. Indexing without this would report five hits for one
 * textbook and multiply the extraction cost by half again.
 *
 * Requires the drive mounted. The output is committed, so query.mjs does not.
 *
 * Usage: node work/build-source-catalogue.mjs [--out <path>]
 */
import { readdirSync, statSync, existsSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const WORK = dirname(fileURLToPath(import.meta.url));
const REPO = dirname(WORK);
const SHORTCUT_ROOT = 'G:/.shortcut-targets-by-id';
const OUT = (() => {
  const i = process.argv.indexOf('--out');
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : join(WORK, 'source-catalogue.json');
})();

/* Documents only. The drive also holds 6,349 images, videos and stray files;
   none of them is a source a claim can cite. */
const DOC = /\.(pdf|docx?|pptx?|xlsx?|txt|md)$/i;

/* ------------------------------------------------------------------ *
 * Finding the roots
 *
 * CLAUDE.md says to enumerate G:/.shortcut-targets-by-id rather than trust the
 * .lnk list. Both are necessary, in this order: Drive materialises a shortcut
 * target lazily, so a folder nobody has opened this session is not there to be
 * enumerated. Reading the .lnk files first is what makes it appear. Doing only
 * the enumeration found 3 of the 13 roots.
 * ------------------------------------------------------------------ */

/* Batch-resolve .lnk files to their targets. WScript.Shell is the only
   reliable .lnk reader on Windows, and spawning PowerShell per shortcut is
   slow enough to notice, so they go in one call. */
function resolveLnks(lnks) {
  if (!lnks.length) return [];
  const list = lnks.map((p) => `'${p.replace(/'/g, "''")}'`).join(',');
  const ps = `$s=New-Object -ComObject WScript.Shell
@(${list}) | ForEach-Object { try { $t=$s.CreateShortcut($_).TargetPath; if($t){ $t } } catch {} }`;
  try {
    return execFileSync('powershell', ['-NoProfile', '-NonInteractive', '-Command', ps],
      { encoding: 'utf8', timeout: 180000 }).split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  } catch (e) {
    console.error(`could not resolve ${lnks.length} shortcut(s): ${e.message}`);
    return [];
  }
}

function repoShortcuts() {
  const dirs = ['Old source', 'New source', 'Uni'].map((d) => join(REPO, d)).filter(existsSync);
  const lnks = [];
  for (const d of dirs) {
    for (const k of readdirSync(d)) if (k.toLowerCase().endsWith('.lnk')) lnks.push(join(d, k));
  }
  return resolveLnks(lnks);
}

/*
 * A shared course folder, and nothing else.
 *
 * One of the buried shortcuts points at G:/ — the whole of Google Drive. Round
 * four followed it and swept in 476 files from outside the course folders
 * entirely, including personal My Drive content that is none of this repo's
 * business. A source this project may cite lives in a folder shared with the
 * cohort, which on this machine means exactly:
 *
 *     G:/.shortcut-targets-by-id/<folder id>/<folder name>/...
 *
 * so that is the whole rule. Anything else is reported and dropped rather than
 * silently skipped, because a source that goes missing is a citation that
 * cannot be checked.
 */
const SHARED = /^g:\/\.shortcut-targets-by-id\/[^/]+\/[^/]+/;

/*
 * The drive is not the only place sources arrive.
 *
 * "New source/" in this repo is where material gets dropped straight in — the
 * 2026 edition of the HTI17103 opening lecture landed there, and so did a
 * subject the app does not cover at all. None of it was catalogued, because the
 * rule above only admits shared Drive folders, so `query.mjs file` answered
 * "no match" for documents sitting in the working tree. Include them.
 */
const LOCAL_SOURCE_DIRS = ['New source', 'Old source'];
const localRoots = LOCAL_SOURCE_DIRS
  .map((d) => join(REPO, d))
  .filter(existsSync)
  .map((p) => resolve(p).replace(/\\/g, '/'));
const localKeys = new Set(localRoots.map((p) => p.toLowerCase()));

function inScope(key) {
  if (SHARED.test(key)) return true;
  for (const l of localKeys) if (key === l || key.startsWith(`${l}/`)) return true;
  return false;
}

function listShortcutRoot() {
  const listed = [];
  if (!existsSync(SHORTCUT_ROOT)) return listed;
  for (const id of readdirSync(SHORTCUT_ROOT)) {
    let kids = [];
    try { kids = readdirSync(join(SHORTCUT_ROOT, id)); } catch { continue; }
    for (const k of kids) {
      const p = join(SHORTCUT_ROOT, id, k);
      try { if (statSync(p).isDirectory()) listed.push(p); } catch { /* not materialised */ }
    }
  }
  return listed;
}

/* ------------------------------------------------------------------ *
 * Reading them
 * ------------------------------------------------------------------ */

/*
 * Walk one directory tree.
 *
 * `seen` holds every directory already walked, by lowercased real path. Roots
 * overlap — a shortcut inside one shared folder points at another shared
 * folder, and one of the roots is a folder of nothing but shortcuts to the
 * others. Without this guard the same subtree is counted several times over.
 *
 * Any .lnk met on the way is collected rather than followed here: they are
 * resolved in one batch between rounds, and whatever they point at becomes a
 * root of its own.
 */
function walk(dir, hits, lnks, stats, seen) {
  const key = dir.toLowerCase().replace(/\\/g, '/');
  if (seen.has(key)) return;
  seen.add(key);
  stats.dirs++;
  let kids = [];
  try { kids = readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const k of kids) {
    const p = join(dir, k.name);
    if (k.isDirectory()) { walk(p, hits, lnks, stats, seen); continue; }
    if (k.name.toLowerCase().endsWith('.lnk')) { lnks.push(p); continue; }
    if (!DOC.test(k.name)) { stats.skipped++; continue; }
    let st;
    try { st = statSync(p); } catch { continue; }
    hits.push({ full: p.replace(/\\/g, '/'), name: k.name, bytes: st.size, mtime: Math.round(st.mtimeMs) });
  }
}

/* A subject code the PATH states. Not inferred from content — inferring it
   would make the catalogue a claim about the syllabus rather than a listing. */
const CODE = /\b([A-Z]{3,4}\d{4,5})\b/;

/* A kind only where a folder in the path says so outright. Anything else is
   left null; see the header. */
const KINDS = [
  [/(^|\/)[^/]*\b(past ?papers?|exam(ination)?s?|quiz|test papers?)\b/i, 'assessment'],
  [/(^|\/)[^/]*\b(revision|exercises?|tutorials?|model answers?|answer keys?)\b/i, 'assessment'],
  [/(^|\/)[^/]*\b(lecture|notes|handouts?|slides?|study manual|manual)\b/i, 'primary'],
  [/(^|\/)[^/]*\b(assignments?|lab reports?|reports?|coursework|projects?)\b/i, 'student'],
  [/(^|\/)[^/]*\b(subject desc|rubric|schedule|timetable|syllabus)\b/i, 'admin'],
];

function main() {
  const stats = { dirs: 0, skipped: 0 };
  const hits = [];
  const seen = new Set();      /* directories already walked */
  const roots = [];            /* every tree we ended up covering */
  const known = new Set();     /* candidate paths already considered */

  /*
   * Round-based, because the drive is a graph rather than a tree. Round one is
   * the shortcuts in this repo plus everything materialised under the shortcut
   * root; each later round is whatever shortcuts the last round's walk turned
   * up. Walking only round one missed four folders the app already cites --
   * "21 Torti Source" and "extra source" among them -- because they are only
   * reachable through a shortcut stored inside another shared folder.
   */
  const rejected = [];
  /* Local source folders first, so a document held in the working tree is
     attributed to it rather than to whichever Drive folder also has a copy. */
  let frontier = [...localRoots, ...repoShortcuts(), ...listShortcutRoot()];
  for (let round = 1; frontier.length && round <= 8; round++) {
    const fresh = [];
    for (const p of frontier) {
      let real;
      try { real = resolve(p); if (!statSync(real).isDirectory()) continue; } catch { continue; }
      const key = real.toLowerCase().replace(/\\/g, '/');
      if (known.has(key)) continue;
      known.add(key);
      if (!inScope(key)) { rejected.push(real.replace(/\\/g, '/')); continue; }
      fresh.push({ key, path: real.replace(/\\/g, '/') });
    }
    if (!fresh.length) break;
    console.log(`round ${round}: ${fresh.length} folder(s)`);
    const lnks = [];
    for (const r of fresh) {
      const before = hits.length;
      walk(r.path, hits, lnks, stats, seen);
      const n = hits.length - before;
      /* A folder already covered by an earlier root contributes nothing; say
         so rather than listing it as a source of zero documents. */
      console.log(`  ${String(n).padStart(5)} documents  ${r.path.split('/').pop()}`);
      roots.push(r);
    }
    /*
     * Re-list the shortcut root every round, not just at the start. Walking a
     * folder materialises the shortcut targets it mentions, so each round makes
     * folders visible that were not there to be listed before it. Without this
     * the build converges only across REPEATED runs — the first one on a cold
     * drive silently reports a smaller corpus than the second. `known` makes
     * re-listing free.
     */
    frontier = [...resolveLnks(lnks), ...listShortcutRoot()];
  }

  if (!roots.length) {
    console.error(`No source folders found under ${SHORTCUT_ROOT}.`);
    console.error('Mount the shared drive and try again. The committed catalogue stays valid meanwhile.');
    process.exit(2);
  }

  /* Collapse re-shares. Same name and same byte count is the same document;
     size alone collides on small files, name alone on "Lecture 1.pdf". */
  const byKey = new Map();
  for (const h of hits) {
    const key = `${h.bytes}|${h.name.toLowerCase()}`;
    let doc = byKey.get(key);
    if (!doc) {
      byKey.set(key, doc = { name: h.name, bytes: h.bytes, mtime: h.mtime, at: [] });
    }
    /* Store each location as [root index, path below that root]. Roots can now
       nest, so take the LONGEST match — attributing a file to the outer root
       would bury the shared folder it actually belongs to inside the path. */
    let ri = -1;
    for (let i = 0; i < roots.length; i++) {
      if (!h.full.toLowerCase().startsWith(`${roots[i].key}/`)) continue;
      if (ri < 0 || roots[i].key.length > roots[ri].key.length) ri = i;
    }
    doc.at.push([ri, ri < 0 ? h.full : h.full.slice(roots[ri].path.length + 1)]);
    if (h.mtime < doc.mtime) doc.mtime = h.mtime;
  }

  const docs = [...byKey.values()].map((d) => {
    /* Classify from every path it lives at — one copy may sit in a folder that
       names the subject where another does not. */
    const paths = d.at.map(([, p]) => p);
    const code = paths.map((p) => (p.match(CODE) || [])[1]).find(Boolean) || null;
    let kind = null;
    for (const [re, k] of KINDS) { if (paths.some((p) => re.test(p))) { kind = k; break; } }
    return { n: d.name, b: d.bytes, m: d.mtime, at: d.at, ...(code ? { code } : {}), ...(kind ? { kind } : {}) };
  }).sort((a, b) => a.n.localeCompare(b.n));

  const total = hits.reduce((a, h) => a + h.bytes, 0);
  const distinct = docs.reduce((a, d) => a + d.b, 0);
  const out = {
    /* Not Date.now(): the newest file on the drive dates the catalogue without
       making the output differ on every rebuild. */
    newest: Math.max(...docs.map((d) => d.m)),
    roots: roots.map((r) => r.path),
    docs,
  };
  writeFileSync(OUT, JSON.stringify(out), 'utf8');

  const MB = (b) => (b / 1048576).toFixed(0);
  if (rejected.length) {
    console.log(`\nnot a shared course folder — skipped ${rejected.length}:`);
    for (const r of rejected) console.log(`  ${r}`);
  }
  console.log(`\ndirectories walked   ${stats.dirs}`);
  console.log(`documents found      ${hits.length}  (${MB(total)} MB)`);
  console.log(`distinct documents   ${docs.length}  (${MB(distinct)} MB)`);
  console.log(`re-shared copies     ${hits.length - docs.length}`);
  console.log(`with a subject code  ${docs.filter((d) => d.code).length}`);
  console.log(`with a stated kind   ${docs.filter((d) => d.kind).length}`);
  console.log(`\n-> ${OUT}  (${MB(statSync(OUT).size)} MB)`);
}

main();
