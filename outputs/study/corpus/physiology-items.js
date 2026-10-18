/*
 * ABCT2326 Human Physiology — the study items.
 *
 * Split out of study-data.js in phase 2026-09-01. outputs/study-data.js is
 * the barrel every importer still uses; nothing imports this file directly
 * except its siblings.
 */

/* ------------------------------------------------------------------ *
 * Study items — ABCT2326 Human Physiology
 * ------------------------------------------------------------------ */

export const PHYS_ITEMS = [
  {
    "id": "abct2326-cells-organisation",
    "subject": "ABCT2326",
    "unit": "phys.cells",
    "type": "sequence",
    "title": "Levels of organization: cell to organ systems",
    "tags": [
      "foundation",
      "high-yield",
      "cells",
      "tissues",
      "organ systems"
    ],
    "priorKnowledge": {
      "level": "dse-bio",
      "covers": "part",
      "dsePart": "core",
      "syllabusRef": { "ref": "edb.bio", "location": "Compulsory I \"Cells and Molecules of Life\" — cell structure, organelles and membrane transport." },
      sources: [
        {
          "ref": "phys.1.2026",
          "location": "p32 \"An Introduction to Tissues\""
        },
        {
          "ref": "phys.1.2026",
          "location": "p32 \"An Introduction to Tissues\""
        },
        {
          "ref": "phys.1.2026",
          "location": "p33 \"1. Epithelial Tissue\""
        },
        {
          "ref": "phys.1.2026",
          "location": "p34 \"Classification of Epithelia\""
        },
        {
          "ref": "phys.1.2026",
          "location": "p36 \"Classification of Epithelia (cont’d)\""
        },
        {
          "ref": "phys.1.2026",
          "location": "p37–40 \"2. Connective Tissue\""
        }
      ]
    },
    "practice": [
      {
        "type": "sequence",
        "prompt": "Arrange the levels of biological organization from smallest to most complex.",
        "items": [
          "Chemical level",
          "Cellular level",
          "Tissue level",
          "Organ level",
          "Organ system level",
          "Organismal level"
        ],
        "explanation": "The organizational hierarchy progresses from atoms and molecules up through cells, tissues, organs, organ systems, to the organism."
      },
      {
        "type": "matching",
        "prompt": "Match each primary tissue type with its fundamental physiological role.",
        "pairs": [
          [
            "Epithelial tissue",
            "Covers exposed surfaces and lines internal cavities"
          ],
          [
            "Connective tissue",
            "Fills internal spaces and provides structural support"
          ],
          [
            "Muscle tissue",
            "Specialized for contraction and mechanical force generation"
          ],
          [
            "Neural tissue",
            "Conducts electrical impulses and processes information"
          ]
        ],
        "explanation": "The four primary tissue types perform specialized roles that combine to form organs."
      },
      {
        "type": "mcq",
        "prompt": "Which of the following cell types is classified as a sex (germ) cell rather than a somatic cell?",
        "options": [
          "Erythrocyte",
          "Spermatozoon",
          "Osteocyte",
          "Hepatocyte"
        ],
        "answer": 1,
        "explanation": "Sex cells (germ cells) comprise sperm in males and oocytes in females; all other cells in the human body are somatic cells."
      },
      {
        "type": "typed",
        "prompt": "How many distinct organ systems are recognized in human physiological organization?",
        "accept": [
          "11",
          "eleven",
          "Eleven"
        ],
        "explanation": "Human anatomy and physiology divides organ functions into eleven interconnected systems."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A patient presents with acute generalized peritonitis following a perforated peptic ulcer. Explain how the infection and inflammation breach the structural hierarchy of the stomach wall and describe which organ systems must coordinate to survive this insult.",
        "model": "A peptic ulcer begins by eroding the simple columnar epithelial barrier of the gastric mucosa, penetrates the lamina propria and submucosal connective tissue, destroys the smooth muscle layers of the muscularis externa, and perforates through the serosa into the peritoneal cavity. Surviving this insult requires multi-system integration: the immune system mounts massive phagocytic defense; the nervous system drives intense sympathetic outflow and pain reflexes; the cardiovascular system adjusts perfusion; the endocrine system releases stress corticosteroids; the respiratory system compensates for metabolic acidosis with hyperventilation; and the urinary system conserves fluid while excreting hydrogen ions.",
        "rubric": [
          "Identifies the tissue layers of the stomach wall breached by perforation",
          "Explains the transition from local tissue destruction to peritoneal organ involvement",
          "Names at least three coordinating organ systems responding to systemic sepsis/peritonitis"
        ]
      }
    ],
    "commonMistakes": [
      "Confusing an organ with a tissue: for example, considering a whole femur as bone tissue, when a bone is an organ containing osseous tissue, cartilage, adipose tissue, and blood vessels.",
      "Assuming all cells in the human body are somatic cells, forgetting that spermatozoa and oocytes form the distinct germ cell lineage.",
      "Classifying blood as an independent fifth tissue type rather than as a specialized fluid connective tissue."
    ],
    "sourceRefs": [
      {
        "ref": "phys.1.2026",
        "location": "p3 \"Outline\""
      },
      {
        "ref": "phys.1.2026",
        "location": "p4 \"Sex Cells (Germ Cells)\""
      },
      {
        "ref": "phys.1.2026",
        "location": "p32 \"An Introduction to Tissues\""
      },
      {
        "ref": "phys.1.2026",
        "location": "p56 \"Organs and Systems\""
      },
      {
        "ref": "phys.1",
        "location": "p4 \"Outline\""
      },
      {
        "ref": "phys.1",
        "location": "p5 \"Sex Cells\""
      },
      {
        "ref": "phys.1",
        "location": "p33 \"An Introduction to Tissues\""
      },
      {
        "ref": "phys.1",
        "location": "p57 \"Organs\""
      },
      {
        "ref": "phys.cells.tut",
        "location": "p2 \"types of tissue organization\""
      }
    ]
  },
  {
    "id": "abct2326-homeostasis",
    "subject": "ABCT2326",
    "unit": "phys.cells",
    "type": "concept",
    "title": "Homeostasis: dynamic equilibrium, autoregulation, extrinsic regulation, and loop components",
    "tags": [
      "foundation",
      "high-yield",
      "homeostasis",
      "regulation",
      "systems"
    ],
    "priorKnowledge": {
      "level": "dse-bio",
      "covers": "most",
      "dsePart": "core",
      "syllabusRef": { "ref": "edb.bio", "location": "Compulsory III \"Homeostasis\" — concept of internal environment stability." },
      sources: [
        {
          "ref": "phys.1.2026",
          "location": "p58 \"Mechanisms of Regulation\""
        }
      ]
    },
    "practice": [
      {
        "type": "matching",
        "prompt": "Match each homeostatic loop component with its defining functional role.",
        "pairs": [
          [
            "Receptor",
            "Sensory structure that detects an environmental change or stimulus"
          ],
          [
            "Control Centre",
            "Integration processor that compares input to set point and issues commands"
          ],
          [
            "Effector",
            "Cell or organ whose response alters the condition back toward normal"
          ]
        ],
        "explanation": "Every homeostatic reflex loop requires a sensor to measure, a control centre to integrate, and an effector to act.",
        "src": {
          "ref": "phys.1.2026",
          "location": "p58 \"Mechanisms of Regulation\""
        }
      },
      {
        "type": "mcq",
        "prompt": "How does autoregulation (intrinsic regulation) differ fundamentally from extrinsic regulation?",
        "options": [
          "Autoregulation is mediated exclusively by the central nervous system",
          "Autoregulation occurs locally at the tissue level without neural or endocrine input",
          "Autoregulation relies entirely on anterior pituitary hormones",
          "Autoregulation only operates during positive feedback loops"
        ],
        "answer": 1,
        "explanation": "Autoregulation is an automatic internal adjustment made directly by cells or tissues to local environmental changes without systemic neural or hormonal signaling.",
        "src": {
          "ref": "phys.1.2026",
          "location": "p58 \"Mechanisms of Regulation\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which physiological characteristic distinguishes nervous systemic regulation from endocrine regulation?",
        "options": [
          "The nervous system produces slow, long-term systemic metabolic adaptations",
          "The nervous system directs rapid, short-term crisis responses via electrical impulses",
          "The nervous system transports regulatory signals via the bloodstream",
          "The nervous system only regulates skeletal muscle and ignores visceral organs"
        ],
        "answer": 1,
        "explanation": "Nervous regulation provides rapid, specific, short-term adjustments through electrical action potentials, whereas endocrine regulation provides slower, sustained hormonal control.",
        "src": {
          "ref": "phys.1.2026",
          "location": "p58 \"Mechanisms of Regulation\""
        }
      },
      {
        "type": "typed",
        "prompt": "What physiological term describes the state of balance in which opposing forces are continuously adjusted to maintain internal stability?",
        "accept": [
          "dynamic equilibrium",
          "Dynamic equilibrium",
          "homeostasis",
          "Homeostasis"
        ],
        "explanation": "Dynamic equilibrium describes the continuous, opposing adaptations that keep physiological variables within normal ranges.",
        "src": {
          "ref": "phys.1.2026",
          "location": "p57 \"Homeostasis\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A diabetic patient experiences severe hypoglycemia (blood glucose 2.1 mmol/L; normal 4.0–6.0 mmol/L) after an accidental overdose of insulin. Map this disturbance onto the three components of a homeostatic regulatory loop and explain why failure to restore the set point threatens brain viability.",
        "model": "In this homeostatic loop: (1) Receptors are the glucose-sensing alpha cells in the pancreatic islets of Langerhans and hypothalamic glucose sensors; (2) The Control Centre is the pancreatic endocrine islet tissue and hypothalamic neuroendocrine centres, which integrate the low glucose signal; (3) Effectors are pancreatic alpha cells (secreting glucagon) and adrenal medullary chromaffin cells (secreting epinephrine), which act on hepatocytes to stimulate glycogenolysis and gluconeogenesis, releasing glucose into the blood. Neurons in the central nervous system cannot synthesize or store glycogen and lack insulin-independent alternative fuel transport under acute conditions; prolonged failure of glucose homeostasis deprives neurons of ATP, precipitating neuroglycopenia, seizures, coma, and irreversible encephalopathy.",
        "rubric": [
          "Correctly identifies the receptor, control centre, and effector components in glucose regulation",
          "Explains the compensatory release of glucagon/epinephrine to stimulate hepatic glucose output",
          "Identifies that cerebral neurons depend on continuous blood glucose for ATP generation, explaining neuroglycopenic risk"
        ]
      }
    ],
    "commonMistakes": [
      "Describing homeostasis as a rigid, static fixed number: homeostatic variables constantly oscillate within a dynamic normal range around a set point.",
      "Confusing the receptor with the control centre: the receptor merely detects the physical stimulus; the control centre processes the information and issues commands.",
      "Thinking autoregulation requires brain involvement: autoregulation is strictly local within the organ or tissue itself."
    ],
    "sourceRefs": [
      {
        "ref": "phys.1.2026",
        "location": "p57 \"Homeostasis\""
      },
      {
        "ref": "phys.1.2026",
        "location": "p58 \"Mechanisms of Regulation\""
      },
      {
        "ref": "phys.1",
        "location": "p58 \"Homeostasis\""
      },
      {
        "ref": "phys.1",
        "location": "p59 \"Mechanisms of Regulation\""
      }
    ]
  },
        {
    "id": "abct2326-cvs-circuits",
    "subject": "ABCT2326",
    "unit": "phys.cvs",
    "type": "sequence",
    "title": "Pulmonary and systemic circuits",
    "tags": [
      "cardiovascular",
      "high-yield",
      "circuits",
      "blood vessels",
      "hemodynamics"
    ],
    "priorKnowledge": {
      "level": "dse-bio",
      "covers": "most",
      "dsePart": "core",
      "syllabusRef": { "ref": "edb.bio", "location": "Compulsory III(b) \"Essential life processes in animals\" — \"General plan of the circulatory system and lymphatic system\"." },
      sources: [
        {
          "ref": "phys.2",
          "location": "p11 \"Structure of Blood Vessels\""
        },
        {
          "ref": "phys.2",
          "location": "p13 \"Arteries\""
        },
        {
          "ref": "phys.2",
          "location": "p16 \"Types of Capillaries\""
        },
        {
          "ref": "phys.2",
          "location": "p17 \"Veins\""
        }
      ]
    },
    "practice": [
      {
        "type": "sequence",
        "prompt": "Order the anatomical structures through which a red blood cell travels from systemic venous return to systemic arterial delivery.",
        "items": [
          "Venae cavae",
          "Right ventricle",
          "Pulmonary trunk and arteries",
          "Pulmonary capillaries",
          "Pulmonary veins",
          "Left atrium",
          "Left ventricle",
          "Aorta"
        ],
        "explanation": "Blood flows sequentially through the right heart into the pulmonary circuit, returns via pulmonary veins to the left heart, and is ejected into the systemic aorta."
      },
      {
        "type": "matching",
        "prompt": "Match each blood vessel category with its primary histological or physiological hallmark.",
        "pairs": [
          [
            "Arterioles",
            "Primary source of peripheral vascular resistance"
          ],
          [
            "Continuous capillaries",
            "Endothelial cells tightly joined with narrow intercellular clefts in muscles and lungs"
          ],
          [
            "Fenestrated capillaries",
            "Endothelial pores enabling rapid water and solute exchange in kidneys and intestines"
          ],
          [
            "Systemic veins",
            "High-capacitance low-pressure reservoir containing majority of blood volume"
          ]
        ],
        "explanation": "Arterioles regulate vascular resistance; continuous and fenestrated capillaries permit differing degrees of microvascular filtration; systemic veins act as capacitance reservoirs."
      },
      {
        "type": "mcq",
        "prompt": "Which statement correctly characterizes the relationship between the pulmonary and systemic circulations in a healthy resting adult?",
        "options": [
          "Blood flow rate through the systemic circulation equals the flow rate through the pulmonary circuit.",
          "Blood pressure in the pulmonary circuit is identical to blood pressure in the systemic circuit.",
          "The right ventricle wall is substantially thicker than the left ventricle wall.",
          "Systemic arteries carry deoxygenated blood while pulmonary arteries carry oxygenated blood."
        ],
        "answer": 0,
        "explanation": "Because the pulmonary and systemic circuits are arranged in series, their volume flow rates must be equal (~5 L/min at rest), even though systemic pressures (~120/80 mmHg) greatly exceed pulmonary pressures (~25/10 mmHg)."
      },
      {
        "type": "typed",
        "prompt": "What is the approximate normal resting blood pressure (in mm Hg) found within systemic veins?",
        "accept": [
          "2",
          "2 mm Hg",
          "2 mmHg",
          "about 2 mm Hg",
          "about 2 mmHg",
          "~2 mm Hg",
          "~2 mmHg"
        ],
        "explanation": "Systemic veins operate at an extremely low resting pressure of approximately 2 mm Hg, necessitating one-way valves and the skeletal muscle pump to return blood."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A patient with severe deep vein thrombosis (DVT) in the left femoral vein develops an incompetent venous valve and significant distal edema while standing. Explain the biomechanical mechanisms responsible for normal venous return and describe how valve failure leads to dependent peripheral edema.",
        "model": "Normal venous return from the lower limbs relies on the skeletal muscle pump and bicuspid venous valves. Because venous pressure is only ~2 mmHg, muscle contraction compresses thin-walled veins, driving blood upward while one-way valves prevent retrograde pooling. When a venous valve becomes incompetent (valvular insufficiency), blood pools gravitationally in dependent venules and veins during upright standing. This increases microvascular venous hydrostatic pressure, transmitting backward pressure to the capillary bed. Elevated capillary hydrostatic pressure exceeds blood colloid osmotic pressure, driving excessive net filtration of fluid into the interstitial space, producing dependent peripheral edema.",
        "rubric": [
          "Explains the normal low-pressure venous return mechanism (skeletal muscle pump + one-way valves)",
          "Identifies that valve incompetence permits retrograde pooling and elevated venous hydrostatic pressure",
          "Connects increased capillary hydrostatic pressure to excessive fluid transudation into interstitial tissue"
        ]
      }
    ],
    "commonMistakes": [
      "Assuming that because systemic blood pressure is 5-6 times higher than pulmonary pressure, systemic cardiac output must also be 5-6 times higher (forgetting the two circuits are in series and must have equal flow rates).",
      "Confusing the definition of arteries and veins based on oxygenation rather than flow direction (arteries always carry blood away from the heart, even though pulmonary arteries carry deoxygenated blood).",
      "Believing large elastic arteries like the aorta provide the highest resistance to flow, whereas small muscular arteries and arterioles provide the vast majority of vascular resistance."
    ],
    "sourceRefs": [
      {
        "ref": "phys.2",
        "location": "p4 \"Circulatory System\""
      },
      {
        "ref": "phys.2",
        "location": "p11 \"Structure of Blood Vessels\""
      },
      {
        "ref": "phys.2",
        "location": "p13 \"Arteries\""
      },
      {
        "ref": "phys.2",
        "location": "p14 \"Capillaries\""
      },
      {
        "ref": "phys.2",
        "location": "p16 \"Types of Capillaries\""
      },
      {
        "ref": "phys.2",
        "location": "p17 \"Veins\""
      },
      {
        "ref": "phys.2",
        "location": "p18 \"An Introduction to the Cardiovascular System\""
      },
      {
        "ref": "phys.2",
        "location": "p20 \"Pulmonary and Systemic Circulations\""
      },
      {
        "ref": "phys.cvs.tut",
        "location": "p1 \"Explain how blood moves through arteries\""
      },
      {
        "ref": "phys.cvs.tut",
        "location": "p1 \"How does exercise affect this movement\""
      },
      {
        "ref": "phys.cvs.tut",
        "location": "p2 \"Materials can move across capillary walls by\""
      },
      {
        "ref": "phys.cvs.tut",
        "location": "p2 \"The normal blood volume of the venous system\""
      },
      {
        "ref": "phys.cvs.tut",
        "location": "p2 \"Pulmonary arteries and pulmonary veins\""
      }
    ]
  },
        {
    "id": "abct2326-cvs-heart-structure",
    "subject": "ABCT2326",
    "unit": "phys.cvs",
    "type": "diagram",
    "title": "Heart chambers, valves and the cardiac skeleton",
    "tags": [
      "cardiovascular",
      "high-yield",
      "heart",
      "anatomy",
      "valves",
      "histology"
    ],
    "priorKnowledge": {
      "level": "dse-bio",
      "covers": "part",
      "dsePart": "core",
      "syllabusRef": { "ref": "edb.bio", "location": "Compulsory III(b) \"Essential life processes in animals\" — the circulatory system in general plan only; the syllabus gets to heart structure through a pig-heart dissection, not through named histology." },
      sources: [
        {
          "ref": "phys.2",
          "location": "p30 \"cardiac (fibrous) skeleton\""
        },
        {
          "ref": "phys.2",
          "location": "p22 \"Structure of the Heart\""
        },
        {
          "ref": "phys.2",
          "location": "p24 \"Intercalated discs\""
        },
        {
          "ref": "phys.2",
          "location": "p27 \"Characteristics of Cardiac Muscle Cells\""
        },
        {
          "ref": "phys.2",
          "location": "p35 \"Functions of the valves\""
        }
      ]
    },
    "practice": [
      {
        "type": "matching",
        "prompt": "Match each cardiac anatomical structure with its specific functional role.",
        "pairs": [
          [
            "Cardiac fibrous skeleton",
            "Electrically insulates ventricular myocardium from atrial myocardium and anchors valves"
          ],
          [
            "Intercalated discs",
            "Contains desmosomes for mechanical force transfer and gap junctions for electrical conduction"
          ],
          [
            "Papillary muscles and chordae tendineae",
            "Exerts downward tension on AV valve cusps during ventricular systole to prevent eversion"
          ],
          [
            "Endocardium",
            "Lines internal cardiac chambers with simple squamous epithelium continuous with vascular endothelium"
          ]
        ],
        "explanation": "The fibrous skeleton provides electrical insulation; intercalated discs link cardiomyocytes mechanically and electrically; papillary muscles/chordae anchor AV cusps; endocardium lines the chambers."
      },
      {
        "type": "sequence",
        "prompt": "Order the layers of the cardiac wall from outermost to innermost luminal surface.",
        "items": [
          "Epicardium (visceral pericardium)",
          "Myocardium",
          "Endocardium"
        ],
        "explanation": "The cardiac wall progresses from the superficial epicardium, through the muscular myocardium, to the luminal endocardium."
      },
      {
        "type": "mcq",
        "prompt": "What accounts for the distinct crescent (pouch-like) shape and thinner wall of the right ventricle compared to the cylindrical, thick-walled left ventricle?",
        "options": [
          "The right ventricle pumps blood into the low-resistance, low-pressure pulmonary circuit (~25 mmHg), requiring less myocardial force.",
          "The right ventricle pumps a significantly lower volume of blood per minute than the left ventricle.",
          "The right ventricle lacks an inner endocardial lining.",
          "The right ventricle is completely devoid of intercalated discs."
        ],
        "answer": 0,
        "explanation": "The right ventricle generates much lower pressure (~25 mmHg vs ~120 mmHg) because the pulmonary circuit offers far less vascular resistance than the systemic circuit; both ventricles must pump equal stroke volumes."
      },
      {
        "type": "typed",
        "prompt": "What specialized intercellular junctions within intercalated discs permit the direct passage of ions and action potentials between adjacent cardiac muscle cells?",
        "accept": [
          "gap junctions",
          "gap junction",
          "Gap junctions",
          "Gap junction"
        ],
        "explanation": "Gap junctions form low-resistance electrical channels between cardiomyocytes, allowing action potentials to spread rapidly across the syncytium."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "During echocardiographic evaluation of a patient with a new systolic murmur, the cardiologist observes that the mitral valve cusps balloon backward (evert) into the left atrium during ventricular systole. Biopsy reveals fibroelastic degeneration of the chordae tendineae. Explain the normal mechanism that prevents AV valve regurgitation and analyze how chordae failure disrupts cardiac function.",
        "model": "Normally, as intraventricular pressure spikes during ventricular systole, blood pushes upward against the ventricular surfaces of the AV valve cusps. To prevent these cusps from prolapsing or everting into the low-pressure atrium, the ventricular papillary muscles contract synchronously with the myocardium. Papillary muscle contraction pulls tightly on the non-elastic chordae tendineae, anchoring the cusp margins securely together at the plane of closure. If the chordae tendineae degenerate or rupture, papillary tension cannot reach the leaflets. High systolic ventricular pressure forces the cusps backward into the left atrium (mitral regurgitation). This causes a fraction of the stroke volume to leak retrograde into the atrium during systole, reducing forward systemic cardiac output and elevating left atrial and pulmonary venous pressures, ultimately leading to pulmonary venous congestion.",
        "rubric": [
          "Identifies that papillary muscle contraction exerts tension through chordae tendineae to anchor AV leaflets",
          "Explains that chordae failure allows ventricular systolic pressure to blow cusps backward into the atrium",
          "Describes the hemodynamic consequences: retrograde systolic regurgitation, decreased forward cardiac output, and increased pulmonary venous pressure"
        ]
      }
    ],
    "commonMistakes": [
      "Believing that contraction of papillary muscles actively pulls AV valves open, when in reality valves open passively during diastole and papillary muscles contract during systole to prevent valve eversion.",
      "Assuming the cardiac fibrous skeleton conducts action potentials from the SA node to the ventricles, when it is actually an electrical insulator that blocks non-specific conduction.",
      "Thinking the right ventricle has a smaller stroke volume than the left ventricle because its wall is thinner, forgetting that cardiac output on both sides is identical."
    ],
    "sourceRefs": [
      {
        "ref": "phys.2",
        "location": "p22 \"Structure of the Heart\""
      },
      {
        "ref": "phys.2",
        "location": "p24 \"Intercalated discs\""
      },
      {
        "ref": "phys.2",
        "location": "p27 \"Characteristics of Cardiac Muscle Cells\""
      },
      {
        "ref": "phys.2",
        "location": "p28 \"Heart has 4 chambers\""
      },
      {
        "ref": "phys.2",
        "location": "p30 \"cardiac (fibrous) skeleton\""
      },
      {
        "ref": "phys.2",
        "location": "p31 \"Structural Differences between the Left and Right Ventricles\""
      },
      {
        "ref": "phys.2",
        "location": "p33 \"Atrioventricular Valves\""
      },
      {
        "ref": "phys.2",
        "location": "p34 \"Semilunar Valves\""
      },
      {
        "ref": "phys.2",
        "location": "p35 \"Functions of the valves\""
      },
      {
        "ref": "phys.cvs.tut",
        "location": "p1 \"types of valves in the heart\""
      }
    ]
  },
    {
    "id": "abct2326-resp-pathway",
    "subject": "ABCT2326",
    "unit": "phys.resp",
    "type": "sequence",
    "title": "The respiratory pathway and its two zones",
    "tags": [
      "respiratory",
      "high-yield",
      "pathway",
      "alveoli",
      "surfactant",
      "histology"
    ],
    "priorKnowledge": {
      "level": "dse-bio",
      "covers": "part",
      "dsePart": "core",
      "syllabusRef": { "ref": "edb.bio", "location": "Compulsory III(b) \"Essential life processes in animals\" — \"Gas exchange in humans: structure of the respiratory system\"." },
      sources: [
        {
          "ref": "phys.3",
          "location": "p3 \"Five functions of the\""
        },
        {
          "ref": "phys.3",
          "location": "p4 \"Organization of the respiratory system\""
        },
        {
          "ref": "phys.3",
          "location": "p6 \"conducting portion\""
        },
        {
          "ref": "phys.3",
          "location": "p7 \"Trachea\""
        },
        {
          "ref": "phys.3",
          "location": "p8 \"Alveolus\""
        },
        {
          "ref": "phys.3",
          "location": "p9 \"Alveoli\""
        },
        {
          "ref": "phys.3",
          "location": "p10 \"type I pneumocytes\""
        },
        {
          "ref": "phys.3",
          "location": "p13 \"Surfactant\""
        }
      ]
    },
    "practice": [
      {
        "type": "sequence",
        "prompt": "Order the anatomical airway divisions traversed by inhaled air from the larynx to the site of alveolar gas diffusion.",
        "items": [
          "Larynx",
          "Trachea",
          "Primary (main) bronchi",
          "Secondary (lobar) bronchi",
          "Tertiary (segmental) bronchi",
          "Terminal bronchioles",
          "Respiratory bronchioles",
          "Alveolar sacs and alveoli"
        ],
        "explanation": "Air passes from the larynx through the trachea, branching bronchial tree, terminal bronchioles, and enters the respiratory zone at respiratory bronchioles and alveoli."
      },
      {
        "type": "matching",
        "prompt": "Match each respiratory cell or structure with its distinct anatomical or physiological characteristic.",
        "pairs": [
          [
            "Type I pneumocyte",
            "Thin squamous epithelial cell forming the primary blood-air diffusion barrier"
          ],
          [
            "Type II pneumocyte",
            "Cuboidal septal cell synthesizing and secreting pulmonary surfactant"
          ],
          [
            "C-shaped tracheal rings",
            "Hyaline cartilage struts preventing airway collapse during subatmospheric inhalation"
          ],
          [
            "Conducting zone",
            "Conditions air by filtering, warming to 37°C, and humidifying to 100% saturation"
          ]
        ],
        "explanation": "Type I cells form the barrier; Type II secrete surfactant; C-rings prevent tracheal collapse; conducting zone conditions air."
      },
      {
        "type": "mcq",
        "prompt": "Why does a deficiency of pulmonary surfactant cause alveolar collapse (atelectasis) in premature infants?",
        "options": [
          "High water surface tension generates excessive collapsing inward pressure in small alveoli according to Laplace’s law.",
          "Type I pneumocytes proliferate abnormally and obstruct the alveolar ducts.",
          "Atmospheric pressure inside the trachea exceeds intrapleural pressure.",
          "The C-shaped hyaline cartilage rings in the bronchioles undergo necrosis."
        ],
        "answer": 0,
        "explanation": "Water molecules lining the moist alveolus exert high surface tension that tends to collapse the sphere; by disrupting water-water hydrogen bonding, surfactant lowers surface tension and prevents collapse."
      },
      {
        "type": "typed",
        "prompt": "At which specific airway structure does the conducting zone terminate and the respiratory zone begin?",
        "accept": [
          "respiratory bronchioles",
          "respiratory bronchiole",
          "Respiratory bronchioles",
          "Respiratory bronchiole"
        ],
        "explanation": "The conducting zone ends at terminal bronchioles; the respiratory zone begins where respiratory bronchioles first sprout outpocketed alveoli."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A male infant is delivered prematurely at 29 weeks of gestation. Within thirty minutes of birth, he exhibits tachypnea, grunting, intercostal retractions, and cyanosis. Chest radiography reveals diffuse bilateral microatelectasis and a \"ground-glass\" reticulogranular appearance. Diagnose the underlying condition, identify the cellular defect, and explain the biophysical mechanism causing respiratory failure.",
        "model": "The infant has Neonatal/Infant Respiratory Distress Syndrome (NRDS/IRDS). The cellular defect is developmental immaturity of Type II pneumocytes (septal cells) in the alveolar epithelium, which normally begin producing adequate surfactant between 32 and 35 weeks of gestation. Without surfactant, the aqueous film lining the alveoli exhibits high surface tension. According to the Law of Laplace (P = 2T/r), high surface tension (T) generates enormous inward collapsing pressure (P), particularly in small-radius (r) alveoli. The alveoli collapse at end-expiration (microatelectasis), severely decreasing lung compliance. The infant must exert massive muscular effort to reopen collapsed alveoli with each breath, leading to rapid muscle exhaustion, progressive hypoventilation, ventilation-perfusion mismatch, and hypoxemic respiratory failure.",
        "rubric": [
          "Diagnoses Neonatal/Infant Respiratory Distress Syndrome (NRDS/IRDS) secondary to immature Type II pneumocytes",
          "Explains the lack of surfactant and the resulting elevated alveolar surface tension",
          "Applies Laplace’s law to explain end-expiratory alveolar collapse (atelectasis) and decreased lung compliance"
        ]
      }
    ],
    "commonMistakes": [
      "Believing gas exchange occurs in terminal bronchioles, forgetting that terminal bronchioles are the last segment of the conducting zone and possess no alveoli.",
      "Assuming bronchioles contain cartilage rings like the trachea and bronchi, unaware that bronchioles lack cartilage and are dominated by smooth muscle regulated by autonomic tone.",
      "Thinking Type II pneumocytes are responsible for gas diffusion, when their primary job is surfactant synthesis while Type I cells execute diffusion."
    ],
    "sourceRefs": [
      {
        "ref": "phys.3",
        "location": "p3 \"Five functions of the\""
      },
      {
        "ref": "phys.3",
        "location": "p4 \"Organization of the respiratory system\""
      },
      {
        "ref": "phys.3",
        "location": "p6 \"conducting portion\""
      },
      {
        "ref": "phys.3",
        "location": "p7 \"Trachea\""
      },
      {
        "ref": "phys.3",
        "location": "p8 \"Alveolus\""
      },
      {
        "ref": "phys.3",
        "location": "p9 \"Alveoli\""
      },
      {
        "ref": "phys.3",
        "location": "p10 \"type I pneumocytes\""
      },
      {
        "ref": "phys.3",
        "location": "p12 \"Type II\""
      },
      {
        "ref": "phys.3",
        "location": "p13 \"Surfactant\""
      }
    ]
  },
  {
  "id": "abct2326-renal-nephron",
  "subject": "ABCT2326",
  "unit": "phys.renal",
  "type": "sequence",
  "title": "Gross renal architecture, nephron tubule sequence, and urine pathway",
  "tags": [
    "renal",
    "high-yield",
    "pathway",
    "nephron",
    "microvasculature",
    "histology"
  ],
  "priorKnowledge": {
    "level": "dse-bio",
    "covers": "most",
    "dsePart": "elective-hp",
    "syllabusRef": { "ref": "edb.bio", "location": "Elective V(a) \"Regulation of water content (osmoregulation)\" — general plan of the urinary system, nephron structure and function, ultrafiltration, reabsorption and ADH." },
    sources: [
      {
        "ref": "phys.5",
        "location": "p5 \"contains many capillaries and outer parts of neph\""
      },
      {
        "ref": "phys.5",
        "location": "p8 \"Is functional unit of kidney; responsible for forming urine\""
      },
      {
        "ref": "phys.5",
        "location": "p9 \"Interlobular arteries give rise to\""
      },
      {
        "ref": "phys.5",
        "location": "p12 \"Walls consist of single layer of cuboidal cells with\""
      }
    ]
  },
  "practice": [
    {
      "type": "sequence",
      "prompt": "Order the sequential segments of the renal tubular pathway traversed by filtrate from the site of plasma filtration to the renal papilla.",
      "items": [
        "Glomerular (Bowman’s) capsule",
        "Proximal convoluted tubule",
        "Descending limb of the loop of Henle",
        "Ascending limb of the loop of Henle",
        "Distal convoluted tubule",
        "Collecting duct"
      ],
      "explanation": "Filtrate enters Bowman’s capsule, travels through the proximal tubule, down and up the loop of Henle, through the distal tubule, and into the collecting duct."
    },
    {
      "type": "matching",
      "prompt": "Match each gross renal or urinary tract structure with its defining anatomical characteristic.",
      "pairs": [
        [
          "Renal cortex",
          "Outer granular zone containing glomeruli, convoluted tubules, and cortical nephrons"
        ],
        [
          "Renal medulla",
          "Inner zone composed of triangular striated renal pyramids separated by columns"
        ],
        [
          "Renal pelvis",
          "Funnel-shaped basin collecting urine from major calyces and leading into the ureter"
        ],
        [
          "Detrusor muscle",
          "Thick smooth muscle layer of the urinary bladder wall that contracts during micturition"
        ]
      ],
      "explanation": "Cortex houses corpuscles; medulla holds pyramids; pelvis funnels urine to ureters; detrusor muscle forms the bladder wall."
    },
    {
      "type": "mcq",
      "prompt": "Which vessel directly conveys blood away from the glomerular capillary tuft to supply peritubular capillaries and the vasa recta?",
      "options": [
        "Efferent arteriole",
        "Afferent arteriole",
        "Interlobular artery",
        "Arcuate vein"
      ],
      "answer": 0,
      "explanation": "Blood leaves the glomerular capillaries through the efferent arteriole, which subsequently subdivides into peritubular capillaries or vasa recta."
    },
    {
      "type": "typed",
      "prompt": "What anatomical structure is formed by the anatomical union of the glomerular capillary tuft and the surrounding Bowman’s capsule?",
      "accept": [
        "renal corpuscle",
        "Renal corpuscle",
        "Renal Corpuscle"
      ],
      "explanation": "The glomerulus and Bowman’s capsule together form the renal corpuscle, the site of glomerular ultrafiltration."
    }
  ],
  "application": [
    {
      "type": "scenario",
      "prompt": "A 52-year-old male with long-standing poorly controlled hypertension presents with progressive azotemia and bilateral flank fullness. Renal ultrasound reveals severe bilateral hydronephrosis with marked dilation of both renal pelves and calyces, accompanied by bladder distension. Contrast CT identifies a large obstructing transitional cell carcinoma at the bladder trigone occluding both ureteral orifices. Trace the backpressure sequence from the trigone back to the glomerulus, and explain why urinary tract obstruction leads to an immediate collapse in glomerular filtration rate (GFR).",
      "model": "The tumor at the bladder trigone obstructs both ureteral orifices, preventing urine from entering the bladder lumen. Urine continues to be produced upstream, causing progressive fluid accumulation and rising hydrostatic pressure. This hydrostatic pressure wave backs up retrograde through the ureters into the renal pelvis, expanding it (hydronephrosis) and backing into the major and minor calyces, through the renal papillae, and into the collecting ducts. Fluid retention transmits backpressure into the distal convoluted tubules, loops of Henle, proximal convoluted tubules, and ultimately into the capsular space of Bowman’s capsule. Normally, Glomerular Filtration Rate is determined by net filtration pressure: NFP = P_GC - P_BS - pi_GC (where P_GC is glomerular capillary hydrostatic pressure ~55 mmHg, P_BS is Bowman’s space hydrostatic pressure ~15 mmHg, and pi_GC is oncotic pressure ~30 mmHg). As obstruction elevates Bowman’s space hydrostatic pressure (P_BS) from 15 mmHg toward 40–50 mmHg, net filtration pressure drops precipitously toward zero. Without the hydrostatic gradient to drive plasma across the filtration membrane, ultrafiltration ceases, causing acute post-renal renal failure and oliguria.",
      "rubric": [
        "Traces retrograde backpressure from ureters through renal pelvis, calyces, collecting ducts, and into Bowman’s capsule",
        "Applies Starling forces equation (NFP = P_GC - P_BS - pi_GC) to show that elevated P_BS opposes filtration",
        "Explains that collapsing net filtration pressure arrests glomerular ultrafiltration, causing acute renal failure"
      ]
    }
  ],
  "commonMistakes": [
    "Placing the distal convoluted tubule before the loop of Henle; the loop of Henle connects the proximal and distal tubules.",
    "Assuming the renal corpuscle is just the glomerulus; the renal corpuscle is the glomerulus PLUS Bowman’s capsule.",
    "Confusing the ureters (carrying urine from kidneys to bladder) with the urethra (carrying urine from bladder out of the body)."
  ],
  "sourceRefs": [
    {
      "ref": "phys.5",
      "location": "p2 \"Is to regulate plasma and interstitial fluid by formation of\""
    },
    {
      "ref": "phys.5",
      "location": "p4 \"Paired kidneys are on either side of vertebral\""
    },
    {
      "ref": "phys.5",
      "location": "p5 \"contains many capillaries and outer parts of neph\""
    },
    {
      "ref": "phys.5",
      "location": "p8 \"Is functional unit of kidney; responsible for forming urine\""
    },
    {
      "ref": "phys.5",
      "location": "p9 \"Interlobular arteries give rise to\""
    },
    {
      "ref": "phys.5",
      "location": "p10 \"Tubular part of nephron begins with\""
    },
    {
      "ref": "phys.5",
      "location": "p11 \"Together they form\""
    },
    {
      "ref": "phys.5",
      "location": "p12 \"Walls consist of single layer of cuboidal cells with\""
    }
  ]
},
  {
  "id": "abct2326-digestive-pathway",
  "subject": "ABCT2326",
  "unit": "phys.dig",
  "type": "sequence",
  "title": "Digestive tract, accessory organs and the six functions",
  "tags": [
    "digestive",
    "high-yield",
    "pathway",
    "accessory-organs",
    "epithelium",
    "enzymes"
  ],
  "priorKnowledge": {
    "level": "dse-bio",
    "covers": "part",
    "dsePart": "core",
    "syllabusRef": { "ref": "edb.bio", "location": "Compulsory III(b) \"Essential life processes in animals\" — \"Nutrition in humans\": general plan of the digestive system, digestion in each part of the alimentary canal, absorption, the role of the liver and egestion." },
    sources: [
      {
        "ref": "phys.4",
        "location": "p3 \"Accessory Organs of\""
      },
      {
        "ref": "phys.4",
        "location": "p4 \"Six Functions of the\""
      },
      {
        "ref": "phys.4",
        "location": "p6 \"Secretion\""
      },
      {
        "ref": "phys.4",
        "location": "p7 \"Four major layers of the digestive tract\""
      }
    ]
  },
  "practice": [
    {
      "type": "sequence",
      "prompt": "Order the anatomical segments of the human digestive tract traversed by an ingested food bolus from entry to defecation.",
      "items": [
        "Oral cavity",
        "Pharynx",
        "Esophagus",
        "Stomach",
        "Small intestine",
        "Large intestine",
        "Anal canal"
      ],
      "explanation": "Food enters the mouth, passes through the pharynx and esophagus into the stomach, proceeds through the small intestine for digestion/absorption, enters the large intestine for compaction, and exits via the anal canal."
    },
    {
      "type": "matching",
      "prompt": "Match each accessory digestive organ with its primary physiological secretion or function.",
      "pairs": [
        [
          "Salivary glands",
          "Lubricating fluid containing salivary amylase for initial carbohydrate digestion"
        ],
        [
          "Liver",
          "Synthesis and secretion of bile essential for dietary lipid emulsification"
        ],
        [
          "Gallbladder",
          "Storage and concentration of bile prior to duodenal ejection"
        ],
        [
          "Exocrine pancreas",
          "Secretion of bicarbonate buffers and digestive enzymes (amylase, lipase, proteases)"
        ]
      ],
      "explanation": "Salivary glands secrete amylase; liver synthesizes bile; gallbladder stores/concentrates bile; exocrine pancreas secretes enzymes and alkaline buffers."
    },
    {
      "type": "mcq",
      "prompt": "Which of the following is classified as an accessory organ of the digestive system rather than a segment of the digestive tract?",
      "options": [
        "Pancreas",
        "Esophagus",
        "Duodenum",
        "Cecum"
      ],
      "answer": 0,
      "explanation": "The pancreas is an accessory glandular organ that secretes digestive enzymes into the duodenum; food never passes through the pancreas itself."
    },
    {
      "type": "typed",
      "prompt": "Which of the six digestive functions is defined as the active movement of organic substrates, electrolytes, vitamins, and water across the digestive epithelium into interstitial fluid and circulation?",
      "accept": [
        "absorption",
        "Absorption"
      ],
      "explanation": "Absorption is the uptake of digestive products across the epithelial mucosa into capillaries and lacteals."
    }
  ],
  "application": [
    {
      "type": "scenario",
      "prompt": "A 48-year-old male with chronic gallstone disease undergoes an elective cholecystectomy (surgical removal of the gallbladder). Following surgery, he consumes a large deep-fried meal and experiences significant cramping, bloating, and greasy, foul-smelling diarrhea (steatorrhea). Explain the normal physiological role of the gallbladder in bile delivery, and analyze why lipid digestion was impaired despite his liver remaining completely intact.",
      "model": "The gallbladder does not synthesize bile; rather, it stores and concentrates hepatic bile between meals. Under fasting conditions, the hepatopancreatic sphincter is closed, forcing bile back into the cystic duct and gallbladder. When fatty chyme enters the duodenum, duodenal enteroendocrine cells release cholecystokinin (CCK), which triggers powerful gallbladder contraction and relaxation of the hepatopancreatic sphincter, delivering a concentrated bolus of bile salts to rapidly emulsify dietary lipids. Following cholecystectomy, the patient lacks this storage and concentrating reservoir. Bile produced by the liver now trickles slowly and continuously into the duodenum in dilute form. When the patient ingests a large bolus of dietary fat, the dilute, continuous trickle of hepatic bile is insufficient to emulsify the heavy lipid load. Pancreatic lipase cannot access un-emulsified fat droplets, leaving large quantities of undigested triglycerides in the intestinal lumen, causing osmotic water retention and steatorrhea.",
      "rubric": [
        "Identifies that the gallbladder stores and concentrates bile and delivers it in response to CCK",
        "Explains that without the gallbladder, hepatic bile enters the duodenum as a continuous dilute trickle",
        "Links inadequate bile concentration during high-fat meals to defective lipid emulsification, lipase failure, and steatorrhea"
      ]
    }
  ],
  "commonMistakes": [
    "Believing the gallbladder produces bile, when bile is synthesized exclusively by hepatocytes in the liver and only stored/concentrated in the gallbladder.",
    "Counting the liver, gallbladder, or pancreas as parts of the alimentary tract, forgetting that food never passes through accessory organs.",
    "Confusing digestion with absorption: digestion is the chemical/mechanical cleavage of polymers, while absorption is the translocation of monomers across the gut epithelium into blood/lymph."
  ],
  "sourceRefs": [
    {
      "ref": "phys.4",
      "location": "p2 \"Muscular propulsion of materials into\""
    },
    {
      "ref": "phys.4",
      "location": "p3 \"Accessory Organs of\""
    },
    {
      "ref": "phys.4",
      "location": "p4 \"Six Functions of the\""
    },
    {
      "ref": "phys.4",
      "location": "p5 \"Ingestion\""
    },
    {
      "ref": "phys.4",
      "location": "p6 \"Secretion\""
    },
    {
      "ref": "phys.4",
      "location": "p7 \"Four major layers of the digestive tract\""
    }
  ]
},
  {
    id: 'abct2326-endocrine-delivery',
    subject: 'ABCT2326', unit: 'phys.endo', type: 'comparison',
    title: 'Hormones: definition, functions, delivery classes and chemical classes',
    tags: ['endocrine', 'high-yield'],
    priorKnowledge: {
      level: 'dse-bio', covers: 'part', dsePart: 'core',
      syllabusRef: { ref: 'edb.bio', location: 'Compulsory III(d) "Coordination and response" — "Hormonal coordination in humans" is two lines in the syllabus: the nature of hormonal coordination and a general plan of the endocrine system. Almost everything on this item is past it.' },
      sources: [
        {
          "ref": "phys.7",
          "location": "Page 5 \"Classes of Hormone Delivery\""
        },
        {
          "ref": "phys.7",
          "location": "Page 9 \"Chemical Classifications of Hormones\""
        },
        {
          "ref": "phys.7",
          "location": "Page 10 \"Prohormones and Prehormones\""
        }
      ],
    },
    practice: [
      { type: 'matching', prompt: 'Match each delivery class to its route.',
        pairs: [['Autocrine', 'Feeds back on the same cell, no blood circulation'], ['Paracrine', 'Diffuses to adjacent cells through extracellular space'], ['Endocrine', 'Delivered to target cells by the blood circulation'], ['Neuroendocrine', 'Released by a neuron, delivered by the bloodstream']],
        explanation: 'These are the four classes of hormone delivery as defined in the endocrine lecture.' },
      { type: 'mcq', prompt: 'Which chemical class do cortisol and aldosterone belong to?', options: ['Tyrosine derivatives', 'Proteins and peptides', 'Steroids', 'Prostaglandins'], answer: 2,
        explanation: 'Steroids are secreted by the adrenal cortex — cortisol and aldosterone — plus the ovaries, testes and placenta.' },
      { type: 'mcq', prompt: 'Thyroxine (T4) is secreted fully formed. What is true of its activity?', options: ['It is fully active on secretion', 'It is inactive until converted to T3 in target cells', 'It activates only after binding a prohormone', 'It never becomes active — T3 is a separate hormone'], answer: 1,
        explanation: 'Some hormones are inactive until activated by target cells: T4 is inactive until converted to T3 in the target cell.' },
      { type: 'typed', prompt: 'What is the precursor of the prohormone proinsulin called?', accept: ['preproinsulin', 'pre-proinsulin', 'prehormone preproinsulin'], explanation: 'Prehormones are precursors of prohormones — preproinsulin precedes proinsulin, which precedes insulin.' },
      { type: 'explain', prompt: 'A hormone circulates to every cell in the body. Why does it only affect some of them?',
        model: 'Because hormones act on target cells that contain receptor proteins for that hormone. Cells without the receptor are exposed to the hormone but cannot respond to it.',
        rubric: ['Names receptor proteins', 'States non-target cells lack the receptor'] },
    ],
    application: [
      { type: 'scenario', prompt: 'A signalling molecule acts on the cell that released it and never enters the blood; another molecule is released by a neuron but reaches its targets through the blood. Classify both and explain what distinguishes the endocrine class from every other signalling route.', model: 'The first is autocrine — it feeds back on the same cell without entering the circulation; its nearest neighbour is paracrine, which acts on adjacent cells through the extracellular space instead. The second is neuroendocrine: the releasing cell is a neuron but the delivery is bloodstream, which is why it is not simply nervous signalling. What distinguishes endocrine delivery from all of these is that it is the most common, classical mode — a ductless gland secretes into the blood and the blood alone carries the message to receptor-bearing target cells anywhere in the body.', rubric: ['Classifies the first as autocrine', 'Classifies the second as neuroendocrine', 'States endocrine = classical blood-borne delivery from ductless glands'] },
    ],
    commonMistakes: [
      'Treating "endocrine" as a synonym for any hormone signalling; it is one of four specific routes.',
      'Filing epinephrine with the peptide hormones because it is fast. It is a tyrosine derivative from the adrenal medulla.',
      'Assuming T4 is the active thyroid hormone; it is inactive until the target cell converts it to T3.',
      'Confusing prohormone with prehormone — the prehormone is one step earlier (preproinsulin before proinsulin before insulin).',
    ],
    sourceRefs: [
      { ref: 'phys.7', location: 'p3 "A hormone is a chemical that transfers information"' },
      { ref: 'phys.7', location: 'p4 "Regulate metabolism (the process used to"' },
      { ref: 'phys.hormech', location: 'p1 "hormones act more slowly"' },
      { ref: 'phys.hormech', location: 'p1 "produced by 8 major glands of the endocrine system"' },
      { ref: 'phys.7', location: 'p5 "AUTOCRINE"' },
      { ref: 'phys.7', location: 'p5 "produced and released by a neuron"' },
      { ref: 'phys.7', location: 'p7 "Are ductless and"' },
      { ref: 'phys.7', location: 'p9 "3 Chemical types of Hormones"' },
      { ref: 'phys.7', location: 'p9 "epinephrine and norepinephrine"' },
      { ref: 'phys.7', location: 'p9 "insulin and glucagons"' },
      { ref: 'phys.7', location: 'p9 "and placenta (estrogen and"' },
      { ref: 'phys.7', location: 'p10 "Prohormones are precursors of hormones"' },
      { ref: 'phys.7', location: 'p10 "Prehormones are precursors of prohormones"' },
      { ref: 'phys.hormech', location: 'p1 "Involves secretion of hormone that exerts its effect on the cell where it was produced"' },
      { ref: 'phys.hormech', location: 'p1 "acts on the adjacent cell"' },
    ],
  },
        {
    "id": "abct2326-blood-composition",
    "subject": "ABCT2326",
    "unit": "phys.cvs",
    "type": "definition",
    "title": "Blood composition and the vessel wall",
    "tags": [
      "cardiovascular",
      "blood",
      "hematology",
      "plasma",
      "formed elements",
      "histology"
    ],
    "priorKnowledge": {
      "level": "dse-bio",
      "covers": "part",
      "dsePart": "core",
      "syllabusRef": { "ref": "edb.bio", "location": "Compulsory III(b) \"Essential life processes in animals\" — \"Composition and functions of blood, tissue fluid and lymph\". The syllabus wants the components and what they do; it never quantifies them or dissects a vessel wall." },
      sources: [
        {
          "ref": "phys.2",
          "location": "p6 \"Composition of Blood\""
        },
        {
          "ref": "phys.2",
          "location": "p7 \"Plasma\""
        },
        {
          "ref": "phys.2",
          "location": "p8 \"Formed Elements\""
        },
        {
          "ref": "phys.2",
          "location": "p9 \"Platelets (thrombocytes)\""
        },
        {
          "ref": "phys.2",
          "location": "p11 \"Structure of Blood Vessels\""
        }
      ]
    },
    "practice": [
      {
        "type": "matching",
        "prompt": "Match each blood component with its specific quantitative parameter or physiological role.",
        "pairs": [
          [
            "Albumin",
            "Accounts for 60–80% of plasma proteins; maintains colloid osmotic pressure"
          ],
          [
            "Hematocrit in healthy males",
            "Normal physiological range of 41% to 53%"
          ],
          [
            "Erythrocyte structure",
            "Enucleated biconcave disc containing ~280 million hemoglobin molecules"
          ],
          [
            "Platelets (thrombocytes)",
            "Enucleated megakaryocyte fragments surviving 5 to 9 days; initiate hemostatic plug"
          ]
        ],
        "explanation": "Albumin generates oncotic pressure; normal male hematocrit is 41–53%; erythrocytes are enucleated biconcave discs; platelets are megakaryocyte fragments surviving 5–9 days."
      },
      {
        "type": "mcq",
        "prompt": "What is the fundamental compositional distinction between blood plasma and blood serum?",
        "options": [
          "Serum is the fluid phase remaining after blood has clotted, lacking fibrinogen and consumed clotting factors.",
          "Plasma contains no dissolved electrolytes, whereas serum contains abundant sodium and potassium.",
          "Serum contains formed elements and red blood cells, whereas plasma contains only liquid.",
          "Plasma lacks albumin, whereas serum consists of 100% albumin."
        ],
        "answer": 0,
        "explanation": "Serum is defibrinated plasma: when whole blood clots, fibrinogen is converted into insoluble fibrin and clotting factors are consumed, leaving serum as the remaining fluid."
      },
      {
        "type": "typed",
        "prompt": "Approximately how many hemoglobin molecules are packed inside each mature human erythrocyte?",
        "accept": [
          "280 million",
          "280,000,000",
          "280000000",
          "about 280 million"
        ],
        "explanation": "Each mature red blood cell contains approximately 280 million hemoglobin molecules, allowing each RBC to carry over one billion oxygen molecules."
      },
      {
        "type": "sequence",
        "prompt": "Order the major plasma protein groups from greatest abundance in plasma to least abundance.",
        "items": [
          "Albumins (60–80%)",
          "Globulins (~36%)",
          "Fibrinogen (~4%)"
        ],
        "explanation": "Albumins are most abundant (60–80%), followed by globulins (~36%), and fibrinogen (~4%)."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A 54-year-old patient with end-stage liver disease presents with severe abdominal distension (ascites), bilateral pedal edema, and easy bruising with mucosal bleeding. Laboratory tests show serum albumin of 18 g/L (reference 35–50 g/L) and an elevated international normalized ratio (INR/prothrombin time). Explain the physiological mechanisms connecting the patient liver failure to the edema and the bleeding diathesis.",
        "model": "The liver is the exclusive site of synthesis for albumins and key coagulation proteins (including fibrinogen and prothrombin). In chronic hepatic failure: (1) Severe hypoalbuminemia dramatically reduces blood colloid osmotic (oncotic) pressure. Capillary hydrostatic pressure now heavily overwhelms the diminished inward osmotic pull, causing excessive net transudation of fluid into interstitial tissues (pedal edema) and the peritoneal space (ascites). (2) Reduced hepatic synthesis of fibrinogen and clotting factors disrupts secondary hemostasis; with deficient fibrinogen, thrombin cannot form adequate insoluble fibrin networks to stabilize platelet plugs, resulting in easy bruising and spontaneous mucosal bleeding.",
        "rubric": [
          "Identifies that liver failure causes hypoalbuminemia, reducing plasma colloid osmotic pressure",
          "Explains how reduced oncotic pressure shifts Starling forces, causing fluid extravasation and edema/ascites",
          "Explains how deficient hepatic synthesis of fibrinogen and clotting factors leads to coagulopathy and bleeding"
        ]
      }
    ],
    "commonMistakes": [
      "Confusing plasma with serum, incorrectly assuming they are identical or that serum contains clotting factors.",
      "Assuming red blood cells produce ATP via aerobic respiration in mitochondria, forgetting that mature human RBCs completely lack mitochondria (relying exclusively on anaerobic glycolysis so they do not consume the oxygen they transport).",
      "Believing platelets are intact nucleated cells rather than cytoplasmic fragments derived from bone marrow megakaryocytes."
    ],
    "sourceRefs": [
      {
        "ref": "phys.2",
        "location": "p6 \"Composition of Blood\""
      },
      {
        "ref": "phys.2",
        "location": "p7 \"Plasma\""
      },
      {
        "ref": "phys.2",
        "location": "p8 \"Formed Elements\""
      },
      {
        "ref": "phys.2",
        "location": "p9 \"Platelets (thrombocytes)\""
      },
      {
        "ref": "phys.2",
        "location": "p11 \"Structure of Blood Vessels\""
      }
    ]
  },
  {
    id: 'abct2326-msk-immune-overview',
    subject: 'ABCT2326', unit: 'phys.imm', type: 'definition',
    title: 'Lymphoid tissue and where MALT sits',
    tags: ['immune'],
    practice: [
      { type: 'mcq', prompt: 'MALT describes clusters of lymphoid nodules located at which tissue layer of organs?', options: ['Mucosa', 'Submucosa', 'Muscularis externa', 'Serosa'], answer: 0,
        explanation: 'Model answer A. The name itself says mucosa-associated lymphoid tissue.',
        src: { ref: 'hss.revans', location: 'HSS2011 Module 1.2, MCQ 5' } },
      { type: 'cloze', prompt: '______ is an expanded, sac-like chamber located at the base of the thoracic duct.', accept: ['cisterna chyli', 'the cisterna chyli'],
        explanation: 'The answer is the cisterna chyli — the expanded sac the prompt describes, at the base of the thoracic duct.',
        src: { ref: 'hss.revans', location: 'HSS2011 Module 1.2, Fill-in-blanks 5' } },
      { type: 'explain', prompt: 'What job does the lymphatic system do for the cardiovascular system?',
        model: 'It picks up the excess fluid that has been filtered out in the capillary beds and returns it to the veins, so the circulating volume is maintained. Its lymph nodes also form part of the immune system.',
        rubric: ['Names recovery of excess capillary filtrate', 'Names return to the veins'] },
    ],
    application: [
      { type: 'scenario', prompt: 'The HSS2011 revision exercise asks which body part does NOT drain into the left lymphatic duct, and the answer is the right arm. What general principle does that single answer encode?',
        model: 'That lymphatic drainage is asymmetric. The right upper quadrant of the body — including the right side of the head and the right upper limb — drains by a separate route, while everything else converges on the left. Knowing the exception is the way to remember the rule.',
        rubric: ['States drainage is asymmetric', 'Identifies the right upper body as the exception'] },
    ],
    commonMistakes: ['Assuming lymph drainage is symmetrical left and right.'],
    sourceRefs: [{ ref: 'phys.10', location: 'Immune system lecture' }, { ref: 'phys.2', location: 'Slide 4 "Circulatory System" — lymphatic role' }, { ref: 'hss.revans', location: 'HSS2011 Module 1.2 and 1.3 answers' }],
  },
  {
    id: 'abct2326-nervous-divisions',
    subject: 'ABCT2326', unit: 'phys.nerv', type: 'definition',
    title: 'Divisions of the nervous system and classes of neuron',
    tags: ['nervous', 'high-yield'],
    priorKnowledge: {
      level: 'dse-bio', covers: 'most', dsePart: 'core',
      syllabusRef: { ref: 'edb.bio', location: 'Compulsory III(d) "Coordination and response" — "Nervous coordination in humans" already names the CNS, the brain parts, the spinal cord, sensory / interneurone / motor neurones, the synapse and the reflex arc.' },
      sources: [
        {
          "ref": "phys.8",
          "location": "Page 8 \"Peripheral Nervous System (PNS)\""
        },
        {
          "ref": "phys.8",
          "location": "Page 8 \"Peripheral Nervous System (PNS)\""
        },
        {
          "ref": "phys.8",
          "location": "Page 4 \"Central Nervous System\""
        }
      ],
    },
    practice: [
      { type: 'matching', prompt: 'Match each neuron class to what it does.',
        pairs: [['Sensory neuron', 'Conducts impulses from receptors to the CNS'], ['Motor neuron', 'Conducts impulses from the CNS to muscles or glands'], ['Interneuron', 'Lies entirely within the CNS and integrates function'], ['Autonomic motor neuron', 'Innervates smooth muscle, cardiac muscle and glands']],
        explanation: 'These are the three neuron classes and the autonomic subdivision as defined in the lecture.' },
      { type: 'mcq', prompt: 'Which division of the PNS controls skeletal muscle voluntarily and handles reflexes?', options: ['Autonomic nervous system', 'Somatic nervous system', 'Sympathetic division', 'Parasympathetic division'], answer: 1,
        explanation: 'Somatic motor neurons are responsible for reflexes and voluntary control of skeletal muscles. The sympathetic and parasympathetic divisions are both parts of the autonomic system.' },
      { type: 'cloze', prompt: 'Activation of a sensory neuron results in conduction of action potentials into the spinal cord along a(n) ______ fibre.', accept: ['afferent'],
        explanation: 'Model answer: afferent. Afferent fibres arrive at the CNS; efferent fibres exit it.',
        src: { ref: 'hss.revans', location: 'HSS2011 Module 2.1, Fill-in-blanks 4' } },
    ],
    application: [
      { type: 'scenario', prompt: 'A reflex happens faster than a voluntary movement. Using the three neuron classes, explain why.',
        model: 'A reflex runs sensory neuron → interneuron in the CNS → somatic motor neuron, so the loop is short and local. A voluntary movement has to be integrated at higher levels before a motor neuron fires, which adds processing between the input and the output.',
        rubric: ['Names the sensory–interneuron–motor loop', 'Contrasts the shorter reflex path with higher-level integration'] },
    ],
    commonMistakes: [
      'Treating the autonomic nervous system as separate from the PNS — it is one of its two divisions.',
      'Calling interneurons peripheral; they are located completely within the CNS.',
    ],
    sourceRefs: [{ ref: 'phys.8', location: 'Slides 2–8 what the nervous system is, its divisions, classification of neurons, PNS' }, { ref: 'phys.nerv.tut', location: 'p2 "Which division of the nervous system innervates involuntary effectors", "The central communication conduit between the brain and the rest of the body" and "Motor neurons convey signals from the CNS to effector cells." — tutorial MCQs 6, 8 and 9' }, { ref: 'hss.revans', location: 'HSS2011 Module 2.1, Fill-in-blanks 4' }],
  },
  {
    id: 'abct2326-muscle-types',
    subject: 'ABCT2326', unit: 'phys.msk', type: 'comparison',
    title: 'Three muscle tissue types and the four properties',
    tags: ['musculoskeletal', 'high-yield'],
    priorKnowledge: {
      level: 'dse-bio', covers: 'part', dsePart: 'core',
      syllabusRef: { ref: 'edb.bio', location: 'Compulsory III(d) "Coordination and response" — "Movement in humans" lists skeleton, muscles, joints, tendons and ligaments and the action of opposing muscle pairs. No histology, and no muscle tissue types.' },
      sources: [
        {
          "ref": "phys.9",
          "location": "Slide 5 \"4 Properties of Muscle\""
        },
        {
          "ref": "phys.9",
          "location": "Slide 6 \"Classification of 3 Muscle Tissue Types\""
        },
        {
          "ref": "phys.9",
          "location": "Slide 7 \"Classification of muscle\""
        },
        {
          "ref": "phys.9",
          "location": "Slide 18 \"Sarcomeres\""
        }
      ],
    },
    practice: [
      { type: 'matching', prompt: 'Match each muscle type to its distinguishing feature.',
        pairs: [['Skeletal', 'Multiple, peripherally located nuclei'], ['Cardiac', 'Intercalated discs'], ['Smooth', 'Not striated, gap junctions in visceral smooth muscle'], ['Cardiac and skeletal', 'Striated']],
        explanation: 'From the "Classification of 3 Muscle Tissue Types" slide.' },
      { type: 'mcq', prompt: 'Which property is defined as the ability of a muscle to recoil to its original resting length after being stretched?', options: ['Contractility', 'Excitability', 'Extensibility', 'Elasticity'], answer: 3,
        explanation: 'Elasticity is the recoil property. Extensibility is the ability to be stretched in the first place.' },
      { type: 'typed', prompt: 'What is the contractile unit of skeletal muscle, lying between two Z discs?', accept: ['sarcomere', 'sarcomeres'],
        explanation: 'The sarcomere — the components between two Z discs.' },
      { type: 'mcq', prompt: 'Which of the following is NOT performed by muscles?', options: ['Locomotion', 'Excretion', 'Maintenance of posture', 'Heat production'], answer: 1,
        explanation: 'Model answer B. Locomotion, maintenance of posture and heat production are muscle functions; excretion is not.',
        src: { ref: 'hss.revans', location: 'HSS2011 Module 4.1, MCQ 5' } },
    ],
    application: [
      { type: 'scenario', prompt: 'You are shown a striated muscle cell with a single central nucleus. Which type is it, and which feature ruled out the alternative?',
        model: 'Cardiac muscle. Striation rules out smooth muscle, and the single central nucleus rules out skeletal muscle, which has multiple peripherally located nuclei. Intercalated discs would confirm it.',
        rubric: ['Identifies cardiac', 'Uses striation to exclude smooth', 'Uses nucleus number/position to exclude skeletal'] },
    ],
    commonMistakes: [
      'Assuming striated means voluntary — cardiac muscle is striated and involuntary.',
      'Forgetting that skeletal muscle also acts involuntarily in reflexes.',
    ],
    sourceRefs: [{ ref: 'phys.9', location: 'Slides 4–8 introduction, four properties of muscle, classification of muscle tissue types' }, { ref: 'hss.revans', location: 'HSS2011 Module 4.1, MCQ 5' }],
  },
  {
    id: 'abct2326-muscle-action',
    subject: 'ABCT2326', unit: 'phys.msk', type: 'definition',
    title: 'Origin, insertion, agonist and antagonist',
    tags: ['musculoskeletal'],
    priorKnowledge: {
      level: 'dse-bio', covers: 'part', dsePart: 'core',
      syllabusRef: { ref: 'edb.bio', location: 'Compulsory III(d) "Coordination and response" — "Action of opposing muscle pairs" and the neuromuscular junction. Origin, insertion and the motor unit are not in the syllabus.' },
      sources: [
        {
          "ref": "phys.9",
          "location": "Slide 11 \"Skeletal Muscles\""
        },
        {
          "ref": "phys.9",
          "location": "Slide 42 \"Motor Unit\""
        },
        {
          "ref": "phys.9",
          "location": "Slide 43 \"Motor Unit\""
        }
      ],
    },
    practice: [
      { type: 'mcq', prompt: 'The greater the number of muscle fibres in each motor unit, …', options: ['The greater the number of stimuli required to produce a contraction.', 'The longer each contraction will last.', 'The slower the contraction of the muscle will be.', 'The less precise the control will be.'], answer: 3,
        explanation: 'Model answer D. One motor neuron drives every fibre in its unit, so a large unit means a coarser smallest possible step of force.',
        src: { ref: 'hss.revans', location: 'HSS2011 Module 4.1, MCQ 6' } },
      { type: 'matching', prompt: 'Match each term to its definition.',
        pairs: [['Origin', 'Attachment on the bone that does not move'], ['Insertion', 'Attachment on the bone that moves'], ['Agonist', 'The main muscle contracting to produce the movement'], ['Antagonist', 'The opposing muscle, e.g. the extensor to a flexor']],
        explanation: 'From the "Skeletal Muscle Action" and "Skeletal Muscles" slides.' },
      { type: 'typed', prompt: 'A muscle that decreases the angle between two bones at a joint is called a what?', accept: ['flexor', 'flexor muscle'],
        explanation: 'A flexor. An extensor increases the angle.' },
    ],
    application: [
      { type: 'scenario', prompt: 'Biceps brachii is described in HSS2011 as a powerful flexor and supinator of the forearm, and triceps brachii as the extensor. Describe their relationship in both directions of movement.',
        model: 'During elbow flexion biceps brachii is the agonist and triceps brachii the antagonist. During extension the roles swap: triceps is the agonist and biceps the antagonist. Flexors and extensors working at the same joint are antagonists to each other, and which one is the agonist depends only on the direction being produced.',
        rubric: ['Assigns agonist/antagonist for flexion', 'Swaps them for extension', 'States the roles depend on the movement direction'] },
    ],
    commonMistakes: [
      'Treating agonist and antagonist as fixed labels for particular muscles.',
      'Swapping origin and insertion — the insertion is on the bone that moves.',
    ],
    sourceRefs: [{ ref: 'phys.9', location: 'Slides 10–11 skeletal muscle action, flexors and extensors, agonist and antagonist' }, { ref: 'hss.4.3', location: 'Biceps brachii and triceps brachii actions' }, { ref: 'hss.revans', location: 'HSS2011 Module 4.1, MCQ 6' }],
  },
  {
    id: 'abct2326-innate-adaptive',
    subject: 'ABCT2326', unit: 'phys.imm', type: 'comparison',
    title: 'Innate vs adaptive immunity and the seven innate categories',
    tags: ['immune', 'high-yield'],
    priorKnowledge: {
      level: 'dse-bio', covers: 'part', dsePart: 'core',
      syllabusRef: { ref: 'edb.bio', location: 'Compulsory IV(c) "Body defence mechanisms" — non-specific defence is listed as skin, mucus and other secretions, cilia, phagocytes, blood clotting and inflammatory responses. Interferons, complement and NK cells are not in the syllabus.' },
      sources: [
        {
          "ref": "phys.10",
          "location": "Slide 6 \"7 Major Categories of Innate Immunity\""
        },
        {
          "ref": "phys.10",
          "location": "Slide 13 \"2. Two Classes of Phagocytes\""
        },
        {
          "ref": "phys.10",
          "location": "Slides 15–16 \"Two Types of Macrophages\", \"Examples of Fixed and Free Macrophages\""
        },
        {
          "ref": "phys.10",
          "location": "Slide 18 \"Activation of Innate Immunity\""
        },
        {
          "ref": "phys.10",
          "location": "Slide 25 \"5. Interferons\""
        }
      ],
    },
    practice: [
      { type: 'sequence', prompt: 'List the seven major categories of innate immunity in the order the lecture gives them.',
        items: ['Physical barriers', 'Phagocytes', 'Immune surveillance', 'Interferons', 'Complement', 'Inflammatory response', 'Fever'],
        explanation: 'This is the order on the "7 Major Categories of Innate Immunity" slide.' },
      { type: 'mcq', prompt: 'Which cells carry out immunological surveillance?', options: ['Neutrophils', 'Natural killer cells', 'B lymphocytes', 'Eosinophils'], answer: 1,
        explanation: 'Immune surveillance constantly monitors normal tissues with natural killer cells, which release perforins to lyse abnormal cell membranes.' },
      { type: 'mcq', prompt: 'What do interferons actually do?', options: ['Kill viruses directly', 'Trigger antiviral proteins that block replication in neighbouring cells', 'Lyse abnormal plasma membranes', 'Form a cascade that punches holes in bacteria'], answer: 1,
        explanation: 'The lecture is explicit: antiviral proteins do not kill viruses, they block replication in the neighbouring cell. Membrane lysis is the NK cell / perforin mechanism, and the cascade is complement.' },
      { type: 'matching', prompt: 'Match each fixed or free macrophage to where it is found.',
        pairs: [['Microglia', 'Central nervous system'], ['Kupffer cells', 'Liver sinusoids'], ['Alveolar macrophages', 'Lungs — free macrophages'], ['Histiocytes', 'Fixed in tissues such as dermis and bone marrow']],
        explanation: 'From the "Examples of Fixed and Free Macrophages" slide.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A person meets the same pathogen for the second time and clears it much faster. Which arm of immunity explains the difference, and why can the other arm not explain it?',
        model: 'Adaptive immunity. It is specific, depends on lymphocytes and develops after exposure, so a second encounter meets a prepared response. Innate immunity cannot explain it because it always works the same way against any invading agent — it does not improve with repeat exposure.',
        rubric: ['Names adaptive immunity', 'Cites lymphocyte-dependent specificity and post-exposure development', 'States innate immunity is unchanged by repetition'] },
    ],
    commonMistakes: [
      'Saying interferons kill viruses — they block replication in neighbouring cells instead.',
      'Grouping natural killer cells with the adaptive system because they are lymphocytes by lineage; the lecture places them under innate immune surveillance.',
    ],
    sourceRefs: [
      { ref: 'phys.10.2026', location: 'Slide 5 "Innate (Nonspecific) Immunity"' },
      { ref: 'phys.10.2026', location: 'Slide 7 "7 Major Categories of Innate Immunity"' },{ ref: 'phys.10', location: 'Slides 5–21 defense mechanisms, seven innate categories, phagocytes, macrophage types, immunological surveillance' }],
  },
  {
    id: 'abct2326-endocrine-receptors',
    subject: 'ABCT2326', unit: 'phys.endo', type: 'definition',
    title: 'The hormone receptor, and why cells change how many they have',
    tags: ['endocrine', 'high-yield'],
    priorKnowledge: {
      level: 'dse-bio', covers: 'part', dsePart: 'core',
      syllabusRef: { ref: 'edb.bio', location: 'Compulsory III(d) "Coordination and response" — the syllabus asks for the nature of hormonal coordination and a general plan of the endocrine system. That a hormone acts on specific target cells is DSE; receptor occupancy, the response ceiling and up/downregulation are past it.' },
      sources: [
        {
          "ref": "phys.hormech",
          "location": "p2 \"MECHANISM OF HORMONE ACTION — Receptors\""
        },
        {
          "ref": "phys.hormech",
          "location": "p2 \"The magnitude of biological response depends on a number of receptors occupied\""
        },
        {
          "ref": "phys.hormech",
          "location": "p2 \"downregulation\" / \"upregulation\""
        }
      ],
    },
    practice: [
      { type: 'mcq', prompt: 'A patient’s blood level of a hormone has been high for weeks. What does the source say happens to the number of receptors on its target cells?', options: ['It increases — upregulation', 'It decreases — downregulation', 'It is unchanged; receptor number is fixed', 'The receptors change shape permanently'], answer: 1,
        explanation: 'If the concentration of a hormone in the blood increases, the number of receptors in the cell wall may go down, to maintain the same level of hormonal interaction in the cell. That is downregulation.' },
      { type: 'explain', prompt: 'Doubling the dose of a hormone stops producing any extra effect. Explain why, in terms of receptors.',
        model: 'The magnitude of the biological response depends on the number of receptors occupied by the hormone. Once all the receptors are occupied, no greater response can be achieved, so additional hormone has nothing left to bind.',
        rubric: ['States response depends on number of receptors occupied', 'States a ceiling once all are occupied'] },
      { type: 'typed', prompt: 'What one word describes the receptor’s job of turning an extracellular hormonal signal into an intracellular one?', accept: ['signal transducer', 'transducer', 'signal transduction'],
        explanation: 'The source calls receptors signal transducers: only when the hormone is bound is the biological effect seen.' },
    ],
    application: [
      { type: 'scenario', prompt: 'Receptor turnover is described as constant — new receptors made and inserted, used ones broken down or recycled. Why does that matter for regulation rather than being mere housekeeping?',
        model: 'Because regulation requires the count to be changeable. If receptors were permanent the cell could not raise or lower how many sit in the membrane, so up- and downregulation would be impossible. Constant turnover is the mechanism that lets the cell answer a changed blood concentration by adjusting its own sensitivity.',
        rubric: ['Links turnover to the ability to change receptor number', 'Names up- and/or downregulation as what turnover enables'] },
    ],
    commonMistakes: [
      'Reading "downregulation" as the hormone level going down. It is the RECEPTOR count going down, in response to hormone going up.',
      'Assuming a bigger dose always gives a bigger effect — it cannot once every receptor is occupied.',
      'Thinking the receptor is consumed by binding. Binding is reversible and uses weak forces.',
    ],
    sourceRefs: [
      { ref: 'phys.hormech', location: 'p2 "MECHANISM OF HORMONE ACTION — Receptors", downregulation and upregulation' },
      { ref: 'phys.7', location: 'p13 "Target cell receptors show specificity, high affinity"' },
      { ref: 'phys.7', location: 'p13 "Called genomic action and takes at least 30 mins"' },
    ],
  },
  {
    id: 'abct2326-endocrine-second-messengers',
    subject: 'ABCT2326', unit: 'phys.endo', type: 'comparison',
    title: 'Water-soluble against lipid-soluble: two routes into the cell',
    tags: ['endocrine', 'high-yield'],
    /*
     * One visual on purpose. Signalling cascades have nothing to photograph:
     * no free figure depicts G proteins or IP3, and a schematic would only
     * redraw the sequence question the generated flow already renders.
     */
    /*
     * No priorKnowledge block on purpose. The schema allows covers: most|part,
     * and neither is true here — DSE Biology carries nothing on second
     * messengers or genomic hormone action, so claiming it covers "part" would
     * be a false statement about the syllabus in a corpus whose first rule is
     * not making those. An absent block says "new material" honestly.
     */
    practice: [
      { type: 'matching', prompt: 'Match each second-messenger system to the enzyme or molecule the source uses to define it.',
        pairs: [['Adenylate cyclase system', 'Converts ATP to cAMP, which activates protein kinase A'], ['Phospholipase C system', 'Splits a membrane phospholipid into DAG and IP3'], ['Tyrosine kinase system', 'The receptor is itself the enzyme; subunits autophosphorylate'], ['Hydrophobic route', 'No second messenger — the receptor binds DNA directly']],
        explanation: 'These are the three hydrophilic systems the source lists, plus the hydrophobic alternative.' },
      { type: 'mcq', prompt: 'Why do hydrophilic hormones need a second messenger at all?', options: ['They are too large to fit through membrane pores', 'They are insoluble in the lipid layer of the plasma membrane, so cannot cross it', 'They are destroyed by cytoplasmic enzymes', 'Their receptors are only made inside the nucleus'], answer: 1,
        explanation: 'The source is explicit: the reason is their insolubility in the lipid layer of the plasma membrane. Unable to penetrate it, they must signal through an intracellular messenger.' },
      { type: 'typed', prompt: 'In the calcium system, which protein does Ca2+ bind to before protein kinase C is activated?', accept: ['calmodulin'],
        explanation: 'Ca2+ binds calmodulin, making it active; calmodulin then activates protein kinase C.' },
      { type: 'mcq', prompt: 'Thyroxine is an amino-acid hormone, yet the source classes it with the steroids. Why?', options: ['Because it is made by a gland rather than a neuron', 'Because its iodide makes it slightly insoluble, so it behaves as hydrophobic', 'Because it circulates bound to a carrier protein', 'Because it acts on the nervous system'], answer: 1,
        explanation: 'The note is specific: thyroxine has an iodide compound making it slightly insoluble, so it is classed as a hydrophobic hormone and uses intracellular receptors.' },
    ],
    application: [
      { type: 'scenario', prompt: 'One hormone produces its effect within seconds; another takes half an hour or more. Using the two routes, explain the difference — and say what each is actually doing to the cell.',
        model: 'The fast one is hydrophilic and works through a second messenger. It changes the activity of proteins that already exist in the cell — phosphorylating enzymes that are sitting there — so no synthesis is needed and the effect is immediate. The slow one is hydrophobic: it crosses the membrane, binds an intracellular receptor, and the complex binds a hormone response element on DNA to alter transcription. The cell then has to make new protein, and that is what takes the time.',
        rubric: ['Assigns fast to hydrophilic/second messenger and slow to hydrophobic/genomic', 'States second messengers modify existing proteins', 'States the genomic route produces new protein via transcription'] },
      { type: 'scenario', prompt: 'Adrenaline binds both alpha and beta adrenergic receptors. What does that tell you about the relationship between a hormone and a second-messenger system?',
        model: 'That the system is a property of the receptor, not of the hormone. The same adrenaline molecule triggers the phospholipase C–Ca2+ route at an alpha receptor and the adenylate cyclase–cAMP route at a beta receptor, so which cascade runs is decided by which receptor the target cell carries.',
        rubric: ['States the pathway follows the receptor rather than the hormone', 'Names both routes and their receptors'] },
    ],
    commonMistakes: [
      'Calling cAMP the hormone. The hormone never enters the cell in this route — cAMP is the intracellular messenger it causes.',
      'Assuming one hormone means one pathway; adrenaline runs two, chosen by the receptor.',
      'Filing thyroxine with the peptide hormones because it is amino-acid derived. Its iodide makes it behave as hydrophobic.',
      'Saying second messengers switch on genes as their defining action — that is the hydrophobic route. cAMP does reach CREB in the source’s example, but the general point is that second messengers alter proteins already present.',
    ],
    sourceRefs: [
      { ref: 'phys.hormech', location: 'p3 "HYDROPHILIC HORMONE MECHANISM (water soluble hormones)" and the adenylate cyclase–cAMP system' },
      { ref: 'phys.hormech', location: 'p3 "the alpha subunit detaches from the beta-gamma complex"' },
      { ref: 'phys.hormech', location: 'p4 "cAMP response element binding protein"' },
      { ref: 'phys.hormech', location: 'p5 "and IP3 (inositol triphosphate). Both serve as second messengers"' },
      { ref: 'phys.hormech', location: 'p5 "Calmodulin"' },
      { ref: 'phys.hormech', location: 'p5 "glucose 6 phosphate"' },
      { ref: 'phys.hormech', location: 'p6 "Adrenaline uses two second messenger systems"' },
      { ref: 'phys.hormech', location: 'p7 "TYROSINE KINASE SECOND MESSENGER SYSTEM"' },
      { ref: 'phys.hormech', location: 'p7 "dimerization"' },
      { ref: 'phys.hormech', location: 'p7 "GLUT4"' },
      { ref: 'phys.hormech', location: 'p8 "alters the expression of particular genes within the cell nucleus"' },
      { ref: 'phys.hormech', location: 'p9 "a ligand (hormone) binding domain and a"' },
      { ref: 'phys.hormech', location: 'p9 "hormone response element"' },
      { ref: 'phys.7', location: 'p13 "These act through 2nd messengers; effects are quick"' },
      { ref: 'phys.7', location: 'p17 "e.g. Adrenaline on 3 different receptors"' },
    ],
  },
  {
    id: 'abct2326-endocrine-pituitary-axes',
    subject: 'ABCT2326', unit: 'phys.endo', type: 'concept',
    title: 'The pituitary gland: anterior trophic hormones, posterior storage, hypothalamic control',
    tags: ['endocrine', 'pituitary', 'high-yield'],
    practice: [
      { type: 'matching', prompt: 'Match each anterior pituitary hormone to its target action.',
        pairs: [['GH', 'Promotes growth, protein synthesis, amino-acid entry into cells'], ['TSH', 'Stimulates the thyroid to produce and secrete T4 and T3'], ['ACTH', 'Stimulates the adrenal cortex to secrete cortisol'], ['LH', 'Causes ovulation and testosterone secretion'], ['PRL', 'Stimulates milk production by mammary glands']],
        explanation: 'Six trophic hormones, one target each — FSH (ovarian follicles and sperm production) is the sixth.' },
      { type: 'mcq', prompt: 'Which statement about the posterior pituitary is correct?', options: ['It synthesizes ADH and oxytocin', 'It stores and releases hormones made in the hypothalamus', 'It makes its own six trophic hormones', 'It is controlled by the portal system'], answer: 1,
        explanation: 'The posterior stores and releases hormones made in the hypothalamus — ADH from the supraoptic nuclei, oxytocin from the paraventricular nuclei — transported along the hypothalamo-hypophyseal tract.' },
      { type: 'mcq', prompt: 'The one place in the pituitary-gonad axis where feedback runs POSITIVE is:', options: ['Androgen feedback on GnRH responsiveness', 'Oestrogen triggering the LH surge during the menstrual cycle', 'The short loop from anterior pituitary to hypothalamus', 'Progesterone inhibiting FSH'], answer: 1,
        explanation: 'During the menstrual cycle, oestrogen stimulates the "LH surge" by positive feedback — everywhere else in the axis the feedback is negative.' },
      { type: 'cloze', prompt: 'Hypothalamic releasing and inhibiting hormones reach the anterior pituitary through the hypothalamo-hypophyseal ______ system.', accept: ['portal', 'portal system'], explanation: 'They are released into a capillary bed in the median eminence and carried by the portal system directly to another capillary bed in the anterior pituitary.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A pituitary-stalk tumour compresses only the infundibulum. Predict, with reasons, the pattern of endocrine failure — which hormones fall, which are spared, and why.', model: 'The infundibulum carries both supply lines, but the lobes fail differently. The anterior lobe loses its hypothalamic command because the portal vessels run through the stalk — releasing and inhibiting hormones cannot arrive — so all six trophic hormones fall secondarily (hypothyroidism, cortisol deficiency, gonadal failure, low GH). The posterior lobe is also disconnected from the hypothalamo-hypophyseal tract, so ADH and oxytocin release fails — diabetes insipidus from lost ADH water conservation, and impaired milk ejection. Strictly, the posterior hormones are still made by the hypothalamic nuclei; they simply cannot be transported or released, which is why the failure is functional rather than synthetic. What is spared is everything the hypothalamus itself still controls directly and anything not dependent on pituitary delivery.', rubric: ['Identifies portal interruption → anterior trophic failure', 'Identifies tract interruption → ADH/oxytocin failure', 'Distinguishes synthetic vs delivery failure for the posterior hormones'] },
    ],
    commonMistakes: [
      'Saying the posterior pituitary MAKES ADH and oxytocin. It stores and releases them; the hypothalamic supraoptic and paraventricular nuclei make them.',
      'Pairing the nuclei backwards. Supraoptic → ADH; paraventricular → oxytocin.',
      'Calling all six anterior hormones "releasing hormones". Releasing hormones belong to the HYPOTHALAMUS; the pituitary\'s are trophic hormones.',
      'Assuming oestrogen is always a negative-feedback hormone. In the gonadal axis it runs positive exactly once — the LH surge.',
    ],
    sourceRefs: [
      { ref: 'phys.7', location: 'p29 "Anterior produces own hormones"' },
      { ref: 'phys.7', location: 'p29 "Posterior stores and releases"' },
      { ref: 'phys.7', location: 'p30 "Growth hormone (GH) promotes growth"' },
      { ref: 'phys.7', location: 'p30 "Adrenocorticotropic hormone (ACTH) stimulates adrenal cortex"' },
      { ref: 'phys.7', location: 'p30 "Follicle stimulating hormone (FSH) stimulates growth of ovarian"' },
      { ref: 'phys.7', location: 'p30 "Prolactin (PRL) stimulates milk production"' },
      { ref: 'phys.7', location: 'p31 "Secretes 6 trophic hormones that maintain size of targets"' },
      { ref: 'phys.7', location: 'p31 "High blood levels cause target to hypertrophy"' },
      { ref: 'phys.7', location: 'p34 "1) ADH (vasopressin) and 2) oxytocin"' },
      { ref: 'phys.7', location: 'p34 "Supraoptic nuclei of hypothalamus produce ADH/vasopressin"' },
      { ref: 'phys.7', location: 'p34 "Paraventricular nuclei produce oxytocin"' },
      { ref: 'phys.7', location: 'p34 "hypothalamo-hypophyseal tract"' },
      { ref: 'phys.7', location: 'p35 "Releasing hormones (RH)"' },
      { ref: 'phys.7', location: 'p35 "Inhibiting hormones (IH)"' },
      { ref: 'phys.7', location: 'p36 "hypothalamo-hypophyseal portal system directly to another"' },
      { ref: 'phys.7', location: 'p38 "LH surge"' },
      { ref: 'phys.7', location: 'p39 "Hypothalamus receives input from higher brain centers"' },
    ],
  },
  {
    id: 'abct2326-endocrine-adrenal-thyroid',
    subject: 'ABCT2326', unit: 'phys.endo', type: 'comparison',
    title: 'Adrenal cortex and medulla; thyroid, parathyroid and calcium control',
    tags: ['endocrine', 'adrenal', 'thyroid', 'high-yield'],
    practice: [
      { type: 'mcq', prompt: 'The adrenal medulla secretes epinephrine and norepinephrine in what ratio, and under whose control?', options: ['80% epi / 20% norepi — preganglionic sympathetic fibres', '50/50 — ACTH', '20% epi / 80% norepi — parasympathetic fibres', '100% epinephrine — the posterior pituitary'], answer: 0,
        explanation: 'The medulla synthesizes and secretes 80% epinephrine and 20% norepinephrine, innervated directly by preganglionic sympathetic fibres.' },
      { type: 'matching', prompt: 'Match each adrenal cortex hormone to its action.',
        pairs: [['Aldosterone', 'Stimulates kidneys to reabsorb Na+ and secrete K+'], ['Cortisol', 'Inhibits glucose utilization; stimulates gluconeogenesis'], ['Medullary epinephrine', 'Fight-or-flight: heart rate, vasoconstriction, glycogenolysis, lipolysis'], ['Supplementary sex steroids', 'Cortical androgens'], ],
        explanation: 'The cortex is ACTH-controlled; the medulla is sympathetic-controlled.' },
      { type: 'mcq', prompt: 'In Graves\' disease, why does the thyroid oversecrete?', options: ['The pituitary makes too much TSH', 'Autoimmune antibodies act like TSH and stimulate the gland', 'The hypothalamus makes too much TRH', 'Iodine deficiency enlarges the gland'], answer: 1,
        explanation: 'Graves\' is autoimmune: antibodies act like TSH and stimulate the thyroid to grow and oversecrete — hyperthyroidism with goitre and exophthalmos.' },
      { type: 'mcq', prompt: 'Which is NOT one of PTH\'s three stated effects?', options: ['Stimulating osteoclasts to release Ca2+ from bone', 'Enhancing kidney reabsorption of Ca2+', 'Stimulating calcitriol formation by the kidneys', 'Stimulating osteoblasts to deposit Ca2+ in bone'], answer: 3,
        explanation: 'PTH inhibits osteoblasts (reducing deposition) and stimulates osteoclasts (releasing Ca2+); it also enhances renal Ca2+ reabsorption and drives calcitriol secretion.' },
      { type: 'cloze', prompt: 'If no thyroid hormones were present at foetal development, myelinization of the nerves is impaired resulting in ______.', accept: ['cretinism'], explanation: 'The lecture names cretinism as the fetal consequence of absent thyroid hormone.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A patient with hypocalcaemia has high PTH but still cannot absorb calcium from the gut. Which step of PTH\'s third effect is failing, and how does the lecture\'s calcium map explain the remaining two PTH effects still working?', model: 'PTH\'s third effect is to stimulate the kidneys to form and secrete calcitriol, the active form of vitamin D; calcitriol is what enhances Ca2+ and phosphate absorption by the digestive tract. If gut absorption fails, either the kidney\'s calcitriol production or calcitriol\'s intestinal action is the broken link — PTH itself is high because the low calcium is real. The other two PTH effects still operate: osteoclasts are stimulated (and osteoblasts inhibited), so mineral turnover releases Ca2+ from bone; and the kidneys enhance Ca2+ reabsorption, reducing urinary losses. The lecture\'s map has three calcium outlets — bone, urine, gut — and PTH pulls on all three; a failure isolated to the gut leg leaves the bone and urine legs compensating, which is why bone loss accelerates when the third effect fails.', rubric: ['Identifies calcitriol as PTH\'s gut-absorption arm', 'States the bone and renal effects are PTH-direct and still active', 'Connects failing calcitriol to accelerated bone mineral turnover'] },
    ],
    commonMistakes: [
      'Saying ACTH controls the medulla. ACTH controls the CORTEX; the medulla is driven by preganglionic sympathetic fibres.',
      'Reversing calcitonin and PTH. Calcitonin lowers Ca2+ (from the thyroid C cells); PTH raises it (parathyroids) — the most-swapped pair in endocrine MCQs.',
      'Calling Graves\' a pituitary problem. The antibodies mimic TSH — the pituitary may be suppressed while the thyroid is overdriven.',
      'Forgetting epinephrine outlasts norepinephrine (10×) — hormonal effects persist for minutes after the nerve signal stops.',
    ],
    sourceRefs: [
      { ref: 'phys.7', location: 'p41 "Lie along superior border of each kidney"' },
      { ref: 'phys.7', location: 'p41 "Stores lipids, especially cholesterol and"' },
      { ref: 'phys.7', location: 'p42 "Medulla synthesizes and secretes 80% Epinephrine and"' },
      { ref: 'phys.7', location: 'p42 "Hormonal effects of Epinephrine last 10X longer than"' },
      { ref: 'phys.7', location: 'p42 "Glycogenolysis and lipolysis"' },
      { ref: 'phys.7', location: 'p43 "Cortex is controlled by"' },
      { ref: 'phys.7', location: 'p43 "Aldosterone which stimulate kidneys"' },
      { ref: 'phys.7', location: 'p43 "Cortisol which inhibits glucose"' },
      { ref: 'phys.7', location: 'p45 "Is located just below the larynx"' },
      { ref: 'phys.7', location: 'p46 "Stimulation of calorigenesis (heat production) in the body"' },
      { ref: 'phys.7', location: 'p47 "Have low BMR, weight gain, lethargy, cold intolerance"' },
      { ref: 'phys.7', location: 'p47 "And myxedema = puffy face, hands, feet"' },
      { ref: 'phys.7', location: 'p47 "During fetal development hypothyroidism can cause cretinism"' },
      { ref: 'phys.7', location: 'p48 "Autoimmune disease where antibodies act like TSH and"' },
      { ref: 'phys.7', location: 'p48 "Characterized by exopthalmos (eyes protruding), weight loss,"' },
      { ref: 'phys.7', location: 'p51 "Are 4 glands embedded"' },
      { ref: 'phys.7', location: 'p52 "It stimulates osteoclasts (break down bone"' },
      { ref: 'phys.7', location: 'p52 "It enhances reabsorption of Ca2+ at kidneys,"' },
      { ref: 'phys.7', location: 'p52 "It stimulates formation and secretion of"' },
    ],
  },
  {
    id: 'abct2326-endocrine-pancreas-misc',
    subject: 'ABCT2326', unit: 'phys.endo', type: 'concept',
    title: 'Pancreatic islets, pineal gland, gonadal and placental hormones',
    tags: ['endocrine', 'pancreas', 'pineal', 'high-yield'],
    practice: [
      { type: 'mcq', prompt: 'Blood glucose falls after a fast. Which islet cell responds, and how?', options: ['Beta cells — secrete insulin', 'Alpha cells — secrete glucagon, stimulating glycogenolysis and lipolysis', 'Delta cells — secrete somatostatin', 'Acinar cells — secrete enzymes'], answer: 1,
        explanation: 'Alpha cells secrete glucagon in response to low blood glucose; it stimulates glycogenolysis and lipolysis and raises blood glucose.' },
      { type: 'mcq', prompt: 'When is melatonin secreted, and what inhibits it?', options: ['By day; inhibited by darkness', 'At night; inhibited by light', 'Constantly; inhibited by ACTH', 'During sleep; inhibited by food'], answer: 1,
        explanation: 'Melatonin is secreted at night and inhibited by light — the SCN resets to daily light/dark changes, which is why jet-lag happens.' },
      { type: 'matching', prompt: 'Match each hormone to its source.',
        pairs: [['Somatomammotropin', 'Placenta'], ['Testosterone', 'Testes'], ['Insulin', 'Pancreatic beta cells'], ['Melatonin', 'Pineal gland']],
        explanation: 'The placenta secretes oestrogen, progesterone, hCG and somatomammotropin on top of the classical glands\' outputs.' },
      { type: 'typed', prompt: 'Name the hypothalamic nucleus that serves as the primary timing centre for circadian rhythms.', accept: ['suprachiasmatic nucleus', 'scn', 'suprachiasmatic'], explanation: 'The suprachiasmatic nucleus (SCN) of the hypothalamus is the primary timing centre for circadian rhythms, reset by daily light/dark changes.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A flight from Hong Kong to London lands in the morning local time after a midnight departure. Using the pineal mechanism, explain the traveller\'s first-week sleepiness pattern and how the system resets.', model: 'Melatonin secretion is driven by the suprachiasmatic nucleus and locked to the traveller\'s HOME light/dark schedule: it is secreted at night and inhibited by light. In London mornings, the traveller\'s SCN still reads night — so melatonin is high while the local world is bright, producing sleepiness and fog; conversely the glands shut off melatonin during the London night while the SCN still reads day, so sleep is broken. The SCN is reset by daily light/dark changes, so bright morning light exposure advances the clock a little each day — melatonin secretion shifts later relative to home time until it matches London, which is why jet-lag is implicated with melatonin and why it self-resolves in days.', rubric: ['States melatonin is secreted at night and inhibited by light', 'Explains the home-time mismatch producing daytime sleepiness', 'Names the SCN reset by light/dark as the recovery mechanism'] },
    ],
    commonMistakes: [
      'Reversing the islet cells. ALPHA cells make glucagon and respond to LOW glucose; BETA cells make insulin and respond to HIGH glucose.',
      'Saying the pancreas\'s endocrine cells are its bulk. The islets are scattered CLUSTERS — most pancreatic tissue is exocrine.',
      'Placing the SCN in the pineal. The SCN is hypothalamic; the pineal secretes melatonin in RESPONSE to SCN activity.',
      'Forgetting the placenta as an endocrine organ — it secretes four hormones, including the hCG the pregnancy tests detect.',
    ],
    sourceRefs: [
      { ref: 'phys.7', location: 'p54 "Are scattered clusters of endocrine cells in pancreas"' },
      { ref: 'phys.7', location: 'p55 "Alpha cells secrete glucagon in response to low blood"' },
      { ref: 'phys.7', location: 'p55 "Stimulates glycogenolysis and lipolysis"' },
      { ref: 'phys.7', location: 'p56 "Beta cells secrete insulin in"' },
      { ref: 'phys.7', location: 'p56 "Promotes entry of glucose into"' },
      { ref: 'phys.7', location: 'p58 "Is located in basal forebrain near"' },
      { ref: 'phys.7', location: 'p58 "Secretes melatonin in response to"' },
      { ref: 'phys.7', location: 'p58 "Secreted at night and is"' },
      { ref: 'phys.7', location: 'p58 "Implicated in jet-lag"' },
      { ref: 'phys.7', location: 'p59 "Gonads (testes and ovaries) secrete steroid hormones"' },
      { ref: 'phys.7', location: 'p59 "somatomammotropin"' },
      { ref: 'phys.7', location: 'p61 "Cytokines (lymphokines, interleukins)"' },
      { ref: 'phys.7', location: 'p61 "Growth factors (promote growth and cell division)"' },
      { ref: 'phys.7', location: 'p62 "1. Dwarfism"' },
      { ref: 'phys.7', location: 'p62 "2. Giantism"' },
    ],
  },
  /*
   * The seven items below come from the lecturer's own prose notes filed
   * beside the slide decks in units 8, 9 and 10 (phys.susan8/9/10). The decks
   * name the structures; these notes give the mechanism, which is why the
   * questions here are the step-by-step ones — the crossbridge cycle, the two
   * complement pathways, how a T cell is permitted to act.
   *
   * They were unreadable to the corpus until 2026-09-02 because the tiering
   * build excluded them by filename as student coursework. See the header of
   * work/build-course-terms.mjs.
   */
  {
    id: 'abct2326-synapse-drug-action',
    subject: 'ABCT2326', unit: 'phys.nerv', type: 'sequence',
    title: 'Where a drug can interfere with a synapse',
    tags: ['nervous', 'pharmacology', 'high-yield'],
    practice: [
      { type: 'mcq', prompt: 'Selective serotonin reuptake inhibitors act at which point in the synaptic chain?', options: ['They inhibit the synthesis of serotonin', 'They block the receptor so serotonin cannot bind', 'They block serotonin being reabsorbed into the pre-synaptic cell', 'They increase the release of serotonin into the gap'], answer: 2,
        explanation: 'The note is explicit: SSRIs block the re-uptake so serotonin cannot be reabsorbed back into the pre-synaptic cell, and it continues to bind onto the receptor.' },
      { type: 'matching', prompt: 'Match each drug class to what it does at the synapse.',
        pairs: [['Antagonist', 'Blocks the receptor so the transmitter cannot bind'], ['Agonist', 'Mimics the transmitter at the receptor'], ['Reuptake inhibitor', 'Stops the transmitter being reabsorbed into the pre-synaptic cell'], ['Enzyme blocker', 'Stops the enzyme that breaks the transmitter down']],
        explanation: 'Four of the eight classes the note lists. The last two both raise transmitter effect by preventing removal.' },
      { type: 'typed', prompt: 'Why does the note say the long-term effects of a synaptic drug are difficult to predict?', accept: ['feedback', 'feedback mechanism', 'the feedback mechanism counteracts it', 'compensation'],
        explanation: 'Because the imbalance the drug creates is counteracted by the feedback mechanism that normally regulates the process — for instance a neuron answering a blocked enzyme by supplying more of its precursors.' },
      { type: 'mcq', prompt: 'A drug blocks the enzyme that breaks down a neurotransmitter. What happens to that transmitter\'s effect?', options: ['It falls, because less transmitter is made', 'It rises, because the transmitter is not cleared', 'It is unchanged, because release is unaffected', 'It rises, because more transmitter is released'], answer: 1,
        explanation: 'Removal and supply are separate levers. Blocking the breakdown enzyme raises the effect by leaving transmitter in place, without changing how much is released.' },
    ],
    application: [
      { type: 'scenario', prompt: 'Two drugs both raise the effect of the same neurotransmitter, but one acts before it is released and the other after. Name the mechanism of each and say which would still work in a neuron that has stopped releasing that transmitter altogether.',
        model: 'The first increases release — more transmitter reaching the synaptic gap. The second blocks removal, either by inhibiting reuptake into the pre-synaptic cell or by blocking the enzyme that breaks the transmitter down. In a neuron that has stopped releasing the transmitter, only the first has anything to act on: a reuptake or enzyme blocker can only prolong transmitter that is already being released, so with nothing released there is nothing to prolong. An agonist would be the other option, since it mimics the transmitter at the receptor and does not depend on release at all.',
        rubric: ['Identifies increased release as the pre-release mechanism', 'Identifies reuptake or enzyme blockade as the post-release mechanism', 'Concludes that removal-blockers need transmitter already being released'] },
    ],
    commonMistakes: [
      'Thinking an SSRI adds serotonin. It adds none — it stops what was released from being taken back.',
      'Treating agonist and antagonist as "helps" and "harms". Both are receptor drugs; which one is therapeutic depends entirely on whether the transmitter is too low or too high.',
      'Expecting the short-term effect to persist. The note warns that feedback regulation counteracts the imbalance, which is why dose and effect drift over weeks.',
    ],
    sourceRefs: [
      { ref: 'phys.susan8', location: 'p1 "Drugs that blocks neurotransmitter reuptake" and the seven other classes listed with it' },
      { ref: 'phys.susan8', location: 'p1 "Drugs that act as Antagonists to block the receptor from binding"' },
      { ref: 'phys.susan8', location: 'p1 "the long term effects are difficult to predict because the imbalances are counteracted by the feedback mechanism"' },
      { ref: 'phys.susan8', location: 'p1 "Selective serotonin reuptake inhibitors (SSRIs)"' },
    ],
  },
  {
    id: 'abct2326-nervous-synapse-types-nt',
    subject: 'ABCT2326', unit: 'phys.nerv', type: 'comparison',
    title: 'Electrical vs chemical synapses, acetylcholine, and the autonomic receptors',
    tags: ['nervous', 'synapse', 'high-yield'],
    practice: [
      { type: 'mcq', prompt: 'Electrical synapses pass current directly. Where does the lecture place them?', options: ['Only at the neuromuscular junction', 'Smooth muscle, cardiac muscle, some brain neurons and glial cells', 'All somatic motor neurons', 'Only in the autonomic ganglia'], answer: 1,
        explanation: 'Electrical synapses occur in smooth muscle and cardiac muscle, between some neurons of the brain, and between glial cells — the cells joined by gap junctions.' },
      { type: 'mcq', prompt: 'In the heart, ACh at M2 receptors slows the heart rate. What is the membrane mechanism?', options: ['Na+ channels open, depolarizing the SA node', 'K+ channels open, creating IPSPs (hyperpolarization)', 'Ca2+ channels close, shortening the plateau', 'Cl− channels open, depolarizing the atria'], answer: 1,
        explanation: 'In the heart, K+ channels are opened, creating IPSPs — hyperpolarization — which slows the heart rate. Contrast the stomach\'s M1 receptors, where K+ channels are closed, producing EPSPs and contraction.' },
      { type: 'matching', prompt: 'Match each synaptic event to its graded potential.',
        pairs: [['Opening Na+ or Ca2+ channels', 'EPSP — graded depolarization'], ['Opening K+ or Cl− channels', 'IPSP — graded hyperpolarization'], ['EPSPs', 'Move the membrane potential closer to threshold'], ['Summation of EPSPs and IPSPs', 'Determines whether an action potential occurs']],
        explanation: 'Neither EPSP nor IPSP decides alone — the summation at the axon hillock does.' },
      { type: 'sequence', prompt: 'List the events of a cholinergic synapse in order.', items: ['Action potential arrives at the axon terminal', 'Voltage-gated Ca2+ channels open and Ca2+ enters', 'Synaptic vesicles fuse and release acetylcholine into the cleft', 'ACh binds nicotinic or muscarinic receptors on the postsynaptic membrane', 'Ion channels open, producing EPSPs or IPSPs', 'ACh is cleared — by acetylcholinesterase or diffusion'], explanation: 'This is the tutorial\'s tested list — the events involved in the functioning of a cholinergic synapse — with the clearing step from the AChE slide.' },
      { type: 'typed', prompt: 'On which receptors is ACh inhibitory — in some autonomic motor neurons — and what ion channel change produces the inhibition?', accept: ['muscarinic', 'muscarinic receptors, k+ channels open', 'muscarinic, potassium'], explanation: 'ACh is inhibitory at muscarinic receptors in some autonomic motor neurons: K+ channels open and the membrane hyperpolarizes.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A patient receives a drug that blocks muscarinic receptors everywhere. Predict the effects on heart rate and on gastric motility, and explain why both effects follow from the same receptor blockade.', model: 'At the heart\'s M2 receptors, ACh normally opens K+ channels and produces IPSPs that slow the heart rate; block the receptor and that parasympathetic braking is lost, so the heart rate rises. At the stomach\'s M1 receptors, ACh normally CLOSES K+ channels, producing EPSPs and contraction of the smooth muscle; block the receptor and the stomach\'s parasympathetic drive is lost, so gastric motility falls. Both effects — fast heart, quiet gut — come from one mechanism: removing ACh\'s muscarinic effect, whose direction depends entirely on which ion channel the receptor pathway controls in that tissue. The same logic explains anticholinergic side-effects generally: dry mouth, fast pulse, constipation are all one receptor family silenced.', rubric: ['Predicts tachycardia from losing M2-mediated K+ opening', 'Predicts reduced gastric motility from losing M1-mediated K+ closure', 'States the direction of ACh\'s effect is tissue- and receptor-dependent'] },
    ],
    commonMistakes: [
      'Assuming a transmitter is inherently excitatory or inhibitory. ACh is BOTH — the ion channel the receptor opens decides, which is why the lecture says excitatory or inhibitory depending on which ion channels are open.',
      'Saying ACh slows the heart everywhere. It slows the heart at M2 receptors specifically; in stomach smooth muscle the same transmitter CONTRACTS.',
      'Calling EPSPs action potentials in miniature. EPSPs are graded and can summate; the action potential is all-or-none and fires only if summation crosses threshold.',
      'Placing nicotinic and muscarinic receptors on the same signalling logic. Nicotinic opens the channel directly; muscarinic works through G proteins — different speeds, different drug targets.',
    ],
    sourceRefs: [
      { ref: 'phys.nerve.deck', location: 'p45 "2 types of Synapses"' },
      { ref: 'phys.nerve.deck', location: 'p46 "Cells are joined by gap junctions"' },
      { ref: 'phys.nerve.deck', location: 'p47 "release of a chemical called a neurotransmitter"' },
      { ref: 'phys.nerve.deck', location: 'p49 "ACh is a neurotransmitter that directly opens ion"' },
      { ref: 'phys.nerve.deck', location: 'p49 "Excitatory in some areas of the CNS, in some"' },
      { ref: 'phys.nerve.deck', location: 'p51 "Nicotinic Receptors"' },
      { ref: 'phys.nerve.deck', location: 'p52 "In the heart, K+ channels are opened,"' },
      { ref: 'phys.nerve.deck', location: 'p52 "In the smooth muscles"' },
      { ref: 'phys.8', location: 'p57 "Adrenergic Receptors (sympathetic)"' },
      { ref: 'phys.nerve.deck', location: 'p54 "Graded potentials are"' },
      { ref: 'phys.nerve.deck', location: 'p56 "EPSPs move the membrane potential closer to"'},
      { ref: 'phys.nerv.tut', location: 'p1 "Name two types of synapses and briefly describe the general properties of each."' },
      { ref: 'phys.nerv.tut', location: 'p1 "List the events involved in the functioning of a cholinergic synapse."' },
    ],
  },
  {
    id: 'abct2326-crossbridge-cycle',
    subject: 'ABCT2326', unit: 'phys.msk', type: 'sequence',
    title: 'The sarcomere and the crossbridge cycle',
    tags: ['musculoskeletal', 'high-yield'],
    practice: [
      { type: 'sequence', prompt: 'Put the crossbridge cycle in order, starting from a relaxed muscle.', items: ['ATP binds the myosin head', 'ATP is split to ADP + Pi and the head is cocked', 'Ca2+ binds troponin and tropomyosin moves off the actin binding site', 'The myosin head binds actin, forming the crossbridge', 'Pi is released and the power stroke pulls the thin filament inwards', 'ADP is released; the head stays bound until a new ATP arrives'],
        explanation: 'This is the summary sequence the source sets out, i) to xi). Note that ATP binding comes before attachment, and the next ATP is what detaches the head.' },
      { type: 'mcq', prompt: 'During contraction, which band does NOT change length?', options: ['The I band', 'The A band', 'The sarcomere', 'The H zone'], answer: 1,
        explanation: 'The A bands do not shorten; adjacent A bands simply move closer together. The I band shortens and the sarcomere shortens with it.' },
      { type: 'typed', prompt: 'Which ion binds troponin to start a contraction?', accept: ['calcium', 'ca2+', 'ca', 'calcium ions'],
        explanation: 'Two Ca2+ ions bind troponin C on the thin filament; the troponin–Ca2+ complex slides tropomyosin off the actin binding site.' },
      { type: 'mcq', prompt: 'Rigor mortis occurs because, after death,', options: ['calcium is pumped into the sarcoplasmic reticulum too quickly', 'there is no ATP to detach the myosin heads from actin', 'troponin can no longer bind calcium', 'the thick and thin filaments shorten permanently'], answer: 1,
        explanation: 'No breathing means no oxygen, so no ATP. Without ATP the pumps cannot return calcium to the sarcoplasmic reticulum, so calcium stays on troponin and crossbridges form — but ATP is what detaches a head, so they cannot release.' },
      { type: 'cloze', prompt: 'One sarcomere runs from ______ to ______.', accept: ['z line; z line', 'z line to z line', 'z disc; z disc', 'z disc to z disc'],
        explanation: 'From Z line to Z line — in three dimensions, Z disc to Z disc.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A student says "during contraction the myosin filaments shorten, which pulls the Z discs together." Correct the statement and give the evidence from the banding pattern that disproves it.',
        model: 'No filament shortens. The thin filaments slide over and between the thick ones towards the centre of the A band, and the Z discs are drawn together by that sliding. The banding pattern is the evidence: if the thick filaments shortened, the A band would shorten, since the A band IS the thick filament. It does not — the A band keeps its length throughout, while the I band shortens and adjacent A bands move closer together. What changes is the overlap between the two sets of filaments, not the length of either.',
        rubric: ['States that no filament changes length', 'Identifies the A band staying constant as the evidence', 'Explains that overlap, not filament length, is what changes'] },
      { type: 'scenario', prompt: 'Explain why ATP is needed both to contract a muscle and to relax it, naming the step it serves in each case.',
        model: 'For contraction, ATP binds the myosin head and is hydrolysed to ADP and phosphate; the energy released cocks the head into the position from which the power stroke can be driven. For relaxation, ATP has two jobs. It binds the bound head and detaches it from actin, ending the crossbridge — without that, the head stays attached in the rigor state. It also powers the pump that transports calcium out of the sarcoplasm back into the sarcoplasmic reticulum, and until cytoplasmic calcium falls, troponin keeps tropomyosin off the binding sites and cycling continues.',
        rubric: ['Contraction: ATP hydrolysis cocks the head', 'Relaxation: a new ATP detaches the head from actin', 'Relaxation: ATP powers calcium transport back into the sarcoplasmic reticulum'] },
    ],
    commonMistakes: [
      'Saying the filaments shorten. They slide; the A band proves it by keeping its length.',
      'Thinking ATP powers attachment. ATP hydrolysis cocks the head, and the NEXT ATP detaches it — attachment itself needs calcium to move tropomyosin.',
      'Placing calcium at the start of the cycle. The head is already cocked when calcium arrives; calcium unblocks the binding site rather than energising the head.',
      'Describing rigor mortis as a contraction. It is a failure to release — the same bound state a working muscle passes through in milliseconds, held indefinitely.',
    ],
    sourceRefs: [
      { ref: 'phys.susan9', location: 'p1 "The thick filaments are composed of the protein" myosin, and "from Z line to Z line, these subunits of muscle" are sarcomeres' },
      { ref: 'phys.susan9', location: 'p2 "These M lines anchor the thick filaments"; titin and elastic recoil' },
      { ref: 'phys.susan9', location: 'p3 "THE SLIDING FILAMENT THEORY" — "none of the thick and thin filaments actually shorten"' },
      { ref: 'phys.susan9', location: 'p4 "CROSS BRIDGES" — "this causes the myosin head to change shape to become" cocked' },
      { ref: 'phys.susan9', location: 'p5 "Two Ca2+ ions bind to troponin C on the actin filaments"; "A lack of ATP would result in the rigor state"' },
      { ref: 'phys.susan9', location: 'p6 "A single cross bridge power stroke can pull the actin" filament 6nm; "two regulator proteins located on" the thin filament' },
      { ref: 'phys.susan9', location: 'p7 "MUSCLE RELAXATION" — "a muscle fiber returns to its original length through a combination of 3 forces"' },
      { ref: 'phys.susan9', location: 'p10 "RIGOR MORTIS" — "it starts after about 3-4 hours, reaches maximum stiffness after 12 hours"' },
    ],
  },
  {
    id: 'abct2326-nmj-coupling',
    subject: 'ABCT2326', unit: 'phys.msk', type: 'sequence',
    title: 'From nerve to sarcomere: the junction, the motor unit and coupling',
    tags: ['musculoskeletal', 'nervous', 'high-yield'],
    practice: [
      { type: 'sequence', prompt: 'Order the events from the arrival of an action potential at the axon terminal to calcium reaching troponin.', items: ['The action potential depolarises the terminal, opening voltage-sensitive Ca2+ channels', 'Ca2+ enters the terminal and triggers release of acetylcholine vesicles', 'ACh binds nicotinic receptors on the motor end plate; Na+ channels open', 'The end-plate potential depolarises the sarcolemma', 'Voltage-gated Ca2+ channels in the transverse tubules change shape', 'Ryanodine receptors open in the sarcoplasmic reticulum and Ca2+ floods the sarcoplasm'],
        explanation: 'Note the two separate calcium events: calcium entering the nerve terminal to release ACh, and calcium leaving the sarcoplasmic reticulum to start contraction. They are different pools in different cells.' },
      { type: 'mcq', prompt: 'How does the end-plate potential differ from an EPSP at a neural synapse?', options: ['It is inhibitory rather than excitatory', 'It is much larger, and one is enough to depolarise the muscle membrane', 'It uses a different neurotransmitter with no receptor', 'It lasts 100 ms rather than 1–2 ms'], answer: 1,
        explanation: 'The mechanism is the same; the scale is not. More ACh is released over a larger surface area, so the EPP is much larger than an EPSP, and one EPP suffices.' },
      { type: 'typed', prompt: 'Name the calcium release channels in the sarcoplasmic reticulum.', accept: ['ryanodine receptors', 'ryanodine receptor', 'calcium release channels'],
        explanation: 'The conformational change in the T-tubule voltage-gated channels directly opens the calcium release channels, or ryanodine receptors, in the sarcoplasmic reticulum.' },
      { type: 'mcq', prompt: 'Why is a separate name — excitation–contraction coupling — needed for this step?', options: ['Because the electrical event acts directly on actin and myosin', 'Because the electrical event lasts 1–2 ms while the mechanical event lasts 100 ms or more, and calcium bridges them', 'Because the muscle can contract without any electrical activity', 'Because acetylcholine enters the muscle cell and binds troponin'], answer: 1,
        explanation: 'The electrical activity in the plasma membrane does not act on the contractile proteins. It raises cytosolic calcium, and calcium keeps the apparatus active long after the electrical activity has finished.' },
      { type: 'mcq', prompt: 'A single motor neuron fires. What contracts?', options: ['One muscle fibre', 'Every fibre in that neuron\'s motor unit, wherever in the muscle they lie', 'The whole muscle', 'Only the fibres adjacent to the axon terminal'], answer: 1,
        explanation: 'The motor unit is the neuron plus all the fibres it stimulates; they can be scattered through the muscle, and when the neuron fires all of them contract.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A patient has a condition in which acetylcholine receptors on the motor end plate are progressively destroyed. Predict the effect on the end-plate potential and on muscle contraction, and explain why the muscle action potential itself may be unaffected while movement is not.',
        model: 'With fewer receptors, less sodium entry follows each release of acetylcholine, so the end-plate potential is smaller. Normally one EPP is more than sufficient to depolarise the muscle membrane, so there is reserve; as receptors are lost the EPP falls towards, and eventually below, the threshold for a muscle action potential. The nerve action potential arriving at the terminal and the release of acetylcholine are unaffected — the failure is at the receiving membrane. So the neuron fires normally and the muscle does not respond, giving weakness that worsens with repeated use as transmitter release declines within a burst.',
        rubric: ['Predicts a smaller end-plate potential', 'Notes that one EPP normally has reserve above threshold', 'Locates the failure at the post-junctional membrane, not the nerve'] },
    ],
    commonMistakes: [
      'Confusing the two calcium pools. Calcium entering the nerve terminal releases ACh; calcium leaving the sarcoplasmic reticulum starts contraction. Different cells, different jobs.',
      'Expecting inhibitory junctions on skeletal muscle. There are none in humans — every neuromuscular junction is excitatory, and inhibition happens in the spinal cord instead.',
      'Thinking the muscle action potential drives the contraction directly. It does not touch the contractile proteins; it releases calcium, which does.',
      'Assuming a motor unit\'s fibres sit together. They are scattered, which is why a weak contraction is smooth rather than lumpy.',
    ],
    sourceRefs: [
      { ref: 'phys.susan9', location: 'p8 "NEUROMUSCULAR JUNCTION" — "The motor neuron plus the muscle fibres that it stimulates" is a motor unit' },
      { ref: 'phys.susan9', location: 'p9 "All neuromuscular junctions are excitatory"; acetylcholinesterase and the 1–2 ms action potential' },
      { ref: 'phys.susan9', location: 'p9 "levels need to increase above 10-6 molar before a contraction occurs"; terminal cisternae' },
      { ref: 'phys.susan9', location: 'p9 the three-step coupling chain, ending at the ryanodine receptors' },
    ],
  },
  {
    id: 'abct2326-fibre-types-fuel',
    subject: 'ABCT2326', unit: 'phys.msk', type: 'comparison',
    title: 'Slow and fast twitch, and where a muscle gets its energy',
    tags: ['musculoskeletal'],
    practice: [
      { type: 'matching', prompt: 'Match each fibre property to the type it belongs to.',
        pairs: [['Type I, slow twitch', 'Red, myoglobin-rich, many mitochondria and capillaries'], ['Type II, fast twitch', 'White, thicker, large glycogen store and glycolytic enzymes'], ['Type IIA, intermediate', 'Fast but oxidative and fatigue-resistant'], ['Myoglobin', 'One globin subunit; stores oxygen and gives the red colour']],
        explanation: 'The colour names follow the myoglobin content, and every other property follows from aerobic against anaerobic adaptation.' },
      { type: 'mcq', prompt: 'Which two processes does the source name as the specific energy costs of muscle activity?', options: ['Making actin and myosin, and repairing membranes', 'Moving the crossbridges, and pumping Ca2+ into the sarcoplasmic reticulum', 'Producing acetylcholine, and breaking it down', 'Conducting the action potential, and releasing myoglobin'], answer: 1,
        explanation: 'Energy is needed for the movement of crossbridges for contraction, and for pumping calcium into the sarcoplasmic reticulum for relaxation. Relaxation is an active process.' },
      { type: 'typed', prompt: 'What is the maximum rate of oxygen consumption by aerobic respiration called?', accept: ['vo2 max', 'maximal oxygen uptake', 'aerobic capacity', 'maximal o2 uptake'],
        explanation: 'Maximal O₂ uptake, or aerobic capacity, abbreviated VO₂ max.' },
      { type: 'mcq', prompt: 'Extraocular muscle motor units have an innervation ratio of about 3. What does that buy?', options: ['Maximum force from a small muscle', 'Very fine control of movement', 'Resistance to fatigue', 'A high myoglobin content'], answer: 1,
        explanation: 'The eyes need rapid, precise movement but little strength, so each neuron commands very few fibres and movement can be graded finely.' },
      { type: 'cloze', prompt: 'Fat yields ______ Calories per gram against ______ for carbohydrate.', accept: ['9; 4', '9 and 4', 'nine; four'],
        explanation: 'More than twice the energy per gram, which is why fat is the body\'s energy store and the major fuel for light to moderate exercise.' },
    ],
    application: [
      { type: 'scenario', prompt: 'Two people exercise at the same absolute intensity. One is a trained endurance athlete and reports far less fatigue. Using lactate threshold and VO₂ max, explain the difference — and say what training changed inside the fibres.',
        model: 'The athlete has a higher VO₂ max, so the same absolute workload is a smaller percentage of their maximum. Their lactate threshold is also higher as a percentage — around 80% of VO₂ max against perhaps 60% untrained — so at that workload they are still below the point where blood lactate rises sharply, while the untrained person is above it and accumulating lactate with the acidity and slowing that follows. Inside the fibres, endurance training increased mitochondria and then the aerobic respiratory enzymes in all fibre types, raising maximum oxygen uptake by up to about 20%. It did not make the muscles bigger: enlargement comes only from high-intensity work against resistance, which thickens Type II fibres by hypertrophy.',
        rubric: ['Uses VO₂ max to make the same workload a lower relative intensity', 'Compares lactate thresholds as a percentage of VO₂ max', 'States endurance training adds mitochondria and enzymes rather than size'] },
    ],
    commonMistakes: [
      'Treating relaxation as free. Pumping calcium back into the sarcoplasmic reticulum is one of the two named energy costs.',
      'Assuming endurance training builds muscle size. It builds mitochondria; size comes from resistance work.',
      'Reading lactate as pure damage. Its acidity slows the pathways that sustain contraction, which the source frames as protection against permanent damage.',
      'Confusing myoglobin with haemoglobin. One subunit against four, in muscle rather than in red cells.',
    ],
    sourceRefs: [
      { ref: 'phys.susan9', location: 'p11 "ENERGY REQUIREMENTS OF MUSCLES"; GLUT4; "for the first 45-90 seconds skeletal muscles metabolize anaerobically"' },
      { ref: 'phys.susan9', location: 'p13 "MAXIMAL OXYGEN UPTAKE"; "OXYGEN DEBT"; "PHOSPHOCREATINE"' },
      { ref: 'phys.susan9', location: 'p14 "SLOW & FAST TWITCH" — "slow twitch fibers are also called" red fibers; fast twitch have "fewer capillaries, fewer myoglobin and mitochondria"' },
      { ref: 'phys.susan9', location: 'p15 soleus "has an average innervation ratio of 180 muscle fibers for each motor neuron"; "extraocular muscle motor units are extremely small"' },
      { ref: 'phys.susan9', location: 'p16 "Endurance training does not increase the size of muscles"; "the muscle therefore grows by" hypertrophy — "the myofibrils within a muscle fiber thicken due to synthesis of actin and myosin proteins"; lactate as a protective slowing' },
    ],
  },
  {
    id: 'abct2326-spindle-golgi',
    subject: 'ABCT2326', unit: 'phys.msk', type: 'comparison',
    title: 'How a muscle reports back: spindles, tendon organs and the tracts above them',
    tags: ['musculoskeletal', 'nervous'],
    practice: [
      { type: 'matching', prompt: 'Match each receptor or tract to what it does.',
        pairs: [['Muscle spindle', 'Reports muscle LENGTH; stretching it excites the muscle to contract'], ['Golgi tendon organ', 'Reports TENSION on the tendon; inhibits the muscle to protect it'], ['Pyramidal tracts', 'Voluntary movement; cross in the pyramids of the medulla'], ['Extrapyramidal tracts', 'Subconscious movement — posture, initiation, facial muscles']],
        explanation: 'Two sensors with opposite signs, and two descending systems with opposite kinds of control.' },
      { type: 'mcq', prompt: 'Why is the Golgi tendon organ reflex called disynaptic?', options: ['Because it involves two receptors', 'Because two synapses are crossed in the CNS — the sensory nerve synapses with an interneuron, which synapses with the motor neuron', 'Because it acts on two muscles at once', 'Because it requires two action potentials to trigger'], answer: 1,
        explanation: 'Di- means two. The interneuron is what makes the reflex inhibitory: a sensory signal cannot inhibit a motor neuron directly.' },
      { type: 'typed', prompt: 'What are the thin muscle cells inside a muscle spindle called?', accept: ['intrafusal fibers', 'intrafusal fibres', 'intrafusal'],
        explanation: 'Intrafusal fibres, packed within a connective tissue sheath. The ordinary fibres outside the spindle are extrafusal.' },
      { type: 'sequence', prompt: 'Order the knee jerk reflex from the tap to the movement.', items: ['The patellar ligament is struck, stretching the muscle body', 'The spindles within the muscle are stretched', 'Primary sensory endings are activated and their axons enter the spinal cord', 'They synapse in the ventral grey matter with alpha motor neurons', 'The alpha motor neurons stimulate the extrafusal fibres of the extensor', 'An isotonic contraction produces the jerk'],
        explanation: 'A single CNS synapse, which is why the response is so fast and so reproducible.' },
      { type: 'mcq', prompt: 'If the pyramidal tracts are cut, what happens to movement?', options: ['All movement is abolished permanently', 'Movement can still be produced, because the extrapyramidal system influences it indirectly', 'Only reflexes remain, and no cortical influence survives', 'Movement continues unchanged in every respect'], answer: 1,
        explanation: 'The cerebral cortex, cerebellum and basal nuclei retain many synaptic interconnections, so the extrapyramidal tracts can still produce movement.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A muscle is stretched steadily further and further. Predict what the spindle does and what the Golgi tendon organ does, and explain why the muscle eventually relaxes rather than pulling harder.',
        model: 'Stretching stretches the spindle, which lies in parallel with the ordinary fibres, and its primary and secondary endings fire — primary most at the onset, secondary in a sustained way. Through the monosynaptic stretch reflex this excites alpha motor neurons and the muscle contracts to resist. That contraction, plus the stretch itself, raises tension on the tendon, which the Golgi tendon organs monitor. Their sensory nerves synapse with interneurons in the cord that inhibit the very motor neurons driving the muscle. As tension climbs, that inhibition eventually overrides the stretch reflex and the muscle relaxes. The purpose is protective: it prevents dangerous tension on the tendon from excessive contraction or extreme stretch.',
        rubric: ['Spindle detects the length change and excites the muscle', 'Golgi tendon organ detects rising tension and inhibits via an interneuron', 'Identifies the relaxation as protection of the tendon'] },
    ],
    commonMistakes: [
      'Swapping the two sensors. Spindle = length, in parallel with the fibres. Tendon organ = tension, in series at the tendon.',
      'Calling the Golgi tendon reflex monosynaptic. It needs the interneuron, because that is what converts excitation into inhibition.',
      'Assuming extrapyramidal means "less important". It carries posture, movement initiation and facial muscles, and its failure is what Parkinson\'s presents as.',
      'Thinking the pyramidal tracts synapse on the way down. They descend from cortex to cord without synapsing en route.',
    ],
    sourceRefs: [
      { ref: 'phys.susan9', location: 'p17 "MUSCLE SPINDLE APPARATUS"; intrafusal and extrafusal fibres; "Muscles in the hands have the most amount of spindles"' },
      { ref: 'phys.susan9', location: 'p18 "THE KNEE JERK REFLEX (STRETCH REFLEX)" and the alpha motor neuron' },
      { ref: 'phys.susan9', location: 'p18 "GOLGI TENDON ORGANS" — "This inhibitory reflex helps prevent dangerous tension on a tendon"' },
      { ref: 'phys.susan9', location: 'p19 "UPPER NEURON CONTROL OF SKELETAL MUSCLES" — "pyramidal tracts are for voluntary movements"' },
      { ref: 'phys.susan9', location: 'p20 "extrapyramidal symptoms" in Parkinson\'s disease' },
    ],
  },
  {
    id: 'abct2326-complement',
    subject: 'ABCT2326', unit: 'phys.imm', type: 'sequence',
    title: 'Complement: two pathways to the same hole in the wall',
    tags: ['immune', 'high-yield'],
    practice: [
      { type: 'sequence', prompt: 'Order the classical complement pathway.', items: ['Antibodies attach to the foreign cell', 'C1 binds to two antibodies and becomes an activated enzyme', 'C1 cleaves C2 and C4; C2a and C4b form C3 convertase', 'C3 convertase splits C3; C3b attaches to the membrane', 'C3b helps C5, C6, C7, C8 and C9 form the membrane attack complex', 'The pore kills the cell by osmotic influx of water'],
        explanation: 'Note that C3 is cleaved after C2 and C4, by the enzyme those two build.' },
      { type: 'mcq', prompt: 'What actually kills the bacterial cell in the classical pathway?', options: ['The antibodies bound to its surface', 'The C1 enzyme', 'The membrane attack complex formed by C5–C9', 'Histamine released by mast cells'], answer: 2,
        explanation: 'The source is explicit that the complement proteins kill the cell and the antibodies serve only as an activator. The membrane attack complex is the pore that lets water in osmotically.' },
      { type: 'mcq', prompt: 'How does the alternative pathway differ from the classical one?', options: ['It produces no membrane attack complex', 'It requires no antibody attachment, being activated by foreign material such as a bacterial capsule', 'It is faster and more effective', 'It uses a different set of C5–C9 proteins'], answer: 1,
        explanation: 'No antibody is needed; properdin, factor B and factor D bring it to an activated C3b, after which it follows the classical pathway. It is slower and less effective.' },
      { type: 'typed', prompt: 'Which complement fragments stimulate mast cells to release histamine?', accept: ['c3a and c5a', 'c3a, c5a', 'c3a c5a'],
        explanation: 'C3a and C5a stimulate histamine release; C5a additionally acts as a chemokine attracting neutrophils and monocytes.' },
      { type: 'cloze', prompt: 'C2a and C4b together form the enzyme ______.', accept: ['c3 convertase', 'c3-convertase'],
        explanation: 'C3 convertase, which then splits C3 into C3a and C3b.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A person cannot make antibodies but has a fully functioning complement system. Can complement still destroy a bacterium? Explain which pathway operates, what it costs them, and which downstream effects they keep.',
        model: 'Yes. The classical pathway is unavailable, because C1 has to bind antibody already attached to antigen, and there is none. The alternative pathway is not antibody-dependent: foreign material such as a bacterial capsule activates properdin, factor B and factor D, arriving at an activated C3b on the bacterial wall. From C3b the sequence is the same, so the membrane attack complex still forms from C5 to C9 and still kills by osmotic influx. The cost is speed and effectiveness — the source describes the alternative pathway as slower and less effective. All three downstream effects are retained: pore formation, enhanced phagocytosis, and histamine release, since C3a and C5a are produced either way.',
        rubric: ['Identifies the alternative pathway as the one available', 'Explains that it converges on C3b and still forms the membrane attack complex', 'Notes the cost is speed and effectiveness, not loss of the end effects'] },
    ],
    commonMistakes: [
      'Crediting antibodies with the killing. They are the activator; the complement proteins make the pore.',
      'Expecting the numbers to run in order. C1 acts on C2 and C4 before C3 is touched, because C2a and C4b are what cleave C3.',
      'Treating the split fragments as debris. C3a and C5a drive histamine release and chemotaxis — the inflammatory half of complement\'s job.',
      'Quoting a protein count as settled. The two course documents say eleven and thirty; the cascade is what is examinable.',
      'Thinking the alternative pathway has a different ending. It converges on C3b; everything after that is identical.',
    ],
    sourceRefs: [
      { ref: 'phys.10.2026', location: 'Slide 30 "5. Complement System"' },
      { ref: 'phys.10.2026', location: 'Slide 31 "Pathways of Complement Activation"' },
      { ref: 'phys.susan10', location: 'p4 "COMPLEMENT is a system of circulating proteins that assists antibodies" — eleven C proteins in blood plasma' },
      /* The conflicting count, cited so the disagreement is visible from the item
         rather than discovered by a student who reads both. */
      { ref: 'phys.10', location: 'Slide 27 "Complement System" — "Plasma contains 30 special complement (C) proteins"' },
      { ref: 'phys.susan10', location: 'p4 "THE CLASSICAL PATHWAY" — C1 to C3 convertase to the "membrane attack complex"' },
      { ref: 'phys.susan10', location: 'p4 "So it is these complement proteins that kill the cell (not the antibodies)"; C3a and C5a driving histamine release' },
      { ref: 'phys.susan10', location: 'p6 "THE ALTERNATIVE PATHWAY" — properdin, factor B, factor D, converging on C3b' },
    ],
  },
  {
    id: 'abct2326-mhc-costimulation',
    subject: 'ABCT2326', unit: 'phys.imm', type: 'comparison',
    title: 'MHC, CD markers and costimulation: how a T cell is allowed to act',
    tags: ['immune', 'high-yield'],
    practice: [
      { type: 'matching', prompt: 'Match each MHC class or marker to its correct description.',
        pairs: [['Class I MHC', 'On all nucleated cells; flags the cell itself as abnormal'], ['Class II MHC', 'On lymphocytes and antigen presenting cells only; flags a captured antigen as dangerous'], ['CD8', 'On cytotoxic and suppressor T cells; responds to Class I'], ['CD4', 'On helper T cells; responds to Class II']],
        explanation: 'Class I with CD8, Class II with CD4 — and the message each class carries is what decides whether the displaying cell is destroyed or merely believed.' },
      { type: 'mcq', prompt: 'What is costimulation and why does it exist?', options: ['A second antigen binding to the same receptor, to confirm the antigen\'s identity', 'A required second binding site between T cell and stimulating cell, preventing T cells from attacking normal cells', 'The binding of two T cells to the same target', 'The release of cytokines by a helper T cell'], answer: 1,
        explanation: 'The T cell must bind the stimulating cell at a second site to confirm the initial activation signal. Without the danger signal, a cell displaying an unusual antigen does not activate the T cell.' },
      { type: 'typed', prompt: 'On which chromosome is the major histocompatibility complex located?', accept: ['6', 'chromosome 6', 'six'],
        explanation: 'The genes controlling MHC protein synthesis lie along one portion of chromosome 6.' },
      { type: 'mcq', prompt: 'Why are donated organs commonly rejected even after cross-match testing?', options: ['Because the donor tissue carries no MHC proteins at all', 'Because the recipient\'s T cells still recognise the transplanted tissue\'s MHC proteins as foreign', 'Because Class II MHC is absent from transplanted tissue', 'Because the graft cannot present antigen'], answer: 1,
        explanation: 'MHC amino acid sequences and shapes differ between individuals, so even after preliminary cross-matching the recipient\'s T cells read the graft as foreign.' },
      { type: 'sequence', prompt: 'Order the activation of a B cell.', items: ['Antigen binds the antibody molecules on the B cell membrane', 'The antigen is taken in by endocytosis', 'The antigen reappears on the B cell surface bound to Class II MHC', 'A helper T cell binds that MHC protein and releases cytokines', 'The B cell divides, producing plasma cells and memory B cells', 'Plasma cells release antibodies at around 100 million per hour'],
        explanation: 'The wait for the helper T cell is the point: it is the same kind of safety mechanism as costimulation, applied to antibody production.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A virus replicates inside a liver cell. Trace how the immune system detects and destroys that cell, naming the MHC class, the CD marker, the T cell type, and explaining why an antibody could not have done the job.',
        model: 'The infected liver cell is nucleated, so it carries Class I MHC proteins. These are made at the Golgi apparatus and carry small peptides from the cytoplasm out to the plasma membrane; because the cytoplasm now contains viral proteins, viral peptides appear in the groove of Class I MHC on the cell surface. A T cell bearing the CD8 marker — a cytotoxic T cell — responds to antigen presented by Class I, recognises the displayed viral peptide as foreign, and after costimulation destroys the cell, by perforin, by a lymphotoxin, or by activating the target cell\'s own genes for apoptosis. An antibody could not do this because the virus is inside the cell and antibodies cannot cross plasma membranes; antibody-mediated immunity defends against antigens and pathogens in body fluids, which is precisely where this virus is not.',
        rubric: ['Names Class I MHC on the nucleated infected cell', 'Names CD8 and the cytotoxic T cell', 'Explains that antibodies cannot cross the plasma membrane to reach an intracellular virus'] },
    ],
    commonMistakes: [
      'Thinking a T cell can bind free antigen. It cannot — the antigen must be presented on an MHC protein.',
      'Placing Class II on all cells. Class I is on all nucleated cells; Class II is restricted to lymphocytes and antigen presenting cells.',
      'Treating antigen recognition as activation. Recognition merely prepares the cell; costimulation is what activates it.',
      'Assuming a B cell can act on antigen alone. It sensitises, then waits for a helper T cell before producing antibody.',
    ],
    sourceRefs: [
      { ref: 'phys.susan10', location: 'p10 "major histocompatibility complex"; "Class I MHC proteins are in the plasma membranes of all nucleated cells"' },
      { ref: 'phys.susan10', location: 'p11 "Class II MHC proteins are found in only in lymphocytes and antigen presenting cells"' },
      { ref: 'phys.susan10', location: 'p12 "CD8 T cells are found on cytotoxic T cells and suppressor T cells"; "CD4 T cells are found on helper T cells"' },
      { ref: 'phys.susan10', location: 'p12 "COSTIMULATION" — "Costimulation is like the safety on a gun"' },
      { ref: 'phys.susan10', location: 'p13 "B CELL ACTIVATION" — "The sensitized B cell is then on standby until it receives" the OK from a helper T cell' },
      { ref: 'phys.susan10', location: 'p14 plasma cells releasing "100 million antibodies/hour"' },
    ],
  },
  /*
   * Second pass over phys.susan10. The first took the two structural topics —
   * complement and MHC — and left the rest, which turned out to be four more
   * lessons rather than a footnote: the existing items NAME the seven innate
   * defences and the active/passive split, and these test how any of it works.
   */
  {
    id: 'abct2326-innate-mechanisms',
    subject: 'ABCT2326', unit: 'phys.imm', type: 'comparison',
    title: 'Inside three innate defences: phagocytes, NK cells, interferons',
    tags: ['immune', 'high-yield'],
    practice: [
      { type: 'matching', prompt: 'Match each term to what it describes.',
        pairs: [['Diapedesis', 'Squeezing between endothelial cells to leave a capillary'], ['Chemotaxis', 'Being attracted or repelled by chemicals in the surrounding fluid'], ['Perforin', 'Forms pores in a target membrane so the cell lyses'], ['Immunological escape', 'A cancer cell avoiding destruction by NK cells']],
        explanation: 'The first two are how a phagocyte gets to the site; the second two are the NK cell\'s weapon and its failure mode.' },
      { type: 'mcq', prompt: 'Why do NK cells respond much faster than T cells or B cells?', options: ['They are far more numerous in the blood', 'T and B cells require a more complex and time-consuming sequence of events first', 'They do not need to make contact with the target cell', 'They are stored in the spleen ready-activated'], answer: 1,
        explanation: 'The source gives exactly this reason: NK cells are less selective, but T and B cell responses involve a complex and time-consuming sequence, so NK cells act long before they do.' },
      { type: 'typed', prompt: 'Roughly how many bacteria does a neutrophil engulf before most of them die?', accept: ['25', 'more than 25', 'twenty-five', '25 bacteria'],
        explanation: 'Most neutrophils die after engulfing more than 25 bacteria — and during an infection one may attack that many in a single hour.' },
      { type: 'mcq', prompt: 'What does an interferon actually do to a virus?', options: ['Dissolves the viral capsid directly', 'Nothing — it triggers antiviral proteins in neighbouring cells that interfere with replication', 'Marks the virus for complement attack', 'Forms pores in the viral envelope'], answer: 1,
        explanation: 'The interferon binds a receptor on a normal cell and, via second messengers, causes that cell to make antiviral proteins. It never touches the virus; it prepares the cells around the infection.' },
      { type: 'cloze', prompt: 'Most cells other than lymphocytes and macrophages answer a viral infection by secreting ______-interferon.', accept: ['beta', 'β', 'beta interferon'],
        explanation: 'Alpha, beta and gamma interferons all exist; beta is the one most other cells secrete.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A virus is replicating inside a cell. Explain why an antibody is useless here, and name two innate defences that are not — saying for each what it acts on.',
        model: 'An antibody cannot cross a plasma membrane, so a virus inside a cell is out of its reach; antibody-mediated immunity defends against pathogens in body fluids. Two innate defences still work. Immunological surveillance: the infected cell displays viral antigens on its own plasma membrane, an NK cell recognises those as abnormal, adheres, and releases perforin that forms pores and lyses the cell — so it acts on the infected host cell, not the virus. Interferons: the infected tissue releases them, and they bind receptors on the surrounding normal cells, triggering antiviral proteins in those cells\' cytoplasm that interfere with replication — so they act on the cells not yet infected. One destroys the factory, the other prepares the neighbours.',
        rubric: ['States that antibodies cannot cross the plasma membrane', 'NK cells act on the infected cell via displayed viral antigen and perforin', 'Interferons act on neighbouring uninfected cells, not on the virus'] },
    ],
    commonMistakes: [
      'Calling interferons antiviral drugs. They kill nothing — they induce antiviral proteins in other cells.',
      'Assuming NK cells are a kind of adaptive lymphocyte. They are innate: fast, less selective, and need no prior exposure.',
      'Treating "macrophage" and "microphage" as the same word misspelled. Microphages are the circulating neutrophils and eosinophils; macrophages come from monocytes.',
      'Forgetting that a neutrophil is consumable. Most die at around 25 bacteria, which is why an infection needs so many of them.',
    ],
    sourceRefs: [
      { ref: 'phys.susan10', location: 'p2 "Microphages are the neutrophils and eosinophils"; "Most neutrophils die after they have engulfed more than 25 bacteria"' },
      { ref: 'phys.susan10', location: 'p2 macrophages "move through capillary walls by squeezing through the endothelial cells known as" diapedesis; "attracted to or repelled by chemicals in the surrounding fluids, a phenomenon called chemotaxis"' },
      { ref: 'phys.susan10', location: 'p2 "NK cells respond much more rapidly than T cells or B cells"; perforins "create a network of pores which are large enough to allow the free" passage of ions and proteins' },
      { ref: 'phys.susan10', location: 'p3 "Perforin does not affect NK cell membranes" — protectin; "immunological escape"' },
      { ref: 'phys.susan10', location: 'p3 "INTERFERONS are chemical messengers that coordinate the defenses against viral infections"; most cells "respond to viral infection by secreting beta-interferon"; "Interferons are examples of cytokines"' },
    ],
  },
  {
    id: 'abct2326-inflammation-fever',
    subject: 'ABCT2326', unit: 'phys.imm', type: 'definition',
    title: 'What drives inflammation, and what a fever is for',
    tags: ['immune'],
    practice: [
      { type: 'mcq', prompt: 'Why does increased capillary permeability matter beyond causing swelling?', options: ['It lets red blood cells enter the tissue to carry oxygen', 'It lets clotting factors and complement proteins leave the blood and reach the injury', 'It lowers the local temperature', 'It prevents neutrophils from arriving too early'], answer: 1,
        explanation: 'Permeability is how the plasma protein systems reach an injury at all — clotting factors and complement proteins leave the bloodstream and enter the injured or infected area.' },
      { type: 'typed', prompt: 'Where in the brain is the thermostat that a pyrogen resets?', accept: ['preoptic area of the hypothalamus', 'hypothalamus', 'preoptic area', 'preoptic hypothalamus'],
        explanation: 'The preoptic area of the hypothalamus contains a temperature-regulating centre; circulating pyrogens reset it and raise body temperature.' },
      { type: 'mcq', prompt: 'What is the most likely benefit of a fever, according to the source?', options: ['It kills all bacteria outright', 'It raises metabolic rate — about 10% per 1 °C — so defences mobilise and repair speeds up', 'It reduces blood flow to infected tissue', 'It suppresses the inflammatory response'], answer: 1,
        explanation: 'High temperature may inhibit some viruses and bacteria, but the source names the metabolic effect as the most likely benefit: cells move faster, enzyme reactions run quicker, defences mobilise sooner.' },
      { type: 'cloze', prompt: 'The endogenous pyrogen released by active macrophages is also called ______.', accept: ['interleukin-1', 'il-1', 'interleukin 1'],
        explanation: 'Active macrophages release a cytokine called endogenous pyrogen, or interleukin-1 (IL-1).' },
      { type: 'matching', prompt: 'Match each product or agent to what it is.',
        pairs: [['Histamine', 'Raises capillary permeability, increasing blood flow'], ['Pus', 'Debris, fluid and dead and dying cells at the injury site'], ['Abscess', 'Pus accumulated in an enclosed tissue space'], ['Pyrogen', 'Resets the hypothalamic thermostat upwards']],
        explanation: 'The first three belong to the local response, the last to the systemic one.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A patient is given a drug that blocks histamine release during a bacterial skin infection. Predict what happens to the local defence, naming two things that would be impaired and why.',
        model: 'Blocking histamine removes the rise in capillary permeability, and almost every part of the local response follows from that. First, blood flow through the area falls, so fewer neutrophils and macrophages reach the infection and the redness and local temperature rise is lost — which also removes the increase in enzyme reaction rates and phagocyte activity that the heat produces. Second, clotting factors and complement proteins can no longer leave the bloodstream and enter the injured area, so the plasma protein systems are effectively locked out: no membrane attack complex forming on the bacteria in the tissue, and no fibrin barrier. The defence is not abolished, since neutrophil chemotaxis and the cytokines they release still operate on whatever cells are present, but it is substantially slowed.',
        rubric: ['Identifies loss of capillary permeability as the central effect', 'Names reduced arrival of phagocytes and/or the loss of local heat and its enzyme effect', 'Names complement and clotting factors being unable to leave the blood'] },
    ],
    commonMistakes: [
      'Treating the pain of inflammation as pure damage. The source lists it as a function — it is what makes the person remove the cause.',
      'Thinking fever works only by cooking the pathogen. Inhibiting some organisms is secondary; the named benefit is a faster metabolism.',
      'Confusing pus with abscess. Pus is the mixture; an abscess is pus with nowhere to drain.',
      'Assuming a pyrogen is always foreign. Your own macrophages make one — interleukin-1.',
    ],
    sourceRefs: [
      { ref: 'phys.susan10', location: 'p7 "Mast cells play a role in inflammation" — they release "histamine, heparin, prostaglandins" and stimulate sensory neurons to produce pain' },
      { ref: 'phys.susan10', location: 'p7 "This viscous fluid mixture is known as" pus; "An accumulation of pus in an enclosed tissue space is called an" abscess' },
      { ref: 'phys.susan10', location: 'p7 "FEVER is an elevation of body temperature"; "Fever is the maintenance of a body temperature greater than 37.2"' },
      { ref: 'phys.susan10', location: 'p7 pyrogens "can reset this thermostat and raise body temperature"; "endogenous pyrogen, or interleukin-1"; for each 1 °C "metabolic rate increases" by 10%' },
    ],
  },
  {
    id: 'abct2326-t-cell-types',
    subject: 'ABCT2326', unit: 'phys.imm', type: 'comparison',
    title: 'Four kinds of T cell, and what each is for',
    tags: ['immune', 'high-yield'],
    practice: [
      { type: 'matching', prompt: 'Match each T cell to its job.',
        pairs: [['Cytotoxic T cell', 'Attacks and destroys infected or abnormal cells directly'], ['Memory T cell', 'Clones more lymphocytes on re-encountering a known antigen'], ['Helper T cell', 'Stimulates both T cells and B cells; B cells need it to make antibody'], ['Suppressor T cell', 'Inhibits T and B cell activity and moderates the response']],
        explanation: 'Two drive the response, one records it, one limits it.' },
      { type: 'mcq', prompt: 'Why does losing helper T cells reduce immunity so broadly?', options: ['Helper T cells do most of the killing', 'Helper T cells produce most antibody', 'B cells cannot produce antibody until a helper T cell activates them, and helper T cells also stimulate T cells', 'Helper T cells are the only cells carrying MHC proteins'], answer: 2,
        explanation: 'Helper T cells are described as absolutely vital because they must activate B cells before antibody production can begin, and they stimulate T cells as well — so both arms of adaptive immunity depend on them.' },
      { type: 'typed', prompt: 'Name the poison, other than perforin, that a cytotoxic T cell can secrete to kill a target.', accept: ['lymphotoxin', 'a lymphotoxin'],
        explanation: 'It can release perforin, secrete a poisonous lymphotoxin, or activate the target cell\'s own genes for apoptosis.' },
      { type: 'mcq', prompt: 'Cytotoxic and suppressor T cells both carry CD8. What separates them in practice?', options: ['They respond to different MHC classes', 'Suppressors take longer to activate, and most CD8 cells become cytotoxic — so suppressors act after the initial response', 'Suppressors carry CD4 as well', 'Cytotoxic cells act only in lymph nodes'], answer: 1,
        explanation: 'Both respond to Class I MHC. The difference is timing and proportion: suppressors are slower to activate and fewer, so they moderate the response once it is already running.' },
      { type: 'mcq', prompt: 'A cytotoxic T cell response takes about two days to become effective. What compensates on a second exposure?', options: ['Suppressor T cells', 'Memory T cells, which clone rapidly on re-encountering the antigen', 'Class II MHC proteins', 'Interferons'], answer: 1,
        explanation: 'Memory T cells respond to antigens already encountered by cloning more lymphocytes, producing a prompt and effective response before the infection gets worse.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A patient has lost most of their CD4 T cells but their CD8 count is normal. Predict the effect on antibody production and on cell-mediated immunity, and explain why one normal cell count is not enough.',
        model: 'CD4 marks the helper T cells, so this patient has lost the helpers while retaining cytotoxic and suppressor cells. Antibody production is severely impaired: a B cell sensitises when antigen binds its surface antibody and re-presents that antigen on Class II MHC, but it then stays on standby until a helper T cell binds and releases the cytokines that permit division — with no helpers, that permission never comes and plasma cells are not formed. Cell-mediated immunity is also reduced, though less absolutely: cytotoxic T cells are still present and can be activated through Class I MHC, but helper T cell cytokines normally stimulate T cell division, speed cytotoxic maturation and recruit macrophages, so the response is slower and weaker. A normal CD8 count is not enough because the CD8 cells are the effectors, not the coordinators.',
        rubric: ['Identifies CD4 as helper T cells', 'Explains B cells waiting for helper permission before making antibody', 'Notes cell-mediated immunity is impaired but not abolished, since CD8 effectors remain'] },
    ],
    commonMistakes: [
      'Reading a CD marker as a job. CD8 covers cytotoxic AND suppressor cells, which do opposite things.',
      'Expecting the cytotoxic response to be fast. It needs about two days, which is why memory cells matter so much on re-exposure.',
      'Thinking helper T cells kill something. They kill nothing and make no antibody; they give permission.',
      'Treating suppressor T cells as a defect or a failure. Limiting escalation from a single stimulus is their function.',
    ],
    sourceRefs: [
      { ref: 'phys.susan10', location: 'p9 "FOUR TYPES OF T CELLS" — "Memory T cells respond to antigens they have already encountered"' },
      { ref: 'phys.susan10', location: 'p9 "Helper T cells are absolutely vital to the immune response"; "For AIDS patients, they lose a lot of helper T cells"' },
      { ref: 'phys.susan10', location: 'p9 "Suppressor T cells inhibit T cell and B cell activities"' },
      { ref: 'phys.susan10', location: 'p12 perforin, "lymphotoxin" or apoptosis; "This takes time of about 2 days or more before it is effective"' },
      { ref: 'phys.susan10', location: 'p12 suppressor T cells and suppression factors — "It takes longer to activate than other types of T cells"' },
    ],
  },
  {
    id: 'abct2326-acquired-immunity',
    subject: 'ABCT2326', unit: 'phys.imm', type: 'comparison',
    title: 'Four ways to become immune: active or passive, natural or artificial',
    tags: ['immune', 'high-yield'],
    practice: [
      { type: 'matching', prompt: 'Match each situation to its route.',
        pairs: [['Catching a cold and recovering', 'Naturally acquired active immunity'], ['Receiving a vaccine', 'Artificially induced active immunity'], ['Antibodies crossing the placenta to a fetus', 'Naturally acquired passive immunity'], ['Injected antibodies after a bite from a rabid animal', 'Artificially induced passive immunity']],
        explanation: 'Ask who made the antibody first (active/passive), then how the exposure happened (natural/artificial).' },
      { type: 'mcq', prompt: 'Why can an antibody not defend against a virus already inside a cell?', options: ['The virus is too small for an antibody to bind', 'Antibodies cannot cross plasma membranes', 'Antibodies are destroyed by cytoplasmic enzymes', 'The cell stops presenting antigen once infected'], answer: 1,
        explanation: 'Antibodies produced by activated B cells cannot cross plasma membranes, which is why anything inside a cell is cell-mediated work.' },
      { type: 'cloze', prompt: 'T cells provide ______ immunity; B cells provide ______ immunity.', accept: ['cell-mediated; antibody-mediated', 'cellular; humoral', 'cell mediated; humoral', 'cell-mediated; humoral'],
        explanation: 'T cells: cell-mediated or cellular. B cells: antibody-mediated or humoral.' },
      { type: 'mcq', prompt: 'Which of these produces immunity that fades, because nothing in the recipient is making more antibody?', options: ['Recovering from an infection', 'A vaccine', 'Antibodies received through breast milk', 'Exposure to an environmental antigen'], answer: 2,
        explanation: 'Breast milk antibodies are passive: transferred from another source. Passive immunity delivers finished antibody with no antibody-producing cells behind it.' },
      { type: 'typed', prompt: 'A vaccine contains a dead or inactivated pathogen, or what else?', accept: ['antigens derived from that pathogen', 'antigens from the pathogen', 'antigens', 'antigens derived from it'],
        explanation: 'Immunisation contains either a dead or an inactive pathogen, or antigens derived from that pathogen.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A newborn is protected against a disease its mother had years ago, but a year later has no protection at all and is given a vaccine. Name the route of immunity in each case and explain the difference in how long each lasts.',
        model: 'The newborn had naturally acquired passive immunity: antibodies transferred from the mother across the placenta, and further antibodies through breast milk. It is passive because the infant\'s own cells produced none of it — it received finished antibody. That is why it did not last: there were no plasma cells in the infant making more, so as the transferred antibody was used and degraded, protection went with it. The vaccine gives artificially induced active immunity: deliberate exposure to a dead or inactivated pathogen, or to antigens derived from it, to which the infant\'s own immune system responds. It is active because the infant now makes the antibody, and it lasts because the response leaves memory cells that can produce more on re-exposure. The mother\'s own immunity, from having had the disease, was naturally acquired active immunity.',
        rubric: ['Names naturally acquired passive for the transferred antibody and artificially induced active for the vaccine', 'Explains passive fades because the recipient makes no antibody', 'Explains active persists because the recipient\'s own response is what produced it'] },
    ],
    commonMistakes: [
      'Treating "artificial" as meaning passive. A vaccine is artificial and active; the two axes are independent.',
      'Calling breast-milk antibodies a form of vaccination. Nothing in the infant responds — it is passive transfer.',
      'Assuming antibody covers everything. It cannot cross a plasma membrane, so intracellular pathogens are T cell work.',
      'Forgetting the helper T cell crosses the divide: it belongs to cell-mediated immunity and yet antibody production depends on it.',
    ],
    sourceRefs: [
      { ref: 'phys.susan10', location: 'p8 "B cells provide antibody mediated immunity" — and T cells cell-mediated immunity' },
      { ref: 'phys.susan10', location: 'p8 "Active immunity develops after exposure to an antigen"; immunisation as the artificially induced form' },
      { ref: 'phys.susan10', location: 'p8 naturally acquired passive immunity — "a baby can acquire this by receiving antibodies by crossing the placenta" from the mother, or through breast milk' },
      { ref: 'phys.susan10', location: 'p8 artificially induced passive immunity — "someone who was bitten by a rabid animal gets injections containing antibodies"' },
      { ref: 'phys.susan10', location: 'p8 "antibodies (produced by activated B cells) that cannot cross plasma membranes"' },
    ],
  },
  {
    id: 'abct2326-antibody-structure-classes',
    subject: 'ABCT2326', unit: 'phys.imm', type: 'structure',
    title: 'Antibody structure, five immunoglobulin classes and defence against bacteria',
    tags: ['immune', 'high-yield'],
    practice: [
      { type: 'mcq', prompt: 'What are the two pairs of polypeptide chains forming the basic antibody monomer?', options: ['One pair of heavy chains and one pair of light chains', 'Two pairs of identical heavy chains', 'Alpha and beta globin chains', 'Active and passive chains'], answer: 0,
        explanation: 'An antibody is composed of two parallel pairs of polypeptide chains: one pair of heavy chains and one pair of light chains.' },
      { type: 'matching', prompt: 'Match each structural segment of an antibody to its primary role.',
        pairs: [['Variable segments', 'Form antigen-binding sites that specifically recognize determinants'], ['Constant segments', 'Determine the immunoglobulin class (IgM, IgA, IgD, IgE, IgG) and effector function'], ['Heavy chains', 'Longer polypeptide chains spanning both stem and arms of Y'], ['Light chains', 'Shorter polypeptide chains located along the outer arms of Y']],
        explanation: 'Variable segments bind antigen; constant segments identify the class and govern downstream effector actions.' },
      { type: 'typed', prompt: 'What term describes the coating of pathogens with antibodies and complement to increase phagocytosis effectiveness?', accept: ['opsonization', 'opsonisation'],
        explanation: 'Opsonization is the process where antibodies and complement proteins coat foreign particles, increasing phagocytosis effectiveness.' },
      { type: 'mcq', prompt: 'Which cells are impaired in Severe Combined Immunodeficiency Disease (SCID)?', options: ['Both B cells and T cells of the adaptive immune system', 'Only red blood cells', 'Only platelets and megakaryocytes', 'Only neutrophils of the innate system'], answer: 0,
        explanation: 'SCID is a genetic disease where both B cells and T cells of the adaptive immune system are impaired, leaving victims vulnerable to infections.' },
    ],
    application: [
      { type: 'scenario', prompt: 'Explain why a patient with SCID fails to mount either a humoral or cell-mediated immune response, and describe how bone marrow transplantation can treat it.',
        model: 'SCID is caused by a defect in one of several possible genes that impairs the development and function of both B cells and T cells of the adaptive immune system. Because T cells are defective, cell-mediated immunity is absent; because B cells and helper T cells are defective, antibody production and humoral immunity are also absent. A bone marrow transplant provides healthy hematopoietic stem cells capable of differentiating into normal lymphoid progenitors, reconstituting functional T and B lymphocyte populations.',
        rubric: ['Identifies genetic impairment of both B and T cells', 'Connects T cell loss to lack of cell-mediated response and B cell loss to lack of antibodies', 'Explains bone marrow transplant provides functional lymphocyte stem cells'] },
    ],
    commonMistakes: [
      'Assuming variable segments are located at the base of the antibody — they are at the tips of the Y arms where antigen binds.',
      'Thinking antibodies themselves directly kill bacteria — antibodies neutralize, opsonize, and activate complement, which executes the lysis.',
    ],
    sourceRefs: [
      { ref: 'phys.10.2026', location: 'Slide 63 "B Cells"' },
      { ref: 'phys.10.2026', location: 'Slide 70 "Defenses against Bacterial and Viral Pathogens"' },
      { ref: 'phys.10', location: 'p61 "plasma cells" and "antigen-antibody" complexes' },
      { ref: 'phys.10', location: 'p61 "Opsonization" — "increases the effectiveness of phagocytosis"' },
      { ref: 'phys.10', location: 'p61 "Destruction of bacteria"' },
      { ref: 'phys.10', location: 'p64 "Antibody Structure" — "Two parallel pairs of polypeptide chains", "heavy chains", "light chains"' },
      { ref: 'phys.10', location: 'p64 "Constant segments" and "Variable segments"' },
      { ref: 'phys.10', location: 'p64 "classifies them as" IgM, IgA, IgD, IgE or IgG' },
      { ref: 'phys.10', location: 'p67 "SCID - B cells and T cells of the adaptive immune system are impaired due to a defect in one of several possible genes"' },
      { ref: 'phys.10', location: 'p67 "Bubble boy" disease, "David Vetter", and "transplants of bone marrow or fetal thymus"' },
    ],
  },
  /* ------------------------------------------------------------------ *
   * Lecture 1, the half nothing had read.
   *
   * The unit had two items, both written off the back end of the deck —
   * tissues (slide 33) and homeostasis (slides 58-59). Everything before
   * "An Introduction to Tissues" — the membrane, the organelles, the
   * nucleus, protein synthesis, mitosis and meiosis — had been listed in
   * one item's prior-knowledge sidebar and never taught. The coverage
   * report meanwhile said "Cells" was covered, so nothing flagged it.
   *
   * Cited to phys.1.2026, the New source copy of the same lecture, which
   * runs one page ahead of phys.1 throughout (phys.1 carries an extra
   * course-admin slide at the front).
   * ------------------------------------------------------------------ */
  {
    "id": "abct2326-plasma-membrane",
    "subject": "ABCT2326",
    "unit": "phys.cells",
    "type": "definition",
    "title": "The plasma membrane and its six kinds of protein",
    "tags": [
      "foundation",
      "high-yield",
      "plasma membrane",
      "proteins",
      "transport"
    ],
    "priorKnowledge": {
      "level": "dse-bio",
      "covers": "most",
      "dsePart": "core",
      "syllabusRef": { "ref": "edb.bio", "location": "Compulsory I \"Cells and Molecules of Life\" — cell membrane structure and membrane transport." },
      sources: [
        {
          "ref": "phys.1.2026",
          "location": "p10 \"1. Anchoring proteins (stabilizers)\""
        },
        {
          "ref": "phys.1.2026",
          "location": "p8 \"High potassium/low sodium\""
        },
        {
          "ref": "phys.1.2026",
          "location": "p9 \"The Plasma Membrane\""
        },
        {
          "ref": "phys.1.2026",
          "location": "p8 \"Plasma Membrane (Cont’d)\""
        }
      ]
    },
    "practice": [
      {
        "type": "matching",
        "prompt": "Match each membrane protein category with its precise physiological action.",
        "pairs": [
          [
            "Anchoring protein",
            "Attaches membrane to internal cytoskeleton or extracellular fibers"
          ],
          [
            "Recognition protein",
            "Acts as an immunological identifier to recognize self versus foreign cells"
          ],
          [
            "Receptor protein",
            "Binds specific extracellular chemical ligands to trigger cellular signaling"
          ],
          [
            "Channel protein",
            "Forms a central water-filled pore for selective passive ion diffusion"
          ],
          [
            "Carrier protein",
            "Binds specific solutes and changes shape to transport them across the bilayer"
          ]
        ],
        "explanation": "Membrane proteins are divided into six functional classes according to whether they anchor, identify, catalyze, signal, or transport."
      },
      {
        "type": "mcq",
        "prompt": "Which chemical contrast correctly describes the difference between cytosol and extracellular fluid?",
        "options": [
          "Cytosol has high Na+ and low K+ compared to extracellular fluid",
          "Cytosol has high K+ and low Na+ compared to extracellular fluid",
          "Cytosol has lower protein concentration than extracellular fluid",
          "Cytosol contains no dissolved carbohydrates or enzymes"
        ],
        "answer": 1,
        "explanation": "Cytosol is characterized by high potassium (K+) and low sodium (Na+), maintained by the active Na+/K+ ATPase pump."
      },
      {
        "type": "typed",
        "prompt": "What carbohydrate-rich outer cellular coating is formed by membrane glycoproteins and glycolipids?",
        "accept": [
          "glycocalyx",
          "Glycocalyx"
        ],
        "explanation": "The glycocalyx is the external carbohydrate-rich zone that protects the cell and enables intercellular recognition."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "Digitalis (digoxin) is administered to a patient in congestive heart failure. It partially inhibits the sodium-potassium ATPase carrier protein in cardiac myocytes. Describe how altering this transport protein affects intracellular ion gradients and myocyte contraction.",
        "model": "Inhibiting the Na+/K+ ATPase pump reduces the active extrusion of Na+ from the cytosol, causing intracellular Na+ concentration to rise. This diminished transmembrane Na+ gradient slows the secondary active Na+/Ca2+ exchanger, reducing Ca2+ efflux from the cardiac myocyte. The resulting elevation of intracellular Ca2+ increases sarcoplasmic reticulum Ca2+ loading, producing a more forceful ventricular contraction (positive inotropy) to support cardiac output.",
        "rubric": [
          "Identifies the Na+/K+ ATPase as a carrier transport protein",
          "Explains the rise in intracellular sodium due to reduced active extrusion",
          "Links impaired Na+/Ca2+ exchange to elevated intracellular calcium and increased contractility"
        ]
      }
    ],
    "commonMistakes": [
      "Confusing channel proteins with carrier proteins: channels form aqueous pores for diffusion without gross conformation flipping, while carriers bind solute and change shape.",
      "Reversing the sodium and potassium gradients: sodium is high outside (ECF) and low inside; potassium is high inside (cytosol) and low outside.",
      "Assuming the plasma membrane is a static rigid wall rather than a dynamic, fluid mosaic of moving lipids and floating proteins."
    ],
    "sourceRefs": [
      {
        "ref": "phys.1.2026",
        "location": "p7 \"Plasma Membrane\""
      },
      {
        "ref": "phys.1.2026",
        "location": "p8 \"Plasma Membrane (Cont’d)\""
      },
      {
        "ref": "phys.1.2026",
        "location": "p9 \"The Plasma Membrane.\""
      },
      {
        "ref": "phys.1.2026",
        "location": "p10 \"1. Anchoring proteins (stabilizers)\""
      },
      {
        "ref": "phys.1",
        "location": "p8 \"Membrane Lipids\""
      },
      {
        "ref": "phys.1",
        "location": "p9 \"Plasma Membrane (Cont’d)\""
      },
      {
        "ref": "phys.1",
        "location": "p10 \"The Plasma Membrane.\""
      },
      {
        "ref": "phys.1",
        "location": "p11 \"Anchoring proteins\""
      },
      {
        "ref": "phys.cells.tut",
        "location": "p1 \"functions of the plasma membrane\""
      },
      {
        "ref": "phys.cells.tut",
        "location": "p1 \"pass the cells' membrane\""
      },
      {
        "ref": "phys.cells.tut",
        "location": "p2 \"function of membrane proteins\""
      }
    ]
  },
  {
    "id": "abct2326-organelles",
    "subject": "ABCT2326",
    "unit": "phys.cells",
    "type": "concept",
    "title": "Organelles: nonmembranous vs membranous",
    "tags": [
      "foundation",
      "high-yield",
      "organelles",
      "cytoskeleton",
      "mitochondria"
    ],
    "priorKnowledge": {
      "level": "dse-bio",
      "covers": "part",
      "dsePart": "core",
      "syllabusRef": { "ref": "edb.bio", "location": "Compulsory I \"Cells and Molecules of Life\" — cell organelles and their functions." },
      sources: [
        {
          "ref": "phys.1.2026",
          "location": "p6 \"Anatomy of a Model Cell (Part 2)\""
        },
        {
          "ref": "phys.1.2026",
          "location": "p11 \"Microvilli & Cilia\""
        },
        {
          "ref": "phys.1.2026",
          "location": "p6 \"Anatomy of a Model Cell (Part 2)\""
        },
        {
          "ref": "phys.1.2026",
          "location": "p20 \"Products of Golgi Apparatus\""
        }
      ]
    },
    "practice": [
      {
        "type": "matching",
        "prompt": "Classify each organelle as non-membranous or membranous.",
        "pairs": [
          [
            "Ribosome",
            "Non-membranous organelle"
          ],
          [
            "Golgi apparatus",
            "Membranous organelle"
          ],
          [
            "Proteasome",
            "Non-membranous organelle"
          ],
          [
            "Mitochondrion",
            "Membranous organelle"
          ],
          [
            "Centrosome",
            "Non-membranous organelle"
          ]
        ],
        "explanation": "Organelles in direct contact with cytosol are non-membranous; those enclosed in phospholipid membranes are membranous."
      },
      {
        "type": "mcq",
        "prompt": "Which organelle is responsible for synthesizing steroid hormones, phospholipids, and storing intracellular calcium?",
        "options": [
          "Rough endoplasmic reticulum",
          "Smooth endoplasmic reticulum",
          "Golgi apparatus",
          "Lysosome"
        ],
        "answer": 1,
        "explanation": "The smooth endoplasmic reticulum synthesizes lipids, carbohydrates, and steroid hormones, and sequesters calcium ions."
      },
      {
        "type": "typed",
        "prompt": "What cylindrical non-membranous organelle digests abnormal or damaged proteins tagged with ubiquitin?",
        "accept": [
          "proteasome",
          "Proteasome",
          "proteasomes",
          "Proteasomes"
        ],
        "explanation": "Proteasomes are specialized non-membranous protease complexes that catabolize targeted proteins."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A newborn is diagnosed with Zellweger syndrome, a rare genetic disorder characterized by a complete failure to assemble functional peroxisomes. Explain the cellular metabolic consequences of absent peroxisomes and contrast this with lysosomal storage disorders.",
        "model": "Without functional peroxisomes, cells cannot execute beta-oxidation of very long-chain fatty acids (VLCFAs) and cannot neutralize toxic hydrogen peroxide (H2O2) due to absent catalase. This results in progressive VLCFA neurotoxicity, demyelination, and hepatic failure. In contrast, lysosomal storage disorders (such as Gaucher or Tay-Sachs) result from defective acid hydrolases within lysosomes, causing undigested glycolipids or mucopolysaccharides to accumulate within vesicular inclusions rather than causing a failure of oxidative detox.",
        "rubric": [
          "Identifies peroxisomes as organelles responsible for VLCFA oxidation and hydrogen peroxide breakdown",
          "Explains the biochemical failure to neutralize H2O2 or catabolize long-chain lipids",
          "Contrasts peroxisomal deficiency with lysosomal accumulation of undigested complex molecules"
        ]
      }
    ],
    "commonMistakes": [
      "Classifying ribosomes or proteasomes as membranous organelles; neither is enclosed by a lipid membrane.",
      "Confusing lysosomes with peroxisomes: lysosomes digest organic polymers with acid hydrolases; peroxisomes oxidize fatty acids and neutralize H2O2.",
      "Assuming smooth ER makes proteins: protein synthesis occurs exclusively at ribosomes (rough ER or free ribosomes); smooth ER makes lipids and steroids."
    ],
    "sourceRefs": [
      {
        "ref": "phys.1.2026",
        "location": "p6 \"Anatomy of a Model Cell (Part 2)\""
      },
      {
        "ref": "phys.1.2026",
        "location": "p11 \"Microvilli\""
      },
      {
        "ref": "phys.1.2026",
        "location": "p16 \"Anatomy of a Model Cell (Part 5)\""
      },
      {
        "ref": "phys.1.2026",
        "location": "p17 \"Endoplasmic Reticulum (ER)\""
      },
      {
        "ref": "phys.1.2026",
        "location": "p18 \"Golgi Apparatus (post‑office)\""
      },
      {
        "ref": "phys.1.2026",
        "location": "p20 \"Products of Golgi Apparatus\""
      },
      {
        "ref": "phys.1",
        "location": "p7 \"Anatomy of a Model Cell (Part 2)\""
      },
      {
        "ref": "phys.1",
        "location": "p12 \"Microvilli\""
      },
      {
        "ref": "phys.1",
        "location": "p17 \"Anatomy of a Model Cell (Part 5)\""
      },
      {
        "ref": "phys.1",
        "location": "p18 \"Endoplasmic Reticulum (ER)\""
      },
      {
        "ref": "phys.1",
        "location": "p19 \"Golgi Apparatus (post-office)\""
      },
      {
        "ref": "phys.1",
        "location": "p21 \"Products of Golgi Apparatus\""
      },
      {
        "ref": "phys.cells.tut",
        "location": "p2 \"paralyses the ciliated epithelial\""
      },
      {
        "ref": "phys.cells.tut",
        "location": "p3 \"digestion of materials\""
      },
      {
        "ref": "phys.cells.tut",
        "location": "p3 \"form the mitotic spindle\""
      },
      {
        "ref": "phys.cells.tut",
        "location": "p3 \"cannot make new proteins and will be worn out within a few months\""
      }
    ]
  },
  {
    "id": "abct2326-nucleus-genetic-code",
    "subject": "ABCT2326",
    "unit": "phys.cells",
    "type": "concept",
    "title": "The cell nucleus, chromatin structure, and the genetic code",
    "tags": [
      "foundation",
      "high-yield",
      "nucleus",
      "dna",
      "genetics"
    ],
    "priorKnowledge": {
      "level": "dse-bio",
      "covers": "most",
      "dsePart": "core",
      "syllabusRef": { "ref": "edb.bio", "location": "Compulsory I \"Cells and Molecules of Life\" — DNA structure and function; Compulsory IV \"Applied Ecology and Genetics\"." },
      sources: [
        {
          "ref": "phys.1.2026",
          "location": "p12 \"Nuclear envelope\""
        },
        {
          "ref": "phys.1.2026",
          "location": "p11 \"Nucleoli\""
        },
        {
          "ref": "phys.1.2026",
          "location": "p14 \"Organization of DNA\""
        }
      ]
    },
    "practice": [
      {
        "type": "mcq",
        "prompt": "What is the primary function of the nucleolus within the cell nucleus?",
        "options": [
          "Synthesizing adenosine triphosphate (ATP)",
          "Synthesizing ribosomal RNA (rRNA) and assembling ribosomal subunits",
          "Executing beta-oxidation of very long-chain fatty acids",
          "Duplicating centrioles prior to mitotic spindle formation"
        ],
        "answer": 1,
        "explanation": "Nucleoli are dark-staining nuclear structures that transcribe rRNA and combine it with proteins to construct ribosomal subunits.",
        "src": {
          "ref": "phys.1.2026",
          "location": "p11 \"Nucleoli\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each nuclear structural element with its defining description.",
        "pairs": [
          [
            "Nuclear envelope",
            "Double membrane enclosing perinuclear space continuous with rough ER"
          ],
          [
            "Nuclear pore",
            "Protein channel complex regulating nucleocytoplasmic transport"
          ],
          [
            "Histone",
            "Alkaline spool protein around which DNA wraps to form nucleosomes"
          ],
          [
            "Chromatin",
            "Diffuse, uncoiled DNA-protein network found in non-dividing cells"
          ]
        ],
        "explanation": "Each nuclear structure fulfills an essential role in isolating, protecting, and organizing the genetic code.",
        "src": {
          "ref": "phys.1.2026",
          "location": "p12 \"Nuclear envelope\""
        }
      },
      {
        "type": "mcq",
        "prompt": "How many consecutive nitrogenous bases in a DNA strand constitute a triplet encoding one amino acid?",
        "options": [
          "Two bases",
          "Three bases",
          "Four bases",
          "Six bases"
        ],
        "answer": 1,
        "explanation": "The genetic code is a triplet code in which three consecutive nitrogenous bases specify a single amino acid.",
        "src": {
          "ref": "phys.1.2026",
          "location": "p15 \"Triplet code\""
        }
      },
      {
        "type": "typed",
        "prompt": "What term describes the supercoiled, condensed form of DNA visible under light microscopy exclusively during cell division?",
        "accept": [
          "chromosome",
          "chromosomes",
          "Chromosome",
          "Chromosomes"
        ],
        "explanation": "Chromatin condenses and supercoils into visible chromosomes during the M phase of the cell cycle.",
        "src": {
          "ref": "phys.1.2026",
          "location": "p14 \"Organization of DNA\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A patient with progeria (Hutchinson-Gilford progeria syndrome) exhibits a point mutation in the LMNA gene, producing an abnormal truncated nuclear lamin protein termed progerin that accumulates in the inner nuclear membrane. Explain the mechanical and genetic consequences of nuclear lamina failure on cell survival and tissue regeneration.",
        "model": "Nuclear lamins provide structural scaffolding for the inner nuclear membrane and anchor peripheral heterochromatin. Accumulation of abnormal progerin causes marked morphological distortion, blebbing of the nuclear envelope, and disruption of nuclear pore complexes. Consequently, nucleocytoplasmic transport of transcription factors and mRNA becomes dysregulated, heterochromatin anchoring is lost, and DNA damage accumulation triggers premature cellular senescence and stem cell exhaustion. Highly proliferative tissues (such as vascular endothelium and skin fibroblasts) fail to regenerate, accelerating cardiovascular pathology and organismal aging.",
        "rubric": [
          "Identifies the nuclear envelope and lamina as structural scaffolds maintaining nuclear morphology",
          "Explains how envelope disruption impairs nuclear pore transport and chromatin stability",
          "Links genomic instability and premature senescence to regenerative failure in proliferative tissues"
        ]
      }
    ],
    "commonMistakes": [
      "Assuming chromatin and chromosomes are chemically different molecules; they are identical DNA-protein complexes differing only in compaction and supercoiling.",
      "Believing the nuclear envelope is a single continuous membrane; it is a double lipid bilayer separated by a perinuclear space.",
      "Confusing a DNA base triplet with an mRNA codon: triplets exist on DNA, whereas codons exist on mRNA transcripts."
    ],
    "sourceRefs": [
      {
        "ref": "phys.1.2026",
        "location": "p12 \"Cell Nucleus\""
      },
      {
        "ref": "phys.1.2026",
        "location": "p12 \"Nuclear envelope\""
      },
      {
        "ref": "phys.1.2026",
        "location": "p14 \"Organization of DNA\""
      },
      {
        "ref": "phys.1.2026",
        "location": "p15 \"Triplet code\""
      },
      {
        "ref": "phys.1",
        "location": "p13 \"Cell Nucleus\""
      },
      {
        "ref": "phys.1",
        "location": "p13 \"Nuclear envelope\""
      },
      {
        "ref": "phys.1",
        "location": "p15 \"Organization of DNA\""
      },
      {
        "ref": "phys.1",
        "location": "p16 \"Triplet code\""
      },
      {
        "ref": "phys.cells.tut",
        "location": "p3 \"DNA ; proteins\""
      }
    ]
  },
  {
    "id": "abct2326-protein-synthesis",
    "subject": "ABCT2326",
    "unit": "phys.cells",
    "type": "sequence",
    "title": "Protein synthesis: gene activation, transcription, and translation",
    "tags": [
      "foundation",
      "high-yield",
      "protein-synthesis",
      "transcription",
      "translation"
    ],
    "priorKnowledge": {
      "level": "dse-bio",
      "covers": "most",
      "dsePart": "core",
      "syllabusRef": { "ref": "edb.bio.supp", "location": "Compulsory I \"Cells and Molecules of Life\" — protein synthesis, transcription and translation." },
      sources: [
        {
          "ref": "phys.1.2026",
          "location": "p21 \"Gene Activation\""
        },
        {
          "ref": "phys.1.2026",
          "location": "p22 \"Transcription\""
        },
        {
          "ref": "phys.1.2026",
          "location": "p21 \"Translation\""
        }
      ]
    },
    "practice": [
      {
        "type": "sequence",
        "prompt": "Arrange the sequence of protein synthesis events in correct chronological order.",
        "items": [
          "Transcription factor binds promoter and uncoils DNA",
          "RNA polymerase synthesizes pre-mRNA from template strand",
          "Introns are excised and mature mRNA exits through nuclear pore",
          "Small ribosomal subunit binds mRNA at AUG start codon",
          "tRNA anticodons deliver amino acids to form peptide bonds",
          "Stop codon binds release factor and frees polypeptide chain"
        ],
        "explanation": "Protein synthesis follows an invariant sequence from nuclear gene activation and transcription to cytoplasmic translation and termination.",
        "src": {
          "ref": "phys.1.2026",
          "location": "p21 \"Gene Activation\""
        }
      },
      {
        "type": "mcq",
        "prompt": "If a DNA template strand triplet reads 3'-TAC-5', what is the complementary mRNA codon synthesized by RNA polymerase?",
        "options": [
          "5'-AUG-3'",
          "5'-UAC-3'",
          "5'-ATG-3'",
          "5'-CAU-3'"
        ],
        "answer": 0,
        "explanation": "During transcription, adenine (A) on DNA pairs with uracil (U), thymine (T) pairs with adenine (A), and cytosine (C) pairs with guanine (G), generating 5'-AUG-3'.",
        "src": {
          "ref": "phys.1.2026",
          "location": "p22 \"Transcription\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each molecule involved in protein synthesis with its specific functional role.",
        "pairs": [
          [
            "RNA polymerase",
            "Transcribes DNA template into pre-mRNA transcript"
          ],
          [
            "mRNA codon",
            "Three-base sequence specifying one amino acid"
          ],
          [
            "tRNA anticodon",
            "Three-base sequence pairing with codon to position amino acid"
          ],
          [
            "Ribosomal peptidyl transferase",
            "Catalyzes covalent peptide bond formation between amino acids"
          ]
        ],
        "explanation": "Each molecular component coordinates precise information transfer from nucleotide sequence to amino acid polymer.",
        "src": {
          "ref": "phys.1.2026",
          "location": "p21 \"Translation\""
        }
      },
      {
        "type": "typed",
        "prompt": "What universal three-nucleotide mRNA codon serves as the start signal for protein translation?",
        "accept": [
          "AUG",
          "aug"
        ],
        "explanation": "AUG is the universal start codon on mRNA, coding for methionine and establishing the reading frame.",
        "src": {
          "ref": "phys.1.2026",
          "location": "p21 \"Translation\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "Ricin is a potent ribosomal inactivating plant toxin that enzymatically depurinates a specific adenine residue in the 28S ribosomal RNA of the large ribosomal subunit. Explain how this biochemical lesion halts translation and predict its physiological impact on cells with high secretory demands (such as pancreatic acinar cells).",
        "model": "Depurination of the 28S rRNA by ricin permanently impairs ribosomal binding of elongation factor 2 (eEF-2), preventing the ribosome from executing translocation and catalyzing peptide bond formation. As a consequence, ongoing polypeptide elongation immediately arrests, halting all de novo protein synthesis. In cells with intense secretory workloads—such as pancreatic acinar cells producing digestive enzymes—the rapid depletion of structural proteins, membrane transport pumps, and secretory zymogens causes rapid organelle breakdown, cellular autolysis, and necrotic tissue destruction.",
        "rubric": [
          "Identifies the large ribosomal subunit as the site of peptide bond synthesis and translocation",
          "Explains how failure of elongation arrests protein synthesis",
          "Predicts rapid necrosis in highly metabolically active secretory tissues deprived of essential proteins"
        ]
      }
    ],
    "commonMistakes": [
      "Confusing the DNA template strand with the coding strand: RNA polymerase reads the template strand (3' to 5') to make an mRNA identical in sequence to the coding strand (except U replaces T).",
      "Thinking tRNA molecules bind directly to DNA: tRNA binds exclusively to mRNA codons during translation on the ribosome in the cytoplasm.",
      "Assuming that all DNA triplets are transcribed: introns and non-coding regulatory sequences are either untranscribed or spliced out before translation."
    ],
    "sourceRefs": [
      {
        "ref": "phys.1.2026",
        "location": "p21 \"Gene Activation\""
      },
      {
        "ref": "phys.1.2026",
        "location": "p22 \"Transcription\""
      },
      {
        "ref": "phys.1.2026",
        "location": "p21 \"Translation\""
      },
      {
        "ref": "phys.1",
        "location": "p22 \"Gene Activation\""
      },
      {
        "ref": "phys.1",
        "location": "p23 \"Transcription\""
      },
      {
        "ref": "phys.1",
        "location": "p22 \"Translation\""
      },
      {
        "ref": "phys.cells.tut",
        "location": "p1 \"gene expression and protein synthesis\""
      }
    ]
  },
  {
    "id": "abct2326-cell-division",
    "subject": "ABCT2326",
    "unit": "phys.cells",
    "type": "sequence",
    "title": "The cell life cycle, stages of mitosis, and meiosis comparison",
    "tags": [
      "foundation",
      "high-yield",
      "mitosis",
      "cell-cycle",
      "meiosis"
    ],
    "priorKnowledge": {
      "level": "dse-bio",
      "covers": "most",
      "dsePart": "core",
      "syllabusRef": { "ref": "edb.bio", "location": "Compulsory I \"Cells and Molecules of Life\" — cell cycle, mitosis and meiosis." },
      sources: [
        {
          "ref": "phys.1.2026",
          "location": "p24 \"Cell Life Cycle\""
        },
        {
          "ref": "phys.1.2026",
          "location": "p24 \"Mitosis divides genetic material equally\""
        }
      ]
    },
    "practice": [
      {
        "type": "sequence",
        "prompt": "Arrange the phases of the somatic cell cycle in sequential order starting from cell birth.",
        "items": [
          "G1 phase (organelle duplication and growth)",
          "S phase (semiconservative DNA replication)",
          "G2 phase (protein synthesis and centriole completion)",
          "Prophase (chromatin condensation and spindle formation)",
          "Metaphase (alignment at equatorial plate)",
          "Anaphase (centromere cleavage and chromatid separation)",
          "Telophase and cytokinesis (nuclear reform and cleavage furrow)"
        ],
        "explanation": "The somatic cell cycle follows an invariant progression through interphase growth and replication into mitotic nuclear and cytoplasmic division.",
        "src": {
          "ref": "phys.1.2026",
          "location": "p24 \"Cell Life Cycle\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each mitotic stage with its hallmark microscopic event.",
        "pairs": [
          [
            "Prophase",
            "Chromatin condenses into visible paired chromatids; spindle forms"
          ],
          [
            "Metaphase",
            "Chromosomes align single-file along the equatorial plate"
          ],
          [
            "Anaphase",
            "Sister chromatids separate into daughter chromosomes moving to poles"
          ],
          [
            "Telophase",
            "Nuclear envelopes reassemble around uncoiling chromatin at each pole"
          ]
        ],
        "explanation": "The four phases of mitosis achieve precise, equal distribution of duplicated genetic material.",
        "src": {
          "ref": "phys.1.2026",
          "location": "p25 \"Mitosis\""
        }
      },
      {
        "type": "mcq",
        "prompt": "In which phase of interphase does semiconservative replication of the nuclear genome take place?",
        "options": [
          "G0 phase",
          "G1 phase",
          "S phase",
          "G2 phase"
        ],
        "answer": 2,
        "explanation": "DNA replication occurs exclusively during the S (synthesis) phase of interphase.",
        "src": {
          "ref": "phys.1.2026",
          "location": "p24 \"Cell Life Cycle\""
        }
      },
      {
        "type": "typed",
        "prompt": "What physical process divides the cytoplasm and organelles into two daughter cells following mitosis?",
        "accept": [
          "cytokinesis",
          "Cytokinesis"
        ],
        "explanation": "Cytokinesis is the physical division of the cytoplasm and organelles into two daughter cells.",
        "src": {
          "ref": "phys.1.2026",
          "location": "p24 \"Cell Life Cycle\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A patient receiving paclitaxel (Taxol) chemotherapy for breast cancer experiences peripheral neuropathy and hair loss. Paclitaxel binds to and hyper-stabilizes microtubules, preventing their normal depolymerization. Explain how this drug arrests cancer cell division and why rapidly renewing tissues suffer toxic collateral damage.",
        "model": "During normal mitosis, dynamic polymerization and depolymerization of spindle microtubules are mandatory: microtubules must shorten during anaphase to pull sister chromatids to opposite poles. By stabilizing microtubule polymers against disassembly, paclitaxel freezes the mitotic spindle, triggering the spindle assembly checkpoint and arresting cells in metaphase. Unable to proceed to anaphase, dividing cancer cells undergo apoptotic cell death. Normal rapidly dividing tissues—such as hair follicle matrix cells and hematopoietic bone marrow precursors—frequently cycle through mitosis and are arrested in identical fashion, producing alopecia and myelosuppression.",
        "rubric": [
          "Identifies microtubule disassembly as essential for anaphase chromatid separation",
          "Explains how failure of spindle dynamics arrests the cell cycle at the metaphase-anaphase transition",
          "Connects mitotic disruption to death of rapidly cycling non-cancerous cells (hair follicles, marrow)"
        ]
      }
    ],
    "commonMistakes": [
      "Believing interphase is a \"resting\" phase: it is the metabolically busiest period of the cell lifecycle, synthesizing all cellular macromolecules and replicating the genome.",
      "Confusing sister chromatids with homologous chromosomes: sister chromatids are identical copies produced during S phase joined at a centromere; homologous chromosomes are maternal/paternal chromosome pairs.",
      "Assuming cytokinesis and mitosis are identical: mitosis is nuclear karyokinesis; cytokinesis is cytoplasmic division."
    ],
    "sourceRefs": [
      {
        "ref": "phys.1.2026",
        "location": "p24 \"Cell Life Cycle\""
      },
      {
        "ref": "phys.1.2026",
        "location": "p24 \"Mitosis divides genetic material equally\""
      },
      {
        "ref": "phys.1.2026",
        "location": "p27 \"Meiosis\""
      },
      {
        "ref": "phys.1",
        "location": "p25 \"Cell Life Cycle\""
      },
      {
        "ref": "phys.1",
        "location": "p25 \"Mitosis divides genetic material equally\""
      },
      {
        "ref": "phys.1",
        "location": "p28 \"Meiosis\""
      },
      {
        "ref": "phys.cells.tut",
        "location": "p3 \"form the mitotic spindle\""
      },
      {
        "ref": "phys.cells.tut",
        "location": "p3 \"When is DNA replicated\""
      }
    ]
  },
  {
    "id": "abct2326-epithelium-classification",
    "subject": "ABCT2326",
    "unit": "phys.cells",
    "type": "concept",
    "title": "Epithelial tissue: characteristics, structural classification, and glandular types",
    "tags": [
      "foundation",
      "high-yield",
      "epithelium",
      "tissues",
      "histology"
    ],
    "priorKnowledge": {
      "level": "dse-bio",
      "covers": "part",
      "dsePart": "core",
      "syllabusRef": { "ref": "edb.bio", "location": "Compulsory I \"Cells and Molecules of Life\" — human tissues." },
      sources: [
        {
          "ref": "phys.1.2026",
          "location": "p33 \"Characteristics of Epithelia\""
        },
        {
          "ref": "phys.1.2026",
          "location": "p34 \"Classification of Epithelia\""
        },
        {
          "ref": "phys.1.2026",
          "location": "p36 \"Glandular Epithelia\""
        }
      ]
    },
    "practice": [
      {
        "type": "matching",
        "prompt": "Match each epithelial tissue type with its representative anatomical location and function.",
        "pairs": [
          [
            "Simple squamous epithelium",
            "Alveolar air sacs and vascular endothelium for rapid gas diffusion"
          ],
          [
            "Simple columnar epithelium",
            "Gastric and intestinal lining for nutrient absorption and secretion"
          ],
          [
            "Pseudostratified ciliated columnar",
            "Tracheal and bronchial lining for mucus clearance via cilia"
          ],
          [
            "Transitional epithelium",
            "Urinary bladder and ureters for accommodating fluctuating volume"
          ]
        ],
        "explanation": "Epithelial tissue architecture directly dictates its physiological suitability for diffusion, secretion, or mechanical stretching.",
        "src": {
          "ref": "phys.1.2026",
          "location": "p34 \"Classification of Epithelia\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which of the following is NOT one of the five defining characteristics of epithelial tissue?",
        "options": [
          "High vascularity with extensive capillary networks within the epithelium",
          "Basement membrane attachment at the basal surface",
          "Structural and functional polarity (apical versus basal surfaces)",
          "Rapid stem cell regeneration"
        ],
        "answer": 0,
        "explanation": "Epithelia are completely avascular; they contain no blood vessels and rely entirely on diffusion from underlying vascular connective tissue.",
        "src": {
          "ref": "phys.1.2026",
          "location": "p33 \"Characteristics of Epithelia\""
        }
      },
      {
        "type": "mcq",
        "prompt": "How are endocrine glands fundamentally distinguished from exocrine glands?",
        "options": [
          "Endocrine glands are multicellular, whereas exocrine glands are always unicellular",
          "Endocrine glands are ductless and release hormones into interstitial fluid, whereas exocrine glands secrete through ducts onto surfaces",
          "Endocrine glands originate from mesoderm, whereas exocrine glands originate from ectoderm",
          "Endocrine glands produce mucous secretions, whereas exocrine glands produce only serous secretions"
        ],
        "answer": 1,
        "explanation": "Endocrine glands lack ducts and release hormones into interstitial fluid and the bloodstream; exocrine glands discharge via epithelial ducts.",
        "src": {
          "ref": "phys.1.2026",
          "location": "p36 \"Glandular Epithelia\""
        }
      },
      {
        "type": "typed",
        "prompt": "What specialized stratified epithelial tissue lines the urinary bladder and ureters, capable of repeated stretching and distension?",
        "accept": [
          "transitional epithelium",
          "Transitional epithelium",
          "transitional",
          "urothelium",
          "Urothelium"
        ],
        "explanation": "Transitional epithelium (urothelium) is uniquely adapted to stretch and recoil as the urinary bladder fills and empties.",
        "src": {
          "ref": "phys.1.2026",
          "location": "p34 \"Classification of Epithelia\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A patient with gastroesophageal reflux disease (GERD) undergoes an upper endoscopy. Biopsy reveals that the normal stratified squamous epithelium of the lower esophagus has been replaced by simple columnar epithelium containing goblet cells (Barrett esophagus). Explain why the body undergoes this metaplastic shift and analyze the physiological trade-off.",
        "model": "The lower esophagus is normally lined by non-keratinized stratified squamous epithelium, designed to withstand the physical abrasion of swallowed food boluses but poorly equipped to neutralize gastric acid. Chronic exposure to refluxed hydrochloric acid and pepsin damages squamous epithelial junctions. In response to recurrent acid injury, basal stem cells undergo metaplasia, differentiating into simple columnar epithelium with mucus-secreting goblet cells (resembling intestinal mucosa). While this columnar sheet secretes protective alkaline mucus and resists acid degradation, it offers significantly less physical abrasion resistance and markedly elevates the long-term risk of esophageal adenocarcinoma.",
        "rubric": [
          "Contrasts the normal stratified squamous esophageal lining with the metaplastic simple columnar epithelium",
          "Explains the adaptive advantage of columnar mucus secretion against gastric acid",
          "Identifies the physiological trade-off: reduced abrasion resistance and increased malignant transformation risk"
        ]
      }
    ],
    "commonMistakes": [
      "Believing epithelia contain their own blood capillaries: all epithelial sheets are strictly avascular and depend entirely on underlying connective tissue vascularity.",
      "Assuming pseudostratified epithelium is genuinely stratified: all cells remain in physical contact with the basement membrane despite nuclei appearing at different depths.",
      "Confusing simple columnar epithelium with stratified columnar: simple columnar lines the majority of the gastrointestinal tract; stratified columnar is extremely rare in humans."
    ],
    "sourceRefs": [
      {
        "ref": "phys.1.2026",
        "location": "p33 \"Characteristics of Epithelia\""
      },
      {
        "ref": "phys.1.2026",
        "location": "p34 \"Classification of Epithelia\""
      },
      {
        "ref": "phys.1.2026",
        "location": "p36 \"Glandular Epithelia\""
      },
      {
        "ref": "phys.1",
        "location": "p34 \"Characteristics of Epithelia\""
      },
      {
        "ref": "phys.1",
        "location": "p35 \"Classification of Epithelia\""
      },
      {
        "ref": "phys.1",
        "location": "p37 \"Glandular Epithelia\""
      },
      {
        "ref": "phys.cells.tut",
        "location": "p2 \"types of tissue organization\""
      },
      {
        "ref": "phys.cells.tut",
        "location": "p4 \"always has an apical and a basal surface\""
      }
    ]
  },
  {
    "id": "abct2326-connective-tissue-classes",
    "subject": "ABCT2326",
    "unit": "phys.cells",
    "type": "concept",
    "title": "Connective tissue: matrix components and the three primary classes",
    "tags": [
      "foundation",
      "high-yield",
      "connective-tissue",
      "tissues",
      "histology"
    ],
    "priorKnowledge": {
      "level": "dse-bio",
      "covers": "part",
      "dsePart": "core",
      "syllabusRef": { "ref": "edb.bio", "location": "Compulsory I \"Cells and Molecules of Life\" — human tissues." },
      sources: [
        {
          "ref": "phys.1.2026",
          "location": "p37 \"Characteristics of Connective Tissue\""
        },
        {
          "ref": "phys.1.2026",
          "location": "p39 \"Classification of Connective Tissues\""
        },
        {
          "ref": "phys.1.2026",
          "location": "p40 \"Connective Tissue Proper\""
        },
        {
          "ref": "phys.1.2026",
          "location": "p39 \"Supporting Connective Tissues\""
        }
      ]
    },
    "practice": [
      {
        "type": "matching",
        "prompt": "Match each specific connective tissue variety with its characteristic functional anatomical role.",
        "pairs": [
          [
            "Areolar tissue",
            "Universal loose packing cushion beneath epithelia and surrounding organs"
          ],
          [
            "Dense regular connective tissue",
            "Parallel collagen cables resisting unidirectional tension in tendons"
          ],
          [
            "Hyaline cartilage",
            "Smooth, glassy low-friction articular surface covering synovial joints"
          ],
          [
            "Fibrocartilage",
            "Durable shock-absorbing collagen pads in intervertebral discs and menisci"
          ]
        ],
        "explanation": "The physical arrangement of fibres and ground substance in the extracellular matrix dictates the mechanical capability of each connective tissue.",
        "src": {
          "ref": "phys.1.2026",
          "location": "p39 \"Classification of Connective Tissues\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which anatomical feature fundamentally distinguishes cartilage from osseous (bone) tissue?",
        "options": [
          "Cartilage possesses osteons, whereas bone contains chondroitin sulfate",
          "Cartilage is completely avascular and relies on diffusion, whereas bone is highly vascularized",
          "Cartilage contains formed elements, whereas bone contains only ground substance",
          "Cartilage contains calcium phosphate hydroxyapatite, whereas bone contains only elastin"
        ],
        "answer": 1,
        "explanation": "Cartilage is strictly avascular, acquiring nutrients by slow diffusion through the matrix; in contrast, bone is richly vascularized with osteonic blood supplies.",
        "src": {
          "ref": "phys.1.2026",
          "location": "p39 \"Supporting Connective Tissues\""
        }
      },
      {
        "type": "mcq",
        "prompt": "What constitutes the extracellular matrix (ECM) of connective tissue?",
        "options": [
          "Specialized cells and intracellular organelles",
          "Extracellular protein fibres and ground substance",
          "Cytoskeleton microfilaments and intermediate filaments",
          "Formed elements and cytoplasmic enzymes"
        ],
        "answer": 1,
        "explanation": "The extracellular matrix is defined specifically as the extracellular protein fibres combined with the clear ground substance.",
        "src": {
          "ref": "phys.1.2026",
          "location": "p37 \"Characteristics of Connective Tissue\""
        }
      },
      {
        "type": "typed",
        "prompt": "What tiny chambers or cavities house mature chondrocytes within cartilage and osteocytes within bone matrix?",
        "accept": [
          "lacunae",
          "Lacunae",
          "lacuna",
          "Lacuna"
        ],
        "explanation": "Lacunae are the small physical cavities within the extracellular matrix in which chondrocytes and osteocytes reside.",
        "src": {
          "ref": "phys.1.2026",
          "location": "p39 \"Supporting Connective Tissues\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "An athlete suffers a complete tear of the anterior cruciate ligament (ACL) and a lateral meniscal tear in the knee. The orthopedist explains that while muscle and bone heal rapidly, torn ligaments and menisci heal exceedingly slowly and often require surgical reconstruction. Explain the physiological and histological reasons for this stark disparity in healing capacity.",
        "model": "Tissue repair velocity is directly governed by regional vascular perfusion and metabolic turnover. Bone is a highly vascular supporting connective tissue with continuous Haversian canal blood flow, osteoclast remodeling, and rich osteoblast progenitor supply, allowing robust osteogenesis within weeks. In contrast, ligaments are composed of dense regular connective tissue with sparse fibroblasts and poor vascular supply, yielding limited collagen synthesis. The meniscus is made of fibrocartilage, which is predominantly avascular (especially in its inner two-thirds), requiring chondrocytes to obtain nutrition via slow diffusion from synovial fluid. This lack of direct microvascular capillary ingress prevents an effective inflammatory response and granulation tissue formation, resulting in minimal or absent spontaneous repair.",
        "rubric": [
          "Contrasts the rich vascularity of bone with the poor vascularity of dense regular CT (ligaments)",
          "Identifies fibrocartilage as predominantly avascular, relying on slow synovial diffusion",
          "Links absent direct capillary perfusion to failed inflammatory and proliferative healing phases"
        ]
      }
    ],
    "commonMistakes": [
      "Assuming blood is an epithelial fluid: blood is classified strictly as a fluid connective tissue because it possesses specialized cells suspended in an extracellular matrix (plasma).",
      "Confusing dense regular with dense irregular connective tissue: dense regular has parallel fibres for one-axis tension (tendons); dense irregular has interwoven fibres for multi-axis stress (dermis).",
      "Believing cartilage contains blood vessels: cartilage is completely avascular, which is why cartilage injuries heal very slowly or not at all."
    ],
    "sourceRefs": [
      {
        "ref": "phys.1.2026",
        "location": "p37 \"Characteristics of Connective Tissue\""
      },
      {
        "ref": "phys.1.2026",
        "location": "p39 \"Classification of Connective Tissues\""
      },
      {
        "ref": "phys.1.2026",
        "location": "p40 \"Connective Tissue Proper\""
      },
      {
        "ref": "phys.1.2026",
        "location": "p39 \"Fluid Connective Tissues\""
      },
      {
        "ref": "phys.1.2026",
        "location": "p39 \"Supporting Connective Tissues\""
      },
      {
        "ref": "phys.1",
        "location": "p38 \"Characteristics of Connective Tissue\""
      },
      {
        "ref": "phys.1",
        "location": "p40 \"Classification of Connective Tissues\""
      },
      {
        "ref": "phys.1",
        "location": "p41 \"Connective Tissue Proper\""
      },
      {
        "ref": "phys.1",
        "location": "p40 \"Fluid Connective Tissues\""
      },
      {
        "ref": "phys.1",
        "location": "p40 \"Supporting Connective Tissues\""
      },
      {
        "ref": "phys.cells.tut",
        "location": "p2 \"types of tissue organization\""
      },
      {
        "ref": "phys.cells.tut",
        "location": "p4 \"Blood is which type of tissue\""
      },
      {
        "ref": "phys.cells.tut",
        "location": "p4 \"connective tissue cells produce collagen\""
      },
      {
        "ref": "phys.tut",
        "location": "p7 \"B) fibroblasts\""
      }
    ]
  },
  {
    "id": "abct2326-muscle-neural-tissue",
    "subject": "ABCT2326",
    "unit": "phys.cells",
    "type": "concept",
    "title": "Muscle and neural tissues: the three muscle types and neuron-neuroglia functional roles",
    "tags": [
      "foundation",
      "high-yield",
      "muscle",
      "nervous",
      "tissues",
      "neurons"
    ],
    "priorKnowledge": {
      "level": "dse-bio",
      "covers": "part",
      "dsePart": "core",
      "syllabusRef": { "ref": "edb.bio", "location": "Compulsory I \"Cells and Molecules of Life\" — animal tissues; Compulsory III \"Nervous coordination\"." },
      sources: [
        {
          "ref": "phys.1.2026",
          "location": "p51 \"Found only in the heart\""
        },
        {
          "ref": "phys.1.2026",
          "location": "p53 \"Neural Tissue\""
        }
      ]
    },
    "practice": [
      {
        "type": "matching",
        "prompt": "Match each muscle tissue type with its defining structural and physiological characteristics.",
        "pairs": [
          [
            "Skeletal muscle",
            "Striated, multinucleated, long cylindrical fibers under voluntary somatic control"
          ],
          [
            "Cardiac muscle",
            "Striated, branched cells joined by intercalated discs, found only in the heart"
          ],
          [
            "Smooth muscle",
            "Non-striated, spindle-shaped cells with single central nucleus in hollow organ walls"
          ]
        ],
        "explanation": "Each muscle tissue type is structurally tailored for locomotion, syncytial pumping, or visceral lumen regulation.",
        "src": {
          "ref": "phys.1.2026",
          "location": "p51 \"Found only in the heart\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which specialized junctional structures join adjacent cardiac myocytes to permit mechanical anchoring and rapid ionic electrical coupling?",
        "options": [
          "Neuromuscular junctions",
          "Intercalated discs",
          "Tight junctions (zonula occludens)",
          "Basement membranes"
        ],
        "answer": 1,
        "explanation": "Intercalated discs contain desmosomes for physical adherence and gap junctions for instantaneous electrical ionic transmission across the heart wall.",
        "src": {
          "ref": "phys.1.2026",
          "location": "p51 \"Found only in the heart\""
        }
      },
      {
        "type": "mcq",
        "prompt": "What is the invariant anatomical direction of electrical signal transmission through a multipolar neuron?",
        "options": [
          "Axon terminal → Axon → Cell body → Dendrites",
          "Dendrites → Cell body (soma) → Axon → Synaptic terminals",
          "Cell body → Dendrites → Axon → Myelin sheath",
          "Axon → Cell body → Dendrites → Neuroglia"
        ],
        "answer": 1,
        "explanation": "Dendrites receive incoming synaptic inputs, conduct graded potentials into the soma, and the axon propagates outgoing action potentials away from the soma.",
        "src": {
          "ref": "phys.1.2026",
          "location": "p53 \"Neural Tissue\""
        }
      },
      {
        "type": "typed",
        "prompt": "What collective term designates the non-excitable supporting cells of neural tissue that nourish, protect, and insulate neurons?",
        "accept": [
          "neuroglia",
          "Neuroglia",
          "glial cells",
          "Glial cells",
          "glia",
          "Glia"
        ],
        "explanation": "Neuroglia (glial cells) outnumber neurons and provide critical structural, metabolic, and myelinating support.",
        "src": {
          "ref": "phys.1.2026",
          "location": "p54 \"Neuroglia\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A patient experiences acute myocardial infarction due to occlusion of the left anterior descending coronary artery, resulting in ischemic necrosis of left ventricular cardiac muscle. Why cannot the surrounding cardiac myocytes undergo mitosis to regenerate the lost wall, and what type of tissue replaces the infarcted myocardium?",
        "model": "Mature adult cardiac myocytes are terminally differentiated cells permanently arrested in the G0 phase of the cell cycle; they lack functional centrioles capable of mitotic spindle formation and cannot undergo proliferative division to replace dead tissue. Instead, dead cardiocytes release inflammatory damage signals that activate local fibroblasts. These fibroblasts migrate into the necrotic zone and synthesize dense irregular collagen fibres, forming dense fibrous scar tissue (non-contractile connective tissue). While this collagen scar prevents ventricular wall rupture, it lacks contractile actin-myosin machinery and electrical intercalated discs, permanently reducing stroke volume and predisposing the ventricle to conduction re-entry arrhythmias.",
        "rubric": [
          "Identifies mature cardiocytes as arrested in G0 and incapable of mitotic division",
          "Explains that infarcted myocardium is replaced by fibrous scar tissue (dense connective tissue) produced by fibroblasts",
          "Explains the functional consequence: non-contractile collagen lacks contractile force and electrical conduction"
        ]
      }
    ],
    "commonMistakes": [
      "Assuming cardiac muscle and smooth muscle are voluntary: both are strictly involuntary, regulated by pacemaker cells and autonomic innervation.",
      "Confusing the roles of neurons and neuroglia: neurons carry electrical impulses; neuroglia do not fire action potentials but provide vital metabolic, immune, and structural support.",
      "Reversing the signal direction in a neuron: signals enter through dendrites and travel out along the axon, never the reverse under normal physiological conditions."
    ],
    "sourceRefs": [
      {
        "ref": "phys.1.2026",
        "location": "p51 \"Found only in the heart\""
      },
      {
        "ref": "phys.1.2026",
        "location": "p53 \"Neural Tissue\""
      },
      {
        "ref": "phys.1.2026",
        "location": "p54 \"Neuroglia\""
      },
      {
        "ref": "phys.1.2026",
        "location": "p56 \"Organs and Systems\""
      },
      {
        "ref": "phys.1",
        "location": "p52 \"Found only in the heart\""
      },
      {
        "ref": "phys.1",
        "location": "p54 \"Neural Tissue\""
      },
      {
        "ref": "phys.1",
        "location": "p55 \"Neuroglia\""
      },
      {
        "ref": "phys.1",
        "location": "p57 \"Organs and Systems\""
      },
      {
        "ref": "phys.cells.tut",
        "location": "p2 \"types of tissue organization\""
      },
      {
        "ref": "phys.cells.tut",
        "location": "p4 \"specialized form of connective tissue\""
      },
      {
        "ref": "phys.cvs.tut",
        "location": "p1 \"sarcomeres with A bands and I bands\""
      },
      {
        "ref": "phys.cvs.tut",
        "location": "p2 \"cardiac muscle fibers have striations\""
      }
    ]
  },
  {
    "id": "abct2326-feedback-loops",
    "subject": "ABCT2326",
    "unit": "phys.cells",
    "type": "comparison",
    "title": "Feedback mechanisms: negative versus positive feedback with thermoregulation and clotting worked examples",
    "tags": [
      "foundation",
      "high-yield",
      "feedback-loops",
      "thermoregulation",
      "hemostasis"
    ],
    "priorKnowledge": {
      "level": "dse-bio",
      "covers": "most",
      "dsePart": "core",
      "syllabusRef": { "ref": "edb.bio", "location": "Compulsory III \"Homeostasis\" — negative feedback mechanism." },
      sources: [
        {
          "ref": "phys.1.2026",
          "location": "p59 \"Positive Feedback\""
        },
        {
          "ref": "phys.1.2026",
          "location": "p60 \"Control of Body Temperature\""
        },
        {
          "ref": "phys.1.2026",
          "location": "p61 \"Positive Feedback\""
        }
      ]
    },
    "practice": [
      {
        "type": "comparison",
        "prompt": "Which statement accurately describes positive feedback in human physiology?",
        "options": [
          "The response of the effector negates the original stimulus to maintain dynamic equilibrium",
          "The response of the effector increases or reinforces the change produced by the stimulus",
          "The body is immediately returned to its resting set point",
          "It is the predominant regulatory mechanism maintaining baseline organ perfusion"
        ],
        "answer": 1,
        "explanation": "In positive feedback, the effector response amplifies the stimulus, driving the condition further away from normal to accelerate a process.",
        "src": {
          "ref": "phys.1.2026",
          "location": "p59 \"Positive Feedback\""
        }
      },
      {
        "type": "mcq",
        "prompt": "In the negative feedback control of body temperature, which anatomical structures serve as the sensory receptors?",
        "options": [
          "The thermoregulatory centre in the hypothalamus",
          "Sweat glands and cutaneous arterioles",
          "Temperature sensors in the skin and hypothalamus",
          "Skeletal muscle motor units"
        ],
        "answer": 2,
        "explanation": "Temperature sensors in the skin and anterior hypothalamus act as the receptors detecting core and surface temperature deviations.",
        "src": {
          "ref": "phys.1.2026",
          "location": "p60 \"Control of Body Temperature\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Why does human physiology employ positive feedback during blood clotting rather than negative feedback?",
        "options": [
          "To prevent unnecessary energy expenditure by platelets",
          "To rapidly accelerate clot formation and seal vascular breaches before fatal hemorrhage occurs",
          "To prevent fibrin polymer formation",
          "To permanently lower blood pressure throughout the vascular tree"
        ],
        "answer": 1,
        "explanation": "Positive feedback is utilized to speed up critical processes to rapid completion; clotting must escalate exponentially to seal damaged vessels swiftly.",
        "src": {
          "ref": "phys.1.2026",
          "location": "p59 \"Positive Feedback\""
        }
      },
      {
        "type": "typed",
        "prompt": "What physiological term defines an opposing feedback mechanism wherein the effector response directly counteracts and cancels the initiating stimulus?",
        "accept": [
          "negative feedback",
          "Negative feedback",
          "negative feedback loop",
          "Negative feedback loop"
        ],
        "explanation": "Negative feedback is the primary homeostatic mechanism that negates the stimulus and restores variables to their normal range.",
        "src": {
          "ref": "phys.1.2026",
          "location": "p59 \"Positive Feedback\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A marathon runner collapses on a hot, humid afternoon with exertional heat stroke. Core body temperature is 41.5°C (106.7°F), the skin is hot and dry (anhidrosis), and the patient is confused. Explain how the physiological thermoregulatory negative feedback loop failed, why sweating ceased, and how this state can degenerate into a fatal positive feedback spiral.",
        "model": "Under extreme heat strain with severe dehydration, prolonged maximal sweating depletes circulating plasma volume (hypovolemia). When hypovolemia threatens cardiac output and cerebral perfusion, the sympathetic nervous system activates a protective vasoconstrictor reflex that shuts down cutaneous blood flow and halts sweat gland secretion to conserve central blood pressure. This shuts off evaporative heat dissipation, terminating the negative feedback loop. Core body temperature surges uncontrolled above 41°C, directly damaging hypothalamic thermoregulatory neurons and denaturing metabolic enzymes. As cellular metabolism accelerates exponentially with rising heat (Q10 temperature effect), internal heat production escalates, converting physiology into a fatal hyperthermic positive feedback spiral leading to multi-organ failure and cardiovascular collapse.",
        "rubric": [
          "Identifies dehydration and hypovolemia as the cause of compensatory cutaneous vasoconstriction and sweat cessation",
          "Explains the breakdown of the negative feedback thermoregulatory mechanism",
          "Explains how hyperthermia escalates metabolic heat generation in a lethal positive feedback spiral"
        ]
      }
    ],
    "commonMistakes": [
      "Believing positive feedback is always abnormal or pathological: positive feedback is a vital physiological tool used deliberately for speed in blood clotting and labor.",
      "Naming the hypothalamus as the effector in thermoregulation: the hypothalamus is the control centre; sweat glands, blood vessels, and skeletal muscles are the effectors.",
      "Assuming negative feedback creates an absolutely flat, unvarying value: it maintains dynamic equilibrium, allowing slight oscillations within normal limits."
    ],
    "sourceRefs": [
      {
        "ref": "phys.1.2026",
        "location": "p59 \"Positive Feedback\""
      },
      {
        "ref": "phys.1.2026",
        "location": "p60 \"Control of Body Temperature\""
      },
      {
        "ref": "phys.1.2026",
        "location": "p62 \"Dynamic equilibrium\""
      },
      {
        "ref": "phys.1",
        "location": "p60 \"Positive Feedback\""
      },
      {
        "ref": "phys.1",
        "location": "p61 \"Control of Body Temperature\""
      },
      {
        "ref": "phys.1",
        "location": "p60 \"Negative and Positive Feedback\""
      },
      {
        "ref": "phys.cells.tut",
        "location": "p2 \"positive and negative feedback control\""
      }
    ]
  },
  {
    id: 'phys-nerve-cellular-action-potential',
    subject: 'ABCT2326', unit: 'phys.nerv', type: 'concept',
    title: 'Nerve cell physiology: glial cells, resting potential, action potential, and synaptic transmission',
    tags: ['physiology', 'nervous', 'action-potential', 'synapse', 'high-yield'],
    practice: [
      { type: 'mcq', prompt: 'Which glial cells produce the myelin sheath in the central nervous system (CNS)?', options: ['Schwann cells', 'Oligodendrocytes', 'Astrocytes', 'Microglia'], answer: 1,
        explanation: 'In the CNS, myelin is formed by oligodendrocytes. In the PNS, myelin is produced by Schwann cells.',
        src: { ref: 'phys.nerve.deck', location: 'p17 "In the CNS, the myelin sheath is produced by oligodendrocytes."' } },
      { type: 'mcq', prompt: 'What is the stoichiometric ion exchange ratio of the active sodium–potassium pump (Na+/K+ ATPase)?', options: ['2 Na+ out for 3 K+ in', '3 Na+ out of the cell for 2 K+ in', '3 Na+ in for 2 K+ out', '1 Na+ out for 1 K+ in'], answer: 1,
        explanation: 'The Na+/K+ ATPase moves 3 Na+ ions out of the cell and 2 K+ ions into the cell per ATP hydrolyzed.',
        src: { ref: 'phys.nerve.deck', location: 'p30 "3 Na+ ions out of the cell"' } },
      { type: 'mcq', prompt: 'Why is the resting axonal membrane significantly more permeable to potassium than sodium?', options: ['Active pumps exclusively transport potassium at rest', 'There are 50–70 times more K+ passive leak channels than Na+ channels', 'Sodium ions are too large to pass through any channel', 'Voltage-gated potassium channels stay permanently open'], answer: 1,
        explanation: 'The resting membrane has 50–70 times more passive (leak) K+ channels than Na+ channels, giving potassium high resting permeability.',
        src: { ref: 'phys.nerve.deck', location: 'p27 "there are 50-70 times more K+ passive channels"' } },
      { type: 'typed', prompt: 'What is the peak membrane potential in millivolts (mV) reached during a neuronal action potential before repolarization?', accept: ['+25', '+25 mV', '+25mV', '25', '25 mV', '25mV'],
        explanation: 'The action potential reaches a peak of approximately +25 mV before sodium channels inactivate and potassium channels open.',
        src: { ref: 'phys.nerve.deck', location: 'p34 "It then reaches a peak of +25mV and then drops"' } },
      { type: 'matching', prompt: 'Match each glial cell type to its anatomical location and primary function.',
        pairs: [['Astrocytes', 'Most abundant glial cell in CNS'], ['Ependymal cells', 'Line brain ventricles and secrete CSF'], ['Oligodendrocytes', 'Produce myelin sheath in CNS'], ['Schwann cells', 'Produce myelin sheath in PNS']],
        explanation: 'These distinct glial cell classes support and insulate neurons across the nervous system.',
        src: { ref: 'phys.nerve.deck', location: 'p21 "Most abundant glial cell"' } },
      { type: 'sequence', prompt: 'Order the physiological events occurring during a neuronal action potential and conduction.',
        items: ['Depolarization to threshold (-55 mV)', 'Rapid Na+ influx to peak +25 mV', 'Na+ inactivation and K+ efflux repolarization', 'Relative refractory period (K+ channels open)', 'Saltatory leap to adjacent node of Ranvier'],
        explanation: 'The cycle proceeds from threshold activation to peak +25 mV, repolarization, refractory period, and propagation along nodes of Ranvier.',
        src: { ref: 'phys.nerve.deck', location: 'p37 "Once threshold has been reached, action"' } },
    ],
    application: [
      { type: 'scenario', prompt: 'A physiology student compares signal transmission in unmyelinated C fibres versus myelinated A fibres. Explain how myelin and nodes of Ranvier alter ion movement, conduction velocity, and energy consumption.',
        model: 'In myelinated axons, myelin provides high electrical resistance and low capacitance, insulating the internodes. Voltage-gated Na+ and K+ channels are clustered almost exclusively at the unmyelinated nodes of Ranvier, spaced 1–2 mm apart. Consequently, action potentials do not regenerate continuously along every patch of axolemma; instead, ionic current flows electrotonically beneath the sheath and generates action potentials only at successive nodes — a process termed saltatory conduction. This increases conduction velocity by more than tenfold and drastically reduces metabolic energy consumption, because the Na+/K+ ATPase pump only needs to restore ion gradients at the small nodal areas rather than across the entire axon surface.',
        rubric: ['Explains saltatory conduction jumping between nodes of Ranvier spaced 1–2 mm apart', 'Contrasts nodal ion flux with continuous conduction along unmyelinated fibres', 'Explains increased velocity and decreased ATP expenditure by Na+/K+ pumps'] },
    ],
    commonMistakes: [
      'Confusing CNS myelinating cells (oligodendrocytes) with PNS myelinating cells (Schwann cells).',
      'Thinking the Na+/K+ pump moves 2 Na+ out and 3 K+ in (it pumps 3 Na+ out and 2 K+ in).',
      'Believing the action potential peak is +70 mV or 0 mV (it peaks at ~+25 mV).',
    ],
    sourceRefs: [
      { ref: 'phys.nerve.deck', location: 'p4 "100 billion neurons,"' },
      { ref: 'phys.nerve.deck', location: 'p15 "Ependymal cells: line the brain ventricles and secrete"' },
      { ref: 'phys.nerve.deck', location: 'p17 "In the CNS, the myelin sheath is produced by oligodendrocytes."' },
      { ref: 'phys.nerve.deck', location: 'p17 "In the PNS, the myelin sheath is produced by Schwann Cells."' },
      { ref: 'phys.nerve.deck', location: 'p21 "Most abundant glial cell"' },
      { ref: 'phys.nerve.deck', location: 'p27 "there are 50-70 times more K+ passive channels"' },
      { ref: 'phys.nerve.deck', location: 'p30 "3 Na+ ions out of the cell"' },
      { ref: 'phys.nerve.deck', location: 'p34 "It then reaches a peak of +25mV and then drops"' },
      { ref: 'phys.nerve.deck', location: 'p37 "Once threshold has been reached, action"' },
      { ref: 'phys.nerve.deck', location: 'p39 "period is when K+ channels"' },
      { ref: 'phys.nerve.deck', location: 'p42 "K+ to cross the membrane every 1-2 mm."' },
      { ref: 'phys.nerve.deck', location: 'p42 "This is called saltatory conduction."' },
      { ref: 'phys.nerve.deck', location: 'p46 "Cells are joined by gap junctions"' },
      { ref: 'phys.nerve.deck', location: 'p49 "ACh is a neurotransmitter that directly opens ion"' },
      { ref: 'phys.nerve.deck', location: 'p52 "In the heart, K+ channels are opened,"' },
      { ref: 'phys.nerve.deck', location: 'p55 "Opening Na+ or Ca2+ channels results in a graded depolarization"' },
    ],
  },
  {
  "id": "abct2326-renal-filtration-countercurrent",
  "subject": "ABCT2326",
  "unit": "phys.renal",
  "type": "concept",
  "title": "Glomerular ultrafiltration dynamics, GFR regulation, and obligatory water loss",
  "tags": [
    "renal",
    "gfr",
    "countercurrent",
    "raas",
    "high-yield",
    "ultrafiltration",
    "starling-forces"
  ],
  "priorKnowledge": {
    "level": "dse-bio",
    "covers": "part",
    "dsePart": "elective-hp",
    "syllabusRef": { "ref": "edb.bio.supp", "location": "Elective V(a) \"Regulation of water content (osmoregulation)\" — ultrafiltration in Bowman’s capsule, hydrostatic pressure and composition of filtrate." },
    sources: [
      {
        "ref": "phys.5",
        "location": "p14 \"Glomerular Filtration\""
      },
      {
        "ref": "phys.5",
        "location": "p17 \"Glomerular Filtration Rate (GFR)\""
      },
      {
        "ref": "phys.5",
        "location": "p21 \"Obligatory Water Loss\""
      },
      {
        "ref": "phys.5",
        "location": "p26 \"Significance of\""
      },
      {
        "ref": "phys.5",
        "location": "p27 \"Countercurrent Multiplier System\""
      },
      {
        "ref": "phys.5",
        "location": "p40 \"Renin-Angiotensin-Aldosterone System\""
      },
      {
        "ref": "phys.5",
        "location": "p44 \"Nephron cannot produce urine with pH < 4.5\""
      }
    ]
  },
  "practice": [
    {
      "type": "mcq",
      "prompt": "What are the normal average Glomerular Filtration Rates (GFR) measured in healthy adult females and males?",
      "options": [
        "75 mL/min in females; 90 mL/min in males",
        "115 mL/min in females; 125 mL/min in males",
        "150 mL/min in females; 175 mL/min in males",
        "180 mL/min in females; 200 mL/min in males"
      ],
      "answer": 1,
      "explanation": "GFR averages 115 mL/min in women and 125 mL/min in men, producing roughly 180 liters of ultrafiltrate daily."
    },
    {
      "type": "matching",
      "prompt": "Match each quantitative renal parameter with its precise physiological value or limit.",
      "pairs": [
        [
          "Daily glomerular ultrafiltrate volume",
          "Approximately 180 liters per day"
        ],
        [
          "Minimum obligatory urine volume",
          "400 mL per day to clear solute waste load"
        ],
        [
          "Early unregulated water and salt reabsorption",
          "85% reabsorbed in PCT (65%) and descending loop (20%)"
        ],
        [
          "Minimum renal tubular urinary pH limit",
          "Nephron cannot acidify urine below pH 4.5"
        ]
      ],
      "explanation": "180 L/day filtered; 400 mL/day minimum obligatory output; 85% early reabsorbed; pH 4.5 is the absolute acidity limit."
    },
    {
      "type": "mcq",
      "prompt": "What percentage of total basal caloric energy consumed by the human body at rest is dedicated to driving renal tubular active solute reabsorption?",
      "options": [
        "6% of resting calories",
        "1% of resting calories",
        "15% of resting calories",
        "25% of resting calories"
      ],
      "answer": 0,
      "explanation": "Active primary transport (principally Na+/K+ ATPase pumps along the nephron) consumes approximately 6% of all calories expended by the body at rest."
    },
    {
      "type": "typed",
      "prompt": "What is the minimum volume (in mL/day) of obligatory daily urine output required by the human kidneys to excrete non-volatile metabolic wastes?",
      "accept": [
        "400",
        "400 mL",
        "400 ml",
        "400 mL/day",
        "400 ml/day"
      ],
      "explanation": "An obligatory urine loss of at least 400 mL/day is essential to prevent azotemia and retain solute clearance."
    }
  ],
  "application": [
    {
      "type": "scenario",
      "prompt": "A 68-year-old male with septic shock has a mean arterial pressure (MAP) of 50 mmHg and severe oliguria, producing only 120 mL of urine over the past 24 hours. Laboratory results show BUN of 68 mg/dL and serum creatinine of 4.2 mg/dL. Analyze the relationship between his systemic hypotension and the collapse of GFR, explain why his 120 mL/day urine output is clinically dangerous, and calculate how his failure to hit the 400 mL/day threshold affects metabolic solute clearance.",
      "model": "Glomerular filtration depends on glomerular capillary hydrostatic pressure (P_GC), which is normally maintained around 50–55 mmHg by renal autoregulation when MAP is between 80 and 180 mmHg. In septic shock with MAP dropping to 50 mmHg, severe systemic arterial hypotension overwhelms myogenic autoregulation and triggers intense sympathetic vasoconstriction of renal afferent arterioles. P_GC collapses toward 35 mmHg. Starling forces opposing filtration (P_BS ~15 mmHg and pi_GC ~30 mmHg) total 45 mmHg; because opposing pressures exceed P_GC, net filtration pressure drops to zero, producing acute tubular ischemia and an abrupt collapse of GFR. The human body generates approximately 600 mOsm of non-volatile metabolic waste solutes (urea, creatinine, uric acid, protons) each day. Because maximal medullary countercurrent concentration cannot exceed 1400 mOsm/L, the absolute minimum volume of water required to excrete 600 mOsm of solute is: 600 mOsm / 1.4 mOsm/mL = ~428 mL/day (the 400 mL/day obligatory water loss). At only 120 mL/day, the patient cannot physically dissolve and excrete his daily solute burden, even at maximal urine concentration (120 mL x 1.4 mOsm/mL = only 168 mOsm cleared). Over 430 mOsm of toxic nitrogenous wastes are retained in the bloodstream, resulting in rapidly escalating azotemia, uremia, and metabolic acidosis.",
      "rubric": [
        "Explains that hypotension (MAP 50 mmHg) drops P_GC below opposing Starling pressures, reducing NFP and GFR to near zero",
        "Identifies that 600 mOsm daily solute load divided by max concentration (1400 mOsm/L) requires ~400 mL/day minimum obligatory water",
        "Demonstrates that 120 mL/day output is mathematically incapable of clearing daily solute wastes, resulting in uremic azotemia"
      ]
    }
  ],
  "commonMistakes": [
    "Assuming all water reabsorption is regulated by ADH; 85% of water is reabsorbed obligatorily in the PCT and loop of Henle regardless of ADH.",
    "Believing urine can reach extreme acidity like gastric juice (pH 1.5–2.0); the nephron’s lowest tubular limit is pH 4.5.",
    "Confusing GFR volume (~180 L/day) with urine output (1–2 L/day), forgetting that >99% of filtrate is reabsorbed."
  ],
  "sourceRefs": [
    {
      "ref": "phys.5",
      "location": "p14 \"Glomerular Filtration\""
    },
    {
      "ref": "phys.5",
      "location": "p17 \"Glomerular Filtration Rate (GFR)\""
    },
    {
      "ref": "phys.5",
      "location": "p21 \"Obligatory Water Loss\""
    },
    {
      "ref": "phys.5",
      "location": "p26 \"Significance of\""
    },
    {
      "ref": "phys.5",
      "location": "p27 \"Countercurrent Multiplier System\""
    },
    {
      "ref": "phys.5",
      "location": "p40 \"Renin-Angiotensin-Aldosterone System\""
    },
    {
      "ref": "phys.5",
      "location": "p44 \"Nephron cannot produce urine with pH < 4.5\""
    }
  ]
},
  {
    id: 'abct2326-muscle-ultrastructure-energetics',
    subject: 'ABCT2326', unit: 'phys.msk', type: 'concept',
    title: 'Muscle physiology: sarcomere ultrastructure, titin recoil, motor unit recruitment, fibre types, and neural control',
    tags: ['muscle', 'sarcomere', 'titin', 'motor-unit', 'vo2max', 'high-yield'],
    practice: [
      { type: 'mcq', prompt: 'What is the structural role of the giant elastic protein titin in the muscle sarcomere?', options: ['It hydrolyzes ATP during the power stroke', 'It connects myosin filaments to the Z-disc and contributes to elastic recoil', 'It covers the myosin-binding sites on actin', 'It acts as the primary calcium storage channel'], answer: 1,
        explanation: 'Titin spans from the Z-disc to the M-line, anchoring myosin and providing passive elastic recoil after stretching.',
        src: { ref: 'phys.muscle.deck', location: 'p18 "Titin is elastic protein attaching myosin to Z disc that contributes to elastic"' } },
      { type: 'mcq', prompt: 'At what regular intervals are troponin complexes positioned along the actin filament?', options: ['Every 3 actins', 'Every 7 actins', 'Every 14 actins', 'Every 21 actins'], answer: 1,
        explanation: 'Troponin complexes are spaced along thin filaments at intervals of every 7 actins.',
        src: { ref: 'phys.muscle.deck', location: 'p25 "intervals of every 7 actins"' } },
      { type: 'mcq', prompt: 'At approximately what percentage of VO2 max does the lactate threshold occur in an untrained or moderately trained individual?', options: ['10–20%', '30–40%', '50–70%', '85–95%'], answer: 2,
        explanation: 'The lactate threshold, where blood lactate begins to accumulate exponentially, occurs at about 50–70% VO2 max.',
        src: { ref: 'phys.muscle.deck', location: 'p42 "Occurs at about 50-70% VO2 max"' } },
      { type: 'typed', prompt: 'Approximately how many muscle fibres are innervated by a single motor unit in precision extraocular eye muscles?', accept: ['20', '~20', '20 muscle fibers', '~20 muscle fibers'],
        explanation: 'The eye muscles feature tiny motor units with only ~20 muscle fibers per unit for fine movements.',
        src: { ref: 'phys.muscle.deck', location: 'p37 "The eye muscles may have ~20 muscle fibers/motor units."' } },
      { type: 'matching', prompt: 'Match each muscle fibre type and biochemical regulator to its functional definition.',
        pairs: [['Type I fibers', 'Also called red slow oxidative fibers'], ['Type IIX fibers', 'Type IIX fibers also called white fast glycolytic fibers'], ['Myostatin', 'Myostatin is a paracrine regulator that inhibits satellite'], ['Dystrophin', 'muscle fiber scaffolding:'] ],
        explanation: 'These pairings define the cellular phenotypes and regulatory molecules of skeletal muscle tissue.',
        src: { ref: 'phys.muscle.deck', location: 'p46 "Also called red slow oxidative fibers"' } },
      { type: 'sequence', prompt: 'Trace the events of muscle excitation-contraction coupling from sarcolemma depolarization to relaxation.',
        items: ['Action potential travels down transverse tubules (T-tubules)', 'SR Ca2+ release channels (10X larger) open and flood sarcoplasm', 'Ca2+ binds troponin spaced at intervals of every 7 actins', 'Tropomyosin shifts exposing myosin binding sites on actin', 'Myosin heads execute crossbridge power stroke with titin elastic recoil'],
        explanation: 'Coupling flows from T-tubule depolarization, SR channel Ca2+ release, troponin binding, tropomyosin shifting, to crossbridge cycling.',
        src: { ref: 'phys.muscle.deck', location: 'p30 "channels are 10X larger"' } },
    ],
    application: [
      { type: 'scenario', prompt: 'Contrast the muscle fibre characteristics, metabolic pathways, and motor unit recruitment patterns of an endurance runner versus a competitive sprinter, referencing Type I vs Type IIX fibres, VO2 max, and lactate threshold.',
        model: 'An endurance runner relies predominantly on Type I (red slow oxidative) muscle fibres, which possess high concentrations of myoglobin, capillaries, and mitochondria to sustain aerobic phosphorylation. Their VO2 max can reach 70–80 ml O2/kg/min, and endurance training elevates their lactate threshold beyond 70% of VO2 max, while shifting fast fibres away from Type IIX toward Type IIA. Conversely, a sprinter relies heavily on Type IIX (white fast glycolytic) fibres, which possess high myofibrillar ATPase activity and extensive glycogen stores for rapid ATP generation via anaerobic glycolysis, but fatigue swiftly. Sprinters recruit large motor units with hundreds of fibres, whereas fine motor adjustments rely on small motor units (~20 fibres/unit).',
        rubric: ['Contrasts Type I (red slow oxidative) and Type IIX (white fast glycolytic) ultrastructure and metabolism', 'Explains VO2 max and lactate threshold (50-70% VO2 max) dynamics', 'Contrasts motor unit sizing and recruitment'] },
    ],
    commonMistakes: [
      'Confusing titin with nebulin or myosin (titin connects myosin to the Z-disc and supplies elastic recoil).',
      'Believing troponin sits on myosin heads (troponin binds tropomyosin and actin every 7 actin monomers).',
      'Assuming training creates new Type IIX fibres (endurance training decreases Type IIX fibres and increases oxidative Type IIA fibres).',
    ],
    sourceRefs: [
      { ref: 'phys.muscle.deck', location: 'p4 "males and about 32% of females."' },
      { ref: 'phys.muscle.deck', location: 'p5 "Ability of a muscle to shorten with force"' },
      { ref: 'phys.muscle.deck', location: 'p18 "Titin is elastic protein attaching myosin to Z disc that contributes to elastic"' },
      { ref: 'phys.muscle.deck', location: 'p25 "intervals of every 7 actins"' },
      { ref: 'phys.muscle.deck', location: 'p30 "channels are 10X larger"' },
      { ref: 'phys.muscle.deck', location: 'p37 "The eye muscles may have ~20 muscle fibers/motor units."' },
      { ref: 'phys.muscle.deck', location: 'p41 "Ranges from 12 ml O2/minute/kg body weight to 84 ml O2/minute/kg"' },
      { ref: 'phys.muscle.deck', location: 'p42 "Occurs at about 50-70% VO2 max"' },
      { ref: 'phys.muscle.deck', location: 'p46 "Also called red slow oxidative fibers"' },
      { ref: 'phys.muscle.deck', location: 'p47 "Type IIX fibers also called white fast glycolytic fibers"' },
      { ref: 'phys.muscle.deck', location: 'p51 "Decreased number of type IIX (fast glycolytic) fibers; increased number"' },
      { ref: 'phys.muscle.deck', location: 'p52 "muscle fiber scaffolding:"' },
      { ref: 'phys.muscle.deck', location: 'p53 "Myostatin is a paracrine regulator that inhibits satellite"' },
      { ref: 'phys.muscle.deck', location: 'p65 "produces most of the symptoms of Parkinson\'s disease."' },
      { ref: 'phys.muscle.deck', location: 'p65 "treated with l-dopa (the precursor of dopamine) or dopamine"' },
      { ref: 'phys.muscle.deck', location: 'p65 "produces chorea--a hyperkinetic disorder characterized"' },
      { ref: 'phys.muscle.deck', location: 'p67 "basic functional unit: osteon (or called Haversian"' },
      { ref: 'phys.muscle.deck', location: 'p72 "1/5 of adult skeleton is demolished and"' },
    ],
  },
  {
    id: 'abct2326-msk-bone-structure-remodeling',
    subject: 'ABCT2326', unit: 'phys.msk', type: 'comparison',
    title: 'Compact vs spongy bone, bone cells, remodelling and calcium balance',
    tags: ['bone', 'msk', 'high-yield'],
    practice: [
      { type: 'matching', prompt: 'Match each bone tissue or structure to its feature.',
        pairs: [['Compact bone', 'Dense and solid; unit is the osteon (Haversian system)'], ['Spongy bone', 'Open network of plates called trabeculae; no vessels or osteons'], ['Osteon', 'Directional arrangement gives compact bone its strength'], ['Canaliculi', 'Route by which spongy osteocytes obtain nutrients from compact bone']],
        explanation: 'The two-tissue comparison and its features come straight from the deck\'s compact/spongy table.' },
      { type: 'mcq', prompt: 'How much of the adult skeleton is demolished and rebuilt each year?', options: ['About 1/20', 'About 1/10', 'About 1/5', 'About 1/2'], answer: 2,
        explanation: 'Through the balanced activities of osteocytes, osteoblasts and osteoclasts, about 1/5 of the adult skeleton is demolished and rebuilt each year.' },
      { type: 'mcq', prompt: 'Which hormone LOWERS blood calcium by signalling its excretion and storage in bone?', options: ['Parathyroid hormone', 'Calcitonin', 'Calcitriol', 'Aldosterone'], answer: 1,
        explanation: 'Calcitonin, from the thyroid, is released when Ca2+ is too high and signals excretion and storage in bones. PTH does the opposite.' },
      { type: 'cloze', prompt: 'Spongy bone has no blood vessels and no osteons; its osteocytes obtain nutrients via ______ from the canaliculi of compact bone.', accept: ['diffusion'], explanation: 'Diffusion from compact bone\'s canaliculi is how the spongy osteocytes are fed.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A patient\'s parathyroids are accidentally removed during thyroid surgery. Using the deck\'s calcium-balance map, predict the direction of blood calcium and what happens to the remodelling balance.', model: 'Parathyroid hormone is the bone\'s calcium-mobilising signal: with the parathyroids gone, PTH falls, so osteoclast stimulation is withdrawn and osteoblast inhibition is lifted — the remodelling balance tips toward bone formation and blood Ca2+ drops (hypocalcaemia, with its neuromuscular irritability). Calcitonin\'s braking is then unopposed, favouring Ca2+ excretion and storage in bone, deepening the fall. The renal and gut arms that PTH and calcitriol drive also lose their signal, removing dietary absorption and renal reabsorption of calcium. The fix is the missing hormone by another route: calcium and active vitamin D supplementation.', rubric: ['Predicts falling blood Ca2+ after PTH loss', 'Describes remodelling tipping toward deposition (osteoclasts unstimulated, osteoblasts disinhibited)', 'Names the renal/gut arms losing calcitriol-driven support'] },
    ],
    commonMistakes: [
      'Treating compact and spongy bone as alternatives. A typical bone contains BOTH.',
      'Saying spongy bone has osteons. It has no osteons and no vessels — nutrients arrive by diffusion from compact bone\'s canaliculi.',
      'Reversing -blast and -clast. Osteoblasts BUILD matrix; osteoclasts demolish it.',
      'Calling remodelling a growth-phase event. It runs throughout life — a fifth of the skeleton turns over every year.',
    ],
    sourceRefs: [
      { ref: 'phys.9', location: 'p80 "Two types"' },
      { ref: 'phys.9', location: 'p81 "Dense"' },
      { ref: 'phys.9', location: 'p81 "osteon"' },
      { ref: 'phys.9', location: 'p81 "Less dense"' },
      { ref: 'phys.9', location: 'p81 "trabeculae"' },
      { ref: 'phys.9', location: 'p81 "No blood vessels and"' },
      { ref: 'phys.9', location: 'p81 "obtain nutrients"' },
      { ref: 'phys.9', location: 'p81 "To withstand stresses"' },
      { ref: 'phys.9', location: 'p81 "To reduce weight"' },
      { ref: 'phys.9', location: 'p81 "supports the cells"' },
      { ref: 'phys.9', location: 'p85 "continuously being recycled and renewed"' },
      { ref: 'phys.9', location: 'p85 "1/5 of adult skeleton"' },
      { ref: 'phys.9', location: 'p85 "parathyroid hormone"' },
      { ref: 'phys.9', location: 'p88 "Active Vitamin D"' },
      { ref: 'phys.9', location: 'p89 "Balance of Ca"' },
    ],
  },
        {
    "id": "abct2326-cvs-hemodynamics-tutorial",
    "subject": "ABCT2326",
    "unit": "phys.cvs",
    "type": "concept",
    "title": "Cardiovascular hemodynamics, nodal conduction pathway, and vascular resistance determinants",
    "tags": [
      "cardiovascular",
      "hemodynamics",
      "conduction",
      "tutorial",
      "high-yield",
      "resistance",
      "pacemaker"
    ],
    "priorKnowledge": {
      "level": "dse-bio",
      "covers": "part",
      "dsePart": "elective-hp",
      "syllabusRef": { "ref": "edb.bio", "location": "Elective V(c) \"Regulation of gas content in blood\" — cardiovascular control and hemodynamics." },
      sources: [
        {
          "ref": "phys.cvs.tut",
          "location": "p1 \"Vascular resistance is related to all of the following, except the\""
        },
        {
          "ref": "phys.cvs.tut",
          "location": "p1 \"osmolarity of interstitial fluids.\""
        },
        {
          "ref": "phys.cvs.tut",
          "location": "p2 \"The normal blood volume of the venous system.\""
        },
        {
          "ref": "phys.cvs.tut",
          "location": "p2 \"the tendinous cords (TC)\""
        },
        {
          "ref": "phys.cvs.tut",
          "location": "p2 \"40 to 50 bpm.\""
        }
      ]
    },
    "practice": [
      {
        "type": "mcq",
        "prompt": "Vascular resistance to blood flow through the systemic circulation is governed by all of the following physiological factors EXCEPT the:",
        "options": [
          "Osmolarity of surrounding interstitial fluids",
          "Internal diameter (radius) of the blood vessel",
          "Overall length of the blood vessel",
          "Viscosity of the circulating blood"
        ],
        "answer": 0,
        "explanation": "According to Poiseuille’s law, vascular resistance depends on vessel radius, vessel length, and blood viscosity, as well as the nature of flow (laminar vs turbulent); it is completely independent of interstitial fluid osmolarity."
      },
      {
        "type": "mcq",
        "prompt": "Which compartment of the cardiovascular system normally contains the greatest fraction of total blood volume in a resting adult?",
        "options": [
          "The venous system (capacitance vessels)",
          "The arterial system (resistance and elastic vessels)",
          "The capillary microcirculation",
          "The four chambers of the heart"
        ],
        "answer": 0,
        "explanation": "The venous system acts as a high-capacitance blood reservoir, containing approximately 60% to 70% of the body’s total blood volume at rest."
      },
      {
        "type": "matching",
        "prompt": "Match each cardiac structure or concept from the tutorial with its definitive physiological characteristic.",
        "pairs": [
          [
            "Sinoatrial (SA) node",
            "Primary cardiac pacemaker initiating normal rhythmic depolarization"
          ],
          [
            "Atrioventricular (AV) node backup rate",
            "Intrinsic secondary pacing rhythm of 40 to 50 bpm upon SA node failure"
          ],
          [
            "Tendinous cords (chordae tendineae)",
            "Mechanical valve tether; NOT a component of the electrical conduction system"
          ],
          [
            "Blood colloid osmotic pressure",
            "Most strongly determined by the concentration of plasma proteins"
          ]
        ],
        "explanation": "The SA node initiates rhythm; AV node backs up at 40–50 bpm; tendinous cords are mechanical struts; plasma proteins determine oncotic pressure."
      },
      {
        "type": "typed",
        "prompt": "If the sinoatrial (SA) node is damaged or destroyed, at what intrinsic rate (in beats per minute, bpm) will the AV node pace the heart?",
        "accept": [
          "40 to 50 bpm",
          "40-50 bpm",
          "40 to 50",
          "40-50",
          "40–50 bpm",
          "40–50"
        ],
        "explanation": "Upon loss of SA nodal pacemaking, the atrioventricular (AV) node establishes a junctional escape rhythm at its intrinsic rate of 40 to 50 bpm."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "An 82-year-old female experiences recurrent syncopal episodes. Holter monitoring demonstrates sick sinus syndrome with prolonged sinus pauses (>4 seconds) where the SA node fails to fire. When ventricular beats appear during pauses, they occur at a steady rate of 44 bpm with normal QRS duration. Explain the physiological mechanism that rescues ventricular contraction during SA arrest, name the pacemaker responsible, and state its expected intrinsic rate.",
        "model": "Under normal physiological conditions, the SA node fires faster (60–100 bpm) than latent pacemakers and continuously suppresses them via overdrive suppression. When sinus arrest occurs and the SA node fails to depolarize, overdrive suppression is eliminated. The secondary pacemaker of the heart—the atrioventricular (AV) node (or AV junction)—undergoes spontaneous prepotential depolarization to threshold. The AV node assumes pacemaking responsibility, generating a junctional escape rhythm at its intrinsic autorhythmic rate of 40 to 50 bpm (here 44 bpm). Because the impulse originates above the bifurcation of the bundle of His, it travels normally through bundle branches and Purkinje fibers, producing normal narrow QRS complexes that maintain life-sustaining cardiac output.",
        "rubric": [
          "Identifies the AV node / AV junction as the secondary latent pacemaker that rescues ventricular contraction",
          "Explains the elimination of overdrive suppression following SA arrest",
          "States the intrinsic autorhythmic firing rate of the AV node as 40 to 50 bpm"
        ]
      }
    ],
    "commonMistakes": [
      "Assuming the tendinous cords (chordae tendineae) conduct electrical impulses from the bundle of His to the papillary muscles, when they are entirely non-conductive fibrous collagen strings.",
      "Thinking vascular resistance increases when interstitial osmolarity rises, when resistance is strictly governed by vessel caliber, length, and blood viscosity.",
      "Assuming that if the SA node fails the heart immediately ceases beating entirely, forgetting that the AV node provides a reliable intrinsic backup rhythm at 40–50 bpm."
    ],
    "sourceRefs": [
      {
        "ref": "phys.cvs.tut",
        "location": "p1 \"Vascular resistance is related to all of the following, except the\""
      },
      {
        "ref": "phys.cvs.tut",
        "location": "p1 \"osmolarity of interstitial fluids.\""
      },
      {
        "ref": "phys.cvs.tut",
        "location": "p2 \"The normal blood volume of the venous system.\""
      },
      {
        "ref": "phys.cvs.tut",
        "location": "p2 \"concentration of plasma proteins.\""
      },
      {
        "ref": "phys.cvs.tut",
        "location": "p2 \"Pulmonary arteries and pulmonary veins\""
      },
      {
        "ref": "phys.cvs.tut",
        "location": "p2 \"sinoatrial (SA) node\""
      },
      {
        "ref": "phys.cvs.tut",
        "location": "p2 \"40 to 50 bpm.\""
      }
    ]
  },
  {
  "id": "abct2326-renal-countercurrent-vasarecta",
  "subject": "ABCT2326",
  "unit": "phys.renal",
  "type": "concept",
  "title": "Countercurrent multiplication, medullary hyperosmolality, and vasa recta exchange",
  "tags": [
    "renal",
    "countercurrent",
    "vasa-recta",
    "loop-of-henle",
    "high-yield",
    "aquaporins",
    "medullary-gradient"
  ],
  "priorKnowledge": {
    "level": "dse-bio",
    "covers": "part",
    "dsePart": "elective-hp",
    "syllabusRef": { "ref": "edb.bio.supp", "location": "Elective V(a) \"Regulation of water content (osmoregulation)\" — hairpin loop of Henle and creation of osmotic gradients." },
    sources: [
      {
        "ref": "phys.5",
        "location": "p27 \"Countercurrent Multiplier System\""
      },
      {
        "ref": "phys.5",
        "location": "p30 \"Countercurrent Exchange in\""
      },
      {
        "ref": "phys.renal.supp",
        "location": "p1 \"NaCl (salt) is pumped out from thick ascending limb.\""
      },
      {
        "ref": "phys.renal.supp",
        "location": "p1 \"Water diffuses out from descending limb to interstitial fluid.\""
      },
      {
        "ref": "phys.renal.supp",
        "location": "p1 \"Reason: Plasma proteins in vasa recta draw water.\""
      },
      {
        "ref": "phys.renal.supp",
        "location": "p1 \"NaCl therefore is always trapped in interstitial fluid and vasa recta.\""
      },
      {
        "ref": "phys.renal.supp",
        "location": "p4 \"Aquaporins\""
      }
    ]
  },
  "practice": [
    {
      "type": "sequence",
      "prompt": "Order the six physiological steps of the renal medullary countercurrent multiplication and exchange mechanism.",
      "items": [
        "NaCl is actively pumped out from the thick ascending limb into medullary interstitium",
        "Extruded NaCl increases the osmolality of medullary interstitial fluid surrounding the loop",
        "Water diffuses out from the descending limb by osmosis, concentrating luminal fluid",
        "Net water diffuses into vasa recta capillaries drawn by plasma protein colloid osmotic pressure",
        "Hairpin vasa recta passively exchange NaCl, trapping solute in medullary interstitium",
        "Deep medullary 1400 mOsm/L hypertonicity is preserved for ADH-driven water reclamation"
      ],
      "explanation": "Active ascending limb salt extrusion initiates the cascade, elevating interstitial osmolality, extracting descending water, recovering fluid via vasa recta oncotic pull, and trapping solutes."
    },
    {
      "type": "matching",
      "prompt": "Match each segment of the renal countercurrent apparatus with its unique permeability and transport characteristics.",
      "pairs": [
        [
          "Thick ascending limb",
          "Actively pumps NaCl via NKCC2; completely impermeable to water"
        ],
        [
          "Thin descending limb",
          "Highly permeable to water via aquaporins; impermeable to solutes"
        ],
        [
          "Vasa recta",
          "Hairpin capillary loop serving as passive countercurrent exchanger"
        ],
        [
          "Medullary collecting duct",
          "Variable water permeability regulated by ADH-induced aquaporin insertion"
        ]
      ],
      "explanation": "Ascending pumps salt/blocks water; descending lets water exit; vasa recta is the exchanger; collecting duct responds to ADH."
    },
    {
      "type": "mcq",
      "prompt": "What physical driving force prevents the water extracted from the descending limb from diluting and washing away the hyperosmolar medullary gradient?",
      "options": [
        "High colloid osmotic pressure exerted by plasma proteins within the vasa recta drawing water inward",
        "Active ATP-dependent sodium pumping by descending vasa recta endothelial cells",
        "Extremely high hydrostatic pressure inside the renal papilla pushing water into the ureter",
        "Complete closure of fenestrations within medullary peritubular capillaries"
      ],
      "answer": 0,
      "explanation": "Colloid osmotic pressure of plasma proteins in the vasa recta exerts a continuous oncotic pull that draws recovered interstitial water into the bloodstream."
    },
    {
      "type": "typed",
      "prompt": "What specific transmembrane channel proteins facilitate the rapid passive osmosis of water across the descending limb and collecting duct epithelial membranes?",
      "accept": [
        "aquaporins",
        "Aquaporins",
        "aquaporin",
        "Aquaporin"
      ],
      "explanation": "Aquaporins are selective water channels that mediate transcellular water diffusion."
    }
  ],
  "application": [
    {
      "type": "scenario",
      "prompt": "A 64-year-old male with congestive heart failure and bilateral pulmonary edema is administered an intravenous bolus of the loop diuretic furosemide (Lasix). Within 30 minutes, he experiences brisk diuresis, excreting 2.5 liters of dilute urine over the subsequent 3 hours, with rapid resolution of his dyspnea. Explain the cellular mechanism of furosemide on the thick ascending limb, detail its step-by-step impact on the countercurrent multiplier system, and explain why both descending limb and collecting duct water extraction fail.",
      "model": "Furosemide is a loop diuretic that binds to and reversibly inhibits the apical Na+/K+/2Cl- (NKCC2) cotransporter in epithelial cells of the thick ascending limb of the loop of Henle. Under normal conditions, step 1 of the countercurrent multiplier relies on NKCC2 actively pumping NaCl out of the thick ascending limb to generate medullary hyperosmolality (step 2). By blocking NKCC2, furosemide stops active NaCl extrusion into the medullary interstitium. Without salt accumulation, the vertical medullary osmotic gradient collapses from 1400 mOsm/L down toward isotonic levels (~300 mOsm/L). In the thin descending limb, because the surrounding interstitium is no longer hyperosmolar, the osmotic gradient driving water extraction through aquaporins is eliminated (step 3 fails). Highly voluminous, isotonic tubular fluid enters the distal nephron. Finally, when this fluid reaches the medullary collecting duct, even if high endogenous circulating ADH is present to insert apical aquaporin-2 channels, water cannot exit the collecting duct because there is no hyperosmolar medullary gradient to draw it out by osmosis. As a result, massive volumes of un-reabsorbed water and electrolytes are excreted in the urine, achieving rapid intravascular volume depletion and resolving pulmonary edema.",
      "rubric": [
        "Identifies furosemide inhibition of the apical Na+/K+/2Cl- (NKCC2) cotransporter in the thick ascending limb",
        "Explains the collapse of the vertical medullary osmotic gradient from 1400 mOsm/L toward isotonic levels",
        "Details how loss of interstitial hyperosmolality abolishes the osmotic driving force for water extraction in both the descending limb and collecting duct"
      ]
    }
  ],
  "commonMistakes": [
    "Believing the descending limb actively pumps salt; the descending limb is purely passive and solute-impermeable, while the thick ascending limb actively pumps salt.",
    "Thinking the vasa recta acts as an active multiplier; the vasa recta is a passive countercurrent exchanger that requires no ATP.",
    "Assuming furosemide works primarily on the collecting duct; it acts on the thick ascending limb, but indirectly cripples collecting duct water reabsorption by destroying the medullary gradient."
  ],
  "sourceRefs": [
    {
      "ref": "phys.5",
      "location": "p27 \"Countercurrent Multiplier System\""
    },
    {
      "ref": "phys.5",
      "location": "p30 \"Countercurrent Exchange in\""
    },
    {
      "ref": "phys.5",
      "location": "p31 \"Homeostasis of\""
    },
    {
      "ref": "phys.renal.supp",
      "location": "p1 \"NaCl (salt) is pumped out from thick ascending limb.\""
    },
    {
      "ref": "phys.renal.supp",
      "location": "p1 \"Water diffuses out from descending limb to interstitial fluid.\""
    },
    {
      "ref": "phys.renal.supp",
      "location": "p1 \"Reason: Plasma proteins in vasa recta draw water.\""
    },
    {
      "ref": "phys.renal.supp",
      "location": "p1 \"NaCl therefore is always trapped in interstitial fluid and vasa recta.\""
    },
    {
      "ref": "phys.renal.supp",
      "location": "p4 \"Aquaporins\""
    }
  ]
},
    {
    "id": "abct2326-resp-ventilation-chemoreceptors",
    "subject": "ABCT2326",
    "unit": "phys.resp",
    "type": "concept",
    "title": "Respiratory mechanics, vital capacity, and medullary chemoreceptor control",
    "tags": [
      "respiratory",
      "chemoreceptors",
      "ventilation",
      "tutorial",
      "high-yield",
      "control-of-breathing",
      "vital-capacity"
    ],
    "priorKnowledge": {
      "level": "dse-bio",
      "covers": "part",
      "dsePart": "elective-hp",
      "syllabusRef": { "ref": "edb.bio", "location": "Elective V(c) \"Regulation of gas content in blood\" — respiratory control centers and chemoreceptor regulation." },
      sources: [
        {
          "ref": "phys.resp.tut",
          "location": "p1 \"THREE different sources of chemoreceptor input that can influence the respiratory\""
        },
        {
          "ref": "phys.resp.tut",
          "location": "p2 \"the vital capacity.\""
        },
        {
          "ref": "phys.resp.tut",
          "location": "p2 \"If the blood lacked red blood cells but the lungs were functioning normally,\""
        },
        {
          "ref": "phys.resp.tut",
          "location": "p2 \"chemoreceptors in the medulla are directly stimulated by\""
        },
        {
          "ref": "phys.resp.tut",
          "location": "p2 \"rhythmic control of breathing is produced by the activity of inspiratory and expiratory neurons\""
        },
        {
          "ref": "phys.resp.tut",
          "location": "p2 \"higher in the systemic veins than in the systemic arteries.\""
        }
      ]
    },
    "practice": [
      {
        "type": "mcq",
        "prompt": "If a patient experienced an experimental condition where all red blood cells were removed from their circulation while the lungs continued to ventilate normally with room air, what would happen to the arterial PO2 (PaO2)?",
        "options": [
          "The arterial PO2 would remain normal (~100 mmHg).",
          "The arterial PO2 would drop to zero.",
          "The arterial PO2 would drop by roughly 50%.",
          "The arterial PO2 would increase above 200 mmHg."
        ],
        "answer": 0,
        "explanation": "Arterial PO2 measures the partial pressure of unbound oxygen physically dissolved in blood plasma, which is determined solely by alveolar ventilation and diffusion; oxygen bound to hemoglobin does not contribute to PO2."
      },
      {
        "type": "matching",
        "prompt": "Match each respiratory concept from the tutorial with its definitive physiological characteristic.",
        "pairs": [
          [
            "Central chemoreceptors",
            "Directly stimulated by H+ ions in cerebrospinal fluid derived from diffusing blood CO2"
          ],
          [
            "Vital capacity",
            "Maximum volume of air that can be forcibly exhaled after maximal inhalation"
          ],
          [
            "PCO2 in systemic circulation",
            "Higher in systemic veins (~45 mmHg) than in systemic arteries (~40 mmHg)"
          ],
          [
            "Medulla oblongata",
            "Houses inspiratory and expiratory neuronal networks generating rhythmic breathing"
          ]
        ],
        "explanation": "Central chemoreceptors sense CSF H+; vital capacity is maximum exhaled volume; systemic veins have higher PCO2; medulla generates respiratory rhythm."
      },
      {
        "type": "mcq",
        "prompt": "Why are central chemoreceptors on the ventrolateral medulla sensitive to changes in arterial PCO2 but relatively insensitive to acute changes in arterial blood pH caused by systemic lactic acidosis?",
        "options": [
          "CO2 diffuses rapidly across the lipophilic blood-brain barrier into CSF to form H+, whereas systemic H+ ions cannot readily cross the blood-brain barrier.",
          "Central chemoreceptors lack hydrogen ion receptor proteins on their cell membranes.",
          "Cerebrospinal fluid contains immense concentrations of albumin that neutralize systemic lactic acid.",
          "The medulla oblongata receives blood supply exclusively from the venous system."
        ],
        "answer": 0,
        "explanation": "The tight junctions of the blood-brain barrier prevent charged hydrophilic hydrogen ions (H+) from penetrating into the brain parenchyma, whereas uncharged lipophilic CO2 diffuses across instantly and hydrates to generate local H+ in unbuffered CSF."
      },
      {
        "type": "typed",
        "prompt": "What specific ion in cerebrospinal fluid directly stimulates central chemoreceptors to accelerate ventilation?",
        "accept": [
          "H+",
          "H+ ion",
          "hydrogen ion",
          "hydrogen ions",
          "proton",
          "protons"
        ],
        "explanation": "Hydrogen ions (H+) in the cerebrospinal fluid directly bind and stimulate central chemoreceptors on the ventrolateral medulla."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A 64-year-old male with severe end-stage chronic obstructive pulmonary disease (COPD) and chronic hypercapnia (baseline PaCO2 58 mmHg, PaO2 52 mmHg) is admitted with pneumonia. An intern places him on 100% high-flow oxygen via a non-rebreather mask, raising his PaO2 to 140 mmHg. Over the next hour, the patient becomes progressively somnolent, bradypneic, and slips into respiratory acidosis and coma. Explain the physiological control of respiration in this patient, why central chemoreceptors failed to prevent hypoventilation, and why high-flow oxygen suppressed his breathing (hypoxic drive blunting).",
        "model": "In chronic COPD with longstanding hypercapnia, chronic elevation of arterial PCO2 leads to renal retention of bicarbonate (HCO3-). Bicarbonate slowly crosses the blood-brain barrier into the CSF, buffering the excess H+ ions and restoring CSF pH toward normal (~7.35). As a result, central medullary chemoreceptors adapt to chronic hypercapnia and become relatively desensitized to high PCO2. In this compensated state, the patient primary ventilatory stimulus shifts to the \"hypoxic drive,\" mediated by peripheral chemoreceptors in the carotid and aortic bodies responding to arterial hypoxemia (PaO2 < 60 mmHg). When 100% high-flow oxygen is administered, arterial PaO2 surges from 52 mmHg to 140 mmHg. This abruptly eliminates peripheral chemoreceptor firing, removing the patient sole remaining respiratory drive. The patient hypoventilates, PaCO2 escalates to lethal narcotic levels (CO2 narcosis), producing respiratory coma.",
        "rubric": [
          "Explains how chronic hypercapnia leads to central chemoreceptor adaptation/desensitization via CSF bicarbonate buffering",
          "Identifies that resting ventilation becomes dependent on peripheral chemoreceptor hypoxic drive (PaO2 < 60 mmHg)",
          "Explains that administering high-flow oxygen abolishes the hypoxic drive, precipitating severe hypoventilation, CO2 narcosis, and coma"
        ]
      }
    ],
    "commonMistakes": [
      "Assuming arterial PO2 measures total oxygen in blood, failing to understand that PO2 reflects only dissolved oxygen in plasma (~1.5%) while hemoglobin carries the rest (~98.5%).",
      "Believing central chemoreceptors sense oxygen levels; central chemoreceptors respond strictly to H+ (derived from CO2) and are completely blind to PO2.",
      "Assuming that systemic arterial blood contains more CO2 than venous blood, forgetting that peripheral tissues continuously produce CO2 so venous PCO2 is higher."
    ],
    "sourceRefs": [
      {
        "ref": "phys.resp.tut",
        "location": "p1 \"define and compare the processes of external respiration and internal respiration\""
      },
      {
        "ref": "phys.resp.tut",
        "location": "p1 \"THREE different sources of chemoreceptor input that can influence the respiratory\""
      },
      {
        "ref": "phys.resp.tut",
        "location": "p2 \"Air entering the body is filtered, warmed, and humidified by the\""
      },
      {
        "ref": "phys.resp.tut",
        "location": "p2 \"the vital capacity.\""
      },
      {
        "ref": "phys.resp.tut",
        "location": "p2 \"If the blood lacked red blood cells but the lungs were functioning normally,\""
      },
      {
        "ref": "phys.resp.tut",
        "location": "p2 \"the arterial PO2 would be normal.\""
      },
      {
        "ref": "phys.resp.tut",
        "location": "p2 \"chemoreceptors in the medulla are directly stimulated by\""
      },
      {
        "ref": "phys.resp.tut",
        "location": "p2 \"H+ in cerebrospinal fluid that is derived from blood CO2.\""
      },
      {
        "ref": "phys.resp.tut",
        "location": "p2 \"rhythmic control of breathing is produced by the activity of inspiratory and expiratory neurons\""
      },
      {
        "ref": "phys.resp.tut",
        "location": "p2 \"the medulla oblongata.\""
      },
      {
        "ref": "phys.resp.tut",
        "location": "p2 \"higher in the systemic veins than in the systemic arteries.\""
      }
    ]
  },
  {
  "id": "abct2326-renal-tubular-clearance-sympathetic",
  "subject": "ABCT2326",
  "unit": "phys.renal",
  "type": "concept",
  "title": "Renal clearance, sympathetic hemodynamics, tubular transport, and micturition",
  "tags": [
    "renal",
    "tubular-transport",
    "micturition",
    "aldosterone",
    "high-yield",
    "renal-clearance",
    "sympathetic-control"
  ],
  "priorKnowledge": {
    "level": "dse-bio",
    "covers": "part",
    "dsePart": "elective-hp",
    "syllabusRef": { "ref": "edb.bio", "location": "Elective V(a) \"Regulation of water content (osmoregulation)\" — osmoreceptors, hormonal control by ADH, and voluntary versus involuntary urination." },
    sources: [
      {
        "ref": "phys.5",
        "location": "p19 \"Sympathetic activity constricts afferent arteriole\""
      },
      {
        "ref": "phys.5",
        "location": "p34 \"The active transport of substances from the\""
      },
      {
        "ref": "phys.5",
        "location": "p37 \"Role of Aldosterone in Na\""
      },
      {
        "ref": "phys.5",
        "location": "p39 \"Is specialized region in each\""
      },
      {
        "ref": "phys.5",
        "location": "p40 \"Is activated by release of\""
      },
      {
        "ref": "phys.renal.tut",
        "location": "p1 \"The external uretheral sphincter can be controlled voluntarily.\""
      },
      {
        "ref": "phys.renal.tut",
        "location": "p2 \"passively reabsorbed in the proximal convoluted tubule.\""
      },
      {
        "ref": "phys.renal.tut",
        "location": "p2 \"shorter nephron loops\""
      },
      {
        "ref": "phys.renal.tut",
        "location": "p2 \"the regulation of glomerular blood flow and pressure.\""
      }
    ]
  },
  "practice": [
    {
      "type": "mcq",
      "prompt": "Why can humans consciously postpone urination when bladder distension initiates the visceral micturition reflex?",
      "options": [
        "The production of glomerular ultrafiltrate can be voluntarily halted by renal nerves.",
        "The external urethral sphincter is composed of skeletal muscle under voluntary somatic motor control.",
        "The internal urethral sphincter is composed of striated muscle innervated by the vagus nerve.",
        "The detrusor muscle of the bladder wall is under conscious pyramidal motor control."
      ],
      "answer": 1,
      "explanation": "Voluntary continence is maintained by somatic motor innervation (via the pudendal nerve) to the striated external urethral sphincter."
    },
    {
      "type": "matching",
      "prompt": "Match each renal regulatory mechanism or anatomical feature with its primary physiological characteristic.",
      "pairs": [
        [
          "Proximal convoluted tubule",
          "Reabsorbs ~65% of water/ions, 100% of glucose, and passively reabsorbs ~50% of urea"
        ],
        [
          "Sympathetic renal stimulation",
          "Constricts afferent arterioles, triggers renin release, and stimulates Na+/water reabsorption"
        ],
        [
          "Juxtamedullary nephron",
          "Possesses long loop of Henle dipping into deep medulla to establish hyperosmolar gradient"
        ],
        [
          "Aldosterone",
          "Steroid hormone accelerating Na+ reabsorption and K+ secretion in the distal nephron"
        ]
      ],
      "explanation": "PCT reabsorbs bulk solutes and 50% urea; sympathetic nerves conserve volume and trigger renin; juxtamedullary nephrons concentrate urine; aldosterone retains sodium."
    },
    {
      "type": "mcq",
      "prompt": "Which anatomical adaptation in nephron architecture would be expected in semi-aquatic mammals such as beavers compared to humans or desert animals?",
      "options": [
        "A complete absence of glomeruli and proximal convoluted tubules",
        "Shorter nephron loops due to minimal evolutionary need for water conservation",
        "A vastly higher proportion of long juxtamedullary loops of Henle",
        "Replacement of the loop of Henle with branching vascular sinusoids"
      ],
      "answer": 1,
      "explanation": "Because beavers inhabit freshwater aquatic environments with abundant water intake, they have little need to conserve water and possess shorter nephron loops."
    },
    {
      "type": "typed",
      "prompt": "What proportion of filtered urea is passively reabsorbed in the proximal convoluted tubule alongside the osmotic reabsorption of water?",
      "accept": [
        "50%",
        "50 percent",
        "half",
        "approximately 50%",
        "50"
      ],
      "explanation": "Approximately 50% of filtered urea is passively reabsorbed in the proximal tubule along the transcellular concentration gradient created by water reabsorption."
    }
  ],
  "application": [
    {
      "type": "scenario",
      "prompt": "A 32-year-old soldier sustains severe trauma with acute hemorrhage, losing 1,200 mL of blood in combat. His blood pressure falls to 85/55 mmHg, heart rate rises to 125 bpm, and urine output plummets to 8 mL/hour. Detail the neuroendocrine response of the kidneys to severe hypovolemic shock, detailing the actions of sympathetic renal nerves, the RAAS cascade, and ADH, and explain how these systems prioritize systemic perfusion over urine excretion.",
      "model": "Severe hemorrhage causes acute hypovolemia, unloading carotid sinus and aortic arch baroreceptors. The medullary vasomotor center mounts a massive sympathetic reflex outflow to the kidneys. Sympathetic postganglionic fibers stimulate alpha-1 receptors on renal afferent arterioles, causing intense vasoconstriction that reduces renal blood flow and drops GFR, directly conserving intravascular volume. Concurrently, sympathetic stimulation of beta-1 receptors on juxtaglomerular cells—amplified by reduced renal perfusion pressure and diminished NaCl delivery to the macula densa—triggers rapid, massive secretion of renin. Renin cleaves circulating angiotensinogen into angiotensin I, which pulmonary ACE cleaves into angiotensin II. Angiotensin II exerts potent systemic arteriolar vasoconstriction (raising total peripheral resistance to support coronary and cerebral perfusion), constricts efferent arterioles to preserve minimal residual filtration, and stimulates the adrenal cortex to release aldosterone. Aldosterone acts on distal tubule principal cells to maximally reclaim Na+ via ENaC channels in exchange for K+. Concurrently, high sympathetic tone and low blood volume activate hypothalamic osmoreceptors and baroreceptors, triggering copious release of antidiuretic hormone (ADH) from the posterior pituitary. ADH inserts aquaporin-2 channels into collecting ducts, driving near-total water reabsorption into the hyperosmolar medullary interstitium. Together, these systems reduce urine production to a profound oliguric trickle (<10 mL/hr) to defend arterial blood pressure and preserve vital organ perfusion.",
      "rubric": [
        "Details sympathetic afferent arteriolar vasoconstriction reducing GFR and conserving intravascular volume",
        "Traces the RAAS activation cascade from renin release to angiotensin II vasoconstriction and aldosterone-mediated Na+ reclamation",
        "Explains ADH-driven collecting duct aquaporin insertion maximizing water reabsorption and producing severe oliguria"
      ]
    }
  ],
  "commonMistakes": [
    "Believing urea is a 100% waste product that is entirely excreted; roughly 50% is passively reabsorbed in the PCT to assist in medullary osmotic cycling.",
    "Assuming the internal and external urethral sphincters are both involuntary; the internal is involuntary smooth muscle, while the external is voluntary skeletal muscle.",
    "Thinking sympathetic stimulation increases kidney filtration; sympathetic activation constricts afferent arterioles and suppresses GFR to preserve blood volume."
  ],
  "sourceRefs": [
    {
      "ref": "phys.5",
      "location": "p19 \"Sympathetic activity constricts afferent arteriole\""
    },
    {
      "ref": "phys.5",
      "location": "p34 \"The active transport of substances from the\""
    },
    {
      "ref": "phys.5",
      "location": "p37 \"Role of Aldosterone in Na\""
    },
    {
      "ref": "phys.5",
      "location": "p39 \"Is specialized region in each\""
    },
    {
      "ref": "phys.5",
      "location": "p40 \"Is activated by release of\""
    },
    {
      "ref": "phys.renal.tut",
      "location": "p1 \"The external uretheral sphincter can be controlled voluntarily.\""
    },
    {
      "ref": "phys.renal.tut",
      "location": "p1 \"absorption of ions, organic molecules, vitamins, and water.\""
    },
    {
      "ref": "phys.renal.tut",
      "location": "p2 \"passively reabsorbed in the proximal convoluted tubule.\""
    },
    {
      "ref": "phys.renal.tut",
      "location": "p2 \"shorter nephron loops\""
    },
    {
      "ref": "phys.renal.tut",
      "location": "p2 \"the regulation of glomerular blood flow and pressure.\""
    },
    {
      "ref": "phys.renal.tut",
      "location": "p2 \"the amount of water reabsorbed increases.\""
    }
  ]
},
  {
    id: 'abct2326-nervous-synaptic-refractory-neuroglia',
    subject: 'ABCT2326', unit: 'phys.nerv', type: 'concept',
    title: 'Neuroglia functions, action potential refractory periods, and synaptic storage',
    tags: ['nervous', 'neuroglia', 'action-potential', 'refractory-period', 'high-yield'],
    practice: [
      { type: 'mcq', prompt: 'Which type of neuroglia in the central nervous system is positioned between neurons and blood capillaries to help form the blood-brain barrier?', options: ['Oligodendrocytes', 'Schwann cells', 'astrocytes.', 'Microglia'], answer: 2,
        explanation: 'Astrocytes wrap perivascular end-feet around brain capillaries to induce endothelial tight junctions and form the blood-brain barrier.',
        src: { ref: 'phys.nerv.tut', location: 'p2 "astrocytes."' } },
      { type: 'mcq', prompt: 'Which neuroglial cells function as the specialized phagocytotic defense cells of the central nervous system?', options: ['microglia', 'Ependymal cells', 'Astrocytes', 'Satellite cells'], answer: 0,
        explanation: 'Microglia are the resident macrophage-like phagocytic cells of the CNS that clear cellular debris and pathogens.',
        src: { ref: 'phys.nerv.tut', location: 'p2 "microglia"' } },
      { type: 'mcq', prompt: 'During the repolarization phase of a neuronal action potential, what is the primary ion movement across the plasma membrane?', options: ['Na+ ions flowing into the cell', 'K+ ions are flowing out of the cell.', 'Ca2+ ions flowing into the cell', 'Cl- ions flowing out of the cell'], answer: 1,
        explanation: 'Opening of voltage-gated K+ channels allows K+ ions to rush out of the cell down their electrochemical gradient, restoring membrane negativity.',
        src: { ref: 'phys.nerv.tut', location: 'p2 "K+ ions are flowing out of the cell."' } },
      { type: 'mcq', prompt: 'During which timeframe of an action potential does the absolute refractory period of a neuron occur?', options: ['Only during the after-hyperpolarization phase', 'occurs during depolarization and the first part of the repolarization phase', 'Only at resting membrane potential before threshold', 'During the entire relative refractory phase'], answer: 1,
        explanation: 'The absolute refractory period spans from threshold depolarization through the first part of repolarization because voltage-gated Na+ channels are inactivated.',
        src: { ref: 'phys.nerv.tut', location: 'p2 "occurs during depolarization and the first part of the repolarization phase"' } },
      { type: 'mcq', prompt: 'Motor neurons convey electrical impulses along which directional pathway?', options: ['From peripheral sensory receptors to the CNS', 'the CNS to effectors.', 'Exclusively within ascending spinal tracts', 'From effectors to sensory ganglia'], answer: 1,
        explanation: 'Motor (efferent) neurons carry action potentials from the central nervous system to peripheral effector organs (muscles and glands).',
        src: { ref: 'phys.nerv.tut', location: 'p2 "the CNS to effectors."' } },
      { type: 'typed', prompt: 'What insulating structure wraps around axons to increase the speed of action potential propagation?', accept: ['myelin sheath', 'a myelin sheath', 'myelin', 'Myelin sheath'],
        explanation: 'A myelin sheath provides electrical insulation, enabling rapid saltatory conduction between nodes of Ranvier.',
        src: { ref: 'phys.nerv.tut', location: 'p2 "a myelin sheath"' } },
      { type: 'matching', prompt: 'Match each neural component to its physiological role.',
        pairs: [['Astrocytes', 'form part of the blood-brain barrier'], ['Microglia', 'phagocytotic cells of the CNS'], ['Synaptic vesicles', 'store neurotransmitter'], ['Myelin sheath', 'increased speed of impulse conduction']],
        explanation: 'These pairings connect neural cellular specializations to their fundamental functional contributions.',
        src: { ref: 'phys.nerv.tut', location: 'p2 "Neuroglia that are positioned between neurons and capillaries to form part of the blood-"' } },
    ],
    application: [
      { type: 'scenario', prompt: 'Explain how local anesthetics (which block voltage-gated Na+ channels) affect the generation and propagation of action potentials, detailing why sensory and motor transmission is silenced.',
        model: 'Local anesthetics (such as lidocaine) bind to the intracellular pore of voltage-gated Na+ channels, preventing their opening upon threshold depolarization. Without Na+ influx, the membrane cannot depolarize to fire an action potential. Because action potential propagation depends on local circuit currents exciting adjacent membrane patches to threshold, blocking Na+ channels arrests saltatory and continuous conduction. As a result, sensory nociceptive impulses cannot reach the CNS, and motor commands cannot travel from the CNS to effectors, producing complete temporary anesthesia and paralysis.',
        rubric: ['Identifies blockade of voltage-gated Na+ channels', 'Explains prevention of threshold depolarization and action potential firing', 'Describes interruption of impulse propagation to effectors and CNS'] },
    ],
    commonMistakes: [
      'Believing repolarization is caused by the Na+/K+ pump (repolarization is driven by rapid passive K+ efflux through voltage-gated K+ channels; the pump restores long-term gradients).',
      'Confusing microglia with astrocytes (microglia are phagocytes; astrocytes form the blood-brain barrier).',
      'Thinking the absolute refractory period only occurs during depolarization (it extends through the first part of repolarization until Na+ channel inactivation gates reset).',
    ],
    sourceRefs: [
      { ref: 'phys.nerv.tut', location: 'p1 "transmembrane potential and explain how the resting potential is"' },
      { ref: 'phys.nerv.tut', location: 'p1 "events involved in the functioning of a cholinergic synapse."' },
      { ref: 'phys.nerv.tut', location: 'p2 "Motor neurons transmit impulses from:"' },
      { ref: 'phys.nerv.tut', location: 'p2 "the CNS to effectors."' },
      { ref: 'phys.nerv.tut', location: 'p2 "Neuroglia that are positioned between neurons and capillaries to form part of the blood-"' },
      { ref: 'phys.nerv.tut', location: 'p2 "astrocytes."' },
      { ref: 'phys.nerv.tut', location: 'p2 "Synaptic vesicles store:"' },
      { ref: 'phys.nerv.tut', location: 'p2 "neurotransmitter."' },
      { ref: 'phys.nerv.tut', location: 'p2 "K+ ions are flowing out of the cell."' },
      { ref: 'phys.nerv.tut', location: 'p2 "absolute refractory period of a neuron"' },
      { ref: 'phys.nerv.tut', location: 'p2 "occurs during depolarization and the first part of the repolarization phase"' },
      { ref: 'phys.nerv.tut', location: 'p2 "Which type of cell of the CNS is phagocytotic?"' },
      { ref: 'phys.nerv.tut', location: 'p2 "microglia"' },
      { ref: 'phys.nerv.tut', location: 'p2 "speed of impulse conduction along an axon may be increased by"' },
      { ref: 'phys.nerv.tut', location: 'p2 "a myelin sheath"' },
    ],
  },
];
