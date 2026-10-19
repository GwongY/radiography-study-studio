/*
 * HSS2011 · Week 6 leaves — the brain and the cranial nerves.
 *
 * Read off 2627_M2_L6_brain_cranial_N.pdf (hss.l6.2026), page by page. One row per
 * structure the page text names, in the slide's words; a structure only in a picture has
 * no row. Row kinds and fields: outputs/revision/leaves.js. Recipe:
 * docs/superpowers/plans/2026-10-19-revise-depth-w5-w7.md.
 */
const L6 = 'hss.l6.2026';

export const SOURCES = {
  [L6]: 'Week 6 brain and cranial-nerve slides',
};

export const ROWS = [
/* ---------------- overview of the brain (p4-8) ---------------- */
{ k: 'group', id: 'w6_cerebrum', l: 'Cerebrum', parent: 'cerebrum', w: 6, line: '83% of brain volume; pair of half globes', src: [L6, 5, 4] },
{ k: 'part', id: 'w6_hemispheres', l: 'Hemispheres', parent: 'w6_cerebrum', w: 6, line: 'pair of half globes', src: [L6, 5] },
{ k: 'part', id: 'w6_longfissure', l: 'Longitudinal fissure', parent: 'w6_cerebrum', w: 6, line: 'separates the hemispheres', src: [L6, 5] },
{ k: 'part', id: 'w6_corpuscallosum', l: 'Corpus callosum', parent: 'w6_cerebrum', w: 6, line: 'bundle of nerve fibers connecting the hemispheres', src: [L6, 5] },
{ k: 'part', id: 'w6_gyrus', l: 'Gyrus', parent: 'w6_cerebrum', w: 6, line: 'thick folds/elevations on cerebrum', src: [L6, 5] },
{ k: 'part', id: 'w6_sulcus', l: 'Sulcus', parent: 'w6_cerebrum', w: 6, line: 'deep groove/depression', src: [L6, 5] },

{ k: 'group', id: 'w6_cerebellum', l: 'Cerebellum', parent: 'cerebellum', w: 6, line: 'inferior, posterior to cerebrum; 10% of brain volume',
  links: { w6_cerebrum: 'inferior, posterior to cerebrum' }, src: [L6, 6, 4] },
{ k: 'part', id: 'w6_transfissure', l: 'Transverse cerebral fissure', parent: 'w6_cerebellum', w: 6, line: 'separates cerebellum from cerebrum', src: [L6, 6] },

{ k: 'group', id: 'w6_brainstem', l: 'Brainstem', parent: 'brainstem', w: 6, line: 'essential for survival; vital functions',
  links: { spinalcord: 'continues as spinal cord inferiorly' }, src: [L6, 7, 4] },

{ k: 'group', id: 'w6_graymatter', l: 'Gray matter in the brain', parent: 'w6_cerebrum', w: 6, line: 'at outer surface of cerebrum (cortex)', src: [L6, 8] },
{ k: 'part', id: 'w6_cortex', l: 'Cortex', parent: 'w6_graymatter', w: 6, line: 'outer surface of cerebrum', src: [L6, 8] },
{ k: 'part', id: 'w6_nuclei', l: 'Nuclei', parent: 'w6_graymatter', w: 6, line: 'deeper masses, collection of neuronal soma', src: [L6, 8] },
{ k: 'part', id: 'w6_whitematter', l: 'White matter in the brain', parent: 'w6_cerebrum', w: 6, line: 'bundle of axons; connecting brain to spinal cord, or within the cerebrums', src: [L6, 8] },

/* ---------------- meninges of the brain (p9-11) ----------------
   The three membranes are the w5 layer rows (dura, arachnoid, pia); only what the brain
   pages add hangs from them. */
{ k: 'part', id: 'w6_endosteal', l: 'Endosteal layer', parent: 'w5_dura', w: 6, line: 'attached to cranial bones', src: [L6, 10] },
{ k: 'part', id: 'w6_duralmeningeal', l: 'Meningeal layer', parent: 'w5_dura', w: 6, line: 'inner layer', src: [L6, 10] },
{ k: 'part', id: 'w6_duralsinus', l: 'Dural sinus', parent: 'w5_dura', w: 6, line: 'space between the two dural layers; collect blood, empties into veins', src: [L6, 10] },
{ k: 'part', id: 'w6_supsagsinus', l: 'Superior sagittal sinus', parent: 'w6_duralsinus', w: 6, line: 'e.g. of a dural sinus', src: [L6, 10] },
{ k: 'group', id: 'w6_duralfolds', l: 'Dural folds', match: 'dura mater fold inward', parent: 'w5_dura', w: 6, line: 'fold inward to separate major parts of brain', src: [L6, 11] },
{ k: 'part', id: 'w6_falxcerebri', l: 'Falx cerebri', parent: 'w6_duralfolds', w: 6, src: [L6, 11] },
{ k: 'part', id: 'w6_falxcerebelli', l: 'Falx cerebelli', match: 'Falx cerebrelli', parent: 'w6_duralfolds', w: 6, src: [L6, 11] },

/* ---------------- ventricles and CSF (p12-14) ---------------- */
{ k: 'part', id: 'w6_csf', l: 'Cerebrospinal fluid (CSF)', match: 'cerebrospinal fluid', parent: 'csf', w: 6, line: 'fills the hollow space in the brain', src: [L6, 12, 13] },
{ k: 'group', id: 'w6_ventsys', l: 'Ventricular system', parent: 'csf', w: 6, line: '4 chambers (ventricles)', src: [L6, 13] },
{ k: 'part', id: 'w6_latvent', l: 'Lateral ventricles', parent: 'w6_ventsys', w: 6, line: 'x 2: in each cerebral hemisphere', src: [L6, 13] },
{ k: 'part', id: 'w6_ivforamen', l: 'Interventricular foramen', parent: 'w6_ventsys', w: 6, line: 'connects third ventricle to lateral ventricles', links: { w6_latvent: 'third ventricle connects to lat. ventricles via it' }, src: [L6, 13] },
{ k: 'part', id: 'w6_thirdvent', l: 'Third ventricle', parent: 'w6_ventsys', w: 6, line: 'connect to lat. ventricles via interventricular foramen', links: { w6_latvent: 'connect to lat. ventricles via interventricular foramen' }, src: [L6, 13] },
{ k: 'part', id: 'w6_aqueduct', l: 'Cerebral aqueduct', parent: 'w6_ventsys', w: 6, line: 'connects fourth ventricle to third ventricle', links: { w6_thirdvent: 'fourth ventricle connects to third ventricle via it' }, src: [L6, 13] },
{ k: 'part', id: 'w6_fourthvent', l: 'Fourth ventricle', parent: 'w6_ventsys', w: 6, line: 'connect to third ventricle via cerebral aqueduct', links: { w6_thirdvent: 'connect to third ventricle via cerebral aqueduct' }, src: [L6, 13] },
{ k: 'part', id: 'w6_centralcanal', l: 'Central canal', parent: 'w6_ventsys', w: 6, line: 'fourth ventricle continues as it in spinal cord', links: { w6_fourthvent: 'fourth ventricle continues as central canal', spinalcord: 'in spinal cord' }, src: [L6, 13] },
{ k: 'part', id: 'w6_choroid', l: 'Choroid plexus', parent: 'w6_ventsys', w: 6, line: 'spongy mass of blood capillaries on floor of ventricles; produces CSF', links: { w6_csf: 'produces CSF' }, src: [L6, 13] },
{ k: 'group', id: 'w6_csffunc', l: 'Functions of CSF', parent: 'w6_csf', w: 6, src: [L6, 14] },
{ k: 'part', id: 'w6_buoyancy', l: 'Provide buoyancy', parent: 'w6_csffunc', w: 6, line: 'prevent brain from collapse due to own weight', src: [L6, 14] },
{ k: 'part', id: 'w6_cushioning', l: 'Cushioning', parent: 'w6_csffunc', w: 6, line: 'prevent brain from striking the cranium', src: [L6, 14] },
{ k: 'part', id: 'w6_chemstab', l: 'Chemical stability', parent: 'w6_csffunc', w: 6, line: 'remove metabolic wastes, maintain chemical environment', src: [L6, 14] },

/* ---------------- brain barrier system (p15) ---------------- */
{ k: 'part', id: 'w6_bbs', l: 'Brain Barrier system', parent: 'bbb', w: 6, line: 'regulates substances from blood stream into the brain', src: [L6, 15] },
{ k: 'part', id: 'w6_bbbarrier', l: 'Blood-Brain barrier', parent: 'w6_bbs', w: 6, line: 'astrocytes stimulate tight junctions between endothelial cells', links: { w5_astrocytes: 'astrocytes contact blood capillaries' }, src: [L6, 15] },
{ k: 'part', id: 'w6_bloodcsf', l: 'Blood-CSF barrier', parent: 'w6_bbs', w: 6, line: 'formed at choroid plexus, by ependymal cells', links: { w6_choroid: 'formed at choroid plexus', w5_ependymal: 'formed by ependymal cells' }, src: [L6, 15] },
];
