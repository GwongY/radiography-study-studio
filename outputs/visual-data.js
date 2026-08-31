/*
 * visual-data.js — a visual for every study item.
 *
 * Reading a paragraph about the carpal bones and never seeing them is not
 * studying anatomy, so nothing here is decoration: each visual is either the
 * real model meshes for the structure being taught, or a drawing of the item's
 * own sourced content.
 *
 * Three kinds, resolved in this order by visualFor():
 *
 *   model      — named meshes in one of the seven registered BodyParts3D layers.
 *                Interactive: it is the studio canvas, moved into the lesson.
 *   schematic  — a hand-authored SVG, for what no mesh can show: a feedback
 *                loop, the inside of a long bone, the EM spectrum.
 *   generated  — built from the item's own data (sequence order, matching
 *                pairs, key facts). Nothing invented; it is the same sourced
 *                content laid out spatially instead of as prose.
 *
 * Every mesh name below was verified against the actual GLB name index, not
 * guessed. Names match exactly or with the glued side letter; a leading '~'
 * matches on containment.
 */

import { STRUCTURE_SETS, JOINT_MOVEMENTS, STRUCTURE_MODELS, DIAGRAMS } from './study-data.js';

export const LAYER_FILES = Object.fromEntries(
  Object.entries(STRUCTURE_MODELS).map(([k, v]) => [k, v.file]),
);

/* ------------------------------------------------------------------ *
 * Bone records -> skeleton meshes
 * ------------------------------------------------------------------ */

export const BONE_MESHES = {
  cranium: ['Frontal bone', 'Parietal bone', 'Occipital bone', 'Temporal bone', 'Sphenoid bone',
    'Ethmoid bone', 'Maxilla', 'Zygomatic bone', 'Nasal bone', 'Lacrimal bone', 'Palatine bone',
    'Vomer', 'Inferior nasal concha bone'],
  mandible: ['Mandible'],
  cervical: ['Atlas (C1)', 'Axis (C2)', 'Vertebra C3', 'Vertebra C4', 'Vertebra C5', 'Vertebra C6', 'Vertebra C7'],
  thoracic: ['Vertebra T1', 'Vertebra T2', 'Vertebra T3', 'Vertebra T4', 'Vertebra T5', 'Vertebra T6',
    'Vertebra T7', 'Vertebra T8', 'Vertebra T9', 'Vertebra T10', 'Vertebra T11', 'Vertebra T12'],
  lumbar: ['Vertebra L1', 'Vertebra L2', 'Vertebra L3', 'Vertebra L4', 'Vertebra L5'],
  sacrum: ['Sacrum'],
  coccyx: ['Coccyx'],
  sternum: ['Manubrium of sternum', 'Body of sternum', 'Xiphoid process'],
  ribs: ['First rib', 'Second rib', 'Third rib', 'Fourth rib', 'Fifth rib', 'Sixth rib', 'Seventh rib',
    'Eighth rib', 'Ninth rib', 'Tenth rib', 'Eleventh rib', 'Twelfth rib'],
  clavicle: ['Clavicle'],
  scapula: ['Scapula'],
  humerus: ['Humerus'],
  radius: ['Radius'],
  ulna: ['Ulna'],
  hand: ['Scaphoid bone', 'Lunate bone', 'Triquetrum bone', 'Pisiform bone', 'Trapezium bone',
    'Trapezoid bone', 'Capitate bone', 'Hamate bone', '~metacarpal bone', '~finger of hand'],
  pelvis: ['Hip bone'],
  femur: ['Femur'],
  patella: ['Patella'],
  tibia: ['Tibia'],
  fibula: ['Fibula'],
  foot: ['Talus', 'Calcaneus', 'Navicular bone', 'Cuboid bone', 'Medial cuneiform bone',
    'Intermediate cuneiform bone', 'Lateral cuneiform bone', '~metatarsal bone', '~finger of foot'],
};

/* ------------------------------------------------------------------ *
 * Explicit per-item visuals
 * ------------------------------------------------------------------ */

const m = (layer, meshes, label, caption, extra = {}) =>
  ({ kind: 'model', layer, meshes, label, caption, ...extra });
const sch = (id) => ({ kind: 'schematic', id });

export const ITEM_VISUALS = {
  /* --- HSS2011 terminology ------------------------------------------ */
  'hss2011-terminology-anatomical-position': sch('anatomicalPosition'),
  'hss2011-terminology-planes': sch('bodyPlanes'),
  'hss2011-terminology-cavities-regions': sch('bodyCavities'),
  'hss2011-terminology-word-parts': sch('wordParts'),

  /* --- HSS2011 osteology -------------------------------------------- */
  'hss2011-osteo-axial-appendicular': m('skeleton',
    ['Frontal bone', 'Parietal bone', 'Occipital bone', 'Temporal bone', 'Sphenoid bone', 'Ethmoid bone',
      'Maxilla', 'Zygomatic bone', 'Nasal bone', 'Lacrimal bone', 'Palatine bone', 'Vomer', 'Mandible',
      'Atlas (C1)', 'Axis (C2)', '~vertebra c', '~vertebra t', '~vertebra l', 'Sacrum', 'Coccyx',
      'Manubrium of sternum', 'Body of sternum', 'Xiphoid process',
      'First rib', 'Second rib', 'Third rib', 'Fourth rib', 'Fifth rib', 'Sixth rib', 'Seventh rib',
      'Eighth rib', 'Ninth rib', 'Tenth rib', 'Eleventh rib', 'Twelfth rib'],
    'Axial skeleton',
    'Only the axial skeleton is shown: skull, vertebral column, ribs and sternum. Everything that vanished — girdles and limbs — is the appendicular skeleton.'),
  'hss2011-osteo-bone-shapes': m('skeleton',
    ['Femur', 'Capitate bone', 'Parietal bone', 'Vertebra L3', 'Patella'],
    'One bone of each shape',
    'Five bones, five shapes: femur (long), capitate (short), parietal (flat), L3 vertebra (irregular), patella (sesamoid).'),
  'hss2011-osteo-long-bone-structure': sch('longBone'),
  'hss2011-osteo-bone-functions': sch('boneFunctions'),
  'hss2011-osteo-vertebral-column': m('skeleton',
    ['Atlas (C1)', 'Axis (C2)', '~vertebra c', '~vertebra t', '~vertebra l', 'Sacrum', 'Coccyx'],
    'Vertebral column',
    'All 26 pieces in order. Rotate to a lateral view to see the four curvatures — cervical and lumbar convex forward, thoracic and sacral concave forward.'),
  'hss2011-osteo-c1-c2': m('skeleton', ['Atlas (C1)', 'Axis (C2)', 'Occipital bone'],
    'Atlas, axis and the skull base',
    'Atlas on axis, with the occipital bone above. Nodding happens at the atlanto-occipital joint on top; rotation happens between atlas and axis below.'),
  'hss2011-osteo-skull-sutures': m('skeleton',
    ['Frontal bone', 'Parietal bone', 'Occipital bone', 'Temporal bone', 'Sphenoid bone'],
    'Skull vault bones',
    'The four sutures are the seams between these bones — coronal (frontal/parietal), sagittal (parietal/parietal), lambdoid (parietal/occipital), squamous (temporal/parietal). The sutures are not separate meshes; they are the joins you can see.'),
  'hss2011-osteo-pectoral-girdle': m('skeleton', ['Clavicle', 'Scapula', 'Humerus', 'Manubrium of sternum'],
    'Pectoral girdle',
    'Clavicle and scapula, with the humerus and manubrium they articulate with. Note how little bony contact holds the girdle to the axial skeleton — one small sternoclavicular joint.'),
  'hss2011-osteo-forearm-carpals': m('skeleton',
    ['Radius', 'Ulna', 'Scaphoid bone', 'Lunate bone', 'Triquetrum bone', 'Pisiform bone',
      'Trapezium bone', 'Trapezoid bone', 'Capitate bone', 'Hamate bone'],
    'Forearm and carpus',
    'Radius and ulna with all eight carpal bones. The radius is the thumb-side bone — rotate until the thumb is lateral to check yourself.'),
  'hss2011-osteo-pelvic-girdle': m('skeleton', ['Hip bone', 'Sacrum', 'Coccyx', 'Femur'],
    'Pelvic girdle',
    'Two hip bones with sacrum and coccyx, and the femur they receive. Compare the bony grip here with the pectoral girdle — this one is built to transmit weight.'),
  'hss2011-osteo-leg-tarsals': m('skeleton',
    ['Tibia', 'Fibula', 'Talus', 'Calcaneus', 'Navicular bone', 'Cuboid bone',
      'Medial cuneiform bone', 'Intermediate cuneiform bone', 'Lateral cuneiform bone'],
    'Leg and tarsus',
    'Tibia and fibula with all seven tarsal bones. The talus is the only one that meets the leg bones; the calcaneus takes the ground.'),
  'hss2011-osteo-ribs-sternum': m('skeleton',
    ['First rib', 'Second rib', 'Third rib', 'Fourth rib', 'Fifth rib', 'Sixth rib', 'Seventh rib',
      'Eighth rib', 'Ninth rib', 'Tenth rib', 'Eleventh rib', 'Twelfth rib',
      'Manubrium of sternum', 'Body of sternum', 'Xiphoid process',
      '~costal cartilage', 'Vertebra T1'],
    'Thoracic cage',
    'Twelve rib pairs, the three sternal parts and the costal cartilages. The thoracic inlet is the ring at the top: T1 vertebra, first ribs and the manubrium.'),

  /* --- HSS2011 joints ----------------------------------------------- */
  'hss2011-joints-classification': sch('jointClassification'),
  'hss2011-joints-synovial-structure': sch('synovialJoint'),
  'hss2011-joints-synovial-types': sch('synovialTypes'),
  'hss2011-joints-movements': sch('jointMovements'),
  'hss2011-joints-rotator-cuff': m('muscle',
    ['Supraspinatus muscle', 'Infraspinatus muscle', 'Teres minor muscle', 'Subscapularis muscle',
      'Acromial part of deltoid muscle', 'Clavicular part of deltoid muscle', 'Scapular spinal part of deltoid muscle'],
    'Rotator cuff and deltoid',
    'The four cuff muscles plus the three parts of deltoid. Supraspinatus starts the first 15 degrees; deltoid takes over after that.',
    { ghostBody: true }),
  'hss2011-pastpaper-joints-articulations': m('joint',
    ['Articular capsule of glenohumeral joint', 'Articular capsule of elbow joint',
      'Articular capsule of hip joint', 'Articular capsule of knee joint',
      'Articular capsule of radiocarpal joint', 'Articular capsule of temporomandibular joint'],
    'Six named joint capsules',
    'Each capsule sits exactly where its joint is. Tap one and name the two bones it joins before you read the answer.',
    { ghostBody: true }),

  /* --- HSS2011 modules ---------------------------------------------- */
  'hss2011-m1-heart-wall-valves': m('circulatory',
    ['Right atrium', 'Right ventricle', 'Left atrium', 'Left ventricle',
      'Septal leaflet of right atrioventricular valve', 'Inferior leaflet of right atrioventricular valve',
      'Posterior leaflet of left atrioventricular valve',
      'Anterior semilunar leaflet of pulmonary valve', 'Left semilunar leaflet of pulmonary valve',
      'Right semilunar leaflet of pulmonary valve',
      'Ascending aorta', 'Aortic arch', 'Superior vena cava'],
    'Heart chambers, valves and great vessels',
    'Four chambers, the atrioventricular and semilunar valve leaflets, and the great vessels leaving the top. Tap a leaflet to name which valve it belongs to.',
    { ghostBody: true }),
  'hss2011-m1-lungs-airway': m('organs',
    ['Superior lobe of right lung', 'Middle lobe of right lung', 'Inferior lobe of right lung',
      'Superior lobe of left lung', 'Inferior lobe of left lung', 'Pleura', 'Trachea',
      'Right main bronchus', 'Left main bronchus', 'Nasopharynx', 'Oropharynx', 'Laryngopharynx', 'Epiglottis'],
    'Lungs, pleura and upper airway',
    'Three lobes on the right, two on the left, with the pleura around them and the pharynx above. The left lung gives up a lobe to make room for the heart.',
    { ghostBody: true }),
  'hss2011-m2-cns-basics': m('nervous',
    ['~spinal cord', 'Medulla oblongata', 'Pons', 'Midbrain', 'Thalamus', 'Hypothalamus'],
    'Spinal cord and brainstem',
    'Cord below, brainstem above it. Tap along the cord to see where the roots leave.',
    { ghostBody: true }),
  'hss2011-m2-brain-regions': m('nervous',
    ['Lateral ventricle', 'Third ventricle', 'Fourth ventricle', 'Aqueduct of midbrain',
      'Thalamus', 'Hypothalamus', 'Midbrain', 'Pons', 'Medulla oblongata'],
    'Ventricles and deep brain',
    'The CSF spaces in order: lateral to third through the interventricular foramen, third to fourth through the aqueduct.',
    { ghostBody: true }),
  'hss2011-m3-digestive': m('organs',
    ['Oesophagus', 'Stomach', 'Duodenum', 'Jejunum', 'Ascending colon', 'Transverse colon',
      'Descending colon', 'Sigmoid colon', 'Vermiform appendix', 'Liver', 'Gallbladder', 'Pancreas', 'Bile duct'],
    'Digestive tract and accessory organs',
    'Follow it top to bottom, then find the three accessory organs that drain into it — liver, gallbladder, pancreas.',
    { ghostBody: true }),
  'hss2011-m3-urogenital-pelvis': m('organs',
    ['Kidney', 'Renal pelvis', 'Ureter', 'Urinary bladder', 'Urethra', 'Prostate', 'Suprarenal gland'],
    'Urinary tract',
    'Kidney to renal pelvis to ureter to bladder to urethra, with the suprarenal gland capping each kidney.',
    { ghostBody: true }),

  /* --- ABCT2326 physiology ------------------------------------------ */
  'abct2326-cells-organisation': sch('cellOrganisation'),
  'abct2326-homeostasis': sch('homeostasis'),
  'abct2326-cvs-circuits': sch('circuits'),
  'abct2326-cvs-conduction': sch('conduction'),
  'abct2326-cvs-ecg-cycle': sch('ecgCycle'),
  'abct2326-blood-composition': sch('bloodComposition'),
  /* The branching-order lesson leads with the fully labelled whole-airway
     figure — every generation named in one view — rather than the 3D organ
     layer; the airway meshes stay searchable and tappable in the Viewer. The
     gas-exchange lesson takes the alveolus/respiratory-membrane figure, which
     is the scale its key facts (type I/II pneumocytes, the membrane) work at. */
  'abct2326-resp-pathway': sch('gasTransport'),
  'abct2326-resp-gas-transport': sch('respiratoryExchange'),
  'abct2326-renal-nephron': sch('nephron'),
  'abct2326-digestive-pathway': m('organs',
    ['Oesophagus', 'Stomach', 'Duodenum', 'Jejunum', 'Ascending colon', 'Transverse colon',
      'Descending colon', 'Sigmoid colon', 'Liver', 'Gallbladder', 'Pancreas'],
    'Tract and accessory organs',
    'The tube itself, plus the three accessory organs that pour into it without ever being part of it.',
    { ghostBody: true }),
  'abct2326-endocrine-delivery': sch('endocrineDelivery'),
  'abct2326-msk-immune-overview': m('lymphatic',
    ['~node', 'Spleen', '~thymus', '~tonsil'],
    'Lymphoid tissue, in place',
    'Every named node group in the body, with the spleen, both lobes of thymus and the palatine tonsils. '
    + 'Note what is NOT in this capture: it holds nodes and lymphoid organs but no lymphatic vessels, so the '
    + 'cisterna chyli at the base of the thoracic duct is not shown, and neither is the asymmetry — the right '
    + 'upper body drains separately from the rest. Both are in the key facts below.',
    { ghostBody: true }),
  'abct2326-nervous-divisions': sch('nervousDivisions'),
  'abct2326-muscle-types': sch('muscleTypes'),
  'abct2326-muscle-action': sch('muscleAction'),
  'abct2326-innate-adaptive': sch('innateAdaptive'),
  'abct2326-immune-adaptive': sch('immuneAdaptive'),

  /* --- HTI17103 radiation science ----------------------------------- */
  'hti17103-what-is-radiography': sch('radiographyRoles'),
  'hti17103-ionizing-vs-nonionizing': sch('emSpectrum'),
  'hti17103-modality-detail': sch('modalities'),
  'hti17103-modality-best-use': sch('modalityBestUse'),
  'hti17103-radioprotection': sch('radioprotection'),
  'hti17103-radiation-therapy': sch('radiotherapyPath'),
  'hti17103-department-and-request': sch('requestForm'),
};

/* ------------------------------------------------------------------ *
 * Resolver
 * ------------------------------------------------------------------ */

export function visualFor(item) {
  if (!item) return null;
  const explicit = ITEM_VISUALS[item.id];
  if (explicit) return withFile(explicit);

  if (item.type === 'id3d' && item.boneId && BONE_MESHES[item.boneId]) {
    return withFile({
      kind: 'model', layer: 'skeleton', meshes: BONE_MESHES[item.boneId], label: item.title,
      caption: 'The bone itself, lifted out of the rest of the skeleton. Rotate it and find the landmarks named in the key facts.',
    });
  }
  if (item.type === 'structure' && item.structureSet) {
    const set = STRUCTURE_SETS[item.structureSet];
    if (set) {
      const layer = set.model || 'skeleton';
      return withFile({
        kind: 'model', layer, meshes: set.members.map((x) => x.mesh), label: set.label,
        caption: `All ${set.members.length} structures in the set, in place. Tap each one and name it before you open the list.`,
        ghostBody: layer !== 'skeleton',
      });
    }
  }
  if (item.type === 'movement' && item.movementId) {
    const mv = JOINT_MOVEMENTS[item.movementId];
    if (mv) {
      return withFile({
        kind: 'model', layer: 'skeleton',
        meshes: [...(mv.moves || []), ...(mv.fixed || [])], label: mv.label || item.title,
        caption: 'The bones this movement involves — the moving ones and the fixed reference together. Drive the movement itself from the studio.',
      });
    }
  }
  if (item.type === 'diagram') {
    const key = /vertebra/.test(item.id) ? 'vertebra' : /heart/.test(item.id) ? 'heart' : null;
    if (key && DIAGRAMS[key]) return { kind: 'labelled', id: key };
  }
  return generatedFor(item);
}

/*
 * Generated visuals.
 *
 * Not filler. A sequence item already carries its ordered steps and a matching
 * item already carries its pairs — both sourced, both currently rendered as
 * prose. Drawing them is a change of form, not of content, so there is nothing
 * here to invent or to get wrong.
 */
export function generatedFor(item) {
  const practice = item.practice || [];
  const seq = practice.find((q) => q.type === 'sequence' && q.items && q.items.length);
  if (seq) return { kind: 'generated', form: 'flow', steps: seq.items, label: item.title };

  const pairs = practice.find((q) => q.type === 'matching' && q.pairs && q.pairs.length);
  if (pairs) return { kind: 'generated', form: 'grid', pairs: pairs.pairs, label: item.title };

  const facts = (item.lesson && item.lesson.keyFacts) || [];
  if (item.type === 'comparison' && item.memory && item.memory.comparison) {
    return { kind: 'generated', form: 'contrast', text: item.memory.comparison, facts: facts.slice(0, 6), label: item.title };
  }
  if (facts.length) return { kind: 'generated', form: 'facts', facts: facts.slice(0, 8), label: item.title };
  return null;
}

function withFile(spec) {
  if (spec.kind !== 'model') return spec;
  return { ...spec, file: LAYER_FILES[spec.layer] || null };
}

/* ------------------------------------------------------------------ *
 * Plates
 *
 * A fourth kind, and the only one whose pictures were not made here.
 *
 * The 3D layers show you where a structure is; a schematic shows you a
 * mechanism. Neither draws the thing an anatomy plate draws — a considered,
 * labelled cross-section by someone who was looking at the specimen. So five
 * of those are bundled, chosen to sit against the items whose new material is
 * exactly what the plate shows: the nephron's vascular supply, the branching
 * of the bronchial tree, the accessory organs behind the stomach, the cusps of
 * the aortic valve, the heart sitting between the lungs.
 *
 * Every one is from Gray's Anatomy of the Human Body, 1918 edition, and every
 * one is in the PUBLIC DOMAIN — verified through the Wikimedia Commons API
 * before download, not assumed. They are the only files in this app fetched
 * from the internet, they are stored locally so the app stays offline-first,
 * and the app credits them on the picture rather than in a footnote.
 *
 * They illustrate; they do not source. Every factual claim on an item still
 * traces to the supplied lecture material, and a 1918 plate never overrides a
 * 2019 lecture slide where the two disagree.
 * ------------------------------------------------------------------ */

export const PLATES = {
  'abct2326-renal-nephron': {
    file: 'nephron-tubule.png',
    title: 'Scheme of renal tubule and its vascular supply',
    caption: 'The tubule and its blood supply drawn together — the second journey the lecture adds alongside the tubular one.',
    intro: 'The 1918 scheme names the tubule in full — useful because the figure above leaves the distal segments unlabelled. Some names are archaic; the key gives the modern term. The zones run down the right side: cortex, boundary zone, medulla.',
    key: [
      { mark: 'Glomerular capsule', name: 'Bowman’s capsule — the start of the tubule' },
      { mark: '1st convoluted / spiral tubule', name: 'Proximal convoluted tubule' },
      { mark: "Henle's loop — descending & ascending limb", name: 'The loop of Henle' },
      { mark: '2nd convoluted / irregular tubule', name: 'Distal convoluted tubule' },
      { mark: 'Junctional & collecting tubule', name: 'Where the nephron joins the collecting duct system' },
      { mark: 'Duct of Bellini', name: 'The papillary (collecting) duct, opening at the renal papilla' },
      { mark: 'Afferent / efferent vessel', name: 'The arterioles into and out of the glomerulus' },
      { mark: 'Arteriæ rectæ', name: 'Vasa recta — the straight vessels running alongside the loop' },
      { mark: 'Cortical / boundary / medullary', name: 'The kidney zones the tubule passes through' },
    ],
  },
  'abct2326-resp-pathway': {
    file: 'bronchi-bronchioles.png',
    title: 'Bronchi and bronchioles',
    caption: 'The branching order as an actual tree, lungs separated and tissue cut away.',
    intro: 'The bronchial tree with the lung tissue dissected away, so the branching the lesson asks you to recite is visible as a real tree — the trachea dividing into main bronchi, then the branches feeding each lobe.',
    key: [
      { mark: 'Right lung — upper / middle / lower lobe', name: 'Three lobes; the branching divides to match' },
      { mark: 'Left lung — upper / lower lobe', name: 'Two lobes — the left gives up a lobe to make room for the heart' },
      { mark: 'Primary / secondary bronchi', name: 'Main bronchi to each lung, then lobar bronchi to each lobe' },
    ],
  },
  'abct2326-digestive-pathway': {
    file: 'pancreas-duodenum.png',
    title: 'The pancreas and duodenum from behind',
    caption: 'Accessory organs in place: the pancreas delivering into the tube without food ever passing through it.',
    intro: 'The pancreas lying against the duodenum, seen from behind — the point being how an accessory organ works: it sits against the gut tube and delivers into it through a duct, without food ever passing through the pancreas itself.',
    key: [
      { mark: 'Duodenum', name: 'First part of the small intestine — part of the tract food travels through' },
      { mark: 'Common bile duct', name: 'Carries bile from the liver and gallbladder into the duodenum — the accessory-organ delivery route' },
      { mark: 'Pancreas', name: 'Exocrine cells secrete buffers and enzymes into the duodenum; endocrine cells secrete hormones' },
      { mark: 'Coeliac / superior mesenteric artery', name: 'The two arteries supplying this region', beyond: true },
      { mark: 'Portal vein', name: 'Carries absorbed nutrients from the gut to the liver', beyond: true },
      { mark: 'Area for spleen / left kidney / diaphragm', name: 'Impressions where neighbouring organs press on the pancreas', beyond: true },
    ],
  },
  'abct2326-cvs-heart-structure': {
    file: 'aortic-valve-cusps.png',
    title: 'The three cusps of the aortic valve',
    caption: 'A semilunar valve looked at face on, with the sinuses of Valsalva and the coronary origins.',
    intro: 'A semilunar valve looked at face-on — the aortic valve from above, its three cusps laid open. This is what “semilunar” means: three half-moon pockets that fill and seal under the back-pressure of the aorta.',
    key: [
      { mark: 'Anterior / right posterior / left posterior valve', name: 'The three semilunar cusps of the aortic valve' },
      { mark: 'Bicuspid valve', name: 'The mitral (left atrioventricular) valve, seen behind — held shut by chordae tendineae and papillary muscles' },
      { mark: 'Wall of left ventricle', name: 'The thick chamber whose exit this valve guards' },
      { mark: 'Aortic sinus', name: 'The pocket (sinus of Valsalva) behind each cusp that helps it close', beyond: true },
      { mark: 'Lunula / nodulus', name: 'The thin edge and the central thickening where the cusps meet', beyond: true },
      { mark: 'Origins of coronary arteries', name: 'The coronary arteries arise from two of the aortic sinuses', beyond: true },
    ],
  },
  'hss2011-m1-lungs-airway': {
    file: 'heart-and-lungs.png',
    title: 'Front view of heart and lungs',
    caption: 'What a PA chest projection is flattening: the heart sitting between the lungs.',
    intro: 'The heart in place between the lungs, the pericardium opened — what a PA chest projection flattens onto one plane. The lungs sit against the sides of the heart; the great vessels leave from the top.',
    key: [
      { mark: 'Right lung / Left lung', name: 'Against the sides of the heart; the pleura covering them is what this lesson is about' },
      { mark: 'Trachea', name: 'Descends in the midline, dividing behind the arch of the aorta' },
      { mark: 'Arch of aorta / ascending aorta', name: 'Leaving the left ventricle, arching over the left main bronchus', beyond: true },
      { mark: 'Pulmonary artery', name: 'Leaving the right ventricle toward the lungs', beyond: true },
      { mark: 'Superior vena cava', name: 'Returning blood to the right atrium', beyond: true },
      { mark: 'Right ventricle / Left ventricle', name: 'The right ventricle forms most of the front of the heart', beyond: true },
      { mark: 'Cut edge of pericardium', name: 'The sac has been opened to show the heart', beyond: true },
    ],
  },
};

/* One credit line, one licence, one origin — true of all five. */
export const PLATE_CREDIT = {
  work: 'Gray\u2019s Anatomy of the Human Body, 20th US edition, 1918',
  licence: 'Public domain',
  via: 'Wikimedia Commons',
  note: 'Public-domain illustration, not from your supplied sources. It is here to be looked at; the facts on this item come from the lecture material cited above.',
};

export function plateFor(item) {
  const p = PLATES[item && item.id];
  return p ? { ...p, ...PLATE_CREDIT, src: 'assets/plates/' + p.file } : null;
}
