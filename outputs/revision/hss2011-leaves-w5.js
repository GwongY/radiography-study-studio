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
];
