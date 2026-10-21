# Layout

What each folder and module is, and what each check guards. Moved out of
`CLAUDE.md` on 2026-10-20 (that file keeps only what every session needs).
Generated, always-current maps: `docs/CODEMAP.md` (code) and
`docs/DATA-INDEX.md` (data). `work/codemap-check.mjs` reads the part counts
stated below.

## Folders

| Path | What it is |
| --- | --- |
| `outputs/` | The app, deployed as-is — no build step. `radiography-study-studio.html` is now markup only (~360 lines); it pulls in `app.css`, then `studio.js` (3D studio) and `study.js` (study system) as two separate module scripts, in that order. They keep separate import scopes and talk only through `window.__osteo`. |
| `outputs/*.js` | Data modules, each imported with `?v=N` (see the SW SHELL rule below). Map is below. |
| `outputs/study/*.js` | The study system, 28 parts. `study.js` imports them in order, then calls their `init()`s — **nothing may run at module scope**, they import each other cyclically. Shared mutable UI state lives in `study/state.js` as `ui.*`; the studio's equivalent is its `state` object. |
| `outputs/study/briefing-access.js` | Keeps the separate read-only GitHub credential for the private weekly university notice. On upgrade it migrates only the old repo/token setting, removes the retired pack setting and deletes the old `rss-packs` IndexedDB. |
| `outputs/revision/` | The Revise data and pure logic. `rules.js` (the owner's rules as pure functions, shared by the app and `revision-check`), `fragments.js` (Threads, Tables, Decoder from sourced data), `cross-links.js` (a box in one subject linked to the same thing in the other), `viewer-units.js` (**generated** by `work/build-revision-units.mjs`: box id → the mesh-index unit a tap selects, used by "Show in the viewer" and by "In Revise" on the viewer's selection card; `revision-check` fails on drift), `weeks.js` (the week rule: `autoWeek`, `resolveWeek`, `pruneTree`, `visibleEdges`), `registry.js` (`REVISION[subject]`), `leaves.js` (leaf rows → nodes, links, tree), `hub.js` (the 3D hub layout), `link-rows.js` (one numbering for both views), `hss2011-leaves-w*.js` (leaf rows, read off the slides), `hss2011-*.js` (generated-from-the-reference nodes, edges, tree, threads, tables, decoder HTML; every fragment carries `data-wk`), and `vendor/` (d3, markmap-view, 3d-force-graph, loaded lazily by `study/revise.js`). `work/revision-check.mjs` guards it. Traps: `docs/TRAPS.md` "Revise". |

| `outputs/studio/*.js` | The 3D studio, 17 parts, same shape as `study/`. Its top level is indented inconsistently, so no text or brace rule can tell a top-level declaration from a nested one — `node work/toplevel.mjs <file>` asks V8 instead, and is the tool to use before touching its structure. |
| `outputs/heart/` | The Heart atlas mode's modules and data (BetterHeart; cavities, valves, coronary flow, conduction, echo). Reached **only** by a dynamic `import()` from `studio/heart-atlas.js`, so it loads on first entry into the mode. `heart-manifest.json`, `heart-meshes.bin` (CC BY-SA mesh data), and `MODEL-NOTICES.txt` are precached in the shell; the larger circulatory GLB remains first-use cached, so an offline first entry can still fail cleanly and restore the previous viewer state. Also the clinical scenarios (cath pressures, PCI, IVUS/OCT, rhythms and ablation, M-mode) -- ported modules are **generated** by `work/port-betterheart.mjs` (list: `VERSIONS` in `work/lib/bh-js.mjs`), English by `work/build-heart-i18n.mjs`; `work/sync-betterheart.mjs` follows the site's updates (see `docs/history/README-archive.md`, "Following the site"). A visual reference, not lessons. Traps: `docs/TRAPS.md`. The **limb vessels mode** (`studio/limb-atlas.js` + `outputs/limb/`: flow dots, whole-course highlight, camera regions, three leg interventions) follows the same pattern for BetterHeart's arm and leg pages; `work/sync-betterheart.mjs` follows all three pages. The layer rail's **Circulation extras** (`studio/circulation-extras.js`: flow dots, and the atlas heart as the Heart chip's heart) bring the same material to the normal Arterial/Venous/Heart layers. |
| `outputs/muscle/` | The **muscle zoom** mode's procedural levels (`zoom-scene.js`: organisation of muscle, fascicle, muscle fiber, myofibril, sarcomere lattice, neuromuscular junction), built in three.js because no openly licensed mesh could be fetched and verified. Reached **only** by a dynamic `import()` from `studio/muscle-zoom.js`, and precached in the shell (code, no model file), so the mode opens offline. The whole-muscle level is the muscle layer's own mesh, cloned. Labels: `outputs/muscle-zoom.js`. Spec: `docs/superpowers/specs/2026-10-20-muscle-zoom.md`. |
| `outputs/cell/` | The **cell zoom** mode's scenes: `zoom-scene.js` (a typical cell cut open, nucleus, the organisation of DNA, one nucleosome, the cell life cycle with mitosis, meiosis, protein synthesis with a hormone signal), `lecture-cells.js` (the plasma membrane, epithelium, blood, alveolus, parietal cell, spermatozoon, neuron, NK cell, antigen-presenting cell), `kit.js` (shared helpers), `nucleosome-3afa.js` (**generated** by `work/build-cell-nucleosome.mjs` from PDB 3AFA, CC0 — never edit it), and `models.js` + `models/*.glb` (**built** by `work/build-cell-models.mjs` and `work/blender/` — every level's 3D model, CC BY downloads and Blender, put on in place of the drawing once loaded; never edit a .glb, rebuild it). Reached **only** by a dynamic `import()` from `studio/cell-zoom.js`, precached in the shell. Labels: `outputs/cell-zoom.js`. Spec: `docs/superpowers/specs/2026-10-20-cell-zoom.md`. |
| `outputs/assets/physiology/*.json` | **Generated** — the curated routes for a layer (`work/build-physiology-paths.mjs`), one file per layer, fetched with the layer it belongs to and cached beside the GLB. Three kinds: a **pulse** route reuses the local tube frame for outward arterial swell; a **tube** route carries a local frame per vertex and drives the travelling constriction (organs); a **glow** route carries one number per vertex — how far along the structure it is — and drives the travelling light only (circulatory, nervous). Never hand-edit; `outputs/physiology-paths.js` is the generated manifest that names them and stamps the cache key. |
| `outputs/assets/*.glb` | The seven anatomical layers (skeleton, muscles, ligaments, organs, vessels, nerves, lymphatic), ~14 MB, lazy-loaded on demand. Quantized (`KHR_mesh_quantization`), which `work/glb-mesh.mjs` and `work/lib/mesh-names.mjs` decode — re-quantize a replacement with `npx @gltf-transform/cli quantize` and bump `MODEL_VERSION`, never `CACHE_VERSION`. Simplified once, offline, by `work/simplify-models.mjs` — never below a triangle floor, and never at the cost of a named mesh. Per-layer counts: `docs/DATA-INDEX.md`. |
| `docs/superpowers/` | Design specs (`specs/`) and implementation plans (`plans/`). Follow this pattern for new work. |
| `work/` | Node verifiers, run outside the browser. `load-check.mjs`, `syntax-check.mjs` are the after-every-edit set. Cavity-engine checks: `landmark-check.mjs`, `cavity-probe.mjs`, `build-check.mjs` (relational — hold with all layers and skeleton-only), `grid-probe.mjs` (the nine regions / four quadrants; run it with and without `--all`), plus `glb-bounds`/`glb-mesh`/`glb-names` helpers. `system-check.mjs` (every mesh of a split layer lands on a chip, no chip is empty, the classification survives the glued side letter the loader actually passes it, and the split agrees with `physiology.js`'s flow classes wherever both speak — two independently written classifiers holding each other honest), `search-probe.mjs` (the name index + synonyms + the source-derived tiering + the units every row resolves to), `region-probe.mjs` (the two region classifiers, lifted out of `studio.js` and run over the real GLB names), `shell-check.mjs` (walks the import graph transitively; every reachable module is precached under the same query), `ui-strings.mjs` (every sentence the interface can show — the net that catches a rename running over a string literal; a baseline), `binding-check.mjs` (every split part imports what it references — the net that catches a missing import, which loads clean and throws only when the code path runs), `toplevel.mjs` (asks V8 which names a module declares at top level, because indentation in `studio/` does not say), `gloss-coverage-check.mjs` (every word the reading help underlines resolves to a `TERM_GLOSS` entry — meaning plus non-empty Traditional Chinese — or is on the common-word stoplist; every singular/plural gloss pair carries the reciprocal `number` cue on both sides; a baseline, and it sweeps the Revise notes and reports untappable words as warnings, not failures), `text-size-check.mjs` (the text-size control: every content font size carries `* var(--ts)`, in the stylesheet AND in the templates that set one inline, with a stated list of chrome that deliberately does not scale — the list used to be the other way round and had rotted to 27 scaled against 198 not), `separation-check.mjs` (the exploded view: the offsets are idempotent under the re-application every layer load triggers, they collapse back to the bit, the slots are counted over the loaded layers rather than the fixed list, and the projection refuses to be taken over a separated body), `cut-level-check.mjs` (the named section levels in `studio/tools-and-capture.js` — every citation is on the page it names, using the SAME comparison as `source-check.mjs`; every level resolves and measures off the real GLB; the axial levels come out superior to inferior; and the measured sternal angle falls in the T4/T5 span the lecture claims), `schedule-check.mjs` (`outputs/schedule.js`: the assessment weights sum to 100, every session has a unique id, and every dated session falls in the teaching week it claims), `assessment-check.mjs` (the Course tab's deadline list and running mark — the weighted arithmetic against hand-worked cases including the two that break first, that every deadline is a real dated sourced session with its own id, and that the .ics comes out one well-formed VEVENT per dated session), `viewport-check.mjs` (the iOS bottom-band diagnosis, driven with readings no phone here can produce: the reported 402x874/812 case, a reload inside an already-shrunken app, a rotation, a browser tab and a keyboard — a false positive there flips the viewport on a healthy device, a false negative leaves the band), `source-check.mjs` (every source `SOURCE_FILES` lists really is on the drive — reads committed data, so it needs no drive), `bridge-check.mjs` (every `window.__osteo` call the study half makes is answered by the studio half — the one seam `binding-check` cannot see), The outside-reader loop, for material nobody has judged yet: `unread-manifest.mjs` (the work list, READABLE vs NEEDS-OCR) → `handoff-export.mjs` (plain .txt with `[[page N]]` markers, in byte-bounded batches, plus the extraction brief) → another AI reads it → `verify-notes.mjs` (re-reads every returned claim against the exact page it cites, using the SAME comparison as `source-check.mjs`, so passing here means the citation holds; `--selftest` proves the gate still catches). `simplify-models.mjs` (simplifies the seven GLBs offline and commits the result — per-primitive, never through the CLI's document-level pass, because that prunes a mesh simplified below three triangles and takes a named structure with it; a triangle floor per primitive, a per-layer error budget where a cavity is measured off the surface, and a name-set comparison that refuses to write; needs a one-off npm install, see its header). Generators: `build-course-terms.mjs` (needs the drive + `pdftotext`) then `build-mesh-index.mjs`; `build-source-catalogue.mjs` then `build-source-text.mjs` (both need the drive; `lib/doc-text.mjs` reads pdf/docx/pptx, `lib/source-resolve.mjs` decides WHICH copy a `SOURCE_FILES` entry means); shared GLB-name reading AND per-structure geometry (`boxesIn`, `measureStructures`) live in `lib/mesh-names.mjs`. `physiology-path-check.mjs` / `physiology-path-deform-check.mjs` / `physiology-path-model-check.mjs` (the routes: synthetic tubes with a KNOWN analytic answer for the welding, both gates and the frames — including that the two gates name the SAME reason on the same input, and that the weaker one accepts the short stub the stronger refuses; the constriction's Jacobian against a central difference of its own map, its normals against the deformed surface, and the exact zero-amplitude identity; then the real GLB — curated names resolve, quotes are on the pages they cite (one-based, the same indexing `source-check.mjs` uses), every refusal is refused BY NAME, every anchor is one the model puts against the mesh, independent landmarks and world height agree with the derived direction, a chained route begins exactly where its predecessor ends, a glow route ships nothing that could move a vertex, and the committed payload and its cache stamp match a fresh derivation byte for byte), `physiology-path-browser-check.js` (the same maps on a GPU: the real `PATH_SHAPE_GLSL` and `PATH_GLOW_*_GLSL` rendered into a float target, one pixel per vertex, against the reference — the only thing that can catch the GLSL and the JavaScript drifting apart, and the only thing that asserts advancing a glow route's phase moves the light and not the geometry). Generators: `build-physiology-paths.mjs` (the curated routes in `physiology-routes.json` into `outputs/assets/physiology/`; run it with no flag for the discovery report, `--write` to commit it). `build-cell-models.mjs` (prepare / finish) with `blender/` (`build.py` the levels that wear a download, `modelled.py` the ones modelled whole, `cellkit.py` shared helpers; run inside Blender) build `outputs/cell/models/`; needs a one-off npm install and Blender, see its header. `scan-output.txt` and `id-inventory-*.txt` are scratch. |
| `Uni/` | Legacy `.lnk` shortcuts to the retired Google Drive folders: outdated, do not use. Old sources are `E:\UNI sources` (docs/SOURCES.md). |

### `outputs/` data modules

| Module | What it holds |
| --- | --- |
| `programme.js` | The BSc (Hons) Radiography [55403] progression pattern, every subject by year/semester: code, title, level, credits, compulsory/elective, stream (`both`/`MI`/`RT`), `important`, and `chosenStream` (null until chosen). Source `prog.pattern` (the .xlsx in `E:\UNI sources`). Shown on Course > Programme. `work/programme-check.mjs` holds it to the sheet totals. |
| `anatomy-data.js` | `ANATOMY_DATABASE` (curated bone records), `MODEL_CATALOG` (per-layer coverage **and gaps**), `REGIONS`, search. |
| `bone-landmarks.js` | **Generated** close-view bone labels: course citations, reviewed mesh vertices and geometry signatures. Built by `work/build-bone-landmarks.mjs`; replacing the skeleton requires visual curation. See `docs/superpowers/specs/2026-10-04-viewer-bone-landmarks.md`. |
| `viewer-lecture-names.js` | **Generated** supplemental structure names from the user's current Human Anatomy PDFs, with file/page references and hashes. Built by `work/build-viewer-lecture-names.mjs`; `lectureRow` gives newly named meshes additional identities while preserving existing course IDs. Verified by `work/viewer-lecture-names-check.mjs` and the matching browser check. |
| `study/course-data.js` | What is left of the old corpus: `SOURCE_FILES` / `describeSource` (the source registry), `SUBJECTS` (code, title, accent) and `STRUCTURE_MODELS` (layer key → GLB). No items, questions or mastery. |
| `physiology.js` | Flow/layer classes, `FLOW_CIRCUITS` (how a travelling light is displayed along a curated route: `pulse` = one crest per heartbeat across a whole circuit, `drift` = fixed world wavelength and speed, `motor` = an arrival time for the nerve sequence), animation envelopes, `RATES`. |
| `physiology-path.js` | Pure rest-space route geometry: welded graph, geodesic field, the shared `progressField` both gates rest on, TWO discovery gates that accept or refuse a route by name — `derivePathRoute` for a tube (centreline fit, local frame, the travelling-constriction map and its Jacobian, `PATH_SHAPE_GLSL`) and the deliberately weaker `deriveProgressRoute` for a glow route (an ordering and nothing else, `progressBand` + the two `PATH_GLOW_*_GLSL` halves). The weaker gate names the four refusals it drops and why. No three.js, no DOM, so `work/` runs it. |
| `physiology-shape.js` | Pure rest-space shape derivation for the GPU deformation: `deriveShape` with a bounding-box fallback, `principalMuscleAxis` / `deriveMuscleShape` (a geometry-derived contraction axis for the named muscles, not an anatomical attachment), `muscleProfile` + `deformMuscle` + `MUSCLE_SHAPE_GLSL`, `deriveBreathingShape` / `deformBreathing`, and piece 3's chamber map: `chamberTetherField` (per-vertex samples of the one shared heart tether field) + `deformChamber` + `CHAMBER_SHAPE_GLSL` (written once, called by both shader patches). No three.js, no DOM. |
| `physiology-mechanics.js` | Source-backed motor/transmission sequences: `MECHANISM_SOURCES` (the cited pages), `MOTOR_ROUTES` + `motorRoute` / `motorSequence` (nerve→muscle arrival timing, display timings slowed), and `transmissionField` (per-vertex order along a nerve for the travelling activity). |
| `physiology-paths.js` | **Generated** — which layers have a route payload, where it lives, and the `?g=` stamp that makes a regenerated payload a new cache key. Rebuild with `node work/build-physiology-paths.mjs --write`; never hand-edit. |
| `study/reading-help.js` | Applies glossary and term lookup to Revise notes. |
| `wordparts.js`, `term-notes.js`, `term-gloss.js` | Terminology fold: root/prefix/suffix decomposition, pronunciation + plain-English notes, tappable glossary. |
| `sw.js` | Service worker. `CACHE_VERSION` + the SHELL list. |
| `mesh-index.js` | **Generated** — every named mesh in every GLB layer, side- and duplicate-collapsed, each carrying the course file that names it (or nothing) and the STUDY UNIT it resolves to. `UNITS` is what a tap can select. Counts live in `docs/DATA-INDEX.md`, never here. Rebuild with `node work/build-course-terms.mjs` then `node work/build-mesh-index.mjs`; never hand-edit. |
| `work/course-terms.json` | **Generated, committed** — which structures the HSS2011 / ABCT2326 taught and assessed material names, and where. Needs the drive to rebuild; `build-mesh-index.mjs` only reads it. |
| `work/source-catalogue.json` | **Generated, committed** — every document in the shared course folders: 8,801 distinct files (13,546 counting re-shares) across 46.9 GB and 28 shared folders. Never read it; ask `query.mjs file` / `where`. Rebuild with `build-source-catalogue.mjs` when the drive changes. |
| `work/source-text.json` | **Generated, committed** — the text of the cited sources (111 with usable text, 15 that would not extract), by page, so every page citation in the bone landmarks and section cuts is checkable with the drive unmounted. Ask `query.mjs text`. The set textbook and the publisher question bank are deliberately absent: this repo is public and they are not ours to republish. |
| `synonyms.js` | `SYNONYMS` (query expansion: collarbone→clavicle, esophagus→oesophagus, CN X→vagus), `COMPOSITES` (a name with no mesh but real parts — larynx, ossicles, eyeball), `NOT_MODELLED` (the three things genuinely absent). |
| `systems.js` | Which body SYSTEM a mesh belongs to inside its GLB layer. Four of the seven files draw more than one chip — the skeleton GLB draws Axial / Appendicular, the muscle GLB draws Muscles / Tendons & bursae, the circulatory GLB draws Arterial / Venous / Heart, the organ GLB draws Respiratory / Digestive / Urogenital / Endocrine — so the layer rail is fourteen chips over seven files. `SYSTEMS` is the rail; `systemsOf` classifies; `systemCounts` gives the numbers on a chip. Pure, so `work/system-check.mjs` runs the same rules over the real GLB names. **No rule may end in ``**: the loader sees `Eighth_ribl`, not `Eighth rib.l`. |
| `muscle-zoom.js` | The muscle zoom's levels, labels, one-line notes (the slide's own words, cut) and Revise boxes, each with the 2026 HSS2011 / ABCT2326 page and quote that names it, and the contraction slider's two ends. `work/muscle-zoom-check.mjs` holds every title, label, note and quote on its page, every Revise box to a real box, and every label to a part `muscle/zoom-scene.js` builds. |
| `cell-zoom.js` | The cell zoom's levels, labels, stage sliders (mitosis, meiosis, gene expression with a lipophilic or hydrophilic hormone, and the lecture processes), one-line notes and Revise boxes, each with its HSS2011 / ABCT2326 page and quote; `UNLABELLED` (terms drawn but not on a slide), `SHOW_IN_3D` (which Revise boxes open which level, stage and label) and `FALLBACK` (an older source used where the 2026 deck stops, with why). `work/cell-zoom-check.mjs` holds all of it to the page text. |
| `bodymap.js` | `SEARCH_EXTRAS` (atlas structures beyond the curated bone list, each → a named mesh in a system layer) + `BODY_CONCEPTS` (cavities/regions/quadrants/planes: names, aliases, blurbs, colour, containment hierarchy — **no geometry**). |
| `landmarks.js` | Semantic key → the meshes currently loaded. The resolver every cavity builder goes through. |
| `cavity-geom.js` | The overlay maths — percentile radius sweeps, height fields, plane slices, lofts, `torsoProfile` (the anterior surface the region grid is painted on). Pure (no three.js / DOM) so `work/` can check it. |
| `cavity-build.js` | One builder per cavity, written as its anatomical definition; measures the shape from the loaded meshes at build time. Also `measureGrid`/`gridBounds` for the nine regions and four quadrants. Planes are the exception — pure reference geometry, positioned as a fraction of body height. |


## Checks, and what each one guards

`node work/check.mjs` runs all of these that need no browser and no drive
(`--list` prints the exact list). The notes below say what each guards and when
it is REQUIRED.

```bash
node work/load-check.mjs        # REQUIRED for HTML edits — evaluates both inline
                                 # modules in node with stubbed browser globals.
                                 # Catches TDZ / load-time deaths that syntax checks
                                 # cannot (one shipped once and killed the whole app).
node work/syntax-check.mjs      # data-module syntax
node work/revision-check.mjs    # REQUIRED for outputs/revision/ — the week rule over the merged data, every leaf name on its slide page
node work/pages-workflow-check.mjs # every script pages.yml runs exists
node work/revise-pure-check.mjs # REQUIRED for revision/leaves.js, hub.js, link-rows.js — the merge, the 3D layout, the numbering
node work/shell-check.mjs       # every reachable module is precached, query and all
node work/heart-atlas-check.mjs # atlas geometry alignment, payload integrity and descriptions
node work/muscle-zoom-check.mjs # REQUIRED for outputs/muscle-zoom.js or outputs/muscle/ — every label, note
                                 # and title is on the slide page it cites; every label has a built part
node work/cell-zoom-check.mjs   # REQUIRED for outputs/cell-zoom.js or outputs/cell/ — the same, plus every stage,
                                 # signal and Show in 3D target, the nucleosome is PDB 3AFA whole, and every
                                 # level's model carries its parts and credits its downloads
node work/limb-check.mjs        # REQUIRED for outputs/limb/ data or alignment -- the limb frames fit the
                                 # circulatory layer and every route lies inside its vessel
node work/binding-check.mjs     # REQUIRED for study/ or studio/ edits — every part
                                 # imports the names it uses. A missing import loads
                                 # fine and throws only when that code path runs.
node work/search-probe.mjs      # index integrity, synonyms, tiering, units
node work/region-probe.mjs      # every skeleton mesh lands in the right region
node work/system-check.mjs      # REQUIRED for outputs/systems.js edits — every
                                 # mesh of a split layer lands on a chip, every
                                 # chip has meshes, the glued side-letter form
                                 # of every paired name classifies the same as
                                 # the dotted one, and the split agrees with
                                 # physiology.js's flow classes where both speak
node work/gloss-coverage-check.mjs # every underlined word has a gloss or is stoplisted;
                                 # every gloss has Chinese; singular/plural reciprocal cues
node work/codemap-check.mjs     # the map matches the code; TRAPS names real files
node work/data-index-check.mjs  # the data summary matches the data
node work/schedule-check.mjs    # REQUIRED for outputs/schedule.js edits — the
                                 # timetable's weights, ids and dates are consistent
                                 # exist, the weights sum to 100, and every
                                 # dated session sits in the week it claims
node work/separation-check.mjs  # REQUIRED for the layer separation in
                                 # outputs/studio/tools-and-capture.js — the
                                 # offset must be idempotent (loadExtraModel
                                 # re-applies it per layer) and must collapse
                                 # exactly, or the body drifts sideways out of
                                 # register with the skeleton every cavity is
                                 # measured against, permanently and plausibly
node work/cut-level-check.mjs   # REQUIRED for the named section levels — their
                                 # citations live in viewer code, so source-check
                                 # (which only checks the registry) cannot see them.
                                 # Also measures every level off the real GLB,
                                 # asserts the axial order, and holds the sternal
                                 # angle against the T4/T5 span the lecture claims
node work/build-bone-landmarks.mjs --check # reviewed curation matches the shipped labels
node work/bone-landmark-check.mjs # citations, real paired geometry and refusal on drift;
                                 # work/bone-landmark-browser-check.js covers the actual
                                 # depth sliders, close views, occlusion and spread in Chrome
node work/assessment-check.mjs  # REQUIRED for outputs/study/assessments-and-marks.js
                                 # and for the assessment rows in outputs/schedule.js
                                 # — the weighted mark is a number a student
                                 # makes decisions with, and a wrong denominator
                                 # looks exactly as plausible as a right one
node work/viewport-check.mjs    # REQUIRED for outputs/study/viewport-recovery.js
                                 # — nothing here runs on the affected device, so
                                 # this is the only thing standing between the
                                 # diagnosis and a recovery flip firing on a
                                 # healthy phone every time it is rotated
node work/physiology-heart-check.mjs # REQUIRED for the chamber tether:
                                     #   outputs/physiology-shape.js's
                                     #   chamberTetherField/deformChamber, the
                                     #   tether wiring in live-physiology.js, and
                                     #   anything that moves the heart classes —
                                     #   characterisation against the inline map it
                                     #   replaced, central-difference Jacobian,
                                     #   positive determinants (the fold gate), and
                                     #   the 283-pair acceptance that every seam
                                     #   holds at its rest gap. Radius/clamp live in
                                     #   live-physiology.js and MUST stay in sync.
node work/physiology-heart-discovery.mjs  # regenerates the measurements behind
                                          #   docs/superpowers/notes/2026-09-11-
                                          #   physiology-heart-evidence.md
node work/physiology-path-check.mjs        # REQUIRED for outputs/physiology-path.js,
node work/physiology-path-deform-check.mjs #   for FLOW_CIRCUITS, and for the
node work/physiology-path-model-check.mjs  #   peristalsis or route-glow shaders in
                                 # live-physiology.js. The first two
                                 # run the geometry against synthetic tubes whose
                                 # answer is known analytically; the third runs the
                                 # curated routes against the real GLB and against
                                 # the committed payload. Rebuilt a route or edited
                                 # work/physiology-routes.json? Run
                                 # `node work/build-physiology-paths.mjs --write`
                                 # first — the model check compares what shipped
                                 # against a fresh derivation and fails on drift.
node work/text-size-check.mjs   # REQUIRED for outputs/app.css and for any
                                 # template that sets a size inline — every
                                 # content font size scales with --ts, only the
                                 # listed chrome stays fixed, and the three
                                 # size steps stay far enough apart to feel distinct
node work/baseline.mjs --check  # the probes still say what they said
```
