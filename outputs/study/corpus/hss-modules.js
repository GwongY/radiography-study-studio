/*
 * HSS2011 Human Anatomy — the per-module study items.
 *
 * Split out of study-data.js in phase 2026-09-01. outputs/study-data.js is
 * the barrel every importer still uses; nothing imports this file directly
 * except its siblings.
 */

export const HSS_MODULES = [
  {
    "id": "hss2011-m1-heart-wall-valves",
    "subject": "HSS2011",
    "unit": "hss.m1",
    "type": "definition",
    "title": "Heart wall layers, pericardial sac and cardiac muscle histology",
    "tags": [
      "thorax",
      "cardiovascular",
      "heart",
      "histology",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "Which of the following structures does NOT form part of the heart wall?",
        "options": [
          "Epicardium",
          "Pericardium",
          "Myocardium",
          "Endocardium"
        ],
        "answer": 1,
        "explanation": "Model answer B. The heart wall proper is composed of three concentric layers: epicardium (visceral serous pericardium), myocardium, and endocardium. The pericardium is the separate fibroserous sac surrounding the heart.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p22 \"Which of the following structure does not form part of the heart wall\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Cardiac muscle cells in the myocardium are interconnected end-to-end by specialized membrane structures known as:",
        "options": [
          "Dense fibrous layers",
          "Intercalated discs",
          "Basement membranes",
          "Areolar tissue septa"
        ],
        "answer": 1,
        "explanation": "Model answer B. Intercalated discs link adjacent cardiomyocytes, containing desmosomes for physical mechanical anchoring and gap junctions for electrical impulse transmission.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p22 \"Cardiac muscle cells in the heart are interconnected by\""
        }
      },
      {
        "type": "mcq",
        "prompt": "What is the specific physiological function of gap junctions located within the intercalated discs of cardiac muscle?",
        "options": [
          "Prevent mechanical tearing of cells during forceful ventricular contraction",
          "Allow direct ionic diffusion between cells to coordinate synchronous electrical contraction",
          "Synthesize and secrete pericardial fluid into the pericardial cavity",
          "Anchor cardiac muscle fibers to the fibrous skeleton of the heart"
        ],
        "answer": 1,
        "explanation": "Gap junctions provide low-resistance aqueous channels that permit ions to pass directly from one cardiomyocyte to the next, enabling rapid action potential propagation and syncytial contraction.",
        "src": {
          "ref": "hss.1.1",
          "location": "p13 \"Gap junction\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The smooth inner cellular lining of the heart chambers that is continuous with the endothelium of the great vessels is the ______.",
        "accept": [
          "endocardium"
        ],
        "explanation": "The endocardium is the simple squamous endothelial and subendothelial layer lining the chambers and covering the heart valves.",
        "src": {
          "ref": "hss.1.1",
          "location": "p12 \"epicardium, myocardium, and endocardium\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The potential space between the parietal serous pericardium and the visceral serous pericardium is the ______ cavity.",
        "accept": [
          "pericardial"
        ],
        "explanation": "The pericardial cavity lies between the parietal and visceral serous pericardial membranes and contains lubricating serous fluid.",
        "src": {
          "ref": "hss.1.1",
          "location": "p8 \"parietal pericardium\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A patient with acute viral pericarditis develops a large pericardial effusion. Between which two specific anatomical layers does this fluid accumulate, and why does rapid accumulation cause hemodynamic collapse?",
        "model": "Fluid accumulates in the pericardial cavity between the parietal layer of the serous pericardium and the visceral layer of the serous pericardium (epicardium). Because the outer fibrous pericardium is rigid and inelastic, rapid fluid accumulation increases intrapericardial pressure, preventing diastolic filling of the thin-walled right atrium and ventricle, causing cardiac tamponade and obstructive shock.",
        "rubric": [
          "Identifies the pericardial cavity between parietal serous pericardium and visceral serous pericardium (epicardium)",
          "Notes the outer fibrous pericardium is rigid, dense, and inelastic",
          "Explains elevated intrapericardial pressure compresses cardiac chambers and prevents diastolic filling (cardiac tamponade)"
        ]
      }
    ],
    "commonMistakes": [
      "Confusing the pericardium with a layer of the heart wall (the wall has only 3 layers: epicardium, myocardium, endocardium).",
      "Thinking the visceral pericardium and epicardium are different structures (they are two names for the exact same anatomical serous layer).",
      "Confusing desmosomes (mechanical tensile strength) with gap junctions (electrical ionic coupling) within intercalated discs."
    ],
    "sourceRefs": [
      {
        "ref": "hss.1.1",
        "location": "p12 \"epicardium, myocardium, and endocardium\""
      },
      {
        "ref": "hss.1.1",
        "location": "p12 \"Myocardium is the muscular wall\""
      },
      {
        "ref": "hss.1.1",
        "location": "p13 \"Intercalated disc\""
      },
      {
        "ref": "hss.1.1",
        "location": "p13 \"Desmosomes\""
      },
      {
        "ref": "hss.1.1",
        "location": "p13 \"Gap junction\""
      },
      {
        "ref": "hss.1.2",
        "location": "p7 \"Pericardium\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p20 \"Keywords to learn\""
      },
      {
        "ref": "hss.revans",
        "location": "p2 \"Module 1.2\""
      }
    ]
  },
  {
    "id": "hss2011-m1-lungs-airway",
    "subject": "HSS2011",
    "unit": "hss.m1",
    "type": "definition",
    "title": "Trachea and the bronchial tree: branching, cartilage and airway calibre",
    "tags": [
      "thorax",
      "respiratory",
      "trachea",
      "bronchi",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "An inhaled peanut is most likely to lodge in which bronchus, and why?",
        "options": [
          "Left primary bronchus — it is wider and more vertical",
          "Right primary bronchus — it is larger in diameter and descends more steeply",
          "Left primary bronchus — it is shorter",
          "Either equally — the bronchi are symmetrical"
        ],
        "answer": 1,
        "explanation": "The right primary bronchus is larger in diameter than the left and descends at a steeper angle into the lung, so aspirated material preferentially enters it.",
        "src": {
          "ref": "hss.resp",
          "location": "p20 \"Right primary\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The trachea contains 15–20 C-shaped ______ cartilages.",
        "accept": [
          "tracheal",
          "hyaline"
        ],
        "explanation": "The tracheal rings are C-shaped hyaline cartilage, open posteriorly.",
        "src": {
          "ref": "hss.resp",
          "location": "p19 \"Contains 15-20 C-shaped tracheal cartilages\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The trachea begins anterior to vertebra C6 and ends in the mediastinum at the ______ level.",
        "accept": [
          "T5",
          "t5"
        ],
        "explanation": "The trachea ends at T5, the sternal angle level, where the carina marks the bifurcation.",
        "src": {
          "ref": "hss.resp",
          "location": "p19 \"Ends in the mediastinum at T5 level\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which statement about the bronchial tree is correct?",
        "options": [
          "Primary bronchi are intrapulmonary",
          "Bronchioles contain more cartilage than tertiary bronchi",
          "From primary to tertiary bronchi the walls contain progressively less cartilage and more smooth muscle",
          "Each secondary bronchus supplies a single bronchopulmonary segment"
        ],
        "answer": 2,
        "explanation": "Cartilage decreases and smooth muscle increases from primary to tertiary bronchi; bronchioles have none. Segmental (tertiary) bronchi, not secondary, supply individual bronchopulmonary segments.",
        "src": {
          "ref": "hss.resp",
          "location": "p22 \"progressively less cartilage and\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The conducting division of the airway ends at the ______ bronchiole; the respiratory division begins at the respiratory bronchiole.",
        "accept": [
          "terminal"
        ],
        "explanation": "Terminal bronchioles are the last purely conducting airways; respiratory bronchioles carry the first alveoli.",
        "src": {
          "ref": "hss.resp",
          "location": "p22 \"End of conducting division\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A radiographer reviews a chest film of an intubated patient and notes the endotracheal tube tip has advanced past the carina into a main bronchus, with collapse of the opposite lung. State which bronchus the tube has almost certainly entered, justify this from bronchial geometry, and name the lobe most at risk of also collapsing.",
        "model": "The tube has almost certainly entered the right primary bronchus, because it is larger in diameter and descends at a steeper, more vertical angle from the trachea than the left, so a tube advanced too far follows the straighter path to the right. The left lung is no longer ventilated and collapses (absorption atelectasis). Because the right upper lobe bronchus arises very close to the carina, the tube tip often lies beyond it, so the right upper lobe may also collapse while ventilation is delivered mainly to the right middle and lower lobes.",
        "rubric": [
          "Identifies the right primary bronchus as the one entered, citing its larger diameter and steeper angle",
          "Explains contralateral (left) lung collapse from loss of ventilation",
          "Notes the right upper lobe is at risk because its bronchus leaves close to the carina"
        ]
      }
    ],
    "commonMistakes": [
      "Swapping the numbers: the trachea is 2.5 cm in diameter and 11 cm long, not the reverse.",
      "Saying tracheal rings are complete — they are C-shaped and open posteriorly, bridged by trachealis muscle.",
      "Attributing bronchopulmonary segments to secondary bronchi — each segment is supplied by a tertiary (segmental) bronchus."
    ],
    "sourceRefs": [
      {
        "ref": "hss.resp",
        "location": "p19 \"2.5 cm diameter & 11 cm\""
      },
      {
        "ref": "hss.resp",
        "location": "p19 \"Begins anterior to vertebra C6\""
      },
      {
        "ref": "hss.resp",
        "location": "p19 \"Contains 15-20 C-shaped tracheal cartilages\""
      },
      {
        "ref": "hss.resp",
        "location": "p20 \"Right primary\""
      },
      {
        "ref": "hss.resp",
        "location": "p22 \"Primary bronchi - extrapulmonary\""
      },
      {
        "ref": "hss.resp",
        "location": "p22 \"progressively less cartilage and\""
      },
      {
        "ref": "hss.1.2",
        "location": "p32 \"branches to form the right and left primary\""
      },
      {
        "ref": "hss.1.2",
        "location": "p33 \"Each segmental bronchus supplies air to a single\""
      }
    ]
  },
  {
    "id": "hss2011-m2-cns-basics",
    "subject": "HSS2011",
    "unit": "hss.m2",
    "type": "definition",
    "title": "The spinal cord: grey matter, white matter and the tracts",
    "tags": [
      "neuroanatomy",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "The ventral (anterior) root of a spinal nerve transmits ________ information ________ the spinal cord.",
        "options": [
          "Sensory; toward",
          "Sensory; away from",
          "Motor; toward",
          "Motor; away from"
        ],
        "answer": 3,
        "explanation": "Model answer D. Motor fibres leave through the ventral root from the anterior horn; sensory fibres enter through the dorsal root.",
        "src": {
          "ref": "hss.revans",
          "location": "Module 2.1, MCQ 1"
        }
      },
      {
        "type": "mcq",
        "prompt": "Ascending tracts of the spinal cord carry:",
        "options": [
          "Motor commands toward the spinal cord",
          "Sensory information toward the brain",
          "Motor commands toward the brain",
          "Sensory information toward the effectors"
        ],
        "answer": 1,
        "explanation": "Ascending is the direction, sensory is the cargo: up toward the brain. Descending reverses both — motor commands, down to the cord.",
        "src": {
          "ref": "hss.2.2",
          "location": "p5 Ascending and Descending Tracts"
        }
      },
      {
        "type": "cloze",
        "prompt": "In an ascending sensory pathway the axon crosses the midline (decussates) in the ______-order neuron.",
        "accept": [
          "2nd",
          "second",
          "second-order",
          "2nd-order",
          "two"
        ],
        "explanation": "Decussation occurs in the 2nd (second-order) neuron, so the left cortex receives sensation from the right body.",
        "src": {
          "ref": "hss.mooc3",
          "location": "p2 Reflexes, Ascending and Descending Tracts"
        }
      },
      {
        "type": "mcq",
        "prompt": "The majority of upper motor neuron axons of the descending tracts decussate at the:",
        "options": [
          "Pyramids of the medulla oblongata",
          "Cerebral peduncles of the midbrain",
          "Basis pontis",
          "Anterior horn of the spinal cord"
        ],
        "answer": 0,
        "explanation": "Model answer: the pyramids of the medulla oblongata — the pyramidal (motor) decussation.",
        "src": {
          "ref": "hss.fib5yr",
          "location": "Module 3 stroke case, p13"
        }
      },
      {
        "type": "cloze",
        "prompt": "A stroke that damages the motor centres of the left side of the brain causes loss of function on the ______ side of the body.",
        "accept": [
          "right",
          "opposite",
          "contralateral"
        ],
        "explanation": "The descending tract has already crossed, so a left-brain lesion produces a right-sided deficit.",
        "src": {
          "ref": "hss.mooc3",
          "location": "p4 Descending Tracts"
        }
      },
      {
        "type": "cloze",
        "prompt": "Sensory neurons that carry signals toward the central nervous system are described as ______.",
        "accept": [
          "afferent"
        ],
        "explanation": "Model answer: afferent. Efferent fibres carry motor signals away from the CNS.",
        "src": {
          "ref": "hss.revans",
          "location": "Module 2.1, Fill-in-blanks 4"
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A patient has a right-sided weakness of the arm and leg after a stroke. Reasoning only from the tracts, on which side of the brain is the lesion, and why?",
        "model": "On the left. Descending motor commands travel from the upper motor neuron in the cortex and the majority decussate at the pyramids of the medulla oblongata, so the left cortex controls the right side of the body. A right-sided motor deficit therefore localises to the left cerebral hemisphere.",
        "rubric": [
          "States the lesion is on the left",
          "Names the upper motor neuron / descending tract",
          "Explains the decussation at the medullary pyramids"
        ]
      }
    ],
    "commonMistakes": [
      "Saying the sensory pathway crosses in the 1st- or 3rd-order neuron — it is the 2nd-order neuron that decussates.",
      "Placing the motor (pyramidal) decussation in the spinal cord or pons rather than the pyramids of the medulla.",
      "Treating the outer rim of the cord as grey matter because it is superficial — in the cord the grey matter is central and the white matter is the outer layer."
    ],
    "sourceRefs": [
      {
        "ref": "hss.2.2",
        "location": "p4 \"Bundles of axons (tracts)\" — white matter; grey matter has somas, dendrites, proximal axons and synaptic integration"
      },
      {
        "ref": "hss.2.2",
        "location": "p5 \"Ascending tracts carry sensory information toward the brain\" and descending tracts carry motor commands to the spinal cord"
      },
      {
        "ref": "hss.2.2",
        "location": "p11 \"Neuron cell bodies\" in grey matter; white matter is \"Tracts – bundles of axons\" and \"Myelinated\""
      },
      {
        "ref": "hss.mooc3",
        "location": "p2 \"3 neurons: 1st, 2nd, 3rd neuron\" and decussation \"in 2nd neuron\""
      },
      {
        "ref": "hss.mooc3",
        "location": "p2 ascending tracts carry \"pain, temperature, coarse touch, fine touch, vibration, proprioception\""
      },
      {
        "ref": "hss.mooc3",
        "location": "p4 \"Upper Motor Neuron: in the cortex\", \"Lower Motor Neuron: in the brainstem or spinal cord\"; stroke damages one side of the brain, function lost on the opposite side of the body"
      },
      {
        "ref": "hss.mooc3",
        "location": "p6 dorsal root \"carries sensory signals to dorsal horn\"; ventral root \"receives motor signals from ventral horn\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p13 \"decussate at the pyramids of the medulla oblongata\" (Mr Law stroke case)"
      },
      {
        "ref": "hss.revans",
        "location": "Module 2.1 Fill-in-blanks 4 \"Afferent\""
      }
    ]
  },
  {
    "id": "hss2011-m2-brain-regions",
    "subject": "HSS2011",
    "unit": "hss.m2",
    "type": "definition",
    "title": "Diencephalon and the limbic system",
    "tags": [
      "neuroanatomy",
      "diencephalon",
      "limbic"
    ],
    "practice": [
      {
        "type": "cloze",
        "prompt": "The part of the diencephalon that acts as the \"gateway\" to the cerebral cortex, the passage for sensory input, is the ______.",
        "accept": [
          "thalamus"
        ],
        "explanation": "The thalamus is composed of several nuclei and is the gateway to the cerebral cortex, the passage for sensory input, with additional motor control, memory and emotion roles.",
        "src": {
          "ref": "hss.2.3",
          "location": "p16 \"Gateway \" — \"to the cerebral cortex\""
        }
      },
      {
        "type": "mcq",
        "prompt": "The hypothalamus is the major control centre of the:",
        "options": [
          "Somatic nervous system only",
          "Autonomic nervous system and the endocrine system",
          "Ventricular system",
          "Reticular activating system"
        ],
        "answer": 1,
        "explanation": "The hypothalamus is the major control centre of the autonomic nervous system and the endocrine system: thermoregulation, hormone secretion, food and water intake, circadian rhythm, emotion.",
        "src": {
          "ref": "hss.2.3",
          "location": "p17 \"Major control center of the autonomic\" — \"nervous system and endocrine system\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The pineal gland, found in the posterior epithalamus, secretes the hormone ______.",
        "accept": [
          "melatonin"
        ],
        "explanation": "The pineal gland is in the posterior epithalamus and secretes melatonin.",
        "src": {
          "ref": "hss.2.3",
          "location": "p18 \"Secretes hormone melatonin\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each limbic role or component.",
        "pairs": [
          [
            "Hippocampus",
            "Holds recent / short-term memory"
          ],
          [
            "Prefrontal lobe",
            "Stores long-term memory"
          ],
          [
            "Limbic system overall",
            "Centre of emotion and learning"
          ],
          [
            "Emotional behaviour",
            "Involves the ANS and endocrine system"
          ]
        ],
        "explanation": "The limbic system converts recent memory (hippocampus) to long-term memory (prefrontal lobe), and its emotional output runs through the autonomic and endocrine systems.",
        "src": {
          "ref": "hss.2.3",
          "location": "p19 \"converts recent memory to long term memory\" — \"short term\" — \"hippocampus\" — \"long term\" — \"prefrontal lobe\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A lesion of the hypothalamus could disturb an unusually wide range of body functions. Name four, and say why one small region has such reach.",
        "model": "Any four of: temperature regulation, hunger and thirst (food and water intake), the sleep-wake cycle and circadian rhythm, hormone secretion, autonomic effects on the viscera, emotional responses, memory. The reach follows from its role: it is the major control centre of both the autonomic nervous system and the endocrine system, and it drives the pituitary through the infundibulum, so one region sets both the fast (autonomic) and slow (hormonal) outputs of the internal environment.",
        "rubric": [
          "Names four hypothalamic functions",
          "Identifies it as the control centre of the ANS and endocrine system",
          "Mentions the pituitary link via the infundibulum"
        ]
      }
    ],
    "commonMistakes": [
      "Swapping the geniculate nuclei: medial is auditory, lateral is visual.",
      "Calling the pineal gland part of the hypothalamus; it is in the epithalamus.",
      "Listing Wernicke’s area as limbic; the limbic components are cingulate gyrus, hippocampus and amygdala."
    ],
    "sourceRefs": [
      {
        "ref": "hss.2.3",
        "location": "p12 \"Thalamus\" — \"Hypothalamus\" — \"Pineal gland\" — \"Epithalamus\" — \"Mammillary body\""
      },
      {
        "ref": "hss.2.3",
        "location": "p16 \"Composed of several nuclei\" — \"Passage for sensory input\" — \"Medial geniculate nucleus\" — \"Lateral geniculate nucleus\""
      },
      {
        "ref": "hss.2.3",
        "location": "p17 \"Major control center of the autonomic\" — \"nervous system and endocrine system\" — \"Thermoregulation\" — \"Food and water intake\" — \"Sleep and circadian rhythms\" — \"Infundibulum\""
      },
      {
        "ref": "hss.2.3",
        "location": "p18 \"Pineal gland\" — \"Found in posterior epithalamus\" — \"Secretes hormone melatonin\""
      },
      {
        "ref": "hss.2.3",
        "location": "p19 \"Important center of emotion and learning\" — \"Cingulate gyrus\" — \"Hippocampus\" — \"Amygdala\" — \"converts recent memory to long term memory\""
      },
      {
        "ref": "hss.2.3",
        "location": "p20 \"Limbic system\" — \"Fornix\" — \"Hippocampus\" — \"Amygdala\" — \"Temporal lobe\""
      }
    ]
  },
  {
    "id": "hss2011-m3-digestive",
    "subject": "HSS2011",
    "unit": "hss.m3",
    "type": "concept",
    "title": "The digestive system: the tract, the accessory organs, and the four-layer wall",
    "tags": [
      "digestive",
      "abdomen",
      "histology",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "Which region of the digestive tract has three muscle layers in its muscularis externa?",
        "options": [
          "Oesophagus",
          "Duodenum",
          "Stomach",
          "Rectum"
        ],
        "answer": 2,
        "explanation": "The muscularis externa has inner circular and outer longitudinal layers everywhere — except the stomach, which adds a third, innermost oblique layer.",
        "src": {
          "ref": "hss.3.1",
          "location": "p25 \"stomach, which has 3 muscle layers\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The epithelium of the mucosal layer along most of the digestive tract is ______.",
        "accept": [
          "simple columnar epithelium",
          "simple columnar"
        ],
        "explanation": "Model answer: simple columnar epithelium — suited to secretion and absorption along most of the tract.",
        "src": {
          "ref": "hss.revans",
          "location": "p3 \"Simple columnar epithelium\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Blood vessels, lymphatic vessels and the submucosal plexus are found in which wall layer?",
        "options": [
          "Mucosa",
          "Submucosa",
          "Muscularis externa",
          "Serosa"
        ],
        "answer": 1,
        "explanation": "The submucosa is the connective tissue layer containing blood vessels, lymphatic vessels, nerve fibres and mucous glands such as the oesophageal glands.",
        "src": {
          "ref": "hss.3.1.2019",
          "location": "p10 \"Four tissue layers\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Stratified squamous epithelium lines the mucosa of all of the following EXCEPT the:",
        "options": [
          "Mouth",
          "Pharynx",
          "Stomach",
          "Anal canal"
        ],
        "answer": 2,
        "explanation": "Stratified squamous protects the abrasion points — mouth, pharynx, oesophagus and anal canal. The stomach is simple columnar for secretion.",
        "src": {
          "ref": "hss.3.1",
          "location": "p25 \"Stratified squamous\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The stomach plus the intestines together are called the ______ tract.",
        "accept": [
          "gastrointestinal",
          "GI",
          "gastrointestinal (GI)"
        ],
        "explanation": "Stomach plus intestines = the gastrointestinal (GI) tract; the digestive tract as a whole is the alimentary canal.",
        "src": {
          "ref": "hss.3.1",
          "location": "p2 \"Stomach plus intestines = gastrointestinal (GI) tract\""
        }
      },
      {
        "type": "mcq",
        "prompt": "The digestive tract (alimentary canal) measures approximately:",
        "options": [
          "3 ft (1 m)",
          "9 ft (3 m)",
          "30 ft (9 m)",
          "90 ft (27 m)"
        ],
        "answer": 2,
        "explanation": "The tract is a muscular tube about 30 ft (9 m) long from mouth to anus.",
        "src": {
          "ref": "hss.3.1",
          "location": "p2 \"30 ft (9m) long\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A patient swallows a corrosive substance. The endoscopist reports burns in the oesophagus but normal stomach lining architecture. Using the wall-plan and epithelium knowledge, explain why the same four layers can be damaged differently at the two sites, and state which epithelium lines each.",
        "model": "The oesophagus is an abrasion corridor lined by stratified squamous epithelium built for friction, not chemistry, so a corrosive liquid pooling there burns its mucosa directly. The stomach is lined by simple columnar epithelium with mucous cells and a thick protective mucus film over gastric pits, so brief exposure is buffered before acid-and-enzyme mucosa is injured. Both organs share the same four-layer plan (mucosa, submucosa, muscularis externa, serosa — the oesophagus serous-covered only below the diaphragm), so deep burns in either organ threaten the submucosal vessels and could perforate the muscularis externa.",
        "rubric": [
          "States oesophagus = stratified squamous, stomach = simple columnar with protective mucus",
          "Explains the burns pattern from the epithelial difference (abrasion-proofing vs secretory lining)",
          "Names the shared four-layer plan and the deep-layer risk (submucosal vessels, perforation)"
        ]
      }
    ],
    "commonMistakes": [
      "Saying the whole tract is stratified squamous — only the ends (mouth, pharynx, oesophagus, anal canal) are; most of the tract is simple columnar.",
      "Three muscle layers everywhere — only the stomach has three (outer longitudinal, middle circular, inner oblique); the rest of the tract has two.",
      "Counting the teeth and liver inside the tract — they are accessory organs; food never passes through them."
    ],
    "sourceRefs": [
      {
        "ref": "hss.3.1",
        "location": "p2 \"Digestive tract (also known as the alimentary canal/gut)\""
      },
      {
        "ref": "hss.3.1",
        "location": "p2 \"30 ft (9m) long\""
      },
      {
        "ref": "hss.3.1",
        "location": "p2 \"Stomach plus intestines = gastrointestinal (GI) tract\""
      },
      {
        "ref": "hss.3.1",
        "location": "p3 \"Enzymatic digestion and absorption of\""
      },
      {
        "ref": "hss.3.1",
        "location": "p3 \"Dehydration and compaction of indigestible\""
      },
      {
        "ref": "hss.3.1",
        "location": "p25 \"Four tissue layers\""
      },
      {
        "ref": "hss.3.1",
        "location": "p25 \"esophageal glands in\""
      },
      {
        "ref": "hss.3.1",
        "location": "p25 \"stomach, which has 3 muscle layers\""
      },
      {
        "ref": "hss.3.1",
        "location": "p25 \"Stratified squamous\""
      },
      {
        "ref": "hss.3.1",
        "location": "p25 \"Simple columnar\""
      },
      {
        "ref": "hss.3.1.2019",
        "location": "p10 \"Four tissue layers\""
      },
      {
        "ref": "hss.3.1.2019",
        "location": "p10 \"Inner circular layer & Outer longitudinal layer\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p34 \"The epithelium of the mucosal layer along most of the digestive tract is\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"Simple columnar epithelium\""
      }
    ]
  },
  {
    "id": "hss2011-m3-urogenital-pelvis",
    "subject": "HSS2011",
    "unit": "hss.m3",
    "type": "concept",
    "title": "Regional anatomy of the abdomen and pelvis: quadrants, regions, walls, hiatuses, pelvic floor and perineum",
    "tags": [
      "urogenital",
      "pelvis",
      "regional-anatomy",
      "high-yield"
    ],
    "practice": [
      {
        "type": "cloze",
        "prompt": "The posterior abdominal wall is mainly formed by the ______ and ______ muscles.",
        "accept": [
          "psoas; quadratus lumborum",
          "psoas major and quadratus lumborum",
          "psoas, quadratus lumborum"
        ],
        "explanation": "Model answer: psoas; quadratus lumborum — with erector spinae behind them.",
        "src": {
          "ref": "hss.revans",
          "location": "p3 \"Psoas; Quadratus lumborum; erector spinae\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The oesophagus pierces through the diaphragm at the level of ______.",
        "accept": [
          "T10",
          "the 10th thoracic vertebra",
          "the 10th thoracic vertebra (T10)"
        ],
        "explanation": "Model answer: T10 — the oesophageal hiatus carrying oesophagus and vagus nerves.",
        "src": {
          "ref": "hss.revans",
          "location": "p3 \"The 10th thoracic vertebra (T10)\""
        }
      },
      {
        "type": "mcq",
        "prompt": "The regions along the midline, from superior to inferior, are:",
        "options": [
          "Hypogastric, umbilical, epigastric",
          "Epigastric, umbilical, hypogastric",
          "Umbilical, epigastric, hypogastric",
          "Epigastric, hypogastric, umbilical"
        ],
        "answer": 1,
        "explanation": "Model answer B: epigastric → umbilical → hypogastric — asked every year since 12/13.",
        "src": {
          "ref": "hss.pp1718",
          "location": "p3 \"The regions along the midline (from superior to inferior)\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which statement about the FEMALE pelvis is FALSE?",
        "options": [
          "It is more massive than the male pelvis",
          "The subpubic arch is an obtuse angle",
          "It is oval in shape",
          "The ischial spine is less pointed into the outlet"
        ],
        "answer": 0,
        "explanation": "It is the MALE pelvis that is heavier/more massive; the female pelvis is broader, smoother, oval-inlet with pubic angle ≥100°.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p38 \"FALSE about the female pelvis\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Name the three potential sites of ureteric-stone obstruction in order.",
        "options": [
          "UPJ, pelvic brim/external iliac crossing, bladder wall",
          "Bladder wall, UPJ, renal pelvis",
          "Pelvic brim, UPJ, urethra",
          "UPJ, inguinal canal, bladder wall"
        ],
        "answer": 0,
        "explanation": "Model answer: ureteropelvic junction; crossing the external iliac vessels and/or pelvic brim; where the ureter traverses the bladder wall.",
        "src": {
          "ref": "hss.revans",
          "location": "p4 \"Ureteropelvic junction\""
        }
      },
      {
        "type": "mcq",
        "prompt": "A fracture of the LEFT 10th rib can damage which organs?",
        "options": [
          "Liver and right kidney",
          "Spleen only",
          "Left kidney and spleen",
          "Stomach and pancreas"
        ],
        "answer": 2,
        "explanation": "Model answer: left kidney and spleen — both sit posterosuperiorly behind the left lower ribs.",
        "src": {
          "ref": "hss.revans",
          "location": "p4 \"Left kidney\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A trauma CT shows free fluid tracking from the left lower ribs into the pelvis and a fractured left 10th rib. State which organs are at risk and why, name the two peritoneal pouches in a female pelvis where blood would collect, and give the vertebral levels the blood would cross entering the IVC.",
        "model": "A left 10th rib fracture endangers the spleen (ruptured spleen is the classic rib-10/left trauma injury) and the left kidney, which sit directly deep to the posterolateral left ribs. Blood draining into the pelvis collects in the dependent peritoneal pouches: the rectouterine pouch (pouch of Douglas) between uterus and rectum — the most dependent in the female — and the vesicouterine pouch between bladder and uterus. From the pelvis, blood returns by the internal/external iliac veins → common iliac veins, which unite at L5 to form the IVC, which ascends to terminate at T8 passing through the caval hiatus.",
        "rubric": [
          "Identifies spleen + left kidney behind the left 10th rib",
          "Names rectouterine and vesicouterine pouches as the collection sites in the female",
          "Gives the iliac→IVC path with L5 formation and T8 termination"
        ]
      }
    ],
    "commonMistakes": [
      "Putting the oesophageal hiatus at T12 or the caval one at T10 — order is IVC T8, oesophagus T10, aorta T12.",
      "Listing rectus abdominis among the posterior wall muscles — it is anterolateral; the posterior wall is psoas + quadratus lumborum (+ erector spinae).",
      "Saying both gonadal veins drain into the renal veins — the RIGHT one drains directly into the IVC.",
      "Calling the perineum part of the pelvic diaphragm — the diaphragm (levator ani + coccygeus) is the floor ABOVE the perineum."
    ],
    "sourceRefs": [
      {
        "ref": "hss.3.3",
        "location": "p2 \"4 abdominopelvic quadrants\""
      },
      {
        "ref": "hss.3.3",
        "location": "p2 \"intersect at the navel\""
      },
      {
        "ref": "hss.3.3",
        "location": "p3 \"9 abdominopelvic regions\""
      },
      {
        "ref": "hss.3.3",
        "location": "p3 \"L1 - transpyloric\""
      },
      {
        "ref": "hss.3.3",
        "location": "p3 \"L5 - transtubercular\""
      },
      {
        "ref": "hss.3.3",
        "location": "p3 \"Mid-clavicular lines\""
      },
      {
        "ref": "hss.3.3",
        "location": "p6 \"McBurney's point\""
      },
      {
        "ref": "hss.3.3",
        "location": "p6 \"midclavicular line x costal margin\""
      },
      {
        "ref": "hss.3.3",
        "location": "p6 \"Femoral artery\""
      },
      {
        "ref": "hss.3.3",
        "location": "p8 \"External oblique\""
      },
      {
        "ref": "hss.3.3",
        "location": "p8 \"Transversus abdominis\""
      },
      {
        "ref": "hss.3.3",
        "location": "p8 \"linea alba\""
      },
      {
        "ref": "hss.3.3",
        "location": "p10 \"Quadratus lumborum\""
      },
      {
        "ref": "hss.3.3",
        "location": "p10 \"Psoas major muscle\""
      },
      {
        "ref": "hss.3.3",
        "location": "p10 \"powerful flexor\""
      },
      {
        "ref": "hss.3.3",
        "location": "p13 \"caval hiatus T8\""
      },
      {
        "ref": "hss.3.3",
        "location": "p13 \"oesophageal hiatus T10\""
      },
      {
        "ref": "hss.3.3",
        "location": "p13 \"aortic hiatus T12\""
      },
      {
        "ref": "hss.3.3",
        "location": "p13 \"between crura\""
      },
      {
        "ref": "hss.3.3",
        "location": "p14 \"Pelvic Inlet\""
      },
      {
        "ref": "hss.3.3",
        "location": "p14 \"sacral promontory\""
      },
      {
        "ref": "hss.3.3",
        "location": "p14 \"tip of coccyx\""
      },
      {
        "ref": "hss.3.3",
        "location": "p15 \"Levator ani\""
      },
      {
        "ref": "hss.3.3",
        "location": "p15 \"Coccygeus\""
      },
      {
        "ref": "hss.3.3",
        "location": "p16 \"perineal body\""
      },
      {
        "ref": "hss.3.3",
        "location": "p16 \"incontinence and prolapse\""
      },
      {
        "ref": "hss.3.3",
        "location": "p17 \"Sacrococcygeal joint\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p5 \"Transtubercular plane (L5)\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p5 \"plane (L1)\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p42 \"abdominal aorta begins at T12 and ends at L4\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p42 \"IVC begins at L5 and terminates at T8\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p42 \"right gonadal vein drains directly into IVC\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p42 \"left gonadal vein drains into the left renal vein\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p44 \"Pubic angle\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p44 \"Broader, smoother, less robust\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p57 \"venous plexus to vertebral column\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p18 \"central tendon of the pelvic\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"The 10th thoracic vertebra (T10)\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"Psoas; Quadratus lumborum; erector spinae\""
      },
      {
        "ref": "hss.revans",
        "location": "p4 \"Ureteropelvic junction\""
      },
      {
        "ref": "hss.revans",
        "location": "p4 \"Crossing external iliac vessels\""
      },
      {
        "ref": "hss.revans",
        "location": "p4 \"Ureter entering the urinary bladder\""
      },
      {
        "ref": "hss.revans",
        "location": "p4 \"Left kidney\""
      },
      {
        "ref": "hss.revans",
        "location": "p4 \"Spleen\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p38 \"posterior abdominal wall is mainly formed by\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p38 \"oesophagus pierces through the diaphragm at the level\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p40 \"sites of obstruction by ureteric stones\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p40 \"broken 10th rib on the left\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p11 \"perineum is a diamond shaped region\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p11 \"urogenital and the posterior anal triangles\""
      },
      {
        "ref": "hss.pp1718",
        "location": "p3 \"The regions along the midline (from superior to inferior)\""
      }
    ]
  },
  {
    "id": "hss2011-msk-bone-histology",
    "subject": "HSS2011",
    "unit": "hss.m4",
    "type": "definition",
    "title": "Bone histology: matrix composition and the four bone cell types",
    "tags": [
      "musculoskeletal",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "Which bone cell dissolves bone matrix and releases minerals into the bloodstream?",
        "options": [
          "Osteocyte",
          "Osteoblast",
          "Osteoclast",
          "Osteoprogenitor cell"
        ],
        "answer": 2,
        "explanation": "Osteoclasts dissolve bone matrix and release minerals. Osteoblasts build matrix, osteocytes maintain it, and osteoprogenitors generate new osteoblasts.",
        "src": {
          "ref": "hss.msk.2026",
          "location": "p5 \"Osteoclasts: dissolve bone matrix and release minerals\""
        }
      },
      {
        "type": "mcq",
        "prompt": "What proportion of bone matrix consists of calcium hydroxyapatite?",
        "options": [
          "One third",
          "One half",
          "Two thirds",
          "Nine tenths"
        ],
        "answer": 2,
        "explanation": "Two thirds of bone matrix is inorganic calcium hydroxyapatite, providing rigidity and compressive strength.",
        "src": {
          "ref": "hss.msk.2026",
          "location": "p5 \"2/3: Calcium hydroxyapatite\""
        }
      },
      {
        "type": "cloze",
        "prompt": "Mature bone cells reside in small chambers called ______, interconnected by narrow channels called ______ that serve as routes for nutrient and waste diffusion.",
        "accept": [
          "lacunae; canaliculi",
          "lacunae, canaliculi",
          "lacunae and canaliculi"
        ],
        "explanation": "Osteocytes reside in lacunae; canaliculi interconnect adjacent lacunae to permit nutrient and metabolic waste diffusion.",
        "src": {
          "ref": "hss.msk.2026",
          "location": "p5 \"Osteocytes: mature bone cells located in lacunae\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each bone cell type to its primary function.",
        "pairs": [
          [
            "Osteoblast",
            "Releases organic components of bone matrix"
          ],
          [
            "Osteocyte",
            "Mature cell in lacuna maintaining bone tissue"
          ],
          [
            "Osteoclast",
            "Dissolves bone matrix and releases minerals"
          ],
          [
            "Osteoprogenitor cell",
            "Stem cell that gives rise to osteoblasts"
          ]
        ],
        "explanation": "These four cell types define the complete cellular biology of bone tissue.",
        "src": {
          "ref": "hss.msk.2026",
          "location": "p5 \"Osteoprojenitor cells: stem cells that can give rise to osteoblasts\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "During continuous skeletal remodelling, both osteoblasts and osteoclasts are simultaneously active. Describe what occurs if osteoclast activity significantly outpaces osteoblast activity over several years.",
        "model": "If osteoclasts dissolve matrix faster than osteoblasts secrete new organic osteoid and minerals, progressive bone resorption occurs. This reduces trabecular density in spongy bone and thins the compact cortical shell, resulting in osteopenia and osteoporosis, making bones brittle and prone to pathologic fractures under minor mechanical loads.",
        "rubric": [
          "Identifies osteoclasts as dissolving matrix and osteoblasts as producing it",
          "Explains the net loss of bone mass and trabecular density",
          "Connects the imbalance to osteopenia/osteoporosis and fracture risk"
        ]
      }
    ],
    "commonMistakes": [
      "Confusing osteoblasts (matrix builders) with osteoclasts (matrix destroyers).",
      "Thinking osteocytes are dead or inactive cells; they are living mature cells actively maintaining matrix via canalicular transport.",
      "Assuming bone matrix is purely mineral; without the 1/3 collagen component, bone would shatter under minimal bending loads."
    ],
    "sourceRefs": [
      {
        "ref": "hss.msk.2026",
        "location": "p5 \"2/3: Calcium hydroxyapatite\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p5 \"1/3: Collagen fibers (tough &\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p5 \"Osteocytes: mature bone cells located in lacunae\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p5 \"channels (canaliculi) that interconnect the lacunae; act as route\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p5 \"for nutrient and waste diffusion\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p5 \"Osteoblasts: immature bone cells sitting on the outer bone\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p5 \"release organic components\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p5 \"Osteoclasts: dissolve bone matrix and release minerals\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p5 \"Osteoprojenitor cells: stem cells that can give rise to osteoblasts\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p6 \"dense, solid mass (closely packed & well aligned bone cells) forms the outer surface layer\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p6 \"the inner core\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"1. Compact\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"2. Spongy/ cancellous\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"3. Trabeculae\""
      }
    ]
  },
  {
    "id": "hss2011-msk-bone-marrow",
    "subject": "HSS2011",
    "unit": "hss.m4",
    "type": "definition",
    "title": "Red and yellow bone marrow: histology, distribution, and clinical significance",
    "tags": [
      "musculoskeletal"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "Which stem cells are housed in red bone marrow?",
        "options": [
          "Mesenchymal stem cells",
          "Hematopoietic stem cells",
          "Neuroepithelial cells",
          "Satellite cells"
        ],
        "answer": 1,
        "explanation": "Haematopoietic is the operative word: one stem-cell type supplies all three lineages — red cells, white cells, platelets. Yellow marrow stores fat instead, which is the contrast the question is drawing.",
        "src": {
          "ref": "hss.msk.2026",
          "location": "p7 \"contains hematopoietic stem cells\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Up to what age is red bone marrow present in all bones across the human skeleton?",
        "options": [
          "Age 2",
          "Age 5",
          "Age 12",
          "Age 18"
        ],
        "answer": 1,
        "explanation": "Red bone marrow is present in all bones before the age of 5, after which it gradually transforms into yellow marrow in the limbs.",
        "src": {
          "ref": "hss.msk.2026",
          "location": "p7 \"Present in all bones before age of 5\""
        }
      },
      {
        "type": "cloze",
        "prompt": "Yellow bone marrow contains adipose tissue and ______ stem cells that can differentiate into cartilage, bone, fat, or muscle.",
        "accept": [
          "mesenchymal"
        ],
        "explanation": "Yellow marrow contains mesenchymal stem cells with multipotent developmental capacity.",
        "src": {
          "ref": "hss.msk.2026",
          "location": "p7 \"contains adipose (fat) tissues and\""
        }
      },
      {
        "type": "typed",
        "prompt": "In an adult, where does active red bone marrow primarily persist?",
        "accept": [
          "central skeleton",
          "axial skeleton",
          "central skeleton and ends of long bones",
          "axial skeleton and proximal epiphyses"
        ],
        "explanation": "In adults, red bone marrow persists mainly in the central skeleton (pelvis, vertebrae, ribs, sternum, skull) and the proximal ends of long bones.",
        "src": {
          "ref": "hss.msk.2026",
          "location": "p7 \"In adult, persist mainly in central skeleton, but also found in ends of long bones\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A clinician performs a bone marrow biopsy on an adult patient suspected of multiple myeloma. Why is the posterior iliac crest chosen rather than the mid-shaft of the tibia?",
        "model": "In adults, active hematopoiesis takes place in red bone marrow, which persists primarily in the cancellous bone of the central axial skeleton (such as the pelvis). The mid-shaft (diaphysis) of the tibia contains yellow marrow, which consists of non-hematopoietic adipose tissue. The iliac crest provides abundant active red marrow suitable for diagnostic cell evaluation.",
        "rubric": [
          "Identifies red marrow as the required tissue for evaluating hematopoietic cells",
          "States that adult red marrow persists in the central skeleton (pelvis)",
          "Explains that adult long bone shafts contain yellow adipose marrow"
        ]
      }
    ],
    "commonMistakes": [
      "Believing adults have completely replaced all red bone marrow with yellow marrow.",
      "Thinking yellow bone marrow is dead waste tissue rather than a metabolically active lipid reserve with mesenchymal stem cells.",
      "Targeting long bone shafts for adult bone marrow biopsies instead of central axial bones."
    ],
    "sourceRefs": [
      {
        "ref": "hss.msk.2026",
        "location": "p7 \"found in the center of most bones (spongy bones)\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p7 \"contains hematopoietic stem cells that can differentiate into RBC, WBC, and platelets\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p7 \"Present in all bones before age of 5; and gradually transform into yellow bone marrow;\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p7 \"In adult, persist mainly in central skeleton, but also found in ends of long bones\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p7 \"Yellow bone marrow—located in the cavities of long bones;\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p7 \"contains adipose (fat) tissues and mesenchymal stem cells that can develop into cartilage, bone, fat, or muscle cells (if needed).\""
      },
      {
        "ref": "hss.4.1",
        "location": "p6 \"bone marrow => red blood cells\""
      },
      {
        "ref": "hss.4.1",
        "location": "p16 \"medullary cavity\""
      },
      {
        "ref": "hss.4.1",
        "location": "p16 \"containing bone marrow\""
      }
    ]
  },
  {
    "id": "hss2011-msk-tissues-of-movement",
    "subject": "HSS2011",
    "unit": "hss.m4",
    "type": "definition",
    "title": "The five movement tissues: structural roles, counts, and classifications",
    "tags": [
      "musculoskeletal",
      "foundation"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "Which connective tissue connects bone to bone and limits joint movement?",
        "options": [
          "Tendon",
          "Ligament",
          "Epimysium",
          "Aponeurosis"
        ],
        "answer": 1,
        "explanation": "Ligaments connect bone to bone, providing joint support and limiting movement. Tendons connect muscle to bone.",
        "src": {
          "ref": "hss.msk.2026",
          "location": "p3 \"connecting bone to\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each movement tissue to its approximate count in the human body.",
        "pairs": [
          [
            "Bones",
            "206"
          ],
          [
            "Skeletal muscles",
            "(> 600)"
          ],
          [
            "Ligaments",
            "(>900)"
          ],
          [
            "Tendons",
            "muscle to bone (~4000)"
          ]
        ],
        "explanation": "These are the baseline anatomical counts taught in the musculoskeletal orientation.",
        "src": {
          "ref": "hss.msk.2026",
          "location": "p3 \"Bones for movement (206)\""
        }
      },
      {
        "type": "mcq",
        "prompt": "The anterior and posterior cruciate ligaments of the knee are examples of which ligament category?",
        "options": [
          "Accessory (extrinsic) ligaments",
          "Intracapsular (intrinsic) ligaments",
          "Collateral ligaments",
          "Extra-articular ligaments"
        ],
        "answer": 1,
        "explanation": "Cruciate ligaments are intracapsular (intrinsic) ligaments, representing localized thickenings reinforcing the capsule from within.",
        "src": {
          "ref": "hss.msk.2026",
          "location": "p28 \"Localized thickenings of fibrous connective tissue\""
        }
      },
      {
        "type": "cloze",
        "prompt": "A(n) ______ ligament is separate from the joint capsule and reinforces the joint by binding bones together.",
        "accept": [
          "accessory",
          "extrinsic",
          "accessory (extrinsic)",
          "accessory/extrinsic"
        ],
        "explanation": "Accessory or extrinsic ligaments sit outside the joint capsule, exemplified by the medial and lateral collateral ligaments of the knee.",
        "src": {
          "ref": "hss.msk.2026",
          "location": "p28 \"Separate from joint capsule\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A physical therapist notes that ligaments function to \"limit joint movement\". Explain why limiting joint movement is critical for normal musculoskeletal function rather than an impairment.",
        "model": "A joint with unlimited mobility in all directions would lack mechanical stability and would dislocate under muscular pull or body weight. Ligaments bind bones together to define a precise, controlled arc of movement and prevent abnormal displacement. When ligaments tear, the clinical consequence is joint hypermobility and instability, demonstrating that mechanical restriction is essential for joint competence.",
        "rubric": [
          "Explains that unrestricted movement causes joint instability and dislocation",
          "States that ligaments define stable anatomical axes of movement",
          "Identifies joint laxity/instability as the consequence of ligamentous rupture"
        ]
      }
    ],
    "commonMistakes": [
      "Confusing tendons (muscle to bone) with ligaments (bone to bone).",
      "Thinking ligaments only facilitate movement; their crucial function is limiting excess or abnormal movement.",
      "Classifying collateral ligaments as intracapsular; collateral ligaments are accessory/extrinsic to the capsule."
    ],
    "sourceRefs": [
      {
        "ref": "hss.msk.2026",
        "location": "p3 \"To achieve movement, we will need\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p3 \"Attached onto bones\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p3 \"muscle to bone (~4000)\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p3 \"(> 600)\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p3 \"Ligaments\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p3 \"(>900)\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p3 \"Bones for movement (206)\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p3 \"connecting bone to\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p3 \"bone, giving support,\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p3 \"limiting their movement\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p3 \"protects joints and\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p3 \"facilitates movement\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p28 \"Localized thickenings of fibrous connective tissue\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p28 \"Separate from joint capsule\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p29 \"Hyaline cartilage\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p29 \"Fibrocartilage\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p29 \"Elastic cartilage\""
      }
    ]
  },
  {
    "id": "hss2011-msk-muscle-organisation",
    "subject": "HSS2011",
    "unit": "hss.m4",
    "type": "sequence",
    "title": "Skeletal muscle organization: connective tissue wrappings, myofibrils, and fascicle architecture",
    "tags": [
      "musculoskeletal",
      "high-yield"
    ],
    "practice": [
      {
        "type": "sequence",
        "prompt": "Order the connective tissue sheaths of skeletal muscle from the outermost layer inward to the individual muscle cell.",
        "items": [
          "Epimysium",
          "Perimysium",
          "Endomysium"
        ],
        "explanation": "Epimysium envelops the entire muscle; perimysium wraps fascicles; endomysium encases individual muscle fibres.",
        "src": {
          "ref": "hss.msk.2026",
          "location": "p32 \"Epimysium\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which connective tissue layer immediately surrounds an individual muscle fibre?",
        "options": [
          "Epimysium",
          "Perimysium",
          "Endomysium",
          "Sarcolemma"
        ],
        "answer": 2,
        "explanation": "The endomysium surrounds each individual muscle fibre. (The sarcolemma is the cell membrane beneath the endomysium).",
        "src": {
          "ref": "hss.msk.2026",
          "location": "p32 \"Endomysium\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The ______ is the repeating microscopic unit within muscle fibres responsible for contraction.",
        "accept": [
          "sarcomere"
        ],
        "explanation": "The sarcomere is the repeating structural and functional contractile unit along a myofibril.",
        "src": {
          "ref": "hss.msk.2026",
          "location": "p33 \"the repeating unit within muscle fibers that is responsible for contraction\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each muscle fascicle pattern to its anatomical description.",
        "pairs": [
          [
            "Fusiform",
            "Fascicles nearly parallel; muscle tapers towards tendons"
          ],
          [
            "Convergent",
            "Fascicles spread over broad area converge at thick central tendon"
          ],
          [
            "Circular",
            "Concentric fascicles forming a sphincter or opening"
          ],
          [
            "Bipennate",
            "Fascicles arranged on both sides of a central tendon"
          ]
        ],
        "explanation": "These architectural classes determine whether a muscle specializes in range of motion (parallel/fusiform) or maximum force (pennate).",
        "src": {
          "ref": "hss.msk.2026",
          "location": "p36 \"Fusiform—fascicles nearly parallel to longitudinal axis of muscle; muscle tapers towards tendons\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "Compare a parallel muscle (such as sartorius) with a multipennate muscle (such as deltoid). Explain how fascicle orientation determines the difference in contraction velocity and force generation.",
        "model": "In a parallel muscle, long fascicles run the entire length of the muscle; because sarcomeres are arranged in series, the muscle can shorten over a large distance at high velocity, but has fewer total fibres pulling in parallel so force is relatively low. In a multipennate muscle, short fascicles attach obliquely to multiple internal tendons; packing many short fibres in parallel maximizes physiological cross-sectional area, generating immense contractile force at the expense of shortening distance.",
        "rubric": [
          "Identifies parallel muscles as having long fibres arranged in series for range/velocity",
          "Identifies pennate muscles as packing many short fibres in parallel for maximum force",
          "Explains the trade-off between shortening distance and contractile force"
        ]
      }
    ],
    "commonMistakes": [
      "Confusing myofibrils (intracellular organelles) with muscle fibres (the whole multinucleated muscle cells).",
      "Placing perimysium around fibres and endomysium around fascicles—remember peri- surrounds the packet/bundle.",
      "Assuming pennate muscles produce low force because their fibres are short; pennate architecture actually produces the highest force because of high fibre density."
    ],
    "sourceRefs": [
      {
        "ref": "hss.msk.2026",
        "location": "p31 \"Generate movement\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p31 \"Maintain posture and body position\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p31 \"Support soft tissue\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p31 \"Control of body openings and passages\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p31 \"Regulate body temperature\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p31 \"Store nutrients\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p32 \"Epimysium\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p32 \"Perimysium\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p32 \"Endomysium\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p33 \"the repeating unit within muscle fibers that is responsible for contraction\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p36 \"Fusiform—fascicles nearly parallel to longitudinal axis of muscle; muscle tapers towards tendons\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p36 \"Parallel—fascicles parallel to longitudinal axis of muscle; terminate at either end in flat tendon\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p36 \"Convergent—fascicles spread over broad area converge at thick central tendon; gives muscle a triangular appearance\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p36 \"Circular—fascicles in concentric arrangements to form sphincter or opening\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p36 \"Pennate (short fascicles in relation to total muscle length)\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p36 \"Unipennate—fascicles arranged on only one side of tendon\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p36 \"Bipennate—fascicles arranged on both sides of centrally positioned tendons\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p36 \"Multipennate—fascicles attached obliquely from many directions to several tendons\""
      }
    ]
  },
  {
    "id": "hss2011-msk-tendon-attachment",
    "subject": "HSS2011",
    "unit": "hss.m4",
    "type": "definition",
    "title": "Tendon structure, Golgi tendon organ, and muscle attachment sites (origin and insertion)",
    "tags": [
      "musculoskeletal",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "Which muscle attachment site does NOT move during contraction?",
        "options": [
          "The insertion",
          "The origin",
          "The osteotendinous junction",
          "The myotendinous junction"
        ],
        "answer": 1,
        "explanation": "The origin (usually proximal) is defined as the attachment site that does not move during contraction, while the insertion moves.",
        "src": {
          "ref": "hss.msk.2026",
          "location": "p35 \"The origin (usually proximal) is the attachment site that does not move during contraction\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The point at which a tendon attaches to bone is the ______ junction, while the point where it attaches to muscle is the ______ junction.",
        "accept": [
          "osteotendinous; myotendinous",
          "osteotendinous, myotendinous",
          "osteotendinous and myotendinous"
        ],
        "explanation": "Osteotendinous attaches tendon to bone; myotendinous attaches tendon to muscle.",
        "src": {
          "ref": "hss.msk.2026",
          "location": "p35 \"Osteotendinous junction—point at which tendon attaches to bone\""
        }
      },
      {
        "type": "mcq",
        "prompt": "What physiological variable is monitored by the Golgi tendon organ?",
        "options": [
          "Muscle length and rate of stretch",
          "Tension or force developed at the tendon",
          "Joint angle and cartilage pressure",
          "Muscle temperature and glycogen stores"
        ],
        "answer": 1,
        "explanation": "The Golgi tendon organ detects tension or force developed at the tendon during muscle contraction.",
        "src": {
          "ref": "hss.msk.2026",
          "location": "p34 \"detects tension/force developed at the tendon during muscle\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each tendon structure to its anatomical description.",
        "pairs": [
          [
            "Tendon",
            "Dense regular connective tissue continuous with muscle wrappings"
          ],
          [
            "Golgi tendon organ",
            "Mechanoreceptor detecting tendon tension"
          ],
          [
            "Origin",
            "Attachment site that does not move during contraction"
          ],
          [
            "Insertion",
            "Attachment site that moves when muscle contracts"
          ]
        ],
        "explanation": "These define the key structural features and attachments of skeletal muscles and tendons.",
        "src": {
          "ref": "hss.msk.2026",
          "location": "p34 \"Dense regular connective tissues that is\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "In closed-chain chin-up exercises, the hands remain fixed to a pull-up bar while the body and trunk are pulled upward. How does this affect the standard definition of origin and insertion for the biceps and latissimus dorsi?",
        "model": "Standard definitions state that the origin is usually proximal and fixed, while the insertion is distal and mobile. In a chin-up (a closed kinetic chain motion), the distal limbs are held stationary by the bar, forcing the proximal trunk attachments to move toward the fixed distal limbs. This reverses the functional movement roles: the distal attachment acts as the fixed base while the proximal attachment travels, demonstrating why the anatomical definition specifies \"usually\" proximal/distal while movement is the functional criterion.",
        "rubric": [
          "Identifies origin as the stationary end and insertion as the moving end in open chain",
          "Explains that fixing the distal limb causes the proximal trunk attachment to move",
          "Demonstrates understanding of the functional reversal in closed kinetic chain movements"
        ]
      }
    ],
    "commonMistakes": [
      "Assuming the origin is always proximal without exception; in closed-chain exercise, the distal end stays fixed while the proximal end moves.",
      "Confusing Golgi tendon organs (tension sensors in tendons) with muscle spindles (length sensors in muscle bellies).",
      "Thinking tendons are glued onto epimysium; tendons are directly continuous with all three internal connective tissue sheaths."
    ],
    "sourceRefs": [
      {
        "ref": "hss.msk.2026",
        "location": "p34 \"Dense regular connective tissues that is\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p34 \"anatomically continuous with the endo-, peri-, and\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p34 \"epimysium at both ends of skeletal muscle\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p34 \"muscle to the bone to elicit movement\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p34 \"Golgi tendon organ\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p34 \"detects tension/force developed at the tendon during muscle\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p35 \"Myotendinous junction—point at which tendon attaches to muscles\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p35 \"Osteotendinous junction—point at which tendon attaches to bone\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p35 \"The origin (usually proximal) is the attachment site that does not move during contraction\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p35 \"The insertion (usually distal) is the attachment site that moves when the muscle contracts.\""
      }
    ]
  },
  {
    "id": "hss2011-msk-motor-unit-tone",
    "subject": "HSS2011",
    "unit": "hss.m4",
    "type": "definition",
    "title": "The motor unit and muscle tone: innervation ratios, recruitment, and resting tension",
    "tags": [
      "musculoskeletal",
      "high-yield"
    ],
    "practice": [
      {
        "type": "cloze",
        "prompt": "A motor unit is defined as a(n) ______ plus the ______ it innervates.",
        "accept": [
          "motor neuron; muscle fibres",
          "motor neuron, muscle fibers",
          "motor neuron and muscle fibres",
          "motor neurone; muscle fibres"
        ],
        "explanation": "A motor unit is a single somatic motor neuron plus all the skeletal muscle fibres it innervates.",
        "src": {
          "ref": "hss.msk.2026",
          "location": "p37 \"Motor unit =\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Roughly how many muscle fibres are commanded by a single motor neuron in an extrinsic eye muscle?",
        "options": [
          "1–2",
          "13–20",
          "200–300",
          "2000"
        ],
        "answer": 1,
        "explanation": "An eye muscle motor neuron controls 13 to 20 fibres for exquisite precision; 2000 fibres is the innervation ratio for a calf muscle.",
        "src": {
          "ref": "hss.msk.2026",
          "location": "p37 \"eye muscle may control 13-\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which mechanism explains why muscle tone can be maintained continuously without inducing muscular fatigue?",
        "options": [
          "Continuous submaximal firing of every motor unit",
          "Small groups of motor units alternating between active and inactive states in a shifting pattern",
          "Continuous non-electrical calcium leakage in muscle fibres",
          "Sensory spindle feedback inhibiting motor neurons"
        ],
        "answer": 1,
        "explanation": "Small groups of motor units alternate between active and inactive states in a constantly shifting pattern, allowing resting units to recover.",
        "src": {
          "ref": "hss.msk.2026",
          "location": "p37 \"active and inactive in a constantly shifting\""
        }
      },
      {
        "type": "typed",
        "prompt": "Roughly how many muscle fibres may be controlled by a single motor neuron in a powerful calf muscle?",
        "accept": [
          "2000",
          "2,000",
          "about 2000",
          "around 2000"
        ],
        "explanation": "A single motor neuron in a calf muscle controls approximately 2,000 muscle fibres.",
        "src": {
          "ref": "hss.msk.2026",
          "location": "p37 \"calf muscle may control 2000 muscle fibers\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A patient with a transected motor nerve exhibits completely flaccid, limp muscle tissue with zero tone. Using motor unit physiology, explain why muscle tone vanished immediately upon denervation.",
        "model": "Muscle tone is not an intrinsic passive stiffness of muscle tissue; it is an active low-level contraction sustained by motor neurons continuously sending action potentials to small rotating groups of muscle fibres. Transecting the motor nerve halts all neural input to the motor units. Because muscle fibres cannot contract without action potentials from their somatic motor neuron, all active motor unit firing ceases and muscle tone is immediately lost, resulting in flaccid paralysis.",
        "rubric": [
          "Identifies muscle tone as an active neural phenomenon requiring motor neuron firing",
          "Explains that denervation cuts off action potentials to all motor units",
          "Concludes that without motor unit activation, resting firmness is abolished"
        ]
      }
    ],
    "commonMistakes": [
      "Defining a motor unit as one neuron and only one muscle fibre; one neuron typically innervates dozens to thousands of fibres.",
      "Believing muscle tone is strong enough to produce joint movement; tone maintains resting firmness and posture without movement.",
      "Assuming all motor units in a muscle are identical in size; muscles contain a spectrum of motor units recruited according to force demands."
    ],
    "sourceRefs": [
      {
        "ref": "hss.msk.2026",
        "location": "p37 \"Motor unit =\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p37 \"Motor neuron + Muscle fibres\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p37 \"eye muscle may control 13-\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p37 \"calf muscle may control 2000 muscle fibers\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p37 \"Muscle tone—a low level of contraction\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p37 \"active and inactive in a constantly shifting\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p37 \"Not strong enough to produce a movement but able to keep skeletal muscle firm\""
      }
    ]
  },
  {
    "id": "hss2011-msk-joint-classifications",
    "subject": "HSS2011",
    "unit": "hss.m4",
    "type": "matching",
    "title": "Joint classifications: anatomical, functional, and structural axes",
    "tags": [
      "musculoskeletal",
      "high-yield"
    ],
    "practice": [
      {
        "type": "matching",
        "prompt": "Match each functional joint class to its degree of physiological mobility.",
        "pairs": [
          [
            "Synarthrosis",
            "Immovable joint"
          ],
          [
            "Amphiarthrosis",
            "Slightly movable joint"
          ],
          [
            "Diarthrosis",
            "Freely movable joint"
          ]
        ],
        "explanation": "Functional classification evaluates joints strictly by degree of mobility.",
        "src": {
          "ref": "hss.msk.2026",
          "location": "p15 \"Immovable (Synarthrosis)\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which structural class of joints is the most common throughout the human body?",
        "options": [
          "Fibrous joints",
          "Cartilaginous joints",
          "Synovial joints",
          "Synostoses"
        ],
        "answer": 2,
        "explanation": "Synovial joints, possessing a fluid-filled synovial cavity within a fibrous capsule, are the most common joints in the body.",
        "src": {
          "ref": "hss.msk.2026",
          "location": "p16 \"most common in our body\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each common joint to its official anatomical articulation name.",
        "pairs": [
          [
            "Jaw joint",
            "Temporomandibular joint"
          ],
          [
            "Shoulder joint",
            "Glenohumeral joint"
          ],
          [
            "Wrist joint",
            "Radiocarpal joint"
          ],
          [
            "Hip joint",
            "Acetabulofemoral joint"
          ],
          [
            "Ankle joint",
            "Talocrural joint"
          ]
        ],
        "explanation": "Anatomical classification constructs names from the two articulating skeletal elements.",
        "src": {
          "ref": "hss.msk.2026",
          "location": "p14 \"Jaw joint Temporomandibular joint\""
        }
      },
      {
        "type": "cloze",
        "prompt": "A slightly movable joint is functionally classified as a(n) ______.",
        "accept": [
          "amphiarthrosis",
          "amphiarthroses"
        ],
        "explanation": "An amphiarthrosis is slightly movable, whereas an immovable joint is a synarthrosis and a freely movable joint is a diarthrosis.",
        "src": {
          "ref": "hss.msk.2026",
          "location": "p15 \"Slightly movable (Amphiarthrosis)\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "Classify the glenohumeral (shoulder) joint across all three classification axes, and explain how its structural anatomy explains its functional mobility.",
        "model": "Anatomically, it is the glenohumeral joint (formed between the glenoid cavity of the scapula and the head of the humerus). Structurally, it is a synovial joint, featuring a fluid-filled joint cavity enclosed by an articular capsule and lined by synovial membrane. Functionally, it is a diarthrosis (freely movable). The structural presence of a fluid-filled cavity separates the bones so there is no solid tissue bridging them, allowing free multiaxial rotation and translation.",
        "rubric": [
          "Correctly names the joint on all three axes (glenohumeral, synovial, diarthrosis)",
          "Explains the information provided by each axis",
          "Explains how the structural synovial cavity enables functional diarthrodial mobility"
        ]
      }
    ],
    "commonMistakes": [
      "Assuming that structural and functional classifications are identical; cartilaginous joints include both synarthroses and amphiarthroses.",
      "Forgetting that the knee comprises two articulations: the tibiofemoral joint and the patellofemoral joint.",
      "Calling the elbow a single joint; anatomically it comprises humeroulnar, humeroradial, and proximal radioulnar articulations."
    ],
    "sourceRefs": [
      {
        "ref": "hss.msk.2026",
        "location": "p14 \"Jaw joint Temporomandibular joint\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p14 \"Shoulder joint Glenohumeral joint\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p14 \"Wrist joint Radiocarpal joint\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p14 \"Hip joint Acetabulofemoral joint\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p14 \"Ankle joint Talocrural joint\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p15 \"Immovable (Synarthrosis)\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p15 \"Slightly movable (Amphiarthrosis)\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p15 \"Freely movable (Diarthrosis)\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p16 \"Structural aspects\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p16 \"most common in our body\""
      }
    ]
  },
  {
    "id": "hss2011-msk-periosteum",
    "subject": "HSS2011",
    "unit": "hss.m4",
    "type": "definition",
    "title": "Periosteum: bilayered histology, osteogenic role, vascular supply, and innervation",
    "tags": [
      "musculoskeletal",
      "bone",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "Where is the periosteum normally absent on a bone?",
        "options": [
          "Along the diaphysis",
          "Over articular surfaces covered by cartilage",
          "At tendon insertion sites",
          "Along the metaphysis"
        ],
        "answer": 1,
        "explanation": "The periosteum surrounds the outer bone surface except at articular sites, where articular cartilage covers the bone instead.",
        "src": {
          "ref": "hss.msk.2026",
          "location": "p8 \"a fibrous tissue surrounding the outer surface of the bone (except the articular sites)\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each feature of the periosteum to its histological or physiological role.",
        "pairs": [
          [
            "Outer fibrous layer",
            "Dense irregular connective tissue anchoring tendons"
          ],
          [
            "Inner osteogenic layer",
            "Capable of differentiating into osteoblasts"
          ],
          [
            "Small periosteal blood vessels",
            "Nourish the outer bone cortex"
          ],
          [
            "Nutrient artery",
            "Enters shaft through nutrient foramen"
          ]
        ],
        "explanation": "These define the structural layers, cellular capabilities, and dual blood supply routes of bone.",
        "src": {
          "ref": "hss.msk.2026",
          "location": "p8 \"Inner layer is osteogenic, capable of differentiating into osteoblasts\""
        }
      },
      {
        "type": "typed",
        "prompt": "Large nutrient arteries enter the shaft of long bones through which specific cortical opening?",
        "accept": [
          "nutrient foramen"
        ],
        "explanation": "The nutrient foramen is the oblique canal in long bone shafts admitting nutrient vessels to the medullary cavity and inner cortex.",
        "src": {
          "ref": "hss.4.1",
          "location": "p7 \"the nutrient foramen\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "During orthopedic open reduction of a long bone fracture, an inexperienced surgeon extensively strips the periosteum off both bone fragments. Explain two major physiological complications that result.",
        "model": "First, stripping the periosteum tears the small periosteal blood vessels, causing cortical ischemia and devascularizing the outer cortex of the bone fragments. Second, it removes the inner osteogenic layer containing osteoprogenitor cells and osteoblasts necessary to synthesize the repair callus. The combination of vascular compromise and loss of osteogenic cells severely impairs fracture healing, risking delayed union or non-union.",
        "rubric": [
          "Identifies devascularization due to stripping periosteal capillaries",
          "Identifies loss of osteogenic cells/osteoblasts needed for callus formation",
          "Concludes that fracture healing is delayed or fails (delayed union/non-union)"
        ]
      }
    ],
    "commonMistakes": [
      "Assuming the periosteum covers the entire bone including joint surfaces; it is strictly absent over articular cartilage.",
      "Confusing the outer fibrous layer (protective/structural) with the inner osteogenic layer (cellular/osteoblastic).",
      "Thinking bone receives all its blood solely from the nutrient artery; the periosteum supplies the outer cortical third."
    ],
    "sourceRefs": [
      {
        "ref": "hss.msk.2026",
        "location": "p8 \"a fibrous tissue surrounding the outer surface of the bone (except the articular sites)\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p8 \"Inner layer is osteogenic, capable of differentiating into osteoblasts\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p8 \"Richly furnished with capillaries and nerves\""
      },
      {
        "ref": "hss.4.1",
        "location": "p7 \"nourished through small blood vessels in the periosteum\""
      },
      {
        "ref": "hss.4.1",
        "location": "p7 \"enter the shaft of long bones through\""
      },
      {
        "ref": "hss.4.1",
        "location": "p7 \"the nutrient foramen\""
      },
      {
        "ref": "hss.4.1",
        "location": "p13 \"covers the outer\""
      },
      {
        "ref": "hss.4.1",
        "location": "p13 \"surface of shaft\""
      },
      {
        "ref": "hss.4.1",
        "location": "p13 \"osteogenic, capable of differentiating into osteoblasts\""
      },
      {
        "ref": "hss.4.1",
        "location": "p13 \"with capillaries and\""
      }
    ]
  },
  {
    "id": "hss2011-upper-brachial-plexus-nerves",
    "subject": "HSS2011",
    "unit": "hss.m4",
    "type": "definition",
    "title": "Brachial plexus and major peripheral nerves of the upper limb",
    "tags": [
      "musculoskeletal",
      "upper limb",
      "nervous",
      "high-yield",
      "foundation"
    ],
    "practice": [
      {
        "type": "matching",
        "prompt": "Match each major terminal nerve of the brachial plexus to its primary motor target.",
        "pairs": [
          [
            "Musculocutaneous nerve",
            "Biceps brachii and anterior arm flexors"
          ],
          [
            "Axillary nerve",
            "Deltoid and arm abduction"
          ],
          [
            "Radial nerve",
            "Triceps brachii and forearm extensor compartment"
          ],
          [
            "Median nerve",
            "Forearm flexors and thenar muscles of the thumb"
          ],
          [
            "Ulnar nerve",
            "Intrinsic hand muscles and flexor carpi ulnaris"
          ]
        ],
        "explanation": "The five primary terminal motor distributions of the brachial plexus."
      },
      {
        "type": "mcq",
        "prompt": "Which spinal cord segments contribute their anterior rami to form the brachial plexus?",
        "options": [
          "C1 – C4",
          "C3 – C5",
          "C5 – T1",
          "T1 – T12"
        ],
        "answer": 2,
        "explanation": "The brachial plexus is formed by the anterior rami of spinal nerves from segments C5 – T1.",
        "src": {
          "ref": "hss.4.3",
          "location": "p13 \"C5 – T1\""
        }
      },
      {
        "type": "cloze",
        "prompt": "Carpal Tunnel Syndrome (CTS) is associated by signs and symptoms that are caused by the compression of the ______ nerve travelling through the wrist.",
        "accept": [
          "median",
          "median nerve",
          "Median",
          "Median nerve"
        ],
        "explanation": "The median nerve traverses the carpal tunnel and is compressed in Carpal Tunnel Syndrome.",
        "src": {
          "ref": "hss.4.3",
          "location": "p32 \"Carpal Tunnel Syndrome (CTS) is associated by\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A patient experiences a severe traction injury to the upper limb resulting in damage to the musculocutaneous nerve. Clinical evaluation demonstrates marked weakness in elbow flexion and forearm supination. Identify the anatomical compartment and the specific muscles affected by this nerve injury.",
        "model": "The musculocutaneous nerve innervates the muscles of the anterior flexor compartment of the arm, primarily the biceps brachii (a powerful flexor and supinator of the forearm) and the brachialis (the primary elbow flexor). Denervation results in profound loss of elbow flexion strength and impaired supination.",
        "rubric": [
          "Identifies the musculocutaneous nerve",
          "Identifies the anterior flexor compartment of the arm",
          "Identifies biceps brachii and brachialis as the affected muscles"
        ]
      }
    ],
    "commonMistakes": [
      "Confusing the radial nerve (all extensors) with the median nerve (forearm flexors).",
      "Believing the brachial plexus arises from posterior rami; it is strictly formed by anterior (ventral) rami (C5–T1).",
      "Forgetting that the flexor compartment of the forearm is shared between the median nerve (majority) and ulnar nerve (FCU and medial FDP)."
    ],
    "sourceRefs": [
      {
        "ref": "hss.4.3",
        "location": "p4 \"Brachial plexus\""
      },
      {
        "ref": "hss.4.3",
        "location": "p13 \"Peripheral Nerves Joining to Form Nerve Plexus\""
      },
      {
        "ref": "hss.4.3",
        "location": "p13 \"The anterior rami\""
      },
      {
        "ref": "hss.4.3",
        "location": "p13 \"Brachial Plexus.\""
      },
      {
        "ref": "hss.4.3",
        "location": "p13 \"C5 – T1\""
      },
      {
        "ref": "hss.4.3",
        "location": "p14 \"Brachial Plexus\""
      },
      {
        "ref": "hss.4.3",
        "location": "p14 \"First Rib\""
      },
      {
        "ref": "hss.4.3",
        "location": "p15 \"The Right Brachial Plexus\""
      },
      {
        "ref": "hss.4.3",
        "location": "p19 \"Innervated by: Axillary nerve\""
      },
      {
        "ref": "hss.4.3",
        "location": "p24 \"Biceps brachii muscle is a powerful\""
      },
      {
        "ref": "hss.4.3",
        "location": "p24 \"flexor and supinator of the forearm.\""
      },
      {
        "ref": "hss.4.3",
        "location": "p24 \"Innervated by: Musculocutaneous nerve\""
      },
      {
        "ref": "hss.4.3",
        "location": "p25 \"Triceps brachii is an extensor of the forearm.\""
      },
      {
        "ref": "hss.4.3",
        "location": "p25 \"Innervated by: Radial nerve\""
      },
      {
        "ref": "hss.4.3",
        "location": "p27 \"Flexor Compartment:\""
      },
      {
        "ref": "hss.4.3",
        "location": "p27 \"Median Nerve and\""
      },
      {
        "ref": "hss.4.3",
        "location": "p27 \"Ulnar Nerve.\""
      },
      {
        "ref": "hss.4.3",
        "location": "p27 \"Extensor Compartment:\""
      },
      {
        "ref": "hss.4.3",
        "location": "p27 \"Muscles are innervated\""
      },
      {
        "ref": "hss.4.3",
        "location": "p27 \"by the Radial Nerve.\""
      },
      {
        "ref": "hss.4.3",
        "location": "p32 \"Carpal Tunnel Syndrome (CTS) is associated by\""
      },
      {
        "ref": "hss.ul.2026",
        "location": "p15 \"A network of intersecting nerves originated\""
      },
      {
        "ref": "hss.ul.2026",
        "location": "p15 \"from ventral rami (C5-T1) that branches\""
      },
      {
        "ref": "hss.ul.2026",
        "location": "p15 \"into nerves supplying the upper limbs\""
      },
      {
        "ref": "hss.ul.2026",
        "location": "p27 \"All extensors are innervated by radial nerve (r n.)\""
      }
    ]
  },

  {
    "id": "hss2011-upper-limb-muscles-compartments",
    "subject": "HSS2011",
    "unit": "hss.m4",
    "type": "definition",
    "title": "Muscles and fascial compartments of the arm and forearm",
    "tags": [
      "musculoskeletal",
      "upper limb",
      "high-yield",
      "foundation"
    ],
    "practice": [
      {
        "type": "cloze",
        "prompt": "The ______ muscle is an extensor of the forearm that inserts onto the olecranon process of the ulna and is innervated by the radial nerve.",
        "accept": [
          "triceps brachii",
          "Triceps brachii",
          "triceps",
          "Triceps"
        ],
        "explanation": "Model answer from past exam papers: Triceps brachii.",
        "src": {
          "ref": "hss.revans",
          "location": "p3 \"2. Triceps brachii\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each forearm muscle compartment to its verified common tendon origin and primary innervation.",
        "pairs": [
          [
            "Flexor compartment of forearm",
            "Common flexor tendon at medial epicondyle (Median and Ulnar nerves)"
          ],
          [
            "Extensor compartment of forearm",
            "Common extensor tendon at lateral epicondyle (Radial nerve)"
          ],
          [
            "Anterior compartment of arm",
            "Musculocutaneous nerve"
          ],
          [
            "Posterior compartment of arm",
            "Radial nerve"
          ]
        ],
        "explanation": "Compartmental boundaries and nerve supplies from HSS2011 slides 24, 25, 27, 29, and 30."
      },
      {
        "type": "mcq",
        "prompt": "Which muscle functions as both a powerful flexor and a powerful supinator of the forearm?",
        "options": [
          "Brachialis",
          "Biceps brachii",
          "Triceps brachii",
          "Pronator teres"
        ],
        "answer": 1,
        "explanation": "Biceps brachii inserts on the radial tuberosity, allowing it to act as both a powerful flexor and powerful supinator of the forearm.",
        "src": {
          "ref": "hss.4.3",
          "location": "p24 \"Biceps brachii muscle is a powerful\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each major shoulder-girdle muscle to its verified action and innervation.",
        "pairs": [
          [
            "Pectoralis major",
            "Flexion, adduction & medial rotation (Pectoral nerves)"
          ],
          [
            "Latissimus dorsi",
            "Adduction, extension & medial rotation (Thoracodorsal nerve)"
          ],
          [
            "Deltoid",
            "Powerful abduction of arm (Axillary nerve)"
          ]
        ],
        "explanation": "Sourced directly from HSS2011 Module 4.3 slides 17, 18, and 19."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A patient presents with acute localized tenderness over the lateral epicondyle of the humerus, with sharp pain provoked whenever they actively extend the wrist against manual resistance. Identify the condition, the muscle compartment involved, the common tendon affected, and its nerve supply.",
        "model": "The patient has lateral epicondylitis (tennis elbow), an overuse tendinopathy affecting the extensor compartment of the forearm. The lesion involves the common extensor tendon origin at the lateral epicondyle of the humerus (primarily involving extensor carpi radialis brevis and extensor digitorum). This extensor compartment is innervated by the radial nerve.",
        "rubric": [
          "Identifies lateral epicondylitis / tennis elbow",
          "Identifies the extensor compartment and common extensor tendon at lateral epicondyle",
          "Identifies the radial nerve as the responsible innervation"
        ]
      }
    ],
    "commonMistakes": [
      "Thinking brachialis supinates; only biceps brachii supinates because it inserts on the radius. Brachialis inserts on the ulna and can only flex.",
      "Assigning the ulnar nerve to the posterior extensor compartment; the posterior compartment is entirely radial nerve.",
      "Confusing the common flexor origin (medial epicondyle) with the common extensor origin (lateral epicondyle)."
    ],
    "sourceRefs": [
      {
        "ref": "hss.4.3",
        "location": "p16 \"Major Muscles Around\""
      },
      {
        "ref": "hss.4.3",
        "location": "p16 \"Shoulder Girdle:\""
      },
      {
        "ref": "hss.4.3",
        "location": "p17 \"Pectoralis major is responsible for the:\""
      },
      {
        "ref": "hss.4.3",
        "location": "p17 \"Flexion, Adduction & Medial Rotation\""
      },
      {
        "ref": "hss.4.3",
        "location": "p17 \"Innervated by: Pectoral nerve\""
      },
      {
        "ref": "hss.4.3",
        "location": "p18 \"Latissimus Dorsi is responsible for the:\""
      },
      {
        "ref": "hss.4.3",
        "location": "p18 \"Adduction & Medial rotation of humerus.\""
      },
      {
        "ref": "hss.4.3",
        "location": "p18 \"Innervated by: Thoracodorsal nerve\""
      },
      {
        "ref": "hss.4.3",
        "location": "p19 \"Deltoid is a powerful abductor of the arm.\""
      },
      {
        "ref": "hss.4.3",
        "location": "p24 \"Biceps brachii muscle is a powerful\""
      },
      {
        "ref": "hss.4.3",
        "location": "p24 \"flexor and supinator of the forearm.\""
      },
      {
        "ref": "hss.4.3",
        "location": "p24 \"Innervated by: Musculocutaneous nerve\""
      },
      {
        "ref": "hss.4.3",
        "location": "p25 \"Triceps brachii is an extensor of the forearm.\""
      },
      {
        "ref": "hss.4.3",
        "location": "p25 \"Innervated by: Radial nerve\""
      },
      {
        "ref": "hss.4.3",
        "location": "p27 \"Transverse section of forearm\""
      },
      {
        "ref": "hss.4.3",
        "location": "p27 \"Flexor Compartment:\""
      },
      {
        "ref": "hss.4.3",
        "location": "p27 \"Median Nerve and\""
      },
      {
        "ref": "hss.4.3",
        "location": "p27 \"Ulnar Nerve.\""
      },
      {
        "ref": "hss.4.3",
        "location": "p27 \"Extensor Compartment:\""
      },
      {
        "ref": "hss.4.3",
        "location": "p27 \"Muscles are innervated\""
      },
      {
        "ref": "hss.4.3",
        "location": "p27 \"by the Radial Nerve.\""
      },
      {
        "ref": "hss.4.3",
        "location": "p29 \"Common flexor tendon\""
      },
      {
        "ref": "hss.4.3",
        "location": "p29 \"at medial epicondyle of\""
      },
      {
        "ref": "hss.4.3",
        "location": "p29 \"Flexor digitorum superficialis\""
      },
      {
        "ref": "hss.4.3",
        "location": "p29 \"Flexor digitorum profundus\""
      },
      {
        "ref": "hss.4.3",
        "location": "p30 \"Common extensor tendon\""
      },
      {
        "ref": "hss.4.3",
        "location": "p30 \"at lateral epicondyle of humerus\""
      },
      {
        "ref": "hss.4.3",
        "location": "p30 \"Extensor digitorum\""
      },
      {
        "ref": "hss.4.3",
        "location": "p31 \"Extensor Tendons of the Thumb\""
      },
      {
        "ref": "hss.4.3",
        "location": "p31 \"Extensor pollicis longus\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"2. Triceps brachii\""
      },
      {
        "ref": "hss.ul.2026",
        "location": "p16 \"Muscles that move the pectoral girdle\" — \"Trapezius: elevate, retract, depress, assist scapular rotation (upward)\""
      },
      {
        "ref": "hss.ul.2026",
        "location": "p16 \"Levator scapulae: elevate, assist scapular rotation (downward)\" — \"Serratus anterior: protract, rotate (upward) scapula\""
      },
      {
        "ref": "hss.ul.2026",
        "location": "p16 \"Rhomboid major and minor: retract, assist elevation and scapular rotation (downward)\" — \"Pectoralis minor: depress, protract, assist scapular rotation (downward)\""
      },
      {
        "ref": "hss.ul.2026",
        "location": "p18 \"Muscles that move the arm\" — \"Teres major\" — \"(extend, adduct, and medially rotate the arm)\""
      },
      {
        "ref": "hss.ul.2026",
        "location": "p25 \"5 compartments of intrinsic hand muscles\" — \"Thenar Compartment\" — \"Hypothenar Compartment\""
      },
      {
        "ref": "hss.ul.2026",
        "location": "p26 \"Central Compartments\" — \"Each Lumbricals Arises from a tendon of FDP\""
      },
      {
        "ref": "hss.ul.2026",
        "location": "p26 \"Interosseous Compartments\" — \"Palmar Interossei\" — \"Adduct 2nd,4th,5th digits\" — \"Dorsal Interossei\" — \"Abduct 2nd-4th digits\""
      }
    ]
  },
  {
    "id": "hss2011-upper-limb-blood-vessels",
    "subject": "HSS2011",
    "unit": "hss.m4",
    "type": "definition",
    "title": "Arterial supply and venous drainage of the upper limb",
    "tags": [
      "cardiovascular",
      "upper limb",
      "high-yield",
      "foundation"
    ],
    "practice": [
      {
        "type": "sequence",
        "prompt": "Order the main arterial segments of the upper limb in order of blood flow from proximal to distal.",
        "items": [
          "Subclavian artery",
          "Axillary artery",
          "Brachial artery",
          "Radial and Ulnar arteries",
          "Superficial and Deep palmar arches"
        ],
        "explanation": "The sequential arterial conduit of the upper limb from thoracic exit to the palm.",
        "src": {
          "ref": "hss.4.3",
          "location": "p12 \"Blood Supply to Upper Limb\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each upper limb vessel to its verified anatomical characteristic.",
        "pairs": [
          [
            "Axillary artery",
            "Subclavian continuation after crossing the first rib border"
          ],
          [
            "Brachial artery",
            "Bifurcates in the cubital fossa into radial and ulnar arteries"
          ],
          [
            "Radial artery",
            "Palpated at the lateral wrist against the distal radius"
          ],
          [
            "Median cubital vein",
            "Superficial vein in cubital fossa used for venipuncture"
          ],
          [
            "Cephalic vein",
            "Superficial vein ascending lateral aspect of arm in deltopectoral groove"
          ]
        ],
        "explanation": "Key vascular landmarks from HSS2011 Module 1.1 and Module 4.3."
      },
      {
        "type": "mcq",
        "prompt": "The axillary artery begins at which anatomical landmark?",
        "options": [
          "The lateral border of the first rib",
          "The sternoclavicular joint",
          "The inferior border of teres major",
          "The cubital fossa"
        ],
        "answer": 0,
        "explanation": "The subclavian artery becomes the axillary artery after leaving the thoracic cavity and crossing the border of the first rib.",
        "src": {
          "ref": "hss.1.1",
          "location": "p20 \"Right axillary artery, which is the subclavian after leaving the thoracic cavity and passing across the border of the first rib\""
        }
      },
      {
        "type": "typed",
        "prompt": "Which superficial vein running across the cubital fossa is the premier site for clinical venipuncture and radiopaque contrast injection?",
        "accept": [
          "median cubital",
          "median cubital vein",
          "Median cubital",
          "Median cubital vein"
        ],
        "explanation": "The median cubital vein connects cephalic and basilic veins in the roof of the cubital fossa.",
        "src": {
          "ref": "hss.1.1",
          "location": "p23 \"Median cubital\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A radiography student is preparing to perform an intravenous injection of radiopaque iodinated contrast for a CT examination. They select the median cubital vein. Explain the anatomical advantages of choosing this specific vein and name the deep fibrous structure that protects underlying major neurovascular structures during needle insertion.",
        "model": "The median cubital vein is preferred because it is large, superficial, easily visualized and palpated, relatively immobile (anchored by subcutaneous connective tissue), and easily accessible in the antecubital fossa. Crucially, the bicipital aponeurosis (a broad fibrous expansion of the biceps tendon) lies directly deep to the median cubital vein, acting as an anatomical shield that prevents an inadvertently deep needle puncture from penetrating the underlying brachial artery and median nerve.",
        "rubric": [
          "Identifies accessibility, large caliber, and immobility of the median cubital vein",
          "Identifies the bicipital aponeurosis as the protective fibrous shield",
          "Identifies the brachial artery and median nerve as the vulnerable deep structures"
        ]
      }
    ],
    "commonMistakes": [
      "Assuming the cephalic vein drains into the brachial vein; the cephalic vein drains into the axillary vein.",
      "Confusing the landmark for the start of the axillary artery (1st rib) with the start of the brachial artery (teres major).",
      "Believing the radial pulse is taken over the ulna; the radial pulse is taken over the distal radius."
    ],
    "sourceRefs": [
      {
        "ref": "hss.4.3",
        "location": "p12 \"Blood Supply to Upper Limb\""
      },
      {
        "ref": "hss.4.3",
        "location": "p12 \"Subclavian Artery\""
      },
      {
        "ref": "hss.4.3",
        "location": "p12 \"Axillary Artery\""
      },
      {
        "ref": "hss.4.3",
        "location": "p12 \"Brachial Artery\""
      },
      {
        "ref": "hss.4.3",
        "location": "p12 \"Radial Artery\""
      },
      {
        "ref": "hss.4.3",
        "location": "p12 \"Ulnar Artery\""
      },
      {
        "ref": "hss.4.3",
        "location": "p32 \"Radial artery\""
      },
      {
        "ref": "hss.4.3",
        "location": "p32 \"Ulnar artery\""
      },
      {
        "ref": "hss.1.1",
        "location": "p19 \"Major Systemic Arteries\""
      },
      {
        "ref": "hss.1.1",
        "location": "p19 \"Right subclavian\""
      },
      {
        "ref": "hss.1.1",
        "location": "p20 \"Right axillary artery, which is the subclavian after leaving the thoracic cavity and passing across the border of the first rib\""
      },
      {
        "ref": "hss.1.1",
        "location": "p23 \"Major Systemic Veins\""
      },
      {
        "ref": "hss.1.1",
        "location": "p23 \"Cephalic\""
      },
      {
        "ref": "hss.1.1",
        "location": "p23 \"Basilic\""
      },
      {
        "ref": "hss.1.1",
        "location": "p23 \"Median cubital\""
      }
    ]
  },
  {
    "id": "hss2011-lower-thigh-gluteal-muscles",
    "subject": "HSS2011",
    "unit": "hss.m4",
    "type": "definition",
    "title": "Thigh and gluteal muscles: hip and knee motor control and sciatic innervation",
    "tags": [
      "musculoskeletal",
      "lower limb",
      "muscles",
      "high-yield",
      "foundation"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "Which nerve innervates the gluteus medius muscle, the primary abductor of the hip?",
        "options": [
          "Superior gluteal nerve",
          "Inferior gluteal nerve",
          "Femoral nerve",
          "Obturator nerve",
          "Sciatic nerve"
        ],
        "answer": 0,
        "explanation": "Gluteus medius is innervated by the superior gluteal nerve. Gluteus maximus is innervated by the inferior gluteal nerve.",
        "src": {
          "ref": "hss.4.3",
          "location": "p50 \"Superior gluteal nerve\""
        }
      },
      {
        "type": "cloze",
        "prompt": "All four heads of the quadriceps femoris muscle are innervated by the ______ nerve.",
        "accept": [
          "femoral",
          "Femoral",
          "femoral nerve",
          "Femoral nerve"
        ],
        "explanation": "The femoral nerve innervates all four quadriceps heads (rectus femoris, vastus lateralis, vastus medialis, vastus intermedius).",
        "src": {
          "ref": "hss.4.3",
          "location": "p52 \"All 4 muscles innervated by:\" — \"Femoral nerve\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each major hip or knee movement to its verified primary agonist muscle.",
        "pairs": [
          [
            "Major Hip Flexors",
            "Iliopsoas"
          ],
          [
            "Major Hip Extensors",
            "Gluteus maximus"
          ],
          [
            "Major Hip Abductors",
            "Gluteus medius"
          ],
          [
            "Major Knee Flexors",
            "Hamstrings"
          ],
          [
            "Major Knee Extensors",
            "Quadriceps femoris"
          ]
        ],
        "explanation": "Verified muscle actions from HSS2011 Module 4.3 slide 46."
      },
      {
        "type": "mcq",
        "prompt": "The hamstring muscles, which flex the knee joint and extend the hip, are all innervated by which major peripheral nerve?",
        "options": [
          "Sciatic nerve",
          "Femoral nerve",
          "Obturator nerve",
          "Superior gluteal nerve",
          "Tibial nerve"
        ],
        "answer": 0,
        "explanation": "All three hamstring muscles (semitendinosus, semimembranosus, biceps femoris) are innervated by the sciatic nerve.",
        "src": {
          "ref": "hss.4.3",
          "location": "p53 \"Major Knee Flexors: Hamstrings\" — \"All 3 muscles innervated by:\" — \"Sciatic nerve\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "During physical examination of a patient with chronic lumbar disc herniation, the clinician notes profound weakness when testing active knee extension against resistance, along with an absent patellar tendon reflex. Identify the muscle group affected, the peripheral nerve involved, and trace the anatomical insertion transmitting its force onto the skeleton.",
        "model": "The muscle group affected is the quadriceps femoris (rectus femoris, vastus lateralis, vastus medialis, vastus intermedius), which is innervated by the femoral nerve (L2–L4). All four muscular bellies converge into the common quadriceps tendon, which encloses the sesamoid patella and continues inferiorly as the patellar ligament to insert onto the tibial tuberosity of the tibia.",
        "rubric": [
          "Identifies the quadriceps femoris as the paralyzed knee extensor",
          "Names the femoral nerve as the responsible innervation",
          "Traces force transmission through the patellar ligament onto the tibial tuberosity"
        ]
      }
    ],
    "commonMistakes": [
      "Confusing superior and inferior gluteal nerve distributions: superior gluteal innervates gluteus medius/minimus; inferior gluteal innervates gluteus maximus.",
      "Assuming the hamstrings are innervated by the femoral nerve; hamstrings are in the posterior compartment, innervated by the sciatic nerve.",
      "Thinking iliopsoas is a single muscle with one nerve; it is composed of iliacus (femoral nerve) and psoas major (anterior rami of L2–L4)."
    ],
    "sourceRefs": [
      {
        "ref": "hss.4.3",
        "location": "p46 \"Lumbosacral plexus\""
      },
      {
        "ref": "hss.4.3",
        "location": "p46 \"Sciatic nerve\""
      },
      {
        "ref": "hss.4.3",
        "location": "p46 \"Tibial nerve\""
      },
      {
        "ref": "hss.4.3",
        "location": "p46 \"Common fibular (peroneal) nerve\""
      },
      {
        "ref": "hss.4.3",
        "location": "p47 \"Major Hip Flexors:\""
      },
      {
        "ref": "hss.4.3",
        "location": "p47 \"Iliopsoas\""
      },
      {
        "ref": "hss.4.3",
        "location": "p47 \"Major Hip Extensors:\""
      },
      {
        "ref": "hss.4.3",
        "location": "p47 \"Gluteus maximus\""
      },
      {
        "ref": "hss.4.3",
        "location": "p47 \"Major Hip Abductors:\""
      },
      {
        "ref": "hss.4.3",
        "location": "p47 \"Gluteus medius\""
      },
      {
        "ref": "hss.4.3",
        "location": "p47 \"Major Hip Adductors:\""
      },
      {
        "ref": "hss.4.3",
        "location": "p47 \"Adductor magnus\""
      },
      {
        "ref": "hss.4.3",
        "location": "p47 \"Major Knee Flexors:\""
      },
      {
        "ref": "hss.4.3",
        "location": "p47 \"Hamstrings\""
      },
      {
        "ref": "hss.4.3",
        "location": "p47 \"Major Knee Extensors:\""
      },
      {
        "ref": "hss.4.3",
        "location": "p47 \"Quadriceps femoris\""
      },
      {
        "ref": "hss.4.3",
        "location": "p49 \"Iliopsoas:\""
      },
      {
        "ref": "hss.4.3",
        "location": "p49 \"- Iliacus\""
      },
      {
        "ref": "hss.4.3",
        "location": "p49 \"- Psoas major\""
      },
      {
        "ref": "hss.4.3",
        "location": "p49 \"femoral nerve\""
      },
      {
        "ref": "hss.4.3",
        "location": "p49 \"anterior rami of L2-L4\""
      },
      {
        "ref": "hss.4.3",
        "location": "p50 \"Superior gluteal nerve\""
      },
      {
        "ref": "hss.4.3",
        "location": "p50 \"Inferior gluteal nerve\""
      },
      {
        "ref": "hss.4.3",
        "location": "p51 \"Hip Adductor: Adductor Magnus\""
      },
      {
        "ref": "hss.4.3",
        "location": "p51 \"Adductor magnus\""
      },
      {
        "ref": "hss.4.3",
        "location": "p51 \"Obturator nerve\""
      },
      {
        "ref": "hss.4.3",
        "location": "p52 \"Major Knee Extensors: Quadriceps Femoris\""
      },
      {
        "ref": "hss.4.3",
        "location": "p52 \"All 4 muscles innervated by:\""
      },
      {
        "ref": "hss.4.3",
        "location": "p52 \"Femoral nerve\""
      },
      {
        "ref": "hss.4.3",
        "location": "p52 \"Rectus femoris\""
      },
      {
        "ref": "hss.4.3",
        "location": "p52 \"Vastus medialis\""
      },
      {
        "ref": "hss.4.3",
        "location": "p52 \"Vastus lateralis\""
      },
      {
        "ref": "hss.4.3",
        "location": "p52 \"Vastus intermedius\""
      },
      {
        "ref": "hss.4.3",
        "location": "p52 \"Patellar ligament\""
      },
      {
        "ref": "hss.4.3",
        "location": "p53 \"Major Knee Flexors: Hamstrings\""
      },
      {
        "ref": "hss.4.3",
        "location": "p53 \"- Semimembranosus\""
      },
      {
        "ref": "hss.4.3",
        "location": "p53 \"- Semitendinosus\""
      },
      {
        "ref": "hss.4.3",
        "location": "p53 \"Biceps femoris:\""
      },
      {
        "ref": "hss.4.3",
        "location": "p53 \"All 3 muscles innervated by:\""
      },
      {
        "ref": "hss.4.3",
        "location": "p53 \"Sciatic nerve\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p46 \"15. Can you identify and locate the muscles that control hip, knee and ankle movement?\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p47 \"10. Which of the following muscle is a hip abductor?\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p47 \"A. Gluteus medius\""
      },
      {
        "ref": "hss.ll.2026",
        "location": "p16 \"Muscles of the gluteal region (Deep lateral rotator group)\" — \"Piriformis\" — \"Superior gemellus\" — \"Obturator internus\""
      },
      {
        "ref": "hss.ll.2026",
        "location": "p16 \"Inferior gemellus\" — \"Quadratus femoris\" — \"Obturator externus\" — \"Together rotate the head of femur laterally\""
      },
      {
        "ref": "hss.ll.2026",
        "location": "p17 \"The lateral rotator muscle groups are deep to the gluteus maximus at the posterior gluteal region.\""
      },
      {
        "ref": "hss.ll.2026",
        "location": "p17 \"Gluteus maximus is the chief lateral rotator, while the lateral rotator group contracts and also rotates the head of the femur externally\""
      },
      {
        "ref": "hss.ll.2026",
        "location": "p20 \"Iliopsoas alone can perform pure hip flexion\""
      },
      {
        "ref": "hss.ll.2026",
        "location": "p20 \"Gluteus medius, gluteus minimus, and TFL are main hip medial rotator\""
      },
      {
        "ref": "hss.ll.2026",
        "location": "p20 \"Pectineus adducts (with adductors) and flexes thigh (with iliopsoas), and assists in medial rotation (with Glut med/min, & TFL)\""
      }
    ]
  },
  {
    "id": "hss2011-lower-leg-foot-muscles-arches",
    "subject": "HSS2011",
    "unit": "hss.m4",
    "type": "definition",
    "title": "Leg compartments, ankle and foot muscles, and the three foot arches",
    "tags": [
      "musculoskeletal",
      "lower limb",
      "muscles",
      "high-yield",
      "foundation"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "Which muscle is the major ankle dorsiflexor and which nerve provides its motor innervation?",
        "options": [
          "Tibialis anterior; deep fibular nerve",
          "Gastrocnemius; tibial nerve",
          "Soleus; common fibular nerve",
          "Fibularis longus; superficial fibular nerve",
          "Tibialis posterior; obturator nerve"
        ],
        "answer": 0,
        "explanation": "Tibialis anterior is the primary ankle dorsiflexor, innervated by the deep fibular nerve in the anterior leg compartment.",
        "src": {
          "ref": "hss.4.3",
          "location": "p48 \"• Tibialis anterior\" — p55 \"Tibialis anterior\" — \"Deep fibular nerve\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The gastrocnemius muscle has a medial head and lateral head, and is innervated by the ______ nerve.",
        "accept": [
          "tibial",
          "Tibial",
          "tibial nerve",
          "Tibial nerve"
        ],
        "explanation": "Gastrocnemius is innervated by the tibial nerve and acts as a powerful ankle plantarflexor.",
        "src": {
          "ref": "hss.4.3",
          "location": "p55 \"Gastrocnemius:\" — \"- Medial head\" — \"- Lateral head\" — \"Tibial nerve\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each foot arch to its verified constituent bone count and structure.",
        "pairs": [
          [
            "Medial longitudinal arch",
            "9 bones (Calcaneus, Talus, Navicular, 3 Cuneiforms, Metatarsals I–III)"
          ],
          [
            "Lateral longitudinal arch",
            "4 bones (Calcaneus, Cuboid, Metatarsals IV–V)"
          ],
          [
            "Transverse arch",
            "9 bones (Metatarsals I–V, 3 Cuneiforms, Cuboid)"
          ]
        ],
        "explanation": "Foot arch bone classifications from HSS2011 Module 4.3 slides 43 and 44."
      },
      {
        "type": "mcq",
        "prompt": "How many bones form the lateral longitudinal arch of the foot?",
        "options": [
          "4 bones",
          "9 bones",
          "7 bones",
          "5 bones"
        ],
        "answer": 0,
        "explanation": "The lateral longitudinal arch consists of exactly 4 bones: calcaneus, cuboid, and metatarsals IV and V.",
        "src": {
          "ref": "hss.4.3",
          "location": "p44 \"Lateral longitudinal arch (4 bones):\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A patient presents following a direct blow to the lateral aspect of the knee below the fibular head. They are unable to dorsiflex or evert the foot and catch their toes on the ground while walking. Identify the injured nerve, the specific muscle responsible for the lost dorsiflexion, and the resulting clinical gait pattern.",
        "model": "The patient has sustained an injury to the common fibular (peroneal) nerve as it winds around the neck of the fibula, paralyzing its deep fibular branch. The specific muscle responsible for the lost dorsiflexion is the tibialis anterior (assisted by extensor digitorum longus and extensor hallucis longus). This motor deficit produces \"foot drop\", requiring the patient to excessively flex the hip and knee during walking in a characteristic high-stepping (steppage) gait to clear the toes from the ground.",
        "rubric": [
          "Identifies common fibular nerve injury at the fibular neck",
          "Names tibialis anterior as the primary paralyzed dorsiflexor",
          "Describes foot drop and high-stepping / steppage gait compensation"
        ]
      }
    ],
    "commonMistakes": [
      "Confusing dorsiflexion (raising toes toward shin) with plantarflexion (pointing toes toward floor).",
      "Attributing gastrocnemius innervation to the fibular nerve; gastrocnemius is posterior and innervated by the tibial nerve.",
      "Forgetting that the talus is the keystone of the medial arch, but is entirely absent from the lateral longitudinal arch."
    ],
    "sourceRefs": [
      {
        "ref": "hss.4.3",
        "location": "p48 \"Muscle Action (Ankle)\""
      },
      {
        "ref": "hss.4.3",
        "location": "p48 \"• Tibialis anterior\""
      },
      {
        "ref": "hss.4.3",
        "location": "p48 \"• Gastrocnemius\""
      },
      {
        "ref": "hss.4.3",
        "location": "p55 \"Ankle Dorsiflexor: Tibialis Anterior\""
      },
      {
        "ref": "hss.4.3",
        "location": "p55 \"Tibialis anterior\""
      },
      {
        "ref": "hss.4.3",
        "location": "p55 \"Deep fibular nerve\""
      },
      {
        "ref": "hss.4.3",
        "location": "p55 \"Gastrocnemius:\""
      },
      {
        "ref": "hss.4.3",
        "location": "p55 \"- Medial head\""
      },
      {
        "ref": "hss.4.3",
        "location": "p55 \"- Lateral head\""
      },
      {
        "ref": "hss.4.3",
        "location": "p55 \"Tibial nerve\""
      },
      {
        "ref": "hss.4.3",
        "location": "p43 \"Foot Arches\""
      },
      {
        "ref": "hss.4.3",
        "location": "p43 \"When the foot is resting on the floor, only some of the foot bones are touching the floor, what are the bones?\""
      },
      {
        "ref": "hss.4.3",
        "location": "p44 \"Medial longitudinal arch (9 bones):\""
      },
      {
        "ref": "hss.4.3",
        "location": "p44 \"Lateral longitudinal arch (4 bones):\""
      },
      {
        "ref": "hss.4.3",
        "location": "p44 \"Metatarsal I, II, III (3)\""
      },
      {
        "ref": "hss.4.3",
        "location": "p44 \"Metatarsal IV & V (2)\""
      },
      {
        "ref": "hss.4.3",
        "location": "p45 \"Transverse Arch (9 bones):\""
      },
      {
        "ref": "hss.4.3",
        "location": "p45 \"Metatasal I, II, III, IV & V (5)\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p46 \"15. Can you identify and locate the muscles that control hip, knee and ankle movement?\""
      },
      {
        "ref": "hss.ll.2026",
        "location": "p27 \"Compartment in lower leg (right)\""
      },
      {
        "ref": "hss.ll.2026",
        "location": "p28 \"Anterior compartment (dorsiflexion)\" — \"Tibialis anterior\""
      },
      {
        "ref": "hss.ll.2026",
        "location": "p29 \"Lateral compartment (plantar flexion, foot eversion)\" — \"Fibularis longus\" — \"Fibularis brevis\""
      },
      {
        "ref": "hss.ll.2026",
        "location": "p30 \"Deep posterior compartment (plantar flexion, inversion)\" — \"Tibialis posterior\""
      },
      {
        "ref": "hss.ll.2026",
        "location": "p31 \"Superficial posterior compartment (plantar flexion)\" — \"Gastrocnemius\" — \"Soleus\" — \"Plantaris\""
      },
      {
        "ref": "hss.ll.2026",
        "location": "p32 \"Actions of foot contributed by lower leg muscles\" — \"Dorsiflexion\" — \"Plantarflexion\" — \"Inversion\" — \"Eversion\""
      },
      {
        "ref": "hss.ll.2026",
        "location": "p34 \"Superficial plantar\" — \"Deep plantar\" — \"Dorsum\""
      },
      {
        "ref": "hss.ll.2026",
        "location": "p34 \"AbH—Abductor hallucis\" — \"AbDM—Abductor digiti minimi\" — \"FDB—Flexor digiti brevis\""
      },
      {
        "ref": "hss.ll.2026",
        "location": "p34 \"Qp—Quadratus plantae\" — \"LB—Lumbricals\" — \"FHB—Flexor hallucis brevis\""
      },
      {
        "ref": "hss.ll.2026",
        "location": "p34 \"PI—Plantar interossei\" — \"DI—Dorsal interossei\" — \"EHB—Extensor halluces brevis\" — \"EDB—Extensor digiti brevis\""
      }
    ]
  },
  {
    "id": "hss2011-lower-femoral-triangle-vessels-nerves",
    "subject": "HSS2011",
    "unit": "hss.m4",
    "type": "definition",
    "title": "Femoral triangle boundaries, neurovascular contents, and lower limb vessels",
    "tags": [
      "musculoskeletal",
      "lower limb",
      "circulatory",
      "nervous",
      "high-yield",
      "foundation"
    ],
    "practice": [
      {
        "type": "sequence",
        "prompt": "Order the neurovascular contents of the femoral triangle from lateral to medial.",
        "items": [
          "Femoral nerve",
          "Femoral artery",
          "Femoral vein"
        ],
        "explanation": "From lateral to medial, the three neurovascular contents are the Femoral nerve, Femoral artery, and Femoral vein (NAV).",
        "src": {
          "ref": "hss.4.3",
          "location": "p54 \"Femoral Triangle\" — \"Contents:\" — \"•Femoral nerve\" — \"•Femoral artery\" — \"•Femoral vein\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each boundary of the femoral triangle to its verified anatomical structure.",
        "pairs": [
          [
            "Superior boundary",
            "Inguinal ligament"
          ],
          [
            "Medial boundary",
            "Adductor longus muscle"
          ],
          [
            "Lateral boundary",
            "Sartorius muscle"
          ]
        ],
        "explanation": "Boundaries from past exam papers and HSS2011 Module 4.3 slide 54.",
        "src": {
          "ref": "hss.fib5yr",
          "location": "p19 \"The femoral triangle is located at the anterior and superior aspect of the thigh\" — \"a. superiorly: [66] inguinal ligament\" — \"b. medially: adductor longus muscle\" — \"c. laterally: sartorius muscle\""
        }
      },
      {
        "type": "mcq",
        "prompt": "The femoral artery is the direct continuation of which major blood vessel after it passes beneath the inguinal ligament?",
        "options": [
          "External iliac artery",
          "Internal iliac artery",
          "Common iliac artery",
          "Abdominal aorta",
          "Deep femoral artery"
        ],
        "answer": 0,
        "explanation": "The external iliac artery becomes the femoral artery as it passes deep to the midpoint of the inguinal ligament.",
        "src": {
          "ref": "hss.3.3",
          "location": "p38 \"External iliac veins\""
        }
      },
      {
        "type": "typed",
        "prompt": "Which longest superficial vein of the lower limb ascends the medial thigh to drain into the femoral vein?",
        "accept": [
          "great saphenous",
          "great saphenous vein",
          "Great saphenous",
          "Great saphenous vein"
        ],
        "explanation": "The great saphenous vein ascends along the medial aspect of the limb and empties into the femoral vein within the femoral triangle.",
        "src": {
          "ref": "hss.3.3",
          "location": "p38 \"External iliac veins\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "An interventional radiologist is performing an arterial puncture to introduce a catheter for lower limb angiographic intervention. They palpate the femoral pulse immediately inferior to the inguinal ligament. Explain how the radiologist utilizes surface anatomy and the lateral-to-medial relationship of contents to avoid injuring the femoral vein or femoral nerve.",
        "model": "The radiologist palpates the maximal arterial pulsation of the femoral artery below the inguinal ligament. Remembering the lateral-to-medial sequence of contents (Femoral Nerve, Femoral Artery, Femoral Vein), the clinician knows that the femoral artery lies medial to the femoral nerve and lateral to the femoral vein. By inserting the needle directly into the palpable arterial pulse, they safely cannulate the artery without piercing the femoral vein medially or the femoral nerve laterally.",
        "rubric": [
          "Locates the femoral artery pulse below the inguinal ligament",
          "Applies the lateral-to-medial relation (Nerve lateral, Artery intermediate, Vein medial)",
          "Explains that puncture must enter the arterial pulse directly to avoid nerve laterally and vein medially"
        ]
      }
    ],
    "commonMistakes": [
      "Reversing the lateral-to-medial sequence (vein is medial, nerve is lateral, artery is intermediate).",
      "Confusing the boundaries: sartorius is lateral and adductor longus is medial."
    ],
    "sourceRefs": [
      {
        "ref": "hss.4.3",
        "location": "p52 \"All 4 muscles innervated by:\""
      },
      {
        "ref": "hss.4.3",
        "location": "p52 \"Femoral nerve\""
      },
      {
        "ref": "hss.4.3",
        "location": "p54 \"Femoral Triangle\""
      },
      {
        "ref": "hss.4.3",
        "location": "p54 \"Contents:\""
      },
      {
        "ref": "hss.4.3",
        "location": "p54 \"•Femoral nerve\""
      },
      {
        "ref": "hss.4.3",
        "location": "p54 \"•Femoral artery\""
      },
      {
        "ref": "hss.4.3",
        "location": "p54 \"•Femoral vein\""
      },
      {
        "ref": "hss.4.3",
        "location": "p54 \"Boundary:\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p19 \"The femoral triangle is located at the anterior and superior aspect of the thigh\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p19 \"femoral nerve, femoral artery and vein inside.\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p19 \"a. superiorly: [66] inguinal ligament\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p19 \"b. medially: adductor longus muscle\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p19 \"c. laterally: sartorius muscle\""
      },
      {
        "ref": "hss.ppans",
        "location": "p22 \"The femoral triangle is located at the anterior and superior aspect of the thigh\""
      },
      {
        "ref": "hss.ppans",
        "location": "p22 \"femoral nerve, femoral artery and vein inside.\""
      },
      {
        "ref": "hss.3.3",
        "location": "p38 \"External iliac veins\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p77 \"G1. Popliteal G2. Femoral\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p77 \"G4. Posterior tibial\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p77 \"G6. Anterior tibial\""
      },
      {
        "ref": "hss.ll.2026",
        "location": "p33 \"Femoral n.: Hip flexor Knee extensor\""
      }
    ]
  },

  {
    "id": "hss2011-head-cranial-cavities-sinuses",
    "subject": "HSS2011",
    "unit": "hss.m4",
    "type": "definition",
    "title": "Cranial fossae, paranasal sinuses, orbital complexes, and foramen magnum",
    "tags": [
      "head and neck",
      "cranial cavity",
      "sinuses",
      "orbits",
      "foramen magnum",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "Which of the following structures passes through the foramen magnum?",
        "options": [
          "Vertebral arteries",
          "Internal carotid artery",
          "Middle meningeal artery",
          "Facial nerve (CN VII)",
          "Maxillary nerve (CN V2)"
        ],
        "answer": 0,
        "explanation": "The vertebral arteries ascend through the foramen magnum into the posterior cranial fossa to form the basilar artery.",
        "src": {
          "ref": "hss.4.2",
          "location": "p22 \"Contents of\" — \"Vertebral arteries\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which paranasal sinus is the largest and drains high on its medial wall into the middle nasal meatus?",
        "options": [
          "Maxillary sinus",
          "Frontal sinus",
          "Sphenoidal sinus",
          "Ethmoidal air cells",
          "Mastoid air cells"
        ],
        "answer": 0,
        "explanation": "The maxillary sinus (antrum of Highmore) is the largest paranasal sinus, occupying the body of the maxilla.",
        "src": {
          "ref": "hss.4.2",
          "location": "p19 \"The Nasal Complex\" — \"Paranasal Sinuses\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each cranial fossa to its primary neural contents and key landmarks.",
        "pairs": [
          [
            "Anterior cranial fossa",
            "Frontal lobes and cribriform plate (CN I)"
          ],
          [
            "Middle cranial fossa",
            "Temporal lobes and sella turcica (pituitary gland)"
          ],
          [
            "Posterior cranial fossa",
            "Cerebellum, brainstem, and foramen magnum"
          ],
          [
            "Orbital complex",
            "Seven articulating craniofacial bones housing eyeball"
          ]
        ],
        "explanation": "Organization of internal cranial floor and orbital architecture from HSS2011 Module 4.2."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A trauma patient following a high-speed vehicle impact presents with periorbital ecchymosis (\"raccoon eyes\"), clear fluid dripping from the right nostril, and loss of smell. A coronal head CT demonstrates a displaced fracture through the floor of the anterior cranial fossa. Identify the specific bone fractured, the torn neural structures, and the source of the nasal fluid.",
        "model": "The patient has sustained a basilar skull fracture involving the cribriform plate of the ethmoid bone in the floor of the anterior cranial fossa. Fracturing this delicate perforated horizontal plate lacerates the fragile olfactory nerve rootlets (CN I) passing through from the olfactory epithelium, producing anosmia. Tearing of the tightly adherent overlying dura mater and arachnoid mater creates a fistulous communication between the subarachnoid space and the nasal cavity, producing cerebrospinal fluid (CSF) rhinorrhea.",
        "rubric": [
          "Identifies fracture of the cribriform plate of the ethmoid bone",
          "Identifies transection / damage to the olfactory nerve (CN I) causing anosmia",
          "Identifies the fluid as cerebrospinal fluid (CSF) leaking from torn meninges (CSF rhinorrhea)"
        ]
      }
    ],
    "commonMistakes": [
      "Thinking the internal carotid artery traverses the foramen magnum; it enters through the carotid canal in the petrous temporal bone.",
      "Listing 6 bones for the orbit instead of 7 (often forgetting the small palatine bone in the orbital floor).",
      "Assuming paranasal sinuses drain freely in the upright position; the maxillary sinus ostium is near its roof."
    ],
    "sourceRefs": [
      {
        "ref": "hss.4.2",
        "location": "p16 \"Cranial Fossae\""
      },
      {
        "ref": "hss.4.2",
        "location": "p17 \"The Eye Sockets (Orbits)\""
      },
      {
        "ref": "hss.4.2",
        "location": "p19 \"The Nasal Complex\""
      },
      {
        "ref": "hss.4.2",
        "location": "p19 \"Paranasal Sinuses\""
      },
      {
        "ref": "hss.4.2",
        "location": "p20 \"Frontal sinuses\""
      },
      {
        "ref": "hss.4.2",
        "location": "p20 \"Sphenoidal\""
      },
      {
        "ref": "hss.4.2",
        "location": "p22 \"Contents of\""
      },
      {
        "ref": "hss.4.2",
        "location": "p22 \"Medulla Oblongata\""
      },
      {
        "ref": "hss.4.2",
        "location": "p22 \"Vertebral arteries\""
      },
      {
        "ref": "hss.4.2",
        "location": "p22 \"CN XI\""
      }
    ]
  },
  {
    "id": "hss2011-head-facial-expression-muscles",
    "subject": "HSS2011",
    "unit": "hss.m4",
    "type": "definition",
    "title": "Muscles of facial expression, the SCALP layers, and cranial nerve VII",
    "tags": [
      "head and neck",
      "facial muscles",
      "scalp",
      "facial nerve",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "Which cranial nerve innervates the muscles of facial expression including frontalis, orbicularis oculi, and orbicularis oris?",
        "options": [
          "7th cranial nerve (CN VII, Facial nerve)",
          "5th cranial nerve (CN V, Trigeminal nerve)",
          "3rd cranial nerve (CN III, Oculomotor nerve)",
          "11th cranial nerve (CN XI, Accessory nerve)",
          "12th cranial nerve (CN XII, Hypoglossal nerve)"
        ],
        "answer": 0,
        "explanation": "All muscles of facial expression and the scalp are innervated by the 7th cranial nerve (CN VII, facial nerve).",
        "src": {
          "ref": "hss.4.2",
          "location": "p33 \"7th cranial nerve (CN VII): Facial nerve\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each muscle of facial expression to its verified anatomical action.",
        "pairs": [
          [
            "Frontalis (Occipito-frontalis)",
            "Elevates eyebrows; wrinkles skin of forehead"
          ],
          [
            "Orbicularis oculi",
            "Closes eye"
          ],
          [
            "Orbicularis oris",
            "Closes lips; compresses / purses lips"
          ],
          [
            "Zygomaticus major",
            "Draws angle of mouth upward & laterally as in laughing"
          ]
        ],
        "explanation": "Actions of facial muscles verbatim from HSS2011 Module 4.2 slide 32 summary."
      },
      {
        "type": "cloze",
        "prompt": "In the scalp, layer 4 consists of ______ tissue, which is clinically known as the danger area due to emissary veins.",
        "accept": [
          "loose areolar",
          "loose areolar tissue",
          "loose connective",
          "loose connective tissue"
        ],
        "explanation": "Layer 4 of the scalp is loose areolar tissue, permitting easy spread of fluid and infections into the intracranial dural venous sinuses.",
        "src": {
          "ref": "hss.4.2",
          "location": "p28 \"Scalp is composed of 5 layers:\" — \"4. Loose areolar tissue\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which muscle of the neck draws the lower lip and angle of the mouth downward as in an expression of surprise?",
        "options": [
          "Platysma",
          "Sternocleidomastoid",
          "Trapezius",
          "Masseter",
          "Digastric"
        ],
        "answer": 0,
        "explanation": "Platysma is the superficial sheet muscle of the neck that draws the lower lip and angle of the mouth downward.",
        "src": {
          "ref": "hss.4.2",
          "location": "p52 \"Draws lower lip and angle of mouth downward\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A 45-year-old patient suddenly wakes up with inability to close the right eye, smooth unwrinkled right forehead, flattening of the right nasolabial fold, and sagging of the right mouth corner with liquid drooling when drinking. Sensation across the entire face is normal. Identify the damaged cranial nerve, the clinical condition, and explain why the forehead cannot wrinkle while facial sensation is preserved.",
        "model": "The patient has Bell’s palsy, an acute lower motor neuron lesion of the right facial nerve (CN VII). The inability to close the eye is due to paralysis of orbicularis oculi; the mouth drooping and drooling result from paralysis of orbicularis oris and zygomaticus major; and the inability to wrinkle the right forehead is due to paralysis of the frontal belly of occipitofrontalis, all innervated by CN VII. Facial sensation is completely preserved because cutaneous sensation of the face is supplied by the trigeminal nerve (CN V: V1 ophthalmic, V2 maxillary, V3 mandibular), which is undamaged.",
        "rubric": [
          "Identifies lesion of the facial nerve (CN VII) / Bell’s palsy",
          "Names frontalis, orbicularis oculi, and orbicularis oris as paralyzed muscles",
          "Explains that cutaneous facial sensation is mediated by the trigeminal nerve (CN V), which is intact"
        ]
      }
    ],
    "commonMistakes": [
      "Confusing CN VII (motor to face expression) with CN V (sensory to face skin).",
      "Mixing orbicularis oculi (eye sphincter, CN VII) with orbicularis oris (mouth sphincter, CN VII).",
      "Thinking the scalp aponeurosis is layer 2; it is layer 3 (A in SCALP)."
    ],
    "sourceRefs": [
      {
        "ref": "hss.4.2",
        "location": "p28 \"Scalp is composed of 5 layers:\""
      },
      {
        "ref": "hss.4.2",
        "location": "p28 \"1. Skin\""
      },
      {
        "ref": "hss.4.2",
        "location": "p28 \"2. Connective tissue\""
      },
      {
        "ref": "hss.4.2",
        "location": "p28 \"3. Aponeurosis\""
      },
      {
        "ref": "hss.4.2",
        "location": "p28 \"4. Loose areolar tissue\""
      },
      {
        "ref": "hss.4.2",
        "location": "p28 \"5. Pericranium\""
      },
      {
        "ref": "hss.4.2",
        "location": "p32 \"Frontalis (Occipito-frontalis): elevates eyebrows; wrinkles\""
      },
      {
        "ref": "hss.4.2",
        "location": "p32 \"Orbicularis oculi: closes eye\""
      },
      {
        "ref": "hss.4.2",
        "location": "p32 \"Orbicularis oris: closes lips\""
      },
      {
        "ref": "hss.4.2",
        "location": "p32 \"Zygomaticus major: draws angle of mouth upward &\""
      },
      {
        "ref": "hss.4.2",
        "location": "p32 \"Depressor Anguli Oris: draws the angle of moth laterally and\""
      },
      {
        "ref": "hss.4.2",
        "location": "p33 \"7th cranial nerve (CN VII): Facial nerve\""
      },
      {
        "ref": "hss.4.2",
        "location": "p52 \"Draws lower lip and angle of mouth downward\""
      }
    ]
  },
  {
    "id": "hss2011-head-mastication-neck-muscles",
    "subject": "HSS2011",
    "unit": "hss.m4",
    "type": "definition",
    "title": "Muscles of mastication, the temporomandibular joint, and neck flexors/extensors",
    "tags": [
      "head and neck",
      "mastication",
      "TMJ",
      "neck muscles",
      "trigeminal nerve",
      "accessory nerve",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "Which muscle of mastication is responsible for depressing the mandible to open the mouth?",
        "options": [
          "Lateral pterygoid",
          "Masseter",
          "Temporalis",
          "Medial pterygoid",
          "Buccinator"
        ],
        "answer": 0,
        "explanation": "The lateral pterygoid is the only muscle of mastication that depresses the mandible (opens the mouth) and protrudes the chin.",
        "src": {
          "ref": "hss.4.2",
          "location": "p36 \"Depression (open mouth)\" — \"Lateral pterygoid\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Temporalis, masseter, medial and lateral pterygoids are all innervated by which nerve?",
        "options": [
          "Mandibular branch of trigeminal nerve (CN V)",
          "Facial nerve (CN VII)",
          "Hypoglossal nerve (CN XII)",
          "Accessory nerve (CN XI)",
          "Maxillary branch of trigeminal nerve (CN V)"
        ],
        "answer": 0,
        "explanation": "All four muscles of mastication are innervated by the mandibular division of the trigeminal nerve (CN V3).",
        "src": {
          "ref": "hss.4.2",
          "location": "p36 \"Temporalis, masseter, medial and lateral pterygoids are innervated by\" — \"mandibular branch of trigeminal nerve (CN V)\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The strongest jaw muscle, which elevates the mandible to close the mouth, is the ______.",
        "accept": [
          "masseter",
          "Masseter",
          "masseter muscle"
        ],
        "explanation": "The masseter is the strongest jaw muscle, originating from the zygomatic arch and inserting into the mandibular ramus.",
        "src": {
          "ref": "hss.4.2",
          "location": "p37 \"Masseter: The strongest jaw muscle\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each neck muscle to its bilateral action and motor innervation.",
        "pairs": [
          [
            "Sternocleidomastoid (bilateral)",
            "Neck flexion; accessory nerve (CN XI)"
          ],
          [
            "Trapezius (bilateral)",
            "Neck extension; accessory nerve (CN XI)"
          ],
          [
            "Masseter",
            "Jaw elevation (closing mouth); mandibular nerve (CN V3)"
          ],
          [
            "Lateral pterygoid",
            "Jaw depression (opening mouth); mandibular nerve (CN V3)"
          ]
        ],
        "explanation": "Actions and motor nerve supply of neck and chewing muscles from HSS2011 Module 4.2."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A patient is brought to the clinic unable to close their mouth after an extreme yawn, complaining of severe bilateral preauricular pain and an empty space palpable beneath the zygomatic arches. Identify the joint involved, the anatomical mechanism of the open lock, which chewing muscle initiated the forward displacement, and how the elevating muscles prevent reduction.",
        "model": "The patient has sustained an acute bilateral anterior temporomandibular joint (TMJ) dislocation. During extreme jaw opening, the lateral pterygoid muscles excessively contracted, pulling the mandibular condyles (heads) and articular discs forward over the summit of the articular tubercles into the infratemporal fossa. Once displaced anterior to the articular tubercles, the powerful elevating muscles of mastication (masseter, temporalis, and medial pterygoid) undergo reactive protective spasm, locking the mandibular condyles superiorly and anteriorly against the tubercles, preventing the patient from depressing or retracting the jaw to close the mouth.",
        "rubric": [
          "Identifies anterior dislocation of the temporomandibular joint (TMJ)",
          "Names the lateral pterygoid as the muscle pulling the condyle and disc over the articular tubercle",
          "Explains how masseter, temporalis, and medial pterygoid spasm locks the mandible open"
        ]
      }
    ],
    "commonMistakes": [
      "Assuming masseter depresses the jaw because it is big; masseter ELEVATES (closes) the jaw with tremendous crushing force.",
      "Thinking the facial nerve (CN VII) innervates mastication muscles; CN VII does facial expression; mandibular nerve (CN V3) does mastication.",
      "Confusing neck flexion (SCM bilaterally) with neck extension (trapezius bilaterally)."
    ],
    "sourceRefs": [
      {
        "ref": "hss.4.2",
        "location": "p35 \"Muscles Acting on Temporo-mandibular Joint (TMJ)\""
      },
      {
        "ref": "hss.4.2",
        "location": "p36 \"Elevation (close mouth)\""
      },
      {
        "ref": "hss.4.2",
        "location": "p36 \"Depression (open mouth)\""
      },
      {
        "ref": "hss.4.2",
        "location": "p36 \"Lateral pterygoid\""
      },
      {
        "ref": "hss.4.2",
        "location": "p36 \"Temporalis, masseter, medial and lateral pterygoids are innervated by\""
      },
      {
        "ref": "hss.4.2",
        "location": "p36 \"mandibular branch of trigeminal nerve (CN V)\""
      },
      {
        "ref": "hss.4.2",
        "location": "p37 \"Masseter: The strongest jaw muscle\""
      },
      {
        "ref": "hss.4.2",
        "location": "p37 \"Temporalis: Helps lift the mandible\""
      },
      {
        "ref": "hss.4.2",
        "location": "p54 \"Sternocleidomastoid Bilaterally: neck flexion\""
      },
      {
        "ref": "hss.4.2",
        "location": "p56 \"Trapezius Bilaterally: neck extension\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p75 \"5. Temporalis; masseter\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p18 \"Masseter Elevates the mandible [62] Mandibular branch of\""
      }
    ]
  },
  {
    "id": "hss2011-thorax-regional-landmarks",
    "subject": "HSS2011",
    "unit": "hss.m1",
    "type": "concept",
    "title": "Surface anatomy of the thorax: heart-valve auscultation and lung vs pleura projections",
    "tags": [
      "thorax",
      "surface-anatomy",
      "auscultation",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "Which surface of the heart is supported by the diaphragm?",
        "options": [
          "Sternocostal (anterior)",
          "Posterior",
          "Superior",
          "Inferior"
        ],
        "answer": 3,
        "explanation": "The inferior (diaphragmatic) surface of the heart, formed by both ventricles, rests on the diaphragm — the revision-exercise answer is D.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p24 \"surface of the heart is supported by the diaphragm\""
        }
      },
      {
        "type": "mcq",
        "prompt": "The mitral (bicuspid) valve is best auscultated at:",
        "options": [
          "2nd intercostal space, right sternal border",
          "2nd intercostal space, left sternal border",
          "Lower left sternal border",
          "5th intercostal space, left mid-clavicular line (apex)"
        ],
        "answer": 3,
        "explanation": "The mitral area is over the cardiac apex, in the 5th left intercostal space at the mid-clavicular line, where mitral flow carries the sound.",
        "src": {
          "ref": "hss.1.3",
          "location": "p26 \"Auscultation positions for heart valves\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The aortic valve is auscultated in the 2nd intercostal space at the ______ sternal border.",
        "accept": [
          "right"
        ],
        "explanation": "The aortic area is the 2nd right intercostal space; the pulmonary area is the 2nd left intercostal space.",
        "src": {
          "ref": "hss.1.3",
          "location": "p25 \"Surface anatomy of the heart\""
        }
      },
      {
        "type": "mcq",
        "prompt": "At the mid-axillary line, the inferior border of the lung and the inferior reflection of the pleura cross which ribs?",
        "options": [
          "Lung rib 6, pleura rib 8",
          "Lung rib 8, pleura rib 10",
          "Lung rib 10, pleura rib 12",
          "Lung and pleura both rib 8"
        ],
        "answer": 1,
        "explanation": "The lung reaches rib 8 and the pleura rib 10 in the mid-axillary line; the pleura is about two ribs lower than the lung at every line.",
        "src": {
          "ref": "hss.1.3",
          "location": "p27 \"Lower limit of lung\""
        }
      },
      {
        "type": "cloze",
        "prompt": "A pleural effusion collects in the dependent ______ recess, which is why a needle is placed below the lung border but within the pleural cavity.",
        "accept": [
          "costodiaphragmatic",
          "costophrenic"
        ],
        "explanation": "The costodiaphragmatic recess between costal and diaphragmatic pleura is the dependent space where effusions collect.",
        "src": {
          "ref": "hss.1.3",
          "location": "p27 \"Lower limit of pleura\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A clinician needs to drain a right pleural effusion. Explain where, relative to the lung and to a rib, the needle is placed and why, using the lung and pleural surface projections and the anatomy of the costal groove.",
        "model": "The effusion collects in the costodiaphragmatic recess, the slit where costal pleura meets diaphragmatic pleura below the inferior border of the lung. Because the pleural reflection lies about two ribs below the lung border (rib 8 vs rib 6 in the mid-clavicular line, rib 10 vs rib 8 in the mid-axillary line), there is a zone below the lung that is still inside the pleural cavity: this is the safe target. The needle is inserted in the mid-axillary line, around the 8th–9th intercostal space, and is passed immediately above the lower rib of the space — over its upper border — so that it avoids the intercostal vein, artery and nerve which run in the costal groove along the inferior border of the rib above.",
        "rubric": [
          "Locates the target in the costodiaphragmatic recess, below the lung but within the pleural cavity",
          "Uses the lung-vs-pleura two-rib difference to justify a safe zone below the lung",
          "States the needle passes immediately above a rib to avoid the costal-groove neurovascular bundle"
        ]
      }
    ],
    "commonMistakes": [
      "Auscultating each valve directly over its anatomical position — the sound is heard downstream where the blood flow carries it.",
      "Assuming the lung fills the pleural cavity to its lowest point — the pleura extends about two ribs below the lung.",
      "Inserting a chest drain below a rib — it goes above a rib to spare the intercostal vessels and nerve."
    ],
    "sourceRefs": [
      {
        "ref": "hss.1.3",
        "location": "p20 \"Anterior (sternocostal) surface\""
      },
      {
        "ref": "hss.1.3",
        "location": "p25 \"Surface anatomy of the heart\""
      },
      {
        "ref": "hss.1.3",
        "location": "p26 \"Auscultation positions for heart valves\""
      },
      {
        "ref": "hss.1.3",
        "location": "p27 \"Lower limit of lung\""
      },
      {
        "ref": "hss.1.3",
        "location": "p27 \"Lower limit of pleura\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p24 \"surface of the heart is supported by the diaphragm\""
      }
    ]
  },
  {
    "id": "hss2011-cns-spinal-cord-meninges",
    "subject": "HSS2011",
    "unit": "hss.m2",
    "type": "definition",
    "title": "Meninges, spinal nerves, roots and rami",
    "tags": [
      "neuroanatomy",
      "cns",
      "spine",
      "high-yield"
    ],
    "practice": [
      {
        "type": "cloze",
        "prompt": "The CSF-filled space between the arachnoid mater and the pia mater is the ______ space.",
        "accept": [
          "subarachnoid"
        ],
        "explanation": "Subarachnoid space — arachnoid above, pia below, CSF between. The subdural space is one layer more superficial.",
        "src": {
          "ref": "hss.fib5yr",
          "location": "p15 subarachnoid space"
        }
      },
      {
        "type": "cloze",
        "prompt": "The dural partition that separates the occipital lobes of the cerebrum from the cerebellum is the ______ ______.",
        "accept": [
          "tentorium cerebelli",
          "tentorium"
        ],
        "explanation": "Model answer: tentorium cerebelli. The falx cerebri, by contrast, sits between the two cerebral hemispheres.",
        "src": {
          "ref": "hss.revans",
          "location": "Module 2.1, Fill-in-blanks 1"
        }
      },
      {
        "type": "mcq",
        "prompt": "The connective-tissue sheath that surrounds an entire peripheral nerve is the:",
        "options": [
          "Endoneurium",
          "Perineurium",
          "Epineurium",
          "Periosteum"
        ],
        "answer": 2,
        "explanation": "Endoneurium wraps one fibre, perineurium a fascicle, epineurium the whole nerve.",
        "src": {
          "ref": "hss.2.2",
          "location": "p6 Spinal Nerves — connective tissue"
        }
      },
      {
        "type": "cloze",
        "prompt": "The swollen part of the dorsal root that contains the cell bodies of sensory neurons is the dorsal root ______.",
        "accept": [
          "ganglion"
        ],
        "explanation": "The dorsal root ganglion houses the somata of the primary sensory (afferent) neurons.",
        "src": {
          "ref": "hss.mooc3",
          "location": "p6 Ganglion"
        }
      },
      {
        "type": "mcq",
        "prompt": "The brachial plexus is formed from the interwoven ventral rami of:",
        "options": [
          "C1–C4",
          "C5–T1",
          "T12–L4",
          "L4–S4"
        ],
        "answer": 1,
        "explanation": "Brachial plexus = C5–T1. C1–C4 is cervical, T12–L4 lumbar, L4–S4 sacral.",
        "src": {
          "ref": "hss.mooc3",
          "location": "p7 Brachial Plexus (C5-T1)"
        }
      },
      {
        "type": "cloze",
        "prompt": "The bilateral strip of skin monitored by a single pair of spinal nerves is called a ______.",
        "accept": [
          "dermatome"
        ],
        "explanation": "One dermatome per spinal nerve pair, with C1 the exception (it has no cutaneous territory).",
        "src": {
          "ref": "hss.2.2",
          "location": "p8 Dermatome"
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A needle is advanced into the vertebral canal for spinal anaesthesia and CSF appears at the hub. Which meningeal layers has the needle crossed, and which space is its tip in?",
        "model": "It has passed through the epidural space (between bone and dura), then pierced the dura mater and the arachnoid mater. The tip now lies in the subarachnoid space, between arachnoid and pia, which is the CSF compartment — hence the fluid at the hub.",
        "rubric": [
          "Names the epidural space against the bone",
          "States dura and arachnoid are pierced",
          "Places the tip in the CSF-filled subarachnoid space"
        ]
      }
    ],
    "commonMistakes": [
      "Putting CSF in the subdural or epidural space — CSF is in the subarachnoid space, between arachnoid and pia.",
      "Swapping falx cerebri (between the hemispheres) and tentorium cerebelli (cerebrum vs cerebellum).",
      "Calling the whole-nerve sheath the perineurium — perineurium wraps a fascicle; the epineurium wraps the nerve.",
      "Assuming every spinal nerve has a dermatome — C1 typically has none."
    ],
    "sourceRefs": [
      {
        "ref": "hss.mooc2",
        "location": "p10 \"Subdural space\" (dura ↔ arachnoid) and \"Subarachnoid space\" (arachnoid ↔ pia); three membranes dura, arachnoid, pia mater"
      },
      {
        "ref": "hss.mooc2",
        "location": "p11 \"Subarachnoid space is filled with CSF\"; dura is \"thick and tough\" and \"provides a system of venous drainage\"; epidural space between spinal dura and vertebral bone"
      },
      {
        "ref": "hss.4.2",
        "location": "p24 \"Separates occipital lobes of cerebral hemispheres from cerebellum\" (tentorium cerebelli); \"Falx Cerebri\" separates the cerebral hemispheres"
      },
      {
        "ref": "hss.4.2",
        "location": "p25 dura mater periosteal and meningeal layers, dural sinus, \"Falx cerebri\", \"Falx cerebelli\", arachnoid mater and \"Subarachnoid space\", pia mater"
      },
      {
        "ref": "hss.2.2",
        "location": "p6 \"Epineurium\" around the nerve, \"Perineurium\" around a fascicle, \"Endoneurium\" around a fibre"
      },
      {
        "ref": "hss.2.2",
        "location": "p7 \"Dorsal root ganglion\"; proximal branches dorsal root and ventral root, distal branches dorsal ramus, ventral ramus, meningeal branch"
      },
      {
        "ref": "hss.2.2",
        "location": "p8 \"The specific bilateral region of the skin surface monitored by a single pair of spinal nerves (except C1)\""
      },
      {
        "ref": "hss.mooc3",
        "location": "p6 \"Ganglion\" is a \"swollen part\" that \"contain somas of peripheral neurons\"; dorsal root \"carries sensory signals to dorsal horn\""
      },
      {
        "ref": "hss.mooc3",
        "location": "p7 \"31 pairs\"; \"Cervical Plexus (C1-C4)\", \"Brachial Plexus (C5-T1)\", \"Lumbar Plexus (T12-L4)\", \"Sacral Plexus (L4-S4)\", \"Coccygeal Plexus\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p15 \"is the innermost meningeal layer\" (pia mater); \"A complex, interwoven network of nerves is called a nerve plexus\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p15 \"Denticulate ligament extends from the pia mater to the dura mater\""
      },
      {
        "ref": "hss.revans",
        "location": "Module 2.1 Fill-in-blanks 1 \"Tentorium cerebelli\" and 5 \"Subarachnoid\""
      }
    ]
  },
  {
    "id": "hss2011-m2-reflex-arc",
    "subject": "HSS2011",
    "unit": "hss.m2",
    "type": "sequence",
    "title": "The reflex arc: somatic, visceral, monosynaptic and polysynaptic",
    "tags": [
      "neuroanatomy",
      "reflex",
      "high-yield"
    ],
    "practice": [
      {
        "type": "sequence",
        "prompt": "Put the five components of a somatic reflex arc in the order a signal travels them.",
        "items": [
          "Somatic receptor",
          "Afferent (sensory) nerve fibre",
          "Integrating centre in the spinal cord or brainstem",
          "Efferent (motor) nerve fibre",
          "Skeletal muscle"
        ],
        "explanation": "Receptor detects the stimulus, the afferent fibre carries it in, the cord or brainstem integrates, the efferent fibre carries the command out, the skeletal muscle responds.",
        "src": {
          "ref": "hss.mooc3",
          "location": "p8 somatic reflex arc pathway"
        }
      },
      {
        "type": "mcq",
        "prompt": "Which reflex has NO interneuron between the afferent and efferent neuron?",
        "options": [
          "Withdrawal reflex",
          "Patellar (monosynaptic) reflex",
          "Crossed-extensor reflex",
          "Visceral reflex"
        ],
        "answer": 1,
        "explanation": "The patellar reflex is monosynaptic — the sensory neuron synapses directly on the motor neuron. The others are polysynaptic.",
        "src": {
          "ref": "hss.mooc3",
          "location": "p8 Monosynaptic Reflex"
        }
      },
      {
        "type": "cloze",
        "prompt": "Paralysis of both lower limbs from a spinal cord lesion between levels T1 and L1 is called ______.",
        "accept": [
          "paraplegia"
        ],
        "explanation": "Paraplegia — both lower limbs, T1–L1 lesion. A lesion above C5 gives quadriplegia (all four limbs).",
        "src": {
          "ref": "hss.mooc3",
          "location": "p8 Paraplegia"
        }
      },
      {
        "type": "mcq",
        "prompt": "Compared with a somatic reflex, a visceral (autonomic) reflex is:",
        "options": [
          "Faster and consciously controlled",
          "Unconscious, stereotyped and somewhat slower",
          "Confined to skeletal muscle",
          "Always monosynaptic"
        ],
        "answer": 1,
        "explanation": "Visceral reflexes are unconscious, automatic, stereotyped, use visceral receptors and effectors, and respond somewhat more slowly.",
        "src": {
          "ref": "hss.2.2",
          "location": "p25 Visceral Reflex"
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "Explain why you have already pulled your hand off a hot surface before you consciously feel the pain.",
        "model": "The withdrawal is a polysynaptic somatic reflex. The nociceptor signal runs in along an afferent fibre to interneurons in the spinal cord, which drive efferent motor fibres to the flexor muscles — receptor, afferent, centre, efferent, effector. Because the arc is completed in the cord and does not wait on the brain, the movement happens first; the pain signal ascending to the cortex arrives afterwards.",
        "rubric": [
          "Identifies it as a spinal (polysynaptic) reflex",
          "Lists the arc components in order",
          "Explains the arc bypasses the brain, so movement precedes conscious pain"
        ]
      }
    ],
    "commonMistakes": [
      "Saying the reflex signal goes up to the brain and back — the arc is completed in the cord or brainstem.",
      "Calling the withdrawal reflex monosynaptic — it is polysynaptic; only the stretch/patellar reflex is monosynaptic.",
      "Swapping the lesion levels: paraplegia is T1–L1, quadriplegia is above C5."
    ],
    "sourceRefs": [
      {
        "ref": "hss.mooc3",
        "location": "p8 \"quick and involuntary reaction of muscles to stimulation\"; somatic arc \"afferent nerve fiber\" → integrated center → \"efferent nerve fiber\" → \"skeletal muscle\""
      },
      {
        "ref": "hss.mooc3",
        "location": "p8 \"No interneuron between the afferent and efferent neuron\" (monosynaptic, patellar); \"Involves one or more interneurons between the afferent and efferent neurons\" (polysynaptic, withdrawal)"
      },
      {
        "ref": "hss.mooc3",
        "location": "p8 \"paralysis of both lower limbs due to spinal cord lesions at level T1 to L1\" (paraplegia); \"the paralysis of all four limbs resulting from lesions above level C5\" (quadriplegia)"
      },
      {
        "ref": "hss.2.2",
        "location": "p24 ANS is \"Responsible for visceral reflexes\""
      },
      {
        "ref": "hss.2.2",
        "location": "p25 \"Involves visceral receptors and effectors\"; \"Somewhat slower response\"; afferent neurons to CNS, interneurons in the CNS, efferent neurons and effectors"
      },
      {
        "ref": "hss.2.2",
        "location": "p26 \"Autonomic Reflex Arc\""
      }
    ]
  },
  {
    "id": "hss2011-m2-autonomic-nervous-system",
    "subject": "HSS2011",
    "unit": "hss.m2",
    "type": "comparison",
    "title": "The autonomic nervous system: sympathetic vs parasympathetic",
    "tags": [
      "neuroanatomy",
      "autonomic",
      "high-yield"
    ],
    "practice": [
      {
        "type": "comparison",
        "prompt": "Which set of features describes the SYMPATHETIC division?",
        "options": [
          "Craniosacral; long preganglionic, very short postganglionic; ganglia in the organ wall",
          "Thoracolumbar; short preganglionic, long postganglionic; sympathetic chain ganglia",
          "Thoracolumbar; long preganglionic, short postganglionic; terminal ganglia",
          "Craniosacral; short preganglionic, long postganglionic; chain ganglia"
        ],
        "answer": 1,
        "explanation": "Sympathetic = thoracolumbar, with ganglia close to the cord (the sympathetic chain), so its preganglionic fibres are short and its postganglionic fibres long.",
        "src": {
          "ref": "hss.2.2",
          "location": "p29 Sympathetic Division"
        }
      },
      {
        "type": "cloze",
        "prompt": "Parasympathetic fibres reach the thoracic and abdominal viscera in cranial nerve ______, the vagus.",
        "accept": [
          "x",
          "10",
          "ten",
          "cn x",
          "vagus"
        ],
        "explanation": "CN X (vagus) is the visceral parasympathetic outflow; CN III, VII and IX carry parasympathetic fibres to the head.",
        "src": {
          "ref": "hss.2.2",
          "location": "p32 Parasympathetic Division — Innervation to viscera"
        }
      },
      {
        "type": "cloze",
        "prompt": "The parasympathetic division is said to function during \"______ and digest\".",
        "accept": [
          "rest"
        ],
        "explanation": "Rest and digest — the calming division. The sympathetic division is \"fight or flight\".",
        "src": {
          "ref": "hss.fib5yr",
          "location": "p15 parasympathetic \"rest and digest\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Sympathetic preganglionic fibres reach a chain ganglion by way of the:",
        "options": [
          "Grey communicating ramus (unmyelinated)",
          "White communicating ramus (myelinated)",
          "Dorsal ramus",
          "Meningeal branch"
        ],
        "answer": 1,
        "explanation": "Preganglionic sympathetic fibres are myelinated and travel to the chain ganglia via a white communicating ramus; postganglionic fibres are unmyelinated.",
        "src": {
          "ref": "hss.2.2",
          "location": "p30 Communicating Rami"
        }
      },
      {
        "type": "cloze",
        "prompt": "The visceral motor system that controls glands, cardiac muscle and smooth muscle is the ______ nervous system.",
        "accept": [
          "autonomic"
        ],
        "explanation": "Model answer: autonomic.",
        "src": {
          "ref": "hss.revans",
          "location": "Module 2.2, Fill-in-blanks 5"
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "Why does a single parasympathetic signal act on one organ quite selectively, while a sympathetic discharge tends to affect the whole body at once?",
        "model": "Parasympathetic ganglia are terminal ganglia sitting in or beside the target organ, so a preganglionic fibre reaches just that one organ and the very short postganglionic fibre acts locally — the effect is selective. Sympathetic ganglia lie in the paravertebral chain beside the cord; a preganglionic fibre entering the chain can spread up and down it and synapse on many postganglionic neurons, whose long axons then reach targets all over the body, so the discharge is diffuse.",
        "rubric": [
          "Places parasympathetic ganglia in/near the organ (selective)",
          "Places sympathetic ganglia in the paravertebral chain",
          "Explains divergence along the chain gives a body-wide sympathetic effect"
        ]
      }
    ],
    "commonMistakes": [
      "Swapping the outflows: sympathetic is thoracolumbar, parasympathetic is craniosacral.",
      "Saying sympathetic preganglionic fibres are long — they are short, because the chain ganglia are close to the cord.",
      "Forgetting the vagus (CN X): the head gets CN III, VII, IX, but the chest and abdomen get CN X.",
      "Calling the white communicating ramus a postganglionic route — it carries myelinated preganglionic fibres into the chain."
    ],
    "sourceRefs": [
      {
        "ref": "hss.2.2",
        "location": "p24 ANS is a \"Visceral motor system\" that \"Controls glands, cardiac muscle, and smooth muscle\""
      },
      {
        "ref": "hss.2.2",
        "location": "p27 sympathetic \"Fight or flight\", parasympathetic \"Rest and digest\"; \"Balance between sympathetic and parasympathetic\" (autonomic tone)"
      },
      {
        "ref": "hss.2.2",
        "location": "p28 \"Soma in ganglion\" (postganglionic neuron); preganglionic neuron soma in the brainstem or spinal cord, axon terminating in the ganglion"
      },
      {
        "ref": "hss.2.2",
        "location": "p29 sympathetic is the \"Thoracolumbar\" division, \"Relatively short\" preganglionic and long postganglionic fibres, \"Sympathetic chain ganglia (paravertebral\" ganglia)"
      },
      {
        "ref": "hss.2.2",
        "location": "p30 preganglionic fibres \"Myelinated\" and \"Travel to chain ganglia by a white communicating ramus\"; postganglionic \"Unmyelinated\""
      },
      {
        "ref": "hss.2.2",
        "location": "p32 parasympathetic \"Craniosacral division\", \"Long preganglionic fibers\" ending \"in terminal ganglia in or near the target organ\", \"Very short postganglionic fibers\"; outflow via \"Oculomotor nerve (III)\", \"Facial nerve (VII)\", \"Glossopharyngeal nerve (IX)\" and \"Vagus nerve (X)\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p15 pupillary constrictor and dilator \"controlled by the autonomic nervous system\""
      },
      {
        "ref": "hss.revans",
        "location": "Module 2.2 Fill-in-blanks 5 \"Autonomic\""
      }
    ]
  },
  {
    "id": "hss2011-m2-neurons-glia",
    "subject": "HSS2011",
    "unit": "hss.m2",
    "type": "matching",
    "title": "Neurons and the six glial cell types",
    "tags": [
      "neuroanatomy",
      "histology",
      "high-yield"
    ],
    "practice": [
      {
        "type": "matching",
        "prompt": "Match each glial cell to its function.",
        "pairs": [
          [
            "Oligodendrocyte",
            "Myelin sheath in the CNS"
          ],
          [
            "Schwann cell",
            "Myelin sheath in the PNS"
          ],
          [
            "Microglia",
            "Phagocytic waste removal"
          ],
          [
            "Ependymal cell",
            "Secretes cerebrospinal fluid"
          ],
          [
            "Astrocyte",
            "Chemical exchange between blood and neuron; induces the blood–brain barrier"
          ],
          [
            "Radial glial cell",
            "Guides neuron migration in the embryo"
          ]
        ],
        "explanation": "Two myelin makers (CNS vs PNS), a phagocyte, a CSF secretor, the blood–brain-barrier inducer, and an embryonic guide.",
        "src": {
          "ref": "hss.mooc3",
          "location": "p23 Neuron and Glia"
        }
      },
      {
        "type": "mcq",
        "prompt": "Which glial cell is the most abundant in the CNS and stimulates formation of the blood–brain barrier?",
        "options": [
          "Microglia",
          "Oligodendrocyte",
          "Astrocyte",
          "Ependymal cell"
        ],
        "answer": 2,
        "explanation": "Astrocytes — most abundant CNS glia; they induce the blood–brain barrier with the capillary endothelial cells.",
        "src": {
          "ref": "hss.fib5yr",
          "location": "p14 astrocytes and the blood-brain barrier"
        }
      },
      {
        "type": "cloze",
        "prompt": "Brain capillaries that form the blood–brain barrier are lined by tight ______ cells.",
        "accept": [
          "endothelial"
        ],
        "explanation": "Endothelial cells line the brain capillaries and form the physical barrier that blocks chemicals and micro-organisms.",
        "src": {
          "ref": "hss.mooc3",
          "location": "p23 Blood-Brain Barrier"
        }
      },
      {
        "type": "cloze",
        "prompt": "The three basic parts of a neuron are the cell body, the dendrites and the ______.",
        "accept": [
          "axon"
        ],
        "explanation": "Cell body, dendrites, axon.",
        "src": {
          "ref": "hss.mooc3",
          "location": "p23 Neurons"
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A drug given into the bloodstream fails to reach a useful concentration in brain tissue, though it works well elsewhere. Which structure explains this, and which two cell types build it?",
        "model": "The blood–brain barrier. It blocks the passage of many chemicals and all micro-organisms from blood into brain tissue. It is built by the endothelial cells lining the brain capillaries, sealed tightly together, together with astrocytes, which stimulate the barrier’s formation and are the most abundant glial cells in the CNS.",
        "rubric": [
          "Names the blood–brain barrier",
          "Names capillary endothelial cells",
          "Names astrocytes as the inducing glia"
        ]
      }
    ],
    "commonMistakes": [
      "Naming oligodendrocytes for PNS myelin — that is Schwann cells; oligodendrocytes are CNS.",
      "Saying microglia or ependymal cells are the most abundant CNS glia — it is astrocytes.",
      "Forgetting that the blood–brain barrier is endothelial cells PLUS astrocyte induction, not astrocytes alone."
    ],
    "sourceRefs": [
      {
        "ref": "hss.mooc3",
        "location": "p23 neuron = \"Cell body\", \"Dendrites\", \"Axon\"; glia — oligodendrocytes and Schwann cells for \"myelin sheath\", microglia \"Waste removal (phagocyte)\", ependymal cells \"Secrete CSF\", astrocytes \"Exchange chemical between blood & neuron\", radial glia \"Guide neuron development in embryo\""
      },
      {
        "ref": "hss.mooc3",
        "location": "p23 \"Blood-Brain Barrier\" — \"Chemical and microorganism are blocked\", capillaries \"lined with endothelial cells\""
      },
      {
        "ref": "hss.2.3",
        "location": "p8 white matter \"consists of myelinated axons\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p14 \"Astrocytes are the most abundant glial cells in the CNS\"; they \"stimulate the formation of blood-brain barrier\""
      },
      {
        "ref": "hss.revans",
        "location": "Module 2.3 MCQ 3 (glial cell myelinating in the PNS = Schwann cells)"
      }
    ]
  },
  {
    "id": "hss2011-m2-cerebellum",
    "subject": "HSS2011",
    "unit": "hss.m2",
    "type": "definition",
    "title": "The cerebellum: vermis, folia, arbor vitae and Purkinje cells",
    "tags": [
      "neuroanatomy",
      "cerebellum"
    ],
    "practice": [
      {
        "type": "cloze",
        "prompt": "The midline part of the cerebellum that joins its two hemispheres is the ______.",
        "accept": [
          "vermis"
        ],
        "explanation": "Vermis — literally \"worm\", the \"wormlike bridge\" of the slide.",
        "src": {
          "ref": "hss.2.2",
          "location": "p21 Vermis"
        }
      },
      {
        "type": "cloze",
        "prompt": "The tree-like branching white matter of the cerebellum is called the ______ ______.",
        "accept": [
          "arbor vitae"
        ],
        "explanation": "Arbor vitae, the \"tree of life\".",
        "src": {
          "ref": "hss.2.2",
          "location": "p21 Arbor vitae"
        }
      },
      {
        "type": "mcq",
        "prompt": "The cerebellum is chiefly responsible for:",
        "options": [
          "Language comprehension",
          "Motor coordination (with non-motor roles)",
          "Producing cerebrospinal fluid",
          "Relaying all sensory input to the cortex"
        ],
        "answer": 1,
        "explanation": "The slide states motor coordination plus non-motor functions such as emotion.",
        "src": {
          "ref": "hss.2.2",
          "location": "p21 Motor coordination + non-motor functions"
        }
      },
      {
        "type": "cloze",
        "prompt": "The distinctive neuron of the cerebellar cortex, and the answer to the Module 2.1 blank, is the ______ cell.",
        "accept": [
          "purkinje"
        ],
        "explanation": "Purkinje cell — one of the labelled components on the cerebellum slide.",
        "src": {
          "ref": "hss.revans",
          "location": "Module 2.1, Fill-in-blanks 2"
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "From the lecture slide alone, list what you can say about the internal structure of the cerebellum.",
        "model": "The surface is folded into folia. Inside, the white matter branches in a tree-like arbor vitae pattern. Embedded in that white matter are the deep nuclei. Purkinje cells sit in a single layer of the cortex — the histological signature of the cerebellum. The whole organ connects to the brainstem through the cerebellar peduncles, and the two hemispheres are joined at the midline by the vermis.",
        "rubric": [
          "Names folia, arbor vitae and deep nuclei",
          "Names Purkinje cells in the cortex",
          "Names the peduncles and the vermis"
        ]
      }
    ],
    "commonMistakes": [
      "Confusing the vermis (cerebellar midline) with the falx (between the cerebral hemispheres).",
      "Calling the arbor vitae grey matter — it is the branching white matter.",
      "Placing the cerebellum above the tentorium — the tentorium roofs it, with the occipital lobes above."
    ],
    "sourceRefs": [
      {
        "ref": "hss.2.2",
        "location": "p21 \"Cerebellar peduncles\", \"Vermis\", \"Folia (gyri)\", \"Arbor vitae\", \"Deep nuclei\", \"Purkinje cells\", \"Motor coordination\" plus non-motor functions like emotion; two cerebellar hemispheres, the vermis a \"wormlike bridge\""
      },
      {
        "ref": "hss.4.2",
        "location": "p24 tentorium cerebelli \"Separates occipital lobes of cerebral hemispheres from cerebellum\""
      },
      {
        "ref": "hss.revans",
        "location": "Module 2.1, Fill-in-blanks 2 \"Purkinje cell\""
      }
    ]
  },
  {
    "id": "hss2011-cns-brainstem-reticular",
    "subject": "HSS2011",
    "unit": "hss.m2",
    "type": "definition",
    "title": "Brainstem: midbrain, pons, medulla and the reticular formation",
    "tags": [
      "neuroanatomy",
      "cns",
      "brainstem",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "Where do the descending corticospinal pyramids decussate, and which brainstem part is it?",
        "options": [
          "Midbrain",
          "Pons",
          "Medulla oblongata",
          "Spinal cord"
        ],
        "answer": 2,
        "explanation": "The pyramids lie on the anterior medulla oblongata, the most inferior part of the brainstem, and the corticospinal fibres cross there.",
        "src": {
          "ref": "hss.2.3",
          "location": "p24 \"Pyramid (corticospinal tract inside)\" — \"Medulla oblongata\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which midbrain structure provides a visual reflex?",
        "options": [
          "Inferior colliculi",
          "Superior colliculi",
          "Red nucleus",
          "Substantia nigra"
        ],
        "answer": 1,
        "explanation": "Superior colliculi provide a visual reflex; inferior colliculi provide an auditory reflex.",
        "src": {
          "ref": "hss.2.3",
          "location": "p22 \"Superior colliculi\" — \"Provides visual reflex\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The loosely organised web of grey matter that runs vertically through all levels of the brainstem is the ______ ______.",
        "accept": [
          "reticular formation",
          "the reticular formation"
        ],
        "explanation": "Model answer: reticular formation. Its reticular activating system governs somatic motor control, cardiovascular control, pain modulation, and sleep and consciousness.",
        "src": {
          "ref": "hss.revans",
          "location": "Module 2.3, Fill-in-blanks 5"
        }
      },
      {
        "type": "cloze",
        "prompt": "Degeneration of the ______ ______ in the midbrain, with a deficiency of dopamine synthesis, causes Parkinson’s disease.",
        "accept": [
          "substantia nigra"
        ],
        "explanation": "The substantia nigra is an inhibitory motor centre whose dopamine acts on the basal nuclei; losing it produces the tremor and dyskinesia of Parkinson’s disease.",
        "src": {
          "ref": "hss.2.2",
          "location": "p22 \"Degeneration of substantia nigra (in midbrain)\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "Why is an acute lesion compressing the medulla oblongata rapidly fatal, when a lesion of similar size in the frontal lobe may not be?",
        "model": "The medulla oblongata contains the cardiac centre, the vasomotor centre and the respiratory centre. Compressing it fails spontaneous breathing and cardiovascular control at once, which the rest of the brain cannot substitute for. A frontal-lobe lesion of similar size destroys association cortex whose loss is survivable.",
        "rubric": [
          "Names the cardiac, vasomotor and respiratory centres",
          "Places them in the medulla",
          "Concludes that losing autonomic vital control is fatal"
        ]
      }
    ],
    "commonMistakes": [
      "Swapping the reflex jobs of the superior (visual) and inferior (auditory) colliculi.",
      "Placing the cardiac and vasomotor centres in the pons rather than the medulla.",
      "Attributing Parkinson’s to the red nucleus or basal nuclei rather than the substantia nigra."
    ],
    "sourceRefs": [
      {
        "ref": "hss.2.3",
        "location": "p21 \"Brainstem\" — \"Midbrain\" — \"Pons\" — \"Medulla\" — \"oblongata\""
      },
      {
        "ref": "hss.2.3",
        "location": "p22 \"Cerebral aqueduct passes through\" — \"Superior colliculi\" — \"Provides visual reflex\" — \"Inferior colliculi\" — \"Provides auditory reflex\" — \"Red nucleus\" — \"Coordination of muscle groups\" — \"Substantia nigra\" — \"Controls fine movement\" — \"Inhibitory motor center\" — \"Dopamine exerts inhibitory effect at the basal nuclei.\" — \"Cranial nerves III and IV\""
      },
      {
        "ref": "hss.2.3",
        "location": "p23 \"Peduncles\" — \"cerebellum\" — \"Conveys motor information\" — \"from the cerebral cortex to\" — \"the cerebellum\" — \"Ascending & descending tracts\" — \"Cranial nerves V - VIII\""
      },
      {
        "ref": "hss.2.3",
        "location": "p24 \"Cardiac center\" — \"Vasomotor center\" — \"Respiratory center\" — \"Olive\" — \"Fourth ventricle\" — \"Choroid plexus\" — \"Pyramid (corticospinal tract inside)\""
      },
      {
        "ref": "hss.2.3",
        "location": "p25 \"Loosely organized web of gray\" — \"matter that runs vertically\" — \"through all levels of brainstem\" — \"Somatic motor control\" — \"Cardiovascular control\" — \"Pain modulation\" — \"Sleep and consciousness\""
      },
      {
        "ref": "hss.2.2",
        "location": "p22 \"Degeneration of substantia nigra (in midbrain)\" — \"Dopamine-releasing cell\" — \"Loss of motor function\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p13 \"The medulla\" — \"oblongata is the most inferior part of the brainstem.\""
      },
      {
        "ref": "hss.revans",
        "location": "Module 2.3, Fill-in-blanks 5 \"Reticular formation\""
      }
    ]
  },
  {
    "id": "hss2011-cns-cerebrum-cortex-basal",
    "subject": "HSS2011",
    "unit": "hss.m2",
    "type": "definition",
    "title": "Cerebrum, functional cortical areas and basal nuclei",
    "tags": [
      "neuroanatomy",
      "cns",
      "cortex",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "The primary somatosensory cortex is located on the:",
        "options": [
          "Precentral gyrus",
          "Postcentral gyrus",
          "Superior temporal gyrus",
          "Cingulate gyrus"
        ],
        "answer": 1,
        "explanation": "The postcentral gyrus (parietal lobe) is the primary somatosensory cortex; the precentral gyrus is primary motor.",
        "src": {
          "ref": "hss.2.3",
          "location": "p6 \"Postcentral gyrus (primary somatosensory)\""
        }
      },
      {
        "type": "cloze",
        "prompt": "Fibres that connect the corresponding cortices of the two hemispheres, such as the corpus callosum, are ______ fibres.",
        "accept": [
          "commissural",
          "commissure"
        ],
        "explanation": "Commissures connect the corresponding cortices of the 2 hemispheres — e.g. corpus callosum. Association fibres stay within one hemisphere; projection fibres run to more caudal CNS.",
        "src": {
          "ref": "hss.2.3",
          "location": "p9 \"connect the corresponding\" — \"cortices of the 2 hemispheres\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The principal commissural tract connecting the left and right cerebral hemispheres is the ______ ______.",
        "accept": [
          "corpus callosum"
        ],
        "explanation": "Model answer: corpus callosum — the principle commissural tract that allows the right and left cerebral hemispheres to communicate.",
        "src": {
          "ref": "hss.revans",
          "location": "Module 2.3, Fill-in-blanks 3"
        }
      },
      {
        "type": "mcq",
        "prompt": "Which set of structures makes up the basal nuclei?",
        "options": [
          "Thalamus, hypothalamus, epithalamus",
          "Caudate nucleus, putamen, globus pallidus",
          "Hippocampus, amygdala, fornix",
          "Midbrain, pons, medulla"
        ],
        "answer": 1,
        "explanation": "The basal nuclei are the caudate nucleus, putamen and globus pallidus; they adjust activity in the descending tracts and regulate muscle tone and force.",
        "src": {
          "ref": "hss.2.3",
          "location": "p15 \"Including Caudate nucleus + Putamen + Globus Pallidus\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A stroke patient understands spoken commands perfectly and knows what they wish to say, but struggles to articulate words. Which cortical speech area is affected, and where is it?",
        "model": "Broca’s area, the speech centre, in the frontal lobe of the dominant hemisphere. Difficulty in vocalisation with preserved comprehension points there. Wernicke’s area (the general interpretive area) is intact because language comprehension is preserved.",
        "rubric": [
          "Identifies Broca’s area",
          "Places it in the frontal lobe",
          "Distinguishes speech output from Wernicke’s interpretation"
        ]
      }
    ],
    "commonMistakes": [
      "Swapping precentral gyrus (motor) and postcentral gyrus (sensory).",
      "Calling the internal capsule a commissural or association tract — it is a projection tract (cortex to caudal CNS).",
      "Lumping Wernicke’s area into the limbic system because it sounds anatomical."
    ],
    "sourceRefs": [
      {
        "ref": "hss.2.3",
        "location": "p3 \"Central sulcus runs from\" — \"fissure towards the lateral\" — \"Precentral\" — \"gyrus\""
      },
      {
        "ref": "hss.2.3",
        "location": "p6 \"Interprets pain and temperature sensation.\" — \"Perceives pressure and touch sensation.\" — \"Discriminates shape, size and texture of the objects.\""
      },
      {
        "ref": "hss.2.3",
        "location": "p7 \"Precentral gyrus (primary motor)\" — \"Functions: Motor execution\" — \"it controls the muscles & joints movements of the contralateral side\""
      },
      {
        "ref": "hss.2.3",
        "location": "p8 \"White matter\" — \"consists of\" — \"myelinated axons\""
      },
      {
        "ref": "hss.2.3",
        "location": "p9 \"connect the corresponding\" — \"cortices of the 2 hemispheres\"; \"Connect the cortex to more caudal\" — \"parts of the CNS\"; \"Connect the cortex of the\" — \"different parts of the same\"; \"Decussation\" — \"of pyramids\"; \"Corona\" — \"radiata\""
      },
      {
        "ref": "hss.2.3",
        "location": "p15 \"Including Caudate nucleus + Putamen + Globus Pallidus\"; \"Adjust activity in the descending tracts.\"; \"For sequencing movements\"; \"For regulating muscle tone & muscle force\""
      },
      {
        "ref": "hss.2.2",
        "location": "p13 \"Longitudinal fissure\"; p15 \"Motor control\", \"Speech\", \"Visual perception\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p15 \"The longitudinal fissure separates the two cerebral hemispheres.\" — \"lateral sulcus\" — \"separates the frontal and temporal lobes.\"; \"damage to the occipital lobe\""
      },
      {
        "ref": "hss.revans",
        "location": "Module 2.3, Fill-in-blanks 3 \"Corpus callosum\""
      }
    ]
  },
  {
    "id": "hss2011-cns-ventricles-csf-blood",
    "subject": "HSS2011",
    "unit": "hss.m2",
    "type": "definition",
    "title": "The ventricular system and cerebrospinal fluid",
    "tags": [
      "neuroanatomy",
      "cns",
      "ventricles",
      "csf",
      "high-yield"
    ],
    "practice": [
      {
        "type": "cloze",
        "prompt": "The ______ ______ connects the lateral ventricle to the third ventricle.",
        "accept": [
          "interventricular foramen",
          "foramen of monro"
        ],
        "explanation": "Model answer: interventricular foramen. CSF flows through the interventricular foramina from each lateral ventricle into the third ventricle.",
        "src": {
          "ref": "hss.revans",
          "location": "Module 2.3, Fill-in-blanks 2"
        }
      },
      {
        "type": "sequence",
        "prompt": "Put the CSF pathway in order from where it is made to where it is reabsorbed.",
        "items": [
          "Lateral ventricles",
          "Interventricular foramen",
          "Third ventricle",
          "Cerebral aqueduct",
          "Fourth ventricle",
          "Subarachnoid space",
          "Arachnoid villi into the superior sagittal sinus"
        ],
        "explanation": "CSF flows from the lateral ventricle to the third ventricle, through the cerebral aqueduct to the fourth ventricle, out into the subarachnoid space, and is returned to venous blood via the arachnoid villi in the dural venous sinuses.",
        "src": {
          "ref": "hss.fib5yr",
          "location": "p13 \"flows from the lateral ventricle to the third\" — \"ventricle and then through the cerebral aqueduct to the fourth ventricle.\""
        }
      },
      {
        "type": "mcq",
        "prompt": "CSF is returned to the venous circulation at the:",
        "options": [
          "Choroid plexus",
          "Cerebral aqueduct",
          "Arachnoid villi / granulations",
          "Central canal"
        ],
        "answer": 2,
        "explanation": "At the arachnoid villi, CSF is reabsorbed into venous blood of the dural venous sinuses; the villi penetrate the meningeal dura and extend into the superior sagittal sinus.",
        "src": {
          "ref": "hss.2.3",
          "location": "p30 \"CSF is absorbed into the venous circulation at the arachnoid granulations.\""
        }
      },
      {
        "type": "cloze",
        "prompt": "CSF is secreted by the ______ ______, which is present in all four ventricles.",
        "accept": [
          "choroid plexus"
        ],
        "explanation": "The choroid plexus in each lateral ventricle, the third ventricle and the fourth ventricle secretes CSF, each adding more as the fluid passes.",
        "src": {
          "ref": "hss.2.3",
          "location": "p29 \"CSF is secreted by\" — \"choroid plexus in\" — \"each lateral ventricle.\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "An MRI shows both lateral ventricles and the third ventricle dilated, but the fourth ventricle is normal. Where is the obstruction, and why does the pattern point there?",
        "model": "The obstruction is in the cerebral aqueduct. CSF flows lateral ventricles -> interventricular foramen -> third ventricle -> cerebral aqueduct -> fourth ventricle, so a block at the aqueduct backs fluid up into the third and lateral ventricles while the fourth ventricle, downstream, stays normal.",
        "rubric": [
          "Names the cerebral aqueduct",
          "Explains upstream dilation of the third and lateral ventricles",
          "Notes the fourth ventricle is normal because it is downstream"
        ]
      }
    ],
    "commonMistakes": [
      "Confusing the interventricular foramen (lateral to third) with the cerebral aqueduct (third to fourth).",
      "Saying CSF is reabsorbed into lymphatics rather than the dural venous sinuses.",
      "Forgetting the choroid plexus is in all four ventricles, not just the lateral ones."
    ],
    "sourceRefs": [
      {
        "ref": "hss.2.3",
        "location": "p27 \"Interventricular\" — \"foramen\" — \"Third ventricle\" — \"Cerebral aqueduct\" — \"Fourth ventricle\" — \"Central canal\" — \"4 ventricles = 2 x lateral + 1 x 3rd + 1 x 4th\""
      },
      {
        "ref": "hss.2.3",
        "location": "p28 \"provides mechanical support of the brain\" — \"controls brain excitability by regulating the ionic composition\" — \"carries away metabolites\" — \"provides some protection from pressure changes\""
      },
      {
        "ref": "hss.2.3",
        "location": "p29 \"CSF is secreted by\" — \"choroid plexus in\" — \"each lateral ventricle.\" — \"CSF flows out two lateral apertures\" — \"and one median aperture.\" — \"CSF fills subarachnoid space and\" — \"bathes external surfaces of brain\""
      },
      {
        "ref": "hss.2.3",
        "location": "p30 \"Arachnoid villi penetrate the meningeal layer of the dura mater and extend into the\" — \"superior sagittal sinus.\" — \"In adults, these extensions form large arachnoid granulations.\" — \"CSF is absorbed into the venous circulation at the arachnoid granulations.\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p13 \"flows from the lateral ventricle to the third\" — \"ventricle and then through the cerebral aqueduct to the fourth ventricle.\" — \"The CSF is returned to the venous circulation via the arachnoid\" — \"villi located in the Dural venous sinuses.\""
      },
      {
        "ref": "hss.revans",
        "location": "Module 2.3, Fill-in-blanks 2 \"Interventricular foramen\""
      }
    ]
  },
  {
    "id": "hss2011-neuro-cranial-nerves-distribution",
    "subject": "HSS2011",
    "unit": "hss.m2",
    "type": "matching",
    "title": "Cranial nerves CN I to XII: modalities and targets",
    "tags": [
      "neuroanatomy",
      "cranial-nerves",
      "high-yield"
    ],
    "practice": [
      {
        "type": "cloze",
        "prompt": "The ______ nerve controls movement of the muscles of mastication.",
        "accept": [
          "trigeminal nerve",
          "trigeminal",
          "cn v",
          "cranial nerve v"
        ],
        "explanation": "Model answer: trigeminal nerve (CN V). Its mandibular division (V3) supplies the chewing muscles; the facial nerve (CN VII) supplies facial expression.",
        "src": {
          "ref": "hss.revans",
          "location": "Module 2.3, Fill-in-blanks 4"
        }
      },
      {
        "type": "cloze",
        "prompt": "The longest cranial nerve, with the most extensive distribution, is the ______ nerve.",
        "accept": [
          "vagus",
          "vagus nerve",
          "cn x"
        ],
        "explanation": "Model answer: vagus nerve (CN X) — the longest cranial nerve, with major parasympathetic roles in cardiac, pulmonary, digestive and urinary function.",
        "src": {
          "ref": "hss.revans",
          "location": "Module 2.3, Fill-in-blanks 1"
        }
      },
      {
        "type": "matching",
        "prompt": "Match each cranial nerve to its brainstem level of emergence.",
        "pairs": [
          [
            "CN III Oculomotor / CN IV Trochlear",
            "Midbrain"
          ],
          [
            "CN V to CN VIII",
            "Pons"
          ],
          [
            "CN IX to CN XII",
            "Medulla oblongata"
          ],
          [
            "CN I Olfactory / CN II Optic",
            "Forebrain (not the brainstem)"
          ]
        ],
        "explanation": "The cranial nerves emerge in numerical order down the base of the brain; III-IV from the midbrain, V-VIII from the pons, IX-XII from the medulla.",
        "src": {
          "ref": "hss.2.3",
          "location": "p22 \"Cranial nerves III and IV\"; p23 \"Cranial nerves V - VIII\"; p24 \"CN IX\" — \"CN X\" — \"CN XI\" — \"CN XII\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each cranial nerve to its principal function.",
        "pairs": [
          [
            "CN V Trigeminal",
            "Face sensation + muscles of mastication"
          ],
          [
            "CN VII Facial",
            "Muscles of facial expression + taste anterior 2/3"
          ],
          [
            "CN X Vagus",
            "Parasympathetic to thoracic and abdominal viscera"
          ],
          [
            "CN XII Hypoglossal",
            "Tongue movement"
          ]
        ],
        "explanation": "Trigeminal chews and feels the face, facial makes expressions and tastes the front of the tongue, vagus runs the viscera, hypoglossal moves the tongue.",
        "src": {
          "ref": "hss.2.3",
          "location": "p38 \"Trigeminal nerve (CN V)\" — \"(Mastication)\"; p39 \"Facial nerve (CN VII)\" — \"Taste (anterior 2/3)\"; p42 \"Vagus nerve (CN X)\" — \"The longest cranial nerve\"; p43 \"Hypoglossal nerve (CN XII)\" — \"Tongue movement\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A patient cannot clench their jaw, but their smile and eyebrow-raising are normal. Which cranial nerve is affected, which is spared, and how do you know?",
        "model": "The trigeminal nerve (CN V) is affected: its mandibular division V3 supplies the muscles of mastication, so a weak jaw clench points there. The facial nerve (CN VII) is spared, because it supplies the muscles of facial expression, and normal smiling and eyebrow movement show CN VII is intact.",
        "rubric": [
          "Names CN V for mastication",
          "Names CN VII for facial expression",
          "Uses normal expression to conclude CN VII is intact"
        ]
      }
    ],
    "commonMistakes": [
      "Mixing up trigeminal (chewing) and facial (facial expression).",
      "Assigning eye abduction to CN III instead of CN VI (abducens).",
      "Naming CN VII for posterior-tongue taste — that is CN IX; VII is the anterior two-thirds."
    ],
    "sourceRefs": [
      {
        "ref": "hss.2.3",
        "location": "p31 \"Cranial nerves (CN) – 12 pairs\" — \"Olfactory bulb\" — \"Olfactory tract\" — \"Optic chiasm\" — \"Midbrain CN V\" — \"Pons CN VI\""
      },
      {
        "ref": "hss.2.3",
        "location": "p36 \"Oculomotor, trochlear & abducens nerves\" — \"For eyeball movement (extrinsic eye muscles)\""
      },
      {
        "ref": "hss.2.3",
        "location": "p38 \"Trigeminal nerve (CN V)\" — \"Ophthalmic division (V\" — \"Maxillary division (V\" — \"Mandibular division (V\" — \"(Mastication)\" — \"to chewing muscles\""
      },
      {
        "ref": "hss.2.3",
        "location": "p39 \"Facial nerve (CN VII)\" — \"(facial expression, 5 branches)\" — \"Taste (anterior 2/3)\" — \"muscles of facial\" — \"expression\""
      },
      {
        "ref": "hss.2.3",
        "location": "p41 \"Glossopharyneal nerve (CN IX)\" — \"Taste (posterior 1/3)\" — \"Salivary gland secretion\" — \"Swallowing\" — \"Parotid salivary gland\""
      },
      {
        "ref": "hss.2.3",
        "location": "p42 \"Vagus nerve (CN X)\" — \"The longest cranial nerve\" — \"Has most extensive\" — \"distribution\" — \"Cardiac\" — \"Pulmonary\" — \"Digestive\" — \"Urinary\""
      },
      {
        "ref": "hss.2.3",
        "location": "p43 \"Accessory nerve (CN XI)\" — \"Head and neck movement\" — \"Hypoglossal nerve (CN XII)\" — \"Tongue movement\""
      },
      {
        "ref": "hss.2.2",
        "location": "p32 \"Innervation to head\" — \"Oculomotor nerve (III)\" — \"Facial nerve (VII)\" — \"Glossopharyngeal nerve (IX)\" — \"Innervation to viscera\" — \"Vagus nerve (X)\""
      },
      {
        "ref": "hss.revans",
        "location": "Module 2.3, Fill-in-blanks 1 \"Vagus nerve\" and Fill-in-blanks 4 \"Trigeminal nerve\""
      }
    ]
  },
  {
    "id": "hss2011-m2-stroke-correlates",
    "subject": "HSS2011",
    "unit": "hss.m2",
    "type": "concept",
    "title": "Anatomical correlates of stroke",
    "tags": [
      "neuroanatomy",
      "stroke",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "A right-handed man has an occlusion of his left middle cerebral artery. Which combination of deficits is expected?",
        "options": [
          "Left-sided weakness only",
          "Right-sided weakness and sensory loss, with aphasia",
          "Loss of vision only",
          "No deficit — the circle of Willis compensates fully"
        ],
        "answer": 1,
        "explanation": "A left MCA occlusion affects the left hemisphere: contralateral (right) motor and sensory loss, plus aphasia because Broca’s area lies in the frontal lobe within the MCA territory.",
        "src": {
          "ref": "hss.mooc2",
          "location": "p5 \"Left middle cerebral artery\" — \"Aphasia, right body side sensory and motor paralysis\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The two vertebral arteries fuse to form the ______ artery.",
        "accept": [
          "basilar",
          "basilar artery"
        ],
        "explanation": "The vertebral arteries ascend within the transverse foramina, enter at the foramen magnum, and fuse to form the basilar artery, which supplies the posterior part of the cerebral arterial circle.",
        "src": {
          "ref": "hss.mooc2",
          "location": "p4 \"2 vertebral arteries fuse to form basilar artery\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The primary motor cortex is located on the precentral gyrus, immediately ______ to the central sulcus.",
        "accept": [
          "anterior"
        ],
        "explanation": "The precentral gyrus (primary motor cortex) is immediately anterior to the central sulcus; a lesion here from an MCA stroke affects contralateral motor function.",
        "src": {
          "ref": "hss.fib5yr",
          "location": "p13 \"the primary motor cortex\" — \"located immediately anterior to the central\" — \"sulcus\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Why is a lower brainstem stroke commonly fatal?",
        "options": [
          "It destroys the visual cortex",
          "It interrupts the cardiac, vasomotor and respiratory centres of the medulla",
          "It blocks CSF reabsorption",
          "It damages Broca’s area"
        ],
        "answer": 1,
        "explanation": "The medulla oblongata houses the vital autonomic centres; a lower-brainstem stroke that interrupts them stops spontaneous breathing and cardiovascular control.",
        "src": {
          "ref": "hss.mooc2",
          "location": "p5 \"Lower brain stem\" — \"Commonly fatal\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A patient has right-sided face and arm weakness with sensory loss and cannot produce fluent speech, though they follow commands. Localise the lesion to a hemisphere and an artery, and justify each step.",
        "model": "Left hemisphere, middle cerebral artery. The right-sided motor and sensory loss localises to the left hemisphere because both the descending motor tract (crossing at the medullary pyramids) and the ascending sensory pathway (crossing in the 2nd-order neuron) mean the left cortex serves the right body. The face-and-arm pattern with preserved comprehension but impaired speech output fits the middle cerebral artery territory over the lateral surface, which carries the motor and sensory strips and Broca’s area in the frontal lobe.",
        "rubric": [
          "States left hemisphere and explains it via decussation",
          "Names the middle cerebral artery and its lateral-surface territory",
          "Attributes the speech deficit to Broca’s area in the frontal lobe"
        ]
      }
    ],
    "commonMistakes": [
      "Localising the weakness to the same side as the brain lesion — the tracts have already crossed.",
      "Placing the primary motor cortex behind the central sulcus — that is the sensory strip; motor is anterior.",
      "Thinking the circle of Willis prevents all strokes — it \"reduces the probability\" of a circulation interruption, it does not abolish it."
    ],
    "sourceRefs": [
      {
        "ref": "hss.mooc3",
        "location": "p2 \"3 neurons: 1st, 2nd, 3rd neuron\" — \"in 2nd neuron\" — \"left cerebral cortex: sensory information of right body\""
      },
      {
        "ref": "hss.mooc3",
        "location": "p4 \"Upper Motor Neuron: in the cortex\" — \"Lower Motor Neuron: in the brainstem or spinal cord\" — \"damages the motor centers of one side of the brain will cause loss of function of the opposite side of\""
      },
      {
        "ref": "hss.mooc3",
        "location": "p24 \"Striate cortex (IV layer) of occipital lobe\" — \"9 pathways form cortex to thalamus (filtering data)\""
      },
      {
        "ref": "hss.mooc2",
        "location": "p4 \"Anterior cerebral artery\" — \"frontal and parietal lobes\" — \"Middle cerebral artery\" — \"lateral surfaces of the cerebral hemispheres\" — \"ascend within the transverse foramina\" — \"enter the cranium\" — \"at the foramen magnum\" — \"2 vertebral arteries fuse to form basilar artery\""
      },
      {
        "ref": "hss.mooc2",
        "location": "p5 \"encircles the infundibulum of the pituitary gland\" — \"reduces probability of interruption of circulation\" — \"Left middle cerebral artery\" — \"Aphasia, right body side sensory and motor paralysis\" — \"Right middle cerebral artery\" — \"Lower brain stem\" — \"Commonly fatal\""
      },
      {
        "ref": "hss.2.3",
        "location": "p7 \"Precentral gyrus (primary motor)\" — \"it controls the muscles & joints movements of the contralateral side\"; p9 \"Decussation\" — \"of pyramids\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p13 \"occlusion (blockage) in his left middle cerebral\" — \"He cannot move the right side of his body\" — \"the primary motor cortex\" — \"located immediately anterior to the central\" — \"descending tracts decussate at the pyramids of the medulla\" — \"difficulty in vocalization suggesting that the Broca\" — \"frontal lobe also has damage.\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p15 \"Two vertebral arteries united to form the basilar artery which ascends along the\" — \"supplies the posterior part of the\" — \"cerebral arterial circle.\""
      }
    ]
  },
  {
    "id": "hss2011-cvs-internal-chambers-valves",
    "subject": "HSS2011",
    "unit": "hss.m1",
    "type": "definition",
    "title": "Heart chambers internal anatomy, fibrous skeleton and valve mechanics",
    "tags": [
      "thorax",
      "cardiovascular",
      "heart",
      "valves",
      "high-yield"
    ],
    "practice": [
      {
        "type": "cloze",
        "prompt": "The tendon-like fibrous cords connecting papillary muscles to atrioventricular valve cusps are the ______ ______.",
        "accept": [
          "chordae tendineae",
          "chordae tendinae"
        ],
        "explanation": "Chordae tendineae anchor the AV valve leaflets to papillary muscles, preventing eversion into the atria during ventricular systole.",
        "src": {
          "ref": "hss.1.1",
          "location": "p14 \"Chordae tendineae\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Why is the myocardium of the left ventricle approximately three times thicker than that of the right ventricle?",
        "options": [
          "It pumps a significantly greater stroke volume of blood with each contraction",
          "It must generate high pressure to pump blood against high systemic vascular resistance",
          "It receives higher oxygen content from the coronary circulation",
          "It contains the intrinsic sinoatrial pacemaker nodal cells"
        ],
        "answer": 1,
        "explanation": "Both ventricles pump the exact same volume of blood per beat (equal stroke volume), but the left ventricle pumps into the high-resistance systemic circuit (~120 mmHg) versus the low-resistance pulmonary circuit (~25 mmHg).",
        "src": {
          "ref": "hss.1.1",
          "location": "p14 \"The Sectional Anatomy of the Heart\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The ______ valve consists of three cusps and closes when the right ventricle contracts, preventing backflow into the right atrium.",
        "accept": [
          "right av",
          "tricuspid",
          "right atrioventricular",
          "right av/ tricuspid"
        ],
        "explanation": "The examinable name is the right atrioventricular valve — “tricuspid” is the same valve’s everyday name.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p74 \"Right AV/ tricuspid\""
        }
      },
      {
        "type": "mcq",
        "prompt": "The shallow oval depression located on the interatrial septum that represents the remnant of the fetal interatrial shunt is the:",
        "options": [
          "Crista terminalis",
          "Conus arteriosus",
          "Fossa ovalis",
          "Coronary sinus"
        ],
        "answer": 2,
        "explanation": "The fossa ovalis is the depression in the interatrial septum marking the closure of the embryonic foramen ovale.",
        "src": {
          "ref": "hss.1.1",
          "location": "p14 \"Fossa ovalis\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which of the following describes the functional state of the cardiac valves while the ventricles are contracting during ventricular systole?",
        "options": [
          "AV valves and semilunar valves are both open",
          "AV valves are open and semilunar valves are closed",
          "AV valves are closed and semilunar valves are open",
          "AV valves and semilunar valves are both closed throughout ejection"
        ],
        "answer": 2,
        "explanation": "When ventricles contract, high intraventricular pressure forces AV valves closed (preventing backflow into atria) and forces semilunar valves open (ejecting blood into aorta and pulmonary trunk).",
        "src": {
          "ref": "hss.1.1",
          "location": "p15 \"b When the ventricles are contracting, the AV valves are\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The muscular partition separating the right and left ventricles of the heart is called the ______ ______.",
        "accept": [
          "interventricular septum"
        ],
        "explanation": "The interventricular septum is the muscular and membranous partition between the two ventricles.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p22 \"The muscular partition that separates the two ventricles\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "Following an acute myocardial infarction, a patient experiences sudden rupture of the anterior papillary muscle in the left ventricle. Explain what happens to the mitral valve during ventricular systole and the immediate clinical consequence.",
        "model": "Rupture of the anterior papillary muscle releases tension on the chordae tendineae attached to the mitral (bicuspid) valve. During ventricular systole, high left ventricular pressure blows the unanchored mitral cusp backward into the left atrium (acute mitral valve prolapse/incompetence). Massive systolic regurgitation of blood into the left atrium produces acute pulmonary venous congestion and flash pulmonary edema.",
        "rubric": [
          "Identifies loss of chordae tendineae tension anchoring the mitral (bicuspid) valve cusp",
          "Explains the valve leaflet prolapses / everts into the left atrium during ventricular systole",
          "States the consequence: acute mitral regurgitation and pulmonary edema / congestive failure"
        ]
      }
    ],
    "commonMistakes": [
      "Believing the left ventricle pumps more volume than the right ventricle (stroke volume is equal; pressure is what differs).",
      "Thinking semilunar valves have chordae tendineae (only atrioventricular valves possess chordae tendineae and papillary muscles).",
      "Confusing pectinate muscles (in atria and auricles) with trabeculae carneae (in ventricles)."
    ],
    "sourceRefs": [
      {
        "ref": "hss.1.1",
        "location": "p14 \"The Sectional Anatomy of the Heart\""
      },
      {
        "ref": "hss.1.1",
        "location": "p14 \"Fossa ovalis\""
      },
      {
        "ref": "hss.1.1",
        "location": "p14 \"Pectinatemuscles\""
      },
      {
        "ref": "hss.1.1",
        "location": "p14 \"Moderator band\""
      },
      {
        "ref": "hss.1.1",
        "location": "p14 \"Chordae tendineae\""
      },
      {
        "ref": "hss.1.1",
        "location": "p14 \"Papillary muscles\""
      },
      {
        "ref": "hss.1.1",
        "location": "p15 \"When the ventricles are relaxed, the AV valves are open and\""
      },
      {
        "ref": "hss.1.1",
        "location": "p15 \"b When the ventricles are contracting, the AV valves are\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p22 \"The muscular partition that separates the two ventricles\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p74 \"Right AV/ tricuspid\""
      }
    ]
  },
  {
    "id": "hss2011-cvs-coronary-circulation-conduction",
    "subject": "HSS2011",
    "unit": "hss.m1",
    "type": "definition",
    "title": "Coronary circulation and cardiac conduction system pathways",
    "tags": [
      "thorax",
      "cardiovascular",
      "coronary",
      "conduction",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "Which coronary artery branch runs in the anterior interventricular sulcus and supplies the anterior ventricular walls and interventricular septum?",
        "options": [
          "Circumflex artery",
          "Right marginal artery",
          "Anterior interventricular artery (LAD)",
          "Posterior interventricular artery (PDA)"
        ],
        "answer": 2,
        "explanation": "The anterior interventricular artery (LAD), a branch of the left coronary artery, courses in the anterior interventricular sulcus to supply the anterior ventricles and anterior 2/3 of the septum.",
        "src": {
          "ref": "hss.1.1",
          "location": "p11 \"Anterior interventricular artery\""
        }
      },
      {
        "type": "cloze",
        "prompt": "Venous blood from the myocardium collects in cardiac veins and empties into the right atrium via the ______ ______ on the posterior surface of the heart.",
        "accept": [
          "coronary sinus"
        ],
        "explanation": "The coronary sinus is the wide venous channel in the posterior coronary sulcus receiving great, middle, and small cardiac veins.",
        "src": {
          "ref": "hss.1.1",
          "location": "p11 \"Coronary circulation An extensive network of coronary blood vessels\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Why is the ~100 ms conduction delay introduced at the atrioventricular (AV) node functionally essential for effective cardiac pumping?",
        "options": [
          "It allows the aortic valve to close completely before ventricular contraction begins",
          "It allows the atria to complete their contraction and empty blood into ventricles before ventricular systole begins",
          "It permits coronary arterial filling during ventricular systole",
          "It prevents spontaneous action potentials from firing in the sinoatrial node"
        ],
        "answer": 1,
        "explanation": "The AV nodal delay ensures that atrial systole is completed, maximizing end-diastolic ventricular volume before the powerful ventricles contract.",
        "src": {
          "ref": "hss.1.2",
          "location": "p5 \"Coronary circulation An extensive network of coronary blood vessels\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The groove structure marking the boundary between the left and right ventricles on the anterior surface of the heart is the ______ ______ sulcus.",
        "accept": [
          "anterior interventricular",
          "anterior interventricular sulcus"
        ],
        "explanation": "The anterior interventricular sulcus marks the ventricular boundary on the sternocostal surface and lodges the LAD and great cardiac vein.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p74 \"Anterior interventricular sulcus\""
        }
      },
      {
        "type": "mcq",
        "prompt": "During which phase of the cardiac cycle does the majority of coronary blood flow through the myocardium occur?",
        "options": [
          "Ventricular systole (ejection phase)",
          "Ventricular diastole (relaxation phase)",
          "Atrial systole exclusively",
          "Isovolumetric ventricular contraction"
        ],
        "answer": 1,
        "explanation": "Myocardial contraction during systole compresses intramural coronary vessels; relaxation during diastole relieves compression and allows aortic elastic recoil to perfuse the coronary tree.",
        "src": {
          "ref": "hss.1.1",
          "location": "p11 \"Aortic sinuses\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A patient with an inferior wall myocardial infarction develops marked bradycardia (heart rate 35 bpm) due to complete atrioventricular block. Which coronary artery is most likely occluded, and which anatomical structures are ischemic?",
        "model": "The Right Coronary Artery (RCA) is most likely occluded. In the majority of individuals (~80%), the RCA gives off the AV nodal branch supplying the atrioventricular node and bundle of His, as well as the posterior interventricular artery (PDA) supplying the inferior/diaphragmatic wall of the left ventricle. Acute RCA thrombosis produces ischemia of the AV node, resulting in failure of impulse transmission from atria to ventricles (complete AV block).",
        "rubric": [
          "Identifies the Right Coronary Artery (RCA) as the occluded vessel",
          "Notes the RCA supplies the AV node (in ~80% of individuals) and inferior ventricular wall via PDA",
          "Explains ischemia of the AV node causes failure of electrical conduction to ventricles (AV block)"
        ]
      }
    ],
    "commonMistakes": [
      "Assuming coronary blood flow is highest during ventricular systole when arterial blood pressure is highest (coronary vessels are compressed during systole; flow occurs primarily in diastole).",
      "Thinking the coronary sinus drains into the left atrium (it drains deoxygenated myocardial blood into the right atrium).",
      "Confusing the origin of the coronary arteries (they arise from the aortic sinuses of the ascending aorta, NOT from the aortic arch or carotid arteries)."
    ],
    "sourceRefs": [
      {
        "ref": "hss.1.1",
        "location": "p11 \"Coronary circulation An extensive network of coronary blood vessels\""
      },
      {
        "ref": "hss.1.1",
        "location": "p11 \"Aortic sinuses\""
      },
      {
        "ref": "hss.1.1",
        "location": "p11 \"Anterior interventricular artery\""
      },
      {
        "ref": "hss.1.1",
        "location": "p11 \"Circumflex artery\""
      },
      {
        "ref": "hss.1.1",
        "location": "p11 \"Great cardiac vein\""
      },
      {
        "ref": "hss.1.1",
        "location": "p11 \"Middle cardiac vein\""
      },
      {
        "ref": "hss.1.2",
        "location": "p5 \"Coronary circulation An extensive network of coronary blood vessels\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p74 \"Anterior interventricular sulcus\""
      }
    ]
  },
  {
    "id": "hss2011-cvs-blood-vessel-circuits",
    "subject": "HSS2011",
    "unit": "hss.m1",
    "type": "concept",
    "title": "Blood vessel histology, arterial classes, capillary beds and venous return",
    "tags": [
      "thorax",
      "cardiovascular",
      "blood-vessels",
      "histology",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "Which type of artery contains the most resilient vessel wall, capable of expanding during ventricular systole and recoiling during diastole?",
        "options": [
          "Arteriole",
          "Muscular artery",
          "Elastic artery",
          "Capillary"
        ],
        "answer": 2,
        "explanation": "Model answer C. Elastic arteries (such as the aorta and pulmonary trunk) have the most resilient vessel walls due to abundant concentric elastic lamellae in their tunica media.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p22 \"Which type of artery contains the most resilient vessel wall\""
        }
      },
      {
        "type": "mcq",
        "prompt": "What is the primary histological component of the tunica media in blood vessels?",
        "options": [
          "Simple squamous endothelium and areolar tissue",
          "Concentric sheets of smooth muscle cells and elastic fibres",
          "Dense irregular collagen connective tissue and vasa vasorum",
          "Stratified cuboidal epithelial cells with microvilli"
        ],
        "answer": 1,
        "explanation": "The tunica media is composed predominantly of circular smooth muscle cells and elastic connective tissue sheets, controlling vessel calibre via vasoconstriction and vasodilation.",
        "src": {
          "ref": "hss.1.1",
          "location": "p17 \"Tunica media\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which category of capillary features wide intercellular gaps, an incomplete basal lamina, and allows whole plasma proteins and cellular elements to pass into circulation?",
        "options": [
          "Continuous capillaries",
          "Fenestrated capillaries",
          "Sinusoids (discontinuous capillaries)",
          "Anastomotic capillaries"
        ],
        "answer": 2,
        "explanation": "Sinusoids (found in the liver, spleen, and red bone marrow) have large fenestrations, incomplete basal laminae, and wide intercellular gaps to permit cellular and protein exchange.",
        "src": {
          "ref": "hss.1.1",
          "location": "p17 \"Types of Blood Vessels & their\""
        }
      },
      {
        "type": "cloze",
        "prompt": "Microscopic blood vessels that supply oxygen and nutrients to the outer tunics of large arteries and veins are known as the ______ ______.",
        "accept": [
          "vasa vasorum"
        ],
        "explanation": "The vasa vasorum (\"vessels of the vessels\") are tiny vascular networks embedded within the tunica externa of large vessels.",
        "src": {
          "ref": "hss.1.1",
          "location": "p16 \"Anatomy of the blood vessels\""
        }
      },
      {
        "type": "cloze",
        "prompt": "One-way venous valves that prevent the backward flow of blood in the limbs are formed by folds of the tunica ______.",
        "accept": [
          "intima",
          "tunica intima"
        ],
        "explanation": "Venous valves are flap-like bicuspid folds of the tunica intima projecting into the lumen, directed toward the heart.",
        "src": {
          "ref": "hss.1.1",
          "location": "p17 \"Tunica externa\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "An elderly patient with chronic hypertension exhibits loss of arterial wall elasticity (arteriosclerosis) in the thoracic aorta. How does the loss of elastic tissue in this elastic artery affect systolic and diastolic blood pressures?",
        "model": "The aorta is an elastic conducting artery whose elastic lamellae normally stretch during systole to buffer pressure peaks and recoil during diastole to sustain perfusion pressure. Loss of arterial wall compliance prevents systolic expansion, driving systolic blood pressure higher; simultaneously, the loss of elastic recoil causes a precipitous drop in diastolic blood pressure, producing a wide pulse pressure (isolated systolic hypertension).",
        "rubric": [
          "Identifies the aorta as an elastic artery with elastic lamellae in the tunica media",
          "Explains failure to expand during systole causes elevated peak systolic pressure",
          "Explains failure of elastic recoil during diastole causes decreased diastolic pressure / wide pulse pressure"
        ]
      }
    ],
    "commonMistakes": [
      "Believing capillaries contain a thin layer of smooth muscle (capillaries consist exclusively of simple squamous endothelium and basal lamina).",
      "Confusing elastic arteries (conducting vessels buffering pressure) with muscular arteries (distributing vessels regulating regional flow).",
      "Thinking veins carry less blood volume than arteries (systemic veins contain 60–70% of blood volume as capacitance reservoirs)."
    ],
    "sourceRefs": [
      {
        "ref": "hss.1.1",
        "location": "p16 \"Anatomy of the blood vessels\""
      },
      {
        "ref": "hss.1.1",
        "location": "p17 \"Types of Blood Vessels & their\""
      },
      {
        "ref": "hss.1.1",
        "location": "p17 \"Tunica media\""
      },
      {
        "ref": "hss.1.1",
        "location": "p17 \"Tunica externa\""
      },
      {
        "ref": "hss.1.1",
        "location": "p17 \"Internal elastic membrane\""
      },
      {
        "ref": "hss.1.1",
        "location": "p18 \"A Schematic Overview of the\""
      },
      {
        "ref": "hss.1.1",
        "location": "p19 \"An Overview of the\""
      },
      {
        "ref": "hss.1.2",
        "location": "p3 \"PULMONARY CIRCUIT SYSTEMIC CIRCUIT\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p22 \"Which type of artery contains the most resilient vessel wall\""
      }
    ]
  },
  {
    "id": "hss2011-cvs-lymphatic-system",
    "subject": "HSS2011",
    "unit": "hss.m1",
    "type": "concept",
    "title": "Lymphatic system anatomy, major ducts, drainage patterns and lymph node histology",
    "tags": [
      "thorax",
      "cardiovascular",
      "lymphatics",
      "histology",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "Lymph from which of the following anatomical structures does NOT drain into the left lymphatic duct (thoracic duct)?",
        "options": [
          "Liver",
          "Right eye",
          "Left hand",
          "Right foot"
        ],
        "answer": 1,
        "explanation": "Model answer B. The right eye (and right head/neck, right upper limb, right thorax) drains into the right lymphatic duct. The thoracic duct drains both lower limbs (including right foot), abdomen (including liver), and the left upper body.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p24 \"Lymph from which of the following organ does NOT drain into the left lymphatic duct\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The expanded, sac-like dilated chamber located at the base of the thoracic duct that receives lymph from the lumbar and intestinal trunks is the ______ ______.",
        "accept": [
          "cisterna chyli"
        ],
        "explanation": "Model answer: Cisterna chyli. It sits anterior to the bodies of L1–L2 and forms the origin of the thoracic duct.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p74 \"Cisterna chyli\""
        }
      },
      {
        "type": "mcq",
        "prompt": "MALT (Mucosa-Associated Lymphoid Tissue) describes clusters of lymphoid nodules located in which tissue layer of visceral organs?",
        "options": [
          "Mucosa (lamina propria)",
          "Submucosa",
          "Muscularis externa",
          "Serosa / adventitia"
        ],
        "answer": 0,
        "explanation": "Model answer A. MALT is situated within the lamina propria of the mucosa lining the digestive, respiratory, urinary, and reproductive systems.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p22 \"MALT describes the clusters of lymphoid nodules located at the following tissue layer\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which of the following pairings correctly categorizes the primary lymphoid organs where lymphocytes are generated and mature?",
        "options": [
          "Spleen and lymph nodes",
          "Red bone marrow and thymus",
          "Tonsils and Peyer patches",
          "Cisterna chyli and thoracic duct"
        ],
        "answer": 1,
        "explanation": "Primary lymphoid organs are the sites of lymphocyte formation and immunocompetence: red bone marrow (B cells) and thymus (T cells).",
        "src": {
          "ref": "hss.1.1",
          "location": "p27 \"Red bone marrow + thymus\""
        }
      },
      {
        "type": "cloze",
        "prompt": "Unfiltered lymph enters the convex surface of a lymph node through multiple ______ lymphatic vessels, while filtered lymph exits the indented hilum through ______ lymphatic vessels.",
        "accept": [
          "afferent, efferent",
          "afferent and efferent",
          "afferent; efferent"
        ],
        "explanation": "Afferent vessels enter the convex periphery; efferent vessels leave from the hilum.",
        "src": {
          "ref": "hss.1.1",
          "location": "p30 \"The Structure of a Lymph Node\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A patient undergoes a right axillary lymph node dissection for breast carcinoma. A junior doctor expresses concern that lymphatic fluid from the patient's right lower extremity might become obstructed. Based on lymphatic drainage pathways, evaluate this concern.",
        "model": "The concern is anatomically unfounded. The entire lower body below the diaphragm (including the right lower extremity, pelvis, and abdomen) drains into the lumbar trunks and cisterna chyli, ascending via the thoracic duct into the left venous angle (left subclavian/internal jugular junction). Right axillary lymph nodes drain only the right upper limb, right thoracic wall, and upper abdominal wall; removing right axillary nodes poses zero risk of lower extremity lymphedema.",
        "rubric": [
          "Identifies that the lower body below the diaphragm drains into the cisterna chyli and thoracic duct",
          "Notes the thoracic duct empties on the left side (left venous angle), draining both lower limbs",
          "Explains right axillary nodes drain only the right upper extremity and right chest wall"
        ]
      }
    ],
    "commonMistakes": [
      "Thinking the right lymphatic duct drains the entire right side of the body (it drains ONLY the right upper quadrant; both lower limbs drain into the thoracic duct via the cisterna chyli).",
      "Classifying the spleen or lymph nodes as primary lymphoid organs (they are secondary lymphoid organs; primary organs are red bone marrow and thymus).",
      "Confusing afferent vessels (many, enter convex side) with efferent vessels (few, exit concave hilum)."
    ],
    "sourceRefs": [
      {
        "ref": "hss.1.1",
        "location": "p26 \"Anatomy of the lymphatic system\""
      },
      {
        "ref": "hss.1.1",
        "location": "p27 \"Primary lymphoid tissues and organs\""
      },
      {
        "ref": "hss.1.1",
        "location": "p27 \"Red bone marrow + thymus\""
      },
      {
        "ref": "hss.1.1",
        "location": "p28 \"Lymphatic Capillaries\""
      },
      {
        "ref": "hss.1.1",
        "location": "p28 \"thoracic duct & right lymphatic duct\""
      },
      {
        "ref": "hss.1.1",
        "location": "p29 \"The Relationship between the Lymphatic Ducts and the Venous System\""
      },
      {
        "ref": "hss.1.1",
        "location": "p30 \"The Structure of a Lymph Node\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p22 \"MALT describes the clusters of lymphoid nodules located at the following tissue layer\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p22 \"is an expanded, saclike chamber located at the base of the thoracic duct\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p24 \"Lymph from which of the following organ does NOT drain into the left lymphatic duct\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p74 \"Cisterna chyli\""
      }
    ]
  },
  {
    "id": "hss2011-cvs-tutorial-pastpaper-practice",
    "subject": "HSS2011",
    "unit": "hss.m1",
    "type": "cloze",
    "title": "Cardiovascular anatomy tutorial & past paper practice",
    "tags": [
      "thorax",
      "cardiovascular",
      "assessment",
      "tutorial",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "Which of the following structure does NOT form part of the heart wall?",
        "options": [
          "Epicardium",
          "Pericardium",
          "Myocardium",
          "Endocardium"
        ],
        "answer": 1,
        "explanation": "Model answer B. The heart wall proper has three layers — epicardium, myocardium, endocardium — while the pericardium is a separate fibroserous sac wrapped around the whole organ.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p22 \"Which of the following structure does not form part of the heart wall\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which of the following statements concerning heart valves is correct?",
        "options": [
          "The human heart has two AV valves and two aortic valves",
          "The human heart has two tricuspid valves and two semilunar valves",
          "Aortic valve and left AV valve are both semilunar valves",
          "AV valves separate the atria from ventricles"
        ],
        "answer": 3,
        "explanation": "Model answer D. The heart has two AV valves (tricuspid and bicuspid) that separate atria from ventricles, and two semilunar valves (pulmonary and aortic).",
        "src": {
          "ref": "hss.manual1920",
          "location": "p22 \"Which of the following statements is correct\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The groove structure that marks the boundary between the left and right ventricles at the anterior side of the heart is known as the ______ ______ sulcus.",
        "accept": [
          "anterior interventricular",
          "anterior interventricular sulcus"
        ],
        "explanation": "Model answer: Anterior interventricular sulcus.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p74 \"Anterior interventricular sulcus\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The muscular partition that separates the two ventricles of the heart is called the ______ ______.",
        "accept": [
          "interventricular septum"
        ],
        "explanation": "Model answer: Interventricular septum.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p74 \"Interventricular septum\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The ______ valve consists of three cusps, which is closed when the right ventricle contracts in order to prevent the backflow of blood into the right atrium.",
        "accept": [
          "right av",
          "tricuspid",
          "right atrioventricular",
          "right av/ tricuspid"
        ],
        "explanation": "Model answer: Right AV / tricuspid valve.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p74 \"Right AV/ tricuspid\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The region of the chest that is situated in-between the two pleural cavities is called the ______.",
        "accept": [
          "mediastinum"
        ],
        "explanation": "Model answer: Mediastinum.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p74 \"Mediastinum\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "On a gross anatomy practical exam, a student is asked to identify the anterior interventricular sulcus, the tricuspid valve, and the cisterna chyli on three separate prosections. Detail the specific anatomical landmarks used to confirm each structure.",
        "model": "1. Anterior interventricular sulcus: identified on the anterior sternocostal surface of the heart as the fat-filled groove separating right and left ventricles, containing the anterior interventricular artery (LAD) and great cardiac vein. 2. Tricuspid valve: confirmed by inspecting the right atrioventricular orifice from inside the opened right ventricle, observing three distinct triangular cusps tethered to chordae tendineae and papillary muscles. 3. Cisterna chyli: located in the retroperitoneum anterior to bodies of L1–L2 as an expanded, sac-like lymphatic chamber situated between the right crus of the diaphragm and the abdominal aorta, giving rise superiorly to the thoracic duct.",
        "rubric": [
          "Identifies anterior interventricular sulcus on anterior heart surface containing LAD and great cardiac vein",
          "Confirms tricuspid valve between right atrium and ventricle with 3 cusps anchored by chordae tendineae",
          "Locates cisterna chyli at L1–L2 retroperitoneum as dilated chamber at origin of thoracic duct"
        ]
      }
    ],
    "commonMistakes": [
      "Confusing the anterior interventricular sulcus (surface landmark) with the interventricular septum (internal muscle wall).",
      "Calling the left AV valve semilunar (it is bicuspid / mitral; only aortic and pulmonary are semilunar).",
      "Writing that the pericardium is part of the heart wall (it is the surrounding fibroserous sac)."
    ],
    "sourceRefs": [
      {
        "ref": "hss.manual1920",
        "location": "p22 \"Revision Exercises\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p22 \"Which of the following structure does not form part of the heart wall\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p22 \"Which of the following statements is correct\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p22 \"Which type of artery contains the most resilient vessel wall\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p74 \"Anterior interventricular sulcus\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p74 \"Interventricular septum\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p74 \"Right AV/ tricuspid\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p74 \"Mediastinum\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p74 \"Cisterna chyli\""
      },
      {
        "ref": "hss.revans",
        "location": "p1 \"Module 1.2\""
      },
      {
        "ref": "hss.revans",
        "location": "p2 \"Fill-in-blanks\""
      }
    ]
  },
  {
    "id": "hss2011-resp-upper-tract-larynx",
    "subject": "HSS2011",
    "unit": "hss.m1",
    "type": "definition",
    "title": "Upper respiratory tract, paranasal sinuses, pharynx and the laryngeal cartilages",
    "tags": [
      "thorax",
      "respiratory",
      "upper-airway",
      "larynx",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "Which laryngeal cartilage is made of elastic cartilage and forms a lid over the glottis?",
        "options": [
          "Thyroid cartilage",
          "Cricoid cartilage",
          "Epiglottis",
          "Arytenoid cartilage"
        ],
        "answer": 2,
        "explanation": "The epiglottis is composed of elastic cartilage and projects superior to the glottis, forming a lid that closes the airway during swallowing.",
        "src": {
          "ref": "hss.resp",
          "location": "p16 \"Composed of elastic\""
        }
      },
      {
        "type": "mcq",
        "prompt": "The largest laryngeal cartilage, shield-shaped and forming the laryngeal prominence, is the:",
        "options": [
          "Cricoid cartilage",
          "Thyroid cartilage",
          "Corniculate cartilage",
          "Epiglottis"
        ],
        "answer": 1,
        "explanation": "The thyroid cartilage is the largest laryngeal cartilage, shield-shaped, made of hyaline cartilage, and its anterior surface forms the laryngeal prominence (Adam’s apple).",
        "src": {
          "ref": "hss.resp",
          "location": "p16 \"The largest laryngeal cartilage\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The three components of the nasal septum are the perpendicular plate of the ethmoid, the ______, and the hyaline septal cartilage.",
        "accept": [
          "vomer"
        ],
        "explanation": "The vomer forms the inferior part of the bony nasal septum.",
        "src": {
          "ref": "hss.resp",
          "location": "p10 \"vomer (inferior), and hyaline (septal)\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which epithelium lines the nasopharynx?",
        "options": [
          "Stratified squamous epithelium",
          "Pseudostratified ciliated columnar epithelium",
          "Simple cuboidal epithelium",
          "Transitional epithelium"
        ],
        "answer": 1,
        "explanation": "The nasopharynx conveys only air, so it keeps the respiratory lining — pseudostratified ciliated columnar epithelium; the oropharynx and laryngopharynx switch to stratified squamous.",
        "src": {
          "ref": "hss.resp",
          "location": "p14 \"Pseudostratified ciliated columnar epithelium\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The larynx begins at vertebral level C4 or C5 and ends at level ______.",
        "accept": [
          "C6",
          "c6"
        ],
        "explanation": "The larynx ends at C6, where it is continuous with the trachea.",
        "src": {
          "ref": "hss.resp",
          "location": "p15 \"and ends\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The ligament binding the thyroid cartilage to the hyoid bone is the ______ ligament.",
        "accept": [
          "thyrohyoid"
        ],
        "explanation": "The thyrohyoid ligament binds the thyroid cartilage to the hyoid bone; the cricothyroid and cricotracheal ligaments bind the other framework elements.",
        "src": {
          "ref": "hss.resp",
          "location": "p17 \"Thyrohyoid ligament\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A 3-year-old child aspirates a small plastic bead while eating and develops sudden stridor. The emergency team cannot intubate and cannot ventilate. Explain the anatomy of the cricothyroid membrane, why it is chosen for emergency airway access, and which cartilage lies immediately below the incision.",
        "model": "The cricothyroid ligament (membrane) spans the midline gap between the inferior border of the thyroid cartilage and the superior border of the arch of the cricoid cartilage. It lies immediately subcutaneously with only skin, fascia and a thin muscle layer over it, is relatively avascular in the midline, and is easily palpated in the notch below the laryngeal prominence, so it can be opened rapidly without deep dissection or risk to the thyroid gland isthmus and anterior jugular veins. Immediately inferior to the incision is the cricoid cartilage — the only complete cartilaginous ring in the airway — which keeps the lumen patent.",
        "rubric": [
          "Locates the cricothyroid membrane between the thyroid and cricoid cartilages in the anterior midline",
          "Explains it is subcutaneous, midline-avascular and easily palpable, allowing rapid access",
          "Identifies the cricoid cartilage as the complete ring lying just below the incision"
        ]
      }
    ],
    "commonMistakes": [
      "Calling the cricoid cartilage C-shaped like the tracheal rings — the cricoid is a complete ring, widest posteriorly.",
      "Saying the epiglottis is hyaline cartilage — it is elastic cartilage; the thyroid and cricoid are hyaline.",
      "Assuming the whole pharynx is stratified squamous — the nasopharynx keeps the respiratory pseudostratified ciliated columnar lining."
    ],
    "sourceRefs": [
      {
        "ref": "hss.resp",
        "location": "p10 \"Bridge of the nose supported by the maxillae and nasal bone\""
      },
      {
        "ref": "hss.resp",
        "location": "p11 \"Paranasal\""
      },
      {
        "ref": "hss.resp",
        "location": "p12 \"Nasal conchae (turbinates)\""
      },
      {
        "ref": "hss.resp",
        "location": "p14 \"Divided into three parts\""
      },
      {
        "ref": "hss.resp",
        "location": "p15 \"3 Large, Unpaired\""
      },
      {
        "ref": "hss.resp",
        "location": "p16 \"The largest laryngeal cartilage\""
      },
      {
        "ref": "hss.resp",
        "location": "p17 \"Cricothyroid ligament\""
      },
      {
        "ref": "hss.resp",
        "location": "p18 \"Made up of the vocal folds\""
      },
      {
        "ref": "hss.1.2",
        "location": "p27 \"Nasopharynx\""
      },
      {
        "ref": "hss.1.2",
        "location": "p28 \"3 Large, Unpaired Cartilage\""
      }
    ]
  },
  {
    "id": "hss2011-resp-pleura-lungs-gross",
    "subject": "HSS2011",
    "unit": "hss.m1",
    "type": "definition",
    "title": "Gross anatomy of the lungs, the hilum, the pleura and the dual blood supply",
    "tags": [
      "thorax",
      "respiratory",
      "lungs",
      "pleura",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "Which fissures separate the lobes of the right lung?",
        "options": [
          "A single oblique fissure only",
          "Horizontal and oblique fissures",
          "Two horizontal fissures",
          "A transverse and a coronal fissure"
        ],
        "answer": 1,
        "explanation": "The right lung has three lobes separated by a horizontal fissure and an oblique fissure; the left lung has only an oblique fissure.",
        "src": {
          "ref": "hss.resp",
          "location": "p28 \"separated by horizontal and oblique fissures\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The left lung is displaced by the heart, forming an impression in its medial margin called the ______.",
        "accept": [
          "cardiac notch"
        ],
        "explanation": "The cardiac notch is the impression in the anterior medial margin of the left lung; the lingula lies just below it.",
        "src": {
          "ref": "hss.fib5yr",
          "location": "p6 \"cardiac notch\""
        }
      },
      {
        "type": "mcq",
        "prompt": "The bronchial arteries that nourish the lung tissue and visceral pleura arise mainly from the:",
        "options": [
          "Pulmonary trunk",
          "Thoracic aorta",
          "Internal thoracic artery",
          "Coronary arteries"
        ],
        "answer": 1,
        "explanation": "The bronchial arteries are mainly branched from the thoracic aorta and supply the bronchial tree, lung connective tissue and visceral pleura.",
        "src": {
          "ref": "hss.resp",
          "location": "p30 \"The bronchial arteries, mainly branched from the thoracic aorta\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The membrane firmly adherent to the lung surface and dipping into the fissures is the ______ pleura.",
        "accept": [
          "visceral"
        ],
        "explanation": "Visceral pleura covers the lung and enters the fissures; parietal pleura lines the thoracic wall, diaphragm and mediastinum.",
        "src": {
          "ref": "hss.fib5yr",
          "location": "p6 \"parietal + visceral pleura\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which structure lies most posteriorly in the pulmonary hilum?",
        "options": [
          "Pulmonary artery",
          "Pulmonary veins",
          "Main bronchus",
          "Phrenic nerve"
        ],
        "answer": 2,
        "explanation": "In the hilum the main bronchus lies posteriorly, the pulmonary artery superiorly, and the pulmonary veins inferiorly and anteriorly.",
        "src": {
          "ref": "hss.resp",
          "location": "p27 \"Hilum\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A patient with left-sided heart failure develops a large left pleural effusion. Explain where the fluid accumulates within the pleural cavity, why the lower lung border and the pleural reflection do not coincide, and the anatomical rule for safe needle drainage.",
        "model": "Pleural fluid collects by gravity in the most dependent part of the pleural cavity, the costodiaphragmatic recess, the slit where costal pleura meets diaphragmatic pleura below the inferior border of the lung. The lung does not fill this recess even in full inspiration, so the pleural reflection extends about two ribs lower than the lung border (for example, lung at rib 6 but pleura at rib 8 in the mid-clavicular line). A drainage needle is therefore placed into the recess below the lung base but still within the pleural cavity, and it is passed immediately above a rib (over its upper border) to avoid the intercostal vein, artery and nerve running in the costal groove on the rib’s inferior border.",
        "rubric": [
          "Identifies the costodiaphragmatic recess as the dependent site of fluid collection",
          "Explains the pleural reflection lies about two ribs below the lung border, creating a safe target below the lung",
          "States the needle is inserted immediately above a rib to avoid the intercostal neurovascular bundle"
        ]
      }
    ],
    "commonMistakes": [
      "Giving the left lung three lobes — it has two; the middle-lobe equivalent tissue is the lingula.",
      "Thinking the pulmonary arteries nourish the lung tissue — they carry deoxygenated blood for gas exchange; the bronchial arteries feed the tissue.",
      "Placing the effusion needle below a rib — it goes above a rib to spare the neurovascular bundle in the costal groove."
    ],
    "sourceRefs": [
      {
        "ref": "hss.resp",
        "location": "p26 \"The apex of each lung extends beyond\""
      },
      {
        "ref": "hss.resp",
        "location": "p27 \"Hilum\""
      },
      {
        "ref": "hss.resp",
        "location": "p28 \"separated by horizontal and oblique fissures\""
      },
      {
        "ref": "hss.resp",
        "location": "p29 \"double membrane\""
      },
      {
        "ref": "hss.resp",
        "location": "p30 \"The bronchial arteries, mainly branched from the thoracic aorta\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p74 \"Superior; middle\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p74 \"Bronchial arteries\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p6 \"cardiac notch\""
      }
    ]
  },
  {
    "id": "hss2011-resp-tutorial-pastpaper-practice",
    "subject": "HSS2011",
    "unit": "hss.m1",
    "type": "practice",
    "title": "Respiratory system — past-paper and revision-exercise synthesis",
    "tags": [
      "thorax",
      "respiratory",
      "past-paper",
      "revision",
      "high-yield"
    ],
    "practice": [
      {
        "type": "cloze",
        "prompt": "Fill in the respiratory pathway after the nasal cavity: nostrils; pharynx; larynx; trachea; ______.",
        "accept": [
          "bronchial tree",
          "bronchi",
          "bronchial tree; alveoli"
        ],
        "explanation": "The Module 1.1 answer gives the pathway as nostrils; pharynx; larynx; trachea; bronchial tree.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p74 \"Nostrils; pharynx; larynx; trachea; bronchial tree\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The epithelium lining the conducting portion of the respiratory tract is ______ epithelium.",
        "accept": [
          "pseudostratified ciliated columnar",
          "pseudostratified ciliated columnar epithelium"
        ],
        "explanation": "The tested Module 1.1 answer is pseudostratified ciliated columnar epithelium.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p74 \"Pseudostratified ciliated columnar epithelium\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The two primary muscles of inspiration are the diaphragm and the ______ muscles.",
        "accept": [
          "external intercostal",
          "external intercostal muscles",
          "external intercostals"
        ],
        "explanation": "The Module 1.1 answer names the diaphragm and external intercostal muscles as the primary respiratory muscles.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p74 \"Diaphragm; external intercostal muscles\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The horizontal fissure of the right lung separates the ______ and middle lobes.",
        "accept": [
          "superior"
        ],
        "explanation": "The Module 1.1 answer is \"superior; middle\" — the horizontal fissure separates the superior and middle lobes of the right lung.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p74 \"Superior; middle\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The vessels that nourish the bronchial tree, lung connective tissue and visceral pleura are the ______ arteries.",
        "accept": [
          "bronchial"
        ],
        "explanation": "The Module 1.1 answer is \"bronchial arteries\" — they branch mainly from the thoracic aorta.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p74 \"Bronchial arteries\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which epithelium lines the nasal vestibule (just inside the nostril)?",
        "options": [
          "Pseudostratified ciliated columnar",
          "Stratified squamous",
          "Simple squamous",
          "Simple columnar"
        ],
        "answer": 1,
        "explanation": "The past-paper answer key lists the nasal vestibule as stratified squamous epithelium, unlike the rest of the conducting airway.",
        "src": {
          "ref": "hss.fib5yr",
          "location": "p6 \"nasal vestibule: Stratified squamous epithelium\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A past-paper stem describes a 60-year-old who inhaled a tooth fragment during a dental extraction while lying back; a follow-up film shows collapse of a lower-lobe segment. Work through the expected answer: which main bronchus received the fragment, which lung region is affected in a supine patient, and what lining that bronchus has.",
        "model": "The fragment entered the right main bronchus because it is larger in diameter, shorter and more vertical than the left. In a supine patient the most dependent segments are the superior segment of the right lower lobe and the posterior segment of the right upper lobe, so a lower-lobe collapse fits the superior segment of the right lower lobe. The bronchus is lined by pseudostratified ciliated columnar epithelium with goblet cells; the mucus escalator normally clears such material, but a solid fragment obstructs the lumen and air distal to it is absorbed, collapsing the segment.",
        "rubric": [
          "Names the right main bronchus and justifies it by larger diameter, shorter length and more vertical angle",
          "Identifies a dependent right-lower-lobe (superior) segment as the site in a supine patient",
          "States the bronchial lining is pseudostratified ciliated columnar epithelium and links obstruction to absorption collapse"
        ]
      }
    ],
    "commonMistakes": [
      "Writing \"simple ciliated columnar\" — the tested term is pseudostratified ciliated columnar epithelium.",
      "Saying the oblique fissure separates the superior and middle lobes — it is the horizontal fissure.",
      "Naming the pulmonary arteries as the lung’s nutritive supply — the tested answer is the bronchial arteries."
    ],
    "sourceRefs": [
      {
        "ref": "hss.manual1920",
        "location": "p74 \"Nostrils; pharynx; larynx; trachea; bronchial tree\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p74 \"Pseudostratified ciliated columnar epithelium\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p74 \"Diaphragm; external intercostal muscles\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p74 \"Superior; middle\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p74 \"Bronchial arteries\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p6 \"nasal vestibule: Stratified squamous epithelium\""
      }
    ]
  },
  {
    "id": "hss2011-resp-respiratory-epithelium-alveoli",
    "subject": "HSS2011",
    "unit": "hss.m1",
    "type": "concept",
    "title": "Respiratory epithelium, the mucus escalator, alveolar cells and the respiratory membrane",
    "tags": [
      "thorax",
      "respiratory",
      "histology",
      "alveoli",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "Which cells produce pulmonary surfactant?",
        "options": [
          "Type I pneumocytes",
          "Type II pneumocytes",
          "Alveolar macrophages",
          "Goblet cells"
        ],
        "answer": 1,
        "explanation": "Type II pneumocytes (type II alveolar cells) produce surfactant, an oily secretion that coats the alveolar surfaces and reduces surface tension.",
        "src": {
          "ref": "hss.resp",
          "location": "p24 \"Type II pneumocytes (type II alveolar cells) produce surfactant\""
        }
      },
      {
        "type": "mcq",
        "prompt": "The respiratory membrane consists of three layers. Which set is correct?",
        "options": [
          "Alveolar squamous epithelium, surfactant film, goblet cell layer",
          "Squamous epithelial cells of the alveolus, endothelial cells of an adjacent capillary, and the fused basement membranes between them",
          "Type II pneumocytes, smooth muscle, cartilage",
          "Cuboidal epithelium, elastic fibres, pleura"
        ],
        "answer": 1,
        "explanation": "The three layers are the alveolar squamous epithelium (type I cells), the capillary endothelium, and the fused basement membranes between the two.",
        "src": {
          "ref": "hss.resp",
          "location": "p25 \"Fused basement\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The lining of the smaller bronchioles is ______ epithelium with scattered cilia.",
        "accept": [
          "cuboidal"
        ],
        "explanation": "Smaller bronchioles are lined by cuboidal epithelium with scattered cilia; alveoli are simple squamous.",
        "src": {
          "ref": "hss.1.2",
          "location": "p36 \"Cuboidal epithelium with scattered cilia\""
        }
      },
      {
        "type": "cloze",
        "prompt": "Nasal filtration removes inhaled particles larger than about ______ micrometres before cilia clear the rest.",
        "accept": [
          "10",
          "ten"
        ],
        "explanation": "The scope deck states filtration in the nasal cavity removes large particles (over 10 micrometres); the mucus escalator then clears smaller trapped particles.",
        "src": {
          "ref": "hss.resp",
          "location": "p7 \"Filtration in nasal cavity\""
        }
      },
      {
        "type": "mcq",
        "prompt": "What is the fate of debris trapped by the mucus escalator?",
        "options": [
          "It is coughed out through the nose only",
          "Cilia sweep it toward the pharynx and it is swallowed and exposed to stomach acid and enzymes",
          "It is absorbed into the pulmonary capillaries",
          "It is stored permanently in the bronchial walls"
        ],
        "answer": 1,
        "explanation": "Cilia in the lower respiratory system sweep debris trapped in mucus toward the pharynx, where it is swallowed and exposed to the acids and enzymes of the stomach.",
        "src": {
          "ref": "hss.resp",
          "location": "p7 \"sweep debris trapped\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A long-term smoker presents with a chronic productive cough and recurrent chest infections. Using the histology of the airway lining, explain why cigarette smoke both increases mucus production and impairs its clearance, and predict the epithelial change seen on a bronchial biopsy.",
        "model": "The normal bronchial lining is pseudostratified ciliated columnar epithelium with goblet cells: goblet cells and mucous glands make mucus that traps particles, and the cilia form the mucus escalator that sweeps it toward the pharynx. Chronic smoke exposure causes goblet cell hyperplasia and mucous gland hypertrophy (more mucus) while paralysing and destroying cilia (less clearance), so mucus pools in the airway, is only cleared by forceful coughing, and stagnant mucus predisposes to infection. With sustained injury the epithelium undergoes squamous metaplasia — the ciliated columnar lining is replaced by stratified squamous epithelium that has no cilia and no goblet cells, worsening clearance further and being a step toward dysplasia.",
        "rubric": [
          "States the normal lining is pseudostratified ciliated columnar with goblet cells and describes the mucus escalator",
          "Explains smoke increases mucus (goblet/gland hyperplasia) while destroying cilia, so clearance fails and infection follows",
          "Predicts squamous metaplasia on biopsy — loss of cilia and goblet cells"
        ]
      }
    ],
    "commonMistakes": [
      "Saying alveoli are lined by cuboidal epithelium — alveoli are simple squamous; the small bronchioles are cuboidal.",
      "Reversing the pneumocytes — Type I is the thin gas-diffusion cell, Type II makes surfactant.",
      "Listing the respiratory membrane as two layers — there are three, including the fused basement membranes."
    ],
    "sourceRefs": [
      {
        "ref": "hss.resp",
        "location": "p6 \"The structure of the epithelium changes along the respiratory\""
      },
      {
        "ref": "hss.resp",
        "location": "p7 \"The mucus escalator as a defense mechanism\""
      },
      {
        "ref": "hss.resp",
        "location": "p23 \"Each terminal bronchiole delivers air\""
      },
      {
        "ref": "hss.resp",
        "location": "p24 \"Type II pneumocytes (type II alveolar cells) produce surfactant\""
      },
      {
        "ref": "hss.resp",
        "location": "p25 \"Three layers\""
      },
      {
        "ref": "hss.1.2",
        "location": "p36 \"Cuboidal epithelium with scattered cilia\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p74 \"Pseudostratified ciliated columnar epithelium\""
      }
    ]
  },
  {
    "id": "hss2011-resp-mechanics-muscles-breathing",
    "subject": "HSS2011",
    "unit": "hss.m1",
    "type": "concept",
    "title": "Mechanics of ventilation: the diaphragm, intercostals and accessory muscles",
    "tags": [
      "thorax",
      "respiratory",
      "ventilation",
      "diaphragm",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "Which nerve supplies the diaphragm, and from which spinal levels does it arise?",
        "options": [
          "Vagus nerve, from the medulla",
          "Phrenic nerve, from C3–C5",
          "Intercostal nerves, from T1–T11",
          "Long thoracic nerve, from C5–C7"
        ],
        "answer": 1,
        "explanation": "The diaphragm is innervated by the left and right phrenic nerves, which arise from spinal levels C3, C4 and C5.",
        "src": {
          "ref": "hss.1.3",
          "location": "p15 \"innervated by the\""
        }
      },
      {
        "type": "mcq",
        "prompt": "During quiet, restful breathing, expiration is:",
        "options": [
          "Active, driven by the internal intercostals and abdominal muscles",
          "Passive, produced by elastic recoil of the lungs and chest wall",
          "Active, driven by the diaphragm",
          "Impossible without accessory muscles"
        ],
        "answer": 1,
        "explanation": "Quiet expiration is passive: the inspiratory muscles relax and elastic recoil returns the thorax to its resting volume. Inhalation is always active; exhalation is active only when forced.",
        "src": {
          "ref": "hss.resp",
          "location": "p31 \"Inhalation is always active\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The primary respiratory muscles are the diaphragm and the ______ intercostal muscles.",
        "accept": [
          "external"
        ],
        "explanation": "The external intercostal muscles and the diaphragm are the primary respiratory muscles; the internal intercostals are accessory expiratory muscles.",
        "src": {
          "ref": "hss.resp",
          "location": "p31 \"External intercostal\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which muscle is an accessory muscle of forced inspiration?",
        "options": [
          "Rectus abdominis",
          "Internal intercostal muscle",
          "Sternocleidomastoid",
          "Transversus thoracis"
        ],
        "answer": 2,
        "explanation": "Sternocleidomastoid, scalenes, pectoralis minor and serratus anterior are accessory inspiratory muscles; internal intercostals, transversus thoracis and the abdominal muscles are accessory expiratory muscles.",
        "src": {
          "ref": "hss.resp",
          "location": "p31 \"Sternocleidomastoid\""
        }
      },
      {
        "type": "cloze",
        "prompt": "Gas moves in and out of the lungs according to ______ law: pressure is inversely proportional to volume.",
        "accept": [
          "Boyle's",
          "Boyle",
          "Boyles"
        ],
        "explanation": "Boyle’s law underlies pulmonary ventilation — increasing thoracic volume lowers intrapulmonary pressure and draws air in.",
        "src": {
          "ref": "hss.resp",
          "location": "p31 \"Inhalation is always active\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A patient sustains a traumatic spinal cord transection at the C6 level. Predict the effect on the diaphragm, on the intercostal muscles, and on the patient’s ability to cough, and explain the anatomical basis.",
        "model": "The phrenic nerve arises from C3, C4 and C5, all of which are above the C6 lesion, so the diaphragm is spared and the patient can breathe. The intercostal muscles are supplied by thoracic intercostal nerves (T1–T11), which are below the lesion, so the external and internal intercostals are paralysed; the abdominal wall muscles are also denervated. The patient therefore has diaphragmatic breathing but cannot expand the rib cage for a deep breath and cannot generate a forceful expiration, so coughing and airway clearance are severely impaired — a major cause of retained secretions and pneumonia in high spinal injury.",
        "rubric": [
          "States the phrenic nerve (C3–C5) is above the C6 lesion, so the diaphragm still works",
          "States the intercostal (T1–T11) and abdominal muscles are below the lesion and are paralysed",
          "Concludes cough and forced expiration are lost, risking retained secretions and pneumonia"
        ]
      }
    ],
    "commonMistakes": [
      "Calling quiet expiration active — at rest it is entirely passive elastic recoil.",
      "Putting the phrenic nerve roots at C5–C7 — they are C3, C4, C5.",
      "Listing the internal intercostals as inspiratory — they are accessory expiratory muscles; the external intercostals are inspiratory."
    ],
    "sourceRefs": [
      {
        "ref": "hss.resp",
        "location": "p31 \"The Respiratory Muscles\""
      },
      {
        "ref": "hss.resp",
        "location": "p31 \"Inhalation is always active\""
      },
      {
        "ref": "hss.resp",
        "location": "p31 \"External intercostal\""
      },
      {
        "ref": "hss.resp",
        "location": "p31 \"Sternocleidomastoid\""
      },
      {
        "ref": "hss.1.3",
        "location": "p15 \"innervated by the\""
      },
      {
        "ref": "hss.1.3",
        "location": "p15 \"central tendon\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p74 \"Diaphragm; external intercostal muscles\""
      }
    ]
  },
  {
    "id": "hss2011-thorax-intercostal-diaphragm",
    "subject": "HSS2011",
    "unit": "hss.m1",
    "type": "definition",
    "title": "Thoracic boundaries, the diaphragm and its three apertures",
    "tags": [
      "thorax",
      "diaphragm",
      "boundaries",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "Which structure is NOT part of the thoracic inlet? (choose the best single answer)",
        "options": [
          "Manubrium of the sternum",
          "First pair of ribs",
          "Clavicle",
          "Body of the first thoracic vertebra"
        ],
        "answer": 2,
        "explanation": "The thoracic inlet is bounded by the manubrium, the 1st ribs and the body of T1. The revision-exercise answer lists the clavicle, scapula and C7 as NOT part of it.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p24 \"Which of the following is NOT part of the thoracic inlet\""
        }
      },
      {
        "type": "mcq",
        "prompt": "The inferior vena cava passes through the diaphragm at which vertebral level?",
        "options": [
          "T8",
          "T10",
          "T12",
          "L1"
        ],
        "answer": 0,
        "explanation": "The caval opening lies in the central tendon at T8; the oesophageal hiatus is at T10 and the aortic hiatus at T12.",
        "src": {
          "ref": "hss.1.3",
          "location": "p15 \"central tendon\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The diaphragm is innervated by the left and right ______ nerves.",
        "accept": [
          "phrenic"
        ],
        "explanation": "The phrenic nerves (C3, C4, C5) provide the sole motor supply to the diaphragm.",
        "src": {
          "ref": "hss.1.3",
          "location": "p15 \"phrenic nerve\""
        }
      },
      {
        "type": "cloze",
        "prompt": "Venous blood from the diaphragm is carried by the phrenic veins, which drain into the ______.",
        "accept": [
          "IVC",
          "inferior vena cava"
        ],
        "explanation": "The phrenic veins drain into the inferior vena cava.",
        "src": {
          "ref": "hss.1.3",
          "location": "p16 \"Phrenic veins drain into the IVC\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The thoracic outlet is bounded anteriorly by the xiphoid process, laterally by the costal margin and the ______ ribs, and posteriorly by T12.",
        "accept": [
          "12th",
          "11th and 12th",
          "11th & 12th"
        ],
        "explanation": "The outlet is bounded by the xiphoid process, the curving costal margin, the 12th (and 11th) ribs and the body of T12.",
        "src": {
          "ref": "hss.1.3",
          "location": "p13 \"12th ribs\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A trauma CT shows the tip of a stab wound reaching the central tendon of the diaphragm at the T8 level, just to the right of the midline. Name the structure most at risk at that exact site, contrast the two other diaphragmatic apertures by level and content, and explain why the patient also complains of right shoulder pain.",
        "model": "At the T8 level in the central tendon is the caval opening, which transmits the inferior vena cava together with branches of the right phrenic nerve, so the IVC is the structure most at risk — injury here causes rapid, difficult-to-control venous haemorrhage. The other two apertures are the oesophageal hiatus at T10 (in the muscular right crus, transmitting the oesophagus and vagal trunks) and the aortic hiatus at T12 (behind the median arcuate ligament, transmitting the aorta, thoracic duct and azygos vein). The right shoulder pain is referred: the phrenic nerve carries sensation from the central diaphragm to spinal segments C3–C5, which also supply the skin over the shoulder tip, so diaphragmatic irritation is felt there.",
        "rubric": [
          "Identifies the caval opening (T8, central tendon) transmitting the IVC as the structure at risk",
          "Correctly places the oesophageal hiatus (T10, right crus) and aortic hiatus (T12, behind median arcuate ligament) with their contents",
          "Explains phrenic (C3–C5) referral of diaphragmatic pain to the shoulder tip"
        ]
      }
    ],
    "commonMistakes": [
      "Including the clavicle or scapula in the thoracic inlet — the boundary is manubrium, 1st ribs and T1 only.",
      "Swapping the aperture levels — IVC T8, oesophagus T10, aorta T12.",
      "Saying the aorta pierces the diaphragm muscle — it passes behind the median arcuate ligament, so its flow is not squeezed by contraction."
    ],
    "sourceRefs": [
      {
        "ref": "hss.1.3",
        "location": "p3 \"Anterior chest wall\""
      },
      {
        "ref": "hss.1.3",
        "location": "p12 \"1st thoracic vertebra\""
      },
      {
        "ref": "hss.1.3",
        "location": "p13 \"xiphoid process\""
      },
      {
        "ref": "hss.1.3",
        "location": "p13 \"bounded by the\""
      },
      {
        "ref": "hss.1.3",
        "location": "p15 \"central tendon\""
      },
      {
        "ref": "hss.1.3",
        "location": "p15 \"phrenic nerve\""
      },
      {
        "ref": "hss.1.3",
        "location": "p16 \"Phrenic veins drain into the IVC\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p24 \"Which of the following is NOT part of the thoracic inlet\""
      }
    ]
  },
  {
    "id": "hss2011-thorax-tutorial-pastpaper-practice",
    "subject": "HSS2011",
    "unit": "hss.m1",
    "type": "practice",
    "title": "Regional anatomy of the thorax — past-paper and revision-exercise synthesis",
    "tags": [
      "thorax",
      "past-paper",
      "revision",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "Which of the following is NOT part of the thoracic inlet?",
        "options": [
          "Manubrium of the sternum",
          "First pair of ribs",
          "Scapula",
          "Body of T1"
        ],
        "answer": 2,
        "explanation": "The inlet is the manubrium, the 1st ribs and the body of T1. The revision answer marks the clavicle, scapula and C7 as NOT part of it.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p24 \"Which of the following is NOT part of the thoracic inlet\""
        }
      },
      {
        "type": "mcq",
        "prompt": "The oesophagus descends along the ______ mediastinum.",
        "options": [
          "anterior and middle",
          "anterior and superior",
          "superior and middle",
          "superior and posterior"
        ],
        "answer": 3,
        "explanation": "The tested answer is superior and posterior — the oesophagus passes through the superior mediastinum then the posterior mediastinum.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p24 \"The oesophagus descends along the\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Lymph from which of the following does NOT drain into the left (thoracic) lymphatic duct?",
        "options": [
          "The left hand",
          "The right eye",
          "The left foot",
          "The right foot"
        ],
        "answer": 1,
        "explanation": "The right lymphatic duct drains the right side of the head and neck, the right upper limb and the right thorax, so lymph from the right eye does not reach the thoracic duct.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p24 \"Lymph from which of the following organ does NOT drain into the left lymphatic duct\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The azygos vein drains blood from the posterior thoracic wall into the superior vena cava at the level of ______.",
        "accept": [
          "T4",
          "t4"
        ],
        "explanation": "The past paper and revision answers state the azygos vein enters the superior vena cava at T4.",
        "src": {
          "ref": "hss.fib5yr",
          "location": "p2 \"azygos vein drains blood into the superior vena cava at the level of T4\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The ______ fissure separates the superior and middle lobes of the right lung.",
        "accept": [
          "horizontal"
        ],
        "explanation": "The 2017/18 paper asks for the fissure separating the superior and middle lobes of the right lung — the horizontal fissure.",
        "src": {
          "ref": "hss.pp1718",
          "location": "p2 \"separates the superior and middle lobes of the right lung\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The medial part of the breast is supplied by the ______ artery.",
        "accept": [
          "internal thoracic",
          "internal mammary"
        ],
        "explanation": "The Module 1.3 fill-in-blank answer is the internal thoracic artery.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p74 \"Internal thoracic artery\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "Work through this past-paper stem: \"At the level of the junction of the fourth and fifth thoracic vertebrae, the [ ] cartilage of the [ ] articulates with the sternum, and the [ ] aorta begins.\" Give the answers and explain what else lies in this plane.",
        "model": "At the T4/T5 junction (the plane of the sternal angle), the 2nd costal cartilage articulates with the sternum, and the descending (thoracic) aorta begins as the arch ends. The same transverse thoracic plane also passes through the bifurcation of the trachea at the carina, the beginning and end of the arch of the aorta, the point where the azygos vein arches over the right lung root to enter the superior vena cava, and the boundary between the superior and inferior mediastinum. This is why \"T4/T5\" and \"sternal angle\" recur throughout the thorax paper.",
        "rubric": [
          "Answers: 2nd costal cartilage; descending (thoracic) aorta begins",
          "Names the sternal angle / transverse thoracic plane as the T4/T5 landmark",
          "Lists other structures in the plane: carina, aortic arch ends, azygos into SVC, superior/inferior mediastinal boundary"
        ]
      }
    ],
    "commonMistakes": [
      "Including the clavicle in the thoracic inlet — it, the scapula and C7 are all excluded.",
      "Saying the right lymphatic duct drains the whole right side of the body — it drains only the right head/neck, right upper limb and right thorax; the right lower limb drains to the thoracic duct.",
      "Placing the azygos termination at T8 — it enters the superior vena cava at T4."
    ],
    "sourceRefs": [
      {
        "ref": "hss.manual1920",
        "location": "p24 \"Which of the following is NOT part of the thoracic inlet\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p24 \"The oesophagus descends along the\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p24 \"Lymph from which of the following organ does NOT drain into the left lymphatic duct\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p24 \"The tail of the mammary gland extends into the\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p74 \"Internal thoracic artery\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p2 \"azygos vein drains blood into the superior vena cava at the level of T4\""
      },
      {
        "ref": "hss.pp1718",
        "location": "p2 \"separates the superior and middle lobes of the right lung\""
      },
      {
        "ref": "hss.pp1718",
        "location": "p2 \"drains blood from the posterior thoracic wall\""
      }
    ]
  },
  {
    "id": "hss2011-thorax-mediastinum-divisions-contents",
    "subject": "HSS2011",
    "unit": "hss.m1",
    "type": "concept",
    "title": "The mediastinum: boundaries, the T4/T5 plane, and the four compartments",
    "tags": [
      "thorax",
      "mediastinum",
      "regional-anatomy",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "The oesophagus descends through which parts of the mediastinum?",
        "options": [
          "Anterior and middle",
          "Anterior and superior",
          "Superior and middle",
          "Superior and posterior"
        ],
        "answer": 3,
        "explanation": "The oesophagus passes through the superior mediastinum and then the posterior mediastinum on its way to the oesophageal hiatus.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p24 \"The oesophagus descends along the\""
        }
      },
      {
        "type": "mcq",
        "prompt": "The plane that separates the superior from the inferior mediastinum passes through:",
        "options": [
          "The jugular notch and T1",
          "The sternal angle and the T4/T5 disc",
          "The xiphisternal joint and T9",
          "The mid-manubrium and T3"
        ],
        "answer": 1,
        "explanation": "The transverse thoracic plane runs through the sternal angle anteriorly and the T4/T5 intervertebral disc posteriorly.",
        "src": {
          "ref": "hss.1.3",
          "location": "p19 \"@ T4/T5 vertebral level\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The inferior mediastinum is divided by the ______ into anterior, middle and posterior parts.",
        "accept": [
          "pericardium",
          "pericardial sac",
          "heart and pericardium"
        ],
        "explanation": "The pericardial sac (with the heart) occupies the middle mediastinum and separates the anterior from the posterior compartment.",
        "src": {
          "ref": "hss.1.3",
          "location": "p19 \"Inferior mediastinum\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which set of structures lies in the posterior mediastinum?",
        "options": [
          "Thymus, brachiocephalic veins, aortic arch",
          "Pericardium, heart, roots of the great vessels",
          "Oesophagus, descending thoracic aorta, azygos vein, thoracic duct",
          "Trachea, main bronchi, hilar lymph nodes"
        ],
        "answer": 2,
        "explanation": "The posterior mediastinum lies behind the pericardium and contains the oesophagus, descending thoracic aorta, azygos and hemiazygos veins, thoracic duct and sympathetic trunks.",
        "src": {
          "ref": "hss.1.3",
          "location": "p19 \"Posterior\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The arch of the aorta lies in the ______ mediastinum.",
        "accept": [
          "superior"
        ],
        "explanation": "The revision-exercise answer places the arch of the aorta in the superior mediastinum.",
        "src": {
          "ref": "hss.1.3",
          "location": "p19 \"Superior mediastinum\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A CT report describes a mass posterior to the pericardium at the T7 level, displacing the oesophagus and abutting the descending aorta and azygos vein. State which mediastinal compartment the mass is in, list the normal contents of that compartment, and explain why a mass here can cause difficulty swallowing and back pain but rarely affects the heart directly.",
        "model": "The mass is in the posterior mediastinum — the part of the inferior mediastinum behind the pericardium and in front of the lower thoracic vertebrae. Its normal contents are the oesophagus, the descending thoracic aorta and its branches, the azygos and hemiazygos veins, the thoracic duct, the vagus nerves and the sympathetic trunks with the splanchnic nerves. A mass here compresses the oesophagus, producing dysphagia, and can erode or press on the vertebral bodies and posterior chest wall, causing back pain, and may involve the sympathetic chain. The heart is shielded from the mass by the fibrous pericardium and lies in the separate middle mediastinum, so cardiac function is usually spared until the mass is very large.",
        "rubric": [
          "Identifies the posterior mediastinum and its boundaries (behind pericardium, in front of lower thoracic vertebrae)",
          "Lists oesophagus, descending aorta, azygos/hemiazygos veins, thoracic duct and sympathetic trunks",
          "Explains dysphagia and back pain from local compression while the pericardium shields the heart in the middle mediastinum"
        ]
      }
    ],
    "commonMistakes": [
      "Putting the aortic arch in the posterior mediastinum — the arch is in the superior mediastinum; only the descending aorta is posterior.",
      "Saying the oesophagus is only in the posterior mediastinum — it runs through the superior mediastinum first.",
      "Forgetting the middle mediastinum is defined by the pericardium and heart, not just a space."
    ],
    "sourceRefs": [
      {
        "ref": "hss.1.3",
        "location": "p18 \"Mediastinum\""
      },
      {
        "ref": "hss.1.3",
        "location": "p19 \"Superior mediastinum\""
      },
      {
        "ref": "hss.1.3",
        "location": "p19 \"@ T4/T5 vertebral level\""
      },
      {
        "ref": "hss.1.3",
        "location": "p19 \"Inferior mediastinum\""
      },
      {
        "ref": "hss.1.3",
        "location": "p19 \"Posterior\""
      },
      {
        "ref": "hss.1.3",
        "location": "p24 \"thymus\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p24 \"The oesophagus descends along the\""
      },
      {
        "ref": "hss.1920.m1.thorax",
        "location": "p22 \"Parietal Pleura separates the pleural cavity from the mediastinum\""
      }
    ]
  },
  {
    "id": "hss2011-thorax-breast-axillary-lymphatics",
    "subject": "HSS2011",
    "unit": "hss.m1",
    "type": "concept",
    "title": "The mammary gland: structure, blood supply and axillary lymphatic drainage",
    "tags": [
      "thorax",
      "breast",
      "lymphatics",
      "clinical",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "The tail of the mammary gland (axillary tail of Spence) extends into the:",
        "options": [
          "Supraclavicular fossa",
          "Anterior abdominal wall",
          "Axilla",
          "Body of the sternum"
        ],
        "answer": 2,
        "explanation": "The axillary tail is a superolateral extension of breast tissue that pierces the deep fascia to enter the axilla — the tested revision answer is C.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p24 \"The tail of the mammary gland extends into the\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Most of the lymph from the breast drains first to which group of nodes?",
        "options": [
          "Parasternal (internal thoracic) nodes",
          "Axillary lymph nodes",
          "Supraclavicular nodes",
          "Coeliac nodes"
        ],
        "answer": 1,
        "explanation": "About three-quarters of breast lymph drains laterally to the axillary lymph nodes before continuing to the apical and supraclavicular groups.",
        "src": {
          "ref": "hss.1.3",
          "location": "p29 \"lymphatic drainage\""
        }
      },
      {
        "type": "cloze",
        "prompt": "Venous blood from the breast drains mainly into the ______ vein.",
        "accept": [
          "axillary"
        ],
        "explanation": "The deck states venous drainage of the breast is mainly to the axillary vein.",
        "src": {
          "ref": "hss.1.3",
          "location": "p29 \"Axillary vein (mainly)\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The medial part of the breast is supplied by perforating branches of the ______ artery.",
        "accept": [
          "internal thoracic",
          "internal mammary",
          "internal thoracic artery"
        ],
        "explanation": "The internal thoracic (internal mammary) artery supplies the medial breast; the revision exercises name the internal thoracic artery as the mammary supply.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p74 \"Internal thoracic artery\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Skin dimpling over a breast lump is caused by tumour involvement of which structures?",
        "options": [
          "Lactiferous sinuses",
          "Suspensory ligaments of Cooper",
          "The axillary vein",
          "The pectoralis minor"
        ],
        "answer": 1,
        "explanation": "Tumour infiltration shortens the suspensory ligaments of Cooper, which run from the deep fascia to the skin, tethering and dimpling the overlying skin.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p64 \"Lactiferous Duct\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A woman has a carcinoma in the upper outer quadrant of the left breast with a palpable left axillary node. Explain the lymphatic pathway that node lies on, why the upper outer quadrant is a common site, and how a cancer in the medial breast could reach the opposite side.",
        "model": "About three-quarters of the lymph from the breast — and most of that from the lateral quadrants — drains to the axillary lymph nodes, passing from the pectoral (anterior) group to the central and apical groups and then to the supraclavicular nodes and the subclavian lymph trunk. The upper outer quadrant contains the largest volume of glandular tissue and the axillary tail, so it is the commonest site of breast cancer and its nodes are the first to be involved. A cancer in a medial quadrant drains instead through the chest wall to the parasternal (internal thoracic) nodes; because these communicate across the midline with the parasternal chain of the other side, a medial tumour can seed the contralateral breast, and the same route also reaches the mediastinum and, inferiorly, the subdiaphragmatic lymphatics.",
        "rubric": [
          "Traces the axillary chain: pectoral → central → apical → supraclavicular / subclavian trunk, carrying ~75% of breast lymph",
          "Explains the upper outer quadrant has the most tissue and the axillary tail, so is the commonest cancer site",
          "Explains medial drainage to parasternal (internal thoracic) nodes as the route to the contralateral breast"
        ]
      }
    ],
    "commonMistakes": [
      "Saying all breast lymph goes to the axilla — about a quarter drains medially to the parasternal nodes.",
      "Confusing the lactiferous sinus (a widening of the duct near the nipple) with the lobule (the secretory unit).",
      "Attributing skin dimpling to the lactiferous ducts — it is caused by tethering of the suspensory ligaments of Cooper."
    ],
    "sourceRefs": [
      {
        "ref": "hss.1.3",
        "location": "p28 \"The mammary glands (Breast)\""
      },
      {
        "ref": "hss.1.3",
        "location": "p28 \"Where is the tail of\""
      },
      {
        "ref": "hss.1.3",
        "location": "p29 \"lymphatic drainage\""
      },
      {
        "ref": "hss.1.3",
        "location": "p29 \"Axillary vein (mainly)\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p24 \"The tail of the mammary gland extends into the\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p74 \"Internal thoracic artery\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p64 \"Lactiferous Duct\""
      }
    ]
  },
  {
    "id": "hss2011-digestive-tract-upper",
    "subject": "HSS2011",
    "unit": "hss.m3",
    "type": "concept",
    "title": "Upper digestive tract: oral cavity, salivary glands, pharynx, oesophagus, stomach",
    "tags": [
      "digestive",
      "stomach",
      "oral-cavity",
      "oesophagus",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "The largest salivary gland is the:",
        "options": [
          "Submandibular gland",
          "Parotid gland",
          "Sublingual gland",
          "Minor salivary glands"
        ],
        "answer": 1,
        "explanation": "Model answer B: the parotid gland is the largest salivary gland; its duct opens into the vestibule opposite the upper molars.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p34 \"The largest salivary gland is:\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The third muscle layer that overlays the mucosa of the stomach wall is known as the ______ muscle.",
        "accept": [
          "oblique",
          "oblique muscle layer",
          "innermost oblique"
        ],
        "explanation": "Model answer: the oblique muscle — the stomach adds an innermost oblique layer to the usual circular and longitudinal coats.",
        "src": {
          "ref": "hss.revans",
          "location": "p3 \"Oblique muscle\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The ______ is the opening where the oesophagus enters the stomach.",
        "accept": [
          "cardiac orifice",
          "cardia"
        ],
        "explanation": "Model answer: the cardiac orifice — the oesophagus pierces the diaphragm at the oesophageal hiatus, then opens into the stomach at the cardiac orifice.",
        "src": {
          "ref": "hss.revans",
          "location": "p3 \"Cardiac orifice\""
        }
      },
      {
        "type": "mcq",
        "prompt": "The muscularis externa of the middle third of the oesophagus contains:",
        "options": [
          "Skeletal muscle only",
          "Smooth muscle only",
          "A mixture of skeletal and smooth muscle",
          "Circular muscle only"
        ],
        "answer": 2,
        "explanation": "Upper 1/3 skeletal only, middle a mixture, lower 1/3 smooth only — the shift from voluntary to involuntary swallowing.",
        "src": {
          "ref": "hss.3.1",
          "location": "p10 \"Upper 1/3: skeletal muscle only\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which gastric gland cell secretes hydrochloric acid AND intrinsic factor?",
        "options": [
          "Chief cell",
          "Mucous neck cell",
          "Parietal cell",
          "G cell"
        ],
        "answer": 2,
        "explanation": "Parietal cells secrete HCl and intrinsic factor, required for vitamin B12 absorption. Chief cells secrete pepsinogen.",
        "src": {
          "ref": "hss.3.1",
          "location": "p14 \"Parietal cells-secrete HCl\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which pharyngeal region serves ONLY the respiratory system?",
        "options": [
          "Nasopharynx",
          "Oropharynx",
          "Laryngopharynx",
          "All three serve both"
        ],
        "answer": 0,
        "explanation": "Normally the nasopharynx has only respiratory function; the oropharynx and laryngopharynx are passages for air and food.",
        "src": {
          "ref": "hss.3.1",
          "location": "p8 \"Nasopharynx has only\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A 60-year-old alcoholic has forceful vomiting, then severe chest pain and surgical emphysema. CT shows a full-thickness tear of the distal oesophagus just above the diaphragm (Boerhaave syndrome). Explain, using the wall anatomy, why the tear is in the lower third and what the lack of serosa there means for the leak.",
        "model": "The tear is in the lower third because that segment is all smooth muscle under the highest intraluminal pressures of retching — the voluntary skeletal upper third and the mixed middle third are not where forceful vomiting peaks. The distal intra-abdominal/infer mediastinal segment below the diaphragm is the only part covered by serosa, and just above the hiatus the oesophagus has NO serosal coat — only loose connective tissue — so nothing bounds the leak; gastric content escapes freely into the inferior mediastinum, causing mediastinitis and the subcutaneous air. The oesophageal hiatus is also the narrowest boundary it crosses, which is where pressure concentrates.",
        "rubric": [
          "Localises the weakness to the lower-third smooth-muscle segment under vomiting pressure",
          "States the oesophagus lacks serosa except below the diaphragm, so the leak is uncontained",
          "Connects the oesophageal hiatus crossing to the site of rupture and mediastinal contamination"
        ]
      }
    ],
    "commonMistakes": [
      "Calling the submandibular gland the largest — the parotid is the largest salivary gland.",
      "Putting the upper oesophageal sphincter in the laryngopharynx top — it sits at the INFERIOR portion of the laryngopharynx, before the oesophagus.",
      "Saying the oesophagus has serosa along its whole length — it is serosa-covered only below the diaphragm.",
      "Mixing the gastric cells: chief cells make pepsinogen, PARIETAL cells make HCl + intrinsic factor (not the other way round)."
    ],
    "sourceRefs": [
      {
        "ref": "hss.3.1",
        "location": "p7 \"the cheeks, lips, and tongue\""
      },
      {
        "ref": "hss.3.1",
        "location": "p7 \"Non-keratinized stratified\""
      },
      {
        "ref": "hss.3.1",
        "location": "p8 \"Nasopharynx has only\""
      },
      {
        "ref": "hss.3.1",
        "location": "p8 \"passages for air and food\""
      },
      {
        "ref": "hss.3.1",
        "location": "p8 \"esophageal sphincter at\""
      },
      {
        "ref": "hss.3.1",
        "location": "p9 \"esophageal hiatus\""
      },
      {
        "ref": "hss.3.1",
        "location": "p9 \"Cardiac orifice\""
      },
      {
        "ref": "hss.3.1",
        "location": "p9 \"Lower esophageal\""
      },
      {
        "ref": "hss.3.1",
        "location": "p10 \"Upper 1/3: skeletal muscle only\""
      },
      {
        "ref": "hss.3.1",
        "location": "p10 \"serosa only at the part below\""
      },
      {
        "ref": "hss.3.1",
        "location": "p12 \"A J-shaped organ\""
      },
      {
        "ref": "hss.3.1",
        "location": "p12 \"Composed of 4 regions\""
      },
      {
        "ref": "hss.3.1",
        "location": "p12 \"Oblique muscle layer\""
      },
      {
        "ref": "hss.3.1",
        "location": "p12 \"Gastric rugae\""
      },
      {
        "ref": "hss.3.1",
        "location": "p14 \"Chief cells\""
      },
      {
        "ref": "hss.3.1",
        "location": "p14 \"Parietal cells-secrete HCl\""
      },
      {
        "ref": "hss.3.1",
        "location": "p14 \"intrinsic factor\""
      },
      {
        "ref": "hss.3.1",
        "location": "p14 \"Enteroendocrine cells\""
      },
      {
        "ref": "hss.3.1",
        "location": "p26 \"Parotid salivary\""
      },
      {
        "ref": "hss.3.1",
        "location": "p26 \"Sublingual\""
      },
      {
        "ref": "hss.3.1",
        "location": "p26 \"Submandibular\""
      },
      {
        "ref": "hss.3.1.2019",
        "location": "p8 \"Non-keratinized stratified squamous epithelium.\""
      },
      {
        "ref": "hss.3.1.2019",
        "location": "p13 \"vagus nerves innervate the stomach\""
      },
      {
        "ref": "hss.3.1.2019",
        "location": "p15 \"Chief cells secrete pepsinogen\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p34 \"The largest salivary gland is:\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p34 \"The third muscle layer that overlaying mucosa\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"Oblique muscle\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"Cardiac orifice\""
      }
    ]
  },
  {
    "id": "hss2011-digestive-tract-small-large-bowel",
    "subject": "HSS2011",
    "unit": "hss.m3",
    "type": "concept",
    "title": "Small and large intestine: segments, surface amplification, colon features, anal canal",
    "tags": [
      "digestive",
      "small-intestine",
      "colon",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "Which part of the gut has the longest length?",
        "options": [
          "Oesophagus",
          "Duodenum",
          "Jejunum",
          "Ileum"
        ],
        "answer": 3,
        "explanation": "Model answer D: the ileum (~12 ft) is the longest single segment of the tract.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p34 \"Which part of the gut has the longest length?\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Teniae coli are found in which part of the digestive tract?",
        "options": [
          "Jejunum",
          "Cecum",
          "Colon",
          "Rectum"
        ],
        "answer": 2,
        "explanation": "Model answer C: teniae coli — three longitudinal smooth-muscle bands — are a feature of the colon.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p34 \"Teniae coli are found in which part\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The clusters of prominent lymphatic nodules in the ileum are called ______ patches.",
        "accept": [
          "Peyer's",
          "Peyer",
          "peyers"
        ],
        "explanation": "Peyer patches — aggregated lymphoid nodules of the ileum, an immune organ with lymphocytes and antibodies.",
        "src": {
          "ref": "hss.fib5yr",
          "location": "p10 \"Peyer patches\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The ______ valve regulates the passage of food residue from ileum into the first part of the colon, the cecum.",
        "accept": [
          "ileocecal",
          "ileocaecal"
        ],
        "explanation": "The ileocecal valve — a sphincter muscle at the ileocecal junction controlling passage into the caecum.",
        "src": {
          "ref": "hss.fib5yr",
          "location": "p11 \"ileocecal valve regulates the passage of food residue\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which structural feature does the large intestine LACK compared with the small intestine?",
        "options": [
          "Goblet cells",
          "Circular folds and villi",
          "Lymphatic tissue",
          "Simple columnar epithelium"
        ],
        "answer": 1,
        "explanation": "The colon has no circular folds or villi; it relies on goblet-cell mucus and its own mucosa for its water-absorption role.",
        "src": {
          "ref": "hss.3.1",
          "location": "p23 \"No circular folds or villi\""
        }
      },
      {
        "type": "mcq",
        "prompt": "A patient cannot voluntarily postpone defecation after spinal surgery. Which sphincter was most likely affected?",
        "options": [
          "Internal anal sphincter",
          "External anal sphincter",
          "Ileocecal valve",
          "Pyloric sphincter"
        ],
        "answer": 1,
        "explanation": "The external anal sphincter is skeletal muscle under voluntary control; the internal sphincter is smooth muscle and relaxes automatically.",
        "src": {
          "ref": "hss.3.1.2019",
          "location": "p34 \"External anal sphincter is made up of skeletal muscle\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A surgical specimen is labelled \"bowel resection\". It has: sacculations in the wall, three longitudinal muscle bands visible on the serosa, fat-filled pouches, and a lumen with no villi. Which part of the bowel is it, what are the three named features, and why does the absence of villi not defeat this segment's function?",
        "model": "It is large intestine (colon). The three features are the teniae coli (three longitudinal bands of smooth muscle), the haustra (the sacculations their tone produces) and the omental appendices (fat-filled peritoneal pouches on the serosa). The colon's job is not enzymatic absorption but dehydration and compaction of indigestible residue plus water absorption, which a flat, villus-free, goblet-cell-rich mucosa performs fine — villi are the small intestine's solution to nutrient uptake, not a requirement for every bowel segment.",
        "rubric": [
          "Identifies colon, naming teniae coli, haustra and omental appendices",
          "Uses the no-villi/no-fold histology as the discriminating feature vs small bowel",
          "Explains the function (water absorption, compaction) that does not need villi"
        ]
      }
    ],
    "commonMistakes": [
      "Calling the duodenum the longest gut segment — the ileum is (MCQ every year); the duodenum is the SHORTEST.",
      "Putting teniae coli on the small intestine — they are colon-only bands.",
      "Saying villi are largest in the ileum — they are largest in the duodenum and shrink distally.",
      "Reversing the sphincters: internal = smooth/involuntary, external = skeletal/voluntary."
    ],
    "sourceRefs": [
      {
        "ref": "hss.3.1",
        "location": "p15 \"begins at pyloric sphincter\""
      },
      {
        "ref": "hss.3.1",
        "location": "p15 \"most digestion\""
      },
      {
        "ref": "hss.3.1",
        "location": "p15 \"less vascular\""
      },
      {
        "ref": "hss.3.1",
        "location": "p15 \"Ileocecal valve\""
      },
      {
        "ref": "hss.3.1",
        "location": "p17 \"columnar absorptive cells\""
      },
      {
        "ref": "hss.3.1",
        "location": "p17 \"Tight junctions prevent digestive enzymes\""
      },
      {
        "ref": "hss.3.1",
        "location": "p19 \"Circular folds\""
      },
      {
        "ref": "hss.3.1",
        "location": "p19 \"200m2\""
      },
      {
        "ref": "hss.3.1",
        "location": "p19 \"Microvilli\""
      },
      {
        "ref": "hss.3.1",
        "location": "p19 \"Lacteal\""
      },
      {
        "ref": "hss.3.1",
        "location": "p21 \"Teniae coli\""
      },
      {
        "ref": "hss.3.1",
        "location": "p21 \"Haustra\""
      },
      {
        "ref": "hss.3.1",
        "location": "p21 \"Omental appendices\""
      },
      {
        "ref": "hss.3.1",
        "location": "p22 \"The colon has a larger diameter\""
      },
      {
        "ref": "hss.3.1",
        "location": "p23 \"5 ft long\""
      },
      {
        "ref": "hss.3.1",
        "location": "p23 \"No circular folds or villi\""
      },
      {
        "ref": "hss.3.1",
        "location": "p23 \"Goblet cells are present\""
      },
      {
        "ref": "hss.3.1",
        "location": "p23 \"Lymphatic tissue\""
      },
      {
        "ref": "hss.3.1",
        "location": "p24 \"Internal anal\""
      },
      {
        "ref": "hss.3.1",
        "location": "p24 \"External anal\""
      },
      {
        "ref": "hss.3.1.2019",
        "location": "p17 \"Duodenum - first 10 in.\""
      },
      {
        "ref": "hss.3.1.2019",
        "location": "p17 \"Jejunum (proximal 40%\""
      },
      {
        "ref": "hss.3.1.2019",
        "location": "p17 \"Ileum (distal 60%\""
      },
      {
        "ref": "hss.3.1.2019",
        "location": "p20 \"absorbed into lymphatic vessels\""
      },
      {
        "ref": "hss.3.1.2019",
        "location": "p34 \"Rectum begins at S2\""
      },
      {
        "ref": "hss.3.1.2019",
        "location": "p34 \"Internal anal sphincter is made up of smooth muscle\""
      },
      {
        "ref": "hss.3.1.2019",
        "location": "p34 \"External anal sphincter is made up of skeletal muscle\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p34 \"Which part of the gut has the longest length?\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p34 \"Teniae coli are found in which part\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p10 \"Peyer patches\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p11 \"ileocecal valve regulates the passage of food residue\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p11 \"teniae coli contracts and causes wall of the colon to bulge\""
      }
    ]
  },
  {
    "id": "hss2011-digestive-accessory-liver-pancreas",
    "subject": "HSS2011",
    "unit": "hss.m3",
    "type": "concept",
    "title": "Accessory organs: salivary glands, liver and its lobules, gallbladder and biliary tree, pancreas",
    "tags": [
      "digestive",
      "liver",
      "pancreas",
      "gallbladder",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "How many hepatic triad(s) can be found in a hepatic lobule?",
        "options": [
          "1",
          "3",
          "6",
          "8"
        ],
        "answer": 2,
        "explanation": "Model answer C: six portal areas (triads) sit around the periphery of a classic hexagonal lobule.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p34 \"How many hepatic triad(s)\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The pancreatic duct joins with the common bile duct to form an ______ before the release of bile and pancreatic juice to the duodenum.",
        "accept": [
          "ampulla",
          "hepatopancreatic ampulla",
          "ampulla of vater"
        ],
        "explanation": "The duodenal (hepatopancreatic) ampulla — its opening at the major duodenal papilla is guarded by the hepatopancreatic sphincter.",
        "src": {
          "ref": "hss.fib5yr",
          "location": "p9 \"pancreatic duct joins with the common bile duct to form an ampulla\""
        }
      },
      {
        "type": "mcq",
        "prompt": "In the More-exercises labelling (Module 3), structure B — the duct joining the gallbladder to the biliary tree — is the:",
        "options": [
          "Common hepatic duct",
          "Cystic duct",
          "Common bile duct",
          "Pancreatic duct"
        ],
        "answer": 1,
        "explanation": "The cystic duct connects the gallbladder to the common hepatic duct; their union forms the common bile duct.",
        "src": {
          "ref": "hss.revans",
          "location": "p4 \"Cystic duct\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Bile enters the duodenum:",
        "options": [
          "Continuously, from the liver only",
          "After a fatty meal, via the cystic duct and common bile duct",
          "Via the main pancreatic duct alone",
          "Into the first part of the duodenum at the pylorus"
        ],
        "answer": 1,
        "explanation": "Bile is released from the gallbladder after a fatty meal and enters the SECOND part of the duodenum via the cystic duct and CBD, past the hepatopancreatic sphincter.",
        "src": {
          "ref": "hss.3.1.2019",
          "location": "p22 \"released from the gallbladder after a fatty meal\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which cells line the liver sinusoids and phagocytose debris and bacteria?",
        "options": [
          "Hepatocytes",
          "Kupffer cells",
          "Acinar cells",
          "Enteroendocrine cells"
        ],
        "answer": 1,
        "explanation": "Kupffer cells are the sinusoidal macrophages of the liver; hepatocytes are the functional plates, acinar cells belong to the pancreas.",
        "src": {
          "ref": "hss.3.1",
          "location": "p28 \"Kupffer\""
        }
      },
      {
        "type": "mcq",
        "prompt": "The pancreatic hormones insulin and glucagon are described as:",
        "options": [
          "Synergistic",
          "Antagonistic",
          "Identical in action",
          "Digestive enzymes"
        ],
        "answer": 1,
        "explanation": "Insulin and glucagon are two antagonistic hormones regulating blood glucose homeostasis — islet (endocrine) products, not enzymes.",
        "src": {
          "ref": "hss.3.1",
          "location": "p30 \"insulin & glucagon\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "An ultrasound reports stones in the gallbladder neck and a dilated common bile duct. Explain, naming every duct in order, where a stone travelling from the gallbladder must pass, and why the same stone can cause both jaundice and digestive trouble after fatty meals.",
        "model": "A stone leaves the gallbladder neck via the cystic duct; where the cystic duct meets the right-and-left hepatic ducts' union (the common hepatic duct) the common bile duct begins; the CBD descends to join the pancreatic duct at the duodenal ampulla and enters the second part of the duodenum through the major duodenal papilla, guarded by the hepatopancreatic sphincter. A stone stuck in the CBD blocks bile delivery, so conjugated bile backs up into blood = jaundice, and no bile reaches the duodenum after a fatty meal — bile being the lipid-digestion secretion — so fatty foods cause pain and maldigestion. If the stone blocks at the ampulla it can also obstruct pancreatic juice, producing pancreatitis.",
        "rubric": [
          "Names the duct sequence cystic → common hepatic/common bile → ampulla → 2nd part duodenum",
          "Explains jaundice from blocked bile flow into the duodenum",
          "Explains post-fatty-meal pain and the ampullary pancreatitis risk"
        ]
      }
    ],
    "commonMistakes": [
      "Saying the gallbladder MAKES bile — the liver makes it; the gallbladder stores and concentrates it.",
      "Placing the bile entry in the first part of the duodenum — bile and pancreatic juice enter the SECOND part at the major duodenal papilla.",
      "Calling the quadrate and caudate lobes functional units — the quadrate lobe is purely topographic; the functional split is right/left by the falciform ligament (and the portal divides it differently).",
      "Forgetting the portal vein brings the most blood (~70–80%) while the hepatic artery brings the oxygen."
    ],
    "sourceRefs": [
      {
        "ref": "hss.3.1",
        "location": "p27 \"Right lobe of liver\""
      },
      {
        "ref": "hss.3.1",
        "location": "p27 \"Left lobe\""
      },
      {
        "ref": "hss.3.1",
        "location": "p28 \"Hepatic lobules as\""
      },
      {
        "ref": "hss.3.1",
        "location": "p28 \"hexagonal plates\""
      },
      {
        "ref": "hss.3.1",
        "location": "p28 \"Kupffer\""
      },
      {
        "ref": "hss.3.1",
        "location": "p28 \"Sinusoid\""
      },
      {
        "ref": "hss.3.1",
        "location": "p28 \"Portal Area\""
      },
      {
        "ref": "hss.3.1",
        "location": "p28 \"Hepatocytes\""
      },
      {
        "ref": "hss.3.1",
        "location": "p30 \"Acinar cells make\""
      },
      {
        "ref": "hss.3.1",
        "location": "p30 \"insulin & glucagon\""
      },
      {
        "ref": "hss.3.1",
        "location": "p30 \"Enzymes are activated in the duodenum\""
      },
      {
        "ref": "hss.3.1",
        "location": "p31 \"Pear-shaped organ stores and concentrates bile\""
      },
      {
        "ref": "hss.3.1",
        "location": "p31 \"Cystic duct\""
      },
      {
        "ref": "hss.3.1",
        "location": "p31 \"Hepatopancreatic\""
      },
      {
        "ref": "hss.3.1.2019",
        "location": "p22 \"released from the gallbladder after a fatty meal\""
      },
      {
        "ref": "hss.3.1.2019",
        "location": "p24 \"insulin & glucagon\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p34 \"Porta Hepatis\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p34 \"Quadrate lobe\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p34 \"Common bile duct\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p36 \"gall stones formation\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p34 \"How many hepatic triad(s)\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p9 \"pancreatic duct joins with the common bile duct to form an ampulla\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p12 \"Quadrate(anterior), and Caudate (posterior)\""
      },
      {
        "ref": "hss.revans",
        "location": "p4 \"Cystic duct\""
      },
      {
        "ref": "hss.revans",
        "location": "p4 \"Common hepatic duct\""
      },
      {
        "ref": "hss.revans",
        "location": "p4 \"Gall bladder\""
      }
    ]
  },
  {
    "id": "hss2011-digestive-peritoneum-portal-circulation",
    "subject": "HSS2011",
    "unit": "hss.m3",
    "type": "concept",
    "title": "Peritoneum, mesenteries and omenta; the three gut arteries and the hepatic portal system",
    "tags": [
      "digestive",
      "peritoneum",
      "portal",
      "vasculature",
      "high-yield"
    ],
    "practice": [
      {
        "type": "cloze",
        "prompt": "Nutrients absorbed in the gut are transported to the liver through the ______.",
        "accept": [
          "hepatic portal vein",
          "portal vein",
          "hepatic portal"
        ],
        "explanation": "Model answer: the hepatic portal vein — the portal vessel connecting the gut capillary bed to the liver sinusoids.",
        "src": {
          "ref": "hss.revans",
          "location": "p3 \"Hepatic portal vein\""
        }
      },
      {
        "type": "mcq",
        "prompt": "The embryonic midgut, supplied by the superior mesenteric artery, extends to the:",
        "options": [
          "Duodenojejunal flexure",
          "Proximal two-thirds of the transverse colon",
          "Sigmoid colon",
          "Upper rectum"
        ],
        "answer": 1,
        "explanation": "Midgut = distal duodenum through the proximal 2/3 of the transverse colon; the hindgut (IMA) takes the distal one-third and everything below.",
        "src": {
          "ref": "hss.3.1.2019",
          "location": "p30 \"proximal two-third of transverse colon\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which set lists ONLY retroperitoneal organs?",
        "options": [
          "Stomach, liver, spleen",
          "Kidneys, pancreas, ascending colon",
          "Jejunum, ileum, transverse colon",
          "Liver, gallbladder, caecum"
        ],
        "answer": 1,
        "explanation": "Kidneys, ureters, pancreas, last 3/4 of duodenum and the ascending/descending colons lie retroperitoneal; the others are intraperitoneal.",
        "src": {
          "ref": "hss.3.1",
          "location": "p38 \"kidneys, ureters,\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The ______ is the thick, broad, fan-shaped mesenterial sheet suspending the jejunum and the ileum from the dorsal abdominal wall.",
        "accept": [
          "mesentery proper",
          "mesentery"
        ],
        "explanation": "The mesentery proper — it stores fat, prevents twisting of the small intestine and carries the vessels, nerves and lymph nodes.",
        "src": {
          "ref": "hss.3.3.2019",
          "location": "p25 \"Mesentery proper is a thick broad fan-shaped\""
        }
      },
      {
        "type": "mcq",
        "prompt": "A portal vessel is defined as a blood vessel connecting:",
        "options": [
          "Two arteries",
          "An artery to a vein",
          "Two capillary beds",
          "The heart to the liver"
        ],
        "answer": 2,
        "explanation": "A portal vessel connects two capillary beds; that network is a portal system — the hepatic portal vein is the example.",
        "src": {
          "ref": "hss.3.1",
          "location": "p36 \"Portal vessel = a blood vessel connecting two capillary beds\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Why does an orally taken drug such as Panadol undergo first-pass metabolism?",
        "options": [
          "It is absorbed by the stomach only",
          "Gut veins drain via the hepatic portal vein through the liver before reaching the systemic circulation",
          "The pancreas destroys part of it",
          "Bile excretes it into the colon"
        ],
        "answer": 1,
        "explanation": "All below-diaphragm digestive blood enters the hepatic portal vein; the liver processes nutrients and clears drugs before the blood reaches the IVC.",
        "src": {
          "ref": "hss.3.1.2019",
          "location": "p32 \"First-pass metabolism of drugs taken orally\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A CT of a 55-year-old shows cirrhosis with portal hypertension. Explain in anatomical terms why gut blood pressure rises, which three veins contribute to the portal vein, and why the surgeon must respect the difference between intraperitoneal and retroperitoneal organs when creating a shunt.",
        "model": "In cirrhosis the sinusoidal path through the liver is scarred, so blood arriving by the hepatic portal vein cannot clear the liver — pressure backs up the entire portal system. That vein is formed by the union of the splenic vein (foregut/left side: spleen and stomach) and the superior mesenteric vein (midgut), with the inferior mesenteric vein (hindgut) joining between them. Shunting drains portal blood toward the IVC, which runs retroperitoneal behind the organs; the operator must know which organs are fused to the retroperitoneum (pancreas — right where the portal vein forms — duodenum, ascending/descending colon) versus suspended intraperitoneal organs that can be mobilised freely, because the approach route and the collateral risk both follow that distinction.",
        "rubric": [
          "Explains portal hypertension from blocked sinusoidal flow through the liver",
          "Names splenic + superior mesenteric (+ inferior mesenteric) as the portal tributaries",
          "Uses the intra/retroperitoneal distinction to justify the shunt approach and risks"
        ]
      }
    ],
    "commonMistakes": [
      "Calling the transverse colon retroperitoneal — it is intraperitoneal, hung by the transverse mesocolon; the ASCENDING and DESCENDING colon are the retroperitoneal parts.",
      "Saying the inferior mesenteric artery supplies the whole transverse colon — only the distal one-third; the proximal two-thirds are SMA/midgut.",
      "Draining gut blood into the IVC directly — it goes through the hepatic portal vein and liver first.",
      "Treating the lesser omentum as running to the greater curvature — the GREATER omentum is the greater-curvature apron; the lesser runs to the liver."
    ],
    "sourceRefs": [
      {
        "ref": "hss.3.1",
        "location": "p37 \"Parietal peritoneum\""
      },
      {
        "ref": "hss.3.1",
        "location": "p37 \"Visceral peritoneum\""
      },
      {
        "ref": "hss.3.1",
        "location": "p37 \"Peritoneal cavity\""
      },
      {
        "ref": "hss.3.1",
        "location": "p37 \"Lubricated by peritoneal\""
      },
      {
        "ref": "hss.3.1",
        "location": "p38 \"Retroperitoneal\""
      },
      {
        "ref": "hss.3.1",
        "location": "p38 \"kidneys, ureters,\""
      },
      {
        "ref": "hss.3.1",
        "location": "p38 \"duodenum (last\""
      },
      {
        "ref": "hss.3.1",
        "location": "p38 \"stomach,\""
      },
      {
        "ref": "hss.3.1",
        "location": "p39 \"Mesentery proper\""
      },
      {
        "ref": "hss.3.1",
        "location": "p39 \"fan-shaped\""
      },
      {
        "ref": "hss.3.1",
        "location": "p39 \"prevent twisting\""
      },
      {
        "ref": "hss.3.1",
        "location": "p39 \"store fat\""
      },
      {
        "ref": "hss.3.1",
        "location": "p40 \"Greater omentum\""
      },
      {
        "ref": "hss.3.1",
        "location": "p40 \"Lesser omentum\""
      },
      {
        "ref": "hss.3.1",
        "location": "p40 \"isolate\""
      },
      {
        "ref": "hss.3.1",
        "location": "p41 \"ascending & descending colons\""
      },
      {
        "ref": "hss.3.1",
        "location": "p32 \"Celiac Trunk\""
      },
      {
        "ref": "hss.3.1",
        "location": "p32 \"Superior mesenteric\""
      },
      {
        "ref": "hss.3.1",
        "location": "p32 \"Inferior mesenteric\""
      },
      {
        "ref": "hss.3.1",
        "location": "p33 \"Foregut-mouth, pharynx, esophagus, stomach\""
      },
      {
        "ref": "hss.3.1",
        "location": "p33 \"1st two thirds of transverse colon\""
      },
      {
        "ref": "hss.3.1",
        "location": "p35 \"hepatic portal vein which enters the\""
      },
      {
        "ref": "hss.3.1",
        "location": "p35 \"cleansed of bacteria\""
      },
      {
        "ref": "hss.3.1",
        "location": "p36 \"Portal vessel = a blood vessel connecting two capillary beds\""
      },
      {
        "ref": "hss.3.1.2019",
        "location": "p30 \"celiac trunk that supplies the foregut\""
      },
      {
        "ref": "hss.3.1.2019",
        "location": "p30 \"Superior mesenteric artery supplies the mid-gut\""
      },
      {
        "ref": "hss.3.1.2019",
        "location": "p30 \"Inferior mesenteric artery supplies the hind-gut\""
      },
      {
        "ref": "hss.3.1.2019",
        "location": "p32 \"First-pass metabolism of drugs taken orally\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p21 \"regarded as the serosa\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p25 \"kidneys, ureters, pancreas, duodenum (last\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p34 \"transported to the liver through the\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"Hepatic portal vein\""
      }
    ]
  },
  {
    "id": "hss2011-digestive-tutorial-pastpaper-practice",
    "subject": "HSS2011",
    "unit": "hss.m3",
    "type": "cloze",
    "title": "Digestive system: worked revision exercises and past-paper practice (Module 3.1)",
    "tags": [
      "digestive",
      "assessment",
      "tutorial",
      "high-yield"
    ],
    "practice": [
      {
        "type": "cloze",
        "prompt": "The groove-like boundary at the duodenojejunal junction marks the end of the duodenum. Name the junction.",
        "accept": [
          "duodenojejunal junction",
          "duodenojejunal flexure"
        ],
        "explanation": "Model answer: the duodenojejunal junction (flexure) — where the fixed duodenum ends and the mesenteric jejunum begins.",
        "src": {
          "ref": "hss.revans",
          "location": "p3 \"Duodenojejunal junction\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Where are gastric pits located within the stomach wall?",
        "options": [
          "Mucosa",
          "Submucosa",
          "Muscularis externa",
          "Serosa"
        ],
        "answer": 0,
        "explanation": "Model answer A: the gastric pits and their glands open from the mucosal surface.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p34 \"Where are gastric pits located within the stomach wall?\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The domelike roof superior to the esophageal attachment of the stomach is known as the ______ region.",
        "accept": [
          "fundic",
          "fundus",
          "fundic region"
        ],
        "explanation": "The fundic region (fundus) — asked in 12/13, 13/14, 14/15, 15/16 and 16/17 without a break.",
        "src": {
          "ref": "hss.fib5yr",
          "location": "p12 \"fundic region: domelike roof superior\""
        }
      },
      {
        "type": "cloze",
        "prompt": "Lengthwise the colon, the muscle tone of the ______ contracts and causes the wall to bulge into pouches called ______.",
        "accept": [
          "teniae coli; haustra",
          "teniae coli, haustra"
        ],
        "explanation": "Teniae coli tone → haustra. Also tested with the ileocecal valve in the same blank-chain.",
        "src": {
          "ref": "hss.fib5yr",
          "location": "p11 \"teniae coli contracts and causes wall of the colon to bulge\""
        }
      },
      {
        "type": "mcq",
        "prompt": "In the More-exercises labelling, structure Q — the unpaired artery just below the diaphragm giving left gastric, splenic and common hepatic branches — is the:",
        "options": [
          "Superior mesenteric artery",
          "Coeliac trunk",
          "Hepatic artery proper",
          "Inferior mesenteric artery"
        ],
        "answer": 1,
        "explanation": "The coeliac trunk is the foregut branch of the abdominal aorta; the hepatic artery proper is one of ITS branches.",
        "src": {
          "ref": "hss.revans",
          "location": "p4 \"Celiac trunk\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The liver is superficially divided into right and left lobes by the ______ ligament; the irregular opening between the lobes is called the ______.",
        "accept": [
          "falciform; porta hepatis",
          "falciform ligament; porta hepatis"
        ],
        "explanation": "Falciform ligament divides the anatomical lobes; the porta hepatis is the entry/exit hilum. Both are five-year repeaters.",
        "src": {
          "ref": "hss.fib5yr",
          "location": "p11 \"falciform ligament\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "You are tutoring a classmate the night before the paper. Set and mark the five Module 3.1 fill-in-the-blanks, then ask them to label cystic duct, common hepatic duct, common bile duct and hepatic portal vein on a biliary diagram. What four errors would you listen for?",
        "model": "Listen for: (1) \"stratified squamous\" for the tract epithelium — it is simple columnar, squamous only at the two ends; (2) \"circular\" or \"longitudinal\" as the stomach's third layer — it is the oblique; (3) confusing the duodenojejunal junction with the ileocecal valve; (4) putting nutrients into the inferior vena cava or \"hepatic vein\" instead of the hepatic portal vein — and on the diagram, wiring the cystic duct into the common hepatic (it joins to FORM the common bile duct) or skipping the ampulla before the second part of the duodenum.",
        "rubric": [
          "Sets all five FIBs with correct answers (columnar, oblique, cardiac orifice, DJ junction, portal vein)",
          "Demands the duct chain in order with the ampulla and 2nd-part duodenum",
          "Catches the four classic confusions listed"
        ]
      }
    ],
    "commonMistakes": [
      "Answering \"oesophagus\" or \"jejunum\" for longest gut segment — the model answer is the ileum.",
      "Putting gastric pits in the submucosa — pits and glands are mucosal.",
      "Writing \"hepatic vein\" where the blank wants the hepatic PORTAL vein — the hepatic veins LEAVE the liver to the IVC.",
      "Saying the common hepatic duct comes from the gallbladder — the gallbladder contributes the CYSTIC duct."
    ],
    "sourceRefs": [
      {
        "ref": "hss.revans",
        "location": "p3 \"Simple columnar epithelium\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"Oblique muscle\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"Cardiac orifice\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"Duodenojejunal junction\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"Hepatic portal vein\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p34 \"Which part of the gut has the longest length?\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p34 \"Where are gastric pits located within the stomach wall?\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p34 \"Teniae coli are found in which part\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p34 \"The largest salivary gland is:\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p34 \"How many hepatic triad(s)\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p12 \"fundic region: domelike roof superior\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p12 \"Duodenum: largest villi\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p12 \"epigastric + umbilical + hypogastric region\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p12 \"ileocecal valve + teniae coli + haustra\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p12 \"Pancreas: uncinate process + spleen +\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p12 \"Quadrate(anterior), and Caudate (posterior)\""
      },
      {
        "ref": "hss.revans",
        "location": "p4 \"Gall bladder\""
      },
      {
        "ref": "hss.revans",
        "location": "p4 \"Cystic duct\""
      },
      {
        "ref": "hss.revans",
        "location": "p4 \"Common hepatic duct\""
      },
      {
        "ref": "hss.revans",
        "location": "p4 \"Common bile duct\""
      },
      {
        "ref": "hss.revans",
        "location": "p4 \"Hepatic portal vein\""
      },
      {
        "ref": "hss.revans",
        "location": "p4 \"Celiac trunk\""
      },
      {
        "ref": "hss.revans",
        "location": "p4 \"Superior mesenteric artery\""
      },
      {
        "ref": "hss.revans",
        "location": "p4 \"Inferior mesenteric artery\""
      }
    ]
  },
  {
    "id": "hss2011-uro-kidneys-urinary-tract",
    "subject": "HSS2011",
    "unit": "hss.m3",
    "type": "concept",
    "title": "Kidneys and the urinary tract: gross anatomy, ureters, bladder, urethra, urothelium",
    "tags": [
      "urogenital",
      "kidney",
      "bladder",
      "urethra",
      "high-yield"
    ],
    "practice": [
      {
        "type": "cloze",
        "prompt": "The ______ is the point of entry and exit of renal vessels.",
        "accept": [
          "hilum",
          "hilus",
          "renal hilum"
        ],
        "explanation": "The hilum — renal artery and nerves in; renal vein and ureter out. Five-year blank (12/13–16/17).",
        "src": {
          "ref": "hss.fib5yr",
          "location": "p7 \"hilum is the point of entry and exit of renal vessels\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The structure that conveys urine from the kidney to the bladder is the ______; it penetrates the ______ wall of the urinary bladder.",
        "accept": [
          "ureter; posterior",
          "ureter, posterior"
        ],
        "explanation": "The ureter — and the oblique entry through the POSTERIOR wall forms the anti-reflux valve.",
        "src": {
          "ref": "hss.fib5yr",
          "location": "p7 \"conveys urine from the kidney to the bladder is the ureter\""
        }
      },
      {
        "type": "mcq",
        "prompt": "The arterial vessel arch along the boundary between the cortex and medulla of the kidney is the:",
        "options": [
          "Interlobar arteries",
          "Arcuate arteries",
          "Cortical radiate arteries",
          "Afferent arterioles"
        ],
        "answer": 1,
        "explanation": "Model answer B: the arcuate arteries arch along the cortex–medulla junction.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p36 \"arch along the boundary between the cortex and medulla\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The powerful muscle in the muscularis layer of the bladder wall is called the ______.",
        "accept": [
          "detrusor",
          "detrusor muscle"
        ],
        "explanation": "Model answer: detrusor — inner and outer longitudinal layers with circular between.",
        "src": {
          "ref": "hss.revans",
          "location": "p3 \"Detrusor\""
        }
      },
      {
        "type": "mcq",
        "prompt": "The female urethra measures approximately:",
        "options": [
          "3–5 cm",
          "8–10 cm",
          "18–20 cm",
          "25–30 cm"
        ],
        "answer": 0,
        "explanation": "The female urethra is very short (3–5 cm), bladder to vestibule — versus 18–20 cm in the male.",
        "src": {
          "ref": "hss.3.2",
          "location": "p19 \"very short (3–5 cm)\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The opening of the two ureters and the urethra form the boundaries of a smooth area called the ______ on the bladder floor.",
        "accept": [
          "trigone"
        ],
        "explanation": "The trigone — it acts as a funnel channelling urine into the urethra.",
        "src": {
          "ref": "hss.fib5yr",
          "location": "p11 \"Trigone on the floor of the bladder\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A 32-year-old man has colicky left flank pain radiating to the groin with microscopic haematuria. CT shows a 4 mm stone at the level of the pelvic brim. Using the ureter's course, state where the stone is and name the other two classic impaction sites; explain why the ureteric entry into the bladder does not normally allow backflow.",
        "model": "The stone has reached the second classic constriction — where the ureter crosses the external iliac vessels and/or the pelvic brim. The other two sites are the ureteropelvic junction (pelvis narrowing to ureter) and the intramural traverse of the bladder wall. Backflow is prevented because the ureters penetrate the posterior bladder wall at an OBLIQUE angle: as the detrusor contracts, the intramural segment is compressed shut, so the ureteral openings act as one-way valves. Colicky pain radiates groin-ward because the ureter shares its T11–L2 sensory supply with those skin areas.",
        "rubric": [
          "Localises the stone to the pelvic-brim/external-iliac crossing",
          "Names UPJ and the bladder-wall traverse as the other two sites",
          "Explains the oblique intramural entry as the anti-reflux mechanism"
        ]
      }
    ],
    "commonMistakes": [
      "Saying the ureters enter the anterior or superior bladder wall — they pierce the POSTERIOR wall obliquely (five-year blank).",
      "Putting the kidneys at L1–L5 or \"in the peritoneal cavity\" — they are retroperitoneal, T12–L3, right lower than left.",
      "Making the bladder fully peritoneal — only the SUPERIOR surface is covered; the organ is otherwise infraperitoneal.",
      "Reversing calyx counts — 4–5 MINOR merge to a major; 2–3 MAJOR form the pelvis."
    ],
    "sourceRefs": [
      {
        "ref": "hss.3.2",
        "location": "p4 \"T12 and L3\""
      },
      {
        "ref": "hss.3.2",
        "location": "p4 \"Right kidney is slightly\""
      },
      {
        "ref": "hss.3.2",
        "location": "p4 \"adrenal gland at the\""
      },
      {
        "ref": "hss.3.2",
        "location": "p4 \"highly vascular\""
      },
      {
        "ref": "hss.3.2",
        "location": "p5 \"It is retroperitoneal\""
      },
      {
        "ref": "hss.3.2",
        "location": "p5 \"Fibrous capsule\""
      },
      {
        "ref": "hss.3.2",
        "location": "p5 \"Perinephric fat\""
      },
      {
        "ref": "hss.3.2",
        "location": "p5 \"Renal fascia\""
      },
      {
        "ref": "hss.3.2",
        "location": "p6 \"Point of entry for renal artery\""
      },
      {
        "ref": "hss.3.2",
        "location": "p6 \"4-5 minor calyces are merged to form a\""
      },
      {
        "ref": "hss.3.2",
        "location": "p6 \"major calyx, and 2-3 major calyces\""
      },
      {
        "ref": "hss.3.2",
        "location": "p14 \"triple-layered walls\""
      },
      {
        "ref": "hss.3.2",
        "location": "p14 \"Transitional epithelium\""
      },
      {
        "ref": "hss.3.2",
        "location": "p14 \"retroperitoneal being attached\""
      },
      {
        "ref": "hss.3.2",
        "location": "p14 \"oblique angle\""
      },
      {
        "ref": "hss.3.2",
        "location": "p15 \"Hollow, muscular organ\""
      },
      {
        "ref": "hss.3.2",
        "location": "p15 \"Rugae\""
      },
      {
        "ref": "hss.3.2",
        "location": "p15 \"disappear when the bladder\""
      },
      {
        "ref": "hss.3.2",
        "location": "p16 \"Trigone as defined by the\""
      },
      {
        "ref": "hss.3.2",
        "location": "p16 \"funnel to\""
      },
      {
        "ref": "hss.3.2",
        "location": "p16 \"Internal urethral\""
      },
      {
        "ref": "hss.3.2",
        "location": "p17 \"mucosa, submucosa, and muscularis\""
      },
      {
        "ref": "hss.3.2",
        "location": "p17 \"detrusor muscle\""
      },
      {
        "ref": "hss.3.2",
        "location": "p17 \"Inner and outer layers of longitudinal smooth\""
      },
      {
        "ref": "hss.3.2",
        "location": "p18 \"18–20 cm\""
      },
      {
        "ref": "hss.3.2",
        "location": "p18 \"Prostatic urethra\""
      },
      {
        "ref": "hss.3.2",
        "location": "p18 \"Membranous urethra\""
      },
      {
        "ref": "hss.3.2",
        "location": "p18 \"Spongy urethra\""
      },
      {
        "ref": "hss.3.2",
        "location": "p18 \"urogenital diaphragm\""
      },
      {
        "ref": "hss.3.2",
        "location": "p19 \"voluntary control in\""
      },
      {
        "ref": "hss.3.2",
        "location": "p20 \"transitional epithelium\""
      },
      {
        "ref": "hss.3.2",
        "location": "p20 \"minor and\""
      },
      {
        "ref": "hss.3.2",
        "location": "p20 \"proximal portion of urethra\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p39 \"T12 – L3\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p39 \"9 – 13 cm\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p39 \"retroperitoneal organs\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p43 \"Ureteropelvic junction\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p43 \"external iliac\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p49 \"infraperitoneal\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p7 \"hilum is the point of entry and exit of renal vessels\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p7 \"conveys urine from the kidney to the bladder is the ureter\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p7 \"penetrates the posterior wall of the urinary bladder\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p11 \"Trigone on the floor of the bladder\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"Calyx\""
      }
    ]
  },
  {
    "id": "hss2011-uro-nephron-renal-microanatomy",
    "subject": "HSS2011",
    "unit": "hss.m3",
    "type": "concept",
    "title": "Renal microanatomy: the kidney lobe, the two nephrons, the renal corpuscle and the tubule segments",
    "tags": [
      "urogenital",
      "kidney",
      "nephron",
      "histology",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "The arterial vessel arch along the boundary between the cortex and medulla of the kidney is:",
        "options": [
          "Interlobar arteries",
          "Arcuate arteries",
          "Cortical radiate arteries",
          "Afferent arterioles"
        ],
        "answer": 1,
        "explanation": "Model answer B — the arcuate arteries arch between cortex and medulla, feeding the cortical radiate arteries.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p36 \"arch along the boundary between the cortex and medulla\""
        }
      },
      {
        "type": "mcq",
        "prompt": "In a typical nephron, the tubular portion that is distal to the loop of Henle is the:",
        "options": [
          "Proximal convoluted tubule",
          "Distal convoluted tubule",
          "Ascending limb",
          "Descending limb"
        ],
        "answer": 1,
        "explanation": "Model answer B: the DCT follows the loop of Henle — it secretes ions, acids, drugs and fine-tunes reabsorption under hormonal control.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p36 \"tubular portion that is distal to the loop of Henle\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The compact ball of capillaries in a nephron is called the ______.",
        "accept": [
          "glomerulus"
        ],
        "explanation": "The glomerulus — inside the glomerular capsule, together forming the renal corpuscle.",
        "src": {
          "ref": "hss.fib5yr",
          "location": "p8 \"glomerulus\""
        }
      },
      {
        "type": "cloze",
        "prompt": "Each renal pyramid drains into a separate cuplike urine receptacle called a minor ______.",
        "accept": [
          "calyx",
          "calyces",
          "minor calyx"
        ],
        "explanation": "The minor calyx — the model answer for the Module 3.2 FIB \"calyx\"; 4–5 merge into a major calyx.",
        "src": {
          "ref": "hss.revans",
          "location": "p3 \"Calyx\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which tubule segment secretes ions, acids, drugs and toxins, with variable hormonal reabsorption?",
        "options": [
          "Proximal convoluted tubule",
          "Thin descending limb",
          "Distal convoluted tubule",
          "Collecting duct only"
        ],
        "answer": 2,
        "explanation": "The DCT secretes ions/acids/drugs/toxins and reabsorbs water, Na and Ca variably under hormonal control — cuboidal cells with few microvilli.",
        "src": {
          "ref": "hss.3.2",
          "location": "p12 \"Secretion of ions, acids, drugs, toxins\""
        }
      },
      {
        "type": "mcq",
        "prompt": "The macula densa of the juxtaglomerular complex consists of:",
        "options": [
          "Smooth muscle of the efferent arteriole",
          "Epithelial cells of the DCT near the renal corpuscle",
          "Podocytes of the visceral layer",
          "Squamous cells of the descending limb"
        ],
        "answer": 1,
        "explanation": "The macula densa is the tightly packed epithelial cells of the distal convoluted tubule pressed against the renal corpuscle.",
        "src": {
          "ref": "hss.3.2",
          "location": "p13 \"Macula densa\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A renal biopsy cores a pyramid and its overlying cortex. Name the unit sampled, and for each named vessel — segmental, interlobar, arcuate, cortical radiate — state where the pathologist sees it. Then explain why long-loop nephrons, not cortical ones, set the urine-concentrating ability.",
        "model": "The core samples one kidney lobe (pyramid + cortical cap). Segmental arteries branch at the hilum/sinus; interlobar arteries run in the renal columns between pyramids; arcuate arteries arch along the cortex–medulla boundary at the pyramid base; cortical radiate arteries ascend in the cortex, giving the afferent arterioles to the glomeruli. Concentration depends on juxtamedullary nephrons because their long loops of Henle dip deep into the medullary pyramids and their vasa recta maintain the medullary osmotic gradient — cortical nephrons' short loops never reach it, so the collecting ducts have no gradient to draw water into.",
        "rubric": [
          "Names the kidney lobe and maps each artery to its anatomical position",
          "Identifies afferent arterioles arising from cortical radiate arteries",
          "Explains the juxtamedullary loop/vasa-recta mechanism for concentration"
        ]
      }
    ],
    "commonMistakes": [
      "Routing blood glomerulus → peritubular capillaries directly — it passes through the EFFERENT arteriole first (arteriole-capillary-arteriole).",
      "Calling the arcuate arteries interlobar — interlobar run between pyramids; the arcuate ARCH at the cortex–medulla boundary (the MCQ stem is almost verbatim).",
      "Giving the PCT the secretion job — secretion of acids/drugs is DCT; PCT is the bulk REABSORPTION segment.",
      "Saying \"minor calyces merge into minor\" — 4–5 minor → major; 2–3 major → pelvis."
    ],
    "sourceRefs": [
      {
        "ref": "hss.3.2",
        "location": "p6 \"Renal pyramid\""
      },
      {
        "ref": "hss.3.2",
        "location": "p6 \"Renal cortex\""
      },
      {
        "ref": "hss.3.2",
        "location": "p6 \"Renal medulla\""
      },
      {
        "ref": "hss.3.2",
        "location": "p6 \"Renal columns\""
      },
      {
        "ref": "hss.3.2",
        "location": "p6 \"Renal papilla\""
      },
      {
        "ref": "hss.3.2",
        "location": "p7 \"Segmental arteries\""
      },
      {
        "ref": "hss.3.2",
        "location": "p7 \"Interlobar\""
      },
      {
        "ref": "hss.3.2",
        "location": "p7 \"Arcuate\""
      },
      {
        "ref": "hss.3.2",
        "location": "p7 \"Cortical\""
      },
      {
        "ref": "hss.3.2",
        "location": "p7 \"Afferent arterioles\""
      },
      {
        "ref": "hss.3.2",
        "location": "p7 \"Glomerulus\""
      },
      {
        "ref": "hss.3.2",
        "location": "p7 \"Peritubular\""
      },
      {
        "ref": "hss.3.2",
        "location": "p7 \"Efferent\""
      },
      {
        "ref": "hss.3.2",
        "location": "p8 \"Juxtamedullary\""
      },
      {
        "ref": "hss.3.2",
        "location": "p9 \"Collecting\""
      },
      {
        "ref": "hss.3.2",
        "location": "p9 \"Papillary\""
      },
      {
        "ref": "hss.3.2",
        "location": "p10 \"Vasa recta\""
      },
      {
        "ref": "hss.3.2",
        "location": "p10 \"Distal\""
      },
      {
        "ref": "hss.3.2",
        "location": "p10 \"Proximal\""
      },
      {
        "ref": "hss.3.2",
        "location": "p12 \"Reabsorption of water, ions,\""
      },
      {
        "ref": "hss.3.2",
        "location": "p12 \"Secretion of ions, acids, drugs, toxins\""
      },
      {
        "ref": "hss.3.2",
        "location": "p12 \"Variable reabsorption of water\""
      },
      {
        "ref": "hss.3.2",
        "location": "p12 \"Further reabsorption\""
      },
      {
        "ref": "hss.3.2",
        "location": "p12 \"chloride ions\""
      },
      {
        "ref": "hss.3.2",
        "location": "p12 \"Production of filtrate\""
      },
      {
        "ref": "hss.3.2",
        "location": "p12 \"Glomerular capsule\""
      },
      {
        "ref": "hss.3.2",
        "location": "p12 \"microvilli\""
      },
      {
        "ref": "hss.3.2",
        "location": "p12 \"Mitochondria\""
      },
      {
        "ref": "hss.3.2",
        "location": "p13 \"Juxtaglomerular\""
      },
      {
        "ref": "hss.3.2",
        "location": "p13 \"Macula densa\""
      },
      {
        "ref": "hss.3.2",
        "location": "p13 \"podocyte\""
      },
      {
        "ref": "hss.3.2",
        "location": "p13 \"Capsular\""
      },
      {
        "ref": "hss.3.2",
        "location": "p13 \"Smooth muscle fibers in wall of\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p35 \"What are the major components of a kidney lobe?\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p35 \"two types of nephrons and their structures\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p36 \"arch along the boundary between the cortex and medulla\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p36 \"tubular portion that is distal to the loop of Henle\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p8 \"glomerulus\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p11 \"Each renal pyramid drains into a separate cuplike\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p11 \"minor calyx\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"Calyx\""
      }
    ]
  },
  {
    "id": "hss2011-uro-male-reproductive-anatomy",
    "subject": "HSS2011",
    "unit": "hss.m3",
    "type": "concept",
    "title": "Male reproductive anatomy: scrotum, spermatic cord, testis, duct system, glands and penis",
    "tags": [
      "urogenital",
      "male-reproductive",
      "high-yield"
    ],
    "practice": [
      {
        "type": "cloze",
        "prompt": "The pair of glands located at the base of the penis are known as ______ glands.",
        "accept": [
          "bulbourethral",
          "bulbourethral (Cowper)",
          "cowper"
        ],
        "explanation": "Model answer: bulbourethral (Cowper) glands — in the urogenital diaphragm, ducts emptying into the spongy urethra.",
        "src": {
          "ref": "hss.revans",
          "location": "p3 \"Bulbourethral\""
        }
      },
      {
        "type": "mcq",
        "prompt": "The spermatic cord contains all of the following EXCEPT:",
        "options": [
          "Testicular artery",
          "Seminiferous tubule",
          "Pampiniform plexus",
          "Ductus deferens"
        ],
        "answer": 1,
        "explanation": "Model answer B: seminiferous tubules are INSIDE the testis, not in the cord.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p36 \"Spermatic cord contains the following except\""
        }
      },
      {
        "type": "mcq",
        "prompt": "How many efferent ductules are present in a testis to connect the rete testis and epididymis?",
        "options": [
          "3–6",
          "8–12",
          "10–15",
          "15–20"
        ],
        "answer": 3,
        "explanation": "Model answer D: 15–20 efferent ductules connect rete testis to epididymis.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p36 \"How many efferent ductules\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The ______ muscle contracts when cold; it tenses the scrotum taut and pulls the testes closer to the body.",
        "accept": [
          "cremaster"
        ],
        "explanation": "The cremaster — skeletal muscle deep to the dermis. Five-year blank; dartos is the smooth-muscle wrinkler.",
        "src": {
          "ref": "hss.fib5yr",
          "location": "p7 \"cremaster muscle contracts when cold\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The erectile tissue of the penis which passes along the ventral side and encloses the urethra is the ______.",
        "accept": [
          "corpus spongiosum"
        ],
        "explanation": "The corpus spongiosum — expands as the glans; the corpora cavernosa are the paired dorsal cylinders.",
        "src": {
          "ref": "hss.fib5yr",
          "location": "p7 \"encloses the urethra is known as the corpus spongiosum\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The pampiniform plexus acts as a ______ heat exchanger to cool down the testis.",
        "accept": [
          "countercurrent",
          "counter current"
        ],
        "explanation": "Countercurrent exchange — the venous plexus surrounding the testicular artery in the spermatic cord.",
        "src": {
          "ref": "hss.fib5yr",
          "location": "p9 \"countercurrent heat exchanger\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "An infertile man has a left varicocele and a low sperm count. Trace the sperm route from tubule to urethra, explain how the varicocele connects to his infertility through the pampiniform plexus, and state why the swelling is on the LEFT.",
        "model": "Sperm are made in the seminiferous tubules → straight tubules → rete testis → 15–20 efferent ductules → epididymis (head/body/tail, where they mature) → ductus deferens via the spermatic cord → ampulla → ejaculatory duct (joined by the seminal gland) → prostatic/membranous/spongy urethra. The varicocele is engorgement of the pampiniform plexus; a failed countercurrent exchanger lets testicular temperature rise, impairing spermatogenesis — hence the oligospermia. It is LEFT-sided because the left gonadal (testicular) vein drains into the left renal vein at a right angle, raising venous pressure, whereas the right gonadal vein drains obliquely and directly into the IVC.",
        "rubric": [
          "Recites the full sperm pathway in order with the efferent-ductule count",
          "Links plexus failure → raised testicular temperature → impaired spermatogenesis",
          "Explains left-sidedness via left renal vein drainage asymmetry"
        ]
      }
    ],
    "commonMistakes": [
      "Listing seminiferous tubules among cord contents — they are inside the testis (the EXCEPT MCQ).",
      "Credit dartos with pulling the testes up — dartos (smooth) wrinkles the skin; the CREMASTER (skeletal) retracts.",
      "Saying the urethra runs through the corpus cavernosum — it runs in the ventral CORPUS SPONGIOSUM.",
      "Putting the bulbourethral glands behind the bladder — those are the seminal glands; bulbourethral sit at the penis base in the urogenital diaphragm."
    ],
    "sourceRefs": [
      {
        "ref": "hss.3.2",
        "location": "p22 \"Ductus deferens\""
      },
      {
        "ref": "hss.3.2",
        "location": "p23 \"Dartos\""
      },
      {
        "ref": "hss.3.2",
        "location": "p23 \"Cremaster\""
      },
      {
        "ref": "hss.3.2",
        "location": "p23 \"Median septum\""
      },
      {
        "ref": "hss.3.2",
        "location": "p23 \"perineal raphe\""
      },
      {
        "ref": "hss.3.2",
        "location": "p23 \"pouch of serous membrane\""
      },
      {
        "ref": "hss.3.2",
        "location": "p23 \"wrinkling\""
      },
      {
        "ref": "hss.3.2",
        "location": "p23 \"closer to the body\""
      },
      {
        "ref": "hss.3.2",
        "location": "p24 \"Pampiniform plexus\""
      },
      {
        "ref": "hss.3.2",
        "location": "p24 \"Testicular artery\""
      },
      {
        "ref": "hss.3.2",
        "location": "p24 \"genitofemoral\""
      },
      {
        "ref": "hss.3.2",
        "location": "p24 \"Deferential artery\""
      },
      {
        "ref": "hss.3.2",
        "location": "p24 \"tunica vaginalis\""
      },
      {
        "ref": "hss.3.2",
        "location": "p25 \"seminiferous tubules\""
      },
      {
        "ref": "hss.3.2",
        "location": "p25 \"testis barrier\""
      },
      {
        "ref": "hss.3.2",
        "location": "p25 \"about 800 slender\""
      },
      {
        "ref": "hss.3.2",
        "location": "p25 \"rete testis\""
      },
      {
        "ref": "hss.3.2",
        "location": "p25 \"Septa subdivide testis into lobules\""
      },
      {
        "ref": "hss.3.2",
        "location": "p25 \"Tight junctions\""
      },
      {
        "ref": "hss.3.2",
        "location": "p25 \"Straight tubules\""
      },
      {
        "ref": "hss.3.2",
        "location": "p26 \"15-20 large efferent ductules\""
      },
      {
        "ref": "hss.3.2",
        "location": "p26 \"Epididymis (head\""
      },
      {
        "ref": "hss.3.2",
        "location": "p26 \"re-curves\""
      },
      {
        "ref": "hss.3.2",
        "location": "p26 \"cilia lining of\""
      },
      {
        "ref": "hss.3.2",
        "location": "p27 \"terminal ampulla\""
      },
      {
        "ref": "hss.3.2",
        "location": "p27 \"become ejaculatory duct\""
      },
      {
        "ref": "hss.3.2",
        "location": "p27 \"posterior side of the urinary\""
      },
      {
        "ref": "hss.3.2",
        "location": "p28 \"Seminal gland\""
      },
      {
        "ref": "hss.3.2",
        "location": "p28 \"Bulbourethral glands\""
      },
      {
        "ref": "hss.3.2",
        "location": "p28 \"penetrates wall of prostate\""
      },
      {
        "ref": "hss.3.2",
        "location": "p28 \"18–20 cm (7–8 in.)\""
      },
      {
        "ref": "hss.3.2",
        "location": "p30 \"Corpus spongiosum\""
      },
      {
        "ref": "hss.3.2",
        "location": "p30 \"corpus cavernosum\""
      },
      {
        "ref": "hss.3.2",
        "location": "p30 \"lacunae\""
      },
      {
        "ref": "hss.3.2",
        "location": "p30 \"trabeculae\""
      },
      {
        "ref": "hss.3.2",
        "location": "p30 \"8-10 cm\""
      },
      {
        "ref": "hss.3.2",
        "location": "p30 \"13-18 cm\""
      },
      {
        "ref": "hss.3.2",
        "location": "p30 \"Prepuce (Foreskin)\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p47 \"union of the vas deferens and the seminal vesicle\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p47 \"bulbourethral gland\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p52 \"Tunica vaginalis\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p52 \"Dartos muscle is a subcutaneous\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p52 \"Cremaster muscle is a layer of skeletal\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p7 \"cremaster muscle contracts when cold\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p7 \"encloses the urethra is known as the corpus spongiosum\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p7 \"seminal gland is an active secretory structure posterior\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p9 \"pampiniform plexus is an extensive network of veins\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p9 \"countercurrent heat exchanger\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p10 \"blood-testis barrier is formed by tight junctions\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p11 \"Sperm are synthesized in the seminiferous tubules\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p11 \"approximately 60% of the seminal fluid are the\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p11 \"produce testosterone are Interstitial cells\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"Bulbourethral\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p36 \"Spermatic cord contains the following except\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p36 \"How many efferent ductules\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p36 \"pair of glands located at the base of the penis\""
      }
    ]
  },
  {
    "id": "hss2011-uro-female-reproductive-pelvis",
    "subject": "HSS2011",
    "unit": "hss.m3",
    "type": "concept",
    "title": "Female reproductive anatomy: ovary, uterine tubes, uterus and wall, vagina, vulva and pelvic position",
    "tags": [
      "urogenital",
      "female-reproductive",
      "pelvis",
      "high-yield"
    ],
    "practice": [
      {
        "type": "cloze",
        "prompt": "After ovulation, the ovum will be captured by the ______ and it will stay in the ______ of the uterine tube for fertilization.",
        "accept": [
          "fimbriae; ampulla",
          "fimbriae, ampulla"
        ],
        "explanation": "Fimbriae sweep the egg into the infundibulum; fertilisation happens in the ampulla — the recurring blank and 2017 labels [28]–[30].",
        "src": {
          "ref": "hss.fib5yr",
          "location": "p9 \"ampulla of the uterine tube for fertilization\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The portion of the uterine tube that contains the fimbriae is known as the ______.",
        "accept": [
          "infundibulum"
        ],
        "explanation": "The infundibulum — the expanded funnel near the ovary.",
        "src": {
          "ref": "hss.fib5yr",
          "location": "p11 \"contains the fimbriae is known as the\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The uterine wall consists of an inner ______, a muscular ______, and a superficial ______ (an incomplete serous layer).",
        "accept": [
          "endometrium; myometrium; perimetrium",
          "endometrium, myometrium, perimetrium"
        ],
        "explanation": "Endometrium ~10% cyclic; myometrium ~90% muscular; perimetrium the incomplete serosa — the five-year blank row.",
        "src": {
          "ref": "hss.fib5yr",
          "location": "p12 \"Endometrium + myometrium + perimetrium\""
        }
      },
      {
        "type": "mcq",
        "prompt": "The constricted passageway area between the internal os and external os is the:",
        "options": [
          "Cervical canal",
          "Uterine cavity",
          "Isthmus",
          "Fundus"
        ],
        "answer": 0,
        "explanation": "Model answer A: the cervical canal — inside the cervix, between internal and external os.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p36 \"passageway area between the internal os and external os\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The epithelial fold that partially blocks the entrance of the vagina is known as the ______.",
        "accept": [
          "hymen"
        ],
        "explanation": "Model answer: hymen — an elastic epithelial fold, usually ruptured by first intercourse or tampon use.",
        "src": {
          "ref": "hss.revans",
          "location": "p3 \"Hymen\""
        }
      },
      {
        "type": "mcq",
        "prompt": "The connective-tissue layer of the ovary that contains blood vessels and nerves is the:",
        "options": [
          "Cortex",
          "Medulla",
          "Tunica albuginea",
          "Germinal epithelium"
        ],
        "answer": 1,
        "explanation": "The medulla of the ovary carries vessels and nerves; the cortex produces gametes; tunica albuginea is the capsule.",
        "src": {
          "ref": "hss.fib5yr",
          "location": "p10 \"medulla of ovary\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A 28-year-old with left-sided pelvic pain and a positive pregnancy test has an ultrasound showing a mass in the left adnexa and free fluid in a peritoneal pouch behind the uterus. Name the most likely implantation site, the segment of tube it involves, the pouch holding the fluid, and the structure a surgeon traverses reaching it from the vagina.",
        "model": "This is an ectopic pregnancy: the most common implantation site is the uterine tube, specifically its AMPULLA — the middle, widest segment where fertilisation normally occurs. Rupture bleeds into the peritoneal cavity, pooling in the rectouterine pouch (of Douglas), the most dependent pouch between uterus and rectum. A surgeon reaches it through the posterior vaginal fornix — the recess around the cervix — which directly abuts the pouch; the exam finding is cervical-motion tenderness plus blithe peritoneal fluid. The tube cannot accommodate a growing embryo because it is a narrow muscular tube held by the mesosalpinx portion of the broad ligament.",
        "rubric": [
          "Identifies tubal (ampullary) ectopic as the likely diagnosis",
          "Names the rectouterine pouch as the fluid collection site",
          "Describes the posterior fornix route and why the tube ruptures"
        ]
      }
    ],
    "commonMistakes": [
      "Fertilisation in the uterus or isthmus — it is normally in the AMPULLA.",
      "Giving the endometrium 90% of uterine mass — the MYOMETRIUM is 90%; endometrium ~10%.",
      "Saying the clitoris has a corpus spongiosum — it has paired corpora cavernosa only; the spongiosum-equivalent is the vestibular BULBS (the answer key wants \"clitoris\" for the erectile-tissue blank — know both framings).",
      "Calling the perimetrium complete — it is an INCOMPLETE serous membrane (fundus and posterior body only)."
    ],
    "sourceRefs": [
      {
        "ref": "hss.3.2",
        "location": "p31 \"Ovary\""
      },
      {
        "ref": "hss.3.2",
        "location": "p32 \"Tunica albuginea\""
      },
      {
        "ref": "hss.3.2",
        "location": "p32 \"Stroma\""
      },
      {
        "ref": "hss.3.2",
        "location": "p32 \"Gametes are produced in\""
      },
      {
        "ref": "hss.3.2",
        "location": "p32 \"Suspensory\""
      },
      {
        "ref": "hss.3.2",
        "location": "p32 \"almond-shaped\""
      },
      {
        "ref": "hss.3.2",
        "location": "p33 \"Infundibulum\""
      },
      {
        "ref": "hss.3.2",
        "location": "p33 \"Ampulla\""
      },
      {
        "ref": "hss.3.2",
        "location": "p33 \"Isthmus\""
      },
      {
        "ref": "hss.3.2",
        "location": "p33 \"Fimbriae\""
      },
      {
        "ref": "hss.3.2",
        "location": "p33 \"Fallopian\""
      },
      {
        "ref": "hss.3.2",
        "location": "p33 \"Ciliated inner surface\""
      },
      {
        "ref": "hss.3.2",
        "location": "p34 \"Fundus\""
      },
      {
        "ref": "hss.3.2",
        "location": "p34 \"Cervical canal\""
      },
      {
        "ref": "hss.3.2",
        "location": "p34 \"Isthmus of uterus\""
      },
      {
        "ref": "hss.3.2",
        "location": "p34 \"1.25 cm\""
      },
      {
        "ref": "hss.3.2",
        "location": "p34 \"Pear-shaped\""
      },
      {
        "ref": "hss.3.2",
        "location": "p35 \"90% of the uterine\""
      },
      {
        "ref": "hss.3.2",
        "location": "p35 \"10% of the\""
      },
      {
        "ref": "hss.3.2",
        "location": "p35 \"incomplete serous\""
      },
      {
        "ref": "hss.3.2",
        "location": "p35 \"longitudinal, circular, and\""
      },
      {
        "ref": "hss.3.2",
        "location": "p35 \"menses\""
      },
      {
        "ref": "hss.3.2",
        "location": "p36 \"internal iliac\""
      },
      {
        "ref": "hss.3.2",
        "location": "p36 \"uterine arteries\""
      },
      {
        "ref": "hss.3.2",
        "location": "p36 \"Anastamose\""
      },
      {
        "ref": "hss.3.2",
        "location": "p36 \"broad ligament\""
      },
      {
        "ref": "hss.3.2",
        "location": "p37 \"Fornix\""
      },
      {
        "ref": "hss.3.2",
        "location": "p37 \"Hymen\""
      },
      {
        "ref": "hss.3.2",
        "location": "p37 \"Rectum, posteriorly\""
      },
      {
        "ref": "hss.3.2",
        "location": "p37 \"Urethra, anteriorly\""
      },
      {
        "ref": "hss.3.2",
        "location": "p37 \"Highly distensible\""
      },
      {
        "ref": "hss.3.2",
        "location": "p37 \"partially blocks entrance\""
      },
      {
        "ref": "hss.3.2",
        "location": "p38 \"Greater vestibular\""
      },
      {
        "ref": "hss.3.2",
        "location": "p38 \"Lesser vestibular glands\""
      },
      {
        "ref": "hss.3.2",
        "location": "p38 \"Vestibule\""
      },
      {
        "ref": "hss.3.2",
        "location": "p39 \"corpus spongiosum\""
      },
      {
        "ref": "hss.3.2",
        "location": "p39 \"corpora cavernosa\""
      },
      {
        "ref": "hss.3.2",
        "location": "p39 \"no urinary role\""
      },
      {
        "ref": "hss.3.2",
        "location": "p39 \"Vestibular bulbs\""
      },
      {
        "ref": "hss.3.2",
        "location": "p39 \"crura\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p53 \"Vesicouterine\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p53 \"Rectouterine pouch\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p53 \"Levator\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p54 \"broad ligament\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p54 \"Anteflexion\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p54 \"Anteversion\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p54 \"rests on the superior surface\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p56 \"Bartholin's gland\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p9 \"ovum will be captured by the fimbriae\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p10 \"medulla of ovary\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p10 \"ovarian ligament\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p10 \"suspensory ligament\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p10 \"uterosacral\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p12 \"Endometrium + myometrium + perimetrium\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"Hymen\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"Clitoris\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"Fimbriae; ampulla; uterine (fallopian) tube\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"Fundus\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p36 \"passageway area between the internal os and external os\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p36 \"epithelial fold that partially blocks the entrance\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p38 \"ovum will be captured by the\""
      }
    ]
  },
  {
    "id": "hss2011-uro-tutorial-pastpaper-practice",
    "subject": "HSS2011",
    "unit": "hss.m3",
    "type": "cloze",
    "title": "Urogenital system: worked revision exercises and past-paper practice (Modules 3.2 and 3.3)",
    "tags": [
      "urogenital",
      "assessment",
      "tutorial",
      "high-yield"
    ],
    "practice": [
      {
        "type": "cloze",
        "prompt": "Model-answer check: the pair of glands at the base of the penis are the ______ glands; the bladder's powerful muscularis muscle is the ______; the cup receiving a renal papilla's urine is a minor ______.",
        "accept": [
          "bulbourethral; detrusor; calyx",
          "bulbourethral, detrusor, calyx"
        ],
        "explanation": "The three anatomical FIBs of Module 3.2 — all answer-key exact.",
        "src": {
          "ref": "hss.revans",
          "location": "p3 \"Bulbourethral\""
        }
      },
      {
        "type": "mcq",
        "prompt": "The ______ is the most superior part of the stomach (3.3 FIB), while the ______ is the rounded part of the uterus above the tube attachment.",
        "options": [
          "Fundus; fundus",
          "Cardia; fundus",
          "Fundus; cervix",
          "Body; fundus"
        ],
        "answer": 0,
        "explanation": "\"Fundus\" names the dome in BOTH organs — a favourite paired-blank trap.",
        "src": {
          "ref": "hss.revans",
          "location": "p3 \"Fundus\""
        }
      },
      {
        "type": "cloze",
        "prompt": "2017 exam labels: the uterine-tube regions [28], [29], [30] are the ______, ______ and ______.",
        "accept": [
          "infundibulum, ampulla, isthmus",
          "infundibulum; ampulla; isthmus"
        ],
        "explanation": "From ovary side to uterus: infundibulum (fimbriae), ampulla, isthmus.",
        "src": {
          "ref": "hss.pp1718",
          "location": "p3 \"Regions of the uterine tube (posterior view)\""
        }
      },
      {
        "type": "mcq",
        "prompt": "The ureter penetrates the ______ wall of the urinary bladder (5-year repeater):",
        "options": [
          "anterior",
          "posterior",
          "lateral",
          "superior"
        ],
        "answer": 1,
        "explanation": "POSTERIOR — at an oblique angle, forming the anti-reflux valve.",
        "src": {
          "ref": "hss.pp1718",
          "location": "p3 \"penetrates the\""
        }
      },
      {
        "type": "cloze",
        "prompt": "Crossword-check: the muscle wrinkling the scrotal skin is the ______; the muscle retracting the testes is the ______; the renal vessel entry/exit is the ______.",
        "accept": [
          "dartos; cremaster; hilum",
          "dartos, cremaster, hilum"
        ],
        "explanation": "Dartos (smooth, wrinkles), cremaster (skeletal, retracts), hilum — all Module-3 crossword answers.",
        "src": {
          "ref": "hss.revans",
          "location": "p4 \"Cremaster\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which of these does NOT originate from the aorta?",
        "options": [
          "Suprarenal artery",
          "Testicular artery",
          "Uterine artery",
          "Ovarian artery"
        ],
        "answer": 2,
        "explanation": "Model answer C: the uterine artery arises from the INTERNAL ILIAC artery; gonadal and suprarenal arteries come from the aorta.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p38 \"NOT originate from the aorta\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "Run a five-minute mock for a classmate covering Module 3: ask one FIB from each of the five-year repeater rows (hilum, ureter, corpus spongiosum, seminal gland, cremaster) plus the tube-segment labelling. Which five wrong answers should you expect, and what is the correction for each?",
        "model": "Expect: (1) \"renal pelvis\" or \"medulla\" for the vessel entry/exit — correct to the HILUM; (2) \"anterior\" or \"superior\" bladder wall — correct to POSTERIOR (oblique, anti-reflux); (3) corpora cavernosa enclosing the urethra — correct to the corpus SPONGIOSUM; (4) prostate as the 60%-of-semen gland — correct to the SEMINAL GLAND (prostate adds the rest, bulbourethral the pre-ejaculate); (5) dartos retracting the testes — correct to the CREMASTER (dartos wrinkles), and the tube segments in order infundibulum→ampulla→isthmus, NOT isthmus first.",
        "rubric": [
          "Asks all five repeater FIBs plus the tube labelling",
          "Catches all five predictable wrong answers",
          "Gives the deck-correct answer for each with the distinguishing detail"
        ]
      }
    ],
    "commonMistakes": [
      "Writing \"renal pelvis\" where the blank wants the hilum.",
      "Writing \"hepatic vein\"-style shortcuts — in 3.2 the trap pair is clitoris vs vestibular bulbs; give the answer-key term but know the deck equivalence.",
      "Ordering the uterine tube isthmus → ampulla → infundibulum — it runs infundibulum → ampulla → isthmus from the ovary.",
      "Claiming the uterine artery comes from the aorta — it springs from the internal iliac."
    ],
    "sourceRefs": [
      {
        "ref": "hss.revans",
        "location": "p3 \"Bulbourethral\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"Detrusor\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"Calyx\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"Clitoris\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"Hymen\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"Psoas; Quadratus lumborum; erector spinae\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"The 10th thoracic vertebra (T10)\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"Fundus\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"Fimbriae; ampulla; uterine (fallopian) tube\""
      },
      {
        "ref": "hss.revans",
        "location": "p4 \"Ureteropelvic junction\""
      },
      {
        "ref": "hss.revans",
        "location": "p4 \"Left kidney\""
      },
      {
        "ref": "hss.revans",
        "location": "p4 \"Spleen\""
      },
      {
        "ref": "hss.revans",
        "location": "p4 \"Trigone\""
      },
      {
        "ref": "hss.revans",
        "location": "p4 \"Cremaster\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p36 \"arch along the boundary between the cortex and medulla\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p36 \"tubular portion that is distal to the loop of Henle\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p36 \"Spermatic cord contains the following except\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p36 \"passageway area between the internal os and external os\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p36 \"How many efferent ductules\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p38 \"NOT originate from the aorta\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p38 \"most superior part of the stomach\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p12 \"Hilum: entry and exit of renal vessels\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p12 \"Ureter penetrates posterior wall\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p12 \"cremaster muscle\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p12 \"Glomerulus: compact ball\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p12 \"pampiniform plexus\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p12 \"blood-testis barrier: sustentacular cells\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p12 \"medulla of ovary: blood vessels and nerves\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p12 \"Uterosacral + ovarian + suspensory ligament\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p12 \"minor calyx\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p12 \"seminiferous tubules\""
      },
      {
        "ref": "hss.pp1718",
        "location": "p3 \"point of entry and exit of renal vessels\""
      },
      {
        "ref": "hss.pp1718",
        "location": "p3 \"conveys urine from the kidney to the bladder\""
      },
      {
        "ref": "hss.pp1718",
        "location": "p3 \"active secretory structure posterior\""
      },
      {
        "ref": "hss.pp1718",
        "location": "p3 \"tenses the scrotum taut\""
      },
      {
        "ref": "hss.pp1718",
        "location": "p3 \"Regions of the uterine tube (posterior view)\""
      }
    ]
  }
,
  {
    "id": "hss2011-tissues-junctions-epithelia",
    "subject": "HSS2011",
    "unit": "hss.term",
    "type": "concept",
    "title": "Body tissues: intercellular junctions, epithelial classifications, and skin keratinization",
    "tags": [
      "tissues",
      "histology",
      "epithelium",
      "cell-junctions",
      "skin",
      "high-yield"
    ],
    "practice": [
      {
        "type": "matching",
        "prompt": "Match each epithelial tissue type to its characteristic anatomical location.",
        "pairs": [
          [
            "Simple squamous epithelium",
            "Alveoli of lungs and blood vessel endothelium"
          ],
          [
            "Simple cuboidal epithelium",
            "Kidney tubules and ducts of small glands"
          ],
          [
            "Pseudostratified ciliated columnar",
            "Trachea and upper respiratory tract"
          ],
          [
            "Transitional epithelium (urothelium)",
            "Urinary bladder and ureters"
          ]
        ],
        "explanation": "These anatomical pairings reflect the physiological demands for diffusion, secretion, mucociliary clearance, and distensibility."
      },
      {
        "type": "mcq",
        "prompt": "Under high-power histological examination of the oral mucosa, flattened superficial squamous cells clearly retain visible cellular nuclei. Which specific epithelial classification does this represent?",
        "options": [
          "Keratinized stratified squamous epithelium",
          "Parakeratinized / non-keratinized stratified squamous epithelium",
          "Pseudostratified columnar epithelium",
          "Simple cuboidal epithelium"
        ],
        "answer": 1,
        "explanation": "Parakeratinized / non-keratinized stratified squamous epithelium lines moist internal cavities like the mouth and esophagus; its superficial cells remain viable and retain visible nuclei, unlike the anucleated dead corneocytes of skin epidermis."
      },
      {
        "type": "mcq",
        "prompt": "Which intercellular junction consists of hexameric assemblies of connexin proteins forming open channels that permit electrical coupling between cells?",
        "options": [
          "Tight junction (zonula occludens)",
          "Desmosome (macula adherens)",
          "Gap junction (nexus)",
          "Hemidesmosome"
        ],
        "answer": 2,
        "explanation": "Gap junctions are formed by pairs of connexons (each composed of six connexin proteins) bridging adjacent plasma membranes to permit rapid ionic diffusion."
      }
    ],
    "commonMistakes": [
      "Assuming parakeratinized epithelium has dead, anucleate surface cells: parakeratinized cells retain their nuclei, unlike fully keratinized skin.",
      "Confusing desmosomes with gap junctions: desmosomes provide mechanical anchoring against tearing; gap junctions provide electrical and ionic communication."
    ],
    "sourceRefs": [
      {
        "ref": "hss.tut.tissues",
        "location": "Slides 4–8 Structural organization, body tissues overview, and intercellular junctions (tight, adherent/desmosomes, gap junctions with connexons)"
      },
      {
        "ref": "hss.tut.tissues",
        "location": "Slides 9–15 Four primary tissues, epithelial characteristics, simple squamous/cuboidal/columnar, pseudostratified columnar, stratified squamous/cuboidal/columnar, and transitional"
      },
      {
        "ref": "hss.tut.tissues",
        "location": "Slide 16 Epithelial specialised tissue: keratinized (epidermis, dead cells, no nuclei, waterproof) vs parakeratinized (mouth, esophagus, apical cells have nuclei)"
      },
      {
        "ref": "hss.tut.tissues",
        "location": "Slides 17–22 Connective tissue (ground substance, collagen/elastin/reticular fibers, cells, water; blood/lymph lack fiber), muscle tissue, and nervous tissue"
      }
    ]
  }
];
