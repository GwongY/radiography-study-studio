/*
 * Build the text of the sources, so a session can answer "what does page 4
 * say" without opening a PDF off a network drive.
 *
 * WHY THIS EXISTS
 *
 * work/source-catalogue.json says which documents exist and where. It does not
 * say what is in them, and that is what every one of the corpus's sourceRefs
 * entries actually needs: they cite pages — `L1 p4 "The anatomical position"`.
 * Checking one of those meant opening a PDF, which costs thousands of tokens
 * and minutes of drive, every session, for a page that never changes.
 *
 * TWO TIERS, BECAUSE THEY ANSWER DIFFERENT QUESTIONS
 *
 *   work/source-text.json      COMMITTED. The 76 documents SOURCE_FILES
 *                              registers — the ones claims are actually cited
 *                              to. ~2,200 pages. Committed as plain JSON, not
 *                              gzipped: git already stores blobs compressed, so
 *                              the repo pays about the same either way, and
 *                              plain text stays greppable and diffable. With
 *                              this in the repo, every citation in the corpus
 *                              is verifiable with the drive unmounted, forever.
 *
 *   work/.source-text/         LOCAL, gitignored. Every teaching-sized document
 *                              in the catalogue, ~133 MB of text held gzipped.
 *                              Too big to commit and not worth it: it is a
 *                              cache, rebuildable, and only useful on a machine
 *                              that has the drive anyway.
 *
 * Both are filled by the same extractor (work/lib/doc-text.mjs) and both are
 * RESUMABLE: the cache index is written as it goes, and a document already in
 * it is skipped. The --all pass is tens of minutes over Google Drive; it is
 * meant to survive being interrupted.
 *
 * SHARDING, BECAUSE ONE PROCESS IS TOO SLOW
 *
 * A single pass managed ~50 documents in fifteen minutes: forty hours for the
 * 8,114. Almost all of that is waiting on Google Drive — every file has to come
 * down the network, and one under a non-ASCII path is copied out to a temp
 * directory before pdftotext will open it at all. Waiting parallelises, so
 * `--shard i/n` takes every nth document and several processes run at once.
 * Each shard keeps its OWN index file, so they never write over one another,
 * and a reader unions whatever shards it finds.
 *
 * Usage:
 *   node work/build-source-text.mjs                      the cited sources (minutes)
 *   node work/build-source-text.mjs --all                + every teaching document
 *   node work/build-source-text.mjs --all --shard 0/6    one of six parallel passes
 *   node work/build-source-text.mjs --all --limit 200    a bounded slice
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractText } from './lib/doc-text.mjs';
import { resolveSource } from './lib/source-resolve.mjs';
import { SOURCE_FILES, SOURCE_ROOTS } from '../outputs/study/corpus/schema.js';

const WORK = dirname(fileURLToPath(import.meta.url));
const CATALOGUE = join(WORK, 'source-catalogue.json');
const CITED_OUT = join(WORK, 'source-text.json');
const CACHE = join(WORK, '.source-text');

const argv = process.argv.slice(2);
const ALL = argv.includes('--all');
const LIMIT = (() => { const i = argv.indexOf('--limit'); return i >= 0 ? Number(argv[i + 1]) : Infinity; })();
const [SHARD, SHARDS] = (() => {
  const i = argv.indexOf('--shard');
  if (i < 0) return [0, 1];
  const m = String(argv[i + 1] || '').match(/^(\d+)\/(\d+)$/);
  if (!m) { console.error('--shard wants i/n, e.g. --shard 0/6'); process.exit(2); }
  return [Number(m[1]), Number(m[2])];
})();
const CACHE_INDEX = join(CACHE, `index-${SHARD}.json`);

/* Every shard's index, unioned — what the cache holds as a whole. */
function readCacheIndex() {
  if (!existsSync(CACHE)) return {};
  const all = {};
  for (const f of readdirSync(CACHE)) {
    if (!/^index(-\d+)?\.json$/.test(f)) continue;
    try { Object.assign(all, JSON.parse(readFileSync(join(CACHE, f), 'utf8'))); } catch { /* a shard mid-write */ }
  }
  return all;
}

/* Documents over this are reference books, not teaching material. The set
   textbook is 208 MB and names every structure in the body; build-course-terms
   already excludes it for the same reason, and extracting it would take longer
   than everything else combined. */
const BOOK_BYTES = 50 * 1048576;

/*
 * Never committed, however legitimately they are cited.
 *
 * This repository is PUBLIC. Extracting Martini's "Fundamentals of Anatomy &
 * Physiology" and the publisher question bank into work/source-text.json would
 * put the full text of two commercial works on GitHub — 1,283 and 815 pages,
 * 89% of the committed file, and not ours to republish. They stay in the local
 * cache, where they are just as searchable on the machine that has the drive.
 *
 * These are the same two files build-course-terms.mjs already excludes, though
 * for a different reason: there, a reference that names every structure in the
 * body is no evidence a name is examinable. Both remain sources for FACTS, and
 * the committed file records that their text was held back deliberately, so a
 * later session does not read the gap as a missing source.
 */
const PUBLISHER = [/eBook/i, /Question Bank/i];

if (!existsSync(CATALOGUE)) {
  console.error('no work/source-catalogue.json — run: node work/build-source-catalogue.mjs');
  process.exit(2);
}
const cat = JSON.parse(readFileSync(CATALOGUE, 'utf8'));
const fullPath = (d) => { const [ri, p] = d.at[0]; return ri < 0 ? p : `${cat.roots[ri]}/${p}`; };
const key = (d) => createHash('sha1').update(`${d.n.toLowerCase()}|${d.b}`).digest('hex').slice(0, 16);

/* ------------------------------------------------------------------ *
 * Tier one: the sources the corpus actually cites
 * ------------------------------------------------------------------ */

const byName = new Map();
for (const d of cat.docs) {
  const k = d.n.toLowerCase();
  if (!byName.has(k)) byName.set(k, d);
}

function buildCited() {
  const sources = {}, failed = {};
  let pages = 0, chars = 0, n = 0;
  const entries = Object.entries(SOURCE_FILES);
  let ambiguous = 0;
  for (const [id, e] of entries) {
    /* By filename AND folder — eighteen documents are called "Lecture notes". */
    const hit = resolveSource(e, cat, SOURCE_ROOTS);
    if (!hit) { failed[id] = 'not a single catalogued document (folder, image or external citation)'; continue; }
    const d = hit.doc;
    if (PUBLISHER.some((re) => re.test(d.n))) {
      failed[id] = 'commercial work — extracted to the local cache only, deliberately not committed to a public repo';
      continue;
    }
    if (hit.ambiguous) ambiguous++;
    process.stdout.write(`\r  ${++n}/${entries.length}  ${d.n.slice(0, 50).padEnd(50)}`);
    /* hit.full, not fullPath(d) — the resolved COPY, not the first one listed. */
    const r = extractText(hit.full);
    if (!r.ok) { failed[id] = r.why; continue; }
    sources[id] = { file: d.n, at: hit.where, subject: e.subject, kind: e.kind, pages: r.pages };
    pages += r.pages.length;
    chars += r.pages.reduce((a, p) => a + p.length, 0);
  }
  process.stdout.write('\r'.padEnd(72) + '\r');

  writeFileSync(CITED_OUT, JSON.stringify({ sources, failed }, null, 0), 'utf8');
  console.log(`cited sources: ${Object.keys(sources).length} extracted, ${Object.keys(failed).length} not`);
  if (ambiguous) console.log(`  ${ambiguous} resolved to a copy the registry's folder could not fully separate`);
  console.log(`  ${pages} pages, ${(chars / 1048576).toFixed(1)} MB of text`);
  console.log(`  -> work/source-text.json (${(readFileSync(CITED_OUT).length / 1048576).toFixed(1)} MB)`);
  if (Object.keys(failed).length) {
    console.log('\n  not extracted:');
    for (const [id, why] of Object.entries(failed)) console.log(`    ${id.padEnd(18)} ${why}`);
  }
}

/* ------------------------------------------------------------------ *
 * Tier two: the local cache of everything else
 * ------------------------------------------------------------------ */

function buildCache() {
  if (!existsSync(CACHE)) mkdirSync(CACHE, { recursive: true });
  /* Write only this shard's index; skip anything ANY shard has already done. */
  const index = existsSync(CACHE_INDEX) ? JSON.parse(readFileSync(CACHE_INDEX, 'utf8')) : {};
  const held = readCacheIndex();
  /* Every filename SOURCE_FILES registers — these override the size cap below. */
  const registered = new Set(Object.values(SOURCE_FILES).map((e) => String(e.file).toLowerCase()));

  const todo = cat.docs
    /*
     * Size-capped, EXCEPT for anything SOURCE_FILES registers.
     *
     * The cap exists so a run does not spend an hour on reference books
     * nobody cites. But phys.ebook is 208 MB and IS registered, so the cap
     * excluded it from the cache while buildCited excluded it from the commit
     * as a commercial work -- and the message there claimed its text was held
     * in the local cache. It was held nowhere. A registered source with no
     * text anywhere is a citation that can never be quote-checked, which is
     * the one thing this file exists to prevent. Registration wins.
     */
    .filter((d) => (d.b < BOOK_BYTES || registered.has(d.n.toLowerCase())) && /\.(pdf|docx|pptx|txt|md)$/i.test(d.n))
    /* Shard on the content key, not the position: stable whatever order the
       catalogue is in, so a resumed shard picks up its own work. */
    .filter((d) => SHARDS === 1 || parseInt(key(d).slice(0, 8), 16) % SHARDS === SHARD)
    .filter((d) => !held[key(d)])
    .slice(0, LIMIT === Infinity ? undefined : LIMIT);

  const already = Object.keys(held).length;
  console.log(`\nlocal cache${SHARDS > 1 ? ` [shard ${SHARD}/${SHARDS}]` : ''}: ${already} already held, ${todo.length} to read`);
  if (!todo.length) return;

  let done = 0, failed = 0, bytes = 0;
  /* Write the index every so often, not at the end: this pass is tens of
     minutes and is expected to be interrupted. */
  const flush = () => writeFileSync(CACHE_INDEX, JSON.stringify(index), 'utf8');

  for (const d of todo) {
    const k = key(d);
    process.stdout.write(`\r  ${done + failed + 1}/${todo.length}  ${d.n.slice(0, 44).padEnd(44)}`);
    /* Books excepted, a teaching document that takes over a minute is stuck. */
    /* A 200 MB textbook needs longer than a 2 MB handout; 60 s timed the
       eBook out on every attempt. */
    const r = extractText(fullPath(d), { timeout: d.b > BOOK_BYTES ? 1800000 : 60000 });
    if (!r.ok) { index[k] = { n: d.n, b: d.b, ok: false, why: r.why }; failed++; }
    else {
      const text = r.pages.join('\f');
      const gz = gzipSync(text);
      writeFileSync(join(CACHE, `${k}.txt.gz`), gz);
      index[k] = { n: d.n, b: d.b, ok: true, pages: r.pages.length, chars: text.length };
      bytes += gz.length;
      done++;
    }
    if ((done + failed) % 25 === 0) flush();
  }
  flush();
  process.stdout.write('\r'.padEnd(72) + '\r');
  console.log(`  read ${done}, could not read ${failed}`);
  console.log(`  cache now ${Object.keys(index).length} documents, ${(bytes / 1048576).toFixed(1)} MB added this run`);
}

/* Six shards should not each re-extract the same 65 cited sources. */
if (!argv.includes('--cache-only')) buildCited();
if (ALL) buildCache();
else console.log('\n(--all also fills the local full-text cache for every teaching document)');
