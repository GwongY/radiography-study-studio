/*
 * HSS2011 Human Anatomy — the per-module study items.
 *
 * Split out of study-data.js in phase 2026-09-01. outputs/study-data.js is
 * the barrel every importer still uses; nothing imports this file directly
 * except its siblings.
 */

export const HSS_MODULES = [
  {
    id: 'hss2011-m1-heart-wall-valves',
    subject: 'HSS2011', unit: 'hss.m1', type: 'definition',
    title: 'Heart wall, valves and the great vessels',
    tags: ['thorax', 'high-yield'],
    lesson: {
      explanation: 'The heart wall has three layers: epicardium, myocardium and endocardium. The pericardium is a separate sac around the heart and is not part of the heart wall itself — that distinction is the point of the revision question. Cardiac muscle cells are interconnected by intercalated discs. The AV valves separate the atria from the ventricles; the right AV valve is the tricuspid, with three cusps, and it closes when the right ventricle contracts to prevent backflow into the right atrium. The anterior interventricular sulcus marks the boundary between the left and right ventricles on the front of the heart, and the interventricular septum is the muscular partition between them inside.',
      plain: 'The heart wall has three layers — epicardium, myocardium, endocardium — and the pericardium is a separate sac around the heart, not part of the wall itself. That separation is exactly the point of the revision question. The AV valves sit between the atria and the ventricles; the right one (tricuspid) has three flaps and closes when the right ventricle contracts so blood cannot flow backwards into the right atrium.',
      keyFacts: [
        'Heart wall layers: epicardium, myocardium, endocardium. The pericardium is not one of them.',
        'Cardiac muscle cells are interconnected by intercalated discs.',
        'AV valves separate the atria from the ventricles.',
        'Right AV valve = tricuspid, three cusps, closes on right ventricular contraction.',
        'Anterior interventricular sulcus = surface boundary between the ventricles.',
        'Interventricular septum = the muscular partition between the two ventricles.',
        'The mediastinum is the region of the chest between the two pleural cavities.',
        'The cisterna chyli is an expanded, sac-like chamber at the base of the thoracic duct.',
        'Elastic arteries have the most resilient vessel wall.',
      ],
      prerequisites: ['hss2011-osteo-ribs-sternum'],
      examples: [],
    },
    memory: {
      chunking: 'Three layers, outside in: epi- (upon), myo- (muscle), endo- (within). The prefixes are the answer.',
      comparison: 'Pericardium wraps the heart; epicardium is the heart’s own outer layer and is the visceral pericardium. Same neighbourhood, different question — the exam asks which is part of the wall.',
      wordOrigin: 'Cisterna chyli: a cistern is a storage tank, chyle is the milky fat-laden lymph from the gut. A tank of chyle at the bottom of the thoracic duct.',
    },
    practice: [
      { type: 'mcq', prompt: 'Which of the following structures does NOT form part of the heart wall?', options: ['Epicardium', 'Pericardium', 'Myocardium', 'Endocardium'], answer: 1,
        explanation: 'Model answer B. The three layers of the heart wall are epicardium, myocardium and endocardium. The pericardium is the surrounding sac.',
        src: { ref: 'hss.revans', location: 'Module 1.2, MCQ 1' } },
      { type: 'mcq', prompt: 'Cardiac muscle cells in the heart are interconnected by:', options: ['Dense fibrous layers', 'Mesothelium', 'Intercalated discs', 'Areolar tissues'], answer: 2,
        explanation: 'Model answer C. Intercalated discs join cardiac muscle cells, secured by desmosomes and linked by gap junctions.',
        src: { ref: 'hss.revans', location: 'Module 1.2, MCQ 2' } },
      { type: 'mcq', prompt: 'Which of the following statements is correct?', options: ['The human heart has two AV valves and two aortic valves', 'The human heart has two tricuspid valves and two semilunar valves', 'Aortic valve and left AV valve are both semilunar valves', 'AV valves separate the atria from ventricles'], answer: 3,
        explanation: 'Model answer D. There is one aortic valve, one tricuspid valve, and the left AV valve is bicuspid rather than semilunar — so only the last statement holds.',
        src: { ref: 'hss.revans', location: 'Module 1.2, MCQ 3' } },
      { type: 'cloze', prompt: 'The ______ valve consists of three cusps and closes when the right ventricle contracts, preventing backflow into the right atrium.', accept: ['right av', 'tricuspid', 'right atrioventricular', 'right av/ tricuspid'],
        explanation: 'Model answer: Right AV / tricuspid.',
        src: { ref: 'hss.revans', location: 'Module 1.2, Fill-in-blanks 3' } },
      { type: 'cloze', prompt: 'The region of the chest situated between the two pleural cavities is called the ______.', accept: ['mediastinum'],
        explanation: 'Model answer: mediastinum. The arch of the aorta lies in its superior part.',
        src: { ref: 'hss.revans', location: 'Module 1.2, Fill-in-blanks 4' } },
    ],
    application: [
      { type: 'scenario', prompt: 'A question asks which valves are closed while the two ventricles are contracting. Reason it out from what the AV valves are for.',
        model: 'The AV valves are closed. They separate atria from ventricles, so when the ventricles contract the AV valves must shut to stop blood going back into the atria; the semilunar valves open at the same time to let blood out into the aorta and pulmonary trunk.',
        rubric: ['Identifies the AV valves as closed', 'Explains preventing backflow into the atria', 'Notes the semilunar valves are open'] },
    ],
    commonMistakes: [
      'Counting the pericardium as a layer of the heart wall.',
      'Calling the left AV valve semilunar — it is bicuspid (mitral).',
    ],
    skills: [
      'Epicardium and pericardium are the same neighbourhood and different answers: the epicardium is the heart\'s own outer layer (it is the visceral pericardium), while the pericardium is the sac around the heart. The wall has three layers and the sac is not one of them — that is the exact trap of Module 1.2 MCQ 1.',
      'Valve questions answer from what each valve separates and which way pressure moves: ventricles contracting means the AV valves shut (no backflow into the atria) and the semilunar valves open (the exit route). Direction of pressure decides which valves are closed — no list required.',
      'The left AV valve is bicuspid, not semilunar. "Two AV valves and two semilunar valves" sounds balanced and is false: the aortic and pulmonary valves are the semilunar pair, and there is one aortic valve.',
    ],
    selfCheck: 'From a blank page: the three wall layers in order, why the pericardium is not one of them, which valve has three cusps and when it closes, and which chest region sits between the two pleural cavities.',
    sourceRefs: [{ ref: 'hss.1.2', location: 'Cardiopulmonary system and associated structures' }, { ref: 'hss.1.1', location: 'p12 "Myocardium is the muscular wall" of the heart forming the four chambers; p8 the fibrous pericardium as a dense collagen sac that stabilises the heart in the mediastinum' }, { ref: 'hss.manual1920', location: 'Submodule 1.2 guiding questions, p.19' }, { ref: 'hss.revans', location: 'Module 1.2 answers' }],
  },
  {
    id: 'hss2011-m1-lungs-airway',
    subject: 'HSS2011', unit: 'hss.m1', type: 'definition',
    title: 'Pleura, lung surfaces and the upper airway',
    tags: ['thorax'],
    lesson: {
      explanation: 'The visceral pleura covers the surface of the lungs; the parietal pleura lines the thoracic cavity. The hilum of the lung is on the mediastinal surface. Type II pneumocytes produce pulmonary surfactant in the alveoli. Among the laryngeal cartilages, the thyroid cartilage is the largest, and the epiglottis is the structure most important in keeping food out of the trachea. Bronchial arteries supply oxygenated blood to the lungs and bronchi themselves.',
      keyFacts: [
        'Visceral pleura covers the lung surface; parietal pleura lines the thoracic cavity.',
        'The hilum of the lung is on the mediastinal surface.',
        'Type II pneumocytes produce pulmonary surfactant.',
        'Thyroid cartilage is the largest laryngeal cartilage.',
        'The epiglottis is most important in keeping food out of the trachea.',
        'Bronchial arteries supply the lung tissue itself.',
        'The main muscles of forced expiration include the diaphragm and external intercostal muscles.',
      ],
      prerequisites: ['hss2011-m1-heart-wall-valves'],
      examples: [],
    },
    memory: {
      wordOrigin: 'Viscus means an internal organ, so visceral pleura is the layer stuck to the organ. Paries means a wall, so parietal pleura lines the wall.',
      comparison: 'Bronchial arteries feed the lung tissue; pulmonary arteries bring blood to be oxygenated. One is plumbing for the organ, the other is cargo passing through.',
      visualCue: 'Picture pushing your fist into a balloon: your fist is the lung, the layer touching it is visceral, the outer layer is parietal, and the thin gap between is the pleural cavity.',
    },
    practice: [
      { type: 'mcq', prompt: 'Visceral pleura can be found ____________.', options: ['Lining the surface of the thoracic cavity', 'Covering the surface of the lungs', 'Attached to the diaphragm', 'None of the above'], answer: 1,
        explanation: 'Model answer B. Visceral pleura covers the lung; the parietal layer lines the cavity and covers the diaphragm.',
        src: { ref: 'hss.revans', location: 'Module 1.1, MCQ 1' } },
      { type: 'mcq', prompt: 'The cells that produce pulmonary surfactant in the alveoli are the:', options: ['Alveolar macrophages', 'Squamous epithelial cells', 'Type II pneumocytes', 'Goblet cells'], answer: 2,
        explanation: 'Model answer C. Alveolar macrophages clear debris; type II pneumocytes make surfactant.',
        src: { ref: 'hss.revans', location: 'Module 1.1, MCQ 2' } },
      { type: 'mcq', prompt: 'The hilum of the lung is located on the ___________.', options: ['Cardiac notch', 'Mediastinal surface', 'Costal surface', 'Base of the lung'], answer: 1,
        explanation: 'Model answer B. The hilum faces the mediastinum, which is where the root structures enter and leave.',
        src: { ref: 'hss.revans', location: 'Module 1.1, MCQ 3' } },
      { type: 'mcq', prompt: 'Which of the following is most important in keeping food out of the trachea?', options: ['Extrinsic muscles of the larynx', 'Glottis', 'Epiglottis', 'Soft palate'], answer: 2,
        explanation: 'Model answer C. The epiglottis folds over the laryngeal inlet during swallowing.',
        src: { ref: 'hss.revans', location: 'Module 1.1, MCQ 5' } },
      { type: 'cloze', prompt: 'The artery that supplies oxygenated blood to the lungs and bronchi is called the ______.', accept: ['bronchial artery', 'bronchial arteries', 'bronchial'],
        explanation: 'Model answer: bronchial arteries. They nourish lung tissue, unlike the pulmonary arteries which carry blood for gas exchange.',
        src: { ref: 'hss.revans', location: 'Module 1.1, Fill-in-blanks 5' } },
    ],
    application: [
      { type: 'scenario', prompt: 'Why does the lung need bronchial arteries at all when it already receives the entire output of the right ventricle?',
        model: 'The pulmonary arteries carry deoxygenated blood that is passing through the lung to be oxygenated — that blood is cargo, not supply. The lung tissue itself, including the bronchial walls, needs its own oxygenated supply, and that is what the bronchial arteries provide.',
        rubric: ['Distinguishes blood passing through from blood supplying the tissue', 'Names the bronchial arteries as the tissue supply'] },
    ],
    commonMistakes: [
      'Swapping visceral and parietal pleura.',
      'Assuming the pulmonary arteries nourish the lung tissue.',
    ],
    skills: [
      'Visceral versus parietal is cling-versus-line, and the prefixes say so: viscus means internal organ (visceral pleura is stuck to the lung), paries means wall (parietal pleura lines the cavity and the diaphragm). The word carries the answer before the options are read.',
      'The lung runs two blood supplies for two jobs: pulmonary arteries bring deoxygenated cargo for gas exchange, bronchial arteries feed the lung tissue itself. That is why receiving the entire right-ventricle output does not spare the lung needing its own supply — the blood flowing through an organ is not the blood nourishing it.',
      'The hilum sits on the mediastinal surface because that is where the root structures enter and leave — the lung\'s plumbing faces its mediastinum, not its ribs.',
    ],
    selfCheck: 'From a blank page: which pleura covers what, where the hilum sits and why, which cell makes surfactant, the structure that keeps food out of the trachea, and why bronchial arteries exist at all.',
    sourceRefs: [{ ref: 'hss.1.1', location: 'Cardiovascular system and lungs' }, { ref: 'hss.1.2', location: 'p36 "produce oily secretory surfactant that coats the" alveolar surfaces (Type II pneumocytes); p10 the bronchial arteries branch from the thoracic aorta to supply the lung tissue' }, { ref: 'hss.resp', location: 'p27 "Hilum -a groove that allows the primary bronchi, pulmonary" vessels, nerves and lymphatics to reach the lung; p26 the apex of each lung extends beyond the first rib' }, { ref: 'hss.manual1920', location: 'Submodule 1.1 guiding questions, p.17' }, { ref: 'hss.revans', location: 'Module 1.1 answers' }],
  },
  {
    id: 'hss2011-m2-cns-basics',
    subject: 'HSS2011', unit: 'hss.m2', type: 'definition',
    title: 'The spinal cord: grey matter, white matter and the tracts',
    tags: ['neuroanatomy', 'high-yield'],
    lesson: {
      explanation: 'The spinal cord is built from two tissues. Grey matter contains neuron cell bodies, dendrites, synapses and only proximal, largely unmyelinated axons; it is where synaptic integration happens. In the cord the grey matter is arranged centrally and projects into a posterior (dorsal) horn and an anterior (ventral) horn — the dorsal horn receives incoming sensory signals, the anterior horn holds the motor neuron cell bodies. White matter surrounds the grey matter and consists of myelinated axons gathered into tracts, also called fasciculi; a tract is a bundle of axons in the CNS that carries information from place to place. Ascending tracts carry sensory information toward the brain — pain, temperature, coarse and fine touch, vibration and proprioception; descending tracts carry motor commands down to the spinal cord. An ascending sensory pathway is a chain of three neurons — 1st-, 2nd- and 3rd-order — and it decussates (crosses the midline) in the 2nd-order neuron, so the left cerebral cortex ends up receiving sensation from the right side of the body and vice versa. A descending motor pathway uses two neurons: an upper motor neuron whose cell body is in the cortex, and a lower motor neuron in the brainstem or spinal cord. The majority of upper motor neuron axons decussate at the pyramids of the medulla oblongata, so the left cortex commands the right side of the body. This crossing is why a stroke that damages the motor centres of one side of the brain causes loss of function on the opposite side of the body.',
      plain: 'Grey matter is cell bodies and synapses, sitting centrally in the cord as a pair of horns; white matter is the myelinated tract fibres wrapped around it. Sensory (ascending) tracts run up to the brain; motor (descending) tracts run down. The sensory chain has three neurons and crosses over at the second one; the motor chain has two (upper in the cortex, lower in the brainstem/cord) and crosses in the medulla. Both crossings mean each half of the brain is wired to the opposite half of the body — which is why a one-sided stroke weakens the other side.',
      keyFacts: [
        'Grey matter = neuron cell bodies, dendrites, synapses, little myelin; the site of synaptic integration.',
        'White matter = myelinated axons bundled into tracts (fasciculi) that carry information from place to place.',
        'In the cord, grey matter is central and forms the dorsal (sensory-in) and ventral (motor-out) horns.',
        'Ascending tracts carry sensory information toward the brain; descending tracts carry motor commands to the cord.',
        'Ascending sensory pathway = 3 neurons (1st/2nd/3rd order); it decussates in the 2nd-order neuron.',
        'Descending motor pathway = 2 neurons: upper motor neuron in the cortex, lower motor neuron in the brainstem or spinal cord.',
        'Most upper motor neuron axons decussate at the pyramids of the medulla oblongata.',
        'Because both pathways cross, a stroke on one side of the brain causes deficit on the opposite side of the body.',
        'Afferent = toward the CNS (sensory); efferent = away from the CNS (motor).',
      ],
      prerequisites: [],
      examples: ['Mr Law’s stroke blocked his LEFT middle cerebral artery and left him unable to move the RIGHT side of his body — the descending motor tract had already crossed at the medullary pyramids.'],
    },
    memory: {
      mnemonic: 'Ascending = Afferent = Arriving sensation; both point toward the brain. Descending = motor commands Departing.',
      comparison: 'Sensory chain: 3 neurons, crosses at neuron 2. Motor chain: 2 neurons, crosses at the medullary pyramids. Either way, one side of the brain ends up serving the opposite side of the body.',
      chunking: 'Cross-section of the cord: grey in the middle (an H of cell bodies), white on the outside (the myelinated tracts). Brain is the reverse — grey cortex outside.',
    },
    practice: [
      { type: 'mcq', prompt: 'The ventral (anterior) root of a spinal nerve transmits ________ information ________ the spinal cord.', options: ['Sensory; toward', 'Sensory; away from', 'Motor; toward', 'Motor; away from'], answer: 3,
        explanation: 'Model answer D. Motor fibres leave through the ventral root from the anterior horn; sensory fibres enter through the dorsal root.',
        src: { ref: 'hss.revans', location: 'Module 2.1, MCQ 1' } },
      { type: 'mcq', prompt: 'Ascending tracts of the spinal cord carry:', options: ['Motor commands toward the spinal cord', 'Sensory information toward the brain', 'Motor commands toward the brain', 'Sensory information toward the effectors'], answer: 1,
        explanation: 'Ascending tracts carry sensory information toward the brain; descending tracts carry motor commands to the cord.',
        src: { ref: 'hss.2.2', location: 'p5 Ascending and Descending Tracts' } },
      { type: 'cloze', prompt: 'In an ascending sensory pathway the axon crosses the midline (decussates) in the ______-order neuron.', accept: ['2nd', 'second', 'second-order', '2nd-order', 'two'],
        explanation: 'Decussation occurs in the 2nd (second-order) neuron, so the left cortex receives sensation from the right body.',
        src: { ref: 'hss.mooc3', location: 'p2 Reflexes, Ascending and Descending Tracts' } },
      { type: 'mcq', prompt: 'The majority of upper motor neuron axons of the descending tracts decussate at the:', options: ['Pyramids of the medulla oblongata', 'Cerebral peduncles of the midbrain', 'Basis pontis', 'Anterior horn of the spinal cord'], answer: 0,
        explanation: 'Model answer: the pyramids of the medulla oblongata — the pyramidal (motor) decussation.',
        src: { ref: 'hss.fib5yr', location: 'Module 3 stroke case, p13' } },
      { type: 'cloze', prompt: 'A stroke that damages the motor centres of the left side of the brain causes loss of function on the ______ side of the body.', accept: ['right', 'opposite', 'contralateral'],
        explanation: 'The descending tract has already crossed, so a left-brain lesion produces a right-sided deficit.',
        src: { ref: 'hss.mooc3', location: 'p4 Descending Tracts' } },
      { type: 'cloze', prompt: 'Sensory neurons that carry signals toward the central nervous system are described as ______.', accept: ['afferent'],
        explanation: 'Model answer: afferent. Efferent fibres carry motor signals away from the CNS.',
        src: { ref: 'hss.revans', location: 'Module 2.1, Fill-in-blanks 4' } },
    ],
    application: [
      { type: 'scenario', prompt: 'A patient has a right-sided weakness of the arm and leg after a stroke. Reasoning only from the tracts, on which side of the brain is the lesion, and why?',
        model: 'On the left. Descending motor commands travel from the upper motor neuron in the cortex and the majority decussate at the pyramids of the medulla oblongata, so the left cortex controls the right side of the body. A right-sided motor deficit therefore localises to the left cerebral hemisphere.',
        rubric: ['States the lesion is on the left', 'Names the upper motor neuron / descending tract', 'Explains the decussation at the medullary pyramids'] },
    ],
    commonMistakes: [
      'Saying the sensory pathway crosses in the 1st- or 3rd-order neuron — it is the 2nd-order neuron that decussates.',
      'Placing the motor (pyramidal) decussation in the spinal cord or pons rather than the pyramids of the medulla.',
      'Treating the outer rim of the cord as grey matter because it is superficial — in the cord the grey matter is central and the white matter is the outer layer.',
    ],
    skills: [
      'Afferent and ascending both mean "toward the brain / sensory"; efferent and descending both mean "away, motor". The revision blank just wants the word afferent for a sensory neuron heading to the CNS.',
      'Count the neurons to place the crossing: a 3-neuron sensory chain crosses at neuron 2; a 2-neuron motor chain (upper + lower) crosses at the medullary pyramids. Both leave the cortex serving the opposite half of the body.',
      'Every "stroke on one side, deficit on the other side" question is just the decussation restated. Name where the tract crosses and the side follows automatically.',
    ],
    selfCheck: 'From a blank page: what grey matter and white matter each contain, where each sits in the cord, which tracts ascend and which descend, how many neurons each pathway uses and where it decussates, and why a left-brain stroke weakens the right side.',
    visuals: [
      { model: { layer: 'nervous', meshes: ['Anterior horn of spinal cord', 'Posterior horn of spinal cord', 'White matter of spinal cord'], label: 'Grey and white matter of the spinal cord', caption: 'The central horns are grey matter — cell bodies and synapses; the surrounding rim is white matter — the myelinated ascending and descending tracts.' } },
      { schematic: 'nervousDivisions' },
      { gen: true },
    ],
    sourceRefs: [
      { ref: 'hss.2.2', location: 'p4 "Bundles of axons (tracts)" — white matter; grey matter has somas, dendrites, proximal axons and synaptic integration' },
      { ref: 'hss.2.2', location: 'p5 "Ascending tracts carry sensory information toward the brain" and descending tracts carry motor commands to the spinal cord' },
      { ref: 'hss.2.2', location: 'p11 "Neuron cell bodies" in grey matter; white matter is "Tracts – bundles of axons" and "Myelinated"' },
      { ref: 'hss.mooc3', location: 'p2 "3 neurons: 1st, 2nd, 3rd neuron" and decussation "in 2nd neuron"' },
      { ref: 'hss.mooc3', location: 'p2 ascending tracts carry "pain, temperature, coarse touch, fine touch, vibration, proprioception"' },
      { ref: 'hss.mooc3', location: 'p4 "Upper Motor Neuron: in the cortex", "Lower Motor Neuron: in the brainstem or spinal cord"; stroke damages one side of the brain, function lost on the opposite side of the body' },
      { ref: 'hss.mooc3', location: 'p6 dorsal root "carries sensory signals to dorsal horn"; ventral root "receives motor signals from ventral horn"' },
      { ref: 'hss.fib5yr', location: 'p13 "decussate at the pyramids of the medulla oblongata" (Mr Law stroke case)' },
      { ref: 'hss.revans', location: 'Module 2.1 Fill-in-blanks 4 "Afferent"' },
    ],
  },
  {
    id: 'hss2011-m2-brain-regions',
    subject: 'HSS2011', unit: 'hss.m2', type: 'definition',
    title: 'Brain regions, glia and CSF drainage',
    tags: ['neuroanatomy'],
    lesson: {
      explanation: 'Blood and cerebrospinal fluid drain from the brain into the dural sinuses. The thalamus forms the walls of the diencephalon around the third ventricle. In the peripheral nervous system it is the Schwann cells that provide the myelin sheath, whereas oligodendrocytes do that job in the CNS. The parietal lobe is primarily sensory. Wernicke’s area is not a limbic structure — hippocampus, cingulate gyrus and amygdala are. The interventricular foramen connects the lateral ventricle to the third ventricle, the corpus callosum is the principal commissural tract linking the hemispheres, the trigeminal nerve controls the muscles of mastication, the vagus is the longest cranial nerve, and the reticular formation is the loosely organised web of grey matter running vertically through all levels of the brainstem.',
      plain: 'A grab-bag of separate brain facts, each likely to be tested on its own, so treat this as a checklist rather than one story: CSF and blood drain into the dural sinuses; the thalamus walls the diencephalon around the third ventricle; Schwann cells myelinate nerves in the PNS but oligodendrocytes do it in the CNS; the parietal lobe is sensory; Wernicke’s area is not limbic (hippocampus, cingulate gyrus and amygdala are); the trigeminal nerve drives the chewing muscles; and the vagus is the longest cranial nerve.',
      keyFacts: [
        'Blood and CSF drain from the brain into the dural sinuses.',
        'The thalamus forms the walls of the diencephalon around the third ventricle.',
        'Schwann cells myelinate in the PNS; oligodendrocytes myelinate in the CNS.',
        'The parietal lobe is primarily sensory.',
        'Limbic structures include hippocampus, cingulate gyrus and amygdala — Wernicke’s area is not one.',
        'Interventricular foramen: lateral ventricle → third ventricle.',
        'Corpus callosum: principal commissural tract between the hemispheres.',
        'Trigeminal nerve → muscles of mastication. Vagus nerve → the longest cranial nerve.',
        'Reticular formation: grey matter running vertically through all levels of the brainstem.',
      ],
      prerequisites: ['hss2011-m2-cns-basics'],
      examples: [],
    },
    memory: {
      comparison: 'Schwann for the PNS, Oligodendrocyte for the CNS. One Schwann cell wraps one segment out in the periphery; one oligodendrocyte reaches several axons centrally.',
      wordOrigin: 'Commissure means a joining. The corpus callosum is literally the "tough body" that joins the two hemispheres.',
      firstLetter: 'Limbic trio to remember: Hippocampus, Amygdala, Cingulate gyrus. Wernicke’s area is language cortex and does not belong.',
    },
    practice: [
      { type: 'mcq', prompt: 'Blood and cerebrospinal fluid drain from the brain in the ______.', options: ['Ventricles', 'Subarachnoid space', 'Dural sinuses', 'Epidural space'], answer: 2,
        explanation: 'Model answer C. The dural venous sinuses are the drainage route out of the cranial cavity.',
        src: { ref: 'hss.revans', location: 'Module 2.3, MCQ 1' } },
      { type: 'mcq', prompt: 'Which of the following cells provide the myelin sheath for neurons in the PNS?', options: ['Astrocytes', 'Oligodendrocytes', 'Microglia', 'Schwann cells'], answer: 3,
        explanation: 'Model answer D. Schwann cells myelinate peripheral axons; oligodendrocytes do the same job centrally.',
        src: { ref: 'hss.revans', location: 'Module 2.3, MCQ 3' } },
      { type: 'mcq', prompt: 'All of the following are structures of the limbic system except the:', options: ['Hippocampus', 'Cingulate gyrus', 'Wernicke’s area', 'Amygdala'], answer: 2,
        explanation: 'Model answer C. Wernicke’s area is a language region of the cerebral cortex, not part of the limbic system.',
        src: { ref: 'hss.revans', location: 'Module 2.3, MCQ 5' } },
      { type: 'cloze', prompt: 'The ______ ______ connects the lateral ventricle to the third ventricle.', accept: ['interventricular foramen'],
        explanation: 'Model answer: interventricular foramen.',
        src: { ref: 'hss.revans', location: 'Module 2.3, Fill-in-blanks 2' } },
      { type: 'cloze', prompt: '______ controls movement of the muscles of mastication.', accept: ['trigeminal nerve', 'trigeminal', 'cn v', 'trigeminal nerve (cn v)'],
        explanation: 'Model answer: trigeminal nerve. Note the facial nerve (CN VII) supplies facial expression instead, including frontalis.',
        src: { ref: 'hss.revans', location: 'Module 2.3, Fill-in-blanks 4' } },
    ],
    application: [
      { type: 'scenario', prompt: 'A patient cannot chew but their facial expression is normal. Which cranial nerve is affected, and which one is intact?',
        model: 'The trigeminal nerve is affected, because it controls the muscles of mastication. The facial nerve is intact — it innervates the muscles of facial expression, including frontalis, which is a separate answer in the same module.',
        rubric: ['Names trigeminal for mastication', 'Names facial for expression', 'Keeps the two functions apart'] },
    ],
    commonMistakes: [
      'Mixing up trigeminal (chewing) and facial (expression).',
      'Putting Wernicke’s area in the limbic system because it sounds anatomical rather than cortical.',
    ],
    skills: [
      'The myelin question is a system question before it is a cell question: Schwann only ever means peripheral, oligodendrocyte only ever means central. Same job, different postal address — and the distractor is always the cell that does the job in the other system.',
      'Wernicke\'s area sounds anatomical enough to belong with the limbic structures and does not: hippocampus, cingulate gyrus and amygdala are the limbic set, while Wernicke\'s is language cortex. Sounding like a brain region is not membership of a system.',
      'Trigeminal chews, facial makes faces. A patient who cannot chew but has normal expression localises to the trigeminal nerve with the facial intact — the two functions share a face and not a nerve.',
    ],
    selfCheck: 'From a blank page: the three limbic structures plus the cortical area wrongly lumped with them, which nerve chews and which one makes faces, and where blood and CSF drain from the brain.',
    sourceRefs: [{ ref: 'hss.2.3', location: 'Neuroanatomy lecture; p30 "CSF is absorbed into the venous circulation at the arachnoid granulations"; p42 the vagus as the longest cranial nerve' }, { ref: 'hss.manual1920', location: 'Submodule 2.3 revision exercises, p.31–32' }, { ref: 'hss.revans', location: 'Module 2.3 answers' }],
  },
  {
    id: 'hss2011-m3-digestive',
    subject: 'HSS2011', unit: 'hss.m3', type: 'definition',
    title: 'Digestive tract — regions, layers and the portal route',
    tags: ['abdomen', 'high-yield'],
    lesson: {
      explanation: 'Of the parts of the gut, the ileum is the longest. Gastric pits sit in the mucosa of the stomach wall, and the stomach uniquely has a third muscle layer, the oblique muscle, overlying the mucosa. Teniae coli are found in the colon. The parotid is the largest salivary gland. A hepatic lobule contains six hepatic triads. Most of the digestive tract is lined by simple columnar epithelium. The cardiac orifice is where the oesophagus enters the stomach, the duodenojejunal junction is the boundary between duodenum and jejunum, and nutrients absorbed in the gut travel to the liver through the hepatic portal vein.',
      keyFacts: [
        'Longest part of the gut: ileum.',
        'Gastric pits are in the mucosa.',
        'The stomach has a third, oblique muscle layer overlying the mucosa.',
        'Teniae coli: colon.',
        'Largest salivary gland: parotid.',
        'Six hepatic triads per hepatic lobule.',
        'Most of the digestive tract is lined by simple columnar epithelium.',
        'Cardiac orifice = oesophagus into stomach. Duodenojejunal junction = duodenum into jejunum.',
        'Nutrients travel from gut to liver through the hepatic portal vein; venous return from the liver to the heart is by the hepatic vein.',
      ],
      prerequisites: [],
      examples: [],
    },
    memory: {
      comparison: 'Hepatic portal vein goes INTO the liver carrying gut nutrients. Hepatic vein comes OUT of the liver to the heart. Portal means a gateway in; drop the word "portal" and you are heading out.',
      wordOrigin: 'Taenia is Latin for a ribbon or tape — teniae coli are the three ribbons of longitudinal muscle on the colon.',
      location: 'Walk the tube and name the door at each junction: cardiac orifice into the stomach, pylorus out of it, duodenojejunal junction into the jejunum.',
    },
    practice: [
      { type: 'mcq', prompt: 'Which part of the gut has the longest length?', options: ['Oesophagus', 'Duodenum', 'Jejunum', 'Ileum'], answer: 3,
        explanation: 'Model answer D. The ileum is the longest segment.',
        src: { ref: 'hss.revans', location: 'Module 3.1, MCQ 1' } },
      { type: 'mcq', prompt: 'Where are gastric pits located within the stomach wall?', options: ['Mucosa', 'Submucosa', 'Muscularis externa', 'Serosa'], answer: 0,
        explanation: 'Model answer A. Gastric pits are invaginations of the mucosal epithelium.',
        src: { ref: 'hss.revans', location: 'Module 3.1, MCQ 2' } },
      { type: 'mcq', prompt: 'Teniae coli are found in which part of the digestive tract?', options: ['Jejunum', 'Cecum', 'Colon', 'Rectum'], answer: 2,
        explanation: 'Model answer C. Teniae coli are the longitudinal muscle bands of the colon.',
        src: { ref: 'hss.revans', location: 'Module 3.1, MCQ 3' } },
      { type: 'mcq', prompt: 'The largest salivary gland is:', options: ['Submandibular gland', 'Parotid gland', 'Sublingual gland', 'Minor salivary gland'], answer: 1,
        explanation: 'Model answer B. The parotid is the largest of the three paired salivary glands.',
        src: { ref: 'hss.revans', location: 'Module 3.1, MCQ 4' } },
      { type: 'cloze', prompt: 'Nutrients absorbed in the gut are transported to the liver through the ______.', accept: ['hepatic portal vein', 'portal vein', 'hepatic portal'],
        explanation: 'Model answer: hepatic portal vein. Do not confuse it with the hepatic vein, which drains the liver to the heart.',
        src: { ref: 'hss.revans', location: 'Module 3.1, Fill-in-blanks 5' } },
      { type: 'mcq', prompt: 'The venous return from the liver to the heart is by way of ________.', options: ['Portal vein', 'Hepatic portal vein', 'Hepatic vein', 'Superior mesenteric vein'], answer: 2,
        explanation: 'Model answer C. The hepatic vein carries blood out of the liver toward the inferior vena cava; the hepatic portal vein brings blood in from the gut.',
        src: { ref: 'hss.revans', location: 'Module 3.3, MCQ 5' } },
    ],
    application: [
      { type: 'scenario', prompt: 'The Study Manual describes hepatic circulation as nutrients being carried to the liver for metabolism before reaching the body systems. Trace that path by vessel name, in and out.',
        model: 'Nutrients absorbed in the gut enter the hepatic portal vein, which carries them into the liver for metabolism. After processing, blood leaves the liver by the hepatic vein into the inferior vena cava and so on to the heart and the rest of the body.',
        rubric: ['Names hepatic portal vein inbound', 'Names hepatic vein outbound', 'Places metabolism in the liver between the two'] },
    ],
    commonMistakes: [
      'Using "hepatic vein" and "hepatic portal vein" interchangeably. They run in opposite directions.',
      'Placing gastric pits in the submucosa.',
    ],
    skills: [
      'Hepatic portal vein and hepatic vein differ by one word and run in opposite directions: portal means gateway in — gut nutrients to the liver for metabolism — and the hepatic vein carries blood out to the heart. They are one circuit read both ways, so naming either reconstructs the other.',
      'Gastric pits are invaginations of the mucosa, and submucosa is the trap answer precisely because pits sound deep. The layer is where the epithelium dips, not where the wall thickens.',
      'The stomach\'s third, oblique muscle layer is unique to it along the tract — extra churning needs extra muscle — while the colon\'s teniae coli are its own muscle specialisation, three ribbons of longitudinal muscle. Muscle architecture marks both ends of the gut.',
    ],
    selfCheck: 'From a blank page: the longest gut segment, where gastric pits sit in the stomach wall, the stomach’s extra muscle layer, the largest salivary gland, and the vessel-by-vessel nutrient route to and from the liver.',
    sourceRefs: [{ ref: 'hss.3.1', location: 'Digestive system lecture; p12 "Oblique muscle layer" — the stomach\'s third muscularis layer, over the mucosa' }, { ref: 'hss.3.1.2019', location: 'p28 "Muscularis externa has three thickened longitudinal bands of smooth muscle fibers" (taeniae coli, forming haustra); p30 foregut / midgut / hindgut supplied by the coeliac trunk / SMA / IMA; p31 the hepatic portal vein as a portal system' }, { ref: 'hss.manual1920', location: 'Module 3.1 revision exercises, p.33; Module 3.3 p.37' }, { ref: 'hss.revans', location: 'Module 3.1 and 3.3 answers' }],
  },
  {
    id: 'hss2011-m3-urogenital-pelvis',
    subject: 'HSS2011', unit: 'hss.m3', type: 'definition',
    title: 'Urinary tract, pelvis and abdominal landmarks',
    tags: ['abdomen', 'pelvis'],
    lesson: {
      explanation: 'The arcuate arteries arch along the boundary between the cortex and medulla of the kidney. The cervical canal is the passageway between the internal os and the external os. The detrusor is the powerful muscle in the muscularis layer of the bladder wall, and a calyx is the cup-shaped drain receiving urine discharged from a renal papilla. Regionally, the pylorus of the stomach lies at the level of L1, the oesophagus pierces the diaphragm at the level of T10, the fundus is the most superior part of the stomach, the ureters penetrate the posterior wall of the bladder, and the posterior abdominal wall is mainly formed by psoas, quadratus lumborum and erector spinae. The uterine artery, unlike the suprarenal, testicular and ovarian arteries, does not originate from the aorta. The female pelvis is not more massive than the male pelvis — it is lighter, with an obtuse subpubic arch and an oval shape.',
      plain: 'Another list of standalone facts to learn one at a time: the arcuate arteries run along the kidney’s cortex–medulla border; the detrusor is the bladder wall’s strong muscle; a calyx drains urine from a renal papilla; the pylorus sits at L1 and the oesophagus pierces the diaphragm at T10; the uterine artery does not come off the aorta like the suprarenal, testicular and ovarian arteries do; and the female pelvis is actually lighter than the male pelvis, not more massive.',
      keyFacts: [
        'Arcuate arteries arch at the corticomedullary boundary of the kidney.',
        'Cervical canal runs between the internal os and external os.',
        'Detrusor = bladder wall muscle. Calyx = cup receiving urine from a renal papilla.',
        'Pylorus at L1; oesophagus pierces the diaphragm at T10.',
        'Fundus is the most superior part of the stomach.',
        'Ureters enter the posterior wall of the bladder.',
        'Posterior abdominal wall: psoas, quadratus lumborum, erector spinae.',
        'The uterine artery does not arise from the aorta.',
        'Ureteric stones commonly obstruct at the ureteropelvic junction, at the crossing of the external iliac vessels / pelvic brim, and where the ureter enters the bladder.',
      ],
      prerequisites: ['hss2011-m3-digestive'],
      examples: [],
    },
    memory: {
      chunking: 'Vertebral levels worth owning: T10 oesophageal hiatus, L1 pylorus. Two numbers, two doorways.',
      mnemonic: 'Three narrow points where a stone sticks: where the ureter starts, where it crosses the pelvic brim, and where it ends. Start, cross, finish.',
      wordOrigin: 'Detrusor comes from the Latin for "to push down" — the muscle that pushes urine out.',
    },
    practice: [
      { type: 'mcq', prompt: 'The arterial vessel arching along the boundary between the cortex and medulla of the kidney is:', options: ['Interlobar arteries', 'Arcuate arteries', 'Cortical radiate arteries', 'Afferent arterioles'], answer: 1,
        explanation: 'Model answer B. "Arcuate" means arched, which is exactly what they do at the corticomedullary junction.',
        src: { ref: 'hss.revans', location: 'Module 3.2, MCQ 1' } },
      { type: 'mcq', prompt: 'The pylorus of the stomach is at the level of ______.', options: ['Xiphoid process', 'L1', 'L3', 'L5'], answer: 1,
        explanation: 'Model answer B. L1 is the transpyloric level.',
        src: { ref: 'hss.revans', location: 'Module 3.3, MCQ 1' } },
      { type: 'mcq', prompt: 'Which statement is FALSE about the female pelvis?', options: ['It is more massive than the male pelvis', 'The subpubic arch is in an obtuse angle', 'It is oval in shape', 'The ischial spine is less pointed into the outlet'], answer: 0,
        explanation: 'Model answer A. The female pelvis is the lighter of the two; the other three statements are true of it.',
        src: { ref: 'hss.revans', location: 'Module 3.3, MCQ 3' } },
      { type: 'mcq', prompt: 'The ________ does not originate from the aorta.', options: ['Suprarenal artery', 'Testicular artery', 'Uterine artery', 'Ovarian artery'], answer: 2,
        explanation: 'Model answer C. Suprarenal, testicular and ovarian arteries all come off the aorta; the uterine artery does not.',
        src: { ref: 'hss.revans', location: 'Module 3.3, MCQ 4' } },
      { type: 'cloze', prompt: 'The oesophagus pierces through the diaphragm at the level of ______.', accept: ['t10', 'the 10th thoracic vertebra', '10th thoracic vertebra', 'the 10th thoracic vertebra (t10)'],
        explanation: 'Model answer: the 10th thoracic vertebra (T10).',
        src: { ref: 'hss.revans', location: 'Module 3.3, Fill-in-blanks 2' } },
      { type: 'cloze', prompt: 'The posterior abdominal wall is mainly formed by the ______, ______ and ______ muscles.', accept: ['psoas; quadratus lumborum; erector spinae', 'psoas, quadratus lumborum, erector spinae'],
        explanation: 'Model answer: psoas, quadratus lumborum, erector spinae.',
        src: { ref: 'hss.revans', location: 'Module 3.3, Fill-in-blanks 1' } },
    ],
    application: [
      { type: 'scenario', prompt: 'Name the three sites where a ureteric stone typically gets stuck, and say what they have in common.',
        model: 'The ureteropelvic junction, where the ureter crosses the external iliac vessels at the pelvic brim, and where the ureter enters the urinary bladder. All three are natural narrowings along the ureter’s course — the tube is not uniformly wide.',
        rubric: ['Names all three sites', 'Identifies them as points of narrowing'] },
    ],
    commonMistakes: [
      'Assuming the female pelvis is the heavier one because it must carry a pregnancy — it is the lighter, broader one.',
      'Assuming every abdominal artery arises from the aorta.',
    ],
    skills: [
      'The intuition that the female pelvis must be the heavier one because it carries a pregnancy runs exactly backwards: it is the lighter pelvis — broader, oval, with an obtuse subpubic arch. The sex difference question is built on that reversal.',
      'A ureteric stone lodges where the tube narrows: the ureteropelvic junction, the crossing of the external iliac vessels at the pelvic brim, and the entry into the bladder. Three sites, one mechanism — the ureter is not uniformly wide, and its narrowings are its whole stone geography.',
      'The uterine artery is the exception its list exists to hide: suprarenal, testicular and ovarian arteries all arise from the aorta, and it does not. "Every abdominal artery comes off the aorta" is the assumption the MCQ rewards for dropping.',
    ],
    selfCheck: 'From a blank page: the three sites a ureteric stone sticks and what they share, both vertebral levels, the bladder’s wall muscle, and the three muscles forming the posterior abdominal wall.',
    sourceRefs: [{ ref: 'hss.3.2', location: 'Urogenital system lecture; p6 "4-5 minor calyces are merged to form a" major calyx; p14 the ureters are retroperitoneal, piercing the posterior bladder wall at an oblique angle' }, { ref: 'hss.3.3', location: 'Regional anatomy of the abdominopelvic region' }, { ref: 'hss.3.3.2019', location: 'p5 transpyloric plane at L1 and "Transtubercular plane (L5)"' }, { ref: 'hss.3.3.2019', location: 'p14 "oesophageal hiatus T10 oesophagus, vagus nerves"; caval hiatus T8 and aortic hiatus T12' }, { ref: 'hss.revans', location: 'Module 3.2 and 3.3 answers; More exercises Module 3' }],
  },
  /* ------------------------------------------------------------------ *
   * The 2026 material — hss.msk.2026, Module 1 Week 1. A New source file
   * teaching the histology and muscle-organisation half of the
   * musculoskeletal module, which no older HSS2011 file here states.
   *
   * A companion item, "What HSS2011 is, and how it is marked", used to sit
   * here and was DELETED. It was course logistics wearing a lesson's
   * clothes: module titles, assessment weights and where Canvas lives are
   * not anatomy, they are not revisable, and answering a flashcard about
   * the marking scheme teaches nothing. All of it is now in the Course tab,
   * sourced and side by side with the timetable, which is where you would
   * actually look for it. The orientation deck hss.w1.2026 is still cited
   * by outputs/schedule.js.
   * ------------------------------------------------------------------ */
  {
    id: 'hss2011-msk-bone-histology',
    subject: 'HSS2011', unit: 'hss.m4', type: 'definition',
    title: 'What bone is made of — matrix and the four cell types',
    tags: ['musculoskeletal', 'high-yield'],
    lesson: {
      explanation: 'Bone is a matrix with cells in it. Two thirds of the matrix is calcium hydroxyapatite, composed mainly of Ca3(PO4)2, which is strong but inflexible; the remaining third is collagen fibres, which are tough and flexible, together with ground substance. Four cell types live in it. Osteocytes are mature bone cells located in lacunae, with small channels called canaliculi interconnecting the lacunae and acting as the route for nutrient and waste diffusion. Osteoblasts are immature bone cells sitting on the outer bone surface and the inner bone cavities; they release the organic components of the matrix and are able to form osteocytes. Osteoclasts do the opposite — they dissolve bone matrix and release minerals. Osteoprogenitor cells are the stem cells that give rise to osteoblasts and other cell types.',
      plain: 'Two ingredients doing two jobs: mineral for hardness, collagen for give. Take the collagen away and bone shatters; take the mineral away and it bends. Then four cells — one that builds (osteoblast), one that has been built in and now lives there (osteocyte), one that demolishes (osteoclast), and the stem cell that makes more builders (osteoprogenitor).',
      keyFacts: [
        'Matrix is 2/3 calcium hydroxyapatite, mainly Ca3(PO4)2 — strong but inflexible.',
        'Matrix is 1/3 collagen fibres — tough and flexible — plus ground substance.',
        'Osteocyte: mature bone cell in a lacuna; canaliculi interconnect the lacunae and carry nutrients and waste.',
        'Osteoblast: immature, on the outer surface and inner cavities; releases organic matrix; can form osteocytes.',
        'Osteoclast: dissolves bone matrix and releases minerals.',
        'Osteoprogenitor: the stem cell giving rise to osteoblasts and other cell types.',
        'Compact bone is a dense solid mass forming the outer surface layer; spongy bone is lighter web-like trabeculae forming the inner core.',
      ],
      prerequisites: [],
      examples: [],
    },
    memory: {
      wordOrigin: '-blast is a builder, -clast is a breaker (as in iconoclast, one who smashes images), -cyte is simply a cell. Blast builds, clast cracks.',
      comparison: 'Osteoblast and osteoclast differ by one letter and do opposite jobs, which is exactly why the exam uses them. Build = B. Crack = C.',
      visualCue: 'Lacunae are little lakes with canaliculi as the canals between them. Nothing reaches an osteocyte except along a canal.',
    },
    practice: [
      { type: 'mcq', prompt: 'Which bone cell dissolves bone matrix and releases its minerals?', options: ['Osteocyte', 'Osteoblast', 'Osteoclast', 'Osteoprogenitor cell'], answer: 2,
        explanation: 'Osteoclasts dissolve matrix. Osteoblasts release the organic components of matrix; osteocytes are the mature cells already embedded in it.',
        src: { ref: 'hss.msk.2026', location: 'p5 "Osteoclasts: dissolve bone matrix and release minerals"' } },
      { type: 'mcq', prompt: 'Roughly what proportion of bone matrix is calcium hydroxyapatite?', options: ['One third', 'One half', 'Two thirds', 'Nine tenths'], answer: 2,
        explanation: 'Two thirds mineral, one third collagen and ground substance.',
        src: { ref: 'hss.msk.2026', location: 'p5 "2/3: Calcium hydroxyapatite"' } },
      { type: 'cloze', prompt: 'Mature bone cells sit in small chambers called ______, interconnected by small channels called ______.', accept: ['lacunae; canaliculi', 'lacunae, canaliculi', 'lacunae and canaliculi'],
        explanation: 'Osteocytes occupy lacunae; canaliculi interconnect them and act as the route for nutrient and waste diffusion.',
        src: { ref: 'hss.msk.2026', location: 'p5 "Osteocytes: mature bone cells located in lacunae"' } },
      { type: 'matching', prompt: 'Match each bone cell to what it does.', pairs: [['Osteoblast', 'Releases the organic components of matrix'], ['Osteocyte', 'Mature cell resident in a lacuna'], ['Osteoclast', 'Dissolves matrix and releases minerals'], ['Osteoprogenitor cell', 'Stem cell giving rise to osteoblasts']],
        explanation: 'One builder, one resident, one demolisher, one stem cell.',
        src: { ref: 'hss.msk.2026', location: 'p5 "Osteoprojenitor cells: stem cells that can give rise to osteoblasts"' } },
      { type: 'explain', prompt: 'Why does bone need both calcium hydroxyapatite and collagen rather than more of whichever is stronger?',
        model: 'The mineral is strong but inflexible and the collagen is tough and flexible. A bone made only of mineral would resist compression but shatter under bending; one made only of collagen would bend without breaking but could not support weight. The composite gets both, which is what lets the skeleton be light enough for movement while strong and tough enough for support and protection.',
        rubric: ['Names mineral as strong but inflexible', 'Names collagen as tough and flexible', 'Explains the composite gets both properties'] },
    ],
    application: [
      { type: 'scenario', prompt: 'In a bone that is remodelling — being reshaped in response to load — which two cell types must both be active, and what would happen if only one were?',
        model: 'Osteoblasts and osteoclasts. Osteoclasts dissolve matrix and release its minerals while osteoblasts release new organic matrix, so remodelling is the two working in opposite directions in a controlled balance. If only osteoclasts worked, bone would be resorbed and lost; if only osteoblasts worked, new bone would be added without the old being cleared, so the bone could not be reshaped.',
        rubric: ['Names both osteoblast and osteoclast', 'States each one’s direction of action', 'Draws the consequence of losing either'] },
    ],
    commonMistakes: [
      'Swapping osteoblast and osteoclast — one letter, opposite jobs.',
      'Calling osteocytes the cells that build bone; they are the mature cells already sitting in the matrix.',
      'Forgetting the collagen third and describing bone as pure mineral.',
    ],
    skills: [
      'Bone is a composite and the exam question is usually about why: mineral gives compressive strength but shatters, collagen gives flexibility but cannot bear load. Any question of the form "why does bone contain X" is answered from which of those two properties X supplies.',
      'The suffix does the work across this whole family: -blast builds, -clast breaks, -cyte is the mature resident, and the progenitor is upstream of all of them. Reading the word is faster and safer than recalling the list.',
      'The canaliculi are not decoration. An osteocyte is walled into solid matrix, so the only route for nutrients in and waste out is that channel network — which is what lets bone be a living tissue at all.',
    ],
    selfCheck: 'From a blank page: the two matrix components with their proportions and properties, the four cell types with one job each, and why an osteocyte needs canaliculi.',
    sourceRefs: [
      { ref: 'hss.msk.2026', location: 'p5 "Osteocytes: mature bone cells located in lacunae"' },
      { ref: 'hss.msk.2026', location: 'p6 "Compact bone"' },
    ],
  },
  {
    id: 'hss2011-msk-bone-marrow',
    subject: 'HSS2011', unit: 'hss.m4', type: 'definition',
    title: 'Red and yellow bone marrow',
    tags: ['musculoskeletal'],
    lesson: {
      explanation: 'Bone marrow is found in the centre of most bones, in the spongy bone. Red bone marrow contains haematopoietic stem cells that can differentiate into red blood cells, white blood cells and platelets. It is present in all bones before the age of five and then gradually transforms into yellow bone marrow; in an adult it persists mainly in the central skeleton, but is also found in the ends of long bones. Yellow bone marrow is located in the cavities of long bones and contains adipose (fat) tissue along with mesenchymal stem cells that can develop into cartilage, bone, fat or muscle cells if needed.',
      plain: 'Two marrows, and which one you have depends on your age and on which bone. Red makes blood: a child has it everywhere, an adult keeps it mostly in the trunk and the ends of the long bones. Yellow is fat filling the long-bone cavities — but it is not inert, because the stem cells in it can still become cartilage, bone, fat or muscle when the body needs them.',
      keyFacts: [
        'Marrow sits in the centre of most bones, in the spongy bone.',
        'Red marrow: haematopoietic stem cells → red blood cells, white blood cells, platelets.',
        'Red marrow is in all bones before age 5, then gradually becomes yellow.',
        'In the adult, red marrow persists mainly in the central skeleton, and also in the ends of long bones.',
        'Yellow marrow: in the cavities of long bones, adipose tissue plus mesenchymal stem cells.',
        'Those mesenchymal stem cells can develop into cartilage, bone, fat or muscle cells.',
      ],
      prerequisites: ['hss2011-msk-bone-histology'],
      examples: [],
    },
    memory: {
      comparison: 'Red makes blood, yellow stores fat. The colour names the job.',
      chunking: 'Age five is the switch. Before it, red everywhere; after it, red retreats to the centre and the long-bone ends.',
      location: 'Asked where an adult still makes blood cells, answer with the central skeleton first — that is where red marrow persists.',
    },
    practice: [
      { type: 'mcq', prompt: 'Which cells does red bone marrow contain?', options: ['Mesenchymal stem cells', 'Haematopoietic stem cells', 'Osteoprogenitor cells', 'Adipocytes only'], answer: 1,
        explanation: 'Haematopoietic stem cells, which differentiate into red cells, white cells and platelets. Mesenchymal stem cells are the ones in yellow marrow.',
        src: { ref: 'hss.msk.2026', location: 'p7 "contains hematopoietic stem cells"' } },
      { type: 'mcq', prompt: 'Up to what age is red bone marrow present in all bones?', options: ['Age 2', 'Age 5', 'Age 12', 'Age 18'], answer: 1,
        explanation: 'Present in all bones before the age of 5, then gradually transforming into yellow marrow.',
        src: { ref: 'hss.msk.2026', location: 'p7 "Present in all bones before age of 5"' } },
      { type: 'cloze', prompt: 'Yellow bone marrow contains adipose tissue and ______ stem cells, which can develop into cartilage, bone, fat or muscle.', accept: ['mesenchymal'],
        explanation: 'Mesenchymal stem cells — which is why yellow marrow is a reserve rather than dead space.',
        src: { ref: 'hss.msk.2026', location: 'p7 "contains adipose (fat) tissues and"' } },
      { type: 'typed', prompt: 'Name the three formed elements red marrow produces.', accept: ['rbc, wbc, platelets', 'red blood cells white blood cells platelets', 'red cells, white cells, platelets', 'rbc wbc platelets'],
        explanation: 'Red blood cells, white blood cells and platelets.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A marrow biopsy for a suspected blood disorder is taken from the iliac crest rather than from the shaft of the femur. Explain why, from where each marrow type sits in an adult.',
        model: 'Because the sample has to contain red marrow, and in an adult red marrow persists mainly in the central skeleton — which includes the pelvis. The shaft of a long bone holds yellow marrow, which is adipose tissue rather than the haematopoietic stem cells the test needs. The ends of long bones do hold some red marrow, but the iliac crest is central skeleton and easily reached.',
        rubric: ['States red marrow is the target', 'Places red marrow in the adult central skeleton', 'Identifies the long-bone shaft as yellow marrow'] },
    ],
    commonMistakes: [
      'Saying an adult has no red marrow at all — it persists in the central skeleton and the ends of long bones.',
      'Treating yellow marrow as inert fat; it carries mesenchymal stem cells.',
    ],
    skills: [
      'Marrow distribution is age-dependent, and that is the point of the fact: before five it is red everywhere, after that red retreats centrally. Any question about where to sample marrow is answered from that retreat rather than from a list of bones.',
      'Two marrows, two stem-cell lines: haematopoietic in red (blood), mesenchymal in yellow (cartilage, bone, fat, muscle). Naming the wrong stem cell is the common way to lose this mark even when the colour is right.',
    ],
    selfCheck: 'From a blank page: what each marrow contains, at what age the transition starts, and where red marrow is still found in an adult.',
    sourceRefs: [{ ref: 'hss.msk.2026', location: 'p7 "Red bone marrow"' }],
  },
  {
    id: 'hss2011-msk-tissues-of-movement',
    subject: 'HSS2011', unit: 'hss.m4', type: 'definition',
    title: 'The five tissues movement needs — and how many of each',
    tags: ['musculoskeletal', 'foundation'],
    lesson: {
      explanation: 'Movement takes five tissues working together, and the lecture counts them. Bones — 206 of them — form joints for movement. Muscles, more than 600, attach onto bones and produce the movement. Tendons, around 4000, are fibrous connective tissues that attach muscle to bone. Ligaments, more than 900, are bands of tough elastic tissue around joints connecting bone to bone, giving support and limiting movement. Cartilages are soft, gel-like padding between bones that protects joints and facilitates movement. Ligaments come in two kinds: intracapsular (also called joint or intrinsic) ligaments are localised thickenings of fibrous connective tissue that help reinforce the joint capsule, such as the anterior and posterior cruciate ligaments; accessory (extrinsic) ligaments are separate from the joint capsule and reinforce the joint by attaching the bones together, such as the medial and lateral collateral ligaments. Cartilage is a strong but flexible connective tissue in three forms — hyaline, fibrocartilage and elastic — which absorbs shock, reduces friction and supports structures. The skeleton as a whole is described as light enough for movement, and strong and tough for support and protection.',
      plain: 'Five tissues, and the counts are worth knowing because they are the kind of thing a question can hang on: 206 bones, 600-plus muscles, about 4000 tendons, 900-plus ligaments, plus cartilage. The one that catches people out is tendon versus ligament — tendon joins muscle to bone, ligament joins bone to bone. And note what a ligament is FOR: as much to limit movement as to allow it.',
      keyFacts: [
        'Bones: 206, forming joints for movement.',
        'Muscles: more than 600, attached onto bones, producing movement.',
        'Tendons: around 4000, fibrous connective tissue attaching muscle to bone.',
        'Ligaments: more than 900, tough elastic bands connecting bone to bone, giving support and limiting movement.',
        'Cartilages: soft gel-like padding between bones, protecting joints and facilitating movement.',
        'Intracapsular / intrinsic ligament: a localised thickening reinforcing the capsule — the cruciate ligaments.',
        'Accessory / extrinsic ligament: separate from the capsule, attaching the bones — the collateral ligaments.',
        'Three cartilages: hyaline, fibrocartilage, elastic. They absorb shock, reduce friction and support structures.',
        'The skeleton protects, supports and moves: light enough for movement, strong and tough for support and protection.',
      ],
      prerequisites: [],
      examples: ['Cruciate ligaments are the intracapsular example; collateral ligaments the accessory one.'],
    },
    memory: {
      comparison: 'TenDon: muscle to bone. LIgament: LImb bone to LImb bone, and it LImits. Both are the same word class and the exam relies on you blurring them.',
      chunking: 'Counts in ascending order: 206 bones, 600 muscles, 900 ligaments, 4000 tendons. More tendons than anything, because one muscle needs one at each end.',
      location: 'Cruciate ligaments are inside the capsule, collaterals are outside it. That is the whole intracapsular/accessory distinction, and the knee gives you one of each.',
    },
    practice: [
      { type: 'mcq', prompt: 'Which tissue connects bone to bone?', options: ['Tendon', 'Ligament', 'Aponeurosis', 'Fascia'], answer: 1,
        explanation: 'Ligaments connect bone to bone; tendons attach muscle to bone.',
        src: { ref: 'hss.msk.2026', location: 'p3 "To form joints Bones"' } },
      { type: 'matching', prompt: 'Match each structure to its count in the lecture.', pairs: [['Bones', '206'], ['Muscles', 'more than 600'], ['Ligaments', 'more than 900'], ['Tendons', 'about 4000']],
        explanation: 'The opening slide counts all four.',
        src: { ref: 'hss.msk.2026', location: 'p3 "To form joints Bones"' } },
      { type: 'mcq', prompt: 'The anterior and posterior cruciate ligaments are given as the example of which ligament type?', options: ['Accessory (extrinsic)', 'Intracapsular (intrinsic)', 'Collateral', 'Extracapsular'], answer: 1,
        explanation: 'Intracapsular / joint / intrinsic — localised thickenings of fibrous connective tissue reinforcing the capsule. The collaterals are the accessory example.',
        src: { ref: 'hss.msk.2026', location: 'p28 "Localized thickenings of fibrous"' } },
      { type: 'cloze', prompt: 'An ______ ligament is separate from the joint capsule and reinforces the joint by attaching the bones together.', accept: ['accessory', 'extrinsic', 'accessory/extrinsic', 'accessory (extrinsic)'],
        explanation: 'Accessory, also called extrinsic — the medial and lateral collateral ligaments.',
        src: { ref: 'hss.msk.2026', location: 'p28 "Separate from joint capsule"' } },
      { type: 'typed', prompt: 'Name the three types of cartilage.', accept: ['hyaline, fibrocartilage, elastic', 'hyaline fibrocartilage elastic', 'hyaline; fibrocartilage; elastic'],
        explanation: 'Hyaline cartilage, fibrocartilage and elastic cartilage.',
        src: { ref: 'hss.msk.2026', location: 'p29 "Hyaline cartilage"' } },
    ],
    application: [
      { type: 'scenario', prompt: 'A ligament is described as "limiting their movement". Why would a joint want a structure whose job is to limit it?',
        model: 'Because a joint that could move in every direction to any extent would be unstable and could not transmit force. Ligaments connect bone to bone across the joint and give support, so they define the range the joint is allowed and stop it going beyond it. The limit is what makes the permitted movement usable — and it is why a torn ligament presents as instability rather than as stiffness.',
        rubric: ['States that unlimited movement means instability', 'Names the bone-to-bone connection giving support', 'Draws the consequence for a torn ligament'] },
    ],
    commonMistakes: [
      'Swapping tendon and ligament.',
      'Calling the collateral ligaments intracapsular — they are accessory, outside the capsule.',
      'Forgetting that limiting movement is part of a ligament’s stated job, not a side effect.',
    ],
    skills: [
      'Tendon and ligament are told apart by what they join, not by what they are made of: muscle-to-bone is tendon, bone-to-bone is ligament. Every question that appears to be about tissue type is really about the two ends.',
      'The intracapsular/accessory split is positional and the knee demonstrates both at once: cruciates inside the capsule, collaterals outside it. Locate the ligament relative to the capsule and the classification follows without recall.',
      'Read the counts as a ratio rather than four numbers: roughly 4000 tendons to 600 muscles is about six or seven per muscle, which only makes sense once you notice a muscle needs a tendon at each end and many have several heads.',
    ],
    selfCheck: 'From a blank page: the five tissues with their counts, the two ligament classes with an example of each, and the three cartilages.',
    sourceRefs: [
      { ref: 'hss.msk.2026', location: 'p3 "To form joints Bones"' },
      { ref: 'hss.msk.2026', location: 'p28 "Localized thickenings of fibrous"' },
      { ref: 'hss.msk.2026', location: 'p29 "Hyaline cartilage"' },
    ],
  },
  {
    id: 'hss2011-msk-muscle-organisation',
    subject: 'HSS2011', unit: 'hss.m4', type: 'sequence',
    title: 'Inside a skeletal muscle — from epimysium down to actin',
    tags: ['musculoskeletal', 'high-yield'],
    lesson: {
      explanation: 'A skeletal muscle is a set of wrappings inside wrappings. The whole muscle is sheathed in epimysium. Inside it the muscle is divided into fascicles, each wrapped in perimysium. Inside a fascicle are the muscle fibres — myocytes — each wrapped in endomysium. Inside a muscle fibre are the myofibrils, and inside a myofibril are the myosin and actin filaments. The sarcomere is the repeating unit within muscle fibres that is responsible for contraction. Fascicles are not all arranged the same way, and the arrangement is a classification the lecture names: fusiform, with fascicles nearly parallel to the muscle’s long axis and the muscle tapering towards the tendons; parallel, with fascicles parallel to the long axis terminating at either end in a flat tendon; convergent, with fascicles spread over a broad area converging on a thick central tendon, giving a triangular appearance; circular, with fascicles in concentric arrangements forming a sphincter or opening; and pennate, whose fascicles are short in relation to total muscle length, subdivided into unipennate (fascicles on only one side of the tendon), bipennate (on both sides of a centrally positioned tendon) and multipennate (attached obliquely from many directions to several tendons). In the musculoskeletal system it is the skeletal muscles that are studied, not smooth or cardiac; motion results from their alternating contraction and relaxation, because the bones cannot move by themselves. Skeletal muscles also maintain posture and body position, support soft tissue, control body openings and passages, regulate body temperature and store nutrients.',
      plain: 'Think of it as Russian dolls with a Greek name at each layer: epi- outside the whole muscle, peri- around each bundle, endo- around each fibre. Then inside the fibre, myofibrils; inside those, the actin and myosin that actually pull. The fascicle arrangements are the bit most people skip and the bit that explains muscle shape — a pennate muscle packs in more short fibres at an angle, which is why it looks like a feather and why it is strong for its length.',
      keyFacts: [
        'Muscle → epimysium. Fascicle → perimysium. Muscle fibre (myocyte) → endomysium.',
        'Inside the fibre: myofibrils; inside those: myosin and actin filaments.',
        'The sarcomere is the repeating unit within muscle fibres responsible for contraction.',
        'Fusiform: fascicles nearly parallel to the long axis; the muscle tapers towards the tendons.',
        'Parallel: fascicles parallel to the long axis, terminating at either end in a flat tendon.',
        'Convergent: fascicles spread over a broad area converging on a thick central tendon — triangular.',
        'Circular: fascicles concentric, forming a sphincter or opening.',
        'Pennate: short fascicles relative to muscle length — unipennate (one side), bipennate (both sides of a central tendon), multipennate (obliquely from many directions to several tendons).',
        'Skeletal muscle also maintains posture, supports soft tissue, controls body openings, regulates temperature and stores nutrients.',
      ],
      prerequisites: [],
      examples: [],
    },
    memory: {
      wordOrigin: 'Epi- upon, peri- around, endo- within. Same three prefixes as epicardium / pericardium / endocardium, and they nest in the same order.',
      sequence: 'Muscle, fascicle, fibre, myofibril, filament. Five nouns, each one inside the last — say them downwards and you cannot put the mysia in the wrong order.',
      visualCue: 'Pennate is from penna, a feather. Unipennate is half a feather, bipennate a whole one, multipennate several feathers sharing a quill.',
    },
    practice: [
      { type: 'sequence', prompt: 'Order these from the outside of a muscle inwards.', items: ['Epimysium', 'Perimysium', 'Endomysium', 'Myofibril', 'Actin and myosin filaments'],
        explanation: 'Epimysium sheathes the whole muscle, perimysium each fascicle, endomysium each fibre; then myofibrils inside the fibre and filaments inside those.',
        src: { ref: 'hss.msk.2026', location: 'p32 "Organization of muscle"' } },
      { type: 'mcq', prompt: 'Which connective tissue layer wraps an individual muscle fibre?', options: ['Epimysium', 'Perimysium', 'Endomysium', 'Fascia'], answer: 2,
        explanation: 'Endomysium — endo- meaning within. Perimysium wraps the fascicle, epimysium the whole muscle.',
        src: { ref: 'hss.msk.2026', location: 'p32 "Endomysium"' } },
      { type: 'mcq', prompt: 'Fascicles arranged on both sides of a centrally positioned tendon describes which arrangement?', options: ['Unipennate', 'Bipennate', 'Multipennate', 'Convergent'], answer: 1,
        explanation: 'Bipennate. Unipennate has fascicles on only one side; multipennate attaches obliquely from many directions to several tendons.',
        src: { ref: 'hss.msk.2026', location: 'p36 "Multipennate--fascicles attached obliquely from"' } },
      { type: 'cloze', prompt: 'The ______ is the repeating unit within muscle fibres that is responsible for contraction.', accept: ['sarcomere'],
        explanation: 'The sarcomere.',
        src: { ref: 'hss.msk.2026', location: 'p33 "the repeating unit within muscle fibers that is responsible"' } },
      { type: 'matching', prompt: 'Match each fascicle arrangement to its description.', pairs: [['Fusiform', 'Nearly parallel to the long axis, tapering towards the tendons'], ['Convergent', 'Spread over a broad area onto a thick central tendon'], ['Circular', 'Concentric, forming a sphincter'], ['Unipennate', 'Fascicles on only one side of the tendon']],
        explanation: 'Five arrangements, with pennate subdividing into three.',
        src: { ref: 'hss.msk.2026', location: 'p36 "Fusiform—fascicles nearly parallel to longitudinal axis"' } },
    ],
    application: [
      { type: 'scenario', prompt: 'A pennate muscle is defined by short fascicles in relation to total muscle length. What does packing short fibres in at an angle buy the muscle, and what does it cost?',
        model: 'It buys fibre count. Because the fascicles are short and set obliquely against the tendon, far more of them fit into the same volume of muscle, and more fibres pulling in parallel means more force. What it costs is range: each fascicle is short, so the distance it can shorten by is small, and part of its pull is directed across the tendon rather than along it. A fusiform or parallel muscle makes the opposite trade — long fibres, more shortening, fewer of them.',
        rubric: ['Identifies more fibres in the same volume', 'Links fibre number to force', 'Names the cost as shortening range or angled pull'] },
    ],
    commonMistakes: [
      'Putting perimysium around the fibre and endomysium around the fascicle — the prefixes settle it.',
      'Treating the fascicle arrangements as decoration rather than a named classification.',
      'Studying smooth or cardiac muscle for this module; the musculoskeletal system studies skeletal muscle.',
    ],
    skills: [
      'The three mysia are the same epi-/peri-/endo- ladder as the heart wall, and they nest in the same order. One prefix set answers both questions, so learn the prefixes rather than two separate lists.',
      'Fascicle arrangement is a shape-to-function argument, not vocabulary: parallel and fusiform buy shortening range, pennate buys force by fitting more short fibres in at an angle, circular buys closure. Given a muscle’s job you can usually predict its arrangement.',
      'Bones cannot move themselves — the lecture says so explicitly, and it is the reason every movement question resolves to which muscle pulls which bone in which direction.',
    ],
    selfCheck: 'From a blank page: the five layers outside-in, what a sarcomere is, and the five fascicle arrangements with the three pennate subtypes.',
    sourceRefs: [
      { ref: 'hss.msk.2026', location: 'p32 "Organization of muscle"' },
      { ref: 'hss.msk.2026', location: 'p33 "the repeating unit within muscle fibers that is responsible"' },
      { ref: 'hss.msk.2026', location: 'p36 "Fusiform—fascicles nearly parallel to longitudinal axis"' },
      { ref: 'hss.msk.2026', location: 'p31 "Generate movement"' },
    ],
  },
  {
    id: 'hss2011-msk-tendon-attachment',
    subject: 'HSS2011', unit: 'hss.m4', type: 'definition',
    title: 'Tendon, and the two ends of a muscle',
    tags: ['musculoskeletal', 'high-yield'],
    lesson: {
      explanation: 'A tendon is dense regular connective tissue, anatomically continuous with the endomysium, perimysium and epimysium at both ends of a skeletal muscle. It attaches to bones and transmits the forces generated by the muscle to the bone to elicit movement. A tendon also carries a mechanoreceptor — the Golgi tendon organ, a small bundle of tendon collagen fibres interwoven with the terminal branches of a sensory axon — located at the myotendinous junction, which detects the tension or force developed at the tendon during muscle contraction. There are two junctions to name: the myotendinous junction is the point at which the tendon attaches to muscle, and the osteotendinous junction is the point at which the tendon attaches to bone. Of the two bony attachments, the origin is usually proximal and is the attachment site that does not move during contraction; the insertion is usually distal and is the attachment site that moves when the muscle contracts.',
      plain: 'The tendon is not a separate rope tied onto the muscle — it is continuous with the wrappings inside the muscle, which is why force passes straight through. Two junctions, two names: myo- where it meets muscle, osteo- where it meets bone. And the two bony ends are not interchangeable: origin stays put, insertion moves. Also sitting there is the Golgi tendon organ, which is how the nervous system knows how hard the muscle is pulling.',
      keyFacts: [
        'Tendon is dense regular connective tissue, continuous with endo-, peri- and epimysium at both ends of the muscle.',
        'It attaches to bone and transmits muscle force to the bone to produce movement.',
        'The Golgi tendon organ is a mechanoreceptor: collagen fibres interwoven with the terminal branches of a sensory axon.',
        'It sits at the myotendinous junction and detects tension or force during contraction.',
        'Myotendinous junction: tendon to muscle. Osteotendinous junction: tendon to bone.',
        'Origin: usually proximal, does NOT move during contraction.',
        'Insertion: usually distal, MOVES when the muscle contracts.',
      ],
      prerequisites: ['hss2011-msk-muscle-organisation'],
      examples: [],
    },
    memory: {
      wordOrigin: 'Myo- muscle, osteo- bone, tendinous- tendon. Each junction is named for what is on the far side of the tendon.',
      comparison: 'Origin originates and stays; insertion is what gets inserted into the moving part. Proximal usually stays, distal usually moves.',
      teachBack: 'Pick any muscle you can name and say out loud which end is origin and which is insertion, then move the joint and check that the end you called insertion is the one that travelled.',
    },
    practice: [
      { type: 'mcq', prompt: 'Which attachment site does NOT move during contraction?', options: ['The insertion', 'The origin', 'Both move equally', 'Whichever is distal'], answer: 1,
        explanation: 'The origin, usually proximal, is the attachment that does not move. The insertion, usually distal, is the one that moves.',
        src: { ref: 'hss.msk.2026', location: 'p35 "The origin (usually proximal) is the"' } },
      { type: 'cloze', prompt: 'The point at which a tendon attaches to bone is the ______ junction.', accept: ['osteotendinous', 'osteo-tendinous'],
        explanation: 'Osteotendinous. The myotendinous junction is where tendon meets muscle.',
        src: { ref: 'hss.msk.2026', location: 'p35 "Osteotendinous junction--point at"' } },
      { type: 'mcq', prompt: 'What does the Golgi tendon organ detect?', options: ['Muscle length', 'Rate of change of length', 'Tension or force developed at the tendon', 'Joint angle'], answer: 2,
        explanation: 'Tension or force developed at the tendon during muscle contraction. Length is the muscle spindle’s job.',
        src: { ref: 'hss.msk.2026', location: 'p34 "Golgi tendon organ"' } },
      { type: 'mcq', prompt: 'Tendon is which kind of connective tissue?', options: ['Loose areolar', 'Dense regular', 'Dense irregular', 'Elastic'], answer: 1,
        explanation: 'Dense regular connective tissue, continuous with the mysia at both ends of the muscle.',
        src: { ref: 'hss.msk.2026', location: 'p34 "Dense regular connective tissues that is"' } },
      { type: 'explain', prompt: 'Why does it matter that the tendon is anatomically continuous with the endo-, peri- and epimysium rather than merely attached to the muscle?',
        model: 'Because force generated inside individual fibres has to reach the bone. The filaments pull the myofibril, the myofibril the fibre, and each of those is wrapped in a connective-tissue layer that is itself part of the tendon. Continuity means the pull is transmitted through one unbroken mechanical path instead of across a join that could fail, so every fibre contributes to the force arriving at the osteotendinous junction.',
        rubric: ['Identifies force transmission as the issue', 'Traces the path from fibre through the mysia into the tendon', 'Explains why continuity beats attachment'] },
    ],
    application: [
      { type: 'scenario', prompt: 'A muscle crosses a joint. Its proximal attachment is on the trunk and its distal attachment on a limb bone. In a pull-up, the limb stays fixed on the bar and the trunk rises. What does that do to the origin and insertion as defined here?',
        model: 'The definitions are given as "usually" proximal and distal for a reason. Origin is the attachment that does not move and insertion the one that does, so when the distal attachment is fixed by holding the bar, it is the trunk end that travels — and the roles have effectively swapped relative to the usual case. The anatomical naming stays as written, but the functional fact of which end moves has reversed, which is why the definition is written around movement rather than around position.',
        rubric: ['Recalls origin as the non-moving end and insertion as the moving one', 'Notes "usually" proximal/distal is not a rule', 'Identifies the reversal when the distal end is fixed'] },
    ],
    commonMistakes: [
      'Reading "usually proximal" as "always proximal".',
      'Attributing length sensing to the Golgi tendon organ; it senses tension.',
      'Naming the myotendinous junction as the bone attachment.',
    ],
    skills: [
      'Origin and insertion are defined by MOVEMENT, not by position — proximal and distal are only the usual case. Any scenario that fixes the far end is testing whether you learned the definition or the shortcut.',
      'The tendon being continuous with the three mysia is what makes the whole muscle one mechanical unit; it is the structural reason force from a single fibre arrives at the bone at all.',
      'Two sensors, two quantities: spindle for length, Golgi tendon organ for tension. Naming the wrong one is the standard error, and the location tells you which is which — the tendon organ is in the tendon, where force is carried.',
    ],
    selfCheck: 'From a blank page: what tendon is made of, the two junctions and what each joins, which attachment moves, and what the Golgi tendon organ measures and where it sits.',
    sourceRefs: [
      { ref: 'hss.msk.2026', location: 'p34 "Dense regular connective tissues that is"' },
      { ref: 'hss.msk.2026', location: 'p35 "Myotendinous junction—point at"' },
    ],
  },
  {
    id: 'hss2011-msk-motor-unit-tone',
    subject: 'HSS2011', unit: 'hss.m4', type: 'definition',
    title: 'The motor unit, and why a resting muscle is not switched off',
    tags: ['musculoskeletal', 'high-yield'],
    lesson: {
      explanation: 'The functional unit of skeletal muscle is the motor unit: a motor neuron plus the muscle fibres it innervates. How many fibres that is varies enormously with the job. A motor neuron innervating an eye muscle may control 13 to 20 muscle fibres; a motor neuron innervating a calf muscle may control 2000. Muscle tone is a low level of contraction contributed by small groups of motor units which are active and inactive in a constantly shifting pattern, even at rest. It is not strong enough to produce a movement, but it is enough to keep the skeletal muscle firm.',
      plain: 'One nerve cell, and every fibre it commands, counts as one unit — so the smallest amount of muscle you can switch on is a whole motor unit. That is why precision and power are different: an eye muscle gives one neuron a dozen or so fibres, so it can be adjusted very finely, while a calf muscle gives one neuron two thousand, which is powerful but coarse. And a resting muscle is never fully off: small groups of units take turns holding a little tension, which is what makes a relaxed muscle feel firm rather than floppy.',
      keyFacts: [
        'Motor unit = motor neuron + the muscle fibres it innervates. It is the functional unit of skeletal muscle.',
        'Eye muscle: one motor neuron may control 13–20 fibres.',
        'Calf muscle: one motor neuron may control 2000 fibres.',
        'Muscle tone is a low level of contraction from small groups of motor units, active and inactive in a constantly shifting pattern.',
        'Tone is present even at rest.',
        'Tone is not strong enough to produce movement, but keeps the muscle firm.',
      ],
      prerequisites: ['hss2011-msk-muscle-organisation'],
      examples: ['Eye versus calf is the lecture’s own contrast for innervation ratio.'],
    },
    memory: {
      comparison: 'Small unit, fine control. Large unit, brute force. Thirteen fibres to aim an eye; two thousand to push off the ground.',
      chunking: 'Two numbers only: 13–20 and 2000. The ratio between them is roughly a hundredfold, which is the point.',
      visualCue: 'Picture the resting muscle as a night shift: small teams clocking on and off in rotation, never the whole workforce, never nobody.',
    },
    practice: [
      { type: 'cloze', prompt: 'A motor unit is a ______ plus the ______ it innervates.', accept: ['motor neuron; muscle fibres', 'motor neuron, muscle fibers', 'motor neuron and muscle fibres', 'motor neurone; muscle fibres'],
        explanation: 'Motor neuron + muscle fibres — the functional unit of skeletal muscle.',
        src: { ref: 'hss.msk.2026', location: 'p37 "Motor unit ="' } },
      { type: 'mcq', prompt: 'Roughly how many muscle fibres may one motor neuron control in an eye muscle?', options: ['1–2', '13–20', '200–300', '2000'], answer: 1,
        explanation: '13–20. Two thousand is the calf-muscle figure.',
        src: { ref: 'hss.msk.2026', location: 'p37 "a motor neuron innervating"' } },
      { type: 'mcq', prompt: 'Which statement about muscle tone is correct?', options: ['It is absent at rest', 'It is strong enough to produce movement', 'It comes from small groups of motor units shifting between active and inactive', 'It is produced by all motor units firing together'], answer: 2,
        explanation: 'Small groups of motor units, active and inactive in a constantly shifting pattern, even at rest — enough to keep the muscle firm, not enough to move it.',
        src: { ref: 'hss.msk.2026', location: 'p37 "Muscle tone--a low level of contraction"' } },
      { type: 'explain', prompt: 'Why does the shifting pattern matter? What would go wrong if the same motor units held tone continuously?',
        model: 'They would fatigue. Tone has to be maintained the whole time a person is awake, and a motor unit held in continuous low-level contraction would exhaust itself. Rotating the duty between small groups — some active, some inactive, constantly shifting — keeps a steady total tension across the muscle while letting every individual unit recover, which is how the firmness can be sustained indefinitely.',
        rubric: ['Identifies fatigue as the problem', 'Explains rotation lets units recover', 'Notes the total tension stays steady'] },
    ],
    application: [
      { type: 'scenario', prompt: 'Muscles that move the eye and muscles that move the ankle have very different innervation ratios. Explain what that difference buys each of them, using the motor unit as the reason.',
        model: 'The smallest amount of force a muscle can add is one whole motor unit, because a motor neuron fires all of its fibres together. In an eye muscle, one neuron controls only 13 to 20 fibres, so each step in force is tiny and the eye can be aimed very precisely. In a calf muscle one neuron controls around 2000 fibres, so each step is large — coarse, but capable of generating the force needed to move body weight. Precision and power are traded against each other through the size of the unit.',
        rubric: ['States the motor unit is the smallest increment of force', 'Uses the 13–20 figure for precision', 'Uses the 2000 figure for power'] },
    ],
    commonMistakes: [
      'Defining the motor unit as one neuron and one fibre.',
      'Describing a resting muscle as having no contraction at all.',
      'Thinking tone is weak because the muscle is weak; it is weak because only small groups of units are active at a time.',
    ],
    skills: [
      'The motor unit is the smallest increment of force a muscle can add, because a neuron fires all its fibres together — which is the whole explanation of why fine-control muscles have small units and powerful muscles have large ones. One idea covers both figures.',
      'Tone is a rotation, not a steady clench. Reading "constantly shifting" as the operative phrase explains both why tone does not fatigue and why it never produces movement.',
    ],
    selfCheck: 'From a blank page: the definition of a motor unit, both innervation figures with the muscle each belongs to, and what muscle tone is, is not, and is for.',
    sourceRefs: [{ ref: 'hss.msk.2026', location: 'p37 "Motor unit ="' }],
  },
  {
    id: 'hss2011-msk-joint-classifications',
    subject: 'HSS2011', unit: 'hss.m4', type: 'matching',
    title: 'Three ways to classify the same joint',
    tags: ['musculoskeletal', 'high-yield'],
    lesson: {
      explanation: 'A joint is an articulation where two or more bones meet, and its characteristic structure determines the type and range of movement it allows. The lecture classifies joints three different ways, and all three apply to any given joint at once. Anatomically, by region: the jaw joint is the temporomandibular joint, the shoulder joint is the glenohumeral joint, and the same slide gives the elbow as the humeroulnar, humeroradial and proximal radioulnar joints, the wrist as the radiocarpal joint, the hip as the acetabulofemoral joint, the knee as the patellofemoral and tibiofemoral joints, and the ankle as the talocrural joint. Functionally, by mobility: immovable is a synarthrosis, slightly movable is an amphiarthrosis, and freely movable is a diarthrosis. Structurally, by the tissue separating the bones: fibrous joints are separated by fibrous tissues, cartilaginous joints by cartilages, and synovial joints by a fluid-filled cavity within a fibrous capsule — and synovial joints are the most common in the body.',
      plain: 'The same joint has three correct answers depending on which question was asked. Your knee is anatomically the tibiofemoral joint, functionally a diarthrosis because it moves freely, and structurally synovial because a fluid-filled cavity separates the bones. An exam question that says "classify" without saying which axis is asking you to notice there are three.',
      keyFacts: [
        'A joint is an articulation where two or more bones meet; its structure determines the type and range of movement.',
        'ANATOMICAL (regions): jaw = temporomandibular; shoulder = glenohumeral; elbow = humeroulnar / humeroradial / proximal radioulnar; wrist = radiocarpal; hip = acetabulofemoral; knee = patellofemoral / tibiofemoral; ankle = talocrural.',
        'FUNCTIONAL (mobility): synarthrosis = immovable; amphiarthrosis = slightly movable; diarthrosis = freely movable.',
        'STRUCTURAL (tissue separating the bones): fibrous, cartilaginous, synovial.',
        'Synovial = separated by a fluid-filled cavity, within a fibrous capsule.',
        'Synovial joints are the most common in the body.',
      ],
      prerequisites: ['hss2011-joints-classification'],
      examples: ['The knee: tibiofemoral anatomically, diarthrosis functionally, synovial structurally.'],
    },
    memory: {
      wordOrigin: 'Arthrosis is a joint. Syn- together (so tightly joined it cannot move), amphi- both or around (a little of both), dia- through (movement goes right through it).',
      chunking: 'Three axes: where it is, how much it moves, what separates the bones. Region, mobility, tissue.',
      comparison: 'The structural and functional lists are not the same list and do not map one to one — a cartilaginous joint can be a synchondrosis (immovable) or a symphysis (slightly movable), so naming the tissue does not settle the mobility.',
    },
    practice: [
      { type: 'matching', prompt: 'Match each functional class to its mobility.', pairs: [['Synarthrosis', 'Immovable'], ['Amphiarthrosis', 'Slightly movable'], ['Diarthrosis', 'Freely movable']],
        explanation: 'The functional classification is by degree of mobility only.',
        src: { ref: 'hss.msk.2026', location: 'p15 "Immovable (Synarthrosis)"' } },
      { type: 'mcq', prompt: 'On which basis does the STRUCTURAL classification of joints divide them?', options: ['Degree of mobility', 'The tissues that separate the bones', 'The region of the body', 'The number of axes of movement'], answer: 1,
        explanation: 'Structural = the tissues that separate the bones: fibrous, cartilaginous, synovial.',
        src: { ref: 'hss.msk.2026', location: 'p16 "Structural aspects"' } },
      { type: 'mcq', prompt: 'Which joint type is described as most common in the body?', options: ['Fibrous', 'Cartilaginous', 'Synovial', 'They are equally common'], answer: 2,
        explanation: 'Synovial — separated by a fluid-filled cavity within a fibrous capsule, and the most common in our body.',
        src: { ref: 'hss.msk.2026', location: 'p16 "most common in our body"' } },
      { type: 'matching', prompt: 'Match each common joint name to its anatomical name.', pairs: [['Jaw joint', 'Temporomandibular joint'], ['Shoulder joint', 'Glenohumeral joint'], ['Wrist joint', 'Radiocarpal joint'], ['Hip joint', 'Acetabulofemoral joint'], ['Ankle joint', 'Talocrural joint']],
        explanation: 'The anatomical classification is by region, and the anatomical name is built from the two bones that meet.',
        src: { ref: 'hss.msk.2026', location: 'p14 "Jaw joint Temporomandibular joint"' } },
      { type: 'cloze', prompt: 'A slightly movable joint is functionally classified as a(n) ______.', accept: ['amphiarthrosis', 'amphiarthroses'],
        explanation: 'Amphiarthrosis. Immovable is a synarthrosis and freely movable a diarthrosis.',
        src: { ref: 'hss.msk.2026', location: 'p15 "Slightly movable (Amphiarthrosis)"' } },
    ],
    application: [
      { type: 'scenario', prompt: 'Classify the knee on all three axes, then say what each classification does and does not tell you.',
        model: 'Anatomically it is the patellofemoral and tibiofemoral joint — that tells you which bones meet and where in the body, and nothing about movement. Functionally it is a diarthrosis, freely movable — that tells you how much it moves, but not what makes that possible. Structurally it is synovial, the bones separated by a fluid-filled cavity within a fibrous capsule — and that is the one that explains the other: the free movement follows from the cavity, because there is no tissue bridging the bones to restrain them.',
        rubric: ['Gives all three classifications correctly', 'Says what each axis reports', 'Identifies the structural class as the explanation for the functional one'] },
    ],
    commonMistakes: [
      'Answering "classify this joint" on one axis when the question wanted another.',
      'Assuming structural class fixes functional class; cartilaginous joints come in both immovable and slightly movable forms.',
      'Reading the anatomical names as extra vocabulary rather than as the region classification itself.',
    ],
    skills: [
      'Three classifications applying at once means "classify this joint" is an under-specified instruction, and the first move is to decide which axis is being asked about — region, mobility, or separating tissue.',
      'Anatomical joint names are constructed, not memorised: they are the two articulating bones joined up. Glenohumeral is the glenoid fossa and the humerus; talocrural is the talus and the crural bones. Given the bones you can build the name.',
      'The structural class explains the functional one — a fluid cavity permits free movement, fibrous tissue prevents it — which is why the lecture says the characteristic structure of a joint determines the type and range of movement.',
    ],
    selfCheck: 'From a blank page: the three axes with the terms on each, the seven anatomical names, and one joint classified on all three.',
    sourceRefs: [
      { ref: 'hss.msk.2026', location: 'p14 "Jaw joint Temporomandibular joint"' },
      { ref: 'hss.msk.2026', location: 'p15 "Immovable (Synarthrosis)"' },
      { ref: 'hss.msk.2026', location: 'p16 "Structural aspects"' },
    ],
  },
  {
    id: 'hss2011-msk-periosteum', subject: 'HSS2011', unit: 'hss.m4', type: 'definition',
    title: 'Periosteum — the living covering of bone', tags: ['musculoskeletal', 'bone', 'high-yield'],
    lesson: {
      explanation: 'The periosteum is fibrous tissue surrounding the outer surface of bone, except at the articular sites. Its inner layer is osteogenic: its cells can differentiate into osteoblasts. It is richly furnished with capillaries and nerves. The older official musculoskeletal lecture makes the blood-supply consequence explicit: small blood vessels in the periosteum nourish bone, while large nutrient arteries enter the shaft of long bones through the nutrient foramen.',
      keyFacts: ['Fibrous tissue surrounding the outer bone surface.', 'Absent at articular sites.', 'Inner layer is osteogenic and can differentiate into osteoblasts.', 'Richly furnished with capillaries and nerves.', 'Small periosteal vessels nourish bone; nutrient arteries enter long-bone shafts through nutrient foramina.'],
      prerequisites: ['hss2011-msk-bone-histology'], examples: [],
    },
    memory: { wordOrigin: 'Peri- means around: periosteum surrounds the bone.' },
    practice: [
      { type: 'mcq', prompt: 'Where is periosteum normally absent?', options: ['At tendon attachments', 'Over articular surfaces', 'Over the shaft', 'Where sensory nerves enter'], answer: 1, explanation: 'Articular cartilage covers the joint surface, so periosteum does not.' },
      { type: 'matching', prompt: 'Match each feature to the statement made in the lectures.', pairs: [['Fibrous periosteum', 'Surrounds the outer bone surface'], ['Inner osteogenic layer', 'Can differentiate into osteoblasts'], ['Small periosteal vessels', 'Nourish bone'], ['Nutrient artery', 'Enters a long-bone shaft through a nutrient foramen']], explanation: 'The current slide supplies the covering, cells, vessels and nerves; the older lecture states how bone is nourished.' },
    ],
    commonMistakes: ['Extending periosteum over an articular site even though the current slide explicitly excludes it.'],
    skills: ['Place it first—around the outer bone except at a joint—then attach the osteogenic, vascular and neural facts.'],
    selfCheck: 'State where periosteum is absent, what its inner layer can become, and the two routes by which the lecture says bone receives blood.',
    sourceRefs: [{ ref: 'hss.msk.2026', location: 'p8 periosteum, osteogenic inner layer, capillaries and nerves' }, { ref: 'hss.4.1', location: 'pp7 and 13 periosteal vessels, nutrient arteries and long-bone periosteum' }],
  },
  {
    id: 'hss2011-thorax-regional-landmarks',
    subject: 'HSS2011', unit: 'hss.m1', type: 'concept',
    title: 'Thoracic regional anatomy: sternal angle, mediastinal planes, diaphragm, and boundaries',
    tags: ['anatomy', 'thorax', 'mediastinum', 'sternal-angle', 'high-yield'],
    lesson: {
      explanation: 'The thoracic wall and cavity are defined by precise bony landmarks and fascial compartments essential for chest radiography and physical examination. The foremost anterior landmark is the sternal angle (angle of Louis), which represents the junction between manubrium and body of the sternum. Palpable as a transverse ridge, it articulates with the costal cartilage of 2nd rib, providing the reliable clinical anchor for counting ribs and intercostal spaces. Projected posteriorly, the sternal angle corresponds precisely to the vertebral level of T4/T5. This transverse thoracic plane serves as the critical boundary of superior & inferior mediastinum. Multiple vital structures transition at this level: the aortic arch begins and ends, the pulmonary trunk bifurcates, and the carina (= bifurcation of bronchi) branches into the left and right principal bronchi at the @ T4/T5 vertebral level. The thoracic cavity is bounded superiorly by the thoracic inlet (superior thoracic aperture), demarcated by the superior border of the manubrium, the 1st ribs, and the 1st thoracic vertebra (T1). Inferiorly, the thoracic outlet is closed by the muscular diaphragm, bounded by the xiphisternal joint, costal margins, 12th ribs, and the 12th thoracic vertebra (T12). The diaphragm is innervated motor and sensory by the phrenic nerve (L & R) (roots C3, C4, C5), converging upon a central aponeurotic tendon (central tendon (green)), and its venous drainage is conducted as phrenic veins drain into the IVC. Running along the costal groove under the inferior border of each rib is the intercostal neurovascular bundle, arranged in descending superior-to-inferior order as vein, artery, nerve, accompanied by intercostal nerves & lymphatics. Venous blood from the thoracic chest wall and breast drains predominantly into the axillary system, with the breast draining venously to the Axillary vein (mainly) alongside internal thoracic and intercostal tributaries.',
      plain: 'The sternal angle (manubrium-body junction) marks the 2nd costal cartilage, vertebral level T4/T5, and the boundary between superior and inferior mediastinum. The trachea bifurcates at the carina at T4/T5. The thoracic inlet is bounded by T1 and 1st ribs; the outlet by T12 and the diaphragm. The diaphragm is innervated by phrenic nerves (C3-C5), has a central tendon, and its veins drain to the IVC. Intercostal spaces carry vein, artery, nerve and lymphatics. Breast venous drainage is mainly to the axillary vein.',
      keyFacts: [
        'The sternal angle is the palpable junction between the manubrium and sternal body.',
        'The sternal angle lies at the level of the costal cartilage of the 2nd rib and corresponds to vertebral level T4/T5.',
        'The transverse thoracic plane at T4/T5 marks the boundary between superior and inferior mediastinum.',
        'The carina (= bifurcation of bronchi) into primary bronchi is situated at the T4/T5 vertebral level.',
        'The superior thoracic aperture (inlet) is bounded by the manubrium, first ribs, and the 1st thoracic vertebra.',
        'The inferior thoracic aperture (outlet) is bounded by the costal margin, 12th ribs, and the 12th thoracic vertebra.',
        'The diaphragm is innervated by the left and right phrenic nerves (C3–C5) and features a central tendon; phrenic veins drain into the IVC.',
        'The intercostal neurovascular bundle in the subcostal groove comprises intercostal vein, artery, nerve, and lymphatics.',
        'Breast venous return drains primarily into the axillary vein.',
      ],
      prerequisites: ['hss2011-m1-heart-wall-valves'],
      examples: ['On a PA chest radiograph, the carina is identified at the T4/T5 level beneath the aortic knob, guiding endotracheal tube tip placement 3–5 cm superiorly.'],
    },
    memory: {
      chunking: 'Landmarks: Sternal angle = Manubrium + Body = 2nd rib = T4/T5 = Sup/Inf mediastinum plane = Carina (bifurcation of bronchi). Boundaries: Inlet = T1 + 1st rib; Outlet = T12 + 12th rib + Diaphragm (Phrenic L/R, IVC drainage). Neurovascular: VAN + lymphatics under rib groove. Drainage: Breast -> Axillary vein (mainly).',
      comparison: 'Thoracic inlet vs outlet: Inlet is small, rigid, bounded by T1, 1st rib and manubrium; outlet is large, bounded by T12 and 12th ribs, sealed by the dome-shaped diaphragm.',
      number: '2nd rib (sternal angle) · T4/T5 (sternal angle & carina) · T1 (inlet) · T12 (outlet) · VAN (vein, artery, nerve).',
    },
    practice: [
      { type: 'mcq', prompt: 'Which costal cartilage articulates with the sternum at the level of the sternal angle?', options: ['1st costal cartilage', '2nd costal cartilage', '4th costal cartilage', '7th costal cartilage'], answer: 1,
        explanation: 'The sternal angle articulates directly with the costal cartilage of the 2nd rib, serving as the landmark for counting ribs.',
        src: { ref: 'hss.thorax.deck', location: 'p5 "costal cartilage of 2nd rib"' } },
      { type: 'mcq', prompt: 'At which vertebral level does the transverse plane passing through the sternal angle lie?', options: ['T2/T3', 'T4/T5', 'T7/T8', 'T12/L1'], answer: 1,
        explanation: 'The sternal angle projects posteriorly to the intervertebral disc between T4 and T5 (T4/T5 vertebral level).',
        src: { ref: 'hss.thorax.deck', location: 'p5 "vertebral level of T4/T5"' } },
      { type: 'mcq', prompt: 'What key tracheobronchial landmark is situated at the T4/T5 vertebral level?', options: ['Cricoid cartilage', 'Carina (bifurcation of bronchi)', 'Epiglottis', 'Terminal bronchiole'], answer: 1,
        explanation: 'The carina, marking the tracheal bifurcation into left and right main bronchi, sits at the T4/T5 vertebral level.',
        src: { ref: 'hss.thorax.deck', location: 'p22 "= bifurcation of bronchi"' } },
      { type: 'typed', prompt: 'Which major vein receives the primary venous drainage of the breast tissue?', accept: ['Axillary vein', 'axillary vein', 'Axillary', 'axillary'],
        explanation: 'Venous drainage from the breast empties mainly into the axillary vein.',
        src: { ref: 'hss.thorax.deck', location: 'p29 "Axillary vein (mainly)"' } },
      { type: 'matching', prompt: 'Match each thoracic anatomical landmark to its associated structure or level.',
        pairs: [['Sternal angle', 'Vertebral level T4/T5'], ['Carina', 'Bifurcation of primary bronchi'], ['Thoracic inlet', 'Bounded posteriorly by 1st thoracic vertebra'], ['Thoracic outlet', 'Bounded posteriorly by 12th thoracic vertebra']],
        explanation: 'These define the core regional relationships and boundaries of the thorax.',
        src: { ref: 'hss.thorax.deck', location: 'p12 "1st thoracic vertebra"' } },
      { type: 'sequence', prompt: 'Order the anatomical structures encountered in an intercostal space from superior to inferior within the subcostal groove.',
        items: ['Intercostal vein', 'Intercostal artery', 'Intercostal nerve', 'Collateral branches'],
        explanation: 'The neurovascular bundle runs in the order VAN (Vein, Artery, Nerve) from superior to inferior under the costal margin.',
        src: { ref: 'hss.thorax.deck', location: 'p7 "nerves & lymphatics"' } },
    ],
    application: [
      { type: 'scenario', prompt: 'A radiographer reviews a chest radiograph and notes the position of an endotracheal tube relative to the carina. Describe the anatomical location of the carina, the landmark dividing the mediastinum, and explain why the 2nd rib is counted from the sternal angle.',
        model: 'The carina marks the bifurcation of the trachea into primary bronchi and is located at the T4/T5 vertebral level. This corresponds anteriorly to the transverse thoracic plane passing through the sternal angle (manubriosternal junction). The sternal angle is palpable beneath the skin and marks the attachment of the 2nd costal cartilage; because the 1st rib lies tucked beneath the clavicle and is difficult to palpate directly, the 2nd costal cartilage at the sternal angle serves as the reliable reference point to count ribs and intercostal spaces downwards. The plane at T4/T5 also anatomically separates the superior mediastinum from the inferior mediastinum.',
        rubric: ['Identifies carina at T4/T5 vertebral level as the bifurcation of bronchi', 'Explains sternal angle as the 2nd costal cartilage landmark for rib counting', 'Identifies the T4/T5 plane as the boundary between superior and inferior mediastinum'] },
    ],
    commonMistakes: [
      'Confusing the 1st costal cartilage with the 2nd costal cartilage at the sternal angle (the 1st rib articulates with the manubrium; the 2nd articulates at the sternal angle).',
      'Thinking the carina is at the thoracic inlet (it is at the T4/T5 level in the inferior plane of the superior mediastinum).',
      'Assuming the diaphragm phrenic veins drain into the hepatic portal vein (they drain directly into the IVC).',
    ],
    skills: [
      'Identifying thoracic boundaries, palpating the sternal angle to locate the 2nd rib, mapping the T4/T5 plane (carina and mediastinal boundary), and detailing neurovascular bundles and diaphragmatic innervation.',
    ],
    selfCheck: 'State the rib articulating at the sternal angle, the vertebral level of the sternal angle and carina, the boundaries of thoracic inlet vs outlet, and the nerve innervating the diaphragm.',
    sourceRefs: [
      { ref: 'hss.thorax.deck', location: 'p5 "junction between manubrium and"' },
      { ref: 'hss.thorax.deck', location: 'p5 "costal cartilage of 2nd rib"' },
      { ref: 'hss.thorax.deck', location: 'p5 "vertebral level of T4/T5"' },
      { ref: 'hss.thorax.deck', location: 'p5 "boundary of superior & inferior"' },
      { ref: 'hss.thorax.deck', location: 'p7 "nerves & lymphatics"' },
      { ref: 'hss.thorax.deck', location: 'p12 "1st thoracic vertebra"' },
      { ref: 'hss.thorax.deck', location: 'p13 "12th thoracic vertebra"' },
      { ref: 'hss.thorax.deck', location: 'p15 "phrenic nerve (L & R)"' },
      { ref: 'hss.thorax.deck', location: 'p15 "central tendon (green)"' },
      { ref: 'hss.thorax.deck', location: 'p16 "Phrenic veins drain into the IVC"' },
      { ref: 'hss.thorax.deck', location: 'p19 "@ T4/T5 vertebral level"' },
      { ref: 'hss.thorax.deck', location: 'p22 "= bifurcation of bronchi"' },
      { ref: 'hss.thorax.deck', location: 'p29 "Axillary vein (mainly)"' },
    ],
  },

/* ========================================================================
   * WEEK 5: CENTRAL NERVOUS SYSTEM (Module 2)
   * ======================================================================== */
  {
    id: 'hss2011-cns-spinal-cord-meninges',
    subject: 'HSS2011', unit: 'hss.m2', type: 'definition',
    title: 'Meninges, spinal nerves, roots and rami',
    tags: ['neuroanatomy', 'cns', 'spine', 'high-yield'],
    lesson: {
      explanation: 'The central nervous system is wrapped in three connective-tissue membranes, the meninges. From outside in they are the dura mater (thick, tough, and carrying a system of venous drainage), the arachnoid mater (with arachnoid trabeculae stretching across to the pia), and the pia mater (a meshwork of elastic and collagen fibres, the innermost layer, holding blood vessels against the nervous tissue). Two spaces matter: the subdural space between dura and arachnoid, and the subarachnoid space between arachnoid and pia, which is filled with cerebrospinal fluid (CSF). In the vertebral column there is also an epidural space between the spinal dura and the bone, where analgesics and anaesthesia can be given. Within the cranium the dura folds inward as partitions: the falx cerebri between the two cerebral hemispheres, and the tentorium cerebelli, which separates the occipital lobes of the cerebrum from the cerebellum. A peripheral nerve is bundled connective tissue: endoneurium around each fibre, perineurium around a fascicle of fibres, epineurium around the whole nerve. There are 31 pairs of spinal nerves. Each attaches to the cord by two roots: the dorsal (posterior) root carries sensory fibres in and bears the dorsal root ganglion, a swollen part containing the cell bodies of the sensory (peripheral) neurons; the ventral (anterior) root carries motor fibres out from the anterior horn. Beyond the point where the roots join, the nerve gives distal branches: a dorsal ramus, a ventral ramus, and a meningeal branch. A dermatome is the specific bilateral strip of skin monitored by a single pair of spinal nerves (except C1). Where ventral rami of adjacent nerves interweave into a complex network, that network is a nerve plexus: the cervical plexus (C1–C4), brachial plexus (C5–T1), lumbar plexus (T12–L4), sacral plexus (L4–S4) and coccygeal plexus.',
      plain: 'Three membranes wrap the CNS: dura (tough outer), arachnoid (middle web), pia (delicate inner). CSF sits in the subarachnoid space, between arachnoid and pia; in the spine there is also an epidural space against the bone. The dura folds inward as the falx cerebri (between the hemispheres) and the tentorium cerebelli (cerebrum above, cerebellum below). A nerve is wrapped in three sheaths (endo-, peri-, epineurium). Each of the 31 spinal nerves has a dorsal root (sensory in, with its ganglion) and a ventral root (motor out), then splits into dorsal, ventral and meningeal branches. One skin strip per nerve pair is a dermatome; ventral rami weaving together form a plexus (cervical, brachial, lumbar, sacral, coccygeal).',
      keyFacts: [
        'Meninges outside-in: dura mater (tough, venous drainage), arachnoid mater (trabeculae), pia mater (innermost, elastic + collagen).',
        'Subarachnoid space (arachnoid ↔ pia) holds CSF; subdural space is between dura and arachnoid; spinal epidural space is between dura and bone.',
        'Dural partitions: falx cerebri between the cerebral hemispheres; tentorium cerebelli between the occipital lobes and the cerebellum.',
        'Nerve connective tissue: endoneurium (one fibre) → perineurium (a fascicle) → epineurium (the whole nerve).',
        '31 pairs of spinal nerves; each has a dorsal (sensory) root with a dorsal root ganglion and a ventral (motor) root.',
        'The dorsal root ganglion holds the cell bodies of sensory neurons.',
        'Distal branches of a spinal nerve: dorsal ramus, ventral ramus, meningeal branch.',
        'A dermatome is one bilateral skin strip per spinal nerve pair, except C1.',
        'A nerve plexus is interwoven ventral rami: cervical (C1–C4), brachial (C5–T1), lumbar (T12–L4), sacral (L4–S4), coccygeal.',
      ],
      prerequisites: ['hss2011-osteo-vertebra-parts'],
      examples: ['The denticulate ligament, extending from the pia mater to the dura mater, anchors the cord within the CSF of the subarachnoid space.'],
    },
    memory: {
      chunking: 'Meninges outside to inside: Dura (Durable), Arachnoid (spider), Pia (delicate) — DAP.',
      comparison: 'Subdural = dura ↔ arachnoid. Subarachnoid = arachnoid ↔ pia, and this is the one with CSF. Epidural (spine only) = dura ↔ bone, where the anaesthetist works.',
      firstLetter: 'Plexus ladder top to bottom: Cervical, Brachial, Lumbar, Sacral, Coccygeal — "Cows Bring Large Sacks Casually".',
    },
    practice: [
      {
        type: 'cloze',
        prompt: 'The CSF-filled space between the arachnoid mater and the pia mater is the ______ space.',
        accept: ['subarachnoid'],
        explanation: 'Subarachnoid space — arachnoid above, pia below, CSF between. The subdural space is one layer more superficial.',
        src: { ref: 'hss.fib5yr', location: 'p15 subarachnoid space' }
      },
      {
        type: 'cloze',
        prompt: 'The dural partition that separates the occipital lobes of the cerebrum from the cerebellum is the ______ ______.',
        accept: ['tentorium cerebelli', 'tentorium'],
        explanation: 'Model answer: tentorium cerebelli. The falx cerebri, by contrast, sits between the two cerebral hemispheres.',
        src: { ref: 'hss.revans', location: 'Module 2.1, Fill-in-blanks 1' }
      },
      {
        type: 'mcq',
        prompt: 'The connective-tissue sheath that surrounds an entire peripheral nerve is the:',
        options: ['Endoneurium', 'Perineurium', 'Epineurium', 'Periosteum'],
        answer: 2,
        explanation: 'Endoneurium wraps one fibre, perineurium a fascicle, epineurium the whole nerve.',
        src: { ref: 'hss.2.2', location: 'p6 Spinal Nerves — connective tissue' }
      },
      {
        type: 'cloze',
        prompt: 'The swollen part of the dorsal root that contains the cell bodies of sensory neurons is the dorsal root ______.',
        accept: ['ganglion'],
        explanation: 'The dorsal root ganglion houses the somata of the primary sensory (afferent) neurons.',
        src: { ref: 'hss.mooc3', location: 'p6 Ganglion' }
      },
      {
        type: 'mcq',
        prompt: 'The brachial plexus is formed from the interwoven ventral rami of:',
        options: ['C1–C4', 'C5–T1', 'T12–L4', 'L4–S4'],
        answer: 1,
        explanation: 'Brachial plexus = C5–T1. C1–C4 is cervical, T12–L4 lumbar, L4–S4 sacral.',
        src: { ref: 'hss.mooc3', location: 'p7 Brachial Plexus (C5-T1)' }
      },
      {
        type: 'cloze',
        prompt: 'The bilateral strip of skin monitored by a single pair of spinal nerves is called a ______.',
        accept: ['dermatome'],
        explanation: 'One dermatome per spinal nerve pair, with C1 the exception (it has no cutaneous territory).',
        src: { ref: 'hss.2.2', location: 'p8 Dermatome' }
      },
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'A needle is advanced into the vertebral canal for spinal anaesthesia and CSF appears at the hub. Which meningeal layers has the needle crossed, and which space is its tip in?',
        model: 'It has passed through the epidural space (between bone and dura), then pierced the dura mater and the arachnoid mater. The tip now lies in the subarachnoid space, between arachnoid and pia, which is the CSF compartment — hence the fluid at the hub.',
        rubric: ['Names the epidural space against the bone', 'States dura and arachnoid are pierced', 'Places the tip in the CSF-filled subarachnoid space']
      }
    ],
    commonMistakes: [
      'Putting CSF in the subdural or epidural space — CSF is in the subarachnoid space, between arachnoid and pia.',
      'Swapping falx cerebri (between the hemispheres) and tentorium cerebelli (cerebrum vs cerebellum).',
      'Calling the whole-nerve sheath the perineurium — perineurium wraps a fascicle; the epineurium wraps the nerve.',
      'Assuming every spinal nerve has a dermatome — C1 typically has none.',
    ],
    skills: [
      'Name a space by the two layers it separates: sub-DURAL is under the dura (dura ↔ arachnoid); sub-ARACHNOID is under the arachnoid (arachnoid ↔ pia) and holds the CSF. The prefix names the layer above the gap.',
      'The three nerve sheaths nest by size: endoneurium (fibre) inside perineurium (fascicle) inside epineurium (nerve) — smallest Greek stem, smallest structure.',
      'A plexus is only ever ventral rami. Dorsal rami stay segmental and supply the back; the limbs need rami mixed together, which is what cervical/brachial/lumbar/sacral plexuses do.',
    ],
    selfCheck: 'From a blank page: the three meninges outside-in and the space each border makes, which two dural folds and what each separates, the three nerve sheaths by size, what each spinal-nerve root and ramus carries, and the five nerve plexuses with their spinal levels.',
    visuals: [
      { model: { layer: 'nervous', meshes: ['Anterior root of spinal nerve', 'Posterior root of spinal nerve', 'Spinal ganglion', 'Spinal dura'], label: 'Spinal nerve roots and the dural sleeve', caption: 'The posterior (dorsal) root carries sensory fibres in and bears the spinal (dorsal root) ganglion; the anterior (ventral) root carries motor fibres out; the spinal dura is the tough outer meningeal sleeve.' } },
      { schematic: 'nervousDivisions' },
      { gen: true },
    ],
    sourceRefs: [
      { ref: 'hss.mooc2', location: 'p10 "Subdural space" (dura ↔ arachnoid) and "Subarachnoid space" (arachnoid ↔ pia); three membranes dura, arachnoid, pia mater' },
      { ref: 'hss.mooc2', location: 'p11 "Subarachnoid space is filled with CSF"; dura is "thick and tough" and "provides a system of venous drainage"; epidural space between spinal dura and vertebral bone' },
      { ref: 'hss.4.2', location: 'p24 "Separates occipital lobes of cerebral hemispheres from cerebellum" (tentorium cerebelli); "Falx Cerebri" separates the cerebral hemispheres' },
      { ref: 'hss.4.2', location: 'p25 dura mater periosteal and meningeal layers, dural sinus, "Falx cerebri", "Falx cerebelli", arachnoid mater and "Subarachnoid space", pia mater' },
      { ref: 'hss.2.2', location: 'p6 "Epineurium" around the nerve, "Perineurium" around a fascicle, "Endoneurium" around a fibre' },
      { ref: 'hss.2.2', location: 'p7 "Dorsal root ganglion"; proximal branches dorsal root and ventral root, distal branches dorsal ramus, ventral ramus, meningeal branch' },
      { ref: 'hss.2.2', location: 'p8 "The specific bilateral region of the skin surface monitored by a single pair of spinal nerves (except C1)"' },
      { ref: 'hss.mooc3', location: 'p6 "Ganglion" is a "swollen part" that "contain somas of peripheral neurons"; dorsal root "carries sensory signals to dorsal horn"' },
      { ref: 'hss.mooc3', location: 'p7 "31 pairs"; "Cervical Plexus (C1-C4)", "Brachial Plexus (C5-T1)", "Lumbar Plexus (T12-L4)", "Sacral Plexus (L4-S4)", "Coccygeal Plexus"' },
      { ref: 'hss.fib5yr', location: 'p15 "is the innermost meningeal layer" (pia mater); "A complex, interwoven network of nerves is called a nerve plexus"' },
      { ref: 'hss.fib5yr', location: 'p15 "Denticulate ligament extends from the pia mater to the dura mater"' },
      { ref: 'hss.revans', location: 'Module 2.1 Fill-in-blanks 1 "Tentorium cerebelli" and 5 "Subarachnoid"' },
    ],
  },

  {
    id: 'hss2011-m2-reflex-arc',
    subject: 'HSS2011', unit: 'hss.m2', type: 'sequence',
    title: 'The reflex arc: somatic, visceral, monosynaptic and polysynaptic',
    tags: ['neuroanatomy', 'reflex', 'high-yield'],
    lesson: {
      explanation: 'A reflex is a quick, involuntary reaction of muscle to a stimulus. A somatic reflex produces a response of skeletal muscle — the quick withdrawal of your hand from a hot stove — and it runs over a fixed neural pathway called a reflex arc. The somatic reflex arc has five steps in order: somatic receptor → afferent (sensory) nerve fibre → an integrating centre in the spinal cord or brainstem → efferent (motor) nerve fibre → skeletal muscle. The signal never travels to the brain for processing, which is why the reaction is fast. Reflex arcs come in two forms. A monosynaptic reflex has no interneuron between the afferent and the efferent neuron — the sensory neuron synapses straight onto the motor neuron; the patellar (knee-jerk) reflex is the example. A polysynaptic reflex, which is the majority, involves one or more interneurons between the afferent and efferent neurons; the withdrawal reflex is the example. A visceral (autonomic) reflex is unconscious, automatic and stereotyped, involves visceral receptors and effectors, and has a somewhat slower response; its arc is afferent neurons leading to the CNS, interneurons in the CNS, then efferent neurons and effectors. Paralysis is a common consequence of spinal cord trauma: paraplegia is paralysis of both lower limbs, from cord lesions at level T1 to L1; quadriplegia is paralysis of all four limbs, from lesions above level C5.',
      plain: 'A reflex is an automatic, fast muscle response. The somatic reflex arc goes: receptor → sensory fibre in → spinal cord or brainstem → motor fibre out → skeletal muscle, skipping the brain so it is quick. Monosynaptic reflexes (knee-jerk) wire the sensory neuron straight to the motor neuron; polysynaptic reflexes (withdrawal, the majority) add one or more interneurons. Visceral reflexes are the unconscious version, with visceral receptors and effectors and a slower response. Cord trauma paralyses: paraplegia = both legs (lesion T1–L1); quadriplegia = all four limbs (lesion above C5).',
      keyFacts: [
        'Reflex = a quick, involuntary reaction of muscle to a stimulus.',
        'Somatic reflex arc, in order: somatic receptor → afferent fibre → integrating centre (cord/brainstem) → efferent fibre → skeletal muscle.',
        'The signal does not reach the brain, which is why the response is fast.',
        'Monosynaptic reflex: no interneuron between afferent and efferent neuron (e.g. patellar reflex).',
        'Polysynaptic reflex: one or more interneurons between afferent and efferent neurons; the majority (e.g. withdrawal reflex).',
        'Visceral (autonomic) reflex: unconscious, stereotyped, visceral receptors and effectors, somewhat slower.',
        'Paraplegia = both lower limbs paralysed, from cord lesions at T1–L1.',
        'Quadriplegia = all four limbs paralysed, from lesions above C5.',
      ],
      prerequisites: ['hss2011-m2-cns-basics'],
      examples: ['Touching a hot stove: skin nociceptor → sensory fibre → interneurons in the cord → motor fibre → flexor muscles pull the hand away, all before the pain is consciously felt.'],
    },
    memory: {
      chunking: 'Five links, receptor to muscle: Receptor, Afferent, Centre, Efferent, Effector — "RACE, Effector" out of the fire.',
      comparison: 'Mono = one synapse, no interneuron, knee-jerk. Poly = many synapses, interneurons, withdrawal. "Mono" literally counts the missing middle neuron.',
      mnemonic: 'ParaPLEGIA — PL for "pins/legs", two limbs. QUADriplegia — quad = four limbs. The higher the lesion, the more that is lost.',
    },
    practice: [
      { type: 'sequence', prompt: 'Put the five components of a somatic reflex arc in the order a signal travels them.',
        items: ['Somatic receptor', 'Afferent (sensory) nerve fibre', 'Integrating centre in the spinal cord or brainstem', 'Efferent (motor) nerve fibre', 'Skeletal muscle'],
        explanation: 'Receptor detects the stimulus, the afferent fibre carries it in, the cord or brainstem integrates, the efferent fibre carries the command out, the skeletal muscle responds.',
        src: { ref: 'hss.mooc3', location: 'p8 somatic reflex arc pathway' } },
      { type: 'mcq', prompt: 'Which reflex has NO interneuron between the afferent and efferent neuron?', options: ['Withdrawal reflex', 'Patellar (monosynaptic) reflex', 'Crossed-extensor reflex', 'Visceral reflex'], answer: 1,
        explanation: 'The patellar reflex is monosynaptic — the sensory neuron synapses directly on the motor neuron. The others are polysynaptic.',
        src: { ref: 'hss.mooc3', location: 'p8 Monosynaptic Reflex' } },
      { type: 'cloze', prompt: 'Paralysis of both lower limbs from a spinal cord lesion between levels T1 and L1 is called ______.', accept: ['paraplegia'],
        explanation: 'Paraplegia — both lower limbs, T1–L1 lesion. A lesion above C5 gives quadriplegia (all four limbs).',
        src: { ref: 'hss.mooc3', location: 'p8 Paraplegia' } },
      { type: 'mcq', prompt: 'Compared with a somatic reflex, a visceral (autonomic) reflex is:', options: ['Faster and consciously controlled', 'Unconscious, stereotyped and somewhat slower', 'Confined to skeletal muscle', 'Always monosynaptic'], answer: 1,
        explanation: 'Visceral reflexes are unconscious, automatic, stereotyped, use visceral receptors and effectors, and respond somewhat more slowly.',
        src: { ref: 'hss.2.2', location: 'p25 Visceral Reflex' } },
    ],
    application: [
      { type: 'scenario', prompt: 'Explain why you have already pulled your hand off a hot surface before you consciously feel the pain.',
        model: 'The withdrawal is a polysynaptic somatic reflex. The nociceptor signal runs in along an afferent fibre to interneurons in the spinal cord, which drive efferent motor fibres to the flexor muscles — receptor, afferent, centre, efferent, effector. Because the arc is completed in the cord and does not wait on the brain, the movement happens first; the pain signal ascending to the cortex arrives afterwards.',
        rubric: ['Identifies it as a spinal (polysynaptic) reflex', 'Lists the arc components in order', 'Explains the arc bypasses the brain, so movement precedes conscious pain'] },
    ],
    commonMistakes: [
      'Saying the reflex signal goes up to the brain and back — the arc is completed in the cord or brainstem.',
      'Calling the withdrawal reflex monosynaptic — it is polysynaptic; only the stretch/patellar reflex is monosynaptic.',
      'Swapping the lesion levels: paraplegia is T1–L1, quadriplegia is above C5.',
    ],
    skills: [
      '"Mono-" and "poly-" count interneurons, not synapses you can see: monosynaptic = zero interneurons (one synapse in the CNS), polysynaptic = one or more. The knee-jerk is the only common monosynaptic reflex.',
      'Read a cord-injury level from the limbs: all four limbs affected means the lesion is high (cervical, above C5); legs only means it is at or below the thoracolumbar junction (T1–L1).',
      'Somatic vs visceral reflex is just the effector: skeletal muscle and conscious-speed, or smooth/cardiac muscle and glands, unconscious and slower.',
    ],
    selfCheck: 'From a blank page: the five reflex-arc components in order, what makes a reflex mono- versus polysynaptic with an example of each, how a visceral reflex differs, and the lesion level for paraplegia versus quadriplegia.',
    visuals: [
      { fig: 'reflexArc' },
      { model: { layer: 'nervous', meshes: ['Posterior horn of spinal cord', 'Anterior horn of spinal cord', 'Spinal ganglion'], label: 'Where the arc is integrated', caption: 'The afferent fibre enters via the posterior horn; the efferent motor neuron cell body sits in the anterior horn — the integrating centre of a spinal reflex.' } },
      { gen: true },
    ],
    sourceRefs: [
      { ref: 'hss.mooc3', location: 'p8 "quick and involuntary reaction of muscles to stimulation"; somatic arc "afferent nerve fiber" → integrated center → "efferent nerve fiber" → "skeletal muscle"' },
      { ref: 'hss.mooc3', location: 'p8 "No interneuron between the afferent and efferent neuron" (monosynaptic, patellar); "Involves one or more interneurons between the afferent and efferent neurons" (polysynaptic, withdrawal)' },
      { ref: 'hss.mooc3', location: 'p8 "paralysis of both lower limbs due to spinal cord lesions at level T1 to L1" (paraplegia); "the paralysis of all four limbs resulting from lesions above level C5" (quadriplegia)' },
      { ref: 'hss.2.2', location: 'p24 ANS is "Responsible for visceral reflexes"' },
      { ref: 'hss.2.2', location: 'p25 "Involves visceral receptors and effectors"; "Somewhat slower response"; afferent neurons to CNS, interneurons in the CNS, efferent neurons and effectors' },
      { ref: 'hss.2.2', location: 'p26 "Autonomic Reflex Arc"' },
    ],
  },

  {
    id: 'hss2011-m2-autonomic-nervous-system',
    subject: 'HSS2011', unit: 'hss.m2', type: 'comparison',
    title: 'The autonomic nervous system: sympathetic vs parasympathetic',
    tags: ['neuroanatomy', 'autonomic', 'high-yield'],
    lesson: {
      explanation: 'The autonomic nervous system (ANS) is the visceral motor system: it controls glands, cardiac muscle and smooth muscle, and it drives the visceral reflexes. Its motor output always runs over a two-neuron chain. The preganglionic neuron has its cell body (soma) in the brainstem or spinal cord and its axon ends in an autonomic ganglion; the postganglionic neuron has its soma in that ganglion and its axon runs on to the target organ. The ANS has two divisions in constant balance (autonomic tone). The SYMPATHETIC division is the thoracolumbar division — its nuclei arise in the thoracic and lumbar cord. It has relatively short preganglionic fibres and relatively long postganglionic fibres, because its ganglia are close to the cord: the sympathetic chain (paravertebral) ganglia. Preganglionic fibres are myelinated and reach a chain ganglion by a white communicating ramus; postganglionic fibres are unmyelinated and leave by various routes. The sympathetic division mediates "fight or flight" — arousal, competition, stress, danger. The PARASYMPATHETIC division is the craniosacral division. It has long preganglionic fibres that end in terminal ganglia in or near the target organ, and very short postganglionic fibres, so its stimulation is more selective. It mediates "rest and digest", the calming effect. Its cranial outflow travels in the oculomotor nerve (CN III), the facial nerve (CN VII) and the glossopharyngeal nerve (CN IX) to the head, and in the vagus nerve (CN X) to the thoracic and abdominal viscera.',
      plain: 'The ANS is the motor system for glands, heart muscle and smooth muscle, wired as a two-neuron chain: preganglionic (soma in brainstem/cord) → ganglion → postganglionic (soma in ganglion) → organ. Sympathetic = thoracolumbar, short preganglionic / long postganglionic, ganglia in the sympathetic chain beside the spine, preganglionic fibres myelinated and entering via a white communicating ramus, "fight or flight". Parasympathetic = craniosacral, long preganglionic / very short postganglionic, ganglia in the organ wall, more selective, "rest and digest", carried to the head by CN III, VII, IX and to the viscera by CN X (vagus).',
      keyFacts: [
        'ANS = visceral motor system controlling glands, cardiac muscle and smooth muscle.',
        'Two-neuron chain: preganglionic soma in brainstem/cord → ganglion; postganglionic soma in ganglion → target.',
        'Sympathetic = thoracolumbar; short preganglionic, long postganglionic fibres.',
        'Sympathetic ganglia = the sympathetic chain (paravertebral) ganglia; "fight or flight".',
        'Sympathetic preganglionic fibres are myelinated and reach a chain ganglion by a white communicating ramus; postganglionic fibres are unmyelinated.',
        'Parasympathetic = craniosacral; long preganglionic, very short postganglionic fibres; more selective; "rest and digest".',
        'Parasympathetic ganglia are terminal ganglia in or near the target organ.',
        'Parasympathetic cranial outflow: CN III, VII, IX to the head; CN X (vagus) to the thoracic and abdominal viscera.',
        'Autonomic tone = the running balance between the two divisions.',
      ],
      prerequisites: ['hss2011-m2-cns-basics'],
      examples: ['The pupillary constrictor and pupillary dilator are an antagonistic pair both controlled by the ANS — parasympathetic constriction (CN III) versus sympathetic dilation.'],
    },
    memory: {
      comparison: 'Sympathetic: THORACOLUMBAR, ganglia near the cord, so SHORT pre / LONG post. Parasympathetic: CRANIOSACRAL, ganglia in the organ, so LONG pre / SHORT post. The fibre lengths follow the ganglion position.',
      firstLetter: 'Parasympathetic cranial nerves: 3, 7, 9, 10 — "1900 and 3-7" — CN III, VII, IX to the head, CN X (vagus) to the chest and gut.',
      mnemonic: 'Sympathetic = Stress ("fight or flight"); Parasympathetic = Peace ("rest and digest").',
    },
    practice: [
      { type: 'comparison', prompt: 'Which set of features describes the SYMPATHETIC division?', options: ['Craniosacral; long preganglionic, very short postganglionic; ganglia in the organ wall', 'Thoracolumbar; short preganglionic, long postganglionic; sympathetic chain ganglia', 'Thoracolumbar; long preganglionic, short postganglionic; terminal ganglia', 'Craniosacral; short preganglionic, long postganglionic; chain ganglia'], answer: 1,
        explanation: 'Sympathetic = thoracolumbar, with ganglia close to the cord (the sympathetic chain), so its preganglionic fibres are short and its postganglionic fibres long.',
        src: { ref: 'hss.2.2', location: 'p29 Sympathetic Division' } },
      { type: 'cloze', prompt: 'Parasympathetic fibres reach the thoracic and abdominal viscera in cranial nerve ______, the vagus.', accept: ['x', '10', 'ten', 'cn x', 'vagus'],
        explanation: 'CN X (vagus) is the visceral parasympathetic outflow; CN III, VII and IX carry parasympathetic fibres to the head.',
        src: { ref: 'hss.2.2', location: 'p32 Parasympathetic Division — Innervation to viscera' } },
      { type: 'cloze', prompt: 'The parasympathetic division is said to function during "______ and digest".', accept: ['rest'],
        explanation: 'Rest and digest — the calming division. The sympathetic division is "fight or flight".',
        src: { ref: 'hss.fib5yr', location: 'p15 parasympathetic "rest and digest"' } },
      { type: 'mcq', prompt: 'Sympathetic preganglionic fibres reach a chain ganglion by way of the:', options: ['Grey communicating ramus (unmyelinated)', 'White communicating ramus (myelinated)', 'Dorsal ramus', 'Meningeal branch'], answer: 1,
        explanation: 'Preganglionic sympathetic fibres are myelinated and travel to the chain ganglia via a white communicating ramus; postganglionic fibres are unmyelinated.',
        src: { ref: 'hss.2.2', location: 'p30 Communicating Rami' } },
      { type: 'cloze', prompt: 'The visceral motor system that controls glands, cardiac muscle and smooth muscle is the ______ nervous system.', accept: ['autonomic'],
        explanation: 'Model answer: autonomic.',
        src: { ref: 'hss.revans', location: 'Module 2.2, Fill-in-blanks 5' } },
    ],
    application: [
      { type: 'scenario', prompt: 'Why does a single parasympathetic signal act on one organ quite selectively, while a sympathetic discharge tends to affect the whole body at once?',
        model: 'Parasympathetic ganglia are terminal ganglia sitting in or beside the target organ, so a preganglionic fibre reaches just that one organ and the very short postganglionic fibre acts locally — the effect is selective. Sympathetic ganglia lie in the paravertebral chain beside the cord; a preganglionic fibre entering the chain can spread up and down it and synapse on many postganglionic neurons, whose long axons then reach targets all over the body, so the discharge is diffuse.',
        rubric: ['Places parasympathetic ganglia in/near the organ (selective)', 'Places sympathetic ganglia in the paravertebral chain', 'Explains divergence along the chain gives a body-wide sympathetic effect'] },
    ],
    commonMistakes: [
      'Swapping the outflows: sympathetic is thoracolumbar, parasympathetic is craniosacral.',
      'Saying sympathetic preganglionic fibres are long — they are short, because the chain ganglia are close to the cord.',
      'Forgetting the vagus (CN X): the head gets CN III, VII, IX, but the chest and abdomen get CN X.',
      'Calling the white communicating ramus a postganglionic route — it carries myelinated preganglionic fibres into the chain.',
    ],
    skills: [
      'Fibre length is a consequence of ganglion position, so you only need to memorise one: sympathetic ganglia are near the cord (short pre, long post); parasympathetic ganglia are in the organ (long pre, short post).',
      'The revision blanks reward two fixed phrases: sympathetic "fight or flight", parasympathetic "rest and digest". Attach every other feature to whichever phrase it belongs with.',
      'White ramus = myelinated = preganglionic sympathetic going in; grey ramus = unmyelinated = postganglionic coming back out. Colour tracks myelination tracks direction.',
    ],
    selfCheck: 'From a blank page: what the ANS controls, the two-neuron chain with where each soma sits, and for each division its spinal outflow, its relative fibre lengths, where its ganglia lie, its catchphrase, and (parasympathetic) its four cranial nerves.',
    visuals: [
      { fig: 'ansSomatic' },
      { model: { layer: 'nervous', meshes: ['Sympathetic trunk', 'Ganglia of sympathetic trunk', 'Vagus nerve (X)'], label: 'Sympathetic chain and the vagus', caption: 'The sympathetic trunk with its paravertebral (chain) ganglia runs beside the vertebral column; the vagus nerve (CN X) carries the parasympathetic outflow to the thoracic and abdominal viscera.' } },
      { gen: true },
    ],
    sourceRefs: [
      { ref: 'hss.2.2', location: 'p24 ANS is a "Visceral motor system" that "Controls glands, cardiac muscle, and smooth muscle"' },
      { ref: 'hss.2.2', location: 'p27 sympathetic "Fight or flight", parasympathetic "Rest and digest"; "Balance between sympathetic and parasympathetic" (autonomic tone)' },
      { ref: 'hss.2.2', location: 'p28 "Soma in ganglion" (postganglionic neuron); preganglionic neuron soma in the brainstem or spinal cord, axon terminating in the ganglion' },
      { ref: 'hss.2.2', location: 'p29 sympathetic is the "Thoracolumbar" division, "Relatively short" preganglionic and long postganglionic fibres, "Sympathetic chain ganglia (paravertebral" ganglia)' },
      { ref: 'hss.2.2', location: 'p30 preganglionic fibres "Myelinated" and "Travel to chain ganglia by a white communicating ramus"; postganglionic "Unmyelinated"' },
      { ref: 'hss.2.2', location: 'p32 parasympathetic "Craniosacral division", "Long preganglionic fibers" ending "in terminal ganglia in or near the target organ", "Very short postganglionic fibers"; outflow via "Oculomotor nerve (III)", "Facial nerve (VII)", "Glossopharyngeal nerve (IX)" and "Vagus nerve (X)"' },
      { ref: 'hss.fib5yr', location: 'p15 pupillary constrictor and dilator "controlled by the autonomic nervous system"' },
      { ref: 'hss.revans', location: 'Module 2.2 Fill-in-blanks 5 "Autonomic"' },
    ],
  },

  {
    id: 'hss2011-m2-neurons-glia',
    subject: 'HSS2011', unit: 'hss.m2', type: 'matching',
    title: 'Neurons and the six glial cell types',
    tags: ['neuroanatomy', 'histology', 'high-yield'],
    lesson: {
      explanation: 'A neuron has three parts: a cell body, dendrites and an axon. Around the neurons are the glial (neuroglial) cells, and the course names six types by their job. Oligodendrocytes (in the CNS) and Schwann cells (in the PNS) provide structure and insulation — they build the myelin sheath. Microglia are the phagocytes: waste removal. Ependymal cells secrete cerebrospinal fluid. Astrocytes exchange chemicals between the blood and the neuron; they are the most abundant glial cell in the CNS, and they stimulate the formation of the blood–brain barrier, which inhibits the passage of harmful materials from blood into brain tissue. Radial glial cells guide neuron development (migration) in the embryo. The blood–brain barrier itself blocks chemicals and micro-organisms; the capillaries in the brain are lined with endothelial cells that form its physical seal.',
      plain: 'A neuron = cell body + dendrites + axon. Six glial types by job: oligodendrocytes (CNS myelin) and Schwann cells (PNS myelin); microglia (phagocytic waste removal); ependymal cells (make CSF); astrocytes (chemical exchange between blood and neuron — the most abundant CNS glia, and they induce the blood–brain barrier); radial glia (guide neuron migration in the embryo). The blood–brain barrier blocks chemicals and microbes; brain capillaries are lined by tight endothelial cells.',
      keyFacts: [
        'Neuron = cell body + dendrites + axon.',
        'Oligodendrocytes myelinate CNS axons; Schwann cells myelinate PNS axons.',
        'Microglia are phagocytes — waste and pathogen removal.',
        'Ependymal cells secrete (and help circulate) cerebrospinal fluid.',
        'Astrocytes exchange chemicals between blood and neuron.',
        'Astrocytes are the MOST ABUNDANT glial cell in the CNS and stimulate formation of the blood–brain barrier.',
        'Radial glial cells guide neuron development / migration in the embryo.',
        'Blood–brain barrier: blocks chemicals and micro-organisms; brain capillaries are lined by endothelial cells.',
      ],
      prerequisites: ['hss2011-m2-cns-basics'],
      examples: ['A past-paper blank tested every year: "Astrocytes are the most abundant glial cells in the CNS. They stimulate the formation of the blood-brain barrier."'],
    },
    memory: {
      firstLetter: 'Six glia: Oligodendrocyte, Schwann, Microglia, Ependymal, Astrocyte, Radial — "Old Schwann Made Every Astronaut Run".',
      comparison: 'Oligodendrocyte = CNS myelin, one cell to several axons. Schwann = PNS myelin, one cell to one segment. Same product, opposite postcode.',
      chunking: 'Astrocyte is the exam favourite: star-shaped, most abundant, and the one that builds the blood–brain barrier with the capillary endothelium.',
    },
    practice: [
      { type: 'matching', prompt: 'Match each glial cell to its function.',
        pairs: [
          ['Oligodendrocyte', 'Myelin sheath in the CNS'],
          ['Schwann cell', 'Myelin sheath in the PNS'],
          ['Microglia', 'Phagocytic waste removal'],
          ['Ependymal cell', 'Secretes cerebrospinal fluid'],
          ['Astrocyte', 'Chemical exchange between blood and neuron; induces the blood–brain barrier'],
          ['Radial glial cell', 'Guides neuron migration in the embryo'],
        ],
        explanation: 'Two myelin makers (CNS vs PNS), a phagocyte, a CSF secretor, the blood–brain-barrier inducer, and an embryonic guide.',
        src: { ref: 'hss.mooc3', location: 'p23 Neuron and Glia' } },
      { type: 'mcq', prompt: 'Which glial cell is the most abundant in the CNS and stimulates formation of the blood–brain barrier?', options: ['Microglia', 'Oligodendrocyte', 'Astrocyte', 'Ependymal cell'], answer: 2,
        explanation: 'Astrocytes — most abundant CNS glia; they induce the blood–brain barrier with the capillary endothelial cells.',
        src: { ref: 'hss.fib5yr', location: 'p14 astrocytes and the blood-brain barrier' } },
      { type: 'cloze', prompt: 'Brain capillaries that form the blood–brain barrier are lined by tight ______ cells.', accept: ['endothelial'],
        explanation: 'Endothelial cells line the brain capillaries and form the physical barrier that blocks chemicals and micro-organisms.',
        src: { ref: 'hss.mooc3', location: 'p23 Blood-Brain Barrier' } },
      { type: 'cloze', prompt: 'The three basic parts of a neuron are the cell body, the dendrites and the ______.', accept: ['axon'],
        explanation: 'Cell body, dendrites, axon.',
        src: { ref: 'hss.mooc3', location: 'p23 Neurons' } },
    ],
    application: [
      { type: 'scenario', prompt: 'A drug given into the bloodstream fails to reach a useful concentration in brain tissue, though it works well elsewhere. Which structure explains this, and which two cell types build it?',
        model: 'The blood–brain barrier. It blocks the passage of many chemicals and all micro-organisms from blood into brain tissue. It is built by the endothelial cells lining the brain capillaries, sealed tightly together, together with astrocytes, which stimulate the barrier’s formation and are the most abundant glial cells in the CNS.',
        rubric: ['Names the blood–brain barrier', 'Names capillary endothelial cells', 'Names astrocytes as the inducing glia'] },
    ],
    commonMistakes: [
      'Naming oligodendrocytes for PNS myelin — that is Schwann cells; oligodendrocytes are CNS.',
      'Saying microglia or ependymal cells are the most abundant CNS glia — it is astrocytes.',
      'Forgetting that the blood–brain barrier is endothelial cells PLUS astrocyte induction, not astrocytes alone.',
    ],
    skills: [
      'The astrocyte facts cluster: star-shaped, most abundant CNS glia, chemical go-between for blood and neuron, and blood–brain-barrier inducer. The past paper wants all four in one sentence.',
      'Split the six glia by nervous system first: only Schwann cells are PNS; the other five (oligodendrocyte, microglia, ependymal, astrocyte, radial) are CNS.',
      'Match by verb: myelinate, phagocytose, secrete CSF, exchange chemicals, guide migration — each verb belongs to exactly one cell.',
    ],
    selfCheck: 'From a blank page: the three parts of a neuron, all six glial types with one function each, which cell myelinates where, and the full astrocyte–blood–brain-barrier sentence.',
    visuals: [
      { fig: 'glialTypes' },
      { gen: true },
    ],
    sourceRefs: [
      { ref: 'hss.mooc3', location: 'p23 neuron = "Cell body", "Dendrites", "Axon"; glia — oligodendrocytes and Schwann cells for "myelin sheath", microglia "Waste removal (phagocyte)", ependymal cells "Secrete CSF", astrocytes "Exchange chemical between blood & neuron", radial glia "Guide neuron development in embryo"' },
      { ref: 'hss.mooc3', location: 'p23 "Blood-Brain Barrier" — "Chemical and microorganism are blocked", capillaries "lined with endothelial cells"' },
      { ref: 'hss.2.3', location: 'p8 white matter "consists of myelinated axons"' },
      { ref: 'hss.fib5yr', location: 'p14 "Astrocytes are the most abundant glial cells in the CNS"; they "stimulate the formation of blood-brain barrier"' },
      { ref: 'hss.revans', location: 'Module 2.3 MCQ 3 (glial cell myelinating in the PNS = Schwann cells)' },
    ],
  },

  {
    id: 'hss2011-m2-cerebellum',
    subject: 'HSS2011', unit: 'hss.m2', type: 'definition',
    title: 'The cerebellum: vermis, folia, arbor vitae and Purkinje cells',
    tags: ['neuroanatomy', 'cerebellum'],
    lesson: {
      explanation: 'The lecture treats the cerebellum on a single slide, and this lesson stays within it. The cerebellum has two cerebellar hemispheres joined across the midline by the vermis, whose name means a wormlike bridge. Its surface is folded into thin ridges called folia (the cerebellar equivalent of gyri). Internally, the white matter branches through the organ in a tree-like pattern called the arbor vitae, and buried within that white matter are the deep nuclei. The cortex contains Purkinje cells. The cerebellum attaches to the brainstem by the cerebellar peduncles. Functionally it is responsible for motor coordination, and it also has non-motor functions, such as a role in emotion. The tentorium cerebelli, a fold of dura, roofs the cerebellum and separates it from the occipital lobes of the cerebrum above.',
      plain: 'Everything the deck gives, on one slide: two hemispheres joined by the midline vermis ("wormlike bridge"); a folded surface of folia; a tree of white matter inside called the arbor vitae, with deep nuclei embedded in it; Purkinje cells in the cortex; cerebellar peduncles connecting it to the brainstem. Its job is motor coordination, plus non-motor roles including emotion. The tentorium cerebelli sits over it, dividing it from the occipital lobes.',
      keyFacts: [
        'Two cerebellar hemispheres joined by the midline vermis ("wormlike bridge").',
        'Surface folds = folia (equivalent to gyri).',
        'Arbor vitae = the tree-like branching white matter inside the cerebellum.',
        'Deep nuclei are embedded in the cerebellar white matter.',
        'Purkinje cells are neurons of the cerebellar cortex.',
        'The cerebellar peduncles attach the cerebellum to the brainstem.',
        'Function: motor coordination, plus non-motor functions such as emotion.',
        'The tentorium cerebelli separates the cerebellum from the occipital lobes of the cerebrum.',
      ],
      prerequisites: ['hss2011-m2-cns-basics'],
      examples: [],
      studyNote: 'Radiography framing: on a sagittal MRI the arbor vitae is the fern-like white-matter pattern in the cerebellum and the vermis is the midline slice through it — useful landmarks, but this descriptive detail goes beyond the single lecture slide, which only names the parts.',
    },
    memory: {
      wordOrigin: 'Vermis is Latin for worm — the "wormlike bridge" between the hemispheres. Arbor vitae is the "tree of life", named for the branching white matter.',
      firstLetter: 'On the slide: Hemispheres, Vermis, Peduncles, Folia, Arbor vitae, Deep nuclei, Purkinje cells — the seven labels plus one function line.',
    },
    practice: [
      { type: 'cloze', prompt: 'The midline part of the cerebellum that joins its two hemispheres is the ______.', accept: ['vermis'],
        explanation: 'Vermis — literally "worm", the "wormlike bridge" of the slide.',
        src: { ref: 'hss.2.2', location: 'p21 Vermis' } },
      { type: 'cloze', prompt: 'The tree-like branching white matter of the cerebellum is called the ______ ______.', accept: ['arbor vitae'],
        explanation: 'Arbor vitae, the "tree of life".',
        src: { ref: 'hss.2.2', location: 'p21 Arbor vitae' } },
      { type: 'mcq', prompt: 'The cerebellum is chiefly responsible for:', options: ['Language comprehension', 'Motor coordination (with non-motor roles)', 'Producing cerebrospinal fluid', 'Relaying all sensory input to the cortex'], answer: 1,
        explanation: 'The slide states motor coordination plus non-motor functions such as emotion.',
        src: { ref: 'hss.2.2', location: 'p21 Motor coordination + non-motor functions' } },
      { type: 'cloze', prompt: 'The distinctive neuron of the cerebellar cortex, and the answer to the Module 2.1 blank, is the ______ cell.', accept: ['purkinje'],
        explanation: 'Purkinje cell — one of the labelled components on the cerebellum slide.',
        src: { ref: 'hss.revans', location: 'Module 2.1, Fill-in-blanks 2' } },
    ],
    application: [
      { type: 'scenario', prompt: 'From the lecture slide alone, list what you can say about the internal structure of the cerebellum.',
        model: 'The surface is folded into folia. Inside, the white matter branches in a tree-like arbor vitae pattern. Embedded in that white matter are the deep nuclei. The cortex contains Purkinje cells. The whole organ connects to the brainstem through the cerebellar peduncles, and the two hemispheres are joined at the midline by the vermis.',
        rubric: ['Names folia, arbor vitae and deep nuclei', 'Names Purkinje cells in the cortex', 'Names the peduncles and the vermis'] },
    ],
    commonMistakes: [
      'Confusing the vermis (cerebellar midline) with the falx (between the cerebral hemispheres).',
      'Calling the arbor vitae grey matter — it is the branching white matter.',
      'Placing the cerebellum above the tentorium — the tentorium roofs it, with the occipital lobes above.',
    ],
    skills: [
      'This is a naming lesson: seven labelled parts and one function line, all from one slide. Learn the labels; do not add histological detail the lecture does not give.',
      'Cerebellar terms translate literally — vermis "worm", folia "leaves", arbor vitae "tree of life" — and the translation is the description.',
    ],
    selfCheck: 'From a blank page: the eight things named on the cerebellum slide (hemispheres, vermis, peduncles, folia, arbor vitae, deep nuclei, Purkinje cells) and its function.',
    visuals: [
      { fig: 'cerebellumSection' },
      { model: { layer: 'nervous', meshes: ['Folium of vermis', 'Superior cerebellar peduncle'], label: 'The cerebellum on the model', caption: 'A folium of the vermis (a surface fold of the midline strip) and a superior cerebellar peduncle, one of the stalks connecting the cerebellum to the brainstem.' } },
      { gen: true },
    ],
    sourceRefs: [
      { ref: 'hss.2.2', location: 'p21 "Cerebellar peduncles", "Vermis", "Folia (gyri)", "Arbor vitae", "Deep nuclei", "Purkinje cells", "Motor coordination" plus non-motor functions like emotion; two cerebellar hemispheres, the vermis a "wormlike bridge"' },
      { ref: 'hss.4.2', location: 'p24 tentorium cerebelli "Separates occipital lobes of cerebral hemispheres from cerebellum"' },
      { ref: 'hss.revans', location: 'Module 2.1, Fill-in-blanks 2 "Purkinje cell"' },
    ],
  },

  {
    id: 'hss2011-cns-brainstem-reticular',
    subject: 'HSS2011', unit: 'hss.m2', type: 'definition',
    title: 'Brainstem — medulla, pons, midbrain and reticular formation',
    tags: ['neuroanatomy', 'cns', 'brainstem', 'high-yield'],
    lesson: {
      explanation: 'The brainstem connects the spinal cord to the higher brain centres and consists of three structures: the medulla oblongata, pons, and midbrain. The medulla oblongata is the most inferior portion; on its anterior surface are the pyramids, where the descending corticospinal motor tracts cross (decussation of pyramids), establishing contralateral motor control. The medulla houses vital autonomic reflex centres: the cardiac centre (regulates heart rate and force), the vasomotor centre (controls blood pressure via vessel diameter), and respiratory rhythmicity centres. The pons lies superior to the medulla and contains transverse tracts connecting the cerebrum to the cerebellum, as well as the apneustic and pneumotaxic respiratory centres that modulate breathing rhythm. The midbrain (mesencephalon) is the most superior part, containing cerebral peduncles (descending motor fibers) and the posterior tectum with the corpora quadrigemina: two superior colliculi (visual reflex centres) and two inferior colliculi (auditory reflex centres). The reticular formation is a diffuse network of grey matter running vertically through the entire brainstem, containing the reticular activating system (RAS) essential for maintaining consciousness and alertness.',
      plain: 'The brainstem has three parts: medulla oblongata at the bottom (houses pyramids where motor tracts cross, plus vital cardiac, vasomotor, and breathing centres); pons in the middle (bridges to the cerebellum); and midbrain at the top (cerebral peduncles and corpora quadrigemina for visual and auditory reflexes). Running through the entire core of the brainstem is the reticular formation, which keeps you conscious and alert.',
      keyFacts: [
        'Brainstem consists of medulla oblongata, pons, and midbrain.',
        'Medulla oblongata houses the decussation of pyramids and vital centres (cardiac, vasomotor, respiratory).',
        'Midbrain tectum has 4 colliculi (corpora quadrigemina): superior = visual reflexes, inferior = auditory reflexes.',
        'Pons contains tracts linking the cerebrum and cerebellum, plus respiratory rhythm modulators.',
        'Reticular formation runs vertically through all levels of the brainstem to maintain consciousness (RAS).',
      ],
      prerequisites: ['hss2011-cns-spinal-cord-meninges'],
      examples: ['A blow to the back of the head affecting the reticular activating system can cause immediate loss of consciousness.'],
    },
    memory: {
      chunking: 'Brainstem top to bottom: Midbrain, Pons, Medulla (M-P-M).',
      comparison: 'Superior colliculus is for visual reflexes (eyes are above ears); Inferior colliculus is for auditory reflexes (ears are below eyes).',
    },
    practice: [
      {
        type: 'mcq',
        prompt: 'Where does the decussation of the corticospinal pyramids occur?',
        options: ['Midbrain', 'Pons', 'Medulla oblongata', 'Spinal cord'],
        answer: 2,
        explanation: 'The pyramids decussate (cross over) in the lower medulla oblongata, which is why the left motor cortex controls the right side of the body.',
        src: { ref: 'hss.2.3', location: 'p20–p23 Brainstem' }
      },
      {
        type: 'mcq',
        prompt: 'Which structure in the midbrain tectum is responsible for visual reflex responses?',
        options: ['Inferior colliculi', 'Superior colliculi', 'Cerebral peduncles', 'Substantia nigra'],
        answer: 1,
        explanation: 'The superior colliculi process visual reflexes; the inferior colliculi process auditory reflexes.',
        src: { ref: 'hss.2.3', location: 'p21 Posteriolateral view of brainstem' }
      },
      {
        type: 'cloze',
        prompt: 'The diffuse network of grey matter running vertically through all levels of the brainstem is the ______ ______.',
        accept: ['reticular formation', 'the reticular formation'],
        explanation: 'The reticular formation runs vertically through the entire brainstem, maintaining wakefulness and consciousness.',
        src: { ref: 'hss.2.3', location: 'p24 Functional brain system' }
      },
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'Why is an acute lesion or herniation compressing the medulla oblongata rapidly fatal?',
        model: 'The medulla oblongata houses the primary autonomic reflex centres vital for life: the cardiac centre, the vasomotor centre controlling blood pressure, and the respiratory rhythmicity centres. Compression causes immediate failure of spontaneous respiration and cardiac function.',
        rubric: ['Identifies cardiac centre', 'Identifies respiratory rhythmicity centres', 'Concludes failure of autonomic vital functions causes death']
      }
    ],
    commonMistakes: [
      'Swapping the reflex jobs of the superior and inferior colliculi.',
      'Placing the vital cardiac and vasomotor centres in the pons rather than the medulla.',
    ],
    skills: [
      'Localise brainstem levels: cranial nerves III & IV exit the midbrain; V, VI, VII, VIII associate with the pons; IX, X, XI, XII associate with the medulla.',
    ],
    selfCheck: 'From a blank page: list the three divisions of the brainstem, the structures forming the corpora quadrigemina, and the three vital reflex centres in the medulla.',
    sourceRefs: [{ ref: 'hss.2.3', location: 'p20–p24 Brainstem and functional brain systems' }],
  },

  {
    id: 'hss2011-cns-cerebrum-cortex-basal',
    subject: 'HSS2011', unit: 'hss.m2', type: 'definition',
    title: 'Cerebrum, functional cortical areas and basal nuclei',
    tags: ['neuroanatomy', 'cns', 'cortex', 'high-yield'],
    lesson: {
      explanation: 'The cerebrum consists of two hemispheres separated by the longitudinal fissure and joined by commissural tracts, principally the corpus callosum. The cerebral cortex is divided into four main lobes: 1) Frontal lobe contains the precentral gyrus (primary motor cortex, executing voluntary motor commands) and Broca’s area (motor speech production in dominant hemisphere); 2) Parietal lobe contains the postcentral gyrus (primary somatosensory cortex, receiving touch, pressure, pain, and temperature); 3) Occipital lobe contains the primary visual cortex; 4) Temporal lobe contains the primary auditory cortex and Wernicke’s area (language comprehension). Subcortical basal nuclei (caudate nucleus, putamen, globus pallidus) coordinate subconscious voluntary motor tone and movement patterns. The limbic system (hippocampus, cingulate gyrus, amygdala) manages emotions, drives, and memory consolidation; Wernicke’s area is cortical language cortex, not limbic.',
      plain: 'The cerebrum has two hemispheres connected by the corpus callosum. The frontal lobe executes voluntary movement (precentral gyrus) and speech (Broca’s); the parietal lobe senses touch and pain (postcentral gyrus); the occipital lobe processes sight; the temporal lobe processes hearing and language comprehension (Wernicke’s). Deep inside, basal nuclei regulate muscle tone, while the limbic system (hippocampus, amygdala, cingulate gyrus) drives emotion and memory.',
      keyFacts: [
        'Precentral gyrus (frontal lobe) = primary motor cortex.',
        'Postcentral gyrus (parietal lobe) = primary somatosensory cortex.',
        'Corpus callosum = principal commissural tract joining the two cerebral hemispheres.',
        'Wernicke’s area (temporal lobe) comprehends language; Broca’s area (frontal lobe) coordinates motor speech.',
        'Limbic system includes hippocampus, amygdala, and cingulate gyrus (Wernicke’s is not part of it).',
        'Basal nuclei (caudate, putamen, globus pallidus) modulate subconscious motor control.',
      ],
      prerequisites: ['hss2011-cns-brainstem-reticular'],
      examples: ['A stroke in the left precentral gyrus produces contralateral (right-sided) voluntary paralysis.'],
    },
    memory: {
      comparison: 'Precentral = Motor (front of central sulcus); Postcentral = Sensory (behind central sulcus). Pre-Motor, Post-Sensory.',
      firstLetter: 'Limbic trio: Hippocampus, Amygdala, Cingulate gyrus (HAC). Wernicke’s area is language cortex, not limbic.',
    },
    practice: [
      {
        type: 'mcq',
        prompt: 'The primary somatosensory cortex is located on the:',
        options: ['Precentral gyrus', 'Postcentral gyrus', 'Superior temporal gyrus', 'Cingulate gyrus'],
        answer: 1,
        explanation: 'The primary somatosensory cortex is located on the postcentral gyrus of the parietal lobe; the precentral gyrus is primary motor.',
        src: { ref: 'hss.2.3', location: 'p5 Postcentral gyrus' }
      },
      {
        type: 'mcq',
        prompt: 'All of the following are structures of the limbic system EXCEPT:',
        options: ['Hippocampus', 'Cingulate gyrus', 'Wernicke’s area', 'Amygdala'],
        answer: 2,
        explanation: 'Wernicke’s area is a language comprehension area of the cerebral cortex, not part of the limbic system.',
        src: { ref: 'hss.revans', location: 'Module 2.3, MCQ 5' }
      },
      {
        type: 'cloze',
        prompt: 'The principal commissural tract connecting the left and right cerebral hemispheres is the ______ ______.',
        accept: ['corpus callosum'],
        explanation: 'The corpus callosum contains hundreds of millions of axons crossing between the two hemispheres.',
        src: { ref: 'hss.2.3', location: 'p8 Association and commissural fibers' }
      },
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'A stroke patient understands spoken commands perfectly and knows what they wish to say, but struggles to articulate words. Which cortical speech area is affected?',
        model: 'Broca’s area (motor speech area), located in the frontal lobe of the dominant hemisphere. It coordinates the motor commands required for vocalisation. Wernicke’s area is intact because language comprehension is preserved.',
        rubric: ['Identifies Broca’s area', 'Places it in the frontal lobe', 'Distinguishes motor speech from Wernicke’s comprehension']
      }
    ],
    commonMistakes: [
      'Swapping precentral gyrus (motor) and postcentral gyrus (sensory).',
      'Lumping Wernicke’s area into the limbic system because of anatomical-sounding terminology.',
    ],
    skills: [
      'Separate Broca’s expressive aphasia (intact comprehension, impaired speech motor execution) from Wernicke’s receptive aphasia (fluent nonsense, impaired comprehension).',
    ],
    selfCheck: 'From memory: map the precentral and postcentral gyri to their respective lobes and functions, and list the components of the limbic system.',
    sourceRefs: [{ ref: 'hss.2.3', location: 'p3–p19 Cerebral cortex, basal nuclei, and limbic system' }, { ref: 'hss.revans', location: 'Module 2.3 answers' }],
  },

  {
    id: 'hss2011-cns-ventricles-csf-blood',
    subject: 'HSS2011', unit: 'hss.m2', type: 'definition',
    title: 'Ventricular system, CSF circulation and cerebral arterial circle',
    tags: ['neuroanatomy', 'cns', 'ventricles', 'csf', 'high-yield'],
    lesson: {
      explanation: 'The brain contains four interconnected ventricles filled with cerebrospinal fluid (CSF): two C-shaped lateral ventricles in the cerebral hemispheres, a narrow third ventricle in the diencephalon, and a fourth ventricle between the cerebellum and the pons/medulla. CSF is produced continuously by ependymal cells of the choroid plexus located in all four ventricles. Circulation pathway: Lateral ventricles → interventricular foramen (foramen of Monro) → third ventricle → cerebral aqueduct (aqueduct of Sylvius through midbrain) → fourth ventricle → through median aperture (foramen of Magendie) and lateral apertures (foramina of Luschka) into the subarachnoid space. From the subarachnoid space, CSF flows over the brain and spinal cord, providing physical cushioning and buoyancy. Reabsorption occurs into venous blood through arachnoid villi / granulations projecting into the superior sagittal dural venous sinus. Arterial blood supply to the brain is delivered by internal carotid arteries and vertebral arteries, which join at the base of the brain to form the cerebral arterial circle (Circle of Willis), providing vital collateral circulation.',
      plain: 'CSF is made by the choroid plexus in four brain ventricles: lateral ventricles → interventricular foramen → third ventricle → cerebral aqueduct → fourth ventricle → into the subarachnoid space via median and lateral apertures. It cushions the brain and drains back into venous blood through arachnoid granulations into the superior sagittal sinus. Blood arrives via internal carotid and vertebral arteries, uniting in the Circle of Willis.',
      keyFacts: [
        'Four ventricles: two lateral, one third (diencephalon), one fourth (hindbrain).',
        'CSF is produced by ependymal cells of the choroid plexus.',
        'Interventricular foramen connects lateral ventricles to the third ventricle.',
        'Cerebral aqueduct connects the third ventricle to the fourth ventricle.',
        'CSF drains into the venous system via arachnoid granulations into dural venous sinuses.',
        'Circle of Willis links carotid and vertebrobasilar systems at the skull base.',
      ],
      prerequisites: ['hss2011-cns-cerebrum-cortex-basal'],
      examples: ['Blockage of the cerebral aqueduct prevents CSF outflow from the 3rd to 4th ventricle, causing non-communicating hydrocephalus.'],
    },
    memory: {
      chunking: 'CSF pathway in order: Lateral → Monro → Third → Aqueduct → Fourth → Apertures → Subarachnoid space → Arachnoid villi → Dural sinuses.',
      comparison: 'Choroid plexus makes CSF; arachnoid granulations absorb it back into blood.',
    },
    practice: [
      {
        type: 'cloze',
        prompt: 'The ______ ______ connects the lateral ventricle to the third ventricle.',
        accept: ['interventricular foramen', 'foramen of monro'],
        explanation: 'The interventricular foramen (foramen of Monro) connects each lateral ventricle to the midline third ventricle.',
        src: { ref: 'hss.revans', location: 'Module 2.3, Fill-in-blanks 2' }
      },
      {
        type: 'mcq',
        prompt: 'Blood and cerebrospinal fluid drain from the cranial cavity into the general circulation through the:',
        options: ['Ventricles', 'Subarachnoid space', 'Dural sinuses', 'Epidural space'],
        answer: 2,
        explanation: 'Arachnoid granulations project into the dural venous sinuses (e.g. superior sagittal sinus) to return CSF to the venous blood.',
        src: { ref: 'hss.revans', location: 'Module 2.3, MCQ 1' }
      },
      {
        type: 'cloze',
        prompt: 'The narrow canal passing through the midbrain that connects the third and fourth ventricles is the ______ ______.',
        accept: ['cerebral aqueduct', 'aqueduct of sylvius'],
        explanation: 'The cerebral aqueduct (aqueduct of Sylvius) runs through the midbrain between the third and fourth ventricles.',
        src: { ref: 'hss.2.3', location: 'p26–p28 Ventricular system of the brain' }
      },
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'A brain MRI reveals severe dilation of both lateral ventricles and the third ventricle, while the fourth ventricle is normal in size. Where is the obstruction located?',
        model: 'The obstruction is in the cerebral aqueduct (aqueduct of Sylvius). Because CSF flows from the lateral ventricles through the third ventricle and then through the cerebral aqueduct into the fourth ventricle, a block at the aqueduct causes upstream dilation of the lateral and third ventricles while leaving the fourth ventricle normal.',
        rubric: ['Identifies cerebral aqueduct as site of obstruction', 'Explains upstream dilation of lateral and third ventricles', 'Notes fourth ventricle remains normal downstream']
      }
    ],
    commonMistakes: [
      'Confusing the interventricular foramen (between lateral and third) with the cerebral aqueduct (between third and fourth).',
      'Believing CSF is absorbed into lymphatic vessels rather than dural venous sinuses.',
    ],
    skills: [
      'Trace CSF flow continuously from lateral ventricles down to arachnoid villi on diagnostic CT or MRI brain scans.',
    ],
    selfCheck: 'From memory: write down the step-by-step pathway of CSF circulation from production to venous reabsorption.',
    sourceRefs: [{ ref: 'hss.2.3', location: 'p26–p29 Ventricular system and CSF circulation' }, { ref: 'hss.revans', location: 'Module 2.3 answers' }],
  },

  /* ========================================================================
   * WEEK 6: CRANIAL NERVES (Module 2)
   * ======================================================================== */
  {
    id: 'hss2011-neuro-cranial-nerves-distribution',
    subject: 'HSS2011', unit: 'hss.m2', type: 'matching',
    title: 'Cranial nerves CN I–XII — functional modalities and targets',
    tags: ['neuroanatomy', 'cranial-nerves', 'high-yield'],
    lesson: {
      explanation: 'Twelve pairs of cranial nerves originate from the brain and brainstem, designated CN I through CN XII: CN I (Olfactory - sensory, smell), CN II (Optic - sensory, vision), CN III (Oculomotor - motor to superior/inferior/medial rectus, inferior oblique; parasympathetic pupil constriction), CN IV (Trochlear - motor to superior oblique), CN V (Trigeminal - mixed; sensory to face/scalp/teeth via V1 ophthalmic, V2 maxillary, V3 mandibular; motor to muscles of mastication via V3), CN VI (Abducens - motor to lateral rectus for eye abduction), CN VII (Facial - mixed; motor to muscles of facial expression, taste from anterior 2/3 of tongue, parasympathetic to salivary/lacrimal glands), CN VIII (Vestibulocochlear - sensory, hearing and balance), CN IX (Glossopharyngeal - mixed; sensory from posterior 1/3 tongue/pharynx, taste posterior 1/3, parotid gland salivation), CN X (Vagus - mixed; longest cranial nerve, parasympathetic innervation to thoracic and abdominal viscera down to splenic flexure), CN XI (Accessory - motor to trapezius and sternocleidomastoid), CN XII (Hypoglossal - motor to intrinsic and extrinsic tongue muscles). Clinical distinction: chewing is controlled by CN V (trigeminal), while facial expression is controlled by CN VII (facial).',
      plain: '12 cranial nerves: I (smell), II (vision), III/IV/VI (move eyes; IV turns eye down/in, VI abducts), V (chews and feels face), VII (facial expressions and anterior taste), VIII (hearing and balance), IX (pharynx and posterior taste), X (vagus: longest nerve, autonomic to chest and abdomen), XI (shrugs shoulders: trapezius/SCM), XII (moves tongue). Critical clinical contrast: trigeminal chews, facial makes faces.',
      keyFacts: [
        'CN V (Trigeminal) controls muscles of mastication and provides sensory innervation to the face.',
        'CN VII (Facial) controls muscles of facial expression and taste to anterior 2/3 of tongue.',
        'CN X (Vagus) is the longest cranial nerve, supplying thoracic and abdominal viscera.',
        'Eye movements: CN III moves most; CN IV supplies superior oblique; CN VI supplies lateral rectus (LR6SO4).',
        'CN XI supplies sternocleidomastoid and trapezius.',
        'CN XII supplies muscles of the tongue.',
      ],
      prerequisites: ['hss2011-cns-brainstem-reticular'],
      examples: ['A patient with Bell’s palsy loses facial expression on one side (CN VII) but retains sensation and chewing (CN V).'],
    },
    memory: {
      mnemonic: 'Eye muscles: LR6SO4 — Lateral Rectus is CN VI (abducens), Superior Oblique is CN IV (trochlear), all other extrinsic eye muscles are CN III.',
      comparison: 'Trigeminal (CN V) chews; Facial (CN VII) makes faces. A patient who cannot chew but has normal facial expression localises to CN V with CN VII intact.',
    },
    practice: [
      {
        type: 'cloze',
        prompt: 'The ______ nerve controls movement of the muscles of mastication.',
        accept: ['trigeminal nerve', 'trigeminal', 'cn v', 'cranial nerve v'],
        explanation: 'The mandibular division (V3) of the trigeminal nerve (CN V) innervates the muscles of mastication (masseter, temporalis, medial and lateral pterygoids).',
        src: { ref: 'hss.revans', location: 'Module 2.3, Fill-in-blanks 4' }
      },
      {
        type: 'matching',
        prompt: 'Match each cranial nerve to its primary function.',
        pairs: [
          ['CN I Olfactory', 'Smell'],
          ['CN II Optic', 'Vision'],
          ['CN VIII Vestibulocochlear', 'Hearing and balance'],
          ['CN XII Hypoglossal', 'Tongue movement']
        ],
        explanation: 'These are the classic functional modalities of the cranial nerves.',
        src: { ref: 'hss.2.3', location: 'p30–p42 Cranial nerves' }
      },
      {
        type: 'mcq',
        prompt: 'Which cranial nerve is the longest, extending into the thorax and abdomen to provide parasympathetic innervation to viscera?',
        options: ['Trigeminal nerve (CN V)', 'Facial nerve (CN VII)', 'Vagus nerve (CN X)', 'Hypoglossal nerve (CN XII)'],
        answer: 2,
        explanation: 'The vagus nerve (CN X) is the longest cranial nerve, providing extensive autonomic parasympathetic regulation to the heart, lungs, and gut.',
        src: { ref: 'hss.2.3', location: 'p41 Vagus nerve' }
      },
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'A patient presents with weakness in clenching their jaw, but their smile and eyebrow movements are entirely normal. Which cranial nerve is affected, and which is spared?',
        model: 'The trigeminal nerve (CN V) is affected, because its mandibular branch (V3) innervates the muscles of mastication. The facial nerve (CN VII) is spared, because it controls the muscles of facial expression (frontalis, orbicularis oris, zygomaticus).',
        rubric: ['Identifies trigeminal nerve (CN V) for mastication', 'Identifies facial nerve (CN VII) for facial expression', 'Explains normal expression means CN VII is intact']
      }
    ],
    commonMistakes: [
      'Mixing up the trigeminal nerve (chewing) and the facial nerve (facial expression).',
      'Assigning eye abduction to CN III instead of CN VI (abducens).',
    ],
    skills: [
      'Evaluate cranial nerve exams: smile/frown = CN VII, jaw clench = CN V, tongue protrusion = CN XII, shoulder shrug = CN XI.',
    ],
    selfCheck: 'From a blank page: list the cranial nerves responsible for chewing, facial expression, tongue movement, and parasympathetic control to the gut.',
    sourceRefs: [{ ref: 'hss.2.3', location: 'p30–p43 Cranial nerves CN I–XII' }, { ref: 'hss.revans', location: 'Module 2.3 answers' }],
  },

  /* ========================================================================
   * WEEK 8: CARDIOVASCULAR SYSTEM (Module 3)
   * ======================================================================== */
  {
    id: 'hss2011-cvs-internal-chambers-valves',
    subject: 'HSS2011', unit: 'hss.m1', type: 'definition',
    title: 'Heart chambers internal anatomy, fibrous skeleton and valve mechanics',
    tags: ['thorax', 'cardiovascular', 'heart', 'valves', 'high-yield'],
    lesson: {
      explanation: 'The heart contains four internal chambers: right atrium, right ventricle, left atrium, and left ventricle. The right atrium receives deoxygenated blood from the superior vena cava (SVC), inferior vena cava (IVC), and coronary sinus; its anterior wall features muscular ridges called pectinate muscles, and the interatrial septum carries the fossa ovalis (remnant of the fetal foramen ovale). Blood flows from right atrium through the tricuspid (right AV) valve into the right ventricle. The right ventricle features muscular ridges called trabeculae carneae, cone-shaped papillary muscles, and tendon-like chordae tendineae that tether the tricuspid valve cusps to prevent eversion into the atrium during systole. Blood exits the right ventricle via the pulmonary semilunar valve into the pulmonary trunk. Oxygenated blood from the lungs enters the left atrium via four pulmonary veins. It passes through the bicuspid (mitral / left AV) valve into the left ventricle. The left ventricle has a myocardium three times thicker than the right ventricle to generate systemic arterial pressures, pumping blood across the aortic semilunar valve into the ascending aorta. The fibrous skeleton of the heart consists of dense connective tissue rings anchoring all four valves and electrically insulating the atria from the ventricles.',
      plain: 'The right atrium receives venous blood from SVC, IVC, and coronary sinus, featuring pectinate muscles and the fossa ovalis. Blood crosses the tricuspid valve into the right ventricle, which pumps it past the pulmonary valve to the lungs. Papillary muscles and chordae tendineae anchor AV valves to stop backflow. Left atrium receives 4 pulmonary veins; blood crosses the bicuspid (mitral) valve into the left ventricle, which has walls 3x thicker to pump across the aortic valve to the body. The fibrous skeleton anchors valves and insulates atria from ventricles.',
      keyFacts: [
        'Right atrium receives SVC, IVC, and coronary sinus; features fossa ovalis and pectinate muscles.',
        'Tricuspid valve has 3 cusps; bicuspid (mitral) valve has 2 cusps.',
        'Chordae tendineae connect papillary muscles to AV valve cusps, preventing valve prolapse during ventricular systole.',
        'Left ventricular myocardium is ~3 times thicker than right ventricular myocardium.',
        'Semilunar valves (pulmonary and aortic) have 3 pocket-like cusps and lack chordae tendineae.',
        'Fibrous skeleton provides valve anchorage and electrical insulation between atria and ventricles.',
      ],
      prerequisites: ['hss2011-m1-heart-wall-valves'],
      examples: ['Rupture of chordae tendineae leads to acute mitral regurgitation and severe pulmonary edema.'],
    },
    memory: {
      comparison: 'Tricuspid on the right (3 cusps), Bicuspid/Mitral on the left (2 cusps) — "R-T, L-B" (Right-Tricuspid, Left-Bicuspid). LAB RAT: Left Atrium Bicuspid, Right Atrium Tricuspid.',
      visualCue: 'Chordae tendineae look like parachute cords holding the valve cusps down against the rushing blood.',
    },
    practice: [
      {
        type: 'cloze',
        prompt: 'The fibrous cords connecting the papillary muscles to the cusps of the atrioventricular valves are the ______ ______.',
        accept: ['chordae tendineae', 'chordae tendinae'],
        explanation: 'Chordae tendineae anchor the AV valve leaflets to papillary muscles, preventing eversion during ventricular contraction.',
        src: { ref: 'hss.1.1', location: 'p13 Sectional anatomy of the heart' }
      },
      {
        type: 'mcq',
        prompt: 'Why is the muscular wall of the left ventricle significantly thicker than that of the right ventricle?',
        options: ['It pumps a larger volume of blood', 'It pumps blood against much higher systemic resistance', 'It holds more coronary blood vessels', 'It contains the sinoatrial node'],
        answer: 1,
        explanation: 'Both ventricles pump the exact same volume of blood, but the left ventricle must generate enough pressure to overcome high systemic vascular resistance.',
        src: { ref: 'hss.1.1', location: 'p11 The heart wall' }
      },
      {
        type: 'mcq',
        prompt: 'The oval depression on the interatrial septum that marks the site of the fetal foramen ovale is the:',
        options: ['Crista terminalis', 'Fossa ovalis', 'Conus arteriosus', 'Coronary sinus'],
        answer: 1,
        explanation: 'The fossa ovalis on the interatrial septum is the remnant of the fetal foramen ovale.',
        src: { ref: 'hss.1.1', location: 'p13 Sectional anatomy of the heart' }
      },
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'A patient has an incompetent mitral valve. During which phase of the cardiac cycle will regurgitation occur, and into which chamber will blood leak?',
        model: 'Regurgitation will occur during ventricular systole (contraction). The mitral (bicuspid) valve normally closes during ventricular contraction to prevent blood from flowing backwards from the left ventricle into the left atrium; incompetence causes blood to leak back into the left atrium.',
        rubric: ['Identifies ventricular systole/contraction', 'Identifies leakage into the left atrium', 'Explains normal function is preventing backward flow from left ventricle']
      }
    ],
    commonMistakes: [
      'Believing the left ventricle pumps more volume than the right ventricle (stroke volume is equal; pressure is what differs).',
      'Thinking semilunar valves have chordae tendineae (only AV valves have them).',
    ],
    skills: [
      'Identify chamber thickness and valve structures on cross-sectional chest CT and echocardiography.',
    ],
    selfCheck: 'From a blank page: sketch the 4 chambers, 4 valves, their cusps, and the chordae tendineae/papillary muscle arrangements.',
    sourceRefs: [{ ref: 'hss.1.1', location: 'p3–p14 Anatomy of the heart and sectional anatomy' }, { ref: 'hss.manual1920', location: 'Module 1.2 Study guide' }],
  },

  {
    id: 'hss2011-cvs-coronary-circulation-conduction',
    subject: 'HSS2011', unit: 'hss.m1', type: 'definition',
    title: 'Coronary circulation and cardiac conduction system pathways',
    tags: ['thorax', 'cardiovascular', 'coronary', 'conduction', 'high-yield'],
    lesson: {
      explanation: 'The myocardium requires its own arterial blood supply, provided by the right and left coronary arteries which arise from the base of the ascending aorta just superior to the aortic valve. The Right Coronary Artery (RCA) courses in the coronary sulcus, supplying the right atrium, parts of both ventricles, and the conduction system (SA and AV nodes in most people); its branches include the marginal artery and posterior interventricular artery. The Left Coronary Artery (LCA) branches into the Anterior Interventricular Artery (Left Anterior Descending / LAD, known clinically as the "widow maker"), which supplies the anterior ventricular walls and anterior two-thirds of the interventricular septum, and the Circumflex Artery, which curves around the left coronary sulcus to supply the left atrium and posterior left ventricle. Venous blood from the myocardium collects in the great, middle, and small cardiac veins, which all empty into the coronary sinus on the posterior surface of the heart, draining into the right atrium. The intrinsic cardiac conduction system coordinates cardiac contraction: the Sinoatrial (SA) node (pacemaker) in the superior wall of the right atrium near the SVC initiates the impulse → internodal pathways → Atrioventricular (AV) node in the interatrial septum (delays impulse ~0.1 s) → Atrioventricular (AV) bundle (Bundle of His) passing through the fibrous skeleton → right and left bundle branches in the interventricular septum → subendocardial Purkinje fibres distributed to the ventricular myocardium.',
      plain: 'The heart is fed by two coronary arteries from the aorta base: the Right Coronary Artery (marginal and posterior interventricular branches; feeds SA/AV nodes) and Left Coronary Artery (LAD / anterior interventricular "widow maker" and circumflex). Deoxygenated heart blood collects in cardiac veins into the coronary sinus, emptying into the right atrium. The conduction pathway runs: SA node (pacemaker) → AV node (delay) → Bundle of His → right/left bundle branches → Purkinje fibres.',
      keyFacts: [
        'Coronary arteries arise from aortic sinuses at the base of the ascending aorta.',
        'LAD (anterior interventricular artery) supplies anterior ventricles and interventricular septum.',
        'Coronary sinus lies in posterior coronary sulcus and drains into the right atrium.',
        'SA node (pacemaker) is located in the posterior wall of the right atrium near SVC opening.',
        'AV node delays the impulse to allow ventricular filling before ventricular contraction.',
        'Bundle of His is the only electrical connection through the fibrous skeleton between atria and ventricles.',
      ],
      prerequisites: ['hss2011-cvs-internal-chambers-valves'],
      examples: ['Occlusion of the LAD causes massive anterior wall myocardial infarction, frequently fatal without stenting.'],
    },
    memory: {
      chunking: 'Conduction sequence: SA node → AV node → Bundle of His → Bundle Branches → Purkinje fibres (Save A Bitch Both Places).',
      comparison: 'Coronary sinus drains myocardial venous blood into the right atrium, alongside SVC and IVC.',
    },
    practice: [
      {
        type: 'mcq',
        prompt: 'Which coronary artery branch runs in the anterior interventricular sulcus and is clinically dubbed the "widow maker"?',
        options: ['Circumflex artery', 'Right marginal artery', 'Anterior interventricular artery (LAD)', 'Posterior interventricular artery'],
        answer: 2,
        explanation: 'The anterior interventricular artery (left anterior descending / LAD) runs in the anterior interventricular sulcus and supplies the anterior ventricles and septum.',
        src: { ref: 'hss.1.1', location: 'p10 Coronary circulation' }
      },
      {
        type: 'cloze',
        prompt: 'Venous blood from the heart wall drains into the right atrium primarily via the ______ ______.',
        accept: ['coronary sinus'],
        explanation: 'The coronary sinus is the large venous channel on the posterior aspect of the heart draining cardiac veins into the right atrium.',
        src: { ref: 'hss.1.1', location: 'p10 Coronary circulation' }
      },
      {
        type: 'mcq',
        prompt: 'The natural pacemaker of the heart is the:',
        options: ['Atrioventricular node', 'Sinoatrial node', 'Bundle of His', 'Purkinje network'],
        answer: 1,
        explanation: 'The sinoatrial (SA) node in the right atrium initiates the electrical impulse at the fastest intrinsic rate (~70–80 bpm).',
        src: { ref: 'hss.1.2', location: 'p5–p8 Conducting system' }
      },
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'Why is the ~0.1 second delay at the atrioventricular (AV) node functionally critical for cardiac pumping efficiency?',
        model: 'The AV nodal delay allows the atria to finish contracting and completely pump their blood into the ventricles before the ventricles begin contracting. Without this delay, atria and ventricles would contract simultaneously, preventing proper ventricular filling.',
        rubric: ['Explains allowing atria to finish contraction', 'Explains complete filling of ventricles', 'Notes prevents simultaneous contraction']
      }
    ],
    commonMistakes: [
      'Assuming the coronary arteries fill during ventricular systole (they actually fill during ventricular diastole when aortic valve cusps relax).',
      'Thinking the coronary sinus drains into the left atrium (it drains into the right atrium with all systemic venous blood).',
    ],
    skills: [
      'Trace the coronary arterial tree on coronary angiograms and identify the SA and AV nodal locations.',
    ],
    selfCheck: 'From memory: name the branches of the right and left coronary arteries and write the 5-step sequence of cardiac conduction.',
    sourceRefs: [{ ref: 'hss.1.1', location: 'p10 Coronary circulation' }, { ref: 'hss.1.2', location: 'p5–p8 Conducting system' }],
  },

  {
    id: 'hss2011-cvs-tutorial-pastpaper-practice',
    subject: 'HSS2011', unit: 'hss.m1', type: 'cloze',
    title: 'Cardiovascular anatomy tutorial & past paper practice',
    tags: ['thorax', 'cardiovascular', 'assessment', 'tutorial', 'high-yield'],
    lesson: {
      explanation: 'Official Module 1 revision questions test key cardiovascular discriminations: the heart wall consists of epicardium, myocardium, and endocardium, while the pericardium is the external fibrous/serous sac; cardiac muscle cells are linked by intercalated discs with desmosomes and gap junctions; the right atrioventricular valve has three cusps (tricuspid) and closes upon right ventricular contraction; the left AV valve has two cusps (bicuspid / mitral); the mediastinum is the space between the pleural cavities housing the heart and great vessels; and the cisterna chyli is the expanded sac-like chamber at the base of the thoracic duct.',
      plain: 'Review of high-yield cardiovascular exam questions: pericardium vs heart wall, tricuspid vs bicuspid valve actions, intercalated discs connecting cardiac cells, and the mediastinum as the interpleural compartment.',
      keyFacts: [
        'Pericardium surrounds the heart but does not form part of the heart wall.',
        'Right AV valve = tricuspid; Left AV valve = bicuspid / mitral.',
        'Intercalated discs link cardiac muscle cells physically and electrically.',
        'Mediastinum is the central thoracic space between the two pleural cavities.',
      ],
      prerequisites: ['hss2011-m1-heart-wall-valves', 'hss2011-cvs-internal-chambers-valves'],
      examples: ['Exam past paper question: "Which layer is NOT part of the heart wall? Answer: Pericardium."'],
    },
    memory: {
      teachBack: 'Explain to a study partner why the pericardium is a sac around the heart and not a layer of the heart wall.',
    },
    practice: [
      {
        type: 'mcq',
        prompt: 'Which of the following structures does NOT form part of the heart wall?',
        options: ['Epicardium', 'Pericardium', 'Myocardium', 'Endocardium'],
        answer: 1,
        explanation: 'Model answer B. Epicardium, myocardium, and endocardium form the wall. Pericardium is the separate fibroserous sac.',
        src: { ref: 'hss.revans', location: 'Module 1.2, MCQ 1' }
      },
      {
        type: 'cloze',
        prompt: 'The ______ valve consists of three cusps and closes when the right ventricle contracts, preventing backflow into the right atrium.',
        accept: ['tricuspid', 'right av', 'right atrioventricular'],
        explanation: 'Model answer: Right AV / tricuspid valve.',
        src: { ref: 'hss.revans', location: 'Module 1.2, Fill-in-blanks 3' }
      },
      {
        type: 'cloze',
        prompt: 'The region of the chest situated between the two pleural cavities is called the ______.',
        accept: ['mediastinum'],
        explanation: 'Model answer: mediastinum.',
        src: { ref: 'hss.revans', location: 'Module 1.2, Fill-in-blanks 4' }
      },
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'A patient has cardiac tamponade from fluid accumulation in the pericardial cavity. Between which two layers has this fluid collected?',
        model: 'Between the parietal layer of the serous pericardium and the visceral layer of the serous pericardium (epicardium). This space is the pericardial cavity, normally containing only a small lubricating film of serous fluid.',
        rubric: ['Identifies pericardial cavity', 'Names parietal serous pericardium', 'Names visceral serous pericardium / epicardium']
      }
    ],
    commonMistakes: [
      'Placing pericardial effusion inside the myocardium.',
    ],
    skills: [
      'Recognise normal mediastinal contours and cardiothoracic ratio (<50%) on PA chest radiographs.',
    ],
    selfCheck: 'From a blank page: answer all 3 revision questions cold without checking notes.',
    sourceRefs: [{ ref: 'hss.revans', location: 'Module 1.2 answers' }, { ref: 'hss.manual1920', location: 'Module 1.2 Revision exercise' }],
  },

{
    id: 'hss2011-resp-upper-tract-larynx',
    subject: 'HSS2011', unit: 'hss.m1', type: 'definition',
    title: 'Upper respiratory tract, paranasal sinuses and larynx',
    tags: ['thorax', 'respiratory', 'larynx', 'high-yield'],
    lesson: {
      explanation: 'The respiratory system is divided into upper and lower tracts. The upper tract comprises the nose, nasal cavity, paranasal sinuses (frontal, maxillary, sphenoidal, ethmoidal), and pharynx. The nasal cavity is divided by the nasal septum (formed by the perpendicular plate of the ethmoid, the vomer, and septal cartilage). Its lateral walls feature three bony projections: superior, middle, and inferior nasal conchae (turbinates), which create turbulent airflow to warm, humidify, and filter incoming air. The pharynx is divided into nasopharynx (posterior to nasal cavity, contains pharyngeal tonsil / adenoids and openings of auditory/Eustachian tubes), oropharynx (posterior to oral cavity, containing palatine and lingual tonsils), and laryngopharynx (posterior to larynx, continuous with oesophagus). The larynx (voice box) extends from C3/C4 to C6, connecting the laryngopharynx to the trachea. Its framework consists of 9 cartilages: 3 large unpaired cartilages (thyroid cartilage with laryngeal prominence / Adam\'s apple, cricoid cartilage signet-ring shape forming a complete ring, and epiglottis elastic cartilage leaf guarding the glottis during swallowing) and 3 pairs of small cartilages (arytenoid, corniculate, cuneiform). Arytenoid cartilages pivot to adjust tension on the vocal folds (true vocal cords), controlling pitch.',
      plain: 'The upper respiratory tract includes the nasal cavity (divided by vomer, ethmoid, and septal cartilage; lined by 3 conchae), paranasal sinuses, and the pharynx (naso-, oro-, and laryngo-pharynx). The larynx has 9 cartilages: 3 single (thyroid with Adam\'s apple, cricoid forming a complete signet ring, and epiglottis guarding the glottis) and 3 paired (arytenoids pivot the true vocal cords to adjust pitch).',
      keyFacts: [
        'Nasal septum is formed by perpendicular plate of ethmoid, vomer, and septal cartilage.',
        'Superior, middle, and inferior conchae warm, humidify, and filter air.',
        'Larynx has 9 cartilages: 3 unpaired (thyroid, cricoid, epiglottis) and 3 paired (arytenoid, corniculate, cuneiform).',
        'Cricoid cartilage is the only complete cartilaginous ring around the airway.',
        'Epiglottis closes over the glottis during swallowing to prevent food entering trachea.',
        'Arytenoid cartilages pivot to vary tension on vocal folds (true vocal cords).',
      ],
      prerequisites: ['hss2011-m1-lungs-airway'],
      examples: ['Emergency cricothyroidotomy pierces the cricothyroid membrane between the thyroid and cricoid cartilages.'],
    },
    memory: {
      chunking: 'Three unpaired cartilages: Thyroid, Cricoid, Epiglottis (TCE). Three paired: Arytenoid, Corniculate, Cuneiform (ACC).',
      comparison: 'Cricoid is a complete ring (signet ring); thyroid is open posteriorly (shield-like).',
    },
    practice: [
      {
        type: 'mcq',
        prompt: 'Which cartilage of the larynx forms a complete ring around the airway?',
        options: ['Thyroid cartilage', 'Cricoid cartilage', 'Epiglottis', 'Arytenoid cartilage'],
        answer: 1,
        explanation: 'The cricoid cartilage is the only laryngeal cartilage that forms a complete circle (signet-ring shape) around the respiratory tract.',
        src: { ref: 'hss.resp', location: 'p5–p12 Upper tract and larynx' }
      },
      {
        type: 'cloze',
        prompt: 'The leaf-shaped elastic cartilage that folds down over the glottis during swallowing is the ______.',
        accept: ['epiglottis'],
        explanation: 'The epiglottis prevents ingested liquid and food from entering the lower respiratory tract.',
        src: { ref: 'hss.resp', location: 'p10 Epiglottis and glottis' }
      },
      {
        type: 'mcq',
        prompt: 'Which paired laryngeal cartilages pivot to adjust the tension and position of the true vocal folds?',
        options: ['Cuneiform cartilages', 'Corniculate cartilages', 'Arytenoid cartilages', 'Thyroid cartilages'],
        answer: 2,
        explanation: 'The pyramid-shaped arytenoid cartilages anchor the vocal ligaments; their rotation and gliding changes pitch.',
        src: { ref: 'hss.1.2', location: 'p14–p18 Larynx and trachea' }
      },
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'In acute upper airway obstruction where intubation fails, emergency airway access is established via cricothyroidotomy. Between which two laryngeal cartilages is this incision made?',
        model: 'Between the thyroid cartilage and the cricoid cartilage, through the cricothyroid ligament/membrane. This site is palpable just below the laryngeal prominence and is superficial, providing rapid airway access below the vocal cords.',
        rubric: ['Identifies thyroid cartilage', 'Identifies cricoid cartilage', 'Names cricothyroid ligament/membrane']
      }
    ],
    commonMistakes: [
      'Thinking the thyroid cartilage forms a complete ring (only the cricoid is complete).',
      'Confusing true vocal cords (vocal folds) with false vocal cords (vestibular folds).',
    ],
    skills: [
      'Locate the laryngeal prominence (Adam\'s apple) and cricoid cartilage by surface palpation on neck examination.',
    ],
    selfCheck: 'From memory: list the 3 single and 3 paired laryngeal cartilages and identify the one complete ring.',
    sourceRefs: [{ ref: 'hss.resp', location: 'p5–p12 Upper tract and larynx' }, { ref: 'hss.1.2', location: 'p14–p18 Larynx and trachea' }],
  },

  {
    id: 'hss2011-resp-pleura-lungs-gross',
    subject: 'HSS2011', unit: 'hss.m1', type: 'definition',
    title: 'Pleural cavities, gross pulmonary lobes, surfaces and hilum',
    tags: ['thorax', 'respiratory', 'lungs', 'pleura', 'high-yield'],
    lesson: {
      explanation: 'The lungs occupy the left and right pleural cavities of the thorax, separated by the mediastinum. Each lung is enclosed by a double-layered serous membrane called pleura: parietal pleura lines the inner thoracic wall, superior surface of diaphragm, and mediastinum; visceral pleura adheres intimately to the outer surface of each lung and dips into its fissures. The potential space between them is the pleural cavity, containing a small amount of lubricating pleural fluid that reduces friction during respiration. The apex of each lung extends superiorly into the root of the neck, above the first rib and clavicle; the concave base rests on the dome of the diaphragm. The Right Lung is larger and divided into three lobes (superior, middle, inferior) by two fissures: the horizontal fissure and the oblique fissure. The Left Lung is smaller to accommodate the cardiac notch and lingula, and is divided into two lobes (superior and inferior) by a single oblique fissure. On the mediastinal surface of each lung is the hilum, the wedge-shaped indentation where pulmonary vessels, primary bronchi, bronchial vessels, lymphatics, and nerves enter and exit to form the root of the lung. At the hilum, the primary bronchus typically lies posterior, the pulmonary artery superior, and the pulmonary veins anterior and inferior.',
      plain: 'Each lung sits in a pleural cavity wrapped by parietal (outer) and visceral (inner) pleura. The right lung has 3 lobes (superior, middle, inferior) separated by horizontal and oblique fissures. The left lung has 2 lobes separated by an oblique fissure, featuring the cardiac notch. The lung apex extends above the 1st rib into the neck. At the medial hilum, bronchi and vessels enter/exit to form the root of the lung.',
      keyFacts: [
        'Right lung has 3 lobes and 2 fissures (horizontal and oblique).',
        'Left lung has 2 lobes and 1 fissure (oblique), featuring the cardiac notch and lingula.',
        'Parietal pleura lines thoracic wall; visceral pleura adheres to the lung surface.',
        'Lung apex projects superiorly beyond the 1st rib into the root of the neck.',
        'Hilum is the medial surface opening where vessels, nerves, and bronchi form the root of the lung.',
      ],
      prerequisites: ['hss2011-m1-lungs-airway'],
      examples: ['Pneumothorax occurs when air enters the pleural cavity, breaking pleural surface tension and causing lung collapse.'],
    },
    memory: {
      comparison: 'Right lung = 3 lobes, 2 fissures; Left lung = 2 lobes, 1 fissure. The left lung is smaller because the heart tilts to the left.',
      chunking: 'Hilum arrangement: Bronchus is posterior, Pulmonary artery is superior, Pulmonary veins are anterior/inferior.',
    },
    practice: [
      {
        type: 'mcq',
        prompt: 'How many lobes and fissures are present in the normal right lung?',
        options: ['2 lobes and 1 fissure', '3 lobes and 2 fissures', '3 lobes and 1 fissure', '4 lobes and 2 fissures'],
        answer: 1,
        explanation: 'The right lung has three lobes (superior, middle, inferior) separated by the horizontal and oblique fissures.',
        src: { ref: 'hss.resp', location: 'p15–p24 Lung gross anatomy and pleura' }
      },
      {
        type: 'cloze',
        prompt: 'The wedge-shaped depression on the mediastinal surface of each lung through which bronchi and vessels pass is the ______.',
        accept: ['hilum', 'hilus'],
        explanation: 'The hilum transmits the structures comprising the root of the lung.',
        src: { ref: 'hss.resp', location: 'p18 Lung hilum' }
      },
      {
        type: 'mcq',
        prompt: 'The prominent concavity on the anterior border of the left lung that accommodates the heart is the:',
        options: ['Costal groove', 'Lingula', 'Cardiac notch', 'Azygos impression'],
        answer: 2,
        explanation: 'The cardiac notch accommodates the apex and pericardial bulk of the heart.',
        src: { ref: 'hss.1.1', location: 'p24–p28 Pleura and lung surfaces' }
      },
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'A stab wound just above the medial third of the right clavicle causes acute shortness of breath. Which part of the lung has been punctured?',
        model: 'The apex of the right lung (cervical pleura). The lung apex and cupola of parietal pleura extend approximately 2–3 cm superior to the medial third of the clavicle and first rib into the root of the neck, making it vulnerable to supraclavicular trauma.',
        rubric: ['Identifies the apex of the lung', 'Explains apex extends above 1st rib / clavicle', 'Notes supraclavicular vulnerability']
      }
    ],
    commonMistakes: [
      'Thinking the lung apex stays entirely below the first rib (it extends 2–3 cm above it into the neck).',
      'Assigning a middle lobe to the left lung (only the right lung has a middle lobe).',
    ],
    skills: [
      'Identify lung lobes, fissures, and costophrenic angles on PA and lateral chest radiographs.',
    ],
    selfCheck: 'From a blank page: sketch both lungs, labelling lobes, fissures, cardiac notch, apex, and the structures passing through the hilum.',
    sourceRefs: [{ ref: 'hss.resp', location: 'p15–p24 Lung gross anatomy and pleura' }, { ref: 'hss.1.1', location: 'p24–p28 Pleura and lung surfaces' }],
  },

  {
    id: 'hss2011-resp-tutorial-pastpaper-practice',
    subject: 'HSS2011', unit: 'hss.m1', type: 'cloze',
    title: 'Respiratory anatomy tutorial & past paper practice',
    tags: ['thorax', 'respiratory', 'assessment', 'tutorial', 'high-yield'],
    lesson: {
      explanation: 'Official Module 1 revision questions test key pulmonary concepts: the trachea bifurcates at the carina into right and left primary bronchi at the level of the sternal angle (T4/T5 disc); the right primary bronchus is wider, shorter, and more vertically oriented than the left, making it the most common destination for aspirated foreign bodies; each lung is divided into 10 bronchopulmonary segments supplied by tertiary (segmental) bronchi; respiratory bronchioles mark the transition where alveoli first appear and gas exchange begins; and sympathetic activation induces bronchodilation, whereas parasympathetic vagal innervation causes bronchoconstriction and glandular mucus secretion.',
      plain: 'High-yield exam review: trachea branches at the carina (T4/T5), right main bronchus catches foreign objects (wider, steeper), gas exchange starts at respiratory bronchioles, and 10 bronchopulmonary segments per lung.',
      keyFacts: [
        'Trachea branches into primary bronchi at the carina (T4/T5).',
        'Right primary bronchus is wider, shorter, and more vertical — primary site for aspirated foreign bodies.',
        'Gas exchange first occurs at respiratory bronchioles.',
        'Each lung contains 10 bronchopulmonary segments.',
      ],
      prerequisites: ['hss2011-m1-lungs-airway', 'hss2011-resp-upper-tract-larynx'],
      examples: ['Exam past paper question: "Which bronchus is a foreign body most likely to enter? Answer: Right primary bronchus."'],
    },
    memory: {
      teachBack: 'Explain why an aspirated peanut almost always enters the right lung rather than the left lung.',
    },
    practice: [
      {
        type: 'mcq',
        prompt: 'An aspirated foreign object is most likely to lodge in which part of the bronchial tree?',
        options: ['Left primary bronchus', 'Right primary bronchus', 'Left secondary bronchus', 'Tracheal bifurcation'],
        answer: 1,
        explanation: 'The right primary bronchus is wider, shorter, and more vertically aligned with the trachea, so aspirated objects preferentially enter the right lung.',
        src: { ref: 'hss.1.2', location: 'p16 Trachea and primary bronchi' }
      },
      {
        type: 'cloze',
        prompt: 'The internal ridge at the bifurcation of the trachea into the primary bronchi is the ______.',
        accept: ['carina'],
        explanation: 'The carina sits at the T4/T5 vertebral level, covered by sensitive mucosa that triggers a violent cough reflex.',
        src: { ref: 'hss.revans', location: 'Module 1.1 answers' }
      },
      {
        type: 'mcq',
        prompt: 'Gas exchange first becomes possible at which microscopic division of the respiratory tree?',
        options: ['Terminal bronchioles', 'Tertiary bronchi', 'Respiratory bronchioles', 'Trachea'],
        answer: 2,
        explanation: 'Respiratory bronchioles have scattered alveoli budding from their walls, making them the beginning of the respiratory zone.',
        src: { ref: 'hss.resp', location: 'p20 Microscopic bronchial tree' }
      },
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'A toddler accidentally inhales a small plastic bead while playing. Chest X-ray reveals atelectasis of the right lower lobe. Explain the anatomical basis for this localization.',
        model: 'The right primary bronchus is wider, shorter, and more vertically aligned with the trachea than the left primary bronchus. Gravity and airflow guide aspirated foreign bodies preferentially into the right bronchial tree and downward into the right lower lobe bronchus.',
        rubric: ['Identifies right primary bronchus', 'Notes wider, shorter, more vertical course', 'Concludes gravity directs foreign body into right lower lobe']
      }
    ],
    commonMistakes: [
      'Choosing left primary bronchus for foreign body aspiration.',
      'Thinking terminal bronchioles participate in gas exchange (they belong to the conducting zone; respiratory bronchioles start the respiratory zone).',
    ],
    skills: [
      'Identify the carina and endotracheal tube tip position (normally 3–5 cm above carina) on mobile chest radiographs.',
    ],
    selfCheck: 'From memory: explain the 3 anatomical differences between right and left main bronchi.',
    sourceRefs: [{ ref: 'hss.1.2', location: 'p16 Trachea and primary bronchi' }, { ref: 'hss.revans', location: 'Module 1.1 answers' }],
  },

  /* ========================================================================
   * WEEK 10: THORACIC CAGE & REGIONAL ANATOMY (Module 3)
   * ======================================================================== */
  {
    id: 'hss2011-thorax-intercostal-diaphragm',
    subject: 'HSS2011', unit: 'hss.m1', type: 'definition',
    title: 'Intercostal spaces, neurovascular bundle and the thoracic diaphragm',
    tags: ['thorax', 'diaphragm', 'intercostal', 'high-yield'],
    lesson: {
      explanation: 'The thoracic wall contains 11 intercostal spaces bounded by 12 pairs of ribs. Each space is occupied by three layers of intercostal muscles: external intercostals (fibers run inferomedially "hands in pockets", active in inspiration by elevating ribs), internal intercostals (fibers run inferolaterally, active in forced expiration by depressing ribs), and innermost intercostals. The intercostal neurovascular bundle runs along the costal groove on the inferior border of each rib, protected by the rib flange; its components are arranged from superior to inferior as: Vein, Artery, Nerve (VAN), plus lymphatics. To avoid injuring the neurovascular bundle, invasive pleural procedures (thoracocentesis, chest tube insertion) are always performed by inserting the needle or tube over the superior border of the lower rib. The diaphragm is the principal muscle of inspiration, separating the thoracic cavity from the abdominal cavity. It attaches to the xiphoid process, lower 6 costal cartilages, and lumbar vertebrae (via right and left crura). It features three major apertures: 1) Caval hiatus (level of T8, transmits IVC and right phrenic nerve); 2) Oesophageal hiatus (level of T10, transmits oesophagus and vagus nerves CN X); 3) Aortic hiatus (level of T12, transmits descending aorta, thoracic duct, and azygos vein). Motor innervation to the entire diaphragm is supplied exclusively by the phrenic nerves (arising from cervical spinal roots C3, C4, C5: "C3, 4, 5 keeps the diaphragm alive").',
      plain: 'Intercostal spaces have 3 muscle layers (external breathes in, internal breathes out). The costal groove along the lower edge of each rib shelters the neurovascular bundle: Vein, Artery, Nerve (VAN). Needles are inserted over the top of the lower rib to avoid VAN. The diaphragm is the main breathing muscle; its 3 openings are T8 (caval/IVC), T10 (oesophagus), and T12 (aorta). Motor nerve: phrenic nerve (C3, C4, C5).',
      keyFacts: [
        'Intercostal neurovascular bundle order in costal groove: Vein, Artery, Nerve (VAN) superior to inferior.',
        'Thoracocentesis needles are inserted immediately above the upper border of a rib to avoid the VAN bundle.',
        'Diaphragm apertures: T8 (IVC / caval hiatus), T10 (oesophagus), T12 (aorta / aortic hiatus).',
        'Phrenic nerve (C3, C4, C5) provides sole motor innervation to the diaphragm.',
        'External intercostals elevate ribs (inspiration); internal intercostals depress ribs (forced expiration).',
      ],
      prerequisites: ['hss2011-osteo-ribs-sternum', 'hss2011-thorax-regional-landmarks'],
      examples: ['Chest drain insertion for pneumothorax at the 5th intercostal space, midaxillary line, above the 6th rib.'],
    },
    memory: {
      mnemonic: 'Diaphragm hiatuses: "I8 10 Eggs At 12" — I (IVC) at 8, Eggs (Oesophagus) at 10, At (Aorta) at 12.',
      chunking: 'Neurovascular bundle: VAN (Vein, Artery, Nerve) from top to bottom.',
    },
    practice: [
      {
        type: 'mcq',
        prompt: 'In what order are structures arranged in the costal groove of a rib from superior to inferior?',
        options: ['Nerve, Artery, Vein', 'Artery, Vein, Nerve', 'Vein, Artery, Nerve', 'Vein, Nerve, Artery'],
        answer: 2,
        explanation: 'The intercostal neurovascular bundle is arranged Vein, Artery, Nerve (VAN) from superior to inferior.',
        src: { ref: 'hss.1.3', location: 'p6–p18 Intercostal space' }
      },
      {
        type: 'mcq',
        prompt: 'At which vertebral level does the oesophagus pass through the diaphragm?',
        options: ['T8', 'T10', 'T12', 'L1'],
        answer: 1,
        explanation: 'The oesophageal hiatus is at T10. T8 is caval hiatus (IVC); T12 is aortic hiatus.',
        src: { ref: 'hss.thorax.deck', location: 'Slides 8–18 Diaphragm apertures' }
      },
      {
        type: 'cloze',
        prompt: 'Sole motor innervation to the thoracic diaphragm is provided by the ______ nerves (cervical roots C3–C5).',
        accept: ['phrenic', 'phrenic nerve', 'phrenic nerves'],
        explanation: 'Phrenic nerves arise from C3–C5 and descend through the mediastinum to innervate the diaphragm.',
        src: { ref: 'hss.thorax.deck', location: 'Slides 14–16 Diaphragm innervation' }
      },
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'A physician performs a thoracocentesis to drain pleural effusion. Where should the needle be placed relative to the rib, and why?',
        model: 'The needle must be inserted directly over the superior border of the lower rib. The costal groove on the inferior border of the upper rib shelters the intercostal vein, artery, and nerve (VAN); passing over the superior border of the lower rib avoids puncturing these vessels and nerve.',
        rubric: ['Specifies superior border of the lower rib', 'Names the intercostal vein, artery, nerve (VAN)', 'Explains avoiding the costal groove on the inferior border']
      }
    ],
    commonMistakes: [
      'Inserting needles below a rib (punctures the intercostal VAN bundle).',
      'Confusing the vertebral levels of diaphragm hiatuses (remember: IVC=8, Oesophagus=10, Aorta=12).',
    ],
    skills: [
      'Identify the right and left hemidiaphragms on chest radiographs, noting the right dome is normally 1–2 cm higher due to the liver.',
    ],
    selfCheck: 'From memory: write the VAN sequence and the three diaphragmatic hiatuses with their vertebral levels and transmitted structures.',
    sourceRefs: [{ ref: 'hss.1.3', location: 'p6–p18 Intercostal space and diaphragm' }, { ref: 'hss.thorax.deck', location: 'Slides 8–18 Diaphragm apertures' }],
  },

  {
    id: 'hss2011-thorax-tutorial-pastpaper-practice',
    subject: 'HSS2011', unit: 'hss.m1', type: 'cloze',
    title: 'Thorax regional anatomy tutorial & past paper practice',
    tags: ['thorax', 'assessment', 'tutorial', 'high-yield'],
    lesson: {
      explanation: 'Official Module 1.3 revision questions focus on regional thoracic anatomy: the sternal angle (manubriosternal junction / angle of Louis) is located at the T4/T5 intervertebral disc level; it marks the attachment of the 2nd costal cartilage, the bifurcation of the trachea into primary bronchi (carina), the boundary between superior and inferior mediastinum, and the beginning/end of the aortic arch; ribs 1–7 are true (vertebrosternal) ribs, 8–10 are false (vertebrochondral) ribs, and 11–12 are floating (vertebral) ribs; the superior thoracic aperture (thoracic inlet) is bounded by T1, 1st rib pair, and manubrium; the inferior thoracic aperture (thoracic outlet) is bounded by T12, 12th rib pair, costal margins, and xiphisternal joint, closed by the diaphragm.',
      plain: 'Core thorax exam facts: sternal angle at T4/T5 aligns with 2nd rib, carina, and aortic arch. Ribs 1–7 true, 8–10 false, 11–12 floating. Sternal angle plane separates superior from inferior mediastinum.',
      keyFacts: [
        'Sternal angle is at T4/T5 disc level, marking 2nd costal cartilage, carina, and mediastinal plane.',
        'Ribs 1–7 true; 8–10 false; 11–12 floating.',
        'Middle mediastinum contains the pericardium, heart, and roots of great vessels.',
        'Superior thoracic aperture transmits trachea, oesophagus, and great vessels to the neck.',
      ],
      prerequisites: ['hss2011-osteo-ribs-sternum', 'hss2011-thorax-regional-landmarks'],
      examples: ['Exam past paper question: "The sternal angle lies opposite which intervertebral disc? Answer: T4/T5."'],
    },
    memory: {
      teachBack: 'List five major anatomical structures or events that occur at the horizontal plane of the sternal angle (T4/T5).',
    },
    practice: [
      {
        type: 'mcq',
        prompt: 'The sternal angle (angle of Louis) lies opposite which intervertebral disc?',
        options: ['T2/T3', 'T3/T4', 'T4/T5', 'T5/T6'],
        answer: 2,
        explanation: 'Model answer C. The sternal angle is at the level of the T4/T5 intervertebral disc.',
        src: { ref: 'hss.revans', location: 'Module 1.3, MCQ 1' }
      },
      {
        type: 'cloze',
        prompt: 'The horizontal plane dividing the superior mediastinum from the inferior mediastinum passes through the ______ ______ anteriorly and the T4/T5 disc posteriorly.',
        accept: ['sternal angle', 'manubriosternal joint', 'angle of louis'],
        explanation: 'The sternal angle marks the boundary between superior and inferior mediastinum.',
        src: { ref: 'hss.revans', location: 'Module 1.3 answers' }
      },
      {
        type: 'mcq',
        prompt: 'Which ribs attach directly to the sternum via their own individual costal cartilages?',
        options: ['Ribs 1–5', 'Ribs 1–7', 'Ribs 1–10', 'Ribs 1–12'],
        answer: 1,
        explanation: 'Ribs 1–7 are true ribs (vertebrosternal) because their costal cartilages connect directly to the sternum.',
        src: { ref: 'hss.1.3', location: 'p4 Thoracic cage ribs' }
      },
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'A clinician palpates the sternal angle to count ribs on a patient. Which rib cartilage attaches immediately adjacent to this landmark?',
        model: 'The second costal cartilage. The sternal angle (manubriosternal junction) provides the primary clinical reference landmark for counting ribs because the second costal cartilage articulates directly at this joint; the first rib lies deep to the clavicle and cannot be reliably palpated.',
        rubric: ['Identifies 2nd costal cartilage / 2nd rib', 'Names sternal angle as clinical counting landmark', 'Notes 1st rib is hidden under clavicle']
      }
    ],
    commonMistakes: [
      'Calling rib 8 a true rib (ribs 8–10 merge their cartilages into cartilage 7, so they are false ribs).',
      'Placing the sternal angle at T2 or T3.',
    ],
    skills: [
      'Locate the sternal angle on lateral chest radiographs to verify T4/T5 level and carina position.',
    ],
    selfCheck: 'From memory: answer the 3 revision questions on sternal angle, ribs, and mediastinum boundaries.',
    sourceRefs: [{ ref: 'hss.revans', location: 'Module 1.3 answers' }, { ref: 'hss.manual1920', location: 'Module 1.3 Revision exercise' }],
  },

{
    id: 'hss2011-digestive-tract-upper',
    subject: 'HSS2011', unit: 'hss.m3', type: 'definition',
    title: 'Upper gastrointestinal tract — oral cavity, oesophagus and stomach',
    tags: ['abdomen', 'digestive', 'stomach', 'high-yield'],
    lesson: {
      explanation: 'The digestive tract begins at the oral cavity. Three pairs of extrinsic salivary glands secrete saliva: parotid glands (largest, situated anterior and inferior to ear, secretes serous fluid with salivary amylase via Stensen\'s duct piercing the buccinator opposite upper 2nd molar), submandibular glands (beneath base of tongue in submandibular fossa, Wharton\'s duct opens at lingual frenulum), and sublingual glands (floor of mouth, multiple small ducts of Rivinus). The oesophagus is a 25 cm muscular tube extending from the laryngopharynx (C6) through the posterior mediastinum, piercing the diaphragm at the oesophageal hiatus (T10) to join the stomach at the cardiac orifice (T11). Its muscularis externa changes from skeletal muscle in upper 1/3, to mixed in middle 1/3, and smooth muscle in lower 1/3. The stomach is a J-shaped muscular pouch in the LUQ: cardia (surrounding cardiac orifice), fundus (dome superior to cardia), body (central large portion), and pyloric part (antrum, pyloric canal, and pyloric sphincter at L1 transpyloric plane). Mucosa forms longitudinal folds (rugae) allowing marked distension. The muscularis externa uniquely contains three layers of smooth muscle: outer longitudinal, middle circular, and inner oblique layer, enabling powerful mechanical churning of food into chyme.',
      plain: 'The upper digestive tract includes 3 salivary glands (parotid is largest; duct opens opposite upper 2nd molar). The oesophagus pierces the diaphragm at T10. The stomach has 4 parts: cardia, fundus, body, and pylorus (sphincter at L1). Its mucosa forms rugae when empty. Uniquely, the stomach wall has three smooth muscle layers (longitudinal, circular, and inner oblique) for mechanical churning.',
      keyFacts: [
        'Parotid gland is the largest salivary gland; duct opens opposite the upper 2nd molar.',
        'Oesophagus passes through the diaphragm at T10 and enters stomach at cardiac orifice.',
        'Stomach has 4 regions: cardia, fundus, body, pyloric part.',
        'Pyloric sphincter controls gastric emptying at the L1 transpyloric plane.',
        'Stomach uniquely features three muscular layers: longitudinal, circular, and inner oblique.',
        'Gastric rugae are prominent mucosal folds that flatten as the stomach fills.',
      ],
      prerequisites: ['hss2011-m3-digestive'],
      examples: ['Pyloric stenosis in infants causes projectile vomiting due to hypertrophy of the pyloric sphincter muscle.'],
    },
    memory: {
      chunking: 'Stomach parts from entry to exit: Cardia → Fundus → Body → Pylorus (Can Frank Bite Pylorus).',
      comparison: 'Entire GI tract has 2 muscle layers (circular, longitudinal); stomach uniquely has 3 (adds inner oblique).',
    },
    practice: [
      {
        type: 'mcq',
        prompt: 'Which muscle layer is uniquely present in the muscularis externa of the stomach wall?',
        options: ['Longitudinal layer', 'Circular layer', 'Oblique layer', 'Transverse layer'],
        answer: 2,
        explanation: 'The stomach uniquely has an inner oblique layer of smooth muscle in addition to circular and longitudinal layers.',
        src: { ref: 'hss.3.1', location: 'p12 Stomach wall anatomy' }
      },
      {
        type: 'mcq',
        prompt: 'Which is the largest of the three pairs of extrinsic salivary glands?',
        options: ['Submandibular gland', 'Sublingual gland', 'Parotid gland', 'Buccal gland'],
        answer: 2,
        explanation: 'The parotid gland is the largest salivary gland, located anterior and inferior to the ear.',
        src: { ref: 'hss.revans', location: 'Module 3.1 answers' }
      },
      {
        type: 'cloze',
        prompt: 'The junction between the oesophagus and the stomach is called the ______ orifice.',
        accept: ['cardiac', 'cardiac orifice'],
        explanation: 'The cardiac orifice is where the oesophagus empties into the stomach at the T11 level.',
        src: { ref: 'hss.3.1', location: 'p10 Stomach gross anatomy' }
      },
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'A patient experiences severe gastro-oesophageal reflux disease (GERD). Which anatomical sphincter and diaphragmatic opening are involved?',
        model: 'The lower oesophageal sphincter (physiological gastro-oesophageal sphincter) and the oesophageal hiatus of the diaphragm (at T10). Incompetence of the sphincter or herniation of the stomach through the hiatus (hiatus hernia) permits acid to flow back into the oesophagus.',
        rubric: ['Identifies lower oesophageal sphincter', 'Identifies oesophageal hiatus at T10', 'Explains acid reflux into oesophagus']
      }
    ],
    commonMistakes: [
      'Believing the stomach has only two muscle layers like the intestines.',
      'Placing the parotid duct inside the floor of the mouth (that is the submandibular/sublingual location).',
    ],
    skills: [
      'Identify the gastric fundus air bubble and rugal fold patterns on erect abdominal radiographs and barium swallow exams.',
    ],
    selfCheck: 'From memory: name the 3 salivary glands, 4 regions of the stomach, and 3 stomach wall muscle layers.',
    sourceRefs: [{ ref: 'hss.3.1', location: 'p4–p18 Upper digestive tract and stomach' }, { ref: 'hss.revans', location: 'Module 3.1 answers' }],
  },

  {
    id: 'hss2011-digestive-tract-small-large-bowel',
    subject: 'HSS2011', unit: 'hss.m3', type: 'definition',
    title: 'Lower gastrointestinal tract — small and large intestine architecture',
    tags: ['abdomen', 'digestive', 'intestine', 'colon', 'high-yield'],
    lesson: {
      explanation: 'The small intestine spans ~6 meters and carries out nutrient digestion and absorption. It consists of three parts: 1) Duodenum (25 cm C-shaped loop wrapping head of pancreas; 2nd descending part receives bile and pancreatic ducts at major duodenal papilla; ends at duodenojejunal flexure at L2 supported by ligament of Treitz); 2) Jejunum (upper 2/5, wider lumen, thick wall, prominent permanent mucosal folds called plicae circulares, tall villi, primary site of absorption); 3) Ileum (lower 3/5, longest portion of gut, thinner wall, fewer plicae circulares, aggregated lymphoid nodules called Peyer\'s patches in mucosa, terminates at ileocaecal valve in RLQ). The large intestine (colon) frames the small intestine, absorbing water and electrolytes (~1.5 m): Caecum with vermiform appendix (attached at posteromedial wall, surface landmark McBurney\'s point 1/3 from ASIS to umbilicus), Ascending colon, Right colic (hepatic) flexure, Transverse colon (suspended by transverse mesocolon), Left colic (splenic) flexure (higher than hepatic flexure), Descending colon, Sigmoid colon (S-shaped, pelvic cavity), Rectum, and Anal canal. Three distinctive anatomical features differentiate the colon from small bowel: 1) Teniae coli (three bands of longitudinal smooth muscle); 2) Haustra (series of pouches puckered by teniae coli); 3) Epiploic appendages (fat-filled peritoneal tags along colon).',
      plain: 'Small intestine: duodenum (C-loop around pancreas head; 2nd part has major duodenal papilla), jejunum (upper 2/5, thick wall, deep circular folds), and ileum (lower 3/5, longest segment, Peyer\'s patches, ends at ileocaecal valve). Large intestine: caecum & appendix in RLQ, ascending, transverse, descending, sigmoid colon, rectum. Colon has 3 unique features: teniae coli (3 muscle ribbons), haustra (pouches), and epiploic appendages (fat tags).',
      keyFacts: [
        'Small intestine regions: Duodenum (shortest, C-loop), Jejunum (upper 2/5), Ileum (longest, lower 3/5).',
        'Major duodenal papilla is in the 2nd (descending) part of the duodenum.',
        'Ileum is the longest segment of the gut and contains Peyer\'s patches.',
        'Colon features 3 unique structures: teniae coli, haustra, and epiploic appendages.',
        'Splenic (left colic) flexure sits higher and deeper than hepatic (right colic) flexure.',
      ],
      prerequisites: ['hss2011-digestive-tract-upper'],
      examples: ['Acute appendicitis causes focal tenderness at McBurney\'s point in the right lower quadrant.'],
    },
    memory: {
      chunking: 'Small bowel order: Duodenum, Jejunum, Ileum (Dow Jones Index: D-J-I).',
      firstLetter: 'Colon unique triad: THE — Teniae coli, Haustra, Epiploic appendages.',
    },
    practice: [
      {
        type: 'mcq',
        prompt: 'Which segment of the human gastrointestinal tract is the longest overall?',
        options: ['Duodenum', 'Jejunum', 'Ileum', 'Transverse colon'],
        answer: 2,
        explanation: 'The ileum forms the distal three-fifths of the small intestine and is the longest individual segment of the gut.',
        src: { ref: 'hss.revans', location: 'Module 3.1 answers' }
      },
      {
        type: 'cloze',
        prompt: 'The three longitudinal ribbons of smooth muscle running along the outer surface of the colon are called ______ ______.',
        accept: ['teniae coli', 'taeniae coli', 'taenia coli', 'tenia coli'],
        explanation: 'Teniae coli are the 3 bands of outer longitudinal muscle whose tone pulls the colon into pouches (haustra).',
        src: { ref: 'hss.3.1', location: 'p28 Large intestine' }
      },
      {
        type: 'mcq',
        prompt: 'The common bile duct and main pancreatic duct empty into which part of the duodenum?',
        options: ['Superior (1st) part', 'Descending (2nd) part', 'Horizontal (3rd) part', 'Ascending (4th) part'],
        answer: 1,
        explanation: 'The ducts join and open at the major duodenal papilla located in the descending (second) part of the duodenum.',
        src: { ref: 'hss.3.1', location: 'p22 Duodenum' }
      },
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'On an abdominal X-ray of suspected bowel obstruction, how can you differentiate dilated loops of small intestine from dilated large intestine?',
        model: 'Small intestine loops lie centrally and display valvulae conniventes (plicae circulares) that cross the entire luminal diameter from wall to wall. Large intestine loops lie peripherally and show haustral indentations that only partially cross the lumen, separated by teniae coli.',
        rubric: ['Names small bowel as central with plicae circulares crossing complete width', 'Names large bowel as peripheral with haustra crossing partially', 'Notes distinctive teniae coli']
      }
    ],
    commonMistakes: [
      'Confusing the jejunum as being longer than the ileum (ileum is 3/5, jejunum is 2/5).',
      'Thinking haustra extend completely across the bowel lumen like plicae circulares.',
    ],
    skills: [
      'Differentiate small and large bowel gas patterns on plain abdominal radiographs.',
    ],
    selfCheck: 'From memory: list the 3 parts of the small intestine, the 4 parts of the colon, and the 3 distinct anatomical features of the large intestine.',
    sourceRefs: [{ ref: 'hss.3.1', location: 'p20–p32 Small and large intestine' }, { ref: 'hss.revans', location: 'Module 3.1 answers' }],
  },

  {
    id: 'hss2011-digestive-accessory-liver-pancreas',
    subject: 'HSS2011', unit: 'hss.m3', type: 'definition',
    title: 'Accessory digestive organs — liver, biliary tree and pancreas',
    tags: ['abdomen', 'digestive', 'liver', 'pancreas', 'biliary', 'high-yield'],
    lesson: {
      explanation: 'The accessory digestive organs produce and deliver digestive enzymes and buffers into the duodenum. The Liver is the largest internal organ (RUQ): divided into 4 lobes: right lobe (largest), left lobe, quadrate lobe (inferior, adjacent to gallbladder), and caudate lobe (posterior, adjacent to IVC). Falciform ligament attaches liver to anterior wall; free margin contains ligamentum teres (round ligament, remnant of umbilical vein). The porta hepatis (hilum of liver) transmits the portal triad: hepatic portal vein (posterior), hepatic artery proper (anterior-left), and common hepatic duct (anterior-right). Gallbladder: pear-shaped muscular sac on visceral liver surface; stores and concentrates bile; cystic duct unites with common hepatic duct to form common bile duct. Pancreas: retroperitoneal gland lying transversely across posterior abdominal wall behind stomach; Head (nestled in duodenal C-loop, with uncinate process extending behind superior mesenteric vessels), Neck, Body, and Tail (contacts spleen). Exocrine secretions drain via main pancreatic duct (duct of Wirsung), which joins common bile duct to form hepatopancreatic ampulla (ampulla of Vater), opening at major duodenal papilla controlled by sphincter of Oddi; accessory pancreatic duct (duct of Santorini) opens 2 cm superiorly at minor duodenal papilla.',
      plain: 'The liver (RUQ) has 4 lobes (right, left, quadrate, caudate). The porta hepatis carries the portal triad: hepatic portal vein, hepatic artery proper, and common hepatic duct. The gallbladder stores bile; its cystic duct joins the common hepatic duct to form the common bile duct. The pancreas lies retroperitoneally; its main duct joins the common bile duct at the ampulla of Vater (sphincter of Oddi) in the 2nd part of the duodenum.',
      keyFacts: [
        'Liver has 4 lobes: right, left, quadrate, and caudate.',
        'Porta hepatis contains portal triad: portal vein, hepatic artery proper, common hepatic duct.',
        'Common bile duct = cystic duct + common hepatic duct.',
        'Pancreas has head, uncinate process, neck, body, and tail (touches spleen).',
        'Main pancreatic duct joins common bile duct at the ampulla of Vater (major duodenal papilla).',
        'Hepatic lobules are hexagonal cylinders with portal triads at their corners.',
      ],
      prerequisites: ['hss2011-digestive-tract-small-large-bowel'],
      examples: ['A gallstone lodged in the ampulla of Vater blocks both bile and pancreatic drainage, triggering acute gallstone pancreatitis.'],
    },
    memory: {
      chunking: 'Biliary tree: Right + Left Hepatic → Common Hepatic; Common Hepatic + Cystic → Common Bile Duct (CBD).',
      comparison: 'Quadrate lobe is inferior (next to Gallbladder); Caudate lobe is superior/posterior (next to IVC).',
    },
    practice: [
      {
        type: 'mcq',
        prompt: 'The common bile duct is formed by the junction of the common hepatic duct and the:',
        options: ['Main pancreatic duct', 'Cystic duct', 'Right hepatic duct', 'Accessory pancreatic duct'],
        answer: 1,
        explanation: 'The cystic duct from the gallbladder merges with the common hepatic duct to form the common bile duct.',
        src: { ref: 'hss.3.1', location: 'p36 Biliary tract' }
      },
      {
        type: 'cloze',
        prompt: 'The hilum of the liver where the portal vein, hepatic artery, and bile duct enter and exit is the ______ ______.',
        accept: ['porta hepatis'],
        explanation: 'The porta hepatis is the deep transverse fissure on the visceral surface of the liver transmitting the portal triad.',
        src: { ref: 'hss.3.1', location: 'p34 Liver anatomy' }
      },
      {
        type: 'mcq',
        prompt: 'The head of the pancreas lies nestled within the C-shaped curve of which organ?',
        options: ['Stomach', 'Duodenum', 'Transverse colon', 'Jejunum'],
        answer: 1,
        explanation: 'The head of the pancreas is cradled by the four parts of the C-shaped duodenum.',
        src: { ref: 'hss.3.1', location: 'p40 Pancreas' }
      },
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'A patient with carcinoma of the head of the pancreas develops obstructive jaundice (yellow skin and sclera). Explain the anatomical relationship causing this presentation.',
        model: 'The common bile duct passes through or immediately posterior to the head of the pancreas on its way to empty into the duodenum. An expanding tumor in the pancreatic head compresses the common bile duct, blocking bile outflow from the liver and gallbladder into the duodenum.',
        rubric: ['Names the common bile duct passing through/behind pancreatic head', 'Explains tumor compresses common bile duct', 'Concludes obstruction stops bile drainage causing jaundice']
      }
    ],
    commonMistakes: [
      'Thinking the liver produces digestive enzymes (liver produces bile; pancreas produces digestive enzymes).',
      'Confusing the hepatic veins (drain liver into IVC) with the hepatic portal vein (brings gut blood into liver).',
    ],
    skills: [
      'Trace the biliary ducts on ultrasound, magnetic resonance cholangiopancreatography (MRCP), and ERCP scans.',
    ],
    selfCheck: 'From memory: draw the biliary duct system from right/left hepatic ducts to the duodenum and label the gallbladder, cystic duct, CBD, and pancreatic duct.',
    sourceRefs: [{ ref: 'hss.3.1', location: 'p34–p42 Liver, gallbladder, and pancreas' }, { ref: 'hss.revans', location: 'Module 3.1 answers' }],
  },

  {
    id: 'hss2011-digestive-peritoneum-portal-circulation',
    subject: 'HSS2011', unit: 'hss.m3', type: 'definition',
    title: 'Peritoneal reflections, mesenteries and the hepatic portal system',
    tags: ['abdomen', 'peritoneum', 'portal-vein', 'high-yield'],
    lesson: {
      explanation: 'The peritoneum is an extensive serous membrane lining the abdominopelvic cavity (parietal peritoneum) and invaginating to cover abdominal organs (visceral peritoneum). Intraperitoneal organs are completely wrapped by visceral peritoneum and suspended by mesenteries (stomach, liver, spleen, jejunum, ileum, transverse colon, sigmoid colon); Retroperitoneal organs lie against the posterior abdominal wall covered by peritoneum only on their anterior surface (kidneys, adrenal glands, pancreas, duodenum parts 2–4, ascending and descending colon, abdominal aorta, IVC — mnemonic SAD PUCKER). Peritoneal folds: 1) Greater omentum: prominent 4-layered fatty apron hanging from greater curvature of stomach over transverse colon and small intestines; 2) Lesser omentum: double layer connecting visceral liver surface to lesser curvature of stomach (hepatogastric ligament) and 1st part of duodenum (hepatoduodenal ligament enclosing portal triad); 3) Mesentery proper: fan-shaped fold anchoring jejunum and ileum to posterior wall, carrying superior mesenteric vessels. Hepatic Portal System: drains venous blood from the capillary beds of the abdominal GI tract, pancreas, gallbladder, and spleen into the liver sinusoids before blood reaches the IVC. The hepatic portal vein is formed behind the neck of the pancreas by the confluence of the Superior Mesenteric Vein (SMV) and the Splenic Vein (which receives the Inferior Mesenteric Vein / IMV).',
      plain: 'Intraperitoneal organs (stomach, liver, small bowel, transverse colon) are suspended in peritoneal folds; retroperitoneal organs (kidneys, pancreas, ascending/descending colon, aorta, IVC) sit against the back wall. The greater omentum hangs like a fatty apron from the stomach\'s greater curve; the lesser omentum connects liver to stomach. Venous blood from gut, spleen, and pancreas collects into the Hepatic Portal Vein (formed by SMV + Splenic vein) and goes to the liver before returning to the IVC.',
      keyFacts: [
        'Intraperitoneal organs are mobile, suspended by mesenteries; retroperitoneal organs lie behind the peritoneum.',
        'Greater omentum hangs from greater curvature of stomach; lesser omentum links liver to lesser curvature.',
        'Mesentery proper suspends jejunum and ileum, carrying superior mesenteric blood vessels.',
        'Hepatic portal vein is formed by the union of Superior Mesenteric Vein and Splenic Vein.',
        'Blood passes through two capillary beds: gut capillaries → portal vein → liver sinusoids → hepatic veins → IVC.',
      ],
      prerequisites: ['hss2011-digestive-accessory-liver-pancreas'],
      examples: ['Cirrhosis causing portal hypertension produces portosystemic collateral dilation (oesophageal varices, caput medusae).'],
    },
    memory: {
      mnemonic: 'Retroperitoneal organs: SAD PUCKER — Suprarenal glands, Aorta/IVC, Duodenum (parts 2–4), Pancreas, Ureters, Colon (ascending/descending), Kidneys, Esophagus, Rectum.',
      chunking: 'Portal vein recipe: Superior Mesenteric Vein + Splenic Vein behind the pancreatic neck.',
    },
    practice: [
      {
        type: 'mcq',
        prompt: 'The hepatic portal vein is formed behind the neck of the pancreas by the junction of which two veins?',
        options: ['Inferior mesenteric vein and renal vein', 'Superior mesenteric vein and splenic vein', 'Hepatic vein and celiac vein', 'Left gastric vein and superior vena cava'],
        answer: 1,
        explanation: 'The Superior Mesenteric Vein (SMV) and Splenic Vein unite behind the neck of the pancreas to form the hepatic portal vein.',
        src: { ref: 'hss.3.3', location: 'p16 Hepatic portal system' }
      },
      {
        type: 'cloze',
        prompt: 'The large, fatty peritoneal fold that hangs like an apron from the greater curvature of the stomach over the intestines is the ______ ______.',
        accept: ['greater omentum'],
        explanation: 'The greater omentum hangs down from the stomach over the transverse colon and small bowel coils.',
        src: { ref: 'hss.3.3', location: 'p10 Greater omentum' }
      },
      {
        type: 'mcq',
        prompt: 'Which of the following organs is retroperitoneal in the adult human body?',
        options: ['Stomach', 'Spleen', 'Kidney', 'Jejunum'],
        answer: 2,
        explanation: 'The kidneys lie behind the parietal peritoneum on the posterior abdominal wall (retroperitoneal).',
        src: { ref: 'hss.3.3.2019', location: 'p14 Retroperitoneal organs' }
      },
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'Why does blood carrying glucose and amino acids absorbed from a meal pass to the liver before circulating to the rest of the body?',
        model: 'Nutrients absorbed from the stomach and intestines drain into the hepatic portal system. The hepatic portal vein carries this blood directly to the liver sinusoids, allowing hepatocytes to process nutrients, synthesize glycogen and plasma proteins, and detoxify absorbed substances before the blood empties into the systemic circulation via the hepatic veins and IVC.',
        rubric: ['Identifies hepatic portal system / portal vein', 'Explains liver processes nutrients/metabolites first', 'Notes blood exits via hepatic veins to systemic IVC']
      }
    ],
    commonMistakes: [
      'Confusing the hepatic portal vein (brings nutrient blood to liver) with the hepatic veins (drain blood from liver to IVC).',
      'Thinking the kidneys are intraperitoneal organs suspended in mesentery.',
    ],
    skills: [
      'Identify peritoneal fluid collections in the subphrenic spaces and hepatorenal recess (Morison\'s pouch) on abdominal ultrasound (FAST exam).',
    ],
    selfCheck: 'From memory: list 3 intraperitoneal and 3 retroperitoneal organs, and state the two veins that form the hepatic portal vein.',
    sourceRefs: [{ ref: 'hss.3.3', location: 'p6–p20 Peritoneum and portal system' }, { ref: 'hss.3.3.2019', location: 'p8–p24 Peritoneal cavity and omenta' }],
  },

  {
    id: 'hss2011-digestive-tutorial-pastpaper-practice',
    subject: 'HSS2011', unit: 'hss.m3', type: 'cloze',
    title: 'Digestive anatomy collaborative tutorial & revision practice',
    tags: ['abdomen', 'digestive', 'assessment', 'tutorial', 'high-yield'],
    lesson: {
      explanation: 'Official Module 3 revision questions test key digestive discriminations: the longest portion of the gut is the ileum; teniae coli are three bands of longitudinal smooth muscle found in the colon wall; the parotid gland is the largest salivary gland; the cardiac orifice is the opening of the oesophagus into the stomach; gastric pits reside in the gastric mucosa; hepatic lobules typically contain six portal triads around their periphery; simple columnar epithelium lines the majority of the gastrointestinal tract (stomach through rectum) for secretion and absorption, whereas stratified squamous epithelium lines the oesophagus and anal canal for protection; and absorbed nutrients travel to the liver via the hepatic portal vein.',
      plain: 'Core digestive exam review: ileum is the longest segment, colon has teniae coli, parotid is the largest salivary gland, and nutrients travel to the liver through the hepatic portal vein.',
      keyFacts: [
        'Longest part of the gut is the ileum.',
        'Teniae coli are 3 longitudinal smooth muscle bands in the colon.',
        'Parotid gland is the largest salivary gland.',
        'Hepatic portal vein conveys absorbed gut nutrients to the liver.',
      ],
      prerequisites: ['hss2011-m3-digestive', 'hss2011-digestive-tract-upper'],
      examples: ['Exam past paper question: "Which organ features teniae coli? Answer: Colon."'],
    },
    memory: {
      teachBack: 'Explain why the stomach has three muscle layers while the colon has three teniae coli.',
    },
    practice: [
      {
        type: 'mcq',
        prompt: 'The longest part of the entire human gastrointestinal tract is the:',
        options: ['Duodenum', 'Jejunum', 'Ileum', 'Colon'],
        answer: 2,
        explanation: 'Model answer C. The ileum is the longest portion of the gut.',
        src: { ref: 'hss.revans', location: 'Module 3.1, MCQ 1' }
      },
      {
        type: 'cloze',
        prompt: 'Teniae coli are bands of smooth muscle found in the wall of the ______.',
        accept: ['colon', 'large intestine'],
        explanation: 'Model answer: colon.',
        src: { ref: 'hss.revans', location: 'Module 3.1, Fill-in-blanks 3' }
      },
      {
        type: 'cloze',
        prompt: 'The largest salivary gland is the ______ gland.',
        accept: ['parotid', 'parotid gland'],
        explanation: 'Model answer: parotid.',
        src: { ref: 'hss.revans', location: 'Module 3.1, Fill-in-blanks 4' }
      },
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'A biopsy of the intestinal mucosa reveals prominent patches of aggregated lymphoid follicles in the submucosa. Which specific region of the bowel was sampled?',
        model: 'The ileum. Aggregated lymphoid nodules (Peyer\'s patches) are the histological hallmark of the ileum, functioning as part of the mucosal immune system to monitor intestinal bacterial populations.',
        rubric: ['Identifies the ileum', 'Names Peyer\'s patches / aggregated lymphoid nodules', 'Notes immune surveillance role']
      }
    ],
    commonMistakes: [
      'Assigning teniae coli to the small intestine (they exist only on the large intestine).',
    ],
    skills: [
      'Identify small vs large bowel features on contrast barium enema studies.',
    ],
    selfCheck: 'From memory: answer the 3 revision questions on longest part of gut, teniae coli, and largest salivary gland.',
    sourceRefs: [{ ref: 'hss.revans', location: 'Module 3.1 answers' }, { ref: 'hss.manual1920', location: 'Module 3.1 Revision exercise' }],
  },

  /* ========================================================================
   * WEEK 12: UROGENITAL SYSTEM & PELVIS (Module 4)
   * ======================================================================== */
  {
    id: 'hss2011-uro-kidneys-urinary-tract',
    subject: 'HSS2011', unit: 'hss.m3', type: 'definition',
    title: 'Kidney gross architecture, nephron collecting system and urinary tract',
    tags: ['pelvis', 'urogenital', 'kidney', 'urinary', 'high-yield'],
    lesson: {
      explanation: 'The kidneys are paired retroperitoneal bean-shaped organs lying against the posterior abdominal wall at T12–L3 vertebral levels; the right kidney sits 1–2 cm lower than the left due to the liver. Each kidney is encased by three layers: innermost fibrous renal capsule, middle perirenal fat capsule, and outer renal fascia. Coronal section reveals an outer reddish-brown renal cortex and an inner renal medulla consisting of 8–18 conical renal pyramids. The bases of pyramids face the cortex; their apices (renal papillae) project medially toward the renal sinus. Between pyramids run extensions of cortical tissue called renal columns (of Bertin). Urine formed by >1 million nephrons in the cortex/medulla drains: renal papilla → minor calyx (8–18) → major calyx (2–3) → renal pelvis (funnel-shaped upper expansion of ureter) → ureter at the ureteropelvic junction (UPJ). Ureters: 25 cm retroperitoneal muscular tubes lined by transitional epithelium (urothelium); descend over psoas major, cross the pelvic brim at bifurcation of common iliac vessels, and enter posterior bladder wall obliquely (creating a physiological valve preventing backflow). Urinary Bladder: hollow muscular organ behind pubic symphysis (in pelvic cavity when empty, ascends into abdominal cavity when distended); wall consists of thick detrusor muscle (3 interlacing smooth muscle layers); interior base has the trigone, a smooth triangular region between the two ureteric orifices and the internal urethral orifice (clinically prone to persistent infection). Urethra: transports urine from bladder to exterior; guarded by involuntary internal urethral sphincter (smooth muscle at bladder neck) and voluntary external urethral sphincter (skeletal muscle in urogenital diaphragm); female urethra is short (4 cm), predisposing females to ascending UTIs; male urethra is long (20 cm) with three divisions: prostatic, membranous, and spongy (penile) urethra.',
      plain: 'The kidneys lie retroperitoneally at T12–L3 (right is lower). Urine flows from renal pyramids → renal papillae → minor calyces → major calyces → renal pelvis → ureters. Ureters enter the bladder obliquely to prevent reflux. The bladder wall is formed by the detrusor muscle; its smooth floor has the trigone (between 2 ureter openings and urethra). Female urethra is short (4 cm); male urethra has 3 parts (prostatic, membranous, spongy).',
      keyFacts: [
        'Kidneys lie retroperitoneally at T12–L3; right kidney sits lower due to liver bulk.',
        'Urine flow: renal papilla → minor calyx → major calyx → renal pelvis → ureter.',
        'Renal columns (of Bertin) separate adjacent conical renal pyramids.',
        'Urinary bladder wall is formed by the thick detrusor muscle.',
        'Trigone is the smooth triangular area between the two ureteric orifices and internal urethral orifice.',
        'Urethral sphincters: internal (involuntary smooth muscle) and external (voluntary skeletal muscle).',
      ],
      prerequisites: ['hss2011-m3-urogenital-pelvis'],
      examples: ['A kidney stone (nephrolithiasis) commonly impacts at the UPJ, the pelvic brim crossing, or the ureterovesical junction (UVJ).'],
    },
    memory: {
      chunking: 'Urine drainage sequence: Papilla → Minor calyx → Major calyx → Pelvis → Ureter → Bladder → Urethra.',
      comparison: 'Internal sphincter = involuntary smooth muscle (ANS); External sphincter = voluntary skeletal muscle (pudendal nerve).',
    },
    practice: [
      {
        type: 'mcq',
        prompt: 'In what sequence does urine flow from the renal pyramids to the ureter?',
        options: [
          'Major calyx → minor calyx → renal papilla → renal pelvis',
          'Renal papilla → minor calyx → major calyx → renal pelvis',
          'Renal column → renal pelvis → major calyx → minor calyx',
          'Renal sinus → renal pyramid → minor calyx → renal pelvis'
        ],
        answer: 1,
        explanation: 'Urine flows from the apex of the pyramid (renal papilla) into minor calyces, which unite into major calyces, emptying into the funnel-shaped renal pelvis.',
        src: { ref: 'hss.3.2', location: 'p8 Kidney internal architecture' }
      },
      {
        type: 'cloze',
        prompt: 'The smooth, triangular area on the internal floor of the urinary bladder is called the ______.',
        accept: ['trigone', 'urinary trigone', 'bladder trigone'],
        explanation: 'The trigone is bounded by the two ureteric orifices and the single internal urethral orifice.',
        src: { ref: 'hss.3.2', location: 'p14 Urinary bladder' }
      },
      {
        type: 'mcq',
        prompt: 'Which muscle forms the primary muscular wall of the urinary bladder and contracts during micturition?',
        options: ['Dartos muscle', 'Detrusor muscle', 'Cremaster muscle', 'Levator ani'],
        answer: 1,
        explanation: 'The detrusor muscle forms the three-layered muscular coat of the urinary bladder.',
        src: { ref: 'hss.3.2', location: 'p14 Urinary bladder' }
      },
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'Why are females anatomically much more prone to ascending urinary tract infections (UTIs) than males?',
        model: 'The female urethra is significantly shorter (~4 cm) compared to the male urethra (~20 cm), and its external urethral orifice is situated in close proximity to the vagina and anus, allowing bacteria to migrate easily into the bladder.',
        rubric: ['Identifies short female urethra (~4 cm)', 'Contrasts with male urethra (~20 cm)', 'Explains shorter distance for bacterial ascent into bladder']
      }
    ],
    commonMistakes: [
      'Reversing the order of minor and major calyces.',
      'Assuming the internal urethral sphincter is under voluntary control (it is involuntary autonomic smooth muscle).',
    ],
    skills: [
      'Trace the urinary tract and detect hydronephrosis / calculus obstruction on intravenous urogram (IVU) or CT KUB.',
    ],
    selfCheck: 'From memory: trace urine flow through the kidney and describe the boundaries of the bladder trigone.',
    sourceRefs: [{ ref: 'hss.3.2', location: 'p4–p16 Kidney and urinary system' }, { ref: 'hss.revans', location: 'Module 3.2 answers' }],
  },

  {
    id: 'hss2011-uro-male-reproductive-anatomy',
    subject: 'HSS2011', unit: 'hss.m3', type: 'definition',
    title: 'Male reproductive tract, accessory glands and spermatic cord',
    tags: ['pelvis', 'urogenital', 'male-reproductive', 'high-yield'],
    lesson: {
      explanation: 'The male reproductive system comprises the testes, epididymides, ductus deferentia, ejaculatory ducts, urethra, accessory glands, and penis. Testes: paired gonads in the scrotum, maintaining temperature 2–3°C below core body temperature essential for spermatogenesis; tunica albuginea fibrous capsule divides testis into lobules containing seminiferous tubules (spermatogenesis), draining to rete testis and efferent ductules. Epididymis: comma-shaped structure on posterolateral testis (head, body, tail), site where sperm mature and gain motility (stored up to months). Ductus (vas) deferens: 45 cm muscular tube; ascends within the spermatic cord through the superficial inguinal ring, inguinal canal, and deep inguinal ring into pelvic cavity, passes over ureter, dilates as ampulla, and joins duct of seminal vesicle to form the ejaculatory duct (which enters prostatic urethra). Spermatic cord components: ductus deferens, testicular artery, pampiniform venous plexus (countercurrent heat exchange), genital branch of genitofemoral nerve, lymphatics, and cremaster muscle (elevates testes). Male Accessory Glands: 1) Seminal vesicles (paired glands posterior to bladder; produce 60% of semen volume, alkaline fluid rich in fructose, prostaglandins, clotting proteins); 2) Prostate gland (single walnut-sized gland inferior to bladder surrounding prostatic urethra; produces 30% of semen volume, milky slightly acidic fluid containing citrate, prostate-specific antigen / PSA, and enzymes); 3) Bulbourethral (Cowper\'s) glands (paired pea-sized glands in urogenital diaphragm; secrete clear alkaline mucus during sexual arousal into spongy urethra to neutralize residual acidic urine). Penis: contains three cylindrical erectile bodies: paired dorsolateral corpora cavernosa and single midventral corpus spongiosum (enclosing spongy urethra and expanding distally into glans penis).',
      plain: 'The male reproductive tract runs: testis (seminiferous tubules make sperm) → epididymis (mature and store) → ductus deferens (travels in spermatic cord via inguinal canal) → joins seminal vesicle to form ejaculatory duct → prostatic urethra. The spermatic cord has the pampiniform plexus for cooling. Three accessory glands: seminal vesicles (60% volume, fructose-rich), prostate (30% volume, surrounds urethra), and bulbourethral glands (pre-ejaculatory lubricating mucus). Penis has 3 erectile bodies: 2 corpora cavernosa and 1 corpus spongiosum.',
      keyFacts: [
        'Seminiferous tubules are the site of spermatogenesis; epididymis is the site of sperm maturation and storage.',
        'Spermatic cord contains ductus deferens, testicular artery, pampiniform plexus, and cremaster muscle.',
        'Ejaculatory duct is formed by the union of ductus deferens and seminal vesicle duct.',
        'Seminal vesicles produce ~60% of semen volume (alkaline, fructose-rich).',
        'Prostate gland surrounds the prostatic urethra immediately below the bladder neck.',
        'Penis erectile tissue: 2 corpora cavernosa (dorsal) and 1 corpus spongiosum (ventral, surrounds urethra).',
      ],
      prerequisites: ['hss2011-uro-kidneys-urinary-tract'],
      examples: ['Benign Prostatic Hyperplasia (BPH) compresses the prostatic urethra, causing urinary hesitancy and weak stream.'],
    },
    memory: {
      chunking: 'Sperm pathway: SEVEN UP — Seminiferous tubules, Epididymis, Vas deferens, Ejaculatory duct, (Nothing), Urethra, Penis.',
      comparison: 'Corpora cavernosa = 2 dorsolateral cylinders (erection rigidity); Corpus spongiosum = 1 ventral cylinder (keeps urethra open).',
    },
    practice: [
      {
        type: 'mcq',
        prompt: 'The ejaculatory duct is formed by the union of the ductus deferens with the duct of the:',
        options: ['Bulbourethral gland', 'Seminal vesicle', 'Prostate gland', 'Epididymis'],
        answer: 1,
        explanation: 'The ductus deferens ampulla merges with the seminal vesicle duct to form the ejaculatory duct within the prostate.',
        src: { ref: 'hss.3.2', location: 'p22 Ductus deferens and ejaculatory duct' }
      },
      {
        type: 'mcq',
        prompt: 'Which male accessory sex gland surrounds the proximal part of the urethra immediately inferior to the urinary bladder?',
        options: ['Bulbourethral gland', 'Prostate gland', 'Seminal vesicle', 'Testis'],
        answer: 1,
        explanation: 'The prostate gland surrounds the prostatic urethra directly beneath the bladder neck.',
        src: { ref: 'hss.3.2', location: 'p24 Male accessory glands' }
      },
      {
        type: 'cloze',
        prompt: 'The extensive venous network within the spermatic cord that cools incoming arterial blood via countercurrent heat exchange is the ______ plexus.',
        accept: ['pampiniform', 'pampiniform plexus'],
        explanation: 'The pampiniform plexus surrounds the testicular artery to cool arterial blood heading to the testes.',
        src: { ref: 'hss.3.2', location: 'p20 Spermatic cord' }
      },
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'A 72-year-old man presents with progressive difficulty urinating and nocturia. Digital rectal exam reveals an enlarged prostate. Explain the anatomical basis of his urinary symptoms.',
        model: 'The prostate gland encircles the prostatic urethra immediately inferior to the urinary bladder neck. Benign or malignant enlargement of the transitional zone of the prostate compresses the prostatic urethra, impeding the outflow of urine from the bladder.',
        rubric: ['Identifies prostate encircling prostatic urethra', 'Notes location immediately below bladder neck', 'Explains prostatic enlargement compresses urethra and obstructs urine flow']
      }
    ],
    commonMistakes: [
      'Believing the prostate produces the majority of semen volume (seminal vesicles produce ~60%, prostate produces ~30%).',
      'Confusing the corpora cavernosa with the corpus spongiosum (the urethra passes through the spongiosum).',
    ],
    skills: [
      'Recognise the prostate gland, seminal vesicles, and bladder base on pelvic MRI and transrectal ultrasound.',
    ],
    selfCheck: 'From memory: write the SEVEN UP sequence of sperm passage and list the 3 male accessory glands with their contributions.',
    sourceRefs: [{ ref: 'hss.3.2', location: 'p18–p28 Male reproductive system' }, { ref: 'hss.manual1920', location: 'Module 3.2 Study guide' }],
  },

  {
    id: 'hss2011-uro-female-reproductive-pelvis',
    subject: 'HSS2011', unit: 'hss.m3', type: 'definition',
    title: 'Female reproductive tract, uterine anatomy and pelvic peritoneal pouches',
    tags: ['pelvis', 'urogenital', 'female-reproductive', 'uterus', 'high-yield'],
    lesson: {
      explanation: 'The female reproductive system comprises the ovaries, uterine tubes, uterus, vagina, external genitalia, and mammary glands. Ovaries: paired gonads in ovarian fossae of lateral pelvic walls; produce oocytes, estrogens, and progesterone; anchored by ovarian ligament (to uterus), suspensory ligament (to pelvic wall, transmitting ovarian vessels and nerves), and mesovarium (peritoneal fold). Uterine (fallopian) tubes / oviducts: 10 cm muscular tubes extending laterally from uterus: 1) Infundibulum: funnel-shaped distal end with mobile finger-like fimbriae draping over ovary to capture ovulated oocyte; 2) Ampulla: wide, curved middle portion, the normal site of fertilization; 3) Isthmus: narrow, thick-walled medial segment adjoining uterus; 4) Uterine part: pierces uterine wall. Uterus: hollow pear-shaped muscular organ between bladder and rectum; normally anteverted (tipped forward relative to vagina) and anteflexed (curved forward over bladder); anatomical regions include dome-shaped Fundus, Body, and inferior Cervix (neck projecting into upper vagina via external os). Uterine wall has 3 layers: Perimetrium (outer serosa), Myometrium (thick middle layer of interlacing smooth muscle), and Endometrium (mucosal lining; inner stratum functionalis shed during menstruation, deep stratum basalis regenerates functional layer). Vagina: 8–10 cm distensible fibromuscular canal extending from cervix to vestibule; recess surrounding cervix forms anterior, posterior, and lateral fornices (posterior fornix is deepest, immediately adjacent to rectouterine pouch). Pelvic Peritoneal Pouches: peritoneal reflections create two blind-ended pouches in female pelvis: 1) Rectouterine pouch (Pouch of Douglas): between rectum and posterior uterus/vagina; lowest anatomical point of female peritoneal cavity where inflammatory fluid, pus, or blood readily accumulates; 2) Vesicouterine pouch: between urinary bladder and anterior uterine surface.',
      plain: 'The female reproductive tract includes: ovaries (anchored by ovarian and suspensory ligaments), uterine tubes (infundibulum with fimbriae, ampulla where fertilization occurs, isthmus), uterus (fundus, body, cervix; wall has perimetrium, thick myometrium, and endometrium whose functional layer sheds), and vagina. In the pelvis, peritoneum dips down to form the Rectouterine pouch (Pouch of Douglas) between uterus and rectum — the lowest point of the female peritoneal cavity.',
      keyFacts: [
        'Uterine tube regions: Infundibulum (with fimbriae), Ampulla (fertilization site), Isthmus, Uterine part.',
        'Fertilization normally occurs in the ampulla of the uterine tube.',
        'Normal uterine position is anteverted (tipped forward on vagina) and anteflexed (curved over bladder).',
        'Endometrium stratum functionalis is shed during menstruation; stratum basalis regenerates it.',
        'Rectouterine pouch (Pouch of Douglas) is the lowest anatomical space in the female peritoneal cavity.',
        'Suspensory ligament of the ovary transmits the ovarian artery, vein, and nerves.',
      ],
      prerequisites: ['hss2011-uro-male-reproductive-anatomy'],
      examples: ['Ectopic pregnancy most frequently implants in the ampulla of the uterine tube.'],
    },
    memory: {
      chunking: 'Tube parts outside in: Fimbriae → Infundibulum → Ampulla → Isthmus (FIAI).',
      comparison: 'Pouch of Douglas is behind the uterus (rectouterine); Vesicouterine pouch is in front of the uterus (vesicouterine).',
    },
    practice: [
      {
        type: 'mcq',
        prompt: 'Where in the female reproductive tract does fertilization of the ovulated secondary oocyte typically occur?',
        options: ['Infundibulum of uterine tube', 'Ampulla of uterine tube', 'Uterine cavity', 'Ovarian surface'],
        answer: 1,
        explanation: 'Fertilization normally occurs in the ampulla, the widest and longest portion of the uterine tube.',
        src: { ref: 'hss.3.2', location: 'p32 Uterine tube' }
      },
      {
        type: 'mcq',
        prompt: 'The lowest anatomical recess of the peritoneal cavity in the female pelvis is the:',
        options: ['Vesicouterine pouch', 'Rectouterine pouch (Pouch of Douglas)', 'Ischioanal fossa', 'Retropubic space'],
        answer: 1,
        explanation: 'The rectouterine pouch (Pouch of Douglas) is the most dependent part of the female abdominopelvic peritoneal cavity.',
        src: { ref: 'hss.revans', location: 'Module 3.2 answers' }
      },
      {
        type: 'cloze',
        prompt: 'The layer of the uterine wall consisting of thick, interlacing smooth muscle that contracts during childbirth is the ______.',
        accept: ['myometrium'],
        explanation: 'The myometrium forms the massive muscular bulk of the uterine wall.',
        src: { ref: 'hss.3.2', location: 'p34 Uterus anatomy' }
      },
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'A female patient with a ruptured ectopic pregnancy presents with acute pelvic pain and signs of internal hemorrhage. Into which peritoneal recess will blood primarily accumulate when she is upright or semi-recumbent?',
        model: 'The rectouterine pouch (Pouch of Douglas). It lies between the rectum and the posterior wall of the uterus, forming the most dependent (lowest) recess of the peritoneal cavity in females where intraperitoneal fluid, blood, or pus gravity-pools.',
        rubric: ['Identifies rectouterine pouch / Pouch of Douglas', 'Explains location between rectum and posterior uterus', 'Notes it is the most dependent/lowest point of peritoneal cavity']
      }
    ],
    commonMistakes: [
      'Placing fertilization in the uterine cavity (implantation occurs in the uterus; fertilization occurs in the ampulla).',
      'Confusing the rectouterine pouch with the vesicouterine pouch.',
    ],
    skills: [
      'Identify free pelvic fluid in the Pouch of Douglas on transvaginal ultrasound or pelvic CT scans.',
    ],
    selfCheck: 'From memory: list the 4 parts of the fallopian tube, the 3 layers of the uterine wall, and the two pelvic peritoneal pouches.',
    sourceRefs: [{ ref: 'hss.3.2', location: 'p30–p40 Female reproductive system' }, { ref: 'hss.revans', location: 'Module 3.2 answers' }],
  },

  {
    id: 'hss2011-uro-tutorial-pastpaper-practice',
    subject: 'HSS2011', unit: 'hss.m3', type: 'cloze',
    title: 'Urogenital anatomy collaborative tutorial & revision practice',
    tags: ['pelvis', 'urogenital', 'assessment', 'tutorial', 'high-yield'],
    lesson: {
      explanation: 'Official Module 3 revision questions reinforce key urogenital concepts: the kidneys lie retroperitoneally at T12–L3; the renal cortex contains renal corpuscles and proximal/distal convoluted tubules; the renal pyramids in the medulla contain collecting ducts and nephron loops; the detrusor muscle forms the contractile coat of the bladder; the prostate gland surrounds the first part of the male urethra immediately below the bladder neck; the ampulla of the fallopian tube is the normal site of fertilization; the rectouterine pouch (of Douglas) is the lowest peritoneal reflection in females; and the suprarenal gland sits atop each kidney but belongs to the endocrine system.',
      plain: 'Core urogenital exam review: urine drainage path, detrusor bladder muscle, prostate surrounding the urethra, ampulla as fertilization site, and rectouterine pouch as lowest peritoneal space.',
      keyFacts: [
        'Kidneys lie retroperitoneally between T12 and L3.',
        'Detrusor muscle forms the muscular wall of the bladder.',
        'Ampulla of fallopian tube is the normal site of fertilization.',
        'Prostate gland surrounds the male urethra directly below the bladder.',
      ],
      prerequisites: ['hss2011-m3-urogenital-pelvis', 'hss2011-uro-kidneys-urinary-tract'],
      examples: ['Exam past paper question: "Where does fertilization normally take place? Answer: Ampulla of uterine tube."'],
    },
    memory: {
      teachBack: 'Explain why the suprarenal gland is examined with the endocrine system rather than the urinary tract.',
    },
    practice: [
      {
        type: 'mcq',
        prompt: 'Which endocrine organ caps the superior pole of each kidney?',
        options: ['Pancreas', 'Suprarenal gland', 'Parathyroid gland', 'Thymus'],
        answer: 1,
        explanation: 'Model answer B. The suprarenal (adrenal) gland caps the superior pole of each kidney but is endocrine in function.',
        src: { ref: 'hss.revans', location: 'Module 3.2, MCQ 1' }
      },
      {
        type: 'cloze',
        prompt: 'The normal anatomical site of human fertilization is the ______ of the uterine tube.',
        accept: ['ampulla'],
        explanation: 'Model answer: ampulla.',
        src: { ref: 'hss.revans', location: 'Module 3.2, Fill-in-blanks 2' }
      },
      {
        type: 'cloze',
        prompt: 'The muscular coat of the urinary bladder is formed by the ______ muscle.',
        accept: ['detrusor'],
        explanation: 'Model answer: detrusor muscle.',
        src: { ref: 'hss.revans', location: 'Module 3.2, Fill-in-blanks 4' }
      },
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'A patient has a calculus lodged at the junction between the renal pelvis and the ureter. What is the clinical anatomical term for this junction?',
        model: 'The ureteropelvic junction (UPJ). It is the first of three normal physiological constrictions of the ureter (the other two being the crossing of the external iliac vessels at the pelvic brim, and the ureterovesical junction / UVJ entering the bladder wall).',
        rubric: ['Identifies ureteropelvic junction / UPJ', 'Explains transition from funnel-shaped pelvis to ureter', 'Notes it is a common site of stone impaction']
      }
    ],
    commonMistakes: [
      'Confusing the ureteropelvic junction (UPJ) at the kidney with the ureterovesical junction (UVJ) at the bladder.',
    ],
    skills: [
      'Identify the three physiological constrictions of the ureters on intravenous urogram (IVU) and CT KUB.',
    ],
    selfCheck: 'From memory: answer the 3 revision questions on suprarenal gland, fertilization site, and detrusor muscle.',
    sourceRefs: [{ ref: 'hss.revans', location: 'Module 3.2 answers' }, { ref: 'hss.manual1920', location: 'Module 3.2 Revision exercise' }],
  }
];
