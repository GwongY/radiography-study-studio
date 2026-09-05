/* Regression gate for the highest-impact reading-help gaps. */
import { memoryTip, termNote } from '../outputs/term-notes.js';
import { termGloss } from '../outputs/term-gloss.js';

const stubElement = { classList: { contains: () => true }, addEventListener: () => {} };
globalThis.document = {
  querySelectorAll: () => [],
  getElementById: () => stubElement,
  activeElement: null,
  body: stubElement,
  contains: () => false,
};
globalThis.window = { addEventListener: () => {} };
const { memoryHTML, numberHTML } = await import('../outputs/study/reading-help.js');

const PRIORITY_TERMS = [
  'landmark', 'membrane', 'vertebra', 'articulates', 'skeleton', 'process',
  'vertebral', 'lateral', 'receptor', 'antibody', 'antibodies', 'proximal',
  'immunity', 'radius', 'scapula', 'connective', 'tendon', 'humerus',
  'contraction', 'calcium', 'medial', 'cervical', 'distal', 'imaging',
  'pulmonary', 'plasma', 'anatomical', 'antigen', 'clavicle', 'sacrum',
  'cardiac', 'hormone', 'cartilage', 'fibrous', 'skeletal', 'sternum',
  'abduction', 'capsule', 'radiation', 'superior', 'spinal', 'pelvis',
  'fibula', 'matrix', 'respiratory', 'marrow', 'artery', 'enzyme',
  'exposure', 'inferior', 'transverse', 'articular', 'carpal', 'ionizing',
  'sensory', 'nucleolus', 'nucleoli',
  'conducting', 'arteries', 'digestive', 'feedback', 'nucleus', 'nervous',
  'facial', 'ligament', 'metacarpal', 'anterior', 'endocrine', 'intestine',
  'patella', 'malleolus', 'mandible', 'posterior', 'atrium', 'sacral',
  'systemic', 'ventricular', 'modality', 'suture', 'tubercle', 'costal',
  'planes', 'flexion', 'girdle', 'kidney', 'spinous', 'clotting', 'cranial',
  'nuclear', 'opposition', 'radiographer', 'rotation', 'tension', 'bladder',
  'glenoid', 'hepatic', 'tibial', 'innate', 'stimulus', 'trochlear',
  'cartilaginous', 'deltoid', 'epithelial', 'epithelium', 'extension',
  'inflammation', 'radial', 'radiography', 'radioulnar', 'rotator', 'sagittal',
  'aortic', 'articulations', 'bronchus', 'chambers', 'condylar', 'neutrophils',
  'agonist', 'bilateral', 'circulation', 'somatic',
  'adaptive', 'capillaries', 'coronal', 'cranium', 'diagnosis', 'fluoroscopy',
  'lymphocytes', 'navicular', 'portal', 'pronation', 'capillary',
  'extracellular', 'hydrophobic', 'midline', 'mitosis', 'pathogens',
  'radiocarpal', 'tubule', 'visceral', 'antagonist', 'appendicular', 'compact',
  'extrinsic', 'foramina', 'metabolism', 'pathogen', 'supination', 'ventral',
  'acromial', 'effector', 'median', 'nuclei', 'pleura', 'radiology', 'sternal',
  'striated', 'trachea', 'transcription', 'translation',
];

const NUMBER_PAIRS = [
  ['nucleolus', 'singular', 'nucleoli'],
  ['nucleoli', 'plural', 'nucleolus'],
];

const MEMORY_TIP_TERMS = [
  'intron', 'introns', 'exon', 'exons', 'afferent', 'efferent',
  'abduction', 'adduction', 'flexion', 'extension', 'supination', 'pronation',
  'proximal', 'distal', 'medial', 'lateral', 'anterior', 'posterior',
  'superior', 'inferior', 'endocytosis', 'exocytosis', 'endocrine', 'exocrine',
  'intrafusal', 'extrafusal', 'agonist', 'antagonist', 'sympathetic',
  'parasympathetic', 'systole', 'diastole', 'osteoblast', 'osteoclast',
  'epiphysis', 'diaphysis', 'metaphysis', 'hyper', 'hypo', 'artery', 'arteries',
];

const BODY_MEMORY_TERMS = [
  'clavicle', 'scapula', 'humerus', 'radius', 'ulna', 'carpals', 'metacarpals',
  'phalanx', 'phalanges', 'femur', 'patella', 'tibia', 'fibula', 'tarsals',
  'metatarsals', 'talus', 'calcaneus', 'sternum', 'ribs', 'vertebra', 'vertebrae',
  'sacrum', 'coccyx', 'mandible', 'maxilla', 'cranium', 'skull', 'heart', 'lungs',
  'liver', 'stomach', 'spleen', 'pancreas', 'kidney', 'bladder', 'intestine',
  'intestines', 'oesophagus', 'esophagus', 'trachea', 'larynx', 'pharynx',
  'diaphragm', 'thyroid', 'adrenal', 'pituitary', 'deltoid', 'biceps', 'triceps',
  'quadriceps', 'hamstrings', 'gastrocnemius', 'soleus', 'trapezius', 'pectoralis',
  'gluteus', 'cerebrum', 'cerebellum', 'medulla', 'pons', 'hippocampus', 'amygdala',
  'hypothalamus', 'thalamus', 'bronchi', 'bronchioles', 'alveoli', 'alveolus',
  'pleura', 'pericardium', 'myocardium', 'endocardium', 'aorta', 'appendix',
  'ureter', 'urethra', 'rectum', 'colon',
];

const BODY_GLOSS_TERMS = [
  'ulna', 'femur', 'tibia', 'ribs', 'skull', 'lungs', 'liver', 'stomach', 'spleen',
  'esophagus', 'quadriceps', 'hamstrings', 'appendix', 'colon',
];

const COMPLEX_BODY_TERMS = [
  'sternocleidomastoid', 'brachioradialis', 'subscapularis', 'supraspinatus',
  'infraspinatus', 'iliopsoas', 'quadratus', 'lumborum', 'interosseous',
  'temporomandibular', 'metatarsophalangeal', 'carpometacarpal', 'talocrural',
  'tibiofibular', 'radioulnar', 'atlantoaxial', 'sacroiliac', 'occipitofrontalis',
  'nasopharynx', 'laryngopharynx', 'gastrocnemius', 'cerebrospinal',
  'vestibulocochlear', 'glossopharyngeal', 'oculomotor', 'hypoglossal', 'phrenic',
  'vagus', 'intercostal', 'mediastinum', 'peritoneum', 'mesentery',
  'retroperitoneum', 'duodenum', 'jejunum', 'ileum', 'caecum', 'cecum', 'sigmoid',
  'pancreatic', 'hepatoduodenal', 'thoracolumbar', 'sternocostal', 'costovertebral',
  'acromioclavicular', 'sternoclavicular', 'glenohumeral', 'intervertebral',
  'temporalis', 'pterygoid', 'sternohyoid', 'omohyoid', 'thyrohyoid', 'geniohyoid',
  'mylohyoid', 'suprahyoid', 'infrahyoid', 'brachialis', 'coracobrachialis',
  'anconeus', 'pronator', 'teres', 'supinator', 'popliteus', 'plantaris', 'tibialis',
  'fibularis', 'longus', 'brevis', 'extensor', 'hallucis', 'flexor', 'adductor',
  'magnus', 'gracilis', 'sartorius', 'semitendinosus', 'semimembranosus',
];

const COMPLEX_BODY_GLOSS_TERMS = [
  'sternocleidomastoid', 'brachioradialis', 'iliopsoas', 'atlantoaxial', 'sacroiliac',
  'occipitofrontalis', 'oculomotor', 'vagus', 'mesentery', 'retroperitoneum',
  'ileum', 'caecum', 'cecum', 'pancreatic', 'hepatoduodenal', 'thoracolumbar',
  'temporalis', 'pterygoid', 'sternohyoid', 'omohyoid', 'thyrohyoid', 'geniohyoid',
  'mylohyoid', 'suprahyoid', 'infrahyoid', 'brachialis', 'coracobrachialis',
  'anconeus', 'pronator', 'teres', 'supinator', 'plantaris', 'fibularis', 'longus',
  'brevis', 'extensor', 'hallucis', 'flexor', 'adductor', 'magnus', 'gracilis',
  'sartorius', 'semitendinosus', 'semimembranosus',
];

/* The next anatomy set must have the whole reading-help stack: pronunciation
   and plain meaning, a bilingual glossary definition, and a memory hook. */
const ADVANCED_BODY_FULL_TERMS = [
  'zygomatic', 'sphenoid', 'ethmoid', 'temporal', 'occipital', 'parietal',
  'frontal', 'lacrimal', 'vomer', 'palatine', 'hyoid', 'manubrium', 'xiphoid',
  'acetabulum', 'obturator', 'ischium', 'ilium', 'pubis', 'ischial', 'pubic',
  'olecranon', 'trochlea', 'capitulum', 'styloid', 'scaphoid', 'lunate',
  'triquetrum', 'pisiform', 'trapezium', 'trapezoid', 'hamate', 'navicular',
  'cuboid', 'cuneiform', 'rhomboid', 'latissimus', 'levator', 'serratus',
  'tensor', 'fascia', 'vastus', 'medialis', 'intermedius', 'medius', 'minimus',
  'digitorum', 'epiglottis', 'glottis', 'uvula', 'tonsil', 'thymus',
  'oropharynx', 'interventricular', 'interatrial', 'sinoatrial',
  'atrioventricular', 'chordae', 'papillary', 'glomerulus', 'nephron', 'calyx',
  'renal', 'mesocolon', 'mesorectum',
];

const ADVANCED_BODY_FULL_TERMS_2 = [
  'acromion', 'coracoid', 'trochanter', 'tuberosity', 'epicondyle', 'foramen',
  'fossa', 'sulcus', 'gyrus', 'meatus', 'hilum', 'lamina', 'pedicle', 'ramus',
  'aponeurosis', 'periosteum', 'symphysis', 'costochondral', 'sacrococcygeal',
  'lumbosacral', 'iliacus', 'psoas', 'rectus', 'abdominis', 'transversus',
  'oblique', 'multifidus', 'splenius', 'scalene', 'digastric', 'stylohyoid',
  'genioglossus', 'hyoglossus', 'masseter', 'carina', 'epicardium', 'pericardial',
  'pleural', 'bronchopulmonary', 'tracheobronchial', 'telencephalon',
  'mesencephalon', 'metencephalon', 'myelencephalon', 'prosencephalon',
  'rhombencephalon', 'meninges', 'dura', 'pia', 'chiasm', 'decussation',
  'fasciculus', 'peduncle', 'corticospinal', 'spinothalamic', 'macula', 'utricle',
  'saccule', 'pylorus', 'gallbladder', 'detrusor', 'epididymis', 'fimbriae',
  'endometrium', 'myometrium', 'cervix', 'prostate', 'perineum',
];

const ADVANCED_BODY_FULL_TERMS_3 = [
  'sella', 'turcica', 'crista', 'mastoid', 'nuchal', 'odontoid', 'dens', 'atlas',
  'axis', 'corpus', 'callosum', 'choroid', 'hypophysis', 'adenohypophysis',
  'neurohypophysis', 'diencephalon', 'medulla', 'oblongata', 'ventricle',
  'cerebral', 'cerebellar', 'arachnoid', 'meningeal', 'subarachnoid', 'trochlear',
  'trigeminal', 'accessory', 'subclavius', 'rotatores', 'semispinalis',
  'longissimus', 'iliocostalis', 'transversospinalis', 'erector', 'spinae',
  'infundibulum', 'ampulla', 'isthmus', 'trigone', 'ileocecal', 'hepatopancreatic',
  'sphincter', 'papilla', 'duodenal', 'sclera', 'tympanum', 'malleus', 'incus',
  'stapes', 'ossicles', 'vestibule',
];

/* Larger-scale anatomy coverage: landmarks, deep muscle names, joint names,
   and named subdivisions of the brain, heart, airway, gut, and urogenital tract. */
const LARGE_ANATOMY_FULL_TERMS = [
  'bregma', 'lambda', 'pterion', 'asterion', 'squamous', 'nasal', 'maxillary',
  'mandibular', 'endosteum', 'osteon', 'lamellae', 'lacunae', 'canaliculi',
  'osteocyte', 'supraorbital', 'infraorbital', 'mental', 'jugular', 'carotid',
  'magnum', 'stylomastoid', 'spinosum', 'ovale', 'rotundum', 'lacerum', 'orbital',
  'piriformis', 'gemellus', 'quadratusfemoris', 'obturatorinternus',
  'obturatorexternus', 'iliotibial', 'interossei', 'lumbricals', 'thenar',
  'hypothenar', 'opponens', 'abductorpollicis', 'flexorcarpi', 'extensorcarpi',
  'metacarpophalangeal', 'interphalangeal', 'talocalcaneal', 'calcaneocuboid',
  'tarsometatarsal', 'intertarsal', 'radiocarpal', 'septum', 'auricle', 'trabeculae',
  'carneae', 'aortic', 'mitral', 'tricuspid', 'substantia', 'nigra', 'caudate',
  'putamen', 'aqueduct', 'bulb', 'tract', 'bowman', 'collecting', 'duct', 'seminal',
  'vesicle', 'vas', 'deferens', 'ovary', 'oviduct', 'omentum', 'pancreatic', 'anal',
  'canal', 'cricoid', 'arytenoid', 'vocal', 'folds', 'laryngeal', 'bronchial',
  'lymph', 'node', 'thymic', 'urethral', 'renalpelvis', 'ileocecal', 'hepatopancreatic',
  'sphincter', 'papilla', 'malleus', 'incus', 'stapes', 'tympanic', 'auditory',
  'olfactory', 'optic', 'accessory', 'facial', 'phrenic', 'vagus',
];

const FINAL_BIG_BODY_TERMS = [
  'annulus', 'pulposus', 'meniscus', 'labrum', 'retinaculum', 'enthesis', 'synovium',
  'cribriform', 'incisive', 'ethmoidal', 'vertebrosternal', 'vertebrochondral',
  'teresmajor', 'teresminor', 'pectoralismajor', 'pectoralisminor',
  'pronatorquadratus', 'pronatorteres', 'flexordigitorum', 'extensordigitorum',
  'palmaris', 'flexorpollicis', 'extensorpollicis', 'adductorpollicis',
  'opponenspollicis', 'gluteusmaximus', 'gluteusmedius', 'gluteusminimus',
  'tensorfasciaelatae', 'tibialisanterior', 'tibialisposterior',
  'flexordigitorumlongus', 'extensordigitorumlongus', 'flexorhallucislongus',
  'extensorhallucislongus', 'peroneuslongus', 'peroneusbrevis', 'pectineus',
  'adductorlongus', 'adductorbrevis', 'vastuslateralis', 'vastusmedialis',
  'vastusintermedius', 'fornix', 'claustrum', 'insula', 'arborvitae', 'vermis',
  'flocculus', 'nodulus', 'colliculus', 'tectum', 'tegmentum', 'epithalamus',
  'subthalamus', 'pineal', 'habenula', 'amygdaloid', 'hypothalamic', 'thalamic',
  'cortical', 'callosal', 'choroidal', 'ependymal', 'pectinate', 'coronary',
  'sinus', 'venule', 'alveolar', 'bronchiole', 'bronchiolar', 'rugae', 'villi',
  'microvilli', 'crypts', 'plica', 'greateromentum', 'lesseromentum', 'podocyte',
  'juxtaglomerular', 'glomerular', 'proximalconvoluted', 'distalconvoluted',
  'seminiferous', 'spermatogenic', 'ejaculatory', 'fallopian', 'uterine',
  'fimbrial', 'ovulatory', 'cervical', 'vaginal', 'placenta', 'amnion', 'chorion',
  'umbilical', 'pericardial', 'endocardial', 'myocardial', 'intercostal',
];

const GLOSS_ONLY_TERMS = [
  'central', 'specific', 'functional', 'potential', 'asymmetric', 'clinical',
  'terminal', 'structural', 'abnormal', 'classical', 'electrical', 'histamine',
  'genetic', 'synaptic', 'bacteria', 'elastic', 'kinase', 'mitochondria',
  'molecule', 'acetylcholine', 'aerobic', 'peripheral', 'phospholipase',
  'pyramidal', 'vaccine', 'equilibrium', 'ryanodine', 'chemotaxis',
  'homeostatic', 'thyroxine', 'tyrosine', 'retinal', 'collagenous', 'disynaptic',
  'genomic', 'nicotinic', 'talocrural', 'atpase', 'caudal', 'dopamine', 'fascia',
  'lactic', 'lobule', 'phrenic', 'precentral',
  'muscle', 'muscles', 'tissue', 'tissues', 'movement', 'movements',
  'structure', 'structures', 'system', 'systems', 'protein', 'proteins',
  'position', 'fibres', 'joints', 'region', 'regions', 'surface', 'surfaces',
  'response', 'responses', 'pathway', 'pathways', 'action', 'attachment',
  'effect', 'material', 'oxygen', 'transmitter', 'volume', 'binding', 'socket',
  'shoulder', 'exchange', 'supply', 'insertion', 'nerves', 'tracts', 'vesicle',
  'vesicles', 'gland', 'glands', 'nutrient', 'nutrients', 'recognition', 'sensors',
  'threshold', 'barrier', 'cascade', 'cellular', 'channel', 'channels',
  'intracellular', 'contractile', 'diffusion', 'permeability', 'secretory',
  'vascular', 'sodium', 'phosphate', 'phosphates', 'lactate', 'filtration',
  'adrenaline', 'interleukin', 'immunological', 'electrolytes', 'heparin',
  'goblet', 'mosaic', 'subunits', 'turnover', 'voltage', 'impulses', 'depolarise',
  'reuptake', 'serotonin', 'inhibitory', 'excitatory', 'spindle', 'spindles',
  'myelinated', 'sphincter', 'papilla', 'rectum', 'perineum', 'hallux', 'soleus',
  'lumborum', 'viscera', 'costae', 'symphyses', 'arcuate', 'oblique', 'vertical',
  'horizontal', 'quadrants', 'cavities',
  'column', 'organs', 'junction', 'junctions', 'relaxation', 'filaments', 'filament',
  'innervates', 'innervated', 'innervate', 'depolarised', 'repolarise', 'axon',
  'axons', 'dendrite', 'dendrites', 'synapse', 'synapses', 'preganglionic',
  'postganglionic', 'neurotransmitter', 'glycolysis', 'metabolic', 'oxidative',
  'anaerobic', 'potassium', 'chloride', 'crossbridge', 'crossbridges',
  'phosphorylation', 'nucleated', 'nucleotides', 'genome', 'secretion',
  'secretions', 'secreted', 'adrenal', 'pituitary', 'inspiration', 'expiration',
  'ventilation', 'perfusion', 'arterial', 'venules', 'pressure', 'pulse', 'valves',
  'radiotherapy', 'radiopaque', 'radiolucent', 'attenuation', 'collimation',
  'projection', 'anode', 'cathode', 'photons', 'electromagnetic', 'phagocytosis',
  'cytokine', 'cytokines', 'urine', 'osmosis', 'concentrated', 'concentration',
  'influx', 'efflux', 'resting', 'repolarised', 'repolarization', 'depolarization',
  'stimulates', 'stimulation', 'axonal', 'dendritic', 'ganglion', 'ganglia',
  'reflex', 'afferent', 'efferent', 'interneuron', 'motor', 'ligand', 'ligands',
  'messenger', 'messengers', 'signal', 'signals', 'excitation', 'inhibition',
  'conductance', 'conductivity', 'gradient', 'gradients', 'solute', 'solutes',
  'endocytosis', 'exocytosis', 'ribosome', 'mitotic', 'allele', 'mutation',
  'replication', 'synthesis', 'expression',
  'costochondral', 'ligamentous', 'articulating', 'ossification', 'calcification',
  'remodelling', 'resorption', 'trabecular', 'spongy', 'mandibular', 'ulnar',
  'talus', 'substrates', 'catalyst', 'catalysis', 'nasopharynx', 'laryngopharynx',
  'compliance', 'spirometry', 'inhalation', 'exhalation', 'aorta', 'micturition',
  'basophils', 'immunoglobulin', 'scintigraphy', 'computed', 'sonography',
  'detector', 'intensifier', 'fluoroscopic', 'contrast', 'magnification',
  'distortion', 'artefact', 'scatter', 'costovertebral', 'metatarsophalangeal',
  'osteoporosis', 'osteomalacia', 'periarticular', 'intraarticular', 'ligamentum',
  'tendonitis', 'diaphragmatic', 'intrapleural', 'transpulmonary',
  'electrocardiography', 'electrocardiograph', 'hemodynamics', 'haemodynamics',
  'vasoconstriction', 'vasodilation', 'vasodilatation', 'hypotension', 'nephrology',
  'immunoglobulins', 'lymphadenopathy', 'radiodensity', 'radiolucency', 'radiopacity',
];

const BUILT_OUT_OF_TERMS = [
  'vertebra', 'skeleton', 'lateral', 'radius', 'scapula', 'humerus', 'clavicle',
  'sacrum', 'sternum', 'pelvis', 'fibula', 'cartilage', 'artery', 'arteries',
  'cardiac', 'ligament', 'articular', 'patella', 'mandible', 'malleolus',
  'trachea', 'glenoid', 'costal', 'cranial', 'nucleus', 'nuclei', 'nucleolus',
  'immunity', 'nervous', 'epithelium', 'phrenic', 'fascia', 'skeletal',
  'vertebral', 'proximal', 'medial', 'spinal', 'sacral', 'sternal', 'radial',
  'tibial', 'carpal', 'metacarpal', 'respiratory', 'hepatic', 'bronchus',
  'somatic', 'coronal', 'visceral', 'tendon', 'superior', 'inferior', 'nuclear',
];

const missing = PRIORITY_TERMS.filter((term) => {
  const note = termNote(term);
  return !note || !note.say || !note.plain;
});

const numberMissing = NUMBER_PAIRS.filter(([term, number, other]) => {
  const note = termNote(term);
  return !note || note.number !== number || note.other !== other;
});

const memoryMissing = MEMORY_TIP_TERMS.filter((term) => !memoryTip(term));
const bodyMemoryMissing = BODY_MEMORY_TERMS.filter((term) => !memoryTip(term));
const complexBodyMissing = COMPLEX_BODY_TERMS.filter((term) => !memoryTip(term));
const advancedBodyFullMissing = ADVANCED_BODY_FULL_TERMS.filter((term) => {
  const note = termNote(term);
  const gloss = termGloss(term);
  return !note || !note.say || !note.plain || !gloss || !gloss.meaning || !gloss.zh || !memoryTip(term);
});
const advancedBodyFullMissing2 = ADVANCED_BODY_FULL_TERMS_2.filter((term) => {
  const note = termNote(term);
  const gloss = termGloss(term);
  return !note || !note.say || !note.plain || !gloss || !gloss.meaning || !gloss.zh || !memoryTip(term);
});
const advancedBodyFullMissing3 = ADVANCED_BODY_FULL_TERMS_3.filter((term) => {
  const note = termNote(term);
  const gloss = termGloss(term);
  return !note || !note.say || !note.plain || !gloss || !gloss.meaning || !gloss.zh || !memoryTip(term);
});
const largeAnatomyMissing = LARGE_ANATOMY_FULL_TERMS.filter((term) => {
  const note = termNote(term);
  const gloss = termGloss(term);
  return !note || !note.say || !note.plain || !gloss || !gloss.meaning || !gloss.zh || !memoryTip(term);
});
const finalBigBodyMissing = FINAL_BIG_BODY_TERMS.filter((term) => {
  const note = termNote(term);
  const gloss = termGloss(term);
  return !note || !note.say || !note.plain || !gloss || !gloss.meaning || !gloss.zh || !memoryTip(term);
});

const glossMissing = GLOSS_ONLY_TERMS.filter((term) => {
  const gloss = termGloss(term);
  return !gloss || !gloss.meaning || !gloss.zh;
});

const bodyGlossMissing = BODY_GLOSS_TERMS.filter((term) => {
  const gloss = termGloss(term);
  return !gloss || !gloss.meaning || !gloss.zh;
});

const complexBodyGlossMissing = COMPLEX_BODY_GLOSS_TERMS.filter((term) => {
  const gloss = termGloss(term);
  return !gloss || !gloss.meaning || !gloss.zh;
});

const builtMissing = BUILT_OUT_OF_TERMS.filter((term) => {
  const note = termNote(term);
  return !note || !note.from || !/^Built out of:/i.test(note.from);
});

const renderedNumber = numberHTML({ number: 'singular', other: 'nucleoli' });
const renderedPlural = numberHTML({ number: 'plural', other: 'nucleolus' });
const displayMissing = !renderedNumber.includes('Singular form')
  || !renderedNumber.includes('plural')
  || !renderedNumber.includes('nucleoli')
  || !renderedPlural.includes('Plural form')
  || !renderedPlural.includes('singular')
  || !renderedPlural.includes('nucleolus');
const renderedMemory = memoryHTML(memoryTip('intron'));
const memoryDisplayMissing = !renderedMemory.includes('Memory tip')
  || !renderedMemory.includes('INtrons')
  || !renderedMemory.includes('cut out');

if (missing.length) {
  console.error(`Missing complete reading help for: ${missing.join(', ')}`);
  process.exitCode = 1;
} else if (numberMissing.length) {
  console.error(`Missing singular/plural cross-reference for: ${numberMissing.map(([term]) => term).join(', ')}`);
  process.exitCode = 1;
} else if (memoryMissing.length) {
  console.error(`Missing memory tips for: ${memoryMissing.join(', ')}`);
  process.exitCode = 1;
} else if (bodyMemoryMissing.length) {
  console.error(`Missing body-part memory tips for: ${bodyMemoryMissing.join(', ')}`);
  process.exitCode = 1;
} else if (complexBodyMissing.length) {
  console.error(`Missing complex body-part memory tips for: ${complexBodyMissing.join(', ')}`);
  process.exitCode = 1;
} else if (advancedBodyFullMissing.length) {
  console.error(`Missing full reading help for advanced body parts: ${advancedBodyFullMissing.join(', ')}`);
  process.exitCode = 1;
} else if (advancedBodyFullMissing2.length) {
  console.error(`Missing full reading help for the next anatomy set: ${advancedBodyFullMissing2.join(', ')}`);
  process.exitCode = 1;
} else if (advancedBodyFullMissing3.length) {
  console.error(`Missing full reading help for the landmark and subdivision set: ${advancedBodyFullMissing3.join(', ')}`);
  process.exitCode = 1;
} else if (largeAnatomyMissing.length) {
  console.error(`Missing full reading help for the larger anatomy set: ${largeAnatomyMissing.join(', ')}`);
  process.exitCode = 1;
} else if (finalBigBodyMissing.length) {
  console.error(`Missing full reading help for the final large anatomy set: ${finalBigBodyMissing.join(', ')}`);
  process.exitCode = 1;
} else if (glossMissing.length) {
  console.error(`Missing glossary help for: ${glossMissing.join(', ')}`);
  process.exitCode = 1;
} else if (builtMissing.length) {
  console.error(`Missing built-out-of help for: ${builtMissing.join(', ')}`);
  process.exitCode = 1;
} else if (displayMissing) {
  console.error('Missing rendered singular/plural reading-help line');
  process.exitCode = 1;
} else if (memoryDisplayMissing) {
  console.error('Missing rendered memory-tip line');
  process.exitCode = 1;
} else if (bodyGlossMissing.length) {
  console.error(`Missing body-part glossary help for: ${bodyGlossMissing.join(', ')}`);
  process.exitCode = 1;
} else if (complexBodyGlossMissing.length) {
  console.error(`Missing complex body-part glossary help for: ${complexBodyGlossMissing.join(', ')}`);
  process.exitCode = 1;
} else {
  console.log(`ALL PASS — ${PRIORITY_TERMS.length} priority terms have pronunciation and plain-English help`);
}
