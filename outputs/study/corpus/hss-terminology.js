/*
 * HSS2011 Human Anatomy — anatomical terminology: position, planes, movement
 * terms, regions and cavities.
 *
 * Split out of study-data.js in phase 2026-09-01. outputs/study-data.js is
 * the barrel every importer still uses; nothing imports this file directly
 * except its siblings.
 */

/* ------------------------------------------------------------------ *
 * Study items — HSS2011 Human Anatomy
 * ------------------------------------------------------------------ */

export const HSS_TERMINOLOGY = [
  {
    id: 'hss2011-terminology-anatomical-position',
    subject: 'HSS2011', unit: 'hss.term', type: 'definition',
    title: 'Anatomical position',
    tags: ['terminology', 'foundation'],
    practice: [
      {
        type: 'mcq', prompt: 'In the anatomical position, how are the palms of the hands oriented?',
        options: ['Facing backward against the thighs', 'Facing forward (anteriorly)', 'Facing medially toward the trunk', 'Facing downward toward the floor'],
        answer: 1,
        explanation: 'The anatomical position requires the upper limbs to be held out to each side with the palms of the hands facing forward (supinated).',
        src: { ref: 'hss.orientation', location: 'p1 "palms of the hands face forward"' },
      },
      {
        type: 'cloze', prompt: 'A clinical scar described as lying in the anterior carpal region is located on the ______ side of the wrist.',
        accept: ['palm', 'palmar', 'front'],
        explanation: 'Because the palms face forward in the anatomical position, the anterior carpal region corresponds to the palmar surface of the wrist.',
        src: { ref: 'hss.orientation', location: 'p1 "scar in the “anterior (front) carpal (wrist) region” would be present on the palm side"' },
      },
      {
        type: 'mcq', prompt: 'Why is full supination of the forearms (palms forward) required in the standard anatomical position?',
        options: [
          'To relax the biceps brachii muscle completely',
          'To keep the radius and ulna parallel rather than crossed',
          'To make the thumb medial to the little finger',
          'To lock the humeroulnar joint in full flexion',
        ],
        answer: 1,
        explanation: 'In the supinated position with palms forward, the radius and ulna lie parallel. Pronation causes the radius to cross over the ulna.',
        src: { ref: 'hss.move.2026', location: 'p1 "Anatomical Position"' },
      },
      {
        type: 'cloze', prompt: 'A patient lying horizontally on their back with the face directed upward is in the ______ position.',
        accept: ['supine'],
        explanation: 'Supine describes lying flat on the back facing upward, in contrast to prone (lying face down).',
        src: { ref: 'hss.orientation', location: 'p1 "Anatomical Position"' },
      },
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'A radiographer notes a radio-opaque foreign body "anterior to the right patella" in a patient scanned in the prone position. Is the foreign body located toward the scanning table or toward the room ceiling?',
        model: 'Toward the scanning table. Directional terms are anchored to the body in the anatomical position, not to room coordinates or patient posture on the bed. In the anatomical position, the patella is on the anterior surface of the lower limb; when prone, the anterior surface faces down toward the couch.',
        rubric: [
          'Identifies the anatomical position as the fixed invariant reference',
          'Concludes that anterior corresponds to the front of the knee facing the table in a prone patient',
        ],
      },
    ],
    commonMistakes: [
      'Assuming the anatomical position depicts relaxed standing with palms resting against the outer thighs.',
      'Re-orienting directional terms based on whether the patient is sitting, supine, or prone in the radiology suite.',
      'Confusing supine (lying on the back facing up) with prone (lying face down).',
    ],
    sourceRefs: [
      { ref: 'hss.w1.2026', location: 'p14 "The terminology of"' },
      { ref: 'hss.move.2026', location: 'p1 "Anatomical Position"' },
      { ref: 'hss.orientation', location: 'p1 "standing upright, with the feet at shoulder width"' },
      { ref: 'hss.orientation', location: 'p1 "palms of the hands face forward"' },
      { ref: 'hss.orientation', location: 'p1 "scar in the “anterior (front) carpal (wrist) region”"' },
    ],
  },
  {
    id: 'hss2011-terminology-regional-systemic',
    subject: 'HSS2011', unit: 'hss.term', type: 'comparison',
    title: 'Regional vs systemic anatomy',
    tags: ['terminology', 'foundation'],
    practice: [
      {
        type: 'mcq', prompt: 'Studying all the skeletal muscles of the body as a single collective system is an example of which anatomical approach?',
        options: ['Regional anatomy', 'Systemic anatomy', 'Surface anatomy', 'Pathological anatomy'],
        answer: 1,
        explanation: 'Systemic anatomy considers all structures making up a discrete body system throughout the entire body.',
        src: { ref: 'hss.orientation', location: 'p1 "systemic anatomy is the study of the structures"' },
      },
      {
        type: 'typed', prompt: 'Which anatomical approach studies the spatial interrelationships of all structures within a specific body territory such as the abdomen?',
        accept: ['regional', 'regional anatomy'],
        explanation: 'Regional anatomy examines the interrelationships of all structures located within a specific body region.',
        src: { ref: 'hss.orientation', location: 'p1 "Regional anatomy is the study of the interrelationships"' },
      },
      {
        type: 'matching', prompt: 'Match each level of structural organization to its description.',
        pairs: [
          ['Tissue level', 'Groups of similar cells and their extracellular matrix working together'],
          ['Organ level', 'Two or more different tissue types combining to form a distinct structure'],
          ['System level', 'Related organs collaborating to accomplish a shared physiological function'],
          ['Chemical level', 'Atoms combining into molecules such as water, lipids, and proteins'],
        ],
        explanation: 'The six levels of structural organization progress from atoms and molecules up to the complete organism.',
        src: { ref: 'hss.w1.2026', location: 'p8 "Organization of human body"' },
      },
      {
        type: 'mcq', prompt: 'Why does the HSS2011 curriculum present "Regional Anatomy of the Thorax" after the cardiovascular and respiratory lectures?',
        options: [
          'Because the regional lecture is an optional revision session',
          'To assemble previously learned systemic components into their real 3D spatial relationships within the thoracic cage',
          'Because regional anatomy replaces systemic anatomy completely',
          'To teach microscopic histology that could not be covered earlier',
        ],
        answer: 1,
        explanation: 'Systemic lectures teach the functional parts; regional lectures integrate them to establish spatial awareness of adjacent structures in a cavity.',
        src: { ref: 'hss.w1.2026', location: 'p1 "With systemic and regional approaches, students will demonstrate basic understanding"' },
      },
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'In plain film chest radiography, an enlarged cardiac silhouette can compress the left main bronchus. Explain how combining systemic knowledge with regional anatomy enables a radiographer to understand this finding.',
        model: 'Systemic knowledge teaches the separate functions and structures of the heart and tracheobronchial tree. Regional anatomy of the mediastinum reveals their exact physical proximity: the left main bronchus passes directly posterior and superior to the left atrium and pulmonary trunk, so left atrial enlargement mechanically elevates and narrows the airway.',
        rubric: [
          'Distinguishes systemic functional roles from regional physical proximity',
          'Identifies the spatial relationship between the heart and left bronchus in the mediastinum',
        ],
      },
    ],
    commonMistakes: [
      'Assuming regional anatomy is merely redundant revision of systemic anatomy rather than a new layer of spatial relationships.',
      'Confusing the tissue level (e.g. cardiac muscle tissue) with the organ level (the whole heart containing muscle, epithelial, and connective tissues).',
    ],
    sourceRefs: [
      { ref: 'hss.w1.2026', location: 'p2 "With systemic and regional approaches, students will demonstrate basic understanding"' },
      { ref: 'hss.w1.2026', location: 'p9 "Organization of human body"' },
      { ref: 'hss.orientation', location: 'p1 "two general approaches to the study of the body’s structures: regional and systemic"' },
      { ref: 'hss.orientation', location: 'p1 "Regional anatomy is the study of the interrelationships"' },
      { ref: 'hss.orientation', location: 'p1 "systemic anatomy is the study of the structures"' },
    ],
  },
  {
    id: 'hss2011-terminology-directional-pairs',
    subject: 'HSS2011', unit: 'hss.term', type: 'matching',
    title: 'The ten directional terms',
    tags: ['terminology', 'high-yield'],
    practice: [
      {
        type: 'mcq', prompt: 'The sternal region is __________ to the scapular region.',
        options: ['Superior', 'Lateral', 'Anterior', 'Proximal'],
        answer: 2,
        explanation: 'Model answer C. The sternum lies on the anterior chest wall while the scapulae lie on the posterior back. Proximal and distal only apply along limbs.',
        src: { ref: 'hss.revans', location: 'p1 Module 0, MCQ 1' },
      },
      {
        type: 'mcq', prompt: 'In the anatomical position, the thumb is __________ to the index finger.',
        options: ['Superior', 'Lateral', 'Anterior', 'Proximal'],
        answer: 1,
        explanation: 'Model answer B. In the anatomical position the palms face forward, placing the radial side and thumb on the outer (lateral) aspect of the hand.',
        src: { ref: 'hss.revans', location: 'p1 Module 0, MCQ 2' },
      },
      {
        type: 'matching', prompt: 'Match each directional term to its verified textbook example.',
        pairs: [
          ['Proximal', 'The brachium is ___ to the antebrachium'],
          ['Distal', 'The crus is ___ to the femur'],
          ['Deep', 'The brain is ___ to the skull'],
          ['Posterior', 'The popliteus is ___ to the patella'],
        ],
        explanation: 'These examples are taken directly from the course anatomical orientation guide.',
        src: { ref: 'hss.orientation', location: 'p1 "The brachium is proximal to the antebrachium."' },
      },
      {
        type: 'cloze', prompt: 'The term that describes a structure located closer to the surface of the body is ______.',
        accept: ['superficial'],
        explanation: 'Superficial indicates a position closer to the external surface (e.g. skin is superficial to skeletal muscle).',
        src: { ref: 'hss.orientation', location: 'p1 "The skin is superficial to the bones."' },
      },
      {
        type: 'cloze', prompt: 'In an appendicular limb, a position farther from the point of attachment to the trunk is described as ______.',
        accept: ['distal'],
        explanation: 'Distal describes a position farther from the origin of a limb or point of attachment to the trunk.',
        src: { ref: 'hss.w1.2026', location: 'p14 "Proximal VS Distal"' },
      },
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'A clinical radiology report describes an osteosarcoma in the "proximal humerus". Which joint is closest to the tumor—the shoulder or the elbow—and what rule dictates this?',
        model: 'The shoulder joint. The humerus is an upper limb bone attached to the trunk at the glenohumeral (shoulder) joint. By definition, proximal means closer to the point of attachment to the trunk, so the proximal humerus is the upper end adjacent to the shoulder.',
        rubric: [
          'Identifies the shoulder joint',
          'States the definition of proximal as closer to the point of attachment to the trunk',
        ],
      },
    ],
    commonMistakes: [
      'Applying proximal or distal to describe trunk structures (e.g. calling the thoracic spine proximal to the lumbar spine—the correct terms are superior/inferior).',
      'Forgetting that laterality of the thumb depends entirely on anatomical forearm supination; in a pronated hand the thumb faces medially.',
      'Accidentally selecting the opposite partner term under exam time pressure (e.g. confusing medial with lateral).',
    ],
    sourceRefs: [
      { ref: 'hss.w1.2026', location: 'p14 "Proximal VS Distal"' },
      { ref: 'hss.w1.2026', location: 'p14 "Toward midline VS away from midline"' },
      { ref: 'hss.w1.2026', location: 'p15 "Anterior VS Posterior"' },
      { ref: 'hss.w1.2026', location: 'p15 "Superior VS Inferior"' },
      { ref: 'hss.orientation', location: 'p1 "The toes are anterior to the foot."' },
      { ref: 'hss.orientation', location: 'p1 "The popliteus is posterior to the patella."' },
      { ref: 'hss.orientation', location: 'p1 "The orbits are superior to the oris."' },
      { ref: 'hss.orientation', location: 'p1 "The pelvis is inferior to the abdomen."' },
      { ref: 'hss.orientation', location: 'p1 "The thumb (pollex) is lateral to the digits."' },
      { ref: 'hss.orientation', location: 'p1 "The hallux is the medial toe."' },
      { ref: 'hss.orientation', location: 'p1 "The brachium is proximal to the antebrachium."' },
      { ref: 'hss.orientation', location: 'p1 "The crus is distal to the femur."' },
      { ref: 'hss.orientation', location: 'p1 "The skin is superficial to the bones."' },
      { ref: 'hss.orientation', location: 'p1 "The brain is deep to the skull."' },
      { ref: 'hss.revans', location: 'p1 "1. C 1. B 1. B"' },
    ],
  },
  {
    id: 'hss2011-terminology-planes',
    subject: 'HSS2011', unit: 'hss.term', type: 'definition',
    title: 'Body planes and what each one separates',
    tags: ['terminology', 'high-yield'],
    practice: [
      {
        type: 'matching', prompt: 'Match each body plane to the directional pair it separates.',
        pairs: [
          ['Coronal / frontal plane', 'Anterior vs posterior'],
          ['Transverse / horizontal plane', 'Superior vs inferior'],
          ['Mid-sagittal / median plane', 'Left vs right'],
        ],
        explanation: 'Each standard anatomical plane is defined by the specific pair of directional opposites it creates.',
        src: { ref: 'hss.w1.2026', location: 'p16 "Coronal Plane"' },
      },
      {
        type: 'cloze', prompt: 'The plane that divides the body vertically along the midline into equal right and left halves is the ______ plane.',
        accept: ['mid-sagittal', 'midsagittal', 'median'],
        explanation: 'The midsagittal or median plane passes directly through the midline to create symmetrical halves.',
        src: { ref: 'hss.vocab', location: 'p9 "Mid-sagittal/Median Plane"' },
      },
      {
        type: 'cloze', prompt: 'A cross-sectional image that separates superior structures from inferior structures lies in the ______ plane.',
        accept: ['transverse', 'horizontal', 'axial'],
        explanation: 'The transverse (horizontal/axial) plane separates superior from inferior parts.',
        src: { ref: 'hss.w1.2026', location: 'p16 "Transverse/horizontal plane"' },
      },
      {
        type: 'mcq', prompt: 'Which imaging plane would be selected to best evaluate whether a lung tumor is invading anteriorly into the sternum or posteriorly into the vertebrae?',
        options: ['Transverse plane', 'Coronal plane', 'Sagittal plane', 'Oblique plane'],
        answer: 2,
        explanation: 'A sagittal plane section displays anterior-to-posterior depth and superior-to-inferior height simultaneously, clearly demonstrating relationship to sternum (anterior) and vertebrae (posterior).',
        src: { ref: 'hss.w1.2026', location: 'p16 "Sagittal Plane"' },
      },
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'In reporting a lumbar spine MRI, a radiologist evaluates the intervertebral disc herniating posteriorly into the spinal canal on one view, and lateral nerve root compression on another view. Which orthogonal planes provide these assessments?',
        model: 'Posterior herniation into the spinal canal is assessed on sagittal views (which display anterior-posterior and superior-inferior dimensions). Lateral nerve root exit through the intervertebral foramina and canal caliber are evaluated on axial (transverse) views.',
        rubric: [
          'Names sagittal plane for anterior-posterior disc protrusion',
          'Names axial/transverse plane for cross-sectional canal and nerve root assessment',
        ],
      },
    ],
    commonMistakes: [
      'Confusing coronal and sagittal planes because both are vertical cuts; distinguish them by whether they split front/back (coronal) or left/right (sagittal).',
      'Using the word "sagittal" when strictly meaning "midsagittal"; parasagittal sections also run vertically front-to-back but do not pass down the midline.',
    ],
    sourceRefs: [
      { ref: 'hss.w1.2026', location: 'p16 "Coronal Plane"' },
      { ref: 'hss.w1.2026', location: 'p16 "Sagittal Plane"' },
      { ref: 'hss.w1.2026', location: 'p16 "Transverse/horizontal plane"' },
      { ref: 'hss.vocab', location: 'p5 "Frontal/Coronal Plane"' },
      { ref: 'hss.vocab', location: 'p9 "Mid-sagittal/Median Plane"' },
    ],
  },
  {
    id: 'hss2011-terminology-cavities-regions',
    subject: 'HSS2011', unit: 'hss.term', type: 'definition',
    title: 'Body cavities, regions and quadrants',
    tags: ['terminology', 'high-yield'],
    practice: [
      {
        type: 'typed', prompt: 'Which single anatomical name designates the continuous space comprising the abdominal and pelvic cavities combined?',
        accept: ['abdominopelvic', 'abdominopelvic cavity'],
        explanation: 'The abdominopelvic cavity extends from the diaphragm to the pelvic floor, containing both abdominal and pelvic subdivisions.',
        src: { ref: 'hss.vocab', location: 'p1 "Abdominal Cavity"' },
      },
      {
        type: 'mcq', prompt: 'Which of the following cavities is located directly within the mediastinum of the thoracic cavity?',
        options: ['Peritoneal cavity', 'Pericardial cavity', 'Pleural cavity', 'Pelvic cavity'],
        answer: 1,
        explanation: 'The pericardial cavity encloses the heart within the mediastinum, flanked laterally by the two pleural cavities.',
        src: { ref: 'hss.revans', location: 'p2 "4. Mediastinum"' },
      },
      {
        type: 'cloze', prompt: 'In the nine-region abdominopelvic grid, the region situated directly superior to the umbilical region is the ______ region.',
        accept: ['epigastric'],
        explanation: 'The epigastric region occupies the upper middle position, directly above the central umbilical region.',
        src: { ref: 'hss.vocab', location: 'p5 "Epigastric Region"' },
      },
      {
        type: 'mcq', prompt: 'A patient with suspected acute appendicitis reports severe pain in which abdominal quadrant?',
        options: ['Right Upper Quadrant (RUQ)', 'Left Upper Quadrant (LUQ)', 'Right Lower Quadrant (RLQ)', 'Left Lower Quadrant (LLQ)'],
        answer: 2,
        explanation: 'The cecum and vermiform appendix reside in the Right Lower Quadrant (RLQ), corresponding to the right iliac region.',
        src: { ref: 'hss.w1.2026', location: 'p9 "Organization of human body"' },
      },
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'A physician suspects acute cholecystitis (gallbladder inflammation). State which clinical quadrant and which of the nine anatomical regions you will target during an ultrasound examination of the gallbladder.',
        model: 'Right Upper Quadrant (RUQ) in the four-quadrant system, corresponding to the Right Hypochondriac region (and upper epigastric border) in the nine-region system, tucked immediately inferior to the liver and costal margin.',
        rubric: [
          'Names Right Upper Quadrant (RUQ)',
          'Names Right Hypochondriac region',
        ],
      },
    ],
    commonMistakes: [
      'Confusing the pericardial cavity (around the heart in the chest) with the peritoneal cavity (around abdominal organs).',
      'Thinking the mediastinum is an empty cavity; it is a dense connective tissue partition containing the heart, trachea, esophagus, and great vessels.',
      'Misunderstanding "hypochondriac" as an emotional condition rather than "under the costal cartilage".',
    ],
    sourceRefs: [
      { ref: 'hss.w1.2026', location: 'p9 "Organization of human body"' },
      { ref: 'hss.m0', location: 'p1 "Body Cavity"' },
      { ref: 'hss.vocab', location: 'p1 "Abdominal Cavity"' },
      { ref: 'hss.vocab', location: 'p5 "Epigastric Region"' },
      { ref: 'hss.vocab', location: 'p8 "Left Hypochondriac Region"' },
      { ref: 'hss.vocab', location: 'p11 "Pelvic Cavity"' },
      { ref: 'hss.vocab', location: 'p11 "Peritoneal Cavity"' },
      { ref: 'hss.vocab', location: 'p13 "Right Hypochondriac Region"' },
      { ref: 'hss.revans', location: 'p2 "4. Mediastinum"' },
    ],
  },
];

