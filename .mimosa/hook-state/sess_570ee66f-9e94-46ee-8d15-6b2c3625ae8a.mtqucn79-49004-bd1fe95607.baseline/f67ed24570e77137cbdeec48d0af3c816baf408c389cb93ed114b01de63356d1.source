/*
 * ABCT2326 depth lessons. These split the mechanism-heavy respiratory and
 * digestive lectures into readable units; the original teaching decks remain
 * the notes and every item below points back to its exact slide range.
 */

export const PHYS_DEPTH_ITEMS = [
  {
    id: 'abct2326-resp-ventilation-mechanics', subject: 'ABCT2326', unit: 'phys.resp', type: 'sequence',
    title: 'Ventilation mechanics, compliance and respiratory muscles', tags: ['respiratory', 'mechanism', 'high-yield'],
    lesson: {
      explanation: 'Pulmonary ventilation follows Boyle’s law: increasing thoracic volume lowers pressure inside the lungs below atmospheric pressure, so air enters; decreasing volume raises pressure, so air leaves. During quiet inhalation the diaphragm supplies about 75% of normal air movement and the external intercostals about 25%. Forced inhalation recruits accessory muscles that elevate the ribs. Quiet exhalation is mainly passive elastic recoil; forced exhalation recruits the internal intercostals and transversus thoracis to depress the ribs, while abdominal muscles compress the abdomen and push the diaphragm upward. Compliance describes how easily the lungs expand: low compliance needs greater force, while high compliance needs less. It depends on lung connective tissue, surfactant and thoracic-cage mobility; fibrosis decreases compliance, whereas emphysema increases it while impairing recoil. Cyclical intrapleural-pressure changes also assist venous return as the respiratory pump.',
      keyFacts: [
        'Inhale: thoracic volume rises, intrapulmonary pressure falls, air enters; exhale reverses the gradient.',
        'Quiet inhalation: diaphragm about 75%, external intercostals about 25%.',
        'Forced exhalation: rib depressors plus abdominal compression drive the diaphragm upward.',
        'Low compliance requires more force; fibrosis lowers compliance, emphysema raises compliance but loses recoil.',
        'Compliance depends on lung connective tissue, surfactant and mobility of the thoracic cage.',
        'The intrapleural-pressure cycle helps venous return through the respiratory pump.',
      ], prerequisites: ['abct2326-resp-pathway'], examples: [],
    },
    memory: { comparison: 'Compliance is ease of expansion, not effectiveness of ventilation: a grocery bag expands easily but recoils poorly.' },
    practice: [
      { type: 'sequence', prompt: 'Order the events of quiet inhalation.', items: ['Diaphragm and external intercostals contract', 'Thoracic volume increases', 'Intrapulmonary pressure falls below atmospheric pressure', 'Air flows into the lungs'], explanation: 'Volume creates the pressure gradient; the pressure gradient moves the air.' },
      { type: 'mcq', prompt: 'Which change lowers lung compliance?', options: ['Emphysema', 'More surfactant', 'Pulmonary fibrosis', 'Greater thoracic mobility'], answer: 2, explanation: 'Fibrosis makes the lung harder to expand, so greater force is required.' },
    ],
    commonMistakes: ['Equating high compliance with healthy ventilation; emphysema is highly compliant but has poor elastic recoil.'],
    skills: ['Trace every breath as muscle force → volume change → pressure change → airflow.'],
    selfCheck: 'Explain quiet inhalation and forced exhalation, then contrast fibrosis and emphysema using compliance and recoil.',
    sourceRefs: [{ ref: 'phys.3', location: 'Slides 18–31 Boyle’s law, pressure changes, compliance, respiratory pump and respiratory muscles' }],
  },
  {
    id: 'abct2326-resp-lung-volumes', subject: 'ABCT2326', unit: 'phys.resp', type: 'definition',
    title: 'Respiratory rate, volumes and capacities', tags: ['respiratory', 'measurements', 'high-yield'],
    lesson: {
      explanation: 'Ventilation can change by altering respiratory rate, tidal volume, or both. Respiratory minute volume is respiratory rate multiplied by tidal volume. The four pulmonary volumes are tidal volume (air moved in one quiet breath), inspiratory reserve volume (extra air inhaled after a normal inspiration), expiratory reserve volume (extra air forced out after a normal expiration), and residual volume (air remaining after maximal expiration). Capacities combine volumes: inspiratory capacity = IRV + TV; functional residual capacity = ERV + RV; vital capacity = IRV + TV + ERV; total lung capacity = VC + RV. The lecture’s comparison shows two different abnormal patterns: in one, lung volumes are decreased; in the other, volumes remain essentially normal but flow rates are impeded.',
      keyFacts: ['Minute volume = respiratory rate × tidal volume.', 'IC = IRV + TV.', 'FRC = ERV + RV.', 'VC = IRV + TV + ERV.', 'TLC = VC + RV.', 'Residual volume remains after maximal exhalation.', 'One abnormal pattern decreases volumes; another preserves volumes but impedes flow rates.'],
      prerequisites: ['abct2326-resp-ventilation-mechanics'], examples: ['At 12 breaths/min and 500 mL per breath, minute volume is 6000 mL/min.'],
    },
    memory: { chunking: 'Four volumes make four capacities; RV appears in FRC and TLC, never in VC.' },
    practice: [
      { type: 'typed', prompt: 'A person breathes 12 times per minute with a tidal volume of 500 mL. What is the minute volume?', accept: ['6000 ml/min', '6 l/min', '6000 mL per minute', '6 litres per minute'], explanation: '12 × 500 mL = 6000 mL/min, or 6 L/min.' },
      { type: 'matching', prompt: 'Match each capacity to its formula.', pairs: [['Inspiratory capacity', 'IRV + TV'], ['Functional residual capacity', 'ERV + RV'], ['Vital capacity', 'IRV + TV + ERV'], ['Total lung capacity', 'VC + RV']], explanation: 'These are the capacity relationships on the lecture slide.' },
    ],
    commonMistakes: ['Including residual volume in vital capacity; vital capacity is only the air that can be moved.'],
    skills: ['Rebuild each capacity from the physical manoeuvre instead of memorising isolated letters.'],
    selfCheck: 'Define TV, IRV, ERV and RV, then write all four capacity equations.',
    sourceRefs: [{ ref: 'phys.3', location: 'Slides 32–39 respiratory rate, minute volume, pulmonary volumes, capacities and disease patterns' }],
  },
  {
    id: 'abct2326-resp-oxygen-transport', subject: 'ABCT2326', unit: 'phys.resp', type: 'sequence',
    title: 'Partial pressures, haemoglobin and oxygen unloading', tags: ['respiratory', 'gas transport', 'mechanism', 'high-yield'],
    lesson: {
      explanation: 'External respiration exchanges gases between alveoli and pulmonary capillary blood; internal respiration exchanges gases between systemic capillaries and tissues. Venous blood arriving at the lungs has low PO₂ and high PCO₂, so oxygen enters blood and carbon dioxide leaves until rapid diffusion approaches equilibrium. Plasma alone cannot carry enough gas, so red cells supply haemoglobin. Each haemoglobin molecule binds up to four oxygen molecules reversibly, forming oxyhaemoglobin. Cooperative binding makes the oxygen–haemoglobin dissociation curve sigmoidal: binding one oxygen changes haemoglobin so the next binds more easily. In metabolically active tissues, higher temperature and lower pH shift the curve right, reducing affinity and releasing more oxygen. Carbon dioxide helps lower pH through carbonic anhydrase: CO₂ + H₂O forms carbonic acid, which dissociates into H⁺ and bicarbonate. This pH-driven unloading is the Bohr effect.',
      keyFacts: ['External respiration is lung exchange; internal respiration is tissue exchange.', 'Each haemoglobin binds four O₂ molecules reversibly.', 'Cooperative binding produces the curved saturation relationship.', 'Lower pH or higher temperature shifts right and promotes oxygen release.', 'Higher pH or lower temperature shifts left and retains oxygen.', 'The Bohr effect links increased CO₂ and H⁺ to reduced haemoglobin oxygen affinity.'], prerequisites: ['abct2326-resp-pathway'], examples: [],
    },
    memory: { comparison: 'Right shift means release: hot, acidic active tissue receives oxygen.' },
    practice: [
      { type: 'mcq', prompt: 'What happens to oxygen unloading when tissue temperature rises and pH falls?', options: ['It decreases', 'It increases', 'It stops', 'Haemoglobin binds carbon dioxide instead of oxygen'], answer: 1, explanation: 'The curve shifts right, haemoglobin affinity falls and more oxygen is released.' },
      { type: 'sequence', prompt: 'Order the chemical steps that connect tissue carbon dioxide to the Bohr effect.', items: ['CO₂ enters the red cell', 'Carbonic anhydrase forms carbonic acid', 'Carbonic acid dissociates into H⁺ and bicarbonate', 'pH falls and haemoglobin releases more O₂'], explanation: 'Carbon dioxide changes oxygen delivery by changing acidity inside the red cell.' },
    ],
    commonMistakes: ['Reading a right shift as stronger binding; it means easier unloading at a given PO₂.'],
    skills: ['Connect the curve to tissue metabolism: heat and CO₂ are signals that the tissue needs oxygen.'], selfCheck: 'Explain why exercising muscle receives extra oxygen without requiring a new haemoglobin molecule.',
    sourceRefs: [{ ref: 'phys.3', location: 'Slides 40–54 gas exchange, haemoglobin saturation, curve shifts and the Bohr effect' }],
  },
  {
    id: 'abct2326-resp-carbon-dioxide-control', subject: 'ABCT2326', unit: 'phys.resp', type: 'sequence',
    title: 'Carbon dioxide transport and feedback control of breathing', tags: ['respiratory', 'gas transport', 'homeostasis', 'high-yield'],
    lesson: {
      explanation: 'Carbon dioxide is transported in three forms: about 70% is converted in red cells to carbonic acid and then H⁺ plus bicarbonate; 23% binds globin amino groups as carbaminohaemoglobin; and 7% remains dissolved in plasma. Bicarbonate leaves the red cell in exchange for chloride without ATP—the chloride shift—while haemoglobin buffers much of the H⁺. Breathing rhythm is generated in the medulla: the dorsal respiratory group functions in quiet and forced inspiration, while the ventral group contains inspiratory and expiratory centres used mainly during forced breathing. Pontine apneustic input stimulates inspiration; the pneumotaxic centre limits that drive and helps promote expiration, adjusting rate and depth. Peripheral carotid and aortic bodies report PO₂ and pH through CN IX and X; central medullary chemoreceptors respond to CSF PCO₂ and pH. Rising arterial PCO₂ lowers CSF pH, stimulates the centres, increases breathing and removes CO₂; falling PCO₂ suppresses the pathway. Chronic stimulation can reduce receptor sensitivity.',
      keyFacts: ['CO₂ carriage: 70% bicarbonate route, 23% carbaminohaemoglobin, 7% dissolved.', 'Chloride shift exchanges bicarbonate out for chloride in without ATP.', 'DRG: quiet and forced inspiration; VRG: forced inspiration and expiration.', 'Apneustic centre stimulates inspiration; pneumotaxic centre limits it and promotes expiration.', 'Carotid bodies → CN IX; aortic bodies and lung stretch receptors → CN X.', 'High arterial PCO₂ drives faster/deeper breathing through reduced CSF pH.', 'Chemoreceptor responses adapt during chronic stimulation.'], prerequisites: ['abct2326-resp-oxygen-transport'], examples: [],
    },
    memory: { chunking: '70–23–7: bicarbonate, haemoglobin, dissolved.' },
    practice: [
      { type: 'matching', prompt: 'Match each CO₂ transport form to its approximate share.', pairs: [['Bicarbonate route', '70%'], ['Carbaminohaemoglobin', '23%'], ['Dissolved in plasma', '7%']], explanation: 'The three shares account for all circulating carbon dioxide.' },
      { type: 'sequence', prompt: 'Order the negative-feedback response to hypercapnia.', items: ['Arterial PCO₂ rises', 'CSF PCO₂ rises and pH falls', 'Chemoreceptors stimulate respiratory centres', 'Rate and depth of breathing increase', 'More CO₂ is eliminated and arterial PCO₂ falls'], explanation: 'The response removes the disturbance that activated it.' },
    ],
    commonMistakes: ['Saying the central chemoreceptors directly monitor blood oxygen; they primarily respond to CSF PCO₂ and pH.'], skills: ['Use the route and stimulus together: where a receptor sits determines which fluid and nerve belong to it.'], selfCheck: 'Give the 70–23–7 split and trace hypercapnia back to normal.',
    sourceRefs: [{ ref: 'phys.3', location: 'Slides 55–74 carbon dioxide transport, respiratory centres, reflexes and arterial PCO₂ homeostasis' }],
  },
  {
    id: 'abct2326-digestive-wall-motility', subject: 'ABCT2326', unit: 'phys.dig', type: 'sequence',
    title: 'Digestive wall, peristalsis and neural control', tags: ['digestive', 'motility', 'mechanism', 'high-yield'],
    lesson: {
      explanation: 'Most of the digestive tract has four layers. The mucosa contacts the lumen and contains epithelium, lamina propria and muscularis mucosae. The submucosa contains connective tissue, vessels, glands and the submucosal plexus. The muscularis externa usually has inner circular and outer longitudinal smooth muscle with the myenteric plexus between them. The serosa is the outer covering. Peristalsis moves a bolus by contraction of circular muscle behind it and relaxation ahead, while longitudinal muscle shortens the segment. Local enteric reflexes can coordinate secretion and movement without the CNS: sensory receptors feed interneurons in the plexuses, which activate motor neurons to smooth muscle or glands. Long reflexes pass through the CNS; parasympathetic input generally prepares and stimulates digestion, whereas sympathetic input inhibits gastrointestinal activity.',
      keyFacts: ['Layers inward to outward: mucosa, submucosa, muscularis externa, serosa.', 'Submucosal plexus chiefly regulates secretion and local conditions.', 'Myenteric plexus lies in muscularis externa and chiefly regulates motility.', 'Peristalsis contracts behind and relaxes ahead of the bolus.', 'Short reflexes stay within the enteric nervous system; long reflexes involve the CNS.', 'Parasympathetic activity promotes digestion; sympathetic activity inhibits it.'], prerequisites: ['abct2326-digestive-pathway'], examples: [],
    },
    memory: { location: 'Submucosal plexus sits by glands; myenteric plexus sits by muscle.' },
    practice: [{ type: 'sequence', prompt: 'Order the digestive tract wall from the lumen outward.', items: ['Mucosa', 'Submucosa', 'Muscularis externa', 'Serosa'], explanation: 'This four-layer plan repeats through most of the tract.' }, { type: 'explain', prompt: 'How does peristalsis move a bolus forward?', model: 'Circular muscle contracts behind the bolus and relaxes ahead while longitudinal muscle shortens the receiving segment, creating a moving pressure wave.', rubric: ['Contraction behind', 'Relaxation ahead', 'Mentions longitudinal shortening or pressure wave'] }],
    commonMistakes: ['Swapping the submucosal and myenteric plexuses.'], skills: ['Locate the plexus beside the function it controls.'], selfCheck: 'Draw the four wall layers and place both plexuses, then narrate one peristaltic wave.',
    sourceRefs: [{ ref: 'phys.4', location: 'Slides 7–19 digestive wall layers, peristalsis, short and long reflexes' }],
  },
  {
    id: 'abct2326-digestive-stomach-control', subject: 'ABCT2326', unit: 'phys.dig', type: 'sequence',
    title: 'Stomach secretions and the three phases of gastric control', tags: ['digestive', 'stomach', 'mechanism', 'high-yield'],
    lesson: {
      explanation: 'Gastric glands contain mucous cells, parietal cells, chief cells and enteroendocrine cells. Parietal cells secrete hydrochloric acid and intrinsic factor. Chief cells release inactive pepsinogen, which HCl converts to proteolytic pepsin in the lumen. G cells release gastrin, while D cells release somatostatin that inhibits gastrin. Acid is generated when carbonic anhydrase forms carbonic acid inside the parietal cell; H⁺ is pumped into the gland lumen, bicarbonate exits to blood in exchange for chloride—the post-meal alkaline tide—and chloride then diffuses into the lumen to form HCl. Gastric activity has three phases. The cephalic phase begins with sight, smell, taste or thought of food through vagal stimulation. The gastric phase begins with stomach distension, higher pH and peptides, driving local reflexes and gastrin. The intestinal phase begins when chyme enters the duodenum; low pH, lipids and carbohydrates trigger the enterogastric reflex plus secretin, CCK and GIP to inhibit gastric secretion and emptying.',
      keyFacts: ['Parietal: HCl and intrinsic factor.', 'Chief: pepsinogen; HCl activates it to pepsin.', 'G cell: gastrin; D cell: somatostatin inhibits gastrin.', 'Bicarbonate leaves the parietal cell for blood as the alkaline tide while chloride enters.', 'Cephalic phase anticipates food; gastric phase responds to food in stomach; intestinal phase slows the stomach when chyme reaches duodenum.', 'The stomach begins protein digestion but absorbs little nutrient.'], prerequisites: ['abct2326-digestive-wall-motility'], examples: [],
    },
    memory: { sequence: 'Think it, fill it, brake it: cephalic, gastric, intestinal.' },
    practice: [{ type: 'matching', prompt: 'Match each gastric cell to its secretion.', pairs: [['Parietal cell', 'HCl and intrinsic factor'], ['Chief cell', 'Pepsinogen'], ['G cell', 'Gastrin'], ['D cell', 'Somatostatin']], explanation: 'The cell names identify the control map for gastric secretion.' }, { type: 'sequence', prompt: 'Order the phases of gastric control.', items: ['Cephalic phase', 'Gastric phase', 'Intestinal phase'], explanation: 'Anticipation precedes stomach filling; duodenal feedback follows.' }],
    commonMistakes: ['Saying chief cells secrete active pepsin; they secrete inactive pepsinogen.'], skills: ['Link each phase to the compartment currently sensing food.'], selfCheck: 'Name four gastric cell types and trace HCl production and the three control phases.',
    sourceRefs: [{ ref: 'phys.4', location: 'Slides 20–34 oral processing, stomach cells, HCl production and three phases of gastric control' }],
  },
  {
    id: 'abct2326-digestive-small-intestine-accessory', subject: 'ABCT2326', unit: 'phys.dig', type: 'matching',
    title: 'Small intestine, pancreas, liver and bile', tags: ['digestive', 'absorption', 'mechanism', 'high-yield'],
    lesson: {
      explanation: 'About 90% of nutrient absorption occurs in the small intestine. The duodenum receives acidic chyme plus pancreatic and hepatic secretions and neutralises the acid; the jejunum performs most chemical digestion and nutrient absorption; the ileum ends at the ileocaecal valve. Villi contain blood capillaries for water-soluble nutrients and a central lacteal for absorbed lipids. Brush-border enzymes sit on microvilli; enteropeptidase activates pancreatic trypsinogen. Pancreatic acini and ducts are exocrine and provide juice containing amylase, lipase, nucleases and proteolytic proenzymes; pancreatic islets are endocrine and release insulin and glucagon to blood. The liver regulates blood composition, nutrients, wastes, storage and drug inactivation and produces bile. Bile salts emulsify large lipid droplets into smaller droplets, increasing surface area for pancreatic lipase; bile does not enzymatically digest fat. The gallbladder stores and concentrates bile. Duodenal CCK contracts the gallbladder and relaxes the hepatopancreatic sphincter so bile enters the duodenum.',
      keyFacts: ['Duodenum receives and neutralises; jejunum digests and absorbs; ileum ends at ileocaecal valve.', 'Villus capillaries receive water-soluble nutrients; lacteals receive lipids.', 'Enteropeptidase activates trypsinogen.', 'Pancreatic acini are exocrine; islets are endocrine.', 'Bile emulsifies fat, increasing lipase-accessible surface area; it is not an enzyme.', 'Gallbladder stores/concentrates bile; CCK contracts it and relaxes the hepatopancreatic sphincter.'], prerequisites: ['abct2326-digestive-stomach-control'], examples: [],
    },
    memory: { comparison: 'Bile makes droplets smaller; lipase makes molecules smaller.' },
    practice: [{ type: 'matching', prompt: 'Match each small-intestinal segment to its main lecture role.', pairs: [['Duodenum', 'Receives chyme and neutralises acid'], ['Jejunum', 'Most chemical digestion and nutrient absorption'], ['Ileum', 'Ends at the ileocaecal valve']], explanation: 'The three segments divide reception, absorption and final delivery.' }, { type: 'explain', prompt: 'Why does emulsification improve fat digestion if bile is not an enzyme?', model: 'Bile salts divide large lipid drops into many small droplets, greatly increasing surface area exposed to pancreatic lipase, which performs the chemical hydrolysis.', rubric: ['Smaller droplets', 'Greater surface area', 'Lipase performs digestion'] }],
    commonMistakes: ['Calling bile a lipase or digestive enzyme.'], skills: ['Separate mechanical preparation by bile from chemical bond-breaking by lipase.'], selfCheck: 'Trace chyme through the three small-intestinal segments and explain how pancreas, liver and gallbladder assist.',
    sourceRefs: [{ ref: 'phys.4', location: 'Slides 35–52 small intestine, villi, pancreatic enzymes, liver, bile and gallbladder control' }],
  },
  {
    id: 'abct2326-digestive-hormones-colon', subject: 'ABCT2326', unit: 'phys.dig', type: 'matching',
    title: 'Duodenal hormones, large-intestinal functions and water balance', tags: ['digestive', 'hormones', 'absorption', 'high-yield'],
    lesson: {
      explanation: 'Duodenal hormones coordinate secretion and absorption. Gastrin responds to incompletely digested proteins and increases stomach motility, acid and enzyme production. Secretin responds when chyme reaches the duodenum, especially acid, and increases bile and bicarbonate-rich buffer secretion by liver and pancreas. GIP is released when fats and carbohydrates enter the small intestine and promotes insulin release while inhibiting gastric activity. CCK responds to lipids and partly digested proteins, increases pancreatic enzyme secretion, contracts the gallbladder and relaxes the hepatopancreatic sphincter. VIP increases intestinal gland secretion, dilates local capillaries and inhibits gastric acid; enterocrinin stimulates duodenal mucin. The large intestine reabsorbs water and bile salts, absorbs bacterial vitamins K, biotin and B5, compacts and stores faeces. Water itself is not actively transported; it follows osmotic gradients created chiefly by solute movement. Of roughly 9 L entering the tract daily from intake and secretions, about 7.8 L is reclaimed in small intestine, 1.25 L in colon and about 150 mL is lost in faeces.',
      keyFacts: ['Gastrin stimulates stomach motility, acid and enzymes.', 'Secretin stimulates bile and bicarbonate buffers.', 'GIP responds to fat/carbohydrate and promotes insulin while inhibiting stomach activity.', 'CCK stimulates pancreatic enzymes and bile ejection.', 'VIP increases intestinal secretion and blood flow while inhibiting gastric acid.', 'Colon: water/bile-salt reabsorption, bacterial vitamins, compaction and storage.', 'Water follows osmotic gradients; about 9 L enters daily and about 150 mL leaves in faeces.'], prerequisites: ['abct2326-digestive-small-intestine-accessory'], examples: [],
    },
    memory: { comparison: 'Secretin handles acid with buffer; CCK handles fat with enzymes and bile.' },
    practice: [{ type: 'matching', prompt: 'Match each duodenal hormone to its leading action.', pairs: [['Secretin', 'Increase bile and bicarbonate-rich buffers'], ['CCK', 'Pancreatic enzymes plus gallbladder contraction'], ['GIP', 'Insulin release and gastric inhibition'], ['VIP', 'Intestinal secretion and capillary dilation']], explanation: 'Each hormone coordinates the next organ needed for the arriving chyme.' }, { type: 'typed', prompt: 'Approximately how much water is lost in faeces each day in the lecture balance diagram?', accept: ['150 ml', '150 mL/day', '0.15 l', '150 millilitres'], explanation: 'About 150 mL, after small intestine and colon reclaim most of the roughly 9 L entering the tract.' }],
    commonMistakes: ['Saying water is actively pumped across the gut wall; solutes are transported and water follows osmotically.'], skills: ['Use the arriving nutrient to predict the hormone and organ response.'], selfCheck: 'Match the six intestinal hormones to triggers/actions and explain the 9 L water balance.',
    sourceRefs: [{ ref: 'phys.4', location: 'Slides 53–69 neural and hormonal coordination, large intestine, digestion and water reabsorption' }],
  },
];
