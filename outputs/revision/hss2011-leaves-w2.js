/*
 * HSS2011 · Week 2 leaves — pelvic girdle and lower limb.
 *
 * Read off Week 2_LL _2026_CKK_upload.pdf (hss.ll.2026), page by page. One row
 * per structure the slides name, in the slide's words. `src` is [source, page,
 * page…]; work/revision-check.mjs holds that the name (or `match`, where the
 * slide words it differently) is on one of those pages. A row marked `old`
 * comes from an older deck because the 2026 slides do not name it. Joint type
 * goes in a joint's line. Row kinds and fields: outputs/revision/leaves.js.
 */
const LL = 'hss.ll.2026';
const OLD = 'hss.4.3';

export const SOURCES = {
  [LL]: 'Week 2 lower-limb slides',
  [OLD]: '4.3 Upper and Lower Limbs (older deck)',
};

export const ROWS = [
/* ---------------- bones, by region (p4-13) ---------------- */
{ k: 'group', id: 'w2_pelvis', l: 'Pelvic girdle', parent: 'll_bones', w: 2, line: 'joins the lower limb to the axial skeleton; protects lower viscera; carries body weight', src: [LL, 4] },
{ k: 'bone', id: 'w2_hipbone', l: 'Hip bone', parent: 'w2_pelvis', w: 2, line: 'ilium + ischium + pubis; with sacrum and coccyx forms the bony pelvis', joints: ['w2_j_hip', 'w2_j_si'], src: [LL, 6] },
{ k: 'part', id: 'w2_iliaccrest', l: 'Iliac crest', parent: 'w2_hipbone', w: 2, src: [LL, 5] },
{ k: 'group', id: 'w2_femreg', l: 'Femoral region', parent: 'll_bones', w: 2, match: 'femoral', src: [LL, 7] },
{ k: 'bone', id: 'w2_femur', l: 'Femur', parent: 'w2_femreg', w: 2, joints: ['w2_j_hip', 'w2_j_knee'], src: [LL, 16, 7] },
{ k: 'part', id: 'w2_epicondyle', l: 'Epicondyle', parent: 'w2_femur', w: 2, line: 'for muscle attachment', src: [LL, 7] },
{ k: 'part', id: 'w2_condyle', l: 'Condyle', parent: 'w2_femur', w: 2, line: 'for joint articulation', src: [LL, 7] },
{ k: 'group', id: 'w2_kneereg', l: 'Knee region', parent: 'll_bones', w: 2, match: 'knee', src: [LL, 8] },
{ k: 'bone', id: 'w2_patella', l: 'Patella', parent: 'w2_kneereg', w: 2, match: 'patellofemoral', joints: ['w2_j_knee'], src: [LL, 8] },
{ k: 'group', id: 'w2_legreg', l: 'Leg region', parent: 'll_bones', w: 2, match: 'leg', src: [LL, 10] },
{ k: 'bone', id: 'w2_tibia', l: 'Tibia', parent: 'w2_legreg', w: 2, joints: ['w2_j_knee', 'w2_j_ptf', 'w2_j_dtf', 'w2_j_ankle'], src: [LL, 10] },
{ k: 'part', id: 'w2_medcondyle', l: 'Medial tibial condyle', parent: 'w2_tibia', w: 2, src: [LL, 9] },
{ k: 'part', id: 'w2_latcondyle', l: 'Lateral tibial condyle', parent: 'w2_tibia', w: 2, src: [LL, 9] },
{ k: 'part', id: 'w2_medmall', l: 'Medial malleolus', parent: 'w2_tibia', w: 2, line: 'forms the medial wall of the ankle joint', src: [LL, 12] },
{ k: 'bone', id: 'w2_fibula', l: 'Fibula', parent: 'w2_legreg', w: 2, joints: ['w2_j_ptf', 'w2_j_dtf', 'w2_j_ankle'], src: [LL, 10] },
{ k: 'part', id: 'w2_latmall', l: 'Lateral malleolus', parent: 'w2_fibula', w: 2, line: 'forms the lateral wall of the ankle joint', src: [LL, 12] },
{ k: 'part', id: 'w2_iom', l: 'Interosseous membrane', parent: 'w2_legreg', w: 2, line: 'between tibia and fibula', src: [LL, 10] },
{ k: 'group', id: 'w2_ankfoot', l: 'Ankle and foot', parent: 'll_bones', w: 2, match: 'ankle & foot', src: [LL, 12] },
{ k: 'group', id: 'w2_tarsals', l: 'Tarsal bones', parent: 'w2_ankfoot', w: 2, line: 'a proximal group and a distal group', src: [LL, 12] },
{ k: 'bone', id: 'w2_talus', l: 'Talus', parent: 'w2_tarsals', w: 2, joints: ['w2_j_ankle', 'w2_j_subtalar'], src: [LL, 12] },
{ k: 'bone', id: 'w2_calcaneus', l: 'Calcaneus', parent: 'w2_tarsals', w: 2, joints: ['w2_j_subtalar'], src: [LL, 12] },
{ k: 'bone', id: 'w2_navicular', l: 'Navicular', parent: 'w2_tarsals', w: 2, src: [LL, 12] },
{ k: 'bone', id: 'w2_cuboid', l: 'Cuboid', parent: 'w2_tarsals', w: 2, src: [LL, 12] },
{ k: 'bone', id: 'w2_cuneiforms', l: 'Cuneiform bones', parent: 'w2_tarsals', w: 2, line: 'medial, intermediate, lateral', src: [LL, 12] },
{ k: 'bone', id: 'w2_metatarsals', l: 'Metatarsals', parent: 'w2_ankfoot', w: 2, line: 'I to V', match: 'metatarsal', src: [LL, 12] },
{ k: 'bone', id: 'w2_phalanges', l: 'Phalanges', parent: 'w2_ankfoot', w: 2, line: 'proximal, middle, distal', match: 'phalanx', src: [LL, 12] },

/* ---------------- joints (p5-13) ---------------- */
{ k: 'group', id: 'w2_lljoints', l: 'Lower-limb joints', parent: 'joints', w: 2, match: 'lower limb', src: [LL, 5] },
{ k: 'joint', id: 'w2_j_si', l: 'Sacroiliac joint', parent: 'w2_lljoints', w: 2, line: 'the pelvic joint', src: [LL, 6] },
{ k: 'joint', id: 'w2_j_hip', l: 'Hip joint', parent: 'w2_lljoints', w: 2, line: 'acetabulofemoral; ball-and-socket', match: 'acetabulofemoral', src: [LL, 6] },
{ k: 'joint', id: 'w2_j_knee', l: 'Knee joint', parent: 'w2_lljoints', w: 2, line: 'patellofemoral + tibiofemoral; hinge', src: [LL, 8] },
{ k: 'joint', id: 'w2_j_ptf', l: 'Proximal tibiofibular joint', parent: 'w2_lljoints', w: 2, line: 'plane joint', src: [LL, 10] },
{ k: 'joint', id: 'w2_j_dtf', l: 'Distal tibiofibular joint', parent: 'w2_lljoints', w: 2, line: 'fibrous joint', src: [LL, 10] },
{ k: 'joint', id: 'w2_j_ankle', l: 'Ankle joint', parent: 'w2_lljoints', w: 2, line: 'talocrural; hinge; plantarflexion and dorsiflexion', src: [LL, 12] },
{ k: 'joint', id: 'w2_j_subtalar', l: 'Subtalar joint', parent: 'w2_lljoints', w: 2, line: 'plane; talus on calcaneus; inversion and eversion', src: [LL, 13] },

/* ---------------- muscles: gluteal region (p14-17) ---------------- */
{ k: 'group', id: 'w2_gluteal', l: 'Gluteal region', parent: 'll_muscles', w: 2, src: [LL, 14] },
{ k: 'group', id: 'w2_glutei', l: 'Gluteal group', parent: 'w2_gluteal', w: 2, src: [LL, 14] },
{ k: 'muscle', id: 'w2_gmax', l: 'Gluteus maximus', parent: 'w2_glutei', w: 2, joints: { w2_j_hip: 'extension; lateral rotation (the chief lateral rotator)' }, links: { muscleroles: 'antagonist to hip flexion' }, src: [LL, 14, 15, 17, 25] },
{ k: 'muscle', id: 'w2_gmed', l: 'Gluteus medius', parent: 'w2_glutei', w: 2, joints: { w2_j_hip: 'abduction, medial rotation' }, note: 'stabilises the pelvis', src: [LL, 15] },
{ k: 'muscle', id: 'w2_gmin', l: 'Gluteus minimus', parent: 'w2_glutei', w: 2, joints: { w2_j_hip: 'abduction, medial rotation' }, src: [LL, 15, 14, 24] },
{ k: 'group', id: 'w2_deeprot', l: 'Deep lateral rotators', parent: 'w2_gluteal', w: 2, line: 'deep to gluteus maximus; together rotate the head of femur laterally', match: 'deep lateral rotator', src: [LL, 16, 17] },
{ k: 'muscle', id: 'w2_piriformis', l: 'Piriformis', parent: 'w2_deeprot', w: 2, joints: { w2_j_hip: 'lateral rotation' }, src: [LL, 16] },
{ k: 'muscle', id: 'w2_quadfem', l: 'Quadratus femoris', parent: 'w2_deeprot', w: 2, joints: { w2_j_hip: 'lateral rotation' }, src: [LL, 16] },
{ k: 'muscle', id: 'w2_supgem', l: 'Superior gemellus', parent: 'w2_deeprot', w: 2, joints: { w2_j_hip: 'lateral rotation' }, src: [LL, 16] },
{ k: 'muscle', id: 'w2_infgem', l: 'Inferior gemellus', parent: 'w2_deeprot', w: 2, joints: { w2_j_hip: 'lateral rotation' }, src: [LL, 16] },
{ k: 'muscle', id: 'w2_obtint', l: 'Obturator internus', parent: 'w2_deeprot', w: 2, joints: { w2_j_hip: 'lateral rotation' }, src: [LL, 16] },
{ k: 'muscle', id: 'w2_obtext', l: 'Obturator externus', parent: 'w2_deeprot', w: 2, joints: { w2_j_hip: 'lateral rotation' }, src: [LL, 16] },

/* ---------------- muscles: thigh (p18-25) ---------------- */
{ k: 'group', id: 'w2_thigh', l: 'Thigh', parent: 'll_muscles', w: 2, src: [LL, 18] },
{ k: 'group', id: 'w2_antthigh', l: 'Anterior thigh', parent: 'w2_thigh', w: 2, src: [LL, 18] },
{ k: 'muscle', id: 'w2_iliopsoas', l: 'Iliopsoas', parent: 'w2_antthigh', w: 2, joints: { w2_j_hip: 'flexion (the strongest; alone it can perform pure hip flexion)' }, note: 'iliacus + psoas major', links: { muscleroles: 'prime mover of hip flexion' }, src: [LL, 18, 20, 24, 25] },
{ k: 'muscle', id: 'w2_sartorius', l: 'Sartorius', parent: 'w2_antthigh', w: 2, joints: { w2_j_hip: 'flexion, abduction, lateral rotation', w2_j_knee: 'flexion' }, links: { muscleroles: 'synergist of hip flexion' }, src: [LL, 18, 25] },
{ k: 'muscle', id: 'w2_tfl', l: 'Tensor fascia latae', parent: 'w2_antthigh', w: 2, joints: { w2_j_hip: 'abduction, medial rotation, flexion' }, links: { muscleroles: 'synergist of hip flexion' }, src: [LL, 18, 20, 24, 25] },
{ k: 'muscle', id: 'w2_pectineus', l: 'Pectineus', parent: 'w2_antthigh', w: 2, joints: { w2_j_hip: 'adduction, flexion; assists medial rotation' }, links: { muscleroles: 'synergist of hip flexion' }, src: [LL, 18, 20, 25] },
{ k: 'group', id: 'w2_quads', l: 'Quadriceps', parent: 'w2_antthigh', w: 2, line: 'the main knee extensor', src: [LL, 21, 23] },
{ k: 'muscle', id: 'w2_rf', l: 'Rectus femoris', parent: 'w2_quads', w: 2, joints: { w2_j_hip: 'flexion', w2_j_knee: 'extension' }, note: 'the only quadriceps muscle that does both', src: [LL, 21, 23] },
{ k: 'muscle', id: 'w2_vl', l: 'Vastus lateralis', parent: 'w2_quads', w: 2, joints: { w2_j_knee: 'extension' }, src: [LL, 21] },
{ k: 'muscle', id: 'w2_vi', l: 'Vastus intermedius', parent: 'w2_quads', w: 2, joints: { w2_j_knee: 'extension' }, src: [LL, 21] },
{ k: 'muscle', id: 'w2_vm', l: 'Vastus medialis', parent: 'w2_quads', w: 2, joints: { w2_j_knee: 'extension' }, src: [LL, 21] },
{ k: 'group', id: 'w2_medthigh', l: 'Medial thigh (adductor group)', parent: 'w2_thigh', w: 2, line: 'hip adduction', match: 'medial thigh muscles', src: [LL, 19] },
{ k: 'muscle', id: 'w2_addmag', l: 'Adductor magnus', parent: 'w2_medthigh', w: 2, joints: { w2_j_hip: 'adduction (the strongest); extension (its hamstring part)' }, src: [LL, 24, 19] },
{ k: 'group', id: 'w2_postthigh', l: 'Posterior thigh (hamstring)', parent: 'w2_thigh', w: 2, line: 'the main knee flexor; also hip extension', match: 'posterior thigh muscles', links: { muscleroles: 'antagonist to hip flexion' }, src: [LL, 22, 23, 25] },
{ k: 'muscle', id: 'w2_biceps', l: 'Biceps femoris', parent: 'w2_postthigh', w: 2, joints: { w2_j_hip: 'extension', w2_j_knee: 'flexion' }, note: 'long head and short head', src: [LL, 22] },
{ k: 'muscle', id: 'w2_semiten', l: 'Semitendinosus', parent: 'w2_postthigh', w: 2, joints: { w2_j_hip: 'extension', w2_j_knee: 'flexion' }, old: true, src: [OLD, 47] },
{ k: 'muscle', id: 'w2_semimem', l: 'Semimembranosus', parent: 'w2_postthigh', w: 2, joints: { w2_j_hip: 'extension', w2_j_knee: 'flexion' }, old: true, src: [OLD, 47] },

/* ---------------- muscles: leg compartments (p27-32) ---------------- */
{ k: 'group', id: 'w2_legcomp', l: 'Leg compartments', parent: 'll_muscles', w: 2, line: 'anterior, lateral, superficial posterior, deep posterior', match: 'compartment in lower leg', src: [LL, 27] },
{ k: 'group', id: 'w2_antleg', l: 'Anterior compartment', parent: 'w2_legcomp', w: 2, line: 'dorsiflexion', src: [LL, 28] },
{ k: 'muscle', id: 'w2_ta', l: 'Tibialis anterior', parent: 'w2_antleg', w: 2, joints: { w2_j_ankle: 'dorsiflexion (the main one)', w2_j_subtalar: 'inversion (with tibialis posterior)' }, src: [LL, 28, 32] },
{ k: 'muscle', id: 'w2_ehl', l: 'Extensor hallucis longus', parent: 'w2_antleg', w: 2, joints: { w2_j_ankle: 'assists dorsiflexion' }, note: 'extends the big toe', src: [LL, 28, 32] },
{ k: 'muscle', id: 'w2_edl', l: 'Extensor digitorum longus', parent: 'w2_antleg', w: 2, joints: { w2_j_ankle: 'assists dorsiflexion' }, note: 'extends toes 2-5', src: [LL, 28, 32] },
{ k: 'group', id: 'w2_latleg', l: 'Lateral compartment', parent: 'w2_legcomp', w: 2, line: 'plantar flexion, eversion', src: [LL, 29] },
{ k: 'muscle', id: 'w2_fl', l: 'Fibularis longus', parent: 'w2_latleg', w: 2, joints: { w2_j_ankle: 'plantar flexion', w2_j_subtalar: 'eversion' }, src: [LL, 29, 32] },
{ k: 'muscle', id: 'w2_fb', l: 'Fibularis brevis', parent: 'w2_latleg', w: 2, joints: { w2_j_ankle: 'plantar flexion', w2_j_subtalar: 'eversion' }, src: [LL, 29, 32] },
{ k: 'group', id: 'w2_suppost', l: 'Superficial posterior compartment', parent: 'w2_legcomp', w: 2, line: 'plantar flexion (the main one)', src: [LL, 31, 32] },
{ k: 'muscle', id: 'w2_gastroc', l: 'Gastrocnemius', parent: 'w2_suppost', w: 2, joints: { w2_j_ankle: 'plantar flexion', w2_j_knee: 'flexion' }, note: 'running, walking, jumping', src: [LL, 31] },
{ k: 'muscle', id: 'w2_soleus', l: 'Soleus', parent: 'w2_suppost', w: 2, joints: { w2_j_ankle: 'plantar flexion' }, note: 'standing; standing up from sitting', src: [LL, 31] },
{ k: 'muscle', id: 'w2_plantaris', l: 'Plantaris', parent: 'w2_suppost', w: 2, joints: { w2_j_ankle: 'plantar flexion', w2_j_knee: 'flexion' }, src: [LL, 31] },
{ k: 'group', id: 'w2_deeppost', l: 'Deep posterior compartment', parent: 'w2_legcomp', w: 2, line: 'plantar flexion, inversion', src: [LL, 30] },
{ k: 'muscle', id: 'w2_tp', l: 'Tibialis posterior', parent: 'w2_deeppost', w: 2, joints: { w2_j_ankle: 'plantar flexion', w2_j_subtalar: 'inversion' }, note: 'stabilises the lower leg; supports the medial arch', src: [LL, 30, 32] },
{ k: 'muscle', id: 'w2_fdl', l: 'Flexor digitorum longus', parent: 'w2_deeppost', w: 2, joints: { w2_j_ankle: 'plantar flexion' }, note: 'flexes toes 2-5', src: [LL, 30, 32] },
{ k: 'muscle', id: 'w2_fhl', l: 'Flexor hallucis longus', parent: 'w2_deeppost', w: 2, joints: { w2_j_ankle: 'plantar flexion' }, note: 'flexes the big toe', src: [LL, 30, 32] },
{ k: 'group', id: 'w2_footint', l: 'Foot (intrinsic) muscles', parent: 'll_muscles', w: 2, line: 'dorsum, superficial plantar and deep plantar layers move the toes', match: 'superficial plantar', src: [LL, 34] },

/* ---------------- nerves (p33) ---------------- */
{ k: 'group', id: 'w2_llnerves', l: 'Lower-limb nerves', parent: 'plexuses', w: 2, match: 'sciatic n.', src: [LL, 33] },
{ k: 'nerve', id: 'w2_n_supglut', l: 'Superior gluteal nerve', parent: 'w2_llnerves', w: 2, supplies: { w2_gmed: 'supplies the hip abductors', w2_gmin: 'supplies the hip abductors', w2_tfl: 'supplies the hip abductors' }, match: 'superior gluteal n.', src: [LL, 33, 24] },
{ k: 'nerve', id: 'w2_n_infglut', l: 'Inferior gluteal nerve', parent: 'w2_llnerves', w: 2, supplies: { w2_gmax: 'supplies gluteus maximus' }, match: 'inferior gluteal n.', src: [LL, 33] },
{ k: 'nerve', id: 'w2_n_femoral', l: 'Femoral nerve', parent: 'w2_llnerves', w: 2, line: 'hip flexor, knee extensor', supplies: { w2_quads: 'supplies the knee extensors' }, match: 'femoral n.', src: [LL, 33] },
{ k: 'nerve', id: 'w2_n_obturator', l: 'Obturator nerve', parent: 'w2_llnerves', w: 2, supplies: { w2_medthigh: 'supplies the hip adductors' }, match: 'obturator n.', src: [LL, 33] },
{ k: 'nerve', id: 'w2_n_sciatic', l: 'Sciatic nerve', parent: 'w2_llnerves', w: 2, supplies: { w2_postthigh: 'supplies the knee flexors' }, match: 'sciatic n.', src: [LL, 33] },
{ k: 'nerve', id: 'w2_n_tibial', l: 'Tibial nerve', parent: 'w2_llnerves', w: 2, supplies: { w2_suppost: 'supplies the plantarflexors', w2_deeppost: 'supplies the plantarflexors' }, match: 'tibial n', src: [LL, 33] },
{ k: 'nerve', id: 'w2_n_comperon', l: 'Common peroneal nerve', parent: 'w2_llnerves', w: 2, supplies: { w2_antleg: 'supplies the dorsiflexors' }, match: 'common peroneal n.', src: [LL, 33] },
];
