# Syllabus depth and lesson visuals

The user requests implementation: a depth and visuals pass over **every lesson in the
corpus**, not only the weeks that are currently thin. Each existing item is rewritten
to full coverage of its sub-topic; new items are added wherever a lecture's material
is not yet all taught; every lesson gains topic-appropriate visual density in place of
its single figure. The concern is missing examinable material and studying anatomy
from prose with no picture.

## What is wrong now

The Learn tab is week-driven: `teachingWeeks(subject)` in `outputs/schedule.js` turns
`WEEK_STUDY[subject][week]` into one topic card per teaching week, and the item's
`unit` field is now legacy — it drives only the 3D studio focus, session filtering and
exam grouping, not navigation. So depth is a function of how many item ids each week
lists and how long each item's `lesson` is, nothing structural.

Item counts per teaching week (lecture weeks only): HSS2011 W1 23, then W2–W12 run
4–7; ABCT2326 W1 11, then 3–8; HTI17103 1–6; APSS1A08 and DSAI1202 have Week 1 only.
Week 1 is large because every subject's foundational unit sits there and the enriched
2026 decks are almost all Week-1 decks. Lesson bodies average 1100–2200 chars corpus
wide — the thin weeks lowest, but even the well-covered Week 1 sets (`hss.osteo` ~1120)
sit well under the depth target — against lecture decks of 18–62 pages.

Visuals: `visualSlotHTML(item)` in `outputs/study/lesson-visuals.js` renders exactly
one `<figure>` per lesson — a 3D model view, one published figure, one schematic, one
generated layout, or one Gray's plate, resolved by `visualFor()` /
`figureFor()` / `plateFor()`. There is no way for a lesson to carry a second image.

## Constraints that do not move

Source traceability: every factual sentence cites a `sourceRefs` entry keyed to a real
file, enforced by `work/source-check.mjs` against `work/source-text.json`. ~101 sources
already have full page text cached there, including every HSS module deck
(`hss.2.2`, `hss.2.3`, `hss.3.1`–`hss.3.3`, `hss.4.1`–`hss.4.3`), the past papers
(`hss.pp1718`, `hss.ppans`, `hss.fib5yr`), MOOC 1 and 3, and every ABCT physiology deck
and tutorial. So this is authoring work, not source acquisition, and every new citation
is verifiable offline.

Taught **and** tested: a lesson may teach the whole of what its lecture deck presents,
not only what past papers have hit. App-authored memory aids and reading intros are
allowed but tagged as such.

No PPT images in the app. The repo is public and auto-deploys to GitHub Pages. Lecture
and tutorial slides are copyright PolyU and the lecturers; extracting their figures is
the republishing the project already refuses for the set textbook and question bank.
`work/fetch-figure.mjs` enforces free-licence-only downloads through the Wikimedia
Commons API and has no override. PPT figures may only ever be referenced as a text
pointer ("Lecture 3, slide 14"), never reproduced.

Offline-first: every figure is currently in the service-worker precache shell
(`outputs/sw.js`), 9.5 MB for 29 files. Scaling figure count by 5× cannot 5× the
install payload.

No unit restructuring. New items reuse an existing module `unit` key and are wired into
`WEEK_STUDY`; the week view picks them up with no schema change to units.

## Depth target

Every study item — the ~161 that exist and every one added — is a long-form treatment
of its sub-topic (~3000–5000 chars in `lesson`), covering everything its sources
present on that sub-topic, every factual sentence page-cited, `commonMistakes` drawn
from past-paper distractors where they exist. Each 2-hour lecture resolves to 6–9 such
items; a lecture currently under that count gains items until its deck is fully taught.

Depth is still source-bounded. A well-covered week (HSS Week 1, ABCT Week 1) can go to
the full target. A lesson whose only source is one short document — several APSS topics,
the DSAI Week 1 lesson — can only go as deep as that document allows and will stay
shorter. That is correct, not a failure; the spec does not licence inventing content to
hit a character count.

## Visual density target

Every lesson, every week. Density varies by topic, decided per item: structure-heavy
anatomy lessons carry 4+ visuals (primary figure, detail views, a schematic, a 3D
view), concept and physiology lessons 2–3, a lesson with genuinely little to depict
keeps 1. Every raster figure is free-licensed and fetched through `fetch-figure.mjs`;
schematics and generated layouts are app-authored and unlimited; 3D model views cost
nothing new. Every figure keeps its `intro` + callout `key`, enforced across the new
list form by `work/figure-key-check.mjs`.

## SP0 — visual system upgrade (infrastructure, lands first, no content change)

`outputs/study/corpus/schema.js`: an item gains an optional ordered `visuals: [...]`,
each entry one of `{ fig: id }`, `{ schematic: id }`, `{ plate: id }`,
`{ model: { layer, meshes, label, caption } }`, `{ gen: form }`. Absent `visuals`,
`visualFor(item)` stays exactly as now — the single-primary fallback is unchanged, so
every existing lesson renders identically until it is given a list.

`outputs/study/lesson-visuals.js`: `visualSlotHTML` renders `visuals` as a vertical
stack of figure blocks in list order. The 3D mount (`mountLessonVisual`) attaches to
whichever entry is the `model`; at most one `model` per list. Lists longer than 3 get a
lightweight "N of M" affordance, details TBD in the plan — not a lightbox.

`outputs/sw.js`: figures move out of the hard precache `SHELL` list into an on-demand
`rss-figures-vN` runtime cache — cache-first, network-fill, so the install stays light
and a figure is offline after it has been seen once. The five Gray's plates stay in the
shell (they are already small and load-bearing for their lessons). `CACHE_VERSION`
bumps; a new `FIGURES_VERSION` keys the runtime cache so figure churn does not evict the
shell. `work/shell-check.mjs` learns the split: shell modules still must all be present;
figure assets must resolve but are checked against the runtime-cache rule instead.

Checks: `work/figure-key-check.mjs` walks `visuals[]` on every item — each `fig`/`plate`
id resolves, each asset file exists, each carries `intro` + well-formed `key`, each
licence string is on the `fetch-figure.mjs` allow-list. `work/binding-check.mjs`,
`work/load-check.mjs`, `work/verify-modules.mjs` pass. `docs/DATA-INDEX.md` and
`docs/CODEMAP.md` regenerated; any `work/baseline.mjs` baseline that moves is
regenerated after confirming only expected lines changed. No lesson text changes in
SP0, so `validateCorpus()` stays at 0 and `source-check` is untouched.

## SP1 — pilot: HSS2011 Module 2, weeks 5–7

Neuroanatomy (W5), brain and cranial nerves (W6), special senses (W7). The 13 current
items rewritten to the depth target, ~7 added → ~20. Sources: `hss.2.2`, `hss.2.3`,
`hss.special.2017`, `hss.mooc3`, `hss.pp1718`, `hss.ppans`, `hss.fib5yr` — all cached.
Each item long-form and fully cited; 2–5 visuals per item from Wikimedia / OpenStax /
Gray's plus new schematics for the pathways (visual, auditory, vestibular, CN
distribution) and 3D views from the nervous and organs layers. New item ids wired into
`WEEK_STUDY.HSS2011[5..7]`. `node work/coverage-gap.mjs --list HSS2011` run afterwards;
every document it lists that is left out is recorded in the plan with the reason.

**Review gate.** The user reads the finished pilot in the app before the rest start.
The pilot is where the real per-lecture depth and the real achievable visual count get
confirmed against an actual week; the targets above are provisional until then.

## Rollout — each its own spec → plan → review

Every sub-project is the same operation: rewrite that scope's existing items to the
depth target, add items until each lecture's deck is fully taught, attach a `visuals`
list to every lesson, wire new ids into `WEEK_STUDY`, record the `coverage-gap` residue.

- SP2 HSS2011 W8–W10 — cardiovascular, respiratory, thoracic regional anatomy.
  Sources `hss.1.1`, `hss.1.2`, `hss.1.3`, `hss.resp`, `hss.thorax.deck`, `hss.1920.*`.
- SP3 HSS2011 W11–W12 — digestive, urogenital. Sources `hss.3.1`–`hss.3.3`,
  `hss.3.1.2019`, `hss.3.3.2019`.
- SP4 HSS2011 W1–W4 — terminology, osteology, joints, skull and vertebral column. The
  largest existing item set (~35), currently the shortest on average. Sources
  `hss.w1.2026`, `hss.msk.2026`, `hss.move.2026`, `hss.4.1`–`hss.4.3`, `hss.manual1920`,
  the FIB and past papers.
- SP5 ABCT2326 W1–W5 — cell and tissue, cardiovascular, respiratory, digestive, renal.
- SP6 ABCT2326 W7–W9, W11–W13 — endocrine, nervous, musculoskeletal, immune.
- SP7 HTI17103 W1–W5 — deep-pass the 13 existing items, expand W4 (radioprotection)
  and W5 (modality choice) to their decks.
- ~~SP8 APSS1A08 W1 + DSAI1202 W1~~ — **not required. Closed 2026-09-08 by the user.**
  Both subjects have exactly one teaching document each (`soc.t01.2026`, `dsai.w1`) and
  `outputs/study/corpus/coverage.js` already records why no more can exist: APSS's later
  topics have no official notes in any of the 22 shared folders, and DSAI1202 is new in
  2026/27 with no earlier edition anywhere to fall back on. The eight existing items
  already say everything their single source supports, so a depth pass has nothing to
  add and there is no free-licensed figure that would teach sociology or AI-literacy
  prose better than the generated layout already does. The later weeks stay documented
  gaps in the Course tab.

## Done when

Per SP: `validateCorpus()` 0 failures; `source-check` 0 misplaced/missing;
`binding-check`, `load-check`, `verify-modules`, `schedule-check`, `figure-key-check`,
`shell-check` pass; `baseline.mjs --check` passes after regeneration; `DATA-INDEX` and
`CODEMAP` current; `coverage-gap` residue recorded. Real Chrome: the week's lessons
read correctly at tablet and desktop width, every figure loads and then loads again
offline, the 3D mounts, credits render on each figure.
