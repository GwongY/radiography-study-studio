/*
 * ABCT2326 · Week 1 leaves — cells, tissues and homeostasis.
 *
 * Read off Lecture 1 - Cells and Body Organization.pdf (phys.1.2026), pages 2–62.
 * One row per unit the slides teach (part, cell, substance, process, group).
 * Row kinds and fields: outputs/revision/leaves.js. Rules: outputs/revision/rules.js.
 * Recipe: docs/superpowers/plans/2026-10-19-physiology-revise.md (Recipe P).
 */
const L1 = 'phys.1.2026';

export const SOURCES = {
  [L1]: 'Lecture 1 cells and body organisation slides',
};

export const ROWS = [
  /* ---------------- Introduction to cells (p4-6, 8, 11, 16) ---------------- */
  { k: 'cell', id: 'p1_sexcells', l: 'Sex Cells', parent: 'p_cells', w: 1, line: 'reproductive cells: male sperm and female oocyte', src: [L1, 4] },
  { k: 'cell', id: 'p1_somatic', l: 'Somatic Cells', parent: 'p_cells', w: 1, line: 'all body cells except sex cells', src: [L1, 4] },
  { k: 'part', id: 'p1_cytoplasm', l: 'Cytoplasm', parent: 'p_cells', w: 1, line: 'all materials inside the cell and outside the nucleus', src: [L1, 8, 5, 9, 16] },
  { k: 'part', id: 'p1_cytosol', l: 'Cytosol', parent: 'p1_cytoplasm', w: 1, line: 'intracellular fluid with dissolved nutrients, ions, proteins, and waste products', src: [L1, 8, 5, 6] },
  { k: 'part', id: 'p1_centrosome', l: 'Centrosome', parent: 'p_cells', w: 1, line: 'essential for movement of chromosomes during cell division', src: [L1, 5] },
  { k: 'part', id: 'p1_centrioles', l: 'Centrioles', parent: 'p1_centrosome', w: 1, line: 'composed of nine microtubule triplets in a circular array', own: 'Centrioles are paired cylindrical structures that organize microtubules during cell division.', src: [L1, 5] },
  { k: 'part', id: 'p1_cytoskeleton', l: 'Cytoskeleton', parent: 'p_cells', w: 1, line: 'proteins organized in fine filaments or slender tubes for strength and support', src: [L1, 6, 9] },
  { k: 'part', id: 'p1_microfilaments', l: 'Microfilaments', match: 'Microfilament', parent: 'p1_cytoskeleton', w: 1, line: 'proteins organized in fine filaments', src: [L1, 6, 9, 11] },
  { k: 'part', id: 'p1_microtubules', l: 'Microtubules', match: 'Microtubule', parent: 'p1_cytoskeleton', w: 1, line: 'proteins organized in slender tubes', src: [L1, 6, 5, 11] },
  { k: 'part', id: 'p1_freeribosomes', l: 'Free ribosomes', parent: 'p_cells', w: 1, line: 'ribosomes distributed throughout the cytosol', src: [L1, 6, 20] },
  { k: 'part', id: 'p1_microvilli', l: 'Microvilli', parent: 'p_cells', w: 1, line: 'membrane extensions containing microfilaments that increase surface area for absorption', src: [L1, 11, 33] },
  { k: 'part', id: 'p1_cilia', l: 'Cilia', parent: 'p_cells', w: 1, line: 'long extensions of the plasma membrane containing microtubules', src: [L1, 11, 33] },
  { k: 'part', id: 'p1_mitochondria', l: 'Mitochondria', parent: 'p_cells', w: 1, line: 'double membrane organelles producing ninety-five percent of cellular ATP', own: 'Mitochondria generate most of the chemical energy required by the cell through cellular respiration.', src: [L1, 16, 33] },

  /* ---------------- Plasma membrane (p7-10) ---------------- */
  { k: 'part', id: 'p1_phospholipid_bilayer', l: 'Phospholipid bilayer', parent: 'p_membrane', w: 1, line: 'hydrophilic heads and hydrophobic fatty-acid tails forming barrier to ions and water', src: [L1, 7, 9] },
  { k: 'group', id: 'p1_membrane_proteins', l: 'Membrane Proteins', parent: 'p_membrane', w: 1, line: 'integral and peripheral proteins in the plasma membrane', src: [L1, 10, 9] },
  { k: 'part', id: 'p1_anchoring_proteins', l: 'Anchoring proteins', parent: 'p1_membrane_proteins', w: 1, line: 'stabilizers that attach to inside or outside structures', src: [L1, 10] },
  { k: 'part', id: 'p1_recognition_proteins', l: 'Recognition proteins', parent: 'p1_membrane_proteins', w: 1, line: 'identifiers that label cells as normal or abnormal', src: [L1, 10] },
  { k: 'part', id: 'p1_receptor_proteins', l: 'Receptor proteins', parent: 'p1_membrane_proteins', w: 1, line: 'bind and respond to ligands such as ions and hormones', src: [L1, 10] },
  { k: 'part', id: 'p1_carrier_proteins', l: 'Carrier proteins', parent: 'p1_membrane_proteins', w: 1, line: 'transport specific solutes through the membrane', src: [L1, 10] },
  { k: 'part', id: 'p1_membrane_channels', l: 'Channels', parent: 'p1_membrane_proteins', w: 1, line: 'regulate water flow and solutes through the membrane', src: [L1, 10, 9] },
  { k: 'part', id: 'p1_glycocalyx', l: 'Glycocalyx', match: 'glycocalyx', parent: 'p_membrane', w: 1, line: 'outer layer of glycolipids and glycoproteins', src: [L1, 9] },

  /* ---------------- Cell nucleus (p12-15) ---------------- */
  { k: 'part', id: 'p1_nuclear_envelope', l: 'Nuclear envelope', parent: 'p_nucleus', w: 1, line: 'double membrane around the nucleus', src: [L1, 12, 13] },
  { k: 'part', id: 'p1_nuclear_pores', l: 'Nuclear pores', parent: 'p_nucleus', w: 1, line: 'communication passages through the nuclear envelope', src: [L1, 12, 13, 21] },
  { k: 'part', id: 'p1_nucleoplasm', l: 'Nucleoplasm', parent: 'p_nucleus', w: 1, line: 'fluid containing ions, enzymes, nucleotides, and some RNA', src: [L1, 12, 13] },
  { k: 'part', id: 'p1_nucleolus', l: 'Nucleolus', parent: 'p_nucleus', w: 1, line: 'synthesizes ribosomal RNA and ribosomal subunits', src: [L1, 13, 12, 54, 55] },
  { k: 'part', id: 'p1_chromatin', l: 'Chromatin', parent: 'p_nucleus', w: 1, line: 'DNA and associated nucleoproteins in a nondividing cell', src: [L1, 13, 14] },
  { k: 'part', id: 'p1_nucleosomes', l: 'Nucleosomes', parent: 'p_nucleus', w: 1, line: 'complex of DNA coiled around core histones', src: [L1, 12, 14] },
  { k: 'part', id: 'p1_gene', l: 'Gene', parent: 'p_nucleus', w: 1, line: 'DNA instructions for one protein', src: [L1, 15, 21, 22] },
  { k: 'substance', id: 'p1_genetic_code', l: 'Genetic code', parent: 'p_nucleus', w: 1, line: 'chemical language of DNA instructions in triplet base sequence', src: [L1, 15] },

  /* ---------------- Endoplasmic reticulum (p16-17) ---------------- */
  { k: 'part', id: 'p1_rough_er', l: 'Rough ER', parent: 'p_er', w: 1, line: 'modifies and packages newly synthesized proteins', src: [L1, 16, 21] },
  { k: 'part', id: 'p1_smooth_er', l: 'Smooth ER', parent: 'p_er', w: 1, line: 'synthesizes lipids and carbohydrates', src: [L1, 16] },

  /* ---------------- Golgi apparatus (p16, 18-20) ---------------- */
  { k: 'part', id: 'p1_cisternae', l: 'Cisternae', match: 'cisternae', parent: 'p_golgi', w: 1, line: 'stacks of flattened membranes containing chambers', src: [L1, 16] },
  { k: 'part', id: 'p1_sec_vesicles', l: 'Secretory vesicles', parent: 'p_golgi', w: 1, line: 'vesicles packaging secretory products for transport or exocytosis', src: [L1, 5, 16] },
  { k: 'part', id: 'p1_lysosomes', l: 'Lysosomes', parent: 'p_golgi', w: 1, line: 'vesicles containing digestive enzymes for intracellular removal of damaged organelles or pathogens', src: [L1, 20] },
  { k: 'part', id: 'p1_peroxisomes', l: 'Peroxisomes', parent: 'p_golgi', w: 1, line: 'vesicles containing degradative enzymes that catabolize fats and neutralize toxic compounds', src: [L1, 20] },

  /* ---------------- Protein synthesis (p21-23) ---------------- */
  { k: 'process', id: 'p1_gene_activation', l: 'Gene activation', parent: 'p_protein', w: 1, line: 'uncoiling DNA to use it', next: { p1_transcription: 'initiates transcription' }, own: 'Gene activation involves temporary uncoiling of DNA segments to allow transcription of specific genes.', src: [L1, 21] },
  { k: 'process', id: 'p1_transcription', l: 'Transcription', parent: 'p_protein', w: 1, line: 'copies instructions from DNA to mRNA in the nucleus', next: { p1_translation: 'mRNA travels through nuclear pores to ribosomes' }, src: [L1, 21, 22] },
  { k: 'substance', id: 'p1_rna_polymerase', l: 'RNA polymerase', parent: 'p_protein', w: 1, line: 'enzyme that produces messenger RNA from DNA template', acts: { p1_gene: 'binds promoter on DNA template strand' }, src: [L1, 21, 22] },
  { k: 'process', id: 'p1_translation', l: 'Translation', parent: 'p_protein', w: 1, line: 'ribosome reads mRNA code and assembles amino acids into polypeptide chain', src: [L1, 21] },
  { k: 'substance', id: 'p1_trna', l: 'tRNA', parent: 'p_protein', w: 1, line: 'delivers amino acids to the ribosome during translation', src: [L1, 21] },

  /* ---------------- Cell life cycle (p24-25) ---------------- */
  { k: 'process', id: 'p1_interphase', l: 'Interphase', match: 'interphase', parent: 'p_cycle', w: 1, line: 'nondividing state where cell performs normal functions and duplicates DNA', next: { p1_mitosis: 'enters cell division' }, src: [L1, 24, 25] },
  { k: 'process', id: 'p1_dna_replication', l: 'DNA replication', parent: 'p_cycle', w: 1, line: 'duplicates genetic material exactly before division', src: [L1, 24] },
  { k: 'process', id: 'p1_mitosis', l: 'Mitosis', parent: 'p_cycle', w: 1, line: 'nuclear division dividing duplicated genetic material equally', next: { p1_cytokinesis: 'followed by division of cytoplasm' }, src: [L1, 24, 2, 3] },
  { k: 'process', id: 'p1_cytokinesis', l: 'Cytokinesis', parent: 'p_cycle', w: 1, line: 'divides cytoplasm and organelles into two daughter cells', src: [L1, 24] },

  /* ---------------- Meiosis (p27, 29) ---------------- */
  { k: 'cell', id: 'p1_gametes', l: 'Gametes', match: 'gametes', parent: 'p_meiosis', w: 1, line: 'ova and sperm produced by two cell-division steps in gonads', src: [L1, 27] },

  /* ---------------- Epithelial tissue (p33-36) ---------------- */
  { k: 'part', id: 'p1_squamous_epi', l: 'Squamous epithelia', parent: 'p_epithelial', w: 1, line: 'thin and flat epithelial cells', src: [L1, 34] },
  { k: 'part', id: 'p1_cuboidal_epi', l: 'Cuboidal epithelia', parent: 'p_epithelial', w: 1, line: 'square shaped epithelial cells', src: [L1, 34] },
  { k: 'part', id: 'p1_columnar_epi', l: 'Columnar epithelia', parent: 'p_epithelial', w: 1, line: 'tall, slender rectangular epithelial cells', src: [L1, 34] },
  { k: 'part', id: 'p1_simple_epi', l: 'Simple epithelium', parent: 'p_epithelial', w: 1, line: 'single layer of cells covering basement membrane', src: [L1, 34] },
  { k: 'part', id: 'p1_stratified_epi', l: 'Stratified epithelium', parent: 'p_epithelial', w: 1, line: 'several layers of cells providing physical protection', src: [L1, 34] },
  { k: 'part', id: 'p1_basement_membrane', l: 'Basement membrane', parent: 'p_epithelial', w: 1, line: 'basal lamina attaching epithelial cells to underlying connective tissue', src: [L1, 33] },
  { k: 'part', id: 'p1_endocrine_glands', l: 'Endocrine glands', parent: 'p_epithelial', w: 1, line: 'ductless glands releasing hormones directly into interstitial fluid', src: [L1, 36] },
  { k: 'part', id: 'p1_exocrine_glands', l: 'Exocrine glands', parent: 'p_epithelial', w: 1, line: 'produce secretions onto epithelial surfaces through ducts', src: [L1, 36] },

  /* ---------------- Connective tissue (p37-50) ---------------- */
  { k: 'part', id: 'p1_matrix', l: 'Matrix', match: 'matrix', parent: 'p_connective', w: 1, line: 'extracellular fibers and fluid ground substance making up majority of tissue volume', src: [L1, 37] },
  { k: 'group', id: 'p1_ct_proper', l: 'Connective tissue proper', parent: 'p_connective', w: 1, line: 'connect and protect; loose and dense connective tissues', src: [L1, 39, 40] },
  { k: 'part', id: 'p1_loose_ct', l: 'Loose connective tissue', parent: 'p1_ct_proper', w: 1, line: 'more ground substance, fewer fibers, such as areolar and adipose tissue', src: [L1, 40] },
  { k: 'part', id: 'p1_dense_ct', l: 'Dense connective tissue', parent: 'p1_ct_proper', w: 1, line: 'more fibers, less ground substance, such as tendons', src: [L1, 40] },
  { k: 'group', id: 'p1_fluid_ct', l: 'Fluid connective tissues', parent: 'p_connective', w: 1, line: 'blood and lymph with watery matrix and specialized cells', src: [L1, 39, 43] },
  { k: 'part', id: 'p1_blood', l: 'Blood', parent: 'p1_fluid_ct', w: 1, line: 'fluid connective tissue carrying formed elements in liquid matrix', src: [L1, 43, 44, 45] },
  { k: 'cell', id: 'p1_rbc', l: 'Red blood cells', parent: 'p1_blood', w: 1, line: 'transport oxygen and carbon dioxide in the blood', src: [L1, 43, 44] },
  { k: 'cell', id: 'p1_wbc', l: 'White blood cells', parent: 'p1_blood', w: 1, line: 'defend the body from infection and disease', src: [L1, 43, 45] },
  { k: 'cell', id: 'p1_platelets', l: 'Platelets', parent: 'p1_blood', w: 1, line: 'membrane-enclosed packets of cytoplasm that function in blood clotting', src: [L1, 43, 44] },
  { k: 'part', id: 'p1_lymph', l: 'Lymph', parent: 'p1_fluid_ct', w: 1, line: 'extracellular fluid collected from interstitial space and returned to venous system', src: [L1, 43, 46] },
  { k: 'group', id: 'p1_supporting_ct', l: 'Supporting connective tissues', parent: 'p_connective', w: 1, line: 'cartilage and bone providing structural strength and weight support', src: [L1, 39, 47] },
  { k: 'part', id: 'p1_cartilage', l: 'Cartilage', parent: 'p1_supporting_ct', w: 1, line: 'gel-type ground substance for shock absorption and protection', src: [L1, 47, 48] },
  { k: 'part', id: 'p1_bone_tissue', l: 'Osseous tissue', match: 'Osseous Tissue', parent: 'p1_supporting_ct', w: 1, line: 'strong calcified matrix resisting shattering via flexible collagen fibers', src: [L1, 49] },
  { k: 'cell', id: 'p1_osteocytes', l: 'Osteocytes', parent: 'p1_bone_tissue', w: 1, line: 'bone cells arranged around central canals within lacunae', src: [L1, 49] },
  { k: 'part', id: 'p1_canaliculi', l: 'Canaliculi', parent: 'p1_bone_tissue', w: 1, line: 'small channels through matrix accessing blood supply', src: [L1, 49] },
  { k: 'part', id: 'p1_periosteum', l: 'Periosteum', parent: 'p1_bone_tissue', w: 1, line: 'outer covering of bone with fibrous and cellular layers', src: [L1, 49] },

  /* ---------------- Muscle tissue (p51-52) ---------------- */
  { k: 'part', id: 'p1_skel_muscle_t', l: 'Skeletal muscle tissue', parent: 'p_muscle_t', w: 1, line: 'large body muscles responsible for movement', src: [L1, 51] },
  { k: 'part', id: 'p1_cardiac_muscle_t', l: 'Cardiac muscle tissue', parent: 'p_muscle_t', w: 1, line: 'found only in the heart', own: 'Cardiac muscle tissue consists of interconnected branching muscle cells dedicated to pumping blood.', src: [L1, 51] },
  { k: 'part', id: 'p1_smooth_muscle_t', l: 'Smooth muscle tissue', parent: 'p_muscle_t', w: 1, line: 'found in walls of hollow contracting organs', src: [L1, 51] },

  /* ---------------- Neural tissue (p53-55) ---------------- */
  { k: 'cell', id: 'p1_neurons', l: 'Neurons', parent: 'p_neural_t', w: 1, line: 'nerve cells specialized for electrical communication', src: [L1, 54] },
  { k: 'part', id: 'p1_cell_body', l: 'Cell body', parent: 'p1_neurons', w: 1, line: 'contains the nucleus and major organelles', src: [L1, 54] },
  { k: 'part', id: 'p1_dendrites', l: 'Dendrites', parent: 'p1_neurons', w: 1, line: 'short branches extending from cell body that receive incoming signals', src: [L1, 54] },
  { k: 'part', id: 'p1_axon', l: 'Axon', parent: 'p1_neurons', w: 1, line: 'long thin extension that carries outgoing electrical signals', src: [L1, 54] },
  { k: 'cell', id: 'p1_neuroglia', l: 'Neuroglia', parent: 'p_neural_t', w: 1, line: 'supporting cells that maintain structure, repair, and nourish neurons', src: [L1, 54] },

  /* ---------------- Organs and systems (p56) ---------------- */
  { k: 'part', id: 'p1_organ_def', l: 'Organ', match: 'organ is composed of', parent: 'p_organs', w: 1, line: 'composed of two or more tissues that serve different functions', src: [L1, 56] },
  { k: 'part', id: 'p1_skin', l: 'Skin', match: 'skin is the largest organ', parent: 'p_organs', w: 1, line: 'largest organ in the body, containing all four primary tissues', src: [L1, 56] },

  /* ---------------- Homeostasis (p57-58) ---------------- */
  { k: 'process', id: 'p1_autoregulation', l: 'Autoregulation', parent: 'p_homeostasis', w: 1, line: 'automatic intrinsic response in a cell, tissue, or organ to environmental change', src: [L1, 58] },
  { k: 'process', id: 'p1_extrinsic_reg', l: 'Extrinsic regulation', parent: 'p_homeostasis', w: 1, line: 'responses controlled by nervous and endocrine systems', src: [L1, 58] },
  { k: 'part', id: 'p1_homeo_receptor', l: 'Receptor', parent: 'p_homeostasis', w: 1, line: 'sensor that receives the stimulus and detects environmental change', links: { p1_homeo_control: 'sends information to control center' }, src: [L1, 58] },
  { k: 'part', id: 'p1_homeo_control', l: 'Control Center', parent: 'p_homeostasis', w: 1, line: 'processes the signal and sends instructions', links: { p1_homeo_effector: 'sends commands to effector' }, src: [L1, 58] },
  { k: 'part', id: 'p1_homeo_effector', l: 'Effector', parent: 'p_homeostasis', w: 1, line: 'carries out instructions to restore homeostatic balance', src: [L1, 58] },

  /* ---------------- Negative and positive feedback (p59-61) ---------------- */
  { k: 'process', id: 'p1_neg_feedback', l: 'Negative feedback', match: 'negative feedback', parent: 'p_feedback', w: 1, line: 'effector response negates stimulus to bring body back into homeostasis', src: [L1, 59] },
  { k: 'process', id: 'p1_temp_stimulus', l: 'Body temperature rises', parent: 'p1_neg_feedback', w: 1, line: 'stimulus disturbing normal body temperature', next: { p1_temp_sensors: 'activates temperature sensors' }, src: [L1, 60] },
  { k: 'process', id: 'p1_temp_sensors', l: 'Temperature sensors', match: 'sensors in skin', parent: 'p1_neg_feedback', w: 1, line: 'sensors in skin and hypothalamus that detect temperature rise', next: { p1_thermoreg_center: 'information affects control center' }, src: [L1, 60] },
  { k: 'process', id: 'p1_thermoreg_center', l: 'Thermoregulatory center', parent: 'p1_neg_feedback', w: 1, line: 'hypothalamus functions as thermostat with thirty-seven degrees set point', next: { p1_temp_effectors: 'sends commands to effectors' }, own: 'The thermoregulatory center in the hypothalamus processes temperature input and regulates heat loss mechanisms.', src: [L1, 60] },
  { k: 'process', id: 'p1_temp_effectors', l: 'Sweat glands and blood vessels', match: 'Sweat glands', parent: 'p1_neg_feedback', w: 1, line: 'sweat glands increase secretion and skin blood vessels dilate', next: { p1_temp_response: 'causes increased heat loss' }, src: [L1, 60] },
  { k: 'process', id: 'p1_temp_response', l: 'Increased heat loss', parent: 'p1_neg_feedback', w: 1, line: 'increased heat loss drops body temperature back to normal', next: { p1_neg_feedback: 'negative feedback restores normal temperature' }, src: [L1, 60] },
  { k: 'process', id: 'p1_pos_feedback', l: 'Positive feedback', match: 'positive feedback', parent: 'p_feedback', w: 1, line: 'effector response increases change of stimulus to speed up processes', src: [L1, 59] },
  { k: 'process', id: 'p1_clot_vessel_damage', l: 'Vessel damage', match: 'Damaged cells in the blood', parent: 'p1_pos_feedback', w: 1, line: 'damaged cells in blood vessel wall release chemicals', next: { p1_clot_chemicals: 'chemicals start chain reactions' }, src: [L1, 61] },
  { k: 'process', id: 'p1_clot_chemicals', l: 'Clotting chemicals release', match: 'the chemicals start chain', parent: 'p1_pos_feedback', w: 1, line: 'each step releases chemicals that further accelerate clotting', next: { p1_blood_clot: 'escalating process forms blood clot' }, src: [L1, 61] },
  { k: 'process', id: 'p1_blood_clot', l: 'Blood clot formation', match: 'formation of a blood clot', parent: 'p1_pos_feedback', w: 1, line: 'patches the vessel wall and stops the bleeding', src: [L1, 61] },
];
