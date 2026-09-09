# Handoff prompt — SP2 to SP7 (depth + visuals rollout)

Give this whole file to the AI that will do the work. It is written to be pasted as the
first message of a fresh session in this repo.

---

You are continuing a nine-part programme in the Radiography Study Studio repo. SP0
(infrastructure) and SP1 (pilot) are merged and signed off by the user. SP8 is closed as
not required. Your job is **SP2 through SP7**: the same operation SP1 performed, applied
to the rest of the corpus.

## Read these first, in this order

1. `CLAUDE.md` — loads automatically; the hard rules and the after-every-edit check list.
2. `docs/superpowers/specs/2026-09-07-syllabus-depth-and-visuals-design.md` — the parent
   spec. Depth target, visual-density target, the constraints that do not move, and the
   SP2–SP8 rollout list. This governs everything below.
3. `docs/superpowers/plans/2026-09-07-sp0-visual-system-upgrade.md` — how `item.visuals`
   works. SP0 is done; you consume it, you do not change it.
4. `docs/superpowers/plans/2026-09-07-sp1-hss-module2-depth-pilot.md` and
   `docs/superpowers/notes/sp1-m2-scope.md` — the pilot. **Copy this shape exactly.**
5. The finished pilot output: the twenty `hss.m2` items in
   `outputs/study/corpus/hss-modules.js` and `outputs/study/corpus/hss-special-senses.js`.
   Read three of them end to end before writing a word. That is the accepted format —
   lesson depth, citation density, `visuals` list composition, `commonMistakes` drawn
   from real past-paper distractors.

## Where things stand — measured, 2026-09-08

168 items. 52 show a real published image; 69 have nothing but an auto-generated text
box built from their own prose. Only `hss.m2` (SP1) is above 1.0 visuals per item.

| SP | Scope | Items now | Median lesson chars | Real image | Visuals/item |
| --- | --- | --- | --- | --- | --- |
| — | **hss.m2 — SP1, done** | 20 | 3,544 | 20/20 | 3.1 |
| SP2 | HSS2011 W8 cardiovascular, W9 respiratory, W10 thoracic/abdominal regional | 6 / 5 / 4 | 1,881 / 1,677 / 2,665 | 0/15 | 1.0 |
| SP3 | HSS2011 W11 digestive, W12 urogenital | 7 / 6 | 2,399 / 3,107 | 0/13 | 1.0 |
| SP4 | HSS2011 W1 terminology+MSK, W2 upper limb, W3 lower limb, W4 head & neck | 23 / 6 / 4 / 6 | 1,572 / 1,382 / 1,288 / 1,307 | 11/39 | 1.0 |
| SP5 | ABCT2326 W1 cell/tissue, W2 CVS, W3 respiratory, W4 digestive, W5 renal | 11 / 6 / 7 / 5 / 4 | 2,536 / 2,262 / 1,631 / 1,575 / 3,337 | 18/33 | 1.0 |
| SP6 | ABCT2326 W7 reproductive, W8 endocrine, W9 nervous, W11 nerve/MSK, W12 MSK/immune, W13 immune | 4 / 3 / 4 / 4 / 4 / 8 | 1,632 / 1,959 / 3,117 / 4,302 / 4,555 / 3,450 | 2/27 | 1.0 |
| SP7 | HTI17103 W1 subject intro, W2 modalities, W3 radiotherapy, W4 radioprotection, W5 modality choice | 2 / 3 / 6 / 1 / 1 | 1,814 / 1,719 / 3,281 / 2,362 / 2,705 | 1/13 | 1.0 |

Regenerate this table yourself before starting each SP — another session may have moved
it. It is a short script over `WEEK_STUDY` in `outputs/schedule.js`, `visualsFor()` in
`outputs/visual-data.js` and `figureFor()` in `outputs/figures.js`.

Read it before deciding what an SP needs. Depth and visuals came apart in earlier work:
SP6's ABCT W11/W12 are already the deepest lessons in the corpus (4,302 / 4,555 median)
and have almost no pictures, so SP6 is mostly a visuals pass. SP4 is the opposite — the
largest item set and the shallowest, and it is the one the student is sitting in now.

## Recommended order — not the spec's numbering

The spec numbers SP2→SP7 by subject, not by urgency. Teaching week 1 was Mon 31 Aug 2026.
Run them in the order the student actually reaches them, and confirm with the user before
starting:

**SP4 → SP5 → SP7 → SP2 → SP6 → SP3.**

SP4, SP5 and SP7 are the weeks in front of the student right now. SP2, SP6 and SP3 are
weeks 8–13 and can follow.

## The two targets

**Depth.** Every item a long-form treatment of its sub-topic, roughly 3,000–5,000
characters in `lesson`, covering everything its sources present on that sub-topic, every
factual sentence page-cited. Each 2-hour lecture resolves to 6–9 such items; a lecture
below that count gains items until its deck is fully taught.

Depth is source-bounded, and that bound is real. A lesson whose only source is one short
document goes as deep as that document allows and stops. Do not invent content to hit a
character count — that is the failure mode this whole programme exists to avoid.

**Visuals.** Every lesson gets a `visuals: [...]` list. Density is decided per item:
structure-heavy anatomy 4+ (primary figure, detail view, schematic, 3D view), concept and
physiology lessons 2–3, a lesson with genuinely little to depict keeps 1. Every figure
carries its `intro` line and callout `key`.

## Hard rules — these break the build or the licence if you get them wrong

- **Source traceability.** Every factual sentence cites a `sourceRefs` entry keyed to a
  real file, on the page it names. `node work/source-check.mjs` enforces both. No internet
  research, no textbook expansion, no invented syllabus. App-authored memory aids are
  allowed and must be tagged as such.
- **No PowerPoint figures, ever.** Lecture and tutorial slides are PolyU and lecturer
  copyright, and this repo is public and auto-deploys. A slide figure may be referenced as
  a text pointer ("Lecture 3, slide 14") and never reproduced.
- **Figures come only from `work/fetch-figure.mjs`.** It reads author, licence and source
  from the same Wikimedia API response that authorised the download, so the credit the app
  shows cannot drift from the credit the licence requires. There is no override flag. If it
  refuses, you do not have that figure — draw a schematic instead.
- **Item ids are stable.** A renamed id silently discards the student's mastery record for
  that lesson. Rescope an item in place; only genuinely new sub-topics get new ids.
- **New ids must be wired into `WEEK_STUDY[subject][week]`** in `outputs/schedule.js`, or
  the Learn tab never shows them. `node work/schedule-check.mjs` catches a bad id.
- **`outputs/` is CRLF, `work/*.mjs` is LF.** A patch matching on `\n` finds nothing in
  `outputs/` and reports success having changed nothing.
- **Bump `CACHE_VERSION` in `outputs/sw.js`** for any shell change. Never bump
  `MODEL_VERSION` or `FIGURES_VERSION` unless you actually replaced those assets.
- **Another session may be editing this tree.** `git fetch` before pushing, and
  `git status` for files you did not touch before running `codemap.mjs`, `data-index.mjs`
  or `baseline.mjs` — regenerating sweeps another session's unfinished work into your
  commit and can paper over a check that is red for their reasons.
- **No build step, no framework, no bundler.** Product constraint, not an oversight.

## Sources — all cached, no drive needed

All 102 cited sources have their page text in `work/source-text.json`, so every citation is
verifiable offline and this is authoring work, not source acquisition. Read them with:

```bash
node work/query.mjs pages <ref> 1-40
```

```bash
node work/query.mjs text "<term>"
```

Refs per SP, all confirmed present in the cache:

- **SP2** `hss.1.1` `hss.1.2` `hss.1.3` `hss.resp` `hss.thorax.deck` `hss.1920.m1.cp` `hss.1920.m1.thorax`
- **SP3** `hss.3.1` `hss.3.2` `hss.3.3` `hss.3.1.2019` `hss.3.3.2019`
- **SP4** `hss.w1.2026` `hss.msk.2026` `hss.move.2026` `hss.4.1` `hss.4.2` `hss.4.3` `hss.manual1920` `hss.vocab` `hss.wordparts` `hss.orientation` `hss.m0`
- **SP5** `phys.1` `phys.1.2026` `phys.overview.2026` `phys.2` `phys.2.supp` `phys.3` `phys.4` `phys.5` `phys.cvs.tut` `phys.resp.tut` `phys.renal.deck` `phys.renal.supp` `phys.renal.tut`
- **SP6** `phys.6.pdf` `phys.7` `phys.8` `phys.9` `phys.10` `phys.hormech` `phys.susan8` `phys.susan9` `phys.susan10` `phys.nerve.deck` `phys.muscle.deck` `phys.nerv.tut` `phys.tut` `phys.extra`
- **SP7** `hti.w1a` `hti.w1b` `hti.w1.2026` `hti.w2` `hti.w3` `hti.w5` `hti.w6` `hti.mi` `hti.rt` `hti.rni` `hti.pres` `hti.arc.deck` `hti.linac1` `hti.linac2` `hti.linac3` `hti.linac4` `hti.sbrt.hcc`

The "tested" anchors are shared across the HSS SPs: `hss.revans`, `hss.fib5yr`,
`hss.pp1718`, `hss.ppans`, `hss.manual1920`. Mine them for `commonMistakes` — SP1's items
show how a real past-paper distractor reads in that field.

## Workflow — per SP, one at a time

Use `superpowers:writing-plans` for step 2 and `superpowers:executing-plans` or
`superpowers:subagent-driven-development` for step 3.

1. **Source scope pass.** Read every deck page in scope. Produce
   `docs/superpowers/notes/sp<N>-scope.md` in the shape of `sp1-m2-scope.md`: one table row
   per intended item, with sub-topic, deck pages, whether it is tested and where, which item
   id carries it (existing rescoped, or NEW), and the exact `sourceRefs` pages. Record every
   sub-topic the sources do **not** support as an explicit note rather than dropping it
   silently. Commit the note before writing any lesson.
2. **Spec, then plan.** One `docs/superpowers/specs/<date>-sp<N>-*.md` and one
   `docs/superpowers/plans/<date>-sp<N>-*.md`. Task-per-week, checkbox steps, exact
   commands and expected output, same as the SP1 plan.
3. **Implement week by week, one commit per week.** Rewrite existing items in place, add
   the new ones, attach a `visuals` list to every item, wire new ids into `WEEK_STUDY`.
4. **Figures.** For each one:

   ```bash
   node work/fetch-figure.mjs search "compact bone osteon"
   ```

   ```bash
   node work/fetch-figure.mjs get "File:Foo.jpg" osteon.jpg 1200
   ```

   `get` prints the `figures.js` stanza to paste. Add the `intro` line and the callout
   `key`; a callout the lesson's sources do not name goes in as `beyond`, read off the
   figure's own labelling. Where no free photo exists for a pathway, write a schematic in
   `outputs/schematics.js` or a layout in `outputs/layouts.js` instead.
5. **Coverage residue.** Run `node work/coverage-gap.mjs --list <SUBJECT>`. For every
   document it still lists in your scope, add a line to `outputs/study/corpus/coverage.js`
   saying why it was left out. Remove any now-false gap line.
6. **Full check sweep** — all of these, expecting a pass line from each:

   ```bash
   node work/load-check.mjs && node work/syntax-check.mjs && node work/verify-modules.mjs && node work/source-check.mjs && node work/visuals-check.mjs && node work/visuals-check.mjs --selftest && node work/figure-key-check.mjs && node work/binding-check.mjs && node work/schedule-check.mjs && node work/shell-check.mjs && node work/codemap-check.mjs && node work/data-index-check.mjs && node work/text-size-check.mjs && node work/baseline.mjs --check
   ```

   `node work/data-index.mjs` and `node work/codemap.mjs` regenerate their docs; run
   `node work/baseline.mjs` to move the corpus-snapshot and ui-strings baselines only after
   eyeballing that the diff is your items and nothing else. `git status` first.
7. **Real Chrome acceptance.** Not the in-app Browser pane — it freezes animations. Serve
   with `node work/dev-server.mjs`, open
   `http://localhost:8420/radiography-study-studio.html`, unregister the old service worker
   and clear caches. Confirm: the week's lessons read correctly at tablet and desktop width,
   every figure loads and then loads again offline after one online view, the 3D mounts and
   is tappable, credits render on each figure. Screenshot one finished lesson.
8. **Stop.** Report what shipped, what the checks said, and what the coverage residue was.
   The user reviews before the next SP starts. Do not chain two SPs without that review.

## Done when — per SP

`validateCorpus()` at 0 failures; `source-check` 0 misplaced and 0 missing; every check in
step 6 passing; `DATA-INDEX.md` and `CODEMAP.md` current; coverage residue recorded in
`coverage.js`; the scope note committed; every item in scope carrying a `visuals` list; the
per-week medians and image counts from the table above measurably moved.

## Two things SP1 learned the hard way

- A sub-topic that is tested every year may live on a single page of one MOOC deck, with no
  lecture-slide treatment at all. That is workable — MOOC decks are legitimate course
  material — but say so in the scope note rather than letting the item look better sourced
  than it is.
- A model answer can name a term (SP1's "central pattern generators") that appears on no
  cached deck page. Either locate a supporting stem, or tag it an app-authored bridge. Do
  not quietly cite the nearest page.
