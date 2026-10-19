/*
 * ABCT2326 · Week 12 leaves — immunity.
 *
 * Read off ABCT2326 Immune v2.pdf (phys.10.2026), pages 3–70.
 * One row per unit the slides teach (part, cell, substance, process, group).
 * Row kinds and fields: outputs/revision/leaves.js. Rules: outputs/revision/rules.js.
 * Recipe: docs/superpowers/plans/2026-10-19-physiology-revise.md (Recipe P).
 */
const L10 = 'phys.10.2026';

export const SOURCES = {
  [L10]: 'Lectures 10 and 11 immune system slides',
};

export const ROWS = [
  /* ---------------- Defense mechanisms (p3-5) ---------------- */
  { k: 'group', id: 'p12_pathogens', l: 'Pathogens', parent: 'p_defense', w: 12, line: 'viruses, bacteria, protozoa, multicellular parasites in our environment', src: [L10, 3] },
  { k: 'process', id: 'p12_nonspecific_res', l: 'Nonspecific resistance', parent: 'p_defense', w: 12, line: 'always works the same way against any type of invading agent', src: [L10, 5] },
  { k: 'process', id: 'p12_specific_res', l: 'Specific resistance', parent: 'p_defense', w: 12, line: 'protects against specific pathogens and depends on activities of lymphocytes', src: [L10, 5, 48] },

  /* ---------------- Innate immunity (p6-11, 19-20) ---------------- */
  { k: 'substance', id: 'p12_pamps', l: 'Pathogen-associated molecular patterns', match: 'pathogen-associated molecular patterns', parent: 'p_innate', w: 12, line: 'molecular patterns on pathogens recognized by toll-like receptors', src: [L10, 19] },
  { k: 'part', id: 'p12_tlr', l: 'Toll-like receptors', match: 'toll-like receptors', parent: 'p_innate', w: 12, line: 'pattern recognition receptors on surface of immune cells for PAMPs', src: [L10, 19, 20], links: { p12_pamps: 'binds' } },
  { k: 'part', id: 'p12_prr', l: 'Pattern recognition receptors', match: 'pattern recognition receptor', parent: 'p_innate', w: 12, line: 'receptors on immune cells including ten distinct toll-like receptors', src: [L10, 19] },

  /* ---------------- Physical barriers (p8, 12, 42) ---------------- */
  { k: 'part', id: 'p12_skin', l: 'Outer layer of skin', parent: 'p_barriers', w: 12, line: 'physical barrier keeping hazardous materials outside the body', src: [L10, 12, 8] },
  { k: 'part', id: 'p12_hair', l: 'Hair', parent: 'p_barriers', w: 12, line: 'provides physical protection against mechanical impact and hazardous materials', src: [L10, 12, 42] },
  { k: 'part', id: 'p12_epithelial_layers', l: 'Epithelial layers', match: 'Epithelial layers of internal passageways', parent: 'p_barriers', w: 12, line: 'epithelial layers of internal passageways preventing pathogen entry', src: [L10, 12] },
  { k: 'group', id: 'p12_secretions', l: 'Secretions', parent: 'p_barriers', w: 12, line: 'flush away materials and kill or inhibit microorganisms', src: [L10, 12, 42] },
  { k: 'substance', id: 'p12_mucus', l: 'Mucus', match: 'mucus', parent: 'p12_secretions', w: 12, line: 'respiratory secretion that flushes away materials', src: [L10, 12] },
  { k: 'substance', id: 'p12_stomach_acid', l: 'Stomach acid', match: 'stomach acid', parent: 'p12_secretions', w: 12, line: 'secretions that kill or inhibit microorganisms', src: [L10, 12] },

  /* ---------------- Phagocytes (p14, 42) ---------------- */
  { k: 'group', id: 'p12_microphages', l: 'Microphages', parent: 'p_phagocytes', w: 12, line: 'neutrophils and eosinophils that leave bloodstream to fight infections', src: [L10, 14] },
  { k: 'cell', id: 'p12_neutrophils', l: 'Neutrophils', parent: 'p12_microphages', w: 12, line: 'leave the bloodstream and enter peripheral tissues to fight infections', src: [L10, 14] },
  { k: 'cell', id: 'p12_eosinophils', l: 'Eosinophils', match: 'eosinophils', parent: 'p12_microphages', w: 12, line: 'kill parasites and involved in allergic reactions', src: [L10, 14] },
  { k: 'cell', id: 'p12_monocytes', l: 'Monocytes', match: 'monocytes', parent: 'p_phagocytes', w: 12, line: 'circulating hematopoietic stem cells settling in tissues as macrophages', src: [L10, 14, 15] },
  { k: 'part', id: 'p12_monocyte_macro_sys', l: 'Monocyte-macrophage system', match: 'monocyte–macrophage system', parent: 'p_phagocytes', w: 12, line: 'reticuloendothelial system of large phagocytic cells distributed throughout body', src: [L10, 14] },

  /* ---------------- Macrophages (p15-18, 42) ---------------- */
  { k: 'cell', id: 'p12_fixed_macro', l: 'Fixed macrophages', parent: 'p_macrophages', w: 12, line: 'histiocytes that stay in specific tissues or organs', src: [L10, 15, 16, 42] },
  { k: 'cell', id: 'p12_microglia', l: 'Microglia', parent: 'p12_fixed_macro', w: 12, line: 'special histiocytes found in central nervous system', src: [L10, 16, 57] },
  { k: 'cell', id: 'p12_kupffer', l: 'Kupffer cells', parent: 'p12_fixed_macro', w: 12, line: 'special histiocytes found in liver sinusoids', src: [L10, 16, 57] },
  { k: 'cell', id: 'p12_free_macro', l: 'Free macrophages', parent: 'p_macrophages', w: 12, line: 'wandering macrophages that travel throughout body', src: [L10, 15, 16, 42] },
  { k: 'cell', id: 'p12_alveolar_macro', l: 'Alveolar macrophages', parent: 'p12_free_macro', w: 12, line: 'special free macrophages in lungs acting as phagocytic dust cells', src: [L10, 16] },
  { k: 'process', id: 'p12_emigration', l: 'Emigration', match: 'emigration', parent: 'p_macrophages', w: 12, line: 'movement of macrophages through capillary walls into tissues', src: [L10, 18] },
  { k: 'process', id: 'p12_chemotaxis', l: 'Chemotaxis', match: 'chemotaxis', parent: 'p_macrophages', w: 12, line: 'attracted or repelled by chemicals in surrounding fluids', src: [L10, 18] },
  { k: 'process', id: 'p12_adhesion', l: 'Adhesion', match: 'adhesion', parent: 'p_macrophages', w: 12, line: 'phagocyte attaches to target and surrounds it with a vesicle', src: [L10, 18] },

  /* ---------------- Immunological surveillance (p22-25, 42) ---------------- */
  { k: 'cell', id: 'p12_nk_cells', l: 'Natural killer cells', match: 'natural killer (NK) cells', parent: 'p_surveillance', w: 12, line: 'carry out immunological surveillance and attack abnormal cells', src: [L10, 22, 8, 42], makes: { p12_perforins: 'secretes perforin proteins' } },
  { k: 'substance', id: 'p12_perforins', l: 'Perforins', match: 'perforins', parent: 'p_surveillance', w: 12, line: 'proteins that create a network of pores causing lysis of abnormal cell', src: [L10, 22, 23, 24], acts: { p_surveillance: 'lyse abnormal plasma membrane' } },
  { k: 'process', id: 'p12_imm_escape', l: 'Immunological escape', match: 'immunological escape', parent: 'p_surveillance', w: 12, line: 'process where some cancer cells avoid detection by NK cells', src: [L10, 25] },
  { k: 'substance', id: 'p12_tumor_antigens', l: 'Tumor-specific antigens', match: 'tumor-specific antigens', parent: 'p_surveillance', w: 12, line: 'abnormal antigens on cancer cells identified as abnormal by NK cells', src: [L10, 25] },

  /* ---------------- Interferons (p27-28, 42) ---------------- */
  { k: 'substance', id: 'p12_cytokines', l: 'Cytokines', parent: 'p_interferons', w: 12, line: 'chemical messengers released by tissue cells to coordinate local activities', src: [L10, 27, 20, 28, 62], acts: { p_innate: 'coordinate local immune activities' } },
  { k: 'substance', id: 'p12_ifn_alpha', l: 'Interferon alpha', parent: 'p_interferons', w: 12, line: 'produced by virus-infected cells to attract and stimulate NK cells', src: [L10, 28], acts: { p12_nk_cells: 'stimulates NK cells' } },
  { k: 'substance', id: 'p12_ifn_beta', l: 'Interferon beta', parent: 'p_interferons', w: 12, line: 'secreted by fibroblasts and slows inflammation in a damaged area', src: [L10, 28], acts: { p_inflammation: 'slows inflammation' } },
  { k: 'substance', id: 'p12_ifn_gamma', l: 'Interferon gamma', parent: 'p_interferons', w: 12, line: 'secreted by T cells and NK cells and stimulates macrophage activity', src: [L10, 28], acts: { p_macrophages: 'stimulates macrophage activity' } },
  { k: 'substance', id: 'p12_antiviral_proteins', l: 'Antiviral proteins', match: 'antiviral proteins', parent: 'p_interferons', w: 12, line: 'block viral replication in neighboring cells to slow viral infections', src: [L10, 27, 9] },
  { k: 'cell', id: 'p12_fibroblasts', l: 'Fibroblasts', parent: 'p_interferons', w: 12, line: 'cells of connective tissue proper responsible for extracellular fibers and scar tissue', src: [L10, 28], makes: { p12_ifn_beta: 'secretes interferon beta' } },

  /* ---------------- Complement system (p30-34, 43) ---------------- */
  { k: 'substance', id: 'p12_comp_proteins', l: 'Complement proteins', match: 'complement (C) proteins', parent: 'p_complement', w: 12, line: 'thirty special plasma proteins working together in cascades', src: [L10, 30, 33] },
  { k: 'process', id: 'p12_classical_pathway', l: 'Classical pathway', parent: 'p_complement', w: 12, line: 'rapid activation pathway requiring C1 attachment to two antibodies', src: [L10, 30, 31, 34], next: { p12_c3b_attachment: 'splits C3 and leads to C3b attachment' } },
  { k: 'process', id: 'p12_alternative_pathway', l: 'Alternative pathway', parent: 'p_complement', w: 12, line: 'begins when complement proteins interact without antibody involvement', src: [L10, 30, 32, 34], next: { p12_c3b_attachment: 'attaches activated C3b to bacterial cell wall' } },
  { k: 'process', id: 'p12_c3b_attachment', l: 'C3b attachment', match: 'C3b Attachment', parent: 'p_complement', w: 12, line: 'attachment of activated C3b protein to bacterial cell wall', src: [L10, 31, 32, 33], next: { p12_common_pathway: 'turns on common pathway' } },
  { k: 'process', id: 'p12_common_pathway', l: 'Common pathway', match: 'common pathway', parent: 'p_complement', w: 12, line: 'activation of C5 to C9 complement proteins that generate MAC', src: [L10, 30, 33, 34], next: { p_complement: 'ends in generation of MAC and cell lysis' }, links: { p12_mac: 'generates membrane attack complex' } },
  { k: 'part', id: 'p12_mac', l: 'Membrane attack complex', match: 'membrane attack complex', parent: 'p_complement', w: 12, line: 'complex formed by C5 to C9 that destroys target cell integrity', src: [L10, 30, 33, 34] },
  { k: 'substance', id: 'p12_properdin', l: 'Properdin', match: 'properdin', parent: 'p_complement', w: 12, line: 'plasma complement protein interacting with factor B and factor D', src: [L10, 32, 34], acts: { p12_alternative_pathway: 'initiates alternative complement pathway' } },
  { k: 'process', id: 'p12_opsonization', l: 'Opsonization', match: 'opsonization', parent: 'p_complement', w: 12, line: 'coating of complement proteins and antibodies that enhances phagocytosis', src: [L10, 33, 34] },

  /* ---------------- Inflammation (p37-39, 43) ---------------- */
  { k: 'group', id: 'p12_cardinal_signs', l: 'Cardinal signs of inflammation', match: 'Signs and Symptoms', parent: 'p_inflammation', w: 12, line: 'swelling, redness, heat, and pain at the injury site', src: [L10, 37] },
  { k: 'substance', id: 'p12_histamine', l: 'Histamine', match: 'histamine', parent: 'p_inflammation', w: 12, line: 'released by mast cells to increase local inflammation and blood flow', src: [L10, 33, 34, 38], acts: { p_inflammation: 'accelerates blood flow and inflammation' } },
  { k: 'cell', id: 'p12_mast_cells', l: 'Mast cells', match: 'mast cells', parent: 'p_inflammation', w: 12, line: 'release histamine to increase degree of local inflammation and blood flow', src: [L10, 33, 43], makes: { p12_histamine: 'releases histamine' } },
  { k: 'cell', id: 'p12_basophils', l: 'Basophils', match: 'basophils', parent: 'p_inflammation', w: 12, line: 'circulating granulocytes that release histamine to increase inflammation', src: [L10, 33], makes: { p12_histamine: 'releases histamine' } },
  { k: 'process', id: 'p12_necrosis', l: 'Necrosis', parent: 'p_inflammation', w: 12, line: 'destruction of injured cells accumulated during local inflammation', src: [L10, 39] },
  { k: 'substance', id: 'p12_pus', l: 'Pus', match: 'pus', parent: 'p_inflammation', w: 12, line: 'viscous fluid mixture of debris, fluid, dead and dying cells', src: [L10, 39] },
  { k: 'part', id: 'p12_abscess', l: 'Abscess', match: 'abscess', parent: 'p_inflammation', w: 12, line: 'an accumulation of pus in an enclosed tissue space', src: [L10, 39] },

  /* ---------------- Fever (p41, 43) ---------------- */
  { k: 'substance', id: 'p12_pyrogens', l: 'Pyrogens', parent: 'p_fever', w: 12, line: 'circulating proteins that reset internal thermostat to raise body temperature', src: [L10, 41, 43], acts: { p_fever: 'resets thermostat to elevate body temperature' } },
  { k: 'substance', id: 'p12_il1', l: 'Interleukin-1', match: 'interleukin-1', parent: 'p_fever', w: 12, line: 'endogenous pyrogen cytokine released by macrophages to induce fever', src: [L10, 41, 43], acts: { p_fever: 'elevates body temperature' } },

  /* ---------------- Adaptive immunity (p44, 48-49) ---------------- */
  { k: 'process', id: 'p12_cell_med_imm', l: 'Cell-mediated immunity', match: 'cell-mediated immunity', parent: 'p_adaptive', w: 12, line: 'T cells defend against abnormal cells and pathogens inside cells', src: [L10, 48, 49, 50] },
  { k: 'process', id: 'p12_ab_med_imm', l: 'Antibody-mediated immunity', match: 'antibody-mediated immunity', parent: 'p_adaptive', w: 12, line: 'B cells defend against antigens and pathogens in body fluids', src: [L10, 48, 49, 63] },

  /* ---------------- Forms of immunity (p45-47) ---------------- */
  { k: 'group', id: 'p12_active_imm', l: 'Active immunity', match: 'Active Immunity', parent: 'p_imm_forms', w: 12, line: 'antibodies develop in the body after exposure to an antigen', src: [L10, 46, 45, 47] },
  { k: 'process', id: 'p12_nat_active_imm', l: 'Naturally acquired active immunity', parent: 'p12_active_imm', w: 12, line: 'develops after environmental exposure to antigens and pathogens', src: [L10, 47, 46] },
  { k: 'process', id: 'p12_art_active_imm', l: 'Artificially induced active immunity', parent: 'p12_active_imm', w: 12, line: 'develops after administration of vaccines containing pathogens to prevent disease', src: [L10, 47, 46] },
  { k: 'group', id: 'p12_passive_imm', l: 'Passive immunity', match: 'Passive Immunity', parent: 'p_imm_forms', w: 12, line: 'antibodies are transferred into body from another source', src: [L10, 46, 45, 47] },
  { k: 'process', id: 'p12_nat_passive_imm', l: 'Naturally acquired passive immunity', parent: 'p12_passive_imm', w: 12, line: 'conferred by transfer of maternal antibodies across placenta or breast milk', src: [L10, 47, 46] },
  { k: 'process', id: 'p12_art_passive_imm', l: 'Artificially induced passive immunity', parent: 'p12_passive_imm', w: 12, line: 'conferred by administration of antibodies to combat infection', src: [L10, 47, 46] },

  /* ---------------- T cells (p50, 55-56) ---------------- */
  { k: 'cell', id: 'p12_cytotoxic_t', l: 'Cytotoxic T cells', parent: 'p_tcells', w: 12, line: 'attack cells infected by viruses; responsible for cell-mediated immunity', src: [L10, 50, 55, 56] },
  { k: 'cell', id: 'p12_memory_t', l: 'Memory T cells', parent: 'p_tcells', w: 12, line: 'clone more of themselves in response to remembered antigen', src: [L10, 50, 55, 56] },
  { k: 'cell', id: 'p12_helper_t', l: 'Helper T cells', parent: 'p_tcells', w: 12, line: 'stimulate function of T cells and activate B cells', src: [L10, 50, 61, 62, 65, 66] },
  { k: 'cell', id: 'p12_suppressor_t', l: 'Suppressor T cells', parent: 'p_tcells', w: 12, line: 'inhibit function of T cells and B cells by secreting suppression factors', src: [L10, 50, 55, 56] },
  { k: 'part', id: 'p12_cd8', l: 'CD8 markers', match: 'CD8', parent: 'p_tcells', w: 12, line: 'protein markers on cytotoxic and suppressor T cells important for costimulation', src: [L10, 55] },

  /* ---------------- MHC proteins (p51-54, 57-59) ---------------- */
  { k: 'process', id: 'p12_ag_presentation', l: 'Antigen presentation', match: 'Antigen Presentation', parent: 'p_mhc', w: 12, line: 'T cells only recognize antigens bound to glycoproteins in plasma membranes', src: [L10, 51, 54, 49] },
  { k: 'part', id: 'p12_mhc_i', l: 'Class I MHC proteins', match: 'Class I MHC', parent: 'p_mhc', w: 12, line: 'found in membranes of all nucleated cells displaying peptides from inside cell', src: [L10, 52, 53, 54, 55] },
  { k: 'part', id: 'p12_mhc_ii', l: 'Class II MHC proteins', match: 'Class II MHC', parent: 'p_mhc', w: 12, line: 'found in membranes of antigen-presenting cells and lymphocytes displaying antigenic fragments', src: [L10, 52, 57, 59, 61] },
  { k: 'cell', id: 'p12_apcs', l: 'Antigen-presenting cells', match: 'Antigen-presenting Cells', parent: 'p_mhc', w: 12, line: 'phagocytic cells and lymphocytes presenting processed antigenic fragments on Class II MHC', src: [L10, 57, 52, 59, 60] },
  { k: 'cell', id: 'p12_dendritic_cells', l: 'Dendritic cells', parent: 'p12_apcs', w: 12, line: 'antigen-presenting cells in lymph nodes and spleen with surface projections', src: [L10, 57, 58] },
  { k: 'cell', id: 'p12_langerhans', l: 'Langerhans cells', parent: 'p12_apcs', w: 12, line: 'non-phagocytic dendritic antigen-presenting cells of the skin epidermis', src: [L10, 57, 58] },

  /* ---------------- Helper T cell activation (p60-62, 65-66) ---------------- */
  { k: 'part', id: 'p12_cd4', l: 'CD4 markers', match: 'CD4', parent: 'p_helper', w: 12, line: 'protein on helper T cells binding class II MHC during costimulation', src: [L10, 60, 61, 62, 66] },
  { k: 'part', id: 'p12_tcr', l: 'T cell receptor', parent: 'p_helper', w: 12, line: 'receptor recognizing specific foreign antigen bound to MHC protein', src: [L10, 60, 66] },
  { k: 'process', id: 'p12_costimulation', l: 'Costimulation', parent: 'p_helper', w: 12, line: 'vital secondary binding confirming antigen recognition before T cell activation', src: [L10, 60, 66, 55], next: { p_helper: 'activates helper T cell to divide and secrete cytokines' }, links: { p12_th_cytokines: 'stimulates cytokine secretion' } },
  { k: 'substance', id: 'p12_th_cytokines', l: 'Helper T cell cytokines', match: 'Cytokines', parent: 'p_helper', w: 12, line: 'cytokines secreted by active helper T cells stimulating T and B cells', src: [L10, 62, 65, 66], acts: { p_bcells: 'promotes B cell activation and division' } },
  { k: 'cell', id: 'p12_memory_th', l: 'Memory helper T cells', match: 'Memory TH Cells', parent: 'p_helper', w: 12, line: 'inactive helper T cells that remain in reserve awaiting antigen reappearance', src: [L10, 61, 62] },

  /* ---------------- B cells (p63-67) ---------------- */
  { k: 'part', id: 'p12_bcr', l: 'B cell receptors', parent: 'p_bcells', w: 12, line: 'surface antibody molecules that bind corresponding antigens in interstitial fluids', src: [L10, 63, 64] },
  { k: 'process', id: 'p12_b_sensitization', l: 'B cell sensitization', match: 'Sensitization', parent: 'p_bcells', w: 12, line: 'antigen binds B cell receptors, is processed, and displayed on MHC II', src: [L10, 63, 64], next: { p12_b_activation: 'prepares B cell for activation by helper T cell' } },
  { k: 'process', id: 'p12_b_activation', l: 'B cell activation', match: 'Activation', parent: 'p_bcells', w: 12, line: 'helper T cell binds MHC II and secretes cytokines activating B cell', src: [L10, 65, 66], next: { p12_b_division: 'stimulates B cell division and differentiation' } },
  { k: 'process', id: 'p12_b_division', l: 'B cell division and differentiation', match: 'Division and Differentiation', parent: 'p_bcells', w: 12, line: 'activated B cell divides into antibody-producing plasma cells and memory B cells', src: [L10, 67] },
  { k: 'cell', id: 'p12_plasma_cells', l: 'Plasma cells', parent: 'p_bcells', w: 12, line: 'synthesize and secrete antibodies into interstitial fluid', src: [L10, 67, 49, 69, 70], makes: { p12_antibodies: 'synthesize and secrete antibodies' } },
  { k: 'cell', id: 'p12_memory_b', l: 'Memory B cells', parent: 'p_bcells', w: 12, line: 'remain in reserve to respond to next infection', src: [L10, 67] },
  { k: 'substance', id: 'p12_antibodies', l: 'Antibodies', parent: 'p_bcells', w: 12, line: 'proteins secreted by plasma cells that bind and neutralize specific antigens', src: [L10, 67, 64, 48, 49], acts: { p_pathogens: 'neutralize pathogens and foreign antigens' } },

  /* ---------------- Defenses against bacterial and viral pathogens (p69-70) ---------------- */
  { k: 'process', id: 'p12_bacterial_defense', l: 'Defenses against bacteria', parent: 'p_pathogens', w: 12, line: 'involve phagocytosis, antigen presentation by APCs, and antibody production', src: [L10, 69] },
  { k: 'process', id: 'p12_viral_defense', l: 'Defenses against viruses', parent: 'p_pathogens', w: 12, line: 'involve direct contact with virus-infected cells, cytotoxic T cells, and interferons', src: [L10, 70] },
  { k: 'part', id: 'p12_ag_ab_complex', l: 'Antigen-antibody complexes', match: 'antigen-antibody complexes', parent: 'p_pathogens', w: 12, line: 'formation leads to opsonization, phagocyte attraction, and bacterial lysis', src: [L10, 69] },
];
