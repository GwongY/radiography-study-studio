/*
 * physiology.js — what each mesh IS, so the viewer can show what it DOES.
 *
 * The seven atlas layers arrive as one flat colour. That is anatomy with the
 * physiology stripped out: 403 arteries and 231 veins rendered identically,
 * when the single most useful thing a first-year can be told is which is which
 * and which way the blood is going.
 *
 * So every mesh is classified from its own name — the names are clean and
 * complete, 'Superior_lobar_artery_of_right_lung', 'Left_subclavian_vein' —
 * and the class carries a colour and a flow rule the viewer animates.
 *
 * THE PULMONARY EXCEPTION IS THE POINT. "Arteries red, veins blue" is a
 * convention about oxygenation, not about vessel type, and the pulmonary
 * circulation is where it reverses: the pulmonary artery carries the
 * deoxygenated blood out to the lung and the pulmonary veins bring the
 * oxygenated blood back. Colouring strictly by artery/vein would teach the
 * wrong thing on the exact vessels students get wrong, so pulmonary vessels
 * are classified separately and coloured by what they actually carry.
 *
 * PROVENANCE. The mesh names are the atlas's own (BodyParts3D / Z-Anatomy).
 * The classification rules, colours and flow rules below are written by this
 * app: they are a display convention, not a claim traced to a source file, and
 * the viewer's legend says so. Nothing here changes what a structure is called
 * or which record it maps to.
 */

/*
 * Flow anchors, as a fraction of body height measured from the feet.
 *
 * Taken off the loaded model rather than guessed: the heart centroid sits at
 * 0.755 of the way up the skeleton's bounding box and the venous angle, where
 * the thoracic duct empties into the left subclavian vein, at 0.824. Fractions
 * rather than absolute units so they survive any rescaling of the body frame.
 */
export const FLOW_ANCHORS = { heart: 0.755, venousAngle: 0.824, cord: 0.70 };

/*
 * A class is [base colour, flow colour, rule].
 *
 * rule.from   which anchor the wave is measured from
 * rule.dir    +1 travels away from the anchor, -1 travels towards it
 * rule.wrap   'mirror' waves run both ways off the anchor (aorta up AND down),
 *             'up' only above it, 'down' only below it
 * rule.speed  body-heights per second
 * rule.freq   waves per body height
 * rule.sharp  crest sharpness; higher is a tighter travelling band
 * rule.gain   how bright the crest gets
 * rule.beat   'cardiac' gates the wave to the heartbeat, 'spike' to a nerve
 *             volley, 'contract' to the muscle contraction envelope, null runs
 *             steady
 */
export const FLOW_CLASSES = {
  arterial: {
    label: 'Systemic artery', short: 'Artery',
    color: 0xc4372f, flow: 0xff8a72,
    says: 'Oxygenated blood leaving the heart. The crest is the pulse wave — it travels away from the heart at every beat, and the wall swells as the pulse passes.',
    rule: { from: 'heart', wrap: 'mirror', dir: 1, speed: 0.95, freq: 1.7, sharp: 5, gain: 1.5, beat: 'cardiac', mode: 'inflate', deform: 'cardiac', inflate: 0.06 },
  },
  venous: {
    label: 'Systemic vein', short: 'Vein',
    color: 0x2f5aa8, flow: 0x7fb0ff,
    says: 'Deoxygenated blood returning to the heart. Steady, low pressure, and running the other way.',
    rule: { from: 'heart', wrap: 'mirror', dir: -1, speed: 0.42, freq: 1.3, sharp: 3, gain: 0.9, beat: null },
  },
  pulmArtery: {
    label: 'Pulmonary artery', short: 'Pulm. artery',
    color: 0x5a4bbf, flow: 0x9d8cff,
    says: 'The exception: an artery carrying DEOXYGENATED blood. Right ventricle to lung — and it swells with that ventricle\'s pulse.',
    rule: { from: 'heart', wrap: 'mirror', dir: 1, speed: 0.9, freq: 2.6, sharp: 5, gain: 1.5, beat: 'cardiac', mode: 'inflate', deform: 'cardiac', inflate: 0.06 },
  },
  pulmVein: {
    label: 'Pulmonary vein', short: 'Pulm. vein',
    color: 0xd0453d, flow: 0xffa88f,
    says: 'The other half of the exception: a vein carrying OXYGENATED blood. Lung back to left atrium.',
    rule: { from: 'heart', wrap: 'mirror', dir: -1, speed: 0.55, freq: 2.6, sharp: 4, gain: 1.1, beat: null },
  },
  heart: {
    label: 'Heart', short: 'Heart',
    color: 0x9e2f2f, flow: 0xff7a63,
    says: 'Valves, septa and conducting tissue. They do not contract themselves — they open, close and fire as the chambers around them pump.',
    rule: { from: 'heart', wrap: 'mirror', dir: 1, speed: 0, freq: 0, sharp: 1, gain: 1.35, beat: 'cardiac' },
  },
  heartAtrium: {
    label: 'Atrium', short: 'Atrium',
    color: 0x9e2f2f, flow: 0xff7a63,
    says: 'The primer. Both atria contract first, topping the ventricles up just before they fire.',
    rule: { from: 'heart', wrap: 'mirror', dir: 1, speed: 0, freq: 0, sharp: 1, gain: 1.15, beat: 'cardiac', mode: 'contract', deform: 'atrial', contract: 0.09 },
  },
  heartVentricle: {
    label: 'Ventricle', short: 'Ventricle',
    color: 0x9e2f2f, flow: 0xff7a63,
    says: 'The main pump. Both ventricles contract together in systole — right to the lungs, left to the body. The papillary muscles shorten with them.',
    rule: { from: 'heart', wrap: 'mirror', dir: 1, speed: 0, freq: 0, sharp: 1, gain: 1.35, beat: 'cardiac', mode: 'contract', deform: 'ventricular', contract: 0.14 },
  },
  nerve: {
    label: 'Peripheral nerve', short: 'Nerve',
    color: 0xd8c65e, flow: 0xfffbc9,
    says: 'Impulses travel outward from the cord in fast volleys — far faster than blood moves.',
    rule: { from: 'cord', wrap: 'mirror', dir: 1, speed: 3.4, freq: 3.2, sharp: 9, gain: 1.9, beat: 'spike' },
  },
  cns: {
    label: 'Brain and spinal cord', short: 'CNS',
    color: 0xbfc6a8, flow: 0xf2f6d8,
    says: 'Where the volleys start. It flickers with each one rather than carrying a travelling crest.',
    rule: { from: 'cord', wrap: 'mirror', dir: 1, speed: 0, freq: 0, sharp: 1, gain: 0.75, beat: 'spike' },
  },
  /*
   * A note on what is actually in the file.
   *
   * The lymphatic atlas is 160 NODES, a thymus and a spleen. There are no
   * ducts, no trunks and no cisterna chyli in it — checked, not assumed. So
   * lymph return cannot be drawn as a vessel filling; it is drawn as the chain
   * of nodes lighting in the order lymph passes through them, converging on the
   * venous angle from below AND from above, which is where it really goes. The
   * cervical nodes drain downward into the same point the abdominal ones drain
   * up to, so the wave runs toward the anchor from both directions rather than
   * only from below.
   */
  lymphVessel: {
    label: 'Lymphatic vessel', short: 'Lymph vessel',
    color: 0x63b98d, flow: 0xc4f5da,
    says: 'One way only. Everything converges on the venous angle behind the clavicle, where lymph rejoins the blood.',
    rule: { from: 'venousAngle', wrap: 'mirror', dir: -1, speed: 0.34, freq: 1.2, sharp: 3, gain: 1.1, beat: null },
  },
  lymphNode: {
    label: 'Lymph node', short: 'Node',
    color: 0x4e9f78, flow: 0xa8e8c6,
    says: 'A filter on the way back. Watch the chain light in sequence: that is the direction lymph drains, toward the venous angle.',
    rule: { from: 'venousAngle', wrap: 'mirror', dir: -1, speed: 0.34, freq: 1.15, sharp: 3.5, gain: 1.25, beat: null },
  },
  lymphOrgan: {
    label: 'Lymphoid organ', short: 'Lymphoid organ',
    color: 0x7d9c86, flow: 0xcfe8d8,
    says: 'Thymus and spleen — where lymphocytes are trained, and where blood itself gets filtered.',
    rule: { from: 'venousAngle', wrap: 'mirror', dir: -1, speed: 0, freq: 0, sharp: 1, gain: 0.45, beat: null },
  },
  muscle: {
    label: 'Skeletal muscle', short: 'Muscle',
    color: 0xa8443c, flow: 0xff9b7a,
    says: 'Contracting: it shortens along its own long axis and thickens across it, then relaxes.',
    /* gain 0: the contraction is shown purely as deformation, so the muscle
       does not glow and dim with each beat. */
    rule: { from: 'heart', wrap: 'mirror', dir: 1, speed: 0, freq: 0, sharp: 1, gain: 0, beat: 'contract', mode: 'contract', deform: 'contract' },
  },
  bursa: {
    label: 'Bursa or sheath', short: 'Bursa',
    color: 0xc8cfd6, flow: 0xffffff,
    says: 'A fluid cushion where a tendon slides over bone. It does not contract — it stops the rubbing.',
    rule: null,
  },
  tendon: {
    label: 'Tendon or ligament', short: 'Tendon',
    color: 0xdcd7c4, flow: 0xffffff,
    says: 'It does not contract. It transmits what the muscle does to the bone.',
    rule: null,
  },
  ligament: {
    label: 'Ligament', short: 'Ligament',
    color: 0xd6cfb8, flow: 0xffffff,
    says: 'Bone to bone. It limits a movement rather than producing one.',
    rule: null,
  },
  cartilage: {
    label: 'Cartilage', short: 'Cartilage',
    color: 0xb9d8d2, flow: 0xffffff,
    says: 'The low-friction surface. Avascular, which is why it heals so badly.',
    rule: null,
  },
  airway: {
    label: 'Airway or lung', short: 'Lung',
    color: 0x86b4c9, flow: 0xd6f0ff,
    says: 'Where the gas exchange the whole circulation exists to serve actually happens. Watch it swell with each breath in and settle as you breathe out.',
    rule: { from: 'heart', wrap: 'mirror', dir: 1, speed: 0, freq: 0, sharp: 1, gain: 0.3, beat: 'breath', mode: 'inflate', deform: 'breath', inflate: 0.05 },
  },
  gut: {
    label: 'Digestive organ', short: 'Gut',
    color: 0xc08a56, flow: 0xffd2a1,
    says: 'A ring of contraction travels down the tube, squeezing its contents onward — peristalsis, shown as the constriction you can watch move.',
    rule: { from: 'heart', wrap: 'mirror', dir: 1, speed: 0.45, freq: 1.2, sharp: 4, gain: 0, beat: null, mode: 'peristalsis', deform: 'steady', pinch: 0.18, match: /stomach|intestine|colon|caec|cecum|duoden|jejun|ile|rect|oesophag|esophag|appendix/i },
  },
  urinary: {
    label: 'Urinary organ', short: 'Urinary',
    color: 0xa07bb8, flow: 0xe4c8f5,
    says: 'The ureters squeeze urine onward in slow ripples. The kidneys filter steadily — no rhythm to show, so they sit still.',
    rule: { from: 'heart', wrap: 'mirror', dir: 1, speed: 0.3, freq: 2.0, sharp: 3, gain: 0, beat: null, mode: 'peristalsis', deform: 'steady', pinch: 0.15, match: /ureter/i },
  },
  gland: { label: 'Gland', short: 'Gland', color: 0xcf9a4e, flow: 0xffe0a8, rule: null },
  organ: { label: 'Organ', short: 'Organ', color: 0xb08268, flow: 0xffd8bd, rule: null },
  bone: { label: 'Bone', short: 'Bone', color: 0xd9d1bc, flow: 0xffffff, rule: null },
};

/* Which classes a given layer can produce, for the legend. */
export const LAYER_CLASSES = {
  circulatory: ['arterial', 'venous', 'pulmArtery', 'pulmVein', 'heart', 'heartAtrium', 'heartVentricle'],
  nervous: ['cns', 'nerve'],
  lymphatic: ['lymphVessel', 'lymphNode', 'lymphOrgan'],
  muscle: ['muscle', 'tendon', 'bursa'],
  joint: ['ligament', 'cartilage'],
  organs: ['airway', 'gut', 'urinary', 'gland', 'organ'],
  skeleton: ['bone'],
};

const has = (s, re) => re.test(s);

/*
 * Classification.
 *
 * Order matters and is the whole argument. The pulmonary/vein tests come
 * first: 'Inferior_vein_of_left_ventricle' is a cardiac VEIN, not a chamber,
 * and it does carry deoxygenated blood, so 'ventricle' must not catch it.
 * Once veins are out of the way, the chambers are matched before the plain
 * 'arterial' fallback, because 'Left_ventricle' would otherwise pass the
 * artery test ('ventricle' contains 'arter'). The chambers split into two
 * animated classes -- contracting atria and contracting ventricles -- while
 * the valves, leaflets and conducting tissue stay in the static 'heart' class
 * (they open, close and fire; they do not pump). Pulmonary arteries are
 * matched after the chamber tests so that 'Pulmonary_trunk' still reads as an
 * artery-like vessel. A name is pulmonary by function ('Superior_lobar_artery
 * _of_right_lung'), and function is what the colour is claiming.
 */
export function classify(layerKey, rawName) {
  const n = String(rawName || '').replace(/_/g, ' ').toLowerCase();

  if (layerKey === 'circulatory') {
    const pulmonary = has(n, /pulmonary|of (right|left) lung|lingular|lobar/);
    const vein = has(n, /vein|venous|vena|sinus/);
    const artery = has(n, /arter|aort|trunk|arch|branch|anastomosis|circle of willis/);
    if (pulmonary && vein) return 'pulmVein';
    if (vein) return 'venous';
    if (has(n, /ventricle/)) return 'heartVentricle';
    if (has(n, /atrium/)) return 'heartAtrium';
    if (has(n, /leaflet|valve|papillary|chordae|septum|myocard|pericard|node of|bundle/)) return 'heart';
    if (pulmonary && artery) return 'pulmArtery';
    return 'arterial';
  }

  if (layerKey === 'nervous') {
    if (has(n, /spinal cord|brain|cerebr|cerebell|medulla|pons|thalam|hypothalam|cortex|gyrus|ventricle of|central canal|corpus callosum|midbrain|dura|arachnoid|pia/)) return 'cns';
    return 'nerve';
  }

  if (layerKey === 'lymphatic') {
    if (has(n, /node|nodule|tonsil|patch/)) return 'lymphNode';
    if (has(n, /thymus|spleen|marrow/)) return 'lymphOrgan';
    return 'lymphVessel';
  }

  if (layerKey === 'muscle') {
    /* A bursa is named after the muscle it cushions -- 'Subtendinous bursa of
       sartorius muscle' -- so it matches 'muscle' and would be animated as one
       if it were not caught first. Bursae do not contract; they are the reason
       the muscle can slide over the bone. */
    if (has(n, /bursa|capsule|synovial|membrane/)) return 'bursa';
    if (has(n, /ligament|tendon|aponeuros|retinacul|fascia|raphe|linea|sheath|septum|arcade|arch of|band/)) return 'tendon';
    return 'muscle';
  }

  if (layerKey === 'joint') {
    if (has(n, /cartilage|meniscus|labrum|disc|disk/)) return 'cartilage';
    return 'ligament';
  }

  if (layerKey === 'organs') {
    if (has(n, /lung|bronch|trachea|larynx|pleura|alveol/)) return 'airway';
    /* Gland must be tested before urinary: 'Suprarenal_gland' contains 'renal'
       and would otherwise be caught as a urinary organ. */
    if (has(n, /thyroid|adrenal|suprarenal|pituitar|pancrea|parathyroid|gland/)) return 'gland';
    /* Word-boundary bladder, so 'Gallbladder' (a gut organ) is not caught here. */
    if (has(n, /kidney|ureter|\bbladder\b|urethra|renal/)) return 'urinary';
    if (has(n, /stomach|intestine|colon|caecum|cecum|duoden|jejun|ile|rect|oesophag|esophag|liver|gall|append/)) return 'gut';
    return 'organ';
  }

  return 'bone';
}

/*
 * The rhythms, as plain functions of seconds. One place to read them, and the
 * viewer feeds them straight into the shared shader uniforms.
 *
 * Rates are the resting adult figures the course teaches: 72 beats a minute,
 * about 14 breaths a minute. They are display timings, not measurements.
 */
export const RATES = { heartBpm: 72, breathsPerMin: 14, nerveVolleyHz: 2.2, contractionsPerMin: 30 };

/* A crude but readable cardiac envelope: a sharp systolic rise, a slower fall,
   then the quiet of diastole taking up most of the cycle. */
export function cardiacEnvelope(t) {
  const p = (t * RATES.heartBpm / 60) % 1;
  if (p < 0.12) return Math.sin((p / 0.12) * Math.PI * 0.5);          /* systolic upstroke */
  if (p < 0.42) return Math.cos(((p - 0.12) / 0.30) * Math.PI * 0.5); /* ejection and fall */
  return 0.06;                                                        /* diastole */
}

export function breathEnvelope(t) {
  const p = (t * RATES.breathsPerMin / 60) % 1;
  return p < 0.4 ? Math.sin((p / 0.4) * Math.PI * 0.5) : Math.cos(((p - 0.4) / 0.6) * Math.PI * 0.5) * 0.9;
}

/* Nerve traffic is not a smooth wave. It is quiet, then a volley. */
export function spikeEnvelope(t) {
  const p = (t * RATES.nerveVolleyHz) % 1;
  return p < 0.16 ? Math.pow(Math.sin((p / 0.16) * Math.PI), 1.4) : 0.04;
}

/* Contract, hold briefly, release slower than you contracted. */
export function contractEnvelope(t) {
  const p = (t * RATES.contractionsPerMin / 60) % 1;
  if (p < 0.22) return Math.pow(p / 0.22, 0.8);
  if (p < 0.42) return 1;
  if (p < 0.72) return 1 - Math.pow((p - 0.42) / 0.30, 1.3);
  return 0;
}

/* The pump has two phases, and the chambers must move at the right moment:
   the atria fire at the end of diastole to top the ventricles up, then the
   ventricles do the real squeeze through systole. 'p' is the fraction of one
   cardiac cycle; it wraps at the ventricular upstroke. */
export function ventricleEnvelope(t) {
  const p = (t * RATES.heartBpm / 60) % 1;
  if (p < 0.12) return Math.sin((p / 0.12) * Math.PI * 0.5);          /* rapid systolic squeeze */
  if (p < 0.45) return Math.cos(((p - 0.12) / 0.33) * Math.PI * 0.5); /* relax through ejection */
  return 0;                                                           /* diastole, refilling */
}

export function atriumEnvelope(t) {
  const p = (t * RATES.heartBpm / 60) % 1;
  if (p < 0.78) return 0;                              /* quiet through most of diastole */
  const q = (p - 0.78) / 0.20;                         /* 0..1 across the last fifth */
  if (q < 0.45) return Math.sin((q / 0.45) * Math.PI * 0.5);   /* contract */
  /* Clamp the fall at zero: past the end of the window cos would go negative,
     which would stretch the chamber instead of just letting it go. */
  return Math.max(0, Math.cos(((q - 0.45) / 0.55) * Math.PI * 0.5)); /* let go before the ventricles fire */
}

export const CLASS_COUNT = Object.keys(FLOW_CLASSES).length;
