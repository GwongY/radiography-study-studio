/*
 * Build work/course-terms.json — which of the model's 1,687 named structures
 * the course actually asks you to know by name.
 *
 * WHY THIS EXISTS
 *
 * The seven GLB layers name 1,687 structures. A first- and second-year
 * radiography student is not asked to memorise 1,687 names, and an index that
 * offers all of them as equal, individually pressable rows teaches nothing
 * about what matters: the segmental bronchi buried the lobar bronchi, and
 * fourteen phalanges of one foot buried the foot.
 *
 * The previous version decided depth with a hand-written vocabulary regex
 * (\bsegmental\b, \bbranch of\b, ...). That was a guess about the syllabus
 * written into this repo, which is exactly what the source-traceability rule
 * exists to prevent. This script replaces the guess with the sources: a
 * structure is at course level when the course names it, and the row records
 * WHICH file names it.
 *
 * WHAT COUNTS AS "THE COURSE NAMES IT"
 *
 * The corpus is the taught and assessed material for the two subjects that
 * teach this anatomy:
 *
 *   HSS2011 Human Anatomy   the glossary, both study manuals, every module
 *                           lecture (2019/20 and the previous-year sets), every
 *                           revision exercise, the model answers, the MOOCs and
 *                           every past paper on the drive
 *   ABCT2326 Human Physiology  the ten system lectures, the supplementary
 *                           decks, tutorial answers, extra exercises, papers
 *
 * Three things are deliberately EXCLUDED, and the exclusion is the whole point:
 *
 *   - Martini, "Fundamentals of Anatomy & Physiology" (the set eBook). It is a
 *     1,300-page reference that names essentially every structure in the body.
 *     Counting it would mark almost all 1,687 rows as course level and rebuild
 *     the problem this script exists to solve. It remains a source for facts;
 *     it is not evidence that a NAME must be memorised.
 *   - student coursework, recognised by WHERE it sits: a Lab Report folder, an
 *     Assignment. The source registry already treats student work as evidence
 *     of topic scope only.
 *   - the physiology question bank, which is publisher material, not taught.
 *
 * "Susan notes" was on that list and should not have been. The four files of
 * that name sit inside the numbered lecture folders — 7. Endocrine, 8. Nervous,
 * 9. Musculoskeletal, 10. Immune — one per system, which is where the lecturer
 * puts lecture material and not where anyone files their own coursework. The
 * catalogue classifies all four `primary`. The proof is the endocrine one: it
 * is byte-identical to `ABCT2326 Hormone Mechanism _ABCT2326_.pdf`, registered
 * as source phys.hormech and already taught from. A name-based exclusion was
 * withholding, from the evidence of what the course teaches, a document the
 * course teaches. Exclusions here are about PROVENANCE — decide them by folder,
 * never by filename.
 *
 * Requires: the shared drive mounted, and `pdftotext` (poppler) on PATH.
 * The output is committed, so build-mesh-index.mjs runs without either.
 *
 * Usage: node work/build-course-terms.mjs [--root <Year 1 Sem 1 Source>]
 */
import { readFileSync, writeFileSync, readdirSync, statSync, mkdtempSync, rmSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname, relative, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import { collectStructures } from './lib/mesh-names.mjs';

const WORK = dirname(fileURLToPath(import.meta.url));

/* ------------------------------------------------------------------ *
 * Finding the sources
 * ------------------------------------------------------------------ */

/* The Uni/ shortcuts resolve into this; enumerate it rather than trusting the
   .lnk list (see CLAUDE.md). */
const SHORTCUT_ROOT = 'G:/.shortcut-targets-by-id';

function findRoot() {
  const flag = process.argv.indexOf('--root');
  if (flag >= 0 && process.argv[flag + 1]) return process.argv[flag + 1];
  if (!existsSync(SHORTCUT_ROOT)) return null;
  for (const id of readdirSync(SHORTCUT_ROOT)) {
    const dir = join(SHORTCUT_ROOT, id);
    let kids = [];
    try { kids = readdirSync(dir); } catch { continue; }
    for (const k of kids) {
      if (k === 'Year 1 Sem 1 Source') return join(dir, k);
    }
  }
  return null;
}

const ROOT = findRoot();
if (!ROOT) {
  console.error('Could not find "Year 1 Sem 1 Source" under ' + SHORTCUT_ROOT + '.');
  console.error('Mount the shared drive, or pass --root <path>.');
  process.exit(2);
}

const SUBJECTS = [
  { id: 'HSS2011', dir: 'HSS2011 Human Anatomy' },
  { id: 'ABCT2326', dir: 'ABCT2326 Human Physiology' },
];

/* See the header: a reference textbook, student coursework and publisher
   question banks are not evidence that a name must be memorised. Every pattern
   here names a PLACE or a document type, never a particular file — a filename
   cannot tell you who wrote something, and one that tried got it wrong. */
const EXCLUDE = [
  /eBook/i,
  /Question Bank/i,
  /[/\\]Lab Report[/\\]/i,
  /Assignment/i,
  /Marking Rubrics/i,
  /Subject Desc/i,
];

function walk(dir, out = []) {
  let kids = [];
  try { kids = readdirSync(dir); } catch { return out; }
  for (const k of kids) {
    const p = join(dir, k);
    let st;
    try { st = statSync(p); } catch { continue; }
    if (st.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

/* ------------------------------------------------------------------ *
 * Reading them
 * ------------------------------------------------------------------ */

const tmp = mkdtempSync(join(tmpdir(), 'rss-terms-'));

function pdfText(file) {
  const out = join(tmp, 'x.txt');
  try {
    execFileSync('pdftotext', ['-layout', file, out], { stdio: 'ignore' });
    return readFileSync(out, 'utf8');
  } catch { return ''; }
}

/* A .pptx is a zip of XML; the slide text is every <a:t> run. No dependency
   beyond what node already ships (raw DEFLATE via zlib). */
import { inflateRawSync } from 'node:zlib';
function pptxText(file) {
  let buf;
  try { buf = readFileSync(file); } catch { return ''; }
  const parts = [];
  /* central directory: walk the End Of Central Directory back to each entry */
  let eocd = buf.length - 22;
  while (eocd >= 0 && buf.readUInt32LE(eocd) !== 0x06054b50) eocd--;
  if (eocd < 0) return '';
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  for (let i = 0; i < count; i++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) break;
    const method = buf.readUInt16LE(p + 10);
    const compSize = buf.readUInt32LE(p + 20);
    const nameLen = buf.readUInt16LE(p + 28);
    const extraLen = buf.readUInt16LE(p + 30);
    const commentLen = buf.readUInt16LE(p + 32);
    const localOff = buf.readUInt32LE(p + 42);
    const name = buf.slice(p + 46, p + 46 + nameLen).toString('utf8');
    p += 46 + nameLen + extraLen + commentLen;
    if (!/^ppt\/(slides|notesSlides)\/.*\.xml$/.test(name)) continue;
    const lNameLen = buf.readUInt16LE(localOff + 26);
    const lExtraLen = buf.readUInt16LE(localOff + 28);
    const start = localOff + 30 + lNameLen + lExtraLen;
    const raw = buf.slice(start, start + compSize);
    let xml;
    try { xml = method === 0 ? raw.toString('utf8') : inflateRawSync(raw).toString('utf8'); }
    catch { continue; }
    for (const m of xml.matchAll(/<a:t>([\s\S]*?)<\/a:t>/g)) parts.push(m[1]);
  }
  return parts.join('\n');
}

/* ------------------------------------------------------------------ *
 * Matching
 *
 * Both sides are flattened to lowercase words. Two kinds of difference have to
 * survive that, or real hits are lost:
 *
 *   spelling   the atlas writes oesophagus / coeliac / caecum, the notes are
 *              mixed; the model also misspells "Bucinator"
 *   apposition the atlas adds a generic head noun the notes usually drop --
 *              "Deltoid muscle" for deltoid, "Scaphoid bone" for scaphoid
 * ------------------------------------------------------------------ */

const SPELL = [
  [/oesophag/g, 'esophag'], [/coeliac/g, 'celiac'], [/caecum/g, 'cecum'],
  [/haemat/g, 'hemat'], [/haem/g, 'hem'], [/foetal/g, 'fetal'],
  [/leucocyt/g, 'leukocyt'], [/fibre/g, 'fiber'], [/bucinator/g, 'buccinator'],
  [/tympanum/g, 'tympanic'],
];

export function norm(s) {
  let t = String(s).toLowerCase();
  t = t.replace(/\([^)]*\)/g, ' ');
  for (const [re, to] of SPELL) t = t.replace(re, to);
  return t.replace(/[^a-z0-9]+/g, ' ').trim();
}

const TAIL = /\s+(muscle|muscles|bone|bones|nerve|nerves|vein|veins|artery|arteries|node|nodes|ligament|ligaments|joint|joints|gland|glands|cartilage|sinus|tendon|fascia|bursa)$/;

export function variants(name) {
  const v = new Set();
  const base = norm(name);
  if (!base) return v;
  v.add(base);
  const noTail = base.replace(TAIL, '');
  if (noTail !== base && noTail.length > 2) v.add(noTail);
  for (const s of [...v]) {
    const w = s.split(' ');
    const last = w[w.length - 1];
    if (/ies$/.test(last)) v.add([...w.slice(0, -1), last.slice(0, -3) + 'y'].join(' '));
    else if (/es$/.test(last)) v.add([...w.slice(0, -1), last.slice(0, -2)].join(' '));
    if (/s$/.test(last) && !/ss$/.test(last)) v.add([...w.slice(0, -1), last.slice(0, -1)].join(' '));
    v.add([...w.slice(0, -1), last + 's'].join(' '));
  }
  return v;
}

/*
 * Second kind of evidence: proximity.
 *
 * Exact phrase matching is too strict for compositional names. The atlas calls
 * a lobe "Superior lobe of right lung"; the notes say "the right lung is
 * divided into superior, middle and inferior lobes" -- the same fact, taught,
 * examined, and invisible to a phrase search. The same happens to the main
 * bronchi ("the trachea divides into the right and left main bronchi") and to
 * every vertebra the model spells "Vertebra T7".
 *
 * So a name also counts when all of its content words appear inside one short
 * window of one document. The window is deliberately tight: six words of slack
 * over the length of the name. "Anterior basal segmental bronchus of left
 * lung" still fails, because no sentence in the corpus puts 'basal' next to
 * 'segmental' next to 'lung' -- which is the correct answer, since the course
 * does not name the basal segmental bronchi.
 */
const STOP = new Set(['of', 'the', 'and', 'a', 'an', 'in', 'to', 'for', 'with', 'or']);
const SLACK = 6;

function contentWords(name) {
  return norm(name).split(' ').filter((w) => w && !STOP.has(w));
}

/* one plural/singular-tolerant matcher per word, matched as a whole word */
function wordRe(w) {
  /*
   * Latin plurals have to survive this or real matches are lost: the atlas
   * says "Left main bronchus" and the notes say "the trachea divides into the
   * right and left main bronchi". Stemming off only the English -s left
   * "bronchu", which "bronchi" does not begin with, so the main bronchi came
   * out below course level -- and which of the two is wider and more vertical
   * is the whole point of an inhaled-foreign-body question.
   *
   * So the stem drops a trailing us/um/a/is/es/s as well, and up to four
   * letters may follow it. Looseness is safe here because proximity already
   * demands that EVERY word of the name land in one short window.
   */
  const stem = w.replace(/(ies|es|us|um|is|a|s)$/, '');
  const body = stem.length >= 4 ? stem : w;
  /* norm() has already reduced both sides to [a-z0-9 ], so nothing needs
     escaping and nothing can inject regex syntax. */
  return new RegExp('(?:^| )' + body + '[a-z]{0,4}(?= |$)');
}

function nearIn(doc, words) {
  if (words.length < 2) return false;
  const res = words.map(wordRe);
  const toks = doc.tokens || (doc.tokens = doc.text.trim().split(' '));
  const window = words.length + SLACK;
  for (let i = 0; i < toks.length; i++) {
    if (!res[0].test(' ' + toks[i])) continue;
    const lo = Math.max(0, i - window), hi = Math.min(toks.length, i + window + 1);
    const slice = ' ' + toks.slice(lo, hi).join(' ') + ' ';
    if (res.every((re) => re.test(slice))) return true;
  }
  return false;
}

/* ------------------------------------------------------------------ *
 * Run
 * ------------------------------------------------------------------ */

const docs = [];
for (const sub of SUBJECTS) {
  const base = join(ROOT, sub.dir);
  if (!existsSync(base)) { console.warn(`  (missing) ${sub.dir}`); continue; }
  for (const file of walk(base)) {
    const rel = relative(ROOT, file).replace(/\\/g, '/');
    if (EXCLUDE.some((re) => re.test(rel))) continue;
    const ext = extname(file).toLowerCase();
    let text = '';
    if (ext === '.pdf') text = pdfText(file);
    else if (ext === '.pptx') text = pptxText(file);
    else continue;
    if (!text.trim()) continue;
    /* the glossary is a term LIST, so it keeps its raw two-column layout */
    const keepRaw = /Vocabulary\.pdf$/i.test(rel);
    docs.push({ subject: sub.id, file: rel, name: basename(file),
      text: ' ' + norm(text) + ' ', raw: keepRaw ? text : null });
  }
}
rmSync(tmp, { recursive: true, force: true });
console.log(`corpus: ${docs.length} documents, ${docs.reduce((a, d) => a + d.text.length, 0).toLocaleString()} normalised characters`);
if (docs.length < 20) { console.error('corpus too small — is pdftotext on PATH?'); process.exit(2); }

/*
 * The glossary is a term LIST, not prose, so it is read as exact terms rather
 * than searched as text. It is the strongest evidence there is: it is the
 * course's own statement of which names are examinable.
 */
const glossDoc = docs.find((d) => /Vocabulary\.pdf$/i.test(d.file));
const glossary = new Set();
const glossarySets = new Set();
if (glossDoc && glossDoc.raw) {
  for (const ln of glossDoc.raw.split('\n')) {
    /* two columns; a run of two or more spaces is the gutter */
    for (const chunk of ln.replace(/\f/g, ' ').trim().split(/\s{2,}/)) {
      const c = chunk.trim();
      if (!c || c.length < 3) continue;
      if (/^For reference|^subject assessments|^Glossary$/i.test(c)) continue;
      /* "Aortic Arch/ Arch of Aorta" is two names for one thing */
      for (const part of c.split('/')) { const t = norm(part); if (t.length > 2) glossary.add(t); }
      /* Word order differs between the atlas and the glossary -- "Proper
         hepatic artery" against "Hepatic Artery Proper" -- so each entry is
         also indexed by its sorted set of content words. */
      for (const part of c.split('/')) {
        const w = norm(part).split(' ').filter((x) => x && !STOP.has(x));
        if (w.length > 1) glossarySets.add(w.slice().sort().join(' '));
      }
    }
  }
}
console.log(`glossary: ${glossary.size} examinable term names`);
if (glossary.size < 500) { console.error('glossary did not parse — expected >1000 terms'); process.exit(2); }

const { rows } = collectStructures();
console.log(`model: ${rows.length} named structures`);

const sources = [];
const sourceIndex = new Map();
const sourceId = (file, subject) => {
  if (!sourceIndex.has(file)) { sourceIndex.set(file, sources.length); sources.push({ file, subject }); }
  return sourceIndex.get(file);
};

const named = {};
let hitGloss = 0, hitPhrase = 0, hitNear = 0;
for (const r of rows) {
  const key = r.layer + '|' + r.name;
  const vs = [...variants(r.name)];
  const set = contentWords(r.name).slice().sort().join(' ');
  if (vs.some((v) => glossary.has(v)) || glossarySets.has(set)) {
    named[key] = [sourceId(glossDoc.file, glossDoc.subject), 'listed'];
    hitGloss++;
    continue;
  }
  const d = docs.find((doc) => doc !== glossDoc && vs.some((v) => doc.text.includes(' ' + v + ' ')));
  if (d) { named[key] = [sourceId(d.file, d.subject), 'named']; hitPhrase++; continue; }
  /*
   * Proximity never runs over the glossary. It is a two-column term LIST, and
   * flattening it to prose puts unrelated entries next to each other -- that
   * adjacency alone was enough to "find" the third rib. The glossary is
   * matched exactly, above, in both orders.
   */
  const words = contentWords(r.name);
  const n = docs.find((doc) => doc !== glossDoc && nearIn(doc, words));
  if (n) { named[key] = [sourceId(n.file, n.subject), 'described']; hitNear++; }
}

/*
 * Fourth pass: the other side.
 *
 * The left lung's inferior lobe came out below course level while the right
 * lung's three lobes and the left lung's superior lobe were all above it --
 * because the 2014-15 paper that names the right lung's lobes happens not to
 * spell out the left's second one. Nothing about the course makes one side
 * examinable and its mirror image not; that gap is an accident of which
 * sentence a marker happened to write.
 *
 * So a structure whose left/right twin is named by the course is named by the
 * course, and the row says so -- 'mirrored', pointing at the file that names
 * the twin. This is a fact about the model's own naming, not a claim about
 * the syllabus: the two rows are the same structure on opposite sides.
 */
{
  const flip = (n) => (/\bleft\b/i.test(n) ? n.replace(/\bleft\b/gi, 'right')
    : /\bright\b/i.test(n) ? n.replace(/\bright\b/gi, 'left') : null);
  let mirrored = 0;
  for (const r of rows) {
    const key = r.layer + '|' + r.name;
    if (named[key]) continue;
    const other = flip(r.name);
    if (!other) continue;
    const twin = named[r.layer + '|' + other];
    if (!twin) continue;
    named[key] = [twin[0], 'mirrored'];
    mirrored++;
  }
  console.log(`mirrored from the other side: ${mirrored}`);
}

/*
 * Fifth pass: the rest of a numbered series.
 *
 * The corpus names Vertebra T1, T2, T4, T5, T6 and T12 and happens never to
 * spell out T3 or T7-T11 -- so six thoracic vertebrae came out above course
 * level and six below, which is not a distinction the course draws. Nothing
 * teaches "the fourth thoracic vertebra is examinable and the third is not";
 * it teaches the thoracic vertebrae, and a lecture cannot list all twelve
 * every time it mentions them.
 *
 * So when a numbered series is repeatedly named, the rest of it is named too,
 * and the row says so -- 'series', pointing at the file that names its
 * siblings. Three separate members have to be named, and they have to be at
 * least a quarter of the series. Measured over the whole model that admits
 * exactly two: the thoracic vertebrae and the lumbar. The twelve ribs (two
 * named) and the five cervical discs (one) stay below it, as do the fourteen
 * series -- segmental bronchi, phalanges, dorsal metatarsal veins -- that the
 * sources never touch at all.
 */
{
  const key = (n) => n
    .replace(/\b([CTLS])\d{1,2}\b/g, '$1#')          /* Vertebra T3, disc L5-S1 */
    .replace(/\b(first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|eleventh|twelfth)\b/gi, '#')
    .replace(/\b\d+\b/g, '#');
  const series = new Map();
  for (const r of rows) {
    const k = r.layer + '|' + key(r.name);
    if (k === r.layer + '|' + r.name) continue;         /* no number in it at all */
    series.set(k, [...(series.get(k) || []), r]);
  }
  let filled = 0;
  for (const [, members] of series) {
    if (members.length < 3) continue;
    const known = members.filter((r) => named[r.layer + '|' + r.name]);
    if (known.length < 3 || known.length * 4 < members.length) continue;
    const src = named[known[0].layer + '|' + known[0].name][0];
    for (const r of members) {
      const k = r.layer + '|' + r.name;
      if (named[k]) continue;
      named[k] = [src, 'series'];
      filled++;
    }
  }
  console.log(`completed from the rest of a series: ${filled}`);
}

const out = {
  generated: new Date().toISOString().slice(0, 10),
  note: 'GENERATED by work/build-course-terms.mjs. Which model structures the '
    + 'HSS2011 / ABCT2326 taught and assessed material names. The set eBook, '
    + 'student coursework and the publisher question bank are excluded on '
    + 'purpose — see that file\'s header.',
  corpus: { documents: docs.length, glossaryTerms: glossary.size, structures: rows.length },
  sources,
  named,
};
writeFileSync(join(WORK, 'course-terms.json'), JSON.stringify(out, null, 1) + '\n');

console.log(`named by the course: ${Object.keys(named).length} of ${rows.length}`
  + ` (${hitGloss} listed in the glossary, ${hitPhrase} named verbatim, ${hitNear} described in place)`);
const byLayer = {};
for (const r of rows) {
  byLayer[r.layer] = byLayer[r.layer] || [0, 0];
  byLayer[r.layer][1]++;
  if (named[r.layer + '|' + r.name]) byLayer[r.layer][0]++;
}
for (const [k, [a, b]] of Object.entries(byLayer)) {
  console.log(`  ${k.padEnd(12)} ${String(a).padStart(4)} / ${String(b).padStart(4)}`);
}
