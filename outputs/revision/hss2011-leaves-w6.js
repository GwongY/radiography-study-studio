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

/* ---------------- brainstem: medulla, pons, midbrain (p17-22) ---------------- */
{ k: 'group', id: 'w6_medulla', l: 'Medulla oblongata', parent: 'w6_brainstem', w: 6, line: 'contains all nerve fibers communicating brain and spinal cord', src: [L6, 18, 19, 17] },
{ k: 'group', id: 'w6_pons', l: 'Pons', parent: 'w6_brainstem', w: 6, line: 'bridge; 4 pairs of cranial nerves begin/end here',
  links: { reticular: 'part of reticular formation' }, src: [L6, 20, 17] },
{ k: 'group', id: 'w6_midbrain', l: 'Midbrain', parent: 'w6_brainstem', w: 6,
  links: { reticular: 'continuation of reticular formation' }, src: [L6, 21, 22, 17] },

{ k: 'part', id: 'w6_autonuclei', l: 'Autonomic nuclei', parent: 'w6_medulla', w: 6, line: 'visceral activities', src: [L6, 18, 19] },
{ k: 'part', id: 'w6_cvcentre', l: 'Cardiovascular centre', match: 'Cardiovascular: heart rate', parent: 'w6_autonuclei', w: 6, line: 'heart rate, contraction force', src: [L6, 19] },
{ k: 'part', id: 'w6_respcentre', l: 'Respiratory centre', match: 'Respiratory: pace of respiration', parent: 'w6_autonuclei', w: 6, line: 'pace of respiration', src: [L6, 19] },
{ k: 'part', id: 'w6_relaynuclei', l: 'Relay stations nuclei', parent: 'w6_medulla', w: 6, line: 'pass somatic information to the thalamus', src: [L6, 18] },
{ k: 'part', id: 'w6_cuneatus', l: 'Nucleus cuneatus', parent: 'w6_relaynuclei', w: 6, line: 'somatic sensation to thalamus', src: [L6, 19] },
{ k: 'part', id: 'w6_gracilis', l: 'Nucleus gracilis', match: 'cuneatus and gracilis', parent: 'w6_relaynuclei', w: 6, line: 'somatic sensation to thalamus', src: [L6, 19] },
{ k: 'part', id: 'w6_olivary', l: 'Olivary nucleus', match: 'Olivary: somatic motor command', parent: 'w6_relaynuclei', w: 6, line: 'somatic motor command to cerebellum', links: { w6_cerebellum: 'somatic motor command to cerebellum' }, src: [L6, 19] },
{ k: 'part', id: 'w6_solitary', l: 'Solitary nucleus', match: 'Solitary: visceral sensation', parent: 'w6_relaynuclei', w: 6, line: 'visceral sensation to brain', src: [L6, 19] },
{ k: 'part', id: 'w6_medcnnuclei', l: 'Nuclei of CN VIII to XII', parent: 'w6_medulla', w: 6, line: 'cranial nerves nuclei', src: [L6, 19] },

{ k: 'part', id: 'w6_ponspeduncles', l: 'Cerebellar peduncles', parent: 'w6_pons', w: 6, line: 'connecting to the cerebellum', links: { w6_cerebellum: 'connecting to the cerebellum' }, src: [L6, 20] },
{ k: 'part', id: 'w6_ponscnnuclei', l: 'Nuclei of CN V to VIII', parent: 'w6_pons', w: 6, src: [L6, 20] },
{ k: 'part', id: 'w6_ponstracts', l: 'Ascending/descending tracts', parent: 'w6_pons', w: 6, src: [L6, 20] },
{ k: 'part', id: 'w6_ponsrelay', l: 'Relay nuclei and tracts', parent: 'w6_pons', w: 6, line: 'connecting cerebellum to other brain parts', links: { w6_cerebellum: 'connecting cerebellum to other brain parts' }, src: [L6, 20] },

{ k: 'part', id: 'w6_supcolliculus', l: 'Superior colliculus', parent: 'w6_midbrain', w: 6, line: 'visual reflex (e.g. blinking) and visual attention', src: [L6, 21] },
{ k: 'part', id: 'w6_infcolliculus', l: 'Inferior colliculus', parent: 'w6_midbrain', w: 6, line: 'transduce auditory info to the brain; auditory reflexes', src: [L6, 21] },
{ k: 'part', id: 'w6_cerebralpeduncle', l: 'Cerebral peduncle', parent: 'w6_midbrain', w: 6, line: 'ascending + descending tracts', src: [L6, 21] },
{ k: 'part', id: 'w6_rednuclei', l: 'Red nuclei', parent: 'w6_midbrain', w: 6, line: 'subconscious control of upper limb; muscle tone', src: [L6, 22] },
{ k: 'part', id: 'w6_substantianigra', l: 'Substantia nigra', parent: 'w6_midbrain', w: 6, line: 'regulate motor movement', src: [L6, 22] },
{ k: 'part', id: 'w6_midcnnuclei', l: 'Nuclei of CN III and IV', parent: 'w6_midbrain', w: 6, src: [L6, 22] },

/* ---------------- reticular formation (p23) ---------------- */
{ k: 'part', id: 'w6_reticformation', l: 'Reticular formation', parent: 'reticular', w: 6, line: 'loosely organized gray matter, runs vertically in brainstem',
  links: { w6_medulla: 'runs from medulla oblongata to midbrain', w6_midbrain: 'runs from medulla oblongata to midbrain' }, src: [L6, 23, 19, 20, 22] },

/* ---------------- cerebellum (p24-25) ---------------- */
{ k: 'part', id: 'w6_cbhemispheres', l: 'Cerebellar hemispheres', match: 'two hemispheres', parent: 'w6_cerebellum', w: 6, line: 'connected by vermis', src: [L6, 24] },
{ k: 'part', id: 'w6_vermis', l: 'Vermis', parent: 'w6_cerebellum', w: 6, line: 'narrow wormlike bridge', links: { w6_cbhemispheres: 'connects the two hemispheres' }, src: [L6, 24] },
{ k: 'part', id: 'w6_folia', l: 'Folia', parent: 'w6_cerebellum', w: 6, line: '= gyri on cerebrum', links: { w6_gyrus: '= gyri on cerebrum' }, src: [L6, 24] },
{ k: 'part', id: 'w6_infpeduncle', l: 'Inferior peduncles', parent: 'w6_cerebellum', w: 6, line: 'connect to medulla', links: { w6_medulla: 'connect to medulla' }, src: [L6, 24] },
{ k: 'part', id: 'w6_midpeduncle', l: 'Middle peduncles', parent: 'w6_cerebellum', w: 6, line: 'connect to pons', links: { w6_pons: 'connect to pons' }, src: [L6, 24] },
{ k: 'part', id: 'w6_suppeduncle', l: 'Superior peduncles', parent: 'w6_cerebellum', w: 6, line: 'connect to midbrain', links: { w6_midbrain: 'connect to midbrain' }, src: [L6, 24] },
{ k: 'part', id: 'w6_arborvitae', l: 'Arbor vitae', parent: 'w6_cerebellum', w: 6, line: 'white matter', src: [L6, 24] },
{ k: 'part', id: 'w6_granule', l: 'Granule cells', parent: 'w6_cerebellum', w: 6, line: 'specific type of neuron', src: [L6, 24] },
{ k: 'part', id: 'w6_purkinje', l: 'Purkinje cells', parent: 'w6_cerebellum', w: 6, line: 'specific type of neuron', src: [L6, 24] },
{ k: 'part', id: 'w6_cbposture', l: 'Adjusting postural muscles', parent: 'w6_cerebellum', w: 6, line: 'rapid, automatic adjustments to maintain balance', src: [L6, 25] },
{ k: 'part', id: 'w6_cbprogram', l: 'Programming, fine-tuning movement', match: 'fine-tuning movement', parent: 'w6_cerebellum', w: 6, line: 'at conscious/subconscious levels', src: [L6, 25] },
];
