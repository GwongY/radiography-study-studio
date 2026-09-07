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
