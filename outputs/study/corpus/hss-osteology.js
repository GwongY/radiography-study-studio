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
    id: "hss2011-osteo-vertebra-parts",
    subject: "HSS2011",
    unit: "hss.osteo",
    type: "diagram",
    title: "General anatomical structure of a typical vertebra",
    tags: [
      "osteology",
      "high-yield"
    ],
    boneRefs: [
      "cervical",
      "thoracic",
      "lumbar"
    ],
    lesson: {
      explanation: "Every typical vertebra throughout the cervical, thoracic, and lumbar spine shares a unified architectural blueprint consisting of three fundamental components: an anterior vertebral body, a posterior vertebral arch, and seven projections or processes. The vertebral body (centrum) is a thick, drum-shaped anterior mass of cancellous bone bounded by thin cortical plates that serves as the primary weight-bearing component of the spine. Successive bodies are separated and cushioned by fibrocartilaginous intervertebral discs. Projecting posteriorly from the body is the vertebral arch, constructed on each side by a rounded pedicle (forming the lateral walls and notched superiorly and inferiorly to create intervertebral foramina for exiting spinal nerves) and a flattened lamina (forming the posterior roof). Together, the posterior surface of the body and the vertebral arch completely encircle the vertebral foramen. When articulated, successive vertebral foramina align to form the continuous vertebral canal (spinal canal) transmitting and protecting the spinal cord, its meninges, and vessels. Seven distinct processes arise from the vertebral arch for muscle attachment and joint articulation: (1) a single midline spinous process extending posteriorly and inferiorly from the junction of the two laminae; (2) paired transverse processes projecting laterally from the junction of the pedicles and laminae, providing leverage for deep back muscles and, in the thorax, articulating with ribs; and (3) two superior and two inferior articular processes (zygapophyses) bearing hyaline cartilage-lined articular facets. The inferior articular facets of a superior vertebra articulate with the superior articular facets of the inferior vertebra to form bilateral synovial plane facet (zygapophysial) joints, directing and constraining the direction of spinal movement.",
      plain: "A typical vertebra has three main parts: a heavy vertebral body in front that carries body weight, a protective vertebral arch behind built from two pedicles and two laminae, and the hole in the middle called the vertebral foramen. Seven spikes stick out from the arch: one spinous process pointing straight back, two transverse processes pointing out to the sides, and four articular processes with facets that click together to form facet joints with the vertebrae above and below.",
      keyFacts: [
        "Vertebral body: thick anterior cylindrical mass serving as the primary weight-bearing structure of the spine.",
        "Vertebral arch: posterior bony arch built from paired pedicles and laminae enclosing the vertebral foramen.",
        "Pedicles: stout bilateral bars projecting posteriorly from the body to form the lateral walls of the arch.",
        "Laminae: flattened plates extending posteromedially from the pedicles to complete the arch roof in the posterior midline.",
        "Vertebral foramen: central aperture bounded by body and arch; articulated vertebrae form the spinal canal enclosing the spinal cord.",
        "Intervertebral foramina: lateral openings formed by superior and inferior pedicle notches transmitting spinal nerves and vessels.",
        "Spinous process: single posterior projection from lamina junction for muscle and ligament attachments.",
        "Transverse processes: paired lateral projections from pedicle-lamina junctions.",
        "Articular processes: four per vertebra (2 superior, 2 inferior) forming bilateral synovial facet (zygapophysial) joints."
      ],
      prerequisites: [
        "hss2011-osteo-axial-appendicular"
      ],
      examples: [
        "Degenerative osteoarthritis of lumbar zygapophysial (facet) joints causes osteophyte (bone spur) formation encroaching on the intervertebral foramen, compressing the exiting L5 spinal nerve root and producing sciatica.",
        "Spondylolysis involves a fatigue stress fracture of the pars interarticularis—the narrow bony neck between the superior and inferior articular processes of lumbar vertebrae, most frequently L5."
      ]
    },
    memory: {
      firstLetter: "A vertebra has 3 parts: Body, Arch, Processes — \"B-A-P\" (Bearer, Armor, Projections).",
      mnemonic: "Pedicles Pinch the sides, Laminae Lay the roof, Spinous Sticks straight back.",
      location: "Body is anterior (front); vertebral foramen is in the middle; spinous process is the bump you feel along your spine in back.",
      teachBack: "Draw a superior cross-sectional view of a typical vertebra, identify and label the body, pedicles, laminae, vertebral foramen, spinous process, transverse processes, and articular facets, and trace where the spinal cord travels."
    },
    practice: [
      {
        type: "cloze",
        prompt: "The vertebral body serves as the primary ______ component of the spine.",
        accept: [
          "weight-bearing",
          "weight bearing"
        ],
        explanation: "The vertebral body is the thick anterior cylindrical mass responsible for load-bearing and body weight transmission.",
        src: {
          ref: "hss.m0.1718",
          location: "p21 \"(serves as the primary\" — \"weight-bearing\""
        }
      },
      {
        type: "mcq",
        prompt: "The vertebral arch is formed on each side by which two bony components?",
        options: [
          "Pedicle and lamina",
          "Spinous process and transverse process",
          "Centrum and facet",
          "Odontoid process and arch",
          "Transverse foramen and lamina"
        ],
        answer: 0,
        explanation: "The vertebral arch is built bilaterally by the anterior pedicle and the posterior lamina.",
        src: {
          ref: "hss.manual1920",
          location: "p77 \"B1. Vertebral foramen B2. Pedicle\""
        }
      },
      {
        type: "matching",
        prompt: "Match each part of a typical vertebra to its primary structural role.",
        pairs: [
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
        explanation: "Core anatomical roles of vertebra components from HSS2011 Module 0."
      }
    ],
    application: [
      {
        type: "scenario",
        prompt: "An axial lumbar CT shows marked hypertrophy of the ligamentum flavum and facet osteophytes significantly narrowing the central vertebral foramen. Explain the anatomical boundary of this space and the neurological consequences of this central stenosis.",
        model: "The central vertebral foramen is bounded anteriorly by the posterior aspect of the vertebral body and intervertebral disc, laterally by the pedicles, and posteriorly by the laminae and ligamentum flavum. Severe narrowing (stenosis) of this canal compresses the cauda equina nerve roots traveling within the dural sac, resulting in neurogenic claudication characterized by bilateral buttock and lower extremity pain, heaviness, and numbness exacerbated by lumbar extension.",
        rubric: [
          "States the anatomical boundaries of the vertebral foramen",
          "Identifies the content as the spinal canal / cauda equina / spinal cord",
          "Explains how compression of these structures results in neurological deficits"
        ]
      }
    ],
    commonMistakes: [
      "Confusing pedicle (anterior, connects body to processes) with lamina (posterior, connects processes to midline spinous process).",
      "Believing the spinal cord passes through the intervertebral foramen; the spinal cord passes through the central vertebral canal, while spinal nerves exit through the intervertebral foramina.",
      "Counting 5 processes instead of 7 (1 spinous + 2 transverse + 4 articular = 7 total)."
    ],
    skills: [
      "Identify vertebral pedicles on AP spine radiographs (\"pedicle sign\"): absence of a pedicle (\"winking owl\" sign) indicates osteolytic metastatic cancer.",
      "Recognize facet joint orientation on oblique radiographs: cervical facets slope at 45° in transverse plane; thoracic facets lie coronally; lumbar facets face sagittal plane.",
      "Differentiate vertebral foramen (single central canal opening) from intervertebral foramina (paired bilateral nerve exit channels)."
    ],
    selfCheck: "From memory: name the 3 components of a vertebra, 2 parts of the vertebral arch, 7 processes, and explain how facet joints are formed.",
    visuals: [
      {
        fig: "cervicalVertebrae"
      },
      {
        model: {
          layer: "skeleton",
          meshes: [
            "Vertebra C5",
            "Vertebra T6",
            "Vertebra L3"
          ],
          label: "Vertebra architecture across regions",
          caption: "Vertebral body anteriorly, vertebral arch posteriorly formed by pedicles and laminae, bounding the vertebral foramen."
        }
      },
      {
        gen: true
      }
    ],
    sourceRefs: [
      {
        ref: "hss.4.2",
        location: "p44 \"Vertebral\""
      },
      {
        ref: "hss.m0.1718",
        location: "p21 \"General structures of a vertebra\""
      },
      {
        ref: "hss.m0.1718",
        location: "p21 \"Spinous process\""
      },
      {
        ref: "hss.m0.1718",
        location: "p21 \"Articular\""
      },
      {
        ref: "hss.m0.1718",
        location: "p21 \"Transverse process\""
      },
      {
        ref: "hss.m0.1718",
        location: "p21 \"Vertebral arch\""
      },
      {
        ref: "hss.m0.1718",
        location: "p21 \"Vertebral foramen\""
      },
      {
        ref: "hss.m0.1718",
        location: "p21 \"(serves as the primary\""
      },
      {
        ref: "hss.manual1920",
        location: "p77 \"B1. Vertebral foramen B2. Pedicle\""
      },
      {
        ref: "hss.revans",
        location: "p5 \"B1. Vertebral foramen B2. Pedicle\""
      }
    ]
  },
  {
    id: "hss2011-osteo-vertebral-column",
    subject: "HSS2011",
    unit: "hss.osteo",
    type: "sequence",
    title: "Vertebral column regions and physiological curvatures",
    tags: [
      "osteology",
      "high-yield"
    ],
    boneRefs: [
      "cervical",
      "thoracic",
      "lumbar",
      "sacrum",
      "coccyx"
    ],
    lesson: {
      explanation: "The adult human vertebral column (spine) is a flexible, multi-segmented osseous pillar composed of 26 individual bones organized into five distinct anatomical regions: 7 cervical vertebrae (C1–C7) supporting the head and neck; 12 thoracic vertebrae (T1–T12) articulating with the ribs of the thoracic cage; 5 robust lumbar vertebrae (L1–L5) supporting the lower torso and abdominal weight; the sacrum (formed by 5 fused sacral vertebrae, S1–S5) anchoring the spine to the pelvic girdle at the sacroiliac joints; and the coccyx (tailbone, formed by 3–5, typically 4 fused coccygeal vertebrae, Co1–Co4). In the sagittal plane, the adult column exhibits four natural physiological curvatures essential for shock absorption, balance, and upright bipedal posture. These curves are categorized embryologically into primary and secondary curvatures: (1) Primary curvatures (thoracic curvature and pelvic/sacral curvature) are concave anteriorly (kyphotic). They develop during the embryonic and fetal periods to accommodate the developing thoracic and abdominopelvic viscera. (2) Secondary curvatures (cervical curvature and lumbar curvature) are concave posteriorly (lordotic). They develop compensation after birth: the cervical lordosis develops around 3–4 months when the infant begins to hold its head upright; the lumbar lordosis develops around 12–18 months when the infant begins standing, balancing, and walking upright. Pathological exaggerations of these curves include hyperkyphosis (\"humpback\", excess thoracic curve), hyperlordosis (\"swayback\", excess lumbar curve), and scoliosis (abnormal lateral curvature with vertebral rotation).",
      plain: "The adult spine has 26 bones split into five regions: 7 cervical in the neck, 12 thoracic in the chest, 5 lumbar in the lower back, 1 sacrum (5 fused bones), and 1 coccyx (4 fused bones). From the side, it has four curves: primary curves (thoracic and sacral) curve forward like a fetal C-shape; secondary curves (cervical and lumbar) curve backward, forming after birth when babies learn to hold their heads up and walk.",
      keyFacts: [
        "The adult vertebral column comprises 26 bones: 7 cervical, 12 thoracic, 5 lumbar, 1 sacrum (5 fused), and 1 coccyx (4 fused).",
        "Cervical region: 7 vertebrae (C1–C7); smallest bodies; transverse foramina for vertebral arteries.",
        "Thoracic region: 12 vertebrae (T1–T12); heart-shaped bodies; costal facets for rib articulations.",
        "Lumbar region: 5 vertebrae (L1–L5); largest, massive kidney-shaped bodies for weight-bearing.",
        "Sacrum: 5 fused vertebrae (S1–S5) forming a triangular wedge between the ilia.",
        "Coccyx: 4 fused rudimentary vertebrae (Co1–Co4) forming the terminal tailpiece.",
        "Primary curvatures: thoracic and pelvic (sacral) curves; concave anteriorly; present from the embryonic stage.",
        "Secondary curvatures: cervical and lumbar curves; concave posteriorly (lordotic); develop postnatally with upright posture.",
        "Cervical curve develops at ~3 months when holding head erect; lumbar curve develops at ~12 months with standing and walking."
      ],
      prerequisites: [
        "hss2011-osteo-vertebra-parts"
      ],
      examples: [
        "Osteoporotic wedge compression fractures of mid-thoracic vertebral bodies accentuate the normal thoracic kyphosis, leading to senile hyperkyphosis (\"dowager’s hump\") and compromised respiratory lung volumes.",
        "Late pregnancy increases anterior abdominal mass, causing compensatory hyperlordosis of the lumbar spine to maintain the center of gravity over the feet, frequently producing lower back muscle strain."
      ]
    },
    memory: {
      firstLetter: "Five vertebral regions: Cervical, Thoracic, Lumbar, Sacrum, Coccyx — \"Can The Lady Stand Calmly\".",
      mnemonic: "Meal times for vertebrae counts: Breakfast at 7 AM (Cervical 7), Lunch at 12 PM (Thoracic 12), Dinner at 5 PM (Lumbar 5).",
      comparison: "Primary vs Secondary curves: Primary is Present at birth (Thoracic/Sacral = fetus in C-shape); Secondary develops Second (Cervical lifts head, Lumbar stands up).",
      teachBack: "State the vertebra counts for each of the five regions, sketch the lateral spine profile showing all four curvatures, and classify each curve as primary or secondary with its developmental timing."
    },
    practice: [
      {
        type: "mcq",
        prompt: "Which of the following vertebral curvatures is a primary curvature present from the embryonic stage?",
        options: [
          "Thoracic curvature",
          "Cervical curvature",
          "Lumbar curvature",
          "Cervicothoracic curvature",
          "Lumbosacral lordosis"
        ],
        answer: 0,
        explanation: "The thoracic and pelvic/sacral curvatures are primary curves, concave anteriorly and present during embryonic life.",
        src: {
          ref: "hss.m0.1718",
          location: "p16 \"Thoracic curvature\" — \"(primary curve)\""
        }
      },
      {
        type: "sequence",
        prompt: "Arrange the regions of the vertebral column in craniocaudal order (superior to inferior).",
        items: [
          "Cervical vertebrae (C1–C7)",
          "Thoracic vertebrae (T1–T12)",
          "Lumbar vertebrae (L1–L5)",
          "Sacrum (S1–S5 fused)",
          "Coccyx (Co1–Co4 fused)"
        ],
        explanation: "Anatomical craniocaudal sequence of vertebral column regions from HSS2011 Module 0."
      },
      {
        type: "typed",
        prompt: "How many individual vertebrae fuse together to form the adult sacrum?",
        accept: [
          "5",
          "five"
        ],
        explanation: "The sacrum is formed by the fusion of 5 sacral vertebrae (S1–S5).",
        src: {
          ref: "hss.m0.1718",
          location: "p15 \"Sacrum\" — \"(S1-S5 fused)\""
        }
      }
    ],
    application: [
      {
        type: "scenario",
        prompt: "A lateral full-spine radiograph of an adolescent with back pain demonstrates abnormal posterior convexity of 65° in the thoracic spine (normal: 20°–40°) and excessive anterior convexity in the lumbar spine. Name the primary and secondary curvatures involved, classify each curve embryologically, and identify the deformities.",
        model: "The thoracic spine demonstrates hyperkyphosis, which is an excessive exaggeration of the normal primary thoracic curvature (concave anteriorly / convex posteriorly, developed embryologically). The lumbar spine demonstrates compensatory hyperlordosis, which is an accentuation of the secondary lumbar curvature (concave posteriorly / convex anteriorly, developed postnatally with walking). The compensatory lumbar lordosis serves to keep the head aligned vertically over the pelvis despite the severe thoracic kyphosis.",
        rubric: [
          "Identifies thoracic curvature as a primary curvature",
          "Identifies lumbar curvature as a secondary curvature",
          "Correctly describes kyphosis and lordosis directions and developmental timing"
        ]
      }
    ],
    commonMistakes: [
      "Confusing primary (anteriorly concave, thoracic & sacral) with secondary (posteriorly concave, cervical & lumbar).",
      "Counting 33 separate bones in an adult column instead of 26 (due to fusion of sacrum and coccyx).",
      "Mixing thoracic (12) and cervical (7) vertebrae counts; use the mealtime mnemonic 7, 12, 5."
    ],
    skills: [
      "Count and identify vertebral levels on spine radiographs: C7 has the longest spinous process, T12 articulates with the last rib, L5 sits atop the sacral promontory.",
      "Evaluate spinal alignment on lateral radiographs using the Cobb angle method to quantify degrees of lordosis and kyphosis.",
      "Recognize developmental milestones reflected in the spine: head control produces cervical lordosis, weight-bearing bipedal walking produces lumbar lordosis."
    ],
    selfCheck: "From memory: list the bone count for all 5 regions, state which curves are primary vs secondary, give the direction of concavity for each, and explain why the adult column has 26 bones.",
    visuals: [
      {
        fig: "cervicalVertebrae"
      },
      {
        model: {
          layer: "skeleton",
          meshes: [
            "Atlas (C1)",
            "Axis (C2)",
            "Vertebra C5",
            "Vertebra T6",
            "Vertebra L3",
            "Sacrum",
            "Coccyx"
          ],
          label: "Articulated vertebral column",
          caption: "The 26 vertebral column bones demonstrating alternating lordotic (secondary) and kyphotic (primary) curvatures."
        }
      },
      {
        gen: true
      }
    ],
    sourceRefs: [
      {
        ref: "hss.m0.1718",
        location: "p15 \"Vertebral column\""
      },
      {
        ref: "hss.m0.1718",
        location: "p15 \"Cervical vertebrae\""
      },
      {
        ref: "hss.m0.1718",
        location: "p15 \"Thoracic vertebrae\""
      },
      {
        ref: "hss.m0.1718",
        location: "p15 \"Lumbar vertebrae\""
      },
      {
        ref: "hss.m0.1718",
        location: "p15 \"Sacrum\""
      },
      {
        ref: "hss.m0.1718",
        location: "p15 \"(Co1 – Co4 fused)\""
      },
      {
        ref: "hss.m0.1718",
        location: "p16 \"Primary curvature\""
      },
      {
        ref: "hss.m0.1718",
        location: "p16 \"- concave anteriorly\""
      },
      {
        ref: "hss.m0.1718",
        location: "p16 \"- developed during embryonic stage\""
      },
      {
        ref: "hss.m0.1718",
        location: "p16 \"Secondary curvature\""
      },
      {
        ref: "hss.m0.1718",
        location: "p16 \"- concave posteriorly\""
      },
      {
        ref: "hss.m0.1718",
        location: "p16 \"- developed after birth\""
      },
      {
        ref: "hss.manual1920",
        location: "p59 \"Cervical Curvature\""
      }
    ]
  },
  {
    id: "hss2011-osteo-c1-c2",
    subject: "HSS2011",
    unit: "hss.osteo",
    type: "comparison",
    title: "Atlas (C1), axis (C2), and craniovertebral joint biomechanics",
    tags: [
      "osteology",
      "high-yield"
    ],
    boneRefs: [
      "cervical",
      "cranium"
    ],
    lesson: {
      explanation: "The upper cervical spine possesses unique specialized adaptations designed to support the cranium while permitting wide-ranging head mobility. Among the 7 cervical vertebrae, three are classified as atypical: C1 (atlas), C2 (axis), and C7 (vertebra prominens with a long non-bifid spinous process). Typical cervical vertebrae (C3–C6) feature small transverse bodies, bifid spinous processes, and bilateral transverse foramina (foramina transversaria) through which the vertebral arteries and veins ascend to enter the skull via the foramen magnum. The atlas (C1) is unique because it completely lacks a vertebral body and a spinous process; instead, it forms an osseous ring composed of a delicate anterior arch (bearing an anterior tubercle), a wider posterior arch (bearing a posterior tubercle and a groove for the vertebral artery), and two bulky lateral masses. The superior articular facets of the lateral masses are elongated, concave, and kidney-shaped, articulating with the convex occipital condyles at the bilateral atlanto-occipital joints. These synovial condylar joints allow flexion and extension of the head—the nodding movement meaning \"YES\". The axis (C2) acts as the rotational axis for the head, characterized by the dens (odontoid process)—a robust tooth-like peg projecting superiorly from its vertebral body that embryologically represents the missing centrum of C1. The dens articulates anteriorly with the facet on the posterior surface of C1’s anterior arch, and is secured firmly posteriorly against the atlas by the transverse ligament of the atlas, a strong collagenous band stretching between tubercles on the medial surfaces of the lateral masses. This arrangement forms the median atlantoaxial joint, a synovial pivot joint that, combined with the paired lateral atlantoaxial plane joints, allows rotational movement of the head—the shaking movement meaning \"NO\". The transverse ligament is clinically vital: if torn by trauma or eroded by rheumatoid arthritis, the dens displaces posteriorly into the vertebral canal, compressing the upper cervical spinal cord or medulla oblongata with fatal consequences.",
      plain: "The top two neck bones are built for head movement. C1 (Atlas) is a ring with no body or spinous process; its bowl-shaped facets cradle the skull at the atlanto-occipital joint, letting you nod \"YES\". C2 (Axis) has an upright tooth called the dens (odontoid process) that sticks up into the C1 ring. C1 spins around the dens like a wheel on an axle at the atlantoaxial joint, letting you shake your head \"NO\". The heavy transverse ligament holds the dens in place so it cannot smash backwards into the spinal cord.",
      keyFacts: [
        "The cervical spine contains 7 vertebrae (C1–C7); 3 are atypical: C1 (atlas), C2 (axis), and C7 (vertebra prominens).",
        "All cervical vertebrae feature transverse foramina transmitting vertebral arteries (C1–C6) and veins.",
        "Atlas (C1) lacks a vertebral body and spinous process, consisting of anterior arch, posterior arch, and lateral masses.",
        "Atlanto-occipital joint: between superior articular facets of C1 and occipital condyles; condylar synovial joint allowing flexion/extension (nodding \"YES\").",
        "Axis (C2): carries the dens (odontoid process), representing the fused centrum of C1.",
        "Median atlantoaxial joint: pivot synovial joint between dens and anterior arch of C1; permits rotation of the head (shaking \"NO\").",
        "Transverse ligament of atlas: strong ligament spanning C1 lateral masses that keeps dens seated and protects the cervical spinal cord.",
        "Typical cervical vertebrae (C2–C6) possess bifid spinous processes.",
        "C7 (vertebra prominens) features a long, prominent, non-bifid spinous process that is easily palpable at the base of the neck."
      ],
      prerequisites: [
        "hss2011-osteo-vertebral-column"
      ],
      examples: [
        "An open-mouth \"peg\" (odontoid) radiograph is routinely obtained in trauma cases to visualize the dens between the lateral masses of C1, checking for type I, II, or III odontoid peg fractures.",
        "In severe rheumatoid arthritis, chronic synovial inflammation of the atlantoaxial joint weakens the transverse ligament of the atlas, causing atlantoaxial subluxation and progressive cervical myelopathy during head flexion."
      ]
    },
    memory: {
      firstLetter: "C1 and C2 names: Atlas carries the globe (like Titan Atlas); Axis is the spindle it spins around.",
      comparison: "Joint movements: Atlanto-Occipital = \"YES\" (nodding / flexion); Atlanto-Axial = \"NO\" (shaking / rotation). \"O\" in Occipital looks like an approving nod \"O-K\".",
      location: "C1 is the highest bone in your neck directly under your ears; C7 is the big knobby bone at the base of your neck that sticks out when you bend your chin to your chest.",
      teachBack: "Explain why C1 has no body, identify what the dens represents embryologically, name the ligament holding the dens, and contrast the exact movements allowed at the atlanto-occipital versus atlantoaxial joints."
    },
    practice: [
      {
        type: "cloze",
        prompt: "The transverse ligament holds the atlas and the ______ of the axis in place.",
        accept: [
          "odontoid process",
          "dens",
          "odontoid process (dens)",
          "dens (odontoid process)"
        ],
        explanation: "The transverse ligament of the atlas binds the dens (odontoid process) of C2 firmly against the anterior arch of C1.",
        src: {
          ref: "hss.manual1920",
          location: "p48 \"3. The transverse ligament holds the atlas and the ______ of the axis in place.\""
        }
      },
      {
        type: "mcq",
        prompt: "The atlanto-occipital joint between the occipital condyles and C1 allows which primary head movement?",
        options: [
          "Flexion and extension (nodding \"yes\")",
          "Axial rotation (shaking \"no\")",
          "Lateral gliding",
          "Circumduction only",
          "Lateral abduction only"
        ],
        answer: 0,
        explanation: "The atlanto-occipital joint allows sagittal flexion and extension of the head (nodding \"YES\").",
        src: {
          ref: "hss.m0.1718",
          location: "p29 \"The atlanto-occipital joint allows flexion and extension. (YES!!!)\""
        }
      },
      {
        type: "cloze",
        prompt: "The articulation between the first cervical vertebra (C1) and second cervical vertebra (C2) is called the ______ joint.",
        accept: [
          "atlantoaxial",
          "atlantoaxial joint",
          "atlanto-axial",
          "atlanto-axial joint"
        ],
        explanation: "The articulation between C1 (atlas) and C2 (axis) is the atlantoaxial joint.",
        src: {
          ref: "hss.fib5yr",
          location: "p24 \"The articulation between the between the first cervical vertebra and second cervical\" — \"atlantoaxial joint.\""
        }
      },
      {
        type: "matching",
        prompt: "Match each specialized cervical vertebra or feature to its unique characteristic.",
        pairs: [
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
        explanation: "Key structural specializations of the cervical vertebrae from HSS2011 Module 4.2."
      }
    ],
    application: [
      {
        type: "scenario",
        prompt: "A motor vehicle collision victim suffers a hyperflexion cervical spine injury. A lateral cervical radiograph demonstrates an anterior atlanto-dens interval (AADI) of 6 mm (normal adult: <3 mm). Identify the damaged stabilizing structure, the mechanism, and why this is life-threatening.",
        model: "An AADI greater than 3 mm indicates rupture or severe disruption of the transverse ligament of the atlas. This ligament normally secures the odontoid process (dens) of C2 firmly against the anterior arch of C1. When the transverse ligament is torn, the atlas slides anteriorly relative to the axis during neck flexion, causing the rigid dens to displace posteriorly into the anterior vertebral canal, where it directly compresses the upper cervical spinal cord or medulla oblongata, risking quadriplegia or fatal respiratory arrest from phrenic nerve impairment.",
        rubric: [
          "Identifies rupture of the transverse ligament of the atlas",
          "Explains the displacement of the dens / atlas relative to each other",
          "States the risk of spinal cord / brainstem compression resulting in paralysis or death"
        ]
      }
    ],
    commonMistakes: [
      "Attributing head rotation (\"no\") to the atlanto-occipital joint instead of the atlantoaxial joint.",
      "Thinking the atlas (C1) has a prominent spinous process; C1 has NO spinous process and NO body.",
      "Forgetting that vertebral arteries ascend through transverse foramina of C1–C6 before entering the foramen magnum."
    ],
    skills: [
      "Assess the atlanto-dens interval (ADI) on lateral cervical spine radiographs: normal is <3 mm in adults (<5 mm in children).",
      "Evaluate the open-mouth peg radiograph: verify equal bilateral spaces between the dens and the lateral masses of C1.",
      "Palpate surface anatomy: identify C7 vertebra prominens as the most prominent spinous process at the cervicothoracic junction."
    ],
    selfCheck: "From memory: describe how C1 and C2 differ from typical vertebrae, name the joint and movement for nodding vs shaking the head, and state the function of the transverse ligament.",
    visuals: [
      {
        fig: "cervicalVertebrae"
      },
      {
        model: {
          layer: "skeleton",
          meshes: [
            "Atlas (C1)",
            "Axis (C2)",
            "Vertebra C5"
          ],
          label: "Upper cervical craniovertebral complex",
          caption: "Atlas (C1) ring pivoting on the odontoid process (dens) of axis (C2), secured by the transverse ligament."
        }
      },
      {
        gen: true
      }
    ],
    sourceRefs: [
      {
        ref: "hss.4.2",
        location: "p42 \"7 vertebrae in cervical region\""
      },
      {
        ref: "hss.4.2",
        location: "p42 \"3 atypical (C1, C2, and C7)\""
      },
      {
        ref: "hss.4.2",
        location: "p43 \"Atlantoaxial Joint\""
      },
      {
        ref: "hss.4.2",
        location: "p43 \"Dens (Odontoid process)\""
      },
      {
        ref: "hss.m0.1718",
        location: "p28 \"The vertebral arteries pass through the transverse foramina\""
      },
      {
        ref: "hss.m0.1718",
        location: "p28 \"Bifid spinous\""
      },
      {
        ref: "hss.m0.1718",
        location: "p29 \"The atlanto-occipital joint allows flexion and extension. (YES!!!)\""
      },
      {
        ref: "hss.m0.1718",
        location: "p29 \"The median atlanto-axial joint allows rotation of the head. (NO!!!)\""
      },
      {
        ref: "hss.manual1920",
        location: "p48 \"3. The transverse ligament holds the atlas and the ______ of the axis in place.\""
      },
      {
        ref: "hss.manual1920",
        location: "p75 \"3. Odontoid process (dens)\""
      },
      {
        ref: "hss.fib5yr",
        location: "p24 \"The articulation between the between the first cervical vertebra and second cervical\""
      },
      {
        ref: "hss.fib5yr",
        location: "p24 \"atlantoaxial joint.\""
      }
    ]
  },
  {
    id: "hss2011-osteo-skull-sutures",
    subject: "HSS2011",
    unit: "hss.osteo",
    type: "definition",
    title: "Skull bones, cranial sutures, and anthropological landmarks",
    tags: [
      "osteology",
      "skull",
      "high-yield"
    ],
    boneRefs: [
      "cranium",
      "mandible"
    ],
    lesson: {
      explanation: "The human skull is a complex skeletal structure composed of 22 bones (8 cranial bones and 14 facial bones) joined together by immovable fibrous joints called sutures, along with 7 associated bones (6 auditory ossicles and 1 hyoid bone). The 8 cranial bones (neurocranium)—occipital, frontal, sphenoid, ethmoid, and paired parietal and temporal bones—enclose the cranial cavity housing the brain, meninges, and proximal cranial nerves. The 14 facial bones (viscerocranium)—maxillae, palatines, nasals, inferior nasal conchae, zygomatics, lacrimals (all paired), and unpaired vomer and mandible—form the anterior architectural framework for the face, orbits, nasal cavities, and mastication. Sutures articulate by interlocking interdigitating processes bound by dense fibrous connective tissue. Four prominent calvarial sutures are tested: (1) the coronal suture between the frontal bone anteriorly and the paired parietal bones posteriorly; (2) the sagittal suture along the superior midline between the two parietal bones; (3) the lambdoid suture posteriorly between the parietal bones and the occipital bone; and (4) the squamous suture bilaterally between the lower border of each parietal bone and the squamous part of the temporal bone. Anthropological and craniometric junction points mark where sutures converge: bregma marks the anterior midline junction of the coronal and sagittal sutures (site of the infant anterior fontanelle, closing at ~18–24 months); lambda marks the posterior midline junction of the sagittal and lambdoid sutures (site of the posterior fontanelle, closing at ~2–3 months); and pterion marks the critical H-shaped junction of frontal, parietal, greater wing of sphenoid, and temporal bones in the temporal fossa, directly overlying the anterior division of the middle meningeal artery.",
      plain: "The skull has 22 bones joined by immovable interlocking seams called sutures: 8 cranial bones forming the brain box and 14 facial bones building the face. The four main sutures are the coronal (front-to-back across the top), sagittal (down the middle), lambdoid (arched across the back like a Greek lambda), and squamous (scaly overlap on the sides). Bregma is where coronal meets sagittal in front, lambda is where sagittal meets lambdoid at the back, and pterion is the thin temple junction over the middle meningeal artery.",
      keyFacts: [
        "The skull consists of 22 bones: 8 cranial bones (neurocranium) + 14 facial bones (viscerocranium), plus 7 associated bones (hyoid and 6 ossicles).",
        "The 8 cranial bones: frontal, occipital, sphenoid, ethmoid (unpaired), and parietal and temporal (paired).",
        "The 14 facial bones: maxilla, zygomatic, nasal, lacrimal, palatine, inferior nasal concha (paired), and vomer and mandible (unpaired).",
        "The mandible is the only movable bone of the adult skull, articulating at the bilateral temporomandibular joints (TMJ).",
        "Coronal suture: joins frontal bone anteriorly with the two parietal bones posteriorly.",
        "Sagittal suture: runs in the sagittal midline uniting the two parietal bones.",
        "Lambdoid suture: arches across the posterior calvaria uniting the parietal bones with the occipital bone.",
        "Squamous suture: beveled joint uniting the inferior margin of the parietal bone with the squamous temporal bone.",
        "Bregma: intersection of the coronal suture and sagittal suture (site of anterior fontanelle).",
        "Lambda: intersection of the sagittal suture and lambdoid suture (site of posterior fontanelle).",
        "Pterion: H-shaped craniometric junction of frontal, parietal, temporal, and sphenoid bones over the anterior branch of the middle meningeal artery."
      ],
      prerequisites: [
        "hss2011-osteo-axial-appendicular"
      ],
      examples: [
        "A blunt blow to the pterion from a baseball bat fractures the thin temporal bone squama and lacerates the underlying anterior branch of the middle meningeal artery, causing an acute epidural (extradural) hematoma that presents with a lucid interval followed by rapid uncal herniation.",
        "Pediatric cranial ultrasound evaluates ventricular dilation by transmitting acoustic waves through the acoustic window of the open anterior fontanelle at the bregma prior to suture closure."
      ]
    },
    memory: {
      firstLetter: "Four major sutures: Coronal, Sagittal, Lambdoid, Squamous — \"Crown, Straight, Lambda, Side\".",
      location: "Put a crown on your head: the coronal suture is where the front of the crown sits; the sagittal suture runs straight back like an arrow; lambdoid arches across the back of your head; squamous is the scaly side seam above each ear.",
      comparison: "Bregma vs Lambda: Bregma is in front (like Brain / Brow / Big fontanelle); Lambda is in the back (resembles Greek letter \\u039b and posterior fontanelle).",
      teachBack: "Sketch the top and lateral views of the skull, draw and label the coronal, sagittal, lambdoid, and squamous sutures, mark bregma, lambda, and pterion, and explain the lethal consequence of trauma to the pterion."
    },
    practice: [
      {
        type: "mcq",
        prompt: "Which suture joins the parietal bone and temporal bone together?",
        options: [
          "Squamous suture",
          "Coronal suture",
          "Lambdoid suture",
          "Sagittal suture",
          "Frontonasal suture"
        ],
        answer: 0,
        explanation: "The squamous suture joins the lower beveled edge of the parietal bone with the squamous portion of the temporal bone.",
        src: {
          ref: "hss.manual1920",
          location: "p46 \"2. Which suture joint the parietal bone and temporal together?\" — \"A. Squamous suture\""
        }
      },
      {
        type: "cloze",
        prompt: "The junction between the coronal suture and sagittal suture is called the ______.",
        accept: [
          "bregma",
          "Bregma"
        ],
        explanation: "Bregma is the craniometric landmark where the coronal and sagittal sutures intersect.",
        src: {
          ref: "hss.fib5yr",
          location: "p18 \"bregma.\""
        }
      },
      {
        type: "mcq",
        prompt: "The adult human skull is composed of how many cranial and facial bones?",
        options: [
          "8 cranial bones and 14 facial bones",
          "14 cranial bones and 8 facial bones",
          "6 cranial bones and 16 facial bones",
          "10 cranial bones and 12 facial bones",
          "12 cranial bones and 10 facial bones"
        ],
        answer: 0,
        explanation: "The skull consists of 8 cranial bones enclosing the brain and 14 facial bones forming the facial skeleton (22 bones total).",
        src: {
          ref: "hss.4.2",
          location: "p5 \"8 cranial bones +\" — \"14 facial bones.\""
        }
      },
      {
        type: "matching",
        prompt: "Match each cranial suture and anthropological landmark to its articulating bones or boundaries.",
        pairs: [
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
        explanation: "Verified suture articulations from HSS2011 Module 4.2 slides 8–10."
      }
    ],
    application: [
      {
        type: "scenario",
        prompt: "An emergency CT scan of a patient struck on the temple demonstrates a biconvex (lens-shaped) hyperdense extra-axial collection beneath the pterion. Name the landmark, the four articulating bones meeting there, and the specific blood vessel damaged.",
        model: "The landmark is the pterion, an H-shaped suture junction in the temporal fossa where four bones articulate: the frontal bone, parietal bone, squamous part of the temporal bone, and greater wing of the sphenoid bone. Trauma to this thin region lacerates the anterior division of the middle meningeal artery running in an osseous groove on the internal cranial table, producing an arterial epidural hematoma that classically assumes a biconvex lentiform shape because it is bounded by suture attachments of the dura mater.",
        rubric: [
          "Identifies the landmark as pterion",
          "Lists the 4 articulating bones: frontal, parietal, temporal, and sphenoid",
          "Identifies the anterior branch of the middle meningeal artery and epidural hematoma"
        ]
      }
    ],
    commonMistakes: [
      "Confusing bregma (coronal + sagittal, anterior) with lambda (sagittal + lambdoid, posterior).",
      "Listing the mandible as immovable; it is the only freely movable bone in the adult skull (at the TMJ).",
      "Mixing cranial and facial bone counts: cranium has 8 bones; face has 14 bones."
    ],
    skills: [
      "Identify cranial sutures on skull radiographs (lateral, AP, and Towne projections) to avoid mistaking normal serrate suture lines for linear skull fractures.",
      "Palpate the calvarial landmarks: coronal seam behind forehead, sagittal crest in midline, lambda above external occipital protuberance.",
      "Remember the clinical vulnerability of the pterion: thin skull bone over a high-pressure meningeal artery."
    ],
    selfCheck: "From memory: list all 8 cranial bones and 14 facial bones, describe the exact course of the four sutures, define bregma and lambda, and explain the pterion and middle meningeal artery.",
    visuals: [
      {
        fig: "skullLateralView"
      },
      {
        model: {
          layer: "skeleton",
          meshes: [
            "Frontal bone",
            "Parietal bone",
            "Temporal bone",
            "Occipital bone",
            "Sphenoid bone",
            "Zygomatic bone",
            "Mandible"
          ],
          label: "Lateral skull architecture",
          caption: "Calvarial plates meeting at the coronal, squamous, and lambdoid sutures, with pterion at the sphenoparietal junction."
        }
      },
      {
        gen: true
      }
    ],
    sourceRefs: [
      {
        ref: "hss.4.2",
        location: "p5 \"The skull is composed of\""
      },
      {
        ref: "hss.4.2",
        location: "p5 \"8 cranial bones +\""
      },
      {
        ref: "hss.4.2",
        location: "p5 \"14 facial bones.\""
      },
      {
        ref: "hss.4.2",
        location: "p8 \"22 bones joined by Sutures\""
      },
      {
        ref: "hss.4.2",
        location: "p9 \"Major Sutures and Anthropological Points\""
      },
      {
        ref: "hss.4.2",
        location: "p9 \"Bregma\""
      },
      {
        ref: "hss.4.2",
        location: "p9 \"Lambda\""
      },
      {
        ref: "hss.4.2",
        location: "p10 \"Squamous suture\""
      },
      {
        ref: "hss.manual1920",
        location: "p46 \"2. Which suture joint the parietal bone and temporal together?\""
      },
      {
        ref: "hss.manual1920",
        location: "p46 \"A. Squamous suture\""
      },
      {
        ref: "hss.fib5yr",
        location: "p18 \"The [56] squamous suture joins the parietal bone and the temporal bone of the skull\""
      },
      {
        ref: "hss.fib5yr",
        location: "p18 \"bregma.\""
      }
    ]
  },
  {
    id: 'hss2011-osteo-pelvic-girdle',
    subject: 'HSS2011', unit: 'hss.osteo', type: 'definition',
    title: 'Pelvic girdle, hip joint, and the proximal and distal femur',
    tags: ['osteology', 'lower limb', 'high-yield', 'foundation'],
    boneRefs: ['pelvis', 'femur', 'sacrum'],
    lesson: {
      explanation: 'The appendicular pelvic girdle connects the axial vertebral column to the lower appendicular skeleton, transmitting upper body weight to the lower extremities during standing and ambulation. The bony pelvis is formed by the right and left hip bones (os coxae), which articulate posteriorly with the sacrum at the sacroiliac joints and anteriorly with each other at the fibrocartilaginous pubic symphysis. Each adult hip bone is formed by the fusion of three separate embryological bones: the ilium superiorly, the ischium posteroinferiorly, and the pubis anteroinferiorly. The ilium is the largest component, featuring the broad iliac crest, anterior superior iliac spine (ASIS), anterior inferior iliac spine (AIIS), and the large shallow iliac fossa. The ischium forms the robust inferior-posterior section, characterized by the ischial tuberosity (the primary weight-bearing bony prominence when sitting), the ischial spine, and the greater and lesser sciatic notches. The pubis forms the anterior part, comprising superior and inferior pubic rami meeting at the pubic body; between the ischium and pubis lies the large obturator foramen. The ilium, ischium, and pubis converge and fuse solidly within the acetabulum, a deep, cup-shaped hemispherical socket on the lateral aspect of the hip bone. The head of the femur articulates with the acetabulum of the hip bone to form the hip joint, an exceptionally stable, weight-bearing ball-and-socket synovial joint that prioritizes stability over extreme mobility. Proximally, the femur features a rounded articular head directed medially and superiorly, connected to the shaft by an elongated neck that angles inferolaterally at a critical angle of inclination with the shaft (normally ~125° in adults). At the junction of the neck and shaft sit two prominent muscle attachment sites: the large, lateral Greater trochanter (inserting gluteus medius and minimus) and the smaller, posteromedial Lesser trochanter (inserting iliopsoas). Distally, the femoral shaft expands into two massive articular condyles: the Medial condyle and Lateral condyle, which articulate with the tibial plateau and patella at the knee joint. The plane of the pelvic inlet is defined by the sacral promontory, the pelvic brim, and the superior margin of the pubic symphysis, while the pelvic outlet is bounded by the tip of the coccyx and the inferior margin of the pubic symphysis. Sexual dimorphism in the bony pelvis is marked: the male pelvis is narrower, rougher, and more robust with a heart-shaped inlet, narrow outlet, vertical ilium, and an acute pubic angle under 90°; the female pelvis is broader, smoother, and lighter with an open circular inlet, enlarged outlet, shallower iliac fossa, and a wide pubic angle of 100° or more adapted for childbirth.',
      plain: 'The hip bone is built from three fused bones: ilium (the hip crest you rest hands on), ischium (the sit-bone you sit on), and pubis (the front joint). All three meet in the acetabulum, the deep socket that receives the round head of the femur to make the stable ball-and-socket hip joint. The femur has a neck, greater and lesser trochanters for muscle attachment, and medial and lateral condyles at the knee. The female pelvis is wider, smoother, and lighter with a broad pubic angle (100°+) and circular inlet for childbirth; the male pelvis is narrower and heavier with an acute pubic angle (<90°).',
      keyFacts: [
        'Three bones form each hip bone: ilium, ischium, and pubis; they meet and fuse in the acetabulum.',
        'The head of the femur articulates with the acetabulum of the hip bone to form the hip joint.',
        'Proximal femur landmarks: head, neck, greater trochanter (lateral), lesser trochanter (medial), angle of inclination (~125°).',
        'Distal femur landmarks: medial condyle and lateral condyle (articulate with tibia and patella).',
        'Pelvic inlet boundaries: sacral promontory, pelvic brim, and superior margin of the pubic symphysis.',
        'Pelvic outlet boundaries: tip of coccyx and inferior margin of the pubic symphysis.',
        'Female pelvis: broader, smoother, lighter, circular inlet, enlarged outlet, pubic angle 100° or more.',
        'Male pelvis: narrower, rougher, heavier, heart-shaped inlet, narrow outlet, pubic angle under 90°.',
        'Gluteus medius is a key hip abductor inserting onto the greater trochanter (superior gluteal nerve).'
      ],
      prerequisites: ['hss2011-osteo-axial-appendicular', 'hss2011-joints-classification'],
      examples: [
        'A subcapital neck-of-femur fracture in an elderly patient disrupts retinacular blood vessels supplying the femoral head, risking avascular necrosis because the neck lies inside the hip joint capsule.',
        'Forensic skeletal identification determines biological sex by inspecting the subpubic angle (>100° in females vs <90° in males) and the shape of the pelvic inlet (circular vs heart-shaped).'
      ]
    },
    memory: {
      firstLetter: 'Three hip bones: Ilium, Ischium, Pubis — "I, I, P" (top, back-bottom, front-bottom).',
      comparison: 'Hip vs Shoulder socket: Acetabulum is deep and enclosed for weight-bearing stability; glenoid cavity is shallow for maximum mobility.',
      location: 'Rest your hands on your hips = iliac crest; sit in a chair = ischial tuberosity; front midline join = pubic symphysis.',
      teachBack: 'Explain why the angle of inclination of the femoral neck is clinically critical, and contrast four structural differences between male and female pelvises.'
    },
    practice: [
      {
        type: 'mcq',
        prompt: 'The head of the femur articulates with which anatomical socket?',
        options: [
          'Acetabulum',
          'Glenoid cavity',
          'Acromion',
          'Greater trochanter',
          'Medial condyle'
        ],
        answer: 0,
        explanation: 'The head of femur articulates with the acetabulum of the hip bone. The glenoid cavity is the shoulder socket.',
        src: {
          ref: 'hss.manual1920',
          location: 'p46 "9. The head of femur articulates with" — "A. Acetabulum"'
        }
      },
      {
        type: 'cloze',
        prompt: 'The three bones that fuse to form the hip bone are the ______, ______ and ______.',
        accept: [
          'ilium, ischium, pubis',
          'ilium; ischium; pubis',
          'ilium ischium pubis'
        ],
        explanation: 'The three bones forming the hip bone are ilium, ischium, and pubis, converging in the acetabulum.',
        src: {
          ref: 'hss.fib5yr',
          location: 'p25 "There are three bones forming the hip bone, including ilium,"'
        }
      },
      {
        type: 'mcq',
        prompt: 'Which of the following muscles is a major hip abductor?',
        options: [
          'Gluteus medius',
          'Tibialis anterior',
          'Adductor magnus',
          'Gastrocnemius',
          'Rectus femoris'
        ],
        answer: 0,
        explanation: 'Gluteus medius is a powerful hip abductor innervated by the superior gluteal nerve.',
        src: {
          ref: 'hss.manual1920',
          location: 'p46 "10. Which of the following muscle is a hip abductor?" — "A. Gluteus medius"'
        }
      },
      {
        type: 'matching',
        prompt: 'Match each pelvic feature to its verified sexual dimorphism characteristics.',
        pairs: [
          [
            'General appearance of female pelvis',
            'Broader, smoother, less robust'
          ],
          [
            'General appearance of male pelvis',
            'Narrower, rougher, more robust'
          ],
          [
            'Female pubic angle',
            '100º or more'
          ],
          [
            'Male pubic angle',
            'Under 90º'
          ]
        ],
        explanation: 'Verified sex differences in the bony pelvis from HSS2011 Module 2.3 slide 43.'
      }
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'An emergency AP pelvis radiograph of an elderly fall victim reveals a displaced fracture across the femoral neck. Describe the anatomical relationship between the fracture site, the femoral head, and the greater and lesser trochanters, and explain the joint stability consequences.',
        model: 'The neck of the femur is the constricted pyramidal bar of bone connecting the spherical femoral head to the shaft, situated medial and superior to the greater trochanter and superior to the lesser trochanter. Because the head is anchored deep inside the acetabulum by the acetabular labrum and joint capsule, a displaced neck fracture completely disconnects the weight-bearing femoral head from the shaft, causing characteristic external rotation and shortening of the injured lower limb.',
        rubric: [
          'Correctly positions the femoral neck between the head and the trochanters',
          'Identifies the head seating inside the acetabulum of the hip bone',
          'Explains the consequence of separating the articulating head from the shaft'
        ]
      }
    ],
    commonMistakes: [
      'Confusing the acetabulum (hip socket) with the glenoid cavity (shoulder socket).',
      'Listing the sacrum as one of the three bones forming the hip bone; the sacrum is an axial bone articulating at the sacroiliac joint, not a part of the hip bone itself.',
      'Swapping male and female pubic angles: females have a wide arch (100° or more); males have an acute V-shape (under 90°).'
    ],
    skills: [
      'Distinguish hip versus shoulder ball-and-socket joints: acetabulum is deep and bony for load transmission; glenoid is shallow and dependent on rotator cuff tendons for mobility.',
      'Remember the three hip bone components by everyday touch: ilium is the hands-on-hips crest, ischium is the sit-bone tuberosity, pubis is the front midline joint.',
      'Assess pelvic sex dimorphism rapidly by pubic angle: spread thumb and index finger wide (>100°) = female; make an acute V (<90°) = male.'
    ],
    selfCheck: 'From memory: name the three bones forming the hip bone, the socket for the femoral head, four proximal femoral landmarks, boundaries of pelvic inlet and outlet, and four sexual dimorphic differences.',
    visuals: [
      {
        fig: 'maleFemalePelvis'
      },
      {
        model: {
          layer: 'skeleton',
          meshes: [
            'Hip bone',
            'Sacrum',
            'Coccyx',
            'Femur'
          ],
          label: 'Pelvis and proximal femur',
          caption: 'The two hip bones meeting anteriorly at the pubic symphysis and articulating posteriorly with the sacrum; the femoral head seats deep in the acetabulum.'
        }
      },
      {
        gen: true
      }
    ],
    sourceRefs: [
      {
        ref: 'hss.4.3',
        location: 'p37 "Pelvic Girdle"'
      },
      {
        ref: 'hss.4.3',
        location: 'p38 "Femur (Right)"'
      },
      {
        ref: 'hss.4.3',
        location: 'p38 "Greater trochanter"'
      },
      {
        ref: 'hss.4.3',
        location: 'p38 "Neck"'
      },
      {
        ref: 'hss.4.3',
        location: 'p38 "Lesser trochanter"'
      },
      {
        ref: 'hss.4.3',
        location: 'p38 "Medial condyle"'
      },
      {
        ref: 'hss.4.3',
        location: 'p38 "Lateral condyle"'
      },
      {
        ref: 'hss.4.3',
        location: 'p39 "Proximal End of Femur"'
      },
      {
        ref: 'hss.4.3',
        location: 'p39 "Angle of inclination"'
      },
      {
        ref: 'hss.3.3.2019',
        location: 'p17 "The plane of Pelvic inlet is defined by the sacral promontory"'
      },
      {
        ref: 'hss.3.3.2019',
        location: 'p17 "The plane of Pelvic outlet is defined by the tip of coccyx and inferior margin of pubic symphysis."'
      },
      {
        ref: 'hss.3.3.2019',
        location: 'p44 "Sex differences in the Bony Pelvis"'
      },
      {
        ref: 'hss.3.3.2019',
        location: 'p44 "Narrower, rougher, more robust General Appearance Broader, smoother, less robust"'
      },
      {
        ref: 'hss.3.3.2019',
        location: 'p44 "Under 90º Pubic angle 100º or more"'
      },
      {
        ref: 'hss.fib5yr',
        location: 'p26 "There are three bones forming the hip bone, including ilium,"'
      },
      {
        ref: 'hss.fib5yr',
        location: 'p26 "The head of femur articulates with the"'
      },
      {
        ref: 'hss.manual1920',
        location: 'p47 "9. The head of femur articulates with"'
      },
      {
        ref: 'hss.manual1920',
        location: 'p47 "A. Acetabulum"'
      }
    ]
  },
  {
    id: 'hss2011-osteo-leg-tarsals',
    subject: 'HSS2011', unit: 'hss.osteo', type: 'definition',
    title: 'Leg bones (tibia and fibula), the patella, and the tarsal bones',
    tags: ['osteology', 'lower limb', 'foundation', 'high-yield'],
    boneRefs: ['tibia', 'fibula', 'foot', 'patella'],
    lesson: {
      explanation: 'The skeleton of the leg consists of two parallel long bones: the medial tibia and the lateral fibula. The tibia is the massive, medial, primary weight-bearing bone of the lower leg. Its proximal end expands into medial and lateral condyles that articulate with the femoral condyles at the bicondylar synovial knee joint. Just below the condyles on the anterior surface lies the prominent tibial tuberosity, which anchors the patellar ligament. The sharp anterior border of the tibial shaft forms the subcutaneous shin. Distally, the tibia terminates medially as the robust Medial malleolus, forming the medial wall of the ankle mortise. In contrast, the fibula is a slender, lateral non-weight-bearing strut that serves primarily for muscle attachments; its distal expansion forms the prominent Lateral malleolus, which extends farther inferiorly than the medial malleolus to stabilize the ankle laterally. The tibia and fibula are connected throughout their shafts by a strong fibrous interosseous membrane. They articulate at two distinct joints: the proximal tibiofibular joint, a plane synovial joint allowing minor gliding, and the distal tibiofibular joint, a fibrous syndesmosis united by a dense interosseous ligament that holds the ankle mortise firmly around the talus. The patella (kneecap) is the largest sesamoid bone in the body; sesamoid bones are nodules of bone that develop within certain tendons to alter the direction of pull of a tendon and increase mechanical leverage. The patella has a broad superior Base of patella receiving the quadriceps tendon, and a pointed inferior Apex of patella anchoring the patellar ligament. The tarsus comprises seven tarsal bones organized into proximal, intermediate, and distal groups. The proximal group consists of the Talus and Calcaneus: the talus bears the pulley-shaped trochlea that articulates with the tibia and fibula at the ankle mortise, receiving the entire weight of the body; the calcaneus (heel bone) is the largest tarsal, transmitting body weight to the ground and providing insertion for the Achilles tendon. The intermediate group contains the boat-shaped Navicular bone interposed between the talar head and the cuneiforms. The distal group comprises the lateral Cuboid bone (articulating with the calcaneus and metatarsals IV–V) and three wedge-shaped cuneiforms: Medial cuneiform, Intermediate cuneiform (recorded as Immediate cuneiform in lecture), and Lateral cuneiform. Anterior to the tarsus lie the five metatarsals and the fourteen phalanges of the toes.',
      plain: 'The lower leg has the thick, weight-bearing tibia on the inside (medial) and the slender fibula on the outside (lateral), tied together by an interosseous membrane. The tibia ends in the medial malleolus (inner ankle bump); the fibula ends in the lateral malleolus (outer ankle bump). The patella is a sesamoid bone inside the quadriceps tendon that acts as a pulley lever across the knee. The ankle and heel have 7 tarsal bones: talus (takes leg weight into the foot), calcaneus (heel bone), navicular, cuboid, and three cuneiforms (medial, intermediate, lateral).',
      keyFacts: [
        'Tibia is medial and bears the body weight; fibula is lateral and non-weight-bearing.',
        'Medial malleolus is the distal end of the tibia; lateral malleolus is the distal end of the fibula.',
        'Tibia and fibula are joined by an interosseous membrane, a proximal plane synovial joint, and a distal syndesmosis.',
        'Patella is a sesamoid bone developing in the quadriceps tendon; base is superior, apex is inferior.',
        'Primary function of sesamoid bones: alter the direction of pull of a tendon to increase leverage.',
        'Seven tarsal bones: talus, calcaneus (proximal); navicular (intermediate); cuboid, medial, intermediate, lateral cuneiforms (distal).',
        'Talus articulates with the tibia and fibula at the talocrural ankle mortise to transmit the body weight.',
        'Calcaneus is the heel bone, the largest tarsal, receiving the calcaneal (Achilles) tendon.'
      ],
      prerequisites: ['hss2011-osteo-pelvic-girdle', 'hss2011-joints-classification'],
      examples: [
        'An inversion ankle sprain violently stretches or tears the anterior talofibular ligament bridging the lateral malleolus of the fibula to the talus.',
        "Patellar tendinitis (jumper's knee) causes localized pain and inflammation at the inferior apex of the patella where the patellar ligament originates."
      ]
    },
    memory: {
      mnemonic: 'TIBia = Thick, Inner, Bears weight. FIBula = Fine, Outer, Lateral.',
      comparison: 'Malleoli pairing: Medial malleolus = Tibia; Lateral malleolus = Fibula (F and L are both outer consonants).',
      location: 'The talus sits atop the calcaneus like a rider on a horse, receiving the load of the leg and passing it backward into the heel and forward into the navicular.',
      teachBack: 'Explain why the tibia is the weight-bearing bone of the leg while the fibula is not, and list all seven tarsals from proximal to distal.'
    },
    practice: [
      {
        type: 'mcq',
        prompt: 'Which bone carries the lateral malleolus at the ankle?',
        options: [
          'Fibula',
          'Tibia',
          'Talus',
          'Calcaneus',
          'Femur'
        ],
        answer: 0,
        explanation: 'The lateral malleolus is the expanded distal end of the fibula. The tibia carries the medial malleolus.',
        src: {
          ref: 'hss.4.3',
          location: 'p41 "Tibia and Fibula (Right)" — "Lateral malleolus"'
        }
      },
      {
        type: 'mcq',
        prompt: 'What is the collective anatomical name for the ankle and heel bones?',
        options: [
          'Tarsal bones',
          'Carpal bones',
          'Phalangeal bones',
          'Metacarpal bones',
          'Sesamoid bones'
        ],
        answer: 0,
        explanation: 'The ankle and heel bones are the tarsal bones (7 per foot). Carpal bones are in the wrist (8 per hand).',
        src: {
          ref: 'hss.manual1920',
          location: 'p47 "6. What is the collective name for wrist bones?" — "B. Tarsal bones"'
        }
      },
      {
        type: 'mcq',
        prompt: 'Sesamoid bones like the patella develop within tendons to perform which primary mechanical function?',
        options: [
          'Alter the direction of pull of a tendon and increase leverage',
          'Store red bone marrow for hematopoiesis',
          'Provide articular shock absorption like fibrocartilaginous discs',
          'Form fibrous syndesmoses between parallel long bones'
        ],
        answer: 0,
        explanation: 'Sesamoid bones develop in certain tendons to alter the direction of pull of a tendon, boosting its mechanical advantage.',
        src: {
          ref: 'hss.4.1',
          location: 'p22 "Sesamoid bones" — "nodules of bone that" — "alter the direction of pull of a tendon e.g. patella"'
        }
      },
      {
        type: 'matching',
        prompt: 'Match each tarsal bone to its verified group and anatomical role.',
        pairs: [
          [
            'Talus',
            'Proximal tarsal articulating with tibia and fibula at the ankle mortise'
          ],
          [
            'Calcaneus',
            'Heel bone; largest tarsal anchoring the calcaneal tendon'
          ],
          [
            'Navicular',
            'Intermediate boat-shaped tarsal anterior to the talus'
          ],
          [
            'Medial cuneiform',
            'Distal wedge-shaped tarsal articulating with first metatarsal'
          ]
        ],
        explanation: 'Classification of tarsal bones from HSS2011 Module 4.3 slide 41.'
      }
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'A footballer sustains a severe twisting injury to the lower leg. Radiography reveals a fracture of the distal fibular shaft and tearing of the inferior tibiofibular syndesmosis with widening of the ankle mortise. Explain the anatomical role of the distal syndesmosis and how its disruption destabilizes the ankle.',
        model: 'The distal tibiofibular joint is a fibrous syndesmosis where the tibia and fibula are tightly bound by an interosseous ligament and inferior tibiofibular ligaments. This syndesmosis holds the medial malleolus of the tibia and lateral malleolus of the fibula tightly against the trochlea of the talus, forming the stable mortise of the talocrural joint. Disruption of this syndesmosis allows the mortise to widen, permitting pathological shifting of the talus and severe ankle instability.',
        rubric: [
          'Identifies the distal tibiofibular joint as a fibrous syndesmosis',
          'Describes the ankle mortise formed by the two malleoli around the talus',
          'Explains that syndesmotic tearing widens the mortise and destabilizes talar articulation'
        ]
      }
    ],
    commonMistakes: [
      'Confusing carpals (wrist, 8) with tarsals (ankle/foot, 7).',
      'Assigning the medial malleolus to the fibula; medial malleolus belongs to the tibia.',
      'Assuming the fibula bears significant body weight; weight is transmitted entirely through the femur and tibia into the talus.'
    ],
    skills: [
      'Differentiate tibia and fibula function: tibia is the primary weight-bearer articulating with both femur and talus; fibula acts as a muscular lateral stabilizer.',
      'Remember the patellar orientation: broad flat base faces superiorly (taking quadriceps pull); pointed apex faces inferiorly (anchoring the patellar ligament).',
      'Track weight transmission down the limb: Femur → Tibial condyles → Tibial shaft → Talus → Calcaneus & Metatarsal heads.'
    ],
    selfCheck: 'From memory: state which bone carries each malleolus, describe the two tibiofibular joints, define a sesamoid bone with its functional purpose, and name all seven tarsals by row.',
    visuals: [
      {
        fig: 'bonesOfTheFoot'
      },
      {
        model: {
          layer: 'skeleton',
          meshes: [
            'Patella',
            'Tibia',
            'Fibula',
            'Talus',
            'Calcaneus'
          ],
          label: 'Leg and ankle skeleton',
          caption: 'Tibia (medial weight-bearing) and fibula (lateral stabilizer) connected by the interosseous membrane; their distal malleoli form the mortise enclosing the talus.'
        }
      },
      {
        gen: true
      }
    ],
    sourceRefs: [
      {
        ref: 'hss.4.1',
        location: 'p22 "Sesamoid bones"'
      },
      {
        ref: 'hss.4.1',
        location: 'p22 "nodules of bone that"'
      },
      {
        ref: 'hss.4.1',
        location: 'p31 "Syndesmosis"'
      },
      {
        ref: 'hss.4.1',
        location: 'p53 "superior tibiofibular"'
      },
      {
        ref: 'hss.4.3',
        location: 'p40 "Patella (Right)"'
      },
      {
        ref: 'hss.4.3',
        location: 'p40 "Base of patella"'
      },
      {
        ref: 'hss.4.3',
        location: 'p40 "Apex of patella"'
      },
      {
        ref: 'hss.4.3',
        location: 'p41 "Tibia and Fibula (Right)"'
      },
      {
        ref: 'hss.4.3',
        location: 'p41 "tibiofibular joint"'
      },
      {
        ref: 'hss.4.3',
        location: 'p42 "Ankle & Foot"'
      },
      {
        ref: 'hss.4.3',
        location: 'p42 "Key to Tarsal Bones"'
      },
      {
        ref: 'hss.4.3',
        location: 'p42 "Talus"'
      },
      {
        ref: 'hss.4.3',
        location: 'p42 "Calcaneus"'
      },
      {
        ref: 'hss.4.3',
        location: 'p42 "Navicular"'
      },
      {
        ref: 'hss.4.3',
        location: 'p42 "Cuboid"'
      },
      {
        ref: 'hss.4.3',
        location: 'p42 "Medial cuneiform"'
      },
      {
        ref: 'hss.4.3',
        location: 'p42 "Immediate cuneiform"'
      },
      {
        ref: 'hss.4.3',
        location: 'p42 "Lateral cuneiform"'
      },
      {
        ref: 'hss.manual1920',
        location: 'p47 "6. What is the collective name for wrist bones?"'
      },
      {
        ref: 'hss.manual1920',
        location: 'p47 "B. Tarsal bones"'
      }
    ]
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
