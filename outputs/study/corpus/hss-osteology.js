/*
 * HSS2011 Human Anatomy — osteology: bone classification, the axial and
 * appendicular skeleton, and the named features of each bone.
 *
 * Split out of study-data.js in phase 2026-09-01. outputs/study-data.js is
 * the barrel every importer still uses; nothing imports this file directly
 * except its siblings.
 */

export const HSS_OSTEOLOGY = [
  {
    "id": "hss2011-osteo-axial-appendicular",
    "subject": "HSS2011",
    "unit": "hss.osteo",
    "type": "definition",
    "title": "Axial and appendicular skeleton",
    "tags": [
      "osteology",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "Which of the following bones belongs to the appendicular skeleton?",
        "options": [
          "Sternum",
          "Scapula",
          "Thoracic vertebrae",
          "Ribs"
        ],
        "answer": 1,
        "explanation": "The scapula is part of the shoulder girdle, which belongs to the appendicular skeleton. The sternum, thoracic vertebrae, and ribs are all components of the central axial skeleton."
      },
      {
        "type": "typed",
        "prompt": "How many bones are found in the adult human skeleton?",
        "accept": [
          "206"
        ],
        "explanation": "The adult human skeleton contains 206 bones (80 axial and 126 appendicular)."
      },
      {
        "type": "matching",
        "prompt": "Classify each skeletal structure into its correct division.",
        "pairs": [
          [
            "Skull",
            "Axial"
          ],
          [
            "Ribs",
            "Axial"
          ],
          [
            "Pelvic girdle",
            "Appendicular"
          ],
          [
            "Upper limb",
            "Appendicular"
          ]
        ],
        "explanation": "The axial skeleton comprises the skull, vertebrae, ribs, and sternum. The appendicular skeleton comprises the upper limbs, lower limbs, pectoral girdle, and pelvic girdle."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A student claims that the hip bone must be part of the axial skeleton because it carries upper body weight and connects directly to the sacrum. How would you correct this reasoning?",
        "model": "Weight transmission is not the anatomical criterion for skeletal classification. The pelvic girdle (hip bone) is classified as appendicular because its fundamental anatomical purpose is to attach the lower limb to the axial skeleton. In contrast, the sacrum is part of the vertebral column and therefore belongs to the axial skeleton.",
        "rubric": [
          "Rejects weight transmission as the classification criterion",
          "Identifies the girdle's role in anchoring the limb",
          "Distinguishes the appendicular hip bone from the axial sacrum"
        ]
      }
    ],
    "commonMistakes": [
      "Classifying the clavicle, scapula, or hip bone as axial because they sit on the trunk rather than the limbs.",
      "Forgetting that the sacrum is axial while the articulating hip bone is appendicular.",
      "Confusing the total bone count (206) with regional counts (80 axial, 126 appendicular)."
    ],
    "sourceRefs": [
      {
        "ref": "hss.4.1",
        "location": "p5 \"206 in adult skeleton\""
      },
      {
        "ref": "hss.4.1",
        "location": "p5 \"skull, vertebrae, ribs, sternum\""
      },
      {
        "ref": "hss.4.1",
        "location": "p5 \"shoulder girdle, UL, pelvic girdle and LL\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p3 \"Bones for movement (206)\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p4 \"Main Functions of our skeleton\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p4 \"Strong and tough for support and protection\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p4 \"Light enough for movement\""
      },
      {
        "ref": "hss.m0.1718",
        "location": "L1 p13–14 Axial and Appendicular Skeleton"
      },
      {
        "ref": "hss.vocab",
        "location": "Glossary: Axial Skeleton; Appendicular Skeleton"
      },
      {
        "ref": "hss.ll.2026",
        "location": "p2 \"Appendicular skeleton (126)\" — \"Axial skeleton (80)\""
      }
    ]
  },
  {
    "id": "hss2011-osteo-bone-shapes",
    "subject": "HSS2011",
    "unit": "hss.osteo",
    "type": "definition",
    "title": "Classification of bones by shape",
    "tags": [
      "osteology",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "A thoracic vertebra is an example of what type of bone?",
        "options": [
          "Long",
          "Flat",
          "Irregular",
          "Short"
        ],
        "answer": 2,
        "explanation": "Model answer C. Vertebrae are classified as irregular bones because of their complex mixed morphology with bodies, pedicles, laminae, and projecting processes. Short bones are restricted to cubical bones like the carpus and tarsus.",
        "src": {
          "ref": "hss.revans",
          "location": "p1 \"2. C\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each bone shape category to its textbook example.",
        "pairs": [
          [
            "Short bone",
            "Carpus and tarsus"
          ],
          [
            "Sesamoid bone",
            "Patella"
          ],
          [
            "Pneumatic bone",
            "Frontal sinus"
          ],
          [
            "Irregular bone",
            "Vertebrae"
          ]
        ],
        "explanation": "Short bones are cubical carpal and tarsal bones; sesamoids develop inside tendons (patella); pneumatic bones contain air sinuses (frontal); irregular bones have mixed forms (vertebrae)."
      },
      {
        "type": "typed",
        "prompt": "What specific category describes a bone nodule that develops inside a tendon to alter the direction of pull?",
        "accept": [
          "sesamoid",
          "sesamoid bone"
        ],
        "explanation": "Sesamoid bones develop inside tendons subjected to friction and tension; the patella is the largest human sesamoid."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A cross-sectional specimen of an unknown bone shows an interior filled with cancellous bone surrounded by a thin compact shell, with an overall cubical geometry. Which bone shape category does this represent, and how does it differ from an irregular bone?",
        "model": "This represents a short bone. While both short and irregular bones possess a cancellous interior surrounded by a thin layer of compact bone, short bones are distinctly cubical in geometric shape (like carpals and tarsals). Irregular bones have complex, mixed shapes with projecting spines or processes (like vertebrae) rather than equal cubic dimensions.",
        "rubric": [
          "Identifies the bone as a short bone",
          "Notes the shared internal architecture (cancellous core with thin compact cortex)",
          "Uses cubical geometry versus complex projecting processes as the discriminator"
        ]
      }
    ],
    "commonMistakes": [
      "Calling a vertebra a short bone because the vertebral body looks blocky—vertebrae are irregular bones because of their complex arch and process anatomy.",
      "Forgetting pneumatic and sesamoid bones, which the course syllabus explicitly tests alongside the four primary shapes.",
      "Believing flat bones contain a hollow medullary cavity; flat bones have two plates of compact bone enclosing spongy diploë without a medullary canal."
    ],
    "sourceRefs": [
      {
        "ref": "hss.4.1",
        "location": "p10 \"Shape of bones\""
      },
      {
        "ref": "hss.4.1",
        "location": "p11 \"limbs and serves as levers for muscles\""
      },
      {
        "ref": "hss.4.1",
        "location": "p11 \"and 2 expanded ends\""
      },
      {
        "ref": "hss.4.1",
        "location": "p18 \"cubical\""
      },
      {
        "ref": "hss.4.1",
        "location": "p18 \"carpus and tarsus\""
      },
      {
        "ref": "hss.4.1",
        "location": "p18 \"surrounded by a thin layer of compact bone\""
      },
      {
        "ref": "hss.4.1",
        "location": "p19 \"like sandwiches\""
      },
      {
        "ref": "hss.4.1",
        "location": "p19 \"compact bone,\""
      },
      {
        "ref": "hss.4.1",
        "location": "p19 \"separated by a layer of cancellous bone\""
      },
      {
        "ref": "hss.4.1",
        "location": "p20 \"some skull bones, vertebrae and hip bones\""
      },
      {
        "ref": "hss.4.1",
        "location": "p21 \"air sinus are present\""
      },
      {
        "ref": "hss.4.1",
        "location": "p21 \"frontal sinus\""
      },
      {
        "ref": "hss.4.1",
        "location": "p21 \"sphenoidal sinus\""
      },
      {
        "ref": "hss.4.1",
        "location": "p22 \"nodules of bone that\""
      },
      {
        "ref": "hss.4.1",
        "location": "p22 \"develop in certain tendons\""
      },
      {
        "ref": "hss.4.1",
        "location": "p22 \"pull of a tendon\""
      },
      {
        "ref": "hss.4.1",
        "location": "p22 \"e.g. patella\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p9 \"provide support and stability with little or no movements\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p9 \"Flat bones—with flat surface to facilitate muscular attachment or provide protection to underlying soft tissue\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p9 \"Irregular bones—irregular or mixed shape; cannot be categorized into a particular type\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p9 \"Sesamoid bones—small, somewhat like sesame seed; develop inside tendons\""
      },
      {
        "ref": "hss.revans",
        "location": "p1 \"2. C\""
      }
    ]
  },
  {
    "id": "hss2011-osteo-long-bone-structure",
    "subject": "HSS2011",
    "unit": "hss.osteo",
    "type": "definition",
    "title": "Structure of a long bone",
    "tags": [
      "osteology",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "The connective tissue covering the outer surface of a bone shaft is the _______.",
        "options": [
          "Matrix",
          "Osteon",
          "Periosteum",
          "Endosteum"
        ],
        "answer": 2,
        "explanation": "Model answer C. The periosteum covers the outer surface of the bone shaft; the endosteum lines internal marrow and trabecular surfaces.",
        "src": {
          "ref": "hss.revans",
          "location": "p1 \"1. C\""
        }
      },
      {
        "type": "sequence",
        "prompt": "Order the anatomical regions of a long bone from the center of the shaft outward to the joint surface.",
        "items": [
          "Diaphysis",
          "Metaphysis",
          "Epiphysis"
        ],
        "explanation": "The diaphysis is the central region/shaft, the metaphysis is the transitional neck adjacent to epiphyseal cartilage, and the epiphysis is the terminal bone end."
      },
      {
        "type": "cloze",
        "prompt": "There are two types of bone. ______ bone covers bone surfaces; ______ bone is located internally and gives strength with minimum weight, and its ______ develop along the bone's lines of stress.",
        "accept": [
          "compact; spongy; trabeculae",
          "compact spongy trabeculae",
          "compact, cancellous, trabeculae",
          "compact; cancellous; trabeculae"
        ],
        "explanation": "Model answers: compact bone on surfaces, spongy/cancellous bone internally, and trabeculae aligned along lines of stress.",
        "src": {
          "ref": "hss.revans",
          "location": "p3 \"1. Compact\""
        }
      },
      {
        "type": "typed",
        "prompt": "Large nutrient arteries enter the shaft of a long bone through which opening?",
        "accept": [
          "nutrient foramen"
        ],
        "explanation": "The nutrient foramen is the oblique canal in the shaft transmitting nutrient vessels to the medullary cavity and inner cortex."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "During orthopedic surgery, an assistant suggests stripping the periosteum completely off a fractured femoral diaphysis to achieve clean visual access. Explain why this would impair bone healing.",
        "model": "The periosteum is not an inert covering. Its inner layer is osteogenic, containing osteoprogenitor cells that differentiate into osteoblasts to lay down new bone callus during repair. Furthermore, the periosteum is richly furnished with capillaries that provide critical cortical blood supply. Stripping it strips away both the blood supply and the osteogenic cells needed for union.",
        "rubric": [
          "Identifies the inner layer as osteogenic (producing osteoblasts)",
          "Mentions the capillary blood supply carried by the periosteum",
          "Connects both factors directly to impaired fracture healing and callus formation"
        ]
      }
    ],
    "commonMistakes": [
      "Confusing periosteum (covering the outer cortical surface) with endosteum (lining the internal medullary cavity).",
      "Describing trabeculae as random spongy filler—the syllabus emphasizes that trabeculae develop specifically along lines of mechanical stress.",
      "Assuming the epiphysis is covered entirely by periosteum; the articular contact zone is covered by articular cartilage instead."
    ],
    "sourceRefs": [
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
        "location": "p12 \"diaphysis\""
      },
      {
        "ref": "hss.4.1",
        "location": "p12 \"metaphysis\""
      },
      {
        "ref": "hss.4.1",
        "location": "p12 \"recently developed end\""
      },
      {
        "ref": "hss.4.1",
        "location": "p12 \"adjacent to epiphyseal\""
      },
      {
        "ref": "hss.4.1",
        "location": "p12 \"epiphysis\""
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
      },
      {
        "ref": "hss.4.1",
        "location": "p14 \"dense, solid mass,\""
      },
      {
        "ref": "hss.4.1",
        "location": "p14 \"forms the outer surface layer of all bones\""
      },
      {
        "ref": "hss.4.1",
        "location": "p14 \"spongy, larger cavities\""
      },
      {
        "ref": "hss.4.1",
        "location": "p14 \"trabeculae (supporting\""
      },
      {
        "ref": "hss.4.1",
        "location": "p16 \"medullary cavity\""
      },
      {
        "ref": "hss.4.1",
        "location": "p16 \"containing bone marrow\""
      },
      {
        "ref": "hss.4.1",
        "location": "p17 \"formed by spongy\""
      },
      {
        "ref": "hss.4.1",
        "location": "p17 \"bone, covered with a thin layer of compact bone\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p6 \"dense, solid mass (closely packed & well aligned bone cells) forms the outer surface layer\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p8 \"a fibrous tissue surrounding the outer surface of the bone (except the articular sites)\""
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
    "id": "hss2011-osteo-bone-functions",
    "subject": "HSS2011",
    "unit": "hss.osteo",
    "type": "explain",
    "title": "Functions of bone",
    "tags": [
      "osteology"
    ],
    "practice": [
      {
        "type": "typed",
        "prompt": "Name the two non-mechanical, physiological functions of bone described in the lecture.",
        "accept": [
          "bone marrow and calcium storage",
          "marrow and mineral storage",
          "hematopoiesis and mineral storage",
          "red blood cell production and calcium storage",
          "marrow and storehouse"
        ],
        "explanation": "The two non-mechanical functions are bone marrow hematopoiesis (producing red blood cells, white blood cells, and platelets) and serving as a storehouse for calcium and phosphates."
      },
      {
        "type": "explain",
        "prompt": "Why does bone matrix need both calcium hydroxyapatite and collagen fibers?",
        "model": "Calcium hydroxyapatite (2/3 of matrix) is hard but brittle, providing resistance against compressive loads. Collagen fibers (1/3 of matrix) are tough and flexible, providing tensile strength that resists twisting and bending forces. Together, they prevent bone from being either too brittle or too pliable.",
        "rubric": [
          "Identifies calcium hydroxyapatite as providing hardness/compression resistance",
          "Identifies collagen fibers as providing flexibility/tensile strength",
          "Explains how the composite prevents brittle failure and excessive bending"
        ]
      },
      {
        "type": "mcq",
        "prompt": "Which visceral organs are directly protected by the bony thoracic cage?",
        "options": [
          "Brain and spinal cord",
          "Heart and lungs",
          "Liver and bladder only",
          "Kidneys and intestines only"
        ],
        "answer": 1,
        "explanation": "The thoracic cage (ribs, sternum, and thoracic vertebrae) primarily encloses and shields the heart and lungs."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "An elderly patient with osteoporosis experiences a femoral neck fracture from a minor stumble. Using the functions and architecture of bone, explain how loss of mineral matrix compromises both mechanical support and leverage.",
        "model": "Bone matrix normally provides a rigid supporting framework and acts as a mechanical lever for muscles. Two-thirds of the matrix is calcium hydroxyapatite, which enables bone to support full body weight and resist bending and twisting. In osteoporosis, demineralization and loss of trabeculae weaken the bone's compressive and shear resistance, preventing it from bearing body weight or acting as a rigid lever during movement, leading to fracture under minimal force.",
        "rubric": [
          "Mentions the role of bone as a supporting framework and lever",
          "Identifies calcium hydroxyapatite and trabecular architecture as providing strength",
          "Explains that loss of mineral matrix causes mechanical failure under normal loads"
        ]
      }
    ],
    "commonMistakes": [
      "Listing only mechanical functions (support, leverage, protection) while forgetting hematopoiesis and mineral storage.",
      "Assuming all adult marrow is red marrow; adult long bone shafts contain yellow adipose marrow while red marrow is confined to cancellous bone of the central skeleton.",
      "Thinking bone is an inert rock rather than a metabolically active organ constantly exchanging calcium with the bloodstream."
    ],
    "sourceRefs": [
      {
        "ref": "hss.4.1",
        "location": "p6 \"supporting framework\""
      },
      {
        "ref": "hss.4.1",
        "location": "p6 \"levers for muscles\""
      },
      {
        "ref": "hss.4.1",
        "location": "p6 \"brain, spinal cord, heart\""
      },
      {
        "ref": "hss.4.1",
        "location": "p6 \"lungs, liver and bladder etc.\""
      },
      {
        "ref": "hss.4.1",
        "location": "p6 \"bone marrow => red blood cells\""
      },
      {
        "ref": "hss.4.1",
        "location": "p6 \"storehouse => calcium and phosphates\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p4 \"Main Functions of our skeleton\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p4 \"Strong and tough for support and protection\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p4 \"Light enough for movement\""
      },
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
        "location": "p6 \"Form a hard, heavy shell that\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p6 \"resists bending and twisting\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p6 \"Supports the full weight of\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p6 \"Protect delicate internal\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p6 \"Cut down bone weight for movement\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p6 \"Absorb shock dampens sudden physical forces\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p7 \"contains hematopoietic stem cells that can differentiate into RBC, WBC, and platelets\""
      },
      {
        "ref": "hss.msk.2026",
        "location": "p7 \"contains adipose (fat) tissues and mesenchymal stem cells\""
      },
      {
        "ref": "hss.manual1920",
        "location": "Module 4 introduction, p.41"
      }
    ]
  },
  {
    "id": "hss2011-osteo-pectoral-girdle",
    "subject": "HSS2011",
    "unit": "hss.osteo",
    "type": "definition",
    "title": "The pectoral girdle and shoulder joint",
    "tags": [
      "osteology",
      "upper limb",
      "high-yield",
      "foundation"
    ],
    "practice": [
      {
        "type": "cloze",
        "prompt": "The medial end of the clavicle articulates with the sternum to form the ______ joint, which represents the sole bony articulation between the upper limb and the axial skeleton.",
        "accept": [
          "sternoclavicular",
          "sternoclavicular joint"
        ],
        "explanation": "The sternoclavicular joint is the only skeletal bridge connecting the pectoral girdle and upper limb to the axial trunk.",
        "src": {
          "ref": "hss.4.3",
          "location": "p8 \"Sternoclavicualr joint\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each shoulder region joint to its verified articulating components.",
        "pairs": [
          [
            "Sternoclavicular joint",
            "Medial clavicle and manubrium of sternum"
          ],
          [
            "Acromioclavicular joint",
            "Lateral clavicle and acromion of scapula"
          ],
          [
            "Glenohumeral joint",
            "Glenoid cavity of scapula and head of humerus"
          ]
        ],
        "explanation": "The three anatomical joints around the shoulder region illustrated on HSS2011 slide 8."
      },
      {
        "type": "mcq",
        "prompt": "Which anatomical feature explains why the glenohumeral joint possesses the greatest range of movement of all joints in the human body?",
        "options": [
          "The deep bony acetabular rim",
          "The shallow glenoid cavity enclosing only about one-third of the humeral head",
          "The absence of a synovial membrane",
          "Rigid bony fusion to the thoracic cage"
        ],
        "answer": 1,
        "explanation": "The shallow glenoid fossa allows extraordinary multi-planar mobility because it does not physically lock the humeral head, relying on soft tissue cuffs for stability."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A patient presents with a severe fracture of the clavicle shaft. What primary mechanical function of the pectoral girdle is lost, and what happens to the position of the shoulder on the affected side?",
        "model": "The clavicle acts as a mechanical strut that holds the scapula and glenohumeral joint laterally away from the thoracic wall, allowing the upper limb maximum freedom of movement. When the clavicle fractures, the strut collapses: the weight of the upper limb pulls the shoulder downward, forward, and inward (medially) under the unopposed pull of gravity and the pectoralis major and latissimus dorsi muscles.",
        "rubric": [
          "Identifies the clavicle as a rigid mechanical strut holding the shoulder away from the chest",
          "Explains that fracture causes the shoulder to collapse downward and medially",
          "Recognizes that the sternoclavicular joint is the only bony axial support"
        ]
      }
    ],
    "commonMistakes": [
      "Believing the scapula forms a direct synovial joint with the ribs or spine; it is attached purely by muscular slings.",
      "Confusing the sternoclavicular joint (medial) with the acromioclavicular joint (lateral).",
      "Assuming the shoulder joint is structurally stable because of bone shape; its stability is almost purely muscular and ligamentous."
    ],
    "sourceRefs": [
      {
        "ref": "hss.4.3",
        "location": "p4 \"Outline: Upper Limb\""
      },
      {
        "ref": "hss.4.3",
        "location": "p4 \"Pectoral girdle\""
      },
      {
        "ref": "hss.4.3",
        "location": "p6 \"Pectoral Girdle\""
      },
      {
        "ref": "hss.4.3",
        "location": "p8 \"Fig. 8-2\""
      },
      {
        "ref": "hss.4.3",
        "location": "p8 \"Joints Around Shoulder Region\""
      },
      {
        "ref": "hss.4.3",
        "location": "p8 \"Acromioclavicular joint\""
      },
      {
        "ref": "hss.4.3",
        "location": "p8 \"Sternoclavicualr joint\""
      },
      {
        "ref": "hss.4.3",
        "location": "p8 \"Glenohumeral joint\""
      },
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
        "location": "p16 \"Pectoralis major\""
      },
      {
        "ref": "hss.4.3",
        "location": "p16 \"Latissimus dorsi\""
      },
      {
        "ref": "hss.4.3",
        "location": "p19 \"Axillary nerve\""
      },
      {
        "ref": "hss.ul.2026",
        "location": "p2 \"Pectoral girdle\" — \"Bones (clavicle and scapula) in the appendicular skeleton that\" — \"connect the arm (humerus) to the axial skeleton (manubrium)\""
      },
      {
        "ref": "hss.ul.2026",
        "location": "p7 \"Glenohumeral Joint\" — \"(Ball & socket joint)\" — \"Head of humerus articulates\" — \"with the glenoid cavity of\" — \"the scapula\""
      }
    ]
  },
  {
    "id": "hss2011-osteo-forearm-carpals",
    "subject": "HSS2011",
    "unit": "hss.osteo",
    "type": "definition",
    "title": "Bones of the forearm, wrist and hand",
    "tags": [
      "osteology",
      "upper limb",
      "high-yield",
      "foundation"
    ],
    "practice": [
      {
        "type": "cloze",
        "prompt": "The deep C-shaped articular depression of the proximal ulna that articulates with the trochlea of the humerus is the ______.",
        "accept": [
          "trochlear notch",
          "Trochlear notch"
        ],
        "explanation": "Model answer from past exam papers: Trochlear notch.",
        "src": {
          "ref": "hss.revans",
          "location": "p3 \"4. Trochlear notch\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each carpal bone to its verified anatomical characteristic.",
        "pairs": [
          [
            "Scaphoid",
            "Boat-shaped lateral proximal carpal; most commonly fractured"
          ],
          [
            "Pisiform",
            "Pea-shaped sesamoid bone resting on triquetrum"
          ],
          [
            "Trapezium",
            "Distal carpal articulating with first metacarpal of thumb"
          ],
          [
            "Capitate",
            "Largest carpal bone occupying the central position"
          ],
          [
            "Hamate",
            "Distal carpal characterized by a prominent anterior hook"
          ]
        ],
        "explanation": "Verified carpal bone features from HSS2011 Module 4.3 slides 11 and 32."
      },
      {
        "type": "sequence",
        "prompt": "Arrange the carpal bones of the proximal row from lateral (radial / thumb side) to medial (ulnar side).",
        "items": [
          "Scaphoid",
          "Lunate",
          "Triquetrum",
          "Pisiform"
        ],
        "explanation": "Standard anatomical sequence of the proximal carpal row."
      },
      {
        "type": "mcq",
        "prompt": "Carpal Tunnel Syndrome (CTS) is caused by compression of which structure travelling beneath the flexor retinaculum?",
        "options": [
          "Radial nerve",
          "Ulnar nerve",
          "Median nerve",
          "Musculocutaneous nerve"
        ],
        "answer": 2,
        "explanation": "The median nerve traverses the carpal tunnel beneath the flexor retinaculum; compression leads to CTS.",
        "src": {
          "ref": "hss.4.3",
          "location": "p32 \"Carpal Tunnel Syndrome (CTS) is associated by\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A computer programmer complains of burning numbness and tingling in the palmar aspect of the right thumb, index, and middle fingers, accompanied by weakness in thumb gripping. Sensation in the little finger is completely normal. Identify the syndrome, the compressed nerve, the anatomical boundary creating the compression, and why the little finger is spared.",
        "model": "The patient has Carpal Tunnel Syndrome (CTS), caused by compression of the median nerve beneath the flexor retinaculum within the carpal tunnel. The median nerve supplies cutaneous sensation to the palmar surface of the lateral three and a half digits (thumb, index, middle, and half of ring finger) and motor innervation to the thenar muscles. The little finger is completely spared because its sensation and hypothenar motor control are supplied by the ulnar nerve, which travels outside the carpal tunnel (superficial to the flexor retinaculum in Guyon's canal).",
        "rubric": [
          "Diagnoses Carpal Tunnel Syndrome (CTS)",
          "Identifies the median nerve and flexor retinaculum",
          "Explains that the little finger is innervated by the ulnar nerve outside the carpal tunnel"
        ]
      }
    ],
    "commonMistakes": [
      "Assuming the ulnar nerve passes through the carpal tunnel; the ulnar nerve passes superficial to the flexor retinaculum.",
      "Swapping the positions of trapezium and trapezoid; remember trapezi-UM is by the th-UMB.",
      "Counting the pisiform in the distal row; it sits in the proximal row on the triquetrum."
    ],
    "sourceRefs": [
      {
        "ref": "hss.4.3",
        "location": "p11 \"Carpal Bones\""
      },
      {
        "ref": "hss.4.3",
        "location": "p11 \"Capitate\""
      },
      {
        "ref": "hss.4.3",
        "location": "p11 \"Hamate\""
      },
      {
        "ref": "hss.4.3",
        "location": "p11 \"Trapezoid\""
      },
      {
        "ref": "hss.4.3",
        "location": "p11 \"Triquetrum\""
      },
      {
        "ref": "hss.4.3",
        "location": "p11 \"Trapezium\""
      },
      {
        "ref": "hss.4.3",
        "location": "p11 \"Pisiform\""
      },
      {
        "ref": "hss.4.3",
        "location": "p11 \"Scaphoid\""
      },
      {
        "ref": "hss.4.3",
        "location": "p11 \"Lunate\""
      },
      {
        "ref": "hss.4.3",
        "location": "p25 \"Triceps brachii is an extensor of the forearm.\""
      },
      {
        "ref": "hss.4.3",
        "location": "p32 \"Wrist Region: Carpal Tunnel\""
      },
      {
        "ref": "hss.4.3",
        "location": "p32 \"Median nerve\""
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
        "ref": "hss.4.3",
        "location": "p32 \"Flexor Retinaculum\""
      },
      {
        "ref": "hss.4.3",
        "location": "p32 \"Carpal Tunnel Syndrome (CTS) is associated by\""
      },
      {
        "ref": "hss.revans",
        "location": "p3 \"4. Trochlear notch\""
      },
      {
        "ref": "hss.ul.2026",
        "location": "p8 \"Radius—thumb side\" — \"Ulna—little finger side\" — \"Interosseous membrane\""
      },
      {
        "ref": "hss.ul.2026",
        "location": "p9 \"Elbow joint—hinge movement\" — \"(humeroulnar & humeroradial joint)\""
      },
      {
        "ref": "hss.ul.2026",
        "location": "p10 \"Elbow joint— rotational movement\" — \"(radioulnar joint)\""
      },
      {
        "ref": "hss.ul.2026",
        "location": "p11 \"Sam Likes To Push The Toy Car Hard\" — \"Wrist bones and wrist joints\""
      },
      {
        "ref": "hss.ul.2026",
        "location": "p12 \"Wrist (radiocarpal) joint\" — \"Condyloid joint\" — \"Intercarpal joint is a gliding joint\""
      },
      {
        "ref": "hss.ul.2026",
        "location": "p12 \"Also found in metacarpophalangeal joints (2nd to 5th only; 1st is hinge joint)\""
      }
    ]
  },
  {
    "id": "hss2011-osteo-vertebra-parts",
    "subject": "HSS2011",
    "unit": "hss.osteo",
    "type": "diagram",
    "title": "General anatomical structure of a typical vertebra",
    "tags": [
      "osteology",
      "high-yield"
    ],
    "practice": [
      {
        "type": "cloze",
        "prompt": "The vertebral body serves as the primary ______ component of the spine.",
        "accept": [
          "weight-bearing",
          "weight bearing"
        ],
        "explanation": "The vertebral body is the thick anterior cylindrical mass responsible for load-bearing and body weight transmission.",
        "src": {
          "ref": "hss.m0.1718",
          "location": "p21 \"(serves as the primary\" — \"weight-bearing\""
        }
      },
      {
        "type": "mcq",
        "prompt": "The vertebral arch is formed on each side by which two bony components?",
        "options": [
          "Pedicle and lamina",
          "Spinous process and transverse process",
          "Centrum and facet",
          "Odontoid process and arch",
          "Transverse foramen and lamina"
        ],
        "answer": 0,
        "explanation": "The vertebral arch is built bilaterally by the anterior pedicle and the posterior lamina.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p77 \"B1. Vertebral foramen B2. Pedicle\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each part of a typical vertebra to its primary structural role.",
        "pairs": [
          [
            "Vertebral body",
            "Primary weight-bearing component anteriorly"
          ],
          [
            "Vertebral foramen",
            "Passage and protection of the spinal cord"
          ],
          [
            "Pedicle",
            "Connects vertebral body to lamina forming lateral arch wall"
          ],
          [
            "Spinous process",
            "Posterior projection for ligament and muscle attachment"
          ]
        ],
        "explanation": "Core anatomical roles of vertebra components from HSS2011 Module 0."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "An axial lumbar CT shows marked hypertrophy of the ligamentum flavum and facet osteophytes significantly narrowing the central vertebral foramen. Explain the anatomical boundary of this space and the neurological consequences of this central stenosis.",
        "model": "The central vertebral foramen is bounded anteriorly by the posterior aspect of the vertebral body and intervertebral disc, laterally by the pedicles, and posteriorly by the laminae and ligamentum flavum. Severe narrowing (stenosis) of this canal compresses the cauda equina nerve roots traveling within the dural sac, resulting in neurogenic claudication characterized by bilateral buttock and lower extremity pain, heaviness, and numbness exacerbated by lumbar extension.",
        "rubric": [
          "States the anatomical boundaries of the vertebral foramen",
          "Identifies the content as the spinal canal / cauda equina / spinal cord",
          "Explains how compression of these structures results in neurological deficits"
        ]
      }
    ],
    "commonMistakes": [
      "Confusing pedicle (anterior, connects body to processes) with lamina (posterior, connects processes to midline spinous process).",
      "Believing the spinal cord passes through the intervertebral foramen; the spinal cord passes through the central vertebral canal, while spinal nerves exit through the intervertebral foramina.",
      "Counting 5 processes instead of 7 (1 spinous + 2 transverse + 4 articular = 7 total)."
    ],
    "sourceRefs": [
      {
        "ref": "hss.4.2",
        "location": "p44 \"Vertebral\""
      },
      {
        "ref": "hss.m0.1718",
        "location": "p21 \"General structures of a vertebra\""
      },
      {
        "ref": "hss.m0.1718",
        "location": "p21 \"Spinous process\""
      },
      {
        "ref": "hss.m0.1718",
        "location": "p21 \"Articular\""
      },
      {
        "ref": "hss.m0.1718",
        "location": "p21 \"Transverse process\""
      },
      {
        "ref": "hss.m0.1718",
        "location": "p21 \"Vertebral arch\""
      },
      {
        "ref": "hss.m0.1718",
        "location": "p21 \"Vertebral foramen\""
      },
      {
        "ref": "hss.m0.1718",
        "location": "p21 \"(serves as the primary\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p77 \"B1. Vertebral foramen B2. Pedicle\""
      },
      {
        "ref": "hss.revans",
        "location": "p5 \"B1. Vertebral foramen B2. Pedicle\""
      }
    ]
  },
  {
    "id": "hss2011-osteo-vertebral-column",
    "subject": "HSS2011",
    "unit": "hss.osteo",
    "type": "sequence",
    "title": "Vertebral column regions and physiological curvatures",
    "tags": [
      "osteology",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "Which of the following vertebral curvatures is a primary curvature present from the embryonic stage?",
        "options": [
          "Thoracic curvature",
          "Cervical curvature",
          "Lumbar curvature",
          "Cervicothoracic curvature",
          "Lumbosacral lordosis"
        ],
        "answer": 0,
        "explanation": "The thoracic and pelvic/sacral curvatures are primary curves, concave anteriorly and present during embryonic life.",
        "src": {
          "ref": "hss.m0.1718",
          "location": "p16 \"Thoracic curvature\" — \"(primary curve)\""
        }
      },
      {
        "type": "sequence",
        "prompt": "Arrange the regions of the vertebral column in craniocaudal order (superior to inferior).",
        "items": [
          "Cervical vertebrae (C1–C7)",
          "Thoracic vertebrae (T1–T12)",
          "Lumbar vertebrae (L1–L5)",
          "Sacrum (S1–S5 fused)",
          "Coccyx (Co1–Co4 fused)"
        ],
        "explanation": "Anatomical craniocaudal sequence of vertebral column regions from HSS2011 Module 0."
      },
      {
        "type": "typed",
        "prompt": "How many individual vertebrae fuse together to form the adult sacrum?",
        "accept": [
          "5",
          "five"
        ],
        "explanation": "The sacrum is formed by the fusion of 5 sacral vertebrae (S1–S5).",
        "src": {
          "ref": "hss.m0.1718",
          "location": "p15 \"Sacrum\" — \"(S1-S5 fused)\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A lateral full-spine radiograph of an adolescent with back pain demonstrates abnormal posterior convexity of 65° in the thoracic spine (normal: 20°–40°) and excessive anterior convexity in the lumbar spine. Name the primary and secondary curvatures involved, classify each curve embryologically, and identify the deformities.",
        "model": "The thoracic spine demonstrates hyperkyphosis, which is an excessive exaggeration of the normal primary thoracic curvature (concave anteriorly / convex posteriorly, developed embryologically). The lumbar spine demonstrates compensatory hyperlordosis, which is an accentuation of the secondary lumbar curvature (concave posteriorly / convex anteriorly, developed postnatally with walking). The compensatory lumbar lordosis serves to keep the head aligned vertically over the pelvis despite the severe thoracic kyphosis.",
        "rubric": [
          "Identifies thoracic curvature as a primary curvature",
          "Identifies lumbar curvature as a secondary curvature",
          "Correctly describes kyphosis and lordosis directions and developmental timing"
        ]
      }
    ],
    "commonMistakes": [
      "Confusing primary (anteriorly concave, thoracic & sacral) with secondary (posteriorly concave, cervical & lumbar).",
      "Counting 33 separate bones in an adult column instead of 26 (due to fusion of sacrum and coccyx).",
      "Mixing thoracic (12) and cervical (7) vertebrae counts; use the mealtime mnemonic 7, 12, 5."
    ],
    "sourceRefs": [
      {
        "ref": "hss.m0.1718",
        "location": "p15 \"Vertebral column\""
      },
      {
        "ref": "hss.m0.1718",
        "location": "p15 \"Cervical vertebrae\""
      },
      {
        "ref": "hss.m0.1718",
        "location": "p15 \"Thoracic vertebrae\""
      },
      {
        "ref": "hss.m0.1718",
        "location": "p15 \"Lumbar vertebrae\""
      },
      {
        "ref": "hss.m0.1718",
        "location": "p15 \"Sacrum\""
      },
      {
        "ref": "hss.m0.1718",
        "location": "p15 \"(Co1 – Co4 fused)\""
      },
      {
        "ref": "hss.m0.1718",
        "location": "p16 \"Primary curvature\""
      },
      {
        "ref": "hss.m0.1718",
        "location": "p16 \"- concave anteriorly\""
      },
      {
        "ref": "hss.m0.1718",
        "location": "p16 \"- developed during embryonic stage\""
      },
      {
        "ref": "hss.m0.1718",
        "location": "p16 \"Secondary curvature\""
      },
      {
        "ref": "hss.m0.1718",
        "location": "p16 \"- concave posteriorly\""
      },
      {
        "ref": "hss.m0.1718",
        "location": "p16 \"- developed after birth\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p59 \"Cervical Curvature\""
      }
    ]
  },
  {
    "id": "hss2011-osteo-c1-c2",
    "subject": "HSS2011",
    "unit": "hss.osteo",
    "type": "comparison",
    "title": "Atlas (C1), axis (C2), and craniovertebral joint biomechanics",
    "tags": [
      "osteology",
      "high-yield"
    ],
    "practice": [
      {
        "type": "cloze",
        "prompt": "The transverse ligament holds the atlas and the ______ of the axis in place.",
        "accept": [
          "odontoid process",
          "dens",
          "odontoid process (dens)",
          "dens (odontoid process)"
        ],
        "explanation": "The transverse ligament of the atlas binds the dens (odontoid process) of C2 firmly against the anterior arch of C1.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p48 \"3. The transverse ligament holds the atlas and the ______ of the axis in place.\""
        }
      },
      {
        "type": "mcq",
        "prompt": "The atlanto-occipital joint between the occipital condyles and C1 allows which primary head movement?",
        "options": [
          "Flexion and extension (nodding \"yes\")",
          "Axial rotation (shaking \"no\")",
          "Lateral gliding",
          "Circumduction only",
          "Lateral abduction only"
        ],
        "answer": 0,
        "explanation": "The atlanto-occipital joint allows sagittal flexion and extension of the head (nodding \"YES\").",
        "src": {
          "ref": "hss.m0.1718",
          "location": "p29 \"The atlanto-occipital joint allows flexion and extension. (YES!!!)\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The articulation between the first cervical vertebra (C1) and second cervical vertebra (C2) is called the ______ joint.",
        "accept": [
          "atlantoaxial",
          "atlantoaxial joint",
          "atlanto-axial",
          "atlanto-axial joint"
        ],
        "explanation": "The articulation between C1 (atlas) and C2 (axis) is the atlantoaxial joint.",
        "src": {
          "ref": "hss.fib5yr",
          "location": "p24 \"The articulation between the between the first cervical vertebra and second cervical\" — \"atlantoaxial joint.\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each specialized cervical vertebra or feature to its unique characteristic.",
        "pairs": [
          [
            "Atlas (C1)",
            "Lacks vertebral body and spinous process; carries lateral masses"
          ],
          [
            "Axis (C2)",
            "Possesses dens (odontoid process) as rotational pivot"
          ],
          [
            "Transverse foramen",
            "Passage for vertebral arteries in C1–C6"
          ],
          [
            "Vertebra prominens (C7)",
            "Long, non-bifid palpable spinous process"
          ]
        ],
        "explanation": "Key structural specializations of the cervical vertebrae from HSS2011 Module 4.2."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A motor vehicle collision victim suffers a hyperflexion cervical spine injury. A lateral cervical radiograph demonstrates an anterior atlanto-dens interval (AADI) of 6 mm (normal adult: <3 mm). Identify the damaged stabilizing structure, the mechanism, and why this is life-threatening.",
        "model": "An AADI greater than 3 mm indicates rupture or severe disruption of the transverse ligament of the atlas. This ligament normally secures the odontoid process (dens) of C2 firmly against the anterior arch of C1. When the transverse ligament is torn, the atlas slides anteriorly relative to the axis during neck flexion, causing the rigid dens to displace posteriorly into the anterior vertebral canal, where it directly compresses the upper cervical spinal cord or medulla oblongata, risking quadriplegia or fatal respiratory arrest from phrenic nerve impairment.",
        "rubric": [
          "Identifies rupture of the transverse ligament of the atlas",
          "Explains the displacement of the dens / atlas relative to each other",
          "States the risk of spinal cord / brainstem compression resulting in paralysis or death"
        ]
      }
    ],
    "commonMistakes": [
      "Attributing head rotation (\"no\") to the atlanto-occipital joint instead of the atlantoaxial joint.",
      "Thinking the atlas (C1) has a prominent spinous process; C1 has NO spinous process and NO body.",
      "Forgetting that vertebral arteries ascend through transverse foramina of C1–C6 before entering the foramen magnum."
    ],
    "sourceRefs": [
      {
        "ref": "hss.4.2",
        "location": "p42 \"7 vertebrae in cervical region\""
      },
      {
        "ref": "hss.4.2",
        "location": "p42 \"3 atypical (C1, C2, and C7)\""
      },
      {
        "ref": "hss.4.2",
        "location": "p43 \"Atlantoaxial Joint\""
      },
      {
        "ref": "hss.4.2",
        "location": "p43 \"Dens (Odontoid process)\""
      },
      {
        "ref": "hss.m0.1718",
        "location": "p28 \"The vertebral arteries pass through the transverse foramina\""
      },
      {
        "ref": "hss.m0.1718",
        "location": "p28 \"Bifid spinous\""
      },
      {
        "ref": "hss.m0.1718",
        "location": "p29 \"The atlanto-occipital joint allows flexion and extension. (YES!!!)\""
      },
      {
        "ref": "hss.m0.1718",
        "location": "p29 \"The median atlanto-axial joint allows rotation of the head. (NO!!!)\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p48 \"3. The transverse ligament holds the atlas and the ______ of the axis in place.\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p75 \"3. Odontoid process (dens)\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p24 \"The articulation between the between the first cervical vertebra and second cervical\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p24 \"atlantoaxial joint.\""
      }
    ]
  },
  {
    "id": "hss2011-osteo-skull-sutures",
    "subject": "HSS2011",
    "unit": "hss.osteo",
    "type": "definition",
    "title": "Skull bones, cranial sutures, and anthropological landmarks",
    "tags": [
      "osteology",
      "skull",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "Which suture joins the parietal bone and temporal bone together?",
        "options": [
          "Squamous suture",
          "Coronal suture",
          "Lambdoid suture",
          "Sagittal suture",
          "Frontonasal suture"
        ],
        "answer": 0,
        "explanation": "The squamous suture joins the lower beveled edge of the parietal bone with the squamous portion of the temporal bone.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p46 \"2. Which suture joint the parietal bone and temporal together?\" — \"A. Squamous suture\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The junction between the coronal suture and sagittal suture is called the ______.",
        "accept": [
          "bregma",
          "Bregma"
        ],
        "explanation": "Bregma is the craniometric landmark where the coronal and sagittal sutures intersect.",
        "src": {
          "ref": "hss.fib5yr",
          "location": "p18 \"bregma.\""
        }
      },
      {
        "type": "mcq",
        "prompt": "The adult human skull is composed of how many cranial and facial bones?",
        "options": [
          "8 cranial bones and 14 facial bones",
          "14 cranial bones and 8 facial bones",
          "6 cranial bones and 16 facial bones",
          "10 cranial bones and 12 facial bones",
          "12 cranial bones and 10 facial bones"
        ],
        "answer": 0,
        "explanation": "The skull consists of 8 cranial bones enclosing the brain and 14 facial bones forming the facial skeleton (22 bones total).",
        "src": {
          "ref": "hss.4.2",
          "location": "p5 \"8 cranial bones +\" — \"14 facial bones.\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each cranial suture and anthropological landmark to its articulating bones or boundaries.",
        "pairs": [
          [
            "Coronal suture",
            "Frontal bone and paired parietal bones"
          ],
          [
            "Sagittal suture",
            "Two paired parietal bones along superior midline"
          ],
          [
            "Lambdoid suture",
            "Parietal bones and occipital bone"
          ],
          [
            "Squamous suture",
            "Parietal bone and squamous part of temporal bone"
          ]
        ],
        "explanation": "Verified suture articulations from HSS2011 Module 4.2 slides 8–10."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "An emergency CT scan of a patient struck on the temple demonstrates a biconvex (lens-shaped) hyperdense extra-axial collection beneath the pterion. Name the landmark, the four articulating bones meeting there, and the specific blood vessel damaged.",
        "model": "The landmark is the pterion, an H-shaped suture junction in the temporal fossa where four bones articulate: the frontal bone, parietal bone, squamous part of the temporal bone, and greater wing of the sphenoid bone. Trauma to this thin region lacerates the anterior division of the middle meningeal artery running in an osseous groove on the internal cranial table, producing an arterial epidural hematoma that classically assumes a biconvex lentiform shape because it is bounded by suture attachments of the dura mater.",
        "rubric": [
          "Identifies the landmark as pterion",
          "Lists the 4 articulating bones: frontal, parietal, temporal, and sphenoid",
          "Identifies the anterior branch of the middle meningeal artery and epidural hematoma"
        ]
      }
    ],
    "commonMistakes": [
      "Confusing bregma (coronal + sagittal, anterior) with lambda (sagittal + lambdoid, posterior).",
      "Listing the mandible as immovable; it is the only freely movable bone in the adult skull (at the TMJ).",
      "Mixing cranial and facial bone counts: cranium has 8 bones; face has 14 bones."
    ],
    "sourceRefs": [
      {
        "ref": "hss.4.2",
        "location": "p5 \"The skull is composed of\""
      },
      {
        "ref": "hss.4.2",
        "location": "p5 \"8 cranial bones +\""
      },
      {
        "ref": "hss.4.2",
        "location": "p5 \"14 facial bones.\""
      },
      {
        "ref": "hss.4.2",
        "location": "p8 \"22 bones joined by Sutures\""
      },
      {
        "ref": "hss.4.2",
        "location": "p9 \"Major Sutures and Anthropological Points\""
      },
      {
        "ref": "hss.4.2",
        "location": "p9 \"Bregma\""
      },
      {
        "ref": "hss.4.2",
        "location": "p9 \"Lambda\""
      },
      {
        "ref": "hss.4.2",
        "location": "p10 \"Squamous suture\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p46 \"2. Which suture joint the parietal bone and temporal together?\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p46 \"A. Squamous suture\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p18 \"The [56] squamous suture joins the parietal bone and the temporal bone of the skull\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p18 \"bregma.\""
      }
    ]
  },
  {
    "id": "hss2011-osteo-pelvic-girdle",
    "subject": "HSS2011",
    "unit": "hss.osteo",
    "type": "definition",
    "title": "Pelvic girdle, hip joint, and the proximal and distal femur",
    "tags": [
      "osteology",
      "lower limb",
      "high-yield",
      "foundation"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "The head of the femur articulates with which anatomical socket?",
        "options": [
          "Acetabulum",
          "Glenoid cavity",
          "Acromion",
          "Greater trochanter",
          "Medial condyle"
        ],
        "answer": 0,
        "explanation": "The head of femur articulates with the acetabulum of the hip bone. The glenoid cavity is the shoulder socket.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p46 \"9. The head of femur articulates with\" — \"A. Acetabulum\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The three bones that fuse to form the hip bone are the ______, ______ and ______.",
        "accept": [
          "ilium, ischium, pubis",
          "ilium; ischium; pubis",
          "ilium ischium pubis"
        ],
        "explanation": "The three bones forming the hip bone are ilium, ischium, and pubis, converging in the acetabulum.",
        "src": {
          "ref": "hss.fib5yr",
          "location": "p25 \"There are three bones forming the hip bone, including ilium,\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which of the following muscles is a major hip abductor?",
        "options": [
          "Gluteus medius",
          "Tibialis anterior",
          "Adductor magnus",
          "Gastrocnemius",
          "Rectus femoris"
        ],
        "answer": 0,
        "explanation": "Gluteus medius is a powerful hip abductor innervated by the superior gluteal nerve.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p46 \"10. Which of the following muscle is a hip abductor?\" — \"A. Gluteus medius\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each pelvic feature to its verified sexual dimorphism characteristics.",
        "pairs": [
          [
            "General appearance of female pelvis",
            "Broader, smoother, less robust"
          ],
          [
            "General appearance of male pelvis",
            "Narrower, rougher, more robust"
          ],
          [
            "Female pubic angle",
            "100º or more"
          ],
          [
            "Male pubic angle",
            "Under 90º"
          ]
        ],
        "explanation": "Verified sex differences in the bony pelvis from HSS2011 Module 2.3 slide 43."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "An emergency AP pelvis radiograph of an elderly fall victim reveals a displaced fracture across the femoral neck. Describe the anatomical relationship between the fracture site, the femoral head, and the greater and lesser trochanters, and explain the joint stability consequences.",
        "model": "The neck of the femur is the constricted pyramidal bar of bone connecting the spherical femoral head to the shaft, situated medial and superior to the greater trochanter and superior to the lesser trochanter. Because the head is anchored deep inside the acetabulum by the acetabular labrum and joint capsule, a displaced neck fracture completely disconnects the weight-bearing femoral head from the shaft, causing characteristic external rotation and shortening of the injured lower limb.",
        "rubric": [
          "Correctly positions the femoral neck between the head and the trochanters",
          "Identifies the head seating inside the acetabulum of the hip bone",
          "Explains the consequence of separating the articulating head from the shaft"
        ]
      }
    ],
    "commonMistakes": [
      "Confusing the acetabulum (hip socket) with the glenoid cavity (shoulder socket).",
      "Listing the sacrum as one of the three bones forming the hip bone; the sacrum is an axial bone articulating at the sacroiliac joint, not a part of the hip bone itself.",
      "Swapping male and female pubic angles: females have a wide arch (100° or more); males have an acute V-shape (under 90°)."
    ],
    "sourceRefs": [
      {
        "ref": "hss.4.3",
        "location": "p37 \"Pelvic Girdle\""
      },
      {
        "ref": "hss.4.3",
        "location": "p38 \"Femur (Right)\""
      },
      {
        "ref": "hss.4.3",
        "location": "p38 \"Greater trochanter\""
      },
      {
        "ref": "hss.4.3",
        "location": "p38 \"Neck\""
      },
      {
        "ref": "hss.4.3",
        "location": "p38 \"Lesser trochanter\""
      },
      {
        "ref": "hss.4.3",
        "location": "p38 \"Medial condyle\""
      },
      {
        "ref": "hss.4.3",
        "location": "p38 \"Lateral condyle\""
      },
      {
        "ref": "hss.4.3",
        "location": "p39 \"Proximal End of Femur\""
      },
      {
        "ref": "hss.4.3",
        "location": "p39 \"Angle of inclination\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p17 \"The plane of Pelvic inlet is defined by the sacral promontory\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p17 \"The plane of Pelvic outlet is defined by the tip of coccyx and inferior margin of pubic symphysis.\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p44 \"Sex differences in the Bony Pelvis\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p44 \"Narrower, rougher, more robust General Appearance Broader, smoother, less robust\""
      },
      {
        "ref": "hss.3.3.2019",
        "location": "p44 \"Under 90º Pubic angle 100º or more\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p26 \"There are three bones forming the hip bone, including ilium,\""
      },
      {
        "ref": "hss.fib5yr",
        "location": "p26 \"The head of femur articulates with the\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p47 \"9. The head of femur articulates with\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p47 \"A. Acetabulum\""
      },
      {
        "ref": "hss.ll.2026",
        "location": "p4 \"The Pelvic girdle\" — \"Consists of a paired of hip bones that connect the lower limb to the axial skeleton\""
      },
      {
        "ref": "hss.ll.2026",
        "location": "p6 \"Sacroiliac joint (pelvic joint)\" — \"Hip bone (Ilium + Ischium + Pubis) joins with sacrum and coccyx to form bony pelvis\""
      },
      {
        "ref": "hss.ll.2026",
        "location": "p7 \"Epicondyle: for muscle attachment\" — \"Condyle: (for joint articulation\""
      }
    ]
  },
  {
    "id": "hss2011-osteo-leg-tarsals",
    "subject": "HSS2011",
    "unit": "hss.osteo",
    "type": "definition",
    "title": "Leg bones (tibia and fibula), the patella, and the tarsal bones",
    "tags": [
      "osteology",
      "lower limb",
      "foundation",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "Which bone carries the lateral malleolus at the ankle?",
        "options": [
          "Fibula",
          "Tibia",
          "Talus",
          "Calcaneus",
          "Femur"
        ],
        "answer": 0,
        "explanation": "The lateral malleolus is the expanded distal end of the fibula. The tibia carries the medial malleolus.",
        "src": {
          "ref": "hss.4.3",
          "location": "p41 \"Tibia and Fibula (Right)\" — \"Lateral malleolus\""
        }
      },
      {
        "type": "mcq",
        "prompt": "What is the collective anatomical name for the ankle and heel bones?",
        "options": [
          "Tarsal bones",
          "Carpal bones",
          "Phalangeal bones",
          "Metacarpal bones",
          "Sesamoid bones"
        ],
        "answer": 0,
        "explanation": "The ankle and heel bones are the tarsal bones (7 per foot). Carpal bones are in the wrist (8 per hand).",
        "src": {
          "ref": "hss.manual1920",
          "location": "p47 \"6. What is the collective name for wrist bones?\" — \"B. Tarsal bones\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Sesamoid bones like the patella develop within tendons to perform which primary mechanical function?",
        "options": [
          "Alter the direction of pull of a tendon and increase leverage",
          "Store red bone marrow for hematopoiesis",
          "Provide articular shock absorption like fibrocartilaginous discs",
          "Form fibrous syndesmoses between parallel long bones"
        ],
        "answer": 0,
        "explanation": "Sesamoid bones develop in certain tendons to alter the direction of pull of a tendon, boosting its mechanical advantage.",
        "src": {
          "ref": "hss.4.1",
          "location": "p22 \"Sesamoid bones\" — \"nodules of bone that\" — \"alter the direction of pull of a tendon e.g. patella\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each tarsal bone to its verified group and anatomical role.",
        "pairs": [
          [
            "Talus",
            "Proximal tarsal articulating with tibia and fibula at the ankle mortise"
          ],
          [
            "Calcaneus",
            "Heel bone; largest tarsal anchoring the calcaneal tendon"
          ],
          [
            "Navicular",
            "Intermediate boat-shaped tarsal anterior to the talus"
          ],
          [
            "Medial cuneiform",
            "Distal wedge-shaped tarsal articulating with first metatarsal"
          ]
        ],
        "explanation": "Classification of tarsal bones from HSS2011 Module 4.3 slide 41."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A footballer sustains a severe twisting injury to the lower leg. Radiography reveals a fracture of the distal fibular shaft and tearing of the inferior tibiofibular syndesmosis with widening of the ankle mortise. Explain the anatomical role of the distal syndesmosis and how its disruption destabilizes the ankle.",
        "model": "The distal tibiofibular joint is a fibrous syndesmosis where the tibia and fibula are tightly bound by an interosseous ligament and inferior tibiofibular ligaments. This syndesmosis holds the medial malleolus of the tibia and lateral malleolus of the fibula tightly against the trochlea of the talus, forming the stable mortise of the talocrural joint. Disruption of this syndesmosis allows the mortise to widen, permitting pathological shifting of the talus and severe ankle instability.",
        "rubric": [
          "Identifies the distal tibiofibular joint as a fibrous syndesmosis",
          "Describes the ankle mortise formed by the two malleoli around the talus",
          "Explains that syndesmotic tearing widens the mortise and destabilizes talar articulation"
        ]
      }
    ],
    "commonMistakes": [
      "Confusing carpals (wrist, 8) with tarsals (ankle/foot, 7).",
      "Assigning the medial malleolus to the fibula; medial malleolus belongs to the tibia.",
      "Assuming the fibula bears significant body weight; weight is transmitted entirely through the femur and tibia into the talus."
    ],
    "sourceRefs": [
      {
        "ref": "hss.4.1",
        "location": "p22 \"Sesamoid bones\""
      },
      {
        "ref": "hss.4.1",
        "location": "p22 \"nodules of bone that\""
      },
      {
        "ref": "hss.4.1",
        "location": "p31 \"Syndesmosis\""
      },
      {
        "ref": "hss.4.1",
        "location": "p53 \"superior tibiofibular\""
      },
      {
        "ref": "hss.4.3",
        "location": "p40 \"Patella (Right)\""
      },
      {
        "ref": "hss.4.3",
        "location": "p40 \"Base of patella\""
      },
      {
        "ref": "hss.4.3",
        "location": "p40 \"Apex of patella\""
      },
      {
        "ref": "hss.4.3",
        "location": "p41 \"Tibia and Fibula (Right)\""
      },
      {
        "ref": "hss.4.3",
        "location": "p41 \"tibiofibular joint\""
      },
      {
        "ref": "hss.4.3",
        "location": "p42 \"Ankle & Foot\""
      },
      {
        "ref": "hss.4.3",
        "location": "p42 \"Key to Tarsal Bones\""
      },
      {
        "ref": "hss.4.3",
        "location": "p42 \"Talus\""
      },
      {
        "ref": "hss.4.3",
        "location": "p42 \"Calcaneus\""
      },
      {
        "ref": "hss.4.3",
        "location": "p42 \"Navicular\""
      },
      {
        "ref": "hss.4.3",
        "location": "p42 \"Cuboid\""
      },
      {
        "ref": "hss.4.3",
        "location": "p42 \"Medial cuneiform\""
      },
      {
        "ref": "hss.4.3",
        "location": "p42 \"Immediate cuneiform\""
      },
      {
        "ref": "hss.4.3",
        "location": "p42 \"Lateral cuneiform\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p47 \"6. What is the collective name for wrist bones?\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p47 \"B. Tarsal bones\""
      },
      {
        "ref": "hss.ll.2026",
        "location": "p10 \"Tibia & Fibula (Right)\" — \"Proximal tibiofibular joint\" — \"Distal tibiofibular joint\""
      },
      {
        "ref": "hss.ll.2026",
        "location": "p12 \"Ankle joint (talocrural joint)—talus joining with:\" — \"Hinge joint\""
      },
      {
        "ref": "hss.ll.2026",
        "location": "p13 \"Subtalar joint (plane)—talus joining with calcaneus:\""
      },
      {
        "ref": "hss.ll.2026",
        "location": "p13 \"Majority of ankle sprain involve an inversion-induced injury\""
      },
      {
        "ref": "hss.ll.2026",
        "location": "p13 \"The eversion injury (the foot turns out) is much less frequent because the deltoid ligament\""
      }
    ]
  },
  {
    "id": "hss2011-osteo-ribs-sternum",
    "subject": "HSS2011",
    "unit": "hss.osteo",
    "type": "definition",
    "title": "The thoracic cage: sternum, sternal angle, rib classification and a typical rib",
    "tags": [
      "osteology",
      "thorax",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "The sternal angle lies at which vertebral level and marks which costal cartilage?",
        "options": [
          "T2/T3, 1st costal cartilage",
          "T4/T5, 2nd costal cartilage",
          "T6/T7, 3rd costal cartilage",
          "T9/T10, 7th costal cartilage"
        ],
        "answer": 1,
        "explanation": "The sternal angle is the junction of the manubrium and body of the sternum; it marks the 2nd costal cartilage and lies at the T4/T5 vertebral level.",
        "src": {
          "ref": "hss.1.3",
          "location": "p5 \"costal cartilage of 2nd rib\""
        }
      },
      {
        "type": "mcq",
        "prompt": "The sternal angle is the anatomical boundary between:",
        "options": [
          "The thoracic inlet and outlet",
          "The superior and inferior mediastinum",
          "The right and left pleural cavities",
          "The thorax and the neck"
        ],
        "answer": 1,
        "explanation": "The transverse plane through the sternal angle (T4/T5) divides the mediastinum into a superior and an inferior part.",
        "src": {
          "ref": "hss.1.3",
          "location": "p5 \"boundary of superior & inferior\""
        }
      },
      {
        "type": "cloze",
        "prompt": "Ribs 8–10, which join the costal cartilage of the rib above rather than the sternum, are the ______ ribs.",
        "accept": [
          "false",
          "false ribs",
          "vertebrochondral"
        ],
        "explanation": "Ribs 8–10 are the false (vertebrochondral) ribs; their cartilages form the costal margin.",
        "src": {
          "ref": "hss.manual1920",
          "location": "p61 \"False Ribs\""
        }
      },
      {
        "type": "cloze",
        "prompt": "The intercostal neurovascular bundle in the costal groove runs in the order vein, artery, ______ from superior to inferior.",
        "accept": [
          "nerve"
        ],
        "explanation": "The order is vein–artery–nerve (VAN); the deck labels the intercostal contents as veins, arteries, nerves and lymphatics.",
        "src": {
          "ref": "hss.1.3",
          "location": "p7 \"Veins, arteries,\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which joint is formed between the tubercle of a typical rib and the transverse process of the same-numbered vertebra?",
        "options": [
          "Capitular (costovertebral) joint",
          "Costotransverse joint",
          "Sternocostal joint",
          "Costochondral joint"
        ],
        "answer": 1,
        "explanation": "The head of the rib meets the vertebral bodies at the capitular joint; the tubercle of the rib meets the transverse process at the costotransverse joint.",
        "src": {
          "ref": "hss.1.3",
          "location": "p11 \"costotransverse joint\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A patient needs an intercostal chest drain for a pleural effusion. Explain, from the anatomy of a typical rib, exactly where the needle is placed relative to the rib and why, and name the joints that anchor that rib to the spine.",
        "model": "Each typical rib has a costal groove along the inner surface of its lower border that carries the intercostal vein, artery and nerve (in the order vein–artery–nerve from above down). If a needle is passed just below a rib it enters this groove and lacerates the vessels and nerve. The needle is therefore inserted immediately above a rib — close to the upper border of the rib below the chosen space — where only a small collateral branch runs, in the mid-axillary line within the safe triangle. The same rib is held to the vertebral column at two synovial joints: the capitular (costovertebral) joint between the rib head and the vertebral bodies, and the costotransverse joint between the rib tubercle and the transverse process.",
        "rubric": [
          "States the costal groove on the lower inner border carries the vein, artery and nerve (VAN order)",
          "Concludes the needle goes immediately above a rib to avoid the neurovascular bundle",
          "Names the capitular (costovertebral) and costotransverse joints"
        ]
      }
    ],
    "commonMistakes": [
      "Calling ribs 8–12 all \"false\" — 8–10 are false, 11–12 are floating with no anterior attachment.",
      "Placing the sternal angle at the xiphoid — it is the manubriosternal junction, opposite the 2nd costal cartilage and T4/T5.",
      "Putting the intercostal nerve above the artery — the order top-to-bottom is vein, artery, nerve."
    ],
    "sourceRefs": [
      {
        "ref": "hss.1.3",
        "location": "p4 \"Jugular notch\""
      },
      {
        "ref": "hss.1.3",
        "location": "p5 \"junction between manubrium and\""
      },
      {
        "ref": "hss.1.3",
        "location": "p5 \"costal cartilage of 2nd rib\""
      },
      {
        "ref": "hss.1.3",
        "location": "p5 \"boundary of superior & inferior\""
      },
      {
        "ref": "hss.1.3",
        "location": "p7 \"Veins, arteries,\""
      },
      {
        "ref": "hss.1.3",
        "location": "p8 \"Vertebral body\""
      },
      {
        "ref": "hss.1.3",
        "location": "p11 \"costotransverse joint\""
      },
      {
        "ref": "hss.1.3",
        "location": "p11 \"capitular joint\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p61 \"False Ribs\""
      },
      {
        "ref": "hss.manual1920",
        "location": "p71 \"True Ribs\""
      }
    ]
  }
];
