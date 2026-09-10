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
    lesson: {
      explanation: 'Anatomists and health care professionals standardise the way they view and describe the human body in exactly the same way geographers orient maps with north at the top. The anatomical position serves as the universal reference frame: an individual standing upright and erect, facing forward with eyes open, feet flat on the floor at shoulder width and parallel, toes pointing forward, and upper limbs held slightly away from the trunk at each side with the palms of the hands facing forward (supinated) and thumbs pointing away from the body. Every directional term (anterior, posterior, superior, inferior, medial, lateral, proximal, distal) is applied strictly as if the patient were standing in this posture, regardless of how they are positioned in clinical reality—whether lying supine (face up), prone (face down), or recumbent on a radiography imaging couch. The critical functional detail is forearm supination: when the palms face forward, the two forearm bones—the lateral radius and medial ulna—lie parallel to each other rather than crossed. If the palms were allowed to face backward as in a relaxed stance (pronation), the radius would cross anteriorly over the ulna, which would invert the spatial relationship of the thumb and wrist. Thus, an injury or surgical scar described as being in the "anterior carpal region" is unambiguously located on the palmar surface of the wrist, even if the patient is imaged lying prone with their hands behind their back.',
      plain: 'The anatomical position is the universal standard map for the body. You stand upright, facing forward, feet parallel and flat, arms at the sides with palms turned forward and thumbs pointing out. Every directional term—front, back, left, right—is locked to this standard stance, no matter what position the patient is actually in on the hospital bed or scanning table. Palms facing forward is the crucial rule: it keeps the radius and ulna side by side without crossing, ensuring that the thumb is always defined as lateral.',
      keyFacts: [
        'Universal reference stance: body upright/erect, head and eyes facing forward.',
        'Lower limbs: feet placed at shoulder width, parallel, flat on the floor with toes pointing anteriorly.',
        'Upper limbs: hanging at the sides, slightly abducted from the trunk.',
        'Forearm and hands: palms facing forward (full supination), fingers extended, thumbs pointing laterally.',
        'Forearm bones (radius laterally, ulna medially) remain parallel only when the palms face forward.',
        'Pronation causes the distal radius to cross anterior to the ulna, distorting reference laterality.',
        'Directional terms are permanently anchored to this stance regardless of real-world patient posture.',
        'A scar in the "anterior carpal region" is located on the palm side of the wrist even in a prone patient.',
        'Supine describes a patient lying horizontally on the back facing up; prone describes lying face down.',
      ],
      examples: [
        'A trauma patient lying face down (prone) on a CT table has a laceration on the anterior surface of the forearm; this means the surface facing the table, because anterior is determined by the anatomical position, not room gravity.',
      ],
    },
    memory: {
      visualCue: 'Picture passing through an airport security full-body scanner: standing upright, feet flat, arms slightly out, showing your palms flat to the forward scanner.',
      comparison: 'Standing at ease has the palms turned inward or backward (pronation), which crosses the radius over the ulna. Anatomical position forces the palms forward to uncross the forearm bones.',
      teachBack: 'Explain why the anatomical position is essential in clinical notes: without a single fixed stance, "above the wrist" could mean the forearm or the hand depending on whether the arm is raised.',
    },
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
    skills: [
      'Palms forward is not an aesthetic convention—it is the structural pivot of upper limb laterality: uncrossed forearm bones mean the radius is lateral and ulna is medial.',
      'When reading clinical imaging reports, mentally translate any patient posture back to the standing anatomical position before applying directional vectors.',
    ],
    selfCheck: 'From memory, describe the five posture requirements of the anatomical position, explain the mechanical reason for forearm supination, and deduce whether a prone patient’s anterior knee faces the couch or ceiling.',
    visuals: [
      { fig: 'directionalTerms', focus: ["Superior","Inferior","Anterior","Posterior","Medial","Lateral"] },
      { gen: true },
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
    lesson: {
      explanation: 'In the scientific study of the human body, anatomists employ two complementary organizational paradigms: regional anatomy and systemic anatomy. Regional anatomy studies the spatial arrangement and mutual relationships of all anatomical structures within a specific topographical division of the body, such as the head and neck, thoracic cavity, abdomen, or upper limb. This approach emphasizes how skeletal muscles, peripheral nerves, blood vessels, lymphatics, and visceral organs sit alongside one another within shared fascial compartments and body cavities. It provides the three-dimensional spatial foundation essential for surgical procedures, physical palpation, and the interpretation of cross-sectional radiological imaging (such as CT and MRI scans). In contrast, systemic anatomy studies the structures that compose a discrete, dedicated organ system—that is, a group of coordinated organs that perform a unified physiological function throughout the entire organism. For example, a systemic study of the muscular system examines all skeletal muscles across head, trunk, and limbs; a systemic study of the cardiovascular system follows the heart and vascular circuits everywhere they run. The HSS2011 syllabus deliberately combines both approaches: the course opens with foundational systemic overviews (osteology, arthrology, myology, neuroanatomy, cardiovascular, and respiratory systems) and then consolidates them within regional modules (such as Regional Anatomy of the Thorax, Abdomen, and Pelvis). Furthermore, both approaches operate across the hierarchy of structural organization: from the chemical level (atoms, molecules) to the cellular level, tissue level (epithelial, connective, muscle, nervous), organ level, organ system level (the 11 body systems), and organismal level.',
      plain: 'Regional anatomy and systemic anatomy are two ways of exploring the same human body. Regional anatomy focuses on a single location—like the thorax or the upper limb—and studies everything packed into that space: muscles, nerves, blood vessels, and bones all together. Systemic anatomy follows one complete functional system across the whole body, like tracing every artery in the cardiovascular network. HSS2011 uses both: you learn the systems first so you understand how the parts work, and then study the regions so you know where everything sits in 3D.',
      keyFacts: [
        'Regional anatomy: examines all structures (muscles, nerves, vessels, viscera) within a defined body region.',
        'Regional anatomy emphasizes 3D spatial interrelationships, fascial compartments, and cross-sectional anatomy.',
        'Systemic anatomy: examines the components of a single functional body system throughout the entire body.',
        'Systemic anatomy emphasizes integrated physiological functions across distant anatomical sites.',
        'HSS2011 combines systemic foundations with regional consolidation modules.',
        'Six hierarchical levels of structural organization: chemical → cellular → tissue → organ → organ system → organism.',
        'The eleven human organ systems: integumentary, skeletal, muscular, nervous, endocrine, cardiovascular, lymphatic, respiratory, digestive, urinary, reproductive.',
      ],
      examples: [
        'Module 1.1 and 1.2 examine the respiratory and cardiovascular systems systemically; Module 1.3 Regional Anatomy of the Thorax reassembles both systems inside the thoracic cavity to study their physical spatial relationships.',
      ],
    },
    memory: {
      chunking: 'Region = Location / Neighborhood ("Where am I standing?"). System = Function / Utility Network ("What job is being done across the city?").',
      comparison: 'Regional anatomy is like an architect’s blueprint of a single room showing the plumbing, wiring, and studs; systemic anatomy is like tracing the building’s entire electrical circuit from basement to roof.',
    },
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
    skills: [
      'Use systemic knowledge to understand physiology and systemic pathology; use regional knowledge to interpret cross-sectional scans (CT/MRI) and predict local mass effects.',
    ],
    selfCheck: 'Define regional and systemic anatomy, list the 6 levels of structural hierarchy, and describe how the two approaches complement each other in radiological diagnosis.',
    visuals: [
      { fig: 'levelsOfOrganisation' },
      { gen: true },
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
    lesson: {
      explanation: 'Anatomical directional terms describe the relative positions of body structures along defined spatial axes. To prevent ambiguity in clinical documentation and medical imaging, these terms are organized as five mutually exclusive, opposed pairs, each defined relative to the standardized anatomical position:\n\n1. Anterior (ventral) versus Posterior (dorsal):\nAnterior describes a position at or toward the front surface of the body (e.g., the toes are anterior to the foot; the sternum is anterior to the heart). Posterior describes a position at or toward the back surface of the body (e.g., the popliteus is posterior to the patella; the esophagus is posterior to the trachea). In human bipedal anatomy, ventral corresponds to anterior and dorsal corresponds to posterior.\n\n2. Superior (cranial / cephalic) versus Inferior (caudal):\nSuperior describes a position above or higher than another structure along the vertical axis of the body proper (e.g., the orbits are superior to the oris; the lungs are superior to the liver). Inferior describes a position below or lower than another structure along the vertical axis, toward the tail/feet (e.g., the pelvis is inferior to the abdomen; the stomach is inferior to the diaphragm).\n\n3. Medial versus Lateral:\nMedial describes a position toward the vertical longitudinal midline of the body (e.g., the hallux is the medial toe; the ulna is medial to the radius). Lateral describes a position away from the midline, toward the outer sides of the body (e.g., the thumb / pollex is lateral to the digits; the lungs are lateral to the mediastinum). Note that the thumb is lateral only because the anatomical position specifies supinated palms.\n\n4. Proximal versus Distal:\nThese terms apply strictly within the appendicular skeleton (the limbs) to describe distances relative to the limb’s point of origin or attachment to the trunk. Proximal describes a position closer to the attachment point (e.g., the brachium is proximal to the antebrachium; the femur is proximal to the tibia). Distal describes a position farther from the attachment point (e.g., the crus is distal to the femur; the wrist is distal to the elbow). Proximal and distal must never be used to describe the relationship between two structures on the trunk (e.g. the relationship between the sternum and scapula is anterior/posterior, not proximal/distal).\n\n5. Superficial versus Deep:\nSuperficial describes a position closer to the external surface of the body (e.g., the skin is superficial to the skeletal muscles; the rib cage is superficial to the lungs). Deep describes a position farther internal from the surface (e.g., the brain is deep to the cranium; the bone marrow is deep to the periosteum).',
      plain: 'Directional terms are precision tools that work in five opposite pairs. Anterior/posterior tells front from back; superior/inferior tells top from bottom; medial/lateral tells midline from outer side. Proximal and distal are reserved strictly for the arms and legs, measuring how close something is to where the limb connects to the torso (proximal is closer to the shoulder or hip; distal is further down toward the fingers or toes). Superficial and deep tell surface from deep interior.',
      keyFacts: [
        'Anterior (ventral) = toward the front; posterior (dorsal) = toward the back.',
        'Superior (cranial) = above or toward the head; inferior (caudal) = below or toward the tail/feet.',
        'Medial = toward the vertical midline; lateral = away from the midline toward the side.',
        'Proximal = closer to the limb attachment to the trunk; distal = farther from the limb attachment.',
        'Proximal and distal are strictly appendicular terms; they cannot be applied between trunk structures.',
        'Superficial = nearer to the external body surface; deep = farther internal from the surface.',
        'The thumb (pollex) is lateral to the other digits because the palms face forward in anatomical position.',
        'The sternum is anterior to the scapula (not medial, proximal, or superior).',
        'The popliteus muscle is posterior to the patella; the orbits are superior to the mouth (oris).',
      ],
      examples: [
        'A fracture of the "distal radius" is near the wrist, because the wrist is further from the shoulder attachment than the elbow is.',
        'The sternum is anterior to the thoracic vertebrae; calling it "proximal" is invalid because both are axial trunk structures.',
      ],
    },
    memory: {
      firstLetter: 'Five pairs along five axes: Front/Back (Anterior/Posterior), Up/Down (Superior/Inferior), In/Out (Medial/Lateral), Near/Far (Proximal/Distal), Surface/Core (Superficial/Deep).',
      chunking: 'Always learn them in opposed pairs. Half of exam mistakes come from selecting the correct axis but the opposite partner.',
      wordOrigin: 'Proximal shares its Latin root with "proximity" (closeness to the trunk). Distal shares its root with "distance" (far from the trunk).',
    },
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
    skills: [
      'Rule out proximal/distal immediately if the two structures being compared both lie on the head, neck, or torso.',
      'Anchor forearm and hand laterality to the radius (lateral) and ulna (medial) in the supinated anatomical position.',
    ],
    selfCheck: 'List all five pairs of directional terms from memory, state the rule governing proximal vs distal, and explain why the thumb is lateral while the great toe is medial.',
    visuals: [
      { fig: 'directionalTerms' },
      { gen: true },
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
    lesson: {
      explanation: 'To visualize, section, and describe three-dimensional anatomical structures, anatomists and radiologists slice the human body along three standardized imaginary geometric planes that intersect at right angles to each other. Each orthogonal plane is directly coupled to one specific pair of directional terms:\n\n1. Frontal (Coronal) Plane:\nA vertical plane oriented longitudinally from side to side, perpendicular to the sagittal plane. It divides the body into anterior (front) and posterior (back) portions. In medical imaging, coronal reformations display front-to-back relationships (e.g. showing both kidneys alongside the inferior vena cava and abdominal aorta). The term "coronal" derives from the coronal suture of the cranium, which runs along this exact plane between the frontal bone and parietal bones.\n\n2. Sagittal Plane:\nA vertical plane oriented longitudinally from front to back, dividing the body into right and left portions. When the plane passes exactly down the anatomical midline, dividing the body into equal, symmetrical right and left halves, it is designated the midsagittal (or median) plane. When a vertical plane runs parallel to the midline but off-center, dividing the body into unequal right and left parts, it is termed a parasagittal plane. In radiology, sagittal scans are essential for viewing the curvature of the vertebral column, spinal cord, and brainstem.\n\n3. Transverse (Horizontal / Axial) Plane:\nA horizontal plane running perpendicular to both the sagittal and coronal planes, dividing the body into superior (upper) and inferior (lower) portions. In diagnostic radiography, CT and MRI cross-sections are routinely acquired or viewed in this transverse (axial) orientation, looking from the patient\'s feet upward (so the patient\'s right side is on the viewer\'s left).\n\n4. Oblique Plane:\nA cut taken at an angle intermediate between horizontal and vertical planes, frequently used in echocardiography and specialized musculoskeletal imaging to align with an organ’s long axis.',
      plain: 'There are three main ways to slice the body, and each slice separates one specific pair of directions. A coronal (frontal) cut slices ear-to-ear, splitting front from back (anterior and posterior). A sagittal cut slices front-to-back along the midline, splitting left from right; if it is dead-center, it is called midsagittal or median. A transverse (horizontal or axial) cut slices across the waist, splitting top from bottom (superior and inferior). Standard CT and MRI scans are based on these exact three planes.',
      keyFacts: [
        'Coronal (frontal) plane: vertical cut that separates the body into anterior and posterior parts.',
        'Midsagittal (median) plane: vertical cut along the midline that separates the body into equal left and right halves.',
        'Parasagittal plane: vertical cut parallel to the midline dividing the body into unequal left and right parts.',
        'Transverse (horizontal / axial) plane: horizontal cut that separates the body into superior and inferior parts.',
        'Standard CT and MRI cross-sectional images are acquired in or reformatted to these three orthogonal planes.',
        'Radiological viewing convention: axial slices are viewed from the patient’s feet looking upward (patient right is on viewer left).',
        'Dual nomenclature in official glossaries: Frontal = Coronal; Median = Mid-sagittal; Horizontal = Transverse.',
      ],
      examples: [
        'A brain MRI slice displaying both cerebral hemispheres, the corpus callosum along the midline, and the brainstem is a midsagittal view.',
        'An abdominal CT slice showing the liver on the right and spleen on the left at the same level is an axial (transverse) section.',
      ],
    },
    memory: {
      visualCue: 'Coronal = Crown (tiara) sitting across your head from ear to ear, slicing front from back. Sagittal = Arrow (sagitta) shot straight through your nose and out the back of your head, splitting left from right.',
      chunking: 'Three planes, three splits: Coronal → Front/Back; Transverse → Top/Bottom; Sagittal → Left/Right.',
      wordOrigin: 'Sagittal comes from Latin "sagitta" meaning arrow; coronal comes from Latin "corona" meaning crown.',
    },
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
    skills: [
      'Identify the plane by looking at the margins of the section: if you see left and right together with superior and inferior, it is coronal; if you see anterior and posterior together with superior and inferior, it is sagittal; if you see anterior and posterior together with left and right, it is transverse/axial.',
    ],
    selfCheck: 'From memory, state the three orthogonal planes of the body, give both accepted technical names for each, and identify which plane is equivalent to a conventional axial CT slice.',
    visuals: [
      { fig: 'bodyPlanes' },
      { gen: true },
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
    lesson: {
      explanation: 'The internal architecture of the human body is partitioned into enclosed spaces called body cavities that cushion, protect, and support internal viscera while allowing them to change size and shape without disrupting neighbouring tissues. Anatomists divide the body into two principal cavities: the dorsal body cavity and the ventral body cavity.\n\n1. Dorsal Body Cavity:\nLocated posteriorly, continuous, and lined by three protective connective tissue membranes called the meninges and cushioned by cerebrospinal fluid (CSF). It comprises:\n- Cranial cavity: enclosed by the cranium of the skull, housing the brain.\n- Vertebral (spinal) canal: formed by the aligned vertebral foramina of the vertebral column, enclosing the spinal cord.\n\n2. Ventral Body Cavity:\nLocated anteriorly and subdivided by the muscular diaphragm into two primary compartments:\n- Thoracic Cavity (superior to diaphragm): bounded by the ribs and chest musculature. It contains three internal subdivisions:\n  a) Two Pleural Cavities: lateral spaces, each enclosing one lung and lined by visceral and parietal pleura.\n  b) Mediastinum: central mass of connective tissue separating the two pleural cavities, containing the trachea, esophagus, thymus, thoracic duct, and great vessels.\n  c) Pericardial Cavity: nested within the inferior mediastinum, surrounding the heart and lined by visceral and parietal pericardium.\n- Abdominopelvic Cavity (inferior to diaphragm): bounded by abdominal wall muscles, vertebrae, and the pelvis. It is conventionally divided into:\n  a) Abdominal Cavity: superior division containing the stomach, liver, gallbladder, spleen, pancreas, small intestine, and most of the large intestine, enclosed within the peritoneal cavity.\n  b) Pelvic Cavity: inferior division enclosed by the bony pelvis, containing the urinary bladder, terminal sigmoid colon, rectum, and internal reproductive organs.\n\n3. Surface Grids of the Abdomen:\nTo describe the clinical location of abdominal pain, palpable masses, or surgical findings, two standard grid systems are used:\n- Four Quadrants: created by the intersection of the vertical median plane and the horizontal transumbilical plane at the umbilicus: Right Upper Quadrant (RUQ), Left Upper Quadrant (LUQ), Right Lower Quadrant (RLQ), and Left Lower Quadrant (LLQ).\n- Nine Abdominopelvic Regions: created by four planes—two vertical midclavicular lines, one superior horizontal subcostal plane (below 10th costal cartilage), and one inferior horizontal transtubercular plane (through iliac tubercles). The resulting 3x3 grid from superior to inferior comprises:\n  - Top row: Right Hypochondriac, Epigastric, Left Hypochondriac.\n  - Middle row: Right Lumbar (lateral), Umbilical, Left Lumbar (lateral).\n  - Bottom row: Right Inguinal (iliac), Hypogastric (pubic), Left Inguinal (iliac).',
      plain: 'The body houses its organs in sealed internal rooms called cavities. In the back is the dorsal cavity (brain and spinal cord). In the front is the ventral cavity, split by the diaphragm into the thoracic cavity (chest: heart in its pericardial sac, lungs in their pleural sacs, and the mediastinum between them) and the abdominopelvic cavity (abdomen and pelvis). On the surface of the abdomen, doctors describe locations using either four quadrants (meeting at the navel) or a more precise nine-region grid.',
      keyFacts: [
        'Dorsal body cavity = cranial cavity (brain) + vertebral canal (spinal cord); lined by meninges.',
        'Ventral body cavity is partitioned by the muscular diaphragm into thoracic and abdominopelvic cavities.',
        'Thoracic cavity contains two pleural cavities, one pericardial cavity, and the central mediastinum.',
        'Mediastinum is the central tissue partition between the two pleural cavities; it houses the pericardial cavity.',
        'Abdominopelvic cavity contains the abdominal cavity (digestive organs) and pelvic cavity (bladder, rectum, reproductive viscera).',
        'Serous membranes (pleura, pericardium, peritoneum) have an inner visceral layer on the organ and an outer parietal layer lining the wall.',
        'Four clinical quadrants: RUQ, LUQ, RLQ, LLQ intersect at the umbilicus.',
        'Nine anatomical regions: right/left hypochondriac, epigastric; right/left lumbar, umbilical; right/left inguinal, hypogastric.',
        'The transtubercular plane forms the lower boundary of the nine-region grid, passing through the iliac tubercles.',
        'Hypochondriac literally translates as "below the cartilage" (under the costal cartilages of the rib cage).',
      ],
      examples: [
        'Appendicitis presents as acute pain and tenderness in the right lower quadrant (RLQ), corresponding precisely to the right inguinal (iliac) region.',
        'The gallbladder lies in the right hypochondriac region of the nine-region grid, which translates to the right upper quadrant (RUQ).',
      ],
    },
    memory: {
      chunking: 'Ventral splits at the diaphragm: Thoracic above, Abdominopelvic below. Thoracic holds 2 Pleural + 1 Pericardial inside the Mediastinum.',
      location: 'Nine-box grid: middle column runs down from Epigastric (above stomach) → Umbilical (navel) → Hypogastric (below stomach). Flanks are Hypochondriac (under ribs) → Lumbar (loins) → Inguinal (groin).',
      wordOrigin: 'Hypo- (under) + chondros (cartilage) = Hypochondriac, because it sits tucked under the costal cartilages of the rib cage.',
    },
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
    skills: [
      'Use the four-quadrant system for rapid bedside triage and emergency localization; use the nine-region system for precise organ-specific localization and surgical planning.',
      'Identify serous cavities by their two layers: visceral (adherent to organ) and parietal (lining wall), separated by lubricating serous fluid.',
    ],
    selfCheck: 'From a blank sheet: diagram the dorsal and ventral cavities, sketch the 3x3 nine-region abdominopelvic grid with all 9 labels and bounding planes, and map the 4 clinical quadrants.',
    visuals: [
      { fig: 'abdominalQuadrantsRegions' },
      { fig: 'bodyCavities' },
      { gen: true },
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

