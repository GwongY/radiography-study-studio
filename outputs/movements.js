/*
 * Joint movements the viewer can drive — the data, and nothing else.
 *
 * The skeleton has no skin and no animation track, so a movement is a rigid
 * rotation of named bones about a joint axis (studio/live-physiology.js
 * startMovement). Pivot and axis are resolved at run time from the bones'
 * bounding boxes, never as coordinates, because the model is rescaled on load.
 *
 * Every name shown is a term the 2026 HSS2011 slides use, and `cite` says
 * where: work/movement-check.mjs holds each `match` against the committed page
 * text (work/source-text.json), the same comparison revision-check uses, and
 * that every bone named here is a skeleton mesh. No teaching prose: a name,
 * the joint, the two ends of the range and the slide page.
 *
 * Restored on 2026-10-20 from the retired corpus (235c93f
 * outputs/study/corpus/structures.js, JOINT_MOVEMENTS). Opposition of the
 * thumb was left out: no 2026 slide names it (only the older L1 overview).
 */

/* Every bone of the hand: work/movement-check.mjs fails if one the GLB has is missing. */
const HAND = ['Scaphoid bone', 'Lunate bone', 'Triquetrum bone', 'Pisiform bone', 'Trapezium bone', 'Trapezoid bone',
  'Capitate bone', 'Hamate bone', 'First metacarpal bone', 'Second metacarpal bone', 'Third metacarpal bone',
  'Fourth metacarpal bone', 'Fifth metacarpal bone',
  ...['first', 'second', 'third', 'fourth', 'fifth'].flatMap((f) => ['Proximal', ...(f === 'first' ? [] : ['Middle']), 'Distal']
    .map((row) => `${row} phalanx of ${f} finger of hand`))];

export const MOVEMENTS = [
  {
    id: 'supination', label: 'Supination and pronation', joint: 'Radioulnar joint', side: 'right',
    moves: ['Radius', ...HAND],
    fixed: ['Ulna', 'Humerus'],
    pivot: { mesh: 'Radius', at: 'proximal' },
    /* sign: pronation carries the thumb forward and then medially, the radius crossing in front of the ulna */
    axis: { from: { mesh: 'Radius', at: 'proximal' }, to: { mesh: 'Ulna', at: 'distal' } }, sign: -1,
    /* The model stands in the anatomical position, palms forward: supinated. So the
       model's own pose (0) is supination, and the slider turns the radius over the ulna. */
    range: [0, 150],
    ends: ['Supination', 'Pronation'],
    cite: [
      { ref: 'hss.ul.2026', page: 10, match: 'rotational movement (radioulnar joint) Supination Pronation' },
      { ref: 'hss.move.2026', page: 9, match: 'palm facing upwards' },
    ],
  },
  {
    id: 'elbowFlexion', label: 'Flexion and extension', joint: 'Elbow joint', side: 'right',
    moves: ['Radius', 'Ulna', ...HAND],
    fixed: ['Humerus', 'Scapula'],
    pivot: { mesh: 'Ulna', at: 'proximal' },
    /* sign: which way round the axis is flexion, measured in a browser (the hand goes forward and up) */
    axis: { vector: [1, 0, 0] }, sign: -1,
    range: [0, 140],
    ends: ['Extension', 'Flexion'],
    cite: [
      { ref: 'hss.msk.2026', page: 21, match: 'Elbow joints e.g. flexion and extension' },
    ],
  },
  {
    id: 'shoulderAbduction', label: 'Abduction and adduction', joint: 'Glenohumeral joint', side: 'right',
    moves: ['Humerus', 'Radius', 'Ulna', ...HAND],
    fixed: ['Scapula', 'Clavicle'],
    pivot: { mesh: 'Humerus', at: 'proximal' },
    /* sign: abduction takes the right hand away from the midline, not across it */
    axis: { vector: [0, 0, 1] }, sign: -1,
    range: [0, 90],
    ends: ['Adduction', 'Abduction'],
    cite: [
      { ref: 'hss.ul.2026', page: 7, match: 'abduction, adduction' },
      { ref: 'hss.move.2026', page: 8, match: 'body parts moving away from midline' },
    ],
  },
];

/* The Revise box these movements belong to (HSS2011 "Movement vocabulary"). */
export const MOVEMENT_REVISE = { subject: 'HSS2011', id: 'movements' };

export function movementById(id) { return MOVEMENTS.find((m) => m.id === id) || null; }
