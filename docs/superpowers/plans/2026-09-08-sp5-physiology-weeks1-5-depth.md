# SP5 — ABCT2326 Human Physiology Weeks 1–5 Depth & Visuals Implementation Plan

Implementation plan for rolling out full pilot-standard depth and visuals to the first five weeks of **ABCT2326 Human Physiology**.

---

## Proposed Execution Workflow

- **Task 1: Week 1 Implementation (11 items — Cells & Body Organization)**
  - Rewrite all 11 items in `outputs/study/corpus/physiology-items.js` to full depth ($\sim 3,000\text{--}5,000$ chars) with verified `sourceRefs` to `phys.1.2026` / `phys.1`.
  - Fetch and register ~5 OpenStax figures (`cellAnatomy`, `plasmaMembrane`, `mitosisPhases`, `epithelialTissues`, `connectiveTissues`) in `outputs/figures.js` with callout keys and intros.
  - Wire `visuals: [...]` into all 11 items.
  - Check verification suite, commit: `feat(sp5): week 1 cells and tissues at full depth + visuals`.

- **Task 2: Week 2 Implementation (6 items — Cardiovascular System)**
  - Rewrite 4 items in `outputs/study/corpus/physiology-items.js` and 2 items in `outputs/study/corpus/expansion-items.js` (`abct2326-cvs-conduction`, `abct2326-cvs-ecg-cycle`) to full depth citing `phys.2`, `phys.2.supp`, `phys.cvs.tut`.
  - Fetch and register ~4 OpenStax figures (`heartInternalAnatomy`, `cardiacConductingSystem`, `cardiacCyclePressureVolume`, `bloodVesselStructure`).
  - Wire `visuals: [...]` into all 6 items.
  - Check verification suite, commit: `feat(sp5): week 2 cardiovascular system at full depth + visuals`.

- **Task 3: Week 3 Implementation (7 items — Respiratory System)**
  - Rewrite 2 items in `physiology-items.js`, 4 items in `physiology-depth.js`, and 1 item in `expansion-items.js` (`abct2326-resp-gas-transport`) to full depth citing `phys.3`, `phys.resp.tut`.
  - Fetch and register ~5 OpenStax figures (`respiratoryTractAnatomy`, `alveolarMicroarchitecture`, `ventilationMechanics`, `spirometryLungVolumes`, `oxyhemoglobinCurve`).
  - Wire `visuals: [...]` into all 7 items.
  - Check verification suite, commit: `feat(sp5): week 3 respiratory system at full depth + visuals`.

- **Task 4: Week 4 Implementation (5 items — Digestive System)**
  - Rewrite 1 item in `physiology-items.js` (`abct2326-digestive-pathway`) and 4 items in `physiology-depth.js` to full depth citing `phys.4`.
  - Fetch and register ~5 OpenStax figures (`digestiveSystemOverview`, `digestiveWallLayers`, `stomachWallGlands`, `smallIntestineVillus`, `liverLobuleAnatomy`).
  - Wire `visuals: [...]` into all 5 items.
  - Check verification suite, commit: `feat(sp5): week 4 digestive system at full depth + visuals`.

- **Task 5: Week 5 Implementation (4 items — Renal System)**
  - Rewrite all 4 items in `outputs/study/corpus/physiology-items.js` to full depth citing `phys.5`, `phys.renal.deck`, `phys.renal.supp`, `phys.renal.tut`.
  - Fetch and register ~4 OpenStax figures (`kidneyGrossAnatomy`, `nephronVascularMicroanatomy`, `glomerularFiltrationMembrane`, `countercurrentMultiplierMechanism`).
  - Wire `visuals: [...]` into all 4 items.
  - Check verification suite, commit: `feat(sp5): week 5 renal system at full depth + visuals`.

- **Task 6: Coverage Report, Baselines & Validation Sweep**
  - Run `node work/coverage-gap.mjs --list ABCT2326` and update `outputs/study/corpus/coverage.js`.
  - Regenerate docs & baselines:
    ```bash
    node work/data-index.mjs
    node work/codemap.mjs
    node work/build-source-lesson-map.mjs
    node work/baseline.mjs
    ```
  - Bump `CACHE_VERSION` in `outputs/sw.js`.
  - Run complete 14-check validation sweep.
  - Commit: `chore(sp5): update coverage, baselines, and data index for SP5`.

- **Task 7: Browser Acceptance & Presentation**
  - Verify offline caching, layout scaling, and visuals rendering in browser.
  - Present final SP5 metrics to user for review before proceeding to SP7.
