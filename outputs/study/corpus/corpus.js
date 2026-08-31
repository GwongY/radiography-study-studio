/*
 * The assembled corpus — every item array spread into one list, and the
 * lookups over it. This is the only file that knows the corpus is made of
 * parts.
 *
 * Split out of study-data.js in phase 2026-09-01. outputs/study-data.js is
 * the barrel every importer still uses; nothing imports this file directly
 * except its siblings.
 */
import { HSS_TERMINOLOGY } from './hss-terminology.js';
import { HSS_OSTEOLOGY } from './hss-osteology.js';
import { HSS_JOINTS } from './hss-joints.js';
import { HSS_MODULES } from './hss-modules.js';
import { PHYS_ITEMS } from './physiology-items.js';
import { HTI_ITEMS } from './hti-items.js';
import { EXPANSION_ITEMS } from './expansion-items.js';
import { BONE_ITEMS, STRUCTURE_ITEMS, MOVEMENT_ITEMS } from './derived-items.js';

/* ------------------------------------------------------------------ *
 * Assembled corpus
 * ------------------------------------------------------------------ */

export const STUDY_ITEMS = [
  ...HSS_TERMINOLOGY,
  ...HSS_OSTEOLOGY,
  ...BONE_ITEMS,
  ...STRUCTURE_ITEMS,
  ...MOVEMENT_ITEMS,
  ...HSS_JOINTS,
  ...HSS_MODULES,
  ...PHYS_ITEMS,
  ...HTI_ITEMS,
  ...EXPANSION_ITEMS,
].map((item) => ({ status: 'unseen', ...item }));

export const ITEM_BY_ID = new Map(STUDY_ITEMS.map((i) => [i.id, i]));

export function getItem(id) {
  return ITEM_BY_ID.get(id) || null;
}

export function itemsForSubject(subjectId) {
  return STUDY_ITEMS.filter((i) => i.subject === subjectId);
}

export function itemsForUnit(subjectId, unitId) {
  return STUDY_ITEMS.filter((i) => i.subject === subjectId && i.unit === unitId);
}

/* Every practice question, flattened, with a stable per-question id. */
export function questionsOf(item) {
  return (item.practice || []).map((q, i) => ({ ...q, qid: `${item.id}#${i}`, itemId: item.id, index: i }));
}

export function allQuestions() {
  return STUDY_ITEMS.flatMap(questionsOf);
}
