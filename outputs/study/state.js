/*
 * The study system's mutable UI state.
 *
 * These five were plain module-level `let`s in study.js, written from seven
 * different banner sections — `session` alone from five. That is fine in one
 * file and impossible across several: an imported binding is read-only, so a
 * module that imports `session` and then assigns to it is a compile-time error,
 * not a runtime risk. Holding them as properties of one exported object
 * makes every write a property write, which is legal through an import, and is
 * what lets study.js split along its banners at all.
 *
 * This is deliberately a bag of values with no behaviour. Anything that acts on
 * them belongs in the section that owns the behaviour, not here.
 */
export const ui = {
  /* Learn: which subject filter, which topic, and whether the phone layout has
     drilled into a topic so the detail replaces the list. */
  learnFilter: 'all',
  learnTopic: null,
  learnDrill: false,

  /* Course: which panel of the timetable tab — 'week' | 'term' | 'syllabus'. */
  courseTab: 'week',
  /* Course: which subjects' full reading lists are expanded, keyed by
     subject code. Collapsed by default — a week can carry twenty-two
     lessons and printing all of them as buttons is a wall, not a plan. */
  readOpen: {},

  /* Viewer: '3d' or the projection tab. */
  viewerTab: '3d',

  /* The session in progress, or null. Written by Reset, Global search, the
     spatial overlay controls, Layout figures and the session engine itself. */
  session: null,
};
