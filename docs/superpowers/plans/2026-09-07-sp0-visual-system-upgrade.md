# SP0 — Visual System Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let a study item carry an ordered list of visuals instead of exactly one, and move published figures off the hard precache shell into an on-demand cache — with no change to how any existing lesson renders.

**Architecture:** A new optional `item.visuals` array of small spec objects (`{fig}`, `{schematic}`, `{plate}`, `{model}`, `{gen}`). A pure resolver `visualsFor(item)` in `outputs/visual-data.js` returns the list, falling back to `[visualFor(item)]` when `visuals` is absent — so every current item is unchanged. `outputs/study/lesson-visuals.js` grows a `visualStackHTML(item)` that renders the list; the single-visual `visualSlotHTML` becomes a thin wrapper over it. The 3D mount logic finds the `model` entry within the list. In `outputs/sw.js`, figure assets move from `SHELL` to a `networkFirst` runtime cache `rss-figures-<FIGURES_VERSION>`. Checks: `figure-key-check.mjs` walks `visuals[]`; a new `visuals-check.mjs` validates spec shape and asset existence with a `--selftest`.

**Tech Stack:** Vanilla ES modules, no build. Node check scripts under `work/` are the test harness. Service worker Cache API.

---

## File Structure

- `outputs/study/corpus/validate.js` — add `validateVisuals(item)`, call it from `validateCorpus()`.
- `outputs/visual-data.js` — add `visualsFor(item)` resolver and the `v*` spec helpers; no change to `visualFor`/`ITEM_VISUALS`/`PLATES`.
- `outputs/study/lesson-visuals.js` — add `visualStackHTML(item)`; make `visualSlotHTML` delegate; update `mountLessonVisual`/`releaseLessonVisual`/`visMounted` to locate the model entry in the list.
- `outputs/study/imports.js` — export `visualsFor` through the study barrel.
- `outputs/sw.js` — `FIGURES_VERSION`, `FIGURES_CACHE`, add to `ALL_CACHES`, route `assets/figures/` to `networkFirst`, drop figures from `SHELL`.
- `work/visuals-check.mjs` — NEW. Validates every `visuals[]` spec resolves; `--selftest` proves the gate bites.
- `work/figure-key-check.mjs` — also collect figure/plate ids from `visuals[]`.
- `work/baseline.mjs` — register `visuals-check` in the baseline list.
- `docs/CODEMAP.md`, `docs/DATA-INDEX.md` — regenerated.
- `CLAUDE.md` — one line under "After every edit" for `visuals-check`.

No existing lesson gets a `visuals` array in SP0. That is SP1's job.

---

## Task 1: `visualsFor()` resolver and spec helpers

**Files:**
- Modify: `outputs/visual-data.js` (after `plateFor`, around line 465)

- [ ] **Step 1: Add the resolver and helpers**

In `outputs/visual-data.js`, after the `plateFor` function, add:

```js
/* ------------------------------------------------------------------ *
 * Ordered per-item visual lists
 *
 * An item MAY carry `visuals: [...]`, an ordered list of specs, when one
 * picture is not enough. Each entry is one of:
 *   { fig: 'id' }                       a FIGURES entry
 *   { plate: 'id' }                     a PLATES entry (its own id, not the item's)
 *   { schematic: 'id' }                 a SCHEMATICS / layout id
 *   { model: { layer, meshes, label, caption, ghostBody? } }
 *   { gen: true }                       the generated-from-own-data visual
 * At most one { model } per list — there is one WebGL context.
 *
 * visualsFor() returns a normalised array of the same {kind,...} specs
 * visualFor() has always returned, so the renderer sees one shape. An item
 * with no `visuals` returns exactly [visualFor(item)] — unchanged behaviour.
 */
export const VISUAL_SPEC_KINDS = ['fig', 'plate', 'schematic', 'model', 'gen'];

export function normaliseVisualSpec(entry, item) {
  if (!entry || typeof entry !== 'object') return null;
  if (entry.fig) return { kind: 'schematic', id: entry.fig };      /* figureFor() resolves it in the renderer */
  if (entry.schematic) return { kind: 'schematic', id: entry.schematic };
  if (entry.plate) return { kind: 'plateRef', id: entry.plate };
  if (entry.model) return withFile({ kind: 'model', ...entry.model });
  if (entry.gen) return generatedFor(item);
  return null;
}

export function visualsFor(item) {
  if (!item) return [];
  if (Array.isArray(item.visuals) && item.visuals.length) {
    return item.visuals.map((e) => normaliseVisualSpec(e, item)).filter(Boolean);
  }
  const one = visualFor(item);
  return one ? [one] : [];
}
```

- [ ] **Step 2: Sanity-check it loads**

Run: `node work/syntax-check.mjs`
Expected: `ALL PARSED CLEAN`

- [ ] **Step 3: Commit**

```bash
git add outputs/visual-data.js
git commit -m "feat(visuals): visualsFor() resolves an ordered visual list per item"
```

---

## Task 2: `validateVisuals()` in the corpus validator

**Files:**
- Modify: `outputs/study/corpus/validate.js`

- [ ] **Step 1: Add the validator**

In `outputs/study/corpus/validate.js`, add this function above `validateCorpus`:

```js
/* An item's optional `visuals` list: shape only. Whether a fig id resolves to
   a real FIGURES entry with a file on disk is work/visuals-check.mjs's job —
   it can touch the filesystem and this cannot. */
export function validateVisuals(item) {
  const v = item.visuals;
  if (v === undefined) return [];
  const problems = [];
  if (!Array.isArray(v) || !v.length) { problems.push('visuals is present but not a non-empty array'); return problems; }
  let models = 0;
  v.forEach((e, i) => {
    if (!e || typeof e !== 'object') { problems.push(`visuals[${i}] is not an object`); return; }
    const keys = ['fig', 'plate', 'schematic', 'model', 'gen'].filter((k) => k in e);
    if (keys.length !== 1) { problems.push(`visuals[${i}] must have exactly one of fig|plate|schematic|model|gen`); return; }
    if (e.model) {
      models++;
      if (!e.model.layer || !Array.isArray(e.model.meshes) || !e.model.meshes.length) problems.push(`visuals[${i}].model needs layer and a non-empty meshes array`);
      if (!e.model.label || !e.model.caption) problems.push(`visuals[${i}].model needs label and caption`);
    }
    if ((e.fig || e.plate || e.schematic) && typeof (e.fig || e.plate || e.schematic) !== 'string') problems.push(`visuals[${i}] id must be a string`);
    if ('gen' in e && e.gen !== true) problems.push(`visuals[${i}].gen must be true`);
  });
  if (models > 1) problems.push(`visuals has ${models} model entries; at most one is allowed`);
  return problems;
}
```

- [ ] **Step 2: Call it from `validateCorpus`**

In `validateCorpus()`, immediately after the `if (item.priorKnowledge) { ... }` block and before `for (const q of questionsOf(item))`, add:

```js
    const visProblems = validateVisuals(item);
    if (visProblems.length) failures.push({ itemId: item.id, qid: null, problems: visProblems });
```

- [ ] **Step 3: Run the corpus validator — no existing item sets `visuals`, so still zero**

Run: `node work/verify-modules.mjs`
Expected: `validateCorpus() → 0 failures` and `ALL PASS`

- [ ] **Step 4: Prove the check bites — temporary bad item**

Temporarily append to the end of the array in `outputs/study/corpus/derived-items.js` (inside the exported items array — pick any existing array there) a spread onto one item: add `visuals: [{ fig: 'x', plate: 'y' }]` to one existing item literal.

Run: `node work/verify-modules.mjs`
Expected: FAIL listing `visuals[0] must have exactly one of fig|plate|schematic|model|gen`

Revert that edit.

Run: `node work/verify-modules.mjs`
Expected: `ALL PASS` again

- [ ] **Step 5: Commit**

```bash
git add outputs/study/corpus/validate.js
git commit -m "feat(visuals): validateVisuals() shape-checks item.visuals in validateCorpus"
```

---

## Task 3: `work/visuals-check.mjs` — resolve every list against real figures and files

**Files:**
- Create: `work/visuals-check.mjs`

- [ ] **Step 1: Write the check**

```js
/*
 * Visuals check — every entry in every item's `visuals` list resolves to
 * something real: a FIGURES id with a file on disk, a PLATES id, a SCHEMATICS
 * or layout id, a model spec whose layer is a known GLB, or gen. Shape is
 * validate.js's job (it runs in the browser too); this is the half that needs
 * the filesystem.
 *
 * `--selftest` feeds known-bad lists through the same resolver and asserts each
 * is caught, so a refactor that loosens the gate fails here.
 *
 * Usage:  node work/visuals-check.mjs [--selftest]
 */
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FIGURES } from '../outputs/figures.js';
import { PLATES } from '../outputs/visual-data.js';
import { SCHEMATICS } from '../outputs/schematics.js';
import { LAYOUTS } from '../outputs/layouts.js';
import { STRUCTURE_MODELS } from '../outputs/study-data.js';
import { STUDY_ITEMS } from '../outputs/study-data.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'outputs');
let bad = 0;
const fail = (m) => { bad++; console.log(`FAIL  ${m}`); };
const ok = (m) => console.log(`  ok  ${m}`);

const layoutIds = new Set(Object.keys(LAYOUTS || {}));
const schematicIds = new Set(Object.keys(SCHEMATICS || {}));
const layerKeys = new Set(Object.keys(STRUCTURE_MODELS || {}));

/* Returns [] on success, [problem, ...] on failure. */
function resolveEntry(where, e) {
  const p = [];
  if (e.fig) {
    const f = FIGURES[e.fig];
    if (!f) p.push(`${where}: no FIGURES entry "${e.fig}"`);
    else if (!existsSync(join(root, 'assets', 'figures', f.file))) p.push(`${where}: figure file assets/figures/${f.file} missing`);
  } else if (e.plate) {
    if (!PLATES[e.plate]) p.push(`${where}: no PLATES entry "${e.plate}"`);
  } else if (e.schematic) {
    if (!schematicIds.has(e.schematic) && !layoutIds.has(e.schematic) && !FIGURES[e.schematic]) p.push(`${where}: "${e.schematic}" is not a schematic, layout or figure id`);
  } else if (e.model) {
    if (!layerKeys.has(e.model.layer)) p.push(`${where}: model layer "${e.model.layer}" is not a known GLB layer`);
  } else if (!e.gen) {
    p.push(`${where}: entry has no recognised key`);
  }
  return p;
}

if (process.argv.includes('--selftest')) {
  console.log('— selftest: known-bad entries must all be caught —');
  const cases = [
    ['unknown fig', { fig: 'definitely-not-a-figure' }],
    ['unknown plate', { plate: 'definitely-not-a-plate' }],
    ['unknown schematic', { schematic: 'definitely-not-a-schematic' }],
    ['unknown layer', { model: { layer: 'notALayer' } }],
    ['empty entry', {}],
  ];
  for (const [name, e] of cases) {
    const p = resolveEntry(`selftest ${name}`, e);
    if (!p.length) fail(`selftest "${name}" was NOT caught`);
    else ok(`selftest "${name}" caught: ${p[0]}`);
  }
  console.log(bad === 0 ? '\nSELFTEST OK' : `\n${bad} SELFTEST FAILURES`);
  process.exit(bad === 0 ? 0 : 1);
}

console.log('— every visuals[] entry resolves —');
let items = 0;
let entries = 0;
for (const item of STUDY_ITEMS) {
  if (!Array.isArray(item.visuals) || !item.visuals.length) continue;
  items++;
  item.visuals.forEach((e, i) => {
    entries++;
    for (const prob of resolveEntry(`${item.id} visuals[${i}]`, e)) fail(prob);
  });
}
ok(`${items} items with visuals, ${entries} entries checked`);

console.log(bad === 0 ? '\nALL PASS' : `\n${bad} FAILURES`);
process.exit(bad === 0 ? 0 : 1);
```

- [ ] **Step 2: Run it — no items have visuals yet, and selftest**

Run: `node work/visuals-check.mjs`
Expected: `0 items with visuals, 0 entries checked` then `ALL PASS`

Run: `node work/visuals-check.mjs --selftest`
Expected: five `selftest "..." caught` lines then `SELFTEST OK`

- [ ] **Step 3: Confirm imports exist**

If `outputs/layouts.js` does not export `LAYOUTS`, check its actual export name with `grep -n "export" outputs/layouts.js` and use that name. If `outputs/study-data.js` does not re-export `STRUCTURE_MODELS`, import it from `./study/corpus/structures.js` instead — verify with `grep -rn "STRUCTURE_MODELS" outputs/study-data.js outputs/study/corpus/structures.js`.

- [ ] **Step 4: Commit**

```bash
git add work/visuals-check.mjs
git commit -m "test(visuals): visuals-check.mjs resolves every list entry against real assets"
```

---

## Task 4: Renderer — `visualStackHTML` renders the list

**Files:**
- Modify: `outputs/study/lesson-visuals.js`
- Modify: `outputs/study/imports.js`

- [ ] **Step 1: Export `visualsFor` through the study barrel**

In `outputs/study/imports.js`, find the line importing from `../visual-data.js?v=4`:

```js
import { visualFor, plateFor } from '../visual-data.js?v=4';
```

change to:

```js
import { visualFor, visualsFor, plateFor } from '../visual-data.js?v=4';
```

and add `visualsFor,` to the big re-export object (next to `visualFor,`).

- [ ] **Step 2: Refactor the renderer**

In `outputs/study/lesson-visuals.js`:

Change the import line to add `visualsFor`:

```js
import { $$, DIAGRAMS, describeSource, esc, figureFor, plateFor, schematic, visualFor, visualsFor } from './imports.js';
```

Rename the body of the current `visualSlotHTML` to a new function `renderOneVisual(spec, item, { isPrimary })` that takes a resolved spec instead of an item, and returns the same HTML each branch produces today. The `model` branch keeps `id="lessonVis"` / `id="lessonVisMount"` **only when `isPrimary`** (there is one mount). Add a `plateRef` branch:

```js
  if (spec.kind === 'plateRef') {
    const pl = plateFor({ id: spec.id });   /* plateFor keys on item.id; pass the plate's own id */
    if (!pl) return '';
    return plateHTML ? '' : '';             /* see step 3 — use figureBlockHTML-style rendering */
  }
```

Then:

```js
export function visualStackHTML(item) {
  const specs = visualsFor(item);
  if (!specs.length) return '';
  const modelIdx = specs.findIndex((s) => s && s.kind === 'model');
  return `<div class="lessonvis-stack">${specs.map((s, i) =>
    renderOneVisual(s, item, { isPrimary: i === modelIdx })).join('')}</div>`;
}

export function visualSlotHTML(item) {
  return visualStackHTML(item);
}
```

Because `visualsFor(item)` returns `[visualFor(item)]` for every item without a `visuals` array, and `renderOneVisual` reproduces each existing branch byte-for-byte, an item with no `visuals` renders one figure inside a `<div class="lessonvis-stack">` wrapper — visually identical once the wrapper is `display: contents` (Step 4).

- [ ] **Step 3: `plateRef` rendering**

For `plateRef`, resolve with `plateFor({ id: spec.id })` and render with the existing `figureBlockHTML` shape (it already handles `intro`/`key`/credit). Extract the common figure-with-key markup if `figureBlockHTML` assumes figure-only fields; `PLATES` entries carry `file`, `intro`, `key`, and `plateFor` adds `src` and `PLATE_CREDIT` (`author`/`licence`/`via`). Map those onto the fields `figureBlockHTML` reads (`title`, `caption`, `author`, `licence`, `licenceUrl`, `commons`, `src`, `intro`, `key`) — `commons`/`licenceUrl` may be absent for plates, and `figureBlockHTML` already guards `fig.licenceUrl` with a ternary.

- [ ] **Step 4: CSS wrapper**

In `outputs/app.css`, add:

```css
.lessonvis-stack { display: contents; }
.lessonvis-stack > * + * { margin-top: 14px; }
```

`display: contents` makes the single-visual case identical to today. When there are siblings, restore them as block flow — override in the same rule set with `.lessonvis-stack:has(> * + *) { display: block; }` (supported in all current mobile browsers; if `:has` support is a concern, always use `display: block` and accept a harmless wrapper div in the one-visual case).

- [ ] **Step 5: Update the mount logic**

In `mountLessonVisual(item)` and `releaseLessonVisual()` and the `visMounted` bookkeeping, replace `const spec = visualFor(item)` with:

```js
  const spec = visualsFor(item).find((s) => s && s.kind === 'model') || null;
```

so the 3D canvas mounts to the model entry wherever it sits in the list. `if (!spec || spec.kind !== 'model')` guard stays.

- [ ] **Step 6: Load-check**

Run: `node work/load-check.mjs`
Expected: `NO LOAD-TIME ERRORS FOUND`

Run: `node work/binding-check.mjs`
Expected: `ALL PASS` (this catches a missing import of `visualsFor` or `plateFor`)

- [ ] **Step 7: Bump the module query if `visual-data.js` export surface changed**

`visual-data.js` is imported as `../visual-data.js?v=4`. Adding exports does not require a bump, but `outputs/sw.js` SHELL lists `./visual-data.js` — confirm the query there matches `imports.js`. Run `node work/shell-check.mjs`; if it flags a mismatch, align the `?v=` in both. Expected after: `ALL PASS`.

- [ ] **Step 8: Commit**

```bash
git add outputs/study/lesson-visuals.js outputs/study/imports.js outputs/app.css
git commit -m "feat(visuals): render an item's visuals list as a stack; mount 3D to the model entry"
```

---

## Task 5: Service worker — figures to a runtime cache

**Files:**
- Modify: `outputs/sw.js`

- [ ] **Step 1: Add the figures cache constants**

After the `MODEL_CACHE` / `CDN_CACHE` block:

```js
/*
 * Published figures. There are going to be a lot of them, and a first install
 * cannot pay for all of them. They live in their OWN versioned cache, filled
 * networkFirst the first time a lesson shows one, so a figure is offline after
 * one online view. Bump FIGURES_VERSION only to force a re-fetch of every
 * figure (e.g. a mass re-encode) — never on a shell change.
 */
const FIGURES_VERSION = 'f1';
const FIGURES_CACHE = `rss-figures-${FIGURES_VERSION}`;
```

Change `ALL_CACHES`:

```js
const ALL_CACHES = [SHELL_CACHE, MODEL_CACHE, CDN_CACHE, FIGURES_CACHE];
```

- [ ] **Step 2: Remove figures from `SHELL`**

Delete the fourteen `./assets/figures/*.svg|jpg` lines from the `SHELL` array and the comment block above them that starts `Replacement figures.` Keep the five `./assets/plates/*.png` lines — plates stay in the shell.

- [ ] **Step 3: Add an `isFigure` matcher and route it**

Near `isModel` / `isCdn`:

```js
const isFigure = (url) => url.pathname.includes('/assets/figures/');
```

In the `fetch` listener, after the `isModel` line:

```js
  if (isFigure(url)) { event.respondWith(networkFirst(event, request, FIGURES_CACHE)); return; }
```

- [ ] **Step 4: Bump `CACHE_VERSION`**

`v138` → `v139`.

- [ ] **Step 5: Checks**

Run: `node work/shell-check.mjs`
Expected: `ALL PASS` and `CACHE_VERSION is set (v139)` — shell-check walks the JS import graph and HTML-tag refs only; figure assets are neither, so removing them from SHELL is invisible to it.

Run: `node work/load-check.mjs`
Expected: `NO LOAD-TIME ERRORS FOUND`

- [ ] **Step 6: Commit**

```bash
git add outputs/sw.js
git commit -m "feat(sw): figures move to a networkFirst runtime cache off the precache shell"
```

---

## Task 6: `figure-key-check.mjs` walks `visuals[]`

**Files:**
- Modify: `work/figure-key-check.mjs`

- [ ] **Step 1: Collect ids from `visuals[]`**

In `work/figure-key-check.mjs`, after the loop that fills `usedFigureIds` from `ITEM_VISUALS`, add:

```js
/* Figures and plates named in an item's ordered visuals list. */
const usedPlateItemIds = new Set(Object.keys(PLATES));   /* plates already keyed by item id below */
for (const item of STUDY_ITEMS) {
  if (!Array.isArray(item.visuals)) continue;
  for (const e of item.visuals) {
    if (e && e.fig && FIGURES[e.fig]) usedFigureIds.add(e.fig);
    if (e && e.schematic && FIGURES[e.schematic]) usedFigureIds.add(e.schematic);
    /* a { plate: id } entry points at a PLATES key directly */
    if (e && e.plate && PLATES[e.plate]) checkEntry(`plate ${e.plate} (via ${item.id}.visuals)`, PLATES[e.plate]);
  }
}
```

(The `checkEntry` for plate refs runs inline here because `PLATES` is otherwise iterated by its own keys; a `{ plate }` ref may name a plate that no item owns by id.)

- [ ] **Step 2: Run it**

Run: `node work/figure-key-check.mjs`
Expected: `ALL PASS` (no item has `visuals` yet, so identical output to now)

- [ ] **Step 3: Commit**

```bash
git add work/figure-key-check.mjs
git commit -m "test(figures): figure-key-check walks item.visuals for figure and plate ids"
```

---

## Task 7: Register the baseline, regenerate docs, final sweep

**Files:**
- Modify: `work/baseline.mjs`
- Modify: `CLAUDE.md`
- Regenerate: `docs/CODEMAP.md`, `docs/DATA-INDEX.md`

- [ ] **Step 1: Add `visuals-check` to the baseline runner**

Open `work/baseline.mjs`. It lists checks as `['name', ['work/script.mjs']]` tuples (see `['figure-key-check', ['work/figure-key-check.mjs']]` at line ~37). Add:

```js
  ['visuals-check', ['work/visuals-check.mjs']],
```

next to it. Counts in the check output are deterministic, so the baseline is stable; confirm by running it twice.

Run: `node work/baseline.mjs`
Then: `node work/baseline.mjs --check`
Expected: `ALL PASS` including `ok   visuals-check`

- [ ] **Step 2: One line in CLAUDE.md**

Under "After every edit", after the `figure-key-check.mjs` line, add:

```
node work/visuals-check.mjs      # every item.visuals[] entry resolves to a real
                                 # figure/plate/schematic/layer; --selftest proves
                                 # the gate still bites
```

- [ ] **Step 3: Regenerate the generated docs**

First check nothing else is dirty:

Run: `git status --porcelain`
Expected: only the files this plan has touched.

Run: `node work/codemap.mjs`
Run: `node work/data-index.mjs`

- [ ] **Step 4: Full after-every-edit sweep**

Run each and expect a pass line:

```
node work/load-check.mjs
node work/syntax-check.mjs
node work/verify-modules.mjs
node work/shell-check.mjs
node work/binding-check.mjs
node work/figure-key-check.mjs
node work/visuals-check.mjs
node work/visuals-check.mjs --selftest
node work/codemap-check.mjs
node work/data-index-check.mjs
node work/baseline.mjs --check
```

- [ ] **Step 5: Commit**

```bash
git add work/baseline.mjs work/baselines CLAUDE.md docs/CODEMAP.md docs/DATA-INDEX.md
git commit -m "chore(visuals): register visuals-check baseline; regenerate CODEMAP and DATA-INDEX"
```

---

## Task 8: Real-Chrome acceptance

**Files:** none — verification only.

- [ ] **Step 1: Start the dev server and open a lesson**

Run: `node work/dev-server.mjs` (or the Browser pane `preview_start`), open `http://localhost:8420/radiography-study-studio.html`, unregister the old service worker and clear caches, reload.

- [ ] **Step 2: Confirm no regression on an existing lesson**

Open any HSS2011 lesson with a 3D model visual (e.g. a carpals structure item) and any with a single figure (e.g. `abct2326-renal-nephron`). Expected: the visual renders exactly as before, the 3D still mounts and is tappable, the plate below still renders.

- [ ] **Step 3: Temporary two-visual item, end to end**

Add to one existing item literal (e.g. in `derived-items.js`) `visuals: [{ fig: 'nephron' }, { schematic: 'negativeFeedback' }]`. Reload the lesson.
Expected: two figure blocks stacked, 14px apart, each with its own intro/key/credit; console clean; `node work/verify-modules.mjs` and `node work/visuals-check.mjs` still pass.
Revert the edit and reload.

- [ ] **Step 4: Offline figure**

DevTools → Network → Offline. Open a lesson whose figure you have **not** viewed this session. Expected: figure fails to load (broken-image), rest of the lesson intact. Go online, reload, view it, go offline, reload. Expected: figure now loads from `rss-figures-f1`.

- [ ] **Step 5: Screenshot the two-visual state** (from Step 3, before reverting) and share with the user as proof.

---

## Self-Review

**Spec coverage:**
- schema `visuals[]` → Task 1 (`visualsFor`), Task 2 (`validateVisuals`).
- renderer stacks the list, 3D mounts to the model entry → Task 4.
- figures to `rss-figures-vN` runtime cache, plates stay in shell, `CACHE_VERSION` bumps, `FIGURES_VERSION` separate → Task 5.
- `figure-key-check` walks `visuals[]` → Task 6.
- new licence/asset/id resolution check → Task 3 (`visuals-check.mjs`, with `--selftest`).
- DATA-INDEX / CODEMAP / baselines regenerated → Task 7.
- "no lesson text changes in SP0, validateCorpus stays 0" → held by every task running `verify-modules`.
- Real-Chrome acceptance (renders at size, figure offline after one view, 3D mounts, credits render) → Task 8.
- **Gap:** the spec's "N of M affordance for lists longer than 3" is deliberately deferred — SP0 renders all entries stacked; the affordance is an SP1-or-later polish once real long lists exist. Noted, not built.
- **Gap:** the spec says `figure-key-check` also checks "each licence string is on the fetch-figure.mjs allow-list". `fetch-figure.mjs` already refuses a non-free licence at download time, so every file in `assets/figures/` is already free; re-checking the string adds little and `fetch-figure`'s `FREE` array is not exported. Left to SP-later if it proves needed.

**Placeholder scan:** Step 3 of Task 4 (`plateRef` rendering) leans on "map those onto the fields figureBlockHTML reads" rather than giving the exact function body — because the exact shape depends on reading `figureBlockHTML` and `PLATE_CREDIT` at implementation time. Acceptable: the fields to map are all named. Everything else has concrete code.

**Type consistency:** `visualsFor` (Task 1) used in Task 4 and Task 3's imports. `validateVisuals` (Task 2) — name matches its call site. `visualStackHTML` / `renderOneVisual` (Task 4) — consistent. `FIGURES_CACHE` / `isFigure` (Task 5) — consistent. `plateRef` kind (Task 1 `normaliseVisualSpec`, Task 4 renderer branch) — consistent.

---

## Notes for the implementer

- `outputs/` is CRLF, `work/*.mjs` is LF. A patch that matches on `\n` finds nothing in `outputs/`.
- Another session may be editing this tree. `git status` before `codemap.mjs` / `data-index.mjs` / `baseline.mjs`; regenerating sweeps another session's unfinished work into your commit.
- No lesson gets a real `visuals` array in SP0. The temporary ones in Tasks 2, 4 and 8 are reverted before their commits.
