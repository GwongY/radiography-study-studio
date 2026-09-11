# Piece 3 — cardiac boundaries

Status: DONE — by a different route than this page describes. The collar attempt was rejected (narrowed chamber-wall gaps, worsened valve-leaflet overlap); papillary motion landed (`5b5355c`); the constrained restart — a shared proximity tether, after the axial-plane mask failed at the discovery gate — landed 2026-09-11: [constrained spec](2026-09-11-physiology-3-heart-constrained.md), [evidence](../notes/2026-09-11-physiology-heart-evidence.md). Depends on 0. Parent: [decomposition](2026-09-09-physiology-decomposition.md).

## Problem and discovery gate

Chambers deform independently; the generic heart class has no deformation mode, and
the arterial outflow uses another envelope. This creates a risk of visible gaps, but
the existence and size of each seam must be measured on the real meshes. A class-name
match is not evidence that an entire supporting surface should contract like a chamber.

Inventory chambers, relevant surface structures and outflow mesh regions. Identify
which boundaries correspond anatomically and whether their meshes are already separated
at rest. Record rest gaps before measuring animation-induced changes. Curate a limited
set of boundary masks; never pair surfaces by proximity alone across the whole heart.

## Change

Keep the established atrial/ventricular order. Use shared anatomical-space deformation
fields where corresponding boundaries need consistent displacement. Blend regional
influences using smooth masks; include mask derivatives in the normal transform.
Make the proximal outflow boundary follow its validated attachment and taper that
influence into the ordinary vessel representation. Distinguish a material activity
envelope from a displacement envelope so a glow change cannot move a junction.

Supporting heart surfaces receive only anatomically justified following motion.
Do not assign all pericardial, valvular and conducting structures the ventricle's
contraction amplitude, or imply they actively contract. If the model cannot support a
boundary profile, retain its old illustrative behaviour and report the unresolved seam.

## Evidence and acceptance

Pure tests cover partition weights, exact rest identity, bounded positive Jacobians,
normal finite differences and continuous temporal transitions. For each validated
boundary pair, compare rest separation with full-cycle separation and set a model-scale
tolerance before tuning the profile. Reject a fix that closes one seam by creating
another collision. Use volume checks only for surfaces proven suitable for that measure.

Browser validation includes close-up front/oblique views at rest, atrial peak,
ventricular peak and relaxation. Verify outflow attachment, surface shading and labels.
Run the parent's invariant and performance gates and existing cardiac-order tests.

Source lead: phys.2 pages already listed in MECHANISM_SOURCES establish a starting
point for timing. Boundary mechanics require separate claim-level verification from
the supplied sources. Surface-following weights and amplitudes remain explicitly
illustrative unless supported. No new valve rig, fibre model, fluid solver or CPU motion.
