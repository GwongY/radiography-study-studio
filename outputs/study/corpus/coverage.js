/*
 * Coverage report — what the supplied sources actually cover, and what they
 * do not.
 *
 * Split out of study-data.js in phase 2026-09-01. outputs/study-data.js is
 * the barrel every importer still uses; nothing imports this file directly
 * except its siblings.
 */

/* ------------------------------------------------------------------ *
 * Coverage report
 * ------------------------------------------------------------------ */

export const COVERAGE = {
  generated: 'Built from the full-depth shared-drive catalogue plus the filename-sorted New source inbox. Current 2026/27 files control the syllabus, dates and assessment; older official lectures fill a named current topic only where its 2026 teaching file is absent. Student work and duplicate copies do not supply factual claims.',
  subjects: [
    {
      id: 'HSS2011', status: 'mapped',
      covered: [
        'Anatomical position, directional terms, planes, cavities, regions and quadrants',
        'Axial and appendicular skeleton; bone shapes; long bone structure; bone functions',
        'Vertebra structure, vertebral column regions and curvatures, atlas and axis',
        'Skull bones and the four sutures',
        'Pectoral girdle, upper limb bones, carpal rows',
        'Pelvic girdle, lower limb bones, tarsal bones',
        'Thoracic cage, thoracic inlet, mediastinum',
        'Joint classification, synovial joint structure, movements and their joints',
        'The six synovial joint types with worked examples, sorted by axes of movement',
        'Tap-to-identify structure sets on the 3D model with a three-state reveal: all 8 carpals, all 7 tarsals, 12 skull bones and the vertebral regions',
        'Word parts — prefixes, suffixes and roots, and how to take an unfamiliar term apart',
        'Rotator cuff and full abduction sequence',
        'The current Weeks 2–4 movement self-study deck: regional flexion and extension, rotation, abduction and adduction, forearm rotation, ankle and foot movement, thumb movement and circumduction.',
        'Week 7 Special Senses from an older official HSS2011 lecture, six items at full source-backed depth: accessory structures of the eye (lids, lacrimal drainage chain, extrinsic muscles + CN III/IV/VI), the eyeball (three tunics, optical media, retinal landmarks, pupillary muscles), the visual projection pathway alone (chiasm hemidecussation, LGN, radiation, occipital cortex, collicular reflex branch), outer/middle/inner ear with cochlea and the auditory pathway, static vs dynamic equilibrium, and taste with the olfactory pathway.',
      'The four teaching modules, NUMBERED BY THE 2026 ORIENTATION DECK: 1 Musculoskeletal, 2 Nervous, 3 Cardiovascular and pulmonary, 4 Digestive and urogenital. Every source folder on the drive uses the older ordering (1 Thorax … 4 Musculoskeletal) and the app now prints both.',
      'What the subject is and how it is marked: the objective, the four modules, and the 8 / 32 / 60 assessment split with which parts are open book.',
        'The confirmed 2026/27 subject description form: the six intended learning outcomes, the official module titles, what each module contains, the 129-hour study effort and the set text.',
      'Bone histology — the two matrix components and the four cell types — and red versus yellow marrow.',
      'Muscle organisation from epimysium to myofilament, the five fascicle arrangements, tendon and its two junctions, origin and insertion, the motor unit and muscle tone.',
        'Thoracic regional anatomy: sternal angle (manubriosternal junction at T4/T5, 2nd costal cartilage, superior/inferior mediastinum boundary), carina bifurcation at T4/T5, thoracic inlet (T1, 1st rib) vs outlet (T12, 12th rib) boundaries, intercostal neurovascular bundle (VAN + lymphatics), and diaphragm innervation by phrenic nerves (C3–C5) draining to IVC.',
        'Upper limb full regional depth (Week 2): Brachial plexus roots (C5–T1), trunks, divisions, cords, and terminal branches; arm anterior (biceps, brachialis, coracobrachialis; musculocutaneous n.) and posterior (triceps brachii; radial n.) compartments; forearm flexor-pronator (median/ulnar nn.) and extensor-supinator (radial n.) groups; carpal tunnel boundaries and contents (median n. + 9 digital flexor tendons); palmar spaces and intrinsic hand muscles (thenar, hypothenar, lumbricals, interossei); cubital fossa and anatomical snuffbox boundaries and contents; scapulohumeral rhythm (2:1 ratio) and rotator cuff stabilizing mechanics.',
        'Lower limb full regional depth (Week 3): Pelvic girdle sexual dimorphism (subpubic angle, pelvic brim, sacral curvature, sciatic notches); thigh anterior (quadriceps, sartorius; femoral n.), medial (adductors, gracilis; obturator n.), and posterior (hamstrings; tibial/fibular nn.) compartments; gluteal muscles and Trendelenburg sign (superior gluteal n. innervating gluteus medius/minimus); leg anterior (deep fibular n.), lateral (superficial fibular n.), and posterior (tibial n.) compartments; femoral triangle boundaries and contents (NAVL in femoral sheath vs femoral n. outside); popliteal fossa boundaries and neurovascular contents; knee joint stabilizing ligaments (ACL, PCL, MCL, LCL) and menisci; foot arches (medial longitudinal, lateral longitudinal, transverse) with dynamic and passive ligamentous/plantar aponeurosis support.',
        'Head and neck full regional depth (Week 4): Cranial fossae (anterior, middle, posterior) and cranial nerve exit foramina; paranasal sinuses (frontal, ethmoidal, sphenoidal, maxillary) drainage; SCALP layers (danger area) and emissary veins; facial expression muscles innervated by CN VII; mastication muscles innervated by CN V3 and temporomandibular joint (TMJ) dual hinge-glide kinematics; neck triangles (anterior and posterior) and cervical spine biomechanics (C1 atlas, C2 axis odontoid process, transverse ligament of atlas, typical cervical vertebra characteristics).',
        'Figure library expansion: 21 CC-BY licensed anatomical figures (OpenStax Anatomy and Physiology / Wikimedia Commons) registered in outputs/figures.js with structured intros and callout keys for all Weeks 1–4 osteology, joint, and module lessons.',
        'Cardiovascular and lymphatic full regional depth (Week 8, from hss.1.1 / hss.1.2 with the Module 1.2 revision exercises): pericardium (fibrous vs serous, pericardial cavity), heart wall layers and cardiac muscle histology (intercalated discs, gap junctions, desmosomes); the four chambers with septa, fossa ovalis, pectinate muscles, trabeculae carneae and moderator band; AV valves (tricuspid, mitral) with chordae tendineae and papillary muscles, semilunar valves and the fibrous skeleton; coronary circulation (LCA → LAD and circumflex, RCA → marginal and posterior interventricular; cardiac veins → coronary sinus) and the conduction system (SA node, AV node, bundle of His, bundle branches, Purkinje fibres); blood-vessel histology (three tunics; elastic vs muscular arteries, arterioles; continuous, fenestrated and sinusoid capillaries; venous valves and capacitance); the lymphatic system (lymph, lymphatic capillary minivalves, lacteals; thoracic duct vs right lymphatic duct territories and the cisterna chyli; primary vs secondary lymphoid organs; lymph node microarchitecture).',
        'Respiratory full regional depth (Week 9, from hss.resp / hss.1.2 with the Module 1.1 revision exercises): upper tract and the nine laryngeal cartilages; trachea (C6–T5, 2.5 cm × 11 cm, 15–20 C-rings, trachealis) and the bronchial tree (right vs left main bronchus geometry, lobar and segmental bronchi, cartilage-to-muscle gradient, conducting vs respiratory division); respiratory epithelium along the tract, the mucus escalator, pulmonary lobule, type I / type II pneumocytes and alveolar macrophages, the three-layer respiratory membrane; gross lung anatomy (lobes, fissures, cardiac notch, hilum RALS), the pleura and pleural recesses, and the dual (pulmonary + bronchial) blood supply; mechanics of ventilation (Boyle’s law, diaphragm + external intercostals for quiet inspiration, passive quiet expiration, accessory muscles of forced breathing) with phrenic nerve (C3–C5).',
        'Thorax regional anatomy full depth (Week 10, from hss.1.3 / hss.thorax.deck / hss.1920.m1.thorax with the Module 1.3 revision exercises and the 2017/18 past paper): sternum and sternal angle, rib classification (true/false/floating), a typical rib and its costovertebral and costotransverse joints, the costal-groove VAN bundle; thoracic inlet and outlet boundaries and the diaphragm with its three apertures (IVC T8, oesophagus T10, aorta T12); the mediastinum — boundaries, the T4/T5 dividing plane, and the contents of the superior mediastinum and of the anterior, middle and posterior parts of the inferior mediastinum; surface anatomy — the four heart-valve auscultation areas and the lung-vs-pleura inferior projections (6-8 / 8-10 / 10-12) with the costodiaphragmatic recess and safe thoracentesis; the mammary gland — position and axillary tail, lobes / lactiferous ducts and sinuses / suspensory ligaments of Cooper, arterial supply, and the axillary (~75%) vs parasternal lymphatic drainage that governs breast-cancer staging.',
        'Figure library expansion (Weeks 8–10): 9 further CC-BY figures (OpenStax / Wikimedia Commons) — cardiac conduction system, coronary circulation, lymph node structure, larynx, gross lungs, thoracic cage, diaphragm apertures, mediastinal divisions and the mammary gland — registered in outputs/figures.js with intros and callout keys.',
      ],
      gaps: [
        'The slow/fast oxidative/glycolytic comparison table in the 2026 Module 1 deck is an image with no extractable text; fibre types remain covered from the official older physiology notes (phys.susan9).',
        'Current 2026 teaching files are available for Week 1 and the Weeks 2–4 movement self-study. Week 7 Special Senses and the remaining Modules 2–4 topics are covered from older official HSS2011 lectures, so their source dialogs deliberately show older dates and numbering.',
        'MOOC 1–3 are now carried: the stroke-correlates item teaches cerebral arterial supply from MOOC 2 (internal carotid → ACA/MCA, vertebral → basilar, the cerebral arterial circle) and the spinal-cord/meninges item cites MOOC 2 for the dural venous sinuses and meningeal layers; MOOC 3 supplies the tract/decussation, glial and special-sense depth inside the Module 2 items. The MOOC "where/what/how" cortical-stream framing (MOOC 3 p24) stays background, not a lesson.',
        'Detailed muscle attachments beyond those named in the revision-exercise answers were deliberately not added.',
        '1920_M2_L5_nervoussystem.pdf and 1920_M2_L6_neuroanatomy.pdf (Lecture ppt_1920/Module 2, two folder copies each) are the same 19/20 Module 2 lectures as the already-carried decks: L5 matches hss.2.2 (3.2 Nervous System and Special Sense — ear, equilibrium and gustation phrases all present) and L6 matches hss.2.3 (3.3 Neuroanatomy — reticular formation, corpus callosum, lateral geniculate and the rest all present), content-compared on the drive rather than by filename. Nothing new to carry.',
        '21 free CC-BY licensed anatomical figures (OpenStax Anatomy and Physiology / Wikimedia Commons) have been vetted, attributed, and registered for Weeks 1–4 lessons with structured intros and callout keys. Advanced modules (Modules 2–4 beyond Week 4) continue to use authored schematics and 3D studio models until their respective expansions.',
        'Uncited HSS2011 primary lecture copies on the drive (e.g. 1819_L8–L10, Anatomy of Head and Neck, Anatomy of Upper and Lower Limbs, The Musculoskeletal System) show 91–100% vocabulary overlap with cited decks hss.4.1, hss.4.2, and hss.4.3; they represent duplicate/prior-year distributions and contain no unrepresented syllabus topics.',
        'The Module 1.3 thorax slide decks (hss.1.3 / hss.thorax.deck / hss.1920.m1.thorax) are unusually sparse — most slides are figure labels with almost no prose. The Week 10 rib, mediastinum and breast items therefore carry the standard descriptive anatomy in the explanation but anchor every testable claim to the citable points that do exist: the deck labels (sternal angle T4/T5, VAN, diaphragm hiatus levels, mediastinal divisions, auscultation, breast tail into axilla, axillary venous drainage) plus the Module 1.3 revision-exercise MCQs and fill-in-blanks and the 2017/18 past paper (inlet exclusions, oesophagus in the superior + posterior mediastinum, inferior cardiac surface on the diaphragm, right-vs-left lymphatic duct territory, internal thoracic artery to the medial breast, azygos into the SVC at T4). Rib true/false/floating classification and the lactiferous-duct / Cooper’s-ligament terms are taken from the Study Manual glossary and fill-in-blank answers.',
      ],
      files: 138,
    },
    {
      id: 'ABCT2326', status: 'mapped',
      covered: [
      'The cell itself: plasma membrane and its six protein classes, the membranous and non-membranous organelles, the nucleus and the genetic code, transcription and translation, the cell cycle, mitosis and meiosis.',
      'Four tissue types, eleven organ systems, and each tissue in detail: epithelial classification by shape and by layers plus the glandular split, the three connective tissue classes with the blood argument, the three muscle types, neurons and neuroglia.',
      'Homeostasis, autoregulation vs extrinsic regulation, receptor–control centre–effector, and both feedback loops with the lecture’s worked examples (body temperature, blood clotting).',
        'Pulmonary and systemic circuits; heart chambers, valves, cardiac skeleton',
        'Blood composition, plasma proteins, vessel wall layers',
        'Respiratory pathway and conducting vs respiratory zones',
        'Digestive tract order, accessory organs, six functions',
        'Nephron tubule order, urine drainage pathway, GFR figures',
        'Hormone delivery classes and endocrine gland principle',
        'Lymphatic return and MALT',
        'Cardiac conducting system: SA node, pacemaker potential, AV delay, bundle of His, Purkinje fibres',
        'ECG waves and intervals, cardiac cycle, stroke volume, Frank–Starling law, heart sounds, refractory period',
        'Gas exchange at the alveolus, oxyhaemoglobin and saturation, and the full control-of-respiration reflex set',
        'Ventilation mechanics and compliance; respiratory muscles; rate, volumes and capacities; restrictive versus obstructive patterns.',
        'Oxygen loading and unloading, curve shifts and the Bohr effect; carbon-dioxide transport, chloride shift and PCO₂ feedback.',
        'Digestive wall and enteric reflexes; gastric cells, acid production and three control phases; small-intestinal absorption, pancreatic enzymes, bile, duodenal hormones, colon and water balance.',
        'Inflammation, the complement pathways and the membrane attack complex, active vs passive and cell- vs antibody-mediated immunity',
        'Reproductive physiology from the readable older official lecture: male hormonal control, ovarian and menstrual cycles, fertilisation and implantation, placenta, pregnancy and parturition.',
        'Nerve cell physiology: neuron structure and 100 billion brain count, neuroglia (astrocytes, ependymal cells, oligodendrocytes in CNS vs Schwann cells in PNS), resting membrane potential (50–70x K+ passive permeability, 3 Na+ out / 2 K+ in ATPase), action potential dynamics (+25 mV peak, all-or-none law, absolute/relative refractory periods), saltatory conduction at nodes of Ranvier (1–2 mm spacing), gap junctions, and acetylcholine synaptic transmission / EPSP.',
        'Renal microarchitecture and quantitative dynamics: >1 million nephrons, 100–400x capillary fenestrations, GFR (115 ml/min female, 125 ml/min male, 180 L/day filtrate), 400 ml/day minimum obligate volume, 6% basal resting energy cost, 65% PCT + 20% Henle reabsorption (85% early hydration-independent), 1400 mOsm/L countercurrent multiplier gradient, RAAS axis (renin, pulmonary ACE, aldosterone), and detrusor bladder muscle.',
        'Muscle ultrastructure, energetics and motor control: ~40% male / 32% female body mass, titin Z-disc elastic recoil, troponin complex spacing at every 7 actins, 10x larger SR Ca2+ release channels, ~20 fibres/motor unit in eye, VO2 max (12–84 ml/min/kg) and lactate threshold (50–70% VO2 max), Type I (red slow oxidative) vs Type IIX (white fast glycolytic) phenotypes, myostatin satellite cell inhibition, basal ganglia loops (Parkinson\'s dopamine loss vs Huntington\'s chorea), and osteon bone remodeling (1/5 adult skeleton/year).',
        'Cardiovascular hemodynamics and conduction mechanics (Tut2_CVS): vascular resistance determinants (vessel diameter R ∝ 1/r⁴, length, blood viscosity, and flow turbulence; independent of interstitial fluid osmolarity), venous system as primary high-capacitance blood reservoir (~64%), blood colloid osmotic pressure governed by plasma proteins (albumin), and cardiac conduction sequence with AV nodal backup pacemaker rate (40–50 bpm) if SA node fails.',
        'Renal countercurrent multiplier and exchanger dynamics (Supplementary info - Renal): 6-step coordination between loop of Henle and vasa recta; active NaCl extrusion from thick ascending limb, medullary interstitial hyperosmolality, descending limb osmotic water extraction, vasa recta oncotic water recovery via plasma proteins, solute trapping, and aquaporin-facilitated water diffusion.',
        'Respiratory mechanics and medullary chemoreceptor control (Tut3_Resp): upper tract air conditioning, vital capacity definition (maximal expiration after maximal inspiration), normal arterial PO2 (~100 mmHg) in severe anemia without red blood cells due to dissolved plasma oxygen equilibration, venous-arterial PCO2 gradient (45 vs 40 mmHg), medullary rhythmicity neurons, and central chemoreceptor stimulation by CSF H+ derived from blood CO2.',
        'Renal tubular transport, sympathetic regulation and continence (Tut5_Renal): PCT bulk reabsorption of nutrients and passive urea recycling (~50%), cortical short vs juxtamedullary long nephron loops (beaver adaptation), sympathetic renal vasoconstriction and renin release, aldosterone-accelerated DCT sodium reabsorption, ADH water retention, and voluntary control of external urethral sphincter.',
        'Neuroglia functions, action potential refractory mechanics, and synaptic storage (Tut8_Nervous): astrocytes forming blood-brain barrier, phagocytic microglia, motor neurons transmitting from CNS to effectors, action potential repolarization driven by K+ efflux, absolute refractory period spanning depolarization through early repolarization due to Na+ channel inactivation, myelin sheath propagation velocity, and synaptic vesicle neurotransmitter storage.',
        'ABCT2326 Weeks 1–5 Full Depth & Visuals Rollout (SP5): all 33 items across Weeks 1–5 (W1 cell/tissue: 11, W2 cardiovascular: 6, W3 respiratory: 7, W4 digestive: 5, W5 renal: 4) expanded to full pilot standard (~3,000–5,000 chars each), carrying 10 key facts, 4 practice questions, clinical scenario with 3-point rubric, memory aids, common mistakes, skills, self-checks, and verified source citations.',
        'Figure library expansion for physiology: 19 CC-BY licensed figures (OpenStax Anatomy and Physiology / Wikimedia Commons) registered in outputs/figures.js with structured intros and callout keys for all Weeks 1–5 physiology lessons (cell anatomy, membrane, mitosis, tissues, heart anatomy, conduction, vessels, respiratory tract, alveoli, ventilation, spirometry, oxyhemoglobin curve, digestive overview, wall layers, stomach glands, villus, liver lobule, kidney gross anatomy, nephron microvasculature, glomerular membrane, countercurrent multiplier, and nephron transport).',
      ],
      gaps: [
        'Blood pressure measurement is taught in Lab 1 (Measuring Blood Pressure) and hemodynamic resistance determinants are covered in Tut2_CVS; autonomic baroreceptor reflex regulation is integrated with the control of respiration.',
        'The current 2026 reproductive-system lecture has not been supplied. The Week 7 notes therefore use the readable official 2020/21 Lec6_Reproduction.pdf and say so.',
        'The 29-chapter question blank, the per-system tutorial-answer PDFs and the 2020/21 Lec1–Lec10 deck set are catalogued; Weeks 1–5 are fully mapped into 33 pilot-standard lessons, while Weeks 7–13 will follow in SP6.',
      ],
      files: 191,
    },
    {
      id: 'HTI17103', status: 'substitute',
      covered: [
        'What radiography is; the six radiation-related professional roles',
        'Ionizing vs non-ionizing modality split; MRI principles',
        'General X-ray, film processing, CR vs DDR, PACS',
        'Fluoroscopy and contrast agents; CT; radionuclide imaging; SPECT vs PET',
        'Time, distance, shielding, decay; ALARA; ICRP dose limits; TLD',
        'Radiation therapy roles, HK service structure and the three planning steps',
        'Radiology department staffing and reading an X-ray request form',
        'The 2026 subject shape itself: eight sessions, the three contact-hour components, both assessments and the Observation Day.',
        'Linear accelerator physics and treatment head components: microwave RF generation (magnetron vs klystron at ~3 GHz), accelerating waveguide, bending magnets, low-Z flattening filter and horns, and dual ionization chambers.',
        'Linac accessories and bunker radiation protection: Cerrobend blocks (70°C melting point, 25 lbs hazard), independent jaws (<0.5% transmission), dynamic wedges (30 cm field width), multileaf collimators (3 cm/s leaf speed, 1.8% transmission), photoneutron hazards above 10 MV, and 5 m maze entrance shielding.',
        'Linear accelerator electron therapy and RapidArc/VMAT delivery: electron scattering foils, lead/Cerrobend cut-outs, NACP energy estimation (E = 2.33 x d50), 120-leaf dynamic MLC, continuous gantry rotation (6 deg/s), variable dose rate (600 MU/s), Progressive Resolution Optimization (10 to 177 control points), and NPC treatment time reduction from 12–20 min to 3 min.',
        'Evolution of modern radiotherapy modalities (Palma et al. 2010): 2D planar anatomy, 3D-CRT volumetric CT planning, static-field IMRT beamlets and risks (prolonged delivery up to 45 min, higher integral dose and secondary malignancy risks), and rotational arc therapy (Tomotherapy and VMAT) achieving continuous gantry rotation, monitor unit reduction, and fast delivery in minutes.',
        'Liver SBRT and selective internal radiation therapy (SIRT / radioembolization) for hepatocellular carcinoma (Bujold & Dawson 2011): 4D respiratory motion control for up to 3 cm cranio-caudal liver excursion, fiducial marker placement in non-neoplastic liver to avert cirrhotic hemorrhage, classic RILD (anicteric ascites, alkaline phosphatase elevation) vs non-classic RILD, and hepatic arterial radioembolization with Yttrium-90 (90Y) pure beta microspheres (2.7 d half-life, 3 mm tissue penetration) delivering 100–150 Gy without prolonged isolation.',
      ],
      gaps: [
        'PARTLY RESOLVED. The 2026 teaching schedule under the real subject code has since been supplied, and so has the 2026 opening lecture — by Liang-Ting Lin, the lecturer that schedule names. The LECTURE SET is still HTI17101 Exploring Radiography, which is why the status stays substitute; but the schedule confirms the substitution topic by topic — every session it lists has a lesson built from the HTI17101 material — and the subject’s own shape (26 contact hours, worksheet 50%, seminar 50%, the two-day hospital observation) is now sourced from the real document. Linear accelerator physics and beam collimation accessories are now covered in unit hti.rt from Dr. Ricky Chau\'s official lecture series (Prince of Wales Hospital).',
        'Projection terminology: only "PA" and "Lat" appear anywhere in the supplied lecture set, in one worked chest X-ray request form. "AP" and "oblique" do not appear, so no items claim them.',
        'MI and RT worksheets are student submissions and were used only to confirm topic scope, not as fact sources.',
      ],
      files: 84,
    },
    {
      id: 'APSS1A08', status: 'limited',
      covered: [
        'The current 2026/27 subject objective, three intended learning outcomes, full thirteen-week schedule, assessment weights, generative-AI permissions and deadlines.',
        'Topic 01: sociology and the sociological perspective, personal versus social explanations, educational opportunity, the global perspective, research-to-policy change, and Marx versus Weber on social change.',
      ],
      gaps: [
        'Official teaching notes are still missing for T02A Functionalism/social institutions/conflict, T02B modern contemporary theorists, T03 Socialization, T04 Social Interaction, T05 Social Stratification and Social Class, T06 Sexuality and Society, T07 Gender Stratification, and T08 Deviance. Each appears as an explicit weekly gap in the Course tab.',
        'Older student assignments, homework and term papers were reviewed only as scope evidence and were not used for factual lessons.',
        'The current syllabus contradicts itself on the set text: p3 says there is no textbook, while p5 labels Macionis (2024) Sociology, 16th ed., as “Textbook”. The Course tab shows both statements.',
      ],
      files: 19,
    },
    {
      id: 'DSAI1202', status: 'limited',
      covered: [
        'The current Week 1 overview: where AI appears in everyday life and healthcare, the definition of AI literacy, the subject’s non-programming/non-mathematical scope, its generative-AI policy, and its full tentative schedule and assessment split.',
      ],
      gaps: [
        'DSAI1202 is newly offered in 2026/27. Unlike HSS2011 and ABCT2326, which have years of official lecture decks in the shared folders to fall back on, there is no earlier edition of this GUR subject anywhere in the 22 folders — the Week 1 overview is the only teaching material that exists, so the missing weeks cannot be substituted from an older year.',
        'Only the Week 1 overview is supplied. Official teaching notes remain missing for Weeks 2–12: AI Overview; GenAI and chatbots; Machine Learning I/II; Deep Learning; Data Analytics and Visualization; the two IC-visit topic pairs; and the additional-topics/review week. Each is named as a weekly gap in the Course tab.',
      ],
      files: 1,
    },
    {
      id: 'LEI1101', status: 'none',
      covered: [],
      gaps: [
        'No file in any of the 22 shared folders matches LEI1101.',
        'ELC1011 and ELC1012 exist but are different subjects and have not been substituted.',
      ],
      files: 0,
    },
  ],
  /* Sorted by the literal inbox filename before classification. A file can be
     useful for administration without being valid teaching content; this list
     makes that distinction visible instead of treating every upload as notes. */
  newSourceIntake: [
    { file: '1.+Week1-Overview.pptx', role: 'Teaching + administration', used: 'DSAI1202 Week 1 lessons, weekly topic plan, assessment and AI policy' },
    { file: 'ABCT2326_SubjectDescriptionForm_screenshot.jpg', role: 'Administration support', used: 'Objective and subject framework; current overview controls the detailed assessment split' },
    { file: 'ABCT2326_TeachingSchedule2026_OptRad_screenshot.jpg', role: 'Timetable', used: 'ABCT2326 Group 4 dates, rooms, teachers and lab rotation' },
    { file: 'Course Overview - Group 4.pdf', role: 'Current administration', used: 'ABCT2326 topics, one 35% quiz, three 5% lab reports and 50% final exam' },
    { file: 'ER_Lec1%282026%29.pdf', role: 'Current teaching', used: 'HTI17103 opening lecture and current modality-choice material' },
    { file: 'HSS2011_Schedule_AssessmentAndDates_2026_screenshot.png', role: 'Assessment schedule', used: 'HSS2011 8% + 32% + 60% split and four revision deadlines' },
    { file: 'HSS2011_ScheduleLearningTeaching2026_screenshot.png', role: 'Teaching schedule', used: 'HSS2011 thirteen-week topic sequence and test date' },
    { file: 'HSS2011_Wk1__orientat_intro.pdf', role: 'Teaching + administration', used: 'Current module numbering, assessment overview and anatomical orientation' },
    { file: 'HTI17103_TeachingSchedule2026.pdf', role: 'Current timetable', used: 'Actual subject sessions, observation days and 50% + 50% assessment' },
    { file: 'Introduction to Sociology (2026-2027 Sem.1).pdf', role: 'Current syllabus', used: 'APSS1A08 objectives, topics, assessments, AI permissions and deadlines' },
    { file: 'Lecture 1 - Cells and Body Organization.pdf', role: 'Current teaching', used: 'ABCT2326 Week 1 cell and tissue lessons' },
    { file: 'SDFHSS2011_2627confirmed.pdf', role: 'Current syllabus', used: 'HSS2011 outcomes, module contents, study effort and reading list' },
    { file: 'Self-study terminology of movements--for Week 2-4.pdf', role: 'Current teaching', used: 'HSS2011 Weeks 2–4 movement map; image-led pages checked with OCR and rendering' },
    { file: 'Topic 01.pdf', role: 'Current teaching', used: 'All APSS1A08 Topic 01 lessons' },
    { file: 'W1_MusculoskeletalSystem_2026_CKK_upload.pdf', role: 'Current teaching', used: 'HSS2011 Week 1 musculoskeletal lessons' },
  ],
  duplicates: [
    { what: 'HSS2011 Study Manual 1819', where: ['Year 1 Sem 1 Source / HSS2011 Human Anatomy / Study Manual 1819.pdf', 'Radiography Sources / Yr1 Sem1 Radiography / HSS2011 Human Anatomy / Human Anatomy Manual 1819.pdf', 'White group sources / Year 1 / Radiography Yr1 Sem1 / HSS2011 Human Anatomy / Human Anatomy Manual 1819.pdf'] },
    { what: 'HSS2011 module lecture PDFs (0, 1.1–1.3, 2.x/3.x, 4.1–4.3)', where: ['Year 1 Sem 1 Source / … / Previous Years', 'Radiography Sources / Yr1 Sem1 Radiography / HSS2011 Human Anatomy'] },
    { what: 'HSS2011 past papers 2012-13 to 2017-18', where: ['Year 1 Sem 1 Source / HSS2011 Human Anatomy / Final Exam', 'Radiography Sources / … / Past Paper', 'Green source / year 1 sem 1 / HSS2011 Human Anatomy (named 2012"13.pdf … 2017"18.pdf)'] },
    { what: 'HSS2011 revision-exercise model answers', where: ['Revision Exercise Answer.pdf (standalone)', 'Study Manual 1920.pdf, Appendix — identical content'] },
    { what: 'ABCT2326 lecture decks', where: ['Year 1 Sem 1 Source / ABCT2326 Human Physiology / <system folders>', 'Radiography Sources / … / ABCT2326 Human Physiology / Lecture Note'] },
    { what: 'ABCT2326 past papers 2014-15, 2016-17, 2017-18', where: ['Year 1 Sem 1 Source / … / Final Exam', 'Radiography Sources / … / Past Paper', 'Green source / year 1 sem 1 / ABCT2326 Human Physiology'] },
    { what: 'Exploring Radiography MI and RT worksheets', where: ['Green Group Source / Exploring Radiography', 'Green Group Source / Others / Temp all / Exploring Radiography', 'Radiography Sources / … / Assignment'] },
  ],
  conflicts: [
    {
      what: 'The subject description form and the orientation deck title the HSS2011 modules differently',
      detail: 'The confirmed 2026/27 description form calls them Module I Musculoskeletal system, II Neuroanatomy, III The Thorax, IV The Abdomen and Pelvis. The Week 1 orientation deck names the same four modules by what they contain — musculoskeletal, nervous, cardiovascular and pulmonary, digestive and urogenital. They are the same modules in the same order, so this is a naming difference rather than a disagreement; but it matters because the form’s names for Modules III and IV are exactly the names the OLD source folders use, which is what made the old numbering look right for so long.',
      handled: 'The app titles the modules from the description form, describes them in the deck’s words, and prints the old folder number under every lesson. Both documents are cited.',
    },
    {
      what: 'The two ABCT2326 immune documents disagree on how many complement proteins there are',
      detail: 'The Week 10 slide deck says "Plasma contains 30 special complement (C) proteins". The lecturer\'s own prose notes filed in the same folder say "The blood plasma contains 11 special complement (C) proteins", in an otherwise identical sentence. Both are course material by the same author, neither corrects the other, and nothing else on the drive settles it. Counting the named C proteins gives eleven; counting the whole system including its factors gives about thirty, so the two are probably answering different questions — but that reading is inference, not something either document states.',
      handled: 'Both numbers carried, both cited, and the lesson says they disagree. The item teaches the cascade instead, and its common-mistakes list warns against quoting either count as settled.',
    },
    {
      what: 'HSS2011 module numbering differs between the two shared folder sets',
      detail: 'The "Year 1 Sem 1 Source" set numbers Module 2 as Neuroanatomy and Module 3 as Abdomen and Pelvis, matching the Study Manual 1920. The "Radiography Sources" set numbers them the other way round, and the underlying lecture PDFs still carry the older numbering (2.x for abdomen, 3.x for neuro). This app follows the Study Manual 1920 ordering and records the original filename in every source reference.',
      handled: 'Followed the newer manual ordering; original filenames preserved in the source dialog.',
    },
    {
      what: 'A model answer conflicts with its own study-guide text',
      detail: 'Module 1.1 fill-in-blank 1 asks for the epithelium of the oropharynx. The answer key gives "pseudostratified ciliated columnar epithelium", while the Submodule 1.1 study guide asks students to identify the areas lined with stratified squamous epithelium and understand why. Rather than propagate either reading as settled, no study item was generated from this question.',
      handled: 'Question excluded from the corpus and flagged here instead.',
    },
    {
      what: 'Two revision answers are ambiguous as written',
      detail: 'Module 3.2 MCQ 2 asks for "the tubular portion that is distal to the loop of Henle" with "ascending limb" keyed as correct, which only holds if "distal" means the later part of the loop rather than the segment after it. Module 3.3 MCQ 2 places the caecum in the "false pelvis" rather than the right iliac region. Neither was turned into a study item.',
      handled: 'Both questions excluded from the corpus.',
    },
    {
      what: 'RESOLVED — the "Generic Anatomy" material is the same subject under its old code',
      detail: 'A large topic-sorted question bank and 11 past papers sit under folders naming "Generic Anatomy" and "HSS201", which raised the question of whether they belong to a different subject. The 2012-13 paper header settles it: it reads "HSS201/HSS2011(2012) Final Exam", writing both codes together, so HSS201 is simply the predecessor code for HSS2011. The topic list also maps cleanly onto Modules 0-4, and some wording is near-verbatim — the bank asks for "tip to tip attachment of the thumb with any one of the fingers", which is the Module 0 slide almost word for word.',
      handled: 'Accepted as in scope and registered as a source. But the bank carries NO answer key — the only answers are photographs of handwritten pages that cannot be read offline — so items were built ONLY from questions whose answers are independently confirmed by a current HSS2011 lecture or the revision-exercise key. Questions it asks that current sources cannot verify (brachial plexus M-shape, femoral triangle borders, epimysium, amphiarthroses/synarthroses, TMJ muscles) were deliberately left out.',
    },
    {
      what: 'The answer-key table extracts incorrectly without layout preservation',
      detail: 'The three-column MCQ answer table in Revision Exercise Answer.pdf flattens into an ambiguous single column under ordinary text extraction, which silently mis-assigns answers between Modules 3.3, 4.1 and 4.2. All answers used here were re-read with layout preserved and cross-checked against the question text.',
      handled: 'Answers verified against layout-preserved extraction before use.',
    },
  ],
  notes: [
    'A PICTURE THAT DOES NOT EXIST ON THE DRIVE MAY STILL EXIST. The eighteen 2026 lessons shipped with no figure and a stated reason: nothing on disk depicted a membrane or a Golgi apparatus. That was true of the drive and false of the world — the OpenStax Anatomy & Physiology set is on Wikimedia Commons under CC BY, and OpenStax A&P 2e is the free textbook the HSS2011 orientation deck recommends. Eleven figures were added from it. The source-traceability rule governs CLAIMS, which must come from the supplied folders; it never said a lesson may only show a picture that happens to be on the drive, and reading it that way cost these lessons their illustrations for a month.',
    'THE SUBJECT-ADMIN ITEM WAS DELETED, NOT LOST. “What HSS2011 is, and how it is marked” was course logistics in a lesson’s shape: module titles, assessment weights, where Canvas lives. Nothing there is anatomy and nothing there is revisable. It now lives on the Course tab beside the timetable, still sourced to hss.w1.2026 and hss.sdf.2627 through outputs/schedule.js. The unit hss.subject went with it, because an empty unit is a topic card that opens onto nothing.',
    'PRIOR-KNOWLEDGE LISTS ARE NOT A SUMMARY, THEY ARE THE LESSON. When an item carries priorKnowledge, the app folds the sourced explanation away and leads with the `beyond` list instead — so anything missing from that list is missing from the lesson as it is actually read. The organelles item shipped with covers:\'most\' and a two-line list, which folded the cytoskeleton, the 9 + 0 centriole array, the Golgi cisternae and the two ERs behind a claim that the lecture mostly re-treads DSE Biology. It does not. That item is now covers:\'part\' with six lines. The nucleus item deliberately carries NO priorKnowledge block: half of it is genetics, this repo has never checked which part of the DSE syllabus carries that, and an unverified claim about prior knowledge would fold real teaching away. No block means the explanation always leads.',
    'THE COVERAGE REPORT ITSELF HID A GAP. Until 2026-09-02 this entry listed "Cells, four tissue types, eleven organ systems" as covered for ABCT2326 and marked the subject full. Only two items existed for that unit and both were written from the back of the lecture — tissues and homeostasis. Everything before it (membrane, organelles, nucleus, protein synthesis, cell division) had been catalogued in ONE item’s prior-knowledge sidebar as things that go beyond DSE Biology, and never turned into lessons. Listing a topic as covered because a related item mentions it is how a gap becomes invisible: nothing downstream had any reason to look again. Nine items now teach it. When adding a covered line, describe what a lesson TEACHES, not what the corpus has read.',
    'The 2026 orientation deck renumbers the four HSS2011 modules and every source folder on the drive still uses the old ordering. The app numbers by the deck and prints the old number underneath, because a lesson headed Module 1 that cites "Module 4.1" looks wrong otherwise. The unit KEYS (hss.m1 … hss.m4) were deliberately NOT renamed — saved progress in the browser is keyed by them.',
    'The "downloaded ZIP" referred to in the brief was not present anywhere on this machine. The only downloaded asset found was Skeleton_NIH3D.glb. It has since been removed: it carried just 2 named nodes, so it could not support structure-level picking, and no code ever loaded it.',
    'No labelled diagram image files exist in the supplied app assets — only .glb 3D models — so diagram labelling uses authored inline SVG schematics whose label names come from the cited sources.',
    'The bundled Z-Anatomy / BodyParts3D skeleton is far more granular than the app originally used: 277 individually named meshes covering every carpal and tarsal, the separate skull bones, all 24 presacral vertebrae, and even the ear ossicles. It contains NO soft tissue — no heart, lung, brain, kidney, liver, muscle or vessel — so any 3D work on organs, muscles, pathways or neuroanatomy needs models this project does not yet have.',
    'Structure-set questions and diagram labelling both support a three-state reveal — labelled (teaching), guided (a couple of anchors left in) and blank (test). Blank is the default so a question stays a question; the labelled view is opened deliberately.',
    'Note on 3D mesh names: the loader normalises them on import, so "Scaphoid bone.r" in the source file becomes "Scaphoid_boner" in the scene. Structure sets store the clean source name and the matcher appends a candidate side letter rather than stripping one, because several bones legitimately end in l or r (femur, vomer, patella).',
    'Student coursework (lab reports, assignments, worksheets, presentations) was used only to confirm which topics are examined, never as a source for factual claims.',
    'Two scan bugs were found and fixed. The first pass was capped at depth 6, hiding about 45% of the files. It also filtered on subject codes, which missed folders that organise by topic name instead — the 2019/20 and 2015/16 HSS2011 lecture sets and the 2020/21 ABCT2326 set are all filed under plain "Human Anatomy" and "Human Physiology" with no code in the path.',
    'ICRP dose limits are quoted only because the exact values appear on Week 6 slide 10 of the supplied lecture, which cites ICRP Publication 103 directly. They are recorded as current-as-taught. If ICRP revises them, the app will still show what your course taught — check the source dialog before relying on them outside the exam.',
    'The topic-sorted question bank at 超神秘星巴黑材料 / Human anatomy / useful HA!!!! / Exam has been verified as in scope — see the resolved conflict above — and 11 further past papers (2003-04 to 2013-14) come with it. Because the bank has no answer key, it is a source of exam-style PROMPTS rather than verified answers: treat any question in it whose answer is not confirmed elsewhere as something to look up, not something the app can mark.',
  ],
};

export function coverageFor(subjectId) {
  return COVERAGE.subjects.find((s) => s.id === subjectId) || null;
}
