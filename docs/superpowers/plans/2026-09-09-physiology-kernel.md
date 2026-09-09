# Physiology kernel implementation plan

**Goal:** Deliver piece 0A without changing existing motion or GLSL deformation.
**Architecture:** Pure derivation consumes local-space positions or explicit rest
bounds plus rule/context. Three.js retains coordinate conversion and uniform upload.
Actual injected GLSL is tested through WebGL2 transform feedback, before and after.
**Tech stack:** Vanilla ES modules, Node assertions, existing GLB decoder, WebGL2.
**Spec:** ../specs/2026-09-09-physiology-0-kernel.md

## Constraints

- GPU-only deformation; no runtime geometry or transform mutation.
- Preserve current formulas, defaults, operation order and activity coverage.
- Scope is 0A; reduced-motion default changes are the separate 0B step.
- Use this isolated checkout; do not absorb concurrent lesson work.

## Tasks

- [x] Capture actual old shader uniforms and transformed position/normal samples
  for real deforming meshes in work/physiology-shape-browser-check.js. Include
  zero-amplitude position identity and characterised normal renormalisation,
  with unchanged rest geometry/bounds.
- [x] Write work/physiology-shape-check.mjs with legacy oracle, real meshes and
  synthetic edge cases; observe failure before adding physiology-shape.js.
- [x] Implement deriveShape({positions,bounds,rule,context}) and replace only
  derivation in installFlow. Keep diaphragm local-up/shared centre in adapter.
- [x] Compare GPU captures on the same browser/driver; run mechanics and UI checks.
- [x] Profile path candidates and record offline artifact contract and limits.
- [x] Bump SW/register module, update codemap, verify measurement and shell gates,
  and record results. Commit only this isolated deliverable after review.

Results and the pre-existing corpus-baseline exception are recorded in
../notes/2026-09-09-physiology-kernel-evidence.md. Reduced-motion 0B remains separate.
