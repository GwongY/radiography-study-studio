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
    practice: [
      { type: 'matching', prompt: 'Match each AI domain to the lecture example.', pairs: [['Recommender system', 'Video, music, product and job suggestions'], ['Computer vision', 'Facial recognition and photo tagging'], ['Natural-language processing', 'Spam detection and machine translation'], ['Drone', 'Remote sensing in hazardous or inaccessible places']], explanation: 'These examples occupy the daily-life and autonomous-system sequence of the opening deck.' },
      { type: 'explain', prompt: 'Why is “self-driving” not enough information to describe a vehicle’s capability?', model: 'Because vehicle automation exists in levels. A system may only assist steering or speed, may drive conditionally while expecting takeover, or may operate without intervention only inside a defined domain. The label must therefore be paired with the controlled task, operating conditions and remaining human responsibility.', rubric: ['States autonomy has levels', 'Names operating limits or takeover', 'Identifies remaining human responsibility'] },
    ],
    commonMistakes: ['Treating all assisted-driving systems as fully autonomous in every condition.'],
    sourceRefs: [{ ref: 'dsai.w1', location: 'Slides 11–20 AI in daily life, drones, robots and levels of autonomous driving' }],
  },
  {
    id: 'dsai1202-ai-in-healthcare',
    subject: 'DSAI1202', unit: 'dsai.overview', type: 'definition',
    title: 'Where AI already sits in a hospital',
    tags: ['ai', 'healthcare', 'high-yield'],
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
