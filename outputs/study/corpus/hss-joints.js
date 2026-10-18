/*
 * HSS2011 Human Anatomy — joints and the muscles that move them.
 *
 * Split out of study-data.js in phase 2026-09-01. outputs/study-data.js is
 * the barrel every importer still uses; nothing imports this file directly
 * except its siblings.
 */

export const HSS_JOINTS = [
  {
    "id": "hss2011-joints-classification",
    "subject": "HSS2011",
    "unit": "hss.joints",
    "type": "definition",
    "title": "Classification of joints",
    "tags": [
      "joints",
      "high-yield",
      "foundation"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "Which of the following is the least movable joint?",
        "options": [
          "A diarthrosis",
          "A suture",
          "A synchondrosis",
          "A symphysis"
        ],
        "answer": 1,
        "explanation": "Model answer B. Sutures are fibrous joints tightly interlocking skull bones via dense connective tissue processes, permitting the least movement of all articulations listed. Diarthroses are freely movable synovial joints.",
        "src": {
          "ref": "hss.revans",
          "location": "Module 4.1, MCQ 4 \"4. B\""
        }
      },
      {
        "type": "mcq",
        "prompt": "In monoaxial articulation,",
        "options": [
          "Movement can occur in only one plane.",
          "Movement can occur in two planes.",
          "Movement can occur in all three planes.",
          "Only circumduction is possible"
        ],
        "answer": 0,
        "explanation": "Model answer A. Monoaxial (uniaxial) joints restrict angular or rotational motion to a single anatomical plane (e.g., hinge joints moving in flexion/extension).",
        "src": {
          "ref": "hss.revans",
          "location": "Module 4.1, MCQ 3 \"3. A\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each fibrous or cartilaginous joint type to its verified lecture example.",
        "pairs": [
          [
            "Suture",
            "Coronal suture binding frontal and parietal bones"
          ],
          [
            "Gomphosis",
            "Roots of teeth into alveoli of maxillae and mandible"
          ],
          [
            "Syndesmosis",
            "Inferior tibiofibular articulation"
          ],
          [
            "Synchondrosis",
            "Epiphyseal plate of child (temporary joint)"
          ],
          [
            "Symphysis",
            "Inter-body joints of spine and pubic symphysis"
          ]
        ],
        "explanation": "Directly sourced from HSS2011 Module 4.1 joint classification lecture slides."
      },
      {
        "type": "sequence",
        "prompt": "Order these joints from least movable to most freely movable according to functional classification.",
        "items": [
          "Suture (synarthrosis, fibrous)",
          "Symphysis (amphiarthrosis, fibrocartilaginous)",
          "Synovial joint (diarthrosis, fluid cavity)"
        ],
        "explanation": "Immovable fibrous synarthroses have zero joint space; amphiarthroses permit slight give; synovial diarthroses move freely."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A 9-year-old child sustains a wrist trauma. The radiograph displays a radiolucent band across the distal radius. The junior resident wonders if it is a fracture line. How should the anatomy be explained in terms of joint classification and natural timeline?",
        "model": "The radiolucent band is the distal radial epiphyseal plate, which is classified structurally as a cartilaginous joint, specifically a synchondrosis (primary cartilaginous joint). It is composed of uncalcified hyaline cartilage and serves as a temporary growth joint. In adult life (by approximately 20–25 years of age), this cartilage completely ossifies into solid bone (forming an epiphyseal line/synostosis). Knowledge of normal pediatric synchondroses prevents misdiagnosing normal growth anatomy as a fracture.",
        "rubric": [
          "Classifies the epiphyseal plate as a cartilaginous joint / synchondrosis",
          "Identifies it as a temporary hyaline cartilage articulation",
          "States that it ossifies into adult bone by approximately 25 years of age"
        ]
      }
    ],
    "commonMistakes": [
      "Assuming all cartilaginous joints are permanent; synchondroses are temporary growth plates that ossify into synostoses by adulthood.",
      "Confusing syndesmosis (ligamentous fibrous sheet, like inferior tibiofibular) with symphysis (fibrocartilage pad, like pubic symphysis).",
      "Thinking teeth are embedded in bone by synovial joints or ankylosis; they are held by fibrous gomphoses."
    ],
    "sourceRefs": [
      {
        "ref": "hss.4.1",
        "location": "p26 \"Arthrology\""
      },
      {
        "ref": "hss.4.1",
        "location": "p26 \"G. arthron, joint\""
      },
      {
        "ref": "hss.4.1",
        "location": "p28 \"allow very limited\""
      },
      {
        "ref": "hss.4.1",
        "location": "p28 \"bones are connected by\""
      },
      {
        "ref": "hss.4.1",
        "location": "p28 \"fibrous tissue\""
      },
      {
        "ref": "hss.4.1",
        "location": "p28 \"sutures\""
      },
      {
        "ref": "hss.4.1",
        "location": "p28 \"gomphoses\""
      },
      {
        "ref": "hss.4.1",
        "location": "p28 \"syndesmoses\""
      },
      {
        "ref": "hss.4.1",
        "location": "p29 \"articulation by process\""
      },
      {
        "ref": "hss.4.1",
        "location": "p29 \"& indentation\""
      },
      {
        "ref": "hss.4.1",
        "location": "p29 \"the coronal suture\""
      },
      {
        "ref": "hss.4.1",
        "location": "p30 \"conical process fits\""
      },
      {
        "ref": "hss.4.1",
        "location": "p30 \"into a socket\""
      },
      {
        "ref": "hss.4.1",
        "location": "p30 \"roots of teeth into\""
      },
      {
        "ref": "hss.4.1",
        "location": "p30 \"alveoli of maxillae and\""
      },
      {
        "ref": "hss.4.1",
        "location": "p31 \"surface united by an\""
      },
      {
        "ref": "hss.4.1",
        "location": "p31 \"interosseous ligament\""
      },
      {
        "ref": "hss.4.1",
        "location": "p31 \"inferior tibiofibular\""
      },
      {
        "ref": "hss.4.1",
        "location": "p32 \"synchondroses\""
      },
      {
        "ref": "hss.4.1",
        "location": "p32 \"symphyses\""
      },
      {
        "ref": "hss.4.1",
        "location": "p33 \"temporary joint\""
      },
      {
        "ref": "hss.4.1",
        "location": "p33 \"cartilage ossifies in\""
      },
      {
        "ref": "hss.4.1",
        "location": "p33 \"epiphysis of child\""
      },
      {
        "ref": "hss.4.1",
        "location": "p35 \"two bones are joined\""
      },
      {
        "ref": "hss.4.1",
        "location": "p35 \"by fibrocartilage\""
      },
      {
        "ref": "hss.4.1",
        "location": "p35 \"inter-body joints of\""
      },
      {
        "ref": "hss.4.1",
        "location": "p35 \"the spine, pubic\""
      },
      {
        "ref": "hss.revans",
        "location": "p1 \"4. B\""
      }
    ]
  },
  {
    "id": "hss2011-joints-synovial-structure",
    "subject": "HSS2011",
    "unit": "hss.joints",
    "type": "definition",
    "title": "Structures of a synovial joint",
    "tags": [
      "joints",
      "high-yield",
      "foundation"
    ],
    "practice": [
      {
        "type": "cloze",
        "prompt": "A synovial joint is surrounded by a(n) ______ composed of a thick layer of dense connective tissue. The bony surfaces cannot contact one another because the articulating surfaces are covered by ______, which function as ______ and reduce friction. The ______ of a joint is a cord or band of tough collagenous tissue binding one bone to another.",
        "accept": [
          "joint capsule; articular cartilage; shock absorber; ligament",
          "articular capsule; articular cartilage; shock absorber; ligament",
          "articular capsule, articular cartilage, shock absorber, ligament",
          "joint capsule, articular cartilage, shock absorber, ligament"
        ],
        "explanation": "Model answer from past exam papers: joint capsule / articular capsule, articular cartilage, shock absorber, ligament.",
        "src": {
          "ref": "hss.revans",
          "location": "Module 4.1, Fill-in-blanks 4–7"
        }
      },
      {
        "type": "typed",
        "prompt": "What type of cartilage forms the articular cartilage of a synovial joint?",
        "accept": [
          "hyaline",
          "hyaline cartilage"
        ],
        "explanation": "Hyaline cartilage forms the smooth, wear-resistant articulating cap."
      },
      {
        "type": "matching",
        "prompt": "Match each component of a synovial joint to its verified primary function.",
        "pairs": [
          [
            "Articular cartilage",
            "Low-friction surface and shock absorber"
          ],
          [
            "Synovial membrane",
            "Secretes clear, colorless synovial fluid"
          ],
          [
            "Fibrous capsule",
            "Dense cuff enclosing joint and stabilizing bone ends"
          ],
          [
            "Bursa",
            "Synovial protrusion reducing friction between tendon and bone"
          ],
          [
            "Ligament",
            "Tough collagenous band binding one bone to another"
          ]
        ],
        "explanation": "Standard anatomical definitions from Module 4.1 and MSK foundational lectures."
      },
      {
        "type": "explain",
        "prompt": "Articular cartilage has no intrinsic capillary blood supply. What three sources nourish its living chondrocytes?",
        "model": "Articular cartilage is nourished through three routes: (1) diffusion from clear synovial fluid in the joint cavity, (2) the vascular net in the synovial membrane, and (3) blood vessels penetrating from the underlying subchondral marrow spaces.",
        "rubric": [
          "Identifies synovial fluid diffusion",
          "Identifies vascular net in synovial membrane",
          "Identifies blood vessels in underlying marrow spaces"
        ]
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A patient with a fractured lower leg was placed in an immovable cast for 8 weeks. Upon cast removal, the uninjured knee joint exhibits severe stiffness and early cartilage degradation. Using joint anatomy, explain why immobilisation impairs cartilage health even without direct trauma.",
        "model": "Articular cartilage is avascular and relies heavily on synovial fluid for nutrition and metabolic waste removal. Joint movement acts as a mechanical pump, circulating synovial fluid through the cartilage matrix and stimulating the synovial membrane. Prolonged immobilisation halts this fluid circulation, starving chondrocytes of essential nutrients and oxygen from the synovial fluid and synovial capillary net, leading to matrix dehydration and stiffness.",
        "rubric": [
          "Explains that articular cartilage is avascular and depends on synovial fluid",
          "Identifies joint motion as the driver of synovial fluid circulation and diffusion",
          "Concludes that immobilisation causes nutrient deprivation and cartilage degeneration"
        ]
      }
    ],
    "commonMistakes": [
      "Believing articular cartilage is nourished by its own dedicated artery; it is completely avascular.",
      "Calling an intracapsular or extracapsular ligament a tendon; ligaments bind bone to bone, whereas tendons connect muscle to bone.",
      "Assuming the fibrous capsule lines the joint cavity; the inner lining is always the cellular synovial membrane."
    ],
    "sourceRefs": [
      {
        "ref": "hss.4.1",
        "location": "p37 \"most common in body\""
      },
      {
        "ref": "hss.4.1",
        "location": "p37 \"bone ends covered by articulating cartilage\""
      },
      {
        "ref": "hss.4.1",
        "location": "p37 \"joint cavity between the ends in normal healthy state\""
      },
      {
        "ref": "hss.4.1",
        "location": "p37 \"articular capsule\""
      },
      {
        "ref": "hss.4.1",
        "location": "p37 \"synovial membranes, with synovia\""
      },
      {
        "ref": "hss.4.1",
        "location": "p38 \"hyaline cartilage\""
      },
      {
        "ref": "hss.4.1",
        "location": "p38 \"wear-resistant, low-\""
      },
      {
        "ref": "hss.4.1",
        "location": "p38 \"friction lubricated\""
      },
      {
        "ref": "hss.4.1",
        "location": "p38 \"vascular net in synovial membrane\""
      },
      {
        "ref": "hss.4.1",
        "location": "p39 \"connective fibrous\""
      },
      {
        "ref": "hss.4.1",
        "location": "p39 \"cuff around joint close\""
      },
      {
        "ref": "hss.4.1",
        "location": "p39 \"to the articular surface\""
      },
      {
        "ref": "hss.4.1",
        "location": "p39 \"bursa: protrusion of\""
      },
      {
        "ref": "hss.4.1",
        "location": "p39 \"synovial membrane\""
      },
      {
        "ref": "hss.4.1",
        "location": "p40 \"localized thickenings\""
      },
      {
        "ref": "hss.4.1",
        "location": "p40 \"called joint ligament\""
      },
      {
        "ref": "hss.4.1",
        "location": "p40 \"accessory ligaments\""
      },
      {
        "ref": "hss.4.1",
        "location": "p40 \"- not associated\""
      },
      {
        "ref": "hss.4.1",
        "location": "p40 \"directly with the\""
      },
      {
        "ref": "hss.4.1",
        "location": "p42 \"clear, colorless fluid\""
      },
      {
        "ref": "hss.4.1",
        "location": "p45 \"Hilton’s law : nerves supplying a joint also\""
      },
      {
        "ref": "hss.4.1",
        "location": "p45 \"supply the muscles moving the joint and the\""
      },
      {
        "ref": "hss.4.1",
        "location": "p45 \"skin covering the insertion of these muscles\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p16 \"most common in our body\""
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
        "ref": "hss.revans",
        "location": "p3 \"4. Joint capsule/ articular capsule\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"5. Articular cartilage\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"6. Shock absorber\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"7. Ligament\""
      }
    ]
  },
  {
    "id": "hss2011-joints-movements",
    "subject": "HSS2011",
    "unit": "hss.joints",
    "type": "definition",
    "title": "Movements and where each one happens",
    "tags": [
      "joints",
      "movements",
      "high-yield",
      "foundation"
    ],
    "practice": [
      {
        "type": "cloze",
        "prompt": "______ is the action by which the thumb touches the tips of the other fingers.",
        "accept": [
          "opposition",
          "Opposition"
        ],
        "explanation": "Model answer: Opposition. It occurs at the carpometacarpal joint of the thumb, and its reverse is reposition.",
        "src": {
          "ref": "hss.revans",
          "location": "Module 0, Fill-in-blanks 1 \"1. Opposition\""
        }
      },
      {
        "type": "cloze",
        "prompt": "______ causes the forearm to rotate laterally so that the palm faces upwards.",
        "accept": [
          "supination",
          "Supination"
        ],
        "explanation": "Model answer: Supination. It takes place at the superior and inferior radioulnar joints.",
        "src": {
          "ref": "hss.revans",
          "location": "Module 0, Fill-in-blanks 2 \"2. Supination\""
        }
      },
      {
        "type": "cloze",
        "prompt": "Flexion and extension of the thumb take place at the ______.",
        "accept": [
          "carpo-metacarpal joint",
          "carpometacarpal joint",
          "carpo-metacarpal joint of the thumb",
          "carpometacarpal joint of the thumb",
          "CMC joint"
        ],
        "explanation": "Model answer: Carpo-metacarpal joint. Sourced from Module 0 past paper questions.",
        "src": {
          "ref": "hss.revans",
          "location": "Module 0, Fill-in-blanks 5 \"5. Carpo-metacarpal joint\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each movement to the precise anatomical joint where it takes place.",
        "pairs": [
          [
            "Flexion and extension of forearm",
            "Elbow joint"
          ],
          [
            "Supination and pronation",
            "Superior and inferior radioulnar joints"
          ],
          [
            "Dorsiflexion and plantarflexion",
            "Ankle (talocrural) joint"
          ],
          [
            "Inversion and eversion of foot",
            "Intertarsal joints"
          ],
          [
            "Opposition and reposition",
            "Carpometacarpal joint of the thumb"
          ]
        ],
        "explanation": "Verified movement-to-joint pairings from HSS2011 Module 0 and foundational biomechanics."
      },
      {
        "type": "mcq",
        "prompt": "Which of the following movements takes place at the intertarsal joints rather than the talocrural joint?",
        "options": [
          "Dorsiflexion",
          "Plantarflexion",
          "Inversion and eversion",
          "Flexion and extension"
        ],
        "answer": 2,
        "explanation": "Inversion and eversion occur at the intertarsal (subtalar/transverse tarsal) joints, while dorsiflexion and plantarflexion occur at the talocrural (ankle) joint."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A patient recovering from a distal radius fracture complains that they cannot turn a door key or hold a drink tray because their \"wrist refuses to rotate\". Explain the error in their anatomical understanding and identify the true joints and movements involved.",
        "model": "The wrist (radiocarpal) joint is a condylar joint that performs flexion, extension, abduction (radial deviation), and adduction (ulnar deviation); it possesses zero rotational degrees of freedom. Turning a key or holding a tray palm-up requires supination and pronation of the forearm, which occurs at the superior and inferior radioulnar joints as the radius pivots around the ulna. The patient’s limitation is in forearm radioulnar rotation, not wrist rotation.",
        "rubric": [
          "States that the wrist joint cannot rotate",
          "Identifies the movements as supination and pronation",
          "Identifies the superior and inferior radioulnar joints as the responsible articulations"
        ]
      }
    ],
    "commonMistakes": [
      "Believing the wrist joint rotates; the wrist only flexes, extends, and deviates side-to-side. Rotation occurs at the radioulnar joints.",
      "The classic swap: dorsiflexion/plantarflexion live at the talocrural (ankle) joint, inversion/eversion at the intertarsal joints — not the same joint, not the same axis.",
      "Measuring thumb abduction/adduction against the middle finger; the palm of the hand is the reference plane for thumb movements."
    ],
    "sourceRefs": [
      {
        "ref": "hss.l1.overview",
        "location": "p37 \"Movement of the arm\""
      },
      {
        "ref": "hss.l1.overview",
        "location": "p37 \"Flexion\""
      },
      {
        "ref": "hss.l1.overview",
        "location": "p37 \"Extension\""
      },
      {
        "ref": "hss.l1.overview",
        "location": "p37 \"Abduction\""
      },
      {
        "ref": "hss.l1.overview",
        "location": "p37 \"Adduction\""
      },
      {
        "ref": "hss.l1.overview",
        "location": "p40 \"Flexion & extension of the forearm\""
      },
      {
        "ref": "hss.l1.overview",
        "location": "p40 \"take place at elbow joint\""
      },
      {
        "ref": "hss.l1.overview",
        "location": "p41 \"Supination & pronation of the forearm\""
      },
      {
        "ref": "hss.l1.overview",
        "location": "p41 \"Takes place at the superior and\""
      },
      {
        "ref": "hss.l1.overview",
        "location": "p41 \"inferior radioulnar joints\""
      },
      {
        "ref": "hss.l1.overview",
        "location": "p47 \"Extension & flexion of thumb\""
      },
      {
        "ref": "hss.l1.overview",
        "location": "p47 \"The palm of hand is the fixed plane of reference.\""
      },
      {
        "ref": "hss.l1.overview",
        "location": "p49 \"Opposition of thumb\""
      },
      {
        "ref": "hss.l1.overview",
        "location": "p49 \"Tip-to-tip attachment of the thumb with any one of the fingers\""
      },
      {
        "ref": "hss.l1.overview",
        "location": "p56 \"Dorsiflexion & plantar flexion of the ankle\""
      },
      {
        "ref": "hss.l1.overview",
        "location": "p56 \"take place at the ankle (talocrural) joint\""
      },
      {
        "ref": "hss.l1.overview",
        "location": "p57 \"Inversion & eversion of the ankle\""
      },
      {
        "ref": "hss.l1.overview",
        "location": "p57 \"take place at the intertarsal joint\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p8 \"Abduction – body parts moving away from midline\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p8 \"Adduction – body parts moving towards the midline\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p9 \"Pronation – palm facing downwards\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p9 \"Moving the top of your\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p9 \"foot (the dorsum) upwards\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p9 \"Moving the sole of your foot (the\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p9 \"plantar surface) downward\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p9 \"Supination – palm facing upwards\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p9 \"Tilting the sole of the foot\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p9 \"outward (facing laterally)\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p9 \"inward (facing medially)\""
      },
      {
        "ref": "hss.revans",
        "location": "p2 \"1. Opposition\""
      },
      {
        "ref": "hss.revans",
        "location": "p2 \"2. Supination\""
      },
      {
        "ref": "hss.revans",
        "location": "p2 \"5. Carpo-metacarpal joint\""
      }
    ]
  },
  {
    "id": "hss2011-joints-movement-map-2026",
    "subject": "HSS2011",
    "unit": "hss.joints",
    "type": "matching",
    "title": "Current movement map for Weeks 2–4",
    "tags": [
      "joints",
      "movements",
      "upper limb",
      "lower limb",
      "head and neck",
      "high-yield"
    ],
    "practice": [
      {
        "type": "matching",
        "prompt": "Match each movement pair to the action demonstrated in the current lecture deck.",
        "pairs": [
          [
            "Dorsiflexion / plantarflexion",
            "Moving top of foot upwards / moving sole downwards"
          ],
          [
            "Inversion / eversion",
            "Tilting sole inward (medially) / tilting sole outward (laterally)"
          ],
          [
            "Lateral / medial rotation",
            "Turning humerus away from midline / towards midline"
          ],
          [
            "Abduction / adduction",
            "Body parts moving away from midline / towards midline"
          ],
          [
            "Pronation / supination",
            "Palm facing downwards / palm facing upwards"
          ]
        ],
        "explanation": "Paired movement definitions from HSS2011 current self-study movement deck pages 4, 8, and 9."
      },
      {
        "type": "mcq",
        "prompt": "Which reference line is used for abduction and adduction of the fingers?",
        "options": [
          "The thumb (digit I)",
          "The middle digit (digit III)",
          "The little finger (digit V)",
          "The wrist crease"
        ],
        "answer": 1,
        "explanation": "Finger abduction and adduction are defined relative to the longitudinal axis running through the third (middle) digit."
      },
      {
        "type": "mcq",
        "prompt": "Which movement tilts the sole of the foot inward (facing medially)?",
        "options": [
          "Eversion",
          "Inversion",
          "Dorsiflexion",
          "Plantarflexion"
        ],
        "answer": 1,
        "explanation": "Inversion tilts the sole inward medially; eversion tilts the sole outward laterally."
      },
      {
        "type": "typed",
        "prompt": "What anatomical term describes the restoring movement that reverses thumb opposition?",
        "accept": [
          "reposition",
          "Reposition"
        ],
        "explanation": "Reposition returns the thumb from opposition back to the anatomical position."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A dancer lands awkwardly from a jump. The clinical examiner notes that the ankle joint is intact, but pain is elicited when the sole of the foot is tilted medially, indicating a sprain of the lateral collateral ligaments of the ankle. Name the exact movement that caused the injury and specify which joint level produces this tilting.",
        "model": "The movement that caused the injury is inversion (tilting the sole medially). Inversion and eversion take place at the intertarsal (subtalar and transverse tarsal) joints, not at the hinge talocrural joint (which produces only dorsiflexion and plantarflexion). Severe inversion stresses the anterior talofibular and calcaneofibular lateral ligaments.",
        "rubric": [
          "Identifies the movement as inversion",
          "Identifies the intertarsal / subtalar joints as the anatomical location of inversion",
          "Distinguishes intertarsal motion from talocrural dorsiflexion/plantarflexion"
        ]
      }
    ],
    "commonMistakes": [
      "Assuming the wrist rotates when the palm turns over; rotation occurs purely at the proximal and distal radioulnar joints.",
      "Confusing ankle dorsiflexion/plantarflexion (talocrural joint) with foot inversion/eversion (intertarsal joints).",
      "Using the thumb as the reference axis for finger abduction instead of the middle finger (digit III)."
    ],
    "sourceRefs": [
      {
        "ref": "hss.move.2026",
        "location": "p1 \"Anatomical positions\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p1 \"Terminology of movements\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p4 \"Lateral/External Rotation of Shoulder\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p4 \"Medial/Internal Rotation of Shoulder\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p4 \"(i.e. lateral rotation of the humerus)\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p4 \"(i.e. medial rotation of the humerus)\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p6 \"Move\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p6 \"anteriorly\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p7 \"Angle between\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p7 \"the segmental\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p7 \"vertebrae\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p7 \"decreases\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p8 \"Abduction – body parts moving away from midline\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p8 \"Adduction – body parts moving towards the midline\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p9 \"Pronation – palm facing downwards\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p9 \"Moving the top of your\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p9 \"foot (the dorsum) upwards\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p9 \"Moving the sole of your foot (the\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p9 \"plantar surface) downward\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p9 \"Supination – palm facing upwards\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p9 \"Tilting the sole of the foot\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p9 \"outward (facing laterally)\""
      },
      {
        "ref": "hss.move.2026",
        "location": "p9 \"inward (facing medially)\""
      },
      {
        "ref": "hss.revans",
        "location": "p2 \"1. Opposition\""
      },
      {
        "ref": "hss.revans",
        "location": "p2 \"2. Supination\""
      },
      {
        "ref": "hss.revans",
        "location": "p2 \"5. Carpo-metacarpal joint\""
      }
    ]
  },
  {
    "id": "hss2011-joints-rotator-cuff",
    "subject": "HSS2011",
    "unit": "hss.joints",
    "type": "definition",
    "title": "Rotator cuff and full abduction of the arm",
    "tags": [
      "joints",
      "upper limb",
      "high-yield",
      "foundation"
    ],
    "practice": [
      {
        "type": "cloze",
        "prompt": "The rotator cuff consists of four muscles: ______, ______, ______ and ______.",
        "accept": [
          "supraspinatus; infraspinatus; teres minor; subscapularis",
          "supraspinatus, infraspinatus, teres minor, subscapularis",
          "Supraspinatus, Infraspinatus, Teres minor, Subscapularis"
        ],
        "explanation": "Model answer from past exams: supraspinatus, infraspinatus, teres minor, subscapularis.",
        "src": {
          "ref": "hss.revans",
          "location": "p3 \"3. Supraspinatus; infraspinatus; teres minor; subscapularis\""
        }
      },
      {
        "type": "typed",
        "prompt": "Which rotator cuff muscle initiates the first 15 degrees of abduction of the arm?",
        "accept": [
          "supraspinatus",
          "Supraspinatus"
        ],
        "explanation": "Supraspinatus initiates the first 15 degrees of abduction, after which deltoid abducts the arm to 90 degrees.",
        "src": {
          "ref": "hss.4.3",
          "location": "p22 \"Action: initiates the first 15 degrees of abduction.\""
        }
      },
      {
        "type": "sequence",
        "prompt": "Arrange the muscle actions in the correct sequential order for full 180-degree abduction of the arm.",
        "items": [
          "Supraspinatus: Initiation of abduction (0°–15°)",
          "Deltoid: Powerful abduction (15°–90°)",
          "Infraspinatus & Teres minor: Lateral rotation of humerus",
          "Trapezius & Serratus anterior: Upward rotation of scapula (90°–180°)"
        ],
        "explanation": "The verified four-step sequence from HSS2011 Module 4.3 slide 26."
      },
      {
        "type": "matching",
        "prompt": "Match each shoulder muscle to its verified innervation from lecture slides.",
        "pairs": [
          [
            "Deltoid",
            "Axillary nerve"
          ],
          [
            "Supraspinatus",
            "Suprascapular nerve"
          ],
          [
            "Infraspinatus",
            "Suprascapular nerve"
          ],
          [
            "Teres minor",
            "Axillary nerve"
          ],
          [
            "Subscapularis",
            "Subscapular nerve"
          ],
          [
            "Latissimus dorsi",
            "Thoracodorsal nerve"
          ]
        ],
        "explanation": "Innervations explicitly detailed across HSS2011 upper limb slides 18–23."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A 55-year-old tennis player reports acute right shoulder pain. Physical examination reveals that they cannot initiate arm abduction while standing upright; they must lean their torso laterally to allow the arm to swing outward before lifting it. However, if the examiner elevates their arm to 30 degrees, they can hold and complete the lift to 90 degrees without assistance. Identify the damaged muscle, its nerve supply, and the anatomical rationale for these findings.",
        "model": "The injured muscle is the supraspinatus, innervated by the suprascapular nerve. Supraspinatus is uniquely responsible for initiating the first 15 degrees of abduction. Once the arm passes 15 degrees, the deltoid (innervated by the axillary nerve) takes over as the primary powerful abductor. By leaning the torso, gravity passively displaces the arm past 15 degrees, allowing the intact deltoid to take over.",
        "rubric": [
          "Identifies supraspinatus as the damaged muscle",
          "Identifies the suprascapular nerve as its innervation",
          "Explains the functional hand-off: supraspinatus initiates first 15°, deltoid abducts thereafter"
        ]
      }
    ],
    "commonMistakes": [
      "Including the deltoid in the rotator cuff; deltoid is a major shoulder girdle abductor, not a cuff muscle.",
      "Assuming supraspinatus abducts the arm all the way to 90 degrees; it only initiates the first 15 degrees.",
      "Thinking subscapularis sits on the posterior scapula; it occupies the anterior subscapular fossa and medially rotates."
    ],
    "sourceRefs": [
      {
        "ref": "hss.4.3",
        "location": "p16 \"Rotator Cuff Muscles:\""
      },
      {
        "ref": "hss.4.3",
        "location": "p16 \"Supraspinatus\""
      },
      {
        "ref": "hss.4.3",
        "location": "p16 \"Infraspinatus\""
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
        "location": "p19 \"Innervated by: Axillary nerve\""
      },
      {
        "ref": "hss.4.3",
        "location": "p20 \"Rotator Cuff Muscles\""
      },
      {
        "ref": "hss.4.3",
        "location": "p21 \"Action: medial rotation of humerus\""
      },
      {
        "ref": "hss.4.3",
        "location": "p21 \"Innervated by: Subscapular nerve\""
      },
      {
        "ref": "hss.4.3",
        "location": "p22 \"Action: initiates the first 15 degrees of abduction.\""
      },
      {
        "ref": "hss.4.3",
        "location": "p22 \"Innervated by: Suprascapular\""
      },
      {
        "ref": "hss.4.3",
        "location": "p23 \"Rotator Cuff Muscles: Infraspinatus & Teres Minor\""
      },
      {
        "ref": "hss.4.3",
        "location": "p23 \"Action: lateral rotation of humerus\""
      },
      {
        "ref": "hss.4.3",
        "location": "p23 \"Infraspinatus: Suprascapular nerve\""
      },
      {
        "ref": "hss.4.3",
        "location": "p23 \"Teres minor: Axillary nerve\""
      },
      {
        "ref": "hss.4.3",
        "location": "p26 \"Muscles Involved in Full Abduction of the Arm\""
      },
      {
        "ref": "hss.4.3",
        "location": "p26 \"Supraspinatus: Initiation of abduction\""
      },
      {
        "ref": "hss.4.3",
        "location": "p26 \"Deltoid: Abduction\""
      },
      {
        "ref": "hss.4.3",
        "location": "p26 \"Infraspinatus &Teres Minor: Lateral rotation\""
      },
      {
        "ref": "hss.4.3",
        "location": "p26 \"Trapezius: Upward rotation of scapula\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"3. Supraspinatus; infraspinatus; teres minor; subscapularis\""
      },
      {
        "ref": "hss.ul.2026",
        "location": "p19 \"Rotator Cuff Muscle: stabilize shoulder joint\""
      },
      {
        "ref": "hss.ul.2026",
        "location": "p19 \"Supraspinatus\" — \"Infraspinatus\" — \"Subscapularis\" — \"Teres minor\""
      },
      {
        "ref": "hss.ul.2026",
        "location": "p20 \"Action\" — \"Main muscles involved\""
      }
    ]
  }
];
