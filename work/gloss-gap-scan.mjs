/*
 * Gloss gap scan — regression check for the reading help.
 *
 * Re-runs the same tokenisation + lookup the app uses over every study text,
 * and lists the words that would NOT be tappable. The count at the top is the
 * thing to watch: after any change to term-gloss.js, term-notes.js or
 * wordparts.js it must not grow.
 *
 * The output is a stoplist gate, not a blind fill. A word appearing here is a
 * candidate for a curated TERM_GLOSS entry — but only if the supplied sources
 * actually give it a meaning. Common English can stay plain; never invent a
 * definition for a word that is not in the sources.
 *
 * Usage:  node work/gloss-gap-scan.mjs
 */
import { STUDY_ITEMS } from '../outputs/study-data.js';
import { decompose, partOf } from '../outputs/wordparts.js';
import { termNote } from '../outputs/term-notes.js';
import { termGloss } from '../outputs/term-gloss.js';

/* Mirrors the app's lookupTerm(): a word is helpable if any of note /
   decomposition / single part / glossary resolves. */
function lookup(word) {
  const note = termNote(word);
  const split = decompose(word);
  const part = partOf(word);
  const gloss = termGloss(word);
  return note || split || part || gloss ? { note, split, part, gloss } : null;
}

function textsOf(item) {
  const out = [];
  const push = (v) => { if (typeof v === 'string' && v.trim()) out.push(v); };
  push(item.title);
  const L = item.lesson || {};
  push(L.explanation);
  (L.keyFacts || []).forEach(push);
  (L.examples || []).forEach(push);
  Object.values(item.memory || {}).forEach(push);
  for (const q of item.practice || []) {
    push(q.prompt);
    (q.options || []).forEach(push);
    push(q.explanation);
    push(q.model);
    (q.items || []).forEach(push);
    (q.pairs || []).forEach((p) => { push(p[0]); push(p[1]); });
    (q.labels || []).forEach((l) => push(l.label));
  }
  for (const a of item.application || []) {
    push(a.prompt);
    push(a.model);
    (a.rubric || []).forEach(push);
  }
  (item.commonMistakes || []).forEach(push);
  return out;
}

/* The app's GLOSS_RE threshold: bare words of 6+ chars are tappable candidates. */
const TOKEN = /[A-Za-z]{6,}/g;

const counts = new Map();
for (const item of STUDY_ITEMS) {
  for (const t of textsOf(item)) {
    for (const m of t.matchAll(TOKEN)) {
      const w = m[0].toLowerCase();
      if (!lookup(w)) counts.set(w, (counts.get(w) || 0) + 1);
    }
  }
}

const rows = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
console.log(`${rows.length} distinct untappable words (>= 6 chars) across ${STUDY_ITEMS.length} items`);
for (const [w, n] of rows) console.log(String(n).padStart(4), w);
