# Cavity and region overlays derived from the loaded anatomy

**2026-08-30.** Supersedes the cavity, region and quadrant sections of
`2026-08-30-search-and-viewer-enhancements-design.md`. The planes section of
that document still stands.

## The problem

The overlays were drawn, not derived. Each cavity carried a `shell.profile` —
a list of `[radius, height]` pairs revolved about a vertical axis — tuned by eye
against screenshots until the shape sat roughly inside the right bones:

```js
{ id: 'cav-thoracic', shell: { rx: 0.078, rz: 0.052, cz: -0.002,
  sag: { front: 0.020, back: -0.030, at0: 0.730, at1: 0.655 }, profile: [
  [0.00, 0.716], [0.34, 0.712], [0.62, 0.701], … ] } }
```

Three things are wrong with that. It is a picture of a cavity rather than a
cavity. It silently goes wrong whenever the model changes, because nothing
connects those numbers to the ribs they are supposed to describe. And it cannot
express what actually matters — that the pleural sacs are separated *by* the
mediastinum, that the thoracic floor and the abdominal roof are one surface.

Meanwhile the viewer already loads ~2,900 individually named anatomical meshes.
Those meshes *are* the anatomy.

## The principle

The loaded meshes are the source of truth. A cavity is defined by the
structures that bound it, so it is measured from them at build time.

```
named meshes  →  landmark resolver  →  measurement  →  surface  →  overlay
```

No builder contains a coordinate. Reading one should read like the anatomical
definition: the thoracic cavity is "inside the ribs, the sternum and the
thoracic vertebrae, floored by the diaphragm", and that is what `buildThoracic`
asks for.

## Modules

| file | responsibility |
|---|---|
| `landmarks.js` | semantic key → the meshes currently loaded |
| `cavity-geom.js` | the maths: sweeps, height fields, plane slices, lofts |
| `cavity-build.js` | one builder per cavity, plus the surface grid's planes |
| `bodymap.js` | identity only: name, aliases, blurb, colour, hierarchy |

`cavity-geom.js` is pure — point clouds and triangles in, plain shape
descriptions out, no three.js and no DOM. The maths is the part that can be
quietly wrong, so it has to be runnable outside a browser, where a wrong number
is a number rather than "a shape".

### Name matching

three.js sanitises node names on import: whitespace becomes `_`, and the
reserved set `[ ] . : /` is deleted. The GLB's `Hip bone.l` reaches the runtime
as `Hip_bonel`. Matching therefore runs on a normalised form and on a *base*
form with the glued side letter removed — which is only safe when the
opposite-side twin exists, because `Femur` and `Vomer` genuinely end in r.

Patterns are lowercase substrings with optional `^` and `$` anchors, and a
`reject` list that wins over `match`, so a group can say "any rib, but not the
costal cartilage of one".

## What each cavity is measured from

| cavity | derived from |
|---|---|
| cranial | inner table of the frontal, parietal, temporal, occipital, sphenoid and ethmoid bones |
| vertebral canal | the vertebral foramen found in each vertebra, C1 → sacrum |
| thoracic | inside the ribs, sternum and thoracic vertebrae; floored by the diaphragm |
| pleural (×2) | the outer surface of each lung, held apart at the mediastinum |
| mediastinum | the medial surface of each lung, the back of the sternum, the front of the vertebral bodies |
| pericardial | the outer surface of the four heart chambers |
| abdominal | lower ribs, lumbar vertebrae, iliac crests; roofed by the diaphragm, floored by the pelvic inlet |
| pelvic | inside the hip bones, sacrum and coccyx, below the brim |

`abdominopelvic`, `dorsal` and `ventral` have no geometry. They render their
members' triangles, so a shared boundary is the same triangles rather than two
measurements that can drift apart.

Shared surfaces are computed once and handed to everyone who needs them. The
thoracic floor and the abdominal roof read one diaphragm height field; the
pelvic roof and the abdominal floor read one inlet plane. Measuring either
twice is how two cavities end up with a gap between them.

## Techniques

**Percentile radius.** To find the inside of the rib cage, sweep a ray out from
an axis inside the chest and ask where it first hits bone. The literal minimum
is too brittle — one stray vertex and the wall dents — so take a low percentile
of the radii in that direction instead.

**Honest gaps.** A horizontal band through the mid-abdomen contains no bone at
all. Rather than inventing a wall, a direction with too few points is marked
uncovered and interpolated vertically between the nearest covered bands: the
costal margin above and the iliac crest below, both real bone. With the muscle
layer loaded those same bands get real data and the interpolation never runs.
One mechanism, degrading towards "reasoned from the nearest real structure".

**Plane-sliced foramina.** Finding the vertebral canal took three attempts,
and the failures are the interesting part:

1. *Horizontal slices of the vertex cloud* — 15/24. These meshes carry only a
   few hundred vertices each, so a thin slice is a scatter of dots with gaps a
   flood fill pours straight through.
2. *Projecting the whole bone from above*, the classic "vertebra, superior
   view" — worse. The superior and inferior articular processes close over the
   canal in projection, leaving only the transverse foramina.
3. *Slicing the triangles with a plane* and rasterising the resulting segments —
   25/25, radii 8–21 mm, and a z-trace that shows cervical lordosis, thoracic
   kyphosis and lumbar lordosis. Every enclosed region is scored, not just the
   largest, because a cervical vertebra also encloses its transverse foramina.

**Cross-sections, not widths.** The mediastinum was first built by sweeping
rays from the midline. That finds the point where the lungs tuck in beside the
vertebral bodies and squeezes the whole compartment down to the width of that
gap. It is now bounded at each height *and each depth*, so it is broad in front
where the heart pushes the lungs apart and narrow behind — the shape it has.

It also starts at the diaphragm rather than the xiphoid: the last centimetre
above the xiphoid cuts the lungs at their base, where each is a thin crescent
whose medial edge has already swung out to the side, and measured there "the gap
between the lungs" is most of the chest.

## Lazy layers

Six of the seven layers load on demand, so every cavity declares a reference
chain and copes with its primary being absent.

| unloaded | consequence |
|---|---|
| muscle | the diaphragm is raised off the costal margin instead |
| organs | pleural sacs fall back to the hemithorax; mediastinum width from the vertebral bodies |
| circulatory | the pericardial sac occupies the lower mediastinum |

The synthesised diaphragm is not invented: its parameters were fitted against
the real `Diaphragm` mesh and reproduce its dome to about 28 mm RMS.

**No fake precision.** A cavity reasoned from something other than what defines
it reports `exact: false`, and the card says why — *"circulatory layer not
loaded — sac occupies the lower mediastinum, not measured from the heart"*.
Every cavity is derived from real meshes; they are not all derived equally well,
and saying so costs three lines.

## The surface grid

The nine regions and four quadrants are not sections and not cavities: they are
lines a clinician draws *on* a patient, so they are drawn on the patient.

Every boundary is a measured plane — midclavicular from the middle of each
clavicle, subcostal from the inferior border of the tenth costal cartilage,
transtubercular at L5, transumbilical at the L3/L4 junction, the costal margin
as a real per-x curve, the lower edge at the top of the pubic symphysis — and
every vertex sits on the body's own anterior surface, so the grid wraps the
belly and turns with the model.

The front surface takes anterior points only. Without that filter, a band with
no anterior structure in it — the belly, with only the skeleton loaded — has
nothing but lumbar vertebrae in its cells, and the "front" surface collapses
onto the spine, putting the grid inside the patient.

## Visualisation modes

A cavity is a space, so it is always behind something. The temptation is to
draw it bigger or let it punch through bone; both lie about where it is.
Instead the anatomy gives way, and the cavity keeps its true size and depth
ordering throughout.

| mode | what it does |
|---|---|
| Normal | cavities behind the anatomy, correctly occluded |
| Isolate | hides everything except the structures that define the cavity |
| Cutaway | lifts out whatever reaches in front of the cavity's mid-depth |
| X-ray | drops the soft-tissue layers, skeleton to 0.12 |
| Anatomy first | cavities drop back to a hint |

Fading alone is not enough: with every layer loaded there are ~2,900
overlapping surfaces, and forty of them at 16% alpha stack up to something
indistinguishable from solid. Hence isolate and x-ray hide rather than fade.

Cutaway tests each structure's *front edge* against the cavity's mid-depth, not
its centre — a rib wraps right round the chest, so its centre is level with the
middle of the cavity even though its costal end is well in front of it, and a
centre test hides nothing at all.

## Performance

Vertex extraction is cached per mesh; derived shapes are cached per cavity per
layer set. A cold build of all eight is ~150 ms, and rotation re-derives
nothing. The cache key is the set of loaded layers, so switching a layer on
invalidates exactly what it should.

## Verification

| script | checks |
|---|---|
| `work/landmark-check.mjs` | every landmark resolves against all seven GLBs |
| `work/cavity-probe.mjs` | the numbers are anatomically sensible (canal radius, dome asymmetry, cranial fit) |
| `work/build-check.mjs` | the relationships hold, with all layers and with the skeleton alone |

The build check is deliberately relational — "the pericardial sac is inside the
mediastinum, which is inside the thorax" — so it keeps its meaning if the model
is ever swapped for a different body.

Browser validation covered anterior, posterior, both laterals and free
rotation, with the turntable confirmed to carry skeleton, layers and overlays
on one rotation.

`sw.js` → v39; `bodymap.js?v=4`; `landmarks.js`, `cavity-geom.js` and
`cavity-build.js` added to the offline shell.

## Also corrected

The About dialog described five legacy BodyParts3D upper-limb GLBs as the
active source. It now describes the seven-layer set that is actually loaded,
explains that the overlays are measured rather than placed, and says the
`assets/bodyparts3d/` folder is left over and unused. The loading copy claimed
a CT-derived model and an upper-limb set; corrected too.
