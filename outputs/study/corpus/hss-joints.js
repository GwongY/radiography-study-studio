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
    "lesson": {
      "explanation": "Arthrology (from the Greek arthron, joint, and logos, study) is the anatomical science dedicated to the structure, function, and dysfunction of joints. A joint, or articulation, exists wherever two or more bones, bone and cartilage, or teeth and bone meet, regardless of whether movement actually occurs across the junction. In human anatomy, joints are classified structurally according to the binding material uniting the articulating bones and the presence or absence of a joint cavity, dividing into three fundamental classes: fibrous joints, cartilaginous joints, and synovial joints. In fibrous joints, the bones are held firmly together by dense fibrous connective tissue without any intervening joint cavity, allowing very limited or no movement (synarthroses or amphiarthroses). Fibrous joints comprise three distinct types: sutures, in which interlocking bone margins articulate by process and indentation bound by dense collagen (characteristic of the skull, such as the coronal suture binding the frontal and parietal bones); gomphoses (peg-and-socket joints), where a conical fibrous process fits into a deep socket, uniquely exemplified by the roots of teeth anchoring into the bony alveoli of the maxillae and mandible via periodontal ligaments; and syndesmoses, where the articulating bony surfaces are united by an interosseous ligament or sheet that permits slight giving movement, such as the inferior tibiofibular articulation. Cartilaginous joints unite bones directly by hyaline cartilage or fibrocartilage, devoid of a synovial cavity. They divide into primary cartilaginous joints (synchondroses) and secondary cartilaginous joints (symphyses). Synchondroses are temporary joints where bones are joined purely by hyaline cartilage that progressively ossifies into solid bone during adult life (around 25 years of age), prominently seen at the epiphyseal plates of growing long bones in children and between the sphenoid and occipital bones; once ossified, they become synostoses. Symphyses are permanent secondary cartilaginous joints where articulating bony surfaces covered by hyaline articular cartilage are fused together by a broad, compressible pad of fibrocartilage; symphyses occupy the midline of the body, notably the inter-body joints of the spine (intervertebral discs) and the pubic symphysis, delivering exceptional shock absorption and tensile strength. Synovial joints, by far the most numerous and functionally diverse joints in the human skeleton, are characterised by articulating bone ends capped with smooth hyaline cartilage, a fluid-filled joint cavity enclosed within a fibrous articular capsule, and an inner synovial membrane, permitting free multi-planar movement (diarthroses). In standard revision questions, sutures are identified as the least movable joint among all skeletal articulations.",
      "plain": "Arthrology is the study of joints. Joints are grouped into three structural families based on what binds them together: fibrous joints, cartilaginous joints, and synovial joints. Fibrous joints have no joint cavity and are stitched tight with fibrous tissue for minimal movement: sutures interlock skull bones, gomphoses anchor teeth into their sockets, and syndesmoses tie bones together with ligaments like at the lower tibia and fibula. Cartilaginous joints connect bones with cartilage: synchondroses are temporary hyaline cartilage joints (like growth plates) that turn to solid bone by around age 25, while symphyses are permanent midline fibrocartilage cushions like intervertebral discs and the pubic symphysis that absorb heavy shocks. Synovial joints feature a lubricating fluid-filled cavity and smooth cartilage caps for free, smooth movement.",
      "keyFacts": [
        "Arthrology: from Greek arthron (joint) and logos (study).",
        "Three structural joint classes: fibrous, cartilaginous, and synovial.",
        "Fibrous joints: no joint cavity, united by fibrous connective tissue, very limited movement.",
        "Sutures: interlocking process-and-indentation bone edges bound by fibrous tissue (e.g., coronal suture).",
        "Gomphoses: conical process fitting into a socket (e.g., roots of teeth into alveoli of maxillae/mandible).",
        "Syndesmoses: bones united by an interosseous ligament (e.g., inferior tibiofibular articulation).",
        "Cartilaginous joints: bones joined by hyaline cartilage or fibrocartilage, lacking a joint cavity.",
        "Synchondroses (primary cartilaginous): temporary hyaline cartilage joints that ossify ~25 years (e.g., epiphyseal growth plates).",
        "Symphyses (secondary cartilaginous): permanent joints united by fibrocartilage (e.g., intervertebral discs, pubic symphysis).",
        "Synovial joints: fluid-filled joint cavity lined by synovial membrane; freely movable (diarthroses); most common joint class.",
        "Model exam rule: a suture is the least movable joint among all skeletal articulations."
      ],
      "examples": [
        "In pediatric skeletal radiographs, the epiphyseal plate between the epiphysis and diaphysis appears as a radiolucent line; this is a synchondrosis, not a fracture, and will ossify into a synostosis by adulthood.",
        "The coronal suture tightly binds the frontal bone to the parietal bones, creating an immovable protective vault for the cerebral hemispheres."
      ]
    },
    "memory": {
      "chunking": "Name the joint class by what fills the junction: fibrous connective tissue (fibrous), cartilage pad (cartilaginous), or lubricating fluid cavity (synovial). Structural composition dictates mechanical mobility.",
      "comparison": "Synchondrosis vs Symphysis: syn-CHONDR-osis uses pure hyaline cartilage (chondro) and is temporary (growth plates disappear); SYM-physis brings bones together with permanent fibrocartilage pads in the body midline.",
      "wordOrigin": "Gomphosis comes from the Greek gomphos (bolt or nail) — picture hammering a peg into a wooden socket, exactly like a tooth root driven into the alveolar jaw bone.",
      "teachBack": "Explain why epiphyseal growth plates and intervertebral discs are both cartilaginous joints yet behave entirely differently across a patient’s lifespan."
    },
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
    "skills": [
      "Look at the tissue bridging the gap: if fibrous collagen unites bone margins directly without a cavity, it is a fibrous joint (suture, gomphosis, syndesmosis). If cartilage bridges the bone ends, examine the cartilage type: temporary hyaline is a synchondrosis, permanent fibrocartilage is a symphysis.",
      "On skeletal imaging, recognize that synchondroses appear as radiolucent bands because hyaline cartilage lacks calcium mineral density; do not confuse normal developmental growth plates with traumatic fractures."
    ],
    "selfCheck": "From memory: state the three structural joint classes, give the two types of cartilaginous joints with their defining cartilage and lifespan, name the three fibrous joint types with examples, and state which joint is the least movable.",
    "visuals": [
      {
        "schematic": "jointClassification"
      },
      
      {
        "gen": true
      }
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
    "lesson": {
      "explanation": "Synovial joints are the most common in the human body, providing high mechanical mobility while maintaining structural stability under physiological loading. Every synovial articulation shares five core anatomical features: articulating bone ends covered by articular cartilage, a joint cavity interposed between the bone ends in the normal healthy state, a enclosing articular capsule, an inner synovial membrane, and viscous synovial fluid. Articular cartilage is a specialized layer of hyaline cartilage capping the subchondral bone ends; it is avascular, aneural, and presents a wear-resistant, low-friction lubricated surface that acts as a shock absorber during joint compression. Because articular cartilage possesses no intrinsic blood supply of its own, its chondrocytes rely on indirect nutrition via three convergent pathways: diffusion from synovial fluid, perfusion from the vascular net in the synovial membrane, and capillary exchange from blood vessels in underlying marrow spaces. The joint cavity is completely enclosed by the articular capsule, which is structured in two distinct layers. The outer fibrous capsule forms a tough sleeve or cuff around the joint close to the articular surface, composed of dense connective fibrous tissue that resists mechanical traction and holds the articulating bones in close contact. Localized thickenings of this fibrous capsule form intrinsic joint ligaments; in addition, accessory ligaments (extracapsular or intracapsular) reinforce the joint while remaining separate from the joint capsule. A ligament is structurally defined as a cord or band of tough collagenous tissue binding one bone to another. The inner lining of the capsule is the delicate synovial membrane, which lines all internal non-articular surfaces of the joint cavity and secretes synovial fluid—a clear, colorless fluid containing hyaluronic acid and lubricin that lubricates the articulating cartilages, nourishes chondrocytes, and cushions mechanical impacts. Protrusions of the synovial membrane form fluid-filled sacs called bursae, situated between bones and overlying tendons or skin to minimize friction. Joint innervation obeys Hilton’s law: the sensory nerves supplying a joint also supply the muscles moving that joint and the overlying skin covering the insertion of these muscles, providing essential proprioceptive sensation and pain signals to protect the joint against mechanical damage.",
      "plain": "Synovial joints are the most common and movable joints in your body, found in the knees, hips, shoulders, and fingers. Every synovial joint has five essential components: bone ends capped with smooth hyaline articular cartilage that acts as a wear-resistant shock absorber; a joint cavity filled with clear, slippery synovial fluid; an articular capsule with a tough outer fibrous cuff that holds the joint together; localized thickenings of the capsule that form stabilizing ligaments; and an inner synovial membrane that secretes synovial fluid and forms friction-reducing bursae. Because articular cartilage has no blood vessels, it feeds on synovial fluid circulated during movement. Hilton’s law states that the nerves supplying a joint also supply the muscles that move it and the skin over their attachments.",
      "keyFacts": [
        "Synovial joints: most common joint class in the human body; freely movable (diarthroses).",
        "Five core structures: articular cartilage, joint cavity, articular capsule, synovial membrane, synovial fluid.",
        "Articular cartilage: avascular hyaline cartilage; provides a wear-resistant, low-friction lubricated surface; acts as a shock absorber.",
        "Articular cartilage nutrition: diffusion from synovial fluid, vascular net in synovial membrane, and vessels in underlying marrow spaces.",
        "Fibrous capsule: tough cuff of dense connective fibrous tissue around the joint close to articular surfaces.",
        "Ligaments: localized thickenings of fibrous capsule (intrinsic) or separate bands (accessory); bind one bone to another.",
        "Synovial membrane: vascular inner layer lining non-cartilaginous surfaces; produces synovial fluid.",
        "Synovial fluid: clear, colorless fluid that lubricates surfaces, reduces friction, and nourishes chondrocytes.",
        "Bursae: protrusions of synovial membrane between tendon and bone to prevent friction wear.",
        "Hilton’s law: nerves supplying a joint also supply the muscles moving the joint and the skin over their insertion."
      ],
      "examples": [
        "The knee joint contains extensive synovial structures including suprapatellar and prepatellar bursae, meniscal fibrocartilages, cruciate ligaments, and rich synovial fluid to buffer walking loads.",
        "Following joint immobilisation in a cast, synovial fluid is not circulated across the joint, leading to starved chondrocytes and cartilage stiffness."
      ]
    },
    "memory": {
      "location": "Build the joint from bone outward: bone marrow vessels → hyaline cartilage cap → synovial fluid in joint cavity → synovial membrane lining → fibrous capsule cuff → reinforcing ligaments.",
      "comparison": "Ligament vs Tendon: both are tough collagenous cords, but a ligament binds bone to bone across a joint, whereas a tendon attaches muscle to bone to transmit contractile force.",
      "chunking": "Hilton’s Law triangle: Joint, Muscle that moves it, and Skin over the muscle insertion share the identical nerve trunk.",
      "teachBack": "Explain why walking and moving a joint is biologically necessary to feed articular cartilage despite the cartilage having zero blood vessels."
    },
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
    "skills": [
      "Distinguish ligament from tendon on clinical descriptions: a cord binding bone to bone is a ligament; a cord attaching muscle to bone is a tendon.",
      "Trace Hilton’s law when analyzing referred joint pain: irritation of a deep joint capsule frequently manifests as muscle spasm and cutaneous hyperesthesia along the same nerve distribution."
    ],
    "selfCheck": "From memory: name the five universal parts of a synovial joint, state the three nutritional pathways of articular cartilage, define a ligament, and formulate Hilton’s law.",
    "visuals": [
      {
        "fig": "synovialJoint"
      },
      
      {
        "gen": true
      }
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
    "lesson": {
      "explanation": "Body movements are defined by precise geometric changes in joint angles and spatial positions, each anchored to specific anatomical articulations. In HSS2011, mastering movements requires matching each named action to the exact joint producing it. Angular movements in the sagittal plane include flexion (decreasing the angle between articulating bones, such as bending the elbow or knee) and extension (increasing the joint angle back toward anatomical position); continuing movement past anatomical position is hyperextension. Flexion and extension of the forearm take place specifically at the humeroulnar and humeroradial articulations of the elbow joint. Movements in the coronal plane include abduction (body parts moving away from midline) and adduction (body parts moving towards the midline); at the shoulder and hip joints, abduction lifts the limb away from the body trunk, while adduction draws it back toward the torso. In the forearm, rotation about the longitudinal axis produces supination (forearm rotated so the palm faces upwards/anteriorly) and pronation (forearm rotated so the palm faces downwards/posteriorly); these rotational actions take place at the superior and inferior radioulnar joints, where the head of the radius pivots within the radial notch of the ulna. At the wrist (radiocarpal) joint, coronal plane deviation is termed radial flexion (abduction) and ulnar flexion (adduction). The thumb possesses a unique range of motion produced at the carpometacarpal (CMC) joint of the thumb, where the trapezium articulates with the first metacarpal; because the thumb sits rotated 90 degrees relative to other digits, the palm of the hand serves as the fixed reference plane for thumb flexion, extension, abduction, and adduction. Opposition is the specialized action by which the pulp of the thumb contacts the tips of any of the other fingers (tip-to-tip attachment); its opposite restoring movement is reposition. At the ankle and foot, movements split between the talocrural and subtalar/intertarsal joints: dorsiflexion (moving the top of the foot / dorsum upwards toward the shin) and plantarflexion (moving the sole / plantar surface downwards) take place at the ankle (talocrural) joint, whereas inversion (tilting the sole inward / medially) and eversion (tilting the sole outward / laterally) take place at the intertarsal joints. Circumduction is a composite circular movement combining flexion, abduction, extension, and adduction in sequence, seen at ball-and-socket joints of the shoulder and hip.",
      "plain": "Movements are defined by how joint angles change, and each action belongs to a specific joint. Forearm flexion and extension occur at the elbow joint. Turning your palm up (supination) or down (pronation) occurs at the superior and inferior radioulnar joints as the radius pivots against the ulna. Wrist side-to-side bending occurs at the radiocarpal joint. The thumb moves at its carpometacarpal saddle joint, where opposition touches the thumb tip to any fingertip (reversed by reposition). At the ankle, pointing your foot down (plantarflexion) or lifting your toes up (dorsiflexion) happens at the talocrural joint, while tilting your sole inward (inversion) or outward (eversion) happens at the intertarsal joints. Circumduction combines flexion, abduction, extension, and adduction in a smooth cone of motion.",
      "keyFacts": [
        "Flexion and extension of forearm: take place at the elbow joint (sagittal plane).",
        "Abduction and adduction: moving body parts away from or towards the midline (coronal plane).",
        "Supination (palm facing upwards) and pronation (palm facing downwards): take place at the superior and inferior radioulnar joints.",
        "Radial flexion (abduction) and ulnar flexion (adduction): take place at the wrist (radiocarpal) joint.",
        "Thumb movements (flexion, extension, abduction, adduction, opposition): take place at the carpometacarpal joint of the thumb.",
        "Thumb reference frame: palm of the hand is the fixed reference plane (not the digits).",
        "Opposition: tip-to-tip attachment of the thumb with any of the fingers; reverse movement is reposition.",
        "Dorsiflexion (dorsum upwards) and plantarflexion (sole downwards): take place at the ankle (talocrural) joint.",
        "Inversion (sole tilted inward/medially) and eversion (sole tilted outward/laterally): take place at the intertarsal joints.",
        "Circumduction: combination of flexion, abduction, lateral/medial rotation, adduction, and extension forming a cone."
      ],
      "examples": [
        "Turning a brass doorknob clockwise with the right hand involves supination of the forearm produced at the proximal and distal radioulnar joints, not rotation at the wrist.",
        "Holding a bowl of hot soup requires full forearm supination; spilling the soup requires pronation.",
        "Standing on your tip-toes is plantarflexion at the talocrural joint; lifting the forefoot to clear the ground when walking is dorsiflexion."
      ]
    },
    "memory": {
      "mnemonic": "SOUP-ination: hold a bowl of SOUP with palms facing up. PRO-nation: turn palms down like a PRO basketball player dribbling.",
      "location": "Ankle dual-joint rule: Up/down movements (dorsiflexion / plantarflexion) live at the talocrural joint; side-tilt movements (inversion / eversion) live at the intertarsal joints.",
      "chunking": "Thumb is a complete 5-movement package at 1 joint: flexion, extension, abduction, adduction, opposition — all at the carpometacarpal joint.",
      "teachBack": "Explain why the wrist joint cannot rotate, and demonstrate the exact joint mechanism that allows your hand to turn palm-up and palm-down."
    },
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
    "skills": [
      "Always separate the joint name from the movement name: in HSS2011 exams, questions frequently award marks for the exact articulation (e.g., radioulnar vs elbow vs radiocarpal).",
      "Distinguish foot movements by joint level: talocrural joint for sagittal hinge motion (dorsiflexion/plantarflexion); intertarsal joints for frontal plane tilting (inversion/eversion)."
    ],
    "selfCheck": "From memory: list the joints where supination/pronation, dorsiflexion/plantarflexion, inversion/eversion, and thumb opposition take place, and define opposition with its reverse term.",
    "visuals": [
      {
        "fig": "jointMovements"
      },
      
      {
        "gen": true
      }
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
    "lesson": {
      "explanation": "The current self-study movement terminology deck applies standard biomechanical movement descriptors across each region of the human body. In the upper limb, angular and rotational movements are anchored to specific joints. At the glenohumeral (shoulder) joint, movements in the sagittal plane comprise flexion (anterior movement of the arm) and extension (posterior movement returning to anatomical position, continuing beyond as hyperextension). In the coronal plane, abduction moves the upper limb laterally away from the body midline, while adduction draws the limb medially towards the midline. In the transverse plane, lateral (external) rotation of the shoulder turns the humerus away from the midline, whereas medial (internal) rotation turns the humerus towards the midline. Circumduction combines flexion, abduction, extension, and adduction into a smooth cone of motion. At the elbow joint, flexion decreases the angle between the arm and forearm, while extension increases it. In the forearm, rotational actions occur at the superior and inferior radioulnar joints: pronation rotates the radius over the ulna so that the palm faces downwards (or posteriorly), whereas supination rotates the radius laterally so that the palm faces upwards (or anteriorly) and the forearm bones lie parallel. At the wrist (radiocarpal) joint, deviation toward the radial side is abduction (radial flexion) and toward the ulnar side is adduction (ulnar flexion). The thumb possesses a unique multi-axial repertoire at its carpometacarpal (CMC) saddle joint, where the palm of the hand serves as the fixed reference plane: thumb flexion curls across the palm, extension moves away in the plane of the palm, abduction moves anteriorly away at 90 degrees to the palm, adduction returns to the index finger, and opposition brings the tip of the thumb into contact with any of the fingertips, reversed by reposition. For the fingers (digits II–V), abduction spreads digits away from the longitudinal reference axis through the third (middle) digit, and adduction draws them back. In the lower limb, the hip joint exhibits triaxial flexion, extension, abduction, adduction, and rotation. At the ankle and foot, movements split anatomically: dorsiflexion (moving the top of the foot / dorsum upwards toward the leg) and plantarflexion (moving the sole / plantar surface downwards) take place at the ankle (talocrural) joint; inversion (tilting the sole of the foot inward / medially) and eversion (tilting the sole of the foot outward / laterally) take place at the intertarsal joints.",
      "plain": "The movement deck applies standard movement terms across the body: shoulder flexion moves the arm forward, extension backward; abduction lifts it away from the midline, adduction brings it back; medial rotation turns the arm in, lateral rotation turns it out. Forearm pronation turns the palm down (crossing radius over ulna), while supination turns the palm up. The wrist flexes, extends, and deviates side to side. The thumb is referenced to the palm: opposition touches the thumb tip to any finger, and reposition returns it. Finger abduction is measured from the middle finger. At the foot, dorsiflexion lifts the top of the foot up and plantarflexion pushes the sole down at the ankle joint; inversion turns the sole inward and eversion turns it outward at the intertarsal joints.",
      "keyFacts": [
        "Shoulder flexion/extension occurs in the sagittal plane; abduction/adduction in the coronal plane.",
        "Shoulder rotation: lateral (external) rotation turns away from midline; medial (internal) rotation turns towards midline.",
        "Circumduction: sequential combination of flexion, abduction, extension, and adduction in a cone.",
        "Forearm pronation (palm facing downwards) and supination (palm facing upwards): take place at radioulnar joints.",
        "Pronation causes the distal radius to cross anterior to the ulna; supination restores parallel bone alignment.",
        "Finger abduction and adduction use the middle digit (digit III) as the invariant reference line.",
        "Thumb movements (flexion, extension, abduction, adduction, opposition, reposition): referenced to the palm.",
        "Opposition: tip-to-tip attachment of thumb with any finger; reverse movement is reposition.",
        "Same split as the movements lesson: dorsiflexion/plantarflexion at the talocrural (ankle) joint; inversion/eversion at the intertarsal joints.",
        "Foot inversion (sole medially) and eversion (sole laterally): take place at the intertarsal joints."
      ],
      "examples": [
        "Turning a key clockwise in a right-hand door lock involves forearm supination at the radioulnar joints and shoulder lateral rotation.",
        "Grasping a needle between the thumb and little finger tests thumb opposition at the first carpometacarpal joint."
      ]
    },
    "memory": {
      "chunking": "Sort movements by joint axis: Sagittal = Flexion/Extension; Coronal = Abduction/Adduction; Transverse = Medial/Lateral Rotation and Pronation/Supination; Composite = Circumduction.",
      "comparison": "Thumb vs Fingers reference line: Fingers abduct away from the middle finger (digit III); thumb abducts away from the palm at 90 degrees.",
      "visualCue": "Picture walking on heels (dorsiflexion at ankle) vs walking on tiptoes (plantarflexion at ankle) vs twisting your ankle on a curb (inversion at intertarsal joints).",
      "teachBack": "Demonstrate each movement of the upper and lower limb out loud, stating the precise anatomical plane and joint responsible."
    },
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
    "skills": [
      "Identify movement vectors on clinical motion analysis: classify every action into its anatomical plane (sagittal, coronal, transverse) and name the exact articulating surface.",
      "Differentiate digit reference rules: digits II, IV, and V move relative to digit III; the thumb moves in planes perpendicular to the palm."
    ],
    "selfCheck": "From memory: define flexion, extension, abduction, adduction, pronation, supination, dorsiflexion, plantarflexion, inversion, eversion, opposition, and reposition with their respective joints.",
    "visuals": [
      
      
      {
        "gen": true
      }
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
    "lesson": {
      "explanation": "The rotator cuff (musculotendinous cuff) is a critical functional collar formed by the blended tendons of four intrinsic scapulohumeral muscles that encircle and intimately reinforce the fibrous capsule of the glenohumeral (shoulder) joint. The four muscles are remembered by the classic medical mnemonic SITS: Supraspinatus, Infraspinatus, Teres minor, and Subscapularis. 1. Supraspinatus originates from the supraspinous fossa on the posterior surface of the scapula, passes beneath the acromion, and inserts onto the superior facet of the greater tubercle of the humerus; it initiates the first 15 degrees of abduction and is innervated by the suprascapular nerve. 2. Infraspinatus occupies the extensive infraspinous fossa inferior to the scapular spine, inserting onto the middle facet of the greater tubercle; it acts as a powerful lateral (external) rotator of the humerus and is innervated by the suprascapular nerve. 3. Teres minor is a slender muscle arising from the lateral border of the scapula and inserting onto the inferior facet of the greater tubercle; it works synergistically with infraspinatus to produce lateral rotation of the humerus and is innervated by the axillary nerve. 4. Subscapularis is a large, triangular muscle occupying the subscapular fossa on the anterior (costal) surface of the scapula; its tendon crosses the anterior aspect of the joint capsule to insert onto the lesser tubercle of the humerus. Subscapularis is the sole anterior rotator cuff muscle and serves as the primary medial (internal) rotator of the humerus, innervated by the subscapular nerve. Full abduction of the arm through its complete 180-degree physiological arc is not executed by a single muscle, but is an orchestrated four-stage neuromuscular sequence: Stage 1: Supraspinatus initiates abduction through the first 15 degrees. Stage 2: Deltoid (acromial part) acts as the primary powerful abductor from 15 to 90 degrees (innervated by the axillary nerve). Stage 3: Infraspinatus and Teres minor laterally rotate the humerus, clearing the greater tubercle from impinging against the coracoacromial arch. Stage 4: Trapezius and serratus anterior upwardly rotate the scapula, turning the glenoid cavity upward to allow full overhead elevation up to 180 degrees. Major shoulder-girdle muscles surrounding the cuff include pectoralis major (responsible for flexion, adduction, and medial rotation of the shoulder joint; innervated by pectoral nerves) and latissimus dorsi (responsible for adduction, extension, and medial rotation; innervated by the thoracodorsal nerve).",
      "plain": "The rotator cuff consists of four muscles that wrap around the shoulder joint like a cuff to keep the humeral ball snug inside the shallow glenoid socket: Supraspinatus, Infraspinatus, Teres minor, and Subscapularis (mnemonic: SITS). Supraspinatus starts the first 15 degrees of arm lift (abduction). Deltoid is the heavyweight lifter that abducts from 15 to 90 degrees. Infraspinatus and teres minor rotate the arm outward (lateral rotation) so the bone does not bump into the shoulder roof. Finally, trapezius and serratus anterior tilt the shoulder blade up so your arm can reach straight overhead. Subscapularis is the only muscle in front, and it rotates the arm inward (medial rotation).",
      "keyFacts": [
        "Rotator cuff muscles (SITS): Supraspinatus, Infraspinatus, Teres minor, Subscapularis.",
        "Supraspinatus (suprascapular n.): initiates the first 15 degrees of abduction.",
        "Infraspinatus (suprascapular n.) & Teres minor (axillary n.): lateral rotation of humerus.",
        "Subscapularis (subscapular n.): medial rotation of humerus; only anterior cuff muscle.",
        "Deltoid (axillary n.): powerful abductor of the arm from 15° to 90° (not part of rotator cuff).",
        "Four-stage full abduction sequence: Supraspinatus initiates → Deltoid abducts → Infraspinatus/Teres minor laterally rotate → Trapezius/serratus anterior upwardly rotate scapula.",
        "Pectoralis major (pectoral nerves): flexion, adduction, and medial rotation of shoulder.",
        "Latissimus dorsi (thoracodorsal nerve): adduction, extension, and medial rotation of shoulder.",
        "Greater tubercle receives three cuff tendons (supraspinatus, infraspinatus, teres minor); lesser tubercle receives subscapularis."
      ],
      "examples": [
        "A patient with a torn supraspinatus tendon cannot initiate lifting their arm away from their side; however, once an examiner lifts the arm past 15 degrees, the deltoid takes over and easily abducts to 90 degrees.",
        "Painful arc syndrome occurs during abduction between 60° and 120° when an inflamed supraspinatus tendon is pinched beneath the acromion."
      ]
    },
    "memory": {
      "firstLetter": "SITS on the shoulder: Supraspinatus, Infraspinatus, Teres minor, Subscapularis.",
      "comparison": "Three back, one front: Supraspinatus, Infraspinatus, and Teres minor sit on the dorsal scapula and insert on the greater tubercle (external rotators / abductor). Subscapularis sits on the anterior scapula and inserts on the lesser tubercle (internal rotator).",
      "sequence": "Abduction relay: Start (Supraspinatus) → Lift (Deltoid) → Clear (Infraspinatus/Teres minor) → Overhead Tilt (Trapezius).",
      "teachBack": "Explain why a patient who can hold their arm out horizontally might still have a torn rotator cuff that prevents them starting the movement from their thigh."
    },
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
    "skills": [
      "Break abduction into its four relays: Starter (Supraspinatus) → Main Motor (Deltoid) → Rotator (Infraspinatus/Teres Minor) → Scapular Tilter (Trapezius/Serratus Anterior).",
      "Distinguish cuff insertions: Greater tubercle receives S-I-T (Supraspinatus, Infraspinatus, Teres minor); Lesser tubercle receives S (Subscapularis)."
    ],
    "selfCheck": "From memory: list the four rotator cuff muscles (SITS) with their actions and innervations, write down the 4-step abduction relay in order, and state which tubercle each muscle inserts upon.",
    "visuals": [
      {
        "fig": "rotatorCuffMuscles"
      },
      
      {
        "gen": true
      }
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
