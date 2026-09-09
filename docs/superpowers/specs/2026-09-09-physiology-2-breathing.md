# Piece 2 — breathing shape and respiratory coupling

Status: draft. Depends on 0. Parent: [decomposition](2026-09-09-physiology-decomposition.md).

## Change

Use the existing shared breath clock to coordinate a weighted diaphragm descent with
directional lung expansion. Establish a shared anatomical coordinate system per lung;
evaluate all lobes in that same field so a per-lobe centre cannot open their seams.
Define a hilum constraint only after the model and supplied sources identify a defensible
anchor region. An inferred geometric anchor must be labelled illustrative.

Diaphragm central/rim weights and lung anisotropy live in the pure shape module.
Both modes ship displacement and full normal derivatives together, including spatial
tether gradients. Preserve normal direction for the legacy uniform-scale fallback.
Do not offset the lungs or diaphragm by CPU object transforms.

## Coupling as a separately observable change

Venous and lymphatic cues currently use the same elapsed clock but independent
envelopes. After verifying the respiratory-pump claim in supplied course material,
apply a small bounded breath modulation to appropriate return-flow activity.
Keep a nonzero baseline; respiration must not appear to be the sole source of return
or to stop lymph flow during part of the cycle. Node brightness is a display cue,
not a measurement of flow through a node.

Specify the affected venous regions and modulation phase from the source; do not
modulate every vein identically just because it has the venous class. Record exact
gain and phase parameters as illustrative where no source quantifies them. Review
coupling independently from the shape change so a failure can be isolated.

## Evidence and acceptance

Verify shared lobe coordinates, rest identity, finite positive Jacobians and normal
agreement with finite differences. Once the hilum/apex fixture is validated, assert
lower displacement in the tethered region; do not label an arbitrary central vertex
the hilum to satisfy a test. Measure seam displacement between known corresponding
boundaries rather than requiring touching surfaces everywhere.

Compare whole cycles with fixed camera/light from front, side and oblique angles.
Check diaphragm rim behaviour and lung seams in a translucent diagnostic view as well
as normal rendering. Coupling tests assert bounded amplitude, a nonzero floor, correct
phase and unchanged baseline when disabled. Test tap labels at extreme displacement.
Apply the parent's measurement, interaction and performance gates.

Source lead: phys.3 pp.21–24 plus the supplied thorax/respiratory teaching material.
These are discovery leads, not validated citations for anisotropy, hilum tethering or
venous/lymph coupling. Extend MECHANISM_SOURCES only after checking the claim itself.

## Explicit ribcage decision

Rib motion is deferred. GPU-only deformation could preserve CPU measurements, so it
is not technically prohibited by the rest-pose contract. Adding it needs a separate
decision on joint axes, sternum/costal cartilage coordination, label/pick alignment
and how displayed motion relates to static cavity boundaries. This piece neither
animates bone nor silently treats the existing static cage as a complete thorax model.
