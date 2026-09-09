# Muscle geometry and reduced-motion evidence — 2026-09-09

Implemented on isolated codex/physiology-kernel; not merged or deployed.

## Behaviour

Reduced motion starts static, stops immediately on OS change, and permits explicit
Live for this page. Presets and Spread restoration cannot override an explicit Static
choice. No-preference changes do not restart motion. Live label/aria-pressed follows
state. Modern/legacy listeners and absent matchMedia are covered.

Muscles use a cubic end envelope: w=(1-x^2)^3 within projected endpoints. Axial map
f(z)=z(1-a*w), local axial derivative f', radial scale s=1/sqrt(f'), and the complete
inverse-transpose Jacobian normal include s'. The continuous determinant is 1;
finite triangulated mesh volume is not claimed exact. Activation is bounded at .25,
so f'>=.75. Existing activity timing and mapped motor sequence are unchanged.

Six meshes (left/right sartorius and long/short biceps heads) use triangle-integrated,
surface-area-weighted PCA. Centroid is shifted to projected extent midpoint. Curated
name eligibility and elongation/flatness gates retain fallback for other muscles;
nonuniform runtime scale also falls back. PCA is geometric, not measured fibres or
origin/insertion. Sartorius world axis is approximately (+/-.1543,.9771,.1465), about
12.3 degrees from the old vertical bbox axis. Deltoid retains its old axis.

Source checked: phys.muscle.deck pp26-30 supports shortening and excitation/contraction.
The end field, shape selection thresholds and local volume-preserving map are app
illustrations, not sourced anatomical attachment or deformation measurements.

## Validation

- Node muscle check: 3,315 derivative samples, max tangent-normal dot 1.82e-8,
  max numerical determinant error 3.24e-9; rotation covariance, tessellation
  subdivision invariance, six real candidates, degeneracy and immutable inputs.
- Actual WebGL transform feedback: 948 meshes / all five modes; 300,540 vertex
  samples including 149,965 muscle samples at amplitudes 0,.2,.5,.8,1.
  Max muscle position error / length 5.69e-8; normal component error 1.83e-7.
  Exact rest positions; input attributes, matrices and bounds unchanged.
- Three muscles x front/side/oblique x 25 cycle frames, FrontSide rendering:
  all visibly changed, exact pixel return at rest. Rest/peak contact sheet inspected.
  No flipped surfaces or detached endpoints observed. work/physiology-muscle-visual-check.js
  creates the diagnostic sheet in the test page (remove it afterward).
- Browser regression: 1,686 searchable names, eight nerve paths, breathing/motor/Spread;
  471/471 muscle and 497/497 nerve animations installed. Progress 3/4 and 4/4,
  tap label, and search/text-size alignment checks pass.
- Load/syntax/import/shell/binding, mechanics, separation, cut-level, cavity build,
  grid and codemap checks pass. Reduced-motion actual button and aria sequence passed.
- Baselines 11/12 pass. Pre-existing corpus-snapshot difference at base 58cf422
  remains; lesson baseline was not regenerated. UI baseline change was reviewed:
  only two old GLSL tether strings replaced by one new profile string; no UI copy changed.

Remaining physiology pieces: breathing including diaphragm normals and shared lung
field, heart profiles, tubes, and transmission. Do not describe these as completed.
