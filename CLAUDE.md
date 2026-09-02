# Radiography Study Studio — working guide

Read `outputs/README.md` and `git log` before making changes; both are kept current.
Settled content decisions (subject scope, source substitutions, what was deliberately
left out) live there and in the coverage report — do not re-open them without new
source evidence.

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

## Layout

| Path | What it is |
| --- | --- |
| `outputs/` | The app, deployed as-is — no build step. `radiography-study-studio.html` is now markup only (~360 lines); it pulls in `app.css`, then `studio.js` (3D studio) and `study.js` (study system) as two separate module scripts, in that order. They keep separate import scopes and talk only through `window.__osteo`. |
| `outputs/*.js` | Data modules, each imported with `?v=N` (see the SW SHELL rule below). Map is below. |
| `outputs/study/*.js` | The study system, 25 parts. `study.js` imports them in order, then calls their `init()`s — **nothing may run at module scope**, they import each other cyclically. Shared mutable UI state lives in `study/state.js` as `ui.*`; the studio's equivalent is its `state` object. |
| `outputs/study/corpus/*.js` | The lesson corpus, seventeen files. `study-data.js` is a barrel re-exporting them under the same 57 names, so nothing imports these directly. |
| `outputs/studio/*.js` | The 3D studio, 9 parts, same shape as `study/`. Its top level is indented inconsistently, so no text or brace rule can tell a top-level declaration from a nested one — `node work/toplevel.mjs <file>` asks V8 instead, and is the tool to use before touching its structure. |
| `outputs/assets/*.glb` | The seven anatomical layers (skeleton, muscles, ligaments, organs, vessels, nerves, lymphatic), ~39 MB, lazy-loaded on demand. Per-layer counts: `docs/DATA-INDEX.md`. |
| `docs/superpowers/` | Design specs (`specs/`) and implementation plans (`plans/`). Follow this pattern for new work. |
| `work/` | Node verifiers, run outside the browser. `load-check.mjs`, `syntax-check.mjs`, `verify-modules.mjs` are the after-every-edit set. Cavity-engine checks: `landmark-check.mjs`, `cavity-probe.mjs`, `build-check.mjs` (relational — hold with all layers and skeleton-only), `grid-probe.mjs` (the nine regions / four quadrants; run it with and without `--all`), plus `glb-bounds`/`glb-mesh`/`glb-names` helpers. `search-probe.mjs` (the name index + synonyms + the source-derived tiering + the study units every row resolves to), `region-probe.mjs` (the two region classifiers, lifted out of `studio.js` and run over the real GLB names), `shell-check.mjs` (walks the import graph transitively; every reachable module is precached under the same query), `corpus-snapshot.mjs` (a content hash of every export and every study item — the net that catches moved lesson wording), `ui-strings.mjs` (every sentence the interface can show — the net that catches a rename running over a string literal; both are baselines), `binding-check.mjs` (every split part imports what it references — the net that catches a missing import, which loads clean and throws only when the code path runs), `toplevel.mjs` (asks V8 which names a module declares at top level, because indentation in `studio/` does not say), `figure-key-check.mjs` (every published figure/plate a lesson renders carries a well-formed `intro` + `key`), `schedule-check.mjs` (`outputs/schedule.js` points at real units and real item ids, the assessment weights sum to 100, and every dated session falls in the teaching week it claims — a wrong id there loses a "Study this" button silently and nothing else in the repo would notice), `source-check.mjs` (every source `SOURCE_FILES` cites really is on the drive, AND every quoted citation is on the page it names — reads committed data, so it needs no drive), `bridge-check.mjs` (every `window.__osteo` call the study half makes is answered by the studio half — the one seam `binding-check` cannot see), `coverage-gap.mjs` (what Semester 1 material the corpus has never read, compared by CONTENT not filename; needs the local text cache). The outside-reader loop, for material nobody has judged yet: `unread-manifest.mjs` (the work list, READABLE vs NEEDS-OCR) → `handoff-export.mjs` (plain .txt with `[[page N]]` markers, in byte-bounded batches, plus the extraction brief) → another AI reads it → `verify-notes.mjs` (re-reads every returned claim against the exact page it cites, using the SAME comparison as `source-check.mjs`, so passing here means it will still pass as a `sourceRef`; `--selftest` proves the gate still catches). Generators: `build-course-terms.mjs` (needs the drive + `pdftotext`) then `build-mesh-index.mjs`; `build-source-catalogue.mjs` then `build-source-text.mjs` (both need the drive; `lib/doc-text.mjs` reads pdf/docx/pptx, `lib/source-resolve.mjs` decides WHICH copy a `SOURCE_FILES` entry means); shared GLB-name reading AND per-structure geometry (`boxesIn`, `measureStructures`) live in `lib/mesh-names.mjs`. One-offs: `dense-lessons`, `gloss-gap-scan`, `dump-plain-candidates`. `scan-output.txt` and `id-inventory-*.txt` are scratch. |
| `Uni/` | `.lnk` shortcuts to the Google Drive source folders. They resolve into `G:\.shortcut-targets-by-id\` — enumerate that directory, don't trust the shortcut list alone. |

### `outputs/` data modules

| Module | What it holds |
| --- | --- |
| `anatomy-data.js` | `ANATOMY_DATABASE` (curated bone records), `LANDMARK_HOTSPOTS`, `MODEL_CATALOG` (per-layer coverage **and gaps**), `REGIONS`, search. |
| `study-data.js` | **Barrel** over `study/corpus/*.js` — the lesson corpus, `STRUCTURE_MODELS` (layer key → GLB), `validateCorpus()`. Re-exports by name, never `export *`: the corpus files share item arrays with each other that are not public API. |
| `physiology.js` | Flow/layer classes, animation envelopes, `RATES`. |
| `visual-data.js`, `schematics.js`, `figures.js`, `layouts.js` | Lesson visuals. `figures.js` / `visual-data.js` `PLATES` — published images, each with an `intro` line and a callout `key` (`{mark,name,beyond?}`) so the lesson teaches from the image; `beyond` = a callout the lesson's sources don't name, read off the figure's own labelling, rendered dimmed. `work/figure-key-check.mjs` enforces this. |
| `wordparts.js`, `term-notes.js`, `term-gloss.js` | Terminology fold: root/prefix/suffix decomposition, pronunciation + plain-English notes, tappable glossary. |
| `sw.js` | Service worker. `CACHE_VERSION` + the SHELL list. |
| `mesh-index.js` | **Generated** — every named mesh in every GLB layer, side- and duplicate-collapsed, each carrying the course file that names it (or nothing) and the STUDY UNIT it resolves to. `UNITS` is what a tap can select. Counts live in `docs/DATA-INDEX.md`, never here. Rebuild with `node work/build-course-terms.mjs` then `node work/build-mesh-index.mjs`; never hand-edit. |
| `work/course-terms.json` | **Generated, committed** — which structures the HSS2011 / ABCT2326 taught and assessed material names, and where. Needs the drive to rebuild; `build-mesh-index.mjs` only reads it. |
| `work/source-catalogue.json` | **Generated, committed** — every document in the shared course folders: 8,801 distinct files (13,546 counting re-shares) across 46.9 GB and 28 shared folders. Never read it; ask `query.mjs file` / `where`. Rebuild with `build-source-catalogue.mjs` when the drive changes. |
| `work/source-text.json` | **Generated, committed** — the text of the 65 cited sources, by page, so every `sourceRefs` page citation is checkable with the drive unmounted. Ask `query.mjs text`. The set textbook and the publisher question bank are deliberately absent: this repo is public and they are not ours to republish. |
| `synonyms.js` | `SYNONYMS` (query expansion: collarbone→clavicle, esophagus→oesophagus, CN X→vagus), `COMPOSITES` (a name with no mesh but real parts — larynx, ossicles, eyeball), `NOT_MODELLED` (the three things genuinely absent). |
| `bodymap.js` | `SEARCH_EXTRAS` (atlas structures beyond the curated bone list, each → a named mesh in a system layer) + `BODY_CONCEPTS` (cavities/regions/quadrants/planes: names, aliases, blurbs, colour, containment hierarchy — **no geometry**). |
| `landmarks.js` | Semantic key → the meshes currently loaded. The resolver every cavity builder goes through. |
| `cavity-geom.js` | The overlay maths — percentile radius sweeps, height fields, plane slices, lofts, `torsoProfile` (the anterior surface the region grid is painted on). Pure (no three.js / DOM) so `work/` can check it. |
| `cavity-build.js` | One builder per cavity, written as its anatomical definition; measures the shape from the loaded meshes at build time. Also `measureGrid`/`gridBounds` for the nine regions and four quadrants. Planes are the exception — pure reference geometry, positioned as a fraction of body height. |

## Run

```bash
node work/dev-server.mjs        # static server on port 8420
```

Then `http://localhost:8420/radiography-study-studio.html`. ES modules need http://,
never file://. Use real Chrome for PWA/service-worker behaviour — the in-app Browser
pane freezes animations and will not register the worker.

## Hard rules

- **Source traceability.** Every factual study claim must cite a `sourceRefs` entry
  keyed to a file that actually exists in the supplied source folders — checked by
  `source-check.mjs`. No internet research, no generic textbook expansion, no
  invented syllabus. App-authored memory aids are fine but must be tagged as such.
  `validateCorpus()` must stay at zero failures.
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
node work/search-probe.mjs      # index integrity, synonyms, tiering, study units
node work/region-probe.mjs      # every skeleton mesh lands in the right region
node work/figure-key-check.mjs  # every figure/plate a lesson shows has intro + key
node work/codemap-check.mjs     # the map matches the code; TRAPS names real files
node work/data-index-check.mjs  # the data summary matches the data
node work/schedule-check.mjs    # REQUIRED for outputs/schedule.js edits — the
                                 # timetable points at units and item ids that
                                 # exist, the weights sum to 100, and every
                                 # dated session sits in the week it claims
node work/baseline.mjs --check  # the probes still say what they said
```

- Added, moved or renamed a section banner, a file, or an export? Run
  `node work/codemap.mjs` and commit `docs/CODEMAP.md` — the check fails until you do.
- Changed a study item, a synonym, a `COMPOSITE`, or rebuilt `mesh-index.js`? Run
  `node work/data-index.mjs` and commit `docs/DATA-INDEX.md` — likewise.
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

Branch is `master`, auto-deploys `outputs/` via `.github/workflows/pages.yml` to
https://gwongy.github.io/radiography-study-studio/ on every push — don't push
half-finished shell changes.

What `master` carries is `git log --oneline` — not repeated here, because a
changelog in the one file every session loads is one that goes stale unread.
