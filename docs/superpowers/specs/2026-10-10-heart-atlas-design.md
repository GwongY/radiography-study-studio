# Heart atlas — BetterHeart heart detail inside the main 3D scene

Date: 2026-10-10. Status: design approved in chat, awaiting spec review.

## Goal

Bring the heart-specific teaching material of
https://skypray.synology.me/betterheart/heart-anatomy/ (© 黃天祈醫師, BetterHeart)
into the explorer's own 3D scene as a **Heart atlas mode**, as a visual
reference tool. It adds no study items and no lessons (see CLAUDE.md, "Not an
Osteology Studio" and "Taught and Tested Only").

The owner states they have permission to copy the site's code and assets.

## What is already in the explorer, and what is new

BetterHeart's walls, vessels, coronaries and papillary muscles are a subset of
`dolasim.glb` (their `MODEL-NOTICES.txt`), which is the explorer's circulatory
layer. Those are **not** imported a second time as new content. New to the
explorer:

| Brought in | Source file(s) |
| --- | --- |
| Four chamber cavities (LV, RV, RA, LA) and two anterior AV leaflets (BodyParts3D FJ2420–FJ2425) | `heart-meshes.bin`, `heart-manifest.json` |
| Moving valve leaflets, annulus rings, chordae, papillary tip deformation | `valve-surfaces.js`, `valve-rings.js`, `valve-apparatus.js`, `transvalvular-flow.js` |
| Coronary flow tracers | `coronary-flow.js`, `coronary-routes.js` (CC BY-SA 4.0) |
| Conduction system, SA node to Purkinje | `conduction.js` |
| Cardiac-cycle clock and schematic ECG | `cardiac-cycle.js`, `heartbeat.js`, `heart-motion.js` |
| TTE/TEE section simulator | `echo-sim.js` |
| View presets, scenario presets (natural, four-chamber colours, coronaries, motion, conduction, echo) | parts of `heart.js` |

**Out of scope** (owner's choice): PCI, TAVI, ASD closure and mitral balloon
simulators (`pci-sim.js`, `tavi-sim.js`, `asd-sim.js`, `ptmc-sim.js`).

## Design

### 1. Alignment
`heart-manifest.json` carries `alignment: {scale, shift}`, the transform from
`dolasim.glb` units to the BetterHeart frame. The inverse, followed by the body
transform `loadExtraModel` applies (`state.bodyTransform`), puts the atlas group
on the explorer's heart. A node check (`work/heart-atlas-check.mjs`) compares the
transformed bounds of the manifest's wall and vessel meshes against the same
named meshes in `outputs/assets/dolasim.glb` and fails above a stated tolerance.
At run time the loader refuses to show the atlas if that comparison fails.

### 2. Heart atlas mode
A toggle in the viewer adds one `THREE.Group` to the studio scene. While on:

- the explorer's own heart-system and coronary meshes in the circulatory layer
  are hidden, and restored on exit;
- every other layer, the cut and spread tools, search and picking are unchanged;
- `live-physiology.js` is not edited. The tether shader keeps animating the
  hidden meshes' classes untouched; the atlas runs its own cardiac clock.

Reason: the cavities, leaflets, conduction layer and echo planes assume
BetterHeart's deformation. Running it beside the tether shader would draw two
hearts beating out of step.

### 3. Refactor of their code
`heart.js` owns a page, renderer, camera, OrbitControls and a sidebar with
fixed element ids. It is split into:

- a **scene builder** that takes the group and the loaded manifest and returns
  `{ update(dt, state), setMode(...), dispose() }`;
- a **panel** rendered into the viewer's existing controls, with English first
  and Traditional Chinese as the gloss, and no use of their element ids;
- **echo-sim.js** with its camera and canvas supplied by the host.

The modules import `three` through the page's import map (0.161.0), not their
vendored 0.180.0. Anything that differs between the two versions is found by
the load check and the browser check and fixed in our copy.

### 4. Files, caching, licence
- New files live in `outputs/heart/`. Mesh data and manifest are lazy-loaded on
  first entry into the mode and cached beside the GLBs, with a version key like
  `MODEL_VERSION`.
- Every module is in the service-worker SHELL under the identical specifier it
  is imported by; `CACHE_VERSION` is bumped; `shell-check.mjs` must pass.
- `outputs/THIRD-PARTY-NOTICES.txt` gains BetterHeart's `MODEL-NOTICES.txt`
  content: CC BY-SA 4.0 for the mesh data and `coronary-routes.js`, CC BY-SA
  2.1 JP for BodyParts3D, MIT for three.js, and a line recording that the
  site's code carries no stated licence and is included with the owner's
  permission. The credit also appears in the panel.
- Labels and captions that come from BetterHeart are attributed to it and are
  not turned into lesson content or `sourceRefs`.

### 5. Verification
Existing checks after every edit (`load-check`, `syntax-check`,
`verify-modules`, `shell-check`, `binding-check`, `bridge-check`, then
`codemap.mjs`). New: `heart-atlas-check.mjs` (alignment, manifest integrity,
every manifest mesh index in range of the `.bin`). Browser check in Chrome:
enter and leave the mode, confirm the original heart returns, the clock and
ECG run, the echo sections render, no console errors, and the mode does not
change anything in the other layers.

## Risks

- The alignment may not reproduce the dolasim frame exactly, in which case the
  atlas will not sit on the body. This is the first thing built and checked.
- Their minified code is coupled to their DOM and to hard-coded frame
  constants (for example `deformCoordinates` in `heartbeat.js`). The refactor
  keeps their frame and moves the whole group instead of rewriting constants.
- three 0.161 against 0.180 API differences.
- The working tree holds another session's uncommitted edits (`sw.js`,
  `CODEMAP.md`, `app.css` and others); commits stage only the files this work
  touches, and regeneration of `CODEMAP.md` is checked against `git status` first.
