/*
 * Synonyms — the other names for the same thing.
 *
 * WHY
 *
 * The model is named in one register: strict Terminologia Anatomica, British
 * spelling, no eponyms. Students search in every other register — the lay word
 * ("voice box"), the American spelling ("esophagus"), the eponym ("Achilles"),
 * the abbreviation ("SVC"), the clinical shorthand ("collarbone"). Searching
 * the model's own vocabulary back at it is the one thing that always works and
 * the one thing a learner cannot do yet.
 *
 * So the query is expanded before it is matched: type any name for a structure
 * and you get the structure.
 *
 * TWO EXPORTS
 *
 *   SYNONYMS      typed term -> the other terms that mean the same thing.
 *                 Symmetric by construction: expand() closes the map both ways,
 *                 so listing ['larynx','voice box'] once makes each find the
 *                 other. Groups, not pairs — every member matches every other.
 *
 *   NOT_MODELLED  structures a student will reasonably search for that no GLB
 *                 layer contains, each pointing at the nearest structure that
 *                 IS there. This is the same honesty rule the rest of the app
 *                 follows: MODEL_CATALOG records coverage AND gaps, cavity
 *                 geometry is flagged `exact` or not. A search that silently
 *                 returns nothing teaches the student that they typed the
 *                 wrong word, which is false and is the worse failure.
 *
 * NOT COURSE MATERIAL. These are navigation aids — standard alternative
 * terminology, the same category as the `aliases` already carried in
 * bodymap.js and anatomy-data.js — so they carry no sourceRefs and generate no
 * study items.
 */

/* Each inner array is one group of names for one thing. */
const GROUPS = [
  /* ---- airway and throat (the reported gap) ---- */
  ['pharynx', 'throat', 'pharyngeal'],
  ['nasopharynx', 'postnasal space', 'epipharynx'],
  ['oropharynx', 'mesopharynx'],
  ['laryngopharynx', 'hypopharynx'],
  ['larynx', 'voice box', 'laryngeal'],
  ['epiglottis', 'epiglottic cartilage'],
  ['trachea', 'windpipe'],
  ['oesophagus', 'esophagus', 'gullet', 'food pipe'],
  ['soft palate', 'velum'],
  ['uvula of palate', 'uvula'],

  /* ---- spelling: the app is British, half the textbooks are not ---- */
  ['caecum', 'cecum'],
  ['colour', 'color'],
  ['fibrous', 'fibrose'],
  ['haemorrhoidal', 'hemorrhoidal'],
  ['oesophageal', 'esophageal'],
  ['coeliac', 'celiac'],
  ['caecal', 'cecal'],
  ['oedema', 'edema'],

  /* ---- bones by their everyday names ---- */
  ['clavicle', 'collarbone', 'collar bone'],
  ['scapula', 'shoulder blade', 'wing bone'],
  ['sternum', 'breastbone', 'breast bone'],
  ['patella', 'kneecap', 'knee cap'],
  ['coccyx', 'tailbone', 'tail bone'],
  ['mandible', 'lower jaw', 'jawbone', 'jaw bone'],
  ['maxilla', 'upper jaw'],
  ['cranium', 'skull', 'skull vault', 'calvaria'],
  ['femur', 'thigh bone', 'thighbone'],
  ['tibia', 'shin bone', 'shinbone'],
  ['fibula', 'calf bone'],
  ['humerus', 'upper arm bone'],
  ['hip bone', 'innominate bone', 'os coxae', 'coxal bone', 'pelvic bone'],
  ['vertebral column', 'spine', 'backbone', 'spinal column'],
  ['costa', 'rib'],
  ['hyoid bone', 'lingual bone'],
  ['occipital bone', 'back of the skull'],
  ['nasal septum', 'septum of the nose'],
  ['vomer', 'ploughshare bone'],

  /* ---- organs and viscera ---- */
  ['kidney', 'renal', 'nephric'],
  ['liver', 'hepatic'],
  ['stomach', 'gastric'],
  ['spleen', 'splenic'],
  ['gallbladder', 'gall bladder', 'cholecyst', 'biliary'],
  ['urinary bladder', 'bladder', 'vesical'],
  ['vermiform appendix', 'appendix'],
  ['large intestine', 'colon', 'bowel', 'large bowel'],
  ['small intestine', 'small bowel'],
  ['suprarenal gland', 'adrenal gland', 'adrenal'],
  ['uterine tube', 'fallopian tube', 'oviduct', 'salpinx'],
  ['adenohypophysis', 'anterior pituitary'],
  ['neurohypophysis', 'posterior pituitary'],
  ['hypophysis', 'pituitary gland', 'pituitary'],
  ['pineal gland', 'epiphysis cerebri'],
  ['renal pelvis', 'pyelum'],
  ['parotid gland', 'parotid'],
  ['greater omentum', 'gastrocolic omentum'],
  ['lesser omentum', 'gastrohepatic omentum'],
  ['testis', 'testicle'],
  ['ductus deferens', 'vas deferens'],
  ['seminal gland', 'seminal vesicle'],

  /* ---- heart and vessels ---- */
  ['superior vena cava', 'svc'],
  ['inferior vena cava', 'ivc'],
  ['left atrium', 'la'],
  ['right atrium', 'ra'],
  ['left ventricle', 'lv'],
  ['right ventricle', 'rv'],
  ['pulmonary trunk', 'main pulmonary artery'],
  ['left atrioventricular valve', 'mitral valve', 'bicuspid valve'],
  ['right atrioventricular valve', 'tricuspid valve'],
  ['myocardium', 'heart muscle'],
  ['pericardium', 'heart sac'],
  ['coronary', 'cardiac artery'],

  /* ---- muscles by the names the gym uses ---- */
  ['trapezius', 'traps'],
  ['latissimus dorsi', 'lats'],
  ['biceps brachii', 'biceps'],
  ['triceps brachii', 'triceps'],
  ['gluteus maximus', 'glutes', 'glute'],
  ['gastrocnemius', 'calf muscle', 'calf'],
  ['quadriceps femoris', 'quads', 'quadriceps'],
  ['rectus abdominis', 'abs', 'six pack'],
  ['pectoralis major', 'pecs', 'pec'],
  ['calcaneal tendon', 'achilles tendon', 'achilles', 'tendo calcaneus'],
  ['diaphragm', 'thoracic diaphragm'],
  ['sternocleidomastoid', 'scm'],

  /* ---- nerves and brain ---- */
  ['medulla oblongata', 'medulla', 'bulb'],
  ['cerebrum', 'forebrain'],
  ['cerebellum', 'little brain'],
  ['corpus callosum', 'great commissure'],
  ['olfactory nerve', 'cranial nerve i', 'first cranial nerve', 'cn i'],
  ['optic nerve', 'cranial nerve ii', 'second cranial nerve', 'cn ii'],
  ['oculomotor nerve', 'cranial nerve iii', 'third cranial nerve', 'cn iii'],
  ['trochlear nerve', 'cranial nerve iv', 'fourth cranial nerve', 'cn iv'],
  ['trigeminal nerve', 'cranial nerve v', 'fifth cranial nerve', 'cn v'],
  ['abducent nerve', 'abducens nerve', 'cranial nerve vi', 'sixth cranial nerve', 'cn vi'],
  ['facial nerve', 'cranial nerve vii', 'seventh cranial nerve', 'cn vii'],
  ['vestibulocochlear nerve', 'cranial nerve viii', 'eighth cranial nerve', 'cn viii', 'auditory nerve'],
  ['glossopharyngeal nerve', 'cranial nerve ix', 'ninth cranial nerve', 'cn ix'],
  ['vagus nerve', 'cranial nerve x', 'tenth cranial nerve', 'cn x', 'pneumogastric nerve'],
  ['accessory nerve', 'cranial nerve xi', 'eleventh cranial nerve', 'cn xi'],
  ['hypoglossal nerve', 'cranial nerve xii', 'twelfth cranial nerve', 'cn xii'],
  ['spinal cord', 'medulla spinalis'],

  /* ---- lungs and pleura ---- */
  ['lung', 'pulmonary', 'pulmo'],
  ['pleura', 'pleural membrane'],
  ['bronchus', 'bronchi', 'bronchial'],
  ['alveolus', 'alveoli', 'air sac'],

  /* ---- regional and directional words a search may carry ---- */
  ['abdomen', 'belly', 'abdominal'],
  ['thorax', 'chest', 'thoracic'],
  ['pelvis', 'pelvic'],
  ['axilla', 'armpit'],
  ['cubital fossa', 'elbow pit'],
  ['popliteal fossa', 'knee pit'],
  ['umbilicus', 'navel', 'belly button'],
  ['carpus', 'wrist'],
  ['tarsus', 'ankle'],
  ['digit', 'finger', 'toe', 'phalanx'],
  ['pollex', 'thumb'],
  ['hallux', 'big toe', 'great toe'],
];

/*
 * Composites — one name, several meshes.
 *
 * The model is built from named parts, so a student who types the name of the
 * WHOLE — larynx, middle ear, laryngeal skeleton — gets nothing, even though
 * every part of it is loaded and selectable. The larynx is the case that
 * prompted this: there is no mesh called "larynx", but the thyroid, cricoid,
 * arytenoid and corniculate cartilages are all in the skeleton layer, the
 * intrinsic muscles are in the muscle layer, and the epiglottis is in organs.
 *
 * Saying "not modelled" here would have been simply false. So a composite
 * announces what the whole is made of and opens the part named first.
 *
 * Every `parts` entry is checked against the generated index by
 * work/search-probe.mjs, so a renamed mesh fails the build rather than
 * quietly pointing at nothing.
 */
export const COMPOSITES = [
  { term: 'larynx', also: ['voice box', 'laryngeal skeleton', 'laryngeal cartilages'],
    name: 'Larynx',
    note: 'Modelled as its parts, not as one mesh: the thyroid, cricoid, arytenoid and corniculate cartilages in the skeleton layer, the epiglottis in organs.',
    parts: [['skeleton', 'Thyroid cartilage'], ['skeleton', 'Cricoid cartilage'],
      ['skeleton', 'Arytenoid cartilage'], ['skeleton', 'Corniculate cartilage'],
      ['organs', 'Epiglottis']] },
  { term: 'middle ear', also: ['ossicle', 'ossicles', 'auditory ossicles', 'ear bones'],
    name: 'Auditory ossicles',
    note: 'The three smallest bones in the body, each a separate mesh in the skeleton layer, with the eardrum in the nervous layer.',
    parts: [['skeleton', 'Malleus'], ['skeleton', 'Incus'], ['skeleton', 'Stapes'],
      ['nervous', 'Tympanic membrane']] },
  { term: 'eyeball', also: ['eye', 'globe of the eye'],
    name: 'Eyeball',
    note: 'Modelled as its coats and contents in the nervous layer: sclera, cornea, iris, lens, retina and the vitreous body.',
    parts: [['nervous', 'Sclera'], ['nervous', 'Cornea'], ['nervous', 'Iris'],
      ['nervous', 'Lens'], ['nervous', 'Retina'], ['nervous', 'Vitreous body']] },
  { term: 'thymus', also: ['thymus gland'],
    name: 'Thymus',
    note: 'In the lymphatic layer, as its two lobes.',
    parts: [['lymphatic', 'Left lobe of thymus'], ['lymphatic', 'Right lobe of thymus']] },
];

/*
 * Structures a student will search for that no layer contains.
 *
 * Short on purpose, and every claim on it was checked against the generated
 * index — an earlier draft of this list asserted that the larynx, the eye, the
 * ear and the thymus were all missing, and every one of those was wrong. A
 * false "not modelled" is worse than no answer, because the student stops
 * looking. See COMPOSITES above for the far more common case.
 *
 * `near` names the closest structure that IS modelled, so the search hands the
 * student somewhere real to look instead of an empty box.
 */
export const NOT_MODELLED = [
  { term: 'breast', also: ['mammary gland', 'nipple', 'areola'],
    near: 'Sternocostal head of pectoralis major muscle', layer: 'muscle',
    why: 'The breast is not in any layer. It lies on the pectoralis major, which is — modelled as its separate heads rather than as one muscle.' },
  { term: 'uterus', also: ['womb', 'uterine tube', 'fallopian tube', 'ovary', 'vagina',
      'cervix', 'endometrium', 'oviduct', 'female reproductive system'],
    near: 'Urinary bladder', layer: 'organs',
    why: 'This model is male: no female reproductive organs are present in any layer. The bladder is the shared pelvic landmark they would lie behind.' },
  { term: 'skin', also: ['integument', 'epidermis', 'dermis'],
    near: 'Rectus abdominis muscle', layer: 'muscle',
    why: 'There is no skin mesh — muscle is the outermost layer the model carries. Anything drawn on the body surface is measured from the muscle layer instead.' },
];

/* term -> Set of every other term in its group, closed symmetrically. */
const MAP = new Map();
for (const group of GROUPS) {
  for (const term of group) {
    const key = term.toLowerCase();
    let set = MAP.get(key);
    if (!set) { set = new Set(); MAP.set(key, set); }
    for (const other of group) if (other.toLowerCase() !== key) set.add(other.toLowerCase());
  }
}
/* Both tables also act as synonym groups: their `also` lists are alternative
   names for the same idea, which is exactly what SYNONYMS holds. Composites
   additionally pull in their own part names, so "larynx" reaches the cricoid
   cartilage even though the two words share no letters. */
for (const row of [...NOT_MODELLED, ...COMPOSITES]) {
  const names = [row.term, ...row.also, ...(row.parts || []).map(([, mesh]) => mesh.toLowerCase())];
  for (const term of names) {
    const key = term.toLowerCase();
    let set = MAP.get(key);
    if (!set) { set = new Set(); MAP.set(key, set); }
    for (const other of names) if (other.toLowerCase() !== key) set.add(other.toLowerCase());
  }
}

export const SYNONYMS = MAP;

/*
 * Every term worth matching for this query, the query itself first.
 *
 * Exact hits come first, then any group the query is a WHOLE WORD of, so
 * typing "renal" pulls in "kidney" but typing "ren" does not pull in the
 * kidney, the renal pelvis and every renal vessel at once. Substring matching
 * on a two-letter prefix is how a synonym table stops being useful.
 */
export function expandQuery(q) {
  const needle = String(q || '').toLowerCase().trim();
  if (!needle) return [];
  const out = new Set([needle]);
  const direct = MAP.get(needle);
  if (direct) direct.forEach((t) => out.add(t));
  if (needle.length >= 4) {
    for (const [term, set] of MAP) {
      if (out.has(term)) continue;
      /* whole-word containment either way: "vagus nerve" finds "vagus", and
         "cranial nerve x" finds the group keyed on the full phrase */
      const inTerm = term === needle
        || term.startsWith(needle + ' ') || term.endsWith(' ' + needle)
        || term.includes(' ' + needle + ' ');
      if (!inTerm) continue;
      out.add(term);
      set.forEach((t) => out.add(t));
    }
  }
  return [...out];
}

const asks = (row, needle) => [row.term, ...row.also].some((t) =>
  t === needle || t.startsWith(needle + ' ') || t.endsWith(' ' + needle));

/* The NOT_MODELLED row this query is asking for, if any. */
export function missingFor(q) {
  const needle = String(q || '').toLowerCase().trim();
  if (needle.length < 3) return null;
  return NOT_MODELLED.find((row) => asks(row, needle)) || null;
}

/* The COMPOSITES row this query is asking for, if any. */
export function compositeFor(q) {
  const needle = String(q || '').toLowerCase().trim();
  if (needle.length < 3) return null;
  return COMPOSITES.find((row) => asks(row, needle)) || null;
}
