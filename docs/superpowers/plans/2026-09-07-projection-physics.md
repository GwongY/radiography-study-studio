# Projection physics (part A) implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the projection a dimensioned radiograph — real NIST attenuation
coefficients over a path measured in centimetres, kVp and mAs as separate
controls obeying the inverse square law, a cortical/medullary bone model, and
soft tissue and air-filled lung in the beam.

**Architecture:** A new pure module `outputs/radiography.js` owns every number.
It has no three.js and no DOM, so `work/radiography-check.mjs` runs it in node —
the pattern `cavity-geom.js` + `work/cavity-probe.mjs` already established here.
`outputs/studio/live-physiology.js` keeps the shaders and the render target and
is reduced to feeding uniforms it is handed. `outputs/study/what-is-under.js`
grows the control pane.

**Tech Stack:** Vanilla ES modules, no build step. GLSL in template literals.
three.js via the importmap. Node 20+ for the checks. Design:
`docs/superpowers/specs/2026-09-07-projection-physics-design.md`.

---

## Read this before Task 1

Five things about this repo that will bite an engineer who does not know them:

1. **`outputs/` is CRLF, `work/*.mjs` is LF.** A patch script matching on `\n`
   finds nothing in the CRLF files and reports success having changed nothing.
2. **The two halves have separate import scopes.** `studio.js` and `study.js`
   share nothing but `window.__osteo`. A module both need is imported twice —
   and must use the *identical* `?v=` query in both, because the service worker
   cache key is the whole URL. A file imported at two different queries needs
   two shell entries.
3. **Nothing may run at module scope** in `study/*.js` or `studio/*.js`. They
   import each other cyclically. Side effects belong in `init()`.
4. **`node work/load-check.mjs` after any HTML edit.** A load-time death shipped
   once and took the whole app down.
5. **Another session has uncommitted work** in `outputs/schedule.js`, four corpus
   files, `sw.js`, `docs/CODEMAP.md`, `docs/DATA-INDEX.md`,
   `work/source-text.json` and `work/baselines/corpus-snapshot.txt`. Do **not**
   `git add -A`, and do **not** run `codemap.mjs`, `data-index.mjs` or
   `baseline.mjs` until Task 10, which handles the collision explicitly.

## File structure

| file | responsibility | status |
|---|---|---|
| `outputs/radiography.js` | every physical constant and law. Pure. | create |
| `work/radiography-check.mjs` | verifies all of it in node | create |
| `outputs/studio/live-physiology.js` | shaders, render target, uniform feed | modify `525-860` |
| `outputs/studio/imports.js` | re-export the new module to the studio half | modify |
| `outputs/study/what-is-under.js` | the control pane | modify `74-170` |
| `outputs/radiography-study-studio.html` | pane markup, explanatory copy | modify `266-320` |
| `outputs/app.css` | styles for the new controls | modify |
| `outputs/sw.js` | `CACHE_VERSION`, one new SHELL entry | modify |

---

## Task 1: The attenuation tables

**Files:**
- Create: `outputs/radiography.js`
- Create: `work/radiography-check.mjs`

- [ ] **Step 1: Write the failing check**

Create `work/radiography-check.mjs` (LF line endings):

```js
/*
 * The projection's physics, checked without a browser.
 *
 * Every number the film is made of is a published one, and the point of
 * putting them in a pure module is that a wrong one is a wrong number here
 * rather than "a picture that looks a bit off" in a canvas. Bone reading
 * 6.4x soft tissue at 30 keV is checkable; bone "looking about right" is not.
 *
 * Usage: node work/radiography-check.mjs
 */
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const R = await import(pathToFileURL(join(root, 'outputs/radiography.js')).href);

let failures = 0;
const fail = (m) => { failures += 1; console.log(`  FAIL  ${m}`); };
const ok = (m) => console.log(`  ok    ${m}`);
const near = (got, want, tol, m) => {
  if (Math.abs(got - want) <= tol) ok(`${m} (${got.toFixed(4)})`);
  else fail(`${m}: got ${got.toFixed(4)}, want ${want} +/- ${tol}`);
};

console.log('- mass attenuation reproduces every NIST row exactly -');
/* Every tabulated row of every tissue, not a spot check. An interpolator that
   is right at 30 keV and wrong at 80 is exactly the failure this catches. */
const NIST = {
  bone:   [4.001, 1.331, 0.6655, 0.4242, 0.3148, 0.2229, 0.1855, 0.1480],
  soft:   [0.8230, 0.3790, 0.2688, 0.2264, 0.2048, 0.1823, 0.1693, 0.1492],
  marrow: [0.5677, 0.3063, 0.2396, 0.2123, 0.1974, 0.1800, 0.1688, 0.1500],
  lung:   [0.8316, 0.3815, 0.2699, 0.2270, 0.2053, 0.1826, 0.1695, 0.1493],
};
let rows = 0, rowsBad = 0;
for (const [tissue, want] of Object.entries(NIST)) {
  R.KEV_ROWS.forEach((keV, i) => {
    rows += 1;
    if (Math.abs(R.massAtten(tissue, keV) - want[i]) > 1e-9) {
      rowsBad += 1;
      fail(`${tissue} at ${keV} keV: got ${R.massAtten(tissue, keV)}, want ${want[i]}`);
    }
  });
}
if (!rowsBad) ok(`all ${rows} tabulated rows returned verbatim`);

console.log('- interpolation stays between the rows it sits between -');
for (const tissue of Object.keys(NIST)) {
  const a = R.massAtten(tissue, 35);
  if (a < R.massAtten(tissue, 30) && a > R.massAtten(tissue, 40)) ok(`${tissue} at 35 keV is bracketed`);
  else fail(`${tissue} at 35 keV escapes its bracket: ${a}`);
}

console.log('- linear attenuation is mass attenuation times density -');
near(R.mu('bone', 30), 2.5555, 1e-3, 'bone mu at 30 keV, cm^-1');
near(R.mu('soft', 30), 0.4017, 1e-3, 'soft mu at 30 keV, cm^-1');
near(R.mu('lung', 30), 0.0992, 1e-3, 'inflated lung mu at 30 keV, cm^-1');

console.log('- lung is lucent by density alone, not by composition -');
near(R.massAtten('lung', 30) / R.massAtten('soft', 30), 1.0, 0.02,
  'lung and soft tissue share a mass attenuation coefficient');
if (R.TISSUES.lung.rho < 0.3) ok('inflated lung density is the in-vivo value');
else fail(`inflated lung density is ${R.TISSUES.lung.rho}, expected ~0.26 (ICRU-46)`);

console.log(failures ? `\n${failures} FAILED` : '\nALL PASS');
process.exit(failures ? 1 : 0);
```

- [ ] **Step 2: Run it to verify it fails**

```bash
node work/radiography-check.mjs
```

Expected: `ERR_MODULE_NOT_FOUND` for `outputs/radiography.js`.

- [ ] **Step 3: Create the module with the tables**

Create `outputs/radiography.js` (**CRLF line endings** — match the rest of
`outputs/`). Note the density provenance differs per tissue and is recorded:

```js
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
  let i = 0;
  while (i < KEV_ROWS.length - 2 && KEV_ROWS[i + 1] < E) i += 1;
  const e0 = KEV_ROWS[i], e1 = KEV_ROWS[i + 1];
  const m0 = t.muRho[i], m1 = t.muRho[i + 1];
  if (E === e0) return m0;
  const f = (Math.log(E) - Math.log(e0)) / (Math.log(e1) - Math.log(e0));
  return Math.exp(Math.log(m0) + f * (Math.log(m1) - Math.log(m0)));
}

/* Linear attenuation coefficient, cm^-1. */
export function muAt(tissue, keV) { return massAtten(tissue, keV) * TISSUES[tissue].rho; }
```

- [ ] **Step 4: Add `mu(tissue, kvp)` and the effective-energy approximation**

Append to `outputs/radiography.js`:

```js
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
```

- [ ] **Step 5: Run the check to verify it passes**

```bash
node work/radiography-check.mjs
```

Expected: `ALL PASS`, eight `ok` lines. `massAtten` at a tabulated row must
return the row verbatim — that is what the `1e-9` tolerance asserts.

- [ ] **Step 6: Commit**

```bash
git add outputs/radiography.js work/radiography-check.mjs
git commit -m "feat(projection): NIST attenuation tables as a pure module

Bone at 6.4x soft tissue at 30 keV is a number that can be checked. The
constants it replaces were, by their own comment, chosen to look right.

Densities name their own source: NIST's ICRU-44 lung entry is parenchyma at
1.05, and a radiograph is made of inflated lung at 0.26 (ICRU-46).

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 2: Contrast falls with kVp

**Files:**
- Modify: `work/radiography-check.mjs`

- [ ] **Step 1: Write the failing check**

Insert before the final `console.log(failures ...)` in `work/radiography-check.mjs`:

```js
console.log('- kVp is a contrast control -');
near(R.effectiveKeV(75), 30, 1e-9, '75 kVp gives a 30 keV effective energy');
near(R.contrastRatio(50), 8.806, 0.02, 'bone:soft at 50 kVp (20 keV)');
near(R.contrastRatio(75), 6.361, 0.02, 'bone:soft at 75 kVp (30 keV)');
near(R.contrastRatio(125), 3.394, 0.02, 'bone:soft at 125 kVp (50 keV)');

let prev = Infinity, mono = true;
for (let kvp = 50; kvp <= 125; kvp += 5) {
  const c = R.contrastRatio(kvp);
  if (c >= prev) mono = false;
  prev = c;
}
if (mono) ok('contrast falls monotonically from 50 to 125 kVp');
else fail('contrast is not monotonic in kVp — the interpolation is wrong');
```

- [ ] **Step 2: Run to verify it passes**

```bash
node work/radiography-check.mjs
```

Expected: PASS. Task 1's implementation already satisfies this — these
assertions pin the behaviour the spec's headline table claims, so a later
change to the interpolation cannot silently break it.

- [ ] **Step 3: Commit**

```bash
git add work/radiography-check.mjs
git commit -m "test(projection): pin the kVp-contrast relationship

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 3: Beam geometry — inverse square, magnification, mottle

**Files:**
- Modify: `outputs/radiography.js`
- Modify: `work/radiography-check.mjs`

- [ ] **Step 1: Write the failing check**

Insert before the final `console.log(failures ...)`:

```js
console.log('- the beam obeys the inverse square law -');
near(R.fluence({ mAs: 10, sidCm: 200 }) / R.fluence({ mAs: 10, sidCm: 100 }),
  0.25, 1e-9, 'doubling SID quarters the fluence');
near(R.fluence({ mAs: 40, sidCm: 200 }) / R.fluence({ mAs: 10, sidCm: 100 }),
  1.0, 1e-9, 'quadrupling mAs restores it');
near(R.fluence({ mAs: 20, sidCm: 100 }) / R.fluence({ mAs: 10, sidCm: 100 }),
  2.0, 1e-9, 'fluence is linear in mAs');

console.log('- mottle is 1/sqrt(N), so it rises with distance -');
const sLo = R.mottleSigma({ mAs: 10, sidCm: 100 });
near(R.mottleSigma({ mAs: 40, sidCm: 100 }) / sLo, 0.5, 1e-9,
  'quadrupling mAs halves the noise');
near(R.mottleSigma({ mAs: 10, sidCm: 200 }) / sLo, 2.0, 1e-9,
  'doubling SID doubles the noise');

console.log('- magnification is SID over SOD -');
near(R.magnification({ sidCm: 100, oidCm: 0 }), 1.0, 1e-9, 'object on the detector');
near(R.magnification({ sidCm: 100, oidCm: 50 }), 2.0, 1e-9, 'object halfway');
near(R.magnification({ sidCm: 180, oidCm: 18 }), 1.111, 1e-3, 'a chest heart at 180 cm');

console.log('- the model is dimensioned -');
near(R.CM_PER_UNIT, 14.409, 1e-3, 'one model unit in centimetres');
near(R.unitsToCm(1), 14.409, 1e-3, 'a one-unit path');
```

- [ ] **Step 2: Run to verify it fails**

```bash
node work/radiography-check.mjs
```

Expected: FAIL — `R.fluence is not a function`.

- [ ] **Step 3: Implement**

Append to `outputs/radiography.js`:

```js
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
```

- [ ] **Step 4: Run to verify it passes**

```bash
node work/radiography-check.mjs
```

Expected: `ALL PASS`.

- [ ] **Step 5: Commit**

```bash
git add outputs/radiography.js work/radiography-check.mjs
git commit -m "feat(projection): inverse square, magnification and Poisson mottle

Double the SID and quadruple the mAs and the film comes back. That is an
exam question, and now it is a thing you can watch happen.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 4: The display transfer function

**Files:**
- Modify: `outputs/radiography.js`
- Modify: `work/radiography-check.mjs`

The spec's chest table is the reason this task exists: a lung field transmits
3.0% and a mediastinum 0.03%, and the current linear `1 - exp(-tau)` maps both
to white. Because tau is already `-ln(transmission)`, a **linear window on tau
is a logarithmic window on intensity** — so this is one clamp, not a `pow`.

- [ ] **Step 1: Write the failing check**

Insert before the final `console.log(failures ...)`:

```js
console.log('- the chest the spec claims, from the module constants -');
const tauLung = R.mu('lung', 75) * 15 + R.mu('soft', 75) * 5;
const tauMed = R.mu('soft', 75) * 20;
near(tauLung, 3.497, 0.01, 'tau through a lung field');
near(tauMed, 8.035, 0.01, 'tau through the mediastinum');
near(Math.exp(-tauLung), 0.0303, 1e-3, 'lung field transmits ~3%');
near(Math.exp(-tauMed), 0.00032, 1e-4, 'mediastinum transmits ~0.03%');

console.log('- a log window separates them; a linear one does not -');
const W = { lo: 0.5, hi: 9.0 };
const dLung = R.filmDensity(tauLung, W);
const dMed = R.filmDensity(tauMed, W);
if (dMed - dLung > 0.4) ok(`log window separates lung from mediastinum (${dLung.toFixed(2)} vs ${dMed.toFixed(2)})`);
else fail(`log window collapses them: ${dLung.toFixed(3)} vs ${dMed.toFixed(3)}`);
const linLung = 1 - Math.exp(-tauLung), linMed = 1 - Math.exp(-tauMed);
if (linMed - linLung < 0.05) ok(`the old linear curve collapsed them, as the spec says (${linLung.toFixed(3)} vs ${linMed.toFixed(3)})`);
else fail('the linear curve did not collapse them — recheck the premise');

console.log('- the window clamps and is monotonic -');
near(R.filmDensity(0, W), 0, 1e-9, 'nothing in the beam is black');
near(R.filmDensity(100, W), 1, 1e-9, 'a very long path saturates white');
if (R.filmDensity(4, W) > R.filmDensity(3, W)) ok('density rises with tau');
else fail('density is not monotonic in tau');
```

- [ ] **Step 2: Run to verify it fails**

```bash
node work/radiography-check.mjs
```

Expected: FAIL — `R.filmDensity is not a function`.

- [ ] **Step 3: Implement**

Append to `outputs/radiography.js`:

```js
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
 */
export const DEFAULT_WINDOW = { lo: 0.5, hi: 9.0 };
export function filmDensity(tau, win) {
  const w = win || DEFAULT_WINDOW;
  return Math.min(1, Math.max(0, (tau - w.lo) / (w.hi - w.lo)));
}

/*
 * A window sized for what is actually in the beam, so a hand and an abdomen
 * are both readable without hunting for the control. Centred on the median
 * tau with a span either side.
 */
export function windowFor(tauMedian) {
  const span = Math.max(2, tauMedian * 0.9);
  return { lo: Math.max(0, tauMedian - span), hi: tauMedian + span };
}
```

- [ ] **Step 4: Run to verify it passes**

```bash
node work/radiography-check.mjs
```

Expected: `ALL PASS`.

- [ ] **Step 5: Commit**

```bash
git add outputs/radiography.js work/radiography-check.mjs
git commit -m "feat(projection): window on tau, which is a log window on intensity

A chest spans 100:1 between lung field and mediastinum. The linear curve
mapped both to white; this is the one clamp that fixes it.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 5: Wire the module into the studio's import scope

**Files:**
- Modify: `outputs/studio/imports.js`
- Modify: `outputs/sw.js:36` and the SHELL list
- Test: `node work/shell-check.mjs`, `node work/binding-check.mjs`

- [ ] **Step 1: Add the import and re-export**

In `outputs/studio/imports.js`, after the `systems.js` import line, add:

```js
  /* The projection's physics. Pure.
     Only the STUDIO half imports this. The study half's pane reaches the
     beam through window.__osteo and never needs a coefficient of its own --
     which is deliberate: two importers at two different `?v=` queries would
     need two SHELL entries, because the SW cache key is the whole URL. If a
     lesson ever wants to teach from these numbers, import it there at this
     SAME query and add nothing to the shell. See CLAUDE.md. */
  import { TISSUES, CM_PER_UNIT, mu, contrastRatio, effectiveKeV, fluence,
    mottleSigma, magnification, filmDensity, windowFor, unitsToCm,
    DEFAULT_WINDOW, REF_MAS, REF_SID_CM } from '../radiography.js?v=1';
```

Then add these names to the `export { ... }` block at the bottom, in the
existing alphabetical order: `CM_PER_UNIT`, `DEFAULT_WINDOW`, `REF_MAS`,
`REF_SID_CM`, `TISSUES`, `contrastRatio`, `effectiveKeV`, `filmDensity`,
`fluence`, `magnification`, `mottleSigma`, `mu`, `unitsToCm`, `windowFor`.

- [ ] **Step 2: Add the shell entry and bump the cache**

In `outputs/sw.js`, change `const CACHE_VERSION` to `'v132'`.

**Read the current value first, do not assume it.** The committed value is
`v130`, but the other session's uncommitted edit has already moved the working
copy to `v131` — so `v131` is taken and reusing it would serve a stale shell
to anyone who already cached theirs. If the working copy reads something other
than `v131` when you get here, take the next number above whatever it reads and
say so in your report.

Then add to the SHELL list, next to the other `outputs/*.js` data modules
(**with the query, exactly as imported**):

```js
  './radiography.js?v=1',
```

- [ ] **Step 3: Verify the shell and the bindings**

```bash
node work/shell-check.mjs
node work/binding-check.mjs
node work/syntax-check.mjs
node work/verify-modules.mjs
```

Expected: all pass. `shell-check` walks the import graph transitively and is
the check that catches a module reachable but not precached — a 404 that
appears only offline, which is the one condition this app is built for.

- [ ] **Step 4: Commit**

```bash
git add outputs/studio/imports.js outputs/sw.js
git commit -m "chore(projection): reach radiography.js from the studio scope

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 6: Dimension the beam and take mu from the module

**Files:**
- Modify: `outputs/studio/live-physiology.js:540` (`XRAY_MU`), `:549-576`
  (`XRAY_FRAG`, `XRAY_POST_FRAG`, `xrayDepthMaterial`), `:794-798`
  (`setXrayExposure`)

This is the first task whose result cannot be checked in node. Verify it by
measuring the film, the way `enterXray`'s own comments already do
("a chest PA came back at mean density 26.210 against 26.207").

- [ ] **Step 1: Replace `XRAY_MU` with a call into the module**

Delete the `export const XRAY_MU={...}` object at `live-physiology.js:540` and
replace it with:

```js
/*
 * Which tissue each GLB layer is made of. The COEFFICIENTS are no longer
 * here -- radiography.js holds them, from NIST, and they now depend on kVp.
 * This map is the only thing that was ever a judgement call.
 *
 * circulatory, nervous and lymphatic are absent, and their absence is a fact
 * rather than a compromise: unenhanced vessels and nerves are not visible on
 * a plain film. The pane says so, because a reader who notices the aorta is
 * missing should find out why.
 *
 * joint (ligaments) is soft tissue. It used to be 0.30 -- a third of bone --
 * which is what a ligament would read as if it were made of cartilage-grade
 * mineral. It is not.
 */
export const XRAY_TISSUE = { skeleton:'bone', muscle:'soft', organs:'soft', joint:'soft' };
export const XRAY_LAYERS = Object.keys(XRAY_TISSUE);
```

- [ ] **Step 2: Make the depth material take a real coefficient**

Replace `xrayDepthMaterial` at `live-physiology.js:576`:

```js
/*
 * uMu is now cm^-1 and uCmPerUnit converts the path, so the value this
 * material accumulates is a real optical depth rather than a relative one.
 */
export function xrayDepthMaterial(THREE, muCm, cmPerUnit){
  return new THREE.ShaderMaterial({
    uniforms:{uMu:{value:muCm}, uCmPerUnit:{value:cmPerUnit}},
    vertexShader:XRAY_VERT, fragmentShader:XRAY_FRAG,
    side:THREE.DoubleSide, depthTest:false, depthWrite:false,
    blending:THREE.CustomBlending, blendEquation:THREE.AddEquation,
    blendSrc:THREE.OneFactor, blendDst:THREE.OneFactor,
  });
}
```

And `XRAY_FRAG`:

```js
const XRAY_FRAG=`
uniform float uMu, uCmPerUnit;
varying float vDist;
void main(){
  /* Back faces are where the ray leaves material, front faces where it enters. */
  float sgn = gl_FrontFacing ? -1.0 : 1.0;
  gl_FragColor = vec4(sgn * vDist * uCmPerUnit * uMu, 0.0, 0.0, 1.0);
}`;
```

- [ ] **Step 3: Replace the post shader's curve with the tau window**

Replace `XRAY_POST_FRAG` at `live-physiology.js:557`:

```js
const XRAY_POST_FRAG=`
uniform sampler2D tTau;
uniform float uWinLo, uWinHi, uSigma, uSeed, uFlipX;
varying vec2 vUv;
float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
void main(){
  /* Shells that are not quite closed can integrate slightly negative. */
  vec2 uv = vec2(uFlipX > 0.5 ? 1.0 - vUv.x : vUv.x, vUv.y);
  float tau = max(0.0, texture2D(tTau, uv).r);
  /* tau is -ln(transmission), so a linear window here is a LOG window on
     intensity -- which is what a detector applies, and what the previous
     1-exp(-tau) did not. See radiography.js filmDensity(). */
  float density = clamp((tau - uWinLo) / (uWinHi - uWinLo), 0.0, 1.0);
  /* Quantum mottle: sigma comes from mAs and SID via radiography.js. */
  float n = hash(uv * 1024.0 + uSeed) - 0.5;
  density += n * uSigma * (0.35 + 0.65 * density);
  gl_FragColor = vec4(vec3(clamp(density, 0.0, 1.0)), 1.0);
}`;
```

- [ ] **Step 4: Update the three call sites the rename breaks**

In `enterXray`, replace the `shared` helper and the `postMat` uniforms:

```js
  const shared=(key)=>{
    const tissue=XRAY_TISSUE[key]||'soft';
    if(!state.xray.shared.has(key))
      state.xray.shared.set(key,xrayDepthMaterial(THREE,mu(tissue,state.xray.kvp),CM_PER_UNIT));
    return state.xray.shared.get(key);
  };
```

and in the `postMat` construction:

```js
    uniforms:{tTau:{value:rt.texture},uWinLo:{value:DEFAULT_WINDOW.lo},
      uWinHi:{value:DEFAULT_WINDOW.hi},uSigma:{value:0.05},
      uSeed:{value:0},uFlipX:{value:0}},
```

Add `kvp:75, mAs:10` to the `state.xray={...}` literal, replacing `exposure:1.6`.

Add the new names to this file's import from `./imports.js`:
`CM_PER_UNIT`, `DEFAULT_WINDOW`, `mu`, `filmDensity`, `fluence`, `mottleSigma`,
`windowFor`, `magnification`, `contrastRatio`, `effectiveKeV`, `REF_MAS`,
`REF_SID_CM`.

In `visualisation-modes.js:7`, change `XRAY_MU` in the import list to
`XRAY_TISSUE` and fix any reference to it.

- [ ] **Step 5: Verify it loads and binds**

```bash
node work/binding-check.mjs
node work/load-check.mjs
node work/syntax-check.mjs
```

Expected: all pass. `binding-check` is the one that catches a missing import,
which loads clean and throws only when that code path runs.

- [ ] **Step 6: Measure the film**

Start the dev server, open the Projection tab, and read the mean density back
out of the canvas:

```bash
node work/dev-server.mjs
```

In the browser console on `http://localhost:8420/radiography-study-studio.html`
with the Projection tab open on Chest / PA:

```js
const c = document.querySelector('#xrayMount canvas');
const g = c.getContext('webgl2') || c.getContext('webgl');
const px = new Uint8Array(c.width * c.height * 4);
g.readPixels(0, 0, c.width, c.height, g.RGBA, g.UNSIGNED_BYTE, px);
let s = 0; for (let i = 0; i < px.length; i += 4) s += px[i];
console.log('mean density', (s / (px.length / 4)).toFixed(3));
```

Expected: a number in 0–255 that is neither 0 nor 255. Record it in the commit
message — it is the baseline the next three tasks are measured against.

- [ ] **Step 7: Commit**

```bash
git add outputs/studio/live-physiology.js outputs/studio/visualisation-modes.js
git commit -m "feat(projection): a beam measured in centimetres

The integral was already right. It was in model units against coefficients
its own comment called invented. Path now converts at 14.409 cm/unit and mu
comes from NIST at the set kVp, so tau is a real optical depth.

The post curve becomes a window on tau, which is a log window on intensity.
Chest PA mean density: <record the measured number>.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 7: Cortex and medulla

**Files:**
- Modify: `outputs/studio/live-physiology.js` (`XRAY_VERT`, `XRAY_FRAG`,
  `xrayDepthMaterial`)
- Modify: `outputs/radiography.js`
- Modify: `work/radiography-check.mjs`

- [ ] **Step 1: Write the failing check for the shell constants**

Insert before the final `console.log(failures ...)`:

```js
console.log('- the cortical shell -');
near(R.CORTEX_CM, 0.2, 1e-9, 'cortical thickness is 2 mm');
near(R.GRAZE_CLAMP, 0.05, 1e-9, 'the grazing clamp caps the shell term at 20t');
/* A ray straight through a 4 cm bone: 2 shell crossings plus a marrow bulk. */
const straight = R.boneTau({ pathCm: 4, cosIncidence: 1, kvp: 75 });
const grazing = R.boneTau({ pathCm: 4, cosIncidence: 0.2, kvp: 75 });
if (grazing > straight) ok('a grazing ray spends longer in cortex than a normal one');
else fail('the shell term does not rise at grazing incidence');
const uniform = R.mu('bone', 75) * 4;
if (straight < uniform) ok('a hollow bone attenuates less than a solid one');
else fail(`shell model is not lighter than solid bone: ${straight} vs ${uniform}`);
near(R.boneTau({ pathCm: 4, cosIncidence: 0.001, kvp: 75 }),
     R.boneTau({ pathCm: 4, cosIncidence: 0.05, kvp: 75 }), 1e-9,
     'the clamp bounds the silhouette edge');
```

- [ ] **Step 2: Run to verify it fails**

```bash
node work/radiography-check.mjs
```

Expected: FAIL — `R.CORTEX_CM` undefined.

- [ ] **Step 3: Implement in the pure module**

Append to `outputs/radiography.js`:

```js
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
 */
export const CORTEX_CM = 0.2;
export const GRAZE_CLAMP = 0.05;

export function boneTau({ pathCm, cosIncidence, kvp, crossings = 2 }) {
  const cortex = mu('bone', kvp), marrow = mu('marrow', kvp);
  const c = Math.max(GRAZE_CLAMP, Math.abs(cosIncidence));
  return crossings * (cortex - marrow) * (CORTEX_CM / c) + marrow * pathCm;
}
```

- [ ] **Step 4: Run to verify it passes**

```bash
node work/radiography-check.mjs
```

Expected: `ALL PASS`.

- [ ] **Step 5: Mirror it in the shader**

The shader accumulates per-crossing, so it adds *one* slab per fragment and
the additive blend supplies the count. Replace `XRAY_VERT`:

```js
const XRAY_VERT=`
varying float vDist;
varying float vCos;
void main(){
  vec4 mv = modelViewMatrix * vec4(position,1.0);
  vDist = -mv.z;
  /* Incidence angle of the ray on this surface, for the cortical slab. */
  vec3 n = normalize(normalMatrix * normal);
  vCos = abs(dot(n, normalize(-mv.xyz)));
  gl_Position = projectionMatrix * mv;
}`;
```

and `XRAY_FRAG`:

```js
const XRAY_FRAG=`
uniform float uMu, uCmPerUnit, uShell, uGraze;
varying float vDist;
varying float vCos;
void main(){
  /* Back faces are where the ray leaves material, front faces where it enters. */
  float sgn = gl_FrontFacing ? -1.0 : 1.0;
  float bulk = sgn * vDist * uCmPerUnit * uMu;
  /* One cortical slab per crossing, at the true incidence angle. Added on
     BOTH faces (not signed) because entering and leaving each cross one.
     uShell is zero for the soft-tissue layers. See radiography.js boneTau(). */
  float shell = uShell / max(uGraze, vCos);
  gl_FragColor = vec4(bulk + shell, 0.0, 0.0, 1.0);
}`;
```

Update `xrayDepthMaterial` to carry the two new uniforms:

```js
export function xrayDepthMaterial(THREE, muCm, cmPerUnit, shell){
  return new THREE.ShaderMaterial({
    uniforms:{uMu:{value:muCm}, uCmPerUnit:{value:cmPerUnit},
      uShell:{value:shell||0}, uGraze:{value:GRAZE_CLAMP}},
    vertexShader:XRAY_VERT, fragmentShader:XRAY_FRAG,
    side:THREE.DoubleSide, depthTest:false, depthWrite:false,
    blending:THREE.CustomBlending, blendEquation:THREE.AddEquation,
    blendSrc:THREE.OneFactor, blendDst:THREE.OneFactor,
  });
}
```

And in `enterXray`'s `shared` helper, pass marrow as the bulk for bone and the
shell excess as the fourth argument:

```js
  const shared=(key)=>{
    const tissue=XRAY_TISSUE[key]||'soft';
    if(!state.xray.shared.has(key)){
      const kvp=state.xray.kvp;
      const isBone=tissue==='bone';
      const bulk=isBone?mu('marrow',kvp):mu(tissue,kvp);
      const shell=isBone?(mu('bone',kvp)-mu('marrow',kvp))*CORTEX_CM:0;
      state.xray.shared.set(key,xrayDepthMaterial(THREE,bulk,CM_PER_UNIT,shell));
    }
    return state.xray.shared.get(key);
  };
```

Add `CORTEX_CM` and `GRAZE_CLAMP` to the import and re-export lists in
`outputs/studio/imports.js`, and to `live-physiology.js`'s import from it.

- [ ] **Step 6: Verify and measure**

```bash
node work/binding-check.mjs && node work/load-check.mjs && node work/radiography-check.mjs
```

Then re-measure with the Task 6 Step 6 snippet on Chest / PA. Expected: the
mean density changes, and visually the ribs and clavicles now show a bright
margin with a darker centre. If every bone got *uniformly* brighter with no
rim, `vCos` is wrong — check that `normal` is actually present on the GLB
geometry (`state.fullMeshes[0].geometry.attributes.normal`).

- [ ] **Step 7: Commit**

```bash
git add outputs/radiography.js outputs/studio/live-physiology.js outputs/studio/imports.js work/radiography-check.mjs
git commit -m "feat(projection): a cortical rim around a medullary canal

The meshes are hollow shells, so every bone read as a uniform slab -- the
pane admitted it. Each crossing now buys one cortical slab at the true
incidence angle over a marrow bulk, which is also where edge brightening
comes from.

t is uniform, so a rib gets a femur's cortex. Said out loud in the pane.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 8: Put soft tissue and lung in the beam

**Files:**
- Modify: `outputs/studio/live-physiology.js:700-712` (`enterXray`'s layer forcing)
- Modify: `outputs/study/what-is-under.js:100-117` (`enterProjection`, loading state)

`enterXray` currently forces `skeleton` on and every other layer off. The spec's
diagnosis is that the fog came from double counting five overlapping shells, not
from the coefficients — so the fix is skeleton + muscle + organs, once each.

- [ ] **Step 1: Change the layer forcing**

Replace the `setLayerChips('skeleton',true); SYSTEMS.forEach(...)` block in
`enterXray` with:

```js
  /*
   * The beam sees each volume ONCE.
   *
   * It used to see the skeleton alone, and the note in what-is-under.js
   * blamed the soft-tissue coefficients: six layers at 0.10-0.30 against bone
   * at 1.00 "read as fog with a skeleton somewhere behind it". The ratios
   * were close to right -- NIST puts bone at 6.4x soft tissue at 30 keV
   * against the 6.3x those constants implied. The fog was DOUBLE COUNTING:
   * muscle, organs, circulatory, nervous and lymphatic are overlapping closed
   * shells occupying the same physical volume, so one ray charged for the
   * same soft tissue three to five times over.
   *
   * So: skeleton, muscle, organs. Vessels, nerves and lymphatics stay off,
   * and that is a fact rather than a compromise -- unenhanced vessels are not
   * visible on a plain film. Whatever is on in the 3D tab is restored on the
   * way out.
   */
  XRAY_LAYERS.forEach((k)=>setLayerChips(k,true));
  SYSTEMS.forEach((s)=>{if(!XRAY_LAYERS.includes(s.layer))state.layers[s.key]=false});
```

- [ ] **Step 2: Give the pane a loading state**

`enterXray` now needs three GLBs where it needed one, so the pane must say so
rather than sitting blank. In `outputs/study/what-is-under.js`, in
`enterProjection`, after the `boot()` line and before `enterXray()`:

```js
  /* Three GLBs now, not one -- the lungs are in the organs file. Say so
     rather than showing a blank pane for several seconds. */
  mount.innerHTML = '<div class="emptybox">Loading the beam’s three tissue layers…</div>';
  await window.__osteo.ensureXrayLayers();
  mount.innerHTML = '';
```

- [ ] **Step 3: Add the loader to the bridge**

In `outputs/studio/visualisation-modes.js`, in the `window.__osteo` object
near line 282, add:

```js
  ensureXrayLayers:async()=>{ for(const k of XRAY_LAYERS) await setLayer(k,true); },
```

Import `XRAY_LAYERS` there.

- [ ] **Step 4: Verify the bridge**

```bash
node work/bridge-check.mjs
node work/binding-check.mjs
node work/load-check.mjs
```

Expected: pass. `bridge-check` is the only thing that sees the `window.__osteo`
seam — `binding-check` cannot.

- [ ] **Step 5: Look at a chest**

Reload, open Projection, Chest / PA. Expected: **lung fields darker than the
mediastinum**, a visible diaphragm and heart border. If the whole film is
white, the window is wrong for this tau range — call `windowFor()` with the
measured median rather than using `DEFAULT_WINDOW`. If the lungs are *brighter*
than the mediastinum, `XRAY_TISSUE` is mapping organs to the wrong tissue.

Re-measure the mean density and record it.

- [ ] **Step 6: Commit**

```bash
git add outputs/studio/live-physiology.js outputs/studio/visualisation-modes.js outputs/study/what-is-under.js
git commit -m "feat(projection): a chest with lungs in it

The fog was never the coefficients. Five overlapping shells charged one ray
for the same soft tissue three to five times over. Skeleton, muscle, organs,
once each -- and vessels stay off because a plain film cannot see them.

Chest PA mean density: <record>.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 9: The control pane — kVp, mAs, SID, AEC

**Files:**
- Modify: `outputs/radiography-study-studio.html:266-320`
- Modify: `outputs/study/what-is-under.js:86-170`
- Modify: `outputs/studio/live-physiology.js` (`setXrayExposure` → the new setters)
- Modify: `outputs/app.css` (near `.xray-exp`, line 630)

- [ ] **Step 1: Replace the exposure control in the markup**

In `outputs/radiography-study-studio.html`, replace the `<label class="xray-exp">`
block at lines 270-273 with:

```html
                <label class="xray-exp"><span>kVp</span>
                  <input type="range" id="xrayKvp" min="50" max="125" value="75" step="1" aria-label="Tube voltage in kVp">
                  <span class="mono" id="xrayKvpRead">75 kVp</span>
                </label>
                <label class="xray-exp"><span>mAs</span>
                  <input type="range" id="xrayMas" min="1" max="80" value="10" step="1" aria-label="Tube current time product in mAs">
                  <span class="mono" id="xrayMasRead">10 mAs</span>
                </label>
                <label class="xray-exp"><span>AEC</span>
                  <input type="checkbox" id="xrayAec" checked aria-label="Automatic exposure control">
                  <span class="mono" id="xrayAecRead">on</span>
                </label>
```

- [ ] **Step 2: Rewrite the explanatory copy**

The `.xray-note` block at lines 302-319 makes three claims that this work has
made false — "the coefficients are relative", "no kVp, no mAs", and "cortex and
marrow do not differ". Replace its first two paragraphs with:

```html
                <strong>Simulated projection, not a radiograph.</strong> Each ray's path through material is
                measured in centimetres and attenuated by Beer&ndash;Lambert, using mass attenuation coefficients
                from the NIST tables at the effective energy your kVp implies. Bone is bright because the ray
                spent longer in bone. The beam diverges from a point at a set source-to-image distance, which
                is what makes <strong>PA</strong> and <strong>AP</strong> genuinely differ here.
                <br><br>
                <strong>kVp changes contrast; mAs changes density and noise.</strong> Bone attenuates 8.8&times;
                soft tissue at 50&nbsp;kVp and 3.4&times; at 125&nbsp;kVp &mdash; that ratio is subject contrast,
                and it is why kVp is a contrast control. mAs and distance set how many photons arrive, so the
                grain is quantum mottle at 1/&radic;N and moving the camera really is changing your SID. AEC
                compensates so an accidental drag does not black out the pane; switch it off to watch the
                inverse square law act.
                <br><br>
                <strong>What it still is not.</strong> A single effective energy stands in for a whole spectrum,
                so there is no beam hardening. There is no scatter, no grid, no anode heel effect and no
                pathology. Cortical thickness is uniform at 2&nbsp;mm, so a rib is drawn with a femur's cortex.
                Vessels and nerves are absent from the beam on purpose &mdash; a plain film cannot see them
                without contrast.
                <br><br>
                <span class="xray-appa-lab">Coefficients are NIST/ICRU reference data, not your course sources</span>
```

- [ ] **Step 3: Replace the setters**

In `live-physiology.js`, delete `setXrayExposure` and add:

```js
/* Changing kVp changes every coefficient, so the shared materials are rebuilt. */
export function setXrayKvp(kvp){
  const x=state.xray; if(!x)return;
  x.kvp=kvp;
  x.shared.forEach((m)=>m.dispose());
  x.shared.clear();
  x.mats.forEach((_orig,mesh)=>{
    const key=mesh.userData.xrayKey;
    mesh.material=sharedFor(key);
  });
  applyBeam();
}
export function setXrayMas(mAs){ const x=state.xray; if(!x)return; x.mAs=mAs; applyBeam(); }
export function setXrayAec(on){ const x=state.xray; if(!x)return; x.aec=!!on; applyBeam(); }

/*
 * mAs and SID set the fluence; the window and the mottle both follow from it.
 * With AEC on the fluence is held at its reference value, so the film stays
 * readable while the camera moves -- and the readout still shows what mAs the
 * compensation is spending, because a control that silently corrects is a
 * control that teaches nothing.
 */
function applyBeam(){
  const x=state.xray; if(!x)return;
  const sidCm=x.sidCm||REF_SID_CM;
  const effMas=x.aec?REF_MAS*(sidCm/REF_SID_CM)**2:x.mAs;
  x.effMas=effMas;
  x.postMat.uniforms.uSigma.value=mottleSigma({mAs:effMas,sidCm});
  x.postMat.uniforms.uWinLo.value=x.win.lo;
  x.postMat.uniforms.uWinHi.value=x.win.hi;
}
```

`setXrayKvp` calls `sharedFor`, so the `shared` closure written inside
`enterXray` in Tasks 6 and 7 has to become a module-level function. Delete it
from `enterXray` and add, next to `xrayDepthMaterial`:

```js
/*
 * The material for one layer, at the CURRENT kVp.
 *
 * Module-level rather than a closure inside enterXray because setXrayKvp has
 * to rebuild every one of these: mu depends on kVp, so a cache built at 75
 * is wrong at 110. Mutating uMu on the materials you happen to hold and
 * leaving the rest is the bug this shape prevents -- it produces a film where
 * some tissues moved with the slider and some did not, which looks like a
 * rendering quirk rather than like a mistake.
 */
function sharedFor(key){
  const x=state.xray; if(!x)return null;
  if(!x.shared.has(key)){
    const THREE=state.THREE;
    const tissue=XRAY_TISSUE[key]||'soft';
    const isBone=tissue==='bone';
    const bulk=isBone?mu('marrow',x.kvp):mu(tissue,x.kvp);
    const shell=isBone?(mu('bone',x.kvp)-mu('marrow',x.kvp))*CORTEX_CM:0;
    x.shared.set(key,xrayDepthMaterial(THREE,bulk,CM_PER_UNIT,shell));
  }
  return x.shared.get(key);
}
```

In `enterXray`, the `apply` helper then reads:

```js
  const apply=(mesh,key)=>{state.xray.mats.set(mesh,mesh.material);mesh.material=sharedFor(key);mesh.userData.xrayKey=key};
```

Note the ordering trap: `sharedFor` reads `state.xray`, so the `state.xray={...}`
literal must be assigned **before** the first `apply` call. It already is.

Replace `exposure:1.6` in the `state.xray` literal with:

```js
    kvp:75, mAs:10, aec:true, sidCm:REF_SID_CM, effMas:REF_MAS,
    win:{...DEFAULT_WINDOW},
```

And in `renderXray`, where `sid` is already computed for the readout, record it
so `applyBeam` can use it — immediately after `const sid=Math.round(...)`:

```js
  /* Dollying really is changing the SID, so the beam has to know. */
  if(sid!==x.sidCm){ x.sidCm=sid; applyBeam(); }
```

Extend the `stageMeta` line in `renderXray` to show what the beam is doing:

```js
    const aec=x.aec?` · AEC ${Math.round(x.effMas)} mAs`:'';
    els.stageMeta.textContent=`${R.label} · ${proj} · SID ${sid} cm · ${x.kvp} kVp · ${x.mAs} mAs${aec} · simulated · tap to name`;
```

Change the bridge in `visualisation-modes.js:286` from `xrayExposure` to
`xrayKvp:(v)=>setXrayKvp(v)`, `xrayMas:(v)=>setXrayMas(v)`,
`xrayAec:(v)=>setXrayAec(v)`.

- [ ] **Step 4: Wire the pane**

In `what-is-under.js`, replace the `xrayExposure` wiring in `openViewer`
(lines 158-166) with:

```js
  const wire = (id, readId, fmt, call) => {
    const el = $$(id);
    if (!el || el.dataset.wired) return;
    el.dataset.wired = '1';
    const push = () => {
      const v = el.type === 'checkbox' ? el.checked : +el.value;
      $$(readId).textContent = fmt(v);
      if (window.__osteo && window.__osteo.inXray()) call(v);
    };
    el.oninput = push; el.onchange = push;
  };
  wire('xrayKvp', 'xrayKvpRead', (v) => `${v} kVp`, (v) => window.__osteo.xrayKvp(v));
  wire('xrayMas', 'xrayMasRead', (v) => `${v} mAs`, (v) => window.__osteo.xrayMas(v));
  wire('xrayAec', 'xrayAecRead', (v) => (v ? 'on' : 'off'), (v) => window.__osteo.xrayAec(v));
```

And in `enterProjection`, replace the `xrayExposure` line with:

```js
  window.__osteo.xrayKvp(+$$('xrayKvp').value);
  window.__osteo.xrayMas(+$$('xrayMas').value);
  window.__osteo.xrayAec($$('xrayAec').checked);
```

Also delete the now-false comment block at `what-is-under.js:74-85` — it
records the misdiagnosis this change corrects — and replace it with a pointer
to `enterXray`'s new note.

- [ ] **Step 5: Style the checkbox**

In `outputs/app.css` near line 630, add:

```css
.xray-exp input[type=checkbox]{width:16px;height:16px;accent-color:var(--teal)}
```

- [ ] **Step 6: Verify**

```bash
node work/load-check.mjs
node work/binding-check.mjs
node work/bridge-check.mjs
node work/text-size-check.mjs
node work/ui-strings.mjs
```

`text-size-check` is required because the pane copy changed; `ui-strings` is a
baseline and will report the new sentences — review that the diff is only the
strings you intended, then update the baseline in Task 10.

- [ ] **Step 7: Drive it in the browser**

Reload. Expected, all on Chest / PA:
- kVp 50 → high contrast, bone very white against near-black soft tissue
- kVp 125 → flat and grey, bones much closer to the tissue around them
- mAs 1 → visibly grainy; mAs 80 → clean
- AEC off, dolly out → the film darkens; AEC on → it holds and the readout moves

- [ ] **Step 8: Commit**

```bash
git add outputs/radiography-study-studio.html outputs/study/what-is-under.js outputs/studio/live-physiology.js outputs/studio/visualisation-modes.js outputs/app.css
git commit -m "feat(projection): kVp and mAs, as separate controls

One Exposure slider conflated the two things a radiographer actually sets.
kVp now moves the coefficients and therefore contrast; mAs and SID move the
fluence and therefore density and mottle. AEC on by default so a stray drag
does not black the pane, with the spent mAs still on screen.

Also retires the note in what-is-under.js that blamed the coefficients for
the fog. It was double counting.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 10: Regenerate, sweep, and land

**Files:**
- Modify: `docs/CODEMAP.md`, `docs/DATA-INDEX.md`, `work/baselines/*`
- Modify: `CLAUDE.md`, `docs/TRAPS.md`

**The collision this task exists to handle:** another session left
`docs/CODEMAP.md`, `docs/DATA-INDEX.md`, `work/source-text.json`,
`work/baselines/corpus-snapshot.txt`, `outputs/sw.js`, `outputs/schedule.js` and
four corpus files modified. Regenerating sweeps their unfinished work into your
commit and can paper over a check that is red for their reasons.

- [ ] **Step 1: Establish what is theirs**

```bash
git status --porcelain
git stash list
```

If those files are still dirty and not yours, **stop and ask the user** whether
that work is abandoned or in flight. Do not regenerate over it. If it has since
been committed or reverted, continue.

- [ ] **Step 2: Regenerate the generated docs**

```bash
node work/codemap.mjs
node work/data-index.mjs
```

- [ ] **Step 3: Run the full after-every-edit sweep**

```bash
node work/load-check.mjs
node work/syntax-check.mjs
node work/verify-modules.mjs
node work/shell-check.mjs
node work/binding-check.mjs
node work/bridge-check.mjs
node work/radiography-check.mjs
node work/codemap-check.mjs
node work/data-index-check.mjs
node work/text-size-check.mjs
node work/separation-check.mjs
node work/cut-level-check.mjs
node work/system-check.mjs
node work/search-probe.mjs
```

Expected: all pass. `separation-check` and `cut-level-check` matter here
because `enterXray` still calls `setSeparation(0)` and still empties
`renderer.clippingPlanes` — both behaviours must survive this refactor, and
both have their own reasons recorded in the code.

- [ ] **Step 4: Update the baselines**

```bash
node work/baseline.mjs --check
```

Review the diff. Only `ui-strings` should move, and only by the pane copy you
wrote in Task 9. If `corpus-snapshot` moved, that is the other session's work
and must not be committed here. Then:

```bash
node work/baseline.mjs --update
```

- [ ] **Step 5: Record the traps**

Add to `docs/TRAPS.md`, under a new `outputs/radiography.js` heading:

- The tau window is a *log* window because tau is already `-ln(T)`. Anyone
  "fixing" it back to `1 - exp(-tau)` will collapse a 100:1 chest to white.
- `mu` depends on kVp, so `setXrayKvp` must dispose and rebuild every shared
  material. Mutating `uMu` on a cached material and forgetting the others
  produces a film where some tissues moved and some did not.
- The shell term is added on **both** faces, unsigned, while the bulk term is
  signed. Signing the shell term makes it cancel and the cortex vanishes.
- NIST's ICRU-44 lung density is 1.05 (parenchyma). Using it instead of
  ICRU-46's 0.26 makes lung fields as dense as mediastinum and the chest
  unreadable — and looks like a plausible number from a plausible page.
- **The display curve exists twice**: `filmDensity()` in `radiography.js` and
  the same clamp inlined in `XRAY_POST_FRAG`, because GLSL cannot import. The
  check tests the module, so the shader can drift from it silently and nothing
  fails. If you change one, change both — and the comment in each says so.
- `setXrayKvp` disposes and rebuilds every shared material. It has to: `mu`
  depends on kVp, so a cache built at 75 kVp is wrong at 110.

- [ ] **Step 6: Add the new checks to CLAUDE.md**

In the "After every edit" block, after `node work/exam-check.mjs`, add:

```
node work/radiography-check.mjs # REQUIRED for outputs/radiography.js and for
                                 # the projection shaders — every constant the
                                 # film is made of is a published number, and a
                                 # wrong one produces a plausible image rather
                                 # than an error
```

And add `radiography.js` to the `outputs/` data-module table with
"NIST/ICRU attenuation constants and the beam's geometry. Pure."

- [ ] **Step 7: Final commit**

```bash
git add docs/CODEMAP.md docs/DATA-INDEX.md docs/TRAPS.md CLAUDE.md work/baselines
git commit -m "docs(projection): map, traps and the check that guards them

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

- [ ] **Step 8: Do not push without asking**

`master` auto-deploys `outputs/` on push. This is a shell change across nine
files with another session's work in the tree. Confirm with the user first.

---

## What this plan does not do

Named projections, central-ray angulation, the collimator and its field
borders, L/R markers, scatter and grid, anode heel effect, and image critique
against acceptance criteria are all **part B**, and part B is blocked until
`CLARK_S_POSITIONING_IN_RADIOGRAPHY.pdf`, `X-Ray_Patient_Positioning_Manual_2008.pdf`
and the Additional Views handout have been through
`unread-manifest → handoff-export → verify-notes` and registered in
`SOURCE_FILES`. Beam spectra, beam hardening and Monte Carlo scatter are out of
scope entirely.
