# SP6 — ABCT2326 Weeks 7–13 Implementation Plan

> Executed on branch `sp6-abct-w7-13` (never master, never pushed). SP3 runs
> concurrently; the parallel contract in the handoff binds every step.

**Goal:** Rewrite the 6 existing W7/W8 reproductive and endocrine items to full
depth, add 5 new items across W7/W8/W9/W11/W13 where decks teach untaught
material, attach `visuals` lists to all 27 existing W7–W13 items, wire the new
ids into `WEEK_STUDY.ABCT2326`, and record the coverage residue — one commit per
week.

**Architecture:** content edits to `outputs/study/corpus/physiology-items.js`,
`physiology-reproductive.js`, `expansion-items.js` (ABCT ids only); figures
appended to `outputs/figures.js`; schematics appended to `outputs/schematics.js`;
`WEEK_STUDY.ABCT2326[7|8|9|11|12|13]` blocks in `outputs/schedule.js`; ABCT2326
block of `outputs/study/corpus/coverage.js`. Nothing else. `outputs/` is CRLF.

**Verification before writing:** every quoted citation confirmed with
`citationEvidence` (work/lib/source-lesson-map.mjs) against
`work/source-text.json` before the item is written.

---

## Task 1 — Week 7 (reproductive, `phys.6.pdf`)

- [ ] Fetch figures (spermatogenesis, sperm structure, female reproductive
      anatomy, ovarian cycle, fertilization/blastocyst, placenta) with
      `node work/fetch-figure.mjs`; append stanzas + `intro` + `key` to figures.js.
- [ ] Rescope in place: `abct2326-repro-male-regulation` (pp4–17),
      `abct2326-repro-ovarian-menstrual-cycle` (pp34–42),
      `abct2326-repro-fertilization-implantation` (pp44–53),
      `abct2326-repro-placenta-parturition` (pp54–66) — 3,000–5,000 char
      explanations, visuals lists, practice kept ≥1 valid question each.
- [ ] New: `abct2326-repro-male-tract-accessory` (pp18–23),
      `abct2326-repro-female-tract-follicles` (pp24–33); wire into
      `WEEK_STUDY.ABCT2326[7]`.
- [ ] CRLF check on every touched file; run the step-4 check sweep.
- [ ] Commit `feat(sp6): week 7 reproductive system at full depth + visuals`.

## Task 2 — Week 8 (endocrine, `phys.7` + `phys.hormech`)

- [ ] Fetch figures (endocrine glands overview, hormone mechanism/schematic,
      thyroid, adrenal, pancreas/islets) — Wikimedia or schematics.
- [ ] Rescope: `abct2326-endocrine-delivery` (phys.7 p3–11; hormech p1),
      `abct2326-endocrine-receptors` (hormech p2; phys.7 p13),
      `abct2326-endocrine-second-messengers` (phys.7 p13, 17–27; hormech p3–9).
- [ ] New: `abct2326-endocrine-pituitary-axes` (p28–39),
      `abct2326-endocrine-adrenal-thyroid` (p40–52),
      `abct2326-endocrine-pancreas-misc` (p53–62); wire into
      `WEEK_STUDY.ABCT2326[8]`.
- [ ] Checks + CRLF check. Commit
      `feat(sp6): week 8 endocrine system at full depth + visuals`.

## Task 3 — Week 9 (nervous — visuals pass, 1 new item)

- [ ] Fetch figures (neuron anatomy, glial cells, action potential curve,
      synapse, autonomic receptor schematic).
- [ ] Attach visuals to `abct2326-nervous-divisions`,
      `abct2326-nervous-synaptic-refractory-neuroglia`,
      `phys-nerve-cellular-action-potential`, `abct2326-synapse-drug-action`.
      Add `phys.nerv.tut` MCQ anchors to commonMistakes where they fit.
- [ ] New: `abct2326-nervous-synapse-types-nt` (phys.nerve.deck p44–57 —
      electrical vs chemical synapse, ACh, nicotinic/muscarinic/adrenergic,
      EPSP/IPSP, summation; tested by tut Q4/Q5, MCQ 3); wire into
      `WEEK_STUDY.ABCT2326[9]`.
- [ ] Checks. Commit `feat(sp6): week 9 nervous system visuals + synapse item`.

## Task 4 — Week 11 (nerve/MSK — visuals pass + bone item)

- [ ] Fetch figures (sarcomere, NMJ, motor unit, compact/spongy bone, osteon).
- [ ] Attach visuals to `abct2326-muscle-types`, `abct2326-muscle-action`,
      `abct2326-nmj-coupling`, `abct2326-muscle-ultrastructure-energetics`.
- [ ] New: `abct2326-msk-bone-structure-remodeling` (phys.9 pp79–89 — compact
      vs spongy, osteon, trabeculae, bone cells, remodelling, calcium hormonal
      balance); wire into `WEEK_STUDY.ABCT2326[11]`.
- [ ] Checks. Commit `feat(sp6): week 11 nerve/MSK visuals + bone item`.

## Task 5 — Week 12 (MSK/immune bridge — visuals pass only)

- [ ] Fetch figures (crossbridge/sarcomere detail, muscle fibre types, muscle
      spindle/Golgi schematic, lymphatic vessels).
- [ ] Attach visuals to `abct2326-crossbridge-cycle`,
      `abct2326-fibre-types-fuel`, `abct2326-spindle-golgi`,
      `abct2326-msk-immune-overview`. No padding — the lessons already teach
      their decks.
- [ ] Checks. Commit `feat(sp6): week 12 MSK/immune visuals pass`.

## Task 6 — Week 13 (immune — visuals + antibody item)

- [ ] Fetch figures (NK cell/perforin, complement cascade schematic,
      inflammation, antigen presentation/MHC, T cell activation, antibody
      structure, clonal selection).
- [ ] Attach visuals to all 8 existing W13 items; deepen
      `abct2326-inflammation-fever`, `abct2326-t-cell-types`,
      `abct2326-acquired-immunity`, `abct2326-immune-adaptive` only where
      susan10 carries untaught material (lymphotoxin, protectin, 10%/°C,
      100 M antibodies/hour).
- [ ] New: `abct2326-antibody-structure-classes` (phys.10 p61, 64, 67 — heavy/
      light chains, constant/variable, 5 classes, opsonization, antigen–antibody
      complexes, SCID); wire into `WEEK_STUDY.ABCT2326[13]`.
- [ ] Checks. Commit `feat(sp6): week 13 immune system visuals + antibody item`.

## Task 7 — Coverage residue and handback

- [ ] `node work/coverage-gap.mjs --list ABCT2326`; add a line to the ABCT2326
      block of `coverage.js` for every still-listed document in scope; remove
      any now-false gap line (do NOT touch the shared notes[] array).
- [ ] Full step-4 sweep, one pass line per check; regenerate the per-week table
      to show the movement.
- [ ] STOP. Report what shipped per week, check output, coverage residue,
      branch name, and the new ids added to WEEK_STUDY. No merge, no
      CACHE_VERSION bump, no CODEMAP/DATA-INDEX/baseline regeneration.
