/*
 * HSS2011 · Week 4 leaves — skull, vertebral column, head, neck and trunk muscles.
 *
 * Read off W4_Head_Neck_Trunk_2026_CKK_upload_20260920.pdf (hss.hnt.2026), page by page.
 * One row per structure the page text names, in the slide's words; a structure only in a
 * picture has no row. Row kinds and fields: outputs/revision/leaves.js. Recipe:
 * docs/superpowers/plans/2026-10-19-revise-depth-w1-w3-w4.md.
 */
const HN = 'hss.hnt.2026';

export const SOURCES = {
  [HN]: 'Week 4 head, neck and trunk slides',
};

export const ROWS = [
/* ---------------- cranial and facial bones (p5, 7) ---------------- */
{ k: 'group', id: 'w4_cranial', l: 'Cranial bones', parent: 'skull', w: 4, line: '(8) surround and protect the brain', src: [HN, 5] },
{ k: 'bone', id: 'w4_frontal', l: 'Frontal bone', parent: 'w4_cranial', w: 4, src: [HN, 8] },
{ k: 'bone', id: 'w4_parietal', l: 'Parietal', parent: 'w4_cranial', w: 4, line: 'x2', src: [HN, 5] },
{ k: 'bone', id: 'w4_temporal', l: 'Temporal', parent: 'w4_cranial', w: 4, line: 'x2', src: [HN, 5] },
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
{ k: 'bone', id: 'w4_mandible', l: 'Mandible', parent: 'w4_facial', w: 4, src: [HN, 5, 7] },

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
];
