# SP3 — HSS2011 W11 Digestive + W12 Urogenital: depth and visuals

Part of the 2026-09-07 programme ([parent spec](2026-09-07-syllabus-depth-and-visuals-design.md)).
Scope pass and item contract: [sp3-scope note](../notes/sp3-scope.md).

## Goal

Bring HSS2011 Weeks 11–12 to the programme targets: every authored item a long-form,
fully page-cited treatment of its sub-topic (~3,000–5,000 chars, 10 keyFacts, 4–6
practice items with verified `src`, a clinical scenario with a 3-point rubric, tagged
memory aids, commonMistakes drawn from the real Module-3 distractors), 2–4 visuals per
item, all 13 existing ids preserved, one new item where the lecture was under 6 authored
items and a deck block was demonstrably untaught.

## Measured starting point (2026-09-08)

W11 Digestive: 6 authored items (+1 3D companion), authored median ≈ 1,320 chars,
0 real images. W12 Urogenital: 5 authored items (+1 3D companion), authored median
≈ 1,921 chars, 0 real images.

## Changes

1. **Rescope in place** the 12 authored items in `outputs/study/corpus/hss-modules.js`
   (ids stable; mastery records preserved). Depth per the scope note's item list.
2. **Add `hss2011-uro-nephron-renal-microanatomy`** (W12): hss.3.2 p7–13 renal
   circulation + nephron + renal corpuscle + JG complex + tubule segments, currently
   crushed into `hss2011-uro-kidneys-urinary-tract`; tested via the arcuate-artery MCQ,
   the glomerulus/minor-calyx recurring blanks and manual p35 guiding questions 1–2.
   Wire into `WEEK_STUDY.HSS2011[12]` in `outputs/schedule.js`.
3. **Visuals** on every item: reuse SP4/SP5 figures already registered
   (`digestiveSystemOverview`, `digestiveWallLayers`, `stomachWallGlands`,
   `smallIntestineVillus`, `liverLobuleAnatomy`, `kidneyGrossAnatomy`,
   `nephronVascularMicroanatomy`, `glomerularFiltrationMembrane`,
   `nephronSecretionReabsorption`, `abdominalQuadrantsRegions`, `maleFemalePelvis`,
   `thoracicDiaphragm`, the `nephron` schematic) + ~10 new free-licensed Wikimedia
   figures fetched through `work/fetch-figure.mjs` + 3D `organs`-layer model views +
   `{gen:true}` where nothing free fits. Append new figures to `outputs/figures.js`;
   every one gets `intro` + callout `key`.
4. **Coverage residue** in `outputs/study/corpus/coverage.js` — HSS2011 block's
   `covered[]`/`gaps[]` only; `notes[]` untouched (shared).

## Constraints that do not move

- Source traceability: every factual sentence traceable to a page verified via
  `citationEvidence` before writing; `source-check` 0 misplaced / 0 missing at the end.
- No PowerPoint figures. Wikimedia free licence only, through `fetch-figure.mjs`; no
  override; refusal → schematic.
- `hss-modules.js` is a pure-JSON array literal, CRLF — edit programmatically only.
- No CACHE_VERSION bump, no CODEMAP/DATA-INDEX/baseline regeneration, no
  source-lesson-map regeneration — the integration pass does those once for SP3+SP6.
- SP6 shares the repo: all edits land in the isolated worktree
  `.claude/worktrees/sp3-hss-w11-12` on branch `sp3-hss-w11-12`; never commit on
  master; never push.

## Done when

`validateCorpus()` 0 failures; `source-check` 0 misplaced/0 missing; `load-check`,
`syntax-check`, `verify-modules`, `visuals-check` (+selftest), `figure-key-check`,
`binding-check`, `schedule-check` all pass; every W11–W12 authored item carries a
`visuals` list with ≥2 entries; per-week medians and image counts measurably moved
(W11 authored median ≥ 3,000; W12 authored median ≥ 3,000; real images ≥ 10 across the
13 items); all 13 existing ids intact; scope note committed; coverage residue recorded.
Then STOP — hand back for integration (merge, CACHE_VERSION, CODEMAP/DATA-INDEX,
baselines, source-lesson-map are integration-pass work).
