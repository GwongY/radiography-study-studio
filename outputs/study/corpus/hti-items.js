/*
 * HTI17103, drawn from the HTI17101 Exploring Radiography set — the study
 * items for the radiation-science strand.
 *
 * Split out of study-data.js in phase 2026-09-01. outputs/study-data.js is
 * the barrel every importer still uses; nothing imports this file directly
 * except its siblings.
 */

/* ------------------------------------------------------------------ *
 * Study items — HTI17103 (from the HTI17101 Exploring Radiography set)
 * ------------------------------------------------------------------ */

export const HTI_ITEMS = [
  {
    id: 'hti17103-what-is-radiography',
    subject: 'HTI17103', unit: 'hti.subject', type: 'definition',
    title: 'What radiography is, and who does what',
    tags: ['profession', 'high-yield'],
    lesson: {
      explanation: 'Radio- derives from the Latin radius, meaning a radial spread-out of energy, that is, radiation. The suffix -graphy means a snapshot or photo. Combined, radiography is taking photos using ionizing radiation: the art and science of using ionizing radiation to create images of the body and its inner structures, and those images aid in the diagnosis of disease and pathology. The lecture then separates the roles: the radiographer takes the radiographs; the radiotherapist plans and switches on the beam for treatments; the radiation chemist or pharmacist prepares the radiopharmaceuticals; the radiologist interprets radiographic images; the radio-oncologist diagnoses and plans therapy for cancer patients; and the medical physicist calibrates and measures the radiation dose of instruments.',
      keyFacts: [
        'Radio- = radial spread-out of energy (radiation); -graphy = snapshot, photo.',
        'Radiography: the art and science of using ionizing radiation to create images of the body and inner structures.',
        'Radiographer — takes the radiographs.',
        'Radiotherapist — plans and switches on the beam for treatments.',
        'Radiation chemist / pharmacist — prepares radiopharmaceuticals.',
        'Radiologist — interprets radiographic images.',
        'Radio-oncologist — diagnoses and plans therapy for cancer patients.',
        'Medical physicist — calibrates and measures the radiation dose of instruments.',
        'X-rays are produced when an electron stream strikes a target made of a mixture of tungsten and rhenium.',
      ],
      prerequisites: [],
      examples: ['The lecture notes radiography is not confined to hospitals: airport security, customs cargo checks and industrial X-ray checks all use the same physics.'],
    },
    memory: {
      wordOrigin: 'Split every job title at the hyphen. Radio-grapher writes the image. Radio-logist studies it. Radio-therapist treats with it. The suffix tells you the verb.',
      comparison: 'Radiographer and radiologist are the pair most often confused: one acquires the image, the other reads it.',
      chunking: 'Six roles, three groups: two who operate the beam (radiographer, radiotherapist), two who interpret and prescribe (radiologist, radio-oncologist), two who prepare and measure (radiation pharmacist, medical physicist).',
    },
    practice: [
      { type: 'matching', prompt: 'Match each professional to their role as defined in the lecture.',
        pairs: [['Radiographer', 'Takes the radiographs'], ['Radiologist', 'Interprets radiographic images'], ['Medical physicist', 'Calibrates and measures the radiation dose of instruments'], ['Radiation chemist / pharmacist', 'Prepares the radiopharmaceuticals']],
        explanation: 'These are the exact role definitions on the "Who is working with radiation in hospitals?" slide.' },
      { type: 'mcq', prompt: 'Which professional plans and switches on the beam for treatments?', options: ['Radiologist', 'Radiographer', 'Radiotherapist', 'Medical physicist'], answer: 2,
        explanation: 'The radiotherapist plans and switches on the treatment beam. The radiographer takes diagnostic radiographs.' },
      { type: 'typed', prompt: 'The X-ray tube target is made of a mixture of which two metals?', accept: ['tungsten and rhenium', 'tungsten, rhenium', 'rhenium and tungsten'],
        explanation: 'The target is made of a mixture of tungsten and rhenium; the electron stream striking it emits characteristic rays, i.e. X-rays.' },
    ],
    application: [
      { type: 'scenario', prompt: 'The lecture calls radiology "a science of everything" and lists physiology, anatomy, biology, chemistry and physics. Pick two of those and say what question each answers for a radiographer.',
        model: 'Anatomy answers "where to apply" the beam and "what is expected to see" on the image. Physics answers "how to protect from ionizing radiation" and underlies image formation. The lecture pairs the disciplines with exactly those practical questions.',
        rubric: ['Picks two named disciplines', 'Attaches a practical question to each, drawn from the lecture list'] },
    ],
    commonMistakes: [
      'Using radiographer and radiologist as synonyms.',
      'Assuming radiography only happens in hospitals — the lecture lists security, customs and industrial uses.',
    ],
    skills: [
      'Radiographer versus radiologist is the confusion pair, and the suffix separates them: -grapher writes the image, -logist studies it. All six job titles share the same "radio-" and differ only in the verb — who makes, who reads, who treats, who measures.',
    ],
    selfCheck: 'From a blank page, assign each of the six roles its one-line job, then answer the two-metal question about the X-ray tube target.',
    sourceRefs: [{ ref: 'hti.w1b', location: 'Slides 3–9 "What is Radiography?", "Where does the radiation light come?", "Who is working with radiation in hospitals?"' }],
  },
  {
    id: 'hti17103-ionizing-vs-nonionizing',
    subject: 'HTI17103', unit: 'hti.modalities', type: 'comparison',
    title: 'Ionizing vs non-ionizing modalities',
    tags: ['modalities', 'high-yield'],
    lesson: {
      explanation: 'The Week 2 lecture sorts every imaging modality into two columns. Ionizing radiation covers general X-ray, fluoroscopy and angiography, mammography, computed tomography, and radionuclide imaging. Non-ionizing radiation covers magnetic resonance imaging and ultrasonography. Ionization is defined as the ability to free outer-shell electrons; the sources listed are high-energy ultraviolet, characteristic X-ray, electron beams and radioisotopes. The lecture explicitly addresses urban myths about microwave ovens at 2,450 MHz and cell phones at 900, 1,800 and 2,600 MHz, and notes the difference in units — W/kg and tesla for non-ionizing exposure versus J/kg, gray and sievert for ionizing dose.',
      keyFacts: [
        'Ionizing: general X-ray, fluoroscopy/angiography, mammography, computed tomography, radionuclide imaging.',
        'Non-ionizing: magnetic resonance imaging, ultrasonography.',
        'Ionization = the ability to free outer-shell electrons.',
        'Ionizing sources listed: high-energy ultraviolet, characteristic X-ray, electron beams, radioisotopes.',
        'Units differ: W/kg and tesla for non-ionizing; J/kg, gray and sievert for ionizing dose.',
        'MRI uses a magnetic field (permanent or superconductor magnet) and radiofrequency at 6–340 MHz, exploiting water (hydrogen) resonance; it gives good soft-tissue contrast and is non-ionizing.',
      ],
      prerequisites: ['hti17103-what-is-radiography'],
      examples: [],
    },
    memory: {
      chunking: 'Five in the ionizing column, two in the non-ionizing column. Learn the short list: MRI and ultrasound are the only two that do not ionize.',
      comparison: 'The test is not "does it use energy" but "can it free an outer-shell electron". A microwave oven carries far more power than a chest X-ray and still cannot ionize.',
      mnemonic: 'The two safe-from-ionization modalities both work on something other than photons of the X-ray kind: Magnets and Mechanical waves — MRI and ultrasound.',
    },
    practice: [
      { type: 'mcq', prompt: 'Which of these is classed as a non-ionizing modality?', options: ['Computed tomography', 'Mammography', 'Ultrasonography', 'Radionuclide imaging'], answer: 2,
        explanation: 'Ultrasonography sits in the non-ionizing column alongside MRI. CT, mammography and radionuclide imaging are all in the ionizing column.' },
      { type: 'typed', prompt: 'Ionizing radiation is defined by what ability?', accept: ['free outer shell electrons', 'to free outer-shell electrons', 'freeing outer shell electrons', 'free electrons'],
        explanation: 'The ability to free outer-shell electrons. That is the whole definition the lecture gives.' },
      { type: 'matching', prompt: 'Sort each modality into its column.',
        pairs: [['General X-ray', 'Ionizing'], ['Computed tomography', 'Ionizing'], ['Magnetic resonance imaging', 'Non-ionizing'], ['Ultrasonography', 'Non-ionizing']],
        explanation: 'This is the two-column table repeated throughout the Week 2 lecture.' },
      { type: 'mcq', prompt: 'MRI produces its signal by exploiting the resonance of which molecule?', options: ['Sodium', 'Water (hydrogen)', 'Calcium', 'Oxygen'], answer: 1,
        explanation: 'The MRI summary slide names water (hydrogen) molecule resonance, driven by radiofrequency at 6–340 MHz within the magnetic field.' },
    ],
    application: [
      { type: 'scenario', prompt: 'Someone claims their phone is dangerous because it "emits radiation". Answer them using the lecture’s own framing.',
        model: 'Cell phones operate at 900, 1,800 and 2,600 MHz, which is non-ionizing — it cannot free outer-shell electrons, which is the defining ability of ionizing radiation. The lecture flags this exact claim as an urban myth, and notes that the two are even measured in different units: W/kg for non-ionizing exposure versus J/kg, gray and sievert for ionizing dose.',
        rubric: ['Applies the free-an-electron test', 'Cites the frequency range as non-ionizing', 'Mentions the different unit systems'] },
    ],
    commonMistakes: [
      'Assuming higher power means ionizing — power and ionizing ability are different properties.',
      'Putting MRI in the ionizing column because it is a large hospital machine.',
    ],
    skills: [
      'Power and ionizing ability are different properties, and the microwave slide proves it: 2,450 MHz delivers far more watts than a chest X-ray and cannot free a single outer-shell electron. The dividing test is electron-freeing, not energy quantity — which is also why the two regimes are measured in different units entirely (W/kg and tesla versus J/kg, gray and sievert).',
      'MRI and ultrasound are the entire non-ionizing column: learn the short list and sort everything else by elimination. Machine size is not evidence — MRI is a large, expensive hospital magnet and still cannot ionize, because magnetic fields and radiofrequency waves do not free electrons.',
    ],
    selfCheck: 'Write both columns from memory, then answer the phone claim in the lecture’s own framing: the frequencies, the free-electron definition, and the two unit systems.',
    sourceRefs: [{ ref: 'hti.w2', location: 'Slides 3, 5 "Imaging Modalities", "Ionizing vs. non-ionizing Radiation"; slide 49 "MRI - summary"' }],
  },
  {
    id: 'hti17103-modality-detail',
    subject: 'HTI17103', unit: 'hti.modalities', type: 'definition',
    title: 'Modality detail — X-ray, fluoroscopy, CT and nuclear medicine',
    tags: ['modalities'],
    lesson: {
      explanation: 'X-rays were discovered by Wilhelm Conrad Roentgen in 1895 and earned the first Nobel Prize in 1901; Thomas Edison invented X-ray fluoroscopy in 1896. General X-ray moved from film — developing, fixation, washing, drying in a darkroom — to computed radiography from the 1980s, which needs readers but is compatible with PACS, and then to direct digital radiography, which needs no readers, saves time and uses no physical film but is expensive. Fluoroscopy offers real-time monitoring and is applicable intraoperatively, with contrast agents taken orally as barium sulfate solution or injected intravenously as ionic or non-ionic contrast agents. CT was developed because radiologists normally need two views and CT offers a 360-degree view; modern spiral CT gives multiplanar reconstruction and 3D angiographic reconstruction. Radionuclide imaging uses a radiopharmaceutical — a radioisotope combined with a specific compound — to visualise bio-distribution non-invasively; the gamma camera images agents such as technetium-99m MDP for bone scans, thallium-201 for cardiac scans and technetium-99m DTPA for renal function scans.',
      keyFacts: [
        'Roentgen discovered X-rays in 1895; first Nobel Prize 1901. Edison invented X-ray fluoroscopy in 1896.',
        'Film processing sequence: developing → fixation → washing → drying.',
        'Computed radiography: since the 1980s, needs readers, compatible with PACS (picture archiving and communication system).',
        'Direct digital radiography: no readers, time-saving, no physical films, expensive.',
        'Fluoroscopy: real-time, intraoperative, used for angiography, stent installation, bone cement, digestive-system function imaging.',
        'Contrast agents: oral barium sulfate solution; intravenous ionic vs non-ionic agents.',
        'Radiopharmaceutical = a radioisotope plus a specific compound.',
        'SPECT agents are gamma emitters with longer half-lives, less expensive and widely available; PET agents are positron emitters with very short half-lives, more quantitative, expensive and cyclotron-dependent.',
        'Technetium-99m: 6.02 hours, gamma, SPECT. Fluorine-18: 109.75 minutes, positron, PET.',
      ],
      prerequisites: ['hti17103-ionizing-vs-nonionizing'],
      examples: [],
    },
    memory: {
      sequence: 'Film processing is a fixed order: develop, fix, wash, dry. Anything out of order ruins the film, which is why the sequence is worth owning.',
      comparison: 'SPECT versus PET: longer half-life, cheaper, everywhere versus very short half-life, quantitative, needs a cyclotron on site. Half-life is the fact that drives every other difference.',
      wordOrigin: 'Radiopharmaceutical is literally radiation plus drug — the lecture calls the isotope "the siren" and the compound the part that decides where it goes.',
    },
    practice: [
      { type: 'sequence', prompt: 'Order the traditional film processing steps.', items: ['Developing', 'Fixation', 'Washing', 'Drying'],
        explanation: 'The Week 2 slide gives this exact sequence for the old film workflow.' },
      { type: 'mcq', prompt: 'Which of these is a stated disadvantage of direct digital radiography compared with computed radiography?', options: ['It needs readers', 'It uses physical films', 'It is expensive', 'It is not PACS compatible'], answer: 2,
        explanation: 'The lecture lists direct digital radiography as needing no readers, being time-saving and using no physical films — but expensive.' },
      { type: 'typed', prompt: 'What does PACS stand for?', accept: ['picture archiving and communication system', 'picture archiving & communication system'],
        explanation: 'Picture archiving and communication system, named on the computed radiography slide.' },
      { type: 'matching', prompt: 'Match each radionuclide to its imaging technique as tabulated in the lecture.',
        pairs: [['Technetium-99m', 'Gamma, SPECT'], ['Fluorine-18', 'Positron, PET'], ['Iodine-123', 'Gamma, SPECT'], ['Carbon-11', 'Positron, PET']],
        explanation: 'From the "Commonly Used Radionuclides for Imaging and Therapy" table reproduced in the lecture.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A hospital wants to start PET imaging. Using the SPECT/PET comparison, name two practical consequences they must plan for that SPECT would not have required.',
        model: 'First, a cyclotron is required, because PET tracers have very short half-lives and cannot simply be shipped in. Second, robotic handling and the associated expense, since the lecture lists PET as expensive and requiring robotic handling, whereas SPECT is easier to prepare and worldwide available.',
        rubric: ['Names the cyclotron requirement', 'Links it to short half-lives', 'Names cost or robotic handling'] },
    ],
    commonMistakes: [
      'Confusing computed radiography (cassettes plus readers) with direct digital radiography (no readers).',
      'Assuming PET is simply a better SPECT rather than a different trade-off around half-life and cost.',
    ],
    skills: [
      'SPECT versus PET is one fact fanned out into five: half-life. A long enough half-life (technetium-99m, 6.02 hours) means the tracer can be made elsewhere and shipped, so SPECT is cheap and everywhere. Minutes-short (fluorine-18, 109.75 minutes) means the tracer dies before it arrives, so PET needs an on-site cyclotron, robotic handling, and expense. Every other difference on the comparison table is downstream of that one number.',
      'Computed and direct digital radiography differ by exactly one piece of hardware — the reader. CR keeps cassettes and needs readers; DR eliminates them, which buys speed and no physical film at the price of being the expensive option. The MCQ distractor is always the reader.',
      'A radiopharmaceutical is a taxi and a passenger: the radioisotope is what the gamma camera sees, the compound is what decides where it goes — which is how the same technetium serves a bone scan as MDP and a renal function scan as DTPA.',
    ],
    selfCheck: 'From memory: the four film steps in order, CR versus DR (which one needs readers), and the two named radionuclides with their imaging techniques.',
    sourceRefs: [{ ref: 'hti.w2', location: 'Slides 6–41 discovery of X-ray, general X-ray, cassettes, fluoroscopy, CT, radiopharmaceuticals, RNI, SPECT/PET' }],
  },
  {
    id: 'hti17103-radioprotection',
    subject: 'HTI17103', unit: 'hti.protect', type: 'definition',
    title: 'Radioprotective measures and dose limits',
    tags: ['radioprotection', 'high-yield'],
    lesson: {
      explanation: 'The Week 6 lecture gives four radioprotective measures. Time: potential exposure to radiation should be as short as possible, because of the dose-rate issue. Distance: personnel should keep as far as possible from radiation sources, following the inverse square law. Shielding: without obstructing the work, personnel should be protected by shielding as comprehensively as possible. Decay: if the radioactive material cannot be removed, a certain time period should be given until its natural decay, and the relevant concept is half-life — physical, biological and effective. The governing principle is ALARA, as low as reasonably achievable. Dose limits from ICRP Publication 103 are, for radiology workers, 20 mSv per year averaged over five consecutive years with 50 mSv in any single year, and 1 mSv if pregnancy is declared; for the public the limit is 1 mSv in a year. Exposure is monitored with a thermoluminescent dosimeter, whose detection range is 0.05 mSv to 10 Sv but which is not feasible for accidental exposure. Radiation-induced damage is divided into stochastic and deterministic effects.',
      plain: 'Four ways to cut radiation exposure: spend less time near the source, stay further away, shield it, and if the material cannot be moved, wait for it to decay. The rule these all serve is ALARA — as low as reasonably achievable. The lecture also fixes the exam numbers: the dose limits for workers and the public, and the dosimeter used to measure exposure.',
      keyFacts: [
        'Four measures: time, distance, shielding, decay.',
        'Distance works through the inverse square law.',
        'Decay relies on half-life — physical, biological and effective.',
        'ALARA = as low as reasonably achievable.',
        'Worker dose limit: 20 mSv/year averaged over five consecutive years; 50 mSv in any single year; 1 mSv if pregnancy is declared.',
        'Public dose limit: 1 mSv in a year.',
        'TLD detection range: 0.05 mSv – 10 Sv; not feasible for accidental exposure.',
        'Damage paradigm: stochastic effect and deterministic effect.',
        'Medical needs account for over 90% of artificial radiation exposure.',
      ],
      prerequisites: ['hti17103-ionizing-vs-nonionizing'],
      examples: [],
    },
    memory: {
      firstLetter: 'Time, Distance, Shielding, Decay. The first three are the classic trio; this course adds Decay as a fourth, and that is the one most likely to be missed.',
      chunking: 'Three of the four change what you do (stand back, stand behind something, stay briefly). Decay changes when you do it.',
      mnemonic: 'Two limits worth memorising as a pair: 20 for workers averaged, 1 for the public — and 1 again for a declared pregnancy, which drops a worker to public level.',
    },
    practice: [
      { type: 'sequence', prompt: 'List the four radioprotective measures in the order the lecture gives them.', items: ['Time', 'Distance', 'Shielding', 'Decay'],
        explanation: 'Time, distance, shielding and decay, with half-life attached to the decay measure.' },
      { type: 'typed', prompt: 'What does ALARA stand for?', accept: ['as low as reasonably achievable'],
        explanation: 'As low as reasonably achievable — the governing principle of radiation protection in the lecture.' },
      { type: 'mcq', prompt: 'What is the dose limit for a member of the public in a year?', options: ['0.05 mSv', '1 mSv', '20 mSv', '50 mSv'], answer: 1,
        explanation: '1 mSv in a year for the public. Radiology workers are limited to 20 mSv/year averaged over five consecutive years, with 50 mSv in any single year.' },
      { type: 'cloze', prompt: 'The dose limit for radiology workers is ______ mSv per year averaged over five consecutive years, and ______ mSv for any single year.', accept: ['20; 50', '20, 50', '20 and 50'],
        explanation: '20 mSv/year averaged over five consecutive years, 50 mSv for every single year, per ICRP Publication 103.' },
      { type: 'typed', prompt: 'Which device is named as the monitoring tool for high-risk radiation workers?', accept: ['thermoluminescent dosimeter', 'tld', 'thermoluminescent dosimeter (tld)'],
        explanation: 'The thermoluminescent dosimeter (TLD), with a detection range of 0.05 mSv to 10 Sv.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A radiographer must stay in the room during a fluoroscopy case. Which of the four measures can they still use, and which one is unavailable?',
        model: 'Time, distance and shielding are all still available: keep screening time short, stand as far back as the task allows because of the inverse square law, and wear or stand behind shielding. Decay is unavailable, because the X-ray source is switched on and off rather than decaying — decay applies to radioactive material that cannot be removed.',
        rubric: ['Names time, distance and shielding as available', 'Rules out decay', 'Gives the reason: an X-ray tube is not a decaying source'] },
    ],
    commonMistakes: [
      'Listing only time, distance and shielding — this course names four measures.',
      'Confusing the annual averaged worker limit (20 mSv) with the single-year ceiling (50 mSv).',
    ],
    skills: [
      'Decay is the measure that only applies to a source you cannot switch off: time, distance and shielding all work on an X-ray tube, but the tube does not decay — waiting changes nothing about it. The fourth measure exists for radioactive material that cannot be removed, and the fluoroscopy scenario is how the exam tests whether you know that.',
      'The declared-pregnancy limit is the public limit: 1 mSv. A worker drops from the 20 mSv regime to the public one in a single sentence — which is why the numbers are worth holding as a pair (20 averaged / 1 public) rather than as three separate facts.',
      'The TLD is a monitor, not an alarm: its detection range runs 0.05 mSv to 10 Sv for routine wear, and the lecture states outright that it is not feasible for accidental exposure. A wide range does not mean fast response.',
    ],
    selfCheck: 'Write the four measures, both dose limits, and the monitoring device with its range — then check the one most people miss: the fourth measure, decay.',
    sourceRefs: [{ ref: 'hti.w6', location: 'Slides 3, 10–16 TLD, dose limits (ICRP Publication 103), radioprotective measures, ALARA' }],
  },
  {
    id: 'hti17103-radiation-therapy',
    subject: 'HTI17103', unit: 'hti.rt', type: 'sequence',
    title: 'The radiation therapy pathway',
    tags: ['radiation therapy'],
    lesson: {
      explanation: 'In Hong Kong the job title is radiation therapist, previously therapeutic radiographer; in the USA the equivalent roles are radiologic technologists, whose duties differ from those in Hong Kong, and dosimetrists, who specialise in treatment planning and dose calculation. Radiation therapy and oncology services are provided by six public hospitals — Queen Mary, Pamela Youde Nethersole Eastern, Queen Elizabeth, Princess Margaret, Prince of Wales and Tuen Mun — and six private hospitals, giving twelve RT centres in Hong Kong with around 420 registered radiation therapists. The patient pathway runs: diagnosis confirmed by doctors from various specialities, referral to clinical oncology, oncologists meeting the patient and relatives to decide an initial treatment plan, then referral for radiation therapy if that is part of the regimen. The RT planning session then proceeds step by step: determine the treatment position with personalised immobilisation devices to minimise movement, considering patient comfort, treatment accuracy, planning feasibility and reproducibility; then simulation, acquiring medical images for treatment planning and simulating the real treatment setup; then RT treatment planning.',
      plain: 'This is about the job and the treatment pathway, not the physics. In Hong Kong the title is radiation therapist; the USA uses different titles and different duties. Radiotherapy runs in twelve HK centres — six public, six private — with about 420 registered therapists. The pathway: diagnosis, referral to clinical oncology, an initial treatment plan agreed with the patient, then, if radiation is part of the plan, a step-by-step planning session — position, simulation, then planning.',
      keyFacts: [
        'Hong Kong title: radiation therapist (previously therapeutic radiographer).',
        'USA: radiologic technologists (different role) and dosimetrists (planning and dose calculation).',
        'Six public RT hospitals: QMH, PYNEH, QEH, PMH, PWH, TMH. Six private. Twelve RT centres in total.',
        'About 420 registered radiation therapists in Hong Kong.',
        'Not all patients with cancer are referred to clinical oncology.',
        'Planning session step 1: determine treatment position with personalised immobilisation devices.',
        'Immobilisation considerations: patient comfort, treatment accuracy, planning feasibility, reproducibility.',
        'Planning session step 2: simulation — acquire images for planning and simulate the real setup.',
        'Planning session step 3: RT treatment planning.',
      ],
      prerequisites: ['hti17103-what-is-radiography'],
      examples: [],
    },
    memory: {
      sequence: 'Position, simulate, plan. You cannot plan a beam until you know exactly how the patient will lie, and you cannot know that until you have fixed them in place.',
      chunking: 'Six public plus six private equals twelve centres. One number to hold, two halves to derive.',
      firstLetter: 'The four immobilisation considerations: Comfort, Accuracy, Feasibility, Reproducibility. Reproducibility is the one people forget, and it is the reason immobilisation exists at all.',
    },
    practice: [
      { type: 'sequence', prompt: 'Order the three steps of the RT planning session.', items: ['Determine treatment position (immobilisation devices)', 'Simulation — acquire images and simulate the setup', 'RT treatment planning'],
        explanation: 'Steps 1, 2 and 3 as numbered in the Week 3 lecture.' },
      { type: 'typed', prompt: 'What was the previous job title for a radiation therapist in Hong Kong?', accept: ['therapeutic radiographer'],
        explanation: 'Therapeutic radiographer. The current title is radiation therapist.' },
      { type: 'mcq', prompt: 'In the USA, which role specialises in treatment planning and dose calculation?', options: ['Radiologic technologist', 'Dosimetrist', 'Radiation therapist', 'Medical physicist'], answer: 1,
        explanation: 'The lecture names dosimetrists as specialists in treatment planning and dose calculation, distinguishing them from radiologic technologists.' },
      { type: 'typed', prompt: 'How many RT centres are there in Hong Kong in total?', accept: ['12', 'twelve'],
        explanation: 'Twelve — six public hospitals and six private hospitals.' },
    ],
    application: [
      { type: 'scenario', prompt: 'Why does the planning session start with immobilisation rather than with imaging?',
        model: 'Because reproducibility is one of the four stated considerations. The images acquired at simulation are used to plan the beam, so they must be taken in exactly the position the patient will be in for every treatment fraction. Fixing the position first is what makes the planning images meaningful.',
        rubric: ['Names reproducibility', 'Links simulation images to the planned treatment position', 'Explains the ordering as a consequence'] },
    ],
    commonMistakes: [
      'Assuming every cancer patient is referred to clinical oncology — the lecture explicitly says not all are.',
      'Treating simulation as the first step; determining treatment position comes first.',
    ],
    skills: [
      'Immobilisation comes first because reproducibility is the point of everything after it: the simulation images are used to plan a beam that must fire identically at every fraction, so they are only meaningful if taken in the position the patient will actually hold. The order position → simulate → plan is a consequence, not a convention.',
      'The USA titles do not translate one-to-one: "radiologic technologist" and "dosimetrist" split work that a Hong Kong radiation therapist does as one job — planning and dose calculation is a separate specialism there, not a separate person here. Job-title questions are testing that you do not map the roles across.',
    ],
    selfCheck: 'From a blank page: the three planning steps in order, the four immobilisation considerations, and the Hong Kong totals — twelve centres, about 420 therapists.',
    sourceRefs: [{ ref: 'hti.w3', location: 'Slides 2–15 job titles, RT services in HK, patient pathway, planning session steps 1–3' }],
  },
  {
    id: 'hti17103-department-and-request',
    subject: 'HTI17103', unit: 'hti.roleext', type: 'definition',
    title: 'Inside a radiology department: staffing and the request form',
    tags: ['role extension'],
    lesson: {
      explanation: 'The Hospital Authority is organised into 7 clusters, with 39 departments of radiology for medical imaging, 16 A&E radiology services and 6 clinical oncology centres for radiation therapy, employing about 800 diagnostic radiographers and about 180–200 radiotherapists. In one named hospital the staffing example given is 29 radiologists, 84 radiographers and 16 nurses or patient-care assistants. Team work is presented as a requirement: a pair of radiographers, one handling the patient and one controlling the panel; a patient care assistant for patient preparation; and a nurse for CT, MRI and A&E work. The lecture then walks through reading an X-ray request form, whose fields include clinical information, diagnosis, the examination requested — the worked example is "CXR (PA + Lat)" — routine, early or urgent priority, the form of transport, drug allergy and, where applicable, LMP.',
      keyFacts: [
        'Hospital Authority: 7 clusters, 39 departments of radiology, 16 A&E radiology services, 6 clinical oncology centres.',
        'About 800 diagnostic radiographers; about 180–200 radiotherapists.',
        'Staffing example: 29 radiologists, 84 radiographers, 16 nurses / patient-care assistants.',
        'A pair of radiographers: one for patient handling, one for panel controlling.',
        'Patient care assistant prepares the patient; a nurse is involved in CT, MRI and A&E.',
        'Request form fields include clinical information, diagnosis, examination requested, priority, transport, drug allergy and LMP.',
        'The worked request example is a chest X-ray specified as PA + Lat.',
      ],
      prerequisites: ['hti17103-what-is-radiography'],
      examples: [],
    },
    memory: {
      chunking: 'Two radiographers, two jobs: one on the patient, one on the panel. Everything else in the room supports one of those two.',
      location: 'Read a request form the way you would read a boarding pass: who, what examination, how urgent, how they are arriving. Four questions, and the form answers all of them.',
    },
    practice: [
      { type: 'typed', prompt: 'How many clusters is the Hospital Authority organised into?', accept: ['7', 'seven'],
        explanation: 'Seven clusters, containing 39 departments of radiology, 16 A&E radiology services and 6 clinical oncology centres.' },
      { type: 'mcq', prompt: 'In the pair-of-radiographers model, what are the two roles?', options: ['Imaging and reporting', 'Patient handling and panel controlling', 'Preparation and archiving', 'Planning and dose calculation'], answer: 1,
        explanation: 'The lecture describes a pair of radiographers, one handling the patient and one controlling the panel.' },
      { type: 'typed', prompt: 'In the worked request form example, which examination was requested and in which two projections?', accept: ['cxr pa and lat', 'chest x-ray pa and lateral', 'cxr (pa + lat)', 'cxr pa + lat', 'chest x-ray, pa and lat'],
        explanation: 'CXR (PA + Lat) — a chest X-ray in the posteroanterior and lateral projections. These are the only projection abbreviations that appear in the supplied Exploring Radiography lecture set.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A request form gives clinical information "Cough x 2/12. SOB" and diagnosis "Chest infection". Why does the radiographer need those two fields rather than just the examination name?',
        model: 'They tell the radiographer what the image is being asked to answer, which is what the "what is expected to see" question in the Week 1 lecture is about. The examination name says which images to take; the clinical information and diagnosis say what the referrer is looking for, which affects positioning and image assessment.',
        rubric: ['Distinguishes the examination requested from the clinical question', 'Links clinical information to what the image needs to show'] },
    ],
    commonMistakes: [
      'Reading only the "Examination Requested" line and ignoring the clinical information, diagnosis and LMP fields.',
    ],
    skills: [
      'The examination line and the clinical information answer different questions: "CXR (PA + Lat)" says which images to take; "Cough x 2/12, SOB — chest infection" says what the image is being asked to show. Reading only the examination name is the named mistake, and it loses exactly the information that guides positioning and image assessment.',
      'The two-radiographer pair is a split of the room, not a rota: during the exposure one handles the patient and one controls the panel, and neither can swap — which is why the lecture presents teamwork as a requirement rather than a preference.',
    ],
    selfCheck: 'From memory: the HA cluster count, the two radiographer roles, and the worked example examination with its two projections — PA and Lat, the only projection abbreviations the supplied lectures use.',
    sourceRefs: [{ ref: 'hti.w5', location: 'Slides 3–7 Hospital Authority structure, manpower, team work, floor plan, reading the order form' }],
  },
  {
    id: 'hti17103-modality-choice',
    subject: 'HTI17103', unit: 'hti.modalities', type: 'comparison',
    title: 'Structural against functional, and how a modality gets chosen',
    tags: ['modalities', 'high-yield'],
    lesson: {
      explanation: 'The 2026 lecture sorts the imaging modalities two ways at once. First by department: diagnostic radiology runs general (routine) X-ray, vascular interventional imaging, computed tomography, magnetic resonance imaging, ultrasound imaging and nuclear medicine imaging, while radiotherapy runs the linear accelerator (LINAC), 3D conformational radiotherapy (3D-CRT), intensity-modulated radiotherapy (IMRT), image-guided radiotherapy (IGRT), brachytherapy, and heavy ion or proton therapy. Second, and more usefully, by what the image actually shows. Structural imaging indicates anatomical changes, and covers general X-ray, vascular interventional imaging, CT, MRI and ultrasound. Functional imaging indicates physiological changes, and covers nuclear medicine imaging and MRI. MRI appears in both lists, which is the point worth holding on to: the same machine can be asked either question. Choosing between them is not a matter of picking the best machine. The lecture gives three grounds. The structure of interest — bones, soft tissues, or biochemical activities. The disease — tumour heterogeneity, an air/fluid level, fat pad signs. And the patient’s condition. Alongside this the lecture states how a radiographer actually contributes to a diagnosis: to calmly communicate with and comfort patients in preparation, to precisely position them and set the imaging parameters, to safeguard their welfare including radiation dose and safety measures, to stay cautious through the entire intervention, and to provide informative images for diagnosis.',
      keyFacts: [
        'Diagnostic radiology: general (routine) X-ray, vascular interventional imaging, CT, MRI, ultrasound, nuclear medicine.',
        'Radiotherapy: LINAC, 3D-CRT, IMRT, IGRT, brachytherapy, heavy ion / proton therapy.',
        'Structural imaging = anatomical changes: general X-ray, vascular interventional, CT, MRI, ultrasound.',
        'Functional imaging = physiological changes: nuclear medicine, MRI.',
        'MRI is on BOTH lists — structural and functional.',
        'Modality chosen on three grounds: structure of interest, the disease, the patient’s condition.',
        'Structure of interest splits into bones, soft tissues, biochemical activities.',
        'Disease-dependent examples: tumour heterogeneity, air/fluid level, fat pad signs.',
        'Radiographer’s five contributions: communicate and comfort, position and set parameters, safeguard welfare and dose, stay cautious throughout, provide informative images.',
      ],
      prerequisites: ['hti17103-what-is-radiography'],
      examples: [
        'A fat pad sign is the disease deciding the modality: it is an elbow finding read off a plain radiograph, so the cheap structural study is the correct one, not a cross-section.',
      ],
    },
    memory: {
      wordOrigin: 'Structure-al shows the structure; function-al shows the function. IMRT, IGRT and 3D-CRT all end in the same RT — radiotherapy — and the letters in front say what is modulated: intensity, image guidance, or 3D conformation.',
      chunking: 'Six diagnostic modalities and six radiotherapy techniques — the two departments each get six, which makes the pair easy to check you have not dropped one.',
      comparison: 'The one modality on both lists is MRI. If you can say why — the same scanner can be set to report anatomy or physiology — you have understood the distinction rather than memorised two lists.',
      story: 'Three questions decide the modality, and they run outward from the body: what am I looking at (structure), what is wrong with it (disease), and who is on the table (patient condition).',
    },
    practice: [
      { type: 'matching', prompt: 'Sort each modality by what the lecture says its image indicates.',
        pairs: [['Nuclear medicine imaging', 'Functional — physiological changes'], ['Computed tomography', 'Structural — anatomical changes'], ['Ultrasound imaging', 'Structural — anatomical changes'], ['Magnetic resonance imaging', 'Both — the lecture lists it under structural AND functional']],
        explanation: 'Structural imaging indicates anatomical changes; functional imaging indicates physiological changes. MRI is the one modality the lecture places in both groups.' },
      { type: 'mcq', prompt: 'Which of these is a radiotherapy technique rather than a diagnostic modality?', options: ['Vascular interventional imaging', 'Brachytherapy', 'Computed tomography', 'Ultrasound imaging'], answer: 1,
        explanation: 'Brachytherapy is listed under the Department of Radiotherapy, with LINAC, 3D-CRT, IMRT, IGRT and heavy ion / proton therapy. The other three are diagnostic radiology modalities.' },
      { type: 'typed', prompt: 'Name the three grounds the lecture gives for choosing one modality over another.', accept: ['structure of interest, disease, patient condition', 'structure-of-interest, disease-dependent, patient condition', 'structure of interest; disease dependent; patient condition'],
        explanation: 'Structure-of-interest (bones, soft tissues, biochemical activities), disease-dependent (tumour heterogeneity, air/fluid level, fat pad signs), and patient condition.' },
      { type: 'mcq', prompt: 'What does IMRT stand for?', options: ['Image-monitored radiotherapy', 'Intensity-modulated radiotherapy', 'Internal multi-beam radiotherapy', 'Isotope-mediated radiotherapy'], answer: 1,
        explanation: 'Intensity-modulated radiotherapy. Its neighbour on the list, IGRT, is image-guided radiotherapy.' },
    ],
    application: [
      { type: 'scenario', prompt: 'MRI is the only modality the lecture puts under both structural and functional imaging. What does that tell you about the difference between the two categories?',
        model: 'That the categories describe the question being asked, not the equipment. Structural imaging is defined as indicating anatomical changes and functional imaging as indicating physiological changes — so a single scanner that can be set up to report either belongs in both. The category is a property of the study, not of the machine.',
        rubric: ['States the categories describe what the image indicates, not the hardware', 'Names anatomical versus physiological change'] },
      { type: 'scenario', prompt: 'The lecture lists "tumour heterogeneity, air/fluid level, fat pad signs" as disease-dependent grounds for modality choice. Pick one and say what it implies about which modality to use.',
        model: 'An air/fluid level is a boundary between two densities and shows on a plain radiograph taken with the right beam orientation, so it argues for a simple structural study rather than an expensive one. Tumour heterogeneity is the opposite case: variation in biochemical activity across a mass is what functional imaging reports, so it argues towards nuclear medicine. Either answer works provided the modality follows from what the finding actually is.',
        rubric: ['Picks one named disease-dependent ground', 'Connects it to structural or functional imaging with a reason'] },
    ],
    commonMistakes: [
      'Treating structural and functional as a hardware split, then having nowhere to put MRI.',
      'Filing the LINAC with the diagnostic modalities. It is radiotherapy equipment.',
      'Confusing IGRT with IMRT — image guidance against intensity modulation.',
      'Assuming the newest or most detailed modality is the right one; the lecture makes the choice depend on structure, disease and patient condition, not on capability.',
    ],
    skills: [
      'MRI appearing on both lists is the tell: structural and functional describe the question the study asks — anatomical change versus physiological change — not the machine. One scanner can be set to answer either, so treating the split as a hardware divide leaves MRI homeless. That is the whole distinction, tested with one modality.',
      'IMRT and IGRT differ by what is modulated: intensity versus image guidance. The shared "-RT" marks them as radiotherapy techniques, and the front letters name the flavour — the same reading rule as 3D-CRT (conformation) and brachytherapy (brachy = short distance).',
      'The newest or most detailed machine is not the right machine: the choice runs structure of interest → disease → patient condition, and a fat pad sign read off a plain elbow film is the correct study precisely because it answers the actual question — capability is not a selection criterion.',
    ],
    selfCheck: 'Write the two department lists from memory, six each. Then mark every diagnostic one S, F, or both — and check that only MRI carries both.',
    sourceRefs: [
      { ref: 'hti.w1.2026', location: 'p15 "How many modalities are applied in hospitals?" — the diagnostic radiology and radiotherapy lists' },
      { ref: 'hti.w1.2026', location: 'p16 "How Radiographers contribute to Diagnosis" — structural versus functional imaging' },
      { ref: 'hti.w1.2026', location: 'p17 "Why is certain modality chosen?" — structure-of-interest, disease-dependent, patient condition' },
    ],
  },
];

/*
 * Radiograph image questions — schema for later use, not live data.
 *
 * A radiograph question is a normal STUDY_ITEM (any subject/unit) whose
 * `practice` entries carry an extra `image` field: a filename resolved
 * against outputs/assets/xray/. No new item type is needed — `mcq` and
 * `typed` questions both support it as-is, and dimensionFor() already
 * routes any question with an `image` field to the 'location' mastery
 * dimension.
 *
 * Add real cases only once you have a licensed image file AND a genuine
 * sourceRefs entry pointing at a file that exists in the supplied source
 * folders — see outputs/assets/xray/README.md and the project rule at the
 * top of this file. Do not invent positioning notes, landmark facts or
 * mnemonics. The supplied HTI17103/HTI17101 materials only establish "PA"
 * and "Lat" as projection terms so far (see the
 * 'hti17103-department-and-request' item above) — a real case's prompt and
 * explanation text must stay inside what the cited source actually says.
 *
 * Example shape (illustrative only — do not add this object to STUDY_ITEMS):
 *
 * {
 *   id: 'hti17103-cxr-pa-example',
 *   subject: 'HTI17103', unit: 'hti.modalities', type: 'mcq',
 *   title: 'Reading a CXR PA radiograph',
 *   lesson: { explanation: '...', keyFacts: ['...'], prerequisites: [], examples: [] },
 *   practice: [
 *     { type: 'mcq', image: 'cxr-pa-001.jpg',
 *       prompt: 'Which projection is shown here?',
 *       options: ['PA', 'Lat', 'AP', 'Oblique'], answer: 0,
 *       explanation: '...cite exactly what the source says...' },
 *   ],
 *   sourceRefs: [{ ref: 'hti.w2', location: '...' }],
 * }
 */
