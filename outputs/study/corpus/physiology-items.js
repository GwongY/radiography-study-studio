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
      "syllabusRef": {
        "ref": "edb.bio",
        "location": "Compulsory I \"Cells and Molecules of Life\" — cell structure, organelles and membrane transport."
      },
      "beyond": [
        {
          "t": "The four tissue types as a classification — epithelial, connective, muscle, neural. DSE stops at the cell and never groups them this way.",
          "src": {
            "ref": "phys.1.2026",
            "location": "p32 \"An Introduction to Tissues\""
          }
        },
        {
          "t": "The eleven organ systems the slide names: integumentary, nervous, endocrine, skeletal, muscular, circulatory, immune, respiratory, urinary, digestive, reproductive.",
          "src": {
            "ref": "phys.1.2026",
            "location": "p32 \"An Introduction to Tissues\""
          }
        },
        {
          "t": "Five characteristics of epithelium — cellularity, polarity, attachment to a basement membrane, avascularity, regeneration — and its four functions.",
          "src": {
            "ref": "phys.1.2026",
            "location": "p33 \"1. Epithelial Tissue\""
          }
        },
        {
          "t": "Epithelia classified twice over: by shape (squamous, cuboidal, columnar) and by layers (simple, stratified).",
          "src": {
            "ref": "phys.1.2026",
            "location": "p34 \"Classification of Epithelia\""
          }
        },
        {
          "t": "Glandular epithelia split by route — endocrine glands ductless into interstitial fluid, exocrine glands onto surfaces through ducts.",
          "src": {
            "ref": "phys.1.2026",
            "location": "p36 \"Classification of Epithelia (cont’d)\""
          }
        },
        {
          "t": "Connective tissue defined by its matrix — specialised cells, protein fibres, ground substance — in three classes: proper, fluid, supporting.",
          "src": {
            "ref": "phys.1.2026",
            "location": "p37–40 \"2. Connective Tissue\""
          }
        }
      ]
    },
    "lesson": {
      "explanation": "Human physiology is organized into a nested structural hierarchy spanning six distinct levels: chemical (atoms combining into macromolecules), cellular (organelles interacting within the basic functional unit of life), tissue (specialized cells working in concert), organ (two or more tissues functioning together), organ system (groups of organs cooperating to achieve systemic homeostatic tasks), and the complete organism. At the cellular level, human cells divide fundamentally into somatic cells—which comprise all diploid vegetative and structural cells of the body—and sex cells (germ cells), consisting exclusively of haploid spermatozoa in males and oocytes in females dedicated to genetic reproduction. Groups of similar cells and their extracellular products coalesce into tissues, which exhibit discrete structural and functional properties. Human tissues are categorized into four primary types: (1) Epithelial tissue, which covers exposed surfaces, lines internal cavities, and forms glands; (2) Connective tissue, which fills internal spaces, provides structural support, and transports nutrients; (3) Muscle tissue, specialized for active mechanical contraction and force generation; and (4) Neural (nervous) tissue, dedicated to conducting electrical impulses and processing information. Two or more distinct tissue types combine anatomically to form an organ (such as the heart, liver, or stomach), with each tissue contributing specific physiological capabilities to the organ's collective function. Organs are coordinated within eleven distinct organ systems: the integumentary system (dermatological protection and thermoregulation), skeletal system (support, mineral storage, hematopoiesis), muscular system (locomotion and heat production), nervous system (rapid electrical communication and integration), endocrine system (long-term metabolic regulation via hormones), cardiovascular/circulatory system (systemic transport of respiratory gases, nutrients, and waste products), lymphatic/immune system (fluid return and host pathogen defense), respiratory system (pulmonary gas exchange and sound generation), digestive system (processing and absorption of nutrients), urinary system (filtration of blood and regulation of volume, electrolyte balance, and pH), and reproductive system (production of gametes and reproductive hormones). Maintaining homeostatic equilibrium across the organism requires constant, synchronized integration across all eleven systems.",
      "plain": "The human body is structured like a Russian nesting doll: chemicals form cells, cells form tissues, tissues form organs, organs form organ systems, and organ systems create the organism. Body cells divide into somatic cells (all normal body cells) and sex cells (sperm and egg). There are only four primary tissue types in the body: epithelial, connective, muscle, and neural. When different tissues combine, they create an organ like the heart or stomach. The body coordinates eleven organ systems to keep you alive and maintain balance.",
      "keyFacts": [
        "The six structural levels: chemical, cellular, tissue, organ, organ system, and organism.",
        "Somatic cells comprise all body cells; sex (germ) cells are restricted to sperm and oocytes.",
        "The four fundamental tissue types are epithelial, connective, muscle, and neural tissue.",
        "An organ is composed of two or more distinct tissue types serving specialized functions.",
        "The eleven organ systems: integumentary, skeletal, muscular, nervous, endocrine, cardiovascular, lymphatic/immune, respiratory, digestive, urinary, and reproductive.",
        "Epithelial tissue covers external surfaces and lines internal hollow organs and passageways.",
        "Connective tissue is defined by specialized cells widely dispersed in an extracellular matrix.",
        "Muscle tissue is uniquely specialized for contraction and mechanical force generation.",
        "Neural tissue specializes in rapid conduction of electrical impulses and information processing.",
        "All eleven organ systems must integrate their activities to sustain physiological homeostasis."
      ],
      "prerequisites": [],
      "examples": [
        "The stomach is an organ containing all four tissue types: simple columnar epithelium lining the lumen, loose and dense irregular connective tissue in the submucosa, smooth muscle in the muscularis externa, and neural tissue in the myenteric plexus.",
        "Severe hypovolemic shock triggers compensatory responses across multiple organ systems: nervous (sympathetic activation), endocrine (ADH and aldosterone release), cardiovascular (tachycardia and vasoconstriction), and urinary (oliguria)."
      ]
    },
    "memory": {
      "chunking": "Hierarchy ladder: Chemical → Cellular → Tissue → Organ → System → Organism (C-C-T-O-S-O).",
      "comparison": "Somatic vs Germ: Somatic cells carry 46 chromosomes (diploid) and perform vegetative work; germ cells carry 23 chromosomes (haploid) and serve reproduction.",
      "visualCue": "Picture the stomach wall: epithelial lining on the inside, connective cushion behind it, muscular coat wrapping it, and nerve mesh regulating its contractions.",
      "teachBack": "Walk through the four tissue types and eleven organ systems out loud, naming one primary function for each system."
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
    "skills": [
      "Classify any anatomical structure into its precise structural hierarchy level.",
      "Delineate the interdependent contributions of multiple organ systems to overall systemic homeostasis."
    ],
    "selfCheck": "From memory: recite the six structural levels, the four tissue types, and all eleven organ systems.",
    "visuals": [
      {
        "fig": "cellAnatomy"
      },
      {
        "schematic": "cellOrganisation"
      },
      {
        "fig": "epithelialTissues"
      },
      {
        "gen": true
      }
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
      "syllabusRef": {
        "ref": "edb.bio",
        "location": "Compulsory III \"Homeostasis\" — concept of internal environment stability."
      },
      "beyond": [
        {
          "t": "Homeostasis defined as all body systems working together to maintain a stable internal environment in dynamic equilibrium, where opposing forces are balanced.",
          "src": {
            "ref": "phys.1.2026",
            "location": "p57 \"Homeostasis\""
          }
        },
        {
          "t": "The two mechanisms of physiological regulation: Autoregulation (intrinsic local cell/tissue response) versus Extrinsic regulation (nervous and endocrine systemic control).",
          "src": {
            "ref": "phys.1.2026",
            "location": "p58 \"Mechanisms of Regulation\""
          }
        },
        {
          "t": "The three mandatory structural components of every homeostatic control loop: Receptor (sensor), Control Centre (integration processor), and Effector (responsive cell/organ).",
          "src": {
            "ref": "phys.1.2026",
            "location": "p58 \"Mechanisms of Regulation\""
          }
        }
      ]
    },
    "lesson": {
      "explanation": "Homeostasis is the central unifying principle of human physiology, representing the capacity of the organism to maintain a relatively stable, life-sustaining internal chemical and physical environment despite profound fluctuations in the external surroundings. Homeostasis is not a static or unchanging state; rather, it represents a dynamic equilibrium—a continuous, finely tuned state of balance where opposing physiological forces and metabolic reactions are continuously monitored and adjusted to preserve variables within strict, viable limits (the normal range) around an optimal set point. When homeostatic regulatory mechanisms function effectively, the body remains in health; when homeostatic control fails or becomes overwhelmed, cellular dysfunction arises, culminating in disease or death. Physiological systems execute homeostatic regulation through two distinct mechanistic modalities: (1) Autoregulation (intrinsic regulation): an automatic, local adjustment made by a cell, tissue, or organ directly in response to an environmental change without the intervention of systemic nervous or hormonal signaling (for example, when working skeletal muscle consumes local oxygen, the resulting hypoxia and carbon dioxide accumulation cause immediate local relaxation of precapillary smooth muscle sphincters, dilating local arterioles to increase microvascular blood perfusion directly to the needy myocytes); and (2) Extrinsic regulation: systemic homeostatic adjustments coordinated across the whole body by the nervous system and endocrine system. The nervous system executes rapid, highly localized, short-term crisis adjustments through high-speed electrical nerve impulses (e.g. pulling a hand away from a hot stove or triggering acute cardiac acceleration in startle reflexes), whereas the endocrine system orchestrates slower, broader, long-term metabolic adaptations through chemical hormones secreted into the bloodstream (e.g. regulating mineral balance, blood glucose, and growth over hours, days, or months). Regardless of whether regulation is intrinsic or extrinsic, every homeostatic control system consists of three indispensable structural components: (1) Receptor (sensor): a specialized sensory receptor or cell that detects a specific physical or chemical parameter (stimulus) and measures deviations from the set point; (2) Control Centre (integration centre): an anatomical processing centre (such as a nucleus in the brain, spinal cord, or an endocrine gland) that receives afferent sensory data from the receptor, compares the incoming information against the desired set point, and determines the appropriate physiological response; and (3) Effector: a responsive cell, tissue, or organ (such as a muscle fiber or secretory gland) whose activity responds to efferent commands from the control centre, altering its functional output to either negate or reinforce the original stimulus.",
      "plain": "Homeostasis is the body's autopilot that keeps your internal environment stable and alive, even when the world outside is freezing, boiling, or starving. It is not frozen still—it is a dynamic equilibrium, like a tightrope walker constantly making micro-adjustments with a balance pole. The body regulates itself in two ways: autoregulation (local tissues fixing their own problems on the spot, like a tired muscle opening its own blood vessels) and extrinsic regulation (the big bosses stepping in: the nervous system for fast electrical emergency responses, and the endocrine system for slow, lasting hormone adjustments). Every homeostatic loop needs three players: a receptor (the thermometer that senses a change), a control centre (the thermostat brain that decides what to do), and an effector (the furnace or air conditioner that does the actual work).",
      "keyFacts": [
        "Homeostasis is the maintenance of a stable internal environment through dynamic equilibrium.",
        "Dynamic equilibrium means variables continuously oscillate within a healthy normal range around a set point.",
        "Failure of homeostatic compensation leads to cellular dysfunction, clinical disease, or death.",
        "Autoregulation (intrinsic regulation) occurs locally within a tissue without neural or hormonal commands.",
        "Extrinsic regulation is coordinated systemically by the nervous and endocrine systems.",
        "The nervous system provides rapid, short-term responses via electrical impulses.",
        "The endocrine system provides slower, sustained, long-term regulation via circulating hormones.",
        "The three loop components: Receptor (sensor), Control Centre (integrator), and Effector (responder).",
        "The receptor monitors the environment and detects changes (stimuli).",
        "The effector carries out the commands of the control centre to alter the internal variable."
      ],
      "prerequisites": [
        "abct2326-cells-organisation"
      ],
      "examples": [
        "Local exercise hyperemia is an example of autoregulation: accumulating lactic acid, adenosine, and CO2 in active skeletal muscle directly dilate local arteriolar precapillary sphincters, boosting muscle perfusion tenfold without sympathetic nerve involvement.",
        "Blood pressure maintenance involves extrinsic regulation: carotid sinus baroreceptors detect hypotension and send afferent impulses via CN IX to the medullary cardiovascular control centre, which stimulates sympathetic effectors to increase heart rate and vasoconstrict arterioles."
      ]
    },
    "memory": {
      "chunking": "Homeostasis Trio: Receptor (Senses) → Control Centre (Decides) → Effector (Acts). Regulatory split: Auto (Local) vs Extrinsic (Nervous/Endocrine).",
      "comparison": "Nervous vs Endocrine Regulation: Nervous = electrical wire, millisecond speed, short duration, specific target; Endocrine = postal mail in blood, minutes-to-days speed, prolonged duration, widespread targets.",
      "visualCue": "Picture a home heating system: thermometer on the wall (receptor), digital thermostat processor (control centre), and furnace in the basement (effector).",
      "teachBack": "Define dynamic equilibrium, contrast autoregulation with extrinsic regulation, and name the three components of a homeostatic control loop."
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
    "skills": [
      "Map any physiological feedback loop into its three constituent elements: receptor, control centre, and effector.",
      "Differentiate clinical manifestations of acute nervous regulatory failure versus chronic endocrine failure."
    ],
    "selfCheck": "Define homeostasis and dynamic equilibrium, and identify the receptor, control centre, and effector in blood glucose regulation.",
    "visuals": [
      {
        "schematic": "homeostasis"
      },
      {
        "gen": true
      }
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
      "syllabusRef": {
        "ref": "edb.bio",
        "location": "Compulsory III(b) \"Essential life processes in animals\" — \"General plan of the circulatory system and lymphatic system\"."
      },
      "beyond": [
        {
          "t": "Flow through the systemic circuit equals flow through the pulmonary circuit, because the two run in series.",
          "src": {
            "ref": "phys.2",
            "location": "p18 \"An Introduction to the Cardiovascular System\""
          }
        },
        {
          "t": "The whole route named as one recitable sequence, vena cavae through to aorta.",
          "src": {
            "ref": "phys.2",
            "location": "p20 \"Pulmonary and Systemic Circulations\""
          }
        },
        {
          "t": "Three vessel wall tunics: tunica intima with endothelium, tunica media with smooth muscle, tunica externa with connective tissue.",
          "src": {
            "ref": "phys.2",
            "location": "p11 \"Structure of Blood Vessels\""
          }
        },
        {
          "t": "Small arteries and arterioles provide the primary peripheral resistance in the circulatory system.",
          "src": {
            "ref": "phys.2",
            "location": "p13 \"Arteries\""
          }
        },
        {
          "t": "Continuous versus fenestrated capillaries and their tissue distribution.",
          "src": {
            "ref": "phys.2",
            "location": "p16 \"Types of Capillaries\""
          }
        },
        {
          "t": "Veins function as high-capacitance reservoirs operating at very low pressure (~2 mmHg), requiring skeletal muscle pump and one-way valves.",
          "src": {
            "ref": "phys.2",
            "location": "p17 \"Veins\""
          }
        }
      ]
    },
    "lesson": {
      "explanation": "The human cardiovascular system is a closed, dual-circuit circulatory network driven by a four-chambered muscular pump, the heart. The two distinct vascular loops—the pulmonary circulation and the systemic circulation—are functionally arranged in series. A foundational physiological principle of this architecture is that the volume rate of blood flow through the systemic circulation must equal the flow rate through the pulmonary circuit at steady state (~5 L/min at rest). If either side ejected more volume than the other over time, blood would rapidly and catastrophically pool either in the pulmonary vasculature (leading to fatal pulmonary edema) or in systemic venous beds. Blood travels in an unbroken, unidirectional sequence: deoxygenated systemic venous return enters the right atrium via the superior and inferior vena cavae (and coronary sinus); passes through the right atrioventricular (tricuspid) valve into the right ventricle; is pumped across the pulmonary semilunar valve into the pulmonary trunk and pulmonary arteries to the pulmonary capillaries of the lungs where CO2 is released and O2 is absorbed; oxygenated blood returns via four pulmonary veins to the left atrium; flows across the left atrioventricular (bicuspid/mitral) valve into the left ventricle; and is forcefully ejected across the aortic semilunar valve into the ascending aorta to supply all systemic organs and peripheral tissues before returning via systemic veins. Blood vessels are organized histologically into three concentric tunics: the tunica interna (intima), featuring a non-thrombogenic simple squamous endothelium, basement membrane, and internal elastic membrane; the tunica media, composed predominantly of concentric smooth muscle layers and elastic fibers; and the tunica externa (adventitia), a tough connective tissue sheath anchoring the vessel. Arteries carry blood away from the heart under high, pulsating pressure; large elastic arteries expand during ventricular systole and elastically recoil during diastole to smooth arterial pressure oscillations. Muscular arteries branch into small arterioles, which possess abundant smooth muscle and provide the primary site of peripheral vascular resistance in the circulatory system, regulating blood pressure and downstream microvascular perfusion. Capillaries consist exclusively of an endothelial cylinder resting on a basal lamina, lacking tunica media or externa to minimize diffusion distance. Capillary flow is modulated by precapillary sphincters at arteriole junctions. Continuous capillaries have tightly joined endothelial cells with narrow intercellular clefts (found in skeletal muscle, lungs, skin, and adipose tissue), whereas fenestrated capillaries feature pores or 'windows' allowing rapid exchange of water and small solutes (located in endocrine glands, intestinal villi, and renal glomeruli). Capillaries drain into venules and systemic veins that return blood to the heart. Veins have thinner walls, larger lumens, and high compliance, acting as a low-pressure (~2 mmHg) capacitance reservoir containing the majority of the body's blood volume. Because central venous pressure is insufficient on its own to drive venous return against gravity, blood is propelled toward the heart by the rhythmic contraction of surrounding skeletal muscles (the skeletal muscle pump), assisted by thoracoabdominal pressure gradients during ventilation and prevented from backward pooling by one-way bicuspid venous valves.",
      "plain": "The circulatory system consists of two loops connected in series: the pulmonary circuit (carrying deoxygenated blood from the right ventricle to the lungs and back to the left atrium) and the systemic circuit (carrying oxygenated blood from the left ventricle to all body organs and back to the right atrium). Because the two circuits are in series, the rate of blood flow through both circuits must be exactly equal. Arteries carry blood away from the heart under high pressure; small arterioles provide most of the vascular resistance. Capillaries are single-cell-thick exchange tubes (continuous in muscles and lungs, fenestrated in kidneys and intestines). Veins hold most of the body's blood volume at very low pressure (~2 mmHg) and rely on one-way valves and skeletal muscle contractions to return blood to the heart.",
      "keyFacts": [
        "The pulmonary and systemic circuits are connected in series; their steady-state flow rates must be exactly equal (~5 L/min).",
        "Deoxygenated blood returns from tissues via the superior and inferior vena cavae into the right atrium.",
        "The right ventricle pumps deoxygenated blood through pulmonary arteries into the pulmonary capillary beds.",
        "Four pulmonary veins return oxygenated blood from the lungs into the left atrium.",
        "The left ventricle pumps oxygenated blood through the aorta into the high-pressure systemic arterial tree.",
        "Blood vessel walls share three tunics: tunica interna (endothelium), tunica media (smooth muscle), and tunica externa (connective tissue).",
        "Small arteries and arterioles provide the primary peripheral vascular resistance in the systemic circulation.",
        "Capillaries consist solely of endothelium and basement membrane to maximize rapid diffusion and exchange.",
        "Continuous capillaries are tightly sealed (muscles, lungs); fenestrated capillaries possess pores for rapid solute exchange (kidneys, intestines).",
        "Veins are high-compliance capacitance vessels containing the majority of total blood volume at low pressure (~2 mmHg)."
      ],
      "prerequisites": [],
      "examples": [
        "In left ventricular heart failure, the left ventricle fails to match the output of the right ventricle, causing blood to back up into the pulmonary veins and capillaries, raising hydrostatic pressure and precipitating acute pulmonary edema.",
        "Standing motionless on parade for extended periods deprives lower extremity veins of the skeletal muscle pump, causing blood to pool in dependent capacitance veins, reducing venous return, cardiac output, and cerebral perfusion, resulting in orthostatic syncope."
      ]
    },
    "memory": {
      "chunking": "Series Circuit Route: Vena Cavae → Right Atrium → Tricuspid → Right Ventricle → Pulmonary Valve → Lungs → Pulmonary Veins → Left Atrium → Bicuspid → Left Ventricle → Aortic Valve → Aorta.",
      "comparison": "Arteries vs Veins: Arteries have thick muscular media and high pressure, carrying blood away; veins have wide lumens, thin walls, valves, and low pressure (~2 mmHg), carrying blood back and storing 60-70% of volume.",
      "visualCue": "Picture a figure-8 loop where the top loop is the pulmonary circuit and the bottom loop is the systemic circuit; squeezing one side faster than the other will immediately cause fluid to back up at the junction.",
      "teachBack": "Trace a drop of blood from the superior vena cava all the way to the aorta without looking, naming each chamber, valve, and major vessel along the route."
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
    "skills": [
      "Trace the complete anatomical sequence of blood flow through both pulmonary and systemic circuits without omission.",
      "Differentiate continuous, fenestrated, and sinusoid capillaries by histological structure, permeability, and organ locations."
    ],
    "selfCheck": "From memory: name the three tunics of a blood vessel, state the flow rate relationship between systemic and pulmonary circuits, and explain why venous return needs a skeletal muscle pump.",
    "visuals": [
      {
        "fig": "bloodVesselStructure"
      },
      {
        "schematic": "circuits"
      },
      {
        "gen": true
      }
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
      "syllabusRef": {
        "ref": "edb.bio",
        "location": "Compulsory III(b) \"Essential life processes in animals\" — the circulatory system in general plan only; the syllabus gets to heart structure through a pig-heart dissection, not through named histology."
      },
      "beyond": [
        {
          "t": "The cardiac (fibrous) skeleton: dense connective tissue encircling the valves and the bases of the pulmonary trunk and aorta, separating atria from ventricles structurally, functionally and electrically.",
          "src": {
            "ref": "phys.2",
            "location": "p30 \"cardiac (fibrous) skeleton\""
          }
        },
        {
          "t": "Three heart wall layers — epicardium (visceral pericardium), myocardium in concentric layers, endocardium of simple squamous epithelium.",
          "src": {
            "ref": "phys.2",
            "location": "p22 \"Structure of the Heart\""
          }
        },
        {
          "t": "Intercalated discs secured by desmosomes and linked by gap junctions, conveying the force of contraction and propagating action potentials.",
          "src": {
            "ref": "phys.2",
            "location": "p24 \"Intercalated discs\""
          }
        },
        {
          "t": "Characteristics of cardiac muscle cells: small size, single central nucleus, branching interconnections, and intercalated discs.",
          "src": {
            "ref": "phys.2",
            "location": "p27 \"Characteristics of Cardiac Muscle Cells\""
          }
        },
        {
          "t": "Structural differences between ventricles: right ventricle is pouch-shaped and thin-walled; left ventricle is thick-walled, round, and develops high pressure.",
          "src": {
            "ref": "phys.2",
            "location": "p31 \"Structural Differences between the Left and Right Ventricles\""
          }
        },
        {
          "t": "Papillary muscles contracting through chordae tendineae to prevent ventricular pressure everting the AV valves.",
          "src": {
            "ref": "phys.2",
            "location": "p35 \"Functions of the valves\""
          }
        }
      ]
    },
    "lesson": {
      "explanation": "The human heart is a conical muscular pump situated within the middle mediastinum, structured into four interior chambers: two superior receiving chambers (the right and left atria) that collect venous blood, and two inferior pumping chambers (the right and left ventricles) that forcefully eject blood into the great arterial trunks. The right and left sides of the heart operate as two anatomically and hemodynamically distinct pumps separated by an impermeable interatrial septum and thick interventricular septum. The heart wall comprises three distinct tissue layers: (1) the epicardium (visceral pericardium), a smooth, serous outer mesothelial and fibroelastic layer covering the cardiac exterior; (2) the myocardium, the middle muscular tunic composed of concentric, spiraling layers of cardiac muscle tissue configured to wring blood out of the ventricular cavities during systole; and (3) the endocardium, the innermost lining consisting of a continuous sheet of simple squamous epithelium resting on delicate connective tissue, directly continuous with the vascular endothelium of the great vessels. Cardiac muscle cells (cardiomyocytes) exhibit specialized histological characteristics that distinguish them from skeletal muscle: they are relatively small, typically contain a single centrally placed nucleus, show branching interconnections, and join end-to-end at specialized junctional complexes called intercalated discs. Intercalated discs perform two vital, non-negotiable physiological tasks: their mechanical component, consisting of fascia adherens and desmosomes, mechanically anchors adjacent myocytes to convey tensile force without cell separation during vigorous contraction; their electrical component, consisting of low-resistance gap junctions, permits the direct, rapid cytoplasmic passage of ions and action potentials between cells, causing the entire myocardium to function as a unified functional syncytium. Encircling the four valve orifices and the bases of the aorta and pulmonary trunk lies the cardiac (fibrous) skeleton, a robust framework of dense collagenous connective tissue. The cardiac skeleton fulfills three critical functions: it anchors the valve leaflets firmly against hemodynamic stress; it prevents excessive dilation of the valve openings under elevated systolic pressure; and it acts as a non-conductive electrical insulator completely separating atrial myocardium from ventricular myocardium, ensuring that action potentials cannot pass haphazardly across the atrioventricular boundary and can only reach the ventricles via the specialized atrioventricular conduction pathway. The two ventricles display profound morphological asymmetry matching their pressure workloads: the right ventricle develops relatively low pressure (~25 mmHg systolic) to perfuse the short, low-resistance pulmonary circuit, possessing a thin wall that wraps around the left ventricle in a crescent or pouch-like configuration; conversely, the left ventricle must generate high pressure (~120 mmHg systolic) to overcome systemic vascular resistance, possessing a wall roughly three times thicker that forms a thick, circular cylinder reaching the cardiac apex. Directional blood flow is enforced by four one-way valves that open and close passively in response to pressure gradients. The atrioventricular (AV) valves—the tricuspid valve on the right and the bicuspid (mitral) valve on the left—permit diastolic inflow from atria to ventricles. To withstand the violent upward pressure generated during ventricular systole without everting into the atria, the free edges of the AV valve cusps are tethered by fibrous chordae tendineae (tendinous cords) to muscular papillary muscles projecting from the ventricular wall; during ventricular systole, papillary muscles contract synchronously with the myocardium, exerting downward tension on the chordae tendineae to anchor the valve cusps firmly closed. The semilunar valves—the pulmonary semilunar valve guarding the pulmonary trunk and the aortic semilunar valve guarding the ascending aorta—consist of three pocket-like crescentic cusps that flatten against arterial walls during ventricular ejection and snap shut as arterial pressure exceeds falling ventricular pressure during diastole, preventing arterial regurgitation.",
      "plain": "The heart has four chambers: right and left atria that receive venous blood, and right and left ventricles that pump blood into arteries. The heart wall has three layers: outer epicardium, thick muscular myocardium, and inner endocardium made of simple squamous epithelium. Cardiac muscle cells have a single central nucleus, branch, and connect at intercalated discs—desmosomes hold them together mechanically, while gap junctions allow electrical signals to spread instantly. A dense fibrous skeleton anchors the valves and electrically insulates the atria from the ventricles. The left ventricle is round, thick-walled, and generates high pressure (~120 mmHg), while the right ventricle is pouch-shaped, thin-walled, and works at low pressure (~25 mmHg). Atrioventricular valves (tricuspid and bicuspid/mitral) are tethered by chordae tendineae to papillary muscles to prevent back-inversion during systole; semilunar valves (pulmonary and aortic) prevent backflow during diastole.",
      "keyFacts": [
        "The heart contains four chambers: two atria that receive blood from veins, and two ventricles that pump blood into arteries.",
        "The heart wall has three layers: epicardium (outer serous layer), myocardium (muscular middle layer), and endocardium (inner simple squamous epithelium).",
        "Cardiac muscle cells are small, branched, have a single central nucleus, and are joined at intercalated discs.",
        "Intercalated discs contain desmosomes (to convey mechanical force) and gap junctions (to propagate action potentials).",
        "The dense cardiac (fibrous) skeleton anchors the valves and electrically insulates atria from ventricles.",
        "The left ventricle is thick-walled, cylindrical, and generates ~120 mmHg pressure; the right ventricle is thin-walled, pouch-shaped, and generates ~25 mmHg.",
        "The tricuspid valve separates the right atrium and ventricle; the bicuspid (mitral) valve separates the left atrium and ventricle.",
        "Papillary muscles contract during ventricular systole, pulling on chordae tendineae to prevent AV valve cusp eversion.",
        "The pulmonary and aortic semilunar valves prevent backflow of blood from arterial trunks into ventricles during diastole.",
        "Cardiac valves open and close passively, driven entirely by transvalvular fluid pressure gradients."
      ],
      "prerequisites": [],
      "examples": [
        "In acute myocardial infarction involving the posterior descending artery, necrosis of the posterior papillary muscle can cause chordae tendineae rupture, leading to acute severe mitral valve prolapse and regurgitation, precipitating pulmonary edema and cardiogenic shock.",
        "Arrhythmias such as Wolff-Parkinson-White syndrome occur when an abnormal congenital muscular bypass tract (bundle of Kent) breaches the insulating fibrous cardiac skeleton, allowing electrical impulses to short-circuit between atria and ventricles."
      ]
    },
    "memory": {
      "chunking": "Valves & Chambers: Right = Tricuspid & Pulmonary (low-pressure pouch); Left = Bicuspid/Mitral & Aortic (high-pressure cylinder). RAT-LAM (Right Atrium Tricuspid, Left Atrium Mitral).",
      "comparison": "LV vs RV: Left Ventricle has 3x thicker myocardium, circular cross-section, reaches apex, pumps ~120 mmHg; Right Ventricle has thin wall, crescent/pouch cross-section, pumps ~25 mmHg.",
      "visualCue": "Picture a parachute: the valve cusp is the canopy, the chordae tendineae are the suspension lines, and the papillary muscle is the parachutist holding tight against the upward wind of systolic pressure.",
      "teachBack": "Describe the three microscopic components of an intercalated disc and explain why the fibrous skeleton must be an electrical insulator."
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
    "skills": [
      "Identify all four cardiac chambers, valves, wall layers, and fibrous structures on histological and anatomical sections.",
      "Explain the electrical and mechanical functions of intercalated discs and the cardiac fibrous skeleton in synchronizing myocardial function."
    ],
    "selfCheck": "From memory: list the three layers of the heart wall, state the structural and electrical roles of intercalated discs, and explain how papillary muscles protect AV valves during systole.",
    "visuals": [
      {
        "fig": "heartInternalAnatomy"
      },
      {
        "fig": "heart"
      },
      {
        "schematic": "circuits"
      },
      {
        "gen": true
      }
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
      "syllabusRef": {
        "ref": "edb.bio",
        "location": "Compulsory III(b) \"Essential life processes in animals\" — \"Gas exchange in humans: structure of the respiratory system\"."
      },
      "beyond": [
        {
          "t": "The five functions of the respiratory system: gas exchange surface, moving air, protecting exchange surfaces, sound production, and olfactory sensation.",
          "src": {
            "ref": "phys.3",
            "location": "p3 \"Five functions of the\""
          }
        },
        {
          "t": "Structural split into upper respiratory system (above larynx) and lower respiratory system (larynx and below).",
          "src": {
            "ref": "phys.3",
            "location": "p4 \"Organization of the respiratory system\""
          }
        },
        {
          "t": "Functional split into conducting portion (conditioning air from nasal cavity to terminal bronchioles) and respiratory portion (gas exchange).",
          "src": {
            "ref": "phys.3",
            "location": "p6 \"conducting portion\""
          }
        },
        {
          "t": "Trachea branching into primary, secondary (lobar), and tertiary (segmental) bronchi.",
          "src": {
            "ref": "phys.3",
            "location": "p7 \"Trachea\""
          }
        },
        {
          "t": "Respiratory zone architecture: respiratory bronchioles leading into alveolar ducts, alveolar sacs, and alveoli.",
          "src": {
            "ref": "phys.3",
            "location": "p8 \"Alveolus\""
          }
        },
        {
          "t": "Alveoli as air-filled pockets providing an immense surface area (~70–100 m²) for rapid gas diffusion.",
          "src": {
            "ref": "phys.3",
            "location": "p9 \"Alveoli\""
          }
        },
        {
          "t": "Type I pneumocytes forming a simple squamous diffusion epithelium versus Type II pneumocytes producing surfactant.",
          "src": {
            "ref": "phys.3",
            "location": "p10 \"type I pneumocytes\""
          },
          "supp": {
            "ref": "phys.3",
            "location": "p12 \"Type II\""
          }
        },
        {
          "t": "Pulmonary surfactant: an oily phospholipid-protein secretion that coats alveolar surfaces and reduces surface tension to prevent collapse.",
          "src": {
            "ref": "phys.3",
            "location": "p13 \"Surfactant\""
          }
        }
      ]
    },
    "lesson": {
      "explanation": "The human respiratory system fulfills five essential physiological functions: (1) providing an extensive gas exchange surface area between inhaled air and circulating pulmonary blood; (2) moving air to and from the gas exchange surfaces of the lungs (pulmonary ventilation); (3) protecting delicate respiratory surfaces from dehydration, temperature fluctuations, and environmental pathogens via the respiratory defense system; (4) producing sound vibrations for verbal communication (phonation); and (5) facilitating olfactory sensation via specialized olfactory neuroepithelium in the superior nasal cavity. Anatomically, the system is organized into the upper respiratory system (comprising the nasal cavity, paranasal sinuses, and pharynx, situated above the larynx) and the lower respiratory system (comprising the larynx, trachea, bronchi, bronchioles, and alveoli within the thoracic cavity). Functionally, the airway is partitioned into two distinct physiological divisions: the conducting portion and the respiratory portion. The conducting portion spans from the external nares to the terminal bronchioles; its specialized pseudostratified ciliated columnar epithelium, rich in goblet cells and mucous glands, conditions incoming air by filtering particulate debris, warming air to core body temperature (37°C), and humidifying it to 100% saturation. The airway progresses from the nasal cavity through the pharynx (nasopharynx, oropharynx, laryngopharynx), past the larynx and epiglottis, into the trachea. The trachea is reinforced by 15–20 C-shaped hyaline cartilage rings that prevent airway collapse during subatmospheric inspiratory pressures while accommodating esophageal distension during swallowing. At the carina (mediastinal level T5), the trachea bifurcates into the right and left primary (main) bronchi; the right primary bronchus is wider, shorter, and more vertically oriented than the left, making it the preferential pathway for aspirated foreign bodies. Within the lungs, primary bronchi branch into secondary (lobar) bronchi (three in the right lung, two in the left), tertiary (segmental) bronchi, smaller bronchioles, and non-gas-exchanging terminal bronchioles. The respiratory portion begins where terminal bronchioles branch into microscopic respiratory bronchioles, which feature scattered alveoli in their walls and open into alveolar ducts, alveolar sacs, and roughly 300 million alveoli. Alveoli are air-filled micro-cavities that provide an immense total surface area of approximately 70 to 100 square meters for gas diffusion. The alveolar epithelium is composed of two primary cell populations: (1) Type I pneumocytes (Type I alveolar cells), exceptionally thin simple squamous epithelial cells covering roughly 95% of the alveolar surface area, through which O2 and CO2 rapidly diffuse across a shared basement membrane into abutting pulmonary endothelial cells (forming an ultrathin 0.5 µm blood-air barrier); and (2) Type II pneumocytes (septal cells), scattered cuboidal cells that synthesize and secrete pulmonary surfactant. Surfactant is an oily complex of phospholipids (predominantly dipalmitoylphosphatidylcholine) and specific apoproteins that forms a monomolecular film over the moist alveolar lining, disrupting hydrogen bonding between water molecules and dramatically lowering alveolar surface tension. By lowering surface tension, surfactant prevents alveolar collapse (atelectasis) at end-expiration and equalizes collapsing pressures between smaller and larger alveoli in accordance with the Law of Laplace (P = 2T/r). Patrolling the alveolar lumen are roaming alveolar macrophages ('dust cells') that phagocytose inhaled particulate matter, pathogens, and degraded surfactant, preserving sterility at the blood-air barrier.",
      "plain": "The respiratory system performs five jobs: gas exchange, moving air, protecting airway linings, making sounds, and smelling. It divides anatomically into the upper tract (nasal cavity to pharynx) and lower tract (larynx, trachea, and lungs). Functionally, it divides into the conducting zone (which warms, filters, and humidifies air down to terminal bronchioles) and the respiratory zone (where gas exchange actually occurs in alveoli). The trachea is kept open by C-shaped cartilage rings and divides into right and left main bronchi. In the lungs, airway tubes branch down to roughly 300 million tiny air pockets called alveoli, creating a massive surface area (~70–100 m²). Alveoli contain Type I pneumocytes (paper-thin cells that form the blood-air barrier for gas diffusion) and Type II pneumocytes (which secrete surfactant, an oily substance that reduces water surface tension and stops lungs from collapsing when you exhale).",
      "keyFacts": [
        "The respiratory system provides gas exchange, air conduction, epithelial protection, phonation, and olfaction.",
        "The upper respiratory tract sits above the larynx; the lower respiratory tract includes the larynx, trachea, and lungs.",
        "The conducting zone filters, warms, and humidifies air; the respiratory zone executes alveolar gas exchange.",
        "The trachea is reinforced by 15–20 C-shaped hyaline cartilage rings that prevent airway collapse during inhalation.",
        "The right primary bronchus is shorter, wider, and more vertical than the left primary bronchus.",
        "The respiratory zone begins at respiratory bronchioles and terminates in alveolar sacs and alveoli.",
        "Roughly 300 million alveoli provide a massive gas exchange surface area of 70 to 100 square meters.",
        "Type I pneumocytes are simple squamous cells forming 95% of the alveolar blood-air diffusion barrier.",
        "Type II pneumocytes are cuboidal secretory cells that produce pulmonary surfactant.",
        "Pulmonary surfactant reduces alveolar surface tension, preventing end-expiratory alveolar collapse (atelectasis)."
      ],
      "prerequisites": [],
      "examples": [
        "In Infant Respiratory Distress Syndrome (IRDS), premature neonates born before 28–32 weeks of gestation lack mature Type II pneumocytes and cannot produce sufficient surfactant; elevated alveolar surface tension causes widespread alveolar collapse (atelectasis) and severe hypoxemia, requiring exogenous surfactant administration and positive airway pressure.",
        "Because the right primary bronchus is wider, shorter, and descends more vertically than the left, a foreign object (such as a peanut) aspirated by a toddler almost always lodges in the right bronchial tree rather than the left."
      ]
    },
    "memory": {
      "chunking": "Airway Tree Sequence: Nasal Cavity → Pharynx → Larynx → Trachea → Primary Bronchi → Lobar Bronchi → Segmental Bronchi → Bronchioles → Terminal Bronchioles [END OF CONDUCTING] → Respiratory Bronchioles → Alveolar Ducts → Alveolar Sacs [RESPIRATORY ZONE].",
      "comparison": "Type I vs Type II Pneumocytes: Type I are thin, flat squamous cells covering 95% of area for Gas Exchange; Type II are cuboidal factories producing Surfactant to reduce surface tension.",
      "visualCue": "Picture a cluster of soap bubbles: without surfactant, small bubbles generate high inward pressure and collapse into big bubbles; surfactant lines the inner water film like microscopic Teflon, keeping every tiny bubble open.",
      "teachBack": "Trace the path of an oxygen molecule from the nostril to the alveolar capillary, naming where the conducting zone ends and the respiratory zone begins, and identifying the two alveolar cell types."
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
    "skills": [
      "Delineate the precise histological and functional boundary between the conducting and respiratory zones of the human airway.",
      "Explain the biophysical role of pulmonary surfactant in alveolar stability using Laplace’s relationship."
    ],
    "selfCheck": "From memory: recite the complete airway branching sequence from trachea to alveoli, contrast Type I and Type II pneumocytes, and explain why the right primary bronchus is prone to aspiration.",
    "visuals": [
      {
        "fig": "respiratoryTractAnatomy"
      },
      {
        "fig": "alveolarMicroarchitecture"
      },
      {
        "gen": true
      }
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
    id: 'abct2326-renal-nephron',
    subject: 'ABCT2326', unit: 'phys.renal', type: 'sequence',
    title: 'Nephron tubule and the urine pathway',
    tags: ['renal', 'high-yield'],
    priorKnowledge: {
      level: 'dse-bio', covers: 'part', dsePart: 'elective-hp',
      syllabusRef: { ref: 'edb.bio', location: 'Elective V(a) "Regulation of water content (osmoregulation)" — general plan of the urinary system, nephron structure and function, ultrafiltration, reabsorption and ADH. Not in the compulsory part at all.' },
      beyond: [
        { t: 'The kidney’s internal architecture: cortex holding capillaries and outer nephrons, medulla of renal pyramids separated by renal columns, minor calyces uniting into a major calyx.',
          src: { ref: 'phys.5', location: 'Slide 5 "Structure of Kidney"' } },
        { t: 'The vascular route running alongside the tubular one — interlobular artery → afferent arteriole → glomerulus → efferent arteriole → peritubular capillaries (vasa recta) → interlobular vein.',
          src: { ref: 'phys.5', location: 'Slide 9 "Renal Blood Vessels"' } },
        { t: 'GFR as a figure: 115 ml/min in women, 125 ml/min in men, about 180 L a day, so most filtered water must be reabsorbed.',
          src: { ref: 'phys.5', location: 'Slide 17 "Glomerular Filtration Rate (GFR)"' } },
        { t: 'The countercurrent multiplier: salt pumping in the thick ascending limb builds medullary osmolality until it settles at 1400.',
          src: { ref: 'phys.5', location: 'Slide 27 "Countercurrent Multiplier System"' } },
        { t: 'The renin–angiotensin–aldosterone system, with ACE doing the angiotensin I → II conversion in the lungs.',
          src: { ref: 'phys.5', location: 'Slide 40 "Renin-Angiotensin-Aldosterone System"' } },
      ],
    },
    lesson: {
      explanation: 'The nephron is the functional unit of the kidney, responsible for forming urine, with more than one million per kidney. The tubular part begins with the glomerular capsule, transitions into the proximal convoluted tubule, then the descending and ascending limbs of the loop of Henle, then the distal convoluted tubule, and ends where it empties into a collecting duct. The glomerular capsule surrounds the glomerulus and together they form the renal corpuscle, where glomerular filtration occurs. Beyond the nephron, urine flows from the kidneys into the ureters, which empty into the bladder, and the urethra drains urine from the bladder. Inside the kidney, the cortex contains many capillaries and the outer parts of nephrons, the medulla consists of renal pyramids separated by renal columns, and a pyramid contains minor calyces which unite to form a major calyx.',
      plain: 'The nephron is the kidney’s work unit — more than a million per kidney — and it makes urine. Follow the fluid through it: glomerular capsule, proximal tubule, down and up the loop of Henle, distal tubule, then out into a collecting duct. The capsule plus the glomerulus is the renal corpuscle, where filtration happens. Beyond the nephron, urine travels ureters → bladder → urethra.',
      keyFacts: [
        'Nephron = functional unit of the kidney; >1 million per kidney.',
        'Tubule order: glomerular capsule → proximal convoluted tubule → descending limb → ascending limb → distal convoluted tubule → collecting duct.',
        'Renal corpuscle = glomerulus + glomerular (Bowman’s) capsule; the site of glomerular filtration.',
        'Gross path: kidney → ureter → bladder → urethra.',
        'Cortex holds capillaries and outer nephron parts; medulla holds renal pyramids separated by renal columns.',
        'Minor calyces unite to form a major calyx.',
        'GFR averages 115 ml/min in women and 125 ml/min in men — about 180 L/day, of which only 1–2 L is excreted.',
        'The bladder wall smooth muscle is the detrusor muscle.',
      ],
      prerequisites: ['abct2326-homeostasis'],
      examples: [],
    },
    memory: {
      sequence: 'Capsule, proximal, down, up, distal, collect. Six stops — say them as a rhythm rather than a list.',
      chunking: 'Two journeys, not one. The tubule journey is inside the nephron; the drainage journey is calyx → pelvis → ureter → bladder → urethra. Questions usually want one or the other, rarely both.',
      wordOrigin: 'Calyx is Greek for the cup of a flower — cup-shaped drains catching urine from the papilla.',
      visualCue: '180 litres filtered, 1–2 litres out. Picture ninety two-litre bottles going in and one coming out; that is why reabsorption is most of what the tubule does.',
    },
    practice: [
      { type: 'sequence', prompt: 'Order the nephron tubule from the filtration site to the collecting duct.',
        items: ['Glomerular (Bowman’s) capsule', 'Proximal convoluted tubule', 'Descending limb of the loop of Henle', 'Ascending limb of the loop of Henle', 'Distal convoluted tubule', 'Collecting duct'],
        explanation: 'This is the order given on the "Nephron Tubules" slide.' },
      { type: 'sequence', prompt: 'Order the urine drainage pathway out of the body.', items: ['Kidney', 'Ureter', 'Urinary bladder', 'Urethra'],
        explanation: 'Urine flows from the kidneys into the ureters, which empty into the bladder; the urethra drains urine from the bladder.' },
      { type: 'typed', prompt: 'What is the functional unit of the kidney?', accept: ['nephron', 'the nephron'],
        explanation: 'The nephron — responsible for forming urine, with more than a million per kidney.' },
      { type: 'cloze', prompt: 'The glomerulus and the glomerular capsule together form the ______.', accept: ['renal corpuscle'],
        explanation: 'The renal corpuscle, where glomerular filtration occurs.' },
      { type: 'cloze', prompt: 'The powerful muscle in the muscularis layer of the bladder wall is called the ______.', accept: ['detrusor', 'detrusor muscle'],
        explanation: 'Model answer: detrusor.',
        src: { ref: 'hss.revans', location: 'HSS2011 Module 3.2, Fill-in-blanks 2' } },
    ],
    application: [
      { type: 'scenario', prompt: 'About 180 L of filtrate is produced per day but only 1–2 L of urine is excreted. What does that ratio tell you about the main job of the tubule?',
        model: 'Almost all of the filtered water and solute has to be reabsorbed, so the tubule’s dominant job is reabsorption rather than filtration. The lecture makes the same point directly: most filtered water must be reabsorbed or death would follow from water lost through urination.',
        rubric: ['Calculates or states that nearly all filtrate is reabsorbed', 'Names reabsorption as the dominant tubular function'] },
    ],
    commonMistakes: [
      'Putting the distal convoluted tubule before the loop of Henle.',
      'Treating the glomerulus alone as the renal corpuscle — the corpuscle is glomerulus plus capsule.',
    ],
    skills: [
      'The renal corpuscle is glomerulus plus capsule — the capsule is half the name and half the structure. Filing "glomerulus = renal corpuscle" loses the compartment that actually catches the filtrate, and that is the exact wording of the common-mistake entry.',
      '180 litres filtered per day, 1–2 litres excreted: the ratio is itself the argument that the tubule\'s dominant job is reabsorption, not filtration. Filtration is the cheap part; keeping the water is the work.',
      'The kidney runs two journeys that questions ask separately: the tubule journey (capsule → proximal → loop → distal → collecting duct) and the drainage journey (calyx → pelvis → ureter → bladder → urethra). Mixing the two lists — a distal tubule appearing in a drainage answer — is the classic slip.',
    ],
    selfCheck: 'Write the tubule order and the drainage path side by side from memory; the classic slip is the distal tubule before the loop of Henle — check yours against the key facts.',
    sourceRefs: [{ ref: 'phys.5', location: 'Slides 4–17 structure of the urinary system, kidney, nephron, nephron tubules, glomerular filtration, GFR' }, { ref: 'hss.3.2', location: 'p6 "4-5 minor calyces are merged to form a" major calyx, and 2–3 major calyces combine to form the renal pelvis' }, { ref: 'hss.revans', location: 'HSS2011 Module 3.2 answers' }],
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
    "syllabusRef": {
      "ref": "edb.bio",
      "location": "Compulsory III(b) \"Essential life processes in animals\" — \"Nutrition in humans\": general plan of the digestive system, digestion in each part of the alimentary canal, absorption, the role of the liver and egestion."
    },
    "beyond": [
      {
        "t": "Muscular propulsion of materials into the esophagus and transport of materials to the stomach.",
        "src": {
          "ref": "phys.4",
          "location": "p2 \"Muscular propulsion of materials into\""
        }
      },
      {
        "t": "Accessory organs of the digestive system: teeth, tongue, salivary glands, liver, gallbladder, and pancreas.",
        "src": {
          "ref": "phys.4",
          "location": "p3 \"Accessory Organs of\""
        }
      },
      {
        "t": "The six fundamental functions of the digestive system: ingestion, mechanical processing, digestion, secretion, absorption, and excretion.",
        "src": {
          "ref": "phys.4",
          "location": "p4 \"Six Functions of the\""
        }
      },
      {
        "t": "Ingestion occurs when conscious food materials enter the digestive tract via the mouth.",
        "src": {
          "ref": "phys.4",
          "location": "p5 \"Ingestion\""
        }
      },
      {
        "t": "Secretion involves the release of water, acids, enzymes, buffers, and salts by epithelium and glandular organs.",
        "src": {
          "ref": "phys.4",
          "location": "p6 \"Secretion\""
        }
      },
      {
        "t": "Four major histological layers forming the digestive tract wall: mucosa, submucosa, muscularis externa, and serosa.",
        "src": {
          "ref": "phys.4",
          "location": "p7 \"Four major layers of the digestive tract\""
        }
      }
    ]
  },
  "lesson": {
    "explanation": "The human digestive system is organized into two continuous anatomical and functional components: the gastrointestinal (digestive) tract (alimentary canal) and the accessory digestive organs. The digestive tract forms an unbroken muscular tube spanning from the oral cavity to the anus, traversing the thoracic, abdominal, and pelvic cavities. The sequence of organs traversed by ingested materials consists of: (1) Oral cavity (mouth), which initiates ingestion, sensory analysis, mechanical processing via teeth and tongue, and lubrication with salivary secretions containing salivary amylase; (2) Pharynx (oropharynx and laryngopharynx), which coordinates the complex involuntary swallowing reflex (deglutition) and facilitates muscular propulsion of materials into the esophagus; (3) Esophagus, a hollow muscular tube extending posterior to the trachea through the mediastinum and esophageal hiatus of the diaphragm, responsible for rapid transport of materials to the stomach via coordinated peristaltic contractions; (4) Stomach, an expandable J-shaped organ that stores ingested food, executes vigorous mechanical breakdown via three smooth muscle layers, and performs preliminary chemical digestion of proteins using hydrochloric acid (HCl) and pepsin; (5) Small intestine (duodenum, jejunum, and ileum), the primary anatomical site where 90% of chemical digestion and nutrient absorption occurs; (6) Large intestine (cecum, ascending colon, transverse colon, descending colon, sigmoid colon, and rectum), which reabsorbs water, compacts indigestible residue into feces, and absorbs vital B-complex vitamins and vitamin K synthesized by commensal gut microbiota; and (7) Anus (anal canal), which regulates the expulsion of fecal waste via internal and external anal sphincters. Operating in close coordination with the alimentary canal are six accessory digestive organs: teeth and tongue (mechanical processing and mastication), salivary glands (parotid, submandibular, and sublingual glands producing lubricating saliva and amylase), liver (synthesizing bile, processing absorbed nutrients, and metabolizing xenobiotics), gallbladder (storing and concentrating bile until stimulated by cholecystokinin), and pancreas (exocrine acinar cells producing pancreatic juice containing digestive enzymes and bicarbonate buffers, alongside endocrine islets regulating blood glucose). The entire digestive system executes six essential physiological functions: (1) Ingestion, occurring when active solid or liquid nutrients enter the digestive tract via the oral cavity; (2) Mechanical processing, the physical crushing, tearing, and churning of ingested food by teeth, tongue, and muscular contractions to increase surface area for enzymatic attack; (3) Digestion, the enzymatic and chemical hydrolysis of complex carbohydrates, proteins, lipids, and nucleic acids into small absorbable monomer units; (4) Secretion, the active release of approximately 7 liters of water, hydrochloric acid, digestive enzymes, buffers, and bile salts by the mucosal epithelium and glandular accessory organs; (5) Absorption, the movement of organic substrates, electrolytes, vitamins, and water across the digestive epithelium into interstitial fluid, mesenteric capillaries, and central lacteals; and (6) Excretion (defecation), the progressive dehydration, compaction, and elimination of indigestible metabolic wastes and unabsorbed residues from the body.",
    "plain": "The digestive system is made of a continuous muscular tube (the digestive tract) and several helper organs (accessory organs). Ingested food follows an exact route: mouth → pharynx → esophagus → stomach → small intestine → large intestine → anus. Along the way, accessory organs—teeth, tongue, salivary glands, liver, gallbladder, and pancreas—add saliva, bile, and digestive juices without ever having food pass directly through them. The system carries out six core jobs: ingestion (putting food in the mouth), mechanical processing (chewing and churning), digestion (chemical breakdown of molecules by enzymes), secretion (releasing water, acids, and buffers), absorption (moving nutrients into the blood and lymph), and excretion (eliminating leftover solid waste as feces).",
    "keyFacts": [
      "The digestive tract route: oral cavity → pharynx → esophagus → stomach → small intestine → large intestine → anus.",
      "The six accessory digestive organs are teeth, tongue, salivary glands, liver, gallbladder, and pancreas.",
      "Accessory organs deliver secretions into the digestive tract; food never passes through their internal structures.",
      "The six core functions are ingestion, mechanical processing, digestion, secretion, absorption, and excretion.",
      "Ingestion occurs exclusively when food and liquids enter the digestive tract via the mouth.",
      "Mechanical processing crushes and shears food, increasing the surface area accessible to digestive enzymes.",
      "Digestion is the chemical and enzymatic cleavage of complex polymers into absorbable organic monomers.",
      "Secretion delivers water, acids, buffers, enzymes, and salts from epithelial glands and accessory organs.",
      "Absorption moves organic nutrients, electrolytes, vitamins, and water across the gut lining into blood or lymph.",
      "Excretion is the compaction and elimination of indigestible waste materials (feces) via defecation."
    ],
    "prerequisites": [
      "abct2326-cells-organisation"
    ],
    "examples": [
      "In severe acute pancreatitis, gallstones or alcohol abuse obstruct the hepatopancreatic ampulla; digestive proenzymes within the pancreatic acini become prematurely activated, leading to enzymatic autodigestion of pancreatic parenchyma and severe retroperitoneal inflammation.",
      "Surgical removal of the gallbladder (cholecystectomy) eliminates bile storage and concentration, meaning bile trickles continuously from the liver into the duodenum; patients must avoid high-fat meals to prevent steatorrhea (fatty diarrhea) due to reduced lipid emulsification efficiency."
    ]
  },
  "memory": {
    "firstLetter": "Tract Sequence: M-P-E-S-S-L-A ('Mouth Pleases Every Stomach Small and Large Always' = Mouth, Pharynx, Esophagus, Stomach, Small Intestine, Large Intestine, Anus).",
    "chunking": "Six Functions in Transit: Ingestion (at mouth) → Mechanical & Secretion (mouth to stomach) → Digestion & Absorption (small intestine) → Excretion (large intestine to anus).",
    "comparison": "Tract Organs vs Accessory Organs: Tract organs form the continuous lumen where food travels; accessory organs are external glands or tools that deliver secretions (saliva, bile, pancreatic juice) into the tube.",
    "teachBack": "Walk through the six functions in chronological order from a bite of food to excretion, explaining which accessory organs contribute at each station."
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
  "skills": [
    "Differentiate between digestive tract organs and accessory organs based on whether food traverses their lumen.",
    "Trace the physiological contribution of each digestive secretion (saliva, gastric juice, bile, pancreatic juice) along the tract."
  ],
  "selfCheck": "From memory: write down the seven organs of the alimentary tract in order, list the six accessory organs, and explain why the pancreas is both an endocrine and exocrine organ.",
  "visuals": [
    {
      "fig": "digestiveSystemOverview"
    },
    {
      "fig": "digestiveWallLayers"
    },
    {
      "gen": true
    }
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
    title: 'Hormones and the four modes of delivery',
    tags: ['endocrine', 'high-yield'],
    priorKnowledge: {
      level: 'dse-bio', covers: 'part', dsePart: 'core',
      syllabusRef: { ref: 'edb.bio', location: 'Compulsory III(d) "Coordination and response" — "Hormonal coordination in humans" is two lines in the syllabus: the nature of hormonal coordination and a general plan of the endocrine system. Almost everything on this item is past it.' },
      beyond: [
        { t: 'Four named classes of delivery — autocrine, paracrine, endocrine, neuroendocrine — where DSE taught only the blood-borne one.',
          src: { ref: 'phys.7', location: 'Page 5 "Classes of Hormone Delivery"' } },
        { t: 'Endocrine glands as ductless, with neurohormones secreted into blood by specialised neurons.',
          src: { ref: 'phys.7', location: 'Page 7 "Endocrine Glands"' } },
        { t: 'Target cell receptors described by three properties: specificity, high affinity, low capacity.',
          src: { ref: 'phys.7', location: 'Page 13 "Mechanisms of Hormone Action"' } },
        { t: 'Lipophilic hormones on cytoplasmic or nuclear receptors — genomic action taking at least 30 minutes — against hydrophilic hormones on surface receptors working fast through second messengers.',
          src: { ref: 'phys.7', location: 'Page 13 "Mechanisms of Hormone Action"' } },
      ],
    },
    lesson: {
      explanation: 'A hormone is a chemical that transfers information and instructions between cells. Hormones regulate growth and development, control the function of various tissues, support reproductive function and regulate metabolism. There are four classes of hormone delivery. Autocrine: the hormone feeds back on the same cell without entering blood circulation. Paracrine: it diffuses to adjacent target cells through the immediate extracellular space, with blood not directly involved. Endocrine: the most common, classical mode, where hormones are delivered to target cells by the blood circulation. Neuroendocrine: the hormone is produced and released by a neuron and delivered to targets by the bloodstream. Endocrine glands are ductless and secrete hormones into the bloodstream, where they travel to target cells containing receptor proteins for them.',
      keyFacts: [
        'Hormone = a chemical transferring information and instructions between cells.',
        'Four hormone functions: growth and development, control tissue function, support reproduction, regulate metabolism.',
        'Autocrine — same cell, no blood.',
        'Paracrine — adjacent cells through extracellular space, blood not directly involved.',
        'Endocrine — the classical mode, delivered by the blood.',
        'Neuroendocrine — produced by a neuron, delivered by the bloodstream.',
        'Endocrine glands are ductless; targets are defined by having the receptor protein.',
      ],
      prerequisites: ['abct2326-homeostasis'],
      examples: [],
    },
    memory: {
      wordOrigin: 'Auto = self, para = beside, endo = within (the bloodstream), neuro = nerve. All four names describe the route, so translating the prefix gives you the answer.',
      chunking: 'Sort by whether blood is involved: autocrine and paracrine do not use it, endocrine and neuroendocrine do.',
      comparison: 'What makes a cell a target is not proximity but having the receptor protein. A hormone in the blood reaches every cell and acts only where the receptor is.',
    },
    practice: [
      { type: 'matching', prompt: 'Match each delivery class to its route.',
        pairs: [['Autocrine', 'Feeds back on the same cell, no blood circulation'], ['Paracrine', 'Diffuses to adjacent cells through extracellular space'], ['Endocrine', 'Delivered to target cells by the blood circulation'], ['Neuroendocrine', 'Released by a neuron, delivered by the bloodstream']],
        explanation: 'These are the four classes of hormone delivery as defined in the endocrine lecture.' },
      { type: 'mcq', prompt: 'Which mode of hormone delivery does the lecture call the most common, classical mode?', options: ['Autocrine', 'Paracrine', 'Endocrine', 'Neuroendocrine'], answer: 2,
        explanation: 'Endocrine is described as the most common (classical) mode, with hormones delivered to target cells by blood circulation.' },
      { type: 'explain', prompt: 'A hormone circulates to every cell in the body. Why does it only affect some of them?',
        model: 'Because hormones act on target cells that contain receptor proteins for that hormone. Cells without the receptor are exposed to the hormone but cannot respond to it.',
        rubric: ['Names receptor proteins', 'States non-target cells lack the receptor'] },
    ],
    application: [
      { type: 'scenario', prompt: 'A signalling molecule acts on the cell that released it and never enters the blood. Which class is that, and which other class is it most easily confused with?',
        model: 'That is autocrine. It is most easily confused with paracrine, because neither uses the blood — but paracrine acts on adjacent cells through the immediate extracellular space, whereas autocrine acts back on the same cell.',
        rubric: ['Names autocrine', 'Names paracrine as the confusable', 'Gives the same-cell vs adjacent-cell discriminator'] },
    ],
    commonMistakes: [
      'Treating "endocrine" as a synonym for any hormone signalling; it is one of four specific routes.',
      'Assuming nearness determines which cells respond rather than receptor presence.',
    ],
    skills: [
      'Autocrine and paracrine are the confusable pair precisely because neither uses the blood: auto acts back on the cell that released it, para on adjacent cells through the extracellular space. The prefixes translate the routes — self versus beside.',
      'Proximity does not make a target: a blood-borne endocrine hormone reaches every cell in the body and acts only where the receptor protein sits. Being a target is a property of the cell, not of the delivery route — which is why "delivered everywhere, acts somewhere" is not a contradiction.',
      '"Endocrine" is one of four delivery classes, not a synonym for hormone signalling generally — the neuroendocrine class breaks the neat gland-versus-neuron picture by having a neuron release into the bloodstream.',
    ],
    selfCheck: 'Write the four delivery classes with a one-line route for each, then answer the target-cell question: why a hormone in the blood reaches every cell but acts on few.',
    sourceRefs: [{ ref: 'phys.7', location: 'Slides 3–7 "What is a Hormone?", "Hormone Function", "Classes of Hormone Delivery", "Endocrine Glands"' }],
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
      "syllabusRef": {
        "ref": "edb.bio",
        "location": "Compulsory III(b) \"Essential life processes in animals\" — \"Composition and functions of blood, tissue fluid and lymph\". The syllabus wants the components and what they do; it never quantifies them or dissects a vessel wall."
      },
      "beyond": [
        {
          "t": "Haematocrit as a named measurement with ranges: 36–46% in women, 41–53% in men.",
          "src": {
            "ref": "phys.2",
            "location": "p6 \"Composition of Blood\""
          }
        },
        {
          "t": "Three plasma protein classes and their jobs — albumin at 60–80% creating colloid osmotic pressure, globulins carrying lipids with gamma globulins as antibodies, fibrinogen converting to fibrin.",
          "src": {
            "ref": "phys.2",
            "location": "p7 \"Plasma\""
          }
        },
        {
          "t": "Formed elements: erythrocytes as biconcave enucleated discs containing 280 million hemoglobin molecules each; daily production of 300 billion RBCs.",
          "src": {
            "ref": "phys.2",
            "location": "p8 \"Formed Elements\""
          }
        },
        {
          "t": "Platelets as enucleated fragments of bone marrow megakaryocytes surviving 5–9 days.",
          "src": {
            "ref": "phys.2",
            "location": "p9 \"Platelets (thrombocytes)\""
          }
        },
        {
          "t": "Vessel wall architecture: tunica interna, media, externa, with capillaries consisting of endothelium alone.",
          "src": {
            "ref": "phys.2",
            "location": "p11 \"Structure of Blood Vessels\""
          }
        }
      ]
    },
    "lesson": {
      "explanation": "Blood is a specialized fluid connective tissue circulating through the cardiovascular system, comprising roughly 8% of total body weight with an average resting volume of approximately 5 liters in adults. Centrifugation of an anticoagulated blood specimen physically separates whole blood into two primary phases: the formed elements (cellular components) packed into the bottom of the tube, and the supernatant fluid phase known as plasma. The percentage of total blood volume occupied by erythrocytes (red blood cells) in a centrifuged sample defines the hematocrit (packed cell volume, PCV). Normal physiological hematocrit exhibits sexual dimorphism, measuring 36%–46% in adult females and 41%–53% in adult males, driven by androgen-stimulated erythropoietin production. Plasma constitutes ~55% of total blood volume and is a straw-colored aqueous solution consisting of roughly 91%–92% water and 7%–9% dissolved solutes, predominantly plasma proteins, electrolytes, nutrients, respiratory gases, and metabolic wastes. Plasma proteins are categorized into three major functional classes: (1) Albumins, the smallest and most abundant class (accounting for 60%–80% of all plasma proteins), synthesized exclusively by hepatocytes; albumin is the primary contributor to blood colloid osmotic (oncotic) pressure (~25 mmHg), which exerts the crucial inward osmotic pull that opposes capillary hydrostatic filtration and retains fluid within the vascular compartment, while also serving as a nonspecific carrier for hydrophobic ligands (such as free fatty acids, bilirubin, and lipophilic drugs). (2) Globulins (accounting for ~36% of plasma proteins), divided into alpha and beta globulins (which transport lipids, fat-soluble vitamins, and metal cations) and gamma globulins (immunoglobulins/antibodies, secreted by plasma cells to execute adaptive humoral immunity). (3) Fibrinogen (roughly 4% of plasma proteins), a soluble high-molecular-weight clotting factor that is cleaved by thrombin into insoluble fibrin strands during coagulation to form the fibrous mesh of a blood clot. When whole blood is allowed to clot before centrifugation, the resulting fluid supernatant—depleted of fibrinogen and consumed clotting factors—is termed serum (serum = plasma minus clotting factors). The formed elements comprise three discrete lineages: erythrocytes, leukocytes (white blood cells), and platelets (thrombocytes). Erythrocytes (RBCs) constitute >99% of formed elements; mature human RBCs are highly specialized flattened biconcave discs (~7.8 µm diameter, ~2 µm edge thickness) that lack nuclei, mitochondria, and ribosomes. This biconcave geometry provides an exceptionally high surface-area-to-volume ratio that accelerates rapid gas diffusion and confers remarkable mechanical deformability to squeeze through 4–5 µm capillary lumens. Each single erythrocyte contains approximately 280 million hemoglobin molecules, each capable of binding four oxygen molecules. To replace aged, senescent erythrocytes degraded by splenic macrophages after their 120-day lifespan, bone marrow hematopoiesis produces approximately 300 billion new erythrocytes each day. Leukocytes execute host defense and immune surveillance. Platelets are not true cells but small, enucleated membrane-bound cytoplasmic fragments (2–4 µm) shed into the sinusoidal circulation by giant polyploid megakaryocytes in the bone marrow; surviving approximately 5 to 9 days in the bloodstream, platelets contain secretory granules rich in clotting mediators, adhering to exposed subendothelial collagen to form the primary hemostatic plug that initiates coagulation. Histologically, blood is contained within vessels lined by simple squamous endothelium, resting on a basement membrane in capillaries, and wrapped by muscular (tunica media) and connective (tunica externa) coats in larger vessels.",
      "plain": "Blood is a fluid connective tissue made of liquid plasma (~55%) and formed elements (~45%). Total blood volume is about 5 liters. Centrifuging blood yields the hematocrit (the percentage of red blood cells: 36–46% in women, 41–53% in men). Plasma is 90%+ water and 7–9% proteins: albumin (60–80%, which creates colloid osmotic pressure to keep fluid inside blood vessels), globulins (transport lipids; gamma globulins are antibodies), and fibrinogen (clotting protein converted to fibrin). Serum is plasma without clotting factors. Formed elements include red blood cells (flattened biconcave discs lacking nuclei and mitochondria, with 280 million hemoglobin molecules each; 300 billion made daily), white blood cells (immune defense), and platelets (enucleated fragments of bone marrow megakaryocytes that live 5–9 days and form blood clots).",
      "keyFacts": [
        "Total blood volume in a healthy adult is approximately 5 liters (~8% of total body weight).",
        "Hematocrit is the volume percentage of red blood cells: 36–46% in women and 41–53% in men.",
        "Plasma comprises water, dissolved electrolytes, metabolites, and 7–9% plasma proteins.",
        "Albumin makes up 60–80% of plasma proteins, creating colloid osmotic pressure to maintain blood volume and pressure.",
        "Globulins transport lipids; gamma globulins are antibodies produced by plasma cells.",
        "Fibrinogen is a soluble clotting factor converted to insoluble fibrin strands during blood coagulation.",
        "Serum is the remaining fluid phase after blood has clotted (plasma minus clotting factors).",
        "Erythrocytes are enucleated biconcave discs; each carries ~280 million hemoglobin molecules.",
        "The body produces approximately 300 billion new red blood cells every day via erythropoiesis.",
        "Platelets are enucleated fragments of bone marrow megakaryocytes that survive 5–9 days and mediate clotting."
      ],
      "prerequisites": [],
      "examples": [
        "In severe hepatic cirrhosis, impaired liver synthesis of albumin leads to profound hypoalbuminemia; reduced plasma colloid osmotic pressure allows excessive fluid filtration into peritoneal and tissue spaces, presenting clinically as ascites and generalized pitting edema.",
        "In polycythemia vera or severe dehydration, an abnormally elevated hematocrit (>55%) drastically increases blood viscosity, raising systemic vascular resistance and the cardiac workload while predisposing the patient to venous and arterial thrombosis."
      ]
    },
    "memory": {
      "chunking": "Plasma Proteins 3-Fold: Albumin (60-80% Osmotic/Volume) → Globulins (Lipids/Antibodies) → Fibrinogen (Clotting/Fibrin).",
      "comparison": "Plasma vs Serum: Plasma contains all clotting factors and fibrinogen (fluid from anticoagulated blood); Serum is the liquid remaining AFTER blood clots (Serum = Plasma - Fibrinogen).",
      "visualCue": "Picture a centrifuged capillary tube: clear yellow plasma on top (55%), a thin white buffy coat of leukocytes and platelets in the middle (<1%), and dark packed red cells at the bottom (hematocrit ~45%).",
      "teachBack": "Explain why red blood cells lack mitochondria and how that relates to their primary function of oxygen transport."
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
    "skills": [
      "Interpret a centrifuged hematocrit tube and calculate red cell, buffy coat, and plasma fractions.",
      "Explain the Starling equilibrium at the capillary bed and evaluate how changes in plasma protein concentration alter fluid distribution."
    ],
    "selfCheck": "From memory: state the normal hematocrit ranges for males and females, name the three plasma protein classes with their functions, and distinguish plasma from serum.",
    "visuals": [
      {
        "fig": "bloodVesselStructure"
      },
      {
        "schematic": "bloodComposition"
      },
      {
        "gen": true
      }
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
    lesson: {
      explanation: 'The lymphatic system picks up excess fluid filtered out in capillary beds and returns it to the veins, and its lymph nodes are part of the immune system. MALT — mucosa-associated lymphoid tissue — describes clusters of lymphoid nodules located in the mucosa layer of organs. The cisterna chyli is the expanded, sac-like chamber at the base of the thoracic duct, and lymph drainage is asymmetric: not everything drains into the left lymphatic duct.',
      keyFacts: [
        'The lymphatic system returns excess capillary filtrate to the veins; lymph nodes are part of the immune system.',
        'MALT clusters sit in the mucosa layer.',
        'The cisterna chyli is an expanded sac-like chamber at the base of the thoracic duct.',
        'Lymph drainage is not symmetrical — the right upper body drains separately from the rest.',
      ],
      prerequisites: ['abct2326-blood-composition'],
      examples: [],
    },
    memory: {
      wordOrigin: 'MALT spells out its own location: Mucosa-Associated Lymphoid Tissue. The first word is the answer.',
      location: 'Lymphoid tissue guards doorways. Mucosa is the layer facing the lumen — the doorway — so that is where the guards stand.',
    },
    practice: [
      { type: 'mcq', prompt: 'MALT describes clusters of lymphoid nodules located at which tissue layer of organs?', options: ['Mucosa', 'Submucosa', 'Muscularis externa', 'Serosa'], answer: 0,
        explanation: 'Model answer A. The name itself says mucosa-associated lymphoid tissue.',
        src: { ref: 'hss.revans', location: 'HSS2011 Module 1.2, MCQ 5' } },
      { type: 'cloze', prompt: '______ is an expanded, sac-like chamber located at the base of the thoracic duct.', accept: ['cisterna chyli', 'the cisterna chyli'],
        explanation: 'Model answer: cisterna chyli.',
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
    skills: [
      'Lymph drainage is the asymmetry trap: the right arm does not drain into the left (thoracic) duct — the right upper body runs its own separate route while everything else converges on the left. Symmetry is the assumption; the exception is the examinable fact.',
      'MALT spells its own address: Mucosa-Associated Lymphoid Tissue. The guards stand in the layer facing the lumen because the mucosa is the doorway — the name is a location, not an acronym to expand and forget.',
    ],
    selfCheck: 'From a blank page, answer the two exam anchors: which tissue layer MALT sits in, and which part of the body does not drain into the left lymphatic duct.',
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
      beyond: [
        { t: 'The PNS split into somatic and autonomic, and the autonomic again into sympathetic and parasympathetic. DSE names the three neurone types but never this branching of the PNS.',
          src: { ref: 'phys.8', location: 'Page 8 "Peripheral Nervous System (PNS)"' } },
        { t: 'Motor neurons sorted by what they innervate: somatic ones to skeletal muscle for reflexes and voluntary control, autonomic ones to smooth muscle, cardiac muscle and glands.',
          src: { ref: 'phys.8', location: 'Page 8 "Peripheral Nervous System (PNS)"' } },
        { t: 'The scale figures: almost 97% of the body’s neural tissue in the adult brain, about 100 billion neurons and 1,000 billion neuroglia.',
          src: { ref: 'phys.8', location: 'Page 4 "Central Nervous System"' } },
      ],
    },
    lesson: {
      explanation: 'The nervous system provides information from the outside world — light, sounds, taste, touch — and keeps the body in a homeostatic condition, letting the brain know what is happening in the rest of the body. It divides into the central nervous system, the brain and spinal cord, and the peripheral nervous system, which subdivides into the somatic and autonomic nervous systems. Neurons come in three classes: sensory neurons conduct impulses from sensory receptors to the CNS; motor neurons conduct impulses from the CNS to target organs, muscles or glands; and association neurons, or interneurons, lie completely within the CNS and integrate the functions of the nervous system. Motor neurons split further: somatic motor neurons are responsible for reflexes and voluntary control of skeletal muscle, while autonomic motor neurons innervate involuntary targets such as smooth muscle, cardiac muscle and glands, through sympathetic and parasympathetic divisions.',
      keyFacts: [
        'CNS = brain + spinal cord. PNS = somatic + autonomic nervous systems.',
        'Sensory neurons: receptors → CNS.',
        'Motor neurons: CNS → target organs (muscles or glands).',
        'Association neurons / interneurons: entirely within the CNS, integrating function.',
        'Somatic motor neurons: reflexes and voluntary control of skeletal muscle.',
        'Autonomic motor neurons: smooth muscle, cardiac muscle and glands, via sympathetic and parasympathetic divisions.',
        'The adult brain holds almost 97% of the body’s neural tissue, about 100 billion neurons and 1,000 billion neuroglia.',
      ],
      prerequisites: ['abct2326-homeostasis'],
      examples: [],
    },
    memory: {
      chunking: 'Two questions sort any neuron: which way is the traffic going, and does it ever leave the CNS? Sensory in, motor out, interneuron stays put.',
      wordOrigin: 'Afferent arrives, efferent exits — the a and the e tell you the direction, and sensory fibres are afferent, motor fibres efferent.',
      comparison: 'Somatic motor neurons reach skeletal muscle you can command. Autonomic motor neurons reach the muscle and glands you cannot. Same output side, different level of control.',
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
    skills: [
      'Afferent arrives, efferent exits — one letter is the whole direction: sensory fibres are afferent (toward the CNS), motor fibres efferent (away). The fill-in-blank turns on that single vowel.',
      'Interneurons are the class that never leaves the CNS — "association" sounds peripheral and is not. And the autonomic system is not a third division beside CNS and PNS: it is one of the PNS\'s two subdivisions, itself split into sympathetic and parasympathetic.',
      'Somatic versus autonomic motor neurons differ by level of control, not by tissue type in general: somatic reaches skeletal muscle for reflexes and voluntary command, autonomic reaches smooth muscle, cardiac muscle and glands — the same output side of the CNS, two different bosses.',
    ],
    selfCheck: 'From memory, name the three neuron classes with their directions, then say which motor class reaches skeletal muscle and which reaches smooth muscle, cardiac muscle and glands.',
    sourceRefs: [{ ref: 'phys.8', location: 'Slides 2–8 what the nervous system is, its divisions, classification of neurons, PNS' }, { ref: 'hss.revans', location: 'HSS2011 Module 2.1, Fill-in-blanks 4' }],
  },
  {
    id: 'abct2326-muscle-types',
    subject: 'ABCT2326', unit: 'phys.msk', type: 'comparison',
    title: 'Three muscle tissue types and the four properties',
    tags: ['musculoskeletal', 'high-yield'],
    priorKnowledge: {
      level: 'dse-bio', covers: 'part', dsePart: 'core',
      syllabusRef: { ref: 'edb.bio', location: 'Compulsory III(d) "Coordination and response" — "Movement in humans" lists skeleton, muscles, joints, tendons and ligaments and the action of opposing muscle pairs. No histology, and no muscle tissue types.' },
      beyond: [
        { t: 'The four named properties: contractility, excitability, extensibility, elasticity.',
          src: { ref: 'phys.9', location: 'Slide 5 "4 Properties of Muscle"' } },
        { t: 'Three muscle tissue types told apart histologically — nucleus number and position, striation, intercalated discs, gap junctions in visceral smooth muscle — rather than by where they sit.',
          src: { ref: 'phys.9', location: 'Slide 6 "Classification of 3 Muscle Tissue Types"' } },
        { t: 'Voluntary defined as directed by thought through the nervous system, involuntary as directed by the autonomic nervous system.',
          src: { ref: 'phys.9', location: 'Slide 7 "Classification of muscle"' } },
        { t: 'The sarcomere between two Z discs, with M lines anchoring myosin and titin supplying the elastic recoil.',
          src: { ref: 'phys.9', location: 'Slide 18 "Sarcomeres"' } },
      ],
    },
    lesson: {
      explanation: 'Muscle has four properties: contractility, the ability to shorten with force; excitability, the capacity to respond to a stimulus; extensibility, the ability to be stretched to normal resting length and beyond to a limited degree; and elasticity, the ability to recoil to the original resting length after being stretched. There are three muscle tissue types. Skeletal muscle attaches to bones, has multiple peripherally located nuclei, is striated, and is voluntary as well as involuntary in reflexes. Smooth muscle lies in the walls of hollow organs, blood vessels, the eye, glands and skin, has a single centrally located nucleus, is not striated, is involuntary and has gap junctions in visceral smooth muscle. Cardiac muscle is in the heart, has a single centrally located nucleus, is striated, is involuntary and has intercalated discs. Voluntary muscles are directed by thought via the nervous system; involuntary muscles are directed by the autonomic nervous system. Skeletal muscle makes up about 40% of body weight in males and about 32% in females.',
      keyFacts: [
        'Four properties: contractility, excitability, extensibility, elasticity.',
        'Skeletal: on bones, multiple peripheral nuclei, striated, voluntary (and reflex).',
        'Smooth: hollow organ walls, single central nucleus, not striated, involuntary, gap junctions in visceral smooth muscle.',
        'Cardiac: heart, single central nucleus, striated, involuntary, intercalated discs.',
        'Sarcomeres are the contractile units of skeletal muscle, between two Z discs.',
        'The sarcoplasmic reticulum stores Ca2+.',
        'Skeletal muscle is about 40% of body weight in males, 32% in females.',
      ],
      prerequisites: ['abct2326-cells-organisation'],
      examples: [],
    },
    memory: {
      chunking: 'Three tissues, three questions: striated or not, one nucleus or many, under your control or not. Cardiac is the hybrid — striated like skeletal, involuntary like smooth.',
      firstLetter: 'Four properties: Contractility, Excitability, Extensibility, Elasticity — the two E-x words are stretch, the two others are shorten and respond.',
      comparison: 'Intercalated discs are cardiac only. Multiple peripheral nuclei are skeletal only. Either feature alone identifies the tissue.',
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
    skills: [
      'Striated does not mean voluntary — cardiac muscle is striated and involuntary, so striation is a texture feature and control is a separate axis. The three types come apart on two structural axes (striation, nucleus number and position) plus one functional axis (control).',
      'Two features are each alone decisive: intercalated discs occur only in cardiac muscle, multiple peripherally located nuclei only in skeletal. Either sighting identifies the tissue with no further evidence needed — which is how the striated-cell-with-one-central-nucleus question resolves to cardiac.',
      'Extensibility and elasticity are the stretch pair told apart by which half of the stretch: extensibility is the ability to be stretched, elasticity the ability to recoil to resting length afterwards.',
    ],
    selfCheck: 'Build the three-column table from memory — striated?, nucleus, control — and add the giveaway feature for cardiac and smooth; check it against the key facts.',
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
      beyond: [
        { t: 'Origin and insertion as named attachments — insertion on the bone that moves, distal; origin on the bone that does not, closer to the body.',
          src: { ref: 'phys.9', location: 'Slide 10 "Skeletal Muscle Action"' } },
        { t: 'Agonist and antagonist as roles that swap with the direction of movement, not fixed labels for particular muscles.',
          src: { ref: 'phys.9', location: 'Slide 11 "Skeletal Muscles"' } },
        { t: 'The motor unit — one motor neuron and every fibre it innervates, all of which contract together.',
          src: { ref: 'phys.9', location: 'Slide 42 "Motor Unit"' } },
        { t: 'Control against strength as a stated trade-off: eye muscles run about 20 fibres per motor unit, large muscles thousands.',
          src: { ref: 'phys.9', location: 'Slide 43 "Motor Unit"' } },
      ],
    },
    lesson: {
      explanation: 'When a muscle contracts it shortens, placing tension on the tendons connecting it to bone and moving the bone at a joint. The bone that moves is attached at the muscle insertion, which is distal to the body; the muscle is attached at its origin to a bone that does not move, closer to the body. Flexor muscles decrease the angle between two bones at a joint and extensor muscles increase it. The main muscle responsible for movement in a given direction is the agonist — the one that is contracting — and flexors and extensors that work together are antagonists. The greater the number of muscle fibres in each motor unit, the less precise the control will be.',
      keyFacts: [
        'Insertion = the attachment on the bone that moves, distal to the body.',
        'Origin = the attachment on the bone that does not move, closer to the body.',
        'Flexor decreases the joint angle; extensor increases it.',
        'Agonist = the main muscle producing the movement, the one contracting.',
        'Antagonist = the opposing muscle; flexors and extensors are antagonists to each other.',
        'More fibres per motor unit means less precise control.',
      ],
      prerequisites: ['abct2326-muscle-types'],
      examples: [],
    },
    memory: {
      location: 'Origin is where the movement originates from — the anchor. Insertion is where the force is inserted into the moving bone. Anchor is proximal, target is distal.',
      comparison: 'Agonist and antagonist are roles, not names. The same muscle is agonist for one movement and antagonist for the opposite one.',
      chunking: 'Few fibres per motor unit means fine control — think of the muscles moving your eye or your fingers versus the ones moving your thigh.',
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
    skills: [
      'Agonist and antagonist are roles, not names: biceps brachii is the agonist during flexion and the antagonist during extension, and the labels swap with the movement. No muscle owns either title.',
      'One question settles origin against insertion — which bone moves? The insertion is on the moving bone, distal; the origin on the still one, closer to the body. Anchor versus target, and the direction of pull runs from anchor to target.',
      'Motor-unit size is the precision-versus-power trade-off made flesh: eye muscles run about 20 fibres per motor unit for fine control, large muscles run thousands for force. More fibres per unit means each recruitment step is coarser.',
    ],
    selfCheck: 'Using biceps and triceps: state who is agonist in flexion and in extension, and which biceps attachment is the insertion — the moving-bone rule decides.',
    sourceRefs: [{ ref: 'phys.9', location: 'Slides 10–11 skeletal muscle action, flexors and extensors, agonist and antagonist' }, { ref: 'hss.4.3', location: 'Biceps brachii and triceps brachii actions' }, { ref: 'hss.revans', location: 'HSS2011 Module 4.1, MCQ 6' }],
  },
  {
    id: 'abct2326-innate-adaptive',
    subject: 'ABCT2326', unit: 'phys.imm', type: 'comparison',
    title: 'Innate vs adaptive immunity and the seven innate categories',
    tags: ['immune', 'high-yield'],
    priorKnowledge: {
      level: 'dse-bio', covers: 'part', dsePart: 'core',
      syllabusRef: { ref: 'edb.bio', location: 'Compulsory IV(c) "Body defence mechanisms" — non-specific defence is listed as skin, mucus, cilia, phagocytes, blood clotting and inflammatory responses. Interferons, complement and NK cells are not in the syllabus.' },
      beyond: [
        { t: 'The seven named categories of innate immunity, in the lecture’s own order — DSE lists six examples loosely; this is a numbered set you can be asked to reproduce.',
          src: { ref: 'phys.10', location: 'Slide 6 "7 Major Categories of Innate Immunity"' } },
        { t: 'Microphages (neutrophils, eosinophils) against macrophages from monocytes, which together make up the monocyte–macrophage (reticuloendothelial) system.',
          src: { ref: 'phys.10', location: 'Slide 13 "2. Two Classes of Phagocytes"' } },
        { t: 'Fixed macrophages (histiocytes) against free macrophages, with the named examples: microglia in the CNS, Kupffer cells in liver sinusoids, alveolar dust cells.',
          src: { ref: 'phys.10', location: 'Slides 15–16 "Two Types of Macrophages", "Examples of Fixed and Free Macrophages"' } },
        { t: 'How innate immunity is switched on at all: PAMPs on pathogens read by toll-like receptors, one class of pattern-recognition receptor, ten of them identified.',
          src: { ref: 'phys.10', location: 'Slide 18 "Activation of Innate Immunity"' } },
        { t: 'Interferons as protein cytokines released by activated lymphocytes and macrophages, triggering antiviral proteins that interfere with replication rather than killing virus.',
          src: { ref: 'phys.10', location: 'Slide 25 "5. Interferons"' } },
      ],
    },
    lesson: {
      explanation: 'Innate, or nonspecific, immunity always works the same way against any type of invading agent — nonspecific resistance you are born with. Adaptive, or specific, immunity protects against specific pathogens, depends on the activities of lymphocytes, and develops after exposure to hazardous microbes in the environment. Innate immunity has seven major categories: physical barriers, phagocytes, immune surveillance, interferons, complement, the inflammatory response and fever. Physical barriers keep pathogens outside. Phagocytes attack and remove dangerous microorganisms, and come in two classes — microphages, which are neutrophils and eosinophils that leave the bloodstream to enter peripheral tissues, and macrophages, large phagocytic cells derived from monocytes. Immune surveillance is carried out by natural killer cells, which form perforin vesicles and release perforins that lyse the abnormal plasma membrane, also attacking cancer cells and virus-infected cells. Interferons are chemical messengers that trigger production of antiviral proteins in normal cells; the antiviral proteins do not kill viruses but block replication in neighbouring cells. Complement is a system of circulating proteins amplifying in a cascade and assisting antibodies in destroying pathogens. The inflammatory response is a localised tissue-level response limiting the spread of injury or infection. Fever increases metabolism, accelerates defences and inhibits some viruses and bacteria.',
      keyFacts: [
        'Innate = nonspecific, same response to any agent, present from birth.',
        'Adaptive = specific, depends on lymphocytes, develops after exposure.',
        'Seven innate categories: physical barriers, phagocytes, immune surveillance, interferons, complement, inflammatory response, fever.',
        'Microphages = neutrophils and eosinophils. Macrophages derive from monocytes.',
        'Fixed macrophages (histiocytes) include microglia in the CNS and Kupffer cells in liver sinusoids; alveolar macrophages are free macrophages.',
        'NK cells release perforins that lyse the abnormal plasma membrane.',
        'Interferons trigger antiviral proteins that block replication rather than killing viruses.',
        'Innate activation: pathogens carry PAMPs, recognised by toll-like receptors, a class of pattern-recognition receptor.',
      ],
      prerequisites: ['abct2326-blood-composition'],
      examples: [],
    },
    memory: {
      firstLetter: 'Seven innate categories: Barriers, Phagocytes, Surveillance, Interferons, Complement, Inflammation, Fever.',
      comparison: 'Innate is a smoke alarm — same sound for any fire, no memory. Adaptive is a witness who recognises a specific face and remembers it next time.',
      chunking: 'Micro- and macro-phage are sorted by size and origin, not by importance: microphages are neutrophils and eosinophils, macrophages come from monocytes.',
      wordOrigin: 'Perforin perforates. Interferon interferes with viral replication — both names are the mechanism.',
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
    skills: [
      'Interferons do not kill viruses — they trigger antiviral proteins that block replication in neighbouring cells. Killing membranes is the NK cell\'s perforin job; interfering with replication is the interferon\'s. Both names are their mechanisms, and swapping them swaps the answers.',
      'NK cells are lymphocytes by lineage and innate by function: the lecture files them under immune surveillance, so "lymphocyte" does not mean adaptive. The innate/adaptive boundary is drawn at specific-and-learned, not at cell type.',
      'Microphage versus macrophage is size and origin, not seniority: microphages are neutrophils and eosinophils leaving the bloodstream; macrophages derive from monocytes and come fixed (microglia in the CNS, Kupffer cells in liver sinusoids) or free (alveolar).',
    ],
    selfCheck: 'Cover the card, write the seven categories, then answer the two traps: what interferons actually do to viruses, and which arm NK cells belong to.',
    sourceRefs: [{ ref: 'phys.10', location: 'Slides 5–21 defense mechanisms, seven innate categories, phagocytes, macrophage types, immunological surveillance' }],
  },
  {
    id: 'abct2326-endocrine-receptors',
    subject: 'ABCT2326', unit: 'phys.endo', type: 'definition',
    title: 'The hormone receptor, and why cells change how many they have',
    tags: ['endocrine', 'high-yield'],
    priorKnowledge: {
      level: 'dse-bio', covers: 'part', dsePart: 'core',
      syllabusRef: { ref: 'edb.bio', location: 'Compulsory III(d) "Coordination and response" — the syllabus asks for the nature of hormonal coordination and a general plan of the endocrine system. That a hormone acts on specific target cells is DSE; receptor occupancy, the response ceiling and up/downregulation are past it.' },
      beyond: [
        { t: 'The receptor as a signal transducer — an extracellular hormonal signal converted into an intracellular one.',
          src: { ref: 'phys.hormech', location: 'p2 "MECHANISM OF HORMONE ACTION — Receptors"' } },
        { t: 'Response magnitude set by the NUMBER of receptors occupied, with a ceiling once all are occupied.',
          src: { ref: 'phys.hormech', location: 'p2 "The magnitude of biological response depends on a number of receptors occupied"' } },
        { t: 'Up- and downregulation as the cell’s own adjustment to hormone concentration in the blood.',
          src: { ref: 'phys.hormech', location: 'p2 "downregulation" / "upregulation"' } },
      ],
    },
    lesson: {
      explanation: 'A receptor is a three-dimensional protein molecule, either inside the cell or in the plasma membrane, that specifically recognises and binds one particular hormone. Binding starts a sequence of events that produces a biological response. The binding itself involves only weak chemical forces and is reversible, and when the hormone is bound the receptor’s three-dimensional conformation is altered. The effect appears only while hormone is bound, which is why the receptor is described as a signal transducer: it converts an extracellular hormonal signal into an intracellular one. How big the response is depends on how many receptors are occupied — so once every receptor is occupied, no greater response can be achieved however much more hormone arrives. Surface receptors are in constant turnover: the cell makes new ones and inserts them into the membrane, while receptors that have reacted are broken down or recycled. That turnover lets the cell answer back. If the hormone concentration in the blood rises, the cell may reduce the number of receptors in its membrane to hold the level of hormonal interaction steady — downregulation. If the concentration falls, upregulation increases the number of receptors.',
      keyFacts: [
        'Receptor = a 3-D protein, in the membrane or inside the cell, that binds one particular hormone.',
        'Binding uses weak chemical forces and is reversible; the receptor’s conformation changes when bound.',
        'The receptor is a signal transducer: extracellular hormonal signal → intracellular signal.',
        'Response magnitude depends on the NUMBER of receptors occupied.',
        'All receptors occupied = ceiling. No greater response is possible.',
        'Receptors are in constant turnover — made, inserted, broken down or recycled.',
        'Downregulation: blood hormone rises → fewer receptors, holding interaction steady.',
        'Upregulation: blood hormone falls → more receptors.',
      ],
      prerequisites: ['abct2326-endocrine-delivery'],
      examples: [],
    },
    memory: {
      wordOrigin: 'Down and up describe the receptor count, not the hormone. Downregulation happens when hormone is HIGH — the direction in the name is the cell’s response, which is the opposite of the stimulus.',
      chunking: 'Three facts about binding (weak, reversible, changes shape), then one about magnitude (how many occupied), then one about turnover (which is what makes regulation possible).',
      comparison: 'Compare with the delivery item: what makes a cell a target is HAVING the receptor; what sets how strongly it responds is HOW MANY are occupied.',
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
    skills: [
      'Downregulation happens when the hormone is HIGH: the direction in the name is the cell\'s response, which runs opposite to the stimulus. Hormone up → receptors down; hormone low → receptors up. Reading "down" as the hormone\'s direction is exactly how the MCQ gets you.',
      'Response magnitude is set by how many receptors are occupied, so doubling the dose does nothing once every receptor is occupied — the ceiling is a receptor count, not a hormone supply. That is why the dose–response curve flattens.',
      'Constant receptor turnover is not housekeeping: it is the mechanism that lets the cell change its own sensitivity. If receptors were permanent, up- and downregulation would be impossible — the count has to be spendable before it can be adjustable.',
    ],
    selfCheck: 'Without the card: define a receptor in one line, say what sets response magnitude, and give the two regulation directions with their triggers.',
    sourceRefs: [{ ref: 'phys.hormech', location: 'p2 "MECHANISM OF HORMONE ACTION — Receptors", downregulation and upregulation' }],
  },
  {
    id: 'abct2326-endocrine-second-messengers',
    subject: 'ABCT2326', unit: 'phys.endo', type: 'comparison',
    title: 'Water-soluble against lipid-soluble: two routes into the cell',
    tags: ['endocrine', 'high-yield'],
    /*
     * No priorKnowledge block on purpose. The schema allows covers: most|part,
     * and neither is true here — DSE Biology carries nothing on second
     * messengers or genomic hormone action, so claiming it covers "part" would
     * be a false statement about the syllabus in a corpus whose first rule is
     * not making those. An absent block says "new material" honestly.
     */
    lesson: {
      explanation: 'Which route a hormone takes is decided by whether it dissolves in the lipid of the plasma membrane. Hydrophilic hormones — the amine and peptide hormones — cannot penetrate that lipid layer, so they bind receptors on the outside and generate an intracellular signal, the second messenger, which changes the activity of proteins already present in the cell. The source names three such systems. In the adenylate cyclase–cAMP system a hormone binds a beta receptor; that activates a G protein whose alpha subunit detaches and stimulates adenylate cyclase on the inner membrane surface; the enzyme converts ATP to cyclic AMP; cAMP activates protein kinase A, which phosphorylates other enzymes and changes their activity — in the worked example it activates the transcription factor CREB, which turns on gene transcription. In the phospholipase C–calcium system, adrenaline binding an alpha adrenergic receptor activates a G protein and then phospholipase C, which splits a membrane phospholipid into DAG and IP3; IP3 diffuses to the endoplasmic reticulum, opens calcium channels, and the released calcium binds calmodulin, which activates protein kinase C. In the tyrosine kinase system the receptor is itself the enzyme: insulin binds the alpha subunits, two receptor units dimerise, the beta subunits autophosphorylate, and the activated receptor phosphorylates other molecules — moving GLUT4 vesicles to the membrane so glucose enters the cell. Hydrophobic hormones take the other route entirely. Sex steroids, aldosterone, cortisol and thyroxine dissociate from carrier proteins and move freely across the membrane to intracellular receptors. Each such receptor has two domains, one binding the hormone and one binding DNA; bound, it attaches to a hormone response element and stimulates gene transcription, so the cell makes new protein.',
      keyFacts: [
        'The dividing line is solubility in the membrane lipid, not hormone size.',
        'Hydrophilic (amine, peptide): surface receptor → second messenger → changes proteins ALREADY in the cell.',
        'Hydrophobic (steroids, thyroxine): crosses the membrane → intracellular receptor → changes which genes are transcribed → NEW protein.',
        'System 1 — adenylate cyclase converts ATP to cAMP; cAMP activates protein kinase A.',
        'System 2 — phospholipase C splits a phospholipid into DAG and IP3; IP3 releases Ca2+, Ca2+ binds calmodulin, calmodulin activates protein kinase C.',
        'System 3 — tyrosine kinase: the receptor IS the enzyme; insulin causes dimerisation and autophosphorylation, then GLUT4 moves to the membrane.',
        'Adrenaline uses two systems: phospholipase C at the alpha receptor, adenylate cyclase–cAMP at the beta receptor.',
        'Intracellular receptors carry two domains: a hormone-binding domain and a DNA-binding domain.',
        'The DNA site the bound receptor attaches to is the hormone response element.',
      ],
      prerequisites: ['abct2326-endocrine-receptors'],
      examples: [
        'Adrenaline in a fight-or-flight moment: through phospholipase C the chain ends at protein kinase C driving glycogen → glucose 6-phosphate → glucose → blood.',
        'Insulin through tyrosine kinase: GLUT4 carriers inserted into the membrane let glucose into the cell, lowering blood glucose.',
      ],
    },
    memory: {
      wordOrigin: 'Hydro-philic = water-loving, so it stays in the water outside. Hydro-phobic = water-fearing, so it is at home in lipid and walks through the membrane. The name tells you which side of the membrane the receptor is on.',
      chunking: 'Two routes, then three systems inside the first. Give each system its enzyme: adenylate cyclase, phospholipase C, tyrosine kinase — the enzyme names the system.',
      comparison: 'The sharpest contrast is what changes. Second messengers modify proteins the cell already has, so the effect is fast. Genomic action makes new protein, so it is slow. Same endocrine system, opposite timescales.',
      story: 'Adrenaline is the hormone that refuses to pick a side: alpha receptor takes the phospholipase C road, beta receptor takes the cAMP road, and both end in more glucose.',
    },
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
    skills: [
      'The pathway follows the receptor, not the hormone: one adrenaline molecule runs the phospholipase C–Ca2+ route at an alpha receptor and the adenylate cyclase–cAMP route at a beta receptor. "Which pathway does adrenaline use" is a malformed question — the target cell\'s receptor decides.',
      'Solubility in the membrane lipid, not hormone size, divides the two routes — and the timescale difference is the mechanism difference: hydrophilic hormones modify proteins the cell already has (fast), hydrophobic ones reach DNA and make new protein (slow, thirty minutes or more).',
      'Thyroxine is amino-acid derived and hydrophobic anyway: its iodide makes it slightly insoluble, so it travels with the steroids to intracellular receptors. Chemistry beats derivation class — sorting hormones by their amino acid origin puts thyroxine on the wrong route.',
      'cAMP is not the hormone: in that route the hormone never enters the cell at all — it stays on the outside receptor, and cAMP is the intracellular message its binding produces.',
    ],
    selfCheck: 'From blank: draw the two routes side by side, mark where the receptor sits in each, and write what each one changes — existing protein or new protein. Then add the three enzymes.',
    sourceRefs: [
      { ref: 'phys.hormech', location: 'p3 "HYDROPHILIC HORMONE MECHANISM (water soluble hormones)" and the adenylate cyclase–cAMP system' },
      { ref: 'phys.hormech', location: 'p5 "PHOSPHOLIPASE C" second messenger system; p6 note on adrenaline using two systems' },
      { ref: 'phys.hormech', location: 'p7 "TYROSINE KINASE SECOND MESSENGER SYSTEM"' },
      { ref: 'phys.hormech', location: 'p8 "HYDROPHOBIC HORMONE MECHANISM"; p9 hormone response element' },
    ],
  },
  /*
   * The seven items below come from the lecturer's own prose notes filed
   * beside the slide decks in units 8, 9 and 10 (phys.susan8/9/10). The decks
   * name the structures; these notes give the mechanism, which is why the
   * lessons here are the step-by-step ones — the crossbridge cycle, the two
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
    lesson: {
      explanation: 'A synapse is not one event but a chain of them, and the source\'s point is that a drug can be built to attack any single link. Read along the chain: the transmitter is synthesised, loaded into the cytoplasm, packaged and released into the gap, crosses to the receptor, binds it, triggers a second messenger, and is then cleared — either taken back up into the pre-synaptic cell or broken down by an enzyme. The note lists eight classes of drug, one per link: those that increase release of neurotransmitter into the cytoplasm; those that increase neurotransmitter reaching the synaptic gap; those that block its release; those that inhibit its synthesis; those that block its reuptake; those that block the enzyme that breaks it down; those that act as antagonists, blocking the receptor, or as agonists, mimicking the transmitter; and those that inhibit or facilitate second-messenger activity. Two of those raise transmitter by adding, two by stopping removal, two by cutting supply, and the last two act after the transmitter has done its job — the same outcome reached from opposite directions. Nerve disease, the note says, can be a matter of too little neurotransmitter or too much, so the target is the level in the gap rather than the molecule itself. The caveat matters as much as the list: long-term effects resist prediction, because the imbalance a drug creates is counteracted by the feedback mechanism that normally regulates the process. Block the synthesis of an enzyme and the neuron may answer by pushing more of that enzyme\'s precursors into the axon terminals. The worked example is depression: antidepressants raise transmitters linked to mood such as serotonin and noradrenaline, and the most widely prescribed class, the selective serotonin reuptake inhibitors, works at link five — blocking reuptake, so serotonin cannot be reabsorbed into the pre-synaptic cell and keeps binding its receptor.',
      keyFacts: [
        'The target of a synaptic drug is the LEVEL of transmitter in the gap, not the transmitter molecule.',
        'Eight interference points: synthesis, loading into cytoplasm, release into the gap, blocking release, reuptake, enzymatic breakdown, the receptor itself (agonist or antagonist), and second-messenger activity.',
        'Agonist = mimics the transmitter at the receptor. Antagonist = blocks the receptor so the transmitter cannot bind.',
        'Blocking reuptake and blocking the breakdown enzyme both RAISE transmitter effect — by stopping removal, not by adding more.',
        'Long-term effects are hard to predict: the feedback mechanism that normally regulates the synapse counteracts the imbalance the drug creates.',
        'Worked example — SSRIs block serotonin (5-HT) reuptake into the pre-synaptic cell, so it continues to bind the receptor.',
      ],
      prerequisites: ['abct2326-nervous-divisions'],
      examples: [
        'An SSRI does not add serotonin. It leaves the serotonin already released sitting in the gap for longer.',
        'A drug that blocks acetylcholinesterase raises acetylcholine effect at the neuromuscular junction by the same logic — stop the clearing enzyme, and the transmitter keeps acting.',
      ],
    },
    memory: {
      wordOrigin: 'Agonist is from Greek agon, a contest — the one who acts. Antagonist is anti- + agonist, the one who acts against. An antagonist at a receptor does nothing itself; it occupies the seat so the real transmitter cannot sit down.',
      chunking: 'Walk the transmitter\'s life in order and a drug class falls out of each stage: make it, load it, release it, cross, bind, signal, clear it. Eight drugs, one per stage, is easier to hold than eight drugs in a list.',
      comparison: 'Two ways to raise a transmitter\'s effect that look identical from outside: add more (increase release) or remove less (block reuptake or the breakdown enzyme). The clinical difference is that the second only works where transmitter is already being released.',
      story: 'These notes open "To the students who asked me a question on Drug action on nerves" — the lecturer answering a question in writing. It is the least examinable-looking page in the folder and one of the most useful.',
    },
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
    skills: [
      'The eight drug classes are not a list to memorise — they are the synapse itself, read in order. Synthesis, loading, release, blocked release, reuptake, breakdown enzyme, receptor, second messenger. If you can draw the synapse you can regenerate the list, and the reverse never works.',
      'Two mechanisms raise a transmitter\'s effect without adding any: blocking reuptake and blocking the breakdown enzyme. Both need transmitter already being released, which is why they fail where an agonist would still work.',
      'Nerve disease in this note is a quantity problem — too little transmitter or too much — so every drug class is aimed at the level in the gap. That framing tells you what a drug is for before you know its name.',
      'The feedback caveat is the examinable part of the answer, not a footnote: a neuron answers a blocked enzyme by supplying more precursor, so the acute effect and the long-term effect of the same drug can differ.',
    ],
    selfCheck: 'Draw a synapse from blank. Mark the eight points a drug could act on, and write beside each whether the drug would raise or lower the transmitter\'s effect. Then place the SSRI.',
    sourceRefs: [
      { ref: 'phys.susan8', location: 'p1 "Drugs that blocks neurotransmitter reuptake" and the seven other classes listed with it' },
      { ref: 'phys.susan8', location: 'p1 "Drugs that act as Antagonists to block the receptor from binding"' },
      { ref: 'phys.susan8', location: 'p1 "the long term effects are difficult to predict because the imbalances are counteracted by the feedback mechanism"' },
      { ref: 'phys.susan8', location: 'p1 "Selective serotonin reuptake inhibitors (SSRIs)"' },
    ],
  },
  {
    id: 'abct2326-crossbridge-cycle',
    subject: 'ABCT2326', unit: 'phys.msk', type: 'sequence',
    title: 'The sarcomere and the crossbridge cycle',
    tags: ['musculoskeletal', 'high-yield'],
    lesson: {
      explanation: 'A muscle cell is built of myofibrils about 1 µm across running the whole length of the fibre, and each myofibril is banded. The dark A bands hold thick filaments of myosin; the light I bands hold thin filaments of actin. The thin filaments do not stop at the edge of the I band but reach into the A band on each side, so the A band\'s edges look darker than its centre. That paler centre is the H zone, which holds thick filament only, and down its middle runs the M line, anchoring the thick filaments so they stay together during a contraction. The I band\'s centre carries the thin Z line — in three dimensions a Z disc — and one sarcomere is the unit from Z line to Z line. An elastic protein, titin, runs through the thick filaments and supplies the recoil that returns the muscle on relaxation. Contraction shortens the distance between Z discs, and the sliding filament theory says how: the filaments themselves do not shorten. Not one of them changes length. The thin filaments slide over and between the thick ones towards the centre of the A band, so the I bands shorten and adjacent A bands move closer together while each A band keeps its length. The sliding is done by crossbridges — projections of myosin, each with two globular heads carrying an ATP binding site and an actin binding site. The cycle: at rest the head is detached and the actin binding site is blocked by tropomyosin, held there by troponin. ATP binds the head, which acts as an ATPase and splits it to ADP and phosphate, and the energy cocks the head like a gun hammer. When the nerve signal raises cytoplasmic calcium, two Ca2+ ions bind troponin C, troponin changes shape and drags tropomyosin off the binding site. The head binds actin — the crossbridge — releases the phosphate, and executes the power stroke that hauls the thin filament inwards. ADP is then released and the head stays tightly bound until a new ATP arrives and detaches it, starting the cycle again. That last detail explains rigor mortis: with no breathing there is no oxygen, with no oxygen no ATP, and with no ATP the calcium pumps stop, so calcium stays on troponin and the heads bind but can never let go.',
      keyFacts: [
        'Sarcomere = Z line to Z line. A band = thick/myosin (dark). I band = thin/actin (light).',
        'H zone = the centre of the A band, thick filament only. M line runs down it and anchors the thick filaments.',
        'Titin is the elastic protein running through the thick filaments; it supplies recoil during relaxation.',
        'Sliding filament theory: NO filament shortens. The thin ones slide inwards, so the I band shortens and the A band does not.',
        'A crossbridge is a myosin projection of two heads; each head has an ATP site and an actin site.',
        'Cycle order — ATP binds → hydrolysed to ADP+Pi → head cocks → Ca2+ binds troponin → tropomyosin moves → head binds actin → Pi released → power stroke → ADP released → new ATP → head detaches.',
        'ATP is needed to DETACH the head, not to attach it. That is why rigor mortis is stiffness, not relaxation.',
        'One power stroke moves actin about 6 nm and shortens the muscle by roughly 1%; muscles can shorten up to 60%, so the cycle repeats.',
        'Cycling continues as long as there is enough ATP and enough Ca2+ in the cytoplasm.',
        'Rigor mortis begins about 3–4 hours after death, is maximal at 12 hours, and dissipates by roughly 48–60 hours.',
        'Relaxation is not one process: a fibre returns to its resting length through THREE forces — its own elastic recoil, the contraction of opposing muscles, and gravity.',
        'Opposing muscles return a muscle to resting length faster than elastic recoil alone — the triceps stretches the biceps.',
      ],
      prerequisites: ['abct2326-muscle-types'],
      examples: [
        'A radiograph of a contracted limb muscle shows a shorter muscle belly but the same filament proteins — nothing in the tissue has been consumed or shortened, only rearranged.',
        'Rigor mortis is the crossbridge cycle stopped at one step: heads bound to actin with no ATP to release them.',
      ],
    },
    memory: {
      wordOrigin: 'Sarco- is Greek for flesh, so sarcomere is "flesh unit", sarcoplasm is the muscle cell\'s cytoplasm and sarcoplasmic reticulum its ER. Myo- is muscle: myofibril, myosin, myoglobin. A band from anisotropic, I band from isotropic — how they behave in polarised light.',
      chunking: 'Bands by letter: A is dArk and thick; I is lIght and thIn. Then three landmarks inside them — H zone in the middle of A, M line down the middle of H, Z line in the middle of I.',
      comparison: 'The counter-intuitive fact is worth stating as a contrast: the muscle shortens, the filaments do not. Only the OVERLAP changes. Anyone who says the myosin contracts has the mechanism inverted.',
      story: 'ATP is not the fuel that pulls — it is the key that releases. The power stroke runs on energy already stored in the cocked head; the next ATP is what lets go. A body with no ATP left is stuck mid-grip, which is exactly what rigor mortis is.',
    },
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
    skills: [
      'ATP detaches, it does not attach. Every confusing fact in this topic follows from that one: why the head is cocked before calcium arrives, why relaxation needs ATP as much as contraction does, and why a body with no ATP goes stiff rather than limp.',
      'The A band is the diagnostic band. It is the thick filament, so if it keeps its length nothing shortened — which is why the banding pattern, not the muscle\'s outward length, is what disproves the "filaments contract" story.',
      'Calcium is a permission signal, not an energy source. It moves tropomyosin off the binding site; the power stroke\'s energy was already stored when ATP was hydrolysed.',
      'The whole cycle continues only while BOTH ATP and Ca2+ are sufficient in the cytoplasm — two independent requirements, and rigor mortis is what losing one of them looks like.',
    ],
    selfCheck: 'Draw a sarcomere and label A band, I band, H zone, M line, Z line. Then draw it contracted and mark which labels moved and which did not. Finally write the cycle as eleven arrows without looking.',
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
    lesson: {
      explanation: 'The motor neurons that drive skeletal muscle have cell bodies in the brainstem or spinal cord, and their axons are myelinated and the largest diameter in the body, so action potentials reach the muscle fast. Once at the muscle the axon branches, each branch making a single junction with one muscle fibre — so one neuron commands many fibres. That neuron plus every fibre it supplies is a motor unit, and the fibres need not be adjacent; they can be scattered through the muscle. When the neuron fires, every fibre in its unit contracts. The myelin stops near the muscle surface, and the axon\'s end portion lying on the fibre membrane is the motor end plate; the junction as a whole is the neuromuscular junction. The sequence there: the action potential depolarises the terminal, opening voltage-sensitive calcium channels; calcium enters and binds a protein that lets acetylcholine vesicles release; acetylcholine crosses and binds nicotinic receptors on the end plate; sodium channels open and the membrane depolarises. That depolarisation is the end-plate potential, the muscle\'s counterpart to an EPSP at a neural synapse — but far larger, because more acetylcholine is released over a larger area, and one EPP is enough to depolarise the muscle membrane. There are no inhibitory potentials in human skeletal muscle: every neuromuscular junction is excitatory. Acetylcholinesterase in the end plate breaks the transmitter down, returning it to rest. Then comes the coupling problem. The action potential in the muscle membrane lasts 1–2 ms and is over before any mechanical activity starts, yet the mechanical activity following it may last 100 ms or more. The electrical event does not act on the contractile proteins at all — it raises cytosolic calcium, and calcium keeps the contractile apparatus running long after the electricity has stopped. That is excitation–contraction coupling: sodium entry at the sarcolemma, then voltage-gated calcium channels in the transverse tubules changing shape, and that conformational change opening the calcium release channels — the ryanodine receptors — in the sarcoplasmic reticulum. These release channels are about ten times larger than the voltage-gated calcium channels in nerves, so calcium floods the sarcoplasm fast. Contraction needs cytoplasmic calcium above 10⁻⁶ molar; relaxation needs it below, and is produced by actively transporting calcium back into the sarcoplasmic reticulum, where most of it is stored in the terminal cisternae.',
      keyFacts: [
        'Motor unit = one motor neuron + every muscle fibre it innervates. Fire the neuron and all of them contract.',
        'The fibres of one motor unit are scattered through the muscle, not clustered together.',
        'Motor end plate = the axon terminal region on the muscle membrane. Neuromuscular junction = the junction itself.',
        'Transmitter is acetylcholine; the receptor on the end plate is nicotinic.',
        'The end-plate potential (EPP) is like an EPSP but much larger — more ACh over a larger area — and ONE EPP is enough to depolarise the muscle.',
        'Every human neuromuscular junction is excitatory. There are no IPSPs in human skeletal muscle.',
        'Acetylcholinesterase in the end plate breaks ACh down so the end plate returns to resting potential.',
        'The muscle action potential lasts 1–2 ms; the mechanical activity it triggers lasts 100 ms or more.',
        'Electrical activity does NOT act on the contractile proteins — it raises cytosolic calcium, which does.',
        'Coupling chain: sarcolemma depolarises → voltage-gated Ca2+ channels in the T tubules change shape → ryanodine receptors open in the sarcoplasmic reticulum → Ca2+ floods the sarcoplasm.',
        'Contraction above 10⁻⁶ molar cytoplasmic Ca2+; relaxation requires active transport of Ca2+ back into the sarcoplasmic reticulum.',
        'Most calcium in a relaxed fibre sits in the terminal cisternae of the sarcoplasmic reticulum.',
      ],
      prerequisites: ['abct2326-crossbridge-cycle'],
      examples: [
        'Precision versus power is a motor-unit question: a muscle whose neurons each command few fibres can be graded finely; one whose neurons each command hundreds moves in coarser steps.',
        'A drug blocking acetylcholinesterase leaves ACh on the end plate, so the fibre keeps being driven — the same reuptake/breakdown logic as at any synapse, applied to muscle.',
      ],
    },
    memory: {
      wordOrigin: 'Sarcolemma is sarco- (flesh) + lemma (husk, sheath) — the muscle fibre\'s membrane. Terminal cisternae: cisterna is Latin for a water tank, which is what they are for calcium. Ryanodine receptor is named after the plant alkaloid ryanodine that binds it, not after anything it does.',
      chunking: 'Two chains, joined at the membrane. Chain one is nerve → ACh → end plate → depolarisation. Chain two is depolarisation → T tubule → ryanodine receptor → calcium → troponin. Learn them as two and the join is obvious.',
      comparison: 'EPP against EPSP is the cleanest contrast: same mechanism, different scale. An EPSP is one of many inputs that must summate; one EPP is sufficient on its own — which is why a motor neuron firing always contracts its unit, and a neuron receiving one EPSP may do nothing.',
      story: 'The timing mismatch is the whole reason coupling needs a name: 1–2 ms of electricity produces 100 ms of movement. The electricity is a starting gun, not a rope — it releases calcium and calcium does the work long after the gun is silent.',
    },
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
    skills: [
      'Two calcium events, two cells. Calcium in the nerve terminal releases the transmitter; calcium in the sarcoplasm starts the contraction. Marking which is which on your own diagram removes most of the confusion in this topic.',
      'Skeletal muscle has no inhibitory junction — every neuromuscular junction is excitatory, so all grading of movement happens upstream, in how many motor units are recruited and how often they fire.',
      'The 1–2 ms against 100 ms mismatch is the reason coupling exists as a concept. Any explanation in which electricity pulls the filaments is wrong on timing alone.',
      'One EPP is above threshold with room to spare, and that reserve is why junction disease shows as fatigable weakness rather than sudden paralysis — the margin erodes before it fails.',
    ],
    selfCheck: 'Draw the junction and the T tubule as one diagram. Mark both calcium movements with arrows, label the ryanodine receptor and terminal cisternae, and write the two timings — 1–2 ms and 100 ms — beside what each belongs to.',
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
    lesson: {
      explanation: 'Fibres are divided by how fast they reach maximum tension, and the difference traces to which myosin ATPase isoenzyme they carry. Slow twitch, Type I, have a high oxidative capacity — hence slow oxidative — and are rich in capillaries, mitochondria, aerobic enzymes and myoglobin. Myoglobin is a red pigment related to haemoglobin but with one subunit rather than four; it improves oxygen delivery and stores oxygen in the fibre, and its abundance is why slow fibres are called red. Fast twitch, Type II, are thicker with fewer capillaries, less myoglobin and fewer mitochondria — hence white — and are adapted to anaerobic metabolism with a large glycogen store and high glycolytic enzyme concentration. Between them sit intermediate Type IIA, fast oxidative and fatigue-resistant. The speed range is wide: extraocular muscles reach maximum tension in about 7.3 ms, soleus in about 100 ms. Innervation ratio varies with the job: soleus, a postural muscle of small slow units, averages 180 fibres per motor neuron; gastrocnemius runs 1,000–2,000 and can generate sudden force; extraocular units have a ratio of only 3, because the eye needs precision rather than strength. Fuel changes with intensity. At rest muscles run mostly on aerobic respiration of fatty acids; with exercise, muscle glycogen and blood glucose join in, and greater intensity increases glucose uptake by moving GLUT4 carrier vesicles to fuse with the sarcolemma so glucose enters by facilitated diffusion — the same effect insulin produces, by a different signal. Energy is needed for two things specifically: moving the crossbridges, and pumping calcium back into the sarcoplasmic reticulum. During moderate to heavy exercise the first 45–90 seconds are anaerobic while the circulation catches up. Fat is the major fuel for light to moderate work because it holds more energy per gram — 9 Calories against 4 for carbohydrate. Aerobic ceiling is VO₂ max, which depends on age, size and sex: 15–20% higher in males, highest at about 20 years old, ranging from around 12 ml O₂/min/kg in older people to 84 in the young, and improvable by about 20% with training. The lactate threshold — the percentage of VO₂ max at which blood lactate rises sharply — sits at 50–70% for an average person and around 80% in an athlete. After exercise the extra oxygen taken in repays the oxygen debt: oxygen withdrawn from haemoglobin and from muscle myoglobin, oxygen for the tissues\' continued metabolism, and oxygen for metabolising the lactic acid produced anaerobically. For very short bursts, phosphocreatine donates a high-energy phosphate to ADP, renewing ATP faster than metabolism can.',
      keyFacts: [
        'Type I = slow twitch = slow oxidative = red, because of myoglobin. Rich in capillaries, mitochondria and aerobic enzymes.',
        'Type II = fast twitch = white. Thicker, fewer capillaries and mitochondria, less myoglobin; large glycogen store and high glycolytic enzymes.',
        'Type IIA = intermediate, fast oxidative, fatigue-resistant.',
        'Myoglobin is like haemoglobin but has ONE subunit instead of four; it stores oxygen in striated muscle.',
        'Speed range: extraocular ≈ 7.3 ms to peak tension, soleus ≈ 100 ms.',
        'Innervation ratio — soleus ≈ 180 fibres per neuron, gastrocnemius 1,000–2,000, extraocular only 3.',
        'Energy is needed for exactly two jobs: moving crossbridges, and pumping Ca2+ back into the sarcoplasmic reticulum.',
        'GLUT4 vesicles fuse with the sarcolemma so glucose enters by facilitated diffusion — exercise does this by a different signal from insulin.',
        'Fat yields 9 Calories per gram; carbohydrate 4.',
        'The first 45–90 seconds of moderate-heavy exercise are anaerobic while the circulation delivers oxygen.',
        'VO₂ max: 15–20% higher in males, peaks around age 20, roughly 12–84 ml O₂/min/kg, trainable by about 20%.',
        'Lactate threshold ≈ 50–70% of VO₂ max in an average person, ≈ 80% in an athlete.',
        'Oxygen debt repays four things: haemoglobin stores, myoglobin stores, continued tissue metabolism, and metabolism of the lactic acid produced.',
        'Phosphocreatine donates a phosphate to ADP for rapid ATP renewal; supplements raise muscle phosphocreatine by 15–40%.',
        'Endurance training does NOT increase muscle size — it adds mitochondria and aerobic enzymes. Size comes only from high-intensity work against resistance.',
        'Hypertrophy is more myofibril, not more cells: myofibrils thicken as actin and myosin are synthesised and new sarcomeres added, then a thickened myofibril may split in two.',
      ],
      prerequisites: ['abct2326-nmj-coupling'],
      examples: [
        'Muscle biopsies show sprinters carry a larger proportion of pale, powerful, rapidly fatiguing fibres than marathoners.',
        'Endurance training does not enlarge muscle — it adds mitochondria and aerobic enzymes. Enlargement comes from high-resistance work, thickening Type II fibres by hypertrophy.',
      ],
    },
    memory: {
      wordOrigin: 'Myoglobin = myo- (muscle) + globin, the protein; haemoglobin = haem (iron pigment) + globin. Same globin, different setting, and one subunit instead of four. Glycolytic from glyco- (sugar) + lysis (splitting).',
      chunking: 'Colour carries the whole comparison. Red = myoglobin = oxygen = aerobic = slow = endurance. White = no myoglobin = anaerobic = fast = power. Every other property follows from which pigment the fibre has.',
      comparison: 'Innervation ratio is the sharpest number in the topic: 3 fibres per neuron in the eye against 1,000–2,000 in gastrocnemius. Precision costs neurons; power does not.',
      story: 'Lactate is usually cast as the villain that makes muscles hurt. The source reads it the other way: acidity slows the very pathways that keep the muscle contracting, and that slowing is a defence against permanent damage in extreme exertion.',
    },
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
    skills: [
      'Colour is the index to this whole comparison: red means myoglobin means oxygen means aerobic means slow and enduring; white means the opposite on every count. Learn the pigment and the properties come with it.',
      'Innervation ratio is set by the job, not by the muscle\'s size — 3 fibres per neuron for the eye, 1,000–2,000 for gastrocnemius. Precision is bought with neurons, and it is the ratio, not the fibre type, that decides how finely a movement can be graded.',
      'Relaxation costs ATP. Both named energy costs — crossbridge movement and the calcium pump — must be paid, so a fatigued muscle stiffens rather than simply going slack.',
      'VO₂ max and lactate threshold are separate levers on the same performance: one raises the ceiling, the other raises the fraction of the ceiling you can hold. Training moves both, and an answer that names only one is half an answer.',
    ],
    selfCheck: 'Write the two fibre types in columns and fill each with colour, pigment, mitochondria, capillaries, metabolism and an example muscle. Then add the three innervation ratios and say what each buys.',
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
    lesson: {
      explanation: 'To control movement the nervous system needs continuous sensory feedback from the muscle, and it receives two different reports. Muscle length is reported by the muscle spindle apparatus; tension on the tendon is reported by the Golgi tendon organs. The spindle is wider in the centre and tapers at each end, which suits it to detecting length. It contains several thin muscle cells, the intrafusal fibres, wrapped in a connective tissue sheath; the ordinary fibres outside it are extrafusal. Spindles insert into the tendon at each end, so they lie in parallel with the extrafusal fibres and are stretched whenever the muscle is. Their central regions do not contract but do contain nuclei, arranged two ways: loosely in the centre in nuclear bag fibres, in rows in nuclear chain fibres. Stretching the muscle stretches the spindle and stimulates both primary and secondary sensory endings — primary most at the onset of stretch, secondary in a more sustained way, and a sudden stretch activates both. The knee jerk is that circuit made visible. Striking the patellar ligament stretches the whole muscle body and so the spindles within it, activating the sensory nerves with primary endings; those axons enter and synapse in the ventral grey matter of the spinal cord with alpha motor neurons — large, fast-conducting nerves that drive the extrafusal fibres of the extensor muscle — and the result is an isotonic contraction, the jerk. The Golgi tendon organ runs the opposite way. It monitors tension produced by contraction, and its sensory nerves synapse with interneurons in the cord that inhibit the motor neurons driving that muscle. Because two synapses are crossed inside the CNS it is a disynaptic reflex, and its effect is protective: excessive tension or extreme stretch makes the muscle relax rather than pull harder. Above both sit the descending tracts. Upper neurons in the brain control the lower motor neurons — the alpha and gamma motor neurons of the cord. The precentral gyrus of the cerebral cortex contributes axons that cross to the opposite side in the pyramids of the medulla oblongata. The pyramidal tracts descend from cortex to spinal cord without synapsing on the way, then synapse with a neuron in the cord whose cell body lies in the ventral horn of the grey matter; these serve voluntary movement. The extrapyramidal tracts arise in other areas of the brain and coordinate motor commands subconsciously — posture, initiating movement, facial muscles. Their clinical signature: a Parkinson\'s patient short of dopamine in those areas is described as having extrapyramidal symptoms. Cut the pyramidal tracts and movement still occurs, because cortex, cerebellum and basal nuclei retain many synaptic interconnections and can influence movement indirectly.',
      keyFacts: [
        'Two feedback channels: muscle SPINDLE reports LENGTH, GOLGI TENDON ORGAN reports TENSION.',
        'Intrafusal fibres are inside the spindle; extrafusal fibres are the ordinary muscle outside it.',
        'Spindles lie in PARALLEL with the extrafusal fibres, so they are stretched when the muscle is.',
        'Two intrafusal types: nuclear bag (nuclei loose in the centre) and nuclear chain (nuclei in rows).',
        'Primary endings respond most at the START of a stretch; secondary endings respond in a sustained way.',
        'Hands have the most spindles, because they need the finest control.',
        'Knee jerk: tap → spindle stretched → primary sensory axons → ventral grey matter → alpha motor neuron → extensor contracts. One synapse in the CNS.',
        'The Golgi tendon reflex is DISYNAPTIC — two synapses crossed — and INHIBITORY, so excess tension makes the muscle relax.',
        'Alpha motor neurons drive extrafusal (ordinary) fibres and are large and fast-conducting.',
        'Pyramidal tracts: precentral gyrus → cross in the pyramids of the medulla → spinal cord without synapsing en route → voluntary movement.',
        'Extrapyramidal tracts: other brain areas, subconscious or involuntary movement — posture, initiation, facial muscles.',
        'Parkinson\'s disease, from insufficient dopamine in those areas, gives "extrapyramidal symptoms".',
        'Cutting the pyramidal tracts does not abolish movement: the extrapyramidal system can still produce it.',
      ],
      prerequisites: ['abct2326-nmj-coupling'],
      examples: [
        'Positioning a patient who resists passively: the stretch reflex is doing exactly what it is built to do, and forcing against it recruits it harder.',
        'A tremor or rigidity described as an extrapyramidal symptom points at the subconscious motor system, not at the voluntary pyramidal route.',
      ],
    },
    memory: {
      wordOrigin: 'Fusus is Latin for spindle, so intrafusal is "inside the spindle" and extrafusal "outside" it. Di-synaptic is simply two synapses. Pyramidal is named for the pyramids of the medulla the tract crosses in — a landmark, not a shape of neuron.',
      chunking: 'Two sensors, opposite jobs, opposite signs: spindle senses stretch and EXCITES the same muscle to resist it; tendon organ senses tension and INHIBITS the same muscle to protect it. Learn them as a pair and neither is confusable.',
      comparison: 'Count the synapses and the two reflexes separate themselves. The stretch reflex crosses one synapse in the cord; the Golgi tendon reflex crosses two, because it needs an interneuron to convert an excitatory sensory signal into inhibition.',
      story: 'The knee-jerk tap is not testing the knee. It is stretching spindles, and the leg kicks because the spinal cord answers a stretch by contracting — the doctor is reading a circuit, not a joint.',
    },
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
    skills: [
      'The two sensors are a matched pair with opposite signs — spindle senses length and excites, tendon organ senses tension and inhibits — so recalling either one gives you the other by inversion.',
      'Counting CNS synapses tells you the sign: one synapse can only excite, so an inhibitory reflex must be at least disynaptic. That is why the interneuron in the Golgi tendon circuit is the point of the circuit, not a detail of it.',
      'Spindles are in parallel with the working fibres, which is what makes them length detectors — a receptor in series with the tendon, like the Golgi organ, can only report force. Geometry decides what a receptor can sense.',
      '"Extrapyramidal symptoms" is a locating phrase, not a description: it says the subconscious motor system is affected rather than the voluntary route, which is why Parkinson\'s spares voluntary strength.',
    ],
    selfCheck: 'Draw a muscle with its tendon. Place the spindle and the tendon organ where each actually sits, draw both reflex arcs into the cord counting the synapses, and mark which one excites and which inhibits.',
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
    lesson: {
      explanation: 'Complement is a system of circulating proteins that assists antibodies in destroying pathogens — special C proteins in the blood plasma, named for the way the system complements antibody action. The two documents disagree about how many: these notes say eleven, and the Week 10 slide deck says thirty. Nothing in either source settles it — the app carries both rather than choosing, and an exam answer is safest naming the cascade rather than a count. They interact in sequence, and the sequence can be entered by two routes. The classical pathway is quick and effective. Antibodies attach to the foreign cell; C1 binds two of those antibodies and becomes an activated enzyme; C1 then cleaves other complement proteins in a fixed order — hydrolysing C2 into C2a and C2b and cleaving C4 into C4a and C4b. C2a and C4b together form an active enzyme, C3 convertase, which splits C3 into C3a and C3b, and C3b attaches to the membrane. From there C3b helps assemble C5, C6, C7, C8 and C9 into a membrane attack complex on the bacterial cell wall — a large pore that kills the cell by osmotic influx of water. The crucial point about roles: it is the complement proteins that kill the cell, not the antibodies. The antibodies serve only as the activator. The fragments that were split off are not waste. C3a and C5a stimulate mast cells to release histamine, and C5a also acts as a chemokine attracting neutrophils and monocytes to arrive and phagocytose; histamine increases capillary permeability and produces vasodilation at the infected area, letting more white cells through. The alternative pathway is slower and less effective, and needs no antibody at all — it is activated directly by foreign material such as a bacterial capsule, using proteins including properdin (factor P), factor B and factor D, and arriving at the same activated C3b attached to the bacterial cell wall. From that point it follows the classical pathway, and the three effects are the same: pore formation, enhanced phagocytosis, and histamine release. So the two pathways differ only in how they start; they converge on C3b and end identically.',
      keyFacts: [
        'Complement (C) proteins circulate in blood plasma; the name means they COMPLEMENT antibody action.',
        'The two course documents give different counts — these notes say eleven, the Week 10 deck says thirty. Neither is corrected by the other, so learn the cascade, not the number.',
        'Classical pathway needs antibody bound to antigen. Alternative pathway needs none — foreign material such as a bacterial capsule starts it.',
        'Classical order: antibodies attach → C1 binds two antibodies and becomes an enzyme → C1 cleaves C2 and C4 → C2a + C4b = C3 convertase → C3 convertase splits C3 → C3b attaches to the membrane.',
        'C3b then recruits C5, C6, C7, C8 and C9 into the membrane attack complex — a pore that kills by osmotic influx of water.',
        'The complement proteins kill the cell. The antibodies are only the activator.',
        'C3a and C5a make mast cells release histamine; C5a is also a chemokine attracting neutrophils and monocytes.',
        'Histamine raises capillary permeability and causes vasodilation, bringing more white cells to the area.',
        'Alternative pathway proteins: properdin (factor P), factor B, factor D. It is slower and less effective.',
        'Both pathways converge on C3b and produce the same three effects: pore formation, enhanced phagocytosis, histamine release.',
      ],
      prerequisites: ['abct2326-innate-adaptive'],
      examples: [
        'A bacterium the body has met before is cleared by the classical route, because antibody is already available to trigger C1.',
        'A bacterium never met before can still be attacked, because the alternative pathway reads the capsule directly and needs no antibody — slower, but immediate in the sense that nothing has to be learned first.',
      ],
    },
    memory: {
      wordOrigin: 'Complement is from Latin complere, to fill up or complete — it completes what the antibody starts. Convertase is an enzyme that converts, here C3. Properdin is from perdere, to destroy, with pro-: the protein that acts for destruction.',
      chunking: 'The numbers run out of order once, and that is the only thing to memorise: C1, then C2 and C4, then C3 convertase, then C3, then C5 to C9. Everything after C3b is simply counting upwards.',
      comparison: 'The two pathways differ only at the start — antibody-triggered against material-triggered — and are identical from C3b onward. Framing them as "two entrances to one corridor" saves learning the second pathway twice.',
      story: 'Antibodies get the credit for killing bacteria and do not deserve it. They are the flag; complement is what comes through the door. The source says so directly: it is these complement proteins that kill the cell, not the antibodies.',
    },
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
    skills: [
      'The two pathways are one corridor with two doors. Learn the classical sequence properly and the alternative costs you three protein names — properdin, factor B, factor D — and nothing else.',
      'Antibody is a trigger, not a weapon. The examinable sentence is that complement proteins kill the cell and antibodies only activate them, and it explains why someone who cannot make antibody is not defenceless.',
      'The out-of-order numbering is the one thing worth memorising deliberately: C1 → C2 and C4 → C3 convertase → C3 → C5–C9. Everything from C3b onward simply counts up.',
      'Complement does two jobs at once — it punches holes and it inflames. The fragments split off along the way (C3a, C5a) are the inflammatory arm, so an answer that describes only the pore describes half the system.',
    ],
    selfCheck: 'Write the classical pathway as a chain of six steps without notes, then mark where the alternative pathway joins it. Beside each split fragment, write what it goes off to do.',
    sourceRefs: [
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
    lesson: {
      explanation: 'The immune system recognises the body\'s own membrane glycoproteins and glycolipids as self rather than foreign, and that recognition is what stops it attacking its own cells. When a pathogen enters a tissue there is no immediate response, because a T cell cannot see a free antigen: the antigen must first be bound to glycoproteins in another cell\'s plasma membrane. Those glycoproteins are genetically determined, coded on one region of chromosome 6 called the major histocompatibility complex, and the proteins themselves are MHC proteins, also known as human leukocyte antigens. Their amino acid sequences and shapes differ between individuals, and each molecule has a narrow central groove; an antigen that fits the groove is held there by hydrogen bonding. There are two classes and they carry different messages. An antigen on a Class I MHC protein flags the cell itself as abnormal and to be destroyed. An antigen on a Class II MHC protein says the antigen is dangerous and should be got rid of. Class I proteins sit in the plasma membranes of all nucleated cells; they are made at the Golgi apparatus, carry small peptides from the cytoplasm out to the membrane, and if those peptides are normal the T cells ignore them — but abnormal peptides or viral proteins are recognised as foreign and the cell is destroyed. That mechanism is also why donated organs are rejected: even after cross-matching, the recipient\'s T cells still read the transplanted tissue as foreign. Class II proteins appear only on lymphocytes and antigen presenting cells — the phagocytic cells of the monocyte–macrophage group, free and fixed macrophages, Kupffer cells of the liver, microglia in the CNS, and dendritic cells of skin, lymph nodes and spleen. An APC engulfs and breaks down a pathogen, binds the fragments to Class II MHC and inserts them into its membrane, where they appear only while the cell is processing antigen. Which T cell responds is decided by CD markers, membrane proteins of which more than seventy types exist. CD8 is carried by cytotoxic and suppressor T cells, which respond to Class I. CD4 is carried by helper T cells, which respond to Class II. Recognition alone does not activate anything: the T cell must also bind the stimulating cell at a second site, which is costimulation. The source calls it the safety on a gun — a cell displaying an unusual antigen but not the "I am an active phagocyte" or "I am infected" signal will not activate a T cell. Once costimulation has occurred the safety is off, and the T cell attacks any cell carrying the target antigen. The same caution governs B cells. A B cell carries its own antibody on its membrane; when the matching antigen binds, the B cell takes it in by endocytosis and re-presents it on Class II MHC. It then waits on standby until a helper T cell binds that MHC protein and releases cytokines — only then does it divide, forming plasma cells that release antibodies at around 100 million an hour, and memory B cells held in reserve.',
      keyFacts: [
        'A T cell cannot recognise free antigen. The antigen must be bound to an MHC protein on another cell\'s membrane.',
        'MHC is a region of chromosome 6; the proteins are MHC proteins, also called human leukocyte antigens (HLAs).',
        'Each MHC molecule has a narrow central groove; the antigen is held in it by hydrogen bonding.',
        'Class I MHC = on ALL nucleated cells. Message: this cell is abnormal, destroy it.',
        'Class II MHC = on lymphocytes and antigen presenting cells ONLY. Message: this antigen is dangerous, get rid of it.',
        'Class II appears in the membrane only while the cell is actually processing antigen.',
        'APCs include macrophages (free and fixed), Kupffer cells of the liver, microglia in the CNS, and dendritic cells of skin, lymph nodes and spleen.',
        'CD8 → cytotoxic and suppressor T cells → respond to Class I.',
        'CD4 → helper T cells → respond to Class II.',
        'Costimulation is a required SECOND binding site — the safety catch that stops T cells attacking normal cells.',
        'Organ rejection follows from Class I: the recipient\'s T cells read the graft\'s MHC as foreign despite cross-matching.',
        'A sensitised B cell waits for a helper T cell before it acts — a safety mechanism of the same kind.',
        'Plasma cells release around 100 million antibodies per hour; memory B cells stay in reserve for the next exposure.',
      ],
      prerequisites: ['abct2326-innate-adaptive'],
      examples: [
        'A virus hiding inside a cell cannot be reached by antibody, but the infected cell displays viral peptides on Class I MHC — and that is what a CD8 cytotoxic T cell reads.',
        'A transplanted kidney is attacked for the same reason an infected cell is: the recipient\'s T cells find MHC proteins whose shape is not theirs.',
      ],
    },
    memory: {
      wordOrigin: 'Histocompatibility is histo- (tissue) + compatibility — literally the tissue-matching complex, named for transplantation, which is how it was discovered. CD is simply "cluster of differentiation", a numbering scheme rather than a description. Costimulation is co- (together) + stimulation: two signals, not one.',
      chunking: 'Class I with CD8, Class II with CD4 — the numbers multiply to eight either way (1×8, 2×4). It is a coincidence, but it is a reliable one.',
      comparison: 'The two classes differ on three axes at once — which cells carry them, where the antigen came from, and what the message means. Class I is on every nucleated cell and says "I am infected"; Class II is on APCs only and says "look what I found".',
      story: 'Costimulation as the safety on a gun is the source\'s own image and worth keeping. Recognition is aiming; costimulation is releasing the safety. A cell that looks odd but sends no danger signal is aimed at and never fired on.',
    },
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
    skills: [
      'MHC class tells you the message, not just the location. Class I means "this cell is compromised, kill it"; Class II means "look at what I captured". Reading class as a message rather than a label makes both CD pairings and organ rejection follow without extra memorising.',
      'Recognition is not activation. The T cell that has found its antigen has done nothing yet — costimulation is the second signal, and its absence is what protects normal cells that happen to look unusual.',
      'Both arms of adaptive immunity carry a safety catch, and they are the same idea twice: the T cell needs costimulation, the B cell needs helper T cell permission. Notice the pattern and you have half the regulation of adaptive immunity.',
      'Antibodies cannot cross a plasma membrane, which is the single fact that divides the two arms of adaptive immunity: anything hiding inside a cell is cell-mediated work, anything in body fluids is antibody work.',
    ],
    selfCheck: 'Draw two cells side by side: one infected somatic cell and one antigen presenting cell. Put the right MHC class on each, the right CD marker on the T cell approaching it, and write in the second signal each needs before anything happens.',
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
   * defences and the active/passive split, and these say how any of it works.
   */
  {
    id: 'abct2326-innate-mechanisms',
    subject: 'ABCT2326', unit: 'phys.imm', type: 'comparison',
    title: 'Inside three innate defences: phagocytes, NK cells, interferons',
    tags: ['immune', 'high-yield'],
    lesson: {
      explanation: 'Three of the seven innate defences are cellular or chemical, and the detail is what separates them. Phagocytes come in two classes. Microphages are the neutrophils and eosinophils that normally circulate in blood and can leave it to enter injured or infected tissue; eosinophils are the less abundant of the two and target things already coated with antibody. A neutrophil is expendable by design — most die once they have engulfed more than 25 bacteria, and during an infection one may attack that many in an hour. Macrophages are the large ones, derived from circulating monocytes, and they come fixed (unable to move) or free. A free macrophage crosses a capillary wall by squeezing between the endothelial cells, which is diapedesis, and it is steered by chemicals in the surrounding fluid that attract or repel it, which is chemotaxis. Immunological surveillance is the second: natural killer cells destroying abnormal cells in peripheral tissues. They are less selective than lymphocytes but much faster, because T and B cells need a complex and time-consuming sequence of events first. An abnormal cell carries antigens normal membranes do not; the NK cell recognises them, adheres, and swings its Golgi apparatus round to face the target — the source likens it to rotating a tank turret. The Golgi makes secretory vesicles of perforin, which leave by exocytosis, diffuse across, and assemble into a network of pores wide enough to let ions and proteins pass freely, so the cell lyses. Perforin does not harm the NK cell itself, possibly because a second protein, protectin, binds and inactivates it. Some cancer cells escape anyway — by lacking antigens, by being covered, or by destroying the NK cell — and that is immunological escape. Viruses hide inside cells where antibody cannot reach, but an infected cell displays viral antigens on its membrane, and NK cells read those as abnormal. Interferons are the third: chemical messengers coordinating the defence against viral infection, released by lymphocytes, macrophages or virus-infected tissue. An interferon binds a surface receptor on a normal cell and, through second messengers, triggers antiviral proteins in that cell\'s cytoplasm which interfere with viral replication. They also stimulate macrophages and NK cells. Three types exist — alpha, beta and gamma — and most cells other than lymphocytes and macrophages answer a viral infection with beta-interferon. Interferons are one example of a cytokine, the general name for a chemical messenger a tissue cell releases to coordinate local activity.',
      keyFacts: [
        'Microphages = neutrophils and eosinophils, circulating in blood, able to leave it for injured tissue.',
        'Eosinophils are less abundant and target pathogens already coated with antibody.',
        'Most neutrophils die after engulfing more than 25 bacteria — and may attack that many in an hour.',
        'Macrophages derive from monocytes and are either fixed (cannot move) or free.',
        'Diapedesis = squeezing between endothelial cells to cross a capillary wall.',
        'Chemotaxis = being attracted or repelled by chemicals in the surrounding fluid.',
        'NK cells are LESS selective than T and B cells but MUCH faster — the others need a long activation sequence first.',
        'The NK cell rotates its Golgi apparatus towards the target, which then makes the perforin vesicles.',
        'Perforin forms a network of pores wide enough for ions and proteins to pass, and the cell lyses.',
        'Protectin may be why perforin does not harm the NK cell itself.',
        'Immunological escape = a cancer cell avoiding NK cells, by lacking antigens, being covered, or killing the NK cell.',
        'Interferons trigger antiviral proteins in a neighbouring cell — they do not kill the virus.',
        'Three interferons: alpha, beta, gamma. Most non-lymphocyte, non-macrophage cells secrete BETA.',
        'An interferon is a cytokine: a messenger a tissue cell releases to coordinate local activity.',
      ],
      prerequisites: ['abct2326-innate-adaptive'],
      examples: [
        'Pus is largely spent neutrophils — cells that did their 25 bacteria and died on the spot.',
        'A virus inside a cell is invisible to antibody but not to an NK cell, because the infected cell puts viral antigen on its own surface.',
      ],
    },
    memory: {
      wordOrigin: 'Dia-pedesis is Greek dia (through) + pedan (to leap) — leaping through the wall. Chemo-taxis is chemical + taxis (arrangement, ordering) — movement ordered by chemistry. Per-forin perforates. Pro-tectin protects.',
      chunking: 'Three defences, three verbs: phagocytes EAT, NK cells PUNCTURE, interferons WARN. The third is the odd one — it never touches the pathogen, it only tells neighbouring cells to prepare.',
      comparison: 'NK cell against T cell is a speed-for-precision trade. The NK cell is less selective and acts in minutes; the T cell is exact and needs days. Innate and adaptive in one pair of cells.',
      story: 'The tank turret is the source\'s own image and worth keeping: the NK cell does not fire from wherever it happens to be. It grabs the target, then rotates its Golgi apparatus round to point at it before making any perforin at all.',
    },
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
    skills: [
      'Three defences, three targets — and the third one surprises people: phagocytes act on the pathogen, NK cells act on the infected or abnormal HOST cell, interferons act on the cells that are still healthy. An answer that has interferons attacking the virus has the mechanism inverted.',
      'Speed and selectivity trade against each other. NK cells are explicitly less selective than lymphocytes and explicitly faster, and the reason given is the length of the T and B cell activation sequence — so "fast but crude" and "slow but exact" is the whole innate/adaptive distinction in one comparison.',
      'Diapedesis and chemotaxis are two halves of one journey: chemotaxis decides where to go, diapedesis is how it gets out of the vessel. Naming only one leaves the phagocyte either lost or stuck.',
      'Immunological escape is the exam-worthy exception: NK surveillance is not a guarantee, and a tumour that lacks antigens, hides them, or kills the NK cell is not detected at all.',
    ],
    selfCheck: 'Draw an infected tissue. Put a neutrophil crossing the capillary wall, an NK cell on an infected cell, and interferon spreading to two healthy cells. Label the mechanism at each arrow.',
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
    lesson: {
      explanation: 'Inflammation is described elsewhere by its signs; this is what produces them. Mast cells release histamine, heparin, prostaglandins and other chemicals into the interstitial fluid. Histamine makes capillaries more permeable, so more blood flows through the area. The chemicals mast cells release also stimulate local sensory neurons to produce pain — which is useful rather than incidental, because the person then reacts to limit the damage, removing a splinter or cleaning a wound. The increased blood flow reddens the area and raises its local temperature, and each of those has a job: the changes increase enzyme reaction rates, accelerate phagocyte activity and denature foreign proteins. Because the vessels are now more permeable, clotting factors and complement proteins can leave the bloodstream and enter the injured tissue — which is how the plasma systems reach an injury at all. Neutrophils are attracted in, destroy what they engulf, and secrete cytokines that attract further neutrophils and macrophages. As this continues, debris, fluid and dead and dying cells accumulate; that viscous mixture is pus, and pus enclosed in a tissue space is an abscess. Fever is the seventh innate defence and works at the level of the whole body: the maintenance of a body temperature greater than 37.2 °C. The thermostat is the temperature-regulating centre in the preoptic area of the hypothalamus, and circulating proteins called pyrogens reset it upwards. Pyrogens come from two directions — a pathogen can act as one itself, or an active macrophage can release one, the endogenous pyrogen also known as interleukin-1. Within limits a fever helps. High temperature may inhibit some viruses and bacteria, but the likeliest benefit is metabolic: for each 1 °C rise, metabolic rate increases by about 10 per cent. Cells move faster and enzyme reactions run more quickly, so tissue defences mobilise sooner and repair speeds up.',
      keyFacts: [
        'Mast cells release histamine, heparin and prostaglandins into the interstitial fluid.',
        'Histamine increases capillary permeability, so blood flow through the area rises.',
        'Mast cell chemicals stimulate sensory neurons to produce PAIN — so the person acts to limit the damage.',
        'Redness and heat follow from the increased blood flow; heat increases enzyme reactions, accelerates phagocytes and denatures foreign proteins.',
        'Increased permeability is how clotting factors and complement proteins leave the blood and reach the injury.',
        'Neutrophils secrete cytokines that recruit more neutrophils and macrophages.',
        'Pus = debris, fluid, dead and dying cells. An abscess = pus in an enclosed tissue space.',
        'Fever = body temperature maintained above 37.2 °C.',
        'The thermostat is in the PREOPTIC AREA of the hypothalamus; pyrogens reset it.',
        'Pyrogens have two sources: the pathogen itself, or an active macrophage releasing endogenous pyrogen — interleukin-1 (IL-1).',
        'For each 1 °C rise, metabolic rate increases by about 10%.',
      ],
      prerequisites: ['abct2326-innate-adaptive'],
      examples: [
        'The pain of an infected wound is a defence, not a side effect — it is what makes you clean it.',
        'A patient who is febrile is running their whole metabolism about 10% faster per degree, which is part of why fever is exhausting.',
      ],
    },
    memory: {
      wordOrigin: 'Pyro-gen is fire-maker, from Greek pyr (fire). Endogenous is endo- (within) + genes (born) — the one your own body makes, as against a pathogen acting as one. Inter-leukin is the messenger between (inter) white cells (leukocytes).',
      chunking: 'Every sign of inflammation traces to one change: capillaries become more permeable and blood flow rises. Redness, heat, swelling and the arrival of clotting factors and complement all follow from that single event.',
      comparison: 'Inflammation is local and fever is systemic, and the same logic runs through both — raise the temperature and the chemistry goes faster. Inflammation does it in one patch of tissue, fever does it to the whole body.',
      story: 'Pain gets counted as damage. Here it is listed as a function: the mast cell chemicals stimulate the sensory neurons deliberately, so that the person notices and removes the cause.',
    },
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
    skills: [
      'One change explains the whole local picture: capillaries become more permeable. Redness, heat, swelling, the arrival of phagocytes and the arrival of complement and clotting factors are all consequences, so a question about any of them is answerable from that single fact.',
      'Heat is not a symptom to be suppressed in this account — it is a rate control. Both locally and systemically the point is faster chemistry, and the 10% per degree figure is the number that makes that concrete.',
      'A pyrogen can be the pathogen or your own macrophage\'s interleukin-1. An answer naming only the foreign source misses the mechanism the body actually uses to decide to run a fever.',
      'The plasma systems have no way into a tissue except through leaky capillaries, so anything that reduces permeability locks complement and clotting out of the site — which is what makes histamine central rather than incidental.',
    ],
    selfCheck: 'From blank: write the chain from mast cell to pus in six steps. Then write the fever chain from pyrogen to faster repair, with the two numbers in it.',
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
    lesson: {
      explanation: 'T cells are not one thing. Four types do four different jobs, and the differences are worth holding separately because two of them explain clinical facts. Cytotoxic T cells are responsible for cell-mediated immunity: they enter peripheral tissues and attack antigens physically and chemically. Finding a target bound to a Class I MHC protein, a cytotoxic T cell destroys it in one of three ways — releasing perforin, secreting a poisonous lymphotoxin, or activating the genes in the target cell\'s own nucleus that make it die, which is apoptosis. This takes about two days or more before it is effective, so an infection can spread in the meantime. Memory T cells are the answer to that delay: they respond to antigens already encountered by cloning more lymphocytes, so on a second exposure the cytotoxic response is prompt and effective before the infection worsens. Helper T cells stimulate both T cells and B cells, and the source calls them absolutely vital — because they must activate B cells before those B cells can produce any antibody at all. That single dependency is why AIDS patients, who lose a great many helper T cells, have reduced immunity across the board rather than only in one arm of it. Suppressor T cells inhibit T cell and B cell activity and moderate the immune response, releasing inhibitory cytokines called suppression factors. They take longer to activate than the other types, and most CD8 T cells become cytotoxic rather than suppressor cells, so suppressors act after the initial response rather than during it — limiting how far the immune system escalates from a single stimulus. The CD markers sort them: CD8 sits on cytotoxic and suppressor T cells, CD4 on helper T cells.',
      keyFacts: [
        'Four types: cytotoxic, memory, helper, suppressor.',
        'CYTOTOXIC — cell-mediated immunity; attacks antigens directly, physically and chemically.',
        'A cytotoxic T cell kills three ways: perforin, a poisonous lymphotoxin, or triggering the target\'s own apoptosis genes.',
        'It takes about two days or more to become effective, during which the infection can spread.',
        'MEMORY — responds to antigens already met by cloning more lymphocytes, giving a prompt second response.',
        'HELPER — stimulates both T cells and B cells; B cells cannot make antibody until a helper T cell activates them.',
        'Losing helper T cells (AIDS) reduces immunity broadly, because both arms depend on them.',
        'SUPPRESSOR — inhibits T and B cell activity via inhibitory cytokines called suppression factors.',
        'Suppressors take longer to activate, and most CD8 cells become cytotoxic rather than suppressor — so they act AFTER the initial response.',
        'CD8 marks cytotoxic and suppressor T cells; CD4 marks helper T cells.',
      ],
      prerequisites: ['abct2326-mhc-costimulation'],
      examples: [
        'A second exposure to the same pathogen is dealt with in hours rather than days — that difference is the memory T cell.',
        'The reason a helper T cell defect looks like a failure of antibody production as well as of cell-mediated immunity is that B cells wait for its permission.',
      ],
    },
    memory: {
      wordOrigin: 'Cyto-toxic is cell-poisoning. Lympho-toxin is the poison a lymphocyte secretes. Apo-ptosis is Greek for a falling away, as leaves from a tree — the cell dismantles itself rather than being burst.',
      chunking: 'Two accelerators and two brakes, offset in time. Cytotoxic and helper drive the response; memory makes the next one faster; suppressor slows this one down once it is under way.',
      comparison: 'Cytotoxic and suppressor share the CD8 marker and do opposite jobs, which is the clearest warning in this topic that a marker is not a function. What separates them is timing: most CD8 cells become cytotoxic, and the few suppressors activate late.',
      story: 'The helper T cell is the single point of failure. It does no killing and makes no antibody, yet losing it costs you both — which is exactly what HIV exploits.',
    },
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
    skills: [
      'A CD marker tells you which MHC class a T cell reads, not what it does — CD8 covers both the killer and the brake. Sorting T cells by marker alone will always merge those two.',
      'The helper T cell is a single point of failure for BOTH arms, and that is the fact that makes CD4 count a meaningful clinical number: a patient can have every effector cell intact and still be immunocompromised.',
      'Two days is the number that makes memory cells make sense. Primary cytotoxic responses are slow enough for an infection to spread, so the whole value of prior exposure — and of vaccination — is skipping that delay.',
      'Suppression is scheduled late by design: suppressors activate slowly and most CD8 cells do not become them, so the immune system is built to escalate first and moderate afterwards.',
    ],
    selfCheck: 'Write the four T cells in a column. Beside each put its CD marker, its MHC class, its job, and its timing relative to the others.',
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
    lesson: {
      explanation: 'Adaptive immunity is not something you are born with. You develop it when you meet a specific antigen, and only for that antigen. How you come to have it divides two ways at once, which is why there are four routes rather than two. The first division is who made the antibody. In active immunity the body responds to an antigen and makes its own; in passive immunity antibodies are transferred from another source and your own cells make nothing. The second division is how the exposure happened — naturally, by living in the world, or artificially, by deliberate intervention. Cross them and the four routes fall out. Naturally acquired active immunity: you meet the antigen by ordinary environmental exposure and your body makes antibody in response. Artificially induced active immunity: immunisation, a vaccine containing a dead or inactivated pathogen, or antigens derived from it, so your body makes the antibody without the disease. Naturally acquired passive immunity: a baby receives antibodies across the placenta from the mother, or through breast milk. Artificially induced passive immunity: a person is given antibodies to fight an infection or prevent a disease — the source\'s example is someone bitten by a rabid animal, injected with antibodies against the rabies virus. Underneath sits the other division of adaptive immunity, the one about which cells do the work. T cells give cell-mediated, or cellular, immunity, which defends against abnormal cells and pathogens inside cells. B cells give antibody-mediated, or humoral, immunity, which defends against antigens and pathogens in body fluids. Both matter because they cover different situations: an activated T cell defends against pathogens inside cells and does not respond to antigen in solution, while antibodies cannot cross plasma membranes and so cannot reach anything hiding inside one. The two arms are joined by the helper T cell, which is part of cell-mediated immunity and yet stimulates the B cells that produce antibody.',
      keyFacts: [
        'You are NOT born with adaptive immunity — it develops on exposure to a specific antigen.',
        'ACTIVE = your body makes the antibody. PASSIVE = antibody is transferred from another source.',
        'NATURAL = ordinary exposure. ARTIFICIAL = deliberate intervention. The two axes cross, giving four routes.',
        'Naturally acquired active — environmental exposure, your body responds.',
        'Artificially induced active — vaccination: a dead or inactivated pathogen, or antigens from it.',
        'Naturally acquired passive — antibodies across the placenta, or through breast milk.',
        'Artificially induced passive — injected antibodies, e.g. after a bite from a rabid animal.',
        'T cells = cell-mediated (cellular) immunity — abnormal cells and pathogens INSIDE cells.',
        'B cells = antibody-mediated (humoral) immunity — antigens and pathogens in BODY FLUIDS.',
        'Activated T cells do not respond to antigen in solution; antibodies cannot cross plasma membranes.',
        'The helper T cell links the two arms: cell-mediated itself, but it stimulates B cells.',
      ],
      prerequisites: ['abct2326-innate-adaptive'],
      examples: [
        'A vaccine and a natural infection produce the same kind of immunity — active — because in both your own cells make the antibody. Only the route of exposure differs.',
        'Antibodies in breast milk and antibodies injected after a rabies exposure are the same kind — passive — and both fade, because nothing in the recipient is making more.',
      ],
    },
    memory: {
      wordOrigin: 'Humoral is from the old humours — the body fluids — which is exactly where antibody-mediated immunity acts. Passive and active carry their ordinary English sense: who is doing the work.',
      chunking: 'Two questions, in this order. Whose antibody is it — yours (active) or someone else\'s (passive)? Then: how did it happen — by living (natural) or by needle (artificial)? Two questions give four answers, and the grid never needs memorising as four separate facts.',
      comparison: 'Active against passive is the difference that predicts duration. Active immunity leaves cells that can make more antibody, so it lasts; passive immunity is a delivery of finished antibody with nothing behind it, so it fades.',
      story: 'Two of the four routes are things done to you before you could consent to either: the antibodies that crossed the placenta, and the ones in the milk. The immune system\'s first defence is borrowed.',
    },
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
    skills: [
      'Two independent questions, not one four-way list: whose antibody is it, and how did the exposure happen. Any of the four routes can be reconstructed from those two answers, and confusing "artificial" with "passive" is the mistake the grid exists to prevent.',
      'Active or passive predicts DURATION, and the reason is mechanical: active immunity leaves cells that can make more antibody, passive delivers a finite quantity with nothing behind it. That single distinction answers most questions about how long protection lasts.',
      'The dividing line between the two arms is a physical one — an antibody cannot cross a plasma membrane. Inside a cell is T cell territory, in the fluids is B cell territory, and every apparent exception traces back to that.',
      'The two arms are not independent: the helper T cell is cell-mediated and yet B cells cannot produce antibody without it, so damage to cell-mediated immunity shows up in antibody levels too.',
    ],
    selfCheck: 'Draw the 2×2 — active/passive against natural/artificial — and fill each cell with its example. Then write, under the grid, which row lasts and why.',
    sourceRefs: [
      { ref: 'phys.susan10', location: 'p8 "B cells provide antibody mediated immunity" — and T cells cell-mediated immunity' },
      { ref: 'phys.susan10', location: 'p8 "Active immunity develops after exposure to an antigen"; immunisation as the artificially induced form' },
      { ref: 'phys.susan10', location: 'p8 naturally acquired passive immunity — "a baby can acquire this by receiving antibodies by crossing the placenta" from the mother, or through breast milk' },
      { ref: 'phys.susan10', location: 'p8 artificially induced passive immunity — "someone who was bitten by a rabid animal gets injections containing antibodies"' },
      { ref: 'phys.susan10', location: 'p8 "antibodies (produced by activated B cells) that cannot cross plasma membranes"' },
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
      "syllabusRef": {
        "ref": "edb.bio",
        "location": "Compulsory I \"Cells and Molecules of Life\" — cell membrane structure and membrane transport."
      },
      "beyond": [
        {
          "t": "Membrane proteins split into six named classes — anchoring, recognition, enzymes, receptor, carrier, channel — as a list to reproduce rather than a general \"proteins do jobs\".",
          "src": {
            "ref": "phys.1.2026",
            "location": "p10 \"1. Anchoring proteins (stabilizers)\""
          }
        },
        {
          "t": "The composition of cytosol given as four contrasts: high potassium / low sodium, high protein, high carbohydrate / low amino acid and fat.",
          "src": {
            "ref": "phys.1.2026",
            "location": "p8 \"High potassium/low sodium\""
          }
        },
        {
          "t": "What is actually IN the membrane besides phospholipid: glycolipids of the glycocalyx, cholesterol between the tails, integral proteins spanning it, integral glycoproteins, peripheral proteins on one face, and gated channels — with the bilayer measured at 2 nm.",
          "src": {
            "ref": "phys.1.2026",
            "location": "p9 \"The Plasma Membrane\""
          }
        },
        {
          "t": "The two fluid compartments named and separated: cytosol inside, and extracellular or interstitial fluid — a watery medium that surrounds a cell — outside.",
          "src": {
            "ref": "phys.1.2026",
            "location": "p8 \"Plasma Membrane (Cont’d)\""
          }
        }
      ]
    },
    "lesson": {
      "explanation": "The plasma membrane is an exquisitely selective barrier (~6–10 nm thick overall, with its core phospholipid bilayer measuring 2 nm) that physically isolates the intracellular living contents of the cell from its surrounding extracellular fluid. The membrane performs four essential general functions: physical isolation from the extracellular environment, regulation of molecular exchange with surroundings, sensitivity to external environmental changes, and structural support through cytoskeletal and extracellular anchoring. Its architecture conforms to the fluid mosaic model, consisting of an amphipathic phospholipid bilayer where hydrophilic phosphate heads orient outwards toward the watery extracellular fluid and intracellular cytosol, while hydrophobic fatty acid tails face inward away from water to form a nonpolar core. Cholesterol molecules interspersed among the hydrophobic tails buffer membrane fluidity across varying temperatures, preventing packing at cold temperatures and excessive fluidity at body heat. Glycolipids and glycoproteins project branched oligosaccharide chains into the extracellular space to form the glycocalyx, an outer sugar coating vital for lubrication, cellular anchoring, receptor binding, and immunological self-recognition. The membrane maintains distinct chemical compositions between the cytosol and extracellular fluid: cytosol features high potassium (K+) and low sodium (Na+), high concentrations of dissolved proteins (imparting a negative resting potential), and substantial carbohydrate reserves, whereas extracellular fluid contains high sodium, low potassium, and low protein. Suspended in or attached to the bilayer are membrane proteins, categorized structurally into integral proteins (which span the membrane as transmembrane proteins) and peripheral proteins (bound to inner or outer surfaces). Functionally, membrane proteins comprise six discrete classes: (1) Anchoring proteins (stabilizers), which attach the membrane to the internal cytoskeleton or external protein fibres to stabilize cellular architecture; (2) Recognition proteins (identifiers), typically glycoproteins that tag the cell as 'self' to avert immune destruction; (3) Enzymes, which catalyze specific metabolic reactions on the extracellular or intracellular membrane surface; (4) Receptor proteins, possessing specific binding sites for extracellular ligands (such as hormones and neurotransmitters) that trigger intracellular signaling cascades; (5) Carrier proteins, which bind specific solutes (e.g. glucose, amino acids) and undergo conformational changes to transport them across the membrane; and (6) Channel proteins, central water-filled pores that facilitate passive diffusion of ions or water down their electrochemical gradients, split into open leak channels and gated channels (voltage-, ligand-, or mechanically gated).",
      "plain": "The plasma membrane is the protective outer envelope of the cell. It consists of a double layer of phospholipids with hydrophilic heads facing the water inside and outside, and oily hydrophobic tails hiding inside. Cholesterol keeps it flexible, while sugar chains form the glycocalyx ID tag. Crucially, the membrane is packed with six kinds of proteins: anchoring proteins (hold it in place), recognition proteins (ID tags), enzymes (speed up reactions), receptors (catch chemical signals like hormones), carrier proteins (escort specific molecules across), and channels (tunnels that let ions and water pass through).",
      "keyFacts": [
        "The core phospholipid bilayer is an amphipathic barrier ~2 nm thick.",
        "Hydrophilic phosphate heads face watery fluids; hydrophobic fatty acid tails form the nonpolar interior.",
        "Cholesterol molecules intercalate between fatty acid tails to modulate membrane fluidity and stability.",
        "The glycocalyx consists of carbohydrate chains from glycoproteins and glycolipids providing cell recognition.",
        "Cytosol has high K+, low Na+, high dissolved proteins, and carbohydrate storage compared to extracellular fluid.",
        "Anchoring proteins stabilize cell position by binding cytoskeleton internally or extracellular fibers externally.",
        "Recognition proteins are cell-surface identifiers (glycoproteins) preventing autoimmune destruction.",
        "Enzymes catalyze chemical reactions at the inner or outer surface of the plasma membrane.",
        "Receptor proteins bind specific extracellular ligands to initiate intracellular regulatory responses.",
        "Carrier proteins transport specific solutes via conformational changes, whereas channels form water-filled pores."
      ],
      "prerequisites": [
        "abct2326-cells-organisation"
      ],
      "examples": [
        "Insulin receptors are receptor proteins spanning pancreatic target cell membranes; insulin binding triggers glucose carrier (GLUT4) insertion to facilitate cellular glucose uptake.",
        "Cardiac action potentials rely on specialized voltage-gated sodium channels and L-type calcium channels to initiate myocyte contraction."
      ]
    },
    "memory": {
      "chunking": "Six protein classes acronym: A-R-E-R-C-C (Anchoring, Recognition, Enzyme, Receptor, Carrier, Channel).",
      "comparison": "Carrier vs Channel: Channels are open water-filled pores through which ions diffuse continuously when open; carriers physically bind solute and flip conformation one cycle at a time.",
      "visualCue": "Picture a secure border wall: phospholipid bricks, cholesterol mortar, antenna ID tags (glycocalyx), guard receptors checking passports, and tunnel gates (channels).",
      "teachBack": "Explain the four differences between cytosol and extracellular fluid, then name and describe all six membrane protein classes."
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
    "skills": [
      "Distinguish between integral and peripheral membrane proteins based on structural membrane interaction.",
      "Predict how altering specific membrane transport proteins alters intracellular fluid composition and resting potential."
    ],
    "selfCheck": "Recite all six classes of membrane proteins and explain the difference between a channel and a carrier.",
    "visuals": [
      {
        "fig": "plasmaMembrane"
      },
      {
        "fig": "cellAnatomy"
      },
      {
        "gen": true
      }
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
      "covers": "most",
      "dsePart": "core",
      "syllabusRef": {
        "ref": "edb.bio",
        "location": "Compulsory I \"Cells and Molecules of Life\" — cell organelles and their functions."
      },
      "beyond": [
        {
          "t": "Organelles classified strictly into non-membranous (no membrane, in direct cytosol contact) versus membranous (surrounded by lipid membranes, isolated compartments).",
          "src": {
            "ref": "phys.1.2026",
            "location": "p6 \"Anatomy of a Model Cell (Part 2)\""
          }
        },
        {
          "t": "Primary cilia acting as solitary environmental sensors distinguished from motile cilia that beat in coordinated waves.",
          "src": {
            "ref": "phys.1.2026",
            "location": "p11 \"Microvilli & Cilia\""
          }
        },
        {
          "t": "Proteasomes explicitly classified as nonmembranous organelles dedicated to hydrolyzing ubiquitin-tagged damaged proteins.",
          "src": {
            "ref": "phys.1.2026",
            "location": "p6 \"Anatomy of a Model Cell (Part 2)\""
          }
        },
        {
          "t": "The three destination paths of Golgi products: secretory vesicles, membrane renewal vesicles, and lysosomes.",
          "src": {
            "ref": "phys.1.2026",
            "location": "p20 \"Products of Golgi Apparatus\""
          }
        }
      ]
    },
    "lesson": {
      "explanation": "Eukaryotic cellular functions are compartmentalized within intracellular structures called organelles, which are systematically divided into non-membranous and membranous classes based on their physical relationship with the cytosol. Non-membranous organelles lack a surrounding lipid membrane and remain in direct, continuous physical contact with the cytoplasm: (1) Cytoskeleton: an internal protein framework consisting of thin microfilaments (composed of actin, 7 nm diameter, forming the terminal web and driving cellular motility), intermediate filaments (insoluble protein fibres, 8–12 nm, providing tensile strength and stabilizing organelle positions), and microtubules (hollow cylinders of tubulin, 25 nm, acting as monorail transport tracks, forming centrioles and the mitotic spindle); (2) Microvilli: small, non-motile finger-like membrane extensions packed with actin filaments that amplify cell surface area for intestinal and renal absorption; (3) Centrosome and Centrioles: the microtubule organizing center containing two perpendicular cylindrical centrioles (nine microtubule triplets) that orchestrate chromosome movement during mitosis; (4) Cilia: microtubule-based surface projections split into primary cilia (solitary sensory antennas on most cells detecting flow and chemical signals) and motile cilia (containing a 9+2 doublet array that beat rhythmically to sweep mucus and fluids across respiratory and oviduct surfaces); (5) Ribosomes: dense ribonucleoprotein complexes (small and large subunits) that translate mRNA into polypeptide chains, occurring as free ribosomes in cytosol (synthesizing intracellular proteins) or fixed ribosomes bound to the rough endoplasmic reticulum (synthesizing secretory, membrane, and lysosomal proteins); and (6) Proteasomes: cylindrical protein-degrading complexes containing proteases that rapidly disassemble ubiquitin-tagged damaged, abnormal, or short-lived regulatory proteins. In contrast, Membranous organelles are completely enclosed within phospholipid bilayer membranes that isolate their internal biochemical microenvironments from the cytosol: (1) Endoplasmic Reticulum (ER): an extensive network of folded cisternae and tubules divided into Rough ER (studded with fixed ribosomes, responsible for folding and chemical modification of newly synthesized proteins) and Smooth ER (lacking ribosomes, synthesizing lipids, phospholipids, cholesterol, steroid hormones, glycogen, and storing calcium ions); (2) Golgi Apparatus: stacks of 5–6 flattened membranous discs (cisternae) functioning as the cell's post office, which receives transport vesicles from the ER at its cis face, modifies glycoproteins, and sorts them at its trans face into three major product pathways: secretory vesicles for exocytosis, membrane renewal vesicles that fuse with the plasma membrane, and hydrolytic transport vesicles that become lysosomes; (3) Lysosomes: digestive vesicles containing acidic hydrolases that degrade engulfed pathogens, recycle damaged organelles (autophagy), and execute autolysis during apoptosis; (4) Peroxisomes: enzymatic vesicles containing oxidases and catalase that neutralize metabolic toxins, break down fatty acids via beta-oxidation, and decompose hazardous hydrogen peroxide (H2O2); and (5) Mitochondria: double-membrane powerhouses with outer smooth membranes and deeply folded inner cristae enclosing a dense enzymatic matrix, generating over 95% of cellular ATP through the citric acid cycle and oxidative phosphorylation.",
      "plain": "Organelles are the cell's internal organs. They are grouped into non-membranous (naked to the cytoplasm) and membranous (wrapped in their own protective lipid envelopes). Non-membranous ones include the cytoskeleton framework, microvilli for absorption, centrioles for cell division, cilia for sensing or sweeping, ribosomes for building proteins, and proteasomes for shredding old proteins. Membranous ones include the rough ER (protein workshop), smooth ER (lipid factory), Golgi apparatus (sorting and packaging postal center), lysosomes (acidic recycling centers), peroxisomes (detox units), and mitochondria (the ATP power plants).",
      "keyFacts": [
        "Non-membranous organelles lack lipid envelopes and sit directly in contact with the cytosol.",
        "Membranous organelles are enclosed by phospholipid bilayers that isolate their internal biochemical reactions.",
        "The cytoskeleton consists of actin microfilaments, intermediate filaments, and tubulin microtubules.",
        "Microvilli increase absorptive surface area, while motile cilia sweep fluids across epithelial surfaces.",
        "Ribosomes translate mRNA into proteins; free ribosomes make cytosolic proteins, fixed ribosomes make secretory proteins.",
        "Proteasomes degrade abnormal or unneeded proteins tagged with ubiquitin.",
        "Rough ER modifies and folds proteins; Smooth ER synthesizes lipids, steroids, and stores calcium.",
        "Golgi apparatus modifies and packages products into secretory vesicles, membrane renewal vesicles, or lysosomes.",
        "Lysosomes contain acidic hydrolases for intracellular digestion; peroxisomes neutralize toxins and H2O2.",
        "Mitochondria possess double membranes with cristae and generate >95% of cellular ATP via aerobic respiration."
      ],
      "prerequisites": [
        "abct2326-cells-organisation",
        "abct2326-plasma-membrane"
      ],
      "examples": [
        "Hepatocytes (liver cells) contain abundant smooth endoplasmic reticulum dedicated to drug detoxification and extensive peroxisomes to neutralize metabolic hydrogen peroxide.",
        "Macrophage phagocytosis culminates in phagosome-lysosome fusion, where lysosomal acid hydrolases digest engulfed bacteria."
      ]
    },
    "memory": {
      "chunking": "Split by membrane: Non-membranous = Cytoskeleton, Microvilli, Centrosome, Cilia, Ribosomes, Proteasomes (6). Membranous = ER, Golgi, Lysosomes, Peroxisomes, Mitochondria (5).",
      "comparison": "Lysosome vs Peroxisome: Lysosomes contain acid hydrolases produced by Golgi for digestion; peroxisomes contain oxidases/catalase from free ribosomes for peroxide detox.",
      "visualCue": "Picture a factory: raw cytoskeleton girders, ribosome assembly workers, rough ER packaging line, Golgi shipping department, and furnace mitochondria.",
      "teachBack": "List the six non-membranous organelles and explain how the Golgi apparatus routes its three final vesicle destinations."
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
    "skills": [
      "Distinguish between membranous and non-membranous organelles based on histological and ultrastructural features.",
      "Trace vesicle trafficking from rough endoplasmic reticulum through the Golgi apparatus to final destinations."
    ],
    "selfCheck": "Categorize the eleven organelles into membranous versus non-membranous and describe the three products of the Golgi apparatus.",
    "visuals": [
      {
        "fig": "cellAnatomy"
      },
      {
        "fig": "plasmaMembrane"
      },
      {
        "gen": true
      }
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
      "syllabusRef": {
        "ref": "edb.bio",
        "location": "Compulsory I \"Cells and Molecules of Life\" — DNA structure and function; Compulsory IV \"Applied Ecology and Genetics\"."
      },
      "beyond": [
        {
          "t": "The nuclear envelope described specifically as a double membrane enclosing a perinuclear space, perforated by nuclear pores regulated by transport proteins.",
          "src": {
            "ref": "phys.1.2026",
            "location": "p12 \"Nuclear envelope\""
          }
        },
        {
          "t": "Nucleoli defined as transient dense nuclear bodies that synthesize ribosomal RNA (rRNA) and assemble ribosomal subunit complexes.",
          "src": {
            "ref": "phys.1.2026",
            "location": "p11 \"Nucleoli\""
          }
        },
        {
          "t": "The structural distinction between chromatin (uncoiled nucleosome chains wrapped around histones in non-dividing cells) and chromosomes (supercoiled pairs of sister chromatids during M phase).",
          "src": {
            "ref": "phys.1.2026",
            "location": "p14 \"Organization of DNA\""
          }
        },
        {
          "t": "The genetic code specified strictly as triplets of nitrogenous bases on DNA that determine the sequence of codons and amino acids in a polypeptide chain.",
          "src": {
            "ref": "phys.1.2026",
            "location": "p15 \"Triplet code\""
          }
        }
      ]
    },
    "lesson": {
      "explanation": "The cell nucleus is the largest intracellular organelle and serves as the command center for cellular homeostasis, housing over 99% of the cell's genetic blueprint. It is bounded by the nuclear envelope, a specialized double-membrane barrier consisting of an inner and outer lipid bilayer separated by a narrow perinuclear space; the outer membrane remains anatomically continuous with the rough endoplasmic reticulum. Transport between the nucleoplasm (the fluid, enzyme-, ion-, and nucleic acid-filled internal nuclear matrix) and the surrounding cytoplasm is strictly mediated by approximately 3,000 to 4,000 nuclear pores—large multi-protein channel complexes that permit passive diffusion of small water-soluble ions while demanding active, energy-dependent escort for macromolecules such as newly transcribed RNA and nuclear proteins. Within the nucleoplasm, one or more prominent dark-staining bodies called nucleoli assemble without surrounding membranes; nucleoli are specialized enzymatic factories composed of RNA, histones, and enzymes that transcribe ribosomal RNA (rRNA) and assemble the large and small subunits of ribosomes. The nuclear genetic material itself is organized structurally as deoxyribonucleic acid (DNA). In resting, non-dividing cells, DNA strands wrap tightly around alkaline protein spools called histones to form repeated bead-like complexes termed nucleosomes; this loose, diffuse filamentous network is known as chromatin. Only during cell division (mitosis) does chromatin undergo dense supercoiling and hypercondensation into visible, distinct chromosomes consisting of paired sister chromatids linked at a central centromere. The fundamental functional unit of heredity stored within DNA is the gene, which contains all triplet codes required to produce a specific protein. The genetic code is a triplet code: a linear sequence of three consecutive nitrogenous DNA bases (adenine [A], thymine [T], cytosine [C], and guanine [G]) represents a single triplet that specifies one corresponding amino acid in a polypeptide sequence.",
      "plain": "The nucleus is the cell's master archive and headquarters. It is shielded by a double-layered nuclear envelope with guarded gateways called nuclear pores that monitor all traffic in and out. Inside the watery nucleoplasm sits the nucleolus, a factory that churns out ribosome parts. The master blueprint is DNA: in normal working cells, it is loosely wound around histone proteins like thread around spools, forming chromatin. During cell division, this thread winds tightly into visible chromosomes. The genetic code uses three-letter words called triplets—combinations of A, T, C, and G—to encode each amino acid in every protein the body builds.",
      "keyFacts": [
        "The nucleus is enclosed by a double-layered nuclear envelope separated by a perinuclear space.",
        "Nuclear pores are large multi-protein complexes regulating macromolecular exchange between nucleus and cytoplasm.",
        "Nucleoplasm is the fluid matrix containing ions, enzymes, RNA, nucleotides, and DNA.",
        "Nucleoli are dense non-membranous nuclear bodies dedicated to synthesizing rRNA and assembling ribosome subunits.",
        "In non-dividing cells, DNA is wound around histone proteins as loosely coiled chromatin.",
        "During mitosis, chromatin supercoils into visible X-shaped chromosomes composed of sister chromatids.",
        "A gene is a functional DNA sequence containing the complete code for synthesizing a specific polypeptide.",
        "The genetic code is organized into base triplets: three consecutive DNA nucleotides code for one amino acid.",
        "Complementary base pairing governs DNA: Adenine pairs with Thymine, and Cytosine pairs with Guanine.",
        "The nucleus directs long-term metabolic homeostasis by dictating which enzymes and proteins are synthesized."
      ],
      "prerequisites": [
        "abct2326-cells-organisation",
        "abct2326-organelles"
      ],
      "examples": [
        "Mature human red blood cells (erythrocytes) extrude their nuclei during maturation to maximize hemoglobin packaging and gas transport capacity, but as a consequence cannot synthesize new proteins and survive only ~120 days.",
        "Skeletal muscle fibers are multinucleated syncytia resulting from the fusion of embryonic myoblasts, allowing regional nuclear control over vast cytoplasmic volumes."
      ]
    },
    "memory": {
      "chunking": "Nuclear architecture: Envelope (double barrier) → Pores (checkpoints) → Nucleoli (ribosome builders) → Chromatin/Chromosomes (data archive).",
      "comparison": "Chromatin vs Chromosome: Chromatin is open, accessible, uncoiled DNA for active daily transcription; chromosomes are tightly packed, supercoiled shipping crates used only during cell division.",
      "visualCue": "Picture a secure vault: double blast doors (envelope) with biometric security gates (nuclear pores), an on-site machine shop (nucleolus), and library filing cabinets (chromatin spools).",
      "teachBack": "Explain the difference between chromatin and chromosomes, and demonstrate how a DNA base triplet encodes genetic information."
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
    "skills": [
      "Contrast the structural state and functional accessibility of DNA in chromatin versus metaphase chromosomes.",
      "Trace the path of macromolecular import and export across the nuclear pore complex."
    ],
    "selfCheck": "Define the four structural components of the nucleus and explain why DNA is packaged as chromatin in interphase but chromosomes in mitosis.",
    "visuals": [
      {
        "fig": "cellAnatomy"
      },
      {
        "fig": "mitosisPhases"
      },
      {
        "gen": true
      }
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
      "syllabusRef": {
        "ref": "edb.bio",
        "location": "Compulsory I \"Cells and Molecules of Life\" — protein synthesis, transcription and translation."
      },
      "beyond": [
        {
          "t": "Gene activation defined as the initial physical uncoiling of chromatin and removal of histones at the promoter region by gene-activating factors.",
          "src": {
            "ref": "phys.1.2026",
            "location": "p21 \"Gene Activation\""
          }
        },
        {
          "t": "Transcription explained with the template strand read by RNA polymerase to generate complementary pre-mRNA containing codons.",
          "src": {
            "ref": "phys.1.2026",
            "location": "p22 \"Transcription\""
          }
        },
        {
          "t": "Translation detailed at ribosomal P and A sites: small subunit binding AUG start codon, tRNA anticodon pairing, peptide bond formation, and stop codon release.",
          "src": {
            "ref": "phys.1.2026",
            "location": "p21 \"Translation\""
          }
        }
      ]
    },
    "lesson": {
      "explanation": "Protein synthesis is the central molecular pathway through which genomic information encoded in nuclear DNA directs the assembly of structural and functional cellular proteins. The process operates in three coordinated stages: gene activation, transcription, and translation. (1) Gene Activation: In resting chromatin, genes are locked by tight histone winding. Synthesis begins when specific transcription factors bind to a control region called the promoter, located at the beginning of each gene. This uncoils the DNA double helix, temporarily removes protective histones, and separates the complementary DNA strands into a template strand (reading strand) and a coding strand. (2) Transcription: Inside the nucleus, the enzyme RNA polymerase binds to the exposed promoter of the template strand and traverses it in the 3' to 5' direction. As it proceeds, RNA polymerase reads the DNA triplets and synthesizes a complementary pre-messenger RNA (pre-mRNA) transcript in the 5' to 3' direction, matching adenine (A) on DNA with uracil (U) on RNA, thymine (T) with adenine (A), and cytosine (C) with guanine (G). Each corresponding three-nucleotide sequence on the mRNA transcript is termed a codon. Prior to nuclear exit, pre-mRNA undergoes processing where non-coding intervening sequences (introns) are excised by spliceosomes, and coding segments (exons) are spliced together into mature mRNA. The mature mRNA transcript then passes through a nuclear pore into the cytoplasm. (3) Translation: The translation phase occurs on ribosomes in the cytoplasm. It commences when a small ribosomal subunit binds to the 5' end of the mRNA strand and scans until it encounters the start codon (AUG). An initiator transfer RNA (tRNA) possessing a complementary anticodon (UAC) and carrying the amino acid methionine binds to the start codon at the ribosomal peptidyl (P) site. The large ribosomal subunit then docks to complete the functional ribosome. During elongation, the next mRNA codon sits exposed at the aminoacyl (A) site; a matching tRNA carrying its specific amino acid docks into the A site. Ribosomal peptidyl transferase catalyzes a peptide bond between the adjacent amino acids. The ribosome then translocates downstream by exactly one codon: the uncharged tRNA exits via the E site, the growing polypeptide chain shifts into the P site, and the next empty codon enters the A site. This iterative cycle repeats until a stop codon (UAA, UAG, or UGA) is reached. No tRNA recognizes stop codons; instead, a protein release factor binds, prompting immediate hydrolysis and release of the completed polypeptide chain, followed by ribosomal subunit dissociation.",
      "plain": "Building a protein is like copying an ancient recipe from a reference library and baking it in the kitchen. First, gene activation unlocks the master recipe book by peeling away histone covers at the promoter. Second, transcription happens in the nucleus: RNA polymerase reads the DNA template strand and writes a working copy called messenger RNA (mRNA), replacing thymine with uracil; the mRNA copy is trimmed and leaves through a nuclear pore. Third, translation happens at ribosomes in the cytoplasm: the ribosome reads three-letter mRNA codons, matching each one with transfer RNA (tRNA) carrying the correct amino acid. The ribosome links the amino acids with peptide bonds into a growing chain until a stop codon says the dish is done.",
      "keyFacts": [
        "Gene activation starts at the promoter, uncoiling chromatin and exposing the template strand.",
        "RNA polymerase reads the DNA template strand in the 3' to 5' direction.",
        "Transcription synthesizes mRNA in the 5' to 3' direction using complementary base pairing (A-U, T-A, C-G).",
        "A codon is a three-nucleotide sequence on mRNA specifying a single amino acid.",
        "Pre-mRNA undergoes processing where introns are spliced out and exons are joined into mature mRNA.",
        "Mature mRNA migrates from the nucleoplasm to the cytoplasm via nuclear pores.",
        "Translation begins at the start codon (AUG), which codes for methionine.",
        "tRNA molecules carry specific amino acids and dock using complementary three-base anticodons.",
        "Ribosomes form peptide bonds between adjacent amino acids and translocate one codon at a time.",
        "Translation terminates when the ribosome encounters a stop codon (UAA, UAG, or UGA), releasing the polypeptide."
      ],
      "prerequisites": [
        "abct2326-nucleus-genetic-code",
        "abct2326-organelles"
      ],
      "examples": [
        "Pancreatic beta cells respond to hyperglycemia by activating transcription of the insulin gene, translating preproinsulin on rough ER ribosomes, and packaging active insulin into secretory granules for exocytosis.",
        "Duchenne muscular dystrophy is frequently caused by frameshift mutations (deletions or insertions of 1–2 bases) that alter downstream triplet codon reading, generating premature stop codons and truncated, nonfunctional dystrophin proteins."
      ]
    },
    "memory": {
      "chunking": "Three-step dogma: Unlock gene (Activation) → Transcribe message in nucleus (Transcription) → Translate into protein at ribosome (Translation).",
      "comparison": "Codon vs Anticodon: The codon is the 3-base sequence on messenger RNA; the anticodon is the complementary 3-base sequence on transfer RNA that brings the correct amino acid.",
      "visualCue": "Picture a scriptwriter (DNA) dictating a script to a messenger (mRNA) who runs out the door to a factory assembly line (ribosome) where worker tRNAs clip parts together in order.",
      "teachBack": "Walk through transcription in the nucleus and translation at the ribosome, explaining how base pairing ensures accurate sequence fidelity at each stage."
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
    "skills": [
      "Translate any given DNA template triplet sequence into its corresponding mRNA codon and tRNA anticodon.",
      "Differentiate the intracellular compartments and catalytic enzymes of transcription versus translation."
    ],
    "selfCheck": "Outline the sequential events of protein synthesis from promoter binding to release factor termination, identifying where each occurs in the cell.",
    "visuals": [
      {
        "fig": "cellAnatomy"
      },
      {
        "gen": true
      }
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
      "syllabusRef": {
        "ref": "edb.bio",
        "location": "Compulsory I \"Cells and Molecules of Life\" — cell cycle, mitosis and meiosis."
      },
      "beyond": [
        {
          "t": "Interphase phases defined specifically: G0 (specialized quiescence), G1 (organelle replication), S phase (semiconservative DNA duplication), and G2 (protein synthesis & centriole completion).",
          "src": {
            "ref": "phys.1.2026",
            "location": "p24 \"Cell Life Cycle\""
          }
        },
        {
          "t": "The four continuous phases of mitosis — Prophase, Metaphase, Anaphase, Telophase — described by spindle attachment, kinetochores, and chromatid migration.",
          "src": {
            "ref": "phys.1.2026",
            "location": "p25 \"Mitosis\""
          }
        },
        {
          "t": "Comparison of Mitosis (one division producing two identical diploid somatic cells) with Meiosis (two divisions yielding four genetically distinct haploid gametes with crossing over).",
          "src": {
            "ref": "phys.1.2026",
            "location": "p27 \"Meiosis\""
          }
        }
      ]
    },
    "lesson": {
      "explanation": "The cell life cycle encompasses the orderly sequence of developmental events between a cell's mitotic formation and its subsequent division into two daughter cells. The cycle is partitioned into two major intervals: Interphase and M Phase (Mitosis and Cytokinesis). During Interphase, which occupies approximately 90% or more of the cycle duration, the cell is metabolically active and performs its differentiated physiological tasks. Interphase comprises four distinct sub-phases: (1) G0 (quiescence): a non-dividing state where specialized cells (such as mature neurons and skeletal muscle fibres) carry out mature functions indefinitely without preparing for replication; (2) G1 phase (first gap): the cell experiences vigorous protein synthesis, metabolic growth, and duplicates its cytoplasmic organelles and centriole precursors; (3) S phase (synthetic phase): the cell replicates its entire nuclear genome through semiconservative DNA duplication via DNA polymerase, synthesizing identical sister chromatids linked at centromeres and duplicating histones; and (4) G2 phase (second gap): a brief checkpoint interval characterized by intense enzymatic and structural protein synthesis (especially tubulin for the mitotic spindle) and completion of centriole replication. Following interphase, the cell enters M Phase. Mitosis accomplishes nuclear division in somatic cells, preserving chromosome number to produce two genetically identical diploid (2n = 46) nuclei across four successive stages: (1) Prophase: chromatin condenses into distinct microscopically visible chromosomes composed of paired sister chromatids joined at a centromere with proteinaceous kinetochores; nucleoli disappear; the nuclear envelope fragments into vesicles; and two centrosomes migrate toward opposite cellular poles, polymerizing microtubules to establish the mitotic spindle; (2) Metaphase: spindle microtubules attach to kinetochores and align all chromosomes along the central equatorial plane, forming the metaphase plate; (3) Anaphase: the centromere connecting each pair of sister chromatids cleaves simultaneously, separating them into individual daughter chromosomes that are pulled by motor proteins along shortening kinetochore microtubules toward opposite poles, while polar microtubules elongate the cell; and (4) Telophase: daughter chromosomes reach the poles and uncoil back into diffuse chromatin; new nuclear envelopes assemble around each chromosomal cluster from ER fragments; and nucleoli reappear within the newly established daughter nuclei. Cytokinesis usually overlaps late anaphase and telophase: an actin and myosin contractile ring constricts the plasma membrane at the equatorial plane, deepening a cleavage furrow that pinches the cytoplasm into two completely independent daughter cells. Mitosis is contrasted with Meiosis, a specialized two-step reductive cell division occurring exclusively in germline cells within the gonads (testes and ovaries); meiosis features homologous chromosome pairing (synapsis) and genetic crossing-over in Prophase I, followed by two successive division rounds without intervening DNA replication, generating four genetically unique haploid (1n = 23) gametes (spermatozoa or oocytes).",
      "plain": "The cell cycle is the life story of a cell. Most of its life is spent in interphase getting ready: G1 grows organelles, S phase copies all DNA so each chromosome has a twin sister chromatid, and G2 finishes building the division machinery. When it is time to divide, somatic cells run mitosis in four steps (PMAT): Prophase packs DNA into visible chromosomes and builds the spindle; Metaphase lines them up along the middle; Anaphase pulls sister chromatids apart to opposite ends; and Telophase builds two new nuclear houses around them. Cytokinesis pinches the cell in half with a microscopic belt. Mitosis makes two identical diploid clones (normal body cells); meiosis makes four genetically unique haploid sperm or egg cells.",
      "keyFacts": [
        "Interphase occupies ~90% of the cell cycle: divided into G0, G1, S, and G2 phases.",
        "G0 represents specialized metabolic quiescence where mature cells do not divide.",
        "S phase accomplishes semiconservative DNA replication, producing identical sister chromatids.",
        "G2 phase completes final protein synthesis and centriole replication before mitosis.",
        "Mitosis consists of four sequential stages: Prophase, Metaphase, Anaphase, and Telophase (PMAT).",
        "Prophase: chromatin condenses into visible chromosomes, envelope breaks down, spindle forms.",
        "Metaphase: chromosomes align along the central equatorial metaphase plate.",
        "Anaphase: centromeres split and sister chromatids are pulled to opposite cellular poles.",
        "Telophase: nuclear envelopes reassemble around daughter chromosomes as they uncoil into chromatin.",
        "Cytokinesis pinches cytoplasm via an actin-myosin contractile ring forming a cleavage furrow."
      ],
      "prerequisites": [
        "abct2326-nucleus-genetic-code"
      ],
      "examples": [
        "Skin epidermal basal cells and gastrointestinal epithelial cells constantly cycle through mitosis to replace shed surface cells every few days, rendering them highly sensitive to chemotherapy drugs that target mitotic spindle assembly.",
        "Mature adult cardiac myocytes and central nervous system neurons permanently arrest in the G0 phase, explaining why infarcted myocardium and transected spinal cord tracts cannot regenerate functional muscle or nervous tissue."
      ]
    },
    "memory": {
      "chunking": "Cycle phases: Interphase (G0 → G1 → S → G2) followed by Mitosis (P-M-A-T) and Cytokinesis.",
      "comparison": "Mitosis vs Meiosis: Mitosis = 1 division, 2 identical diploid (2n) daughter somatic cells, for growth/repair; Meiosis = 2 divisions, 4 diverse haploid (1n) gametes, for reproduction.",
      "visualCue": "Picture PMAT: P = Pack chromosomes, M = Middle lineup, A = Apart pulling, T = Two new nuclei.",
      "teachBack": "Recite the four sub-phases of interphase and walk through the mechanical events of Prophase, Metaphase, Anaphase, and Telophase out loud."
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
    "skills": [
      "Identify the distinct stages of mitosis from histological photomicrographs or schematic diagrams.",
      "Predict how pharmacologic or genetic disruption of specific cell cycle checkpoints affects tissue growth."
    ],
    "selfCheck": "Walk through PMAT step-by-step from memory, stating what happens to the nuclear envelope, chromosomes, and mitotic spindle in each phase.",
    "visuals": [
      {
        "fig": "mitosisPhases"
      },
      {
        "fig": "cellAnatomy"
      },
      {
        "gen": true
      }
    ],
    "sourceRefs": [
      {
        "ref": "phys.1.2026",
        "location": "p24 \"Cell Life Cycle\""
      },
      {
        "ref": "phys.1.2026",
        "location": "p25 \"Mitosis\""
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
        "location": "p26 \"Mitosis\""
      },
      {
        "ref": "phys.1",
        "location": "p28 \"Meiosis\""
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
      "syllabusRef": {
        "ref": "edb.bio",
        "location": "Compulsory I \"Cells and Molecules of Life\" — human tissues."
      },
      "beyond": [
        {
          "t": "The five defining hallmarks of epithelia: cellularity, polarity (apical vs basal), basement membrane attachment, avascularity, and ongoing regeneration.",
          "src": {
            "ref": "phys.1.2026",
            "location": "p33 \"Characteristics of Epithelia\""
          }
        },
        {
          "t": "The two-dimensional classification matrix: cell layer count (simple vs stratified) crossed with cell cross-sectional shape (squamous, cuboidal, columnar).",
          "src": {
            "ref": "phys.1.2026",
            "location": "p34 \"Classification of Epithelia\""
          }
        },
        {
          "t": "Glandular epithelia split strictly by discharge route: endocrine glands (ductless, releasing hormones into interstitial fluid and blood) versus exocrine glands (secreting via ducts onto surfaces).",
          "src": {
            "ref": "phys.1.2026",
            "location": "p36 \"Glandular Epithelia\""
          }
        }
      ]
    },
    "lesson": {
      "explanation": "Epithelial tissue comprises continuous sheets of specialized cells that cover all exposed external body surfaces, line internal cavities and passageways, and form secretory glands. Epithelia are defined by five fundamental histological characteristics: (1) Cellularity: cells are bound tightly together with minimal intervening extracellular space via specialized cell junctions (tight junctions, desmosomes, and gap junctions); (2) Polarity: epithelial cells possess distinct structural and functional polarity, presenting an exposed apical surface facing the external environment or internal lumen (frequently adorned with microvilli or motile cilia) and an attached basal surface resting on underlying structures; (3) Attachment: the basal surface firmly anchors to a specialized non-cellular basement membrane (basal lamina) synthesized jointly by the epithelial cells and adjacent connective tissue; (4) Avascularity: epithelia completely lack blood vessels, acquiring essential oxygen and nutrients entirely by diffusion across the basement membrane from capillaries in underlying vascular connective tissue; and (5) Regeneration: continuous stem cell division in the basal layer rapidly replaces damaged or sloughed surface cells. Epithelia execute four vital physiological functions: physical protection against abrasion and pathogens, regulation of barrier permeability, sensory reception via neuroepithelia, and specialized secretion. Anatomists classify covering and lining epithelia using a two-variable histological matrix based on cell layer number and apical cell shape. By layer number, epithelia are either Simple (a single layer of cells resting on the basement membrane, optimized for rapid diffusion, filtration, absorption, or secretion) or Stratified (multiple cell layers stacked atop the basement membrane, engineered for mechanical protection and abrasion resistance). By cell shape, epithelia are Squamous (flat, thin, plate-like cells with flattened disc-like nuclei), Cuboidal (cube-shaped, box-like cells with spherical central nuclei), or Columnar (tall, slender rectangular prisms with elongated oval nuclei positioned near the basal lamina). Combining these yields six primary types: simple squamous (lining alveoli and vascular endothelium), simple cuboidal (kidney tubules), simple columnar (gastric and intestinal lining), stratified squamous (keratinized on skin epidermis, non-keratinized in oral cavity and esophagus), stratified cuboidal (rare sweat and mammary ducts), and stratified columnar (rare pharyngeal/urethral zones). Two specialized variants expand this framework: Pseudostratified ciliated columnar epithelium, which appears stratified because cell nuclei reside at varying heights, though every individual cell maintains direct attachment to the basement membrane (characteristic of nasal cavities, trachea, and bronchi); and Transitional epithelium (urothelium), a stratified epithelium capable of significant stretching and mechanical recoil without cellular detachment, lining the renal pelves, ureters, and urinary bladder. Glandular epithelia specialize in fluid secretion and divide strictly by delivery route: Endocrine glands are ductless glands that secrete chemical messengers (hormones) directly into interstitial fluid for systemic uptake into the bloodstream; Exocrine glands discharge secretions onto external or internal epithelial surfaces through tubular epithelial ducts (e.g. sweat glands, salivary glands, and pancreatic exocrine acini).",
      "plain": "Epithelial tissue is the body's wrapping paper and lining. It has five golden rules: packed tight with almost no gaps (cellularity), distinct top and bottom (polarity), glued down to a basement membrane (attachment), has zero blood vessels of its own (avascularity), and repairs itself lightning fast (regeneration). We classify them like a grid: by how many layers they have (simple = 1 layer for easy soaking or breathing; stratified = many layers for tough armor) and what shape the top cells are (squamous = flat like fried eggs; cuboidal = neat cubes; columnar = tall pillars). Two special types are pseudostratified (looks layered but every cell touches the bottom; lines airways) and transitional (stretches like a balloon; lines the bladder). Glands split into endocrine (ductless, puts hormones straight into blood) and exocrine (uses pipes to squirt sweat or saliva onto surfaces).",
      "keyFacts": [
        "The five hallmarks of epithelia: cellularity, polarity, basement membrane attachment, avascularity, and regeneration.",
        "Epithelial tissues are completely avascular; all nutrients must diffuse from underlying vascular connective tissue.",
        "Simple epithelia consist of a single layer, optimized for diffusion, filtration, absorption, and secretion.",
        "Stratified epithelia consist of multiple layers, specialized for mechanical protection against abrasion.",
        "Squamous cells are thin and flat; cuboidal cells are boxy cubes; columnar cells are tall rectangular columns.",
        "Simple squamous epithelium lines pulmonary alveoli and blood vessel lumens (endothelium).",
        "Simple columnar epithelium lines the stomach, small intestine, and colon with absorptive microvilli.",
        "Pseudostratified ciliated columnar epithelium lines the trachea and bronchi; all cells touch the basement membrane.",
        "Transitional epithelium (urothelium) lines the urinary bladder and ureters, stretching without losing integrity.",
        "Endocrine glands are ductless and secrete hormones into blood; exocrine glands secrete onto surfaces through ducts."
      ],
      "prerequisites": [
        "abct2326-cells-organisation"
      ],
      "examples": [
        "In cigarette smokers, chronic irritant exposure causes respiratory pseudostratified ciliated columnar epithelium to undergo squamous metaplasia into stratified squamous epithelium, losing motile cilia and crippling the mucus escalator.",
        "Pemphigus vulgaris is an autoimmune blistering dermatosis where autoantibodies target desmoglein proteins in desmosomes, destroying epithelial cellularity and causing massive epidermal detachment."
      ]
    },
    "memory": {
      "chunking": "Five hallmarks: C-P-A-A-R (Cellularity, Polarity, Attachment, Avascular, Regeneration). Classification grid: 2 layers (Simple/Stratified) × 3 shapes (Squamous/Cuboidal/Columnar) + 2 specials (Pseudostratified/Transitional).",
      "comparison": "Endocrine vs Exocrine: Endocrine is 'in' (ductless into internal blood); Exocrine is 'exit' (tubular ducts squirt onto surface).",
      "visualCue": "Picture floor tiles: simple squamous is single thin paper tiles; stratified squamous is a thick stack of cardboard; transitional is a stretchy rubber mat.",
      "teachBack": "Recite the five hallmarks of epithelium, draw the classification grid, and explain why simple squamous is ideal for alveoli while stratified squamous covers the skin."
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
    "skills": [
      "Classify any epithelial photomicrograph by layer count (simple/stratified) and surface cell shape (squamous/cuboidal/columnar).",
      "Explain how epithelial modifications (microvilli, cilia, keratinization) support regional organ functions."
    ],
    "selfCheck": "Name the five hallmarks of epithelial tissue and classify the epithelia lining pulmonary alveoli, trachea, intestine, and urinary bladder.",
    "visuals": [
      {
        "fig": "epithelialTissues"
      },
      {
        "schematic": "cellOrganisation"
      },
      {
        "gen": true
      }
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
      "syllabusRef": {
        "ref": "edb.bio",
        "location": "Compulsory I \"Cells and Molecules of Life\" — human tissues."
      },
      "beyond": [
        {
          "t": "Connective tissue defined strictly by its tripartite composition: specialized cells, extracellular protein fibres, and clear ground substance (fibres + ground substance = extracellular matrix).",
          "src": {
            "ref": "phys.1.2026",
            "location": "p37 \"Characteristics of Connective Tissue\""
          }
        },
        {
          "t": "Classification into three primary classes: Connective Tissue Proper, Fluid Connective Tissues, and Supporting Connective Tissues.",
          "src": {
            "ref": "phys.1.2026",
            "location": "p39 \"Classification of Connective Tissues\""
          }
        },
        {
          "t": "CT Proper subdivisions: Loose (areolar, adipose, reticular) versus Dense (regular, irregular, elastic).",
          "src": {
            "ref": "phys.1.2026",
            "location": "p40 \"Connective Tissue Proper\""
          }
        },
        {
          "t": "Supporting CT matrix differences: avascular cartilage with chondrocytes in lacunae versus calcified vascular bone with osteocytes in osteons.",
          "src": {
            "ref": "phys.1.2026",
            "location": "p39 \"Supporting Connective Tissues\""
          }
        }
      ]
    },
    "lesson": {
      "explanation": "Connective tissue is the most abundant, structurally diverse, and widely distributed tissue class in the human body. Unlike epithelia—which consist of densely packed cellular sheets—connective tissues are characterized by specialized cells widely dispersed within an extensive non-cellular extracellular matrix. The tissue is universally composed of three fundamental elements: (1) Specialized cells (such as fibroblasts, adipocytes, chondrocytes, and osteocytes); (2) Extracellular protein fibres (collagen fibres providing tensile strength, reticular fibres forming delicate branching networks, and elastic fibres enabling stretch and elastic recoil); and (3) Ground substance, a clear, viscous, hydrophilic fluid containing proteoglycans and hyaluronic acid that fills all spaces between cells and fibres. Together, extracellular fibres and ground substance constitute the extracellular matrix, which accounts for the overwhelming majority of connective tissue volume and determines its mechanical properties. Connective tissues perform six systemic roles: structural framework creation, fluid and solute transport, physical organ protection, tissue interconnection, energy storage (triglycerides), and pathogen defense. Histologists divide connective tissues into three major classes: (1) Connective Tissue Proper: containing varied cell populations within a syrupy ground substance. This class subdivides into Loose connective tissue—which features an open structural framework with abundant ground substance that cushions organs and absorbs shock, comprising Areolar tissue (the universal packing material beneath epithelia), Adipose tissue (specialized for lipid storage, insulation, and metabolic cushioning), and Reticular tissue (a delicate 3D stroma supporting parenchymal cells in the spleen, liver, and lymph nodes); and Dense connective tissue—dominated by densely packed collagen fibres, comprising Dense Regular connective tissue (cables of tightly packed parallel collagen fibres resisting unidirectional tension in tendons and aponeuroses), Dense Irregular connective tissue (an interwoven, multi-directional meshwork resisting tension from varied vectors in the dermis, periosteum, and organ capsules), and Elastic tissue (springy elastic fibres in arterial walls and vertebral ligaments). (2) Fluid Connective Tissues: featuring distinctive aqueous matrices without insoluble structural fibres under resting conditions: Blood—containing watery plasma (water, electrolytes, plasma proteins) and suspended formed elements (erythrocytes for gas transport, leukocytes for immune defense, thrombocytes for hemostasis); and Lymph—interstitial fluid collected by lymphatic vessels and returned to the venous circulation. (3) Supporting Connective Tissues: possessing a dense, highly specialized matrix that provides a weight-bearing framework for the entire body: Cartilage—a firm, gel-like avascular matrix rich in chondroitin sulfate, where chondrocytes reside isolated within tiny cavities called lacunae; cartilage occurs in three varieties: Hyaline cartilage (glassy, smooth collagen matrix covering synovial joints, costal cartilages, and respiratory passages), Elastic cartilage (flexible elastic fibre mesh in the external ear and epiglottis), and Fibrocartilage (dense bundles of durable collagen fibres resisting extreme compression and shearing in intervertebral discs, the pubic symphysis, and menisci); and Bone (Osseous tissue)—a rigid, mineralized matrix containing calcium phosphate crystals (hydroxyapatite) deposited upon collagen scaffolding, where osteocytes reside in lacunae interconnected by microscopic canaliculi, organized around central blood vessels into cylindrical structural units called osteons (Haversian systems).",
      "plain": "Connective tissue is the body's scaffolding, glue, and plumbing. Unlike skin cells packed shoulder-to-shoulder, connective tissue consists of scattered cells floating in a vast extracellular matrix made of protein fibres (collagen for strength, elastin for stretch) and watery jelly called ground substance. It divides into three big families: (1) Connective Tissue Proper, which splits into Loose (areolar packing cushion, fatty adipose, reticular organ webs) and Dense (regular tendons pulled in one direction, irregular dermis pulled in many directions, elastic artery walls); (2) Fluid Connective Tissues, which are liquid highways with no solid fibres (blood carrying red/white cells and platelets, and clear lymph); and (3) Supporting Connective Tissues, which bear heavy loads (avascular cartilage with chondrocytes in lacunae, and rock-hard calcified bone packed with osteocytes and blood vessels).",
      "keyFacts": [
        "Connective tissue is defined by three components: specialized cells, extracellular protein fibres, and ground substance.",
        "The extracellular matrix (protein fibres + ground substance) accounts for the bulk of connective tissue volume.",
        "The three primary classes: Connective Tissue Proper, Fluid Connective Tissues, and Supporting Connective Tissues.",
        "Loose connective tissue comprises areolar, adipose, and reticular tissues, serving as cushioning packing material.",
        "Dense regular connective tissue features parallel collagen fibres resisting pull along a single axis (tendons, ligaments).",
        "Dense irregular connective tissue features an interwoven collagen mesh resisting stress from multiple directions (dermis).",
        "Fluid connective tissues consist of blood (plasma and formed elements) and lymph.",
        "Cartilage is completely avascular; chondrocytes reside in lacunae within a chondroitin sulfate gel matrix.",
        "The three cartilage types: hyaline (joint surfaces), elastic (external ear), and fibrocartilage (intervertebral discs).",
        "Bone possesses a rigid mineralized matrix of calcium phosphate crystals and collagen organized into osteons."
      ],
      "prerequisites": [
        "abct2326-cells-organisation"
      ],
      "examples": [
        "Scurvy results from vitamin C deficiency, which cripples the enzyme prolyl hydroxylase required for collagen cross-linking; defective collagen causes blood vessel fragility, poor wound healing, and loss of teeth as periodontal ligaments fail.",
        "Osteoarthritis involves the progressive mechanical wear, enzymatic breakdown, and loss of articular hyaline cartilage capping long bones, causing bone-on-bone friction, severe joint pain, and stiffness."
      ]
    },
    "memory": {
      "chunking": "Three CT Classes: Proper (Loose & Dense) → Fluid (Blood & Lymph) → Supporting (Cartilage & Bone).",
      "comparison": "Regular vs Irregular Dense CT: Regular aligns fibres in parallel for single-direction pull (tendons); Irregular weaves fibres randomly to resist multidirectional stretching (skin dermis).",
      "visualCue": "Picture packaging: loose bubble wrap (areolar/adipose), tough nylon straps (dense tendons), water pipes (blood/lymph), stiff rubber pads (cartilage), and steel girders (bone).",
      "teachBack": "List the three core components of any connective tissue, then contrast cartilage and bone in matrix composition and vascularity."
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
    "skills": [
      "Differentiate connective tissue proper, fluid CT, and supporting CT based on matrix physical state and cellular distribution.",
      "Correlate the orientation of collagen fibres in dense regular versus dense irregular connective tissue with the mechanical forces encountered by the tissue."
    ],
    "selfCheck": "Recite the three components of all connective tissues, name the three primary classes, and distinguish the three varieties of cartilage.",
    "visuals": [
      {
        "fig": "connectiveTissues"
      },
      {
        "gen": true
      }
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
      "covers": "most",
      "dsePart": "core",
      "syllabusRef": {
        "ref": "edb.bio",
        "location": "Compulsory I \"Cells and Molecules of Life\" — animal tissues; Compulsory III \"Nervous coordination\"."
      },
      "beyond": [
        {
          "t": "The three muscle types compared across striation, nuclei per cell, voluntary/involuntary control, and unique histology (intercalated discs in cardiac muscle).",
          "src": {
            "ref": "phys.1.2026",
            "location": "p51 \"Found only in the heart\""
          }
        },
        {
          "t": "Neural tissue split into two discrete cell populations: neurons (electrically excitable transmission units) and neuroglia (supportive cells repairing and nourishing neurons).",
          "src": {
            "ref": "phys.1.2026",
            "location": "p53 \"Neural Tissue\""
          }
        },
        {
          "t": "The invariant directional rule of neuron architecture: signal reception at branching dendrites, integration in cell body, and outgoing signal conduction along the single axon.",
          "src": {
            "ref": "phys.1.2026",
            "location": "p54 \"Neuroglia\""
          }
        }
      ]
    },
    "lesson": {
      "explanation": "Muscle and neural tissues represent the body's excitable tissues, specialized for generating physical force and transmitting rapid electrical signals. Muscle tissue is dedicated to active contraction and mechanical tension generation, utilizing interactions between internal actin and myosin protein microfilaments to produce all bodily movements. Muscle tissue is categorized into three structurally and functionally distinct types: (1) Skeletal muscle: composed of very large, elongated cylindrical cells termed muscle fibers (up to 30 cm long); fibers are multinucleated with multiple peripheral nuclei lying immediately beneath the sarcolemma (resulting from embryonic myoblast fusion); fibers display prominent transverse striations due to precisely aligned sarcomeric arrangements of actin and myosin; skeletal muscle operates under voluntary somatic motor nervous system control, anchoring to skeleton via tendons to execute skeletal movement, maintain posture, and generate body heat; (2) Cardiac muscle: located strictly and exclusively within the muscular wall of the heart (myocardium); cells (cardiocytes) are shorter, branched, and typically possess a single central nucleus (occasionally two); cardiocytes are striated and contract involuntarily under the regulation of intrinsic pacemaker cells and autonomic nerve fibers; adjacent cardiocytes join end-to-end at specialized junctional complexes called intercalated discs, which combine desmosomes (anchoring intermediate filaments to withstand high systolic pressures) and gap junctions (low-resistance electrical channels allowing rapid ionic flow and synchronized contraction of the cardiac syncytium); and (3) Smooth muscle: non-striated, involuntary muscle located within the walls of hollow contracting visceral organs, blood vessels, respiratory airways, digestive tracts, the urinary bladder, and reproductive ducts; cells are small, spindle-shaped (fusiform) with a single central oval nucleus; smooth muscle lacks organized sarcomeres (actin and myosin disperse diagonally throughout cytoplasm), allowing contraction over extensive stretch ranges to regulate lumen diameter, propel food via peristalsis, and empty organs. Neural (nervous) tissue comprises the body's rapid communication network, specialized for detecting sensory stimuli, processing information, and conducting electrical nerve impulses. Approximately 98% of all neural tissue resides within the central nervous system (brain and spinal cord). Neural tissue consists of two distinct cell populations: (1) Neurons: the functional, electrically excitable cells responsible for processing and transmitting electrical impulses. A typical multipolar neuron comprises three principal anatomical regions: Cell body (soma), containing the large nucleus, prominent nucleolus, and intense protein-synthesizing machinery (Nissl bodies / rough ER); Dendrites, multiple short, highly branched cytoplasmic extensions projecting from the soma that act as antenna-like receptors receiving incoming synaptic inputs from other neurons or sensory receptors; and a single Axon (nerve fiber), an elongated cylindrical process originating at the axon hillock that propagates outgoing action potentials away from the cell body toward target synaptic terminals, where neurotransmitter release communicates with adjacent neurons, muscle fibers, or glands. Electrical signal transmission follows an invariant directional vector: incoming signals enter through branching dendrites, undergo spatial and temporal integration at the soma and axon hillock, and exit along the axon. (2) Neuroglia (glial cells): non-excitable supporting cells that outnumber neurons, maintaining homeostatic interstitial fluid composition, providing mechanical scaffolding, defending against pathogens, repairing injured tissue, and synthesizing the insulating myelin sheaths that accelerate nerve conduction velocity.",
      "plain": "Muscle tissue moves you; neural tissue controls you. Muscle comes in three distinct flavors: Skeletal (long striped voluntary muscle tied to bones, packed with multiple nuclei); Cardiac (striped involuntary heart muscle with branched cells locked together by intercalated discs so the whole heart beats as one); and Smooth (unstriped involuntary spindle-shaped muscle in the walls of hollow organs and blood vessels). Neural tissue is divided between the rock stars (neurons, which carry electrical signals) and the road crew (neuroglia, which keep neurons alive, fed, and insulated). Every neuron has a strict one-way traffic rule: dendrites receive incoming messages, the cell body thinks and decides, and the long axon fires the message out.",
      "keyFacts": [
        "Muscle tissue is specialized for contraction, containing actin and myosin contractile filaments.",
        "Skeletal muscle fibers are elongated, striated, multinucleated, and under voluntary somatic control.",
        "Cardiac muscle cells are branched, striated, single-nucleated, involuntary, and found exclusively in the heart.",
        "Intercalated discs connect cardiac myocytes via desmosomes for mechanical strength and gap junctions for electrical synchrony.",
        "Smooth muscle cells are spindle-shaped, non-striated, single-nucleated, and involuntary within hollow organ walls.",
        "Neural tissue specializes in conducting electrical impulses; ~98% is concentrated in the brain and spinal cord.",
        "Neurons perform electrical communication; neuroglia provide metabolic and structural support.",
        "Neuron anatomy: branching dendrites receive inputs; cell body (soma) integrates; single axon carries outgoing signals.",
        "The direction of electrical signaling in a neuron is strictly dendrites → soma → axon.",
        "The skin is the body's largest organ, containing all four primary tissue classes (epithelial, connective, muscle, neural)."
      ],
      "prerequisites": [
        "abct2326-cells-organisation"
      ],
      "examples": [
        "Myasthenia gravis is an autoimmune neuromuscular disorder where autoantibodies block nicotinic acetylcholine receptors at skeletal muscle motor end plates, producing progressive skeletal muscle weakness while sparing cardiac and smooth muscle.",
        "Multiple sclerosis is a chronic demyelinating disease of the central nervous system where autoimmune destruction of oligodendrocytes (neuroglia) impairs action potential propagation along CNS axons, producing motor weakness, sensory loss, and visual deficits."
      ]
    },
    "memory": {
      "chunking": "Three Muscles by where they live: Skeleton (bones), Heart (myocardium), Hollow tubes (viscera). Neuron flow: Dendrites IN → Soma DECIDES → Axon OUT.",
      "comparison": "Skeletal vs Cardiac vs Smooth: Skeletal = striped, voluntary, multi-nuclei; Cardiac = striped, involuntary, intercalated discs; Smooth = plain, involuntary, spindle-shaped.",
      "visualCue": "Picture a neuron like a tree: branches (dendrites) catch falling rain, the trunk (soma) holds the weight, and the long taproot (axon) sends sap deep into the earth.",
      "teachBack": "Compare the three muscle types across four criteria (striation, control, nucleus count, and location), then draw a neuron and label the signal flow direction."
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
    "skills": [
      "Distinguish skeletal, cardiac, and smooth muscle under light microscopy based on striations, nuclei count/position, and intercalated discs.",
      "Trace the flow of electrical information from dendrites through the soma to the axon terminal."
    ],
    "selfCheck": "Compare skeletal, cardiac, and smooth muscle across four histological features, and state the directional signaling rule of a neuron.",
    "visuals": [
      {
        "schematic": "muscleTypes"
      },
      {
        "fig": "connectiveTissues"
      },
      {
        "gen": true
      }
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
      "syllabusRef": {
        "ref": "edb.bio",
        "location": "Compulsory III \"Homeostasis\" — negative feedback mechanism."
      },
      "beyond": [
        {
          "t": "The defining functional distinction: negative feedback negates/opposes the stimulus to restore normal range, while positive feedback amplifies/reinforces the change to accelerate a process.",
          "src": {
            "ref": "phys.1.2026",
            "location": "p59 \"Positive Feedback\""
          }
        },
        {
          "t": "Thermoregulation worked example detailed: receptors in skin and hypothalamus, thermoregulatory centre in brain as control centre, sweat glands and cutaneous vessels as effectors.",
          "src": {
            "ref": "phys.1.2026",
            "location": "p60 \"Control of Body Temperature\""
          }
        },
        {
          "t": "Positive feedback detailed with blood clotting: vessel damage chemical release, platelet activation cascade, and escalating thrombus formation ending when the clot seals the breach.",
          "src": {
            "ref": "phys.1.2026",
            "location": "p61 \"Positive Feedback\""
          }
        }
      ]
    },
    "lesson": {
      "explanation": "Physiological feedback loops govern the interaction between an effector's response and the initial initiating stimulus, categorizing into two diametrically opposed mechanisms: Negative Feedback and Positive Feedback. (1) Negative Feedback: the primary, predominant mechanism of homeostatic control throughout the human body. In a negative feedback loop, the physiological response generated by the effector negates, counteracts, or opposes the original stimulus, reversing the direction of change. By continually dampening deviations, negative feedback brings the internal variable back into homeostasis so that the normal range and set point are successfully maintained. The classical worked physiological example is the Control of Body Temperature (thermoregulation): when environmental heat or physical exertion causes core body temperature to rise above the 37°C (98.6°F) set point (the stimulus), two sets of sensory receptors—temperature sensors in the skin and thermosensitive neurons in the anterior hypothalamus—detect the thermal elevation. Afferent signals travel to the control centre: the thermoregulatory centre in the brain (hypothalamus). The thermoregulatory centre integrates the data and dispatches efferent commands to two principal effectors: (a) cutaneous blood vessels, which undergo smooth muscle vasodilation to increase skin blood flow and radiate excess heat into the ambient air, and (b) sweat glands, which accelerate secretion of watery sweat to dissipate thermal energy via evaporative cooling. As heat loss accelerates, body temperature declines toward the set point; once temperature normalizes, the thermal stimulus ceases, and the effector response automatically shuts down. Conversely, when body temperature drops below normal, cutaneous vasoconstriction minimizes heat loss while skeletal muscle effectors trigger involuntary shivering to generate heat. (2) Positive Feedback: a specialized, less common regulatory mechanism where the response of the effector increases, reinforces, or amplifies the initial change of the stimulus, driving the variable further away from the starting set point. In positive feedback, the normal homeostatic range is intentionally lost temporarily; the body utilizes positive feedback not for routine stability, but to accelerate a critical, potentially life-saving or explosive process to rapid completion. The lecture details the worked example of Blood Clotting (hemostasis): damage to a blood vessel wall exposes subendothelial collagen and causes injured vascular cells to release clotting factors and tissue thromboplastin (the stimulus). Circulating platelets adhere to the damaged site and release chemical mediators (such as ADP, thromboxane A2, and serotonin). These chemicals activate and recruit additional circulating platelets, which in turn secrete even more activating chemicals in an accelerating positive feedback cascade. Simultaneously, the chemical cascade rapidly accelerates the enzymatic conversion of prothrombin into thrombin, which cleaves soluble fibrinogen into insoluble, sticky fibrin polymer threads. The fibrin mesh traps erythrocytes and platelets, forming a solid blood clot (thrombus) that physically seals the vascular rupture. The positive feedback loop ceases once the physical clot has completely sealed the breach and isolated the damaged tissue, removing the chemical stimulus. A second classic positive feedback loop operates during childbirth (labor): fetal head pressure stretches the uterine cervix, stimulating oxytocin release from the posterior pituitary, which triggers more powerful myometrial contractions, driving the fetal head harder against the cervix until delivery terminates the loop. Systems integration dictates that all eleven organ systems interact harmoniously; failure of homeostatic loops leads directly to pathophysiology.",
      "plain": "Feedback loops ask one crucial question: does the response cancel the change or blow it up? In negative feedback, the body cancels (negates) the change to bring you back to normal—like sweating when you are hot to cool down, or shivering when you are cold to warm up. That is 99% of physiology and keeps you alive. In positive feedback, the body deliberately amplifies the change to get something done fast—like a snowball rolling downhill. The prime example is blood clotting: a cut releases chemicals, which call platelets, which release more chemicals, which call a stampede of platelets until a solid plug seals the leak. Positive feedback is not an error; it is a turbo-button for emergencies that shuts off once the job is finished.",
      "keyFacts": [
        "Negative feedback: the effector's response NEGATES the stimulus, restoring the normal range and homeostasis.",
        "Positive feedback: the effector's response INCREASES the change, moving variables away from the normal range.",
        "Negative feedback is the primary mechanism of homeostatic stability in the human body.",
        "Positive feedback is used deliberately to speed up critical processes to rapid completion.",
        "In thermoregulation (negative feedback): receptors are in skin and hypothalamus; control centre is the hypothalamic thermoregulatory centre.",
        "Thermoregulatory effectors for hyperthermia: cutaneous vasodilation and sweat gland evaporation.",
        "Thermoregulatory effectors for hypothermia: cutaneous vasoconstriction and skeletal muscle shivering.",
        "In blood clotting (positive feedback): damaged cells release chemicals, initiating an accelerating platelet cascade.",
        "Positive feedback loops require an external stopping event (e.g. clot completion or child delivery) to terminate.",
        "Homeostasis operates as dynamic equilibrium; failure of feedback control causes disease or death."
      ],
      "prerequisites": [
        "abct2326-homeostasis"
      ],
      "examples": [
        "During severe hemorrhage, blood loss exceeding ~2 liters can precipitate irreversible shock: falling cardiac output reduces coronary perfusion, weakening myocardial pumping, which further drops cardiac output in a lethal, pathological positive feedback death spiral.",
        "Parturition (labor) is an endocrine positive feedback loop: cervical stretch triggers posterior pituitary oxytocin release, stimulating uterine contractions that force the fetus harder against the cervix, escalating until delivery."
      ]
    },
    "memory": {
      "chunking": "Feedback rule: Negative = Negates (stability, normal range, 99% of physiology). Positive = Promotes/Power-up (speed, clotting/labor, needs external brake).",
      "comparison": "Thermoregulation vs Clotting: Thermoregulation cancels the temperature spike to stay at 37°C; Clotting amplifies the chemical signal until a physical plug forms.",
      "visualCue": "Negative feedback is cruise control on a car (taps brakes uphill/downhill to hold 60 mph); Positive feedback is a roaring bonfire (more heat dries out more wood, making bigger flames).",
      "teachBack": "Walk through the negative feedback loop of cooling a hot body, then explain why blood clotting must use positive feedback instead of negative feedback."
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
    "skills": [
      "Differentiate negative from positive feedback loops based on whether the effector opposes or reinforces the initiating stimulus.",
      "Predict how specific pharmacological interventions (e.g. antipyretics, anticoagulants) modify homeostatic loop dynamics."
    ],
    "selfCheck": "Compare negative and positive feedback using their core defining verbs, and walk through the thermoregulation and clotting loops step-by-step.",
    "visuals": [
      {
        "schematic": "homeostasis"
      },
      {
        "gen": true
      }
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
      }
    ]
  },
  {
    id: 'phys-nerve-cellular-action-potential',
    subject: 'ABCT2326', unit: 'phys.nerv', type: 'concept',
    title: 'Nerve cell physiology: glial cells, resting potential, action potential, and synaptic transmission',
    tags: ['physiology', 'nervous', 'action-potential', 'synapse', 'high-yield'],
    lesson: {
      explanation: 'The human nervous system coordinates rapid communication via approximately 100 billion neurons supported by diverse neuroglial cells. In the central nervous system (CNS), astrocytes form the most abundant glial cell type, regulating the extracellular microenvironment, while ependymal cells line the brain ventricles and secrete cerebrospinal fluid. Myelination is anatomically segregated: in the CNS, the myelin sheath is produced by oligodendrocytes; in the peripheral nervous system (PNS), the myelin sheath is produced by Schwann Cells. The resting membrane potential (typically -70 mV) is established primarily because the resting axonal membrane possesses 50–70 times more K+ passive channels than Na+ channels, allowing potassium to leak out along its concentration gradient. The sodium-potassium pump (Na+/K+ ATPase) maintains long-term ionic gradients by actively transporting 3 Na+ ions out of the cell for every 2 K+ pumped in. When stimulation depolarizes the axon to threshold (~-55 mV), voltage-gated Na+ channels rapidly open, generating an action potential that reaches a peak of +25mV and then drops as Na+ channels inactivate and voltage-gated K+ channels open. Under the all-or-none law, once threshold has been reached, action potentials fire at uniform amplitude regardless of stimulus strength. During the absolute refractory period, Na+ channels cannot reopen; during the subsequent relative refractory period (when K+ channels are still open), a supranormal stimulus is required to fire. In myelinated axons, myelin insulates internodes, forcing Na+ and K+ to cross the membrane every 1–2 mm at the unmyelinated nodes of Ranvier. This is called saltatory conduction, which dramatically increases conduction velocity while conserving ATP. At synapses, communication is either electrical or chemical: at electrical synapses, cells are joined by gap junctions allowing direct ionic current flow; at chemical synapses, neurotransmitters mediate transmission. For example, ACh is a neurotransmitter that directly opens ion channels upon binding nicotinic receptors; in contrast, in the heart, K+ channels are opened through muscarinic G-protein pathways, causing hyperpolarization and slowing the heart rate. At postsynaptic membranes, opening Na+ or Ca2+ channels results in a graded depolarization termed an excitatory postsynaptic potential (EPSP).',
      plain: 'The brain contains 100 billion neurons supported by astrocytes (most abundant), ependymal cells (CSF), oligodendrocytes (CNS myelin), and Schwann cells (PNS myelin). Resting potential (-70 mV) is set by 50-70x more K+ leak channels and the 3 Na+ out / 2 K+ in pump. Reaching threshold triggers an all-or-none action potential peaking at +25 mV. Myelin forces ions to jump every 1-2 mm at nodes of Ranvier (saltatory conduction). Synapses communicate via gap junctions (electrical) or transmitters like ACh (chemical).',
      keyFacts: [
        'The adult human brain comprises approximately 100 billion neurons.',
        'Astrocytes represent the most abundant glial cell type; ependymal cells line the brain ventricles and secrete cerebrospinal fluid.',
        'Myelin sheath is produced by oligodendrocytes in the CNS, and by Schwann cells in the PNS.',
        'At rest, the axonal membrane has 50–70 times more K+ passive leak channels than Na+ channels.',
        'The Na+/K+ ATPase pump actively moves 3 Na+ ions out of the cell for every 2 K+ ions pumped inside.',
        'The neuronal action potential reaches a peak of +25 mV before repolarizing.',
        'Action potentials follow the all-or-none law: once threshold is reached, an action potential is fired at maximal amplitude.',
        'The relative refractory period corresponds to when K+ channels remain open, hyperpolarizing the membrane.',
        'Myelinated axons exhibit saltatory conduction, where ions cross the membrane at nodes of Ranvier spaced 1–2 mm apart.',
        'At electrical synapses, cells are connected by gap junctions; at chemical synapses, ACh directly opens ion channels, while in the heart muscarinic ACh opens K+ channels to slow heart rate.',
        'Opening Na+ or Ca2+ channels causes graded depolarization called an excitatory postsynaptic potential (EPSP).',
      ],
      prerequisites: ['phys-cell-plasma-membrane', 'phys-nervous-organisation'],
      examples: ['Multiple sclerosis involves autoimmune demyelination of CNS oligodendrocytes, disrupting saltatory conduction at nodes of Ranvier.'],
    },
    memory: {
      chunking: 'Cells: 100B neurons; Astrocytes = abundant; Ependymal = CSF; Oligodendrocytes = CNS myelin; Schwann = PNS myelin. Potential: 50-70x K+ leak, 3 Na+ out / 2 K+ in, peak +25 mV, all-or-none, nodes 1-2 mm (saltatory). Synapse: Gap junctions (electrical) vs ACh (chemical, EPSP vs cardiac K+ hyperpolarization).',
      comparison: 'Oligodendrocyte vs Schwann Cell: Oligodendrocytes myelinate multiple CNS axon segments; Schwann cells myelinate a single PNS internode.',
      number: '100 billion neurons · 50-70x (K+ leak vs Na+) · 3 Na+ out / 2 K+ in · +25 mV (AP peak) · 1-2 mm (node of Ranvier spacing).',
    },
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
    skills: [
      'Distinguishing glial cell functions, calculating resting and action potential ionic dynamics (50-70x K+ leak, 3:2 ATPase, +25 mV peak), and explaining saltatory conduction mechanisms at nodes of Ranvier.',
    ],
    selfCheck: 'State the myelinating cells for CNS vs PNS, the Na+/K+ pump stoichiometry, the action potential peak voltage, the node of Ranvier spacing, and the definition of saltatory conduction.',
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
    id: 'abct2326-renal-filtration-countercurrent',
    subject: 'ABCT2326', unit: 'phys.renal', type: 'concept',
    title: 'Renal physiology: nephron microarchitecture, glomerular filtration, countercurrent multiplication, and RAAS regulation',
    tags: ['renal', 'gfr', 'countercurrent', 'raas', 'high-yield'],
    lesson: {
      explanation: 'The human urinary system is anchored by paired kidneys containing >1 million nephrons/kidney. Urine drains through renal pyramids containing minor calyces which unite to form a major calyx, emptying through ureters into the urinary bladder, whose wall features specialized smooth muscle called the detrusor muscle. In the nephron, capillary endothelial fenestrations in the glomerulus make them 100-400 times more permeable than typical systemic capillaries. Glomerular filtration rate (GFR) averages 115 ml/min in women; 125 ml/min in men, producing totals about 180L/day of ultrafiltrate. Excreting metabolic wastes requires a minimum of 400 ml/day urine necessary to clear solute load (obligatory water loss). Epithelial reabsorption along the nephron is thermodynamically demanding: energy cost is 6% of calories consumed at rest. In the proximal convoluted tubule (PCT), ~65% Na+, Cl-, and H2O is reabsorbed in PCT and returned to bloodstream. An additional 20% is reabsorbed in descending loop of Henle. Thus 85% of filtered H2O and salt are reabsorbed early in tubule in an unregulated, hydration-independent manner. The remaining loop of Henle establishes hypertonic medullary interstitium via countercurrent multiplication, where maximum osmolality at the tip of the loop of Henle is 1400 mOsm/L. Downstream in the distal convoluted tubule and collecting duct, hormonal fine-tuning occurs: 90% filtered Na+ and K+ reabsorbed before distal tubule. In the absence of aldosterone, 80% of remaining Na+ is reabsorbed, while aldosterone drives active reabsorption of the final 20% of distal Na+ in exchange for K+ or H+ secretion. Systemic perfusion and low blood pressure trigger the renin-angiotensin-aldosterone system (RAAS): juxtaglomerular cells secrete renin; renin converts angiotensinogen to angiotensin I, which is cleaved by angiotensin-converting enzyme (ACE) in lungs into vasoconstrictive angiotensin II. Acid-base homeostasis in the collecting system regulates H+ secretion and bicarbonate reabsorption, but the nephron cannot produce urine with pH < 4.5, requiring urinary phosphate and ammonia buffers.',
      plain: 'Each kidney holds >1 million nephrons, filtering 180 L/day (GFR: 115 ml/min women, 125 ml/min men) with a 400 ml/day obligate urine volume. Reabsorption consumes 6% basal resting energy: 65% in PCT + 20% in loop of Henle (85% early total). The loop creates a 1400 mOsm/L medullary gradient. Aldosterone reabsorbs remaining distal Na+; RAAS converts angiotensinogen via renin and pulmonary ACE; detrusor muscle lines the bladder.',
      keyFacts: [
        'Each human kidney contains >1 million nephrons, and pyramids empty via minor calyces into major calyces.',
        'Glomerular capillaries possess fenestrations making them 100-400 times more permeable than continuous capillaries.',
        'Normal GFR averages 115 ml/min in women and 125 ml/min in men, generating approximately 180 L/day of filtrate.',
        'A minimum of 400 ml/day urine is obligatory to excrete metabolic wastes.',
        'Renal tubular active reabsorption consumes 6% of the body calories consumed at rest.',
        'The PCT reabsorbs ~65% and the loop of Henle reabsorbs an additional 20%, ensuring 85% of filtered water and salt is reabsorbed before the distal tubule.',
        'Medullary countercurrent multiplication generates a maximum interstitial osmotic gradient of 1400 mOsm/L.',
        'Over 90% of filtered Na+ and K+ is reabsorbed before the distal nephron; aldosterone controls the remaining distal Na+ reabsorption.',
        'Juxtaglomerular renin cleaves liver angiotensinogen into angiotensin I; converting enzyme (ACE) in lungs yields angiotensin II.',
        'The nephron cannot produce urine with pH < 4.5, limiting unbuffered free proton excretion.',
      ],
      prerequisites: ['phys-cell-membrane-transport', 'hss2011-renal-urinary-tract-anatomy'],
      examples: ['Severe dehydration triggers high ADH and maximal aldosterone, concentrating urine up to 1400 mOsm/L while preserving minimum obligatory volume (~400 ml/day).'],
    },
    memory: {
      chunking: 'Architecture (>1M nephrons, fenestrations 100-400x, detrusor) -> Filtration (GFR 115/125 ml/min, 180 L/day, 400 ml obligate, 6% basal cal) -> Reabsorption (65% PCT + 20% Henle = 85% early, 1400 mOsm/L gradient) -> Regulation (90% pre-distal, Aldosterone remaining 20%, Renin -> ACE lungs -> Ang II, pH >= 4.5).',
      comparison: 'Obligate vs Facultative Reabsorption: 85% of water and salt is reabsorbed in PCT (65%) and Henle (20%) regardless of hydration; the final 15% is facultative, regulated by ADH and aldosterone in DCT/collecting duct.',
      number: '>1 million nephrons · 100-400x fenestrations · 115 vs 125 ml/min GFR · 180 L/day · 400 ml/day obligate · 6% resting calories · 65% + 20% = 85% · 1400 mOsm/L · 90% pre-distal · pH >= 4.5.',
    },
    practice: [
      { type: 'mcq', prompt: 'What are the average glomerular filtration rates (GFR) in adult females and males?', options: ['75 ml/min in women; 90 ml/min in men', '115 ml/min in women; 125 ml/min in men', '150 ml/min in women; 175 ml/min in men', '180 ml/min in women; 200 ml/min in men'], answer: 1,
        explanation: 'GFR averages 115 ml/min in women and 125 ml/min in men, producing about 180 L of filtrate daily.',
        src: { ref: 'phys.renal.deck', location: 'p17 "Averages 115 ml/min in women; 125 ml/min in men"' } },
      { type: 'mcq', prompt: 'What percentage of filtered water and salt is reabsorbed early in the nephron (PCT and descending loop of Henle) prior to distal hormonal control?', options: ['25%', '50%', '85%', '99%'], answer: 2,
        explanation: 'The PCT reabsorbs ~65% and descending Henle reabsorbs 20%, so 85% is reabsorbed early in an unregulated manner.',
        src: { ref: 'phys.renal.deck', location: 'p26 "Thus 85% of filtered H2O and salt are reabsorbed early in tubule"' } },
      { type: 'mcq', prompt: 'What is the maximum osmolality established in the deep renal medulla by countercurrent multiplication?', options: ['300 mOsm/L', '600 mOsm/L', '1000 mOsm/L', '1400 mOsm/L'], answer: 3,
        explanation: 'The countercurrent multiplier system achieves a maximum interstitial osmotic concentration of 1400 mOsm/L at the loop tip.',
        src: { ref: 'phys.renal.deck', location: 'p27 "is 1400 mOsm/L"' } },
      { type: 'typed', prompt: 'What is the minimum volume of daily urine output (in ml/day) necessary to excrete metabolic wastes?', accept: ['400', '400 ml', '400 ml/day', '400ml/day'],
        explanation: 'A minimum obligatory urine volume of 400 ml/day is necessary to clear solute wastes.',
        src: { ref: 'phys.renal.deck', location: 'p21 "Minimum of 400 ml/day urine necessary to"' } },
      { type: 'matching', prompt: 'Match each renal parameter to its quantitative physiological value.',
        pairs: [['Basal energy cost of reabsorption', '6% of calories consumed at rest'], ['Glomerular fenestration permeability', '100-400 times more permeable'], ['Daily filtrate volume', 'Totals about 180L/day'], ['Minimum urinary pH limit', 'Nephron cannot produce urine with pH < 4.5']],
        explanation: 'These quantitative benchmarks govern renal tubular transport and acid-base limits.',
        src: { ref: 'phys.renal.deck', location: 'p26 "Energy cost is 6% of calories consumed at rest"' } },
      { type: 'sequence', prompt: 'Arrange the sequence of the renin-angiotensin-aldosterone axis from initiation to hormone generation.',
        items: ['Perfusion pressure drops in renal afferent arteriole', 'Juxtaglomerular cells secrete renin', 'Renin converts angiotensinogen to angiotensin I', 'Converting enzyme (ACE) in lungs produces angiotensin II', 'Adrenal cortex releases aldosterone'],
        explanation: 'The cascade begins with renal renin release, hepatic angiotensinogen conversion, pulmonary ACE cleavage, and adrenal aldosterone stimulation.',
        src: { ref: 'phys.renal.deck', location: 'p40 "Renin converts angiotensinogen to angiotensin I"' } },
    ],
    application: [
      { type: 'scenario', prompt: 'A patient presents with severe oliguria (<200 ml/day). Explain the physiological significance of the 400 ml/day minimum obligatory urine volume, how the countercurrent multiplier concentrates urine to 1400 mOsm/L, and why renal reabsorption requires 6% of resting energy.',
        model: 'The body must eliminate approximately 600 mOsm of non-volatile metabolic waste solutes daily. Because the maximum urinary concentration achievable by the medullary countercurrent multiplier is 1400 mOsm/L (driven by active NaCl extrusion in the thick ascending limb and urea recycling), the absolute minimum water required to excrete these solutes is ~400-440 ml/day (obligatory volume). Urine output below 400 ml/day results in toxic solute retention (azotemia). Active solute reclamation, primarily by Na+/K+ ATPase pumps in the PCT and thick ascending limb, demands high metabolic energy, consuming approximately 6% of all body calories at rest.',
        rubric: ['Defines minimum obligatory urine volume (400 ml/day) required to eliminate daily solute load', 'Explains countercurrent multiplier achieving 1400 mOsm/L in medullary interstitium', 'Notes active tubular transport consuming 6% of basal resting calories'] },
    ],
    commonMistakes: [
      'Assuming all water reabsorption is regulated by ADH (85% is obligate and reabsorbed in PCT and loop before ADH acts).',
      'Confusing renin with an enzyme that acts directly on aldosterone (renin cleaves angiotensinogen to angiotensin I; ACE in lungs yields angiotensin II).',
      'Thinking urine can be acidified to pH 1.0 or 2.0 (the renal tubular limit is pH 4.5).',
    ],
    skills: [
      'Quantifying renal filtration and reabsorption dynamics (GFR, 180 L/day, 85% obligate reabsorption, 6% caloric cost), mapping countercurrent multiplier gradients (1400 mOsm/L), and tracing the RAAS hormonal axis.',
    ],
    selfCheck: 'State male and female average GFR, the percentage of early obligate reabsorption, the maximum medullary osmolality, the minimum urinary pH limit, and the organ where ACE is located.',
    sourceRefs: [
      { ref: 'phys.renal.deck', location: 'p5 "Pyramid contains minor calyces which unite to form a major calyx"' },
      { ref: 'phys.renal.deck', location: 'p6 "smooth muscle wall called the detrusor muscle"' },
      { ref: 'phys.renal.deck', location: 'p8 ">1 million nephrons/kidney"' },
      { ref: 'phys.renal.deck', location: 'p14 "100-400 times more"' },
      { ref: 'phys.renal.deck', location: 'p17 "Averages 115 ml/min in women; 125 ml/min in men"' },
      { ref: 'phys.renal.deck', location: 'p17 "Totals about 180L/day"' },
      { ref: 'phys.renal.deck', location: 'p21 "Minimum of 400 ml/day urine necessary to"' },
      { ref: 'phys.renal.deck', location: 'p26 "~65% Na+, Cl-, and H2O is reabsorbed in PCT and returned to bloodstream"' },
      { ref: 'phys.renal.deck', location: 'p26 "An additional 20% is reabsorbed in descending loop of Henle"' },
      { ref: 'phys.renal.deck', location: 'p26 "Thus 85% of filtered H2O and salt are reabsorbed early in tubule"' },
      { ref: 'phys.renal.deck', location: 'p26 "Energy cost is 6% of calories consumed at rest"' },
      { ref: 'phys.renal.deck', location: 'p27 "is 1400 mOsm/L"' },
      { ref: 'phys.renal.deck', location: 'p37 "90% filtered Na+ and K+ reabsorbed before distal tubule"' },
      { ref: 'phys.renal.deck', location: 'p37 "In the absence of aldosterone, 80% of remaining Na+ is"' },
      { ref: 'phys.renal.deck', location: 'p40 "Renin converts angiotensinogen to angiotensin I"' },
      { ref: 'phys.renal.deck', location: 'p40 "converting enzyme (ACE) in lungs"' },
      { ref: 'phys.renal.deck', location: 'p44 "Nephron cannot produce urine with pH < 4.5"' },
    ],
  },
  {
    id: 'abct2326-muscle-ultrastructure-energetics',
    subject: 'ABCT2326', unit: 'phys.msk', type: 'concept',
    title: 'Muscle physiology: sarcomere ultrastructure, titin recoil, motor unit recruitment, fibre types, and neural control',
    tags: ['muscle', 'sarcomere', 'titin', 'motor-unit', 'vo2max', 'high-yield'],
    lesson: {
      explanation: 'Skeletal muscle comprises approximately 40% of body mass in males and about 32% of females. The primary physiological property of muscle tissue is contractility, defined as the ability of a muscle to shorten with force. At the ultrastructural level, myofibrils are organized into sarcomeres. In addition to actin and myosin filaments, titin is elastic protein attaching myosin to Z disc that contributes to elastic recoil during passive stretch. Along thin filaments, regulatory troponin complexes are spaced at regular intervals of every 7 actins, binding Ca2+ to displace tropomyosin. During excitation-contraction coupling, action potentials traveling down transverse tubules trigger sarcoplasmic reticulum (SR) Ca2+ release; these SR release channels are 10X larger than voltage-gated Ca2+ channels, permitting explosive cytosolic Ca2+ flooding. Motor control precision depends on motor unit size: large postural muscles have hundreds of fibres per motor neuron, whereas the eye muscles may have ~20 muscle fibers/motor units for ultrafine tracking. Aerobic capacity is quantified by maximal oxygen uptake (VO2 max), which ranges from 12 ml O2/minute/kg body weight to 84 ml O2/minute/kg in elite endurance athletes. During progressive exercise, blood lactate concentration abruptly rises at the lactate threshold, which occurs at about 50-70% VO2 max. Skeletal muscle fibres divide into distinct phenotypes: Type I fibers are also called red slow oxidative fibers (rich in myoglobin and mitochondria, fatigue-resistant), whereas Type IIX fibers also called white fast glycolytic fibers (high glycogen and rapid ATP consumption). Endurance training alters phenotypic expression, leading to a decreased number of type IIX (fast glycolytic) fibers; increased number of intermediate Type IIA oxidative-glycolytic fibres. Dystrophin serves as vital muscle fiber scaffolding: linking the internal actin cytoskeleton to the extracellular matrix. At the paracrine level, myostatin is a paracrine regulator that inhibits satellite cells and halts muscle hyperplasia/hypertrophy. Central motor coordination involves basal ganglia loops: degeneration of dopamine-secreting substantia nigra neurons produces most of the symptoms of Parkinson\'s disease, treated with l-dopa (the precursor of dopamine) or dopamine agonists, whereas degeneration of GABAergic striatal neurons produces chorea--a hyperkinetic disorder characterized by uncontrollable flinging movements in Huntington\'s disease. Bone tissue remodeling couples tightly with musculoskeletal dynamics: the basic functional unit: osteon (or called Haversian system), and through constant osteoclastic and osteoblastic turnover, roughly 1/5 of adult skeleton is demolished and rebuilt annually.',
      plain: 'Muscle mass accounts for ~40% male / 32% female weight. Titin anchors myosin to the Z disc for elastic recoil; troponin repeats every 7 actins. SR Ca2+ release channels are 10x larger than voltage-gated channels. Eye motor units have ~20 fibres. VO2 max spans 12–84 ml/min/kg, with lactate threshold at 50–70% VO2 max. Type I (red slow oxidative) resists fatigue; Type IIX (white fast glycolytic) powers bursts. Myostatin inhibits satellite cells; basal ganglia lesions cause Parkinson\'s (loss of dopamine) or chorea (loss of striatal GABA); 1/5 of adult bone remodels annually.',
      keyFacts: [
        'Muscle comprises ~40% body weight in males and ~32% in females; contractility is the ability to shorten with force.',
        'Titin connects thick myosin filaments to the Z-disc, providing elastic recoil to resting sarcomeres.',
        'Troponin complexes sit at intervals of every 7 actin monomers along the thin filament.',
        'Sarcoplasmic reticulum Ca2+ release channels are 10X larger than typical voltage-gated channels, releasing massive calcium bursts.',
        'Fine motor control units (e.g. extraocular eye muscles) contain only ~20 muscle fibers per motor unit.',
        'Maximal oxygen uptake (VO2 max) ranges between 12 and 84 ml O2/min/kg; lactate threshold occurs at 50–70% of VO2 max.',
        'Type I fibers are red slow oxidative fibers; Type IIX fibers are white fast glycolytic fibers.',
        'Endurance training decreases Type IIX fast glycolytic fibers and increases Type IIA oxidative fibers.',
        'Myostatin is a paracrine regulator that inhibits satellite cells, preventing excessive muscle growth.',
        'Parkinson\'s disease stems from substantia nigra dopaminergic loss (treated with L-dopa), whereas chorea in Huntington\'s results from striatal degeneration.',
        'The basic functional unit of compact bone is the osteon (Haversian system); 1/5 of the adult skeleton remodels yearly.',
      ],
      prerequisites: ['phys-cell-membrane-transport', 'hss2011-muscle-fascicle-and-tissue-architecture'],
      examples: ['Olympic marathon runners exhibit high proportions of red slow oxidative Type I fibres and a VO2 max approaching 80 ml/kg/min with a lactate threshold above 70% VO2 max.'],
    },
    memory: {
      chunking: 'Sarcomere (titin to Z disc, troponin every 7 actins, SR channels 10x larger) -> Motor Units & Energetics (~20 fibres eye, VO2 max 12-84, lactate threshold 50-70%) -> Fibres & Scaffolding (Type I red slow vs Type IIX white fast, dystrophin scaffold, myostatin inhibits) -> Neural & Bone (Parkinson\'s L-dopa vs Huntington\'s chorea, osteon, 1/5 skeleton remodeled/yr).',
      comparison: 'Type I vs Type IIX: Type I fibres are red, slow oxidative, packed with mitochondria, highly fatigue resistant; Type IIX fibres are white, fast glycolytic, low mitochondria, rapid fatigue during high-intensity exertion.',
      number: '40% male / 32% female · Every 7 actins · 10X larger SR channels · ~20 fibres/unit (eye) · 12 to 84 ml O2/min/kg · 50-70% VO2 max threshold · 1/5 skeleton/year.',
    },
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
    skills: [
      'Explaining sarcomere ultrastructure and elastic recoil (titin, troponin spacing every 7 actins, 10x larger SR Ca2+ channels), contrasting motor unit precision, analyzing aerobic energetics (VO2 max, lactate threshold), and detailing central motor pathology (Parkinson\'s dopamine loss vs Huntington\'s chorea).',
    ],
    selfCheck: 'State where titin attaches, the spacing of troponin complexes, the relative size of SR Ca2+ release channels, the motor unit size in the eye, and the definition of the lactate threshold.',
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
      "syllabusRef": {
        "ref": "edb.bio",
        "location": "Elective V(c) \"Regulation of gas content in blood\" — cardiovascular control and hemodynamics."
      },
      "beyond": [
        {
          "t": "Poiseuille relationship for vascular resistance: resistance is directly proportional to vessel length and blood viscosity, and inversely proportional to the fourth power of vessel radius.",
          "src": {
            "ref": "phys.cvs.tut",
            "location": "p1 \"Vascular resistance is related to all of the following, except the\""
          }
        },
        {
          "t": "Vascular resistance is independent of the osmolarity of interstitial fluids.",
          "src": {
            "ref": "phys.cvs.tut",
            "location": "p1 \"osmolarity of interstitial fluids.\""
          }
        },
        {
          "t": "The venous system holds the greater volume of blood (60–70% capacitance reservoir).",
          "src": {
            "ref": "phys.cvs.tut",
            "location": "p2 \"The normal blood volume of the venous system.\""
          }
        },
        {
          "t": "Blood colloid osmotic pressure is most affected by plasma protein concentration.",
          "src": {
            "ref": "phys.cvs.tut",
            "location": "p2 \"concentration of plasma proteins.\""
          }
        },
        {
          "t": "Pulmonary circuit components include pulmonary arteries and pulmonary veins.",
          "src": {
            "ref": "phys.cvs.tut",
            "location": "p2 \"Pulmonary arteries and pulmonary veins\""
          }
        },
        {
          "t": "The sinoatrial (SA) node is the intrinsic primary pacemaker initiating heartbeats.",
          "src": {
            "ref": "phys.cvs.tut",
            "location": "p2 \"sinoatrial (SA) node\""
          }
        },
        {
          "t": "Tendinous cords are structural valve anchors, not part of the electrical conduction system.",
          "src": {
            "ref": "phys.cvs.tut",
            "location": "p2 \"the tendinous cords (TC)\""
          }
        },
        {
          "t": "When the SA node is damaged, the AV node assumes pacing at an intrinsic backup rate of 40 to 50 bpm.",
          "src": {
            "ref": "phys.cvs.tut",
            "location": "p2 \"40 to 50 bpm.\""
          }
        }
      ]
    },
    "lesson": {
      "explanation": "Cardiovascular hemodynamics integrates the physical laws governing blood pressure, blood flow, and vascular resistance with the intrinsic electrophysiological hierarchy of the heart. Vascular resistance (R)—the friction blood encounters as it traverses the vasculature—is governed by Poiseuille's law: resistance is directly proportional to blood vessel length (L) and blood viscosity (η), and inversely proportional to the fourth power of the luminal radius (r⁴), expressed as R ∝ (η · L) / r⁴. Vascular resistance is also influenced by the laminar versus turbulent nature of blood flow. Crucially, vascular resistance is determined strictly by intravascular physical parameters and is entirely independent of the osmolarity of surrounding interstitial fluids. Because of the fourth-power radius dependence, tiny changes in arteriolar caliber produce dramatic alterations in resistance: halving a vessel radius increases its vascular resistance sixteen-fold (2⁴ = 16), making arteriolar smooth muscle contraction the primary regulatory mechanism for systemic peripheral resistance and arterial blood pressure. In the vascular circuits, blood volume is unevenly distributed: the venous system contains the greater volume of blood (~60%–70% of total blood volume at rest), acting as a high-capacitance, compliant reservoir, whereas the arterial system functions as a low-compliance, high-pressure distribution system (~15% of volume). At the microvascular interface, fluid exchange between capillaries and tissue spaces is governed by Starling forces, where blood colloid osmotic pressure (oncotic pressure) is overwhelmingly determined by the concentration of plasma proteins, specifically albumin; changes in plasma protein concentration directly alter fluid reabsorption across the capillary wall. Within the dual circuits, the pulmonary circuit consists strictly of the pulmonary trunk, right and left pulmonary arteries, pulmonary capillary beds, and four pulmonary veins. Electrical activation of the heart originates in the sinoatrial (SA) node, located in the superior posterior wall of the right atrium near the entrance of the superior vena cava, which serves as the primary cardiac pacemaker by spontaneously generating action potentials at a baseline intrinsic rate of 60–100 bpm. From the SA node, depolarization sweeps across atrial myocardium to the atrioventricular (AV) node, travels down the atrioventricular bundle (bundle of His), divides into the right and left bundle branches in the interventricular septum, and distributes via terminal Purkinje fibers to ventricular myocytes. Structures like the tendinous cords (chordae tendineae) and papillary muscles serve strictly mechanical roles in tethering atrioventricular valve leaflets during systole and are not part of the electrical conduction system. The cardiac conduction system exhibits a clear physiological hierarchy: the SA node has the fastest spontaneous firing rate and therefore suppresses slower downstream latent pacemakers (overdrive suppression); however, if the SA node is damaged or rendered non-functional (such as by sinoatrial nodal artery ischemia or sick sinus syndrome), the atrioventricular (AV) node assumes control as the secondary cardiac pacemaker, driving the ventricles at its intrinsic nodal pacemaker rate of 40 to 50 bpm.",
      "plain": "Vascular resistance depends on blood vessel radius (to the 4th power), vessel length, and blood viscosity—halving vessel radius increases resistance 16 times! Resistance does NOT depend on the osmolarity of interstitial fluid. The venous system is a high-capacity reservoir holding 60–70% of total blood volume. Blood osmotic pressure is driven primarily by plasma proteins (especially albumin). The pulmonary circuit includes the pulmonary arteries and pulmonary veins. The heart's electrical rhythm is normally initiated by the sinoatrial (SA) node at 60–100 bpm. The conduction path travels SA node → AV node → bundle of His → bundle branches → Purkinje fibers. Tendinous cords (chordae tendineae) are mechanical valve anchors, not conduction tissue. If the SA node is destroyed, the AV node takes over as backup pacemaker at an intrinsic rate of 40 to 50 bpm.",
      "keyFacts": [
        "Vascular resistance is directly proportional to vessel length and blood viscosity, and inversely proportional to the 4th power of radius.",
        "Vascular resistance is strictly an intravascular property and is unrelated to interstitial fluid osmolarity.",
        "Halving a vessel radius increases its vascular resistance by a factor of sixteen (2⁴ = 16).",
        "The venous system serves as a high-capacitance blood reservoir holding 60%–70% of total blood volume.",
        "Blood colloid osmotic pressure is governed primarily by the concentration of plasma proteins (albumin).",
        "The pulmonary circuit comprises the pulmonary trunk, pulmonary arteries, alveolar capillaries, and pulmonary veins.",
        "The sinoatrial (SA) node in the right atrium is the primary cardiac pacemaker initiating each heartbeat.",
        "The specialized conduction pathway comprises SA node → AV node → AV bundle (bundle of His) → bundle branches → Purkinje fibers.",
        "Tendinous cords (chordae tendineae) provide mechanical valve support and are not part of the electrical conduction system.",
        "When the SA node is damaged or blocked, the AV node takes over pacing at an intrinsic backup rhythm of 40 to 50 bpm."
      ],
      "prerequisites": [],
      "examples": [
        "In essential hypertension, chronic sympathetic hyperactivity and circulating angiotensin II induce arteriolar vasoconstriction; a mere 10% reduction in average arteriolar radius increases vascular resistance by approximately 52% ([1/0.9]⁴ ≈ 1.52), driving mean arterial pressure upward.",
        "In complete sinoatrial arrest, the ECG shows an absence of P waves, but the heart continues beating with regular, narrow QRS complexes at 45 bpm, reflecting an AV junctional escape rhythm generated by the AV node's intrinsic 40–50 bpm pacemaker."
      ]
    },
    "memory": {
      "chunking": "Hemodynamics Core Trio: Poiseuille (Resistance ∝ 1/r⁴) → Venous Reservoir (holds 60-70% of volume) → Nodal Hierarchy (SA node 60-100 bpm, AV backup 40-50 bpm).",
      "comparison": "SA Node vs AV Node: SA node is the primary pacemaker (60-100 bpm, initiates beat); AV node introduces a 100 ms delay and acts as the secondary backup pacemaker (40-50 bpm if SA fails).",
      "visualCue": "Picture a garden hose nozzle: narrowing the exit radius slightly causes pressure behind the nozzle to skyrocket because resistance scales with the fourth power.",
      "teachBack": "State the four physiological factors that determine vascular resistance, name the one factor it is independent of, and explain what happens to heart rate when the SA node is damaged."
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
    "skills": [
      "Apply Poiseuille’s equation to predict changes in vascular resistance and blood pressure from alterations in vessel radius.",
      "Delineate the hierarchy of cardiac autorhythmic pacemakers and identify escape rhythms on diagnostic records."
    ],
    "selfCheck": "From memory: recite Poiseuille determinants of resistance, identify the blood volume reservoir of the body, and state the backup firing rate of the AV node.",
    "visuals": [
      {
        "fig": "bloodVesselStructure"
      },
      {
        "schematic": "circuits"
      },
      {
        "gen": true
      }
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
    id: 'abct2326-renal-countercurrent-vasarecta',
    subject: 'ABCT2326', unit: 'phys.renal', type: 'concept',
    title: 'Renal countercurrent multiplication, medullary hyperosmolality, and vasa recta exchange',
    tags: ['renal', 'countercurrent', 'vasa-recta', 'loop-of-henle', 'high-yield'],
    lesson: {
      explanation: 'The countercurrent multiplier system of the nephron and the countercurrent exchanger of the vasa recta function in exact coordination to establish and preserve the vertical medullary osmotic gradient required for water conservation. The multiplier mechanism operates in six sequential physiological steps: (1) NaCl (salt) is pumped out from thick ascending limb via active Na+/K+/2Cl- cotransporters into the renal medullary interstitium (the thick ascending limb is impermeable to water); (2) This extruded NaCl increases osmolality of interstitial fluid surrounding the loop of Henle, creating a hyperosmolar medullary gradient; (3) Water diffuses out from descending limb to interstitial fluid by osmosis, because the osmolality of interstitial fluid is higher than descending limb tubular fluid (the thin descending limb is permeable to water via aquaporins but impermeable to solutes); (4) There is net water diffusion into vasa recta, because plasma proteins in vasa recta draw water inward via high colloid osmotic pressure; (5) NaCl diffuses into descending vasa recta and diffuses out of ascending vasa recta due to differences in osmolality and salt concentration gradients, acting as a passive countercurrent exchanger; (6) NaCl therefore is always trapped in interstitial fluid and vasa recta. The essential biological purpose of this arrangement is to keep the surrounding environment of descending limb always high osmolality (high solute concentration) so that water can be drawn out efficiently and reabsorbed into the general circulation without dissipating the medullary gradient.',
      plain: 'Active transport pumps NaCl out of the thick ascending limb, raising interstitial osmolality. Water diffuses out of the descending limb by osmosis into the hyperosmolar interstitium and is carried away by vasa recta capillaries, where plasma proteins draw water inward. NaCl diffuses into and out of hairpin vasa recta capillaries, trapping solute in the medulla so the descending limb always faces high osmolality, enabling efficient water recovery through aquaporins.',
      keyFacts: [
        'NaCl is actively pumped out from the thick ascending limb into the medullary interstitium.',
        'Active NaCl extrusion increases the osmolality of interstitial fluid surrounding the loop of Henle.',
        'Water diffuses out from the descending limb to interstitial fluid driven by interstitial hyperosmolality.',
        'Net water diffuses into the vasa recta because plasma proteins in the vasa recta exert high oncotic pressure.',
        'NaCl diffuses into and out of the vasa recta according to concentration gradients, acting as a passive exchanger.',
        'NaCl is always trapped in interstitial fluid and vasa recta, preserving high medullary osmolality for efficient water extraction.',
        'Facilitated diffusion of water across tubular membranes occurs via specialized water channels called Aquaporins.',
      ],
      prerequisites: ['abct2326-renal-filtration-countercurrent'],
      examples: ['In states of dehydration, elevated ADH inserts additional aquaporins into collecting ducts, drawing water into the 1200–1400 mOsm/L hyperosmolar medullary interstitium established by countercurrent multiplication.'],
    },
    memory: {
      chunking: '6 Steps: 1. NaCl pumped out from thick ascending limb -> 2. Interstitial osmolality rises -> 3. Water diffuses out from descending limb -> 4. Net water into vasa recta (plasma proteins draw water) -> 5. NaCl diffuses in/out of vasa recta -> 6. NaCl trapped in interstitium/vasa recta to preserve gradient.',
      comparison: 'Multiplier vs Exchanger: Loop of Henle is an active multiplier (requires ATP to pump NaCl in thick ascending limb); Vasa recta is a passive exchanger (capillary hairpin loop preserves gradient and removes recovered water).',
      number: '6 coordinated steps · 1400 mOsm/L (deep medullary tip osmolality) · Aquaporins (water channels enabling facilitated water osmosis).',
    },
    practice: [
      { type: 'mcq', prompt: 'In the renal countercurrent multiplier system, what initiates the hyperosmolality of the medullary interstitial fluid?', options: ['Water being actively pumped into the collecting duct', 'NaCl (salt) is pumped out from thick ascending limb', 'Urea being actively destroyed in the glomerulus', 'Plasma proteins leaking into the Bowman space'], answer: 1,
        explanation: 'Active pumping of NaCl out of the thick ascending limb into the interstitium initiates the hyperosmolar medullary gradient.',
        src: { ref: 'phys.renal.supp', location: 'p1 "NaCl (salt) is pumped out from thick ascending limb."' } },
      { type: 'mcq', prompt: 'Why does water diffuse out from the descending limb of the loop of Henle into the surrounding interstitium?', options: ['Because active aquaporin pumps hydrolyze ATP', 'Reason: Osmolality of interstitial fluid is higher than descending limb', 'Because sodium is impermeable across the entire nephron', 'Due to high hydrostatic pressure in the peritubular space'], answer: 1,
        explanation: 'Water moves passively by osmosis out of the descending limb because interstitial fluid osmolality is elevated by ascending limb NaCl pumping.',
        src: { ref: 'phys.renal.supp', location: 'p1 "Reason: Osmolality of interstitial fluid is higher than descending limb."' } },
      { type: 'mcq', prompt: 'What provides the primary physical driving force for net water diffusion into the vasa recta capillaries from the medullary interstitium?', options: ['Reason: Plasma proteins in vasa recta draw water', 'Active sodium co-transport across endothelial tight junctions', 'Low medullary capillary hydrostatic pressure below 0 mmHg', 'Negative charge on hemoglobin molecules'], answer: 0,
        explanation: 'Colloid osmotic pressure exerted by plasma proteins within the vasa recta capillaries draws extracted water into the bloodstream.',
        src: { ref: 'phys.renal.supp', location: 'p1 "Reason: Plasma proteins in vasa recta draw water."' } },
      { type: 'mcq', prompt: 'What is the primary physiological purpose of trapping NaCl in the medullary interstitial fluid and vasa recta?', options: ['To cause systemic hypertension', 'To keep the surrounding environment of descending limb always high osmolality so water can be drawn out efficiently', 'To prevent potassium reabsorption in the proximal tubule', 'To convert tubular glucose into glycogen'], answer: 1,
        explanation: 'Trapping NaCl in the medulla maintains high interstitial osmolality, driving efficient water reabsorption from the descending limb and collecting duct.',
        src: { ref: 'phys.renal.supp', location: 'p1 "NaCl therefore is always trapped in interstitial fluid and vasa recta."' } },
      { type: 'typed', prompt: 'What specialized transmembrane protein channels facilitate the passive diffusion of water across tubular cell membranes?', accept: ['Aquaporins', 'aquaporin', 'Aquaporin', 'aquaporins'],
        explanation: 'Aquaporins are integral membrane channel proteins that facilitate the rapid passive osmosis of water molecules.',
        src: { ref: 'phys.renal.supp', location: 'p4 "Aquaporins"' } },
      { type: 'matching', prompt: 'Match each component of the renal countercurrent mechanism to its defining physiological role.',
        pairs: [['Thick ascending limb', 'NaCl (salt) is pumped out from thick ascending limb.'], ['Descending limb', 'Water diffuses out from descending limb to interstitial fluid.'], ['Vasa recta plasma proteins', 'Reason: Plasma proteins in vasa recta draw water.'], ['Aquaporins', 'facilitate diffusion of water']],
        explanation: 'These pairings define the coordinated steps of countercurrent multiplication and exchange.',
        src: { ref: 'phys.renal.supp', location: 'p1 "NaCl (salt) is pumped out from thick ascending limb."' } },
      { type: 'sequence', prompt: 'Order the physiological sequence of countercurrent multiplication and exchange in the renal medulla.',
        items: ['NaCl (salt) is pumped out from thick ascending limb', 'NaCl increases osmolality of interstitial fluid surrounding the loop of Henle', 'Water diffuses out from descending limb to interstitial fluid', 'Net water diffusion into vasa recta drawn by plasma proteins', 'NaCl diffuses into and out of vasa recta, remaining trapped in medullary interstitium'],
        explanation: 'The sequence begins with ascending limb active NaCl pumping, followed by interstitial solute accumulation, descending limb water extraction, vasa recta water uptake, and passive solute trapping.',
        src: { ref: 'phys.renal.supp', location: 'p1 "NaCl (salt) is pumped out from thick ascending limb."' } },
    ],
    application: [
      { type: 'scenario', prompt: 'Trace how loop diuretics (such as furosemide, which inhibit the Na+/K+/2Cl- cotransporter in the thick ascending limb) impair the countercurrent multiplier system, detailing what happens to interstitial osmolality, descending limb water extraction, and final urine volume.',
        model: 'Loop diuretics block active NaCl transport out of the thick ascending limb into the medullary interstitium. Without active NaCl extrusion, the interstitial fluid surrounding the loop of Henle fails to develop its normal hyperosmolality. Because the osmotic gradient between the tubular lumen and interstitium is abolished, water cannot diffuse out from the descending limb. Consequently, tubular fluid remains dilute as it enters the distal nephron and collecting duct. Even in the presence of ADH, the lack of a hyperosmolar medullary gradient prevents water reabsorption through aquaporins, producing profound diuresis and a high volume of dilute urine.',
        rubric: ['Identifies inhibition of thick ascending limb active NaCl extrusion', 'Explains subsequent collapse of medullary interstitial hyperosmolality', 'Links the loss of osmotic gradient to failure of descending limb and collecting duct water extraction'] },
    ],
    commonMistakes: [
      'Believing the descending limb actively pumps salt (the descending limb is water-permeable and solute-impermeable; the thick ascending limb actively pumps NaCl).',
      'Thinking the vasa recta uses active transport to concentrate urine (the vasa recta is a purely passive countercurrent exchanger driven by oncotic and concentration gradients).',
      'Confusing simple diffusion with facilitated diffusion via aquaporins (aquaporins are selective transmembrane water channels).',
    ],
    skills: [
      'Tracing the 6-step nephron countercurrent multiplier system, explaining thick ascending limb active NaCl transport and descending limb water osmosis, detailing vasa recta passive countercurrent exchange and plasma oncotic water recovery, and analyzing pharmacological disruption by loop diuretics.',
    ],
    selfCheck: 'State which limb actively pumps NaCl, why water diffuses out of the descending limb, why water enters the vasa recta, and the function of aquaporins.',
    sourceRefs: [
      { ref: 'phys.renal.supp', location: 'p1 "NaCl (salt) is pumped out from thick ascending limb."' },
      { ref: 'phys.renal.supp', location: 'p1 "NaCl increases osmolality of interstitial fluid surrounding the loop of"' },
      { ref: 'phys.renal.supp', location: 'p1 "Water diffuses out from descending limb to interstitial fluid."' },
      { ref: 'phys.renal.supp', location: 'p1 "Net water diffusion into vasa recta."' },
      { ref: 'phys.renal.supp', location: 'p1 "Reason: Plasma proteins in vasa recta draw water."' },
      { ref: 'phys.renal.supp', location: 'p1 "NaCl therefore is always trapped in interstitial fluid and vasa recta."' },
      { ref: 'phys.renal.supp', location: 'p4 "Aquaporins"' },
    ],
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
      "syllabusRef": {
        "ref": "edb.bio",
        "location": "Elective V(c) \"Regulation of gas content in blood\" — respiratory control centers and chemoreceptor regulation."
      },
      "beyond": [
        {
          "t": "External respiration (gas exchange between alveolar air and blood) versus internal respiration (gas exchange between blood and interstitial fluid).",
          "src": {
            "ref": "phys.resp.tut",
            "location": "p1 \"define and compare the processes of external respiration and internal respiration\""
          }
        },
        {
          "t": "Three chemoreceptor input sources: central medullary chemoreceptors, carotid bodies, and aortic bodies.",
          "src": {
            "ref": "phys.resp.tut",
            "location": "p1 \"THREE different sources of chemoreceptor input that can influence the respiratory\""
          }
        },
        {
          "t": "Air entering the body is filtered, warmed, and humidified by the upper conducting airway.",
          "src": {
            "ref": "phys.resp.tut",
            "location": "p2 \"Air entering the body is filtered, warmed, and humidified by the\""
          }
        },
        {
          "t": "Vital capacity represents the maximum volume of air that can be exhaled following maximal inhalation.",
          "src": {
            "ref": "phys.resp.tut",
            "location": "p2 \"the vital capacity.\""
          }
        },
        {
          "t": "Arterial PO2 reflects dissolved oxygen in physical solution; if blood lacked RBCs, arterial PO2 would be normal while oxygen content is severely reduced.",
          "src": {
            "ref": "phys.resp.tut",
            "location": "p2 \"If the blood lacked red blood cells but the lungs were functioning normally,\""
          },
          "supp": {
            "ref": "phys.resp.tut",
            "location": "p2 \"the arterial PO2 would be normal.\""
          }
        },
        {
          "t": "Central chemoreceptors on the ventrolateral medulla are directly stimulated by H+ ions in cerebrospinal fluid derived from blood CO2 crossing the blood-brain barrier.",
          "src": {
            "ref": "phys.resp.tut",
            "location": "p2 \"chemoreceptors in the medulla are directly stimulated by\""
          },
          "supp": {
            "ref": "phys.resp.tut",
            "location": "p2 \"H+ in cerebrospinal fluid that is derived from blood CO2.\""
          }
        },
        {
          "t": "Rhythmic control of breathing is generated by inspiratory and expiratory neuronal networks in the medulla oblongata.",
          "src": {
            "ref": "phys.resp.tut",
            "location": "p2 \"rhythmic control of breathing is produced by the activity of inspiratory and expiratory neurons\""
          },
          "supp": {
            "ref": "phys.resp.tut",
            "location": "p2 \"the medulla oblongata.\""
          }
        },
        {
          "t": "Systemic veins have higher PCO2 (45 mmHg) than systemic arteries (40 mmHg) due to tissue metabolic CO2 production.",
          "src": {
            "ref": "phys.resp.tut",
            "location": "p2 \"higher in the systemic veins than in the systemic arteries.\""
          }
        }
      ]
    },
    "lesson": {
      "explanation": "Respiratory physiology integrates the physical processes of gas exchange with sophisticated neural and chemical feedback control mechanisms. Respiration is divided into two distinct biological phases: external respiration, which encompasses all physiological processes involved in the exchange of O2 and CO2 between the external atmospheric environment and circulating blood in pulmonary capillaries; and internal respiration (cellular respiration), which involves the absorption of O2 and release of CO2 by peripheral tissue cells from systemic capillaries. As atmospheric air enters the body through the external nares, it is filtered, warmed to 37°C, and humidified to 100% relative humidity by the mucosal lining of the upper conducting airway before reaching the gas exchange surfaces. In pulmonary diagnostic spirometry, the maximum volume of air that an individual can forcefully expel from the lungs after taking the deepest possible maximal inspiration is termed the vital capacity (VC = TV + IRV + ERV). A fundamental diagnostic principle in blood gas physiology is the critical distinction between arterial partial pressure of oxygen (PaO2) and total blood oxygen content: PaO2 measures strictly the concentration of unbound oxygen gas dissolved physically in blood plasma (~0.3 mL O2/100 mL blood at 100 mmHg), which equilibrates across the alveolar-capillary membrane according to Henry's law. In contrast, >98.5% of total blood oxygen is carried chemically bound to hemoglobin inside red blood cells. Consequently, if a patient were completely devoid of red blood cells (or suffered from severe normovolemic anemia) while lung ventilation and alveolar diffusion were completely normal, the arterial PO2 would be entirely normal (~100 mmHg), even though the total oxygen-carrying capacity and content of the blood would be catastrophically depressed. Chemical regulation of pulmonary ventilation is executed by three distinct chemoreceptor populations: (1) central chemoreceptors located on the ventrolateral surface of the medulla oblongata; (2) peripheral carotid bodies located at the bifurcation of common carotid arteries (innervated by the glossopharyngeal nerve, CN IX); and (3) peripheral aortic bodies located along the aortic arch (innervated by the vagus nerve, CN X). Crucially, central chemoreceptors in the medulla are not directly stimulated by arterial pH or systemic H+ ions, because hydrogen ions cannot cross the lipophilic blood-brain barrier. Instead, carbon dioxide (CO2) is lipid-soluble and diffuses rapidly across the blood-brain barrier into the cerebrospinal fluid (CSF). Inside the CSF, CO2 hydrates with water under the catalysis of carbonic anhydrase to form carbonic acid, which dissociates into hydrogen ions and bicarbonate (CO2 + H2O ⇌ H2CO3 ⇌ H+ + HCO3-). Because CSF has very low protein concentration and lacks hemoglobin, it has virtually no buffering capacity; thus, the newly formed H+ ions cause an immediate, sharp drop in CSF pH, which directly stimulates the central medullary chemoreceptors. Central chemoreceptors provide roughly 75% to 85% of the resting ventilatory drive. Automatic, rhythmic control of breathing is generated by the cyclical activity of inspiratory and expiratory neuronal networks situated within the medulla oblongata—specifically the dorsal respiratory group (DRG), which sets the basic rhythm of quiet inspiration, and the ventral respiratory group (VRG), which coordinates accessory muscles during forced breathing. Under steady-state conditions, cellular metabolism generates CO2, so the partial pressure of carbon dioxide (PCO2) is always higher in systemic veins (~45 mmHg) returning to the right heart than in systemic arteries (~40 mmHg) leaving the left heart.",
      "plain": "External respiration is gas exchange between outside air and blood in the lungs; internal respiration is gas exchange between blood and body cells. As air enters the nose, it is filtered, warmed, and humidified. Vital capacity is the maximum amount of air you can blow out after taking the biggest possible breath. A critical concept: arterial PO2 measures only the oxygen dissolved in liquid plasma, NOT the oxygen bound to red blood cells—so if someone had zero red blood cells, their arterial PO2 would still be normal (~100 mmHg), but their blood could carry almost no oxygen! Breathing is controlled by rhythm-generating neurons in the medulla oblongata. Central chemoreceptors on the medulla are directly stimulated by H+ ions in cerebrospinal fluid created when blood CO2 diffuses across the blood-brain barrier. Because body tissues produce CO2 as waste, PCO2 is always higher in veins (~45 mmHg) than in arteries (~40 mmHg).",
      "keyFacts": [
        "External respiration exchanges gases between air and blood; internal respiration exchanges gases between blood and tissues.",
        "Inhaled air is filtered, warmed, and humidified by the mucosal lining of the upper conducting airway.",
        "Vital capacity is the maximum volume of air that can be exhaled following maximal inspiration (VC = TV + IRV + ERV).",
        "Arterial PO2 measures dissolved oxygen in plasma; without RBCs, arterial PO2 is normal while oxygen content is severely depleted.",
        "Chemoreceptor inputs originate from three sources: central medullary chemoreceptors, carotid bodies, and aortic bodies.",
        "Central chemoreceptors are directly stimulated by H+ ions in cerebrospinal fluid derived from blood CO2 crossing the blood-brain barrier.",
        "Systemic H+ ions cannot cross the blood-brain barrier; CO2 diffuses freely into CSF and hydrates to yield H+.",
        "Rhythmic control of breathing is generated by inspiratory (DRG) and expiratory (VRG) neuronal networks in the medulla oblongata.",
        "PCO2 is normally higher in systemic veins (~45 mmHg) than in systemic arteries (~40 mmHg) due to tissue metabolism.",
        "Central chemoreceptors provide the dominant (75–85%) chemical drive for resting pulmonary ventilation."
      ],
      "prerequisites": [],
      "examples": [
        "In severe carbon monoxide (CO) poisoning, CO binds tightly to hemoglobin with 200-fold higher affinity than oxygen, displacing O2 and crippling oxygen delivery to tissues; however, because dissolved oxygen in plasma is unaffected, routine arterial blood gas (ABG) analysis shows a deceptively normal PaO2 (~100 mmHg), masking lethal tissue hypoxia.",
        "Voluntary hyperventilation blows off arterial CO2 (hypocapnia, PaCO2 dropping from 40 to 20 mmHg); reduced blood CO2 decreases CSF [H+], removing the stimulation of central chemoreceptors and producing a prolonged post-hyperventilation apnea until metabolic CO2 accumulates back to normal."
      ]
    },
    "memory": {
      "chunking": "Tutorial Triad: Oxygen Illusion (PaO2 is dissolved plasma O2, normal even without RBCs) → Chemosensory Driver (CO2 crosses BBB, makes H+ in CSF to trigger medulla) → Rhythm Generator (Medulla DRG/VRG).",
      "comparison": "Arterial PO2 vs Total Oxygen Content: PaO2 is the partial pressure of dissolved gas (~0.3 mL/100 mL, 1.5% of total); Total O2 content includes the 98.5% bound to hemoglobin (~20 mL/100 mL).",
      "visualCue": "Picture CO2 as a ghost slipping effortlessly through the stone wall of the blood-brain barrier, then turning into acid (H+) in the clear water of the CSF to ring the fire alarm on the medulla floor.",
      "teachBack": "Explain why central chemoreceptors respond to blood PCO2 rather than blood H+, and describe what happens to arterial PO2 in a patient with zero red blood cells."
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
    "skills": [
      "Distinguish arterial oxygen partial pressure (PaO2) from oxygen saturation (SaO2) and total oxygen content in clinical arterial blood gases.",
      "Explain the negative feedback loop by which arterial PCO2 regulates pulmonary ventilation via central and peripheral chemoreceptors."
    ],
    "selfCheck": "From memory: explain why arterial PO2 would be normal in an animal with zero red blood cells, state which ion directly stimulates the medulla, and identify why systemic H+ cannot stimulate central chemoreceptors directly.",
    "visuals": [
      {
        "fig": "ventilationMechanics"
      },
      {
        "fig": "spirometryLungVolumes"
      },
      {
        "gen": true
      }
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
    id: 'abct2326-renal-tubular-clearance-sympathetic',
    subject: 'ABCT2326', unit: 'phys.renal', type: 'concept',
    title: 'Renal tubular transport, sympathetic regulation, and micturition control',
    tags: ['renal', 'tubular-transport', 'micturition', 'aldosterone', 'high-yield'],
    lesson: {
      explanation: 'Renal regulation coordinates tubular reabsorption, sympathetic neural inputs, and voluntary urinary elimination. The nephron population divides into two distinct anatomical classes: cortical nephrons (~85%, situated almost entirely in the cortex with short nephron loops) and juxtamedullary nephrons (~15%, extending deep medullary loops into hyperosmolar interstitial zones to concentrate urine). Evolutionary adaptation directly reflects this design: beavers have relatively little need to conserve water and could therefore be expected to have shorter nephron loops than humans, whereas desert mammals possess elongated juxtamedullary loops. Along the nephron, the primary function of the proximal convoluted tubule is the mass absorption of ions, organic molecules, vitamins, and water (~65% of filtrate volume). Furthermore, urea is passively reabsorbed in the proximal convoluted tubule (recovering ~50% along the osmotic water gradient). Under circulatory stress or exercise, sympathetic activation of nerve fibers in the nephron causes the regulation of glomerular blood flow and pressure (via afferent arteriolar vasoconstriction), the stimulation of renin release from the juxtaglomerular complex, and the direct stimulation of water and Na+ reabsorption to preserve blood pressure and volume. In the distal convoluted tubule and cortical collecting duct, sodium reabsorption is accelerated by the secretion of aldosterone, while when ADH levels rise, the amount of water reabsorbed increases dramatically via aquaporin insertion. Finally, while bladder distension triggers the involuntary autonomic micturition reflex, voluntary continence is maintained because the external uretheral sphincter can be controlled voluntarily via somatic motor innervation (pudendal nerve).',
      plain: 'Cortical nephrons have short loops while juxtamedullary nephrons have long loops; beavers have shorter loops due to ample water. The PCT absorbs ions, organic nutrients, vitamins, water, and passively reabsorbs ~50% of urea. Sympathetic renal nerve stimulation constricts vessels, stimulates renin release, and promotes Na+/water reabsorption. Aldosterone accelerates DCT sodium uptake; ADH increases water reabsorption; voluntary micturition control is mediated by the external urethral sphincter.',
      keyFacts: [
        'The primary function of the proximal convoluted tubule is absorption of ions, organic molecules, vitamins, and water.',
        'Urea is passively reabsorbed in the proximal convoluted tubule along the water reabsorption gradient.',
        'Beavers have relatively little need to conserve water and therefore have shorter nephron loops than humans.',
        'Sympathetic renal nerve stimulation regulates glomerular hemodynamics, stimulates renin release, and stimulates water and Na+ reabsorption.',
        'Aldosterone accelerates sodium reabsorption in the DCT and cortical collecting duct.',
        'Elevated ADH increases the amount of water reabsorbed across the collecting system.',
        'Voluntary control over urination is maintained because the external urethral sphincter can be controlled voluntarily.',
      ],
      prerequisites: ['abct2326-renal-nephron', 'abct2326-renal-countercurrent-vasarecta'],
      examples: ['After a vigorous 1000-meter race, intense sympathetic tone and elevated aldosterone and ADH produce a small volume of highly concentrated urine.'],
    },
    memory: {
      chunking: 'Nephron Classes (cortical short loop vs juxtamedullary long loop; beaver short loops) · PCT (bulk reabsorption of nutrients/ions/water + passive urea) · Sympathetic (renin release, GFR regulation, Na+/water retention) · Endocrine (aldosterone = Na+; ADH = water) · Continence (external urethral sphincter = voluntary somatic).',
      comparison: 'External vs Internal Urethral Sphincter: Internal sphincter is smooth muscle under involuntary autonomic control; external sphincter is skeletal muscle under voluntary somatic control.',
      number: '85% cortical vs 15% juxtamedullary nephrons · ~50% urea passively reabsorbed in PCT · External urethral sphincter = voluntary control.',
    },
    practice: [
      { type: 'mcq', prompt: 'Why can humans consciously postpone urination when bladder wall stretching initiates the micturition reflex?', options: ['The production of urine can be suspended voluntarily', 'The external uretheral sphincter can be controlled voluntarily', 'The internal uretheral sphincter can be controlled voluntarily', 'Smooth muscle in the detrusor is under somatic motor control'], answer: 1,
        explanation: 'Voluntary continence is mediated by somatic motor control over the skeletal muscle external urethral sphincter.',
        src: { ref: 'phys.renal.tut', location: 'p1 "The external uretheral sphincter can be controlled voluntarily."' } },
      { type: 'mcq', prompt: 'What is the primary physiological function of the proximal convoluted tubule (PCT)?', options: ['Filtration of plasma proteins', 'absorption of ions, organic molecules, vitamins, and water', 'Secretion of excess glucose and lipoproteins', 'Establishing hyperosmolality in the medullary tip'], answer: 1,
        explanation: 'The PCT performs bulk non-regulated reabsorption of approximately 65% of water, ions, and virtually all filtered organic nutrients.',
        src: { ref: 'phys.renal.tut', location: 'p1 "absorption of ions, organic molecules, vitamins, and water."' } },
      { type: 'mcq', prompt: 'How is filtered urea handled in the proximal convoluted tubule (PCT)?', options: ['Actively secreted by ATP-dependent pumps', 'Completely eliminated without any reabsorption', 'passively reabsorbed in the proximal convoluted tubule', 'Converted enzymatically into ammonia'], answer: 2,
        explanation: 'As water is reabsorbed in the PCT, luminal urea concentration rises, driving passive reabsorption of approximately 50% of filtered urea.',
        src: { ref: 'phys.renal.tut', location: 'p2 "passively reabsorbed in the proximal convoluted tubule."' } },
      { type: 'mcq', prompt: 'Which anatomical adaptation in nephron loop length would be expected in semi-aquatic animals such as beavers compared to humans?', options: ['Fewer total nephrons', 'shorter nephron loops', 'Longer collecting ducts', 'Absence of convoluted tubules'], answer: 1,
        explanation: 'Because beavers inhabit freshwater environments with little need to conserve water, they possess predominantly cortical nephrons with shorter nephron loops.',
        src: { ref: 'phys.renal.tut', location: 'p2 "shorter nephron loops"' } },
      { type: 'mcq', prompt: 'Sympathetic nerve stimulation to the kidney results in which combination of physiological actions?', options: ['Inhibition of renin and massive natriuresis', 'Regulation of glomerular blood flow, renin stimulation, and direct stimulation of water and Na+ reabsorption', 'Complete cessation of tubular transport', 'Vasodilation of afferent arterioles and diuresis'], answer: 1,
        explanation: 'Sympathetic activation constricts renal arterioles, stimulates renin release from juxtaglomerular cells, and directly enhances tubular Na+ and water reabsorption.',
        src: { ref: 'phys.renal.tut', location: 'p2 "the regulation of glomerular blood flow and pressure."' } },
      { type: 'typed', prompt: 'Sodium reabsorption in the DCT and cortical collecting duct is accelerated by the secretion of which adrenal corticosteroid hormone?', accept: ['aldosterone', 'Aldosterone'],
        explanation: 'Aldosterone accelerates Na+ reabsorption and K+ secretion in the distal tubule and cortical collecting duct.',
        src: { ref: 'phys.renal.tut', location: 'p2 "aldosterone."' } },
      { type: 'matching', prompt: 'Match each renal regulatory component to its physiological outcome.',
        pairs: [['External urethral sphincter', 'can be controlled voluntarily'], ['Proximal convoluted tubule', 'absorption of ions, organic molecules, vitamins, and water.'], ['Juxtaglomerular complex', 'stimulation of renin release'], ['Elevated ADH', 'the amount of water reabsorbed increases.']],
        explanation: 'These pairings connect renal anatomical structures to their specific transport and regulatory functions.',
        src: { ref: 'phys.renal.tut', location: 'p1 "The external uretheral sphincter can be controlled voluntarily."' } },
    ],
    application: [
      { type: 'scenario', prompt: 'Describe the hormonal, neural, and tubular mechanisms that alter urine concentration and volume after an athlete completes an intense 1000-meter race in hot conditions.',
        model: 'Intense exercise and sweat-induced dehydration cause fluid loss, lowering blood volume and raising plasma osmolality. Sympathetic renal nerve activation constricts renal arterioles (reducing GFR) and triggers renin secretion from the juxtaglomerular complex. Renin produces angiotensin II, which stimulates aldosterone release to accelerate Na+ reabsorption in the DCT and collecting system. Concurrently, hyperosmolality stimulates hypothalamic osmoreceptors to secrete ADH, which inserts aquaporins into collecting ducts to maximally reabsorb water into the hyperosmolar medullary interstitium. Together, these mechanisms produce a markedly decreased volume of highly concentrated, dark urine.',
        rubric: ['Identifies sympathetic vasoconstriction and renin stimulation', 'Explains aldosterone-accelerated Na+ reabsorption in the DCT', 'Details ADH-mediated water recovery producing low-volume, concentrated urine'] },
    ],
    commonMistakes: [
      'Believing urea is completely excreted (about 50% of filtered urea is passively reabsorbed in the PCT).',
      'Confusing the internal and external urethral sphincters (the internal sphincter is involuntary smooth muscle; the external is voluntary skeletal muscle).',
      'Thinking beavers need long loops of Henle (beavers live in water and have shorter loops; desert animals have long loops).',
    ],
    skills: [
      'Differentiating cortical and juxtamedullary nephron loops, detailing PCT nutrient reabsorption and passive urea recycling, analyzing sympathetic regulation of GFR and renin release, explaining aldosterone and ADH actions, and identifying voluntary micturition mechanics.',
    ],
    selfCheck: 'State which urethral sphincter is voluntary, what proportion of urea is reabsorbed in the PCT, why beavers have shorter loops of Henle, and what three actions sympathetic renal nerves cause.',
    sourceRefs: [
      { ref: 'phys.renal.tut', location: 'p1 "The external uretheral sphincter can be controlled voluntarily."' },
      { ref: 'phys.renal.tut', location: 'p1 "primary function of the proximal convoluted tubule is:"' },
      { ref: 'phys.renal.tut', location: 'p1 "absorption of ions, organic molecules, vitamins, and water."' },
      { ref: 'phys.renal.tut', location: 'p1 "Identify the two classes of nephrons and briefly describe the characteristics of each."' },
      { ref: 'phys.renal.tut', location: 'p2 "passively reabsorbed in the proximal convoluted tubule."' },
      { ref: 'phys.renal.tut', location: 'p2 "Beavers have relatively little need to conserve water and could therefore be"' },
      { ref: 'phys.renal.tut', location: 'p2 "shorter nephron loops"' },
      { ref: 'phys.renal.tut', location: 'p2 "Sympathetic activation of nerve fibers in the nephron causes"' },
      { ref: 'phys.renal.tut', location: 'p2 "the regulation of glomerular blood flow and pressure."' },
      { ref: 'phys.renal.tut', location: 'p2 "the stimulation of renin release from the juxtaglomerular complex."' },
      { ref: 'phys.renal.tut', location: 'p2 "aldosterone."' },
      { ref: 'phys.renal.tut', location: 'p2 "When ADH levels rise,"' },
      { ref: 'phys.renal.tut', location: 'p2 "the amount of water reabsorbed increases."' },
    ],
  },
  {
    id: 'abct2326-nervous-synaptic-refractory-neuroglia',
    subject: 'ABCT2326', unit: 'phys.nerv', type: 'concept',
    title: 'Neuroglia functions, action potential refractory periods, and synaptic storage',
    tags: ['nervous', 'neuroglia', 'action-potential', 'refractory-period', 'high-yield'],
    lesson: {
      explanation: 'The nervous system coordinates cellular signaling via polarized neurons and specialized neuroglia. Within the central nervous system, four glial cell classes provide essential support: astrocytes are positioned between neurons and capillaries to form part of the blood-brain barrier and regulate interstitial ions; oligodendrocytes form myelin sheaths; ependymal cells line ventricles and circulate cerebrospinal fluid; and microglia serve as specialized resident phagocytes that engulf cellular debris and pathogens. In peripheral motor control, motor neurons transmit impulses from the CNS to effectors (muscles and glands), whereas sensory neurons convey inputs from receptors to the CNS. The transmembrane potential reflects the electrical separation of charges across the membrane (-70 mV resting potential). When an action potential fires, rapid depolarization via voltage-gated Na+ channels is followed by the repolarization phase, during which the primary activity is K+ ions flowing out of the cell down their electrochemical gradient. The absolute refractory period of a neuron occurs during depolarization and the first part of the repolarization phase, during which voltage-gated Na+ channels are either actively open or locked in an inactivated conformation, making it biophysically impossible to generate another action potential regardless of stimulus strength. Down the axon, the speed of impulse conduction along an axon may be increased by a myelin sheath through saltatory conduction at nodes of Ranvier. At terminal chemical synapses, synaptic vesicles store neurotransmitter molecules, which are released into the synaptic cleft upon calcium influx to bind post-synaptic receptors.',
      plain: 'Astrocytes form part of the blood-brain barrier; microglia are phagocytic; oligodendrocytes myelinate the CNS. Motor neurons transmit impulses from the CNS to effectors. Action potential repolarization is driven by K+ efflux. The absolute refractory period spans depolarization and the first part of repolarization due to Na+ channel inactivation. Myelin sheaths increase conduction speed via saltatory conduction; synaptic vesicles store neurotransmitter.',
      keyFacts: [
        'Motor neurons transmit impulses from the CNS to effectors (muscles and glands).',
        'Astrocytes are positioned between neurons and capillaries to form part of the blood-brain barrier.',
        'Microglia are the phagocytotic cells of the central nervous system.',
        'Synaptic vesicles in axonal terminals store neurotransmitter molecules.',
        'During the repolarization phase of an action potential, the primary activity is K+ ions flowing out of the cell.',
        'The absolute refractory period occurs during depolarization and the first part of the repolarization phase.',
        'The speed of impulse conduction along an axon is increased by a myelin sheath.',
      ],
      prerequisites: ['phys-nerve-cellular-action-potential', 'abct2326-nervous-divisions'],
      examples: ['Multiple sclerosis involves autoimmune demyelination, causing saltatory conduction failure, dispersion of action potentials, and sensory-motor deficits.'],
    },
    memory: {
      chunking: 'Glial Roles (Astrocytes = BBB, Microglia = Phagocytes, Oligodendrocytes = CNS Myelin, Ependymal = CSF) · Repolarization (K+ efflux) · Absolute Refractory (depol + early repol; Na+ channel inactivation) · Conduction Speed (myelin sheath / saltatory).',
      comparison: 'Absolute vs Relative Refractory Period: Absolute period (depolarization and early repolarization) has inactivated Na+ channels—no stimulus can fire; Relative period (late repolarization and hyperpolarization) has closed Na+ channels and open K+ channels—a suprathreshold stimulus can fire.',
      number: '4 CNS glial types · -70 mV resting potential · 100% of Na+ channels inactivated during absolute refractory period.',
    },
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
    skills: [
      'Differentiating CNS glial functions (astrocytes, microglia, oligodendrocytes, ependymal), explaining action potential ion flux (Na+ depolarization, K+ repolarization), analyzing the biophysical basis of the absolute refractory period, and contrasting motor and sensory pathway directions.',
    ],
    selfCheck: 'State which glial cells form the BBB and which are phagocytic, what ion movement drives repolarization, when the absolute refractory period occurs, and what synaptic vesicles store.',
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
