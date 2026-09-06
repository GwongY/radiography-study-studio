/*
 * Build a question pack — publisher test-bank PDFs into one JSON file that
 * never enters this repository.
 *
 * The output is licensed content. It goes to work/.packs/, which is gitignored,
 * and from there to a PRIVATE remote the app fetches at runtime. Nothing here
 * writes into outputs/, and the script refuses to if asked; work/pack-privacy-check.mjs
 * asserts the same thing from the other side.
 *
 * WHY THE PARSER LOOKS LIKE THIS
 *
 * The text comes out of the PDF with three habits that defeat the obvious
 * regex, and each one silently halves the yield rather than erroring:
 *
 *   1. The question number is repeated in the right margin, so the stem line
 *      ends with a stray "70)". Stripped first, or every stem keeps a number.
 *   2. A page number can glue onto the next question number — page 12 before
 *      question 73 extracts as "1273)". So starts are not found by pattern
 *      alone but by SEQUENCE: the next start is whichever "N)" ends with the
 *      number we are expecting. Page noise falls off the front for free.
 *   3. Options are usually one per line but sometimes all five on one line.
 *      A line-anchored regex finds 93% of them and quietly drops the rest.
 *
 * A first pass that ignored all three found 3,320 of 7,380 answer lines and
 * looked like it had worked. Anything this script cannot parse is REPORTED,
 * per file, with a reason — a question bank that loses a tenth of itself in
 * silence is worse than one that says so.
 *
 * Short-answer questions are kept too, as their own type. They are not noise:
 * the genuine PolyU past paper for this subject is short-answer, so they are
 * the closest thing in the bank to the real exam.
 *
 * Reads the local text cache (work/.source-text, written by build-source-text.mjs)
 * so it needs no drive on a machine that has already extracted.
 *
 * Usage:
 *   node work/build-question-pack.mjs                      # build the default pack
 *   node work/build-question-pack.mjs --report             # parse and report, write nothing
 *   node work/build-question-pack.mjs --folder "question blank" --pack-id abct2326-bank-v1
 */
import { createHash } from 'node:crypto';
import { gunzipSync } from 'node:zlib';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const CACHE = join(root, 'work/.source-text');
const CATALOGUE = join(root, 'work/source-catalogue.json');

const argv = process.argv.slice(2);
const flag = (name, dflt) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : dflt;
};
const REPORT_ONLY = argv.includes('--report');
const FOLDER = new RegExp(flag('folder', 'question blank'), 'i');
const PACK_ID = flag('pack-id', 'abct2326-bank-v1');
const OUT = resolve(root, flag('out', join('work/.packs', `${PACK_ID}.json`)));

/* The one refusal that matters. outputs/ is the deployed directory. */
if (!relative(join(root, 'outputs'), OUT).startsWith('..')) {
  console.error(`refusing to write a pack into outputs/: ${OUT}`);
  console.error('outputs/ is deployed publicly. Packs belong in work/.packs/.');
  process.exit(2);
}

/* Same key build-source-text.mjs writes under: name (lowercased) and size. */
const cacheKey = (d) => createHash('sha1').update(`${d.n.toLowerCase()}|${d.b}`).digest('hex').slice(0, 16);

/* ------------------------------------------------------------------ *
 * Parsing
 * ------------------------------------------------------------------ */

const tidy = (s) => s.replace(/\s+/g, ' ').trim();

/* Habit 1: the margin repeats the number. */
const stripMargin = (text) => text.replace(/[ \t]{2,}\d{1,3}\)[ \t]*$/gm, '');

/*
 * Habit 2: find starts by sequence, not by pattern. We know the questions run
 * 1, 2, 3 …, so the next start is the next "N)" whose digits END with the
 * number we want. "1273)" while expecting 73 is page 12 plus question 73, and
 * slicing from the last two digits drops the page number without a special case.
 */
function findStarts(text) {
  const starts = [];
  let expect = 1;
  const re = /(\d{1,5})\)/g;
  let m;
  while ((m = re.exec(text))) {
    const want = String(expect);
    if (m[1].endsWith(want)) {
      starts.push({ index: m.index + m[1].length - want.length, n: expect });
      expect += 1;
    }
  }
  return starts;
}

/*
 * Habit 3: options one per line, or several to a line, or a mixture — a line
 * reading "A) arteries  B) capillaries  C) arterioles  D) venules" is common.
 *
 * Neither reading wins outright, and choosing the wrong one is not a parse
 * error: the line-anchored regex happily returns A and D from that line and
 * looks like it succeeded. So both are computed and the one that recovers more
 * DISTINCT letters is kept. Wrapped repeats (the same letter twice, once
 * truncated) collapse to the longer text.
 */
function readOptions(region) {
  const perLine = [...region.matchAll(/^[ \t]*([A-E])\)[ \t]*(.+?)[ \t]*$/gm)]
    .map((o) => ({ letter: o[1], text: tidy(o[2]) }));

  const inline = region
    .split(/(?=\b[A-E]\)\s)/)
    .map((p) => p.match(/^\b([A-E])\)\s*([\s\S]*)$/))
    .filter(Boolean)
    .map((p) => ({ letter: p[1], text: tidy(p[2]) }))
    .filter((o) => o.text);

  const distinct = (list) => new Set(list.map((o) => o.letter)).size;
  const chosen = distinct(inline) > distinct(perLine) ? inline : perLine;

  const byLetter = new Map();
  for (const o of chosen) {
    if (!o.text) continue;
    const held = byLetter.get(o.letter);
    if (!held || o.text.length > held.text.length) byLetter.set(o.letter, o);
  }
  return [...byLetter.values()].sort((a, b) => a.letter.localeCompare(b.letter));
}

function parseBlock(block, n) {
  const body = block.replace(/^\s*\d+\)\s*/, '');
  const ansAt = body.search(/Answer:/);
  if (ansAt < 0) return { skipped: { n, why: 'no answer' } };

  const answerRaw = body.slice(ansAt).replace(/^Answer:\s*/, '');
  const letter = answerRaw.match(/^([A-E])\b/);

  if (!letter) {
    /* A short-answer question. Kept, as its own type. */
    const stem = tidy(body.slice(0, ansAt));
    const answer = tidy(answerRaw).replace(/\s*Diff:.*$/i, '');
    if (!stem || !answer) return { skipped: { n, why: 'short answer, but empty' } };
    return { question: { n, type: 'short', stem, answer } };
  }

  const optAt = body.search(/(?:^|\s)A\)\s/);
  if (optAt < 0 || optAt > ansAt) return { skipped: { n, why: 'letter answer but no options found' } };

  const stem = tidy(body.slice(0, optAt));
  const options = readOptions(body.slice(optAt, ansAt));
  if (!stem) return { skipped: { n, why: 'empty stem' } };
  if (options.length < 2) return { skipped: { n, why: `only ${options.length} option(s) parsed` } };
  /*
   * The answer names an option the text does not contain. Two very different
   * causes, and only one of them is ours: either the split lost it, or the
   * PDF's text layer never had it. Distinguish them, because the second is a
   * gap in the source and no amount of parser work will close it — and a
   * question whose correct option is unknown must not be served at all.
   */
  if (!options.some((o) => o.letter === letter[1])) {
    const marker = new RegExp(`(^|\\s)${letter[1]}\\)`);
    return {
      skipped: {
        n,
        why: marker.test(body.slice(optAt, ansAt))
          ? `option ${letter[1]} present but not parsed`
          : `option ${letter[1]} absent from the extracted text (PDF extraction gap)`,
      },
    };
  }
  return { question: { n, type: 'mcq', stem, options, answer: letter[1] } };
}

/* ------------------------------------------------------------------ *
 * Gather
 * ------------------------------------------------------------------ */

if (!existsSync(CATALOGUE)) {
  console.error('work/source-catalogue.json is missing — run work/build-source-catalogue.mjs');
  process.exit(2);
}
const catalogue = JSON.parse(readFileSync(CATALOGUE, 'utf8'));
const docs = catalogue.docs
  .filter((d) => d.at.some((a) => FOLDER.test(a[1])))
  .sort((a, b) => {
    const na = Number((a.n.match(/(\d+)/) || [])[1] ?? 0);
    const nb = Number((b.n.match(/(\d+)/) || [])[1] ?? 0);
    return na - nb || a.n.localeCompare(b.n);
  });

if (!docs.length) {
  console.error(`no documents in the catalogue match /${FOLDER.source}/i`);
  process.exit(2);
}

console.log(`— ${docs.length} document(s) match /${FOLDER.source}/i —\n`);

const questions = [];
const perFile = [];
let missingText = 0;

for (const d of docs) {
  const path = join(CACHE, `${cacheKey(d)}.txt.gz`);
  if (!existsSync(path)) {
    missingText += 1;
    perFile.push({ name: d.n, mcq: 0, short: 0, skipped: 0, note: 'no cached text — run build-source-text.mjs' });
    continue;
  }
  const text = stripMargin(gunzipSync(readFileSync(path)).toString('utf8'));
  const chapter = Number((d.n.match(/(\d+)/) || [])[1] ?? 0) || null;
  const slug = `ch${String(chapter ?? 0).padStart(2, '0')}`;

  const starts = findStarts(text);
  let mcq = 0; let short = 0; const skipped = [];
  for (let k = 0; k < starts.length; k += 1) {
    const end = k + 1 < starts.length ? starts[k + 1].index : text.length;
    const r = parseBlock(text.slice(starts[k].index, end), starts[k].n);
    if (r.skipped) { skipped.push(r.skipped); continue; }
    questions.push({
      qid: `${slug}-q${String(r.question.n).padStart(3, '0')}`,
      chapter,
      source: d.n,
      ...r.question,
    });
    if (r.question.type === 'mcq') mcq += 1; else short += 1;
  }

  /* What the file itself claims to hold, so the report compares against the
     document rather than against the parser's own opinion of it. */
  const claimsLetter = (text.match(/Answer:\s*[A-E]\b/g) || []).length;
  const claimsAny = (text.match(/Answer:/g) || []).length;
  perFile.push({ name: d.n, mcq, short, skipped: skipped.length, claimsLetter, claimsAny, reasons: skipped });
}

/* ------------------------------------------------------------------ *
 * Report
 * ------------------------------------------------------------------ */

const pad = (s, n) => String(s).padStart(n);
console.log('file                     mcq  / of   short  skipped');
for (const f of perFile) {
  if (f.note) { console.log(`${f.name.padEnd(24)} ${f.note}`); continue; }
  console.log(`${f.name.padEnd(24)}${pad(f.mcq, 4)} /${pad(f.claimsLetter, 4)}  ${pad(f.short, 5)}  ${pad(f.skipped, 7)}`);
}

const totMcq = perFile.reduce((a, f) => a + (f.mcq || 0), 0);
const totShort = perFile.reduce((a, f) => a + (f.short || 0), 0);
const totClaims = perFile.reduce((a, f) => a + (f.claimsLetter || 0), 0);
const totSkip = perFile.reduce((a, f) => a + (f.skipped || 0), 0);
const pct = totClaims ? ((100 * totMcq) / totClaims).toFixed(1) : '0.0';

console.log(`\n  ${totMcq} multiple-choice of ${totClaims} letter answers present  (${pct}%)`);
console.log(`  ${totShort} short-answer questions kept`);
console.log(`  ${totSkip} blocks skipped`);
if (missingText) console.log(`  ${missingText} file(s) had no cached text`);

const why = {};
for (const f of perFile) for (const s of f.reasons || []) why[s.why] = (why[s.why] || 0) + 1;
if (Object.keys(why).length) {
  console.log('\n  why blocks were skipped:');
  for (const [w, n] of Object.entries(why).sort((a, b) => b[1] - a[1])) console.log(`    ${pad(n, 5)}  ${w}`);
}

if (REPORT_ONLY) {
  console.log('\n--report given; nothing written.');
  process.exit(0);
}

/* ------------------------------------------------------------------ *
 * Write
 * ------------------------------------------------------------------ */

mkdirSync(dirname(OUT), { recursive: true });
const pack = {
  format: 'rss.pack',
  formatVersion: 1,
  packId: PACK_ID,
  builtAt: Date.now(),
  builtAtISO: new Date().toISOString(),
  /* Provenance, so a pack found on a device can be identified — and so it is
     obvious to anyone reading it that this is licensed material. */
  origin: {
    folder: FOLDER.source,
    files: perFile.map((f) => ({ name: f.name, mcq: f.mcq || 0, short: f.short || 0 })),
    licence: 'Publisher test bank. Private study copy. Not for redistribution.',
  },
  counts: { mcq: totMcq, short: totShort, total: questions.length },
  questions,
};
writeFileSync(OUT, JSON.stringify(pack));
const mb = (JSON.stringify(pack).length / 1048576).toFixed(2);
console.log(`\nwrote ${relative(root, OUT).replace(/\\/g, '/')}  —  ${questions.length} questions, ${mb} MB`);
console.log('gitignored, and work/pack-privacy-check.mjs asserts it stays that way.');
