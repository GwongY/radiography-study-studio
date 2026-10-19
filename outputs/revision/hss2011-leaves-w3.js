/*
 * HSS2011 · Week 3 leaves — pectoral girdle and upper limb.
 *
 * Read off Week 3_UL_2026_CKK_upload.pdf (hss.ul.2026), page by page. One row per
 * structure the page text names, in the slide's words; a structure only in a picture has
 * no row. Row kinds and fields: outputs/revision/leaves.js. Recipe:
 * docs/superpowers/plans/2026-10-19-revise-depth-w1-w3-w4.md.
 *
 * The jaw, shoulder, elbow and wrist joints already have Week 1 rows (hss2011-leaves-w1.js:
 * w1_j_tmj, w1_j_gh, w1_j_hu, w1_j_hr, w1_j_pru, w1_j_rc); bones here point at those ids.
 */
const UL = 'hss.ul.2026';

export const SOURCES = {
  [UL]: 'Week 3 upper-limb slides',
};

export const ROWS = [
/* ---------------- pectoral girdle (p2-5) ---------------- */
{ k: 'group', id: 'w3_pectoral', l: 'Pectoral girdle', parent: 'ul_bones', w: 3, line: 'connects the arm to the axial skeleton', src: [UL, 2] },
{ k: 'bone', id: 'w3_clavicle', l: 'Clavicle', parent: 'w3_pectoral', w: 3, line: 'appendicular skeleton; connects the arm to the manubrium', src: [UL, 2, 4] },
{ k: 'bone', id: 'w3_scapula', l: 'Scapula', parent: 'w3_pectoral', w: 3, joints: ['w1_j_gh'], src: [UL, 2, 4, 3] },
{ k: 'part', id: 'w3_glenoid', l: 'Glenoid cavity', parent: 'w3_scapula', w: 3, line: 'the head of the humerus articulates with it', src: [UL, 7] },
{ k: 'bone', id: 'w3_manubrium', l: 'Manubrium', parent: 'w3_pectoral', w: 3, src: [UL, 2] },
{ k: 'bone', id: 'w3_sternum', l: 'Sternum', parent: 'w3_pectoral', w: 3, src: [UL, 2] },

/* ---------------- arm (p6-7) ---------------- */
{ k: 'group', id: 'w3_arm', l: 'Arm', parent: 'ul_bones', w: 3, src: [UL, 3] },
{ k: 'bone', id: 'w3_humerus', l: 'Humerus', parent: 'w3_arm', w: 3, joints: ['w1_j_gh', 'w1_j_hu', 'w1_j_hr'], src: [UL, 6, 2] },
{ k: 'part', id: 'w3_hum_head', l: 'Head of humerus', parent: 'w3_humerus', w: 3, line: 'articulates with the glenoid cavity of the scapula', src: [UL, 7] },
{ k: 'part', id: 'w3_hum_neck', l: 'Neck', parent: 'w3_humerus', w: 3, line: 'proximal, with the head and tubercle', src: [UL, 6] },
{ k: 'part', id: 'w3_hum_tubercle', l: 'Tubercle, tuberosity', parent: 'w3_humerus', w: 3, line: 'proximal landmarks to identify', src: [UL, 6] },
{ k: 'part', id: 'w3_hum_shaft', l: 'Shaft', parent: 'w3_humerus', w: 3, src: [UL, 6] },
{ k: 'part', id: 'w3_hum_condyle', l: 'Condyle', parent: 'w3_humerus', w: 3, line: 'smooth: trochlea and capitulum', src: [UL, 6] },
{ k: 'part', id: 'w3_hum_trochlea', l: 'Trochlea', parent: 'w3_hum_condyle', w: 3, src: [UL, 6] },
{ k: 'part', id: 'w3_hum_capitulum', l: 'Capitulum', parent: 'w3_hum_condyle', w: 3, src: [UL, 6] },
{ k: 'part', id: 'w3_hum_epicondyles', l: 'Medial and lateral epicondyles', parent: 'w3_humerus', w: 3, line: 'rough', match: 'epicondyles', src: [UL, 6] },

/* ---------------- forearm (p8-10) ---------------- */
{ k: 'group', id: 'w3_forearm', l: 'Forearm', parent: 'ul_bones', w: 3, src: [UL, 3] },
{ k: 'bone', id: 'w3_radius', l: 'Radius', parent: 'w3_forearm', w: 3, line: 'thumb side (lateral)', joints: ['w1_j_hr', 'w1_j_pru', 'w1_j_rc'], src: [UL, 8] },
{ k: 'bone', id: 'w3_ulna', l: 'Ulna', parent: 'w3_forearm', w: 3, line: 'little finger side (medial)', joints: ['w1_j_hu', 'w1_j_pru'], src: [UL, 8] },
{ k: 'part', id: 'w3_iom', l: 'Interosseous membrane', parent: 'w3_forearm', w: 3, line: 'attaches the shafts of ulna and radius and links them', links: { w3_radius: 'attaches the shaft of the radius', w3_ulna: 'attaches the shaft of the ulna' }, src: [UL, 8] },

/* ---------------- wrist and hand (p11-14) ---------------- */
{ k: 'group', id: 'w3_hand', l: 'Hand', parent: 'ul_bones', w: 3, src: [UL, 3] },
{ k: 'group', id: 'w3_carpals', l: 'Carpal bones', parent: 'w3_hand', w: 3, line: 'a proximal row and a distal row', src: [UL, 14] },
{ k: 'bone', id: 'w3_scaphoid', l: 'Scaphoid', parent: 'w3_carpals', w: 3, joints: ['w1_j_rc', 'w3_j_intercarpal'], src: [UL, 14] },
{ k: 'bone', id: 'w3_lunate', l: 'Lunate', parent: 'w3_carpals', w: 3, joints: ['w1_j_rc', 'w3_j_intercarpal'], src: [UL, 14] },
{ k: 'bone', id: 'w3_triquetrum', l: 'Triquetrum', parent: 'w3_carpals', w: 3, joints: ['w1_j_rc', 'w3_j_intercarpal'], src: [UL, 14] },
{ k: 'bone', id: 'w3_pisiform', l: 'Pisiform', parent: 'w3_carpals', w: 3, joints: ['w1_j_rc', 'w3_j_intercarpal'], src: [UL, 14] },
{ k: 'bone', id: 'w3_trapezium', l: 'Trapezium', parent: 'w3_carpals', w: 3, joints: ['w3_j_intercarpal', 'w3_j_cmc'], src: [UL, 14] },
{ k: 'bone', id: 'w3_trapezoid', l: 'Trapezoid', parent: 'w3_carpals', w: 3, joints: ['w3_j_intercarpal', 'w3_j_cmc'], src: [UL, 14] },
{ k: 'bone', id: 'w3_capitate', l: 'Capitate', parent: 'w3_carpals', w: 3, joints: ['w3_j_intercarpal', 'w3_j_cmc'], src: [UL, 14] },
{ k: 'bone', id: 'w3_hamate', l: 'Hamate', parent: 'w3_carpals', w: 3, joints: ['w3_j_intercarpal', 'w3_j_cmc'], src: [UL, 14] },
{ k: 'bone', id: 'w3_metacarpals', l: 'Metacarpal bones', parent: 'w3_hand', w: 3, line: 'five; articulate with distal carpals and proximal phalanges', joints: ['w3_j_cmc', 'w3_j_mcp'], src: [UL, 14] },
{ k: 'bone', id: 'w3_phalanges', l: 'Phalanges', parent: 'w3_hand', w: 3, line: 'proximal, middle, distal; thumb has only 2', joints: ['w3_j_mcp'], match: 'phalanx', src: [UL, 14] },
{ k: 'group', id: 'w3_wristjoints', l: 'Wrist bones and wrist joints', parent: 'joints', w: 3, match: 'wrist joints', src: [UL, 11] },
{ k: 'joint', id: 'w3_j_cmc', l: 'Carpometacarpal joint', parent: 'w3_wristjoints', w: 3, src: [UL, 11] },
{ k: 'joint', id: 'w3_j_intercarpal', l: 'Intercarpal joint', parent: 'w3_wristjoints', w: 3, line: 'gliding joint', src: [UL, 12, 13] },
{ k: 'joint', id: 'w3_j_mcp', l: 'Metacarpophalangeal joint', parent: 'w3_wristjoints', w: 3, line: 'condyloid in 2nd to 5th; 1st is hinge', match: 'metacarpophalangeal', src: [UL, 12] },
];
