/*
 * Course modules — which unit belongs to which teaching module, so the app can
 * group them and tell a lesson where in the course it sits.
 *
 * Split out of study-data.js in phase 2026-09-01. outputs/study-data.js is
 * the barrel every importer still uses; nothing imports this file directly
 * except its siblings.
 */

/* ------------------------------------------------------------------ *
 * Course modules
 * ------------------------------------------------------------------ */

/*
 * THE NUMBERING CHANGED, AND THE SOURCE FOLDERS DID NOT.
 *
 * Every HSS2011 file on the drive is filed under "Module 1 Thorax",
 * "Module 2 Neuroanatomy", "Module 3 Abdomen and Pelvis", "Module 4
 * Musculoskeletal System", and the app followed that faithfully. The 2026
 * subject-orientation deck (hss.w1.2026, p10-13) states a different ordering
 * outright, one slide per module:
 *
 *     Module 1: Musculoskeletal system
 *     Module 2: Nervous system
 *     Module 3: Cardiovascular and pulmonary system
 *     Module 4: Digestive and urogenital system
 *
 * So Musculoskeletal, which the folders call Module 4, is Module 1 in the year
 * the student is actually sitting — and Thorax, which the folders call Module 1,
 * is Module 3. This file now numbers by the 2026 deck, because that is the
 * numbering on the student's Canvas page and in their revision exercise.
 *
 * The subject has renumbered before: hss.2.2 is a file named "3.2 Nervous
 * System and Special Sense" sitting in a folder called "Module 2 Neuroanatomy".
 * So the mismatch below is the normal state of this course's material, not a
 * mistake in the registry.
 *
 * `legacy` records what the SOURCES call the same module, because the citation
 * under a lesson will say "Module 1.2 answers" while the lesson header says
 * Module 3 — and a student who cannot see why would be right to distrust one of
 * them. The UI prints it.
 *
 * The unit keys (hss.m1 … hss.m4) are NOT renamed. They are storage keys: item
 * records carry them and the browser's saved progress is keyed by them. They
 * mean "the unit whose sources are the old Module N folder" and nothing more —
 * MODULE_BY_UNIT below is the only place that turns one into a module number.
 *
 * The one-line descriptions for Modules 1-4 are the deck's own sub-bullets,
 * lightly joined. Module 0's is app-authored framing, and the UI labels the
 * whole line as an app note either way: the MAPPING is ours, not a source claim.
 */
export const MODULES = {
  0: {
    name: 'Human Body and Movement',
    plain: 'The self-study foundation — anatomical position and terms, the body’s cavities and regions, and the bones, joints and movement the rest of the course builds on.',
    legacy: null,
  },
  1: {
    name: 'Musculoskeletal System',
    plain: 'Bones and muscles — support and movement.',
    legacy: 'Module 4 in the source folders and in every past revision exercise.',
  },
  2: {
    name: 'Nervous System',
    plain: 'Central and peripheral nervous system — sensing, coordination and motor commands.',
    legacy: 'Module 2 in the source folders too, but its lecture files are numbered 3.x from a still older ordering.',
  },
  3: {
    name: 'Cardiovascular and Pulmonary System',
    plain: 'Circulation and the heart, airway and lungs — distributing materials and removing waste.',
    legacy: 'Module 1 in the source folders and in every past revision exercise.',
  },
  4: {
    name: 'Digestive and Urogenital System',
    plain: 'The major organs of the abdominal regions — digestive for nutrient processing, urinary for waste removal, reproductive for offspring.',
    legacy: 'Module 3 in the source folders; its lecture files are numbered 2.x from a still older ordering.',
  },
};

/*
 * Items whose sources name a module other than their unit's default.
 *
 * Read the trailing comment as the SOURCE's own number — "hss.4.1 slides only"
 * means the file is 4.1, which is 2026 Module 1. The value is the 2026 number.
 */
const MODULE_OVERRIDES = {
  'hss2011-osteo-bone-shapes': 1,           /* hss.4.1 slides only */
  'hss2011-osteo-long-bone-structure': 1,   /* hss.4.1 slides only */
  'hss2011-osteo-bone-functions': 1,        /* hss.4.1 slides only */
  'hss2011-osteo-skull-sutures': 1,         /* hss.4.2 / hss.4.1 */
  'hss2011-osteo-pelvic-girdle': 1,         /* hss.4.3 slides only */
  'hss2011-osteo-leg-tarsals': 1,           /* hss.4.3 slides only */
  'hss2011-osteo-ribs-sternum': 3,          /* hss.1.3 thorax only */
  'hss2011-bone-cranium': 1,                /* hss.4.2 only */
  'hss2011-bone-mandible': 1,               /* hss.4.2 only */
  'hss2011-bone-pelvis': 1,                 /* hss.4.3 only */
  'hss2011-joints-rotator-cuff': 1,         /* hss.4.3 only */
  'hss2011-pastpaper-joints-articulations': 1, /* hss.4.x past-paper */
  'hss2011-structures-rotatorCuff': 1,      /* hss.4.3 only */
  'hss2011-structures-skullBones': 1,       /* hss.4.2 only */
  'hss2011-structures-tarsals': 1,          /* hss.4.3 only */
};

/*
 * Unit key -> 2026 module number. The keys are historical (see above); the
 * values are what the 2026 orientation deck says.
 */
const MODULE_BY_UNIT = {
  'hss.term': 0, 'hss.osteo': 0, 'hss.joints': 0,
  'hss.m1': 3,   /* thorax          -> 2026 Module 3 Cardiovascular and pulmonary */
  'hss.m2': 2,   /* neuroanatomy    -> 2026 Module 2 Nervous */
  'hss.m3': 4,   /* abdomen, pelvis -> 2026 Module 4 Digestive and urogenital */
  'hss.m4': 1,   /* musculoskeletal -> 2026 Module 1 Musculoskeletal */
};

export function moduleOf(item) {
  if (!item) return null;
  if (MODULE_OVERRIDES[item.id]) return MODULE_OVERRIDES[item.id];
  const m = MODULE_BY_UNIT[item.unit];
  return m === undefined ? null : m;
}

export function moduleInfo(item) {
  const n = moduleOf(item);
  if (n === null || n === undefined) return null;
  const M = MODULES[n];
  return M ? { n, name: M.name, plain: M.plain, legacy: M.legacy || null } : null;
}
