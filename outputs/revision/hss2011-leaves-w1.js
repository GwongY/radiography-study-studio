/*
 * HSS2011 · Week 1 leaves — bone, joints, ligaments, cartilage, muscle organisation,
 * body tissues and the orientation words.
 *
 * Read off W1_MusculoskeletalSystem_2026_CKK_upload.pdf (hss.msk.2026), the Week 1
 * orientation deck (hss.w1.2026) and the Week 2 body-tissues tutorial (hss.tut.tissues),
 * page by page. One row per structure the page text names, in the slide's words. `src`
 * is [source, page, page…]; work/revision-check.mjs holds that the name (or `match`) is
 * on one of those pages. Structures that are only in a picture have no row. Row kinds and
 * fields: outputs/revision/leaves.js. Recipe: docs/superpowers/plans/2026-10-19-revise-depth-w1-w3-w4.md.
 */
const MSK = 'hss.msk.2026';
const ORI = 'hss.w1.2026';
const TIS = 'hss.tut.tissues';

export const SOURCES = {
  [MSK]: 'Week 1 musculoskeletal slides',
  [ORI]: 'Week 1 orientation slides',
  [TIS]: 'Week 2 body-tissues tutorial',
};

export const ROWS = [
/* ---------------- bone histology and structure (p5-8) ---------------- */
{ k: 'group', id: 'w1_bonecells', l: 'Cells', parent: 'bone', w: 1, src: [MSK, 5] },
{ k: 'part', id: 'w1_osteocyte', l: 'Osteocytes', parent: 'w1_bonecells', w: 1, line: 'mature bone cells in lacunae', src: [MSK, 5] },
{ k: 'part', id: 'w1_lacunae', l: 'Lacunae', parent: 'w1_osteocyte', w: 1, line: 'the spaces that hold osteocytes', src: [MSK, 5] },
{ k: 'part', id: 'w1_canaliculi', l: 'Canaliculi', parent: 'w1_osteocyte', w: 1, line: 'small channels joining the lacunae; route for nutrients and waste', links: { w1_lacunae: 'interconnect the lacunae' }, src: [MSK, 5] },
{ k: 'part', id: 'w1_osteoblast', l: 'Osteoblasts', parent: 'w1_bonecells', w: 1, line: 'immature bone cells; release matrix components; can form osteocytes', links: { w1_osteocyte: 'able to form osteocytes' }, src: [MSK, 5] },
{ k: 'part', id: 'w1_osteoclast', l: 'Osteoclasts', parent: 'w1_bonecells', w: 1, line: 'dissolve bone matrix and release minerals', src: [MSK, 5] },
{ k: 'part', id: 'w1_osteoprog', l: 'Osteoprojenitor cells', parent: 'w1_bonecells', w: 1, line: 'stem cells that can give rise to osteoblasts', links: { w1_osteoblast: 'can give rise to osteoblasts' }, src: [MSK, 5] },
{ k: 'group', id: 'w1_matrix', l: 'Matrix', parent: 'bone', w: 1, src: [MSK, 5] },
{ k: 'part', id: 'w1_hydroxyapatite', l: 'Calcium hydroxyapatite', parent: 'w1_matrix', w: 1, line: '2/3 of the matrix; strong but inflexible', src: [MSK, 5] },
{ k: 'part', id: 'w1_collagen', l: 'Collagen fibers', parent: 'w1_matrix', w: 1, line: '1/3 of the matrix; tough and flexible', src: [MSK, 5] },
{ k: 'part', id: 'w1_groundsub', l: 'Ground substance', parent: 'w1_matrix', w: 1, src: [MSK, 5] },
{ k: 'group', id: 'w1_bonestruct', l: 'Bone structure', parent: 'bone', w: 1, src: [MSK, 6, 8] },
{ k: 'part', id: 'w1_compact', l: 'Compact bone', parent: 'w1_bonestruct', w: 1, line: 'dense outer layer; hard shell that resists bending and twisting', src: [MSK, 6] },
{ k: 'part', id: 'w1_spongy', l: 'Spongy bone', parent: 'w1_bonestruct', w: 1, line: 'lighter, web-like; forms the inner core', links: { w1_compact: 'compact bone forms the outer layer' }, src: [MSK, 6] },
{ k: 'part', id: 'w1_trabeculae', l: 'Trabeculae', parent: 'w1_spongy', w: 1, line: 'web-like; irregularly aligned bone cells', src: [MSK, 6] },
{ k: 'part', id: 'w1_periosteum', l: 'Periosteum', parent: 'w1_bonestruct', w: 1, line: 'fibrous tissue around the outer bone surface, except articular sites', src: [MSK, 8] },
{ k: 'group', id: 'w1_marrow', l: 'Bone marrow', parent: 'bone', w: 1, line: 'in the centre of most bones (spongy bones)', src: [MSK, 7] },
{ k: 'part', id: 'w1_redmarrow', l: 'Red bone marrow', parent: 'w1_marrow', w: 1, line: 'in all bones before age 5; in adults mainly central skeleton', src: [MSK, 7] },
{ k: 'part', id: 'w1_hsc', l: 'Hematopoietic stem cells', parent: 'w1_redmarrow', w: 1, line: 'differentiate into RBC, WBC and platelets', src: [MSK, 7] },
{ k: 'part', id: 'w1_yellowmarrow', l: 'Yellow bone marrow', parent: 'w1_marrow', w: 1, line: 'in the cavities of long bones; adipose tissue', links: { w1_redmarrow: 'red marrow gradually transforms into yellow' }, src: [MSK, 7] },
{ k: 'part', id: 'w1_msc', l: 'Mesenchymal stem cells', parent: 'w1_yellowmarrow', w: 1, line: 'can develop into cartilage, bone, fat or muscle cells', src: [MSK, 7] },

/* ---------------- types of bone and landmarks (p9-11) ---------------- */
{ k: 'group', id: 'w1_bonetypes', l: 'Types of Bone', parent: 'bone', w: 1, src: [MSK, 9] },
{ k: 'part', id: 'w1_longbone', l: 'Long bones', parent: 'w1_bonetypes', w: 1, line: 'tubular, in limbs; levers for muscles', src: [MSK, 9] },
{ k: 'part', id: 'w1_shortbone', l: 'Short bones', parent: 'w1_bonetypes', w: 1, line: 'cubical; support and stability with little or no movement', src: [MSK, 9] },
{ k: 'part', id: 'w1_flatbone', l: 'Flat bones', parent: 'w1_bonetypes', w: 1, line: 'flat surface for muscle attachment or protection', src: [MSK, 9] },
{ k: 'part', id: 'w1_irregbone', l: 'Irregular bones', parent: 'w1_bonetypes', w: 1, line: 'irregular or mixed shape', src: [MSK, 9] },
{ k: 'part', id: 'w1_sesamoid', l: 'Sesamoid bones', parent: 'w1_bonetypes', w: 1, line: 'small, like a sesame seed; develop inside tendons', src: [MSK, 9] },
{ k: 'group', id: 'w1_landmarks', l: 'Bony Landmarks', parent: 'bone', w: 1, src: [MSK, 10, 11] },
{ k: 'part', id: 'w1_lm_ramus', l: 'Ramus of the mandible', parent: 'w1_landmarks', w: 1, src: [MSK, 10] },
{ k: 'part', id: 'w1_lm_mastoid', l: 'Mastoid process', parent: 'w1_landmarks', w: 1, src: [MSK, 10] },
{ k: 'part', id: 'w1_lm_frontalsinus', l: 'Frontal sinus', parent: 'w1_landmarks', w: 1, src: [MSK, 11] },
{ k: 'part', id: 'w1_lm_sphenoidalsinus', l: 'Sphenoidal sinus', parent: 'w1_landmarks', w: 1, src: [MSK, 11] },
{ k: 'part', id: 'w1_lm_iam', l: 'Internal acoustic meatus', parent: 'w1_landmarks', w: 1, src: [MSK, 11] },

/* ---------------- joints: three ways to classify (p13-16) ---------------- */
{ k: 'group', id: 'w1_jregion', l: 'Anatomical aspects (regions)', parent: 'joints', w: 1, links: { w2_j_hip: 'hip joint = acetabulofemoral joint', w2_j_knee: 'knee joint = patellofemoral / tibiofemoral joint', w2_j_ankle: 'ankle joint = talocrural joint' }, src: [MSK, 14] },
{ k: 'joint', id: 'w1_j_tmj', l: 'Temporomandibular joint', parent: 'w1_jregion', w: 1, line: 'the jaw joint', src: [MSK, 14] },
{ k: 'joint', id: 'w1_j_gh', l: 'Glenohumeral joint', parent: 'w1_jregion', w: 1, line: 'the shoulder joint', src: [MSK, 14] },
{ k: 'joint', id: 'w1_j_hu', l: 'Humeroulnar joint', parent: 'w1_jregion', w: 1, line: 'elbow joint', src: [MSK, 14] },
{ k: 'joint', id: 'w1_j_hr', l: 'Humeroradial joint', parent: 'w1_jregion', w: 1, line: 'elbow joint', src: [MSK, 14] },
{ k: 'joint', id: 'w1_j_pru', l: 'Proximal radioulnar joint', parent: 'w1_jregion', w: 1, line: 'elbow joint', src: [MSK, 14] },
{ k: 'joint', id: 'w1_j_rc', l: 'Radiocarpal joint', parent: 'w1_jregion', w: 1, line: 'the wrist joint', src: [MSK, 14] },
{ k: 'group', id: 'w1_jmobility', l: 'Functional aspects (mobility)', parent: 'joints', w: 1, src: [MSK, 15] },
{ k: 'part', id: 'w1_synarthrosis', l: 'Synarthrosis', parent: 'w1_jmobility', w: 1, line: 'immovable', src: [MSK, 15] },
{ k: 'part', id: 'w1_amphiarthrosis', l: 'Amphiarthrosis', parent: 'w1_jmobility', w: 1, line: 'slightly movable', src: [MSK, 15] },
{ k: 'part', id: 'w1_diarthrosis', l: 'Diarthrosis', parent: 'w1_jmobility', w: 1, line: 'freely movable', src: [MSK, 15] },
{ k: 'group', id: 'w1_jstructure', l: 'Structural aspects', parent: 'joints', w: 1, line: 'the tissues that separate the bones', src: [MSK, 16] },
{ k: 'part', id: 'w1_fibrousjoint', l: 'Fibrous joint', parent: 'w1_jstructure', w: 1, line: 'bones separated by fibrous tissues', match: 'fibrous', src: [MSK, 16] },
{ k: 'part', id: 'w1_cartjoint', l: 'Cartilage joint', parent: 'w1_jstructure', w: 1, line: 'bones separated by cartilages', match: 'cartilages', src: [MSK, 16] },
{ k: 'part', id: 'w1_synovialjoint', l: 'Synovial joint', parent: 'w1_jstructure', w: 1, line: 'fluid-filled cavity within a fibrous capsule; the most common', match: 'synovial', src: [MSK, 16] },

/* ---------------- parts of a synovial joint (p17-18) ---------------- */
{ k: 'group', id: 'w1_synparts', l: 'Structure of Synovial joints', parent: 'joints', w: 1, src: [MSK, 17] },
{ k: 'part', id: 'w1_jointcavity', l: 'Joint cavity', parent: 'w1_synparts', w: 1, src: [MSK, 17] },
{ k: 'part', id: 'w1_articcapsule', l: 'Articular capsule', parent: 'w1_synparts', w: 1, line: 'a cuff around the joint close to the articular surface', src: [MSK, 17] },
{ k: 'part', id: 'w1_fibrouscapsule', l: 'Outer fibrous capsule', parent: 'w1_articcapsule', w: 1, line: 'continuous with the periosteum', links: { w1_periosteum: 'continuous with periosteum' }, src: [MSK, 17] },
{ k: 'part', id: 'w1_synovialmem', l: 'Inner synovial membrane', parent: 'w1_articcapsule', w: 1, line: 'secretes synovial fluid', src: [MSK, 17] },
{ k: 'part', id: 'w1_synovialfluid', l: 'Synovial fluid', parent: 'w1_synparts', w: 1, line: 'lubrication, shock absorption and joint nourishment', links: { w1_synovialmem: 'secreted by the synovial membrane' }, src: [MSK, 17] },
{ k: 'part', id: 'w1_articcart', l: 'Articular cartilage', parent: 'w1_synparts', w: 1, line: 'wear-resistant, low-friction coating on the bone surface', src: [MSK, 17] },
{ k: 'part', id: 'w1_meniscus', l: 'Meniscus', parent: 'w1_synparts', w: 1, line: 'fibrocartilage between the articular bones; smooths movement', src: [MSK, 17] },
{ k: 'part', id: 'w1_bursa', l: 'Bursae', parent: 'w1_synparts', w: 1, line: 'sacs of synovial fluid that cushion between bone and tendons', match: 'bursa', src: [MSK, 18] },

/* ---------------- the six synovial types (p19-25) ---------------- */
{ k: 'group', id: 'w1_syntypes', l: 'Types of Synovial joints', parent: 'joints', w: 1, match: 'types of synovial', src: [MSK, 19] },
{ k: 'part', id: 'w1_t_plane', l: 'Plane joint', parent: 'w1_syntypes', w: 1, line: 'gliding movement of one flat or gently curved surface over another', links: { w2_j_si: 'e.g. sacroiliac joint' }, src: [MSK, 19, 20] },
{ k: 'part', id: 'w1_t_hinge', l: 'Hinge joint', parent: 'w1_syntypes', w: 1, line: 'angular movement in one direction and one plane; flexion, extension', links: { w2_j_knee: 'e.g. knee joints', w2_j_ankle: 'e.g. ankle joints' }, src: [MSK, 21, 19] },
{ k: 'part', id: 'w1_t_pivot', l: 'Pivot joint', parent: 'w1_syntypes', w: 1, line: 'rotation about a longitudinal axis; one bone turns within a ring', src: [MSK, 22, 19] },
{ k: 'part', id: 'w1_t_condyloid', l: 'Condyloid joint', parent: 'w1_syntypes', w: 1, line: 'angular movement in two directions; oval head, elliptical cavity', links: { w1_j_rc: 'e.g. radiocarpal (wrist) joint' }, src: [MSK, 19, 23] },
{ k: 'part', id: 'w1_t_saddle', l: 'Saddle joint', parent: 'w1_syntypes', w: 1, line: 'both surfaces saddle-shaped; one concave, one convex', src: [MSK, 24, 19] },
{ k: 'part', id: 'w1_t_ball', l: 'Ball-and-socket joint', parent: 'w1_syntypes', w: 1, line: 'spherical head in a cup-shaped depression; all directions plus rotation', links: { w2_j_hip: 'e.g. hip joints', w1_j_gh: 'e.g. shoulder joints' }, src: [MSK, 25, 19] },

/* ---------------- ligaments and cartilage (p28-29) ---------------- */
{ k: 'part', id: 'w1_ligament', l: 'Ligaments', parent: 'ligcart', w: 1, line: 'join bones together and stabilise the joints', src: [MSK, 28] },
{ k: 'part', id: 'w1_intrinsic', l: 'Intrinsic ligament', parent: 'w1_ligament', w: 1, line: 'intracapsular; thickenings of the capsule that reinforce the joint', src: [MSK, 28] },
{ k: 'part', id: 'w1_cruciate', l: 'Cruciate ligament', parent: 'w1_intrinsic', w: 1, line: 'anterior and posterior', src: [MSK, 28] },
{ k: 'part', id: 'w1_extrinsic', l: 'Extrinsic ligament', parent: 'w1_ligament', w: 1, line: 'accessory; separate from the capsule; attaches bones together', src: [MSK, 28] },
{ k: 'part', id: 'w1_collateral', l: 'Collateral ligament', parent: 'w1_extrinsic', w: 1, line: 'medial and lateral', src: [MSK, 28] },
{ k: 'part', id: 'w1_cartilage', l: 'Cartilage', parent: 'ligcart', w: 1, line: 'strong but flexible; absorbs shock, reduces friction, supports', src: [MSK, 29] },
{ k: 'part', id: 'w1_hyaline', l: 'Hyaline cartilage', parent: 'w1_cartilage', w: 1, src: [MSK, 29] },
{ k: 'part', id: 'w1_fibrocart', l: 'Fibrocartilage', parent: 'w1_cartilage', w: 1, links: { w1_meniscus: 'fibrocartilage (meniscus) lies between the articular bones' }, src: [MSK, 29, 17] },
{ k: 'part', id: 'w1_elasticcart', l: 'Elastic cartilage', parent: 'w1_cartilage', w: 1, src: [MSK, 29] },

/* ---------------- muscle organisation (p31-36) ---------------- */
{ k: 'part', id: 'w1_skelmuscle', l: 'Skeletal muscles', parent: 'musclestruct', w: 1, line: 'generate movement, maintain posture, support soft tissue', src: [MSK, 31] },
{ k: 'group', id: 'w1_musorg', l: 'Organization of muscle', parent: 'musclestruct', w: 1, src: [MSK, 32] },
{ k: 'part', id: 'w1_epimysium', l: 'Epimysium', parent: 'w1_musorg', w: 1, src: [MSK, 32] },
{ k: 'part', id: 'w1_perimysium', l: 'Perimysium', parent: 'w1_musorg', w: 1, src: [MSK, 32] },
{ k: 'part', id: 'w1_endomysium', l: 'Endomysium', parent: 'w1_musorg', w: 1, src: [MSK, 32] },
{ k: 'part', id: 'w1_fascicle', l: 'Fascicles', parent: 'w1_musorg', w: 1, src: [MSK, 32] },
{ k: 'part', id: 'w1_musfibre', l: 'Muscle fibers', parent: 'w1_fascicle', w: 1, line: 'muscle fiber (myocyte)', src: [MSK, 32] },
{ k: 'part', id: 'w1_myofibril', l: 'Myofibrils', parent: 'w1_musfibre', w: 1, src: [MSK, 32] },
{ k: 'part', id: 'w1_sarcomere', l: 'Sarcomere', parent: 'w1_myofibril', w: 1, line: 'repeating unit within muscle fibers responsible for contraction', src: [MSK, 33] },
{ k: 'part', id: 'w1_myosin', l: 'Myosin', parent: 'w1_sarcomere', w: 1, src: [MSK, 32, 33] },
{ k: 'part', id: 'w1_actin', l: 'Actin', parent: 'w1_sarcomere', w: 1, src: [MSK, 32, 33] },
{ k: 'part', id: 'w1_tendon', l: 'Tendon', parent: 'musclestruct', w: 1, line: 'dense regular connective tissue; transmits muscle force to bone', links: { w1_endomysium: 'continuous with the endo-, peri- and epimysium', w1_perimysium: 'continuous with the endo-, peri- and epimysium', w1_epimysium: 'continuous with the endo-, peri- and epimysium' }, src: [MSK, 34, 32] },
{ k: 'part', id: 'w1_golgi', l: 'Golgi tendon organ', parent: 'w1_tendon', w: 1, line: 'mechanoreceptor that detects tension developed at the tendon', src: [MSK, 34] },
{ k: 'part', id: 'w1_mtj', l: 'Myotendinous junction', parent: 'w1_tendon', w: 1, line: 'point at which tendon attaches to muscle', links: { w1_golgi: 'the Golgi tendon organ is located here' }, src: [MSK, 35, 34] },
{ k: 'part', id: 'w1_otj', l: 'Osteotendinous junction', parent: 'w1_tendon', w: 1, line: 'point at which tendon attaches to bone', src: [MSK, 35] },
{ k: 'part', id: 'w1_origin', l: 'Origin', parent: 'w1_otj', w: 1, line: 'usually proximal; does not move during contraction', src: [MSK, 35] },
{ k: 'part', id: 'w1_insertion', l: 'Insertion', parent: 'w1_otj', w: 1, line: 'usually distal; moves when the muscle contracts', src: [MSK, 35] },
{ k: 'group', id: 'w1_fascarr', l: 'Organization of muscle fibers', parent: 'musclestruct', w: 1, src: [MSK, 36] },
{ k: 'part', id: 'w1_fusiform', l: 'Fusiform', parent: 'w1_fascarr', w: 1, line: 'fascicles nearly parallel to the axis; tapers towards tendons', src: [MSK, 36] },
{ k: 'part', id: 'w1_parallel', l: 'Parallel', parent: 'w1_fascarr', w: 1, line: 'fascicles parallel to the axis; end in a flat tendon', src: [MSK, 36] },
{ k: 'part', id: 'w1_convergent', l: 'Convergent', parent: 'w1_fascarr', w: 1, line: 'fascicles converge on a thick central tendon; triangular', src: [MSK, 36] },
{ k: 'part', id: 'w1_circular', l: 'Circular', parent: 'w1_fascarr', w: 1, line: 'concentric fascicles forming a sphincter or opening', src: [MSK, 36] },
{ k: 'part', id: 'w1_pennate', l: 'Pennate', parent: 'w1_fascarr', w: 1, line: 'short fascicles in relation to total muscle length', src: [MSK, 36] },
{ k: 'part', id: 'w1_unipennate', l: 'Unipennate', parent: 'w1_pennate', w: 1, line: 'fascicles on only one side of the tendon', src: [MSK, 36] },
{ k: 'part', id: 'w1_bipennate', l: 'Bipennate', parent: 'w1_pennate', w: 1, line: 'fascicles on both sides of a central tendon', src: [MSK, 36] },
{ k: 'part', id: 'w1_multipennate', l: 'Multipennate', parent: 'w1_pennate', w: 1, line: 'fascicles attach obliquely from many directions to several tendons', src: [MSK, 36] },

/* ---------------- motor unit and fibre types (p37-38) ---------------- */
{ k: 'part', id: 'w1_motorunit', l: 'Motor unit', parent: 'motorunit', w: 1, line: 'motor neuron plus its fibres; 13-20 in eye muscle, 2000 in calf', src: [MSK, 37] },
{ k: 'part', id: 'w1_motorneuron', l: 'Motor neuron', parent: 'w1_motorunit', w: 1, src: [MSK, 37] },
{ k: 'part', id: 'w1_tone', l: 'Muscle tone', parent: 'motorunit', w: 1, line: 'low level of contraction even at rest; keeps muscle firm', src: [MSK, 37] },
{ k: 'part', id: 'w1_slowox', l: 'Slow oxidative', parent: 'fibretypes', w: 1, src: [MSK, 38] },
{ k: 'part', id: 'w1_fastox', l: 'Fast oxidative', parent: 'fibretypes', w: 1, src: [MSK, 38] },
{ k: 'part', id: 'w1_fastgly', l: 'Fast glycolytic', parent: 'fibretypes', w: 1, src: [MSK, 38] },

/* ---------------- body orientation words and planes (orientation deck p14-16) ---------------- */
{ k: 'group', id: 'w1_directions', l: 'Word pairs', parent: 'orient', w: 1, src: [ORI, 14] },
{ k: 'part', id: 'w1_right', l: 'Right', parent: 'w1_directions', w: 1, src: [ORI, 14] },
{ k: 'part', id: 'w1_left', l: 'Left', parent: 'w1_directions', w: 1, src: [ORI, 14] },
{ k: 'part', id: 'w1_proximal', l: 'Proximal', parent: 'w1_directions', w: 1, line: 'close to the trunk', src: [ORI, 14] },
{ k: 'part', id: 'w1_distal', l: 'Distal', parent: 'w1_directions', w: 1, line: 'away from the trunk', src: [ORI, 14] },
{ k: 'part', id: 'w1_medial', l: 'Medial', parent: 'w1_directions', w: 1, line: 'toward the midline', src: [ORI, 14] },
{ k: 'part', id: 'w1_lateral', l: 'Lateral', match: 'Later', parent: 'w1_directions', w: 1, line: 'away from the midline', src: [ORI, 14] },
{ k: 'part', id: 'w1_anterior', l: 'Anterior', parent: 'w1_directions', w: 1, line: 'at the front', src: [ORI, 15] },
{ k: 'part', id: 'w1_posterior', l: 'Posterior', parent: 'w1_directions', w: 1, line: 'at the back', src: [ORI, 15] },
{ k: 'part', id: 'w1_cranial', l: 'Cranial', parent: 'w1_directions', w: 1, line: 'toward the head (cephalic)', src: [ORI, 15] },
{ k: 'part', id: 'w1_caudal', l: 'Caudal', parent: 'w1_directions', w: 1, line: 'toward the tail', src: [ORI, 15] },
{ k: 'part', id: 'w1_superior', l: 'Superior', parent: 'w1_directions', w: 1, line: 'above', src: [ORI, 15] },
{ k: 'part', id: 'w1_inferior', l: 'Inferior', parent: 'w1_directions', w: 1, line: 'below', src: [ORI, 15] },
{ k: 'group', id: 'w1_planes', l: 'Planes', match: 'Plane', parent: 'orient', w: 1, src: [ORI, 16] },
{ k: 'part', id: 'w1_coronal', l: 'Coronal plane', parent: 'w1_planes', w: 1, line: 'separates the body into anterior and posterior parts', src: [ORI, 16] },
{ k: 'part', id: 'w1_sagittal', l: 'Sagittal plane', parent: 'w1_planes', w: 1, line: 'separates the body into left and right', src: [ORI, 16] },
{ k: 'part', id: 'w1_transverse', l: 'Transverse/horizontal plane', parent: 'w1_planes', w: 1, line: 'separates the body into superior and inferior parts', src: [ORI, 16] },
];
