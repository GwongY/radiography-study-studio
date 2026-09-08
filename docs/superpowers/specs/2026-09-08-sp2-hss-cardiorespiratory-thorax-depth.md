# SP2 — HSS2011 Human Anatomy Weeks 8–10 Depth & Visuals Design Spec

## Mission & Purpose

Bring the Cardiorespiratory and Thoracic Regional Anatomy modules of **HSS2011 Human Anatomy** (Weeks 8–10: Cardiovascular & Lymphatics, Respiratory System, and Regional Anatomy of the Thorax) to the pilot-grade standard established in SP1, SP4, SP5, and SP7:
- **Depth**: Every item upgraded to full long-form treatment ($\sim 3,000\text{--}5,000$ characters across explanation, plain English, 10 key facts, clinical scenario with 3-point rubric, mnemonics/memory aids, common mistakes from past exams, skills, self-check), strictly source-bounded and verified page by page against the cached source text.
- **Visual Density**: Every item receives an authored `visuals: [...]` list with 2–4 entries (primary CC-BY figure with callout key, detail schematic/figure, and 3D studio anatomical model layer where relevant).
- **Balanced Coverage**: Expand the 15 existing items and introduce 6 new high-yield items (target: W8: 8 items, W9: 7 items, W10: 6 items; total 21 items) to provide comprehensive coverage across both lecture slides and authentic HKPolyU past-paper questions.
- **Zero Hallucination / Source Traceability**: 100% of factual assertions backed by `sourceRefs` to verified exact pages and single-line quotes in `hss.1.1`, `hss.1.2`, `hss.1.3`, `hss.resp`, `hss.thorax.deck`, `hss.1920.m1.thorax`, `hss.manual1920`, `hss.revans`, `hss.fib5yr`, `hss.ppans`, `hss.pp1718`.
- **ID Stability**: All 15 existing item IDs preserved without rename to ensure zero user progress disruption.
- **Practice Item Granularity**: Per-question `src: { ref, location }` on all 4–6 practice questions per lesson matching the pilot standard.

---

## Target Scope & Inventory (21 Items Total)

| Week | Subject / Session | Existing Items Preserved | New Items Proposed | Primary Sources | Key Figures Planned |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **W8** | Cardiovascular & Lymphatics (8 items) | `hss2011-m1-heart-wall-valves`<br>`hss2011-cvs-internal-chambers-valves`<br>`hss2011-cvs-coronary-circulation-conduction`<br>`hss2011-cvs-tutorial-pastpaper-practice`<br>`hss2011-structures-heartChambers`<br>`hss2011-structures-greatVessels` | `hss2011-cvs-blood-vessel-circuits`<br>`hss2011-cvs-lymphatic-system` | `hss.1.1`, `hss.1.2`, `hss.manual1920`, `hss.fib5yr`, `hss.ppans` | `heartInternalAnatomy`, `heart`, `cardiacConductionSystem`, `coronaryCirculation`, `bloodVesselStructure`, `lymphNodeStructure` |
| **W9** | Respiratory System (7 items) | `hss2011-resp-upper-tract-larynx`<br>`hss2011-m1-lungs-airway`<br>`hss2011-resp-pleura-lungs-gross`<br>`hss2011-resp-tutorial-pastpaper-practice`<br>`hss2011-structures-airwayTree` | `hss2011-resp-respiratory-epithelium-alveoli`<br>`hss2011-resp-mechanics-muscles-breathing` | `hss.resp`, `hss.1.2`, `hss.manual1920`, `hss.fib5yr`, `hss.ppans` | `respiratoryTractAnatomy`, `larynxAnatomy`, `respiratoryExchange`, `alveolarMicroarchitecture`, `lungsGrossAnatomy`, `spirometryLungVolumes` |
| **W10** | Regional Anatomy of the Thorax (6 items) | `hss2011-osteo-ribs-sternum`<br>`hss2011-thorax-intercostal-diaphragm`<br>`hss2011-thorax-regional-landmarks`<br>`hss2011-thorax-tutorial-pastpaper-practice` | `hss2011-thorax-mediastinum-divisions-contents`<br>`hss2011-thorax-breast-axillary-lymphatics` | `hss.1.3`, `hss.thorax.deck`, `hss.1920.m1.thorax`, `hss.manual1920`, `hss.fib5yr`, `hss.ppans`, `hss.pp1718` | `thoracicCageAnatomy`, `thoracicDiaphragm`, `mediastinumDivisions`, `mammaryGlandAnatomy` |

---

## Architectural & Delivery Rules

1. **File Locations & Preservation**:
   - `outputs/study/corpus/hss-modules.js` (main cardiorespiratory and thorax items)
   - `outputs/study/corpus/hss-osteology.js` (`hss2011-osteo-ribs-sternum`)
   - `outputs/schedule.js` (`WEEK_STUDY.HSS2011` registration for new items)
   - `outputs/figures.js` (new CC-BY figures registration)
2. **Line Endings**: All modified and created files in `outputs/` MUST maintain strict CRLF line endings (`\r\n`).
3. **Cache Invalidation**: Bump `CACHE_VERSION` in `outputs/sw.js` on every shell change.
4. **Validation Suite**: Pass all 14 gates (`npm test` equivalent) after every step.
