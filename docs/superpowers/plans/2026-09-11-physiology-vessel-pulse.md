# Arterial pulse — implementation plan

**Goal:** A travelling radial pulse wave along the curated arterial routes,
replacing the uniform 6% inflate; veins unchanged.
**Architecture:** Third route kind `pulse` (PATH_ATTRIBUTES frame per vertex) under
a new middle gate `derivePulseRoute` — the glow gate's refusals plus the
deformation protections re-added at swell-argued thresholds the 2.94-calibre arch
passes; outward swell = the constriction map with opposite sign, normals via the
same inverse transpose; crest timing from the existing `pulse` circuit mode.
**Tech stack:** Vanilla ES modules, Node assertions, WebGL2 transform feedback,
offline generator. **Spec:** ../specs/2026-09-11-physiology-vessel-pulse.md

## Constraints

- GPU-only; rest pose bit-exact at zero amplitude. No taper at route ends; join
  continuity is a measured gate assertion.
- Route set changes only through named refusals; no threshold loosened to admit a
  case. Payload budget profiled before committing.
- Distal falloff, depth and sharpness are labelled display parameters.
- Isolated from the heart piece and from any concurrent tree work.

## Tasks

- [ ] Gate: add `derivePulseRoute` to physiology-path.js — shared progressField
  and glow refusals, re-added `route-shorter-than-its-calibre`,
  `route-self-adjacent`, `not-a-tube-about-this-path`, `degenerate-frame` at
  swell-argued thresholds; write each new threshold's justification in the gate.
  Extend physiology-path-check.mjs: synthetic cases, the measured arch numbers,
  and both older gates unchanged on the same inputs.
- [ ] Discovery: run all 21 arterial routes through the gate; record passes and
  refusals BY NAME; profile the pulse payload size against the 1 MiB/layer budget
  in ../notes/2026-09-11-physiology-pulse-evidence.md; measure chained-join
  centre/calibre steps and set the join-mismatch tolerance.
- [ ] Generator: emit the `pulse` kind in work/build-physiology-paths.mjs (new
  kind gates in loadPathRoutes follow); run `--write`; confirm
  physiology-path-model-check byte-for-byte passes.
- [ ] Deformation: outward-swell map (shared JS reference + reuse of the path
  machinery) with distal amplitude falloff; extend physiology-path-deform-check
  (central-difference Jacobian, zero-amplitude identity) and
  physiology-path-browser-check.js (pulse kind: geometry moves with phase, normals
  follow; glow kinds keep the light-not-geometry assertion).
- [ ] live-physiology.js: pulse routes bind PATH_ATTRIBUTES and the expansion map;
  arterial/pulmArtery lose `mode:'inflate'`; non-route arteries keep the glow
  alone; legend `says` wording updated and tagged as display; ui-strings baseline
  refreshed if shown sentences change.
- [ ] Acceptance: join-mismatch assertion green at full amplitude; performance
  comparison vs master within the 10% p95 budget; after-every-edit set, shell,
  CACHE_VERSION bump, TRAPS.md Routes section gains the new traps. Real Chrome:
  screenshot the wave partway along the aortic chain with the distal falloff
  visible. Update README/CODEMAP/CLAUDE.md and the decomposition row; record any
  rejected approach in the evidence note. Commit only this piece.
