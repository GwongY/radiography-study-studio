/*
 * figures.js — the diagrams that replaced the hand-drawn ones.
 *
 * The schematics in schematics.js were plotted by hand from SVG coordinates,
 * and for anything that is a real anatomical depiction that turned out to be a
 * bad idea. The nephron is the clearest case: its loop of Henle descended barely
 * further than the tubule it left, and the figure had no cortex/medulla boundary
 * on it at all — while the item's own teaching is about salt pumping building an
 * osmotic gradient DOWN the medulla. A diagram that contradicts its own lesson is
 * worse than no diagram.
 *
 * So the depictions are now real published figures, and the hand-drawn ones are
 * kept only where there is nothing to depict: a feedback loop, a list of six
 * functions, a decision table. Those are layouts, not anatomy, and no photograph
 * of them exists.
 *
 * TEACH FROM THE IMAGE. Every entry carries an `intro` (one or two sentences
 * saying what the image shows, why it is on this lesson, and how to read it) and
 * a `key` (every visible callout resolved to a name). A `key` entry marked
 * `beyond: true` is a callout this lesson's own sources do not name — it is read
 * off the figure's own published labelling, which is legitimate because the
 * figure is a cited, attributed source on the page. The renderer dims those and
 * adds a note. `intro`/`key` are app-authored reading aids, the same category as
 * the memory aids.
 *
 * LICENSING. Every raster/vector file here was licence-checked through the
 * Wikimedia Commons API before it was downloaded, and the download refuses
 * anything whose licence is not demonstrably free. The author, licence and
 * source page below were read from that same API response rather than typed in,
 * so the credit the app shows cannot drift from the credit the licence requires.
 * CC BY and CC BY-SA both require attribution; the app renders it on the figure
 * itself.
 *
 * 18 figures.
 */

export const FIGURES = {
  nephron: {
    file: 'nephron-blood-flow.jpg', bytes: 270903,
    title: 'Blood flow through the nephron',
    caption: 'The tubule and the vessels wrapped around it, drawn together — filtration in the corpuscle, then the long loop reaching toward the medulla.',
    author: 'OpenStax College',
    licence: 'CC BY 3.0',
    licenceUrl: 'https://creativecommons.org/licenses/by/3.0',
    commons: 'https://commons.wikimedia.org/wiki/File%3A2611_Blood_Flow_in_the_Nephron.jpg',
    intro: 'The lesson’s two journeys on one picture. Follow the tubule from the glomerular capsule at the top into the proximal convoluted tubule, then down and back up the loop of the nephron; the distal tubule and collecting duct continue, unlabelled here, into the pale duct on the right that drains to the renal papilla. The red and blue vessels trace the blood route the key facts list.',
    key: [
      { mark: 'Glomerular capsule', name: 'Start of the tubule; with the glomerulus inside it, this is the renal corpuscle where filtration happens' },
      { mark: 'Proximal convoluted tubule', name: 'Second stop — the coiled tubule leaving the capsule' },
      { mark: 'Loop of the nephron', name: 'The loop of Henle: descending limb, then ascending limb, reaching down toward the medulla' },
      { mark: 'Peritubular capillary network', name: 'Capillaries around the tubule, where reabsorbed water and solute re-enter the blood' },
      { mark: 'Afferent arteriole', name: 'Delivers blood into the glomerulus' },
      { mark: 'Efferent arteriole', name: 'Carries blood out of the glomerulus to the peritubular capillaries' },
      { mark: 'Interlobular artery', name: 'Feeds the afferent arteriole' },
      { mark: 'Interlobular vein', name: 'Drains the peritubular capillaries, via the venule' },
      { mark: 'Urine flows into renal papilla', name: 'The collecting duct’s exit — where the drainage path calyx → pelvis → ureter begins' },
    ],
  },
  conduction: {
    file: 'cardiac-conduction.svg', bytes: 104520,
    title: 'The cardiac conducting system',
    caption: 'SA node, AV node, bundle of His, bundle branches and Purkinje fibres in their real positions inside the chambers.',
    author: 'Madhero88',
    licence: 'CC BY-SA 3.0',
    licenceUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    commons: 'https://commons.wikimedia.org/wiki/File%3AConductionsystemoftheheartwithoutHeart.svg',
    intro: 'The route the impulse takes, numbered 1–12. The lesson’s five-stop version is the spine of it: SA node (1), through the atria, to the AV node (6), down the bundle of His (7) into the bundle branches (8, 9), and out to the Purkinje fibres (12).',
    key: [
      { mark: '1', name: 'Sinoatrial (SA) node — the pacemaker, in the posterior wall of the right atrium' },
      { mark: '3–5', name: 'Anterior, middle and posterior internodal tracts — the atrial pathways carrying the impulse to the AV node' },
      { mark: '6', name: 'Atrioventricular (AV) node — in the floor of the right atrium; delays the impulse' },
      { mark: '7', name: 'Bundle of His (AV bundle) — in the interventricular septum' },
      { mark: '8', name: 'Right bundle branch' },
      { mark: '9', name: 'Left bundle branch' },
      { mark: '12', name: 'Purkinje fibres — distribute the impulse through the ventricular walls' },
      { mark: '2', name: "Bachmann's bundle — carries the impulse across to the left atrium", beyond: true },
      { mark: '10 / 11', name: 'Left anterior and posterior fascicles — subdivisions of the left bundle branch', beyond: true },
    ],
  },
  ecgCycle: {
    file: 'ecg-sinus-rhythm.svg', bytes: 38919,
    title: 'Sinus rhythm, labelled',
    caption: 'P wave, QRS complex, T wave, and the PR and QT intervals marked on an actual trace.',
    author: 'Created by Agateller (Anthony Atkielski) , converted to svg by atom .',
    licence: 'Public domain',
    licenceUrl: '',
    commons: 'https://commons.wikimedia.org/wiki/File%3ASinusRhythmLabels.svg',
    intro: 'One heartbeat as an electrical trace. Three waves, in the order the heart fires: P as the atria depolarise, QRS as the ventricles depolarise, T as the ventricles recover — with the two intervals the lesson names marked across them.',
    key: [
      { mark: 'P', name: 'P wave — atrial depolarisation' },
      { mark: 'QRS', name: 'QRS complex — ventricular depolarisation (it buries the atrial repolarisation wave)' },
      { mark: 'T', name: 'T wave — ventricular repolarisation' },
      { mark: 'PR interval', name: 'Start of atrial depolarisation to the start of the QRS' },
      { mark: 'QT interval', name: 'Ventricular depolarisation through to repolarisation' },
    ],
  },
  circuits: {
    file: 'heart-diagram.svg', bytes: 99098,
    title: 'The heart and its great vessels',
    caption: 'Chambers, valves and the direction of flow, with the two circuits as they really connect.',
    author: 'Wapcaplet',
    licence: 'CC BY-SA 3.0',
    licenceUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
    commons: 'https://commons.wikimedia.org/wiki/File%3ADiagram_of_the_human_heart_%28cropped%29.svg',
    intro: 'The chambers and valves with the direction of flow marked. Trace the full circuit the lesson asks you to recite: in from the venae cavae to the right atrium and ventricle, out the pulmonary artery to the lungs, back by the pulmonary veins to the left atrium and ventricle, and out the aorta to the body.',
    key: [
      { mark: 'Right atrium', name: 'Receives deoxygenated blood from the superior and inferior venae cavae' },
      { mark: 'Right ventricle', name: 'Pumps it out the pulmonary artery — the thinner, pouch-shaped chamber' },
      { mark: 'Left atrium', name: 'Receives oxygenated blood from the pulmonary veins' },
      { mark: 'Left ventricle', name: 'Pumps it out the aorta — the thick, round chamber developing the higher pressure' },
      { mark: 'Superior / inferior vena cava', name: 'Bring blood back from the tissues into the right atrium' },
      { mark: 'Pulmonary artery', name: 'The one artery carrying deoxygenated blood — right ventricle to lungs' },
      { mark: 'Pulmonary vein', name: 'The one set of veins carrying oxygenated blood — lungs to left atrium' },
      { mark: 'Aorta', name: 'Carries oxygenated blood from the left ventricle to the body' },
      { mark: 'Tricuspid / mitral valve', name: 'The atrioventricular valves — right and left' },
      { mark: 'Pulmonary / aortic valve', name: 'The semilunar valves at the ventricular exits' },
      { mark: 'Pericardium', name: 'The sac around the heart', beyond: true },
    ],
  },
  bodyPlanes: {
    file: 'anatomy-planes.svg', bytes: 350808,
    title: 'The anatomical planes',
    caption: 'Median, frontal and transverse planes on a real body rather than a stick figure.',
    author: 'David Richfield and Mikael Häggström, M.D. and cmglee',
    licence: 'CC BY-SA 4.0',
    licenceUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    commons: 'https://commons.wikimedia.org/wiki/File%3AHuman_anatomy_planes%2C_labeled.svg',
    intro: 'The three planes on a real body. Each one is tied to a pair of directional terms — that pairing, not the plane’s orientation, is what the lesson asks you to keep straight.',
    key: [
      { mark: 'Median (mid-sagittal) plane', name: 'Splits the body into left and right halves' },
      { mark: 'Coronal / frontal plane', name: 'Splits anterior from posterior' },
      { mark: 'Transverse (horizontal) plane', name: 'Splits superior from inferior' },
      { mark: 'Parasagittal plane', name: 'Any sagittal cut off the midline — still left/right, but unequal parts', beyond: true },
      { mark: 'Longitudinal', name: 'The long axis that the sagittal and coronal planes both run along', beyond: true },
    ],
  },
  emSpectrum: {
    file: 'em-spectrum.svg', bytes: 76057,
    title: 'The electromagnetic spectrum',
    caption: 'Wavelength, frequency and where the ionising boundary actually falls.',
    author: 'Inductiveload , NASA',
    licence: 'CC BY-SA 3.0',
    licenceUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
    commons: 'https://commons.wikimedia.org/wiki/File%3AEM_Spectrum_Properties_edit.svg',
    intro: 'The spectrum with the ionising boundary on it. The lesson’s test — can this radiation free an outer-shell electron — falls between ultraviolet and X-ray: everything on the short-wavelength side ionises, everything on the long side does not, whatever its power.',
    key: [
      { mark: 'Radio', name: 'Longest wavelength, lowest energy — non-ionising; MRI radiofrequency and phone signals sit here' },
      { mark: 'Microwave', name: 'Non-ionising — carries far more power than a chest X-ray and still cannot ionise' },
      { mark: 'Infrared', name: 'Non-ionising — felt as heat' },
      { mark: 'Visible', name: 'Non-ionising — the narrow band the eye detects' },
      { mark: 'Ultraviolet', name: 'The boundary: high-energy UV is where ionisation begins' },
      { mark: 'X-ray', name: 'Ionising — characteristic X-rays are what the lesson’s imaging modalities use' },
      { mark: 'Gamma ray', name: 'Shortest wavelength, highest energy — ionising; emitted by radioisotopes' },
      { mark: 'Wavelength (m) / Frequency (Hz)', name: 'The two axes — they run in opposite directions', beyond: true },
    ],
  },
  synovialTypes: {
    file: 'synovial-joint-types.jpg', bytes: 262175,
    title: 'The six synovial joint types',
    caption: 'Each type shown as its mechanical shape, next to a joint in the body where it occurs.',
    author: 'OpenStax College',
    licence: 'CC BY 3.0',
    licenceUrl: 'https://creativecommons.org/licenses/by/3.0',
    commons: 'https://commons.wikimedia.org/wiki/File%3A909_Types_of_Synovial_Joints.jpg',
    intro: 'The six types, sorted the way the lesson sorts them — by how many planes of movement the shape allows. Panels (a)–(f) run pivot, hinge, saddle, plane, condyloid, ball-and-socket. Where the figure’s example joint differs from the one the lesson uses, the key gives both.',
    key: [
      { mark: 'a', name: 'Pivot — rotation about one axis. Figure: atlanto-axial (C1–C2); the lesson also uses the proximal radioulnar joint' },
      { mark: 'b', name: 'Hinge — one plane. Elbow (and the interphalangeal joints)' },
      { mark: 'c', name: 'Saddle — two planes plus opposition. Carpo-metacarpal joint of the thumb' },
      { mark: 'd', name: 'Plane — gliding. Figure: between tarsal bones; the lesson uses the facet joints and the acromioclavicular joint' },
      { mark: 'e', name: 'Condyloid (condylar) — two planes. Radiocarpal (wrist) joint; also the metacarpophalangeal joints' },
      { mark: 'f', name: 'Ball-and-socket — all three planes. Hip (and the glenohumeral joint)' },
    ],
  },
  longBone: {
    file: 'long-bone.jpg', bytes: 36483,
    title: 'Structure of a long bone',
    caption: 'Epiphysis, metaphysis, diaphysis, medullary cavity and periosteum, drawn to proportion.',
    author: 'unknown',
    licence: 'Public domain',
    licenceUrl: '',
    commons: 'https://commons.wikimedia.org/wiki/File%3AIllu_long_bone.jpg',
    intro: 'A long bone read from the centre outward, the way the key facts list it. The shaft is the diaphysis; the ends are the epiphyses; the growth zone between them shows here as the epiphyseal line. The dense compact bone is the pale outer rim, around the spongy bone and the marrow cavity.',
    key: [
      { mark: 'Diaphysis', name: 'The central shaft' },
      { mark: 'Epiphysis', name: 'The bone end — one at each end' },
      { mark: 'Epiphyseal line', name: 'The remnant of the growth plate; the metaphysis sits next to it' },
      { mark: 'Articular cartilage', name: 'Hyaline cartilage capping the epiphysis where it meets another bone' },
      { mark: 'Periosteum', name: 'The outer covering of the shaft; its inner layer is osteogenic and carries the capillaries and nerves' },
      { mark: 'Endosteum', name: 'Lines the internal surfaces — the layer people confuse with periosteum' },
      { mark: 'Medullary cavity', name: 'The space in the shaft, filled with bone marrow' },
      { mark: 'Spongy bone', name: 'Cancellous bone — the trabecular mesh at the ends and lining the cavity' },
      { mark: 'Nutrient foramen', name: 'The opening where the large nutrient artery enters the shaft' },
    ],
  },
  muscleTypes: {
    file: 'muscle-tissue-types.jpg', bytes: 488590,
    title: 'Skeletal, smooth and cardiac muscle',
    caption: 'The three tissue types as micrographs — striation and nuclei are things you have to see, not read about.',
    author: 'OpenStax College',
    licence: 'CC BY 4.0',
    licenceUrl: 'https://creativecommons.org/licenses/by/4.0',
    commons: 'https://commons.wikimedia.org/wiki/File%3A414_Skeletal_Smooth_Cardiac.jpg',
    intro: 'The three muscle tissues as micrographs, because the features that tell them apart — striations, and how many nuclei sit where — are things you have to see. Sort each panel with the lesson’s three questions: striated or not, one nucleus or many, voluntary or not.',
    key: [
      { mark: '(a)', name: 'Skeletal — long parallel fibres, clearly striated, many nuclei pushed to the edges' },
      { mark: '(b)', name: 'Smooth — short spindle-shaped cells, no striations, a single central nucleus each' },
      { mark: '(c)', name: 'Cardiac — striated and branching, one central nucleus, joined end to end at intercalated discs' },
    ],
  },
  bloodComposition: {
    file: 'blood-components.jpg', bytes: 21406,
    title: 'What blood is made of',
    caption: 'Plasma, buffy coat and packed red cells after centrifuging — which is what haematocrit measures.',
    author: 'unknown',
    licence: 'Public domain',
    licenceUrl: '',
    commons: 'https://commons.wikimedia.org/wiki/File%3AIllu_blood_components.jpg',
    intro: 'What a tube of blood separates into when it is spun down — which is exactly what the haematocrit measures. Plasma on top, packed red cells at the bottom, and a thin pale layer between them.',
    key: [
      { mark: 'Plasma', name: 'The straw-coloured liquid — water plus dissolved solutes, including the three plasma-protein classes' },
      { mark: 'Formed elements', name: 'The cells and fragments — mostly red cells; their share of the total volume is the haematocrit' },
      { mark: 'Erythrocytes', name: 'Red blood cells — the bulk of the formed elements, and what gives blood its colour' },
      { mark: 'Leukocytes & thrombocytes', name: 'White cells and platelets — the thin buffy coat between plasma and red cells' },
    ],
  },
  gasTransport: {
    file: 'respiratory-system.svg', bytes: 282267,
    title: 'The airway from nose to alveoli',
    caption: 'The whole tract in one view, every branching level named, with the conducting and respiratory portions both in place.',
    author: 'LadyofHats , Jmarchn',
    licence: 'Public domain',
    licenceUrl: '',
    commons: 'https://commons.wikimedia.org/wiki/File%3ARespiratory_system_complete_en.svg',
    intro: 'The branching order the lesson asks you to recite, shown end to end. Read down the midline: nasal cavity and pharynx first, then past the larynx into the trachea, and the trachea’s split into main, lobar and finer bronchi feeding the lung lobes. The inset is one bronchial wall in section.',
    key: [
      { mark: 'Nasal cavity', name: 'Start of the conducting portion; part of the upper respiratory tract' },
      { mark: 'Pharynx', name: 'Shared air/food passage, still upper tract' },
      { mark: 'Larynx', name: 'The dividing line — upper tract above it, lower tract below' },
      { mark: 'Trachea', name: 'The windpipe, held open by cartilage rings' },
      { mark: 'Main bronchi', name: 'Primary bronchi — one to each lung' },
      { mark: 'Lobar bronchus', name: 'Secondary bronchi — one per lung lobe' },
      { mark: 'Superior / middle / inferior lobe', name: 'Three lobes on the right, two on the left' },
      { mark: 'Alveoli', name: 'The end of the road — the respiratory portion, where exchange happens' },
      { mark: 'Epiglottis', name: 'Folds over the laryngeal inlet during swallowing', beyond: true },
      { mark: 'Thyroid / cricoid cartilage', name: 'Laryngeal cartilages', beyond: true },
      { mark: 'Carina of trachea', name: 'The ridge at the tracheal split', beyond: true },
      { mark: 'Horizontal / oblique fissure', name: 'The clefts between lung lobes', beyond: true },
      { mark: 'Cardiac notch', name: 'The scoop in the left lung where the heart sits', beyond: true },
    ],
  },
  respiratoryExchange: {
    file: 'respiratory-zone.jpg', bytes: 309430,
    title: 'The respiratory zone, down to the membrane',
    caption: 'Panel (a) is one alveolus in section — the cells the gas actually crosses; panel (b) is the same tissue under the microscope.',
    author: 'OpenStax College',
    licence: 'CC BY 3.0',
    licenceUrl: 'https://creativecommons.org/licenses/by/3.0',
    commons: 'https://commons.wikimedia.org/wiki/File%3A2310_Structures_of_the_Respiratory_Zone.jpg',
    intro: 'Where gas exchange happens, at the scale the lesson describes it. Panel (a) cuts through a single alveolus to show the three cell types and the thin barrier between air and blood; panel (b) is real lung tissue — mostly empty space, walled by that same thin tissue.',
    key: [
      { mark: 'Type I alveolar cell', name: 'Type I pneumocyte — thin, simple squamous; the majority of gas exchange crosses it' },
      { mark: 'Type II alveolar cell', name: 'Type II pneumocyte (septal cell) — produces surfactant' },
      { mark: 'Macrophage', name: 'Alveolar macrophage — the “dust cell” that clears debris' },
      { mark: 'Respiratory membrane', name: 'The barrier gas diffuses across: alveolar cell, fused basement membrane, capillary endothelium' },
      { mark: 'Capillary', name: 'Pulmonary capillary against the alveolar wall — blood on one side, air on the other' },
      { mark: 'Alveolus (gas-filled space)', name: 'The air sac itself' },
      { mark: 'Alveolar pores', name: 'Openings connecting neighbouring alveoli', beyond: true },
      { mark: 'Alveolar duct / sac (b)', name: 'Where a run of alveoli opens off the end of a respiratory bronchiole', beyond: true },
      { mark: 'Lumen of bronchiole (b)', name: 'The conducting airway feeding this cluster', beyond: true },
    ],
  },
  nervousDivisions: {
    file: 'nervous-system-overview.jpg', bytes: 326803,
    title: 'Divisions of the nervous system',
    caption: 'CNS against PNS, and the somatic and autonomic branches.',
    author: 'OpenStax',
    licence: 'CC BY 4.0',
    licenceUrl: 'https://creativecommons.org/licenses/by/4.0',
    commons: 'https://commons.wikimedia.org/wiki/File%3A1201_Overview_of_Nervous_System.jpg',
    intro: 'The top-level split the lesson starts from: the central nervous system in the midline, the peripheral nervous system branching out from it. The somatic/autonomic division and the three neuron classes are in the key facts, not on this figure.',
    key: [
      { mark: 'Central nervous system', name: 'Brain plus spinal cord — it holds almost 97% of the body’s neural tissue' },
      { mark: 'Brain', name: 'Part of the CNS' },
      { mark: 'Spinal cord', name: 'Part of the CNS' },
      { mark: 'Peripheral nervous system', name: 'Everything outside the CNS; divides into somatic and autonomic' },
      { mark: 'Nerve', name: 'A bundle of peripheral axons' },
      { mark: 'Ganglion', name: 'A cluster of nerve-cell bodies outside the CNS', beyond: true },
    ],
  },
  synovialJoint: {
    file: 'synovial-joints.jpg', bytes: 741895,
    title: 'Inside a synovial joint',
    caption: 'A synovial joint in section: the capsule, the membrane lining it, the fluid-filled cavity and the cartilage on the bone ends.',
    author: 'OpenStax College',
    licence: 'CC BY 3.0',
    licenceUrl: 'https://creativecommons.org/licenses/by/3.0',
    commons: 'https://commons.wikimedia.org/wiki/File%3A907_Synovial_Joints.jpg',
    intro: 'Build the joint outward from the bone, the way the lesson does: articular cartilage capping each bone end, the joint cavity between them holding synovial fluid, the synovial membrane lining that cavity, and the tough articular capsule wrapping the whole thing.',
    key: [
      { mark: 'Bone', name: 'The two articulating bone ends' },
      { mark: 'Articular cartilage', name: 'Hyaline cartilage on each bone end — wear-resistant, low-friction, lubricated by synovial fluid' },
      { mark: 'Joint cavity containing synovial fluid', name: 'The gap between the bones; the clear fluid is secreted by the synovial membrane' },
      { mark: 'Synovial membrane', name: 'Lines the cavity and makes the synovial fluid; its vascular net helps nourish the cartilage' },
      { mark: 'Articular capsule', name: 'The dense connective-tissue cuff around the joint; its local thickenings are the ligaments' },
    ],
  },
  bodyCavities: {
    file: 'body-cavities.png', bytes: 390375,
    title: 'The body cavities',
    caption: 'Dorsal against ventral, and the thoracic and abdominopelvic subdivisions.',
    author: 'OpenStax',
    licence: 'CC BY 3.0',
    licenceUrl: 'https://creativecommons.org/licenses/by/3.0',
    commons: 'https://commons.wikimedia.org/wiki/File%3ABody_Cavities_labeled.png',
    intro: 'The figure the lesson is built on: the dorsal and ventral cavities side by side, the ventral one opened into its thoracic and abdominopelvic parts. The left view is anterior, the right lateral — both use the same numbering. The glossary fixes which of these names are examinable; the rest are the figure’s own labels for the surrounding anatomy.',
    key: [
      { mark: '2', name: 'Thoracic cavity' },
      { mark: '3', name: 'Abdominal cavity' },
      { mark: '4', name: 'Pelvic cavity' },
      { mark: '6', name: 'Abdominopelvic cavity — the abdominal and pelvic cavities together' },
      { mark: 'c', name: 'Pleural cavity — around each lung' },
      { mark: 'd', name: 'Pericardial cavity — around the heart, within the mediastinum' },
      { mark: '1', name: 'Cranial cavity', beyond: true },
      { mark: '5', name: 'Ventral body cavity — thoracic plus abdominopelvic', beyond: true },
      { mark: '7', name: 'Dorsal body cavity — cranial plus vertebral', beyond: true },
      { mark: 'a', name: 'Superior mediastinum', beyond: true },
      { mark: 'b', name: 'Vertebral (spinal) cavity', beyond: true },
      { mark: 'e', name: 'Diaphragm — the muscular floor of the thoracic cavity', beyond: true },
    ],
  },
  jointMovements: {
    file: 'body-movements.jpg', bytes: 1333137,
    title: 'Movements at a joint',
    caption: 'Flexion, extension, abduction, adduction and rotation shown on the body, not described in a box.',
    author: 'Tonye Ogele CNX',
    licence: 'CC BY-SA 3.0',
    licenceUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    commons: 'https://commons.wikimedia.org/wiki/File%3ABody_Movements_I.jpg',
    intro: 'The movement words themselves, shown on the body. This lesson pins each one to a joint of the forearm, wrist or thumb; the figure demonstrates the same terms at larger joints — the vocabulary is what carries over.',
    key: [
      { mark: 'a / b', name: 'Flexion and extension — shown at the shoulder and knee; the lesson’s version is forearm flexion and extension at the elbow' },
      { mark: 'e', name: 'Abduction, adduction and circumduction — shown at the shoulder; circumduction is the strung-together sequence the lesson defines' },
      { mark: 'f', name: 'Rotation, lateral and medial — the forearm version is supination and pronation at the radioulnar joints' },
      { mark: 'c', name: 'Flexion and extension of the neck', beyond: true },
      { mark: 'd', name: 'Flexion and extension of the vertebral column', beyond: true },
    ],
  },
  heart: {
    file: 'heart-interior.svg', bytes: 349859,
    title: 'Inside the heart',
    caption: 'The chambers as they actually are: a thick, round left ventricle reaching the apex against a thin, pouch-shaped right ventricle — not four equal quadrants of an oval.',
    author: 'ZooFari',
    licence: 'CC BY-SA 3.0',
    licenceUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    commons: 'https://commons.wikimedia.org/wiki/File%3AHeart_diagram-en.svg',
    intro: 'The point of this figure is the shape of the two ventricles, which the old hand-drawn version got wrong. The left ventricle, lower left, is round and thick-walled and reaches the apex; the right ventricle is a thin, pouch-shaped chamber wrapped around it — not four equal quadrants of an oval. The image carries no printed labels; name the chambers and valves from the key facts.',
  },
  vertebra: {
    file: 'vertebra-parts.jpg', bytes: 238557,
    title: 'Parts of a typical vertebra',
    caption: 'A vertebra from above, and several stacked in side view — the body in front, the arch and its processes behind.',
    author: 'OpenStax College',
    licence: 'CC BY 3.0',
    licenceUrl: 'https://creativecommons.org/licenses/by/3.0',
    commons: 'https://commons.wikimedia.org/wiki/File%3A718_Vertebra.jpg',
    intro: 'The superior view on the left carries every part the labelling exercise asks for. Walk the ring from the front: body, then the pedicle bridging back from it, the lamina closing the arch, and the spinous process pointing out behind — with the vertebral foramen enclosed in the middle for the spinal cord.',
    key: [
      { mark: 'Body', name: 'Anterior; the primary weight-bearing part (label B… in the exercise, described by position)' },
      { mark: 'Vertebral foramen', name: 'The opening the spinal cord passes through (B1)' },
      { mark: 'Pedicle', name: 'Short bridge running back from the body (B2); part of the vertebral arch' },
      { mark: 'Lamina', name: 'Flat plate closing the arch behind (B5); part of the vertebral arch' },
      { mark: 'Transverse process', name: 'Lateral projection, one each side (B3)' },
      { mark: 'Spinous process', name: 'Single backward projection you can feel through the skin (B4)' },
      { mark: 'Facet of superior articular process', name: 'Forms the facet joint with the vertebra above (B6)' },
      { mark: 'Inferior articular process', name: 'Forms the facet joint with the vertebra below' },
      { mark: 'Intervertebral disc', name: 'The shock absorber between two vertebral bodies (side view)' },
      { mark: 'Spinal nerve / intervertebral foramen', name: 'A spinal nerve leaves between two vertebrae — a different opening from the vertebral foramen' },
      { mark: 'Facet for head of rib', name: 'Present on thoracic vertebrae only', beyond: true },
    ],
  },
};

export function figureFor(id) {
  const f = FIGURES[id];
  return f ? { ...f, src: 'assets/figures/' + f.file } : null;
}

/* True where the app still draws it itself, because there is nothing to depict. */
export function isHandDrawn(id) { return !FIGURES[id]; }
