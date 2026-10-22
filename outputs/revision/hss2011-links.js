/*
 * HSS2011 · links between rows that the row fields cannot say (23 Oct 2026).
 *
 * Until now a row got links only from its own fields (a muscle's joints, a bone's joints, a nerve's targets,
 * `links:`), so most structures sat in the map joined to nothing but their heading: the Coronal suture knew
 * neither the frontal nor the parietal bone. This list adds the relations the slides show or state: which bones
 * a suture joins, which ossicle meets which, what a movement is done by, where a brainstem centre sends its
 * signal. Each is [a, b, why, source, page, match]:
 *   why     the relation in a few words, the slide's where it has them
 *   source, page   a page of that deck on which the relation is shown or stated
 *   match   a name on that page (work/revision-check.mjs checks that it is there)
 * A link is drawn only when both ends are reached (revision/weeks.js). Add new relations here, not by growing a row.
 */
const HN = 'hss.hnt.2026', MSK = 'hss.msk.2026', UL = 'hss.ul.2026', LL = 'hss.ll.2026';
const L5 = 'hss.l5.2026', L6 = 'hss.l6.2026', L7 = 'hss.l7.2026', L8 = 'hss.l8.2026', L9 = 'hss.l9.2026';

export const LINKS = [
  /* skull: the sutures on the Cranial Bones figure (HN p6) join the bones their names give */
  ['w4_coronal', 'w4_frontal', 'the suture between the frontal and parietal bones', HN, 6, 'Coronal suture'],
  ['w4_coronal', 'w4_parietal', 'the suture between the frontal and parietal bones', HN, 6, 'Coronal suture'],
  ['w4_sagittal', 'w4_parietal', 'the suture between the two parietal bones', HN, 6, 'Sagittal'],
  ['w4_lambdoid', 'w4_parietal', 'the suture between the parietal and occipital bones', HN, 6, 'Lambdoid suture'],
  ['w4_lambdoid', 'w4_occipital', 'the suture between the parietal and occipital bones', HN, 6, 'Lambdoid suture'],
  ['w4_squamous', 'w4_temporal', 'the suture between the temporal and parietal bones (parietomastoid: parietal and the mastoid part)', HN, 6, 'Squamous suture'],
  ['w4_squamous', 'w4_parietal', 'the suture between the temporal and parietal bones', HN, 6, 'Squamous suture'],
  ['w4_occtemp', 'w4_occipital', 'the suture between the occipital and temporal bones', HN, 6, 'Occipitotemporal'],
  ['w4_occtemp', 'w4_temporal', 'the suture between the occipital and temporal bones', HN, 6, 'Occipitotemporal'],
  ['w4_ethmoid', 'w4_vomer', 'both labelled on the nasal septum', HN, 7, 'Vomer'],
  ['w4_atlas', 'w4_occipital', 'the occipital condyle meets the superior articular facet of the atlas', HN, 19, 'Occipital'],
  ['w4_atlas', 'w4_axis', 'the odontoid process of the axis', HN, 19, 'Odontoid'],
  ['w4_trueribs', 'w3_sternum', 'ribs 1-10 join the sternum via costal cartilages', HN, 23, 'sternum'],
  ['w4_j_facet', 'w4_facetorient', 'the facets that make the facet joints', HN, 22, 'Facet joints'],

  /* girdles, foot and hand */
  ['w3_clavicle', 'w3_manubrium', 'the sternoclavicular joint', MSK, 24, 'Sternoclavicular'],
  ['w3_clavicle', 'w3_scapula', 'the acromioclavicular joint', MSK, 20, 'Acromioclavicular'],
  ['w3_manubrium', 'w3_sternum', 'bones of the pectoral girdle figure', UL, 2, 'Manubrium'],
  ['w2_navicular', 'w2_talus', 'tarsal bones on the foot figure', LL, 12, 'Navicular'],
  ['w2_navicular', 'w2_cuneiforms', 'tarsal bones on the foot figure', LL, 12, 'Navicular'],
  ['w2_cuboid', 'w2_calcaneus', 'tarsal bones on the foot figure', LL, 12, 'Cuboid'],
  ['w2_cuneiforms', 'w2_metatarsals', 'tarsal and metatarsal bones on the foot figure', LL, 12, 'Cuneiform'],
  ['w2_metatarsals', 'w2_phalanges', 'metatarsophalangeal joints', MSK, 23, 'Metatarsophalangeal'],

  /* movement vocabulary: the joint or muscle the slide ties each movement to */
  ['w2_mv_pronation', 'w1_j_pru', 'rotational movement at the radioulnar joint', UL, 10, 'Pronation'],
  ['w2_mv_supination', 'w1_j_pru', 'rotational movement at the radioulnar joint', UL, 10, 'Supination'],
  ['w2_mv_dorsiflex', 'w2_j_ankle', 'plantarflexion and dorsiflexion at the ankle', LL, 12, 'dorsiflexion'],
  ['w2_mv_dorsiflex', 'w2_ta', 'anterior compartment: dorsiflexion', LL, 28, 'dorsiflexion'],
  ['w2_mv_plantarflex', 'w2_j_ankle', 'plantarflexion and dorsiflexion at the ankle', LL, 12, 'plantarflexion'],
  ['w2_mv_inversion', 'w2_j_subtalar', 'the subtalar joint: for inversion and eversion', LL, 13, 'Inversion'],
  ['w2_mv_eversion', 'w2_j_subtalar', 'the subtalar joint: for inversion and eversion', LL, 13, 'Eversion'],
  ['w2_mv_inversion', 'w2_tp', 'deep posterior compartment: plantar flexion, inversion', LL, 30, 'inversion'],
  ['w2_mv_eversion', 'w2_fl', 'lateral compartment: plantar flexion, foot eversion', LL, 29, 'eversion'],
  ['w2_mv_latrot', 'w1_j_gh', 'lateral rotation of the humerus at the shoulder', 'hss.move.2026', 4, 'Rotation of Shoulder'],
  ['w2_mv_medrot', 'w1_j_gh', 'medial rotation of the humerus at the shoulder', 'hss.move.2026', 4, 'Rotation of Shoulder'],
  ['w2_mv_abduction', 'w4_lr', 'LR abducts (out)', HN, 9, 'abduct'],
  ['w2_mv_adduction', 'w4_mr', 'MR adducts (in)', HN, 9, 'adduct'],

  /* ear */
  ['w7_malleus', 'w7_incus', 'the three ossicles: hammer, anvil, stirrup', L7, 28, 'Incus'],
  ['w7_incus', 'w7_stapes', 'the three ossicles: hammer, anvil, stirrup', L7, 28, 'Incus'],

  /* spinal cord, meninges and spinal nerves */
  ['w5_cervenl', 'w5_cord_c', 'the cervical enlargement gives rise to nerves for the upper limbs', L5, 26, 'Cervical enlargement'],
  ['w5_lumbenl', 'w5_cord_l', 'the lumbosacral enlargement: nerves to the pelvic region and lower limbs', L5, 26, 'Lumbosacral enlargement'],
  ['w5_lumbenl', 'w5_cord_s', 'the lumbosacral enlargement: nerves to the pelvic region and lower limbs', L5, 26, 'Lumbosacral enlargement'],
  ['w5_cauda', 'w5_lumbenl', 'the cauda equina innervates the pelvic and lower limbs', L5, 26, 'Cauda equina'],
  ['w5_subarachnoid', 'csf', 'the sub-arachnoid space is filled with cerebrospinal fluid', L5, 27, 'Sub-arachnoid'],
  ['w6_endosteal', 'skull', 'the endosteal layer is attached to the cranial bones', L6, 10, 'Endosteal'],
  ['w5_sn_c', 'w5_cervical_plexus', 'the cervical plexus: from spinal nerves C1 to C5', L5, 37, 'Cervical Plexus'],
  ['w5_sn_l', 'w5_lumbar_plexus', 'the lumbar plexus: from L1 to L4', L5, 38, 'Lumbar Plexus'],
  ['w5_sn_s', 'w5_sacral_plexus', 'the sacral plexus: from L4 to S4', L5, 38, 'Sacral'],
  ['w5_dm_cutaneous', 'spinalnerves', 'each spinal nerve (except C1) supplies a dermatome', L5, 39, 'dermatome'],

  /* brainstem and brain */
  ['w6_cvcentre', 'heart', 'cardiovascular centre: heart rate, contraction force', L6, 19, 'Cardiovascular'],
  ['w6_respcentre', 'respsys', 'respiratory centre: pace of respiration', L6, 19, 'Respiratory'],
  ['w6_cuneatus', 'thalamus', 'somatic sensation to the thalamus', L6, 19, 'cuneatus'],
  ['w6_gracilis', 'thalamus', 'somatic sensation to the thalamus', L6, 19, 'gracilis'],
  ['w6_medcnnuclei', 'cranialnerves', 'nuclei of CN VIII to XII', L6, 19, 'CN VIII'],
  ['w6_ponscnnuclei', 'cranialnerves', 'nuclei of CN V to VIII', L6, 20, 'CN V'],
  ['w6_midcnnuclei', 'cranialnerves', 'nuclei of CN III and IV', L6, 22, 'CN III'],
  ['w6_supcolliculus', 'visualpath', 'visual reflex and visual attention', L6, 21, 'Superior colliculus'],
  ['w6_infcolliculus', 'ear_hearing', 'transduces auditory information; auditory reflexes', L6, 21, 'Inferior colliculus'],
  ['w6_hy_circadian', 'visualpath', 'melanopsin ganglion cells are for circadian rhythm', L7, 44, 'circadian'],
  ['w7_baro', 'w7_baroreflex', 'baroreceptors detect pressure changes in the vessel walls', L7, 9, 'Baroreceptor'],
  ['w7_flavor', 'smell', 'flavor combines primary tastes, smell, texture and temperature', L7, 21, 'smell'],

  /* heart and respiration */
  ['w8_midmed', 'heart', 'the middle mediastinum contains the heart and pericardium', L8, 4, 'Middle'],
  ['w8_midmed', 'pericardium', 'the middle mediastinum contains the heart and pericardium', L8, 4, 'Middle'],
  ['w8_postmed', 'w8_descaorta', 'the posterior mediastinum holds the descending aorta', L8, 4, 'Posterior'],
  ['w8_apex', 'w8_lv', 'the apex is mainly formed by the left ventricle', L8, 6, 'apex'],
  ['w9_upperrt', 'nose', 'the nose, mouth, pharynx and larynx', L9, 5, 'Upper Respiratory Tract'],
  ['w9_upperrt', 'pharynx', 'the nose, mouth, pharynx and larynx', L9, 5, 'Upper Respiratory Tract'],
  ['w9_upperrt', 'larynx', 'the nose, mouth, pharynx and larynx', L9, 5, 'Upper Respiratory Tract'],
  ['w9_lowerrt', 'trachea', 'the trachea, lungs, bronchi and bronchioles', L9, 5, 'Lower Respiratory Tract'],
  ['w9_lowerrt', 'bronchi', 'the trachea, lungs, bronchi and bronchioles', L9, 5, 'Lower Respiratory Tract'],
  ['w9_lowerrt', 'lungs', 'the trachea, lungs, bronchi and bronchioles', L9, 5, 'Lower Respiratory Tract'],
  ['w9_nostrils', 'w9_nasalcavity', 'air enters the nasal cavity by passing through the nostrils', L9, 6, 'nostrils'],
  ['w9_voice', 'w9_vocalfold', 'movement of air past the vocal cords makes sound and speech', L9, 4, 'vocal cords'],
  ['w9_olfaction', 'w9_olfepi', 'airborne molecules drawn into the nasal cavity', L9, 4, 'Olfaction'],
  ['w9_phreg', 'w9_acidosis', 'imbalances of blood pH', L9, 4, 'Acidosis'],
  ['w9_resp_protect', 'w9_goblet', 'mucus traps dust, bacteria and viruses', L9, 30, 'Goblet'],
  ['w9_resp_protect', 'w9_ciliated', 'cilia move mucus upward', L9, 32, 'Ciliated'],
  ['w9_goblet', 'w9_ciliated', 'usually found among ciliated columnar epithelial cells', L9, 31, 'ciliated'],
  ['w9_ciliated', 'w9_mucosa', 'the mucosa is ciliated pseudostratified columnar epithelium', L9, 27, 'ciliated'],
  ['w9_surfactant', 'w9_type2', 'Type II cells secrete pulmonary surfactant', L9, 40, 'surfactant'],
  ['w9_macrophage', 'w9_alveolus', 'macrophages keep alveolar surfaces sterile', L9, 39, 'macrophages'],
  ['w9_inspiration', 'w9_diaphragm', 'the diaphragm contracts and moves downward', L9, 50, 'inhale'],
  ['w9_expiration', 'w9_diaphragm', 'the diaphragm relaxes and moves upward', L9, 50, 'exhale'],
];
