/*
 * Granular 3D targets: the structure sets a tap-to-identify item draws from,
 * the joint movements, and the layer-key -> GLB map.
 *
 * Split out of study-data.js in phase 2026-09-01. outputs/study-data.js is
 * the barrel every importer still uses; nothing imports this file directly
 * except its siblings.
 */

/* ------------------------------------------------------------------ *
 * Structure sets — granular 3D targets
 *
 * The bundled Z-Anatomy / BodyParts3D skeleton carries 277 individually
 * named meshes, including every carpal, every tarsal, the separate skull
 * bones and all 24 presacral vertebrae. `mesh` is the exact node name in
 * that file, minus the .l / .r side suffix, which the picker matches on
 * either side. These sets drive tap-to-identify with a blank test view.
 * ------------------------------------------------------------------ */

export const REVEAL_MODES = [
  { id: 'labelled', label: 'Teaching', hint: 'Everything named. Read it and build the picture.' },
  { id: 'guided', label: 'Guided', hint: 'A couple of anchors left in. Work out the rest from them.' },
  { id: 'blank', label: 'Test', hint: 'Nothing named. Identify every structure yourself.' },
];

/*
 * `model` names which bundled GLB a set's meshes live in:
 *   'skeleton'    z-anatomy-skeleton.glb   277 named meshes, bones only
 *   'organs'      ic-organlar.glb          120 named meshes, viscera
 *   'circulatory' dolasim.glb              676 named meshes, heart and vessels
 */
export const STRUCTURE_SETS = {
  carpals: {
    id: 'carpals', label: 'The eight carpal bones', subject: 'HSS2011', unit: 'hss.osteo',
    model: 'skeleton', view: 'upper_limb', paired: true,
    anchors: ['scaphoid', 'pisiform'],
    members: [
      { id: 'scaphoid', label: 'Scaphoid', mesh: 'Scaphoid bone', group: 'Proximal row', order: 1, note: 'Most lateral of the proximal row — the thumb side.' },
      { id: 'lunate', label: 'Lunate', mesh: 'Lunate bone', group: 'Proximal row', order: 2, note: 'Sits medial to the scaphoid.' },
      { id: 'triquetrum', label: 'Triquetrum', mesh: 'Triquetrum bone', group: 'Proximal row', order: 3 },
      { id: 'pisiform', label: 'Pisiform', mesh: 'Pisiform bone', group: 'Proximal row', order: 4, note: 'The pea-shaped sesamoid sitting on the triquetrum.' },
      { id: 'trapezium', label: 'Trapezium', mesh: 'Trapezium bone', group: 'Distal row', order: 5, note: 'Under the thumb — trapeziuM for thuMb.' },
      { id: 'trapezoid', label: 'Trapezoid', mesh: 'Trapezoid bone', group: 'Distal row', order: 6 },
      { id: 'capitate', label: 'Capitate', mesh: 'Capitate bone', group: 'Distal row', order: 7, note: 'The largest carpal.' },
      { id: 'hamate', label: 'Hamate', mesh: 'Hamate bone', group: 'Distal row', order: 8 },
    ],
    sourceRefs: [{ ref: 'hss.4.3', location: 'Slide "Carpal Bones" — proximal and distal row key' }, { ref: 'hss.m0.1718', location: 'L1 p45 right wrist (radiocarpal) joint' }],
  },
  tarsals: {
    id: 'tarsals', label: 'The seven tarsal bones', subject: 'HSS2011', unit: 'hss.osteo',
    model: 'skeleton', view: 'lower_limb', paired: true,
    anchors: ['talus', 'calcaneus'],
    members: [
      { id: 'talus', label: 'Talus', mesh: 'Talus', group: 'Proximal', order: 1, note: 'Sits on the calcaneus and takes the leg’s load into the foot.' },
      { id: 'calcaneus', label: 'Calcaneus', mesh: 'Calcaneus', group: 'Proximal', order: 2, note: 'The heel bone.' },
      { id: 'navicular', label: 'Navicular', mesh: 'Navicular bone', group: 'Intermediate', order: 3, note: 'Between the talus and the cuneiforms.' },
      { id: 'cuboid', label: 'Cuboid', mesh: 'Cuboid bone', group: 'Lateral', order: 4 },
      { id: 'medial-cuneiform', label: 'Medial cuneiform', mesh: 'Medial cuneiform bone', group: 'Distal', order: 5 },
      { id: 'intermediate-cuneiform', label: 'Intermediate cuneiform', mesh: 'Intermediate cuneiform bone', group: 'Distal', order: 6 },
      { id: 'lateral-cuneiform', label: 'Lateral cuneiform', mesh: 'Lateral cuneiform bone', group: 'Distal', order: 7 },
    ],
    sourceRefs: [{ ref: 'hss.4.3', location: 'Slide "Ankle & Foot" — tarsal bones' }],
  },
  skullBones: {
    id: 'skullBones', label: 'Bones of the skull', subject: 'HSS2011', unit: 'hss.osteo',
    model: 'skeleton', view: 'skull', paired: false,
    anchors: ['frontal', 'mandible'],
    members: [
      { id: 'frontal', label: 'Frontal bone', mesh: 'Frontal bone', group: 'Cranial', order: 1 },
      { id: 'parietal', label: 'Parietal bone', mesh: 'Parietal bone', group: 'Cranial', order: 2, note: 'Paired — meets its partner at the sagittal suture.' },
      { id: 'temporal', label: 'Temporal bone', mesh: 'Temporal bone', group: 'Cranial', order: 3, note: 'Meets the parietal at the squamous suture.' },
      { id: 'occipital', label: 'Occipital bone', mesh: 'Occipital bone', group: 'Cranial', order: 4, note: 'Meets the parietals at the lambdoid suture.' },
      { id: 'sphenoid', label: 'Sphenoid bone', mesh: 'Sphenoid bone', group: 'Cranial', order: 5 },
      { id: 'ethmoid', label: 'Ethmoid bone', mesh: 'Ethmoid bone', group: 'Cranial', order: 6 },
      { id: 'maxilla', label: 'Maxilla', mesh: 'Maxilla', group: 'Facial', order: 7 },
      { id: 'zygomatic', label: 'Zygomatic bone', mesh: 'Zygomatic bone', group: 'Facial', order: 8 },
      { id: 'nasal', label: 'Nasal bone', mesh: 'Nasal bone', group: 'Facial', order: 9 },
      { id: 'lacrimal', label: 'Lacrimal bone', mesh: 'Lacrimal bone', group: 'Facial', order: 10 },
      { id: 'vomer', label: 'Vomer', mesh: 'Vomer', group: 'Facial', order: 11 },
      { id: 'mandible', label: 'Mandible', mesh: 'Mandible', group: 'Facial', order: 12, note: 'The only movable bone in the skull.' },
    ],
    sourceRefs: [{ ref: 'hss.4.2', location: 'Head and neck — bones of the skull' }, { ref: 'hss.revans', location: 'More exercises Module 4, labels A4–A12' }],
  },
  vertebralRegions: {
    id: 'vertebralRegions', label: 'Regions of the vertebral column', subject: 'HSS2011', unit: 'hss.osteo',
    model: 'skeleton', view: 'spine', paired: false,
    anchors: ['atlas'],
    members: [
      { id: 'atlas', label: 'Atlas (C1)', mesh: 'Atlas (C1)', group: 'Cervical', order: 1, note: 'Carries the skull; the nod happens here.' },
      { id: 'axis', label: 'Axis (C2)', mesh: 'Axis (C2)', group: 'Cervical', order: 2, note: 'Its dens is the pivot the head shakes on.' },
      { id: 'c-typical', label: 'Typical cervical vertebra (C3–C7)', mesh: 'Vertebra C5', group: 'Cervical', order: 3, note: 'Seven cervical vertebrae in all.' },
      { id: 't-typical', label: 'Typical thoracic vertebra (T1–T12)', mesh: 'Vertebra T6', group: 'Thoracic', order: 4, note: 'Twelve of them, one per rib pair.' },
      { id: 'l-typical', label: 'Typical lumbar vertebra (L1–L5)', mesh: 'Vertebra L3', group: 'Lumbar', order: 5, note: 'Five, with the largest bodies.' },
      { id: 'sacrum', label: 'Sacrum', mesh: 'Sacrum', group: 'Sacral', order: 6, note: 'S1–S5 fused.' },
      { id: 'coccyx', label: 'Coccyx', mesh: 'Coccyx', group: 'Coccygeal', order: 7, note: 'Co1–Co4 fused.' },
    ],
    sourceRefs: [{ ref: 'hss.m0.1718', location: 'L1 p15 vertebral column; p21 general structure; p28–29 cervical vertebrae' }],
  },
  heartChambers: {
    id: 'heartChambers', label: 'Heart chambers and valves', subject: 'ABCT2326', unit: 'phys.cvs',
    model: 'circulatory', view: 'thorax', paired: false,
    anchors: ['ra', 'lv'],
    members: [
      { id: 'ra', label: 'Right atrium', mesh: 'Right atrium', group: 'Chambers', order: 1, note: 'Receives from the venae cavae.' },
      { id: 'rv', label: 'Right ventricle', mesh: 'Right ventricle', group: 'Chambers', order: 2, note: 'Thinner, pouch-shaped wall; pumps to the lungs.' },
      { id: 'la', label: 'Left atrium', mesh: 'Left atrium', group: 'Chambers', order: 3, note: 'Receives the pulmonary veins.' },
      { id: 'lv', label: 'Left ventricle', mesh: 'Left ventricle', group: 'Chambers', order: 4, note: 'Round and thick-walled; pumps into the aorta.' },
      { id: 'tricuspid', label: 'Right AV (tricuspid) valve', mesh: 'Septal leaflet of right atrioventricular valve', group: 'Valves', order: 5, note: 'Three cusps; closes when the right ventricle contracts.' },
      { id: 'mitral', label: 'Left AV (bicuspid) valve', mesh: 'Posterior leaflet of left atrioventricular valve', group: 'Valves', order: 6, note: 'Two cusps — bicuspid, or mitral.' },
      { id: 'pulmvalve', label: 'Pulmonary valve', mesh: 'Anterior semilunar leaflet of pulmonary valve', group: 'Valves', order: 7, note: 'Semilunar; guards the exit to the pulmonary trunk.' },
      { id: 'papillary', label: 'Papillary muscle', mesh: 'Anterior papillary muscle of right ventricle', group: 'Valve apparatus', order: 8, note: 'Holds the AV valve through the chordae tendineae.' },
    ],
    sourceRefs: [{ ref: 'phys.2', location: 'Slides 28–39 heart chambers, AV valves, semilunar valves, functions of the valves' }, { ref: 'hss.1.2', location: 'Cardiopulmonary system and associated structures' }],
    modelGap: 'The aortic valve leaflets are not separately named in this model, and neither is the conducting system.',
  },
  greatVessels: {
    id: 'greatVessels', label: 'Great vessels of the heart', subject: 'ABCT2326', unit: 'phys.cvs',
    model: 'circulatory', view: 'thorax', paired: false,
    anchors: ['aorticarch'],
    members: [
      { id: 'svc', label: 'Superior vena cava', mesh: 'Superior vena cava', group: 'Venous inflow', order: 1 },
      { id: 'ivc', label: 'Inferior vena cava', mesh: 'Inferior vena cava (thoracic part)', group: 'Venous inflow', order: 2 },
      { id: 'pulmtrunk', label: 'Pulmonary trunk', mesh: 'Pulmonary trunk', group: 'Pulmonary circuit', order: 3, note: 'Leaves the right ventricle carrying deoxygenated blood.' },
      { id: 'rpa', label: 'Right pulmonary artery', mesh: 'Right pulmonary artery', group: 'Pulmonary circuit', order: 4 },
      { id: 'lpa', label: 'Left pulmonary artery', mesh: 'Left pulmonary artery', group: 'Pulmonary circuit', order: 5 },
      { id: 'aorticarch', label: 'Aortic arch', mesh: 'Aortic arch', group: 'Systemic outflow', order: 6, note: 'Lies in the superior mediastinum.' },
      { id: 'coronarysinus', label: 'Coronary sinus', mesh: 'Coronary sinus', group: 'Coronary circulation', order: 7 },
      { id: 'rca', label: 'Right coronary artery', mesh: 'Right coronary artery', group: 'Coronary circulation', order: 8 },
    ],
    sourceRefs: [{ ref: 'phys.2', location: 'Slides 18–20 pulmonary and systemic circulations; Figure 20-1' }, { ref: 'hss.revans', location: 'HSS2011 Module 1.2 and 1.3 answers' }],
  },
  airwayTree: {
    id: 'airwayTree', label: 'The airway and the lung lobes', subject: 'ABCT2326', unit: 'phys.resp',
    model: 'organs', view: 'thorax', paired: false,
    anchors: ['trachea'],
    members: [
      { id: 'trachea', label: 'Trachea', mesh: 'Trachea', group: 'Conducting — proximal', order: 1 },
      { id: 'rmain', label: 'Right main bronchus', mesh: 'Right main bronchus', group: 'Conducting — proximal', order: 2 },
      { id: 'lmain', label: 'Left main bronchus', mesh: 'Left main bronchus', group: 'Conducting — proximal', order: 3 },
      { id: 'rsuplobar', label: 'Right superior lobar bronchus', mesh: 'Right superior lobar bronchus', group: 'Conducting — lobar', order: 4 },
      { id: 'rmidlobar', label: 'Right middle lobar bronchus', mesh: 'Middle lobar bronchus', group: 'Conducting — lobar', order: 5 },
      { id: 'rinflobar', label: 'Right inferior lobar bronchus', mesh: 'Right inferior lobar bronchus', group: 'Conducting — lobar', order: 6 },
      { id: 'rsuplobe', label: 'Superior lobe of right lung', mesh: 'Superior lobe of right lung', group: 'Right lung — three lobes', order: 7 },
      { id: 'rmidlobe', label: 'Middle lobe of right lung', mesh: 'Middle lobe of right lung', group: 'Right lung — three lobes', order: 8 },
      { id: 'rinflobe', label: 'Inferior lobe of right lung', mesh: 'Inferior lobe of right lung', group: 'Right lung — three lobes', order: 9 },
      { id: 'lsuplobe', label: 'Superior lobe of left lung', mesh: 'Superior lobe of left lung', group: 'Left lung — two lobes', order: 10 },
      { id: 'linflobe', label: 'Inferior lobe of left lung', mesh: 'Inferior lobe of left lung', group: 'Left lung — two lobes', order: 11 },
      { id: 'pleura', label: 'Pleura', mesh: 'Pleura', group: 'Covering', order: 12, note: 'Visceral pleura covers the lung; parietal lines the cavity.' },
    ],
    sourceRefs: [{ ref: 'phys.3', location: 'Slides 5–7 organisation of the respiratory system, the respiratory tract' }, { ref: 'hss.1.1', location: 'Cardiovascular system and lungs — pleura and lung surfaces' }],
  },
  urinaryTract: {
    id: 'urinaryTract', label: 'The urinary tract', subject: 'ABCT2326', unit: 'phys.renal',
    model: 'organs', view: 'abdomen', paired: false,
    anchors: ['kidney'],
    members: [
      { id: 'suprarenal', label: 'Suprarenal gland', mesh: 'Suprarenal gland', group: 'Related', order: 1, note: 'Sits on the kidney but is endocrine, not urinary.' },
      { id: 'kidney', label: 'Kidney', mesh: 'Kidney', group: 'Urine formation', order: 2, note: 'Holds over a million nephrons.' },
      { id: 'renalpelvis', label: 'Renal pelvis', mesh: 'Renal pelvis', group: 'Drainage', order: 3, note: 'Minor calyces unite into a major calyx, then the pelvis.' },
      { id: 'ureter', label: 'Ureter', mesh: 'Ureter', group: 'Drainage', order: 4, note: 'Enters the posterior wall of the bladder.' },
      { id: 'bladder', label: 'Urinary bladder', mesh: 'Urinary bladder', group: 'Storage', order: 5, note: 'Its muscular wall is the detrusor.' },
      { id: 'urethra', label: 'Urethra', mesh: 'Urethra', group: 'Outflow', order: 6 },
    ],
    sourceRefs: [{ ref: 'phys.5', location: 'Slides 4–5 structure of the urinary system and the kidney' }, { ref: 'hss.3.2', location: 'Urogenital system lecture' }],
  },
  digestiveTract: {
    id: 'digestiveTract', label: 'The digestive tract and its accessory organs', subject: 'ABCT2326', unit: 'phys.dig',
    model: 'organs', view: 'abdomen', paired: false,
    anchors: ['stomach'],
    members: [
      { id: 'oesophagus', label: 'Oesophagus', mesh: 'Oesophagus', group: 'Tract — upper', order: 1, note: 'Pierces the diaphragm at T10.' },
      { id: 'stomach', label: 'Stomach', mesh: 'Stomach', group: 'Tract — upper', order: 2, note: 'Entered at the cardiac orifice; pylorus lies at L1.' },
      { id: 'duodenum', label: 'Duodenum', mesh: 'Duodenum', group: 'Tract — small intestine', order: 3 },
      { id: 'jejunum', label: 'Jejunum', mesh: 'Jejunum', group: 'Tract — small intestine', order: 4, note: 'Begins at the duodenojejunal junction.' },
      { id: 'ascending', label: 'Ascending colon', mesh: 'Ascending colon', group: 'Tract — large intestine', order: 5 },
      { id: 'transverse', label: 'Transverse colon', mesh: 'Transverse colon', group: 'Tract — large intestine', order: 6 },
      { id: 'descending', label: 'Descending colon', mesh: 'Descending colon', group: 'Tract — large intestine', order: 7 },
      { id: 'sigmoid', label: 'Sigmoid colon', mesh: 'Sigmoid colon', group: 'Tract — large intestine', order: 8 },
      { id: 'appendix', label: 'Vermiform appendix', mesh: 'Vermiform appendix', group: 'Tract — large intestine', order: 9 },
      { id: 'liver', label: 'Liver', mesh: 'Liver', group: 'Accessory', order: 10, note: 'Secretes bile; receives gut blood by the hepatic portal vein.' },
      { id: 'gallbladder', label: 'Gallbladder', mesh: 'Gallbladder', group: 'Accessory', order: 11, note: 'Stores and concentrates bile.' },
      { id: 'pancreas', label: 'Pancreas', mesh: 'Pancreas', group: 'Accessory', order: 12, note: 'Exocrine buffers and enzymes; endocrine hormones.' },
    ],
    sourceRefs: [{ ref: 'phys.4', location: 'Slides 2–3 major organs of the digestive tract and accessory organs' }, { ref: 'hss.3.1', location: 'Digestive system lecture' }],
  },
  rotatorCuff: {
    id: 'rotatorCuff', label: 'Rotator cuff and the abduction muscles', subject: 'HSS2011', unit: 'hss.joints',
    model: 'muscle', view: 'upper_limb', paired: true,
    anchors: ['supraspinatus'],
    members: [
      { id: 'supraspinatus', label: 'Supraspinatus', mesh: 'Supraspinatus muscle', group: 'Rotator cuff', order: 1, note: 'Initiates the first 15 degrees of abduction. Suprascapular nerve.' },
      { id: 'infraspinatus', label: 'Infraspinatus', mesh: 'Infraspinatus muscle', group: 'Rotator cuff', order: 2, note: 'Lateral rotation. Suprascapular nerve.' },
      { id: 'teres-minor', label: 'Teres minor', mesh: 'Teres minor muscle', group: 'Rotator cuff', order: 3, note: 'Lateral rotation. Axillary nerve.' },
      { id: 'subscapularis', label: 'Subscapularis', mesh: 'Subscapularis muscle', group: 'Rotator cuff', order: 4, note: 'The only one in front, and the only medial rotator. Subscapular nerve.' },
      { id: 'deltoid', label: 'Deltoid (acromial part)', mesh: 'Acromial part of deltoid muscle', group: 'Abduction sequence', order: 5, note: 'The powerful abductor, taking over from supraspinatus. Axillary nerve.' },
      { id: 'trapezius', label: 'Trapezius (transverse part)', mesh: 'Transverse part of trapezius muscle', group: 'Abduction sequence', order: 6, note: 'Upward rotation of the scapula, the last stage of full abduction.' },
      { id: 'latissimus', label: 'Latissimus dorsi', mesh: 'Latissimus dorsi muscle', group: 'Shoulder girdle', order: 7, note: 'Adduction and medial rotation. Thoracodorsal nerve.' },
      { id: 'pec-major', label: 'Pectoralis major (sternocostal head)', mesh: 'Sternocostal head of pectoralis major muscle', group: 'Shoulder girdle', order: 8, note: 'Flexion, adduction and medial rotation. Pectoral nerve.' },
    ],
    sourceRefs: [{ ref: 'hss.4.3', location: 'Slides 16–26 shoulder girdle muscles, rotator cuff, muscles involved in full abduction of the arm' }, { ref: 'hss.revans', location: 'Module 4.3, Fill-in-blanks 3' }],
    modelGap: 'Deltoid, pectoralis major and trapezius are split into named parts in this model, so one representative part is used for each.',
  },
  cranialNerves: {
    id: 'cranialNerves', label: 'Cranial nerves', subject: 'HSS2011', unit: 'hss.m2',
    model: 'nervous', view: 'skull', paired: true,
    anchors: ['trigeminal'],
    members: [
      { id: 'olfactory', label: 'Olfactory nerve (I)', mesh: 'Olfactory nerve (I)', group: 'Special sense', order: 1 },
      { id: 'optic', label: 'Optic nerve (II)', mesh: 'Optic nerve (II)', group: 'Special sense', order: 2 },
      { id: 'trochlear', label: 'Trochlear nerve (IV)', mesh: 'Trochlear nerve (IV)', group: 'Eye movement', order: 3 },
      { id: 'abducens', label: 'Abducens nerve (VI)', mesh: 'Abducens nerve (VI)', group: 'Eye movement', order: 4 },
      { id: 'trigeminal', label: 'Trigeminal nerve (V)', mesh: 'Trigeminal nerve (V)', group: 'Face', order: 5, note: 'Controls the muscles of mastication.' },
      { id: 'facial', label: 'Facial nerve (VII)', mesh: 'Facial nerve (VII)', group: 'Face', order: 6, note: 'Muscles of facial expression, including frontalis.' },
      { id: 'vestibulocochlear', label: 'Vestibulocochlear nerve (VIII)', mesh: 'Vestibulocochlear nerve (VIII)', group: 'Special sense', order: 7 },
      { id: 'glossopharyngeal', label: 'Glossopharyngeal nerve (IX)', mesh: 'Glossopharyngeal nerve (IX)', group: 'Pharynx & viscera', order: 8, note: 'Carries carotid body chemoreceptor input.' },
      { id: 'vagus', label: 'Vagus nerve (X)', mesh: 'Vagus nerve (X)', group: 'Pharynx & viscera', order: 9, note: 'The longest cranial nerve. Carries aortic body chemoreceptor input.' },
      { id: 'hypoglossal', label: 'Hypoglossal nerve (XII)', mesh: 'Hypoglossal nerve (XII)', group: 'Tongue', order: 10 },
    ],
    sourceRefs: [{ ref: 'hss.vocab', location: 'Glossary — the cranial nerves listed as examinable terms' }, { ref: 'hss.revans', location: 'Module 2.3 Fill-in-blanks 1 and 4; Module 4.2 Fill-in-blanks 1' }, { ref: 'phys.3', location: 'Slides 68–69 glossopharyngeal and vagus chemoreceptor input' }],
    modelGap: 'Oculomotor (III) and accessory (XI) are in the model but are not named in the HSS2011 glossary, so they are left out of this set rather than added on assumption.',
  },
  brainAndCsf: {
    id: 'brainAndCsf', label: 'Brainstem, ventricles and the spinal cord', subject: 'HSS2011', unit: 'hss.m2',
    model: 'nervous', view: 'skull', paired: false,
    anchors: ['medulla'],
    members: [
      { id: 'midbrain', label: 'Midbrain', mesh: 'Midbrain', group: 'Brainstem', order: 1 },
      { id: 'pons', label: 'Pons', mesh: 'Pons', group: 'Brainstem', order: 2 },
      { id: 'medulla', label: 'Medulla oblongata', mesh: 'Medulla oblongata', group: 'Brainstem', order: 3, note: 'Its ventrolateral surface carries the central chemoreceptors.' },
      { id: 'lateralvent', label: 'Lateral ventricle', mesh: 'Lateral ventricle', group: 'Ventricular system', order: 4 },
      { id: 'thirdvent', label: 'Third ventricle', mesh: 'Third ventricle', group: 'Ventricular system', order: 5, note: 'Reached from the lateral ventricle through the interventricular foramen.' },
      { id: 'aqueduct', label: 'Aqueduct of midbrain', mesh: 'Aqueduct of midbrain', group: 'Ventricular system', order: 6 },
      { id: 'fourthvent', label: 'Fourth ventricle', mesh: 'Fourth ventricle', group: 'Ventricular system', order: 7 },
      { id: 'corpuscallosum', label: 'Corpus callosum', mesh: 'Corpus callosum', group: 'Forebrain', order: 8, note: 'The principal commissural tract between the hemispheres.' },
      { id: 'thalamus', label: 'Thalamus', mesh: 'Thalamus', group: 'Forebrain', order: 9, note: 'Forms the walls of the diencephalon around the third ventricle.' },
      { id: 'spinaldura', label: 'Spinal dura', mesh: 'Spinal dura', group: 'Spinal cord', order: 10 },
      { id: 'caudaequina', label: 'Cauda equina', mesh: 'Cauda equina', group: 'Spinal cord', order: 11, note: 'Below L1–L2, where the cord itself has ended.' },
    ],
    sourceRefs: [{ ref: 'hss.2.3', location: 'Neuroanatomy lecture' }, { ref: 'hss.revans', location: 'Module 2.1 and 2.3 answers' }],
  },
  kneeJoint: {
    id: 'kneeJoint', label: 'Inside the knee — a synovial joint', subject: 'HSS2011', unit: 'hss.joints',
    model: 'joint', view: 'lower_limb', paired: true,
    anchors: ['capsule'],
    members: [
      { id: 'capsule', label: 'Articular capsule', mesh: 'Articular capsule of knee joint', group: 'Capsule', order: 1, note: 'The dense connective tissue cuff; its thickenings are the joint ligaments.' },
      { id: 'acl', label: 'Anterior cruciate ligament', mesh: 'Anterior cruciate ligament', group: 'Ligaments', order: 2, note: 'A ligament binds bone to bone.' },
      { id: 'pcl', label: 'Posterior cruciate ligament', mesh: 'Posterior cruciate ligament', group: 'Ligaments', order: 3 },
      { id: 'medmen', label: 'Medial meniscus', mesh: 'Medial meniscus', group: 'Menisci', order: 4, note: 'Acts as a shock absorber, like the intervertebral disc.' },
      { id: 'latmen', label: 'Lateral meniscus', mesh: 'Lateral meniscus', group: 'Menisci', order: 5 },
      { id: 'hipcapsule', label: 'Articular capsule of hip joint', mesh: 'Articular capsule of hip joint', group: 'Compare', order: 6, note: 'The hip capsule, for comparison — deep socket, far more stable.' },
    ],
    sourceRefs: [{ ref: 'hss.4.1', location: 'Slides 37–42 synovial joints — articular cartilage, fibrous capsule, ligaments' }, { ref: 'hss.m0.1718', location: 'L1 p26 intervertebral disc as shock absorber; p56 right knee joint' }],
    modelGap: 'The synovial membrane and joint cavity are not separate meshes, so the layered structure still comes from the lecture diagram.',
  },
};

export function structureSet(id) { return STRUCTURE_SETS[id] || null; }

/* ------------------------------------------------------------------ *
 * Joint movements
 *
 * The skeleton GLB has no skin and no animation track — it is 277 rigid
 * meshes. That is not a limitation to work around: a bone genuinely is a
 * rigid body rotating about a joint axis, so driving these procedurally
 * is the anatomically honest way to show them.
 *
 * Pivot and axis are resolved at runtime from the bounding boxes of named
 * meshes rather than hard-coded, because the model is rescaled and
 * recentred on import. `at` picks an end of a mesh along the model's
 * vertical: 'proximal' is the higher end for a limb hanging at the side.
 * ------------------------------------------------------------------ */

export const JOINT_MOVEMENTS = {
  supination: {
    id: 'supination', label: 'Supination and pronation', subject: 'HSS2011', unit: 'hss.joints',
    model: 'skeleton', side: 'right',
    joint: 'Superior and inferior radioulnar joints',
    summary: 'The radius rotates against the ulna, crossing over it. The hand comes along with the forearm, which is why turning a doorknob feels like the wrist moving when it is not.',
    moves: ['Radius', 'Scaphoid bone', 'Lunate bone', 'Triquetrum bone', 'Pisiform bone', 'Trapezium bone', 'Trapezoid bone', 'Capitate bone', 'Hamate bone',
      'First metacarpal bone', 'Second metacarpal bone', 'Third metacarpal bone', 'Fourth metacarpal bone', 'Fifth metacarpal bone'],
    fixed: ['Ulna', 'Humerus'],
    pivot: { mesh: 'Radius', at: 'proximal' },
    axis: { from: { mesh: 'Radius', at: 'proximal' }, to: { mesh: 'Ulna', at: 'distal' } },
    range: [-80, 80],
    labels: { min: 'Pronated', mid: 'Neutral', max: 'Supinated' },
    sourceRefs: [{ ref: 'hss.m0.1718', location: 'L1 p44 supination and pronation of the forearm' }, { ref: 'hss.revans', location: 'Module 0, Fill-in-blanks 2' }],
  },
  elbowFlexion: {
    id: 'elbowFlexion', label: 'Elbow flexion and extension', subject: 'HSS2011', unit: 'hss.joints',
    model: 'skeleton', side: 'right',
    joint: 'Elbow joint',
    summary: 'A hinge joint: movement in one plane only. The humeral trochlea sits in the trochlear notch of the ulna, and the whole forearm swings as one.',
    moves: ['Radius', 'Ulna', 'Scaphoid bone', 'Lunate bone', 'Triquetrum bone', 'Pisiform bone', 'Trapezium bone', 'Trapezoid bone', 'Capitate bone', 'Hamate bone',
      'First metacarpal bone', 'Second metacarpal bone', 'Third metacarpal bone', 'Fourth metacarpal bone', 'Fifth metacarpal bone'],
    fixed: ['Humerus', 'Scapula'],
    pivot: { mesh: 'Ulna', at: 'proximal' },
    axis: { vector: [1, 0, 0] },
    range: [0, 140],
    labels: { min: 'Extended', mid: 'Half flexed', max: 'Flexed' },
    sourceRefs: [{ ref: 'hss.m0.1718', location: 'L1 p43 flexion and extension of the forearm' }, { ref: 'hss.4.3', location: 'Slide "Elbow Joint (Anterior View)", Fig. 8-4c' }],
  },
  shoulderAbduction: {
    id: 'shoulderAbduction', label: 'Abduction of the arm', subject: 'HSS2011', unit: 'hss.joints',
    model: 'skeleton', side: 'right',
    joint: 'Glenohumeral joint',
    summary: 'A ball-and-socket joint moving in all three planes. Full abduction is a four-muscle sequence, not one muscle: supraspinatus starts it, deltoid drives it, infraspinatus and teres minor rotate laterally, trapezius rotates the scapula upward.',
    moves: ['Humerus', 'Radius', 'Ulna', 'Scaphoid bone', 'Lunate bone', 'Triquetrum bone', 'Pisiform bone', 'Trapezium bone', 'Trapezoid bone', 'Capitate bone', 'Hamate bone',
      'First metacarpal bone', 'Second metacarpal bone', 'Third metacarpal bone', 'Fourth metacarpal bone', 'Fifth metacarpal bone'],
    fixed: ['Scapula', 'Clavicle'],
    pivot: { mesh: 'Humerus', at: 'proximal' },
    axis: { vector: [0, 0, 1] },
    range: [0, 90],
    stages: [
      { at: 15, note: 'Supraspinatus initiates the first 15 degrees.' },
      { at: 60, note: 'Deltoid drives the bulk of abduction.' },
      { at: 90, note: 'Beyond this the scapula must rotate upward — trapezius.' },
    ],
    labels: { min: 'At the side', mid: 'Mid abduction', max: '90 degrees' },
    sourceRefs: [{ ref: 'hss.m0.1718', location: 'L1 p40 movement of the arm' }, { ref: 'hss.4.3', location: 'Slide "Muscles Involved in Full Abduction of the Arm"' }],
  },
  thumbOpposition: {
    id: 'thumbOpposition', label: 'Opposition of the thumb', subject: 'HSS2011', unit: 'hss.joints',
    model: 'skeleton', side: 'right',
    joint: 'Carpo-metacarpal joint of the thumb',
    summary: 'A saddle joint — the only one that can oppose. Opposition is tip-to-tip contact of the thumb with any finger; its opposite is reposition. The palm, not the middle finger, is the reference plane for thumb movement.',
    moves: ['First metacarpal bone', 'Proximal phalanx of first finger of hand', 'Distal phalanx of first finger of hand'],
    fixed: ['Trapezium bone', 'Second metacarpal bone', 'Third metacarpal bone'],
    pivot: { mesh: 'First metacarpal bone', at: 'proximal' },
    axis: { vector: [0.4, 0.5, 0.75] },
    range: [0, 55],
    labels: { min: 'Reposition', mid: 'Mid range', max: 'Opposition' },
    sourceRefs: [{ ref: 'hss.m0.1718', location: 'L1 p52 opposition of thumb; p50–51 thumb movements at the carpo-metacarpal joint' }, { ref: 'hss.revans', location: 'Module 0, Fill-in-blanks 1 and 5' }],
  },
};

export function jointMovement(id) { return JOINT_MOVEMENTS[id] || null; }

/* Which bundled GLB a structure set needs. */
export const STRUCTURE_MODELS = {
  skeleton: { file: './assets/z-anatomy-skeleton.glb', label: 'Skeleton', meshes: 277 },
  organs: { file: './assets/ic-organlar.glb', label: 'Internal organs', meshes: 120 },
  circulatory: { file: './assets/dolasim.glb', label: 'Circulatory system', meshes: 676 },
  nervous: { file: './assets/sinir.glb', label: 'Nervous system', meshes: 582 },
  muscle: { file: './assets/kas.glb', label: 'Muscular system', meshes: 683 },
  joint: { file: './assets/eklem.glb', label: 'Ligaments and joints', meshes: 413 },
  lymphatic: { file: './assets/lenf.glb', label: 'Lymphatic system', meshes: 163 },
};
