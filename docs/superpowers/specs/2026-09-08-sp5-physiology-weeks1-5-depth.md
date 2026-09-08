# SP5 — ABCT2326 Human Physiology Weeks 1–5 Depth & Visuals Design Spec

## Mission & Purpose

Bring the first 5 teaching weeks of **ABCT2326 Human Physiology** (Cells & Body Organization, Cardiovascular System, Respiratory System, Digestive System, Renal System) to the full pilot-grade standard established in SP1 and continued in SP4:
- **Depth**: Every item expanded to comprehensive treatment ($\sim 3,000\text{--}5,000$ characters across explanation, plain English, key facts, clinical application, common mistakes, and practice questions), strictly source-bounded and verified page by page against the cached source text.
- **Visual Density**: Every item receives an authored `visuals: [...]` list with 2–4 entries (primary CC-BY figure with callout key, detail schematic/figure, and 3D studio anatomical model layer where relevant).
- **Zero Hallucination / Source Traceability**: 100% of factual assertions backed by `sourceRefs` to verified pages in `phys.1.2026`, `phys.1`, `phys.2`, `phys.2.supp`, `phys.cvs.tut`, `phys.3`, `phys.resp.tut`, `phys.4`, `phys.5`, `phys.renal.deck`, `phys.renal.supp`, `phys.renal.tut`.
- **ID Stability**: All 33 existing item IDs preserved without rename to ensure zero user progress disruption.

---

## Target Scope & Inventory

| Week | Subject / Topic | Existing Items | Primary Sources | Key Figures Planned |
| --- | --- | --- | --- | --- |
| **W1** | Cells & Body Organization | 11 items (`abct2326-cells-organisation`, `abct2326-plasma-membrane`, `abct2326-organelles`, `abct2326-nucleus-genetic-code`, `abct2326-protein-synthesis`, `abct2326-cell-division`, `abct2326-epithelium-classification`, `abct2326-connective-tissue-classes`, `abct2326-muscle-neural-tissue`, `abct2326-homeostasis`, `abct2326-feedback-loops`) | `phys.1.2026`, `phys.1` | `cellAnatomy`, `plasmaMembrane`, `mitosisPhases`, `epithelialTissues`, `connectiveTissues` |
| **W2** | Cardiovascular System | 6 items (`abct2326-cvs-circuits`, `abct2326-cvs-heart-structure`, `abct2326-blood-composition`, `abct2326-cvs-conduction`, `abct2326-cvs-ecg-cycle`, `abct2326-cvs-hemodynamics-tutorial`) | `phys.2`, `phys.2.supp`, `phys.cvs.tut` | `heartInternalAnatomy`, `cardiacConductingSystem`, `cardiacCyclePressureVolume`, `bloodVesselStructure` |
| **W3** | Respiratory System | 7 items (`abct2326-resp-pathway`, `abct2326-resp-ventilation-mechanics`, `abct2326-resp-lung-volumes`, `abct2326-resp-oxygen-transport`, `abct2326-resp-carbon-dioxide-control`, `abct2326-resp-gas-transport`, `abct2326-resp-ventilation-chemoreceptors`) | `phys.3`, `phys.resp.tut` | `respiratoryTractAnatomy`, `alveolarMicroarchitecture`, `ventilationMechanics`, `spirometryLungVolumes`, `oxyhemoglobinCurve` |
| **W4** | Digestive System | 5 items (`abct2326-digestive-pathway`, `abct2326-digestive-wall-motility`, `abct2326-digestive-stomach-control`, `abct2326-digestive-small-intestine-accessory`, `abct2326-digestive-hormones-colon`) | `phys.4` | `digestiveSystemOverview`, `digestiveWallLayers`, `stomachWallGlands`, `smallIntestineVillus`, `liverLobuleAnatomy` |
| **W5** | Renal System | 4 items (`abct2326-renal-nephron`, `abct2326-renal-filtration-countercurrent`, `abct2326-renal-countercurrent-vasarecta`, `abct2326-renal-tubular-clearance-sympathetic`) | `phys.5`, `phys.renal.deck`, `phys.renal.supp`, `phys.renal.tut` | `kidneyGrossAnatomy`, `nephronVascularMicroanatomy`, `glomerularFiltrationMembrane`, `countercurrentMultiplierMechanism` |

---

## Architectural & Delivery Rules

1. **File Locations & Preservation**:
   - Week 1: `outputs/study/corpus/physiology-items.js` (11 items)
   - Week 2: `outputs/study/corpus/physiology-items.js` (4 items) + `outputs/study/corpus/expansion-items.js` (2 items: `abct2326-cvs-conduction`, `abct2326-cvs-ecg-cycle`)
   - Week 3: `outputs/study/corpus/physiology-items.js` (2 items) + `outputs/study/corpus/physiology-depth.js` (4 items) + `outputs/study/corpus/expansion-items.js` (1 item: `abct2326-resp-gas-transport`)
   - Week 4: `outputs/study/corpus/physiology-items.js` (1 item: `abct2326-digestive-pathway`) + `outputs/study/corpus/physiology-depth.js` (4 items)
   - Week 5: `outputs/study/corpus/physiology-items.js` (4 items)
2. **Line Endings**: All modified files in `outputs/` MUST maintain strict CRLF line endings.
3. **Cache Invalidation**: Bump `CACHE_VERSION` in `outputs/sw.js` on every shell change.
4. **Validation Suite**: Pass all 14 gates after every step.
