# Papillary/ventricular field evidence — 2026-09-09

Limited cardiac follow-up, not completion of the entire cardiac-boundary spec.
The four named papillary meshes now share the affine contraction field of their
named left/right ventricle. Phase, rate and chamber geometry are unchanged.
Source checked: phys.2 p35 describes papillary contraction during ventricular
contraction and their chordal valve connection; pp36-37 show their relaxed state.
The geometry map remains illustrative, not a simulation of chordal tension.

The loader derives the chamber field from its actual primitive (Left_ventricle_1 /
Right_ventricle_1), converts its centre and direction through world into each papillary
mesh's local frame, and falls back if the metric is nonuniform. No CPU position,
normal, mesh/parent transform or morph target is animated. The existing pump shader
and full affine inverse-transpose normal formula are retained.

Named-pair nearest-vertex samples (five per papillary mesh; these are geometric
samples, not claimed anatomical correspondence landmarks) previously had max peak
gaps 0.02479 / 0.03250 / 0.02247 / 0.01157 scene units. With the shared field these
are 0.00811 / 0.00756 / 0.00736 / 0.00717. Across 25 cycle phases, each pair's distance
never exceeds its own rest gap (max ratio 1+1.1e-13). Same-point maps differ by at
most 1.35e-15 world units. The positive affine map cannot introduce an intersection
between two surfaces that both share it. This says nothing about stationary valves
or other heart surfaces outside this limited change.

Actual GLSL transform feedback passed 1,825 ventricular/papillary samples across
five amplitudes (0,.2,.5,.8,1), within the all-modes 948-mesh / 300,540-sample run.
Max normal error 1.35e-7; max position error / length 1.88e-8. Rest position identity,
CPU buffer/matrix/bounds immutability retained. Front/side/oblique 25-frame diagnostic
cycles with translucent chamber walls and highlighted papillary muscles passed and
were visually inspected. Initial/end pixels match exactly.

New-lesson progress fix is a separate earlier commit 3fe84e5. Browser regression
covers prior-covered and ordinary new lessons, direct/topic/search/Next entry at
Learn, and genuine saved Practise/Apply restoration. Existing saved stages are not
retroactively erased because an old intentional 3/4 cannot be distinguished from an
automatic entry using the stored stage alone.

Load/syntax/import/binding/shell, progress log, mechanics/separation and browser
reported regressions pass. Baselines remain 11/12: pre-existing corpus-snapshot
mismatch not regenerated. UI strings baseline remains unchanged in this follow-up.

Still pending: validated chamber/valve/outflow boundaries, supporting heart surfaces,
respiratory coupling, tubes and transmission. No merge or deployment performed.
