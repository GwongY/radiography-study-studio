/*
 * radiography.js -- the physics the projection is made of.
 *
 * Pure: no three.js, no DOM, no state. The maths is the part that can be
 * quietly wrong, so it has to be runnable outside a browser, where a wrong
 * number is a number rather than a shape. work/radiography-check.mjs is that
 * run. Same reason cavity-geom.js is pure.
 *
 * NOTHING HERE IS A COURSE CLAIM. These are NIST/ICRU reference constants,
 * surfaced in the pane as app-authored exactly like the AP/PA panel, and no
 * sourceRefs entry is created for them.
 *
 * mu/rho is the NIST X-Ray Mass Attenuation Coefficient table (ICRU-44
 * compositions), in cm^2/g, at the tabulated keV rows.
 *
 * Density is NOT all from one place, and the difference matters. NIST's
 * ICRU-44 lung entry is the parenchyma MATERIAL at 1.05 g/cm^3. An inflated
 * lung in a living chest is 0.26 (ICRU-46), and that is the number a
 * radiograph is made of -- a chest film's lung fields are lucent because the
 * lung is a quarter as dense as the tissue around it, not because it is made
 * of anything different. Taking 1.05 from the same page as the mu/rho column
 * would be the kind of silent error this module exists to prevent, so every
 * density names its own source.
 */

export const KEV_ROWS = [20, 30, 40, 50, 60, 80, 100, 150];

export const TISSUES = {
  bone: {
    label: 'Cortical bone', rho: 1.92, rhoSrc: 'ICRU-44',
    muRho: [4.001, 1.331, 0.6655, 0.4242, 0.3148, 0.2229, 0.1855, 0.1480],
  },
  soft: {
    label: 'Soft tissue', rho: 1.06, rhoSrc: 'ICRU-44',
    muRho: [0.8230, 0.3790, 0.2688, 0.2264, 0.2048, 0.1823, 0.1693, 0.1492],
  },
  marrow: {
    label: 'Adipose (yellow marrow)', rho: 0.95, rhoSrc: 'ICRU-44',
    muRho: [0.5677, 0.3063, 0.2396, 0.2123, 0.1974, 0.1800, 0.1688, 0.1500],
  },
  lung: {
    label: 'Lung, inflated', rho: 0.26, rhoSrc: 'ICRU-46 inflated lung',
    muRho: [0.8316, 0.3815, 0.2699, 0.2270, 0.2053, 0.1826, 0.1695, 0.1493],
  },
};

/* Attenuation tables are interpolated log-log: mu/rho falls as roughly a
   power of energy across the diagnostic range, so a straight line in log-log
   is close and a straight line in linear space is not. */
export function massAtten(tissue, keV) {
  const t = TISSUES[tissue];
  if (!t) throw new Error(`unknown tissue: ${tissue}`);
  const E = Math.min(KEV_ROWS[KEV_ROWS.length - 1], Math.max(KEV_ROWS[0], keV));
  /* Exact-row short-circuit: without it, the last row (E === e1, not e0)
     goes through exp(log(...)) round-tripping and can miss a tabulated value
     by more than floating-point noise should allow. The check demands every
     tabulated row comes back verbatim, so an exact hit returns the table
     value directly rather than trusting interpolation to reproduce it. */
  const exact = KEV_ROWS.indexOf(E);
  if (exact !== -1) return t.muRho[exact];
  let i = 0;
  while (i < KEV_ROWS.length - 2 && KEV_ROWS[i + 1] < E) i += 1;
  const e0 = KEV_ROWS[i], e1 = KEV_ROWS[i + 1];
  const m0 = t.muRho[i], m1 = t.muRho[i + 1];
  const f = (Math.log(E) - Math.log(e0)) / (Math.log(e1) - Math.log(e0));
  return Math.exp(Math.log(m0) + f * (Math.log(m1) - Math.log(m0)));
}

/* Linear attenuation coefficient, cm^-1, at a directly given energy. */
export function muAt(tissue, keV) { return massAtten(tissue, keV) * TISSUES[tissue].rho; }

/*
 * A real tube emits a spectrum, not one energy. Approximating it by a single
 * effective energy is standard for teaching and wrong in detail; the fraction
 * below puts 50-120 kVp onto 20-48 keV, which lands on the tabulated rows.
 * The pane says this is an approximation rather than implying a spectrum.
 */
export const EFF_ENERGY_FRACTION = 0.40;
export function effectiveKeV(kvp) { return EFF_ENERGY_FRACTION * kvp; }

/* Linear attenuation at a tube voltage, cm^-1 -- what the shader wants. */
export function mu(tissue, kvp) { return muAt(tissue, effectiveKeV(kvp)); }

/* Subject contrast: the whole reason kVp is a contrast control. */
export function contrastRatio(kvp) { return mu('bone', kvp) / mu('soft', kvp); }

/*
 * The model is 11.8 units for a 1.7 m body, which is where the 6.94 in
 * live-physiology.js comes from. Multiplying the existing path integral by
 * this makes tau physically real rather than arbitrary.
 */
export const UNITS_PER_M = 6.94;
export const CM_PER_UNIT = 100 / UNITS_PER_M;
export function unitsToCm(u) { return u * CM_PER_UNIT; }

/*
 * Relative photon fluence at the detector. Linear in mAs, inverse square in
 * distance. Relative, not absolute -- no dose is implied and none is shown.
 */
export const REF_MAS = 10, REF_SID_CM = 100;
export function fluence({ mAs, sidCm }) {
  return (mAs / REF_MAS) * (REF_SID_CM / sidCm) ** 2;
}

/*
 * Quantum mottle. Photon arrivals are Poisson, so the noise-to-signal ratio
 * goes as 1/sqrt(N) -- underexposure is grainy for a reason, and the grain in
 * the post shader stops being decoration.
 */
export const REF_SIGMA = 0.05;
export function mottleSigma(beam) { return REF_SIGMA / Math.sqrt(fluence(beam)); }

/*
 * Magnification. SOD = SID - OID, so whatever sits further from the detector
 * is enlarged -- which is the entire real difference between PA and AP, and
 * the thing the existing pane already asks the reader to watch for.
 */
export function magnification({ sidCm, oidCm }) { return sidCm / (sidCm - oidCm); }

/*
 * The display curve.
 *
 * tau is already -ln(transmission), so a LINEAR window on tau is a
 * LOGARITHMIC window on intensity -- which is what a digital detector applies
 * before display, and what the previous linear `1 - exp(-tau)` did not.
 *
 * It matters because the dynamic range is enormous. A 20 cm chest at 75 kVp
 * transmits 3.0% through a lung field and 0.03% through the mediastinum. The
 * old curve mapped 0.97 and 0.9997 -- indistinguishable white. Windowed on
 * tau the same two land a third of the scale apart.
 *
 * THIS FORMULA EXISTS TWICE. GLSL cannot import, so XRAY_POST_FRAG in
 * studio/live-physiology.js inlines the same clamp. The check below tests
 * this copy, so the shader can drift from it silently. Change one, change both.
 */
/*
 * The window is measured against the beam that EXISTS, not the one the
 * paragraph above idealises.
 *
 * That idealised 20 cm chest predicts tau 3.5 through a lung field and 8.0
 * through the mediastinum, and lo 0.5 / hi 9.0 was the right window for it
 * back when the beam saw the skeleton alone. With skeleton, muscle and
 * organs in it the real tau runs a good deal higher, and at 0.5-9.0 a
 * thorax saturated to solid white -- every soft-tissue path past the top of
 * the window and clamped.
 *
 * Read off the live pane, the film comes back correct at roughly 1 to 20.
 * The gap between that and the idealised figure is DOUBLE COUNTING: the
 * muscle and organ GLBs are separately closed shells that still overlap in
 * places, so some soft tissue is charged for more than once even with the
 * beam cut to three layers. That is an honest limitation of the source
 * meshes, stated here and in the pane, rather than a number tuned away.
 */
export const DEFAULT_WINDOW = { lo: 1.0, hi: 20.0 };
export function filmDensity(tau, win) {
  const w = win || DEFAULT_WINDOW;
  return Math.min(1, Math.max(0, (tau - w.lo) / (w.hi - w.lo)));
}

/*
 * A window sized for what is actually in the beam, so a hand and an abdomen
 * are both readable without hunting for the control. Centred on the median
 * tau with a span either side. Used as the escape hatch when DEFAULT_WINDOW
 * turns out wrong for a region -- see the troubleshooting note in the plan's
 * Task 8.
 */
export function windowFor(tauMedian) {
  const span = Math.max(2, tauMedian * 0.9);
  return { lo: Math.max(0, tauMedian - span), hi: tauMedian + span };
}

/*
 * Cortex and medulla.
 *
 * The GLB bones are single closed surfaces -- the outer cortex, with nothing
 * inside -- so every bone read as a uniform slab and the pane said so. A real
 * long bone is a cortical tube around a fatty medullary canal, which is why a
 * film shows a bright rim, a darker centre, and bright edges where the ray
 * runs down the length of the cortex rather than across it.
 *
 * Each surface crossing is charged for one cortical slab entered at the true
 * incidence angle -- path through a slab is t / cos(incidence) -- over a bulk
 * of marrow. Two crossings per bone, so a straight-through ray gets 2t of
 * cortex and a grazing one gets much more, which is the edge brightening.
 *
 * LIMITATION, and it is not a small one: t is uniform, so a rib is given a
 * femur's cortex. This is a large improvement on no cortex at all and it is
 * not a cortical thickness model. The pane says which.
 *
 * MIRRORED IN GLSL. studio/live-physiology.js applies the same shell term per
 * fragment, one crossing at a time, letting additive blending supply the
 * count. Change one, change both -- the check below only tests this copy.
 */
export const CORTEX_CM = 0.2;
export const GRAZE_CLAMP = 0.05;

export function boneTau({ pathCm, cosIncidence, kvp, crossings = 2 }) {
  const cortex = mu('bone', kvp), marrow = mu('marrow', kvp);
  const c = Math.max(GRAZE_CLAMP, Math.abs(cosIncidence));
  return crossings * (cortex - marrow) * (CORTEX_CM / c) + marrow * pathCm;
}

/*
 * Which tissue a given mesh is made of.
 *
 * The layer is usually enough -- a skeleton mesh is bone, a muscle mesh is
 * soft tissue -- but the organ GLB carries the lungs and the solid viscera in
 * one file, and those are not the same thing at all. NIST gives lung and soft
 * tissue the SAME mass attenuation coefficient; an inflated lung is lucent
 * purely because it is a quarter as dense (0.26 against 1.06 g/cm^3). Classify
 * the lungs as soft tissue and a chest film comes out with white lung fields,
 * which is the exact opposite of a chest film.
 *
 * Matched on the mesh name because that is what the GLB actually carries.
 * three.js sanitises node names on import -- whitespace becomes _, and the
 * reserved set [ ] . : / is deleted -- so 'Superior lobe of left lung' reaches
 * the runtime as 'Superior_lobe_of_left_lung'. Matching therefore runs on a
 * lowercased form with underscores folded back to spaces, and on substrings
 * rather than exact names, because the loader also glues side letters on.
 *
 * Substring matching is wide on purpose, and it costs something: the
 * pulmonary vessels ("Superior vein of left lung") and the tracheobronchial
 * nodes would classify as lung too. Neither is ever in the beam -- XRAY_LAYERS
 * in studio/live-physiology.js is skeleton, muscle and organs, and the
 * circulatory and lymphatic layers are switched off before the projection
 * renders. If a later change puts vessels in the beam, this is the line that
 * needs a rule, not the caller.
 */
export const AIR_FILLED = ['lung', 'trachea', 'bronch', 'pleura'];

export function tissueForMesh(name, layerKey) {
  if (layerKey === 'skeleton') return 'bone';
  const n = String(name || '').replace(/_/g, ' ').toLowerCase();
  if (AIR_FILLED.some((p) => n.includes(p))) return 'lung';
  return 'soft';
}
