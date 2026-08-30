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
 *   BODY_CONCEPTS  cavities, regions, quadrants and planes. None of these exist
 *                  in the GLB atlas, so the viewer draws them procedurally,
 *                  sized against the rendered body's bounding box. Geometry is
 *                  given in body fractions:
 *                     fy   0 = soles, 1 = crown         (vertical)
 *                     fx  -1 .. 1 across the trunk half-width (patient view)
 *                     fz  -1 .. 1 front(+) to back(-) of the trunk half-depth
 *                  The viewer maps those to world units at runtime.
 *
 * Nothing here is course material — it is standard first-year spatial anatomy,
 * written for this app, and it is kept out of the lesson corpus on purpose.
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
 * Spatial concepts. `box` fields are in body fractions (see header). Regions and
 * quadrants share one gridded panel on the front of the trunk; each entry names
 * the cell to emphasise. Planes carry what they separate and the two side labels
 * shown at the ends of the plane.
 */
export const BODY_CONCEPTS = [
  // ---------- cavities ----------
  { id: 'cav-cranial', kind: 'cavity', name: 'Cranial cavity', aliases: ['skull cavity'],
    blurb: 'Holds the brain, inside the skull.', color: 0xe0663a,
    box: { fy: [0.90, 1.00], fx: [-0.30, 0.30], fz: [-0.5, 0.35] } },
  { id: 'cav-vertebral', kind: 'cavity', name: 'Vertebral canal', aliases: ['spinal cavity', 'spinal canal'],
    blurb: 'Holds the spinal cord, running through the vertebrae.', color: 0x6f8fe0,
    box: { fy: [0.50, 0.90], fx: [-0.07, 0.07], fz: [-0.62, -0.32] } },
  { id: 'cav-thoracic', kind: 'cavity', name: 'Thoracic cavity', aliases: ['chest cavity'],
    blurb: 'Heart, lungs and great vessels — above the diaphragm.', color: 0x3aa4c8,
    box: { fy: [0.695, 0.83], fx: [-0.9, 0.9], fz: [-0.55, 0.7] } },
  { id: 'cav-abdominal', kind: 'cavity', name: 'Abdominal cavity', aliases: ['abdomen'],
    blurb: 'Stomach, liver, spleen, gut and kidneys — below the diaphragm.', color: 0xc8a63a,
    box: { fy: [0.55, 0.695], fx: [-0.98, 0.98], fz: [-0.6, 0.85] } },
  { id: 'cav-pelvic', kind: 'cavity', name: 'Pelvic cavity', aliases: ['pelvis cavity'],
    blurb: 'Bladder, rectum and reproductive organs — inside the bony pelvis.', color: 0x9a5ac8,
    box: { fy: [0.46, 0.55], fx: [-0.8, 0.8], fz: [-0.5, 0.7] } },
  { id: 'cav-abdominopelvic', kind: 'cavity', name: 'Abdominopelvic cavity', aliases: ['abdomino-pelvic'],
    blurb: 'The abdominal and pelvic cavities together — one continuous space.', color: 0xc07fb0,
    standalone: true,
    box: { fy: [0.46, 0.695], fx: [-0.98, 0.98], fz: [-0.6, 0.85] } },

  // ---------- planes ----------
  { id: 'plane-sagittal', kind: 'plane', name: 'Sagittal plane', aliases: ['median plane', 'midsagittal plane', 'vertical plane'],
    axis: 'x', at: 0, separates: 'left from right', ends: ['Right', 'Left'], color: 0x72e3cf,
    blurb: 'A vertical cut down the midline — separates left from right. Off-centre it is parasagittal.' },
  { id: 'plane-parasagittal', kind: 'plane', name: 'Parasagittal plane', aliases: ['paramedian plane'],
    axis: 'x', at: 0.45, separates: 'left from right (unequally)', ends: ['Right', 'Left'], color: 0x72e3cf, standalone: true,
    blurb: 'Any sagittal plane that is not on the midline — still left from right, but not into equal halves.' },
  { id: 'plane-coronal', kind: 'plane', name: 'Coronal plane', aliases: ['frontal plane'],
    axis: 'z', at: 0, separates: 'anterior (front) from posterior (back)', ends: ['Back', 'Front'], color: 0x72cf8f,
    blurb: 'A vertical cut side to side — separates the front of the body from the back.' },
  { id: 'plane-transverse', kind: 'plane', name: 'Transverse plane', aliases: ['horizontal plane', 'axial plane', 'cross-section'],
    axis: 'y', at: 0.62, separates: 'superior (upper) from inferior (lower)', ends: ['Lower', 'Upper'], color: 0xe3c072,
    blurb: 'A horizontal cut — separates the upper part of the body from the lower. CT slices are transverse.' },
  { id: 'plane-oblique', kind: 'plane', name: 'Oblique plane', aliases: ['angled plane'],
    axis: 'oblique', at: 0.6, separates: 'the body at an angle', ends: ['', ''], color: 0xe38f72,
    blurb: 'Any slice that is not parallel to the sagittal, coronal or transverse planes.' },

  // ---------- 9 abdominopelvic regions ----------
  { id: 'reg-right-hypochondriac', kind: 'region', name: 'Right hypochondriac region', cell: [0, 0],
    blurb: 'Upper right — liver and gallbladder.' },
  { id: 'reg-epigastric', kind: 'region', name: 'Epigastric region', cell: [1, 0],
    blurb: 'Upper middle — stomach, duodenum, pancreas.' },
  { id: 'reg-left-hypochondriac', kind: 'region', name: 'Left hypochondriac region', cell: [2, 0],
    blurb: 'Upper left — spleen, tail of pancreas.' },
  { id: 'reg-right-lumbar', kind: 'region', name: 'Right lumbar region', aliases: ['right flank'], cell: [0, 1],
    blurb: 'Middle right — ascending colon, right kidney.' },
  { id: 'reg-umbilical', kind: 'region', name: 'Umbilical region', cell: [1, 1],
    blurb: 'Centre — small intestine, transverse colon.' },
  { id: 'reg-left-lumbar', kind: 'region', name: 'Left lumbar region', aliases: ['left flank'], cell: [2, 1],
    blurb: 'Middle left — descending colon, left kidney.' },
  { id: 'reg-right-iliac', kind: 'region', name: 'Right iliac region', aliases: ['right inguinal region'], cell: [0, 2],
    blurb: 'Lower right — caecum and appendix.' },
  { id: 'reg-hypogastric', kind: 'region', name: 'Hypogastric region', aliases: ['pubic region', 'suprapubic'], cell: [1, 2],
    blurb: 'Lower middle — bladder, sigmoid colon, uterus.' },
  { id: 'reg-left-iliac', kind: 'region', name: 'Left iliac region', aliases: ['left inguinal region'], cell: [2, 2],
    blurb: 'Lower left — sigmoid colon.' },

  // ---------- 4 abdominopelvic quadrants ----------
  { id: 'quad-ruq', kind: 'quadrant', name: 'Right upper quadrant (RUQ)', cell: [0, 0],
    blurb: 'Liver, gallbladder, right kidney, head of pancreas.' },
  { id: 'quad-luq', kind: 'quadrant', name: 'Left upper quadrant (LUQ)', cell: [1, 0],
    blurb: 'Stomach, spleen, left kidney, body of pancreas.' },
  { id: 'quad-rlq', kind: 'quadrant', name: 'Right lower quadrant (RLQ)', cell: [0, 1],
    blurb: 'Caecum, appendix, right ovary. McBurney point is here.' },
  { id: 'quad-llq', kind: 'quadrant', name: 'Left lower quadrant (LLQ)', cell: [1, 1],
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
