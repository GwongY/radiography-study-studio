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
    id: 'dsai1202-ai-everyday-autonomy',
    subject: 'DSAI1202', unit: 'dsai.overview', type: 'comparison',
    title: 'AI in daily life, robots and autonomous vehicles',
    tags: ['ai', 'applications', 'high-yield'],
    lesson: {
      explanation: 'The Week 1 deck starts with AI systems already embedded in ordinary decisions. Recommender systems select videos, music, products and jobs; computer vision supports facial recognition, augmented or virtual reality and automatic photo tagging; natural-language processing supports spam filtering and machine translation; and generative AI creates new text, images or other media. It then distinguishes automation in software from autonomy in physical systems. Drones can inspect hazardous or inaccessible locations, collect images and measurements and reduce human exposure. Robots can repeat physical tasks in factories, hospitals and logistics. Self-driving vehicles combine sensing, perception, planning and control, but autonomy is a scale rather than an all-or-nothing label: the driver performs all tasks at the low end, assistance gradually controls steering or speed, conditional automation can drive within limits but expects a human takeover, high automation can complete a defined journey without intervention in its operating domain, and full automation removes the need for a human driver in all conditions. The practical question is therefore not merely whether AI is present, but what task the system controls, under which conditions, and who remains responsible when those conditions fail.',
      keyFacts: [
        'Recommenders: video, music, products and jobs.',
        'Computer vision: facial recognition, AR/VR and automatic photo tagging.',
        'Natural-language processing: spam detection and machine translation.',
        'Drones extend sensing into hazardous or inaccessible locations.',
        'Robots automate repeatable physical work; autonomous vehicles combine sensing, perception, planning and control.',
        'Vehicle automation progresses from human control through assistance and conditional/high automation to full automation.',
        'Always ask which task is automated, where it works and who must take over.',
      ], examples: [],
    },
    memory: { comparison: 'Automation does a task; autonomy decides and acts within an operating environment. Neither word guarantees every condition is covered.' },
    practice: [
      { type: 'matching', prompt: 'Match each AI domain to the lecture example.', pairs: [['Recommender system', 'Video, music, product and job suggestions'], ['Computer vision', 'Facial recognition and photo tagging'], ['Natural-language processing', 'Spam detection and machine translation'], ['Drone', 'Remote sensing in hazardous or inaccessible places']], explanation: 'These examples occupy the daily-life and autonomous-system sequence of the opening deck.' },
      { type: 'explain', prompt: 'Why is “self-driving” not enough information to describe a vehicle’s capability?', model: 'Because vehicle automation exists in levels. A system may only assist steering or speed, may drive conditionally while expecting takeover, or may operate without intervention only inside a defined domain. The label must therefore be paired with the controlled task, operating conditions and remaining human responsibility.', rubric: ['States autonomy has levels', 'Names operating limits or takeover', 'Identifies remaining human responsibility'] },
    ],
    commonMistakes: ['Treating all assisted-driving systems as fully autonomous in every condition.'],
    skills: ['Describe an AI application with three fields: task, operating conditions, responsible human.'],
    selfCheck: 'Give one example each of recommendation, vision, language processing and physical autonomy, then explain conditional versus full vehicle automation.',
    sourceRefs: [{ ref: 'dsai.w1', location: 'Slides 11–20 AI in daily life, drones, robots and levels of autonomous driving' }],
  },
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
  {
    "id": "dsai1202-history-paradigms",
    "subject": "DSAI1202",
    "unit": "dsai.w2",
    "type": "concept",
    "title": "AI history: Dartmouth, expert systems, neural networks and the three traditions",
    "tags": [
      "ai",
      "history",
      "symbolic-ai",
      "neural-networks",
      "deep-learning",
      "high-yield"
    ],
    "lesson": {
      "explanation": "The formal discipline of artificial intelligence began in the summer of 1956 at a Dartmouth College workshop organized by John McCarthy, where the field was named and founded on the core assertion that every aspect of learning or any other feature of intelligence can in principle be so precisely described that a machine can simulate it. Early symbolic successes included Arthur Samuel’s checkers program (1952), which learned board weights through self-play, and Allen Newell and Herbert Simon’s Logic Theorist (1955) and General Problem Solver (GPS), which proved mathematical theorems using heuristic search. These early triumphs generated overwhelming optimism: Herbert Simon predicted machines would do any human work within twenty years, Marvin Minsky anticipated the core problems of AI would be substantially solved within a decade, and Claude Shannon envisioned robots surpassing humans. However, real-world complexity and combinatorial explosion in search spaces quickly outpaced early computing hardware. Machine translation collapsed into failure — translating \"The spirit is willing, but the flesh is weak\" through Russian into \"The vodka is good, but the meat is rotten\" — leading to the 1966 ALPAC report that cut government funding and triggered the first AI winter. Even so, the early era yielded foundational computing contributions from John McCarthy, including the Lisp programming language, automated garbage collection, and time-sharing operating systems.\n\nIn the 1970s and 1980s, the field revived around knowledge-based expert systems that elicited domain rules directly from human specialists: DENDRAL inferred molecular structures from mass spectrometry in chemistry, MYCIN diagnosed bacterial blood infections and recommended antibiotics, and XCON converted customer orders into computer hardware parts specifications. Although expert systems bridged information gaps and proved AI had commercial value, their rigid deterministic rules could not handle real-world uncertainty, and dense rule interactions grew too complex to maintain — what Terry Winograd described with SHRDLU as a dead end presenting a dense mass with no easy footholds. The collapse of the specialized Lisp machine market in 1987 precipitated the second AI winter.\n\nRunning in parallel was the connectionist or neural lineage: from Warren McCulloch and Walter Pitts’ 1943 mathematical model of artificial neurons relating neural circuitry to logic, and Donald Hebb’s 1949 synaptic learning rule (\"cells that fire together wire together\"), to Frank Rosenblatt’s 1958 Perceptron for linear classification and Widrow and Hoff’s 1959 ADALINE. In 1969, Marvin Minsky and Seymour Papert published the book Perceptrons, proving mathematically that single-layer linear perceptrons could not compute nonlinear functions such as XOR, which dried up funding for neural network research for over a decade. Neural networks were revived through backpropagation and unsupervised layerwise pretraining by Geoffrey Hinton in 2006, surpassed Hidden Markov Models in speech recognition in 2009, and catalyzed the modern deep learning revolution when AlexNet won the ImageNet visual recognition challenge by a massive margin in 2012, followed by DeepMind’s AlphaGo defeating world Go champion Lee Sedol in 2016.\n\nToday, AI rests upon three intellectual traditions: Symbolic AI (explicit logic, knowledge graphs, heuristic search), Neural AI (brain-inspired distributed representations, backpropagation, deep architectures), and Statistical AI (regression, probability, Bayesian networks, and support vector machines derived from outside mathematics). AI is fundamentally defined as computational systems capable of performing tasks typically associated with human intelligence — learning, reasoning, problem-solving, perception, and decision-making — with the ultimate objective of remaining beneficial and aligned with human values.",
      "keyFacts": [
        "Dartmouth workshop (1956): organized by John McCarthy; coined Artificial Intelligence.",
        "Early symbolic successes: Samuel checkers (1952, learned weights), Newell & Simon Logic Theorist (1955, theorem proving), General Problem Solver.",
        "First AI winter: 1966 ALPAC report defunded machine translation after search spaces exploded and translations failed (\"vodka is good, meat is rotten\").",
        "Early era spinoffs: Lisp programming language, garbage collection, and time-sharing systems.",
        "Expert systems (1970s–80s): rule-based domain knowledge; DENDRAL (chemistry), MYCIN (blood infections/antibiotics), XCON (parts configuration).",
        "Second AI winter: 1987 collapse of Lisp machines; rigid rules could not handle real-world uncertainty (Winograd SHRDLU complexity bottleneck).",
        "Neural lineage: McCulloch-Pitts artificial neuron (1943), Hebbian learning (1949), Rosenblatt Perceptron (1958).",
        "Perceptrons book (1969): Minsky & Papert proved linear models cannot compute XOR, freezing neural net funding.",
        "Deep learning revolution: Hinton pretraining (2006), speech ASR beating HMMs (2009), AlexNet ImageNet victory (2012), AlphaGo (2016).",
        "Three intellectual traditions: Symbolic AI (rules/logic), Neural AI (connectionist/deep learning), and Statistical AI (probability/regression/SVM).",
        "Core definition: computational systems performing learning, reasoning, problem-solving, perception, and decision-making aligned with human values."
      ],
      "examples": [
        "MYCIN: an early rule-based expert system developed at Stanford that encoded over 500 rules to identify blood-borne bacterial pathogens and recommend antibiotic regimens, outperforming junior clinicians but limited by an inability to learn from new cases.",
        "AlexNet (2012): a deep convolutional neural network that halved the error rate in the ImageNet competition, proving that deep learning paired with GPU compute and large labeled datasets beats hand-crafted visual feature extractors."
      ]
    },
    "memory": {
      "chunking": "Three eras, two winters: 1950s Dartmouth optimism -> 1966 ALPAC winter -> 1970s-80s Expert systems -> 1987 Lisp market crash winter -> 2012 AlexNet deep learning boom.",
      "comparison": "Symbolic AI vs Neural AI vs Statistical AI: Symbolic uses hand-written rules and logical deduction (top-down); Neural uses simulated synapses learning representations from raw signals (bottom-up); Statistical optimizes mathematical probabilities and loss functions from data.",
      "wordOrigin": "Perceptron: coined by Frank Rosenblatt in 1958 from perceive + -tron (instrument/device), denoting a computational unit modeled on biological sensory perception."
    },
    "practice": [
      {
        "type": "matching",
        "prompt": "Match each historic milestone to its corresponding discovery or event.",
        "pairs": [
          [
            "Dartmouth Workshop 1956",
            "Coined Artificial Intelligence under John McCarthy"
          ],
          [
            "ALPAC Report 1966",
            "Defunded machine translation, triggering the first AI winter"
          ],
          [
            "Perceptrons book 1969",
            "Minsky & Papert proved linear models cannot compute XOR"
          ],
          [
            "AlexNet 2012",
            "Transformed computer vision with deep convolutional neural networks"
          ]
        ],
        "explanation": "These mark the foundational pivot points between optimism, AI winters, and deep learning breakthroughs."
      },
      {
        "type": "mcq",
        "prompt": "Which of the following was a primary reason for the failure and collapse of 1980s rule-based expert systems (the second AI winter)?",
        "options": [
          "Lack of electronic digital computers",
          "Deterministic hand-crafted rules could not handle real-world uncertainty and grew too complex to maintain",
          "Governments banned commercial knowledge systems",
          "Deep neural networks completely replaced all software overnight"
        ],
        "answer": 1,
        "explanation": "Expert systems relied on deterministic if-then rules that became exponentially brittle, expensive to update, and incapable of coping with real-world noise and uncertainty."
      },
      {
        "type": "mcq",
        "prompt": "What are the three distinct intellectual traditions that form the foundation of modern artificial intelligence?",
        "options": [
          "Hardware AI, Software AI, and Cloud AI",
          "Symbolic AI, Neural AI, and Statistical AI",
          "Robotics, Quantum Computing, and Nanotechnology",
          "Generative AI, Agentic AI, and Autonomous AI"
        ],
        "answer": 1,
        "explanation": "The lecture explicitly identifies three intellectual streams: Symbolic AI (rules, logic), Neural AI (artificial neural networks), and Statistical AI (probability, regression, machine learning algorithms)."
      }
    ],
    "commonMistakes": [
      "Assuming deep learning is new: artificial neural networks date back to McCulloch-Pitts in 1943 and Rosenblatt in 1958.",
      "Thinking AI winters were caused by a lack of interest: they were caused by over-promising followed by computational and informational bottlenecks that produced underwhelming real-world results."
    ],
    "skills": [
      "Identify the three intellectual traditions of AI and explain why modern AI relies on data-driven neural and statistical methods rather than pure deterministic rules."
    ],
    "selfCheck": "Name the three traditions of AI, explain why the 1966 ALPAC report triggered an AI winter, and explain why Minsky & Papert's 1969 proof about XOR stalled neural network research.",
    "sourceRefs": [
      {
        "ref": "dsai.w2",
        "location": "Slides 2–7 Birth of AI, Dartmouth 1956, Samuel checkers, early optimism, machine translation failure, ALPAC 1966 and first AI winter"
      },
      {
        "ref": "dsai.w2",
        "location": "Slides 8–9 Knowledge-based systems (70-80s), DENDRAL, MYCIN, XCON, uncertainty, Winograd SHRDLU, 1987 second AI winter"
      },
      {
        "ref": "dsai.w2",
        "location": "Slides 10–11 Artificial neural networks, McCulloch-Pitts 1943, Hebb 1949, Rosenblatt 1958, Minsky-Papert XOR 1969, deep learning Hinton 2006, AlexNet 2012, AlphaGo 2016"
      },
      {
        "ref": "dsai.w2",
        "location": "Slides 12–15 Two and three intellectual traditions (Symbolic, Neural, Statistical AI), definitions and alignment goals"
      }
    ]
  },
  {
    "id": "dsai1202-core-elements-nlp-cv",
    "subject": "DSAI1202",
    "unit": "dsai.w2",
    "type": "concept",
    "title": "Core AI framework: Data-Model-Inference, NLP tasks, and computer vision hierarchy",
    "tags": [
      "ai",
      "nlp",
      "computer-vision",
      "speech",
      "high-yield"
    ],
    "lesson": {
      "explanation": "Across all subfields of artificial intelligence, systems can be understood through a universal three-part pipeline: Data -> Model -> Inference/Decision. Data provides the empirical training signals or real-time inputs (financial time-series, text corpora, medical imagery, audio waveforms, or sensor streams). The Model learns underlying statistical representations, weights, or relationship patterns from that data. Inference (or Decision) applies the trained model to novel, unseen inputs to generate predictions, labels, actions, or synthesized outputs.\n\nNatural Language Processing (NLP) gives computers the capability to comprehend, interpret, and generate human language in text and speech. The lecture categorizes core NLP tasks:\n1. Machine Translation: mapping source-language text to target sequences using transformer architectures.\n2. Summarization: condensing lengthy documents into concise summaries while preserving core factual meaning (e.g. Zoom AI Companion meeting summaries; TripAdvisor review synthesis using GPT-4).\n3. Question Answering and Chatbots: conversational multi-turn dialogue and knowledge retrieval.\n4. Sentiment Analysis and Text Classification: determining underlying emotional polarity or assigning categorical labels (e.g. email spam filtering, customer feedback triage).\n5. Speech-to-Text (Automatic Speech Recognition / ASR): transforming acoustic waveforms into text tokens (e.g. OpenAI Whisper).\n6. Speech Synthesis (Text-to-Speech / TTS): generating natural-sounding spoken audio from text tokens (e.g. ElevenLabs, Tacotron 2, FastSpeech, VITS), enabling post-call sentiment and service analytics.\n\nComputer Vision (CV) enables computational systems to derive meaningful semantic information from visual inputs. The lecture establishes a clear hierarchy of visual tasks:\n1. Image Classification: predicting a single global category label with a confidence score for an entire image (e.g., classifying a pathology slide as malignant vs benign).\n2. Object Detection: identifying, classifying, and spatially locating multiple distinct entities within an image or video stream using bounding boxes with coordinates and confidence scores (e.g., YOLOv5, Faster R-CNN, DETR). Applications include autonomous vehicle obstacle tracking, retail people counting, agricultural yield prediction, PPE safety compliance, and pharmaceutical pill and vial defect inspection.\n3. Image Segmentation: assigning a category label to every individual pixel, delineating precise structural boundaries (e.g., semantic tumor segmentation in MRI or CT scans, separating neoplasm from healthy parenchyma for radiographers and oncologists).\n4. Keypoint Detection & Pose Estimation: detecting anatomical landmarks (eyes, ears, shoulders, elbows, wrists, hips, knees, ankles) and connecting them into a skeletal kinematic graph. Key clinical and practical applications include elderly fall detection, posture analysis, stroke physical rehabilitation form tracking, and athletic movement assessment.\n5. Facial Analysis & Recognition: face detection (bounding box), face analysis (demographics, expressions, emotions), and face recognition (1:1 verification such as phone biometric unlocking vs 1:N identification such as surveillance suspect matching).\n6. Optical Character Recognition (OCR): extracting alphanumeric text and bounding boxes from scanned documents, invoices, and clinical insurance records.",
      "keyFacts": [
        "Universal AI framework: Data (training/input) -> Model (learned patterns/weights) -> Inference/Decision (output predictions).",
        "NLP core tasks: machine translation, summarization, question answering, chatbots, sentiment analysis, text classification, and text generation.",
        "Speech AI: Speech-to-text (ASR, e.g. Whisper converts acoustics to text); Text-to-speech (TTS, e.g. ElevenLabs, Tacotron 2 converts text to speech).",
        "Image classification: assigns one overall label and confidence score to an entire image.",
        "Object detection: outputs bounding boxes + labels + confidence scores for multiple objects (YOLO, Faster R-CNN; used in PPE, pill inspection, vehicles).",
        "Image segmentation: pixel-level classification delineating exact geometric boundaries (vital for tumor segmentation in CT/MRI).",
        "Keypoint detection & pose estimation: tracks anatomical landmarks and skeletal posture (used in fall detection, stroke rehab, and posture correction).",
        "Face processing: detection (bounding box) -> analysis (emotion/attributes) -> recognition (1:1 verification vs 1:N identification).",
        "OCR: detects and extracts printed or written text from document images."
      ],
      "examples": [
        "Tumor semantic segmentation: in radiation oncology and radiography, models delineate the irregular voxel boundaries of glioblastomas on MRI, sparing adjacent healthy brain tissue during radiotherapy planning.",
        "Pill and vial defect inspection: high-speed factory computer vision systems use object detection to spot broken tablets, foreign particulate contamination, or cracked glass vials on pharmaceutical packaging lines."
      ]
    },
    "memory": {
      "chunking": "CV task precision ladder: Classification (whole image label) -> Detection (boxes around objects) -> Segmentation (exact pixel-level boundaries).",
      "comparison": "Face verification vs Face identification: Verification is 1:1 matching (\"Are you who you claim to be?\", e.g. phone unlock); Identification is 1:N matching (\"Who among this entire database are you?\", e.g. police surveillance).",
      "wordOrigin": "Segmentation: from Latin segmentum (\"a piece cut off\"), referring to partitioning an image into discrete, semantically meaningful pixel regions."
    },
    "practice": [
      {
        "type": "matching",
        "prompt": "Match each computer vision task to its defining spatial output.",
        "pairs": [
          [
            "Image classification",
            "Single global class label and confidence score"
          ],
          [
            "Object detection",
            "Rectangular bounding boxes with labels for multiple objects"
          ],
          [
            "Image segmentation",
            "Pixel-level region masks delineating exact boundaries"
          ],
          [
            "Pose estimation",
            "Skeletal landmark keypoints tracking body joint positions"
          ]
        ],
        "explanation": "Each CV task increases in spatial granularity from whole-image labels to bounding boxes, pixel masks, and joint keypoints."
      },
      {
        "type": "mcq",
        "prompt": "In a medical imaging context, why is image segmentation chosen over simple object detection for delineating a tumor in a CT or MRI scan?",
        "options": [
          "Segmentation only requires low-resolution cameras",
          "Segmentation provides pixel-level boundary delineation necessary for precise radiotherapy margins and surgical resection",
          "Object detection is too computationally fast to be clinically useful",
          "Segmentation converts images directly into text summaries"
        ],
        "answer": 1,
        "explanation": "Object detection only draws a rectangular bounding box around a lesion, whereas segmentation classifies every individual pixel to outline the irregular biological boundaries of the tumor."
      },
      {
        "type": "mcq",
        "prompt": "What distinguishes 1:1 face verification from 1:N face identification?",
        "options": [
          "Verification confirms an identity claim (one-to-one), while identification searches an entire database of faces (one-to-many)",
          "Verification works on video, while identification works only on static photos",
          "Verification uses speech signals, while identification uses retina scans",
          "Verification is performed by humans, while identification is performed by AI"
        ],
        "answer": 0,
        "explanation": "Face verification compares an image against a single known template (1:1, like unlocking a phone), while identification searches an unknown face across an entire gallery (1:N, like criminal database lookup)."
      }
    ],
    "commonMistakes": [
      "Confusing object detection with image segmentation: detection outputs rectangular bounding boxes; segmentation classifies every pixel.",
      "Confusing speech recognition (ASR) with speech synthesis (TTS): ASR turns audio into text; TTS turns text into audio."
    ],
    "skills": [
      "Select the appropriate computer vision or NLP tool for a given clinical or operational problem based on whether classification, detection, segmentation, or transcription is required."
    ],
    "selfCheck": "Explain the difference between classification, detection, and segmentation, and give one clinical application of pose estimation.",
    "sourceRefs": [
      {
        "ref": "dsai.w2",
        "location": "Slides 16–24 Core elements of an AI system (Data, Model, Inference/Decision), data types, and subfield map"
      },
      {
        "ref": "dsai.w2",
        "location": "Slides 25–32 Natural language processing, machine translation, summarization (Zoom/TripAdvisor), speech-to-text (Whisper), TTS (ElevenLabs), and post-call analytics"
      },
      {
        "ref": "dsai.w2",
        "location": "Slides 33–42 Computer vision tasks, classification vs detection vs segmentation, YOLOv5, people counting, PPE detection, pill/vial inspection, and tumor segmentation"
      },
      {
        "ref": "dsai.w2",
        "location": "Slides 43–48 Keypoint detection, pose estimation (fall detection, stroke rehab), face detection/analysis/recognition (1:1 vs 1:N), and OCR"
      }
    ]
  },
  {
    "id": "dsai1202-generative-ai-prompting",
    "subject": "DSAI1202",
    "unit": "dsai.w2",
    "type": "concept",
    "title": "Generative AI: LLMs, diffusion models, levels of AI, and prompt engineering",
    "tags": [
      "ai",
      "generative-ai",
      "llm",
      "prompt-engineering",
      "high-yield"
    ],
    "lesson": {
      "explanation": "Generative Artificial Intelligence represents a paradigm shift from discriminative models (which classify or predict labels on existing data) to generative models that synthesize entirely new artifacts — text, high-resolution imagery, synthetic speech, sound effects, and coherent video. In natural language, Large Language Models (LLMs) learn statistical and semantic patterns across massive internet-scale text corpora through next-token prediction, evolving from early GPT models to GPT-4o, Claude, DeepSeek, and Google Gemini. Modern foundation models are increasingly natively multimodal, processing and generating interleaved text, audio, and visual inputs simultaneously, enabling in-context visual reasoning, conversational image editing, and world-knowledge synthesis.\n\nIn visual and media generation, text-to-image synthesis is driven by diffusion models and flow-matching architectures: Midjourney (producing award-winning fine art such as Théâtre D’opéra Spatial and Japan’s first AI manga Cyberpunk: Peach John), Stable Diffusion (an open-source model developed by Stability AI running locally on consumer GPUs across versions 1.4, 1.5, 2.0, SDXL, and 3.5), and Flux from Black Forest Labs (featuring FLUX.1 pro, dev, and schnell, with Kontext for region-specific inpainting). Audio generation is spearheaded by platforms like ElevenLabs (offering text-to-speech, speech-to-speech voice transformation, voice cloning, and text-to-sound effects). Video generation has advanced rapidly with Google DeepMind’s Veo / Veo 3.1 and OpenAI’s Sora / Sora 2, capable of generating cinematic multi-shot video with synchronized audio at up to 95% lower cost than traditional commercial production.\n\nThe lecture frames the evolutionary trajectory of AI across three conceptual levels:\n1. Artificial Narrow Intelligence (ANI / Weak AI): systems designed to perform specific tasks within limited contexts (e.g. speech recognition, facial detection, chess, autonomous driving, medical imaging analysis). Every AI system currently in existence is ANI.\n2. Artificial General Intelligence (AGI / Strong AI): hypothetical AI that can learn, think, reason, and adapt across any intellectual task with human-level or cross-domain capability. AGI remains under active research.\n3. Artificial Super Intelligence (ASI): hypothetical future AI surpassing all human intelligence across every intellectual and creative endeavour, potentially possessing its own beliefs, desires, and self-directed goals.\n\nEffective interaction with generative AI relies on Prompt Engineering. A prompt is the textual instruction or input provided to guide token generation. For traditional image generation models (such as Stable Diffusion), prompts must be descriptive rather than instructive — describing the visual scene elements (e.g., \"Painting, oil on canvas, van Gogh style, vibrant colors\") rather than issuing procedural commands to the bot (\"Please draw me a painting...\"). A well-engineered prompt systematically specifies six core components: medium/format (photo vs painting), subject, specific details/clothing, lighting (natural, soft, neon), environment/setting, and color scheme or artistic style.\n\nCrucially, foundation models (e.g., GPT, DeepSeek) incorporate prior conversation history into subsequent prompt windows. In multi-turn chat, previous user turns, model outputs, and uploaded documents are re-sent as input tokens. When the total context exceeds the model’s context window, older turns are truncated. Because monthly quotas and computational costs on institutional platforms (such as the PolyU GenAI platform at genai.polyu.edu.hk) are billed per token, lengthy chat histories continuously consume input credits. Users should clear history or start a new chat session when initiating unrelated tasks to prevent token waste.",
      "keyFacts": [
        "Generative AI synthesizes new content (text, image, audio, video) rather than merely classifying existing data.",
        "LLMs learn statistical and semantic representations through massive-scale next-token prediction; native multimodal models combine text, vision, and audio.",
        "Image generation architectures: Midjourney, Stable Diffusion (open-source, consumer GPU runnable), Flux (Black Forest Labs), and native multimodal editors (GPT-4o, Gemini).",
        "Audio & Video synthesis: ElevenLabs (TTS, voice cloning, sound effects); Veo (DeepMind) and Sora (OpenAI) generate high-definition video with audio.",
        "Three levels of AI: ANI (Narrow/Weak, task-specific — ALL current AI); AGI (General/Strong, human-level across all domains); ASI (Super, surpasses all human intellect).",
        "Image prompt rule: prompts should be descriptive rather than instructive (describe the scene directly rather than commanding the bot).",
        "Prompt modifiers structure: medium (photo/painting), subject, details, lighting, environment, color scheme, art style.",
        "Conversation history: foundation models re-send chat history as input tokens; clearing history on platforms like PolyU GenAI saves token credits."
      ],
      "examples": [
        "PolyU GenAI platform (genai.polyu.edu.hk): provides university students with access to state-of-the-art foundation models with monthly credit quotas that deduct input and output tokens on each prompt interaction.",
        "Stable Diffusion prompt engineering: using \"A photo of a pretty girl walking in a garden, ultra-high resolution, award-winning photographer\" provides specific modifiers for subject, setting, medium, and photographic quality."
      ]
    },
    "memory": {
      "chunking": "Three levels of AI: ANI (Narrow - today's reality) -> AGI (General - human equivalent) -> ASI (Super - superhuman intellect).",
      "comparison": "Descriptive vs Instructive prompting: Instructive says \"Please paint an apple on a table for me\"; Descriptive says \"An oil painting of a ripe red apple on a rustic wooden table, soft morning window light, high realism\". Descriptive yields far tighter visual control.",
      "wordOrigin": "Generative: from Latin generare (\"to beget, produce\"), denoting systems that generate novel data distributions rather than selecting among existing choices."
    },
    "practice": [
      {
        "type": "mcq",
        "prompt": "Which level of artificial intelligence describes all AI systems that exist today, including advanced models like GPT-4o, AlphaGo, and autonomous vehicles?",
        "options": [
          "Artificial General Intelligence (AGI)",
          "Artificial Narrow Intelligence (ANI)",
          "Artificial Super Intelligence (ASI)",
          "Artificial Sentient Intelligence (ASI)"
        ],
        "answer": 1,
        "explanation": "All currently deployed AI systems are Artificial Narrow Intelligence (weak AI), designed to operate within specific tasks or defined operational contexts."
      },
      {
        "type": "mcq",
        "prompt": "Why should image generation prompts for models like Stable Diffusion be descriptive rather than instructive?",
        "options": [
          "Diffusion models do not speak English",
          "Diffusion models predict visual distributions matching scene descriptions and keywords, whereas conversational commands add unnecessary noise without visual meaning",
          "Instructive prompts consume ten times more GPU electricity",
          "Descriptive prompts are required by international copyright law"
        ],
        "answer": 1,
        "explanation": "Traditional diffusion models align visual tokens with descriptive attributes (subject, lighting, medium, style) rather than interpreting procedural conversational instructions."
      },
      {
        "type": "mcq",
        "prompt": "On chat-based foundation model platforms such as PolyU GenAI, why does leaving old conversation history in an active chat consume more credits?",
        "options": [
          "The server charges rent for the disk space of saved messages",
          "The entire conversation history is concatenated and sent as input tokens with every new prompt, increasing input token usage",
          "Old messages cause the model to slow down its clock frequency",
          "Credits automatically expire after ten minutes of inactivity"
        ],
        "answer": 1,
        "explanation": "Multi-turn chat models maintain context by re-transmitting previous conversation turns as input tokens on each submission, which draws against monthly token allowances."
      }
    ],
    "commonMistakes": [
      "Believing AGI or ASI has already been achieved: all current foundation models and agentic systems remain ANI.",
      "Treating chat history as free: multi-turn chat resends prior turns, multiplying token consumption on every turn."
    ],
    "skills": [
      "Structure high-fidelity prompts using modular descriptive modifiers (medium, subject, lighting, environment, style) and manage token context windows efficiently."
    ],
    "selfCheck": "Distinguish ANI from AGI and ASI, state the golden rule of diffusion image prompting, and explain why chat history increases token billing.",
    "sourceRefs": [
      {
        "ref": "dsai.w2",
        "location": "Slides 50–58 Generative AI, ChatGPT, GPT timeline, multimodal LLMs and visual prompt processing"
      },
      {
        "ref": "dsai.w2",
        "location": "Slides 59–67 Image, audio and video generation: Midjourney, Stable Diffusion versions, Flux, ElevenLabs, Veo and Sora"
      },
      {
        "ref": "dsai.w2",
        "location": "Slide 68 Three Levels of AI: Artificial Narrow Intelligence (ANI), Artificial General Intelligence (AGI), and Artificial Super Intelligence (ASI)"
      },
      {
        "ref": "dsai.w2",
        "location": "Slides 69–74 PolyU GenAI platform, prompt definition, descriptive vs instructive prompting, prompt modifiers, and conversation history token limits"
      }
    ]
  }
];
