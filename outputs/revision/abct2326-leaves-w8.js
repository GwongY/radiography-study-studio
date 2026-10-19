/*
 * ABCT2326 · Week 8 leaves — hormones.
 *
 * Read off Lecture 7 - Endocrine System.pdf (phys.l7.2026), pages 2–55.
 * One row per unit the slides teach (part, cell, substance, process, group).
 * Row kinds and fields: outputs/revision/leaves.js. Rules: outputs/revision/rules.js.
 * Recipe: docs/superpowers/plans/2026-10-19-physiology-revise.md (Recipe P).
 */
const L7 = 'phys.l7.2026';

export const SOURCES = {
  [L7]: 'Lecture 7 endocrine system slides',
};

export const ROWS = [
  /* ---------------- What is a hormone (p3-4) ---------------- */
  { k: 'substance', id: 'p8_chem_messengers', l: 'Chemical messengers', match: 'chemical messengers', parent: 'p_hormone', w: 8, line: 'relay information and instructions between cells', src: [L7, 4] },

  /* ---------------- Classes of hormone delivery (p5) ---------------- */
  { k: 'process', id: 'p8_autocrine_del', l: 'Autocrine', parent: 'p_delivery', w: 8, line: 'hormone released feeds-back on the same cell without entering blood', src: [L7, 5] },
  { k: 'process', id: 'p8_paracrine_del', l: 'Paracrine', parent: 'p_delivery', w: 8, line: 'hormone diffuses to adjacent target cells through immediate extracellular space', src: [L7, 5] },
  { k: 'process', id: 'p8_endocrine_del', l: 'Endocrine', parent: 'p_delivery', w: 8, line: 'hormones delivered to target cells by blood circulation', src: [L7, 5] },
  { k: 'process', id: 'p8_neuroendocrine_del', l: 'Neuroendocrine', parent: 'p_delivery', w: 8, line: 'hormone produced and released by a neuron into bloodstream', src: [L7, 5] },

  /* ---------------- Endocrine glands (p7) ---------------- */
  { k: 'part', id: 'p8_ductless_glands', l: 'Ductless glands', match: 'ductless', parent: 'p_endo_glands', w: 8, line: 'ductless glands that secrete hormones into bloodstream', src: [L7, 7] },
  { k: 'cell', id: 'p8_target_cells', l: 'Target cells', match: 'target cells', parent: 'p_endo_glands', w: 8, line: 'contain corresponding receptor proteins that bind traveling hormones', src: [L7, 7, 5] },
  { k: 'substance', id: 'p8_neurohormones', l: 'Neurohormones', parent: 'p_endo_glands', w: 8, line: 'secreted into blood by specialized neurons', src: [L7, 7] },

  /* ---------------- Chemical classification of hormones (p8-10) ---------------- */
  { k: 'group', id: 'p8_tyrosine_deriv', l: 'Derivatives of tyrosine', match: 'Derivatives of amino acid tyrosine', parent: 'p_hormone_chem', w: 8, line: 'secreted by the thyroid and adrenal medulla', src: [L7, 9] },
  { k: 'group', id: 'p8_proteins_peptides', l: 'Proteins and peptides', match: 'Proteins and Peptides', parent: 'p_hormone_chem', w: 8, line: 'secreted by pituitary gland, pancreas, and parathyroid', src: [L7, 9] },
  { k: 'group', id: 'p8_steroids', l: 'Steroids', parent: 'p_hormone_chem', w: 8, line: 'secreted by adrenal cortex, ovaries, testes and placenta', src: [L7, 9, 13, 36] },
  { k: 'substance', id: 'p8_prohormones', l: 'Prohormones', parent: 'p_hormone_chem', w: 8, line: 'precursors of hormones such as proinsulin', src: [L7, 10] },
  { k: 'substance', id: 'p8_proinsulin', l: 'Proinsulin', match: 'proinsulin', parent: 'p8_prohormones', w: 8, line: 'precursor of active insulin', src: [L7, 10] },
  { k: 'substance', id: 'p8_prehormones', l: 'Prehormones', parent: 'p_hormone_chem', w: 8, line: 'precursors of prohormones such as preproinsulin', src: [L7, 10] },
  { k: 'substance', id: 'p8_preproinsulin', l: 'Preproinsulin', match: 'preproinsulin', parent: 'p8_prehormones', w: 8, line: 'precursor of prohormone proinsulin', src: [L7, 10] },

  /* ---------------- Mechanisms of hormone action (p12-22) ---------------- */
  { k: 'part', id: 'p8_target_receptors', l: 'Target cell receptors', match: 'Target cell receptors', parent: 'p_hormone_action', w: 8, line: 'show specificity, high affinity, and low capacity for a hormone', src: [L7, 13] },
  { k: 'group', id: 'p8_lipophilic_hormones', l: 'Lipophilic hormones', match: 'Lipophilic hormones', parent: 'p_hormone_action', w: 8, line: 'diffuse through plasma membrane to bind nuclear receptors', src: [L7, 13] },
  { k: 'group', id: 'p8_hydrophilic_hormones', l: 'Hydrophilic hormones', match: 'hydrophilic hormones', parent: 'p_hormone_action', w: 8, line: 'receptors on target cell surface acting through second messengers', src: [L7, 13] },
  { k: 'process', id: 'p8_genomic_action', l: 'Genomic action', match: 'genomic action', parent: 'p8_lipophilic_hormones', w: 8, line: 'hormone affects transcription taking at least thirty minutes', src: [L7, 13] },
  { k: 'process', id: 'p8_nongenomic_action', l: 'Nongenomic action', match: 'nongenomic action', parent: 'p_hormone_action', w: 8, line: 'steroids act on cell surface receptors producing quick effects', src: [L7, 13] },
  { k: 'substance', id: 'p8_carrier_proteins', l: 'Carrier proteins', match: 'carrier proteins', parent: 'p8_lipophilic_hormones', w: 8, line: 'transport lipid hormones in blood and dissociate at target', src: [L7, 14] },
  { k: 'part', id: 'p8_nuclear_receptors', l: 'Nuclear hormone receptors', match: 'nuclear hormone receptors', parent: 'p8_lipophilic_hormones', w: 8, line: 'transcription factors activated when bound to hormone ligands', src: [L7, 14, 15] },
  { k: 'part', id: 'p8_steroid_receptor_fam', l: 'Steroid receptor family', match: 'steroid family', parent: 'p8_nuclear_receptors', w: 8, line: 'family of nuclear hormone receptors', src: [L7, 15] },
  { k: 'part', id: 'p8_thyroid_receptor_fam', l: 'Thyroid hormone receptor family', match: 'thyroid hormone family', parent: 'p8_nuclear_receptors', w: 8, line: 'includes receptors for thyroid hormone, vitamin D, and retinoic acid', src: [L7, 15] },

  { k: 'part', id: 'p8_gpcr', l: 'G-protein coupled receptor', match: 'G-protein coupled receptor', parent: 'p8_hydrophilic_hormones', w: 8, line: 'surface receptor coupled to G-protein subunit for second messenger signaling', src: [L7, 17] },
  { k: 'substance', id: 'p8_camp', l: 'cAMP', match: 'cAMP', parent: 'p_hormone_action', w: 8, line: 'second messenger mediating effects of polypeptide and glycoprotein hormones', src: [L7, 17] },
  { k: 'substance', id: 'p8_adenylate_cyclase', l: 'Adenylate cyclase', match: 'adenylate cyclase', parent: 'p_hormone_action', w: 8, line: 'membrane enzyme that converts ATP into cAMP', src: [L7, 17] },
  { k: 'process', id: 'p8_gpcr_dissoc', l: 'G-protein subunit dissociation', match: 'dissociation of a G-protein subunit', parent: 'p_hormone_action', w: 8, line: 'hormone binding causes dissociation of a G-protein subunit', next: { p8_ac_activation: 'activates adenylate cyclase' }, src: [L7, 17] },
  { k: 'process', id: 'p8_ac_activation', l: 'Adenylate cyclase activation', match: 'activates adenylate cyclase', parent: 'p_hormone_action', w: 8, line: 'G-protein subunit binds to and activates adenylate cyclase', next: { p8_atp_to_camp: 'converts ATP into cAMP' }, src: [L7, 17] },
  { k: 'process', id: 'p8_atp_to_camp', l: 'cAMP generation', match: 'converts ATP into cAMP', parent: 'p_hormone_action', w: 8, line: 'adenylate cyclase converts ATP into cAMP', next: { p8_pka_activation: 'activates protein kinase' }, src: [L7, 17] },
  { k: 'process', id: 'p8_pka_activation', l: 'Protein kinase activation', match: 'cAMP activating protein kinase', parent: 'p_hormone_action', w: 8, line: 'cAMP activates protein kinase', next: { p8_enzyme_phospho: 'phosphorylates enzymes' }, src: [L7, 17] },
  { k: 'process', id: 'p8_enzyme_phospho', l: 'Enzyme phosphorylation', match: 'phosphorylat', parent: 'p_hormone_action', w: 8, line: 'phosphorylates enzymes that produce hormone effects', src: [L7, 17, 18] },
  { k: 'substance', id: 'p8_pde', l: 'Phosphodiesterase', match: 'phosphodiesterase', parent: 'p_hormone_action', w: 8, line: 'inactivates cAMP to terminate hormonal effects', src: [L7, 17] },

  { k: 'substance', id: 'p8_plc', l: 'Phospholipase C', match: 'phospholipase C', parent: 'p_hormone_action', w: 8, line: 'enzyme that splits membrane phospholipid into IP3 and DAG', src: [L7, 18] },
  { k: 'substance', id: 'p8_ip3', l: 'IP3', match: 'IP3', parent: 'p_hormone_action', w: 8, line: 'second messenger that opens ER Ca2+ channels', src: [L7, 18] },
  { k: 'substance', id: 'p8_dag', l: 'DAG', match: 'DAG', parent: 'p_hormone_action', w: 8, line: 'second messenger produced from split membrane phospholipid', src: [L7, 18] },
  { k: 'substance', id: 'p8_calmodulin', l: 'Calmodulin', match: 'calmodulin', parent: 'p_hormone_action', w: 8, line: 'binds Ca2+ to activate protein kinases', src: [L7, 18] },
  { k: 'process', id: 'p8_plc_activation', l: 'Phospholipase C activation', match: 'activates phospholipase C', parent: 'p_hormone_action', w: 8, line: 'hormone binds surface receptor and G-protein activates phospholipase C', next: { p8_split_phospholipid: 'splits membrane phospholipid' }, src: [L7, 18] },
  { k: 'process', id: 'p8_split_phospholipid', l: 'Phospholipid splitting', match: 'splits a membrane phospholipid', parent: 'p_hormone_action', w: 8, line: 'phospholipase C splits membrane phospholipid into IP3 and DAG', next: { p8_ca_channel_open: 'opens ER Ca2+ channels' }, src: [L7, 18] },
  { k: 'process', id: 'p8_ca_channel_open', l: 'ER Ca2+ channel opening', match: 'Ca2+ channels to open', parent: 'p_hormone_action', w: 8, line: 'IP3 diffuses to ER causing Ca2+ channels to open', next: { p8_calmodulin_binding: 'Ca2+ binds calmodulin' }, src: [L7, 18] },
  { k: 'process', id: 'p8_calmodulin_binding', l: 'Calmodulin activation', match: 'activates calmodulin', parent: 'p_hormone_action', w: 8, line: 'Ca2+ diffuses into cytoplasm and binds to activate calmodulin', next: { p8_cam_kinase_act: 'activates protein kinases' }, src: [L7, 18] },
  { k: 'process', id: 'p8_cam_kinase_act', l: 'Ca2+-calmodulin kinase activation', match: 'activates protein kinases', parent: 'p_hormone_action', w: 8, line: 'Ca2+-calmodulin activates protein kinases which phosphorylate enzymes', next: { p8_enzyme_phospho: 'phosphorylates enzymes' }, src: [L7, 18] },

  { k: 'part', id: 'p8_tyrosine_kinase_rec', l: 'Tyrosine kinase receptor', match: 'Tyrosine Kinase Receptor', parent: 'p8_hydrophilic_hormones', w: 8, line: 'surface receptor used by insulin and growth factors', src: [L7, 19] },
  { k: 'process', id: 'p8_tk_dimerization', l: 'Receptor dimerization', match: 'form active dimer', parent: 'p_hormone_action', w: 8, line: 'consists of two units that form active dimer when insulin binds', next: { p8_tk_signaling: 'phosphorylates signaling molecules' }, src: [L7, 19] },
  { k: 'process', id: 'p8_tk_signaling', l: 'Signaling molecule phosphorylation', match: 'phosphorylates signaling molecules', parent: 'p_hormone_action', w: 8, line: 'activated tyrosine kinase phosphorylates signaling molecules', src: [L7, 19] },

  /* ---------------- Pituitary gland (p23-32) ---------------- */
  { k: 'part', id: 'p8_anterior_pit', l: 'Anterior pituitary', match: 'Anterior pituitary', parent: 'p_pituitary', w: 8, line: 'anterior lobe producing own hormones under hypothalamic control', makes: { p8_gh: 'secretes growth hormone', p8_acth: 'secretes ACTH', p8_tsh: 'secretes TSH', p8_fsh: 'secretes FSH', p8_lh: 'secretes LH' }, src: [L7, 25, 26, 29, 31] },
  { k: 'part', id: 'p8_posterior_pit', l: 'Posterior pituitary', match: 'posterior pituitary', parent: 'p_pituitary', w: 8, line: 'posterior lobe storing and releasing hormones made in hypothalamus', makes: { p8_adh: 'releases ADH', p8_oxytocin: 'releases oxytocin' }, src: [L7, 27] },
  { k: 'part', id: 'p8_infundibulum', l: 'Infundibulum', match: 'infundibulum', parent: 'p_pituitary', w: 8, line: 'stalk connecting pituitary gland to hypothalamus', src: [L7, 24] },
  { k: 'group', id: 'p8_trophic_hormones', l: 'Trophic hormones', match: 'trophic hormones', parent: 'p8_anterior_pit', w: 8, line: 'six anterior pituitary hormones that maintain size of targets', src: [L7, 25] },
  { k: 'process', id: 'p8_hypertrophy', l: 'Hypertrophy', match: 'hypertrophy', parent: 'p8_anterior_pit', w: 8, line: 'high blood levels of trophic hormones cause target to hypertrophy', src: [L7, 25] },
  { k: 'process', id: 'p8_atrophy', l: 'Atrophy', match: 'atrophy', parent: 'p8_anterior_pit', w: 8, line: 'low blood levels of trophic hormones cause target atrophy', src: [L7, 25] },
  { k: 'substance', id: 'p8_gh', l: 'Growth hormone', match: 'growth hormone', parent: 'p8_anterior_pit', w: 8, line: 'anterior pituitary hormone regulating body growth', src: [L7, 55] },
  { k: 'process', id: 'p8_dwarfism', l: 'Dwarfism', match: 'Dwarfism', parent: 'p8_gh', w: 8, line: 'effect of deficient growth hormone secretion on growth', src: [L7, 55] },
  { k: 'process', id: 'p8_gigantism', l: 'Giantism', match: 'Giantism', parent: 'p8_gh', w: 8, line: 'effect of excessive growth hormone secretion on growth', src: [L7, 55] },

  /* ---------------- Hypothalamic control of the pituitary (p27-30) ---------------- */
  { k: 'part', id: 'p8_supraoptic_nuclei', l: 'Supraoptic nuclei', match: 'Supraoptic nuclei', parent: 'p_hypothal', w: 8, line: 'produce antidiuretic hormone or vasopressin', makes: { p8_adh: 'produce antidiuretic hormone' }, src: [L7, 27] },
  { k: 'part', id: 'p8_paraventricular_nuclei', l: 'Paraventricular nuclei', match: 'Paraventricular nuclei', parent: 'p_hypothal', w: 8, line: 'produce oxytocin', makes: { p8_oxytocin: 'produce oxytocin' }, own: 'Nuclei of the hypothalamus that make oxytocin, which drives uterine contraction in birth and milk release.', src: [L7, 27] },
  { k: 'substance', id: 'p8_adh', l: 'Antidiuretic hormone', match: 'Antidiuretic hormone', parent: 'p_hypothal', w: 8, line: 'vasopressin promoting water conservation by kidneys', links: { p5_adh: 'promotes H2O conservation by kidneys' }, src: [L7, 27] },
  { k: 'substance', id: 'p8_oxytocin', l: 'Oxytocin', match: 'oxytocin', parent: 'p_hypothal', w: 8, line: 'stimulates uterine contractions during parturition and milk-ejection reflex', links: { p7_oxytocin: 'stimulates contractions of uterus during parturition' }, src: [L7, 27] },
  { k: 'part', id: 'p8_hypo_hypophys_tract', l: 'Hypothalamo-hypophyseal tract', match: 'hypothalamo-', parent: 'p_hypothal', w: 8, line: 'transports ADH and oxytocin to posterior pituitary', src: [L7, 27] },
  { k: 'process', id: 'p8_neuroendo_reflexes', l: 'Neuroendocrine reflexes', match: 'neuroendocrine reflexes', parent: 'p_hypothal', w: 8, line: 'control posterior pituitary hormone release in hypothalamus', src: [L7, 27] },
  { k: 'part', id: 'p8_median_eminence', l: 'Median eminence', match: 'median eminence', parent: 'p_hypothal', w: 8, line: 'capillary bed where hypothalamic releasing and inhibiting hormones enter', src: [L7, 29] },
  { k: 'part', id: 'p8_portal_system', l: 'Hypothalamo-hypophyseal portal system', match: 'hypothalamo-hypophyseal portal system', parent: 'p_hypothal', w: 8, line: 'carries hypothalamic hormones directly to anterior pituitary capillary bed', src: [L7, 29] },
  { k: 'group', id: 'p8_rel_inh_hormones', l: 'Releasing and inhibiting hormones', match: 'Releasing and inhibiting hormones', parent: 'p_hypothal', w: 8, line: 'diffuse into anterior pituitary and regulate secretion of its hormones', src: [L7, 29] },

  /* ---------------- Feedback control of anterior pituitary (p31) ---------------- */
  { k: 'process', id: 'p8_hpg_axis', l: 'Hypothalamic-pituitary-gonad axis', match: 'hypothalamic-pituitary-', parent: 'p_pit_feedback', w: 8, line: 'control system regulating gonadotropins and sex steroid hormones', src: [L7, 31] },
  { k: 'process', id: 'p8_short_feedback', l: 'Short feedback loop', match: 'short feedback loop', parent: 'p_pit_feedback', w: 8, line: 'retrograde flow of blood and hormones inhibits releasing hormone secretion', src: [L7, 31] },
  { k: 'process', id: 'p8_target_neg_fb', l: 'Negative feedback of target hormones', match: 'negative feedback of target gland hormones', parent: 'p_pit_feedback', w: 8, line: 'target gland hormones inhibit GnRH secretion and anterior pituitary responsiveness', links: { p1_neg_feedback: 'Involves negative feedback of target gland hormones' }, src: [L7, 31] },
  { k: 'process', id: 'p8_lh_surge', l: 'LH surge', match: 'LH surge', parent: 'p_pit_feedback', w: 8, line: 'estrogen stimulates LH surge during menstrual cycle by positive feedback', links: { p1_pos_feedback: 'estrogen stimulates LH surge by positive feedback' }, src: [L7, 31] },
  { k: 'substance', id: 'p8_gnrh', l: 'Gonadotropin-releasing hormone', match: 'Gonadotropin-releasing', parent: 'p_pit_feedback', w: 8, line: 'hypothalamic hormone that stimulates anterior pituitary gonadotropin secretion', acts: { p8_anterior_pit: 'stimulates secretion of gonadotropins' }, src: [L7, 31] },
  { k: 'group', id: 'p8_gonadotropins', l: 'Gonadotropins', match: 'Gonadotropins', parent: 'p_pit_feedback', w: 8, line: 'anterior pituitary hormones FSH and LH stimulating gonads', links: { p7_lh: 'Gonadotropins (FSH and LH)', p7_fsh: 'Gonadotropins (FSH and LH)' }, src: [L7, 31] },
  { k: 'substance', id: 'p8_fsh', l: 'FSH', match: 'FSH', parent: 'p8_gonadotropins', w: 8, line: 'follicle-stimulating hormone secreted by anterior pituitary', src: [L7, 31] },
  { k: 'substance', id: 'p8_lh', l: 'LH', match: 'LH', parent: 'p8_gonadotropins', w: 8, line: 'luteinizing hormone secreted by anterior pituitary', src: [L7, 31] },

  /* ---------------- Adrenal glands (p33-36) ---------------- */
  { k: 'part', id: 'p8_adrenal_cortex', l: 'Adrenal cortex', match: 'adrenal cortex', parent: 'p_adrenal', w: 8, line: 'superficial region storing lipids and manufacturing steroid hormones', makes: { p8_aldosterone: 'secretes aldosterone', p8_cortisol: 'secretes cortisol' }, src: [L7, 34, 9] },
  { k: 'group', id: 'p8_corticosteroids', l: 'Corticosteroids', match: 'corticosteroids', parent: 'p8_adrenal_cortex', w: 8, line: 'steroid hormones manufactured by adrenal cortex', src: [L7, 34] },
  { k: 'substance', id: 'p8_aldosterone', l: 'Aldosterone', match: 'aldosterone', parent: 'p8_adrenal_cortex', w: 8, line: 'stimulates kidneys to reabsorb Na+ and secrete K+', links: { p5_aldosterone: 'stimulate kidneys to reabsorb Na+ and secrete K+' }, src: [L7, 36, 9] },
  { k: 'substance', id: 'p8_cortisol', l: 'Cortisol', match: 'cortisol', parent: 'p8_adrenal_cortex', w: 8, line: 'inhibits glucose utilization and stimulates gluconeogenesis', src: [L7, 36, 9] },
  { k: 'substance', id: 'p8_acth', l: 'Adrenocorticotrophic hormone', match: 'Adrenocorticotrophic hormone', parent: 'p_adrenal', w: 8, line: 'ACTH controls secretion of adrenal cortex', acts: { p8_adrenal_cortex: 'controls adrenal cortex secretion' }, src: [L7, 36] },
  { k: 'part', id: 'p8_adrenal_medulla', l: 'Adrenal medulla', match: 'adrenal medulla', parent: 'p_adrenal', w: 8, line: 'inner region producing epinephrine and norepinephrine under sympathetic control', makes: { p8_epinephrine: 'secretes eighty percent epinephrine', p8_norepinephrine: 'secretes twenty percent norepinephrine' }, links: { p_symp_path: 'secretory activities controlled by sympathetic division of ANS' }, src: [L7, 34, 9, 35] },
  { k: 'substance', id: 'p8_epinephrine', l: 'Epinephrine', match: 'epinephrine', parent: 'p8_adrenal_medulla', w: 8, line: 'eighty percent of medullary secretion activated in fight or flight', src: [L7, 34, 9, 35] },
  { k: 'substance', id: 'p8_norepinephrine', l: 'Norepinephrine', match: 'norepinephrine', parent: 'p8_adrenal_medulla', w: 8, line: 'twenty percent of medullary secretion with shorter effects than epinephrine', src: [L7, 34, 9, 35] },

  /* ---------------- Thyroid gland (p37-43) ---------------- */
  { k: 'part', id: 'p8_thyroid_follicles', l: 'Thyroid follicles', match: 'thyroid follicles', parent: 'p_thyroid', w: 8, line: 'microscopic follicles lined by follicle cells and filled with colloid', src: [L7, 39] },
  { k: 'cell', id: 'p8_follicle_cells', l: 'Follicle cells', match: 'follicle cells', parent: 'p8_thyroid_follicles', w: 8, line: 'outer layer of thyroid follicles that synthesize T4', makes: { p8_t4: 'synthesize T4' }, src: [L7, 39] },
  { k: 'part', id: 'p8_colloid', l: 'Colloid', match: 'colloid', parent: 'p8_thyroid_follicles', w: 8, line: 'protein-rich fluid filling interior of thyroid follicles', src: [L7, 39] },
  { k: 'substance', id: 'p8_t4', l: 'Thyroxine', match: 'thyroxine', parent: 'p_thyroid', w: 8, line: 'T4 converted to active T3 in target cells', src: [L7, 9, 10] },
  { k: 'substance', id: 'p8_t3', l: 'Triiodothyronine', match: 'triiodothyronine', parent: 'p_thyroid', w: 8, line: 'T3 sets basal metabolic rate and required for growth', src: [L7, 9] },
  { k: 'substance', id: 'p8_calcitonin', l: 'Calcitonin', match: 'Calcitonin', parent: 'p_thyroid', w: 8, line: 'signals for calcium excretion and storage in bones', src: [L7, 39] },
  { k: 'substance', id: 'p8_tsh', l: 'TSH', match: 'TSH', parent: 'p_thyroid', w: 8, line: 'thyroid-stimulating hormone that stimulates thyroid gland to grow and oversecrete', acts: { p_thyroid: 'stimulates thyroid gland to grow and oversecrete' }, src: [L7, 41] },
  { k: 'process', id: 'p8_hypothyroidism', l: 'Hypothyroidism', match: 'hypothyroidism', parent: 'p_thyroid', w: 8, line: 'inadequate T4 and T3 levels with low BMR and cold intolerance', src: [L7, 40, 43] },
  { k: 'process', id: 'p8_myxedema', l: 'Myxedema', match: 'myxedema', parent: 'p8_hypothyroidism', w: 8, line: 'puffy face, hands, and feet in hypothyroidism', src: [L7, 40] },
  { k: 'process', id: 'p8_cretinism', l: 'Cretinism', match: 'cretinism', parent: 'p8_hypothyroidism', w: 8, line: 'severe mental retardation caused by hypothyroidism during fetal development', src: [L7, 40] },
  { k: 'process', id: 'p8_hyperthyroidism', l: 'Hyperthyroidism', match: 'hyperthyroidism', parent: 'p_thyroid', w: 8, line: 'oversecretion of thyroid hormones causing high BMR and heat intolerance', src: [L7, 41, 43] },
  { k: 'process', id: 'p8_grave_disease', l: 'Grave disease', match: 'Grave disease', parent: 'p8_hyperthyroidism', w: 8, line: 'autoimmune disease where antibodies act like TSH and stimulate thyroid', src: [L7, 41] },
  { k: 'part', id: 'p8_goiters', l: 'Goiters', match: 'Goiters', parent: 'p_thyroid', w: 8, line: 'enlargement of thyroid gland produced in Grave disease', src: [L7, 41] },
  { k: 'process', id: 'p8_exophthalmos', l: 'Exophthalmos', match: 'exopthalmos', parent: 'p8_hyperthyroidism', w: 8, line: 'eyes protruding due to immune attack on tissues around eyes', src: [L7, 41] },

  /* ---------------- Parathyroid glands (p44-45) ---------------- */
  { k: 'substance', id: 'p8_pth', l: 'Parathyroid hormone', match: 'Parathyroid hormone', parent: 'p_parathyroid', w: 8, line: 'PTH controls blood Ca2+ levels by acting on bone and kidneys', acts: { p8_osteoclasts: 'stimulates osteoclasts', p8_osteoblasts: 'inhibits osteoblasts' }, src: [L7, 44, 45, 9] },
  { k: 'cell', id: 'p8_osteoclasts', l: 'Osteoclasts', match: 'osteoclasts', parent: 'p_parathyroid', w: 8, line: 'break down bone and release Ca2+ into blood', src: [L7, 45] },
  { k: 'cell', id: 'p8_osteoblasts', l: 'Osteoblasts', match: 'osteoblasts', parent: 'p_parathyroid', w: 8, line: 'form new bone and reduce rate of calcium deposition', src: [L7, 45] },
  { k: 'substance', id: 'p8_calcitriol', l: 'Calcitriol', match: 'calcitriol', parent: 'p_parathyroid', w: 8, line: 'synthesized by kidneys to enhance digestive calcium and phosphate absorption', src: [L7, 45] },

  /* ---------------- Islets of Langerhans (p46-49) ---------------- */
  { k: 'cell', id: 'p8_alpha_cells', l: 'Alpha cells', match: 'Alpha cells', parent: 'p_islets', w: 8, line: 'secrete glucagon in response to low blood glucose', makes: { p8_glucagon: 'secrete glucagon' }, src: [L7, 48] },
  { k: 'cell', id: 'p8_beta_cells', l: 'Beta cells', match: 'Beta cells', parent: 'p_islets', w: 8, line: 'secrete insulin in response to high blood glucose', makes: { p8_insulin: 'secrete insulin' }, src: [L7, 49] },
  { k: 'substance', id: 'p8_glucagon', l: 'Glucagon', match: 'glucagon', parent: 'p_islets', w: 8, line: 'stimulates glycogenolysis and lipolysis to increase blood glucose', src: [L7, 48, 9] },
  { k: 'substance', id: 'p8_insulin', l: 'Insulin', match: 'insulin', parent: 'p_islets', w: 8, line: 'promotes glucose entry into cells and conversion into glycogen and fat', src: [L7, 49, 9, 19] },

  /* ---------------- Pineal gland (p50-51) ---------------- */
  { k: 'part', id: 'p8_scn', l: 'Suprachiasmatic nucleus', match: 'suprachiasmatic nucleus', parent: 'p_pineal', w: 8, line: 'primary timing center for circadian rhythms in hypothalamus reset by light', src: [L7, 51] },
  { k: 'substance', id: 'p8_melatonin', l: 'Melatonin', match: 'melatonin', parent: 'p_pineal', w: 8, line: 'secreted at night, inhibited by light, aligning sleep-wake cycle', src: [L7, 51] },

  /* ---------------- Sex and reproductive hormones (p52) ---------------- */
  { k: 'part', id: 'p8_gonads', l: 'Gonads', match: 'Gonads', parent: 'p_sex_hormones', w: 8, line: 'testes and ovaries that secrete steroid hormones', makes: { p8_testosterone: 'secrete testosterone', p8_estrogen: 'secrete estrogen', p8_progesterone: 'secrete progesterone' }, src: [L7, 52] },
  { k: 'substance', id: 'p8_testosterone', l: 'Testosterone', match: 'testosterone', parent: 'p_sex_hormones', w: 8, line: 'steroid hormone secreted by testes', links: { p7_testosterone: 'gonads (testes and ovaries) secrete steroid hormones eg. testosterone' }, src: [L7, 52, 9] },
  { k: 'substance', id: 'p8_estrogen', l: 'Estrogen', match: 'estrogen', parent: 'p_sex_hormones', w: 8, line: 'steroid hormone secreted by ovaries and placenta', src: [L7, 52, 9, 31] },
  { k: 'substance', id: 'p8_progesterone', l: 'Progesterone', match: 'progesterone', parent: 'p_sex_hormones', w: 8, line: 'steroid hormone secreted by ovaries and placenta', src: [L7, 52, 9] },
  { k: 'part', id: 'p8_placenta', l: 'Placenta', match: 'Placenta', parent: 'p_sex_hormones', w: 8, line: 'secretes oestrogen, progesterone, hCG, and somatomammotropin', makes: { p8_hcg: 'secretes hCG', p8_somatomammotropin: 'secretes somatomammotropin' }, src: [L7, 52, 9] },
  { k: 'substance', id: 'p8_hcg', l: 'hCG', match: 'hCG', parent: 'p_sex_hormones', w: 8, line: 'human chorionic gonadotropin secreted by placenta', src: [L7, 52] },
  { k: 'substance', id: 'p8_somatomammotropin', l: 'Somatomammotropin', match: 'somatomammotropin', parent: 'p_sex_hormones', w: 8, line: 'placental hormone secreted during pregnancy', src: [L7, 52] },

  /* ---------------- Autocrine and paracrine regulation (p53-54) ---------------- */
  { k: 'group', id: 'p8_autocrine_reg', l: 'Autocrine regulators', match: 'Autocrine regulators', parent: 'p_paracrine', w: 8, line: 'produced and act within same tissue to control gene expression', src: [L7, 54] },
  { k: 'group', id: 'p8_paracrine_reg', l: 'Paracrine regulators', match: 'Paracrine regulators', parent: 'p_paracrine', w: 8, line: 'produced within one tissue and act on different tissue in same organ', src: [L7, 54] },
  { k: 'substance', id: 'p8_cytokines', l: 'Cytokines', match: 'Cytokines', parent: 'p_paracrine', w: 8, line: 'autocrine and paracrine regulators including lymphokines and interleukins', src: [L7, 54] },
  { k: 'substance', id: 'p8_lymphokines', l: 'Lymphokines', match: 'lymphokines', parent: 'p8_cytokines', w: 8, line: 'cytokines produced by lymphocytes', src: [L7, 54] },
  { k: 'substance', id: 'p8_interleukins', l: 'Interleukins', match: 'interleukins', parent: 'p8_cytokines', w: 8, line: 'cytokines involved in cellular communication', src: [L7, 54] },
  { k: 'substance', id: 'p8_growth_factors', l: 'Growth factors', match: 'Growth factors', parent: 'p_paracrine', w: 8, line: 'regulators that promote growth and cell division', src: [L7, 54, 19] },
  { k: 'substance', id: 'p8_neutrophins', l: 'Neutrophins', match: 'Neutrophins', parent: 'p_paracrine', w: 8, line: 'provides trophic support for normal and regenerating neurons', src: [L7, 54] },
];
