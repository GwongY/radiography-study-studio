/*
 * Write a work list of everything the corpus has not read, for handing to
 * another tool.
 *
 * There are TWO groups and they need different work, which is the whole reason
 * this file exists rather than one flat list:
 *
 *   READABLE   the text is already extracted and sitting in work/.source-text/
 *              as <hash>.txt.gz. Nothing needs re-reading off the drive — a
 *              reader can gunzip the named file and go. These are documents
 *              nobody has JUDGED, not documents nobody can open.
 *
 *   NEEDS-OCR  the extractor got nothing: scanned pages, or a legacy .doc/.ppt
 *              binary. There is no text to hand anyone. The only useful column
 *              is the path to the ORIGINAL on the drive, because the work is
 *              optical character recognition, not reading.
 *
 * Confusing the two wastes the most expensive thing available — OCR effort on
 * files that already have perfectly good text.
 *
 * Output is a TSV written into work/.source-text/, which is gitignored: it
 * names drive paths and is regenerable, so it does not belong in the repo.
 *
 * Usage:
 *   node work/unread-manifest.mjs             the three Semester 1 subjects
 *   node work/unread-manifest.mjs --all       every catalogued document
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SOURCE_FILES } from '../outputs/study/corpus/schema.js';

const WORK = dirname(fileURLToPath(import.meta.url));
const CACHE = join(WORK, '.source-text');

const ALL = process.argv.includes('--all');
/* Separate files per scope, so one run does not overwrite the other's list. */
const OUT = join(CACHE, ALL ? 'UNREAD-MANIFEST-all.tsv' : 'UNREAD-MANIFEST-sem1.tsv');

const cat = JSON.parse(readFileSync(join(WORK, 'source-catalogue.json'), 'utf8'));
const key = (d) => createHash('sha1').update(`${d.n.toLowerCase()}|${d.b}`).digest('hex').slice(0, 16);
const locations = (d) => d.at.map(([ri, p]) => `${ri < 0 ? '?' : cat.roots[ri].split('/').pop()}/${p}`);
const fullPath = (d) => { const [ri, p] = d.at[0]; return ri < 0 ? p : `${cat.roots[ri]}/${p}`; };

/* The cache index, unioned across shards. */
const idx = {};
if (existsSync(CACHE)) {
  for (const f of readdirSync(CACHE)) {
    if (!/^index(-\d+)?\.json$/.test(f)) continue;
    try { Object.assign(idx, JSON.parse(readFileSync(join(CACHE, f), 'utf8'))); } catch { /* mid-write */ }
  }
}

/* The three subjects the corpus teaches, spelled as the drive spells them. */
const SUBJECTS = [
  { id: 'HSS2011', pats: [/\bHSS2011\b/i, /\bHSS201\b/, /human anatomy/i] },
  { id: 'ABCT2326', pats: [/\bABCT2326\b/i, /human physiology/i, /physi(ology)? ?source/i] },
  { id: 'HTI17103', pats: [/\bHTI17103\b/i, /radiograph(er|y) (role|to be)/i, /radiation (therapy|science)/i] },
];

/* Already read = cited by the corpus, under any of its filenames. */
const citedNames = new Set(Object.values(SOURCE_FILES).map((e) => String(e.file).toLowerCase()));

/* Vocabulary containment against the cited sources — the same coarse measure
   coverage-gap.mjs uses, and used here for the same one purpose: sorting
   "already read under another name" from "never seen". Never as a claim that
   two documents are equal. */
const vocab = (t) => new Set(t.toLowerCase().match(/[a-z]{5,}/g) || []);
const squash = (t) => t.replace(/\s+/g, '').toLowerCase();

/* Highest vocabulary overlap against any one cited source. Coarse on purpose:
   it sorts "already read under another name" from "never seen", and is never
   a claim that two documents are the same thing. */
const bestShare = (v, pile) => {
  let best = 0;
  for (const c of pile) {
    let hit = 0;
    for (const w of v) if (c.v.has(w)) hit++;
    const share = hit / v.size;
    if (share > best) best = share;
  }
  return best;
};
const citedVocab = [];
const citedText = join(WORK, 'source-text.json');
if (existsSync(citedText)) {
  const { sources } = JSON.parse(readFileSync(citedText, 'utf8'));
  for (const [id, s] of Object.entries(sources)) citedVocab.push({ id, v: vocab(s.pages.join(' ')) });
}
/*
 * The reference works go in a SEPARATE pile, and that separation is the whole
 * point.
 *
 * They are cited, and deliberately absent from the committed file, so pulling
 * them from the cache is right. But putting them in the same pile as the taught
 * material destroys the measure: the Martini eBook is 1,300 pages that name
 * essentially every structure in the body, so EVERY document scores as
 * "already read" against it and the work list comes back empty. It did — this
 * script reported zero unread documents on its first run.
 *
 * build-course-terms.mjs excludes the same book for the same reason. So:
 * taught material answers "have we read this teaching?", and the reference pile
 * answers the different question "is this just the textbook again?".
 */
const referenceText = [];
for (const [id, e] of Object.entries(SOURCE_FILES)) {
  if (!/eBook|Question Bank/i.test(e.file)) continue;
  const d = cat.docs.find((x) => x.n.toLowerCase() === String(e.file).toLowerCase());
  if (!d) continue;
  try {
    const t = gunzipSync(readFileSync(join(CACHE, `${key(d)}.txt.gz`))).toString('utf8');
    referenceText.push({ id, t: squash(t) });
  } catch { /* not cached yet */ }
}

/*
 * WHAT KIND OF DOCUMENT IS THIS, structurally?
 *
 * Not "is it the textbook" -- that question was tried twice and got a wrong
 * answer both times. Vocabulary containment called the lecturer's own notes a
 * textbook duplicate at 94-99%, because a physiology textbook contains every
 * physiology word. Verbatim passage sampling then called a chapter of the cited
 * test bank NEW, because contiguous slices straddle the per-question metadata
 * ("Diff:1", "Page Ref:") that the re-split chapters do not carry. Both are
 * plausible measures and both misfire, in opposite directions, on the documents
 * that matter most.
 *
 * So this file stops guessing. It reports what can be established cheaply and
 * reliably -- the SHAPE of the document -- and leaves the judgement to whoever
 * reads it. An exam paper announces itself: "MULTIPLE CHOICE", numbered stems,
 * "Answer: C". That signal is structural and does not depend on comparing one
 * document to another, so it cannot be fooled by a shared subject.
 *
 * A reader wanting only teaching material skips the EXAM rows. A reader hunting
 * for practice questions reads nothing else. Neither is misled by a verdict the
 * tool was not able to make.
 */
function shapeOf(text) {
  const head = text.slice(0, 40000);
  const answers = (head.match(/\bAnswer:\s*[A-E]\b/g) || []).length;
  const mc = /MULTIPLE CHOICE|Choose the one alternative|TRUE\/FALSE/i.test(head);
  const stems = (head.match(/\n\s*\d{1,3}\)\s/g) || []).length;
  if (answers >= 5 || (mc && stems >= 5)) return 'EXAM';
  if (stems >= 15) return 'EXERCISE';
  const pages = text.split('\f').length;
  const perPage = text.length / Math.max(1, pages);
  if (pages >= 8 && perPage < 900) return 'SLIDES';
  return 'PROSE';
}

const rows = [];
const seenText = new Set();
let examCount = 0;   /* collapse re-shares by their TEXT, not their name */

for (const d of cat.docs) {
  const paths = locations(d);
  const hay = `${paths.join(' ')} ${d.n}`;
  const subject = SUBJECTS.find((s) => s.pats.some((p) => p.test(hay)));
  if (!ALL && !subject) continue;
  if (citedNames.has(d.n.toLowerCase())) continue;     /* already a source */

  const k = key(d);
  const meta = idx[k];

  if (meta && meta.ok === false) {
    rows.push({ status: 'NEEDS-OCR', subject: subject?.id || '-', kind: d.kind || '-',
      shape: '', share: '', chars: '', pages: '', why: meta.why, text: '', drive: fullPath(d), name: d.n });
    continue;
  }
  if (!meta) continue;                                  /* not in the cache at all */

  let t = null;
  try { t = gunzipSync(readFileSync(join(CACHE, `${k}.txt.gz`))).toString('utf8'); } catch { continue; }
  const v = vocab(t);
  if (v.size < 40) continue;                            /* too little to judge */

  /* One row per distinct TEXT: the drive holds the same lecture under many
     names, and a work list that repeats it wastes the reader's time. */
  const fp = createHash('sha1').update(t).digest('hex');
  if (seenText.has(fp)) continue;
  seenText.add(fp);

  /* Textbook or test-bank material re-split under another name. Counted and
     reported, never handed to a reader as something new. */
  const shape = shapeOf(t);
  if (shape === 'EXAM' || shape === 'EXERCISE') examCount++;

  /*
   * Overlap is REPORTED, never used to drop a row.
   *
   * Three thresholds were tried here and all three hid something that mattered.
   * The last one, "55% vocabulary overlap means already read", threw away the
   * lecturer's musculoskeletal and immunology notes at 61% -- they share a
   * system's vocabulary with that system's lecture slides, which is exactly
   * what you would expect of two documents about the same topic, and says
   * nothing about whether one contains what the other lacks.
   *
   * Exact-text identity is the only reliable filter available, and it is
   * already applied above via the fingerprint. Similarity is a hint for
   * ordering, so it sorts the list and fills a column. The reader decides.
   */
  const best = bestShare(v, citedVocab);

  rows.push({ status: 'READABLE', subject: subject?.id || '-', kind: d.kind || '-',
    shape, share: Math.round(best * 100), chars: t.length, pages: t.split('\f').length, why: '',
    text: `work/.source-text/${k}.txt.gz`, drive: fullPath(d), name: d.n });
}

rows.sort((a, b) => (a.status.localeCompare(b.status)) || (a.share === '' ? 0 : a.share - b.share));

const head = ['status', 'subject', 'kind', 'shape', 'overlap%', 'chars', 'pages', 'why', 'textFile', 'drivePath', 'name'];
const tsv = [head.join('\t')].concat(rows.map((r) =>
  [r.status, r.subject, r.kind, r.shape, r.share, r.chars, r.pages, r.why, r.text, r.drive, r.name].join('\t'))).join('\n');
writeFileSync(OUT, `${tsv}\n`, 'utf8');

const readable = rows.filter((r) => r.status === 'READABLE');
const ocr = rows.filter((r) => r.status === 'NEEDS-OCR');
console.log(`scope: ${ALL ? 'every catalogued document' : 'the three Semester 1 subjects'}`);
console.log(`READABLE  ${String(readable.length).padStart(4)}  distinct texts not registered as sources — extracted, unjudged`);
console.log(`NEEDS-OCR ${String(ocr.length).padStart(4)}  no text layer — OCR the drivePath`);
console.log(`  of those, ${examCount} are exam or exercise papers by shape — skip them for teaching content, read them for practice`);
console.log(`\n-> ${OUT}`);
if (readable.length) {
  console.log('\nteaching-shaped documents, least like anything already cited:');
  for (const r of readable.filter((x) => x.shape === 'PROSE' || x.shape === 'SLIDES').slice(0, 14)) {
    console.log(`  ${String(r.share).padStart(3)}%  ${r.shape.padEnd(6)} ${String(r.pages).padStart(4)}p  ${r.name.slice(0, 44).padEnd(44)} ${r.text}`);
  }
}
