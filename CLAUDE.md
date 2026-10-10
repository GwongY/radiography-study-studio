# Radiography Study Studio — working guide

Read `outputs/README.md` and `git log` before making changes; both are kept current.
Settled content decisions (subject scope, source substitutions, what was deliberately
left out) live there and in the coverage report — do not re-open them without new
source evidence.

## App Mission & Guiding Principles

This application is the student's **personal University study platform for HKPolyU Radiography Year 1 Semester 1**.

1. **Not an Osteology Studio**: The app is no longer just a 3D bone viewer. The 3D studio is preserved as an interactive visual reference tool, NOT an engine for artificially decomposing the skeleton into micro-lessons. Do not generate isolated standalone lessons for individual bones, bony landmarks, or single joint motions.
2. **Strict Syllabus & Timetable Alignment**: The curriculum strictly mirrors the user's university syllabus, weekly lectures, and tutorials across the 13-week teaching term for all enrolled subjects (HSS2011 Human Anatomy, ABCT2326 Human Physiology, HTI17103 Medical Radiation Science, APSS1A08 Sociology, DSAI1202 AI Literacy).
3. **Taught and Tested Only**: Unrelated lessons or artificial curriculum filler must NOT be produced. Content must strictly teach what is delivered in lectures and tutorials, and test what appears in revision exercises, quizzes, mid-term tests, and final exam papers.
4. **Source Precedence**:
   - **Primary**: Current 2026/27 confirmed documents (syllabi, teaching schedules, 2026 lecture slides in `New source/`).
   - **Support & Fallback**: Official older PolyU lecture slide decks, tutorial packets, and past examination papers where 2026 materials are not yet available. These are the **old sources**, held offline at `E:\UNI sources` (see "Old sources" below) — no longer the Google Drive shortcuts.
   - **Intake Procedure**: When new files arrive in `New source/`, follow the 6-step intake workflow in [`docs/superpowers/specs/2026-09-10-new-source-intake-workflow.md`](docs/superpowers/specs/2026-09-10-new-source-intake-workflow.md).

## Find things here first

**Read `docs/CODEMAP.md` before grepping.** Generated from the code's own banner
comments (`node work/codemap.mjs`), so it is always current: every section of the
app, its file, its line range, and a link to the traps that govern it.

| Want | Read | Not |
| --- | --- | --- |
| Where a behaviour lives | `docs/CODEMAP.md` | a grep sweep |
| What breaks when you edit file F | the `docs/TRAPS.md` section CODEMAP links | this file |
| What the model contains | `docs/DATA-INDEX.md`, then `node work/query.mjs` | `outputs/mesh-index.js` |
| What one structure or item says | `node work/query.mjs unit\|mesh\|item\|layer\|source <term>` | `outputs/study-data.js` |
| Whether a source file exists, and where | `node work/query.mjs file\|where <term>` | walking `G:` |
| What a source actually SAYS, and on which page | `node work/query.mjs text <term>` | opening the PDF |
| Why a decision was made | `outputs/README.md`, `git log` | reopening it |

`outputs/mesh-index.js`, `work/course-terms.json` and `work/source-catalogue.json`
are **generated** — never read or edit them, ask `work/query.mjs`. **Never walk
`G:` for a source**: minutes of network stats, and the catalogue already knows.

## Old sources: `E:\UNI sources`

The old (pre-2026) materials live in one organised offline collection,
`E:\UNI sources` (31.6 GiB, 9,668 files after the records clean-up; it was 66.8 GB, 17,380 files). It replaced the `Old source/` `.lnk`
shortcuts and the Drive walk. It is **local disk, so listing it is cheap** — the
`G:` warning above does not apply to it. It is read-only reference: do not move,
rename or delete anything in it unprompted. It was reorganised twice on request
(2026-10-02, folder moves only, journalled and undoable with
`_Organization Records\Reorganisation 2026-10-02\undo-reorganisation.mjs`); any further
change should be journalled the same way. `New source/` stays the home of 2026/27
material and wins on precedence; `E:` is the fallback.

Layout (reorganised 2026-10-02 to follow PolyU's degree structure; `E:\UNI sources\README.md`
explains it and lists the open decisions):

| Folder | Holds |
| --- | --- |
| `1 Radiography Programme` → `Year N` → `Sem N` → `<CODE Subject>` → material type | The programme's own subjects, plus `Clinical Placement`. Material type is one of `Notes`, `Exams`, `Labs`, `Assignments`, `Tutorials`, `References`, `Course Information`; dated sub-folders (`2019-2020`…) sit under that. `Midterm`/`Final` only where a course has both. |
| `2 GUR` | General University Requirements for students admitted **2022/23 or later**, as PolyU publishes them (checked 2026-10-02): `AIDA`, `Innovation and Entrepreneurship`, `Language` (`English`, `Chinese`), `Leadership`, `Service-Learning`, and the four Cluster Areas Requirement groups `CAR A Human Nature`, `CAR D Science Tech`, `CAR M Chinese Culture`, `CAR N Societies`. The old A/B/C/D scheme was replaced by A/D/M/N and B/C subjects re-coded (`APSS1B16` → `APSS1BN16`), so old B/C folders were matched to the official lists by code or title. `CAR Unlisted` holds 5 courses in no current list. **APSS1A08 Introduction to Sociology is under `CAR A`, not under Year 1.** Freshman Seminar is not a 2022/23+ GUR, so `HSS1010` is in Year 1 Sem 1; `ELC3626` and `CLC3265P` are discipline-specific and sit in Year 3. |
| `3 Other Subjects` | Subjects outside the programme or with no confirmed place (Optometry physiology, University Physics II, Applied Psychology, IT). |
| `4 Additional Radiography Subjects` | Legacy radiography curriculum (Radiography Studies I–VI, older Medical Imaging Studies, AP204). |
| `5 Reference Library` | Textbooks, papers, supplementary anatomy, software, postgraduate info. |
| `_Organization Records` | 12 MiB. The original provenance and process records were summarised into `E:\UNI sources\README.md` ("What the original organisation records said") and the rest moved to `E:\TO DELETE - UNI sources records` for the user to delete — never treat that folder as a source and do not delete it for them. The 29.4 GiB `Offline Originals` (other programmes' source packs, unique content) went the same way and the user has already deleted them. Kept: `Reorganisation 2026-10-02/` (plans, journals, before-manifests, verifications, `undo-reorganisation.mjs`), `current-file-index.csv` (SHA-256 of every file; **pre-reorganisation paths**), `provisional-placement-review.csv`, `offline-unavailable-sources.md`, `Provenance Links`, `Source Index Documents`. Translate old paths through `reorganisation-plan.json` then `reorganisation-plan-pass2.json`. |

Why the names are short (`2 GUR`, `CAR D Science Tech`): Windows is unreliable above
259 characters, and the official cluster names pushed 21 files over. The longest
study path is now 257. Keep new folder names short.

Where this semester's five subjects sit (old-source predecessors by course code —
the codes changed, so a lesson may cite a predecessor only as old-source support):

| 2026/27 subject | Old-source location |
| --- | --- |
| HSS2011 Human Anatomy | `1 Radiography Programme\Year 1\Sem 1\HSS2011 Human Anatomy` (730 files; 536 of them `Exams`) |
| ABCT2326 Human Physiology | `1 Radiography Programme\Year 1\Sem 1\ABCT2326 Human Physiology` (639; `Notes` has the lecture decks, `Labs`, `Exams`) |
| HTI17103 Medical Radiation Science | no folder under that code; nearest is `1 Radiography Programme\Year 1\Sem 1\HTI17101 Exploring Radiography` (61) — treat the match as unconfirmed |
| APSS1A08 Sociology | `2 GUR\CAR A Human Nature\APSS1A08 Introduction to Sociology` (22) |
| DSAI1202 AI Literacy | no folder under that code. It is PolyU's AIDA GUR; its predecessor is `2 GUR\AIDA\COMP1004 AI` (8; the files are titled "AIDA Quiz" / "AIDA main quiz 2023-24"), plus the loose `2 GUR\AIDA\AIDA (course code unspecified)` |

Completeness (checked 2026-10-02, against `work/source-catalogue.json`): 8,762 of
the 8,794 catalogued documents are on `E:` (7,278 by name and size, 1,470 by size
and extension where the file was renamed during organising, 14 zero-byte).
The 32 not found are 29 `New source/` files (expected — they are not old) and 3
4 KB OT Theory & Process placeholders from a non-radiography course. The
collection's own checks (`final-collection-hash-verification.json`, summarised in the E: README) report all
9,482 active files hash-verified and no missing targets. Known gaps it records: 6 linked folders, 11
linked files and 20 old Dropbox links were inaccessible (`offline-unavailable-sources.md`),
and 12 files carry provisional placements.

Tooling has **not** been repointed: `work/build-source-catalogue.mjs`,
`build-course-terms.mjs` and `source-resolve-check.mjs` still default to the `G:`
shortcuts and `Old source/`. The committed catalogue and `source-text.json` stay
valid, so nothing needs re-running; for a rebuild pass `--root "E:/UNI sources"`
(supported by `build-course-terms.mjs`) and check the result before committing.

`UNI sources/` inside the repo is an untracked partial copy (1.97 GB, 1,677 files)
of `E:`. It is gitignored: this repository is public and the material is not ours
to publish. Do not read from it in place of `E:`.

## Layout

| Path | What it is |
| --- | --- |
| `outputs/` | The app, deployed as-is — no build step. `radiography-study-studio.html` is now markup only (~360 lines); it pulls in `app.css`, then `studio.js` (3D studio) and `study.js` (study system) as two separate module scripts, in that order. They keep separate import scopes and talk only through `window.__osteo`. |
| `outputs/*.js` | Data modules, each imported with `?v=N` (see the SW SHELL rule below). Map is below. |
| `outputs/study/*.js` | The study system, 36 parts. `study.js` imports them in order, then calls their `init()`s — **nothing may run at module scope**, they import each other cyclically. Shared mutable UI state lives in `study/state.js` as `ui.*`; the studio's equivalent is its `state` object. |
| `outputs/study/question-pack.js` | Fetches a question pack from a PRIVATE repo (`GwongY/rss-packs`, one file per chapter behind an `index.json`) into its own IndexedDB, `rss-packs`. Licensed test-bank content: **never** in git, in `outputs/`, in the SW shell, in the answer log or in the progress export — only ids of the form `pack:<packId>:<qid>`. `work/.packs/` is gitignored; rebuild with `node work/build-question-pack.mjs --split`. Its own fine-grained token, read-only on that one repo, so an unlocked device cannot reach anything else. |
| `outputs/study/corpus/*.js` | The lesson corpus, 23 files. `study-data.js` is a barrel re-exporting them under the same 63 names, so nothing imports these directly. |
| `outputs/studio/*.js` | The 3D studio, 13 parts, same shape as `study/`. Its top level is indented inconsistently, so no text or brace rule can tell a top-level declaration from a nested one — `node work/toplevel.mjs <file>` asks V8 instead, and is the tool to use before touching its structure. |
| `outputs/heart/` | The Heart atlas mode's modules and data (BetterHeart; cavities, valves, coronary flow, conduction, echo). Reached **only** by a dynamic `import()` from `studio/heart-atlas.js`, so it loads on first entry into the mode; `heart-manifest.json` and `heart-meshes.bin` (CC BY-SA mesh data, see `MODEL-NOTICES.txt`) are cached lazily like the GLBs. A visual reference, not lessons. Traps: `docs/TRAPS.md`. |
| `outputs/assets/physiology/*.json` | **Generated** — the curated routes for a layer (`work/build-physiology-paths.mjs`), one file per layer, fetched with the layer it belongs to and cached beside the GLB. Three kinds: a **pulse** route reuses the local tube frame for outward arterial swell; a **tube** route carries a local frame per vertex and drives the travelling constriction (organs); a **glow** route carries one number per vertex — how far along the structure it is — and drives the travelling light only (circulatory, nervous). Never hand-edit; `outputs/physiology-paths.js` is the generated manifest that names them and stamps the cache key. |
| `outputs/assets/*.glb` | The seven anatomical layers (skeleton, muscles, ligaments, organs, vessels, nerves, lymphatic), ~14 MB, lazy-loaded on demand. Quantized (`KHR_mesh_quantization`), which `work/glb-mesh.mjs` and `work/lib/mesh-names.mjs` decode — re-quantize a replacement with `npx @gltf-transform/cli quantize` and bump `MODEL_VERSION`, never `CACHE_VERSION`. Simplified once, offline, by `work/simplify-models.mjs` — never below a triangle floor, and never at the cost of a named mesh. Per-layer counts: `docs/DATA-INDEX.md`. |
| `docs/superpowers/` | Design specs (`specs/`) and implementation plans (`plans/`). Follow this pattern for new work. |
| `work/` | Node verifiers, run outside the browser. `load-check.mjs`, `syntax-check.mjs`, `verify-modules.mjs` are the after-every-edit set. Cavity-engine checks: `landmark-check.mjs`, `cavity-probe.mjs`, `build-check.mjs` (relational — hold with all layers and skeleton-only), `grid-probe.mjs` (the nine regions / four quadrants; run it with and without `--all`), plus `glb-bounds`/`glb-mesh`/`glb-names` helpers. `system-check.mjs` (every mesh of a split layer lands on a chip, no chip is empty, the classification survives the glued side letter the loader actually passes it, and the split agrees with `physiology.js`'s flow classes wherever both speak — two independently written classifiers holding each other honest), `search-probe.mjs` (the name index + synonyms + the source-derived tiering + the study units every row resolves to), `region-probe.mjs` (the two region classifiers, lifted out of `studio.js` and run over the real GLB names), `shell-check.mjs` (walks the import graph transitively; every reachable module is precached under the same query), `corpus-snapshot.mjs` (a content hash of every export and every study item — the net that catches moved lesson wording), `ui-strings.mjs` (every sentence the interface can show — the net that catches a rename running over a string literal; both are baselines), `binding-check.mjs` (every split part imports what it references — the net that catches a missing import, which loads clean and throws only when the code path runs), `progress-log-check.mjs` (the append-only answer log in `outputs/study/progress-log.js` — that replaying it reproduces the live mastery record EXACTLY, that a union of two devices' logs is order-independent and deduplicates, and that the baseline cuts the replay where it claims; its last section drives the real `recordAttempt` rather than a synthetic log, because that is the only part that can see a bug in the recorder itself), `gist-sync-check.mjs` (the whole GitHub protocol driven through a stubbed `fetch` — that the token reaches the Authorization header and never a URL, a body or the gist itself; that the log's month buckets refuse a truncated read and rewrite only the month that changed; and the three reconcile outcomes, including the one that matters: a replacement device adopting a synced history and REBUILDING its records from the log), `toplevel.mjs` (asks V8 which names a module declares at top level, because indentation in `studio/` does not say), `figure-key-check.mjs` (every published figure/plate a lesson renders carries a well-formed `intro` + `key`, and every per-item `visuals[].focus` names a real callout mark on that figure), `gloss-coverage-check.mjs` (every word the reading help underlines resolves to a `TERM_GLOSS` entry — meaning plus non-empty Traditional Chinese — or is on the common-word stoplist; every singular/plural gloss pair carries the reciprocal `number` cue on both sides; a baseline, and it catches what `gloss-gap-scan` structurally cannot — a word made tappable only by a spurious word-part hit), `text-size-check.mjs` (the text-size control: every content font size carries `* var(--ts)`, in the stylesheet AND in the templates that set one inline, with a stated list of chrome that deliberately does not scale — the list used to be the other way round and had rotted to 27 scaled against 198 not), `separation-check.mjs` (the exploded view: the offsets are idempotent under the re-application every layer load triggers, they collapse back to the bit, the slots are counted over the loaded layers rather than the fixed list, and the projection refuses to be taken over a separated body), `cut-level-check.mjs` (the named section levels in `studio/tools-and-capture.js` — every citation is on the page it names, using the SAME comparison as `source-check.mjs`; every level resolves and measures off the real GLB; the axial levels come out superior to inferior; and the measured sternal angle falls in the T4/T5 span the lecture claims), `schedule-check.mjs` (`outputs/schedule.js` points at real units and real item ids, the assessment weights sum to 100, and every dated session falls in the teaching week it claims — a wrong id there loses a "Study this" button silently and nothing else in the repo would notice), `assessment-check.mjs` (the Course tab's deadline list and running mark — the weighted arithmetic against hand-worked cases including the two that break first, that every deadline is a real dated sourced session with its own id, and that the .ics comes out one well-formed VEVENT per dated session), `viewport-check.mjs` (the iOS bottom-band diagnosis, driven with readings no phone here can produce: the reported 402x874/812 case, a reload inside an already-shrunken app, a rotation, a browser tab and a keyboard — a false positive there flips the viewport on a healthy device, a false negative leaves the band), `source-check.mjs` (every source `SOURCE_FILES` cites really is on the drive, AND every quoted citation is on the page it names — reads committed data, so it needs no drive), `bridge-check.mjs` (every `window.__osteo` call the study half makes is answered by the studio half — the one seam `binding-check` cannot see), `coverage-gap.mjs` (what Semester 1 material the corpus has never read, compared by CONTENT not filename; needs the local text cache). The outside-reader loop, for material nobody has judged yet: `unread-manifest.mjs` (the work list, READABLE vs NEEDS-OCR) → `handoff-export.mjs` (plain .txt with `[[page N]]` markers, in byte-bounded batches, plus the extraction brief) → another AI reads it → `verify-notes.mjs` (re-reads every returned claim against the exact page it cites, using the SAME comparison as `source-check.mjs`, so passing here means it will still pass as a `sourceRef`; `--selftest` proves the gate still catches). `fetch-figure.mjs` (search Wikimedia Commons, and download a figure ONLY if its
licence is demonstrably free — author/licence/source are read from the same API
response that authorised the download, so the credit the app shows cannot drift
from the credit the licence requires; there is no override flag). `simplify-models.mjs` (simplifies the seven GLBs offline and commits the result — per-primitive, never through the CLI's document-level pass, because that prunes a mesh simplified below three triangles and takes a named structure with it; a triangle floor per primitive, a per-layer error budget where a cavity is measured off the surface, and a name-set comparison that refuses to write; needs a one-off npm install, see its header). Generators: `build-course-terms.mjs` (needs the drive + `pdftotext`) then `build-mesh-index.mjs`; `build-source-catalogue.mjs` then `build-source-text.mjs` (both need the drive; `lib/doc-text.mjs` reads pdf/docx/pptx, `lib/source-resolve.mjs` decides WHICH copy a `SOURCE_FILES` entry means); shared GLB-name reading AND per-structure geometry (`boxesIn`, `measureStructures`) live in `lib/mesh-names.mjs`. `build-question-pack.mjs` (the drive's question bank into a gitignored pack; `--split` writes one file per chapter because the GitHub Contents API stops returning content over 1 MB; reports per file what it could not parse rather than rounding it off), `pack-privacy-check.mjs` (the licensed half never leaves the device — written before the feature and watched to fail), `exam-check.mjs` (the paper builder and the marker, driven in node), `physiology-path-check.mjs` / `physiology-path-deform-check.mjs` / `physiology-path-model-check.mjs` (the routes: synthetic tubes with a KNOWN analytic answer for the welding, both gates and the frames — including that the two gates name the SAME reason on the same input, and that the weaker one accepts the short stub the stronger refuses; the constriction's Jacobian against a central difference of its own map, its normals against the deformed surface, and the exact zero-amplitude identity; then the real GLB — curated names resolve, quotes are on the pages they cite (one-based, the same indexing `source-check.mjs` uses), every refusal is refused BY NAME, every anchor is one the model puts against the mesh, independent landmarks and world height agree with the derived direction, a chained route begins exactly where its predecessor ends, a glow route ships nothing that could move a vertex, and the committed payload and its cache stamp match a fresh derivation byte for byte), `physiology-path-browser-check.js` (the same maps on a GPU: the real `PATH_SHAPE_GLSL` and `PATH_GLOW_*_GLSL` rendered into a float target, one pixel per vertex, against the reference — the only thing that can catch the GLSL and the JavaScript drifting apart, and the only thing that asserts advancing a glow route's phase moves the light and not the geometry). Generators: `build-physiology-paths.mjs` (the curated routes in `physiology-routes.json` into `outputs/assets/physiology/`; run it with no flag for the discovery report, `--write` to commit it). One-offs: `dense-lessons`, `gloss-gap-scan`, `dump-plain-candidates`. `scan-output.txt` and `id-inventory-*.txt` are scratch. |
| `Uni/` | Legacy `.lnk` shortcuts to the Google Drive source folders (resolve into `G:\.shortcut-targets-by-id\`). Superseded for old sources by `E:\UNI sources` — see "Old sources" above. |

### `outputs/` data modules

| Module | What it holds |
| --- | --- |
| `anatomy-data.js` | `ANATOMY_DATABASE` (curated bone records), `LANDMARK_HOTSPOTS`, `MODEL_CATALOG` (per-layer coverage **and gaps**), `REGIONS`, search. |
| `bone-landmarks.js` | **Generated** close-view bone labels: course citations, reviewed mesh vertices and geometry signatures. Built by `work/build-bone-landmarks.mjs`; replacing the skeleton requires visual curation. See `docs/superpowers/specs/2026-10-04-viewer-bone-landmarks.md`. |
| `viewer-lecture-names.js` | **Generated** supplemental structure names from the user's current Human Anatomy PDFs, with file/page references and hashes. Built by `work/build-viewer-lecture-names.mjs`; `lectureRow` gives newly named meshes additional identities while preserving existing course IDs. Verified by `work/viewer-lecture-names-check.mjs` and the matching browser check. |
| `study-data.js` | **Barrel** over `study/corpus/*.js` — the lesson corpus, `STRUCTURE_MODELS` (layer key → GLB), `validateCorpus()`. Re-exports by name, never `export *`: the corpus files share item arrays with each other that are not public API. |
| `physiology.js` | Flow/layer classes, `FLOW_CIRCUITS` (how a travelling light is displayed along a curated route: `pulse` = one crest per heartbeat across a whole circuit, `drift` = fixed world wavelength and speed, `motor` = an arrival time for the nerve sequence), animation envelopes, `RATES`. |
| `physiology-path.js` | Pure rest-space route geometry: welded graph, geodesic field, the shared `progressField` both gates rest on, TWO discovery gates that accept or refuse a route by name — `derivePathRoute` for a tube (centreline fit, local frame, the travelling-constriction map and its Jacobian, `PATH_SHAPE_GLSL`) and the deliberately weaker `deriveProgressRoute` for a glow route (an ordering and nothing else, `progressBand` + the two `PATH_GLOW_*_GLSL` halves). The weaker gate names the four refusals it drops and why. No three.js, no DOM, so `work/` runs it. |
| `physiology-shape.js` | Pure rest-space shape derivation for the GPU deformation: `deriveShape` with a bounding-box fallback, `principalMuscleAxis` / `deriveMuscleShape` (a geometry-derived contraction axis for the named muscles, not an anatomical attachment), `muscleProfile` + `deformMuscle` + `MUSCLE_SHAPE_GLSL`, `deriveBreathingShape` / `deformBreathing`, and piece 3's chamber map: `chamberTetherField` (per-vertex samples of the one shared heart tether field) + `deformChamber` + `CHAMBER_SHAPE_GLSL` (written once, called by both shader patches). No three.js, no DOM. |
| `physiology-mechanics.js` | Source-backed motor/transmission sequences: `MECHANISM_SOURCES` (the cited pages), `MOTOR_ROUTES` + `motorRoute` / `motorSequence` (nerve→muscle arrival timing, display timings slowed), and `transmissionField` (per-vertex order along a nerve for the travelling activity). |
| `physiology-paths.js` | **Generated** — which layers have a route payload, where it lives, and the `?g=` stamp that makes a regenerated payload a new cache key. Rebuild with `node work/build-physiology-paths.mjs --write`; never hand-edit. |
| `visual-data.js`, `schematics.js`, `figures.js`, `layouts.js` | Lesson visuals. `figures.js` / `visual-data.js` `PLATES` — published images, each with an `intro` line and a callout `key` (`{mark,name,beyond?}`) so the lesson teaches from the image; `beyond` = a callout the lesson's sources don't name, read off the figure's own labelling, rendered dimmed. `work/figure-key-check.mjs` enforces this. |
| `wordparts.js`, `term-notes.js`, `term-gloss.js` | Terminology fold: root/prefix/suffix decomposition, pronunciation + plain-English notes, tappable glossary. |
| `sw.js` | Service worker. `CACHE_VERSION` + the SHELL list. |
| `mesh-index.js` | **Generated** — every named mesh in every GLB layer, side- and duplicate-collapsed, each carrying the course file that names it (or nothing) and the STUDY UNIT it resolves to. `UNITS` is what a tap can select. Counts live in `docs/DATA-INDEX.md`, never here. Rebuild with `node work/build-course-terms.mjs` then `node work/build-mesh-index.mjs`; never hand-edit. |
| `work/course-terms.json` | **Generated, committed** — which structures the HSS2011 / ABCT2326 taught and assessed material names, and where. Needs the drive to rebuild; `build-mesh-index.mjs` only reads it. |
| `work/source-catalogue.json` | **Generated, committed** — every document in the shared course folders: 8,801 distinct files (13,546 counting re-shares) across 46.9 GB and 28 shared folders. Never read it; ask `query.mjs file` / `where`. Rebuild with `build-source-catalogue.mjs` when the drive changes. |
| `work/source-text.json` | **Generated, committed** — the text of the cited sources (111 with usable text, 15 that would not extract), by page, so every `sourceRefs` page citation is checkable with the drive unmounted. Ask `query.mjs text`. The set textbook and the publisher question bank are deliberately absent: this repo is public and they are not ours to republish. |
| `synonyms.js` | `SYNONYMS` (query expansion: collarbone→clavicle, esophagus→oesophagus, CN X→vagus), `COMPOSITES` (a name with no mesh but real parts — larynx, ossicles, eyeball), `NOT_MODELLED` (the three things genuinely absent). |
| `systems.js` | Which body SYSTEM a mesh belongs to inside its GLB layer. Three of the seven files draw more than one chip — the skeleton GLB draws Axial / Appendicular, the circulatory GLB draws Arterial / Venous / Heart, the organ GLB draws Respiratory / Digestive / Urogenital / Endocrine — so the layer rail is thirteen chips over seven files. `SYSTEMS` is the rail; `systemsOf` classifies; `systemCounts` gives the numbers on a chip. Pure, so `work/system-check.mjs` runs the same rules over the real GLB names. **No rule may end in ``**: the loader sees `Eighth_ribl`, not `Eighth rib.l`. |
| `bodymap.js` | `SEARCH_EXTRAS` (atlas structures beyond the curated bone list, each → a named mesh in a system layer) + `BODY_CONCEPTS` (cavities/regions/quadrants/planes: names, aliases, blurbs, colour, containment hierarchy — **no geometry**). |
| `landmarks.js` | Semantic key → the meshes currently loaded. The resolver every cavity builder goes through. |
| `cavity-geom.js` | The overlay maths — percentile radius sweeps, height fields, plane slices, lofts, `torsoProfile` (the anterior surface the region grid is painted on). Pure (no three.js / DOM) so `work/` can check it. |
| `cavity-build.js` | One builder per cavity, written as its anatomical definition; measures the shape from the loaded meshes at build time. Also `measureGrid`/`gridBounds` for the nine regions and four quadrants. Planes are the exception — pure reference geometry, positioned as a fraction of body height. |

## Run

```bash
node work/dev-server.mjs        # static server on port 8420
```

Then `http://localhost:8420/radiography-study-studio.html`. ES modules need http://,
never file://. `work/dev-server.mjs` is what `.claude/launch.json` starts, and it
sends `Cache-Control: no-store` for the reason docs/TRAPS.md records — do not swap
it for a plain static server. Use real Chrome for install/offline behaviour; the
in-app Browser pane freezes animations. The pane DOES register the service worker,
so after editing a module there, unregister it and clear caches or you are testing
the last CACHE_VERSION rather than your edit.

## Hard rules

- **Source traceability.** Every factual study claim must cite a `sourceRefs` entry
  keyed to a file that actually exists in the supplied source folders — checked by
  `source-check.mjs`. No internet research, no generic textbook expansion, no
  invented syllabus. App-authored memory aids are fine but must be tagged as such.
  `validateCorpus()` must stay at zero failures.
- **Taught & tested syllabus scope.** Lessons must correspond strictly to real lecture topics,
  tutorial case studies/problems, and examination scope. No synthetic micro-lessons
  (e.g. generating individual lessons for every bone or movement) and no unverified
  curriculum expansion.
- **No build step, no framework, no bundler.** Plain HTML + vanilla ES modules is a
  product constraint, not an oversight.
- **Patch `radiography-study-studio.html` directly.** Never re-run the old scratchpad
  `build.py` — it regenerates from an older template and wipes later work.

## After every edit

```bash
node work/load-check.mjs        # REQUIRED for HTML edits — evaluates both inline
                                 # modules in node with stubbed browser globals.
                                 # Catches TDZ / load-time deaths that syntax checks
                                 # cannot (one shipped once and killed the whole app).
node work/syntax-check.mjs      # data-module syntax
node work/verify-modules.mjs    # data-module imports resolve
node work/shell-check.mjs       # every reachable module is precached, query and all
node work/binding-check.mjs     # REQUIRED for study/ or studio/ edits — every part
                                 # imports the names it uses. A missing import loads
                                 # fine and throws only when that code path runs.
node work/progress-log-check.mjs # REQUIRED for progress-log.js, for the mastery
                                 # scheduler, or for any call site that records an
                                 # attempt — a replay of the log must reproduce the
                                 # live record exactly, or a rebuild corrupts rather
                                 # than repairs. docs/TRAPS.md has the float that
                                 # broke it once.
node work/gist-sync-check.mjs   # REQUIRED for gist-sync.js and for the merge
                                 # functions in moving-progress-between.js. Runs the
                                 # protocol against a stubbed fetch, so it is the only
                                 # check on the network path — and the only guard that
                                 # a refactor has not put the token somewhere it is
                                 # written down.
node work/search-probe.mjs      # index integrity, synonyms, tiering, study units
node work/region-probe.mjs      # every skeleton mesh lands in the right region
node work/system-check.mjs      # REQUIRED for outputs/systems.js edits — every
                                 # mesh of a split layer lands on a chip, every
                                 # chip has meshes, the glued side-letter form
                                 # of every paired name classifies the same as
                                 # the dotted one, and the split agrees with
                                 # physiology.js's flow classes where both speak
node work/figure-key-check.mjs  # every figure/plate a lesson shows has intro + key
node work/visuals-check.mjs      # every item.visuals[] entry resolves to a real
                                 # figure/plate/schematic/layer; --selftest proves
                                 # the gate still bites
node work/gloss-coverage-check.mjs # every underlined word has a gloss or is stoplisted;
                                 # every gloss has Chinese; singular/plural reciprocal cues
node work/dup-audit.mjs         # REQUIRED for any study-item or visual edit — one owner
                                 # per image (no figure/plate/schematic shown by two
                                 # lessons, no model spec reused across units), and no
                                 # VERBATIM duplicated sentence within an item, within a
                                 # unit, or across units. Near-duplicates (0.8–0.99) are
                                 # reported, not failed — a one-line restatement of a key
                                 # fact as the teaching takeaway is legitimate pedagogy.
                                 # Deliberate repeats live in ALLOWED / TEMPLATE_TEXT with
                                 # written reasons; --report <path> writes the full
                                 # markdown audit, --flags prints the failing set
node work/array-integrity-check.mjs # REQUIRED for outputs/study/corpus/*.js edits —
                                 # catches orphaned array elements (broad find/replaces
                                 # deleting content down to blank lines) and malformed
                                 # syllabusRef / src reference objects; --selftest proves
                                 # the gates bite
node work/codemap-check.mjs     # the map matches the code; TRAPS names real files
node work/data-index-check.mjs  # the data summary matches the data
node work/schedule-check.mjs    # REQUIRED for outputs/schedule.js edits — the
                                 # timetable points at units and item ids that
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
                                 # (which walks STUDY_ITEMS only) cannot see them.
                                 # Also measures every level off the real GLB,
                                 # asserts the axial order, and holds the sternal
                                 # angle against the T4/T5 span the lecture claims
node work/build-bone-landmarks.mjs --check # reviewed curation matches the shipped labels
node work/bone-landmark-check.mjs # citations, real paired geometry and refusal on drift;
                                 # work/bone-landmark-browser-check.js covers the actual
                                 # depth sliders, close views, occlusion and spread in Chrome
node work/pack-privacy-check.mjs # REQUIRED for outputs/study/question-pack.js and
                                 # for buildProgressExport — the only thing
                                 # asserting that no licensed question text
                                 # reaches outputs/, the SW shell, the export or
                                 # the answer log. Mutate it and watch it fail
                                 # before trusting a green run
node work/exam-check.mjs        # REQUIRED for outputs/study/exam-mode.js — a
                                 # paper's mark is a number a student acts
                                 # on, and blank against wrong is the
                                 # distinction that decides what they do
                                 # next. The builder and the marker are pure,
                                 # so this drives them without a browser
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
                                 # steps stay far enough apart to feel like steps
node work/baseline.mjs --check  # the probes still say what they said
```

- Added, moved or renamed a section banner, a file, or an export? Run
  `node work/codemap.mjs` and commit `docs/CODEMAP.md` — the check fails until you do.
- Changed a study item, a synonym, a `COMPOSITE`, or rebuilt `mesh-index.js`? Run
  `node work/data-index.mjs` and commit `docs/DATA-INDEX.md` — likewise.
- **Another session may be editing this tree.** `git fetch` before pushing, and
  `git status` for files you did not touch before running `codemap.mjs`,
  `data-index.mjs` or `baseline.mjs` — regenerating sweeps their unfinished work
  into your commit, and can paper over a check that is red for their reasons.
- **Line endings differ.** `outputs/` and this file are CRLF; `work/*.mjs` is LF.
  A patch script matching on `
` finds nothing in the CRLF files and reports
  success having changed neither.
- A trap you learn the hard way goes in `docs/TRAPS.md`, under the file it
  governs — not here. This file is loaded into every session; that one is read
  only by a session working in that file.
- Any shell change (HTML, `app.css`, any JS module) → bump `CACHE_VERSION` in `sw.js`.
- **The cache key is the whole URL, query and all.** Every module reachable from
  the app, at any depth, must be in the SW SHELL under the *identical* specifier
  it is imported by — a mismatch is a 404 that appears only offline, the one
  condition this app is built for. `shell-check.mjs` walks the import graph and
  enforces it. A file imported both with and without a query needs **both**.
- Touched `mesh-index.js`? Rerun `node work/build-mesh-index.mjs` rather than
  editing it, then `node work/search-probe.mjs`.
- Added or renamed a `SOURCE_FILES` entry? Run `node work/source-check.mjs` — it
  is the only mechanical enforcement the source-traceability rule has.

## Git / deploy

Branch is `master`. On 2026-10-03 the owner returned to public GitHub Pages after
trying owner-only Sites hosting. The repository is public again and
`.github/workflows/pages.yml` verifies changes before publishing `outputs/`.
Pushing master updates https://gwongy.github.io/radiography-study-studio/.
No Google Cloud project or server is involved. A weekly briefing of the owner's
university email is written by a local scheduled task and pushed with
`work/weekly-briefing.mjs` to the PRIVATE pack repository; Today reads it with the
pack token (`study/weekly-briefing.js`). **This repository is public: no email
text, names, addresses or student details in commits, `outputs/`, docs or commit
messages** — plaintext lives only in ignored `work/.briefing/`. Commits use the
GitHub noreply address (repo-local `user.email`). The previous Sites publication
is a separate snapshot; see `docs/PRIVATE-HOSTING.md`.

What `master` carries is `git log --oneline` — not repeated here, because a
changelog in the one file every session loads is one that goes stale unread.
