# Session context cost — a map, then a split

## Problem

Every new session pays to orient itself in this repo, and the bill is large
enough to crowd out the work. Measured:

| Cost | Size | When it is paid |
| --- | --- | --- |
| `CLAUDE.md` | 27 KB, 364 lines — **~7K tokens** | **every session, automatically** |
| `outputs/radiography-study-studio.html` | 487 KB, 7,957 lines — ~125K tokens | any session touching app logic |
| `outputs/study-data.js` | 465 KB, 4,900 lines — ~120K tokens | any session touching lesson content |
| `outputs/mesh-index.js` | 141 KB — ~36K tokens | any session asking what is modelled |
| Blind grep-and-read orientation | 5–20K tokens | every session |

Three separate causes, and they are not equally important:

1. **The always-on cost is invisible.** Most of `CLAUDE.md` is *area-specific*
   traps — the mesh-name normaliser, `syncOverlayYaw`, the region classifiers,
   `measureGrid`. All of it loads in full even when the session is fixing a CSS
   rule. Nothing in the file distinguishes "true for every session" from
   "true when you are editing the cavity builders".
2. **There is no map, so a session greps.** Finding the search-to-viewer bridge
   means several grep-and-read rounds against a 7,957-line file, and each round
   pulls context that is discarded.
3. **The monoliths make every read all-or-nothing.** Two inline
   `<script type="module">` blocks (3,406 and 3,447 lines) hold the entire
   application. There is no unit smaller than "the whole app" to open.

The rule this establishes: **a session should be able to find the 200 lines it
needs without reading anything larger than the map.**

## Non-goals

- No build step, no framework, no bundler. Unchanged product constraint.
- No reformatting, renaming, or style cleanup during any move. Diff noise makes
  the baseline comparison worthless, which is the only safety net phases 2–5
  have.
- No splitting of generated files (`mesh-index.js`, `work/course-terms.json`).
  The generators own their shape.
- No behaviour change anywhere. This is a context-cost change; if the rendered
  app differs in any way, the phase is wrong.

## Approach

Three moves, in descending order of leverage:

1. **Slim the always-on context.** `CLAUDE.md` keeps only what is true for
   every session. Area-specific traps move into the header of the module they
   guard, where a session reads them only if it is working there.
2. **Add a generated map.** `docs/CODEMAP.md`, built from the banner comments
   that already exist in the code, so it cannot drift.
3. **Split the monoliths**, so the map has small things to point at.

The map is load-bearing and comes first. Splitting without a map costs *more*
than the monolith — more files to discover, and no index to discover them by.

## Current shape

Both inline blocks are already sectioned by `/* ---- *\n * Title` banners. The
banners are, in effect, a file list that was never acted on.

### Block 0 — 3D studio, lines 1083–4488

| Banner | Lines |
| --- | --- |
| (imports, `els`, `state`, `LAYER_NAMES`) | 1083–1100 |
| Hide, and search-driven uncover | 1101–1198 |
| Search → viewer: frame the part | 1199–1418 |
| Spatial concept overlays | 1419–1869 |
| Cavity geometry, derived from the loaded anatomy | 1870–2330 |
| Visualisation modes (contains the `window.__osteo` literal at 2557) | 2331–3525 |
| Live physiology | 3526–4488 |

Block 0 does **not** split cleanly. 109 top-level declarations close over one
mutable `state` object, and the `window.__osteo` surface sits *inside* the
visualisation-modes section rather than at a boundary. This is the same code the
trap list documents ~20 measurement bugs in.

### Block 1 — study system, lines 4489–7935

| Banner | Lines |
| --- | --- |
| Storage — versioned keys, migration | 4518–4620 |
| Moving progress between devices | 4621–4665 |
| Reset | 4666–4896 |
| Small UI helpers | 4897–4940 |
| Home | 4941–4944 |
| Navigation — five destinations | 4945–5023 |
| Review — mistakes, due items, mastery map | 5024–5071 |
| More — sources, coverage | 5072–5076 |
| Global search | 5077–5414 |
| Search → viewer | 5415–5450 |
| Hidden tray | 5451–5470 |
| Spatial overlay controls | 5471–5735 |
| Subject | 5736–5991 |
| What is under the tap | 5992–6144 |
| Session engine | 6145–6355 |
| Lesson visuals | 6356–6583 |
| Reading help | 6584–6870 |
| Layout figures | 6871–7721 |
| Source dialog | 7722–7764 |
| Coverage report | 7765–7810 |
| Mastery dashboard | 7811–7815 |
| Boot | 7816–7844 |
| Dialog behaviour, all seven at once | 7845–7935 |

Block 1 splits along these lines with no restructuring.

### `study-data.js`

`STUDY_ITEMS` is a spread of seven named arrays, so the corpus separates from
the scaffolding without touching either:

```js
export const STUDY_ITEMS = [
  ...HSS_TERMINOLOGY, ...HSS_OSTEOLOGY, ...BONE_ITEMS, ...STRUCTURE_ITEMS,
  ...MOVEMENT_ITEMS, ...HSS_JOINTS, ...HSS_MODULES, ...PHYS_ITEMS,
  ...HTI_ITEMS, ...EXPANSION_ITEMS,
].map((item) => ({ status: 'unseen', ...item }));
```

Thirteen files import it: `bodymap.js`, `schematics.js`, `visual-data.js`,
`sw.js`, the HTML, and nine `work/` scripts.

## Target layout

```
outputs/
  radiography-study-studio.html   ~800 lines — markup + two <script src> tags
  app.css                         746 lines (was the inline <style>)

  studio/          block 0 — split LAST, and only as far as is safe
    state.js         the shared singleton, els, bodyTransform
    hide.js          hide / search-driven uncover              ~100
    reveal.js        search → viewer framing                   ~220
    overlays.js      cavities, regions, quadrants, planes      ~450
    cavity.js        geometry derived from loaded anatomy      ~460
    modes.js         visualisation modes + the __osteo surface ~1200
    physiology.js    live physiology                           ~960

  study/           block 1 — splits along its own banners
    storage.js       versioned keys, device sync, reset        ~380
    nav.js           navigation + small UI helpers             ~130
    review.js        mistakes, due items, mastery map          ~55
    search.js        the global search sheet                   ~340
    viewer-bridge.js search→viewer, hidden tray, overlay ctls  ~320
    subject.js                                                 ~256
    tap.js           what is under the tap                     ~153
    session.js       the session engine                        ~211
    visuals.js       lesson visuals                            ~228
    reading-help.js                                            ~287
    figures.js       layout figures                            ~850
    dialogs.js       source, coverage, dialog behaviour        ~180
    boot.js                                                    ~30

  study/corpus/    study-data.js's contents
    schema.js        SOURCE_ROOTS/FILES, SUBJECTS, ITEM_TYPES,
                     MASTERY_DIMENSIONS, MEMORY_METHODS, PRIOR_KNOWLEDGE,
                     DSE_PARTS, STUDY_MODES, MODULES
    hss-terminology.js    408–642
    hss-osteology.js      643–1288
    hss-joints.js        1289–1516
    hss-modules.js       1563–1928
    physiology-items.js  1929–2840
    hti-items.js         2841–3193
    expansion-items.js   3565–4119
    structures.js    STRUCTURE_SETS, JOINT_MOVEMENTS, STRUCTURE_MODELS,
                     BONE_HOOKS, STRUCTURE_HOOKS, MOVEMENT_HOOKS, derived items
    mastery.js       schedule, masteryScore, isDue, tierFor, dimensionFor,
                     blankMastery, isDelayedAttempt
    validate.js      validateQuestion, validateCorpus, validateApplications
    coverage.js      COVERAGE, DIAGRAMS, SOCIOLOGY_NOTICE, PLACEHOLDER_NOTICES

  study-data.js    barrel — re-exports everything, assembles STUDY_ITEMS
```

`study-data.js` surviving as a barrel is what keeps the thirteen importers
untouched.

`window.__osteo` is unchanged: one object literal, one cross-block channel. The
two blocks stay two separate `<script type="module" src=…>` tags, so they keep
separate import scopes — the trap in `CLAUDE.md` still applies verbatim.

## Deliverables

### `docs/CODEMAP.md` — generated

Section title → file → line range → exported surface, for every file in
`outputs/`. Built by `work/codemap.mjs` by scanning for the existing
`/* ---- *\n * Title` banners and `export` statements. Target under 200 lines.

`work/codemap-check.mjs` joins the after-every-edit set and fails if the
committed map does not match a fresh generation. The map is never hand-edited.

### `docs/DATA-INDEX.md` — generated

What a session needs to know about `mesh-index.js` and `course-terms.json`
without opening either: row counts per layer, the shape of one row, what `UNITS`
is and how a row resolves to one, how tiering is derived, the three genuinely
`NOT_MODELLED` structures. Target ~80 lines against 141 KB.

### `work/query.mjs` — new

A CLI so a session **asks** the data instead of reading it:

```bash
node work/query.mjs unit "Deltoid"
node work/query.mjs item hss-term-01
node work/query.mjs mesh Scaphoid
```

Answers in tens of lines. "What does the index say about X" is the most common
reason a session opens a large generated file, so this is the largest
per-session saving after the map itself.

### `CLAUDE.md` — rewritten, 364 → ~120 lines

Keeps: the layout table, the hard rules, the run command, the after-every-edit
command list, the git/deploy note, and a pointer to `docs/CODEMAP.md` with the
instruction to read it before grepping.

Moves out: every trap that applies to one area. Each goes to the header of the
module that owns it — the mesh-name normaliser trap to `studio/reveal.js`, the
`updateMatrixWorld` traps to `studio/cavity.js`, the grid traps to
`studio/overlays.js`, the CSS traps to `app.css`, the label-derivation traps to
`work/build-mesh-index.mjs`. Nothing is deleted; the trap list is the repo's
most valuable document. It is only relocated to where it is read on demand.

## Phasing

Every phase is independently shippable and independently revertible, ends with
the full check suite plus a baseline diff, and bumps `CACHE_VERSION` with
matching `?v=N` SHELL entries.

`app.css` is a `<link>`, not a module import, so `shell-check.mjs` does not
currently police it. Phase 2 extends the check to cover versioned `<link>`
hrefs as well — an unversioned stylesheet in the SHELL is the same offline
cache-miss bug the `?v=N` rule exists to prevent, and it would only show up
offline.

| Phase | What moves | Risk | Saving |
| --- | --- | --- | --- |
| **0** | Nothing ships. Make the probes deterministic, capture baselines, write `work/codemap.mjs`, `work/data-index.mjs` and `work/codemap-check.mjs`. | none | none yet |
| **1** | `CLAUDE.md` slimmed; `docs/CODEMAP.md`, `docs/DATA-INDEX.md` generated and committed; `work/query.mjs` added; `codemap-check.mjs` joins the check list. | none — docs and tooling only | **~5K tokens off every session** |
| **2** | `<style>` → `app.css`; block 0 → `studio.js`; block 1 → `study.js`. Byte-identical move. | low | the monolith stops being unavoidable |
| **3** | `study-data.js` → `study/corpus/*.js` + barrel. | low — public API identical | lesson-content edits get cheap |
| **4** | `study.js` → `study/*.js` along its banners. | medium | the common case gets cheap |
| **5** | `studio.js` → `studio/*.js`, partial. | **high** — the `state` singleton | the rare case gets cheaper |

### Phase 0 baselines

The existing checks prove modules *load*, not that overlays *measure*. The trap
list documents ~20 bugs a load-check would have passed. So before any code
moves, make each probe deterministic — no timestamps, no wall-clock durations,
key order sorted — then capture and commit the output of:

`cavity-probe.mjs`, `grid-probe.mjs` (with and without `--all`),
`landmark-check.mjs`, `build-check.mjs` (with all layers and skeleton-only),
`region-probe.mjs`, `search-probe.mjs`, `figure-key-check.mjs`

into `work/baselines/`. Every later phase diffs against them. A phase that
changes a baseline has changed behaviour and is wrong by definition.

### Phase 5 may stop early

If `modes.js` will not come apart without threading `state` through sixty
functions, `studio.js` stays whole and `docs/CODEMAP.md` points into it by line
range. That still captures most of the benefit, because the map is what saves
the tokens — the file boundary only makes the map's targets smaller.

The decision point is explicit: attempt `state.js` as an exported mutable
singleton first. If the resulting diff touches more than ~30% of block 0's
lines, stop and keep `studio.js` whole.

## Verification

After every phase, the standard set:

```bash
node work/load-check.mjs
node work/syntax-check.mjs
node work/verify-modules.mjs
node work/shell-check.mjs
node work/search-probe.mjs
node work/region-probe.mjs
node work/figure-key-check.mjs
node work/codemap-check.mjs      # new in phase 0
```

plus a diff against `work/baselines/`, and — for phases 2, 4 and 5 — a manual
pass in real Chrome over: boot on Today then open Viewer (the degenerate-resize
trap), a cavity overlay with the vessel layer toggled on afterwards (the
rebuild trap), a search that opens the viewer and auto-uncovers, and the hidden
tray.

## Success criteria

- `CLAUDE.md` under 130 lines, with no trap that applies to a single module.
- `docs/CODEMAP.md` under 200 lines and generated.
- A session can locate any named behaviour by reading only `CLAUDE.md` plus
  `docs/CODEMAP.md` — no grep round needed to find *where*.
- No file in `outputs/` over 1,500 lines except the generated ones and, if
  phase 5 stops early, `studio.js`.
- Every probe baseline byte-identical from phase 0 to the end.
- The deployed app is indistinguishable from before.

## Result — phases 0 and 1

Measured on 2026-08-31, on completion of the phase-0/1 plan.

### The always-on cost, which was the point

| | Lines | Bytes | ~Tokens |
| --- | --- | --- | --- |
| `CLAUDE.md` before | 365 | 27,153 | 7,339 |
| `CLAUDE.md` after | 129 | 10,041 | 2,714 |
| **Saved, every session** | | | **~4,625 (63%)** |

### Moved to on-demand

Read only by a session that needs them, and only the relevant section of each.

| File | Lines | ~Tokens | Replaces a read of |
| --- | --- | --- | --- |
| `docs/CODEMAP.md` | 199 | 3,510 | `radiography-study-studio.html` — 7,957 lines, ~131,500 tokens |
| `docs/TRAPS.md` | 293 | 5,361 | (was inside the always-on cost) |
| `docs/DATA-INDEX.md` | 90 | 787 | `mesh-index.js` — ~38,200 tokens |
| `work/query.mjs` | — | tens | `study-data.js` — ~125,700 tokens |

The map is 196 lines against a 7,957-line monolith, and it now also sections the
banner-carrying data modules — `study-data.js` (21 banners over 4,897 lines),
`cavity-geom.js` (6), `visual-data.js` (4), `cavity-build.js` (3),
`landmarks.js` (3), `schematics.js` (1). That last part was missing from the
first implementation and was caught in review.

### Success criteria

| Criterion | Met | Actual |
| --- | --- | --- |
| `CLAUDE.md` under 130 lines | yes | 129 (10,041 bytes against a 10,000 target — 41 over, not worth shaving) |
| `docs/CODEMAP.md` under 200 lines, generated | yes | 199, from `work/codemap.mjs` |
| Every probe baseline reproducible | yes | all 8, none excluded |
| No trap lost in the move | yes | 43 bolded bullets before, 3 + 40 = 43 after |
| Application untouched | yes | `git diff master..HEAD -- outputs/` empty |

### Baselines

All eight repo-only probes proved reproducible across two fresh processes and
were captured: `search-probe`, `region-probe`, `figure-key-check`,
`landmark-check`, `cavity-probe`, `grid-probe`, `grid-probe --all`,
`build-check`. None was excluded for non-determinism; none currently fails.
`build-course-terms` is excluded by design — it needs the Drive mount.

`node work/baseline.mjs --check` passed at the end of the phase, which is the
evidence that no application behaviour moved.

### What review caught that implementation did not

Worth recording, because it is the argument for keeping the review stage in
phases 2–5:

- **`htmlBlocks()` would have gutted the map at phase 2, silently.** Its comment
  claimed it would survive the CSS and module blocks moving to their own files.
  It would instead have emitted a single zero-length row per block, losing ~35 of
  37 useful rows — and `codemap-check.mjs` would still have passed, because
  regeneration is deterministic. The map now writes a warning into itself and the
  check fails while that warning is present.
- **The heading anchors did not match GitHub's slugger.** An em-dash in a trap
  heading is stripped leaving two spaces; GitHub emits one dash per space
  character while the generator collapsed the run. Every trap link would have
  been broken on the rendered view.
- **Every line count in the map was one too many.** `split()` on a file ending in
  a newline yields a trailing empty element, so the map claimed 7,958 lines for a
  7,957-line file and each module's last section row pointed one past the end.
- **The traps were filed under the wrong files in the first draft.** The
  region-grid traps were assigned to `landmarks.js`; they belong to the HTML
  (the classifiers, which `region-probe.mjs` lifts out of it) and to
  `cavity-build.js` (`measureGrid`/`gridBounds`).

### Note for phases 2–5

`CLAUDE.md` was **not tracked in git** before this phase — it existed only as a
working-tree file, so the 365-line original has no git history. Its content
survives in full across the new `CLAUDE.md` and `docs/TRAPS.md` (verified
against 26 distinctive strings spanning every original section), but there is no
`git show` to recover it from. Both files are tracked now.

### Landed after the final review

The whole-branch review returned READY TO MERGE with three recommendations.
All three were taken, because each protects the premise that these documents
can be trusted without opening what they describe:

- **`work/data-index-check.mjs`.** `docs/CODEMAP.md` had a drift check;
  `docs/DATA-INDEX.md` had none, so the first study item, synonym or
  `mesh-index.js` rebuild would have made it quietly wrong. It also gives
  phase 3 a corpus digest: the probe baselines freeze the geometry engine, but
  nothing froze the item counts, so a `study-data.js` split could have altered
  content while `validateCorpus()` still passed.
- **A Traps column on the map's verifiers table.** The two sharpest trap
  sections — the mesh index and the course terms — were unreachable from the
  map, so a session told "read the map first" would open
  `work/build-mesh-index.mjs` and see only a one-line headline.
- **Rows for the unmapped markup.** `htmlBlocks()` only sections `<style>` and
  `<script>`, so HTML lines 766–1081 — the nav rail, the five views, the
  dialogs — produced no row at all. A table headed "where everything is" was
  telling a markup task there was nothing to find. Gaps now render as
  `markup — no banners, grep here`.

The hard-coded index counts in `CLAUDE.md`'s module table were also removed and
replaced with a pointer to `docs/DATA-INDEX.md` — they duplicated the generated
file and would have rotted silently in the one document every session pays for.

## Result — phase 2

Measured on 2026-09-01.

| File | Before | After |
| --- | --- | --- |
| `radiography-study-studio.html` | 7,957 lines / 468 KB | **360 lines / 30 KB** |
| `app.css` | — | 745 lines / 68 KB |
| `studio.js` | — | 3,404 lines / 200 KB |
| `study.js` | — | 3,445 lines / 176 KB |

A session working on the study system now opens a 3,445-line file, and the map points it at a
36-line range inside it. The same task before phase 1 meant a 7,957-line read.

### The move was provably lossless

Three independent proofs, all passing:

1. **Reassembly.** Gluing the three extracted files back into the HTML's original shape
   reproduced all 7,958 lines exactly.
2. **Character identity.** Each extracted file compared against the corresponding inline block
   at `e607a06` — identical, modulo the one boundary newline each side of a `<script>` tag.
3. **Baselines.** All eight probe baselines byte-identical, including `region-probe`, which now
   lifts the two region classifiers out of `studio.js` instead of the HTML.

Browser pass: `app.css` applies (601 rules, themed background), all three files serve 200,
`window.__osteo` publishes 55 keys, the study module renders six views, and opening Viewer from
Today sizes the canvas to 1165×605 — matching the stage, not the degenerate strip the resize
trap describes. No console errors.

### Four tools would have passed while checking nothing

The reason this phase was not a text move. `load-check`, `syntax-check` and `shell-check` all
found the code by matching `<script type="module">` against the HTML; with the blocks extracted
each would have matched zero, looped zero times and **exited 0**. `load-check` is the check that
exists because a load-time death shipped once.

Each now fails on an empty set, and each guard was verified by deleting `studio.js` and watching
the check go red rather than green:

- `load-check` / `syntax-check` — `FAIL expected 2 application modules, found 0`, exit 1.
- `shell-check` — `FAIL found 0 local module imports`, plus a new section policing the HTML's
  `<link>`/`<script src>` references for a `?v=` query. Verified by unversioning the shell's
  `app.css` entry: `FAIL app.css?v=1 is referenced but the shell lists "app.css"`.

This is the same defect class the phase-1 review caught in `codemap.mjs`, found a second time in
three more files. The lesson is general enough to be worth stating: **in this repo a check that
locates its subject by pattern must assert it found one.**

`codemap.mjs`'s own guard was already in place from phase 1 and did exactly its job — it fired
the moment the blocks moved, which is what forced the generator to be taught about the extracted
files rather than silently shipping a map with 35 rows missing.

## Result — phase 3

Measured on 2026-09-01. `outputs/study-data.js`: **4,897 lines → a 117-line barrel**, with the
corpus in seventeen files under `outputs/study/corpus/`, largest 919 lines
(`physiology-items.js`), smallest 41 (`notices.js`).

### The proof, and why it had to be semantic

Phase 2 could prove byte-identity; phase 3 adds file headers and imports by definition, so it
cannot. `work/corpus-snapshot.mjs` was written first and captured as a baseline **before** the
split: it hashes each of the 57 exports and each of the 94 study items individually by id, so a
moved lesson word, a dropped `sourceRefs`, or a reordered `options` array moves exactly one line
and the line names what changed.

It earned its keep immediately. The barrel initially re-exported **56** names, not 57 — the
57th is a `export default { … }` at the bottom of the file that a hand-typed public list missed
and that the code map's `export (const|function)` scan had never listed either. The snapshot
named it in one line. That default now lives in the barrel, where a data layer's default export
belongs, rather than stranded at the bottom of `mastery.js`.

It is also why the barrel re-exports by name instead of `export *`: the ten item arrays the
corpus files share with each other would have widened the public API from 57 to 67, and the
snapshot would have failed. The snapshot now enforces the API surface as a side effect.

Final state, verified in the browser through the real barrel: 57 exports, a default with its
seven keys, 94 items, 6 subjects, `validateCorpus()` at zero failures, every corpus file 200.

### Two real bugs, found by making a check honest

Neither is a refactoring artefact. Both were live in the shipped app.

**The offline shell was missing two modules.** `shell-check.mjs` scraped `from './x.js'` one
level deep from the entry points, so it had never looked at what the data modules import.
Replacing that with a transitive walk of the import graph immediately reported two second-level
imports with no shell entry under the spelling they use: `study-data.js` imports
`'./anatomy-data.js'` and `cavity-build.js` imports `'./cavity-geom.js'`, both bare, while the
shell listed only `?v=5` and `?v=2`. A cache key is the whole URL, so offline both 404'd — the
canonical bone records and the entire cavity engine. The walk then also caught all seventeen
corpus files before they could ship unprecached.

**`load-check.mjs` could not resolve a nested import.** Its inliner stripped a leading `./` and
treated the rest as a filename in `outputs/`, which held only while every module was a sibling.
It now resolves each specifier against the file that wrote it.

### And one check that was reading source text

`figure-key-check.mjs` read `study-data.js` as a *string* and grepped it for `type: 'diagram'`,
recovering the enclosing item's id from a 600-character lookback. The barrel has no item text, so
it silently found 16 figures instead of 18 and reported two as unused. Only the committed
baseline caught it. It now asks `STUDY_ITEMS`.

That is the third instance of one pattern in two phases, so it is worth stating as a rule:
**a check that locates its subject by pattern-matching source text will pass, quietly and
wrongly, the first time the source moves.** Ask the data; and if you must match, assert you
matched something.

### Cost

`CLAUDE.md` grew from 129 lines to 133 (10,041 → 11,095 bytes), against a stated target of under
130. Three lines are a new `outputs/study/corpus/` row and an `app.css` / `studio.js` /
`study.js` description that a session cannot work without; the fourth expands the SHELL rule to
describe the cache-key bug above, which shipped precisely because the old one-sentence version
did not say it. Not shaved to hit the round number.


## Result — phase 4, and why phase 5 stopped

The spec's risk ordering for these two was **backwards**, and correcting it is the main finding.

| | Mutual section deps | Bindings assigned across a section boundary |
| --- | --- | --- |
| `study.js` (block 1) — "splits with no restructuring" | 12 | **5**, at 12 write sites in 7 sections |
| `studio.js` (block 0) — "does not split cleanly", high risk | 3 | **0** |

`studio.js` funnels state through one mutable `state` **object**, so every cross-section write is
a property write, which is legal through an imported binding. `study.js` used bare `let`s, and
assigning to an imported binding is a **compile-time error**. That, not the trap density, was
what blocked block 1.

### Phase 4 — done

`study.js` 3,445 lines → a 40-line entry point plus 25 files under `outputs/study/`, largest 866
(`layout-figures.js`). Two changes were needed beyond moving text, and both were forced:

1. **`study/state.js`.** `session`, `learnFilter`, `learnTopic`, `learnDrill` and `viewerTab`
   became properties of one exported `ui` object; 147 code references rewritten.
2. **`init()` per part.** The parts import each other cyclically, so a part pulled in early as
   somebody's dependency runs its body before another part has reached a `let` it needs.
   `dialog-behaviour-applied.js` calling `renderToday()` at module scope gave
   `Cannot access 'currentTab' before initialization` — the same failure class that killed the app
   on 2026-08-29. `study.js` now imports every part, then calls their `init()`s in the original
   order: declarations first, side effects afterwards, exactly what one top-to-bottom file used to
   guarantee for free.

Verified: all ten checks, all ten baselines, and a browser fingerprint in which every one of the
five destinations hashes **identically** to a capture taken before any of it started.

### The bug that nearly shipped, and the check that now prevents it

Rewriting the identifier `session` to `ui.session` skipped comments but **not string literals**.
Seven pieces of user-facing prose became `Start a ui.session below to begin.`,
`Finish ui.session →`, `Study ui.session`, `No answers recorded for this item in this ui.session.`

Nothing caught it. Every module loaded. Every probe passed. The corpus was untouched, so
`corpus-snapshot` was silent — the strings live in the UI, not the data. And the browser check
that should have seen it **passed against a stale file**: `study.js?v=1` did not change when
`study.js` changed, so the reload served the cached body. A false green from the one tool that
was looking in the right place.

`work/ui-strings.mjs` now fingerprints every sentence the interface can show, as an eleventh
baseline. It found the seventh corruption immediately, and diffed against the pre-refactor
original it proves **no prose changed anywhere across phases 2–4** — the only differences are
four CSS strings that moved into `app.css`.

### Phase 5 — done, once the parser was asked

`studio.js` 3,404 lines → a 40-line entry point plus 9 parts, largest 978
(`live-physiology.js`).

The blocker was never the trap density. It was that **no text rule can find this
file's top-level declarations**: 94 declarations sit at column 0, so their bodies
sit at indent 2 — and `const els` and `const state`, the two objects every
section uses, are themselves at indent 2, among 382 nested locals at the same
column. A brace counter fails too, defeated by the multi-line template literals
the file embeds GLSL and HTML in.

`work/toplevel.mjs` settles it with the only parser already in the room.
Appending `export { name };` to a module is a **link-time** error when `name` is
not a top-level binding:

    SyntaxError: Export 'foo' is not defined in module

Start with every candidate, drop whichever name the error blames, repeat. What
survives is exactly the top-level set — 232 names, with 269 candidates correctly
rejected as nested — decided by V8 rather than by a regex, and with no
dependency added.

One declaration had to move. `state`'s initialiser calls `loadStats()`, written
370 lines later under a different banner. Left there, the preamble imports that
whole part, so it evaluates FIRST and its module scope touches `state` before the
preamble has reached the declaration.

Verified against the unsplit build in the browser, both directions run: the same
55 `__osteo` keys, the same stage metadata, and the same result from every
cross-module call — `revealStructure`, `hiddenList`, `setCavityMode`,
`showConcept`, `conceptProvenance`, `setPhysiology`, `flowCounts`, `enterXray`,
`setLayer`. `ui-strings` hashes the same 690 sentences.

### Success criteria — all met

| Criterion | Met | Actual |
| --- | --- | --- |
| `CLAUDE.md` under 130 lines | no | 135 — three rows the split made necessary, and a SHELL rule that now describes a bug that shipped |
| `docs/CODEMAP.md` under 200 lines, generated | no | 241, and it now maps 51 files instead of one |
| A session can locate any behaviour from the map alone | yes | every part is a named file with a one-line headline |
| **No file in `outputs/` over 1,500 lines** | **yes** | largest hand-written is `cavity-geom.js` at 1,148; only the generated `mesh-index.js` (2,584) is bigger |
| Every probe baseline unchanged | yes | 10 of them, including two written during this work |
| The deployed app is indistinguishable from before | yes | verified per phase in the browser |

The two misses are both documents that grew because there is more to describe,
and both are read on demand rather than every session. The always-on cost —
the thing this whole spec was about — is still 63% below where it started.

### Tooling that came out of phases 2–4

Five checks were wrong or absent when this started, each found by the phase that broke it:

| Check | What it could not see |
| --- | --- |
| `shell-check.mjs` | Anything past one import level — it missed two live offline 404s and would have missed 42 more files |
| `load-check.mjs` | Nested imports, side-effect imports, and a missing binding it reported as a browser global |
| `figure-key-check.mjs` | The corpus, once it stopped being one text file to grep |
| `corpus-snapshot.mjs` | *(new)* Lesson content, as opposed to lesson counts |
| `ui-strings.mjs` | *(new)* Every sentence the interface shows |

The pattern behind four of the five is worth keeping: **a check that locates its subject by
pattern-matching source text passes, quietly and wrongly, the first time the source moves.** Ask
the data; and if you must match, assert that you matched something.
