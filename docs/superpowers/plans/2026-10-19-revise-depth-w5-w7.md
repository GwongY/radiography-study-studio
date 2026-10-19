# Revise depth, plan 3 of 3: Weeks 5 to 7 (the nervous system, the brain, the senses) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** The Revise Map and the 3D hub go down to single structures for Week 5 (nerve
cells, glia, synapses, the spinal cord and its tracts, the spinal nerves and plexuses),
Week 6 (the brain, meninges, ventricles, brain barriers, the twelve cranial nerves) and
Week 7 (receptors and the senses, the ear, the eye, the autonomic nervous system), each
name checked against the slide page it cites. The nerve rows of Weeks 2 and 3 are linked
to their plexuses, and the tissue rows of Weeks 1 and 2 to the nervous-system rows they
come back as.

**Architecture:** Plan 1 built the machinery; Plan 2 added Weeks 1, 3 and 4 and the `moves`
field. This plan first takes the three lecture decks through source intake (they are not
yet in `work/source-text.json`, so no row could be checked against them), then adds rows in
`outputs/revision/hss2011-leaves-w5.js`, `-w6.js` and `-w7.js`, merged in `registry.js`.

**Tech Stack:** Plain ES modules, no build step, Node 24 for `work/` checks, `pdftotext`
for intake.

**Spec:** `docs/superpowers/specs/2026-10-19-revise-depth-and-3d-hub.md`

**Needs:** Plan 2 (`2026-10-19-revise-depth-w1-w3-w4.md`) done and committed.

---

## Before you start (every task)

- **Another session may be editing this tree.** Run `git status --short` first. Never
  `git add -A` or `git add .`; add paths one by one, and run `git diff <file>` on each before
  committing. If a file you must edit shows hunks you did not write, **stop and ask the
  owner**.
- **Line endings:** `outputs/revision/*.js` and `work/*.mjs` are LF, and so are new files.
  `CLAUDE.md`, `docs/TRAPS.md` and `outputs/README.md` are CRLF in the working copy. Check
  any other file with `git ls-files --eol <file>` and keep its own endings; the Edit tool
  does.
- Commits are local. **Do not push** (pushing `master` publishes the site). End every commit
  message with `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`.
- **Never loosen a check to make it pass.** A failing source gate means the row's page or
  `match` is wrong, or the structure is not in the text. Fix the row. Do not weaken `match`
  to a word that is on every page, and do not delete a check.
- **Settled, do not reopen:** rows are structures the slides name, in the slide's words. No
  textbook additions, no teaching prose: a row's `line` is what the slide says, in 12 words
  or fewer. Clinical-condition slides (spinal meningitis, sciatica, shingles, tumours) are
  not structures and get no rows. The week of a deck is the Canvas schedule's, not the
  filename's: lecture 5 is Week 5 "Nervous System", lecture 6 is Week 6 "Brain and Cranial
  Nerve", lecture 7 is Week 7 "Special Senses" (it also holds the autonomic nervous system).

## Recipe R: turning slide pages into rows

Every data task below runs this recipe with its own parameters. Read it once.

1. **Read the pages.** `node work/query.mjs pages <source> <from>-<to>` prints the cached
   text of those pages. This is the only text you may use. Pages the plan lists as *thin*
   hold a picture and almost no text.
2. **List the structures.** Every structure the page text names as something to learn: a
   nerve, a tract, a part of the brain, a cell, a receptor, a sense organ, a ganglion, a
   region. Skip figure credits, author and reference lines, questions, comparisons to a
   computer, clinical conditions, and anything that is not a structure.
3. **Write one row per structure** in the file the task names, in the slide's reading
   order, after any row it hangs from. The parent is a topic from the task's parent table,
   or an earlier row:
   - `k` is `group` (a heading that holds others), `nerve`, `muscle`, `bone`, `joint` or
     `part` (anything else: a brain part, a tract, a cell, a receptor, an organ, a layer).
   - `id` is `w<week>_<short>`, unique across all `hss2011-leaves-*.js` files; check with
     `grep -rn "id: 'w6_x'" outputs/revision/` first.
   - `l` is the name as the slide writes it. `src` is `[source, page, page…]`: every page
     where the name is on the page text, best page first. `match` is only for a slide that
     words it differently from `l` (a plural, an abbreviation, "CN III" for "Oculomotor");
     it must be a real name fragment of at least 4 characters.
   - `w` is the week of the deck (5, 6 or 7), never earlier than its parent's first week.
   - `line` is what the slide says about it, 12 words or fewer, from the page text. Leave it
     out when the slide only names the structure.
   - A nerve has `supplies: { rowId: 'reason' }` (what it carries to or from, in the slide's
     words) and `from: rowId` for its plexus or parent nerve.
   - `links: { rowId: 'reason' }` where the slide states the relationship in words (for
     example "relay to the primary sensory cortex"). The reason is the slide's words. Never
     add a link from textbook knowledge. A link target must exist as a row or a topic when
     you run the check, so write a row before you point at it, or point at the topic.
4. **If a structure is only in a picture** (it is on no page's text), do not write the row
   and do not guess a page. Put it in the "image-only, not written" list in the task's
   report; the owner decides whether to read the picture.
5. **Run the checks:**

```bash
node work/revision-check.mjs | tail -40
node work/revise-pure-check.mjs | tail -3
```

   Expected: `ALL PASS`. If `every leaf's name is on a page it cites` names a row, read
   that page (`node work/query.mjs pages <source> <page>`), fix the row's page or `match`,
   and re-run.
6. **Commit** the data file, plus `registry.js` the first time a task adds that file.

## File structure

| File | Status | Responsibility |
| --- | --- | --- |
| `outputs/study/course-data.js` | modify | Registers the three decks in `SOURCE_FILES` (Task 1) |
| `work/source-catalogue.json`, `work/source-text.json` | regenerate | The three decks' catalogue entries and page text (Task 1) |
| `outputs/revision/hss2011-leaves-w5.js` | create | W5 rows (Tasks 2, 3) |
| `outputs/revision/hss2011-leaves-w6.js` | create | W6 rows (Tasks 4 to 6, 9) |
| `outputs/revision/hss2011-leaves-w7.js` | create | W7 rows (Tasks 7, 8) |
| `outputs/revision/registry.js` | modify | Merges the three new row files |
| `outputs/revision/hss2011-leaves-w2.js`, `-w3.js`, `-w1.js` | modify | Cross-week links only (Task 10) |
| `outputs/term-gloss.js`, `outputs/sw.js`, docs | modify | Task 11 |

## Source pages (outlined from the PDFs; they are not in the text store yet)

| Deck (iCloud `Human Anatomy`) | Source id | Pages | Thin pages (a picture) |
| --- | --- | --- | --- |
| `2627_M2_L5_Nervous system I.pdf` | `hss.l5.2026` | 43 | 3, 8, 18, 23, 31 |
| `2627_M2_L6_brain_cranial_N.pdf` | `hss.l6.2026` | 56 | 3, 16, 17, 26, 36, 42, 49, 53 |
| `2627_M2_L7_ANS_spec_sen.pdf` | `hss.l7.2026` | 55 | 3, 15, 26, 35, 46 |

Page map of the three decks (so each task's range is not a guess):

```
L5  4-7 overview · 8-17 neurons and glia · 18-22 synapses · 23-30 spinal cord and tracts
    31-38 nerves, spinal nerves, plexuses · 39 dermatomes · 40-42 clinical (no rows)
L6  4-8 brain overview · 9-11 meninges · 12-14 ventricles and CSF · 15 brain barriers
    16-25 brainstem and cerebellum · 26-29 diencephalon · 30-39 cerebrum · 40-55 cranial nerves
L7  4-14 receptors and general senses · 15-25 taste and smell · 26-34 ear
    35-45 eye and vision · 46-53 autonomic nervous system
```

The existing Map topics rows hang from, with their week:

```
neuron W5 · glia W5 · synapse W5 · nervestruct W5 (spinalnerves W5 → plexuses W5,2,3,
  dermatomes W5) · cranialnerves W6 · reflexes W5,7
spinalcord W5 · tracts W5,6 · cerebrum W6 (cortexareas, basalnuclei, limbic)
brainstem W6 (reticular) · cerebellum W6 · thalamus W6 · hypothalamus W6
meninges W5,6 · csf W6 · bbb W6
receptors W7,1 · sensorypath W7,5,6 · taste W7 · smell W7 · eye W7 (visualpath W7,6)
ear_hearing W7 · ear_balance W7 · ans W7 · symp W7 · parasymp W7,6
```

---

### Task 0: Pre-flight

**Files:** none changed.

- [ ] **Step 1: Record the starting state**

```bash
git status --short
git log --oneline -3
ls outputs/revision/hss2011-leaves-w*.js
node work/revision-check.mjs | tail -2
node work/revise-pure-check.mjs | tail -2
node work/source-check.mjs | tail -2
node work/baseline.mjs --check | tail -2
```

Expected: `git status` is empty, the listing shows `-w1`, `-w2`, `-w3` and `-w4`, and the
four checks pass. If `-w1`, `-w3` or `-w4` is missing, Plan 2 has not landed: **stop and
tell the owner**. Anything else red is someone else's: write it down and do not fix it.

- [ ] **Step 2: Confirm the decks are reachable**

```bash
ls -la "$USERPROFILE/iCloudDrive/Human Anatomy/" | grep 2627_M2
```

Expected: the three `2627_M2_L5/L6/L7` PDFs. If they are missing or cloud-only (size 0),
**stop and ask the owner** to download them.

---

### Task 1: Source intake of the three decks

The standing workflow is `docs/superpowers/specs/2026-09-10-new-source-intake-workflow.md`.
Its steps about study items and `WEEK_STUDY` are obsolete (the app no longer tests), so only
registration, catalogue, text and the checks apply.

**Files:**
- Modify: `outputs/study/course-data.js`
- Regenerate: `work/source-catalogue.json`, `work/source-text.json`

- [ ] **Step 1: Verdict (new slot, not a duplicate)**

```bash
node work/query.mjs file "2627_M2_L5"
node work/query.mjs file "2627_M2_L6"
node work/query.mjs file "2627_M2_L7"
node work/query.mjs where "Nervous"
```

Expected: each file is on the iCloud drive; none is registered in `SOURCE_FILES`. The
Canvas schedule (`outputs/schedule.js`, lines for HSS2011 weeks 5, 6, 7) names them as
Week 5 "Nervous System", Week 6 "Brain and Cranial Nerve", Week 7 "Special Senses". If any
is already registered, register nothing new for it and use its id below.

- [ ] **Step 2: Register them**

In `outputs/study/course-data.js`, inside `SOURCE_FILES`, directly after the `hss.hnt.2026`
entry, add:

```js
  'hss.l5.2026': { file: '2627_M2_L5_Nervous system I.pdf', subject: 'HSS2011', root: 'newsrc', folder: 'Human Anatomy', kind: 'primary', note: 'Module 2 lecture 1 (Week 5 Nervous System), Prof Benson Lau, 43 pages. Nervous system overview, neurons (functional and structural classes), neuroglia of the CNS and PNS, myelin, synapses and neural circuits, the spinal cord (surface and cross-sectional anatomy, tracts), nerves, spinal nerves, plexuses and dermatomes. Pages 40 to 42 are clinical conditions.' },
  'hss.l6.2026': { file: '2627_M2_L6_brain_cranial_N.pdf', subject: 'HSS2011', root: 'newsrc', folder: 'Human Anatomy', kind: 'primary', note: 'Module 2 lecture 2 (Week 6 Brain and Cranial Nerve), Prof Benson Lau, 56 pages. Overview of the brain, meninges, ventricles and cerebrospinal fluid, the brain barrier system, brainstem (medulla, pons, midbrain, reticular formation), cerebellum, diencephalon (thalamus, hypothalamus), cerebrum (lobes, white matter, limbic system, basal nuclei, motor and sensory areas) and the twelve cranial nerves.' },
  'hss.l7.2026': { file: '2627_M2_L7_ANS_spec_sen.pdf', subject: 'HSS2011', root: 'newsrc', folder: 'Human Anatomy', kind: 'primary', note: 'Module 2 lecture 3 (Week 7 Special Senses), Prof Benson Lau, 55 pages. Sensory receptors and general senses, taste and smell, the ear (hearing and equilibrium), the eye and visual pathway, and the autonomic nervous system (visceral reflexes, sympathetic and parasympathetic divisions).' },
```

- [ ] **Step 3: Catalogue, text and the source check**

```bash
node work/build-source-catalogue.mjs --add-file "$USERPROFILE/iCloudDrive/Human Anatomy/2627_M2_L5_Nervous system I.pdf"
node work/build-source-catalogue.mjs --add-file "$USERPROFILE/iCloudDrive/Human Anatomy/2627_M2_L6_brain_cranial_N.pdf"
node work/build-source-catalogue.mjs --add-file "$USERPROFILE/iCloudDrive/Human Anatomy/2627_M2_L7_ANS_spec_sen.pdf"
node work/build-source-text.mjs --ref hss.l5.2026
node work/build-source-text.mjs --ref hss.l6.2026
node work/build-source-text.mjs --ref hss.l7.2026
node work/source-check.mjs | tail -3
```

Expected: `source-check` passes and lists the three as found.

- [ ] **Step 4: Prove the text is there and the page counts match**

```bash
node work/query.mjs pages hss.l6.2026 45
node -e "const s=JSON.parse(require('fs').readFileSync('work/source-text.json','utf8')).sources;for(const k of ['hss.l5.2026','hss.l6.2026','hss.l7.2026'])console.log(k,s[k].pages.length)"
```

Expected: page 45 of `hss.l6.2026` shows the olfactory-nerve text, and the second command
prints `43`, `56`, `55`. If a count differs, **stop and report** the three numbers.

- [ ] **Step 5: Check the edit and commit**

```bash
git status --short
git diff --stat
node work/syntax-check.mjs | tail -1
```

Expected: only `outputs/study/course-data.js`, `work/source-catalogue.json` and
`work/source-text.json` changed. If other files changed, they are not yours: do not stage
them.

```bash
git add outputs/study/course-data.js work/source-catalogue.json work/source-text.json
git commit -m "chore(sources): register and cache the Week 5, 6 and 7 nervous-system lecture decks

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Week 5 nerve cells, glia and synapses

**Files:**
- Create: `outputs/revision/hss2011-leaves-w5.js`
- Modify: `outputs/revision/registry.js`

**Source:** `hss.l5.2026`, pages 4 to 22. **Parents (week 5):** `neuron`, `glia`, `synapse`,
`nervestruct`, `reflexes` for page 5 to 7's overview (a `group` "Divisions of the nervous
system" under `nervestruct`).

- [ ] **Step 1: Create the file with its header and one row, and wire the registry**

Create `outputs/revision/hss2011-leaves-w5.js`:

```js
/*
 * HSS2011 · Week 5 leaves — nervous tissue, spinal cord, spinal nerves.
 *
 * Read off 2627_M2_L5_Nervous system I.pdf (hss.l5.2026), page by page. One row per
 * structure the page text names, in the slide's words; a structure only in a picture has
 * no row; clinical-condition pages have none. Row kinds and fields:
 * outputs/revision/leaves.js. Recipe: docs/superpowers/plans/2026-10-19-revise-depth-w5-w7.md.
 */
const L5 = 'hss.l5.2026';

export const SOURCES = {
  [L5]: 'Week 5 nervous-system slides',
};

export const ROWS = [
{ k: 'group', id: 'w5_divisions', l: 'Divisions of the nervous system', parent: 'nervestruct', w: 5, match: 'CNS', src: [L5, 6] },
];
```

In `registry.js` (LF) add `import * as hss2011W5 from './hss2011-leaves-w5.js';` after the
`-w4` import and append `...hss2011W5.ROWS` and `...hss2011W5.SOURCES` to the two merge
lines. Run `node work/revision-check.mjs | tail -3`: expect `ALL PASS`. Change `[L5, 6]` to
`[L5, 43]`, run it: expect the source gate to name `w5_divisions`. Change it back.

- [ ] **Step 2: Write the rows with Recipe R**

| Pages | Covers | Notes for the rows |
| --- | --- | --- |
| 5 to 6 | the divisions: CNS, PNS, sensory (afferent) and motor (efferent) divisions, somatic and autonomic as the page names them | under the `group` "Divisions of the nervous system"; `part` rows; `line` is what the slide says each does (CNS process/store/retrieve; PNS the page's words) |
| 9 to 12 | the neuron: its properties; functional classes (sensory, motor, interneuron as page 10 names); structure (cell body or soma, dendrites, axon, axon hillock, terminals and the others page 11 lists, with the organelles it names); structural classes (multipolar, bipolar, unipolar) | under `neuron`; a `group` each for "Functional classes", "Parts of a neuron", "Structural classes"; `part` rows; `line` = the slide's one-line meaning |
| 13 to 17 | neuroglia: CNS (oligodendrocyte, astrocyte, microglia, ependymal cell as the pages name them), PNS (Schwann cell, satellite cell), myelin sheath | under `glia`; a `group` each for CNS and PNS glia; `part` rows; `line` = the slide's job; the myelin sheath links to the oligodendrocyte and the Schwann cell as "formed by" only if the page 17 text says so |
| 19 to 21 | synapses: the meeting point, chemical and electrical, the parts of a chemical synapse page 20 names (synaptic terminal, synaptic cleft, neurotransmitter, receptors and the others), the cholinergic synapse and its neurotransmitter on page 21 | under `synapse`; `part` rows; the neuromuscular junction only if the pages name it |

Link rules for this task: a neuron class links to a glia row only where the page ties them
in words. Do not link to the brain-barrier or tissue rows here; Task 10 adds those.

- [ ] **Step 3: Run the checks**

```bash
node work/revision-check.mjs | tail -40
node work/revise-pure-check.mjs | tail -2
```

Expected: `ALL PASS`.

- [ ] **Step 4: Commit**

```bash
git add outputs/revision/hss2011-leaves-w5.js outputs/revision/registry.js
git commit -m "feat(revise): Week 5 neurons, glia and synapses as leaves

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

Report the structures written from a picture-only page (page 8, 18) and the clinical
page 22 skipped.

---

### Task 3: Week 5 spinal cord, nerves, plexuses and dermatomes

**Files:** modify `outputs/revision/hss2011-leaves-w5.js`.

**Source:** `hss.l5.2026`, pages 24 to 39. **Parents (week 5):** `spinalcord`, `tracts`,
`meninges`, `nervestruct`, `spinalnerves`, `plexuses`, `dermatomes`.

- [ ] **Step 1: Write the rows with Recipe R**

| Pages | Covers | Notes for the rows |
| --- | --- | --- |
| 24 to 27 | the spinal cord: its job; surface anatomy (cervical, thoracic, lumbar, sacral regions, enlargements, conus medullaris, cauda equina and the other features the page names); the meninges that protect it (page 27) | under `spinalcord`; a `group` "Regions of the spinal cord" (the four regions) and `part` rows for the surface features; the meningeal layers go under `meninges` as `part` rows (dura mater, arachnoid mater, pia mater as the page names them) |
| 28 to 29 | cross-section: white matter, gray matter, the horns (dorsal or posterior, ventral or anterior, lateral), the columns (funiculi), the central canal, the commissures the page names | under `spinalcord`; a `group` "Gray matter" and a `group` "White matter"; `part` rows; `line` = what the slide says each holds (for example sensory or motor) |
| 30 | the spinal tracts (page 30's text; the tables of ascending and descending tracts if they are text, one row per named tract) | under `tracts`; a `group` "Ascending tracts" and a `group` "Descending tracts"; `part` rows; `line` = what the slide says it carries; `links` from a tract to the gray or white matter row the slide says it runs in |
| 32 | general anatomy of nerves: nerve fibre, endoneurium, perineurium, epineurium, fascicle and the others the page names | under `nervestruct`; `part` rows |
| 33 to 35 | spinal nerves: 31 pairs, the regions (8 cervical and the others the page counts), roots (anterior or ventral, posterior or dorsal, dorsal root ganglion), rootlets, the branches after the vertebral column (anterior ramus, posterior ramus, meningeal and the others page 35 names) | under `spinalnerves`; a `group` "Spinal nerve parts" and a `group` "Branches"; `part` rows |
| 36 to 38 | nerve plexuses and the cervical (C1 to C5), brachial, lumbar (L1 to L4) and sacral and coccygeal plexuses as the pages name them, with what each supplies | under `plexuses`; one `group` row per plexus (`w5_cervical_plexus`, `w5_brachial_plexus` and so on; do **not** duplicate `w3_brachial`: Task 10 decides how the two meet); `line` = the segments and the slide's words about what it supplies |
| 39 | cutaneous innervation and dermatomes | under `dermatomes`; `part` rows only for the named dermatome levels or regions the text lists |
| 40 to 42 | clinical conditions (spinal meningitis, sciatica, shingles) | **no rows** (settled) |

- [ ] **Step 2: Run the checks**

```bash
node work/revision-check.mjs | tail -40
node work/revise-pure-check.mjs | tail -2
```

Expected: `ALL PASS`.

- [ ] **Step 3: Commit**

```bash
git add outputs/revision/hss2011-leaves-w5.js
git commit -m "feat(revise): Week 5 spinal cord, tracts, nerves, plexuses and dermatomes as leaves

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

Report picture-only pages (23, 31) and the tract table if it was not text.

---

### Task 4: Week 6 the brain, meninges, ventricles and brain barriers

**Files:**
- Create: `outputs/revision/hss2011-leaves-w6.js`
- Modify: `outputs/revision/registry.js`

**Source:** `hss.l6.2026`, pages 4 to 15. **Parents (week 6):** `cerebrum`, `cerebellum`,
`brainstem` for the overview's three parts; `meninges`, `csf`, `bbb`.

- [ ] **Step 1: Create the file with its header and one row, and wire the registry**

Create `outputs/revision/hss2011-leaves-w6.js`:

```js
/*
 * HSS2011 · Week 6 leaves — the brain and the cranial nerves.
 *
 * Read off 2627_M2_L6_brain_cranial_N.pdf (hss.l6.2026), page by page. One row per
 * structure the page text names, in the slide's words; a structure only in a picture has
 * no row. Row kinds and fields: outputs/revision/leaves.js. Recipe:
 * docs/superpowers/plans/2026-10-19-revise-depth-w5-w7.md.
 */
const L6 = 'hss.l6.2026';

export const SOURCES = {
  [L6]: 'Week 6 brain and cranial-nerve slides',
};

export const ROWS = [
{ k: 'group', id: 'w6_brainparts', l: 'Overview of the Brain', parent: 'cerebrum', w: 6, match: 'overview of the brain', src: [L6, 4] },
];
```

In `registry.js` add `import * as hss2011W6 from './hss2011-leaves-w6.js';` and append
`...hss2011W6.ROWS` and `...hss2011W6.SOURCES` to the two merge lines. Run
`node work/revision-check.mjs | tail -3`: expect `ALL PASS`. Change `[L6, 4]` to `[L6, 56]`,
expect the source gate to name `w6_brainparts`, then change it back.

- [ ] **Step 2: Write the rows with Recipe R**

| Pages | Covers | Notes for the rows |
| --- | --- | --- |
| 4 to 8 | the brain's three major parts (cerebrum, cerebellum, brainstem) and what the page says of each (sizes, hemispheres, position); gray and white matter in the brain (cortex, nuclei) | keep the three parts as `part` rows in one `group` "Parts of the brain" **under their own existing topics where a topic matches** (cerebrum → `cerebrum`, cerebellum → `cerebellum`, brainstem → `brainstem`): so write them as `group` rows `w6_cerebrum`, `w6_cerebellum`, `w6_brainstem` with `parent` the matching topic; gray matter and white matter `part` rows under `cerebrum` |
| 9 to 11 | the meninges: dura mater (its two layers, the folds that separate the brain's parts), arachnoid mater, pia mater, the spaces (subarachnoid, epidural and any the page names) | under `meninges`; `part` rows; the dural folds (falx cerebri, tentorium cerebelli and the others page 11 names) as `part` rows; the three layer rows from Task 3 already exist for the spinal cord: **reuse them with `links`** (`links: { w5_dura: 'also covers the spinal cord' }`) only if the page says so, otherwise write the brain's own rows with distinct ids |
| 12 to 14 | the ventricles (four chambers: the two lateral, the third, the fourth, as the page names them), the connecting passages (interventricular foramen, cerebral aqueduct and the others), the choroid plexus, cerebrospinal fluid and its functions (buoyancy and the others page 14 numbers) | under `csf`; a `group` "Ventricular system" with `part` rows for each ventricle and passage; CSF and the choroid plexus as `part` rows; the functions go in CSF's `line` only if they fit in 12 words, otherwise one `part` row per function the page numbers |
| 15 | the brain barrier system: the blood-brain barrier, the blood-CSF barrier and the structures the page names (astrocytes' end-feet, tight junctions and the others) | under `bbb`; `part` rows; `links` to Week 2's junction rows are added in Task 10 |

- [ ] **Step 3: Run the checks**

```bash
node work/revision-check.mjs | tail -40
node work/revise-pure-check.mjs | tail -2
```

Expected: `ALL PASS`.

- [ ] **Step 4: Commit**

```bash
git add outputs/revision/hss2011-leaves-w6.js outputs/revision/registry.js
git commit -m "feat(revise): Week 6 brain overview, meninges, ventricles and brain barriers as leaves

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Week 6 brainstem and cerebellum

**Files:** modify `outputs/revision/hss2011-leaves-w6.js`.

**Source:** `hss.l6.2026`, pages 17 to 25. **Parents (week 6):** `brainstem`,
`reticular`, `cerebellum`.

- [ ] **Step 1: Write the rows with Recipe R**

| Pages | Covers | Notes for the rows |
| --- | --- | --- |
| 17 | the brainstem consists of the midbrain, pons and medulla oblongata | the three parts are `group` rows under `w6_brainstem` |
| 18 to 19 | the medulla oblongata: what it contains (the page's list of nerve fibres, nuclei, the pyramids and the other structures it names) and the autonomic centres it houses (cardiovascular, respiratory and the others page 19 lists) | `part` rows under the medulla; `line` = the slide's function; the cardiovascular centre may carry `links` to the heart-rate regulation row in the existing topics only if a topic exists (if not, no link) |
| 20 | the pons ("bridge"), the cerebellar peduncles and the nuclei the page names | `part` rows |
| 21 to 22 | the midbrain: surface (superior and inferior colliculus, the cerebral peduncles and the others) and internal structures (red nuclei, substantia nigra and the others page 22 names) with their jobs | `part` rows; `line` = the slide's job (for example "visual reflex") |
| 23 | reticular formation | one `part` row under `reticular` and the rows for what the page says it contains, if any |
| 24 to 25 | the cerebellum: two hemispheres, the vermis, the peduncles, the lobes, the cortex and the nuclei the pages name, and its primary functions the page lists (motor coordination and the rest) | `part` rows under `w6_cerebellum`; `line` = the slide's function |

- [ ] **Step 2: Run the checks**

```bash
node work/revision-check.mjs | tail -40
node work/revise-pure-check.mjs | tail -2
```

Expected: `ALL PASS`.

- [ ] **Step 3: Commit**

```bash
git add outputs/revision/hss2011-leaves-w6.js
git commit -m "feat(revise): Week 6 medulla, pons, midbrain, reticular formation and cerebellum as leaves

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

Report picture-only pages (16, 17's figure).

---

### Task 6: Week 6 diencephalon and cerebrum

**Files:** modify `outputs/revision/hss2011-leaves-w6.js`.

**Source:** `hss.l6.2026`, pages 27 to 39. **Parents (week 6):** `thalamus`,
`hypothalamus`, `cerebrum`, `cortexareas`, `basalnuclei`, `limbic`, `tracts`.

- [ ] **Step 1: Write the rows with Recipe R**

| Pages | Covers | Notes for the rows |
| --- | --- | --- |
| 27 to 29 | the diencephalon; the thalamus (final relay point for ascending sensory information, its nuclei if named); the hypothalamus (walls and floor of the third ventricle, the nuclei or structures the page names, the pituitary link) | `part` rows under `thalamus` and `hypothalamus`; `links: { w6_cortex: 'relay to the cerebral cortex' }` style links only in the slide's words, e.g. from the thalamus to the cerebral cortex row and from the hypothalamus to the pituitary row if the page says so (write the target row first) |
| 30 to 31 | gross anatomy of the cerebrum: gyri, sulci, fissures (the longitudinal fissure and the others), the lobes (the page says five: frontal, parietal, temporal, occipital, insula) and what each does | under `cerebrum`; a `group` "Lobes of the cerebrum" with five `part` rows, `line` = the slide's function; the fissure and sulcus rows as `part` rows |
| 32 | white matter of the cerebrum: projection tracts, association tracts, commissural tracts (the corpus callosum and the others page 32 names) | under `tracts`; `part` rows; `line` = what the slide says each connects |
| 33 | limbic system (emotion and learning, the key components the page lists) | under `limbic`; `part` rows (hippocampus, amygdala and the others the text names) |
| 34 | basal nuclei (lateral to the thalamus; the components the page lists) and what they do | under `basalnuclei`; `part` rows |
| 35 to 39 | primary motor and sensory cortex, the integrative centres (general interpretive area, speech centre or Broca's area and the others), higher functions (pages 36 and 37 as text names) | under `cortexareas`; `part` rows for each area the text names; `links` from a cortical area to its lobe row (the slide states which lobe each is in) |

- [ ] **Step 2: Run the checks**

```bash
node work/revision-check.mjs | tail -40
node work/revise-pure-check.mjs | tail -2
```

Expected: `ALL PASS`.

- [ ] **Step 3: Commit**

```bash
git add outputs/revision/hss2011-leaves-w6.js
git commit -m "feat(revise): Week 6 thalamus, hypothalamus, lobes, white matter, limbic system, basal nuclei and cortical areas as leaves

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

Report picture-only pages (26, 36).

---

### Task 7: Week 7 receptors, the senses, the ear and the eye

**Files:**
- Create: `outputs/revision/hss2011-leaves-w7.js`
- Modify: `outputs/revision/registry.js`

**Source:** `hss.l7.2026`, pages 4 to 45. **Parents (week 7):** `receptors`, `sensorypath`,
`taste`, `smell`, `ear_hearing`, `ear_balance`, `eye`, `visualpath`. The existing `orbit`
topic and the Week 4 extraocular rows already exist; the eye's accessory structures link to
them in Task 9 and 10, not here.

- [ ] **Step 1: Create the file with its header and one row, and wire the registry**

Create `outputs/revision/hss2011-leaves-w7.js`:

```js
/*
 * HSS2011 · Week 7 leaves — receptors, the special senses, the autonomic nervous system.
 *
 * Read off 2627_M2_L7_ANS_spec_sen.pdf (hss.l7.2026), page by page. One row per
 * structure the page text names, in the slide's words; a structure only in a picture has
 * no row. Row kinds and fields: outputs/revision/leaves.js. Recipe:
 * docs/superpowers/plans/2026-10-19-revise-depth-w5-w7.md.
 */
const L7 = 'hss.l7.2026';

export const SOURCES = {
  [L7]: 'Week 7 senses and autonomic slides',
};

export const ROWS = [
{ k: 'group', id: 'w7_receptortypes', l: 'Classification of receptors', parent: 'receptors', w: 7, match: 'receptors', src: [L7, 5] },
];
```

In `registry.js` add `import * as hss2011W7 from './hss2011-leaves-w7.js';` and append
`...hss2011W7.ROWS` and `...hss2011W7.SOURCES`. Run `node work/revision-check.mjs | tail -3`:
expect `ALL PASS`. Change `[L7, 5]` to `[L7, 55]`, expect the source gate to name
`w7_receptortypes`, then change it back.

- [ ] **Step 2: Write the rows with Recipe R**

| Pages | Covers | Notes for the rows |
| --- | --- | --- |
| 4 to 7 | sensory receptors; classification by modality (thermo-, chemo-, mechano-, photo-, noci- and the others the page prefixes), by origin of stimuli (exteroceptors, interoceptors, proprioceptors), the general and special senses | `group`s "By modality" and "By origin of stimuli"; `part` rows |
| 8 to 14 | general senses: nociceptors, mechanoreceptors (tactile, baroreceptors and proprioceptors as the pages list), the tactile receptor types (free nerve endings, root hair plexus, tactile discs, tactile corpuscles, lamellated corpuscles, Ruffini corpuscles, as the pages name them), thermoreceptors, the receptive field, the sensory projection pathway on page 14 | `part` rows; `line` = the slide's one-line job; a receptor's `links` to the `sensorypath` topic only where page 14 names it |
| 16 to 22 | gustation: lingual papillae (filiform, fungiform, circumvallate and foliate as the pages name them), taste buds and their cells, the five primary tastes, the cranial nerves that carry taste (page 22 names them in text; the nerve rows come in Task 9, so write a `line` now and the links in Task 9) | under `taste`; a `group` each for "Lingual papillae", "Taste buds" and "Primary tastes"; `part` rows |
| 23 to 25 | olfaction: the olfactory epithelium, receptor cells, the olfactory bulb and tract, the primary olfactory cortex, the glomeruli and whatever the pages name | under `smell`; `part` rows; `links` from the bulb to the tract in the slide's order |
| 27 to 34 | the ear: outer, middle and inner ear and their parts (the auricle, the external acoustic meatus, the tympanic membrane, the auditory ossicles and their names, the auditory tube, the bony labyrinth, the cochlea, the spiral organ and its cells, the vestibule, the saccule and utricle, the semicircular ducts and the other names the pages give); auditory function (page 32's sequence) | the hearing rows under `ear_hearing`, the saccule, utricle and semicircular ducts under `ear_balance`; a `group` each for outer, middle and inner ear; the three ossicles as `bone` rows; a `links` chain along the slide's sound path (tympanic membrane → ossicles → …) with the slide's words as the reasons |
| 36 to 39 | accessory structures of the orbit: the orbit, the eyelids, the conjunctiva, the lacrimal apparatus (gland, canaliculi, sac, duct) and the extrinsic eye muscles the page lists | a `group` "Accessory structures of the eye" under `eye`; `part` rows; the extrinsic muscles are **already** Week 4 rows (`extraocular`): do not write them again, write `links` from this group to the Week 4 `extraocular` topic row id with the reason the page gives |
| 40 to 44 | the eyeball: three tunics (fibrous: sclera and cornea; vascular: choroid, ciliary body, iris; neural: retina), the optical components (cornea, lens, aqueous humour, vitreous body and the chambers the page names), the neural components (retina layers, photoreceptors, rods, cones, bipolar and ganglion cells, the optic disc and the macula or fovea as the pages name them) | under `eye`; a `group` each for "Fibrous tunic", "Vascular tunic", "Neural tunic (retina)", "Optical components"; `part` rows; rods and cones are photoreceptors: put them under a `group` "Photoreceptors" |
| 45 | the visual projection pathway: first-, second- and third-order neurons, the optic nerve, chiasm, tract, the lateral geniculate nucleus and the visual cortex as the page names them | under `visualpath`; `part` rows; `links` along the slide's order with its words; the thalamus, the occipital lobe and the visual cortex links go to the Task 6 rows (`w6_thalamus` if you named it so, the occipital lobe row) |

- [ ] **Step 3: Run the checks**

```bash
node work/revision-check.mjs | tail -40
node work/revise-pure-check.mjs | tail -2
```

Expected: `ALL PASS`.

- [ ] **Step 4: Commit**

```bash
git add outputs/revision/hss2011-leaves-w7.js outputs/revision/registry.js
git commit -m "feat(revise): Week 7 receptors, taste, smell, the ear and the eye as leaves

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

Report picture-only pages (15, 26, 35).

---

### Task 8: Week 7 the autonomic nervous system

**Files:** modify `outputs/revision/hss2011-leaves-w7.js`.

**Source:** `hss.l7.2026`, pages 47 to 53. **Parents (week 7):** `ans`, `symp`, `parasymp`,
`reflexes` for the visceral reflex rows (`reflexes` starts in week 5; a week 7 row under it
is fine).

- [ ] **Step 1: Write the rows with Recipe R**

| Pages | Covers | Notes for the rows |
| --- | --- | --- |
| 47 | what the ANS regulates | one `line` on the `ans` group row `w7_ans_overview`, if the text lists the processes |
| 48 to 49 | visceral reflexes: the parts of a visceral reflex arc, the baroreflex example on page 49 | under `reflexes`; `part` rows for the arc parts and the baroreflex; `links` along the slide's chain |
| 50 | divisions of the ANS (sympathetic, parasympathetic, and the enteric division if the page names it) | `group` rows under `ans` |
| 51 | the ANS motor pathway differs from the somatic: the preganglionic neuron, the autonomic ganglion, the postganglionic neuron, the effector | `part` rows under `ans` |
| 52 | sympathetic division, thoracolumbar: where its nuclei arise, the sympathetic chain (paravertebral) ganglia, the collateral (prevertebral) ganglia, the adrenal medulla and the neurotransmitters the page names | under `symp`; `part` rows; `line` = the slide's words |
| 53 | parasympathetic division, craniosacral: its cranial and sacral outflow, the terminal ganglia and the neurotransmitter; the cranial nerves that carry it (page 53's text names them: Task 9 turns that into links) | under `parasymp`; `part` rows |

- [ ] **Step 2: Run the checks**

```bash
node work/revision-check.mjs | tail -40
node work/revise-pure-check.mjs | tail -2
```

Expected: `ALL PASS`.

- [ ] **Step 3: Commit**

```bash
git add outputs/revision/hss2011-leaves-w7.js
git commit -m "feat(revise): Week 7 autonomic nervous system and visceral reflexes as leaves

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

Report picture-only page 46.

---

### Task 9: Week 6 the twelve cranial nerves

Written after the senses and the Week 4 head muscles, so every nerve can point at rows that
exist.

**Files:** modify `outputs/revision/hss2011-leaves-w6.js`.

**Source:** `hss.l6.2026`, pages 40 to 55 (and `hss.l7.2026` pages 22 and 53 for the taste
and parasympathetic links). **Parent (week 6):** `cranialnerves`.

- [ ] **Step 1: Write the rows with Recipe R**

Pages 40 to 44 list the twelve by number and name, the mnemonic and the sensory, motor and
mixed classification (the mnemonic is not a structure). Pages 45 to 55 give each nerve its
function. Write **one `nerve` row per cranial nerve**: olfactory (I), optic (II), oculomotor
(III), trochlear (IV), trigeminal (V, with its divisions as `part` rows if the page names
them), abducens (VI), facial (VII), vestibulocochlear (VIII), glossopharyngeal (IX), vagus
(X), accessory (XI), hypoglossal (XII). `l` is the slide's name, `match` the Roman-numeral
form the page uses ("CN III") if the name alone is not on every cited page. `line` = sensory,
motor or mixed and the slide's function in 12 words.

`supplies` (every nerve needs at least one real target, the reason in the slide's words)
points at rows that exist:

| Nerve | Targets the page names | Row ids to look for |
| --- | --- | --- |
| I | olfactory epithelium, the olfactory bulb | Week 7 smell rows (Task 7) |
| II | the retina | Week 7 eye rows (Task 7) |
| III, IV, VI | the extraocular muscles (pages 48 and 49: which nerve drives which) | the Week 4 `extraocular` muscle rows (Task 9 of Plan 2) |
| V | the muscles of mastication, the face, the teeth the page names | the Week 4 mastication muscle rows |
| VII | the muscles of facial expression and the taste the page gives | Week 4 face and neck rows, the taste rows (Task 7) |
| VIII | the cochlea, the vestibule and semicircular ducts | Week 7 ear rows (Task 7) |
| IX, X | the structures the pages name (the tongue, the pharynx, the heart and viscera) | the nearest rows that exist: the tongue row (`w4_tongue`), the taste rows, the `parasymp` group (page 53 names the vagus) |
| XI | trapezius and sternocleidomastoid (page 50) | the Week 4 neck rows and the trapezius row |
| XII | the tongue muscles (page 50) | the Week 4 tongue rows |

If a target the page names has no row, point `supplies` at the nearest **topic** (for
example `taste`, `eye`, `parasymp`) and say in the report which row was missing. Do not
invent a row.

- [ ] **Step 2: Run the checks**

```bash
node work/revision-check.mjs | tail -40
node work/revise-pure-check.mjs | tail -2
```

Expected: `ALL PASS`.

- [ ] **Step 3: Commit**

```bash
git add outputs/revision/hss2011-leaves-w6.js
git commit -m "feat(revise): the twelve cranial nerves as leaves, linked to the muscles and organs they serve

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

Report picture-only pages (42, 49, 53) and every target that fell back to a topic.

---

### Task 10: Cross-week links

Earlier weeks' rows meet the nervous-system rows. These edits are field additions on
existing rows, in files written earlier.

**Files:** modify `outputs/revision/hss2011-leaves-w2.js`, `-w3.js`, `-w1.js`, `-w4.js`,
and `-w5.js` as the cases below say.

Rule for every link below: add it only if the page text of the source named in the row
**states the relationship in words** (read the page: `node work/query.mjs pages <source> <page>`).
If the text does not, do not add it, and list it in the report as "not stated".

- [ ] **Step 1: Nerves to their plexuses**

For each nerve row in the Week 2 file (`w2_n_supglut`, `w2_n_infglut`, `w2_n_femoral`,
`w2_n_obturator`, `w2_n_sciatic`, `w2_n_tibial`, `w2_n_comperon`) and the Week 3 file (the
median, ulnar and radial rows): if the plexus slide (`hss.l5.2026` pages 36 to 38) names the
nerve under a plexus, set `from: '<that plexus row id>'` on the nerve. If a Week 2 or 3
slide already ties the nerve to a plexus, keep that and add nothing. The Week 3 brachial
plexus row (`w3_brachial`) and Week 5's `w5_brachial_plexus` are the same structure: give
`w3_brachial` the field `links: { w5_brachial_plexus: 'same plexus, Week 5 lecture' }` and
no more; do not merge or delete either row.

- [ ] **Step 2: Tissue and junction rows to the nervous-system rows they return as**

The existing topic note on `junctions` says tight junctions return as the blood-brain
barrier (Week 6) and gap junctions as the electrical synapse (Week 5). For each junction row
of Week 1 and 2 (`hss2011-leaves-w1.js`): if the Week 5 or 6 slide (`hss.l5.2026` page 20,
`hss.l6.2026` page 15) names the same junction type, add `links: { <barrier or synapse row>:
'<the slide's words>' }`. The nervous-tissue rows of Week 1 and 2 link to the neuron and glia
group rows only where the Week 5 slide uses the same tissue name.

- [ ] **Step 3: Skull openings and the cranial nerves**

Where a Week 4 skull row (optic canal, the orbital fissures, foramen magnum, internal
acoustic meatus) is named on a Week 6 cranial-nerve page as the way a nerve passes (read
pages 45 to 55), add `links` from the skull row to the nerve row, reason in the slide's words.
If no Week 6 page says it, add nothing.

- [ ] **Step 4: Run the checks**

```bash
node work/revision-check.mjs | tail -40
node work/revise-pure-check.mjs | tail -2
```

Expected: `ALL PASS`.

- [ ] **Step 5: Commit**

```bash
git add outputs/revision/hss2011-leaves-w1.js outputs/revision/hss2011-leaves-w2.js outputs/revision/hss2011-leaves-w3.js outputs/revision/hss2011-leaves-w4.js outputs/revision/hss2011-leaves-w5.js
git commit -m "feat(revise): link the nerves, junctions and skull openings of earlier weeks to the nervous-system rows

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

(Stage only the files you changed, after `git diff` on each.) Report every link you did
not add because the page does not state it.

---

### Task 11: Reading help, the shell, the whole check set and the browser

**Files:** possibly `outputs/term-gloss.js`; `outputs/sw.js`; `docs/CODEMAP.md`;
`outputs/README.md`; `CLAUDE.md`; `docs/TRAPS.md`; baselines.

- [ ] **Step 1: Glosses**

Run `node work/gloss-coverage-check.mjs`. It passes with warnings. List the underlined
words from **this plan's rows** that have no gloss. Run `git diff outputs/term-gloss.js`
first; if it shows hunks you did not write, **stop and ask the owner**. Otherwise add one
entry per such word in the "whole words" section, in the file's format
`word: ['Plain meaning in one line.', '繁體中文'],`, restating the structure (what it is,
where it sits), not new clinical content. Re-run until `ALL PASS`.

- [ ] **Step 2: The shell**

In `outputs/sw.js` bump `CACHE_VERSION` by one and add, next to `hss2011-leaves-w4.js`:

```js
  './revision/hss2011-leaves-w5.js',
  './revision/hss2011-leaves-w6.js',
  './revision/hss2011-leaves-w7.js',
```

- [ ] **Step 3: Run the whole after-every-edit set**

```bash
node work/shell-check.mjs
node work/load-check.mjs
node work/syntax-check.mjs
node work/binding-check.mjs
node work/bridge-check.mjs
node work/source-check.mjs
node work/revision-check.mjs
node work/revise-pure-check.mjs
node work/gloss-coverage-check.mjs
node work/text-size-check.mjs
node work/schedule-check.mjs
node work/data-index-check.mjs
node work/codemap.mjs
node work/codemap-check.mjs
node work/baseline.mjs --check
```

Expected: every one passes. `baseline --check` may differ on `ui-strings` and
`gloss-coverage-check` (new row names and glosses). For each that differs, diff it against
its baseline, read the lines, and only if they are all this plan's rows and glosses run
`node work/baseline.mjs` and stage the baseline files you read.

- [ ] **Step 4: Browser check at phone and iPad size**

Start the preview (`preview_start` name `study-studio`), open
`http://localhost:8420/radiography-study-studio.html`, clear the service worker as in
Plan 1's Task 10 Step 1, then at 390 × 844 and 820 × 1180 with week 7 chosen:

- Map, Find "thalamus": its row is there; tap it; the dots and list show what the slide
  links it to. Find "hippocampus", "oculomotor", "cochlea", "sympathetic chain": each is a row.
- Cerebrum opens into the lobes, the limbic system, the basal nuclei and the cortical
  areas; Cranial nerves opens into the twelve; every cranial nerve's notes name its
  function.
- Brain 3D: centre on Thalamus, then on the Oculomotor nerve (its balls are the
  extraocular muscles), then on the Lateral rectus row: the hub shows labelled balls,
  numbered dots, and the list matches. Centre on the Vagus nerve: "+N more in the list"
  shows when it has more than 14 links.
- Change the week chip to W5, then W6: rows from later weeks disappear, the centre falls back
  to a topic taught that week, and the trail names no hidden topic.
- Tap "Open all" on the Map and note `document.querySelectorAll('#rvMm .markmap-node').length`
  and whether the page still pans smoothly. If the phone freezes for more than 3 seconds,
  **stop and tell the owner** the number and what you saw; do not hide rows.
- `read_console_messages` with `onlyErrors: true`: no new errors beyond the known
  `translate(NaN,NaN)` Markmap message when the week changes while Brain 3D shows
  (recorded in `docs/TRAPS.md`).
- Reset the viewport with `resize_window` preset `desktop`.

- [ ] **Step 5: Record it**

Add to `outputs/README.md`, under the Revise section: Weeks 5 to 7 now go down to single
structures (the leaf count from `revision-check`), the three decks were taken through
intake as `hss.l5.2026`, `hss.l6.2026` and `hss.l7.2026`, what was left because it is only in
a picture (collect the "image-only" reports of Tasks 2 to 9 into one list) and the links
not added because a page does not state them (Task 10). In `CLAUDE.md`, change the line that
says the depth covers Weeks 1 to 4 to say Weeks 1 to 7, and keep "Only HSS2011 has
revision data so far". Keep each file's own line endings.

- [ ] **Step 6: Commit**

```bash
git add outputs/term-gloss.js outputs/sw.js docs/CODEMAP.md outputs/README.md CLAUDE.md work/baselines
git commit -m "chore(revise): precache the W5 to W7 leaf files; glosses, code map, baselines, notes

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

(Add only the files that actually changed, after `git diff` on each. Do not push: tell the
owner the work is committed locally and ask before pushing.)

---

## After this plan

Revise then has leaf depth for every HSS2011 teaching week with a deck. **ABCT2326 Human
Physiology** still needs its own spec: Revise has no physiology data and no subject
switch; the machinery here carries over, but its row kinds are anatomy shapes (see the end
of Plan 1).
