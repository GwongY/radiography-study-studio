/*
 * Revise rows the lecturers said to take more focus on: they carry a star (★) in the Map and in the notes.
 *
 * subject -> { row id: where the lecturer said it, as a position in the lecture recording }. The position is
 * the owner's own record of what was said; it shows only as the star's tooltip. The star is not a fact and
 * not a source: it marks a row, and a row's content still comes from the slides (work/revision-check.mjs
 * holds every id here to a real row). ABCT2326 week 1 centrioles: the owner says the arrangement is asked in
 * the mid-term, whatever the lecture said.
 */
const same = (where, ids) => Object.fromEntries(ids.map((id) => [id, where]));

export const FOCUS = {
  HSS2011: {
    ...same('W1 1:20:27–1:23:12, the six synovial joint types and their examples', ['w1_syntypes', 'w1_t_plane', 'w1_t_hinge', 'w1_t_pivot', 'w1_t_condyloid', 'w1_t_saddle', 'w1_t_ball']),
    ...same('W1 1:13:52–1:18:35, synovial joint parts and the meniscus', ['w1_synparts', 'w1_articcapsule', 'w1_synovialmem', 'w1_articcart', 'w1_meniscus']),
    ...same('W1 1:32:37, extrinsic versus intrinsic ligaments', ['w1_intrinsic', 'w1_extrinsic']),
    ...same('W1 1:45:07, contraction versus tone', ['w1_tone']),
    ...same('W2 1:10:20–1:11:11, hip flexion', ['w2_psoas', 'w2_sartorius', 'w2_tfl', 'w2_pectineus']),
    ...same('W2 1:24:12–1:28:19, plantar flexors and the naming logic', ['w2_suppost', 'w2_ta', 'w2_tp', 'w2_fl', 'w2_fb']),
    ...same('W4 1:53:25, the four leg compartments', ['w2_legcomp', 'w2_antleg', 'w2_latleg', 'w2_deeppost']),
    ...same('W4 1:42:57, erector spinae', ['w4_erector']),
    ...same('W4 1:33–1:37, the diaphragm and breathing', ['w9_diaphragm', 'breathing']),
    ...same('W4 1:46–1:48, the abdominal wall', ['w4_extoblique', 'w4_transabd']),
    ...same('W4 1:51:09–1:51:33, ankle ligaments', ['w2_atfl']),
    ...same('W3 1:01:33, the rotator cuff', ['w3_rotcuff', 'w3_subscap', 'w3_supraspin', 'w3_infraspin', 'w3_teresmin']),
    ...same('W7 27:38–28:29, the sensory pathway', ['sensorypath']),
    ...same('W7 1:36:19–1:38:30, photoreceptors to ganglion cells', ['w7_photoreceptors', 'w7_rods', 'w7_cones', 'w7_bipolar', 'w7_ganglion']),
    ...same('W7 1:46:23–1:48:19, the autonomic nervous system', ['ans', 'w7_ans_overview', 'w7_sympdiv', 'w7_parasympdiv', 'w7_autoganglion']),
    ...same('W8 1:36, the pulmonary and systemic circuits', ['circuits', 'w8_pulm', 'w8_syst']),
    ...same('W8 1:29:41, the portal vein', ['w8_portal']),
    ...same('W5 0:39–0:44, CSF, the blood–brain barrier and microglia', ['w6_csf', 'w6_bbbarrier', 'w5_astrocytes', 'w5_microglia']),
  },
  ABCT2326: {
    ...same('Asked in the mid-term: how the centrioles are arranged', ['p1_centrioles']),
    ...same('L1 0:46:03, DNA, chromatin and chromosome', ['p1_dna', 'p1_chromatin']),
    ...same('L1 0:45:39, the nucleolus', ['p1_nucleolus']),
    ...same('L1 1:07:23, smooth ER makes no protein', ['p1_smooth_er']),
    ...same('L1 0:31–0:34, membrane protein types', ['p1_membrane_proteins']),
    ...same('L2 0:40–0:46, albumin and plasma proteins', ['p2_albumin', 'p2_plasma_proteins']),
    ...same('L2 1:03:18, pre-capillary sphincters', ['p2_precap_sphincters']),
    ...same('L2–L3, conducting and contractile cells, hyperpolarisation, the T wave', ['p2_conducting_cells', 'p2_contractile_cells', 'p2_hyperpolarization', 'p2_t_wave']),
    ...same('L3 1:31–1:40, vital capacity', ['p3_vital_capacity']),
    ...same('L3 1:09:28, surfactant', ['p3_surfactant']),
    ...same('L3 1:12:19, 760 mmHg; L4 0:04–0:06, PO₂', ['p3_partial_pressures']),
    ...same('L4 0:09:53, haemoglobin saturation', ['p3_hb_saturation']),
    ...same('L4 0:13–0:19, the Bohr effect', ['p3_bohr_effect']),
    ...same('L4 0:27:07, the bicarbonate buffer', ['p3_bicarbonate']),
    ...same('L4 1:11:26, intrinsic factor and B12', ['p4_intrinsic_factor']),
    ...same('L4 1:35:52, pancreatic enzymes and the sphincter', ['p4_pancreatic_juice', 'p4_hepatopancreatic_sphincter']),
    ...same('L4 1:40:38, bile salts', ['p4_bile_salts']),
    ...same('L5 0:14:04, CCK and bile', ['p4_cck']),
    ...same('L5 0:41:28, afferent and efferent arterioles', ['p5_afferent_arteriole', 'p5_efferent_arteriole']),
    ...same('L5 0:54:01, GFR', ['p_gfr']),
    ...same('L5 1:33:02, ADH', ['p5_adh']),
    ...same('L5 1:37:40, aldosterone', ['p5_aldosterone']),
    ...same('Endo 0:16:51, T4 becomes active T3', ['p8_t4', 'p8_t3']),
    ...same('Endo 0:38:12, cAMP', ['p8_camp']),
    ...same('Endo 1:09:01, the posterior pituitary', ['p8_posterior_pit']),
    ...same('Endo 1:26:46, adrenal cortex versus medulla', ['p8_adrenal_cortex', 'p8_adrenal_medulla']),
    ...same('Repro 0:22:12, Sertoli versus Leydig cells', ['p7_sertoli', 'p7_leydig']),
    ...same('Repro 1:36:46, hCG keeps the corpus luteum', ['p8_hcg']),
  },
};
