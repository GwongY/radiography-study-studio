/*
 * Check notes that came back from another reader, before any of it becomes a
 * lesson.
 *
 * WHY THIS EXISTS
 *
 * handoff-export.mjs sends documents out; something else reads them and sends
 * back CLAIM / PAGE / QUOTE blocks. Nothing about that round trip is
 * trustworthy on its own. A reader can paraphrase a quote it meant to copy,
 * cite the page a topic is discussed on rather than the page its evidence is
 * on, complete a half-covered topic from its own knowledge, or name a document
 * that was never in the batch. All four produce output that looks exactly like
 * the good kind.
 *
 * So this is the gate. A claim that does not pass here never reaches the
 * corpus, and the check is deliberately the SAME comparison work/source-check
 * .mjs makes on a finished sourceRef — normalise whitespace, fold curly quotes
 * and dashes, then require the string on the cited page. Passing here therefore
 * means the citation will still pass once it is a lesson, which is the only
 * property worth having.
 *
 * WHAT IT REPORTS, AND WHY THE CATEGORIES DIFFER
 *
 *   NOT ON PAGE     the quote exists in the document, on another page. The
 *                   content is real and the page number is wrong — fixable by
 *                   correcting one number, and worth separating out, because
 *                   this is what off-by-one page counting looks like.
 *   NOT IN SOURCE   the quote is nowhere in the document. Invented, or
 *                   paraphrased into something that is no longer a quote.
 *                   Not fixable; the claim goes.
 *   UNKNOWN SOURCE  the SOURCE line names no document in the export. The most
 *                   dangerous failure of the four, because it is the one that
 *                   still reads like a citation.
 *   NO BLOCK        an exported document nothing came back about. Silent
 *                   omission, which a per-claim check can never notice.
 *
 * Usage:
 *   node work/verify-notes.mjs                       every .md under the notes dir
 *   node work/verify-notes.mjs <file|dir> …          only these
 *   node work/verify-notes.mjs --batch=03            coverage for one batch only
 *   node work/verify-notes.mjs --quiet               failures only
 *   node work/verify-notes.mjs --selftest            prove the gate still catches
 *
 * --selftest runs work/fixtures/notes-selftest.md, which carries two claims that
 * must pass and one instance of every failure this file knows how to detect, and
 * asserts the exact tally. A gate nobody tests is a gate that quietly stops
 * catching things, and this one exists precisely to be trusted unattended. It
 * needs the export present, since the fixture cites real documents.
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const WORK = dirname(fileURLToPath(import.meta.url));
const CACHE = join(WORK, '.source-text');
const HANDOFF = join(CACHE, 'handoff');
const NOTES = join(CACHE, 'notes');

const flags = process.argv.slice(2).filter((a) => a.startsWith('--'));
const paths = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const flag = (n, d) => (flags.find((a) => a.startsWith(`--${n}=`)) || `=${d}`).split('=').pop();
const QUIET = flags.includes('--quiet');
const SELFTEST = flags.includes('--selftest');
const ONLY_BATCH = SELFTEST ? '16' : flag('batch', '');

/* What the fixture is built to trip, one of each. If a change to this file
   makes any of these stop firing, the run says so instead of going green. */
const EXPECT = { unknown: 1, verdict: 1, shape: 3, words: 1, range: 1, offPage: 1, missing: 1, okClaims: 2 };

/* Twenty words is the cap the extraction brief sets. It is a copyright limit
   as much as a quality one: a "quote" long enough to be a passage is a
   reproduction, and this repository is public. */
const MAX_WORDS = 20;
const VERDICTS = ['TEACHES', 'DUPLICATE', 'ADMIN', 'THIN'];

/* ------------------------------------------------------------------ *
 * What was sent out
 * ------------------------------------------------------------------ */

if (!existsSync(join(HANDOFF, 'INDEX.tsv'))) {
  console.error(`no export to check against at ${HANDOFF} — run: node work/handoff-export.mjs`);
  process.exit(2);
}
const idx = readFileSync(join(HANDOFF, 'INDEX.tsv'), 'utf8').trim().split('\n');
const ihead = idx[0].split('\t');
const exported = idx.slice(1).map((l) => Object.fromEntries(l.split('\t').map((v, i) => [ihead[i], v])));

/* Keyed by SOURCE name lowercased — that is the string the reader was told to
   copy back verbatim, and the only handle the notes carry. */
const bySource = new Map();
for (const e of exported) bySource.set(e.source.toLowerCase(), e);

/* The exported text, read lazily: most runs check a handful of documents and
   the export is several megabytes. */
const textCache = new Map();
function pagesOf(entry) {
  if (textCache.has(entry.file)) return textCache.get(entry.file);
  const p = join(HANDOFF, entry.batch, entry.file);
  let pages = null;
  if (existsSync(p)) {
    const raw = readFileSync(p, 'utf8');
    /* Split on the markers the export wrote, so page N here means page N there
       and page N in the PDF. Index 0 is the header block, dropped. */
    pages = raw.split(/\n\[\[page \d+\]\]\n/).slice(1);
  }
  textCache.set(entry.file, pages);
  return pages;
}

/* ------------------------------------------------------------------ *
 * The comparison — identical to work/source-check.mjs on purpose
 * ------------------------------------------------------------------ */

const flat = (s) => String(s).toLowerCase()
  .replace(/[‘’“”]/g, "'")
  .replace(/[‐-―]/g, '-')
  .replace(/\s+/g, ' ').trim();

/* ------------------------------------------------------------------ *
 * Parse
 * ------------------------------------------------------------------ */

function collect(p) {
  if (!existsSync(p)) return [];
  if (statSync(p).isDirectory()) {
    return readdirSync(p).flatMap((k) => collect(join(p, k)));
  }
  return /^\.(md|txt)$/i.test(extname(p)) ? [p] : [];
}

/*
 * One block per document. The reader was given a fixed shape; anything looser
 * than "## SOURCE:" starting a block would let two documents' claims merge
 * into one, and every claim would then carry the wrong provenance.
 */
function parse(file) {
  const text = readFileSync(file, 'utf8');
  const blocks = [];
  let cur = null;
  let claim = null;
  const push = () => { if (claim && cur) { cur.claims.push(claim); claim = null; } };

  for (const [n, raw] of text.split('\n').entries()) {
    const line = raw.trim();
    let m;
    if ((m = line.match(/^##\s*SOURCE:\s*(.+?)\s*$/i))) {
      push();
      cur = { file, line: n + 1, source: m[1], subject: '', verdict: '', claims: [] };
      blocks.push(cur);
      continue;
    }
    if (!cur) continue;
    if ((m = line.match(/^SUBJECT:\s*(.+?)\s*$/i))) { cur.subject = m[1]; continue; }
    if ((m = line.match(/^VERDICT:\s*([A-Z]+)/i))) { cur.verdict = m[1].toUpperCase(); continue; }
    if ((m = line.match(/^[-*]\s*CLAIM:\s*(.+?)\s*$/i))) { push(); claim = { line: n + 1, text: m[1], page: null, quote: null }; continue; }
    if (!claim) continue;
    if ((m = line.match(/^PAGE:\s*(\d+)/i))) { claim.page = Number(m[1]); continue; }
    if ((m = line.match(/^QUOTE:\s*["“](.+)["”]\s*$/))) { claim.quote = m[1]; continue; }
    /* A quote the reader forgot to wrap is still a quote attempt; catching it
       here reports "not found" rather than silently dropping the claim. */
    if ((m = line.match(/^QUOTE:\s*(.+?)\s*$/i))) { claim.quote = m[1].replace(/^["“]|["”]$/g, ''); continue; }
  }
  push();
  return blocks;
}

/* ------------------------------------------------------------------ *
 * Check
 * ------------------------------------------------------------------ */

const files = (SELFTEST ? [join(WORK, 'fixtures', 'notes-selftest.md')] : paths.length ? paths : [NOTES]).flatMap(collect);
if (!files.length) {
  console.error(paths.length ? 'none of those paths hold .md notes' : `no notes yet at ${NOTES}`);
  process.exit(2);
}

const blocks = files.flatMap(parse);
const at = (b, c) => `${b.file.replace(/\\/g, '/').split('/').pop()}:${(c || b).line}`;

/*
 * The fixture cites real exported documents, so a differently-flagged export
 * would make its good claims unresolvable and every detector would report the
 * wrong tally. Say which document is missing rather than blaming the gate.
 */
if (SELFTEST) {
  const need = blocks.map((b) => b.source).filter((s) => !/Never Exported/i.test(s));
  const absent = need.filter((s) => !bySource.has(s.toLowerCase()));
  if (absent.length) {
    console.error('the fixture cites documents this export does not contain:');
    for (const s of absent) console.error(`  ${s}`);
    console.error('\nre-run the default export first: node work/handoff-export.mjs');
    process.exit(2);
  }
}

const problems = { unknown: [], verdict: [], shape: [], words: [], range: [], offPage: [], missing: [] };
let okClaims = 0, okBlocks = 0;
const seen = new Set();

for (const b of blocks) {
  const entry = bySource.get(b.source.toLowerCase());
  if (!entry) { problems.unknown.push(b); continue; }
  seen.add(entry.file);

  if (!VERDICTS.includes(b.verdict)) { problems.verdict.push(b); continue; }

  /*
   * The verdict and the claim list have to agree. A block marked THIN that
   * carries claims means the reader judged one way and extracted the other,
   * and there is no way to tell which half to believe. A TEACHES with nothing
   * under it is the same disagreement inverted.
   */
  if (b.verdict === 'TEACHES' && !b.claims.length) { problems.shape.push({ b, why: 'TEACHES with no claims' }); continue; }
  if (b.verdict !== 'TEACHES' && b.claims.length) { problems.shape.push({ b, why: `${b.verdict} with ${b.claims.length} claim(s) — extract nothing, or change the verdict` }); continue; }

  const pages = pagesOf(entry);
  if (!pages) { problems.shape.push({ b, why: `exported file missing: ${entry.batch}/${entry.file}` }); continue; }

  let blockOk = true;
  for (const c of b.claims) {
    if (!c.page || !c.quote) { problems.shape.push({ b, c, why: 'claim missing PAGE or QUOTE' }); blockOk = false; continue; }

    const words = c.quote.trim().split(/\s+/).length;
    if (words > MAX_WORDS) { problems.words.push({ b, c, words }); blockOk = false; continue; }

    if (c.page < 1 || c.page > pages.length) { problems.range.push({ b, c, pages: pages.length }); blockOk = false; continue; }

    const q = flat(c.quote);
    if (flat(pages[c.page - 1]).includes(q)) { okClaims++; continue; }

    /* Where else is it? The answer decides whether this is a typo or an
       invention, and those need opposite responses. */
    const found = pages.findIndex((p) => flat(p).includes(q));
    if (found >= 0) problems.offPage.push({ b, c, actual: found + 1 });
    else problems.missing.push({ b, c });
    blockOk = false;
  }
  if (blockOk) okBlocks++;
}

/* Coverage: documents that went out and nothing came back about. Scoped to one
   batch when asked, because a partial run is the normal case. */
const scope = exported.filter((e) => !ONLY_BATCH || e.batch === `batch-${String(ONLY_BATCH).padStart(2, '0')}`);
const noBlock = scope.filter((e) => !seen.has(e.file));

/* ------------------------------------------------------------------ *
 * Report
 * ------------------------------------------------------------------ */

const show = (title, rows, fmt) => {
  if (!rows.length) return;
  console.log(`\n— ${title} (${rows.length}) —`);
  for (const r of rows.slice(0, 40)) console.log('  ' + fmt(r));
  if (rows.length > 40) console.log(`  … and ${rows.length - 40} more`);
};

if (!QUIET) {
  console.log(`— notes read —`);
  console.log(`  ${files.length} file(s), ${blocks.length} block(s), ${blocks.reduce((a, b) => a + b.claims.length, 0)} claim(s)`);
}

show('SOURCE names no exported document', problems.unknown, (b) => `${at(b)}  "${b.source}"`);
show('verdict missing or not one of TEACHES/DUPLICATE/ADMIN/THIN', problems.verdict, (b) => `${at(b)}  ${b.source} → "${b.verdict || '(none)'}"`);
show('block shape', problems.shape, (r) => `${at(r.b, r.c)}  ${r.b.source} — ${r.why}`);
show(`quote longer than ${MAX_WORDS} words`, problems.words, (r) => `${at(r.b, r.c)}  ${r.b.source} p${r.c.page} — ${r.words} words`);
show('page out of range', problems.range, (r) => `${at(r.b, r.c)}  ${r.b.source} — cited p${r.c.page}, document has ${r.pages}`);
show('NOT ON PAGE — quote is real, page number is wrong', problems.offPage, (r) => `${at(r.b, r.c)}  ${r.b.source} — cited p${r.c.page}, actually p${r.actual}: "${r.c.quote.slice(0, 60)}"`);
show('NOT IN SOURCE — quote is nowhere in the document', problems.missing, (r) => `${at(r.b, r.c)}  ${r.b.source} p${r.c.page} — "${r.c.quote.slice(0, 60)}"`);
show(`NO BLOCK — exported${ONLY_BATCH ? ` in batch-${String(ONLY_BATCH).padStart(2, '0')}` : ''}, nothing came back`, noBlock, (e) => `${e.batch}/${e.source}`);

const fails = problems.unknown.length + problems.verdict.length + problems.shape.length
  + problems.words.length + problems.range.length + problems.offPage.length + problems.missing.length;

console.log('');
console.log(`  ${String(okClaims).padStart(4)} claim(s) verified on the exact page cited`);
console.log(`  ${String(okBlocks).padStart(4)} block(s) clean`);
if (noBlock.length) console.log(`  ${String(noBlock.length).padStart(4)} exported document(s) with no block${ONLY_BATCH ? '' : ' — pass --batch=NN to scope this'}`);

/*
 * Under --selftest the arithmetic is inverted: finding nothing is the failure.
 * The fixture is built to trip one of each, so the run passes only when every
 * detector fired exactly as many times as it was given cause to.
 */
if (SELFTEST) {
  const got = { unknown: problems.unknown.length, verdict: problems.verdict.length, shape: problems.shape.length,
    words: problems.words.length, range: problems.range.length, offPage: problems.offPage.length,
    missing: problems.missing.length, okClaims };
  const wrong = Object.keys(EXPECT).filter((k) => got[k] !== EXPECT[k]);
  console.log('\n— selftest —');
  for (const k of Object.keys(EXPECT)) console.log(`  ${wrong.includes(k) ? 'FAIL' : 'ok  '} ${k.padEnd(10)} expected ${EXPECT[k]}, got ${got[k]}`);
  console.log(wrong.length ? `\nSELFTEST FAILED: ${wrong.join(', ')}` : '\nSELFTEST PASS — every detector still fires');
  process.exit(wrong.length ? 1 : 0);
}

/* Missing blocks are reported but do not fail the run: a partial pass over one
   batch is the normal working state, and a gate that fails on incompleteness
   would be red from the first wave to the last. What must never pass is a
   claim that cannot be traced. */
console.log(fails ? `\n${fails} FAILED` : '\nALL PASS');
process.exit(fails ? 1 : 0);
