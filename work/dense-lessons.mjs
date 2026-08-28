/*
 * Task #9 candidate scan — list the densest explanations (nested clauses,
 * heavy noun stacking) as plain-lead candidates. Pure read-only listing.
 *
 * Usage:  node work/dense-lessons.mjs
 */
import { STUDY_ITEMS } from '../outputs/study-data.js';

const rows = STUDY_ITEMS
  .map((it) => ({ id: it.id, subj: it.subject, unit: it.unit, title: it.title, len: (it.lesson.explanation || '').length, exp: it.lesson.explanation }))
  .sort((a, b) => b.len - a.len);

for (const r of rows) {
  console.log(`${String(r.len).padStart(4)}  ${r.subj.padEnd(8)} ${r.unit.padEnd(10)} ${r.id}`);
}
