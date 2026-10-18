# Revision replaces Learn

Decided with the owner on 2026-10-18.

## Why

The app no longer teaches new chapters. The owner learns each chapter with ChatGPT
or Claude. What the app is for is what comes after: **linking the chapters already
learnt** and recalling them. The reference build is `HSS2011_build` (a Markmap mind
map, a 3D link graph, pathway "threads", look-up tables and a term decoder, all
tagged by teaching week). It replaces the Learn destination.

## What the Revise destination is

One destination, five sub-views over the same week-gated content:

| Sub-view | What it is |
| --- | --- |
| Map | Markmap tree. Tap a topic: its cross-links are drawn with the reason on each. Find, Jump to, Test me (blur notes). |
| Brain 3D | The same topics and links as a 3D graph; pathway tours. Lazy: the library loads on first open. |
| Threads | One real pathway end to end, every step tagged with its week. |
| Tables | Look-ups (spinal level to muscle, cranial nerves, joints, twin pairs, numbers, double-check list). |
| Decoder | Term roots with one hook each. |

## The week rule (the point of the change)

- **Revise through week N.** Everything taught in weeks 1..N is shown; nothing later
  is. One growing map, not one map per week. Each week adds topics, links, steps
  and rows, so the map gets more complicated as the term goes on.
- **Auto by default.** N = the current teaching week (`weekOf(now)` in
  `schedule.js`), clamped to 1 .. the last week the subject has revision content
  for. Before the term N is 1; after it N is the last week with content. It moves
  on its own when the week changes; nobody has to touch it.
- **Manual override.** The week chips choose any week 1..last. Choosing one sticks
  (stored per subject) until **Auto** is pressed. A chip never chooses a week that
  has no content.
- A topic belongs to the first week it was taught in (`min(w)`). A group heading
  shows when any topic under it shows. A cross-link shows when both ends show. A
  thread step shows when every week tag on it is <= N; a table when every week it
  mentions is <= N; a decoder group when its week is <= N.
- Topics first taught in week N are marked **new**.

## Subjects

Only HSS2011 has revision content (weeks 1-7). The data lives in
`outputs/revision/<subject>-*.js` behind one registry, so another subject is a new
data file made the same way, not new code. Subjects without content say so.

## What stays, what goes

- **Goes:** the Learn destination (`subject.js` `renderLearn`, `#learnView`), the
  lesson session's Learn and Remember steps, the "Study this" buttons that opened
  a lesson (Today, Course, global search) — each now opens Revise or Exam.
- **Stays:** reading help and the glossary (`reading-help.js`, `term-gloss.js`,
  `term-notes.js`, `wordparts.js`), applied to the revision notes. The item data
  and its questions, which Exam, mistakes, mastery, the schedule and the viewer
  read. The corpus text is not deleted in this change: removing it is a separate
  decision because source traceability, `schedule.js` ids and the mastery log
  depend on it.
- **Mission** in `CLAUDE.md` changes from "teach what is delivered" to "connect and
  recall what has been learnt".

## Content rules carried over

- The reference's star mark (`★`) is a fact added from a textbook that is not on
  the slides. It is kept, and keeps its meaning. The reference's double-check list
  (including the W6 mastication-muscles slide quirk) is kept.
- Cantonese memory lines in the reference are the owner's own preference and stay.
- Libraries are vendored under `outputs/revision/vendor/` (d3 7.9.0, markmap-view
  0.18.12, 3d-force-graph 1.80.1). No CDN, no build step.

## Checks

`work/revision-check.mjs`: every edge and tree id is a real node; every node is in
the tree exactly once; visibility is monotonic in N; the auto week is right at the
term's edges; every thread step, table and decoder group resolves to a week; links
never point at a hidden topic.

## Follow-up: remove the unreachable reading half (2026-10-18)

After the Revise change, a separate reachability audit removed Learn/Remember-only item explanations, key facts, item memory hooks, visual specifications, figure/layout registries and their unused image assets. Practise, Apply, Exam, source dialogs, search, and all item sourceRefs remain. The glossary and reading-help stack (term-gloss.js, term-notes.js, wordparts.js) remains active for Revise. The cleanup keeps validateCorpus() at zero failures and removes only the retired figure/visual/duplicate verifiers and their baselines.
