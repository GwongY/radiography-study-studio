/*
 * ABCT2326 Tables, as sourced data: look-ups that line up the same kind of thing across lectures.
 *
 * Every row cites a slide page and `match` is words on that page (work/revision-check.mjs); `ids`
 * names the map boxes the row is about (work/revision-coverage.mjs). A cell says "Not stated on this
 * slide" rather than fill a gap from elsewhere.
 */
const L1 = 'phys.1.2026';
const L2 = 'phys.l2.2026';
const L3 = 'phys.l3.2026';
const L4 = 'phys.l4.2026';
const L5 = 'phys.l5.2026';
const L6 = 'phys.l6.2026';
const L7 = 'phys.l7.2026';
const L8 = 'phys.l8.2026';
const L9 = 'phys.l9.2026';
const L10 = 'phys.10.2026';

export const TABLES = [
  {
    id: 'tb-hormones',
    title: 'Hormones',
    head: ['Hormone', 'Made by', 'Acts on', 'Effect'],
    rows: [
      { wk: 4, cells: ['Gastrin', 'G cells in the duodenum', 'Stomach', 'Promotes increased stomach motility; stimulates acid and enzyme production'], src: [L4, 56], match: 'Is secreted by G cells in duodenum', ids: ['p4_gastrin'] },
      { wk: 4, cells: ['Secretin', 'Duodenum, when chyme arrives', 'Liver and pancreas', 'Increases secretion of bile and buffers'], src: [L4, 56], match: 'Increases secretion of bile and buffers by liver and pancreas', ids: ['p4_secretin'] },
      { wk: 4, cells: ['Cholecystokinin (CCK)', 'Duodenum, when chyme contains lipids and partially digested proteins', 'Pancreas', 'Accelerates pancreatic production and secretion of digestive enzymes'], src: [L4, 57], match: 'Accelerates pancreatic production and secretion of digestive enzymes', ids: ['p4_cck'] },
      { wk: 4, cells: ['Gastric inhibitory peptide (GIP)', 'Small intestine, when fats and carbohydrates enter', 'Pancreas', 'Release of insulin'], src: [L4, 57, 59], match: 'Release of insulin from pancreas', ids: ['p4_gip'] },
      { wk: 5, cells: ['Renin', 'Juxtaglomerular cells', 'Angiotensinogen', 'Converts angiotensinogen to angiotensin I'], src: [L5, 40], match: 'Renin converts angiotensinogen to angiotensin I', ids: ['p5_renin'] },
      { wk: 5, cells: ['Aldosterone', 'Adrenal cortex', 'Distal tubule and cortical collecting duct', 'Controls K+ secretion and Na+ reabsorption'], src: [L5, 37, 42], match: 'controls K+ secretion and Na+ reabsorption', ids: ['p5_aldosterone'] },
      { wk: 7, cells: ['Testosterone', 'Leydig cells, after stimulation by LH', 'Developing sperm cells', 'Required to stimulate meiosis and early spermatid maturation'], src: [L6, 15], match: 'Testosterone is required to stimulate meiosis and early spermatid maturation', ids: ['p_testosterone'] },
      { wk: 7, cells: ['FSH', 'Not stated on this slide', 'Sertoli cells', 'Enhances spermatogenesis; the Sertoli cells make ABP, which concentrates testosterone'], src: [L6, 15], match: 'FSH enhances spermatogenesis', ids: ['p7_fsh'] },
      { wk: 8, cells: ['Antidiuretic hormone (ADH)', 'Supraoptic nuclei of hypothalamus; released from posterior pituitary', 'Kidneys', 'Promotes H2O conservation'], src: [L7, 27], match: 'promotes H2O conservation by kidneys', ids: ['p8_adh'] },
      { wk: 8, cells: ['Oxytocin', 'Paraventricular nuclei of hypothalamus; released from posterior pituitary', 'Uterus and mammary gland alveoli', 'Stimulates contractions of uterus during parturition and the milk-ejection reflex'], src: [L7, 27], match: 'stimulates contractions of uterus during parturition', ids: ['p8_oxytocin'] },
      { wk: 8, cells: ['Epinephrine', 'Adrenal medulla', 'Body (fight or flight response)', 'Increased respiratory rate, heart rate and cardiac output; glycogenolysis and lipolysis'], src: [L7, 35], match: 'Activated during "fight or flight" response', ids: ['p8_epinephrine'] },
      { wk: 8, cells: ['Cortisol', 'Adrenal cortex', 'Glucose utilization and gluconeogenesis', 'Inhibits glucose utilization; stimulates gluconeogenesis'], src: [L7, 36], match: 'Cortisol which inhibits glucose utilization and stimulates gluconeogenesis', ids: ['p8_cortisol'] },
      { wk: 8, cells: ['Insulin', 'Beta cells of the islets', 'Cells (glucose entry)', 'Promotes entry of glucose into cells; decreases blood glucose'], src: [L7, 49], match: 'Beta cells secrete insulin in response to high blood glucose', ids: ['p8_insulin'] },
      { wk: 8, cells: ['Glucagon', 'Alpha cells of the islets', 'Glycogenolysis and lipolysis', 'Stimulates glycogenolysis and lipolysis; increases blood glucose'], src: [L7, 48], match: 'Alpha cells secrete glucagon in response to low blood glucose', ids: ['p8_glucagon'] },
    ],
  },
  {
    id: 'tb-values',
    title: 'Numbers on the slides',
    head: ['What', 'Value', 'Lecture'],
    rows: [
      { wk: 2, cells: ['Total blood volume', 'about 5 L', 'Week 2'], src: [L2, 5], match: 'Total blood volume is about 5L', ids: ['p_blood'] },
      { wk: 2, cells: ['Hematocrit', '36-46% in women; 41-53% in men', 'Week 2'], src: [L2, 5], match: 'Hematocrit is 36-46% in women; 41-53% in men', ids: ['p2_hematocrit'] },
      { wk: 2, cells: ['Pacemaker potential', 'begins at around -60 mV, depolarizes to -40 mV threshold', 'Week 2'], src: [L2, 50], match: 'Membrane voltage begins at around -60mV', ids: ['p2_pacemaker_potential'] },
      { wk: 2, cells: ['Myocardial resting membrane potential', '-90 mV', 'Week 2'], src: [L2, 56], match: 'resting membrane potential of –90 mV', ids: ['p_myoap'] },
      { wk: 3, cells: ['Atmospheric pressure', '1 atmosphere = 760 mmHg = 101.325 kPa', 'Week 3'], src: [L3, 27], match: '1 atmosphere (atm) = 760 mmHg', ids: ['p3_atmospheric_pressure'] },
      { wk: 3, cells: ['Tidal volume (adult male)', '500 mL', 'Week 3'], src: [L3, 36], match: 'Tidal volume (VT= 500 mL)', ids: ['p3_tidal_volume'] },
      { wk: 3, cells: ['Hemoglobin molecules per red blood cell', 'about 280 million', 'Week 3'], src: [L3, 45], match: 'Each RBC has about 280 million Hb molecules', ids: ['p3_hemoglobin'] },
      { wk: 4, cells: ['Bile secreted by the liver', 'about 1 liter per day', 'Week 4'], src: [L4, 51], match: 'about 1 liter per day', ids: ['p4_bile'] },
      { wk: 5, cells: ['Glomerular filtration rate (GFR)', 'averages 115 ml/min in women; 125 ml/min in men; about 180 L/day', 'Week 5'], src: [L5, 17], match: 'Averages 115 ml/min in women; 125 ml/min in men', ids: ['p_gfr'] },
      { wk: 5, cells: ['Filtered Na+, Cl- and H2O reabsorbed in the proximal tubule', 'about 65%', 'Week 5'], src: [L5, 26], match: '65% Na+, Cl-, and H2O is reabsorbed in proximal tubule', ids: ['p_reabs'] },
      { wk: 5, cells: ['Urine excreted from about 180 L/day of ultrafiltrate', 'only 1-2 L per 24 hours', 'Week 5'], src: [L5, 21], match: 'only 1–2 L of urine excreted/24 hours', ids: ['p5_ultrafiltrate'] },
      { wk: 9, cells: ['Resting membrane potential of many nerve cells', 'approximately -60 mV (or -70 mV)', 'Week 9'], src: [L8, 23], match: 'approximately –60mV', ids: ['p_rmp'] },
      { wk: 9, cells: ['Nerve action potential', 'threshold at -45 mV; peak of +25 mV', 'Week 9'], src: [L8, 33], match: 'reaches a threshold value at –45mV', ids: ['p_ap'] },
      { wk: 11, cells: ['Maximal oxygen uptake (VO2 max)', 'ranges from 12 to 84 ml O2/minute/kg body weight', 'Week 11'], src: [L9, 43], match: 'Ranges from 12 ml O2/minute/kg body weight to 84 ml O2/minute/kg body weight', ids: ['p11_vo2_max'] },
      { wk: 11, cells: ['Lactate threshold', 'occurs at about 50-70% VO2 max', 'Week 11'], src: [L9, 44], match: 'Occurs at about 50−70% VO2 max', ids: ['p11_lactate_threshold'] },
    ],
  },
  {
    id: 'tb-cellparts',
    title: 'Cell parts, then at work later',
    head: ['Part', 'Lecture', 'What the slide says'],
    rows: [
      { wk: 1, cells: ['Plasma membrane', 'Week 1', 'Separates the living cell from its surroundings; a fluid mosaic of lipids and proteins'], src: [L1, 8], match: 'The plasma membrane separates the living cell from its surroundings', ids: ['p_membrane', 'p1_tis_plasmamem'] },
      { wk: 1, cells: ['Cytoplasm', 'Week 1', 'All materials inside the cell and outside the nucleus'], src: [L1, 8], match: 'All materials inside the cell and outside the nucleus', ids: ['p1_cytoplasm', 'p1_tis_organelles'] },
      { wk: 1, cells: ['Centrioles', 'Week 1', 'Essential for movement of chromosomes during cell division; organize the microtubules of the cytoskeleton'], src: [L1, 5], match: 'movement of chromosomes during cell division', ids: ['p1_centrioles', 'p1_cytoskeleton'] },
      { wk: 1, cells: ['Endoplasmic reticulum', 'Week 1', 'Rough ER modifies and packages newly synthesized proteins; smooth ER synthesizes lipids and carbohydrates'], src: [L1, 16], match: 'synthesizes lipids', ids: ['p_er'] },
      { wk: 1, cells: ['Golgi apparatus', 'Week 1', 'Storage, alteration and packaging of secretory products and lysosomal enzymes'], src: [L1, 16], match: 'packaging of secretory products', ids: ['p_golgi', 'p1_sec_vesicles'] },
      { wk: 1, cells: ['Ribosomes', 'Week 1', 'A ribosome on the rough ER reads the code from mRNA and assembles amino acids into a polypeptide chain'], src: [L1, 21], match: 'Ribosome (on Rough ER) reads code from mRNA', ids: ['p_protein', 'p1_freeribosomes'] },
      { wk: 1, cells: ['Microvilli', 'Week 1', 'Extensions of the plasma membrane containing microfilaments; increase surface area to facilitate absorption'], src: [L1, 11], match: 'Increase surface area to facilitate absorption', ids: ['p1_microvilli', 'p1_microfilaments'] },
      { wk: 1, cells: ['Nucleus', 'Week 1', 'Control of metabolism; storage and processing of genetic information; control of protein synthesis'], src: [L1, 13], match: 'storage and processing of genetic information', ids: ['p1_tis_nucleus', 'p1_nuclear_envelope'] },
      { wk: 4, cells: ['Microvilli', 'Week 4', 'Brush border enzymes are integral membrane proteins on the surfaces of intestinal microvilli'], src: [L4, 38], match: 'On surfaces of intestinal microvilli', ids: ['p1_microvilli', 'p4_brush_border'] },
      { wk: 5, cells: ['Microvilli', 'Week 5', 'Proximal tubule cells have millions of microvilli, which increase surface area for reabsorption'], src: [L5, 12], match: 'millions of microvilli', ids: ['p5_microvilli_pct'] },
      { wk: 7, cells: ['Organelles', 'Week 7', 'Mature sperm lacks ER, Golgi, lysosomes and other intracellular structures, which reduces its size and mass'], src: [L6, 8], match: 'Mature sperm lacks', ids: ['p1_tis_organelles', 'p_er', 'p_golgi'] },
      { wk: 8, cells: ['Carrier proteins', 'Week 8', 'Lipid hormones travel in blood attached to carrier proteins and dissociate from them to pass the plasma membrane'], src: [L7, 14], match: 'travel in blood attached to carrier proteins', ids: ['p8_carrier_proteins', 'p_membrane'] },
    ],
  },
  {
    id: 'tb-tissues',
    title: 'Tissues met again',
    head: ['Tissue or cell', 'Lecture', 'What the slide says'],
    rows: [
      { wk: 1, cells: ['Glands', 'Week 1', 'Endocrine glands release hormones into interstitial fluid, with no ducts; exocrine glands produce secretions onto epithelial surfaces through ducts'], src: [L1, 36], match: 'Release hormones', ids: ['p1_endocrine_glands', 'p1_exocrine_glands', 'p1_tis_glands'] },
      { wk: 1, cells: ['Connective tissue', 'Week 1', 'Cells can be adipocytes, macrophages, mast cells, fibroblasts and leukocytes; fibers are collagen or elastin; all are suspended in water'], src: ['hss.tut.tissues', 17], match: 'adipocytes (fat cells), macrophages, mast cells, fibroblasts, and leukocytes', ids: ['p_tissues', 'p1_tis_macrophages', 'p1_tis_mastcells', 'p1_tis_fibroblasts', 'p1_tis_leukocytes', 'p1_tis_elastin', 'p1_tis_fibres', 'p1_tis_water'] },
      { wk: 1, cells: ['Connective tissue', 'Week 1', 'Includes fatty tissue, loose connective tissue, dense fibrous tissue, bone, lymph tissue, cartilage and blood'], src: ['hss.tut.tissues', 17], match: 'Includes: fatty tissue, loose connective tissue', ids: ['p1_tis_conntypes', 'p1_tis_fatty', 'p1_tis_bonetissue'] },
      { wk: 1, cells: ['Matrix', 'Week 1', 'Fibers and ground substance make up the matrix, the majority of tissue volume'], src: [L1, 37], match: 'Make up the matrix', ids: ['p1_matrix'] },
      { wk: 1, cells: ['Connective tissue proper', 'Week 1', 'Connects and protects; dense connective tissue has more fibers and less ground substance, for example tendons'], src: [L1, 39, 40], match: 'Connect and protect', ids: ['p1_ct_proper', 'p1_dense_ct'] },
      { wk: 1, cells: ['Cartilage', 'Week 1', 'Gel-type ground substance, for shock absorption and protection'], src: [L1, 47], match: 'For shock absorption and protection', ids: ['p1_cartilage'] },
      { wk: 1, cells: ['Osteocytes', 'Week 1', 'Bone cells arranged around central canals; small channels through the matrix (canaliculi) access the blood supply'], src: [L1, 49], match: 'Small channels through matrix (canaliculi)', ids: ['p1_osteocytes', 'p1_canaliculi'] },
      { wk: 1, cells: ['Cardiac muscle', 'Week 1', 'Cardiac muscle tissue is found only in the heart'], src: [L1, 51], match: 'Found only in the heart', ids: ['p1_cardiac_muscle_t'] },
      { wk: 1, cells: ['Cardiac muscle cells', 'Week 1', 'Branched, with a single nucleus, connected by intercalated discs that allow synchronized contractions'], src: ['hss.tut.tissues', 18], match: 'connected by intercalated discs that allow synchronized contractions', ids: ['p1_tis_cardiac', 'p1_tis_intercalated'] },
      { wk: 1, cells: ['Smooth muscle cells', 'Week 1', 'Spindle-shaped, with a single nucleus and no striations; in the walls of hollow organs'], src: ['hss.tut.tissues', 18], match: 'Smooth muscle cells are spindle-shaped', ids: ['p1_tis_smooth'] },
      { wk: 1, cells: ['Gap junctions', 'Week 1', 'Open channels that allow direct exchange of nutrients, ions and signals between adjacent cells'], src: ['hss.tut.tissues', 8], match: 'act as open channels that allow for the direct exchange', ids: ['p1_tis_gap'] },
      { wk: 2, cells: ['Vessel wall', 'Week 2', 'Arteries and veins have 3 layers; the interna is made of endothelium, basement membrane and elastin'], src: [L2, 10], match: 'Interna is made of endothelium, basement membrane, and elastin', ids: ['p_vessels', 'p2_arteries', 'p2_veins', 'p1_basement_membrane', 'p1_tis_elastin'] },
      { wk: 2, cells: ['Intercalated discs', 'Week 2', 'Interconnect cardiac muscle cells, secured by desmosomes and linked by gap junctions; convey force of contraction'], src: [L2, 23], match: 'Interconnect cardiac muscle cells', ids: ['p2_cardiac_myocytes', 'p1_tis_intercalated'] },
      { wk: 8, cells: ['Osteoblasts and osteoclasts', 'Week 8', 'Parathyroid hormone stimulates osteoclasts, which break down bone, and inhibits osteoblasts, which form new bone'], src: [L7, 45], match: 'inhibits osteoblasts (form new bone)', ids: ['p8_osteoblasts', 'p8_osteoclasts'] },
      { wk: 8, cells: ['Hypertrophy', 'Week 8', 'High blood levels of the anterior pituitary\'s trophic hormones cause the target to hypertrophy; low levels cause atrophy'], src: [L7, 25], match: 'High blood levels cause target to hypertrophy', ids: ['p8_hypertrophy', 'p8_anterior_pit'] },
      { wk: 11, cells: ['Hypertrophy', 'Week 11', 'With strength training, type II muscle fibers become thicker from more actin and myosin'], src: [L9, 54], match: 'Type II muscle fibers become thicker', ids: ['p11_hypertrophy'] },
      { wk: 11, cells: ['Tendons', 'Week 11', 'A contracting muscle places tension on the tendons connecting it to a bone, which moves the bone at a joint'], src: [L9, 10], match: 'This places tension on tendons connecting it to a bone', ids: ['p11_tendons'] },
      { wk: 11, cells: ['Myofibrils', 'Week 11', 'Each muscle fiber is packed with myofibrils, which are packed with myofilaments'], src: [L9, 17], match: 'Each fiber is packed with myofibrils', ids: ['p11_myofibrils'] },
      { wk: 11, cells: ['Elasticity', 'Week 11', 'The ability of muscle to recoil to its original resting length after being stretched'], src: [L9, 5], match: 'Ability of muscle to recoil', ids: ['p11_elasticity'] },
      { wk: 11, cells: ['Osteon', 'Week 11', 'The basic functional unit of compact bone (Haversian system)'], src: [L9, 65], match: 'basic functional unit: osteon', ids: ['p11_osteon'] },
      { wk: 11, cells: ['Osteocytes', 'Week 11', 'In spongy bone, with no blood vessels, osteocytes get their nutrients by diffusion from the canaliculi of compact bone'], src: [L9, 68], match: 'Osteocytes get the nutrients via diffusion from canaliculi', ids: ['p11_osteocytes', 'p11_canaliculi'] },
      { wk: 11, cells: ['Remodeling', 'Week 11', 'Bone matrix is continuously recycled by the balanced activities of osteocytes, osteoblasts and osteoclasts'], src: [L9, 70], match: 'Balanced activities involve osteocytes, osteoblasts and osteoclasts', ids: ['p11_osteoblasts', 'p11_osteoclasts', 'p11_bone_matrix_renewal'] },
      { wk: 12, cells: ['Fibroblasts', 'Week 12', 'Cells of connective tissue proper that produce extracellular fibers; they secrete interferon beta, which slows inflammation'], src: [L10, 28], match: 'responsible for the production of extracellular fibers', ids: ['p12_fibroblasts'] },
    ],
  },
  {
    id: 'tb-organs',
    title: 'Organs in more than one system',
    head: ['Organ', 'Lecture', 'What the slide says'],
    rows: [
      { wk: 1, cells: ['Skin', 'Week 1', 'The largest organ in the body, with all four primary tissues'], src: [L1, 56], match: 'The skin is the largest organ in the body', ids: ['p1_skin', 'p1_organ_def'] },
      { wk: 3, cells: ['Larynx', 'Week 3', 'Divides the upper respiratory system (above the larynx) from the lower (below it)'], src: [L3, 4], match: 'above the larynx', ids: ['p3_larynx'] },
      { wk: 3, cells: ['Diaphragm', 'Week 3', 'The volume of the thoracic cavity changes with expansion or contraction of the diaphragm or rib cage'], src: [L3, 21], match: 'With expansion or contraction of diaphragm or rib cage', ids: ['p3_diaphragm', 'p3_pulmonary_vent_step'] },
      { wk: 4, cells: ['Pharynx', 'Week 4', 'A passageway for solid food, liquids and air; food passes through it to the esophagus'], src: [L4, 20], match: 'Passageway for solid food, liquids, and air', ids: ['p4_pharynx', 'p3_pharynx'] },
      { wk: 4, cells: ['Esophagus', 'Week 4', 'A hollow muscular tube that conveys solid food and liquids to the stomach'], src: [L4, 20], match: 'A hollow muscular tube', ids: ['p4_esophagus'] },
      { wk: 4, cells: ['Pancreas', 'Week 4', 'Acini secrete pancreatic juice (exocrine function); pancreatic islets are endocrine tissue that secretes insulin and glucagon into the bloodstream'], src: [L4, 41], match: 'Endocrine tissues of pancreas', ids: ['p_pancreas', 'p1_exocrine_glands'] },
      { wk: 4, cells: ['Liver', 'Week 4', 'Metabolic regulation, hematological regulation and bile production'], src: [L4, 44], match: 'Hematological regulation', ids: ['p_liver', 'p4_metab_reg'] },
      { wk: 4, cells: ['Rectum', 'Week 4', 'An expandable organ for temporary storage of feces'], src: [L4, 62], match: 'Is an expandable organ for temporary storage of feces', ids: ['p4_rectum'] },
      { wk: 5, cells: ['Kidneys and urethra', 'Week 5', 'Paired kidneys lie below the diaphragm; urine flows to the bladder and the urethra drains it'], src: [L5, 4], match: 'Urethra drains urine from bladder', ids: ['p5_kidneys', 'p5_urethra', 'p3_diaphragm'] },
      { wk: 7, cells: ['Urethra', 'Week 7', 'In ejaculation spermatozoa pass from the epididymis through the ductus deferens and ejaculatory duct to the urethra'], src: [L6, 16], match: 'ejaculatory duct', ids: ['p7_urethra_male', 'p5_urethra'] },
      { wk: 8, cells: ['Larynx', 'Week 8', 'The thyroid gland is located just below the larynx'], src: [L7, 39], match: 'Is located just below the larynx', ids: ['p3_larynx', 'p_thyroid'] },
      { wk: 8, cells: ['Pancreas', 'Week 8', 'The islets of Langerhans are scattered clusters of endocrine cells in the pancreas'], src: [L7, 47], match: 'Are scattered clusters of endocrine cells in pancreas', ids: ['p_pancreas', 'p_islets'] },
      { wk: 8, cells: ['Kidneys', 'Week 8', 'Parathyroid hormone enhances Ca2+ reabsorption at the kidneys and the kidneys\' secretion of calcitriol'], src: [L7, 45], match: 'stimulates formation and secretion of calcitriol by the kidneys', ids: ['p5_kidneys', 'p8_calcitriol'] },
      { wk: 12, cells: ['Skin and hair', 'Week 12', 'The outer layer of skin, hair and the epithelial layers of internal passageways are physical barriers'], src: [L10, 12], match: 'Outer layer of skin', ids: ['p1_skin', 'p12_hair'] },
      { wk: 12, cells: ['Liver', 'Week 12', 'Kupffer cells, special fixed macrophages, are found in the liver sinusoids'], src: [L10, 16], match: 'Kupffer cells found in liver sinusoids', ids: ['p_liver', 'p12_kupffer'] },
    ],
  },
  {
    id: 'tb-cortex',
    title: 'Cortex and medulla, three organs',
    head: ['Organ', 'Lecture', 'Cortex', 'Medulla'],
    rows: [
      { wk: 3, cells: ['Brain', 'Week 3', 'Voluntary centers in the cerebral cortex affect breathing', 'The respiratory centers are nuclei in the medulla oblongata and pons'], src: [L3, 60], match: 'Voluntary centers in cerebral cortex', ids: ['p3_resp_centers'] },
      { wk: 5, cells: ['Kidney', 'Week 5', 'Contains many capillaries and the outer parts of the nephrons', 'Renal pyramids separated by renal columns'], src: [L5, 5], match: 'Cortex contains many capillaries and outer parts of nephrons', ids: ['p5_renal_cortex', 'p5_renal_medulla'] },
      { wk: 8, cells: ['Adrenal gland', 'Week 8', 'Superficial; stores lipids and manufactures steroid hormones (corticosteroids)', 'Inner; controlled by the sympathetic division; produces epinephrine and norepinephrine'], src: [L7, 34], match: 'Manufactures steroid hormones (corticosteroids)', ids: ['p8_adrenal_cortex', 'p8_adrenal_medulla', 'p5_kidneys'] },
    ],
  },
  {
    id: 'tb-glands',
    title: 'Glands and what they secrete',
    head: ['Gland', 'Secretes', 'Lecture'],
    rows: [
      { wk: 7, cells: ['Corpus luteum', 'Estrogen and progesterone, which play a role in the menstrual cycle', 'Week 7'], src: [L6, 29], match: 'These hormones play a role in the menstrual cycle', ids: ['p7_corpus_luteum', 'p_menstrual'] },
      { wk: 7, cells: ['Blastocyst', 'Chorionic gonadotropin, which acts like LH to keep the corpus luteum alive', 'Week 7'], src: [L6, 48], match: 'releases chorionic gonadotropin', ids: ['p7_hcg'] },
      { wk: 7, cells: ['Uterus at delivery', 'Strong uterine contractions push the foetus and placenta out; afterwards the foetal-placental unit decreases its hormone secretions', 'Week 7'], src: [L6, 55], match: 'Strong uterine contractions help push the foetus and placenta out', ids: ['p_parturition', 'p_vessels'] },
      { wk: 8, cells: ['Endocrine glands', 'Hormones, into the bloodstream; they are ductless', 'Week 8'], src: [L7, 7], match: 'Are ductless and secrete hormones into bloodstream', ids: ['p_endo_glands', 'p8_endocrine_del'] },
      { wk: 8, cells: ['Thyroid', 'T4 and T3, which set the basal metabolism rate; its follicles are filled with colloid; calcitonin', 'Week 8'], src: [L7, 39], match: 'Secretes T4 and T3', ids: ['p_thyroid', 'p8_t4', 'p8_colloid'] },
      { wk: 8, cells: ['Anterior pituitary', '6 trophic hormones that maintain the size of their targets', 'Week 8'], src: [L7, 25], match: 'Secretes 6 trophic hormones', ids: ['p8_anterior_pit', 'p_pituitary'] },
      { wk: 8, cells: ['Adrenal cortex, ovaries, testes, placenta', 'Steroids: cortisol and aldosterone; estrogen and progesterone; testosterone', 'Week 8'], src: [L7, 9], match: 'secreted by the adrenal cortex (cortisol and aldosterone)', ids: ['p8_steroids', 'p8_adrenal_cortex', 'p8_aldosterone', 'p8_cortisol'] },
      { wk: 8, cells: ['Pancreas', 'Proteins and peptides: insulin and glucagon', 'Week 8'], src: [L7, 9], match: 'pancreas ( insulin and glucagons)', ids: ['p_pancreas', 'p8_insulin', 'p8_glucagon'] },
      { wk: 8, cells: ['Gonads and placenta', 'Gonads: testosterone, estrogen and progesterone; placenta: oestrogen, progesterone, hCG and somatomammotropin', 'Week 8'], src: [L7, 52], match: 'Gonads (testes and ovaries) secrete steroid hormones', ids: ['p8_gonads', 'p8_testosterone', 'p8_estrogen', 'p8_progesterone', 'p8_placenta', 'p8_hcg'] },
      { wk: 8, cells: ['Anterior pituitary', 'Gonadotropins (FSH and LH), which act on the gonads', 'Week 8'], src: [L7, 31], match: 'Gonadotropins (FSH and LH)', ids: ['p8_fsh', 'p8_lh', 'p8_anterior_pit'] },
      { wk: 8, cells: ['Any cell (autocrine, paracrine)', 'An autocrine hormone feeds back on the same cell; a paracrine one diffuses to adjacent target cells; blood is not involved', 'Week 8'], src: [L7, 5], match: 'Blood is not directly involved in the delivery', ids: ['p8_paracrine_del', 'p8_chem_messengers'] },
    ],
  },
  {
    id: 'tb-secretion',
    title: 'Secretion and excretion',
    head: ['Word', 'Lecture', 'What the slide says'],
    rows: [
      { wk: 4, cells: ['Six functions', 'Week 4', 'Ingestion, mechanical processing, digestion, secretion, absorption and excretion'], src: [L4, 4], match: 'Six Functions of the Digestive System', ids: ['p4_ingestion', 'p4_secretion', 'p4_excretion'] },
      { wk: 5, cells: ['Waste products', 'Week 5', 'In urine formation the kidneys regulate the waste products in plasma'], src: [L5, 2], match: 'Waste products in plasma', ids: ['p5_waste_products', 'p_plasma'] },
      { wk: 5, cells: ['Secretion', 'Week 5', 'The active transport of substances from the peritubular capillaries into the tubular fluid; opposite in direction to reabsorption'], src: [L5, 34], match: 'into the tubular fluid = secretion', ids: ['p5_secretion'] },
      { wk: 5, cells: ['Excretion', 'Week 5', 'Excretion rate = (filtration rate + secretion rate) - reabsorption rate'], src: [L5, 34], match: 'Excretion rate = (filtration rate + secretion rate)', ids: ['p4_excretion', 'p5_secretion'] },
      { wk: 8, cells: ['Excretion', 'Week 8', 'Calcitonin is released when there is too much Ca2+ and signals its excretion and storage in bones'], src: [L7, 39], match: 'signals for its excretion', ids: ['p8_calcitonin', 'p4_excretion'] },
      { wk: 12, cells: ['Secretions', 'Week 12', 'Secretions inside and outside the body flush away materials: sweat, mucus (respiratory) and urine'], src: [L10, 12], match: 'that flush away materials', ids: ['p12_secretions', 'p12_mucus'] },
    ],
  },
  {
    id: 'tb-nerve',
    title: 'Nerve cells, met twice',
    head: ['Part', 'Lecture', 'What the slide says'],
    rows: [
      { wk: 1, cells: ['Neurons and neuroglia', 'Week 1', 'Neurons perform electrical communication; neuroglia are supporting cells that repair and supply nutrients to neurons'], src: [L1, 54], match: 'Perform electrical communication', ids: ['p1_neurons', 'p1_neuroglia'] },
      { wk: 1, cells: ['Cell body, dendrites, axon', 'Week 1', 'The cell body holds the nucleus; dendrites receive incoming signals; the axon carries outgoing electrical signals'], src: [L1, 54], match: 'Carries outgoing electrical signals to their destination', ids: ['p1_cell_body', 'p1_dendrites', 'p1_axon'] },
      { wk: 1, cells: ['CNS and PNS', 'Week 1', 'The CNS is the brain and spinal cord; the PNS is the nerves and ganglia outside it; glial cells support the neurons'], src: ['hss.tut.tissues', 20], match: 'The CNS is the brain and spinal cord', ids: ['p_neural_t', 'p1_tis_cns', 'p1_tis_pns', 'p1_tis_glia'] },
      { wk: 1, cells: ['Three kinds of neuron', 'Week 1', 'Sensory neurons carry information from receptors to the CNS, motor neurons from the CNS to muscles or glands; interneurons connect neurons within the CNS'], src: ['hss.tut.tissues', 21], match: 'Transmit sensory information from receptors to the CNS', ids: ['p1_tis_sensoryn', 'p1_tis_motorn', 'p1_tis_interneurons'] },
      { wk: 9, cells: ['CNS and PNS', 'Week 9', 'The nervous system has two parts: the CNS (brain and spinal cord) and the PNS (somatic and autonomic)'], src: [L8, 3], match: 'The NS is divided into two parts', ids: ['p_ns', 'p_cns', 'p9_brain', 'p9_spinal_cord'] },
      { wk: 9, cells: ['Three kinds of neuron', 'Week 9', 'Sensory neurons conduct from receptors to the CNS, motor neurons from the CNS to muscles or glands; interneurons lie within the CNS'], src: [L8, 7], match: 'conduct impulses from sensory receptors to the CNS', ids: ['p_neurons', 'p9_sensory_neurons', 'p9_motor_neurons'] },
      { wk: 9, cells: ['Cell body, dendrites, axon', 'Week 9', 'Cell bodies cluster in nuclei in the CNS and in ganglia in the PNS; dendrites receive signals; the axon conducts impulses'], src: [L8, 10], match: 'cluster in groups called nuclei in the CNS and ganglia in the PNS', ids: ['p9_cell_body', 'p9_nuclei', 'p9_ganglia', 'p9_dendrites', 'p9_axon'] },
      { wk: 9, cells: ['Glial cells', 'Week 9', 'Four types in the CNS; ependymal cells line the brain ventricles and secrete cerebrospinal fluid'], src: [L8, 14], match: 'line the brain ventricles and secrete cerebrospinal fluid', ids: ['p_glia', 'p9_csf'] },
      { wk: 9, cells: ['Ion channels', 'Week 9', 'Voltage-gated K+ channels open only when a particular membrane potential is reached'], src: [L8, 24], match: 'only open when a particular membrane potential is reached', ids: ['p9_voltage_gated_k'] },
      { wk: 11, cells: ['Motor neurons', 'Week 11', 'Lower motor neurons, the final common pathway, are influenced by sensory information from muscles and tendons'], src: [L9, 58], match: 'Sensory information from muscles and tendons', ids: ['p9_motor_neurons', 'p9_sensory_info', 'p11_tendons'] },
    ],
  },
  {
    id: 'tb-blood',
    title: 'Blood and plasma',
    head: ['What', 'Lecture', 'What the slide says'],
    rows: [
      { wk: 2, cells: ['Plasma', 'Week 2', 'A straw-colored liquid of H2O and dissolved solutes, including ions, metabolites, hormones and antibodies'], src: [L2, 5], match: 'straw-colored liquid', ids: ['p_plasma'] },
      { wk: 2, cells: ['Platelets', 'Week 2', 'The smallest formed elements, fragments of megakaryocytes from bone marrow; most of the mass of blood clots'], src: [L2, 8], match: 'Are fragments of megakaryocytes from bone marrow', ids: ['p2_platelets'] },
      { wk: 2, cells: ['Ventricles', 'Week 2', 'The heart has 4 chambers: 2 atria receive blood from the venous system and 2 ventricles pump blood to arteries'], src: [L2, 27], match: '2 ventricles pump blood to arteries', ids: ['p_heart', 'p2_ventricles'] },
      { wk: 5, cells: ['Plasma proteins', 'Week 5', 'Mostly kept out of the filtrate by their large size and negative charge'], src: [L5, 16], match: 'Plasma proteins are mostly excluded from the filtrate', ids: ['p5_plasma_proteins', 'p_plasma'] },
      { wk: 12, cells: ['Plasma', 'Week 12', 'Plasma contains 30 special complement proteins; either activation pathway turns on the common pathway'], src: [L10, 30], match: 'Plasma contains 30 special complement (C) proteins', ids: ['p_plasma', 'p12_common_pathway'] },
    ],
  },
];
