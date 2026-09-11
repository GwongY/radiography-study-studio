# Heart, constrained — evidence note, 2026-09-11

Piece 3 landed: tethered chamber contraction under a shared proximity field, plus
the valve-state light cue. Spec:
[2026-09-11-physiology-3-heart-constrained.md](../specs/2026-09-11-physiology-3-heart-constrained.md).
Pure gate: `node work/physiology-heart-check.mjs`. Discovery tool:
`node work/physiology-heart-discovery.mjs`.

## What the discovery measurements changed in the design

The spec proposed an AXIAL tether — displacement and derivative zero at a valve
plane derived from the adjacent leaflets. The measurements on the real GLB
(dolasim.glb) refuted that shape and the spec was amended before implementation:

- The valve leaflets lie against the chamber walls over wide regions, not along a
  plane. In each ventricle's own frame the tricuspid leaflet body reaches 0.34 of
  the half-length apical of the RV bbox centre and the mitral leaflet body 0.22
  into the LV; the worst current-map shrink happens MID-CHAMBER (328–428 of ~500
  leaflet vertices shrink per pair), not at the annulus.
- Rest gaps are contact-scale: 0.0002–0.019 world units (body ≈ 1.7). The
  smallest (Right_ventricle ↔ Left_semilunar_leaflet 0.00028) are attachment
  seams, effectively touching at rest.
- The CURRENT whole-mesh contraction already eats most gaps: Right_atrium ↔
  Ascending_aorta 0.00119 → 0.00016 (−87%), Left_atrium ↔ Pulmonary_trunk
  0.00098 → 0.00023, Right_ventricle ↔ Right_semilunar_leaflet 0.00037 → 0.00013.
  Any new map had to beat these numbers, not just avoid new overlap.
- A single-plane anchor cannot protect leaflet bodies that reach deep apical
  without anchoring at the most apical leaflet contact — which leaves ~20% of
  the chamber contracting. Considered and rejected on the measurements.

So the mask is PER-VERTEX PROXIMITY to the measured static set: the 9 valve
leaflets plus every venous mesh adjacent (rest gap < 0.05) to a deforming heart
mesh. One field, w = smoothstep(dist/0.04) of the distance to that set, sampled
per vertex in each mesh's own local frame — so every deforming heart surface
(chambers and papillary muscles alike) moves under the SAME function of position,
which preserves the 5b5355c guarantee in its general form (a homeomorphism shared
by two surfaces cannot introduce an intersection between them, provided det J > 0
— sampled at 0.7163 minimum, fold margin 1.40x).

## The fold lesson

The first field (radius 0.02) was steep enough that the mask's own gradient could
fold the Jacobian (worst case a·|∇w|·λmax·|v| > 1 near the mask midpoint) —
the SAME mechanism that killed the boundary collar, reached by analysis instead
of by rendering. Radius 0.04 plus a gradient clamp
(0.6/(a_max·λ·max|v|), computed per mesh in the adapter and the check) bounds the
map to det > 0.7163 measured over 8 meshes × 3 amplitudes. The clamp is part of
the shipped field, so JS and GLSL sample identical values.

## Acceptance numbers (work/physiology-heart-check.mjs, all PASS)

- Characterisation: with the tether absent, `deformChamber` matches the inline
  uMode-5 map it replaced — 4038 vertices, position error exactly 0, normal
  error 1.1e-16.
- Rest identity at zero amplitude: bit for bit.
- Jacobian: all nine entries and the inverse-transpose normal against central
  differences of the map with the field re-evaluated per probe — 2.6e-9 / 1.1e-10.
- Determinants: min 0.7163 across 8 meshes (chambers + papillary), 3 amplitudes.
- ACCEPTANCE: 283 adjacent mover↔static pairs, 25 phases each, arterial
  neighbours held at their own worst-case swell: every pair's full-cycle minimum
  ≥ its rest gap (worst margin −1.2e-9 — float noise on a pair that touches at
  rest, Right_ventricle ↔ Superior_epigastric_veinsl, frozen) and ≥ the OLD
  map's own minimum (worst −9.6e-8, arithmetic noise).
- Papillary muscles: min tether weight 0.000–0.001 — their tips touch the
  tricuspid leaflets (chordae) and freeze there; their nearest-ventricle gaps
  over the cycle never exceed rest (max ratio 1.000000000), and the in-browser
  check reproduces the 5b5355c peak gaps to all digits
  (0.00811 / 0.00756 / 0.00736 / 0.00717).

## Valve-state cue

The 9 leaflets classify as heartAVValve (3 AV: right-inferior, right-septal,
left-posterior) and heartSemilunarValve (6: three '*_coronary_leaflet' aortic —
the aortic leaflets carry no 'aortic' or 'semilunar' in their names — and three
pulmonary semilunar). Each group's glow is gated by an envelope derived from
ventricleEnvelope: AV lit while the ventricles are relaxed (av = 1 − ventricular),
semilunar lit during ejection (phys.2 pp36–39 added to MECHANISM_SOURCES). The
plain 'heart' class now has zero meshes on this model and remains the fallback
for any static heart mesh the leaflet names miss.

## Browser verification (in-app Chromium pane)

- `work/physiology-shape-browser-check.js` mode 'pump' — real injected GLSL via
  WebGL2 transform feedback: 948 meshes, 2465 chamber samples, position error
  1.9e-8 against `deformChamber` with the mesh's own attribute samples; rest
  position identity exactly 0.
- `work/physiology-papillary-browser-check.js` — 25-frame cycle through the new
  reference map: all four pairs max gap ratio exactly 1.
- Screenshots: real Chrome (desktop) was not available as an automation backend
  in this session — only the in-app pane, which freezes requestAnimationFrame.
  The shots were taken by freezing the animation clock at a chosen phase
  (setting the class uniforms from the same envelope functions
  stepPhysiology uses) and rendering the live scene once, so the screenshots ARE
  the shipped shaders mid-systole and mid-diastole. A human glance at the
  running animation in desktop Chrome is still worth a moment.

## Interaction note

Picking stays on the CPU rest pose (deformation is shader-only; the papillary
check asserts CPU buffers never change), so a tap resolves against the rest
surface at worst one displacement amplitude (~0.008 world units, ~8 mm at body
scale) from the visible wall — within a finger's width on screen, unchanged from
the chamber pump mode this piece replaced.

## Traps hit (also in docs/TRAPS.md)

- 'atrioventricular' does NOT contain 'ventricle' (atrio-, not atrium-): the
  classify split is safe, but 'Left_ventricle_1' DOES need the `(?:_\d+)?`
  tolerance in every regex that looks for a chamber.
- An unbound float attribute reads 0 in WebGL — a mesh skipped by the
  nonuniform-metric guard must bind an explicit all-ones field, or it freezes.
- When a classifier splits a class (heart → heart/heartAVValve/heartSemilunarValve),
  grep every filter that selects the old class by name — the tether's static set
  silently lost all 9 leaflets for one run and the gate's pair count dropped from
  283 to 220 before the filter was widened.
- GLSL called from a patch emitted for every deforming class must be declared for
  every deforming class — a conditional include starved the muscle/gut/airway
  programs of rssChamberDeform and failed to compile.
