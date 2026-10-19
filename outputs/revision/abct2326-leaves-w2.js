/*
 * ABCT2326 · Week 2 leaves — blood, vessels, and heart.
 *
 * Read off ABCT2326 Cardiovascular System.pdf (phys.l2.2026), pages 3–68.
 * One row per unit the slides teach (part, cell, substance, process, group).
 * Row kinds and fields: outputs/revision/leaves.js. Rules: outputs/revision/rules.js.
 * Recipe: docs/superpowers/plans/2026-10-19-physiology-revise.md (Recipe P).
 */
const L2 = 'phys.l2.2026';

export const SOURCES = {
  [L2]: 'Lecture 2 cardiovascular system slides',
};

export const ROWS = [
  /* ---------------- Composition of blood (p4-5, 7-8) ---------------- */
  { k: 'group', id: 'p2_formed_elements', l: 'Formed elements', match: 'formed elements', parent: 'p_blood', w: 2, line: 'comprise red blood cells, white blood cells, and platelets', src: [L2, 5, 7, 8] },
  { k: 'cell', id: 'p2_rbc', l: 'Red blood cells (erythrocytes)', match: 'Red blood cells', parent: 'p2_formed_elements', w: 2, line: 'flattened biconcave discs lacking nuclei and mitochondria', links: { p2_hemoglobin: 'each red blood cell contains 280 million molecules of' }, src: [L2, 7, 5] },
  { k: 'substance', id: 'p2_hemoglobin', l: 'Hemoglobin', match: 'hemoglobin', parent: 'p2_rbc', w: 2, line: 'each RBC contains 280 million hemoglobin molecules', src: [L2, 7] },
  { k: 'process', id: 'p2_hematocrit', l: 'Hematocrit', match: 'hematocrit', parent: 'p_blood', w: 2, line: 'percentage of RBCs in centrifuged blood sample: 36-46% women, 41-53% men', src: [L2, 5] },
  { k: 'cell', id: 'p2_wbc', l: 'Leukocytes (WBCs)', match: 'leukocytes', parent: 'p2_formed_elements', w: 2, line: 'white blood cells of the formed elements', own: 'White blood cells that defend the body against infections and foreign substances.', src: [L2, 7] },
  { k: 'cell', id: 'p2_platelets', l: 'Platelets (thrombocytes)', match: 'Platelets', parent: 'p2_formed_elements', w: 2, line: 'fragments of megakaryocytes that constitute most of mass of blood clots', links: { p2_megakaryocytes: 'derived from bone marrow' }, src: [L2, 8] },
  { k: 'cell', id: 'p2_megakaryocytes', l: 'Megakaryocytes', match: 'megakaryocytes', parent: 'p_blood', w: 2, line: 'bone marrow cells whose fragments form platelets', src: [L2, 8] },

  /* ---------------- Plasma (p6) ---------------- */
  { k: 'group', id: 'p2_plasma_proteins', l: 'Plasma proteins', match: 'Plasma proteins', parent: 'p_plasma', w: 2, line: 'albumins, globulins, and fibrinogen constituting 7-9% of plasma', src: [L2, 6] },
  { k: 'substance', id: 'p2_albumin', l: 'Albumin', match: 'Albumin', parent: 'p2_plasma_proteins', w: 2, line: 'creates colloid osmotic pressure to maintain blood volume and pressure', src: [L2, 6] },
  { k: 'substance', id: 'p2_globulins', l: 'Globulins', match: 'Globulins', parent: 'p2_plasma_proteins', w: 2, line: 'plasma proteins that carry lipids', src: [L2, 6] },
  { k: 'substance', id: 'p2_gamma_globulins', l: 'Gamma globulins', match: 'Gamma globulins', parent: 'p2_globulins', w: 2, line: 'antibodies functioning in immune defense', own: 'Plasma proteins produced by the immune system that act as circulating antibodies.', src: [L2, 6] },
  { k: 'substance', id: 'p2_fibrinogen', l: 'Fibrinogen', match: 'Fibrinogen', parent: 'p2_plasma_proteins', w: 2, line: 'clotting factor converted to fibrin', acts: { p2_fibrin: 'converted into' }, src: [L2, 6] },
  { k: 'substance', id: 'p2_fibrin', l: 'Fibrin', match: 'fibrin', parent: 'p2_fibrinogen', w: 2, line: 'insoluble protein converted from fibrinogen', own: 'An insoluble protein that polymerizes into threads to form the structural framework of a blood clot.', src: [L2, 6] },
  { k: 'substance', id: 'p2_serum', l: 'Serum', match: 'Serum', parent: 'p_plasma', w: 2, line: 'fluid left when blood clots', src: [L2, 6] },

  /* ---------------- Blood vessels (p9-10, 12-13, 15-16) ---------------- */
  { k: 'part', id: 'p2_endothelium', l: 'Endothelium', match: 'endothelium', parent: 'p_vessels', w: 2, line: 'innermost layer of all vessels; capillaries consist of only endothelial cells', src: [L2, 10] },
  { k: 'part', id: 'p2_tunica_interna', l: 'Tunica interna', match: 'interna', parent: 'p_vessels', w: 2, line: 'made of endothelium, basement membrane, and elastin', src: [L2, 10] },
  { k: 'part', id: 'p2_tunica_media', l: 'Tunica media', match: 'Media', parent: 'p_vessels', w: 2, line: 'middle layer mostly made of smooth muscle', src: [L2, 10] },
  { k: 'part', id: 'p2_tunica_externa', l: 'Tunica externa', match: 'Externa', parent: 'p_vessels', w: 2, line: 'outer layer composed of connective tissue', src: [L2, 10] },
  { k: 'part', id: 'p2_arteries', l: 'Arteries', match: 'Arteries', parent: 'p_vessels', w: 2, line: 'carry blood away from heart', src: [L2, 12, 3, 10, 13, 17, 18] },
  { k: 'part', id: 'p2_large_arteries', l: 'Large arteries', match: 'Large arteries', parent: 'p2_arteries', w: 2, line: 'muscular and elastic; expand during systole and recoil during diastole', src: [L2, 12] },
  { k: 'part', id: 'p2_arterioles', l: 'Arterioles', match: 'Arterioles', parent: 'p2_arteries', w: 2, line: 'small muscular arteries providing most resistance in circulatory system', links: { p2_capillaries: 'lead into capillary beds of' }, src: [L2, 12, 3, 13] },
  { k: 'part', id: 'p2_capillaries', l: 'Capillaries', match: 'Capillaries', parent: 'p_vessels', w: 2, line: 'exchange dissolved gases, nutrients, and wastes between blood and tissues', src: [L2, 13, 3, 10, 15, 18] },
  { k: 'part', id: 'p2_precap_sphincters', l: 'Precapillary sphincters', match: 'precapillary sphincters', parent: 'p2_capillaries', w: 2, line: 'determine blood flow through a capillary bed', src: [L2, 13] },
  { k: 'part', id: 'p2_continuous_cap', l: 'Continuous capillaries', match: 'continuous capillaries', parent: 'p2_capillaries', w: 2, line: 'endothelial cells tightly joined, permitting exchange of molecules smaller than proteins', src: [L2, 15] },
  { k: 'part', id: 'p2_fenestrated_cap', l: 'Fenestrated capillaries', match: 'Fenestrated capillaries', parent: 'p2_capillaries', w: 2, line: 'contain pores allowing rapid exchange of water and solutes', src: [L2, 15] },
  { k: 'part', id: 'p2_veins', l: 'Veins', match: 'Veins', parent: 'p_vessels', w: 2, line: 'carry blood to heart; compliant with low pressure about 2 mm Hg', src: [L2, 16, 3, 10, 13, 18] },
  { k: 'process', id: 'p2_skeletal_muscle_pump', l: 'Skeletal muscle pump', match: 'skeletal muscle pump', parent: 'p2_veins', w: 2, line: 'contraction of surrounding skeletal muscles moves blood toward heart', next: { p_heart: 'moves venous blood toward' }, src: [L2, 16] },
  { k: 'part', id: 'p2_venous_valves', l: 'Venous valves', match: 'venous valves', parent: 'p2_veins', w: 2, line: 'one-way valves ensure blood moves only toward heart', src: [L2, 16] },

  /* ---------------- Pulmonary and systemic circulations (p17-19) ---------------- */
  { k: 'process', id: 'p2_pulm_circuit', l: 'Pulmonary circulation', match: 'Pulmonary circulation', parent: 'p_circuits', w: 2, line: 'path of blood from right ventricle through lungs and back to heart', next: { p2_systemic_circuit: 'delivers oxygenated blood to' }, src: [L2, 17, 18, 19] },
  { k: 'process', id: 'p2_systemic_circuit', l: 'Systemic circulation', match: 'Systemic circulation', parent: 'p_circuits', w: 2, line: 'path of blood from left ventricle to body and back to heart', next: { p2_pulm_circuit: 'returns deoxygenated blood to' }, src: [L2, 17, 18, 19] },
  { k: 'part', id: 'p2_vena_cavae', l: 'Superior and inferior vena cavae', match: 'vena cavae', parent: 'p_circuits', w: 2, line: 'deliver blood from tissues into right atrium', links: { p2_atria: 'empty venous blood into' }, src: [L2, 19] },
  { k: 'part', id: 'p2_pulm_arteries', l: 'Pulmonary arteries', match: 'pulmonary arteries', parent: 'p_circuits', w: 2, line: 'carry blood from right ventricle to lungs', links: { p2_pulm_circuit: 'carry blood for' }, src: [L2, 19, 18, 33] },
  { k: 'part', id: 'p2_pulm_veins', l: 'Pulmonary veins', match: 'pulmonary veins', parent: 'p_circuits', w: 2, line: 'carry oxygenated blood from lungs to left atrium', links: { p2_atria: 'deliver oxygenated blood into' }, src: [L2, 19, 18, 36] },
  { k: 'part', id: 'p2_aorta', l: 'Aorta', match: 'aorta', parent: 'p_circuits', w: 2, line: 'distributes oxygenated blood from left ventricle to body', src: [L2, 19, 29, 33, 38] },

  /* ---------------- Structure of the heart (p20-31) ---------------- */
  { k: 'part', id: 'p2_epicardium', l: 'Epicardium', match: 'Epicardium', parent: 'p_heart', w: 2, line: 'outer layer and visceral pericardium covering the heart', src: [L2, 21, 22] },
  { k: 'part', id: 'p2_myocardium', l: 'Myocardium', match: 'Myocardium', parent: 'p_heart', w: 2, line: 'middle muscular wall formed of concentric layers of cardiac muscle tissue', src: [L2, 21, 22] },
  { k: 'part', id: 'p2_endocardium', l: 'Endocardium', match: 'Endocardium', parent: 'p_heart', w: 2, line: 'inner layer of simple squamous epithelium', src: [L2, 21, 22] },
  { k: 'cell', id: 'p2_cardiac_myocytes', l: 'Cardiac muscle cells', match: 'Cardiac muscle cells', parent: 'p_heart', w: 2, line: 'small cells with single central nucleus and branching interconnections', src: [L2, 26, 21, 22, 23, 24] },
  { k: 'part', id: 'p2_intercalated_discs', l: 'Intercalated discs', match: 'Intercalated discs', parent: 'p2_cardiac_myocytes', w: 2, line: 'interconnect cardiac muscle cells, convey force and propagate action potentials', src: [L2, 23, 24, 25, 26] },
  { k: 'part', id: 'p2_desmosomes', l: 'Desmosomes', match: 'desmosomes', parent: 'p2_intercalated_discs', w: 2, line: 'secure intercalated discs between adjacent cardiac muscle cells', src: [L2, 23, 25] },
  { k: 'part', id: 'p2_gap_junctions', l: 'Gap junctions', match: 'gap junctions', parent: 'p2_intercalated_discs', w: 2, line: 'link cardiac muscle cells to propagate action potentials', src: [L2, 23, 25, 52] },
  { k: 'part', id: 'p2_atria', l: 'Atria', match: 'atria', parent: 'p_heart', w: 2, line: 'two chambers receiving blood from the venous system', src: [L2, 27, 21, 28, 29, 32] },
  { k: 'part', id: 'p2_ventricles', l: 'Ventricles', match: 'ventricles', parent: 'p_heart', w: 2, line: 'two chambers that pump blood into arteries', src: [L2, 27, 21, 28, 29, 30, 31, 32] },
  { k: 'part', id: 'p2_muscular_septum', l: 'Muscular septum', match: 'muscular septum', parent: 'p_heart', w: 2, line: 'separates the two pump sides of the heart', src: [L2, 27, 54] },
  { k: 'part', id: 'p2_cardiac_skeleton', l: 'Cardiac skeleton', match: 'cardiac (fibrous) skeleton', parent: 'p_heart', w: 2, line: 'dense connective tissue encircling valves and electrically insulating atria from ventricles', src: [L2, 29, 35, 37] },
  { k: 'part', id: 'p2_right_ventricle', l: 'Right ventricle', match: 'Right ventricle', parent: 'p2_ventricles', w: 2, line: 'pouch-shaped with thinner wall, developing less pressure than left ventricle', src: [L2, 30, 18, 19, 31, 33, 35] },
  { k: 'part', id: 'p2_left_ventricle', l: 'Left ventricle', match: 'Left ventricle', parent: 'p2_ventricles', w: 2, line: 'round with thicker wall, developing higher pressure than right ventricle', src: [L2, 30, 18, 19, 31, 33, 35] },

  /* ---------------- Heart valves (p32-38) ---------------- */
  { k: 'part', id: 'p2_av_valves', l: 'Atrioventricular (AV) valves', match: 'atrioventricular (AV) valves', parent: 'p_valves', w: 2, line: 'one-way valves permitting blood flow from atria into ventricles', src: [L2, 32, 34, 35, 37, 67, 68] },
  { k: 'part', id: 'p2_tricuspid_valve', l: 'Tricuspid valve', match: 'tricuspid valve', parent: 'p2_av_valves', w: 2, line: 'one-way valve between right atrium and right ventricle', src: [L2, 32, 35, 37] },
  { k: 'part', id: 'p2_bicuspid_valve', l: 'Bicuspid (mitral) valve', match: 'bicuspid', parent: 'p2_av_valves', w: 2, line: 'one-way valve between left atrium and left ventricle', src: [L2, 32, 35, 36, 37, 38] },
  { k: 'part', id: 'p2_semilunar_valves', l: 'Semilunar valves', match: 'Seminlunar valves', parent: 'p_valves', w: 2, line: 'prevent backflow from pulmonary arteries and aorta into ventricles', src: [L2, 33, 34, 35, 37, 67, 68] },
  { k: 'part', id: 'p2_pulmonary_valve', l: 'Pulmonary valve', match: 'pulmonary', parent: 'p2_semilunar_valves', w: 2, line: 'semilunar valve preventing backflow from pulmonary arteries into right ventricle', src: [L2, 33, 34, 35, 37] },
  { k: 'part', id: 'p2_aortic_valve', l: 'Aortic valve', match: 'aortic', parent: 'p2_semilunar_valves', w: 2, line: 'semilunar valve preventing backflow from aorta into left ventricle', src: [L2, 33, 34, 35, 36, 37, 38] },
  { k: 'part', id: 'p2_papillary_muscles', l: 'Papillary muscles', match: 'papillary muscles', parent: 'p_valves', w: 2, line: 'contract during ventricular contraction to prevent AV valves from everting', links: { p2_chordae_tendineae: 'anchor AV valve cusps via' }, src: [L2, 34, 35, 36, 38, 54] },
  { k: 'part', id: 'p2_chordae_tendineae', l: 'Chordae tendineae', match: 'chorda tendinea', parent: 'p_valves', w: 2, line: 'cords connecting papillary muscles to AV valves to prevent eversion', links: { p2_av_valves: 'prevent eversion of' }, src: [L2, 34, 35, 36, 38] },

  /* ---------------- The conducting system (p39-55) ---------------- */
  { k: 'cell', id: 'p2_conducting_cells', l: 'Conducting cells', match: 'Conducting cells', parent: 'p_conduction', w: 2, line: 'initiate and distribute electrical impulses that stimulate contraction', src: [L2, 40, 42, 43, 49] },
  { k: 'cell', id: 'p2_contractile_cells', l: 'Contractile cells', match: 'Contractile cells', parent: 'p_conduction', w: 2, line: 'produce contractions that propel blood', src: [L2, 40, 41] },
  { k: 'part', id: 'p2_sa_node', l: 'Sinoatrial (SA) node', match: 'Sinoatrial (SA) node', parent: 'p_conduction', w: 2, line: 'in posterior wall of right atrium; pacemaker establishing heart rate', links: { p2_av_node: 'connected by internodal pathways to' }, src: [L2, 42, 41, 44, 49, 50, 51, 52, 53, 56] },
  { k: 'part', id: 'p2_internodal_pathways', l: 'Internodal pathways', match: 'internodal pathways', parent: 'p2_sa_node', w: 2, line: 'connect SA node to AV node across atrial myocardium', src: [L2, 43, 44] },
  { k: 'part', id: 'p2_av_node', l: 'Atrioventricular (AV) node', match: 'Atrioventricular (AV) node', parent: 'p_conduction', w: 2, line: 'in floor of right atrium; delays impulse so atrial contraction completes', links: { p2_av_bundle: 'delivers impulse to' }, src: [L2, 42, 43, 44, 52, 53] },
  { k: 'part', id: 'p2_av_bundle', l: 'AV bundle (bundle of His)', match: 'AV bundle', parent: 'p_conduction', w: 2, line: 'in septum; carries impulse to bundle branches', links: { p2_purkinje_fibers: 'conducts to Purkinje fibers via bundle branches' }, src: [L2, 52, 43, 54] },
  { k: 'part', id: 'p2_bundle_branches', l: 'Bundle branches', match: 'bundle branches', parent: 'p2_av_bundle', w: 2, line: 'left and right branches conducting impulse to Purkinje fibers', links: { p2_purkinje_fibers: 'conduct to' }, src: [L2, 54, 43] },
  { k: 'part', id: 'p2_moderator_band', l: 'Moderator band', match: 'moderator band', parent: 'p2_av_bundle', w: 2, line: 'conducts impulse to papillary muscles', src: [L2, 54] },
  { k: 'part', id: 'p2_purkinje_fibers', l: 'Purkinje fibers', match: 'Purkinje fibers', parent: 'p_conduction', w: 2, line: 'distribute impulse through ventricles; ventricular contraction begins', src: [L2, 55, 54] },
  { k: 'process', id: 'p2_pacemaker_potential', l: 'Pacemaker potential (prepotential)', match: 'Pacemaker potential', parent: 'p_conduction', w: 2, line: 'membrane voltage starts at around minus 60 mV and depolarizes to minus 40 mV', next: { p2_sa_depol: 'depolarizes to threshold triggering' }, src: [L2, 49, 50, 51] },
  { k: 'part', id: 'p2_hcn_channels', l: 'HCN channels', match: 'HCN channel', parent: 'p2_pacemaker_potential', w: 2, line: 'channels open when hyperpolarized, causing spontaneous Na+ influx', src: [L2, 50, 51] },
  { k: 'process', id: 'p2_sa_depol', l: 'SA node depolarization', match: 'depolarization', parent: 'p2_pacemaker_potential', w: 2, line: 'voltage-gated Ca2+ channels open at minus 40 mV threshold creating upstroke', next: { p2_sa_repol: 'leads to repolarization' }, src: [L2, 50, 51] },
  { k: 'process', id: 'p2_sa_repol', l: 'SA node repolarization', match: 'Repolarization', parent: 'p2_pacemaker_potential', w: 2, line: 'repolarization via opening of voltage-gated K+ channels and K+ efflux', src: [L2, 50, 51] },

  /* ---------------- Myocardial action potential (p56-58) ---------------- */
  { k: 'process', id: 'p2_myo_depol', l: 'Myocardial depolarization', match: 'depolarization', parent: 'p_myoap', w: 2, line: 'upstroke occurs as voltage-gated Na+ channels open and Na+ enters cells', next: { p2_myo_plateau: 'leads to plateau phase' }, src: [L2, 56, 58] },
  { k: 'process', id: 'p2_myo_plateau', l: 'Plateau phase', match: 'plateau phase', parent: 'p_myoap', w: 2, line: 'lasts 200-300 msec due to balance between Ca2+ influx and K+ efflux', next: { p2_myo_repol: 'leads to repolarization' }, src: [L2, 56, 58] },
  { k: 'process', id: 'p2_myo_repol', l: 'Myocardial repolarization', match: 'Repolarization', parent: 'p_myoap', w: 2, line: 'repolarization due to opening of extra voltage-gated K+ channels', src: [L2, 56, 58] },

  /* ---------------- Refractory periods (p59-60) ---------------- */
  { k: 'process', id: 'p2_abs_refractory', l: 'Absolute refractory period', match: 'Absolute refractory period', parent: 'p_refractory', w: 2, line: 'long period where cardiac cells cannot respond, preventing summation and tetany', next: { p2_rel_refractory: 'followed by relative refractory period' }, src: [L2, 59] },
  { k: 'process', id: 'p2_rel_refractory', l: 'Relative refractory period', match: 'Relative refractory period', parent: 'p_refractory', w: 2, line: 'short period where response depends on degree of stimulus', src: [L2, 59] },

  /* ---------------- Electrocardiogram (p61-63) ---------------- */
  { k: 'process', id: 'p2_p_wave', l: 'P wave', match: 'P wave', parent: 'p_ecg', w: 2, line: 'atria depolarize', own: 'An electrocardiogram deflection produced by depolarization of the atria prior to contraction.', next: { p2_qrs_complex: 'followed by ventricular depolarization' }, src: [L2, 62] },
  { k: 'process', id: 'p2_qrs_complex', l: 'QRS complex', match: 'QRS complex', parent: 'p_ecg', w: 2, line: 'ventricles depolarize', own: 'An electrocardiogram waveform produced by the depolarization of the ventricles.', next: { p2_t_wave: 'followed by ventricular repolarization' }, src: [L2, 62] },
  { k: 'process', id: 'p2_t_wave', l: 'T wave', match: 'T wave', parent: 'p_ecg', w: 2, line: 'ventricles repolarize', own: 'An electrocardiogram deflection produced by the repolarization of the ventricles.', src: [L2, 62] },
  { k: 'process', id: 'p2_pr_interval', l: 'P–R interval', match: 'P–R interval', parent: 'p_ecg', w: 2, line: 'from start of atrial depolarization to start of QRS complex', src: [L2, 62] },
  { k: 'process', id: 'p2_qt_interval', l: 'Q–T interval', match: 'Q–T interval', parent: 'p_ecg', w: 2, line: 'from ventricular depolarization to ventricular repolarization', src: [L2, 62] },

  /* ---------------- Cardiac cycle (p64-68) ---------------- */
  { k: 'process', id: 'p2_systole', l: 'Systole', match: 'Systole', parent: 'p_cardiaccycle', w: 2, line: 'contraction phase of the heart chambers', next: { p2_diastole: 'followed by diastole' }, src: [L2, 65, 12, 66] },
  { k: 'process', id: 'p2_diastole', l: 'Diastole', match: 'Diastole', parent: 'p_cardiaccycle', w: 2, line: 'relaxation phase of the heart chambers', next: { p2_systole: 'followed by systole' }, src: [L2, 65, 12, 66] },
  { k: 'process', id: 'p2_edv', l: 'End-diastolic volume (EDV)', match: 'End-diastolic volume', parent: 'p_cardiaccycle', w: 2, line: 'volume of blood in ventricles at end of diastole', next: { p2_stroke_volume: 'determines stroke volume via Frank-Starling mechanism' }, src: [L2, 66] },
  { k: 'process', id: 'p2_stroke_volume', l: 'Stroke volume (SV)', match: 'Stroke volume', parent: 'p_cardiaccycle', w: 2, line: 'amount of blood ejected from ventricles during systole', src: [L2, 66] },
  { k: 'process', id: 'p2_esv', l: 'End-systolic volume (ESV)', match: 'End-systolic volume', parent: 'p_cardiaccycle', w: 2, line: 'amount of blood left in ventricles at end of systole', src: [L2, 66] },
  { k: 'process', id: 'p2_frank_starling', l: 'Frank-Starling Law', match: 'Frank-Starling Law', parent: 'p_cardiaccycle', w: 2, line: 'stroke volume increases as the end-diastolic volume increases', src: [L2, 66] },
  { k: 'process', id: 'p2_s1', l: 'First heart sound (S1)', match: 'S1', parent: 'p_cardiaccycle', w: 2, line: 'loud sound produced by closure of AV valves', next: { p2_s2: 'followed by second heart sound' }, src: [L2, 67, 68] },
  { k: 'process', id: 'p2_s2', l: 'Second heart sound (S2)', match: 'S2', parent: 'p_cardiaccycle', w: 2, line: 'loud sound produced by closure of semilunar valves', src: [L2, 67, 68] },
];
