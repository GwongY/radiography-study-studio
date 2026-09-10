# Heart, constrained — implementation plan

**Goal:** Retire the piece-3 rejection with a tethered-annulus chamber contraction
and the taught valve-state glow cue; no new motion anywhere near a seam.
**Architecture:** Masked contraction map (value and derivative zero at the derived
valve plane) written once as a `physiology-shape.js` reference + shared GLSL block
on the `MUSCLE_SHAPE_GLSL` pattern; papillary muscles keep sharing the ventricle's
one field, now carrying the annulus height through the existing world→local path.
**Tech stack:** Vanilla ES modules, Node assertions, WebGL2 transform feedback.
**Spec:** ../specs/2026-09-11-physiology-3-heart-constrained.md

## Constraints

- GPU-only; no CPU position/normal/buffer/transform animation. Rest pose bit-exact
  at zero amplitude.
- Envelopes, rates and the atrial→ventricular order unchanged. No valve rig. No
  atrial filling (deferred, recorded in the spec).
- Pure derivation stays in `physiology-shape.js` (no three.js, no DOM).
- Isolated from the vessel-pulse piece and from any concurrent tree work.

## Tasks

- [ ] Discovery: measure rest gaps chamber↔leaflet and chamber↔great-vessel on the
  real GLB; measure full-cycle separation under the CURRENT affine map and record
  any existing penetration; derive each ventricle's valve plane from the named
  leaflet meshes and record plane, tolerance and fallback in
  ../notes/2026-09-11-physiology-heart-evidence.md.
- [ ] Add the mask + map reference (value, derivative, Jacobian) and its shared
  GLSL block to physiology-shape.js; work/physiology-shape-check.mjs gains the
  annulus identity cases, the central-difference Jacobian case and rest identity.
  Observe failure before wiring.
- [ ] Replace the inline `uMode 5` branch in live-physiology.js with the shared
  block; extend installLayerFlow's flowPumpShape path with the annulus height;
  extend work/physiology-shape-browser-check.js with the chamber mode;
  physiology-papillary-browser-check.js must stay green.
- [ ] Add the per-group valve-state glow gating in physiology.js (phase helpers
  only) and live-physiology.js; partition the static heart class by the model's
  own names; update the heart class `says` wording; run ui-strings and corpus
  baselines if any shown sentence changes.
- [ ] Overlap acceptance: every measured pair full-cycle separation ≥ rest
  separation and ≥ the current map's worst case, within the discovery tolerance.
- [ ] Full gates: after-every-edit set, physiology-mechanics-check, separation,
  shell, CACHE_VERSION bump, codemap if banners moved. Real Chrome: mid-systole
  front/oblique screenshot with the leaflets highlighted. Update piece-3 status
  here, in the decomposition, in CLAUDE.md and outputs/README.md; record any
  rejected approach the way the collar was recorded. Commit only this piece.
