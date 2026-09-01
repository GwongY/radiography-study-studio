/*
 * DSAI1202, from the Week 1 overview deck.
 *
 * The subject sat in the schema with coverage: 'none' until the deck was
 * dropped into New source/. It is a General University Requirement AI-literacy
 * course, and it says so about itself: no programming, no mathematics of AI.
 * These items follow that framing rather than importing technical AI material
 * from elsewhere, which would be exactly the invented syllabus the
 * source-traceability rule exists to prevent.
 *
 * Only Week 1 has been supplied. The schedule slide names twelve more topics —
 * AI overview, GenAI, chatbots, machine learning I and II — and none of that
 * material is here, so none of it is taught here.
 */

/* ------------------------------------------------------------------ *
 * Study items — DSAI1202 (from the Week 1 overview deck)
 * ------------------------------------------------------------------ */

export const DSAI_ITEMS = [
  {
    id: 'dsai1202-ai-in-healthcare',
    subject: 'DSAI1202', unit: 'dsai.overview', type: 'definition',
    title: 'Where AI already sits in a hospital',
    tags: ['ai', 'healthcare', 'high-yield'],
    lesson: {
      explanation: 'The lecture works through healthcare as its longest worked example, and the parts of it a radiographer stands closest to are the imaging ones. AI tools help analyse X-rays, CT scans and other imaging to assist doctors towards faster and more accurate diagnosis — the examples given are detecting fractures or lung issues. Beyond the image, a patient status prediction indicator marks whether a patient is stable or needs attention, and the system automatically alerts ward-round doctors about patients at risk of deterioration. A smart hospital is defined as one integrating advanced technologies — AI, the Internet of Things, big data analytics and 5G — to improve healthcare delivery, patient care quality and operational efficiency, aiming at better diagnosis, better patient flow, operational efficiency and patient safety. Its features are listed concretely: real-time monitoring dashboards for patient flow and urgency, AI-assisted diagnostics, paperless workflows, smart health stations where patients self-measure vital signs with automatic upload, IoT-enabled pharmacy and operating rooms, robotics for cleaning and logistics, and telemedicine. What makes any of that possible is data: vital signs, medical images and clinic notes unified in electronic medical records, with sensors and cameras collecting hundreds of gigabytes per patient. In Hong Kong the Hospital Authority runs Hospital Command Centres that monitor the whole journey from A&E arrival through admission, transfer and discharge, consolidating vital signs and lab reports and visualising bed occupancy, average length of stay and daily admission and discharge figures. Two other cases sit outside imaging. An AI model trained on retinal images identifies diabetic retinopathy — a severe, entirely preventable complication of diabetes that blinds if untreated — where eye specialists are critically short, as in India. And DeepMind released AlphaFold in 2021 to predict the 3D shapes of millions of proteins, lowering the cost of drug discovery enough to make neglected diseases worth targeting.',
      keyFacts: [
        'AI analyses X-rays, CT and other imaging to assist faster, more accurate diagnosis — fractures, lung issues.',
        'Patient status prediction indicator: flags stable versus needs-attention, and alerts ward-round doctors to deterioration risk.',
        'Smart hospital = AI + IoT + big data analytics + 5G, for better diagnosis, patient flow, efficiency and safety.',
        'Smart hospital features: real-time monitoring, AI-assisted diagnostics, paperless workflows, smart health stations, IoT pharmacy and theatres, robotics, telemedicine.',
        'Data scale: hundreds of GB per patient from sensors and cameras.',
        'HA Hospital Command Centres track A&E arrival → admission → transfer → discharge, and visualise bed occupancy and length of stay.',
        'Diabetic retinopathy: preventable, blinding if missed; AI reads retinal images where specialists are scarce.',
        'AlphaFold (DeepMind, 2021) predicts 3D protein shapes, lowering drug-discovery cost for neglected diseases.',
        'GenAI drafts medical reports — but doctors still review and finalise them.',
      ],
      prerequisites: [],
      examples: [
        'The Hospital Authority receives over 100,000 medical report requests a year. Patients wait about eight weeks, and writing them takes doctors 8–10% of their time — which is the staffing problem GenAI is being pointed at.',
      ],
    },
    memory: {
      chunking: 'Three layers, outward from the patient: the image (AI reads it), the ward (prediction indicator and deterioration alerts), the hospital (command centre, bed occupancy, patient flow).',
      comparison: 'Notice which of these replaces a judgement and which replaces a chore. Reading a retinal image where there is no specialist substitutes for absent expertise; drafting a report that a doctor still signs substitutes for typing. The lecture is careful about that line — the reports "still need to be reviewed and finalized by doctors".',
      story: 'Hundreds of gigabytes per patient is the fact that makes the rest inevitable: no human reads that, so something has to.',
    },
    practice: [
      { type: 'mcq', prompt: 'The lecture says the Hospital Authority is adopting generative AI to write medical reports. What does it say about the doctor’s role afterwards?', options: ['The reports are issued automatically once generated', 'The final reports still need to be reviewed and finalised by doctors', 'Doctors only handle reports flagged as low confidence', 'Reports are reviewed by administrative staff instead'], answer: 1,
        explanation: 'AI reads large amounts of clinical data and drafts initial versions; the final reports still need to be reviewed and finalised by doctors.' },
      { type: 'typed', prompt: 'Name the four technologies the lecture says a smart hospital integrates.', accept: ['ai, iot, big data analytics, 5g', 'artificial intelligence, internet of things, big data analytics, 5g communications', 'ai, internet of things, big data, 5g'],
        explanation: 'Artificial intelligence, the Internet of Things, big data analytics and 5G communications.' },
      { type: 'matching', prompt: 'Match each AI application to the problem the lecture says it addresses.',
        pairs: [['Retinal image analysis', 'A critical shortage of eye specialists'], ['AlphaFold', 'The cost of drug discovery for neglected diseases'], ['GenAI report drafting', 'Doctors spending 8–10% of their time writing reports'], ['Hospital Command Centre', 'Patient flow and waiting times across the whole journey']],
        explanation: 'Each case in the deck is introduced by the constraint it exists to relieve, not by the technology.' },
      { type: 'explain', prompt: 'Why does the lecture mention "hundreds of GB per patient" immediately before describing real-time monitoring?',
        model: 'Because that volume is what makes automated monitoring necessary rather than merely convenient. Sensors and cameras collect data at a scale no clinician can watch continuously, so the system has to detect subtle changes and alert staff.',
        rubric: ['Links data volume to the need for automation', 'Mentions alerting staff to changes they could not track manually'] },
    ],
    application: [
      { type: 'scenario', prompt: 'You are a radiographer in a department that has introduced an AI tool flagging suspected fractures on plain films. Using the lecture’s own framing, say what the tool is for and where the boundary of its role sits.',
        model: 'The lecture describes such tools as assisting doctors towards faster and more accurate diagnosis — the word is assist. Its parallel case is GenAI report drafting, where the output is an initial version and the final report still needs to be reviewed and finalised by a doctor. So the flag is a prompt to look, not a diagnosis: the interpretation remains a clinician’s, and the radiographer’s own duties — positioning, image quality, dose — are unchanged by it.',
        rubric: ['Uses the lecture’s "assist" framing rather than replacement', 'Draws the boundary at human review, citing the report-drafting parallel'] },
    ],
    commonMistakes: [
      'Reading "AI-assisted diagnostics" as AI making the diagnosis. The deck consistently says assist, and keeps a doctor in the loop for the one workflow it describes end to end.',
      'Treating a smart hospital as a set of gadgets. The definition is about integration for delivery, quality and efficiency — the features are consequences of that, not the definition.',
      'Confusing the Hospital Command Centre with clinical AI. It is patient-flow monitoring and visualisation, not diagnosis.',
    ],
    skills: [
      'Assist is the deck\'s load-bearing word: the fracture-flagging tool and the GenAI report drafter are both introduced with a human kept in the loop — the report "still needs to be reviewed and finalized by doctors". The examinable distinction is which workflows replace absent expertise (retinal reading where no specialist exists) and which merely replace typing (drafts a doctor signs).',
      'The Hospital Command Centre is patient-flow monitoring, not clinical AI: it tracks arrival → admission → transfer → discharge and visualises bed occupancy — no diagnosis anywhere in it. Filing it with the imaging tools is the deck\'s own planted confusion.',
    ],
    selfCheck: 'From blank: the four smart-hospital technologies, three named imaging or ward-level AI uses, and what the deck says happens to a GenAI-drafted report before it reaches the patient.',
    sourceRefs: [
      { ref: 'dsai.w1', location: 'Slides 21–22 diabetic retinopathy and AlphaFold' },
      { ref: 'dsai.w1', location: 'Slides 23–24 "Smart Hospital" and "Smart Hospital features"' },
      { ref: 'dsai.w1', location: 'Slides 25–27 healthcare data, Hospital Command Centres, "AI for diagnosis"' },
      { ref: 'dsai.w1', location: 'Slide 28 "GenAI in healthcare" — report backlog and doctor review' },
    ],
  },
  {
    id: 'dsai1202-ai-literacy',
    subject: 'DSAI1202', unit: 'dsai.overview', type: 'definition',
    title: 'AI literacy, and what this subject is not',
    tags: ['ai', 'high-yield'],
    lesson: {
      explanation: 'AI literacy is defined in the deck as the ability to comprehend, interact with, and make informed decisions regarding artificial intelligence technologies in daily life. It involves understanding the basic principles of AI, recognising its applications, and being aware of ethical, social and privacy implications while engaging responsibly with AI systems. That definition is the whole shape of the subject, and the deck is unusually direct about the consequences: this course aims to improve general AI literacy, its contents are not customised for any individual programme or discipline, it will not include much technical content, and programming and the mathematics related to AI will not be included — other courses cover those in depth. The applications side is illustrated across four domains: recommender systems for video, music, product and job recommendations; computer vision for facial recognition, AR/VR and automatic photo tagging; natural language processing for spam detection and machine translation; and generative AI. The ethical and social side is given equal weight. Deepfakes are defined as the use of AI to create a fake event in photo, video or audio format, and the deck records their use to impersonate public figures in financial fraud. On employment it cites Geoffrey Hinton, the "Godfather of AI", holding that AI is poised to replace many white-collar positions and knowledge-based work in the near future, and notes that entry-level jobs — the traditional first step in a career — are disappearing or changing as AI automates foundational tasks. Its own assessment policy follows from the literacy framing rather than fighting it: students are expected to use generative AI tools for learning and for take-home assessments, to generate and organise ideas and improve writing, with some tasks requiring the use to be documented.',
      keyFacts: [
        'AI literacy = comprehend, interact with, and make informed decisions about AI in daily life.',
        'It includes basic principles, recognising applications, and awareness of ethical, social and privacy implications.',
        'DSAI1202 is general: not customised per programme, little technical content.',
        'Programming and AI mathematics are explicitly NOT included.',
        'Four illustrated domains: recommender systems, computer vision, natural language processing, generative AI.',
        'Deepfake = AI used to create a fake event in photo, video or audio format.',
        'Deepfakes have been used to impersonate public figures for financial fraud.',
        'Hinton, the "Godfather of AI", expects many white-collar and knowledge-work roles to be replaced.',
        'Entry-level roles are disappearing or evolving as AI automates foundational tasks.',
        'The subject expects you to USE GenAI for take-home work, and to document that use where required.',
      ],
      prerequisites: [],
      examples: [
        'AI is already in the junior secondary curriculum in Hong Kong — 10–14 hours across Forms 1 to 3 in computer lessons from 2023, covering generative AI, machine learning, computer vision and natural language processing.',
      ],
    },
    memory: {
      wordOrigin: 'Literacy, not fluency. The word is borrowed from reading: you are being asked to read AI critically — recognise it, judge it, decide about it — not to build it.',
      chunking: 'The definition has three verbs — comprehend, interact, decide — and one qualifier: responsibly, with ethics, society and privacy in view.',
      comparison: 'Set the subject’s own disclaimer against its content. It refuses programming and mathematics, and spends its slides instead on applications, harms and employment. That is what an AI-literacy course is: judgement about a technology rather than command of it.',
    },
    practice: [
      { type: 'typed', prompt: 'Complete the definition: AI literacy is the ability to comprehend, interact with, and ___ regarding AI technologies in daily life.', accept: ['make informed decisions', 'make informed decisions regarding ai', 'informed decisions'],
        explanation: 'The ability to comprehend, interact with, and make informed decisions regarding artificial intelligence technologies in daily life.' },
      { type: 'mcq', prompt: 'Which of these does the deck explicitly say the subject will NOT include?', options: ['Ethical and privacy implications', 'Applications of AI in healthcare', 'Programming and mathematics related to AI', 'Generative AI'], answer: 2,
        explanation: 'Programming and maths related to AI will NOT be included; the deck points to other courses for in-depth technical topics.' },
      { type: 'mcq', prompt: 'What is DSAI1202’s stated policy on using generative AI for take-home assessments?', options: ['It is prohibited and checked with Turnitin', 'It is expected, and some tasks require the use to be documented', 'It is permitted only for the group project', 'It is allowed only with prior written approval'], answer: 1,
        explanation: 'The deck says students are expected to use GenAI tools for learning and take-home assessments — generating and organising ideas, improving writing — with some tasks requiring documentation of that use.' },
      { type: 'matching', prompt: 'Match each domain to the example the deck gives for it.',
        pairs: [['Recommender systems', 'Video, music, product and job recommendations'], ['Computer vision', 'Facial recognition, AR/VR, automatic photo tagging'], ['Natural language processing', 'Spam detection and machine translation'], ['Deepfake', 'A fake event created in photo, video or audio format']],
        explanation: 'The first three are the everyday-life domains; the deepfake definition comes from the harms section.' },
    ],
    application: [
      { type: 'scenario', prompt: 'The deck expects you to use generative AI on take-home work, and separately warns that AI is displacing entry-level roles by automating foundational tasks. Are those positions in tension? Argue it using the definition of AI literacy.',
        model: 'They are consistent under the definition, which asks for informed decisions and responsible engagement rather than avoidance or adoption. Refusing the tools would not protect the entry-level work the deck says is already being automated, and would forfeit the literacy the subject is assessing. What the two positions together imply is a division: use the tool for what it automates — organising and drafting — while making sure the judgement it cannot supply is yours, since that judgement is precisely what remains scarce when foundational tasks are automated.',
        rubric: ['Recognises the definition asks for informed use, not abstention', 'Connects the displacement of foundational tasks to where human value moves'] },
    ],
    commonMistakes: [
      'Expecting a technical course. The deck rules out programming and AI mathematics in as many words.',
      'Assuming a university AI policy means prohibition — this subject expects use, with documentation.',
      'Treating "deepfake" loosely as any AI image. The definition given is narrower: a fake EVENT, in photo, video or audio.',
    ],
    skills: [
      'The deepfake definition is narrower than the way the word gets used: a fake EVENT, in photo, video or audio — not any AI-generated image. The deck\'s fraud cases impersonate public figures, which is why "event" is the word that matters.',
      'The deck\'s exclusions are content, not fine print: refusing programming and AI mathematics is what makes an AI-literacy course a course in judgement about the technology rather than command of it — and its assessment policy (use GenAI, document the use) follows from that same framing rather than fighting it.',
    ],
    selfCheck: 'Write the definition of AI literacy, list the two things the subject excludes, and state the GenAI assessment policy in one sentence.',
    sourceRefs: [
      { ref: 'dsai.w1', location: 'Slide 42 "AI Literacy" — the definition' },
      { ref: 'dsai.w1', location: 'Slide 47 "About DSAI1202" — general AI literacy, no programming or maths' },
      { ref: 'dsai.w1', location: 'Slide 11 "AI in every day life" — recommender systems, computer vision, NLP, generative AI' },
      { ref: 'dsai.w1', location: 'Slides 36–41 GenAI policy, deepfakes, and AI threats to white-collar and entry-level positions' },
    ],
  },
];
