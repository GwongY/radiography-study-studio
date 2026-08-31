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
      explanation: 'Anatomists standardise how the body is viewed, the way a map is always drawn with north at the top. The anatomical position is the body standing upright, feet at shoulder width and parallel, toes forward, upper limbs held out to each side with the palms facing forward. Every directional term is used as if the body were in this position, whatever position it is actually in.',
      keyFacts: [
        'Upright stance, feet shoulder width apart and parallel, toes pointing forward.',
        'Upper limbs out to each side, palms facing forward.',
        'Terms are applied as if the body were in this position regardless of its real orientation.',
        'A scar in the "anterior carpal region" is therefore on the palm side of the wrist.',
      ],
      prerequisites: [],
      examples: ['A patient lying face down is still described using anterior and posterior as defined in the anatomical position.'],
    },
    memory: {
      visualCue: 'Picture a person standing at an ID checkpoint: feet planted, arms slightly out, palms shown to the camera. That palms-forward detail is the whole trick.',
      comparison: 'Palms forward is what separates anatomical position from standing at ease. Palms-back would swap radius and ulna in your mental picture.',
      teachBack: 'Say out loud why the standard position exists at all — it removes ambiguity so "above the wrist" cannot mean two different places.',
    },
    practice: [
      { type: 'mcq', prompt: 'In the anatomical position, where do the palms face?', options: ['Backward, against the thighs', 'Forward', 'Medially, facing each other', 'Downward'], answer: 1,
        explanation: 'The source describes the upper limbs held out to each side with the palms of the hands facing forward. This is the detail people most often get wrong.' },
      { type: 'cloze', prompt: 'A scar described as being in the anterior carpal region is on the ______ side of the wrist.', accept: ['palm', 'palmar', 'anterior', 'front'],
        explanation: 'Because the palms face forward in the anatomical position, anterior at the wrist means the palm side.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A radiographer writes "lesion anterior to the elbow" for a patient who was lying prone during the scan. Does anterior mean toward the ceiling or toward the couch?',
        model: 'Toward the couch. Directional terms are always applied as if the body were in the anatomical position, not in the position the patient happened to be in.',
        rubric: ['Names the anatomical position as the fixed reference', 'Concludes anterior is the front of the body, i.e. toward the couch when prone'] },
    ],
    commonMistakes: [
      'Drawing the anatomical position with palms facing backward — that is standing at ease, and it flips your mental map of the forearm bones.',
      'Re-defining anterior and posterior to match how the patient is actually lying.',
    ],
    skills: [
      'Stand up and take the position yourself, deliberately putting the palms forward — then check every detail against the key facts list, because palms forward is the one detail that separates this from standing at ease.',
      'Practise the fixed-reference habit: for any description of a patient in any position, say the directional term and then state "as if anatomical position" before you commit to an answer.',
    ],
    selfCheck: 'From a blank page: the full stance in the source’s own detail, and the reasoning for why an anterior carpal scar is on the palm side of the wrist even in a prone patient.',
    sourceRefs: [{ ref: 'hss.orientation', location: 'Section "Anatomical Position"' }, { ref: 'hss.m0.1718', location: 'L1 p4 "The anatomical position"' }],
  },
  {
    id: 'hss2011-terminology-regional-systemic',
    subject: 'HSS2011', unit: 'hss.term', type: 'comparison',
    title: 'Regional vs systemic anatomy',
    tags: ['terminology', 'foundation'],
    lesson: {
      explanation: 'There are two general approaches to studying the body. Regional anatomy studies the interrelationships of all the structures in one body region, such as the abdomen, so you can see how muscles, nerves and vessels work together there. Systemic anatomy studies the structures making up one discrete body system that shares a function, such as all the skeletal muscles. HSS2011 uses both approaches, which is why the modules mix system lectures with "regional anatomy of" lectures.',
      plain: 'Two ways to study the body. Regional anatomy looks at one whole region — the abdomen, say — and how all the structures there work together. Systemic anatomy follows one system that shares a job — all the skeletal muscles, say — wherever it runs through the body. HSS2011 uses both, which is why the module list mixes system lectures with “regional anatomy of” lectures.',
      keyFacts: [
        'Regional anatomy = one region, all systems in it.',
        'Systemic anatomy = one system, wherever it goes in the body.',
        'The subject is taught with a systemic and regional approach together.',
      ],
      prerequisites: ['hss2011-terminology-anatomical-position'],
      examples: ['Module 1.1 and 1.2 are systemic (cardiovascular, respiratory); Module 1.3 Regional Anatomy of the Thorax is regional.'],
    },
    memory: {
      chunking: 'Region = a place. System = a job. Ask "where am I standing?" versus "what job am I following?"',
      comparison: 'Regional anatomy is a street map of one neighbourhood; systemic anatomy is the whole water-pipe network across the city.',
    },
    practice: [
      { type: 'mcq', prompt: 'Studying every skeletal muscle in the body as one group is an example of which approach?', options: ['Regional anatomy', 'Systemic anatomy', 'Surface anatomy', 'Comparative anatomy'], answer: 1,
        explanation: 'A systemic anatomical study of the muscular system would consider all of the skeletal muscles of the body — one system, followed wherever it goes.' },
      { type: 'typed', prompt: 'Which approach studies the interrelationships of all structures within one body region?', accept: ['regional', 'regional anatomy'],
        explanation: 'Regional anatomy studies all structures in a specific region, such as the abdomen, and how they work together.' },
    ],
    application: [
      { type: 'scenario', prompt: 'Module 1.3 is titled "Regional Anatomy of the Thorax" and follows two systemic lectures. What does the module ordering tell you about how you are meant to revise?',
        model: 'You learn the cardiovascular and respiratory systems separately first, then put them back into the thoracic cavity together and study their spatial relationships. Revision should therefore end with relationships between structures, not with lists.',
        rubric: ['Recognises systemic lectures come first', 'States the regional lecture reassembles them in one cavity', 'Mentions spatial relationships'] },
    ],
    commonMistakes: ['Treating the "regional anatomy of" lectures as revision of the system lectures rather than as a new relational layer.'],
    skills: [
      'For any anatomy lecture title, ask "where am I standing?" versus "what job am I following?" — a place means regional, a job means systemic.',
      'Use the HSS2011 module list itself as the practice set: classify Module 1.1, 1.2 and 1.3 by approach, and explain why the regional lecture comes after the systemic ones.',
    ],
    selfCheck: 'From a blank page: both definitions in one sentence each, and what the Module 1 ordering — two systemic lectures then "Regional Anatomy of the Thorax" — tells you about how revision should end.',
    sourceRefs: [{ ref: 'hss.orientation', location: 'Opening section' }, { ref: 'hss.manual1920', location: 'Subject Description Form, Objectives' }],
  },
  {
    id: 'hss2011-terminology-directional-pairs',
    subject: 'HSS2011', unit: 'hss.term', type: 'matching',
    title: 'The ten directional terms',
    tags: ['terminology', 'high-yield'],
    lesson: {
      explanation: 'Ten directional terms carry almost all of the precision in anatomical description. They work in opposed pairs, and each one comes with a worked example in the source. Anterior/ventral is toward the front; posterior/dorsal toward the back; superior/cranial above; inferior/caudal below; lateral toward the side; medial toward the middle; proximal nearer the point of attachment in a limb; distal further from it; superficial closer to the surface; deep further from the surface.',
      keyFacts: [
        'Anterior (ventral) — the toes are anterior to the foot.',
        'Posterior (dorsal) — the popliteus is posterior to the patella.',
        'Superior (cranial) — the orbits are superior to the oris.',
        'Inferior (caudal) — the pelvis is inferior to the abdomen.',
        'Lateral — the thumb (pollex) is lateral to the digits.',
        'Medial — the hallux is the medial toe.',
        'Proximal — the brachium is proximal to the antebrachium.',
        'Distal — the crus is distal to the femur.',
        'Superficial — the skin is superficial to the bones.',
        'Deep — the brain is deep to the skull.',
      ],
      prerequisites: ['hss2011-terminology-anatomical-position'],
      examples: [],
    },
    memory: {
      firstLetter: 'Five pairs, five questions: Front/Back, Up/Down, Side/Middle, Near/Far, Shallow/Deep.',
      chunking: 'Learn them as five opposed pairs, never as ten separate words. Half the exam errors are picking the partner of the right answer.',
      wordOrigin: 'Proximal shares its root with "proximity" — nearness to the attachment. Distal shares its root with "distance".',
      location: 'Proximal and distal only make sense inside a limb, measured from where the limb joins the trunk. If there is no limb, the pair does not apply.',
    },
    practice: [
      { type: 'matching', prompt: 'Match each term to its worked example from the source.',
        pairs: [['Proximal', 'The brachium is ___ to the antebrachium'], ['Lateral', 'The thumb (pollex) is ___ to the digits'], ['Deep', 'The brain is ___ to the skull'], ['Inferior', 'The pelvis is ___ to the abdomen']],
        explanation: 'These are the exact examples given in the anatomical orientation and terminologies handout.' },
      { type: 'mcq', prompt: 'The sternal region is __________ to the scapular region.', options: ['Superior', 'Lateral', 'Anterior', 'Proximal'], answer: 2,
        explanation: 'Model answer C. The sternum is on the front of the chest and the scapula on the back, so the relationship is anterior, not superior or proximal. Proximal and distal are limb terms and do not apply between two trunk regions.',
        src: { ref: 'hss.revans', location: 'Module 0, MCQ 1' } },
      { type: 'mcq', prompt: 'The thumb is __________ to the index finger.', options: ['Superior', 'Lateral', 'Anterior', 'Proximal'], answer: 1,
        explanation: 'Model answer B. In the anatomical position the palms face forward, which puts the thumb on the outer (radial) side — lateral.',
        src: { ref: 'hss.revans', location: 'Module 0, MCQ 2' } },
      { type: 'typed', prompt: 'Which term describes a position in a limb nearer to the point of attachment to the trunk?', accept: ['proximal'],
        explanation: 'Proximal. Its partner, distal, is further from the attachment.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A report says "fracture of the distal radius". Without looking anything up, which end of the forearm bone is broken and why?',
        model: 'The wrist end. Distal means further from the point of attachment to the trunk, so on the radius it is the end away from the elbow — the wrist end.',
        rubric: ['Identifies the wrist end', 'Justifies it from the definition of distal rather than from memory of the injury'] },
    ],
    commonMistakes: [
      'Using proximal or distal between two trunk regions — those two terms only work along a limb.',
      'Forgetting that palms-forward is what makes the thumb lateral; with palms back it would look medial.',
      'Swapping a term for its own partner under time pressure, which is the single most common terminology error.',
    ],
    skills: [
      'Learn the ten as five opposed pairs and self-test by naming the partner first: if you can produce "distal" when given "proximal" instantly, the most common exam error — picking the partner of the right answer — is closed off.',
      'Run the limb check on every proximal/distal question: those terms only work along a limb measured from where it joins the trunk, so between two trunk regions the pair cannot be the answer.',
    ],
    selfCheck: 'From a blank page: all five pairs, each term matched to its source example — brachium to antebrachium, pollex to the digits — plus the distal-radius reasoning and why the thumb is lateral to the index finger.',
    sourceRefs: [{ ref: 'hss.orientation', location: 'Section "Directional Terms"' }, { ref: 'hss.vocab', location: 'Glossary entries for each term' }],
  },
  {
    id: 'hss2011-terminology-planes',
    subject: 'HSS2011', unit: 'hss.term', type: 'definition',
    title: 'Body planes and what each one separates',
    tags: ['terminology', 'high-yield'],
    lesson: {
      explanation: 'Three standard planes cut the body, and each plane is tied to one pair of directional terms. The coronal (frontal) plane separates anterior from posterior. The transverse (horizontal) plane separates superior from inferior. The mid-sagittal (median) plane separates left from right. Naming the plane and naming the pair it creates is the fastest way to keep them straight.',
      keyFacts: [
        'Coronal / frontal plane → anterior vs posterior.',
        'Transverse / horizontal plane → superior vs inferior.',
        'Mid-sagittal / median plane → left vs right.',
        'The glossary lists these as "Frontal/Coronal Plane" and "Mid-sagittal/Median Plane", so either name is acceptable.',
      ],
      prerequisites: ['hss2011-terminology-directional-pairs'],
      examples: [],
    },
    memory: {
      chunking: 'Do not memorise three planes; memorise three splits. Front/back, top/bottom, left/right. The plane name is just the label on the split.',
      visualCue: 'Coronal is a crown sitting on the head, so the cut runs down through the ears — everything in front, everything behind.',
      wordOrigin: 'Sagittal comes from the Latin for arrow: an arrow entering the back of the skull travels along the midline, splitting left from right.',
    },
    practice: [
      { type: 'matching', prompt: 'Match each plane to the pair of terms it creates.',
        pairs: [['Coronal / frontal plane', 'Anterior vs posterior'], ['Transverse / horizontal plane', 'Superior vs inferior'], ['Mid-sagittal / median plane', 'Left vs right']],
        explanation: 'Each plane on the Module 0 slide is annotated with exactly the pair of directional terms it separates.' },
      { type: 'typed', prompt: 'Which plane divides the body into left and right halves?', accept: ['mid-sagittal', 'midsagittal', 'median', 'mid sagittal', 'sagittal'],
        explanation: 'The mid-sagittal or median plane. The glossary gives both names for the same plane.' },
      { type: 'cloze', prompt: 'A slice separating superior from inferior is taken in the ______ plane.', accept: ['transverse', 'horizontal', 'transverse/horizontal'],
        explanation: 'The transverse (horizontal) plane creates superior and inferior parts.' },
    ],
    application: [
      { type: 'scenario', prompt: 'You need a view that shows how far forward a structure sits relative to another. Which plane do you want, and which pair of terms will you be using to describe the result?',
        model: 'A coronal (frontal) plane view, described with anterior and posterior. That plane is the one that separates front from back, so it is the one that lets you talk about how far forward something lies.',
        rubric: ['Chooses coronal / frontal', 'Names anterior and posterior as the resulting pair'] },
    ],
    commonMistakes: [
      'Mixing coronal and sagittal because both are vertical cuts — anchor each one to the pair of terms it produces instead of to its orientation.',
      'Assuming only one name is correct; the glossary lists frontal/coronal and mid-sagittal/median as paired names.',
    ],
    skills: [
      'Memorise three splits, not three planes: coronal → anterior/posterior, transverse → superior/inferior, mid-sagittal → left/right. Any plane question is answered the moment you recall its split.',
      'Practise giving both names for each plane — frontal/coronal, horizontal/transverse, median/mid-sagittal — because the glossary lists the pairs and the exam may use either.',
    ],
    selfCheck: 'Match each plane to the pair of terms it creates without looking, give both accepted names for each, and pick the plane you would need to judge how far forward a structure sits.',
    sourceRefs: [{ ref: 'hss.m0.1718', location: 'L1 p4 "The anatomical position" — plane annotations' }, { ref: 'hss.vocab', location: 'Glossary: Frontal/Coronal Plane; Mid-sagittal/Median Plane' }],
  },
  {
    id: 'hss2011-terminology-cavities-regions',
    subject: 'HSS2011', unit: 'hss.term', type: 'definition',
    title: 'Body cavities, regions and quadrants',
    tags: ['terminology'],
    lesson: {
      explanation: 'Module 0 introduces the body cavities alongside the directional references. The glossary fixes which cavity and surface-region names are examinable: the thoracic cavity with the pericardial and pleural cavities inside it, the abdominal and pelvic cavities which together form the abdominopelvic cavity, and the peritoneal cavity. Surface description uses either the four-quadrant scheme or the nine-region scheme, and the glossary lists both.',
      plain: 'The body has internal spaces called cavities, and this course fixes exactly which names you must know. “Examinable” just means the exam can ask about them — the glossary is the list that decides. Inside the thorax sit the pericardial and pleural cavities; the abdominal and pelvic cavities together make the abdominopelvic cavity; and there is also the peritoneal cavity. On the surface, a location is described either as one of four quadrants or as one of nine regions — two different grids over the same abdomen.',
      keyFacts: [
        'Cavities named in the glossary: thoracic, pericardial, pleural, abdominal, pelvic, abdominopelvic, peritoneal, oral, medullary, scrotal.',
        'Four quadrants: right upper, left upper, right lower, left lower.',
        'Nine regions named in the glossary include epigastric, hypogastric, right and left hypochondriac, right and left lumbar, and right and left inguinal.',
        'The glossary also lists the transtubercular plane/line, one of the lines used to build the nine-region grid.',
      ],
      prerequisites: ['hss2011-terminology-planes'],
      examples: [],
    },
    memory: {
      chunking: 'Two schemes, not one. Quadrants are four boxes for quick clinical shorthand; regions are a nine-box grid for precise description.',
      location: 'Build the nine-box grid top to bottom: hypochondriac–epigastric–hypochondriac, then lumbar–umbilical–lumbar, then inguinal–hypogastric–inguinal. Middle column runs down the midline.',
      wordOrigin: 'Hypochondriac literally means "below the cartilage" — under the costal cartilages, nothing to do with the modern everyday meaning.',
    },
    practice: [
      { type: 'typed', prompt: 'Which single name covers the abdominal and pelvic cavities together?', accept: ['abdominopelvic', 'abdominopelvic cavity'],
        explanation: 'The glossary lists Abdominopelvic Cavity as its own entry alongside the separate abdominal and pelvic cavities.' },
      { type: 'mcq', prompt: 'Which of these is listed in the glossary as a cavity found inside the thoracic cavity?', options: ['Peritoneal cavity', 'Pericardial cavity', 'Scrotal cavity', 'Medullary cavity'], answer: 1,
        explanation: 'The pericardial cavity surrounds the heart and lies within the thorax. The peritoneal cavity is abdominal, the scrotal cavity is in the perineum, and the medullary cavity is inside a long bone.' },
      { type: 'cloze', prompt: 'The region directly above the umbilical region in the nine-region scheme is the ______ region.', accept: ['epigastric'],
        explanation: 'Epigastric sits in the top middle box, between the two hypochondriac regions.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A note records pain in the right hypochondriac region. Describe that location using the quadrant scheme instead, and say what you lose in the translation.',
        model: 'It falls in the right upper quadrant. You lose height information: the right upper quadrant also contains the right lumbar territory closer to the midline, so the quadrant name is a coarser description than the region name.',
        rubric: ['Maps right hypochondriac to right upper quadrant', 'Notes the quadrant scheme is less precise'] },
    ],
    commonMistakes: [
      'Treating quadrants and regions as the same scheme — they are two different grids over the same abdomen.',
      'Reading "hypochondriac" with its everyday meaning instead of "below the costal cartilage".',
    ],
    skills: [
      'Draw the nine-region grid from memory top to bottom — hypochondriac–epigastric–hypochondriac, lumbar–umbilical–lumbar, inguinal–hypogastric–inguinal — keeping the middle column on the midline, then place four quadrant labels over the same rectangle.',
      'Practise translating between the two schemes and naming what is lost: map right hypochondriac to the right upper quadrant and say in one sentence why the quadrant answer is coarser.',
    ],
    selfCheck: 'From a blank page: which two cavities sit inside the thoracic cavity, the single name covering abdominal and pelvic together, and the region directly above the umbilical region in the nine-box grid.',
    sourceRefs: [{ ref: 'hss.m0.1718', location: 'L1 p5 "Body cavities"; L1 p6–7 "Directional references"' }, { ref: 'hss.vocab', location: 'Glossary: cavity, region and quadrant entries' }],
  },
];
