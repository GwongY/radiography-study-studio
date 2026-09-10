# Piece 4 — peristalsis along tubes: what was measured

Implements [the piece 4 spec](../specs/2026-09-09-physiology-4-tubes.md) under
the [piece 0 contract](2026-09-09-physiology-path-contract.md). Numbers here are
measurements from the runs described, not targets.

## What the gate accepted, and what it refused

`node work/build-physiology-paths.mjs` over `assets/ic-organlar.glb`:

| route | mesh | verts | length (world) | stations | crowding | encoded |
| --- | --- | --- | --- | --- | --- | --- |
| oesophagus | Oesophagus | 203 | 0.274 | 9 | 1.90 | 11 KiB |
| duodenum | Duodenum | 328 | 0.168 | 11 | 2.04 | 17 KiB |
| colon-transverse | Transverse_colon | 1686 | 0.197 | 19 | 1.22 | 88 KiB |
| colon-descending | Descending_colon | 2050 | 0.291 | 23 | 1.49 | 107 KiB |
| ureter-left | Ureterl | 142 | 0.244 | 15 | 4.25 | 7 KiB |
| ureter-right | Ureterr | 147 | 0.214 | 12 | 4.00 | 8 KiB |

Refused, by name, each keeping the existing illustrative peristalsis:

- **jejunum — `route-self-adjacent`.** The small-bowel mesh is a coil whose
  loops lie alongside each other: parts of the fitted centreline more than four
  calibres apart *along* the route close to **0.93** of a combined calibre,
  i.e. the two limbs interpenetrate. Every accepted route clears **2.28** or
  more. This is the "ambiguous bowel mesh" the spec anticipated; the reason is
  recorded in the payload and shown by `state.flow.paths.organs.rejected`.
- **colon-ascending — `endpoints-not-opposed`.** The caecal end carries a blind
  pocket (the ileocaecal invagination): two points 0.01 apart in space are 0.39
  apart across the surface. Surface distance is therefore not a usable ordering
  at that end, and the distal anchor reaches only 0.52 of the surface extent
  against a ninth-decile of 0.88.
- **colon-sigmoid — `route-shorter-than-its-calibre`.** The descending colon
  mesh overlaps the sigmoid, so the nearest-vertex anchor lands in the sigmoid's
  middle and the balanced field fits a centreline about two diameters long
  across a mesh spanning six. Below three diameters the taper alone occupies a
  quarter of the route and the fitted curvature is mostly fit noise.

## Shape and normals

`node work/physiology-path-deform-check.mjs` — 128 assertions.

- The analytic Jacobian matches a central difference of its own map on an exact
  circular arc to **2e-4** worst over 288 columns.
- The deformed normal stays perpendicular to the deformed surface: worst
  \|cos\| **1e-3**, pushing both rest-space surface tangents through the same
  Jacobian. Smallest determinant **> 0.3**, so the map never folds.
- Zero amplitude returns the incoming position and normal **identically** (`===`
  on every component) and a determinant of exactly 1.
- On the real derived straight/U/S routes every displacement is perpendicular to
  the LOCAL tangent to **1e-6** of its own length — the property the old global
  axis could not have.
- The crest is one contiguous band of route parameter at every sampled instant,
  and its centre advances monotonically: 0.09 → 0.19 → 0.29 → 0.39 → 0.49 → 0.59.

## GPU against the reference

`work/physiology-path-browser-check.js`, Chromium in the Browser pane, real
`PATH_SHAPE_GLSL` rendered into an RGBA32F target at one pixel per vertex:

| route | vertices | moved | worst GPU−reference | rest pose at zero amplitude |
| --- | --- | --- | --- | --- |
| oesophagus | 203 | 142 | 2.9e-8 | 0 |
| duodenum | 328 | 255 | 1.0e-7 | 0 |
| colon-transverse | 1686 | 1418 | 7.3e-8 | 0 |
| colon-descending | 2050 | 1743 | 7.7e-8 | 0 |
| ureter-left | 142 | 99 | 3.0e-8 | 0 |
| ureter-right | 147 | 100 | 3.0e-8 | 0 |

In the running app, with the organ layer loaded and physiology on: five programs
compile (`…:gut:d:path`, `…:urinary:d:path`, and the three non-path variants),
`getError()` is 0, the mesh's CPU world bounds are **unchanged** by a rendered
deformation, and a raycast against the transverse colon still hits it — the
deformation is GPU-only, so picking and label attachment are untouched by
construction, not by tuning.

## Budgets

Piece 0 set 1 MiB of route data per layer and 8 MiB of resident derived
attributes. Measured: **237 KiB** encoded for the organs layer, **178 KiB**
resident (4,556 vertices × 10 floats). Asserted in the model check, so a route
set that outgrows the budget fails rather than ships.

## What is claimed, and what is display

Claimed, with the quote checked against the page it cites by
`work/physiology-path-model-check.mjs` using the same comparison
`source-check.mjs` uses:

- Gut: peristalsis is a travelling wave of circular-muscle contraction moving a
  bolus along the tract, mouth to anus — `phys.4` p12, p13.
- Oesophagus: conveys food downwards to the stomach — `phys.4` p20, `hss.3.1` p9.
- Ureter: **direction only** — urine flows from the kidneys down the ureters to
  the bladder, `phys.5` p3. No cited source describes ureteric peristalsis, so
  the travelling ring on the ureters is labelled in the viewer as this app's
  illustration of a muscular tube.

Display parameters, written by this app and named as such in `physiology.js`:
`pathSpeed` (0.085 world units per second for gut, 0.05 for urinary),
`pathWavelength` (0.10 / 0.07), `pathTaper` (0.14 / 0.16) and the existing
`pinch` amplitude (0.18 / 0.15) and crest sharpness.

## Departures from the 0A schema, stated

The payload carries model version, GLB content hash, generator, kernel and
route-definition hashes, the glTF node index and primitive index, vertex and
index counts, a hash of the index buffer, the local bounds, and a SHA-256 digest
of its own encoded arrays — all verified before any attribute is bound.

It does **not** store `gradientS`. The gradient is derived in the shader as
`T / (L − b·r)`, which 0A explicitly allows ("the later tube design must derive
or store any centre/tangent derivatives its normal update requires") and which
keeps the position and normal halves of the map algebraically consistent rather
than merely numerically close. It also carries no validity mask, because a route
is accepted whole or refused whole; there are no partially valid routes.

`work/build-physiology-paths.mjs --write` regenerates everything, and the model
check compares what shipped against a fresh derivation byte for byte.
