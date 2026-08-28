/*
 * layouts.js — the sixteen that are layouts, as layouts.
 *
 * These were hand-plotted SVG, and that was the wrong tool twice over.
 *
 * 1. TEXT ESCAPED ITS BOXES. `box()` drew a rect at a fixed height and then
 *    poured wrapped text into it, where the wrap was estimated at 0.55em per
 *    character. Guess low and the text runs out of the bottom of the rect —
 *    measured at up to 15.4 px of overflow across three of these figures, with
 *    nothing in the code able to notice.
 *
 * 2. THE TEXT WAS TINY. An SVG with viewBox 720 wide, rendered into a 645 px
 *    card, scales everything by 0.9 — so 11 px body text landed at 9.9 px next
 *    to 14.5 px lesson prose. On a phone the card is nearer 340 px, which is a
 *    scale of 0.47, and the same text arrives at about 5 px.
 *
 * Neither is fixable by nudging coordinates, because both come from drawing a
 * layout instead of laying one out. As HTML the boxes grow to fit whatever text
 * they hold, the text is real text at real size, it reflows on a narrow screen
 * instead of shrinking, and every term in it can be tapped like any other word
 * in the app.
 *
 * The content is unchanged: same words, same sources, same colours.
 *
 * Block types:
 *   heading   a small uppercase label
 *   row       cards side by side, wrapping when there is no room
 *   flow      like row, but with arrows between the cards
 *   stack     cards one under another, as steps
 *   note      a line of prose; `tone` picks it out, `dim` plays it down
 *   terms     term/meaning pairs as a grid
 *   scale     a labelled left-to-right axis
 */

const T = 'teal', O = 'orange', B = 'blue', R = 'red', G = 'green', D = 'dim';

export const LAYOUTS = {
  anatomicalPosition: {
    blocks: [
      { type: 'heading', text: 'Four things that define it' },
      { type: 'row', cards: [
        { t: 'Upright, feet forward', b: 'Standing, feet shoulder width apart and parallel, toes pointing forward.', tone: T },
        { t: 'Palms facing forward', b: 'Upper limbs out to each side, palms turned to the front. This is the detail people get wrong.', tone: O },
        { t: 'It is a convention, not a pose', b: 'Terms are applied as if the body were in this position regardless of how the patient is actually lying.', tone: T },
        { t: 'So it settles the ambiguity', b: 'A scar in the "anterior carpal region" is on the palm side of the wrist — always.', tone: G },
      ] },
    ],
  },

  wordParts: {
    blocks: [
      { type: 'flow', cards: [
        { t: 'Prefix', b: 'describes the root', tone: O },
        { t: 'Root', b: 'organ, tissue or condition', tone: T },
        { t: 'Suffix', b: 'describes the root', tone: O },
      ] },
      { type: 'heading', text: 'Worked example from the source' },
      { type: 'flow', cards: [
        { t: 'hyper-', b: 'high / over', tone: O },
        { t: 'tension', b: 'pressure', tone: T },
        { t: '= hypertension', b: 'abnormally high blood pressure', tone: G },
      ] },
      { type: 'heading', text: 'Position prefixes' },
      { type: 'terms', pairs: [
        ['epi-', 'above, upon'], ['hypo-', 'below or deficient'], ['inter-', 'between'], ['circum-', 'around'],
        ['pre-', 'before'], ['post-', 'after'], ['retro-', 'backward'], ['ab-', 'away from'],
      ] },
      { type: 'heading', text: 'Roots of place' },
      { type: 'terms', pairs: [
        ['cardi/o', 'heart'], ['oste/o', 'bone'], ['arthr/o', 'joint'], ['my/o', 'muscle'],
        ['neur/o', 'nerve'], ['nephr/o', 'kidney'], ['ren/o', 'kidney'], ['crani/o', 'skull'], ['cost/o', 'rib'],
      ] },
      { type: 'heading', text: 'Suffixes of process' },
      { type: 'terms', pairs: [
        ['-graphy', 'process of recording'], ['-graph', 'the instrument'], ['-scopy', 'process of viewing'],
        ['-itis', 'inflammation'], ['-algia', 'pain'], ['-megaly', 'enlargement'],
        ['-osis', 'abnormal condition'], ['-emia', 'blood condition'],
      ] },
    ],
  },

  boneFunctions: {
    blocks: [
      { type: 'heading', text: 'Mechanical' },
      { type: 'row', cards: [
        { t: 'Supporting framework', b: 'The body keeps its shape because bone holds it.', tone: T },
        { t: 'Levers for muscles', b: 'Muscle pulls; bone turns the pull into movement.', tone: T },
      ] },
      { type: 'heading', text: 'Biological' },
      { type: 'row', cards: [
        { t: 'Protection of viscera', b: 'Brain, spinal cord, heart, lungs, liver, bladder.', tone: O },
        { t: 'Mineral storehouse', b: 'Calcium and phosphates are banked in bone and drawn out when the body needs them.', tone: O },
        { t: 'Red blood cell production', b: 'Bone marrow makes them.', tone: O },
      ] },
    ],
  },

  jointClassification: {
    blocks: [
      { type: 'row', cards: [
        { t: 'Fibrous', b: 'Sutures (skull) · gomphosis (tooth in socket) · syndesmosis (inferior tibiofibular, united by an interosseous ligament)', tone: T },
        { t: 'Cartilaginous', b: 'Synchondrosis — primary, temporary, ossifies about 25 years. Symphysis — secondary, fibrocartilage: intervertebral joints, pubic symphysis', tone: O },
        { t: 'Synovial', b: 'Hinge · pivot · condylar · saddle · plane · ball-and-socket', tone: B },
      ] },
      { type: 'scale', from: 'least movable', to: 'most movable',
        note: 'A suture is the least movable of those in the revision exercise.' },
    ],
  },

  cellOrganisation: {
    blocks: [
      { type: 'flow', cards: [
        { t: 'Cell', b: 'somatic = all body cells; sex (germ) cells = sperm and oocyte', tone: T },
        { t: 'Tissue', b: 'epithelial · connective · muscle · neural', tone: O },
        { t: 'Organ', b: 'several tissue types working as one structure', tone: T },
        { t: 'System', b: 'eleven of them', tone: T },
      ] },
      { type: 'heading', text: 'The eleven organ systems' },
      { type: 'note', text: 'integumentary · nervous · endocrine · skeletal · muscular · circulatory · immune · respiratory · urinary · digestive · reproductive' },
      { type: 'note', dim: true, text: 'Epithelium: cellularity, polarity, attachment to a basement membrane, avascularity, regeneration. Blood is a connective tissue — that one catches people out.' },
    ],
  },

  homeostasis: {
    blocks: [
      { type: 'note', text: 'Homeostasis — all systems working together to keep the internal environment within a normal range.' },
      { type: 'flow', cards: [
        { t: 'Receptor', b: 'detects the change', tone: T },
        { t: 'Control centre', b: 'compares to the set point', tone: T },
        { t: 'Effector', b: 'produces the response', tone: T },
      ] },
      { type: 'note', tone: O, text: '↩ negative feedback — the response removes the original stimulus, and the loop closes back on the receptor' },
      { type: 'row', cards: [
        { t: 'Autoregulation (intrinsic)', b: 'Automatic response within a cell, tissue or organ. No outside instruction needed.', tone: B },
        { t: 'Extrinsic regulation', b: 'Controlled by the nervous and endocrine systems.', tone: B },
      ] },
    ],
  },

  endocrineDelivery: {
    blocks: [
      { type: 'row', cards: [
        { t: 'Autocrine', b: 'Same cell. No blood involved.', tone: T },
        { t: 'Paracrine', b: 'Adjacent cells through extracellular space. Blood not directly involved.', tone: T },
        { t: 'Endocrine', b: 'The classical mode — delivered by the blood.', tone: O },
        { t: 'Neuroendocrine', b: 'Produced by a neuron, delivered by the bloodstream.', tone: O },
      ] },
      { type: 'note', text: 'Hormone = a chemical transferring information and instructions between cells.' },
      { type: 'heading', text: 'Four hormone functions' },
      { type: 'note', text: 'growth and development · control tissue function · support reproduction · regulate metabolism' },
      { type: 'note', dim: true, text: 'Endocrine glands are ductless. A cell is a target only because it carries the receptor protein — proximity has nothing to do with it.' },
    ],
  },

  muscleAction: {
    blocks: [
      { type: 'row', cards: [
        { t: 'Origin', b: 'The attachment on the bone that does not move, closer to the body.', tone: O },
        { t: 'Insertion', b: 'The attachment on the bone that moves, distal to the body.', tone: G },
      ] },
      { type: 'row', cards: [
        { t: 'Agonist', b: 'The main muscle producing the movement — the one contracting.', tone: T },
        { t: 'Antagonist', b: 'The opposing muscle. Flexors and extensors are antagonists to each other.', tone: O },
      ] },
      { type: 'note', dim: true, text: 'Flexor decreases the joint angle; extensor increases it. More fibres per motor unit means less precise control.' },
    ],
  },

  innateAdaptive: {
    blocks: [
      { type: 'row', cards: [
        { t: 'Innate — nonspecific', b: 'The same response to any agent. Present from birth.', tone: T },
        { t: 'Adaptive — specific', b: 'Depends on lymphocytes. Develops after exposure.', tone: O },
      ] },
      { type: 'heading', text: 'Seven innate categories' },
      { type: 'row', dense: true, cards: [
        { t: 'Physical barriers', tone: T }, { t: 'Phagocytes', tone: T },
        { t: 'Immune surveillance', tone: T }, { t: 'Interferons', tone: T },
        { t: 'Complement', tone: T }, { t: 'Inflammatory response', tone: T }, { t: 'Fever', tone: T },
      ] },
      { type: 'note', dim: true, text: 'Microphages = neutrophils and eosinophils; macrophages derive from monocytes. Fixed macrophages (histiocytes) include microglia in the CNS and Kupffer cells in liver sinusoids; alveolar macrophages are free. NK cells release perforins that lyse the abnormal membrane. Interferons trigger antiviral proteins that block replication rather than killing viruses. Pathogens carry PAMPs, recognised by toll-like receptors — a class of pattern-recognition receptor.' },
    ],
  },

  immuneAdaptive: {
    blocks: [
      { type: 'heading', text: 'Four signs' },
      { type: 'row', dense: true, cards: [
        { t: 'Swelling', b: 'tumor', tone: R }, { t: 'Redness', b: 'rubor', tone: R },
        { t: 'Heat', b: 'calor', tone: R }, { t: 'Pain', b: 'dolor', tone: R },
      ] },
      { type: 'heading', text: 'Three effects' },
      { type: 'row', cards: [
        { t: 'Temporary repair and barrier', tone: T },
        { t: 'Retarding the spread', tone: T },
        { t: 'Mobilising defences, facilitating repair', tone: T },
      ] },
      { type: 'heading', text: 'Products' },
      { type: 'note', tone: O, text: 'necrosis · pus · abscess' },
    ],
  },

  radiographyRoles: {
    blocks: [
      { type: 'flow', cards: [
        { t: 'radio-', b: 'radial spread-out of energy — radiation', tone: O },
        { t: '-graphy', b: 'snapshot, photo', tone: O },
      ] },
      { type: 'row', cards: [
        { t: 'Radiography', b: 'The art and science of using ionizing radiation to create images of the body and its inner structures.', tone: T },
      ] },
      { type: 'heading', text: 'Three distinct roles' },
      { type: 'row', cards: [
        { t: 'Radiographer', b: 'Takes the radiographs.', tone: B },
        { t: 'Radiotherapist', b: 'Plans and switches on the beam for treatments.', tone: B },
        { t: 'Radiation chemist / pharmacist', b: 'Prepares radiopharmaceuticals.', tone: B },
      ] },
    ],
  },

  modalities: {
    blocks: [
      { type: 'row', cards: [
        { t: 'General X-ray', b: 'Roentgen 1895, Nobel 1901. Film: developing → fixation → washing → drying.', tone: T },
        { t: 'Fluoroscopy', b: 'Edison 1896. Real-time and intraoperative: angiography, stent installation, bone cement, digestive function.', tone: T },
        { t: 'Digital capture', b: 'Computed radiography since the 1980s — needs readers, PACS-compatible. Direct digital — no readers, time-saving, no films, expensive.', tone: O },
        { t: 'Nuclear medicine', b: 'Radiopharmaceutical = a radioisotope plus a specific compound.', tone: O },
      ] },
      { type: 'note', dim: true, text: 'Contrast agents: oral barium sulfate solution; intravenous ionic vs non-ionic.' },
      { type: 'heading', text: 'SPECT vs PET' },
      { type: 'row', cards: [
        { t: 'SPECT', b: 'Gamma emitters, longer half-lives, less expensive, widely available. Technetium-99m: 6.02 hours, gamma.', tone: B },
        { t: 'PET', b: 'Positron emitters, very short half-lives, more quantitative, expensive, cyclotron-dependent. Fluorine-18: 109.75 minutes, positron.', tone: B },
      ] },
    ],
  },

  modalityBestUse: {
    blocks: [
      { type: 'row', cards: [
        { t: 'X-ray', b: 'Dense structure — bone and gross chest anatomy.', tone: T },
        { t: 'Fluoroscopy', b: 'Anything that has to be watched moving, in real time.', tone: T },
        { t: 'CT', b: 'Cross-sectional detail, quickly.', tone: O },
        { t: 'MRI', b: 'Soft-tissue contrast, without ionizing radiation.', tone: O },
        { t: 'Nuclear medicine', b: 'Function rather than structure.', tone: B },
      ] },
      { type: 'note', dim: true, text: 'Ultrasonography is the other non-ionizing modality. Note the trade the table keeps making: the modalities that show soft tissue best are the ones that either take longest or cost most.' },
    ],
  },

  radioprotection: {
    blocks: [
      { type: 'row', cards: [
        { t: 'Time', b: 'Less time in the beam.', tone: T },
        { t: 'Distance', b: 'Works through the inverse square law.', tone: T },
        { t: 'Shielding', b: 'Put material in the way.', tone: T },
        { t: 'Decay', b: 'Half-life — physical, biological and effective.', tone: T },
      ] },
      { type: 'heading', text: 'The inverse square law' },
      { type: 'terms', pairs: [['1 m', 'dose ×1'], ['2 m', 'dose ×¼'], ['4 m', 'dose ×¹⁄₁₆']] },
      { type: 'row', cards: [
        { t: 'ALARA', b: 'As low as reasonably achievable — applied on top of all four measures.', tone: O },
      ] },
      { type: 'heading', text: 'Dose limits' },
      { type: 'note', text: 'Worker: 20 mSv/year averaged over five consecutive years; 50 mSv in any single year; 1 mSv if pregnancy is declared. Public: 1 mSv in a year.' },
      { type: 'note', dim: true, text: 'TLD detection range 0.05 mSv – 10 Sv, so it is not feasible for accidental exposure. Damage paradigm: stochastic and deterministic effects. Medical needs account for over 90% of artificial radiation exposure.' },
    ],
  },

  radiotherapyPath: {
    blocks: [
      { type: 'stack', cards: [
        { t: 'Referral to clinical oncology', b: 'Not every patient with cancer is referred.', tone: D },
        { t: 'Step 1 — treatment position', b: 'Determined with personalised immobilisation devices. Weighed on comfort, treatment accuracy, planning feasibility and reproducibility.', tone: T },
        { t: 'Step 2 — simulation', b: 'Acquire images for planning and simulate the real setup.', tone: T },
        { t: 'Step 3 — RT treatment planning', b: 'Then, and only then, the beam.', tone: T },
      ] },
      { type: 'note', dim: true, text: 'Hong Kong title: radiation therapist, previously therapeutic radiographer. In the USA the roles split differently — radiologic technologists, and dosimetrists who do planning and dose calculation. Twelve RT centres in Hong Kong: six public (QMH, PYNEH, QEH, PMH, PWH, TMH) and six private, with about 420 registered radiation therapists.' },
    ],
  },

  requestForm: {
    blocks: [
      { type: 'heading', text: 'Staffing example' },
      { type: 'row', cards: [
        { t: '29 radiologists', tone: B },
        { t: '84 radiographers', b: 'A pair per room: one handles the patient, one controls the panel.', tone: B },
        { t: '16 nurses / PCAs', b: 'PCA prepares the patient; a nurse is involved in CT, MRI and A&E.', tone: B },
      ] },
      { type: 'heading', text: 'Request form fields' },
      { type: 'note', text: 'clinical information · diagnosis · examination requested · priority · transport · drug allergy · LMP' },
      { type: 'row', cards: [
        { t: 'Worked example', b: 'A chest X-ray specified as PA + Lat. Those are the only two projection abbreviations that appear anywhere in the supplied lecture set.', tone: O },
      ] },
      { type: 'note', dim: true, text: 'Hospital Authority: 7 clusters, 39 departments of radiology, 16 A&E radiology services, 6 clinical oncology centres. About 800 diagnostic radiographers and 180–200 radiotherapists.' },
    ],
  },
};

export function layoutFor(id) {
  return LAYOUTS[id] || null;
}

export const LAYOUT_COUNT = Object.keys(LAYOUTS).length;
