# Revise: a deeper Map, a connections-hub 3D, no tests

Decided with the owner on 2026-10-19, over four rounds of multiple-choice questions
and two live mockups (hub vs body-shaped atlas; a whole-term globe). Builds on
`2026-10-18-revision-map.md`; the week rule there is unchanged.

## Why

- **The 3D looked flat.** `study/revise-brain.js` pulls the six body systems toward
  anchors on an ellipse (x ±190, y ±150) with depth z = ±35 only, so the graph
  settles into a disc that reads as a prism.
- **The two views did the same job.** Brain 3D drew the same topics and links as the
  Map, so neither taught anything the other could not.
- **The Map's link labels cover topic names.** `drawLinks()` writes each reason as
  SVG text beside the target, on top of the tree ("axons bundle into tracts" over
  Neuron, "projection / commissural / asso…" over Cerebrum & lobes).
- **The Map is too shallow.** A region stops at one topic ("Lower-limb muscles") with
  every muscle inside its note, so the tree cannot be used to recall them.
- **The app is used on a phone or iPad**, as an installed web app. Nothing may depend
  on hover; tap targets are about 44 px.

## The teaching split (the rule both views follow)

| | Map (2D) | 3D hub |
| --- | --- | --- |
| Job | **What belongs where** — classification | **How it connects** — links across systems |
| Shows | The tree: system → region → group → structure | One topic, its direct links, the next step out |
| Lines | Tree branches; the selected topic's cross-links as arcs | Cross-links only; the tree appears as one grey "in" marker |
| How you revise | Fold a branch, name what is inside, open it | Walk a chain: Quadriceps → Knee joint → Femur |

A feature that shows hierarchy belongs to the Map. A feature that shows links across
the hierarchy belongs to the 3D. Neither takes the other's job.

## Data: typed leaf tables, derived links

The existing ~57 topics, their hand-written `EDGES` and `TREE` stay as they are. Depth
is added as **leaf rows**, one file per teaching week
(`outputs/revision/hss2011-leaves-w1.js` … `-w7.js`), merged by the registry into the
`NODES` / `EDGES` / `TREE` that `weeks.js` already consumes — so the week rule code
does not change.

Row kinds, each with `id`, `l` (label), `parent`, `w` (week) and `src: [sourceId, page]`:

| Kind | Extra fields | Derived links |
| --- | --- | --- |
| `group` | — (label only, structural, no note) | none |
| `muscle` | `joints: { <jointId>: '<action at that joint>' }`, `nerve` | muscle → joint, reason = the action; muscle → nerve, "supplied by" |
| `bone` | `joints: [<jointId>…]` | bone → joint, "forms" |
| `joint` | `type` when the slide gives it | none of its own |
| `nerve` | `from` (plexus topic or parent nerve) | nerve → from, "branch of" |
| `part` | `line` (one line), `links: { <id>: '<reason>' }` | as written (W5–W7 structures) |

A muscle's one line in the Map is its actions, joined from `joints`. Bones link to
muscles **through the joint they form and the muscle moves**. The 2026 deck teaches
actions by joint (W2 p24, p32), and does not teach origins or insertions. A derived
link shows when both ends show (the existing rule).

Example (W2, lower limb):

```js
{ k: 'muscle', id: 'm_glut_med', l: 'Gluteus medius', parent: 'g_gluteal', w: 2,
  joints: { j_hip: 'abducts, medially rotates' }, nerve: 'n_sup_gluteal', src: ['hss.ll.2026', 15] }
```

## Map changes (`study/revise.js`, `app.css`)

1. **Reasons off the map.** `drawLinks()` stops writing `<text>`. Each arc ends in a
   **numbered dot** (an invisible 44 px hit circle around it). A **Links list** sits
   directly under the map, numbered the same way. Tapping a dot or a row lights up that
   arc and its target; tapping the row again selects the target. Hover can still
   highlight on desktop, but nothing depends on it.
2. A link into a folded branch keeps the dashed arc to the nearest visible ancestor.
   Its row names the real topic: "Femoral n. — supplied by (inside Nerve plexuses)".
3. **Leaves** show their one line in muted text under the label, scaled by `--ts`.
   Row spacing rises from 9 to about 14 px so two-line leaves never touch.
4. **Folding.** The initial expand level stays (2 on phone, 3 on desktop), and leaves
   start folded. On phone, opening a branch folds its open siblings so the map stays
   about one screen tall. Open all / Close all stay.
5. **Test me is removed**: the `#rvQuiz` button, the `.quiz` class and its CSS, the
   help line, the hint, and the tap-to-uncover branch of the panel click handler.
6. A **Connections in 3D** button in the topic panel opens 3D centred on that topic.
7. **Find** also searches leaf labels and their one line.

## 3D hub (`study/revise-brain.js`, new `outputs/revision/hub.js`)

**Layout** is a pure function in `outputs/revision/hub.js` (no three.js, no DOM, so
`work/` can test it): given a centre, its neighbours, its parent and the second step,
it returns positions. It is deterministic: no randomness, no force simulation.

- **Centre** at the origin, the largest ball, always labelled.
- **Parent** (the tree's "in") at the top of shell 1: small, grey, "in Anterior thigh".
- **Shell 1**: the direct links on a sphere of radius R1, spread by a Fibonacci spiral
  over latitudes −0.65 … +0.65 so none sits hidden above or below the centre. Sorted
  by body system so same-system neighbours sit together, with a minimum angular gap
  sized for a label at phone width. Above 14 neighbours, the 14 with the most links
  show and the rest sit behind a **+N more** chip that lists them.
- **Shell 2**: second-step links (neighbours of shell 1 not already shown) on radius R2,
  spread over the **whole** sphere near the direction of their shell-1 neighbour, then
  separated to the minimum gap. Small, faint, unlabelled; capped at about 30. This is
  what makes the view read as a ball, which the owner asked for.

**Drawing** keeps the vendored `3d-force-graph`, with the simulation off: positions come
from `hub.js` (`fx/fy/fz`, `cooldownTicks(0)`) and are tweened over about 600 ms on each
re-centre. Labels are the existing HTML overlays: the centre and shell 1 only, faded to
40% when facing away. Lines run centre → shell 1 (solid) and shell 1 → shell 2 (faint),
**never with text on them**. A numbered dot near each solid line matches a Links list
under the canvas — **the same component as the Map's**.

**Interaction**
- Tap a ball, a label or a list row and that topic flies to the centre. A trail at the
  top keeps the chain ("Quadriceps › Knee joint › Femur", the last 5), with Back.
- Drag rotates; pinch or scroll zooms; the slow idle spin stops at the first touch.
  Picking is screen-space: nearest ball within 24 px, labelled ones first.
- **Entry**: Connections in 3D from the Map centres on that topic. Opening the tab
  directly centres on the Map's selection. With no selection, it centres on the newest
  topic of the shown week; failing that, the topic with the most links.
- **Tours** stay. A tour pre-fills the trail; Next and Previous re-centre on each stop,
  and the line between consecutive stops is lit.
- Only topics and links visible in the shown week take part.

**Removed**: the whole-graph force layout, the `ANCH` ring and `cluster` force, the
region labels, and the auto-fit of the whole cloud.

## Content: all seven weeks

Built in this order:

1. **The new Map and 3D machinery, with W2 lower limb as the first data set**
   (`hss.ll.2026`): regions and bones p5–13, muscles p14–31, actions by joint p24 and
   p32, nerves p33, foot intrinsics p34 (group level only; the slide gives abbreviations).
2. **W1, W3, W4**: `hss.w1.2026`, `hss.msk.2026`, `hss.move.2026`, `hss.ul.2026`,
   `hss.hnt.2026`.
3. **Intake, then W5–W7.** `2627_M2_L5_Nervous system I.pdf`,
   `2627_M2_L6_brain_cranial_N.pdf` and `2627_M2_L7_ANS_spec_sen.pdf` are in the iCloud
   `Human Anatomy` folder but not in `work/source-text.json`. They go through the
   intake workflow (`2026-09-10-new-source-intake-workflow.md`) first. Then their leaves:
   the 12 cranial nerves (name, sensory/motor/both, main job), the named tracts, the
   brainstem, diencephalon and cerebrum parts, meninges layers, ventricles, receptor
   types, eye and ear parts, and the ANS divisions. Depth is exactly what the slides
   name.

Content rules:
- Wording comes from the slide. One line per leaf, no prose. The star mark keeps its
  meaning.
- Every row cites `[sourceId, page]`. An old deck is cited only where the 2026 deck is
  silent; such a row carries `old: true` and the panel says so.
- Existing topic notes, Cantonese lines and the double-check list are unchanged.

## Checks

`work/revision-check.mjs` is extended to run over the **merged** data and to hold:
- every leaf has a `src` whose source id is in `work/source-text.json`, and its label
  (or its `match` alias, for slide abbreviations) appears on the cited page, using the
  same normalisation as `source-check.mjs`;
- every parent and derived-link end is a real id; the merged tree has every id exactly
  once and no cycle; every muscle names at least one joint with a non-empty action;
- the existing week-rule checks (monotonic growth, no link to a hidden topic, "new"
  marks) still pass on the merged data.

`hub.js` gets its own node check: the same input gives the same output; no two shell-1
neighbours are closer than the minimum gap; the parent sits at the top; the caps hold;
shell 2 never lands on a shell-1 direction.

Browser verification at phone (390 × 844) and iPad (820 × 1180) sizes: arcs and numbers,
list taps, folding siblings, the 3D tap → hop → Back, tours, and a week change.

Also the `CLAUDE.md` after-every-edit set, in particular:
- `text-size-check.mjs` for the new CSS;
- `shell-check.mjs` for the new modules, which must be in the SW SHELL under their
  import specifiers, with a `CACHE_VERSION` bump;
- `node work/codemap.mjs` for new files and banners.

## CLAUDE.md changes

- Principle 0: "a 3D link graph" becomes "a 3D connections hub"; Test me is gone.
- Principle 1: revision data may hold leaves (name + one action or function line + a
  source page). Still no lesson prose for single bones, landmarks or motions.
- The "Practise and Apply remain as the testing half" sentence is changed by the
  separate test-removal spec, not here.

## Out of scope

- **Removing Practise, Apply, mistakes, mastery scheduling and the answer-log UI.**
  The owner chose "no tests anywhere in the app" on 2026-10-19. It touches
  `progress-log.js`, `gist-sync.js`, the mastery scheduler, `schedule.js` ids and
  CLAUDE.md's testing-half sentence, so it gets its own spec and session.
- Threads, Tables and Decoder.
- Subjects other than HSS2011.

## Decisions log

| Asked | Picked | Over |
| --- | --- | --- |
| What the 3D does that the Map does not | Connections hub | Body-shaped atlas, systems globe, pathway walker. Confirmed again after two live mockups (hub vs atlas, then a whole-term globe). |
| Map depth | Each muscle with its action line | Stop at the group; muscle plus an explanation |
| How bones link to muscles | Through the joint | Origin and insertion (not on the 2026 slides); same region only |
| Map overlap | Reasons off the map, as numbered dots plus a list under the map | Labels moved into free space; focus layout; more spacing alone |
| Scope of this pass | All seven weeks | Lower-limb pilot; W2–W4 only |
| Tests | None anywhere in the app | Only the Revise "Test me" |
| Where 3D opens | The Map's selected topic | An overview sphere; a picker |
