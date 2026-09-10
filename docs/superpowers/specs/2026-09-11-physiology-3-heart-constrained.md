# Piece 3 — heart, constrained: tethered-annulus contraction and the valve-state cue

Status: PROPOSED — replaces the rejected boundary-deformation approach; not started.
Depends on 0. Parent: [decomposition](2026-09-09-physiology-decomposition.md).
Companion piece: the arterial pulse is deliberately NOT here — it is specified
separately in [2026-09-11-physiology-vessel-pulse.md](2026-09-11-physiology-vessel-pulse.md)
so this piece can land while the vessel gate is still being argued.

## What the rejection was, and what this piece does differently

The one earlier attempt at regional boundary deformation (a cardiac collar /
attachment profile, on a since-deleted branch) narrowed the chamber-wall gaps but
worsened valve-leaflet overlap. The mechanism, read off the code that did land: the
chambers contract as a whole mesh toward their bounding-box centres, which carries
the valve-annulus region of the chamber wall with it; the valve leaflets are static
(the `heart` class is deliberately not animated — no valve rig), so any wall
displacement near the annulus can only lose. The collar added regional displacement
near the junctions and raised the penetration.

The contrast that landed is 5b5355c: it removed differential motion (the papillary
muscles share the ventricle's one affine field; a positive affine map shared by two
surfaces cannot introduce an intersection between them). This piece keeps that
lesson: no new independent displacement is added anywhere near a seam.

## Problem and discovery gate

The current pump mode (`uMode 5`) pulls every ventricular and atrial vertex toward
the chamber centre, including the annulus. Before changing anything, measure on the
real meshes, at rest and at the current full amplitude:

- The rest gap between each chamber wall and every static mesh it adjoins — the
  named AV and semilunar leaflets, and the proximal great vessels.
- The full-cycle separation under the CURRENT affine contraction. If the present
  map already penetrates a leaflet at some phase, record it; the tethered map is
  then required to be no worse everywhere, not merely better on average.

Derive the valve plane per ventricle from the model, not from constants. The named
leaflet meshes give an annulus height along the ventricle's own axis; the derived
plane, its tolerance and its fallback (if a ventricle has no adjacent named leaflet
mesh) are recorded in the evidence note. Fallback keeps the existing behaviour and
reports the unresolved seam, per the parent spec.

Atrial filling (expansion during ventricular systole) is out of scope and recorded
as deferred: only implicitly taught (end-diastolic volume, phys.2 p62), and it adds
a second moving surface beside the leaflets.

## Change

Two changes, both timed by the existing envelopes. No new timing, no new rates.

**1. Tethered-annulus contraction.** Keep the volume-reducing chamber contraction
but weight it by axial position so displacement AND its axial derivative reach
exactly zero at the derived valve plane, peaking mid-wall and apex. Precedent is in
this codebase twice: the diaphragm's rim tether (`deformBreathing`'s smoothstep
weight, whose derivative structure is already carried in its normal transform) and
the muscle profile's cubic end weight, which reaches zero value and zero derivative
at both ends. The mask is a function of the same axial coordinate the pump mode
already uses, so the chamber axis, centre and length derivation is unchanged.

The four papillary muscles keep sharing their ventricle's field — the SAME masked
map, converted through the existing world→local flowPumpShape path (which must now
carry the annulus height as well). Sharing the field is what guarantees no new
papillary–ventricle intersection; the mask is zero at the annulus and large at the
apex where the papillary muscles sit, so their motion is preserved, not damped.

The map and its derivative are written once, as a reference function in
`physiology-shape.js` plus one shared GLSL block exported beside it, on the
`MUSCLE_SHAPE_GLSL` pattern: the position patch and the inverse-transpose normal
patch call the same block, so the two halves cannot drift. The mask derivative is
included in the Jacobian — a weighted map whose spatial weights are treated as
constants lights a normal field that does not match the surface. At zero amplitude
the shader returns position and normal unchanged, bit for bit.

The inline `uMode 5` branch in live-physiology.js is replaced by the shared block.
New deformation/reference functions are added by the piece that changes the mode,
per the kernel spec's own rule.

**2. The valve-state cue.** phys.2 pp36–39 teach the state table the geometry can
never show: relaxed ventricles = AV valves open, semilunar closed; contracting
ventricles = AV closed, semilunar open. The static leaflet meshes currently glow
with one undifferentiated cardiac pulse. Each leaflet group's glow is instead gated
to its taught state — AV leaflets lit during relaxation, semilunar leaflets lit
during ejection — using the existing phase helpers in physiology.js. Nothing moves.
The two AV leaflet states are cited; the leaflets' own shape is not claimed to open
or close, and the legend/`says` text says so in the established wording.

Partition of the static `heart` class into leaflet groups is by the model's own
names (`semilunar`, `atrioventricular`), inventoried in the discovery gate. A
static heart mesh no name partitions (septum, conducting tissue) keeps the existing
cue.

## Evidence and acceptance

- Pure checks: the mask reaches exactly 0 in value and derivative at the annulus
  and at the apex fallback; the map's Jacobian against a central difference of the
  map itself; rest identity at zero amplitude; the envelope order unchanged.
- Browser: the chamber mode joins `physiology-shape-browser-check.js`'s
  transform-feedback comparison (GPU positions/normals against the reference map
  at several amplitudes), and `physiology-papillary-browser-check.js` stays green —
  the papillary pairs still share the ventricle's field bit for bit.
- Overlap: for every measured chamber/leaflet pair, full-cycle separation ≥ rest
  separation within the tolerance set in the discovery gate, and ≥ the CURRENT
  map's worst case. A fix that closes one seam by opening another is rejected, per
  the parent spec.
- Interaction: tapping and labels still resolve at motion extremes (deformation
  does not move CPU raycast surfaces — assert, don't assume).
- After-every-edit set, `physiology-mechanics-check`, shell + `CACHE_VERSION`
  bump, codemap if banners move. Verify in real Chrome (the Browser pane freezes
  `requestAnimationFrame`); screenshot the heart mid-systole front/oblique with the
  leaflets highlighted, showing the still annulus and the contracting free wall.
- Every claim carries its page: valve states → phys.2 pp36–39; papillary timing →
  p35/p51; atrial-then-ventricular order → p61 (already shipped). The annulus
  plane, mask shape and amplitudes are illustrative geometry, labelled as such.

## Rejection record

Any approach tried and rejected in this piece is recorded in the piece-3 status
line and the evidence note the way the collar was: what it was, what it narrowed,
what it worsened — so the next session does not retry it.
