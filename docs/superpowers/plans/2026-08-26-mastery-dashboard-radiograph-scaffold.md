# Mastery Dashboard + Radiograph Scaffold Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a cross-subject mastery dashboard (tier-ladder dot grid + a "drill weakest 20" shortcut) to Radiography Study Studio, and lay minimal, content-free groundwork so real radiograph images can be added later without a refactor.

**Architecture:** Everything is additive to the existing two-file app (`outputs/study-data.js` for pure data/logic, `outputs/radiography-study-studio.html` for the module-script UI). Two new pure functions (`tierFor`, and an image-aware `dimensionFor`) live in `study-data.js` and are verified directly under Node (no browser needed) before any UI is wired up. The dashboard reuses the existing `coverageDialog`/`.cov-sec` visual pattern; the radiograph image support reuses the existing `mcq`/`typed` question types by adding one optional `image` field, instead of introducing a new item type.

**Tech Stack:** Vanilla JS ES modules, no build step, no test framework. `study-data.js`'s pure functions are verified with plain `node --input-type=module` one-liners. UI changes are verified manually in a browser via `python -m http.server`.

---

## File Structure

- **Modify:** `outputs/study-data.js` — add `tierFor`/`TIER_LABELS`, make `dimensionFor` image-aware, add a documented (non-live) schema comment for future radiograph items.
- **Modify:** `outputs/radiography-study-studio.html` — add the `dashDialog` markup + CSS, an `openDashboard()` render function, a `pickItems()` limit option, and image support in `practiseHTML()`.
- **Create:** `outputs/assets/xray/README.md` — filename convention and the source-discipline rule, for whenever real images are added.

No new files are needed for logic — both changed files already exist and this feature is small enough that splitting further would add indirection without benefit.

---

### Task 1: `dimensionFor()` becomes image-aware

**Files:**
- Modify: `outputs/study-data.js:3069-3072`

- [ ] **Step 1: Write the failing check**

Run this from `outputs/`:

```bash
node --input-type=module -e "
import { dimensionFor } from './study-data.js';
const got = dimensionFor({ type: 'mcq', image: 'cxr-pa-001.jpg' });
console.log(got === 'location' ? 'PASS' : 'FAIL got ' + got);
"
```

Expected: `FAIL got recognition` (current code ignores `image` and falls through to the `mcq` → `recognition` default).

- [ ] **Step 2: Implement**

In `outputs/study-data.js`, find:

```js
export function dimensionFor(question) {
  if (question.type === 'typed' || question.type === 'cloze') return 'typedRecall';
  return (ITEM_TYPES[question.type] || {}).dimension || 'recognition';
}
```

Replace with:

```js
export function dimensionFor(question) {
  if (question.image) return 'location';
  if (question.type === 'typed' || question.type === 'cloze') return 'typedRecall';
  return (ITEM_TYPES[question.type] || {}).dimension || 'recognition';
}
```

- [ ] **Step 3: Re-run the check**

```bash
node --input-type=module -e "
import { dimensionFor } from './study-data.js';
const got = dimensionFor({ type: 'mcq', image: 'cxr-pa-001.jpg' });
console.log(got === 'location' ? 'PASS' : 'FAIL got ' + got);
"
```

Expected: `PASS`

- [ ] **Step 4: Confirm no regression on the non-image path**

```bash
node --input-type=module -e "
import { dimensionFor } from './study-data.js';
console.log(dimensionFor({ type: 'mcq' }) === 'recognition' ? 'PASS' : 'FAIL');
console.log(dimensionFor({ type: 'typed' }) === 'typedRecall' ? 'PASS' : 'FAIL');
console.log(dimensionFor({ type: 'landmark' }) === 'location' ? 'PASS' : 'FAIL');
"
```

Expected: `PASS` × 3

- [ ] **Step 5: Commit**

```bash
cd "C:\Users\leung\Documents\Codex\2026-08-24\files-pasted-by-the-user-yes"
git add outputs/study-data.js
git commit -m "feat: route image-bearing questions to the location mastery dimension"
```

---

### Task 2: `tierFor()` pure function + `TIER_LABELS`

**Files:**
- Modify: `outputs/study-data.js:3055-3072` (insert between `isDue` and `dimensionFor`)

- [ ] **Step 1: Write the failing check**

```bash
node --input-type=module -e "
import { tierFor, TIER_LABELS } from './study-data.js';
console.log(typeof tierFor);
"
```

Expected: `undefined` (function doesn't exist yet — import will actually throw or yield `undefined` depending on bundler-less ESM behavior; either counts as failing).

- [ ] **Step 2: Implement**

In `outputs/study-data.js`, find:

```js
export function isDue(rec, now = Date.now()) {
  if (!rec || !rec.attempts) return true;
  return rec.due <= now;
}

export function dimensionFor(question) {
```

Replace with:

```js
export function isDue(rec, now = Date.now()) {
  if (!rec || !rec.attempts) return true;
  return rec.due <= now;
}

/*
 * Five-tier mastery ladder for the dashboard. Pure function over a score
 * (masteryScore()'s 0..1 output) and an attempted flag — no storage access,
 * so it's testable without a browser.
 */
export const TIER_LABELS = ['Not started', 'Seen', 'Recognised', 'Recalled', 'Mastered'];

export function tierFor(score, attempted) {
  if (!attempted) return 0;
  if (score >= 0.85) return 4;
  if (score >= 0.65) return 3;
  if (score >= 0.4) return 2;
  return 1;
}

export function dimensionFor(question) {
```

- [ ] **Step 3: Re-run the check plus boundary cases**

```bash
node --input-type=module -e "
import { tierFor, TIER_LABELS } from './study-data.js';
const cases = [
  [tierFor(0, false), 0],
  [tierFor(0, true), 1],
  [tierFor(0.39, true), 1],
  [tierFor(0.4, true), 2],
  [tierFor(0.64, true), 2],
  [tierFor(0.65, true), 3],
  [tierFor(0.84, true), 3],
  [tierFor(0.85, true), 4],
  [tierFor(1, true), 4],
];
const fails = cases.filter(([got, want]) => got !== want);
console.log(fails.length === 0 ? 'PASS all ' + cases.length : 'FAIL ' + JSON.stringify(fails));
console.log(TIER_LABELS.length === 5 ? 'PASS labels' : 'FAIL labels');
"
```

Expected: `PASS all 9` and `PASS labels`

- [ ] **Step 4: Commit**

```bash
cd "C:\Users\leung\Documents\Codex\2026-08-24\files-pasted-by-the-user-yes"
git add outputs/study-data.js
git commit -m "feat: add tierFor() five-tier mastery ladder helper"
```

---

### Task 3: Documented (non-live) radiograph schema comment

**Files:**
- Modify: `outputs/study-data.js:2551` (right after `HTI_ITEMS` closes)

- [ ] **Step 1: Insert the comment**

Find:

```js
    sourceRefs: [{ ref: 'hti.w5', location: 'Slides 3–7 Hospital Authority structure, manpower, team work, floor plan, reading the order form' }],
  },
];

/* ------------------------------------------------------------------ *
```

Replace with:

```js
    sourceRefs: [{ ref: 'hti.w5', location: 'Slides 3–7 Hospital Authority structure, manpower, team work, floor plan, reading the order form' }],
  },
];

/*
 * Radiograph image questions — schema for later use, not live data.
 *
 * A radiograph question is a normal STUDY_ITEM (any subject/unit) whose
 * `practice` entries carry an extra `image` field: a filename resolved
 * against outputs/assets/xray/. No new item type is needed — `mcq` and
 * `typed` questions both support it as-is, and dimensionFor() already
 * routes any question with an `image` field to the 'location' mastery
 * dimension.
 *
 * Add real cases only once you have a licensed image file AND a genuine
 * sourceRefs entry pointing at a file that exists in the supplied source
 * folders — see outputs/assets/xray/README.md and the project rule at the
 * top of this file. Do not invent positioning notes, landmark facts or
 * mnemonics. The supplied HTI17103/HTI17101 materials only establish "PA"
 * and "Lat" as projection terms so far (see the
 * 'hti17103-department-and-request' item above) — a real case's prompt and
 * explanation text must stay inside what the cited source actually says.
 *
 * Example shape (illustrative only — do not add this object to STUDY_ITEMS):
 *
 * {
 *   id: 'hti17103-cxr-pa-example',
 *   subject: 'HTI17103', unit: 'hti.modalities', type: 'mcq',
 *   title: 'Reading a CXR PA radiograph',
 *   lesson: { explanation: '...', keyFacts: ['...'], prerequisites: [], examples: [] },
 *   practice: [
 *     { type: 'mcq', image: 'cxr-pa-001.jpg',
 *       prompt: 'Which projection is shown here?',
 *       options: ['PA', 'Lat', 'AP', 'Oblique'], answer: 0,
 *       explanation: '...cite exactly what the source says...' },
 *   ],
 *   sourceRefs: [{ ref: 'hti.w2', location: '...' }],
 * }
 */

/* ------------------------------------------------------------------ *
```

- [ ] **Step 2: Verify the file still parses and item count is unchanged**

```bash
node --input-type=module -e "
import { STUDY_ITEMS } from './study-data.js';
console.log(STUDY_ITEMS.length === 69 ? 'PASS 69 items' : 'FAIL got ' + STUDY_ITEMS.length);
"
```

Expected: `PASS 69 items` (a comment must not add anything to the exported array)

- [ ] **Step 3: Commit**

```bash
cd "C:\Users\leung\Documents\Codex\2026-08-24\files-pasted-by-the-user-yes"
git add outputs/study-data.js
git commit -m "docs: document radiograph item schema without adding invented content"
```

---

### Task 4: `pickItems()` weakest-mode limit

**Files:**
- Modify: `outputs/radiography-study-studio.html` (inside the `pickItems` function, `'weakest'` case)

- [ ] **Step 1: Implement**

Find:

```js
    case 'weakest':
      return pool.filter((i) => itemAttempted(i.id)).sort(byWeak).slice(0, 10);
```

Replace with:

```js
    case 'weakest':
      return pool.filter((i) => itemAttempted(i.id)).sort(byWeak).slice(0, opts.limit || 10);
```

- [ ] **Step 2: Verify manually in the browser**

Serve the app:

```bash
cd "C:\Users\leung\Documents\Codex\2026-08-24\files-pasted-by-the-user-yes\outputs"
python -m http.server 8080
```

Open `http://localhost:8080/radiography-study-studio.html`, click "Review my weakest topics" from the home page mode grid. Confirm the session still starts (unaffected — this mode passes no `limit`, so it still defaults to 10). This is a regression check only; the `limit:20` path is exercised end-to-end in Task 6.

- [ ] **Step 3: Commit**

```bash
cd "C:\Users\leung\Documents\Codex\2026-08-24\files-pasted-by-the-user-yes"
git add outputs/radiography-study-studio.html
git commit -m "feat: let pickItems weakest mode take a configurable limit"
```

---

### Task 5: Dashboard markup + CSS

**Files:**
- Modify: `outputs/radiography-study-studio.html` (top-actions buttons, dialog markup, `<style>` block)

- [ ] **Step 1: Add the "Mastery map" button**

Find:

```html
    <div class="top-actions">
      <button class="ghost" id="rssHomeBtn">All subjects</button>
      <button class="ghost" id="rssCoverageBtn">Coverage report</button>
      <button class="ghost" id="aboutBtn">Sources &amp; model</button>
    </div>
```

Replace with:

```html
    <div class="top-actions">
      <button class="ghost" id="rssHomeBtn">All subjects</button>
      <button class="ghost" id="rssDashBtn">Mastery map</button>
      <button class="ghost" id="rssCoverageBtn">Coverage report</button>
      <button class="ghost" id="aboutBtn">Sources &amp; model</button>
    </div>
```

- [ ] **Step 2: Add the `dashDialog` markup**

Find:

```html
<dialog id="coverageDialog"><button class="ghost close" id="closeCoverage">Close</button><div class="eyebrow">Coverage report</div><h2 class="task-title" style="margin-top:6px">What the supplied sources actually cover</h2><div class="dlg-scroll" id="coverageBody"></div></dialog>
```

Replace with:

```html
<dialog id="coverageDialog"><button class="ghost close" id="closeCoverage">Close</button><div class="eyebrow">Coverage report</div><h2 class="task-title" style="margin-top:6px">What the supplied sources actually cover</h2><div class="dlg-scroll" id="coverageBody"></div></dialog>
<dialog id="dashDialog"><button class="ghost close" id="closeDash">Close</button><div class="eyebrow">Mastery map</div><h2 class="task-title" style="margin-top:6px">Where you stand across every subject</h2><div class="dash-legend" id="dashLegend"></div><div class="rss-actions" style="margin-bottom:14px"><button class="primary" id="dashWeakestBtn">Drill weakest 20 →</button></div><div class="dlg-scroll" id="dashBody"></div></dialog>
```

- [ ] **Step 3: Add the dot-grid CSS**

Find (the last rule before the style block closes):

```
@media(max-width:560px){.steps{gap:5px}.step{min-width:0;flex:1 1 30%;padding:8px}.step b{font-size:12px}.step{font-size:11px}}

  </style>
```

Replace with:

```
@media(max-width:560px){.steps{gap:5px}.step{min-width:0;flex:1 1 30%;padding:8px}.step b{font-size:12px}.step{font-size:11px}}
.tier-dot{display:inline-block;width:9px;height:9px;border-radius:50%;margin:0 3px 3px 0}
.tier-dot.t0{background:var(--muted);opacity:.5}
.tier-dot.t1{background:var(--red)}
.tier-dot.t2{background:var(--orange)}
.tier-dot.t3{background:var(--teal)}
.tier-dot.t4{background:var(--green)}
.dash-legend{display:flex;gap:14px;flex-wrap:wrap;font-size:12px;color:var(--muted);margin-bottom:14px}
.dash-legend .tier-dot{margin-right:5px}
.dash-unit{margin:10px 0;padding:10px 12px;border:1px solid var(--line);border-radius:11px;background:rgba(255,255,255,.02)}
.dash-unit .lab{display:flex;justify-content:space-between;gap:8px;font-size:13px;margin-bottom:6px}
.xray-img{width:100%;max-height:42vh;object-fit:contain;border-radius:12px;background:#000;border:1px solid var(--line);margin-bottom:10px;display:block}

  </style>
```

- [ ] **Step 4: Commit**

```bash
cd "C:\Users\leung\Documents\Codex\2026-08-24\files-pasted-by-the-user-yes"
git add outputs/radiography-study-studio.html
git commit -m "feat: add mastery-map dialog markup and dot-grid CSS"
```

(No functional verification yet — the dialog has no JS wiring until Task 6. Nothing renders differently until then, so this step is markup-only and safe to commit standalone.)

---

### Task 6: `openDashboard()` render function + wiring

**Files:**
- Modify: `outputs/radiography-study-studio.html` (imports, boot/wiring section)

- [ ] **Step 1: Import the new pure functions**

Find:

```js
import {
  SUBJECTS, STUDY_ITEMS, STUDY_MODES, ITEM_TYPES, MASTERY_DIMENSIONS, MEMORY_METHODS,
  SOURCE_FILES, SOURCE_ROOTS, COVERAGE, DIAGRAMS, SOCIOLOGY_NOTICE, PLACEHOLDER_NOTICES,
  STORAGE_PREFIX, LEGACY_STATS_KEY, DATA_VERSION,
  getSubject, getItem, itemsForSubject, itemsForUnit, questionsOf, allQuestions,
  describeSource, coverageFor, blankMastery, schedule, masteryScore, isDue, dimensionFor,
  validateCorpus, validateApplications,
} from './study-data.js';
```

Replace with:

```js
import {
  SUBJECTS, STUDY_ITEMS, STUDY_MODES, ITEM_TYPES, MASTERY_DIMENSIONS, MEMORY_METHODS,
  SOURCE_FILES, SOURCE_ROOTS, COVERAGE, DIAGRAMS, SOCIOLOGY_NOTICE, PLACEHOLDER_NOTICES,
  STORAGE_PREFIX, LEGACY_STATS_KEY, DATA_VERSION,
  getSubject, getItem, itemsForSubject, itemsForUnit, questionsOf, allQuestions,
  describeSource, coverageFor, blankMastery, schedule, masteryScore, isDue, dimensionFor,
  tierFor, TIER_LABELS,
  validateCorpus, validateApplications,
} from './study-data.js';
```

- [ ] **Step 2: Add `openDashboard()` next to `openCoverage()`**

Find:

```js
      <ul>${COVERAGE.notes.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>
    </div>`}`;
  $$('coverageDialog').showModal();
}

/* ------------------------------------------------------------------ *
 * Boot
 * ------------------------------------------------------------------ */
```

Replace with:

```js
      <ul>${COVERAGE.notes.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>
    </div>`}`;
  $$('coverageDialog').showModal();
}

/* ------------------------------------------------------------------ *
 * Mastery dashboard
 * ------------------------------------------------------------------ */

function openDashboard() {
  $$('dashLegend').innerHTML = TIER_LABELS.map((label, i) =>
    `<span><span class="tier-dot t${i}"></span>${esc(label)}</span>`).join('');

  const blocks = SUBJECTS.filter((s) => itemsForSubject(s.id).length).map((subject) => {
    const unitRows = subject.units.map((unit) => {
      const items = itemsForUnit(subject.id, unit.id);
      if (!items.length) return '';
      const tiers = items.map((i) => tierFor(itemScore(i.id), itemAttempted(i.id)));
      const dots = items.map((i, idx) =>
        `<span class="tier-dot t${tiers[idx]}" title="${esc(i.title)} — ${esc(TIER_LABELS[tiers[idx]])}"></span>`).join('');
      const solid = tiers.filter((t) => t >= 3).length;
      return `<div class="dash-unit"><div class="lab"><span>${esc(unit.label)}</span><span class="mono" style="color:var(--muted)">${solid}/${items.length} recalled+</span></div><div>${dots}</div></div>`;
    }).join('');
    return `<div class="cov-sec"><h4>${esc(subject.code + ' — ' + subject.title)}</h4>${unitRows}</div>`;
  }).join('');

  $$('dashBody').innerHTML = blocks || '<div class="emptybox">No study items yet.</div>';
  $$('dashDialog').showModal();
}

/* ------------------------------------------------------------------ *
 * Boot
 * ------------------------------------------------------------------ */
```

- [ ] **Step 3: Wire the buttons**

Find:

```js
$$('rssCoverageBtn').onclick = () => openCoverage(null);
$$('closeSource').onclick = () => $$('sourceDialog').close();
$$('closeCoverage').onclick = () => $$('coverageDialog').close();
```

Replace with:

```js
$$('rssCoverageBtn').onclick = () => openCoverage(null);
$$('rssDashBtn').onclick = openDashboard;
$$('closeSource').onclick = () => $$('sourceDialog').close();
$$('closeCoverage').onclick = () => $$('coverageDialog').close();
$$('closeDash').onclick = () => $$('dashDialog').close();
$$('dashWeakestBtn').onclick = () => { $$('dashDialog').close(); startSession({ mode: 'weakest', limit: 20 }); };
```

- [ ] **Step 4: Verify in the browser**

```bash
cd "C:\Users\leung\Documents\Codex\2026-08-24\files-pasted-by-the-user-yes\outputs"
python -m http.server 8080
```

Open `http://localhost:8080/radiography-study-studio.html`:

1. Answer 3–4 questions across at least two subjects (e.g. one HSS2011 term, one physiology item), varying confidence and correctness.
2. Click "Mastery map" in the top bar. Confirm: the legend shows 5 tier labels with colored dots; subject blocks appear for subjects with items (DSAI1202/LEI1101/APSS1A08 should NOT appear, since they have zero study items); the units you just answered show at least one non-grey dot; hovering a dot shows a tooltip with the item title and tier label.
3. Click "Drill weakest 20 →". Confirm the dialog closes and a study session starts (with however many attempted items exist — fewer than 20 is expected and correct if you haven't answered 20 yet).
4. Reload the page, reopen "Mastery map" — confirm the dots still reflect what you answered (mastery persisted via `localStorage`, unchanged by this feature).

- [ ] **Step 5: Commit**

```bash
cd "C:\Users\leung\Documents\Codex\2026-08-24\files-pasted-by-the-user-yes"
git add outputs/radiography-study-studio.html
git commit -m "feat: wire up the mastery dashboard and drill-weakest-20 shortcut"
```

---

### Task 7: Radiograph image rendering in `practiseHTML()`

**Files:**
- Modify: `outputs/radiography-study-studio.html` (`toast()` area for the new helper, `practiseHTML()`)

- [ ] **Step 1: Add the `xrayFallback()` helper**

Find:

```js
let toastTimer = null;
function toast(msg) {
  const el = $$('toast');
  if (!el) return;
  el.textContent = msg; el.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 4200);
}
```

Replace with:

```js
let toastTimer = null;
function toast(msg) {
  const el = $$('toast');
  if (!el) return;
  el.textContent = msg; el.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 4200);
}

/* A missing radiograph image degrades to a plain notice instead of a
   broken-image icon or a blocked session. */
function xrayFallback(el) {
  const div = document.createElement('div');
  div.className = 'emptybox';
  div.textContent = 'Image not found — add it to assets/xray/ and reload.';
  el.replaceWith(div);
}
window.xrayFallback = xrayFallback;
```

(`window.xrayFallback` is required because the `onerror` attribute below runs as inline HTML-event JS, which only sees global scope — this module script's top-level `function` declarations are module-scoped, not global, so without this line the browser would throw `xrayFallback is not defined` when an image 404s.)

- [ ] **Step 2: Show the image above the question, when present**

Find:

```js
  return `<div class="lesson">
    <div class="eyebrow">Practise · ${esc(typeLabel(q.type))} · question ${Math.min(session.qIndex, qs.length - 1) + 1} of ${qs.length}</div>
    <div class="q-prompt">${esc(q.prompt)}</div>
    <div id="rssQBody">${questionBody(q)}</div>
    ${confidenceRow()}
    <div id="rssVerdict"></div>
    <div class="rss-actions" id="rssPractiseNav"></div>
  </div>`;
```

Replace with:

```js
  return `<div class="lesson">
    <div class="eyebrow">Practise · ${esc(typeLabel(q.type))} · question ${Math.min(session.qIndex, qs.length - 1) + 1} of ${qs.length}</div>
    <div class="q-prompt">${esc(q.prompt)}</div>
    ${q.image ? `<img class="xray-img" src="assets/xray/${esc(q.image)}" alt="Radiograph" onerror="xrayFallback(this)">` : ''}
    <div id="rssQBody">${questionBody(q)}</div>
    ${confidenceRow()}
    <div id="rssVerdict"></div>
    <div class="rss-actions" id="rssPractiseNav"></div>
  </div>`;
```

- [ ] **Step 3: Verify the fallback with a throwaway test question**

This step temporarily adds a fake `image` field to prove the fallback path, then reverts it — no real (or fake) radiograph content ends up committed.

In `outputs/study-data.js`, temporarily find the first `practice` question in `HSS_TERMINOLOGY` (the `hss2011-terminology-anatomical-position` item's `mcq` question) and add `image: 'does-not-exist.jpg',` to it, e.g.:

```js
      { type: 'mcq', image: 'does-not-exist.jpg', prompt: 'In the anatomical position, where do the palms face?', options: [...
```

Serve and open the app:

```bash
cd "C:\Users\leung\Documents\Codex\2026-08-24\files-pasted-by-the-user-yes\outputs"
python -m http.server 8080
```

Navigate to `http://localhost:8080/radiography-study-studio.html` → HSS2011 → "Anatomical orientation & terminology" unit → start a session → advance to Practise on the anatomical-position item. Confirm: no broken-image icon appears; instead you see the text "Image not found — add it to assets/xray/ and reload." directly above the MCQ options, and the MCQ still works normally (you can answer it).

Then **revert** the temporary `image: 'does-not-exist.jpg',` edit in `outputs/study-data.js` — confirm with:

```bash
cd "C:\Users\leung\Documents\Codex\2026-08-24\files-pasted-by-the-user-yes\outputs"
node --input-type=module -e "
import { STUDY_ITEMS } from './study-data.js';
const q = STUDY_ITEMS.find((i) => i.id === 'hss2011-terminology-anatomical-position').practice[0];
console.log(!q.image ? 'PASS reverted' : 'FAIL still has image field');
"
```

Expected: `PASS reverted`

- [ ] **Step 4: Commit**

```bash
cd "C:\Users\leung\Documents\Codex\2026-08-24\files-pasted-by-the-user-yes"
git add outputs/radiography-study-studio.html
git commit -m "feat: render optional question images with a graceful missing-file fallback"
```

---

### Task 8: `assets/xray/README.md`

**Files:**
- Create: `outputs/assets/xray/README.md`

- [ ] **Step 1: Create the folder and file**

```md
# assets/xray

Real radiograph image files for radiograph-style study items go here. This
folder is empty by default — no placeholder or sample images are included.

## Filename convention

Lowercase, hyphenated, matching the `image` field on the `practice` question
that references it — e.g. `cxr-pa-001.jpg`.

## Adding a case

1. Drop the image file in this folder.
2. In `outputs/study-data.js`, add a real `STUDY_ITEM` (or a `practice`
   entry on an existing item) with `image: '<filename>'` on the question,
   and a `sourceRefs` entry pointing at a file that actually exists in your
   source folders. See the schema comment directly above where `HTI_ITEMS`
   closes in that file for the exact shape.
3. If the referenced image can't be found at render time, the question
   shows "Image not found — add it to assets/xray/ and reload" instead of a
   broken image or a stuck session.

## The rule that applies here too

This project's governing rule is: every factual study claim must trace to a
file that exists in your supplied source folders. No internet research, no
generic textbook expansion, no invented syllabus content. That applies to
radiograph cases exactly as it does to every other subject — do not invent
positioning notes, landmark facts or mnemonics for an image just because it
"looks right." See the top of `outputs/study-data.js` and the main
`outputs/README.md` for the full rule and how source references work.
```

- [ ] **Step 2: Verify the folder is picked up by git**

```bash
cd "C:\Users\leung\Documents\Codex\2026-08-24\files-pasted-by-the-user-yes"
git status --porcelain=v1 outputs/assets/xray/
```

Expected: `?? outputs/assets/xray/README.md`

- [ ] **Step 3: Commit**

```bash
cd "C:\Users\leung\Documents\Codex\2026-08-24\files-pasted-by-the-user-yes"
git add outputs/assets/xray/README.md
git commit -m "docs: document the radiograph asset folder convention"
```

---

### Task 9: Final end-to-end verification

**Files:** none (verification only)

- [ ] **Step 1: Full regression pass in the browser**

```bash
cd "C:\Users\leung\Documents\Codex\2026-08-24\files-pasted-by-the-user-yes\outputs"
python -m http.server 8080
```

Open `http://localhost:8080/radiography-study-studio.html` and confirm, in order:

1. Home page loads, subject cards and mode grid render as before (no visual regression from the new CSS).
2. "Review my weakest topics" from the home mode grid still works (Task 4 regression check, repeated here after all other changes landed).
3. "Mastery map" opens, shows correct tiers for items you've studied in this session and prior sessions, "Drill weakest 20 →" starts a session.
4. Open the "Coverage report" and "Sources & model" dialogs — confirm both still open and close correctly (unaffected by the new `dashDialog`, but worth checking since a dialog id typo could silently break a sibling button).
5. Open the embedded Osteology 3D studio (via the HSS2011 subject page) — confirm it still boots (unaffected file, but shares the page).

- [ ] **Step 2: Run every Node-level check from Tasks 1–3 together, as a final sanity pass**

```bash
cd "C:\Users\leung\Documents\Codex\2026-08-24\files-pasted-by-the-user-yes\outputs"
node --input-type=module -e "
import { dimensionFor, tierFor, TIER_LABELS, STUDY_ITEMS } from './study-data.js';
const checks = [
  [dimensionFor({ type: 'mcq', image: 'x.jpg' }) === 'location', 'image routes to location'],
  [dimensionFor({ type: 'mcq' }) === 'recognition', 'mcq default unaffected'],
  [dimensionFor({ type: 'typed' }) === 'typedRecall', 'typed unaffected'],
  [tierFor(0, false) === 0, 'tier 0'],
  [tierFor(0.9, true) === 4, 'tier 4'],
  [TIER_LABELS.length === 5, 'five tier labels'],
  [STUDY_ITEMS.length === 69, 'no items added by the schema comment'],
];
const fails = checks.filter(([ok]) => !ok);
console.log(fails.length === 0 ? 'PASS all ' + checks.length : 'FAIL ' + JSON.stringify(fails.map((f) => f[1])));
"
```

Expected: `PASS all 7`

- [ ] **Step 3: Confirm working tree is clean**

```bash
cd "C:\Users\leung\Documents\Codex\2026-08-24\files-pasted-by-the-user-yes"
git status --porcelain=v1
```

Expected: empty output (everything from Tasks 1–8 already committed).

---

## Self-Review Notes

- **Spec coverage:** Part A (tiers, dialog, dot grid by subject/unit, drill-weakest-20) → Tasks 1, 4, 5, 6. Part B (optional `image` field, `dimensionFor` routing, graceful missing-file fallback, documented non-live schema, `assets/xray/README.md`) → Tasks 1, 3, 7, 8. Both "out of scope" items from the spec (no invented case data, no pre-boot pool filtering) are honored — no task adds either.
- **Deviation from the spec worth flagging:** the spec's Part B sketched the image markup living inside `questionBody()`'s per-type `switch`. Task 7 instead adds it once in `practiseHTML()`, above the call to `questionBody()`. Same visible result (image above the answer controls), but a one-line insertion at a single call site instead of touching every `case` branch — smaller diff, same behavior.
- **Placeholder scan:** no TBD/TODO markers; every step has literal code and literal expected output.
- **Type/name consistency:** `tierFor(score, attempted)` and `TIER_LABELS` are defined once in Task 2 and used with identical names/argument order in Task 6. `xrayFallback` is defined once in Task 7 and referenced by that exact name in the same task's `onerror` attribute. `dashDialog`/`dashLegend`/`dashBody`/`dashWeakestBtn`/`closeDash`/`rssDashBtn` ids are introduced in Task 5's markup and consumed with matching ids in Task 6 — verified against each other while writing this plan.
