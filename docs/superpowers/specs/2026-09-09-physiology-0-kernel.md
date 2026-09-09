# Piece 0 — shape kernel, harness and path contract

Status: draft. Dependency: none. Parent: [decomposition](2026-09-09-physiology-decomposition.md).

## Problem and scope

installFlow derives axis, centre, length and amount in a closure mixed with material
setup. Node can test temporal envelopes but cannot exercise that derivation directly.
Extract it without changing existing motion. Accessibility is a separate 0B change.

## 0A: characterisation contract

Proposed outputs/physiology-shape.js is DOM-free and Three.js-free. Its input has
positions, optional triangle indices, the existing rule, and explicit context:
coordinate space, anatomical-up in that space, optional shared centre, and immutable
profile metadata. Vertices plus a rule alone cannot recover the current shared lung
centre or transformed diaphragm direction.

Return axis, centre, length, amount, mode and optional field data. Optional tether,
pathParam, componentId, local tube centre/tangent and their required gradient data
are capability-tagged; missing data is not represented by misleading zero arrays.
Use typed arrays where appropriate and document units and coordinate spaces.
Do not mutate input buffers. The adapter in live-physiology.js owns Three.js objects,
world/local conversion and attaching immutable GPU attributes.

Preserve operation order for the existing derivation and keep the existing GLSL
formulas unchanged in 0A. Add new deformation/reference functions only in the piece
that changes that mode. This avoids accidentally correcting normals during a
characterisation refactor.

Files proposed: outputs/physiology-shape.js, work/physiology-shape-check.mjs,
work/physiology-shape-browser-check.js, and a small adapter change in
outputs/studio/live-physiology.js. Register the new import in the shell.

## Geometry fixtures and equivalence

Use work/lib/mesh-names.mjs for layer/name/bounds correspondence and
work/glb-mesh.mjs for decoded positions and indices. The latter merges/transforms
geometry; explicitly compare a browser-loaded primitive against the fixture decoder
before claiming byte-order equivalence for generated attributes.

Tests cover every currently deforming mesh and degenerate synthetic cases. Capture
old derived scalars/vectors before extraction, then require exact equality when the
same numeric inputs/operation order apply. Separately bound float32 upload error.
Same-driver deterministic GPU samples must agree before/after extraction; avoid
cross-device screenshot byte equality as a portable contract.

The new harness must be capable of checking positions and normals from the actual
GLSL deformation, not only a separately handwritten CPU formula. Later pieces compare
GPU samples against a pure reference and finite-difference surface derivatives.
Zero-amplitude identity and immutable rest buffers are mandatory for every mode.

## Path decision delivered here

Adopt the curated offline artifact policy in the parent spec. In 0A, profile graph
cost and record per-candidate vertices, edges, components, runtime attribute order,
estimated artifact bytes and generator cost. Specify the payload format and reject
stale hashes. Do not switch existing paths or generate a broad vessel corpus yet.
Piece 4 implements and validates the first production payload under this contract.

## 0B: reduced-motion behaviour

Use the existing guarded prefersStill() helper when setting physiology's initial
state. With reduce requested, start static and keep the existing Live toggle usable
as an explicit opt-in for this page session. Without reduce, preserve today's default.
An OS preference change to reduce stops automatic motion; a later explicit Live click
can resume it. Switching back to no-preference does not unexpectedly start motion.
Do not confuse turntable state with physiology state or overwrite a user's Static choice.

Update the existing button state and accessible pressed state consistently. Test
preference absence, initial reduce, explicit opt-in, explicit off, and preference
changes. 0B has its own before/after expectation; it is not visually equivalent to 0A.

## Acceptance and handoff

0A passes existing mechanics and GPU checks, input immutability, derived-value parity,
rest bounds/cuts/separation/grid checks, import graph and shell checks. 0B passes the
preference state matrix and ordinary no-preference regression checks. No new anatomy
claims or baseline image changes are accepted in 0A. The handoff is a tested coordinate
contract, recorded route budgets and fixtures, not a declaration that later PCA or
tube algorithms already work on every model.
