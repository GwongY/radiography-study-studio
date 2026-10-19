/*
 * ABCT2326 · the Tissues & cells rows merged from anatomy into Lecture 1 (Week 1).
 *
 * Sourced from the body tissues tutorial filed in iCloud Human Physology.
 * Row kinds and fields: outputs/revision/leaves.js. Rules: outputs/revision/rules.js.
 * Plan: docs/superpowers/plans/2026-10-19-physiology-revise.md Task 10.
 */
const TIS = 'hss.tut.tissues';

export const SOURCES = {
  [TIS]: 'Body tissues tutorial (filed with the physiology lectures)',
};

export const ROWS = [
  /* ---------------- cell parts and junctions (tutorial p5-8, 20) ---------------- */
  { k: 'group', id: 'p1_tis_cell', l: 'Cell', parent: 'p_tissues', w: 1, line: 'a tissue is a group of similar cells', src: [TIS, 5] },
  { k: 'part', id: 'p1_tis_plasmamem', l: 'Plasma membranes', match: 'plasma membrane', parent: 'p1_tis_cell', w: 1, own: 'The outer boundary of the cell that regulates movement of substances in and out.', src: [TIS, 6] },
  { k: 'part', id: 'p1_tis_nucleus', l: 'Nucleus', parent: 'p1_tis_cell', w: 1, own: 'The central cellular organelle containing DNA and controlling cell activities.', src: [TIS, 20] },
  { k: 'part', id: 'p1_tis_organelles', l: 'Organelles', parent: 'p1_tis_cell', w: 1, own: 'Specialized internal structures of the cell each performing a specific metabolic task.', src: [TIS, 20] },

  { k: 'group', id: 'p1_tis_junctions', l: 'Intercellular Junctions', parent: 'p_cells', w: 1, line: 'cells adhere to and communicate with one another', src: [TIS, 6, 5] },
  { k: 'part', id: 'p1_tis_tight', l: 'Tight Junctions', parent: 'p1_tis_junctions', w: 1, line: 'protein band fusing plasma membranes into an impermeable seal', links: { p1_tis_plasmamem: 'fuse the plasma membranes together' }, src: [TIS, 6] },
  { k: 'part', id: 'p1_tis_adherent', l: 'Adherent Junctions', parent: 'p1_tis_junctions', w: 1, line: 'strengthen tight junctions; link cytoskeletons of adjacent cells', links: { p1_tis_tight: 'located just below tight junctions', p1_cytoskeleton: 'mechanically link the cytoskeletons' }, src: [TIS, 7] },
  { k: 'part', id: 'p1_tis_gap', l: 'Gap Junctions', parent: 'p1_tis_junctions', w: 1, line: 'open channels exchanging nutrients, ions and signals between cells', src: [TIS, 8] },
  { k: 'part', id: 'p1_tis_connexins', l: 'Connexins', parent: 'p1_tis_gap', w: 1, line: 'rings of transmembrane proteins', src: [TIS, 8] },
  { k: 'part', id: 'p1_tis_connexon', l: 'Connexon', parent: 'p1_tis_gap', w: 1, line: 'hollow cylinder formed by aligned connexins', links: { p1_tis_connexins: 'connexins align to form the connexon' }, src: [TIS, 8] },

  /* ---------------- epithelial tissue (tutorial p10, 15-16) ---------------- */
  { k: 'group', id: 'p1_tis_epi', l: 'Epithelial Tissue', match: 'Epithelial (epithelium)', parent: 'p_epithelial', w: 1, line: 'covers body surfaces and lines most internal cavities', links: { p1_tis_junctions: 'epithelial cells have many junctions' }, src: [TIS, 10] },
  { k: 'part', id: 'p1_tis_glands', l: 'Glands', parent: 'p1_tis_epi', w: 1, line: 'all glands are made of epithelial cells', src: [TIS, 10] },
  { k: 'part', id: 'p1_tis_strsq', l: 'Stratified squamous', parent: 'p1_tis_epi', w: 1, line: 'protects underlying tissues from abrasion, e.g. in mouth', src: [TIS, 15] },
  { k: 'part', id: 'p1_tis_keratinised', l: 'Keratinized stratified squamous epithelium', parent: 'p1_tis_strsq', w: 1, line: 'dead outer cells without nuclei; contains keratin; waterproof', src: [TIS, 16] },
  { k: 'part', id: 'p1_tis_parakerat', l: 'Parakeratinized', parent: 'p1_tis_strsq', w: 1, line: 'apical cells have nuclei; e.g. mouth, esophagus', src: [TIS, 16] },
  { k: 'part', id: 'p1_tis_strcub', l: 'Stratified cuboidal', parent: 'p1_tis_epi', w: 1, line: 'protects underlying tissues, e.g. sweat and salivary glands', links: { p1_tis_glands: 'found in sweat and salivary glands' }, src: [TIS, 15] },
  { k: 'part', id: 'p1_tis_strcol', l: 'Stratified columnar', parent: 'p1_tis_epi', w: 1, line: 'secretory and protective, e.g. male urethra, some glands', src: [TIS, 15] },
  { k: 'part', id: 'p1_tis_transitional', l: 'Transitional', parent: 'p1_tis_epi', w: 1, line: 'irregular shape, allows flexibility', src: [TIS, 15] },

  /* ---------------- connective tissue (tutorial p17) ---------------- */
  { k: 'group', id: 'p1_tis_conn', l: 'Connective Tissue', parent: 'p_connective', w: 1, line: 'most abundant tissue; supports, binds, stores fat, insulates, protects', src: [TIS, 17] },
  { k: 'group', id: 'p1_tis_fibres', l: 'Fibers', parent: 'p1_tis_conn', w: 1, line: 'collagen, elastin or reticular fibers support the cells', src: [TIS, 17] },
  { k: 'part', id: 'p1_tis_elastin', l: 'Elastin', parent: 'p1_tis_fibres', w: 1, line: 'gives elasticity', own: 'An extracellular matrix protein that allows connective tissues to stretch and recoil.', src: [TIS, 17] },
  { k: 'part', id: 'p1_tis_reticular', l: 'Reticular fibers', parent: 'p1_tis_fibres', w: 1, line: 'for support', own: 'Delicate branching collagenous fibers that form a supporting network in soft organs.', src: [TIS, 17] },
  { k: 'group', id: 'p1_tis_connells', l: 'Connective tissue cells', match: 'Cells', parent: 'p1_tis_conn', w: 1, line: 'dispersed through the extracellular matrix of fiber and ground substance', src: [TIS, 17] },
  { k: 'part', id: 'p1_tis_adipocytes', l: 'Adipocytes', parent: 'p1_tis_connells', w: 1, line: 'fat cells', own: 'Specialized fat-storing cells that provide insulation, cushioning and energy storage.', src: [TIS, 17] },
  { k: 'part', id: 'p1_tis_macrophages', l: 'Macrophages', parent: 'p1_tis_connells', w: 1, own: 'Phagocytic cells that engulf cellular debris and foreign substances in connective tissues.', src: [TIS, 17] },
  { k: 'part', id: 'p1_tis_mastcells', l: 'Mast cells', parent: 'p1_tis_connells', w: 1, own: 'Cells that release histamine and heparin to initiate local inflammatory responses.', src: [TIS, 17] },
  { k: 'part', id: 'p1_tis_fibroblasts', l: 'Fibroblasts', parent: 'p1_tis_connells', w: 1, own: 'The primary active cells that secrete collagen and other extracellular matrix components.', src: [TIS, 17] },
  { k: 'part', id: 'p1_tis_leukocytes', l: 'Leukocytes', parent: 'p1_tis_connells', w: 1, own: 'White blood cells that enter tissues to defend against infection and injury.', src: [TIS, 17] },
  { k: 'part', id: 'p1_tis_water', l: 'Water', parent: 'p1_tis_conn', w: 1, line: 'all the cells are suspended in it', src: [TIS, 17] },
  { k: 'group', id: 'p1_tis_conntypes', l: 'Includes', parent: 'p1_tis_conn', w: 1, own: 'The diverse categories and examples of connective tissue found throughout the body.', src: [TIS, 17] },
  { k: 'part', id: 'p1_tis_fatty', l: 'Fatty tissue', parent: 'p1_tis_conntypes', w: 1, links: { p1_tis_adipocytes: 'adipocytes are fat cells' }, own: 'Adipose connective tissue consisting predominantly of fat cells for insulation and fuel storage.', src: [TIS, 17] },
  { k: 'part', id: 'p1_tis_dense', l: 'Dense fibrous tissue', parent: 'p1_tis_conntypes', w: 1, own: 'Connective tissue with densely packed collagen fibers providing tensile strength in tendons and ligaments.', src: [TIS, 17] },
  { k: 'part', id: 'p1_tis_bonetissue', l: 'Bone', parent: 'p1_tis_conntypes', w: 1, own: 'Rigid supporting connective tissue with a mineralized matrix protecting organs and supporting body weight.', src: [TIS, 17] },
  { k: 'part', id: 'p1_tis_lymph', l: 'Lymph tissue', parent: 'p1_tis_conntypes', w: 1, line: 'technically connective tissue but lacks fiber', src: [TIS, 17] },

  /* ---------------- muscle tissue (tutorial p18) ---------------- */
  { k: 'group', id: 'p1_tis_muscle', l: 'Muscle Tissue', parent: 'p_muscle_t', w: 1, line: 'soft contractile tissue formed by myogenesis in the embryo', src: [TIS, 18, 19] },
  { k: 'part', id: 'p1_tis_cardiac', l: 'Cardiac muscle cells', match: 'Cardiac muscle', parent: 'p1_tis_muscle', w: 1, line: 'branched, one nucleus, striated; involuntary; only in the heart', src: [TIS, 18] },
  { k: 'part', id: 'p1_tis_intercalated', l: 'Intercalated discs', parent: 'p1_tis_cardiac', w: 1, line: 'connect cardiac cells for synchronized contraction', src: [TIS, 18] },
  { k: 'part', id: 'p1_tis_smooth', l: 'Smooth muscle cells', match: 'Smooth muscle', parent: 'p1_tis_muscle', w: 1, line: 'spindle-shaped, one nucleus, no striations; walls of hollow organs', src: [TIS, 18] },

  /* ---------------- neural tissue (tutorial p20-21) ---------------- */
  { k: 'group', id: 'p1_tis_nerve', l: 'Nerve Tissue', parent: 'p_neural_t', w: 1, line: 'also known as neural tissue; the CNS and the PNS', src: [TIS, 20] },
  { k: 'part', id: 'p1_tis_cns', l: 'Central nervous system', match: '(CNS)', parent: 'p1_tis_nerve', w: 1, line: 'the brain and spinal cord; processes and integrates information', src: [TIS, 20, 21] },
  { k: 'part', id: 'p1_tis_pns', l: 'Peripheral nervous system', match: '(PNS)', parent: 'p1_tis_nerve', w: 1, line: 'nerves and ganglia outside the CNS; carries signals to the body', links: { p1_tis_cns: 'transmits signals between the CNS and the body' }, src: [TIS, 20, 21] },
  { k: 'part', id: 'p1_tis_sensoryn', l: 'Sensory neurons', parent: 'p1_neurons', w: 1, line: 'transmit information from receptors to the CNS', links: { p1_tis_cns: 'carry sensory information to the CNS' }, src: [TIS, 21] },
  { k: 'part', id: 'p1_tis_motorn', l: 'Motor neurons', parent: 'p1_neurons', w: 1, line: 'transmit signals from the CNS to muscles or glands', links: { p1_tis_cns: 'signals leave the CNS' }, src: [TIS, 21] },
  { k: 'part', id: 'p1_tis_interneurons', l: 'Interneurons', parent: 'p1_neurons', w: 1, line: 'connect neurons within the CNS and integrate information', links: { p1_tis_cns: 'found in the brain and spinal cord' }, src: [TIS, 21] },
  { k: 'part', id: 'p1_tis_glia', l: 'Glial cells', parent: 'p1_tis_nerve', w: 1, line: 'support, protect and nourish neurons; remove waste', links: { p1_neurons: 'support, insulation, nutrients, waste removal' }, src: [TIS, 20, 21] },
];
