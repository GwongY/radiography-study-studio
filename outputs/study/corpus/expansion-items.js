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
    "lesson": {
      "explanation": "Anatomical and medical terminology is constructed systematically from Latin and Greek building blocks consisting of word roots, prefixes, and suffixes. The word root forms the core semantic foundation of the term, typically designating an anatomical structure, organ, tissue, or physiological condition (e.g., cardi/o for heart, oste/o for bone, arthr/o for joint, my/o for muscle, neur/o for nerve, chondr/o for cartilage, nephr/o for kidney, crani/o for skull, cost/o for rib). Prefixes attach before the root to modify its spatial position, direction, timing, or quantity. Key spatial and directional prefixes include epi- (above, upon), hypo- (below, under; or deficient), inter- (between), peri- and circum- (around), pre- (before, in front of), post- (behind, after), retro- (backward, behind), and ab- (away from). Suffixes attach to the terminal end of the root to indicate a clinical diagnostic state, pathology, surgical procedure, or analytical process. Diagnostic and pathological suffixes include -itis (inflammation), -algia or -dynia (pain), -megaly (enlargement), -osis (abnormal condition), -emia (blood condition), and -pathy (disease process). Procedural and investigative suffixes form an essential triad in medical imaging: -graphy designates the actual process of recording or imaging (e.g., radiography, angiography), -graph denotes the physical instrument or machine utilized to record (e.g., electrocardiograph, radiograph equipment), and -gram signifies the resultant image or written recording produced (e.g., angiogram, radiograph). In surgical interventions, -tomy signifies an incision or cutting into an organ, whereas -stomy designates the surgical creation of a new, permanent artificial opening (e.g., tracheostomy, colostomy). Once students master these fundamental word parts, complex polysyllabic clinical terms can be decoded logically from left to right without rote memorization.",
      "plain": "Medical terminology is built like Lego from three types of blocks: roots, prefixes, and suffixes. The root tells you what organ or tissue is involved (like oste/o for bone or chondr/o for cartilage). A prefix comes at the start to tell you where or how much (like epi- for above, hypo- for below or deficient, or inter- for between). A suffix comes at the end to describe what is happening (like -itis for inflammation, -osis for abnormal condition, or -emia for a blood condition). In radiology, remember the three-way tool rule: -graphy is the imaging process (radiography), -graph is the machine, and -gram is the picture you get.",
      "keyFacts": [
        "Three morphological building blocks: root (organ/tissue), prefix (position/quantity), suffix (condition/procedure).",
        "Prefixes of position: epi- (above, upon), hypo- (below; deficient), inter- (between), retro- (backward, behind).",
        "Temporal and directional prefixes: pre- (before, in front of), post- (behind, after), ab- (away from), peri- (around).",
        "Core organ roots: oste/o (bone), chondr/o (cartilage), arthr/o (joint), my/o (muscle), neur/o (nerve), nephr/o (kidney).",
        "Directional roots: anter/o (front), poster/o and dors/o (back), medi/o (middle), later/o (side), proxim/o (near).",
        "Clinical suffixes: -itis (inflammation), -algia (pain), -megaly (enlargement), -osis (abnormal condition), -emia (blood condition).",
        "Procedural imaging suffixes: -graphy (process of recording), -graph (instrument to record), -gram (record/image produced).",
        "Surgical suffixes: -tomy (incision/cutting), -stomy (creation of a new opening), -scopy (process of visual examination).",
        "Double meaning alert: hypo- means both below in anatomical position AND deficient in quantity (e.g., hypoglycemia)."
      ],
      "prerequisites": [
        "hss2011-terminology-directional-pairs"
      ],
      "examples": [
        "Costochondritis breaks down into cost/o (rib) + chondr/o (cartilage) + -itis (inflammation) = inflammation of the cartilage linking the ribs to the sternum.",
        "Radiography breaks down into radio- (radiation / rays) + -graphy (process of recording) = the process of capturing internal bodily structures using penetrating radiation.",
        "Retroperitoneal breaks down into retro- (behind, backward) + peritone/o (peritoneum) + -al (pertaining to) = situated behind the peritoneal membrane."
      ]
    },
    "memory": {
      "chunking": "Three-slot formula: [Prefix = Where / How much] + [Root = What organ] + [Suffix = What is happening or being done].",
      "comparison": "-graphy vs -graph vs -gram: -graphy is the action you do (radiography), -graph is the hardware camera (radiograph unit), -gram is the photograph you inspect on the monitor (radiogram).",
      "wordOrigin": "Hypo- is the double agent: it means physically lower (hypogastric = below stomach) AND quantitatively low (hypokalemia = deficient potassium).",
      "teachBack": "Decode the word \"choledochoduodenostomy\" step-by-step using only roots, prefixes, and suffixes to show how parts unlock complex surgical terms."
    },
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
    "skills": [
      "Break unfamiliar clinical pathology terms into root, prefix, and suffix: medical jargon is almost entirely modular and decodable without guessing.",
      "Maintain rigorous precision with one-letter variations: -tomy vs -stomy vs -ectomy (cutting into vs making a mouth/opening vs total surgical excision)."
    ],
    "selfCheck": "From memory: list four prefixes of position with meanings, explain the difference between -graphy, -graph, and -gram, and deconstruct \"costochondritis\" and \"retroperitoneal\".",
    "visuals": [
      {
        "schematic": "wordParts"
      },
      {
        "gen": true
      }
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
    "lesson": {
      "explanation": "Synovial joints represent the most numerous and functionally versatile articulations in the human skeleton. Anatomists classify synovial joints into six distinct structural types based on the geometric shape of their articulating bony surfaces and the corresponding number of axes of angular motion they permit: uniaxial (monoaxial) joints that move in only one axis or plane, biaxial joints that move in two distinct planes, and polyaxial (multiaxial/triaxial) joints that move freely across all three spatial axes. 1. Hinge joints are uniaxial joints in which a convex cylinder on one bone fits into a corresponding concave trough on another, allowing angular movement in one direction and in one plane, specifically flexion and extension; prime anatomical examples include the humero-ulnar (elbow) joint, knee joint, and interphalangeal joints. 2. Pivot joints are uniaxial joints where a rounded or pointed bone process fits into a ring formed partly by bone and partly by a ligament, allowing rotary movement in one axis; key examples include the proximal radioulnar joint (permitting forearm pronation and supination) and the median atlantoaxial (C1–C2) joint (permitting head rotation). 3. Condylar (ellipsoid) joints are biaxial joints featuring an oval-shaped convex head articulating within a complementary elliptical cavity; they permit angular movement in two directions, encompassing flexion/extension, abduction/adduction, and circumduction, but no axial rotation; verified examples include the radiocarpal (wrist) joint and metacarpophalangeal (MCP) joints of the fingers. 4. Saddle joints are biaxial joints where the articular surface of each articulating bone is concave in one direction and convex in another, fitting together like a rider seated in a saddle; they allow angular movement across two orthogonal planes plus the unique human action of opposition; the quintessential example is the carpometacarpal (CMC) joint of the thumb (between trapezium and first metacarpal). 5. Plane joints (gliding joints) feature flat or gently curved articulating surfaces that permit gliding movement only without significant angular rotation; typically small joints, examples include intercarpal and intertarsal joints, the acromioclavicular joint, and the facet (zygapophyseal) joints of the spine. 6. Ball-and-socket joints are polyaxial joints in which a spherical or hemispherical bone head fits into a cuplike socket, allowing angular movement in all directions (flexion, extension, abduction, adduction, circumduction) plus rotational pivot movement about a central axis; the only two true examples in the body are the glenohumeral (shoulder) joint and the hip (acetabulofemoral) joint.",
      "plain": "Synovial joints are grouped into six types depending on the shape of their bone surfaces and how many planes they move in. 1. Hinge joints (like the humero-ulnar elbow joint) move like a door hinge in one plane: flexion and extension. 2. Pivot joints (like the proximal radioulnar joint) spin in one axis to rotate: supination and pronation. 3. Condylar joints (like the radiocarpal wrist joint) feature an oval head in an elliptical cup for two planes: flexion/extension and abduction/adduction. 4. Saddle joints (like the thumb carpometacarpal joint) have complementary saddle shapes allowing two planes plus thumb opposition. 5. Plane joints (like intercarpal and spinal facet joints) have flat surfaces that slide and glide. 6. Ball-and-socket joints (the shoulder and hip) have a round ball in a deep or shallow cup and can move in all three planes plus full rotation.",
      "keyFacts": [
        "Six synovial joint types: hinge, pivot, condylar, saddle, plane, ball-and-socket.",
        "Uniaxial (1 plane): hinge (flexion/extension) and pivot (rotation about one axis).",
        "Biaxial (2 planes): condylar (oval head, elliptical cavity) and saddle (concave/convex reciprocal surfaces).",
        "Polyaxial (3 planes): ball-and-socket (spherical head in cuplike socket; moves in all directions plus rotation).",
        "Plane (gliding): flat surfaces permitting gliding translation (e.g., intercarpal, spinal facets).",
        "Hinge example: humero-ulnar joint (elbow) and interphalangeal joints.",
        "Pivot example: proximal radioulnar joint (supination/pronation) and median atlantoaxial (C1–C2) joint.",
        "Condylar example: radiocarpal joint (wrist) and metacarpophalangeal joints.",
        "Saddle example: carpometacarpal joint of the thumb (enables opposition).",
        "Ball-and-socket example: glenohumeral (shoulder) joint and hip joint.",
        "Shoulder vs hip trade-off: shallow glenoid fossa maximizes mobility; deep acetabulum maximizes stability."
      ],
      "prerequisites": [
        "hss2011-joints-classification",
        "hss2011-joints-synovial-structure"
      ],
      "examples": [
        "At the elbow region, two different synovial joint types sit within a single capsule: the humero-ulnar articulation is a hinge joint, while the adjacent proximal radioulnar articulation is a pivot joint.",
        "The radiocarpal wrist joint is condylar, which is why you can flex/extend your wrist and wave it side-to-side (radial/ulnar deviation), but you cannot axially twist your wrist without rotating your forearm."
      ]
    },
    "memory": {
      "chunking": "Group by plane count first: 1-plane = Hinge & Pivot; 2-planes = Condylar & Saddle; 3-planes = Ball-and-socket; Non-axial sliding = Plane (gliding).",
      "comparison": "Glenohumeral vs Hip: both are triaxial ball-and-socket joints, but the glenoid fossa is shallow (built for maximum mobility, prone to dislocation), whereas the acetabulum is deep (built for weight-bearing stability).",
      "visualCue": "Saddle joint = horse saddle: each surface is convex in one curve and concave in the other. That unique geometry is the exact reason the thumb can oppose to every fingertip.",
      "teachBack": "Explain why the wrist is classified as a condylar joint rather than a hinge joint, and name the four movements it can perform."
    },
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
        "prompt": "In monoaxial articulation,",
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
    "skills": [
      "Classify any unfamiliar synovial joint by counting planes: 1 plane = hinge/pivot; 2 planes = condylar/saddle; 3 planes = ball-and-socket.",
      "Compare articular congruency: the deep acetabular socket of the hip joint prioritizes bony stability for load-bearing, whereas the shallow glenoid fossa of the shoulder joint prioritizes multi-planar mobility at the expense of dislocation risk."
    ],
    "selfCheck": "From memory: list the six synovial joint types, classify each by axes of motion (uni-, bi-, polyaxial), provide one anatomical example for each, and state why the wrist is condylar rather than hinge.",
    "visuals": [
      {
        "fig": "synovialTypes"
      },
      {
        "schematic": "synovialTypes"
      },
      {
        "gen": true
      }
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
    "lesson": {
      "explanation": "Success on HSS2011 past-paper assessments requires rapid, accurate identification of skeletal articulations, joint classifications, and neuromuscular functional relationships. In the past-paper bank across 2006–2026, exam questions consistently test a recurring core of high-yield anatomical facts. First, regarding joint structures, the fibrous capsule is composed of a thick layer of dense connective tissue that encloses the joint cavity, while a ligament of a joint is defined specifically as a cord or band of tough collagenous tissue binding one bone to another. Articular surfaces are capped by hyaline articular cartilage that acts as a wear-resistant shock absorber. Second, regarding functional classifications: skull sutures articulate by interlocking processes and indentations bound by fibrous tissue, making sutures the least movable of all joints. The intervertebral disc is a secondary cartilaginous joint (symphysis) situated between the vertebral bodies of adjacent vertebrae, where a fibrocartilaginous disc absorbs compressive axial loads. At the shoulder girdle, the medial (sternal) end of the clavicle articulates with the manubrium of the sternum to form the sternoclavicular joint—the single bony articulation anchoring the entire upper appendicular skeleton to the axial frame. The head of the humerus articulates with the shallow glenoid fossa of the scapula to form the polyaxial glenohumeral joint, while the distal humerus meets the radius and ulna at the elbow joint. Carpal bones articulate with the distal radius to form the condylar radiocarpal (wrist) joint. In the lower limb, the femoral and tibial condyles form the bicondylar hinge of the knee joint, while the patella is the largest sesamoid bone in the human body, developing within the quadriceps tendon to optimize mechanical leverage. Third, in functional myology, movements require coordinated muscle group interactions: an agonist (prime mover) is a muscle whose contraction is mostly responsible for producing a specific movement, while an antagonist is a muscle whose action opposes that of a prime mover. When agonists contract, antagonists must relax. A synergist is a muscle that assists a prime mover in performing its primary actions, preventing unwanted motions; when an agonist muscle crosses more than one joint, synergists and fixators contract to stabilize intervening joints. A fixator is a specialized muscle that stabilizes the origin of the prime mover so that force is directed cleanly to the insertion.",
      "plain": "This past-paper drill tests the recurring exam questions on joints and muscle coordination that appear year after year. 1. The fibrous capsule is a tough dense connective tissue sleeve, and a ligament is a collagenous band binding one bone to another. 2. Skull sutures are immovable fibrous joints. Intervertebral discs are cartilaginous symphyses between vertebral bodies. The medial clavicle forms the sternoclavicular joint—the upper limb’s only bony link to the axial skeleton. 3. Muscles work in coordinated functional teams: the agonist (prime mover) powers the movement, the antagonist relaxes and opposes it, synergists help the prime mover and steady nearby joints, and fixators anchor the origin of the prime mover.",
      "keyFacts": [
        "Fibrous capsule: thick layer of dense connective tissue surrounding the synovial joint cavity.",
        "Ligament: cord or band of tough collagenous tissue binding one bone to another.",
        "Suture: fibrous joint interlocking skull bones; least movable articulation in the body.",
        "Intervertebral disc: cartilaginous symphysis located between adjacent vertebral bodies; functions as a shock absorber.",
        "Sternoclavicular joint: formed by the medial end of the clavicle and the sternum; sole bony upper limb link to axial skeleton.",
        "Radiocarpal joint: formed by the distal radius articulating with scaphoid, lunate, and triquetrum carpal bones.",
        "Patella: largest sesamoid bone in the human body; embedded within the quadriceps femoris tendon.",
        "Agonist (prime mover): muscle whose contraction is primarily responsible for producing a specific movement.",
        "Antagonist: muscle whose action opposes that of a prime mover; relaxes as agonist contracts.",
        "Synergist: muscle that assists the prime mover in performing its primary actions and stabilizes intervening joints.",
        "Fixator: muscle that stabilizes the origin of the prime mover so work is focused at the insertion."
      ],
      "prerequisites": [
        "hss2011-joints-classification",
        "hss2011-joints-synovial-structure"
      ],
      "examples": [
        "In elbow flexion, the biceps brachii and brachialis act as agonists, while the triceps brachii acts as the antagonist that must relax; rotator cuff muscles act as fixators to stabilize the shoulder origin.",
        "During wrist extension when clenching a fist, extensor carpi radialis longus/brevis and extensor carpi ulnaris act as synergists to stabilize the wrist so finger flexors can produce maximum grip force."
      ]
    },
    "memory": {
      "chunking": "Four muscle roles on every movement: Prime Mover / Agonist (does the lift), Antagonist (relaxes / brakes), Synergist (helps & steadies intervening joints), Fixator (anchors the origin bone).",
      "comparison": "Fibrous vs Cartilaginous in exam stems: \"Suture\" is always fibrous. \"Disc\" between vertebral bodies is always cartilaginous (symphysis).",
      "firstLetter": "A-A-S-F muscle team: Agonist, Antagonist, Synergist, Fixator.",
      "teachBack": "Walk through a push-up or bicep curl, identifying which specific muscle performs each of the four roles (agonist, antagonist, synergist, fixator)."
    },
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
    "skills": [
      "Break past-paper cloze prompts into key structural keywords: \"cord binding bone to bone\" = ligament; \"dense connective tissue cuff\" = fibrous capsule; \"stabilizes the origin\" = fixator; \"stabilizes intervening joints\" = synergist.",
      "Remember that the sternoclavicular joint is the sole skeletal bridge connecting the pectoral girdle and upper limb back to the axial trunk."
    ],
    "selfCheck": "From memory: write down the definitions of agonist, antagonist, synergist, fixator, ligament, and fibrous capsule, and name the bones forming the sternoclavicular and radiocarpal joints.",
    "visuals": [
      {
        "fig": "synovialJoint"
      },
      {
        "schematic": "muscleAction"
      },
      {
        "gen": true
      }
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
    id: 'abct2326-cvs-conduction',
    subject: 'ABCT2326', unit: 'phys.cvs', type: 'sequence',
    title: 'The cardiac conducting system',
    tags: ['cardiovascular', 'high-yield'],
    priorKnowledge: {
      level: 'dse-bio', covers: 'part', dsePart: 'elective-hp',
      syllabusRef: { ref: 'edb.bio', location: 'Elective V(c) "Regulation of gas content in blood" — "Control of cardiac output: heart rate and stroke volume, Pacemaker and cardiac cycle". The elective names the pacemaker; it does not go inside it.' },
      beyond: [
        { t: 'The route as five named stops: SA node → AV node → AV bundle (bundle of His) → left and right bundle branches → Purkinje fibres.',
          src: { ref: 'phys.2', location: 'Slides 43–52 "The Conducting System"' } },
        { t: 'Inside the pacemaker: the prepotential drifting from about −60 mV to a −40 mV threshold on Na⁺ through an HCN channel, then voltage-gated Ca²⁺ channels for the upstroke.',
          src: { ref: 'phys.2', location: 'Slides 47–48 "Pacemaker potential"' } },
        { t: 'Why a special route exists at all — the fibrous cardiac skeleton does not conduct, so the impulse cannot simply spread from atria to ventricles.',
          src: { ref: 'phys.2', location: 'Slide 49 "From SA node to AV node"' } },
        { t: 'The AV node as a deliberate delay rather than a relay, which is what lets the atria finish emptying first.',
          src: { ref: 'phys.2', location: 'Slide 50 "The Conducting System – AV Node"' } },
        { t: 'Myocardial cells resting at −90 mV with a 200–300 ms plateau from balanced Ca²⁺ influx and K⁺ efflux.',
          src: { ref: 'phys.2', location: 'Slide 53 "Myocardial Action Potentials"' } },
      ],
    },
    lesson: {
      explanation: 'The heart holds two types of cardiac muscle cell: the conducting system, which initiates and distributes the electrical impulses that stimulate contraction and so controls and coordinates the heartbeat, and the contractile cells, which produce the contractions that propel blood. The cardiac cycle begins with an action potential at the sinoatrial node, which is transmitted through the conducting system and produces action potentials in the contractile cells. The SA node sits in the posterior wall of the right atrium, contains pacemaker cells and begins atrial activation. Its prepotential, or pacemaker potential, drifts spontaneously from about −60 mV toward a −40 mV threshold — the drift is caused by Na⁺ flowing through an HCN channel that opens when the cell is hyperpolarised — and at threshold voltage-gated Ca²⁺ channels open to produce the upstroke. Because the SA node depolarises first, it sets the heart rate. The impulse spreads through the atrial myocardium via gap junctions, but needs a special route to the ventricles because the fibrous cardiac skeleton does not conduct. It reaches the AV node in the floor of the right atrium, which delays it while atrial contraction begins, then passes to the AV bundle (bundle of His) in the septum, out to the left and right bundle branches, and finally to the Purkinje fibres, which distribute it through the ventricles so ventricular contraction begins.',
      keyFacts: [
        'Two cell types: conducting system (initiates and distributes) and contractile cells (propel blood).',
        'SA node — posterior wall of right atrium, holds pacemaker cells, sets heart rate.',
        'Pacemaker potential drifts from about −60 mV to a −40 mV threshold via an HCN Na⁺ channel; Ca²⁺ channels then open for the upstroke.',
        'AV node — floor of the right atrium; receives, then delays the impulse.',
        'AV bundle (bundle of His) in the septum → left and right bundle branches → Purkinje fibres.',
        'The moderator band conducts to the papillary muscles.',
        'The fibrous cardiac skeleton is why a special conducting route to the ventricles is needed at all.',
        'Myocardial cells rest at −90 mV and have a 200–300 ms plateau from balanced Ca²⁺ influx and K⁺ efflux.',
      ],
      prerequisites: ['abct2326-cvs-heart-structure'],
      examples: [],
    },
    memory: {
      sequence: 'SA → AV → bundle of His → bundle branches → Purkinje. Five stops, top to bottom, right to left. Say it as a route, not a list.',
      location: 'Both nodes are in the right atrium — SA in the posterior wall, AV in the floor. If you can remember they are neighbours, you only have to remember which is higher.',
      chunking: 'The AV node’s job is a pause, not a relay. That delay is what lets the atria finish emptying before the ventricles squeeze.',
      wordOrigin: 'Sino-atrial names its location: the sinus of the atrium. Atrio-ventricular names the border it sits on.',
    },
    practice: [
      { type: 'sequence', prompt: 'Order the structures of the conducting system as the impulse travels.',
        items: ['Sinoatrial (SA) node', 'Internodal pathways / atrial myocardium', 'Atrioventricular (AV) node', 'AV bundle (bundle of His)', 'Left and right bundle branches', 'Purkinje fibres'],
        explanation: 'This is the five-step route given across the conducting-system slides, from atrial activation to ventricular contraction.' },
      { type: 'typed', prompt: 'Where in the heart is the SA node located?', accept: ['posterior wall of the right atrium', 'right atrium', 'posterior wall of right atrium', 'wall of the right atrium'],
        explanation: 'The posterior wall of the right atrium. The AV node is lower, in the floor of the same chamber.' },
      { type: 'mcq', prompt: 'What is the functional point of the delay at the AV node?', options: ['To slow the overall heart rate', 'To let atrial contraction complete before the ventricles contract', 'To protect the Purkinje fibres', 'To recharge the SA node'], answer: 1,
        explanation: 'The AV node delays the impulse while atrial contraction begins, so the atria finish emptying into the ventricles before ventricular contraction starts.' },
      { type: 'cloze', prompt: 'The SA node sets the heart rate because its ______ depolarises spontaneously and reaches threshold first.', accept: ['prepotential', 'pacemaker potential', 'prepotential (pacemaker potential)'],
        explanation: 'The prepotential, also called the pacemaker potential — the resting potential of conducting cells, which drifts toward threshold on its own.' },
      { type: 'explain', prompt: 'Why does the impulse need the AV node and bundle of His at all, rather than simply spreading from atria to ventricles?',
        model: 'Because the fibrous cardiac skeleton between the atria and ventricles does not conduct. Atrial impulses spread through the atrial myocardium via gap junctions but cannot cross that insulating layer, so the AV node and AV bundle provide the only electrical route through to the ventricles.',
        rubric: ['Names the fibrous cardiac skeleton as non-conducting', 'States it separates atria from ventricles electrically', 'Identifies the AV node/bundle as the only route through'] },
    ],
    application: [
      { type: 'scenario', prompt: 'If the SA node stopped firing but the AV node kept working, what would happen to the heart rate, and why does any beat survive at all?',
        model: 'A beat survives because pacemaker cells are not unique to the SA node — the conducting system as a whole has cells whose prepotential depolarises spontaneously. The SA node normally sets the rate only because it reaches threshold first. With it silent, a slower downstream pacemaker takes over, so the heart keeps beating but more slowly.',
        rubric: ['States the SA node leads because it depolarises fastest', 'Recognises other conducting cells also have a prepotential', 'Predicts a slower rate rather than arrest'] },
    ],
    commonMistakes: [
      'Treating the AV node as a simple relay — its defining contribution is the delay.',
      'Placing the bundle of His in the atria; it is in the interventricular septum.',
    ],
    skills: [
      'The conducting system exists because of a wall, not for speed: the fibrous cardiac skeleton does not conduct, so atrial impulses spreading through gap junctions stop dead at it — the AV node and AV bundle are the only electrical route into the ventricles, which is also why the bundle of His sits in the interventricular septum, not the atria.',
      'The AV node\'s defining contribution is the pause, not the relay: it delays the impulse so the atria finish emptying before the ventricles squeeze. Both nodes are neighbours in the right atrium — SA in the posterior wall, AV in the floor — so the delay is built into the architecture, not bolted on.',
      'The SA node is the leader, not the only pacemaker: every conducting cell carries a spontaneous prepotential, and the SA node sets the rate only because its drift (−60 mV toward the −40 mV threshold on Na⁺ through an HCN channel, then voltage-gated Ca²⁺ for the upstroke) gets there first. SA failure means a slower downstream pacemaker takes over — a slower beat, not arrest.',
    ],
    selfCheck: 'From a blank page: the full route with locations, why the fibrous cardiac skeleton forces this route to exist, what the AV node’s delay buys, and the SA-node-fails prediction — a slower beat, not arrest.',
    sourceRefs: [{ ref: 'phys.2', location: 'Slides 40–53 the conducting system, SA node, pacemaker potential, AV node, AV bundle, Purkinje fibres, myocardial action potentials' }],
  },
  {
    id: 'abct2326-cvs-ecg-cycle',
    subject: 'ABCT2326', unit: 'phys.cvs', type: 'definition',
    title: 'ECG waves, the cardiac cycle and heart sounds',
    tags: ['cardiovascular', 'high-yield'],
    priorKnowledge: {
      level: 'dse-bio', covers: 'part', dsePart: 'elective-hp',
      syllabusRef: { ref: 'edb.bio', location: 'Elective V(c) — "Outline the major events during the cardiac cycle" and cardiac output as heart rate × stroke volume. The ECG trace itself is not in the syllabus at all.' },
      beyond: [
        { t: 'The ECG as three named features — P wave atrial depolarisation, QRS ventricular depolarisation, T wave ventricular repolarisation — plus the P–R and Q–T intervals.',
          src: { ref: 'phys.2', location: 'Slides 57–59 "Electrocardiogram (ECG or EKG)"' } },
        { t: 'Three volumes that subtract: end-diastolic volume minus stroke volume leaves end-systolic volume.',
          src: { ref: 'phys.2', location: 'Slides 60–62 "Cardiac Cycle"' } },
        { t: 'The Frank–Starling law — stroke volume rises with end-diastolic volume because the stretch increases the force of contraction.',
          src: { ref: 'phys.2', location: 'Slides 62–63 "Cardiac Cycle continued"' } },
        { t: 'S1 from the AV valves and S2 from the semilunar valves, so the two sounds are doors closing in order.',
          src: { ref: 'phys.2', location: 'Slide 64 "Heart Sounds"' } },
        { t: 'A ventricular action potential of 250–300 ms — about thirty times a skeletal muscle fibre — whose long refractory period is what prevents summation and tetany in the heart.',
          src: { ref: 'phys.2', location: 'Slide 55 "Refractory Periods"' } },
      ],
    },
    lesson: {
      explanation: 'An electrocardiogram is a recording of the electrical events in the heart, obtained by electrodes at specific body locations, and abnormal patterns are used to diagnose damage. It has three features: the P wave, atrial depolarisation; the QRS complex, ventricular depolarisation; and the T wave, ventricular repolarisation. The P–R interval runs from the start of atrial depolarisation to the start of the QRS complex, and the Q–T interval from ventricular depolarisation to ventricular repolarisation. The cardiac cycle itself is the repeating pattern of contraction and relaxation: systole is the contraction phase, diastole the relaxation phase, and both atria contract simultaneously with the ventricles following 0.1–0.2 seconds later. End-diastolic volume is the blood in the ventricles at the end of diastole, stroke volume is the amount ejected during systole, and end-systolic volume is what is left afterwards. The Frank–Starling law states that stroke volume increases as end-diastolic volume increases, because the increased blood volume stretches the ventricular wall and the force of contraction rises. Two loud heart sounds mark the cycle: S1 is produced by the AV valves and S2 by the semilunar valves. Cardiac muscle also has a long absolute refractory period — the ventricular action potential lasts 250–300 ms, about thirty times longer than a skeletal muscle fibre — which prevents summation and tetany.',
      plain: 'An ECG is a trace of the heart’s electrical activity, read as three waves: P (the atria squeezing), QRS (the ventricles squeezing) and T (the ventricles relaxing). The cardiac cycle is the repeating squeeze-and-relax pattern — systole squeezes, diastole relaxes. The Frank–Starling law says more blood in the ventricle before a beat makes the next squeeze stronger. Two heart sounds mark the cycle: S1 from the AV valves and S2 from the semilunar valves.',
      keyFacts: [
        'P wave — atria depolarise. QRS complex — ventricles depolarise. T wave — ventricles repolarise.',
        'P–R interval: start of atrial depolarisation to start of QRS. Q–T interval: ventricular depolarisation to repolarisation.',
        'Systole = contraction; diastole = relaxation. Ventricles follow the atria by 0.1–0.2 s.',
        'End-diastolic volume → stroke volume ejected → end-systolic volume left behind.',
        'Frank–Starling law: stroke volume rises as end-diastolic volume rises, because stretch increases force of contraction.',
        'S1 is produced by the AV valves; S2 by the semilunar valves.',
        'Ventricular action potential lasts 250–300 ms — about 30× a skeletal muscle fibre — and the long refractory period prevents summation and tetany.',
      ],
      prerequisites: ['abct2326-cvs-conduction'],
      examples: [],
    },
    memory: {
      mnemonic: 'P before QRS before T, in the order the heart actually fires: atria depolarise, ventricles depolarise, ventricles recover. There is no wave for atrial repolarisation because the QRS buries it.',
      chunking: 'Three volumes, one subtraction: end-diastolic minus stroke volume equals end-systolic. If you know two you can derive the third.',
      visualCue: 'S1 "lubb" is the AV valves shutting as the ventricles start to squeeze; S2 "dupp" is the semilunar valves shutting as they finish. The sounds are doors closing, in order.',
      comparison: 'Systole and diastole are easy to swap under pressure. SyStole = Squeeze.',
    },
    practice: [
      { type: 'matching', prompt: 'Match each ECG feature to the electrical event it represents.',
        pairs: [['P wave', 'Atria depolarise'], ['QRS complex', 'Ventricles depolarise'], ['T wave', 'Ventricles repolarise'], ['P–R interval', 'Start of atrial depolarisation to start of QRS']],
        explanation: 'These are the ECG features listed on the electrocardiogram slide.' },
      { type: 'mcq', prompt: 'Which valves produce the first heart sound, S1?', options: ['The semilunar valves', 'The AV valves', 'The aortic valve alone', 'The pulmonary valve alone'], answer: 1,
        explanation: 'S1 is produced by the AV valves and S2 by the semilunar valves.' },
      { type: 'typed', prompt: 'What is the name of the law stating that stroke volume increases as end-diastolic volume increases?', accept: ['frank-starling', 'frank starling', 'frank-starling law', 'starling'],
        explanation: 'The Frank–Starling law. Increased blood volume stretches the ventricular wall, and the force of contraction rises.' },
      { type: 'cloze', prompt: 'The contraction phase of the cardiac cycle is called ______ and the relaxation phase ______.', accept: ['systole; diastole', 'systole, diastole', 'systole and diastole'],
        explanation: 'Systole is contraction, diastole is relaxation.' },
      { type: 'explain', prompt: 'Why does the long refractory period of cardiac muscle matter?',
        model: 'The ventricular action potential lasts 250–300 ms, roughly thirty times a skeletal muscle fibre. That long absolute refractory period means the cell cannot respond to a second stimulus during it, so cardiac muscle cannot summate or go into tetany — it has to relax and refill between beats.',
        rubric: ['Gives the 250–300 ms duration or the 30× comparison', 'States it prevents summation and tetany', 'Connects that to the need to refill'] },
    ],
    application: [
      { type: 'scenario', prompt: 'A patient’s end-diastolic volume rises after a fluid infusion. Using the Frank–Starling law, predict what happens to stroke volume and say why.',
        model: 'Stroke volume increases. The extra blood volume stretches the ventricular wall further at the end of diastole, and the force of contraction rises with that stretch, so more blood is ejected during systole.',
        rubric: ['Predicts an increase in stroke volume', 'Names ventricular wall stretch as the mechanism', 'Links stretch to force of contraction'] },
    ],
    commonMistakes: [
      'Looking for a wave representing atrial repolarisation — the lecture lists only P, QRS and T.',
      'Swapping S1 and S2. S1 is the AV valves, at the start of ventricular contraction.',
    ],
    skills: [
      'The missing wave is the lesson, not an omission: atrial repolarisation happens, but the QRS complex buries it — which is why the ECG carries exactly three features, and why "find the wave for atrial repolarisation" is the trap the lecture pre-empts.',
      'The heart sounds are two valves closing in order, not one valve clapping twice: S1 is the AV valves shutting as ventricular systole begins, S2 the semilunar valves as it ends — and swapping them silently reverses the timeline of the whole cycle.',
      'The refractory period is why the heart cannot be tetanised: a ventricular action potential lasts 250–300 ms, about thirty times a skeletal muscle fibre, so no second stimulus can summate within it — the cycle must finish and the ventricle must refill. The Frank–Starling law rides on the same geometry: more end-diastolic filling means more wall stretch, more force, and EDV − SV = ESV is the subtraction that holds it.',
    ],
    selfCheck: 'From a blank page: the labelled cycle sketch, the Frank–Starling infusion prediction with the stretch mechanism, and the 250–300 ms refractory-period consequence — no summation, no tetany, the heart must refill.',
    sourceRefs: [{ ref: 'phys.2', location: 'Slides 55–64 refractory periods, electrocardiogram, cardiac cycle, heart sounds; Figure 20-18b' }],
  },
  {
    id: 'abct2326-resp-gas-transport',
    subject: 'ABCT2326', unit: 'phys.resp', type: 'definition',
    title: 'Gas exchange, oxygen transport and the control of respiration',
    tags: ['respiratory', 'high-yield'],
    priorKnowledge: {
      level: 'dse-bio', covers: 'part', dsePart: 'elective-hp',
      syllabusRef: { ref: 'edb.bio', location: 'Elective V(c) "Regulation of gas content in blood" — control of the rate and depth of breathing, the respiratory centre and chemoreceptors, and the effect of blood CO₂. Alveolar histology is not in the syllabus.' },
      beyond: [
        { t: 'Alveolar histology: simple squamous epithelium of thin type I pneumocytes where most exchange happens, type II pneumocytes (septal cells) making surfactant, alveolar macrophages as dust cells.',
          src: { ref: 'phys.3', location: 'Slide 10 "Alveolar epithelium"' } },
        { t: 'What surfactant is for — an oily phospholipid and protein secretion that lowers surface tension and stops the lung collapsing.',
          src: { ref: 'phys.3', location: 'Slide 13 "Surfactant"' } },
        { t: 'The oxygen–haemoglobin saturation curve shifted by pH (normal blood 7.35–7.45) and by temperature (normal 38 °C).',
          src: { ref: 'phys.3', location: 'Slides 47–54 "Oxygen–hemoglobin saturation curve", "Hemoglobin and pH", "Hemoglobin and temperature"' } },
        { t: 'Carbon dioxide carried three ways: converted to carbonic acid, bound to haemoglobin inside red cells, dissolved in plasma.',
          src: { ref: 'phys.3', location: 'Slide 55 "Carbon dioxide gas transport"' } },
        { t: 'The respiratory centre resolved into parts — dorsal and ventral respiratory groups in the medulla, modified by the apneustic and pneumotaxic centres of the pons.',
          src: { ref: 'phys.3', location: 'Slides 59–64 "The respiratory centers of the brain"' } },
        { t: 'Chemoreceptor reflexes routed by named nerves — glossopharyngeal (N IX) from the carotid bodies, vagus (N X) from the aortic bodies — with central chemoreceptors on the ventrolateral medulla reading CSF.',
          src: { ref: 'phys.3', location: 'Slides 68–71 "Chemoreceptor reflexes"' } },
      ],
    },
    lesson: {
      explanation: 'Gas exchange happens across the alveolar epithelium, which is simple squamous epithelium made of thin type I pneumocytes patrolled by alveolar macrophages, or dust cells, alongside type II pneumocytes that produce surfactant. The majority of gas exchange occurs across the type I pneumocytes, and a single capillary may exchange with several alveoli at once. Gases move down partial-pressure gradients between alveolar air and the alveolar capillaries. Oxygen binds to the iron ions in haemoglobin molecules to form oxyhaemoglobin; haemoglobin saturation is the percentage of heme units carrying bound oxygen, and the oxygen–haemoglobin saturation curve relates that saturation to the partial pressure of oxygen. Respiration is controlled by respiratory centres whose ventral and dorsal respiratory groups establish the basic pace and depth, modified by the pneumotaxic centre. Reflex input comes from chemoreceptors sensitive to PCO₂, PO₂ or pH of blood or cerebrospinal fluid; baroreceptors in the aortic or carotid sinuses sensitive to blood pressure; stretch receptors responding to lung volume; and irritant, pain, temperature and visceral sensations. Peripheral chemoreceptor input arrives by the glossopharyngeal nerve from the carotid bodies and the vagus nerve from the aortic bodies, while central chemoreceptors on the ventrolateral surface of the medulla oblongata respond to the PCO₂ and pH of cerebrospinal fluid. Chemoreceptor stimulation increases the depth and rate of respiration, and is subject to adaptation — sensitivity falls under chronic stimulation.',
      plain: 'Gas exchange happens across the very thin walls of the alveoli (the air sacs), where oxygen binds to iron in haemoglobin to make oxyhaemoglobin; how much oxygen is carried depends on its partial pressure — that relationship is the saturation curve. Breathing itself is set by respiratory centres in the brain and tuned by reflex inputs: chemoreceptors that sense carbon dioxide, oxygen or pH, baroreceptors that sense blood pressure, stretch receptors that sense lung volume, and others.',
      keyFacts: [
        'Type I pneumocytes — thin, where the majority of gas exchange occurs. Type II pneumocytes — produce surfactant. Alveolar macrophages — dust cells.',
        'Oxygen binds the iron ions of haemoglobin to form oxyhaemoglobin.',
        'Haemoglobin saturation = the percentage of heme units carrying bound oxygen.',
        'Respiratory centres: ventral and dorsal respiratory groups set pace and depth; the pneumotaxic centre modifies the pace.',
        'Chemoreceptors respond to PCO₂, PO₂ or pH of blood or CSF.',
        'Glossopharyngeal nerve (CN IX) from the carotid bodies; vagus nerve (CN X) from the aortic bodies.',
        'Central chemoreceptors sit on the ventrolateral surface of the medulla oblongata and monitor CSF.',
        'Chemoreceptor stimulation raises depth and rate, and adapts under chronic stimulation.',
      ],
      prerequisites: ['abct2326-resp-pathway'],
      examples: [],
    },
    memory: {
      comparison: 'Type I is thin so gas crosses it; type II is secretory so it makes surfactant. One roman numeral, one job: I for interchange, II for the substance.',
      location: 'Two peripheral sensing sites, two nerves, and each nerve serves the body part it is named near: glossopharyngeal from the carotid bodies in the neck, vagus from the aortic bodies in the chest.',
      chunking: 'Control has three layers: a rhythm generator (VRG/DRG), a modifier (pneumotaxic centre), and sensors feeding back (chemo-, baro-, stretch).',
      wordOrigin: 'Oxyhaemoglobin is simply oxygen + haem + globin — the carrier named after what it is carrying.',
    },
    practice: [
      { type: 'mcq', prompt: 'Across which cell type does the majority of gas exchange occur?', options: ['Type II pneumocytes', 'Alveolar macrophages', 'Type I pneumocytes', 'Goblet cells'], answer: 2,
        explanation: 'Type I pneumocytes are the thin, delicate cells of the alveolar epithelium and the majority of gas exchange occurs across them. Type II pneumocytes make surfactant.' },
      { type: 'typed', prompt: 'Oxygen binds to which part of the haemoglobin molecule?', accept: ['iron ions', 'iron', 'the iron ions', 'heme iron'],
        explanation: 'The iron ions in haemoglobin. The result is called oxyhaemoglobin.' },
      { type: 'matching', prompt: 'Match each receptor site to the nerve carrying its input.',
        pairs: [['Carotid bodies', 'Glossopharyngeal nerve (CN IX)'], ['Aortic bodies', 'Vagus nerve (CN X)'], ['Cerebrospinal fluid', 'Central chemoreceptors on the medulla oblongata'], ['Aortic and carotid sinuses', 'Baroreceptors sensitive to blood pressure']],
        explanation: 'These are the chemoreceptor and baroreceptor routes given in the control-of-respiration slides.' },
      { type: 'cloze', prompt: 'Haemoglobin ______ is the percentage of heme units in a haemoglobin molecule that contain bound oxygen.', accept: ['saturation'],
        explanation: 'Saturation. The oxygen–haemoglobin saturation curve plots it against the partial pressure of oxygen.' },
      { type: 'explain', prompt: 'What does it mean that chemoreceptor stimulation "is subject to adaptation"?',
        model: 'Sensitivity falls under chronic stimulation. A chemoreceptor that is being stimulated continuously stops driving the same increase in depth and rate that the same signal would produce acutely, so a long-standing abnormality provokes less of a response than a sudden one.',
        rubric: ['States sensitivity decreases with chronic stimulation', 'Contrasts acute with chronic response'] },
    ],
    application: [
      { type: 'scenario', prompt: 'Your respiratory rate rises sharply during exercise. Name two different receptor types from this lecture that could be contributing, and say what each is responding to.',
        model: 'Chemoreceptors responding to rising PCO₂, falling PO₂ or falling pH in blood or cerebrospinal fluid; and stretch receptors responding to the changes in lung volume as breathing deepens. Baroreceptors in the aortic and carotid sinuses could also contribute, since they respond to the blood-pressure changes exercise produces.',
        rubric: ['Names at least two receptor types from the lecture list', 'States correctly what each responds to'] },
    ],
    commonMistakes: [
      'Attributing surfactant production to type I pneumocytes — that is type II.',
      'Assuming central chemoreceptors sense blood; they monitor cerebrospinal fluid.',
    ],
    skills: [
      'The roman numerals are job descriptions, not a numbering: type I is the thin wall that interchange crosses, type II is the secretory cell that makes surfactant — attributing surfactant to type I is the named mistake — and the dust cells (alveolar macrophages) are the third resident of the alveolus, carrying no numeral at all.',
      '"Chemoreceptor" splits on which fluid is read: the peripheral carotid bodies (via the glossopharyngeal nerve, CN IX) and aortic bodies (via the vagus, CN X) sample blood, while the central chemoreceptors on the ventrolateral medulla monitor cerebrospinal fluid — assuming the central ones read blood is the named mistake.',
      'Control is layered, and the layers do different jobs: the ventral and dorsal respiratory groups generate rhythm and depth, the pneumotaxic centre modifies pace, and the sensors — chemo-, baro-, stretch — feed back. The sensors themselves adapt: chronic stimulation lowers sensitivity, so a long-standing abnormality provokes less response than a sudden one.',
    ],
    selfCheck: 'From a blank page: the three alveolar cell types with their jobs, both chemoreceptor-to-nerve pairs plus the central route, and the exercise scenario naming two receptor types with what each responds to.',
    sourceRefs: [{ ref: 'phys.3', location: 'Slides 10–12 alveolar epithelium; 66–74 control of respiration, respiratory and chemoreceptor reflexes, homeostasis of arterial PCO₂; partial pressure and oxygen–haemoglobin saturation slides' }],
  },
  {
    id: 'abct2326-immune-adaptive',
    subject: 'ABCT2326', unit: 'phys.imm', type: 'comparison',
    title: 'Inflammation, complement and adaptive immunity',
    tags: ['immune', 'high-yield'],
    priorKnowledge: {
      level: 'dse-bio', covers: 'part', dsePart: 'core',
      syllabusRef: { ref: 'edb.bio', location: 'Compulsory IV(c) "Body defence mechanisms" — specific defence: immune response, antigen and antibody, B and T lymphocytes, primary and secondary responses, active and passive immunity. Complement and MHC are not in it.' },
      beyond: [
        { t: 'The complement cascade with its steps named: about 30 plasma proteins, classical or alternative activation, then the common pathway where C3b splits C5 and C5b–C9 assemble the membrane attack complex.',
          src: { ref: 'phys.10', location: 'Slides 27, 29 "Complement System"' } },
        { t: 'Inflammation as a named set: four Latin signs, three effects, and the products necrosis, pus and abscess.',
          src: { ref: 'phys.10', location: 'Slides 31–33 "Inflammation"' } },
        { t: 'Active and passive immunity each split again into naturally acquired and artificially induced — a four-cell grid, where DSE stops at the pair.',
          src: { ref: 'phys.10', location: 'Slide 35 "Active Immunity / Passive Immunity"' } },
        { t: 'Four major T cell types: cytotoxic, memory, helper and suppressor.',
          src: { ref: 'phys.10', location: 'Slide 39 "4 Major Types of T Cells"' } },
        { t: 'MHC proteins, coded on chromosome 6, as the reason T cells only ever see presented antigen — class I on all nucleated cells, class II on antigen-presenting cells.',
          src: { ref: 'phys.10', location: 'Slides 40–41 "T Cells and Immunity", "Two Classes of MHC Proteins"' } },
      ],
    },
    lesson: {
      explanation: 'Inflammation is a localised response triggered by any stimulus that kills cells or injures tissue. Its four principal signs carry Latin names: swelling (tumor), redness (rubor), heat (calor) and pain (dolor). It has three effects — temporary repair and a barrier against pathogens, retarding the spread of pathogens into surrounding areas, and mobilising local and systemic defences while facilitating repair. Its products include necrosis, the destruction of injured cells; pus, the viscous mixture of debris, fluid and dead cells that accumulates at the injury site; and an abscess, an accumulation of pus in an enclosed tissue space. Complement is a system of about thirty plasma proteins that work in cascades. There are two activation pathways: the classical pathway, which requires antibody binding and C1 attachment and is the most rapid and effective, and the alternative pathway, which involves no antibody, occurs more slowly and less effectively, and is activated by exposure to foreign materials. Either pathway turns on the common pathway from C5 to C9, generating the membrane attack complex on the bacterial surface and causing cell lysis. Adaptive immunity is not present at birth: you acquire immunity to a specific antigen only after exposure to it or by receiving antibodies. It splits into active immunity, where antibodies develop after exposure to an antigen, and passive immunity, where antibodies are transferred from another source; and it is studied as cell-mediated (cellular) immunity versus antibody-mediated (humoral) immunity, involving T cells and B cells respectively.',
      plain: 'Inflammation is the body’s local reaction to injury, with four classic signs — swelling, redness, heat, pain (tumor, rubor, calor, dolor in the exam wording). Complement is a team of about thirty plasma proteins that work in cascades; the classical pathway needs antibodies and is fast, the alternative pathway does not and is slower. Adaptive immunity is learned after birth: active when your own body makes antibodies after exposure, passive when you receive them from outside.',
      keyFacts: [
        'Four signs of inflammation: swelling (tumor), redness (rubor), heat (calor), pain (dolor).',
        'Three effects: temporary repair and barrier, retarding spread, mobilising defences and facilitating repair.',
        'Products: necrosis, pus, abscess.',
        'Complement = about 30 plasma proteins working in a cascade.',
        'Classical pathway needs antibody binding and C1; it is the most rapid and effective. Alternative pathway needs no antibody, is slower and less effective.',
        'Both converge on the common pathway C5–C9, forming the membrane attack complex (MAC) and lysing the cell.',
        'Adaptive immunity is acquired after birth — by exposure to an antigen or by receiving antibodies.',
        'Active immunity: antibodies develop after exposure. Passive immunity: antibodies transferred from another source.',
        'Cell-mediated immunity involves T cells; antibody-mediated (humoral) immunity involves B cells.',
      ],
      prerequisites: ['abct2326-innate-adaptive'],
      examples: [],
    },
    memory: {
      firstLetter: 'The four Latin signs are easier as a set than singly: tumor, rubor, calor, dolor — swelling, redness, heat, pain. They rhyme, which is the point.',
      comparison: 'Classical vs alternative complement: classical needs an antibody and is fast; alternative needs none and is slow. The pathway that waits for a specific antibody is the one that works best once it arrives.',
      chunking: 'Active vs passive immunity is about who made the antibody. Active — you did, after exposure. Passive — someone else did, and it was transferred.',
      mnemonic: 'B cells make antiBodies. T cells do the cell-mediated work. One letter each, and it holds.',
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
    skills: [
      'The Latin sign list carries one false friend: tumor here is the sign meaning swelling — rubor, calor and dolor are its rhymed companions — not the English "tumour" of neoplasia, so reading the Latin through the English word plants a growth where the lecture claimed only a swollen tissue.',
      'Decide the complement pathway with one question — does it wait for an antibody? yes: classical, fast and effective; no: alternative, slower — then confirm both converge on C5–C9 to build the membrane attack complex.',
    ],
    selfCheck: 'From a blank page: the four signs with Latin names, the pathway decision with its reason, who made the antibody in active versus passive immunity, and the pus-in-an-enclosed-space trace back to the triggering injury.',
    sourceRefs: [{ ref: 'phys.10', location: 'Slides 27–35 complement system and pathways, inflammation, products of inflammation, forms of immunity; learning outcomes slide 2' }],
  },
  {
    id: 'hti17103-modality-best-use',
    subject: 'HTI17103', unit: 'hti.modalities', type: 'matching',
    title: 'What each modality is best used for',
    tags: ['modalities', 'high-yield'],
    lesson: {
      explanation: 'Each modality in the Week 2 lecture is introduced with the job it is suited to. Fluoroscopy provides real-time monitoring and is applicable intraoperatively, which is what makes it the choice for angiography, stent installation, bone cement work and function imaging of the digestive system. Mammography is presented as an extreme of resolution. Computed tomography exists because radiologists normally need two views and CT offers a 360-degree view; modern spiral CT adds multiplanar reconstruction and 3D angiographic reconstruction, up to a simulated heart model. Radionuclide imaging gives the non-invasive visualisation of bio-distribution, using a radiopharmaceutical made of a radioisotope plus a specific compound — the compound decides where it goes. MRI is summarised as giving good soft-tissue contrast, being compatible with function imaging and 3D/4D reconstruction, and being non-ionising. General X-ray, in its direct digital form, is the time-saving workhorse with no readers and no physical film.',
      keyFacts: [
        'Fluoroscopy — real-time, intraoperative: angiography, stent installation, bone cement, digestive function imaging.',
        'Mammography — an extreme of resolution.',
        'CT — a 360-degree view where two projections are not enough; multiplanar and 3D angiographic reconstruction.',
        'Radionuclide imaging — non-invasive visualisation of bio-distribution.',
        'MRI — good soft-tissue contrast, function imaging, 3D/4D, non-ionising.',
        'Direct digital radiography — no readers, time-saving, no physical films, but expensive.',
        'Contrast agents extend fluoroscopy: oral barium sulfate, or intravenous ionic vs non-ionic agents.',
      ],
      prerequisites: ['hti17103-ionizing-vs-nonionizing'],
      examples: [],
    },
    memory: {
      chunking: 'Sort by what the modality gives you that others cannot: time (fluoroscopy), resolution (mammography), a third dimension (CT), function and distribution (RNI), soft tissue without ionising radiation (MRI).',
      comparison: 'CT and MRI both give cross-sections. CT is fast and ionising; MRI has better soft-tissue contrast and no ionising radiation. If the question is about soft tissue, it is MRI.',
      mnemonic: 'Fluoroscopy is the only one that shows you *change over time*. Anything described as real-time or intraoperative is pointing at it.',
    },
    practice: [
      { type: 'matching', prompt: 'Match each modality to the capability the lecture highlights.',
        pairs: [['Fluoroscopy', 'Real-time monitoring, applicable intraoperatively'], ['Computed tomography', 'A 360-degree view with multiplanar reconstruction'], ['Magnetic resonance imaging', 'Good soft-tissue contrast, non-ionising'], ['Radionuclide imaging', 'Non-invasive visualisation of bio-distribution']],
        explanation: 'These are the defining capabilities each modality is introduced with in the Week 2 lecture.' },
      { type: 'mcq', prompt: 'A stent is being installed and the operator needs to watch it move into position. Which modality does the lecture point to?', options: ['Computed tomography', 'Fluoroscopy', 'Mammography', 'Magnetic resonance imaging'], answer: 1,
        explanation: 'Fluoroscopy — real-time monitoring, intraoperatively applicable, and stent installation is one of the listed applications.' },
      { type: 'typed', prompt: 'Which modality does the lecture describe as "an extreme of resolution"?', accept: ['mammography', 'mammogram'],
        explanation: 'Mammography.' },
      { type: 'comparison', prompt: 'CT and MRI both produce cross-sectional images. Which difference matters most when choosing between them?',
        options: [
          'MRI gives better soft-tissue contrast and uses no ionising radiation, while CT is an ionising modality',
          'CT cannot produce 3D reconstructions',
          'MRI is an ionising modality and CT is not',
          'They produce identical images by different means',
        ], answer: 0,
        explanation: 'Both give cross-sections, but the lecture puts CT in the ionising column and MRI in the non-ionising column, and summarises MRI as giving good soft-tissue contrast. Both can reconstruct in 3D.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A radiopharmaceutical is described as a radioisotope combined with a specific compound. Which half decides what you can image, and why does that make radionuclide imaging different from CT?',
        model: 'The specific compound decides where the agent goes in the body, so it determines what you can image; the radioisotope only makes that distribution visible. That is what the lecture means by non-invasive visualisation of bio-distribution — RNI images function and where a substance travels, whereas CT images structure.',
        rubric: ['Identifies the compound as determining distribution', 'Identifies the isotope as providing the signal', 'Contrasts function/distribution with structure'] },
    ],
    commonMistakes: [
      'Choosing CT whenever cross-sections are wanted, without weighing the ionising-radiation difference against MRI.',
      'Forgetting that fluoroscopy is defined by being real-time, not by being an X-ray technique.',
    ],
    skills: [
      'Each modality owns exactly one capability the others lack — time (fluoroscopy), resolution (mammography), a third dimension (CT), function and distribution (radionuclide imaging), soft tissue without ionising radiation (MRI) — and the exam wording names the owner: "real-time" or "intraoperative" points at fluoroscopy, because being real-time, not being an X-ray technique, is its definition.',
      'CT and MRI are both cross-sectional, so the deciding difference is not the image shape but the column each sits in: CT is ionising, MRI gives better soft-tissue contrast without ionising radiation — and both reconstruct in 3D, so "cannot do 3D" is the false discriminator.',
      'A radiopharmaceutical is taxi and passenger: the specific compound decides where the agent goes and therefore what you can image; the radioisotope only makes that distribution visible — which is why radionuclide imaging reports function and bio-distribution where CT reports structure.',
    ],
    selfCheck: 'From a blank page: the matching of all four highlighted capabilities, the CT-versus-MRI decision with the ionising-radiation reason, and the stent scenario answered with the real-time modality.',
    sourceRefs: [{ ref: 'hti.w2', location: 'Slides 12–49 general X-ray cassettes, fluoroscopy and contrast enhancement, mammography, computed tomography, radiopharmaceuticals, RNI, MRI summary' }],
  },
];
