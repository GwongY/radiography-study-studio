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
    id: 'hss2011-osteo-axial-appendicular',
    subject: 'HSS2011', unit: 'hss.osteo', type: 'definition',
    title: 'Axial and appendicular skeleton',
    tags: ['osteology', 'high-yield'],
    boneRefs: ['cranium', 'mandible', 'cervical', 'thoracic', 'lumbar', 'sacrum', 'coccyx', 'sternum', 'ribs'],
    lesson: {
      explanation: 'The human adult skeleton is composed of exactly 206 distinct bones organised into two functional and anatomical divisions: the axial skeleton and the appendicular skeleton. The axial skeleton comprises 80 bones arranged along the longitudinal central axis of the human body. Its primary functional role is to create a rigid, protective framework shielding vital visceral organs (the brain within the cranium, the spinal cord inside the vertebral canal, and the thoracic organs—heart and lungs—within the rib cage) while simultaneously providing extensive surface attachments for muscles that adjust the posture of the head, neck, and trunk. Anatomically, the axial division contains four major regional components: the skull (consisting of the cranium and facial bones, including the mandible, along with associated auditory ossicles and the hyoid bone), the vertebral column (26 distinct bones in the adult: 24 individual vertebrae plus the fused sacrum and coccyx), the ribs (12 pairs forming the lateral thoracic cage), and the sternum (manubrium, body, and xiphoid process anteriorly). In contrast, the appendicular skeleton consists of 126 bones that form the upper and lower limbs and the pectoral (shoulder) and pelvic (hip) girdles that anchor those limbs onto the axial core. Functionally, the appendicular division is specialised for movement, locomotion, and manipulation of the external environment. A frequent conceptual pitfall in anatomical examinations is confusing the girdles with the axial skeleton because they lie on or wrap around the trunk. The clavicle, scapula, and hip bones (os coxae) are strictly appendicular structures: their fundamental biological role is to suspend and articulate the upper and lower extremities. Even though the pelvic girdle bears the massive downward weight of the upper body, weight-bearing does not make a bone axial. The division line runs directly through the sacroiliac joint: the vertebral sacrum is axial, whereas the articulating ilium of the hip bone is appendicular.',
      plain: 'The adult skeleton has 206 bones divided into two groups: axial and appendicular. The axial skeleton is the body\'s central column—the skull, vertebral column, ribs, and sternum (80 bones). Its main job is protecting delicate internal organs like the brain, spinal cord, heart, and lungs, and keeping the body upright. The appendicular skeleton consists of the limbs and the girdles that attach them (126 bones): the shoulder girdle and arms, and the pelvic girdle and legs. Remember that the shoulder and pelvic girdles belong to the appendicular skeleton even though they sit on the trunk, because their purpose is to carry the limbs. The sacrum is axial, but the hip bone joined to it is appendicular.',
      keyFacts: [
        'Adult skeleton contains exactly 206 bones divided into axial and appendicular divisions.',
        'Axial skeleton (80 bones): skull (cranium and face), vertebral column (vertebrae, sacrum, coccyx), ribs, and sternum.',
        'Axial function: protects vital organs (brain, spinal cord, heart, lungs) and provides central postural support.',
        'Appendicular skeleton (126 bones): shoulder girdle, upper limbs, pelvic girdle, and lower limbs.',
        'Appendicular function: allows locomotion, weight-bearing mobility, and fine motor manipulation.',
        'Pectoral girdle (clavicle and scapula) is appendicular because it exists solely to articulate the upper limb.',
        'Pelvic girdle (hip bones / ossa coxae) is appendicular even though it supports body weight.',
        'Sacrum belongs to the axial vertebral column, while the ilium articulating with it is appendicular.',
        'The boundary between divisions crosses directly through the sacroiliac joint.',
      ],
      prerequisites: [],
      examples: [
        'During an anatomical survey, a radiographer identifies a fracture of the clavicle. Although the clavicle lies across the superior thoracic wall, it is recorded as an appendicular skeletal injury because the pectoral girdle belongs to the appendicular division.',
      ],
    },
    memory: {
      wordOrigin: 'Axial comes from axis—the central rotating upright pole of the body. Appendicular comes from appendage—the limbs and girdles hung or appended onto that central axis.',
      chunking: 'Axial = the central fortress (skull, spine, ribs, sternum). Appendicular = the mobile arms, legs, and their connecting girdles.',
      comparison: 'Do not classify the clavicle, scapula, or hip bone as axial just because they touch the trunk. A girdle belongs to the limb it carries.',
    },
    practice: [
      { type: 'mcq', prompt: 'Which of the following bones belongs to the appendicular skeleton?', options: ['Sternum', 'Scapula', 'Thoracic vertebrae', 'Ribs'], answer: 1,
        explanation: 'The scapula is part of the shoulder girdle, which belongs to the appendicular skeleton. The sternum, thoracic vertebrae, and ribs are all components of the central axial skeleton.' },
      { type: 'typed', prompt: 'How many bones are found in the adult human skeleton?', accept: ['206'],
        explanation: 'The adult human skeleton contains 206 bones (80 axial and 126 appendicular).' },
      { type: 'matching', prompt: 'Classify each skeletal structure into its correct division.',
        pairs: [['Skull', 'Axial'], ['Ribs', 'Axial'], ['Pelvic girdle', 'Appendicular'], ['Upper limb', 'Appendicular']],
        explanation: 'The axial skeleton comprises the skull, vertebrae, ribs, and sternum. The appendicular skeleton comprises the upper limbs, lower limbs, pectoral girdle, and pelvic girdle.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A student claims that the hip bone must be part of the axial skeleton because it carries upper body weight and connects directly to the sacrum. How would you correct this reasoning?',
        model: 'Weight transmission is not the anatomical criterion for skeletal classification. The pelvic girdle (hip bone) is classified as appendicular because its fundamental anatomical purpose is to attach the lower limb to the axial skeleton. In contrast, the sacrum is part of the vertebral column and therefore belongs to the axial skeleton.',
        rubric: ['Rejects weight transmission as the classification criterion', 'Identifies the girdle\'s role in anchoring the limb', 'Distinguishes the appendicular hip bone from the axial sacrum'] },
    ],
    commonMistakes: [
      'Classifying the clavicle, scapula, or hip bone as axial because they sit on the trunk rather than the limbs.',
      'Forgetting that the sacrum is axial while the articulating hip bone is appendicular.',
      'Confusing the total bone count (206) with regional counts (80 axial, 126 appendicular).',
    ],
    skills: [
      'Classification is determined by functional anchoring, not anatomical location on the trunk or weight-bearing capacity. Girdles exist to attach limbs, making them appendicular.',
      'The division line runs right through the sacroiliac joint: the sacrum is axial (vertebral column), while the ilium is appendicular (pelvic girdle).',
    ],
    selfCheck: 'State from memory: the total adult bone count (206), the four axial components (skull, vertebrae, ribs, sternum), the four appendicular components (shoulder girdle, upper limb, pelvic girdle, lower limb), and why the hip bone is appendicular while the sacrum is axial.',
    visuals: [
      { model: { layer: 'skeleton', meshes: ['Frontal bone', 'Parietal bone', 'Occipital bone', 'Temporal bone', 'Sphenoid bone', 'Ethmoid bone', 'Maxilla', 'Zygomatic bone', 'Nasal bone', 'Lacrimal bone', 'Palatine bone', 'Vomer', 'Mandible', 'Atlas (C1)', 'Axis (C2)', '~vertebra c', '~vertebra t', '~vertebra l', 'Sacrum', 'Coccyx', 'Manubrium of sternum', 'Body of sternum', 'Xiphoid process', 'First rib', 'Second rib', 'Third rib', 'Fourth rib', 'Fifth rib', 'Sixth rib', 'Seventh rib', 'Eighth rib', 'Ninth rib', 'Tenth rib', 'Eleventh rib', 'Twelfth rib'], label: 'Axial skeleton', caption: 'The 80 bones of the axial skeleton form the central protective column (skull, vertebral column, ribs, and sternum); everything else (girdles and limbs) belongs to the appendicular skeleton.' } },
      { gen: true },
    ],
    sourceRefs: [
      { ref: 'hss.4.1', location: 'p5 "206 in adult skeleton"' },
      { ref: 'hss.4.1', location: 'p5 "skull, vertebrae, ribs, sternum"' },
      { ref: 'hss.4.1', location: 'p5 "shoulder girdle, UL, pelvic girdle and LL"' },
      { ref: 'hss.msk.2026', location: 'p3 "Bones for movement (206)"' },
      { ref: 'hss.msk.2026', location: 'p4 "Main Functions of our skeleton"' },
      { ref: 'hss.msk.2026', location: 'p4 "Strong and tough for support and protection"' },
      { ref: 'hss.msk.2026', location: 'p4 "Light enough for movement"' },
      { ref: 'hss.m0.1718', location: 'L1 p13–14 Axial and Appendicular Skeleton' },
      { ref: 'hss.vocab', location: 'Glossary: Axial Skeleton; Appendicular Skeleton' },
    ],
  },
  {
    id: 'hss2011-osteo-bone-shapes',
    subject: 'HSS2011', unit: 'hss.osteo', type: 'definition',
    title: 'Classification of bones by shape',
    tags: ['osteology', 'high-yield'],
    lesson: {
      explanation: 'Bones throughout the human skeleton exhibit diverse structural morphologies that reflect their distinct biomechanical duties. In human anatomy, bones are classified into four primary shape categories based on gross architecture—long, short, flat, and irregular—supplemented by two specialised functional categories: pneumatic bones and sesamoid bones. Long bones are characteristically elongated and tubular, possessing a central shaft (diaphysis) and two expanded articular ends (epiphyses). Located predominantly in the appendicular skeleton of the limbs (e.g. humerus, radius, ulna, femur, tibia, fibula, metacarpals, metatarsals, and phalanges), long bones serve primarily as rigid biomechanical levers operated by skeletal muscles to produce movement. Short bones are roughly cubical or box-like in shape, where width and length are approximately equal; they consist of an internal core of cancellous (spongy) bone surrounded by a thin outer shell of compact bone. Examples include the carpal bones of the wrist and the tarsal bones of the ankle, where their tight cluster provides structural support, shock dampening, and stability with little or no individual movement. Flat bones resemble sandwiches in cross-section: they consist of two parallel plates of dense compact bone sandwiching a central layer of cancellous (spongy) bone and bone marrow (termed diploë in cranial flat bones). Examples include cranial vault bones (parietal, frontal, occipital), the sternum, ribs, and scapula; their broad, flat surfaces provide extensive surface area for muscular attachment and form protective shields over underlying soft tissues and vital viscera. Irregular bones have complex, mixed, or notched shapes with multiple projecting processes and articular facets that cannot be neatly assigned to the other categories; structurally composed of cancellous bone and marrow encased within a thin compact shell, irregular bones include the vertebrae, the hip bones (ossa coxae), and certain skull bones such as the sphenoid and ethmoid. Beyond these four standard shapes, pneumatic bones are specialised skull bones (such as the frontal, sphenoid, ethmoid, and maxilla) in which interior cancellous bone tissue has been absorbed and replaced by air-filled mucosal cavities known as paranasal air sinuses, which lighten the skull. Finally, sesamoid bones are small, rounded nodules (resembling sesame seeds) that develop entirely within tendons where high mechanical stress, friction, and compression occur across joints. The patella (kneecap) within the quadriceps femoris tendon is the primary human example; sesamoids protect tendons from excessive wear and tear and biomechanically alter the angle and direction of tendon pull, increasing muscle leverage.',
      plain: 'Bones are grouped by their shape, and shape tells you what job the bone performs. Long bones are tubes with a shaft and two wider ends found in the limbs; they act as levers for muscles. Short bones are roughly cube-shaped blocks of spongy bone wrapped in a thin layer of compact bone—the carpal bones in the wrist and tarsal bones in the ankle—designed for support and stability. Flat bones are like sandwiches: two hard layers of compact bone with spongy bone in the middle, protecting soft organs and giving muscles plenty of room to attach (such as the skull vault, ribs, and sternum). Irregular bones have elaborate, mixed shapes with spiky processes, like vertebrae and hip bones. Two special groups complete the set: pneumatic bones contain air-filled sinuses to lighten the head (like the frontal and sphenoid bones), and sesamoid bones develop inside tendons to redirect pull and reduce friction, with the patella being the classic example.',
      keyFacts: [
        'Four primary shape classes: long, short, flat, and irregular; plus two specialised classes: pneumatic and sesamoid.',
        'Long bones: tubular shaft (diaphysis) and two expanded ends (epiphyses); act as levers for muscles in the limbs.',
        'Short bones: cubical, cancellous core inside a thin compact shell; provide stability and support (carpus and tarsus).',
        'Flat bones: sandwich-like architecture of two compact bone plates enclosing spongy bone; protect organs and anchor muscles.',
        'Irregular bones: complex mixed architecture with processes; vertebrae, hip bones, and sphenoid.',
        'Pneumatic bones: cancellous tissue absorbed leaving an air sinus; frontal and sphenoidal sinuses lighten the skull.',
        'Sesamoid bones: nodules developing inside tendons that alter the direction of tendon pull; the patella is the primary example.',
        'A vertebra is irregular, not short: its chunky body and projecting arches/processes form an irregular shape.',
      ],
      prerequisites: ['hss2011-osteo-axial-appendicular'],
      examples: [
        'On an AP knee radiograph, the patella is identified as a sesamoid bone embedded within the quadriceps tendon, where it holds the tendon away from the femur to increase the lever arm of knee extension.',
      ],
    },
    memory: {
      firstLetter: 'Remember the four primary shapes with LF-SI: Long, Flat, Short, Irregular. Then add the two functional modifiers: Pneumatic (air-filled) and Sesamoid (seed-like in tendon).',
      visualCue: 'Picture a bone sandwich for flat bones (two crusts of compact bone, spongy filling), a cube for short bones (dice in the wrist), and a sesame seed inside a rope for sesamoids (patella in tendon).',
      comparison: 'A vertebra looks blocky, which tricks many students into guessing short bone. Short bones are specifically cubical (carpal/tarsal); any bone with projecting arches, facets, and spines is irregular.',
    },
    practice: [
      { type: 'mcq', prompt: 'A thoracic vertebra is an example of what type of bone?', options: ['Long', 'Flat', 'Irregular', 'Short'], answer: 2,
        explanation: 'Model answer C. Vertebrae are classified as irregular bones because of their complex mixed morphology with bodies, pedicles, laminae, and projecting processes. Short bones are restricted to cubical bones like the carpus and tarsus.',
        src: { ref: 'hss.revans', location: 'p1 "2. C"' } },
      { type: 'matching', prompt: 'Match each bone shape category to its textbook example.',
        pairs: [['Short bone', 'Carpus and tarsus'], ['Sesamoid bone', 'Patella'], ['Pneumatic bone', 'Frontal sinus'], ['Irregular bone', 'Vertebrae']],
        explanation: 'Short bones are cubical carpal and tarsal bones; sesamoids develop inside tendons (patella); pneumatic bones contain air sinuses (frontal); irregular bones have mixed forms (vertebrae).' },
      { type: 'typed', prompt: 'What specific category describes a bone nodule that develops inside a tendon to alter the direction of pull?', accept: ['sesamoid', 'sesamoid bone'],
        explanation: 'Sesamoid bones develop inside tendons subjected to friction and tension; the patella is the largest human sesamoid.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A cross-sectional specimen of an unknown bone shows an interior filled with cancellous bone surrounded by a thin compact shell, with an overall cubical geometry. Which bone shape category does this represent, and how does it differ from an irregular bone?',
        model: 'This represents a short bone. While both short and irregular bones possess a cancellous interior surrounded by a thin layer of compact bone, short bones are distinctly cubical in geometric shape (like carpals and tarsals). Irregular bones have complex, mixed shapes with projecting spines or processes (like vertebrae) rather than equal cubic dimensions.',
        rubric: ['Identifies the bone as a short bone', 'Notes the shared internal architecture (cancellous core with thin compact cortex)', 'Uses cubical geometry versus complex projecting processes as the discriminator'] },
    ],
    commonMistakes: [
      'Calling a vertebra a short bone because the vertebral body looks blocky—vertebrae are irregular bones because of their complex arch and process anatomy.',
      'Forgetting pneumatic and sesamoid bones, which the course syllabus explicitly tests alongside the four primary shapes.',
      'Believing flat bones contain a hollow medullary cavity; flat bones have two plates of compact bone enclosing spongy diploë without a medullary canal.',
    ],
    skills: [
      'Shape reveals mechanical function: long bones are levers for motion; short bones are clustered shock absorbers; flat bones are protective shields and muscle sheets; irregular bones provide multi-axial joint articulations and canal protection.',
      'Differentiate pneumatic and sesamoid bones by etiology: pneumatic bones lose internal bone matrix to form an air sinus; sesamoid bones gain bone matrix inside a tendon in response to mechanical strain.',
    ],
    selfCheck: 'From memory, write down the four main shape classes with one example each, the definitions and examples of pneumatic and sesamoid bones, and explain why a lumbar vertebra is irregular rather than short.',
    visuals: [
      { model: { layer: 'skeleton', meshes: ['Femur', 'Capitate bone', 'Parietal bone', 'Vertebra L3', 'Patella'], label: 'One bone of each shape', caption: 'The five representative shapes: femur (long bone lever), capitate (short cubical bone), parietal bone (flat protective sandwich), L3 vertebra (irregular mixed shape), and patella (sesamoid bone inside a tendon).' } },
      { fig: 'compactBone' },
      { gen: true },
    ],
    sourceRefs: [
      { ref: 'hss.4.1', location: 'p10 "Shape of bones"' },
      { ref: 'hss.4.1', location: 'p11 "limbs and serves as levers for muscles"' },
      { ref: 'hss.4.1', location: 'p11 "and 2 expanded ends"' },
      { ref: 'hss.4.1', location: 'p18 "cubical"' },
      { ref: 'hss.4.1', location: 'p18 "carpus and tarsus"' },
      { ref: 'hss.4.1', location: 'p18 "surrounded by a thin layer of compact bone"' },
      { ref: 'hss.4.1', location: 'p19 "like sandwiches"' },
      { ref: 'hss.4.1', location: 'p19 "compact bone,"' },
      { ref: 'hss.4.1', location: 'p19 "separated by a layer of cancellous bone"' },
      { ref: 'hss.4.1', location: 'p20 "some skull bones, vertebrae and hip bones"' },
      { ref: 'hss.4.1', location: 'p21 "air sinus are present"' },
      { ref: 'hss.4.1', location: 'p21 "frontal sinus"' },
      { ref: 'hss.4.1', location: 'p21 "sphenoidal sinus"' },
      { ref: 'hss.4.1', location: 'p22 "nodules of bone that"' },
      { ref: 'hss.4.1', location: 'p22 "develop in certain tendons"' },
      { ref: 'hss.4.1', location: 'p22 "pull of a tendon"' },
      { ref: 'hss.4.1', location: 'p22 "e.g. patella"' },
      { ref: 'hss.msk.2026', location: 'p9 "provide support and stability with little or no movements"' },
      { ref: 'hss.msk.2026', location: 'p9 "Flat bones—with flat surface to facilitate muscular attachment or provide protection to underlying soft tissue"' },
      { ref: 'hss.msk.2026', location: 'p9 "Irregular bones—irregular or mixed shape; cannot be categorized into a particular type"' },
      { ref: 'hss.msk.2026', location: 'p9 "Sesamoid bones—small, somewhat like sesame seed; develop inside tendons"' },
      { ref: 'hss.revans', location: 'p1 "2. C"' },
    ],
  },
  {
    id: 'hss2011-osteo-long-bone-structure',
    subject: 'HSS2011', unit: 'hss.osteo', type: 'definition',
    title: 'Structure of a long bone',
    tags: ['osteology', 'high-yield'],
    lesson: {
      explanation: 'The macroscopic and microscopic architecture of a long bone demonstrates a remarkable engineering compromise between rigidity, tensile strength, and lightness. Macroscopically, a long bone is organized into three distinct longitudinal anatomical regions from centre to periphery: the diaphysis, the metaphysis, and the epiphysis. The diaphysis is the elongated, tubular central shaft; its thick walls are composed of dense compact bone that encloses a central hollow chamber termed the medullary cavity, which contains bone marrow (yellow marrow in adult shafts, red marrow in juveniles). At each end of the diaphysis lies the metaphysis—the flared, transitional zone representing the recently developed end of the bone immediately adjacent to the epiphyseal cartilage (the cartilaginous growth plate or physis where longitudinal bone elongation takes place during childhood and adolescence, ossifying into the epiphyseal line in adults). Beyond each metaphysis lies the epiphysis, representing the expanded terminal end of the bone. In cross-section, the epiphysis is formed predominantly by spongy (cancellous) bone whose open pores contain red bone marrow, all encapsulated beneath a thin outer cortex of compact bone. Articular joint surfaces of each epiphysis are capped by smooth hyaline articular cartilage that lacks a perichondrium and provides a frictionless, shock-absorbing gliding interface. Covering the external surface of the bone shaft is the periosteum, a specialized connective tissue membrane that wraps around the entire bone except at articular sites. The periosteum is structurally bilayered: its outer fibrous layer consists of dense irregular connective tissue anchored to the underlying bone by perforating collagen Sharpey\'s fibres, while its inner layer is osteogenic, containing osteoprogenitor stem cells capable of differentiating into bone-forming osteoblasts for appositional bone thickening and fracture repair. The periosteum is richly furnished with sensory nerves and branching capillary networks that nourish the superficial bone cortex. Deep bone tissue and the marrow cavity are supplied by large nutrient arteries that penetrate the shaft obliquely through a specialized cortical aperture called the nutrient foramen. At the microscopic tissue level, bone exists in two distinct architectural forms: compact bone and cancellous (spongy) bone. Compact bone is a dense, solid mass of closely packed and well-aligned cylindrical functional units (osteons or Haversian systems) that forms the hard outer surface layer of all bones, creating a resilient shell that resists bending, torsion, and compression and supports the full weight of the body. Cancellous bone forms the lightweight inner core; it is composed of an intricate, web-like lattice of branching bony struts and plates called trabeculae. Trabeculae do not develop randomly; they align precisely along the lines of mechanical stress, distributing applied loads and absorbing physical shock while eliminating internal mass to keep the skeleton light enough for rapid locomotion.',
      plain: 'A long bone is built from three main regions in order: diaphysis (the long tubular shaft in the middle), metaphysis (the growing neck next to the epiphyseal growth plate), and epiphysis (the rounded end of the bone). The hollow centre of the shaft is the medullary cavity, filled with bone marrow. The outer surface of the bone is wrapped in the periosteum—a tough fibrous sheet whose inner cellular layer can create new bone cells (osteoblasts) and is packed with blood vessels and pain-sensing nerves. Bone tissue itself comes in two types: compact bone, which is dense and rock-solid to form the tough outer shell that resists bending; and spongy (cancellous) bone, which forms a light internal honeycomb of tiny struts called trabeculae. These trabeculae line up along the lines of mechanical stress to give maximum strength with minimum weight.',
      keyFacts: [
        'Three longitudinal regions from centre outward: diaphysis (central shaft), metaphysis (transitional neck), epiphysis (bone end).',
        'Metaphysis is the recently developed end adjacent to the epiphyseal cartilage (growth plate).',
        'Diaphysis contains a central medullary cavity filled with bone marrow.',
        'Periosteum covers the outer surface of the shaft (except articular sites); its inner layer is osteogenic (forms osteoblasts).',
        'Periosteum is richly furnished with capillaries and sensory nerves (making periosteal tears exquisitely painful).',
        'Nutrient arteries enter the shaft through the nutrient foramen to nourish internal cortex and marrow.',
        'Compact bone is a dense, solid mass forming the outer shell of all bones; resists bending and twisting.',
        'Cancellous (spongy) bone forms the inner core and epiphyses; composed of web-like trabeculae.',
        'Trabeculae align precisely along lines of mechanical stress to provide high strength with minimal weight.',
        'Joint ends of epiphyses are capped by smooth articular cartilage rather than periosteum.',
      ],
      prerequisites: ['hss2011-osteo-bone-shapes'],
      examples: [
        'In pediatric radiography, an injury across the metaphysis and epiphyseal cartilage (Salter-Harris fracture) requires careful evaluation because the cartilaginous growth plate at the metaphysis drives longitudinal limb growth.',
      ],
    },
    memory: {
      wordOrigin: 'Dia- means through or across (diaphysis = growing through the middle); Meta- means after or transitional (metaphysis = between growth plate and shaft); Epi- means upon or above (epiphysis = upon the end).',
      sequence: 'From the center outward: Diaphysis (D) -> Metaphysis (M) -> Epiphysis (E). Alphabetical order (D, M) ending at the Extremity (E).',
      comparison: 'Compact bone = dense outer armor plate. Cancellous bone = lightweight internal bridge trusses (trabeculae) engineered along stress vectors.',
    },
    practice: [
      { type: 'mcq', prompt: 'The connective tissue covering the outer surface of a bone shaft is the _______.', options: ['Matrix', 'Osteon', 'Periosteum', 'Endosteum'], answer: 2,
        explanation: 'Model answer C. The periosteum covers the outer surface of the bone shaft; the endosteum lines internal marrow and trabecular surfaces.',
        src: { ref: 'hss.revans', location: 'p1 "1. C"' } },
      { type: 'sequence', prompt: 'Order the anatomical regions of a long bone from the center of the shaft outward to the joint surface.', items: ['Diaphysis', 'Metaphysis', 'Epiphysis'],
        explanation: 'The diaphysis is the central region/shaft, the metaphysis is the transitional neck adjacent to epiphyseal cartilage, and the epiphysis is the terminal bone end.' },
      { type: 'cloze', prompt: 'There are two types of bone. ______ bone covers bone surfaces; ______ bone is located internally and gives strength with minimum weight, and its ______ develop along the bone\'s lines of stress.', accept: ['compact; spongy; trabeculae', 'compact spongy trabeculae', 'compact, cancellous, trabeculae', 'compact; cancellous; trabeculae'],
        explanation: 'Model answers: compact bone on surfaces, spongy/cancellous bone internally, and trabeculae aligned along lines of stress.',
        src: { ref: 'hss.revans', location: 'p3 "1. Compact"' } },
      { type: 'typed', prompt: 'Large nutrient arteries enter the shaft of a long bone through which opening?', accept: ['nutrient foramen'],
        explanation: 'The nutrient foramen is the oblique canal in the shaft transmitting nutrient vessels to the medullary cavity and inner cortex.' },
    ],
    application: [
      { type: 'scenario', prompt: 'During orthopedic surgery, an assistant suggests stripping the periosteum completely off a fractured femoral diaphysis to achieve clean visual access. Explain why this would impair bone healing.',
        model: 'The periosteum is not an inert covering. Its inner layer is osteogenic, containing osteoprogenitor cells that differentiate into osteoblasts to lay down new bone callus during repair. Furthermore, the periosteum is richly furnished with capillaries that provide critical cortical blood supply. Stripping it strips away both the blood supply and the osteogenic cells needed for union.',
        rubric: ['Identifies the inner layer as osteogenic (producing osteoblasts)', 'Mentions the capillary blood supply carried by the periosteum', 'Connects both factors directly to impaired fracture healing and callus formation'] },
    ],
    commonMistakes: [
      'Confusing periosteum (covering the outer cortical surface) with endosteum (lining the internal medullary cavity).',
      'Describing trabeculae as random spongy filler—the syllabus emphasizes that trabeculae develop specifically along lines of mechanical stress.',
      'Assuming the epiphysis is covered entirely by periosteum; the articular contact zone is covered by articular cartilage instead.',
    ],
    skills: [
      'Distinguish outer from inner linings: peri- means around (outer cortex, vascular and osteogenic); endo- means within (lining marrow cavity and trabecular surfaces).',
      'Remember that trabecular architecture is dynamic and functional: trabeculae remodel along lines of tension and compression to deliver maximum structural strength with minimal skeletal mass.',
    ],
    selfCheck: 'From a blank page, draw and label: diaphysis, metaphysis, epiphysis, medullary cavity, compact bone cortex, cancellous trabeculae, articular cartilage, periosteum, and the nutrient foramen.',
    visuals: [
      { fig: 'longBone' },
      { schematic: 'longBone' },
      { gen: true },
    ],
    sourceRefs: [
      { ref: 'hss.4.1', location: 'p7 "nourished through small blood vessels in the periosteum"' },
      { ref: 'hss.4.1', location: 'p7 "enter the shaft of long bones through"' },
      { ref: 'hss.4.1', location: 'p7 "the nutrient foramen"' },
      { ref: 'hss.4.1', location: 'p12 "diaphysis"' },
      { ref: 'hss.4.1', location: 'p12 "metaphysis"' },
      { ref: 'hss.4.1', location: 'p12 "recently developed end"' },
      { ref: 'hss.4.1', location: 'p12 "adjacent to epiphyseal"' },
      { ref: 'hss.4.1', location: 'p12 "epiphysis"' },
      { ref: 'hss.4.1', location: 'p13 "covers the outer"' },
      { ref: 'hss.4.1', location: 'p13 "surface of shaft"' },
      { ref: 'hss.4.1', location: 'p13 "osteogenic, capable of differentiating into osteoblasts"' },
      { ref: 'hss.4.1', location: 'p13 "with capillaries and"' },
      { ref: 'hss.4.1', location: 'p14 "dense, solid mass,"' },
      { ref: 'hss.4.1', location: 'p14 "forms the outer surface layer of all bones"' },
      { ref: 'hss.4.1', location: 'p14 "spongy, larger cavities"' },
      { ref: 'hss.4.1', location: 'p14 "trabeculae (supporting"' },
      { ref: 'hss.4.1', location: 'p16 "medullary cavity"' },
      { ref: 'hss.4.1', location: 'p16 "containing bone marrow"' },
      { ref: 'hss.4.1', location: 'p17 "formed by spongy"' },
      { ref: 'hss.4.1', location: 'p17 "bone, covered with a thin layer of compact bone"' },
      { ref: 'hss.msk.2026', location: 'p6 "dense, solid mass (closely packed & well aligned bone cells) forms the outer surface layer"' },
      { ref: 'hss.msk.2026', location: 'p8 "a fibrous tissue surrounding the outer surface of the bone (except the articular sites)"' },
      { ref: 'hss.revans', location: 'p3 "1. Compact"' },
      { ref: 'hss.revans', location: 'p3 "2. Spongy/ cancellous"' },
      { ref: 'hss.revans', location: 'p3 "3. Trabeculae"' },
    ],
  },
  {
    id: 'hss2011-osteo-bone-functions',
    subject: 'HSS2011', unit: 'hss.osteo', type: 'explain',
    title: 'Functions of bone',
    tags: ['osteology'],
    lesson: {
      explanation: 'The skeletal system performs five vital physiological and biomechanical functions that are foundational to human life: supporting framework, mechanical levers for movement, protection of visceral organs, hematopoiesis (blood cell production), and mineral and lipid homeostasis (storehouse). First, as a supporting framework, bone provides the rigid structural scaffold that maintains body contour, anchors all soft tissues and skeletal muscles, and supports the full weight of the upright body against gravity. Second, bones serve as rigid levers for muscles. Muscles generate contraction forces, but without rigid skeletal levers spanning movable synovial joints, muscular tension could not produce purposeful movement or maintain stable postures such as sitting, standing, walking, or running. Third, bones provide mechanical protection for vulnerable visceral organs: the rigid calvaria of the cranium encloses and shields the brain; the vertebral canal surrounds the spinal cord; the bony thoracic cage formed by ribs and sternum encases the heart and lungs; and the pelvic cavity shelters the bladder, lower digestive tract, and internal reproductive organs. Fourth, bone houses red bone marrow, which carries out hematopoiesis. Red bone marrow contains hematopoietic stem cells that differentiate into red blood cells (erythrocytes, transporting oxygen), white blood cells (leukocytes, immune defense), and platelets (thrombocytes, blood clotting). In young children under age 5, hematopoiesis occurs in the marrow cavities of all bones; in adults, active red marrow persists predominantly within the cancellous bone of the central axial skeleton (skull, vertebrae, sternum, ribs, hip bones) and the proximal epiphyses of the humerus and femur. Fifth, bone acts as a dynamic mineral storehouse, sequestering approximately 99% of the body\'s calcium and phosphate reserves. Bone matrix is a composite material: roughly two-thirds consists of mineralized calcium hydroxyapatite (mainly calcium phosphate), which gives bone its hardness and compressive strength, while one-third consists of organic collagen fibers and ground substance, imparting tensile strength and flexibility. Furthermore, the medullary cavities of adult long bones contain yellow bone marrow, composed primarily of adipose tissue that serves as an energy-rich triglyceride lipid reserve, containing mesenchymal stem cells that can differentiate into cartilage, bone, or fat when required. By pairing dense compact bone that resists bending and twisting with lightweight cancellous bone that dampens physical shock and cuts down skeleton weight, bone achieves optimal mechanical performance for locomotion.',
      plain: 'The skeleton does five essential jobs: three mechanical and two biological. The three mechanical jobs are: providing a structural framework to hold the body up; acting as levers that muscles pull on to create movement; and protecting delicate internal organs (the skull shields the brain, the spine protects the spinal cord, and the ribs guard the heart and lungs). The two biological jobs are: producing blood cells inside red bone marrow (hematopoiesis for red cells, white cells, and platelets); and serving as a mineral storehouse for calcium and phosphates, plus storing fat reserves in yellow bone marrow. Bone combines hard calcium hydroxyapatite with flexible collagen fibers, making it strong enough to support full body weight yet light enough to move freely.',
      keyFacts: [
        'Five major functions: support framework, levers for movement, visceral protection, hematopoiesis, and mineral/lipid storage.',
        'Supporting framework: maintains body shape and supports the full weight of the upright body against gravity.',
        'Levers for muscles: rigid bones transmit muscle contraction forces across joints to produce motion.',
        'Visceral protection: cranium shields brain, vertebral canal protects spinal cord, rib cage protects heart and lungs.',
        'Hematopoiesis: red bone marrow contains stem cells producing red blood cells, white blood cells, and platelets.',
        'In adults, red marrow persists mainly in the axial skeleton (vertebrae, ribs, sternum, skull, pelvis) and proximal limb ends.',
        'Mineral storehouse: 2/3 of matrix is calcium hydroxyapatite (compressive hardness); 1/3 is collagen fibers (flexibility and tensile strength).',
        'Lipid storage: yellow bone marrow in adult medullary cavities stores adipose tissue and mesenchymal stem cells.',
        'Compact bone resists bending and twisting; spongy bone absorbs shock and cuts down skeleton weight for movement.',
      ],
      prerequisites: ['hss2011-osteo-bone-shapes'],
      examples: [
        'In clinical osteomalacia or severe hyperparathyroidism, the body leaches calcium phosphate from the skeletal storehouse to maintain serum calcium, causing the bone levers to soften and deform under normal body weight.',
      ],
    },
    memory: {
      firstLetter: 'Remember the five functions with SPLMS: Support, Protection, Levers, Marrow (blood production), Storage (minerals and lipids).',
      chunking: 'Split into 3 mechanical functions (Support the body, Lever the muscles, Protect the organs) and 2 biochemical functions (Marrow for blood, Mineral/lipid storehouse).',
      comparison: 'Students often list only the mechanical functions and forget the two physiological ones: bone marrow hematopoiesis and calcium/phosphate storage.',
    },
    practice: [
      { type: 'typed', prompt: 'Name the two non-mechanical, physiological functions of bone described in the lecture.', accept: ['bone marrow and calcium storage', 'marrow and mineral storage', 'hematopoiesis and mineral storage', 'red blood cell production and calcium storage', 'marrow and storehouse'],
        explanation: 'The two non-mechanical functions are bone marrow hematopoiesis (producing red blood cells, white blood cells, and platelets) and serving as a storehouse for calcium and phosphates.' },
      { type: 'explain', prompt: 'Why does bone matrix need both calcium hydroxyapatite and collagen fibers?',
        model: 'Calcium hydroxyapatite (2/3 of matrix) is hard but brittle, providing resistance against compressive loads. Collagen fibers (1/3 of matrix) are tough and flexible, providing tensile strength that resists twisting and bending forces. Together, they prevent bone from being either too brittle or too pliable.',
        rubric: ['Identifies calcium hydroxyapatite as providing hardness/compression resistance', 'Identifies collagen fibers as providing flexibility/tensile strength', 'Explains how the composite prevents brittle failure and excessive bending'] },
      { type: 'mcq', prompt: 'Which visceral organs are directly protected by the bony thoracic cage?', options: ['Brain and spinal cord', 'Heart and lungs', 'Liver and bladder only', 'Kidneys and intestines only'], answer: 1,
        explanation: 'The thoracic cage (ribs, sternum, and thoracic vertebrae) primarily encloses and shields the heart and lungs.' },
    ],
    application: [
      { type: 'scenario', prompt: 'An elderly patient with osteoporosis experiences a femoral neck fracture from a minor stumble. Using the functions and architecture of bone, explain how loss of mineral matrix compromises both mechanical support and leverage.',
        model: 'Bone matrix normally provides a rigid supporting framework and acts as a mechanical lever for muscles. Two-thirds of the matrix is calcium hydroxyapatite, which enables bone to support full body weight and resist bending and twisting. In osteoporosis, demineralization and loss of trabeculae weaken the bone\'s compressive and shear resistance, preventing it from bearing body weight or acting as a rigid lever during movement, leading to fracture under minimal force.',
        rubric: ['Mentions the role of bone as a supporting framework and lever', 'Identifies calcium hydroxyapatite and trabecular architecture as providing strength', 'Explains that loss of mineral matrix causes mechanical failure under normal loads'] },
    ],
    commonMistakes: [
      'Listing only mechanical functions (support, leverage, protection) while forgetting hematopoiesis and mineral storage.',
      'Assuming all adult marrow is red marrow; adult long bone shafts contain yellow adipose marrow while red marrow is confined to cancellous bone of the central skeleton.',
      'Thinking bone is an inert rock rather than a metabolically active organ constantly exchanging calcium with the bloodstream.',
    ],
    skills: [
      'Bone balances two engineering requirements: high strength to support body weight and resist bending, combined with minimal weight to enable efficient muscle-driven locomotion.',
      'Two physiological systems depend directly on bone: the cardiovascular/immune system (hematopoiesis in red marrow) and the endocrine system (calcium homeostasis maintained by osteoclasts and osteoblasts).',
    ],
    selfCheck: 'Recite from memory: all five bone functions, the composition of bone matrix (2/3 calcium hydroxyapatite, 1/3 collagen), the difference between red and yellow bone marrow, and three distinct visceral cavities that protect internal organs.',
    visuals: [
      { fig: 'boneMarrow' },
      { schematic: 'boneFunctions' },
      { gen: true },
    ],
    sourceRefs: [
      { ref: 'hss.4.1', location: 'p6 "supporting framework"' },
      { ref: 'hss.4.1', location: 'p6 "levers for muscles"' },
      { ref: 'hss.4.1', location: 'p6 "brain, spinal cord, heart"' },
      { ref: 'hss.4.1', location: 'p6 "lungs, liver and bladder etc."' },
      { ref: 'hss.4.1', location: 'p6 "bone marrow => red blood cells"' },
      { ref: 'hss.4.1', location: 'p6 "storehouse => calcium and phosphates"' },
      { ref: 'hss.msk.2026', location: 'p4 "Main Functions of our skeleton"' },
      { ref: 'hss.msk.2026', location: 'p4 "Strong and tough for support and protection"' },
      { ref: 'hss.msk.2026', location: 'p4 "Light enough for movement"' },
      { ref: 'hss.msk.2026', location: 'p5 "2/3: Calcium hydroxyapatite"' },
      { ref: 'hss.msk.2026', location: 'p5 "1/3: Collagen fibers (tough &"' },
      { ref: 'hss.msk.2026', location: 'p6 "Form a hard, heavy shell that"' },
      { ref: 'hss.msk.2026', location: 'p6 "resists bending and twisting"' },
      { ref: 'hss.msk.2026', location: 'p6 "Supports the full weight of"' },
      { ref: 'hss.msk.2026', location: 'p6 "Protect delicate internal"' },
      { ref: 'hss.msk.2026', location: 'p6 "Cut down bone weight for movement"' },
      { ref: 'hss.msk.2026', location: 'p6 "Absorb shock dampens sudden physical forces"' },
      { ref: 'hss.msk.2026', location: 'p7 "contains hematopoietic stem cells that can differentiate into RBC, WBC, and platelets"' },
      { ref: 'hss.msk.2026', location: 'p7 "contains adipose (fat) tissues and mesenchymal stem cells"' },
      { ref: 'hss.manual1920', location: 'Module 4 introduction, p.41' },
    ],
  },
  {
    id: 'hss2011-osteo-vertebra-parts',
    subject: 'HSS2011', unit: 'hss.osteo', type: 'diagram',
    title: 'General structure of a vertebra',
    tags: ['osteology', 'high-yield'], boneRefs: ['cervical', 'thoracic', 'lumbar'],
    lesson: {
      explanation: 'Every typical vertebra shares the same parts. The vertebral body sits anteriorly and is the primary weight-bearing component of the spine. Behind it the vertebral arch, built from the pedicles and the laminae, encloses the vertebral foramen — a hole that forms the vertebral canal for the passage of the spinal cord. Projecting from the arch are the spinous process posteriorly, the transverse processes laterally, and the superior and inferior articular processes.',
      keyFacts: [
        'Vertebral body — anterior, primary weight-bearing component.',
        'Vertebral foramen — forms the vertebral canal for the spinal cord.',
        'Vertebral arch = pedicle + lamina.',
        'Spinous process — posterior projection.',
        'Transverse process — lateral projection.',
        'Superior and inferior articular processes form the facet joints.',
      ],
      prerequisites: ['hss2011-osteo-axial-appendicular'],
      examples: [],
    },
    memory: {
      location: 'Walk the ring: body in front, pedicle out from the body, lamina closing the back, spinous process sticking out where you can feel it through the skin.',
      chunking: 'Pedicle then lamina, front to back. Pedicle is the stalk, lamina is the plate — a stalk always comes before the plate it carries.',
      comparison: 'Vertebral foramen is the hole for the spinal cord; the intervertebral foramen between two vertebrae is where a spinal nerve exits. Different hole, different traffic.',
    },
    practice: [
      { type: 'matching', prompt: 'Match each part of a vertebra to what it is.',
        pairs: [['Vertebral body', 'The weight-bearing block at the front'], ['Vertebral foramen', 'The opening the spinal cord passes through'], ['Pedicle', 'The short bridge running back from the body'], ['Lamina', 'The flat plate closing the arch behind'], ['Transverse process', 'The side projection, one on each side'], ['Spinous process', 'The single backward projection you can feel through the skin']],
        explanation: 'The body is anterior and bears weight; the arch behind it encloses the foramen the cord runs in, pedicle then lamina front to back. These are the parts the Module 4 labelling answers name: B1 vertebral foramen, B2 pedicle, B3 transverse process, B4 spinous process, B5 lamina, B6 superior articular facet.',
        src: { ref: 'hss.revans', location: 'More exercises, Module 4, labels B1–B6' } },
      { type: 'typed', prompt: 'Which part of a vertebra is the primary weight-bearing component?', accept: ['vertebral body', 'body'],
        explanation: 'The vertebral body, described on the slide as serving as the primary weight-bearing component of the spine.' },
      { type: 'mcq', prompt: 'The vertebral foramen exists to allow passage of what?', options: ['The spinal nerve root', 'The vertebral artery', 'The spinal cord', 'The intervertebral disc'], answer: 2,
        explanation: 'The vertebral foramen forms the vertebral canal for the passage of the spinal cord. The vertebral artery runs in the transverse foramina of the cervical vertebrae, which is a different opening.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A cervical vertebra has an extra pair of holes that a lumbar vertebra does not. What are they for?',
        model: 'They are the transverse foramina, and the vertebral arteries pass through them. That is a cervical-only feature; the lumbar transverse processes have no such opening.',
        rubric: ['Names the transverse foramina', 'States the vertebral arteries pass through them', 'Identifies it as cervical-specific'] },
    ],
    commonMistakes: [
      'Swapping pedicle and lamina — the pedicle is the stalk from the body, the lamina is the plate closing the arch behind.',
      'Confusing the vertebral foramen (spinal cord) with the intervertebral foramen (spinal nerve) and the transverse foramen (vertebral artery).',
    ],
    skills: [
      'Three holes, three kinds of traffic: the vertebral foramen carries the spinal cord, an intervertebral foramen lets one spinal nerve out, and the cervical transverse foramina carry the vertebral arteries. Mixing them up is mixing up three different passengers, not three names for one hole.',
      'Pedicle then lamina, front to back, is forced by what each one is: the pedicle is the stalk leaving the body, the lamina is the plate that closes the arch, and the spinous process sits exactly where the two laminae meet — which is why it is the one part you can feel through the skin.',
    ],
    selfCheck: 'From a blank page: the six labelled parts from the More-exercises answers, the weight-bearing component named with its position, and the cervical transverse-foramina scenario answered with the artery named.',
    sourceRefs: [{ ref: 'hss.m0.1718', location: 'L1 p21 "General structures of a vertebra"; L1 p28 cervical vertebrae' }, { ref: 'hss.revans', location: 'More exercises, Module 4, labels B1–B6' }],
  },
  {
    id: 'hss2011-osteo-vertebral-column',
    subject: 'HSS2011', unit: 'hss.osteo', type: 'sequence',
    title: 'Vertebral column — regions and curvatures',
    tags: ['osteology', 'high-yield'], boneRefs: ['cervical', 'thoracic', 'lumbar', 'sacrum', 'coccyx'],
    lesson: {
      explanation: 'The vertebral column runs cervical C1–C7, thoracic T1–T12, lumbar L1–L5, then the sacrum (S1–S5 fused) and the coccyx (Co1–Co4 fused). It carries four curvatures. The primary curvatures — thoracic and pelvic — are concave anteriorly and develop during the embryonic stage. The secondary curvatures — cervical and lumbar — are concave posteriorly and develop after birth.',
      keyFacts: [
        'C1–C7 cervical, T1–T12 thoracic, L1–L5 lumbar.',
        'Sacrum: S1–S5 fused. Coccyx: Co1–Co4 fused.',
        'Primary curvatures (thoracic, pelvic) — concave anteriorly, present from the embryonic stage.',
        'Secondary curvatures (cervical, lumbar) — concave posteriorly, developed after birth.',
      ],
      prerequisites: ['hss2011-osteo-vertebra-parts'],
      examples: [],
    },
    memory: {
      mnemonic: 'Breakfast at 7, lunch at 12, dinner at 5 — cervical 7, thoracic 12, lumbar 5.',
      chunking: 'Primary curves are the ones you were born with and they stay concave anteriorly. Secondary curves arrive with lifting your head and with walking, and they curve the other way.',
      comparison: 'Primary vs secondary is not about importance, it is about timing: embryonic versus after birth.',
    },
    practice: [
      { type: 'sequence', prompt: 'Order the regions of the vertebral column from superior to inferior.', items: ['Cervical (C1–C7)', 'Thoracic (T1–T12)', 'Lumbar (L1–L5)', 'Sacrum (S1–S5 fused)', 'Coccyx (Co1–Co4 fused)'],
        explanation: 'This is the order and the segment counts given on the Module 0 vertebral column slide.' },
      { type: 'mcq', prompt: 'Which pair are the secondary curvatures?', options: ['Thoracic and pelvic', 'Cervical and lumbar', 'Cervical and thoracic', 'Lumbar and pelvic'], answer: 1,
        explanation: 'The cervical and lumbar curvatures are secondary — concave posteriorly and developed after birth. The thoracic and pelvic curves are primary, concave anteriorly, from the embryonic stage.' },
      { type: 'cloze', prompt: '______ articulates with the inferior apex of the sacrum.', accept: ['coccyx', 'the coccyx'],
        explanation: 'Model answer: Coccyx. It is the fused Co1–Co4 remnant sitting below the sacrum.',
        src: { ref: 'hss.revans', location: 'Module 0, Fill-in-blanks 3' } },
    ],
    application: [
      { type: 'scenario', prompt: 'An infant’s spine looks like a single C-shaped curve. Which curvatures are present, and which are missing?',
        model: 'Only the primary curvatures — thoracic and pelvic — are present, because those develop during the embryonic stage and are concave anteriorly. The secondary cervical and lumbar curves develop after birth, so they are missing at that point.',
        rubric: ['Names thoracic and pelvic as present', 'Names cervical and lumbar as later', 'Links the difference to embryonic vs after birth'] },
    ],
    commonMistakes: [
      'Guessing the segment counts. They are fixed: 7, 12, 5.',
      'Assuming "primary" means larger or more important rather than earlier.',
    ],
    skills: [
      '"Primary" and "secondary" are about timing, not size or importance: primary curves (thoracic, pelvic) are the embryonic ones you are born with; secondary curves (cervical, lumbar) arrive after birth with lifting the head and standing. An infant\'s C-shaped spine is therefore not a deformity — it is the primary set alone.',
      'The direction of each curve is derivable once you know the timing: the primary curves are concave anteriorly, and the secondary ones develop the opposite way — concave posteriorly. Timing gives you direction, so the two facts are really one.',
      'The counts are fixed and are the actual exam content: 7 cervical, 12 thoracic, 5 lumbar, then the fused sacrum (S1–S5) and coccyx (Co1–Co4). Guessing a count loses more marks than misplacing a name.',
    ],
    selfCheck: 'From a blank page: the five regions superior to inferior with their counts, which two curvatures are secondary and which way each group is concave, and the infant C-shaped spine reasoning.',
    sourceRefs: [{ ref: 'hss.m0.1718', location: 'L1 p15 "Vertebral column"; L1 p16 "Curvatures"' }, { ref: 'hss.l1.overview', location: 'p13 "(S1-S5 fused)" sacrum, coccyx Co1–Co4 fused; p14 primary curvatures concave anteriorly and "developed during embryonic stage", secondary concave posteriorly and "developed after birth"' }, { ref: 'hss.revans', location: 'Module 0, Fill-in-blanks' }],
  },
  {
    id: 'hss2011-osteo-c1-c2',
    subject: 'HSS2011', unit: 'hss.osteo', type: 'comparison',
    title: 'Atlas, axis and the two head movements',
    tags: ['osteology', 'high-yield'], boneRefs: ['cervical', 'cranium'],
    lesson: {
      explanation: 'The top two cervical vertebrae are specialised and each one carries a different head movement. The atlanto-occipital joint, between the occipital condyles of the skull and the lateral masses of the atlas (C1), allows flexion and extension — the "yes" nod. The median atlanto-axial joint, between C1 and the dens of the axis (C2), allows rotation of the head — the "no" shake. The transverse ligament holds the atlas and the dens of the axis in place.',
      keyFacts: [
        'Atlanto-occipital joint (occipital condyles onto C1 lateral masses) → flexion and extension, the nod.',
        'Median atlanto-axial joint (C1 on the dens of C2) → rotation, the shake.',
        'The transverse ligament holds the atlas and the dens (odontoid process) of the axis in place.',
        'Cervical vertebrae also carry transverse foramina through which the vertebral arteries pass, and a bifid spinous process.',
      ],
      prerequisites: ['hss2011-osteo-vertebral-column'],
      examples: [],
    },
    memory: {
      mnemonic: 'Atlas held up the world on his shoulders — C1 holds up the head, and nodding is what a tired Atlas does. The axis is the pin you turn around, so C2 gives you the shake.',
      comparison: 'YES at the atlanto-occipital joint, NO at the atlanto-axial joint. If you only remember one, remember that the dens is the pivot pin and pins mean rotation.',
      wordOrigin: 'Dens is Latin for tooth; the odontoid process gets its name from the same idea, odont- meaning tooth.',
    },
    practice: [
      { type: 'mcq', prompt: 'The lateral mass of the atlas, which articulates with the occipital condyle of the skull, is the articular facet where ________ motion of the skull takes place.', options: ['Nodding', 'Shaking', 'Lateral flexion', 'Rotational'], answer: 0,
        explanation: 'Model answer A. The atlanto-occipital joint allows flexion and extension — the nod. Rotation happens one level lower, at the median atlanto-axial joint.',
        src: { ref: 'hss.revans', location: 'Module 4.2, MCQ 3' } },
      { type: 'mcq', prompt: 'Which bone articulates with the dens?', options: ['Temporal', 'Atlas', 'Occipital', 'Mandible'], answer: 1,
        explanation: 'Model answer B. The dens of the axis (C2) projects up into the ring of the atlas (C1), forming the median atlanto-axial joint.',
        src: { ref: 'hss.revans', location: 'Module 0, MCQ 5' } },
      { type: 'cloze', prompt: 'The transverse ligament holds the atlas and the ______ of the axis in place.', accept: ['dens', 'odontoid process', 'odontoid process (dens)', 'odontoid'],
        explanation: 'Model answer: odontoid process (dens). Both names are accepted for the same peg.',
        src: { ref: 'hss.revans', location: 'Module 4.2, Fill-in-blanks 3' } },
    ],
    application: [
      { type: 'scenario', prompt: 'A patient can nod but cannot shake their head. Which joint is most likely affected, and which bones form it?',
        model: 'The median atlanto-axial joint, between the atlas (C1) and the dens of the axis (C2). Nodding is preserved because that happens at the atlanto-occipital joint one level above, which is unaffected.',
        rubric: ['Names the atlanto-axial joint', 'Names C1 and C2 / the dens', 'Explains why nodding is spared'] },
    ],
    commonMistakes: [
      'Swapping the two joints — the nod is higher (skull on C1), the shake is lower (C1 on C2).',
      'Not recognising "odontoid process" and "dens" as the same structure under two names.',
    ],
    skills: [
      'The nod sits above the shake. Flexion and extension happen where the skull rides on C1 (atlanto-occipital); rotation happens one level lower, where C1 turns on the dens of C2 (median atlanto-axial). A patient who can nod but not shake localises the problem to the atlanto-axial joint without any imaging at all.',
      'The dens is the pivot pin, and pins mean rotation — that is the whole mechanism connecting C2\'s shape to the "no" movement. The transverse ligament is what holds C1 against that pin, which is why the peg can rotate inside the ring without leaving it.',
      'Dens and odontoid process are one peg under two names — Latin tooth and Greek tooth. The fill-in-blank accepts either, but recognising them as the same structure is what stops the two names from reading like two landmarks.',
    ],
    selfCheck: 'From a blank page: which joint nods and which shakes with the bones of each named, what the transverse ligament holds, and the can-nod-cannot-shake patient reasoning.',
    sourceRefs: [{ ref: 'hss.m0.1718', location: 'L1 p28–29 cervical vertebrae, atlanto-axial joint' }, { ref: 'hss.l1.overview', location: 'p27 "atlanto-occipital joint (YES!!!)" with flexion/extension and median atlanto-axial rotation' }, { ref: 'hss.4.2', location: 'Head and neck — cervical spine features' }, { ref: 'hss.revans', location: 'Module 0 and Module 4.2 answers' }],
  },
  {
    id: 'hss2011-osteo-skull-sutures',
    subject: 'HSS2011', unit: 'hss.osteo', type: 'definition',
    title: 'Skull bones and the four sutures',
    tags: ['osteology', 'skull', 'high-yield'], boneRefs: ['cranium', 'mandible'],
    lesson: {
      explanation: 'Sutures are fibrous joints of the skull, articulating by process and indentation, with the bones bound by fibrous connective tissue. Four are named in the module: the coronal suture binds the frontal and parietal bones; the sagittal suture runs between the two parietal bones; the lambdoid suture lies between parietal and occipital; and the squamous suture joins the parietal bone to the temporal bone. The Module 4 labelling answers also name the squamous part of the temporal bone, the external acoustic meatus, the mastoid process, the sphenoid, the nasal bone, the lacrimal bone, the ethmoid, the maxilla and the zygomatic bone. The mandible is the only movable bone in the skull.',
      keyFacts: [
        'Coronal suture — frontal to parietal.',
        'Sagittal suture — parietal to parietal.',
        'Lambdoid suture — parietal to occipital.',
        'Squamous suture — parietal to temporal.',
        'Sutures are fibrous joints: articulation by process and indentation, bound by fibrous connective tissue.',
        'The mandible is the only movable bone in the skull.',
        'Named facial and cranial bones in the labelling answers: sphenoid, nasal, lacrimal, ethmoid, maxilla, zygomatic, temporal (squamous part), plus the external acoustic meatus and mastoid process.',
      ],
      prerequisites: ['hss2011-osteo-axial-appendicular'],
      examples: [],
    },
    memory: {
      location: 'Put a crown on your head: the coronal suture is exactly where the band sits, frontal in front, parietal behind. Then an arrow (sagittal) down the midline between the parietals. Lambdoid is the Greek letter lambda at the back of the skull. Squamous is the scaly overlap low on the side, where the temporal bone slides under the parietal.',
      firstLetter: 'Going front to back along the top: Coronal, Sagittal, Lambdoid. C-S-L. Squamous is the odd one out because it is on the side, not the top.',
      comparison: 'Squamous vs sagittal is the classic distractor pair. Sagittal is on top between two parietals; squamous is on the side between parietal and temporal.',
    },
    practice: [
      { type: 'mcq', prompt: 'Which suture joins the parietal bone and the temporal bone together?', options: ['Squamous suture', 'Coronal suture', 'Lambdoid suture', 'Sagittal suture'], answer: 0,
        explanation: 'Model answer A. The squamous suture is the scale-like overlap on the side of the skull between parietal and temporal. Sagittal is the midline joint between the two parietals.',
        src: { ref: 'hss.revans', location: 'Module 4.2, MCQ 2' } },
      { type: 'cloze', prompt: 'The joint between the frontal and parietal bones is correctly called the ______ suture.', accept: ['coronal'],
        explanation: 'Model answer: coronal. The lecture uses this exact example when defining sutures as fibrous joints.',
        src: { ref: 'hss.revans', location: 'Module 4.2, Fill-in-blanks 4' } },
      { type: 'cloze', prompt: 'The ______ bone is the only movable bone in the skull.', accept: ['mandible', 'mandibular'],
        explanation: 'Model answer: mandible. It articulates with the temporal bones at the temporomandibular joints.',
        src: { ref: 'hss.revans', location: 'Module 4.2, Fill-in-blanks 2' } },
      { type: 'matching', prompt: 'Match each suture to the bones it joins.',
        pairs: [['Coronal', 'Frontal – parietal'], ['Sagittal', 'Parietal – parietal'], ['Lambdoid', 'Parietal – occipital'], ['Squamous', 'Parietal – temporal']],
        explanation: 'These are the four sutures the module asks you to locate on the skull.' },
    ],
    application: [
      { type: 'scenario', prompt: 'Sutures are classed as fibrous joints. What does that classification tell you about how much they move, and why is a suture a useful example of that class?',
        model: 'Fibrous joints allow very limited movement because the bones are connected by fibrous tissue rather than by a cavity and cartilage. A suture is the clearest example: the bones interlock by process and indentation and are bound by fibrous connective tissue, so the skull vault is effectively rigid.',
        rubric: ['States fibrous joints allow very limited movement', 'Describes the process-and-indentation interlock', 'Names fibrous connective tissue as the binding'] },
    ],
    commonMistakes: [
      'Answering sagittal when asked about parietal-to-temporal. Sagittal is parietal-to-parietal on the midline.',
      'Forgetting the mandible when asked which skull bone moves.',
    ],
    skills: [
      'Sagittal and squamous differ by one letter and one whole location: sagittal is the midline joint between the two parietals; squamous is the low side-joint where the temporal slides under the parietal. Both touch a parietal, so "involves the parietal bone" identifies neither — the second bone is the answer.',
      'Each suture\'s name is its own map reference: coronal runs where a crown sits (frontal to parietal), sagittal along the arrow\'s flight down the midline, lambdoid draws a Greek lambda at the back, and squamous — "scale-like" — is the overlap on the side. Read the name, get the position.',
      'A suture is fibrous — bones interlocked by process and indentation, bound by fibrous tissue — which is why the skull vault barely moves at all, and why the mandible\'s status as the only movable skull bone is definitional rather than incidental.',
    ],
    selfCheck: 'From a blank page: the four sutures with their bone pairs, why a suture permits the least movement of the listed joints (fibrous tissue, process-and-indentation interlock), and the only movable skull bone.',
    sourceRefs: [{ ref: 'hss.4.2', location: 'Head and neck — skull, sutures' }, { ref: 'hss.4.1', location: 'Slide "Fibrous joints — Sutures"' }, { ref: 'hss.revans', location: 'Module 4.2 answers; More exercises Module 4, labels A1–A12' }],
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
    "lesson": {
      "explanation": "The pectoral (shoulder) girdle forms the skeletal foundation connecting the upper appendicular limb to the axial skeleton. On each side of the body, the pectoral girdle consists of two bones: the anterior, subcutaneous S-shaped clavicle (collarbone) and the posterior, flat triangular scapula (shoulder blade). A fundamental anatomical principle of the human shoulder is that it possesses only a single bony joint linking the entire upper limb to the axial frame: the sternoclavicular joint, formed by the articulation of the medial (sternal) end of the clavicle with the clavicular notch of the manubrium of the sternum and the first costal cartilage. This articulation is a saddle-type synovial joint containing an intervening fibrocartilaginous articular disc that functions as a shock absorber. The lateral (acromial) end of the clavicle articulates with the acromion of the scapula at the plane-type acromioclavicular (AC) joint, reinforced by the powerful coracoclavicular ligament. Crucially, the scapula itself has no direct bony articulation with the axial skeleton; instead, it is suspended against the posterior thoracic cage across a physiological muscular interface (the scapulothoracic joint) by muscular slings including the trapezius, serratus anterior, levator scapulae, and rhomboids. This lack of rigid bony anchoring grants the scapula immense mobility, allowing it to elevate, depress, protract, retract, and rotate upwardly and downwardly. The lateral angle of the scapula is expanded into the glenoid cavity (glenoid fossa), a shallow, pear-shaped articular depression that articulates with the large, smooth hemispherical head of the humerus to form the glenohumeral (shoulder) joint. The glenohumeral articulation is a classic polyaxial ball-and-socket synovial joint. Because the shallow glenoid fossa accommodates only approximately one-third of the humeral head, the shoulder joint deliberately trades osseous stability in exchange for the greatest range of multi-planar movement of any joint in the human body (permitting flexion, extension, abduction, adduction, medial rotation, lateral rotation, and circumduction). Dynamic joint stability is provided by the rotator cuff muscles (supraspinatus, infraspinatus, teres minor, subscapularis) whose tendons blend directly with the joint capsule, supported by the fibrous glenoid labrum that deepens the socket rim. Major shoulder-girdle motors include the deltoid, pectoralis major, and latissimus dorsi.",
      "plain": "The pectoral girdle anchors your arm to your body using two bones: the collarbone (clavicle) in front and the shoulder blade (scapula) behind. Amazingly, the entire arm is connected to your skeleton by just one single bony joint: the sternoclavicular joint where the clavicle joins the breastbone (sternum). The other end of the clavicle meets the scapula at the acromioclavicular joint. The scapula has no bones connecting it to your spine or ribs—it floats on a bed of muscles, giving your shoulder massive range of motion. At the side of the scapula sits the shallow glenoid socket, which meets the round ball of the humerus to form the ball-and-socket shoulder joint. Because the socket is shallow, the shoulder is the most mobile joint in your body, relying on the four rotator cuff muscles to keep the ball from popping out.",
      "keyFacts": [
        "Pectoral girdle bones: anterior clavicle and posterior scapula.",
        "Single bony axial bridge: sternoclavicular joint (medial clavicle meets sternum manubrium).",
        "Acromioclavicular (AC) joint: lateral clavicle articulates with acromion of scapula.",
        "Scapulothoracic articulation: dynamic muscular sling; no direct bony attachment to ribs or spine.",
        "Glenohumeral joint: polyaxial ball-and-socket joint between shallow glenoid fossa and humeral head.",
        "Mobility vs stability trade-off: shallow glenoid accommodates ~1/3 of humeral head; greatest mobility in the body.",
        "Dynamic stabilizers: rotator cuff muscles (SITS) and glenoid labrum fibrocartilage rim.",
        "Major shoulder girdle muscles: pectoralis major, latissimus dorsi, and deltoid."
      ],
      "prerequisites": [
        "hss2011-osteo-axial-appendicular",
        "hss2011-joints-classification"
      ],
      "examples": [
        "When falling onto an outstretched hand (FOOSH), compressive mechanical shock is transmitted up the radius, humerus, scapula, and clavicle to the sternum; because the sternoclavicular ligaments are exceptionally strong, fracture occurs at the junction of the middle and lateral thirds of the clavicle rather than joint dislocation.",
        "Shoulder anterior dislocation is common because the glenoid cavity is shallow and the inferior-anterior capsule lacks rotator cuff tendon reinforcement."
      ]
    },
    "memory": {
      "chunking": "Three joints around the shoulder: Sternoclavicular (axial bridge), Acromioclavicular (strut joint), Glenohumeral (ball-and-socket).",
      "comparison": "Glenoid vs Acetabulum: the glenoid fossa is shallow (built for maximum mobility, prone to dislocation); the hip acetabulum is deep (built for weight-bearing stability).",
      "visualCue": "Picture the clavicle as a rigid architectural crane strut holding the scapula and arm away from the thorax so the arm can swing freely.",
      "teachBack": "Explain why the human shoulder has only one bony connection to the axial skeleton and how this design enables overhead arm elevation."
    },
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
    "skills": [
      "Trace the axial force transmission pathway: hand → radius → humerus → glenoid cavity → scapula → acromioclavicular joint → clavicle → sternoclavicular joint → sternum.",
      "Recognize on thoracic radiographs that the medial end of the clavicle normally aligns with the manubrium at the sternoclavicular joint."
    ],
    "selfCheck": "From memory: name the two bones of the pectoral girdle, identify the three joints around the shoulder region, and explain the mobility-stability trade-off of the glenoid fossa.",
    "visuals": [
      {
        "model": {
          "layer": "skeleton",
          "meshes": [
            "Clavicle",
            "Scapula",
            "Humerus"
          ],
          "label": "Pectoral girdle and shoulder joint",
          "caption": "The clavicle articulates medially with the manubrium of the sternum (sternoclavicular joint) and laterally with the acromion of the scapula (acromioclavicular joint); the shallow glenoid cavity articulates with the head of the humerus."
        }
      },
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
    "lesson": {
      "explanation": "The distal upper limb skeleton comprises the bones of the forearm (antebrachium), wrist (carpus), palm (metacarpus), and fingers (phalanges). The forearm contains two parallel long bones: the lateral radius (aligned with the thumb) and the medial ulna (aligned with the little finger). Proximally, the ulna features a prominent hook-like olecranon process and an anterior coronoid process that bound the deep, C-shaped trochlear notch; this notch articulates tightly with the spool-like trochlea of the humerus to form the uniaxial humero-ulnar hinge joint of the elbow. On the lateral aspect of the coronoid process, the radial notch of the ulna articulates with the circular head of the radius to form the proximal radioulnar pivot joint, allowing rotary supination and pronation. Distally, the expanded radius articulates with the ulnar head at the distal radioulnar joint. At the wrist, the distal radius forms the primary articulating surface of the condylar radiocarpal (wrist) joint, articulating with the proximal carpal row (scaphoid and lunate); the distal ulna is excluded from direct carpal articulation by a fibrocartilaginous articular disc. The wrist contains eight carpal bones arranged in two transverse rows of four. The proximal row (from lateral/radial to medial/ulnar) comprises: 1. Scaphoid (boat-shaped; the most frequently fractured carpal, susceptible to avascular necrosis), 2. Lunate (crescent-shaped; the most frequently dislocated carpal), 3. Triquetrum (pyramidal), and 4. Pisiform (a small pea-shaped sesamoid bone sitting on the palmar surface of the triquetrum within the flexor carpi ulnaris tendon). The distal row (lateral to medial) comprises: 5. Trapezium (features a saddle-shaped articular surface for the first metacarpal of the thumb; \"trapezi-UM under the th-UMB\"), 6. Trapezoid (wedge-shaped), 7. Capitate (the largest carpal bone, occupying the central position), and 8. Hamate (characterized by a prominent curved palmar projection called the hook of hamate). These carpal bones form an anteriorly concave osseous arch spanned by the tough flexor retinaculum, creating the enclosed carpal tunnel. Passing through the carpal tunnel are the median nerve and nine flexor tendons (four tendons of flexor digitorum superficialis, four of flexor digitorum profundus, and one of flexor pollicis longus). Carpal Tunnel Syndrome (CTS) is a painful disabling condition caused by compression of the median nerve travelling through this tunnel. Distal to the carpus are five metacarpal bones (I to V) and 14 phalanges (two in the thumb: proximal and distal; three in digits II–V: proximal, middle, distal).",
      "plain": "The forearm consists of two bones: the radius on the thumb side and the ulna on the little-finger side. The ulna has a large C-shaped scoop called the trochlear notch that hinges around the humerus at the elbow. The wrist contains eight carpal bones arranged in two neat rows of four. Proximal row (thumb to little finger): Scaphoid, Lunate, Triquetrum, Pisiform. Distal row: Trapezium (under the thumb), Trapezoid, Capitate (the biggest), and Hamate (with a hook). The carpal bones curve into a U-shaped trough covered by a tight ligament roof (the flexor retinaculum), forming the carpal tunnel. The median nerve passes through this tunnel; if it gets pinched, it causes numbness and weakness called Carpal Tunnel Syndrome. Distal to the wrist are the 5 metacarpals of the palm and the 14 finger phalanges.",
      "keyFacts": [
        "Forearm bones: lateral radius (thumb side) and medial ulna (little finger side).",
        "Trochlear notch of ulna: articulates with the trochlea of the humerus to form the elbow hinge.",
        "Proximal and distal radioulnar joints: uniaxial pivot joints allowing pronation and supination.",
        "Radiocarpal (wrist) joint: distal radius articulates with scaphoid and lunate carpal bones.",
        "Eight carpal bones in two rows of four.",
        "Proximal row (lateral to medial): Scaphoid, Lunate, Triquetrum, Pisiform.",
        "Distal row (lateral to medial): Trapezium, Trapezoid, Capitate, Hamate.",
        "Capitate: largest carpal bone; Pisiform: sesamoid carpal; Trapezium: articulates with thumb metacarpal.",
        "Carpal tunnel: formed by carpal arch and flexor retinaculum; transmits median nerve and 9 flexor tendons.",
        "Carpal Tunnel Syndrome (CTS): compression of the median nerve within the carpal tunnel.",
        "Hand skeleton: 8 carpals, 5 metacarpals (I–V), 14 phalanges (thumb has 2; digits II–V have 3)."
      ],
      "prerequisites": [
        "hss2011-osteo-long-bone-structure",
        "hss2011-joints-classification"
      ],
      "examples": [
        "A fall onto an extended wrist frequently fractures the scaphoid across its waist; because retrograde arterial blood enters from the distal pole, non-union and avascular necrosis of the proximal scaphoid fragment are serious complications.",
        "Repetitive typing or wrist strain causes tenosynovitis of flexor tendons within the inextensible carpal tunnel, compressing the median nerve and producing sensory tingling in the thumb, index, and middle fingers."
      ]
    },
    "memory": {
      "firstLetter": "Proximal row then distal row, lateral to medial: Scaphoid, Lunate, Triquetrum, Pisiform, Trapezium, Trapezoid, Capitate, Hamate (mnemonic: \"Some Lovers Try Positions That They Cannot Handle\").",
      "mnemonic": "Trapezi-UM articulates with the th-UMB. Capitate is the CAPTAIN (largest bone in the center).",
      "comparison": "Radius vs Ulna at the wrist: the radius expands distally to articulate directly with carpals; the ulna shrinks distally into a small head separated from carpals by a disc.",
      "teachBack": "Recite all eight carpal bones in row order from lateral to medial, point to your own wrist to demonstrate the carpal tunnel, and explain why median nerve compression spares the little finger."
    },
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
    "skills": [
      "Identify all eight carpal bones on a PA wrist radiograph by systematically following proximal row (scaphoid → lunate → triquetrum → pisiform) then distal row (trapezium → trapezoid → capitate → hamate).",
      "Assess radiocarpal joint symmetry: smooth parabolic curves (Gilula’s carpal lines) on wrist radiographs confirm normal alignment."
    ],
    "selfCheck": "From memory: list the eight carpal bones in proximal and distal rows, name the nerve and tendons traversing the carpal tunnel, and identify which bone forms the trochlear notch.",
    "visuals": [
      {
        "fig": "carpalBones"
      },
      {
        "model": {
          "layer": "skeleton",
          "meshes": [
            "Radius",
            "Ulna",
            "Scaphoid bone",
            "Lunate bone",
            "Triquetrum bone",
            "Pisiform bone",
            "Trapezium bone",
            "Trapezoid bone",
            "Capitate bone",
            "Hamate bone"
          ],
          "label": "Forearm and carpal bones",
          "caption": "Radius and ulna articulating with proximal carpal row (scaphoid, lunate, triquetrum) at the radiocarpal wrist joint."
        }
      },
      {
        "gen": true
      }
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
      }
    ]
  },
  {
    id: 'hss2011-osteo-pelvic-girdle',
    subject: 'HSS2011', unit: 'hss.osteo', type: 'definition',
    title: 'Pelvic girdle and the hip joint',
    tags: ['osteology', 'lower limb', 'high-yield'], boneRefs: ['pelvis', 'femur', 'sacrum'],
    lesson: {
      explanation: 'Each hip bone is formed from three bones: the ilium, the ischium and the pubis. The head of the femur articulates with the acetabulum, the socket where those three meet. The proximal femur carries the head, the neck, the greater trochanter and the lesser trochanter, and the shaft angles inward to the medial and lateral condyles at the knee.',
      keyFacts: [
        'The three bones forming the hip bone: ilium, ischium, pubis.',
        'Head of femur articulates with the acetabulum.',
        'Proximal femur landmarks: head, neck, greater trochanter, lesser trochanter, angle of inclination.',
        'Distal femur landmarks: medial condyle, lateral condyle.',
        'Gluteus medius is a hip abductor.',
      ],
      prerequisites: ['hss2011-osteo-axial-appendicular'],
      examples: [],
    },
    memory: {
      firstLetter: 'Ilium, Ischium, Pubis — I, I, P. Top, bottom-back, bottom-front.',
      location: 'Rest your hands on your hips and you are on the ilium. Sit down and you are on the ischium — I Sit on my ischial tuberosity. The pubis is the front join.',
      comparison: 'Acetabulum takes the femoral head; glenoid cavity takes the humeral head. Deep socket versus shallow one — that is why the hip is stable and the shoulder is mobile.',
    },
    practice: [
      { type: 'mcq', prompt: 'The head of the femur articulates with _______.', options: ['Acetabulum', 'Glenoid cavity', 'Acromion', 'Greater trochanter', 'Medial condyle'], answer: 0,
        explanation: 'Model answer A. The acetabulum is the hip socket. The glenoid cavity is the shoulder socket and the acromion is a scapular process.',
        src: { ref: 'hss.revans', location: 'Module 4.3, MCQ 4' } },
      { type: 'cloze', prompt: 'The three bones forming the hip bone are ______, ______ and ______.', accept: ['ilium; ischium; pubis', 'ilium, ischium, pubis', 'ilium ischium pubis'],
        explanation: 'Model answer: ilium, ischium, pubis. They meet at the acetabulum.',
        src: { ref: 'hss.revans', location: 'Module 4.3, Fill-in-blanks 1' } },
      { type: 'mcq', prompt: 'Which of the following muscles is a hip abductor?', options: ['Gluteus medius', 'Tibialis anterior', 'Adductor magnus', 'Gastrocnemius', 'Rectus femoris'], answer: 0,
        explanation: 'Model answer A. Gluteus medius abducts the hip. Adductor magnus does the opposite, and the other three act at the knee or ankle.',
        src: { ref: 'hss.revans', location: 'Module 4.3, MCQ 5' } },
    ],
    application: [
      { type: 'scenario', prompt: 'A fracture is described as being at the "neck of femur". Using the proximal femoral landmarks, say where that is relative to the greater trochanter and why the site matters for the joint.',
        model: 'The neck is the narrow segment between the head and the trochanters, so it lies medial and superior to the greater trochanter. It matters because the head sits inside the acetabulum, so a break across the neck separates the articulating head from the shaft.',
        rubric: ['Places the neck between head and trochanters', 'Relates the head to the acetabulum'] },
    ],
    commonMistakes: [
      'Answering glenoid cavity for the femoral head — that is the shoulder socket.',
      'Listing the sacrum as one of the three bones of the hip bone; it is axial and articulates with the ilium, but it is not part of it.',
    ],
    skills: [
      'The hip and shoulder sockets are the same solution at two depths: the deep acetabulum trades mobility for stability, the shallow glenoid the other way round. Socket questions offering both are testing exactly this pairing — acetabulum takes the femoral head, glenoid the humeral.',
      'The hip bone is three bones — ilium, ischium, pubis — meeting in the acetabulum. The sacrum is not a fourth member: it is an axial vertebra-derived bone that merely articulates with the ilium. The mistake is reading the sacro-iliac joint as a joint inside one bone.',
      'The three hip-bone names anchor to what you do with them: hands on hips is ilium, sitting down is ischium (the tuberosity you sit on), the front join is pubis. The positions are the definitions.',
    ],
    selfCheck: 'From a blank page: the three hip-bone names, the femoral head’s socket, the proximal femoral landmarks in order from head to condyles, and the neck-of-femur reasoning — between head and trochanters, separating head from shaft.',
    sourceRefs: [{ ref: 'hss.4.3', location: 'Slides "Hip & Gluteal Region: Pelvic Girdle", "Femur (Right)" (Fig. 8-11), "Proximal End of Femur"' }, { ref: 'hss.revans', location: 'Module 4.3 answers' }],
  },
  {
    id: 'hss2011-osteo-leg-tarsals',
    subject: 'HSS2011', unit: 'hss.osteo', type: 'definition',
    title: 'Leg bones, ankle and the tarsal bones',
    tags: ['osteology', 'lower limb'], boneRefs: ['tibia', 'fibula', 'foot', 'patella'],
    lesson: {
      explanation: 'The leg has the tibia medially and the fibula laterally, joined by an interosseous membrane and meeting at the proximal and distal tibiofibular joints. The tibia ends in the medial malleolus and the fibula in the lateral malleolus. The patella has a base superiorly and an apex inferiorly. The tarsal bones named in the lecture are the talus, calcaneus, navicular, cuboid, and the medial, intermediate and lateral cuneiforms. The foot has three arches: medial longitudinal, lateral longitudinal and transverse.',
      keyFacts: [
        'Tibia medial, fibula lateral.',
        'Medial malleolus belongs to the tibia; lateral malleolus belongs to the fibula.',
        'Proximal and distal tibiofibular joints, with an interosseous membrane between.',
        'Patella: base superiorly, apex inferiorly.',
        'Tarsals: talus, calcaneus, navicular, cuboid, medial / intermediate / lateral cuneiforms.',
        'Three arches of the foot: medial longitudinal, lateral longitudinal, transverse.',
        'Gastrocnemius, the ankle plantarflexor, is innervated by the tibial nerve.',
      ],
      prerequisites: ['hss2011-osteo-pelvic-girdle'],
      examples: [],
    },
    memory: {
      mnemonic: 'Tibia = TIB takes the weight, and it is the one you can feel as your shin. Fibula = fine, thin pin on the outside.',
      comparison: 'Malleolus pairs: Medial with tibia, Lateral with fibula. Both pairs share their first letter with the side they are on, except the tibia — so learn lateral–fibula and derive the other.',
      location: 'The talus sits on top of the calcaneus and takes the whole leg’s load into the foot. Everything else in the tarsus fans forward from those two.',
    },
    practice: [
      { type: 'typed', prompt: 'Which bone carries the lateral malleolus?', accept: ['fibula'],
        explanation: 'The fibula ends distally in the lateral malleolus; the tibia ends in the medial malleolus.' },
      { type: 'cloze', prompt: 'The gastrocnemius muscle (ankle plantarflexor) is innervated by the ______ nerve.', accept: ['tibial'],
        explanation: 'Model answer: tibial.',
        src: { ref: 'hss.revans', location: 'Module 4.3, Fill-in-blanks 5' } },
      { type: 'matching', prompt: 'Match each tarsal bone group to its description from the lecture.',
        pairs: [['Talus', 'Sits at the ankle joint, above the calcaneus'], ['Calcaneus', 'The heel bone'], ['Cuneiforms', 'Medial, intermediate and lateral — three of them'], ['Navicular', 'Lies between the talus and the cuneiforms']],
        explanation: 'These are the tarsal bones named on the "Ankle & Foot" slide.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A swelling is described over the lateral malleolus. Which bone is involved, and which of the two leg bones bears most of the body weight?',
        model: 'The lateral malleolus is the distal end of the fibula. The tibia is the weight-bearing bone of the leg; the fibula is the slender lateral bone, so a lateral malleolar problem is not primarily a weight-bearing one.',
        rubric: ['Identifies the fibula', 'Names the tibia as weight-bearing'] },
    ],
    commonMistakes: [
      'Assigning the medial malleolus to the fibula. Medial goes with tibia.',
      'Calling tarsals "carpals" — carpals are in the wrist.',
    ],
    skills: [
      'The leg\'s two bones split the work unequally: the tibia is the weight-bearing shin you can feel, the fibula a slender lateral strut. So a swelling over the lateral malleolus is a fibular problem and not primarily a weight-bearing one — the body\'s load reaches the foot through the talus, never through the fibula.',
      'The malleolus name already carries the side (medial, lateral); the fact to learn is which bone goes with which: lateral malleolus is the fibula\'s distal end, which forces medial to be the tibia\'s. One fact answers both questions.',
      'Carpals and tarsals are the wrist/ankle trap pair — carpal for the wrist, tarsal for the ankle — and the tarsus builds from the back: talus riding on the calcaneus taking the leg\'s load, with navicular, cuboid and the three cuneiforms fanning forward from those two.',
    ],
    selfCheck: 'From a blank page: which bone carries which malleolus, the seven named tarsals, which leg bone is weight-bearing, and the lateral-malleolus swelling scenario answered with both facts.',
    sourceRefs: [{ ref: 'hss.4.3', location: 'Slides "Patella (Right)" (Fig. 8-12), "Tibia and Fibula (Right)" (Fig. 8-13), "Ankle & Foot"' }, { ref: 'hss.revans', location: 'Module 4.3, Fill-in-blanks 5' }],
  },
  {
    id: 'hss2011-osteo-ribs-sternum',
    subject: 'HSS2011', unit: 'hss.osteo', type: 'definition',
    title: 'Thoracic cage — ribs, sternum and the thoracic inlet',
    tags: ['osteology', 'thorax', 'high-yield'], boneRefs: ['ribs', 'sternum', 'thoracic'],
    lesson: {
      explanation: 'The thorax is the region formed by the sternum, the thoracic vertebrae and the ribs, extending from the neck down to the diaphragm. Module 1.3 asks you to define the thoracic cage, classify the ribs as true, false or floating, and describe how ribs articulate with the sternum and vertebral column. The thoracic inlet is bounded by the first ribs, the first thoracic vertebra and the manubrium of the sternum — and the revision exercise makes the point that the scapula is not part of it.',
      keyFacts: [
        'Thorax = sternum + thoracic vertebrae + ribs, from the neck to the diaphragm.',
        'Thoracic inlet is bounded by the 1st ribs, the 1st thoracic vertebra and the sternum (manubrium).',
        'Ribs classify as true, false and floating.',
        'The arch of the aorta lies in the superior mediastinum.',
        'The phrenic nerve innervates the muscle fibres of the diaphragm.',
        'The azygos vein drains blood from the posterior thoracic wall.',
      ],
      prerequisites: ['hss2011-osteo-vertebral-column'],
      examples: [],
    },
    memory: {
      chunking: 'Ribs 1–7 attach to the sternum on their own; 8–10 share a cartilage; 11–12 attach to nothing in front. Alone, carpool, walk free.',
      location: 'The thoracic inlet is a ring you can trace with your fingers: sternum in front, first ribs at the sides, T1 behind. The scapula floats on the back and never joins the ring.',
      wordOrigin: 'Azygos is Greek for "unpaired" — it is the vein with no partner on the other side, which is why it can drain the whole posterior wall.',
    },
    practice: [
      { type: 'mcq', prompt: 'Which of the following is NOT part of the thoracic inlet?', options: ['Clavicle', 'Scapula', 'Sternum', 'Cervical vertebrae C7'], answer: 1,
        explanation: 'The model answer for this question is A, B, D — the inlet is bounded by the 1st ribs, the 1st thoracic vertebra and the manubrium, so clavicle, scapula and C7 are all outside it. Of the four, the scapula is the one that is never involved in the thoracic boundary at all.',
        src: { ref: 'hss.revans', location: 'Module 1.3, MCQ 1 (model answer A, B, D)' } },
      { type: 'cloze', prompt: 'The thoracic outlet is bounded by ______.', accept: ['1st ribs, 1st thoracic vertebrae, sternum', '1st ribs, 1st thoracic vertebra, manubrium', 'first ribs, first thoracic vertebra and the manubrium'],
        explanation: 'Model answer: 1st ribs, 1st thoracic vertebrae, sternum (manubrium).',
        src: { ref: 'hss.revans', location: 'Module 1.3, Fill-in-blanks 1' } },
      { type: 'cloze', prompt: 'The ______ nerve innervates the muscle fibres of the diaphragm.', accept: ['phrenic'],
        explanation: 'Model answer: phrenic.',
        src: { ref: 'hss.revans', location: 'Module 1.3, Fill-in-blanks 3' } },
      { type: 'cloze', prompt: 'The ______ drains blood from the posterior thoracic wall.', accept: ['azygos vein', 'azygos'],
        explanation: 'Model answer: azygos vein.',
        src: { ref: 'hss.revans', location: 'Module 1.3, Fill-in-blanks 5' } },
    ],
    application: [
      { type: 'scenario', prompt: 'The Module 3 exercise asks which organs a broken left 10th rib could damage. What is the answer, and what does it tell you about how far the thoracic cage extends over the abdomen?',
        model: 'The left kidney and the spleen. That shows the lower ribs overlie upper abdominal organs, so the bony thorax and the thoracic cavity are not the same extent — the cage continues down over structures that are anatomically abdominal.',
        rubric: ['Names left kidney and spleen', 'Draws the distinction between the bony cage and the thoracic cavity'] },
    ],
    commonMistakes: [
      'Including the clavicle or scapula in the thoracic inlet — the boundary is ribs, vertebra and sternum only.',
      'Assuming everything under the ribs is thoracic; the lower ribs cover abdominal organs.',
    ],
    skills: [
      'The bony cage and the thoracic cavity are not the same shape. The lower ribs overlie abdominal organs — a broken left 10th rib threatens the kidney and the spleen — so "under the ribs" does not mean "inside the thorax". The cage reaches further down than the cavity it houses.',
      'The thoracic inlet admits exactly three bony structures — first ribs, first thoracic vertebra, manubrium — and the shoulder girdle is not invited: neither clavicle nor scapula touches the boundary, even though both sit right beside it. The trap answer is the nearest bone, not the boundary bone.',
      'The rib classes are defined by their front end, not their length: 1–7 attach to the sternum by their own cartilage (true), 8–10 share cartilage on the way in (false), 11–12 attach to nothing in front (floating). Same spine behind, three different front ends.',
    ],
    selfCheck: 'From a blank page: the inlet boundaries as the model answer words them, the three rib classes with their numbers, and the broken 10th rib scenario — left kidney and spleen, and what that shows about how far the cage reaches over the abdomen.',
    sourceRefs: [{ ref: 'hss.1.3', location: 'Regional anatomy of the thorax — boundaries, rib classification' }, { ref: 'hss.manual1920', location: 'Submodule 1.3 guiding questions, p.22' }, { ref: 'hss.revans', location: 'Module 1.3 answers; More exercises Module 3' }],
  },
];
