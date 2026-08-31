# Radiography Study Studio — working guide

Read `outputs/README.md` and `git log` before making changes; both are kept current.
Settled content decisions (subject scope, source substitutions, what was deliberately
left out) are documented there and in the coverage report — do not re-open them
without new source evidence.

## Find things here first

**Read `docs/CODEMAP.md` before grepping.** It is generated from the banner
comments in the code (`node work/codemap.mjs`), so it is always current: every
section of the app, its file, its line range, and a link to the traps that
govern it.

| Want | Read | Not |
| --- | --- | --- |
| Where a behaviour lives | `docs/CODEMAP.md` | a grep sweep |
| What breaks when you edit file F | the `docs/TRAPS.md` section CODEMAP links | this file |
| What the model contains | `docs/DATA-INDEX.md`, then `node work/query.mjs` | `outputs/mesh-index.js` |
| What one structure or item says | `node work/query.mjs unit\|mesh\|item\|layer\|source <term>` | `outputs/study-data.js` |
| Why a decision was made | `outputs/README.md`, `git log` | reopening it |

`outputs/mesh-index.js` and `work/course-terms.json` are **generated**. Never
read them and never edit them; ask `work/query.mjs` instead.

## Layout

| Path | What it is |
| --- | --- |
| `outputs/` | The app. `radiography-study-studio.html` is the whole product: two inline `<script type="module">` blocks (3D studio first, study system second) talking through `window.__osteo`. Deployed as-is — no build step. |
| `outputs/*.js` | Data modules, each imported with `?v=N` (see the SW SHELL rule below). Map is below. |
| `outputs/assets/*.glb` | The seven anatomical layers (skeleton, muscles, ligaments, organs, vessels, nerves, lymphatic — 2,914 named meshes total, ~39 MB), lazy-loaded on demand. |
| `docs/superpowers/` | Design specs (`specs/`) and implementation plans (`plans/`). Follow this pattern for new work. |
| `work/` | Node verifiers, run outside the browser. `load-check.mjs`, `syntax-check.mjs`, `verify-modules.mjs` are the after-every-edit set. Cavity-engine checks: `landmark-check.mjs`, `cavity-probe.mjs`, `build-check.mjs` (relational — hold with all layers and skeleton-only), `grid-probe.mjs` (the nine regions / four quadrants; run it with and without `--all`), plus `glb-bounds`/`glb-mesh`/`glb-names` helpers. `search-probe.mjs` (the name index + synonyms + the source-derived tiering + the study units every row resolves to), `region-probe.mjs` (the two region classifiers, lifted out of the HTML and run over the real GLB names), `shell-check.mjs` (every `?v=` import is precached under the same query), `figure-key-check.mjs` (every published figure/plate a lesson renders carries a well-formed `intro` + `key`). Generators: `build-course-terms.mjs` (needs the drive + `pdftotext`) then `build-mesh-index.mjs`; shared GLB-name reading AND per-structure geometry (`boxesIn`, `measureStructures`) live in `lib/mesh-names.mjs`. One-offs: `dense-lessons`, `gloss-gap-scan`, `dump-plain-candidates`. `scan-output.txt` and `id-inventory-*.txt` are scratch. |
| `Uni/` | `.lnk` shortcuts to the Google Drive source folders. They resolve into `G:\.shortcut-targets-by-id\` — enumerate that directory, don't trust the shortcut list alone. |

### `outputs/` data modules

| Module | What it holds |
| --- | --- |
| `anatomy-data.js` | `ANATOMY_DATABASE` (curated bone records), `LANDMARK_HOTSPOTS`, `MODEL_CATALOG` (per-layer coverage **and gaps**), `REGIONS`, search. |
| `study-data.js` | The lesson corpus, `STRUCTURE_MODELS` (layer key → GLB), `validateCorpus()`. |
| `physiology.js` | Flow/layer classes, animation envelopes, `RATES`. |
| `visual-data.js`, `schematics.js`, `figures.js`, `layouts.js` | Lesson visuals. `figures.js` / `visual-data.js` `PLATES` — published images, each with an `intro` line and a callout `key` (`{mark,name,beyond?}`) so the lesson teaches from the image; `beyond` = a callout the lesson's sources don't name, read off the figure's own labelling, rendered dimmed. `work/figure-key-check.mjs` enforces this. |
| `wordparts.js`, `term-notes.js`, `term-gloss.js` | Terminology fold: root/prefix/suffix decomposition, pronunciation + plain-English notes, tappable glossary. |
| `sw.js` | Service worker. `CACHE_VERSION` + the SHELL list. |
| `mesh-index.js` | **Generated** — every named mesh in every GLB layer (1,686 structures, side- and duplicate-collapsed), each carrying the course file that names it (or nothing) and the STUDY UNIT it resolves to. `UNITS` (787) is what a tap can select: 619 course-named structures, 158 groups, 10 one of a kind. Rebuild with `node work/build-course-terms.mjs` then `node work/build-mesh-index.mjs`; never hand-edit. |
| `work/course-terms.json` | **Generated, committed** — which of the 1,686 the HSS2011 / ABCT2326 taught and assessed material names, and where. Needs the drive to rebuild; `build-mesh-index.mjs` only reads it. |
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
never file://. Use real Chrome for PWA/service-worker behaviour (the in-app Browser
pane freezes animations and won't register the worker).

## Hard rules

- **Source traceability.** Every factual study claim must cite a `sourceRefs` entry
  keyed to a file that actually exists in the supplied source folders. No internet
  research, no generic textbook expansion, no invented syllabus. App-authored memory
  aids are fine but must be tagged as such. `validateCorpus()` must stay at zero
  failures.
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
node work/shell-check.mjs       # ?v= imports match the SW SHELL; shell files exist
node work/search-probe.mjs      # index integrity, synonyms, tiering, study units
node work/region-probe.mjs      # every skeleton mesh lands in the right region
node work/figure-key-check.mjs  # every figure/plate a lesson shows has intro + key
node work/codemap-check.mjs  # the map matches the code; TRAPS names real files
node work/baseline.mjs --check  # the probes still say what they said
```

- Added, moved or renamed a section banner, a file, or an export? Run
  `node work/codemap.mjs` and commit the regenerated `docs/CODEMAP.md`.
  `codemap-check.mjs` fails until you do.
- A trap you learn the hard way goes in `docs/TRAPS.md`, under the file it
  governs — not here. This file is loaded into every session; that one is read
  only by a session working in that file.
- Any shell change (HTML, JS modules, CSS in the HTML) → bump `CACHE_VERSION` in
  `sw.js`.
- A module imported with `?v=N` in the HTML must appear in the SW SHELL list with the
  **identical** `?v=N` — a mismatch is an offline cache miss that only shows up
  offline. `shell-check.mjs` now enforces this; it caught `anatomy-data.js?v=4`
  imported against a bare `./anatomy-data.js` in the shell.
- Touched `mesh-index.js`? It is generated — rerun `node work/build-mesh-index.mjs`
  rather than editing it, then `node work/search-probe.mjs`.

## Git / deploy

Branch is `master`, auto-deploys `outputs/` via `.github/workflows/pages.yml` to
https://gwongy.github.io/radiography-study-studio/ on every push — don't push
half-finished shell changes.

`master` and `origin/master` are level as of 2026-08-31, at `32c3924`. It carries
the figure-callout-keys feature (fast-forwarded from `feat/figure-callout-keys`
on 2026-08-31 — intro + callout key on every published figure/plate, four
replacement figure images, `work/figure-key-check.mjs`), the search-everywhere +
hide/uncover + spatial-overlay feature (fast-forwarded from
`feat/search-everywhere-viewer-overlays` on 2026-08-30), the reading-help
pass, the source-derived study depth, and the study-unit pass that decides what a
tap can select.

`feat/search-everywhere-viewer-overlays` (on origin) is fully contained in
`master` — safe to delete.
