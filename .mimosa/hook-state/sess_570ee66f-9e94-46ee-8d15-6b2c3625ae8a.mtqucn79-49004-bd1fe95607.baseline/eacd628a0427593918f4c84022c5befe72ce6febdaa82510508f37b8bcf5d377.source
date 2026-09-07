/*
 * landmarks.js -- the one place that knows how to find a named anatomical
 * structure among the meshes that happen to be loaded.
 *
 * WHY THIS EXISTS
 *
 * The cavity and region overlays used to be a set of hand-tuned numbers: a
 * profile of [radius, height] pairs, eyeballed against screenshots until the
 * shape sat roughly inside the ribs. That is a drawing of a cavity, not a
 * cavity. It also silently went wrong whenever the model changed.
 *
 * The viewer already has ~2,900 individually named meshes. Those meshes ARE
 * the anatomy, so they are the source of truth: the thoracic cavity is
 * whatever the inside of THIS rib cage encloses, the pelvic cavity is whatever
 * fits inside THESE hip bones. This module turns a semantic key
 * ("thorax.ribs", "diaphragm", "lung.left") into the actual meshes currently in
 * the scene, so the geometry builders never do name matching themselves.
 *
 * NAME MATCHING
 *
 * three.js sanitises node names on import: whitespace becomes '_' and the
 * reserved set [ ] . : / is deleted. So the GLB's "Hip bone.l" reaches the
 * runtime as "Hip_bonel", and "Costal cartilage of fifth rib.r" as
 * "Costal_cartilage_of_fifth_ribr". Matching therefore runs on a normalised
 * form -- underscores back to spaces, lowercased -- and on a "base" form with
 * the glued side letter removed, which is only safe when the opposite-side twin
 * is actually present (Femur and Vomer genuinely end in r).
 *
 * Patterns are plain lowercase substrings, with optional anchors:
 *   'rib'          -> contains
 *   '^first rib'   -> starts with
 *   'sternum$'     -> ends with
 *   '^liver$'      -> equals
 * `reject` wins over `match`, so a group can say "any rib, but not the costal
 * cartilage of one".
 *
 * AVAILABILITY
 *
 * Six of the seven layers are lazy-loaded, so every landmark records which
 * layer it lives in and every consumer must cope with it being absent. Nothing
 * here throws for a missing structure: resolve() simply returns no meshes and
 * the geometry builder falls back to its next-best reference. See
 * REFERENCE_CHAINS for the declared primary/secondary preference per cavity.
 */

/* ------------------------------------------------------------------ *
 * Name normalisation
 * ------------------------------------------------------------------ */

/** "Costal_cartilage_of_fifth_ribr" -> "costal cartilage of fifth ribr" */
export function normName(raw) {
  return String(raw == null ? '' : raw)
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

/**
 * Strip the glued side letter, but only when the opposite-side twin exists in
 * `all` -- the same two-pass test the model loader uses. Returns
 * {base, side} where side is 'left' | 'right' | null.
 */
export function baseName(norm, all) {
  const m = norm.match(/^(.*[a-z0-9)])([lr])$/);
  if (m) {
    const stem = m[1].trim();
    const twin = stem + (m[2] === 'l' ? 'r' : 'l');
    if (!all || all.has(twin)) return { base: stem, side: m[2] === 'l' ? 'left' : 'right' };
  }
  return { base: norm, side: null };
}

/** A pattern is a substring test with optional ^ / $ anchors. */
export function patternMatches(pattern, value) {
  const start = pattern.startsWith('^');
  const end = pattern.endsWith('$');
  const body = pattern.slice(start ? 1 : 0, pattern.length - (end ? 1 : 0));
  if (start && end) return value === body;
  if (start) return value.startsWith(body);
  if (end) return value.endsWith(body);
  return value.includes(body);
}

/* ------------------------------------------------------------------ *
 * The registry
 *
 * layer: which GLB the structure lives in. 'skeleton' is always loaded;
 *        everything else may be missing.
 * ------------------------------------------------------------------ */

const RIB_WORDS = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth',
  'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth'];

/* rib ordinal -> the level names, so a builder can ask for "ribs 7 and below" */
export const RIB_ORDINALS = RIB_WORDS;

const ribGroup = (label, from, to) => ({
  label,
  layer: 'skeleton',
  match: RIB_WORDS.slice(from - 1, to).map((w) => `^${w} rib`),
  reject: ['costal cartilage'],
});

export const LANDMARKS = {
  /* ---------------- skull ---------------- */
  'skull.vault': {
    label: 'Cranial vault',
    layer: 'skeleton',
    /* the bones that actually enclose the brain -- the face is deliberately out */
    match: ['^frontal bone', '^parietal bone', '^occipital bone', '^temporal bone',
      '^sphenoid bone', '^ethmoid bone'],
    reject: ['sinus', 'cells of'],
  },
  'skull.base': {
    label: 'Cranial base',
    layer: 'skeleton',
    match: ['^occipital bone', '^sphenoid bone', '^temporal bone'],
    reject: ['sinus'],
  },
  'skull.face': {
    label: 'Facial skeleton',
    layer: 'skeleton',
    match: ['^maxilla', '^mandible', '^zygomatic', '^nasal bone', '^vomer', '^palatine bone',
      '^lacrimal bone', '^inferior nasal concha'],
  },

  /* ---------------- vertebral column ---------------- */
  'spine.cervical': {
    label: 'Cervical vertebrae',
    layer: 'skeleton',
    match: ['^atlas', '^axis', '^vertebra c'],
  },
  'spine.thoracic': { label: 'Thoracic vertebrae', layer: 'skeleton', match: ['^vertebra t'] },
  'spine.lumbar': { label: 'Lumbar vertebrae', layer: 'skeleton', match: ['^vertebra l'] },
  'spine.sacrum': { label: 'Sacrum', layer: 'skeleton', match: ['^sacrum$'] },
  'spine.coccyx': { label: 'Coccyx', layer: 'skeleton', match: ['^coccyx$'] },
  'spine.all': {
    label: 'Vertebral column',
    layer: 'skeleton',
    match: ['^atlas', '^axis', '^vertebra ', '^sacrum$', '^coccyx$'],
  },

  /* ---------------- thoracic cage ---------------- */
  'thorax.ribs': {
    label: 'Ribs',
    layer: 'skeleton',
    match: RIB_WORDS.map((w) => `^${w} rib`),
    reject: ['costal cartilage'],
  },
  'thorax.ribsUpper': ribGroup('Upper ribs (1-6)', 1, 6),
  'thorax.ribsLower': ribGroup('Lower ribs (7-12)', 7, 12),
  'thorax.ribFirst': ribGroup('First rib', 1, 1),
  'thorax.costalCartilage': {
    label: 'Costal cartilages',
    layer: 'skeleton',
    match: ['costal cartilage'],
  },
  'thorax.sternum': {
    label: 'Sternum',
    layer: 'skeleton',
    match: ['sternum', '^xiphoid process'],
  },
  'thorax.manubrium': { label: 'Manubrium', layer: 'skeleton', match: ['^manubrium'] },
  /* the body alone -- 'thorax.sternum' matches all three pieces, and the
     manubriosternal and xiphisternal junctions need to tell them apart */
  'thorax.sternumBody': { label: 'Body of sternum', layer: 'skeleton', match: ['^body of sternum'] },
  'thorax.xiphoid': { label: 'Xiphoid process', layer: 'skeleton', match: ['^xiphoid'] },
  /* the surface grid's vertical lines are dropped from the middle of these */
  'thorax.clavicle': { label: 'Clavicle', layer: 'skeleton', match: ['^clavicle'] },
  /* the subcostal plane is taken at the inferior border of the tenth cartilage */
  'thorax.cartilageTenth': {
    label: 'Tenth costal cartilage', layer: 'skeleton', match: ['costal cartilage of tenth rib'],
  },
  /*
   * Individual vertebrae, for the named section levels in
   * studio/tools-and-capture.js. T4 and T5 are here to be CHECKED against, not
   * to be cut at: the sternal angle is defined by the manubriosternal junction
   * and the course material puts that at 'vertebral level of T4/T5', so
   * work/cut-level-check.mjs measures the junction and asserts it lands in the
   * span these two bound. The claim is then this model's own geometry agreeing
   * with the lecture, rather than a number copied across from it.
   */
  'spine.T4': { label: 'T4', layer: 'skeleton', match: ['^vertebra t4'] },
  'spine.T5': { label: 'T5', layer: 'skeleton', match: ['^vertebra t5'] },
  'spine.L1': { label: 'L1', layer: 'skeleton', match: ['^vertebra l1'] },
  'spine.L3': { label: 'L3', layer: 'skeleton', match: ['^vertebra l3'] },
  'spine.L4': { label: 'L4', layer: 'skeleton', match: ['^vertebra l4'] },
  'spine.L5': { label: 'L5', layer: 'skeleton', match: ['^vertebra l5'] },

  /* ---------------- pelvis ---------------- */
  'pelvis.hipBone': { label: 'Hip bones', layer: 'skeleton', match: ['^hip bone'] },
  'pelvis.ring': {
    label: 'Pelvic ring',
    layer: 'skeleton',
    /* ilium/ischium/pubis are not separate meshes in this atlas -- the hip bone
       is one piece, so the true pelvis has to come out of its inner surface */
    match: ['^hip bone', '^sacrum$', '^coccyx$'],
  },
  'pelvis.femur': { label: 'Femur', layer: 'skeleton', match: ['^femur'] },

  /* ---------------- muscle layer (lazy) ---------------- */
  diaphragm: { label: 'Diaphragm', layer: 'muscle', match: ['^diaphragm$'] },
  'wall.abdominal': {
    label: 'Abdominal wall',
    layer: 'muscle',
    match: ['^rectus abdominis', '^external abdominal oblique', '^internal abdominal oblique',
      '^transversus abdominis'],
    reject: ['fascia', 'sheath', 'aponeurosis'],
  },
  'wall.thoracic': {
    label: 'Thoracic wall muscles',
    layer: 'muscle',
    match: ['intercostal muscle', '^transversus thoracis'],
    reject: ['fascia', 'membrane'],
  },
  'pelvis.floor': {
    label: 'Pelvic floor',
    layer: 'muscle',
    match: ['levator ani', '^coccygeus', '^obturator internus'],
    reject: ['fascia', 'tendinous arch'],
  },

  /* ---------------- organ layer (lazy) ---------------- */
  'lung.left': {
    label: 'Left lung',
    layer: 'organs',
    match: ['lobe of left lung'],
    reject: ['bronchus', 'segment'],
  },
  'lung.right': {
    label: 'Right lung',
    layer: 'organs',
    match: ['lobe of right lung'],
    reject: ['bronchus', 'segment'],
  },
  liver: { label: 'Liver', layer: 'organs', match: ['^liver$', 'segment of liver'] },
  stomach: { label: 'Stomach', layer: 'organs', match: ['^stomach$'] },
  kidneys: { label: 'Kidneys', layer: 'organs', match: ['^kidney'] },
  trachea: { label: 'Trachea', layer: 'organs', match: ['^trachea$', 'main bronchus'] },
  oesophagus: { label: 'Oesophagus', layer: 'organs', match: ['^oesophagus$', '^esophagus$'] },
  bladder: { label: 'Urinary bladder', layer: 'organs', match: ['^urinary bladder$'] },
  'organs.pelvic': {
    label: 'Pelvic organs',
    layer: 'organs',
    match: ['^urinary bladder$', '^prostate$', '^rectum$', '^sigmoid colon$', '^uterus$', '^vagina$'],
  },
  'organs.abdominal': {
    label: 'Abdominal organs',
    layer: 'organs',
    match: ['^liver$', '^stomach$', '^kidney', '^pancreas$', '^duodenum$', '^jejunum$',
      '^ileum$', '^ascending colon$', '^transverse colon$', '^descending colon$',
      '^sigmoid colon$', '^spleen$', 'segment of liver'],
  },

  /* ---------------- circulatory layer (lazy) ---------------- */
  heart: {
    label: 'Heart',
    layer: 'circulatory',
    match: ['^left ventricle$', '^right ventricle$', '^left atrium$', '^right atrium$'],
  },
  'heart.greatVessels': {
    label: 'Great vessels',
    layer: 'circulatory',
    match: ['^ascending aorta$', '^aortic arch$', '^pulmonary trunk$', '^superior vena cava$',
      '^inferior vena cava (thoracic part)$', '^thoracic aorta$'],
  },

  /* ---------------- nervous layer (lazy) ---------------- */
  'cord.spinal': {
    label: 'Spinal cord',
    layer: 'nervous',
    match: ['matter of spinal cord', 'horn of spinal cord'],
  },
  brain: {
    label: 'Brain',
    layer: 'nervous',
    match: ['^midbrain$', '^medulla oblongata$', '^pons$', 'cerebellum$', 'cerebral hemisphere',
      'lobe of brain', '^thalamus'],
  },

  /* ---------------- lymphatic layer (lazy) ---------------- */
  spleen: { label: 'Spleen', layer: 'lymphatic', match: ['^spleen$'] },
};

/*
 * What each cavity is allowed to reason from, best first. This is the
 * "hierarchy of available anatomical references" -- a builder walks its chain
 * and uses the strongest tier that actually resolved. Nothing in here is
 * required: the skeleton tier is always present, so every cavity has at least
 * one real reference even with no optional layer loaded.
 */
export const REFERENCE_CHAINS = {
  'cav-cranial': {
    primary: ['skull.vault'],
    secondary: ['brain'],
  },
  'cav-vertebral': {
    primary: ['spine.cervical', 'spine.thoracic', 'spine.lumbar', 'spine.sacrum'],
    secondary: ['cord.spinal'],
  },
  'cav-thoracic': {
    primary: ['thorax.ribs', 'thorax.sternum', 'spine.thoracic', 'thorax.costalCartilage'],
    secondary: ['diaphragm', 'lung.left', 'lung.right', 'heart'],
  },
  'cav-pleural': {
    primary: ['thorax.ribs', 'thorax.sternum', 'spine.thoracic'],
    secondary: ['lung.left', 'lung.right', 'diaphragm'],
  },
  'cav-mediastinum': {
    primary: ['thorax.sternum', 'spine.thoracic', 'thorax.ribs'],
    secondary: ['lung.left', 'lung.right', 'heart', 'heart.greatVessels', 'trachea', 'oesophagus'],
  },
  /*
   * The only cavity whose primary reference is not bone. With the circulatory
   * layer unloaded there is genuinely no heart to wrap, so the fallback tier is
   * the bony mediastinum and the sac is placed at the cardiac position derived
   * from it -- and the overlay says it is approximate. See NO FAKE PRECISION.
   */
  'cav-pericardial': {
    primary: ['heart'],
    secondary: ['heart.greatVessels'],
    fallback: ['thorax.sternum', 'spine.thoracic', 'thorax.ribsLower'],
  },
  'cav-abdominal': {
    primary: ['thorax.ribsLower', 'spine.lumbar', 'pelvis.hipBone', 'thorax.costalCartilage'],
    secondary: ['diaphragm', 'wall.abdominal', 'organs.abdominal'],
  },
  'cav-pelvic': {
    primary: ['pelvis.ring'],
    secondary: ['organs.pelvic', 'pelvis.floor'],
  },
  'cav-abdominopelvic': {
    primary: ['thorax.ribsLower', 'spine.lumbar', 'pelvis.ring', 'thorax.costalCartilage'],
    secondary: ['diaphragm', 'wall.abdominal', 'organs.abdominal', 'organs.pelvic'],
  },
  /*
   * The surface grids. The primary tier is the landmarks the reference lines
   * are MEASURED from -- clavicles for the midclavicular lines, the tenth
   * costal cartilage for the subcostal plane, the hip bones for the iliac
   * tubercles, L3/L4 for the transumbilical plane, the xiphoid and the
   * symphysis for the ends. The secondary tier only changes what the lines are
   * painted on: with the abdominal wall loaded the torso surface is measured,
   * without it the wall is interpolated between the costal margin and the
   * pelvis. Organs are not in either tier and never will be -- the regions are
   * topographic divisions, and the liver must not be able to move a boundary.
   */
  'grid.abdomen': {
    primary: ['thorax.clavicle', 'thorax.cartilageTenth', 'pelvis.hipBone', 'thorax.xiphoid',
      'spine.L3', 'spine.L4', 'spine.lumbar', 'thorax.sternum'],
    secondary: ['wall.abdominal', 'thorax.ribsLower', 'thorax.costalCartilage', 'pelvis.femur'],
  },
};

/* ------------------------------------------------------------------ *
 * Resolution
 * ------------------------------------------------------------------ */

/**
 * entries: [{ name, layer, mesh }]  -- `name` is the RAW runtime mesh name
 *          (still underscored), `layer` one of the seven layer keys.
 * Returns a resolver bound to that mesh set.
 */
export function createResolver(entries) {
  const list = entries.map((e) => {
    const norm = normName(e.name);
    return { ...e, norm };
  });
  const allNorms = new Set(list.map((e) => e.norm));
  for (const e of list) {
    const { base, side } = baseName(e.norm, allNorms);
    e.base = base;
    /* an explicit side from the loader wins; the name is only a fallback */
    e.side = e.side || side;
  }

  const cache = new Map();
  const layersPresent = new Set(list.map((e) => e.layer));

  function resolve(key) {
    if (cache.has(key)) return cache.get(key);
    const spec = LANDMARKS[key];
    let hits = [];
    if (spec) {
      hits = list.filter((e) => {
        if (spec.layer && e.layer !== spec.layer) return false;
        if (spec.reject && spec.reject.some((p) => patternMatches(p, e.base))) return false;
        return spec.match.some((p) => patternMatches(p, e.base));
      });
    }
    const out = {
      key,
      label: spec ? spec.label : key,
      layer: spec ? spec.layer : null,
      available: hits.length > 0,
      entries: hits,
      meshes: hits.map((h) => h.mesh),
    };
    cache.set(key, out);
    return out;
  }

  return {
    resolve,
    /** several keys at once, flattened; missing ones contribute nothing */
    resolveAll(keys) {
      const seen = new Set();
      const out = [];
      for (const k of keys || []) {
        for (const e of resolve(k).entries) {
          if (seen.has(e.mesh)) continue;
          seen.add(e.mesh);
          out.push(e);
        }
      }
      return out;
    },
    /** did this landmark resolve to anything? */
    has: (key) => resolve(key).available,
    /**
     * Which of a chain's tiers are usable right now. `usable` is what a builder
     * should actually reason from: the primary tier if any of it resolved,
     * otherwise the declared fallback. `exact` says whether the geometry can be
     * derived from the structure the cavity is really defined by, or is a
     * reasoned approximation -- the UI surfaces that difference rather than
     * pretending every cavity is equally well grounded.
     */
    tier(cavityId) {
      const chain = REFERENCE_CHAINS[cavityId] || {};
      const ok = (k) => resolve(k).available;
      const primary = (chain.primary || []).filter(ok);
      const secondary = (chain.secondary || []).filter(ok);
      const fallback = (chain.fallback || []).filter(ok);
      return {
        primary,
        secondary,
        fallback,
        usable: primary.length ? primary : fallback,
        exact: primary.length > 0,
        missing: [...(chain.primary || []), ...(chain.secondary || []), ...(chain.fallback || [])]
          .filter((k) => !ok(k)),
      };
    },
    layersPresent,
    size: list.length,
  };
}

/** Every landmark key, for diagnostics. */
export const LANDMARK_KEYS = Object.keys(LANDMARKS);
