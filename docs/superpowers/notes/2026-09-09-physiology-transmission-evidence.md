# Piece 5 — vessel and nerve activity on curved paths: what was measured

Implements [the piece 5 spec](../specs/2026-09-09-physiology-5-transmission.md) on
top of piece 4's payload and gate, under the
[piece 0 contract](2026-09-09-physiology-path-contract.md). Numbers here are
measurements from the runs described, not targets.

## What changed, in one line

The travelling light on a vessel or a nerve used to be a function of world
height — `|y − anchor|`. It is now a function of how far along that structure a
point is, measured over the surface between two named, adjacent structures.

## A second, weaker gate — and why it is weaker

Piece 4's gate exists to protect a **deformation**. A glow route moves nothing,
so four of its refusals protect nothing:

| refusal | kept for glow? | why |
| --- | --- | --- |
| `disconnected` | yes | progress is undefined on a component the field never reached |
| `endpoints-not-opposed` | yes | an anchor in the middle orders the mesh wrongly at both ends |
| `too-few-stations` | yes | fewer than four bands is not an ordering |
| `ambiguous-cross-section` | yes | a band that swallows a branch lights two limbs as one crest |
| `centreline-discontinuous` | yes | a band centroid that jumps reads as two lights, not one moving |
| `not-a-tube-about-this-path` | **no** | there is no radial direction to be wrong about |
| `route-shorter-than-its-calibre` | **no** | no taper to swallow the route, no fitted curvature to be noise |
| `route-self-adjacent` | **no** | a light on two adjacent loops is a light, not a fold in a deformed surface |
| `degenerate-frame` | **no** | no frame is derived |

Both gates call the same `progressField` in `outputs/physiology-path.js`, so the
five shared refusals cannot disagree; `work/physiology-path-check.mjs` asserts
that on the same input they name the same reason.

The difference is not theoretical. A 2.0-diameter synthetic stub, and the real
**aortic arch** at **2.94 diameters**, are refused `route-shorter-than-its-calibre`
by the tube gate and accepted by the glow gate. The arch is exactly where a wave
drawn on a vertical stripe is most visibly wrong: it puts the crest in two
places at once and runs it backwards over the top.

## A new refusal: `anchor-not-adjacent`

An anchor is only an anchor if this model actually places the two surfaces
together. Naming a plausible neighbour reads as a justified ordering and can be
a guess: the musculocutaneous nerve anchored at `Roots_of_brachial_plexusl`
measured **0.172** away — a tenth of the body's height — and the route derived
from it was **accepted**, because the seed still landed somewhere. The generator
now refuses an anchor further than **0.01** world units (this model stands 1.698
tall, so about a centimetre). Every accepted route's measured anchor gaps are
asserted in `work/physiology-path-model-check.mjs`; the worst across all 52 is
0.0027.

The musculocutaneous nerve is instead anchored at
`Lateral_antebrachial_cutaneous_nerve` — the structure it continues as — at
0.0001, with its proximal end taken as the topologically far end.

## What the gate accepted

`node work/build-physiology-paths.mjs` over `assets/dolasim.glb` and
`assets/sinir.glb`: **46 routes accepted, 6 refused by name.**

| circuit | routes | measured length (world) |
| --- | --- | --- |
| systemic-arterial | 21 | 0.938 |
| systemic-venous | 16 | 0.701 |
| pulmonary-arterial | 3 | 0.131 |
| motor-axillary-left / -right | 2 each | 0.125 each |
| motor-musculocutaneous-left / -right | 1 each | 0.220 each |

The arterial circuit runs ascending aorta → arch → thoracic aorta → abdominal
aorta → common iliac → external iliac → femoral artery, with the brachiocephalic
trunk, both common and internal carotids, both subclavians, both axillary and
both vertebral arteries branching off it. The venous circuit runs femoral →
external iliac → common iliac → inferior vena cava (abdominal, then thoracic),
with the internal jugulars, subclavian veins, brachiocephalic veins, superior
vena cava and azygos vein on their own runs.

Refused, by name, each keeping the illustrative cue it already had:

- **All four pulmonary veins.** Three (`Left_superior`, `Left_inferior`,
  `Right_inferior`) are `disconnected` — the mesh is in 3, 2 and 2 pieces. The
  fourth (`Right_superior`) is `endpoints-not-opposed`: its nearest vertex to
  the left atrium sits at **0.783** of its own surface extent against a
  ninth-decile of **0.909**, because the atrium mesh lies alongside the vessel
  as well as at its end. So the pulmonary venous circuit has no accepted route
  at all, and its class says so.
- **Both femoral nerves — `disconnected`, four components each** (38, 11, 4 and
  3 welded nodes). This is the mesh the piece 0 profile already found in four
  pieces. It keeps a motor cue with **no direction**: see below.

The right atrium and left atrium turned out to be unusable end anchors for the
same reason in three more places, and those routes name their far end
topologically instead, with the measured reach recorded in the route definition:
superior vena cava (0.856 against 0.926), thoracic inferior vena cava (0.814
against 0.979), right common iliac vein (0.833 against 0.917). The thoracic
aorta does the same for a much narrower miss (0.946 against 0.951).

## The highest-Y seed is gone

`transmissionField`'s seed for a motor nerve was the mesh's **highest vertex**,
and its per-component reseeding was the nearest vertex of each component to that
point. On the femoral nerve that was four separate guesses about anatomy dressed
as a measurement. It has been removed from the runtime.

A motor nerve now behaves in one of two ways, and the compiled program says
which:

| mesh | program variant | what it claims |
| --- | --- | --- |
| axillary nerve, its muscular branches, musculocutaneous nerve (l and r) | `…:nerve:c:motor:glow` | the volley arrives later the further along the curated chain a point is |
| femoral nerve (l and r) | `…:nerve:c:motor` | the timing only: the whole nerve lights at once |

Read out of the running app with both layers loaded.

## Chains: one crest, several meshes

Each route names the route it comes after, and the generator sums the measured
world lengths before it. The aorta is four meshes and one wave. Measured in the
app, the brightest point of the systemic-arterial crest by cardiac phase:

| cardiac phase | lit above half |
| --- | --- |
| 0.15 | ascending aorta, arch, thoracic aorta |
| 0.30 | arch, thoracic aorta, abdominal aorta |
| 0.45 | thoracic aorta, abdominal aorta |
| 0.60 | abdominal aorta, common iliac, external iliac |
| 0.75 | common iliac, external iliac, femoral artery |

`work/physiology-path-model-check.mjs` asserts that every route begins exactly
where its predecessor ends (worst disagreement 1e-5 of a circuit), that nothing
runs past 1, and that no circuit contains a route continuing one that was
refused.

## Direction, tested against the model and not against the input

Both ends of a route come from the curated definition, so re-reading them proves
nothing. Two independent tests do:

- **World height.** Twenty routes are asserted to run the way the anatomy says
  as the parameter increases — the abdominal and thoracic aorta, femoral and
  external iliac arteries and internal jugulars downwards; the ascending aorta,
  both common and internal carotids, both vertebrals, both femoral veins, both
  parts of the inferior vena cava and the azygos vein upwards. The gate could
  accept a route and still have run it backwards; this is what would catch it.
- **Independent landmarks**, the way the organ routes are tested: a structure
  upstream and one downstream, neither of them one of the route's own anchors.
  The coeliac trunk precedes the left common iliac artery along the abdominal
  aorta; the pulmonary trunk precedes the left subclavian artery along the arch;
  the brachiocephalic trunk precedes the left external carotid along the left
  common carotid; the right internal iliac vein precedes the hemi-azygos vein
  along the abdominal inferior vena cava.

## Pressure wave, not a packet of blood

The spec asks for these to be separate cues, and they are separate modes in
`FLOW_CIRCUITS`:

- **pulse** (arteries, pulmonary arteries): ONE crest crosses the whole circuit
  each heartbeat, leaving the heart at the ejection phase. The cited claim is
  that an artery *expands during systole and recoils during diastole*; what
  travels is that expansion. A real pulse wave crosses the aorta in a small
  fraction of a beat, so a crest that takes a whole beat is slowed by roughly an
  order of magnitude, deliberately, and the class text says so.
- **drift** (veins): crests of a fixed world wavelength at a fixed world speed.
  Here the blood itself is what moves. The direction is cited; the rate is not.
- **motor** (nerves): no crest of its own — the route parameter is an arrival
  time for the existing motor sequence, already slowed for visibility.

Route-bound meshes are no longer multiplied by the beat envelope: the crest
carries the rhythm, and dimming it a second time would blink the crest out
mid-sweep.

## GPU against the reference

`work/physiology-path-browser-check.js`, Chromium in the Browser pane, the real
`PATH_GLOW_VERTEX_GLSL` and `PATH_GLOW_FRAGMENT_GLSL` rendered into an RGBA32F
target at one pixel per vertex, all 52 routes in all three layers:

| | measured |
| --- | --- |
| glow band, GPU vs `progressBand` | worst **3.1e-6** over 5,583 vertices |
| chained parameter, GPU vs `uStart + s·uSpan` | worst **6.3e-8** |
| **position drift when the phase advances** | **exactly 0**, every vertex |
| tube deformation, GPU vs `pathDeformation` | worst **1.0e-7** (unchanged) |
| tube rest pose at zero amplitude | **0** (unchanged) |

The third row is the whole claim of a glow route. The check advances
`uRoutePhase` by 0.21 and asserts the band changed on at least one vertex of
every route while the emitted position changed on none.

To be exact about the boundary: an artery still *inflates* with the cardiac
envelope, which is the pre-existing piece-1 cue and is why its program variant is
still `arterial:d:glow` rather than `:c:glow`. Piece 5 adds no displacement of
its own, and the payload could not express one — a glow route ships one scalar
per vertex and no centre, tangent, bend or calibre, which the model check
asserts. Making the wall swell WITH the travelling crest rather than uniformly
would be a tube-radial displacement, which this piece explicitly does not do.

In the running app, with the arterial, venous and nervous layers on: **11
programs compile**, `getError()` is 0, and the `:glow` variants appear exactly
where a route bound — `arterial:d:glow`, `pulmArtery:d:glow`, `venous:c:glow`,
`nerve:c:motor:glow` — while `pulmVein:c`, `nerve:c` and `nerve:c:motor` compile
without it. All 46 payload routes bound: 46 meshes out of 1,258 loaded carry
`aPathProgress`. CPU world bounds of the aortic arch, the refused left superior
pulmonary vein and the axillary nerve are **unchanged** by a rendered
deformation, and a raycast at the arch returns the identical distance
(25.075093) before and after — picking and label attachment are untouched by
construction.

## Budgets

Piece 0 set 1 MiB of route data per layer and 8 MiB of resident derived
attributes. Measured:

| layer | routes | vertices | encoded | resident |
| --- | --- | --- | --- | --- |
| circulatory | 40 glow | 5,061 | 26.4 KiB | 19.8 KiB |
| nervous | 6 glow | 522 | 2.7 KiB | 2.0 KiB |
| organs | 6 tube | 4,556 | 237.3 KiB | 178.0 KiB |

A glow route is one float per vertex against a tube route's ten, which is why 46
new routes cost an eighth of what six old ones do. Asserted in the model check,
so a route set that outgrows the budget fails rather than ships.

## What is claimed, and what is display

Claimed, with every quote checked against the page it cites by
`work/physiology-path-model-check.mjs` using the same comparison
`source-check.mjs` uses:

- Arteries carry blood away from the heart, and expand during systole and recoil
  during diastole — `phys.2` p13; the left ventricle pumps through the aorta to
  the body — `phys.2` p20.
- Veins carry blood to the heart, one way, valved — `phys.2` p17; blood from the
  tissues enters the venae cavae and empties into the right atrium — `phys.2` p20.
- The pulmonary circuit runs right ventricle → lungs → heart — `phys.2` p18, p20.
- Motor neurons conduct impulses from the CNS to target organs —
  `phys.nerve.deck` p7; deltoid innervated by the axillary nerve — `hss.4.3` p19;
  biceps brachii by the musculocutaneous nerve — `hss.4.3` p24; the quadriceps by
  the femoral nerve — `hss.4.3` p52.

Not claimed, and named as display parameters in `physiology.js`: crest speed,
wavelength, sharpness, the arrival window, and which end of the cardiac cycle the
crest leaves on. Nothing here claims a conduction velocity, a pulse wave velocity,
a capillary network, or that any peripheral nerve is exclusively motor. The
`nerve` class text says in as many words that the unmapped nerves — and the
refused femoral nerve — claim no direction, because most peripheral nerves are
mixed.

## A defect found in piece 4 while extending it

`physiology-path-model-check.mjs` read `source.pages[String(page)]`. `pages` is a
zero-based array and a page number is one-based, which is how
`work/lib/source-lesson-map.mjs` — and therefore `source-check.mjs` — reads it.
The check was testing the page **after** the one cited, so all eleven piece 4
route citations were written one page low. The indexing is fixed and all eleven
page numbers corrected; the quotes and the sources are unchanged. The check's own
comment claimed it used the same comparison as `source-check.mjs`; now it does.

The same pass corrected two numbers in the piece 4 note: the sigmoid colon's
fitted route is **0.87** of a diameter, not "about two", and the manifest stamp
is now re-derived by the model check rather than only compared with itself, so a
payload built from a changed generator, kernel or route file can no longer ship
under the previous version's cache key.
