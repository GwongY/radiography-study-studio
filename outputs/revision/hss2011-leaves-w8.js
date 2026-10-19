/*
 * HSS2011 · Week 8 — the cardiovascular system.
 *
 * Read off "Module 3 part one_cardiovascular system Student.pdf" (hss.l8.2026), page by
 * page. TOPICS are the headings the rows hang from; ROWS are one per structure the page
 * text names, in the slide's words; a structure only in a picture has no row. Nothing
 * here shows before teaching week 8 (see revision/weeks.js). Row fields:
 * outputs/revision/leaves.js. Recipe: docs/superpowers/plans/2026-10-19-revise-depth-w5-w7.md.
 */
const L8 = 'hss.l8.2026';

export const SOURCES = {
  [L8]: 'Week 8 cardiovascular slides',
};

/* Headings: a new body-system colour group (cv), one topic each. */
export const TOPICS = [
  { id: 'heart', l: 'The heart', s: 'cv', w: [8], th: [], t: 'The heart sits in the mediastinum, in the pericardial cavity enclosed by the pericardium. Its apex points down and to the left, near the left 5th intercostal space, and is mainly formed by the left ventricle.' },
  { id: 'pericardium', l: 'Pericardium', s: 'cv', w: [8], th: [], t: 'A double-walled sac that surrounds and protects the heart: an outer fibrous layer and an inner serous layer, with pericardial fluid between its parietal and visceral layers.' },
  { id: 'heartwall', l: 'Heart wall', s: 'cv', w: [8], th: [], t: 'The wall is lined inside by the endocardium, and its muscle, the myocardium, has fibres in a spiral or figure-8 pattern so the heart twists as it squeezes.' },
  { id: 'coronary', l: 'Coronary circulation', s: 'cv', w: [8], th: [], t: 'The network of arteries and veins that supply the heart muscle itself. The cardiac veins drain into the coronary sinus, which empties into the right atrium.' },
  { id: 'chambers', l: 'Chambers and septa', s: 'cv', w: [8], th: [], t: 'Four chambers: the right atrium receives blood from the systemic circuit, the right ventricle pumps it to the lungs, the left atrium receives it from the lungs and the left ventricle pumps it to the body. Septa separate right from left.' },
  { id: 'valves', l: 'Heart valves', s: 'cv', w: [8], th: [], t: 'The atrioventricular valves (tricuspid and mitral) and the semilunar valves (pulmonary and aortic) keep blood flowing one way through the heart.' },
  { id: 'cardiaccells', l: 'Cardiac cells and control', s: 'cv', w: [8], th: [], t: 'Contractile cardiomyocytes pump the blood, pacemaker and conducting cells set and carry the beat, and the sympathetic and parasympathetic systems speed or slow the heart.' },
  { id: 'bloodvessels', l: 'Blood vessels', s: 'cv', w: [8], th: [], t: 'Arteries, arterioles, capillaries, venules and veins. Arteries and veins share three tissue layers around a hollow lumen, and differ in wall thickness, lumen and valves.' },
  { id: 'capbed', l: 'Capillary bed', s: 'cv', w: [8], th: [], t: 'Arterioles give rise to metarterioles; blood either goes through the true capillaries or bypasses them by the thoroughfare channel or an arteriovenous anastomosis, before postcapillary venules collect it.' },
  { id: 'circuits', l: 'Pulmonary and systemic circuits', s: 'cv', w: [8], th: [], t: 'The pulmonary circuit takes blood to and from the lungs for gas exchange; the systemic circuit takes oxygenated blood to the tissues and returns it to the heart. Both ventricles contract at the same time.' },
  { id: 'arterial', l: 'Systemic arterial system', s: 'cv', w: [8], th: [], t: 'The network of arteries that carries oxygen-rich blood from the left ventricle to all parts of the body except the lungs, starting from the aorta.' },
  { id: 'venous', l: 'Systemic venous system', s: 'cv', w: [8], th: [], t: 'The superior and inferior vena cava collect blood from the body and return it to the heart; the hepatic portal vein takes blood from the gut and spleen to the liver first.' },
  { id: 'azygos', l: 'Azygos system', s: 'cv', w: [8], th: [], t: 'The azygos and hemiazygos veins run along the posterior thoracic wall, generally lack valves, and give an alternate route for venous return if a vena cava is blocked.' },
  { id: 'cvdisease', l: 'Cardiovascular disease', s: 'cv', w: [8], th: [], t: 'Coronary artery disease, angina, myocardial infarction and cardiac tamponade, as the lecture gives them, with their cause in each case.' },
];

/* Where the new headings sit in the map: one new branch. */
export const BRANCH = {
  sys: 'cv', label: 'Heart & vessels', kids: [
    { id: 'heart', kids: [{ id: 'pericardium' }, { id: 'heartwall' }, { id: 'coronary' }, { id: 'chambers', kids: [{ id: 'valves' }] }, { id: 'cardiaccells' }] },
    { id: 'bloodvessels', kids: [{ id: 'capbed' }] },
    { id: 'circuits', kids: [{ id: 'arterial' }, { id: 'venous', kids: [{ id: 'azygos' }] }] },
    { id: 'cvdisease' },
  ],
};

/* Links between headings, and from them to earlier weeks, each said in the slide's words. */
export const EDGES = [
  ['heart', 'circuits', 'the right and left sides of the heart pump the two circuits'],
  ['coronary', 'cvdisease', 'blockage of the coronary circulation'],
  ['pericardium', 'cvdisease', 'too much fluid in the pericardial sac (tamponade)'],
  ['cardiaccells', 'junctions', 'intercalated discs hold desmosomes and gap junctions'],
  ['cardiaccells', 'symp', 'norepinephrine speeds the heart rate'],
  ['cardiaccells', 'parasymp', 'the vagus nerve slows the heart rate'],
  ['pericardium', 'epithelium', 'mesothelium is simple squamous epithelium'],
  ['pericardium', 'connective', 'areolar tissue is loose connective tissue'],
  ['bloodvessels', 'tissues', 'vessel walls are layers of tissue'],
];

export const ROWS = [
/* ---------------- location and surface (p3-6) ---------------- */
{ k: 'group', id: 'w8_mediastinum', l: 'Mediastinum', parent: 'heart', w: 8, line: 'central compartment of the thoracic cavity, between the two lungs', src: [L8, 3, 4] },
{ k: 'part', id: 'w8_supmed', l: 'Superior mediastinum', parent: 'w8_mediastinum', w: 8, line: 'above the heart; thymus, great vessels, trachea and oesophagus', src: [L8, 4] },
{ k: 'group', id: 'w8_infmed', l: 'Inferior mediastinum', parent: 'w8_mediastinum', w: 8, line: 'below the superior mediastinum; divided into three', src: [L8, 4] },
{ k: 'part', id: 'w8_antmed', l: 'Anterior mediastinum', parent: 'w8_infmed', w: 8, match: 'Anterior:', line: 'in front of the heart; fat and lymph nodes', src: [L8, 4] },
{ k: 'part', id: 'w8_midmed', l: 'Middle mediastinum', parent: 'w8_infmed', w: 8, match: 'Middle:', line: 'contains the heart and pericardium', src: [L8, 4] },
{ k: 'part', id: 'w8_postmed', l: 'Posterior mediastinum', parent: 'w8_infmed', w: 8, match: 'Posterior:', line: 'behind the heart; oesophagus, descending aorta and thoracic duct', src: [L8, 4] },
{ k: 'part', id: 'w8_vagus_c', l: 'Vagus nerve', parent: 'heart', w: 8, line: 'an important nerve of the thoracic cavity', links: { w6_cn10: 'the same nerve, cranial nerve X' }, src: [L8, 5] },
{ k: 'part', id: 'w8_phrenic', l: 'Phrenic nerve', parent: 'heart', w: 8, line: 'an important nerve of the thoracic cavity', src: [L8, 5] },
{ k: 'part', id: 'w8_apex', l: 'Apex', parent: 'heart', w: 8, line: 'pointed lower tip; points down and left, mainly formed by the left ventricle', src: [L8, 6] },
{ k: 'part', id: 'w8_base', l: 'Base', parent: 'heart', w: 8, match: 'base at the third costal cartilage', line: 'at the third costal cartilage', src: [L8, 6] },

/* ---------------- pericardium (p7-11) ---------------- */
{ k: 'part', id: 'w8_fibperic', l: 'Fibrous pericardium', parent: 'pericardium', w: 8, line: 'the outer layer of the sac', src: [L8, 7] },
{ k: 'group', id: 'w8_serperic', l: 'Serous pericardium', parent: 'pericardium', w: 8, line: 'the inner layer, with an outer parietal and an inner visceral layer', src: [L8, 7] },
{ k: 'part', id: 'w8_parietal', l: 'Parietal layer', parent: 'w8_serperic', w: 8, line: 'the outer layer of the serous pericardium', src: [L8, 7] },
{ k: 'part', id: 'w8_epicardium', l: 'Epicardium', parent: 'w8_serperic', w: 8, line: 'the inner visceral layer', src: [L8, 7] },
{ k: 'part', id: 'w8_pericavity', l: 'Pericardial cavity', parent: 'pericardium', w: 8, line: 'between the parietal and visceral layers; holds pericardial fluid', src: [L8, 3, 7] },
{ k: 'part', id: 'w8_pericfluid', l: 'Pericardial fluid', parent: 'w8_pericavity', w: 8, line: 'normally about 15-50 mL; lubricates the heart', src: [L8, 7, 9] },
{ k: 'part', id: 'w8_mesothelium', l: 'Mesothelium', parent: 'pericardium', w: 8, line: 'simple squamous epithelium; secretes pericardial fluid and cuts friction', links: { epithelium: 'simple squamous epithelium' }, src: [L8, 9] },
{ k: 'part', id: 'w8_areolar', l: 'Areolar tissue', parent: 'pericardium', w: 8, line: 'loose connective tissue; anchors and supports the mesothelial layer', links: { connective: 'loose connective tissue' }, src: [L8, 9] },
{ k: 'part', id: 'w8_epifat', l: 'Epicardial adipose tissue', parent: 'pericardium', w: 8, line: 'fat between the myocardium and the pericardium; cushions and fuels the heart', src: [L8, 11] },

/* ---------------- heart wall (p13-15) ---------------- */
{ k: 'part', id: 'w8_endocardium', l: 'Endocardium', parent: 'heartwall', w: 8, line: 'simple squamous epithelium and areolar tissue; smooth lining that reduces friction', src: [L8, 13] },
{ k: 'part', id: 'w8_myocardium', l: 'Myocardium', parent: 'heartwall', w: 8, line: 'heart muscle; fibres in a spiral or figure-8 pattern', src: [L8, 14] },
{ k: 'part', id: 'w8_torsion', l: 'Torsion', parent: 'w8_myocardium', w: 8, line: 'the twisting that helps the heart eject more blood with each beat', src: [L8, 14] },

/* ---------------- coronary circulation (p16-17) ---------------- */
{ k: 'group', id: 'w8_coronaryart', l: 'Major coronary arteries', parent: 'coronary', w: 8, line: 'the arteries that supply the heart muscle itself', src: [L8, 17] },
{ k: 'group', id: 'w8_lca', l: 'Left coronary artery', parent: 'w8_coronaryart', w: 8, line: 'branches into the LAD and circumflex arteries', src: [L8, 17] },
{ k: 'part', id: 'w8_lad', l: 'Left Anterior Descending (LAD) artery', parent: 'w8_lca', w: 8, line: 'supplies the anterior wall of the left ventricle and the interventricular septum', src: [L8, 17] },
{ k: 'part', id: 'w8_circumflex', l: 'Circumflex artery', parent: 'w8_lca', w: 8, line: 'supplies the lateral and posterior walls of the left ventricle', src: [L8, 17] },
{ k: 'group', id: 'w8_rca', l: 'Right Coronary Artery', parent: 'w8_coronaryart', w: 8, line: 'supplies the right atrium, right ventricle and part of the posterior left ventricle', src: [L8, 17] },
{ k: 'part', id: 'w8_pda', l: 'posterior descending artery', parent: 'w8_rca', w: 8, line: 'given off by the RCA in right-dominant circulation', src: [L8, 17] },
{ k: 'group', id: 'w8_coronaryveins', l: 'Coronary veins', parent: 'coronary', w: 8, line: 'drain the heart muscle into the coronary sinus', src: [L8, 16, 17] },
{ k: 'part', id: 'w8_gcv', l: 'Great cardiac vein', parent: 'w8_coronaryveins', w: 8, line: 'drains into the coronary sinus', src: [L8, 16, 17] },
{ k: 'part', id: 'w8_mcv', l: 'Middle cardiac vein', parent: 'w8_coronaryveins', w: 8, line: 'drains into the coronary sinus', src: [L8, 16, 17] },
{ k: 'part', id: 'w8_scv', l: 'Small cardiac vein', parent: 'w8_coronaryveins', w: 8, line: 'drains into the coronary sinus', src: [L8, 16, 17] },
{ k: 'part', id: 'w8_pvlv', l: 'Posterior vein of left ventricle', parent: 'w8_coronaryveins', w: 8, src: [L8, 16] },
{ k: 'part', id: 'w8_cs', l: 'Coronary sinus', parent: 'w8_coronaryveins', w: 8, line: 'empties into the right atrium', src: [L8, 16, 17] },

/* ---------------- chambers and septa (p18-24) ---------------- */
{ k: 'part', id: 'w8_ra', l: 'Right atrium', parent: 'chambers', w: 8, line: 'receives blood from the systemic circuit', src: [L8, 18] },
{ k: 'part', id: 'w8_rv', l: 'Right ventricle', parent: 'chambers', w: 8, line: 'pumps blood into the pulmonary circuit', src: [L8, 18] },
{ k: 'part', id: 'w8_la', l: 'Left atrium', parent: 'chambers', w: 8, line: 'receives blood from the pulmonary circuit', src: [L8, 18] },
{ k: 'part', id: 'w8_lv', l: 'Left ventricle', parent: 'chambers', w: 8, line: 'pumps blood into the systemic circuit; the thicker wall gives high pressure', src: [L8, 15, 18] },
{ k: 'group', id: 'w8_septa', l: 'Heart septa', parent: 'chambers', w: 8, line: 'muscular partitions that stop oxygen-poor and oxygen-rich blood mixing', src: [L8, 19, 21, 22] },
{ k: 'group', id: 'w8_ias', l: 'Interatrial septum', parent: 'w8_septa', w: 8, line: 'a thin wall between the two atria', src: [L8, 19, 21] },
{ k: 'part', id: 'w8_fossa', l: 'Fossa ovalis', parent: 'w8_ias', w: 8, line: 'the scar left where the foramen ovale closed after birth', src: [L8, 20, 21, 23] },
{ k: 'part', id: 'w8_foramen', l: 'Foramen ovale', parent: 'w8_ias', w: 8, line: 'a fetal shunt letting oxygen-rich blood bypass the lungs', src: [L8, 23] },
{ k: 'group', id: 'w8_ivs', l: 'Interventricular septum', parent: 'w8_septa', w: 8, line: 'a thick wall between the ventricles, much thicker than the interatrial septum', src: [L8, 19, 21] },
{ k: 'part', id: 'w8_muscpart', l: 'Muscular part', parent: 'w8_ivs', w: 8, line: 'large, thick lower part', src: [L8, 21] },
{ k: 'part', id: 'w8_membpart', l: 'Membranous part', parent: 'w8_ivs', w: 8, line: 'small, thin upper part', src: [L8, 21] },
{ k: 'part', id: 'w8_asd', l: 'Atrial septal defect (ASD)', parent: 'w8_septa', w: 8, line: 'an abnormal opening between the atria', src: [L8, 22] },
{ k: 'part', id: 'w8_vsd', l: 'Ventricular septal defect (VSD)', parent: 'w8_septa', w: 8, line: 'an abnormal opening between the ventricles', src: [L8, 22] },
{ k: 'part', id: 'w8_trabeculae', l: 'Trabeculae carneae', parent: 'chambers', w: 8, line: 'irregular ridges of muscle', src: [L8, 20] },
{ k: 'part', id: 'w8_modband', l: 'Moderate band', parent: 'chambers', w: 8, line: 'delivers the stimuli for contraction of the papillary muscles', src: [L8, 20] },
{ k: 'part', id: 'w8_chordae', l: 'Chordae tendineae', parent: 'valves', w: 8, line: 'connect the valve cusps to the papillary muscles; prevent valve prolapse', src: [L8, 20, 24] },
{ k: 'part', id: 'w8_papillary', l: 'Papillary muscle', parent: 'valves', w: 8, line: 'contracts with the ventricle, pulling on the chordae to keep the cusps closed', links: { w8_chordae: 'pulls on the chordae tendineae' }, src: [L8, 20, 24] },

/* ---------------- valves (p25-27) ---------------- */
{ k: 'group', id: 'w8_avvalves', l: 'Atrioventricular (AV) valves', parent: 'valves', w: 8, line: 'folds of fibrous tissue between atria and ventricles; one-way flow', src: [L8, 25] },
{ k: 'part', id: 'w8_tricuspid', l: 'Tricuspid valve', parent: 'w8_avvalves', w: 8, line: 'right atrium to right ventricle; three flaps (cusps)', links: { w8_ra: 'right atrium to right ventricle', w8_rv: 'right atrium to right ventricle' }, src: [L8, 20, 25] },
{ k: 'part', id: 'w8_mitral', l: 'Mitral valve', parent: 'w8_avvalves', w: 8, line: 'left atrium to left ventricle; two flaps (bicuspid)', links: { w8_la: 'left atrium to left ventricle', w8_lv: 'left atrium to left ventricle' }, src: [L8, 20, 25, 26] },
{ k: 'group', id: 'w8_slvalves', l: 'Semilunar valves', parent: 'valves', w: 8, line: 'prevent backflow of blood into the ventricles', src: [L8, 25] },
{ k: 'part', id: 'w8_pulmvalve', l: 'Pulmonary valve', parent: 'w8_slvalves', w: 8, line: 'open while the ventricles contract; closed while they relax', links: { w8_rv: 'the semilunar valve of the pulmonary circuit' }, src: [L8, 25, 26, 27] },
{ k: 'part', id: 'w8_aorticvalve', l: 'Aortic valve', parent: 'w8_slvalves', w: 8, line: 'open while the ventricles contract; closed while they relax', links: { w8_lv: 'the semilunar valve of the systemic circuit' }, src: [L8, 25, 26, 27] },

/* ---------------- cardiac cells and their control (p28-31) ---------------- */
{ k: 'group', id: 'w8_cardiomyocyte', l: 'Contractile cardiomyocytes', parent: 'cardiaccells', w: 8, line: 'striated, branched cells with intercalated discs; they contract to pump blood', src: [L8, 28, 29] },
{ k: 'group', id: 'w8_icd', l: 'Intercalated discs', parent: 'w8_cardiomyocyte', w: 8, line: 'connect cardiac muscle cells', src: [L8, 29] },
{ k: 'part', id: 'w8_desmo', l: 'Desmosomes', parent: 'w8_icd', w: 8, line: 'hold cells together during contraction', src: [L8, 29] },
{ k: 'part', id: 'w8_gapj', l: 'Gap junctions', parent: 'w8_icd', w: 8, line: 'let electrical signals pass quickly from cell to cell', links: { w2_tis_gap: 'the same junction, Week 2' }, src: [L8, 29] },
{ k: 'part', id: 'w8_pacemaker', l: 'Pacemaker (nodal) cells', parent: 'cardiaccells', w: 8, line: 'start the heartbeat; produce electrical impulses automatically', src: [L8, 28] },
{ k: 'part', id: 'w8_purkinje', l: 'Purkinje fibres', parent: 'cardiaccells', w: 8, line: 'carry electrical signals rapidly; coordinate ventricular contraction', src: [L8, 28] },
{ k: 'part', id: 'w8_fibroblast', l: 'Fibroblasts', parent: 'cardiaccells', w: 8, line: 'produce connective tissue; support and repair the heart', src: [L8, 28] },
{ k: 'part', id: 'w8_endothelial', l: 'Endothelial cells', parent: 'cardiaccells', w: 8, line: 'line the heart chambers and blood vessels; a smooth surface for blood flow', src: [L8, 28] },
{ k: 'part', id: 'w8_smoothmuscle', l: 'Smooth muscle cells', parent: 'cardiaccells', w: 8, line: 'in the walls of blood vessels; control vessel diameter', src: [L8, 28] },
{ k: 'part', id: 'w8_hsymp', l: 'Sympathetic Nervous System', parent: 'cardiaccells', w: 8, line: 'the accelerator: norepinephrine speeds the rate and strengthens contraction', links: { symp: 'sympathetic division, Week 7' }, src: [L8, 31] },
{ k: 'part', id: 'w8_hpara', l: 'Parasympathetic Nervous System', parent: 'cardiaccells', w: 8, line: 'the brake: the vagus nerve releases acetylcholine to slow the heart rate', links: { parasymp: 'parasympathetic division, Week 7', w6_cn10: 'uses the vagus nerve' }, src: [L8, 31] },
{ k: 'part', id: 'w8_sanode', l: 'SA node', parent: 'cardiaccells', w: 8, line: 'heavily supplied by both sympathetic and parasympathetic fibres', links: { w8_pacemaker: 'a pacemaker node' }, src: [L8, 31] },
{ k: 'part', id: 'w8_avnode', l: 'AV node', parent: 'cardiaccells', w: 8, line: 'heavily supplied by both sympathetic and parasympathetic fibres', links: { w8_pacemaker: 'a pacemaker node' }, src: [L8, 31] },

/* ---------------- blood vessels (p33-49) ---------------- */
{ k: 'part', id: 'w8_lumen', l: 'lumens', parent: 'bloodvessels', w: 8, match: 'lumens', line: 'the hollow passageway through which blood flows', src: [L8, 33] },
{ k: 'part', id: 'w8_texterna', l: 'Tunica externa', parent: 'bloodvessels', w: 8, line: 'outer layer of connective tissue (adventitia)', src: [L8, 33, 34] },
{ k: 'part', id: 'w8_tmedia', l: 'Tunica media', parent: 'bloodvessels', w: 8, line: 'thick middle layer of smooth muscle and elastic fibres', src: [L8, 33, 34] },
{ k: 'part', id: 'w8_tintima', l: 'Tunica intima', parent: 'bloodvessels', w: 8, line: 'inner layer with a smooth endothelium', src: [L8, 33, 34] },
{ k: 'part', id: 'w8_artery', l: 'Arteries', parent: 'bloodvessels', w: 8, line: 'carry blood away from the heart; thick walls and a narrow lumen', src: [L8, 34] },
{ k: 'part', id: 'w8_arteriole', l: 'Arterioles', parent: 'bloodvessels', w: 8, line: 'small branches that control blood flow into capillaries by vasoconstriction and vasodilation', src: [L8, 35] },
{ k: 'group', id: 'w8_capillary', l: 'Capillaries', parent: 'bloodvessels', w: 8, line: 'where gas, nutrient and waste exchange happens; one cell layer thick', src: [L8, 35] },
{ k: 'part', id: 'w8_contcap', l: 'Continuous Capillaries', parent: 'w8_capillary', w: 8, line: 'least permeable; tight junctions; in muscle, skin, lungs and the CNS',
  links: { w2_tis_tight: 'tight junctions between the cells', w6_bbbarrier: 'found in the blood-brain barrier' }, src: [L8, 37] },
{ k: 'part', id: 'w8_fencap', l: 'Fenestrated Capillaries', parent: 'w8_capillary', w: 8, line: 'pores raise permeability; in the kidneys, intestines, endocrine glands and choroid plexus',
  links: { w6_choroid: 'found in the choroid plexus' }, src: [L8, 38] },
{ k: 'part', id: 'w8_sinusoid', l: 'Sinusoid', parent: 'w8_capillary', w: 8, line: 'large gaps between cells; in the liver, spleen, bone marrow and adrenal medulla', src: [L8, 39] },
{ k: 'part', id: 'w8_venule', l: 'Venules', parent: 'bloodvessels', w: 8, line: 'collect blood from capillaries and drain into veins', src: [L8, 45] },
{ k: 'part', id: 'w8_vein', l: 'Veins', parent: 'bloodvessels', w: 8, line: 'carry blood toward the heart; thinner walls, larger lumen, valves', src: [L8, 45] },
{ k: 'part', id: 'w8_musclepump', l: 'Muscle pump', parent: 'w8_vein', w: 8, line: 'contracting leg muscles squeeze the veins; one-way valves stop backflow', links: { musclestruct: 'skeletal muscle squeezes the veins' }, src: [L8, 48] },
{ k: 'part', id: 'w8_vasa', l: 'Vasa Vasorum', parent: 'bloodvessels', w: 8, line: 'vessels of the vessels; supply the walls of large vessels like the aorta', src: [L8, 46] },
{ k: 'part', id: 'w8_nervi', l: 'Nervi Vasorum', parent: 'bloodvessels', w: 8, line: 'nerves of the vessels; make the vessel constrict or dilate', src: [L8, 46] },

/* ---------------- capillary bed (p40-44) ---------------- */
{ k: 'part', id: 'w8_metart', l: 'Metarterioles', parent: 'capbed', w: 8, line: 'arise from arterioles; smooth muscle regulates flow into the true capillaries', links: { w8_arteriole: 'arterioles give rise to metarterioles' }, src: [L8, 40, 41] },
{ k: 'part', id: 'w8_pcs', l: 'Precapillary sphincters', parent: 'capbed', w: 8, line: 'regulate blood flow into the capillaries', src: [L8, 40] },
{ k: 'part', id: 'w8_thorough', l: 'Thoroughfare channel', parent: 'capbed', w: 8, line: 'connects the metarteriole directly to a venule so blood bypasses the capillaries', src: [L8, 40, 41] },
{ k: 'part', id: 'w8_ava', l: 'Arteriovenous anastomosis', parent: 'capbed', w: 8, line: 'direct arteriole-to-venule link bypassing the capillary bed; smooth muscle acts as a control valve', src: [L8, 40] },
{ k: 'part', id: 'w8_truecap', l: 'True capillaries', parent: 'capbed', w: 8, line: 'make up the majority of the capillary bed', src: [L8, 41] },
{ k: 'part', id: 'w8_postcap', l: 'Postcapillary venules', parent: 'capbed', w: 8, line: 'collect blood from several capillaries leaving the bed', src: [L8, 40] },

/* ---------------- the two circuits (p50-53) ---------------- */
{ k: 'group', id: 'w8_pulm', l: 'Pulmonary circuit', parent: 'circuits', w: 8, line: 'takes blood to and from the lungs: picks up oxygen, gives off carbon dioxide', links: { w8_rv: 'the right ventricle pumps into it', w8_la: 'it returns blood to the left atrium' }, src: [L8, 51, 52] },
{ k: 'part', id: 'w8_pulmart', l: 'Pulmonary arteries', parent: 'w8_pulm', w: 8, line: 'the exception: arteries that carry deoxygenated blood', src: [L8, 5, 34] },
{ k: 'part', id: 'w8_pulmvein', l: 'Pulmonary veins', parent: 'w8_pulm', w: 8, line: 'the exception: veins that carry oxygenated blood', src: [L8, 5, 45] },
{ k: 'group', id: 'w8_syst', l: 'Systemic circuit', parent: 'circuits', w: 8, line: 'takes oxygenated blood to the tissues and returns deoxygenated blood to the heart', links: { w8_lv: 'the left ventricle pumps into it', w8_ra: 'it returns blood to the right atrium' }, src: [L8, 51, 52] },

/* ---------------- systemic arteries (p54-55) ---------------- */
{ k: 'group', id: 'w8_aorta', l: 'Aorta', parent: 'arterial', w: 8, line: 'the largest artery, leaving the left ventricle', links: { w8_lv: 'leaves the left ventricle' }, src: [L8, 5, 54] },
{ k: 'part', id: 'w8_ascaorta', l: 'Ascending aorta', parent: 'w8_aorta', w: 8, line: 'gives rise to the coronary arteries', links: { w8_coronaryart: 'gives rise to the coronary arteries' }, src: [L8, 54] },
{ k: 'group', id: 'w8_arch', l: 'Aortic arch', parent: 'w8_aorta', w: 8, line: 'branches into the brachiocephalic trunk, left common carotid and left subclavian arteries', src: [L8, 54] },
{ k: 'part', id: 'w8_brachioc', l: 'Brachiocephalic trunk', parent: 'w8_arch', w: 8, line: 'to the right arm and head', src: [L8, 54] },
{ k: 'part', id: 'w8_descaorta', l: 'Descending aorta', parent: 'w8_aorta', w: 8, line: 'runs through the thoracic and abdominal regions', src: [L8, 54] },
{ k: 'part', id: 'w8_carotid', l: 'Carotid arteries', parent: 'arterial', w: 8, line: 'to the brain and head', src: [L8, 54] },
{ k: 'part', id: 'w8_subclavian', l: 'Subclavian arteries', parent: 'arterial', w: 8, line: 'to the arms', src: [L8, 54] },
{ k: 'part', id: 'w8_intercostala', l: 'Intercostal arteries', parent: 'arterial', w: 8, line: 'to the chest wall', src: [L8, 54] },
{ k: 'part', id: 'w8_renala', l: 'Renal arteries', parent: 'arterial', w: 8, line: 'to the kidneys', src: [L8, 54] },
{ k: 'part', id: 'w8_iliaca', l: 'Iliac arteries', parent: 'arterial', w: 8, line: 'to the pelvis and legs', src: [L8, 54] },

/* ---------------- systemic veins (p57-58) ---------------- */
{ k: 'group', id: 'w8_svc', l: 'Superior Vena Cava', parent: 'venous', w: 8, line: 'collects blood from the head, neck, upper limbs and chest', src: [L8, 5, 57] },
{ k: 'part', id: 'w8_brachiocv', l: 'brachiocephalic veins', parent: 'w8_svc', w: 8, line: 'right and left; formed by the internal jugular and subclavian veins', src: [L8, 57] },
{ k: 'group', id: 'w8_ivc', l: 'Inferior Vena Cava', parent: 'venous', w: 8, line: 'collects blood from the abdomen, pelvis and lower limbs', src: [L8, 5, 57] },
{ k: 'part', id: 'w8_commoniliac', l: 'Common iliac veins', parent: 'w8_ivc', w: 8, line: 'from the legs and pelvis', src: [L8, 57] },
{ k: 'part', id: 'w8_renalv', l: 'Renal veins', parent: 'w8_ivc', w: 8, line: 'from the kidneys', src: [L8, 57] },
{ k: 'part', id: 'w8_hepaticv', l: 'Hepatic veins', parent: 'w8_ivc', w: 8, line: 'from the liver', src: [L8, 57] },
{ k: 'part', id: 'w8_portal', l: 'hepatic portal vein', parent: 'venous', w: 8, line: 'carries nutrient-rich blood from the GI tract and spleen to the liver before the IVC', links: { w8_ivc: 'blood enters the IVC after the liver' }, src: [L8, 57] },

/* ---------------- azygos system (p59-63) ---------------- */
{ k: 'part', id: 'w8_azygosv', l: 'Azygos vein', parent: 'azygos', w: 8, line: 'right side; drains the right posterior intercostal veins and ascends to the superior vena cava', links: { w8_svc: 'drains to the superior vena cava', w8_ivc: 'origin: lumbar azygos vein / inferior vena cava' }, src: [L8, 57, 59, 60] },
{ k: 'part', id: 'w8_hemiazygos', l: 'Hemiazygos vein', parent: 'azygos', w: 8, line: 'left side; drains the left intercostal veins, then crosses the midline into the azygos', links: { w8_azygosv: 'drains into the azygos vein' }, src: [L8, 59, 60] },
{ k: 'part', id: 'w8_accessoryhemi', l: 'accessory hemiazygos vein', parent: 'azygos', w: 8, line: 'a tributary of the azygos vein', links: { w8_azygosv: 'a tributary of the azygos vein' }, src: [L8, 60] },
{ k: 'part', id: 'w8_batson', l: "Batson's venous plexus", parent: 'azygos', w: 8, line: 'a valveless network of veins around the spine; a route for metastasis and infection', links: { w8_azygosv: 'the azygos system communicates freely with it' }, src: [L8, 63] },

/* ---------------- clinical (p7, 22, 64-66) ---------------- */
{ k: 'part', id: 'w8_cad', l: 'Coronary Artery Disease (CAD)', parent: 'cvdisease', w: 8, line: 'partial or complete blockage of the coronary circulation, leading to ischaemia', links: { w8_coronaryart: 'blockage of the coronary circulation' }, src: [L8, 64] },
{ k: 'part', id: 'w8_atheroscl', l: 'atherosclerosis', parent: 'w8_cad', w: 8, line: 'buildup of fats, cholesterol and other substances (plaque) in the artery walls', src: [L8, 64] },
{ k: 'part', id: 'w8_angina', l: 'Angina', parent: 'w8_cad', w: 8, line: 'pain when the heart muscle is starved of oxygen because the coronary arteries narrow', src: [L8, 64] },
{ k: 'part', id: 'w8_mi', l: 'Myocardial infarction', parent: 'cvdisease', w: 8, line: 'part of the coronary circulation is blocked and cardiac muscle cells die; the dead area is an infarct', links: { w8_cad: 'most commonly results from severe CAD' }, src: [L8, 65] },
{ k: 'part', id: 'w8_tamponade', l: 'Cardiac tamponade', parent: 'cvdisease', w: 8, line: 'fluid in the pericardial sac compresses the heart and cuts cardiac output', links: { w8_pericavity: 'fluid builds up in the pericardial sac' }, src: [L8, 66] },
{ k: 'part', id: 'w8_effusion', l: 'pericardial effusion', parent: 'cvdisease', w: 8, line: 'too much pericardial fluid', links: { w8_pericfluid: 'too much or too little fluid causes problems' }, src: [L8, 7] },
{ k: 'part', id: 'w8_pericarditis', l: 'pericarditis', parent: 'cvdisease', w: 8, line: 'named with effusion as a problem of too much or too little pericardial fluid', src: [L8, 7] },
];
