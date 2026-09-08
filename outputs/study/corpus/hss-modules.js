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
    title: 'Diencephalon and the limbic system',
    tags: ['neuroanatomy', 'diencephalon', 'limbic'],
    lesson: {
      explanation: 'The diencephalon sits between the brainstem and the cerebrum, around the third ventricle, and has three parts. The thalamus is composed of several nuclei and is the "gateway" to the cerebral cortex: it is the passage for sensory input on its way to the cortex, and also contributes to motor control and to memory and emotion. Two of its nuclei are named for their traffic: the medial geniculate nucleus handles auditory input and the lateral geniculate nucleus handles visual input. The hypothalamus is the major control centre of both the autonomic nervous system and the endocrine system; its functions are hormone secretion, autonomic effects, thermoregulation, food and water intake, sleep and circadian rhythms, emotional responses and memory. It connects downward to the pituitary gland through the infundibulum. The epithalamus, at the back, contains the pineal gland, which secretes the hormone melatonin. The limbic system is the important centre of emotion and learning. Its major components are the cingulate gyrus, the hippocampus and the amygdala, with the fornix and mammillary body completing the circuit. It matters for two things: emotional behaviour, which involves the autonomic nervous system and endocrine system; and memory, converting recent (short-term) memory held by the hippocampus into long-term memory in the prefrontal lobe.',
      plain: 'The diencephalon wraps the third ventricle in three pieces. Thalamus: the relay station where nearly all sensory input passes through to reach the cortex (medial geniculate for hearing, lateral for vision), plus motor, memory and emotion roles. Hypothalamus: the master controller of the autonomic and endocrine systems (hormones, temperature, hunger and thirst, sleep, emotion), and it hangs the pituitary off itself by the infundibulum. Epithalamus: the pineal gland, which makes melatonin. The limbic system (cingulate gyrus, hippocampus, amygdala, fornix, mammillary body) is the emotion-and-learning centre; the hippocampus holds short-term memory and the prefrontal lobe stores it long-term.',
      keyFacts: [
        'Diencephalon = thalamus + hypothalamus + epithalamus, around the third ventricle.',
        'Thalamus: "gateway" to the cerebral cortex, the passage for sensory input, plus motor control, memory and emotion.',
        'Medial geniculate nucleus = auditory input; lateral geniculate nucleus = visual input.',
        'Hypothalamus: major control centre of the autonomic nervous system AND the endocrine system.',
        'Hypothalamic functions: hormone secretion, autonomic effects, thermoregulation, food and water intake, sleep and circadian rhythms, emotional responses, memory.',
        'The hypothalamus connects to the pituitary gland via the infundibulum.',
        'Epithalamus: the pineal gland (posterior), which secretes melatonin.',
        'Limbic system = centre of emotion and learning; components cingulate gyrus, hippocampus, amygdala, fornix, mammillary body.',
        'Memory: recent / short-term memory (hippocampus) is converted to long-term memory (prefrontal lobe).',
      ],
      prerequisites: ['hss2011-m2-cns-basics'],
      examples: ['Damage to the hippocampus leaves old memories intact but blocks the laying-down of new long-term memories, the short-term-to-long-term conversion the limbic system performs.'],
    },
    memory: {
      chunking: 'Diencephalon, three "-thalamus" floors: THALAMUS relays sensation up, HYPO-thalamus (below) runs the autonomic and endocrine body, EPI-thalamus (behind, on top) is the pineal clock.',
      comparison: 'Geniculate nuclei: Medial = Music (hearing), Lateral = Light (vision).',
      firstLetter: 'Limbic core: Cingulate gyrus, Hippocampus, Amygdala, plus the Fornix and Mammillary body on the circuit.',
    },
    practice: [
      { type: 'cloze', prompt: 'The part of the diencephalon that acts as the "gateway" to the cerebral cortex, the passage for sensory input, is the ______.', accept: ['thalamus'],
        explanation: 'The thalamus is composed of several nuclei and is the gateway to the cerebral cortex, the passage for sensory input, with additional motor control, memory and emotion roles.',
        src: { ref: 'hss.2.3', location: 'p16 "Gateway " — "to the cerebral cortex"' } },
      { type: 'mcq', prompt: 'The hypothalamus is the major control centre of the:', options: ['Somatic nervous system only', 'Autonomic nervous system and the endocrine system', 'Ventricular system', 'Reticular activating system'], answer: 1,
        explanation: 'The hypothalamus is the major control centre of the autonomic nervous system and the endocrine system: thermoregulation, hormone secretion, food and water intake, circadian rhythm, emotion.',
        src: { ref: 'hss.2.3', location: 'p17 "Major control center of the autonomic" — "nervous system and endocrine system"' } },
      { type: 'cloze', prompt: 'The pineal gland, found in the posterior epithalamus, secretes the hormone ______.', accept: ['melatonin'],
        explanation: 'The pineal gland is in the posterior epithalamus and secretes melatonin.',
        src: { ref: 'hss.2.3', location: 'p18 "Secretes hormone melatonin"' } },
      { type: 'matching', prompt: 'Match each limbic role or component.',
        pairs: [
          ['Hippocampus', 'Holds recent / short-term memory'],
          ['Prefrontal lobe', 'Stores long-term memory'],
          ['Limbic system overall', 'Centre of emotion and learning'],
          ['Emotional behaviour', 'Involves the ANS and endocrine system'],
        ],
        explanation: 'The limbic system converts recent memory (hippocampus) to long-term memory (prefrontal lobe), and its emotional output runs through the autonomic and endocrine systems.',
        src: { ref: 'hss.2.3', location: 'p19 "converts recent memory to long term memory" — "short term" — "hippocampus" — "long term" — "prefrontal lobe"' } },
    ],
    application: [
      { type: 'scenario', prompt: 'A lesion of the hypothalamus could disturb an unusually wide range of body functions. Name four, and say why one small region has such reach.',
        model: 'Any four of: temperature regulation, hunger and thirst (food and water intake), the sleep-wake cycle and circadian rhythm, hormone secretion, autonomic effects on the viscera, emotional responses, memory. The reach follows from its role: it is the major control centre of both the autonomic nervous system and the endocrine system, and it drives the pituitary through the infundibulum, so one region sets both the fast (autonomic) and slow (hormonal) outputs of the internal environment.',
        rubric: ['Names four hypothalamic functions', 'Identifies it as the control centre of the ANS and endocrine system', 'Mentions the pituitary link via the infundibulum'] },
    ],
    commonMistakes: [
      'Swapping the geniculate nuclei: medial is auditory, lateral is visual.',
      'Calling the pineal gland part of the hypothalamus; it is in the epithalamus.',
      'Listing Wernicke’s area as limbic; the limbic components are cingulate gyrus, hippocampus and amygdala.',
    ],
    skills: [
      'Thalamus questions almost always want the word "gateway" or "relay" for sensory input to the cortex; that is its headline function, and the geniculate nuclei are the sub-detail (medial hearing, lateral vision).',
      'The hypothalamus is the answer whenever a question mixes body systems (temperature plus hormones plus hunger plus sleep) because it is the single control point for both the autonomic and endocrine outputs.',
      'Keep the memory split straight: short-term / recent = hippocampus, long-term = prefrontal lobe; the limbic system is the machinery that moves memory from one to the other.',
    ],
    selfCheck: 'From a blank page: the three parts of the diencephalon and one function each; which geniculate nucleus does hearing and which does vision; seven hypothalamic functions; the limbic components and the short-term/long-term memory split.',
    visuals: [
      { model: { layer: 'nervous', meshes: ['Thalamus', 'Hypothalamus', 'Hippocampus', 'Fornix', 'Amygdaloid body', 'Cingulate gyrus (Posteroventral part*)'], label: 'Diencephalon and the limbic ring', caption: 'The thalamus and hypothalamus walling the third ventricle, and the limbic circuit around them: cingulate gyrus arching over the corpus callosum, hippocampus and amygdala in the temporal lobe, joined by the fornix.' } },
      { fig: 'cerebellumSection' },
      { gen: true },
    ],
    sourceRefs: [
      { ref: 'hss.2.3', location: 'p12 "Thalamus" — "Hypothalamus" — "Pineal gland" — "Epithalamus" — "Mammillary body"' },
      { ref: 'hss.2.3', location: 'p16 "Composed of several nuclei" — "Passage for sensory input" — "Medial geniculate nucleus" — "Lateral geniculate nucleus"' },
      { ref: 'hss.2.3', location: 'p17 "Major control center of the autonomic" — "nervous system and endocrine system" — "Thermoregulation" — "Food and water intake" — "Sleep and circadian rhythms" — "Infundibulum"' },
      { ref: 'hss.2.3', location: 'p18 "Pineal gland" — "Found in posterior epithalamus" — "Secretes hormone melatonin"' },
      { ref: 'hss.2.3', location: 'p19 "Important center of emotion and learning" — "Cingulate gyrus" — "Hippocampus" — "Amygdala" — "converts recent memory to long term memory"' },
      { ref: 'hss.2.3', location: 'p20 "Limbic system" — "Fornix" — "Hippocampus" — "Amygdala" — "Temporal lobe"' },
    ],
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
    title: 'Bone histology: matrix composition and the four bone cell types',
    tags: ['musculoskeletal', 'high-yield'],
    lesson: {
      explanation: 'Bone is a highly specialised, vascularised connective tissue composed of a calcified extracellular matrix populated by four distinct cell types. The matrix is a composite material engineered to balance rigid compressive strength with elastic tensile flexibility: two-thirds of the matrix consists of inorganic mineralised calcium hydroxyapatite (composed primarily of calcium phosphate crystals), which confers exceptional hardness, rigidity, and resistance to compression; the remaining one-third consists of organic collagen fibres and ground substance, which provide tensile strength, toughness, and flexibility to resist bending and torsion. Living within this composite matrix are four cell types representing distinct stages of osteogenic lineage and remodelling activity. First, osteoprogenitor cells are mesenchymal stem cells located in the inner cellular layer of the periosteum, the endosteum, and vascular canals; they divide to give rise to osteoblasts. Second, osteoblasts are immature bone-forming cells situated on the outer bone surfaces and lining internal cavities; they synthesise, secrete, and release the organic components of bone matrix (osteoid) and initiate calcification, eventually becoming trapped within their own secretions to differentiate into osteocytes. Third, osteocytes are mature bone cells residing within small fluid-filled cavities called lacunae. Radiating from each lacuna are minute microscopic channels called canaliculi, which interconnect adjacent lacunae and link them to central vascular canals. Slender cytoplasmic processes of neighbouring osteocytes extend through the canaliculi and contact one another via gap junctions, establishing an essential transport network that acts as the sole route for nutrient and waste diffusion and chemical communication through the dense mineralised matrix. Fourth, osteoclasts are massive, multinucleated cells derived from hematopoietic monocyte/macrophage stem cell lines; situated on bone surfaces, they secrete acids and proteolytic enzymes that dissolve bone matrix and release stored minerals (calcium and phosphate) into the bloodstream during bone resorption. Structurally, bone tissue organizes into two architectural forms: compact bone, a dense solid mass of closely packed cylindrical osteons forming a hard outer shell that resists bending and twisting; and spongy (cancellous) bone, composed of an open network of web-like trabeculae forming the inner core that absorbs mechanical shock and reduces overall skeletal weight.',
      plain: 'Bone is living matrix with four specialised cells inside it. Two-thirds of the matrix is calcium hydroxyapatite mineral, which makes bone rock-hard against compression; one-third is organic collagen fibres, which stop it from snapping when bent. The four cells are: osteoprogenitor cells (the stem cells), osteoblasts (immature cells that build new matrix), osteocytes (mature cells locked inside chambers called lacunae, communicating through tiny tunnels called canaliculi to exchange nutrients and waste), and osteoclasts (demolition cells that dissolve matrix to release minerals). Compact bone forms the dense outer armor, while spongy bone forms the light honeycomb inside.',
      keyFacts: [
        'Bone matrix is a composite: 2/3 inorganic calcium hydroxyapatite (hardness/compression) and 1/3 organic collagen fibres (toughness/flexibility).',
        'Osteoprogenitor cells: mesenchymal stem cells that divide to generate bone-forming osteoblasts.',
        'Osteoblasts: immature cells on bone surfaces that secrete organic matrix and mature into osteocytes.',
        'Osteocytes: mature bone cells occupying lacunae; maintain matrix homeostasis.',
        'Canaliculi: microscopic channels interconnecting lacunae, providing routes for nutrient and waste diffusion via gap junctions.',
        'Osteoclasts: giant multinucleated cells that resorb/dissolve bone matrix and release calcium and phosphate.',
        'Compact bone: dense solid mass forming the outer shell; resists bending, twisting, and full body weight.',
        'Spongy bone: web-like lattice of trabeculae forming the inner core; cuts down weight and absorbs shock.',
      ],
      prerequisites: [],
      examples: [
        'In targeted radiation therapy near bone structures, radiation-induced microvascular damage can lead to osteocyte necrosis within lacunae, resulting in osteoradionecrosis due to failure of osteoclastic remodelling and osteoblastic bone maintenance.',
      ],
    },
    memory: {
      wordOrigin: '-progenitor produces; -blast builds (B for blast = build); -cyte maintains cell; -clast cracks/destroys (C for clast = crack, like iconoclast).',
      comparison: 'Osteoblast releases matrix and builds bone; osteoclast dissolves matrix and releases minerals. They work in dynamic balance during remodelling.',
      visualCue: 'Envision lacunae as houses and canaliculi as a network of plumbing pipes connecting all houses so food and waste can travel through the solid stone matrix.',
    },
    practice: [
      { type: 'mcq', prompt: 'Which bone cell dissolves bone matrix and releases minerals into the bloodstream?', options: ['Osteocyte', 'Osteoblast', 'Osteoclast', 'Osteoprogenitor cell'], answer: 2,
        explanation: 'Osteoclasts dissolve bone matrix and release minerals. Osteoblasts build matrix, osteocytes maintain it, and osteoprogenitors generate new osteoblasts.',
        src: { ref: 'hss.msk.2026', location: 'p5 "Osteoclasts: dissolve bone matrix and release minerals"' } },
      { type: 'mcq', prompt: 'What proportion of bone matrix consists of calcium hydroxyapatite?', options: ['One third', 'One half', 'Two thirds', 'Nine tenths'], answer: 2,
        explanation: 'Two thirds of bone matrix is inorganic calcium hydroxyapatite, providing rigidity and compressive strength.',
        src: { ref: 'hss.msk.2026', location: 'p5 "2/3: Calcium hydroxyapatite"' } },
      { type: 'cloze', prompt: 'Mature bone cells reside in small chambers called ______, interconnected by narrow channels called ______ that serve as routes for nutrient and waste diffusion.', accept: ['lacunae; canaliculi', 'lacunae, canaliculi', 'lacunae and canaliculi'],
        explanation: 'Osteocytes reside in lacunae; canaliculi interconnect adjacent lacunae to permit nutrient and metabolic waste diffusion.',
        src: { ref: 'hss.msk.2026', location: 'p5 "Osteocytes: mature bone cells located in lacunae"' } },
      { type: 'matching', prompt: 'Match each bone cell type to its primary function.',
        pairs: [['Osteoblast', 'Releases organic components of bone matrix'], ['Osteocyte', 'Mature cell in lacuna maintaining bone tissue'], ['Osteoclast', 'Dissolves bone matrix and releases minerals'], ['Osteoprogenitor cell', 'Stem cell that gives rise to osteoblasts']],
        explanation: 'These four cell types define the complete cellular biology of bone tissue.',
        src: { ref: 'hss.msk.2026', location: 'p5 "Osteoprojenitor cells: stem cells that can give rise to osteoblasts"' } },
    ],
    application: [
      { type: 'scenario', prompt: 'During continuous skeletal remodelling, both osteoblasts and osteoclasts are simultaneously active. Describe what occurs if osteoclast activity significantly outpaces osteoblast activity over several years.',
        model: 'If osteoclasts dissolve matrix faster than osteoblasts secrete new organic osteoid and minerals, progressive bone resorption occurs. This reduces trabecular density in spongy bone and thins the compact cortical shell, resulting in osteopenia and osteoporosis, making bones brittle and prone to pathologic fractures under minor mechanical loads.',
        rubric: ['Identifies osteoclasts as dissolving matrix and osteoblasts as producing it', 'Explains the net loss of bone mass and trabecular density', 'Connects the imbalance to osteopenia/osteoporosis and fracture risk'] },
    ],
    commonMistakes: [
      'Confusing osteoblasts (matrix builders) with osteoclasts (matrix destroyers).',
      'Thinking osteocytes are dead or inactive cells; they are living mature cells actively maintaining matrix via canalicular transport.',
      'Assuming bone matrix is purely mineral; without the 1/3 collagen component, bone would shatter under minimal bending loads.',
    ],
    skills: [
      'Composite material principle: mineral hydroxyapatite provides hardness/compression strength, while collagen provides flexibility/tensile strength.',
      'Lacuna-canaliculi network: living osteocytes encased in rock-hard mineral matrix must rely entirely on canaliculi gap junctions for nutritional support.',
    ],
    selfCheck: 'From memory, describe the composite composition of bone matrix, the four cell types and their lineage, the role of lacunae and canaliculi, and the structural differences between compact and spongy bone.',
    visuals: [
      { fig: 'boneCells' },
      { fig: 'compactBone' },
      { gen: true },
    ],
    sourceRefs: [
      { ref: 'hss.msk.2026', location: 'p5 "2/3: Calcium hydroxyapatite"' },
      { ref: 'hss.msk.2026', location: 'p5 "1/3: Collagen fibers (tough &"' },
      { ref: 'hss.msk.2026', location: 'p5 "Osteocytes: mature bone cells located in lacunae"' },
      { ref: 'hss.msk.2026', location: 'p5 "channels (canaliculi) that interconnect the lacunae; act as route"' },
      { ref: 'hss.msk.2026', location: 'p5 "for nutrient and waste diffusion"' },
      { ref: 'hss.msk.2026', location: 'p5 "Osteoblasts: immature bone cells sitting on the outer bone"' },
      { ref: 'hss.msk.2026', location: 'p5 "release organic components"' },
      { ref: 'hss.msk.2026', location: 'p5 "Osteoclasts: dissolve bone matrix and release minerals"' },
      { ref: 'hss.msk.2026', location: 'p5 "Osteoprojenitor cells: stem cells that can give rise to osteoblasts"' },
      { ref: 'hss.msk.2026', location: 'p6 "dense, solid mass (closely packed & well aligned bone cells) forms the outer surface layer"' },
      { ref: 'hss.msk.2026', location: 'p6 "the inner core"' },
      { ref: 'hss.revans', location: 'p3 "1. Compact"' },
      { ref: 'hss.revans', location: 'p3 "2. Spongy/ cancellous"' },
      { ref: 'hss.revans', location: 'p3 "3. Trabeculae"' },
    ],
  },
  {
    id: 'hss2011-msk-bone-marrow',
    subject: 'HSS2011', unit: 'hss.m4', type: 'definition',
    title: 'Red and yellow bone marrow: histology, distribution, and clinical significance',
    tags: ['musculoskeletal'],
    lesson: {
      explanation: 'Bone marrow (myeloid tissue) is a soft, highly vascularized connective tissue found in the internal cavities of most bones, situated within the trabecular spaces of spongy (cancellous) bone and the central medullary canals of long bones. Bone marrow exists in two functionally and morphologically distinct forms: red bone marrow and yellow bone marrow. Red bone marrow is the primary site of hematopoiesis (blood cell production). It contains pluripotent hematopoietic stem cells that undergo proliferation and differentiation to generate all mature blood cells: red blood cells (erythrocytes, which carry oxygen), white blood cells (leukocytes, which mediate innate and adaptive immunity), and blood platelets (thrombocytes, which trigger blood clotting and vascular repair). The anatomical distribution of red marrow changes dramatically across the human lifespan: in infants and children prior to the age of five, virtually all bones in the skeleton contain active red bone marrow to meet the enormous circulatory and developmental demands of growth. With advancing age, peripheral red marrow in limb shafts gradually converts into yellow bone marrow, characterized by vascular regression and infiltration of adipocytes. In healthy adults, active red marrow persists predominantly within the cancellous core of the central axial skeleton—including the flat bones of the skull, the vertebral bodies, the sternum, the ribs, and the pelvic girdle (hip bones)—as well as within the proximal epiphyses of long bones such as the femur and humerus. In contrast, yellow bone marrow occupies the medullary cavities of adult long bone shafts. Histologically, yellow marrow is dominated by adipose (fat) tissue, functioning as a vital metabolic energy reserve of triglycerides. However, yellow marrow is not metabolically inert: it harbors multipotent mesenchymal stem cells that retain the capacity to differentiate into osteoblasts (bone), chondrocytes (cartilage), adipocytes (fat), or muscle cells when induced by chemical signaling or trauma. Moreover, during severe chronic blood loss or hemolytic crisis, yellow marrow can revert back into active hematopoietic red marrow to restore normal blood cell production.',
      plain: 'Bone marrow sits inside the hollow spaces of spongy bone and the medullary canals of long bones. It comes in two types: red and yellow. Red marrow is the blood factory: it contains hematopoietic stem cells that make red blood cells, white blood cells, and platelets. Children under five have red marrow in all their bones; as we grow, limb marrow turns into yellow marrow, so adults keep red marrow mainly in the central trunk (skull, spine, ribs, sternum, and pelvis) and the top ends of the humerus and femur. Yellow marrow fills the shafts of adult long bones; it is rich in fat and contains mesenchymal stem cells that can turn into bone, cartilage, or muscle if needed.',
      keyFacts: [
        'Bone marrow is located in the trabecular spaces of spongy bone and the medullary cavities of long bones.',
        'Red bone marrow contains hematopoietic stem cells that differentiate into red blood cells, white blood cells, and platelets.',
        'Prior to age 5, red marrow is present in virtually all bones of the skeleton.',
        'In adults, red marrow persists primarily in the central axial skeleton (skull, vertebrae, sternum, ribs, pelvis) and proximal epiphyses.',
        'Yellow bone marrow fills adult long-bone shafts; consists predominantly of adipose tissue as an energy reserve.',
        'Yellow marrow contains multipotent mesenchymal stem cells that can differentiate into cartilage, bone, fat, or muscle cells.',
        'Under severe physiological stress (e.g. severe anemia), yellow marrow can revert to hematopoietically active red marrow.',
      ],
      prerequisites: ['hss2011-msk-bone-histology'],
      examples: [
        'When diagnosing leukemia or aplastic anemia, bone marrow aspirates and core biopsies are typically harvested from the posterior superior iliac spine (PSIS) of the pelvis because it provides reliable adult red marrow while avoiding vital visceral organs.',
      ],
    },
    memory: {
      comparison: 'Red marrow makes red and white blood cells (hematopoiesis). Yellow marrow stores yellow fat and mesenchymal stem cells.',
      chunking: 'Age 5 is the transition point: red everywhere before age 5; after age 5, red retreats to the central axial skeleton and proximal epiphyses.',
      location: 'Adult bone marrow biopsy: always target the central skeleton (iliac crest of pelvis or sternum) where red marrow persists in adults.',
    },
    practice: [
      { type: 'mcq', prompt: 'Which stem cells are housed in red bone marrow?', options: ['Mesenchymal stem cells', 'Hematopoietic stem cells', 'Neuroepithelial cells', 'Satellite cells'], answer: 1,
        explanation: 'Red bone marrow contains hematopoietic stem cells that differentiate into red blood cells, white blood cells, and platelets.',
        src: { ref: 'hss.msk.2026', location: 'p7 "contains hematopoietic stem cells"' } },
      { type: 'mcq', prompt: 'Up to what age is red bone marrow present in all bones across the human skeleton?', options: ['Age 2', 'Age 5', 'Age 12', 'Age 18'], answer: 1,
        explanation: 'Red bone marrow is present in all bones before the age of 5, after which it gradually transforms into yellow marrow in the limbs.',
        src: { ref: 'hss.msk.2026', location: 'p7 "Present in all bones before age of 5"' } },
      { type: 'cloze', prompt: 'Yellow bone marrow contains adipose tissue and ______ stem cells that can differentiate into cartilage, bone, fat, or muscle.', accept: ['mesenchymal'],
        explanation: 'Yellow marrow contains mesenchymal stem cells with multipotent developmental capacity.',
        src: { ref: 'hss.msk.2026', location: 'p7 "contains adipose (fat) tissues and"' } },
      { type: 'typed', prompt: 'In an adult, where does active red bone marrow primarily persist?', accept: ['central skeleton', 'axial skeleton', 'central skeleton and ends of long bones', 'axial skeleton and proximal epiphyses'],
        explanation: 'In adults, red bone marrow persists mainly in the central skeleton (pelvis, vertebrae, ribs, sternum, skull) and the proximal ends of long bones.',
        src: { ref: 'hss.msk.2026', location: 'p7 "In adult, persist mainly in central skeleton, but also found in ends of long bones"' } },
    ],
    application: [
      { type: 'scenario', prompt: 'A clinician performs a bone marrow biopsy on an adult patient suspected of multiple myeloma. Why is the posterior iliac crest chosen rather than the mid-shaft of the tibia?',
        model: 'In adults, active hematopoiesis takes place in red bone marrow, which persists primarily in the cancellous bone of the central axial skeleton (such as the pelvis). The mid-shaft (diaphysis) of the tibia contains yellow marrow, which consists of non-hematopoietic adipose tissue. The iliac crest provides abundant active red marrow suitable for diagnostic cell evaluation.',
        rubric: ['Identifies red marrow as the required tissue for evaluating hematopoietic cells', 'States that adult red marrow persists in the central skeleton (pelvis)', 'Explains that adult long bone shafts contain yellow adipose marrow'] },
    ],
    commonMistakes: [
      'Believing adults have completely replaced all red bone marrow with yellow marrow.',
      'Thinking yellow bone marrow is dead waste tissue rather than a metabolically active lipid reserve with mesenchymal stem cells.',
      'Targeting long bone shafts for adult bone marrow biopsies instead of central axial bones.',
    ],
    skills: [
      'Age-dependent distribution: all bones red in early childhood; adult red marrow is central (skull, vertebrae, sternum, ribs, pelvis, proximal humerus/femur).',
      'Two marrow lineages: hematopoietic stem cells in red marrow (blood elements) versus mesenchymal stem cells in yellow marrow (connective tissue elements).',
    ],
    selfCheck: 'From memory, describe the functions of red versus yellow bone marrow, identify the age at which marrow transition begins, and list the anatomical sites of red marrow persistence in the adult.',
    visuals: [
      { fig: 'boneMarrow' },
      { gen: true },
    ],
    sourceRefs: [
      { ref: 'hss.msk.2026', location: 'p7 "found in the center of most bones (spongy bones)"' },
      { ref: 'hss.msk.2026', location: 'p7 "contains hematopoietic stem cells that can differentiate into RBC, WBC, and platelets"' },
      { ref: 'hss.msk.2026', location: 'p7 "Present in all bones before age of 5; and gradually transform into yellow bone marrow;"' },
      { ref: 'hss.msk.2026', location: 'p7 "In adult, persist mainly in central skeleton, but also found in ends of long bones"' },
      { ref: 'hss.msk.2026', location: 'p7 "Yellow bone marrow—located in the cavities of long bones;"' },
      { ref: 'hss.msk.2026', location: 'p7 "contains adipose (fat) tissues and mesenchymal stem cells that can develop into cartilage, bone, fat, or muscle cells (if needed)."' },
      { ref: 'hss.4.1', location: 'p6 "bone marrow => red blood cells"' },
      { ref: 'hss.4.1', location: 'p16 "medullary cavity"' },
      { ref: 'hss.4.1', location: 'p16 "containing bone marrow"' },
    ],
  },
  {
    id: 'hss2011-msk-tissues-of-movement',
    subject: 'HSS2011', unit: 'hss.m4', type: 'definition',
    title: 'The five movement tissues: structural roles, counts, and classifications',
    tags: ['musculoskeletal', 'foundation'],
    lesson: {
      explanation: 'Coordinated human bodily motion requires the integrated biomechanical cooperation of five specialized tissues: bones, skeletal muscles, tendons, ligaments, and cartilages. The musculoskeletal curriculum details precise anatomical counts and structural roles for each. First, bones (206 distinct bones in the adult skeleton) form the rigid skeletal framework and articulate with one another to form joints for movement; the skeleton is uniquely engineered to be light enough for efficient locomotion while remaining strong and tough for bodily support and visceral protection. Second, skeletal muscles (more than 600 in the human body) attach onto bones and serve as the active contractile motors that generate tension to pull bones and produce purposeful movement. Third, tendons (approximately 4,000 throughout the body) are cords of dense regular connective tissue that attach muscle to bone, transmitting muscular contraction forces directly onto skeletal levers. Fourth, ligaments (more than 900 in the human body) are bands of tough, elastic connective tissue positioned around joints; connecting bone to bone, ligaments give structural support and reinforce joints while crucially limiting their movement to anatomically safe ranges and planes. Ligaments are classified into two structural categories: intracapsular (also called joint or intrinsic) ligaments, which are localized thickenings of fibrous connective tissue that help reinforce the joint capsule from within (exemplified by the anterior and posterior cruciate ligaments inside the knee joint); and accessory (extrinsic) ligaments, which are completely separate from the joint capsule and reinforce joint integrity by binding adjacent bones together (exemplified by the medial and lateral collateral ligaments of the knee). Fifth, cartilages are soft, resilient, gel-like padding tissues positioned between articulating bones; cartilage protects joint surfaces, dampens sudden physical forces, and facilitates smooth movement by minimizing friction. Cartilage occurs in three distinct histological types: hyaline cartilage (the most common, found as articular cartilage capping synovial bone ends and in costal cartilages; glassy, smooth, and shock-absorbing), fibrocartilage (tough matrix packed with dense collagen bundles; found in intervertebral discs, pubic symphysis, and knee menisci to resist heavy compression and shear), and elastic cartilage (pliable matrix containing abundant elastic fibres; found in the auricle of the ear and epiglottis).',
      plain: 'Human movement depends on five tissues working as a team, and their counts show how they connect: 206 bones form the jointed levers; over 600 skeletal muscles contract to produce motion; about 4,000 tendons anchor muscles to bones to pull them; over 900 ligaments connect bone to bone to stabilize joints and prevent abnormal motion; and cartilages provide slick, shock-absorbing padding between bones. Ligaments are either intracapsular (reinforcing inside the joint capsule, like the knee cruciate ligaments) or accessory/extrinsic (outside the capsule, like the collateral ligaments). Cartilage comes in three forms: hyaline (glassy joint caps), fibrocartilage (tough shock-absorbing pads like intervertebral discs and menisci), and elastic (flexible structures like the ear).',
      keyFacts: [
        'Five movement tissues: bones (206), muscles (>600), tendons (~4000), ligaments (>900), and cartilages.',
        'Bones: provide rigid levers and form joints; light enough for movement, strong and tough for support.',
        'Skeletal muscles: attach onto bones and generate active contractile force.',
        'Tendons: dense regular connective tissue attaching muscle to bone; transmit contractile force.',
        'Ligaments: connect bone to bone; provide joint stability and explicitly limit range of motion.',
        'Intracapsular (intrinsic) ligaments: localized thickenings reinforcing capsule (e.g. ACL and PCL of knee).',
        'Accessory (extrinsic) ligaments: separate from the capsule, binding bones together (e.g. MCL and LCL of knee).',
        'Cartilage: shock-absorbing gel-like tissue; hyaline cartilage, fibrocartilage, and elastic cartilage.',
      ],
      prerequisites: [],
      examples: [
        'At the knee joint, all five tissues interact: distal femur and proximal tibia (bones), quadriceps and hamstrings (muscles), patellar tendon (tendon), ACL/PCL and collateral ligaments (ligaments), and femoral articular cartilage and menisci (cartilages).',
      ],
    },
    memory: {
      comparison: 'Tendon joins muscle to bone (T for Tough muscle-to-bone). Ligament joins bone to bone and Limits movement (L for Like-to-like bone and Limit).',
      chunking: 'Tissue counts in order: 206 bones -> >600 muscles -> >900 ligaments -> ~4000 tendons. Tendons are most numerous because each muscle typically attaches at both ends.',
      location: 'Cruciate ligaments are inside the capsule (intracapsular/intrinsic); collateral ligaments are outside the capsule (accessory/extrinsic).',
    },
    practice: [
      { type: 'mcq', prompt: 'Which connective tissue connects bone to bone and limits joint movement?', options: ['Tendon', 'Ligament', 'Epimysium', 'Aponeurosis'], answer: 1,
        explanation: 'Ligaments connect bone to bone, providing joint support and limiting movement. Tendons connect muscle to bone.',
        src: { ref: 'hss.msk.2026', location: 'p3 "connecting bone to"' } },
      { type: 'matching', prompt: 'Match each movement tissue to its approximate count in the human body.',
        pairs: [['Bones', '206'], ['Skeletal muscles', '(> 600)'], ['Ligaments', '(>900)'], ['Tendons', 'muscle to bone (~4000)']],
        explanation: 'These are the baseline anatomical counts taught in the musculoskeletal orientation.',
        src: { ref: 'hss.msk.2026', location: 'p3 "Bones for movement (206)"' } },
      { type: 'mcq', prompt: 'The anterior and posterior cruciate ligaments of the knee are examples of which ligament category?', options: ['Accessory (extrinsic) ligaments', 'Intracapsular (intrinsic) ligaments', 'Collateral ligaments', 'Extra-articular ligaments'], answer: 1,
        explanation: 'Cruciate ligaments are intracapsular (intrinsic) ligaments, representing localized thickenings reinforcing the capsule from within.',
        src: { ref: 'hss.msk.2026', location: 'p28 "Localized thickenings of fibrous connective tissue"' } },
      { type: 'cloze', prompt: 'A(n) ______ ligament is separate from the joint capsule and reinforces the joint by binding bones together.', accept: ['accessory', 'extrinsic', 'accessory (extrinsic)', 'accessory/extrinsic'],
        explanation: 'Accessory or extrinsic ligaments sit outside the joint capsule, exemplified by the medial and lateral collateral ligaments of the knee.',
        src: { ref: 'hss.msk.2026', location: 'p28 "Separate from joint capsule"' } },
    ],
    application: [
      { type: 'scenario', prompt: 'A physical therapist notes that ligaments function to "limit joint movement". Explain why limiting joint movement is critical for normal musculoskeletal function rather than an impairment.',
        model: 'A joint with unlimited mobility in all directions would lack mechanical stability and would dislocate under muscular pull or body weight. Ligaments bind bones together to define a precise, controlled arc of movement and prevent abnormal displacement. When ligaments tear, the clinical consequence is joint hypermobility and instability, demonstrating that mechanical restriction is essential for joint competence.',
        rubric: ['Explains that unrestricted movement causes joint instability and dislocation', 'States that ligaments define stable anatomical axes of movement', 'Identifies joint laxity/instability as the consequence of ligamentous rupture'] },
    ],
    commonMistakes: [
      'Confusing tendons (muscle to bone) with ligaments (bone to bone).',
      'Thinking ligaments only facilitate movement; their crucial function is limiting excess or abnormal movement.',
      'Classifying collateral ligaments as intracapsular; collateral ligaments are accessory/extrinsic to the capsule.',
    ],
    skills: [
      'Attachment rule: muscle-to-bone is tendon; bone-to-bone is ligament.',
      'Capsular position rule: cruciate ligaments lie inside the capsule (intracapsular); collateral ligaments lie outside (extrinsic/accessory).',
    ],
    selfCheck: 'From memory, list the five movement tissues with their counts and roles, differentiate intracapsular from accessory ligaments with knee examples, and name the three types of cartilage.',
    visuals: [
      { fig: 'cartilageTypes' },
      { model: { layer: 'skeleton', meshes: ['Femur', 'Patella', 'Tibia'], label: 'Bones and cartilage of the knee joint', caption: 'The five movement tissues meet at large synovial joints like the knee: bones (206 total), articular cartilages, ligaments, muscles, and tendons.' } },
      { gen: true },
    ],
    sourceRefs: [
      { ref: 'hss.msk.2026', location: 'p3 "To achieve movement, we will need"' },
      { ref: 'hss.msk.2026', location: 'p3 "Attached onto bones"' },
      { ref: 'hss.msk.2026', location: 'p3 "muscle to bone (~4000)"' },
      { ref: 'hss.msk.2026', location: 'p3 "(> 600)"' },
      { ref: 'hss.msk.2026', location: 'p3 "Ligaments"' },
      { ref: 'hss.msk.2026', location: 'p3 "(>900)"' },
      { ref: 'hss.msk.2026', location: 'p3 "Bones for movement (206)"' },
      { ref: 'hss.msk.2026', location: 'p3 "connecting bone to"' },
      { ref: 'hss.msk.2026', location: 'p3 "bone, giving support,"' },
      { ref: 'hss.msk.2026', location: 'p3 "limiting their movement"' },
      { ref: 'hss.msk.2026', location: 'p3 "protects joints and"' },
      { ref: 'hss.msk.2026', location: 'p3 "facilitates movement"' },
      { ref: 'hss.msk.2026', location: 'p28 "Localized thickenings of fibrous connective tissue"' },
      { ref: 'hss.msk.2026', location: 'p28 "Separate from joint capsule"' },
      { ref: 'hss.msk.2026', location: 'p29 "Hyaline cartilage"' },
      { ref: 'hss.msk.2026', location: 'p29 "Fibrocartilage"' },
      { ref: 'hss.msk.2026', location: 'p29 "Elastic cartilage"' },
    ],
  },
  {
    id: 'hss2011-msk-muscle-organisation',
    subject: 'HSS2011', unit: 'hss.m4', type: 'sequence',
    title: 'Skeletal muscle organization: connective tissue wrappings, myofibrils, and fascicle architecture',
    tags: ['musculoskeletal', 'high-yield'],
    lesson: {
      explanation: 'Skeletal muscles are highly organized contractile organs composed of thousands of muscle fibres bundled within nested connective tissue sheaths. The gross and microscopic anatomy of skeletal muscle is structured hierarchically. At the outermost level, the entire fleshy muscle belly is enveloped by the epimysium, a dense irregular connective tissue sheath that insulates the muscle and separates it from adjacent structures. Beneath the epimysium, the muscle interior is compartmentalized into discrete bundles of muscle fibres termed fascicles; each individual fascicle is wrapped in the perimysium, a collagenous sheath carrying intermediate blood vessels and nerve branches. Within each fascicle, individual muscle fibres (elongated, multinucleated muscle cells or myocytes) are encased within a delicate layer of areolar connective tissue called the endomysium, which carries microscopic capillaries and nerve endings to every cell. Beneath the sarcolemma (cell membrane) of each muscle fibre lie hundreds to thousands of parallel, thread-like myofibrils. Myofibrils are composed of repeating microscopic functional units called sarcomeres—the fundamental repeating contractile units within muscle fibres responsible for tension generation. A sarcomere is bounded between two Z discs and contains overlapping thick filaments (composed primarily of the motor protein myosin) and thin filaments (composed primarily of actin, along with regulatory troponin and tropomyosin). Skeletal muscles perform six major bodily functions: generating movement (alternating contraction and relaxation pulls bones, as bones cannot move themselves); maintaining posture and body position against gravity; supporting soft tissues within the visceral cavities; controlling body openings and passages (forming involuntary and voluntary sphincters); regulating body temperature (releasing metabolic heat during contraction); and storing nutrients (mobilizing contractile amino acids during starvation). Furthermore, muscles display diverse fascicle arrangements that dictate their force-versus-velocity trade-offs: fusiform muscles have fascicles nearly parallel to the longitudinal axis with a central belly that tapers towards tendons at both ends (e.g. biceps brachii); parallel muscles have fascicles running parallel to the long axis and terminating at either end in flat broad tendons; convergent muscles feature fascicles spreading over a broad origin and converging onto a single thick central tendon, creating a triangular appearance (e.g. pectoralis major); circular muscles (sphincters) arrange fascicles in concentric rings around openings (e.g. orbicularis oris); and pennate muscles feature short fascicles oriented obliquely relative to a long tendon running the length of the muscle. Pennate muscles subdivide into unipennate (fascicles on only one side of the tendon, e.g. extensor digitorum), bipennate (fascicles angled on both sides of a central tendon like a feather, e.g. rectus femoris), and multipennate (fascicles attached obliquely from many directions to branched internal tendons, e.g. deltoid). Pennate architecture packs maximum muscle fibres into a given volume, maximizing contractile force at the expense of shortening distance.',
      plain: 'A skeletal muscle is structured like a set of nested boxes. The whole muscle is wrapped in the epimysium; inside, muscle fibres are bundled into packets called fascicles wrapped in the perimysium; and each individual fibre is wrapped in the endomysium. Inside a muscle fibre are thousands of myofibrils, which are made of repeating contractile units called sarcomeres. Within each sarcomere, thick myosin filaments pull on thin actin filaments to shorten the muscle. Muscle fascicles can be arranged in different geometric patterns: fusiform (tapering at both ends), parallel (running straight end-to-end), convergent (fan-shaped, like pectoralis major), circular (rings around openings), or pennate (feather-like, with short fibres angled into a central tendon to pack in huge force, as in bipennate or multipennate muscles).',
      keyFacts: [
        'Connective tissue hierarchy from outside in: epimysium (whole muscle) -> perimysium (fascicles) -> endomysium (individual fibres).',
        'Muscle fibre (myocyte) contains parallel myofibrils; each myofibril is composed of repeating sarcomeres.',
        'Sarcomere: the repeating functional contractile unit within muscle fibres bounded by Z discs.',
        'Contraction mechanism: thick myosin filaments pull thin actin filaments towards the sarcomere centre.',
        'Six skeletal muscle functions: generate movement, maintain posture, support soft tissue, control openings/passages, regulate body temperature, store nutrients.',
        'Fusiform: fascicles nearly parallel to longitudinal axis; belly tapers towards tendons at both ends.',
        'Parallel: fascicles parallel to long axis, terminating in flat tendons.',
        'Convergent: broad fascicles converge onto a thick central tendon, giving a triangular appearance.',
        'Circular: concentric fascicles forming a sphincter or opening.',
        'Pennate: short oblique fascicles packed along a tendon; unipennate (one side), bipennate (both sides), multipennate (multiple directions).',
      ],
      prerequisites: [],
      examples: [
        'The deltoid muscle is a multipennate muscle whose multiple oblique fascicle bundles converge on tendons at the deltoid tuberosity, allowing it to generate the powerful force needed to abduct the heavy upper limb.',
      ],
    },
    memory: {
      wordOrigin: 'Epi- (upon/outside the whole muscle), Peri- (around each fascicle bundle), Endo- (inside, around each individual fibre). Same prefixes as heart wall layers.',
      sequence: 'Whole muscle -> Fascicle -> Muscle fibre -> Myofibril -> Myofilaments (actin and myosin). Five nested layers.',
      visualCue: 'Pennate means feather (from Latin penna). Unipennate is one side of a quill; bipennate is a classic two-sided feather; multipennate is multiple quills branching together.',
    },
    practice: [
      { type: 'sequence', prompt: 'Order the connective tissue sheaths of skeletal muscle from the outermost layer inward to the individual muscle cell.',
        items: ['Epimysium', 'Perimysium', 'Endomysium'],
        explanation: 'Epimysium envelops the entire muscle; perimysium wraps fascicles; endomysium encases individual muscle fibres.',
        src: { ref: 'hss.msk.2026', location: 'p32 "Epimysium"' } },
      { type: 'mcq', prompt: 'Which connective tissue layer immediately surrounds an individual muscle fibre?', options: ['Epimysium', 'Perimysium', 'Endomysium', 'Sarcolemma'], answer: 2,
        explanation: 'The endomysium surrounds each individual muscle fibre. (The sarcolemma is the cell membrane beneath the endomysium).',
        src: { ref: 'hss.msk.2026', location: 'p32 "Endomysium"' } },
      { type: 'cloze', prompt: 'The ______ is the repeating microscopic unit within muscle fibres responsible for contraction.', accept: ['sarcomere'],
        explanation: 'The sarcomere is the repeating structural and functional contractile unit along a myofibril.',
        src: { ref: 'hss.msk.2026', location: 'p33 "the repeating unit within muscle fibers that is responsible for contraction"' } },
      { type: 'matching', prompt: 'Match each muscle fascicle pattern to its anatomical description.',
        pairs: [['Fusiform', 'Fascicles nearly parallel; muscle tapers towards tendons'], ['Convergent', 'Fascicles spread over broad area converge at thick central tendon'], ['Circular', 'Concentric fascicles forming a sphincter or opening'], ['Bipennate', 'Fascicles arranged on both sides of a central tendon']],
        explanation: 'These architectural classes determine whether a muscle specializes in range of motion (parallel/fusiform) or maximum force (pennate).',
        src: { ref: 'hss.msk.2026', location: 'p36 "Fusiform—fascicles nearly parallel to longitudinal axis of muscle; muscle tapers towards tendons"' } },
    ],
    application: [
      { type: 'scenario', prompt: 'Compare a parallel muscle (such as sartorius) with a multipennate muscle (such as deltoid). Explain how fascicle orientation determines the difference in contraction velocity and force generation.',
        model: 'In a parallel muscle, long fascicles run the entire length of the muscle; because sarcomeres are arranged in series, the muscle can shorten over a large distance at high velocity, but has fewer total fibres pulling in parallel so force is relatively low. In a multipennate muscle, short fascicles attach obliquely to multiple internal tendons; packing many short fibres in parallel maximizes physiological cross-sectional area, generating immense contractile force at the expense of shortening distance.',
        rubric: ['Identifies parallel muscles as having long fibres arranged in series for range/velocity', 'Identifies pennate muscles as packing many short fibres in parallel for maximum force', 'Explains the trade-off between shortening distance and contractile force'] },
    ],
    commonMistakes: [
      'Confusing myofibrils (intracellular organelles) with muscle fibres (the whole multinucleated muscle cells).',
      'Placing perimysium around fibres and endomysium around fascicles—remember peri- surrounds the packet/bundle.',
      'Assuming pennate muscles produce low force because their fibres are short; pennate architecture actually produces the highest force because of high fibre density.',
    ],
    skills: [
      'Prefix hierarchy: Epimysium (whole muscle outer covering) -> Perimysium (around fascicles) -> Endomysium (around myocytes).',
      'Biomechanics of fascicle architecture: long parallel fibres buy shortening distance and speed; short angled pennate fibres buy force through packed cross-sectional area.',
    ],
    selfCheck: 'From memory, diagram the five levels of muscle organization from epimysium to actin/myosin, define the sarcomere, and describe the five fascicle arrangements including the three pennate subtypes.',
    visuals: [
      { fig: 'muscleOrganization' },
      { fig: 'muscleTypes' },
      { model: { layer: 'muscle', meshes: ['Long head of biceps brachii', 'Short head of biceps brachii'], label: 'Biceps brachii muscle', caption: 'Biceps brachii: epimysium wraps the outer muscle, perimysium encloses internal fascicles, and endomysium wraps individual myocytes.' } },
      { gen: true },
    ],
    sourceRefs: [
      { ref: 'hss.msk.2026', location: 'p31 "Generate movement"' },
      { ref: 'hss.msk.2026', location: 'p31 "Maintain posture and body position"' },
      { ref: 'hss.msk.2026', location: 'p31 "Support soft tissue"' },
      { ref: 'hss.msk.2026', location: 'p31 "Control of body openings and passages"' },
      { ref: 'hss.msk.2026', location: 'p31 "Regulate body temperature"' },
      { ref: 'hss.msk.2026', location: 'p31 "Store nutrients"' },
      { ref: 'hss.msk.2026', location: 'p32 "Epimysium"' },
      { ref: 'hss.msk.2026', location: 'p32 "Perimysium"' },
      { ref: 'hss.msk.2026', location: 'p32 "Endomysium"' },
      { ref: 'hss.msk.2026', location: 'p33 "the repeating unit within muscle fibers that is responsible for contraction"' },
      { ref: 'hss.msk.2026', location: 'p36 "Fusiform—fascicles nearly parallel to longitudinal axis of muscle; muscle tapers towards tendons"' },
      { ref: 'hss.msk.2026', location: 'p36 "Parallel—fascicles parallel to longitudinal axis of muscle; terminate at either end in flat tendon"' },
      { ref: 'hss.msk.2026', location: 'p36 "Convergent—fascicles spread over broad area converge at thick central tendon; gives muscle a triangular appearance"' },
      { ref: 'hss.msk.2026', location: 'p36 "Circular—fascicles in concentric arrangements to form sphincter or opening"' },
      { ref: 'hss.msk.2026', location: 'p36 "Pennate (short fascicles in relation to total muscle length)"' },
      { ref: 'hss.msk.2026', location: 'p36 "Unipennate—fascicles arranged on only one side of tendon"' },
      { ref: 'hss.msk.2026', location: 'p36 "Bipennate—fascicles arranged on both sides of centrally positioned tendons"' },
      { ref: 'hss.msk.2026', location: 'p36 "Multipennate—fascicles attached obliquely from many directions to several tendons"' },
    ],
  },
  {
    id: 'hss2011-msk-tendon-attachment',
    subject: 'HSS2011', unit: 'hss.m4', type: 'definition',
    title: 'Tendon structure, Golgi tendon organ, and muscle attachment sites (origin and insertion)',
    tags: ['musculoskeletal', 'high-yield'],
    lesson: {
      explanation: 'A tendon is a tough, flexible band of dense regular connective tissue that physically anchors skeletal muscle to bone. Anatomically, a tendon is not an isolated cord glued onto the surface of a muscle; rather, it represents the direct continuous extension of the muscle\'s internal connective tissue framework. Collagen fibres of the endomysium, perimysium, and epimysium coalesce and merge seamlessly at both ends of a skeletal muscle to form the tendon, creating an unbroken mechanical pathway that transmits contractile forces generated by sarcomeres directly to bone to elicit joint movement. Embedded within the collagenous architecture of a tendon is an essential sensory mechanoreceptor: the Golgi tendon organ (GTO). Located precisely at the myotendinous junction, the Golgi tendon organ consists of small bundles of tendon collagen fibres intricately interwoven with the branching, unmyelinated terminal endings of a sensory axon. The GTO functions specifically to detect tension or force developed at the tendon during muscle contraction. When muscle contraction increases tendon tension to dangerous levels, the GTO fires inhibitory signals to the spinal cord to trigger reflexive muscle relaxation (autogenic inhibition), protecting the tendon and bone from avulsion. Anatomists identify two distinct anatomical junctions along a tendon: the myotendinous junction, which is the point at which the tendon attaches to muscle fibres; and the osteotendinous junction (enthesis), which is the point at which the tendon attaches to bone (where tendon collagen fibres penetrate cortical bone as Sharpey\'s fibres). Every skeletal muscle that crosses a joint attaches to bone at two distinct sites: the origin and the insertion. By anatomical definition, the origin is usually the proximal attachment site that remains stationary and does not move during contraction; the insertion is usually the distal attachment site that moves as the muscle contracts, pulling the distal skeletal lever towards the stationary origin. While proximal-distal orientation holds true for typical open-chain movements, the true defining criterion is movement: the non-moving attachment is the origin, and the moving attachment is the insertion.',
      plain: 'A tendon is made of dense regular connective tissue and is directly continuous with the wrappings inside the muscle (endomysium, perimysium, epimysium). This unbroken connection ensures that all the force generated by contracting muscle fibres travels straight into the bone to produce motion. Sitting at the myotendinous junction is the Golgi tendon organ—a tension sensor that monitors how hard the muscle is pulling and prevents tendon tears. There are two junctions: the myotendinous junction (where tendon meets muscle) and the osteotendinous junction (where tendon anchors into bone). Muscles have two ends: the origin is usually proximal and stays still during contraction; the insertion is usually distal and moves, bringing the moving bone towards the stationary origin.',
      keyFacts: [
        'Tendon: dense regular connective tissue continuous with endo-, peri-, and epimysium at both ends of the muscle.',
        'Function: attaches muscle to bone and directly transmits muscle contraction forces to produce motion.',
        'Golgi tendon organ (GTO): mechanoreceptor located at the myotendinous junction composed of collagen bundles interwoven with sensory axons.',
        'GTO function: monitors and detects tension/force developed at the tendon during muscle contraction.',
        'Myotendinous junction: the anatomical interface where tendon attaches to muscle fibres.',
        'Osteotendinous junction: the anatomical interface where tendon attaches to bone.',
        'Origin: usually proximal, the skeletal attachment site that does NOT move during contraction.',
        'Insertion: usually distal, the skeletal attachment site that MOVES during contraction.',
      ],
      prerequisites: ['hss2011-msk-muscle-organisation'],
      examples: [
        'In biceps brachii contraction during elbow flexion, the origin on the scapula remains fixed, while the insertion on the radial tuberosity moves superiorly, drawing the forearm towards the shoulder.',
      ],
    },
    memory: {
      wordOrigin: 'Myo- = muscle, Osteo- = bone. Myotendinous junction = muscle-tendon border; Osteotendinous junction = bone-tendon border.',
      comparison: 'Origin originates and stays still (fixed anchor); Insertion inserts into the moving part (travels during contraction).',
      sensorTrap: 'Golgi tendon organ detects TENSION in the tendon (T for Tendon = Tension). Muscle spindle detects LENGTH in muscle belly.',
    },
    practice: [
      { type: 'mcq', prompt: 'Which muscle attachment site does NOT move during contraction?', options: ['The insertion', 'The origin', 'The osteotendinous junction', 'The myotendinous junction'], answer: 1,
        explanation: 'The origin (usually proximal) is defined as the attachment site that does not move during contraction, while the insertion moves.',
        src: { ref: 'hss.msk.2026', location: 'p35 "The origin (usually proximal) is the attachment site that does not move during contraction"' } },
      { type: 'cloze', prompt: 'The point at which a tendon attaches to bone is the ______ junction, while the point where it attaches to muscle is the ______ junction.', accept: ['osteotendinous; myotendinous', 'osteotendinous, myotendinous', 'osteotendinous and myotendinous'],
        explanation: 'Osteotendinous attaches tendon to bone; myotendinous attaches tendon to muscle.',
        src: { ref: 'hss.msk.2026', location: 'p35 "Osteotendinous junction—point at which tendon attaches to bone"' } },
      { type: 'mcq', prompt: 'What physiological variable is monitored by the Golgi tendon organ?', options: ['Muscle length and rate of stretch', 'Tension or force developed at the tendon', 'Joint angle and cartilage pressure', 'Muscle temperature and glycogen stores'], answer: 1,
        explanation: 'The Golgi tendon organ detects tension or force developed at the tendon during muscle contraction.',
        src: { ref: 'hss.msk.2026', location: 'p34 "detects tension/force developed at the tendon during muscle"' } },
      { type: 'matching', prompt: 'Match each tendon structure to its anatomical description.',
        pairs: [['Tendon', 'Dense regular connective tissue continuous with muscle wrappings'], ['Golgi tendon organ', 'Mechanoreceptor detecting tendon tension'], ['Origin', 'Attachment site that does not move during contraction'], ['Insertion', 'Attachment site that moves when muscle contracts']],
        explanation: 'These define the key structural features and attachments of skeletal muscles and tendons.',
        src: { ref: 'hss.msk.2026', location: 'p34 "Dense regular connective tissues that is"' } },
    ],
    application: [
      { type: 'scenario', prompt: 'In closed-chain chin-up exercises, the hands remain fixed to a pull-up bar while the body and trunk are pulled upward. How does this affect the standard definition of origin and insertion for the biceps and latissimus dorsi?',
        model: 'Standard definitions state that the origin is usually proximal and fixed, while the insertion is distal and mobile. In a chin-up (a closed kinetic chain motion), the distal limbs are held stationary by the bar, forcing the proximal trunk attachments to move toward the fixed distal limbs. This reverses the functional movement roles: the distal attachment acts as the fixed base while the proximal attachment travels, demonstrating why the anatomical definition specifies "usually" proximal/distal while movement is the functional criterion.',
        rubric: ['Identifies origin as the stationary end and insertion as the moving end in open chain', 'Explains that fixing the distal limb causes the proximal trunk attachment to move', 'Demonstrates understanding of the functional reversal in closed kinetic chain movements'] },
    ],
    commonMistakes: [
      'Assuming the origin is always proximal without exception; in closed-chain exercise, the distal end stays fixed while the proximal end moves.',
      'Confusing Golgi tendon organs (tension sensors in tendons) with muscle spindles (length sensors in muscle bellies).',
      'Thinking tendons are glued onto epimysium; tendons are directly continuous with all three internal connective tissue sheaths.',
    ],
    skills: [
      'Functional definition of attachments: origin is the non-moving attachment; insertion is the moving attachment.',
      'Continuity of force transmission: sarcomeres pull endomysium -> perimysium -> epimysium -> tendon -> bone (Sharpey\'s fibres). An unbroken mechanical continuum.',
    ],
    selfCheck: 'From memory, describe the histology of tendons and their continuity with muscle sheaths, define the myotendinous and osteotendinous junctions, explain the role and location of the Golgi tendon organ, and define muscle origin versus insertion.',
    visuals: [
      { model: { layer: 'muscle', meshes: ['Long head of biceps brachii', 'Short head of biceps brachii', 'Long head of triceps brachii', 'Lateral head of triceps brachii', 'Medial head of triceps brachii'], label: 'Biceps and triceps attachments across the elbow', caption: 'Biceps brachii (anterior flexor) and triceps brachii (posterior extensor) pulling opposite ways across the elbow; tendons attach muscle to bone at osteotendinous junctions.' } },
      { schematic: 'muscleAction' },
      { gen: true },
    ],
    sourceRefs: [
      { ref: 'hss.msk.2026', location: 'p34 "Dense regular connective tissues that is"' },
      { ref: 'hss.msk.2026', location: 'p34 "anatomically continuous with the endo-, peri-, and"' },
      { ref: 'hss.msk.2026', location: 'p34 "epimysium at both ends of skeletal muscle"' },
      { ref: 'hss.msk.2026', location: 'p34 "muscle to the bone to elicit movement"' },
      { ref: 'hss.msk.2026', location: 'p34 "Golgi tendon organ"' },
      { ref: 'hss.msk.2026', location: 'p34 "detects tension/force developed at the tendon during muscle"' },
      { ref: 'hss.msk.2026', location: 'p35 "Myotendinous junction—point at which tendon attaches to muscles"' },
      { ref: 'hss.msk.2026', location: 'p35 "Osteotendinous junction—point at which tendon attaches to bone"' },
      { ref: 'hss.msk.2026', location: 'p35 "The origin (usually proximal) is the attachment site that does not move during contraction"' },
      { ref: 'hss.msk.2026', location: 'p35 "The insertion (usually distal) is the attachment site that moves when the muscle contracts."' },
    ],
  },
  {
    id: 'hss2011-msk-motor-unit-tone',
    subject: 'HSS2011', unit: 'hss.m4', type: 'definition',
    title: 'The motor unit and muscle tone: innervation ratios, recruitment, and resting tension',
    tags: ['musculoskeletal', 'high-yield'],
    lesson: {
      explanation: 'The fundamental structural and functional unit of skeletal muscle contraction is the motor unit. By physiological definition, a motor unit consists of a single somatic motor neuron plus all the individual muscle fibres that it innervates. When an action potential travels down the motor axon, every muscle fibre belonging to that motor unit contracts simultaneously following the all-or-none law. The number of muscle fibres commanded by a single motor neuron—termed the innervation ratio—varies enormously across different skeletal muscles, reflecting a direct biomechanical trade-off between movement precision and force production. In small muscles requiring delicate, rapid, and ultra-precise motor control, such as the extrinsic eye muscles responsible for fine gaze tracking, a single motor neuron innervates as few as 13 to 20 muscle fibres; each recruitment step adds a minute increment of force, allowing exceedingly fine adjustments. In contrast, in large postural and weight-bearing muscles designed for powerful locomotion, such as the calf muscles (gastrocnemius and soleus), a single motor neuron may control roughly 2,000 muscle fibres; firing a single motor unit produces massive, coarse force increments capable of propelling body weight. Closely coupled to motor unit physiology is muscle tone (tonus)—a continuous, resting state of involuntary low-level muscle contraction. Even when an individual is completely relaxed and at rest, skeletal muscles maintain palpable firmness rather than going flaccid. Muscle tone is sustained not by all motor units firing weakly at once, but rather by small groups of motor units alternating between active and inactive states in a constantly shifting asynchronous rotation. This asynchronous firing pattern ensures that individual motor units have adequate recovery intervals between activations, preventing muscular fatigue. Muscle tone is not strong enough to produce joint movement, but it is essential for keeping skeletal muscles firm, stabilizing joints, and maintaining upright posture against gravity.',
      plain: 'A motor unit is a single motor nerve cell and all the muscle fibres it controls. Because the whole unit fires together, the motor unit is the smallest step of force a muscle can produce. The number of fibres per nerve cell varies dramatically depending on the muscle\'s job: fine-control muscles like eye muscles have small motor units (only 13 to 20 fibres per neuron) for delicate adjustments, while powerful calf muscles have huge motor units (around 2,000 fibres per neuron) to generate massive force. Even when you are fully relaxed, muscles maintain muscle tone—a low-level resting firmness produced by small teams of motor units taking turns firing in a constantly shifting pattern. This resting tension keeps muscles firm and stabilizes joints without causing movement or fatiguing the muscle.',
      keyFacts: [
        'Motor unit: a somatic motor neuron plus all the muscle fibres it innervates; the functional unit of skeletal muscle.',
        'All-or-none principle: when a motor neuron fires, all muscle fibres in its motor unit contract together.',
        'Innervation ratio reflects the precision-versus-force trade-off across different skeletal muscles.',
        'Eye muscle: one motor neuron innervates only 13–20 muscle fibres, providing delicate, high-precision control.',
        'Calf muscle (gastrocnemius): one motor neuron innervates ~2000 muscle fibres, delivering powerful, coarse force.',
        'Muscle tone: a continuous, resting low level of contraction present even when the body is at rest.',
        'Mechanism of tone: small groups of motor units alternate between active and inactive states in a constantly shifting pattern.',
        'Tone is not strong enough to produce movement, but is essential to maintain firmness, joint stability, and posture.',
      ],
      prerequisites: ['hss2011-msk-muscle-organisation'],
      examples: [
        'In clinical neurological examination, hypotonia (loss of resting muscle tone) or flaccidity indicates lower motor neuron damage, whereas hypertonia (spasticity) reflects upper motor neuron lesions releasing spinal motor units from cerebral inhibition.',
      ],
    },
    memory: {
      comparison: 'Small motor unit = fine precision (eye: 13–20 fibres). Large motor unit = brute strength (calf: 2000 fibres). A 100-fold difference.',
      visualCue: 'Envision muscle tone as a 24-hour guard rotation: small squads take turns on duty, so the fortress is always secure without any guard collapsing from exhaustion.',
      conceptTrap: 'A resting muscle is not switched off. Muscle tone keeps it firm; flaccid limpness only occurs when nerves are severed.',
    },
    practice: [
      { type: 'cloze', prompt: 'A motor unit is defined as a(n) ______ plus the ______ it innervates.', accept: ['motor neuron; muscle fibres', 'motor neuron, muscle fibers', 'motor neuron and muscle fibres', 'motor neurone; muscle fibres'],
        explanation: 'A motor unit is a single somatic motor neuron plus all the skeletal muscle fibres it innervates.',
        src: { ref: 'hss.msk.2026', location: 'p37 "Motor unit ="' } },
      { type: 'mcq', prompt: 'Roughly how many muscle fibres are commanded by a single motor neuron in an extrinsic eye muscle?', options: ['1–2', '13–20', '200–300', '2000'], answer: 1,
        explanation: 'An eye muscle motor neuron controls 13 to 20 fibres for exquisite precision; 2000 fibres is the innervation ratio for a calf muscle.',
        src: { ref: 'hss.msk.2026', location: 'p37 "eye muscle may control 13-"' } },
      { type: 'mcq', prompt: 'Which mechanism explains why muscle tone can be maintained continuously without inducing muscular fatigue?', options: ['Continuous submaximal firing of every motor unit', 'Small groups of motor units alternating between active and inactive states in a shifting pattern', 'Continuous non-electrical calcium leakage in muscle fibres', 'Sensory spindle feedback inhibiting motor neurons'], answer: 1,
        explanation: 'Small groups of motor units alternate between active and inactive states in a constantly shifting pattern, allowing resting units to recover.',
        src: { ref: 'hss.msk.2026', location: 'p37 "active and inactive in a constantly shifting"' } },
      { type: 'typed', prompt: 'Roughly how many muscle fibres may be controlled by a single motor neuron in a powerful calf muscle?', accept: ['2000', '2,000', 'about 2000', 'around 2000'],
        explanation: 'A single motor neuron in a calf muscle controls approximately 2,000 muscle fibres.',
        src: { ref: 'hss.msk.2026', location: 'p37 "calf muscle may control 2000 muscle fibers"' } },
    ],
    application: [
      { type: 'scenario', prompt: 'A patient with a transected motor nerve exhibits completely flaccid, limp muscle tissue with zero tone. Using motor unit physiology, explain why muscle tone vanished immediately upon denervation.',
        model: 'Muscle tone is not an intrinsic passive stiffness of muscle tissue; it is an active low-level contraction sustained by motor neurons continuously sending action potentials to small rotating groups of muscle fibres. Transecting the motor nerve halts all neural input to the motor units. Because muscle fibres cannot contract without action potentials from their somatic motor neuron, all active motor unit firing ceases and muscle tone is immediately lost, resulting in flaccid paralysis.',
        rubric: ['Identifies muscle tone as an active neural phenomenon requiring motor neuron firing', 'Explains that denervation cuts off action potentials to all motor units', 'Concludes that without motor unit activation, resting firmness is abolished'] },
    ],
    commonMistakes: [
      'Defining a motor unit as one neuron and only one muscle fibre; one neuron typically innervates dozens to thousands of fibres.',
      'Believing muscle tone is strong enough to produce joint movement; tone maintains resting firmness and posture without movement.',
      'Assuming all motor units in a muscle are identical in size; muscles contain a spectrum of motor units recruited according to force demands.',
    ],
    skills: [
      'Innervation ratio principle: small motor units deliver fine motor precision; large motor units deliver gross mechanical power.',
      'Asynchronous rotation: muscle tone avoids fatigue by cycling through active and resting motor units in a continuous relay.',
    ],
    selfCheck: 'From memory, define a motor unit, state the innervation ratios for the eye versus the calf muscle, and explain how asynchronous motor unit firing produces continuous muscle tone without fatigue.',
    visuals: [
      { model: { layer: 'muscle', meshes: ['Lateral head of gastrocnemius', 'Medial head of gastrocnemius'], label: 'Gastrocnemius (large motor units)', caption: 'In large postural muscles like the gastrocnemius, a single motor neuron innervates roughly 2000 muscle fibres for powerful force production.' } },
      { gen: true },
    ],
    sourceRefs: [
      { ref: 'hss.msk.2026', location: 'p37 "Motor unit ="' },
      { ref: 'hss.msk.2026', location: 'p37 "Motor neuron + Muscle fibres"' },
      { ref: 'hss.msk.2026', location: 'p37 "eye muscle may control 13-"' },
      { ref: 'hss.msk.2026', location: 'p37 "calf muscle may control 2000 muscle fibers"' },
      { ref: 'hss.msk.2026', location: 'p37 "Muscle tone—a low level of contraction"' },
      { ref: 'hss.msk.2026', location: 'p37 "active and inactive in a constantly shifting"' },
      { ref: 'hss.msk.2026', location: 'p37 "Not strong enough to produce a movement but able to keep skeletal muscle firm"' },
    ],
  },
  {
    id: 'hss2011-msk-joint-classifications',
    subject: 'HSS2011', unit: 'hss.m4', type: 'matching',
    title: 'Joint classifications: anatomical, functional, and structural axes',
    tags: ['musculoskeletal', 'high-yield'],
    lesson: {
      explanation: 'A joint (articulation) is the junction where two or more bones meet. Its characteristic internal architecture determines the type and range of movement it allows. In human anatomy, joints are classified across three distinct, independent classification axes: anatomical (by regional bone articulation), functional (by degree of mobility), and structural (by the tissue separating articulating surfaces). Every joint in the body can be classified along all three axes simultaneously. First, the anatomical classification identifies joints by the regional anatomical names of the articulating bones: the jaw joint is the temporomandibular joint (temporal bone and mandible); the shoulder joint is the glenohumeral joint (glenoid cavity of scapula and humerus); the elbow complex comprises three distinct articulations (humeroulnar, humeroradial, and proximal radioulnar joints); the wrist is the radiocarpal joint (radius and proximal carpal bones); the hip is the acetabulofemoral joint (acetabulum of pelvis and femur); the knee complex comprises the patellofemoral and tibiofemoral joints; and the ankle is the talocrural joint (tibia/fibula crural mortise and talus). Second, the functional classification categorizes joints purely according to their degree of physiological mobility: a synarthrosis is an immovable joint (providing maximum structural stability, e.g. skull sutures); an amphiarthrosis is a slightly movable joint (providing a balance of limited motion and weight-bearing resilience, e.g. pubic symphysis and intervertebral discs); and a diarthrosis is a freely movable joint (permitting extensive angular, rotational, or gliding movements). Third, the structural classification categorizes joints according to the anatomical tissue that binds and separates the articulating bones: fibrous joints are united by dense fibrous connective tissue with no intervening joint cavity (typically synarthroses or amphiarthroses); cartilaginous joints are united by hyaline cartilage or fibrocartilage with no joint cavity; and synovial joints are characterized by a fluid-filled joint cavity enclosed within a fibrous joint capsule. Synovial joints are by far the most common joints in the human body, and all synovial joints are functionally classified as freely movable diarthroses because the fluid cavity eliminates direct tissue bridges between bones.',
      plain: 'A joint can be classified in three different ways at the same time: where it is (anatomical), how much it moves (functional), and what is between the bones (structural). Anatomically, joints are named after the bones that meet (e.g. temporomandibular for the jaw, glenohumeral for the shoulder, talocrural for the ankle). Functionally, joints are grouped by mobility: synarthrosis (immovable), amphiarthrosis (slightly movable), and diarthrosis (freely movable). Structurally, joints are grouped by their connective tissue: fibrous joints (held by fibrous tissue, no cavity), cartilaginous joints (held by cartilage, no cavity), and synovial joints (separated by a fluid-filled cavity inside a fibrous capsule). Synovial joints are the most common in the body and are all freely movable diarthroses.',
      keyFacts: [
        'Three independent classification axes: anatomical (region/bones), functional (mobility), and structural (separating tissue).',
        'Anatomical joint names: jaw = temporomandibular; shoulder = glenohumeral; wrist = radiocarpal; hip = acetabulofemoral; ankle = talocrural.',
        'Elbow complex comprises humeroulnar, humeroradial, and proximal radioulnar joints.',
        'Knee complex comprises patellofemoral and tibiofemoral joints.',
        'Functional classification: synarthrosis = immovable; amphiarthrosis = slightly movable; diarthrosis = freely movable.',
        'Structural classification: fibrous joints, cartilaginous joints, and synovial joints.',
        'Synovial joints feature a fluid-filled joint cavity surrounded by a fibrous capsule; they are the most common joints in the human body.',
        'All synovial joints are functionally classified as diarthroses (freely movable).',
      ],
      prerequisites: ['hss2011-joints-classification'],
      examples: [
        'When evaluating a pelvic radiograph, the pubic symphysis is classified as an amphiarthrosis functionally and a cartilaginous joint structurally, whereas the hip joint is an acetabulofemoral diarthrosis functionally and a synovial joint structurally.',
      ],
    },
    memory: {
      wordOrigin: 'Syn- = together (bones joined tight = immovable); Amphi- = both/around (partial movement); Dia- = through/across (movement goes freely through).',
      chunking: 'Three axes: Where is it? (Anatomical bones); How does it move? (Functional mobility); What is inside? (Structural tissue).',
      contrast: 'Structural determines functional: a fluid-filled synovial cavity allows free movement (diarthrosis); dense fibrous tissue locks bones tight (synarthrosis).',
    },
    practice: [
      { type: 'matching', prompt: 'Match each functional joint class to its degree of physiological mobility.',
        pairs: [['Synarthrosis', 'Immovable joint'], ['Amphiarthrosis', 'Slightly movable joint'], ['Diarthrosis', 'Freely movable joint']],
        explanation: 'Functional classification evaluates joints strictly by degree of mobility.',
        src: { ref: 'hss.msk.2026', location: 'p15 "Immovable (Synarthrosis)"' } },
      { type: 'mcq', prompt: 'Which structural class of joints is the most common throughout the human body?', options: ['Fibrous joints', 'Cartilaginous joints', 'Synovial joints', 'Synostoses'], answer: 2,
        explanation: 'Synovial joints, possessing a fluid-filled synovial cavity within a fibrous capsule, are the most common joints in the body.',
        src: { ref: 'hss.msk.2026', location: 'p16 "most common in our body"' } },
      { type: 'matching', prompt: 'Match each common joint to its official anatomical articulation name.',
        pairs: [['Jaw joint', 'Temporomandibular joint'], ['Shoulder joint', 'Glenohumeral joint'], ['Wrist joint', 'Radiocarpal joint'], ['Hip joint', 'Acetabulofemoral joint'], ['Ankle joint', 'Talocrural joint']],
        explanation: 'Anatomical classification constructs names from the two articulating skeletal elements.',
        src: { ref: 'hss.msk.2026', location: 'p14 "Jaw joint Temporomandibular joint"' } },
      { type: 'cloze', prompt: 'A slightly movable joint is functionally classified as a(n) ______.', accept: ['amphiarthrosis', 'amphiarthroses'],
        explanation: 'An amphiarthrosis is slightly movable, whereas an immovable joint is a synarthrosis and a freely movable joint is a diarthrosis.',
        src: { ref: 'hss.msk.2026', location: 'p15 "Slightly movable (Amphiarthrosis)"' } },
    ],
    application: [
      { type: 'scenario', prompt: 'Classify the glenohumeral (shoulder) joint across all three classification axes, and explain how its structural anatomy explains its functional mobility.',
        model: 'Anatomically, it is the glenohumeral joint (formed between the glenoid cavity of the scapula and the head of the humerus). Structurally, it is a synovial joint, featuring a fluid-filled joint cavity enclosed by an articular capsule and lined by synovial membrane. Functionally, it is a diarthrosis (freely movable). The structural presence of a fluid-filled cavity separates the bones so there is no solid tissue bridging them, allowing free multiaxial rotation and translation.',
        rubric: ['Correctly names the joint on all three axes (glenohumeral, synovial, diarthrosis)', 'Explains the information provided by each axis', 'Explains how the structural synovial cavity enables functional diarthrodial mobility'] },
    ],
    commonMistakes: [
      'Assuming that structural and functional classifications are identical; cartilaginous joints include both synarthroses and amphiarthroses.',
      'Forgetting that the knee comprises two articulations: the tibiofemoral joint and the patellofemoral joint.',
      'Calling the elbow a single joint; anatomically it comprises humeroulnar, humeroradial, and proximal radioulnar articulations.',
    ],
    skills: [
      'Always determine which axis an exam question is asking: anatomical (named bones), functional (degree of mobility), or structural (tissue type).',
      'Structural anatomy dictates functional capacity: a fluid-filled joint cavity is the structural prerequisite for diarthrodial freedom.',
    ],
    selfCheck: 'From memory, list the three classification axes, define synarthrosis, amphiarthrosis, and diarthrosis, name the three structural types, and give the official anatomical names for jaw, shoulder, wrist, hip, and ankle joints.',
    visuals: [
      { fig: 'synovialTypes' },
      { schematic: 'jointClassification' },
      { gen: true },
    ],
    sourceRefs: [
      { ref: 'hss.msk.2026', location: 'p14 "Jaw joint Temporomandibular joint"' },
      { ref: 'hss.msk.2026', location: 'p14 "Shoulder joint Glenohumeral joint"' },
      { ref: 'hss.msk.2026', location: 'p14 "Wrist joint Radiocarpal joint"' },
      { ref: 'hss.msk.2026', location: 'p14 "Hip joint Acetabulofemoral joint"' },
      { ref: 'hss.msk.2026', location: 'p14 "Ankle joint Talocrural joint"' },
      { ref: 'hss.msk.2026', location: 'p15 "Immovable (Synarthrosis)"' },
      { ref: 'hss.msk.2026', location: 'p15 "Slightly movable (Amphiarthrosis)"' },
      { ref: 'hss.msk.2026', location: 'p15 "Freely movable (Diarthrosis)"' },
      { ref: 'hss.msk.2026', location: 'p16 "Structural aspects"' },
      { ref: 'hss.msk.2026', location: 'p16 "most common in our body"' },
    ],
  },
  {
    id: 'hss2011-msk-periosteum',
    subject: 'HSS2011', unit: 'hss.m4', type: 'definition',
    title: 'Periosteum: bilayered histology, osteogenic role, vascular supply, and innervation',
    tags: ['musculoskeletal', 'bone', 'high-yield'],
    lesson: {
      explanation: 'The periosteum is a specialized, tough connective tissue membrane that wraps around the entire external surface of bones, with the critical anatomical exception of articular sites where articulating surfaces are covered by hyaline articular cartilage. Histologically, the periosteum is an active, bilayered organ consisting of an outer fibrous layer and an inner osteogenic cellular layer. The outer fibrous layer is composed of dense irregular connective tissue containing fibroblasts and thick bundles of collagen fibres; specialized perforating collagen bundles (Sharpey\'s fibres) penetrate deep into the outer circumferential lamellae of cortical compact bone, anchoring the periosteum, tendons, and ligaments firmly to the skeletal matrix. The inner cellular layer is osteogenic, populated by multipotent osteoprogenitor stem cells capable of dividing and differentiating into active, bone-forming osteoblasts. This inner osteogenic layer is responsible for appositional bone growth (increasing bone shaft diameter) throughout childhood and serves as the primary cellular engine for callus formation and bone regeneration following fractures. The periosteum is richly furnished with branching capillary networks and sensory nerve endings. Small blood vessels in the periosteum penetrate Volkmann\'s (perforating) canals to nourish the outer cortex of the bone, operating in coordination with large nutrient arteries that enter the shaft of long bones through the nutrient foramen to supply the inner cortex and medullary cavity. The periosteum possesses a dense sensory nerve supply, containing somatic nociceptors exquisitely sensitive to tension, tearing, and mechanical pressure, which explains why bone fractures, subperiosteal hematomas, and direct bone contusions elicit intense, sharp somatic pain.',
      plain: 'The periosteum is a living, two-layered jacket that covers all bone surfaces except where joint cartilage sits. Its tough outer fibrous layer anchors tendons and ligaments into bone using strong collagen cables (Sharpey\'s fibres). Its inner cellular layer is osteogenic: it contains stem cells that turn into osteoblasts to grow bone wider and heal broken bones. The periosteum is packed with capillaries that feed the outer bone cortex, working alongside the large nutrient artery that enters the shaft through the nutrient foramen. It is also packed with pain-sensing nerves, which is why a bruised or broken bone hurts so intensely.',
      keyFacts: [
        'Periosteum: fibrous tissue surrounding the outer surface of all bones except at articular sites.',
        'Bilayered structure: outer fibrous layer (dense irregular connective tissue) and inner osteogenic cellular layer.',
        'Inner osteogenic layer: contains osteoprogenitor cells capable of differentiating into osteoblasts.',
        'Sharpey\'s (perforating) fibres: collagen bundles anchoring the periosteum and tendons deep into bone matrix.',
        'Richly furnished with capillaries and sensory nerves.',
        'Dual vascular supply: small periosteal vessels nourish outer cortex; nutrient arteries enter long-bone shafts via nutrient foramina.',
        'Dense sensory innervation makes periosteal tears and fractures exquisitely painful.',
        'Crucial for appositional bone growth and fracture repair.',
      ],
      prerequisites: ['hss2011-msk-bone-histology'],
      examples: [
        'A subperiosteal hematoma following a direct blow to the shin (anterior tibia) causes extreme tenderness because the expanding pool of blood strips and stretches the densely innervated, pain-sensitive periosteum.',
      ],
    },
    memory: {
      wordOrigin: 'Peri- = around, Osteo- = bone. The periosteum is literally the tissue around the bone.',
      chunking: 'Two layers: Outer = fibrous protection and tendon anchor. Inner = osteogenic cellular factory for growth and repair.',
      vascularRule: 'Two routes of blood: small vessels in periosteum feed outside; large nutrient artery through nutrient foramen feeds inside.',
    },
    practice: [
      { type: 'mcq', prompt: 'Where is the periosteum normally absent on a bone?', options: ['Along the diaphysis', 'Over articular surfaces covered by cartilage', 'At tendon insertion sites', 'Along the metaphysis'], answer: 1,
        explanation: 'The periosteum surrounds the outer bone surface except at articular sites, where articular cartilage covers the bone instead.',
        src: { ref: 'hss.msk.2026', location: 'p8 "a fibrous tissue surrounding the outer surface of the bone (except the articular sites)"' } },
      { type: 'matching', prompt: 'Match each feature of the periosteum to its histological or physiological role.',
        pairs: [['Outer fibrous layer', 'Dense irregular connective tissue anchoring tendons'], ['Inner osteogenic layer', 'Capable of differentiating into osteoblasts'], ['Small periosteal blood vessels', 'Nourish the outer bone cortex'], ['Nutrient artery', 'Enters shaft through nutrient foramen']],
        explanation: 'These define the structural layers, cellular capabilities, and dual blood supply routes of bone.',
        src: { ref: 'hss.msk.2026', location: 'p8 "Inner layer is osteogenic, capable of differentiating into osteoblasts"' } },
      { type: 'typed', prompt: 'Large nutrient arteries enter the shaft of long bones through which specific cortical opening?', accept: ['nutrient foramen'],
        explanation: 'The nutrient foramen is the oblique canal in long bone shafts admitting nutrient vessels to the medullary cavity and inner cortex.',
        src: { ref: 'hss.4.1', location: 'p7 "the nutrient foramen"' } },
    ],
    application: [
      { type: 'scenario', prompt: 'During orthopedic open reduction of a long bone fracture, an inexperienced surgeon extensively strips the periosteum off both bone fragments. Explain two major physiological complications that result.',
        model: 'First, stripping the periosteum tears the small periosteal blood vessels, causing cortical ischemia and devascularizing the outer cortex of the bone fragments. Second, it removes the inner osteogenic layer containing osteoprogenitor cells and osteoblasts necessary to synthesize the repair callus. The combination of vascular compromise and loss of osteogenic cells severely impairs fracture healing, risking delayed union or non-union.',
        rubric: ['Identifies devascularization due to stripping periosteal capillaries', 'Identifies loss of osteogenic cells/osteoblasts needed for callus formation', 'Concludes that fracture healing is delayed or fails (delayed union/non-union)'] },
    ],
    commonMistakes: [
      'Assuming the periosteum covers the entire bone including joint surfaces; it is strictly absent over articular cartilage.',
      'Confusing the outer fibrous layer (protective/structural) with the inner osteogenic layer (cellular/osteoblastic).',
      'Thinking bone receives all its blood solely from the nutrient artery; the periosteum supplies the outer cortical third.',
    ],
    skills: [
      'Periosteum is a bilayer: fibrous protective outer coat and cellular bone-building inner layer.',
      'Dual vascular supply: small periosteal vessels supply the outer third of the cortex; nutrient arteries supply the inner two-thirds and medullary cavity.',
    ],
    selfCheck: 'From memory, describe the two layers of the periosteum, explain its dual blood supply with the nutrient foramen, name where it is absent, and explain why periosteal injuries are so painful.',
    visuals: [
      { fig: 'longBone' },
      { schematic: 'longBone' },
      { gen: true },
    ],
    sourceRefs: [
      { ref: 'hss.msk.2026', location: 'p8 "a fibrous tissue surrounding the outer surface of the bone (except the articular sites)"' },
      { ref: 'hss.msk.2026', location: 'p8 "Inner layer is osteogenic, capable of differentiating into osteoblasts"' },
      { ref: 'hss.msk.2026', location: 'p8 "Richly furnished with capillaries and nerves"' },
      { ref: 'hss.4.1', location: 'p7 "nourished through small blood vessels in the periosteum"' },
      { ref: 'hss.4.1', location: 'p7 "enter the shaft of long bones through"' },
      { ref: 'hss.4.1', location: 'p7 "the nutrient foramen"' },
      { ref: 'hss.4.1', location: 'p13 "covers the outer"' },
      { ref: 'hss.4.1', location: 'p13 "surface of shaft"' },
      { ref: 'hss.4.1', location: 'p13 "osteogenic, capable of differentiating into osteoblasts"' },
      { ref: 'hss.4.1', location: 'p13 "with capillaries and"' },
    ],
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
    title: 'Brainstem: midbrain, pons, medulla and the reticular formation',
    tags: ['neuroanatomy', 'cns', 'brainstem', 'high-yield'],
    lesson: {
      explanation: 'The brainstem has three parts, superior to inferior: midbrain, pons and medulla oblongata. The midbrain is the most superior. The cerebral aqueduct passes through it. On its posterior surface are four colliculi: the superior colliculi provide a visual reflex and the inferior colliculi provide an auditory reflex. Deeper lie the red nucleus, for coordination of muscle groups, and the substantia nigra, which controls fine movement and is an inhibitory motor centre: its dopamine exerts an inhibitory effect at the basal nuclei, and its degeneration, from a deficiency of dopamine synthesis, causes Parkinson’s disease with tremor and dyskinesia of the extremities. Cranial nerves III and IV arise from the midbrain. The pons lies below the midbrain. Its peduncles attach to the cerebellum and convey motor information from the cerebral cortex to the cerebellum; ascending and descending tracts run through it, the fourth ventricle lies behind it, and cranial nerves V to VIII are associated with it. The medulla oblongata is the most inferior part of the brainstem. It contains the cardiac centre, the vasomotor centre and the respiratory centre. Its anterior surface carries the pyramids, which contain the corticospinal tract, and the olive; the fourth ventricle and its choroid plexus lie behind, and cranial nerves IX to XII are associated with it. Running vertically through all levels of the brainstem is the reticular formation, a loosely organised web of grey matter; its reticular activating system has four functions: somatic motor control, cardiovascular control, pain modulation, and sleep and consciousness.',
      plain: 'Brainstem, top to bottom: midbrain, pons, medulla. Midbrain: the cerebral aqueduct runs through it; superior colliculi = visual reflex, inferior colliculi = auditory reflex; red nucleus coordinates muscle groups; substantia nigra makes dopamine and inhibits the basal nuclei, and losing it causes Parkinson’s; CN III and IV come off here. Pons: its peduncles carry cortex-to-cerebellum traffic; 4th ventricle behind; CN V to VIII. Medulla: the lowest part, holding the cardiac, vasomotor and respiratory centres; pyramids (corticospinal tract) and olive on the front; CN IX to XII. Threaded through all of it is the reticular formation, whose activating system runs motor tone, cardiovascular control, pain modulation, and sleep and consciousness.',
      keyFacts: [
        'Brainstem = midbrain (superior), pons, medulla oblongata (most inferior).',
        'Midbrain: cerebral aqueduct passes through; superior colliculi = visual reflex, inferior colliculi = auditory reflex.',
        'Red nucleus = coordination of muscle groups.',
        'Substantia nigra: controls fine movement, inhibitory motor centre; dopamine exerts an inhibitory effect at the basal nuclei; degeneration causes Parkinson’s disease (deficiency of dopamine synthesis; tremor / dyskinesia of the extremities).',
        'Cranial nerves from the midbrain: III and IV.',
        'Pons: peduncles attach to the cerebellum, conveying motor information from the cerebral cortex to the cerebellum; cranial nerves V to VIII.',
        'Medulla oblongata: cardiac centre, vasomotor centre, respiratory centre; pyramids (corticospinal tract inside) and the olive; cranial nerves IX to XII.',
        'Reticular formation: a loosely organised web of grey matter running vertically through all levels of the brainstem.',
        'Reticular activating system functions: somatic motor control, cardiovascular control, pain modulation, sleep and consciousness.',
      ],
      prerequisites: ['hss2011-cns-spinal-cord-meninges'],
      examples: ['A blow to the back of the head affecting the reticular activating system can cause immediate loss of consciousness.'],
    },
    memory: {
      chunking: 'Brainstem top to bottom: Midbrain, Pons, Medulla (M-P-M). Cranial nerves by floor: III-IV midbrain, V-VIII pons, IX-XII medulla.',
      comparison: 'Colliculi: Superior = Sight (eyes are above ears), Inferior = ears / audition.',
      wordOrigin: 'Substantia nigra = "black substance"; its cells are pigmented, and they are the dopamine cells lost in Parkinson’s.',
    },
    practice: [
      { type: 'mcq', prompt: 'Where do the descending corticospinal pyramids decussate, and which brainstem part is it?', options: ['Midbrain', 'Pons', 'Medulla oblongata', 'Spinal cord'], answer: 2,
        explanation: 'The pyramids lie on the anterior medulla oblongata, the most inferior part of the brainstem, and the corticospinal fibres cross there.',
        src: { ref: 'hss.2.3', location: 'p24 "Pyramid (corticospinal tract inside)" — "Medulla oblongata"' } },
      { type: 'mcq', prompt: 'Which midbrain structure provides a visual reflex?', options: ['Inferior colliculi', 'Superior colliculi', 'Red nucleus', 'Substantia nigra'], answer: 1,
        explanation: 'Superior colliculi provide a visual reflex; inferior colliculi provide an auditory reflex.',
        src: { ref: 'hss.2.3', location: 'p22 "Superior colliculi" — "Provides visual reflex"' } },
      { type: 'cloze', prompt: 'The loosely organised web of grey matter that runs vertically through all levels of the brainstem is the ______ ______.', accept: ['reticular formation', 'the reticular formation'],
        explanation: 'Model answer: reticular formation. Its reticular activating system governs somatic motor control, cardiovascular control, pain modulation, and sleep and consciousness.',
        src: { ref: 'hss.revans', location: 'Module 2.3, Fill-in-blanks 5' } },
      { type: 'cloze', prompt: 'Degeneration of the ______ ______ in the midbrain, with a deficiency of dopamine synthesis, causes Parkinson’s disease.', accept: ['substantia nigra'],
        explanation: 'The substantia nigra is an inhibitory motor centre whose dopamine acts on the basal nuclei; losing it produces the tremor and dyskinesia of Parkinson’s disease.',
        src: { ref: 'hss.2.2', location: 'p22 "Degeneration of substantia nigra (in midbrain)"' } },
    ],
    application: [
      { type: 'scenario', prompt: 'Why is an acute lesion compressing the medulla oblongata rapidly fatal, when a lesion of similar size in the frontal lobe may not be?',
        model: 'The medulla oblongata contains the cardiac centre, the vasomotor centre and the respiratory centre. Compressing it fails spontaneous breathing and cardiovascular control at once, which the rest of the brain cannot substitute for. A frontal-lobe lesion of similar size destroys association cortex whose loss is survivable.',
        rubric: ['Names the cardiac, vasomotor and respiratory centres', 'Places them in the medulla', 'Concludes that losing autonomic vital control is fatal'] },
    ],
    commonMistakes: [
      'Swapping the reflex jobs of the superior (visual) and inferior (auditory) colliculi.',
      'Placing the cardiac and vasomotor centres in the pons rather than the medulla.',
      'Attributing Parkinson’s to the red nucleus or basal nuclei rather than the substantia nigra.',
    ],
    skills: [
      'Localise a brainstem sign by cranial-nerve floor: III-IV means midbrain, V-VIII means pons, IX-XII means medulla.',
      'The substantia nigra links three exam facts in one chain: it is in the midbrain, it makes dopamine that inhibits the basal nuclei, and losing it is Parkinson’s disease.',
      'A medulla question is almost always really asking about the three vital centres (cardiac, vasomotor, respiratory) or the pyramids and their decussation.',
    ],
    selfCheck: 'From a blank page: the three brainstem parts in order; the colliculi and their reflexes; the substantia nigra chain to Parkinson’s; the three vital medullary centres; the four functions of the reticular activating system.',
    visuals: [
      { model: { layer: 'nervous', meshes: ['Midbrain', 'Pons', 'Medulla oblongata', 'Superior colliculus', 'Inferior colliculus', 'Red nucleus', 'Olive'], label: 'The brainstem and its landmarks', caption: 'Midbrain, pons and medulla in a column, with the superior and inferior colliculi on the back of the midbrain, the red nucleus within it, and the olive bulging from the side of the medulla.' } },
      { fig: 'cerebellumSection' },
      { gen: true },
    ],
    sourceRefs: [
      { ref: 'hss.2.3', location: 'p21 "Brainstem" — "Midbrain" — "Pons" — "Medulla" — "oblongata"' },
      { ref: 'hss.2.3', location: 'p22 "Cerebral aqueduct passes through" — "Superior colliculi" — "Provides visual reflex" — "Inferior colliculi" — "Provides auditory reflex" — "Red nucleus" — "Coordination of muscle groups" — "Substantia nigra" — "Controls fine movement" — "Inhibitory motor center" — "Dopamine exerts inhibitory effect at the basal nuclei." — "Cranial nerves III and IV"' },
      { ref: 'hss.2.3', location: 'p23 "Peduncles" — "cerebellum" — "Conveys motor information" — "from the cerebral cortex to" — "the cerebellum" — "Ascending & descending tracts" — "Cranial nerves V - VIII"' },
      { ref: 'hss.2.3', location: 'p24 "Cardiac center" — "Vasomotor center" — "Respiratory center" — "Olive" — "Fourth ventricle" — "Choroid plexus" — "Pyramid (corticospinal tract inside)"' },
      { ref: 'hss.2.3', location: 'p25 "Loosely organized web of gray" — "matter that runs vertically" — "through all levels of brainstem" — "Somatic motor control" — "Cardiovascular control" — "Pain modulation" — "Sleep and consciousness"' },
      { ref: 'hss.2.2', location: 'p22 "Degeneration of substantia nigra (in midbrain)" — "Dopamine-releasing cell" — "Loss of motor function"' },
      { ref: 'hss.fib5yr', location: 'p13 "The medulla" — "oblongata is the most inferior part of the brainstem."' },
      { ref: 'hss.revans', location: 'Module 2.3, Fill-in-blanks 5 "Reticular formation"' },
    ],
  },

  {
    id: 'hss2011-cns-cerebrum-cortex-basal',
    subject: 'HSS2011', unit: 'hss.m2', type: 'definition',
    title: 'Cerebrum, functional cortical areas and basal nuclei',
    tags: ['neuroanatomy', 'cns', 'cortex', 'high-yield'],
    lesson: {
      explanation: 'The two cerebral hemispheres are separated by the longitudinal fissure and joined beneath it by the corpus callosum. On the lateral surface the central sulcus runs from the longitudinal fissure towards the lateral sulcus, and these two sulci help bound the four lobes: frontal, parietal, temporal and occipital. The cortex carries named functional areas. The precentral gyrus is the primary motor cortex — motor execution, controlling the muscles and joint movements of the contralateral side of the body. Immediately behind the central sulcus the postcentral gyrus is the primary somatosensory cortex: it interprets pain and temperature, perceives pressure and touch, and discriminates the shape, size and texture of objects. The occipital lobe holds the primary visual cortex, the temporal lobe the primary auditory cortex and auditory association area, and the primary olfactory and gustatory cortices lie nearby. Broca’s area is the speech centre; Wernicke’s (the general interpretive area), the frontal eye field and the prefrontal cortex are the other integrative centres. Deep to the cortex, cerebral white matter is myelinated axons in three classes: association fibres connect the cortex of different parts of the same hemisphere; commissural fibres connect the corresponding cortices of the two hemispheres (e.g. corpus callosum); projection fibres connect the cortex to more caudal parts of the CNS (e.g. internal capsule, corona radiata, and the descending fibres that form the decussation of the pyramids). The basal nuclei — caudate nucleus, putamen and globus pallidus — sit in the white matter: their general function is to adjust activity in the descending tracts, and their specific roles are sequencing movements and regulating muscle tone and force. Wernicke’s area is language cortex, not a limbic structure.',
      plain: 'Two hemispheres split by the longitudinal fissure, bridged by the corpus callosum; the central and lateral sulci divide each into four lobes. Key cortex: precentral gyrus = primary motor (runs the opposite side of the body), postcentral gyrus just behind it = primary sensory (pain, temperature, touch, texture), occipital = vision, temporal = hearing, plus Broca (speech) and Wernicke (interpretation). The white matter underneath has three wire types: association (within one hemisphere), commissural (between the hemispheres, e.g. corpus callosum), projection (down to the rest of the CNS, e.g. internal capsule). The basal nuclei (caudate, putamen, globus pallidus) tune the descending tracts — movement sequencing and muscle tone.',
      keyFacts: [
        'The longitudinal fissure separates the two cerebral hemispheres; the lateral sulcus separates the frontal and temporal lobes.',
        'Precentral gyrus = primary motor cortex: motor execution, controlling the contralateral side.',
        'Postcentral gyrus = primary somatosensory cortex: pain/temperature, pressure/touch, and shape/size/texture discrimination.',
        'Occipital lobe = primary visual cortex; temporal lobe = primary auditory cortex; Broca’s area = speech centre.',
        'Association fibres: cortex to cortex within one hemisphere.',
        'Commissural fibres: connect the corresponding cortices of the two hemispheres — e.g. corpus callosum.',
        'Projection fibres: cortex to more caudal CNS — e.g. internal capsule, corona radiata, decussation of the pyramids.',
        'Basal nuclei = caudate nucleus + putamen + globus pallidus.',
        'Basal nuclei: adjust activity in the descending tracts; sequence movements; regulate muscle tone and force.',
      ],
      prerequisites: ['hss2011-cns-brainstem-reticular'],
      examples: ['A blow to the back of the head that damages the occipital lobe causes loss of vision — a recurring past-paper item.'],
    },
    memory: {
      comparison: 'Precentral = Motor (in front of the central sulcus); Postcentral = Sensory (behind it). Pre-motor, post-sensory.',
      chunking: 'Three white-matter wires by reach: Association stays in one hemisphere, Commissural crosses to the other (corpus callosum), Projection leaves the cerebrum entirely (internal capsule).',
      firstLetter: 'Basal nuclei = Caudate, Putamen, Globus pallidus — "CPG". Job: adjust the descending tracts.',
    },
    practice: [
      {
        type: 'mcq',
        prompt: 'The primary somatosensory cortex is located on the:',
        options: ['Precentral gyrus', 'Postcentral gyrus', 'Superior temporal gyrus', 'Cingulate gyrus'],
        answer: 1,
        explanation: 'The postcentral gyrus (parietal lobe) is the primary somatosensory cortex; the precentral gyrus is primary motor.',
        src: { ref: 'hss.2.3', location: 'p6 "Postcentral gyrus (primary somatosensory)"' }
      },
      {
        type: 'cloze',
        prompt: 'Fibres that connect the corresponding cortices of the two hemispheres, such as the corpus callosum, are ______ fibres.',
        accept: ['commissural', 'commissure'],
        explanation: 'Commissures connect the corresponding cortices of the 2 hemispheres — e.g. corpus callosum. Association fibres stay within one hemisphere; projection fibres run to more caudal CNS.',
        src: { ref: 'hss.2.3', location: 'p9 "connect the corresponding" — "cortices of the 2 hemispheres"' }
      },
      {
        type: 'cloze',
        prompt: 'The principal commissural tract connecting the left and right cerebral hemispheres is the ______ ______.',
        accept: ['corpus callosum'],
        explanation: 'Model answer: corpus callosum — the principle commissural tract that allows the right and left cerebral hemispheres to communicate.',
        src: { ref: 'hss.revans', location: 'Module 2.3, Fill-in-blanks 3' }
      },
      {
        type: 'mcq',
        prompt: 'Which set of structures makes up the basal nuclei?',
        options: ['Thalamus, hypothalamus, epithalamus', 'Caudate nucleus, putamen, globus pallidus', 'Hippocampus, amygdala, fornix', 'Midbrain, pons, medulla'],
        answer: 1,
        explanation: 'The basal nuclei are the caudate nucleus, putamen and globus pallidus; they adjust activity in the descending tracts and regulate muscle tone and force.',
        src: { ref: 'hss.2.3', location: 'p15 "Including Caudate nucleus + Putamen + Globus Pallidus"' }
      },
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'A stroke patient understands spoken commands perfectly and knows what they wish to say, but struggles to articulate words. Which cortical speech area is affected, and where is it?',
        model: 'Broca’s area, the speech centre, in the frontal lobe of the dominant hemisphere. Difficulty in vocalisation with preserved comprehension points there. Wernicke’s area (the general interpretive area) is intact because language comprehension is preserved.',
        rubric: ['Identifies Broca’s area', 'Places it in the frontal lobe', 'Distinguishes speech output from Wernicke’s interpretation']
      }
    ],
    commonMistakes: [
      'Swapping precentral gyrus (motor) and postcentral gyrus (sensory).',
      'Calling the internal capsule a commissural or association tract — it is a projection tract (cortex to caudal CNS).',
      'Lumping Wernicke’s area into the limbic system because it sounds anatomical.',
    ],
    skills: [
      'Every "blow to the back of the head, loses vision" question is the occipital lobe; "front of the central sulcus" is motor, "behind it" is sensory. The sulcus is the landmark that answers both.',
      'Classify a white-matter tract by how far it reaches: same hemisphere = association, other hemisphere = commissural (corpus callosum), out of the cerebrum = projection (internal capsule, corona radiata, pyramidal decussation).',
      'Basal-nuclei questions want the trio (caudate, putamen, globus pallidus) and the job (adjust the descending tracts, sequence movement, set muscle tone) — not a limbic or diencephalic list.',
    ],
    selfCheck: 'From a blank page: the fissure and the two sulci that bound the lobes; precentral vs postcentral function; the three white-matter fibre classes with one example each; the three basal nuclei and their function.',
    visuals: [
      { model: { layer: 'nervous', meshes: ['Precentral gyrus', 'Postcentral gyrus', 'Corpus callosum', 'Caudate nucleus', 'Putamen', 'Globus pallidus'], label: 'Cortical strip, corpus callosum and basal nuclei', caption: 'The precentral (motor) and postcentral (sensory) gyri either side of the central sulcus, the corpus callosum arching between the hemispheres, and the caudate–putamen–globus pallidus of the basal nuclei deep in the white matter.' } },
      { schematic: 'nervousDivisions' },
      { gen: true },
    ],
    sourceRefs: [
      { ref: 'hss.2.3', location: 'p3 "Central sulcus runs from" — "fissure towards the lateral" — "Precentral" — "gyrus"' },
      { ref: 'hss.2.3', location: 'p6 "Interprets pain and temperature sensation." — "Perceives pressure and touch sensation." — "Discriminates shape, size and texture of the objects."' },
      { ref: 'hss.2.3', location: 'p7 "Precentral gyrus (primary motor)" — "Functions: Motor execution" — "it controls the muscles & joints movements of the contralateral side"' },
      { ref: 'hss.2.3', location: 'p8 "White matter" — "consists of" — "myelinated axons"' },
      { ref: 'hss.2.3', location: 'p9 "connect the corresponding" — "cortices of the 2 hemispheres"; "Connect the cortex to more caudal" — "parts of the CNS"; "Connect the cortex of the" — "different parts of the same"; "Decussation" — "of pyramids"; "Corona" — "radiata"' },
      { ref: 'hss.2.3', location: 'p15 "Including Caudate nucleus + Putamen + Globus Pallidus"; "Adjust activity in the descending tracts."; "For sequencing movements"; "For regulating muscle tone & muscle force"' },
      { ref: 'hss.2.2', location: 'p13 "Longitudinal fissure"; p15 "Motor control", "Speech", "Visual perception"' },
      { ref: 'hss.fib5yr', location: 'p15 "The longitudinal fissure separates the two cerebral hemispheres." — "lateral sulcus" — "separates the frontal and temporal lobes."; "damage to the occipital lobe"' },
      { ref: 'hss.revans', location: 'Module 2.3, Fill-in-blanks 3 "Corpus callosum"' },
    ],
  },

  {
    id: 'hss2011-cns-ventricles-csf-blood',
    subject: 'HSS2011', unit: 'hss.m2', type: 'definition',
    title: 'The ventricular system and cerebrospinal fluid',
    tags: ['neuroanatomy', 'cns', 'ventricles', 'csf', 'high-yield'],
    lesson: {
      explanation: 'There are four ventricles: two lateral ventricles, one third ventricle and one fourth ventricle. The two lateral ventricles lie in the cerebral hemispheres. Each drains through an interventricular foramen into the third ventricle, a midline slit between the halves of the diencephalon. From the third ventricle the cerebral aqueduct (aqueduct of the midbrain) runs down to the fourth ventricle, which lies between the pons and medulla in front and the cerebellum behind. From the fourth ventricle the central canal continues into the spinal cord, and CSF also escapes through two lateral apertures and one median aperture into the subarachnoid space. CSF is secreted by the choroid plexus, which is present in each lateral ventricle, the third ventricle and the fourth ventricle; each plexus adds more CSF as the fluid passes. CSF then fills the subarachnoid space and bathes the external surfaces of the brain and spinal cord. Its functions are to provide mechanical support for the brain, to control brain excitability by regulating the ionic composition, to carry away metabolites, and to provide some protection from pressure changes. Reabsorption is at the arachnoid villi: these penetrate the meningeal layer of the dura mater and extend into the superior sagittal sinus, where CSF is absorbed into the venous circulation; in adults the extensions form large arachnoid granulations.',
      plain: 'Four ventricles filled with CSF. Path: two lateral ventricles (in the hemispheres) -> interventricular foramen -> third ventricle (in the diencephalon) -> cerebral aqueduct (through the midbrain) -> fourth ventricle (between brainstem and cerebellum) -> central canal of the cord, and out through two lateral apertures + one median aperture into the subarachnoid space around the brain and cord. The choroid plexus in each ventricle makes the CSF. It cushions the brain, steadies its ion levels, clears waste and buffers pressure changes. It drains back into venous blood at the arachnoid villi / granulations, which poke through the dura into the superior sagittal sinus.',
      keyFacts: [
        'Four ventricles: two lateral, one third, one fourth.',
        'Lateral ventricle -> interventricular foramen -> third ventricle.',
        'Third ventricle -> cerebral aqueduct (of the midbrain) -> fourth ventricle.',
        'Fourth ventricle -> central canal of the spinal cord, and out via two lateral apertures + one median aperture into the subarachnoid space.',
        'CSF is secreted by the choroid plexus in each lateral ventricle, the third and the fourth ventricle.',
        'CSF fills the subarachnoid space and bathes the external surfaces of brain and spinal cord.',
        'Functions of CSF: mechanical support of the brain; controls brain excitability by regulating the ionic composition; carries away metabolites; some protection from pressure changes.',
        'Reabsorption: at the arachnoid villi / granulations, which penetrate the meningeal dura and extend into the superior sagittal (dural venous) sinus.',
      ],
      prerequisites: ['hss2011-cns-cerebrum-cortex-basal'],
      examples: ['Blockage of the cerebral aqueduct dilates the lateral and third ventricles upstream while the fourth ventricle stays normal downstream — a non-communicating hydrocephalus.'],
    },
    memory: {
      chunking: 'CSF path, one line: Lateral -> foramen -> Third -> aqueduct -> Fourth -> apertures -> subarachnoid space -> arachnoid villi -> superior sagittal sinus.',
      comparison: 'Choroid plexus makes CSF; arachnoid villi / granulations absorb it back into venous blood. Made inside the ventricles, returned outside them.',
      firstLetter: 'Four ventricles = 2 lateral + 1 third + 1 fourth. Two named connectors: interventricular foramen (1->3), cerebral aqueduct (3->4).',
    },
    practice: [
      { type: 'cloze', prompt: 'The ______ ______ connects the lateral ventricle to the third ventricle.', accept: ['interventricular foramen', 'foramen of monro'],
        explanation: 'Model answer: interventricular foramen. CSF flows through the interventricular foramina from each lateral ventricle into the third ventricle.',
        src: { ref: 'hss.revans', location: 'Module 2.3, Fill-in-blanks 2' } },
      { type: 'sequence', prompt: 'Put the CSF pathway in order from where it is made to where it is reabsorbed.',
        items: ['Lateral ventricles', 'Interventricular foramen', 'Third ventricle', 'Cerebral aqueduct', 'Fourth ventricle', 'Subarachnoid space', 'Arachnoid villi into the superior sagittal sinus'],
        explanation: 'CSF flows from the lateral ventricle to the third ventricle, through the cerebral aqueduct to the fourth ventricle, out into the subarachnoid space, and is returned to venous blood via the arachnoid villi in the dural venous sinuses.',
        src: { ref: 'hss.fib5yr', location: 'p13 "flows from the lateral ventricle to the third" — "ventricle and then through the cerebral aqueduct to the fourth ventricle."' } },
      { type: 'mcq', prompt: 'CSF is returned to the venous circulation at the:', options: ['Choroid plexus', 'Cerebral aqueduct', 'Arachnoid villi / granulations', 'Central canal'], answer: 2,
        explanation: 'At the arachnoid villi, CSF is reabsorbed into venous blood of the dural venous sinuses; the villi penetrate the meningeal dura and extend into the superior sagittal sinus.',
        src: { ref: 'hss.2.3', location: 'p30 "CSF is absorbed into the venous circulation at the arachnoid granulations."' } },
      { type: 'cloze', prompt: 'CSF is secreted by the ______ ______, which is present in all four ventricles.', accept: ['choroid plexus'],
        explanation: 'The choroid plexus in each lateral ventricle, the third ventricle and the fourth ventricle secretes CSF, each adding more as the fluid passes.',
        src: { ref: 'hss.2.3', location: 'p29 "CSF is secreted by" — "choroid plexus in" — "each lateral ventricle."' } },
    ],
    application: [
      { type: 'scenario', prompt: 'An MRI shows both lateral ventricles and the third ventricle dilated, but the fourth ventricle is normal. Where is the obstruction, and why does the pattern point there?',
        model: 'The obstruction is in the cerebral aqueduct. CSF flows lateral ventricles -> interventricular foramen -> third ventricle -> cerebral aqueduct -> fourth ventricle, so a block at the aqueduct backs fluid up into the third and lateral ventricles while the fourth ventricle, downstream, stays normal.',
        rubric: ['Names the cerebral aqueduct', 'Explains upstream dilation of the third and lateral ventricles', 'Notes the fourth ventricle is normal because it is downstream'] },
    ],
    commonMistakes: [
      'Confusing the interventricular foramen (lateral to third) with the cerebral aqueduct (third to fourth).',
      'Saying CSF is reabsorbed into lymphatics rather than the dural venous sinuses.',
      'Forgetting the choroid plexus is in all four ventricles, not just the lateral ones.',
    ],
    skills: [
      'The full CSF-flow blank is flagged "AGAIN!" in the past papers because it comes up every year. Learn it as one chain and write it straight out: lateral, foramen, third, aqueduct, fourth, apertures, subarachnoid space, arachnoid villi, sinus.',
      'A hydrocephalus pattern question is just the pathway read backwards: the last normal-sized ventricle sits just downstream of the block.',
      'Made vs absorbed: choroid plexus (inside the ventricles) makes it, arachnoid villi (in the subarachnoid space, into the sinus) absorb it.',
    ],
    selfCheck: 'From a blank page: the four ventricles; the two named connectors; the full flow path to the subarachnoid space and back to venous blood; the four functions of CSF; where it is made and where it is absorbed.',
    visuals: [
      { fig: 'csfSystem' },
      { model: { layer: 'nervous', meshes: ['Lateral ventricle', 'Third ventricle', 'Aqueduct of midbrain', 'Fourth ventricle', 'Choroid plexus'], label: 'The ventricular system', caption: 'The paired lateral ventricles, the midline third ventricle, the cerebral aqueduct through the midbrain, the fourth ventricle behind the pons, and the choroid plexus that secretes the CSF.' } },
      { gen: true },
    ],
    sourceRefs: [
      { ref: 'hss.2.3', location: 'p27 "Interventricular" — "foramen" — "Third ventricle" — "Cerebral aqueduct" — "Fourth ventricle" — "Central canal" — "4 ventricles = 2 x lateral + 1 x 3rd + 1 x 4th"' },
      { ref: 'hss.2.3', location: 'p28 "provides mechanical support of the brain" — "controls brain excitability by regulating the ionic composition" — "carries away metabolites" — "provides some protection from pressure changes"' },
      { ref: 'hss.2.3', location: 'p29 "CSF is secreted by" — "choroid plexus in" — "each lateral ventricle." — "CSF flows out two lateral apertures" — "and one median aperture." — "CSF fills subarachnoid space and" — "bathes external surfaces of brain"' },
      { ref: 'hss.2.3', location: 'p30 "Arachnoid villi penetrate the meningeal layer of the dura mater and extend into the" — "superior sagittal sinus." — "In adults, these extensions form large arachnoid granulations." — "CSF is absorbed into the venous circulation at the arachnoid granulations."' },
      { ref: 'hss.fib5yr', location: 'p13 "flows from the lateral ventricle to the third" — "ventricle and then through the cerebral aqueduct to the fourth ventricle." — "The CSF is returned to the venous circulation via the arachnoid" — "villi located in the Dural venous sinuses."' },
      { ref: 'hss.revans', location: 'Module 2.3, Fill-in-blanks 2 "Interventricular foramen"' },
    ],
  },

  /* ========================================================================
   * WEEK 6: CRANIAL NERVES (Module 2)
   * ======================================================================== */
  {
    id: 'hss2011-neuro-cranial-nerves-distribution',
    subject: 'HSS2011', unit: 'hss.m2', type: 'matching',
    title: 'Cranial nerves CN I to XII: modalities and targets',
    tags: ['neuroanatomy', 'cranial-nerves', 'high-yield'],
    lesson: {
      explanation: 'There are twelve pairs of cranial nerves, and they emerge in sequence from the base of the brain, front to back: CN I and II from the forebrain (olfactory bulb and tract, optic chiasm), CN III and IV from the midbrain, CN V to VIII from the pons, and CN IX to XII from the medulla oblongata. By modality: CN I olfactory (sensory, smell) and CN II optic (sensory, vision) are special sense. CN III oculomotor, CN IV trochlear and CN VI abducens move the eyeball through the extrinsic eye muscles, the split remembered as LR6SO4 (lateral rectus is VI, superior oblique is IV, the rest are III); CN III also carries parasympathetic fibres. CN V trigeminal is a mixed nerve: sensory to the face through three divisions, ophthalmic (V1), maxillary (V2) and mandibular (V3), and motor through V3 to the chewing muscles (mastication). CN VII facial is the chief motor nerve of facial expression (five branches), and it also carries taste from the anterior two-thirds of the tongue and parasympathetic fibres for lacrimal and salivary gland secretion. CN VIII vestibulocochlear is sensory, with a vestibular branch for balance and a cochlear branch for hearing. CN IX glossopharyngeal handles taste from the posterior third of the tongue, salivary (parotid) secretion and swallowing. CN X vagus is the longest cranial nerve, with the most extensive distribution, and major parasympathetic roles in cardiac, pulmonary, digestive and urinary function. CN XI accessory produces head and neck movement; CN XII hypoglossal produces tongue movement. The parasympathetic cranial nerves are III, VII, IX and X. A clinical contrast worth fixing: chewing is CN V, facial expression is CN VII.',
      plain: 'Twelve nerve pairs off the base of the brain, in order front to back: I-II forebrain, III-IV midbrain, V-VIII pons, IX-XII medulla. I smell, II sight. III/IV/VI move the eye (LR6SO4: lateral rectus = VI, superior oblique = IV, rest = III). V feels the face (V1/V2/V3) and chews (V3). VII does facial expression, front-of-tongue taste, and tears/saliva. VIII is hearing + balance. IX: back-of-tongue taste, parotid saliva, swallowing. X (vagus): the longest nerve, parasympathetic to heart, lungs, gut, urinary tract. XI moves the head/shoulders, XII moves the tongue. Parasympathetic carriers: III, VII, IX, X.',
      keyFacts: [
        'Twelve pairs; emerge in sequence: I-II forebrain, III-IV midbrain, V-VIII pons, IX-XII medulla.',
        'CN I olfactory (smell) and CN II optic (vision): special sensory.',
        'Eye movement: CN III (most muscles + parasympathetic pupil), CN IV (superior oblique), CN VI (lateral rectus) — LR6SO4.',
        'CN V trigeminal: sensory to the face via V1 ophthalmic, V2 maxillary, V3 mandibular; motor via V3 to the muscles of mastication.',
        'CN VII facial: muscles of facial expression (5 branches), taste anterior 2/3 of tongue, parasympathetic to lacrimal and salivary glands.',
        'CN VIII vestibulocochlear: vestibular branch (balance) + cochlear branch (hearing).',
        'CN IX glossopharyngeal: taste posterior 1/3, parotid salivation, swallowing. CN XII hypoglossal: tongue movement.',
        'CN X vagus: the longest cranial nerve, most extensive distribution; parasympathetic to cardiac, pulmonary, digestive and urinary systems.',
        'Parasympathetic cranial nerves: III, VII, IX, X.',
        'Clinical contrast: CN V chews (mastication); CN VII makes facial expressions.',
      ],
      prerequisites: ['hss2011-cns-brainstem-reticular'],
      examples: ['Bell’s palsy weakens facial expression on one side (CN VII) while sensation of the face and chewing (CN V) stay normal.'],
    },
    memory: {
      mnemonic: 'Eye muscles LR6SO4: Lateral Rectus = CN VI, Superior Oblique = CN IV, everything else = CN III.',
      chunking: 'Parasympathetic cranial nerves: 3, 7, 9, 10 — "1973 in reverse order of the last two".',
      comparison: 'Tongue: VII tastes the front 2/3, IX tastes the back 1/3, XII moves it. Trigeminal (V) chews; facial (VII) makes faces.',
    },
    practice: [
      { type: 'cloze', prompt: 'The ______ nerve controls movement of the muscles of mastication.', accept: ['trigeminal nerve', 'trigeminal', 'cn v', 'cranial nerve v'],
        explanation: 'Model answer: trigeminal nerve (CN V). Its mandibular division (V3) supplies the chewing muscles; the facial nerve (CN VII) supplies facial expression.',
        src: { ref: 'hss.revans', location: 'Module 2.3, Fill-in-blanks 4' } },
      { type: 'cloze', prompt: 'The longest cranial nerve, with the most extensive distribution, is the ______ nerve.', accept: ['vagus', 'vagus nerve', 'cn x'],
        explanation: 'Model answer: vagus nerve (CN X) — the longest cranial nerve, with major parasympathetic roles in cardiac, pulmonary, digestive and urinary function.',
        src: { ref: 'hss.revans', location: 'Module 2.3, Fill-in-blanks 1' } },
      { type: 'matching', prompt: 'Match each cranial nerve to its brainstem level of emergence.',
        pairs: [
          ['CN III Oculomotor / CN IV Trochlear', 'Midbrain'],
          ['CN V to CN VIII', 'Pons'],
          ['CN IX to CN XII', 'Medulla oblongata'],
          ['CN I Olfactory / CN II Optic', 'Forebrain (not the brainstem)'],
        ],
        explanation: 'The cranial nerves emerge in numerical order down the base of the brain; III-IV from the midbrain, V-VIII from the pons, IX-XII from the medulla.',
        src: { ref: 'hss.2.3', location: 'p22 "Cranial nerves III and IV"; p23 "Cranial nerves V - VIII"; p24 "CN IX" — "CN X" — "CN XI" — "CN XII"' } },
      { type: 'matching', prompt: 'Match each cranial nerve to its principal function.',
        pairs: [
          ['CN V Trigeminal', 'Face sensation + muscles of mastication'],
          ['CN VII Facial', 'Muscles of facial expression + taste anterior 2/3'],
          ['CN X Vagus', 'Parasympathetic to thoracic and abdominal viscera'],
          ['CN XII Hypoglossal', 'Tongue movement'],
        ],
        explanation: 'Trigeminal chews and feels the face, facial makes expressions and tastes the front of the tongue, vagus runs the viscera, hypoglossal moves the tongue.',
        src: { ref: 'hss.2.3', location: 'p38 "Trigeminal nerve (CN V)" — "(Mastication)"; p39 "Facial nerve (CN VII)" — "Taste (anterior 2/3)"; p42 "Vagus nerve (CN X)" — "The longest cranial nerve"; p43 "Hypoglossal nerve (CN XII)" — "Tongue movement"' } },
    ],
    application: [
      { type: 'scenario', prompt: 'A patient cannot clench their jaw, but their smile and eyebrow-raising are normal. Which cranial nerve is affected, which is spared, and how do you know?',
        model: 'The trigeminal nerve (CN V) is affected: its mandibular division V3 supplies the muscles of mastication, so a weak jaw clench points there. The facial nerve (CN VII) is spared, because it supplies the muscles of facial expression, and normal smiling and eyebrow movement show CN VII is intact.',
        rubric: ['Names CN V for mastication', 'Names CN VII for facial expression', 'Uses normal expression to conclude CN VII is intact'] },
    ],
    commonMistakes: [
      'Mixing up trigeminal (chewing) and facial (facial expression).',
      'Assigning eye abduction to CN III instead of CN VI (abducens).',
      'Naming CN VII for posterior-tongue taste — that is CN IX; VII is the anterior two-thirds.',
    ],
    skills: [
      'Bedside cranial-nerve testing maps to modality: smile/frown = VII, jaw clench = V, tongue protrusion = XII, shoulder shrug = XI, "follow my finger" = III/IV/VI.',
      'Answer tongue questions by third: front two-thirds taste = VII, back third taste and sensation = IX, whole-tongue movement = XII.',
      'The parasympathetic cranial nerves are III, VII, IX and X — the same four that carry the "rest and digest" outflow to the head and viscera.',
    ],
    selfCheck: 'From a blank page: the twelve nerves in order with modality (sensory/motor/mixed); the brainstem level each emerges from; the four parasympathetic ones; the trigeminal divisions; and which nerve does each tongue job.',
    visuals: [
      { fig: 'cranialNervesBase' },
      { model: { layer: 'nervous', meshes: ['Olfactory nerve (I)', 'Optic nerve (II)', 'Trigeminal nerve (V)', 'Facial nerve (VII)', 'Vestibulocochlear nerve (VIII)', 'Vagus nerve (X)', 'Hypoglossal nerve (XII)'], label: 'Cranial nerves on the model', caption: 'A sample down the sequence: olfactory and optic at the front, the large trigeminal and the facial/vestibulocochlear pair at the pons, and the vagus and hypoglossal leaving the medulla.' } },
      { gen: true },
    ],
    sourceRefs: [
      { ref: 'hss.2.3', location: 'p31 "Cranial nerves (CN) – 12 pairs" — "Olfactory bulb" — "Olfactory tract" — "Optic chiasm" — "Midbrain CN V" — "Pons CN VI"' },
      { ref: 'hss.2.3', location: 'p36 "Oculomotor, trochlear & abducens nerves" — "For eyeball movement (extrinsic eye muscles)"' },
      { ref: 'hss.2.3', location: 'p38 "Trigeminal nerve (CN V)" — "Ophthalmic division (V" — "Maxillary division (V" — "Mandibular division (V" — "(Mastication)" — "to chewing muscles"' },
      { ref: 'hss.2.3', location: 'p39 "Facial nerve (CN VII)" — "(facial expression, 5 branches)" — "Taste (anterior 2/3)" — "muscles of facial" — "expression"' },
      { ref: 'hss.2.3', location: 'p41 "Glossopharyneal nerve (CN IX)" — "Taste (posterior 1/3)" — "Salivary gland secretion" — "Swallowing" — "Parotid salivary gland"' },
      { ref: 'hss.2.3', location: 'p42 "Vagus nerve (CN X)" — "The longest cranial nerve" — "Has most extensive" — "distribution" — "Cardiac" — "Pulmonary" — "Digestive" — "Urinary"' },
      { ref: 'hss.2.3', location: 'p43 "Accessory nerve (CN XI)" — "Head and neck movement" — "Hypoglossal nerve (CN XII)" — "Tongue movement"' },
      { ref: 'hss.2.2', location: 'p32 "Innervation to head" — "Oculomotor nerve (III)" — "Facial nerve (VII)" — "Glossopharyngeal nerve (IX)" — "Innervation to viscera" — "Vagus nerve (X)"' },
      { ref: 'hss.revans', location: 'Module 2.3, Fill-in-blanks 1 "Vagus nerve" and Fill-in-blanks 4 "Trigeminal nerve"' },
    ],
  },

  /* ========================================================================
   * WEEK 6: ANATOMICAL CORRELATES OF STROKE (Module 2)
   * ======================================================================== */
  {
    id: 'hss2011-m2-stroke-correlates',
    subject: 'HSS2011', unit: 'hss.m2', type: 'concept',
    title: 'Anatomical correlates of stroke',
    tags: ['neuroanatomy', 'stroke', 'high-yield'],
    lesson: {
      explanation: 'Stroke localisation is decussation plus arterial territory. Ascending sensory pathways cross the midline in their second-order neuron, and descending motor commands cross at the pyramids of the medulla oblongata, so the left cerebral cortex serves the right side of the body and vice versa; a lesion on one side of the brain therefore causes loss of function on the opposite side of the body. The primary motor cortex sits on the precentral gyrus, immediately anterior to the central sulcus. The middle cerebral artery runs out over the lateral surface of the cerebral hemispheres, which is where that motor strip and the somatosensory strip behind it lie. So an occlusion of the middle cerebral artery produces contralateral weakness and sensory loss of the face, arm and leg. In the "Mr LAW" case, a blockage of the left middle cerebral artery affected the left hemisphere: he could not move the right side of his body, particularly the upper limb, and he also had difficulty in vocalisation, because Broca’s area lies in the frontal lobe and was also damaged; a left (usually dominant) hemisphere stroke adds aphasia. The posterior circulation is separate: the two vertebral arteries, from the subclavian arteries, ascend within the transverse foramina, enter the cranium at the foramen magnum, and fuse to form the basilar artery, which ends as the posterior cerebral arteries. With the anterior and posterior communicating arteries these close the cerebral arterial circle (circle of Willis), which encircles the infundibulum of the pituitary gland and reduces the probability of an interruption of circulation. The posterior circulation supplies the brainstem and occipital lobe, and a lower-brainstem stroke is commonly fatal because the medulla holds the cardiac, vasomotor and respiratory centres.',
      plain: 'Two rules localise a stroke. First, crossing: sensory tracts cross at their 2nd neuron and motor tracts cross at the medullary pyramids, so one side of the brain runs the opposite side of the body — a lesion on the left weakens the right. Second, territory: the middle cerebral artery covers the lateral hemisphere, including the motor strip on the precentral gyrus (just in front of the central sulcus) and the sensory strip behind it, so an MCA block gives contralateral face+arm+leg weakness and numbness; a left MCA stroke also causes aphasia because Broca’s area is nearby in the frontal lobe. The back of the brain runs on a different supply: vertebral arteries -> basilar artery -> posterior cerebral arteries, tied together with the communicating arteries into the circle of Willis around the pituitary stalk. That posterior system feeds the brainstem and occipital lobe, and a low brainstem stroke is usually fatal.',
      keyFacts: [
        'Sensory decussation is in the 2nd-order neuron; motor decussation is at the pyramids of the medulla oblongata.',
        'A stroke damaging the motor centres of one side of the brain causes loss of function on the opposite side of the body.',
        'Primary motor cortex = precentral gyrus, immediately anterior to the central sulcus.',
        'The middle cerebral artery supplies the lateral surface of the cerebral hemispheres — the motor and sensory strips.',
        'Left middle cerebral artery occlusion: aphasia plus right-body sensory and motor paralysis (the "Mr LAW" case; Broca’s area in the frontal lobe).',
        'Right middle cerebral artery occlusion: left-body sensation and motor loss, and difficulty drawing or interpreting.',
        'Vertebral arteries (from the subclavian) ascend the transverse foramina, enter at the foramen magnum, and fuse to form the basilar artery; the basilar ends as the posterior cerebral arteries.',
        'The cerebral arterial circle (circle of Willis) encircles the infundibulum of the pituitary gland and reduces the probability of interruption of circulation.',
        'A lower-brainstem stroke is commonly fatal (medullary cardiac, vasomotor and respiratory centres).',
      ],
      prerequisites: ['hss2011-m2-cns-basics', 'hss2011-cns-cerebrum-cortex-basal'],
      examples: ['Mr LAW: occlusion of the left middle cerebral artery, left hemisphere affected, cannot move the right upper limb, and difficulty in vocalisation from Broca’s area damage in the frontal lobe.'],
    },
    memory: {
      chunking: 'Localise a stroke in two moves: (1) which side of the body is weak tells you the opposite hemisphere; (2) which functions are lost (face+arm+leg, speech) tells you the MCA territory.',
      comparison: 'Anterior circulation = internal carotid -> anterior + middle cerebral (hemisphere surfaces). Posterior circulation = vertebral -> basilar -> posterior cerebral (brainstem + occipital lobe).',
      mnemonic: 'Left MCA: Language And Weakness on the right — "Mr LAW".',
    },
    practice: [
      { type: 'mcq', prompt: 'A right-handed man has an occlusion of his left middle cerebral artery. Which combination of deficits is expected?', options: ['Left-sided weakness only', 'Right-sided weakness and sensory loss, with aphasia', 'Loss of vision only', 'No deficit — the circle of Willis compensates fully'], answer: 1,
        explanation: 'A left MCA occlusion affects the left hemisphere: contralateral (right) motor and sensory loss, plus aphasia because Broca’s area lies in the frontal lobe within the MCA territory.',
        src: { ref: 'hss.mooc2', location: 'p5 "Left middle cerebral artery" — "Aphasia, right body side sensory and motor paralysis"' } },
      { type: 'cloze', prompt: 'The two vertebral arteries fuse to form the ______ artery.', accept: ['basilar', 'basilar artery'],
        explanation: 'The vertebral arteries ascend within the transverse foramina, enter at the foramen magnum, and fuse to form the basilar artery, which supplies the posterior part of the cerebral arterial circle.',
        src: { ref: 'hss.mooc2', location: 'p4 "2 vertebral arteries fuse to form basilar artery"' } },
      { type: 'cloze', prompt: 'The primary motor cortex is located on the precentral gyrus, immediately ______ to the central sulcus.', accept: ['anterior'],
        explanation: 'The precentral gyrus (primary motor cortex) is immediately anterior to the central sulcus; a lesion here from an MCA stroke affects contralateral motor function.',
        src: { ref: 'hss.fib5yr', location: 'p13 "the primary motor cortex" — "located immediately anterior to the central" — "sulcus"' } },
      { type: 'mcq', prompt: 'Why is a lower brainstem stroke commonly fatal?', options: ['It destroys the visual cortex', 'It interrupts the cardiac, vasomotor and respiratory centres of the medulla', 'It blocks CSF reabsorption', 'It damages Broca’s area'], answer: 1,
        explanation: 'The medulla oblongata houses the vital autonomic centres; a lower-brainstem stroke that interrupts them stops spontaneous breathing and cardiovascular control.',
        src: { ref: 'hss.mooc2', location: 'p5 "Lower brain stem" — "Commonly fatal"' } },
    ],
    application: [
      { type: 'scenario', prompt: 'A patient has right-sided face and arm weakness with sensory loss and cannot produce fluent speech, though they follow commands. Localise the lesion to a hemisphere and an artery, and justify each step.',
        model: 'Left hemisphere, middle cerebral artery. The right-sided motor and sensory loss localises to the left hemisphere because both the descending motor tract (crossing at the medullary pyramids) and the ascending sensory pathway (crossing in the 2nd-order neuron) mean the left cortex serves the right body. The face-and-arm pattern with preserved comprehension but impaired speech output fits the middle cerebral artery territory over the lateral surface, which carries the motor and sensory strips and Broca’s area in the frontal lobe.',
        rubric: ['States left hemisphere and explains it via decussation', 'Names the middle cerebral artery and its lateral-surface territory', 'Attributes the speech deficit to Broca’s area in the frontal lobe'] },
    ],
    commonMistakes: [
      'Localising the weakness to the same side as the brain lesion — the tracts have already crossed.',
      'Placing the primary motor cortex behind the central sulcus — that is the sensory strip; motor is anterior.',
      'Thinking the circle of Willis prevents all strokes — it "reduces the probability" of a circulation interruption, it does not abolish it.',
    ],
    skills: [
      'Two questions localise any stroke: which side of the body (opposite hemisphere) and which functions (which artery). Face + arm + leg + speech on one side is a middle cerebral artery stroke of the other hemisphere.',
      'Anterior vs posterior circulation is the branch point: carotid -> anterior/middle cerebral for the hemispheres; vertebral -> basilar -> posterior cerebral for the brainstem and occipital lobe. Brainstem signs (or a fatal course) point posterior.',
      'The "Mr LAW" case is the same three facts every year: left MCA, right-body weakness (decussation), vocalisation trouble (Broca’s, frontal lobe).',
    ],
    selfCheck: 'From a blank page: where the sensory and motor tracts cross; why a left-brain stroke weakens the right body; the MCA territory and the deficits it produces on each side; the vertebral-to-basilar-to-posterior-cerebral route; what the circle of Willis is for.',
    visuals: [
      { fig: 'arteriesOfBrain' },
      { model: { layer: 'circulatory', meshes: ['Anterior cerebral artery', 'Anterior communicating artery', 'Posterior communicating artery', 'Posterior cerebral artery', 'Basilar artery', 'Vertebral artery'], label: 'The cerebral arterial circle', caption: 'The circle of Willis on the model: anterior and posterior cerebral arteries joined by the anterior and posterior communicating arteries, fed from the front by the internal carotids and from behind by the vertebral–basilar system.' } },
      { gen: true },
    ],
    sourceRefs: [
      { ref: 'hss.mooc3', location: 'p2 "3 neurons: 1st, 2nd, 3rd neuron" — "in 2nd neuron" — "left cerebral cortex: sensory information of right body"' },
      { ref: 'hss.mooc3', location: 'p4 "Upper Motor Neuron: in the cortex" — "Lower Motor Neuron: in the brainstem or spinal cord" — "damages the motor centers of one side of the brain will cause loss of function of the opposite side of"' },
      { ref: 'hss.mooc3', location: 'p24 "Striate cortex (IV layer) of occipital lobe" — "9 pathways form cortex to thalamus (filtering data)"' },
      { ref: 'hss.mooc2', location: 'p4 "Anterior cerebral artery" — "frontal and parietal lobes" — "Middle cerebral artery" — "lateral surfaces of the cerebral hemispheres" — "ascend within the transverse foramina" — "enter the cranium" — "at the foramen magnum" — "2 vertebral arteries fuse to form basilar artery"' },
      { ref: 'hss.mooc2', location: 'p5 "encircles the infundibulum of the pituitary gland" — "reduces probability of interruption of circulation" — "Left middle cerebral artery" — "Aphasia, right body side sensory and motor paralysis" — "Right middle cerebral artery" — "Lower brain stem" — "Commonly fatal"' },
      { ref: 'hss.2.3', location: 'p7 "Precentral gyrus (primary motor)" — "it controls the muscles & joints movements of the contralateral side"; p9 "Decussation" — "of pyramids"' },
      { ref: 'hss.fib5yr', location: 'p13 "occlusion (blockage) in his left middle cerebral" — "He cannot move the right side of his body" — "the primary motor cortex" — "located immediately anterior to the central" — "descending tracts decussate at the pyramids of the medulla" — "difficulty in vocalization suggesting that the Broca" — "frontal lobe also has damage."' },
      { ref: 'hss.fib5yr', location: 'p15 "Two vertebral arteries united to form the basilar artery which ascends along the" — "supplies the posterior part of the" — "cerebral arterial circle."' },
    ],
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
