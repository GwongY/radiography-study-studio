/*
 * HSS2011 · rows for headings that had none — Movement vocabulary, Muscle teamwork, Dermatomes, the
 * Hypothalamus and the Reticular formation. Each was a box on the map with nothing under it.
 *
 * Read off the 2026 decks page by page, in the slide's words; a structure only in a picture has no row.
 * Row fields: outputs/revision/leaves.js. The week of a row is the week of the deck it comes from, so it
 * shows when that week is reached (revision/weeks.js). Parents are the original topics in hss2011-data.js.
 * The movement rows are the vocabulary only: which muscle does what stays on the muscle rows (moves).
 */
const MSK = 'hss.msk.2026';
const MV = 'hss.move.2026';
const UL = 'hss.ul.2026';
const LL = 'hss.ll.2026';
const HN = 'hss.hnt.2026';
const L5 = 'hss.l5.2026';
const L6 = 'hss.l6.2026';

export const SOURCES = {
  [MV]: 'Terminology of movements (self-study, Weeks 2-4)',
};

export const ROWS = [
/* ---------------- Movement vocabulary ---------------- */
/* Week 1: what each joint type permits (MSK p21-25) */
{ k: 'process', id: 'w1_mv_flexext', l: 'Flexion and extension', parent: 'movements', w: 1, match: 'flexion and extension', line: 'angular movement in one direction and one plane, as at the elbow',
  links: { w1_t_hinge: 'the hinge joint permits it' }, src: [MSK, 21] },
{ k: 'process', id: 'w1_mv_circum', l: 'Circumduction', parent: 'movements', w: 1, line: 'permitted by condyloid and saddle joints, with flexion, extension, abduction and adduction',
  links: { w1_t_condyloid: 'permitted by the condyloid joint', w1_t_saddle: 'permitted by the saddle joint' }, src: [MSK, 23, 24] },
{ k: 'process', id: 'w1_mv_rotation', l: 'Rotation', parent: 'movements', w: 1, line: 'around a single longitudinal axis at a pivot joint; also at ball-and-socket joints',
  links: { w1_t_pivot: 'rotation around a single longitudinal axis', w1_t_ball: 'angular movement in all directions as well as rotation' }, src: [MSK, 22, 25] },

/* Week 2: the self-study terminology deck */
{ k: 'process', id: 'w2_mv_abduction', l: 'Abduction', parent: 'movements', w: 2, line: 'body parts moving away from the midline', src: [MV, 8] },
{ k: 'process', id: 'w2_mv_adduction', l: 'Adduction', parent: 'movements', w: 2, line: 'body parts moving towards the midline', src: [MV, 8] },
{ k: 'process', id: 'w2_mv_pronation', l: 'Pronation', parent: 'movements', w: 2, line: 'palm facing downwards', src: [MV, 9] },
{ k: 'process', id: 'w2_mv_supination', l: 'Supination', parent: 'movements', w: 2, line: 'palm facing upwards', src: [MV, 9] },
{ k: 'process', id: 'w2_mv_dorsiflex', l: 'Dorsiflexion', parent: 'movements', w: 2, match: 'dorsum', line: 'moving the top of the foot (the dorsum) upwards', src: [MV, 9] },
{ k: 'process', id: 'w2_mv_plantarflex', l: 'Plantar flexion', parent: 'movements', w: 2, match: 'plantar surface', line: 'moving the sole of the foot (the plantar surface) downward', src: [MV, 9] },
{ k: 'process', id: 'w2_mv_inversion', l: 'Inversion', parent: 'movements', w: 2, match: 'inward', line: 'tilting the sole of the foot inward (facing medially)', src: [MV, 9] },
{ k: 'process', id: 'w2_mv_eversion', l: 'Eversion', parent: 'movements', w: 2, match: 'outward', line: 'tilting the sole of the foot outward (facing laterally)', src: [MV, 9] },
{ k: 'process', id: 'w2_mv_latrot', l: 'Lateral (external) rotation', parent: 'movements', w: 2, match: 'Lateral/External Rotation', line: 'at the shoulder, lateral rotation of the humerus', src: [MV, 4] },
{ k: 'process', id: 'w2_mv_medrot', l: 'Medial (internal) rotation', parent: 'movements', w: 2, match: 'Medial/Internal Rotation', line: 'at the shoulder, medial rotation of the humerus', src: [MV, 4] },

/* Week 3: the shoulder and arm actions table (UL p20) */
{ k: 'process', id: 'w3_mv_elevation', l: 'Shoulder elevation', parent: 'movements', w: 3, match: 'Elevation', line: 'upper trapezius, levator scapulae',
  links: { w3_trapezius: 'upper trapezius', w3_levator: 'levator scapulae' }, src: [UL, 20] },
{ k: 'process', id: 'w3_mv_depression', l: 'Shoulder depression', parent: 'movements', w: 3, match: 'Depression', line: 'lower trapezius, pectoralis minor',
  links: { w3_trapezius: 'lower trapezius', w3_pecminor: 'pectoralis minor' }, src: [UL, 20] },
{ k: 'process', id: 'w3_mv_protraction', l: 'Protraction', parent: 'movements', w: 3, line: 'serratus anterior', links: { w3_serratus: 'serratus anterior' }, src: [UL, 20] },
{ k: 'process', id: 'w3_mv_retraction', l: 'Retraction', parent: 'movements', w: 3, line: 'middle trapezius, rhomboid major, rhomboid minor',
  links: { w3_trapezius: 'middle trapezius', w3_rhomboidmaj: 'rhomboid major', w3_rhomboidmin: 'rhomboid minor' }, src: [UL, 20] },
{ k: 'process', id: 'w3_mv_uprot', l: 'Upward rotation', parent: 'movements', w: 3, line: 'upper and lower trapezius and serratus anterior',
  links: { w3_trapezius: 'upper and lower trapezius', w3_serratus: 'serratus anterior' }, src: [UL, 20] },
{ k: 'process', id: 'w3_mv_downrot', l: 'Downward rotation', parent: 'movements', w: 3, line: 'levator scapulae, rhomboid major, rhomboid minor',
  links: { w3_levator: 'levator scapulae', w3_rhomboidmaj: 'rhomboid major', w3_rhomboidmin: 'rhomboid minor' }, src: [UL, 20] },
{ k: 'process', id: 'w3_mv_horizadd', l: 'Horizontal adduction', parent: 'movements', w: 3, line: 'pectoralis major, anterior deltoid',
  links: { w3_pecmajor: 'pectoralis major', w3_deltoid: 'anterior deltoid' }, src: [UL, 20] },
{ k: 'process', id: 'w3_mv_horizabd', l: 'Horizontal abduction', parent: 'movements', w: 3, line: 'posterior deltoid, infraspinatus, teres minor',
  links: { w3_deltoid: 'posterior deltoid', w3_infraspin: 'infraspinatus', w3_teresmin: 'teres minor' }, src: [UL, 20] },

/* Week 4: the eye and the mandible (HN p9-10) */
{ k: 'process', id: 'w4_mv_intorsion', l: 'Intorsion', parent: 'movements', w: 4, line: 'the eyeball rolls medially', links: { w4_eyeball: 'the eyeball rolls medially' }, src: [HN, 9] },
{ k: 'process', id: 'w4_mv_extorsion', l: 'Extorsion', parent: 'movements', w: 4, line: 'the eyeball rolls laterally', links: { w4_eyeball: 'the eyeball rolls laterally' }, src: [HN, 9] },
{ k: 'process', id: 'w4_mv_mandelev', l: 'Mandible elevation', parent: 'movements', w: 4, match: 'Elevation', line: 'temporalis, masseter, medial pterygoid',
  links: { w4_mandible: 'moves the mandible', w4_temporalis: 'elevates', w4_masseter: 'elevates', w4_medpterygoid: 'protrudes and elevates' }, src: [HN, 10] },
{ k: 'process', id: 'w4_mv_mandep', l: 'Mandible depression', parent: 'movements', w: 4, match: 'Depression', line: 'lateral pterygoid protrudes and depresses the mandible',
  links: { w4_latpterygoid: 'protrudes and depresses' }, src: [HN, 10] },
{ k: 'process', id: 'w4_mv_retrusion', l: 'Retrusion', parent: 'movements', w: 4, line: 'temporalis elevates and retrudes the mandible', links: { w4_temporalis: 'elevates and retrudes' }, src: [HN, 10] },
{ k: 'process', id: 'w4_mv_protrusion', l: 'Protrusion', parent: 'movements', w: 4, line: 'medial and lateral pterygoids protrude the mandible; masseter weakly',
  links: { w4_medpterygoid: 'protrudes', w4_latpterygoid: 'protrudes', w4_masseter: 'weakly protrudes' }, src: [HN, 10] },
{ k: 'process', id: 'w4_mv_excursion', l: 'Lateral excursion', parent: 'movements', w: 4, line: 'the pterygoids, acting on one side, swing the jaw laterally',
  links: { w4_medpterygoid: 'unilaterally swings the jaw laterally', w4_latpterygoid: 'unilaterally swings the jaw laterally' }, src: [HN, 10] },

/* ---------------- Muscle teamwork (LL p25) ---------------- */
{ k: 'process', id: 'w2_mt_prime', l: 'Prime mover', parent: 'muscleroles', w: 2, line: 'iliopsoas is the prime mover', links: { w2_iliopsoas: 'iliopsoas is the prime mover' }, src: [LL, 25] },
{ k: 'process', id: 'w2_mt_syn', l: 'Synergists', parent: 'muscleroles', w: 2, line: 'sartorius, TFL, pectineus',
  links: { w2_sartorius: 'a synergist', w2_tfl: 'a synergist', w2_pectineus: 'a synergist' }, src: [LL, 25] },
{ k: 'process', id: 'w2_mt_antag', l: 'Antagonists', parent: 'muscleroles', w: 2, line: 'gluteus maximus, hamstring', links: { w2_gmax: 'an antagonist' }, src: [LL, 25] },
{ k: 'process', id: 'w2_mt_fix', l: 'Fixators', parent: 'muscleroles', w: 2, line: 'abdominal muscles are the fixators', src: [LL, 25] },

/* ---------------- Dermatomes (L5 p39, p42) ---------------- */
{ k: 'part', id: 'w5_dm_cutaneous', l: 'Cutaneous innervation', parent: 'dermatomes', w: 5, line: 'each spinal nerve (except C1) receives sensory input from specific skin areas', src: [L5, 39] },
{ k: 'part', id: 'w5_dm_map', l: 'Dermatome map', parent: 'dermatomes', w: 5, line: 'indicates the approximate areas innervated by the corresponding spinal nerve', src: [L5, 39] },
{ k: 'part', id: 'w5_dm_overlap', l: 'Same area, 2-3 spinal nerves', parent: 'dermatomes', w: 5, match: 'Same area may be innervated', line: 'the same area may be innervated by 2-3 spinal nerves', src: [L5, 39] },
{ k: 'part', id: 'w5_dm_shingles', l: 'Shingles', parent: 'dermatomes', w: 5, line: 'viral infection with fluid-filled vesicles; may cause long-lasting intense pain', src: [L5, 42] },
{ k: 'part', id: 'w5_dm_vzv', l: 'Varicella-zoster virus', parent: 'w5_dm_shingles', w: 5, match: 'Varicella-zoster', line: 'travels down the sensory nerves by axonal transport', src: [L5, 42] },

/* ---------------- Hypothalamus functions (L6 p29) ---------------- */
{ k: 'process', id: 'w6_hy_hormones', l: 'Produce and secrete hormones', parent: 'hypothalamus', w: 6, match: 'Produce and secret hormones', line: 'regulate growth, metabolism, excretion, reproduction', src: [L6, 29] },
{ k: 'process', id: 'w6_hy_auto', l: 'Autonomic function', parent: 'hypothalamus', w: 6, line: 'influences brainstem functions such as heart rate, blood pressure, digestive function',
  links: { ans: 'regulates the autonomic nervous system' }, src: [L6, 29] },
{ k: 'process', id: 'w6_hy_behave', l: 'Subconscious behaviours', parent: 'hypothalamus', w: 6, line: 'emotion, feeding behaviours', src: [L6, 29] },
{ k: 'process', id: 'w6_hy_thermo', l: 'Thermoregulation', parent: 'hypothalamus', w: 6, src: [L6, 29] },
{ k: 'process', id: 'w6_hy_circadian', l: 'Circadian rhythm', parent: 'hypothalamus', w: 6, src: [L6, 29] },

/* ---------------- Reticular formation functions (L6 p23) ---------------- */
{ k: 'process', id: 'w6_rf_motor', l: 'Somatic motor control', parent: 'reticular', w: 6, line: 'adjust muscle tone, balance, posture', src: [L6, 23] },
{ k: 'process', id: 'w6_rf_cardio', l: 'Cardiovascular control', parent: 'reticular', w: 6, src: [L6, 23] },
{ k: 'process', id: 'w6_rf_pain', l: 'Pain modulation', parent: 'reticular', w: 6, line: 'regulate or block pain signals', src: [L6, 23] },
{ k: 'process', id: 'w6_rf_sleep', l: 'Sleep and consciousness', parent: 'reticular', w: 6, line: 'control the state of consciousness', src: [L6, 23] },
{ k: 'process', id: 'w6_rf_habit', l: 'Habituation', parent: 'reticular', w: 6, line: 'ignore repetitive, inconsequential stimuli', src: [L6, 23] },
];
