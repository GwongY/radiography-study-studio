# SP3 — HSS2011 W11–W12 depth + visuals implementation plan

**Goal:** Rewrite the 12 authored W11–W12 HSS2011 items to ~3,000–5,000 page-cited
chars each, add one new W12 item (`hss2011-uro-nephron-renal-microanatomy`), give every
item 2–4 visuals, and record the coverage residue. Item contract: the committed
[sp3-scope note](../notes/sp3-scope.md).

**Working tree:** the isolated worktree `.claude/worktrees/sp3-hss-w11-12` (branch
`sp3-hss-w11-12`) — SP6 shares the main checkout, so nothing is edited there.

## Task 1: Verify every planned citation up front

For each `p<N> "quote"` pair listed in the item tables below, run the
`citationEvidence` probe against `work/source-text.json` and record OK/fail. Fix any
that fail by re-reading the page (`node work/query.mjs pages <ref> <N>`), picking a real
prose phrase. No lesson sentence is written from a cite that did not verify.

## Task 2: Fetch and register the new figures

`node work/fetch-figure.mjs search "<query>"` then
`node work/fetch-figure.mjs get "File:..." <id>.jpg 1200`; paste the printed stanza
into `outputs/figures.js` (append), add `intro` + callout `key` to each:

| fig id | query |
| --- | --- |
| `salivaryGlands` | salivary glands diagram |
| `stomachRegions` | stomach parts anatomy diagram |
| `largeIntestineAnatomy` | large intestine colon anatomy |
| `biliaryPancreaticDucts` | bile ducts gallbladder pancreas diagram |
| `peritoneumMesenteries` | peritoneum mesentery sagittal |
| `maleReproductiveSagittal` | male reproductive system sagittal |
| `testisSeminiferousTubules` | testis seminiferous tubules epididymis |
| `femaleReproductiveSagittal` | female reproductive system sagittal |
| `uterineTubeOvary` | uterine tube ovary fimbriae |
| `urinaryBladderTrigone` | urinary bladder trigone diagram |

Refusal → schematic in `outputs/schematics.js` (append only). Existing SP4/SP5 figures
are reused, not refetched.

## Task 3: Week 11 — digestive (one commit)

Edit `outputs/study/corpus/hss-modules.js` programmatically (read → JSON.parse body →
replace items by id → stringify null,2 → CRLF). Rewrite the 6 authored ids per the
scope note; every item gets: ~3,000–5,000-char `lesson.explanation` + `plain` +
10 `keyFacts` + `memory` (tagged app-authored aids) + 4–6 `practice` with verified
`src` + one `application` scenario with 3-point rubric + `commonMistakes` from the
fib5yr/ppans distractors + `skills` + `selfCheck` + verified `sourceRefs` +
`visuals` (2–4 entries).

Planned citation anchors (all to be re-verified in Task 1):

- `hss2011-m3-digestive` — hss.3.1 p2, p3, p25; hss.3.1.2019 p10; manual p34 FIB.
- `hss2011-digestive-tract-upper` — hss.3.1 p6, p7, p8, p9, p10, p12, p13, p14, p26;
  hss.3.1.2019 p5, p8, p12, p13, p15; manual p34 (salivary MCQ, oblique FIB).
- `hss2011-digestive-tract-small-large-bowel` — hss.3.1 p15, p17, p18, p19, p21, p22,
  p23, p24; hss.3.1.2019 p17, p18, p19, p20, p28, p34; fib5yr p7/p10/p11; manual p34
  MCQ1/MCQ3.
- `hss2011-digestive-accessory-liver-pancreas` — hss.3.1 p27, p28, p29, p30, p31;
  hss.3.1.2019 p21–24; hss.3.3.2019 p34, p35, p36; manual p34 MCQ5; fib5yr p9/p11.
- `hss2011-digestive-peritoneum-portal-circulation` — hss.3.1 p32–p43;
  hss.3.1.2019 p29–p32; hss.3.3.2019 p20–p25, p40; manual p34 FIB5.
- `hss2011-digestive-tutorial-pastpaper-practice` — revans p3; manual p34;
  fib5yr p7–p11; revans p4.

Checks after the week: `load-check`, `syntax-check`, `verify-modules`,
`source-check`, `visuals-check` (+`--selftest`), `figure-key-check`, `binding-check`,
`schedule-check`. Commit `feat(sp3): week 11 digestive system at full depth + visuals`.

## Task 4: Week 12 — urogenital (one commit)

Same mechanics. Rewrite the 5 authored ids, author the NEW
`hss2011-uro-nephron-renal-microanatomy` (insert adjacent to the other W12 items), add
its id to `WEEK_STUDY.HSS2011[12]` in `outputs/schedule.js` (that block only).

Planned citation anchors:

- `hss2011-m3-urogenital-pelvis` — hss.3.3 p2, p3, p6, p13, p14, p15, p16, p17, p18;
  hss.3.3.2019 p5, p7, p14, p17, p18, p44, p57; revans p3 (3.3), p4; manual p38.
- `hss2011-uro-kidneys-urinary-tract` — hss.3.2 p3–p6, p14–p20; hss.3.3.2019 p39, p43,
  p48, p49; fib5yr p7/p8; revans p3.
- `hss2011-uro-nephron-renal-microanatomy` (NEW) — hss.3.2 p7–p13; manual p35–p36;
  fib5yr p8/p10/p11.
- `hss2011-uro-male-reproductive-anatomy` — hss.3.2 p22–p30; hss.3.3.2019 p46, p47,
  p50–p52; fib5yr p7–p10; revans p3/p4.
- `hss2011-uro-female-reproductive-pelvis` — hss.3.2 p31–p39; hss.3.3.2019 p53–p56;
  fib5yr p10/p11; revans p3; manual p38 FIB5.
- `hss2011-uro-tutorial-pastpaper-practice` — revans p3/p4; manual p36, p38;
  fib5yr p7–p12; pp1718 p3.

Same check set; commit `feat(sp3): week 12 urogenital system at full depth + visuals`.

## Task 5: Coverage residue

`node work/coverage-gap.mjs --list HSS2011`; for every in-scope doc still listed, add a
line to the HSS2011 `covered[]`/`gaps[]` in `outputs/study/corpus/coverage.js` (the
shared `notes[]` array is NOT touched). Remove any line made false by this pass.

## Task 6: Full sweep + hand back

Run all step-4 checks green (SKIP shell-check, codemap-check, data-index-check,
baseline --check — integration pass). Verify: all 13 existing ids present; W12 new id
in `WEEK_STUDY`; per-week medians/images re-measured and moved. STOP and report:
per-week what shipped, check output, coverage residue, branch name
(`sp3-hss-w11-12`), NEW item id in WEEK_STUDY. No merge, no CACHE_VERSION, no
CODEMAP/DATA-INDEX/baselines.
