/*
 * Course modules — app-authored framing, not a source claim. Which unit
 * belongs to which teaching module, so the app can group them.
 *
 * Split out of study-data.js in phase 2026-09-01. outputs/study-data.js is
 * the barrel every importer still uses; nothing imports this file directly
 * except its siblings.
 */

/* ------------------------------------------------------------------ *
 * Course modules — app-authored framing, not a source claim
 * ------------------------------------------------------------------ */

/*
 * MODULES is course organisation, not anatomy. The official unit names come
 * from the supplied folder structure and study manual; the one-line
 * descriptions are app-authored framing the UI labels as such.
 *
 * `moduleOf(item)` maps an item to its HSS2011 module. The default is by unit:
 * the terminology / osteology / joint lessons are the Module 0 "Human Body and
 * Movement" foundation, hss.m1..m4 are Modules 1..4, and physiology and
 * radiography units have no HSS2011 module. The override map exists because
 * some osteo/joints lessons were authored purely from Module 1 or Module 4
 * files — a blanket unit→module map would mislabel them as Module 0.
 */
export const MODULES = {
  0: { name: 'Human Body and Movement', plain: 'The self-study foundation — anatomical position and terms, the body’s cavities and regions, and the bones, joints and movement the rest of the course builds on.' },
  1: { name: 'Thorax', plain: 'The chest — the heart, lungs, pleura and the great vessels inside the rib cage.' },
  2: { name: 'Neuroanatomy', plain: 'The brain, spinal cord and the nerves that carry signals.' },
  3: { name: 'Abdomen and Pelvis', plain: 'The gut, the urinary system and the organs of the lower trunk.' },
  4: { name: 'Musculoskeletal System', plain: 'Muscles, bones and joints, and how they produce movement.' },
};

/* Items whose sources name a module other than their unit’s default. */
const MODULE_OVERRIDES = {
  'hss2011-osteo-bone-shapes': 4,           /* hss.4.1 slides only */
  'hss2011-osteo-long-bone-structure': 4,   /* hss.4.1 slides only */
  'hss2011-osteo-bone-functions': 4,        /* hss.4.1 slides only */
  'hss2011-osteo-skull-sutures': 4,         /* hss.4.2 / hss.4.1 */
  'hss2011-osteo-pelvic-girdle': 4,         /* hss.4.3 slides only */
  'hss2011-osteo-leg-tarsals': 4,           /* hss.4.3 slides only */
  'hss2011-osteo-ribs-sternum': 1,          /* hss.1.3 thorax only */
  'hss2011-bone-cranium': 4,                /* hss.4.2 only */
  'hss2011-bone-mandible': 4,               /* hss.4.2 only */
  'hss2011-bone-pelvis': 4,                 /* hss.4.3 only */
  'hss2011-joints-rotator-cuff': 4,         /* hss.4.3 only */
  'hss2011-pastpaper-joints-articulations': 4, /* hss.4.x past-paper */
  'hss2011-structures-rotatorCuff': 4,      /* hss.4.3 only */
  'hss2011-structures-skullBones': 4,       /* hss.4.2 only */
  'hss2011-structures-tarsals': 4,          /* hss.4.3 only */
};

const MODULE_BY_UNIT = {
  'hss.term': 0, 'hss.osteo': 0, 'hss.joints': 0,
  'hss.m1': 1, 'hss.m2': 2, 'hss.m3': 3, 'hss.m4': 4,
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
  return M ? { n, name: M.name, plain: M.plain } : null;
}
