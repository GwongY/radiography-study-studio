# SP6 — ABCT2326 Physiology Weeks 7–13 Source Scope Pass

Contract for the ABCT2326 Weeks 7–13 corpus (Reproductive, Endocrine, Nervous,
Nerve/MSK, MSK/Immune, Immune). Every row below is one study item. All 27 existing
item IDs are preserved (never rename — that wipes the mastery record); 6 NEW ids are
added where the decks teach material no existing item carries. Every cited page below
was verified against `work/source-text.json`.

## Regenerated per-week table (2026-09-08, SP6 start)

| Week | Lecture | Items now | Median lesson chars | Real images | Notes |
| --- | --- | --- | --- | --- | --- |
| W7 | Reproductive | 4 → 6 | 1,457 | 0/4 | Shallowest weeks; depth AND visuals needed |
| W8 | Endocrine | 3 → 6 | 1,842 | 0/3 | Shallow; depth AND visuals needed |
| W9 | Nervous | 4 → 5 | 2,746 | 0/4 | Visuals pass + one new synapse item |
| W11 | Nerve / MSK | 4 → 5 | 2,708 | 0/4 | Visuals pass + bone item (deck section untaught) |
| W12 | MSK / Immune | 4 → 4 | 3,861 | 0/4 | Visuals pass only |
| W13 | Immune | 8 → 9 | 2,962 | 0/8 | Visuals pass + antibody-structure item (deck section untaught) |

(Median = explanation + plain + keyFacts; "real images" = items whose primary visual
resolves to a published figure. SP6's success measure is every item carrying a
`visuals` list, plus medians moving for W7/W8.)

## Deck map (confirmed from the cached text, not assumed)

| Ref | File | Pages | Covers | Used by |
| --- | --- | --- | --- | --- |
| `phys.6.pdf` | Ch. 28 The Reproductive System | 67 | male tract, spermatogenesis, female tract, ovarian/menstrual cycle, fertilization, implantation, placenta, parturition | W7 |
| `phys.7` | Ch. 18 The Endocrine System | 62 | hormones, delivery classes, chemical classes, mechanisms, pituitary, adrenal, thyroid/parathyroid, pancreas, pineal, gonads/placenta | W8 |
| `phys.hormech` | Endocrine system notes | 9 | hormone/receptor binding, up/downregulation, cAMP, PLC–Ca2+, tyrosine kinase, hydrophobic genomic mechanism | W8 |
| `phys.8` | Ch. 12 The Nervous System (deck A) | 60 | divisions, neurons, glia, resting potential, action potential, synapses, autonomic receptors | W9 |
| `phys.nerve.deck` | Ch. 12 The Nervous System (deck B — same lecture, cleaner text) | 65 | identical content to `phys.8`; prefer for quotes | W9 |
| `phys.nerv.tut` | Tutorial: Nervous System | 2 | 5 discussion questions + 10 MCQs (TESTED anchor for W9) | W9 |
| `phys.susan8` | Lecturer's written note on drug action at synapses | 1 | 8 drug classes, feedback caveat, SSRIs (TESTED-adjacent; course handout) | W9 |
| `phys.9` | Skeletal Muscle + Bone deck (deck A) | 89 | muscle properties/types, sarcomere, crossbridge, EC coupling, motor unit, energetics, fibre types, reflexes, descending tracts, bone, clinical | W11/W12 |
| `phys.muscle.deck` | Ch. 10 Muscle Tissue (deck B — same lecture) | 77 | identical content to `phys.9` pages 4–78 | W11/W12 |
| `phys.susan9` | Muscular system notes | 20 | contraction mechanism, crossbridge, NMJ, EC coupling, rigor mortis, energetics, fibre types, training, spindle/Golgi, upper neuron control | W11/W12 |
| `phys.10` | The Immune System | 67 | innate categories, phagocytes, NK, interferons, complement, inflammation, fever, adaptive immunity, T/B cells, MHC, antibody structure, SCID | W12/W13 |
| `phys.susan10` | Lymphatic system & immunity notes | 16 | same immune content in prose with extra numbers (neutrophil 25-bacteria, complement 11 proteins, 10%/°C, 100M antibodies/hour, perforin/protectin) | W13 |
| `phys.tut` | Tutorial Lesson 1: Cells, Tissue and Body Organization | 7 | W1 content (cells/tissues/feedback), NOT W7–13 | out of scope — see notes |
| `phys.extra` | OCR'd cells worksheet ( Tutorial 1 practice) | 2 | W1 content, garbled OCR | out of scope — see notes |

## Explicit notes (sub-topics the sources do or do not support)

- **phys.tut and phys.extra are Week-1 documents**, not W7–13 anchors. The SP brief
  named them as tested anchors; on reading they are Tutorial Lesson 1 (cells, tissues,
  feedback loops) and an OCR'd worksheet for it. They are already mined by SP5's Week-1
  items. No W7–13 item cites them.
- **The real tested anchor in scope is `phys.nerv.tut`** — 5 discussion questions and
  10 MCQs on divisions, neuroglia, action potentials, refractory periods, synapse
  types, and the cholinergic synapse. W9's commonMistakes draw from these MCQs.
- **`phys.8` and `phys.nerve.deck` are the same lecture** in two renderings (deck B has
  cleaner text). `phys.9` and `phys.muscle.deck` likewise. Cite whichever rendering
  carries the quote; never claim they are two lectures.
- **No male/female gameteHistology beyond slide level**, no lactation section, no
  contraception or STI content in `phys.6.pdf` — the reproductive deck stops at
  parturition. These are not silently dropped; they are absent from the taught scope.
- **No endocrine pathology beyond thyroid/gh** in `phys.7` — diabetes mellitus is NOT
  taught in this deck (only insulin/glucagon physiology). Recorded, not invented.
- **The immune deck's numbers differ between sources** (complement: 30 proteins in
  `phys.10` p27, 11 in `phys.susan10` p4). The complement item already states both and
  says so — keep that honesty, do not silently pick one.
- **W12 is the MSK→immune transition week**: its immune item (`msk-immune-overview`)
  is deliberately the lymphoid-tissue bridge; the deep immune treatment is W13. Do not
  pad W12 to look like W13.

---

## Week 7 — Reproductive System (`phys.6.pdf`, 4 existing rescoped + 2 NEW)

| Sub-topic | Deck pages | Tested? | Carried by | sourceRefs pages |
| --- | --- | --- | --- | --- |
| Testis cell types; spermatogenesis stages (spermatogonia → spermatozoa, n=46/23); spermatozoon structure (head/acrosome 5µm, midpiece 5µm mitochondria, tail 55µm; loses ER/Golgi/centrioles; fructose); crossing over | p4, p6–7, p9–10 | Outcomes p2; no past-paper cache for ABCT — deck-weighted | **`abct2326-repro-male-regulation`** (rescope) | phys.6.pdf p4, 6–7, 9–10 |
| Sertoli secretions; ABP + inhibin; LH→Leydig→testosterone; FSH→Sertoli→ABP; testosterone's 8 effects | p13–17 | Deck-weighted | **`abct2326-repro-male-regulation`** (same item) | phys.6.pdf p13–17 |
| Sperm route; epididymis (2 weeks, 90% fluid reabsorbed, tail storage); accessory glands (seminal vesicle 60% fructose/prostaglandins/alkaline; prostate 20–30% acidic + seminalplasmin; Cowper alkaline mucus); erection (parasympathetic) / emission (sympathetic) / ejaculation (sympathetic) | p18–23 | Deck-weighted | **NEW `abct2326-repro-male-tract-accessory`** | phys.6.pdf p18–23 |
| Female tract anatomy (Figure 28-18a/28-13 labels); uterus functions ×4; oocyte reserve (7 million → 2 million at birth → 400,000 at puberty); follicle maturation stages (primordial→primary→secondary→tertiary/Graafian); atresia; ovulation mechanics (proteolytic enzymes, antral fluid + ovum into peritoneal cavity) | p24–33 | Deck-weighted | **NEW `abct2326-repro-female-tract-follicles`** | phys.6.pdf p24–33 |
| Ovarian cycle phases: follicular (day 1–13, oestrogen peak ~day 12, FSH upregulates own receptors, LH receptors induced); LH surge ~24 h before ovulation; luteal (corpus luteum, progesterone peaks ~1 week post-ovulation, negative feedback, inhibin); menstrual phase (corpus luteum degenerates → hormones fall → vessels constrict → prostaglandin contractions; cramp note) | p34–42 | Deck-weighted | **`abct2326-repro-ovarian-menstrual-cycle`** (rescope) | phys.6.pdf p34–42 |
| Capacitation (sterol/glycoprotein removal, Ca2+ influx, cAMP, hyperactivity); only 0.1% reach uterine tubes (3 loss reasons); acrosome reaction + zona pellucida; oocyte Ca2+ release (blocks polyspermy, completes meiosis); diploid zygote at 12 h; cleavage day 0–4, blastocyst, hatching day 6, implantation days 7–10 (trophoblast enzyme); hCG acts like LH to keep corpus luteum | p44–53 | Deck-weighted | **`abct2326-repro-fertilization-implantation`** (rescope) | phys.6.pdf p44–53 |
| Placental circulation (umbilical arteries/vein, maternal and fetal blood do not mix); exchange directions; placenta degrades harmful molecules; HbF (→Type A after 6 months); active transport of antibodies; foetus uses ~1/3 of maternal O2+glucose; labour factors (Figure 29-10: oestrogens, relaxin, oxytocin, prostaglandins, positive feedback, 100× oxytocin sensitivity); three stages with timings (dilation 8+ h, contractions ½ min every 10–30 min; expulsion 4-inch dilation, 2–3 min intervals; placental stage within 1 h) | p54–66 | Deck-weighted | **`abct2326-repro-placenta-parturition`** (rescope) | phys.6.pdf p54–66 |

Note: the deck's meiosis/genetics background (p10 crossing over) is folded into the
spermatogenesis item; no separate genetics item is supported by the deck.

---

## Week 8 — Endocrine System (`phys.7` + `phys.hormech`, 3 existing rescoped + 3 NEW)

| Sub-topic | Deck pages | Tested? | Carried by | sourceRefs pages |
| --- | --- | --- | --- | --- |
| Hormone definition; 4 functions; 4 delivery classes (autocrine, paracrine, endocrine, neuroendocrine); endocrine glands ductless; 3 chemical classes (tyrosine derivatives, peptides/proteins, steroids with gland examples); prohormones/prehormones (proinsulin, preproinsulin); T4→T3 activation in target cells; nervous vs endocrine comparison | phys.7 p3–11; phys.hormech p1 | Deck-weighted | **`abct2326-endocrine-delivery`** (rescope) | phys.7 p3–11; phys.hormech p1 |
| Receptor properties (specificity, high affinity, low capacity); binding weak/reversible, conformation change; signal transducer; response ∝ number of receptors occupied, ceiling; turnover; downregulation/upregulation | phys.hormech p2; phys.7 p13 | Deck-weighted | **`abct2326-endocrine-receptors`** (rescope) | phys.hormech p2; phys.7 p13 |
| Hydrophilic hormone mechanisms: adenylate cyclase–cAMP (G protein, alpha subunit GTP, PKA, CREB, phosphodiesterase); phospholipase C–Ca2+ (DAG + IP3, ER Ca2+ channels, calmodulin, PKC, glycogen→glucose example); adrenaline on alpha (PLC) vs beta (cAMP) receptors; tyrosine kinase (insulin receptor dimerization, autophosphorylation, GLUT4 insertion); hydrophobic genomic mechanism (carrier proteins, nuclear receptors, hormone response element, ≥30 min) | phys.7 p13, p17–27; phys.hormech p3–9 | Deck-weighted | **`abct2326-endocrine-second-messengers`** (rescope) | phys.7 p13, 17–27; phys.hormech p3–9 |
| Pituitary: location under hypothalamus, infundibulum; anterior 6 hormones (GH, TSH, ACTH, FSH, LH, PRL) with actions; trophic nature (hypertrophy/atrophy); posterior stores/releases hypothalamic ADH (supraoptic) + oxytocin (paraventricular), milk-ejection reflex; hypothalamic releasing/inhibiting hormones via hypophyseal portal system; negative feedback + gonad axis, short loop, estrogen LH-surge positive feedback; higher-brain input (circadian, menstrual, adrenal) | phys.7 p28–39 | Deck-weighted | **NEW `abct2326-endocrine-pituitary-axes`** | phys.7 p28–39 |
| Adrenal: cortex (cholesterol, corticosteroids; ACTH-controlled aldosterone Na+/K+, cortisol gluconeogenesis, supplementary sex steroids) vs medulla (80% epi / 20% norepi, epi lasts 10× longer, preganglionic sympathetic, fight-or-flight effects ×5); thyroid: T4/T3 set BMR, follicles + colloid, calcitonin; 10 thyroid-hormone effects; hypothyroidism (myxedema, cretinism) vs hyperthyroidism/Graves (exophthalmos); comparison table; parathyroid ×4 glands, PTH 3 effects (osteoclasts, renal reabsorption, calcitriol) | phys.7 p40–52 | Deck-weighted | **NEW `abct2326-endocrine-adrenal-thyroid`** | phys.7 p40–52 |
| Pancreatic islets: alpha → glucagon (glycogenolysis, lipolysis, ↑ glucose); beta → insulin (glucose entry, glycogen/fat storage, ↓ glucose); pineal: melatonin, SCN, circadian, night secretion, jet-lag; gonads + placenta hormones (oestrogen, progesterone, hCG, somatomammotropin); GH abnormalities (dwarfism, giantism); autocrine/paracrine regulators (cytokines, growth factors, neutrophins) | phys.7 p53–62 | Deck-weighted | **NEW `abct2326-endocrine-pancreas-misc`** | phys.7 p53–62 |

Note: no diabetes-mellitus pathology slide exists in `phys.7`; insulin/glucagon are
taught as physiology only. No new item invents pathology.

---

## Week 9 — Nervous System (`phys.nerve.deck` = `phys.8`, `phys.nerv.tut`, `phys.susan8`; 4 existing rescoped-lightly + 1 NEW; primarily visuals)

| Sub-topic | Deck pages | Tested? | Carried by | sourceRefs pages |
| --- | --- | --- | --- | --- |
| NS functions; CNS/PNS; somatic vs autonomic; 3 neuron classes; brain scale figures | phys.nerve.deck p2–8 | Tut MCQ 1, 6, 9 | **`abct2326-nervous-divisions`** (visuals + tut anchor) | phys.nerve.deck p2–8; phys.nerv.tut p1–2 |
| Neuron structure (dendrites/perikaryon/axon, Nissl bodies, axon hillock, telodendria); 4 CNS glial types (oligodendrocytes, microglia, ependymal + choroid plexus, astrocytes ×7 jobs); PNS neurilemma, nodes of Ranvier; white/gray matter | phys.nerve.deck p9–21 | Tut MCQ 2, 7 | **`abct2326-nervous-synaptic-refractory-neuroglia`** (visuals) | phys.nerve.deck p9–21; phys.nerv.tut p1–2 |
| Resting membrane potential (−60/−70 mV); 3 channel types; 50–70× more K+ passive channels; concentration gradients; Na+/K+ pump 3 Na+ out / 2 K+ in | phys.nerve.deck p23–32 | Tut Q1 | **`phys-nerve-cellular-action-potential`** (visuals; existing covers AP too) | phys.nerve.deck p23–32 |
| Action potential (threshold −45 mV, peak +25/+30 mV, repolarization, hyperpolarization); all-or-none; absolute vs relative refractory; saltatory conduction (nodes every 1–2 mm) | phys.nerve.deck p33–42 | Tut Q2, Q3; MCQ 4, 5, 10 | **`phys-nerve-cellular-action-potential`** (same item) | phys.nerve.deck p33–42 |
| Two synapse types (electrical gap junctions; chemical); ACh excitatory/inhibitory; nicotinic vs muscarinic (M2 heart K+ open → IPSP slows HR; M1 stomach K+ closed → EPSP contracts); adrenergic α1/α2/β1/β2; EPSP/IPSP; summation | phys.nerve.deck p44–57 | Tut Q4, Q5; MCQ 3 | **NEW `abct2326-nervous-synapse-types-nt`** | phys.nerve.deck p44–57 |
| 8 drug classes at the synapse; feedback caveat; SSRIs | phys.susan8 p1 | Course handout | **`abct2326-synapse-drug-action`** (visuals) | phys.susan8 p1 |

---

## Week 11 — Nerve / MSK (`phys.9` = `phys.muscle.deck`, `phys.susan9`; 4 existing (visuals) + 1 NEW bone item)

| Sub-topic | Deck pages | Tested? | Carried by | sourceRefs pages |
| --- | --- | --- | --- | --- |
| Muscle properties ×4; 3 tissue types; voluntary/involuntary; 40%/32% | phys.9 p4–8 | HSS revans MCQ 4.1.5 (cross-subject anchor, already cited) | **`abct2326-muscle-types`** (visuals) | phys.9 p4–8 |
| Origin/insertion; flexor/extensor; agonist/antagonist; motor unit trade-off | phys.9 p10–11, p42–43 | HSS revans MCQ 4.1.6 | **`abct2326-muscle-action`** (visuals) | phys.9 p10–11, 42–43 |
| NMJ sequence, EPP vs EPSP, ACh/nicotinic, AChE | phys.susan9 p8–9 | Deck-weighted | **`abct2326-nmj-coupling`** (visuals) | phys.susan9 p8–9 |
| Sarcomere bands, titin, sliding filament, VO2 max/lactate threshold/motor-unit numbers, Parkinson/Huntington, osteon/1-5-remodelled | phys.muscle.deck p16–18, 25, 37, 41–42, 65, 67, 72 | Deck-weighted | **`abct2326-muscle-ultrastructure-energetics`** (visuals) | phys.muscle.deck p16–18, 25, 37, 41–42, 65, 67, 72 |
| Compact vs spongy bone; osteon/Haversian system; trabeculae; canaliculi diffusion; bone functions; remodeling (osteocytes/osteoblasts/osteoclasts, 1/5 per year); Ca2+ hormonal balance (PTH, calcitonin, calcitriol, active vitamin D) | phys.9 p79–89 | Deck-weighted | **NEW `abct2326-msk-bone-structure-remodeling`** | phys.9 p79–89 |

---

## Week 12 — MSK / Immune (`phys.susan9` + `phys.10` intro; 4 existing, visuals pass only)

| Sub-topic | Deck pages | Tested? | Carried by | sourceRefs pages |
| --- | --- | --- | --- | --- |
| Sarcomere, sliding filament, crossbridge cycle, rigor mortis | phys.susan9 p1–7, 10 | Deck-weighted | **`abct2326-crossbridge-cycle`** (visuals) | phys.susan9 p1–7, 10 |
| Fibre types, innervation ratios, fuel, VO2 max, lactate threshold, oxygen debt, phosphocreatine, training adaptations | phys.susan9 p11–16; phys.muscle.deck p45–52 | Deck-weighted | **`abct2326-fibre-types-fuel`** (visuals) | phys.susan9 p11–16; phys.muscle.deck p45–52 |
| Muscle spindle (intrafusal, nuclear bag/chain, primary/secondary endings), stretch reflex, Golgi tendon organ (disynaptic), upper motor neuron, pyramidal/extrapyramidal, Parkinson/Huntington | phys.susan9 p17–20; phys.9 p67–76 | Deck-weighted | **`abct2326-spindle-golgi`** (visuals) | phys.susan9 p17–20; phys.9 p67–76 |
| Lymphatic bridge: lymph return, MALT, cisterna chyli, drainage asymmetry | phys.10 p2–3; hss.revans anchors (cross-subject, existing) | HSS revans M1.2 MCQ 5, FIB 5 | **`abct2326-msk-immune-overview`** (visuals) | phys.10 p2–3; hss.revans M1.2 |

---

## Week 13 — Immune System (`phys.10` + `phys.susan10`; 8 existing (visuals + light deepening) + 1 NEW antibody item)

| Sub-topic | Deck pages | Tested? | Carried by | sourceRefs pages |
| --- | --- | --- | --- | --- |
| Innate vs adaptive; 7 innate categories; PAMPs/TLRs/PRRs | phys.10 p4–6, 18–19; phys.susan10 p1 | Deck-weighted | **`abct2326-innate-adaptive`** (visuals) | phys.10 p4–6, 18–19; phys.susan10 p1 |
| Phagocytes (microphages, macrophages fixed/free, microglia/Kupffer/alveolar), emigration, chemotaxis; NK cells + perforin, immunological escape; interferons α/β/γ | phys.10 p12–26; phys.susan10 p2–3 | Deck-weighted | **`abct2326-innate-mechanisms`** (visuals) | phys.10 p12–26; phys.susan10 p2–3 |
| Inflammation (4 signs, mast cells, histamine, pus/abscess); fever (37.2 °C, pyrogens, IL-1, 10%/°C) | phys.10 p10–11, 31–33; phys.susan10 p6–7 | Deck-weighted | **`abct2326-inflammation-fever`** (visuals + deepen from susan10) | phys.10 p10–11, 31–33; phys.susan10 p6–7 |
| Complement: 30 vs 11 proteins discrepancy; classical pathway (C1→C3b), alternative pathway (properdin, factors B/D), MAC, C3a/C5a histamine + chemotaxis | phys.10 p27–30; phys.susan10 p4–6 | Deck-weighted | **`abct2326-complement`** (visuals) | phys.10 p27–30; phys.susan10 p4–6 |
| Four forms of immunity (active/passive × natural/artificial); examples (vaccines, maternal antibodies, rabies injections) | phys.10 p34–36; phys.susan10 p8 | Deck-weighted | **`abct2326-acquired-immunity`** (visuals) | phys.10 p34–36; phys.susan10 p8 |
| Four T cell types; CD8/CD4 markers; costimulation; cytotoxic killing (perforin, lymphotoxin, apoptosis); memory; suppressor factors | phys.10 p39, 46–53; phys.susan10 p9, 12–13 | Deck-weighted | **`abct2326-t-cell-types`** (visuals + deepen: lymphotoxin, 2-day timing from susan10) | phys.10 p39, 46–53; phys.susan10 p9, 12–13 |
| MHC I/II, self/nonself, APCs, antigen presentation, chromosome 6, HLA; B cell sensitization/activation, clonal selection, plasma/memory cells, 100M antibodies/hour | phys.10 p40–45, 54–60, 62; phys.susan10 p10–13 | Deck-weighted | **`abct2326-mhc-costimulation`** (visuals) | phys.10 p40–45, 54–60, 62; phys.susan10 p10–13 |
| Antibody structure (2 heavy + 2 light chains, constant/variable segments); 5 classes IgM/IgA/IgD/IgE/IgG; bacteria-defence summary, opsonization, antigen-antibody complexes; SCID "bubble boy" | phys.10 p61, 64, 67 | Deck-weighted | **NEW `abct2326-antibody-structure-classes`** | phys.10 p61, 64, 67 |
| Adaptive overview (cell-mediated vs antibody-mediated; tumor/rubor/calor/dolor; T vs B cells) — the existing overview item | phys.10 p2, 31–38 | Deck-weighted | **`abct2326-immune-adaptive`** (visuals) | phys.10 p2, 31–38 |

---

## Visuals plan (draft — final ids set at fetch time)

Every item ends with a `visuals: [...]` list of 2–4 entries. Published Wikimedia
figures via `fetch-figure.mjs` for: spermatogenesis/seminiferous tubule, sperm
structure, female reproductive anatomy, ovarian/menstrual cycle chart, fertilization
to implantation, placenta, endocrine glands overview, thyroid, adrenal, pancreas/
islets, neuron anatomy, glial cells, action potential curve, synapse, neuromuscular
junction, sarcomere, muscle fibre types table, bone osteon, antibody structure,
antigen presentation/MHC. 3D model views where a mesh exists (Testis, Pancreas,
Soleus/leg muscles, nervous-layer structures). Schematics/layouts (app-authored,
unlimited) for: ovarian-cycle hormone feedback loops, crossbridge cycle steps,
complement cascade, T-cell activation pathway — wherever no free figure fits.
Figure credits render from the stanza; every figure gets `intro` + callout `key`.
