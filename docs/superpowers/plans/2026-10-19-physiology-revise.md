# ABCT2326 Human Physiology Revise map — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Revise gets a subject switch and an ABCT2326 Human Physiology map with the depth
HSS2011 has (week-gated topics, one-line rows read off the 2026 slides, linked rows, the 3D
hub, threads, tables, decoder), with every one of the owner's standing rules enforced by a
check rather than by memory.

**Architecture:** The view code is made subject-neutral: body-system colours, hub order and
a few words move from hard-coded anatomy maps into the registry entry; the owner's rules
become pure functions in `outputs/revision/rules.js`, used by both the app and
`work/revision-check.mjs`. Physiology data is new files only (`abct2326-*.js`), with
sourced topics, new leaf kinds (cell, substance, process) and structured, sourced
fragments rendered by `outputs/revision/fragments.js`.

**Tech Stack:** Plain HTML + vanilla ES modules (no build, no framework), Node 22+ for the
`work/` checks, `pdftotext` for source intake, the Browser pane for the visual checks.

**Spec:** `docs/superpowers/specs/2026-10-19-physiology-revise.md` (read it first; its
section 8 lists the owner's open questions. Where this plan follows a default from that
list it says so. If the owner has answered differently, follow the owner).

---

## Waves (what can run at the same time)

| Wave | Tasks | Sessions | Files it may touch |
| --- | --- | --- | --- |
| 0 | 1–9 | one session, in order | shared files: `course-data.js`, `source-text.json`, `source-catalogue.json`, `leaves.js`, `hub.js`, `registry.js`, `revise.js`, `revise-brain.js`, the HTML, `app.css`, `sw.js`, `pages.yml`, both checks; creates `rules.js`, `fragments.js`, `abct2326-topics.js`, the empty leaf stubs, `abct2326-fragments.js`, `pages-workflow-check.mjs`, `revise-browser-check.js` |
| 1 | 10–15 | up to six parallel sessions, one task each | each task ONLY its own `outputs/revision/abct2326-leaves-wN.js` and its own `docs/superpowers/notes/2026-10-19-physiology-revise-wN.md`; Task 10 also `abct2326-leaves-tissues.js`, `hss2011-leaves-w1.js`, `hss2011-leaves-w2.js`, `own-words.js` |
| 2 | 16–18 | one session | the leaf files (link fields only), `abct2326-topics.js` (EDGES), `abct2326-fragments.js`, `registry.js` (one flag) |
| 3 | 19–20 | one session | `term-gloss.js`, `sw.js`, docs, baselines |

A Wave-1 session that sees another task's file changed in `git status` leaves it alone.
Wave 2 starts only when all six Wave-1 tasks are committed.

## Before you start (every task)

- **Another session may be editing this tree.** `git status --short` first. Never
  `git add -A` or `git add .`; add paths one by one and run `git diff <file>` on each before
  committing. If a file you must edit has hunks you did not write, **stop and ask the owner**.
- **Line endings.** The working copy mixes LF and CRLF (`core.autocrlf` is true; for
  example `outputs/study/revise.js`, `outputs/app.css` and the HTML are CRLF on disk,
  `outputs/revision/leaves.js` and `work/revision-check.mjs` are LF). Edit existing files
  with the Edit tool, which keeps them. A node patch script must first assert
  `src.includes(old)` and throw if not (a `\n` pattern finds nothing in a CRLF file and
  "succeeds"), and must use a function replacer (`s.replace(a, () => b)`), because a `$`
  in a string replacement corrupts code.
- **Commits are local. Do not push** (pushing `master` publishes the site); ask the owner
  first. End every commit message with
  `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Public repo: no personal data
  in files or messages.
- **Never loosen a check to make it pass.** A failing source gate means the row's page or
  `match` is wrong or the words are only in a picture. Fix the row or drop it.
- **Settled, do not reopen:** no tests, quizzes, schedulers or study items (CLAUDE.md
  principles 0 and 1); later weeks are removed, not dimmed; Auto shows the last fully taught
  week; no sentence under a Map box; every row's notes say something useful; no box has a
  child of the same name; slides only, no textbook additions.
- **The Browser pane caches modules in a service worker.** Before testing an edit there, run
  in `javascript_tool`:
  `(async () => { for (const r of await navigator.serviceWorker.getRegistrations()) await r.unregister(); for (const k of await caches.keys()) await caches.delete(k); return 'cleared'; })()`
  then navigate to the page twice.

## File structure

| File | Status | Responsibility |
| --- | --- | --- |
| `outputs/study/course-data.js` | modify | Registers five 2026 physiology decks (Task 1) |
| `work/source-catalogue.json`, `work/source-text.json` | regenerate | Their catalogue entries and page text (Task 1) |
| `outputs/revision/rules.js` | create | The owner's rules as pure functions (Task 2) |
| `outputs/revision/leaves.js` | modify | Kinds cell, substance, process; fields acts, makes, next, own; `topicNodes()` (Task 3) |
| `outputs/revision/hub.js` | modify | Hub grouping order as a parameter (Task 3) |
| `outputs/revision/fragments.js` | create | `renderThreads`, `renderTables`, `renderDecoder` (Task 4) |
| `work/revise-pure-check.mjs` | modify | Tests for Tasks 2–4 |
| `work/revision-check.mjs` | modify | Rules for every subject, new guards (Task 5) |
| `work/pages-workflow-check.mjs` | create | Every script `pages.yml` runs exists (Task 5) |
| `.github/workflows/pages.yml` | modify | Runs the new check (Task 5) |
| `outputs/revision/abct2326-topics.js` | create | Physiology topics, tree, topic links (Task 6, Task 16) |
| `outputs/revision/abct2326-leaves-w1.js` … `-w5.js`, `-w7.js`, `-tissues.js` | create (empty, Task 6), fill (Tasks 10–15) | Leaf rows per week |
| `outputs/revision/abct2326-fragments.js` | create (empty, Task 6), fill (Task 17) | Threads, tables, decoder terms, tours |
| `outputs/revision/registry.js` | modify | `systems`, `hubOrder`, `copy` for HSS2011 (Task 5); the ABCT2326 entry (Task 6) |
| `outputs/study/revise.js` | modify | Subject switch, systems from the registry, legend, viewer gating, own label (Task 7) |
| `outputs/study/revise-brain.js` | modify | Colours and hub order from the subject (Task 7) |
| `outputs/radiography-study-studio.html`, `outputs/app.css` | modify | Subject control, legend emptied (Task 7) |
| `outputs/sw.js` | modify | SHELL entries, `CACHE_VERSION` (Task 8, Task 19) |
| `work/revise-browser-check.js` | create | Rules 3, 6, 7 and the subject switch in a real page (Task 9) |
| `docs/superpowers/notes/2026-10-19-physiology-revise-w*.md` | create (Tasks 10–15) | Each week's image-only list and links not added |
| `outputs/README.md`, `CLAUDE.md`, `docs/TRAPS.md`, `docs/CODEMAP.md`, `work/baselines/*` | modify (Task 20) | Records |

---

# Wave 0 — one session, in order

### Task 1: Source intake of the five delivered decks

The standing workflow is `docs/superpowers/specs/2026-09-10-new-source-intake-workflow.md`;
its study-item steps are obsolete (the app no longer tests), so only registration,
catalogue, text and the checks apply. Lecture 1 is already `phys.1.2026`.

**Files:**
- Modify: `outputs/study/course-data.js` (inside `SOURCE_FILES`, after the `phys.1.2026` entry, line 142)
- Regenerate: `work/source-catalogue.json`, `work/source-text.json`

- [ ] **Step 1: Verdict (new slot, not a duplicate)**

```bash
node work/query.mjs file "ABCT2326 Cardiovascular System"
node work/query.mjs file "ABCT2326 Respiratory System"
node work/query.mjs file "ABCT2326_L4"
node work/query.mjs file "ABCT2326 Renal System 2019"
node work/query.mjs file "ABCT2326 Reproduction"
grep -n "phys.l[2-6].2026" outputs/study/course-data.js
```

Expected: each file is in iCloud `Human Physology`; the grep prints nothing. If any is
already registered, use its id below instead of registering it again.

- [ ] **Step 2: Register them**

Insert directly after the `'phys.1.2026': {…},` line:

```js
  'phys.l2.2026': { file: 'ABCT2326 Cardiovascular System.pdf', subject: 'ABCT2326', root: 'newsrc', folder: 'Human Physology', kind: 'primary', note: 'Lecture 2 (Week 2 Cardiovascular System), Martini Ch 19-21, 68 pages: composition of blood, blood vessels, pulmonary and systemic circulations, structure of the heart and its valves, the conducting system (SA node, AV node, AV bundle, Purkinje fibres), pacemaker and myocardial action potentials, refractory periods, the ECG and the cardiac cycle.' },
  'phys.l3.2026': { file: 'ABCT2326 Respiratory System.pdf', subject: 'ABCT2326', root: 'newsrc', folder: 'Human Physology', kind: 'primary', note: 'Lecture 3 (Week 3 Respiratory System), Martini Ch 23, 75 pages: organisation of the respiratory system, the respiratory portion, external and internal respiration, pulmonary ventilation and Boyle\'s law, mechanics of breathing, lung measurements, gas exchange, oxygen and carbon dioxide transport, and the control of respiration.' },
  'phys.l4.2026': { file: 'ABCT2326_L4 -Digestive.pdf', subject: 'ABCT2326', root: 'newsrc', folder: 'Human Physology', kind: 'primary', note: 'Lecture 4 (Week 4 Digestive System), Martini Ch 24, 68 pages: the digestive tract and its layers, movement and regulation, oral cavity, stomach and the regulation of gastric activity, small intestine, pancreas, liver, gallbladder, coordination of secretion and absorption, large intestine, digestion.' },
  'phys.l5.2026': { file: 'ABCT2326 Renal System 2019.pdf', subject: 'ABCT2326', root: 'newsrc', folder: 'Human Physology', kind: 'primary', note: 'Lecture 5 (Week 5 Renal System), Martini Ch 26, 46 pages. Named 2019 but filed with the 2026 decks, so treated as delivered (spec Q3). Kidney function, urinary system and micturition reflex, nephron, glomerular filtration and GFR, reabsorption of salt and water, countercurrent multiplier and exchange, renal clearance, electrolyte balance, aldosterone, renin-angiotensin-aldosterone system, urinary buffers.' },
  'phys.l6.2026': { file: 'ABCT2326 Reproduction(1).pdf', subject: 'ABCT2326', root: 'newsrc', folder: 'Human Physology', kind: 'primary', note: 'Lecture 6 (Week 7 Reproductive System), Martini Ch 28-29, 60 pages: spermatogenesis and Sertoli cells, gonadotropin secretion and testosterone, male accessory organs, the female reproductive system, ovarian and menstrual cycles, fertilization, implantation, placenta and parturition.' },
```

- [ ] **Step 3: Catalogue, text and the source check**

```bash
for f in "ABCT2326 Cardiovascular System.pdf" "ABCT2326 Respiratory System.pdf" "ABCT2326_L4 -Digestive.pdf" "ABCT2326 Renal System 2019.pdf" "ABCT2326 Reproduction(1).pdf"; do node work/build-source-catalogue.mjs --add-file "$USERPROFILE/iCloudDrive/Human Physology/$f"; done
for r in phys.l2.2026 phys.l3.2026 phys.l4.2026 phys.l5.2026 phys.l6.2026; do node work/build-source-text.mjs --ref $r; done
node work/source-check.mjs | tail -3
```

Expected: `source-check` passes.

- [ ] **Step 4: Prove the text is there and the page counts match**

```bash
node -e "const s=JSON.parse(require('fs').readFileSync('work/source-text.json','utf8')).sources;for(const k of ['phys.1.2026','phys.l2.2026','phys.l3.2026','phys.l4.2026','phys.l5.2026','phys.l6.2026'])console.log(k,s[k].pages.length)"
node work/query.mjs pages phys.l5.2026 40
```

Expected: `62 68 75 68 46 60`, and page 40 of `phys.l5.2026` shows
"Renin-Angiotensin-Aldosterone System". If a count differs, **stop and report**.

- [ ] **Step 5: Commit**

```bash
git status --short
node work/syntax-check.mjs | tail -1
git add outputs/study/course-data.js work/source-catalogue.json work/source-text.json
git commit -m "chore(sources): register and cache the 2026 physiology lecture decks for weeks 2 to 7

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: The rules as pure functions (`rules.js`)

**Files:**
- Create: `outputs/revision/rules.js`
- Test: `work/revise-pure-check.mjs`

- [ ] **Step 1: Write the failing tests**

In `work/revise-pure-check.mjs`, add to the imports:

```js
import { checkSystems, colourDistance, contrast, legendKeys, lineIsUseful, needsOwn, ownProblems, rowWeekOk, viewerEligible } from '../outputs/revision/rules.js';
```

and before the final summary line (`console.log(fail ? …`), add:

```js
console.log('\nrules (spec 2026-10-19-physiology-revise.md section 2)');
ok(!lineIsUseful('x2') && !lineIsUseful('(1-7)') && !lineIsUseful('8 pairs') && !lineIsUseful('lateral rotation'), 'counts, ranges and two-word fragments are not useful lines');
ok(!lineIsUseful('acetabulofemoral; ball-and-socket'), 'a 25+ character line of under three words is not useful');
ok(!lineIsUseful('12 345 678 (90) x 1234567 - 89'), 'digits and brackets alone are not useful however long');
ok(lineIsUseful('mature bone cells in lacunae'), 'a short real sentence is useful');
ok(needsOwn({ line: '' }) && needsOwn({}) && !needsOwn({ line: 'the spaces that hold osteocytes' }), 'needsOwn follows lineIsUseful');
ok(ownProblems('', 'X').join() === 'missing', 'an empty own sentence is missing');
ok(ownProblems('Renin.', 'Renin').includes('under 40 characters'), 'too short');
ok(ownProblems('An enzyme released by the kidney that starts a hormone chain', 'Renin').includes('no full stop at the end'), 'needs a full stop');
ok(ownProblems('An enzyme released by the kidney at 125 ml per minute.', 'Renin').some((p) => p.startsWith('a digit')), 'no digits: numbers come from slides');
ok(ownProblems('An enzyme released by the kidney ★ that starts a chain.', 'Renin').some((p) => p.startsWith('a star')), 'no stars: no textbook additions');
ok(ownProblems('An enzyme released by the kidney that starts a hormone chain.', 'Renin').length === 0, 'a plain sentence passes');
ok(viewerEligible({ id: 'a' }) && !viewerEligible({ id: 'a', viewer: false }), 'a topic is eligible unless it says viewer: false');
ok(['part', 'muscle', 'bone', 'joint', 'nerve'].every((k) => viewerEligible({ leaf: k })), 'structure rows are eligible');
ok(['group', 'cell', 'substance', 'process'].every((k) => !viewerEligible({ leaf: k })), 'groups, cells, substances and processes never get a viewer button');
ok(!viewerEligible({ leaf: 'part', viewer: false }), 'a structure row can opt out');
const ldata = { NODES: [{ id: 'a', s: 'x' }, { id: 'b', s: 'y' }, { id: 'c', s: 'x' }] };
ok([...legendKeys(ldata, new Set(['a', 'c']))].join() === 'x', 'the legend holds only the systems of what is shown');
ok(legendKeys(ldata, new Set()).size === 0, 'nothing shown, no legend entry');
ok(Math.round(colourDistance('#000000', '#ffffff')) === 442 && contrast('#000000', '#ffffff') > 20.9, 'colour maths');
const goodSys = [{ id: 'A', systems: [{ key: 'a1', label: 'A1', col: '#9fb2bb', body: 'cells' }, { key: 'a2', label: 'A2', col: '#e879c6' }], hubOrder: ['a1', 'a2'], data: { NODES: [{ id: 'n', s: 'a1' }] } },
  { id: 'B', systems: [{ key: 'b1', label: 'B1', col: '#9FB2BB', body: 'cells' }], hubOrder: ['b1'], data: { NODES: [{ id: 'm', s: 'b1' }] } }];
ok(checkSystems(goodSys).length === 0, 'a valid pair of subjects passes (a shared colour for the same body system is fine)');
ok(checkSystems([{ ...goodSys[0], systems: [...goodSys[0].systems, { key: 'a3', label: 'A3', col: '#e97ac5' }] }]).some((p) => p.includes('too alike')), 'two near-identical colours in one subject fail');
ok(checkSystems([{ ...goodSys[0], systems: [{ key: 'a1', label: 'A1', col: '#203038' }, goodSys[0].systems[1]] }]).some((p) => p.includes('4.5:1')), 'a colour that disappears on the legend fails');
ok(checkSystems([goodSys[0], { ...goodSys[1], systems: [{ key: 'a1', label: 'B1', col: '#5b8def' }], hubOrder: ['a1'], data: { NODES: [{ id: 'm', s: 'a1' }] } }]).some((p) => p.includes('used by')), 'a key used by two subjects fails');
ok(checkSystems([goodSys[0], { ...goodSys[1], systems: [{ key: 'b1', label: 'B1', col: '#e879c6', body: 'heart' }] }]).some((p) => p.includes('different body system')), 'the same colour for a different body system fails');
ok(checkSystems([{ ...goodSys[0], data: { NODES: [{ id: 'n', s: 'zz' }] } }]).some((p) => p.includes('not in the list')), 'a node whose system is not listed fails');
const sessions = [{ subject: 'S', week: 2, kind: 'lecture' }, { subject: 'S', week: 6, kind: 'tutorial', title: 'Tutorial — No Class (Teaching Schedule)' }];
const files = { d2: { subject: 'S' }, d6: { subject: 'S' } };
ok(rowWeekOk({ w: 2, src: ['d2', 1] }, { d2: 2 }, sessions, files) === '', 'a row in its deck\'s week passes');
ok(rowWeekOk({ w: 3, src: ['d2', 1] }, { d2: 2 }, sessions, files).includes('deck week'), 'a row in another week fails');
ok(rowWeekOk({ w: 2, src: ['zz', 1] }, { d2: 2 }, sessions, files).includes('not in deckWeek'), 'a source with no deck week fails');
ok(rowWeekOk({ w: 6, src: ['d6', 1] }, { d6: 6 }, sessions, files).includes('no session'), 'a "No Class" week is not a teaching week');
```

- [ ] **Step 2: Run it to see it fail**

Run: `node work/revise-pure-check.mjs`
Expected: it throws `Cannot find module …/outputs/revision/rules.js`.

- [ ] **Step 3: Write `outputs/revision/rules.js`**

```js
/*
 * Revision rules — the owner's standing rules for Revise as pure functions, so
 * the app (study/revise.js) and work/revision-check.mjs apply the same ones.
 * No DOM. docs/superpowers/specs/2026-10-19-physiology-revise.md, section 2.
 */

/* ---- rule 4: every row's notes say something useful ---- */

/** Shorter than this, a slide line is a label ("x2", "8 pairs"), not a sentence. */
export const USEFUL_MIN = 25;
const FRAGMENT = /^[\s\d().,;:x×~–\-+/%<>=≈]*$/i;

/** True when a slide line says something on its own: 25+ characters, not a count, three or more words. */
export function lineIsUseful(line) {
  const s = String(line || '').trim();
  if (s.length < USEFUL_MIN || FRAGMENT.test(s)) return false;
  return s.split(/\s+/).filter((w) => /[a-z]{2,}/i.test(w)).length >= 3;
}

/** A row (or a sourced topic) needs an own-words sentence when its slide line is not useful. */
export function needsOwn(node) {
  return !lineIsUseful(node && node.line);
}

const letters = (s) => String(s || '').toLowerCase().replace(/[^a-z]+/g, ' ').trim();

/**
 * What is wrong with an own-words sentence, as a list (empty = fine). Own words
 * may not carry a number (numbers come from a slide line) or a star (no
 * textbook additions), and must be a real sentence about the row.
 */
export function ownProblems(own, label) {
  const s = String(own || '').trim();
  if (!s) return ['missing'];
  const out = [];
  if (s.length < 40) out.push('under 40 characters');
  if (s.length > 220) out.push('over 220 characters');
  if (!s.endsWith('.')) out.push('no full stop at the end');
  if (/\d/.test(s)) out.push('a digit (numbers come only from a slide line)');
  if (/[★*]/.test(s)) out.push('a star (no textbook additions)');
  if (letters(s) === letters(label)) out.push('only the name');
  return out;
}

/* ---- rule 7: a viewer button only where a structure can exist ---- */

export const VIEWER_KINDS = new Set(['part', 'muscle', 'bone', 'joint', 'nerve']);

/** Whether "Show in the viewer" may be offered. The viewer's own search still decides whether it is. */
export function viewerEligible(node) {
  if (!node || node.viewer === false) return false;
  if (!node.leaf) return true;
  return VIEWER_KINDS.has(node.leaf);
}

/* ---- rule 6: the legend holds what is taught, colours stay apart ---- */

/** The body-system keys of the nodes on screen. */
export function legendKeys(data, ids) {
  const byId = new Map(data.NODES.map((n) => [n.id, n]));
  return new Set([...ids].map((id) => byId.get(id)).filter(Boolean).map((n) => n.s));
}

const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const lum = (h) => {
  const c = rgb(h).map((v) => { const x = v / 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
export const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
export const colourDistance = (a, b) => { const p = rgb(a), q = rgb(b); return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]); };

/** The legend chip's background in #reviseView (app.css --rv-surface). */
export const LEGEND_SURFACE = '#162428';
export const MIN_DISTANCE = 50;
const HEX = /^#[0-9a-f]{6}$/i;

/** Every problem with the subjects' colour groups, as sentences (empty = fine). */
export function checkSystems(subjects) {
  const out = [];
  const owner = new Map();
  const byCol = new Map();
  for (const sub of subjects) {
    const sys = sub.systems || [];
    const keys = new Set(sys.map((s) => s.key));
    if (!sys.length) out.push(`${sub.id}: no systems listed`);
    if (keys.size !== sys.length) out.push(`${sub.id}: a system key is listed twice`);
    for (const s of sys) {
      if (!HEX.test(s.col) || (s.map && !HEX.test(s.map))) { out.push(`${sub.id} ${s.key}: colour is not #rrggbb`); continue; }
      if (owner.has(s.key)) out.push(`${s.key}: used by ${owner.get(s.key)} and ${sub.id}`); else owner.set(s.key, sub.id);
      if (contrast(s.col, LEGEND_SURFACE) < 4.5) out.push(`${sub.id} ${s.key}: under 4.5:1 on the legend`);
      const c = s.col.toLowerCase();
      const prev = byCol.get(c);
      if (prev && prev.sub !== sub.id && (!s.body || prev.body !== s.body)) out.push(`${sub.id} ${s.key}: same colour as ${prev.sub} ${prev.key} for a different body system`);
      if (!prev) byCol.set(c, { sub: sub.id, key: s.key, body: s.body });
    }
    for (let i = 0; i < sys.length; i++) {
      for (let j = i + 1; j < sys.length; j++) {
        if (HEX.test(sys[i].col) && HEX.test(sys[j].col) && colourDistance(sys[i].col, sys[j].col) < MIN_DISTANCE) out.push(`${sub.id}: ${sys[i].key} and ${sys[j].key} are too alike`);
      }
    }
    const stray = ((sub.data && sub.data.NODES) || []).find((n) => !keys.has(n.s));
    if (stray) out.push(`${sub.id}: ${stray.id} has system ${stray.s}, not in the list`);
    for (const k of sub.hubOrder || []) if (!keys.has(k)) out.push(`${sub.id}: hub order names ${k}, not a system`);
  }
  return out;
}

/* ---- rule 2: a row is taught in its deck's week, and that week was taught ---- */

const TEACHING = new Set(['lecture', 'tutorial', 'activity']);

/**
 * '' when the row's week is right, else why not. `deckWeek` maps a source id to
 * the teaching week its deck was given; the week must hold a session of the
 * deck's subject that is not a cancelled ("No Class") one.
 */
export function rowWeekOk(row, deckWeek, sessions, sourceFiles) {
  const sid = (row.src || [])[0];
  if (!(sid in deckWeek)) return `source ${sid} is not in deckWeek`;
  if (row.w !== deckWeek[sid]) return `week ${row.w}, deck week ${deckWeek[sid]}`;
  const subject = sourceFiles[sid] && sourceFiles[sid].subject;
  const held = sessions.some((s) => s.subject === subject && s.week === row.w && TEACHING.has(s.kind) && !/no class/i.test(s.title || ''));
  return held ? '' : `no session of ${subject} in week ${row.w}`;
}
```

- [ ] **Step 4: Run the tests**

Run: `node work/revise-pure-check.mjs | tail -40`
Expected: every `rules` line `ok`, last line `ALL PASS`.

- [ ] **Step 5: Commit**

```bash
git add outputs/revision/rules.js work/revise-pure-check.mjs
git commit -m "feat(revise): the owner's standing rules as pure functions, with tests

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Physiology leaf kinds, sourced topics, hub order

> **Already done (19 Oct 2026, its own commit — skip it here):** the ALIAS colour-group fix, i.e. the
> `sysOf.set(row.id, sysOf.get(row.parent))` change in `mergeLeaves` and the `am` test that guards it (the
> `/* Found while planning` block at the end of Step 1), plus `revision-check.mjs`'s per-subject
> "every topic and row has a colour group" and the `CACHE_VERSION` bump to v242. Do not re-apply them; the
> `am` test is already in `work/revise-pure-check.mjs`, so Step 1 adds only the physiology block (leave out the `am` lines).
> The Step 3 paragraph that repeats the ALIAS line is likewise already in `leaves.js`.

**Files:**
- Modify: `outputs/revision/leaves.js`, `outputs/revision/hub.js`
- Test: `work/revise-pure-check.mjs`

- [ ] **Step 1: Write the failing tests**

In `work/revise-pure-check.mjs`, change the leaves import to
`import { dropSystem, leafLine, mergeLeaves, topicNodes } from '../outputs/revision/leaves.js';`
and add before the summary line:

```js
console.log('\nphysiology kinds and sourced topics');
const pbase = { NODES: topicNodes([{ id: 'p_k', l: 'Kidney', s: 'p_renal', w: 5, src: ['k.2026', 2], line: 'regulates plasma by forming urine' }], { 'k.2026': 'K slides' }), EDGES: [], TREE: { label: 'root', kids: [{ sys: 'p_renal', label: 'Kidney', kids: [{ id: 'p_k' }] }] } };
ok(pbase.NODES[0].w.join() === '5' && pbase.NODES[0].src.join() === 'k.2026,2' && pbase.NODES[0].viewer === false, 'a topic keeps its week as a list, its source, and is not a viewer target unless it says so');
ok(pbase.NODES[0].t.includes('regulates plasma') && pbase.NODES[0].t.includes('From K slides, p2'), "a topic's note is its slide line and its source");
ok(topicNodes([{ id: 't', l: 'T', s: 's', w: 1, src: ['k.2026', 1], viewer: true }])[0].viewer === true, 'a topic can ask for the viewer button');
const prows = [
  { k: 'cell', id: 'p5_jg', l: 'Juxtaglomerular cells', parent: 'p_k', w: 5, makes: { p5_renin: 'secrete renin' }, src: ['k.2026', 39] },
  { k: 'substance', id: 'p5_renin', l: 'Renin', parent: 'p_k', w: 5, acts: { p5_raas: 'starts the cascade' }, own: 'An enzyme from the kidney that starts a chain of hormones.', src: ['k.2026', 40] },
  { k: 'process', id: 'p5_raas', l: 'RAAS', parent: 'p_k', w: 5, next: { p_k: 'raises blood pressure' }, line: 'renin to angiotensin to aldosterone', src: ['k.2026', 40] },
];
const pm = mergeLeaves(pbase, prows, { 'k.2026': 'K slides' });
const phas = (a, b, why) => pm.EDGES.some((e) => pairKey(e[0], e[1]) === pairKey(a, b) && e[2] === why);
ok(phas('p5_jg', 'p5_renin', 'secrete renin'), 'a cell links to what it makes');
ok(phas('p5_renin', 'p5_raas', 'starts the cascade'), 'a substance links to what it acts on');
ok(phas('p5_raas', 'p_k', 'raises blood pressure'), 'a process links to what it leads to');
ok(pm.NODES.find((n) => n.id === 'p5_renin').own === 'An enzyme from the kidney that starts a chain of hormones.', 'own words travel with the row');
ok(leafLine({ k: 'substance', acts: { a: 'x', b: 'y' } }) === 'x, y' && leafLine({ k: 'process' }) === '', 'a substance with no line shows what it does; a process with no line shows nothing');
const ds = dropSystem({ NODES: [{ id: 'g', s: 'gone' }, { id: 'k', s: 'keep' }], EDGES: [], TREE: { label: 'r', kids: [{ id: 'g' }, { id: 'k' }] } }, [{ k: 'substance', id: 's', l: 'S', parent: 'k', w: 1, acts: { g: 'x', k: 'y' } }], 'gone');
ok(Object.keys(ds.rows[0].acts).join() === 'k', 'dropSystem also cleans acts, makes and next');
const ordered = pickFirst([{ id: 'a', sys: 'p_gi', deg: 1 }, { id: 'b', sys: 'p_cvs', deg: 1 }], 14, ['p_cvs', 'p_gi']).shown.map((n) => n.id).join();
ok(ordered === 'b,a', 'the hub groups balls in the order the subject gives');
/* Found while planning: rows under a row folded into its same-named topic (ALIAS) lost their colour group, s undefined
   (59 HSS2011 rows under Vertebral column, Brainstem and Cerebellum), and renderPanel then reads SYSVAR[undefined]. */
const am = mergeLeaves({ NODES: [{ id: 'b', l: 'Brainstem', s: 'cns', w: [6], t: '' }], EDGES: [], TREE: { label: 'r', kids: [{ id: 'b' }] } },
  [{ k: 'part', id: 'rb', l: 'Brainstem', parent: 'b', w: 6, src: ['x.2026', 1] }, { k: 'part', id: 'rm', l: 'Medulla', parent: 'rb', w: 6, src: ['x.2026', 1] }]);
ok(am.NODES.find((n) => n.id === 'rm').s === 'cns', 'a row under a folded row keeps its colour group');
```

- [ ] **Step 2: Run it to see it fail**

Run: `node work/revise-pure-check.mjs`
Expected: `SyntaxError: The requested module '../outputs/revision/leaves.js' does not provide an export named 'topicNodes'`.

- [ ] **Step 3: Implement in `outputs/revision/leaves.js`**

Replace the header's kind line and `KINDS`:

```js
 *   k        group | muscle | bone | joint | nerve | part | cell | substance | process
```

```js
export const KINDS = ['group', 'muscle', 'bone', 'joint', 'nerve', 'part', 'cell', 'substance', 'process'];
```

Add under the `links` line of the header comment:

```js
 *   makes    part or cell: { substanceId: 'secretes …' }        acts  substance: { targetId: 'effect' }
 *   next     process: { processOrTopicId: 'leads to …' }         own   one sentence in the app's own words
 *            (spec 2026-10-19-physiology-revise.md: physiology leaves)
```

Replace `leafLine`:

```js
export function leafLine(row) {
  if (row.k === 'muscle') return [Object.values({ ...(row.joints || {}), ...(row.moves || {}) }).join('; '), row.note].filter(Boolean).join(' · ');
  if (row.k === 'nerve' && !row.line) return [...new Set(Object.values(row.supplies || {}))].join(', ');
  if (row.k === 'substance' && !row.line) return [...new Set(Object.values(row.acts || {}))].join(', ');
  return row.line || '';
}
```

In `mergeLeaves`, in the ALIAS branch, replace
`alias[row.id] = row.parent; specOf.set(row.id, parent); continue;` with
`alias[row.id] = row.parent; specOf.set(row.id, parent); sysOf.set(row.id, sysOf.get(row.parent)); continue;`
(the folded row's children take the parent's colour group). Then replace the `nodes.push(…)` line with:

```js
    nodes.push({ id: row.id, l: row.l, s, w: [row.w], t: leafNote(row, line, sources), leaf: row.k, line, src: row.src, old: !!row.old, ...(row.own ? { own: row.own } : {}), ...(row.viewer === false ? { viewer: false } : {}) });
```

and in the second loop, after the `nerve` block, add:

```js
    if (row.k === 'substance') for (const [t, why] of Object.entries(row.acts || {})) link(row.id, t, why);
    if (row.k === 'part' || row.k === 'cell') for (const [t, why] of Object.entries(row.makes || {})) link(row.id, t, why);
    if (row.k === 'process') for (const [t, why] of Object.entries(row.next || {})) link(row.id, t, why);
```

In `dropSystem`, change `for (const key of ['links', 'supplies', 'joints', 'moves'])` to
`for (const key of ['links', 'supplies', 'joints', 'moves', 'acts', 'makes', 'next'])`.

Add after `mergeLeaves`:

```js
/**
 * Topics written like rows (physiology): { id, l, s, w, src, line?, own?, match?, th?, viewer? }.
 * The note is made the way a leaf's is, so a topic says only what its slide says,
 * and work/revision-check.mjs holds its name to the page it cites. A topic is not
 * a viewer target unless it says `viewer: true` (physiology topics are processes).
 */
export function topicNodes(topics, sources = {}) {
  return topics.map((t) => {
    const line = t.line || '';
    return {
      id: t.id, l: t.l, s: t.s, w: Array.isArray(t.w) ? t.w.slice() : [t.w],
      t: leafNote(t, line, sources), line, src: t.src, viewer: t.viewer === true,
      ...(t.th ? { th: t.th } : {}), ...(t.own ? { own: t.own } : {}), ...(t.match ? { match: t.match } : {}),
    };
  });
}
```

- [ ] **Step 4: Implement the hub order in `outputs/revision/hub.js`**

Delete the line `const sysRank = (s) => { … };` and replace `pickFirst` with:

```js
/** Which direct links get a ball (the `max` with most links) and which wait behind "+N more"; balls of one system sit together, in `order`. */
export function pickFirst(first, max = HUB.MAX1, order = SYSORDER) {
  const rank = (s) => { const i = order.indexOf(s); return i < 0 ? order.length : i; };
  const ranked = first.slice().sort((a, b) => (b.deg - a.deg) || byId(a, b));
  const shown = ranked.slice(0, max).sort((a, b) => (rank(a.sys) - rank(b.sys)) || byId(a, b));
  const more = ranked.slice(max).map((n) => n.id).sort();
  return { shown, more };
}
```

and change the `hubLayout` signature and first line to:

```js
export function hubLayout({ first = [], parent = null, second = [], order = SYSORDER } = {}) {
  const { shown, more } = pickFirst(first.filter((n) => n.id !== parent), HUB.MAX1, order);
```

Add ` * order   the subject's system order (registry hubOrder); anatomy's SYSORDER by default` to
the comment above `hubLayout`.

- [ ] **Step 5: Run the tests and the data check**

```bash
node work/revise-pure-check.mjs | tail -20
node work/revision-check.mjs | tail -5
```

Expected: `ALL PASS` from both (anatomy is unchanged by this task).

- [ ] **Step 6: Commit**

```bash
git add outputs/revision/leaves.js outputs/revision/hub.js work/revise-pure-check.mjs
git commit -m "feat(revise): cell, substance and process leaves, sourced topics, a subject's hub order

Also fixes rows under a folded row losing their colour group (59 anatomy rows).

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Structured, sourced fragments (`fragments.js`)

**Files:**
- Create: `outputs/revision/fragments.js`
- Test: `work/revise-pure-check.mjs`

- [ ] **Step 1: Write the failing tests**

Add the import `import { renderDecoder, renderTables, renderThreads } from '../outputs/revision/fragments.js';`
and before the summary line:

```js
console.log('\nfragments');
const fsrc = { 'k.2026': 'K slides' };
ok(renderThreads([], fsrc) === '' && renderTables([], fsrc) === '' && renderDecoder([], () => null) === '', 'nothing to show renders nothing (the tab is then hidden)');
const th = renderThreads([{ id: 't1', title: 'Pressure & volume', steps: [{ wk: 5, hd: 'Filter.', text: 'GFR <125>', src: ['k.2026', 17], match: 'gfr' }, { wk: 2, hd: 'Pump.', text: 'The heart', src: ['k.2026', 3], match: 'heart' }] }], fsrc, 'Intro');
ok(/<details class="thread" id="t1" open>/.test(th) && /<summary>Pressure &amp; volume<small>W2 · W5<\/small><\/summary>/.test(th), 'a thread renders with its weeks in order');
ok((th.match(/<li data-wk="\d+">/g) || []).length === 2 && !/<li>/.test(th), 'every step carries its week');
ok(th.includes('GFR &lt;125&gt;') && th.includes('K slides, p17'), 'step text is escaped and cites its page');
const tb = renderTables([{ id: 'tb-h', title: 'Hormones', head: ['Hormone', 'Acts on'], rows: [{ wk: 5, cells: ['Renin', 'angiotensinogen'], src: ['k.2026', 40], match: 'renin' }] }], fsrc, 'Intro');
ok(/<div class="rv-sec"><h3 id="tb-h">Hormones<\/h3>/.test(tb) && /<tr data-wk="5"><td>Renin<\/td>/.test(tb) && !/<tr>\s*<td/.test(tb) && /data-jump="tb-h"/.test(tb), 'a table renders as revise.js expects, every row with a week');
const dec = renderDecoder([{ term: 'Spermatogenesis', wk: 7 }], (w) => (w.toLowerCase() === 'spermatogenesis' ? { word: w, parts: [{ text: 'spermat', kind: 'root', forms: 'spermat/o', means: 'male sex cell' }, { text: 'o', kind: 'link', means: 'joining vowel' }, { text: 'genesis', kind: 'suffix', forms: '-genesis', means: 'production' }] } : null), 'Intro');
ok(/<table id="dtable">/.test(dec) && /<tr class="grp" data-wk="7">/.test(dec) && dec.includes('spermat/o = male sex cell + -genesis = production') && !/<tr>\s*<td/.test(dec), 'a decoder row shows the parts, grouped by week');
let threw = false; try { renderDecoder([{ term: 'Plasma', wk: 2 }], () => null); } catch { threw = true; }
ok(threw, 'a decoder term with no reading is refused, not shown empty');
```

- [ ] **Step 2: Run it to see it fail**

Run: `node work/revise-pure-check.mjs`
Expected: `Cannot find module …/outputs/revision/fragments.js`.

- [ ] **Step 3: Write `outputs/revision/fragments.js`**

```js
/*
 * Revision fragments — Threads, Tables and Decoder rendered from structured data.
 *
 * Pure: no DOM. HSS2011's fragments are ported HTML; a subject written from
 * scratch (ABCT2326) keeps them as data instead, so every step and row carries
 * its week and its slide page and work/revision-check.mjs can hold each one to
 * the page it cites. The HTML is the classes study/revise.js already handles.
 * docs/superpowers/specs/2026-10-19-physiology-revise.md section 4.5.
 */

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const weeksOf = (list) => [...new Set(list)].sort((a, b) => a - b).map((w) => `W${w}`).join(' · ');
const cite = ([sid, page], sources) => `${sources[sid] || sid}, p${page}`;

/** threads: [{ id: 't1', title, steps: [{ wk, hd, text, src: [id, page], match }] }] */
export function renderThreads(threads, sources = {}, intro = '') {
  if (!threads.length) return '';
  const one = (t, i) => {
    const steps = t.steps.map((s) => `  <li data-wk="${s.wk}"><span class="wk">W${s.wk}</span><span class="hd">${esc(s.hd)}</span> ${esc(s.text)} <span class="rv-src">${esc(cite(s.src, sources))}</span></li>`).join('\n');
    return `<details class="thread" id="${esc(t.id)}"${i === 0 ? ' open' : ''}>\n<summary>${esc(t.title)}<small>${weeksOf(t.steps.map((s) => s.wk))}</small></summary>\n<div class="tbody">\n<ol class="chain">\n${steps}\n</ol>\n</div>\n</details>`;
  };
  return `<h2>Threads</h2>\n  <p>${esc(intro)}</p>\n\n${threads.map(one).join('\n\n')}`;
}

/** tables: [{ id: 'tb-x', title, head: [...], rows: [{ wk, cells: [...], src: [id, page], match }] }] */
export function renderTables(tables, sources = {}, intro = '') {
  if (!tables.length) return '';
  const nav = tables.map((t) => `<a href="#${esc(t.id)}" data-jump="${esc(t.id)}">${esc(t.title)}</a>`).join('\n    ');
  const one = (t) => {
    const head = `<tr>${t.head.map((h) => `<th>${esc(h)}</th>`).join('')}<th>Slide</th></tr>`;
    const rows = t.rows.map((r) => `  <tr data-wk="${r.wk}">${r.cells.map((c) => `<td>${esc(c)}</td>`).join('')}<td>${esc(cite(r.src, sources))}</td></tr>`).join('\n');
    return `<div class="rv-sec"><h3 id="${esc(t.id)}">${esc(t.title)}</h3>\n  <div class="tw"><table>\n  <thead>${head}</thead>\n  <tbody>\n${rows}\n  </tbody>\n  </table></div></div>`;
  };
  return `<h2>Tables</h2>\n  <p>${esc(intro)}</p>\n  <div class="subnav">\n    ${nav}\n  </div>\n\n${tables.map(one).join('\n\n')}`;
}

/**
 * terms: [{ term, wk }] — row labels the session chose; `decompose` is
 * wordparts.js's. A term none of whose words has a reading is refused: a row
 * with an empty reading would teach nothing.
 */
export function renderDecoder(terms, decompose, intro = '') {
  if (!terms.length) return '';
  const reading = (term) => term.split(/[\s-]+/).map((w) => decompose(w)).filter(Boolean)
    .map((d) => d.parts.filter((p) => p.kind === 'root' || p.kind === 'prefix' || p.kind === 'suffix').map((p) => `${p.forms || p.text} = ${p.means}`).join(' + '))
    .join(' · ');
  const byWeek = new Map();
  for (const t of terms) {
    const r = reading(t.term);
    if (!r) throw new Error(`decoder: no word-part reading for "${t.term}"`);
    if (!byWeek.has(t.wk)) byWeek.set(t.wk, []);
    byWeek.get(t.wk).push(`  <tr data-wk="${t.wk}"><td><b>${esc(t.term)}</b></td><td>${esc(r)}</td></tr>`);
  }
  const body = [...byWeek.keys()].sort((a, b) => a - b).map((w) => `  <tr class="grp" data-wk="${w}"><td colspan="2">Week ${w}</td></tr>\n${byWeek.get(w).join('\n')}`).join('\n');
  return `<h2>Decoder</h2>\n  <p>${esc(intro)}</p>\n  <div class="dq">\n    <label for="dq" class="mono">Filter</label>\n    <input id="dq" type="search" placeholder="e.g. glomerular, pneumocyte" autocomplete="off">\n    <span id="dcount" class="mono"></span>\n  </div>\n  <div class="tw"><table id="dtable">\n  <thead><tr data-wk="1"><th>Term</th><th>Word parts</th></tr></thead>\n  <tbody>\n${body}\n  </tbody>\n  </table></div>`;
}
```

- [ ] **Step 4: Run the tests**

Run: `node work/revise-pure-check.mjs | tail -12`
Expected: every `fragments` line `ok`, `ALL PASS`.

- [ ] **Step 5: Commit**

```bash
git add outputs/revision/fragments.js work/revise-pure-check.mjs
git commit -m "feat(revise): render Threads, Tables and Decoder from sourced data

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: The data check runs every rule for every subject; the deploy guard

**Files:**
- Modify: `work/revision-check.mjs`
- Create: `work/pages-workflow-check.mjs`
- Modify: `.github/workflows/pages.yml`
- Possibly modify: `outputs/revision/own-words.js` (one anatomy row, Step 3)
- Modify: `outputs/revision/registry.js` (Step 0: anatomy's colour groups, so `checkSystems` has something to check)

- [ ] **Step 0: Give the anatomy subject its colour groups**

In `outputs/revision/registry.js` add `import { SYSORDER } from './hub.js';` to the imports
and, above `export const REVISION`:

```js
/* Colour groups. col = legend, notes tag and Brain 3D; map = the Map's own shade. The HSS2011 values are app.css's
   (--rv-c-* line 1409, --c-* line 1441), so anatomy looks as it did. Tissues & cells is not listed: those notes are
   physiology's (dropSystem below). A shared colour across subjects means the same body system (rules.js checkSystems). */
const HSS2011_SYSTEMS = [
  { key: 'skel', label: 'Skeleton & joints', col: '#d1a94f', map: '#e2b65a' },
  { key: 'musc', label: 'Muscles', col: '#e3786b', map: '#f0806f', body: 'muscle' },
  { key: 'pns', label: 'Peripheral nerves', col: '#6fa8e8', map: '#78b2f2' },
  { key: 'cns', label: 'Brain & spinal cord', col: '#ae98ec', map: '#b9a1f5' },
  { key: 'sense', label: 'Senses & autonomic', col: '#55c4a4', map: '#5ed0ae' },
  { key: 'cv', label: 'Heart & vessels', col: '#e879c6', map: '#ee86cc', body: 'heart' },
];
```

In the `HSS2011` entry, after `tours: […],`, add:

```js
    systems: HSS2011_SYSTEMS,
    hubOrder: SYSORDER.filter((k) => k !== 'tissue'),
    copy: { name: 'Anatomy', leafWords: 'single muscles, bones, joints and nerves', findHint: 'e.g. foramen, CN VII' },
```

Nothing reads these yet (Task 7 does), so the app is unchanged.

- [ ] **Step 1: Replace the HSS2011-only own-words block**

In `work/revision-check.mjs` add to the imports:

```js
import { checkSystems, needsOwn, ownProblems, rowWeekOk } from '../outputs/revision/rules.js';
import { SESSIONS } from '../outputs/schedule.js';
```

(`TERM, weekOf, weekStart, weekEnd` stay imported from schedule.js on their own line; add
`SESSIONS` to that import instead of a second line if you prefer.) Replace the whole
`if (subject.id === 'HSS2011') { … }` block (lines 39–49) with:

```js
  /* Rule 4 (rules.js): every row's notes say something useful. A row — or a sourced topic — whose slide line is not
     useful (under 25 characters, a count or fragment, or under three words) needs an own-words sentence. The Week 1
     position words of HSS2011 say where in full already. */
  const PLAIN = subject.id === 'HSS2011' ? new Set(['w1_proximal', 'w1_distal', 'w1_medial', 'w1_lateral', 'w1_anterior', 'w1_posterior', 'w1_caudal', 'w1_superior', 'w1_inferior', 'w1_cranial']) : new Set();
  const ownOf = (n) => n.own || OWN[n.id];
  const needy = data.NODES.filter((n) => (n.leaf || n.src) && !PLAIN.has(n.id) && needsOwn(n) && !ownOf(n)).map((n) => n.id);
  ok(!needy.length, `every row whose slide line is not useful has an own-words sentence${needy.length ? ` (missing: ${needy.slice(0, 30).join(' ')}${needy.length > 30 ? ` and ${needy.length - 30} more` : ''})` : ''}`);
  const badOwn = data.NODES.filter((n) => n.own).map((n) => [n.id, ownProblems(n.own, n.l)]).filter(([, p]) => p.length);
  ok(!badOwn.length, `every own-words sentence on a row is plain: a sentence, no digit, no star${badOwn.length ? ` — ${badOwn.slice(0, 6).map(([id, p]) => `${id}: ${p.join(', ')}`).join('; ')}` : ''}`);
  if (subject.id === 'HSS2011') ok(Object.keys(OWN).every((id) => ids.has(id)), 'every own-words id is a real row');
```

- [ ] **Step 2: Add the new guards**

Make the twins check unconditional: move the block from `const nodeOf = …` through the
`no box has a child of the same name` `ok(…)` out of `if (leafRows.length) {` to just
before it (keep `topicIds`, `order` and `kindOf` inside). Then, directly after the
`'a row marked old cites …'` `ok(…)` and still inside `if (leafRows.length) {`, add:

```js
    /* Rule 5: no two rows under one parent share a name. */
    const sib = new Map(); const sibDup = [];
    for (const r of leafRows) { const k = `${real(r.parent)}|${String(r.l).toLowerCase()}`; if (sib.has(k)) sibDup.push(`${sib.get(k)} = ${r.id}`); else sib.set(k, r.id); }
    ok(!sibDup.length, `no two rows under one parent share a name${sibDup.length ? ` (${sibDup.slice(0, 6).join(', ')})` : ''}`);
    /* Physiology link fields point at real rows of the right kind. */
    ok(leafRows.filter((r) => r.makes).every((r) => ['part', 'cell'].includes(r.k) && Object.entries(r.makes).every(([id, why]) => kindOf.get(id) === 'substance' && String(why).trim())), 'every makes is on a part or cell and points at a substance row, with a reason');
    ok(leafRows.filter((r) => r.acts).every((r) => r.k === 'substance' && Object.entries(r.acts).every(([id, why]) => ids.has(real(id)) && String(why).trim())), 'every acts is on a substance and points at something real, with a reason');
    ok(leafRows.filter((r) => r.next).every((r) => r.k === 'process' && Object.entries(r.next).every(([id, why]) => (kindOf.get(id) === 'process' || topicIds.has(id)) && String(why).trim())), 'every next is on a process and points at a process row or a topic, with a reason');
    /* Rule 2: a row is taught in its deck's week (subjects that declare deckWeek). */
    if (subject.deckWeek) {
      const wrong = leafRows.map((r) => [r.id, rowWeekOk(r, subject.deckWeek, SESSIONS, SOURCE_FILES)]).filter(([, why]) => why);
      ok(!wrong.length, `every row's week is its deck's teaching week${wrong.length ? ` — ${wrong.slice(0, 6).map(([id, why]) => `${id}: ${why}`).join('; ')}` : ''}`);
    }
```

After the `if (leafRows.length) { … }` block add:

```js
  /* Rule 1 for a subject written from scratch: topics, topic links and fragment steps cite a page that says them. */
  const onPage = (src, needle) => {
    const [sid, ...pages] = src || [];
    const text = SOURCE_TEXT[sid];
    const n = normaliseCitationText(needle);
    return !!text && pages.length > 0 && pages.every((p) => Number.isInteger(p) && p >= 1 && p <= text.pages.length) && pages.some((p) => normaliseCitationText(text.pages[p - 1]).includes(n));
  };
  if (subject.sourced) {
    const badTopic = data.NODES.filter((n) => !n.leaf).filter((n) => !onPage(n.src, n.match || n.l)).map((n) => n.id);
    ok(!badTopic.length, `every topic's name is on a page it cites${badTopic.length ? ` (${badTopic.slice(0, 8).join(' ')})` : ''}`);
    const topicEdges = data.EDGES.filter((e) => !data.NODES.find((n) => n.id === e[0]).leaf && !data.NODES.find((n) => n.id === e[1]).leaf);
    ok(topicEdges.every((e) => Array.isArray(e[3]) && onPage(e[3], e[3][2] || data.NODES.find((n) => n.id === e[1]).l)), 'every topic link cites a page that names its far end');
    const fd = subject.fragmentData || { threads: [], tables: [] };
    const steps = fd.threads.flatMap((t) => t.steps.map((s) => [t.id, s]));
    const tRows = fd.tables.flatMap((t) => t.rows.map((r) => [t.id, r]));
    const badSteps = [...steps, ...tRows].filter(([, s]) => !s.match || !onPage(s.src, s.match)).map(([id, s]) => `${id} "${s.match}"`);
    ok(!badSteps.length, `every thread step and table row is on the page it cites${badSteps.length ? ` (${badSteps.slice(0, 6).join(', ')})` : ''}`);
    ok([...steps, ...tRows].every(([, s]) => Number.isInteger(s.wk) && s.wk >= firstWeekOfSource(s.src)), 'no step or table row is tagged before its source was taught');
  }
```

and above the `for (const subject …)` loop add the helper and the cross-subject checks:

```js
/* The week a source's deck was taught, from any subject's deckWeek (1 when none says). */
const firstWeekOfSource = (src) => { const sid = (src || [])[0]; for (const s of Object.values(REVISION)) if (s.deckWeek && sid in s.deckWeek) return s.deckWeek[sid]; return 1; };

console.log('\nacross subjects');
const allSubjects = Object.values(REVISION);
const sysProblems = checkSystems(allSubjects);
ok(!sysProblems.length, `colour groups: every node's system is listed, keys unique, colours apart and readable${sysProblems.length ? ` — ${sysProblems.slice(0, 6).join('; ')}` : ''}`);
const idOwner = new Map(); const shared = [];
for (const s of allSubjects) for (const n of s.data.NODES) { if (idOwner.has(n.id)) shared.push(`${n.id} (${idOwner.get(n.id)}, ${s.id})`); else idOwner.set(n.id, s.id); }
ok(!shared.length, `no topic or row is in two subjects${shared.length ? ` (${shared.slice(0, 6).join(', ')})` : ''}`);
const rowKey = (r) => `${r.src[0]}|${r.src[1]}|${String(r.l).toLowerCase()}`;
const keyOwner = new Map(); const sameRow = [];
for (const s of allSubjects) for (const r of s.rows || []) { const k = rowKey(r); if (keyOwner.has(k) && keyOwner.get(k) !== s.id) sameRow.push(k); else keyOwner.set(k, s.id); }
ok(!sameRow.length, `no slide row is written into two subjects${sameRow.length ? ` (${sameRow.slice(0, 4).join(', ')})` : ''}`);
/* Rule 3: the Map draws a box's name only; the sentence lives in the notes. */
const reviseSrc = readFileSync(new URL('../outputs/study/revise.js', import.meta.url), 'utf8');
const deriveBody = (reviseSrc.match(/function deriveWeek\(\)[\s\S]*?\n\}/) || [''])[0];
ok(deriveBody.length > 0 && !/describe\(|rv-said|firstSentence\(/.test(deriveBody), 'the Map builder puts no sentence under a box');
```

In the fragments section, make the "has steps" checks depend on the subject asking for
fragments, so a subject still being written can be wired without empty-content failures.
Replace the two lines that test `steps.length > 0`, `rows.length > 0` and `dec.length > 0`:

```js
  const need = subject.requireFragments !== false;
  ok((need ? steps.length > 0 : true) && untaggedSteps === 0, `every thread step has a week (${steps.length} steps)${need ? '' : ' — fragments not required yet'}`);
```

```js
  ok((need ? rows.length > 0 : true) && !/<tr>\s*<td/.test(subject.tables), `every table row has a week (${rows.length} rows, ${boxes.length} boxes)`);
```

```js
  ok((need ? dec.length > 0 : true) && !/<tr>\s*<td/.test(subject.decoder), `every decoder row has a week (${dec.length} rows)`);
```

and change `ok(steps.some((w) => w === 1) || steps.some((w) => w <= 2), …)` to
`if (need) ok(steps.some((w) => w <= 2), 'threads have something from the first weeks');`.
(The variable `need` must be declared before the first of these lines.) Finally, after
the line asserting HSS2011's released/last week, add:

```js
ok(!REVISION.ABCT2326 || REVISION.ABCT2326.released == null, 'ABCT2326 has no released cap: every week with notes is a chip');
```

- [ ] **Step 3: Run it; write the one new anatomy sentence**

Run: `node work/revision-check.mjs | tail -60`
Expected: one FAIL, `every row whose slide line is not useful has an own-words sentence (missing: w2_j_hip)`
(its line "acetabulofemoral; ball-and-socket" is two words). This is the general rule
catching a row the old 25-character rule let through, the owner's "not only vomer". If
more than this one row is listed, **stop and report the list**. Otherwise add to
`outputs/revision/own-words.js`, in the Week 2 section:

```js
  w2_j_hip: 'The ball-and-socket joint where the head of the femur sits in the acetabulum of the hip bone, joining the lower limb to the pelvis.',
```

and re-run. Expected: `ALL PASS` (ABCT2326 is not in the registry yet).

- [ ] **Step 4: Write `work/pages-workflow-check.mjs`**

```js
/*
 * Pages workflow check — every script .github/workflows/pages.yml runs exists.
 *
 *   node work/pages-workflow-check.mjs
 *
 * The workflow only runs on GitHub. A check deleted here that it still named
 * once broke the deploy and nothing local noticed.
 */
import { existsSync, readFileSync } from 'node:fs';

const yml = readFileSync(new URL('../.github/workflows/pages.yml', import.meta.url), 'utf8');
const named = [...new Set([...yml.matchAll(/node\s+(work\/[\w./-]+\.m?js)/g)].map((m) => m[1]))];
let fail = 0;
if (!named.length) { console.log('  FAIL no `node work/…` step found in pages.yml'); fail++; }
for (const f of named) {
  const here = existsSync(new URL(`../${f}`, import.meta.url));
  console.log(`  ${here ? 'ok  ' : 'FAIL'} ${f}`);
  if (!here) fail++;
}
console.log(fail ? `\n${fail} FAILED` : `\nALL PASS (${named.length} scripts)`);
process.exit(fail ? 1 : 0);
```

Run: `node work/pages-workflow-check.mjs`
Expected: 20 `ok` lines, `ALL PASS (20 scripts)`.

- [ ] **Step 5: Add it to the workflow**

In `.github/workflows/pages.yml`, directly after the `Data modules parse` step, add:

```yaml
      - name: Every check this workflow names exists
        run: node work/pages-workflow-check.mjs
```

Run `node work/pages-workflow-check.mjs` again. Expected: `ALL PASS (21 scripts)`.

- [ ] **Step 6: Commit**

```bash
git add work/revision-check.mjs work/pages-workflow-check.mjs .github/workflows/pages.yml outputs/revision/own-words.js outputs/revision/registry.js
git commit -m "feat(checks): the owner's Revise rules for every subject; pages.yml names only real scripts

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: The registry carries systems; physiology topics and empty leaf files

**Files:**
- Modify: `outputs/revision/registry.js`
- Create: `outputs/revision/abct2326-topics.js`, `abct2326-leaves-w1.js`, `-w2.js`, `-w3.js`, `-w4.js`, `-w5.js`, `-w7.js`, `abct2326-leaves-tissues.js`, `abct2326-fragments.js`

- [ ] **Step 1: Write the empty leaf files**

Create each of `outputs/revision/abct2326-leaves-w1.js`, `-w2.js`, `-w3.js`, `-w4.js`, `-w5.js`,
`-w7.js` with this content, `N` replaced by its week:

```js
/*
 * ABCT2326 · Week N leaves — one row per thing the slides teach as a unit.
 *
 * Filled by docs/superpowers/plans/2026-10-19-physiology-revise.md (Recipe P).
 * Row kinds and fields: outputs/revision/leaves.js. Rules: outputs/revision/rules.js.
 */
export const SOURCES = {};
export const ROWS = [];
```

and `outputs/revision/abct2326-leaves-tissues.js` with the same text, its first comment
line reading `ABCT2326 · the Tissues & cells rows moved from the anatomy files (Week 2 tutorial)`.

- [ ] **Step 2: Write the empty fragments file**

`outputs/revision/abct2326-fragments.js`:

```js
/*
 * ABCT2326 Threads, Tables, Decoder and Brain 3D tours, as sourced data.
 * Rendered by outputs/revision/fragments.js; every step and table row cites a page
 * (work/revision-check.mjs holds `match` to it). Filled by plan Task 17.
 */
export const THREADS_INTRO = 'Each thread follows one process across lectures and tags every step with the week it came from.';
export const TABLES_INTRO = 'Look-ups that tie the lectures together. Every row names the slide it comes from.';
export const DECODER_INTRO = 'Long words split into their parts, from the app\'s word-part list. Type in the box to filter.';
export const THREADS = [];
export const TABLES = [];
export const DECODER = [];
export const TOURS = [];
export const SOURCES_HTML = '<p class="foot" style="margin-top:12px">Week sources: W1 cells and body organisation · W2 cardiovascular system · W3 respiratory system · W4 digestive system · W5 renal system · W7 reproductive system (2026 lecture decks).</p>';
```

- [ ] **Step 3: Write `outputs/revision/abct2326-topics.js`**

Topic labels, pages and `match` words below were checked against the decks' page text
during planning. Add each topic's `line` (or `own`) by Recipe P step 3 below: the line is
what that page's text says about the topic, 12 words or fewer; if the page only names it,
write `own` instead.

```js
/*
 * ABCT2326 Human Physiology — revision topics, Weeks 1 to 7.
 *
 * Written like leaf rows (outputs/revision/leaves.js topicNodes): each topic
 * cites the page that names it, and its note is that page's line. No
 * textbook additions. w = the teaching week of the lecture (outputs/schedule.js).
 * EDGES: [a, b, reason, [sourceId, page]] — a topic link must cite a page.
 * docs/superpowers/specs/2026-10-19-physiology-revise.md.
 */
const L1 = 'phys.1.2026';
const L2 = 'phys.l2.2026';
const L3 = 'phys.l3.2026';
const L4 = 'phys.l4.2026';
const L5 = 'phys.l5.2026';
const L6 = 'phys.l6.2026';

export const SOURCES = {
  [L1]: 'Lecture 1 cells and body organisation slides',
  [L2]: 'Lecture 2 cardiovascular system slides',
  [L3]: 'Lecture 3 respiratory system slides',
  [L4]: 'Lecture 4 digestive system slides',
  [L5]: 'Lecture 5 renal system slides',
  [L6]: 'Lecture 6 reproductive system slides',
};

export const TOPICS = [
/* ---------------- Week 1: cells, tissues, homeostasis ---------------- */
{ id: 'p_cells', l: 'Introduction to cells', s: 'p_cell', w: 1, src: [L1, 2] },
{ id: 'p_membrane', l: 'Plasma membrane', s: 'p_cell', w: 1, src: [L1, 7, 8, 9] },
{ id: 'p_nucleus', l: 'Cell nucleus', s: 'p_cell', w: 1, src: [L1, 12] },
{ id: 'p_er', l: 'Endoplasmic reticulum', s: 'p_cell', w: 1, src: [L1, 17] },
{ id: 'p_golgi', l: 'Golgi apparatus', s: 'p_cell', w: 1, src: [L1, 18] },
{ id: 'p_protein', l: 'Protein synthesis', s: 'p_cell', w: 1, src: [L1, 21] },
{ id: 'p_cycle', l: 'Cell life cycle', s: 'p_cell', w: 1, src: [L1, 24] },
{ id: 'p_meiosis', l: 'Meiosis', s: 'p_cell', w: 1, src: [L1, 27] },
{ id: 'p_body_org', l: 'Body organization', s: 'p_cell', w: 1, src: [L1, 31] },
{ id: 'p_tissues', l: 'Tissues', match: 'Introduction to Tissues', s: 'p_cell', w: 1, src: [L1, 32] },
{ id: 'p_epithelial', l: 'Epithelial tissue', s: 'p_cell', w: 1, src: [L1, 33] },
{ id: 'p_connective', l: 'Connective tissue', s: 'p_cell', w: 1, src: [L1, 37] },
{ id: 'p_muscle_t', l: 'Muscle tissue', s: 'p_cell', w: 1, src: [L1, 51] },
{ id: 'p_neural_t', l: 'Neural tissue', s: 'p_cell', w: 1, src: [L1, 53] },
{ id: 'p_organs', l: 'Organs and systems', s: 'p_cell', w: 1, src: [L1, 56] },
{ id: 'p_homeostasis', l: 'Homeostasis', s: 'p_cell', w: 1, src: [L1, 57] },
{ id: 'p_feedback', l: 'Negative and positive feedback', s: 'p_cell', w: 1, src: [L1, 59] },
/* ---------------- Week 2: blood, vessels, heart ---------------- */
{ id: 'p_blood', l: 'Composition of blood', match: 'Composition of', s: 'p_cvs', w: 2, src: [L2, 4] },
{ id: 'p_plasma', l: 'Plasma', s: 'p_cvs', w: 2, src: [L2, 6] },
{ id: 'p_vessels', l: 'Blood vessels', s: 'p_cvs', w: 2, src: [L2, 9] },
{ id: 'p_circuits', l: 'Pulmonary and systemic circulations', match: 'Pulmonary and Systemic', s: 'p_cvs', w: 2, src: [L2, 19] },
{ id: 'p_heart', l: 'Heart', match: 'Structure of the Heart', s: 'p_cvs', w: 2, src: [L2, 20], viewer: true },
{ id: 'p_valves', l: 'Heart valves', match: 'Atrioventricular Valves', s: 'p_cvs', w: 2, src: [L2, 32] },
{ id: 'p_conduction', l: 'The conducting system', match: 'Conducting System', s: 'p_cvs', w: 2, src: [L2, 39] },
{ id: 'p_myoap', l: 'Myocardial action potential', s: 'p_cvs', w: 2, src: [L2, 56] },
{ id: 'p_refractory', l: 'Refractory periods', s: 'p_cvs', w: 2, src: [L2, 59] },
{ id: 'p_ecg', l: 'Electrocardiogram (ECG)', match: 'Electrocardiogram', s: 'p_cvs', w: 2, src: [L2, 61] },
{ id: 'p_cardiaccycle', l: 'Cardiac cycle', s: 'p_cvs', w: 2, src: [L2, 64] },
/* ---------------- Week 3: breathing ---------------- */
{ id: 'p_resp_sys', l: 'Respiratory system', s: 'p_resp', w: 3, src: [L3, 3] },
{ id: 'p_resp_portion', l: 'Respiratory portion', s: 'p_resp', w: 3, src: [L3, 9] },
{ id: 'p_respiration', l: 'Respiration', s: 'p_resp', w: 3, src: [L3, 14] },
{ id: 'p_ventilation', l: 'Pulmonary ventilation', s: 'p_resp', w: 3, src: [L3, 17] },
{ id: 'p_breathmech', l: 'Mechanics of breathing', s: 'p_resp', w: 3, src: [L3, 28] },
{ id: 'p_lungvol', l: 'Lung measurements', s: 'p_resp', w: 3, src: [L3, 32] },
{ id: 'p_gasex', l: 'Gas exchange', s: 'p_resp', w: 3, src: [L3, 40] },
{ id: 'p_o2', l: 'Oxygen transport', match: 'Oxygen gas transport', s: 'p_resp', w: 3, src: [L3, 45] },
{ id: 'p_co2', l: 'Carbon dioxide transport', match: 'Carbon dioxide gas transport', s: 'p_resp', w: 3, src: [L3, 55] },
{ id: 'p_respcontrol', l: 'Control of respiration', s: 'p_resp', w: 3, src: [L3, 59] },
/* ---------------- Week 4: digestion ---------------- */
{ id: 'p_gi_tract', l: 'The digestive tract', match: 'Digestive Tract', s: 'p_gi', w: 4, src: [L4, 2, 4] },
{ id: 'p_gi_layers', l: 'Digestive tract layers', s: 'p_gi', w: 4, src: [L4, 7] },
{ id: 'p_gi_move', l: 'Movement of digestive materials', s: 'p_gi', w: 4, src: [L4, 12] },
{ id: 'p_gi_reg', l: 'Digestive tract regulation', s: 'p_gi', w: 4, src: [L4, 14] },
{ id: 'p_oral', l: 'Oral cavity', s: 'p_gi', w: 4, src: [L4, 19], viewer: true },
{ id: 'p_stomach', l: 'Stomach', match: 'The Stomach', s: 'p_gi', w: 4, src: [L4, 21], viewer: true },
{ id: 'p_gastric_reg', l: 'Regulation of gastric activity', s: 'p_gi', w: 4, src: [L4, 30] },
{ id: 'p_smallint', l: 'Small intestine', match: 'The Small Intestine', s: 'p_gi', w: 4, src: [L4, 34], viewer: true },
{ id: 'p_pancreas', l: 'Pancreas', match: 'The Pancreas', s: 'p_gi', w: 4, src: [L4, 41], viewer: true },
{ id: 'p_liver', l: 'Liver', match: 'The Liver', s: 'p_gi', w: 4, src: [L4, 44], viewer: true },
{ id: 'p_gallbladder', l: 'Gallbladder', match: 'The Gallbladder', s: 'p_gi', w: 4, src: [L4, 48], viewer: true },
{ id: 'p_coord', l: 'Coordination of secretion and absorption', s: 'p_gi', w: 4, src: [L4, 52] },
{ id: 'p_largeint', l: 'Large intestine', match: 'The Large Intestine', s: 'p_gi', w: 4, src: [L4, 60], viewer: true },
{ id: 'p_digestion', l: 'Digestion', s: 'p_gi', w: 4, src: [L4, 64] },
/* ---------------- Week 5: kidney and urine ---------------- */
{ id: 'p_kidneyfn', l: 'Kidney function', s: 'p_renal', w: 5, src: [L5, 2] },
{ id: 'p_urinary', l: 'Urinary system', s: 'p_renal', w: 5, src: [L5, 3, 4] },
{ id: 'p_micturition', l: 'Micturition reflex', s: 'p_renal', w: 5, src: [L5, 6] },
{ id: 'p_nephron', l: 'Nephron', s: 'p_renal', w: 5, src: [L5, 8] },
{ id: 'p_gfiltration', l: 'Glomerular filtration', s: 'p_renal', w: 5, src: [L5, 13] },
{ id: 'p_gfr', l: 'Glomerular filtration rate (GFR)', match: 'Glomerular Filtration Rate', s: 'p_renal', w: 5, src: [L5, 17] },
{ id: 'p_reabs', l: 'Reabsorption of salt and water', match: 'Reabsorption of Salt', s: 'p_renal', w: 5, src: [L5, 20] },
{ id: 'p_countercurrent', l: 'Countercurrent multiplier system', match: 'Countercurrent Multiplier', s: 'p_renal', w: 5, src: [L5, 27] },
{ id: 'p_clearance', l: 'Renal plasma clearance', s: 'p_renal', w: 5, src: [L5, 33] },
{ id: 'p_electrolyte', l: 'Electrolyte balance', s: 'p_renal', w: 5, src: [L5, 36] },
{ id: 'p_raas', l: 'Renin-angiotensin-aldosterone system', match: 'Renin-Angiotensin-Aldosterone', s: 'p_renal', w: 5, src: [L5, 40] },
{ id: 'p_buffers', l: 'Urinary buffers', s: 'p_renal', w: 5, src: [L5, 44] },
/* ---------------- Week 7: reproduction ---------------- */
{ id: 'p_spermato', l: 'Spermatogenesis', s: 'p_repro', w: 7, src: [L6, 4] },
{ id: 'p_gonadotropin', l: 'Gonadotropin secretion', s: 'p_repro', w: 7, src: [L6, 12] },
{ id: 'p_testosterone', l: 'Testosterone', s: 'p_repro', w: 7, src: [L6, 13] },
{ id: 'p_male_acc', l: 'Male accessory sex organs', s: 'p_repro', w: 7, src: [L6, 17] },
{ id: 'p_female', l: 'Female reproductive system', s: 'p_repro', w: 7, src: [L6, 20] },
{ id: 'p_uterus', l: 'Functions of the uterus', s: 'p_repro', w: 7, src: [L6, 21] },
{ id: 'p_ovarian', l: 'Ovarian cycle', s: 'p_repro', w: 7, src: [L6, 29, 30] },
{ id: 'p_menstrual', l: 'Menstrual cycle', match: 'Menstrual', s: 'p_repro', w: 7, src: [L6, 38, 39] },
{ id: 'p_fert', l: 'Fertilization', s: 'p_repro', w: 7, src: [L6, 40] },
{ id: 'p_implant', l: 'Implantation', s: 'p_repro', w: 7, src: [L6, 48] },
{ id: 'p_placenta', l: 'Placenta', s: 'p_repro', w: 7, src: [L6, 49] },
{ id: 'p_parturition', l: 'Parturition (delivery)', match: 'PARTURITION', s: 'p_repro', w: 7, src: [L6, 55] },
];

/* Topic links are written by plan Task 16, each citing a page. */
export const EDGES = [];

export const TREE = { label: 'root', kids: [
  { sys: 'p_cell', label: 'Cells & tissues', kids: [
    { id: 'p_cells', kids: [{ id: 'p_membrane' }, { id: 'p_nucleus' }, { id: 'p_er' }, { id: 'p_golgi' }] },
    { id: 'p_protein' },
    { id: 'p_cycle', kids: [{ id: 'p_meiosis' }] },
    { id: 'p_body_org', kids: [
      { id: 'p_tissues', kids: [{ id: 'p_epithelial' }, { id: 'p_connective' }, { id: 'p_muscle_t' }, { id: 'p_neural_t' }] },
      { id: 'p_organs' }] },
    { id: 'p_homeostasis', kids: [{ id: 'p_feedback' }] }] },
  { sys: 'p_cvs', label: 'Blood & heart', kids: [
    { id: 'p_blood', kids: [{ id: 'p_plasma' }] },
    { id: 'p_vessels', kids: [{ id: 'p_circuits' }] },
    { id: 'p_heart', kids: [{ id: 'p_valves' }, { id: 'p_cardiaccycle' }] },
    { id: 'p_conduction', kids: [{ id: 'p_myoap' }, { id: 'p_refractory' }, { id: 'p_ecg' }] }] },
  { sys: 'p_resp', label: 'Breathing', kids: [
    { id: 'p_resp_sys', kids: [{ id: 'p_resp_portion' }] },
    { id: 'p_respiration', kids: [{ id: 'p_ventilation', kids: [{ id: 'p_breathmech' }, { id: 'p_lungvol' }] }, { id: 'p_gasex' }, { id: 'p_o2' }, { id: 'p_co2' }] },
    { id: 'p_respcontrol' }] },
  { sys: 'p_gi', label: 'Digestion', kids: [
    { id: 'p_gi_tract', kids: [{ id: 'p_gi_layers' }, { id: 'p_gi_move' }, { id: 'p_gi_reg' }] },
    { id: 'p_oral' },
    { id: 'p_stomach', kids: [{ id: 'p_gastric_reg' }] },
    { id: 'p_smallint' },
    { id: 'p_pancreas' }, { id: 'p_liver' }, { id: 'p_gallbladder' },
    { id: 'p_coord' }, { id: 'p_largeint' }, { id: 'p_digestion' }] },
  { sys: 'p_renal', label: 'Kidney & urine', kids: [
    { id: 'p_kidneyfn' },
    { id: 'p_urinary', kids: [{ id: 'p_micturition' }] },
    { id: 'p_nephron', kids: [{ id: 'p_gfiltration', kids: [{ id: 'p_gfr' }] }, { id: 'p_reabs', kids: [{ id: 'p_countercurrent' }] }, { id: 'p_clearance' }] },
    { id: 'p_electrolyte', kids: [{ id: 'p_raas' }, { id: 'p_buffers' }] }] },
  { sys: 'p_repro', label: 'Reproduction', kids: [
    { id: 'p_spermato', kids: [{ id: 'p_gonadotropin' }, { id: 'p_testosterone' }] },
    { id: 'p_male_acc' },
    { id: 'p_female', kids: [{ id: 'p_uterus' }, { id: 'p_ovarian' }, { id: 'p_menstrual' }] },
    { id: 'p_fert', kids: [{ id: 'p_implant' }, { id: 'p_placenta' }, { id: 'p_parturition' }] }] },
] };
```

- [ ] **Step 4: Wire the registry**

In `outputs/revision/registry.js`: change the header comment's second paragraph to say a
subject also lists its `systems` (legend label, legend colour, Map shade, body), its
`hubOrder` and its `copy`, and that a subject written from scratch sets `sourced: true`.
Add imports below the existing ones:

```js
import { topicNodes } from './leaves.js';
import { renderDecoder, renderTables, renderThreads } from './fragments.js';
import { decompose } from '../wordparts.js?v=3';
import * as abct from './abct2326-topics.js';
import * as abctW1 from './abct2326-leaves-w1.js';
import * as abctTis from './abct2326-leaves-tissues.js';
import * as abctW2 from './abct2326-leaves-w2.js';
import * as abctW3 from './abct2326-leaves-w3.js';
import * as abctW4 from './abct2326-leaves-w4.js';
import * as abctW5 from './abct2326-leaves-w5.js';
import * as abctW7 from './abct2326-leaves-w7.js';
import * as abctFrag from './abct2326-fragments.js';
```

(`dropSystem, mergeLeaves` stay imported from `./leaves.js`; merge the two leaves imports
into one line: `import { dropSystem, mergeLeaves, topicNodes } from './leaves.js';`.)

Add below `HSS2011_SYSTEMS` (Task 5 Step 0):

```js
/* Physiology's groups, one per lecture system (spec 4.3). Cells and heart share anatomy's colour on purpose: same body system. */
const ABCT2326_SYSTEMS = [
  { key: 'p_cell', label: 'Cells & tissues', col: '#9fb2bb', body: 'cells' },
  { key: 'p_cvs', label: 'Blood & heart', col: '#e879c6', body: 'heart' },
  { key: 'p_resp', label: 'Breathing', col: '#7dd3f0' },
  { key: 'p_gi', label: 'Digestion', col: '#c6d86b' },
  { key: 'p_renal', label: 'Kidney & urine', col: '#f2a65a' },
  { key: 'p_repro', label: 'Reproduction', col: '#b58cf0' },
];

const ABCT2326_ROWS = [...abctW1.ROWS, ...abctTis.ROWS, ...abctW2.ROWS, ...abctW3.ROWS, ...abctW4.ROWS, ...abctW5.ROWS, ...abctW7.ROWS];
const ABCT2326_SOURCES = { ...abct.SOURCES, ...abctW1.SOURCES, ...abctTis.SOURCES, ...abctW2.SOURCES, ...abctW3.SOURCES, ...abctW4.SOURCES, ...abctW5.SOURCES, ...abctW7.SOURCES };
const ABCT2326_BASE = { NODES: topicNodes(abct.TOPICS, ABCT2326_SOURCES), EDGES: abct.EDGES, TREE: abct.TREE };
```

Add the second subject after the `HSS2011` entry:

```js
  ABCT2326: {
    id: 'ABCT2326',
    label: 'ABCT2326 Human Physiology',
    data: mergeLeaves(ABCT2326_BASE, ABCT2326_ROWS, ABCT2326_SOURCES),
    rows: ABCT2326_ROWS,
    threads: renderThreads(abctFrag.THREADS, ABCT2326_SOURCES, abctFrag.THREADS_INTRO),
    tables: renderTables(abctFrag.TABLES, ABCT2326_SOURCES, abctFrag.TABLES_INTRO),
    decoder: renderDecoder(abctFrag.DECODER, decompose, abctFrag.DECODER_INTRO),
    sources: abctFrag.SOURCES_HTML,
    fragmentData: { threads: abctFrag.THREADS, tables: abctFrag.TABLES },
    tours: abctFrag.TOURS,
    /* topics, topic links and fragment steps cite pages (work/revision-check.mjs) */
    sourced: true,
    /* the Threads, Tables and Decoder tabs are hidden until plan Task 17 fills them */
    requireFragments: false,
    /* the teaching week of each deck a row may cite (outputs/schedule.js) */
    deckWeek: { 'phys.1.2026': 1, 'phys.l2.2026': 2, 'phys.l3.2026': 3, 'phys.l4.2026': 4, 'phys.l5.2026': 5, 'phys.l6.2026': 7, 'hss.tut.tissues': 2, 'hss.w1.2026': 1 },
    systems: ABCT2326_SYSTEMS,
    hubOrder: ['p_cell', 'p_cvs', 'p_resp', 'p_gi', 'p_renal', 'p_repro'],
    copy: { name: 'Physiology', leafWords: 'single cells, structures, substances and steps', findHint: 'e.g. renin, SA node' },
  },
```

- [ ] **Step 5: Fill the topic lines**

For each topic, run `node work/query.mjs pages <source> <page>` and add `line: '…'` (the
page's own words about it, at most 12 words, no picture labels) or, where the page only
names it, `own: '…'` (rules: Recipe P step 4). Then:

Run: `node work/revision-check.mjs | tail -70`
Expected: `ALL PASS`, with the new `ABCT2326` block showing
`growth 1:17t/0l  2:28t/0l  3:38t/0l  4:52t/0l  5:64t/0l  6:64t/0l  7:76t/0l`
(76 topics, no links yet; week 6 adds nothing) and `every topic's name is on a page it cites` ok. If a
topic's page fails, read the page and fix its `match` or page; do not drop the topic
without telling the owner.

- [ ] **Step 6: Commit**

```bash
node work/revise-pure-check.mjs | tail -2
node work/syntax-check.mjs | tail -1
git add outputs/revision/registry.js outputs/revision/abct2326-topics.js outputs/revision/abct2326-leaves-w1.js outputs/revision/abct2326-leaves-w2.js outputs/revision/abct2326-leaves-w3.js outputs/revision/abct2326-leaves-w4.js outputs/revision/abct2326-leaves-w5.js outputs/revision/abct2326-leaves-w7.js outputs/revision/abct2326-leaves-tissues.js outputs/revision/abct2326-fragments.js
git commit -m "feat(revise): ABCT2326 physiology topics for weeks 1 to 7; subjects carry their colour groups

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: The view is subject-neutral; the subject switch

**Files:**
- Modify: `outputs/study/revise.js`, `outputs/study/revise-brain.js`
- Modify: `outputs/radiography-study-studio.html` (lines 114–117, 143–152, 156, 183–192)
- Modify: `outputs/app.css` (after line 1412)

- [ ] **Step 1: HTML**

In `outputs/radiography-study-studio.html`, inside `<div class="rv-head">`, insert as its
first child:

```html
              <div class="rv-subjects" id="rvSubjects" role="group" aria-label="Subject" hidden></div>
```

In BOTH `.rv-legend` blocks (Map at ~143, Brain 3D at ~183), delete every `<span …><i …></i>…</span>`
line, keeping only the `<span class="rv-lab">…</span>` line: the entries are now written
from the subject's systems. Change the `#rvMm` `aria-label` to
`Mind map of the topics learnt so far. Use the Find box or the Jump to menu for a text route into the same content.`
(revise.js adds the branch count).

- [ ] **Step 2: CSS**

In `outputs/app.css`, after the `#reviseView .rv-weekbar .rv-lab{…}` line, add:

```css
#reviseView .rv-subjects{display:flex;flex-wrap:wrap;gap:6px;align-items:center;width:100%}
#reviseView .rv-subjects .rv-chip{min-height:44px;padding:8px 18px}
```

(no font size, so `text-size-check` is unaffected).

- [ ] **Step 3: `revise.js` — systems from the subject**

Add to the imports: `import { legendKeys, viewerEligible } from '../revision/rules.js?v=1';`

Replace lines 37–38 (`const SYS = …` and `const SYSVAR = …`) with:

```js
/* Body-system colour groups belong to the subject (registry `systems`); applySubject() writes their colours as
   --rv-c-<key> and --c-<key> on #reviseView. */
const sysOf = (k) => (subjectData().systems || []).find((s) => s.key === k) || { key: k, label: k };
const SUBJECT_KEY = `${STORAGE_PREFIX}revise:subject`;
```

In `deriveWeek`, replace `style="--bc:var(${SYSVAR[sy]})"` with `style="--bc:var(--c-${sy})"`.

In `renderPanel`, replace
`style="background:var(${SYSVAR[n.s].replace('--c-', '--rv-c-')})">${esc(SYS[n.s])}</span>`
with `style="background:var(--rv-c-${n.s})">${esc(sysOf(n.s).label)}</span>`, and
`style="background:var(${SYSVAR[sys].replace('--c-', '--rv-c-')})">${esc(SYS[sys])}</span>`
with `style="background:var(--rv-c-${sys})">${esc(sysOf(sys).label)}</span>`.

Replace the `const said = OWN[id] ? …` statement's opening with an `own` lookup:

```js
    const own = n.own || OWN[id];
    const said = own ? `<p class="rv-said">${esc(own)}</p><p class="rv-ownnote">In brief, in the app's own words, not the slide's.</p>` : bare ? `<p class="rv-said">${esc(describe(n, {
```

(the rest of the statement is unchanged). Replace `const vh = viewerHit(n.l);` with
`const vh = viewerEligible(n) ? viewerHit(n.l) : null;`, and in `init()` replace
`const n = ix.byId[b.dataset.toviewer]; const h = n && viewerHit(n.l);` with
`const n = ix.byId[b.dataset.toviewer]; const h = n && viewerEligible(n) && viewerHit(n.l);`.

In `paintWeekBar`, replace
`const shown = new Set([...ix.ids].map((id) => ix.byId[id] && ix.byId[id].s));` with
`const shown = legendKeys(subjectData().data, ix.ids);`.

In `homeHTML`, replace `topics opening into single muscles, bones, joints and nerves.` with
`topics opening into ${esc(subjectData().copy.leafWords)}.`

- [ ] **Step 4: `revise.js` — the subject switch**

Add after `paintWeekBar`:

```js
/* ------------------------------------------------------------------ *
 * The subject
 * ------------------------------------------------------------------ */

function paintSubjects() {
  const box = $$('rvSubjects');
  const subs = Object.values(REVISION);
  box.hidden = subs.length < 2;
  box.innerHTML = subs.map((s) => `<button type="button" class="rv-chip rv-subj" data-subject="${esc(s.id)}" aria-pressed="${s.id === rv.subject}">${esc(s.copy.name)}</button>`).join('');
  box.querySelectorAll('[data-subject]').forEach((b) => { b.onclick = () => setSubject(b.dataset.subject); });
}

/* What belongs to the subject rather than the week: its colours, its legend (every entry hidden until
   paintWeekBar finds something of it taught), and its few words. */
function applySubject() {
  const sub = subjectData();
  const view = $$('reviseView');
  for (const s of sub.systems) {
    view.style.setProperty(`--rv-c-${s.key}`, s.col);
    view.style.setProperty(`--c-${s.key}`, s.map || s.col);
  }
  document.querySelectorAll('#reviseView .rv-legend').forEach((lg) => {
    const lab = lg.querySelector('.rv-lab');
    lg.textContent = '';
    if (lab) lg.appendChild(lab);
    lg.insertAdjacentHTML('beforeend', sub.systems.map((s) => `<span data-sys="${esc(s.key)}" hidden><i style="background:var(--rv-c-${esc(s.key)})"></i>${esc(s.label)}</span>`).join(''));
  });
  $$('rvFind').placeholder = sub.copy.findHint;
  $$('rvMm').setAttribute('aria-label', `Mind map of the topics learnt so far, grouped into ${sub.data.TREE.kids.length} branches. Use the Find box or the Jump to menu for a text route into the same content.`);
  paintSubjects();
}

/* Switch subject. Each subject keeps its own saved week (prefKey is per subject). */
export function setSubject(id) {
  if (!REVISION[id]) return;
  rv.subject = id;
  write(SUBJECT_KEY, id);
  if (!rv.mounted) return;
  const sub = subjectData();
  rv.last = releasedLast(lastWeekOf(sub.data), sub.released);
  const next = resolveWeek(savedPref(), autoNow(), rv.last);
  rv.week = next.week; rv.mode = next.mode;
  applySubject();
  deriveWeek();
  mountFragments();
  const tabOf = { threads: 'rvTabThreads', tables: 'rvTabTables', decoder: 'rvTabDecoder' };
  if (tabOf[rv.tab] && $$(tabOf[rv.tab]).hidden) showTab('map');
  paintAll();
}
```

In `mountFragments`, add as its first lines (after `const sub = subjectData();`):

```js
  ix.threadTitles = {};
  /* a subject still being written has no Threads, Tables or Decoder yet: its tabs are hidden */
  [['threads', 'rvTabThreads'], ['tables', 'rvTabTables'], ['decoder', 'rvTabDecoder']].forEach(([k, tab]) => { $$(tab).hidden = !sub[k]; });
```

In `renderRevise`, in the `if (!rv.mounted) {` branch, insert before `const sub = subjectData();`:

```js
    const savedSubject = read(SUBJECT_KEY, null);
    if (savedSubject && REVISION[savedSubject]) rv.subject = savedSubject;
    applySubject();
```

In `loadBrain`, add two entries to the `createBrain({ … })` argument:

```js
    colour: (s) => sysOf(s).col,
    order: () => subjectData().hubOrder,
```

Update the file's header comment: "Five views over one week-gated dataset per subject; the
subject switch (setSubject) picks which."

- [ ] **Step 5: `revise-brain.js` — colours and order from the subject**

Delete the module-level `const COL = {…};` line and the `const DIM = Object.fromEntries(…);`
line. Inside `createBrain`, after `const { ix } = env;`, add:

```js
  /* the subject's colours (dark-stage legend colours); a dimmed one per key, made once */
  const COL = (s) => env.colour(s) || PARENT_COL;
  const dimmed = {};
  const DIM = (s) => (dimmed[s] = dimmed[s] || mix(COL(s), BG, 0.55));
```

Replace `DIM[n.s] : COL[n.s]` with `DIM(n.s) : COL(n.s)`, `COL[ix.byId[id].s]` with
`COL(ix.byId[id].s)`, and `return hubLayout({ first, parent, second });` with
`return hubLayout({ first, parent, second, order: env.order() });`. Change the comment
`/* the stage is dark, so these are the dark-theme system colours */` to sit above the new
lines.

- [ ] **Step 6: Run the after-every-edit set for these files**

```bash
node work/load-check.mjs
node work/syntax-check.mjs
node work/binding-check.mjs
node work/bridge-check.mjs
node work/revision-check.mjs | tail -3
node work/revise-pure-check.mjs | tail -2
node work/text-size-check.mjs | tail -2
```

Expected: each passes. `binding-check` names any import you missed.

- [ ] **Step 7: Commit**

```bash
git add outputs/study/revise.js outputs/study/revise-brain.js outputs/radiography-study-studio.html outputs/app.css
git commit -m "feat(revise): a subject switch; colours, legend and hub order come from the subject

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: The shell

**Files:**
- Modify: `outputs/sw.js` (SHELL near lines 197–217; `CACHE_VERSION` line 34)

- [ ] **Step 1: Add the new modules and bump the cache**

After `'./revision/own-words.js?v=1',` add `'./revision/rules.js?v=1',`. After
`'./revision/hss2011-decoder.js',` add:

```js
  './revision/fragments.js',
  './revision/abct2326-topics.js',
  './revision/abct2326-leaves-w1.js',
  './revision/abct2326-leaves-tissues.js',
  './revision/abct2326-leaves-w2.js',
  './revision/abct2326-leaves-w3.js',
  './revision/abct2326-leaves-w4.js',
  './revision/abct2326-leaves-w5.js',
  './revision/abct2326-leaves-w7.js',
  './revision/abct2326-fragments.js',
```

Bump `CACHE_VERSION` by one (read the current value first; at planning time it was `'v241'`).

- [ ] **Step 2: Check and commit**

```bash
node work/shell-check.mjs
git add outputs/sw.js
git commit -m "chore(revise): precache the physiology revision modules

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

Expected: `shell-check` passes. If it names a specifier, it is a query mismatch: the SHELL
string must be exactly what the importing file writes.

---

### Task 9: The browser check, and Wave 0 in a real page

**Files:**
- Create: `work/revise-browser-check.js`

- [ ] **Step 1: Write the check**

```js
// Run this default function through the Browser pane's javascript_tool (or Chrome evaluate_script) on the local app.
// Holds the owner's rules 2, 3, 6 and 7 and the subject switch in a real page.
// docs/superpowers/specs/2026-10-19-physiology-revise.md section 2.
export default async function () {
  const assert = (ok, message) => { if (!ok) throw new Error(message); };
  const until = async (fn) => { for (let i = 0; i < 150; i++) { if (fn()) return; await new Promise((r) => setTimeout(r, 100)); } throw new Error('Timed out'); };
  const rv = await import('./study/revise.js');
  const { REVISION } = await import('./revision/registry.js?v=1');
  const { viewerEligible } = await import('./revision/rules.js?v=1');
  rv.renderRevise();
  const report = [];
  for (const id of Object.keys(REVISION)) {
    rv.setSubject(id);
    const st0 = rv.reviseState();
    assert(st0.subject === id, `switch to ${id}`);
    assert(document.querySelector(`#rvSubjects [data-subject="${id}"]`).getAttribute('aria-pressed') === 'true', `${id}: its button is pressed`);
    assert(document.querySelectorAll('#rvWeekBar [data-week]').length === st0.last, `${id}: one chip per week up to ${st0.last}`);
    for (let n = 1; n <= st0.last; n++) {
      rv.setWeek(n, 'manual');
      await new Promise((r) => setTimeout(r, 400)); /* the Map is made again on a week change */
      await until(() => document.querySelectorAll('#rvMm .markmap-node').length > 0);
      /* rule 3: a Map box shows its name, its week tags and "new", nothing else */
      for (const fo of document.querySelectorAll('#rvMm .markmap-node foreignObject')) {
        const c = fo.cloneNode(true);
        c.querySelectorAll('.mmt,.mwk,.wknew').forEach((e) => e.remove());
        assert(!c.textContent.trim(), `${id} W${n}: a Map box carries "${c.textContent.trim().slice(0, 40)}"`);
      }
      /* rule 6: the legend is exactly the systems taught by week n, in both legends */
      const want = new Set(REVISION[id].data.NODES.filter((x) => Math.min(...x.w) <= n).map((x) => x.s));
      for (const lg of document.querySelectorAll('#reviseView .rv-legend')) {
        const shown = new Set([...lg.querySelectorAll('[data-sys]')].filter((e) => !e.hidden).map((e) => e.dataset.sys));
        assert(shown.size === want.size && [...want].every((k) => shown.has(k)), `${id} W${n}: legend ${[...shown]} but taught ${[...want]}`);
      }
      /* rule 2: nothing taught later is drawn */
      const later = REVISION[id].data.NODES.filter((x) => Math.min(...x.w) > n).map((x) => x.l);
      const drawn = new Set([...document.querySelectorAll('#rvMm .mmt')].map((e) => e.textContent));
      assert(!later.some((l) => drawn.has(l) && !REVISION[id].data.NODES.some((y) => y.l === l && Math.min(...y.w) <= n)), `${id} W${n}: a later topic is drawn`);
    }
    /* rule 7: the viewer button only where it may be — every topic, and up to 25 rows of each kind */
    const st = rv.reviseState();
    const jump = document.getElementById('rvJump');
    const offered = [];
    const perKind = {};
    const sample = REVISION[id].data.NODES.filter((x) => Math.min(...x.w) <= st.week).filter((x) => { const k = x.leaf || 'topic'; perKind[k] = (perKind[k] || 0) + 1; return k === 'topic' || perKind[k] <= 25; });
    for (const node of sample) {
      jump.value = node.id; jump.dispatchEvent(new Event('change'));
      const btn = document.querySelector(`#rvSide [data-toviewer="${CSS.escape(node.id)}"]`);
      if (btn) { offered.push(`${node.l} (${node.leaf || 'topic'})`); assert(viewerEligible(node), `${id}: viewer button on ${node.l}, a ${node.leaf}`); }
    }
    report.push({ subject: id, last: st0.last, checked: sample.length, viewer: offered });
    rv.setWeek(st0.week, 'auto'); /* hand the subject back to the calendar */
  }
  rv.setSubject(Object.keys(REVISION)[0]);
  return report;
}
```

- [ ] **Step 2: Run it**

Start the preview (`preview_start` with name `study-studio`), open
`http://localhost:8420/radiography-study-studio.html`, clear the service worker (see
"Before you start") and navigate twice. Paste the function into `javascript_tool` as
`(async () => { …function body… })()` and run it.

Expected: it returns a report with `HSS2011` (last 8) and `ABCT2326` (last 7). For
ABCT2326 the `viewer` list holds only topics marked `viewer: true` that the viewer's search
knows (for example Stomach, Liver, Pancreas). If it throws, fix the cause in the code, not
in the check.

- [ ] **Step 3: Look at it at phone and iPad size**

`resize_window` to 390 × 844, then 820 × 1180. In each:

- The Anatomy | Physiology buttons sit above the week chips, at least 44 px tall.
- Physiology, Auto: W1 to W7 chips; the note says weeks 1–7 are shown (today is in week 8).
- Physiology W1: only "Cells & tissues" in the legend; the Threads, Tables and Decoder tabs are hidden.
- Tap "Stomach" (W4): the notes show its slide line and "Show in the viewer"; tap the button:
  the Viewer opens on the stomach and the organ layer chip is lit (rule 7).
- Tap a branch heading: it is framed on the left with its branch to the right (rule 3).
- Brain 3D: centre on a physiology topic; ball colours are the physiology colours.
- Switch back to Anatomy: anatomy's map, legend and saved week return unchanged.
- `read_console_messages` with `onlyErrors: true`: nothing new beyond the known
  `translate(NaN,NaN)` message (docs/TRAPS.md "Revise").

Reset with `resize_window` preset `desktop`. Take one screenshot of Physiology at 390 × 844
for the record.

- [ ] **Step 4: Commit**

```bash
git add work/revise-browser-check.js
git commit -m "test(revise): a browser check for the clean map, the legend, viewer gating and the subject switch

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

Wave 0 ends here. Tell the owner the topic-only physiology map is committed locally and
that Wave 1 can start (six sessions).

---

# Wave 1 — one session per week, in parallel

## Recipe P: turning physiology slide pages into rows

Every Wave-1 task runs this recipe with its own parameters.

1. **Read the pages.** `node work/query.mjs pages <source> <from>-<to>`. This text is the
   only content you may use. Words that are only in a picture (graph axes, figure labels
   with no text on the page) are not written.
2. **List what the page teaches as a unit**: a structure or organ region (`part`), a cell
   type (`cell`), a hormone, enzyme, ion, gas or molecule (`substance`), a step, mechanism,
   reflex or phase (`process`), or a heading holding several of these (`group`). Skip
   figure credits, learning outcomes, summaries that only repeat earlier pages, videos,
   questions, and clinical cases.
3. **Write one row per unit** in the task's file, in reading order, parent before child:
   - `id` `p<week>_<short>` (Week 7 rows are `p7_`), unique: `grep -rn "id: 'p3_x'" outputs/revision/` first.
   - `l` the name as the slide writes it; `match` only when the page words it differently,
     a real fragment of at least 4 characters.
   - `parent` a topic from the task's table, or an earlier row of this file.
   - `w` the task's week (the deck's week; `rowWeekOk` fails anything else).
   - `src` `[source, page, page…]`, best page first, every page whose text has the name.
   - `line` what the slide says about it, 12 words or fewer, in its words. **Numbers and
     values go here** ("about 125 ml/min"), never as a row of their own.
   - Links, each reason in the slide's words: `makes` (part/cell → substance row it
     secretes), `acts` (substance → what it acts on), `next` (process → the process or topic
     it leads to), `links` (anything else the page states). A link target must already exist
     (a row above, or a topic). No link from general knowledge.
4. **Own words (rule 4).** After writing the rows, run the check (step 6). Every row it lists
   under "not useful … has an own-words sentence" gets `own: '…'` on the row: ONE plain
   sentence saying what it is and where it is or what it does, 40–220 characters, ending
   with a full stop, **no digits and no star**, no clinical content, nothing the slides do
   not support. Do not put it in `own-words.js` (that is anatomy's). This is real work:
   expect a third to a half of the rows to need one. A `group` with no line needs one too.
5. **No twin boxes (rule 5).** Do not name a row exactly like its parent topic; if the slide
   does, `mergeLeaves` folds it into the topic (ALIAS), which is fine. Do not give two rows
   under one parent the same name.
6. **Check:**

```bash
node work/revision-check.mjs | tail -45
node work/revise-pure-check.mjs | tail -2
```

   Expected: `ALL PASS`. A name not on its page → read the page, fix the page or `match`;
   if the name is only in a picture, delete the row and list it (step 7).
7. **Write the task's notes file** `docs/superpowers/notes/2026-10-19-physiology-revise-w<N>.md`:
   the row count, the own-words count, "Only in pictures, not written: …" (page and words),
   and "Links not added because no page states them: …".
8. **Commit** only the task's files.

Shared parameters: parent topics are those in `abct2326-topics.js` with the task's week.
`SOURCES` in each leaf file names the deck, e.g. `export const SOURCES = { 'phys.l3.2026': 'Lecture 3 respiratory system slides' };`
(the same words as `abct2326-topics.js`).

### Task 10: Week 1 — cells, tissues, homeostasis; move the anatomy tissue rows

**Files:**
- Modify: `outputs/revision/abct2326-leaves-w1.js`, `outputs/revision/abct2326-leaves-tissues.js`
- Modify: `outputs/revision/hss2011-leaves-w1.js` (remove the moved rows), `outputs/revision/hss2011-leaves-w2.js` only if a moved row is there (none at planning time), `outputs/revision/own-words.js` (only if Step 3 removes a row that had one; none had)
- Create: `docs/superpowers/notes/2026-10-19-physiology-revise-w1.md`

Source `phys.1.2026`. Page map: 2–6 cells and the model cell · 7–10 plasma membrane and
membrane proteins · 11–15 nucleus, DNA organisation · 16–17 ER · 18–20 Golgi and its
products · 21–23 protein synthesis, transcription · 24–26 cell life cycle, mitosis ·
27–29 meiosis · 30–31 body organisation · 32 tissues · 33–36 epithelia · 37–50 connective
tissue (loose, dense, blood formed elements, cartilage, bone) · 51–52 muscle tissue ·
53–55 neural tissue · 56 organs and systems · 57–58 homeostasis · 59–62 negative and
positive feedback (temperature, blood clotting). Pages 26 and 28 are video links: no rows.

- [ ] **Step 1: Week 1 rows** — Recipe P over pages 2–62, parents `p_cells`, `p_membrane`,
  `p_nucleus`, `p_er`, `p_golgi`, `p_protein`, `p_cycle`, `p_meiosis`, `p_body_org`,
  `p_tissues`, `p_epithelial`, `p_connective`, `p_muscle_t`, `p_neural_t`, `p_organs`,
  `p_homeostasis`, `p_feedback`. Feedback loops are `process` rows chained by `next`
  (receptor → control centre → effector, as the slide words them). Run the check; commit
  `abct2326-leaves-w1.js` alone:

```bash
git add outputs/revision/abct2326-leaves-w1.js
git commit -m "feat(revise): physiology Week 1 cells, tissues and homeostasis as leaves

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

- [ ] **Step 2: List the anatomy tissue rows**

```bash
node -e "import('./outputs/revision/hss2011-data.js').then(async (d)=>{const w1=await import('./outputs/revision/hss2011-leaves-w1.js');const gone=new Set(d.NODES.filter(n=>n.s==='tissue').map(n=>n.id));const out=[];for(const r of w1.ROWS){if(gone.has(r.parent)){gone.add(r.id);out.push(r.id)}}console.log(out.length);console.log(out.join(' '))})"
```

Expected: `60` and their ids (all `w2_tis_*`, from `hss2011-leaves-w1.js` lines 163–232).

- [ ] **Step 3: Move them**

For each of the 60 rows, in order:
- If a Week 1 row you wrote in Step 1 names the same thing (same name, or its singular or
  plural), **do not move the tutorial row**: delete it from `hss2011-leaves-w1.js`. One row
  per thing, and the Lecture 1 row (week 1) wins. Its children, if any, move with
  `parent` set to your Lecture 1 row. List each such pair in the notes file.
- Otherwise cut it from `hss2011-leaves-w1.js` and paste it into
  `abct2326-leaves-tissues.js` `ROWS`, with: `parent` changed to the physiology topic or
  row it belongs under (`tissues` → `p_tissues`, `epithelium` → `p_epithelial`,
  `connective` → `p_connective`, `junctions` → `p_cells`, and a row's own `w2_tis_*`
  parents unchanged); `w` set to the week of its source (`hss.tut.tissues` 2,
  `hss.w1.2026` 1); every `links` entry whose target is an anatomy id (`w6_bbbarrier`,
  `w5_elecsyn`, `w1_cartilage`, `bone`, `w1_collagen`, `w1_musfibre`, `w1_fascicle`,
  `w1_perimysium`, `w1_epimysium`, `w1_tendon`, `neuron`, `w1_motorneuron`, `glia`)
  removed and listed in the notes file.
- Copy `TIS` and `ORI` source constants and their `SOURCES` labels into the new file.

Then in `hss2011-leaves-w1.js` remove the link `w2_tis_conn` from `w2_tis_proteoglycans`
(and from `w2_tis_gags` if present): its target has left anatomy. Leave
`dropSystem(…, 'tissue')` in `registry.js` (spec Q10).

- [ ] **Step 4: Own words for the moved rows** — Recipe P step 4 (23 of them had none at
planning time). Run:

```bash
node work/revision-check.mjs | tail -70
```

Expected: `ALL PASS` for both subjects, including `no topic or row is in two subjects` and
`no slide row is written into two subjects`. The HSS2011 leaf count drops by exactly the
number of rows moved or deleted (it was 937 with tissues; anatomy did not show them, so its
map is unchanged).

- [ ] **Step 5: Notes and commit**

Write `docs/superpowers/notes/2026-10-19-physiology-revise-w1.md` (Recipe P step 7, plus
the moved/merged/dropped-link lists), then:

```bash
git add outputs/revision/abct2326-leaves-tissues.js outputs/revision/hss2011-leaves-w1.js docs/superpowers/notes/2026-10-19-physiology-revise-w1.md
git commit -m "feat(revise): the Tissues & cells rows move from anatomy to physiology

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

### Task 11: Week 2 — blood, vessels, heart

**Files:** Modify `outputs/revision/abct2326-leaves-w2.js`; create `docs/superpowers/notes/2026-10-19-physiology-revise-w2.md`.

Source `phys.l2.2026`. Page map: 3 circulatory system · 4–8 blood: plasma, RBCs and WBCs,
platelets · 9–16 vessels: structure, arteries, capillaries and their types, veins ·
17–19 overview, pulmonary and systemic circulations · 20–31 heart structure, wall, cardiac
muscle cells, chambers · 32–38 AV and semilunar valves, their function · 39–55 conducting
system: SA node, pacemaker potential, AV node, AV bundle, Purkinje fibres · 56–58
myocardial action potential · 59–60 refractory periods · 61–63 ECG · 64–68 cardiac cycle,
heart sounds. Pages titled "Figure 20-…" are pictures with a caption: write a row only if
the caption text names a unit.

- [ ] **Step 1: Rows** — Recipe P, parents `p_blood`, `p_plasma`, `p_vessels`, `p_circuits`,
  `p_heart`, `p_valves`, `p_conduction`, `p_myoap`, `p_refractory`, `p_ecg`,
  `p_cardiaccycle`. The conduction pathway is a `next` chain of `part` rows linked by
  `links` (SA node → AV node → AV bundle → Purkinje fibres) in the slide's words; the
  action-potential phases are `process` rows chained by `next`. Values (−90 mV, −40 mV,
  intrinsic rates) go in lines.
- [ ] **Step 2: Own words, check, notes** — Recipe P steps 4–7.
- [ ] **Step 3: Commit**

```bash
git add outputs/revision/abct2326-leaves-w2.js docs/superpowers/notes/2026-10-19-physiology-revise-w2.md
git commit -m "feat(revise): physiology Week 2 blood, vessels and heart as leaves

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

### Task 12: Week 3 — breathing

**Files:** Modify `outputs/revision/abct2326-leaves-w3.js`; create `docs/superpowers/notes/2026-10-19-physiology-revise-w3.md`.

Source `phys.l3.2026`. Page map: 2 learning outcomes (no rows) · 3–8 organisation, trachea,
conducting portion · 9–13 respiratory portion, alveoli, type I and II pneumocytes ·
14–16 external and internal respiration · 17–27 pulmonary ventilation, Boyle's law,
pressure changes · 28–31 mechanics, accessory muscles · 32–39 lung volumes and capacities ·
40–42 gas exchange · 43–54 oxygen transport, haemoglobin saturation and what shifts it ·
55–58 carbon dioxide transport · 59–74 control: respiratory centres, reflexes,
chemoreceptors, arterial PCO2 homeostasis · 75 learning summary (no rows). The
oxyhaemoglobin curves (49, 52, 54) are pictures: write only what their text says.

- [ ] **Step 1: Rows** — Recipe P, parents `p_resp_sys`, `p_resp_portion`, `p_respiration`,
  `p_ventilation`, `p_breathmech`, `p_lungvol`, `p_gasex`, `p_o2`, `p_co2`, `p_respcontrol`.
  A lung volume is a value, not a structure or step: one `group` row for the volumes and
  one `part` row per volume the slide names, its `line` carrying the slide's definition
  and value.
- [ ] **Step 2: Own words, check, notes** — Recipe P steps 4–7.
- [ ] **Step 3: Commit**

```bash
git add outputs/revision/abct2326-leaves-w3.js docs/superpowers/notes/2026-10-19-physiology-revise-w3.md
git commit -m "feat(revise): physiology Week 3 breathing as leaves

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

### Task 13: Week 4 — digestion

**Files:** Modify `outputs/revision/abct2326-leaves-w4.js`; create `docs/superpowers/notes/2026-10-19-physiology-revise-w4.md`.

Source `phys.l4.2026`. Page map: 2–6 organs of the tract and accessory organs · 7–11 layers
· 12–13 movement (peristalsis, segmentation) · 14–18 regulation, neural mechanisms ·
19–20 oral cavity and oesophagus · 21–29 stomach, wall, gastric pits, parietal cells and
H+ · 30–33 cephalic, gastric and intestinal phases · 34–40 small intestine segments, villi
· 41–43 pancreas · 44–47 liver · 48–51 gallbladder and bile · 52–59 coordination of
secretion and absorption (hormones) · 60–63 large intestine · 64–68 digestion of each
nutrient. `Digestion Updated.pdf` is a lab manual: not a source here.

- [ ] **Step 1: Rows** — Recipe P, parents `p_gi_tract`, `p_gi_layers`, `p_gi_move`,
  `p_gi_reg`, `p_oral`, `p_stomach`, `p_gastric_reg`, `p_smallint`, `p_pancreas`, `p_liver`,
  `p_gallbladder`, `p_coord`, `p_largeint`, `p_digestion`. Gastric cells are `cell` rows with
  `makes`; hormones (gastrin, secretin, CCK as the slides name them) are `substance` rows
  with `acts`; the three phases are `process` rows chained by `next`.
- [ ] **Step 2: Own words, check, notes** — Recipe P steps 4–7.
- [ ] **Step 3: Commit**

```bash
git add outputs/revision/abct2326-leaves-w4.js docs/superpowers/notes/2026-10-19-physiology-revise-w4.md
git commit -m "feat(revise): physiology Week 4 digestion as leaves

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

### Task 14: Week 5 — kidney and urine

**Files:** Modify `outputs/revision/abct2326-leaves-w5.js`; create `docs/superpowers/notes/2026-10-19-physiology-revise-w5.md`.

Source `phys.l5.2026`. Page map: 2 kidney function · 3–5 gross structure · 6 micturition
reflex · 7–12 nephron, renal vessels, tubules, glomerular capsule, PCT · 13–16 glomerular
filtration · 17–19 GFR, its regulation, sympathetic effects · 20–26 salt and water
reabsorption, the proximal tubule · 27–30 countercurrent multiplier and exchange ·
31–34 plasma concentration and clearance · 35–38 electrolyte balance, aldosterone, K+ ·
39–43 juxtaglomerular complex, RAAS, renin regulation, macula densa · 44 urinary buffers ·
45–46 Table 26-4 (may be cited as a second page for a structure it lists).

- [ ] **Step 1: Rows** — Recipe P, parents `p_kidneyfn`, `p_urinary`, `p_micturition`,
  `p_nephron`, `p_gfiltration`, `p_gfr`, `p_reabs`, `p_countercurrent`, `p_clearance`,
  `p_electrolyte`, `p_raas`, `p_buffers`. RAAS is a `next` chain of `process` rows with the
  hormones as `substance` rows (`acts`); juxtaglomerular cells are `cell` rows (`makes` renin).
- [ ] **Step 2: Own words, check, notes** — Recipe P steps 4–7.
- [ ] **Step 3: Commit**

```bash
git add outputs/revision/abct2326-leaves-w5.js docs/superpowers/notes/2026-10-19-physiology-revise-w5.md
git commit -m "feat(revise): physiology Week 5 kidney and urine as leaves

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

### Task 15: Week 7 — reproduction

**Files:** Modify `outputs/revision/abct2326-leaves-w7.js`; create `docs/superpowers/notes/2026-10-19-physiology-revise-w7.md`.

Source `phys.l6.2026` (Lecture 6 was given in teaching week 7; week 6 was the quiz). Page
map: 2–11 testis, spermatogenesis, Sertoli cells and their secretions, the sperm ·
12–15 gonadotropins, testosterone and its actions, hormonal control · 16–19 sperm movement,
accessory organs, emission and ejaculation · 20–22 female system, uterus · 23–37 ovarian
cycle: follicles, corpus luteum, follicular phase, ovulation, luteal phase · 38–39 menstrual
phase, the two cycles together · 40–45 fertilization, acrosome reaction · 46–48 cleavage,
blastocyst, implantation · 49–54 extraembryonic membranes, placenta, molecule exchange,
umbilical cord · 55–60 parturition and its stages. Rows' `w` is 7.

- [ ] **Step 1: Rows** — Recipe P, parents `p_spermato`, `p_gonadotropin`, `p_testosterone`,
  `p_male_acc`, `p_female`, `p_uterus`, `p_ovarian`, `p_menstrual`, `p_fert`, `p_implant`,
  `p_placenta`, `p_parturition`. The ovarian phases are `process` rows chained by `next`;
  FSH, LH, testosterone, oestrogen and progesterone (as written) are `substance` rows with
  `acts`. Ids start `p7_`.
- [ ] **Step 2: Own words, check, notes** — Recipe P steps 4–7.
- [ ] **Step 3: Commit**

```bash
git add outputs/revision/abct2326-leaves-w7.js docs/superpowers/notes/2026-10-19-physiology-revise-w7.md
git commit -m "feat(revise): physiology Week 7 reproduction as leaves

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

# Wave 2 — one session, after all of Wave 1 is committed

### Task 16: Links across weeks

**Files:** modify `outputs/revision/abct2326-topics.js` (EDGES) and the leaf files (link fields only).

Rule for every link: add it only if a page **states the relationship in words**, and cite
that page. For a topic link, append `[sourceId, page, 'words on that page naming the far end']`
as the edge's fourth element (the check looks for the third item, else the far topic's
name). For a row link, the reason is the slide's words.

- [ ] **Step 1: Candidates to check** (each only if a page says it):
  W3 oxygen transport rows ↔ W2 red blood cell / haemoglobin rows; W3 pulmonary circuit ↔
  W2 `p_circuits`; W5 GFR regulation and sympathetic effects ↔ W2 vessels / blood pressure
  rows; W5 RAAS ↔ W2 plasma volume; W1 negative feedback ↔ W3 PCO2 homeostasis, W5 renin
  regulation ("Neg. feedback control", L5 p42), W7 hormonal control of spermatogenesis;
  W1 positive feedback ↔ W7 parturition; W1 epithelial tissue rows ↔ W3 alveolar, W4
  mucosa, W5 tubule rows; W1 meiosis ↔ W7 spermatogenesis and follicle rows; W4 capillaries
  of villi ↔ W2 capillary types.
- [ ] **Step 2: Check and commit**

```bash
node work/revision-check.mjs | tail -45
git add outputs/revision/abct2326-topics.js outputs/revision/abct2326-leaves-w1.js outputs/revision/abct2326-leaves-w2.js outputs/revision/abct2326-leaves-w3.js outputs/revision/abct2326-leaves-w4.js outputs/revision/abct2326-leaves-w5.js outputs/revision/abct2326-leaves-w7.js
git commit -m "feat(revise): physiology links across weeks, each on a page that states it

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

(Stage only files you changed.) Expected `ALL PASS`. Write the links not added in
`docs/superpowers/notes/2026-10-19-physiology-revise-links.md` and add it to the commit.

### Task 17: Threads, Tables, Decoder, Tours

**Files:** modify `outputs/revision/abct2326-fragments.js`, `outputs/revision/registry.js` (delete one line).

- [ ] **Step 1: Threads.** In `THREADS`, write up to four threads from the spec (oxygen from
air to cell; blood pressure and volume; feedback loops; a meal), ids `t1`…`t4`. Each step:

```js
{ wk: 3, hd: 'Ventilation.', text: 'the slide\'s words, at most 25 words', src: ['phys.l3.2026', 17], match: 'a phrase on that page' },
```

Steps in the order of the process, not of the weeks. No step without a page; no stars.

- [ ] **Step 2: Tables.** In `TABLES`: `tb-hormones` (head `['Hormone', 'Made by', 'Acts on', 'Effect']`,
one row per hormone the W4, W5 and W7 slides name with those facts) and `tb-values`
(head `['What', 'Value', 'Lecture']`, one row per number a slide gives: GFR, resting and
threshold potentials, volumes). Each row has `wk`, `cells`, `src`, `match`.
- [ ] **Step 3: Decoder.** In `DECODER`, list `{ term, wk }` for row labels of 7+ letters.
For each, run
`node -e "import('./outputs/wordparts.js').then(m=>console.log(JSON.stringify(m.decompose('<word>'))))"`
and keep the term only if every part's meaning fits the word (drop wrong splits such as
`oxy-` = "rapid" in oxyhemoglobin); list dropped terms in the links notes file.
- [ ] **Step 4: Tours.** `TOURS = [{ th: 't1', stops: [topic ids in thread order] }, …]`, stops are topic ids.
- [ ] **Step 5: Require them.** In `outputs/revision/registry.js` delete the ABCT2326 lines
`/* the Threads, Tables and Decoder tabs are hidden until plan Task 17 fills them */` and
`requireFragments: false,`.
- [ ] **Step 6: Check and commit**

```bash
node work/revision-check.mjs | tail -45
node work/revise-pure-check.mjs | tail -2
git add outputs/revision/abct2326-fragments.js outputs/revision/registry.js docs/superpowers/notes/2026-10-19-physiology-revise-links.md
git commit -m "feat(revise): physiology threads, tables, decoder and tours, every step on its slide

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

Expected: `ALL PASS`, including `every thread step and table row is on the page it cites`.

### Task 18: Wave 2 in the browser

- [ ] Re-run Task 9 Steps 2–3. Also: Threads, Tables and Decoder tabs now show for
Physiology; at W3 a thread hides its W5 and W7 steps and says how many come later; the
Decoder filter works; Brain 3D Tour plays a physiology tour. No commit unless a fix was needed.

---

# Wave 3 — one session

### Task 19: Glosses and the shell

- [ ] **Step 1:** `git diff outputs/term-gloss.js` (stop if hunks are not yours). Run
`node work/gloss-coverage-check.mjs`; for each underlined word from the physiology rows with
no gloss add `word: ['Plain meaning in one line.', '繁體中文'],` in the whole-words section,
restating what the slide says, no new clinical content. Re-run until `ALL PASS`.
- [ ] **Step 2:** bump `CACHE_VERSION` in `outputs/sw.js` by one (the data files changed).
- [ ] **Step 3: Commit**

```bash
git add outputs/term-gloss.js outputs/sw.js
git commit -m "chore(revise): glosses for the physiology rows; new cache version

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

### Task 20: The whole check set, records, and the owner

- [ ] **Step 1: Run everything `pages.yml` runs, plus the rest of the after-every-edit list**

```bash
node work/pages-workflow-check.mjs
node work/load-check.mjs
node work/syntax-check.mjs
node work/revision-check.mjs
node work/revise-pure-check.mjs
node work/today-navigation-check.mjs
node work/shell-check.mjs
node work/binding-check.mjs
node work/search-probe.mjs
node work/region-probe.mjs
node work/system-check.mjs
node work/data-index-check.mjs
node work/schedule-check.mjs
node work/limb-check.mjs
node work/cut-level-check.mjs
node work/build-bone-landmarks.mjs --check
node work/bone-landmark-check.mjs
node work/source-check.mjs
node work/bridge-check.mjs
node work/gloss-coverage-check.mjs
node work/text-size-check.mjs
node work/codemap.mjs
node work/codemap-check.mjs
node work/baseline.mjs --check
```

Expected: all pass. Before `codemap.mjs`, `git status --short` for files you did not touch
(another session's unfinished work would be swept in; stop and ask if so). `baseline --check`
may differ on `ui-strings` (the subject buttons, the new own-words label, physiology rows)
and `gloss-coverage-check`: diff each against `work/baselines/`, read every line, and only
if all are this plan's run `node work/baseline.mjs` and stage the files you read.

- [ ] **Step 2: Browser** — Task 9 Steps 2–3 once more, after clearing the service worker.

- [ ] **Step 3: Records** (keep each file's line endings):
- `outputs/README.md`, Revise section: physiology in Revise (leaf count from
  `revision-check`), the five decks taken through intake, the image-only lists and links
  not added (collected from `docs/superpowers/notes/2026-10-19-physiology-revise-*.md`),
  the tissue rows moved, the one new anatomy own sentence (`w2_j_hip`), and the legend
  change for anatomy.
- `CLAUDE.md` principle 0: replace "Only HSS2011 has revision data so far." with "HSS2011
  and ABCT2326 (Weeks 1 to 7) have revision data; Revise has a subject switch." and add
  `rules.js` and `fragments.js` to the `outputs/revision/` row of the Layout table, and
  `node work/pages-workflow-check.mjs` to the after-every-edit list.
- `docs/TRAPS.md`, "Revise": (1) system colours come from the registry and are written as
  CSS variables by `applySubject()`; a key unique across subjects; never re-add static
  legend spans. (2) Physiology own words live on the row (`own`), anatomy's in
  `own-words.js`; no digits in own words. (3) A subject written from scratch keeps
  fragments as data (`fragments.js`), and `requireFragments: false` hides its tabs.

- [ ] **Step 4: Commit and stop**

```bash
git add docs/CODEMAP.md outputs/README.md CLAUDE.md docs/TRAPS.md work/baselines/ui-strings.txt work/baselines/gloss-coverage-check.txt
git commit -m "docs(revise): record physiology in Revise; code map and baselines

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

(Stage only files that changed, after `git diff` on each.) **Do not push.** Tell the owner
it is committed locally, show the 390 × 844 screenshot, and ask before pushing `master`.

---

## After this plan

Weeks 8 (endocrine), 9 and 11 (nervous, muscle) and 12–13 (immune) follow the same Recipe P
once each lecture is given (spec Q1): intake as `phys.l7.2026` …, a new leaf file, the new
systems from spec 4.3 (`p_endo`, `p_nerve`, `p_musc`, `p_immune`, already checked for
colour), their topics, `deckWeek` entries, SHELL lines and a `CACHE_VERSION` bump.
