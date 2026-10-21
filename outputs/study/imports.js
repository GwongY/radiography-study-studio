
import { STORAGE_PREFIX, STRUCTURE_MODELS, describeSource, getSubject } from './course-data.js';
import { searchAnatomy } from '../anatomy-data.js?v=5';
import { SEARCH_EXTRAS, BODY_CONCEPTS, CONCEPT_GROUPS, conceptAncestors, conceptChildren } from '../bodymap.js?v=5';
import { MESH_INDEX, UNITS } from '../mesh-index.js?v=5';
import { expandQuery, missingFor, compositeFor } from '../synonyms.js?v=3';
import { FLOW_CLASSES, LAYER_CLASSES, RATES } from '../physiology.js?v=4';
/* The layer rail is a rail of SYSTEMS, not of files: two of the seven GLBs
   draw several chips each. See outputs/systems.js. */
import { SYSTEMS, layerOf, systemCounts } from '../systems.js?v=1';
import { decompose, partOf } from '../wordparts.js?v=3';
import { memoryTip, termNote } from '../term-notes.js?v=6';
import { abbrGloss, termGloss } from '../term-gloss.js?v=5';
import {
  GROUP_CHOICES, KINDS, SCHEDULE_SOURCES, SESSIONS, STAFF, SUBJECT_ADMIN, TERM,
  fmtDate, fmtTime, fmtWeekRange, fmtWhen, isOtherGroup, sessionSpan,
  sessionsWithStatus, gapFor, weekOf, weekStart,
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
  sessionsWithStatus,
  gapFor,
  weekOf,
  weekStart,
  CONCEPT_GROUPS,
  FLOW_CLASSES,
  LAYER_CLASSES,
  MESH_INDEX,
  RATES,
  SEARCH_EXTRAS,
  STORAGE_PREFIX,
  STRUCTURE_MODELS,
  SYSTEMS,
  UNITS,
  compositeFor,
  conceptAncestors,
  conceptChildren,
  decompose,
  describeSource,
  expandQuery,
  getSubject,
  layerOf,
  missingFor,
  memoryTip,
  partOf,
  searchAnatomy,
  systemCounts,
  abbrGloss,
  termGloss,
  termNote,
  ui,
};
