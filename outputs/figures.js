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
 * LICENSING. Every file here was licence-checked through the Wikimedia Commons
 * API before it was downloaded, and the download refuses anything whose licence
 * is not demonstrably free. The author, licence and source page below were read
 * from that same API response rather than typed in, so the credit the app shows
 * cannot drift from the credit the licence requires. CC BY and CC BY-SA both
 * require attribution; the app renders it on the figure itself.
 *
 * 17 figures, 5,447,435 bytes total.
 */

export const FIGURES = {
  nephron: {
    file: 'nephron.jpg', bytes: 732344,
    title: 'The nephron, with cortex and medulla',
    caption: 'The loop of Henle plunging deep into the medulla is the whole point of the countercurrent multiplier — and the thing the old hand-drawn version failed to show.',
    author: 'OpenStax College',
    licence: 'CC BY 3.0',
    licenceUrl: 'https://creativecommons.org/licenses/by/3.0',
    commons: 'https://commons.wikimedia.org/wiki/File%3A2618_Nephron_Secretion_Reabsorption.jpg',
  },
  conduction: {
    file: 'cardiac-conduction.svg', bytes: 104520,
    title: 'The cardiac conducting system',
    caption: 'SA node, AV node, bundle of His, bundle branches and Purkinje fibres in their real positions inside the chambers.',
    author: 'Madhero88',
    licence: 'CC BY-SA 3.0',
    licenceUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    commons: 'https://commons.wikimedia.org/wiki/File%3AConductionsystemoftheheartwithoutHeart.svg',
  },
  ecgCycle: {
    file: 'ecg-sinus-rhythm.svg', bytes: 38919,
    title: 'Sinus rhythm, labelled',
    caption: 'P wave, QRS complex, T wave, and the PR and QT intervals marked on an actual trace.',
    author: 'Created by Agateller (Anthony Atkielski) , converted to svg by atom .',
    licence: 'Public domain',
    licenceUrl: '',
    commons: 'https://commons.wikimedia.org/wiki/File%3ASinusRhythmLabels.svg',
  },
  circuits: {
    file: 'heart-diagram.svg', bytes: 99098,
    title: 'The heart and its great vessels',
    caption: 'Chambers, valves and the direction of flow, with the two circuits as they really connect.',
    author: 'Wapcaplet',
    licence: 'CC BY-SA 3.0',
    licenceUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
    commons: 'https://commons.wikimedia.org/wiki/File%3ADiagram_of_the_human_heart_%28cropped%29.svg',
  },
  bodyPlanes: {
    file: 'anatomy-planes.svg', bytes: 350808,
    title: 'The anatomical planes',
    caption: 'Median, frontal and transverse planes on a real body rather than a stick figure.',
    author: 'David Richfield and Mikael Häggström, M.D. and cmglee',
    licence: 'CC BY-SA 4.0',
    licenceUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    commons: 'https://commons.wikimedia.org/wiki/File%3AHuman_anatomy_planes%2C_labeled.svg',
  },
  emSpectrum: {
    file: 'em-spectrum.svg', bytes: 76057,
    title: 'The electromagnetic spectrum',
    caption: 'Wavelength, frequency and where the ionising boundary actually falls.',
    author: 'Inductiveload , NASA',
    licence: 'CC BY-SA 3.0',
    licenceUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
    commons: 'https://commons.wikimedia.org/wiki/File%3AEM_Spectrum_Properties_edit.svg',
  },
  synovialTypes: {
    file: 'synovial-joints.jpg', bytes: 741895,
    title: 'The six synovial joint types',
    caption: 'Each type shown on the joint in the body where it occurs.',
    author: 'OpenStax College',
    licence: 'CC BY 3.0',
    licenceUrl: 'https://creativecommons.org/licenses/by/3.0',
    commons: 'https://commons.wikimedia.org/wiki/File%3A907_Synovial_Joints.jpg',
  },
  longBone: {
    file: 'long-bone.jpg', bytes: 36483,
    title: 'Structure of a long bone',
    caption: 'Epiphysis, metaphysis, diaphysis, medullary cavity and periosteum, drawn to proportion.',
    author: 'unknown',
    licence: 'Public domain',
    licenceUrl: '',
    commons: 'https://commons.wikimedia.org/wiki/File%3AIllu_long_bone.jpg',
  },
  muscleTypes: {
    file: 'muscle-tissue-types.jpg', bytes: 488590,
    title: 'Skeletal, smooth and cardiac muscle',
    caption: 'The three tissue types as micrographs — striation and nuclei are things you have to see, not read about.',
    author: 'OpenStax College',
    licence: 'CC BY 4.0',
    licenceUrl: 'https://creativecommons.org/licenses/by/4.0',
    commons: 'https://commons.wikimedia.org/wiki/File%3A414_Skeletal_Smooth_Cardiac.jpg',
  },
  bloodComposition: {
    file: 'blood-components.jpg', bytes: 21406,
    title: 'What blood is made of',
    caption: 'Plasma, buffy coat and packed red cells after centrifuging — which is what haematocrit measures.',
    author: 'unknown',
    licence: 'Public domain',
    licenceUrl: '',
    commons: 'https://commons.wikimedia.org/wiki/File%3AIllu_blood_components.jpg',
  },
  gasTransport: {
    file: 'respiratory-system.svg', bytes: 282267,
    title: 'The respiratory system',
    caption: 'The whole tract from nose to alveoli, with the conducting and respiratory portions in place.',
    author: 'LadyofHats , Jmarchn',
    licence: 'Public domain',
    licenceUrl: '',
    commons: 'https://commons.wikimedia.org/wiki/File%3ARespiratory_system_complete_en.svg',
  },
  nervousDivisions: {
    file: 'nervous-system-overview.jpg', bytes: 326803,
    title: 'Divisions of the nervous system',
    caption: 'CNS against PNS, and the somatic and autonomic branches.',
    author: 'OpenStax',
    licence: 'CC BY 4.0',
    licenceUrl: 'https://creativecommons.org/licenses/by/4.0',
    commons: 'https://commons.wikimedia.org/wiki/File%3A1201_Overview_of_Nervous_System.jpg',
  },
  synovialJoint: {
    file: 'synovial-joint-structure.png', bytes: 44554,
    title: 'Inside a synovial joint',
    caption: 'Capsule, synovial membrane, joint cavity and articular cartilage in section.',
    author: 'Henry Vandyke Carter',
    licence: 'Public domain',
    licenceUrl: '',
    commons: 'https://commons.wikimedia.org/wiki/File%3AGray349.png',
  },
  bodyCavities: {
    file: 'body-cavities.png', bytes: 390375,
    title: 'The body cavities',
    caption: 'Dorsal against ventral, and the thoracic and abdominopelvic subdivisions.',
    author: 'OpenStax',
    licence: 'CC BY 3.0',
    licenceUrl: 'https://creativecommons.org/licenses/by/3.0',
    commons: 'https://commons.wikimedia.org/wiki/File%3ABody_Cavities_labeled.png',
  },
  jointMovements: {
    file: 'body-movements.jpg', bytes: 1333137,
    title: 'Movements at a joint',
    caption: 'Flexion, extension, abduction, adduction and rotation shown on the body, not described in a box.',
    author: 'Tonye Ogele CNX',
    licence: 'CC BY-SA 3.0',
    licenceUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    commons: 'https://commons.wikimedia.org/wiki/File%3ABody_Movements_I.jpg',
  },
  heart: {
    file: 'heart-interior.svg', bytes: 349859,
    title: 'Inside the heart',
    caption: 'The chambers as they actually are: a thick, round left ventricle reaching the apex against a thin, pouch-shaped right ventricle — not four equal quadrants of an oval.',
    author: 'ZooFari',
    licence: 'CC BY-SA 3.0',
    licenceUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    commons: 'https://commons.wikimedia.org/wiki/File%3AHeart_diagram-en.svg',
  },
  vertebra: {
    file: 'vertebra-superior.png', bytes: 30320,
    title: 'A vertebra from above',
    caption: 'Body, foramen, pedicle, lamina and the processes in their real proportions.',
    author: 'Henry Vandyke Carter',
    licence: 'Public domain',
    licenceUrl: '',
    commons: 'https://commons.wikimedia.org/wiki/File%3AGray93.png',
  },
};

export function figureFor(id) {
  const f = FIGURES[id];
  return f ? { ...f, src: 'assets/figures/' + f.file } : null;
}

/* True where the app still draws it itself, because there is nothing to depict. */
export function isHandDrawn(id) { return !FIGURES[id]; }
