/*
 * HSS2011 · Week 9 — the respiratory system.
 *
 * Read off "Module 3 part two_ respiratory system_Student.pdf" (hss.l9.2026), page by
 * page. TOPICS are the headings the rows hang from; ROWS are one per structure the page
 * text names, in the slide's words; a structure only in a picture has no row. Nothing
 * here shows before teaching week 9 (see revision/weeks.js). Row fields:
 * outputs/revision/leaves.js. Recipe: docs/superpowers/plans/2026-10-19-revise-depth-w5-w7.md.
 * The MCQ slides (p24), the trivia (p64) and the reference list (p65) name no structure to learn.
 */
const L9 = 'hss.l9.2026';

export const SOURCES = {
  [L9]: 'Week 9 respiratory slides',
};

/* Headings: a new body-system colour group (resp), one topic each. */
export const TOPICS = [
  { id: 'respsys', l: 'Respiratory system', s: 'resp', w: [9], th: [], t: 'Supplies the body with oxygen and removes carbon dioxide, regulates blood pH, makes the voice, gives smell and protects against microorganisms. The upper tract is the nose, mouth, pharynx and larynx; the lower tract includes the trachea, lungs, bronchi and bronchioles.' },
  { id: 'nose', l: 'Nose and nasal cavity', s: 'resp', w: [9], th: [], t: 'Air enters the nasal cavity through the nostrils. Smell receptors sit in the olfactory epithelium of its slitlike superior region.' },
  { id: 'sinuses', l: 'Paranasal sinuses', s: 'resp', w: [9], th: [], t: 'Air-filled spaces in skull bones that connect to the nasal cavity, lined with mucous membrane and ciliated epithelium. They lighten the skull, add resonance to the voice and make mucus that moisturises the nose.' },
  { id: 'pharynx', l: 'Pharynx', s: 'resp', w: [9], th: [], t: 'Three parts, from the nasopharynx behind the nasal cavity through the oropharynx behind the mouth to the laryngopharynx behind the larynx. The nasopharynx carries air only; the other two are shared by air and food.' },
  { id: 'larynx', l: 'Larynx', s: 'resp', w: [9], th: [], t: 'The voice box, about 5 cm below the pharynx. It keeps the airway open, routes food and air into the right channels and helps make voice.' },
  { id: 'trachea', l: 'Trachea', s: 'resp', w: [9], th: [], t: 'The windpipe, about 12 cm long and 2.5 cm across, held open by C-shaped rings of hyaline cartilage, with mucous glands and cilia on its inner surface.' },
  { id: 'bronchi', l: 'Bronchi and bronchioles', s: 'resp', w: [9], th: [], t: 'The trachea divides into two primary bronchi with incomplete cartilaginous rings, which branch into bronchioles and terminal bronchioles.' },
  { id: 'alveoli', l: 'Alveoli and respiratory membrane', s: 'resp', w: [9], th: [], t: 'Beyond the terminal bronchioles the airway branches into respiratory bronchioles and alveolar ducts. Alveoli are thin-walled, have a lot of surface area and touch capillaries directly, for gas exchange.' },
  { id: 'lungs', l: 'Lungs', s: 'resp', w: [9], th: [], t: 'The right lung has three lobes and the left has two, with a cardiac notch that accommodates the heart. Pulmonary arteries carry deoxygenated blood and pulmonary veins carry oxygenated blood.' },
  { id: 'pleurae', l: 'Pleurae', s: 'resp', w: [9], th: [], t: 'Two thin layers of serous membrane around each lung: a visceral layer on the lung and a parietal layer lining the chest wall, diaphragm and mediastinum, with pleural fluid between them.' },
  { id: 'breathing', l: 'Diaphragm and breathing', s: 'resp', w: [9], th: [], t: 'The diaphragm is the main muscle of breathing and is controlled mainly by the phrenic nerve from C3, C4 and C5. It contracts and flattens to enlarge the chest on inspiration and relaxes into its dome on expiration.' },
  { id: 'respclin', l: 'Respiratory clinical points', s: 'resp', w: [9], th: [], t: 'Upper respiratory tract infection, sinusitis, enlarged adenoids, a fish bone in a piriform recess, lung collapse, pneumothorax and carbon monoxide poisoning, as the lecture gives them.' },
];

/* Where the new headings sit in the map: one new branch. */
export const BRANCH = {
  sys: 'resp', label: 'Airways & lungs', kids: [
    { id: 'respsys', kids: [{ id: 'nose', kids: [{ id: 'sinuses' }] }, { id: 'pharynx' }, { id: 'larynx' }, { id: 'trachea' }, { id: 'bronchi', kids: [{ id: 'alveoli' }] }] },
    { id: 'lungs', kids: [{ id: 'pleurae' }] },
    { id: 'breathing' },
    { id: 'respclin' },
  ],
};

/* Links between headings, and from them to earlier weeks, each said in the slide's words. */
export const EDGES = [
  ['alveoli', 'circuits', 'alveoli have direct contact with capillaries'],
  ['lungs', 'circuits', 'pulmonary arteries carry deoxygenated blood, pulmonary veins oxygenated blood'],
  ['pleurae', 'respclin', 'air entering the pleural space collapses the lung (pneumothorax)'],
  ['sinuses', 'respclin', 'poor drainage causes common sinusitis'],
];

export const ROWS = [
/* ---------------- functions and the two tracts (p4-5) ---------------- */
{ k: 'part', id: 'w9_upperrt', l: 'Upper respiratory tract', parent: 'respsys', w: 9, line: 'the nose, mouth, pharynx and larynx; air is cleaned, filtered, humidified, warmed', src: [L9, 5] },
{ k: 'part', id: 'w9_lowerrt', l: 'Lower respiratory tract', parent: 'respsys', w: 9, line: 'trachea, lungs, bronchi and bronchioles', src: [L9, 5] },
{ k: 'part', id: 'w9_urti', l: 'URTI', parent: 'respsys', w: 9, line: 'upper respiratory tract infection; the slide asks what it is', src: [L9, 5] },
{ k: 'process', id: 'w9_phreg', l: 'Regulation of blood pH', parent: 'respsys', w: 9, match: 'Regulation of blood', line: 'altered by changing blood CO2 levels', src: [L9, 4] },
{ k: 'process', id: 'w9_voice', l: 'Voice production', parent: 'respsys', w: 9, line: 'movement of air past the vocal cords makes sound and speech', src: [L9, 4] },
{ k: 'process', id: 'w9_olfaction', l: 'Olfaction', parent: 'respsys', w: 9, line: 'smell occurs when airborne molecules are drawn into the nasal cavity', src: [L9, 4] },
{ k: 'process', id: 'w9_resp_protect', l: 'Protection', parent: 'respsys', w: 9, line: 'against microorganisms, by preventing entry and removing them', src: [L9, 4] },
{ k: 'part', id: 'w9_acidosis', l: 'Acidosis', parent: 'respsys', w: 9, line: 'a pH imbalance; critical limits are below 6.8 or above 7.8', src: [L9, 4] },
{ k: 'part', id: 'w9_alkalosis', l: 'Alkalosis', parent: 'respsys', w: 9, line: 'a pH imbalance; critical limits are below 6.8 or above 7.8', src: [L9, 4] },

/* ---------------- nose and paranasal sinuses (p6-11) ---------------- */
{ k: 'part', id: 'w9_nostrils', l: 'nostrils', parent: 'nose', w: 9, line: 'air enters the nasal cavity by passing through them', src: [L9, 6] },
{ k: 'part', id: 'w9_nasalcavity', l: 'Nasal cavity', parent: 'nose', w: 9, line: 'warms, filters and humidifies inspired air', src: [L9, 7, 6] },
{ k: 'part', id: 'w9_olfepi', l: 'Olfactory epithelium', parent: 'nose', w: 9, line: 'lines the slitlike superior nasal cavity and contains smell receptors', links: { w6_cn1: 'carries smell, the olfactory nerve (I)' }, src: [L9, 11] },
{ k: 'part', id: 'w9_olfrec', l: 'Olfactory receptor', parent: 'w9_olfepi', w: 9, src: [L9, 11] },
{ k: 'part', id: 'w9_frontal_s', l: 'Frontal sinuses', parent: 'sinuses', w: 9, line: 'in the frontal bone, above the eyes; forehead', links: { w4_frontal: 'in the frontal bone' }, src: [L9, 10, 9] },
{ k: 'part', id: 'w9_maxillary_s', l: 'Maxillary sinuses', parent: 'sinuses', w: 9, line: 'in the maxillary bones, the cheeks; the largest sinuses', links: { w4_maxilla: 'in the maxillary bones' }, src: [L9, 10, 9] },
{ k: 'part', id: 'w9_ethmoidal_s', l: 'Ethmoidal sinuses', parent: 'sinuses', w: 9, line: 'ethmoidal air cells in the ethmoid bone, between the nose and eyes', links: { w4_ethmoid: 'in the ethmoid bone' }, src: [L9, 10, 9] },
{ k: 'part', id: 'w9_sphenoidal_s', l: 'Sphenoidal sinuses', parent: 'sinuses', w: 9, line: 'in the sphenoid bone, deep behind the nasal cavity and eyes', links: { w4_sphenoid: 'in the sphenoid bone' }, src: [L9, 10, 9] },
{ k: 'part', id: 'w9_sinusitis', l: 'sinusitis', parent: 'respclin', w: 9, line: 'poor drainage causes common sinusitis', links: { sinuses: 'poor drainage of the paranasal sinuses' }, src: [L9, 10] },

/* ---------------- pharynx (p13-19) ---------------- */
{ k: 'group', id: 'w9_nasopharynx', l: 'Nasopharynx', parent: 'pharynx', w: 9, line: 'uppermost part, behind the nasal cavity; conducts air only in normal breathing', src: [L9, 13] },
{ k: 'part', id: 'w9_choanae', l: 'choanae', parent: 'w9_nasopharynx', w: 9, line: 'the posterior nasal openings joining it to the nasal cavity', src: [L9, 13] },
{ k: 'part', id: 'w9_adenoids', l: 'Pharyngeal tonsil (adenoids)', parent: 'w9_nasopharynx', w: 9, match: 'Pharyngeal tonsil', line: 'lymphoid tissue that helps defend against inhaled microorganisms', src: [L9, 13] },
{ k: 'part', id: 'w9_eustachian', l: 'Auditory/Eustachian tubes', parent: 'w9_nasopharynx', w: 9, match: 'Eustachian', line: 'connect the nasopharynx to the middle ears; equalise pressure', links: { w7_tympanic: 'equalise pressure across the tympanic membrane' }, src: [L9, 13] },
{ k: 'part', id: 'w9_softpalate', l: 'Soft palate', parent: 'w9_nasopharynx', w: 9, line: 'separates the nasopharynx from the oropharynx during swallowing', src: [L9, 13, 15] },
{ k: 'group', id: 'w9_oropharynx', l: 'Oropharynx', parent: 'pharynx', w: 9, line: 'middle part, behind the oral cavity; shared by air, food and fluid', src: [L9, 15] },
{ k: 'part', id: 'w9_palatine', l: 'Palatine tonsils', parent: 'w9_oropharynx', w: 9, line: 'on the lateral walls of the oropharynx', src: [L9, 15] },
{ k: 'part', id: 'w9_lingual', l: 'Lingual tonsils', parent: 'w9_oropharynx', w: 9, line: 'at the base of the tongue', src: [L9, 15] },
{ k: 'part', id: 'w9_uvula', l: 'Uvula', parent: 'w9_oropharynx', w: 9, line: 'with the soft palate, helps close the nasopharynx when swallowing', src: [L9, 15] },
{ k: 'group', id: 'w9_laryngopharynx', l: 'Laryngopharynx', parent: 'pharynx', w: 9, line: 'lowest part, behind the larynx; air goes forward, food back to the oesophagus', src: [L9, 16] },
{ k: 'part', id: 'w9_laryngealinlet', l: 'Laryngeal inlet', parent: 'w9_laryngopharynx', w: 9, line: 'the opening into the larynx', src: [L9, 16] },
{ k: 'part', id: 'w9_epiglottis', l: 'Epiglottis', parent: 'w9_laryngopharynx', w: 9, line: 'helps protect the laryngeal inlet during swallowing', src: [L9, 16, 20] },
{ k: 'part', id: 'w9_piriform', l: 'piriform recess', parent: 'w9_laryngopharynx', w: 9, line: 'a food pathway beside the larynx; fish bones can stick here', src: [L9, 17, 19] },
{ k: 'part', id: 'w9_intlarynxn', l: 'internal laryngeal nerve', parent: 'w9_piriform', w: 9, line: 'nearby; careless removal of a fish bone can damage it', links: { w8_vagus_c: 'a branch of the vagus nerve' }, src: [L9, 19, 24] },
{ k: 'part', id: 'w9_adenoidprob', l: 'Enlarged adenoids', parent: 'respclin', w: 9, line: 'obstruct nasal airflow: mouth breathing, snoring, sleep apnoea', links: { w9_adenoids: 'enlargement of the pharyngeal tonsil' }, src: [L9, 14] },
{ k: 'part', id: 'w9_otitis', l: 'otitis media', parent: 'respclin', w: 9, line: 'infection may spread through the auditory tubes to the middle ear', links: { w9_eustachian: 'spreads through the auditory tubes' }, src: [L9, 14] },

/* ---------------- larynx (p20-22) ---------------- */
{ k: 'group', id: 'w9_laryngeal_out', l: 'Outer structure', parent: 'larynx', w: 9, line: 'thyroid cartilage, cricothyroid membrane, cricoid cartilage', src: [L9, 20] },
{ k: 'part', id: 'w9_thyroidc', l: 'Thyroid cartilage', parent: 'w9_laryngeal_out', w: 9, line: 'forms the prominent "Adam\'s apple"', src: [L9, 20, 24] },
{ k: 'part', id: 'w9_cricothyroid', l: 'Cricothyroid membrane', parent: 'w9_laryngeal_out', w: 9, src: [L9, 20] },
{ k: 'part', id: 'w9_cricoid', l: 'Cricoid cartilage', parent: 'w9_laryngeal_out', w: 9, line: 'the laryngopharynx ends at its lower border, continuing as the oesophagus', src: [L9, 20, 16] },
{ k: 'group', id: 'w9_laryngeal_in', l: 'Inner structure', parent: 'larynx', w: 9, line: 'vocal cord, epiglottis, glottis, arytenoid cartilage', src: [L9, 20] },
{ k: 'part', id: 'w9_glottis', l: 'Glottis', parent: 'w9_laryngeal_in', w: 9, line: 'air passing through it vibrates the vocal folds', src: [L9, 20, 22] },
{ k: 'part', id: 'w9_vocalfold', l: 'Vocal fold', parent: 'w9_laryngeal_in', w: 9, match: 'Vocal cord', line: 'vibration makes sound; pitch depends on diameter, length and tension', src: [L9, 20, 22] },
{ k: 'part', id: 'w9_arytenoid', l: 'Arytenoid cartilage', parent: 'w9_laryngeal_in', w: 9, src: [L9, 20] },
{ k: 'bone', id: 'w9_hyoid', l: 'Hyoid Bone', parent: 'larynx', w: 9, line: 'the only bone that does not articulate directly with another bone', src: [L9, 24] },

/* ---------------- trachea (p23-33) ---------------- */
{ k: 'part', id: 'w9_trachealcart', l: 'C-shaped tracheal cartilages', parent: 'trachea', w: 9, match: 'C-shaped', line: 'hyaline cartilage rings that keep the airway open', src: [L9, 23, 28] },
{ k: 'part', id: 'w9_trachealis', l: 'Trachealis muscle', parent: 'trachea', w: 9, line: 'smooth muscle joining the C-shaped rings posteriorly', src: [L9, 25, 27] },
{ k: 'group', id: 'w9_trachealwall', l: 'Tracheal wall', parent: 'trachea', w: 9, match: 'Trachea wall', line: 'four layers, outermost to innermost', src: [L9, 27] },
{ k: 'part', id: 'w9_adventitia', l: 'Adventitia', parent: 'w9_trachealwall', w: 9, line: 'the outer supportive connective tissue sheath', src: [L9, 27] },
{ k: 'part', id: 'w9_submucosa', l: 'Submucosa', parent: 'w9_trachealwall', w: 9, line: 'connective tissue containing mucous glands and blood vessels', src: [L9, 27] },
{ k: 'part', id: 'w9_mucosa', l: 'Mucosa', parent: 'w9_trachealwall', w: 9, line: 'ciliated pseudostratified columnar epithelium sweeping debris upward', src: [L9, 27] },
{ k: 'cell', id: 'w9_goblet', l: 'Goblet cells', parent: 'trachea', w: 9, line: 'make mucus; in the nasal cavity, trachea and larger bronchi', src: [L9, 30, 31] },
{ k: 'cell', id: 'w9_ciliated', l: 'Ciliated cells', parent: 'trachea', w: 9, line: 'cilia beat upward; mucus is swallowed or coughed out', src: [L9, 32] },
{ k: 'part', id: 'w9_smoking', l: 'Smoking', parent: 'respclin', w: 9, match: 'Smoking destroys the cilia', line: 'destroys the cilia, so mucus and debris accumulate in the airway', links: { w9_ciliated: 'destroys the cilia' }, src: [L9, 33] },

/* ---------------- bronchi, bronchioles (p34-35) ---------------- */
{ k: 'group', id: 'w9_primarybronchi', l: 'Primary bronchi', parent: 'bronchi', w: 9, match: 'primary bronchi', line: 'the trachea divides into two; walls have incomplete cartilaginous rings', src: [L9, 34, 26] },
{ k: 'part', id: 'w9_rightbronchus', l: 'Right bronchus', parent: 'w9_primarybronchi', w: 9, line: 'about 2.5 cm long, more vertical and wider', src: [L9, 34] },
{ k: 'part', id: 'w9_leftbronchus', l: 'Left bronchus', parent: 'w9_primarybronchi', w: 9, line: 'about 5 cm long, more horizontal and narrower', src: [L9, 34] },
{ k: 'part', id: 'w9_bronchiole', l: 'Bronchiole', parent: 'bronchi', w: 9, line: 'less than 1 mm in diameter', src: [L9, 34, 35] },
{ k: 'part', id: 'w9_termbronchiole', l: 'Terminal bronchiole', parent: 'w9_bronchiole', w: 9, line: 'less than 0.5 mm in diameter; thin wall', src: [L9, 34] },
{ k: 'part', id: 'w9_respbronchiole', l: 'respiratory bronchioles', parent: 'w9_termbronchiole', w: 9, line: 'branching beyond the terminal bronchioles', src: [L9, 35] },
{ k: 'part', id: 'w9_alveolarduct', l: 'alveolar ducts', parent: 'w9_respbronchiole', w: 9, line: 'the respiratory bronchioles lead on to them', src: [L9, 35] },

/* ---------------- alveoli and the respiratory membrane (p35-44) ---------------- */
{ k: 'part', id: 'w9_alveolus', l: 'Alveoli', parent: 'alveoli', w: 9, line: 'thin-walled, large surface area, direct contact with capillaries: gas exchange', src: [L9, 35, 36, 38] },
{ k: 'group', id: 'w9_respmembrane', l: 'Respiratory Membrane', parent: 'alveoli', w: 9, line: 'formed by the alveoli; alveolar cells make up the membrane', src: [L9, 38, 39] },
{ k: 'cell', id: 'w9_type1', l: 'Type I Alveolar cells', parent: 'w9_respmembrane', w: 9, match: 'Type I Alveolar', line: 'thin, flat; about 95% of the surface; gas exchange by diffusion', src: [L9, 39, 40] },
{ k: 'cell', id: 'w9_type2', l: 'Type II cells', parent: 'w9_respmembrane', w: 9, match: 'Type II', line: 'cuboidal, about 5%; secrete surfactant; can regenerate Type I cells', src: [L9, 39, 40] },
{ k: 'substance', id: 'w9_surfactant', l: 'pulmonary surfactant', parent: 'w9_respmembrane', w: 9, match: 'surfactant', line: 'a lipoprotein that reduces surface tension, preventing collapse', src: [L9, 40] },
{ k: 'cell', id: 'w9_macrophage', l: 'macrophages', parent: 'w9_respmembrane', w: 9, line: 'housed in the alveolus; keep alveolar surfaces sterile', src: [L9, 39] },
{ k: 'part', id: 'w9_kohn', l: 'Alveolar pore (pores of Kohn)', parent: 'alveoli', w: 9, match: 'Alveolar pore', line: 'tiny openings between neighbouring alveoli; collateral ventilation', src: [L9, 43] },
{ k: 'part', id: 'w9_atelectasis', l: 'atelectasis', parent: 'respclin', w: 9, line: 'collapse of alveoli; pores of Kohn help reduce the chance', links: { w9_kohn: 'pores help keep alveoli open' }, src: [L9, 43, 44] },

/* ---------------- lungs (p45-46) ---------------- */
{ k: 'group', id: 'w9_rightlung', l: 'Right lung', parent: 'lungs', w: 9, match: 'Right lung', line: 'three lobes: superior, middle and inferior', src: [L9, 45] },
{ k: 'group', id: 'w9_leftlung', l: 'Left lung', parent: 'lungs', w: 9, match: 'Left lung', line: 'two lobes: superior and inferior', src: [L9, 45] },
{ k: 'part', id: 'w9_obliquefissure', l: 'oblique fissure', parent: 'lungs', w: 9, line: 'separates the lobes of the left lung and, with the horizontal fissure, the right', src: [L9, 45] },
{ k: 'part', id: 'w9_horizfissure', l: 'horizontal fissure', parent: 'w9_rightlung', w: 9, line: 'with the oblique fissure, separates the right lung into three lobes', src: [L9, 45] },
{ k: 'part', id: 'w9_cardiacnotch', l: 'Cardiac notch', parent: 'w9_leftlung', w: 9, line: 'the cavity that accommodates the heart', links: { heart: 'accommodates the heart' }, src: [L9, 45] },
{ k: 'part', id: 'w9_pulmart', l: 'Pulmonary arteries', parent: 'lungs', w: 9, line: 'carry deoxygenated blood: pulmonary circulation', links: { w8_pulmart: 'the same arteries, in the pulmonary circuit' }, src: [L9, 46] },
{ k: 'part', id: 'w9_pulmvein', l: 'Pulmonary veins', parent: 'lungs', w: 9, line: 'carry oxygenated blood', links: { w8_pulmvein: 'the same veins, in the pulmonary circuit' }, src: [L9, 46] },
{ k: 'part', id: 'w9_bronchialcirc', l: 'Bronchial circulation', parent: 'lungs', w: 9, src: [L9, 46] },

/* ---------------- pleurae (p47-49, 61) ---------------- */
{ k: 'part', id: 'w9_visceralpl', l: 'Visceral pleura', parent: 'pleurae', w: 9, line: 'covers the surface of the lungs', src: [L9, 48] },
{ k: 'part', id: 'w9_parietalpl', l: 'Parietal pleura', parent: 'pleurae', w: 9, line: 'lines the chest wall, diaphragm and mediastinum', links: { w8_mediastinum: 'lines the mediastinum' }, src: [L9, 48] },
{ k: 'part', id: 'w9_pleuralfluid', l: 'Pleural fluid', parent: 'pleurae', w: 9, line: 'lubricates, helps the lungs adhere to the chest wall, cushions', src: [L9, 48, 49] },
{ k: 'part', id: 'w9_pneumothorax', l: 'Pneumothorax', parent: 'respclin', w: 9, line: 'air enters the pleural space, negative pressure is lost, the lung collapses', links: { w9_pleuralfluid: 'air enters the pleural space' }, src: [L9, 61] },

/* ---------------- diaphragm and breathing (p50-59) ---------------- */
{ k: 'part', id: 'w9_diaphragm', l: 'Diaphragm', parent: 'breathing', w: 9, line: 'large dome-shaped muscle below the lungs; the main muscle of breathing', src: [L9, 50, 51] },
{ k: 'nerve', id: 'w9_phrenicn', l: 'phrenic nerve', parent: 'breathing', w: 9, line: 'controls the diaphragm; arises from C3, C4 and C5', supplies: { w9_diaphragm: 'controls the diaphragm' }, from: 'w5_cervical_plexus', links: { w8_phrenic: 'the same nerve' }, src: [L9, 52, 53] },
{ k: 'process', id: 'w9_inspiration', l: 'Inspiration', parent: 'breathing', w: 9, line: 'the diaphragm contracts and flattens, the chest enlarges and the lungs expand', src: [L9, 50, 56, 57] },
{ k: 'process', id: 'w9_expiration', l: 'Expiration', parent: 'breathing', w: 9, line: 'the diaphragm relaxes into its dome and air leaves the lungs', src: [L9, 50, 58, 59] },
{ k: 'part', id: 'w9_intrapulm', l: 'Intrapulmonary pressure', parent: 'breathing', w: 9, line: 'fluctuates with breathing and always equalises with atmospheric pressure', src: [L9, 55] },
{ k: 'part', id: 'w9_intrapleural', l: 'Intrapleural pressure', parent: 'breathing', w: 9, line: 'always less than intrapulmonary pressure; keeps alveoli inflated', links: { w9_pleuralfluid: 'in the pleural cavity' }, src: [L9, 55] },
{ k: 'part', id: 'w9_hiccup', l: 'Hiccup reflex arc', parent: 'breathing', w: 9, match: 'Hiccup', line: 'phrenic nerve suddenly contracts the diaphragm while the glottis closes', links: { w9_phrenicn: 'the efferent nerve', w9_glottis: 'the vocal cords (glottis) close', w8_vagus_c: 'vagus nerve carries the afferent signal' }, src: [L9, 53] },
{ k: 'part', id: 'w9_diaphparalysis', l: 'Diaphragm paralysis', parent: 'respclin', w: 9, match: 'paralysis', line: 'injury reduces diaphragm movement and causes breathlessness', links: { w9_phrenicn: 'phrenic nerve injury' }, src: [L9, 52] },
{ k: 'part', id: 'w9_shouldertip', l: 'Shoulder-tip pain', parent: 'respclin', w: 9, line: 'diaphragm irritation is referred to the C3-C5 shoulder area', links: { w9_phrenicn: 'the phrenic nerve arises from C3-C5' }, src: [L9, 52] },

/* ---------------- ageing and poisoning (p60, 62) ---------------- */
{ k: 'part', id: 'w9_ageing', l: 'Aging and the Respiratory System', parent: 'respclin', w: 9, line: 'lower vital capacity and blood oxygen; weaker diaphragm and cough', src: [L9, 60] },
{ k: 'part', id: 'w9_co', l: 'Carbon Monoxide Poisoning', parent: 'respclin', w: 9, line: 'CO binds haemoglobin 200-250 times more strongly than oxygen', src: [L9, 62] },
];
