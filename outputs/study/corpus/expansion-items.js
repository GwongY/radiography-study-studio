/*
 * Expansion batch — fills gaps found in a coverage audit.
 *
 * Split out of study-data.js in phase 2026-09-01. outputs/study-data.js is
 * the barrel every importer still uses; nothing imports this file directly
 * except its siblings.
 */

/* ------------------------------------------------------------------ *
 * Expansion batch — fills gaps found in a coverage audit
 * ------------------------------------------------------------------ */

export const EXPANSION_ITEMS = [
  {
    "id": "hss2011-terminology-word-parts",
    "subject": "HSS2011",
    "unit": "hss.term",
    "type": "matching",
    "title": "Word parts — prefixes, suffixes and roots",
    "tags": [
      "terminology",
      "foundation",
      "high-yield"
    ],
    "practice": [
      {
        "type": "matching",
        "prompt": "Match each medical prefix to its verified syllabus meaning.",
        "pairs": [
          [
            "epi-",
            "Above, upon"
          ],
          [
            "hypo-",
            "Below; deficient"
          ],
          [
            "inter-",
            "Between"
          ],
          [
            "retro-",
            "Backward, behind"
          ],
          [
            "pre-",
            "Before, in front of"
          ],
          [
            "post-",
            "Behind, after"
          ]
        ],
        "explanation": "Sourced from the HSS2011 Module 0 word parts reference document prepared by Josephine Lau."
      },
      {
        "type": "matching",
        "prompt": "Match each diagnostic or surgical suffix to its correct definition.",
        "pairs": [
          [
            "-itis",
            "Inflammation"
          ],
          [
            "-osis",
            "Abnormal condition"
          ],
          [
            "-emia",
            "Blood condition"
          ],
          [
            "-tomy",
            "Incision, cutting"
          ],
          [
            "-stomy",
            "New opening"
          ],
          [
            "-graphy",
            "Process of recording"
          ]
        ],
        "explanation": "Official medical suffix definitions from HSS2011 foundational glossary."
      },
      {
        "type": "typed",
        "prompt": "Which root refers to cartilage in medical terminology?",
        "accept": [
          "chondr/o",
          "chondro",
          "cartilag/o",
          "chondr"
        ],
        "explanation": "chondr/o (and cartilag/o) refers to cartilage, as in chondrocyte, synchondrosis, and costochondritis."
      },
      {
        "type": "mcq",
        "prompt": "A diagnostic imaging procedure ending in \"-graphy\" designates which of the following?",
        "options": [
          "The process of recording an image",
          "The physical instrument utilized to record",
          "The finished radiograph film or image record",
          "A surgical incision into a blood vessel"
        ],
        "answer": 0,
        "explanation": "-graphy is the active process of recording (e.g., radiography, computed tomography). -graph is the recording instrument, -gram is the recorded image, and -tomy is incision."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "In a medical emergency handover, a clinician reports that a trauma patient presents with \"acute hemopericardium and bilateral retroperitoneal hematomas\". Deconstruct the anatomical and pathological terms into their roots, prefixes, and suffixes, and explain the physical locations of the bleeding.",
        "model": "1. Hemopericardium: hemo- (blood) + peri- (around) + cardi/o (heart) + -um (tissue/structure). This indicates blood accumulating within the pericardial sac surrounding the heart wall.\n2. Retroperitoneal: retro- (behind/backward) + peritone/o (peritoneum) + -al (pertaining to). This indicates bleeding located behind the posterior parietal peritoneum (where the kidneys, abdominal aorta, and IVC lie).\n3. Hematoma: hemat/o (blood) + -oma (mass/tumor). A localized collection of extravasated blood.",
        "rubric": [
          "Deconstructs hemopericardium into blood within the pericardial sac",
          "Deconstructs retroperitoneal into posterior to the peritoneal membrane",
          "Identifies the exact physical structures and bleeding compartments"
        ]
      }
    ],
    "commonMistakes": [
      "Confusing -tomy (surgical incision / cutting into) with -stomy (creation of a new permanent artificial opening).",
      "Confusing -graphy (the imaging examination process) with -gram (the actual picture or report generated).",
      "Reading hypo- purely as spatial \"below\"; in biochemical terms it indicates numerical deficiency (e.g., hypocalcemia)."
    ],
    "sourceRefs": [
      {
        "ref": "hss.wordparts",
        "location": "p1 \"above, upon epi-\""
      },
      {
        "ref": "hss.wordparts",
        "location": "p1 \"abnormal condition -osis\""
      },
      {
        "ref": "hss.wordparts",
        "location": "p2 \"blood condition -emia\""
      },
      {
        "ref": "hss.wordparts",
        "location": "p2 \"below hypo-\""
      },
      {
        "ref": "hss.wordparts",
        "location": "p2 \"between inter-\""
      },
      {
        "ref": "hss.wordparts",
        "location": "p2 \"before, in front of pre-\""
      },
      {
        "ref": "hss.wordparts",
        "location": "p2 \"behind, after post-\""
      },
      {
        "ref": "hss.wordparts",
        "location": "p2 \"backward retro-\""
      },
      {
        "ref": "hss.wordparts",
        "location": "p3 \"cartilage cartilag/o, chondr/o\""
      }
    ]
  },
  {
    "id": "hss2011-joints-synovial-types",
    "subject": "HSS2011",
    "unit": "hss.joints",
    "type": "comparison",
    "title": "The six synovial joint types, with examples",
    "tags": [
      "joints",
      "high-yield",
      "foundation"
    ],
    "practice": [
      {
        "type": "matching",
        "prompt": "Match each of the six synovial joint types to its verified textbook example.",
        "pairs": [
          [
            "Hinge joint",
            "Humero-ulnar joint (elbow)"
          ],
          [
            "Pivot joint",
            "Proximal radioulnar joint"
          ],
          [
            "Condylar joint",
            "Radiocarpal joint (wrist)"
          ],
          [
            "Saddle joint",
            "Carpometacarpal joint of thumb"
          ],
          [
            "Plane joint",
            "Inter-carpal joints and spinal facet joints"
          ],
          [
            "Ball-and-socket joint",
            "Glenohumeral (shoulder) and hip joints"
          ]
        ],
        "explanation": "Standard classification from HSS2011 Module 4.1 slide deck."
      },
      {
        "type": "mcq",
        "prompt": "In a monoaxial (uniaxial) joint,",
        "options": [
          "Movement can occur in only one plane.",
          "Movement can occur in two planes.",
          "Movement can occur in all three planes.",
          "Only circumduction is possible"
        ],
        "answer": 0,
        "explanation": "Model answer A. Monoaxial (uniaxial) joints allow movement in one plane only (e.g., hinge and pivot joints).",
        "src": {
          "ref": "hss.revans",
          "location": "Module 4.1, MCQ 3 \"3. A\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which synovial joint type uniquely features articulating surfaces that are reciprocally concave in one direction and convex in another, permitting opposition?",
        "options": [
          "Condylar joint",
          "Saddle joint",
          "Pivot joint",
          "Plane joint"
        ],
        "answer": 1,
        "explanation": "A saddle joint (specifically the first CMC joint of the thumb) features reciprocally concave-convex surfaces that enable thumb opposition."
      },
      {
        "type": "sequence",
        "prompt": "Arrange these synovial joint types by increasing degrees of freedom (number of angular planes allowed).",
        "items": [
          "Hinge joint (uniaxial / monoaxial: 1 plane)",
          "Condylar joint (biaxial: 2 planes)",
          "Ball-and-socket joint (polyaxial / multiaxial: 3 planes)"
        ],
        "explanation": "Hinge allows 1 plane (flexion/extension); condylar allows 2 planes; ball-and-socket allows 3 planes plus rotation."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A student claims that the elbow region contains only one joint type because it simply bends and straightens. Refute this claim using the precise functional anatomy of the elbow and radioulnar articulations.",
        "model": "The anatomical elbow region actually houses two structurally distinct synovial joints that share an articular capsule: (1) The humero-ulnar joint, which is a uniaxial hinge joint allowing angular flexion and extension in the sagittal plane; and (2) The proximal radioulnar joint, which is a uniaxial pivot joint allowing axial rotation (pronation and supination) as the radial head spins within the radial notch of the ulna. Thus, two distinct joint types operate side by side at the elbow.",
        "rubric": [
          "Identifies the humero-ulnar articulation as a hinge joint performing flexion/extension",
          "Identifies the proximal radioulnar articulation as a pivot joint performing rotation (pronation/supination)",
          "Concludes that two distinct functional joint types share the elbow region"
        ]
      }
    ],
    "commonMistakes": [
      "Calling the wrist a hinge joint; it is condylar (biaxial) because it abducts/adducts in addition to flexing/extending.",
      "Believing pivot joints allow angular flexion; pivot joints only allow rotation around a central longitudinal axis.",
      "Assuming the knee is a simple ball-and-socket; it is a modified hinge joint."
    ],
    "sourceRefs": [
      {
        "ref": "hss.4.1",
        "location": "p36 \"hinge\""
      },
      {
        "ref": "hss.4.1",
        "location": "p36 \"pivot\""
      },
      {
        "ref": "hss.4.1",
        "location": "p36 \"condylar\""
      },
      {
        "ref": "hss.4.1",
        "location": "p36 \"saddle\""
      },
      {
        "ref": "hss.4.1",
        "location": "p36 \"plane\""
      },
      {
        "ref": "hss.4.1",
        "location": "p36 \"ball-and-socket\""
      },
      {
        "ref": "hss.4.1",
        "location": "p47 \"allow angular\""
      },
      {
        "ref": "hss.4.1",
        "location": "p47 \"movement in one\""
      },
      {
        "ref": "hss.4.1",
        "location": "p47 \"direction and in one\""
      },
      {
        "ref": "hss.4.1",
        "location": "p47 \"plane e.g. flexion and\""
      },
      {
        "ref": "hss.4.1",
        "location": "p47 \"extension\""
      },
      {
        "ref": "hss.4.1",
        "location": "p47 \"humero-ulnar joint\""
      },
      {
        "ref": "hss.4.1",
        "location": "p48 \"allow rotary movement\""
      },
      {
        "ref": "hss.4.1",
        "location": "p48 \"in one axis\""
      },
      {
        "ref": "hss.4.1",
        "location": "p48 \"proximal radioulnar\""
      },
      {
        "ref": "hss.4.1",
        "location": "p49 \"angular movement in\""
      },
      {
        "ref": "hss.4.1",
        "location": "p49 \"two directions\""
      },
      {
        "ref": "hss.4.1",
        "location": "p49 \"oval shaped head,\""
      },
      {
        "ref": "hss.4.1",
        "location": "p49 \"elliptical cavity\""
      },
      {
        "ref": "hss.4.1",
        "location": "p49 \"wrist joint\""
      },
      {
        "ref": "hss.4.1",
        "location": "p51 \"articular surface of\""
      },
      {
        "ref": "hss.4.1",
        "location": "p51 \"each articular bones is\""
      },
      {
        "ref": "hss.4.1",
        "location": "p51 \"concave in one\""
      },
      {
        "ref": "hss.4.1",
        "location": "p51 \"direction and convex in\""
      },
      {
        "ref": "hss.4.1",
        "location": "p51 \"another\""
      },
      {
        "ref": "hss.4.1",
        "location": "p51 \"carpo-metacarpal\""
      },
      {
        "ref": "hss.4.1",
        "location": "p53 \"permit gliding\""
      },
      {
        "ref": "hss.4.1",
        "location": "p53 \"movement only\""
      },
      {
        "ref": "hss.4.1",
        "location": "p53 \"inter-carpal joints\""
      },
      {
        "ref": "hss.4.1",
        "location": "p54 \"allows angular\""
      },
      {
        "ref": "hss.4.1",
        "location": "p54 \"movement in all\""
      },
      {
        "ref": "hss.4.1",
        "location": "p54 \"directions and a pivot\""
      },
      {
        "ref": "hss.4.1",
        "location": "p54 \"movement\""
      },
      {
        "ref": "hss.4.1",
        "location": "p54 \"hip joint, gleno-\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p21 \"Elbow joints\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p23 \"Radiocarpal joint\""
      },
      {
        "ref": "hss.revans",
        "location": "p1 \"3. A\""
      }
    ]
  },
  {
    "id": "hss2011-pastpaper-joints-articulations",
    "subject": "HSS2011",
    "unit": "hss.joints",
    "type": "cloze",
    "title": "Past-paper drill — joints and articulations",
    "tags": [
      "joints",
      "exam",
      "high-yield",
      "foundation"
    ],
    "practice": [
      {
        "type": "cloze",
        "prompt": "A(n) ______ (prime mover) is a muscle whose contraction is mostly responsible for producing a specific movement, whereas a(n) ______ is a muscle whose action opposes that of a prime mover. A(n) ______ is a muscle that assists a prime mover in performing its primary actions, and a(n) ______ is a muscle that stabilizes the origin of the prime mover.",
        "accept": [
          "agonist; antagonist; synergist; fixator",
          "agonist, antagonist, synergist, fixator",
          "agonist and antagonist and synergist and fixator"
        ],
        "explanation": "Model answer from past exam fill-in-the-blanks: agonist, antagonist, synergist, fixator.",
        "src": {
          "ref": "hss.fib5yr",
          "location": "p24 \"agonist (prime mover) whose contraction is mostly responsible for producing a specific movement.\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The intervertebral disc is typed as a ______ joint, located between the vertebral ______ of two adjacent vertebrae.",
        "accept": [
          "cartilaginous; bodies",
          "cartilaginous, bodies",
          "symphysis; bodies",
          "cartilaginous and bodies"
        ],
        "explanation": "Cartilaginous (symphysis), bodies. Inter-body spinal joints are secondary cartilaginous joints.",
        "src": {
          "ref": "hss.4.1",
          "location": "Slide \"Cartilaginous joints — Symphyses\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The medial end of the clavicle articulates with the sternum to form the ______ joint.",
        "accept": [
          "sternoclavicular",
          "sternoclavicular joint"
        ],
        "explanation": "Sternoclavicular joint — the only bony joint linking the upper appendicular limb to the axial skeleton.",
        "src": {
          "ref": "hss.4.3",
          "location": "Slide \"Joints Around Shoulder Region\", Fig. 8-2"
        }
      },
      {
        "type": "cloze",
        "prompt": "The carpal bones articulate with the radius to form the ______ joint.",
        "accept": [
          "radiocarpal",
          "wrist",
          "radiocarpal (wrist)",
          "radiocarpal joint",
          "wrist joint"
        ],
        "explanation": "Radiocarpal (wrist) joint. The articular surfaces are the radius and the proximal carpal row (scaphoid, lunate, triquetrum).",
        "src": {
          "ref": "hss.m0.1718",
          "location": "L1 p45 right wrist (radiocarpal) joint"
        }
      },
      {
        "type": "cloze",
        "prompt": "The largest sesamoid bone in the human body is the ______.",
        "accept": [
          "patella",
          "kneecap"
        ],
        "explanation": "The patella. Sesamoid bones develop inside tendons to protect the tendon from excessive wear and improve leverage.",
        "src": {
          "ref": "hss.4.1",
          "location": "Slide \"Sesamoid bones\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each past-paper term to its exact verified definition.",
        "pairs": [
          [
            "Agonist",
            "Contraction is mostly responsible for producing a specific movement"
          ],
          [
            "Antagonist",
            "Action opposes that of a prime mover"
          ],
          [
            "Synergist",
            "Assists prime mover and stabilises intervening joints"
          ],
          [
            "Fixator",
            "Stabilises the origin of the prime mover"
          ],
          [
            "Ligament",
            "Tough collagenous tissue binding one bone to another"
          ],
          [
            "Fibrous capsule",
            "Thick layer of dense connective tissue around joint"
          ]
        ],
        "explanation": "Definitions directly transcribed from verified 5-year exam paper keys."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "During powerful flexion of the fingers to grasp an object, the wrist joint must be held firmly in slight extension. Explain how agonists, antagonists, synergists, and fixators operate together to make effective hand grip possible.",
        "model": "In finger flexion, the flexor digitorum superficialis and profundus act as agonists (prime movers). The extensor digitorum acts as the antagonist and must relax to permit finger curling. Because the finger flexors cross both the wrist and finger joints, their contraction would also flex the wrist into a weak, collapsed position. To prevent this, the wrist extensors (extensor carpi radialis longus/brevis and extensor carpi ulnaris) contract as synergists to stabilize the intervening wrist joint in extension, maintaining an optimal sarcomere length-tension relationship. Meanwhile, scapular and shoulder muscles act as fixators to anchor the arm and forearm origins.",
        "rubric": [
          "Identifies finger flexors as agonists and finger extensors as antagonists",
          "Identifies wrist extensors as synergists stabilizing the intervening wrist joint",
          "Identifies shoulder/scapular muscles as fixators stabilizing the muscle origins"
        ]
      }
    ],
    "commonMistakes": [
      "Answering \"cartilage\" when asked for the joint type of an intervertebral disc; the question asks for the joint class (cartilaginous or symphysis).",
      "Confusing synergists (assist prime mover and stabilize intervening joints) with fixators (specifically stabilize the origin bone of the prime mover).",
      "Naming the acromioclavicular joint for the medial clavicle; medial is sternal (sternoclavicular joint)."
    ],
    "sourceRefs": [
      {
        "ref": "hss.fib5yr",
        "location": "p24 \"agonist (prime mover) whose contraction is mostly responsible for producing a specific movement.\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p24 \"antagonist is a muscle whose action opposes that of a prime mover.\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p24 \"synergist is a muscle that assists a prime mover in performing its primary actions.\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p24 \"fixator is a muscle that stabilizes the origin of the prime mover.\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p24 \"fibrous capsule composed of a thick layer of dense connective tissue.\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p24 \"ligament of a joint is a cord or band of tough collagenous tissue binding one bone to another.\""
      },
      {
        "ref": "hss.4.1",
        "location": "p66 \"Agonists contract\""
      },
      {
        "ref": "hss.4.1",
        "location": "p66 \"Antagonists relax\""
      },
      {
        "ref": "hss.4.1",
        "location": "p67 \"when an agonist mm cross over more\""
      },
      {
        "ref": "hss.4.1",
        "location": "p67 \"than one joint\""
      },
      {
        "ref": "hss.4.1",
        "location": "p67 \"other muscles stabilise\""
      },
      {
        "ref": "hss.4.1",
        "location": "p67 \"intervening joints\""
      }
    ]
  },
        {
    "id": "abct2326-cvs-conduction",
    "subject": "ABCT2326",
    "unit": "phys.cvs",
    "type": "sequence",
    "title": "The cardiac conducting system",
    "tags": [
      "cardiovascular",
      "high-yield",
      "conduction",
      "pacemaker",
      "action-potential",
      "sa-node",
      "av-node"
    ],
    "priorKnowledge": {
      "level": "dse-bio",
      "covers": "part",
      "dsePart": "elective-hp",
      "syllabusRef": { "ref": "edb.bio", "location": "Elective V(c) \"Regulation of gas content in blood\" — \"Control of cardiac output: heart rate and stroke volume, Pacemaker and cardiac cycle\". The elective names the pacemaker; it does not go inside it." },
      sources: [
        {
          "ref": "phys.2",
          "location": "p41 \"Two types of cardiac muscle cells\""
        },
        {
          "ref": "phys.2",
          "location": "p43 \"Structures of the Conducting System\""
        },
        {
          "ref": "phys.2",
          "location": "p44 \"Conducting Cells\""
        },
        {
          "ref": "phys.2",
          "location": "p47 \"Prepotential\""
        },
        {
          "ref": "phys.2",
          "location": "p49 \"From SA node to AV node\""
        },
        {
          "ref": "phys.2",
          "location": "p50 \"Delays impulse\""
        },
        {
          "ref": "phys.2",
          "location": "p51 \"The AV Bundle\""
        },
        {
          "ref": "phys.2",
          "location": "p52 \"Purkinje Fibers\""
        },
        {
          "ref": "phys.2",
          "location": "p53 \"resting membrane potential\""
        }
      ]
    },
    "practice": [
      {
        "type": "sequence",
        "prompt": "Order the anatomical structures of the cardiac conducting system through which an action potential travels during a single normal heartbeat.",
        "items": [
          "Sinoatrial (SA) node",
          "Internodal atrial pathways",
          "Atrioventricular (AV) node",
          "AV bundle (bundle of His)",
          "Left and right bundle branches",
          "Purkinje fibers"
        ],
        "explanation": "Depolarization begins at the SA node, traverses internodal pathways, pauses at the AV node, travels through the AV bundle and bundle branches, and terminates in Purkinje fibers."
      },
      {
        "type": "matching",
        "prompt": "Match each electrophysiological component with its distinct underlying ion channel mechanism.",
        "pairs": [
          [
            "SA nodal prepotential",
            "Inward funny Na+ current through HCN channels drifting from -60 mV to -40 mV"
          ],
          [
            "SA nodal depolarization upstroke",
            "Ca2+ influx through voltage-gated calcium channels upon reaching -40 mV threshold"
          ],
          [
            "Ventricular myocyte Phase 0 upstroke",
            "Rapid Na+ influx through fast voltage-gated sodium channels"
          ],
          [
            "Ventricular myocyte Phase 2 plateau",
            "Balance between inward slow Ca2+ influx and outward K+ efflux for 200–300 ms"
          ]
        ],
        "explanation": "HCN channels drive the nodal prepotential; Ca2+ drives nodal upstroke; fast Na+ drives ventricular Phase 0; Ca2+/K+ balance sustains the plateau."
      },
      {
        "type": "mcq",
        "prompt": "What is the primary physiological purpose of the ~100-millisecond delay introduced at the atrioventricular (AV) node?",
        "options": [
          "It permits atrial systole to complete and top off ventricular filling before ventricular contraction begins.",
          "It allows time for the pulmonary semilunar valve to close during ventricular diastole.",
          "It prevents action potentials from spreading into the Purkinje fiber network.",
          "It enables the sympathetic nervous system to override parasympathetic vagal tone."
        ],
        "answer": 0,
        "explanation": "The 100 ms AV nodal delay ensures that atrial systole has completely finished transferring blood into the ventricles (providing the end-diastolic atrial kick) before the ventricles are stimulated to contract."
      },
      {
        "type": "typed",
        "prompt": "What membrane channels open in SA nodal cells upon hyperpolarization to generate the spontaneous prepotential drift toward threshold?",
        "accept": [
          "HCN channels",
          "HCN channel",
          "HCN",
          "funny channels",
          "funny channel"
        ],
        "explanation": "Hyperpolarization-activated cyclic nucleotide-gated (HCN) channels open at negative membrane potentials (-60 mV) to generate the inward pacemaker funny current (I_f)."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A 68-year-old male with an acute inferior myocardial infarction develops severe bradycardia (heart rate 34 bpm) and dizziness. The ECG reveals sinus P waves occurring regularly at 78 bpm, completely dissociated from regular, wide QRS complexes occurring at 34 bpm. Coronary angiography confirms occlusion of the right coronary artery, which supplies the AV node. Explain the physiological mechanism underlying this patient arrhythmia and analyze why the ventricular rate is 34 bpm.",
        "model": "The patient has developed complete (third-degree) atrioventricular (AV) block secondary to AV nodal ischemia caused by right coronary artery occlusion. In complete AV block: (1) The SA node continues to discharge normally at its intrinsic rate of 78 bpm, generating regular P waves that depolarize the atria. (2) However, ischemic necrosis/stunning of the AV node completely blocks conduction across the non-conducting fibrous skeleton into the bundle of His; none of the atrial impulses reach the ventricles. (3) Deprived of supraventricular pacing, a distal latent autorhythmic pacemaker in the bundle branches or Purkinje fibers undergoes spontaneous prepotential depolarization to rescue the ventricles (an idioventricular escape rhythm). Because the intrinsic firing rate of Purkinje fibers is very slow (20–40 bpm), the ventricles contract at only 34 bpm. Wide QRS complexes result because the impulse propagates slowly through regular ventricular myocardium rather than through the normal rapid conduction tree.",
        "rubric": [
          "Identifies complete (third-degree) AV block and explains the failure of conduction through the ischemic AV node",
          "Explains the origin of the 34 bpm rhythm as a latent Purkinje / idioventricular escape pacemaker",
          "Explains why the P waves and QRS complexes are completely dissociated (AV dissociation)"
        ]
      }
    ],
    "commonMistakes": [
      "Assuming the SA node action potential upstroke is mediated by fast voltage-gated Na+ channels like neurons and skeletal muscle, whereas nodal upstroke is mediated by voltage-gated Ca2+ channels.",
      "Believing the impulse can jump directly across the fibrous skeleton from atria to ventricles, forgetting that the AV bundle is the sole normal electrical conduit between them.",
      "Confusing the AV nodal delay with heart block, unaware that a 100 ms delay is a normal and vital feature of cardiac synchronization."
    ],
    "sourceRefs": [
      {
        "ref": "phys.2",
        "location": "p41 \"Two types of cardiac muscle cells\""
      },
      {
        "ref": "phys.2",
        "location": "p43 \"Structures of the Conducting System\""
      },
      {
        "ref": "phys.2",
        "location": "p44 \"Conducting Cells\""
      },
      {
        "ref": "phys.2",
        "location": "p45 \"In posterior wall of right atrium\""
      },
      {
        "ref": "phys.2",
        "location": "p47 \"Prepotential\""
      },
      {
        "ref": "phys.2",
        "location": "p49 \"From SA node to AV node\""
      },
      {
        "ref": "phys.2",
        "location": "p50 \"Delays impulse\""
      },
      {
        "ref": "phys.2",
        "location": "p51 \"The AV Bundle\""
      },
      {
        "ref": "phys.2",
        "location": "p52 \"Purkinje Fibers\""
      },
      {
        "ref": "phys.2",
        "location": "p53 \"resting membrane potential\""
      },
      {
        "ref": "phys.2.supp",
        "location": "p4 \"SA node (pacemaker) Action Potential\""
      },
      {
        "ref": "phys.2.supp",
        "location": "p5 \"HCN channels open\""
      },
      {
        "ref": "phys.cvs.tut",
        "location": "p1 \"route of an electrical impulse\""
      },
      {
        "ref": "phys.cvs.tut",
        "location": "p1 \"Do the signals come from pacemaker cell\""
      },
      {
        "ref": "phys.cvs.tut",
        "location": "p2 \"pacemaker that initiates each heart beat\""
      },
      {
        "ref": "phys.cvs.tut",
        "location": "p2 \"40 to 50 bpm\""
      },
      {
        "ref": "phys.cvs.slides.2026",
        "location": "p1 \"passes to the AV node, then to Purkinje fibers\""
      },
      {
        "ref": "phys.cvs.slides.2026",
        "location": "p1 \"reflects APs from ventricle contractile cells\""
      },
      {
        "ref": "phys.cvs.slides.2026",
        "location": "p1 \"HCN channels open\""
      }
    ]
  },
        {
    "id": "abct2326-cvs-ecg-cycle",
    "subject": "ABCT2326",
    "unit": "phys.cvs",
    "type": "definition",
    "title": "ECG waves, the cardiac cycle and heart sounds",
    "tags": [
      "cardiovascular",
      "high-yield",
      "ecg",
      "cardiac-cycle",
      "heart-sounds",
      "hemodynamics",
      "refractory-period"
    ],
    "practice": [
      {
        "type": "matching",
        "prompt": "Match each electrocardiographic or acoustic landmark with its precise physiological event.",
        "pairs": [
          [
            "P wave",
            "Depolarization of atrial myocardium"
          ],
          [
            "QRS complex",
            "Depolarization of ventricular myocardium (masks atrial repolarization)"
          ],
          [
            "First heart sound (S1)",
            "Closure of atrioventricular (tricuspid and mitral) valves at onset of systole"
          ],
          [
            "Second heart sound (S2)",
            "Closure of semilunar (aortic and pulmonary) valves at onset of diastole"
          ]
        ],
        "explanation": "P wave reflects atrial depolarization; QRS reflects ventricular depolarization; S1 is AV valve closure; S2 is semilunar valve closure."
      },
      {
        "type": "sequence",
        "prompt": "Order the mechanical and acoustic phases of the left ventricle during a single cardiac cycle, starting from the end of diastole.",
        "items": [
          "Atrial systole tops off ventricular End-Diastolic Volume (EDV)",
          "Isovolumetric ventricular contraction begins; AV valves close producing S1 (\"lubb\")",
          "Ventricular ejection: intraventricular pressure exceeds aortic pressure and aortic valve opens",
          "Isovolumetric ventricular relaxation begins; semilunar valves close producing S2 (\"dupp\")",
          "Ventricular filling: AV valves open as ventricular pressure falls below atrial pressure"
        ],
        "explanation": "The cycle progresses: atrial systole → isovolumetric contraction (S1) → ejection → isovolumetric relaxation (S2) → passive filling."
      },
      {
        "type": "mcq",
        "prompt": "A patient has an End-Diastolic Volume (EDV) of 135 mL and an End-Systolic Volume (ESV) of 55 mL. What is this patient stroke volume (SV)?",
        "options": [
          "80 mL",
          "190 mL",
          "55 mL",
          "135 mL"
        ],
        "answer": 0,
        "explanation": "Stroke volume is calculated as EDV minus ESV: 135 mL - 55 mL = 80 mL."
      },
      {
        "type": "typed",
        "prompt": "Why is it physiologically impossible for healthy cardiac muscle to undergo tetanic contraction or wave summation?",
        "accept": [
          "long refractory period",
          "long absolute refractory period",
          "prolonged refractory period",
          "prolonged absolute refractory period"
        ],
        "explanation": "The extended 250–300 ms cardiac action potential creates a long absolute refractory period that lasts almost as long as the mechanical twitch, preventing summation and tetany."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "During auscultation of a 22-year-old athlete, the physician detects a loud S1 followed immediately by a sharp systolic ejection murmur heard loudest at the right second intercostal space, followed by a soft S2. Echocardiography demonstrates calcific aortic stenosis. Correlate the auscultatory findings with valve mechanics across the cardiac cycle, and explain what happens to ventricular pressure and End-Systolic Volume (ESV) when the aortic valve orifice is narrowed.",
        "model": "In the cardiac cycle, S1 marks the closure of AV valves as ventricular pressure spikes above atrial pressure. Ventricular ejection then requires intraventricular pressure to exceed aortic pressure (~80 mmHg). In aortic stenosis, the narrowed aortic orifice creates severe outflow resistance. The left ventricle must generate excessively high systolic pressures (often >200 mmHg) to force blood through the stenotic opening, generating high-velocity turbulent flow that produces the harsh systolic ejection murmur heard between S1 and S2. Because of this high afterload, the ventricle cannot eject its normal stroke volume during the ejection period, leaving an elevated residual volume in the chamber at the end of systole; thus, End-Systolic Volume (ESV) is significantly increased.",
        "rubric": [
          "Correlates S1 with AV valve closure and explains that the systolic murmur occurs during ventricular ejection",
          "Explains that stenotic narrowing forces the left ventricle to generate abnormally elevated systolic pressures to overcome outflow resistance",
          "Identifies that high afterload impairs ejection, resulting in an increased End-Systolic Volume (ESV)"
        ]
      }
    ],
    "commonMistakes": [
      "Believing heart sounds are caused by the sound of valves slapping open, when heart sounds are produced by turbulent deceleration of blood as valves snap closed.",
      "Assuming atrial repolarization does not occur because it is not labeled on an ECG, forgetting that it happens simultaneously with ventricular depolarization and is buried under the massive QRS complex.",
      "Confusing the relationship between volumes, thinking stroke volume is added to EDV rather than subtracted from EDV to yield ESV."
    ],
    "sourceRefs": [
      {
        "ref": "phys.2",
        "location": "p55 \"Refractory Periods\""
      },
      {
        "ref": "phys.2",
        "location": "p57 \"A recording of electrical events in the heart\""
      },
      {
        "ref": "phys.2",
        "location": "p58 \"Features of an ECG\""
      },
      {
        "ref": "phys.2",
        "location": "p61 \"Cardiac Cycle\""
      },
      {
        "ref": "phys.2",
        "location": "p62 \"End-diastolic volume\""
      },
      {
        "ref": "phys.2",
        "location": "p63 \"Heart Sounds\""
      },
      {
        "ref": "phys.2",
        "location": "p64 \"Figure 20-18b Heart Sounds.\""
      },
      {
        "ref": "phys.cvs.tut",
        "location": "p1 \"What is electrocardiogram\""
      },
      {
        "ref": "phys.cvs.slides.2026",
        "location": "p1 \"The ECG represents the electrical events of the heart\""
      },
      {
        "ref": "phys.cvs.slides.2026",
        "location": "p1 \"The QRS complex corresponds to the upstroke\""
      },
      {
        "ref": "phys.cvs.slides.2026",
        "location": "p1 \"masks atrial repolarization\""
      },
      {
        "ref": "phys.cvs.slides.2026",
        "location": "p1 \"T wave corresponds to the plateau and repolarization phase\""
      }
    ]
  },
    {
    "id": "abct2326-resp-gas-transport",
    "subject": "ABCT2326",
    "unit": "phys.resp",
    "type": "definition",
    "title": "Gas exchange, oxygen transport and the control of respiration",
    "tags": [
      "respiratory",
      "high-yield",
      "gas-exchange",
      "oxygen-transport",
      "hemoglobin",
      "chemoreceptors",
      "bohr-effect"
    ],
    "priorKnowledge": {
      "level": "dse-bio",
      "covers": "part",
      "dsePart": "core",
      "syllabusRef": { "ref": "edb.bio", "location": "Elective V(c) \"Regulation of gas content in blood\" — oxygen and carbon dioxide transport mechanisms." },
      sources: [
        {
          "ref": "phys.3",
          "location": "p10 \"Alveolar epithelium\""
        },
        {
          "ref": "phys.3",
          "location": "p13 \"Coats alveolar surfaces and reduces surface tension\""
        },
        {
          "ref": "phys.3",
          "location": "p40 \"Across the respiratory membrane\""
        },
        {
          "ref": "phys.3",
          "location": "p41 \"Partial pressures in alveolar air and alveolar capillaries\""
        },
        {
          "ref": "phys.3",
          "location": "p45 \"Oxygen transport\""
        },
        {
          "ref": "phys.3",
          "location": "p47 \"Oxygen–hemoglobin saturation curve\""
        },
        {
          "ref": "phys.3",
          "location": "p50 \"Bohr effect\""
        },
        {
          "ref": "phys.3",
          "location": "p56 \"70 percent is transported as carbonic acid\""
        },
        {
          "ref": "phys.3",
          "location": "p68 \"Chemoreceptor reflexes\""
        }
      ]
    },
    "practice": [
      {
        "type": "matching",
        "prompt": "Match each transport route of respiratory gases with its approximate percentage contribution in blood.",
        "pairs": [
          [
            "Bicarbonate ion (HCO3-) in plasma",
            "70% of total carbon dioxide transport"
          ],
          [
            "Carbaminohemoglobin",
            "23% of total carbon dioxide transport"
          ],
          [
            "Oxyhemoglobin in erythrocytes",
            "98.5% of total oxygen transport"
          ],
          [
            "Dissolved in physical solution in plasma",
            "1.5% of oxygen and 7% of carbon dioxide transport"
          ]
        ],
        "explanation": "Bicarbonate accounts for 70% of CO2; carbaminohemoglobin accounts for 23%; hemoglobin carries 98.5% of O2; dissolved gases make up 1.5% of O2 and 7% of CO2."
      },
      {
        "type": "mcq",
        "prompt": "Which physiological change will shift the oxygen-hemoglobin dissociation curve to the RIGHT, thereby facilitating oxygen unloading in peripheral tissues?",
        "options": [
          "A decrease in blood pH (increased hydrogen ion concentration / acidosis)",
          "A decrease in tissue temperature (hypothermia)",
          "A decrease in arterial partial pressure of carbon dioxide (hypocapnia)",
          "A decrease in erythrocyte 2,3-bisphosphoglycerate (2,3-BPG)"
        ],
        "answer": 0,
        "explanation": "According to the Bohr effect, an increase in H+ ions (lower pH), elevated PCO2, increased temperature, or higher 2,3-BPG decreases hemoglobin’s affinity for oxygen, shifting the curve to the right."
      },
      {
        "type": "typed",
        "prompt": "What percentage of total carbon dioxide transported in the blood is converted into bicarbonate ions (HCO3-)?",
        "accept": [
          "70%",
          "70 percent",
          "70",
          "about 70%"
        ],
        "explanation": "Approximately 70% of carbon dioxide is hydrated by carbonic anhydrase into carbonic acid and transported as bicarbonate ions in plasma."
      },
      {
        "type": "sequence",
        "prompt": "Order the physiological events occurring in an erythrocyte within a systemic tissue capillary as it delivers oxygen and collects CO2.",
        "items": [
          "Tissue CO2 diffuses across capillary endothelium into the erythrocyte",
          "Carbonic anhydrase converts CO2 and H2O into H2CO3, which dissociates into H+ and HCO3-",
          "Hydrogen ions (H+) bind to hemoglobin, triggering the Bohr effect to release O2 to the tissue",
          "Bicarbonate (HCO3-) exits the erythrocyte into plasma in exchange for chloride (chloride shift)"
        ],
        "explanation": "CO2 diffuses in, is converted to H+ and bicarbonate, H+ promotes oxygen unloading via the Bohr effect, and bicarbonate leaves via the chloride shift."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A 28-year-old mountaineer rapidly ascends to an altitude where atmospheric pressure drops by 35%, lowering inspired PO2. Over the first 48 hours at base camp, her ventilation increases. Arterial blood gases demonstrate PaO2 54 mmHg, PaCO2 28 mmHg, and arterial pH 7.50 (respiratory alkalosis). Erythrocyte analysis shows an adaptive increase in 2,3-bisphosphoglycerate (2,3-BPG). Analyze how respiratory alkalosis initially alters oxygen affinity in the lungs, and explain the adaptive physiological role of increased 2,3-BPG in tissue oxygen delivery.",
        "model": "At high altitude, acute hypoxemia stimulates peripheral chemoreceptors to drive hyperventilation. Hyperventilation excessively blows off carbon dioxide, causing acute respiratory alkalosis (PaCO2 28 mmHg, pH 7.50). In the pulmonary capillaries, alkalosis and hypocapnia shift the oxygen-hemoglobin dissociation curve to the left (Bohr effect in reverse). A leftward shift increases hemoglobin affinity for oxygen, which is beneficial in the hypoxic lung because it allows hemoglobin to achieve higher saturation despite reduced alveolar PO2 (54 mmHg). However, an uncompensated leftward shift would impair oxygen release in systemic tissues. To counterbalance this, erythrocytes adapt over 24–48 hours by upregulating glycolysis and producing elevated levels of 2,3-bisphosphoglycerate (2,3-BPG). 2,3-BPG binds specifically to the central cavity of deoxygenated hemoglobin, stabilizing the tense (T) state and shifting the dissociation curve back to the right. This rightward shift restores and enhances oxygen unloading to hypoxic peripheral tissues.",
        "rubric": [
          "Explains that hyperventilation causes hypocapnia and respiratory alkalosis, shifting the curve to the left and aiding pulmonary loading",
          "Explains that an uncompensated left shift would excessively impair peripheral tissue oxygen unloading",
          "Describes how erythrocyte 2,3-BPG elevation shifts the curve back to the right, facilitating vital oxygen delivery to systemic tissues"
        ]
      }
    ],
    "commonMistakes": [
      "Confusing the effect of pH on the curve: higher pH (alkalosis) shifts the curve left (tighter binding), whereas lower pH (acidosis) shifts the curve right (easier release).",
      "Assuming that because the CO2 pressure gradient (5 mmHg) is much smaller than the O2 gradient (60 mmHg), CO2 diffuses much more slowly; CO2 diffuses equally fast because of its 20-fold higher solubility.",
      "Thinking bicarbonate is formed in plasma, forgetting that carbonic anhydrase is located inside red blood cells, so CO2 must enter the erythrocyte before bicarbonate is produced and shifted into plasma."
    ],
    "sourceRefs": [
      {
        "ref": "phys.3",
        "location": "p10 \"Alveolar epithelium\""
      },
      {
        "ref": "phys.3",
        "location": "p13 \"Coats alveolar surfaces and reduces surface tension\""
      },
      {
        "ref": "phys.3",
        "location": "p40 \"Across the respiratory membrane\""
      },
      {
        "ref": "phys.3",
        "location": "p41 \"Partial pressures in alveolar air and alveolar capillaries\""
      },
      {
        "ref": "phys.3",
        "location": "p45 \"Oxygen transport\""
      },
      {
        "ref": "phys.3",
        "location": "p46 \"Hemoglobin saturation\""
      },
      {
        "ref": "phys.3",
        "location": "p47 \"Oxygen–hemoglobin saturation curve\""
      },
      {
        "ref": "phys.3",
        "location": "p50 \"Bohr effect\""
      },
      {
        "ref": "phys.3",
        "location": "p55 \"Carbon dioxide gas transport\""
      },
      {
        "ref": "phys.3",
        "location": "p56 \"70 percent is transported as carbonic acid\""
      },
      {
        "ref": "phys.3",
        "location": "p68 \"Chemoreceptor reflexes\""
      }
    ]
  },
  {
    id: 'abct2326-immune-adaptive',
    subject: 'ABCT2326', unit: 'phys.imm', type: 'comparison',
    title: 'Inflammation, complement and adaptive immunity',
    tags: ['immune', 'high-yield'],
    priorKnowledge: {
      level: 'dse-bio', covers: 'part', dsePart: 'core',
      syllabusRef: { ref: 'edb.bio', location: 'Compulsory IV(c) "Body defence mechanisms" — specific defence: immune response, antigen and antibody, B and T lymphocytes, primary and secondary responses, active and passive immunity. Complement and MHC are not in it.' },
      sources: [
        {
          "ref": "phys.10",
          "location": "Slides 27, 29 \"Complement System\""
        },
        {
          "ref": "phys.10",
          "location": "Slides 31–33 \"Inflammation\""
        },
        {
          "ref": "phys.10",
          "location": "Slide 39 \"4 Major Types of T Cells\""
        },
        {
          "ref": "phys.10",
          "location": "Slides 40–41 \"T Cells and Immunity\", \"Two Classes of MHC Proteins\""
        }
      ],
    },
    practice: [
      { type: 'matching', prompt: 'Match each Latin sign of inflammation to its meaning.',
        pairs: [['Tumor', 'Swelling'], ['Rubor', 'Redness'], ['Calor', 'Heat'], ['Dolor', 'Pain']],
        explanation: 'These are the four principal signs and symptoms of inflammation as given in the lecture, with their Latin names.' },
      { type: 'comparison', prompt: 'What distinguishes the classical from the alternative complement pathway?',
        options: [
          'The classical pathway requires antibody binding and is faster and more effective; the alternative requires no antibody and is slower',
          'The classical pathway is slower and requires no antibody',
          'Only the alternative pathway forms a membrane attack complex',
          'They use entirely separate proteins with no common pathway',
        ], answer: 0,
        explanation: 'The classical pathway begins with antibody binding and C1 attachment and is the most rapid and effective. The alternative involves no antibody, is slower and less effective. Both converge on the common pathway C5–C9 and both end in the membrane attack complex.' },
      { type: 'typed', prompt: 'What is the name of the structure generated by the common complement pathway that lyses the target cell?', accept: ['membrane attack complex', 'mac', 'membrane attack complex (mac)'],
        explanation: 'The membrane attack complex (MAC), formed from C5b with C6, C7, C8 and C9.' },
      { type: 'mcq', prompt: 'Antibodies transferred from another source rather than made after your own exposure describes:', options: ['Active immunity', 'Passive immunity', 'Innate immunity', 'Cell-mediated immunity'], answer: 1,
        explanation: 'Passive immunity — antibodies are transferred from another source. Active immunity is where antibodies develop after your own exposure to the antigen.' },
      { type: 'cloze', prompt: 'Cell-mediated immunity involves ______ cells, while antibody-mediated (humoral) immunity involves ______ cells.', accept: ['t; b', 't, b', 't cells and b cells', 't and b'],
        explanation: 'T cells for cell-mediated, B cells for antibody-mediated (humoral) immunity.' },
    ],
    application: [
      { type: 'scenario', prompt: 'An accumulation of pus has formed in an enclosed tissue space. Name it, and trace it back through the inflammatory process that produced it.',
        model: 'That is an abscess. Inflammation was triggered by a stimulus that killed cells or injured tissue; injured cells underwent necrosis; as local inflammation continued, debris, fluid and dead and dying cells accumulated at the site as pus; and pus enclosed in a tissue space is an abscess.',
        rubric: ['Names abscess', 'Traces necrosis → pus → abscess', 'Identifies the triggering injury'] },
    ],
    commonMistakes: [
      'Assuming the alternative complement pathway is an equal substitute — the lecture says it is slower and less effective.',
      'Treating adaptive immunity as present at birth. It is acquired only after exposure or antibody transfer.',
    ],
    sourceRefs: [{ ref: 'phys.10', location: 'Slides 27–35 complement system and pathways, inflammation, products of inflammation, forms of immunity; learning outcomes slide 2' }],
  },
  {
    "id": "hti17103-modality-best-use",
    "subject": "HTI17103",
    "unit": "hti.modalities",
    "type": "matching",
    "title": "What each modality is best used for",
    "tags": [
      "modalities",
      "high-yield"
    ],
    "practice": [
      {
        "type": "matching",
        "prompt": "Match each clinical imaging modality to its defining clinical capability highlighted in the lecture.",
        "pairs": [
          [
            "Fluoroscopy",
            "Real-time monitoring, applicable intraoperatively (stent, bone cement)"
          ],
          [
            "Mammography",
            "An extreme of resolution for delicate soft-tissue structures"
          ],
          [
            "Computed Tomography (CT)",
            "A 360-degree view overcoming superimposition with 3D reconstruction"
          ],
          [
            "Ultrasonography (US)",
            "Non-ionizing acoustic imaging (2-15 MHz) ideal for fetus and genital organs"
          ]
        ],
        "explanation": "These are the defining clinical roles emphasized across the Week 2 modalities overview.",
        "src": {
          "ref": "hti.w2",
          "location": "p18 \"Real-time monitoring\""
        }
      },
      {
        "type": "mcq",
        "prompt": "In which decade was diagnostic medical ultrasound imaging introduced, and what frequency range does it employ?",
        "options": [
          "Introduced since 1960s; frequency ranged from 2–15 MHz",
          "Introduced since 1980s; frequency ranged from 900–1,800 MHz",
          "Introduced in 1896; frequency ranged from 6–340 MHz",
          "Introduced in 1901; frequency ranged from 50–100 kHz"
        ],
        "answer": 0,
        "explanation": "The lecture states ultrasound imaging was introduced since the 1960s (derived from SONAR) with frequencies from 2–15 MHz.",
        "src": {
          "ref": "hti.w2",
          "location": "p52 \"Ultrasound (US) imaging\""
        }
      },
      {
        "type": "mcq",
        "prompt": "According to the lecture, which of the following is a recognized limitation of diagnostic ultrasonography?",
        "options": [
          "It delivers excessive ionizing radiation dose to the patient",
          "It is not ideal for structures containing gas or bones and is operator-dependent",
          "It cannot be operated in real time at the bedside",
          "It requires an on-site nuclear reactor or cyclotron"
        ],
        "answer": 1,
        "explanation": "Ultrasound limitations include being operator-dependent, body-habitus dependent, and unsuitable for structures containing gas or bone.",
        "src": {
          "ref": "hti.w2",
          "location": "p53 \"Ultrasonography - characteristics\""
        }
      },
      {
        "type": "typed",
        "prompt": "Which specialized ultrasound technique is named in the lecture for evaluating blood flow hemodynamics?",
        "accept": [
          "doppler ultrasonography",
          "doppler ultrasound",
          "Doppler ultrasonography",
          "Doppler ultrasound"
        ],
        "explanation": "Doppler ultrasonography is the named technique for vascular blood flow evaluation.",
        "src": {
          "ref": "hti.w2",
          "location": "p55 \"Doppler ultrasonography\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A pregnant patient in her first trimester presents with suspected acute cholecystitis (gallbladder inflammation). Explain why the clinical team orders abdominal ultrasonography rather than an abdominal CT or nuclear medicine scan.",
        "model": "Ultrasound uses mechanical sound waves (2–15 MHz) and is completely non-ionizing, making it safe for the developing fetus and reproductive organs. In contrast, abdominal CT delivers ionizing X-rays and nuclear medicine involves circulating radioisotopes that cross into fetal circulation. Ultrasound also provides real-time gallbladder visualization without contrast-agent toxicity.",
        "rubric": [
          "Identifies ultrasound as non-ionizing radiation safe for the fetus/pelvic organs",
          "Contrasts with CT and nuclear medicine as delivering ionizing radiation hazard",
          "Cites real-time diagnostic capability of ultrasound"
        ]
      }
    ],
    "commonMistakes": [
      "Ordering CT as the primary investigation for pregnant patients with acute pelvic symptoms, overlooking ultrasound as the non-ionizing standard.",
      "Assuming ultrasound can easily visualize structures behind lung tissue or intact bone, ignoring that acoustic waves reflect completely at gas/bone boundaries.",
      "Believing that ultrasound is an objective, automated imaging test, when the lecture stresses it is highly operator-dependent."
    ],
    "sourceRefs": [
      {
        "ref": "hti.w2.2025",
        "location": "p16 \"Fluoroscopy and contrast enhancement\""
      },
      {
        "ref": "hti.w2.2025",
        "location": "p38 \"Ultrasonography - characteristics\""
      },
      {
        "ref": "hti.w2",
        "location": "p18 \"Fluoroscopy and contrast enhancement\""
      },
      {
        "ref": "hti.w2",
        "location": "p18 \"Real-time monitoring\""
      },
      {
        "ref": "hti.w2",
        "location": "p18 \"Intraoperative applicable\""
      },
      {
        "ref": "hti.w2",
        "location": "p18 \"Angiography\""
      },
      {
        "ref": "hti.w2",
        "location": "p18 \"Stent installation\""
      },
      {
        "ref": "hti.w2",
        "location": "p18 \"Bone cement\""
      },
      {
        "ref": "hti.w2",
        "location": "p18 \"Function imaging\""
      },
      {
        "ref": "hti.w2",
        "location": "p18 \"Digestive system\""
      },
      {
        "ref": "hti.w2",
        "location": "p26 \"Mammography – an extreme of resolution\""
      },
      {
        "ref": "hti.w2",
        "location": "p28 \"Computed Tomography\""
      },
      {
        "ref": "hti.w2",
        "location": "p28 \"Radiologists always need 2 views, how about a 360⁰-view?\""
      },
      {
        "ref": "hti.w2",
        "location": "p32 \"Multiplaner reconstruction 3D angiographic reconstruction\""
      },
      {
        "ref": "hti.w2",
        "location": "p35 \"The non-invasive visualization of bio-distribution\""
      },
      {
        "ref": "hti.w2",
        "location": "p49 \"MRI - summary\""
      },
      {
        "ref": "hti.w2",
        "location": "p49 \"Good soft tissue contrast\""
      },
      {
        "ref": "hti.w2",
        "location": "p49 \"Function imaging compatible\""
      },
      {
        "ref": "hti.w2",
        "location": "p49 \"3D/4D reconstruction\""
      },
      {
        "ref": "hti.w2",
        "location": "p49 \"Non-ionizing radiation\""
      },
      {
        "ref": "hti.w2",
        "location": "p52 \"Ultrasound (US) imaging\""
      },
      {
        "ref": "hti.w2",
        "location": "p52 \"Introduced since 1960s\""
      },
      {
        "ref": "hti.w2",
        "location": "p52 \"Frequency ranged from 2-15 MHz\""
      },
      {
        "ref": "hti.w2",
        "location": "p52 \"SONAR\""
      },
      {
        "ref": "hti.w2",
        "location": "p53 \"Ultrasonography - characteristics\""
      },
      {
        "ref": "hti.w2",
        "location": "p53 \"Benefits Limitations\""
      },
      {
        "ref": "hti.w2",
        "location": "p53 \"Non-invasive • Body habitus dependent\""
      },
      {
        "ref": "hti.w2",
        "location": "p53 \"Non-ionizing radiation • Not ideal for structures\""
      },
      {
        "ref": "hti.w2",
        "location": "p53 \"(Fetus and genital organs) containing gas or bones\""
      },
      {
        "ref": "hti.w2",
        "location": "p53 \"Cheaper • Low penetration\""
      },
      {
        "ref": "hti.w2",
        "location": "p53 \"Real-time monitoring • Operator-dependent\""
      },
      {
        "ref": "hti.w2",
        "location": "p55 \"Doppler ultrasonography\""
      }
    ]
  },
];
