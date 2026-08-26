/*
 * Osteology Studio — anatomy data layer
 *
 * UI code should consume these records, never embed anatomy copy directly.
 * modelObjectIds is intentionally an adapter field: a future GLB/OBJ loader can
 * map its node names to these canonical ids without changing quiz logic.
 */
export const REGIONS = [
  { id: 'skull', label: 'Skull' },
  { id: 'spine', label: 'Vertebral column' },
  { id: 'thorax', label: 'Thoracic cage' },
  { id: 'upper_limb', label: 'Upper limb' },
  { id: 'pelvis', label: 'Pelvis' },
  { id: 'lower_limb', label: 'Lower limb' },
];

export const ANATOMY_DATABASE = [
  { id:'cranium', canonicalName:'Cranium', aliases:['skull vault'], region:'skull', side:'bilateral', category:'major bone', landmarks:['frontal bone','parietal bones','occipital bone'], articulations:['facial skeleton','first cervical vertebra'], radiographyImportance:'AP and lateral skull orientation; protects the brain.', difficulty:1, modelObjectIds:['cranium'], commonConfusions:['mandible'] },
  { id:'mandible', canonicalName:'Mandible', aliases:['lower jaw','jawbone'], region:'skull', side:'bilateral', category:'major bone', landmarks:['body','ramus','condylar process'], articulations:['temporal bone'], radiographyImportance:'Panoramic, lateral oblique and PA mandible work.', difficulty:1, modelObjectIds:['mandible'], commonConfusions:['maxilla'] },
  { id:'cervical', canonicalName:'Cervical vertebrae', aliases:['neck vertebrae','C1-C7'], region:'spine', side:'bilateral', category:'vertebrae', landmarks:['vertebral foramen','spinous process'], articulations:['skull','thoracic vertebrae'], radiographyImportance:'AP, lateral and odontoid cervical spine orientation.', difficulty:2, modelObjectIds:['cervical-1','cervical-2','cervical-3','cervical-4','cervical-5','cervical-6','cervical-7'], commonConfusions:['thoracic vertebrae'] },
  { id:'thoracic', canonicalName:'Thoracic vertebrae', aliases:['mid-back vertebrae','T1-T12'], region:'spine', side:'bilateral', category:'vertebrae', landmarks:['transverse processes','costal facets'], articulations:['ribs','cervical and lumbar vertebrae'], radiographyImportance:'Thoracic spine projections and rib articulation.', difficulty:2, modelObjectIds:['thoracic-1','thoracic-2','thoracic-3','thoracic-4','thoracic-5','thoracic-6','thoracic-7','thoracic-8','thoracic-9','thoracic-10','thoracic-11','thoracic-12'], commonConfusions:['lumbar vertebrae'] },
  { id:'lumbar', canonicalName:'Lumbar vertebrae', aliases:['lower-back vertebrae','L1-L5'], region:'spine', side:'bilateral', category:'vertebrae', landmarks:['large body','short broad spinous process'], articulations:['thoracic vertebrae','sacrum'], radiographyImportance:'AP and lateral lumbar spine; weight-bearing anatomy.', difficulty:2, modelObjectIds:['lumbar-1','lumbar-2','lumbar-3','lumbar-4','lumbar-5'], commonConfusions:['thoracic vertebrae'] },
  { id:'sacrum', canonicalName:'Sacrum', aliases:['sacral bone'], region:'spine', side:'bilateral', category:'major bone', landmarks:['sacral promontory','sacral foramina'], articulations:['ilium','coccyx','L5'], radiographyImportance:'AP and lateral sacrum/coccyx orientation.', difficulty:2, modelObjectIds:['sacrum'], commonConfusions:['coccyx'] },
  { id:'coccyx', canonicalName:'Coccyx', aliases:['tailbone'], region:'spine', side:'bilateral', category:'major bone', landmarks:['coccygeal segments'], articulations:['sacrum'], radiographyImportance:'Lateral sacrum/coccyx positioning.', difficulty:3, modelObjectIds:['coccyx'], commonConfusions:['sacrum'] },
  { id:'sternum', canonicalName:'Sternum', aliases:['breastbone'], region:'thorax', side:'bilateral', category:'major bone', landmarks:['manubrium','body','xiphoid process'], articulations:['clavicles','costal cartilages'], radiographyImportance:'Lateral sternum and chest anatomy orientation.', difficulty:1, modelObjectIds:['sternum'], commonConfusions:['clavicle'] },
  { id:'ribs', canonicalName:'Ribs', aliases:['costae','rib cage'], region:'thorax', side:'bilateral', category:'major bone', landmarks:['head','neck','tubercle','costal groove'], articulations:['thoracic vertebrae','sternum via cartilage'], radiographyImportance:'AP/PA, oblique and lateral rib series.', difficulty:1, modelObjectIds:['rib-left-1','rib-left-2','rib-left-3','rib-left-4','rib-left-5','rib-left-6','rib-left-7','rib-left-8','rib-left-9','rib-left-10','rib-left-11','rib-left-12','rib-right-1','rib-right-2','rib-right-3','rib-right-4','rib-right-5','rib-right-6','rib-right-7','rib-right-8','rib-right-9','rib-right-10','rib-right-11','rib-right-12'], commonConfusions:['clavicle'] },
  { id:'clavicle', canonicalName:'Clavicle', aliases:['collarbone'], region:'upper_limb', side:'paired', category:'girdle', landmarks:['sternal end','acromial end','conoid tubercle'], articulations:['sternum','scapula'], radiographyImportance:'AP clavicle and AC joint positioning.', difficulty:1, modelObjectIds:['clavicle-left','clavicle-right'], commonConfusions:['scapula'] },
  { id:'scapula', canonicalName:'Scapula', aliases:['shoulder blade'], region:'upper_limb', side:'paired', category:'girdle', landmarks:['spine','acromion','coracoid process','glenoid cavity'], articulations:['clavicle','humerus'], radiographyImportance:'AP scapula and lateral/Y-view orientation.', difficulty:2, modelObjectIds:['scapula-left','scapula-right'], commonConfusions:['clavicle','humerus'] },
  { id:'humerus', canonicalName:'Humerus', aliases:['upper arm bone'], region:'upper_limb', side:'paired', category:'long bone', landmarks:['head','greater tubercle','trochlea','capitulum'], articulations:['scapula','radius','ulna'], radiographyImportance:'AP/lateral humerus; elbow landmarks.', difficulty:2, modelObjectIds:['humerus-left','humerus-right'], commonConfusions:['femur'] },
  { id:'radius', canonicalName:'Radius', aliases:['thumb-side forearm bone'], region:'upper_limb', side:'paired', category:'long bone', landmarks:['head','neck','radial tuberosity','styloid process'], articulations:['humerus','ulna','wrist'], radiographyImportance:'AP/lateral forearm and wrist; thumb-side landmark.', difficulty:2, modelObjectIds:['radius-left','radius-right'], commonConfusions:['ulna'] },
  { id:'ulna', canonicalName:'Ulna', aliases:['pinky-side forearm bone'], region:'upper_limb', side:'paired', category:'long bone', landmarks:['olecranon','trochlear notch','ulnar styloid'], articulations:['humerus','radius'], radiographyImportance:'AP/lateral elbow and forearm; olecranon landmark.', difficulty:2, modelObjectIds:['ulna-left','ulna-right'], commonConfusions:['radius'] },
  { id:'hand', canonicalName:'Hand bones', aliases:['carpals','metacarpals','phalanges'], region:'upper_limb', side:'paired', category:'distal skeleton', landmarks:['carpal rows','metacarpals','proximal and distal phalanges'], articulations:['radius','ulna'], radiographyImportance:'PA, oblique and lateral hand/wrist projections.', difficulty:3, modelObjectIds:['hand-left','hand-right'], commonConfusions:['foot'] },
  { id:'pelvis', canonicalName:'Hip bone', aliases:['pelvic bone','innominate bone','os coxae'], region:'pelvis', side:'paired', category:'girdle', landmarks:['ilium','ischium','pubis','acetabulum'], articulations:['sacrum','femur'], radiographyImportance:'AP pelvis and hip; acetabular orientation.', difficulty:2, modelObjectIds:['pelvis-left','pelvis-right'], commonConfusions:['sacrum'] },
  { id:'femur', canonicalName:'Femur', aliases:['thigh bone'], region:'lower_limb', side:'paired', category:'long bone', landmarks:['head','neck','greater trochanter','condyles'], articulations:['hip bone','tibia','patella'], radiographyImportance:'AP/lateral femur and hip; longest major bone.', difficulty:1, modelObjectIds:['femur-left','femur-right'], commonConfusions:['humerus'] },
  { id:'patella', canonicalName:'Patella', aliases:['kneecap'], region:'lower_limb', side:'paired', category:'sesamoid bone', landmarks:['base','apex','articular surface'], articulations:['femur'], radiographyImportance:'Skyline/sunrise and lateral knee projections.', difficulty:2, modelObjectIds:['patella-left','patella-right'], commonConfusions:['carpal bones'] },
  { id:'tibia', canonicalName:'Tibia', aliases:['shin bone','medial leg bone'], region:'lower_limb', side:'paired', category:'long bone', landmarks:['tibial plateau','tibial tuberosity','medial malleolus'], articulations:['femur','fibula','talus'], radiographyImportance:'AP/lateral tibia and ankle; weight-bearing medial bone.', difficulty:1, modelObjectIds:['tibia-left','tibia-right'], commonConfusions:['fibula'] },
  { id:'fibula', canonicalName:'Fibula', aliases:['lateral leg bone'], region:'lower_limb', side:'paired', category:'long bone', landmarks:['head','shaft','lateral malleolus'], articulations:['tibia','talus'], radiographyImportance:'AP/lateral lower leg and ankle; lateral slender bone.', difficulty:2, modelObjectIds:['fibula-left','fibula-right'], commonConfusions:['tibia'] },
  { id:'foot', canonicalName:'Foot bones', aliases:['tarsals','metatarsals','toes'], region:'lower_limb', side:'paired', category:'distal skeleton', landmarks:['talus','calcaneus','navicular','metatarsals'], articulations:['tibia','fibula'], radiographyImportance:'AP, oblique and lateral foot/ankle projections.', difficulty:3, modelObjectIds:['foot-left','foot-right'], commonConfusions:['hand'] },
];

export const LANDMARK_HOTSPOTS = {
  scapula: [
    { id:'acromion', label:'Acromion', position:[-2.75,8.1,0.35] },
    { id:'coracoid', label:'Coracoid process', position:[-2.05,7.8,0.65] },
    { id:'glenoid', label:'Glenoid cavity', position:[-2.95,7.45,0.5] },
    { id:'spine', label:'Spine of scapula', position:[-2.4,7.35,0.25] },
  ],
  humerus: [
    { id:'greater-tubercle', label:'Greater tubercle', position:[-3.0,7.75,0.42] },
    { id:'head', label:'Head', position:[-2.7,8.15,0.35] },
  ],
  femur: [
    { id:'greater-trochanter', label:'Greater trochanter', position:[-1.45,-1.1,0.35] },
    { id:'condyles', label:'Femoral condyles', position:[-1.0,-5.0,0.4] },
  ],
};

export const MODEL_CATALOG = {
  active: {
    id: 'bodyparts3d-upper-limb-v1',
    label: 'BodyParts3D real upper-limb study set',
    source: 'BodyParts3D via paulvanmetre/anatomy-viewer',
    license: 'CC BY-SA attribution; credit BodyParts3D / DBCLS and the source project',
    files: [
      { id:'clavicle', side:'right', label:'Right clavicle', file:'./assets/bodyparts3d/clavicle_right.glb' },
      { id:'scapula', side:'right', label:'Right scapula', file:'./assets/bodyparts3d/scapula_right.glb' },
      { id:'humerus', side:'right', label:'Right humerus', file:'./assets/bodyparts3d/humerus_right.glb' },
      { id:'radius', side:'right', label:'Right radius', file:'./assets/bodyparts3d/radius_right.glb' },
      { id:'ulna', side:'right', label:'Right ulna', file:'./assets/bodyparts3d/ulna_right.glb' },
    ],
  },
  fullSkeletonFile: './assets/z-anatomy-skeleton.glb',
  fusedReferenceFile: './assets/Skeleton_NIH3D.glb',
  organSystemFile: './assets/ic-organlar.glb',
  organSystem: {
    id: 'anatomi-simulatoru-organs-v1',
    label: 'Internal organ system — 120 named structures',
    source: 'DrMuratAltun/anatomi-simulatoru, systems/ic-organlar.glb',
    derivedFrom: 'BodyParts3D (DBCLS) via Z-Anatomy',
    license: 'CC BY-SA 4.0 — attribution required to BodyParts3D/DBCLS, Z-Anatomy and the source project; derivative works must be distributed under the same licence',
    note: 'Same repository and licence as the bundled skeleton, which is systems/iskelet.glb from the same set. Plain glTF with no compression extensions; every one of its 120 meshes is individually named using the same .l/.r side convention as the skeleton.',
    covers: ['Airway: trachea, main/lobar/segmental bronchi, lung lobes, pleura', 'Urinary: kidney, renal pelvis, ureter, bladder, urethra', 'Digestive: oesophagus, stomach, duodenum, jejunum, colon segments, appendix, liver segments, gallbladder, pancreas, ducts', 'Endocrine: thyroid, parathyroids, suprarenal, pineal, hypophysis', 'Pharynx: naso-, oro- and laryngopharynx, epiglottis, soft palate', 'Salivary: parotid, submandibular, sublingual'],
    absent: ['Heart and great vessels — those are in systems/dolasim.glb (circulatory), not this file'],
  },
  circulatoryFile: './assets/dolasim.glb',
  circulatory: {
    id: 'anatomi-simulatoru-circulatory-v1',
    label: 'Circulatory system — 676 named structures',
    source: 'DrMuratAltun/anatomi-simulatoru, systems/dolasim.glb',
    derivedFrom: 'BodyParts3D (DBCLS) via Z-Anatomy',
    license: 'CC BY-SA 4.0 — attribution required to BodyParts3D/DBCLS, Z-Anatomy and the source project; derivative works must be distributed under the same licence',
    note: 'Plain glTF, no compression extensions. 676 of 676 meshes individually named. Around 449k triangles, which is the heaviest asset in the bundle — worth loading only on demand rather than at boot.',
    covers: ['All four heart chambers: left and right atrium, left and right ventricle', 'Valve leaflets: right and left AV valve leaflets, pulmonary and aortic semilunar leaflets', 'Papillary muscles of both ventricles', 'Great vessels: aortic arch, superior and inferior vena cava, pulmonary trunk and its bifurcation, pulmonary arteries and veins', 'Coronary circulation: left and right coronary arteries with branches, coronary sinus, cardiac veins'],
    absent: ['The conducting system — no SA node, AV node, bundle of His or Purkinje fibres. Conduction stays a diagram-and-animation topic, not a 3D one.'],
  },
  replacementCandidates: [
    { label:'Z-Anatomy / BodyParts3D skeleton system', url:'https://github.com/DrMuratAltun/anatomi-simulatoru', note:'Active structure-level source; 277 named meshes and CC BY-SA 4.0 data attribution documented by the source project.' },
    { label:'NIH 3D — Human Skeleton 3DPX-016838', url:'https://3d.nih.gov/entries/3dpx-016838', note:'Promising CT-derived candidate; verify the entry-level license and separate-object quality before bundling.' },
    { label:'BodyParts3D / Anatomography', url:'https://lifesciencedb.jp/bp3d/info_en/index.html', note:'Open OBJ data with named anatomical concepts; CC BY-SA 2.1 JP requires attribution and share-alike.' },
  ],
};

export function getAnatomy(id) {
  return ANATOMY_DATABASE.find((record) => record.id === id);
}

export function searchAnatomy(query) {
  const needle = query.trim().toLowerCase();
  if (!needle) return ANATOMY_DATABASE;
  return ANATOMY_DATABASE.filter((record) => [record.canonicalName, ...record.aliases, record.region].join(' ').toLowerCase().includes(needle));
}
