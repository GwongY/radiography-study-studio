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
import { STRUCTURE_SETS, JOINT_MOVEMENTS } from './structures.js';

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

function boneItem(record) {
  const region = REGIONS.find((r) => r.id === record.region);
  const regionLabel = region ? region.label : record.region;
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
    sourceRefs: (REGION_SOURCES[record.region] || [{ ref: 'hss.vocab', location: 'Glossary' }])
      .concat(record.radiographyImportance ? [{ ref: null, location: 'Radiography study note authored by this app — not a claim from the supplied sources', authored: true }] : []),
  };
}

export const BONE_ITEMS = ANATOMY_DATABASE.map(boneItem);

/* ------------------------------------------------------------------ *
 * Structure-set items — tap-to-identify with a three-state reveal
 * ------------------------------------------------------------------ */

function structureItem(set) {
  const groups = [...new Set(set.members.map((mem) => mem.group))];
  const listing = set.members.map((mem) => `${mem.label}${mem.note ? ` — ${mem.note}` : ''}`);
  return {
    id: `hss2011-structures-${set.id}`,
    subject: set.subject, unit: set.unit, type: 'structure',
    title: set.label,
    tags: ['osteology', '3d'],
    /* Generated structure questions keep their own prompts; item-level Learn hooks were removed. */
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
    sourceRefs: set.sourceRefs,
  };
}

export const STRUCTURE_ITEMS = Object.values(STRUCTURE_SETS).map(structureItem);

/* ------------------------------------------------------------------ *
 * Movement items — generated from JOINT_MOVEMENTS
 * ------------------------------------------------------------------ */

function movementItem(mv) {
  return {
    id: `hss2011-movement-${mv.id}`,
    subject: mv.subject, unit: mv.unit, type: 'movement',
    title: mv.label,
    tags: ['joints', 'movement', '3d'],
    movementId: mv.id,
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
    sourceRefs: mv.sourceRefs,
  };
}

export const MOVEMENT_ITEMS = Object.values(JOINT_MOVEMENTS).map(movementItem);
