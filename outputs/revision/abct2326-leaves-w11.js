/*
 * ABCT2326 · Week 11 leaves — muscle and bone.
 *
 * Read off ABCT2326 Muscle.pdf (phys.l9.2026), pages 2–70.
 * One row per unit the slides teach (part, cell, substance, process, group).
 * Row kinds and fields: outputs/revision/leaves.js. Rules: outputs/revision/rules.js.
 * Recipe: docs/superpowers/plans/2026-10-19-physiology-revise.md (Recipe P, Task 18).
 */
const L9 = 'phys.l9.2026';

export const SOURCES = {
  [L9]: 'Lectures 9 and 10 muscle slides',
};

export const ROWS = [
  /* ---------------- Properties of muscle (p5) ---------------- */
  { k: 'process', id: 'p11_contractility', l: 'Contractility', parent: 'p_musc_props', w: 11, line: 'ability of a muscle to shorten with force', src: [L9, 5] },
  { k: 'process', id: 'p11_excitability', l: 'Excitability', parent: 'p_musc_props', w: 11, line: 'capacity of muscle to respond to a stimulus', src: [L9, 5] },
  { k: 'process', id: 'p11_extensibility', l: 'Extensibility', parent: 'p_musc_props', w: 11, line: 'muscle can be stretched to its normal resting length and beyond', src: [L9, 5] },
  { k: 'process', id: 'p11_elasticity', l: 'Elasticity', parent: 'p_musc_props', w: 11, line: 'ability of muscle to recoil to original resting length after stretched', src: [L9, 5] },

  /* ---------------- Classification of muscle (p6) ---------------- */
  { k: 'group', id: 'p11_voluntary', l: 'Voluntary muscles', match: 'Voluntary', parent: 'p_musc_class', w: 11, line: 'actions can be directed by our thoughts via nervous system', links: { p1_skel_muscle_t: 'nervous system (skeletal muscles)' }, src: [L9, 6] },
  { k: 'group', id: 'p11_involuntary', l: 'Involuntary muscles', match: 'Involuntary', parent: 'p_musc_class', w: 11, line: 'actions are not under conscious control', links: { p1_smooth_muscle_t: 'directed by the autonomic nervous system (cardiac and smooth muscles)', p1_cardiac_muscle_t: 'directed by the autonomic nervous system (cardiac and smooth muscles)' }, src: [L9, 6] },

  /* ---------------- Skeletal muscle structure (p9, 10, 11, 14, 15) ---------------- */
  { k: 'part', id: 'p11_tendons', l: 'Tendons', match: 'tendons', parent: 'p_skm_struct', w: 11, line: 'places tension on tendons connecting muscle to a bone', src: [L9, 10] },
  { k: 'part', id: 'p11_muscle_origin', l: 'Muscle origin', match: 'muscle origin', parent: 'p_skm_struct', w: 11, line: 'attached to a bone that does not move at the muscle origin', src: [L9, 10] },
  { k: 'part', id: 'p11_muscle_insertion', l: 'Muscle insertion', match: 'muscle insertion', parent: 'p_skm_struct', w: 11, line: 'the bone that moves is attached at the muscle insertion', src: [L9, 10] },
  { k: 'group', id: 'p11_flexors', l: 'Flexor muscles', match: 'Flexor muscles', parent: 'p_skm_struct', w: 11, line: 'decrease the angle between two bones at a joint', src: [L9, 11] },
  { k: 'group', id: 'p11_extensors', l: 'Extensor muscles', match: 'Extensor muscles', parent: 'p_skm_struct', w: 11, line: 'increase the angle between two bones at a joint', src: [L9, 11] },
  { k: 'group', id: 'p11_agonist', l: 'Agonist', match: 'agonist', parent: 'p_skm_struct', w: 11, line: 'main muscle responsible for movement in a given direction', src: [L9, 11] },
  { k: 'group', id: 'p11_antagonists', l: 'Antagonists', match: 'antagonists', parent: 'p_skm_struct', w: 11, line: 'flexors and extensors that work together', src: [L9, 11] },
  { k: 'part', id: 'p11_endomysium', l: 'Endomysium', match: 'endomysium', parent: 'p_skm_struct', w: 11, line: 'thin connective tissue layer ensheathing muscle fibers', src: [L9, 14] },
  { k: 'part', id: 'p11_sarcolemma', l: 'Sarcolemma', parent: 'p_skm_struct', w: 11, line: 'the plasma membrane of the muscle fibre', src: [L9, 14, 15] },

  /* ---------------- Muscle fibre structure (p15, 17, 8, 31, 32) ---------------- */
  { k: 'part', id: 'p11_myofibrils', l: 'Myofibrils', match: 'myofibril', parent: 'p_fibre', w: 11, line: 'long, cylindrical structures which contains thick and thin filaments', src: [L9, 15, 17] },
  { k: 'part', id: 'p11_myofilaments', l: 'Myofilaments', match: 'myofilaments', parent: 'p_fibre', w: 11, line: 'composed of thick and thin filaments that give rise to bands', src: [L9, 17] },
  { k: 'part', id: 'p11_sr', l: 'Sarcoplasmic Reticulum', match: 'Sarcoplasmic Reticulum', parent: 'p_fibre', w: 11, line: 'membrane bound structures found in muscle that stores Ca2+', src: [L9, 8] },
  { k: 'part', id: 'p11_t_tubules', l: 'T tubules', parent: 'p_fibre', w: 11, line: 'extensions of sarcolemma that conduct action potentials', src: [L9, 31, 32] },

  /* ---------------- Sarcomeres (p18, 19, 54) ---------------- */
  { k: 'part', id: 'p11_thick_filaments', l: 'Thick filaments', match: 'thick filaments', parent: 'p_sarcomere', w: 11, line: 'composed mostly of myosin', src: [L9, 17, 18] },
  { k: 'part', id: 'p11_thin_filaments', l: 'Thin filaments', match: 'thin filaments', parent: 'p_sarcomere', w: 11, line: 'contain thin filaments mostly actin', src: [L9, 17, 18] },
  { k: 'part', id: 'p11_a_band', l: 'A band', match: 'A band', parent: 'p_sarcomere', w: 11, line: 'dark, corresponds to the length of thick filaments', src: [L9, 18] },
  { k: 'part', id: 'p11_h_zone', l: 'H zone', match: 'H zone', parent: 'p_sarcomere', w: 11, line: 'light area at center of A band where actin and myosin do not overlap', src: [L9, 18] },
  { k: 'part', id: 'p11_i_band', l: 'I band', match: 'I band', parent: 'p_sarcomere', w: 11, line: 'light, corresponds to the distance between A bands', src: [L9, 18] },
  { k: 'part', id: 'p11_z_disc', l: 'Z disc', match: 'Z disc', parent: 'p_sarcomere', w: 11, line: 'center of I band where actins attach, bordering sarcomere', src: [L9, 18, 19] },
  { k: 'part', id: 'p11_m_line', l: 'M line', match: 'M lines', parent: 'p_sarcomere', w: 11, line: 'structural proteins that anchor myosin during contraction', src: [L9, 19] },
  { k: 'substance', id: 'p11_titin', l: 'Titin', match: 'Titin', parent: 'p_sarcomere', w: 11, line: 'elastic protein attaching myosin to Z disc that contributes to elastic recoil', src: [L9, 19, 54] },

  /* ---------------- Sliding filament theory (p21, 22, 27) ---------------- */
  { k: 'process', id: 'p11_filament_sliding', l: 'Thin filament sliding', match: 'thin filaments slide', parent: 'p_sliding', w: 11, line: 'thin filaments slide over and between thick filaments towards center', src: [L9, 21, 22] },
  { k: 'process', id: 'p11_sarcomere_shortening', l: 'Sarcomere shortening', match: 'shortening of the sarcomeres', parent: 'p_sliding', w: 11, line: 'shortening distance from Z disc to Z disc', src: [L9, 21, 22, 27] },
  { k: 'process', id: 'p11_i_band_shortening', l: 'I band shortening', match: 'I bands shorten', parent: 'p_sliding', w: 11, line: 'I bands shorten because they define distance between A bands', src: [L9, 21, 22] },
  { k: 'process', id: 'p11_h_band_shortening', l: 'H band shortening', match: 'H bands', parent: 'p_sliding', w: 11, line: 'H bands shorten during contraction', src: [L9, 21, 22, 27] },

  /* ---------------- Cross bridge (p25, 27) ---------------- */
  { k: 'part', id: 'p11_myosin_head', l: 'Myosin head', match: 'myosin head', parent: 'p_crossbridge', w: 11, line: 'activated myosin head pivots, sliding the thin myofilament', src: [L9, 25] },
  { k: 'process', id: 'p11_power_stroke', l: 'Power stroke', match: 'power stroke', parent: 'p_crossbridge', w: 11, line: 'activated myosin head pivots, sliding the thin myofilament', next: { p11_adp_release: 'followed by ADP release' }, src: [L9, 25, 27] },
  { k: 'process', id: 'p11_adp_release', l: 'ADP release', match: 'ADP release', parent: 'p_crossbridge', w: 11, line: 'ADP is released AND the activated myosin head pivots', src: [L9, 25] },

  /* ---------------- Control of contraction (p26, 37) ---------------- */
  { k: 'substance', id: 'p11_troponin', l: 'Troponin', match: 'Troponin complex', parent: 'p_contr_control', w: 11, line: 'complex is attached to tropomyosin at intervals of every 7 actins', src: [L9, 26, 37] },
  { k: 'substance', id: 'p11_tropomyosin', l: 'Tropomyosin', match: 'tropomyosin', parent: 'p_contr_control', w: 11, line: 'blocks binding sites on actin so crossbridges cannot occur in relaxed muscle', src: [L9, 26] },
  { k: 'part', id: 'p11_g_actins', l: 'G-actins', match: 'G-actins', parent: 'p_contr_control', w: 11, line: 'double row of G-actins that make up actin thin filament', src: [L9, 26] },
  { k: 'substance', id: 'p11_calcium', l: 'Ca2+', match: 'Ca2+', parent: 'p_contr_control', w: 11, line: 'contraction can occur only when binding sites are exposed by Ca2+', acts: { p11_troponin: 'binds to troponin to expose binding sites' }, src: [L9, 26, 37] },

  /* ---------------- Neuromuscular junction (NMJ) (p28, 29, 30, 31) ---------------- */
  { k: 'part', id: 'p11_motor_end_plate', l: 'Motor end plate', match: 'motor end plate', parent: 'p_nmj', w: 11, line: 'place on sarcolemma where NMJ occurs', src: [L9, 28, 29] },
  { k: 'part', id: 'p11_synaptic_cleft', l: 'Synaptic cleft', match: 'synaptic cleft', parent: 'p_nmj', w: 11, line: 'narrow space that separates axon terminal from opposing motor end plate', src: [L9, 29, 30] },
  { k: 'substance', id: 'p11_ach', l: 'Acetylcholine (ACh)', match: 'ACh', parent: 'p_nmj', w: 11, line: 'chemical released by neuron to change membrane permeability', acts: { p11_ach_receptors: 'binds to ACh receptors on motor end plate' }, links: { p9_ach_substance: 'acetylcholine is a neurotransmitter, a chemical released by a neuron' }, src: [L9, 29, 30, 31] },
  { k: 'substance', id: 'p11_ache', l: 'Acetylcholinesterase (AChE)', match: 'AChE', parent: 'p_nmj', w: 11, line: 'enzyme which breaks down ACh into acetic acid and choline', acts: { p11_ach: 'breaks down acetylcholine' }, src: [L9, 29, 30] },
  { k: 'part', id: 'p11_ach_receptors', l: 'ACh receptors', match: 'ACh receptors', parent: 'p_nmj', w: 11, line: 'receptors on the surface of the motor end plate altering sodium permeability', src: [L9, 30] },
  { k: 'process', id: 'p11_epp', l: 'End-plate potential', match: 'plate potentials', parent: 'p_nmj', w: 11, line: 'large depolarizing end-plate potentials and APs in muscle', src: [L9, 31] },

  /* ---------------- Excitation-contraction coupling (p31, 32) ---------------- */
  { k: 'process', id: 'p11_sarcolemma_ap', l: 'Action potential propagation', match: 'propagation of the action potential along the sarcolemma', parent: 'p_ecc', w: 11, line: 'APs race over sarcolemma and down into muscle via T tubules', next: { p11_electromech_release: 'triggers Ca2+ release' }, src: [L9, 30, 31] },
  { k: 'process', id: 'p11_electromech_release', l: 'Electromechanical release', match: 'electromechanical release', parent: 'p_ecc', w: 11, line: 'APs in T tubules cause Ca2+ release channels in SR to release Ca2+', src: [L9, 32] },

  /* ---------------- Muscle relaxation (p37) ---------------- */
  { k: 'substance', id: 'p11_ca_atpase', l: 'Ca2+-ATPase pumps', match: 'Ca2+-ATPase pumps', parent: 'p_relax', w: 11, line: 'Ca2+-ATPase pumps move Ca2+ back into SR', acts: { p11_calcium: 'moves Ca2+ back into SR' }, src: [L9, 37] },
  { k: 'substance', id: 'p11_troponin_c', l: 'Troponin C', match: 'troponin C', parent: 'p_relax', w: 11, line: 'no more Ca2+ is available to bind to troponin C', src: [L9, 37] },

  /* ---------------- Motor unit (p38, 39) ---------------- */
  { k: 'process', id: 'p11_motor_unit_recruitment', l: 'Motor unit recruitment', match: 'motor unit recruitment', parent: 'p_motorunit', w: 11, line: 'contraction strength comes from motor unit recruitment', src: [L9, 39] },
  { k: 'group', id: 'p11_small_motor_units', l: 'Small motor units', match: 'smaller motor units', parent: 'p_motorunit', w: 11, line: 'finer muscle control requires smaller motor units', src: [L9, 39] },
  { k: 'group', id: 'p11_large_motor_units', l: 'Large motor units', match: 'larger, stronger muscles', parent: 'p_motorunit', w: 11, line: 'larger muscles have motor units with thousands of muscle fibers', src: [L9, 39] },

  /* ---------------- Energy requirements of skeletal muscles (p41-45, 52, 53) ---------------- */
  { k: 'substance', id: 'p11_atp', l: 'Adenosine triphosphate (ATP)', match: 'ATP', parent: 'p_musc_energy', w: 11, line: 'energy currency needed for muscle contraction', src: [L9, 52, 53] },
  { k: 'substance', id: 'p11_phosphocreatine', l: 'Phosphocreatine', match: 'phosphocreatine', parent: 'p_musc_energy', w: 11, line: 'breakdown provides PO4 and rapidly regenerates ATP', src: [L9, 52] },
  { k: 'substance', id: 'p11_fatty_acids', l: 'Fatty acids', match: 'fatty acids', parent: 'p_musc_energy', w: 11, line: 'at rest and for mild exercise energy comes from fatty acids', src: [L9, 41] },
  { k: 'substance', id: 'p11_glycogen', l: 'Glycogen stores', match: 'glycogen stores', parent: 'p_musc_energy', w: 11, line: 'for heavy exercise mostly from glycogen stores and blood glucose', src: [L9, 41] },
  { k: 'substance', id: 'p11_glut4', l: 'GLUT4 carriers', match: 'GLUT4 carriers', parent: 'p_musc_energy', w: 11, line: 'inserted into sarcolemma to allow more glucose into cells', src: [L9, 42] },
  { k: 'process', id: 'p11_vo2_max', l: 'Maximal oxygen uptake (VO2 max)', match: 'VO2  max', parent: 'p_musc_energy', w: 11, line: 'aerobic capacity determining whether exercise intensity is light or heavy', src: [L9, 43] },
  { k: 'process', id: 'p11_lactate_threshold', l: 'Lactate threshold', match: 'Lactate Threshold', parent: 'p_musc_energy', w: 11, line: 'percentage of maximal oxygen uptake at which blood lactate rises', src: [L9, 44] },
  { k: 'process', id: 'p11_oxygen_debt', l: 'Oxygen debt', match: 'Oxygen Debt', parent: 'p_musc_energy', w: 11, line: 'oxygen uptake does not immediately return to pre-exercise levels', src: [L9, 45] },
  { k: 'substance', id: 'p11_myoglobin', l: 'Myoglobin', match: 'myoglobin', parent: 'p_musc_energy', w: 11, line: 'oxygen storage molecule giving muscle fibers their red color', src: [L9, 45, 48] },

  /* ---------------- Slow- and fast-twitch fibres (p47, 48, 49) ---------------- */
  { k: 'cell', id: 'p11_type1_fibres', l: 'Type I fibers', match: 'Type I fibers', parent: 'p_twitch', w: 11, line: 'red slow oxidative fibers adapted to contract slowly without fatigue', src: [L9, 47, 48] },
  { k: 'cell', id: 'p11_type2a_fibres', l: 'Type IIA fibers', match: 'Type II A fibers', parent: 'p_twitch', w: 11, line: 'red fast oxidative fibers contracting fast using aerobic metabolism', src: [L9, 47, 49] },
  { k: 'cell', id: 'p11_type2x_fibres', l: 'Type IIX fibers', match: 'Type IIX fibers', parent: 'p_twitch', w: 11, line: 'white fast glycolytic fibers contracting fast using anaerobic metabolism', src: [L9, 47, 49] },

  /* ---------------- Muscle fatigue (p51, 52) ---------------- */
  { k: 'process', id: 'p11_extracellular_k', l: 'Extracellular K+ accumulation', match: 'Accumulation of extracellular K+', parent: 'p_fatigue', w: 11, line: 'accumulation of extracellular K+ reducing membrane potential', src: [L9, 51] },
  { k: 'process', id: 'p11_lactic_acid', l: 'Lactic acid accumulation', match: 'Lactic acid accumulation', parent: 'p_fatigue', w: 11, line: 'lactic acid accumulation and lower pH in muscle', src: [L9, 52] },
  { k: 'process', id: 'p11_central_fatigue', l: 'Central fatigue', match: 'central fatigue', parent: 'p_fatigue', w: 11, line: 'mental fatigue attributed to impaired function of central nervous system', src: [L9, 52] },

  /* ---------------- Adaptation to training (p54, 55, 56) ---------------- */
  { k: 'process', id: 'p11_hypertrophy', l: 'Hypertrophy', match: 'Hypertrophy', parent: 'p_training', w: 11, line: 'Type II muscle fibers become thicker due to increased actin and myosin', src: [L9, 54] },
  { k: 'substance', id: 'p11_nebulin', l: 'Nebulin', match: 'Nebulin', parent: 'p_training', w: 11, line: 'protein associated with actin that serves as fiber scaffolding', src: [L9, 54] },
  { k: 'substance', id: 'p11_obscurin', l: 'Obscurin', match: 'Obscurin', parent: 'p_training', w: 11, line: 'protein that surrounds Z discs serving as muscle fiber scaffolding', src: [L9, 54] },
  { k: 'cell', id: 'p11_satellite_cells', l: 'Satellite cells', match: 'satellite cells', parent: 'p_training', w: 11, line: 'stem cells that fuse to damaged muscle cells and repair them', src: [L9, 55, 56] },
  { k: 'substance', id: 'p11_myostatin', l: 'Myostatin', match: 'Myostatin', parent: 'p_training', w: 11, line: 'paracrine regulator that inhibits satellite cells', acts: { p11_satellite_cells: 'inhibits satellite cell proliferation' }, src: [L9, 55, 56] },

  /* ---------------- Neural control of skeletal muscles (p58, 59, 62) ---------------- */
  { k: 'cell', id: 'p11_lower_motor_neurons', l: 'Lower motor neurons', match: 'lower motor neurons', parent: 'p_neural_ctrl', w: 11, line: 'final common pathway with cell bodies in ventral horn of spinal cord', src: [L9, 58] },
  { k: 'cell', id: 'p11_upper_motor_neurons', l: 'Upper motor neurons', match: 'Upper motor neuron', parent: 'p_neural_ctrl', w: 11, line: 'brain neurons facilitating and inhibiting lower motor neuron activity', src: [L9, 58] },
  { k: 'part', id: 'p11_golgi_tendon_organs', l: 'Golgi tendon organs', match: 'Golgi tendon organs', parent: 'p_neural_ctrl', w: 11, line: 'respond to tension a muscle puts on a tendon', src: [L9, 59, 62] },
  { k: 'process', id: 'p11_golgi_reflex', l: 'Golgi tendon organ reflex', match: 'Golgi Tendon Organ Reflex', parent: 'p_neural_ctrl', w: 11, line: 'disynaptic reflex that prevents excessive muscle contraction', src: [L9, 62] },

  /* ---------------- Muscle spindle apparatus (p60, 61) ---------------- */
  { k: 'cell', id: 'p11_intrafusal_fibers', l: 'Intrafusal fibers', match: 'intrafusal fibers', parent: 'p_spindle', w: 11, line: 'thin muscle cells contained in muscle spindle apparatus', src: [L9, 60] },
  { k: 'cell', id: 'p11_nuclear_bag', l: 'Nuclear bag fibers', match: 'Nuclear bag fibers', parent: 'p_spindle', w: 11, line: 'type of intrafusal fiber within muscle spindle apparatus', src: [L9, 60] },
  { k: 'cell', id: 'p11_nuclear_chain', l: 'Nuclear chain fibers', match: 'Nuclear chain fibers', parent: 'p_spindle', w: 11, line: 'type of intrafusal fiber within muscle spindle apparatus', src: [L9, 60] },
  { k: 'part', id: 'p11_annulospiral', l: 'Annulospiral sensory endings', match: 'annulospiral', parent: 'p_spindle', w: 11, line: 'primary sensory endings wrapped around intrafusal fibers', src: [L9, 60, 61] },
  { k: 'part', id: 'p11_flowerspray', l: 'Flower-spray sensory endings', match: 'flower- spray', parent: 'p_spindle', w: 11, line: 'secondary sensory endings stimulated by sustained muscle stretch', src: [L9, 60] },
  { k: 'process', id: 'p11_stretch_reflex', l: 'Monosynaptic stretch reflex', match: 'Monosynaptic-Stretch Reflex', parent: 'p_spindle', w: 11, line: 'stretching spindles produces knee-jerk reflex via one CNS synapse', src: [L9, 61] },

  /* ---------------- Bone tissue (p65, 68) ---------------- */
  { k: 'part', id: 'p11_compact_bone', l: 'Compact bone', match: 'Compact bone', parent: 'p_bone_t', w: 11, line: 'dense and solid bone tissue with osteons', links: { p1_bone_tissue: 'two types of bone tissues: compact bone and spongy bone' }, src: [L9, 65] },
  { k: 'part', id: 'p11_osteon', l: 'Osteon', match: 'osteon', parent: 'p_bone_t', w: 11, line: 'basic functional unit of compact bone', src: [L9, 65, 68] },
  { k: 'part', id: 'p11_spongy_bone', l: 'Spongy bone', match: 'Spongy bone', parent: 'p_bone_t', w: 11, line: 'less dense open network characterized by trabeculae', src: [L9, 65, 68] },
  { k: 'part', id: 'p11_trabeculae', l: 'Trabeculae', match: 'trabeculae', parent: 'p_bone_t', w: 11, line: 'bone plates characterizing spongy bone to withstand stresses', src: [L9, 68] },
  { k: 'part', id: 'p11_canaliculi', l: 'Canaliculi', match: 'canaliculi', parent: 'p_bone_t', w: 11, line: 'passages delivering nutrients to osteocytes via diffusion', src: [L9, 68] },

  /* ---------------- Remodeling of bone (p68, 70) ---------------- */
  { k: 'cell', id: 'p11_osteoblasts', l: 'Osteoblasts', match: 'osteoblasts', parent: 'p_remodel', w: 11, line: 'bone cells involved in balanced remodeling activities', src: [L9, 70] },
  { k: 'cell', id: 'p11_osteoclasts', l: 'Osteoclasts', match: 'osteoclasts', parent: 'p_remodel', w: 11, line: 'bone cells involved in balanced remodeling activities', src: [L9, 70] },
  { k: 'cell', id: 'p11_osteocytes', l: 'Osteocytes', match: 'Osteocytes', parent: 'p_remodel', w: 11, line: 'get nutrients via diffusion from canaliculi of compact bone', links: { p1_osteocytes: 'osteocytes get the nutrients via diffusion from canaliculi of compact bone' }, src: [L9, 68, 70] },
  { k: 'process', id: 'p11_bone_matrix_renewal', l: 'Bone matrix recycling', match: 'bone matrix', parent: 'p_remodel', w: 11, line: 'organic and mineral components of bone matrix continuously renewed', src: [L9, 70] },
  { k: 'process', id: 'p11_ca_homeostasis', l: 'Calcium homeostasis', match: 'Homeostasis of Ca2+ balance', parent: 'p_remodel', w: 11, line: 'balance depends on parathyroid hormone, calcitonin and calcitriol', src: [L9, 70] },
];
