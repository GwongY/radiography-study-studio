/*
 * HSS2011 · Week 4 leaves — skull, vertebral column, head, neck and trunk muscles.
 *
 * Read off W4_Head_Neck_Trunk_2026_CKK_upload_20260920.pdf (hss.hnt.2026), page by page.
 * One row per structure the page text names, in the slide's words; a structure only in a
 * picture has no row. Row kinds and fields: outputs/revision/leaves.js. Recipe:
 * docs/superpowers/plans/2026-10-19-revise-depth-w1-w3-w4.md.
 */
const HN = 'hss.hnt.2026';
const SP17 = 'hss.special.2017';

export const SOURCES = {
  [HN]: 'Week 4 head, neck and trunk slides',
  [SP17]: '2017 Special Senses lecture (older deck)',
};

export const ROWS = [
/* ---------------- cranial and facial bones (p5, 7) ---------------- */
{ k: 'group', id: 'w4_cranial', l: 'Cranial bones', parent: 'skull', w: 4, line: '(8) surround and protect the brain', src: [HN, 5] },
{ k: 'bone', id: 'w4_frontal', l: 'Frontal bone', parent: 'w4_cranial', w: 4, src: [HN, 8] },
{ k: 'bone', id: 'w4_parietal', l: 'Parietal', parent: 'w4_cranial', w: 4, line: 'x2', src: [HN, 5] },
{ k: 'bone', id: 'w4_temporal', l: 'Temporal', parent: 'w4_cranial', w: 4, line: 'x2', joints: ['w1_j_tmj'], src: [HN, 5, 11] },
{ k: 'bone', id: 'w4_occipital', l: 'Occipital', parent: 'w4_cranial', w: 4, src: [HN, 5] },
{ k: 'bone', id: 'w4_ethmoid', l: 'Ethmoid', parent: 'w4_cranial', w: 4, src: [HN, 5, 6, 7, 8] },
{ k: 'bone', id: 'w4_sphenoid', l: 'Sphenoid', parent: 'w4_cranial', w: 4, src: [HN, 5, 8] },

{ k: 'group', id: 'w4_facial', l: 'Facial bones', parent: 'skull', w: 4, line: '(14) protect and support the entrances to the digestive and respiratory tracts', src: [HN, 5] },
{ k: 'bone', id: 'w4_nasal', l: 'Nasal bone', match: 'Nasal (x2)', parent: 'w4_facial', w: 4, line: 'x2', src: [HN, 5, 7] },
{ k: 'bone', id: 'w4_lacrimal', l: 'Lacrimal bone', parent: 'w4_facial', w: 4, line: 'x2', src: [HN, 8] },
{ k: 'bone', id: 'w4_maxilla', l: 'Maxilla', parent: 'w4_facial', w: 4, line: 'x2', src: [HN, 5, 7, 8] },
{ k: 'bone', id: 'w4_zygomatic', l: 'Zygomatic bone', parent: 'w4_facial', w: 4, line: 'x2', src: [HN, 8] },
{ k: 'bone', id: 'w4_palatine', l: 'Palatine bone', parent: 'w4_facial', w: 4, line: 'x2', src: [HN, 8] },
{ k: 'bone', id: 'w4_concha', l: 'Inferior nasal concha', parent: 'w4_facial', w: 4, line: 'x2', src: [HN, 5, 7] },
{ k: 'bone', id: 'w4_vomer', l: 'Vomer', parent: 'w4_facial', w: 4, src: [HN, 5, 7] },
{ k: 'bone', id: 'w4_mandible', l: 'Mandible', parent: 'w4_facial', w: 4, joints: ['w1_j_tmj'], src: [HN, 5, 7, 11] },

/* ---------------- sutures and junctions (p6) ---------------- */
{ k: 'group', id: 'w4_sutures', l: 'Sutures', match: 'suture', parent: 'skull', w: 4, src: [HN, 6] },
{ k: 'part', id: 'w4_coronal', l: 'Coronal suture', parent: 'w4_sutures', w: 4, src: [HN, 6] },
{ k: 'part', id: 'w4_sagittal', l: 'Sagittal suture', match: 'Sagittal', parent: 'w4_sutures', w: 4, src: [HN, 6] },
{ k: 'part', id: 'w4_lambdoid', l: 'Lambdoid suture', parent: 'w4_sutures', w: 4, src: [HN, 6] },
{ k: 'part', id: 'w4_squamous', l: 'Squamous suture', parent: 'w4_sutures', w: 4, src: [HN, 6] },
{ k: 'part', id: 'w4_occtemp', l: 'Occipitotemporal suture', parent: 'w4_sutures', w: 4, src: [HN, 6] },
{ k: 'part', id: 'w4_parmast', l: 'Parietomastoid suture', parent: 'w4_sutures', w: 4, src: [HN, 6] },
{ k: 'part', id: 'w4_bregma', l: 'Bregma', parent: 'w4_sutures', w: 4, src: [HN, 6] },
{ k: 'part', id: 'w4_lambda', l: 'Lambda', parent: 'w4_sutures', w: 4, src: [HN, 6] },
{ k: 'part', id: 'w4_pterion', l: 'Pterion', parent: 'w4_sutures', w: 4, src: [HN, 6] },
{ k: 'part', id: 'w4_asterion', l: 'Asterion', parent: 'w4_sutures', w: 4, src: [HN, 6] },

/* ---------------- orbit (p8) ---------------- */
{ k: 'group', id: 'w4_orbit', l: 'Orbit', parent: 'orbit', w: 4, line: 'the bony cavity in the skull that houses the eyeball', src: [HN, 8],
  links: { w4_frontal: 'labelled on the orbit slide', w4_sphenoid: 'labelled on the orbit slide', w4_zygomatic: 'labelled on the orbit slide', w4_maxilla: 'labelled on the orbit slide', w4_ethmoid: 'labelled on the orbit slide', w4_lacrimal: 'labelled on the orbit slide', w4_palatine: 'labelled on the orbit slide' } },
{ k: 'part', id: 'w4_sof', l: 'Superior orbital fissure', parent: 'w4_orbit', w: 4, src: [HN, 8] },
{ k: 'part', id: 'w4_iof', l: 'Inferior orbital fissure', match: 'Interior orbital fissure', parent: 'w4_orbit', w: 4, src: [HN, 8] },
{ k: 'part', id: 'w4_infragroove', l: 'Infraorbital groove', parent: 'w4_orbit', w: 4, src: [HN, 8] },
{ k: 'part', id: 'w4_infraforamen', l: 'Infraorbital foramen', parent: 'w4_orbit', w: 4, src: [HN, 8] },
{ k: 'part', id: 'w4_supranotch', l: 'Supraorbital notch', parent: 'w4_orbit', w: 4, src: [HN, 8] },
{ k: 'part', id: 'w4_opticcanal', l: 'Optic canal', parent: 'w4_orbit', w: 4, src: [HN, 8] },
{ k: 'part', id: 'w4_lacsulcus', l: 'Lacrimal sulcus', parent: 'w4_orbit', w: 4, src: [HN, 8] },
{ k: 'part', id: 'w4_nasolac', l: 'Nasolacrimal canal', parent: 'w4_orbit', w: 4, src: [HN, 8] },

/* ---------------- base of skull (p19) ---------------- */
{ k: 'group', id: 'w4_base', l: 'Base of skull', parent: 'skull', w: 4, src: [HN, 19] },
{ k: 'part', id: 'w4_fmagnum', l: 'Foramen magnum', parent: 'w4_base', w: 4, src: [HN, 19] },
{ k: 'part', id: 'w4_condyle', l: 'Occipital condyle', parent: 'w4_base', w: 4, src: [HN, 19] },
{ k: 'part', id: 'w4_odontoid', l: 'Odontoid process', parent: 'w4_base', w: 4, src: [HN, 19] },

/* ---------------- temporomandibular joint (p11; the joint row is w1_j_tmj) ---------------- */
{ k: 'part', id: 'w4_mandcondyle', l: 'Condyle of mandible', parent: 'w1_j_tmj', w: 4, src: [HN, 11] },
{ k: 'part', id: 'w4_mandfossa', l: 'Mandibular fossa', parent: 'w1_j_tmj', w: 4, src: [HN, 11] },
{ k: 'part', id: 'w4_articdisc', l: 'Articular disc', parent: 'w1_j_tmj', w: 4, src: [HN, 11] },

/* ---------------- vertebral column (p17, 18) ---------------- */
{ k: 'group', id: 'w4_vcolumn', l: 'Vertebral column', parent: 'vertebrae', w: 4, line: 'chain of 33 vertebrae with intervertebral discs in between', src: [HN, 17, 18] },
{ k: 'part', id: 'w4_ivdisc', l: 'Intervertebral discs', parent: 'w4_vcolumn', w: 4, line: 'in between each vertebra', src: [HN, 17, 18] },

/* cervical (p19, 20) */
{ k: 'group', id: 'w4_cervical', l: 'Cervical vertebrae', parent: 'w4_vcolumn', w: 4, line: 'Cervical (7)', src: [HN, 20, 17] },
{ k: 'bone', id: 'w4_atlas', l: 'Atlas', match: 'Altas', parent: 'w4_cervical', w: 4, src: [HN, 19] },
{ k: 'part', id: 'w4_atlasfacet', l: 'Superior articulate facet of the atlas', match: 'superior articulate', parent: 'w4_atlas', w: 4, src: [HN, 19], links: { w4_condyle: 'superior articulate facet of the atlas' } },
{ k: 'bone', id: 'w4_axis', l: 'Axis', parent: 'w4_cervical', w: 4, src: [HN, 19] },
{ k: 'part', id: 'w4_vbody', l: 'Vertebral body', parent: 'w4_cervical', w: 4, src: [HN, 20] },
{ k: 'part', id: 'w4_varch', l: 'Vertebral arch', parent: 'w4_cervical', w: 4, src: [HN, 20] },
{ k: 'part', id: 'w4_vforamen', l: 'Vertebral foramen', parent: 'w4_cervical', w: 4, src: [HN, 20, 26] },
{ k: 'part', id: 'w4_pedicle', l: 'Pedicle', parent: 'w4_cervical', w: 4, src: [HN, 20] },
{ k: 'part', id: 'w4_lamina', l: 'Lamina', parent: 'w4_cervical', w: 4, src: [HN, 20] },
{ k: 'part', id: 'w4_transproc', l: 'Transverse process', parent: 'w4_cervical', w: 4, src: [HN, 20, 22] },
{ k: 'part', id: 'w4_costalproc', l: 'Costal process', parent: 'w4_cervical', w: 4, src: [HN, 20] },
{ k: 'part', id: 'w4_spinous', l: 'Spinous process', parent: 'w4_cervical', w: 4, src: [HN, 20] },
{ k: 'part', id: 'w4_supproc', l: 'Superior articular process', parent: 'w4_cervical', w: 4, src: [HN, 20] },
{ k: 'part', id: 'w4_supfacet', l: 'Superior articular facet', parent: 'w4_cervical', w: 4, src: [HN, 20] },
{ k: 'part', id: 'w4_transforamen', l: 'Transverse foramen', parent: 'w4_cervical', w: 4, src: [HN, 20] },

/* thoracic and ribs (p22 to 24) */
{ k: 'group', id: 'w4_thoracic', l: 'Thoracic vertebrae', parent: 'w4_vcolumn', w: 4, line: 'Total 12 thoracic vertebrae', src: [HN, 22, 23],
  links: { w4_j_cv: 'costal facets articulate with the ribs', w4_j_ct: 'transverse process and ribs jointed by ligaments' } },
{ k: 'part', id: 'w4_costalfacet_s', l: 'Superior costal facet', parent: 'w4_thoracic', w: 4, src: [HN, 24] },
{ k: 'part', id: 'w4_costalfacet_i', l: 'Inferior costal facet', parent: 'w4_thoracic', w: 4, src: [HN, 24] },
{ k: 'part', id: 'w4_costalfacet_t', l: 'Transverse costal facet', parent: 'w4_thoracic', w: 4, src: [HN, 24] },
{ k: 'group', id: 'w4_ribcage', l: 'Rib cage', parent: 'w4_thoracic', w: 4, src: [HN, 23] },
{ k: 'bone', id: 'w4_trueribs', l: 'True ribs', parent: 'w4_ribcage', w: 4, line: '(1-7)', src: [HN, 23] },
{ k: 'bone', id: 'w4_falseribs', l: 'False ribs', parent: 'w4_ribcage', w: 4, line: '(8-12)', src: [HN, 23] },
{ k: 'bone', id: 'w4_floatribs', l: 'Floating ribs', parent: 'w4_falseribs', w: 4, line: '(11-12), subgroup of false ribs', src: [HN, 23] },
{ k: 'part', id: 'w4_costalcart', l: 'Costal cartilages', parent: 'w4_ribcage', w: 4, line: 'ribs 1-10 joint with sternum via costal cartilages', src: [HN, 23], links: { w3_sternum: 'ribs 1-10 joint with sternum via costal cartilages' } },
{ k: 'joint', id: 'w4_j_cv', l: 'Costovertebral joint', parent: 'joints', w: 4, src: [HN, 24] },
{ k: 'joint', id: 'w4_j_ct', l: 'Costotransverse joint', parent: 'joints', w: 4, src: [HN, 24] },
{ k: 'joint', id: 'w4_j_facet', l: 'Facet joints', parent: 'joints', w: 4, line: 'superior articular facet meets inferior facet of the vertebra above', src: [HN, 22] },

/* lumbar (p26, 27) */
{ k: 'group', id: 'w4_lumbar', l: 'Lumbar vertebrae', parent: 'w4_vcolumn', w: 4, line: '5 lumbar vertebrae; massive kidney-shaped bodies, thick laminae', src: [HN, 26] },
{ k: 'part', id: 'w4_lumfacets', l: 'Articular facets', parent: 'w4_lumbar', w: 4, line: 'face laterally and medially', src: [HN, 26, 27] },
{ k: 'group', id: 'w4_facetorient', l: 'Articular facets orientation', parent: 'w4_vcolumn', w: 4, src: [HN, 27] },
{ k: 'part', id: 'w4_fo_oblique', l: 'Oblique', parent: 'w4_facetorient', w: 4, line: '(~45) allow flexion/extension, rotation, lateral flexion', src: [HN, 27] },
{ k: 'part', id: 'w4_fo_frontal', l: 'Mostly frontal', parent: 'w4_facetorient', w: 4, line: '(slightly oblique) rotation; other actions limited by ribs', src: [HN, 27] },
{ k: 'part', id: 'w4_fo_sagittal', l: 'Mostly sagittal', parent: 'w4_facetorient', w: 4, line: 'flexion/extension', src: [HN, 27] },

/* sacrum and coccyx (p28) */
{ k: 'bone', id: 'w4_sacrum', l: 'Sacrum', parent: 'w4_vcolumn', w: 4, line: 'triangular; five vertebrae fully fused by age 26', joints: ['w2_j_si'], src: [HN, 28] },
{ k: 'bone', id: 'w4_coccyx', l: 'Coccyx', parent: 'w4_vcolumn', w: 4, line: 'Coccygeal (4)', src: [HN, 28, 17] },

/* ---------------- eyeball (p8, 9) ---------------- */
{ k: 'part', id: 'w4_eyeball', l: 'Eyeball', parent: 'orbit', w: 4, line: 'the extraocular muscles control the movement of the eyeball', src: [HN, 8, 9] },
/* extraocular muscles: the older deck (p6) names them; the Week 4 slide (p9) gives the actions under the initials */
{ k: 'muscle', id: 'w4_mr', l: 'Medial rectus', parent: 'extraocular', w: 4, moves: { w4_eyeball: 'adduct (in)' }, note: 'labelled MR on the Week 4 slide', old: true, src: [SP17, 6] },
{ k: 'muscle', id: 'w4_lr', l: 'Lateral rectus', parent: 'extraocular', w: 4, moves: { w4_eyeball: 'abduct (out)' }, note: 'labelled LR on the Week 4 slide', old: true, src: [SP17, 6] },
{ k: 'muscle', id: 'w4_sr', l: 'Superior rectus', parent: 'extraocular', w: 4, moves: { w4_eyeball: 'elevate, intorsion, adduct (in)' }, note: 'labelled SR on the Week 4 slide', old: true, src: [SP17, 6] },
{ k: 'muscle', id: 'w4_ir', l: 'Inferior rectus', parent: 'extraocular', w: 4, moves: { w4_eyeball: 'depress, extorsion, adduct (in)' }, note: 'labelled IR on the Week 4 slide', old: true, src: [SP17, 6] },
{ k: 'muscle', id: 'w4_so', l: 'Superior oblique', parent: 'extraocular', w: 4, moves: { w4_eyeball: 'intorsion, depress, abduct (out)' }, note: 'labelled SO on the Week 4 slide', old: true, src: [SP17, 6] },
{ k: 'muscle', id: 'w4_io', l: 'Inferior oblique', parent: 'extraocular', w: 4, moves: { w4_eyeball: 'extorsion, elevate, abduct (out)' }, note: 'labelled IO on the Week 4 slide', old: true, src: [SP17, 6] },

/* ---------------- muscles that move the mandible (p10) ---------------- */
{ k: 'group', id: 'w4_mandmusc', l: 'Muscles that move mandible', parent: 'headneck_muscles', w: 4, src: [HN, 10] },
{ k: 'muscle', id: 'w4_temporalis', l: 'Temporalis', parent: 'w4_mandmusc', w: 4, moves: { w4_mandible: 'elevate and retrude mandible' }, src: [HN, 10] },
{ k: 'muscle', id: 'w4_masseter', l: 'Masseter', parent: 'w4_mandmusc', w: 4, moves: { w4_mandible: 'elevate mandible (weakly protrude)' }, src: [HN, 10] },
{ k: 'muscle', id: 'w4_medpterygoid', l: 'Medial pterygoid', match: 'M. pterygoid', parent: 'w4_mandmusc', w: 4, moves: { w4_mandible: 'bilaterally protrude and elevate; unilaterally swing jaw laterally' }, src: [HN, 10] },
{ k: 'muscle', id: 'w4_latpterygoid', l: 'Lateral pterygoid', match: 'L. pterygoid', parent: 'w4_mandmusc', w: 4, moves: { w4_mandible: 'bilaterally protrude and depress; unilaterally swing jaw laterally' }, src: [HN, 10] },

/* ---------------- muscles of the tongue (p12) ---------------- */
{ k: 'part', id: 'w4_tongue', l: 'Tongue', parent: 'headneck_muscles', w: 4, src: [HN, 12] },
{ k: 'group', id: 'w4_tongue_int', l: 'Intrinsic tongue muscles', parent: 'w4_tongue', w: 4, line: 'change the shape of the tongue', src: [HN, 12] },
{ k: 'group', id: 'w4_tongue_ext', l: 'Extrinsic tongue muscles', match: 'extrinsic muscles', parent: 'w4_tongue', w: 4, line: 'move and position the tongue', src: [HN, 12] },

/* ---------------- muscles of the neck (p14 to 16) ---------------- */
{ k: 'group', id: 'w4_neckmusc', l: 'Anterior muscles of the neck', match: 'Anterior muscle of the', parent: 'headneck_muscles', w: 4, src: [HN, 14, 15] },
{ k: 'part', id: 'w4_lipmouth', l: 'Lower lip and angle of mouth', match: 'lower lip', parent: 'w4_neckmusc', w: 4, src: [HN, 14] },
{ k: 'muscle', id: 'w4_platysma', l: 'Platysma', parent: 'w4_neckmusc', w: 4, moves: { w4_lipmouth: 'draws downward, as in expressions of surprise, horror, anger, sadness' }, note: 'superficial muscle within the superficial cervical fascia', src: [HN, 14] },
{ k: 'muscle', id: 'w4_scm', l: 'Sternocleidomastoid', parent: 'w4_neckmusc', w: 4, moves: { w4_cervical: 'unilateral: ipsilateral flexion, contralateral rotation; bilateral: head extension', w4_ribcage: 'elevation of rib cage (inspiration)' }, note: 'neck flexor; superficial neck muscle', src: [HN, 15] },
{ k: 'group', id: 'w4_scalenes', l: 'Scalene muscles', match: 'Scalene', parent: 'w4_neckmusc', w: 4, line: 'flexion, lateral flexion, neck rotation; and elevate ribs', src: [HN, 16] },
{ k: 'muscle', id: 'w4_antscalene', l: 'Anterior scalene', match: 'Anterior Scalene', parent: 'w4_scalenes', w: 4, moves: { w4_cervical: 'flexion, lateral flexion, rotation', w4_ribcage: 'elevate ribs' }, note: 'C3-C6 to 1st rib', src: [HN, 16] },
{ k: 'muscle', id: 'w4_midscalene', l: 'Middle scalene', match: 'Middle Scalene', parent: 'w4_scalenes', w: 4, moves: { w4_cervical: 'flexion, lateral flexion, rotation', w4_ribcage: 'elevate ribs' }, note: 'C2-C7 to 1st rib', src: [HN, 16] },
{ k: 'muscle', id: 'w4_postscalene', l: 'Posterior scalene', match: 'Posterior Scalene', parent: 'w4_scalenes', w: 4, moves: { w4_cervical: 'flexion, lateral flexion, rotation', w4_ribcage: 'elevate ribs' }, note: 'C5-C7 to 2nd rib', src: [HN, 16] },
{ k: 'muscle', id: 'w4_prevert', l: 'Prevertebral muscles', parent: 'w4_neckmusc', w: 4, moves: { w4_cervical: 'flexion and lateral flexion of head (capitis) and neck (colli)' }, note: 'neck flexor', src: [HN, 16] },

/* ---------------- muscles of the back (p29 to 31, 35) ---------------- */
{ k: 'group', id: 'w4_backextr', l: 'Extrinsic back muscles', match: 'Extrinsic (usually', parent: 'trunk_muscles', w: 4, line: 'usually moves shoulders and limbs; except trapezius', src: [HN, 29] },
{ k: 'group', id: 'w4_backintr', l: 'Intrinsic back muscles', match: 'Intrinsic (Deep)', parent: 'trunk_muscles', w: 4, line: 'move head; move and stabilise the vertebral column', src: [HN, 29, 30] },
{ k: 'muscle', id: 'w4_splcap', l: 'Splenius capitis', parent: 'w4_backintr', w: 4, moves: { w4_cervical: 'unilateral: laterally flex and rotate head and neck; bilateral: extend' }, note: 'a major extensor of the neck', src: [HN, 30, 35] },
{ k: 'muscle', id: 'w4_splcerv', l: 'Splenius cervicis', parent: 'w4_backintr', w: 4, moves: { w4_cervical: 'unilateral: laterally flex and rotate head and neck; bilateral: extend' }, note: 'a major extensor of the neck', src: [HN, 30, 35] },
{ k: 'muscle', id: 'w4_erector', l: 'Erector spinae', parent: 'w4_backintr', w: 4, moves: { w4_vcolumn: 'bilaterally main extensors of head and spine; unilaterally laterally flex' }, note: 'keeps the trunk upright', src: [HN, 30, 35] },
{ k: 'muscle', id: 'w4_spinalis', l: 'Spinalis', parent: 'w4_erector', w: 4, moves: { w4_vcolumn: 'listed with erector spinae: extends the spine bilaterally' }, note: 'the slide gives no separate action for spinalis', src: [HN, 30] },
{ k: 'group', id: 'w4_transpin', l: 'Transversospinalis', parent: 'w4_backintr', w: 4, line: 'stabilise the spine, maintain posture, control small intervertebral movement', src: [HN, 30] },
{ k: 'muscle', id: 'w4_semicap', l: 'Semispinalis capitis', parent: 'w4_transpin', w: 4, moves: { w4_cervical: 'major extensor of the neck' }, src: [HN, 31, 35] },
{ k: 'muscle', id: 'w4_semicerv', l: 'Semispinalis cervicis', parent: 'w4_transpin', w: 4, moves: { w4_cervical: 'major extensor of the neck' }, src: [HN, 31, 35] },
{ k: 'muscle', id: 'w4_semithor', l: 'Semispinalis thoracis', parent: 'w4_transpin', w: 4, moves: { w4_cervical: 'major extensor of the neck (semispinalis muscles)' }, src: [HN, 31, 35] },
{ k: 'muscle', id: 'w4_multifidus', l: 'Multifidus', parent: 'w4_transpin', w: 4, moves: { w4_vcolumn: 'major extensor of the vertebral column' }, src: [HN, 31, 35] },
{ k: 'muscle', id: 'w4_rotatores', l: 'Rotatores', parent: 'w4_transpin', w: 4, moves: { w4_vcolumn: 'major extensor of the vertebral column' }, src: [HN, 31, 35] },

/* ---------------- abdominal muscles (p32 to 35) ---------------- */
{ k: 'part', id: 'w4_abdcontents', l: 'Abdominal contents', parent: 'trunk_muscles', w: 4, src: [HN, 33] },
{ k: 'group', id: 'w4_anterolat', l: 'Anterolateral group', parent: 'trunk_muscles', w: 4, src: [HN, 32] },
{ k: 'muscle', id: 'w4_rectusabd', l: 'Rectus abdominis', parent: 'w4_anterolat', w: 4, moves: { w4_abdcontents: 'compresses abdominal contents', w4_vcolumn: 'flexes vertebral column' }, note: 'accessory muscle of expiration', src: [HN, 33] },
{ k: 'muscle', id: 'w4_extoblique', l: 'External oblique abdominis', match: 'External oblique', parent: 'w4_anterolat', w: 4, moves: { w4_abdcontents: 'supports and compresses abdominal contents', w4_vcolumn: 'assists in trunk flexing, side bending, and rotation' }, note: 'assists forced expiration, micturition, defecation and vomiting', src: [HN, 33] },
{ k: 'muscle', id: 'w4_intoblique', l: 'Internal oblique abdominis', match: 'Internal oblique', parent: 'w4_anterolat', w: 4, moves: { w4_vcolumn: 'with contralateral external oblique: flexion, lateral flexion or axial rotation' }, note: 'underneath the external oblique; functions similarly', src: [HN, 33] },
{ k: 'muscle', id: 'w4_transabd', l: 'Transverse abdominis', parent: 'w4_anterolat', w: 4, moves: { w4_abdcontents: 'holds abdominal contents' }, note: 'deepest layer', src: [HN, 33] },
{ k: 'group', id: 'w4_posterior', l: 'Posterior group', parent: 'trunk_muscles', w: 4, src: [HN, 32, 34] },
{ k: 'muscle', id: 'w4_psoas', l: 'Psoas major', parent: 'w4_posterior', w: 4, joints: { w2_j_hip: 'hip flexor (iliopsoas)' }, src: [HN, 34, 35] },
{ k: 'muscle', id: 'w4_iliacus', l: 'Iliacus', parent: 'w4_posterior', w: 4, joints: { w2_j_hip: 'hip flexor (iliopsoas)' }, src: [HN, 34, 35] },
{ k: 'muscle', id: 'w4_quadlumb', l: 'Quadratus lumborum', parent: 'w4_posterior', w: 4, joints: { w2_j_hip: 'hip stabiliser' }, note: 'transverse process L1-L4 to inferior border of rib 12', src: [HN, 34, 35] },
];
