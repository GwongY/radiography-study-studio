// SP3 Week 11 — rewrite the six digestive items in hss-modules.js.
// Run: node work/.sp3-w11-build.mjs
import fs from 'fs';

const FILE = 'outputs/study/corpus/hss-modules.js';
const MARK = 'export const HSS_MODULES = ';
const txt = fs.readFileSync(FILE, 'utf8');
const head = txt.slice(0, txt.indexOf(MARK));
const arr = JSON.parse(txt.slice(txt.indexOf(MARK) + MARK.length).replace(/;\s*$/, ''));

const items = [

/* ---------------------------------------------------------------- W11-1 */
{
id: 'hss2011-m3-digestive',
subject: 'HSS2011', unit: 'hss.m3', type: 'concept',
title: 'The digestive system: the tract, the accessory organs, and the four-layer wall',
tags: ['digestive', 'abdomen', 'histology', 'high-yield'],
visuals: [
  { fig: 'digestiveSystemOverview' },
  { fig: 'digestiveWallLayers' },
  { gen: true },
],
lesson: {
explanation: `THE TWO SUBDIVISIONS. The digestive system is organised into two anatomical subdivisions. The first is the digestive tract — also known as the alimentary canal or gut — a continuous muscular tube running from the mouth to the anus, about 30 ft (9 m) long in the adult. The second is the set of accessory organs, which never touch the passing food but empty their secretions into the tract: the teeth and tongue, the salivary glands, the liver, the gallbladder and the pancreas. The stomach plus the intestines together are called the gastrointestinal (GI) tract. Food passes along the tract in a fixed sequence: oral cavity, pharynx, oesophagus, stomach, small intestine, large intestine, rectum, anus — a sequence the study manual asks you to name outright.

WHAT EACH REGION CONTRIBUTES. Each organ of the tract has a distinct job. The oral cavity ingests food and mechanically processes it with the accessory teeth and tongue, moistening and mixing it with salivary secretions. The pharynx propels materials muscularly into the oesophagus, and the oesophagus transports them to the stomach. The stomach carries out chemical breakdown of materials by acid and enzymes together with mechanical processing through muscular contraction. The small intestine is where enzymatic digestion and absorption of water, organic substrates, vitamins and ions happen. The large intestine dehydrates and compacts the indigestible residue in preparation for elimination. Of the accessory organs: the salivary glands secrete a lubricating fluid containing enzymes that break down carbohydrates; the liver secretes bile, important for lipid digestion, and performs many other vital functions; the gallbladder stores and concentrates bile; and the pancreas exocrine cells secrete buffers and digestive enzymes while its endocrine cells secrete hormones.

THE WALL PLAN — FOUR LAYERS. From the lumen outwards every part of the tract is built of the same four tissue layers. (1) The mucosa, or mucous membrane, is itself three things: an epithelium, a lamina propria of loose connective tissue, and a muscularis mucosae of smooth muscle. (2) The submucosa is a connective tissue layer containing blood vessels, lymphatic vessels, nerve fibres and mucous glands — for example the oesophageal glands in the oesophagus — along with the submucosal nerve plexus. (3) The muscularis externa has two coats, an inner circular layer and an outer longitudinal layer, except in the stomach, which has three — the tested difference. The myenteric nerve plexus with its parasympathetic ganglia sits between the two muscle coats. (4) The serosa, a loose connective tissue layer with a mesothelial cover, clothes the parts of the tract that protrude into the peritoneal cavity — there it is the same tissue the peritoneum calls the visceral layer.

WHICH EPITHELIUM WHERE. The epithelium of the mucosal layer is simple columnar epithelium along most of the digestive tract — the Module 3.1 fill-in-the-blank answer — suited to secretion and absorption. Stratified squamous epithelium lines the mucosa of the mouth, pharynx, oesophagus and anal canal, the abrasion points at both ends of the tube, protecting them where food is still being chewed, swallowed and voided. The enteric plexuses coordinate the wall automatically: the submucosal plexus governs the mucosa and submucosal glands, and the myenteric plexus drives peristalsis of the muscularis externa.`,
plain: `The digestive system is one 9-metre tube (mouth to anus) plus helper glands that drip into it: salivary glands, liver, gallbladder, pancreas. Mouth → pharynx → oesophagus → stomach → small intestine → large intestine → rectum → anus. Every part of the tube wall has the same four layers: mucosa (lining), submucosa (vessels and nerves), muscularis externa (two smooth-muscle coats — three in the stomach) and serosa (outer cover). Most of the lining is simple columnar epithelium; the mouth, pharynx, oesophagus and anal canal are tough stratified squamous instead.`,
keyFacts: [
'The digestive tract (alimentary canal, gut) is a muscular tube about 30 ft (9 m) long from mouth to anus.',
'Accessory organs: teeth, tongue, salivary glands, liver, gallbladder, pancreas.',
'Stomach plus intestines = the gastrointestinal (GI) tract.',
'Small intestine: enzymatic digestion and absorption of water, organic substrates, vitamins and ions.',
'Large intestine: dehydration and compaction of indigestible material before elimination.',
'Wall layers, lumen outward: mucosa (epithelium + lamina propria + muscularis mucosae), submucosa, muscularis externa, serosa.',
'The muscularis externa has inner circular and outer longitudinal layers — except the stomach, which has three muscle layers.',
'The submucosa carries blood vessels, lymphatic vessels, nerve fibres and mucous glands (e.g. oesophageal glands).',
'Simple columnar epithelium lines most of the tract; stratified squamous lines mouth, pharynx, oesophagus and anal canal against abrasion.',
'The myenteric plexus (between the muscle coats) and submucosal plexus are the enteric nerve networks of the wall.'
],
prerequisites: [],
examples: [
'A biopsy labelled "gastric mucosa, simple columnar epithelium" is normal stomach lining; the same picture from the oesophagus would mean Barrett metaplasia — because the normal oesophageal lining is stratified squamous.'
]
},
memory: {
chunking: 'Four layers lumen-out: Mucosa, Submucosa, Muscularis externa, Serosa — "M-S-M-S".',
firstLetter: 'Tract order: "One Pharaoh Eats Sushi, Small Large Rectums Ache" — Oral, Pharynx, Esophagus, Stomach, Small, Large, Rectum, Anus.',
location: 'Stomach = the ONLY 3-muscle-layer segment; everywhere else the muscularis externa has 2.'
},
practice: [
{ type: 'mcq',
  prompt: 'Which region of the digestive tract has three muscle layers in its muscularis externa?',
  options: ['Oesophagus','Duodenum','Stomach','Rectum'],
  answer: 2,
  explanation: 'The muscularis externa has inner circular and outer longitudinal layers everywhere — except the stomach, which adds a third, innermost oblique layer.',
  src: { ref: 'hss.3.1', location: 'p25 "stomach, which has 3 muscle layers"' } },
{ type: 'cloze',
  prompt: 'The epithelium of the mucosal layer along most of the digestive tract is ______.',
  accept: ['simple columnar epithelium','simple columnar'],
  explanation: 'Model answer: simple columnar epithelium — suited to secretion and absorption along most of the tract.',
  src: { ref: 'hss.revans', location: 'p3 "Simple columnar epithelium"' } },
{ type: 'mcq',
  prompt: 'Blood vessels, lymphatic vessels and the submucosal plexus are found in which wall layer?',
  options: ['Mucosa','Submucosa','Muscularis externa','Serosa'],
  answer: 1,
  explanation: 'The submucosa is the connective tissue layer containing blood vessels, lymphatic vessels, nerve fibres and mucous glands such as the oesophageal glands.',
  src: { ref: 'hss.3.1.2019', location: 'p10 "Four tissue layers"' } },
{ type: 'mcq',
  prompt: 'Stratified squamous epithelium lines the mucosa of all of the following EXCEPT the:',
  options: ['Mouth','Pharynx','Stomach','Anal canal'],
  answer: 2,
  explanation: 'Stratified squamous protects the abrasion points — mouth, pharynx, oesophagus and anal canal. The stomach is simple columnar for secretion.',
  src: { ref: 'hss.3.1', location: 'p25 "Stratified squamous"' } },
{ type: 'cloze',
  prompt: 'The stomach plus the intestines together are called the ______ tract.',
  accept: ['gastrointestinal','GI','gastrointestinal (GI)'],
  explanation: 'Stomach plus intestines = the gastrointestinal (GI) tract; the digestive tract as a whole is the alimentary canal.',
  src: { ref: 'hss.3.1', location: 'p2 "Stomach plus intestines = gastrointestinal (GI) tract"' } },
{ type: 'mcq',
  prompt: 'The digestive tract (alimentary canal) measures approximately:',
  options: ['3 ft (1 m)','9 ft (3 m)','30 ft (9 m)','90 ft (27 m)'],
  answer: 2,
  explanation: 'The tract is a muscular tube about 30 ft (9 m) long from mouth to anus.',
  src: { ref: 'hss.3.1', location: 'p2 "30 ft (9m) long"' } }
],
application: [
{ type: 'scenario',
  prompt: 'A patient swallows a corrosive substance. The endoscopist reports burns in the oesophagus but normal stomach lining architecture. Using the wall-plan and epithelium knowledge, explain why the same four layers can be damaged differently at the two sites, and state which epithelium lines each.',
  model: 'The oesophagus is an abrasion corridor lined by stratified squamous epithelium built for friction, not chemistry, so a corrosive liquid pooling there burns its mucosa directly. The stomach is lined by simple columnar epithelium with mucous cells and a thick protective mucus film over gastric pits, so brief exposure is buffered before acid-and-enzyme mucosa is injured. Both organs share the same four-layer plan (mucosa, submucosa, muscularis externa, serosa — the oesophagus serous-covered only below the diaphragm), so deep burns in either organ threaten the submucosal vessels and could perforate the muscularis externa.',
  rubric: [
'States oesophagus = stratified squamous, stomach = simple columnar with protective mucus',
'Explains the burns pattern from the epithelial difference (abrasion-proofing vs secretory lining)',
'Names the shared four-layer plan and the deep-layer risk (submucosal vessels, perforation)'
  ]
}
],
commonMistakes: [
'Saying the whole tract is stratified squamous — only the ends (mouth, pharynx, oesophagus, anal canal) are; most of the tract is simple columnar.',
'Three muscle layers everywhere — only the stomach has three (outer longitudinal, middle circular, inner oblique); the rest of the tract has two.',
'Counting the teeth and liver inside the tract — they are accessory organs; food never passes through them.'
],
skills: [
'Name the tract regions in order and the accessory organs from a mid-sagittal abdominal diagram.',
'Assign a described histological section (epithelium type, muscle coats, plexuses) to a region of the tract.'
],
selfCheck: 'From memory: the two subdivisions, the tract sequence, the four wall layers in order, where the epithelium changes, and which segment has three muscle layers.',
sourceRefs: [
  { ref: 'hss.3.1', location: 'p2 "Digestive tract (also known as the alimentary canal/gut)"' },
  { ref: 'hss.3.1', location: 'p2 "30 ft (9m) long"' },
  { ref: 'hss.3.1', location: 'p2 "Stomach plus intestines = gastrointestinal (GI) tract"' },
  { ref: 'hss.3.1', location: 'p3 "Enzymatic digestion and absorption of"' },
  { ref: 'hss.3.1', location: 'p3 "Dehydration and compaction of indigestible"' },
  { ref: 'hss.3.1', location: 'p25 "Four tissue layers"' },
  { ref: 'hss.3.1', location: 'p25 "esophageal glands in"' },
  { ref: 'hss.3.1', location: 'p25 "stomach, which has 3 muscle layers"' },
  { ref: 'hss.3.1', location: 'p25 "Stratified squamous"' },
  { ref: 'hss.3.1', location: 'p25 "Simple columnar"' },
  { ref: 'hss.3.1.2019', location: 'p10 "Four tissue layers"' },
  { ref: 'hss.3.1.2019', location: 'p10 "Inner circular layer & Outer longitudinal layer"' },
  { ref: 'hss.manual1920', location: 'p34 "The epithelium of the mucosal layer along most of the digestive tract is"' },
  { ref: 'hss.revans', location: 'p3 "Simple columnar epithelium"' }
]
},

/* ---------------------------------------------------------------- W11-2 */
{
id: 'hss2011-digestive-tract-upper',
subject: 'HSS2011', unit: 'hss.m3', type: 'concept',
title: 'Upper digestive tract: oral cavity, salivary glands, pharynx, oesophagus, stomach',
tags: ['digestive','stomach','oral-cavity','oesophagus','high-yield'],
visuals: [
  { fig: 'salivaryGlands' },
  { fig: 'stomachRegions' },
  { fig: 'stomachWallGlands' },
  { model: { layer: 'organs', meshes: ['Oesophagus','Stomach','Duodenum'], label: 'Oesophagus, stomach and duodenum on the 3D model', caption: 'The oesophagus descends behind the trachea, pierces the diaphragm at the oesophageal hiatus, and enters the stomach at the cardiac orifice; the pylorus leads into the C-shaped duodenum. Tap each structure in the studio to inspect it.' } }
],
lesson: {
explanation: `ORAL CAVITY (BUCCAL CAVITY). The anterior and lateral limits of the mouth are defined by the cheeks, lips and tongue; the roof is the hard and soft palate with its hanging uvula, and the fauces is the posterior opening into the throat. A vestibule lies between the lips/cheeks and the teeth; the parotid duct opens into it opposite the upper molars, the submandibular and sublingual ducts open onto the floor. The oral cavity is lined with a mucous membrane consisting of a mucosa — an epithelium and lamina propria — while a submucosa is not always present. The lining mucosa is non-keratinized stratified squamous epithelium, thick over the buccal mucosa and quite thin on the floor of the mouth. Tonsils guard the entrance: palatine tonsils at the fauces, the lingual tonsil behind, the pharyngeal tonsil in the nasopharynx — lymphoid tissue defending against microbial infection.

SALIVARY GLANDS. Three pairs deliver saliva into the cavity: the parotid salivary gland in front of the ear with its duct opening beside the upper second molar, the submandibular gland under the body of the mandible with its duct forward on the floor, and the sublingual gland under the tongue with multiple small ducts. Saliva is a lubricating fluid containing enzymes that break down carbohydrates. The parotid is the largest salivary gland — the revision MCQ answer.

PHARYNX. The pharynx divides into superior, middle and inferior regions: nasopharynx, oropharynx and laryngopharynx. Its wall has two skeletal-muscle layers — a superficial circular layer and a deep longitudinal layer — whose contraction acts in swallowing. The nasopharynx has only respiratory function; the oropharynx and laryngopharynx are passages for both air and food and contain an upper oesophageal sphincter at the inferior portion before entering the oesophagus.

OESOPHAGUS. A muscular tube 25–30 cm long running posterior to the trachea, beginning in the neck, descending through the superior and then posterior mediastinum, and reaching the abdomen. The oesophageal hiatus is where the oesophagus pierces the diaphragm; the cardiac orifice is where it enters the stomach; the lower oesophageal sphincter protects against acid regurgitation from the stomach. The wall is covered by serosa only at the part below the diaphragm, and the muscularis externa changes down its length: upper 1/3 skeletal muscle only, middle a mixture of skeletal and smooth, lower 1/3 smooth only — the transition from voluntary to involuntary stages of swallowing as food passes downwards.

STOMACH. A J-shaped organ composed of 4 regions: the cardiac region at the oesophageal entrance, the domelike fundus above it, the large body, and the pyloric region (antrum and canal) ending at the pyloric sphincter that guards the exit into the duodenum. The medial superior border is the lesser curvature, the lateral inferior border the greater curvature; the mucosa is thrown into gastric rugae that flatten with distension. Its muscularis externa has THREE smooth layers — outer longitudinal, middle circular, and an innermost oblique muscle layer overlying the mucosa — the tested Module 3.1 blank. The vagus nerves innervate the stomach with parasympathetic stimulation, and contraction of the smooth muscle produces peristalsis.

GASTRIC GLANDS. The gastric mucosa contains gastric pits opening into glands — cardiac, gastric and pyloric glands. The cell types: mucous cells secrete protective mucus; chief cells secrete pepsinogen for protein digestion; parietal cells secrete HCl and intrinsic factor, the vitamin B12 absorption factor; regenerative (stem) cells replace the lining; and enteroendocrine cells (including G cells) secrete hormones into the blood that regulate digestion.`,
plain: `The mouth is lined by tough non-keratinized stratified squamous epithelium and guarded by tonsils. Three salivary gland pairs (parotid — the biggest — submandibular, sublingual) wet the food. The pharynx has three parts; only the nasopharynx is air-only. The oesophagus is a 25–30 cm tube behind the windpipe; its top third is voluntary skeletal muscle, its bottom third smooth muscle, and it pierces the diaphragm at the oesophageal hiatus to reach the cardiac orifice of the stomach. The stomach is J-shaped with four regions (cardia, fundus, body, pylorus), three muscle layers (the extra one is the innermost oblique), rugae, and glands whose parietal cells make acid and intrinsic factor while chief cells make pepsinogen.`,
keyFacts: [
'Oral cavity lining = non-keratinized stratified squamous epithelium (submucosa not always present).',
'Three salivary gland pairs: parotid (largest), submandibular, sublingual — saliva lubricates and contains carbohydrate-digesting enzymes.',
'Pharynx regions: nasopharynx (respiratory only), oropharynx and laryngopharynx (air AND food).',
'Pharyngeal wall = superficial circular + deep longitudinal skeletal muscle layers acting in swallowing.',
'Oesophagus: muscular tube 25–30 cm long, posterior to the trachea.',
'Oesophageal hiatus = where the oesophagus pierces the diaphragm; cardiac orifice = where it enters the stomach; the lower oesophageal sphincter guards against acid reflux.',
'Oesophageal muscularis externa: upper 1/3 skeletal, middle mixed, lower 1/3 smooth — voluntary to involuntary swallowing.',
'The oesophagus is covered by serosa only below the diaphragm.',
'Stomach: J-shaped, 4 regions (cardia, fundus, body, pylorus), lesser and greater curvatures, rugae, 3 muscle layers with innermost oblique.',
'Gastric gland cells: mucous cells (mucus), chief cells (pepsinogen), parietal cells (HCl + intrinsic factor for B12), regenerative cells, enteroendocrine cells (hormones).'
],
prerequisites: ['hss2011-m3-digestive'],
examples: [
'In an emergency intubation or NG-tube pass, the voluntary upper oesophageal segment is why the patient cooperates during the first few centimetres and the smooth muscle takes over beyond.',
'Pernicious anaemia follows autoimmune destruction of parietal cells: no intrinsic factor, no vitamin B12 absorption.'
]
},
memory: {
chunking: 'Oesophagus thirds, top to bottom: Skeletal / Mixed / Smooth — "SMS".',
firstLetter: 'Stomach regions: C-F-B-P ("Come For Breakfast Please"): Cardia, Fundus, Body, Pylorus.',
location: 'Gastric cells: "Parietal = acid + Intrinsic factor" and "Chief = pepsinogen" — PI and C.'
},
practice: [
{ type: 'mcq',
  prompt: 'The largest salivary gland is the:',
  options: ['Submandibular gland','Parotid gland','Sublingual gland','Minor salivary glands'],
  answer: 1,
  explanation: 'Model answer B: the parotid gland is the largest salivary gland; its duct opens into the vestibule opposite the upper molars.',
  src: { ref: 'hss.manual1920', location: 'p34 "The largest salivary gland is:"' } },
{ type: 'cloze',
  prompt: 'The third muscle layer that overlays the mucosa of the stomach wall is known as the ______ muscle.',
  accept: ['oblique','oblique muscle layer','innermost oblique'],
  explanation: 'Model answer: the oblique muscle — the stomach adds an innermost oblique layer to the usual circular and longitudinal coats.',
  src: { ref: 'hss.revans', location: 'p3 "Oblique muscle"' } },
{ type: 'cloze',
  prompt: 'The ______ is the opening where the oesophagus enters the stomach.',
  accept: ['cardiac orifice','cardia'],
  explanation: 'Model answer: the cardiac orifice — the oesophagus pierces the diaphragm at the oesophageal hiatus, then opens into the stomach at the cardiac orifice.',
  src: { ref: 'hss.revans', location: 'p3 "Cardiac orifice"' } },
{ type: 'mcq',
  prompt: 'The muscularis externa of the middle third of the oesophagus contains:',
  options: ['Skeletal muscle only','Smooth muscle only','A mixture of skeletal and smooth muscle','Circular muscle only'],
  answer: 2,
  explanation: 'Upper 1/3 skeletal only, middle a mixture, lower 1/3 smooth only — the shift from voluntary to involuntary swallowing.',
  src: { ref: 'hss.3.1', location: 'p10 "Upper 1/3: skeletal muscle only"' } },
{ type: 'mcq',
  prompt: 'Which gastric gland cell secretes hydrochloric acid AND intrinsic factor?',
  options: ['Chief cell','Mucous neck cell','Parietal cell','G cell'],
  answer: 2,
  explanation: 'Parietal cells secrete HCl and intrinsic factor, required for vitamin B12 absorption. Chief cells secrete pepsinogen.',
  src: { ref: 'hss.3.1', location: 'p14 "Parietal cells-secrete HCl"' } },
{ type: 'mcq',
  prompt: 'Which pharyngeal region serves ONLY the respiratory system?',
  options: ['Nasopharynx','Oropharynx','Laryngopharynx','All three serve both'],
  answer: 0,
  explanation: 'Normally the nasopharynx has only respiratory function; the oropharynx and laryngopharynx are passages for air and food.',
  src: { ref: 'hss.3.1', location: 'p8 "Nasopharynx has only"' } }
],
application: [
{ type: 'scenario',
  prompt: 'A 60-year-old alcoholic has forceful vomiting, then severe chest pain and surgical emphysema. CT shows a full-thickness tear of the distal oesophagus just above the diaphragm (Boerhaave syndrome). Explain, using the wall anatomy, why the tear is in the lower third and what the lack of serosa there means for the leak.',
  model: 'The tear is in the lower third because that segment is all smooth muscle under the highest intraluminal pressures of retching — the voluntary skeletal upper third and the mixed middle third are not where forceful vomiting peaks. The distal intra-abdominal/infer mediastinal segment below the diaphragm is the only part covered by serosa, and just above the hiatus the oesophagus has NO serosal coat — only loose connective tissue — so nothing bounds the leak; gastric content escapes freely into the inferior mediastinum, causing mediastinitis and the subcutaneous air. The oesophageal hiatus is also the narrowest boundary it crosses, which is where pressure concentrates.',
  rubric: [
'Localises the weakness to the lower-third smooth-muscle segment under vomiting pressure',
'States the oesophagus lacks serosa except below the diaphragm, so the leak is uncontained',
'Connects the oesophageal hiatus crossing to the site of rupture and mediastinal contamination'
  ]
}
],
commonMistakes: [
'Calling the submandibular gland the largest — the parotid is the largest salivary gland.',
'Putting the upper oesophageal sphincter in the laryngopharynx top — it sits at the INFERIOR portion of the laryngopharynx, before the oesophagus.',
'Saying the oesophagus has serosa along its whole length — it is serosa-covered only below the diaphragm.',
'Mixing the gastric cells: chief cells make pepsinogen, PARIETAL cells make HCl + intrinsic factor (not the other way round).'
],
skills: [
'Label a mid-sagittal head-and-neck section: oral cavity boundaries, the three pharynx parts and the tonsils.',
'Draw the stomach and label its 4 regions, 2 curvatures, rugae and the three muscle layers.'
],
selfCheck: 'From memory: the three salivary gland pairs and the largest; the three pharynx regions and which serve food; the oesophagus landmarks (hiatus, cardiac orifice, sphincters) and its muscle thirds; the stomach regions, curvatures, muscle layers and the four gastric gland cell types.',
sourceRefs: [
  { ref: 'hss.3.1', location: 'p7 "the cheeks, lips, and tongue"' },
  { ref: 'hss.3.1', location: 'p7 "Non-keratinized stratified"' },
  { ref: 'hss.3.1', location: 'p8 "Nasopharynx has only"' },
  { ref: 'hss.3.1', location: 'p8 "passages for air and food"' },
  { ref: 'hss.3.1', location: 'p8 "esophageal sphincter at"' },
  { ref: 'hss.3.1', location: 'p9 "esophageal hiatus"' },
  { ref: 'hss.3.1', location: 'p9 "Cardiac orifice"' },
  { ref: 'hss.3.1', location: 'p9 "Lower esophageal"' },
  { ref: 'hss.3.1', location: 'p10 "Upper 1/3: skeletal muscle only"' },
  { ref: 'hss.3.1', location: 'p10 "serosa only at the part below"' },
  { ref: 'hss.3.1', location: 'p12 "A J-shaped organ"' },
  { ref: 'hss.3.1', location: 'p12 "Composed of 4 regions"' },
  { ref: 'hss.3.1', location: 'p12 "Oblique muscle layer"' },
  { ref: 'hss.3.1', location: 'p12 "Gastric rugae"' },
  { ref: 'hss.3.1', location: 'p14 "Chief cells"' },
  { ref: 'hss.3.1', location: 'p14 "Parietal cells-secrete HCl"' },
  { ref: 'hss.3.1', location: 'p14 "intrinsic factor"' },
  { ref: 'hss.3.1', location: 'p14 "Enteroendocrine cells"' },
  { ref: 'hss.3.1', location: 'p26 "Parotid salivary"' },
  { ref: 'hss.3.1', location: 'p26 "Sublingual"' },
  { ref: 'hss.3.1', location: 'p26 "Submandibular"' },
  { ref: 'hss.3.1.2019', location: 'p8 "Non-keratinized stratified squamous epithelium."' },
  { ref: 'hss.3.1.2019', location: 'p13 "vagus nerves innervate the stomach"' },
  { ref: 'hss.3.1.2019', location: 'p15 "Chief cells secrete pepsinogen"' },
  { ref: 'hss.manual1920', location: 'p34 "The largest salivary gland is:"' },
  { ref: 'hss.manual1920', location: 'p34 "The third muscle layer that overlaying mucosa"' },
  { ref: 'hss.revans', location: 'p3 "Oblique muscle"' },
  { ref: 'hss.revans', location: 'p3 "Cardiac orifice"' }
]
},

/* ---------------------------------------------------------------- W11-3 */
{
id: 'hss2011-digestive-tract-small-large-bowel',
subject: 'HSS2011', unit: 'hss.m3', type: 'concept',
title: 'Small and large intestine: segments, surface amplification, colon features, anal canal',
tags: ['digestive','small-intestine','colon','high-yield'],
visuals: [
  { fig: 'smallIntestineVillus' },
  { fig: 'largeIntestineAnatomy' },
  { model: { layer: 'organs', meshes: ['Duodenum','Jejunum','Ascending colon','Transverse colon','Descending colon','Sigmoid colon','Vermiform appendix'], label: 'The bowel on the 3D model', caption: 'Duodenum and jejunum of the small intestine, then the colon frame — ascending, transverse, descending, sigmoid — with the vermiform appendix at the caecum. Trace the food path and note where the mesentery lets the bowel move.' } },
  { gen: true }
],
lesson: {
explanation: `SMALL INTESTINE — THREE SEGMENTS. The small intestine is divided into duodenum, jejunum and ileum. The duodenum is the first 10 inches, beginning at the pyloric sphincter and ending at the duodenojejunal flexure; it is clinically treated as an organ on its own (duodenal ulceration) and it collects bile from the liver/gallbladder and pancreatic enzymes from the pancreas, regulated at the hepatopancreatic sphincter. The jejunum is about 8 ft — the proximal 40% beyond the duodenum — where most digestion and nutrient absorption occurs: thick-walled, highly folded, with a rich blood supply. The ileum is about 12 ft — the distal 60% — less vascular, more thinly walled and less muscular, and it carries Peyer's patches, clusters of lymphatic nodules forming an immune organ with lymphocytes and antibodies. The ileum ends at the ileocecal junction, where the ileocecal valve — a sphincter muscle leading into the caecum — controls the passage of food into the large intestine. The ileum is the longest part of the gut: the revision MCQ answer.

SURFACE AMPLIFICATION — ~200 m². Three levels of internal folds multiply the absorptive surface to about 200 m²: the circular folds (plicae circulares) run from the duodenum to the middle of the ileum; the villi are largest in the duodenum and progressively smaller distally; and microvilli — hairlike projections about 1 µm high — form the brush border on the absorptive cells and carry membrane enzymes. A villus core is lamina propria holding a capillary network plus a lacteal (lymphatic capillary). Two epithelial cell types face the lumen — columnar absorptive cells and mucus-secreting goblet cells — sealed by tight junctions that prevent digestive enzymes leaking out. Carbohydrates (as glucose) and proteins (as amino acids) are absorbed into blood capillaries; lipids (fatty acids) are absorbed into the lacteal.

LARGE INTESTINE. About 5 ft long, frames the abdomen: caecum with the vermiform appendix below the ileocecal valve, then ascending, transverse, descending and sigmoid colon into the rectum. The colon has a larger diameter and a thinner wall than the small intestine, and its luminal surface has NO circular folds or villi. Its mucosa is simple columnar epithelium (except at the anal canal) heavy with goblet cells secreting mucus for the water-absorption function. Its muscularis externa has three thickened longitudinal bands — the teniae coli — whose resting tone contracts the colon lengthwise so the wall bulges into sacs called haustra; omental (epiploic) appendices are club-like fatty pouches of peritoneum hanging from the serosa, function unknown; and lymphatic tissue in the wall protects against the bacteria of the colon.

RECTUM AND ANAL CANAL. The rectum begins at vertebral level S2, runs in the pelvic cavity about 6 in. long, and continues as the anal canal, which terminates at the anus between two muscular rings. The internal anal sphincter is smooth muscle under involuntary control — it relaxes automatically when the rectum is distended with faeces. The external anal sphincter is skeletal muscle under voluntary control — it lets you postpone defecation. The levator ani forms the pelvic diaphragm around the canal, and anal columns and anal sinuses mark the mucosa of the upper canal.`,
plain: `Small intestine = duodenum (10 in, receives bile and pancreatic juice) + jejunum (8 ft, does most absorption) + ileum (12 ft, longest, Peyer's patches). Folds + villi + microvilli multiply the surface to ~200 m²; sugars and amino acids go to blood, fats to the lacteal. Large intestine = caecum + appendix + colon; no villi, lots of goblet-cell mucus, three muscle bands (teniae coli) that pouch the wall into haustra, fatty omental appendices hanging off. The anal canal ends between an involuntary internal sphincter (smooth muscle) and a voluntary external one (skeletal muscle).`,
keyFacts: [
'Duodenum: first 10 in., pyloric sphincter to duodenojejunal flexure; receives bile and pancreatic enzymes.',
'Jejunum: ~8 ft, proximal 40%, most digestion and absorption; thick wall, rich blood supply.',
'Ileum: ~12 ft, distal 60%, less vascular; Peyer patches; ends at the ileocecal valve — the longest gut segment.',
'Surface amplification: circular folds + villi (largest in duodenum) + microvilli (brush border) ≈ 200 m².',
'Villus: columnar absorptive cells + goblet cells; glucose and amino acids → blood capillary, fatty acids → lacteal.',
'Tight junctions between epithelial cells prevent digestive enzymes leaking out.',
'Colon: larger diameter, thinner wall, NO villi or circular folds; simple columnar epithelium with goblet cells.',
'Teniae coli = three longitudinal smooth-muscle bands of the COLON; their tone creates haustra.',
'Omental appendices = fatty peritoneal pouches on the colon serosa, function unknown.',
'Internal anal sphincter = smooth muscle, involuntary; external anal sphincter = skeletal muscle, voluntary.'
],
prerequisites: ['hss2011-digestive-tract-upper'],
examples: [
'Crohn disease favours the terminal ileum — where Peyer patches concentrate; the lymphoid tissue is part of why.',
'On barium enema the haustra and the colon frame are diagnostic: small bowel shows plicae and a narrower calibre instead.'
]
},
memory: {
chunking: 'Segments: DJI = 10 in + 8 ft + 12 ft (Duodenum, Jejunum, Ileum — absorption peaks in the middle).',
firstLetter: 'Colon trio T-H-O: Teniae coli, Haustra, Omental appendices — the three features the small bowel lacks.',
location: 'Surface ×3: folds → villi → microvilli, biggest at the duodenum, shrinking downstream.'
},
practice: [
{ type: 'mcq',
  prompt: 'Which part of the gut has the longest length?',
  options: ['Oesophagus','Duodenum','Jejunum','Ileum'],
  answer: 3,
  explanation: 'Model answer D: the ileum (~12 ft) is the longest single segment of the tract.',
  src: { ref: 'hss.manual1920', location: 'p34 "Which part of the gut has the longest length?"' } },
{ type: 'mcq',
  prompt: 'Teniae coli are found in which part of the digestive tract?',
  options: ['Jejunum','Cecum','Colon','Rectum'],
  answer: 2,
  explanation: 'Model answer C: teniae coli — three longitudinal smooth-muscle bands — are a feature of the colon.',
  src: { ref: 'hss.manual1920', location: 'p34 "Teniae coli are found in which part"' } },
{ type: 'cloze',
  prompt: 'The clusters of prominent lymphatic nodules in the ileum are called ______ patches.',
  accept: ["Peyer's","Peyer","peyers"],
  explanation: 'Peyer patches — aggregated lymphoid nodules of the ileum, an immune organ with lymphocytes and antibodies.',
  src: { ref: 'hss.fib5yr', location: 'p10 "Peyer patches"' } },
{ type: 'cloze',
  prompt: 'The ______ valve regulates the passage of food residue from ileum into the first part of the colon, the cecum.',
  accept: ['ileocecal','ileocaecal'],
  explanation: 'The ileocecal valve — a sphincter muscle at the ileocecal junction controlling passage into the caecum.',
  src: { ref: 'hss.fib5yr', location: 'p11 "ileocecal valve regulates the passage of food residue"' } },
{ type: 'mcq',
  prompt: 'Which structural feature does the large intestine LACK compared with the small intestine?',
  options: ['Goblet cells','Circular folds and villi','Lymphatic tissue','Simple columnar epithelium'],
  answer: 1,
  explanation: 'The colon has no circular folds or villi; it relies on goblet-cell mucus and its own mucosa for its water-absorption role.',
  src: { ref: 'hss.3.1', location: 'p23 "No circular folds or villi"' } },
{ type: 'mcq',
  prompt: 'A patient cannot voluntarily postpone defecation after spinal surgery. Which sphincter was most likely affected?',
  options: ['Internal anal sphincter','External anal sphincter','Ileocecal valve','Pyloric sphincter'],
  answer: 1,
  explanation: 'The external anal sphincter is skeletal muscle under voluntary control; the internal sphincter is smooth muscle and relaxes automatically.',
  src: { ref: 'hss.3.1.2019', location: 'p34 "External anal sphincter is made up of skeletal muscle"' } }
],
application: [
{ type: 'scenario',
  prompt: 'A surgical specimen is labelled "bowel resection". It has: sacculations in the wall, three longitudinal muscle bands visible on the serosa, fat-filled pouches, and a lumen with no villi. Which part of the bowel is it, what are the three named features, and why does the absence of villi not defeat this segment\'s function?',
  model: 'It is large intestine (colon). The three features are the teniae coli (three longitudinal bands of smooth muscle), the haustra (the sacculations their tone produces) and the omental appendices (fat-filled peritoneal pouches on the serosa). The colon\'s job is not enzymatic absorption but dehydration and compaction of indigestible residue plus water absorption, which a flat, villus-free, goblet-cell-rich mucosa performs fine — villi are the small intestine\'s solution to nutrient uptake, not a requirement for every bowel segment.',
  rubric: [
'Identifies colon, naming teniae coli, haustra and omental appendices',
'Uses the no-villi/no-fold histology as the discriminating feature vs small bowel',
'Explains the function (water absorption, compaction) that does not need villi'
  ]
}
],
commonMistakes: [
'Calling the duodenum the longest gut segment — the ileum is (MCQ every year); the duodenum is the SHORTEST.',
'Putting teniae coli on the small intestine — they are colon-only bands.',
'Saying villi are largest in the ileum — they are largest in the duodenum and shrink distally.',
'Reversing the sphincters: internal = smooth/involuntary, external = skeletal/voluntary.'
],
skills: [
'Trace the bowel on an abdominal diagram from pyloric sphincter to anus, naming every segment.',
'Identify small vs large bowel on contrast studies from haustra, calibre and fold pattern.'
],
selfCheck: 'From memory: the three small-intestine segments with lengths and functions, the three surface-amplification levels, the villus cell types and the blood-vs-lacteal split, the colon trio (teniae, haustra, appendices), and the two anal sphincters.',
sourceRefs: [
  { ref: 'hss.3.1', location: 'p15 "begins at pyloric sphincter"' },
  { ref: 'hss.3.1', location: 'p15 "most digestion"' },
  { ref: 'hss.3.1', location: 'p15 "less vascular"' },
  { ref: 'hss.3.1', location: 'p15 "Ileocecal valve"' },
  { ref: 'hss.3.1', location: 'p17 "columnar absorptive cells"' },
  { ref: 'hss.3.1', location: 'p17 "Tight junctions prevent digestive enzymes"' },
  { ref: 'hss.3.1', location: 'p19 "Circular folds"' },
  { ref: 'hss.3.1', location: 'p19 "200m2"' },
  { ref: 'hss.3.1', location: 'p19 "Microvilli"' },
  { ref: 'hss.3.1', location: 'p19 "Lacteal"' },
  { ref: 'hss.3.1', location: 'p21 "Teniae coli"' },
  { ref: 'hss.3.1', location: 'p21 "Haustra"' },
  { ref: 'hss.3.1', location: 'p21 "Omental appendices"' },
  { ref: 'hss.3.1', location: 'p22 "The colon has a larger diameter"' },
  { ref: 'hss.3.1', location: 'p23 "5 ft long"' },
  { ref: 'hss.3.1', location: 'p23 "No circular folds or villi"' },
  { ref: 'hss.3.1', location: 'p23 "Goblet cells are present"' },
  { ref: 'hss.3.1', location: 'p23 "Lymphatic tissue"' },
  { ref: 'hss.3.1', location: 'p24 "Internal anal"' },
  { ref: 'hss.3.1', location: 'p24 "External anal"' },
  { ref: 'hss.3.1.2019', location: 'p17 "Duodenum - first 10 in."' },
  { ref: 'hss.3.1.2019', location: 'p17 "Jejunum (proximal 40%"' },
  { ref: 'hss.3.1.2019', location: 'p17 "Ileum (distal 60%"' },
  { ref: 'hss.3.1.2019', location: 'p20 "absorbed into lymphatic vessels"' },
  { ref: 'hss.3.1.2019', location: 'p34 "Rectum begins at S2"' },
  { ref: 'hss.3.1.2019', location: 'p34 "Internal anal sphincter is made up of smooth muscle"' },
  { ref: 'hss.3.1.2019', location: 'p34 "External anal sphincter is made up of skeletal muscle"' },
  { ref: 'hss.manual1920', location: 'p34 "Which part of the gut has the longest length?"' },
  { ref: 'hss.manual1920', location: 'p34 "Teniae coli are found in which part"' },
  { ref: 'hss.fib5yr', location: 'p10 "Peyer patches"' },
  { ref: 'hss.fib5yr', location: 'p11 "ileocecal valve regulates the passage of food residue"' },
  { ref: 'hss.fib5yr', location: 'p11 "teniae coli contracts and causes wall of the colon to bulge"' }
]
},

/* ---------------------------------------------------------------- W11-4 */
{
id: 'hss2011-digestive-accessory-liver-pancreas',
subject: 'HSS2011', unit: 'hss.m3', type: 'concept',
title: 'Accessory organs: salivary glands, liver and its lobules, gallbladder and biliary tree, pancreas',
tags: ['digestive','liver','pancreas','gallbladder','high-yield'],
visuals: [
  { fig: 'liverLobuleAnatomy' },
  { fig: 'biliaryPancreaticDucts' },
  { model: { layer: 'organs', meshes: ['Liver','Gallbladder','Pancreas'], label: 'Liver, gallbladder and pancreas on the 3D model', caption: 'The liver fills the right upper quadrant with the gallbladder on its inferior surface; the pancreas lies behind the stomach with its head in the duodenal C. The biliary ducts and pancreatic duct converge on the duodenal ampulla.' } },
  { gen: true }
],
lesson: {
explanation: `LIVER — GROSS. The liver is the largest internal organ, sitting under the diaphragm in the right upper quadrant. On its anterior surface the falciform ligament separates the anatomical right and left lobes and anchors the liver to the anterior abdominal wall; its free edge carries the round ligament (ligamentum teres), the fibrous remnant of the fetal umbilical vein. On the posterior/inferior surface the coronary ligaments suspend the liver from the diaphragm, and between the anatomical divisions sit the caudate lobe (posterior, beside the IVC) and quadrate lobe (anterior, beside the gallbladder) — the quadrate lobe is purely a topographic term with no functional implication. The porta hepatis is the hilum of the liver: a point of entry for the hepatic portal vein and the hepatic artery proper, and a point of exit for the bile passages (right and left hepatic ducts).

LIVER — HISTOLOGY. The functional unit is the hepatic lobule — a hexagonal plate about 1 mm across. Plates of hepatocytes radiate from a central vein toward the corners, blood running between them in leaky sinusoids lined with phagocytic Kupffer cells that cleanse the blood of bacteria and debris. Bile runs the opposite way, from bile canaliculi between hepatocytes into bile ductules. At each hexagon corner is a portal area (hepatic triad) of three structures: a branch of the hepatic portal vein (about 70–80% of inflow, carrying nutrients from the stomach, intestines, pancreas and spleen), a branch of the hepatic artery proper (about 30%, oxygen), and a bile duct. A classic lobule is described with six portal areas around its periphery — the revision MCQ answer. Blood flows sinusoid → central vein → hepatic veins → inferior vena cava.

GALLBLADDER AND BILIARY TREE. The gallbladder is a pear-shaped organ on the inferior liver surface — fundus, body, neck — that stores and concentrates the bile the liver makes; bile enters and leaves via the cystic duct. The right and left hepatic ducts join as the common hepatic duct; the cystic duct joins it to form the common bile duct (CBD), which — usually joined by the pancreatic duct at the duodenal ampulla — opens at the major duodenal papilla into the SECOND part of the duodenum, guarded by the hepatopancreatic sphincter. Bile is released from the gallbladder after a fatty meal, the sphincter relaxing to let bile and pancreatic juice mix and enter the duodenum. Gallstones form when bile concentrates — the clinical note attached to this flow.

PANCREAS. A soft retroperitoneal gland posterior to the stomach: head tucked into the C-shaped curve of the duodenum (with a hook-shaped uncinate process), body, and blunt tapered tail pointing toward the spleen — about 15 cm long. It is BOTH exocrine and endocrine. Exocrine: acinar cells make, store and secrete pancreatic enzymes as pancreatic juice, carried along the pancreatic duct; the enzymes are activated in the duodenum, and most digestion is carried out by pancreatic enzymes. The pancreatic duct joins the common bile duct to form an ampulla before release — the recurring 5-year blank. Endocrine: pancreatic islet cells secrete insulin and glucagon, two antagonistic hormones, into blood vessels — regulating blood sugar (glucose homeostasis).`,
plain: `The liver's four anatomical lobes (right, left, quadrate, caudate) are topped up by blood at the porta hepatis — portal vein in with nutrients, hepatic artery in with oxygen, bile ducts out. Its million-odd hexagonal lobules filter that blood through hepatocyte plates and sinusoids (with Kupffer cells) to the central vein, while bile drains the opposite way to a bile duct at each triad corner — six triads per lobule. The gallbladder stores and concentrates bile and squirts it down the cystic duct into the common bile duct after a fatty meal, into part two of the duodenum past the hepatopancreatic sphincter. The pancreas behind the stomach (head in the duodenal C, tail to the spleen) makes the enzymes that actually do most digestion (exocrine acini, activated in the duodenum) and insulin/glucagon (endocrine islets).`,
keyFacts: [
'Porta hepatis = entry of hepatic portal vein + hepatic artery proper, exit of the bile passages.',
'The falciform ligament separates right and left lobes anteriorly; the round ligament is the umbilical-vein remnant.',
'Hepatic lobule = hexagonal plate ~1 mm with hepatocyte plates, sinusoids and a central vein.',
'Kupffer cells are the phagocytic macrophages lining the liver sinusoids.',
'Portal area (hepatic triad) = branch of hepatic portal vein + branch of hepatic artery proper + bile duct; six per classic lobule.',
'Portal vein carries ~70–80% of liver inflow (nutrient-rich); hepatic artery ~30% (oxygen).',
'Gallbladder: pear-shaped, stores and CONCENTRATES bile; enters/leaves via the cystic duct.',
'Right + left hepatic ducts → common hepatic duct; + cystic duct → common bile duct → duodenal ampulla → 2nd part of duodenum, guarded by the hepatopancreatic sphincter.',
'Pancreas: head (uncinate process) in the duodenal C, body, tail to spleen; retroperitoneal, posterior to stomach.',
'Exocrine acinar cells secrete pancreatic enzymes (activated in the duodenum); endocrine islets secrete insulin and glucagon for glucose homeostasis.'
],
prerequisites: ['hss2011-m3-digestive'],
examples: [
'Gallstones lodging at the ampulla can also block the pancreatic duct — biliary colic plus pancreatitis from one stone.',
'Cirrhosis scars the sinusoids: portal blood cannot get through, and portal hypertension follows — the anatomy of the lobule explains the physiology.'
]
},
memory: {
chunking: 'Triad = V-A-B: Vein (portal), Artery (proper), Bile duct — one at each hexagon corner, six corners.',
firstLetter: 'Duct chain: "Rude Hens Crave Bread" — Right hepatic, common Hepatic, Cystic, common Bile duct.',
location: 'Pancreas head = duodenal C; tail = spleen. "Head meets the C, tail tips to the spleen."'
},
practice: [
{ type: 'mcq',
  prompt: 'How many hepatic triad(s) can be found in a hepatic lobule?',
  options: ['1','3','6','8'],
  answer: 2,
  explanation: 'Model answer C: six portal areas (triads) sit around the periphery of a classic hexagonal lobule.',
  src: { ref: 'hss.manual1920', location: 'p34 "How many hepatic triad(s)"' } },
{ type: 'cloze',
  prompt: 'The pancreatic duct joins with the common bile duct to form an ______ before the release of bile and pancreatic juice to the duodenum.',
  accept: ['ampulla','hepatopancreatic ampulla','ampulla of vater'],
  explanation: 'The duodenal (hepatopancreatic) ampulla — its opening at the major duodenal papilla is guarded by the hepatopancreatic sphincter.',
  src: { ref: 'hss.fib5yr', location: 'p9 "pancreatic duct joins with the common bile duct to form an ampulla"' } },
{ type: 'mcq',
  prompt: 'In the More-exercises labelling (Module 3), structure B — the duct joining the gallbladder to the biliary tree — is the:',
  options: ['Common hepatic duct','Cystic duct','Common bile duct','Pancreatic duct'],
  answer: 1,
  explanation: 'The cystic duct connects the gallbladder to the common hepatic duct; their union forms the common bile duct.',
  src: { ref: 'hss.revans', location: 'p4 "Cystic duct"' } },
{ type: 'mcq',
  prompt: 'Bile enters the duodenum:',
  options: ['Continuously, from the liver only','After a fatty meal, via the cystic duct and common bile duct','Via the main pancreatic duct alone','Into the first part of the duodenum at the pylorus'],
  answer: 1,
  explanation: 'Bile is released from the gallbladder after a fatty meal and enters the SECOND part of the duodenum via the cystic duct and CBD, past the hepatopancreatic sphincter.',
  src: { ref: 'hss.3.1.2019', location: 'p22 "released from the gallbladder after a fatty meal"' } },
{ type: 'mcq',
  prompt: 'Which cells line the liver sinusoids and phagocytose debris and bacteria?',
  options: ['Hepatocytes','Kupffer cells','Acinar cells','Enteroendocrine cells'],
  answer: 1,
  explanation: 'Kupffer cells are the sinusoidal macrophages of the liver; hepatocytes are the functional plates, acinar cells belong to the pancreas.',
  src: { ref: 'hss.3.1', location: 'p28 "Kupffer"' } },
{ type: 'mcq',
  prompt: 'The pancreatic hormones insulin and glucagon are described as:',
  options: ['Synergistic','Antagonistic','Identical in action','Digestive enzymes'],
  answer: 1,
  explanation: 'Insulin and glucagon are two antagonistic hormones regulating blood glucose homeostasis — islet (endocrine) products, not enzymes.',
  src: { ref: 'hss.3.1', location: 'p30 "insulin & glucagon"' } }
],
application: [
{ type: 'scenario',
  prompt: 'An ultrasound reports stones in the gallbladder neck and a dilated common bile duct. Explain, naming every duct in order, where a stone travelling from the gallbladder must pass, and why the same stone can cause both jaundice and digestive trouble after fatty meals.',
  model: 'A stone leaves the gallbladder neck via the cystic duct; where the cystic duct meets the right-and-left hepatic ducts\' union (the common hepatic duct) the common bile duct begins; the CBD descends to join the pancreatic duct at the duodenal ampulla and enters the second part of the duodenum through the major duodenal papilla, guarded by the hepatopancreatic sphincter. A stone stuck in the CBD blocks bile delivery, so conjugated bile backs up into blood = jaundice, and no bile reaches the duodenum after a fatty meal — bile being the lipid-digestion secretion — so fatty foods cause pain and maldigestion. If the stone blocks at the ampulla it can also obstruct pancreatic juice, producing pancreatitis.',
  rubric: [
'Names the duct sequence cystic → common hepatic/common bile → ampulla → 2nd part duodenum',
'Explains jaundice from blocked bile flow into the duodenum',
'Explains post-fatty-meal pain and the ampullary pancreatitis risk'
  ]
}
],
commonMistakes: [
'Saying the gallbladder MAKES bile — the liver makes it; the gallbladder stores and concentrates it.',
'Placing the bile entry in the first part of the duodenum — bile and pancreatic juice enter the SECOND part at the major duodenal papilla.',
'Calling the quadrate and caudate lobes functional units — the quadrate lobe is purely topographic; the functional split is right/left by the falciform ligament (and the portal divides it differently).',
'Forgetting the portal vein brings the most blood (~70–80%) while the hepatic artery brings the oxygen.'
],
skills: [
'Label the biliary tree from a diagram: right/left hepatic, common hepatic, cystic, common bile ducts, ampulla, papilla.',
'Sketch a lobule: central vein, hepatocyte plates, sinusoids, Kupffer cells, six portal triads.'
],
selfCheck: 'From memory: porta hepatis contents, the lobule and triad, the duct chain from liver to duodenum, where the ampulla opens, and the pancreas\' two functions with their cell types.',
sourceRefs: [
  { ref: 'hss.3.1', location: 'p27 "Right lobe of liver"' },
  { ref: 'hss.3.1', location: 'p27 "Left lobe"' },
  { ref: 'hss.3.1', location: 'p28 "Hepatic lobules as"' },
  { ref: 'hss.3.1', location: 'p28 "hexagonal plates"' },
  { ref: 'hss.3.1', location: 'p28 "Kupffer"' },
  { ref: 'hss.3.1', location: 'p28 "Sinusoid"' },
  { ref: 'hss.3.1', location: 'p28 "Portal Area"' },
  { ref: 'hss.3.1', location: 'p28 "Hepatocytes"' },
  { ref: 'hss.3.1', location: 'p30 "Acinar cells make"' },
  { ref: 'hss.3.1', location: 'p30 "insulin & glucagon"' },
  { ref: 'hss.3.1', location: 'p30 "Enzymes are activated in the duodenum"' },
  { ref: 'hss.3.1', location: 'p31 "Pear-shaped organ stores and concentrates bile"' },
  { ref: 'hss.3.1', location: 'p31 "Cystic duct"' },
  { ref: 'hss.3.1', location: 'p31 "Hepatopancreatic"' },
  { ref: 'hss.3.1.2019', location: 'p22 "released from the gallbladder after a fatty meal"' },
  { ref: 'hss.3.1.2019', location: 'p24 "insulin & glucagon"' },
  { ref: 'hss.3.3.2019', location: 'p34 "Porta Hepatis"' },
  { ref: 'hss.3.3.2019', location: 'p34 "Quadrate lobe"' },
  { ref: 'hss.3.3.2019', location: 'p34 "Common bile duct"' },
  { ref: 'hss.3.3.2019', location: 'p36 "gall stones formation"' },
  { ref: 'hss.manual1920', location: 'p34 "How many hepatic triad(s)"' },
  { ref: 'hss.fib5yr', location: 'p9 "pancreatic duct joins with the common bile duct to form an ampulla"' },
  { ref: 'hss.fib5yr', location: 'p12 "Quadrate(anterior), and Caudate (posterior)"' },
  { ref: 'hss.revans', location: 'p4 "Cystic duct"' },
  { ref: 'hss.revans', location: 'p4 "Common hepatic duct"' },
  { ref: 'hss.revans', location: 'p4 "Gall bladder"' }
]
},

/* ---------------------------------------------------------------- W11-5 */
{
id: 'hss2011-digestive-peritoneum-portal-circulation',
subject: 'HSS2011', unit: 'hss.m3', type: 'concept',
title: 'Peritoneum, mesenteries and omenta; the three gut arteries and the hepatic portal system',
tags: ['digestive','peritoneum','portal','vasculature','high-yield'],
visuals: [
  { fig: 'peritoneumMesenteries' },
  { model: { layer: 'organs', meshes: ['Stomach','Liver','Transverse colon'], label: 'Intraperitoneal organs on the 3D model', caption: 'Stomach, liver and transverse colon are the textbook intraperitoneal organs — loosely suspended by peritoneal folds rather than fused to the body wall, unlike the retroperitoneal pancreas, kidneys and ascending/descending colon.' } },
  { gen: true }
],
lesson: {
explanation: `PERITONEUM. The peritoneum is the serous membrane of the abdominopelvic cavity: the parietal peritoneum lines the wall of the abdominal cavity, and the visceral peritoneum covers the external surfaces of most digestive organs — regarded as the tissue (serosa) layer of the organs. Between the two is the peritoneal cavity, a potential space lubricated by peritoneal fluid; the peritoneum holds the abdominal organs in place. When two layers of visceral peritoneum come together they form a peritoneal fold, and the folds are the passageways of the abdomen — providing room for blood vessels, nerve fibres, lymphatic vessels and visceral fat.

INTRA- VS RETROPERITONEAL. Intraperitoneal organs are covered on both sides and loosely suspended by folds: stomach, liver, jejunum, ileum, transverse colon and sigmoid colon. Retroperitoneal organs lie against the dorsal body wall, covered with peritoneum only on the side facing the cavity: kidneys, ureters, pancreas, the duodenum (last 3/4), and the ascending and descending colons — plus the aorta and IVC in the same space.

MESENTERIES AND OMENTA. The mesentery proper is a thick, broad, fan-shaped mesenterial sheet suspending the jejunum and ileum from the dorsal abdominal wall; it holds the organs in place, stores fat, prevents twisting and entanglement of the small intestine, provides passage for blood vessels and nerves, and contains many lymph nodes and lymphatic vessels. The mesocolon is the mesentery of the large intestine: the transverse mesocolon connects the transverse colon to the dorsal wall (continuous with the greater omentum along the colon's ventral surface and carrying the vessels that supply it); the ascending and descending colons are retroperitoneal, but the transverse and sigmoid colons are covered with serosa and anchored by their mesocolons. The omenta are folds extending from the stomach: the greater omentum hangs from the greater curvature, drapes over the transverse colon and loosely covers the small intestine like an apron (a ventral mesentery); the lesser omentum joins the lesser curvature and first part of the duodenum to the liver (a dorsal mesentery). The omenta help to isolate infections and provide immune cells that surround an inflamed area.

ARTERIAL SUPPLY — THREE SEGMENTS. All arterial branches to the gut are derived from the abdominal aorta, in three embryological territories. The foregut — mouth, pharynx, oesophagus, stomach and the proximal (first) part of the duodenum — is supplied above the diaphragm by esophageal branches of the thoracic aorta, and below it by the coeliac trunk (whose branches: left gastric, splenic, common hepatic — feeding liver, gallbladder, spleen, pancreas, stomach and duodenum). The midgut — distal duodenum, jejunum, ileum, caecum, appendix, ascending colon and the proximal two-thirds of the transverse colon — is supplied by the superior mesenteric artery. The hindgut — distal one-third of the transverse colon, descending and sigmoid colon, upper rectum — is supplied by the inferior mesenteric artery.

VENOUS DRAINAGE — THE PORTAL SYSTEM. Blood from the whole digestive tract below the diaphragm drains into the hepatic portal vein, which enters the liver. There the nutrients are processed and the intestinal blood is cleansed of bacteria — and this is why first-pass metabolism of orally taken drugs (e.g. Panadol) happens at the liver. A portal vessel is defined as a blood vessel connecting two capillary beds; that network is a portal system. The hepatic portal vein is formed behind the pancreas by the union of the splenic vein (draining the foregut side: spleen, stomach's left side) and the superior mesenteric vein (draining the midgut), joined by the inferior mesenteric vein (hindgut). The liver then exports the blood by the hepatic veins into the inferior vena cava.`,
plain: `The peritoneum is a slippery lining: parietal on the wall, visceral (= serosa) on the organs, with a fluid film between. Organs hung by peritoneal folds are intraperitoneal (stomach, liver, jejunum/ileum, transverse + sigmoid colon); organs fused to the back wall are retroperitoneal (kidneys, ureters, pancreas, last 3/4 of duodenum, ascending + descending colon). The folds — mesentery, mesocolons, greater and lesser omentum — carry vessels and nerves, store fat, and wall off infection. The gut's arteries come off the aorta in three segments: coeliac trunk (foregut), superior mesenteric (midgut to 2/3 transverse colon), inferior mesenteric (the rest). Veins do NOT go straight back to the heart: they all pool into the hepatic portal vein — a vessel joining two capillary beds — so everything absorbed is filtered through the liver first.`,
keyFacts: [
'Parietal peritoneum lines the abdominal wall; visceral peritoneum covers the organs and IS the serosa.',
'The peritoneal cavity is a potential space lubricated by peritoneal fluid.',
'Retroperitoneal: kidneys, ureters, pancreas, duodenum (last 3/4), ascending and descending colon.',
'Intraperitoneal: stomach, liver, jejunum, ileum, transverse and sigmoid colon.',
'Mesentery proper = fan-shaped sheet suspending jejunum and ileum; folds carry vessels, nerves, lymphatics and fat.',
'Greater omentum hangs from the greater curvature like an apron; lesser omentum runs from lesser curvature/duodenum to liver.',
'Omenta isolate infections and provide immune cells.',
'Foregut → coeliac trunk; midgut → superior mesenteric artery; hindgut → inferior mesenteric artery.',
'The midgut ends at the proximal two-thirds of the transverse colon; the hindgut takes the distal one-third.',
'All below-diaphragm digestive blood drains via the hepatic portal vein to the liver — a portal vessel connects two capillary beds.'
],
prerequisites: ['hss2011-digestive-tract-upper','hss2011-digestive-tract-small-large-bowel'],
examples: [
'Appendicitis: the greater omentum migrates to wall off the inflamed caecum — the isolation function made visible in theatre.',
'Oral morphine and Panadol are heavily first-pass metabolised; the same dose intravenously skips the portal system entirely.'
]
},
memory: {
chunking: 'Retroperitoneal list: "KU-P-DAD" — Kidneys, Ureters, Pancreas, Duodenum (last 3/4), Ascending & Descending colon.',
firstLetter: 'Arteries by territory: Coeliac-Celiac = Cardia; SMA = Small intestine/Midgut; IMA = Inferior (hindgut).',
location: 'Transverse colon 2/3–1/3: SMA takes the first two-thirds, IMA the last third — the midgut/hindgut border sits ON the transverse colon.'
},
practice: [
{ type: 'cloze',
  prompt: 'Nutrients absorbed in the gut are transported to the liver through the ______.',
  accept: ['hepatic portal vein','portal vein','hepatic portal'],
  explanation: 'Model answer: the hepatic portal vein — the portal vessel connecting the gut capillary bed to the liver sinusoids.',
  src: { ref: 'hss.revans', location: 'p3 "Hepatic portal vein"' } },
{ type: 'mcq',
  prompt: 'The embryonic midgut, supplied by the superior mesenteric artery, extends to the:',
  options: ['Duodenojejunal flexure','Proximal two-thirds of the transverse colon','Sigmoid colon','Upper rectum'],
  answer: 1,
  explanation: 'Midgut = distal duodenum through the proximal 2/3 of the transverse colon; the hindgut (IMA) takes the distal one-third and everything below.',
  src: { ref: 'hss.3.1.2019', location: 'p30 "proximal two-third of transverse colon"' } },
{ type: 'mcq',
  prompt: 'Which set lists ONLY retroperitoneal organs?',
  options: ['Stomach, liver, spleen','Kidneys, pancreas, ascending colon','Jejunum, ileum, transverse colon','Liver, gallbladder, caecum'],
  answer: 1,
  explanation: 'Kidneys, ureters, pancreas, last 3/4 of duodenum and the ascending/descending colons lie retroperitoneal; the others are intraperitoneal.',
  src: { ref: 'hss.3.1', location: 'p38 "kidneys, ureters,"' } },
{ type: 'cloze',
  prompt: 'The ______ is the thick, broad, fan-shaped mesenterial sheet suspending the jejunum and the ileum from the dorsal abdominal wall.',
  accept: ['mesentery proper','mesentery'],
  explanation: 'The mesentery proper — it stores fat, prevents twisting of the small intestine and carries the vessels, nerves and lymph nodes.',
  src: { ref: 'hss.3.3.2019', location: 'p25 "Mesentery proper is a thick broad fan-shaped"' } },
{ type: 'mcq',
  prompt: 'A portal vessel is defined as a blood vessel connecting:',
  options: ['Two arteries','An artery to a vein','Two capillary beds','The heart to the liver'],
  answer: 2,
  explanation: 'A portal vessel connects two capillary beds; that network is a portal system — the hepatic portal vein is the example.',
  src: { ref: 'hss.3.1', location: 'p36 "Portal vessel = a blood vessel connecting two capillary beds"' } },
{ type: 'mcq',
  prompt: 'Why does an orally taken drug such as Panadol undergo first-pass metabolism?',
  options: ['It is absorbed by the stomach only','Gut veins drain via the hepatic portal vein through the liver before reaching the systemic circulation','The pancreas destroys part of it','Bile excretes it into the colon'],
  answer: 1,
  explanation: 'All below-diaphragm digestive blood enters the hepatic portal vein; the liver processes nutrients and clears drugs before the blood reaches the IVC.',
  src: { ref: 'hss.3.1.2019', location: 'p32 "First-pass metabolism of drugs taken orally"' } }
],
application: [
{ type: 'scenario',
  prompt: 'A CT of a 55-year-old shows cirrhosis with portal hypertension. Explain in anatomical terms why gut blood pressure rises, which three veins contribute to the portal vein, and why the surgeon must respect the difference between intraperitoneal and retroperitoneal organs when creating a shunt.',
  model: 'In cirrhosis the sinusoidal path through the liver is scarred, so blood arriving by the hepatic portal vein cannot clear the liver — pressure backs up the entire portal system. That vein is formed by the union of the splenic vein (foregut/left side: spleen and stomach) and the superior mesenteric vein (midgut), with the inferior mesenteric vein (hindgut) joining between them. Shunting drains portal blood toward the IVC, which runs retroperitoneal behind the organs; the operator must know which organs are fused to the retroperitoneum (pancreas — right where the portal vein forms — duodenum, ascending/descending colon) versus suspended intraperitoneal organs that can be mobilised freely, because the approach route and the collateral risk both follow that distinction.',
  rubric: [
'Explains portal hypertension from blocked sinusoidal flow through the liver',
'Names splenic + superior mesenteric (+ inferior mesenteric) as the portal tributaries',
'Uses the intra/retroperitoneal distinction to justify the shunt approach and risks'
  ]
}
],
commonMistakes: [
'Calling the transverse colon retroperitoneal — it is intraperitoneal, hung by the transverse mesocolon; the ASCENDING and DESCENDING colon are the retroperitoneal parts.',
'Saying the inferior mesenteric artery supplies the whole transverse colon — only the distal one-third; the proximal two-thirds are SMA/midgut.',
'Draining gut blood into the IVC directly — it goes through the hepatic portal vein and liver first.',
'Treating the lesser omentum as running to the greater curvature — the GREATER omentum is the greater-curvature apron; the lesser runs to the liver.'
],
skills: [
'Classify any abdominal organ as intraperitoneal or retroperitoneal on sight of a sagittal section.',
'Trace the portal vein from its tributaries through the liver to the IVC, and match each gut segment to its artery.'
],
selfCheck: 'From memory: parietal vs visceral peritoneum, the retroperitoneal list, mesentery proper vs mesocolon vs omenta, the three artery–territory pairs with the transverse-colon border, and the portal vein definition and tributaries.',
sourceRefs: [
  { ref: 'hss.3.1', location: 'p37 "Parietal peritoneum"' },
  { ref: 'hss.3.1', location: 'p37 "Visceral peritoneum"' },
  { ref: 'hss.3.1', location: 'p37 "Peritoneal cavity"' },
  { ref: 'hss.3.1', location: 'p37 "Lubricated by peritoneal"' },
  { ref: 'hss.3.1', location: 'p38 "Retroperitoneal"' },
  { ref: 'hss.3.1', location: 'p38 "kidneys, ureters,"' },
  { ref: 'hss.3.1', location: 'p38 "duodenum (last"' },
  { ref: 'hss.3.1', location: 'p38 "stomach,"' },
  { ref: 'hss.3.1', location: 'p39 "Mesentery proper"' },
  { ref: 'hss.3.1', location: 'p39 "fan-shaped"' },
  { ref: 'hss.3.1', location: 'p39 "prevent twisting"' },
  { ref: 'hss.3.1', location: 'p39 "store fat"' },
  { ref: 'hss.3.1', location: 'p40 "Greater omentum"' },
  { ref: 'hss.3.1', location: 'p40 "Lesser omentum"' },
  { ref: 'hss.3.1', location: 'p40 "isolate"' },
  { ref: 'hss.3.1', location: 'p41 "ascending & descending colons"' },
  { ref: 'hss.3.1', location: 'p32 "Celiac Trunk"' },
  { ref: 'hss.3.1', location: 'p32 "Superior mesenteric"' },
  { ref: 'hss.3.1', location: 'p32 "Inferior mesenteric"' },
  { ref: 'hss.3.1', location: 'p33 "Foregut-mouth, pharynx, esophagus, stomach"' },
  { ref: 'hss.3.1', location: 'p33 "1st two thirds of transverse colon"' },
  { ref: 'hss.3.1', location: 'p35 "hepatic portal vein which enters the"' },
  { ref: 'hss.3.1', location: 'p35 "cleansed of bacteria"' },
  { ref: 'hss.3.1', location: 'p36 "Portal vessel = a blood vessel connecting two capillary beds"' },
  { ref: 'hss.3.1.2019', location: 'p30 "celiac trunk that supplies the foregut"' },
  { ref: 'hss.3.1.2019', location: 'p30 "Superior mesenteric artery supplies the mid-gut"' },
  { ref: 'hss.3.1.2019', location: 'p30 "Inferior mesenteric artery supplies the hind-gut"' },
  { ref: 'hss.3.1.2019', location: 'p32 "First-pass metabolism of drugs taken orally"' },
  { ref: 'hss.3.3.2019', location: 'p21 "regarded as the serosa"' },
  { ref: 'hss.3.3.2019', location: 'p25 "kidneys, ureters, pancreas, duodenum (last"' },
  { ref: 'hss.manual1920', location: 'p34 "transported to the liver through the"' },
  { ref: 'hss.revans', location: 'p3 "Hepatic portal vein"' }
]
},

/* ---------------------------------------------------------------- W11-6 */
{
id: 'hss2011-digestive-tutorial-pastpaper-practice',
subject: 'HSS2011', unit: 'hss.m3', type: 'cloze',
title: 'Digestive system: worked revision exercises and past-paper practice (Module 3.1)',
tags: ['digestive','assessment','tutorial','high-yield'],
visuals: [
  { fig: 'digestiveSystemOverview' },
  { fig: 'biliaryPancreaticDucts' }
],
lesson: {
explanation: `This is the exam-facing drill for Module 3.1. Every item below is drawn from the official Study Manual revision exercises, the five-year fill-in-the-blank bank, and the More-exercises labelling sheet — with the model answers from the appendix.

THE FIVE FILL-IN-THE-BLANKS (Module 3.1, every sitting): (1) The epithelium of the mucosal layer along most of the digestive tract is simple columnar epithelium. (2) The third muscle layer overlaying the mucosa of the stomach wall is the oblique muscle. (3) The cardiac orifice is the opening where the oesophagus enters the stomach. (4) The junction between duodenum and jejunum is the duodenojejunal junction (flexure). (5) Nutrients absorbed in the gut are transported to the liver through the hepatic portal vein.

THE FIVE MCQs (Module 3.1): the longest part of the gut is the ILEUM; gastric pits are located in the MUCOSA; teniae coli are found in the COLON; the largest salivary gland is the PAROTID; a classic hepatic lobule has SIX portal triads.

THE FIVE-YEAR RECURRING BLANKS (asked in 12/13 through 16/17 without a break): the domelike roof superior to the oesophageal attachment of the stomach is the fundic region; the pyloric sphincter is the circular muscle guarding the stomach's exit; the duodenum is the small-intestine segment whose villi are largest; the midline abdominal regions top-to-bottom are epigastric, umbilical, hypogastric; the ileocecal valve, teniae coli and haustra trio; Peyer patches in the ileum; the pancreas trio (uncinate process of the head, tail to the spleen, duct joining the common bile duct at an ampulla); and the liver quartet — right, left, quadrate (anterior) and caudate (posterior) lobes, right and left divided by the falciform ligament, irregular opening = porta hepatis.

MORE-EXERCISES LABELLING A–V: gallbladder, cystic duct, right kidney, common hepatic duct, common bile duct, hepatic portal vein, right ureter, psoas muscles, ascending colon, second part of duodenum, head and tail of pancreas, left kidney, left adrenal gland, spleen, left colic (splenic) flexure, coeliac trunk, hepatic artery proper, superior mesenteric artery, inferior mesenteric artery, IVC, common iliac arteries. Work it against the biliary-ducts figure and the 3D model until you can label cold.`,
plain: `Five blanks you will see: simple columnar epithelium, oblique muscle, cardiac orifice, duodenojejunal junction, hepatic portal vein. Five MCQs: ileum longest, gastric pits in mucosa, teniae coli in colon, parotid largest salivary gland, six triads per lobule. Then the five-year repeaters: fundic region, pyloric sphincter, duodenum's villi, epigastric-umbilical-hypogastric, ileocecal/teniae/haustra, Peyer patches, pancreas head-uncinate-tail-ampulla, liver lobes + falciform + porta hepatis. Finish with the A–V labelling sheet.`,
keyFacts: [
'FIB: simple columnar epithelium lines most of the digestive tract.',
'FIB: the oblique muscle is the stomach\'s third, innermost layer.',
'FIB: the cardiac orifice is where the oesophagus enters the stomach.',
'FIB: the duodenojejunal junction joins duodenum to jejunum.',
'FIB: the hepatic portal vein carries absorbed nutrients to the liver.',
'MCQ: ileum = longest gut segment; gastric pits = mucosa; teniae coli = colon; parotid = largest salivary gland; six portal triads per lobule.',
'Recurring: fundic region is the dome above the oesophageal attachment; pyloric sphincter guards the exit.',
'Recurring: villi largest in the duodenum; midline regions = epigastric, umbilical, hypogastric.',
'Recurring: pancreas — uncinate process, tail to spleen, duct joins CBD at an ampulla.',
'Recurring: liver lobes right/left (falciform), quadrate anterior, caudate posterior; irregular opening = porta hepatis.'
],
prerequisites: ['hss2011-m3-digestive','hss2011-digestive-tract-upper','hss2011-digestive-tract-small-large-bowel','hss2011-digestive-accessory-liver-pancreas','hss2011-digestive-peritoneum-portal-circulation'],
examples: [
'2017-18 exam Module-3 block repeats the same five-year blanks — the appendix answer key marks each one.'
]
},
memory: {
teachBack: 'Cover the answers and recite the five FIBs; then the five MCQs; then walk the A–V labelling aloud on the 3D model.'
},
practice: [
{ type: 'cloze',
  prompt: 'The groove-like boundary at the duodenojejunal junction marks the end of the duodenum. Name the junction.',
  accept: ['duodenojejunal junction','duodenojejunal flexure'],
  explanation: 'Model answer: the duodenojejunal junction (flexure) — where the fixed duodenum ends and the mesenteric jejunum begins.',
  src: { ref: 'hss.revans', location: 'p3 "Duodenojejunal junction"' } },
{ type: 'mcq',
  prompt: 'Where are gastric pits located within the stomach wall?',
  options: ['Mucosa','Submucosa','Muscularis externa','Serosa'],
  answer: 0,
  explanation: 'Model answer A: the gastric pits and their glands open from the mucosal surface.',
  src: { ref: 'hss.manual1920', location: 'p34 "Where are gastric pits located within the stomach wall?"' } },
{ type: 'cloze',
  prompt: 'The domelike roof superior to the esophageal attachment of the stomach is known as the ______ region.',
  accept: ['fundic','fundus','fundic region'],
  explanation: 'The fundic region (fundus) — asked in 12/13, 13/14, 14/15, 15/16 and 16/17 without a break.',
  src: { ref: 'hss.fib5yr', location: 'p12 "fundic region: domelike roof superior"' } },
{ type: 'cloze',
  prompt: 'Lengthwise the colon, the muscle tone of the ______ contracts and causes the wall to bulge into pouches called ______.',
  accept: ['teniae coli; haustra','teniae coli, haustra'],
  explanation: 'Teniae coli tone → haustra. Also tested with the ileocecal valve in the same blank-chain.',
  src: { ref: 'hss.fib5yr', location: 'p11 "teniae coli contracts and causes wall of the colon to bulge"' } },
{ type: 'mcq',
  prompt: 'In the More-exercises labelling, structure Q — the unpaired artery just below the diaphragm giving left gastric, splenic and common hepatic branches — is the:',
  options: ['Superior mesenteric artery','Coeliac trunk','Hepatic artery proper','Inferior mesenteric artery'],
  answer: 1,
  explanation: 'The coeliac trunk is the foregut branch of the abdominal aorta; the hepatic artery proper is one of ITS branches.',
  src: { ref: 'hss.revans', location: 'p4 "Celiac trunk"' } },
{ type: 'cloze',
  prompt: 'The liver is superficially divided into right and left lobes by the ______ ligament; the irregular opening between the lobes is called the ______.',
  accept: ['falciform; porta hepatis','falciform ligament; porta hepatis'],
  explanation: 'Falciform ligament divides the anatomical lobes; the porta hepatis is the entry/exit hilum. Both are five-year repeaters.',
  src: { ref: 'hss.fib5yr', location: 'p11 "falciform ligament"' } }
],
application: [
{ type: 'scenario',
  prompt: 'You are tutoring a classmate the night before the paper. Set and mark the five Module 3.1 fill-in-the-blanks, then ask them to label cystic duct, common hepatic duct, common bile duct and hepatic portal vein on a biliary diagram. What four errors would you listen for?',
  model: 'Listen for: (1) "stratified squamous" for the tract epithelium — it is simple columnar, squamous only at the two ends; (2) "circular" or "longitudinal" as the stomach\'s third layer — it is the oblique; (3) confusing the duodenojejunal junction with the ileocecal valve; (4) putting nutrients into the inferior vena cava or "hepatic vein" instead of the hepatic portal vein — and on the diagram, wiring the cystic duct into the common hepatic (it joins to FORM the common bile duct) or skipping the ampulla before the second part of the duodenum.',
  rubric: [
'Sets all five FIBs with correct answers (columnar, oblique, cardiac orifice, DJ junction, portal vein)',
'Demands the duct chain in order with the ampulla and 2nd-part duodenum',
'Catches the four classic confusions listed'
  ]
}
],
commonMistakes: [
'Answering "oesophagus" or "jejunum" for longest gut segment — the model answer is the ileum.',
'Putting gastric pits in the submucosa — pits and glands are mucosal.',
'Writing "hepatic vein" where the blank wants the hepatic PORTAL vein — the hepatic veins LEAVE the liver to the IVC.',
'Saying the common hepatic duct comes from the gallbladder — the gallbladder contributes the CYSTIC duct.'
],
skills: [
'Score full marks on the Module 3.1 revision exercise in under five minutes.',
'Label all 22 structures of the More-exercises sheet on an abdominal diagram.'
],
selfCheck: 'Blank page: write the five FIB answers, the five MCQ answers, and the A–V duct/artery labels from memory; then check against the answer key.',
sourceRefs: [
  { ref: 'hss.revans', location: 'p3 "Simple columnar epithelium"' },
  { ref: 'hss.revans', location: 'p3 "Oblique muscle"' },
  { ref: 'hss.revans', location: 'p3 "Cardiac orifice"' },
  { ref: 'hss.revans', location: 'p3 "Duodenojejunal junction"' },
  { ref: 'hss.revans', location: 'p3 "Hepatic portal vein"' },
  { ref: 'hss.manual1920', location: 'p34 "Which part of the gut has the longest length?"' },
  { ref: 'hss.manual1920', location: 'p34 "Where are gastric pits located within the stomach wall?"' },
  { ref: 'hss.manual1920', location: 'p34 "Teniae coli are found in which part"' },
  { ref: 'hss.manual1920', location: 'p34 "The largest salivary gland is:"' },
  { ref: 'hss.manual1920', location: 'p34 "How many hepatic triad(s)"' },
  { ref: 'hss.fib5yr', location: 'p12 "fundic region: domelike roof superior"' },
  { ref: 'hss.fib5yr', location: 'p12 "Duodenum: largest villi"' },
  { ref: 'hss.fib5yr', location: 'p12 "epigastric + umbilical + hypogastric region"' },
  { ref: 'hss.fib5yr', location: 'p12 "ileocecal valve + teniae coli + haustra"' },
  { ref: 'hss.fib5yr', location: 'p12 "Pancreas: uncinate process + spleen +"' },
  { ref: 'hss.fib5yr', location: 'p12 "Quadrate(anterior), and Caudate (posterior)"' },
  { ref: 'hss.revans', location: 'p4 "Gall bladder"' },
  { ref: 'hss.revans', location: 'p4 "Cystic duct"' },
  { ref: 'hss.revans', location: 'p4 "Common hepatic duct"' },
  { ref: 'hss.revans', location: 'p4 "Common bile duct"' },
  { ref: 'hss.revans', location: 'p4 "Hepatic portal vein"' },
  { ref: 'hss.revans', location: 'p4 "Celiac trunk"' },
  { ref: 'hss.revans', location: 'p4 "Superior mesenteric artery"' },
  { ref: 'hss.revans', location: 'p4 "Inferior mesenteric artery"' }
]
}
];

for (const item of items) {
  const i = arr.findIndex((x) => x.id === item.id);
  if (i < 0) throw new Error('id not found: ' + item.id);
  // preserve any keys the rewrite does not set (none expected — we author the full object)
  arr[i] = item;
}
const out = head + MARK + JSON.stringify(arr, null, 2) + ';\n';
fs.writeFileSync(FILE, out.replace(/\r?\n/g, '\r\n'));
console.log('wrote', FILE, '-', items.length, 'items rewritten, total', arr.length);
