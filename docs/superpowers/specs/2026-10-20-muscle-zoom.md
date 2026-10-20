# Muscle zoom — spec (2026-10-20)

## What

From the Viewer: tap a skeletal muscle, open its selection card (Explore on a
phone), press **Zoom inside**. The mode walks the slide's own "Organization of
muscle" (HSS2011 W1, `hss.msk.2026` p32) down to the contracting unit:

| Level | Shows | Labels (all checked on the page cited) |
| --- | --- | --- |
| The tapped muscle | the model's own mesh (BodyParts3D), cloned | its viewer name |
| Organization of muscle | the muscle cut open, tendon at one end | Tendon, Epimysium, Fascicles, Perimysium |
| Fascicle | fibers bundled in perimysium | Perimysium, Muscle fibers, Endomysium |
| Muscle fiber | one fiber cut open | Endomysium, Sarcolemma, Nuclei, Myofibrils, Sarcoplasmic Reticulum, T tubules |
| Myofibril | three banded sarcomeres | Sarcomere, A band, I band, H zone, Z disc |
| Sarcomere | the hexagonal thick/thin filament lattice | Thick filaments, Thin filaments, G-actins, Myosin head, Z disc, M line, Titin, A band, I band, H zone |
| Neuromuscular Junction (NMJ) | from the fiber level | Motor neuron, Axon terminal, Vesicles, Acetylcholine (ACh), Synaptic cleft, ACh receptors, Acetylcholinesterase (AChE), Motor end plate, Sarcolemma |

Myofibril and Sarcomere carry a **Relaxed muscle ↔ During contraction**
slider (and Play): filaments and the A band keep their length, the I bands and
H zone shorten, Z disc comes closer to Z disc — the summary on ABCT2326 Muscle
p27, nothing more.

Each label: the name, an optional one-line note that is the slide's words cut
(not rephrased), the cite line, and "In Revise" links to the HSS2011 W1 /
ABCT2326 W11 / HSS2011 W5 boxes of the same thing, shown only once the week
each subject shows has taught them.

## Sources

`hss.msk.2026` p32-34 (organisation, sarcomere, tendon); `phys.l9.2026` p7, 8,
14, 15, 17-19, 25-30, 32 (fiber, myofibril, bands, filaments, titin, G-actins,
myosin head, SR, T tubules, NMJ); `hss.l5.2026` p21 (vesicles). Figure-only
labels are not used (DECISIONS, "What on a slide counts as taught").
`work/muscle-zoom-check.mjs` (in `work/check.mjs`) holds every title, label,
note and quote to its page, every Revise link to a real box and every label to
a built part.

## Resources: looked for, then built

The owner prefers free online models to building. Searched 2026-10-20:
Sketchfab (downloadable, CC BY/CC0), NIH 3D, Wikimedia Commons, Smithsonian 3D,
RCSB PDB. The only sarcomere mesh found (Sketchfab "Sarcomere Model",
rgmz2015) is **CC BY-NC**, which the brief excludes; "Skeletal Muscle Cell
Anatomy" (_Bonehead14) and "Myocyte model" (rgmz2015) could not have their
licence pages read, and the build environment's proxy refused every model host
(only the npm registry is reachable), so nothing could be downloaded or
verified. A Mol* / PDB actomyosin view was rejected on size for a phone PWA.

So: **the whole muscle is reused** (the muscle layer's own BodyParts3D mesh,
already CC BY-SA and already cached), and **every level below it is
procedural three.js** (`outputs/muscle/zoom-scene.js`, ~25 KB of code, no model
file). Proportions are schematic and say so in the credit line.

## How it fits

- Third atlas mode beside Heart atlas and Limb vessels: lazy `import()` of the
  scene module, a snapshot on entry restored on exit, the shared
  `__osteo.exitHeartAtlas` hook, the same dock.
- Offline: the scene module and label data are in the SW shell (code only), so
  the mode opens offline as soon as the muscle layer has been opened once.
- Revise links cross the studio/study seam by an `osteo:revise-slot` event.
- Verified in Chromium (Playwright, SwiftShader) at 390×844 and 820×1180,
  online and offline after a first visit.

## Not done

No cross-bridge cycle animation (the slide's own video note on p25 says the
order of ADP release and power stroke differs between video and slides), no
troponin/tropomyosin model, no motor unit view. Add only from slide text.
