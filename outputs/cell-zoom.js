/*
 * Cell zoom — the levels, their labels and the two stage sliders: the data and nothing else.
 *
 * The Viewer's "Cell" mode (studio/cell-zoom.js) walks ABCT2326 Lecture 1 from a typical cell into its nucleus,
 * through "The Organization of DNA within the Nucleus" (p14) down to one nucleosome (p12), and across to the cell
 * life cycle (p24) and meiosis (p27; Lecture 6 p5). The nucleosome is the Protein Data Bank's human nucleosome
 * (cell/nucleosome-3afa.js); everything else is procedural (cell/zoom-scene.js).
 *
 * Every title, label, stage name and note shown is a term or phrase the course sources use, and `cite` says where:
 * work/cell-zoom-check.mjs holds each `match`, each label's name and each note against the committed page text
 * (work/source-text.json), the comparison revision-check uses. A note is the source's own words, cut, never
 * rephrased. `revise` names the Revise boxes a label or stage is ([subject, box id]); the check holds each to a
 * real box. Four mitosis stages are named only in the Lecture 1 tutorial's questions (prophase, metaphase,
 * telophase) and its answer sheet (anaphase), so those are what they cite. No teaching prose.
 */

const L1 = 'phys.1.2026';     /* ABCT2326 Lecture 1 Cells and Body Organization, 2026 */
const L6 = 'phys.l6.2026';    /* ABCT2326 Lecture 6 Reproduction, 2026 */
const CT = 'phys.cells.tut';  /* ABCT2326 Lecture 1 tutorial (questions and model answers) */
const TA = 'phys.tut';        /* ABCT2326 Lecture 1 tutorial answer sheet */
const L7 = 'phys.l7.2026';    /* ABCT2326 Lecture 7 Endocrine System, 2026 */
const L2 = 'phys.l2.2026';    /* ABCT2326 Lecture 2 Cardiovascular System, 2026 */
const L3 = 'phys.l3.2026';    /* ABCT2326 Lecture 3 Respiratory System, 2026 */
const L4 = 'phys.l4.2026';    /* ABCT2326 Lecture 4 Digestive System, 2026 */
const L8 = 'phys.l8.2026';    /* ABCT2326 Lecture 8 Nervous System, 2026 */
const L10 = 'phys.10.2026';   /* ABCT2326 Lecture 10 Immune System, 2026 */
const N5 = 'hss.l5.2026';     /* HSS2011 W5 Nervous system I, 2026 */
const HM = 'phys.hormech';    /* ABCT2326 Hormone Mechanism handout (older): a fallback, see FALLBACK below */

/* Short names for the cite line; the registry (study/course-data.js) has the files. */
export const CELL_SOURCES = {
  [L1]: 'ABCT2326 Lecture 1 Cells',
  [L6]: 'ABCT2326 Reproduction',
  [CT]: 'ABCT2326 Cells tutorial',
  [TA]: 'ABCT2326 Tutorial answers',
  [L7]: 'ABCT2326 Endocrine',
  [HM]: 'ABCT2326 Hormone Mechanism handout',
  [L2]: 'ABCT2326 Cardiovascular',
  [L3]: 'ABCT2326 Respiratory',
  [L4]: 'ABCT2326 Digestive',
  [L8]: 'ABCT2326 Nervous system',
  [L10]: 'ABCT2326 Immune',
  [N5]: 'HSS2011 W5 Nervous system I',
};

/*
 * Sources older than 2026 used here, and why: CLAUDE.md's precedence puts the 2026 decks first and the older PolyU
 * material as fallback. The 2026 Endocrine deck stops cAMP at "phosphorylates enzymes" (p17); only the handout says
 * how it reaches a gene, and names the DNA a nuclear receptor binds. The check refuses any other older source.
 */
export const FALLBACK = {
  [HM]: 'The 2026 Endocrine slides do not say how cAMP reaches the gene (CREB) or what DNA a nuclear hormone receptor binds (hormone response element); this ABCT2326 handout does.',
};

/*
 * Levels. `next` is the level "Zoom in" goes to; `side` a second way on (the life cycle from the cell, meiosis from
 * the life cycle); `back` where Zoom out goes from a side level. `slider` names the stage slider a level carries.
 */
export const LEVELS = [
  { id: 'cell', title: 'A Typical Cell', cite: [{ ref: L1, page: 5, match: 'A Typical Cell' }], next: 'nucleus', side: ['membrane', 'cycle'] },
  { id: 'nucleus', title: 'Cell Nucleus', note: 'Largest organelle; The cell’s control center', cite: [{ ref: L1, page: 12, match: 'Largest organelle; The cell’s control center' }], next: 'dna', side: 'expression' },
  { id: 'dna', title: 'The Organization of DNA within the Nucleus', cite: [{ ref: L1, page: 14, match: 'The Organization of DNA within the Nucleus' }], next: 'nucleosome', slider: 'condense' },
  { id: 'nucleosome', title: 'Nucleosomes', note: 'DNA coiled around histones', cite: [{ ref: L1, page: 12, match: 'Nucleosomes • DNA coiled around histones' }] },
  { id: 'cycle', title: 'Cell Life Cycle', note: 'Most of a cell’s life is spent in a nondividing state (interphase)', cite: [{ ref: L1, page: 24, match: 'Most of a cell’s life is spent in a nondividing state (interphase)' }], back: 'cell', side: 'meiosis', slider: 'mitosis' },
  { id: 'expression', title: 'Protein synthesis (including gene expression)', note: 'These two steps can be called gene expression', cite: [{ ref: L1, page: 3, match: 'Protein synthesis (including gene expression)' }, { ref: CT, page: 1, match: 'These two steps can be called gene expression' }], back: 'nucleus', slider: 'expression' },
  { id: 'meiosis', title: 'Meiosis', note: 'Process by which two cell-division steps produce gametes (ova and sperm)', cite: [{ ref: L1, page: 27, match: 'Process by which two cell-division steps produce gametes (ova and sperm)' }], back: 'cycle', side: 'sperm', slider: 'meiosis' },
  { id: 'membrane', title: 'The Plasma Membrane', cite: [{ ref: L1, page: 9, match: 'The Plasma Membrane.' }], back: 'cell' },
  { id: 'epithelium', title: 'Characteristics of Epithelia', cite: [{ ref: L1, page: 33, match: 'Characteristics of Epithelia' }], back: 'cell' },
  { id: 'blood', title: 'Composition of Blood', note: 'Red blood cells (RBCs) comprise most of formed elements', cite: [{ ref: L2, page: 5, match: 'Composition of Blood' }, { ref: L2, page: 5, match: 'Red blood cells (RBCs) comprise most of formed elements' }], back: 'cell' },
  { id: 'alveolus', title: 'Alveolar epithelium', note: 'Consists of simple squamous epithelium', cite: [{ ref: L3, page: 10, match: 'Alveolar epithelium – Consists of simple squamous epithelium' }], back: 'cell' },
  { id: 'parietal', title: 'Parietal cell', note: 'Secrete intrinsic factor and hydrochloric acid (HCl)', cite: [{ ref: L4, page: 29, match: 'Parietal cell' }, { ref: L4, page: 26, match: 'Parietal Cells • Secrete intrinsic factor and hydrochloric acid (HCl)' }], back: 'cell', slider: 'parietal' },
  { id: 'sperm', title: 'Spermatozoon', note: 'Mature sperm lacks: ER, Golgi, lysosomes, other intracellular structures', cite: [{ ref: L6, page: 8, match: 'Spermatozoon' }, { ref: L6, page: 8, match: 'Mature sperm lacks: ER, Golgi, lysosomes, other intracellular structures' }], back: 'meiosis' },
  { id: 'neuron', title: 'Neuron: structure', cite: [{ ref: N5, page: 11, match: 'Neuron: structure' }, { ref: L8, page: 12, match: 'The Anatomy of a Multipolar Neuron' }], back: 'cell' },
  { id: 'nk', title: 'Immunological Surveillance', note: 'Is carried out by natural killer (NK) cells', cite: [{ ref: L10, page: 22, match: 'Immunological Surveillance • Is carried out by natural killer (NK) cells' }], back: 'cell', slider: 'nk' },
  { id: 'apc', title: 'Phagocytic antigen-presenting cell', cite: [{ ref: L10, page: 59, match: 'Phagocytic antigen-presenting cell' }], back: 'cell', slider: 'apc' },
];

/*
 * Labels, by level. `part` is the procedural piece the label points at (cell/zoom-scene.js builds one per part,
 * and the check holds the two together); a label's id is its part. `note` is optional and must be on a cited page.
 */
const MEMBRANE = { l: 'Plasma membrane', note: 'The plasma membrane separates the living cell from its surroundings', cite: [{ ref: L1, page: 8, match: 'The plasma membrane separates the living cell from its surroundings' }], revise: [['ABCT2326', 'p_membrane']] };
const ENVELOPE = { l: 'Nuclear envelope', note: 'Double membrane around the nucleus', cite: [{ ref: L1, page: 12, match: 'Nuclear envelope • Double membrane around the nucleus' }], revise: [['ABCT2326', 'p1_nuclear_envelope']] };
const PORES = { l: 'Nuclear pores', note: 'Communication passages', cite: [{ ref: L1, page: 12, match: 'Nuclear pores • Communication passages' }], revise: [['ABCT2326', 'p1_nuclear_pores']] };
const NUCLEOLUS = { l: 'Nucleolus', note: 'Synthesize rRNA and ribosomal subunits', cite: [{ ref: L1, page: 13, match: 'Nucleolus' }, { ref: L1, page: 12, match: 'Synthesize rRNA and ribosomal subunits' }], revise: [['ABCT2326', 'p1_nucleolus']] };
const CENTRIOLES = { l: 'Centrioles', note: 'Cytoplasm contains two centrioles at right angles', cite: [{ ref: L1, page: 5, match: 'Cytoplasm contains two centrioles at right angles' }], revise: [['ABCT2326', 'p1_centrioles']] };
const SISTERS = { l: 'Sister chromatids', cite: [{ ref: L1, page: 14, match: 'Sister chromatids' }] };

export const LABELS = {
  cell: [
    { id: 'membrane', ...MEMBRANE },
    { id: 'cytoplasm', l: 'Cytoplasm', note: 'All materials inside the cell and outside the nucleus', cite: [{ ref: L1, page: 8, match: 'Cytoplasm – All materials inside the cell and outside the nucleus' }], revise: [['ABCT2326', 'p1_cytoplasm']] },
    { id: 'nucleus', l: 'Nucleus', note: 'Largest organelle; The cell’s control center', cite: [{ ref: L1, page: 5, match: 'NUCLEUS' }, { ref: L1, page: 12, match: 'Largest organelle; The cell’s control center' }], revise: [['ABCT2326', 'p_nucleus']] },
    { id: 'envelope', ...ENVELOPE },
    { id: 'pores', ...PORES },
    { id: 'nucleolus', ...NUCLEOLUS },
    { id: 'ribosomes', l: 'Free ribosomes', cite: [{ ref: L1, page: 6, match: 'Free ribosomes' }, { ref: L1, page: 20, match: 'Free ribosomes' }], revise: [['ABCT2326', 'p1_freeribosomes']] },
    { id: 'rer', l: 'Rough ER', note: 'Ribosome (on Rough ER) reads code from mRNA', cite: [{ ref: L1, page: 16, match: 'Rough ER' }, { ref: L1, page: 21, match: 'Ribosome (on Rough ER) reads code from mRNA' }], revise: [['ABCT2326', 'p1_rough_er'], ['ABCT2326', 'p_er']] },
    { id: 'ser', l: 'Smooth ER', cite: [{ ref: L1, page: 16, match: 'Smooth ER' }], revise: [['ABCT2326', 'p1_smooth_er'], ['ABCT2326', 'p_er']] },
    { id: 'golgi', l: 'Golgi apparatus', note: 'Stacks of flattened membranes (cisternae) containing chambers', cite: [{ ref: L1, page: 16, match: 'Golgi apparatus Stacks of flattened membranes (cisternae) containing chambers' }], revise: [['ABCT2326', 'p_golgi'], ['ABCT2326', 'p1_cisternae']] },
    { id: 'vesicles', l: 'Secretory vesicles', cite: [{ ref: L1, page: 5, match: 'Secretory vesicles' }], revise: [['ABCT2326', 'p1_sec_vesicles']] },
    { id: 'mito', l: 'Mitochondria', note: 'Produce 95% of the ATP required by the cell', cite: [{ ref: L1, page: 16, match: 'Produce 95% of the ATP required by the cell' }, { ref: L1, page: 16, match: 'Mitochondria' }], revise: [['ABCT2326', 'p1_mitochondria']] },
    { id: 'lyso', l: 'Lysosomes', note: 'Vesicles containing digestive enzymes', cite: [{ ref: L1, page: 20, match: 'Lysosomes Vesicles containing digestive enzymes' }], revise: [['ABCT2326', 'p1_lysosomes']] },
    { id: 'peroxisomes', l: 'Peroxisomes', note: 'Vesicles containing degradative enzymes', cite: [{ ref: L1, page: 20, match: 'Peroxisomes Vesicles containing degradative enzymes' }], revise: [['ABCT2326', 'p1_peroxisomes']] },
    { id: 'centrosome', l: 'Centrosome', cite: [{ ref: L1, page: 5, match: 'Centrosome and Centrioles' }], revise: [['ABCT2326', 'p1_centrosome']] },
    { id: 'centrioles', l: 'Centrioles', note: 'each centriole is composed of 9 microtubule triplets in a 9 + 0 array', cite: [{ ref: L1, page: 5, match: 'each centriole is composed of 9 microtubule triplets in a 9 + 0 array' }], revise: [['ABCT2326', 'p1_centrioles']] },
    { id: 'microtubules', l: 'Microtubules', cite: [{ ref: L1, page: 6, match: 'Microtubule' }, { ref: L1, page: 11, match: 'containing microtubules' }], revise: [['ABCT2326', 'p1_microtubules'], ['ABCT2326', 'p1_cytoskeleton']] },
  ],
  nucleus: [
    { id: 'envelope', ...ENVELOPE },
    { id: 'pores', ...PORES },
    { id: 'nucleoplasm', l: 'Nucleoplasm', note: 'Fluid containing ions, enzymes, nucleotides, and some RNA', cite: [{ ref: L1, page: 12, match: 'Nucleoplasm • Fluid containing ions, enzymes, nucleotides, and some RNA' }], revise: [['ABCT2326', 'p1_nucleoplasm']] },
    { id: 'nucleolus', ...NUCLEOLUS },
    { id: 'chromatin', l: 'Chromatin', cite: [{ ref: L1, page: 13, match: 'Chromatin' }, { ref: L1, page: 14, match: 'Chromatin in nucleus' }], revise: [['ABCT2326', 'p1_chromatin']] },
  ],
  dna: [
    { id: 'nucleosome', l: 'Nucleosome', note: 'DNA coiled around histones', cite: [{ ref: L1, page: 14, match: 'Nucleosome' }, { ref: L1, page: 12, match: 'DNA coiled around histones' }], revise: [['ABCT2326', 'p1_nucleosomes']] },
    { id: 'chromatin', l: 'Chromatin', cite: [{ ref: L1, page: 14, match: 'Chromatin in nucleus' }], revise: [['ABCT2326', 'p1_chromatin']] },
    { id: 'supercoiled', l: 'Supercoiled region', cite: [{ ref: L1, page: 14, match: 'Supercoiled region' }] },
    { id: 'chromosome', l: 'Visible chromosome', cite: [{ ref: L1, page: 14, match: 'Visible chromosome' }] },
    { id: 'sisters', ...SISTERS },
    { id: 'centromere', l: 'Centromere', cite: [{ ref: L1, page: 14, match: 'Centromere' }] },
    { id: 'kinetochore', l: 'Kinetochore', cite: [{ ref: L1, page: 14, match: 'Kinetochore' }] },
  ],
  nucleosome: [
    { id: 'histones', l: 'Histones', note: 'DNA coiled around histones', cite: [{ ref: L1, page: 14, match: 'Histones' }, { ref: L1, page: 12, match: 'DNA coiled around histones' }], revise: [['ABCT2326', 'p1_histones']] },
    { id: 'dna', l: 'DNA', note: 'All information to build and run organisms', cite: [{ ref: L1, page: 12, match: 'DNA • All information to build and run organisms' }], revise: [['ABCT2326', 'p1_dna']] },
    { id: 'helix', l: 'DNA double helix', cite: [{ ref: L1, page: 14, match: 'DNA double helix' }], revise: [['ABCT2326', 'p1_dna']] },
    { id: 'bases', l: 'Sequence of bases (A, T, C, G)', note: '3 bases (a codon) = 1 amino acid', cite: [{ ref: L1, page: 15, match: 'Sequence of bases (A, T, C, G) • Triplet code – 3 bases (a codon) = 1 amino acid' }], revise: [['ABCT2326', 'p1_genetic_code']] },
    { id: 'gene', l: 'Gene', note: 'A gene is a length of DNA that codes for a specific protein', cite: [{ ref: CT, page: 1, match: 'A gene is a length of DNA that codes for a specific protein' }, { ref: L1, page: 15, match: 'Gene • DNA instructions for one protein' }], revise: [['ABCT2326', 'p1_gene']] },
    { id: 'nucleosome', l: 'Nucleosome', cite: [{ ref: L1, page: 14, match: 'Nucleosome' }], revise: [['ABCT2326', 'p1_nucleosomes']] },
  ],
  cycle: [
    { id: 'membrane', ...MEMBRANE },
    { id: 'envelope', ...ENVELOPE },
    { id: 'chromatin', l: 'Chromatin', cite: [{ ref: L1, page: 14, match: 'Chromatin in nucleus' }], revise: [['ABCT2326', 'p1_chromatin']] },
    { id: 'sisters', ...SISTERS },
    { id: 'centromere', l: 'Centromere', cite: [{ ref: L1, page: 14, match: 'Centromere' }] },
    { id: 'kinetochore', l: 'Kinetochore', cite: [{ ref: L1, page: 14, match: 'Kinetochore' }] },
    { id: 'centrioles', ...CENTRIOLES },
    { id: 'spindle', l: 'Mitotic spindle', cite: [{ ref: CT, page: 3, match: 'form the mitotic spindle' }, { ref: TA, page: 6, match: 'form the mitotic spindle' }], revise: [['ABCT2326', 'p1_centrioles']] },
    { id: 'daughters', l: 'Daughter cells', note: 'Cytokinesis divides cytoplasm and organelles into two daughter cells', cite: [{ ref: L1, page: 24, match: 'Cytokinesis divides cytoplasm and organelles into two daughter cells' }], revise: [['ABCT2326', 'p1_cytokinesis']] },
  ],
  expression: [
    { id: 'gene', l: 'Gene', note: 'DNA instructions for one protein', cite: [{ ref: L1, page: 15, match: 'Gene • DNA instructions for one protein' }, { ref: CT, page: 1, match: 'A gene is a length of DNA that codes for a specific protein' }], revise: [['ABCT2326', 'p1_gene']] },
    { id: 'promoter', l: 'Promoter', note: 'RNA polymerase binds to “promoter” region on template strand', cite: [{ ref: L1, page: 21, match: 'RNA polymerase binds to “promoter” region on template strand' }, { ref: L1, page: 22, match: 'Promoter' }], revise: [['ABCT2326', 'p1_rna_polymerase']] },
    { id: 'polymerase', l: 'RNA polymerase', note: 'RNA polymerase produces messenger RNA (mRNA)', cite: [{ ref: L1, page: 21, match: 'RNA polymerase produces messenger RNA (mRNA)' }], revise: [['ABCT2326', 'p1_rna_polymerase']] },
    { id: 'mrna', l: 'Messenger RNA (mRNA)', note: 'mRNA leaves nucleus to cytoplasm through nuclear pores', cite: [{ ref: L1, page: 21, match: 'messenger RNA (mRNA)' }, { ref: L1, page: 21, match: 'mRNA leaves nucleus to cytoplasm through nuclear pores' }], revise: [['ABCT2326', 'p1_mrna']] },
    { id: 'envelope', ...ENVELOPE },
    { id: 'pores', ...PORES },
    { id: 'ribosome', l: 'Ribosome', note: 'Ribosome (on Rough ER) reads code from mRNA (in cytoplasm)', cite: [{ ref: L1, page: 21, match: 'Ribosome (on Rough ER) reads code from mRNA (in cytoplasm)' }], revise: [['ABCT2326', 'p1_translation']] },
    { id: 'rer', l: 'Rough ER', cite: [{ ref: L1, page: 21, match: 'Ribosome (on Rough ER)' }, { ref: L1, page: 16, match: 'Rough ER' }], revise: [['ABCT2326', 'p1_rough_er']] },
    { id: 'trna', l: 'tRNA', note: 'Assembles amino acids into polypeptide chain with help of tRNA', cite: [{ ref: L1, page: 21, match: 'Assembles amino acids into polypeptide chain with help of tRNA' }], revise: [['ABCT2326', 'p1_trna']] },
    { id: 'chain', l: 'Polypeptide chain', cite: [{ ref: L1, page: 21, match: 'polypeptide chain' }], revise: [['ABCT2326', 'p1_translation']] },
    { id: 'membrane', ...MEMBRANE },
    { id: 'lipo', l: 'Lipophilic hormones', note: 'Their target is the nucleus where they affect transcription', cite: [{ ref: L7, page: 13, match: "Lipophilic hormones (or hydrophobic hormones) have receptors in target's cytoplasm and/or nucleus, because they can diffuse thru plasma membrane" }, { ref: L7, page: 13, match: 'Their target is the nucleus where they affect transcription' }], revise: [['ABCT2326', 'p8_lipophilic_hormones'], ['ABCT2326', 'p8_genomic_action']] },
    { id: 'carrier', l: 'Carrier proteins', note: 'travel in blood attached to carrier proteins', cite: [{ ref: L7, page: 14, match: 'travel in blood attached to carrier proteins' }], revise: [['ABCT2326', 'p8_carrier_proteins']] },
    { id: 'nreceptor', l: 'Nuclear hormone receptors', note: 'serve as transcription factors when bound to hormone ligands', cite: [{ ref: L7, page: 14, match: 'Receptors are called nuclear hormone receptors' }, { ref: L7, page: 15, match: 'serve as transcription factors when bound to hormone ligands' }], revise: [['ABCT2326', 'p8_nuclear_receptors']] },
    { id: 'hre', l: 'Hormone response element', note: 'This is a short piece of DNA composed of nucleotide bases', cite: [{ ref: HM, page: 9, match: 'the specific region of the DNA called the ‘hormone response element’' }, { ref: HM, page: 9, match: 'This is a short piece of DNA composed of nucleotide bases' }] },
    { id: 'hydro', l: 'Hydrophilic hormones', note: 'Receptors for hydrophilic hormones are on surface of target cell', cite: [{ ref: L7, page: 13, match: 'Receptors for hydrophilic hormones are on surface of target cell' }], revise: [['ABCT2326', 'p8_hydrophilic_hormones']] },
    { id: 'gpcr', l: 'G-protein coupled receptor', note: 'Hormone binds to receptor causing dissociation of a G-protein subunit', cite: [{ ref: L7, page: 17, match: 'G-protein coupled receptor' }, { ref: L7, page: 17, match: 'Hormone binds to receptor causing dissociation of a G-protein subunit' }], revise: [['ABCT2326', 'p8_gpcr'], ['ABCT2326', 'p8_gpcr_dissoc']] },
    { id: 'gprotein', l: 'G-protein subunit', note: 'G-protein subunit binds to and activates adenylate cyclase', cite: [{ ref: L7, page: 17, match: 'G-protein subunit binds to and activates adenylate cyclase' }], revise: [['ABCT2326', 'p8_ac_activation']] },
    { id: 'ac', l: 'Adenylate cyclase', note: 'Which converts ATP into cAMP', cite: [{ ref: L7, page: 17, match: 'G-protein subunit binds to and activates adenylate cyclase' }, { ref: L7, page: 17, match: 'Which converts ATP into cAMP' }], revise: [['ABCT2326', 'p8_adenylate_cyclase'], ['ABCT2326', 'p8_atp_to_camp']] },
    { id: 'camp', l: 'cAMP', note: 'cAMP activating protein kinase', cite: [{ ref: L7, page: 17, match: 'cAMP activating protein kinase' }], revise: [['ABCT2326', 'p8_camp'], ['ABCT2326', 'p8_pka_activation']] },
    { id: 'kinase', l: 'Protein kinase', note: 'Which phosphorylates enzymes that produce hormone’s effects', cite: [{ ref: L7, page: 17, match: 'cAMP activating protein kinase' }, { ref: L7, page: 17, match: 'Which phosphorylates enzymes that produce hormone’s effects' }], revise: [['ABCT2326', 'p8_pka_activation']] },
    { id: 'creb', l: 'CREB', note: 'CREB turns on gene transcription', cite: [{ ref: HM, page: 4, match: 'CREB turns on gene transcription' }] },
  ],
  membrane: [
    { id: 'ecf', l: 'Extracellular fluid', note: 'A watery medium that surrounds a cell', cite: [{ ref: L1, page: 9, match: 'EXTRACELLULAR FLUID' }, { ref: L1, page: 8, match: 'A watery medium that surrounds a cell' }], revise: [['ABCT2326', 'p1_ecf']] },
    { id: 'bilayer', l: 'Phospholipid bilayer', note: 'Barrier to ions and water', cite: [{ ref: L1, page: 7, match: 'Phospholipid bilayer' }, { ref: L1, page: 7, match: 'Barrier to ions and water' }], revise: [['ABCT2326', 'p1_phospholipid_bilayer']] },
    { id: 'heads', l: 'Hydrophilic heads', note: 'toward watery environment, both sides', cite: [{ ref: L1, page: 7, match: 'Hydrophilic heads — toward watery environment, both sides' }], revise: [['ABCT2326', 'p1_phospholipid_bilayer']] },
    { id: 'tails', l: 'Hydrophobic tails', note: 'inside membrane', cite: [{ ref: L1, page: 9, match: 'Hydrophobic tails' }, { ref: L1, page: 7, match: 'Hydrophobic fatty‐acid tails — inside membrane' }], revise: [['ABCT2326', 'p1_phospholipid_bilayer']] },
    { id: 'cholesterol', l: 'Cholesterol', cite: [{ ref: L1, page: 9, match: 'Cholesterol' }], revise: [['ABCT2326', 'p_membrane']] },
    { id: 'glycolipids', l: 'Glycolipids', cite: [{ ref: L1, page: 9, match: 'Glycolipids' }], revise: [['ABCT2326', 'p1_glycocalyx']] },
    { id: 'integral', l: 'Integral protein', cite: [{ ref: L1, page: 9, match: 'Integral protein' }], revise: [['ABCT2326', 'p1_membrane_proteins']] },
    { id: 'anchoring', l: 'Anchoring proteins', note: 'Attach to inside or outside structures', cite: [{ ref: L1, page: 10, match: 'Anchoring proteins (stabilizers) – Attach to inside or outside structures' }], revise: [['ABCT2326', 'p1_anchoring_proteins']] },
    { id: 'recognition', l: 'Recognition proteins', note: 'Label cells as normal or abnormal', cite: [{ ref: L1, page: 10, match: 'Recognition proteins (identifiers) – Label cells as normal or abnormal' }], revise: [['ABCT2326', 'p1_recognition_proteins']] },
    { id: 'enzymes', l: 'Enzymes', note: 'Catalyze reactions', cite: [{ ref: L1, page: 10, match: 'Enzymes – Catalyze reactions' }], revise: [['ABCT2326', 'p1_mp_enzymes']] },
    { id: 'receptor', l: 'Receptor proteins', note: 'Bind and respond to ligands (ions, hormones)', cite: [{ ref: L1, page: 10, match: 'Receptor proteins – Bind and respond to ligands (ions, hormones)' }], revise: [['ABCT2326', 'p1_receptor_proteins']] },
    { id: 'carrier', l: 'Carrier proteins', note: 'Transport specific solutes through membrane', cite: [{ ref: L1, page: 10, match: 'Carrier proteins – Transport specific solutes through membrane' }], revise: [['ABCT2326', 'p1_carrier_proteins']] },
    { id: 'channels', l: 'Channels', note: 'Regulate water flow and solutes through membrane', cite: [{ ref: L1, page: 10, match: 'Channels – Regulate water flow and solutes through membrane' }], revise: [['ABCT2326', 'p1_membrane_channels']] },
    { id: 'microfilaments', l: 'Microfilaments', cite: [{ ref: L1, page: 9, match: '(Microfilaments)' }, { ref: L1, page: 6, match: 'Microfilament' }], revise: [['ABCT2326', 'p1_microfilaments']] },
    { id: 'cytoplasm', l: 'Cytoplasm', cite: [{ ref: L1, page: 9, match: 'CYTOPLASM' }], revise: [['ABCT2326', 'p1_cytoplasm']] },
  ],
  epithelium: [
    { id: 'cilia', l: 'Cilia', note: 'Motile cilia move materials over cell surfaces', cite: [{ ref: L1, page: 33, match: 'Cilia' }, { ref: L1, page: 11, match: 'Motile cilia move materials over cell surfaces' }], revise: [['ABCT2326', 'p1_cilia']] },
    { id: 'microvilli', l: 'Microvilli', note: 'Increase surface area to facilitate absorption', cite: [{ ref: L1, page: 33, match: 'Microvilli' }, { ref: L1, page: 11, match: 'Increase surface area to facilitate absorption' }], revise: [['ABCT2326', 'p1_microvilli']] },
    { id: 'apical', l: 'Apical surface', cite: [{ ref: L1, page: 33, match: 'Apical surface' }, { ref: L1, page: 33, match: 'Polarity (apical and basal' }] },
    { id: 'basolateral', l: 'Basolateral surfaces', cite: [{ ref: L1, page: 33, match: 'Basolateral surfaces' }] },
    { id: 'junctions', l: 'Cell junctions', note: 'Cellularity (cell junctions)', cite: [{ ref: L1, page: 33, match: 'Cellularity (cell junctions)' }] },
    { id: 'basement', l: 'Basement membrane', cite: [{ ref: L1, page: 33, match: 'Basement membrane' }], revise: [['ABCT2326', 'p1_basement_membrane']] },
    { id: 'golgi', l: 'Golgi apparatus', cite: [{ ref: L1, page: 33, match: 'Golgi apparatus' }], revise: [['ABCT2326', 'p_golgi']] },
    { id: 'nucleus', l: 'Nucleus', cite: [{ ref: L1, page: 33, match: 'Nucleus' }], revise: [['ABCT2326', 'p_nucleus']] },
    { id: 'mito', l: 'Mitochondria', cite: [{ ref: L1, page: 33, match: 'Mitochondria' }], revise: [['ABCT2326', 'p1_mitochondria']] },
  ],
  blood: [
    { id: 'rbc', l: 'Red blood cells (RBCs)', note: ['RBCs are flattened biconcave discs', 'Shape provides increased surface area for diffusion', 'Lack nuclei and mitochondria'], cite: [{ ref: L2, page: 7, match: 'RBCs are flattened biconcave discs' }, { ref: L2, page: 5, match: 'Red blood cells (RBCs)' }], revise: [['ABCT2326', 'p2_rbc'], ['ABCT2326', 'p1_rbc']] },
    { id: 'wbc', l: 'Leukocytes (WBCs)', cite: [{ ref: L2, page: 7, match: 'leukocytes (WBCs)' }], revise: [['ABCT2326', 'p2_wbc'], ['ABCT2326', 'p1_wbc']] },
    { id: 'platelets', l: 'Platelets (thrombocytes)', note: ['Are smallest of formed elements, lack nucleus, are not true cells', 'Are fragments of megakaryocytes from bone marrow'], cite: [{ ref: L2, page: 8, match: 'Platelets (thrombocytes)' }], revise: [['ABCT2326', 'p2_platelets'], ['ABCT2326', 'p1_platelets']] },
    { id: 'plasma', l: 'Plasma', note: 'straw-colored liquid consisting of H2O and dissolved solutes', cite: [{ ref: L2, page: 5, match: 'plasma (fluid part) • straw-colored liquid consisting of H2O and dissolved solutes' }], revise: [['ABCT2326', 'p_plasma']] },
  ],
  alveolus: [
    { id: 'type1', l: 'Type I pneumocytes', note: 'Majority of gas exchange occurs in type I pneumocytes', cite: [{ ref: L3, page: 10, match: 'Majority of gas exchange occurs in type I pneumocytes' }], revise: [['ABCT2326', 'p3_type1_pneumocytes']] },
    { id: 'type2', l: 'Type II pneumocytes', note: 'type II pneumocytes (septal cells) that produce surfactant', cite: [{ ref: L3, page: 10, match: 'type II pneumocytes (septal cells) that produce surfactant' }], revise: [['ABCT2326', 'p3_type2_pneumocytes']] },
    { id: 'surfactant', l: 'Surfactant', note: 'Coats alveolar surfaces and reduces surface tension', cite: [{ ref: L3, page: 13, match: 'Coats alveolar surfaces and reduces surface tension' }, { ref: L3, page: 13, match: 'Surfactant' }], revise: [['ABCT2326', 'p3_surfactant']] },
    { id: 'macrophage', l: 'Alveolar macrophage', note: 'patrolled by alveolar macrophages (dust cells)', cite: [{ ref: L3, page: 12, match: 'Alveolar macrophage' }, { ref: L3, page: 10, match: 'patrolled by alveolar macrophages (dust cells)' }], revise: [['ABCT2326', 'p3_alveolar_macrophages']] },
    { id: 'capillary', l: 'Capillary', cite: [{ ref: L3, page: 12, match: 'Capillary' }] },
    { id: 'endothelial', l: 'Endothelial cell of capillary', cite: [{ ref: L3, page: 12, match: 'Endothelial cell of capillary' }] },
  ],
  parietal: [
    { id: 'ca', l: 'Carbonic anhydrase', cite: [{ ref: L4, page: 29, match: 'carbonic anhydrase converts CO2 and H2O to carbonic acid (H2CO3)' }], revise: [['ABCT2326', 'p4_carbonic_anhydrase']] },
    { id: 'hplus', l: 'Hydrogen ions (H+)', cite: [{ ref: L4, page: 29, match: 'Hydrogen ions (H+) are generated inside a parietal cell' }], revise: [['ABCT2326', 'p4_hcl']] },
    { id: 'hco3', l: 'Bicarbonate ions', cite: [{ ref: L4, page: 29, match: 'ejects the bicarbonate ions into the interstitial fluid' }], revise: [['ABCT2326', 'p4_alkaline_tide']] },
    { id: 'cl', l: 'Chloride ions', cite: [{ ref: L4, page: 29, match: 'imports chloride ions into the cell' }], revise: [['ABCT2326', 'p4_hcl']] },
    { id: 'clchannels', l: 'Chloride channels', cite: [{ ref: L4, page: 29, match: 'open chloride channels' }] },
    { id: 'lumen', l: 'Lumen of gastric gland', cite: [{ ref: L4, page: 29, match: 'Lumen of gastric gland' }] },
    { id: 'isf', l: 'Interstitial fluid', cite: [{ ref: L4, page: 29, match: 'Interstitial fluid' }] },
    { id: 'tide', l: 'Alkaline tide', note: 'Enters bloodstream', cite: [{ ref: L4, page: 29, match: 'Alkaline tide Enters bloodstream' }], revise: [['ABCT2326', 'p4_alkaline_tide']] },
  ],
  sperm: [
    { id: 'head', l: 'Head', cite: [{ ref: L6, page: 8, match: 'Head (5' }], revise: [['ABCT2326', 'p7_sperm_head']] },
    { id: 'acrosome', l: 'Acrosome', cite: [{ ref: L6, page: 8, match: 'Acrosome' }], revise: [['ABCT2326', 'p7_acrosome']] },
    { id: 'nucleus', l: 'Nucleus', cite: [{ ref: L6, page: 8, match: 'Nucleus' }] },
    { id: 'neck', l: 'Neck', cite: [{ ref: L6, page: 8, match: 'Neck (1' }] },
    { id: 'centrioles', l: 'Centrioles', cite: [{ ref: L6, page: 8, match: 'Centrioles' }], revise: [['ABCT2326', 'p1_centrioles']] },
    { id: 'middle', l: 'Middle piece', cite: [{ ref: L6, page: 8, match: 'Middle piece' }], revise: [['ABCT2326', 'p7_middle_piece']] },
    { id: 'spiral', l: 'Mitochondrial spiral', cite: [{ ref: L6, page: 8, match: 'Mitochondrial spiral' }], revise: [['ABCT2326', 'p7_middle_piece']] },
    { id: 'tail', l: 'Tail', cite: [{ ref: L6, page: 8, match: 'Tail (55' }], revise: [['ABCT2326', 'p7_sperm_tail']] },
    { id: 'sheath', l: 'Fibrous sheath of flagellum', cite: [{ ref: L6, page: 8, match: 'Fibrous sheath of flagellum' }], revise: [['ABCT2326', 'p7_sperm_tail']] },
  ],
  neuron: [
    { id: 'body', l: 'Cell body', note: 'Contains the nucleus and nucleolus', cite: [{ ref: N5, page: 11, match: 'Cell body' }, { ref: L1, page: 54, match: 'Cell body • Contains the nucleus and nucleolus' }], revise: [['HSS2011', 'w5_cellbody'], ['ABCT2326', 'p9_cell_body'], ['ABCT2326', 'p1_cell_body']] },
    { id: 'nucleus', l: 'Nucleus', cite: [{ ref: L8, page: 12, match: 'Nucleus' }] },
    { id: 'nucleolus', l: 'Nucleolus', cite: [{ ref: L8, page: 12, match: 'Nucleolus' }] },
    { id: 'nissl', l: 'Nissl bodies', note: 'Nissl bodies (RER and free ribosomes)', cite: [{ ref: L8, page: 12, match: 'Nissl bodies (RER and free ribosomes)' }] },
    { id: 'neurofibrils', l: 'Neurofibrils', note: 'network within soma, maintain shape of neuron', cite: [{ ref: N5, page: 11, match: 'Neurofibrils: network within soma, maintain shape of neuron' }], revise: [['HSS2011', 'w5_neurofibrils']] },
    { id: 'dendrites', l: 'Dendrites', note: 'Receive signals from other cells', cite: [{ ref: N5, page: 11, match: 'Receive signals from other cells' }, { ref: N5, page: 11, match: 'Dendrites' }], revise: [['HSS2011', 'w5_dendrites'], ['ABCT2326', 'p9_dendrites'], ['ABCT2326', 'p1_dendrites']] },
    { id: 'hillock', l: 'Axon hillock', cite: [{ ref: L8, page: 12, match: 'Axon hillock' }] },
    { id: 'axon', l: 'Axon', note: 'Carries outgoing electrical signals to their destination', cite: [{ ref: L1, page: 54, match: 'Carries outgoing electrical signals to their destination' }, { ref: L1, page: 54, match: 'Axon (nerve fiber)' }], revise: [['HSS2011', 'w5_axons'], ['ABCT2326', 'p9_axon'], ['ABCT2326', 'p1_axon']] },
    { id: 'myelin', l: 'Myelin sheath', note: 'Usually enclosed in myelin sheath', cite: [{ ref: N5, page: 11, match: 'Usually enclosed in myelin sheath' }], revise: [['HSS2011', 'w5_myelin'], ['ABCT2326', 'p9_myelin']] },
    { id: 'schwann', l: 'Schwann cells', note: 'These cells wrap around to form the myelin sheath in the PNS', cite: [{ ref: L8, page: 17, match: 'These cells wrap around to form the myelin sheath in the PNS' }, { ref: L8, page: 17, match: 'Schwann cells' }], revise: [['HSS2011', 'w5_schwann'], ['ABCT2326', 'p9_schwann_cells']] },
    { id: 'node', l: 'Node of Ranvier', note: 'Node of Ranvier is left open', cite: [{ ref: L8, page: 17, match: 'Node of Ranvier is left open' }], revise: [['ABCT2326', 'p9_nodes_ranvier']] },
    { id: 'terminals', l: 'Axon terminals', cite: [{ ref: L8, page: 12, match: 'Axon terminals' }] },
  ],
  nk: [
    { id: 'nkcell', l: 'NK cell', cite: [{ ref: L10, page: 23, match: 'NK cell' }, { ref: L10, page: 22, match: 'natural killer (NK) cells' }], revise: [['ABCT2326', 'p12_nk_cells']] },
    { id: 'abnormal', l: 'Abnormal cell', cite: [{ ref: L10, page: 23, match: 'Abnormal cell' }], revise: [['ABCT2326', 'p_surveillance']] },
    { id: 'golgi', l: 'Golgi apparatus', cite: [{ ref: L10, page: 23, match: 'Golgi apparatus' }] },
    { id: 'vesicles', l: 'Perforin vesicles', cite: [{ ref: L10, page: 22, match: 'Golgi apparatus in NK cell forms perforin vesicles' }] },
    { id: 'perforin', l: 'Perforin molecules', cite: [{ ref: L10, page: 24, match: 'Perforin molecules' }], revise: [['ABCT2326', 'p12_perforins']] },
    { id: 'pores', l: 'Pores formed by perforin complex', cite: [{ ref: L10, page: 24, match: 'Pores formed by perforin complex' }], revise: [['ABCT2326', 'p12_perforins']] },
  ],
  apc: [
    { id: 'pathogen', l: 'Pathogens', cite: [{ ref: L10, page: 59, match: 'engulf the extracellular pathogens' }], revise: [['ABCT2326', 'p12_apcs']] },
    { id: 'lysosome', l: 'Lysosome', cite: [{ ref: L10, page: 59, match: 'Lysosome' }, { ref: L10, page: 57, match: 'phagocytic cells engulf and break down pathogens by lysosome' }], revise: [['ABCT2326', 'p1_lysosomes']] },
    { id: 'fragments', l: 'Antigenic fragments', cite: [{ ref: L10, page: 59, match: 'Antigenic fragments' }], revise: [['ABCT2326', 'p12_apcs']] },
    { id: 'er', l: 'Endoplasmic reticulum', cite: [{ ref: L10, page: 59, match: 'Endoplasmic reticulum' }], revise: [['ABCT2326', 'p_er']] },
    { id: 'mhc', l: 'Class II MHC proteins', cite: [{ ref: L10, page: 59, match: 'Class II MHC proteins' }], revise: [['ABCT2326', 'p12_mhc_ii']] },
    { id: 'nucleus', l: 'Nucleus', cite: [{ ref: L10, page: 59, match: 'Nucleus' }] },
    { id: 'membrane', l: 'Plasma membrane', cite: [{ ref: L10, page: 59, match: 'Plasma membrane' }] },
  ],
  meiosis: [
    { id: 'primary', l: 'Primary spermatocytes', note: 'Primary spermatocytes begin meiosis', cite: [{ ref: L6, page: 5, match: 'Primary spermatocytes begin meiosis' }], revise: [['ABCT2326', 'p7_primary_spermatocyte']] },
    { id: 'secondary', l: 'Secondary spermatocytes', note: 'Secondary spermatocytes finish meiosis I', cite: [{ ref: L6, page: 5, match: 'Secondary spermatocytes finish meiosis I' }], revise: [['ABCT2326', 'p7_secondary_spermatocytes']] },
    { id: 'spermatids', l: 'Spermatids', note: 'Differentiate into spermatozoa', cite: [{ ref: L6, page: 5, match: 'Spermatids • Finish meiosis II • Differentiate into spermatozoa' }], revise: [['ABCT2326', 'p7_spermatids'], ['ABCT2326', 'p1_gametes']] },
    { id: 'sisters', ...SISTERS },
    { id: 'centrioles', ...CENTRIOLES, cite: [...CENTRIOLES.cite, { ref: L6, page: 8, match: 'Centrioles' }] },
  ],
};

/*
 * The stage sliders. Each stage is a named step the slider passes through, with the name, an optional note, its
 * cite and its Revise boxes, checked like a label. `group` names a run of stages under one heading (mitosis).
 * The geometry (cell/zoom-scene.js) follows a stage parameter s in [0, stages.length): stage k spans [k, k+1).
 */
export const SLIDERS = {
  condense: {
    ends: ['Nondividing cell', 'Cell prepared for division'],
    cite: [{ ref: L1, page: 14, match: 'Cell prepared for division' }, { ref: L1, page: 14, match: 'Nondividing cell' }],
  },
  mitosis: {
    stages: [
      { id: 'interphase', l: 'Interphase', note: 'Most of a cell’s life is spent in a nondividing state (interphase)', cite: [{ ref: L1, page: 24, match: 'nondividing state (interphase)' }], revise: [['ABCT2326', 'p1_interphase']] },
      { id: 'replication', l: 'DNA replication', note: 'DNA replication duplicates genetic material exactly', cite: [{ ref: L1, page: 24, match: 'DNA replication duplicates genetic material exactly' }, { ref: CT, page: 3, match: 'When is DNA replicated? A) interphase' }], revise: [['ABCT2326', 'p1_dna_replication']] },
      { id: 'prophase', l: 'Prophase', group: 'mitosis', cite: [{ ref: CT, page: 3, match: 'B) prophase' }], revise: [['ABCT2326', 'p1_mitosis']] },
      { id: 'metaphase', l: 'Metaphase', group: 'mitosis', cite: [{ ref: CT, page: 3, match: 'C) metaphase' }, { ref: TA, page: 7, match: 'C) metaphase' }], revise: [['ABCT2326', 'p1_mitosis']] },
      { id: 'anaphase', l: 'Anaphase', group: 'mitosis', cite: [{ ref: TA, page: 7, match: 'B) anaphase' }], revise: [['ABCT2326', 'p1_mitosis']] },
      { id: 'telophase', l: 'Telophase', group: 'mitosis', cite: [{ ref: CT, page: 3, match: 'D) telophase' }, { ref: TA, page: 7, match: 'D) telophase' }], revise: [['ABCT2326', 'p1_mitosis']] },
      { id: 'cytokinesis', l: 'Cytokinesis', note: 'Cytokinesis divides cytoplasm and organelles into two daughter cells', cite: [{ ref: L1, page: 24, match: 'Cytokinesis divides cytoplasm and organelles into two daughter cells' }], revise: [['ABCT2326', 'p1_cytokinesis']] },
    ],
    groups: {
      mitosis: { l: 'Mitosis', note: 'Mitosis divides genetic material equally', cite: [{ ref: L1, page: 24, match: 'Mitosis divides genetic material equally' }], revise: [['ABCT2326', 'p1_mitosis']] },
    },
  },
  /*
   * Protein synthesis, with an optional hormone signal in front of it. A stage with `signal` is on the slider only
   * while that signal is chosen; the signals are the two classes the 2026 Endocrine slides name (p13).
   */
  expression: {
    signals: [
      { id: 'none', l: 'No hormone' },
      { id: 'lipophilic', l: 'Lipophilic hormone', cite: [{ ref: L7, page: 13, match: 'Lipophilic hormones' }], revise: [['ABCT2326', 'p8_lipophilic_hormones']] },
      { id: 'hydrophilic', l: 'Hydrophilic hormone', cite: [{ ref: L7, page: 13, match: 'hydrophilic hormones' }], revise: [['ABCT2326', 'p8_hydrophilic_hormones']] },
    ],
    stages: [
      { id: 'lipo_enter', signal: 'lipophilic', l: 'Lipophilic hormones', note: 'They dissociate from carriers to pass thru plasma membrane of target', cite: [{ ref: L7, page: 13, match: 'Lipophilic hormones' }, { ref: L7, page: 14, match: 'They dissociate from carriers to pass thru plasma membrane of target' }], revise: [['ABCT2326', 'p8_carrier_proteins'], ['ABCT2326', 'p8_lipophilic_hormones']] },
      { id: 'lipo_bind', signal: 'lipophilic', l: 'Nuclear hormone receptors', note: 'serve as transcription factors when bound to hormone ligands', cite: [{ ref: L7, page: 15, match: 'serve as transcription factors when bound to hormone ligands' }, { ref: L7, page: 15, match: 'Activate transcription' }, { ref: HM, page: 9, match: 'This stimulates gene transcription' }], revise: [['ABCT2326', 'p8_nuclear_receptors'], ['ABCT2326', 'p8_genomic_action']] },
      { id: 'hydro_bind', signal: 'hydrophilic', l: 'G-protein coupled receptor', note: 'Hormone binds to receptor causing dissociation of a G-protein subunit', cite: [{ ref: L7, page: 17, match: 'Hormone binds to receptor causing dissociation of a G-protein subunit' }], revise: [['ABCT2326', 'p8_gpcr'], ['ABCT2326', 'p8_gpcr_dissoc']] },
      { id: 'hydro_camp', signal: 'hydrophilic', l: 'cAMP', note: 'Which converts ATP into cAMP', cite: [{ ref: L7, page: 17, match: 'Which converts ATP into cAMP' }, { ref: L7, page: 13, match: 'These act through 2nd messengers; effects are quick' }], revise: [['ABCT2326', 'p8_camp'], ['ABCT2326', 'p8_atp_to_camp']] },
      { id: 'hydro_creb', signal: 'hydrophilic', l: 'CREB', note: 'CREB turns on gene transcription', cite: [{ ref: HM, page: 4, match: 'Protein kinase A phosphorylates and activates the transcription factor' }, { ref: HM, page: 4, match: 'CREB turns on gene transcription' }], revise: [['ABCT2326', 'p8_pka_activation']] },
      { id: 'activation', l: 'Gene activation', note: 'uncoiling DNA to use it', cite: [{ ref: L1, page: 21, match: 'Gene activation — uncoiling DNA to use it' }], revise: [['ABCT2326', 'p1_gene_activation']] },
      { id: 'transcription', l: 'Transcription', group: 'expression', note: 'Copies instructions from DNA to mRNA (in nucleus)', cite: [{ ref: L1, page: 21, match: 'Copies instructions from DNA to mRNA (in nucleus)' }], revise: [['ABCT2326', 'p1_transcription']] },
      { id: 'export', l: 'mRNA leaves nucleus', group: 'expression', note: 'mRNA leaves nucleus to cytoplasm through nuclear pores', cite: [{ ref: L1, page: 21, match: 'mRNA leaves nucleus to cytoplasm through nuclear pores' }], revise: [['ABCT2326', 'p1_mrna'], ['ABCT2326', 'p1_nuclear_pores']] },
      { id: 'translation', l: 'Translation', group: 'expression', note: 'Assembles amino acids into polypeptide chain with help of tRNA', cite: [{ ref: L1, page: 21, match: 'Ribosome (on Rough ER) reads code from mRNA (in cytoplasm)' }, { ref: L1, page: 21, match: 'Assembles amino acids into polypeptide chain with help of tRNA' }], revise: [['ABCT2326', 'p1_translation'], ['ABCT2326', 'p1_trna']] },
      { id: 'processing', l: 'Processing', note: 'RER and Golgi apparatus produce protein', cite: [{ ref: L1, page: 21, match: 'Processing • RER and Golgi apparatus produce protein' }], revise: [['ABCT2326', 'p_protein']] },
    ],
    groups: {
      expression: { l: 'Gene expression', note: 'These two steps can be called gene expression', cite: [{ ref: CT, page: 1, match: 'These two steps can be called gene expression' }, { ref: CT, page: 1, match: 'The gene on the DNA is transcribed as messenger RNA, which can leave the nucleus' }] },
    },
  },
  parietal: {
    stages: [
      { id: 'make', l: 'Carbonic anhydrase', note: 'Hydrogen ions (H+) are generated inside a parietal cell as the enzyme carbonic anhydrase converts CO2 and H2O to carbonic acid (H2CO3), which then dissociates.', cite: [{ ref: L4, page: 29, match: 'Hydrogen ions (H+) are generated inside a parietal cell as the enzyme carbonic anhydrase converts CO2 and H2O to carbonic acid (H2CO3), which then dissociates.' }], revise: [['ABCT2326', 'p4_carbonic_anhydrase']] },
      { id: 'pump', l: 'Active transport', note: 'The hydrogen ions are actively transported into the lumen of the gastric gland.', cite: [{ ref: L4, page: 29, match: 'The hydrogen ions are actively transported into the lumen of the gastric gland.' }, { ref: L4, page: 29, match: 'Active transport' }], revise: [['ABCT2326', 'p4_hcl']] },
      { id: 'counter', l: 'Countertransport', note: 'A countertransport mechanism ejects the bicarbonate ions into the interstitial fluid and imports chloride ions into the cell.', cite: [{ ref: L4, page: 29, match: 'A countertransport mechanism ejects the bicarbonate ions into the interstitial fluid and imports chloride ions into the cell.' }], revise: [['ABCT2326', 'p4_alkaline_tide']] },
      { id: 'diffuse', l: 'Diffusion', note: 'The chloride ions then diffuse across the cell and exit through open chloride channels into the lumen of the gastric gland.', cite: [{ ref: L4, page: 29, match: 'The chloride ions then diffuse across the cell and exit through open chloride channels into the lumen of the gastric gland.' }, { ref: L4, page: 29, match: 'Diffusion' }], revise: [['ABCT2326', 'p4_hcl']] },
    ],
    groups: {},
  },
  nk: {
    stages: [
      { id: 'adhere', l: 'Recognition and adhesion', note: 'Identify and attach to abnormal cell (nonselective)', cite: [{ ref: L10, page: 23, match: 'Recognition and adhesion' }, { ref: L10, page: 22, match: 'Identify and attach to abnormal cell (nonselective)' }], revise: [['ABCT2326', 'p12_nk_cells']] },
      { id: 'realign', l: 'Realignment of Golgi apparatus', note: 'Golgi apparatus in NK cell forms perforin vesicles', cite: [{ ref: L10, page: 23, match: 'Realignment of Golgi apparatus' }, { ref: L10, page: 22, match: 'Golgi apparatus in NK cell forms perforin vesicles' }], revise: [['ABCT2326', 'p12_nk_cells']] },
      { id: 'secrete', l: 'Secretion of perforin', note: 'Vesicles release proteins called perforins (exocytosis)', cite: [{ ref: L10, page: 24, match: 'Secretion of perforin' }, { ref: L10, page: 22, match: 'Vesicles release proteins called perforins (exocytosis)' }], revise: [['ABCT2326', 'p12_perforins']] },
      { id: 'lysis', l: 'Lysis of abnormal cell', note: 'Perforins lyse abnormal plasma membrane', cite: [{ ref: L10, page: 24, match: 'Lysis of abnormal cell' }, { ref: L10, page: 22, match: 'Perforins lyse abnormal plasma membrane' }], revise: [['ABCT2326', 'p12_perforins']] },
    ],
    groups: {},
  },
  apc: {
    stages: [
      { id: 'engulf', l: 'Phagocytic APCs', note: 'Phagocytic APCs engulf the extracellular pathogens.', cite: [{ ref: L10, page: 59, match: 'Phagocytic APCs engulf the extracellular pathogens.' }], revise: [['ABCT2326', 'p12_apcs']] },
      { id: 'digest', l: 'Lysosomal action', note: 'Lysosomal action produces antigenic fragments.', cite: [{ ref: L10, page: 59, match: 'Lysosomal action produces antigenic fragments.' }], revise: [['ABCT2326', 'p1_lysosomes']] },
      { id: 'make', l: 'Endoplasmic reticulum', note: 'The endoplasmic reticulum produces Class II MHC proteins.', cite: [{ ref: L10, page: 59, match: 'The endoplasmic reticulum produces Class II MHC proteins.' }], revise: [['ABCT2326', 'p12_mhc_ii']] },
      { id: 'bind', l: 'Antigenic fragments', note: 'Antigenic fragments are bound to Class II MHC proteins.', cite: [{ ref: L10, page: 59, match: 'Antigenic fragments are bound to Class II MHC proteins.' }], revise: [['ABCT2326', 'p12_mhc_ii']] },
      { id: 'display', l: 'Class II MHC proteins', note: 'Antigenic fragments are displayed by Class II MHC proteins on the plasma membrane.', cite: [{ ref: L10, page: 59, match: 'Antigenic fragments are displayed by Class II MHC proteins on the plasma membrane.' }], revise: [['ABCT2326', 'p12_apcs']] },
    ],
    groups: {},
  },
  meiosis: {
    stages: [
      { id: 'primary', l: 'Primary spermatocytes', note: 'n =46 [2n]', cite: [{ ref: L6, page: 5, match: 'Primary spermatocytes begin meiosis and form secondary spermatocytes; n =46 [2n]' }], revise: [['ABCT2326', 'p7_primary_spermatocyte'], ['ABCT2326', 'p_meiosis']] },
      { id: 'meiosis1', l: 'Meiosis I', note: 'Primary spermatocytes begin meiosis and form secondary spermatocytes', cite: [{ ref: L6, page: 5, match: 'finish meiosis I' }, { ref: L6, page: 5, match: 'Primary spermatocytes begin meiosis and form secondary spermatocytes' }], revise: [['ABCT2326', 'p_meiosis']] },
      { id: 'secondary', l: 'Secondary spermatocytes', note: 'immature gametes; n=23 [n]', cite: [{ ref: L6, page: 5, match: 'Secondary spermatocytes finish meiosis I,(immature gametes; n=23 [n])' }], revise: [['ABCT2326', 'p7_secondary_spermatocytes']] },
      { id: 'meiosis2', l: 'Meiosis II', note: 'Finish meiosis II', cite: [{ ref: L6, page: 5, match: 'Finish meiosis II' }], revise: [['ABCT2326', 'p_meiosis']] },
      { id: 'spermatids', l: 'Spermatids', note: 'Differentiate into spermatozoa', cite: [{ ref: L6, page: 5, match: 'Spermatids • Finish meiosis II • Differentiate into spermatozoa' }, { ref: L1, page: 27, match: 'produce gametes (ova and sperm)' }], revise: [['ABCT2326', 'p7_spermatids'], ['ABCT2326', 'p1_gametes']] },
    ],
    groups: {},
  },
};

/*
 * "Show in 3D" from Revise: the box, and where in this mode it opens (a level, and optionally a label to select or
 * a stage to set). The check holds each box to a real box and each target to a real level, label or stage.
 */
export const SHOW_IN_3D = {
  ABCT2326: {
    p_cells: { level: 'cell' },
    p_membrane: { level: 'cell', label: 'membrane' },
    p1_cytoplasm: { level: 'cell', label: 'cytoplasm' },
    p1_centrosome: { level: 'cell', label: 'centrosome' },
    p1_centrioles: { level: 'cell', label: 'centrioles' },
    p1_cytoskeleton: { level: 'cell', label: 'microtubules' },
    p1_microtubules: { level: 'cell', label: 'microtubules' },
    p1_freeribosomes: { level: 'cell', label: 'ribosomes' },
    p1_mitochondria: { level: 'cell', label: 'mito' },
    p_er: { level: 'cell', label: 'rer' },
    p1_rough_er: { level: 'cell', label: 'rer' },
    p1_smooth_er: { level: 'cell', label: 'ser' },
    p_golgi: { level: 'cell', label: 'golgi' },
    p1_cisternae: { level: 'cell', label: 'golgi' },
    p1_sec_vesicles: { level: 'cell', label: 'vesicles' },
    p1_lysosomes: { level: 'cell', label: 'lyso' },
    p_nucleus: { level: 'nucleus' },
    p1_nuclear_envelope: { level: 'nucleus', label: 'envelope' },
    p1_nuclear_pores: { level: 'nucleus', label: 'pores' },
    p1_nucleoplasm: { level: 'nucleus', label: 'nucleoplasm' },
    p1_nucleolus: { level: 'nucleus', label: 'nucleolus' },
    p1_chromatin: { level: 'dna', label: 'chromatin' },
    p1_nucleosomes: { level: 'nucleosome', label: 'histones' },
    p1_histones: { level: 'nucleosome', label: 'histones' },
    p1_dna: { level: 'nucleosome', label: 'dna' },
    p1_gene: { level: 'nucleosome', label: 'gene' },
    p1_genetic_code: { level: 'nucleosome', label: 'bases' },
    p_protein: { level: 'expression', stage: 'activation' },
    p1_gene_activation: { level: 'expression', stage: 'activation' },
    p1_transcription: { level: 'expression', stage: 'transcription' },
    p1_rna_polymerase: { level: 'expression', stage: 'transcription', label: 'polymerase' },
    p1_mrna: { level: 'expression', stage: 'export', label: 'mrna' },
    p1_translation: { level: 'expression', stage: 'translation' },
    p1_trna: { level: 'expression', stage: 'translation', label: 'trna' },
    p_hormone_action: { level: 'expression', signal: 'lipophilic', stage: 'lipo_enter' },
    p8_lipophilic_hormones: { level: 'expression', signal: 'lipophilic', stage: 'lipo_enter', label: 'lipo' },
    p8_carrier_proteins: { level: 'expression', signal: 'lipophilic', stage: 'lipo_enter', label: 'carrier' },
    p8_genomic_action: { level: 'expression', signal: 'lipophilic', stage: 'lipo_bind' },
    p8_nuclear_receptors: { level: 'expression', signal: 'lipophilic', stage: 'lipo_bind', label: 'nreceptor' },
    p8_hydrophilic_hormones: { level: 'expression', signal: 'hydrophilic', stage: 'hydro_bind', label: 'hydro' },
    p8_gpcr: { level: 'expression', signal: 'hydrophilic', stage: 'hydro_bind', label: 'gpcr' },
    p8_gpcr_dissoc: { level: 'expression', signal: 'hydrophilic', stage: 'hydro_bind', label: 'gprotein' },
    p8_ac_activation: { level: 'expression', signal: 'hydrophilic', stage: 'hydro_camp', label: 'ac' },
    p8_adenylate_cyclase: { level: 'expression', signal: 'hydrophilic', stage: 'hydro_camp', label: 'ac' },
    p8_atp_to_camp: { level: 'expression', signal: 'hydrophilic', stage: 'hydro_camp', label: 'camp' },
    p8_camp: { level: 'expression', signal: 'hydrophilic', stage: 'hydro_camp', label: 'camp' },
    p8_pka_activation: { level: 'expression', signal: 'hydrophilic', stage: 'hydro_creb', label: 'kinase' },
    p_cycle: { level: 'cycle', stage: 'interphase' },
    p1_peroxisomes: { level: 'cell', label: 'peroxisomes' },
    p1_ecf: { level: 'membrane', label: 'ecf' },
    p1_phospholipid_bilayer: { level: 'membrane', label: 'bilayer' },
    p1_glycocalyx: { level: 'membrane', label: 'glycolipids' },
    p1_membrane_proteins: { level: 'membrane', label: 'integral' },
    p1_anchoring_proteins: { level: 'membrane', label: 'anchoring' },
    p1_recognition_proteins: { level: 'membrane', label: 'recognition' },
    p1_mp_enzymes: { level: 'membrane', label: 'enzymes' },
    p1_receptor_proteins: { level: 'membrane', label: 'receptor' },
    p1_carrier_proteins: { level: 'membrane', label: 'carrier' },
    p1_membrane_channels: { level: 'membrane', label: 'channels' },
    p1_microfilaments: { level: 'membrane', label: 'microfilaments' },
    p1_cilia: { level: 'epithelium', label: 'cilia' },
    p1_microvilli: { level: 'epithelium', label: 'microvilli' },
    p1_basement_membrane: { level: 'epithelium', label: 'basement' },
    p1_rbc: { level: 'blood', label: 'rbc' },
    p1_wbc: { level: 'blood', label: 'wbc' },
    p1_platelets: { level: 'blood', label: 'platelets' },
    p2_rbc: { level: 'blood', label: 'rbc' },
    p2_wbc: { level: 'blood', label: 'wbc' },
    p2_platelets: { level: 'blood', label: 'platelets' },
    p_plasma: { level: 'blood', label: 'plasma' },
    p3_type1_pneumocytes: { level: 'alveolus', label: 'type1' },
    p3_type2_pneumocytes: { level: 'alveolus', label: 'type2' },
    p3_alveolar_macrophages: { level: 'alveolus', label: 'macrophage' },
    p3_surfactant: { level: 'alveolus', label: 'surfactant' },
    p4_parietal_cells: { level: 'parietal', stage: 'make' },
    p4_carbonic_anhydrase: { level: 'parietal', stage: 'make', label: 'ca' },
    p4_hcl: { level: 'parietal', stage: 'diffuse' },
    p4_alkaline_tide: { level: 'parietal', stage: 'counter', label: 'tide' },
    p7_spermatozoa: { level: 'sperm' },
    p7_sperm_head: { level: 'sperm', label: 'head' },
    p7_acrosome: { level: 'sperm', label: 'acrosome' },
    p7_middle_piece: { level: 'sperm', label: 'middle' },
    p7_sperm_tail: { level: 'sperm', label: 'tail' },
    p1_sperm: { level: 'sperm' },
    p1_neurons: { level: 'neuron' },
    p1_cell_body: { level: 'neuron', label: 'body' },
    p1_dendrites: { level: 'neuron', label: 'dendrites' },
    p1_axon: { level: 'neuron', label: 'axon' },
    p_neurons: { level: 'neuron' },
    p9_cell_body: { level: 'neuron', label: 'body' },
    p9_dendrites: { level: 'neuron', label: 'dendrites' },
    p9_axon: { level: 'neuron', label: 'axon' },
    p9_myelin: { level: 'neuron', label: 'myelin' },
    p9_schwann_cells: { level: 'neuron', label: 'schwann' },
    p9_nodes_ranvier: { level: 'neuron', label: 'node' },
    p_surveillance: { level: 'nk', stage: 'adhere' },
    p12_nk_cells: { level: 'nk', stage: 'adhere', label: 'nkcell' },
    p12_perforins: { level: 'nk', stage: 'lysis', label: 'perforin' },
    p12_apcs: { level: 'apc', stage: 'engulf' },
    p12_mhc_ii: { level: 'apc', stage: 'display', label: 'mhc' },
    p1_interphase: { level: 'cycle', stage: 'interphase' },
    p1_dna_replication: { level: 'cycle', stage: 'replication' },
    p1_mitosis: { level: 'cycle', stage: 'metaphase' },
    p1_cytokinesis: { level: 'cycle', stage: 'cytokinesis' },
    p_meiosis: { level: 'meiosis', stage: 'primary' },
    p1_gametes: { level: 'meiosis', stage: 'spermatids' },
    p7_primary_spermatocyte: { level: 'meiosis', stage: 'primary' },
    p7_secondary_spermatocytes: { level: 'meiosis', stage: 'secondary' },
    p7_spermatids: { level: 'meiosis', stage: 'spermatids' },
  },
  HSS2011: {
    w5_neuronparts: { level: 'neuron' },
    w5_cellbody: { level: 'neuron', label: 'body' },
    w5_neurofibrils: { level: 'neuron', label: 'neurofibrils' },
    w5_dendrites: { level: 'neuron', label: 'dendrites' },
    w5_axons: { level: 'neuron', label: 'axon' },
    w5_myelin: { level: 'neuron', label: 'myelin' },
    w5_schwann: { level: 'neuron', label: 'schwann' },
  },
};

/* Terms the geometry shows that no course source names on a page: drawn, never labelled (the check refuses them). */
export const UNLABELLED = ['base pair', 'tetrad', 'homologous', 'linker DNA', 'H2A', 'H2B', 'H3', 'H4'];

/* The stages a slider shows for a signal (the expression slider; the others have none). */
export const stagesFor = (slider, signal = 'none') => ((SLIDERS[slider] && SLIDERS[slider].stages) || []).filter((s) => !s.signal || s.signal === signal);
export const levelById = (id) => LEVELS.find((l) => l.id === id) || null;
export const showIn3D = (subject, id) => (SHOW_IN_3D[subject] && SHOW_IN_3D[subject][id]) || null;
