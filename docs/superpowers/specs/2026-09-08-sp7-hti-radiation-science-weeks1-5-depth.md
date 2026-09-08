# SP7 — HTI17103 Medical Radiation Science Weeks 1–5 Depth & Visuals Design Spec

## Mission & Purpose

Bring the first 5 teaching weeks of **HTI17103 Introduction to Medical Radiation Science** (Weeks 1–5: Subject & Professional Foundations, Medical Imaging Modalities, Radiotherapy & Advanced Linac Physics, Radiation Protection & Limits, Modality Selection & Stream Comparison) to the pilot-grade standard established in SP1, SP4, and SP5:
- **Depth**: Every item upgraded to full long-form treatment ($\sim 3,000\text{--}5,000$ characters across explanation, plain English, 10 key facts, clinical scenario with 3-point rubric, mnemonics/memory aids, common mistakes, skills, self-check), strictly source-bounded and verified page by page against the cached source text.
- **Visual Density**: Every item receives an authored `visuals: [...]` list with 2–4 entries (primary CC-BY figure with callout key, detail schematic/figure, and 3D studio anatomical model layer where relevant).
- **Zero Hallucination / Source Traceability**: 100% of factual assertions backed by `sourceRefs` to verified exact pages and single-line quotes in `hti.w1.2026`, `hti.w1b`, `hti.w1a`, `hti.w2`, `hti.w3`, `hti.w5`, `hti.w6`, `hti.sched.2026`, `hti.linac1`, `hti.linac2`, `hti.linac3`, `hti.linac4`, `hti.arc.deck`, `hti.sbrt.hcc`, `hti.mi`, `hti.rt`.
- **ID Stability**: All 13 existing item IDs preserved without rename to ensure zero user progress disruption.
- **Practice Item Granularity**: Per-question `src: { ref, location }` on all practice questions matching the pilot standard.

---

## Target Scope & Inventory

| Week | Subject / Session | Existing Items | Primary Sources | Key Figures Planned |
| :--- | :--- | :--- | :--- | :--- |
| **W1** | Subject Intro & Radiographer-to-Be | 2 items (`hti17103-what-is-radiography`, `hti17103-department-and-request`) | `hti.w1.2026`, `hti.w1b`, `hti.w5`, `hti.sched.2026` | `xrayTubeAnatomy` (rotating anode X-ray tube cross-section) |
| **W2** | Medical Imaging Modalities | 3 items (`hti17103-ionizing-vs-nonionizing`, `hti17103-modality-detail`, `hti17103-modality-best-use`) | `hti.w2`, `hti.mi`, `hti.rni` | `emSpectrumRadiation` (EM spectrum ionizing boundary), `ctScannerGeometry` (CT helical gantry/detector), `cArmFluoroscopy` (C-arm flat panel system) |
| **W3** | Introduction to Radiotherapy | 6 items (`hti17103-radiation-therapy`, `hti17103-linac-physics-components`, `hti17103-linac-accessories-protection`, `hti17103-linac-electrons-rapidarc`, `hti17103-arc-radiation-therapy-vmat-tomo`, `hti17103-sbrt-sirt-hepatocellular-carcinoma`) | `hti.w3`, `hti.linac1`, `hti.linac2`, `hti.linac3`, `hti.linac4`, `hti.arc.deck`, `hti.sbrt.hcc`, `hti.rt` | `linacTreatmentHead` (accelerator waveguide, bending magnet, target), `multileafCollimator` (120-leaf MLC beam shaping), `vmatRapidArcDelivery` (VMAT gantry rotation delivery) |
| **W4** | Basic Radiation Protection | 1 item (`hti17103-radioprotection`) | `hti.w6`, `hti.mi` | `radiationProtectionMeasures` (Time, Distance inverse square law, Lead Shielding) |
| **W5** | Modality Choice & Stream Comparison | 1 item (`hti17103-modality-choice`) | `hti.w1.2026`, `hti.w2`, `hti.w3` | Modality selection decision matrix schematic / layout |

---

## Architectural & Delivery Rules

1. **File Locations & Preservation**:
   - `outputs/study/corpus/hti-items.js` (12 items)
   - `outputs/study/corpus/expansion-items.js` (1 item: `hti17103-modality-best-use`)
2. **Line Endings**: All modified files in `outputs/` MUST maintain strict CRLF line endings (`\r\n`).
3. **Cache Invalidation**: Bump `CACHE_VERSION` in `outputs/sw.js` on every shell change.
4. **Validation Suite**: Pass all 14 gates after every step.
