# Piece 4 — peristalsis along tubes

Status: draft. Depends on 0. Parent: [decomposition](2026-09-09-physiology-decomposition.md).

## Discovery and path representation

Begin with a small curated set of interpretable ureter/oesophagus segments before
attempting complex bowel geometry. Reuse transmissionField's welded triangle graph
and component diagnostics, but do not equate surface distance with a tube centreline.
An intersecting/fused mesh may contain shortcuts; disconnected components have no
automatic upstream/downstream ordering.

Each accepted profile needs path progress, local centre, tangent/radial coordinates,
component identity and the derivative data needed by its deformation. Curated control
points and ordered component connections require model/source justification. For an
ambiguous bowel mesh, retain the existing illustrative animation and record why the
curved profile was rejected. No promise of universal small-intestine topology recovery.

## Change and artifact delivery

Generate immutable route data offline under piece 0's hashes, identity contract and
budgets. Proposed files: work/build-physiology-paths.mjs, a curated route-definition
file, and per-layer payloads under outputs/assets/physiology/. Exact encoding follows
the measured 0A format contract. Load with the associated layer; mismatch, missing
payload or decoding error keeps the old shader path without interrupting the viewer.

Advance a smooth constriction along path progress and contract around the local tube
centre/direction. Include curvature and spatial-field derivatives when deriving normals.
Do not merely replace rssAlong with pathParam while retaining the global radial vector:
that would still squeeze bends around the wrong axis. Taper at segment boundaries and
define explicit phase offsets for justified connected components.

## Evidence and acceptance

Synthetic straight, U-shaped, S-shaped and disconnected tubes establish known order
and radial behaviour. Include welded UV seams, nonuniform tessellation, branching,
accidental shortcuts and degenerate segments. Require downstream sample monotonicity
along the chosen route, not global vertex-array order or world Y. Require finite
gradients and exact zero-amplitude identity; compare normals to deformed surface tangents.

Real-GLB tests resolve curated names and validate the chosen route against ordered
landmarks. A rejected topology is an explicit fallback result, not a passing anatomical
path test. Browser checks show a wave traversing a bend without jumping across adjacent
loops. Test cache mismatch and offline availability, plus the parent gates.

## Honesty and handoff

Find the supplied GI/urinary pages that support direction and mechanism before adding
claim-level citations. Rate, wave width and amplitude are display parameters unless
the source specifies them. Do not infer a digestive tract sequence from coordinate
height. Piece 5 inherits the artifact loader, graph diagnostics, hash checks and
performance evidence; it need not use tube radial deformation to display light.
