
import {
  SUBJECTS, STUDY_ITEMS, STUDY_MODES, ITEM_TYPES, MASTERY_DIMENSIONS, MEMORY_METHODS,
  SOURCE_FILES, SOURCE_ROOTS, COVERAGE, DIAGRAMS, SOCIOLOGY_NOTICE, PLACEHOLDER_NOTICES,
  STORAGE_PREFIX, LEGACY_STATS_KEY, DATA_VERSION,
  getSubject, getItem, itemsForSubject, itemsForUnit, questionsOf, allQuestions,
  describeSource, coverageFor, blankMastery, schedule, masteryScore, isDue, dimensionFor,
  tierFor, TIER_LABELS,
  isDelayedAttempt, REVEAL_MODES, structureSet, STRUCTURE_MODELS, jointMovement,
  validateCorpus, validateApplications,
  priorOf, priorSources, priorAdjustedScore, entryStep,
  moduleInfo,
} from '../study-data.js';
import { searchAnatomy } from '../anatomy-data.js?v=5';
import { SEARCH_EXTRAS, BODY_CONCEPTS, CONCEPT_GROUPS, conceptById, conceptAncestors, conceptChildren } from '../bodymap.js?v=4';
import { MESH_INDEX, UNITS } from '../mesh-index.js?v=5';
import { expandQuery, missingFor, compositeFor } from '../synonyms.js?v=3';
import { visualFor, plateFor } from '../visual-data.js?v=4';
import { FLOW_CLASSES, LAYER_CLASSES, RATES } from '../physiology.js?v=4';
/* The layer rail is a rail of SYSTEMS, not of files: two of the seven GLBs
   draw several chips each. See outputs/systems.js. */
import { SYSTEMS, layerOf, systemCounts } from '../systems.js?v=1';
import { schematic } from '../schematics.js?v=2';
import { figureFor } from '../figures.js?v=2';
import { layoutFor } from '../layouts.js?v=1';
import { decompose, readingOf, partOf } from '../wordparts.js?v=3';
import { termNote } from '../term-notes.js?v=6';
import { termGloss } from '../term-gloss.js?v=5';
import {
  GROUP_CHOICES, KINDS, SCHEDULE_SOURCES, SESSIONS, STAFF, SUBJECT_ADMIN, TERM,
  fmtDate, fmtTime, fmtWeekRange, fmtWhen, isOtherGroup, sessionSpan, sessionStatus,
  sessionsWithStatus, studyFor, weekEnd, weekOf, weekStart,
} from '../schedule.js?v=1';
import { ui } from './state.js';

export const $$ = (id) => document.getElementById(id);
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* Passed through to the parts: these come from the data modules above. */
export {
  BODY_CONCEPTS,
  GROUP_CHOICES,
  KINDS,
  SCHEDULE_SOURCES,
  SESSIONS,
  STAFF,
  SUBJECT_ADMIN,
  TERM,
  fmtDate,
  fmtTime,
  fmtWeekRange,
  fmtWhen,
  isOtherGroup,
  sessionSpan,
  sessionStatus,
  sessionsWithStatus,
  weekEnd,
  weekOf,
  weekStart,
  studyFor,
  CONCEPT_GROUPS,
  COVERAGE,
  DATA_VERSION,
  DIAGRAMS,
  FLOW_CLASSES,
  ITEM_TYPES,
  LAYER_CLASSES,
  LEGACY_STATS_KEY,
  MASTERY_DIMENSIONS,
  MEMORY_METHODS,
  MESH_INDEX,
  RATES,
  REVEAL_MODES,
  SEARCH_EXTRAS,
  SOURCE_FILES,
  SOURCE_ROOTS,
  STORAGE_PREFIX,
  STRUCTURE_MODELS,
  SYSTEMS,
  STUDY_ITEMS,
  STUDY_MODES,
  SUBJECTS,
  UNITS,
  allQuestions,
  blankMastery,
  compositeFor,
  conceptAncestors,
  conceptChildren,
  decompose,
  describeSource,
  dimensionFor,
  entryStep,
  expandQuery,
  figureFor,
  getItem,
  getSubject,
  isDelayedAttempt,
  isDue,
  itemsForSubject,
  itemsForUnit,
  jointMovement,
  layerOf,
  layoutFor,
  masteryScore,
  missingFor,
  moduleInfo,
  partOf,
  plateFor,
  priorAdjustedScore,
  priorOf,
  priorSources,
  questionsOf,
  readingOf,
  schedule,
  schematic,
  searchAnatomy,
  structureSet,
  systemCounts,
  termGloss,
  termNote,
  tierFor,
  ui,
  validateApplications,
  validateCorpus,
  visualFor,
};
