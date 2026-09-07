/*
 * Body systems — which named system a mesh belongs to, inside its GLB layer
 *
 * The seven GLB layers are files, not systems. Two of them carry more than one
 * body system each: `dolasim.glb` holds the arteries, the veins AND the heart,
 * and `ic-organlar.glb` holds the airway, the gut, the urinary and genital
 * organs and the endocrine glands. The layer rail showed them as "Vessels" and
 * "Organs", which is the name of the FILE, not of anything the course teaches.
 * HSS2011 examines arterial supply and venous drainage as separate questions,
 * so "Vessels 186/419" was one chip standing in for two answers.
 *
 * This splits the two composite layers into the systems, and leaves the other
 * five alone. It is a pure module -- no three.js, no DOM -- so work/ can run
 * the same classification over the real GLB names that the app runs in the
 * browser, and `work/system-check.mjs` does exactly that.
 *
 * THREE RULES, each of which cost something to learn elsewhere in this app:
 *
 * 1. ORDERED, first match wins. `outputs/studio/region-boxes-how.js` records
 *    what an unordered object-literal classifier did to the toe phalanges.
 *    Order here is argued in the comment above each list.
 *
 * 2. NO CATCH-ALL. A name no rule places returns [] and is REPORTED, never
 *    absorbed into whichever system happens to be first. The same rule the
 *    region classifiers live under, for the same reason.
 *
 * 3. An unplaced mesh still SHOWS. A classifier is a labelling of anatomy that
 *    exists whether or not this file knows about it; a mesh the rules miss must
 *    not vanish from the model, so `systemsOf` returning [] means "show me
 *    whenever any system of my layer is on". work/system-check.mjs fails on any
 *    unplaced name that is not in NOT_ANATOMY, so the escape hatch cannot
 *    quietly become the norm.
 *
 * The systems are NOT the flow classes in physiology.js. Those are a COLOUR
 * taxonomy -- they answer "what does this carry", which is why the salivary
 * glands and the thyroid share one 'gland' class and the genitalia have none.
 * Two classifiers written for two purposes will drift unless something holds
 * them together, so work/system-check.mjs asserts the overlaps that must hold:
 * every 'venous'/'pulmVein' mesh is in Venous, every 'airway' is in
 * Respiratory, every 'gut' is in Digestive, every 'urinary' is in Urogenital.
 */

/* Same flattening as physiology.js classify(), so a name reads identically to
   both classifiers. Side letters are glued onto these names ("Kidneyl") and
   Blender duplicate suffixes are dotted (".001", ".l"), so nothing here may
   require a trailing word boundary. */
const flat = (raw) => String(raw || '').replace(/[._]/g, ' ').toLowerCase();

/*
 * Circulatory, ordered.
 *
 * Veins first, and for the reason physiology.js already gives: 'Inferior vein
 * of left ventricle' is a cardiac vein, so 'ventricle' must not claim it, and
 * 'Deep venous palmar arch' is a vein, so 'arch' must not. The heart proper
 * comes next -- chambers, valves, the conducting tissue -- because 'Aortic
 * valve' would otherwise read as an artery on 'aort'. Arteries last, and the
 * list is deliberately wide (trunk, branch, arch, anastomosis, rete): by the
 * time a name reaches it, it is neither vein nor chamber, and every one of
 * those words names an arterial thing in this atlas.
 *
 * 'Circumflex artery of heart' lands in arterial, not heart, which is why no
 * rule here matches a bare 'heart': a coronary artery is an artery.
 */
const CIRCULATORY = [
  ['venous', /vein|venous|vena|sinus/],
  ['heart', /ventricle|atrium|leaflet|valve|papillary|chordae|septum|myocard|pericard|endocard|auricle|trabecula|fossa ovalis|moderator band|node of|bundle/],
  ['arterial', /arter|aort|trunk|arch|branch|anastomosis|circle of willis|arcade|rete/],
];

/*
 * Organs, ordered.
 *
 * The airway first: it is the one system in this file whose names never
 * collide with another's. Then the urogenital tract, which must be reached
 * before the endocrine glands are tested only in the sense that both are
 * specific -- the collision that actually matters is 'Suprarenal gland'
 * containing 'renal', and it is settled by the word boundary on \brenal
 * rather than by order, because a rule that depends on a neighbour's position
 * breaks the moment somebody sorts the list. physiology.js solves the same
 * collision by ordering; this file solves it by anchoring, and
 * work/system-check.mjs holds both answers against each other.
 *
 * Digestive is last and widest, and it picks up the mouth (tongue, gingiva,
 * palate, salivary glands) as well as the gut and its accessory organs.
 */
const ORGANS = [
  ['respiratory', /lung|bronch|trachea|pleura|alveol|epiglot|nasal cavity|nasopharynx|larynx|vocal/],
  ['urogenital', /kidney|\brenal|ureter|urinary|urethra|testis|epididym|deferens|ejaculatory|seminal|prostate|penis|glans|scrotum|ovar|uterus|vagin/],
  ['endocrine', /thyroid gland|parathyroid|suprarenal|pineal|hypophysis|pituitar/],
  ['digestive', /tongue|gingiva|palate|uvula|parotid|submandibular|sublingual|salivary|oesophag|esophag|stomach|duoden|jejun|ileum|caecum|cecum|colon|rectum|appendix|taenia|omentum|mesocolon|meso-|mesenter|liver|gallbladder|bile|pancrea|pharynx|spleen|tooth|teeth/],
];

/*
 * The skeleton, ordered.
 *
 * NO TRAILING WORD BOUNDARY, per rule at the top of this file, and it bit
 * here first: the runtime label for a rib is 'Eighth_ribl' -- the side letter
 * is glued straight onto the word -- so a rule written as rib classified
 * all 24 side-suffixed ribs into nothing, while work/system-check.mjs read the
 * GLB's own node names ('Eighth rib.l'), matched them, and passed. The check
 * now tries the glued form too.
 *
 * The course teaches the division and examines it: "The axial skeleton is the
 * central column: the skull, the vertebrae, the ribs and the sternum. The
 * appendicular skeleton is everything hanging off it: the shoulder girdle, the
 * upper limbs, the pelvic girdle and the lower limbs." (HSS2011 osteology, the
 * lesson id is hss2011-osteo-axial-appendicular.) One chip called "Skeleton"
 * could not answer the question the lecture actually asks, in the same way one
 * chip called "Vessels" could not separate arterial supply from venous
 * drainage.
 *
 * APPENDICULAR IS TESTED FIRST, and that ordering is the whole classifier.
 * The girdles are the trap the lesson itself names -- "the commonest slip is
 * filing the clavicle and scapula as axial because they sit on the trunk" --
 * so they are matched by name here rather than left to a trunk-shaped rule.
 * The hip bone is appendicular and the sacrum it joins is axial, which is the
 * lesson's own worked example, and the two are separate meshes so the model
 * can show it.
 *
 * 'of hand' and 'of foot' carry the phalanges: this atlas names a toe
 * "Distal phalanx of third finger of foot", so a rule on 'phalanx' alone would
 * have to guess and a rule on 'finger' would take the toes with it.
 *
 * WHAT THE LESSON'S FOUR WORDS DO NOT COVER. The atlas ships more than the 206
 * bones: the teeth, the ear ossicles, the laryngeal and nasal cartilages, the
 * paranasal sinuses and the ethmoid air cells are all in this GLB. Every one
 * of them is on the central axis and none of them is appended to it, so they
 * go with the axial half. That is a decision about which chip DRAWS them, not
 * a claim that a tooth is a bone -- the chip is a view of the model, and the
 * count under it says "structures", not "bones".
 */
const SKELETON = [
  ['appendicular', /clavicle|scapula|humerus|\bradius|\bulna|carpal|scaphoid|lunate|triquetrum|pisiform|trapezium|trapezoid|capitate|hamate|of hand|hip bone|ilium|ischium|pubis|pubic|acetabul|femur|patella|tibia|fibula|tarsal|calcaneus|talus|cuboid|navicular|cuneiform bone|of foot|hallux/],
  ['axial', /cranium|skull|frontal bone|parietal|occipital|temporal bone|sphenoid|ethmoid|lacrimal|nasal|vomer|palatine|zygomat|maxilla|mandible|concha|hyoid|incus|malleus|stapes|ossicle|tooth|teeth|molar|premolar|incisor|canine|vertebra|atlas|\baxis|sacrum|sacral|coccyx|\brib|costal|sternum|manubrium|xiphoid|arytenoid|corniculate|cricoid|thyroid cartilage|epiglot|cuneiform cartilage|alar cartilage/],
];

const RULES = { circulatory: CIRCULATORY, organs: ORGANS, skeleton: SKELETON };

/*
 * A structure that honestly belongs to two systems.
 *
 * The oropharynx and the laryngopharynx are the crossing point: food and air
 * both pass through them, and a student asked to trace either route needs to
 * see them on either chip. They classify as digestive above and are ADDED to
 * respiratory here -- the same shape as REGION_ALSO in region-boxes-how.js,
 * where the sacrum belongs to the column and to the pelvic ring at once.
 *
 * Nothing else is dual. The pancreas is endocrine as well as exocrine, but its
 * islets are not separately modelled, so listing it under Endocrine would show
 * the whole gland and teach the wrong thing about what is in that chip.
 */
const ALSO = {
  organs: [[/oropharynx|laryngopharynx|^pharynx/, 'respiratory']],
};

/*
 * Names that say nothing about what the mesh IS.
 *
 * Two kinds, and the second is not what it first looks like. Blender's default
 * names ("Mesh.003", "Circle") are placeholders. But the circulatory GLB also
 * holds three meshes named "????????", "?x.l" and "?x.r" -- and those are not
 * empty: they carry 1173 and 213 vertices each, so they are real anatomical
 * structures whose names were destroyed in some encoding step long before this
 * repo saw the file. They cannot be classified, because nothing survives to
 * classify, and they must not be guessed at from their geometry.
 *
 * So they are unplaced, which by rule 3 means they follow their LAYER: shown
 * whenever any vessel chip is on, hidden when all three are off. That is the
 * only answer that neither invents a name nor deletes a structure.
 * work/system-check.mjs prints them, so the number stays visible and a fourth
 * one appearing in a future GLB is a changed baseline rather than a silence.
 */
export const UNREADABLE = /^(mesh|circle|cube|sphere|plane|\?+x?)( |$)/;

/*
 * The layer rail, as the user meets it. `layer` is the GLB the chip draws
 * from; several chips can share one. Order is anatomical, and matches the
 * order the old seven chips were in, so the rail did not rearrange itself
 * under anyone who already knew where things were.
 */
export const SYSTEMS = [
  { key: 'axial', label: 'Axial', layer: 'skeleton' },
  { key: 'appendicular', label: 'Appendicular', layer: 'skeleton' },
  { key: 'muscle', label: 'Muscles', layer: 'muscle' },
  { key: 'joint', label: 'Ligaments', layer: 'joint' },
  { key: 'respiratory', label: 'Respiratory', layer: 'organs' },
  { key: 'digestive', label: 'Digestive', layer: 'organs' },
  { key: 'urogenital', label: 'Urogenital', layer: 'organs' },
  { key: 'endocrine', label: 'Endocrine', layer: 'organs' },
  { key: 'arterial', label: 'Arterial', layer: 'circulatory' },
  { key: 'venous', label: 'Venous', layer: 'circulatory' },
  { key: 'heart', label: 'Heart', layer: 'circulatory' },
  { key: 'nervous', label: 'Nerves', layer: 'nervous' },
  { key: 'lymphatic', label: 'Lymphatic', layer: 'lymphatic' },
];

const BY_KEY = SYSTEMS.reduce((a, s) => { a[s.key] = s; return a; }, {});

/* The GLB layer a chip draws from. */
export function layerOf(systemKey) {
  const s = BY_KEY[systemKey];
  return s ? s.layer : systemKey;
}

/* Every chip that draws from one GLB layer. A layer with no split returns the
   single chip that IS that layer. */
export function systemsIn(layerKey) {
  return SYSTEMS.filter((s) => s.layer === layerKey);
}

/* True when this layer is one file showing several systems. */
export function isSplit(layerKey) {
  return systemsIn(layerKey).length > 1;
}

/*
 * Which systems this mesh belongs to. [] means "no rule placed it" — the
 * caller shows it whenever any system of its layer is on. An unsplit layer
 * returns its one system for every mesh, so callers need no special case.
 */
export function systemsOf(layerKey, rawName) {
  const rules = RULES[layerKey];
  if (!rules) {
    const only = systemsIn(layerKey);
    return only.length === 1 ? [only[0].key] : [];
  }
  const n = flat(rawName);
  const out = [];
  for (const [key, re] of rules) { if (re.test(n)) { out.push(key); break; } }
  for (const [re, key] of (ALSO[layerKey] || [])) {
    if (re.test(n) && !out.includes(key)) out.push(key);
  }
  return out;
}

/* The primary system, for anything that needs exactly one answer. */
export function systemOf(layerKey, rawName) {
  return systemsOf(layerKey, rawName)[0] || null;
}

/*
 * The three numbers on a chip, per system.
 *
 * The index and the unit list are passed IN rather than imported, so this file
 * stays free of mesh-index.js and work/ can run the classification on its own.
 * The layer rail and the stage caption both call this, which is the only way
 * "Arterial 100/252" on the chip and "252 structures" in the caption can be
 * guaranteed to be the same count of the same thing.
 *
 * A row the rules place in no system is skipped, not spread across the layer:
 * the only such rows are the placeholder names in the circulatory GLB, and
 * counting them would make every chip of that layer read one too high.
 */
export function systemCounts(meshIndex, units) {
  const out = {};
  const bump = (key, field) => {
    const a = out[key] || (out[key] = { total: 0, course: 0, units: 0 });
    a[field]++;
  };
  for (const m of meshIndex || []) {
    for (const k of systemsOf(m.layer, m.mesh)) {
      bump(k, 'total');
      if (m.tier === 0) bump(k, 'course');
    }
  }
  for (const u of units || []) for (const k of systemsOf(u.layer, u.label)) bump(k, 'units');
  return out;
}
