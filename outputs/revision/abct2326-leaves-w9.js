/*
 * ABCT2326 · Week 9 leaves — nerves.
 *
 * Read off Lecture 8 Nervous system.pdf (phys.l8.2026), pages 2–61.
 * One row per unit the slides teach (part, cell, substance, process, group).
 * Row kinds and fields: outputs/revision/leaves.js. Rules: outputs/revision/rules.js.
 * Recipe: docs/superpowers/plans/2026-10-19-physiology-revise.md (Recipe P).
 */
const L8 = 'phys.l8.2026';

export const SOURCES = {
  [L8]: 'Lecture 8 nervous system slides',
};

export const ROWS = [
  /* ---------------- Overview: What is the nervous system (p2-4) ---------------- */
  { k: 'process', id: 'p9_sensory_info', l: 'Sensory information', match: 'information from the outside world', parent: 'p_ns', w: 9, line: 'provides information from the outside world such as light, sounds, taste, touch', src: [L8, 2], own: 'Sensory inputs gathered from the environment that inform the nervous system about external conditions.' },
  { k: 'process', id: 'p9_homeostatic_reg', l: 'Homeostatic regulation', match: 'homeostatic condition', parent: 'p_ns', w: 9, line: 'keeps our body in homeostatic condition for optimal functioning', src: [L8, 2], own: 'Nervous regulation maintaining stable internal conditions for optimal physiological functioning.' },
  { k: 'part', id: 'p9_brain', l: 'Brain', match: 'brain', parent: 'p_cns', w: 9, line: 'contains almost 97% of the body’s neural tissue', src: [L8, 4, 3, 18, 45], own: 'The cranial portion of the central nervous system that coordinates sensory processing and body control.' },
  { k: 'part', id: 'p9_spinal_cord', l: 'Spinal cord', match: 'spinal cord', parent: 'p_cns', w: 9, line: 'part of the central nervous system along with the brain', src: [L8, 3, 19], own: 'The elongated cylindrical nerve cord of the central nervous system conducting impulses to and from the brain.' },

  /* ---------------- Classification of neurons & PNS (p7-8) ---------------- */
  { k: 'cell', id: 'p9_sensory_neurons', l: 'Sensory neurons', match: 'Sensory neurons', parent: 'p_neuron_class', w: 9, line: 'conduct impulses from sensory receptors to the CNS', src: [L8, 7, 8] },
  { k: 'cell', id: 'p9_motor_neurons', l: 'Motor neurons', match: 'Motor neurons', parent: 'p_neuron_class', w: 9, line: 'conduct impulses from the CNS to target organs', src: [L8, 7, 8] },
  { k: 'cell', id: 'p9_interneurons', l: 'Association/interneurons', match: 'Association/interneurons', parent: 'p_neuron_class', w: 9, line: 'located completely within the CNS and integrate functions of nervous system', src: [L8, 7] },
  { k: 'cell', id: 'p9_somatic_motor', l: 'Somatic motor neurons', match: 'Somatic motor neurons', parent: 'p_pns', w: 9, line: 'responsible for reflexes and voluntary control of skeletal muscles', src: [L8, 8, 48] },
  { k: 'cell', id: 'p9_autonomic_motor', l: 'Autonomic motor neurons', match: 'Autonomic motor neurons', parent: 'p_pns', w: 9, line: 'innervate involuntary targets such as smooth muscle, cardiac muscle, and glands', src: [L8, 8, 48] },
  { k: 'group', id: 'p9_sympathetic_div', l: 'Sympathetic division', match: 'Sympathetic', parent: 'p9_autonomic_motor', w: 9, line: 'autonomic division innervating involuntary effectors', src: [L8, 8, 57], own: 'The autonomic motor division preparing organs for fight-or-flight responses under stress.' },
  { k: 'group', id: 'p9_parasympathetic_div', l: 'Parasympathetic division', match: 'Parasympathetic', parent: 'p9_autonomic_motor', w: 9, line: 'autonomic division innervating involuntary effectors', src: [L8, 8, 60], own: 'The autonomic motor division promoting rest and digestion in involuntary target organs.' },

  /* ---------------- Neurons & Structure (p10) ---------------- */
  { k: 'part', id: 'p9_cell_body', l: 'Cell Body', match: 'Cell Body', parent: 'p_neurons', w: 9, line: 'cluster in groups called nuclei in CNS and ganglia in PNS', src: [L8, 10, 11, 16] },
  { k: 'group', id: 'p9_nuclei', l: 'Nuclei', match: 'nuclei', parent: 'p9_cell_body', w: 9, line: 'clusters of neuron cell bodies in the CNS', src: [L8, 10], own: 'Aggregations of neuron cell bodies located within the central nervous system.' },
  { k: 'group', id: 'p9_ganglia', l: 'Ganglia', match: 'ganglia', parent: 'p9_cell_body', w: 9, line: 'clusters of neuron cell bodies in the PNS', src: [L8, 10], own: 'Aggregations of neuron cell bodies situated within the peripheral nervous system.' },
  { k: 'part', id: 'p9_dendrites', l: 'Dendrites', match: 'Dendrites', parent: 'p_neurons', w: 9, line: 'receive signals', src: [L8, 10, 11, 24], own: 'Short branched extensions of the neuron that receive incoming electrical and chemical stimuli.' },
  { k: 'part', id: 'p9_axon', l: 'Axon', match: 'Axon', parent: 'p_neurons', w: 9, line: 'conducts impulses', src: [L8, 10, 11, 12, 16, 40], own: 'An elongated process of a neuron that propagates electrical nerve impulses away from the cell body.' },

  /* ---------------- Glial cells (p14-20) ---------------- */
  { k: 'cell', id: 'p9_oligodendrocytes', l: 'Oligodendrocytes', match: 'Oligodendrocytes', parent: 'p_glia', w: 9, line: 'form myelin sheaths around the axons of CNS neurons', src: [L8, 14, 16], links: { p9_myelin: 'produce myelin sheath in the CNS' } },
  { k: 'cell', id: 'p9_microglia', l: 'Microglia', match: 'Microglia', parent: 'p_glia', w: 9, line: 'migrate around tissue and phagocytize foreign and degenerated material', src: [L8, 14, 18] },
  { k: 'cell', id: 'p9_ependymal_cells', l: 'Ependymal cells', match: 'Ependymal cells', parent: 'p_glia', w: 9, line: 'line the brain ventricles and secrete cerebrospinal fluid', src: [L8, 14, 18], makes: { p9_csf: 'secrete cerebrospinal fluid' } },
  { k: 'substance', id: 'p9_csf', l: 'Cerebrospinal fluid (CSF)', match: 'cerebrospinal fluid', parent: 'p9_ependymal_cells', w: 9, line: 'provides a protective cushion and transports dissolved gases, nutrients, wastes', src: [L8, 14, 18] },
  { k: 'part', id: 'p9_choroid_plexus', l: 'Choroid plexus', match: 'choroid plexus', parent: 'p9_ependymal_cells', w: 9, line: 'combination of ependymal cells and capillaries that produces cerebrospinal fluid', src: [L8, 18], own: 'A vascular structure in brain ventricles composed of ependymal cells and capillaries that produces fluid.' },
  { k: 'cell', id: 'p9_astrocytes', l: 'Astrocytes', match: 'Astrocytes', parent: 'p_glia', w: 9, line: 'most abundant glial cell; regulate external environment of neurons', src: [L8, 14, 19, 20] },
  { k: 'part', id: 'p9_bbb', l: 'Blood–brain barrier', match: 'blood–brain barrier', parent: 'p9_astrocytes', w: 9, line: 'astrocytes wrap around capillaries to maintain special endothelial permeability', src: [L8, 19] },
  { k: 'cell', id: 'p9_schwann_cells', l: 'Schwann Cells', match: 'Schwann Cells', parent: 'p_glia', w: 9, line: 'wrap around to form the myelin sheath in the PNS', src: [L8, 16, 17], links: { p9_myelin: 'produce myelin sheath in the PNS' } },
  { k: 'part', id: 'p9_neurilemma', l: 'Neurilemma', match: 'neurilemma', parent: 'p9_schwann_cells', w: 9, line: 'sheath of Schwann cells surrounding all axons in the PNS', src: [L8, 17] },
  { k: 'part', id: 'p9_myelin', l: 'Myelin', match: 'Myelin', parent: 'p_glia', w: 9, line: 'insulating sheath giving tissues a white color', src: [L8, 16, 17, 41], own: 'A multilayered insulating covering formed around axons to enhance action potential transmission speed.' },
  { k: 'part', id: 'p9_white_matter', l: 'White matter', match: 'white matter', parent: 'p_glia', w: 9, line: 'myelinated neural tissue colored white by myelin', src: [L8, 16], own: 'Nervous tissue areas dominated by myelinated axons that convey electrical impulses between brain regions.' },
  { k: 'part', id: 'p9_gray_matter', l: 'Gray matter', match: 'Gray matter', parent: 'p_glia', w: 9, line: 'neural tissue composed of cell bodies and unmyelinated axons', src: [L8, 16], own: 'Nervous tissue regions containing neuron cell bodies, dendrites and synapses for information processing.' },

  /* ---------------- Resting membrane potential & Ion gating (p23-29) ---------------- */
  { k: 'substance', id: 'p9_neg_proteins', l: 'Negatively charged proteins', match: 'negatively charged proteins', parent: 'p_rmp', w: 9, line: 'too large to leave cell, keeping inner membrane surface negative', src: [L8, 26] },
  { k: 'process', id: 'p9_conc_gradient', l: 'Concentration Gradient', match: 'Concentration Gradient', parent: 'p_rmp', w: 9, line: 'Na+ concentrated outside diffuse in, K+ inside diffuse out', src: [L8, 27] },
  { k: 'process', id: 'p9_na_k_pump', l: 'Na+/K+ pump', match: 'Na+', parent: 'p_rmp', w: 9, line: 'pumps 3 Na+ out and 2 K+ in, transferring positive ions outside', src: [L8, 29, 27], own: 'An active transport membrane pump that maintains electrochemical gradients across the plasma membrane.' },

  { k: 'part', id: 'p9_passive_channels', l: 'Passive Channels', match: 'Passive Channels', parent: 'p_ion_gating', w: 9, line: 'not gated always open channels allowing ions to move in or out', src: [L8, 24, 26] },
  { k: 'part', id: 'p9_voltage_gated_k', l: 'Voltage-gated K+ channels', match: 'Voltage-gated K+ channels', parent: 'p_ion_gating', w: 9, line: 'only open when a particular membrane potential is reached', src: [L8, 24, 38] },
  { k: 'part', id: 'p9_voltage_gated_na', l: 'Voltage-gated Na+ channels', match: 'voltage- gated Na+', parent: 'p_ion_gating', w: 9, line: 'open as a wave down length of axon during action potential', src: [L8, 40, 38] },
  { k: 'part', id: 'p9_chem_channels', l: 'Chemically activated ion channels', match: 'Chemically activated ion channels', parent: 'p_ion_gating', w: 9, line: 'open gates when activated by chemical messenger; also known as receptors', src: [L8, 24, 52] },
  { k: 'substance', id: 'p9_na_ion', l: 'Sodium ions (Na+)', match: 'Na+', parent: 'p_ion_gating', w: 9, line: 'more concentrated outside cell, passively diffusing into cytosol', src: [L8, 24, 27, 29, 38, 40, 41, 52], acts: { p9_depolarization: 'influx produces depolarization' } },
  { k: 'substance', id: 'p9_k_ion', l: 'Potassium ions (K+)', match: 'K+', parent: 'p_ion_gating', w: 9, line: 'more concentrated inside cell, diffusing into extracellular fluid', src: [L8, 24, 26, 27, 29, 38, 41, 52, 60], acts: { p9_repolarization: 'efflux produces repolarization' } },

  /* ---------------- Action potential, all-or-none, refractory (p33-39) ---------------- */
  { k: 'process', id: 'p9_depolarization', l: 'Depolarization', match: 'depolarization', parent: 'p_ap', w: 9, line: 'membrane potential becomes more positive reaching threshold value at –45mV', next: { p9_repolarization: 'reaches peak of +25mV then drops' }, src: [L8, 33, 52] },
  { k: 'process', id: 'p9_repolarization', l: 'Repolarization', match: 'repolarization', parent: 'p_ap', w: 9, line: 'membrane potential drops from peak toward resting level', next: { p9_hyperpolarization: 'continues to drop below original state' }, src: [L8, 33] },
  { k: 'process', id: 'p9_hyperpolarization', l: 'Hyperpolarization', match: 'hyperpolarization', parent: 'p_ap', w: 9, line: 'action potential continues to drop becoming more negative than original state', src: [L8, 33, 52, 60] },

  { k: 'process', id: 'p9_threshold', l: 'Threshold', match: 'threshold', parent: 'p_allornone', w: 9, line: 'once threshold has been reached, action potential will always happen', src: [L8, 36, 33, 53] },
  { k: 'process', id: 'p9_stimulus_effect', l: 'Stimulus independence', match: 'size of the stimulus', parent: 'p_allornone', w: 9, line: 'stimulus size does not affect action potential size or duration', src: [L8, 36], own: 'The property where supra-threshold stimuli generate action potentials of invariant amplitude and duration.' },

  { k: 'process', id: 'p9_abs_refractory', l: 'Absolute refractory period', match: 'absolute refractory period', parent: 'p_n_refractory', w: 9, line: 'occurs during action potential when Na+ channels are inactive', src: [L8, 38] },
  { k: 'process', id: 'p9_rel_refractory', l: 'Relative refractory period', match: 'relative refractory period', parent: 'p_n_refractory', w: 9, line: 'K+ channels are still open; only very strong stimulus can overcome', src: [L8, 38, 39] },

  /* ---------------- Conduction & Saltatory conduction (p40-41) ---------------- */
  { k: 'process', id: 'p9_conduction_wave', l: 'Conduction wave', match: 'wave down the', parent: 'p_n_conduction', w: 9, line: 'voltage-gated Na+ channels open as a wave down length of axon', src: [L8, 40] },
  { k: 'part', id: 'p9_nodes_ranvier', l: 'Nodes of Ranvier', match: 'Nodes of Ranvier', parent: 'p_saltatory', w: 9, line: 'allow Na+ and K+ to cross the membrane every 1−2 mm', src: [L8, 41, 17] },
  { k: 'process', id: 'p9_leaping_impulse', l: 'Leaping propagation', match: 'leap', parent: 'p_saltatory', w: 9, line: 'action potentials leap from node to node along myelinated axon', src: [L8, 41], own: 'The rapid saltatory jumping of action potentials from one node of Ranvier to the next.' },

  /* ---------------- Synapses & Acetylcholine (p44-50) ---------------- */
  { k: 'part', id: 'p9_electrical_synapse', l: 'Electrical Synapses', match: 'Electrical Synapses', parent: 'p_synapses', w: 9, line: 'occur in smooth and cardiac muscle where cells join by gap junctions', src: [L8, 45, 44] },
  { k: 'part', id: 'p9_gap_junctions', l: 'Gap junctions', match: 'gap junctions', parent: 'p9_electrical_synapse', w: 9, line: 'join cells directly allowing electrical current to pass across synapses', src: [L8, 45], own: 'Intercellular channels allowing direct ionic and electrical communication between adjacent cells.' },
  { k: 'part', id: 'p9_chemical_synapse', l: 'Chemical Synapse', match: 'Chemical Synapse', parent: 'p_synapses', w: 9, line: 'involve release of a neurotransmitter from axon terminal boutons', src: [L8, 46, 44] },
  { k: 'part', id: 'p9_terminal_boutons', l: 'Terminal boutons', match: 'terminal boutons', parent: 'p9_chemical_synapse', w: 9, line: 'specialized axon swellings that release neurotransmitters into synapses', src: [L8, 46], own: 'Bulbous distal endings of axon branches specialized for the vesicular release of neurotransmitters.' },
  { k: 'substance', id: 'p9_neurotransmitter', l: 'Neurotransmitter', match: 'neurotransmitter', parent: 'p9_chemical_synapse', w: 9, line: 'chemical released from terminal boutons to stimulate or inhibit target cells', src: [L8, 46, 19, 48] },

  { k: 'substance', id: 'p9_ach_substance', l: 'Acetylcholine', match: 'Acetylcholine', parent: 'p_ach', w: 9, line: 'neurotransmitter that directly opens ion channels when binding its receptor', src: [L8, 48, 50, 59, 60], acts: { p_synapses: 'excitatory or inhibitory depending on open ion channels' } },
  { k: 'substance', id: 'p9_ache_substance', l: 'Acetylcholinesterase', match: 'Acetylcholinesterase', parent: 'p_ach', w: 9, line: 'enzyme that hydrolyzes acetylcholine to terminate synaptic signaling', src: [L8, 50], own: 'A membrane-bound enzyme that rapidly breaks down acetylcholine in the synaptic cleft.', acts: { p9_ach_substance: 'deactivates acetylcholine at synaptic cleft' } },

  /* ---------------- Graded potentials (p51-53) ---------------- */
  { k: 'process', id: 'p9_epsp', l: 'Excitatory postsynaptic potential (EPSP)', match: 'excitatory postsynaptic potential', parent: 'p_graded', w: 9, line: 'graded depolarization from opening Na+ or Ca2+ channels closer to threshold', src: [L8, 52, 53, 60] },
  { k: 'process', id: 'p9_ipsp', l: 'Inhibitory postsynaptic potential (IPSP)', match: 'inhibitory postsynaptic potential', parent: 'p_graded', w: 9, line: 'graded hyperpolarization from opening K+ or Cl- channels farther from threshold', src: [L8, 52, 53, 60] },
  { k: 'process', id: 'p9_summation', l: 'Summation of EPSPs and IPSPs', match: 'Summation of EPSPs and IPSPs', parent: 'p_graded', w: 9, line: 'determines whether an action potential occurs', next: { p_ap: 'determines whether an action potential occurs' }, src: [L8, 53], own: 'The cumulative integration of simultaneous excitatory and inhibitory postsynaptic potentials.' },

  /* ---------------- Sympathetic pathways & Receptors (p57-61) ---------------- */
  { k: 'part', id: 'p9_nicotinic', l: 'Nicotinic Receptors', match: 'Nicotinic Receptors', parent: 'p_symp_path', w: 9, line: 'cholinergic receptors stimulated by acetylcholine', src: [L8, 59], own: 'Ionotropic acetylcholine receptor channels that produce rapid postsynaptic excitation.' },
  { k: 'part', id: 'p9_muscarinic', l: 'Muscarinic Receptors', match: 'Muscarinic Receptors', parent: 'p_symp_path', w: 9, line: 'parasympathetic receptors with different tissue effects via K+ channels', src: [L8, 60], own: 'G-protein coupled acetylcholine receptors that mediate diverse excitatory or inhibitory tissue responses.' },
  { k: 'part', id: 'p9_m1_receptor', l: 'M1 receptor', match: 'M1 receptor', parent: 'p9_muscarinic', w: 9, line: 'Ach binds to M1 receptor in smooth muscles of the stomach', src: [L8, 60], own: 'A muscarinic receptor subtype mediating acetylcholine responses in stomach smooth muscle.' },
  { k: 'part', id: 'p9_m2_receptor', l: 'M2 receptor', match: 'M2 receptor', parent: 'p9_muscarinic', w: 9, line: 'Ach binds to M2 receptor in the heart to slow heart rate', src: [L8, 60], own: 'A muscarinic receptor subtype in cardiac tissue that slows heart rate upon acetylcholine binding.' },

  { k: 'substance', id: 'p9_norepinephrine', l: 'Norepinephrine', match: 'NE', parent: 'p_adrenergic', w: 9, line: 'sympathetic neurotransmitter binding adrenergic receptors with tissue effects', src: [L8, 61], acts: { p_adrenergic: 'binds adrenergic receptors' } },
  { k: 'part', id: 'p9_alpha_receptors', l: 'Alpha adrenergic receptors', match: 'Adrenergic receptors', parent: 'p_adrenergic', w: 9, line: 'alpha one and alpha two receptors binding norepinephrine on target tissues', src: [L8, 61], own: 'Adrenergic receptors including alpha one and alpha two subtypes responding to sympathetic release of norepinephrine.' },
  { k: 'part', id: 'p9_beta_receptors', l: 'Beta adrenergic receptors', match: 'Adrenergic receptors', parent: 'p_adrenergic', w: 9, line: 'beta one and beta two receptors binding norepinephrine on target tissues', src: [L8, 61], own: 'Adrenergic receptors including beta one and beta two subtypes mediating sympathetic effects on heart and tissues.' },
];
