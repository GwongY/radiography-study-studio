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
      "syllabusRef": {
        "ref": "edb.bio",
        "location": "Elective V(c) \"Regulation of gas content in blood\" — \"Control of cardiac output: heart rate and stroke volume, Pacemaker and cardiac cycle\". The elective names the pacemaker; it does not go inside it."
      },
      "beyond": [
        {
          "t": "Two functional cell classes in cardiac tissue: specialized conducting system cells that initiate and distribute impulses, and contractile cells that produce mechanical force.",
          "src": {
            "ref": "phys.2",
            "location": "p41 \"Two types of cardiac muscle cells\""
          }
        },
        {
          "t": "Structures of the conducting system: SA node in right atrial wall, AV node at atrioventricular junction, and conducting cells throughout myocardium.",
          "src": {
            "ref": "phys.2",
            "location": "p43 \"Structures of the Conducting System\""
          }
        },
        {
          "t": "Internodal pathways distribute impulses through atria; AV bundle, bundle branches, and Purkinje fibers distribute through ventricles.",
          "src": {
            "ref": "phys.2",
            "location": "p44 \"Conducting Cells\""
          }
        },
        {
          "t": "Sinoatrial (SA) node in posterior wall of right atrium contains autorhythmic pacemaker cells that initiate atrial activation.",
          "src": {
            "ref": "phys.2",
            "location": "p45 \"In posterior wall of right atrium\""
          }
        },
        {
          "t": "The pacemaker prepotential: resting potential spontaneously depolarizes toward threshold driven by HCN channels admitting inward current while outward K+ drops.",
          "src": {
            "ref": "phys.2",
            "location": "p47 \"Prepotential\""
          },
          "supp": {
            "ref": "phys.2.supp",
            "location": "p5 \"HCN channels open\""
          }
        },
        {
          "t": "The fibrous cardiac skeleton does not conduct electricity, requiring impulses to funnel strictly through the AV node and AV bundle (bundle of His).",
          "src": {
            "ref": "phys.2",
            "location": "p49 \"From SA node to AV node\""
          }
        },
        {
          "t": "The AV node in the floor of the right atrium introduces a deliberate 100 ms conduction delay, allowing atrial contraction to complete before ventricular systole.",
          "src": {
            "ref": "phys.2",
            "location": "p50 \"Delays impulse\""
          }
        },
        {
          "t": "The AV bundle branches into left and right bundle branches, conducts to Purkinje fibers, and sends impulses via the moderator band to papillary muscles.",
          "src": {
            "ref": "phys.2",
            "location": "p51 \"The AV Bundle\""
          }
        },
        {
          "t": "Purkinje fibers rapidly distribute depolarization upward from the cardiac apex through ventricular myocardium.",
          "src": {
            "ref": "phys.2",
            "location": "p52 \"Purkinje Fibers\""
          }
        },
        {
          "t": "Contractile myocardial cells have a resting potential of -90 mV, upstroke via fast voltage-gated Na+ channels, and a 200-300 ms plateau balanced by Ca2+ influx and K+ efflux.",
          "src": {
            "ref": "phys.2",
            "location": "p53 \"resting membrane potential\""
          }
        }
      ]
    },
    "lesson": {
      "explanation": "Cardiac muscle tissue is functionally partitioned into two distinct cell populations: the specialized conducting system cells (~1% of myocardium), which spontaneously initiate and coordinate electrical impulses, and contractile cells (~99%), which generate the mechanical pumping force to propel blood. Normal cardiac excitation originates in the sinoatrial (SA) node, situated in the superior posterior wall of the right atrium near the entrance of the superior vena cava. As the primary cardiac pacemaker, the SA node exhibits autorhythmicity, discharging spontaneous action potentials at an intrinsic resting rate of 60–100 beats per minute (bpm). Unlike skeletal muscle and neural axons that hold a static resting membrane potential, SA nodal pacemaker cells possess an unstable resting potential termed the prepotential (or pacemaker potential). Following repolarization to approximately -60 mV, hyperpolarization-activated cyclic nucleotide-gated (HCN) channels open to admit an inward 'funny' sodium current (I_f). In concert with a gradual reduction in outward potassium (K+) efflux, this net inward positive charge slowly and steadily depolarizes the membrane potential upward from -60 mV to reach the action potential threshold of roughly -40 mV. Once threshold is reached, voltage-gated calcium channels open, allowing rapid calcium (Ca2+) influx that generates the depolarizing upstroke of the nodal action potential; subsequently, voltage-gated potassium channels open, driving K+ efflux that repolarizes the membrane back to -60 mV, which re-opens HCN channels to initiate the next cycle. From the SA node, action potentials propagate across the right and left atria via internodal pathways and cell-to-cell gap junctions (Step 1), triggering atrial systole. Because the dense collagenous cardiac fibrous skeleton is a complete electrical insulator, the impulse cannot cross directly from atria into ventricles at the atrioventricular margin; instead, the wavefront converges exclusively upon the atrioventricular (AV) node, located in the floor of the right atrium along the interatrial septum (Step 2). At the AV node, impulse transmission slows dramatically, introducing a vital physiological delay of approximately 100 milliseconds (Step 3). This intentional delay is essential because it allows the atria to complete mechanical contraction and empty their remaining blood volume into the ventricles before ventricular contraction begins. After traversing the AV node, the impulse enters the atrioventricular bundle (AV bundle, or bundle of His), the sole electrical conduit penetrating through the fibrous skeleton into the superior interventricular septum. The AV bundle divides into left and right bundle branches (Step 4), which descend subendocardially within the septum toward the cardiac apex. A specialized muscular bundle, the moderator band (trabecula septomarginalis), branches from the right bundle to the anterior papillary muscle, depolarizing papillary muscles slightly before the ventricular myocardium to pre-tension the chordae tendineae and prevent AV valve eversion. At the apex, the bundle branches arborize into extensive networks of Purkinje fibers (Step 5)—very large, specialized conducting cells with sparse myofibrils, abundant gap junctions, and rapid conduction velocities (~4 m/s). Purkinje fibers rapidly distribute depolarization upward from the apex through the free ventricular walls, causing the ventricles to contract sequentially from the apex toward the base, wringing blood upward toward the great arterial outlets. In contrast to pacemaker cells, working ventricular contractile myocytes maintain a stable resting potential of -90 mV. When excited, they exhibit a unique action potential: a rapid Phase 0 depolarization upstroke driven by fast voltage-gated Na+ channels, followed by a prolonged Phase 2 plateau lasting 200–300 milliseconds. The plateau is sustained by a delicate balance between slow inward Ca2+ influx through L-type calcium channels and outward K+ efflux through delayed rectifier potassium channels; opening of additional K+ channels completes Phase 3 repolarization.",
      "plain": "The heart's electrical system has two cell types: pacemaker/conducting cells that create and spread signals, and contractile cells that pump blood. The heartbeat starts at the sinoatrial (SA) node in the right atrium. SA node cells have an unstable resting potential (prepotential) that slowly drifts upward from -60 mV to -40 mV threshold because HCN channels let Na+ leak in. At threshold, Ca2+ rushes in to create the action potential. Signals spread across the atria to the atrioventricular (AV) node, where they are paused for about 100 milliseconds so the atria can finish squeezing blood into the ventricles. Because the fibrous skeleton blocks electrical signals, the impulse must pass through the AV bundle (bundle of His) down the septum, branching into left and right bundle branches and into high-speed Purkinje fibers. Purkinje fibers spread the signal from the apex upward so the ventricles squeeze blood out through the aorta and pulmonary trunk. Ventricular muscle cells have a long 200–300 ms plateau phase caused by slow Ca2+ influx balancing K+ efflux.",
      "keyFacts": [
        "Specialized conducting system cells initiate and distribute impulses; contractile cells produce mechanical pumping force.",
        "The sinoatrial (SA) node in the posterior wall of the right atrium is the primary cardiac pacemaker (60–100 bpm).",
        "Pacemaker autorhythmicity is driven by an unstable prepotential: HCN channels admit an inward Na+ current from -60 mV to -40 mV threshold.",
        "The upstroke of the SA nodal action potential is driven by Ca2+ influx through voltage-gated calcium channels.",
        "Internodal pathways propagate depolarization through atrial myocardium, initiating atrial contraction.",
        "The atrioventricular (AV) node in the right atrial floor delays the impulse by ~100 ms to allow complete ventricular filling.",
        "The non-conducting fibrous skeleton prevents direct atrial-to-ventricular electrical spread, routing impulses strictly through the AV bundle.",
        "The AV bundle (bundle of His) divides into left and right bundle branches descending the interventricular septum.",
        "Purkinje fibers conduct impulses rapidly (~4 m/s) from the cardiac apex upward through the ventricular walls.",
        "Ventricular contractile cells rest at -90 mV and feature a 200–300 ms plateau sustained by balanced Ca2+ influx and K+ efflux."
      ],
      "prerequisites": [],
      "examples": [
        "In complete (third-degree) atrioventricular block, pathological damage to the AV node or bundle of His completely severs electrical communication between atria and ventricles; the atria continue beating at the SA rate (~75 bpm) while the ventricles beat at a dangerously slow Purkinje escape rhythm (~30 bpm), resulting in AV dissociation and severe fatigue.",
        "Beta-blockers (such as metoprolol) bind to beta-1 adrenergic receptors on SA nodal cells, decreasing intracellular cAMP, which reduces HCN channel open probability, decreases the slope of the pacemaker prepotential, and slows resting heart rate."
      ]
    },
    "memory": {
      "chunking": "Five-Stop Electrical Highway: SA Node (Pacemaker) → Internodal Atrial Delay → AV Node (100 ms pause) → AV Bundle & Branches (Septal descent) → Purkinje Fibers (Apex-to-base spread).",
      "comparison": "Pacemaker AP vs Ventricular Myocyte AP: Pacemaker has NO stable resting potential, -60 mV to -40 mV prepotential on HCN Na+, upstroke on Ca2+; Ventricular myocyte rests stably at -90 mV, upstroke on fast Na+, 200-300 ms plateau on Ca2+.",
      "visualCue": "Picture water flowing through a funnel: wide open at the atria, squeezed through a narrow spout (100 ms delay at AV node) because the surrounding rock (fibrous skeleton) is waterproof, then exploding into spray at the bottom (Purkinje fibers).",
      "teachBack": "Walk through all five steps of the cardiac conducting system in order and explain why the 100 ms AV nodal delay is essential for life."
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
    "skills": [
      "Trace the complete chronological sequence of cardiac electrical conduction from SA nodal generation to Purkinje activation.",
      "Compare and contrast the ion channel dynamics of pacemaker action potentials versus ventricular contractile cell action potentials."
    ],
    "selfCheck": "From memory: name the five anatomical waypoints of the conducting system, identify the ion channel that drives the pacemaker prepotential, and explain why the AV nodal delay is physiologically necessary.",
    "visuals": [
      {
        "fig": "cardiacConductingSystem"
      },
      {
        "schematic": "conduction"
      },
      {
        "gen": true
      }
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
    "priorKnowledge": {
      "level": "dse-bio",
      "covers": "part",
      "dsePart": "elective-hp",
      "syllabusRef": {
        "ref": "edb.bio",
        "location": "Elective V(c) — \"Outline the major events during the cardiac cycle\" and cardiac output as heart rate × stroke volume. The ECG trace itself is not in the syllabus at all."
      },
      "beyond": [
        {
          "t": "Ventricular action potential duration of 250–300 ms (30x longer than skeletal muscle) produces a long refractory period preventing summation and tetany.",
          "src": {
            "ref": "phys.2",
            "location": "p55 \"Refractory Periods\""
          }
        },
        {
          "t": "Electrocardiogram (ECG or EKG) as a surface recording of myocardial electrical events used to diagnose cardiac pathology.",
          "src": {
            "ref": "phys.2",
            "location": "p57 \"A recording of electrical events in the heart\""
          }
        },
        {
          "t": "ECG features: P wave atrial depolarisation, QRS complex ventricular depolarisation, T wave ventricular repolarisation, with P-R and Q-T intervals.",
          "src": {
            "ref": "phys.2",
            "location": "p58 \"Features of an ECG\""
          }
        },
        {
          "t": "Cardiac cycle: repeating pattern of contraction (systole) and relaxation (diastole), with ventricles contracting 0.1-0.2 sec after atria.",
          "src": {
            "ref": "phys.2",
            "location": "p61 \"Cardiac Cycle\""
          }
        },
        {
          "t": "Three cardiodynamic volumes: End-diastolic volume (EDV) minus Stroke volume (SV) equals End-systolic volume (ESV); Frank-Starling Law matches SV to EDV.",
          "src": {
            "ref": "phys.2",
            "location": "p62 \"End-diastolic volume\""
          }
        },
        {
          "t": "Heart sounds: S1 from closure of AV valves, S2 from closure of semilunar valves.",
          "src": {
            "ref": "phys.2",
            "location": "p63 \"Heart Sounds\""
          }
        },
        {
          "t": "The temporal relationship between heart sounds (lubb-dupp), chamber pressures, and valve opening/closure across the cardiac cycle.",
          "src": {
            "ref": "phys.2",
            "location": "p64 \"Figure 20-18b Heart Sounds.\""
          }
        }
      ]
    },
    "lesson": {
      "explanation": "The mechanical pumping activity of the heart is driven by synchronized electrical depolarization and protected by specialized electrophysiological properties. In ventricular contractile myocytes, the action potential lasts 250 to 300 milliseconds—approximately 30 times longer than in a skeletal muscle fiber. This extended duration confers a remarkably long absolute refractory period, during which the cell is completely inexcitable because voltage-gated sodium channels remain inactivated. Consequently, cardiac muscle cannot undergo wave summation or tetanic contraction; the heart is compelled to relax between beats, guaranteeing a mandatory diastolic phase during which ventricular chambers can refill with blood. The composite electrical currents generated by millions of depolarizing and repolarizing cardiac myocytes conduct through extracellular fluids to the body surface, where they are recorded as the electrocardiogram (ECG or EKG). A standard surface ECG displays three distinct wave deflections and intervening intervals: (1) The P wave represents atrial depolarization spreading from the SA node across atrial myocardium. (2) The P–R interval, measured from the beginning of the P wave to the beginning of the QRS complex (normally 120–200 ms), reflects the time required for electrical impulses to travel from the SA node through the atria, internodal tracts, and AV node into the AV bundle, directly quantifying AV nodal conduction delay. (3) The QRS complex represents rapid ventricular depolarization; because ventricular muscle mass is vastly greater than atrial mass, the QRS complex is much larger than the P wave; atrial repolarization occurs simultaneously during this phase but its electrical signature is completely masked by the massive ventricular vector. (4) The T wave represents ventricular repolarization as myocytes restore their resting membrane potential. (5) The Q–T interval, spanning from the start of the QRS complex to the end of the T wave (normally 360–440 ms), represents the total duration of ventricular electrical systole (depolarization and repolarization). The mechanical cardiac cycle coordinates the repeating pattern of contraction (systole) and relaxation (diastole) of each chamber. In a resting subject beating at 75 bpm, each cardiac cycle lasts roughly 800 ms. Both atria contract simultaneously during atrial systole (~100 ms), topping off ventricular filling; approximately 0.1 to 0.2 seconds later, ventricular systole begins (~300 ms), during which ventricles forcefully eject blood into the arterial tree, followed by ventricular diastole (~400 ms). Three quantitative volume parameters define ventricular cardiodynamics: (1) End-diastolic volume (EDV), the total volume of blood in a ventricle at the end of diastole following filling (~130 mL); (2) Stroke volume (SV), the volume of blood ejected during ventricular systole (~70–80 mL); and (3) End-systolic volume (ESV), the residual blood volume remaining in the ventricle at the end of systole (~50 mL). These parameters are governed by the subtraction relationship: EDV - SV = ESV (or SV = EDV - ESV). Under the Frank-Starling Law of the heart, stroke volume increases in direct proportion to end-diastolic volume: increased venous return stretches ventricular myocardial fibers toward their optimal sarcomere length, dramatically increasing actin-myosin overlap and force of contraction to eject the added volume. The cardiac cycle generates two distinct auscultatory heart sounds produced by turbulent blood flow vibrating surrounding tissues as valves snap shut: The first heart sound (S1, 'lubb') marks the onset of ventricular systole and is produced by the closure of the atrioventricular (AV) valves (tricuspid and mitral) during early isovolumetric ventricular contraction. The second heart sound (S2, 'dupp') marks the onset of ventricular diastole and is produced by the closure of the semilunar valves (aortic and pulmonary) during early isovolumetric ventricular relaxation as arterial pressure exceeds falling ventricular pressure.",
      "plain": "Ventricular heart muscle cells have a very long action potential (250–300 ms, 30 times longer than skeletal muscle), creating a long refractory period that makes muscle spasms or tetany impossible—ensuring the heart always relaxes to refill with blood. An ECG records this electrical activity: the P wave is atrial depolarization; the P–R interval measures the delay through the AV node; the QRS complex is ventricular depolarization (which masks atrial repolarization); and the T wave is ventricular repolarization. The mechanical cardiac cycle alternates between systole (contraction) and diastole (relaxation). End-diastolic volume (EDV ~130 mL) minus stroke volume (SV ~70–80 mL ejected) leaves end-systolic volume (ESV ~50 mL). The Frank-Starling Law states that greater venous return stretches the heart muscle, increasing the force of contraction and boosting stroke volume. Heart sounds are valve doors snapping shut: S1 ('lubb') is the AV valves closing at the start of systole; S2 ('dupp') is the semilunar valves closing at the start of diastole.",
      "keyFacts": [
        "Ventricular action potentials last 250–300 ms (30x longer than skeletal muscle), creating a long refractory period that prevents tetany.",
        "An electrocardiogram (ECG) is a body-surface recording of the electrical events of the myocardium.",
        "The P wave represents atrial depolarization.",
        "The P–R interval reflects the conduction time from SA node through atria and the AV node delay.",
        "The QRS complex represents ventricular depolarization; atrial repolarization occurs simultaneously but is masked.",
        "The T wave represents ventricular repolarization.",
        "The cardiac cycle consists of alternating phases of contraction (systole) and relaxation (diastole).",
        "End-diastolic volume (EDV) minus Stroke volume (SV) equals End-systolic volume (ESV): EDV - SV = ESV.",
        "The Frank-Starling Law states that increasing EDV stretches myocardial walls, increasing contractile force and stroke volume.",
        "Heart sound S1 ('lubb') is caused by AV valve closure; heart sound S2 ('dupp') is caused by semilunar valve closure."
      ],
      "prerequisites": [],
      "examples": [
        "In first-degree AV block, delayed conduction through an inflamed or fibrotic AV node prolongs the P–R interval beyond the upper normal limit of 200 milliseconds (>0.20 s), but every P wave is still followed by a QRS complex.",
        "During vigorous exercise, increased skeletal muscle pump activity enhances venous return, raising EDV from 130 mL to 160 mL; by the Frank-Starling mechanism, the stretched myocardium contracts more forcefully, raising stroke volume from 75 mL to 110 mL."
      ]
    },
    "memory": {
      "chunking": "ECG Sequence: P (Atrial Depol) → P-R (AV Delay) → QRS (Ventricular Depol) → T (Ventricular Repol). Sounds: S1 = AV valves snap shut ('lubb'), S2 = Semilunar valves snap shut ('dupp').",
      "comparison": "S1 vs S2: S1 occurs at start of systole (mitral/tricuspid close, ventricular pressure rises); S2 occurs at start of diastole (aortic/pulmonary close, ventricular pressure drops).",
      "visualCue": "Picture a syringe: pull the plunger back to EDV (130 mL), push it down to eject Stroke Volume (80 mL), leaving ESV (50 mL) at the bottom. EDV - SV = ESV.",
      "teachBack": "Draw an ECG trace, label the P wave, QRS complex, T wave, and P-R interval, and state exactly where S1 and S2 occur in relation to these waveforms."
    },
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
    "skills": [
      "Interpret normal ECG tracings and correlate electrical waveforms (P, QRS, T) with mechanical cardiac cycle phases.",
      "Calculate Stroke Volume, Ejection Fraction, and Cardiac Output from quantitative ventricular volumetric data."
    ],
    "selfCheck": "From memory: recite the formula connecting EDV, SV, and ESV; state the electrical meaning of the P wave, QRS complex, and T wave; and identify which valves close to produce S1 and S2.",
    "visuals": [
      {
        "fig": "cardiacCyclePhases"
      },
      {
        "schematic": "ecgCycle"
      },
      {
        "gen": true
      }
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
      }
    ]
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
