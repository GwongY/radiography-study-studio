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
 *                  in the GLB atlas, so the viewer draws them procedurally.
 *
 * ---------------------------------------------------------------------------
 * COORDINATES
 *
 * Every number below is a fraction of the body's HEIGHT, measured in the
 * model's own upright frame (so the idle turntable does not move them):
 *
 *     fy    0 = soles, 1 = crown
 *     fx    0 = median plane; + is the patient's LEFT, - the patient's right
 *     fz    0 = the trunk's front-back centre; + is anterior (front)
 *
 * Using one unit for all three axes means the figures can be checked against
 * the skeleton directly. They were: every landmark below was measured off the
 * loaded NIH skeleton rather than guessed, e.g.
 *
 *     crown 1.000 · foramen magnum ~0.930 · C7/T1 0.845 · jugular notch 0.822
 *     xiphoid 0.714-0.728 · 10th costal cartilage 0.621 · L3 0.596-0.623
 *     iliac crest 0.591 · sacral promontory 0.573 · pubic symphysis ~0.490
 *     widest ribs fx 0.088 · widest pelvis fx 0.084 · midclavicular fx 0.050
 *     sternum front fz +0.060 · thoracic spinous tips fz -0.067
 *
 * CAVITY SHAPES
 *
 * A cavity is a membrane, not a box, so each one is a surface of revolution:
 * `shell.profile` is a list of [radius, fy] points revolved about a vertical
 * axis, radius running 0..1 and stretched to `rx` wide and `rz` deep. A profile
 * that starts and ends at radius 0 closes into a sac; running the profile back
 * up on itself is how the diaphragm's dome becomes the floor of one cavity and
 * the roof of the next. The vertebral canal is a tube swept along the actual
 * spinal curves instead.
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
 * The anterior abdominal wall the region / quadrant grid is painted on.
 *
 * `top` is the xiphoid; away from the midline the upper edge follows the costal
 * margin down to `costalLat` at the flank, which is why the hypochondriac cells
 * are short and the epigastric one runs up under the sternum. `zMid`/`zEdge`
 * bow the grid around the belly instead of leaving it a flat decal.
 */
export const ABDOMEN = {
  top: 0.727,              /* xiphisternum */
  costalLat: 0.618,        /* costal margin at the flank (10th rib) */
  archExp: 1.6,            /* how fast the costal margin falls away from the midline */
  halfX: 0.090,            /* flank */
  midclavicular: 0.050,    /* the two vertical lines of the nine-region grid */
  subcostal: 0.612,        /* upper horizontal line (L3) */
  transtubercular: 0.556,  /* lower horizontal line (tubercles of the iliac crests) */
  transumbilical: 0.600,   /* the quadrant line (umbilicus) */
  bottom: 0.484,           /* pubic symphysis */
  zMid: 0.072,             /* front of the belly at the midline */
  zEdge: 0.020,            /* ...falling back to this at the flank */
};

/*
 * Spatial concepts. Cavities carry a `shell` (lathe profile), a `tube` (swept
 * path) or `combine` (the union of other cavities, drawn in one colour).
 * Regions and quadrants share one gridded panel and name the cell to emphasise.
 * Planes carry what they separate and the labels shown on either side.
 */
export const BODY_CONCEPTS = [
  // ---------- cavities ----------
  { id: 'cav-cranial', kind: 'cavity', name: 'Cranial cavity', aliases: ['skull cavity'],
    blurb: 'Holds the brain, inside the skull. Continuous with the vertebral canal through the foramen magnum.',
    color: 0xf0745a, labelFx: 0.10, labelFy: 0.965,
    shell: { rx: 0.045, rz: 0.055, cz: -0.006, profile: [
      [0.00, 0.922], [0.45, 0.9255], [0.75, 0.932], [0.92, 0.941], [0.99, 0.953], [1.00, 0.964],
      [0.96, 0.975], [0.85, 0.984], [0.62, 0.990], [0.32, 0.9925], [0.00, 0.993]] } },

  { id: 'cav-vertebral', kind: 'cavity', name: 'Vertebral canal', aliases: ['spinal cavity', 'spinal canal', 'vertebral cavity'],
    blurb: 'Holds the spinal cord, threaded through the vertebral foramina — it follows the cervical, thoracic and lumbar curves.',
    color: 0xe8836b, labelFx: -0.13, labelFy: 0.745,
    tube: { r: 0.011, path: [
      [0.935, -0.010], [0.905, -0.016], [0.872, -0.022], [0.845, -0.030], [0.812, -0.038],
      [0.775, -0.044], [0.740, -0.046], [0.700, -0.044], [0.665, -0.038], [0.628, -0.030],
      [0.600, -0.026], [0.575, -0.030], [0.545, -0.038], [0.512, -0.048]] } },

  { id: 'cav-thoracic', kind: 'cavity', name: 'Thoracic cavity', aliases: ['chest cavity'],
    blurb: 'Heart, lungs and great vessels — everything above the diaphragm. Its floor is the diaphragm’s dome.',
    color: 0x9a6fd0, labelFx: 0.135, labelFy: 0.775,
    shell: { rx: 0.078, rz: 0.052, cz: -0.002, profile: [
      [0.00, 0.716], [0.34, 0.712], [0.62, 0.701], [0.85, 0.683], [0.97, 0.664], [1.00, 0.650],
      [1.00, 0.678], [0.99, 0.706], [0.97, 0.735], [0.93, 0.765], [0.86, 0.792], [0.74, 0.815],
      [0.56, 0.834], [0.34, 0.847], [0.00, 0.856]] } },

  { id: 'cav-abdominal', kind: 'cavity', name: 'Abdominal cavity', aliases: ['abdomen'],
    blurb: 'Stomach, liver, spleen, gut and kidneys. Its roof is the underside of the same diaphragm; it opens below into the pelvic cavity.',
    color: 0xe0517f, labelFx: 0.145, labelFy: 0.630,
    shell: { rx: 0.086, rz: 0.058, cz: 0.008, profile: [
      [0.00, 0.716], [0.36, 0.711], [0.66, 0.699], [0.88, 0.680], [0.98, 0.660], [1.00, 0.640],
      [1.00, 0.615], [0.99, 0.596], [0.96, 0.580], [0.88, 0.568], [0.70, 0.560], [0.40, 0.556],
      [0.00, 0.554]] } },

  { id: 'cav-pelvic', kind: 'cavity', name: 'Pelvic cavity', aliases: ['pelvis cavity'],
    blurb: 'Bladder, rectum and the internal reproductive organs, funnelling down inside the bony pelvis.',
    color: 0x62c46a, labelFx: 0.135, labelFy: 0.510,
    shell: { rx: 0.050, rz: 0.042, cz: -0.006, profile: [
      [0.00, 0.560], [0.48, 0.559], [0.80, 0.555], [0.96, 0.546], [1.00, 0.532],
      [0.97, 0.514], [0.88, 0.497], [0.72, 0.482], [0.50, 0.470], [0.26, 0.463], [0.00, 0.460]] } },

  { id: 'cav-abdominopelvic', kind: 'cavity', name: 'Abdominopelvic cavity', aliases: ['abdomino-pelvic'],
    blurb: 'The abdominal and pelvic cavities together — no wall divides them, so it is one continuous space.',
    color: 0xd06fb0, standalone: true, labelFx: 0.15, labelFy: 0.590,
    shell: { rx: 0.086, rz: 0.058, cz: 0.006, profile: [
      [0.00, 0.716], [0.36, 0.711], [0.66, 0.699], [0.88, 0.680], [0.98, 0.660], [1.00, 0.640],
      [1.00, 0.612], [0.97, 0.590], [0.90, 0.570], [0.80, 0.552], [0.70, 0.534], [0.60, 0.512],
      [0.48, 0.492], [0.34, 0.474], [0.18, 0.464], [0.00, 0.460]] } },

  { id: 'cav-dorsal', kind: 'cavity', name: 'Dorsal body cavity', aliases: ['posterior body cavity', 'dorsal cavity'],
    blurb: 'The cranial cavity plus the vertebral canal — the back cavity, housing the central nervous system.',
    color: 0xf07a5f, standalone: true, labelFx: -0.15, labelFy: 0.870,
    combine: ['cav-cranial', 'cav-vertebral'] },

  { id: 'cav-ventral', kind: 'cavity', name: 'Ventral body cavity', aliases: ['anterior body cavity', 'ventral cavity'],
    blurb: 'The thoracic plus the abdominopelvic cavity — the front cavity, housing the viscera.',
    color: 0x7fa8e8, standalone: true, labelFx: 0.16, labelFy: 0.690,
    combine: ['cav-thoracic', 'cav-abdominopelvic'] },

  { id: 'cav-mediastinum', kind: 'cavity', name: 'Mediastinum', aliases: ['mediastinal'],
    blurb: 'The central compartment of the thorax, between the two pleural cavities — heart, great vessels, trachea and oesophagus.',
    color: 0xe8a53a, standalone: true, labelFx: -0.150, labelFy: 0.815,
    shell: { rx: 0.026, rz: 0.052, cz: -0.004, profile: [
      [0.00, 0.658], [0.55, 0.665], [0.85, 0.676], [1.00, 0.692], [1.00, 0.760],
      [0.92, 0.800], [0.72, 0.830], [0.40, 0.848], [0.00, 0.856]] } },

  { id: 'cav-pericardial', kind: 'cavity', name: 'Pericardial cavity', aliases: ['pericardium'],
    blurb: 'The sac around the heart, inside the mediastinum. Its film of fluid lets the heart beat without friction.',
    color: 0x3fc4bd, standalone: true, labelFx: 0.140, labelFy: 0.700,
    shell: { cx: 0.012, cz: 0.008, rx: 0.034, rz: 0.038, profile: [
      [0.00, 0.694], [0.42, 0.697], [0.74, 0.706], [0.94, 0.720], [1.00, 0.736],
      [0.96, 0.752], [0.84, 0.765], [0.62, 0.774], [0.32, 0.779], [0.00, 0.781]] } },

  { id: 'cav-pleural', kind: 'cavity', name: 'Pleural cavities', aliases: ['pleural cavity', 'pleura'],
    blurb: 'The two sacs around the lungs, one either side of the mediastinum. Air in one is a pneumothorax.',
    color: 0x8f6fd0, standalone: true, labelFx: 0.155, labelFy: 0.800,
    shell: { cx: 0.046, mirror: true, rx: 0.032, rz: 0.052, cz: -0.006, profile: [
      [0.00, 0.700], [0.40, 0.696], [0.72, 0.686], [0.92, 0.672], [1.00, 0.658],
      [1.00, 0.700], [0.98, 0.740], [0.92, 0.780], [0.78, 0.812], [0.52, 0.838], [0.00, 0.854]] } },

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
  { id: 'plane-oblique', kind: 'plane', name: 'Oblique plane', aliases: ['angled plane'],
    axis: 'oblique', at: 0.62, separates: 'the body at an angle to the other three planes', ends: ['', ''], color: 0xe38f72,
    blurb: 'Any slice that is not parallel to the sagittal, coronal or transverse planes.' },

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
