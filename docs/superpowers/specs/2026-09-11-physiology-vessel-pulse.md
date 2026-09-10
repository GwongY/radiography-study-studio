# Arterial pulse — a radial pressure wave along the curated routes

Status: PROPOSED — not started. Depends on 0 and 4 (the route machinery it extends).
Parent: [decomposition](2026-09-09-physiology-decomposition.md); extends piece 5's
curated route set. Companion: the heart piece is separate —
[2026-09-11-physiology-3-heart-constrained.md](2026-09-11-physiology-3-heart-constrained.md).

## Problem

The arteries teach half of phys.2 p13 today. The travelling glow shows the pressure
wave's passage; a uniform 6% inflate (`mode:'inflate', inflate:.06` on the
`arterial` and `pulmArtery` classes) shows *a* systolic swell — but it is global and
in-phase across the whole body, measured about each mesh's bounding-box centre
rather than the lumen, and it has no normal correction in the shader (the inflate
normal patch exists only for airway). What the claim on p13 describes — elastic
expansion during systole, recoil during diastole, travelling away from the heart —
is a local radial wave, and that is what this piece builds.

Veins keep the drift glow and gain nothing: phys.2 p17 gives direction and one-way
valves, and nothing taught describes a venous pulse.

## Claim discipline

- Cited: arteries carry blood away from the heart and expand during systole,
  recoil during diastole (phys.2 p13); ejection leaves the left ventricle through
  the aorta and the right through the pulmonary trunk (phys.2 p20). Direction and
  timing already carried by the curated routes and the `pulse` circuit's `lead`.
- App-authored display parameters, labelled as such, on the same footing as
  `pathSpeed`/`pathTaper`: swell depth, crest sharpness, and the distal amplitude
  falloff (compliance). Nothing in the supplied sources says how far the swelling
  travels per beat, how deep it is, or that it fades distally — the falloff is a
  display aid derived from circuit position and must be visibly tagged as such in
  the legend wording, not silently presented as anatomy.

## Gate: `derivePulseRoute`

The glow gate deliberately dropped four tube refusals because a light moves
nothing (`TRAPS.md`, Routes). A radial swell moves geometry again, so the arterial
routes cannot simply be re-badged; but wholesale tube-gate promotion would refuse
the aortic arch at 2.94 calibres against the 3-calibre floor — the one vessel this
course most needs moving. So a third, middle gate: the glow gate's refusals
(`ambiguous-cross-section`, `centreline-discontinuous`, plus the shared
`progressField` five) with the deformation protections re-added at thresholds
argued from a SMALL radial swell (~5% of local calibre), not from a travelling
constriction:

- `route-shorter-than-its-calibre` — re-added with a swell-argued floor the
  2.94-calibre arch passes; the constriction floor's rationale (taper occupies a
  quarter of the route; curvature fit noise) does not carry over unchanged, and
  the new floor's own justification is written in the gate.
- `route-self-adjacent` — re-added where two limbs' measured clearance is small
  enough that a 5% swell could make them visibly touch; the threshold is derived
  from the swell amplitude, not reused from the constriction.
- `not-a-tube-about-this-path` (bulge) and `degenerate-frame` — re-added: an
  outward swell about a centre outside the lumen pushes the wrong way.

Every route is re-derived under this gate. A refusal keeps the glow exactly as it
is, refused BY NAME in the discovery report — the established pattern; no
threshold is loosened to admit a specific case.

## Change

**Payload.** A third route kind, `pulse`, carrying the existing
`PATH_ATTRIBUTES` (param, centre, tangent, bend) for the arterial routes that
pass the gate — the same per-vertex quantities the tube constriction uses. The
outward swell is the constriction map with the opposite sign
(`x' = x + w·radial`); `pathDeformation`'s Jacobian machinery and its
finite-difference checks are sign-agnostic, and the normal follows the same
inverse transpose — which retires the missing-normal-correction wart along with
the uniform inflate. Payload budget is profiled in the discovery gate against the
decomposition spec's 1 MiB/layer acceptance budget before committing; if the 21
arterial routes exceed it, the set narrows by named refusal rather than by
compression.

**Deformation.** The crest is generated per circuit by the existing `pulse` mode
in `FLOW_CIRCUITS` (one crest per heartbeat, `lead` at ejection, `uStart`/`uSpan`
chaining already gives phase continuity across the chain). Amplitude falls with
circuit position (the labelled compliance display aid). **No end taper on the
travelling crest**: on a 20-mesh chain the peristalsis-style taper would strangle
the wave at every join.

**Join continuity is a gate assertion, not a visual judgement.** The generator
measures, for each chained link, the step in derived centre and local calibre
between the predecessor's distal end and the successor's proximal end, and the
check computes the displacement discontinuity both sides of the join at full
amplitude. A join whose mismatch exceeds the stated tolerance fails the check —
the route is refused by name or the tolerance is argued in the evidence note;
it is never waved through because it looks fine.

**The uniform inflate is replaced, not kept.** `arterial` and `pulmArtery` lose
`mode:'inflate'`; a mesh with a passing pulse route shows the travelling swell
plus its glow; a mesh without one keeps the glow alone (activity coverage — a
missing path must not disable a layer). One story per vessel. Veins, and every
other class, are untouched.

## Evidence and acceptance

- Pure: expansion-map Jacobian against a central difference; exact zero-amplitude
  identity; the gate's new thresholds held against the measured arch numbers; both
  older gates still name the same reasons on the same inputs (the synthetic-tube
  checks must not move).
- Model: re-run `build-physiology-paths.mjs --write`; the byte-for-byte committed
  payload comparison passes; every pulse route's quotes are on the pages they cite
  (one-based indexing); every refusal is refused by name.
- Browser: `physiology-path-browser-check.js` gains the pulse kind — deformed
  position matches the reference map, zero amplitude is bit-exact rest — while the
  glow assertion is scoped per kind: glow routes still prove "advancing phase moves
  the light and not the geometry"; pulse routes prove the opposite claim, that the
  geometry DOES move with the phase and the normals follow.
- Performance: same camera/layers/viewport comparison against current master;
  target the decomposition spec's 10% p95 frame budget.
- Interaction: tapping and labels at motion extremes; rest-pose contract protected
  by the standing separation/cut/build/grid-probe/browser regression set.
- Real Chrome (not the Browser pane): screenshot the arterial pulse mid-ejection
  showing the wave partway along the aortic chain, and the distal falloff.
- `TRAPS.md` gains what this work learns, under Routes; `CACHE_VERSION` bump;
  README/CODEMAP/CLAUDE.md updated when it lands; every display parameter tagged
  as display in the wording the viewer shows.
