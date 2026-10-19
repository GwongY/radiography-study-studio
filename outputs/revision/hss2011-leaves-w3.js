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

/* ---------------- brachial plexus (p15) ---------------- */
{ k: 'group', id: 'w3_brachial', l: 'Brachial plexus', parent: 'plexuses', w: 3, line: 'network of nerves from ventral rami C5-T1, supplying the upper limbs', links: { w5_brachial_plexus: 'same plexus, Week 5 lecture' }, src: [UL, 15] },

/* ---------------- muscles that move the pectoral girdle (p16-17) ---------------- */
{ k: 'group', id: 'w3_girdlemusc', l: 'Muscles that move the pectoral girdle', parent: 'ul_muscles', w: 3, src: [UL, 16, 17] },
{ k: 'muscle', id: 'w3_pecminor', l: 'Pectoralis minor', parent: 'w3_girdlemusc', w: 3, moves: { w3_scapula: 'depress, protract, assist scapular rotation (downward)' }, src: [UL, 16, 17] },
{ k: 'muscle', id: 'w3_trapezius', l: 'Trapezius', parent: 'w3_girdlemusc', w: 3, moves: { w3_scapula: 'elevate, retract, depress, assist scapular rotation (upward)' }, note: 'upward rotation turns the glenoid cavity upward', src: [UL, 16, 17] },
{ k: 'muscle', id: 'w3_levator', l: 'Levator scapulae', parent: 'w3_girdlemusc', w: 3, moves: { w3_scapula: 'elevate, assist scapular rotation (downward)' }, src: [UL, 16, 17] },
{ k: 'muscle', id: 'w3_rhomboidmin', l: 'Rhomboid minor', parent: 'w3_girdlemusc', w: 3, moves: { w3_scapula: 'retract, assist elevation and scapular rotation (downward)' }, src: [UL, 16] },
{ k: 'muscle', id: 'w3_rhomboidmaj', l: 'Rhomboid major', parent: 'w3_girdlemusc', w: 3, moves: { w3_scapula: 'retract, assist elevation and scapular rotation (downward)' }, src: [UL, 16] },
{ k: 'muscle', id: 'w3_serratus', l: 'Serratus anterior', parent: 'w3_girdlemusc', w: 3, moves: { w3_scapula: 'protract, rotate (upward)' }, src: [UL, 16, 17] },

/* ---------------- muscles that move the arm (p18) ---------------- */
{ k: 'group', id: 'w3_armmusc', l: 'Muscles that move the arm', parent: 'ul_muscles', w: 3, src: [UL, 18] },
{ k: 'muscle', id: 'w3_latdorsi', l: 'Latissimus dorsi', parent: 'w3_armmusc', w: 3, joints: { w1_j_gh: 'extend, adduct, medially rotate the arm' }, note: 'pulls the arm down, back and inward', src: [UL, 18] },
{ k: 'muscle', id: 'w3_pecmajor', l: 'Pectoralis major', parent: 'w3_armmusc', w: 3, joints: { w1_j_gh: 'adduct, medially rotate the arm' }, note: 'clavicular head flexes; sternocostal and abdominal parts extend from flexed position', src: [UL, 18] },
{ k: 'muscle', id: 'w3_deltoid', l: 'Deltoid', parent: 'w3_armmusc', w: 3, joints: { w1_j_gh: 'abduct the arm' }, note: 'anterior flexes and medially rotates; middle abducts; posterior extends and laterally rotates', src: [UL, 18] },
{ k: 'muscle', id: 'w3_teresmaj', l: 'Teres major', parent: 'w3_armmusc', w: 3, joints: { w1_j_gh: 'extend, adduct, medially rotate the arm' }, note: 'pulls the arm down, back and inward', src: [UL, 18] },

/* ---------------- rotator cuff (p19) ---------------- */
{ k: 'part', id: 'w3_supraspfossa', l: 'Supraspinous fossa', parent: 'w3_scapula', w: 3, src: [UL, 19] },
{ k: 'part', id: 'w3_infraspfossa', l: 'Infraspinous fossa', parent: 'w3_scapula', w: 3, src: [UL, 19] },
{ k: 'group', id: 'w3_rotcuff', l: 'Rotator cuff muscles', parent: 'ul_muscles', w: 3, line: 'stabilize shoulder joint by compressing humeral head against glenoid fossa', match: 'rotator cuff muscle', src: [UL, 19] },
{ k: 'muscle', id: 'w3_subscap', l: 'Subscapularis', parent: 'w3_rotcuff', w: 3, joints: { w1_j_gh: 'medially rotate arm' }, src: [UL, 19] },
{ k: 'muscle', id: 'w3_supraspin', l: 'Supraspinatus', parent: 'w3_rotcuff', w: 3, joints: { w1_j_gh: 'initiate arm abduction at the first 0-15 degrees; assist deltoid at 15-90' }, src: [UL, 19, 20] },
{ k: 'muscle', id: 'w3_infraspin', l: 'Infraspinatus', parent: 'w3_rotcuff', w: 3, joints: { w1_j_gh: 'laterally rotate arm; assist horizontal abduction' }, src: [UL, 19, 20] },
{ k: 'muscle', id: 'w3_teresmin', l: 'Teres minor', parent: 'w3_rotcuff', w: 3, joints: { w1_j_gh: 'laterally rotate arm; assist horizontal abduction' }, src: [UL, 19, 20] },

/* ---------------- elbow flexors and extensor (p21-22, 28) ---------------- */
{ k: 'group', id: 'w3_elbowflex', l: 'Elbow flexors', parent: 'ul_muscles', w: 3, line: 'brachioradialis, brachialis, biceps brachii', match: 'main elbow flexor', src: [UL, 21, 28] },
{ k: 'muscle', id: 'w3_brachialis', l: 'Brachialis', parent: 'w3_elbowflex', w: 3, joints: { w1_j_hu: 'flexion (major)', w1_j_hr: 'flexion (major)' }, note: 'works all the time during flexion', src: [UL, 21, 28] },
{ k: 'muscle', id: 'w3_biceps', l: 'Biceps brachii', parent: 'w3_elbowflex', w: 3, joints: { w1_j_hu: 'flexion', w1_j_hr: 'flexion', w1_j_pru: 'supination' }, note: 'works better while flexion comes with supination but not pronation', src: [UL, 21, 28] },
{ k: 'muscle', id: 'w3_brachiorad', l: 'Brachioradialis', parent: 'w3_elbowflex', w: 3, joints: { w1_j_hu: 'flexion', w1_j_hr: 'flexion' }, note: 'works better while flexion comes with pronation (takes up the role of biceps)', src: [UL, 21, 28] },
{ k: 'group', id: 'w3_elbowext', l: 'Elbow extensor', parent: 'ul_muscles', w: 3, match: 'main elbow extensor', src: [UL, 22, 28] },
{ k: 'muscle', id: 'w3_triceps', l: 'Triceps brachii', parent: 'w3_elbowext', w: 3, joints: { w1_j_hu: 'extension of the forearm', w1_j_hr: 'extension of the forearm' }, note: 'lateral and medial heads from posterior humerus; long head from scapula', src: [UL, 22, 28] },

/* ---------------- anterior compartment of forearm, extrinsic (p23, 28) ---------------- */
{ k: 'group', id: 'w3_antforearm', l: 'Anterior compartment of forearm', parent: 'ul_muscles', w: 3, line: 'extrinsic muscles; median nerve (*) and ulnar nerve (#)', src: [UL, 23] },
{ k: 'muscle', id: 'w3_pq', l: 'Pronator quadratus', parent: 'w3_antforearm', w: 3, joints: { w1_j_pru: 'major pronator' }, note: 'the slide labels it PQ', src: [UL, 28, 23] },
{ k: 'muscle', id: 'w3_fcr', l: 'Flexor carpi radialis', parent: 'w3_antforearm', w: 3, joints: { w1_j_rc: 'major wrist flexor' }, note: 'the slide labels it FCR', match: '(fcr)*', src: [UL, 23, 28] },
{ k: 'muscle', id: 'w3_fcu', l: 'Flexor carpi ulnaris', parent: 'w3_antforearm', w: 3, joints: { w1_j_rc: 'major wrist flexor' }, note: 'the slide labels it FCU', match: '(fcu)#', src: [UL, 23, 28] },
{ k: 'muscle', id: 'w3_fds', l: 'Flexor digitorum superficialis', parent: 'w3_antforearm', w: 3, moves: { w3_phalanges: 'flex middle phalanges (except thumb)' }, note: 'the slide labels it FDS; major finger flexor', match: '(fds)*', src: [UL, 23, 28] },
{ k: 'muscle', id: 'w3_fdp', l: 'Flexor digitorum profundus', parent: 'w3_antforearm', w: 3, moves: { w3_phalanges: 'flex distal phalanges (except thumb)' }, note: 'the slide labels it FDP; major finger flexor', match: '(fdp)*#', src: [UL, 23, 28] },
{ k: 'muscle', id: 'w3_fpl', l: 'Flexor pollicis longus', parent: 'w3_antforearm', w: 3, moves: { w3_phalanges: 'flex distal phalanges of thumb' }, note: 'the slide labels it FPL', match: '(fpl)*', src: [UL, 23, 28] },

/* ---------------- intrinsic hand muscles (p25-26) ---------------- */
{ k: 'group', id: 'w3_intrinsic', l: 'Intrinsic hand muscles', parent: 'ul_muscles', w: 3, line: '5 compartments', src: [UL, 25] },
{ k: 'group', id: 'w3_thenar', l: 'Thenar compartment', parent: 'w3_intrinsic', w: 3, src: [UL, 25] },
{ k: 'group', id: 'w3_hypothenar', l: 'Hypothenar compartment', parent: 'w3_intrinsic', w: 3, src: [UL, 25] },
{ k: 'group', id: 'w3_adductorcomp', l: 'Adductor compartment', parent: 'w3_intrinsic', w: 3, src: [UL, 25] },
{ k: 'muscle', id: 'w3_addpoll', l: 'Adductor pollicis', parent: 'w3_adductorcomp', w: 3, moves: { w3_phalanges: 'major muscle controlling thumb movement' }, src: [UL, 25] },
{ k: 'group', id: 'w3_centralcomp', l: 'Central compartment', parent: 'w3_intrinsic', w: 3, line: 'lumbricals', src: [UL, 26] },
{ k: 'muscle', id: 'w3_lumbricals', l: 'Lumbricals', parent: 'w3_centralcomp', w: 3, joints: { w3_j_mcp: 'flex metacarpophalangeal joints' }, moves: { w3_phalanges: 'extend interphalangeal joints' }, note: 'each arises from a tendon of FDP', src: [UL, 26] },
{ k: 'group', id: 'w3_interosseouscomp', l: 'Interosseous compartment', parent: 'w3_intrinsic', w: 3, line: 'dorsal and palmar interossei', src: [UL, 26] },
{ k: 'muscle', id: 'w3_dorsalinteross', l: 'Dorsal interossei', parent: 'w3_interosseouscomp', w: 3, moves: { w3_phalanges: 'abduct 2nd-4th digits' }, note: 'unipennate; major finger abductor', src: [UL, 26, 28] },
{ k: 'muscle', id: 'w3_palmarinteross', l: 'Palmar interossei', parent: 'w3_interosseouscomp', w: 3, moves: { w3_phalanges: 'adduct 2nd, 4th, 5th digits' }, note: 'bipennate; major finger adductor', src: [UL, 26, 28] },

/* ---------------- posterior compartment of forearm, extrinsic (p27-28) ---------------- */
{ k: 'group', id: 'w3_postforearm', l: 'Posterior compartment of forearm', parent: 'ul_muscles', w: 3, line: 'extrinsic muscles; all extensors are innervated by the radial nerve', src: [UL, 27] },
{ k: 'muscle', id: 'w3_apl', l: 'Abductor pollicis longus', parent: 'w3_postforearm', w: 3, moves: { w3_hand: 'extensor of the posterior compartment' }, note: 'the slide labels it APL and gives no action', match: 'apl epb', src: [UL, 27] },
{ k: 'muscle', id: 'w3_epb', l: 'Extensor pollicis brevis', parent: 'w3_postforearm', w: 3, moves: { w3_phalanges: 'major muscle controlling thumb movement' }, note: 'the slide labels it EPB', match: 'epb epl', src: [UL, 27, 28] },
{ k: 'muscle', id: 'w3_epl', l: 'Extensor pollicis longus', parent: 'w3_postforearm', w: 3, moves: { w3_phalanges: 'major muscle controlling thumb movement' }, note: 'the slide labels it EPL', match: 'epl ei', src: [UL, 27, 28] },
{ k: 'muscle', id: 'w3_ei', l: 'Extensor indicis', parent: 'w3_postforearm', w: 3, moves: { w3_phalanges: 'major finger extensor' }, note: 'the slide labels it EI', match: 'epl ei', src: [UL, 27, 28] },
{ k: 'muscle', id: 'w3_edm', l: 'Extensor digiti minimi', parent: 'w3_postforearm', w: 3, moves: { w3_hand: 'extensor of the posterior compartment' }, note: 'the slide labels it EDM and gives no action', match: 'ei edm', src: [UL, 27] },
{ k: 'muscle', id: 'w3_ecu', l: 'Extensor carpi ulnaris', parent: 'w3_postforearm', w: 3, joints: { w1_j_rc: 'major wrist extensor' }, note: 'the slide labels it ECU', match: 'edm ecu', src: [UL, 27, 28] },
{ k: 'muscle', id: 'w3_ecrb', l: 'Extensor carpi radialis brevis', parent: 'w3_postforearm', w: 3, joints: { w1_j_rc: 'major wrist extensor' }, note: 'the slide labels it ECRB', match: 'ecrb', src: [UL, 27, 28] },
{ k: 'muscle', id: 'w3_ecrl', l: 'Extensor carpi radialis longus', parent: 'w3_postforearm', w: 3, joints: { w1_j_rc: 'major wrist extensor' }, note: 'the slide labels it ECRL', match: 'ecrl', src: [UL, 27, 28] },
{ k: 'muscle', id: 'w3_ed', l: 'Extensor digitorum', parent: 'w3_postforearm', w: 3, moves: { w3_phalanges: 'major finger extensor' }, note: 'the slide labels it ED', match: 'ecrl ed', src: [UL, 27, 28] },

/* ---------------- nerves (p23, 27) ---------------- */
{ k: 'nerve', id: 'w3_n_median', l: 'Median nerve', parent: 'plexuses', w: 3, from: 'w3_brachial', supplies: { w3_pq: 'marked * on the anterior forearm slide', w3_fcr: 'marked *', w3_fds: 'marked *', w3_fdp: 'marked *', w3_fpl: 'marked *' }, src: [UL, 23] },
{ k: 'nerve', id: 'w3_n_ulnar', l: 'Ulnar nerve', parent: 'plexuses', w: 3, from: 'w3_brachial', supplies: { w3_fcu: 'marked #', w3_fdp: 'marked #' }, src: [UL, 23] },
{ k: 'nerve', id: 'w3_n_radial', l: 'Radial nerve', parent: 'plexuses', w: 3, from: 'w3_brachial', line: 'innervates all extensors', supplies: { w3_postforearm: 'all extensors are innervated by radial nerve' }, src: [UL, 27] },
];
