# SP7 — HTI17103 Medical Radiation Science Weeks 1–5 Depth & Visuals Implementation Plan

Implementation plan for rolling out full pilot-standard depth and visuals to the first five weeks of **HTI17103 Introduction to Medical Radiation Science**.

---

## Proposed Execution Tasks

- **Task 1: Week 1 Implementation (2 items — Subject Intro & Radiographer-to-Be)**
  - Rewrite `hti17103-what-is-radiography` and `hti17103-department-and-request` in `outputs/study/corpus/hti-items.js` to full depth ($\sim 3,000\text{--}5,000$ chars) with verified `sourceRefs` to `hti.w1.2026`, `hti.w1b`, `hti.w5`, and `hti.sched.2026`.
  - Fetch and register CC-BY figure for X-ray tube physics (`xrayTubeAnatomy`) in `outputs/figures.js`.
  - Wire `visuals: [...]` into both items.
  - Check verification suite, commit: `feat(sp7): week 1 subject foundations and radiography department at full depth + visuals`.

- **Task 2: Week 2 Implementation (3 items — Medical Imaging Modalities)**
  - Rewrite `hti17103-ionizing-vs-nonionizing` and `hti17103-modality-detail` in `outputs/study/corpus/hti-items.js`, and `hti17103-modality-best-use` in `outputs/study/corpus/expansion-items.js` to full depth citing `hti.w2`, `hti.mi`, and `hti.rni`.
  - Fetch and register CC-BY figures (`emSpectrumRadiation`, `ctScannerGeometry`, `cArmFluoroscopy`) in `outputs/figures.js`.
  - Wire `visuals: [...]` into all 3 items.
  - Check verification suite, commit: `feat(sp7): week 2 medical imaging modalities at full depth + visuals`.

- **Task 3: Week 3 Implementation (6 items — Introduction to Radiotherapy & Advanced Linac Physics)**
  - Rewrite all 6 items in `outputs/study/corpus/hti-items.js` (`hti17103-radiation-therapy`, `hti17103-linac-physics-components`, `hti17103-linac-accessories-protection`, `hti17103-linac-electrons-rapidarc`, `hti17103-arc-radiation-therapy-vmat-tomo`, `hti17103-sbrt-sirt-hepatocellular-carcinoma`) to full depth citing `hti.w3`, `hti.linac1`, `hti.linac2`, `hti.linac3`, `hti.linac4`, `hti.arc.deck`, `hti.sbrt.hcc`, and `hti.rt`.
  - Fetch and register CC-BY figures (`linacTreatmentHead`, `multileafCollimator`, `vmatRapidArcDelivery`).
  - Wire `visuals: [...]` into all 6 items.
  - Check verification suite, commit: `feat(sp7): week 3 radiotherapy pathway and linac physics at full depth + visuals`.

- **Task 4: Week 4 Implementation (1 item — Basic Radiation Protection)**
  - Rewrite `hti17103-radioprotection` in `outputs/study/corpus/hti-items.js` to full depth citing `hti.w6` and `hti.mi`.
  - Fetch and register CC-BY figure (`radiationProtectionMeasures`).
  - Wire `visuals: [...]` with 2–3 entries.
  - Check verification suite, commit: `feat(sp7): week 4 basic radiation protection at full depth + visuals`.

- **Task 5: Week 5 Implementation (1 item — Modality Choice & Stream Comparison)**
  - Rewrite `hti17103-modality-choice` in `outputs/study/corpus/hti-items.js` to full depth citing `hti.w1.2026`, `hti.w2`, and `hti.w3`.
  - Wire `visuals: [...]` with 2–3 entries (schematic + layout + generated matrix).
  - Check verification suite, commit: `feat(sp7): week 5 modality choice and grand prix of streams at full depth + visuals`.

- **Task 6: Coverage Report, Baselines & Validation Sweep**
  - Run `node work/coverage-gap.mjs --list HTI17103` and update `outputs/study/corpus/coverage.js`.
  - Regenerate docs & baselines:
    ```bash
    node work/data-index.mjs
    node work/codemap.mjs
    node work/build-source-lesson-map.mjs
    node work/baseline.mjs
    ```
  - Bump `CACHE_VERSION` in `outputs/sw.js`.
  - Run complete 14-check validation sweep.
  - Commit: `chore(sp7): update coverage, baselines, and data index for SP7`.

- **Task 7: Stop and Report for User Review**
  - Present final SP7 audit report before moving to SP2.
