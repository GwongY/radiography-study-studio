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
 * Circuits — how a travelling light is displayed along a curated ROUTE.
 *
 * A route (outputs/physiology-paths.js) says where along a structure a vertex
 * is, and which end the source calls upstream. It says nothing about how fast
 * to draw the crest, how wide it is, or how sharp: everything below is a
 * display choice written by this app, and the viewer says so.
 *
 * The two modes are the distinction the anatomy actually makes.
 *
 *   pulse   ONE crest crosses the whole circuit each heartbeat. This is the
 *           pressure wave, not a packet of blood: the source says an artery
 *           expands during systole and recoils during diastole, and what
 *           travels is that expansion. A real pulse wave crosses the aorta in
 *           a small fraction of a beat, so drawing it as a crest that takes a
 *           whole beat is a deliberate slowing for visibility.
 *   drift   crests of a fixed world wavelength travelling at a fixed world
 *           speed. Blood in a vein really is moving, and slowly; the rate here
 *           is chosen to read, not measured.
 *   motor   no crest of its own. The route parameter supplies the ARRIVAL time
 *           along the nerve for the motor sequence in physiology-mechanics.js,
 *           which is already slowed for visibility.
 *
 * `lead` is where in the cardiac cycle the crest leaves the heart, matched to
 * the ejection phase of cardiacEnvelope. `wavelength` and `speed` are in the
 * model's world units, in which the body stands about 1.7 tall.
 */
const MOTOR_CIRCUIT = { label: 'Motor nerve', mode: 'motor', arrivalStart: .10, arrivalSpan: .45 };
export const FLOW_CIRCUITS = {
  'systemic-arterial': { label: 'Systemic arteries', mode: 'pulse', sharp: 5, lead: .34 },
  'pulmonary-arterial': { label: 'Pulmonary arteries', mode: 'pulse', sharp: 5, lead: .34 },
  'systemic-venous': { label: 'Systemic veins', mode: 'drift', sharp: 3, wavelength: .16, speed: .10 },
  'pulmonary-venous': { label: 'Pulmonary veins', mode: 'drift', sharp: 3, wavelength: .16, speed: .12 },
  'motor-axillary-left': MOTOR_CIRCUIT,
  'motor-axillary-right': MOTOR_CIRCUIT,
  'motor-musculocutaneous-left': MOTOR_CIRCUIT,
  'motor-musculocutaneous-right': MOTOR_CIRCUIT,
  'motor-femoral-left': MOTOR_CIRCUIT,
  'motor-femoral-right': MOTOR_CIRCUIT,
};

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
 *
 * For the two peristalsis classes there are three more, used only where a
 * curated tube ROUTE exists for the mesh (see outputs/physiology-paths.js):
 *
 * rule.pathSpeed       how fast the ring of constriction travels, in world
 *                      units per second along the tube's own centreline
 * rule.pathWavelength  world units between one ring and the next
 * rule.pathTaper       the fraction of the route at each end over which the
 *                      constriction fades in, so a segment does not shear
 *                      against the segment it runs into
 *
 * All three are DISPLAY parameters written by this app. The sources cited for
 * these routes give the direction and, for the gut, the mechanism — a ring of
 * circular-muscle contraction passing along the tube. None of them says how
 * fast, how deep, or how far apart to draw it.
 */
export const FLOW_CLASSES = {
  arterial: {
    label: 'Systemic artery', short: 'Artery',
    color: 0xc4372f, flow: 0xff8a72,
    says: 'Oxygenated blood leaving the heart. The crest is the PRESSURE wave, not a packet of blood: the artery wall expands as it passes and recoils behind it. On the aorta, the carotid, subclavian, vertebral, iliac and femoral arteries the crest follows the measured length of each vessel and carries on across the join into the next one, so one wave crosses the whole chain each beat. It is slowed a long way down to be watchable.',
    rule: { from: 'heart', wrap: 'mirror', dir: 1, speed: 0.95, freq: 1.7, sharp: 5, gain: 1.5, beat: 'cardiac', mode: 'inflate', deform: 'cardiac', inflate: 0.06 },
  },
  venous: {
    label: 'Systemic vein', short: 'Vein',
    color: 0x2f5aa8, flow: 0x7fb0ff,
    says: 'Deoxygenated blood returning to the heart. Here the blood itself is what moves: steady, low pressure, one way only, from the femoral and jugular veins along the measured length of each vessel and on into the venae cavae. The speed is this app illustration, not a measurement.',
    rule: { from: 'heart', wrap: 'mirror', dir: -1, speed: 0.42, freq: 1.3, sharp: 3, gain: 0.9, beat: null },
  },
  pulmArtery: {
    label: 'Pulmonary artery', short: 'Pulm. artery',
    color: 0x5a4bbf, flow: 0x9d8cff,
    says: 'The exception: an artery carrying DEOXYGENATED blood. Right ventricle to lung, and the same pressure wave, leaving the trunk each beat and passing into both pulmonary arteries together.',
    rule: { from: 'heart', wrap: 'mirror', dir: 1, speed: 0.9, freq: 2.6, sharp: 5, gain: 1.5, beat: 'cardiac', mode: 'inflate', deform: 'cardiac', inflate: 0.06 },
  },
  pulmVein: {
    label: 'Pulmonary vein', short: 'Pulm. vein',
    color: 0xd0453d, flow: 0xffa88f,
    says: 'The other half of the exception: a vein carrying OXYGENATED blood. Lung back to left atrium. No measured route: three of the four pulmonary vein meshes in this atlas are in several disconnected pieces, so these keep the illustrative cue.',
    rule: { from: 'heart', wrap: 'mirror', dir: -1, speed: 0.55, freq: 2.6, sharp: 4, gain: 1.1, beat: null },
  },
  heart: {
    label: 'Heart', short: 'Heart',
    color: 0x9e2f2f, flow: 0xff7a63,
    says: 'A subtle pulse marks the cardiac cycle around the supporting heart structures. This is an activity cue; valve opening and internal conducting pathways are not resolved by these surface meshes.',
    rule: { from: 'heart', wrap: 'mirror', dir: 1, speed: 0, freq: 0, sharp: 1, gain: 0.45, beat: 'cardiac' },
  },
  heartAtrium: {
    label: 'Atrium', short: 'Atrium',
    color: 0x9e2f2f, flow: 0xff7a63,
    says: 'The primer. Both atria contract first, topping the ventricles up just before they fire.',
    rule: { from: 'heart', wrap: 'mirror', dir: 1, speed: 0, freq: 0, sharp: 1, gain: 1.15, beat: 'cardiac', mode: 'pump', deform: 'atrial', contract: 0.09 },
  },
  heartVentricle: {
    label: 'Ventricle', short: 'Ventricle',
    color: 0x9e2f2f, flow: 0xff7a63,
    says: 'The main pump. Both ventricles contract together in systole — right to the lungs, left to the body. The papillary muscles shorten with them.',
    rule: { from: 'heart', wrap: 'mirror', dir: 1, speed: 0, freq: 0, sharp: 1, gain: 1.35, beat: 'cardiac', mode: 'pump', deform: 'ventricular', contract: 0.14 },
  },
  /*
   * The valve leaflets do not move — no valve rig — but the sources teach
   * their STATE across the cycle as a table: relaxed ventricles = AV valves
   * open and semilunar closed; contracting ventricles = AV closed and
   * semilunar open (phys.2 pp36–38). Lighting each group when it is open
   * teaches that table with nothing moving, and the wording says so.
   */
  heartAVValve: {
    label: 'AV valve leaflet', short: 'AV leaflet',
    color: 0x9e2f2f, flow: 0xff7a63,
    says: 'Lit while open. The atrioventricular valves stand open while the ventricles relax and fill, and are held shut while they contract — the leaflet mesh itself does not bend.',
    rule: { from: 'heart', wrap: 'mirror', dir: 1, speed: 0, freq: 0, sharp: 1, gain: 0.55, beat: 'avValve' },
  },
  heartSemilunarValve: {
    label: 'Semilunar valve leaflet', short: 'Semilunar leaflet',
    color: 0x9e2f2f, flow: 0xff7a63,
    says: 'Lit while open. The pulmonary and aortic valves stay shut while the ventricles fill, then stand open for the ejection — the leaflet mesh itself does not bend.',
    rule: { from: 'heart', wrap: 'mirror', dir: 1, speed: 0, freq: 0, sharp: 1, gain: 0.55, beat: 'semilunar' },
  },
  nerve: {
    label: 'Peripheral nerve', short: 'Nerve',
    color: 0xd8c65e, flow: 0xfffbc9,
    says: 'Travelling light marks illustrative nerve activity. The axillary and musculocutaneous examples follow the measured length of the nerve itself, outwards from the central nervous system and on into its muscular branches, before the target muscle contracts; the timing is slowed for visibility. Every other nerve, including any whose mesh the measurement refused, flashes without claiming a direction: most peripheral nerves are mixed, and nothing here says which way a given fibre is carrying traffic.',
    rule: { from: 'cord', wrap: 'mirror', dir: 1, speed: 3.4, freq: 3.2, sharp: 9, gain: 1.4, beat: null },
  },
  cns: {
    label: 'Brain and spinal cord', short: 'CNS',
    color: 0xbfc6a8, flow: 0xf2f6d8,
    says: 'A subtle light pulse represents neural activity without deforming the brain or spinal cord. It is an illustrative cue; these surfaces do not resolve individual neural circuits.',
    rule: { from: 'cord', wrap: 'mirror', dir: 1, speed: 0, freq: 0, sharp: 1, gain: 0.35, beat: 'spike' },
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
  diaphragm: {label:'Diaphragm',short:'Diaphragm',color:0xa8443c,flow:0xff9b7a,
    says:'The dome descends during inspiration and recoils during expiration.',
    rule:{mode:'descend',deform:'breath',gain:0}},
  muscle: {
    label: 'Skeletal muscle', short: 'Muscle',
    color: 0xa8443c, flow: 0xff9b7a,
    says: 'Muscle bellies shorten and thicken with tethered ends, then relax. Unmapped muscles use staggered demonstration cycles. The mapped deltoid, biceps and quadriceps examples activate after their motor impulse in this fixed-pose display.',
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
    rule: { from: 'heart', wrap: 'mirror', dir: 1, speed: 0, freq: 0, sharp: 1, gain: 0.3, beat: 'breath', mode: 'inflate', deform: 'breath', inflate: 0.05, match: /lung/i },
  },
  gut: {
    label: 'Digestive organ', short: 'Gut',
    color: 0xc08a56, flow: 0xffd2a1,
    says: 'A ring of contraction travels down the tube, squeezing its contents onward — peristalsis, shown as the constriction you can watch move. On the oesophagus, duodenum and transverse and descending colon the ring follows the measured centreline of the tube itself, so it stays a ring around the lumen through every bend.',
    rule: { from: 'heart', wrap: 'mirror', dir: 1, speed: 0.45, freq: 1.2, sharp: 4, gain: 0, beat: null, mode: 'peristalsis', deform: 'steady', pinch: 0.18, pathSpeed: 0.085, pathWavelength: 0.10, pathTaper: 0.14, match: /stomach|intestine|colon|caec|cecum|duoden|jejun|ile|rect|oesophag|esophag|appendix/i },
  },
  urinary: {
    label: 'Urinary organ', short: 'Urinary',
    color: 0xa07bb8, flow: 0xe4c8f5,
    says: 'The ureters squeeze urine onward in slow ripples, along the measured centreline of each ureter from renal pelvis to bladder. The direction is from the source; the ripple itself is an illustration written by this app. The kidneys filter steadily — no rhythm to show, so they sit still.',
    rule: { from: 'heart', wrap: 'mirror', dir: 1, speed: 0.3, freq: 2.0, sharp: 3, gain: 0, beat: null, mode: 'peristalsis', deform: 'steady', pinch: 0.15, pathSpeed: 0.05, pathWavelength: 0.07, pathTaper: 0.16, match: /ureter/i },
  },
  gland: { label: 'Gland', short: 'Gland', color: 0xcf9a4e, flow: 0xffe0a8, rule: null },
  organ: { label: 'Organ', short: 'Organ', color: 0xb08268, flow: 0xffd8bd, rule: null },
  bone: { label: 'Bone', short: 'Bone', color: 0xd9d1bc, flow: 0xffffff, rule: null },
};

/* Which classes a given layer can produce, for the legend. */
export const LAYER_CLASSES = {
  circulatory: ['arterial', 'venous', 'pulmArtery', 'pulmVein', 'heart', 'heartAtrium', 'heartVentricle', 'heartAVValve', 'heartSemilunarValve'],
  nervous: ['cns', 'nerve'],
  lymphatic: ['lymphVessel', 'lymphNode', 'lymphOrgan'],
  muscle: ['diaphragm', 'muscle', 'tendon', 'bursa'],
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
 * animated classes -- contracting atria and contracting ventricles -- the
 * valve leaflets carry their taught open/closed state as a light (they do
 * not move), and everything else static -- conducting tissue and the rest --
 * stays in the plain 'heart' class. Pulmonary arteries are
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
    /* The leaflet groups carry the taught valve states; everything else
       static in the heart keeps the generic activity cue. ('atrioventricular'
       does NOT contain 'ventricle' — atrio-, not atrium- — and the aortic
       leaflets are named only '*_coronary_leaflet'.) */
    if (has(n, /leaflet/)) return has(n, /atrioventricular/) ? 'heartAVValve' : 'heartSemilunarValve';
    if (has(n, /valve|papillary|chordae|septum|myocard|pericard|node of|bundle/)) return 'heart';
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
    if(/^diaphragm$/.test(n))return 'diaphragm';
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

/* Eased phase curves have zero velocity at their joins, so the loop does
   not snap at contraction, relaxation, or the return to the next cycle. */
function ease(p) { const x=Math.max(0,Math.min(1,p));return Math.max(0,Math.min(1,x*x*x*(x*(x*6-15)+10))); }
function phase(t,rate) { return ((t*rate/60)%1+1)%1; }
function pulse(p,start,peak,end) {
  if(p<start||p>=end)return 0;
  return p<peak?ease((p-start)/(peak-start)):1-ease((p-peak)/(end-peak));
}
export function cardiacEnvelope(t) { return .04+.96*pulse(phase(t,RATES.heartBpm),.34,.46,.78); }
export function breathEnvelope(t) {
  const p=phase(t,RATES.breathsPerMin);
  return p<.4?ease(p/.4):1-ease((p-.4)/.6);
}
export function spikeEnvelope(t) { return .04+.96*pulse(phase(t,RATES.nerveVolleyHz*60),0,.07,.20); }
export function contractEnvelope(t) {
  const p=phase(t,RATES.contractionsPerMin);
  if(p<.22)return ease(p/.22);
  if(p<.42)return 1;
  return p<.76?1-ease((p-.42)/.34):0;
}
export function ventricleEnvelope(t) { return pulse(phase(t,RATES.heartBpm),.26,.42,.68); }
export function atriumEnvelope(t) { return pulse(phase(t,RATES.heartBpm),.04,.12,.22); }
/* The taught valve table (phys.2 pp36-38), as light: the AV valves are open
   exactly while the ventricles are relaxed; the semilunar valves open for
   ejection. One envelope each, derived from ventricleEnvelope, so the valve
   cue can never drift out of the chamber timing it is keyed to. */
export function avValveEnvelope(t) { return 1-ventricleEnvelope(t); }
export function semilunarEnvelope(t) { return ventricleEnvelope(t); }

/* One clock at the display rate. Hidden-tab gaps pause the clock instead of
   jumping through a cycle; exponential blending is independent of frame rate. */
export function advancePhysiology(clock,now,on) {
  const gap=now-(clock.lastTime??now);
  const dt=gap>=0&&gap<=.25?gap:0;
  const target=on?1:0;
  let blend=target+((clock.blend??target)-target)*Math.exp(-dt*12);
  if(Math.abs(blend-target)<.001)blend=target;
  return {lastTime:now,blend,elapsed:(clock.elapsed||0)+((on||blend>0)?dt:0)};
}

export const CLASS_COUNT = Object.keys(FLOW_CLASSES).length;
