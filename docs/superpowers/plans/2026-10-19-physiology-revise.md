# ABCT2326 Human Physiology Revise map — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Revise gets a subject switch and an ABCT2326 Human Physiology map for the whole
term (Weeks 1–13, all ten 2026 lecture decks) with the depth HSS2011 has (week-gated topics,
one-line rows read off the slides, linked rows, the 3D hub, threads, tables, decoder);
anatomy's tissue rows merge into physiology Lecture 1; boxes about the same thing in the two
subjects link to each other; every one of the owner's standing rules is enforced by a check
rather than by memory.

**Architecture:** The view code is made subject-neutral: body-system colours, hub order and
a few words move from hard-coded anatomy maps into the registry entry; the owner's rules
become pure functions in `outputs/revision/rules.js`, used by both the app and
`work/revision-check.mjs`. Physiology data is new files only (`abct2326-*.js`), with
sourced topics, new leaf kinds (cell, substance, process) and structured, sourced
fragments rendered by `outputs/revision/fragments.js`; cross-subject links live in
`outputs/revision/cross-links.js`.

**Tech Stack:** Plain HTML + vanilla ES modules (no build, no framework), Node 22+ for the
`work/` checks, `pdftotext` for source intake, the Browser pane for the visual checks.

**Spec:** `docs/superpowers/specs/2026-10-19-physiology-revise.md` (read it first; its
section 8 records the owner's answers of 19 October 2026, which this plan follows; nothing
is open. If the owner later says otherwise, follow the owner).

---

## Waves (what can run at the same time)

| Wave | Tasks | Sessions | Files it may touch |
| --- | --- | --- | --- |
| 0 | 1–9 | one session, in order | shared files: `course-data.js`, `source-text.json`, `source-catalogue.json`, `leaves.js`, `hub.js`, `registry.js`, `revise.js`, `revise-brain.js`, the HTML, `app.css`, `sw.js`, `pages.yml`, `hss2011-threads.js` (five `data-wk`), both checks; creates `rules.js`, `fragments.js`, `abct2326-topics.js`, the ten empty leaf stubs, `abct2326-fragments.js`, `cross-links.js`, `pages-workflow-check.mjs`, `revise-browser-check.js` |
| 1 | 10–19 | up to ten parallel sessions, one task each | each task ONLY its own `outputs/revision/abct2326-leaves-wN.js` and its own `docs/superpowers/notes/2026-10-19-physiology-revise-wN.md`; Task 10 also `abct2326-leaves-tissues.js`, `cross-links.js`, `hss2011-data.js`, `hss2011-leaves-w1.js`, `hss2011-leaves-w8.js`, `registry.js` (the `dropSystem` lines), `leaves.js` and `revise-pure-check.mjs` (`dropSystem` out) |
| 2 | 20–22 | one session | the leaf files (link fields only), `abct2326-topics.js` (EDGES), `cross-links.js`, `abct2326-fragments.js`, `registry.js` (one flag) |
| 3 | 23–24 | one session | `term-gloss.js`, `sw.js`, docs, baselines |

A Wave-1 session that sees another task's file changed in `git status` leaves it alone.
Wave 2 starts only when all ten Wave-1 tasks are committed.

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
  child of the same name. From the owner's answers (spec section 8): every lecture of the
  term is built now; lecture decks in iCloud `Human Physology` are the only sources (no
  labs, no tutorials except the merged tissue tutorial, no old decks); ★ textbook facts only
  in thread steps, cited to a Martini page; every thread has a 廣東話 line; decoder readings
  are reviewed and frozen; tissues are physiology's, week 1.
- **The Browser pane caches modules in a service worker.** Before testing an edit there, run
  in `javascript_tool`:
  `(async () => { for (const r of await navigator.serviceWorker.getRegistrations()) await r.unregister(); for (const k of await caches.keys()) await caches.delete(k); return 'cleared'; })()`
  then navigate to the page twice.

## File structure

| File | Status | Responsibility |
| --- | --- | --- |
| `outputs/study/course-data.js` | modify | Registers eight 2026 physiology decks (Task 1) |
| `work/source-catalogue.json`, `work/source-text.json` | regenerate | Their catalogue entries and page text (Task 1) |
| `outputs/revision/rules.js` | create | The owner's rules as pure functions (Task 2) |
| `outputs/revision/leaves.js` | modify | Kinds cell, substance, process; fields acts, makes, next, own; `topicNodes()` (Task 3); `dropSystem` deleted (Task 10) |
| `outputs/revision/hub.js` | modify | Hub grouping order as a parameter (Task 3) |
| `outputs/revision/fragments.js` | create | `renderThreads` (★, 廣東話), `renderTables`, `renderDecoder`, `decoderReading`, `decoderProblems` (Task 4) |
| `work/revise-pure-check.mjs` | modify | Tests for Tasks 2–4; `dropSystem` tests out (Task 10) |
| `work/revision-check.mjs` | modify | Rules for every subject, new guards (Task 5) |
| `work/pages-workflow-check.mjs` | create | Every script `pages.yml` runs exists (Task 5) |
| `.github/workflows/pages.yml` | modify | Runs the new check (Task 5) |
| `outputs/revision/abct2326-topics.js` | create | 147 physiology topics, tree, topic links (Task 6, Task 20) |
| `outputs/revision/abct2326-leaves-w1.js`, `-w2`, `-w3`, `-w4`, `-w5`, `-w7`, `-w8`, `-w9`, `-w11`, `-w12`, `-tissues.js` | create (empty, Task 6), fill (Tasks 10–19) | Leaf rows per deck (a split deck's file is named by its first week) |
| `outputs/revision/abct2326-fragments.js` | create (empty, Task 6), fill (Task 21) | Threads, tables, decoder terms, tours |
| `outputs/revision/cross-links.js` | create (empty, Task 6), fill (Tasks 10, 20) | Links between a physiology box and an anatomy box |
| `outputs/revision/registry.js` | modify | `systems`, `hubOrder`, `copy` for HSS2011 (Task 5); the ABCT2326 entry (Task 6); the `dropSystem` call out (Task 10) |
| `outputs/revision/hss2011-data.js`, `hss2011-leaves-w1.js`, `hss2011-leaves-w8.js` | modify (Task 10) | The tissue topics, rows and links leave anatomy |
| `outputs/revision/hss2011-threads.js` | modify (Task 7) | `data-wk` on the five 廣東話 lines |
| `outputs/study/revise.js` | modify | Subject switch, systems from the registry, legend, viewer gating, own label, cross links, 廣東話 gating (Task 7) |
| `outputs/study/revise-brain.js` | modify | Colours and hub order from the subject (Task 7) |
| `outputs/radiography-study-studio.html`, `outputs/app.css` | modify | Subject control, legend emptied (Task 7) |
| `outputs/sw.js` | modify | SHELL entries, `CACHE_VERSION` (Task 8, Task 23) |
| `work/revise-browser-check.js` | create | Rules 2, 3, 6, 7, cross links and the subject switch in a real page (Task 9) |
| `docs/superpowers/notes/2026-10-19-physiology-revise-w*.md` | create (Tasks 10–19) | Each deck's image-only list and links not added |
| `outputs/README.md`, `CLAUDE.md`, `docs/TRAPS.md`, `docs/CODEMAP.md`, `work/baselines/*` | modify (Task 24) | Records |

---

# Wave 0 — one session, in order

### Task 1: Source intake of the eight lecture decks not yet registered

The standing workflow is `docs/superpowers/specs/2026-09-10-new-source-intake-workflow.md`;
its study-item steps are obsolete (the app no longer tests), so only registration,
catalogue, text and the checks apply. Already registered with cached text: Lecture 1
`phys.1.2026` (62 pages), the Immune deck `phys.10.2026` (71) and the tissue tutorial
`hss.tut.tissues` (24). The owner's rule (spec section 8, answers 2 and 3): lecture decks in
iCloud `Human Physology` only.

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
node work/query.mjs file "ABCT2326 Endocrine System"
node work/query.mjs file "ABCT2326 Nervous system"
node work/query.mjs file "ABCT2326 Muscle"
grep -n "phys.l[2-9].2026" outputs/study/course-data.js
```

Expected: each file is in iCloud `Human Physology`; the grep prints nothing. `ABCT2326 Muscle.pdf`
is ALSO an old deck on `E:` (`phys.muscle.deck`, root `mls18`); the new id must mean the
iCloud copy, which Step 4 proves. If any is already registered under a 2026 id, use that id
below instead of registering it again.

- [ ] **Step 2: Register them**

Insert directly after the `'phys.1.2026': {…},` line (same `root` and `folder` as
`phys.1.2026` and `phys.10.2026`, the iCloud decks already registered):

```js
  'phys.l2.2026': { file: 'ABCT2326 Cardiovascular System.pdf', subject: 'ABCT2326', root: 'newsrc', folder: '', kind: 'primary', note: 'Lecture 2 (Week 2 Cardiovascular System), Martini Ch 19-21, 68 pages: composition of blood, blood vessels, pulmonary and systemic circulations, structure of the heart and its valves, the conducting system (SA node, AV node, AV bundle, Purkinje fibres), pacemaker and myocardial action potentials, refractory periods, the ECG and the cardiac cycle.' },
  'phys.l3.2026': { file: 'ABCT2326 Respiratory System.pdf', subject: 'ABCT2326', root: 'newsrc', folder: '', kind: 'primary', note: 'Lecture 3 (Week 3 Respiratory System), Martini Ch 23, 75 pages: organisation of the respiratory system, the respiratory portion, external and internal respiration, pulmonary ventilation and Boyle\'s law, mechanics of breathing, lung measurements, gas exchange, oxygen and carbon dioxide transport, and the control of respiration.' },
  'phys.l4.2026': { file: 'ABCT2326_L4 -Digestive.pdf', subject: 'ABCT2326', root: 'newsrc', folder: '', kind: 'primary', note: 'Lecture 4 (Week 4 Digestive System), Martini Ch 24, 68 pages: the digestive tract and its layers, movement and regulation, oral cavity, stomach and the regulation of gastric activity, small intestine, pancreas, liver, gallbladder, coordination of secretion and absorption, large intestine, digestion.' },
  'phys.l5.2026': { file: 'ABCT2326 Renal System 2019.pdf', subject: 'ABCT2326', root: 'newsrc', folder: '', kind: 'primary', note: 'Lecture 5 (Week 5 Renal System), Martini Ch 26, 46 pages. Named 2019 but filed with the 2026 decks in the iCloud subject folder, so it is the deck used (owner, 19 Oct 2026). Kidney function, urinary system and micturition reflex, nephron, glomerular filtration and GFR, reabsorption of salt and water, countercurrent multiplier and exchange, renal clearance, electrolyte balance, aldosterone, renin-angiotensin-aldosterone system, urinary buffers.' },
  'phys.l6.2026': { file: 'ABCT2326 Reproduction(1).pdf', subject: 'ABCT2326', root: 'newsrc', folder: '', kind: 'primary', note: 'Lecture 6 (Week 7 Reproductive System), Martini Ch 28-29, 60 pages: spermatogenesis and Sertoli cells, gonadotropin secretion and testosterone, male accessory organs, the female reproductive system, ovarian and menstrual cycles, fertilization, implantation, placenta and parturition.' },
  'phys.l7.2026': { file: 'ABCT2326 Endocrine System.pdf', subject: 'ABCT2326', root: 'newsrc', folder: '', kind: 'primary', note: 'Lecture 7 (Week 8 Endocrine System), Martini Ch 18, 55 pages: what a hormone is, classes of hormone delivery, endocrine glands, chemical classes, prohormones, the nervous and endocrine systems compared, mechanisms of hormone action (nuclear receptors, G-protein coupled receptors, tyrosine kinase receptors), the pituitary and its hypothalamic and feedback control, adrenal, thyroid and its diseases, parathyroid, islets of Langerhans, pineal, sex hormones, autocrine and paracrine regulation.' },
  'phys.l8.2026': { file: 'ABCT2326 Nervous system.pdf', subject: 'ABCT2326', root: 'newsrc', folder: '', kind: 'primary', note: 'Lecture 8 (Week 9 Nervous System, continued in Lecture 9, Week 11), Martini Ch 12, 66 pages, 22 of them figures only: CNS and PNS, neuron classes and structure, glial cells and myelin, resting membrane potential and ion gating, the action potential, all-or-none law, refractory periods, conduction and saltatory conduction, electrical and chemical synapses, acetylcholine and acetylcholinesterase, graded potentials, EPSPs and IPSPs, sympathetic pathways, nicotinic, muscarinic and adrenergic receptors.' },
  'phys.l9.2026': { file: 'ABCT2326 Muscle.pdf', subject: 'ABCT2326', root: 'newsrc', folder: '', kind: 'primary', note: 'Lectures 9 and 10 (Weeks 11 and 12, Musculoskeletal), Martini Ch 10, 70 pages. The 2026 iCloud copy, not the old deck of the same name (phys.muscle.deck). Properties and classes of muscle, skeletal muscle and fibre structure, sarcomeres, sliding filament theory and cross bridges, control of contraction, excitation-contraction coupling at the neuromuscular junction, relaxation, motor units, energy use, VO2 max, lactate threshold, oxygen debt, fibre types, fatigue, training, repair and ageing, neural control, muscle spindles and tendon reflexes, then bone structure, bone cells and remodelling.' },
```

- [ ] **Step 3: Catalogue, text and the source check**

```bash
for f in "ABCT2326 Cardiovascular System.pdf" "ABCT2326 Respiratory System.pdf" "ABCT2326_L4 -Digestive.pdf" "ABCT2326 Renal System 2019.pdf" "ABCT2326 Reproduction(1).pdf" "ABCT2326 Endocrine System.pdf" "ABCT2326 Nervous system.pdf" "ABCT2326 Muscle.pdf"; do node work/build-source-catalogue.mjs --add-file "$USERPROFILE/iCloudDrive/Human Physology/$f"; done
for r in phys.l2.2026 phys.l3.2026 phys.l4.2026 phys.l5.2026 phys.l6.2026 phys.l7.2026 phys.l8.2026 phys.l9.2026; do node work/build-source-text.mjs --ref $r; done
node work/source-check.mjs | tail -3
```

Expected: `source-check` passes.

- [ ] **Step 4: Prove the text is the 2026 copy and the page counts match**

```bash
node -e "const s=JSON.parse(require('fs').readFileSync('work/source-text.json','utf8')).sources;for(const k of ['phys.1.2026','phys.l2.2026','phys.l3.2026','phys.l4.2026','phys.l5.2026','phys.l6.2026','phys.l7.2026','phys.l8.2026','phys.l9.2026','phys.10.2026','hss.tut.tissues'])console.log(k,s[k]?s[k].pages.length:'MISSING')"
node work/query.mjs pages phys.l5.2026 40
node work/query.mjs pages phys.l7.2026 47
node work/query.mjs pages phys.l9.2026 65
```

Expected counts `62 68 75 68 46 60 55 66 70 71 24`; page 40 of `phys.l5.2026` shows
"Renin-Angiotensin-Aldosterone System"; page 47 of `phys.l7.2026` shows "Islets of
Langerhans"; page 65 of `phys.l9.2026` shows "Structural Features of Human Bone" (read off
the 2026 iCloud copies while planning, so they fingerprint them). If a count or page
differs, **stop and report**: the text was taken from another copy.

- [ ] **Step 5: Commit**

```bash
git status --short
node work/syntax-check.mjs | tail -1
git add outputs/study/course-data.js work/source-catalogue.json work/source-text.json
git commit -m "chore(sources): register and cache the 2026 physiology lecture decks for weeks 2 to 12

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
import { checkSystems, colourDistance, contrast, crossFor, legendKeys, lineIsUseful, needsOwn, ownProblems, rowWeekOk, starProblems, viewerEligible, yueProblems } from '../outputs/revision/rules.js';
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
ok(ownProblems('An enzyme released by the kidney ★ that starts a chain.', 'Renin').some((p) => p.startsWith('a star')), 'no stars in own words: a ★ fact belongs on a thread step with its page');
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
const sessions = [{ subject: 'S', week: 2, kind: 'lecture' }, { subject: 'S', week: 6, kind: 'tutorial' }, { subject: 'S', week: 9, kind: 'lecture' }, { subject: 'S', week: 11, kind: 'lecture' }, { subject: 'T', week: 10, kind: 'lecture' }];
const decks = { d2: { weeks: [2] }, d6: { weeks: [6] }, d9: { weeks: [9, 11] } };
ok(rowWeekOk({ w: 2, src: ['d2', 1] }, decks, sessions, 'S') === '', 'a row in its deck\'s week passes');
ok(rowWeekOk({ w: 3, src: ['d2', 1] }, decks, sessions, 'S').includes('deck weeks'), 'a row in another week fails');
ok(rowWeekOk({ w: 2, src: ['zz', 1] }, decks, sessions, 'S').includes('not one of'), 'a source that is not one of the decks fails (labs, tutorials, old decks)');
ok(rowWeekOk({ w: 6, src: ['d6', 1] }, decks, sessions, 'S').includes('no S lecture'), 'a week with only a tutorial is not a lecture week');
ok(rowWeekOk({ w: 11, src: ['d9', 1] }, decks, sessions, 'S') === '' && rowWeekOk({ w: 10, src: ['d9', 1] }, decks, sessions, 'S') !== '', 'a deck taught over two lectures allows either week and nothing between');
const cx = [{ a: ['A', 'x'], b: ['B', 'y'], why: 'w', src: ['s', 1], match: 'w' }];
const fw = (s, id) => ({ 'A|x': 1, 'B|y': 8 }[`${s}|${id}`] ?? null);
ok(crossFor(cx, 'A', 'x', 8, fw).map((c) => `${c.subject}:${c.id}:${c.why}`).join() === 'B:y:w', 'a cross-subject link shows its far end and reason');
ok(crossFor(cx, 'B', 'y', 8, fw)[0].id === 'x', 'from either end');
ok(crossFor(cx, 'A', 'x', 7, fw).length === 0, 'not before the far end is taught');
ok(crossFor(cx, 'A', 'z', 8, fw).length === 0 && crossFor([{ ...cx[0], b: ['B', 'gone'] }], 'A', 'x', 8, fw).length === 0, 'nothing for another box, or for a far end that does not exist');
ok(yueProblems('', ['a']).join() === 'missing', 'a thread needs its 廣東話 line');
ok(yueProblems('肺 → 血（hemoglobin）→ 細胞', ['Oxygen binds hemoglobin in the lungs']).length === 0, "a retelling that uses the steps' own English words passes");
ok(yueProblems('肺 → 血（myoglobin）', ['Oxygen binds hemoglobin']).some((p) => p.includes('myoglobin')), 'an English word the steps never used fails');
ok(yueProblems('每分鐘 125 ml', ['GFR is 120 ml/min']).some((p) => p.includes('125')), 'a number the steps never gave fails');
ok(yueProblems('Oxygen binds hemoglobin', ['Oxygen binds hemoglobin']).includes('no Chinese'), 'it is Cantonese');
ok(starProblems({ text: 'Each hemoglobin molecule can carry four oxygen molecules.', page: 812, ch: 23 }, [23]).length === 0, "a ★ fact with a page from the lecture's chapter passes");
ok(starProblems({ text: 'Each hemoglobin molecule can carry four oxygen molecules.', page: 812, ch: 19 }, [23]).some((p) => p.startsWith('chapter')), "a ★ from a chapter the lecture is not built on fails");
ok(starProblems({ text: 'Each hemoglobin molecule can carry four oxygen molecules.', ch: 23 }, [23]).includes('no textbook page'), 'a ★ needs its page');
ok(starProblems({ text: 'Short', page: 1, ch: 23 }, [23]).some((p) => p.startsWith('text')), 'a ★ is one real sentence');
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
 * may not carry a number (numbers come from a slide line) or a star (a ★
 * textbook fact sits on a thread step with its page), and must be a real
 * sentence about the row.
 */
export function ownProblems(own, label) {
  const s = String(own || '').trim();
  if (!s) return ['missing'];
  const out = [];
  if (s.length < 40) out.push('under 40 characters');
  if (s.length > 220) out.push('over 220 characters');
  if (!s.endsWith('.')) out.push('no full stop at the end');
  if (/\d/.test(s)) out.push('a digit (numbers come only from a slide line)');
  if (/[★*]/.test(s)) out.push('a star (★ facts go on thread steps with their textbook page)');
  if (letters(s) === letters(label)) out.push('only the name');
  return out;
}

/* ---- the owner's answers 6 and 7: 廣東話 lines and ★ facts add nothing unsourced ---- */

/**
 * What is wrong with a thread's 廣東話 line (empty = fine). It retells the
 * thread's own steps, so every English word (three letters or more) and every
 * number in it must already be in one of them.
 */
export function yueProblems(yue, stepTexts) {
  const s = String(yue || '').trim();
  if (!s) return ['missing'];
  const out = [];
  if (s.length > 400) out.push('over 400 characters');
  if (!/[一-鿿]/.test(s)) out.push('no Chinese');
  if (/[★*]/.test(s)) out.push('a star');
  const said = stepTexts.join(' ').toLowerCase();
  const extra = [...new Set((s.match(/[A-Za-z]{3,}|\d+(?:\.\d+)?/g) || []).filter((w) => !said.includes(w.toLowerCase())))];
  if (extra.length) out.push(`not in the steps: ${extra.slice(0, 6).join(', ')}`);
  return out;
}

/**
 * What is wrong with a ★ textbook fact on a thread step (empty = fine): one
 * sentence, a PDF page of the Martini textbook, and a chapter the step's own
 * lecture deck is built on (`chapters`, from the registry's `decks`).
 */
export function starProblems(star, chapters) {
  const st = star || {};
  const t = String(st.text || '').trim();
  const out = [];
  if (t.length < 20 || t.length > 200) out.push('text not 20 to 200 characters');
  if (!t.endsWith('.')) out.push('no full stop at the end');
  if (!Number.isInteger(st.page) || st.page < 1) out.push('no textbook page');
  if (!(chapters || []).includes(st.ch)) out.push(`chapter ${st.ch} is not one the lecture is built on (${(chapters || []).join(', ')})`);
  return out;
}

/* ---- the owner's answer 8: a box can point at the same thing in the other subject ---- */

/**
 * The far ends of the cross-subject links at (subject, id) that are taught by
 * `week`. cross: [{ a: [subject, id], b: [subject, id], why, src, match }];
 * firstWeek(subject, id) is that box's first week, or null when it does not exist.
 */
export function crossFor(cross, subject, id, week, firstWeek) {
  const out = [];
  for (const c of cross || []) {
    const far = c.a[0] === subject && c.a[1] === id ? c.b : c.b[0] === subject && c.b[1] === id ? c.a : null;
    if (!far) continue;
    const w = firstWeek(far[0], far[1]);
    if (w != null && w <= week) out.push({ subject: far[0], id: far[1], why: c.why, src: c.src });
  }
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

/* ---- rule 2: a row is taught in its deck's week, and that week had a lecture ---- */

/**
 * '' when the row's week is right, else why not. `decks` maps each source the
 * subject may cite to { weeks: [the teaching weeks its deck was lectured in] }
 * (two weeks when a deck runs over two lectures). The row's week must be one of
 * them and hold a lecture of `subject`: tutorials, labs and old decks are not
 * sources (owner, 19 Oct 2026).
 */
export function rowWeekOk(row, decks, sessions, subject) {
  const sid = (row.src || [])[0];
  const deck = decks[sid];
  if (!deck) return `source ${sid} is not one of the subject's decks`;
  if (!deck.weeks.includes(row.w)) return `week ${row.w}, deck weeks ${deck.weeks.join('/')}`;
  const held = sessions.some((s) => s.subject === subject && s.week === row.w && s.kind === 'lecture');
  return held ? '' : `no ${subject} lecture in week ${row.w}`;
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

Leave `dropSystem` as it is: Task 10 deletes it, once the tissue rows have left anatomy.

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

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Structured, sourced fragments (`fragments.js`)

**Files:**
- Create: `outputs/revision/fragments.js`
- Test: `work/revise-pure-check.mjs`

- [ ] **Step 1: Write the failing tests**

Add the import `import { decoderProblems, renderDecoder, renderTables, renderThreads } from '../outputs/revision/fragments.js';`
and before the summary line:

```js
console.log('\nfragments');
const fsrc = { 'k.2026': 'K slides' };
ok(renderThreads([], fsrc) === '' && renderTables([], fsrc) === '' && renderDecoder([], () => null) === '', 'nothing to show renders nothing (the tab is then hidden)');
const th = renderThreads([{ id: 't1', title: 'Pressure & volume', steps: [{ wk: 5, hd: 'Filter.', text: 'GFR <125>', src: ['k.2026', 17], match: 'gfr' }, { wk: 2, hd: 'Pump.', text: 'The heart', src: ['k.2026', 3], match: 'heart' }] }], fsrc, 'Intro');
ok(/<details class="thread" id="t1" open>/.test(th) && /<summary>Pressure &amp; volume<small>W2 · W5<\/small><\/summary>/.test(th), 'a thread renders with its weeks in order');
ok((th.match(/<li data-wk="\d+">/g) || []).length === 2 && !/<li>/.test(th), 'every step carries its week');
ok(th.includes('GFR &lt;125&gt;') && th.includes('K slides, p17'), 'step text is escaped and cites its page');
const th2 = renderThreads([{ id: 't2', title: 'X', yue: '甲 → 乙', steps: [{ wk: 3, hd: 'A.', text: 'a', src: ['k.2026', 1], match: 'a', star: { text: 'A sentence from the textbook.', page: 812, ch: 23 } }, { wk: 5, hd: 'B.', text: 'b', src: ['k.2026', 2], match: 'b' }] }], { ...fsrc, 'phys.ebook': 'Martini textbook' }, 'Intro');
ok(th2.includes('A sentence from the textbook. <span class="star">★</span> <span class="rv-src">Martini textbook, p812</span>'), 'a ★ fact shows its star and its textbook page');
ok(/<div class="yue" data-wk="5"><b>廣東話<\/b>甲 → 乙<\/div>/.test(th2), "the 廣東話 line waits for the thread's last week");
const tb = renderTables([{ id: 'tb-h', title: 'Hormones', head: ['Hormone', 'Acts on'], rows: [{ wk: 5, cells: ['Renin', 'angiotensinogen'], src: ['k.2026', 40], match: 'renin' }] }], fsrc, 'Intro');
ok(/<div class="rv-sec"><h3 id="tb-h">Hormones<\/h3>/.test(tb) && /<tr data-wk="5"><td>Renin<\/td>/.test(tb) && !/<tr>\s*<td/.test(tb) && /data-jump="tb-h"/.test(tb), 'a table renders as revise.js expects, every row with a week');
const dz = (w) => (w.toLowerCase() === 'spermatogenesis' ? { word: w, parts: [{ text: 'spermat', kind: 'root', forms: 'spermat/o', means: 'male sex cell' }, { text: 'o', kind: 'link', means: 'joining vowel' }, { text: 'genesis', kind: 'suffix', forms: '-genesis', means: 'production' }] } : null);
const dterm = { term: 'Spermatogenesis', wk: 7, reading: 'spermat/o = male sex cell + -genesis = production' };
const dec = renderDecoder([dterm], dz, 'Intro');
ok(/<table id="dtable">/.test(dec) && /<tr class="grp" data-wk="7">/.test(dec) && dec.includes('spermat/o = male sex cell + -genesis = production') && !/<tr>\s*<td/.test(dec), 'a decoder row shows the parts, grouped by week');
ok(renderDecoder([{ ...dterm, reading: 'spermat/o = seed + -genesis = production' }], dz, 'Intro') === '', 'the app never shows a reading nobody reviewed (and never throws at load)');
ok(decoderProblems([dterm], dz, new Set(['Spermatogenesis'])).length === 0, 'a reviewed reading that still holds passes');
ok(decoderProblems([{ ...dterm, reading: 'spermat/o = seed + -genesis = production' }], dz, new Set(['Spermatogenesis']))[0].includes('changed'), 'a reading that no longer matches the reviewed one fails the check');
ok(decoderProblems([{ term: 'Plasma', wk: 2, reading: '' }], () => null, new Set(['Plasma']))[0].includes('no word-part reading'), 'a term with no reading fails');
ok(decoderProblems([dterm], dz, new Set())[0].includes('not a row or topic'), 'a decoder term is a name on the map');
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

/** The set textbook a ★ fact cites (SOURCE_FILES `phys.ebook`, Martini). Its text is not in this public repo. */
export const STAR_SOURCE = 'phys.ebook';

/**
 * threads: [{ id: 't1', title, yue, steps: [{ wk, hd, text, src: [id, page], match, star? }] }]
 * star: { text, page, ch } — one textbook sentence, shown with ★ and its page (owner, 19 Oct 2026).
 * yue: the 廣東話 retelling; it carries the thread's last week, so it hides until every step is taught.
 */
export function renderThreads(threads, sources = {}, intro = '') {
  if (!threads.length) return '';
  const star = (s) => (s.star ? ` ${esc(s.star.text)} <span class="star">★</span> <span class="rv-src">${esc(sources[STAR_SOURCE] || 'Martini textbook')}, p${s.star.page}</span>` : '');
  const one = (t, i) => {
    const steps = t.steps.map((s) => `  <li data-wk="${s.wk}"><span class="wk">W${s.wk}</span><span class="hd">${esc(s.hd)}</span> ${esc(s.text)} <span class="rv-src">${esc(cite(s.src, sources))}</span>${star(s)}</li>`).join('\n');
    const yue = t.yue ? `\n<div class="yue" data-wk="${Math.max(...t.steps.map((s) => s.wk))}"><b>廣東話</b>${esc(t.yue)}</div>` : '';
    return `<details class="thread" id="${esc(t.id)}"${i === 0 ? ' open' : ''}>\n<summary>${esc(t.title)}<small>${weeksOf(t.steps.map((s) => s.wk))}</small></summary>\n<div class="tbody">\n<ol class="chain">\n${steps}\n</ol>${yue}\n</div>\n</details>`;
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

/** A term's word-part reading from wordparts.js `decompose`: "forms = meaning + …", one group per word. */
export function decoderReading(term, decompose) {
  return term.split(/[\s-]+/).map((w) => decompose(w)).filter(Boolean)
    .map((d) => d.parts.filter((p) => p.kind === 'root' || p.kind === 'prefix' || p.kind === 'suffix').map((p) => `${p.forms || p.text} = ${p.means}`).join(' + '))
    .filter(Boolean).join(' · ');
}

/**
 * What is wrong with the decoder list (empty = fine). terms: [{ term, wk, reading }],
 * `reading` being the one a session checked against the slide's meaning of the word
 * and approved (owner, 19 Oct 2026: "ensure they are correct"). It fails when a term
 * has no reading, when decompose() now gives a different one, or when the term is not
 * a name on the map (`labels`).
 */
export function decoderProblems(terms, decompose, labels) {
  const out = [];
  for (const t of terms) {
    const now = decoderReading(t.term, decompose);
    if (!now) out.push(`${t.term}: no word-part reading`);
    else if (now !== t.reading) out.push(`${t.term}: reading changed (reviewed "${t.reading}", now "${now}")`);
    if (!labels.has(t.term)) out.push(`${t.term}: not a row or topic name`);
  }
  return out;
}

/**
 * terms: [{ term, wk, reading }]; `decompose` is wordparts.js's. A term shows only
 * while its reading is still the reviewed one; anything else is left out here and
 * failed by work/revision-check.mjs, never thrown (this runs as the registry loads).
 */
export function renderDecoder(terms, decompose, intro = '') {
  const good = terms.filter((t) => t.reading && decoderReading(t.term, decompose) === t.reading);
  if (!good.length) return '';
  const byWeek = new Map();
  for (const t of good) {
    if (!byWeek.has(t.wk)) byWeek.set(t.wk, []);
    byWeek.get(t.wk).push(`  <tr data-wk="${t.wk}"><td><b>${esc(t.term)}</b></td><td>${esc(t.reading)}</td></tr>`);
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
   (--rv-c-* line 1409, --c-* line 1441), so anatomy looks as it did. Tissues & cells is not listed: those rows are
   physiology's (hidden by dropSystem below until plan Task 10 moves them). A shared colour across subjects means the
   same body system (rules.js checkSystems). */
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
import { checkSystems, needsOwn, ownProblems, rowWeekOk, starProblems, yueProblems } from '../outputs/revision/rules.js';
import { decoderProblems } from '../outputs/revision/fragments.js';
import { decompose } from '../outputs/wordparts.js';
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
    /* Rule 2 and the owner's answers 2-3: a row cites one of the subject's lecture decks and is in a week that deck
       was lectured (subjects that list their decks). */
    if (subject.decks) {
      const wrong = leafRows.map((r) => [r.id, rowWeekOk(r, subject.decks, SESSIONS, subject.id)]).filter(([, why]) => why);
      ok(!wrong.length, `every row cites a lecture deck and sits in a week it was lectured${wrong.length ? ` — ${wrong.slice(0, 6).map(([id, why]) => `${id}: ${why}`).join('; ')}` : ''}`);
      ok(!leafRows.some((r) => r.old), 'no row leans on an old deck (iCloud lecture decks only)');
    }
```

After the `if (leafRows.length) { … }` block add:

```js
  /* Rule 1 for a subject written from scratch: topics, topic links and fragment steps cite a page that says them. */
  if (subject.sourced) {
    const badTopic = data.NODES.filter((n) => !n.leaf).filter((n) => !onPage(n.src, n.match || n.l)).map((n) => n.id);
    ok(!badTopic.length, `every topic's name is on a page it cites${badTopic.length ? ` (${badTopic.slice(0, 8).join(' ')})` : ''}`);
    const topicWeek = data.NODES.filter((n) => !n.leaf).map((n) => [n.id, rowWeekOk({ w: Math.min(...n.w), src: n.src }, subject.decks, SESSIONS, subject.id)]).filter(([, why]) => why);
    ok(!topicWeek.length, `every topic cites a lecture deck and sits in a week it was lectured${topicWeek.length ? ` — ${topicWeek.slice(0, 6).map(([id, why]) => `${id}: ${why}`).join('; ')}` : ''}`);
    const topicEdges = data.EDGES.filter((e) => !data.NODES.find((n) => n.id === e[0]).leaf && !data.NODES.find((n) => n.id === e[1]).leaf);
    ok(topicEdges.every((e) => Array.isArray(e[3]) && onPage(e[3], e[3][2] || data.NODES.find((n) => n.id === e[1]).l)), 'every topic link cites a page that names its far end');
    /* Rule 5 at branch level: no topic is named like the branch heading above it. */
    const labelOf = new Map(data.NODES.map((n) => [n.id, String(n.l).toLowerCase()]));
    const branchTwins = (data.TREE.kids || []).flatMap((b) => (b.kids || []).filter((k) => k.id && b.label && labelOf.get(k.id) === b.label.toLowerCase()).map((k) => k.id));
    ok(!branchTwins.length, `no topic is named like its branch heading${branchTwins.length ? ` (${branchTwins.join(' ')})` : ''}`);
    const fd = subject.fragmentData || { threads: [], tables: [], decoder: [] };
    const steps = fd.threads.flatMap((t) => t.steps.map((s) => [t.id, s]));
    const tRows = fd.tables.flatMap((t) => t.rows.map((r) => [t.id, r]));
    const badSteps = [...steps, ...tRows].filter(([, s]) => !s.match || !onPage(s.src, s.match)).map(([id, s]) => `${id} "${s.match}"`);
    ok(!badSteps.length, `every thread step and table row is on the page it cites${badSteps.length ? ` (${badSteps.slice(0, 6).join(', ')})` : ''}`);
    ok([...steps, ...tRows].every(([, s]) => Number.isInteger(s.wk) && s.wk >= firstWeekOfSource(s.src)), 'no step or table row is tagged before its source was taught');
    /* The owner's answers 6, 7, 9: ★ facts cite a Martini page of the lecture's chapter; every thread has a 廣東話 line
       that adds no English word or number of its own; every decoder reading is the one a session reviewed. */
    const chOf = (src) => ((subject.decks[(src || [])[0]] || {}).ch || []);
    const badStar = steps.filter(([, s]) => s.star).map(([id, s]) => [id, starProblems(s.star, chOf(s.src))]).filter(([, p]) => p.length);
    ok(!badStar.length, `every ★ fact is one sentence with a textbook page from its lecture's chapter${badStar.length ? ` — ${badStar.slice(0, 4).map(([id, p]) => `${id}: ${p.join(', ')}`).join('; ')}` : ''}`);
    ok(!steps.some(([, s]) => s.star) || !!SOURCE_FILES['phys.ebook'], 'the textbook a ★ cites is a registered source');
    const badYue = fd.threads.map((t) => [t.id, yueProblems(t.yue, t.steps.map((s) => s.text))]).filter(([, p]) => p.length);
    ok(!badYue.length, `every thread's 廣東話 line retells only its steps${badYue.length ? ` — ${badYue.slice(0, 4).map(([id, p]) => `${id}: ${p.join(', ')}`).join('; ')}` : ''}`);
    const decBad = decoderProblems(fd.decoder || [], decompose, new Set(data.NODES.map((n) => n.l)));
    ok(!decBad.length, `every decoder reading is the reviewed one, every term a name on the map${decBad.length ? ` — ${decBad.slice(0, 4).join('; ')}` : ''}`);
  }
```

and above the `for (const subject …)` loop add the helper and the cross-subject checks:

```js
/* Rule 1: `needle` is on one of the cited pages (the same comparison source-check.mjs uses). */
const onPage = (src, needle) => {
  const [sid, ...pages] = src || [];
  const text = SOURCE_TEXT[sid];
  const n = normaliseCitationText(needle);
  return !!text && pages.length > 0 && pages.every((p) => Number.isInteger(p) && p >= 1 && p <= text.pages.length) && pages.some((p) => normaliseCitationText(text.pages[p - 1]).includes(n));
};
/* The week a source's deck was first lectured, from any subject's decks (1 when none says). */
const firstWeekOfSource = (src) => { const sid = (src || [])[0]; for (const s of Object.values(REVISION)) if (s.decks && s.decks[sid]) return s.decks[sid].weeks[0]; return 1; };

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
- Modify: `outputs/revision/registry.js`, `work/revision-check.mjs` (Step 5, the cross-link checks)
- Create: `outputs/revision/abct2326-topics.js`, `abct2326-leaves-w1.js`, `-w2.js`, `-w3.js`, `-w4.js`, `-w5.js`, `-w7.js`, `-w8.js`, `-w9.js`, `-w11.js`, `-w12.js`, `abct2326-leaves-tissues.js`, `abct2326-fragments.js`, `cross-links.js`

- [ ] **Step 1: Write the empty leaf files**

Create each of `outputs/revision/abct2326-leaves-w1.js`, `-w2.js`, `-w3.js`, `-w4.js`, `-w5.js`,
`-w7.js`, `-w8.js`, `-w9.js`, `-w11.js`, `-w12.js` with this content, `N` replaced by its week
(a deck lectured over two weeks is named by the first: `-w9` holds the Nervous deck, `-w11`
Muscle, `-w12` Immune):

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
line reading `ABCT2326 · the Tissues & cells rows merged from anatomy into Lecture 1 (Week 1)`.

Create `outputs/revision/cross-links.js`:

```js
/*
 * Cross-subject links — a box in one subject that is about the same thing as a box
 * in the other (owner, 19 Oct 2026). Shown in the notes panel only, once the far
 * end's week is reached (rules.js crossFor); never drawn on the Map or in Brain 3D.
 *
 *   { a: ['ABCT2326', id], b: ['HSS2011', id], why: 'the slide's words', src: [sourceId, page], match: 'words on that page' }
 *
 * work/revision-check.mjs: both ends exist, the subjects differ, no pair twice, `match` on the page.
 * docs/superpowers/specs/2026-10-19-physiology-revise.md section 4.6.
 */
export const CROSS = [];
```

- [ ] **Step 2: Write the empty fragments file**

`outputs/revision/abct2326-fragments.js`:

```js
/*
 * ABCT2326 Threads, Tables, Decoder and Brain 3D tours, as sourced data.
 * Rendered by outputs/revision/fragments.js; every step and table row cites a page
 * (work/revision-check.mjs holds `match` to it). Filled by plan Task 21.
 */
export const THREADS_INTRO = 'Each thread follows one process across lectures and tags every step with the week it came from. ★ marks a sentence from the Martini textbook chapter the lecture is built on, beyond the slides, with its page. The 廣東話 line retells the thread in Cantonese and shows once every step is taught.';
export const TABLES_INTRO = 'Look-ups that tie the lectures together. Every row names the slide it comes from.';
export const DECODER_INTRO = 'Long words split into their parts, from the app\'s word-part list, each split checked against the word\'s meaning on the slides. Type in the box to filter.';
export const THREADS = [];
export const TABLES = [];
export const DECODER = [];
export const TOURS = [];
export const SOURCES_HTML = '<p class="foot" style="margin-top:12px">Week sources: W1 cells and body organisation · W2 cardiovascular system · W3 respiratory system · W4 digestive system · W5 renal system · W7 reproductive system · W8 endocrine system · W9 nervous system · W11 muscle and bone · W12 immune system (2026 lecture decks). ★ facts: Martini, Fundamentals of Anatomy and Physiology.</p>';
```

- [ ] **Step 3: Write `outputs/revision/abct2326-topics.js`**

Topic labels, pages and `match` words below were checked against the decks' page text
during planning (all 147, with `work/lib/source-lesson-map.mjs normaliseCitationText`, the
comparison the check uses). Add each topic's `line` (or `own`) by Recipe P step 3 below:
the line is what that page's text says about the topic, 12 words or fewer; if the page only
names it, write `own` instead.

```js
/*
 * ABCT2326 Human Physiology — revision topics, the whole term (Weeks 1 to 12).
 *
 * Written like leaf rows (outputs/revision/leaves.js topicNodes): each topic
 * cites the page that names it, and its note is that page's line. Slides only.
 * w = the teaching week of the lecture (outputs/schedule.js); a deck lectured
 * over two weeks starts at the first (spec section 3).
 * EDGES: [a, b, reason, [sourceId, page]] — a topic link must cite a page.
 * docs/superpowers/specs/2026-10-19-physiology-revise.md.
 */
const L1 = 'phys.1.2026';
const L2 = 'phys.l2.2026';
const L3 = 'phys.l3.2026';
const L4 = 'phys.l4.2026';
const L5 = 'phys.l5.2026';
const L6 = 'phys.l6.2026';
const L7 = 'phys.l7.2026';
const L8 = 'phys.l8.2026';
const L9 = 'phys.l9.2026';
const L10 = 'phys.10.2026';

export const SOURCES = {
  [L1]: 'Lecture 1 cells and body organisation slides',
  [L2]: 'Lecture 2 cardiovascular system slides',
  [L3]: 'Lecture 3 respiratory system slides',
  [L4]: 'Lecture 4 digestive system slides',
  [L5]: 'Lecture 5 renal system slides',
  [L6]: 'Lecture 6 reproductive system slides',
  [L7]: 'Lecture 7 endocrine system slides',
  [L8]: 'Lecture 8 nervous system slides',
  [L9]: 'Lectures 9 and 10 muscle slides',
  [L10]: 'Lectures 10 and 11 immune system slides',
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
/* ---------------- Week 8: hormones ---------------- */
{ id: 'p_hormone', l: 'What is a hormone', match: 'What is a Hormone', s: 'p_endo', w: 8, src: [L7, 3] },
{ id: 'p_delivery', l: 'Classes of hormone delivery', s: 'p_endo', w: 8, src: [L7, 5] },
{ id: 'p_endo_glands', l: 'Endocrine glands', s: 'p_endo', w: 8, src: [L7, 7] },
{ id: 'p_hormone_chem', l: 'Chemical classification of hormones', match: 'Chemical Classifications of Hormones', s: 'p_endo', w: 8, src: [L7, 9] },
{ id: 'p_ns_vs_endo', l: 'Nervous and endocrine systems compared', match: 'Comparison of the nervous system and endocrine', s: 'p_endo', w: 8, src: [L7, 11] },
{ id: 'p_hormone_action', l: 'Mechanisms of hormone action', s: 'p_endo', w: 8, src: [L7, 12, 13] },
{ id: 'p_pituitary', l: 'Pituitary gland', s: 'p_endo', w: 8, src: [L7, 24], viewer: true },
{ id: 'p_hypothal', l: 'Hypothalamic control of the pituitary', match: 'Hypothalamic Control of', s: 'p_endo', w: 8, src: [L7, 27, 29] },
{ id: 'p_pit_feedback', l: 'Feedback control of anterior pituitary', s: 'p_endo', w: 8, src: [L7, 31] },
{ id: 'p_adrenal', l: 'Adrenal glands', s: 'p_endo', w: 8, src: [L7, 34], viewer: true },
{ id: 'p_thyroid', l: 'Thyroid gland', s: 'p_endo', w: 8, src: [L7, 39], viewer: true },
{ id: 'p_parathyroid', l: 'Parathyroid glands', s: 'p_endo', w: 8, src: [L7, 44], viewer: true },
{ id: 'p_islets', l: 'Islets of Langerhans', s: 'p_endo', w: 8, src: [L7, 47] },
{ id: 'p_pineal', l: 'Pineal gland', s: 'p_endo', w: 8, src: [L7, 51], viewer: true },
{ id: 'p_sex_hormones', l: 'Sex and reproductive hormones', s: 'p_endo', w: 8, src: [L7, 52] },
{ id: 'p_paracrine', l: 'Autocrine and paracrine regulation', s: 'p_endo', w: 8, src: [L7, 54] },
/* ---------------- Week 9 (and 11): nerves ---------------- */
{ id: 'p_ns', l: 'Nervous system', match: 'What is the nervous system', s: 'p_nerve', w: 9, src: [L8, 2] },
{ id: 'p_cns', l: 'Central nervous system', s: 'p_nerve', w: 9, src: [L8, 4] },
{ id: 'p_neuron_class', l: 'Classification of neurons', s: 'p_nerve', w: 9, src: [L8, 7] },
{ id: 'p_pns', l: 'Peripheral nervous system', s: 'p_nerve', w: 9, src: [L8, 8] },
{ id: 'p_neurons', l: 'Neurons', s: 'p_nerve', w: 9, src: [L8, 10] },
{ id: 'p_glia', l: 'Glial cells', s: 'p_nerve', w: 9, src: [L8, 14] },
{ id: 'p_rmp', l: 'Resting membrane potential', match: 'Membrane Potential', s: 'p_nerve', w: 9, src: [L8, 23] },
{ id: 'p_ion_gating', l: 'Ion gating in axons', s: 'p_nerve', w: 9, src: [L8, 24] },
{ id: 'p_ap', l: 'Action potential', s: 'p_nerve', w: 9, src: [L8, 33] },
{ id: 'p_allornone', l: 'All-or-none law', s: 'p_nerve', w: 9, src: [L8, 36] },
{ id: 'p_n_refractory', l: 'Refractory periods of nerves', match: 'Refractory Periods', s: 'p_nerve', w: 9, src: [L8, 38] },
{ id: 'p_n_conduction', l: 'Conduction of nerve impulses', s: 'p_nerve', w: 9, src: [L8, 40] },
{ id: 'p_saltatory', l: 'Saltatory conduction', s: 'p_nerve', w: 9, src: [L8, 41] },
{ id: 'p_synapses', l: 'Synapses', match: 'types of Synapses', s: 'p_nerve', w: 9, src: [L8, 44] },
{ id: 'p_ach', l: 'Acetylcholine (ACh)', match: 'Acetylcholine', s: 'p_nerve', w: 9, src: [L8, 48] },
{ id: 'p_graded', l: 'Graded potentials', s: 'p_nerve', w: 9, src: [L8, 51] },
{ id: 'p_symp_path', l: 'Sympathetic neuron pathways', s: 'p_nerve', w: 9, src: [L8, 57] },
{ id: 'p_adrenergic', l: 'Adrenergic receptors', s: 'p_nerve', w: 9, src: [L8, 61] },
/* ---------------- Week 11 (and 12): muscle and bone ---------------- */
{ id: 'p_musc_props', l: 'Properties of muscle', s: 'p_musc', w: 11, src: [L9, 5] },
{ id: 'p_musc_class', l: 'Classification of muscle', s: 'p_musc', w: 11, src: [L9, 6] },
{ id: 'p_skm_struct', l: 'Skeletal muscle structure', s: 'p_musc', w: 11, src: [L9, 9] },
{ id: 'p_fibre', l: 'Muscle fibre structure', match: 'Structure of Muscle Fiber', s: 'p_musc', w: 11, src: [L9, 17] },
{ id: 'p_sarcomere', l: 'Sarcomeres', s: 'p_musc', w: 11, src: [L9, 19] },
{ id: 'p_sliding', l: 'Sliding filament theory', s: 'p_musc', w: 11, src: [L9, 21] },
{ id: 'p_crossbridge', l: 'Cross bridge', s: 'p_musc', w: 11, src: [L9, 23] },
{ id: 'p_contr_control', l: 'Control of contraction', s: 'p_musc', w: 11, src: [L9, 26] },
{ id: 'p_ecc', l: 'Excitation-contraction coupling', s: 'p_musc', w: 11, src: [L9, 31] },
{ id: 'p_nmj', l: 'Neuromuscular junction (NMJ)', match: 'Neuromuscular Junction', s: 'p_musc', w: 11, src: [L9, 28] },
{ id: 'p_relax', l: 'Muscle relaxation', s: 'p_musc', w: 11, src: [L9, 37] },
{ id: 'p_motorunit', l: 'Motor unit', s: 'p_musc', w: 11, src: [L9, 38] },
{ id: 'p_musc_energy', l: 'Energy requirements of skeletal muscles', match: 'Energy Requirements of', s: 'p_musc', w: 11, src: [L9, 40] },
{ id: 'p_twitch', l: 'Slow- and fast-twitch fibres', match: 'Fast-Twitch Fibers', s: 'p_musc', w: 11, src: [L9, 47] },
{ id: 'p_fatigue', l: 'Muscle fatigue', s: 'p_musc', w: 11, src: [L9, 51] },
{ id: 'p_training', l: 'Adaptation to training', match: 'Adaptation to', s: 'p_musc', w: 11, src: [L9, 53, 54] },
{ id: 'p_neural_ctrl', l: 'Neural control of skeletal muscles', s: 'p_musc', w: 11, src: [L9, 58] },
{ id: 'p_spindle', l: 'Muscle spindle apparatus', s: 'p_musc', w: 11, src: [L9, 60] },
{ id: 'p_bone_t', l: 'Bone tissue', match: 'Structural Features of Human Bone', s: 'p_musc', w: 11, src: [L9, 65] },
{ id: 'p_remodel', l: 'Remodeling of bone', s: 'p_musc', w: 11, src: [L9, 70] },
/* ---------------- Week 12 (and 13): immunity ---------------- */
{ id: 'p_defense', l: 'Defense mechanisms', s: 'p_immune', w: 12, src: [L10, 5] },
{ id: 'p_innate', l: 'Innate immunity', s: 'p_immune', w: 12, src: [L10, 6] },
{ id: 'p_barriers', l: 'Physical barriers', s: 'p_immune', w: 12, src: [L10, 8] },
{ id: 'p_phagocytes', l: 'Phagocytes', match: 'Classes of Phagocytes', s: 'p_immune', w: 12, src: [L10, 14] },
{ id: 'p_macrophages', l: 'Macrophages', match: 'Types of Macrophages', s: 'p_immune', w: 12, src: [L10, 15] },
{ id: 'p_surveillance', l: 'Immunological surveillance', s: 'p_immune', w: 12, src: [L10, 22] },
{ id: 'p_interferons', l: 'Interferons', s: 'p_immune', w: 12, src: [L10, 27] },
{ id: 'p_complement', l: 'Complement system', s: 'p_immune', w: 12, src: [L10, 30] },
{ id: 'p_inflammation', l: 'Inflammation', s: 'p_immune', w: 12, src: [L10, 37] },
{ id: 'p_fever', l: 'Fever', s: 'p_immune', w: 12, src: [L10, 41] },
{ id: 'p_adaptive', l: 'Adaptive immunity', s: 'p_immune', w: 12, src: [L10, 44] },
{ id: 'p_imm_forms', l: 'Forms of immunity', match: 'Different forms of Immunity', s: 'p_immune', w: 12, src: [L10, 45] },
{ id: 'p_tcells', l: 'T cells', match: 'Major Types of T Cells', s: 'p_immune', w: 12, src: [L10, 50] },
{ id: 'p_mhc', l: 'MHC proteins', match: 'Classes of MHC Proteins', s: 'p_immune', w: 12, src: [L10, 52] },
{ id: 'p_helper', l: 'Helper T cell activation', match: 'Activation of Helper T Cells', s: 'p_immune', w: 12, src: [L10, 60] },
{ id: 'p_bcells', l: 'B cells', match: 'Recruitment of B cells', s: 'p_immune', w: 12, src: [L10, 63] },
{ id: 'p_pathogens', l: 'Defenses against bacterial and viral pathogens', match: 'Defenses against Bacterial and Viral Pathogens', s: 'p_immune', w: 12, src: [L10, 69] },
];

/* Topic links are written by plan Task 20, each citing a page. */
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
  { sys: 'p_gi', label: 'Digestive system', kids: [
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
  { sys: 'p_endo', label: 'Hormones', kids: [
    { id: 'p_hormone', kids: [{ id: 'p_delivery' }, { id: 'p_hormone_chem' }, { id: 'p_hormone_action' }, { id: 'p_paracrine' }] },
    { id: 'p_ns_vs_endo' },
    { id: 'p_endo_glands', kids: [
      { id: 'p_pituitary', kids: [{ id: 'p_hypothal' }, { id: 'p_pit_feedback' }] },
      { id: 'p_adrenal' }, { id: 'p_thyroid' }, { id: 'p_parathyroid' }, { id: 'p_islets' }, { id: 'p_pineal' }, { id: 'p_sex_hormones' }] }] },
  { sys: 'p_nerve', label: 'Nerves', kids: [
    { id: 'p_ns', kids: [{ id: 'p_cns' }, { id: 'p_pns' }] },
    { id: 'p_neurons', kids: [{ id: 'p_neuron_class' }, { id: 'p_glia' }] },
    { id: 'p_rmp', kids: [{ id: 'p_ion_gating' }] },
    { id: 'p_ap', kids: [{ id: 'p_allornone' }, { id: 'p_n_refractory' }, { id: 'p_n_conduction', kids: [{ id: 'p_saltatory' }] }] },
    { id: 'p_synapses', kids: [{ id: 'p_ach' }, { id: 'p_graded' }] },
    { id: 'p_symp_path', kids: [{ id: 'p_adrenergic' }] }] },
  { sys: 'p_musc', label: 'Muscle & bone', kids: [
    { id: 'p_musc_class', kids: [{ id: 'p_musc_props' }] },
    { id: 'p_skm_struct', kids: [{ id: 'p_fibre', kids: [{ id: 'p_sarcomere' }] }] },
    { id: 'p_sliding', kids: [{ id: 'p_crossbridge' }, { id: 'p_contr_control' }, { id: 'p_relax' }] },
    { id: 'p_ecc', kids: [{ id: 'p_nmj' }, { id: 'p_motorunit' }] },
    { id: 'p_musc_energy', kids: [{ id: 'p_twitch' }, { id: 'p_fatigue' }, { id: 'p_training' }] },
    { id: 'p_neural_ctrl', kids: [{ id: 'p_spindle' }] },
    { id: 'p_bone_t', kids: [{ id: 'p_remodel' }] }] },
  { sys: 'p_immune', label: 'Immunity', kids: [
    { id: 'p_defense', kids: [
      { id: 'p_innate', kids: [{ id: 'p_barriers' }, { id: 'p_phagocytes', kids: [{ id: 'p_macrophages' }] }, { id: 'p_surveillance' }, { id: 'p_interferons' }, { id: 'p_complement' }, { id: 'p_inflammation' }, { id: 'p_fever' }] },
      { id: 'p_adaptive', kids: [{ id: 'p_imm_forms' }, { id: 'p_tcells', kids: [{ id: 'p_mhc' }, { id: 'p_helper' }] }, { id: 'p_bcells' }, { id: 'p_pathogens' }] }] }] },
] };
```

- [ ] **Step 4: Wire the registry**

In `outputs/revision/registry.js`: change the header comment's second paragraph to say a
subject also lists its `systems` (legend label, legend colour, Map shade, body), its
`hubOrder` and its `copy`, and that a subject written from scratch sets `sourced: true` and
lists its `decks`. Add imports below the existing ones:

```js
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
import * as abctW8 from './abct2326-leaves-w8.js';
import * as abctW9 from './abct2326-leaves-w9.js';
import * as abctW11 from './abct2326-leaves-w11.js';
import * as abctW12 from './abct2326-leaves-w12.js';
import * as abctFrag from './abct2326-fragments.js';
```

and change the leaves import to one line: `import { dropSystem, mergeLeaves, topicNodes } from './leaves.js';`
(`dropSystem` goes in Task 10).

Add below `HSS2011_SYSTEMS` (Task 5 Step 0):

```js
/* Physiology's groups, one per lecture system (spec 4.3). Cells, heart and muscle share anatomy's colour on purpose:
   same body system (owner, 19 Oct 2026). */
const ABCT2326_SYSTEMS = [
  { key: 'p_cell', label: 'Cells & tissues', col: '#9fb2bb', body: 'cells' },
  { key: 'p_cvs', label: 'Blood & heart', col: '#e879c6', body: 'heart' },
  { key: 'p_resp', label: 'Breathing', col: '#7dd3f0' },
  { key: 'p_gi', label: 'Digestion', col: '#c6d86b' },
  { key: 'p_renal', label: 'Kidney & urine', col: '#f2a65a' },
  { key: 'p_repro', label: 'Reproduction', col: '#b58cf0' },
  { key: 'p_endo', label: 'Hormones', col: '#f5e08a' },
  { key: 'p_nerve', label: 'Nerves', col: '#5b8def' },
  { key: 'p_musc', label: 'Muscle & bone', col: '#e3786b', body: 'muscle' },
  { key: 'p_immune', label: 'Immunity', col: '#4fd1b0' },
];

const ABCT2326_FILES = [abctW1, abctTis, abctW2, abctW3, abctW4, abctW5, abctW7, abctW8, abctW9, abctW11, abctW12];
const ABCT2326_ROWS = ABCT2326_FILES.flatMap((f) => f.ROWS);
const ABCT2326_SOURCES = Object.assign({ 'phys.ebook': 'Martini textbook' }, abct.SOURCES, ...ABCT2326_FILES.map((f) => f.SOURCES));
const ABCT2326_BASE = { NODES: topicNodes(abct.TOPICS, ABCT2326_SOURCES), EDGES: abct.EDGES, TREE: abct.TREE };
```

(The shared muscle red passes `checkSystems` because both entries say `body: 'muscle'`.)
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
    fragmentData: { threads: abctFrag.THREADS, tables: abctFrag.TABLES, decoder: abctFrag.DECODER },
    tours: abctFrag.TOURS,
    /* topics, topic links and fragment steps cite pages (work/revision-check.mjs) */
    sourced: true,
    /* the Threads, Tables and Decoder tabs are hidden until plan Task 21 fills them */
    requireFragments: false,
    /* The only sources a physiology row, topic or step may cite: the lecture decks in iCloud Human Physology
       (owner, 19 Oct 2026: no labs, no tutorials, no old decks), with the teaching weeks each was lectured in
       (outputs/schedule.js; a deck run over two lectures lists both, and its rows start at the first) and the
       Martini chapters it is built on (the only chapters a ★ fact may come from). The tissue tutorial is the one
       tutorial: filed with the physiology decks, merged into Lecture 1, week 1, by the owner's answer. */
    decks: {
      'phys.1.2026': { weeks: [1], ch: [1, 3, 4] },
      'hss.tut.tissues': { weeks: [1], ch: [4] },
      'phys.l2.2026': { weeks: [2], ch: [19, 20, 21] },
      'phys.l3.2026': { weeks: [3], ch: [23] },
      'phys.l4.2026': { weeks: [4], ch: [24] },
      'phys.l5.2026': { weeks: [5], ch: [26] },
      'phys.l6.2026': { weeks: [7], ch: [28, 29] },
      'phys.l7.2026': { weeks: [8], ch: [18] },
      'phys.l8.2026': { weeks: [9, 11], ch: [12] },
      'phys.l9.2026': { weeks: [11, 12], ch: [10] },
      'phys.10.2026': { weeks: [12, 13], ch: [22] },
    },
    systems: ABCT2326_SYSTEMS,
    hubOrder: ['p_cell', 'p_cvs', 'p_resp', 'p_gi', 'p_renal', 'p_repro', 'p_endo', 'p_nerve', 'p_musc', 'p_immune'],
    copy: { name: 'Physiology', leafWords: 'single cells, structures, substances and steps', findHint: 'e.g. renin, SA node' },
  },
```

- [ ] **Step 5: The cross-link checks**

In `work/revision-check.mjs`, add `import { CROSS } from '../outputs/revision/cross-links.js';`
and, in the "across subjects" section added in Task 5, after the `no slide row is written into
two subjects` check:

```js
/* The owner's answer 8: a box can point at the same thing in the other subject (cross-links.js). */
const nodeIn = (sub, id) => !!REVISION[sub] && REVISION[sub].data.NODES.some((n) => n.id === id);
const crossBad = CROSS.filter((c) => !nodeIn(c.a[0], c.a[1]) || !nodeIn(c.b[0], c.b[1]) || c.a[0] === c.b[0]).map((c) => `${c.a.join(':')}-${c.b.join(':')}`);
ok(!crossBad.length, `every cross-subject link joins two real boxes in two subjects${crossBad.length ? ` (${crossBad.slice(0, 6).join(', ')})` : ''}`);
const crossKey = (c) => [c.a.join(':'), c.b.join(':')].sort().join('|');
ok(new Set(CROSS.map(crossKey)).size === CROSS.length, 'no cross-subject link is written twice');
const crossOff = CROSS.filter((c) => !String(c.why || '').trim() || !c.match || !onPage(c.src, c.match)).map(crossKey);
ok(!crossOff.length, `every cross-subject link's reason is on the page it cites${crossOff.length ? ` (${crossOff.slice(0, 6).join(', ')})` : ''}`);
```

(`onPage` is the helper Task 5 put above the subject loop.)

- [ ] **Step 6: Fill the topic lines**

For each topic, run `node work/query.mjs pages <source> <page>` and add `line: '…'` (the
page's own words about it, at most 12 words, no picture labels) or, where the page only
names it, `own: '…'` (rules: Recipe P step 4). 147 topics: budget it as real work. Then:

Run: `node work/revision-check.mjs | tail -80`
Expected: `ALL PASS`, with the new `ABCT2326` block showing
`growth 1:17t/0l  2:28t/0l  3:38t/0l  4:52t/0l  5:64t/0l  6:64t/0l  7:76t/0l  8:92t/0l  9:110t/0l  10:110t/0l  11:130t/0l  12:147t/0l`
(147 topics, no links yet; weeks 6 and 10 add nothing) and `every topic's name is on a page
it cites` and `every topic cites a lecture deck and sits in a week it was lectured` ok. If
a topic's page fails, read the page and fix its `match` or page (the cached text may break
lines differently from the planning copy); do not drop the topic without telling the owner.

- [ ] **Step 7: Commit**

```bash
node work/revise-pure-check.mjs | tail -2
node work/syntax-check.mjs | tail -1
git add outputs/revision/registry.js outputs/revision/abct2326-topics.js outputs/revision/abct2326-leaves-w1.js outputs/revision/abct2326-leaves-w2.js outputs/revision/abct2326-leaves-w3.js outputs/revision/abct2326-leaves-w4.js outputs/revision/abct2326-leaves-w5.js outputs/revision/abct2326-leaves-w7.js outputs/revision/abct2326-leaves-w8.js outputs/revision/abct2326-leaves-w9.js outputs/revision/abct2326-leaves-w11.js outputs/revision/abct2326-leaves-w12.js outputs/revision/abct2326-leaves-tissues.js outputs/revision/abct2326-fragments.js outputs/revision/cross-links.js work/revision-check.mjs
git commit -m "feat(revise): ABCT2326 physiology topics for the whole term; subjects carry their colour groups and decks

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: The view is subject-neutral; the subject switch

**Files:**
- Modify: `outputs/study/revise.js`, `outputs/study/revise-brain.js`
- Modify: `outputs/radiography-study-studio.html` (lines 114–117, 143–152, 156, 183–192)
- Modify: `outputs/app.css` (after line 1412)
- Modify: `outputs/revision/hss2011-threads.js` (five `data-wk`), `work/revision-check.mjs` (one check)

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

Add to the imports: `import { crossFor, legendKeys, viewerEligible } from '../revision/rules.js?v=1';`
and `import { CROSS } from '../revision/cross-links.js?v=1';`

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

- [ ] **Step 3b: `revise.js` — links into the other subject, and the 廣東話 line's week**

Below the `SUBJECT_KEY` line add:

```js
/* The first week a box of any subject is taught, or null when that subject has no such box (rules.js crossFor). */
const firstWeekIn = (sub, nid) => { const n = REVISION[sub] && REVISION[sub].data.NODES.find((x) => x.id === nid); return n ? Math.min(...n.w) : null; };
```

In `renderPanel`, directly after the `h += \`<p class="rv-to3d">…\`;` line, add:

```js
    /* The owner's answer 8: the same thing in the other subject, once its week is reached. Tapping switches subject. */
    const cross = crossFor(CROSS, rv.subject, id, rv.week, firstWeekIn);
    for (const sub of [...new Set(cross.map((c) => c.subject))]) {
      h += `<h4>In ${esc(REVISION[sub].copy.name)}</h4><div class="nlist">`;
      cross.filter((c) => c.subject === sub).forEach((c) => {
        const o = REVISION[sub].data.NODES.find((x) => x.id === c.id);
        h += `<button type="button" class="nbtn" data-cross="${esc(sub)}" data-crossid="${esc(c.id)}"><span>${esc(o.l)}</span><span class="rel">${esc(c.why)}</span></button>`;
      });
      h += '</div>';
    }
```

In `init()`, after the `[data-toviewer]` listener, add:

```js
  /* A link into the other subject: switch to it, at this week if the far box needs it, and open the box. */
  document.addEventListener('click', async (ev) => {
    const b = ev.target.closest && ev.target.closest('[data-cross]'); if (!b) return;
    const week = rv.week;
    setSubject(b.dataset.cross);
    const w = firstWeekIn(b.dataset.cross, b.dataset.crossid);
    if (w != null && w > rv.week) setWeek(week, 'manual');
    showTab('map');
    await ensureMap(); /* the Jump menu's listener lives in the map (createMap) */
    const j = $$('rvJump'); j.value = b.dataset.crossid; j.dispatchEvent(new Event('change'));
  });
```

(the same route the browser check uses to open a box: Task 9).

In `applyWeekToFragments`, inside the `details.thread` loop, after the
`steps.forEach((li) => { … });` line, add:

```js
    /* a 廣東話 line retells the whole thread, so it waits for the thread's last week */
    d.querySelectorAll('.yue[data-wk]').forEach((y) => { y.hidden = Number(y.dataset.wk) > n; });
```

In `outputs/revision/hss2011-threads.js`, give each of the five `<div class="yue">` a
`data-wk` equal to the highest `data-wk` among the `<li>` and `<tr>` of the same
`<details class="thread">` (today they show at every week, before their later steps are
taught: rule 2). Print the numbers first:

```bash
node -e "import('./outputs/revision/hss2011-threads.js').then((m)=>{const h=Object.values(m).find((v)=>typeof v==='string'&&v.includes('class=\"yue\"'));for(const t of h.split('<details').slice(1)){const w=[...t.matchAll(/data-wk=\"(\d+)\"/g)].map((x)=>+x[1]);if(t.includes('class=\"yue\"'))console.log((t.match(/id=\"([^\"]+)\"/)||[])[1],Math.max(...w))}})"
```

and edit each with the Edit tool (`<div class="yue">` → `<div class="yue" data-wk="N">`).
In `work/revision-check.mjs`, inside the subject loop next to the other fragment checks, add:

```js
  ok(!/<div class="yue">/.test(subject.threads || ''), 'every 廣東話 line carries the week it may show from');
```

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
git add outputs/study/revise.js outputs/study/revise-brain.js outputs/radiography-study-studio.html outputs/app.css outputs/revision/hss2011-threads.js work/revision-check.mjs
git commit -m "feat(revise): a subject switch; colours, legend and hub order come from the subject; links into the other subject

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: The shell

**Files:**
- Modify: `outputs/sw.js` (SHELL near lines 197–217; `CACHE_VERSION` line 34)

- [ ] **Step 1: Add the new modules and bump the cache**

After `'./revision/own-words.js?v=1',` add `'./revision/rules.js?v=1',` and
`'./revision/cross-links.js?v=1',`. After `'./revision/hss2011-decoder.js',` add:

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
  './revision/abct2326-leaves-w8.js',
  './revision/abct2326-leaves-w9.js',
  './revision/abct2326-leaves-w11.js',
  './revision/abct2326-leaves-w12.js',
  './revision/abct2326-fragments.js',
```

(`cross-links.js` is imported by `study/revise.js` with `?v=1`; if `shell-check` says the
registry or a check imports it another way, add that specifier too.)

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
// Holds the owner's rules 2, 3, 6 and 7, the subject switch and the links into the other subject in a real page.
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
    report.push({ subject: id, last: st0.last, autoWeek: st0.week, checked: sample.length, viewer: offered });
    rv.setWeek(st0.week, 'auto'); /* hand the subject back to the calendar */
  }
  /* the owner's answer 8: a link into the other subject switches subject and opens the far box (a = ABCT2326 end) */
  const { CROSS } = await import('./revision/cross-links.js?v=1');
  const crossed = [];
  for (const c of CROSS.slice(0, 5)) {
    rv.setSubject(c.a[0]);
    rv.setWeek(rv.reviseState().last, 'manual');
    const jump = document.getElementById('rvJump');
    jump.value = c.a[1]; jump.dispatchEvent(new Event('change'));
    const btn = document.querySelector(`#rvSide [data-cross="${CSS.escape(c.b[0])}"][data-crossid="${CSS.escape(c.b[1])}"]`);
    assert(btn, `cross link ${c.a.join(':')} to ${c.b.join(':')}: no button in the notes`);
    btn.click();
    await until(() => rv.reviseState().subject === c.b[0] && document.getElementById('rvJump').value === c.b[1]);
    crossed.push(`${c.a.join(':')} to ${c.b.join(':')}`);
  }
  for (const r of report) { rv.setSubject(r.subject); rv.setWeek(r.autoWeek, 'auto'); } /* back to the calendar */
  rv.setSubject(Object.keys(REVISION)[0]);
  return { subjects: report, crossed };
}
```

- [ ] **Step 2: Run it**

Start the preview (`preview_start` with name `study-studio`), open
`http://localhost:8420/radiography-study-studio.html`, clear the service worker (see
"Before you start") and navigate twice. Paste the function into `javascript_tool` as
`(async () => { …function body… })()` and run it.

Expected: it returns a report with `HSS2011` (last 8) and `ABCT2326` (last 12: every
lecture is built, the Immune deck starts in week 12). For ABCT2326 the `viewer` list holds
only topics marked `viewer: true` that the viewer's search knows (for example Stomach,
Liver, Pancreas, Thyroid gland). If it throws, fix the cause in the code, not in the check.

- [ ] **Step 3: Look at it at phone and iPad size**

`resize_window` to 390 × 844, then 820 × 1180. In each:

- The Anatomy | Physiology buttons sit above the week chips, at least 44 px tall.
- Physiology, Auto: W1 to W12 chips, Auto on W7; the note says weeks 1–7 are shown (today
  is in week 8). Tap W12: the Hormones, Nerves, Muscle & bone and Immunity branches appear.
- Physiology W1: only "Cells & tissues" in the legend; the Threads, Tables and Decoder tabs are hidden.
- Anatomy W1: the legend shows only what week 1 teaches (no longer five entries before they are taught).
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
that Wave 1 can start (ten sessions, Tasks 10–19).

---

# Wave 1 — one session per week, in parallel

## Recipe P: turning physiology slide pages into rows

Every Wave-1 task runs this recipe with its own parameters.

1. **Read the pages.** `node work/query.mjs pages <source> <from>-<to>`. This text is the
   only content you may use: the task's own 2026 deck, nothing from an older deck, a lab or
   a tutorial (owner, 19 Oct 2026), so no row is `old: true`. Words that are only in a
   picture (graph axes, figure labels with no text on the page) are not written. ★ facts
   and 廣東話 lines are not written in Wave 1 (Task 21 writes them, on threads only).
2. **List what the page teaches as a unit**: a structure or organ region (`part`), a cell
   type (`cell`), a hormone, enzyme, ion, gas or molecule (`substance`), a step, mechanism,
   reflex or phase (`process`), or a heading holding several of these (`group`). Skip
   figure credits, learning outcomes, summaries that only repeat earlier pages, videos,
   questions, and clinical cases.
3. **Write one row per unit** in the task's file, in reading order, parent before child:
   - `id` `p<week>_<short>` (Week 7 rows are `p7_`, the Nervous deck's `p9_`, Muscle's `p11_`,
     Immune's `p12_`), unique: `grep -rn "id: 'p3_x'" outputs/revision/` first.
   - `l` the name as the slide writes it; `match` only when the page words it differently,
     a real fragment of at least 4 characters.
   - `parent` a topic from the task's table, or an earlier row of this file.
   - `w` the task's week: the deck's first lecture week, also for a deck lectured over two
     weeks (spec section 3; `rowWeekOk` fails a week the deck was not lectured in).
   - `src` `[source, page, page…]`, best page first, every page whose text has the name.
   - `line` what the slide says about it, 12 words or fewer, in its words. **Numbers and
     values go here** ("about 125 ml/min"), never as a row of their own.
   - Links, each reason in the slide's words: `makes` (part/cell → substance row it
     secretes), `acts` (substance → what it acts on), `next` (process → the process or topic
     it leads to), `links` (anything else the page states). A link target must already exist
     (a row above, or a topic). No link from general knowledge.
4. **Own words (rule 4).** After writing the rows, run the check (step 6). Every row it lists
   under "not useful … has an own-words sentence" gets `own: '…'` on the row: ONE plain
   sentence saying its main function or defining feature (not where it sits or where it appears on the slide; position only where position is the point: odd bone, landmark and suture names, foramina, fissures, small skull bones, carpal and tarsal bones, named chambers; owner, 20 Oct 2026), 40–220 characters, ending
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

### Task 10: Week 1 — cells, tissues, homeostasis; merge anatomy's tissues into it

The owner's answers 4 and 10 (spec 4.4): tissues are physiology's and the same as Lecture
1, so anatomy's tissue topics and rows are merged into Week 1, not hidden.

**Files:**
- Modify: `outputs/revision/abct2326-leaves-w1.js`, `outputs/revision/abct2326-leaves-tissues.js`, `outputs/revision/cross-links.js`
- Modify (anatomy, only this task): `outputs/revision/hss2011-data.js`, `outputs/revision/hss2011-leaves-w1.js`, `outputs/revision/hss2011-leaves-w8.js`, `outputs/revision/registry.js` (the `dropSystem` lines), `outputs/revision/leaves.js` (`dropSystem` out), `work/revise-pure-check.mjs` (its tests out)
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

- [ ] **Step 2: List what anatomy holds of tissues**

```bash
node -e "(async()=>{const d=await import('./outputs/revision/hss2011-data.js');const T=new Set(['tissues','junctions','epithelium','connective']);const rows=[];for(const f of ['w1','w2','w3','w4','w5','w6','w7','w8'])rows.push(...(await import('./outputs/revision/hss2011-leaves-'+f+'.js')).ROWS);const gone=new Set(T);const moved=[];for(const r of rows){if(gone.has(r.parent)){gone.add(r.id);moved.push(r.id)}}const stray=rows.filter(r=>r.src&&r.src[0]==='hss.tut.tissues'&&!gone.has(r.id));stray.forEach(r=>gone.add(r.id));const w8=await import('./outputs/revision/hss2011-leaves-w8.js');console.log('rows',moved.length,'+ tutorial rows elsewhere',stray.map(r=>r.id+' under '+r.parent).join(', '));console.log('topic edges',d.EDGES.filter(e=>T.has(e[0])||T.has(e[1])).length,'w8 topic edges',w8.EDGES.filter(e=>T.has(e[0])||T.has(e[1])).length);console.log('links out',rows.filter(r=>gone.has(r.id)).flatMap(r=>Object.keys(r.links||{}).filter(k=>!gone.has(k)).map(k=>r.id+'>'+k)).join(' '));console.log('links in',rows.filter(r=>!gone.has(r.id)).flatMap(r=>Object.keys(r.links||{}).filter(k=>gone.has(k)).map(k=>r.id+'>'+k)).join(' '))})()"
```

Expected (planning time): `rows 60` under the tissue topics, `+ tutorial rows elsewhere
w2_tis_proteoglycans under w1_groundsub, w2_tis_gags under w1_groundsub` (62 in all, every
one a `w2_tis_*` row in `hss2011-leaves-w1.js` from line 164; 56 cite the tissue tutorial
`TIS`, 6 the orientation deck `ORI`), `topic edges 19` (3 between tissue topics, 16 to
anatomy topics), `w8 topic edges 4`, 14 links out (to `w6_bbbarrier`, `w5_elecsyn`,
`w1_cartilage` twice, `bone`, `w1_collagen`, `w1_musfibre`, `w1_fascicle`, `w1_perimysium`,
`w1_epimysium`, `w1_tendon`, `neuron`, `w1_motorneuron`, `glia`) and 4 links in
(`w8_mesothelium>epithelium`, `w8_areolar>connective`, `w8_gapj>w2_tis_gap`,
`w8_contcap>w2_tis_tight`). If the numbers differ, another session changed anatomy: stop and
ask.

- [ ] **Step 2b: Delete the two ground-substance rows from anatomy, first**

The two rows under anatomy's "Ground substance" (`w1_groundsub`), `w2_tis_proteoglycans`
and `w2_tis_gags`, are the only tissue-tutorial rows anatomy shows today (week 2 and
later). The owner's answer (spec section 8, B): delete them from anatomy first, and do not
add them to physiology. Delete both rows from `hss2011-leaves-w1.js` (and the
`w2_tis_proteoglycans` link inside `w2_tis_gags`, which goes with them). Then
`node work/revision-check.mjs | tail -5` and `node work/revise-pure-check.mjs | tail -2`:
`ALL PASS`. Commit:

```bash
git add outputs/revision/hss2011-leaves-w1.js
git commit -m "fix(revise): Proteoglycans and Glycosaminoglycans leave the anatomy map

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

This is the one visible change to the anatomy map in this plan. They get no cross link.

- [ ] **Step 3: Merge the rows into Week 1**

Into `abct2326-leaves-tissues.js` (and, for a merge, `abct2326-leaves-w1.js`), for each of
the 60 remaining rows in order:
- **Rename** its id `w2_tis_<x>` to `p1_tis_<x>`, everywhere it appears in the two
  physiology files (id, `parent`, link keys). `w` is `1` (answer 4).
- **One row per thing.** If a Week 1 row from Step 1 names the same thing (same name, or
  its singular or plural): keep ONE row. Its `src` and `line` come from the page whose
  words make the more useful line (`rules.js lineIsUseful`), Lecture 1 when both do; its
  links are the union of both rows' links; the other row is deleted and its children are
  re-parented to the kept one. List each pair, and which page won, in the notes file. A
  plain word match at planning time found 28 of the 60 on a Lecture 1 page, some only
  loosely ("Organ" inside "Organization"): read the page, do not trust the match.
- **Parents:** `tissues` → `p_tissues`, `epithelium` → `p_epithelial`, `connective` →
  `p_connective`, `junctions` → `p_cells`; a `w2_tis_*` parent becomes its `p1_tis_*` name;
  rows under muscle or nerve tissue go under `p_muscle_t` / `p_neural_t` when their parent
  row was merged into one of those topics' rows.
- **Sources stay physiology's (answer 3).** Rows citing `TIS` (`hss.tut.tissues`, filed in
  iCloud `Human Physology`) keep it. The 6 rows citing `ORI` (`hss.w1.2026`, an anatomy
  deck) are re-cited to the Lecture 1 page that names them
  (`node work/query.mjs text "<name>"`, Lecture 1 pages 1, 31, 32, 56 at planning time) or
  dropped and listed. No row keeps `ORI`.
- **Links to anatomy ids** (`w6_bbbarrier`, `w5_elecsyn`, `w1_cartilage`, `bone`,
  `w1_collagen`, `w1_musfibre`, `w1_fascicle`, `w1_perimysium`, `w1_epimysium`,
  `w1_tendon`, `neuron`, `w1_motorneuron`, `glia`) are removed from the rows; Step 5
  turns them into cross-subject links.
- `SOURCES` of `abct2326-leaves-tissues.js`:
  `{ 'hss.tut.tissues': 'Body tissues tutorial (filed with the physiology lectures)' }`.

- [ ] **Step 4: Take tissues out of anatomy**

- `hss2011-leaves-w1.js`: delete the 60 rows. If `ORI` or `TIS` is then unused in the
  file, delete its constant and its `SOURCES` entry.
- `hss2011-data.js`: delete the four `NODES` (`tissues`, `junctions`, `epithelium`,
  `connective`, under `/* ---------------- tissues & cells ---------------- */`), the 19
  `EDGES` with a tissue end (under `/* tissues */`), and the `{sys:'tissue', …}` branch of
  `TREE`. Keep a list of the 16 edges to anatomy topics for Step 5.
- `hss2011-leaves-w8.js`: delete the 4 `EDGES` with a tissue end and the 4 `links`
  entries into tissue boxes (`w8_mesothelium`'s `epithelium`, `w8_areolar`'s `connective`,
  `w8_gapj`'s `w2_tis_gap`, `w8_contcap`'s `w2_tis_tight`). Keep the list for Step 5.
- `registry.js`: delete the comment and the line `const HSS2011_SHOWN = dropSystem(HSS2011_ALL, HSS2011_ROWS, 'tissue');`;
  in the `HSS2011` entry write `data: mergeLeaves(HSS2011_ALL, HSS2011_ROWS, HSS2011_LEAF_SOURCES),`
  and `rows: HSS2011_ROWS,`; change the leaves import to `import { mergeLeaves, topicNodes } from './leaves.js';`;
  in `HSS2011_SYSTEMS`' comment, replace "(hidden by dropSystem below until plan Task 10
  moves them)" with "(merged into Lecture 1, owner 19 Oct 2026)".
- `leaves.js`: delete `dropSystem` and its comment.
- `work/revise-pure-check.mjs`: delete the `/* ---- dropSystem: … ---- */` block and
  `dropSystem` from the leaves import.
- Then `grep -rn "dropSystem\|w2_tis_\|'tissue'" outputs/revision outputs/study work/revision-check.mjs work/revise-pure-check.mjs`.
  Expected: only `hub.js`'s `SYSORDER` (`'tissue'` stays in the default order; the
  registry's `hubOrder` filters it) and `registry.js`'s `SYSORDER.filter(…)`. The README's
  mention is updated in Task 24.

- [ ] **Step 5: Cross-subject links (the owner's answer 8)**

For each item kept in Steps 3 and 4 (14 links out, 4 links in, 16 + 4 topic edges; the 3
edges between tissue topics are not needed, the physiology tree nests them): find a page
that states the relationship (`node work/query.mjs text "<words>"`, an anatomy or physiology
slide) and add to `CROSS` in `cross-links.js`:

```js
  { a: ['ABCT2326', 'p1_tis_tight'], b: ['HSS2011', 'w6_bbbarrier'], why: 'the words on that page', src: ['<sourceId>', 12], match: 'a phrase on that page' },
```

The physiology end is the merged row or topic (`tissues` → `p_tissues`, `epithelium` →
`p_epithelial`, `connective` → `p_connective`, `junctions` → the junctions row); `a` is
always the ABCT2326 end. A relationship no page states is not written: list it in the notes
file.

- [ ] **Step 6: Own words and the checks** — Recipe P step 4 for the merged rows (23 of
the 62 tissue rows had no useful line at planning time). Run:

```bash
node work/revision-check.mjs | tail -80
node work/revise-pure-check.mjs | tail -3
node work/syntax-check.mjs | tail -1
```

Expected: `ALL PASS`, including `no topic or row is in two subjects`, `no slide row is
written into two subjects`, `every row cites a lecture deck and sits in a week it was
lectured`, and the cross-link checks. Since before Step 2b the HSS2011 leaf count has
dropped by exactly 62 (2 deleted, 60 moved) and its topics by 4; anatomy's map is unchanged
except that Ground substance (Week 2 on) no longer holds Proteoglycans and
Glycosaminoglycans.

- [ ] **Step 7: Notes and commit**

Write `docs/superpowers/notes/2026-10-19-physiology-revise-w1.md` (Recipe P step 7, plus
the merged pairs, the re-cited and dropped orientation rows, and the links not written),
then:

```bash
git status --short
git add outputs/revision/abct2326-leaves-tissues.js outputs/revision/cross-links.js outputs/revision/hss2011-data.js outputs/revision/hss2011-leaves-w1.js outputs/revision/hss2011-leaves-w8.js outputs/revision/registry.js outputs/revision/leaves.js work/revise-pure-check.mjs docs/superpowers/notes/2026-10-19-physiology-revise-w1.md
git commit -m "feat(revise): anatomy's tissues merge into physiology Lecture 1; links between the two subjects

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

(`abct2326-leaves-w1.js` was committed in Step 1; if Step 3 merged rows into it, add it to
this commit too.)

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

### Task 16: Week 8 — hormones

**Files:** Modify `outputs/revision/abct2326-leaves-w8.js`; create `docs/superpowers/notes/2026-10-19-physiology-revise-w8.md`.

Source `phys.l7.2026` (Lecture 7, 21 October; built before it is given, by the owner's
answer 1). Page map: 2 outline · 3–4 what a hormone is, its functions · 5–6 classes of
delivery (autocrine and others) · 7 endocrine glands · 8–10 chemical classification,
prohormones and prehormones · 11 nervous and endocrine systems compared · 12–22 mechanisms
of hormone action: nuclear receptors (14–16), G-protein coupled receptors via adenylate
cyclase–cAMP (17) and phospholipase C–Ca2+ (18), tyrosine kinase receptors (19–22) ·
23–32 pituitary: anterior pituitary hormones (25–26), hypothalamic control of the posterior
(27–28) and anterior (29–30) pituitary, feedback control (31), higher brain function (32) ·
33–36 adrenal glands, medulla, cortex · 37–43 thyroid, hypothyroidism and hyperthyroidism ·
44–45 parathyroid glands, PTH · 46–49 islets of Langerhans, glucagon and insulin · 50–52
pineal gland, sex hormones · 53–54 autocrine and paracrine regulation · 55 growth hormone
abnormalities. Ten pages are figures only. Rows' `w` is 8, ids `p8_`.

- [ ] **Step 1: Rows** — Recipe P, parents `p_hormone`, `p_delivery`, `p_endo_glands`,
  `p_hormone_chem`, `p_ns_vs_endo`, `p_hormone_action`, `p_pituitary`, `p_hypothal`,
  `p_pit_feedback`, `p_adrenal`, `p_thyroid`, `p_parathyroid`, `p_islets`, `p_pineal`,
  `p_sex_hormones`, `p_paracrine`. Glands and gland regions are `part` rows with `makes`;
  each hormone the slides name is a `substance` row with `acts`; second-messenger pathways
  and feedback loops are `process` rows chained by `next`. Disease pages give rows only for
  what their text names as a unit (hypothyroidism, hyperthyroidism, goitre as written).
- [ ] **Step 2: Own words, check, notes** — Recipe P steps 4–7.
- [ ] **Step 3: Commit**

```bash
git add outputs/revision/abct2326-leaves-w8.js docs/superpowers/notes/2026-10-19-physiology-revise-w8.md
git commit -m "feat(revise): physiology Week 8 hormones as leaves

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

### Task 17: Week 9 (and 11) — nerves

**Files:** Modify `outputs/revision/abct2326-leaves-w9.js`; create `docs/superpowers/notes/2026-10-19-physiology-revise-w9.md`.

Source `phys.l8.2026` (Lecture 8, week 9, continued in Lecture 9, week 11: rows start at
week 9, spec section 3). Page map: 2–4 what the nervous system is, CNS · 5–8 neuron
classes, PNS · 9–13 neurons and their structure (11–13 are figures with labels) · 14–21
glial cells: oligodendrocytes, Schwann cells and myelin, microglia, astrocytes · 22–31
resting membrane potential, ion gating, concentration gradients, the Na+/K+ pump · 32–39
action potential, all-or-none law, refractory periods · 40–43 conduction, saltatory
conduction · 44–50 electrical and chemical synapses, acetylcholine, acetylcholinesterase ·
51–56 graded potentials, EPSPs and IPSPs · 57–61 sympathetic pathways; nicotinic,
muscarinic and adrenergic receptors · 62–66 figures. 22 pages are figures only: expect a
long "only in pictures" list. Rows' `w` is 9, ids `p9_`.

- [ ] **Step 1: Rows** — Recipe P, parents `p_ns`, `p_cns`, `p_neuron_class`, `p_pns`,
  `p_neurons`, `p_glia`, `p_rmp`, `p_ion_gating`, `p_ap`, `p_allornone`, `p_n_refractory`,
  `p_n_conduction`, `p_saltatory`, `p_synapses`, `p_ach`, `p_graded`, `p_symp_path`,
  `p_adrenergic`. Neuron parts and glial types are `part`/`cell` rows; Na+, K+,
  acetylcholine and acetylcholinesterase are `substance` rows with `acts`; the action
  potential's phases are `process` rows chained by `next`; values (resting potential,
  threshold) go in lines.
- [ ] **Step 2: Own words, check, notes** — Recipe P steps 4–7, including the page ranges
  by section (step 7).
- [ ] **Step 3: Commit**

```bash
git add outputs/revision/abct2326-leaves-w9.js docs/superpowers/notes/2026-10-19-physiology-revise-w9.md
git commit -m "feat(revise): physiology nervous system (Week 9) as leaves

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

### Task 18: Week 11 (and 12) — muscle and bone

**Files:** Modify `outputs/revision/abct2326-leaves-w11.js`; create `docs/superpowers/notes/2026-10-19-physiology-revise-w11.md`.

Source `phys.l9.2026` (Lectures 9 and 10, weeks 11 and 12: rows start at week 11, spec
section 3). Page map: 2 outline · 3–8 skeletal muscles, properties, classification, the
three tissue types compared · 9–15 skeletal muscle structure and action, sarcolemma and
sarcomere defined · 16–19 muscle fibre, myofibril, sarcomeres · 20–27 how a fibre
contracts: sliding filament theory, cross bridges, troponin–tropomyosin control, summary ·
28–36 excitation-contraction coupling at the neuromuscular junction, T tubules · 37
relaxation · 38–39 motor units · 40–45 energy: sources, VO2 max, lactate threshold, oxygen
debt · 46–50 slow- and fast-twitch fibres · 51–52 fatigue · 53–56 endurance and strength
training, repair, ageing · 57–62 neural control, sensory feedback, muscle spindle, stretch
and Golgi tendon organ reflexes · 63 Huntington's disease (a clinical case: no rows) ·
64–70 bone: structure, a long bone, bone cells, remodelling. Rows' `w` is 11, ids `p11_`.

- [ ] **Step 1: Rows** — Recipe P, parents `p_musc_props`, `p_musc_class`, `p_skm_struct`,
  `p_fibre`, `p_sarcomere`, `p_sliding`, `p_crossbridge`, `p_contr_control`, `p_ecc`,
  `p_nmj`, `p_relax`, `p_motorunit`, `p_musc_energy`, `p_twitch`, `p_fatigue`,
  `p_training`, `p_neural_ctrl`, `p_spindle`, `p_bone_t`, `p_remodel`. Bands and filaments
  are `part` rows; the cross-bridge cycle is `process` rows chained by `next` (the deck's
  page 25 note says the video and the slides order two steps differently: follow the
  slides); Ca2+, ATP, troponin and tropomyosin are `substance` rows; bone cells are `cell`
  rows. Do not repeat a Week 1 tissue row here: link to it in Task 20 instead.
- [ ] **Step 2: Own words, check, notes** — Recipe P steps 4–7, including the page ranges
  by section (step 7).
- [ ] **Step 3: Commit**

```bash
git add outputs/revision/abct2326-leaves-w11.js docs/superpowers/notes/2026-10-19-physiology-revise-w11.md
git commit -m "feat(revise): physiology muscle and bone (Week 11) as leaves

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

### Task 19: Week 12 (and 13) — immunity

**Files:** Modify `outputs/revision/abct2326-leaves-w12.js`; create `docs/superpowers/notes/2026-10-19-physiology-revise-w12.md`.

Source `phys.10.2026` (Lectures 10 and 11, weeks 12 and 13: rows start at week 12, spec
section 3; the deck splits itself at page 44, "Part II - Adaptive Immunity", which the
notes file records as the likely boundary). Page map: 2 learning outcomes (no rows) · 3–5
pathogens, defence mechanisms · 6–43 Part I innate immunity, seven categories: physical
barriers (8, 12), phagocytes, microphages and macrophages (14–18), activation of innate
immunity and toll-like receptors (19–20), immunological surveillance by NK cells (22–25),
interferons (27–28), complement, classical and alternative pathways, pore formation (30–35),
inflammation (37–39), fever (41), summary figures (42–43) · 44–70 Part II adaptive
immunity: forms of immunity (45–47), specific defences (48–49), T cell types (50), antigen
presentation and MHC class I and II (51–59), helper T cell activation (60–62), B cells
(63–67), defences against bacteria and viruses (69–70) · 71 video (no rows). Rows' `w` is
12, ids `p12_`.

- [ ] **Step 1: Rows** — Recipe P, parents `p_defense`, `p_innate`, `p_barriers`,
  `p_phagocytes`, `p_macrophages`, `p_surveillance`, `p_interferons`, `p_complement`,
  `p_inflammation`, `p_fever`, `p_adaptive`, `p_imm_forms`, `p_tcells`, `p_mhc`,
  `p_helper`, `p_bcells`, `p_pathogens`. Immune cell types are `cell` rows with `makes`
  (perforin, antibodies, as the slides say); interferons, complement proteins and
  cytokines are `substance` rows with `acts`; the complement pathways and B cell
  sensitization–activation–division are `process` rows chained by `next`. Macrophages here
  and the moved tissue row of the same name are different boxes under different parents:
  Task 20 links them.
- [ ] **Step 2: Own words, check, notes** — Recipe P steps 4–7, including the page ranges
  by section (step 7).
- [ ] **Step 3: Commit**

```bash
git add outputs/revision/abct2326-leaves-w12.js docs/superpowers/notes/2026-10-19-physiology-revise-w12.md
git commit -m "feat(revise): physiology immunity (Week 12) as leaves

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

# Wave 2 — one session, after all of Wave 1 is committed

### Task 20: Links across weeks, and across subjects

**Files:** modify `outputs/revision/abct2326-topics.js` (EDGES), the leaf files (link fields only), `outputs/revision/cross-links.js`; create `docs/superpowers/notes/2026-10-19-physiology-revise-links.md`.

Rule for every link: add it only if a page **states the relationship in words**, and cite
that page. For a topic link, append `[sourceId, page, 'words on that page naming the far end']`
as the edge's fourth element (the check looks for the third item, else the far topic's
name). For a row link, the reason is the slide's words. For a cross-subject link, the entry
shape in `cross-links.js` (Task 6), `a` the physiology end.

- [ ] **Step 1: Physiology candidates** (each only if a page says it):
  W3 oxygen transport rows ↔ W2 red blood cell / haemoglobin rows; W3 pulmonary circuit ↔
  W2 `p_circuits`; W5 GFR regulation and sympathetic effects ↔ W2 vessels / blood pressure
  rows; W5 RAAS ↔ W2 plasma volume; W1 negative feedback ↔ W3 PCO2 homeostasis, W5 renin
  regulation ("Neg. feedback control", L5 p42), W7 hormonal control of spermatogenesis, W8
  feedback control of the anterior pituitary; W1 positive feedback ↔ W7 parturition and W8
  oxytocin; W1 epithelial tissue rows ↔ W3 alveolar, W4 mucosa, W5 tubule rows; W1 meiosis
  ↔ W7 spermatogenesis and follicle rows; W4 capillaries of villi ↔ W2 capillary types; W8
  hormones ↔ the W4 (gastrin, secretin, CCK), W5 (aldosterone, renin) and W7 (FSH, LH,
  testosterone) rows naming the same hormone; W8 islets ↔ W4 pancreas; W8 adrenal medulla ↔
  W9 sympathetic pathways and adrenergic receptors; W9 action potential ↔ W2 myocardial
  action potential and refractory periods; W9 acetylcholine ↔ W11 neuromuscular junction;
  W11 muscle tissue types ↔ W1 `p_muscle_t` rows; W11 bone ↔ W1 bone tissue rows; W12
  macrophages ↔ the W1 tissue row of that name; W12 inflammation ↔ W1 mast cells.
- [ ] **Step 2: Cross-subject candidates (the owner's answer 8)**: physiology W2
  heart, valves and conducting system ↔ anatomy W8 heart rows; W3 respiratory portion ↔ anatomy W8 lung and airway rows; W9 neurons, glia,
  synapses and autonomic pathways ↔ anatomy W5–W6 nervous rows (`neuron`, `glia`,
  `synapse`, `symp`, `parasymp`); W11 muscle structure, motor unit and neuromuscular
  junction ↔ anatomy W1 `musclestruct`, `motorunit`; W11 bone ↔ anatomy W1 `bone`; W8
  pituitary, thyroid, adrenal ↔ any anatomy row naming the gland. Find each id with
  `grep -n "l: '<name>'" outputs/revision/hss2011-*.js`.
- [ ] **Step 3: Check and commit**

```bash
node work/revision-check.mjs | tail -80
git status --short
git add outputs/revision/abct2326-topics.js outputs/revision/cross-links.js docs/superpowers/notes/2026-10-19-physiology-revise-links.md
git add outputs/revision/abct2326-leaves-w1.js outputs/revision/abct2326-leaves-tissues.js outputs/revision/abct2326-leaves-w2.js outputs/revision/abct2326-leaves-w3.js outputs/revision/abct2326-leaves-w4.js outputs/revision/abct2326-leaves-w5.js outputs/revision/abct2326-leaves-w7.js outputs/revision/abct2326-leaves-w8.js outputs/revision/abct2326-leaves-w9.js outputs/revision/abct2326-leaves-w11.js outputs/revision/abct2326-leaves-w12.js
git commit -m "feat(revise): physiology links across weeks and into anatomy, each on a page that states it

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

(Stage only files you changed, after `git diff` on each.) Expected `ALL PASS`. The links
notes file lists every candidate not added and why.

### Task 21: Threads, Tables, Decoder, Tours

**Files:** modify `outputs/revision/abct2326-fragments.js`, `outputs/revision/registry.js` (delete two lines), `docs/superpowers/notes/2026-10-19-physiology-revise-links.md` (append).

- [ ] **Step 1: Threads.** In `THREADS`, write up to six threads from spec 4.5 (oxygen from
air to cell; blood pressure and volume; feedback loops; a meal; a signal from nerve to
muscle; defence), ids `t1`…`t6`. Each step:

```js
{ wk: 3, hd: 'Ventilation.', text: 'the slide\'s words, at most 25 words', src: ['phys.l3.2026', 17], match: 'a phrase on that page' },
```

Steps in the order of the process, not of the weeks. No step without a page.

- [ ] **Step 2: ★ textbook facts (the owner's answer 7), at most one per step and only
where it joins or explains the step's slide fact.** The book is `phys.ebook` (Martini,
Fundamentals of Anatomy and Physiology), on `E:` only:
`E:\UNI sources\1 Radiography Programme\Year 1\Sem 1\ABCT2326 Human Physiology\References\Fundamentals of Anatomy and Physiology_eBook.pdf`.
Read a chapter's pages with `pdftotext -layout -f <first> -l <last> "<that path>" -` (the
text stays out of the repo: it is not ours to publish). The chapter must be one the step's
deck is built on (`decks[…].ch` in the registry). Add to the step:

```js
star: { text: 'One sentence from that page, in plain words, ending with a full stop.', page: 812, ch: 23 },
```

`page` is the PDF page you read. No clinical cases, no numbers the slides contradict. List
every ★ with its page in the links notes file so the owner can check them.

- [ ] **Step 3: 廣東話 lines (the owner's answer 6).** Give every thread `yue: '…'`: the
thread retold in Cantonese, arrows between steps as anatomy's do, English technical words in
brackets only where a step uses that exact word. No new fact, no number a step does not
give, no ★ (`yueProblems` fails all three). At most 400 characters.

- [ ] **Step 4: Tables.** In `TABLES`: `tb-hormones` (head `['Hormone', 'Made by', 'Acts on', 'Effect']`,
one row per hormone the W4, W5, W7 and W8 slides name with those facts) and `tb-values`
(head `['What', 'Value', 'Lecture']`, one row per number a slide gives: GFR, resting and
threshold potentials, volumes, VO2 max as written). Each row has `wk`, `cells`, `src`,
`match`. Slides only: no ★ in tables.

- [ ] **Step 5: Decoder (the owner's answer 9: "ensure they are correct").** For row and
topic labels of 7+ letters that are built from word parts, run

```bash
node -e "import('./outputs/revision/fragments.js').then(async(f)=>{const w=await import('./outputs/wordparts.js');for(const t of process.argv.slice(1))console.log(t+' => '+f.decoderReading(t,w.decompose))})" Spermatogenesis Oxyhemoglobin Glomerular
```

For each reading, open the slide that defines or uses the word and check every part's
meaning against that use. Keep the term only if every part is right for this word (drop
`oxy-` read as "rapid" in oxyhemoglobin, and any reading with a part missing); write
`{ term, wk, reading }` with the reading exactly as printed. List every dropped term and why
in the links notes file. Do not edit `wordparts.js` to make a reading fit (it is the
reading help for the whole app; a wrong root there is a separate task: list it instead).

- [ ] **Step 6: Tours.** `TOURS = [{ th: 't1', stops: [topic ids in thread order] }, …]`, stops are topic ids.
- [ ] **Step 7: Require them.** In `outputs/revision/registry.js` delete the ABCT2326 lines
`/* the Threads, Tables and Decoder tabs are hidden until plan Task 21 fills them */` and
`requireFragments: false,`.
- [ ] **Step 8: Check and commit**

```bash
node work/revision-check.mjs | tail -80
node work/revise-pure-check.mjs | tail -2
git add outputs/revision/abct2326-fragments.js outputs/revision/registry.js docs/superpowers/notes/2026-10-19-physiology-revise-links.md
git commit -m "feat(revise): physiology threads (with 廣東話 and cited textbook facts), tables, reviewed decoder and tours

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

Expected: `ALL PASS`, including `every thread step and table row is on the page it cites`,
`every ★ fact is one sentence with a textbook page from its lecture's chapter`, `every
thread's 廣東話 line retells only its steps` and `every decoder reading is the reviewed one`.

### Task 22: Wave 2 in the browser

- [ ] Re-run Task 9 Steps 2–3 (the check now also follows up to five cross-subject links).
Also: Threads, Tables and Decoder tabs now show for Physiology; at W3 a thread hides its W5
and later steps, says how many come later, and hides its 廣東話 line; a ★ shows its textbook
page; the Decoder filter works; Brain 3D Tour plays a physiology tour; at Physiology W8 a
moved tissue row (for example tight junctions) shows "In Anatomy", and tapping it opens the
anatomy box at the same week. No commit unless a fix was needed.

---

# Wave 3 — one session

### Task 23: Glosses and the shell

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

### Task 24: The whole check set, records, and the owner

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
  Then, at 390 × 844, Physiology W12, time "Open all" on the Map
  (`performance.now()` around a click in `javascript_tool`, after `until` the node count
  stops growing). If it takes over two seconds, tell the owner (spec section 7, Markmap
  size); do not change the behaviour without their answer.

- [ ] **Step 3: Records** (keep each file's line endings):
- `outputs/README.md`, Revise section: physiology in Revise for the whole term (topic and
  leaf counts from `revision-check`), the eight decks taken through intake, the owner's
  answers of 19 October (spec section 8) in one line each, the image-only lists, the ★
  facts and links not added (collected from `docs/superpowers/notes/2026-10-19-physiology-revise-*.md`),
  the tissues merged into Lecture 1 (and the two Ground substance rows deleted from anatomy),
  the one new anatomy own sentence (`w2_j_hip`), the anatomy legend change, the anatomy
  廣東話 lines now gated by week, and the replaced `dropSystem` mention.
- `CLAUDE.md` principle 0: replace "Only HSS2011 has revision data so far." with "HSS2011
  and ABCT2326 (the whole term) have revision data; Revise has a subject switch, and boxes
  about the same thing link across the two subjects." Add `rules.js`, `fragments.js` and
  `cross-links.js` to the `outputs/revision/` row of the Layout table, and
  `node work/pages-workflow-check.mjs` to the after-every-edit list.
- `docs/TRAPS.md`, "Revise": (1) system colours come from the registry and are written as
  CSS variables by `applySubject()`; a key unique across subjects; never re-add static
  legend spans. (2) Physiology own words live on the row (`own`), anatomy's in
  `own-words.js`; no digits in own words. (3) A subject written from scratch keeps
  fragments as data (`fragments.js`), and `requireFragments: false` hides its tabs.
  (4) Physiology rows cite only the decks in the registry's `decks` (iCloud lecture decks);
  a split deck's rows move between its two weeks by `w` alone. (5) A decoder reading is
  frozen: a change to `wordparts.js` that alters one fails `revision-check`; review the
  word again, never edit the frozen reading to match. (6) `cross-links.js` entries are
  shown only in the notes panel; `a` is the ABCT2326 end.

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

- **A lecture that departs from its deck.** If a lecturer adds or skips material, the
  owner says so; rows are added or removed by Recipe P, nothing else changes.
