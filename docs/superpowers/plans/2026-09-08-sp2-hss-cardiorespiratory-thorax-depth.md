# SP2 — HSS2011 Human Anatomy Weeks 8–10 Depth & Visuals Implementation Plan

Implementation plan for rolling out full pilot-standard depth and visuals to Weeks 8–10 of **HSS2011 Human Anatomy** (Cardiovascular & Lymphatics, Respiratory System, and Regional Anatomy of the Thorax).

---

## Proposed Execution Tasks

- **Task 1: Source Scope Contract & Asset Preparation**
  - Author and commit `docs/superpowers/notes/sp2-scope.md` and design spec.
  - Search Wikimedia Commons for CC-BY figures matching planned keys:
    - `cardiacConductionSystem` (SA node, AV node, bundle of His, Purkinje network)
    - `coronaryCirculation` (anterior and posterior coronary arteries/veins, coronary sinus)
    - `lymphNodeStructure` (cortex, germinal centres, medulla, afferent/efferent lymphatics)
    - `larynxAnatomy` (thyroid, cricoid, epiglottis, arytenoids, vocal cords)
    - `lungsGrossAnatomy` (lobes, fissures, hilum, cardiac notch)
    - `thoracicCageAnatomy` (sternum, 12 ribs, costal cartilages, thoracic vertebrae)
    - `thoracicDiaphragm` (inferior view with caval T8, esophageal T10, aortic T12 apertures)
    - `mediastinumDivisions` (superior vs anterior, middle, posterior compartments)
    - `mammaryGlandAnatomy` (glandular lobes, lactiferous ducts/sinuses, Cooper's ligaments, axillary nodes)
  - Download image assets to `outputs/figures/` and register in `outputs/figures.js` with full callout keys and intros.
  - Verify figure registration via `node work/figure-key-check.mjs`.

- **Task 2: Week 8 Implementation (8 items — Cardiovascular & Lymphatics)**
  - Expand 4 existing items in `outputs/study/corpus/hss-modules.js` to full depth ($\sim 3,000\text{--}5,000$ chars):
    - `hss2011-m1-heart-wall-valves`
    - `hss2011-cvs-internal-chambers-valves`
    - `hss2011-cvs-coronary-circulation-conduction`
    - `hss2011-cvs-tutorial-pastpaper-practice`
  - Author 2 new high-yield items in `outputs/study/corpus/hss-modules.js`:
    - `hss2011-cvs-blood-vessel-circuits` (systemic vs pulmonary circuits, vascular tunic histology, capillary beds)
    - `hss2011-cvs-lymphatic-system` (lymph fluid, capillaries, thoracic duct vs right duct, cisterna chyli, lymph node histology)
  - Register new items in `outputs/schedule.js` under `WEEK_STUDY.HSS2011[8]`.
  - Wire verified `visuals: [...]` into all 6 lesson items (with 3D companions `hss2011-structures-heartChambers` and `hss2011-structures-greatVessels` completing the 8-item cluster).
  - Verify citations against `source-text.json`, enforce CRLF line endings, run 14-check validation suite.
  - Commit: `feat(sp2): week 8 cardiovascular and lymphatic anatomy at full depth + visuals`.

- **Task 3: Week 9 Implementation (7 items — Respiratory System)**
  - Expand 4 existing items in `outputs/study/corpus/hss-modules.js` to full depth:
    - `hss2011-resp-upper-tract-larynx`
    - `hss2011-m1-lungs-airway`
    - `hss2011-resp-pleura-lungs-gross`
    - `hss2011-resp-tutorial-pastpaper-practice`
  - Author 2 new high-yield items in `outputs/study/corpus/hss-modules.js`:
    - `hss2011-resp-respiratory-epithelium-alveoli` (mucus escalator, Type I & II pneumocytes, surfactant, 3-layer respiratory membrane)
    - `hss2011-resp-mechanics-muscles-breathing` (diaphragm, phrenic nerve C3-C5, intercostals, quiet vs forced ventilation mechanics)
  - Register new items in `outputs/schedule.js` under `WEEK_STUDY.HSS2011[9]`.
  - Wire verified `visuals: [...]` into all 6 lesson items (with 3D companion `hss2011-structures-airwayTree` completing the 7-item cluster).
  - Verify citations against `source-text.json`, enforce CRLF line endings, run 14-check validation suite.
  - Commit: `feat(sp2): week 9 respiratory system anatomy at full depth + visuals`.

- **Task 4: Week 10 Implementation (6 items — Regional Anatomy of the Thorax)**
  - Expand `hss2011-osteo-ribs-sternum` in `outputs/study/corpus/hss-osteology.js` to full depth.
  - Expand 3 existing items in `outputs/study/corpus/hss-modules.js` to full depth:
    - `hss2011-thorax-intercostal-diaphragm`
    - `hss2011-thorax-regional-landmarks`
    - `hss2011-thorax-tutorial-pastpaper-practice`
  - Author 2 new high-yield items in `outputs/study/corpus/hss-modules.js`:
    - `hss2011-thorax-mediastinum-divisions-contents` (transverse thoracic plane T4/T5, superior vs anterior/middle/posterior mediastinal compartments)
    - `hss2011-thorax-breast-axillary-lymphatics` (mammary gland lobes, lactiferous ducts/sinuses, Cooper's ligaments, arterial supply, 75% axillary vs 25% parasternal lymph drainage)
  - Register new items in `outputs/schedule.js` under `WEEK_STUDY.HSS2011[10]`.
  - Wire verified `visuals: [...]` into all 6 items.
  - Verify citations against `source-text.json`, enforce CRLF line endings, run 14-check validation suite.
  - Commit: `feat(sp2): week 10 regional thorax anatomy at full depth + visuals`.

- **Task 5: Coverage Report, Baselines, Data Index & Cache Bump**
  - Run `node work/coverage-gap.mjs --list HSS2011` and update `outputs/study/corpus/coverage.js`.
  - Regenerate docs & baselines:
    ```bash
    node work/data-index.mjs
    node work/codemap.mjs
    node work/build-source-lesson-map.mjs
    node work/baseline.mjs
    ```
  - Bump `CACHE_VERSION` in `outputs/sw.js`.
  - Ensure all touched files have strict CRLF endings.
  - Run complete 14-check validation sweep.
  - Commit: `chore(sp2): update coverage, baselines, and data index for SP2`.

- **Task 6: Audit & Stop Condition**
  - Verify all 21 items in Weeks 8–10 are at full pilot depth with 0 missing citations and 0 missing visuals.
  - Halt and present comprehensive SP2 audit report before proceeding to SP6.
