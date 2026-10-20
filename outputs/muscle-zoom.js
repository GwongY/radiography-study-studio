/*
 * Muscle zoom — the levels and their labels, the data and nothing else.
 *
 * A tapped skeletal muscle opens studio/muscle-zoom.js, which walks down the
 * slide's own "Organization of muscle" (HSS2011 W1 p32): the muscle, a
 * fascicle, a muscle fiber, a myofibril, a sarcomere, and from the fiber the
 * neuromuscular junction (ABCT2326 Lectures 9-10). The geometry is procedural
 * (muscle/zoom-scene.js); only the first level is the model's own muscle.
 *
 * Every title, label and note shown is a term or phrase the 2026 slides use,
 * and `cite` says where: work/muscle-zoom-check.mjs holds each `match`, and
 * each label's name and note, against the committed page text
 * (work/source-text.json), the comparison revision-check uses. A note is the
 * slide's own words, cut, never rephrased. `revise` names the Revise boxes the
 * label is ([subject, box id]); the check holds each to a real box.
 * No teaching prose.
 */

const MSK = 'hss.msk.2026';   /* HSS2011 W1 Musculoskeletal System, 2026 */
const L9 = 'phys.l9.2026';    /* ABCT2326 Lectures 9-10 Muscle, 2026 */
const L5 = 'hss.l5.2026';     /* HSS2011 W5 Nervous system I, 2026 */

/* Short names for the cite line; the registry (study/course-data.js) has the files. */
export const ZOOM_SOURCES = {
  [MSK]: 'HSS2011 W1 Musculoskeletal',
  [L9]: 'ABCT2326 Muscle',
  [L5]: 'HSS2011 W5 Nervous system I',
};

/*
 * Levels, outermost first. `next` is the level "Zoom in" goes to; `side` a
 * second way in (the junction sits on a fiber). `title` is shown as the
 * level's name and is checked like a label; the whole-muscle level is named
 * after the tapped muscle instead, so it carries no title.
 */
export const LEVELS = [
  { id: 'whole', next: 'organisation' },
  { id: 'organisation', title: 'Organization of muscle', cite: [{ ref: MSK, page: 32, match: 'Organization of muscle' }], next: 'fascicle' },
  { id: 'fascicle', title: 'Fascicle', cite: [{ ref: MSK, page: 32, match: 'Fascicle' }], next: 'fiber' },
  { id: 'fiber', title: 'Muscle fiber', cite: [{ ref: MSK, page: 32, match: 'Muscle fiber (Myocyte)' }], next: 'myofibril', side: 'nmj' },
  { id: 'myofibril', title: 'Myofibril', cite: [{ ref: MSK, page: 32, match: 'Myofibril' }], next: 'sarcomere' },
  { id: 'sarcomere', title: 'Sarcomere', cite: [{ ref: MSK, page: 33, match: 'The arrangement of filaments within a sarcomere' }] },
  { id: 'nmj', title: 'Neuromuscular Junction (NMJ)', cite: [{ ref: L9, page: 28, match: 'Neuromuscular Junction (NMJ)' }], back: 'fiber' },
];

/*
 * Labels, by level. `part` is the procedural piece the label points at
 * (muscle/zoom-scene.js builds one per part and the check holds the two
 * together). `note` is optional and must be on a cited page.
 */
export const LABELS = {
  whole: [],
  organisation: [
    { id: 'tendon', l: 'Tendon', note: 'Dense regular connective tissues', cite: [{ ref: MSK, page: 32, match: 'Muscle Tendon Epimysium' }, { ref: MSK, page: 34, match: 'transmit forces generated from muscle to the bone' }], revise: [['HSS2011', 'w1_tendon'], ['ABCT2326', 'p11_tendons']] },
    { id: 'epimysium', l: 'Epimysium', cite: [{ ref: MSK, page: 32, match: 'Epimysium' }, { ref: MSK, page: 34, match: 'continuous with the endo-, peri-, and epimysium' }], revise: [['HSS2011', 'w1_epimysium']] },
    { id: 'fascicles', l: 'Fascicles', cite: [{ ref: MSK, page: 32, match: 'Fascicles' }], revise: [['HSS2011', 'w1_fascicle']] },
    { id: 'perimysium', l: 'Perimysium', cite: [{ ref: MSK, page: 32, match: 'Perimysium' }], revise: [['HSS2011', 'w1_perimysium']] },
  ],
  fascicle: [
    { id: 'perimysium', l: 'Perimysium', cite: [{ ref: MSK, page: 32, match: 'Perimysium' }], revise: [['HSS2011', 'w1_perimysium']] },
    { id: 'fibers', l: 'Muscle fibers', note: 'Muscle fibers = muscle cells', cite: [{ ref: MSK, page: 32, match: 'Muscle fibers' }, { ref: L9, page: 15, match: 'Muscle fibers = muscle cells' }], revise: [['HSS2011', 'w1_musfibre']] },
    { id: 'endomysium', l: 'Endomysium', cite: [{ ref: MSK, page: 32, match: 'Endomysium' }], revise: [['HSS2011', 'w1_endomysium'], ['ABCT2326', 'p11_endomysium']] },
  ],
  fiber: [
    { id: 'endomysium', l: 'Endomysium', note: 'Ensheathed by thin connective tissue layer called endomysium', cite: [{ ref: L9, page: 14, match: 'connective tissue layer called endomysium' }], revise: [['ABCT2326', 'p11_endomysium']] },
    { id: 'sarcolemma', l: 'Sarcolemma', note: 'the plasma membrane of the muscle fibre', cite: [{ ref: L9, page: 15, match: 'Definitions of sarcolemma = the plasma membrane of the muscle fibre' }], revise: [['ABCT2326', 'p11_sarcolemma']] },
    { id: 'nuclei', l: 'Nuclei', note: 'Nuclei multiple and peripherally located', cite: [{ ref: L9, page: 7, match: 'Nuclei multiple and peripherally located' }] },
    { id: 'myofibrils', l: 'Myofibrils', note: 'Each fiber is packed with myofibrils', cite: [{ ref: L9, page: 17, match: 'Each fiber is packed with myofibrils' }], revise: [['HSS2011', 'w1_myofibril'], ['ABCT2326', 'p11_myofibrils']] },
    { id: 'sr', l: 'Sarcoplasmic Reticulum', note: 'membrane bound structures found in muscle that stores Ca2+', cite: [{ ref: L9, page: 8, match: 'SR = Sarcoplasmic Reticulum' }], revise: [['ABCT2326', 'p11_sr']] },
    { id: 'ttubules', l: 'T tubules', note: 'T tubules are extensions of sarcolemma', cite: [{ ref: L9, page: 32, match: 'T tubules are extensions of sarcolemma' }], revise: [['ABCT2326', 'p11_t_tubules']] },
  ],
  myofibril: [
    { id: 'sarcomere', l: 'Sarcomere', note: 'components between 2 Z discs', cite: [{ ref: MSK, page: 33, match: 'Sarcomere' }, { ref: L9, page: 19, match: 'consisting of components between 2 Z discs' }], revise: [['HSS2011', 'w1_sarcomere'], ['ABCT2326', 'p_sarcomere']] },
    { id: 'aband', l: 'A band', note: 'A band is dark', cite: [{ ref: L9, page: 18, match: 'A band is dark' }], revise: [['ABCT2326', 'p11_a_band']] },
    { id: 'iband', l: 'I band', note: 'I band is light', cite: [{ ref: L9, page: 18, match: 'I band is light' }], revise: [['ABCT2326', 'p11_i_band']] },
    { id: 'hzone', l: 'H zone', note: 'Light area at center of A band is H zone', cite: [{ ref: L9, page: 18, match: 'Light area at center of A band is H zone' }], revise: [['ABCT2326', 'p11_h_zone']] },
    { id: 'zdisc', l: 'Z disc', note: 'At center of I band is Z line/disc where actins attach', cite: [{ ref: L9, page: 18, match: 'At center of I band is Z line/disc where actins attach' }, { ref: L9, page: 19, match: 'components between 2 Z discs' }], revise: [['ABCT2326', 'p11_z_disc']] },
  ],
  sarcomere: [
    { id: 'thick', l: 'Thick filaments', note: 'mostly myosin', cite: [{ ref: L9, page: 18, match: 'thick filaments (mostly myosin)' }], revise: [['ABCT2326', 'p11_thick_filaments'], ['HSS2011', 'w1_myosin']] },
    { id: 'thin', l: 'Thin filaments', note: 'mostly actin', cite: [{ ref: L9, page: 18, match: 'contain thin filaments (mostly actin)' }], revise: [['ABCT2326', 'p11_thin_filaments'], ['HSS2011', 'w1_actin']] },
    { id: 'gactins', l: 'G-actins', note: 'double row of G-actins (that make up actin thin filament)', cite: [{ ref: L9, page: 26, match: 'double row of G-actins (that make up actin thin filament)' }], revise: [['ABCT2326', 'p11_g_actins']] },
    { id: 'heads', l: 'Myosin head', cite: [{ ref: L9, page: 25, match: 'activated myosin head pivots' }], revise: [['ABCT2326', 'p11_myosin_head']] },
    { id: 'zdisc', l: 'Z disc', note: 'where actins attach', cite: [{ ref: L9, page: 18, match: 'Z line/disc where actins attach' }, { ref: L9, page: 19, match: 'Titin is elastic protein attaching myosin to Z disc' }], revise: [['ABCT2326', 'p11_z_disc']] },
    { id: 'mline', l: 'M line', note: 'M lines are structural proteins that anchor myosin during contraction', cite: [{ ref: L9, page: 19, match: 'M lines are structural proteins that anchor myosin during contraction' }], revise: [['ABCT2326', 'p11_m_line']] },
    { id: 'titin', l: 'Titin', note: 'Titin is elastic protein attaching myosin to Z disc', cite: [{ ref: L9, page: 19, match: 'Titin is elastic protein attaching myosin to Z disc' }], revise: [['ABCT2326', 'p11_titin']] },
    { id: 'aband', l: 'A band', note: 'corresponds to the length of thick filaments', cite: [{ ref: L9, page: 18, match: 'corresponds to the length of thick filaments' }], revise: [['ABCT2326', 'p11_a_band']] },
    { id: 'iband', l: 'I band', note: 'corresponds to the distance between A bands', cite: [{ ref: L9, page: 18, match: 'corresponds to the distance between A bands' }], revise: [['ABCT2326', 'p11_i_band']] },
    { id: 'hzone', l: 'H zone', note: 'area where actin and myosin don’t overlap', cite: [{ ref: L9, page: 18, match: 'area where actin and myosin don’t overlap' }], revise: [['ABCT2326', 'p11_h_zone']] },
  ],
  nmj: [
    { id: 'neuron', l: 'Motor neuron', note: 'single synaptic ending of the motor neuron innervating each muscle fiber', cite: [{ ref: L9, page: 28, match: 'single synaptic ending of the motor neuron innervating each muscle fiber' }], revise: [['ABCT2326', 'p_nmj'], ['HSS2011', 'w5_nmj']] },
    { id: 'terminal', l: 'Axon terminal', cite: [{ ref: L9, page: 29, match: 'The cytoplasm of the axon terminal contains vesicles' }] },
    { id: 'vesicles', l: 'Vesicles', note: 'vesicles filled with molecules of acetylcholine', cite: [{ ref: L9, page: 29, match: 'vesicles filled with molecules of acetylcholine' }, { ref: L5, page: 21, match: 'ACh packaged in pre-synaptic vesicles' }] },
    { id: 'ach', l: 'Acetylcholine (ACh)', note: 'Acetylcholine is a neurotransmitter', cite: [{ ref: L9, page: 29, match: 'Acetylcholine is a neurotransmitter' }], revise: [['ABCT2326', 'p11_ach']] },
    { id: 'cleft', l: 'Synaptic cleft', note: 'narrow space that separates the axon terminal of the neuron from the opposing motor end plate', cite: [{ ref: L9, page: 29, match: 'narrow space that separates the axon terminal of the neuron from the opposing motor end plate' }], revise: [['ABCT2326', 'p11_synaptic_cleft']] },
    { id: 'receptors', l: 'ACh receptors', note: 'ACh receptors on the surface of the motor end plate', cite: [{ ref: L9, page: 30, match: 'ACh receptors on the surface of the motor end plate' }], revise: [['ABCT2326', 'p11_ach_receptors']] },
    { id: 'ache', l: 'Acetylcholinesterase (AChE)', note: 'breaks down ACh', cite: [{ ref: L9, page: 29, match: 'acetylcholinesterase (AChE), which breaks down ACh' }], revise: [['ABCT2326', 'p11_ache']] },
    { id: 'endplate', l: 'Motor end plate', note: 'Place on sarcolemma where NMJ occurs is the motor end plate', cite: [{ ref: L9, page: 28, match: 'Place on sarcolemma where NMJ occurs is the motor end plate' }], revise: [['ABCT2326', 'p11_motor_end_plate']] },
    { id: 'sarcolemma', l: 'Sarcolemma', cite: [{ ref: L9, page: 28, match: 'underlying specializations of sarcolemma' }], revise: [['ABCT2326', 'p11_sarcolemma']] },
  ],
};

/*
 * The contraction slider, on the myofibril and sarcomere levels: the sliding
 * filaments as the summary slide states them (p27) — the filaments keep their
 * length, the A band keeps its length, the I bands and the H zone shorten and
 * Z disc comes closer to Z disc. The two ends are named in the slides' words.
 */
export const CONTRACTION = {
  levels: ['myofibril', 'sarcomere'],
  ends: ['Relaxed muscle', 'During contraction'],
  cite: [
    { ref: L9, page: 26, match: 'In relaxed muscle' },
    { ref: L9, page: 27, match: 'the length of each filament remains the same during contraction' },
    { ref: L9, page: 27, match: 'The A bands remain the same length during contraction' },
    { ref: L9, page: 27, match: 'The H bands shorten during contraction' },
  ],
  revise: [['ABCT2326', 'p_sliding']],
};

export const levelById = (id) => LEVELS.find((l) => l.id === id) || null;
