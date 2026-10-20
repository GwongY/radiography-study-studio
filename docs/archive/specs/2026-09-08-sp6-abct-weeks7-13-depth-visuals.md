# SP6 — ABCT2326 Weeks 7–13 depth and visuals

SP6 is the depth-and-visuals pass over ABCT2326 Weeks 7, 8, 9, 11, 12 and 13
(reproductive, endocrine, nervous, nerve/MSK, MSK/immune, immune), following the
parent spec (`2026-09-07-syllabus-depth-and-visuals-design.md`) and the SP1 pilot
format. Sources are all cached (`phys.6.pdf`, `phys.7`, `phys.8`, `phys.9`,
`phys.10`, `phys.hormech`, `phys.susan8`, `phys.susan9`, `phys.susan10`,
`phys.nerve.deck`, `phys.muscle.deck`, `phys.nerv.tut`, `phys.tut`, `phys.extra`).

## What SP6 actually is

The regenerated table at SP6 start showed W7 (median 1,457 chars) and W8 (1,842)
well under the depth target, while W11–W13 are already the deepest ABCT weeks.
So SP6 splits:

- **W7 and W8 — depth pass.** Existing items rewritten in place to 3,000–5,000
  chars, covering everything their decks teach, plus new items until each deck is
  fully taught: W7 gains 2 items (male tract/accessory organs; female tract and
  folliculogenesis), W8 gains 3 (pituitary axes; adrenal/thyroid/parathyroid;
  pancreas/pineal/gonads). Each lecture then resolves to 6 items.
- **W9, W11, W12, W13 — visuals pass.** The existing lessons already teach their
  decks; SP6 does not pad them. It attaches `visuals` lists, fetches the free
  figures the topics warrant, authors schematics where no free figure exists, and
  adds exactly two items for deck sections nothing currently teaches: the nervous
  synapse/receptor material (W9, `abct2326-nervous-synapse-types-nt` — tested by
  `phys.nerv.tut` Q4/Q5) and bone structure/remodelling (W11,
  `abct2326-msk-bone-structure-remodeling`, `phys.9` pp79–89), plus the antibody
  structure/5-classes material (W13, `abct2326-antibody-structure-classes`,
  `phys.10` p61, 64, 67).

27 items become 30. Every item carries a `visuals` list of 2–4 entries. Every
factual sentence page-cited; `commonMistakes` draw from `phys.nerv.tut` MCQs in W9
and from deck-internal traps elsewhere (the deck numbers that differ between
`phys.10` and `phys.susan10` are stated as discrepancies, not silently resolved).

## Constraints that do not move

Source traceability (`work/source-check.mjs`), no PowerPoint figures, figures only
via `work/fetch-figure.mjs`, item ids stable, new ids wired into
`WEEK_STUDY.ABCT2326[w]`, no build step. SP6-specific: **SP3 runs concurrently** —
SP6 works on branch `sp6-abct-w7-13`, touches only its own ABCT item files,
appends to `figures.js`/`schematics.js`/`layouts.js`, edits only the
`WEEK_STUDY.ABCT2326[7|8|9|11|12|13]` blocks in `schedule.js` and only the
ABCT2326 subject block in `coverage.js`, and does NOT touch `sw.js`,
`CODEMAP.md`, `DATA-INDEX.md`, `source-lesson-map.js` or baselines — the
integration pass does those once for both SPs.

## Done when

`validateCorpus()` 0 failures; `source-check` 0 misplaced/missing; the SP6 check
sweep green (load-check, syntax-check, verify-modules, source-check,
visuals-check + --selftest, figure-key-check, binding-check, schedule-check);
every W7–W13 item carries a visuals list; W7/W8 medians measurably moved; scope
note committed; coverage residue recorded. No merge to master, no CACHE_VERSION
bump, no doc/baseline regeneration — hand back for the integration pass.
