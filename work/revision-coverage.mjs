/*
 * Revise coverage targets — what work/revision-check.mjs holds a subject's Threads,
 * Tables and Decoder to, so they cannot silently stay thin again.
 *
 * Written from the gap analysis in
 * docs/superpowers/notes/2026-10-20-physiology-gap-analysis.md (read the 2026 lecture
 * decks, every week). Only subjects whose fragments are data (ABCT2326) are held here;
 * HSS2011's are ported HTML.
 *
 *   minSteps     thread steps every teaching week with content must have
 *   minRows      table rows every teaching week with content must have
 *   concepts     the cross-chapter concepts of the gap analysis: each has its own
 *                thread `th`, and every box in `boxes` must be a step of it
 *   skipCross    boxes whose name is printed on two or more lectures' slides but that
 *                are not a concept worth a step: id → why (the check computes the names)
 */
export const COVERAGE = {
  ABCT2326: {
    minSteps: 4,
    minRows: 2,
    concepts: [
      { name: 'ATP and ion pumps', th: 't7', boxes: ['p1_mitochondria', 'p4_parietal_cells', 'p5_nak_pump', 'p8_camp', 'p9_na_k_pump', 'p11_ca_atpase', 'p11_atp'] },
      { name: 'Gradients and membrane transport', th: 't8', boxes: ['p1_cytosol', 'p1_ecf', 'p1_carrier_proteins', 'p1_membrane_channels', 'p4_ion_absorption', 'p5_coupled_transport', 'p5_facilitated_diffusion', 'p9_conc_gradient', 'p11_glut4'] },
      { name: 'Osmosis and water balance', th: 't9', boxes: ['p2_albumin', 'p4_water_absorption', 'p5_osmosis_h2o', 'p5_aquaporins', 'p5_adh', 'p8_adh'] },
      { name: 'Action potentials in heart, nerve and muscle', th: 't10', boxes: ['p2_threshold', 'p2_myo_depol', 'p4_visc_smooth', 'p9_threshold', 'p9_depolarization', 'p11_sarcolemma_ap'] },
      { name: 'Calcium as a signal', th: 't11', boxes: ['p2_sa_depol', 'p2_myo_plateau', 'p7_cortical_ca', 'p8_calmodulin', 'p8_pth', 'p11_calcium', 'p11_ca_homeostasis'] },
      { name: 'Receptors and second messengers', th: 't12', boxes: ['p1_receptor_proteins', 'p5_muscarinic_receptors', 'p8_gpcr', 'p9_chem_channels', 'p11_ach_receptors', 'p12_tlr'] },
      { name: 'Sensors that start a reflex', th: 't13', boxes: ['p1_homeo_receptor', 'p3_chemoreceptors', 'p5_osmoreceptors', 'p11_golgi_tendon_organs'] },
      { name: 'DNA, histones, chromosomes and gametes', th: 't14', boxes: ['p1_histones', 'p1_dna', 'p1_oocyte', 'p1_sperm', 'p1_gametes', 'p7_spermatogonia', 'p7_primary_oocytes', 'p7_secondary_oocyte', 'p7_ovum'] },
      { name: 'Glucose and fuel', th: 't15', boxes: ['p4_panc_amylase', 'p5_glucose', 'p8_insulin', 'p8_glucagon', 'p11_glut4', 'p11_glycogen'] },
      { name: 'Acid, bicarbonate and pH', th: 't16', boxes: ['p3_carbonic_anhydrase', 'p3_bicarbonate', 'p4_carbonic_anhydrase', 'p4_hcl', 'p5_plasma_ph', 'p5_phosphate_buffer', 'p11_lactic_acid'] },
      { name: 'White cells before the immunity lecture', th: 't17', boxes: ['p1_wbc', 'p2_gamma_globulins', 'p3_alveolar_macrophages', 'p9_microglia', 'p12_microglia', 'p12_alveolar_macro', 'p12_antibodies'] },
      { name: 'Smooth muscle', th: 't18', boxes: ['p1_smooth_muscle_t', 'p2_tunica_media', 'p4_visc_smooth', 'p5_detrusor', 'p7_myometrium'] },
      { name: 'Autonomic nerves', th: 't19', boxes: ['p4_long_reflexes', 'p5_sympathetic_gfr', 'p7_emission', 'p8_adrenal_medulla', 'p9_sympathetic_div', 'p9_parasympathetic_div'] },
      { name: 'Capillaries and exchange', th: 't20', boxes: ['p2_capillaries', 'p2_fenestrated_cap', 'p3_alveoli', 'p5_fenestrated_capillaries', 'p8_portal_system', 'p9_bbb'] },
      { name: 'Hemoglobin and myoglobin', th: 't21', boxes: ['p2_hemoglobin', 'p3_hemoglobin', 'p3_oxyhemoglobin', 'p11_myoglobin'] },
      { name: 'Enzymes', th: 't22', boxes: ['p1_mp_enzymes', 'p1_lysosomes', 'p4_pepsinogen', 'p4_pepsin', 'p4_trypsinogen', 'p5_ace', 'p9_ache_substance', 'p11_ache'] },
      { name: 'Homeostasis and feedback', th: 't3', boxes: ['p1_neg_feedback', 'p1_pos_feedback', 'p3_hypercapnia', 'p5_countercurrent_multiplier', 'p8_short_feedback'] },
    ],
    skipCross: {
      p1_tis_cell: 'the word "cell" is on nearly every slide of every lecture; the box is the tissue tutorial\'s heading, not a concept',
      p7_sperm_head: '"Head" on the other lectures is a different head (phospholipid heads, myosin heads, head of pancreas)',
      p7_sperm_tail: '"Tail" on the other lectures is a different tail (fatty-acid tails, tail of pancreas)',
      p3_trachea: 'week 1 names the trachea only as an example site of ciliated epithelium (tissue tutorial p14)',
      p4_salivary_glands: 'week 1 names salivary glands only as an example site of stratified cuboidal epithelium (tissue tutorial p15)',
      p4_tongue: 'on the respiratory slides the tongue is only a label on the figure of the airway (week 3 p5)',
      p4_colon: 'on the reproductive slides the colon is only a label on a figure of the female pelvis (week 7 p20)',
      p4_sigmoid_colon: 'on the reproductive slides the sigmoid colon is only a label on a figure of the female pelvis (week 7 p20)',
    },
  },
};
