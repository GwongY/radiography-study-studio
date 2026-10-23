/*
 * ABCT2326 · Week 3 leaves — breathing.
 *
 * Read off ABCT2326 Respiratory System.pdf (phys.l3.2026), pages 3–74.
 * One row per unit the slides teach (part, cell, substance, process, group).
 * Row kinds and fields: outputs/revision/leaves.js. Rules: outputs/revision/rules.js.
 * Recipe: docs/superpowers/plans/2026-10-19-physiology-revise.md (Recipe P).
 */
const L3 = 'phys.l3.2026';

export const SOURCES = {
  [L3]: 'Lecture 3 respiratory system slides',
};

export const ROWS = [
  /* ---------------- Respiratory system (p3-8) ---------------- */
  { k: 'part', id: 'p3_upper_resp', l: 'Upper respiratory system', match: 'Upper respiratory system', parent: 'p_resp_sys', w: 3, line: 'above the larynx', own: 'The airway above the larynx, where inhaled air is warmed, moistened and filtered before it reaches the lungs.', src: [L3, 4, 5] },
  { k: 'part', id: 'p3_nose', l: 'Nose', parent: 'p3_upper_resp', w: 3, own: 'Its nasal cavity warms, moistens and filters the incoming air, and the hairs at the entrance trap large particles.', src: [L3, 5] },
  { k: 'part', id: 'p3_nasal_cavity', l: 'Nasal cavity', match: 'Nasal cavity', parent: 'p3_upper_resp', w: 3, own: 'The chamber behind the nose where air is warmed and humidified; its lining traps dust and moves mucus backwards.', src: [L3, 5, 6] },
  { k: 'part', id: 'p3_sinuses', l: 'Sinuses', parent: 'p3_upper_resp', w: 3, own: 'They help reduce the weight of the skull bones.', src: [L3, 5] },
  { k: 'part', id: 'p3_pharynx', l: 'Pharynx', parent: 'p3_upper_resp', w: 3, own: 'It lies behind the nasal cavity and mouth and continues down to the larynx.', src: [L3, 5] },
  { k: 'part', id: 'p3_lower_resp', l: 'Lower respiratory system', match: 'Lower respiratory system', parent: 'p_resp_sys', w: 3, line: 'below the larynx', own: 'The airways and lungs below the larynx, where gas exchange with the blood takes place in the alveoli.', src: [L3, 4, 5] },
  { k: 'part', id: 'p3_larynx', l: 'Larynx', parent: 'p3_lower_resp', w: 3, own: 'Holds the vocal folds that produce sound, and closes the airway to keep food out of the trachea.', src: [L3, 4, 5] },
  { k: 'part', id: 'p3_trachea', l: 'Trachea', parent: 'p3_lower_resp', w: 3, own: 'A rigid airway lined with ciliated epithelium, whose cilia sweep mucus and trapped debris up towards the pharynx.', src: [L3, 5, 7] },
  { k: 'part', id: 'p3_bronchi', l: 'Bronchus', parent: 'p3_lower_resp', w: 3, own: 'Each branch divides repeatedly into smaller airways inside a lung.', src: [L3, 5, 7] },
  { k: 'part', id: 'p3_bronchioles', l: 'Bronchioles', parent: 'p3_lower_resp', w: 3, own: 'Smooth-muscle airways whose changing diameter controls the resistance to airflow and how air spreads through the lungs.', src: [L3, 5, 7, 8] },
  { k: 'part', id: 'p3_terminal_bronchioles', l: 'Terminal bronchioles', match: 'terminal bronchioles', parent: 'p3_lower_resp', w: 3, own: 'The finest conducting airways, which end the conducting portion and lead into the respiratory portion where gas exchange occurs.', src: [L3, 6, 7] },
  { k: 'part', id: 'p3_conducting_portion', l: 'Conducting portion', match: 'conducting portion', parent: 'p_resp_sys', w: 3, line: 'from nasal cavity to terminal bronchioles', src: [L3, 6, 7] },

  /* ---------------- Respiratory portion (p6, 8-10, 12, 13) ---------------- */
  { k: 'part', id: 'p3_resp_bronchioles', l: 'Respiratory bronchioles', match: 'respiratory bronchioles', parent: 'p_resp_portion', w: 3, line: 'wrapped by smooth muscle cells that can change diameter of airways', src: [L3, 6, 7, 8] },
  { k: 'part', id: 'p3_alveolar_ducts', l: 'Alveolar duct', parent: 'p_resp_portion', w: 3, own: 'Passages that connect the respiratory bronchioles to the alveoli, where gas exchange takes place.', src: [L3, 8] },
  { k: 'part', id: 'p3_alveolar_sacs', l: 'Alveolar sac', parent: 'p_resp_portion', w: 3, own: 'Common chambers at the end of the alveolar ducts, each connected to many alveoli where gas exchange occurs.', src: [L3, 8] },
  { k: 'part', id: 'p3_alveoli', l: 'Alveoli', parent: 'p_resp_portion', w: 3, line: 'air-filled pockets within the lungs where all gas exchange takes place', src: [L3, 5, 7, 8, 9] },
  { k: 'cell', id: 'p3_type1_pneumocytes', l: 'Type I pneumocytes', match: 'type I pneumocytes', parent: 'p3_alveoli', w: 3, line: 'thin, delicate cells where majority of gas exchange occurs', links: { p1_simple_epi: 'alveolar epithelium consists of simple squamous epithelium' }, src: [L3, 10, 12] },
  { k: 'cell', id: 'p3_type2_pneumocytes', l: 'Type II pneumocytes', match: 'type II pneumocytes', parent: 'p3_alveoli', w: 3, line: 'septal cells that produce surfactant', makes: { p3_surfactant: 'produce surfactant' }, src: [L3, 10, 12] },
  { k: 'cell', id: 'p3_alveolar_macrophages', l: 'Alveolar macrophages', match: 'alveolar macrophages', parent: 'p3_alveoli', w: 3, line: 'dust cells patrolling the alveolar epithelium', src: [L3, 10, 12] },
  { k: 'substance', id: 'p3_surfactant', l: 'Surfactant', parent: 'p_resp_portion', w: 3, line: 'oily secretion that coats alveolar surfaces and reduces surface tension', acts: { p3_alveoli: 'prevents collapse of the lung' }, src: [L3, 10, 13] },

  /* ---------------- Respiration (p14-16) ---------------- */
  { k: 'process', id: 'p3_external_resp', l: 'External respiration', match: 'External respiration', parent: 'p_respiration', w: 3, line: 'processes involved in exchanging O2 and CO2 with the environment', src: [L3, 14, 15, 16, 42] },
  { k: 'process', id: 'p3_pulmonary_vent_step', l: 'Breathing', match: 'breathing', parent: 'p3_external_resp', w: 3, line: 'physical movement of air into and out of the lungs', src: [L3, 15, 28, 37] },
  { k: 'process', id: 'p3_gas_diffusion', l: 'Gas diffusion', match: 'Gas diffusion', parent: 'p3_external_resp', w: 3, line: 'across membranes and capillaries', src: [L3, 15, 16] },
  { k: 'process', id: 'p3_gas_transport_process', l: 'Transport of O2 and CO2', parent: 'p3_external_resp', w: 3, line: 'between alveolar capillaries and capillary beds in other tissues', src: [L3, 15, 16] },
  { k: 'process', id: 'p3_internal_resp', l: 'Internal respiration', match: 'Internal respiration', parent: 'p_respiration', w: 3, line: 'uptake of O2 and production of CO2 within individual cells', src: [L3, 14, 16, 44] },

  /* ---------------- Pulmonary ventilation (p17-27) ---------------- */
  { k: 'process', id: 'p3_boyles_law', l: 'Boyle’s Law', match: 'Boyle’s Law', parent: 'p_ventilation', w: 3, line: 'defines relationship between gas pressure and volume: P = 1/V', src: [L3, 18, 19] },
  { k: 'process', id: 'p3_resp_cycle', l: 'A respiratory cycle', match: 'A respiratory cycle', parent: 'p_ventilation', w: 3, line: 'consists of an inspiration and an expiration', src: [L3, 20, 28] },
  { k: 'process', id: 'p3_inhalation', l: 'Inhalation', parent: 'p3_resp_cycle', w: 3, line: 'pressure within thoracic cavity decreases, and air flows into lungs', next: { p3_exhalation: 'followed by exhalation' }, src: [L3, 20, 24, 25, 27, 29] },
  { k: 'process', id: 'p3_exhalation', l: 'Exhalation', parent: 'p3_resp_cycle', w: 3, line: 'volume of thoracic cavity decreases, pressure increases, air moves out', src: [L3, 20, 24, 25, 27, 31] },
  { k: 'process', id: 'p3_compliance', l: 'Compliance', parent: 'p_ventilation', w: 3, line: 'an indicator of expandability; low compliance requires greater force', src: [L3, 26] },
  { k: 'process', id: 'p3_atmospheric_pressure', l: 'Atmospheric pressure', match: 'Atmospheric pressure', parent: 'p_ventilation', w: 3, line: 'normal atmospheric pressure: 1 atm = 760 mmHg or 101.325 kPa', src: [L3, 17, 27] },

  /* ---------------- Mechanics of breathing (p28-31) ---------------- */
  { k: 'process', id: 'p3_resp_pump', l: 'Respiratory pump', match: 'respiratory pump', parent: 'p_breathmech', w: 3, line: 'cyclical changes in intrapleural pressure aid in venous return to heart', src: [L3, 28] },
  { k: 'part', id: 'p3_diaphragm', l: 'Diaphragm', parent: 'p_breathmech', w: 3, line: 'contraction draws air into lungs; 75 percent of normal air movement', src: [L3, 5, 21, 22, 24, 25, 29, 30, 31, 70] },
  { k: 'part', id: 'p3_ext_intercostals', l: 'External intercostal muscles', match: 'External intercostal muscles', parent: 'p_breathmech', w: 3, line: 'assist inhalation; 25 percent of normal air movement', src: [L3, 29, 30] },
  { k: 'group', id: 'p3_acc_muscles', l: 'Accessory Respiratory Muscles', match: 'Accessory Respiratory Muscles', parent: 'p_breathmech', w: 3, line: 'accessory muscles assist in elevating ribs', src: [L3, 29, 30] },
  { k: 'part', id: 'p3_scm', l: 'Sternocleidomastoid muscle', match: 'Sternocleidomastoid', parent: 'p3_acc_muscles', w: 3, own: 'One of the accessory respiratory muscles, which assist in elevating the ribs.', src: [L3, 30] },
  { k: 'part', id: 'p3_scalene', l: 'Scalene muscles', parent: 'p3_acc_muscles', w: 3, own: 'One of the accessory respiratory muscles, which assist in elevating the ribs.', src: [L3, 30] },
  { k: 'part', id: 'p3_pec_minor', l: 'Pectoralis minor muscle', match: 'Pectoralis minor', parent: 'p3_acc_muscles', w: 3, own: 'One of the accessory respiratory muscles, which assist in elevating the ribs.', src: [L3, 30] },
  { k: 'part', id: 'p3_serratus_ant', l: 'Serratus anterior muscle', match: 'Serratus anterior', parent: 'p3_acc_muscles', w: 3, own: 'One of the accessory respiratory muscles, which assist in elevating the ribs.', src: [L3, 30] },
  { k: 'part', id: 'p3_int_intercostals', l: 'Internal intercostal muscles', match: 'Internal intercostal', parent: 'p_breathmech', w: 3, line: 'depress the ribs during active exhalation', src: [L3, 30, 31] },
  { k: 'part', id: 'p3_transversus_thoracis', l: 'Transversus thoracis muscle', match: 'Transversus thoracis', parent: 'p_breathmech', w: 3, line: 'depress the ribs during active exhalation', src: [L3, 30, 31] },
  { k: 'part', id: 'p3_abdominal_muscles', l: 'Abdominal muscles', match: 'Abdominal muscles', parent: 'p_breathmech', w: 3, line: 'compress the abdomen, force diaphragm upward', src: [L3, 31] },

  /* ---------------- Lung measurements (p32-38) ---------------- */
  { k: 'part', id: 'p3_resp_rate', l: 'Respiratory rate', match: 'respiratory rate', parent: 'p_lungvol', w: 3, line: 'the number of breaths per minute', src: [L3, 32, 33, 59, 62, 73, 74] },
  { k: 'part', id: 'p3_minute_volume', l: 'Respiratory minute volume', match: 'respiratory minute volume', parent: 'p_lungvol', w: 3, line: 'amount of air moved per minute: respiratory rate times tidal volume', src: [L3, 33] },
  { k: 'group', id: 'p3_pulmonary_volumes', l: 'Pulmonary volumes', match: 'pulmonary volumes', parent: 'p_lungvol', w: 3, line: 'four pulmonary volumes measured by spirometry', src: [L3, 34, 36] },
  { k: 'part', id: 'p3_tidal_volume', l: 'Tidal volume', match: 'Tidal volume', parent: 'p3_pulmonary_volumes', w: 3, line: 'amount of air moved in quiet breathing; 500 mL', src: [L3, 28, 32, 33, 34, 36, 37] },
  { k: 'part', id: 'p3_irv', l: 'Inspiratory reserve volume', match: 'Inspiratory reserve volume', parent: 'p3_pulmonary_volumes', w: 3, line: 'air taken in over tidal volume; 3300 mL male, 1900 mL female', src: [L3, 34, 36, 37, 38] },
  { k: 'part', id: 'p3_erv', l: 'Expiratory reserve volume', match: 'Expiratory reserve volume', parent: 'p3_pulmonary_volumes', w: 3, line: 'air pushed out after normal exhalation; 1000 mL male, 700 mL female', src: [L3, 34, 36, 37, 38] },
  { k: 'part', id: 'p3_residual_volume', l: 'Residual volume', match: 'Residual volume', parent: 'p3_pulmonary_volumes', w: 3, line: 'remaining gas volume after maximal exhalation; 1200 mL male, 1100 mL female', src: [L3, 34, 36, 37, 38] },
  { k: 'part', id: 'p3_minimal_volume', l: 'Minimal volume', match: 'Minimal volume', parent: 'p3_pulmonary_volumes', w: 3, line: 'amount of air in a collapsed lung; 30–120 mL', src: [L3, 36, 37] },
  { k: 'group', id: 'p3_pulmonary_capacities', l: 'Capacities', match: 'capacities', parent: 'p_lungvol', w: 3, line: 'diagnostic combinations of specific pulmonary volumes', src: [L3, 34, 36, 38] },
  { k: 'part', id: 'p3_inspiratory_capacity', l: 'Inspiratory capacity', match: 'Inspiratory capacity', parent: 'p3_pulmonary_capacities', w: 3, line: 'IC = IRV + TV; deep breath after normal tidal exhalation', src: [L3, 36, 38] },
  { k: 'part', id: 'p3_frc', l: 'Functional residual capacity', match: 'Functional residual capacity', parent: 'p3_pulmonary_capacities', w: 3, line: 'FRC = ERV + RV; air remaining after quiet respiratory cycle', src: [L3, 36, 38] },
  { k: 'part', id: 'p3_vital_capacity', l: 'Vital capacity', match: 'Vital capacity', parent: 'p3_pulmonary_capacities', w: 3, line: 'VC = IRV + TV + ERV; deep breath in and out', src: [L3, 36, 38] },
  { k: 'part', id: 'p3_tlc', l: 'Total lung capacity', match: 'Total lung capacity', parent: 'p3_pulmonary_capacities', w: 3, line: 'TLC = VC + RV; 6000 mL adult male, 4200 mL female', src: [L3, 36, 38] },

  /* ---------------- Gas exchange (p40-42) ---------------- */
  { k: 'part', id: 'p3_resp_membrane', l: 'Respiratory membrane', match: 'respiratory membrane', parent: 'p_gasex', w: 3, line: 'membrane across which gas exchange occurs between blood and alveolar air', src: [L3, 40, 42] },
  { k: 'process', id: 'p3_partial_pressures', l: 'Partial pressures', match: 'Partial pressures', parent: 'p_gasex', w: 3, line: 'gas diffusion depends on concentration gradient of partial pressures', src: [L3, 40, 41] },
  { k: 'process', id: 'p3_equilibrium', l: 'Equilibrium', match: 'equilibrium', parent: 'p_gasex', w: 3, line: 'rapid exchange allows blood and alveolar air to reach equilibrium', src: [L3, 41] },

  /* ---------------- Oxygen transport (p45-54) ---------------- */
  { k: 'substance', id: 'p3_hemoglobin', l: 'Hemoglobin', match: 'hemoglobin', parent: 'p_o2', w: 3, line: 'each hemoglobin molecule reversibly binds four oxygen molecules to iron', links: { p2_rbc: 'RBCs transport O2 to, and CO2 from, peripheral tissues', p2_hemoglobin: 'Each RBC has about 280 million Hb molecules' }, src: [L3, 45, 46, 47, 48, 50, 51, 53, 56, 57] },
  { k: 'substance', id: 'p3_oxyhemoglobin', l: 'Oxyhemoglobin', match: 'oxyhemoglobin', parent: 'p_o2', w: 3, line: 'formed when oxygen binds to iron ions in hemoglobin molecules', src: [L3, 45, 49, 52, 54] },
  { k: 'process', id: 'p3_hb_saturation', l: 'Hemoglobin saturation', match: 'Hemoglobin saturation', parent: 'p_o2', w: 3, line: 'percentage of heme units in hemoglobin that contain bound oxygen', src: [L3, 46, 47] },
  { k: 'process', id: 'p3_sat_curve', l: 'Oxygen–hemoglobin saturation curve', match: 'Oxygen–hemoglobin saturation curve', parent: 'p_o2', w: 3, line: 'relates saturation of hemoglobin to partial pressure of oxygen', src: [L3, 47, 48, 52, 54] },
  { k: 'process', id: 'p3_bohr_effect', l: 'Bohr effect', match: 'Bohr effect', parent: 'p_o2', w: 3, line: 'hemoglobin oxygen binding affinity is inversely related to acidity and CO2', src: [L3, 50, 51] },
  { k: 'substance', id: 'p3_carbonic_anhydrase', l: 'Carbonic anhydrase', match: 'carbonic anhydrase', parent: 'p_o2', w: 3, line: 'catalyzes reaction of CO2 with water to produce carbonic acid', acts: { p3_carbonic_acid: 'produces carbonic acid' }, src: [L3, 50, 58] },
  { k: 'substance', id: 'p3_carbonic_acid', l: 'Carbonic acid', match: 'carbonic acid', parent: 'p_o2', w: 3, line: 'dissociates into hydrogen ion and bicarbonate ion', src: [L3, 50, 55, 56, 58] },
  { k: 'process', id: 'p3_temp_effect', l: 'Effect of temperature', match: 'Effect of temperature', parent: 'p_o2', w: 3, line: 'temperature increase causes hemoglobin to release more oxygen', src: [L3, 53, 54] },

  /* ---------------- Carbon dioxide transport (p55-58) ---------------- */
  { k: 'substance', id: 'p3_co2_dissolved', l: 'Dissolved in plasma', match: 'dissolved in plasma', parent: 'p_co2', w: 3, line: '7 percent of carbon dioxide is transported dissolved in plasma', src: [L3, 55, 57, 58] },
  { k: 'substance', id: 'p3_carbaminohemoglobin', l: 'Carbaminohemoglobin', match: 'carbaminohemoglobin', parent: 'p_co2', w: 3, line: '23 percent bound to amino groups of globular proteins in hemoglobin', links: { p2_rbc: 'bound to hemoglobin within red blood cells' }, src: [L3, 57, 58] },
  { k: 'substance', id: 'p3_bicarbonate', l: 'Bicarbonate', match: 'bicarbonate', parent: 'p_co2', w: 3, line: '70 percent transported as carbonic acid which dissociates into bicarbonate', src: [L3, 50, 56, 58] },
  { k: 'process', id: 'p3_chloride_shift', l: 'Chloride shift', match: 'chloride shift', parent: 'p_co2', w: 3, line: 'moves bicarbonate into plasma in exchange for chloride ions without ATP', src: [L3, 56, 58] },

  /* ---------------- Control of respiration (p59-74) ---------------- */
  { k: 'part', id: 'p3_resp_centers', l: 'Respiratory centers', match: 'respiratory centers', parent: 'p_respcontrol', w: 3, line: 'three pairs of nuclei in reticular formation of medulla and pons', src: [L3, 59, 60, 62, 63, 66, 68, 70] },
  { k: 'part', id: 'p3_voluntary_centers', l: 'Voluntary centers', match: 'Voluntary centers', parent: 'p_respcontrol', w: 3, line: 'centers in cerebral cortex affecting brainstem respiratory centers and motor neurons', src: [L3, 60] },
  { k: 'part', id: 'p3_apneustic_center', l: 'Apneustic center', match: 'Apneustic center', parent: 'p_respcontrol', w: 3, line: 'provides continuous stimulation to dorsal respiratory group center', links: { p3_drg: 'provides continuous stimulation to DRG' }, src: [L3, 62] },
  { k: 'part', id: 'p3_pneumotaxic_center', l: 'Pneumotaxic center', match: 'Pneumotaxic center', parent: 'p_respcontrol', w: 3, line: 'inhibits apneustic centers and promotes exhalation', links: { p3_apneustic_center: 'inhibits apneustic centers' }, src: [L3, 62, 66] },
  { k: 'part', id: 'p3_drg', l: 'Dorsal respiratory group', match: 'Dorsal respiratory group', parent: 'p_respcontrol', w: 3, line: 'inspiratory center functioning in quiet and forced breathing', src: [L3, 62, 63, 64, 66, 70] },
  { k: 'part', id: 'p3_vrg', l: 'Ventral respiratory group', match: 'Ventral respiratory group', parent: 'p_respcontrol', w: 3, line: 'inspiratory and expiratory center functioning only in forced breathing', src: [L3, 63, 64, 66, 70] },
  { k: 'part', id: 'p3_chemoreceptors', l: 'Chemoreceptors', match: 'Chemoreceptors', parent: 'p_respcontrol', w: 3, line: 'sensitive to PCO2, PO2, or pH of blood or cerebrospinal fluid', src: [L3, 67, 68, 70, 71, 72, 73, 74] },
  { k: 'part', id: 'p3_central_chemoreceptors', l: 'Central chemoreceptors', match: 'Central chemoreceptors', parent: 'p3_chemoreceptors', w: 3, line: 'on ventrolateral surface of medulla oblongata, respond to PCO2 and pH', src: [L3, 68, 71] },
  { k: 'part', id: 'p3_carotid_bodies', l: 'Carotid bodies', match: 'carotid bodies', parent: 'p3_chemoreceptors', w: 3, line: 'monitored by glossopharyngeal nerve, stimulated by blood pH or PO2', links: { p3_glossopharyngeal: 'monitored by glossopharyngeal nerve' }, src: [L3, 69] },
  { k: 'part', id: 'p3_aortic_bodies', l: 'Aortic bodies', match: 'aortic bodies', parent: 'p3_chemoreceptors', w: 3, line: 'monitored by vagus nerve, stimulated by blood pH or PO2', links: { p3_vagus: 'monitored by vagus nerve' }, src: [L3, 69] },
  { k: 'part', id: 'p3_glossopharyngeal', l: 'Glossopharyngeal nerve', match: 'Glossopharyngeal nerve', parent: 'p_respcontrol', w: 3, line: 'relays chemoreceptor input from carotid bodies to medulla', links: { p3_drg: 'relays chemoreceptor sensory input to respiratory centers' }, src: [L3, 68, 69, 70] },
  { k: 'part', id: 'p3_vagus', l: 'Vagus nerve', match: 'Vagus nerve', parent: 'p_respcontrol', w: 3, line: 'relays sensory input from aortic bodies and stretch receptors to medulla', links: { p3_drg: 'relays sensory input to respiratory centers' }, src: [L3, 68, 69, 70] },
  { k: 'part', id: 'p3_baroreceptors', l: 'Baroreceptors', match: 'Baroreceptors', parent: 'p_respcontrol', w: 3, line: 'in aortic or carotid sinuses, sensitive to changes in blood pressure', src: [L3, 67, 70] },
  { k: 'part', id: 'p3_stretch_receptors', l: 'Stretch receptors', match: 'Stretch receptors', parent: 'p_respcontrol', w: 3, line: 'respond to changes in lung volume', src: [L3, 67, 70] },
  { k: 'process', id: 'p3_hypercapnia', l: 'Hypercapnia', match: 'hypercapnia', parent: 'p_respcontrol', w: 3, line: 'increased arterial PCO2 stimulates chemoreceptors to accelerate breathing cycles', links: { p1_neg_feedback: 'Homeostasis of Arterial PCO2' }, src: [L3, 73] },
  { k: 'process', id: 'p3_hypocapnia', l: 'Hypocapnia', match: 'hypocapnia', parent: 'p_respcontrol', w: 3, line: 'decreased arterial PCO2 inhibits chemoreceptors to slow rate of respiration', src: [L3, 74] },
];
