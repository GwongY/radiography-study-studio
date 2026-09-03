/*
 * Items generated rather than authored: one per canonical bone record, one
 * per structure set, one per joint movement. The generators are here so the
 * hand-written corpus stays hand-written.
 *
 * Split out of study-data.js in phase 2026-09-01. outputs/study-data.js is
 * the barrel every importer still uses; nothing imports this file directly
 * except its siblings.
 */
import { ANATOMY_DATABASE, REGIONS } from '../../anatomy-data.js';
const BONE_REGIONS = REGIONS.filter((r) => r.bones !== false);
import { STRUCTURE_SETS, structureSet, JOINT_MOVEMENTS } from './structures.js';

/* ------------------------------------------------------------------ *
 * Osteology items generated from the canonical bone records
 *
 * The bone names, landmarks, sides and articulations are all covered by
 * the HSS2011 module sources below. The radiography positioning note on
 * each bone record is app-authored study framing, not a source claim,
 * and is tagged as such.
 * ------------------------------------------------------------------ */

const REGION_SOURCES = {
  skull: [{ ref: 'hss.4.2', location: 'Head and neck — skull and cervical spine' }, { ref: 'hss.vocab', location: 'Glossary — skull entries' }],
  spine: [{ ref: 'hss.m0.1718', location: 'L1 p15–32 vertebral column, curvatures, cervical and lumbar vertebrae' }, { ref: 'hss.vocab', location: 'Glossary — vertebral entries' }],
  thorax: [{ ref: 'hss.1.3', location: 'Regional anatomy of the thorax — thoracic cage' }, { ref: 'hss.m0.1718', location: 'L1 p34–35 a typical rib, rib articulations' }],
  upper_limb: [{ ref: 'hss.4.3', location: 'Anatomy of the upper limb — bones, Figs 8-2 to 8-5' }, { ref: 'hss.m0.1718', location: 'L1 p36–53 shoulder, elbow, wrist and hand' }],
  pelvis: [{ ref: 'hss.4.3', location: 'Hip and gluteal region — pelvic girdle' }, { ref: 'hss.revans', location: 'Module 4.3, Fill-in-blanks 1' }],
  lower_limb: [{ ref: 'hss.4.3', location: 'Anatomy of the lower limb — bones, Figs 8-11 to 8-13' }, { ref: 'hss.m0.1718', location: 'L1 p54–56 hip and knee joints' }],
};

/* App-authored memory hooks. Every entry is a study aid, never a fact claim. */
export const BONE_HOOKS = {
  cranium: { wordOrigin: 'Greek kranion — helmet, skull.', mnemonic: 'CRANium is the cap that holds the brain.' },
  mandible: { wordOrigin: 'Latin mandere — to chew.', mnemonic: 'MANdible = MAN-chews. It is the one skull bone that moves.' },
  cervical: { wordOrigin: 'Latin cervix — neck.', mnemonic: 'Seven vertebrae, breakfast at 7. C1 Atlas holds the head up; C2 Axis is the pin it turns on.' },
  thoracic: { wordOrigin: 'Greek thorax — chest armour.', mnemonic: 'Twelve vertebrae, lunch at 12 — one for each pair of ribs.' },
  lumbar: { wordOrigin: 'Latin lumbus — loin.', mnemonic: 'Five large load-bearing vertebrae, dinner at 5. The bodies are the biggest because they carry the most.' },
  sacrum: { wordOrigin: 'Latin os sacrum — sacred bone.', mnemonic: 'The sacred wedge is the keystone locking the pelvic ring together.' },
  coccyx: { wordOrigin: 'Greek kokkyx — cuckoo.', mnemonic: 'Shaped like a cuckoo’s beak — the tail remnant left behind.' },
  sternum: { wordOrigin: 'Greek sternon — chest.', mnemonic: 'Manubrium, body, xiphoid: handle, blade, tip — the sternum is a sword pointing down.' },
  ribs: { chunking: 'Ribs 1–7 attach to the sternum alone, 8–10 share a cartilage, 11–12 attach to nothing in front.', mnemonic: '1–7 go alone, 8–10 carpool, 11–12 walk free.' },
  clavicle: { wordOrigin: 'Latin clavicula — little key.', mnemonic: 'The only horizontal long bone: an S-shaped key bolting the arm onto the sternum.' },
  scapula: { visualCue: 'A flat triangle sliding on the back of the ribcage, with a shallow socket. Shallow socket means mobile but unstable.', comparison: 'Glenoid cavity is shallow, the acetabulum is deep — that one difference explains why shoulders dislocate and hips do not.' },
  humerus: { mnemonic: 'The humerus carries the radial nerve in its spiral groove — the funny bone that is not funny when you hit it.', comparison: 'Trochlea meets the ulna, capitulum meets the radius. Capitulum and radius both have rounded heads.' },
  radius: { wordOrigin: 'Latin radius — spoke or rod.', mnemonic: 'The radius rotates over the ulna like a wheel spoke. It is the thumb-side bone, so it is lateral.' },
  ulna: { wordOrigin: 'Latin ulna — elbow.', mnemonic: 'ULna = yoUr eLbow side, the little-finger side. Its trochlear notch is the hinge.' },
  hand: { firstLetter: 'Carpals lateral to medial, proximal row then distal: Scaphoid, Lunate, Triquetrum, Pisiform, Trapezium, Trapezoid, Capitate, Hamate.', chunking: '8 carpals, 5 metacarpals, 14 phalanges.' },
  pelvis: { wordOrigin: 'Latin pelvis — basin.', mnemonic: 'A basin made of ilium, ischium and pubis: I stand on my Ilium, I Sit on my Ischium, and the Pubis is the front join.' },
  femur: { mnemonic: 'The longest and strongest bone, angling inward from hip to knee — that inward angle is the angle of inclination.' },
  patella: { wordOrigin: 'Latin patella — small pan or dish.', mnemonic: 'The largest sesamoid bone, riding in the groove like a dish in a rack. Base up, apex down.' },
  tibia: { wordOrigin: 'Latin tibia — flute, shinbone.', mnemonic: 'TIBia Takes the weight. Medial bone, medial malleolus.' },
  fibula: { wordOrigin: 'Latin fibula — pin or buckle.', mnemonic: 'The thin lateral pin, ending in the lateral malleolus.' },
  foot: { chunking: 'Tarsals, metatarsals, phalanges — 7, 5, 14. Talus on top of calcaneus takes the whole load.' },
};

function boneItem(record) {
  const region = REGIONS.find((r) => r.id === record.region);
  const regionLabel = region ? region.label : record.region;
  const hooks = BONE_HOOKS[record.id] || {};
  const sideText = record.side === 'paired' ? 'Paired — there is a left and a right, so laterality is always part of the answer.' : 'Midline or bilateral — it is not a left/right pair.';
  const practice = [
    { type: 'typed', prompt: `Which bone or bone group has these landmarks: ${record.landmarks.join(', ')}?`, accept: [record.canonicalName.toLowerCase(), ...record.aliases.map((a) => a.toLowerCase())],
      explanation: `${record.canonicalName}. Its landmarks are ${record.landmarks.join(', ')}.` },
    /* Bone regions only. 'Abdomen & pelvis' is a region of the body, not a
       set of bones (see REGIONS), and offering it here would put a second
       defensible answer beside 'Pelvis' for every bone of the pelvic ring. */
    { type: 'mcq', prompt: `In which region does the ${record.canonicalName.toLowerCase()} sit?`, options: BONE_REGIONS.map((r) => r.label), answer: BONE_REGIONS.findIndex((r) => r.id === record.region),
      explanation: `${record.canonicalName} belongs to the ${regionLabel.toLowerCase()}.` },
    { type: 'matching', prompt: `Match the ${record.canonicalName.toLowerCase()} to what it articulates with.`,
      pairs: record.articulations.slice(0, 4).map((a) => [record.canonicalName, a]),
      explanation: `${record.canonicalName} articulates with ${record.articulations.join(', ')}.` },
  ];
  if (record.side === 'paired') {
    practice.push({ type: 'laterality', prompt: `Identify the side of the ${record.canonicalName.toLowerCase()} shown on the 3D model.`, boneId: record.id,
      explanation: `${record.canonicalName} is a paired bone. Use the model’s orientation, not the screen, to decide the side: the model faces you, so its left is on your right.` });
  }
  if (record.commonConfusions && record.commonConfusions.length) {
    const confusable = record.commonConfusions[0];
    const other = ANATOMY_DATABASE.find((r) => r.id === confusable || r.canonicalName.toLowerCase() === String(confusable).toLowerCase());
    practice.push({ type: 'comparison', prompt: `How do you tell the ${record.canonicalName.toLowerCase()} apart from the ${String(confusable).toLowerCase()}?`,
      options: [
        `By its landmarks: ${record.landmarks.slice(0, 2).join(' and ')}`,
        'By its colour on the model',
        'They cannot be distinguished',
        'By counting the total number of bones',
      ], answer: 0,
      explanation: `The reliable discriminator is the landmark set. ${record.canonicalName} carries ${record.landmarks.join(', ')}${other ? `, whereas the ${other.canonicalName.toLowerCase()} carries ${other.landmarks.slice(0, 3).join(', ')}` : ''}.` });
  }
  practice.push({ type: 'id3d', prompt: `Find the ${record.canonicalName.toLowerCase()} on the 3D skeleton.`, boneId: record.id,
    explanation: `${record.canonicalName} sits in the ${regionLabel.toLowerCase()}. If the 3D model is unavailable, answer from the landmark list instead: ${record.landmarks.join(', ')}.` });
  if (record.landmarks.length >= 2) {
    practice.push({ type: 'landmark', prompt: `Name the landmarks of the ${record.canonicalName.toLowerCase()}.`, boneId: record.id, accept: record.landmarks.map((l) => l.toLowerCase()),
      explanation: `Landmarks: ${record.landmarks.join(', ')}.` });
  }
  return {
    id: `hss2011-bone-${record.id}`,
    subject: 'HSS2011', unit: 'hss.osteo', type: 'id3d',
    title: record.canonicalName,
    tags: ['osteology', 'bone', record.region],
    boneId: record.id,
    lesson: {
      explanation: `${record.canonicalName} — ${regionLabel.toLowerCase()}. ${sideText} Landmarks to know: ${record.landmarks.join(', ')}. It articulates with ${record.articulations.join(', ')}.` +
        (record.aliases.length ? ` Also called ${record.aliases.join(', ')}.` : ''),
      keyFacts: [
        `Region: ${regionLabel}.`,
        `Side: ${record.side}.`,
        `Landmarks: ${record.landmarks.join(', ')}.`,
        `Articulates with: ${record.articulations.join(', ')}.`,
        `Commonly confused with: ${(record.commonConfusions || []).join(', ') || 'nothing in particular'}.`,
      ],
      prerequisites: ['hss2011-osteo-axial-appendicular'],
      examples: [],
      studyNote: record.radiographyImportance,
    },
    memory: hooks,
    practice,
    application: [
      { type: 'scenario', prompt: `You are handed an isolated ${record.canonicalName.toLowerCase()}${record.side === 'paired' ? ' and asked which side it is from' : ' and asked to place it in the skeleton'}. What do you look at first?`,
        model: record.side === 'paired'
          ? `Find an asymmetric landmark — ${record.landmarks.slice(0, 2).join(' or ')} — and work out which way it must face when the bone is in the anatomical position. Side is decided by orientation of the landmarks, never by which hand you are holding it in.`
          : `Look at its articulations: it must meet ${record.articulations.join(' and ')}, and only one place in the skeleton offers those neighbours. Landmarks (${record.landmarks.slice(0, 2).join(', ')}) then confirm the orientation.`,
        rubric: record.side === 'paired'
          ? ['Names a specific asymmetric landmark', 'Refers the decision to the anatomical position']
          : ['Uses articulations to locate it', 'Uses landmarks to orient it'] },
    ],
    commonMistakes: (record.commonConfusions || []).map((c) => `Mistaking it for the ${String(c).toLowerCase()} — compare landmark sets rather than overall shape.`)
      .concat(record.side === 'paired' ? ['Calling the side from the screen rather than from the model’s own left and right.'] : []),
    skills: [
      `The landmark set, not the silhouette, is the discriminator: ${(record.commonConfusions || []).length ? `${record.canonicalName} carries ${record.landmarks.slice(0, 2).join(' and ')} — the very landmarks that separate it from the ${String(record.commonConfusions[0]).toLowerCase()} — so two bones that look alike are told apart by their landmark lists, never by overall shape` : `${record.canonicalName} is known by carrying ${record.landmarks.slice(0, 2).join(' and ')}${record.landmarks.length > 2 ? `, with ${record.landmarks.slice(2).join(', ')} confirming` : ''}, and lookalike bones are told apart by their landmark lists, never by overall shape`}.`,
      record.side === 'paired'
        ? 'A paired bone\'s side is a consequence of the anatomical position, not of how you happen to hold it: find an asymmetric landmark and ask which way it must face when the body stands palms-forward — and the model faces you, so its left is on your right.'
        : `The articulations are an address, not an afterthought: a bone that must meet ${record.articulations.slice(0, 2).join(' and ')} fits exactly one place in the skeleton, so the neighbour list locates the bone before any shape judgement does.`,
    ],
    selfCheck: `From a blank page: the region, the side (${record.side}), every landmark, and the full articulation list for the ${record.canonicalName.toLowerCase()}${(record.commonConfusions || []).length ? `, told apart from the ${String(record.commonConfusions[0]).toLowerCase()} by landmarks alone` : ''}.`,
    sourceRefs: (REGION_SOURCES[record.region] || [{ ref: 'hss.vocab', location: 'Glossary' }])
      .concat(record.radiographyImportance ? [{ ref: null, location: 'Radiography study note authored by this app — not a claim from the supplied sources', authored: true }] : []),
  };
}

export const BONE_ITEMS = ANATOMY_DATABASE.map(boneItem);

/* ------------------------------------------------------------------ *
 * Structure-set items — tap-to-identify with a three-state reveal
 * ------------------------------------------------------------------ */

const STRUCTURE_HOOKS = {
  carpals: {
    hook: 'Two rows of four, lateral to medial: proximal is Scaphoid, Lunate, Triquetrum, Pisiform; distal is Trapezium, Trapezoid, Capitate, Hamate. Learn the row first — almost every carpal question is which row a bone is in.',
    firstLetter: 'Proximal row then distal row, lateral to medial: Scaphoid, Lunate, Triquetrum, Pisiform — Trapezium, Trapezoid, Capitate, Hamate.',
    chunking: 'Four and four, two rows. Almost every carpal question is really asking which row a bone is in, so learn the rows as units before the individual bones.',
    comparison: 'TrapeziuM sits under the thuMb; the trapezoid is its neighbour. That one letter settles the pair people most often swap.',
    location: 'Start at the thumb side of the wrist crease and work across, then step down a row and come back. Same path every time.',
  },
  tarsals: {
    hook: 'Three layers, not a row: talus on calcaneus takes the load, navicular sits in front of the talus, cuboid is on the lateral side, and three cuneiforms fan forward to the toes.',
    location: 'Build it in layers rather than a row: talus on top of calcaneus takes the load, navicular in front of the talus, cuboid on the lateral side, three cuneiforms fanning forward.',
    comparison: 'Carpals are in the wrist, tarsals in the ankle. If a question says "collective name for wrist bones", the answer is carpal — tarsal is the distractor.',
    chunking: 'Seven bones, four groups: two big weight-bearers, one navicular, one cuboid, three cuneiforms.',
  },
  skullBones: {
    hook: 'Split cranial from facial first: the cranial vault and floor are frontal, parietals, temporals, occipital, sphenoid and ethmoid; the facial bones hang off the front, with the mandible the only movable one.',
    chunking: 'Split cranial from facial first. Six cranial bones form the vault and floor; the facial bones hang off the front.',
    location: 'Trace it as a face: forehead is frontal, sides are parietal then temporal, back is occipital, cheek is zygomatic, upper jaw is maxilla, lower jaw is mandible.',
    comparison: 'Sphenoid and ethmoid are the two you cannot see from outside — both sit deep in the floor of the cranium, which is why they are the two most often missed.',
  },
  vertebralRegions: {
    hook: 'Five regions top to bottom: cervical (7), thoracic (12), lumbar (5), then two fused — sacrum and coccyx. Breakfast at 7, lunch at 12, dinner at 5.',
    mnemonic: 'Breakfast at 7, lunch at 12, dinner at 5 — cervical 7, thoracic 12, lumbar 5.',
    comparison: 'Atlas carries the world and gives you the nod; Axis is the pin and gives you the shake.',
    chunking: 'Five regions top to bottom, two of them fused: cervical, thoracic, lumbar, then sacrum and coccyx.',
  },
  heartChambers: {
    hook: 'Two atria receive, two ventricles pump — the right side sends blood to the lungs, the left to the body. The AV valves (tricuspid on the right, bicuspid on the left) keep it one-way and are held shut by papillary muscle; the pulmonary valve guards the exit to the lungs.',
  },
  greatVessels: {
    hook: 'Follow the loop: the venae cavae bring blood back, the pulmonary trunk and arteries carry it to the lungs, the aortic arch carries it to the body — and the coronary sinus and right coronary artery feed the heart’s own muscle.',
  },
  airwayTree: {
    hook: 'A tree, not a list: one trachea splits into two main bronchi, then lobar bronchi, one per lobe. The right lung has three lobes, the left has two — the heart takes that space. The pleura wraps the whole thing.',
  },
  urinaryTract: {
    hook: 'Follow the urine: the kidney makes it, the renal pelvis and ureter drain it, the bladder stores it, the urethra lets it out. The suprarenal gland sits on top but is endocrine, not part of this tract.',
  },
  digestiveTract: {
    hook: 'One tube with two calibres: the small intestine (duodenum, jejunum) does the absorbing, the large intestine frames it around the edge and carries the appendix; the liver, gallbladder and pancreas are accessory organs that pour their secretions into the tube.',
  },
  rotatorCuff: {
    hook: 'Four cuff muscles hold the humeral head in the socket — supraspinatus, infraspinatus, teres minor, subscapularis. Supraspinatus starts abduction, deltoid powers it, trapezius finishes it; latissimus and pectoralis major are the big girdle movers.',
  },
  cranialNerves: {
    hook: 'Learn them by job, not by number: smell (I), sight (II), hearing and balance (VIII) are special sense; IV and VI move the eye; V and VII run the face; IX and X reach the pharynx and organs; XII moves the tongue.',
  },
  brainAndCsf: {
    hook: 'One vertical axis: the brainstem (midbrain, pons, medulla) carries the core, the ventricles run CSF down its middle (lateral → third → aqueduct → fourth), the forebrain (corpus callosum, thalamus) caps it, and the spinal cord trails below.',
  },
  kneeJoint: {
    hook: 'One capsule, two cruciate ligaments inside it, two menisci as shock absorbers — and the hip capsule alongside for comparison: the same parts, but a deeper, more stable socket.',
  },
};

function structureItem(set) {
  const hooks = STRUCTURE_HOOKS[set.id] || {};
  const groups = [...new Set(set.members.map((mem) => mem.group))];
  const listing = set.members.map((mem) => `${mem.label}${mem.note ? ` — ${mem.note}` : ''}`);
  const keyFactsGroups = set.members.reduce((acc, mem) => {
    const g = mem.group || 'Ungrouped';
    let bucket = acc.find((b) => b.group === g);
    if (!bucket) { bucket = { group: g, items: [] }; acc.push(bucket); }
    bucket.items.push(`${mem.label}${mem.note ? ` — ${mem.note}` : ''}`);
    return acc;
  }, []);
  return {
    id: `hss2011-structures-${set.id}`,
    subject: set.subject, unit: set.unit, type: 'structure',
    title: set.label,
    tags: ['osteology', '3d'],
    structureSet: set.id,
    lesson: {
      explanation: `${set.label} — ${set.members.length} structures in ${groups.length} group${groups.length === 1 ? '' : 's'}: ${groups.join(', ')}. `
        + `Every one of these is a separately named mesh in the bundled skeleton, so you can rotate to it and tap it directly. `
        + `Work through the labelled view first, then the guided view with only ${set.anchors.length} anchor${set.anchors.length === 1 ? '' : 's'} left in, then the blank view where nothing is named.`
        + (set.paired ? ' These are paired structures, so the side is always part of the answer.' : ''),
      keyFacts: listing,
      keyFactsGroups,
      hook: hooks.hook || null,
      prerequisites: ['hss2011-osteo-axial-appendicular'],
      examples: [],
    },
    memory: hooks,
    practice: [
      { type: 'structure', prompt: `Name every structure in the set, working from the labelled view.`, setId: set.id, reveal: 'labelled',
        explanation: `Teaching view. All ${set.members.length} are named — read them in group order (${groups.join(' → ')}) and say each one out loud before moving on.` },
      { type: 'structure', prompt: `Only the anchors are named now. Identify the rest.`, setId: set.id, reveal: 'guided',
        explanation: `Guided view. ${set.anchors.map((a) => (set.members.find((mem) => mem.id === a) || {}).label).filter(Boolean).join(' and ')} stay labelled — everything else is worked out from their position relative to those.` },
      { type: 'structure', prompt: `Blank view. Identify all ${set.members.length}.`, setId: set.id, reveal: 'blank',
        explanation: `Test view. Nothing is named. If you can do this cold, the set is learned: ${listing.map((l) => l.split(' — ')[0]).join(', ')}.` },
      { type: 'typed', prompt: `How many structures are in the set "${set.label.toLowerCase()}"?`, accept: [String(set.members.length)],
        explanation: `${set.members.length}. Counting the set is the fastest check that you have not dropped one.` },
      { type: 'matching', prompt: 'Match each structure to the group it belongs to.',
        pairs: set.members.slice(0, 4).map((mem) => [mem.label, mem.group]),
        explanation: `Groups in this set: ${groups.join(', ')}. Knowing the group narrows any identification question before you look at shape.` },
    ],
    application: [
      { type: 'scenario', prompt: `You are shown one structure from this set in isolation, with no neighbours visible. What do you use to identify it, and what do you lose without the neighbours?`,
        model: `You fall back on the shape and any distinctive feature of that individual structure. What you lose is position, which is what the group and the ordering normally give you — ${groups.join(' and ')} are defined by where they sit relative to each other, so isolating a structure removes the most reliable clue.`,
        rubric: ['Names shape/individual features as the fallback', 'Identifies relative position as what is lost', 'Refers to the group structure of the set'] },
    ],
    commonMistakes: [
      `Learning the names as a flat list. This set has ${groups.length} group${groups.length === 1 ? '' : 's'} (${groups.join(', ')}), and the group is usually what a question is really testing.`,
      ...(set.paired ? ['Reading the side off the screen instead of the model’s own left and right.'] : []),
    ],
    skills: [
      `The flat list is the trap this set sets: it is really ${groups.length} group${groups.length === 1 ? '' : 's'} (${groups.join(', ')}), and the question behind most identification questions is which group — which position relative to the others — a member sits in. Naming a member without placing it is half an answer.`,
      set.paired
        ? 'Paired means the side is part of the name: every structure here exists twice, and the reliable side-cue is the model\'s own left and right — it faces you, so its left is on your right, never the screen edge.'
        : `Anchor logic is what holds the set together: the ${set.anchors.length} named anchor${set.anchors.length === 1 ? '' : 's'} (${set.anchors.map((a) => (set.members.find((mem) => mem.id === a) || {}).label).filter(Boolean).join(', ')}) are what every other member is reconstructed from — which is why a structure seen in isolation loses its most reliable clue, and only individual shape remains.`,
    ],
    selfCheck: `The blank view, cold: all ${set.members.length} named in group order, with the count used as the drop-check — if your list is shorter than ${set.members.length}, find which group you dropped before moving on.`,
    sourceRefs: set.sourceRefs,
  };
}

export const STRUCTURE_ITEMS = Object.values(STRUCTURE_SETS).map(structureItem);

/* ------------------------------------------------------------------ *
 * Movement items — generated from JOINT_MOVEMENTS
 * ------------------------------------------------------------------ */

const MOVEMENT_HOOKS = {
  supination: {
    mnemonic: 'You hold a bowl of SOUP in a supinated palm. Turn it over and you spill it — that is pronation.',
    comparison: 'The wrist does not rotate. If a movement turns the palm over, it happened at the radioulnar joints, and the hand only came along for the ride.',
    visualCue: 'Watch the radius cross over the ulna as you scrub the slider. That crossing IS pronation — there is nothing else to remember.',
  },
  elbowFlexion: {
    chunking: 'Hinge means one plane. If a question offers you two or three planes for the elbow, it is wrong before you read the rest.',
    location: 'The axis runs side to side through the trochlea. Put a finger on each epicondyle and that line is the hinge.',
  },
  shoulderAbduction: {
    firstLetter: 'The running order is Start, Lift, Rotate, Tilt — Supraspinatus, Deltoid, Infraspinatus and teres minor, Trapezius.',
    sequence: 'Abduction is a relay, not a single muscle. Supraspinatus only runs the first 15 degrees.',
    comparison: 'Ball-and-socket at the shoulder and at the hip both give three planes. The glenoid fossa is shallow, so the shoulder trades stability for this range.',
  },
  thumbOpposition: {
    mnemonic: 'Only a saddle joint can oppose. If a question mentions opposition, it is the thumb carpo-metacarpal joint every time.',
    comparison: 'Finger abduction is referenced to the middle finger; thumb movement is referenced to the palm. Different reference planes.',
  },
};

function movementItem(mv) {
  const stageNote = (mv.stages || []).map((s) => `${s.at}°: ${s.note}`);
  return {
    id: `hss2011-movement-${mv.id}`,
    subject: mv.subject, unit: mv.unit, type: 'movement',
    title: mv.label,
    tags: ['joints', 'movement', '3d'],
    movementId: mv.id,
    lesson: {
      explanation: `${mv.label} happens at the ${mv.joint.toLowerCase()}. ${mv.summary} `
        + `On the model you can drive it yourself: the bones that move are ${mv.moves.length === 1 ? 'one mesh' : `${mv.moves.length} meshes`}, rotating about an axis resolved from the bones themselves, while ${mv.fixed.join(' and ')} stay put as the reference.`,
      keyFacts: [
        `Joint: ${mv.joint}.`,
        `Range shown: ${mv.range[0]}° to ${mv.range[1]}°.`,
        `Moves: ${mv.moves.slice(0, 3).join(', ')}${mv.moves.length > 3 ? ` and ${mv.moves.length - 3} more` : ''}.`,
        `Held still for reference: ${mv.fixed.join(', ')}.`,
        ...stageNote,
      ],
      prerequisites: ['hss2011-joints-classification'],
      examples: [],
    },
    memory: MOVEMENT_HOOKS[mv.id] || {},
    practice: [
      { type: 'movement', prompt: `Drive ${mv.label.toLowerCase()} on the model and watch which bones move.`, movementId: mv.id,
        explanation: `${mv.summary} The bones held still — ${mv.fixed.join(' and ')} — are what makes the movement legible: without a fixed reference you cannot see what moved.` },
      { type: 'typed', prompt: `At which joint does ${mv.label.toLowerCase().replace(/ and .*/, '')} take place?`, accept: [mv.joint.toLowerCase(), mv.joint.toLowerCase().replace(/^(the|superior and inferior)\s+/, '')],
        explanation: `${mv.joint}. Naming the joint is worth as many marks as naming the movement, and it is the half people leave out.`,
        src: mv.sourceRefs[0] },
      { type: 'mcq', prompt: `Which bones stay still during ${mv.label.toLowerCase()}?`,
        options: [mv.fixed.join(' and '), mv.moves.slice(0, 2).join(' and '), 'Every bone in the limb moves together', 'None — the joint is fixed'], answer: 0,
        explanation: `${mv.fixed.join(' and ')} stay still. Movement is always relative: naming what did NOT move is half of describing what did.` },
    ],
    application: [
      { type: 'scenario', prompt: `Someone describes ${mv.label.toLowerCase()} without naming a joint. Why is that description incomplete, and what would you add?`,
        model: `A movement name alone does not say where it happened, and several joints can produce superficially similar motion. You would add that it takes place at the ${mv.joint.toLowerCase()}, and name the bones that stay fixed — ${mv.fixed.join(' and ')} — because a movement is only defined relative to something that did not move.`,
        rubric: ['States the movement name alone is ambiguous', `Names the ${mv.joint.toLowerCase()}`, 'Notes movement is relative to a fixed reference'] },
    ],
    commonMistakes: [
      `Naming the movement but not the joint. The Module 0 fill-in-blanks ask for the joint as often as the movement.`,
      ...(mv.id === 'supination' ? ['Attributing forearm rotation to the wrist. The wrist does not rotate; the radius does.'] : []),
      ...(mv.id === 'shoulderAbduction' ? ['Answering "deltoid" for the start of abduction. Supraspinatus initiates the first 15 degrees.'] : []),
    ],
    skills: [
      `A movement is defined by its stillness as much as its motion: ${mv.label.toLowerCase()} only means something against what stays fixed — ${mv.fixed.join(' and ')} — because the same motion against a different reference is a different movement. Naming the moving bones without the fixed ones is half an answer.`,
      `"${mv.label}" without a joint is the half-answer the fill-in-blanks price in: this one happens at the ${mv.joint.toLowerCase()}, and naming the joint is worth as many marks as naming the movement.${stageNote.length ? ` The stage marker carries the mechanism: ${stageNote[0]}.` : ''}`,
    ],
    selfCheck: `Drive it through the full ${mv.range[0]}°–${mv.range[1]}° range, then state the joint, the moving bones and the fixed references with the labels hidden.`,
    sourceRefs: mv.sourceRefs,
  };
}

export const MOVEMENT_ITEMS = Object.values(JOINT_MOVEMENTS).map(movementItem);
