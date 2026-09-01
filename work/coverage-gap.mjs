/*
 * What of the Semester 1 material has the corpus actually been built from, and
 * what has never been opened?
 *
 * "Is the app based on a lot of unread documents?" is the right question to ask
 * of something that claims source traceability, and until there was a catalogue
 * it could not be answered at all — the honest reply was "the 76 files in
 * SOURCE_FILES are read, and nobody knows what else exists."
 *
 * Now the drive is catalogued and the text is extracted, so this compares the
 * two: every distinct document belonging to a Semester 1 subject, against the
 * ones a study claim actually cites.
 *
 * WHAT COUNTS AS SEMESTER 1
 *
 * The three subjects the app teaches. A document belongs to one when its PATH
 * says so — the subject code, or the subject's folder name as the shared
 * folders spell it. Nothing is inferred from content: guessing that a file
 * "looks like" anatomy is exactly the kind of invention the traceability rule
 * exists to stop, and it would make this report flatter the app.
 *
 * WHAT "UNREAD" HONESTLY MEANS
 *
 * Not every uncited document is missing knowledge, and saying so would be
 * alarmist. Four things are separated:
 *
 *   cited        a study claim points at it
 *   duplicate    the same filename and size as something cited — a re-share
 *                between study groups, already read under another path
 *   uncited      a distinct document nothing cites. THIS is the real gap.
 *   unreadable   scanned images or legacy .doc/.ppt, which no amount of
 *                citing would make checkable
 *
 * Usage: node work/coverage-gap.mjs [--list <subject>]
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SOURCE_FILES } from '../outputs/study/corpus/schema.js';

const WORK = dirname(fileURLToPath(import.meta.url));
const CAT = join(WORK, 'source-catalogue.json');
if (!existsSync(CAT)) {
  console.error('no work/source-catalogue.json — run: node work/build-source-catalogue.mjs');
  process.exit(2);
}
const cat = JSON.parse(readFileSync(CAT, 'utf8'));

/* The three subjects the corpus teaches, and how the drive spells them. */
const SUBJECTS = [
  { id: 'HSS2011', label: 'Human Anatomy', pats: [/\bHSS2011\b/i, /\bHSS201\b/, /human anatomy/i] },
  { id: 'ABCT2326', label: 'Human Physiology', pats: [/\bABCT2326\b/i, /human physiology/i, /physi(ology)? ?source/i] },
  { id: 'HTI17103', label: 'Radiography & radiation science', pats: [/\bHTI17103\b/i, /radiograph(er|y) (role|to be)/i, /radiation (therapy|science)/i] },
];

const locations = (d) => d.at.map(([ri, p]) => `${ri < 0 ? '?' : cat.roots[ri].split('/').pop()}/${p}`);

/* Which cited documents exist, by name+size — the same key the catalogue
   dedupes on, so a re-share of a cited file is recognised as already read. */
const citedNames = new Set();
for (const e of Object.values(SOURCE_FILES)) citedNames.add(String(e.file).toLowerCase());

/* What the text cache managed to read, so "unread" can be split from
   "unreadable". Sharded — union every index. */
const cache = join(WORK, '.source-text');
const readable = new Map();
if (existsSync(cache)) {
  for (const f of readdirSync(cache)) {
    if (!/^index(-\d+)?\.json$/.test(f)) continue;
    try {
      for (const [, v] of Object.entries(JSON.parse(readFileSync(join(cache, f), 'utf8')))) {
        readable.set(`${v.n.toLowerCase()}|${v.b}`, v.ok);
      }
    } catch { /* mid-write */ }
  }
}

const rows = [];
for (const d of cat.docs) {
  const paths = locations(d);
  const hay = `${paths.join(' ')} ${d.n}`;
  const subject = SUBJECTS.find((s) => s.pats.some((p) => p.test(hay)));
  if (!subject) continue;
  const cited = citedNames.has(d.n.toLowerCase());
  const ok = readable.get(`${d.n.toLowerCase()}|${d.b}`);
  rows.push({ d, subject: subject.id, cited, readable: ok, paths });
}

const LIST = (() => { const i = process.argv.indexOf('--list'); return i >= 0 ? process.argv[i + 1] : null; })();

console.log('— Semester 1 material on the drive, against what the corpus cites —\n');
console.log(`${'subject'.padEnd(10)} ${'docs'.padStart(5)} ${'cited'.padStart(6)} ${'uncited'.padStart(8)} ${'unreadable'.padStart(11)}`);
for (const s of SUBJECTS) {
  const mine = rows.filter((r) => r.subject === s.id);
  const cited = mine.filter((r) => r.cited);
  const unreadable = mine.filter((r) => r.readable === false);
  const uncited = mine.filter((r) => !r.cited && r.readable !== false);
  console.log(`${s.id.padEnd(10)} ${String(mine.length).padStart(5)} ${String(cited.length).padStart(6)} ${String(uncited.length).padStart(8)} ${String(unreadable.length).padStart(11)}   ${s.label}`);
}
const all = rows;
console.log(`${'TOTAL'.padEnd(10)} ${String(all.length).padStart(5)} ${String(all.filter((r) => r.cited).length).padStart(6)} ` +
  `${String(all.filter((r) => !r.cited && r.readable !== false).length).padStart(8)} ${String(all.filter((r) => r.readable === false).length).padStart(11)}`);

/*
 * The gap is not one number. A past paper nobody cited is a different kind of
 * absence from a lecture nobody cited, so break it down by what the FOLDER
 * says the document is — the catalogue only records a kind where a folder in
 * the path states one outright.
 */
console.log('\n— the uncited documents, by what their folder says they are —');
const uncited = rows.filter((r) => !r.cited && r.readable !== false);
const byKind = new Map();
for (const r of uncited) {
  const k = r.d.kind || 'unstated';
  if (!byKind.has(k)) byKind.set(k, []);
  byKind.get(k).push(r);
}
const KIND_NOTE = {
  primary: 'lectures, handouts, manuals — the real teaching gap',
  assessment: 'past papers, exercises, answer keys',
  student: 'coursework by students — topic evidence only, never a fact source',
  admin: 'schedules, rubrics, subject description forms',
  unstated: 'no folder in the path says what these are',
};
for (const [k, list] of [...byKind].sort((a, b) => b[1].length - a[1].length)) {
  console.log(`  ${String(list.length).padStart(4)}  ${k.padEnd(11)} ${KIND_NOTE[k] || ''}`);
}

/*
 * How much of that is genuinely unseen CONTENT?
 *
 * Counting filenames overstates the gap badly. Each study group renamed the
 * same lectures: the corpus cites `Lecture notes.pptx` in the folder
 * "2. Cardiovascular System", and another group's copy of that identical
 * lecture is filed as "2. Cardiovascular System.pptx" — a different name and a
 * different byte count once re-saved, so neither the catalogue's dedupe nor the
 * cited-name check can see it. Answering "is the app built on unread
 * documents?" with a filename count would therefore be alarmist and wrong.
 *
 * So compare the TEXT. Each document becomes a set of distinct long words;
 * containment (how much of the uncited document's vocabulary already appears in
 * one cited source) separates a re-share from a genuinely new lecture. It is a
 * coarse measure and deliberately so — it is used only to sort "already read
 * under another name" from "never opened", never to claim two files are equal.
 */
const cacheKey = (n, b) => createHash('sha1').update(`${n.toLowerCase()}|${b}`).digest('hex').slice(0, 16);
function cachedText(n, b) {
  try { return gunzipSync(readFileSync(join(cache, `${cacheKey(n, b)}.txt.gz`))).toString('utf8'); }
  catch { return null; }
}
const vocab = (t) => new Set((t.toLowerCase().match(/[a-z]{5,}/g) || []));

const citedText = join(WORK, 'source-text.json');
if (existsSync(citedText) && existsSync(cache)) {
  const { sources } = JSON.parse(readFileSync(citedText, 'utf8'));
  const citedVocab = Object.entries(sources).map(([id, s]) => ({ id, file: s.file, v: vocab(s.pages.join(' ')) }));

  /*
   * Every uncited document, not just the ones a folder calls a lecture. 310 of
   * them sit in folders that never say what they are, and restricting the
   * comparison to `primary` would quietly exclude any teaching material hiding
   * among them — which is precisely the question being asked.
   */
  const teaching = uncited;
  const scored = [];
  for (const r of teaching) {
    const t = cachedText(r.d.n, r.d.b);
    if (!t) { scored.push({ r, best: null, share: null }); continue; }
    const v = vocab(t);
    if (v.size < 40) { scored.push({ r, best: null, share: null }); continue; }
    let best = null, bestShare = 0;
    for (const c of citedVocab) {
      let hit = 0;
      for (const w of v) if (c.v.has(w)) hit++;
      const share = hit / v.size;
      if (share > bestShare) { bestShare = share; best = c; }
    }
    scored.push({ r, best, share: bestShare });
  }

  const known = scored.filter((s) => s.share !== null && s.share >= 0.80);
  const partial = scored.filter((s) => s.share !== null && s.share >= 0.55 && s.share < 0.80);
  const fresh = scored.filter((s) => s.share !== null && s.share < 0.55);
  const unknown = scored.filter((s) => s.share === null);

  console.log(`\n— of the ${teaching.length} uncited documents, how much is new material —`);
  console.log(`  ${String(known.length).padStart(4)}  already read under another name (>=80% of its wording is in a cited source)`);
  console.log(`  ${String(partial.length).padStart(4)}  mostly overlapping — another year's version of something cited (55-80%)`);
  console.log(`  ${String(fresh.length).padStart(4)}  content the corpus has never seen (<55%)`);
  if (unknown.length) console.log(`  ${String(unknown.length).padStart(4)}  no extractable text, so cannot be compared`);

  if (fresh.length) {
    /* Split the genuine gap by kind: a past paper nobody read is not the same
       absence as a lecture nobody read, and student work is excluded by policy
       rather than by oversight. */
    const byK = new Map();
    for (const s of fresh) {
      const k = s.r.d.kind || 'unstated';
      if (!byK.has(k)) byK.set(k, []);
      byK.get(k).push(s);
    }
    console.log('\n— that unseen content, by kind —');
    for (const [k, list] of [...byK].sort((a, b) => b[1].length - a[1].length)) {
      console.log(`  ${String(list.length).padStart(4)}  ${k}`);
    }
    const teach = (byK.get('primary') || []).concat(byK.get('unstated') || []);
    console.log(`\n— the teaching gap: ${teach.length} document(s) that could carry syllabus content —`);
    for (const s of teach.sort((a, b) => a.share - b.share).slice(0, 40)) {
      console.log(`  ${String(Math.round(s.share * 100)).padStart(3)}%  ${s.r.d.n.slice(0, 50).padEnd(50)} ${s.r.subject.padEnd(9)} ${(s.r.d.kind || '·')}`);
    }
    if (teach.length > 40) console.log(`  … ${teach.length - 40} more`);
  }
}

if (LIST) {
  const want = uncited.filter((r) => r.subject.toLowerCase() === LIST.toLowerCase() || (r.d.kind || '') === LIST);
  console.log(`\n— ${want.length} uncited document(s) matching "${LIST}" —`);
  for (const r of want.slice(0, 60)) {
    console.log(`  ${(r.d.kind || '·').padEnd(11)} ${r.d.n.slice(0, 56).padEnd(56)} ${r.paths[0].slice(0, 70)}`);
  }
  if (want.length > 60) console.log(`  … ${want.length - 60} more`);
} else {
  console.log('\n  node work/coverage-gap.mjs --list HSS2011   (or ABCT2326, HTI17103, or a kind)');
}
