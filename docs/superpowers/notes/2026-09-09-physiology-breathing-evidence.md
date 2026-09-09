# Breathing shape evidence — 2026-09-09

Piece 2A implemented on codex/physiology-kernel; not deployed.

- Each lung's lobes use a common world-up field and superior geometric reference.
  At full display amplitude: transverse scale 1.0325; longitudinal scale 1.07.
  These are illustrative gains, not measured strain or a hilum attachment.
  The reference is measured from the union of that lung's lobe bounds.
- Diaphragm retains its existing dome descent envelope, now with the derivative
  in its inverse-transpose normal transform. Zero-length fallback is guarded.
- Neither change writes CPU position/normal arrays, mesh/parent transforms or morphs.
- Existing rate, coverage and timing remain. Rib motion remains explicitly deferred.

Source inspection: phys.3 pp21-24 describes diaphragm depression, thoracic volume
increase and inhalation. hss.1.3 p21 identifies the lung root/hilum but does not provide
an attachment mask for this model. No such mask is claimed. phys.3 p28 supports the
respiratory pump aiding venous return but does not by itself validate a regional phase
assignment or lymphatic cue. Piece 2B coupling remains separate and unimplemented.

Checks:
- 1,936 Node derivative cases: max tangent-normal error 4.90e-8; minimum determinant
  .8154. Apex reference identity and inferior displacement verified for the field.
- Actual final GLSL: all 948 deforming meshes, 300,540 samples / five modes.
  8,320 breathing samples at 0,.2,.5,.8,1: max position/length error 3.57e-8;
  max normal component error 1.45e-7. Rest positions and CPU buffers unchanged.
- Same world point mapped through each lobe's local coordinates gives max shared
  field discrepancy 8.96e-16 left / 1.12e-16 right. This validates the shared field,
  not an anatomical claim that every lobe boundary touches at rest.
- Opaque and translucent diagnostic: 25-frame contraction/relaxation cycle from
  front/side/oblique. All six views changed visibly and returned pixel-exactly to rest.
  Rest/peak contact sheet inspected; no new visible lobe separation observed.
- Peak deformed-surface sample taps resolve labels for sartorius, long biceps head,
  and left superior lung lobe. This is a successful interaction sample, not GPU picking
  parity at every silhouette point; raycasting intentionally remains in rest geometry.
- Browser physiology and reported-regression checks pass (1,686 names, eight motor
  nerve paths, all 471 muscle / 497 nerve animations, 3/4 and 4/4 progress, tap labels,
  search alignment). No browser warning/error messages.
- Load/syntax/import/shell/binding, muscle/breathing/preference/mechanics, codemap pass.
  Baselines 11/12 pass; the pre-existing corpus snapshot mismatch remains untouched.
  Reviewed UI baseline difference contains only the guarded GLSL dome denominator.

Next: separately source and validate respiratory return cues; review heart shared
profiles and their normals; then tube fields and transmission. The full roadmap is
not complete, and none of these commits has been merged into master or deployed.
