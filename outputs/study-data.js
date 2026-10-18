/*
 * Radiography Study Studio — study data layer.
 *
 * Scope rule for this corpus:
 *   Every factual claim carries a sourceRefs entry pointing at a file that
 *   exists in the supplied source folders. Nothing here comes from internet
 *   research, generic textbook expansion or invented syllabus content.
 *   Practise and Apply content is retained with item-level source references.
 *
 * anatomy-data.js stays as the 3D model adapter + canonical bone records.
 * This layer supplies revision support, questions and progress tracking.
 *
 * THIS FILE IS A BARREL. The corpus lives in study/corpus/ — see
 * docs/CODEMAP.md for which file holds what. The app imports this path, so it
 * keeps the same name and a deliberately curated public surface.
 *
 * The re-exports are listed by name on purpose. `export *` would also
 * re-export the item arrays the corpus files share with each other, widening
 * the public API — work/corpus-snapshot.mjs fails if that ever happens.
 */

export {
  DATA_VERSION,
  STORAGE_PREFIX,
  LEGACY_STATS_KEY,
  SOURCE_ROOTS,
  SOURCE_FILES,
  sourceRef,
  describeSource,
  SUBJECTS,
  getSubject,
  getUnit,
  ITEM_TYPES,
  MASTERY_DIMENSIONS,
  PRIOR_KNOWLEDGE,
  DSE_PARTS,
  priorOf,
  priorSources,
  PRIOR_ASSUMED_SCORE,
  priorAdjustedScore,
  entryStep,
  STUDY_MODES,
} from './study/corpus/schema.js';

export {
  SOCIOLOGY_NOTICE,
  PLACEHOLDER_NOTICES,
} from './study/corpus/notices.js';

export {
  SOURCE_MAP_VERSION,
  Y1S1_SOURCE_MAP,
  sourceGroupFor,
  sourceGroupsForWeek,
  sourceMetaFor,
  sourceSetLabel,
  sourceRoleLabel,
} from './study/corpus/source-lesson-map.js';

export {
  REVEAL_MODES,
  STRUCTURE_SETS,
  structureSet,
  JOINT_MOVEMENTS,
  jointMovement,
  STRUCTURE_MODELS,
} from './study/corpus/structures.js';

export {
  STUDY_ITEMS,
  ITEM_BY_ID,
  getItem,
  itemsForSubject,
  itemsForUnit,
  questionsOf,
  allQuestions,
} from './study/corpus/corpus.js';

export {
  validateQuestion,
  validateCorpus,
  validateApplications,
} from './study/corpus/validate.js';

export {
  DIAGRAMS,
} from './study/corpus/diagrams.js';

export {
  COVERAGE,
  coverageFor,
} from './study/corpus/coverage.js';

export {
  DAY_MS,
  blankMastery,
  schedule,
  DELAY_THRESHOLD_MS,
  isDelayedAttempt,
  masteryScore,
  isDue,
  TIER_LABELS,
  tierFor,
  dimensionFor,
} from './study/corpus/mastery.js';

import { SUBJECTS, SOURCE_FILES, STUDY_MODES, ITEM_TYPES, MASTERY_DIMENSIONS } from './study/corpus/schema.js';
import { STUDY_ITEMS } from './study/corpus/corpus.js';
import { COVERAGE } from './study/corpus/coverage.js';

/* The default export the data layer has always carried, unchanged. */
export default {
  SUBJECTS, STUDY_ITEMS, SOURCE_FILES, COVERAGE, STUDY_MODES, ITEM_TYPES, MASTERY_DIMENSIONS,
};
