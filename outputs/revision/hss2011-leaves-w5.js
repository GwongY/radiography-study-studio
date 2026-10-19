/*
 * HSS2011 · Week 5 leaves — nervous tissue, spinal cord, spinal nerves.
 *
 * Read off 2627_M2_L5_Nervous system I.pdf (hss.l5.2026), page by page. One row per
 * structure the page text names, in the slide's words; a structure only in a picture has
 * no row; clinical-condition pages have none. Row kinds and fields:
 * outputs/revision/leaves.js. Recipe: docs/superpowers/plans/2026-10-19-revise-depth-w5-w7.md.
 */
const L5 = 'hss.l5.2026';

export const SOURCES = {
  [L5]: 'Week 5 nervous-system slides',
};

export const ROWS = [
/* ---------------- overview, nervous tissue, synapses (p5-21) ---------------- */
{ k: 'group', id: 'w5_divisions', l: 'Divisions of the nervous system', parent: 'nervestruct', w: 5, match: 'Overview of the nervous system', src: [L5, 5, 6] },
{ k: 'part', id: 'w5_cns', l: 'Central Nervous System', parent: 'w5_divisions', w: 5, line: 'brain + spinal cord; process/store/retrieve information', src: [L5, 5, 6] },
{ k: 'part', id: 'w5_pns', l: 'Peripheral Nervous System', parent: 'w5_divisions', w: 5, line: 'all the system except CNS; deliver signals to/out of CNS', src: [L5, 5, 6] },
{ k: 'part', id: 'w5_sensdiv', l: 'Sensory division', match: 'Sensory:', parent: 'w5_pns', w: 5, line: 'sends signal to CNS; bring sensation', src: [L5, 6, 5] },
{ k: 'part', id: 'w5_motdiv', l: 'Motor division', match: 'Motor:', parent: 'w5_pns', w: 5, line: 'sends signals from CNS to gland/muscles; bring response', src: [L5, 6, 5] },
{ k: 'part', id: 'w5_somatic', l: 'Somatic', parent: 'w5_pns', w: 5, line: 'connect to skin, muscle, bone joint', src: [L5, 6, 5] },
{ k: 'part', id: 'w5_visceral', l: 'Visceral', parent: 'w5_pns', w: 5, line: 'connect to internal organs, involuntary muscles', src: [L5, 6, 5] },

{ k: 'group', id: 'w5_funcclass', l: 'Functional classes of neurons', match: 'Functional Classes', parent: 'neuron', w: 5, src: [L5, 10] },
{ k: 'part', id: 'w5_sensoryn', l: 'Sensory (afferent)', parent: 'w5_funcclass', w: 5, line: 'transduce signals from receptors to CNS', src: [L5, 10] },
{ k: 'part', id: 'w5_interneuron', l: 'Interneurons', parent: 'w5_funcclass', w: 5, line: 'integrative function; 90% of neurons in human body', src: [L5, 10] },
{ k: 'part', id: 'w5_motorn', l: 'Motor (efferent)', parent: 'w5_funcclass', w: 5, line: 'send signals to muscle and glands', src: [L5, 10] },

{ k: 'group', id: 'w5_neuronparts', l: 'Parts of a neuron', match: 'Neuron: structure', parent: 'neuron', w: 5, src: [L5, 11] },
{ k: 'part', id: 'w5_cellbody', l: 'Cell body', parent: 'w5_neuronparts', w: 5, line: 'a.k.a. soma; organelles for cell survival and functioning', src: [L5, 11] },
{ k: 'part', id: 'w5_neurofibrils', l: 'Neurofibrils', parent: 'w5_cellbody', w: 5, line: 'network within soma, maintain shape of neuron', src: [L5, 11] },
{ k: 'part', id: 'w5_neurites', l: 'Neurites', parent: 'w5_neuronparts', w: 5, line: 'dendrites or axon', src: [L5, 11] },
{ k: 'part', id: 'w5_dendrites', l: 'Dendrites', parent: 'w5_neurites', w: 5, line: 'receive signals from other cells', src: [L5, 11] },
{ k: 'part', id: 'w5_axons', l: 'Axons', parent: 'w5_neurites', w: 5, line: 'conduction of signals to other cells; usually enclosed in myelin sheath', src: [L5, 11] },

{ k: 'group', id: 'w5_structclass', l: 'Structural classes of neurons', match: 'structural classes', parent: 'neuron', w: 5, src: [L5, 12] },
{ k: 'part', id: 'w5_multipolar', l: 'Multipolar', parent: 'w5_structclass', w: 5, line: 'one axon + >2 dendrites', src: [L5, 12] },
{ k: 'part', id: 'w5_bipolar', l: 'Bipolar', parent: 'w5_structclass', w: 5, line: 'two neurites from soma; one axon + one dendrite', src: [L5, 12] },
{ k: 'part', id: 'w5_unipolar', l: 'Unipolar', parent: 'w5_structclass', w: 5, line: 'single neurite from soma', src: [L5, 12] },
{ k: 'part', id: 'w5_pseudouni', l: 'Pseudounipolar', parent: 'w5_unipolar', w: 5, line: 'neurite branches to two neurites', src: [L5, 12] },

{ k: 'group', id: 'w5_cnsglia', l: 'Neuroglia of the CNS', match: 'Neuroglia (CNS)', parent: 'glia', w: 5, src: [L5, 14, 15] },
{ k: 'part', id: 'w5_oligo', l: 'Oligodendrocyte', parent: 'w5_cnsglia', w: 5, line: 'processes wrap axons in CNS, form the myelin sheath', src: [L5, 14, 13, 17] },
{ k: 'part', id: 'w5_ependymal', l: 'Ependymal cells', parent: 'w5_cnsglia', w: 5, line: 'line internal cavities of brain and spinal cord', src: [L5, 14, 13] },
{ k: 'part', id: 'w5_microglia', l: 'Microglia', parent: 'w5_cnsglia', w: 5, line: 'immune cells in CNS; phagocytic macrophage', src: [L5, 15, 13] },
{ k: 'part', id: 'w5_astrocytes', l: 'Astrocytes', parent: 'w5_cnsglia', w: 5, line: 'most abundant glia; form blood-brain barrier', src: [L5, 15, 13] },
{ k: 'group', id: 'w5_pnsglia', l: 'Neuroglia of the PNS', match: 'Neuroglia (PNS)', parent: 'glia', w: 5, src: [L5, 16] },
{ k: 'part', id: 'w5_schwann', l: 'Schwann cells', parent: 'w5_pnsglia', w: 5, line: 'envelop nerve fibers of PNS neurons, forming myelin sheath', src: [L5, 16, 13, 17] },
{ k: 'part', id: 'w5_satellite', l: 'Satellite cells', parent: 'w5_pnsglia', w: 5, line: 'surround soma of neurons at regions called ganglion', src: [L5, 16, 13] },
{ k: 'part', id: 'w5_ganglion', l: 'Ganglion', parent: 'w5_pnsglia', w: 5, line: 'region at PNS, where neuronal soma are located together', src: [L5, 16] },
{ k: 'part', id: 'w5_myelin', l: 'Myelin sheath', parent: 'glia', w: 5, line: 'insulating layer around nerve fiber; speeds up nerve signal transduction',
  links: { w5_oligo: 'formed by oligodendrocyte in CNS', w5_schwann: 'formed by Schwann cells in PNS' }, src: [L5, 17, 14, 16] },

{ k: 'group', id: 'w5_synforms', l: 'Forms of synapses', parent: 'synapse', w: 5, src: [L5, 19] },
{ k: 'part', id: 'w5_axodend', l: 'Axodendritic', parent: 'w5_synforms', w: 5, line: 'between axon and dendrites', src: [L5, 19] },
{ k: 'part', id: 'w5_axosom', l: 'Axosomatic', parent: 'w5_synforms', w: 5, line: 'between axon and soma', src: [L5, 19] },
{ k: 'part', id: 'w5_axoaxon', l: 'Axoaxonic', parent: 'w5_synforms', w: 5, line: 'between axon and axon', src: [L5, 19] },
{ k: 'group', id: 'w5_synkinds', l: 'Two kinds of synapses', parent: 'synapse', w: 5, src: [L5, 20] },
{ k: 'part', id: 'w5_chemsyn', l: 'Chemical', parent: 'w5_synkinds', w: 5, line: 'with synaptic cleft; release neurotransmitters', src: [L5, 20] },
{ k: 'part', id: 'w5_cleft', l: 'Synaptic cleft', parent: 'w5_chemsyn', w: 5, src: [L5, 20] },
{ k: 'part', id: 'w5_elecsyn', l: 'Electrical', parent: 'w5_synkinds', w: 5, line: 'with gap junctions; allows ions diffuse directly', src: [L5, 20] },
{ k: 'part', id: 'w5_cholinergic', l: 'Cholinergic synapse', parent: 'w5_chemsyn', w: 5, line: 'synapses that release ACh (Acetylcholine)', src: [L5, 21] },
{ k: 'part', id: 'w5_nmj', l: 'Neuromuscular junction', parent: 'w5_cholinergic', w: 5, line: 'example of a cholinergic synapse', src: [L5, 21] },
{ k: 'part', id: 'w5_ache', l: 'Acetylcholinesterase', parent: 'w5_cholinergic', w: 5, line: 'ACh removed by AChE', src: [L5, 21] },

/* ---------------- spinal cord, tracts, nerves, plexuses (p24-39) ---------------- */
{ k: 'group', id: 'w5_cordregions', l: 'Regions of the spinal cord', match: 'Divided into 4 regions', parent: 'spinalcord', w: 5, src: [L5, 26] },
{ k: 'part', id: 'w5_cord_c', l: 'Cervical', parent: 'w5_cordregions', w: 5, src: [L5, 26] },
{ k: 'part', id: 'w5_cord_t', l: 'Thoracic', parent: 'w5_cordregions', w: 5, src: [L5, 26] },
{ k: 'part', id: 'w5_cord_l', l: 'Lumbar', parent: 'w5_cordregions', w: 5, src: [L5, 26] },
{ k: 'part', id: 'w5_cord_s', l: 'Sacral', parent: 'w5_cordregions', w: 5, src: [L5, 26] },
{ k: 'part', id: 'w5_cervenl', l: 'Cervical enlargement', parent: 'spinalcord', w: 5, line: 'give rise to nerves for upper limbs', src: [L5, 26] },
{ k: 'part', id: 'w5_lumbenl', l: 'Lumbosacral enlargement', parent: 'spinalcord', w: 5, line: 'nerves to pelvic region and lower limbs', src: [L5, 26] },
{ k: 'part', id: 'w5_cauda', l: 'Cauda equina', parent: 'spinalcord', w: 5, line: "similar to horse's tail; innervates pelvic and lower limbs", src: [L5, 26] },

{ k: 'group', id: 'w5_meningeal', l: 'Three layers of meninges', match: 'Three layers of meninges', parent: 'meninges', w: 5, line: 'protect the spinal cord (and brain)', src: [L5, 27] },
{ k: 'part', id: 'w5_dura', l: 'Dura mater', parent: 'w5_meningeal', w: 5, line: 'outermost layer; tough collagenous membrane', src: [L5, 27] },
{ k: 'part', id: 'w5_arachnoid', l: 'Arachnoid mater', parent: 'w5_meningeal', w: 5, line: 'looser array of collagenous/elastic fibers', src: [L5, 27] },
{ k: 'part', id: 'w5_subarachnoid', l: 'Sub-arachnoid space', parent: 'w5_arachnoid', w: 5, line: 'filled with cerebrospinal fluid (CSF)', src: [L5, 27] },
{ k: 'part', id: 'w5_pia', l: 'Pia mater', parent: 'w5_meningeal', w: 5, line: 'delicate, transparent; anchors cord to vertebral column', src: [L5, 27] },

{ k: 'group', id: 'w5_graymatter', l: 'Gray matter', parent: 'spinalcord', w: 5, line: 'H-shaped', src: [L5, 28] },
{ k: 'part', id: 'w5_posthorn', l: 'Posterior horn', match: 'posterior, anterior horns', parent: 'w5_graymatter', w: 5, src: [L5, 28] },
{ k: 'part', id: 'w5_anthorn', l: 'Anterior horn', match: 'anterior horns', parent: 'w5_graymatter', w: 5, src: [L5, 28] },
{ k: 'part', id: 'w5_lathorn', l: 'Lateral horn', match: 'Lateral horns', parent: 'w5_graymatter', w: 5, line: 'at thoracic and lumbar regions', src: [L5, 28] },
{ k: 'part', id: 'w5_graycomm', l: 'Gray commissure', parent: 'w5_graymatter', w: 5, line: 'joins right and left sides', src: [L5, 28] },
{ k: 'part', id: 'w5_centralcanal', l: 'Central canal', parent: 'w5_graymatter', w: 5, line: 'space in middle', src: [L5, 28] },
{ k: 'group', id: 'w5_whitematter', l: 'White matter', parent: 'spinalcord', w: 5, line: 'surrounds gray matter; bundles of axons', src: [L5, 29] },
{ k: 'part', id: 'w5_postcol', l: 'Posterior column', match: 'Posterior', parent: 'w5_whitematter', w: 5, src: [L5, 29] },
{ k: 'part', id: 'w5_latcol', l: 'Lateral column', match: 'Lateral and', parent: 'w5_whitematter', w: 5, src: [L5, 29] },
{ k: 'part', id: 'w5_antcol', l: 'Anterior column', match: 'Anterior columns', parent: 'w5_whitematter', w: 5, src: [L5, 29] },

{ k: 'part', id: 'w5_ascending', l: 'Ascending tract', parent: 'tracts', w: 5, line: 'carry sensory information up the cord to the brain',
  links: { w5_whitematter: 'white matters in spinal cord form spinal tracts' }, src: [L5, 30] },
{ k: 'part', id: 'w5_descending', l: 'Descending tract', parent: 'tracts', w: 5, line: 'carry motor impulses down to muscle/effectors',
  links: { w5_whitematter: 'white matters in spinal cord form spinal tracts' }, src: [L5, 30] },

{ k: 'group', id: 'w5_nervecoats', l: 'General anatomy of nerves', parent: 'nervestruct', w: 5, src: [L5, 32] },
{ k: 'part', id: 'w5_nerve', l: 'Nerve', match: 'Nerve: A collection', parent: 'w5_nervecoats', w: 5, line: 'collection of numerous nerve fibers (axons) bound together', src: [L5, 32] },
{ k: 'part', id: 'w5_endoneurium', l: 'Endoneurium', parent: 'w5_nervecoats', w: 5, src: [L5, 32] },
{ k: 'part', id: 'w5_perineurium', l: 'Perineurium', parent: 'w5_nervecoats', w: 5, src: [L5, 32] },
{ k: 'part', id: 'w5_epineurium', l: 'Epineurium', parent: 'w5_nervecoats', w: 5, src: [L5, 32] },
{ k: 'part', id: 'w5_fascicle', l: 'Fascicle', parent: 'w5_nervecoats', w: 5, line: 'collection of axons', src: [L5, 32] },
{ k: 'part', id: 'w5_mixednerve', l: 'Mixed nerve', parent: 'w5_nervecoats', w: 5, line: 'with both sensory and motor axons', src: [L5, 32] },

{ k: 'group', id: 'w5_sn_regions', l: 'Spinal nerves by region', match: '31 pairs of spinal nerves', parent: 'spinalnerves', w: 5, src: [L5, 33] },
{ k: 'part', id: 'w5_sn_c', l: 'Cervical nerves', match: 'X cervical', parent: 'w5_sn_regions', w: 5, line: '8 pairs', src: [L5, 33] },
{ k: 'part', id: 'w5_sn_t', l: 'Thoracic nerves', match: 'X thoracic', parent: 'w5_sn_regions', w: 5, line: '12 pairs', src: [L5, 33] },
{ k: 'part', id: 'w5_sn_l', l: 'Lumbar nerves', match: 'X lumbar', parent: 'w5_sn_regions', w: 5, line: '5 pairs', src: [L5, 33] },
{ k: 'part', id: 'w5_sn_s', l: 'Sacral nerves', match: 'X sacral', parent: 'w5_sn_regions', w: 5, line: '5 pairs', src: [L5, 33] },
{ k: 'part', id: 'w5_sn_co', l: 'Coccygeal nerve', match: 'X coccygeal', parent: 'w5_sn_regions', w: 5, line: '1 pair', src: [L5, 33] },

{ k: 'group', id: 'w5_sn_parts', l: 'Spinal nerve parts', parent: 'spinalnerves', w: 5, match: 'Spinal Nerves', src: [L5, 34] },
{ k: 'part', id: 'w5_rootlets', l: 'Rootlets', parent: 'w5_sn_parts', w: 5, line: '6-8 per segment, from anterior and posterior surface', src: [L5, 34] },
{ k: 'part', id: 'w5_ventralroot', l: 'Ventral (anterior) root', match: 'ventral (anterior) root', parent: 'w5_sn_parts', w: 5, line: 'rootlets converge to form it', src: [L5, 34] },
{ k: 'part', id: 'w5_dorsalroot', l: 'Dorsal (posterior) root', match: 'dorsal (posterior) roots', parent: 'w5_sn_parts', w: 5, line: 'rootlets converge to form it', src: [L5, 34] },
{ k: 'part', id: 'w5_prg', l: 'Posterior root ganglion', parent: 'w5_dorsalroot', w: 5, line: 'collection of sensory neuron somas', src: [L5, 34] },
{ k: 'group', id: 'w5_sn_branches', l: 'Branches of a spinal nerve', match: 'Spinal nerve branches after', parent: 'spinalnerves', w: 5, line: 'after leaving the vertebral column', src: [L5, 35] },
{ k: 'part', id: 'w5_antramus', l: 'Anterior ramus', parent: 'w5_sn_branches', w: 5, line: 'innervate skin/muscles on anterior and lateral side', src: [L5, 35] },
{ k: 'part', id: 'w5_postramus', l: 'Posterior ramus', parent: 'w5_sn_branches', w: 5, line: 'innervates skin/muscles on back of body', src: [L5, 35] },
{ k: 'part', id: 'w5_meningealbr', l: 'Meningeal branch', parent: 'w5_sn_branches', w: 5, line: 're-enters vertebral canal; innervate meninges, vertebrae, spinal ligaments',
  links: { w5_meningeal: 'innervate meninges' }, src: [L5, 35] },

{ k: 'group', id: 'w5_cervical_plexus', l: 'Cervical plexus', parent: 'plexuses', w: 5, line: 'C1 to C5; diaphragm and some neck and back muscles',
  links: { w5_antramus: 'anterior rami from spinal nerve branch and merge repeatedly' }, src: [L5, 37, 36] },
{ k: 'group', id: 'w5_brachial_plexus', l: 'Brachial plexus', parent: 'plexuses', w: 5, line: 'C5 to T1; upper limb and some neck and shoulder muscles',
  links: { w5_antramus: 'anterior rami from spinal nerve branch and merge repeatedly' }, src: [L5, 37] },
{ k: 'group', id: 'w5_lumbar_plexus', l: 'Lumbar plexus', parent: 'plexuses', w: 5, line: 'L1 to L4; sensory from hip/knee joints; motor to hip, thigh, scrotum',
  links: { w5_antramus: 'anterior rami from spinal nerve branch and merge repeatedly' }, src: [L5, 38, 36] },
{ k: 'group', id: 'w5_sacral_plexus', l: 'Sacral plexus', parent: 'plexuses', w: 5, line: 'L4 to S4; gives rise to sciatic nerve',
  links: { w5_antramus: 'anterior rami from spinal nerve branch and merge repeatedly' }, src: [L5, 36] },
{ k: 'group', id: 'w5_coccygeal_plexus', l: 'Coccygeal plexus', parent: 'plexuses', w: 5, line: 'sacral and coccygeal plexus: L4 to S4; gives rise to sciatic nerve',
  links: { w5_antramus: 'anterior rami from spinal nerve branch and merge repeatedly' }, src: [L5, 36, 38] },
];
