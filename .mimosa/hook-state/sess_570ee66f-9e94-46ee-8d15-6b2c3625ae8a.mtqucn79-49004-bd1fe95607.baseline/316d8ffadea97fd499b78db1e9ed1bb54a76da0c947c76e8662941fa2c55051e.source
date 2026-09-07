/*
 * Body map — search extras and spatial concepts for the 3D viewer.
 *
 * Two exports:
 *
 *   SEARCH_EXTRAS  high-yield structures beyond ANATOMY_DATABASE that resolve to
 *                  a named mesh inside one of the loadable system layers. The
 *                  global search offers these; opening one loads that layer,
 *                  frames the mesh and auto-uncovers whatever covers it.
 *
 *   BODY_CONCEPTS  cavities, regions, quadrants and planes.
 *
 * ---------------------------------------------------------------------------
 * WHERE THE SHAPES COME FROM
 *
 * They are not in here, and that is the point.
 *
 * This file used to carry the geometry: a profile of [radius, height] pairs per
 * cavity, tuned by eye against screenshots until each shape sat roughly inside
 * the right bones. That produced a picture of a cavity rather than a cavity,
 * and it silently went wrong whenever the model was touched.
 *
 * The viewer already loads ~2,900 individually named anatomical meshes, and
 * those meshes ARE the anatomy. So the shapes are now derived from them at
 * build time: the thoracic cavity is whatever the inside of THIS rib cage
 * encloses, the pelvic cavity is whatever fits inside THESE hip bones, and the
 * vertebral canal is threaded through the foramen found in each vertebra.
 *
 *   landmarks.js     turns a semantic key into the meshes currently loaded
 *   cavity-geom.js   the maths -- sweeps, height fields, plane slices
 *   cavity-build.js  one builder per cavity, written as its definition
 *
 * What stays here is what the meshes cannot say: the names, the aliases the
 * search needs, the teaching blurb, the colour, and the containment hierarchy.
 *
 * HIERARCHY
 *
 * `parent` nests a cavity inside another (pericardial -> mediastinum ->
 * thoracic), which the overlay card shows and which drives the "contains" list.
 * `combine` marks a cavity that has no geometry of its own and is drawn as the
 * union of its members -- the abdominopelvic cavity IS the abdominal plus the
 * pelvic, so it renders their geometry rather than a third shape that could
 * drift out of agreement with them.
 *
 * Nothing here is course material — it is standard first-year spatial anatomy,
 * written for this app, and it is kept out of the lesson corpus on purpose.
 *
 * Planes are the exception: they are pure reference geometry with no structure
 * to derive from, so they still carry an axis and a position, expressed as a
 * fraction of body height measured in the model's own upright frame.
 */

export const SEARCH_EXTRAS = [
  // ---- muscles (kas.glb) ----
  { id: 'x-supraspinatus', name: 'Supraspinatus', system: 'muscle', mesh: 'Supraspinatus muscle',
    aliases: ['rotator cuff', 'sits'], blurb: 'Rotator cuff — starts abduction of the arm.' },
  { id: 'x-infraspinatus', name: 'Infraspinatus', system: 'muscle', mesh: 'Infraspinatus muscle',
    aliases: ['rotator cuff'], blurb: 'Rotator cuff — lateral rotation of the arm.' },
  { id: 'x-subscapularis', name: 'Subscapularis', system: 'muscle', mesh: 'Subscapularis muscle',
    aliases: ['rotator cuff'], blurb: 'Rotator cuff — medial rotation of the arm.' },
  { id: 'x-teres-minor', name: 'Teres minor', system: 'muscle', mesh: 'Teres minor muscle',
    aliases: ['rotator cuff'], blurb: 'Rotator cuff — lateral rotation of the arm.' },
  { id: 'x-deltoid', name: 'Deltoid', system: 'muscle', mesh: 'Acromial part of deltoid muscle',
    aliases: ['shoulder muscle'], blurb: 'Shoulder cap — abducts the arm past 15 degrees.' },
  { id: 'x-trapezius', name: 'Trapezius', system: 'muscle', mesh: 'Descending part of trapezius muscle',
    aliases: ['traps'], blurb: 'Moves and steadies the scapula.' },
  { id: 'x-latissimus', name: 'Latissimus dorsi', system: 'muscle', mesh: 'Latissimus dorsi muscle',
    aliases: ['lats'], blurb: 'Extends, adducts and medially rotates the arm.' },
  { id: 'x-biceps', name: 'Biceps brachii', system: 'muscle', mesh: 'Long head of biceps brachii',
    aliases: ['biceps'], blurb: 'Flexes the elbow and supinates the forearm.' },
  { id: 'x-gluteus-maximus', name: 'Gluteus maximus', system: 'muscle', mesh: 'Gluteus maximus muscle',
    aliases: ['glutes'], blurb: 'The main hip extensor.' },
  { id: 'x-gastrocnemius', name: 'Gastrocnemius', system: 'muscle', mesh: 'Medial head of gastrocnemius',
    aliases: ['calf muscle'], blurb: 'Calf — plantarflexes the ankle.' },

  // ---- heart and great vessels (dolasim.glb) ----
  { id: 'x-left-atrium', name: 'Left atrium', system: 'circulatory', mesh: 'Left atrium',
    aliases: ['heart chamber'], blurb: 'Receives oxygenated blood from the lungs.' },
  { id: 'x-right-atrium', name: 'Right atrium', system: 'circulatory', mesh: 'Right atrium',
    aliases: ['heart chamber'], blurb: 'Receives deoxygenated blood from the body.' },
  { id: 'x-left-ventricle', name: 'Left ventricle', system: 'circulatory', mesh: 'Left ventricle',
    aliases: ['heart chamber'], blurb: 'Pumps oxygenated blood into the aorta.' },
  { id: 'x-right-ventricle', name: 'Right ventricle', system: 'circulatory', mesh: 'Right ventricle',
    aliases: ['heart chamber'], blurb: 'Pumps deoxygenated blood into the pulmonary trunk.' },
  { id: 'x-ascending-aorta', name: 'Ascending aorta', system: 'circulatory', mesh: 'Ascending aorta',
    aliases: ['aorta'], blurb: 'First part of the aorta, leaving the left ventricle.' },
  { id: 'x-svc', name: 'Superior vena cava', system: 'circulatory', mesh: 'Superior vena cava',
    aliases: ['svc', 'great vein'], blurb: 'Drains the head, neck and arms into the right atrium.' },
  { id: 'x-ivc', name: 'Inferior vena cava', system: 'circulatory', mesh: 'Inferior vena cava (thoracic part)',
    aliases: ['ivc', 'great vein'], blurb: 'Drains the trunk and legs into the right atrium.' },
  { id: 'x-pulmonary-trunk', name: 'Pulmonary trunk', system: 'circulatory', mesh: 'Pulmonary trunk',
    aliases: ['pulmonary artery'], blurb: 'Carries deoxygenated blood from the right ventricle to the lungs.' },

  // ---- organs (ic-organlar.glb) ----
  { id: 'x-heart-none', name: 'Trachea', system: 'organs', mesh: 'Trachea',
    aliases: ['windpipe', 'airway'], blurb: 'The windpipe — splits into the two main bronchi.' },
  { id: 'x-lung-right', name: 'Right lung (superior lobe)', system: 'organs', mesh: 'Superior lobe of right lung',
    aliases: ['lung'], blurb: 'The right lung has three lobes; the left has two.' },
  { id: 'x-liver', name: 'Liver', system: 'organs', mesh: 'Liver',
    aliases: [], blurb: 'Right upper quadrant — sits under the diaphragm.' },
  { id: 'x-stomach', name: 'Stomach', system: 'organs', mesh: 'Stomach',
    aliases: [], blurb: 'Left upper quadrant — between the oesophagus and duodenum.' },
  { id: 'x-kidney', name: 'Kidney', system: 'organs', mesh: 'Kidney',
    aliases: ['renal'], blurb: 'Retroperitoneal — filters blood into urine.' },
  { id: 'x-bladder', name: 'Urinary bladder', system: 'organs', mesh: 'Urinary bladder',
    aliases: [], blurb: 'Pelvic cavity — stores urine.' },
  { id: 'x-pancreas', name: 'Pancreas', system: 'organs', mesh: 'Pancreas',
    aliases: [], blurb: 'Retroperitoneal — endocrine and exocrine gland behind the stomach.' },
  { id: 'x-thyroid', name: 'Thyroid gland', system: 'organs', mesh: 'Thyroid gland',
    aliases: [], blurb: 'Wraps the front of the trachea below the larynx.' },
  { id: 'x-oesophagus', name: 'Oesophagus', system: 'organs', mesh: 'Oesophagus',
    aliases: ['esophagus', 'gullet'], blurb: 'Muscular tube from the pharynx to the stomach.' },

  // ---- brain and nerves (sinir.glb) ----
  { id: 'x-pons', name: 'Pons', system: 'nervous', mesh: 'Pons',
    aliases: ['brainstem'], blurb: 'Brainstem — between the midbrain and the medulla.' },
  { id: 'x-medulla', name: 'Medulla oblongata', system: 'nervous', mesh: 'Medulla oblongata',
    aliases: ['brainstem'], blurb: 'Lowest brainstem — controls breathing and heart rate.' },
  { id: 'x-midbrain', name: 'Midbrain', system: 'nervous', mesh: 'Midbrain',
    aliases: ['brainstem'], blurb: 'Top of the brainstem.' },
  { id: 'x-thalamus', name: 'Thalamus', system: 'nervous', mesh: 'Thalamus',
    aliases: [], blurb: 'Relay station for sensory information to the cortex.' },
  { id: 'x-corpus-callosum', name: 'Corpus callosum', system: 'nervous', mesh: 'Corpus callosum',
    aliases: [], blurb: 'The main bridge of fibres between the two hemispheres.' },
  { id: 'x-vagus', name: 'Vagus nerve (X)', system: 'nervous', mesh: 'Vagus nerve (X)',
    aliases: ['cranial nerve 10', 'tenth cranial nerve'], blurb: 'Cranial nerve X — parasympathetic supply to the thorax and abdomen.' },
  { id: 'x-optic', name: 'Optic nerve (II)', system: 'nervous', mesh: 'Optic nerve (II)',
    aliases: ['cranial nerve 2', 'second cranial nerve'], blurb: 'Cranial nerve II — carries vision from the retina.' },
];


/*
 * Spatial concepts.
 *
 * Cavities carry NO geometry: it is derived from the loaded meshes at build
 * time (see the note at the top of this file). What they carry is identity —
 * name, aliases, teaching blurb, colour — plus where they sit in the
 * containment hierarchy.
 *
 *   parent     the cavity this one lies inside
 *   combine    this cavity has no shape of its own; draw its members instead
 *   standalone keep it out of the "show the whole group" sweep, because it
 *              overlaps something already in that sweep
 *
 * Regions and quadrants share one gridded panel projected on the front of the
 * body and name the cell to emphasise. Planes carry what they separate and the
 * labels shown on either side.
 */
export const BODY_CONCEPTS = [
  // ---------- cavities ----------
  { id: 'cav-cranial', kind: 'cavity', name: 'Cranial cavity', aliases: ['skull cavity'],
    blurb: 'Holds the brain, inside the skull. Continuous with the vertebral canal through the foramen magnum.',
    color: 0xf0745a, parent: 'cav-dorsal',
    derivedFrom: 'the inner surface of the frontal, parietal, temporal, occipital, sphenoid and ethmoid bones' },

  { id: 'cav-vertebral', kind: 'cavity', name: 'Vertebral canal',
    aliases: ['spinal cavity', 'spinal canal', 'vertebral cavity'],
    blurb: 'Holds the spinal cord, threaded through the vertebral foramina — it follows the cervical, thoracic and lumbar curves.',
    color: 0xe8836b, parent: 'cav-dorsal',
    derivedFrom: 'the vertebral foramen located in each vertebra from C1 to the sacrum' },

  { id: 'cav-thoracic', kind: 'cavity', name: 'Thoracic cavity', aliases: ['chest cavity'],
    blurb: 'Heart, lungs and great vessels — everything above the diaphragm. Its floor is the diaphragm’s dome.',
    color: 0x9a6fd0, parent: 'cav-ventral',
    derivedFrom: 'the inner surface of the ribs, sternum and thoracic vertebrae, floored by the diaphragm' },

  { id: 'cav-abdominal', kind: 'cavity', name: 'Abdominal cavity', aliases: ['abdomen'],
    blurb: 'Stomach, liver, spleen, gut and kidneys. Its roof is the underside of the same diaphragm; it opens below into the pelvic cavity.',
    color: 0xe0517f, parent: 'cav-abdominopelvic',
    derivedFrom: 'the lower ribs, lumbar vertebrae and iliac crests, roofed by the diaphragm and floored by the pelvic inlet' },

  { id: 'cav-pelvic', kind: 'cavity', name: 'Pelvic cavity', aliases: ['pelvis cavity'],
    blurb: 'Bladder, rectum and the internal reproductive organs, funnelling down inside the bony pelvis.',
    color: 0x62c46a, parent: 'cav-abdominopelvic',
    derivedFrom: 'the inner surface of the hip bones, sacrum and coccyx, below the pelvic brim' },

  /*
   * A union, not a third shape. Drawing its own outline would let it drift out
   * of agreement with the two cavities it is defined as the sum of, and the
   * whole point of the concept is that no wall divides them.
   */
  { id: 'cav-abdominopelvic', kind: 'cavity', name: 'Abdominopelvic cavity', aliases: ['abdomino-pelvic'],
    blurb: 'The abdominal and pelvic cavities together — no wall divides them, so it is one continuous space.',
    color: 0xd06fb0, standalone: true, parent: 'cav-ventral',
    combine: ['cav-abdominal', 'cav-pelvic'] },

  { id: 'cav-dorsal', kind: 'cavity', name: 'Dorsal body cavity',
    aliases: ['posterior body cavity', 'dorsal cavity'],
    blurb: 'The cranial cavity plus the vertebral canal — the back cavity, housing the central nervous system.',
    color: 0xf07a5f, standalone: true,
    combine: ['cav-cranial', 'cav-vertebral'] },

  { id: 'cav-ventral', kind: 'cavity', name: 'Ventral body cavity',
    aliases: ['anterior body cavity', 'ventral cavity'],
    blurb: 'The thoracic plus the abdominopelvic cavity — the front cavity, housing the viscera.',
    color: 0x7fa8e8, standalone: true,
    combine: ['cav-thoracic', 'cav-abdominopelvic'] },

  { id: 'cav-mediastinum', kind: 'cavity', name: 'Mediastinum', aliases: ['mediastinal'],
    blurb: 'The central compartment of the thorax, between the two pleural cavities — heart, great vessels, trachea and oesophagus.',
    color: 0xe8a53a, standalone: true, parent: 'cav-thoracic',
    derivedFrom: 'the space left between the two lungs, the sternum in front and the vertebral column behind' },

  { id: 'cav-pericardial', kind: 'cavity', name: 'Pericardial cavity', aliases: ['pericardium'],
    blurb: 'The sac around the heart, inside the mediastinum. Its film of fluid lets the heart beat without friction.',
    color: 0x3fc4bd, standalone: true, parent: 'cav-mediastinum',
    derivedFrom: 'the outer surface of the four heart chambers' },

  { id: 'cav-pleural', kind: 'cavity', name: 'Pleural cavities', aliases: ['pleural cavity', 'pleura'],
    blurb: 'The two sacs around the lungs, one either side of the mediastinum. Air in one is a pneumothorax.',
    color: 0x8f6fd0, standalone: true, parent: 'cav-thoracic',
    derivedFrom: 'the outer surface of each lung, held apart at the mediastinum' },

  // ---------- planes ----------
  { id: 'plane-sagittal', kind: 'plane', name: 'Sagittal plane', aliases: ['median plane', 'midsagittal plane', 'median sagittal'],
    axis: 'x', at: 0, separates: 'left from right', ends: ['Right', 'Left'], color: 0x72e3cf,
    blurb: 'A vertical cut front to back down the midline — separates left from right into equal halves. Off the midline it is parasagittal.' },
  { id: 'plane-parasagittal', kind: 'plane', name: 'Parasagittal plane', aliases: ['paramedian plane'],
    axis: 'x', at: 0.042, separates: 'left from right, into unequal parts', ends: ['Right', 'Left'], color: 0x72e3cf, standalone: true,
    blurb: 'Any sagittal plane that is not on the midline — still left from right, but not into equal halves.' },
  { id: 'plane-coronal', kind: 'plane', name: 'Coronal plane', aliases: ['frontal plane'],
    axis: 'z', at: 0, separates: 'anterior (front) from posterior (back)', ends: ['Back', 'Front'], color: 0x72cf8f,
    blurb: 'A vertical cut side to side — separates the front of the body from the back. A PA chest film is taken along this plane.' },
  { id: 'plane-transverse', kind: 'plane', name: 'Transverse plane', aliases: ['horizontal plane', 'axial plane', 'cross-section'],
    axis: 'y', at: 0.600, separates: 'superior (upper) from inferior (lower)', ends: ['Inferior', 'Superior'], color: 0xe3c072,
    blurb: 'A horizontal cut — separates upper from lower. CT slices are transverse; this one is drawn at the umbilicus.' },
  /*
   * Three planes only. L1 p4 and the glossary give the coronal/frontal,
   * transverse/horizontal and mid-sagittal/median planes and nothing else, and
   * the word "oblique" does not appear anywhere in the supplied lecture set --
   * see the HTI17101 source-fidelity note in study-data.js. An oblique plane
   * lived here until 2026-08-30 and was removed as off-syllabus.
   * Parasagittal stays: it is not a fourth plane but the off-midline case of
   * the sagittal plane, and it is labelled on the planes figure the lesson shows.
   */

  // ---------- 9 abdominopelvic regions ----------
  { id: 'reg-right-hypochondriac', kind: 'region', name: 'Right hypochondriac region', cell: [0, 0], short: 'Right\nhypochondriac',
    blurb: 'Upper right, under the ribs — liver and gallbladder.' },
  { id: 'reg-epigastric', kind: 'region', name: 'Epigastric region', cell: [1, 0], short: 'Epigastric',
    blurb: 'Upper middle, under the sternum — stomach, duodenum, pancreas.' },
  { id: 'reg-left-hypochondriac', kind: 'region', name: 'Left hypochondriac region', cell: [2, 0], short: 'Left\nhypochondriac',
    blurb: 'Upper left, under the ribs — spleen, tail of pancreas.' },
  { id: 'reg-right-lumbar', kind: 'region', name: 'Right lumbar region', aliases: ['right flank'], cell: [0, 1], short: 'Right\nlumbar',
    blurb: 'Middle right — ascending colon, right kidney.' },
  { id: 'reg-umbilical', kind: 'region', name: 'Umbilical region', cell: [1, 1], short: 'Umbilical',
    blurb: 'Centre, around the navel — small intestine, transverse colon.' },
  { id: 'reg-left-lumbar', kind: 'region', name: 'Left lumbar region', aliases: ['left flank'], cell: [2, 1], short: 'Left\nlumbar',
    blurb: 'Middle left — descending colon, left kidney.' },
  { id: 'reg-right-iliac', kind: 'region', name: 'Right iliac region', aliases: ['right inguinal region'], cell: [0, 2], short: 'Right\niliac',
    blurb: 'Lower right — caecum and appendix.' },
  { id: 'reg-hypogastric', kind: 'region', name: 'Hypogastric region', aliases: ['pubic region', 'suprapubic'], cell: [1, 2], short: 'Hypogastric',
    blurb: 'Lower middle, above the pubis — bladder, sigmoid colon, uterus.' },
  { id: 'reg-left-iliac', kind: 'region', name: 'Left iliac region', aliases: ['left inguinal region'], cell: [2, 2], short: 'Left\niliac',
    blurb: 'Lower left — sigmoid colon.' },

  // ---------- 4 abdominopelvic quadrants ----------
  { id: 'quad-ruq', kind: 'quadrant', name: 'Right upper quadrant (RUQ)', cell: [0, 0], short: 'RUQ',
    blurb: 'Liver, gallbladder, right kidney, head of pancreas.' },
  { id: 'quad-luq', kind: 'quadrant', name: 'Left upper quadrant (LUQ)', cell: [1, 0], short: 'LUQ',
    blurb: 'Stomach, spleen, left kidney, body of pancreas.' },
  { id: 'quad-rlq', kind: 'quadrant', name: 'Right lower quadrant (RLQ)', cell: [0, 1], short: 'RLQ',
    blurb: 'Caecum, appendix, right ovary. McBurney point is here.' },
  { id: 'quad-llq', kind: 'quadrant', name: 'Left lower quadrant (LLQ)', cell: [1, 1], short: 'LLQ',
    blurb: 'Sigmoid colon, left ovary.' },
];

/* Grouping keywords: a search for "cavities" / "planes" opens the whole set. */
export const CONCEPT_GROUPS = [
  { kind: 'cavity', name: 'Body cavities', words: ['cavities', 'body cavities', 'cavity'] },
  { kind: 'region', name: 'Abdominopelvic regions', words: ['regions', 'nine regions', '9 regions', 'abdominal regions'] },
  { kind: 'quadrant', name: 'Abdominopelvic quadrants', words: ['quadrants', 'four quadrants', '4 quadrants', 'abdominal quadrants'] },
  { kind: 'plane', name: 'Anatomical planes', words: ['planes', 'body planes', 'anatomical planes', 'plane'] },
];

export function conceptById(id) {
  return BODY_CONCEPTS.find((c) => c.id === id) || null;
}

/**
 * The containment chain, outermost first:
 *   conceptAncestors('cav-pericardial')
 *     -> [ventral, thoracic, mediastinum]
 * so the card can show where the selected cavity sits rather than presenting
 * eleven cavities as a flat list.
 */
export function conceptAncestors(id) {
  const out = [];
  const seen = new Set();
  let c = conceptById(id);
  while (c && c.parent && !seen.has(c.parent)) {
    seen.add(c.parent);
    const p = conceptById(c.parent);
    if (!p) break;
    out.unshift(p);
    c = p;
  }
  return out;
}

/** The cavities immediately inside this one. */
export function conceptChildren(id) {
  return BODY_CONCEPTS.filter((c) => c.parent === id);
}

/** Flatten a `combine` cavity to the ids that actually carry geometry. */
export function conceptLeaves(id, seen) {
  const c = conceptById(id);
  if (!c) return [];
  if (!c.combine) return [id];
  seen = seen || new Set();
  const out = [];
  for (const m of c.combine) {
    if (seen.has(m)) continue;
    seen.add(m);
    out.push(...conceptLeaves(m, seen));
  }
  return out;
}
