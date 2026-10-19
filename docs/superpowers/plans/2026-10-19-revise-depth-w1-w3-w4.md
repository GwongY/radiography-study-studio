# Revise depth, plan 2 of 3: Weeks 1, 3 and 4 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** The Revise Map goes down to single structures for Week 1 (bone histology, joint
types, ligaments and cartilage, muscle organisation, body tissues and cell junctions, the
body-orientation words), Week 3 (the whole upper limb) and Week 4 (the skull and its
bones, orbit, vertebral column, head, neck and trunk muscles, extraocular muscles), each
name checked against the slide page it cites.

**Architecture:** Nothing new to build except one small schema change (Task 1). Plan 1
(`2026-10-19-revise-depth-and-3d-hub.md`, done) built `leaves.js`, the numbered links list
and the 3D hub. This plan only adds **rows**: `outputs/revision/hss2011-leaves-w1.js`,
`-w3.js` and `-w4.js`, merged in `registry.js` next to `-w2.js`. The merge derives the
links, the week rule hides what is not yet taught, and `work/revision-check.mjs` holds
every name to a page of the deck it cites. Plan 3 (Weeks 5 to 7, including the brain and
the cranial nerves) follows.

**Tech Stack:** Plain ES modules, no build step, Node 24 for `work/` checks.

**Spec:** `docs/superpowers/specs/2026-10-19-revise-depth-and-3d-hub.md`

---

## Before you start (every task)

- **Another session may be editing this tree.** Run `git status --short` first. Never
  `git add -A` or `git add .`; add paths one by one, and run `git diff <file>` on each
  before committing. If a file you must edit shows hunks you did not write, **stop and ask
  the owner**.
- **Line endings:** `outputs/revision/*.js` and `work/*.mjs` are LF, and so are new files.
  `CLAUDE.md`, `docs/TRAPS.md` and `outputs/README.md` are CRLF in the working copy; the
  Edit tool keeps a file's own endings.
- Commits are local. **Do not push** (pushing `master` publishes the site). End every
  commit message with `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`.
- **Never loosen a check to make it pass.** A failing source gate means the row's page or
  `match` is wrong, or the structure is not in the text. Fix the row. Do not weaken
  `match` to a word that is on every page, and do not delete a check.
- **Settled, do not reopen:** the Map shows structures the slides name. It does not add
  anatomy from a textbook, and it does not add teaching prose; a row's `line` is what the
  slide says, in 12 words or fewer. The movement-vocabulary words (flexion, abduction and
  so on) are **not** given rows: they already appear as the action on every muscle row.
- Known red before this plan: none. After Plan 1, `node work/baseline.mjs --check` passes.

## Recipe R: turning slide pages into rows

Every data task below runs this recipe with its own parameters (source id, pages, parent
table). Read it once; the tasks only say what is different.

1. **Read the pages.** `node work/query.mjs pages <source> <from>-<to>` prints the cached
   text of those pages, one page at a time. This is the only text you may use. Pages the
   plan lists as *thin* hold a picture and almost no text.
2. **List the structures.** Every structure the page text names as something to learn: a
   bone, a bony landmark, a muscle, a joint, a nerve, a region, a tissue, a cell, a part of
   a joint. Skip figure credits, author and reference lines, questions, clinical
   conditions, and anything that is not a structure.
3. **Write one row per structure** in the file the task names, in the slide's reading
   order, after any row it hangs from (a row's parent must be a topic from the task's
   parent table, or an earlier row):
   - `k` is `group` (a heading that holds others), `bone`, `joint`, `muscle`, `nerve` or
     `part` (anything else: a landmark, a tissue, a cell, a ligament, a membrane).
   - `id` is `w<week>_<short>`, unique across all `hss2011-leaves-*.js` files. Before you
     use one, run `grep -rn "id: 'w1_x'" outputs/revision/` with your id.
   - `l` is the name as the slide writes it. `src` is `[source, page, page…]`: every page
     where the name is on the page text, best page first. `match` is only for a slide that
     words it differently from `l` (a plural, an abbreviation); it must be a real name
     fragment of at least 4 characters.
   - `w` is the teaching week the app already gives the parent topic (never earlier than
     it): W1 rows 1, upper-limb rows 3, head, neck and trunk rows 4. A row never gets an
     earlier week than its parent.
   - `line` is what the slide says about it, 12 words or fewer, from the page text. Leave
     it out when the slide only names the structure.
   - A muscle has `joints: { jointRowId: 'action in the slide's words' }`, or `moves:
     { rowId: 'action' }` when what it moves is a bone, part or group rather than a joint
     (the eyeball, the tongue, the mandible). Add `note` for what the slide adds (an
     origin, "stabilises the pelvis"). A bone has `joints: [jointRowId…]` for the joints
     the slide says it forms. A nerve has `supplies: { rowId: 'reason' }` and `from` for
     its plexus.
   - `links: { rowId: 'reason' }` only where the slide states the relationship in words.
     The reason is the slide's words. Never add a link from textbook knowledge.
4. **If a structure is only in a picture** (it is on no page's text), do not write the
   row and do not guess a page. Put it in the "image-only, not written" list in the
   task's report. The owner decides whether to read the picture.
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
| `outputs/revision/leaves.js` | modify | `moves` for muscles that move something that is not a joint |
| `work/revise-pure-check.mjs` | modify | The `moves` merge, with a known answer |
| `work/revision-check.mjs` | modify | `moves` targets, and what counts as a current source |
| `outputs/revision/hss2011-leaves-w1.js` | create | W1 rows (Tasks 2 to 4) |
| `outputs/revision/hss2011-leaves-w3.js` | create | W3 rows (Tasks 5, 6) |
| `outputs/revision/hss2011-leaves-w4.js` | create | W4 rows (Tasks 7 to 9) |
| `outputs/revision/registry.js` | modify | Merges the three new row files |
| `outputs/term-gloss.js` | modify | Glosses for new words (Task 10) |
| `docs/CODEMAP.md`, `outputs/sw.js`, docs | modify | Task 10 |

## Source pages (measured on the cached text)

| Source id | Deck | Pages | Thin pages (a picture) |
| --- | --- | --- | --- |
| `hss.msk.2026` | W1 Musculoskeletal system | 39 | 12, 26, 27, 39 |
| `hss.w1.2026` | Week 1 orientation | 18 | 4, 5, 8 |
| `hss.tut.tissues` | Week 2 tutorial: body tissues | 24 | 1, 4, 9, 23 |
| `hss.ul.2026` | Upper limb | 29 | 4, 5, 24 |
| `hss.hnt.2026` | Head, neck and trunk | 36 | 2, 3, 4, 13, 21, 25 |
| `hss.move.2026` | Movement terms (self-study) | 10 | 1, 3, 5, 6, 10 (not used) |

The existing Map topics rows hang from, with their week:

```
tissues W2 · epithelium W2,6,7 · connective W1,2,6,7 · junctions W2,5,6
orient W1 · bone W1 (skull W4, orbit W4,7, vertebrae W4, ll_bones W2, ul_bones W3)
joints W1 · ligcart W1,2
musclestruct W1 (motorunit W1,5 · fibretypes W1 · muscleroles W2 · ll_muscles W2
  · ul_muscles W3 · headneck_muscles W4 (extraocular W4,6) · trunk_muscles W4)
```

A topic's first week is its smallest week. A row under `tissues` is therefore week 2 or
later; a row under `connective` can be week 1.

---

### Task 0: Pre-flight

**Files:** none changed.

- [ ] **Step 1: Record the starting state**

```bash
git status --short
git log --oneline -3
node work/revision-check.mjs | tail -2
node work/revise-pure-check.mjs | tail -2
node work/gloss-coverage-check.mjs | tail -2
node work/baseline.mjs --check | tail -2
```

Expected: the four checks print `ALL PASS` and `git status` is empty. Anything else is
someone else's work: write it down and do not "fix" it.

- [ ] **Step 2: Make sure the sources are readable**

```bash
node work/query.mjs pages hss.hnt.2026 5
node work/query.mjs pages hss.tut.tissues 1-3
```

Expected: the first prints the cranial and facial bone list (page 5); the second prints
text. If `hss.tut.tissues` prints nothing, **stop and ask the owner**: its rows cannot be
checked against a page.

---

### Task 1: `moves`, and what counts as a current source

Plan 1 let a muscle's `joints` point only at joint rows. The extraocular muscles move the
eyeball, the tongue muscles move the tongue and the mastication muscles move the mandible,
and none of those is a joint. Plan 1 also required every row to cite a source id ending
`.2026`, but the Week 2 tissues tutorial (`hss.tut.tissues`) is a current file with a
different id shape. Both are widened here, on purpose and with a test, not worked around.

**Files:**
- Modify: `outputs/revision/leaves.js`
- Modify: `work/revise-pure-check.mjs`
- Modify: `work/revision-check.mjs`

- [ ] **Step 1: Add the failing check**

In `work/revise-pure-check.mjs`, insert this immediately before the line
`ok(mergeLeaves(base, []).EDGES.length === 1, 'no rows, no change');`:

```js
const eye = { k: 'muscle', id: 'sr', l: 'Superior rectus', parent: 'm', w: 2, moves: { ey: 'elevation; adduction' }, note: 'cranial nerve III', src: ['x.2026', 1] };
const mv = mergeLeaves(base, [{ k: 'part', id: 'ey', l: 'Eyeball', parent: 'm', w: 2, src: ['x.2026', 1] }, eye]);
ok(mv.EDGES.some((e) => pairKey(e[0], e[1]) === pairKey('sr', 'ey') && e[2] === 'elevation; adduction'), 'a muscle links to a structure it moves that is not a joint, with the action as the reason');
ok(leafLine(eye) === 'elevation; adduction · cranial nerve III', "a muscle's one line carries what it moves as well as the joints it acts at");
```

- [ ] **Step 2: Run it to see it fail**

Run: `node work/revise-pure-check.mjs`
Expected: both new lines `FAIL`.

- [ ] **Step 3: Write the merge change**

In `outputs/revision/leaves.js`:

Replace the line
`  if (row.k === 'muscle') return [Object.values(row.joints || {}).join('; '), row.note].filter(Boolean).join(' · ');`
with
`  if (row.k === 'muscle') return [Object.values({ ...(row.joints || {}), ...(row.moves || {}) }).join('; '), row.note].filter(Boolean).join(' · ');`

Replace the line
`    if (row.k === 'muscle') for (const [j, act] of Object.entries(row.joints || {})) link(row.id, j, act);`
with
```js
    if (row.k === 'muscle') {
      for (const [j, act] of Object.entries(row.joints || {})) link(row.id, j, act);
      for (const [t, act] of Object.entries(row.moves || {})) link(row.id, t, act);
    }
```

In the header comment, under the line starting ` *   joints   muscle:` add:

```
 *   moves    muscle: { id: 'action' } on a structure that is not a joint (the eyeball, the tongue, the mandible)
```

- [ ] **Step 4: Run the pure check**

Run: `node work/revise-pure-check.mjs`
Expected: `ALL PASS`.

- [ ] **Step 5: Widen the two data checks**

In `work/revision-check.mjs`, add this import under the existing imports:

```js
import { SOURCE_FILES } from '../outputs/study/course-data.js';
```

Replace the line that starts `ok(leafRows.filter((r) => r.k === 'muscle').every(` (the
"moves at least one joint row" check) with:

```js
    const movesTarget = (id) => ['bone', 'part', 'group'].includes(kindOf.get(id));
    ok(leafRows.filter((r) => r.k === 'muscle').every((r) => { const j = Object.entries(r.joints || {}); const m = Object.entries(r.moves || {}); return j.length + m.length > 0 && j.every(([id, act]) => kindOf.get(id) === 'joint' && String(act).trim()) && m.every(([id, act]) => movesTarget(id) && String(act).trim()); }), 'every muscle acts at a joint row (joints) or moves a bone, part or group (moves), and says how');
```

Replace the line that starts `ok(leafRows.every((r) => (r.old ? !/\.2026$/` with:

```js
    const current = (sid) => /\.2026$/.test(sid) || (!!SOURCE_FILES[sid] && SOURCE_FILES[sid].root === 'newsrc');
    ok(leafRows.every((r) => (r.old ? !current(r.src[0]) : current(r.src[0]))), 'a row marked old cites an older deck, and every other row a current 2026/27 file');
```

- [ ] **Step 6: Run both checks**

```bash
node work/revision-check.mjs | tail -3
node work/revise-pure-check.mjs | tail -2
node work/syntax-check.mjs | tail -1
```

Expected: `ALL PASS` for the first two, `ALL PARSED CLEAN` for the third.

- [ ] **Step 7: Commit**

```bash
git add outputs/revision/leaves.js work/revise-pure-check.mjs work/revision-check.mjs
git commit -m "feat(revise): muscles can move a non-joint; current 2026/27 files count as current sources

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Week 1 bones, joints, ligaments, cartilage and muscle organisation

**Files:**
- Create: `outputs/revision/hss2011-leaves-w1.js`
- Modify: `outputs/revision/registry.js`

**Source:** `hss.msk.2026`, pages 4 to 38.

**Parents (all rows here are week 1):** `bone`, `joints`, `ligcart`, `musclestruct`,
`motorunit`, `fibretypes`.

- [ ] **Step 1: Create the file with its header and one row**

Create `outputs/revision/hss2011-leaves-w1.js`:

```js
/*
 * HSS2011 · Week 1 leaves — bone, joints, ligaments, cartilage, muscle organisation,
 * body tissues and the orientation words.
 *
 * Read off W1_MusculoskeletalSystem_2026_CKK_upload.pdf (hss.msk.2026), the Week 1
 * orientation deck (hss.w1.2026) and the Week 2 body-tissues tutorial (hss.tut.tissues),
 * page by page. One row per structure the page text names, in the slide's words. `src`
 * is [source, page, page…]; work/revision-check.mjs holds that the name (or `match`) is
 * on one of those pages. Structures that are only in a picture have no row. Row kinds and
 * fields: outputs/revision/leaves.js. Recipe: docs/superpowers/plans/2026-10-19-revise-depth-w1-w3-w4.md.
 */
const MSK = 'hss.msk.2026';
const ORI = 'hss.w1.2026';
const TIS = 'hss.tut.tissues';

export const SOURCES = {
  [MSK]: 'Week 1 musculoskeletal slides',
  [ORI]: 'Week 1 orientation slides',
  [TIS]: 'Week 2 body-tissues tutorial',
};

export const ROWS = [
{ k: 'group', id: 'w1_bonecells', l: 'Bone cells', parent: 'bone', w: 1, src: [MSK, 5] },
];
```

In `outputs/revision/registry.js` (LF), add `import * as hss2011W1 from './hss2011-leaves-w1.js';`
above the `-w2` import, and change the two lines under the "Leaf rows" comment to:

```js
const HSS2011_ROWS = [...hss2011W1.ROWS, ...hss2011W2.ROWS];
const HSS2011_LEAF_SOURCES = { ...hss2011W1.SOURCES, ...hss2011W2.SOURCES };
```

- [ ] **Step 2: Run the check with one row, then prove the gate bites**

Run `node work/revision-check.mjs | tail -3`: expect `ALL PASS`. Change `[MSK, 5]` to
`[MSK, 39]`, run it again: expect `FAIL every leaf's name is on a page it cites` naming
`w1_bonecells`. Change it back to `[MSK, 5]`.

- [ ] **Step 3: Write the rows, with Recipe R**

Replace the one row with the full set, reading these pages in this order and writing
rows for every structure the text names:

| Pages | Covers | Parent | Notes for the rows |
| --- | --- | --- | --- |
| 4 to 8 | what the skeleton does; bone cells (osteocyte, osteoblast, osteoclast and the others the page lists); compact and spongy bone; red and yellow marrow; periosteum, endosteum and the other membranes the page names; the five bone types are on page 9 | `bone` | `group` for "Bone cells" and "Bone structure"; `part` for each cell and layer; a cell's `line` is its job from the slide |
| 9 to 11 | the bone types (long, short, flat, irregular, sesamoid), then the bony landmarks pages 10 and 11 name | `bone` | the types under a `group` "Types of bone"; landmarks under a `group` "Bony landmarks"; `part` rows, `line` only if the slide labels the kind (hole, tube-like) |
| 13 to 16 | what a joint is; the joint names by region (page 14: jaw, shoulder and so on); classification by mobility (synarthrosis, amphiarthrosis, diarthrosis) and by structure (fibrous, cartilaginous, synovial) | `joints` | a `group` each for "By region", "By mobility", "By structure"; the classes as `part` rows; the region joints as `joint` rows **only if** no Week 2 joint row already has the name (`w2_j_hip`, `w2_j_knee` and so on exist; for those, add `links` from the class row instead of a duplicate row) |
| 17 to 25 | parts of a synovial joint (capsule, cavity, synovial fluid, bursa, articular cartilage, meniscus and the others the page names); the six synovial types with the example each page gives | `joints` | the six types as `part` rows under a `group` "Synovial types"; each type's `links` point at the example joint **row** the slide names where one exists (`w2_j_hip` for ball-and-socket, `w2_j_ankle` for hinge and so on), reason "e.g." |
| 26 to 28 | ligaments (pages 26, 27 are pictures: only page 28's text names them; intrinsic or intracapsular, extrinsic or capsular, and the others the page lists); cartilage on page 29 and its types | `ligcart` | `part` rows; a ligament's `line` is the slide's one-line job |
| 31 to 36 | skeletal muscle; organisation of muscle (epimysium, perimysium, endomysium, fascicle, muscle fibre, myofibril, sarcomere, actin, myosin); tendon, myotendinous and osteotendinous junction, origin and insertion; fibre arrangement (fusiform and the others page 36 lists) | `musclestruct` | a `group` "Muscle organisation" holding the wrappers and the units, a `group` "Fascicle arrangements" holding the shapes; `part` rows |
| 37 to 38 | motor unit, muscle tone; fibre types and the comparison page 38 names | `motorunit`, `fibretypes` | `part` rows; the fibre-type table itself is a picture, so only the type names the text states |

Link rules specific to this task: a bone type's `links` may point at a W2 bone row the
slide gives as its example (for example "long bones" → `w2_femur`) with reason "e.g."
only if the slide text states the example. Ligament rows get `links` to a joint row only
if the page text names the joint beside it.

- [ ] **Step 4: Run the checks**

```bash
node work/revision-check.mjs | tail -40
node work/revise-pure-check.mjs | tail -3
```

Expected: `ALL PASS`, and the `leaf` lines show the new row count.

- [ ] **Step 5: Commit**

```bash
git add outputs/revision/hss2011-leaves-w1.js outputs/revision/registry.js
git commit -m "feat(revise): Week 1 bone, joint, ligament, cartilage and muscle-organisation leaves

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

Report the structures you did not write because they are only in a picture (pages 12,
26, 27, 38's table).

---

### Task 3: Week 1 orientation words

**Files:** modify `outputs/revision/hss2011-leaves-w1.js`.

**Source:** `hss.w1.2026`, pages 14 to 16.

**Parent:** `orient` (week 1). Rows are `part`, in a `group` each for "Directions" and
"Planes".

- [ ] **Step 1: Read pages 14 to 16 and write the rows with Recipe R**

Page 14 and 15 give the word pairs (right and left, proximal and distal, anterior and
posterior with their alternatives, superior and inferior with cranial and caudal, medial
and lateral, and the others the text states); page 16 gives the planes (coronal,
sagittal, transverse and the others it names). One `part` row per **term**, `line` = the
slide's meaning of it (for example "at the front"), `src: [ORI, 14]` or `[ORI, 15]` or
`[ORI, 16]` by where its text is. Do not write rows for the movement vocabulary
(flexion and so on): see "Settled" at the top.

- [ ] **Step 2: Run the checks**

```bash
node work/revision-check.mjs | tail -3
node work/revise-pure-check.mjs | tail -2
```

Expected: `ALL PASS`.

- [ ] **Step 3: Commit**

```bash
git add outputs/revision/hss2011-leaves-w1.js
git commit -m "feat(revise): Week 1 body-orientation terms and planes as leaves

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Week 1 and 2 tissues, cells and cell junctions

The owner asked for tissues and cells to go deeper. The 2026 sources for them are the
Week 2 body-tissues tutorial (`hss.tut.tissues`), the Week 1 orientation deck's "Organization
of human body" page, and the connective-tissue pages of the musculoskeletal deck.

**Files:** modify `outputs/revision/hss2011-leaves-w1.js`.

**Parents:** `tissues` (week 2), `epithelium` (2), `connective` (1), `junctions` (2).
A row under `tissues`, `epithelium` or `junctions` is **week 2**; under `connective`, week 1
or 2 by the slide's own week (the connective topic starts in week 1).

- [ ] **Step 1: Map the tutorial**

```bash
node work/query.mjs pages hss.tut.tissues 1-24
```

The tutorial has 24 pages (1, 4, 9 and 23 are pictures). Write down, for each page,
which of these it holds: cell junction types, epithelial types, connective tissue types
(cells, fibres, ground substance, the named tissues), muscle tissue types, nervous
tissue, membranes. The tutorial is the authority for the tissue and cell rows.

- [ ] **Step 2: Write the rows with Recipe R**

Required groups (a `group` row each, then `part` rows under them, one per named item):

| Group (parent) | Rows |
| --- | --- |
| "Cell junctions" (`junctions`) | every junction type the tutorial names, and the parts it names (for example the proteins or structures a junction is made of), `line` = the slide's job of it |
| "Epithelial tissue" (`epithelium`) | every epithelium type by cell shape and layering the tutorial names, with where it is found if the page says |
| "Connective tissue" (`connective`) | the cells, the fibres and the ground substance the tutorial names; every named connective tissue (loose, dense, cartilage, bone, blood and the others it lists) |
| "Muscle tissue" and "Nervous tissue" (`tissues`) | the three muscle types and the nervous-tissue cells the tutorial names |
| "Levels of organisation" (`tissues`, source `hss.w1.2026` page 9) | cellular, tissue, organ, system and the other levels the page lists |
| "Cell" (`tissues`, only if the tutorial or page 9 names organelles or cell parts) | each named cell part; if none is named, write no "Cell" group and say so in the report |

Cross-links: a junction row links to the tissue it joins when the tutorial says so ("tight
junctions in epithelium"). The brain barrier, synapse and neuron rows do not exist yet
(Plan 3), so do not link to them; Plan 3 adds those links.

- [ ] **Step 3: Run the checks**

```bash
node work/revision-check.mjs | tail -40
node work/revise-pure-check.mjs | tail -2
```

Expected: `ALL PASS`. The `growth` line should show week 2 gaining topics.

- [ ] **Step 4: Commit**

```bash
git add outputs/revision/hss2011-leaves-w1.js
git commit -m "feat(revise): body tissues, cell junctions and levels of organisation as leaves

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

Report: which cell parts (if any) the sources name, and anything image-only.

---

### Task 5: Week 3 upper limb: bones and joints

**Files:**
- Create: `outputs/revision/hss2011-leaves-w3.js`
- Modify: `outputs/revision/registry.js`

**Source:** `hss.ul.2026`, pages 2 to 14. **Parent:** `ul_bones` (week 3), `joints` for
joint rows' `group` (week 3 rows under `joints` are fine: `joints` starts in week 1).
Rows are week 3.

- [ ] **Step 1: Create the file with its header and one row, and wire the registry**

Create `outputs/revision/hss2011-leaves-w3.js`:

```js
/*
 * HSS2011 · Week 3 leaves — pectoral girdle and upper limb.
 *
 * Read off Week 3_UL_2026_CKK_upload.pdf (hss.ul.2026), page by page. One row per
 * structure the page text names, in the slide's words; a structure only in a picture has
 * no row. Row kinds and fields: outputs/revision/leaves.js. Recipe:
 * docs/superpowers/plans/2026-10-19-revise-depth-w1-w3-w4.md.
 */
const UL = 'hss.ul.2026';

export const SOURCES = {
  [UL]: 'Week 3 upper-limb slides',
};

export const ROWS = [
{ k: 'group', id: 'w3_pectoral', l: 'Pectoral girdle', parent: 'ul_bones', w: 3, src: [UL, 2] },
];
```

In `registry.js`, add `import * as hss2011W3 from './hss2011-leaves-w3.js';` and change the
two merge lines to:

```js
const HSS2011_ROWS = [...hss2011W1.ROWS, ...hss2011W2.ROWS, ...hss2011W3.ROWS];
const HSS2011_LEAF_SOURCES = { ...hss2011W1.SOURCES, ...hss2011W2.SOURCES, ...hss2011W3.SOURCES };
```

Run `node work/revision-check.mjs | tail -3`: expect `ALL PASS`. Change `[UL, 2]` to
`[UL, 29]`, run again: expect the source gate to name `w3_pectoral`. Change it back.

- [ ] **Step 2: Write the rows with Recipe R**

| Pages | Covers | Notes for the rows |
| --- | --- | --- |
| 2 to 5 | pectoral girdle; clavicle, scapula and the landmarks the text names; manubrium and sternum where the page names them; ligaments (page 5 is a picture, so only text names) | `group` "Pectoral girdle"; `bone` rows for clavicle, scapula; `part` rows for landmarks; the sternoclavicular and acromioclavicular joints only if the text names them, as `joint` rows |
| 6 to 7 | humerus and its parts (head, neck, tubercle, tuberosity, shaft, and the distal parts the page lists); the shoulder (glenohumeral) joint | `bone` humerus; `part` rows under it; `joint` "Glenohumeral joint" with the slide's line about the movements it allows; the humerus `joints` and the scapula `joints` list it |
| 8 to 10 | radius and ulna (thumb side, little-finger side), interosseous membrane, elbow joint (humeroulnar hinge and the others the page names), radioulnar rotation (supination, pronation as the action on the muscle rows later, not as rows) | `bone` rows; `part` for the membrane; `joint` rows for each joint the page names |
| 11 to 14 | the carpal bones (the proximal and distal row the page lists, one bone row each; page 11's mnemonic is not a structure), the wrist (radiocarpal) joint, intercarpal joints, metacarpals, phalanges | `group` "Carpal bones" with a `line` naming the two rows; `bone` rows; `joint` rows for radiocarpal and intercarpal (and the carpometacarpal if named) |

- [ ] **Step 3: Run the checks**

```bash
node work/revision-check.mjs | tail -40
node work/revise-pure-check.mjs | tail -2
```

Expected: `ALL PASS`.

- [ ] **Step 4: Commit**

```bash
git add outputs/revision/hss2011-leaves-w3.js outputs/revision/registry.js
git commit -m "feat(revise): Week 3 pectoral girdle, arm and hand bones and joints as leaves

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Week 3 upper limb: muscles and nerves

**Files:** modify `outputs/revision/hss2011-leaves-w3.js`.

**Source:** `hss.ul.2026`, pages 15 to 28. **Parents:** `ul_muscles` for muscles and their
groups, `plexuses` for nerve rows (week 3 rows under `plexuses` are fine: it already
carries week 3). Muscle `joints` must point at the joint rows from Task 5 (and the
Week 2 rows are not used here); a scapular muscle that moves the scapula and not a joint
uses `moves` with the scapula bone row.

- [ ] **Step 1: Write the rows with Recipe R**

| Pages | Covers | Notes for the rows |
| --- | --- | --- |
| 15 | the brachial plexus (a network from ventral rami C5 to T1) | one `group` "Brachial plexus", `line` as the slide says, parent `plexuses`; page 15 names no branch, so no branch rows from it |
| 16 to 17 | muscles that move the pectoral girdle: pectoralis minor, trapezius, levator scapulae, rhomboids, serratus anterior, with the actions the text lists (depress, protract, elevate and so on) | a `group` "Muscles that move the pectoral girdle"; `muscle` rows with `moves: { w3_scapula: 'action' }` (the scapula is the bone row from Task 5) |
| 18 | muscles that move the arm: latissimus dorsi (extend, adduct, medially rotate), pectoralis major, deltoid, teres major | `muscle` rows with `joints: { w3_j_gh: 'actions' }` (use the glenohumeral row id you gave in Task 5) |
| 19 | rotator cuff (supraspinatus, infraspinatus, subscapularis, teres minor): "stabilize shoulder joint", with the action the page gives each | a `group` "Rotator cuff muscles" (its `line` is the slide's) and the four `muscle` rows |
| 20 | the summary table of shoulder actions and the main muscles | write **no new rows**; use it to check each action you wrote on pages 16 to 19 |
| 21 to 22 | elbow flexors (brachialis, biceps brachii, brachioradialis) and extensor (triceps brachii: its heads) | `joints` to the elbow row; `note` for what the page adds ("works better with pronation") |
| 23 to 24 | the anterior forearm compartment, extrinsic muscles (page 23 lists them by abbreviation: pronator quadratus PQ, flexor carpi radialis FCR, flexor carpi ulnaris FCU, flexor digitorum superficialis FDS and profundus FDP, flexor pollicis longus FPL) and the nerve each is marked with (median, ulnar) | one `group` "Anterior compartment of forearm"; the rows use the **full** name in `l` and the abbreviation in `match` only if the page text spells only the abbreviation; `joints` to the wrist and elbow rows as the page indicates; `supplies` goes on the nerve row below |
| 25 to 26 | the five intrinsic hand compartments (thenar, hypothenar, adductor, central lumbricals, interossei) and their actions | a `group` "Intrinsic hand muscles" then a `group` per compartment; `muscle` rows for the muscles the text names (adductor pollicis and the others on the page); actions to the metacarpophalangeal and interphalangeal joint rows if Task 5 made them, otherwise to the nearest joint row the page names |
| 27 | the posterior forearm compartment, extrinsic muscles (APL, EPB and the others), "all extensors are innervated by the radial nerve" | `group` plus `muscle` rows; `joints` to the wrist and the digit joints |
| 28 | the summary table of elbow, wrist and finger actions | **no new rows**; check against pages 21 to 27 |

Nerve rows (`nerve`, parent `plexuses`, week 3): the median, ulnar and radial nerves, from
pages 23 and 27 (and any other nerve the page text names). `supplies` points at the
**compartment group** the page ties it to ("all extensors are innervated by radial nerve"
→ the posterior-compartment group, reason "supplies the forearm extensors") and at any
single muscle the page marks it for. `from: 'w3_brachial'` (the brachial-plexus group)
for each. Do not name a branch the page text does not name.

- [ ] **Step 2: Run the checks**

```bash
node work/revision-check.mjs | tail -40
node work/revise-pure-check.mjs | tail -2
```

Expected: `ALL PASS`. If the muscle check says `every muscle acts at a joint row … or moves
a bone…`, the target id is wrong; fix the id (do not change the check).

- [ ] **Step 3: Commit**

```bash
git add outputs/revision/hss2011-leaves-w3.js
git commit -m "feat(revise): Week 3 upper-limb muscles, compartments and nerves as leaves

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

Report: any muscle the text names without an action, and anything image-only (pages 4, 5,
24).

---

### Task 7: Week 4 skull, orbit and base of skull

**Files:**
- Create: `outputs/revision/hss2011-leaves-w4.js`
- Modify: `outputs/revision/registry.js`

**Source:** `hss.hnt.2026`, pages 5 to 8 and 19. **Parents:** `skull` (week 4), `orbit`
(week 4, a child of `skull`). Rows are week 4. Existing note text on the `skull` topic names
8 cranial and 14 facial bones, four sutures and the foramen magnum; the rows must come
from the page text, not from that note.

- [ ] **Step 1: Create the file with its header and one row, and wire the registry**

Create `outputs/revision/hss2011-leaves-w4.js`:

```js
/*
 * HSS2011 · Week 4 leaves — skull, vertebral column, head, neck and trunk muscles.
 *
 * Read off W4_Head_Neck_Trunk_2026_CKK_upload_20260920.pdf (hss.hnt.2026), page by page.
 * One row per structure the page text names, in the slide's words; a structure only in a
 * picture has no row. Row kinds and fields: outputs/revision/leaves.js. Recipe:
 * docs/superpowers/plans/2026-10-19-revise-depth-w1-w3-w4.md.
 */
const HN = 'hss.hnt.2026';

export const SOURCES = {
  [HN]: 'Week 4 head, neck and trunk slides',
};

export const ROWS = [
{ k: 'group', id: 'w4_cranial', l: 'Cranial bones', parent: 'skull', w: 4, src: [HN, 5] },
];
```

In `registry.js`, add `import * as hss2011W4 from './hss2011-leaves-w4.js';` and change the
two merge lines to include `...hss2011W4.ROWS` and `...hss2011W4.SOURCES` after the W3
ones.

Run `node work/revision-check.mjs | tail -3`: expect `ALL PASS`. Change `[HN, 5]` to
`[HN, 36]`, expect the source gate to name `w4_cranial`, then change it back.

- [ ] **Step 2: Write the rows with Recipe R**

| Pages | Covers | Notes for the rows |
| --- | --- | --- |
| 5 | cranial bones (8): frontal, parietal, temporal, occipital, ethmoid, sphenoid; facial bones (14): the list the page gives | a `group` "Cranial bones" and a `group` "Facial bones" under `skull`; one `bone` row per bone **named once** (a paired bone is one row, with `line` "x2" if the page marks it); the "(8)" and "(14)" counts go in each group's `line` |
| 6 | the sutures (coronal, sagittal, lambdoid, squamous) and the junctions the page labels (bregma, lambda, pterion, asterion) | a `group` "Sutures and junctions"; `part` rows |
| 7 | the lateral view through the nasal septum: ethmoid, vomer, nasal bones and the other parts the text names | `bone` or `part` rows under the facial or cranial group as the structure belongs; skip a name already written from page 5 |
| 8 | the orbit: the bones the page names, the fissures (superior and inferior orbital), the infraorbital groove and foramen, and the other landmarks the text lists | a `group` "Orbit" under `orbit` (the topic), `part` rows for the openings; the orbit's bones are links to the bone rows from page 5 (`links: { w4_frontal: 'forms the orbit' }` from each opening or from the group, only where the page ties them) |
| 19 | base of skull: the foramen magnum, occipital condyles, odontoid process of the axis and the atlas and axis that articulate with them | rows for the structures named here that are not already rows; the atlas and axis rows are written in Task 8, so link to them there |

- [ ] **Step 3: Run the checks**

```bash
node work/revision-check.mjs | tail -40
node work/revise-pure-check.mjs | tail -2
```

Expected: `ALL PASS`.

- [ ] **Step 4: Commit**

```bash
git add outputs/revision/hss2011-leaves-w4.js outputs/revision/registry.js
git commit -m "feat(revise): Week 4 skull, sutures and orbit as leaves

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

Report the bone names you wrote and any the text lists but a figure carries alone.

---

### Task 8: Week 4 vertebral column, ribs and the joints of the head, neck and trunk

**Files:** modify `outputs/revision/hss2011-leaves-w4.js`.

**Source:** `hss.hnt.2026`, pages 11, 17 to 28. **Parents:** `vertebrae` (week 4), `joints`
for joint rows (`joints` starts in week 1, so a week 4 row under it is fine), `skull` for the
temporomandibular joint.

- [ ] **Step 1: Write the rows with Recipe R**

| Pages | Covers | Notes for the rows |
| --- | --- | --- |
| 11 | the temporomandibular joint (between the temporal bone and the mandible), its gliding and hinge actions on opening the mouth | a `joint` row `w4_j_tmj`, `line` as the slide says; the `mandible` and `temporal bone` `bone` rows (from Task 7, or write them here if page 5 did not name the mandible) list it in `joints` |
| 17 to 18 | the vertebral column: 33 vertebrae, the regions (cervical, thoracic, lumbar, sacral, coccygeal) and the counts, intervertebral discs and the curves the page names | a `group` "Vertebral column" under `vertebrae`, a `group` per region with the count in its `line` |
| 19 to 21 | cervical vertebrae, atlas and axis, odontoid process, the foramen magnum link to the skull (page 21 is a picture) | `bone` rows for atlas and axis; `part` rows for the features the text names; `joint` rows for the atlanto-occipital and atlanto-axial joints if the text names them, with the actions the text gives; `links` from the atlas to the occipital condyles row from Task 7 only if the page says they articulate |
| 22 to 25 | thoracic vertebrae, costovertebral and costotransverse joints, the rib cage (page 23 says it is covered in module 3: write only what the text names here), intercostal muscles (page 25 is a picture; only text names count) | `bone` and `part` rows; `joint` rows for the two rib joints; muscles are written in Task 9, not here |
| 26 to 27 | lumbar vertebrae, the articular facet orientation by region (oblique about 45°, frontal, and the others the text gives) and the movement each allows | `bone` and `part` rows; the facet orientation is a `line` on each region's facet `part` row |
| 28 | the sacrum and coccyx, their development ages the page gives | `bone` rows; the ages in `line` |

- [ ] **Step 2: Run the checks**

```bash
node work/revision-check.mjs | tail -40
node work/revise-pure-check.mjs | tail -2
```

Expected: `ALL PASS`.

- [ ] **Step 3: Commit**

```bash
git add outputs/revision/hss2011-leaves-w4.js
git commit -m "feat(revise): Week 4 vertebral column, ribs and the joints of head, neck and trunk as leaves

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 9: Week 4 muscles of the head, neck and trunk

**Files:** modify `outputs/revision/hss2011-leaves-w4.js`.

**Source:** `hss.hnt.2026`, pages 9, 10, 12, 14 to 16, 29 to 35. **Parents:** `extraocular`
(week 4) for the eye muscles, `headneck_muscles` (week 4) for the rest of the head and
neck, `trunk_muscles` (week 4) for the back and abdomen.

The extraocular, tongue and mandible muscles act on something that is not a joint, so they
use `moves`. Give the **eyeball** a `part` row first, under the `orbit` topic
(`w4_eyeball`, week 4, `src: [HN, 9]`, `match: 'eye'`), and the **tongue** a `part` row
under `headneck_muscles` (`w4_tongue`, `src: [HN, 12]`), and use them as `moves` targets. The
**mandible** is the `bone` row from Task 7 or 8.

- [ ] **Step 1: Write the rows with Recipe R**

| Pages | Covers | Notes for the rows |
| --- | --- | --- |
| 9 | the eye movements the page lists (elevation, depression, adduction, abduction, intorsion, extorsion) and the extraocular muscles it names | under `extraocular`: `muscle` rows for each of the six the text names, `moves: { w4_eyeball: 'the actions the page gives it' }`; page 9 may hold the muscle names only in the figure: if the names are not in the page text, check pages 8 and 36's neighbours with `node work/query.mjs text "rectus"` and cite the page that does name them; if no page text names them, write no rows and say so |
| 10 | muscles that move the mandible: temporalis (elevate, retrude), masseter, the pterygoids and the others the text names | `muscle` rows with `moves: { <mandible row id>: 'action' }`; where the slide gives an action at the temporomandibular joint, use `joints: { w4_j_tmj: … }` instead |
| 12 | muscles of the tongue: intrinsic (change shape) and extrinsic (move it) | a `group` each for intrinsic and extrinsic; `muscle` rows for the extrinsic muscles the text names, `moves: { w4_tongue: 'action' }`; the intrinsic group has no rows unless the text names them |
| 14 to 16 | platysma, sternocleidomastoid (unilateral and bilateral actions), the scalenes (anterior C3 to C6 and the others, to the first rib) | `muscle` rows; neck actions go to the cervical `joint` rows if Task 8 made one, otherwise `moves` on the `w4_cervical` region group |
| 29 to 31 | muscles of the back: extrinsic (superficial, intermediate) and intrinsic (deep): splenius capitis and cervicis, erector spinae and the others, rotatores, multifidus, semispinalis | a `group` "Extrinsic back muscles" and a `group` "Intrinsic back muscles"; `muscle` rows; actions to the vertebral-region groups from Task 8 via `moves` |
| 32 to 34 | abdominal muscles: anterolateral group (rectus abdominis, external and internal obliques, transversus abdominis as the text names them) and posterior group (psoas major, iliacus, quadratus lumborum) | `group` each; `muscle` rows; `moves` on the vertebral column group for trunk actions the text gives |
| 35 | the summary of major back muscles (neck flexors and extensors and so on) | **no new rows**; check against the muscles you wrote |

- [ ] **Step 2: Run the checks**

```bash
node work/revision-check.mjs | tail -40
node work/revise-pure-check.mjs | tail -2
```

Expected: `ALL PASS`.

- [ ] **Step 3: Commit**

```bash
git add outputs/revision/hss2011-leaves-w4.js
git commit -m "feat(revise): Week 4 head, neck, back and abdominal muscles, extraocular included, as leaves

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

Report which muscles the text names without an action and anything image-only (pages 13,
21, 25).

---

### Task 10: Reading help, the shell, the whole check set and the browser

**Files:** possibly `outputs/term-gloss.js`; `outputs/sw.js`; `docs/CODEMAP.md`;
`outputs/README.md`; `CLAUDE.md`.

- [ ] **Step 1: Glosses**

Run `node work/gloss-coverage-check.mjs`. It passes with warnings. List the underlined
words from **this plan's rows** that have no gloss (compare the warning list with the
words in the three new row files). Run `git diff outputs/term-gloss.js` first; if it
shows hunks you did not write, **stop and ask the owner**. Otherwise add one entry per
such word in the "whole words" section, in the file's format
`word: ['Plain meaning in one line.', '繁體中文'],`, with a meaning that restates the
structure (what it is, where it sits), not new clinical content. Re-run the check until
it prints `ALL PASS`.

- [ ] **Step 2: Bump the cache**

In `outputs/sw.js` bump `CACHE_VERSION` by one. The three new data files are imported by
`registry.js` with no query, like `hss2011-leaves-w2.js`, so each needs an entry in
`SHELL`, next to that one:

```js
  './revision/hss2011-leaves-w1.js',
  './revision/hss2011-leaves-w3.js',
  './revision/hss2011-leaves-w4.js',
```

- [ ] **Step 3: Run the whole after-every-edit set**

```bash
node work/shell-check.mjs
node work/load-check.mjs
node work/syntax-check.mjs
node work/binding-check.mjs
node work/bridge-check.mjs
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

Expected: every one passes. `baseline --check` may differ on `gloss-coverage-check` (more
texts) and `ui-strings` (the new leaf names). For each that differs, diff it against
its baseline, read the differing lines, and only if they are all this plan's rows and
glosses run `node work/baseline.mjs` and stage the baseline files you read.

- [ ] **Step 4: Browser check at phone and iPad size**

Start the preview (`preview_start` name `study-studio`), open
`http://localhost:8420/radiography-study-studio.html`, clear the service worker as in
Plan 1's Task 10 Step 1, then at 390 × 844 and 820 × 1180 with week 7 chosen:

- Revise › Map, Find "skull": Skull opens into Cranial bones, Facial bones, Sutures and
  junctions and Orbit; every bone is a row. Find "rectus": the extraocular muscles are
  there with their actions as the grey line.
- Find "epithelium" and "junction": the tissue and junction rows are there.
- Find "deltoid": its row shows its action; tap it and the numbered dots and the Links
  list name the joint it moves.
- `document.querySelectorAll('#rvMm .markmap-node').length` after "Open all": note the
  number, and that the page still scrolls and pans smoothly. If "Open all" makes the map
  unusable on the phone (the page freezes for more than 3 seconds), **stop and tell the
  owner** the node count and what you saw; do not hide rows.
- Brain 3D: centre on Deltoid, then on Skull, then on the extraocular muscle group:
  the hub shows labelled balls, numbered dots and the list matches.
- `read_console_messages` with `onlyErrors: true`: no new errors beyond the known
  `translate(NaN,NaN)` Markmap message when the week changes while Brain 3D shows
  (recorded in `docs/TRAPS.md`).
- Reset the viewport with `resize_window` preset `desktop`.

- [ ] **Step 5: Record it**

Add to `outputs/README.md` a short paragraph under the Revise section: Weeks 1, 3 and 4
now go down to single structures (give the leaf count from `revision-check`), what was
left because it is only in a picture (collect the "image-only" reports of Tasks 2 to 9 into
one list), and that Plan 3 (Weeks 5 to 7) is next. In `CLAUDE.md`, where it says "Only HSS2011
has revision data", leave it, and change the sentence that says Week 2 lower limb is the
first depth to say Weeks 1 to 4. Keep each file's own line endings.

- [ ] **Step 6: Commit**

```bash
git add outputs/term-gloss.js outputs/sw.js docs/CODEMAP.md outputs/README.md CLAUDE.md work/baselines
git commit -m "chore(revise): precache the W1, W3 and W4 leaf files; glosses, code map, baselines, notes

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

(Add only the files that actually changed, after `git diff` on each. Do not push: tell the
owner the work is committed locally and ask before pushing.)

---

## After this plan

**Plan 3** takes the three Week 5 to 7 decks (`2627_M2_L5_Nervous system I.pdf`,
`2627_M2_L6_brain_cranial_N.pdf`, `2627_M2_L7_ANS_spec_sen.pdf`) through intake and writes
their leaves: nerve cells, glia and synapses, the spinal cord and its tracts, the spinal
nerves and plexuses, the brain (lobes, cortical areas, basal nuclei, limbic system,
brainstem, cerebellum, thalamus, hypothalamus), the meninges, ventricles and brain
barriers, the twelve cranial nerves, the senses, the ear and the eye, and the autonomic
nervous system. It also links the nerve rows of Weeks 2 and 3 to their plexuses, and the
junction and tissue rows of Weeks 1 and 2 to the brain barrier, synapse and neuron rows.
