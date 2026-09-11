# 2026-09-11 — DSE depth authority: Biology Curriculum Supplement (2016) extraction + re-tag diff table

Scope-only reference for the ABCT2326 `priorKnowledge` re-tag. Nothing anatomical or
physiological is sourced to either EDB document — only the claim "DSE already taught
this, to this depth".

Documents read in full (both fetched from edb.gov.hk at the URLs given; the local text
extractions were working copies and are not kept in the repo):

- **Supplement** — *Biology Curriculum (Secondary 4-6) Supplementary Document*, CDC &
  HKEAA, 2015 printing, "applicable for the Biology HKDSE Examination in year 2016 and
  onwards" (intro page, PDF p.2). 49 PDF pages. Proposed registry key: `edb.bio.supp`.
  Page citations below use the printed footer page, with the PDF page in brackets —
  printed = PDF − 4.
- **Guide** — *Biology Curriculum and Assessment Guide (S4-6), updated Nov 2015*
  (`Bio_C_and_A_Guide_updated_e_20151126.pdf`). The corpus's existing `edb.bio`. Fetched
  fresh to verify the existing `syllabusRef` quotes.

**No newer Guide edition applies.** EDB's curriculum-documents page lists "Biology (S4-6)
2007 (with updates in November 2015)" as the current document (only Chemistry carries a
newer update, June 2018). An "Updated Biology (S4-6) Curriculum and Assessment Framework"
exists only as a **consultation draft**, not in force. A 2024-25 DSE candidate sat the
Nov 2015 Guide. `edb.bio` label needs no edition fix.

---

## Part 1 — What the Supplement fixes (the depth markers)

The Supplement's "Students should learn" column mirrors the Guide's content outline, but
it adds the learning outcomes and — decisively — numbered footnotes that carve content
OUT of the learning-and-assessment focus ("not the learning and assessment focus" = not
taught to examinable depth). Every footnote below is load-bearing for the re-tag.

### Compulsory I. Cells and Molecules of Life (PDF pp.5–11 / printed 1–7)

- a. Molecules of life — water, inorganic ions, biomolecules: building blocks, functions
  (p.1/PDF5). Footnote 1: optical isomers, linear sugar forms, starch/glycogen/cellulose
  structural differences **not L&A focus**.
- b. Cellular organisation (p.2/PDF6): discovery of cells; cell membrane properties and
  functions ("Use the fluid mosaic model to explain…"); **sub-cellular structures and
  their functions: nucleus and chromosomes, endoplasmic reticulum, mitochondrion,
  chloroplast, cell wall, vacuole** — Golgi, ribosomes, lysosomes, cilia, proteasomes are
  NOT in the list; prokaryotic vs eukaryotic. **No tissue topic exists anywhere in the
  S4-6 curriculum** — "epithelial / connective / muscle / neural" as a classification
  appears in neither document (grep-verified).
- c. Movement of substances across membrane (p.3/PDF7): diffusion, osmosis, active
  transport, phagocytosis. Footnotes 2–3: L&A focus **confined to simple diffusion**;
  detailed active-transport mechanism not L&A focus.
- d. Cell cycle and division (p.3/PDF7): mitosis, meiosis. Footnote 4: **details of cell
  cycle not L&A focus** (so G0/G1/S/G2 naming is beyond DSE). Footnote 5: crossing over
  IS a feature of meiosis.
- e. Cellular energetics (pp.4–7): enzymes, photosynthesis, respiration, with footnotes
  excluding detailed biochemistry.

### Compulsory II. Genetics and Evolution (PDF pp.12–17 / printed 8–13)

- b. Molecular genetics (p.9/PDF13): "Chromosomes, genes and nucleic acids"; "Gene
  expression and protein synthesis: transcription and translation" — outcomes: "Describe
  the structural and functional relationships of chromosomes, genes and nucleic acids";
  "Outline the process of protein synthesis". **Footnote 3: detailed transcription NOT
  L&A focus — limited to template strand and base pairing. Footnote 4: detailed
  translation NOT L&A focus — limited to codon and anticodon.**
- (Compulsory IV is "Health and Diseases" — PDF pp.32–35. There is no compulsory part
  called "Applied Ecology and Genetics"; Applied Ecology is **Elective VI**.)

### Compulsory III. Organisms and Environment (PDF pp.18–31 / printed 14–27)

- b. Essential life processes in animals (pp.16–17/PDF20–21):
  - **Nutrition in humans** — food requirements, balanced diet, ingestion, dentition,
    mastication, digestion, general plan of the digestive system, digestion of
    carbohydrates/proteins/lipids in various parts of the alimentary canal, absorption
    and assimilation (structural adaptation of small intestine, role of liver, fate of
    absorbed food), egestion. **Peristalsis appears NOWHERE in either document**
    (grep-verified, 0 hits in both).
  - **Gas exchange in humans** — general plan of the breathing system; gas exchange in
    air sacs; **routes of transport of respiratory gases**; **mechanism of ventilation**.
    Outcomes: "Understand the exchange of respiratory gases between the body cells and
    the external environment"; "Relate the structure of various parts of the breathing
    system to gas exchange." **No lung volumes (tidal/vital capacity) anywhere in either
    document; no oxygen–haemoglobin dissociation curve anywhere; no surfactant; no
    Boyle's law.**
  - **Transport of substances in humans** — general plan of the circulatory and lymphatic
    systems; composition and functions of blood, tissue fluid and lymph; exchange of
    materials between blood and body cells; formation of tissue fluid. (Practical:
    "Examine the structure of arteries and veins"; "Perform dissection of a pig's heart".)
- c. Reproduction, growth and development (pp.18–20): menstrual cycle at descriptive
  depth — footnote 5 (p.19/PDF23): "Hormonal control of menstrual cycle is included in
  elective topic V."
- d. Coordination and response (pp.21–23/PDF25–27):
  - **Nervous coordination in humans** (p.22/PDF26): general plan of the nervous system;
    CNS; functions of main brain parts (cerebrum, cerebellum, medulla oblongata);
    functions of spinal cord; **neurone: sensory neurone, interneurone and motor
    neurone** ("Distinguish different types of neurones in terms of structure and
    function"); synapse (footnote 7: specific neurotransmitter names not L&A focus);
    reflex arc; voluntary actions. **No PNS somatic/autonomic/ sympathetic/
    parasympathetic branching anywhere in the compulsory part.**
  - **Hormonal coordination in humans** (p.22/PDF26): nature of hormonal coordination;
    general plan of the endocrine system. Outcomes: "Use an example to illustrate
    hormone mediated response. **Compare hormonal and nervous coordination.**"
  - **Movement in humans** (p.23/PDF27): components of the musculoskeletal system
    (skeleton, muscles, joints, tendons, ligaments); hinge vs ball-and-socket joints;
    action of opposing muscle pairs; outcome: "Describe how a nerve impulse transmits
    across the **neuromuscular junction** leading to muscle contraction." Footnote 8:
    lever systems not L&A focus. **Origin, insertion, motor unit: not in the curriculum.**
- e. Homeostasis (pp.23–24/PDF27–28): concept, importance, feedback mechanism —
  **footnote 9 (p.23/PDF27): "The learning and assessment focus is confined to negative
  feedback mechanism"** (positive feedback is explicitly outside the focus); parameters
  of the internal environment (blood glucose, gas content, water content, body
  temperature); regulation of blood glucose (liver, pancreas, insulin, glucagon).

### Compulsory IV. Health and Diseases (PDF pp.32–35 / printed 28–31)

- c. Body defence mechanisms (pp.30–31/PDF34–35): non-specific — skin, mucus and other
  secretions, cilia, phagocytes, blood clotting, inflammatory responses; specific —
  immune response, antigen and antibody, lymphocytes (B and T cells), primary and
  secondary responses, active and passive immunity. **No complement, interferons, NK
  cells, MHC, PAMP/TLR, or T-cell subtypes anywhere.**

### Elective V. Human Physiology: Regulation and Control (PDF pp.36–39 / printed 32–35)

The whole elective is four sub-topics; the table below is its complete content:

- **a. Regulation of water content (osmoregulation)** (p.32/PDF36): general plan of the
  urinary system; structure and function of nephron; processes in urine formation —
  ultrafiltration, reabsorption; action of ADH; dialysis machine. Outcomes: "Relate the
  structure of nephron to its function in regulation of water content"; "Understand the
  action of ADH"; "Recognise the excretory function of the kidney."
  **Footnote 1: "Countercurrent multiplier is not the learning and assessment focus."**
  **No osmoreceptors, no micturition, no voluntary/involuntary urination, no renal
  clearance, no JG complex, no RAAS, no sympathetic renal innervation anywhere in either
  document.**
- **b. Regulation of body temperature** (p.33/PDF37): mechanisms — skin, regulatory
  centre (hypothalamus), circulation, hormone (thyroxine), muscle, behavioural.
- **c. Regulation of gas content in blood** (pp.33–34/PDF37–38):
  - Control of rate and depth of breathing: nervous control; respiratory centre and
    chemoreceptors; effects of CO2 concentration in blood.
  - Control of cardiac output: heart rate and stroke volume; **pacemaker and cardiac
    cycle**; nervous control (vagus nerve and sympathetic nerves); hormonal control
    (adrenaline). Outcomes: "Understand the control mechanism of breathing"; "Outline the
    major events during the cardiac cycle"; "Understand the nervous and hormonal control
    of cardiac output"; "Explain how the gas content in blood is regulated during and
    after exercise" (effects of exercise: rate/depth of breathing, oxygen debt, cardiac
    output).
  - **The elective contains NO transport of respiratory gases, no oxygen dissociation
    curve, no lung volumes, no ECG, no conducting-system internals (prepotential/HCN), no
    hemodynamics.** "Mechanism of ventilation" is a **compulsory** III(b) heading, not an
    elective one.
- **d. Hormonal control of reproductive cycle** (p.35/PDF39).

**The electrical-signalling layer does not exist in DSE Biology.** Depolarisation,
repolarisation, action potential, membrane potential: **zero occurrences in either
document** (grep-verified). "Nerve impulse" appears only as a black box — "Describe the
transmission of nerve impulses across a synapse" / "across the neuromuscular junction" —
with no mechanism. Everything in the corpus that reasons in terms of membrane potential,
depolarisation or action potentials therefore rests on a concept a DSE Biologist has
never met, however much classroom teaching goes beyond the bare syllabus text on the
STRUCTURAL side (the SA/AV nodes, the bundle of His, systole/diastole and heart sounds
are DSE-classroom content even where the words are absent from the documents — learner's
own calibration, 2026-09-11).

---

## Part 1.5 — Second-pass full re-scan (line by line, all 241 `beyond` lines)

The first pass checked each tag's citations and each `beyond` line's word-level footing.
Two failure modes it missed, both now swept systematically:

- **A. Unseen-concept presupposition** (the ECG case). Every item whose teaching content
  leans on membrane potential / depolarisation was checked: all such items are ALREADY
  untagged (nerve AP, synapse types, NMJ coupling, refractory periods/neuroglia, spindle
  feedback, muscle ultrastructure). The ECG item (Group F) was the one tagged item whose
  substance rests on the unseen concept. No other tag flips for this reason.
- **B. First-table omissions.** The first table never listed 6 of the 40 items:
  `resp-carbon-dioxide-control`, `digestive-wall-motility`, `digestive-stomach-control`,
  `digestive-small-intestine-accessory`, `digestive-hormones-colon` (PD) and
  `immune-adaptive` (EX). Their tags (`part` / `core`) verify fine against the
  Supplement's Nutrition and Body-defence headings — but their `beyond` lines did not
  get audited. They are audited below.
- **C. The line test was word-level only.** It matched each line against document
  *words*, not against syllabus **headings/outcomes/footnotes** (which bind content
  without naming it) or against DSE *classroom* content (the learner's calibration:
  systole/diastole, SA/AV node, bundle of His, heart sounds are DSE-classroom even
  though absent from the text). Re-tested this way, many more lines fail.

### Group G1 — `beyond` deletions verified against the syllabus TEXT (12 lines)

Content covered by a heading, outcome or footnote — DSE-level regardless of classroom:

| Item | Line deleted | Syllabus-text basis |
| :--- | :--- | :--- |
| `abct2326-homeostasis` | [0] "Homeostasis defined as all body systems working together to maintain a stable internal environment in dynamic equilibrium…" | Compulsory III(e) heading **"Concept of homeostasis"** (p.23/PDF27) — the definition is the concept |
| `abct2326-homeostasis` | [2] "The three mandatory structural components of every homeostatic control loop: Receptor, Control Centre, Effector" | Compulsory III(d) outcome **"Explain coordination in terms of stimulus, receptor, coordination system, effector and response"** (p.23/PDF27) |
| `abct2326-renal-nephron` | [0] kidney regulates plasma/interstitial fluid via urine formation | Elective V(a) outcome **"Recognise the excretory function of the kidney"** (p.32/PDF36) |
| `abct2326-renal-nephron` | [1] gross structure, paired kidneys either side of vertebral column | Elective V(a) heading **"General plan of the urinary system"** (p.32) |
| `abct2326-renal-nephron` | [5] tubule begins with glomerular capsule → PCT → loop | Elective V(a) heading **"Structure and function of nephron"** + outcome "Relate the structure of nephron to its function" (p.32) — the nephron's parts ARE the content |
| `abct2326-renal-nephron` | [6] glomerular capsule surrounds glomerulus; together the renal corpuscle | Same heading — classroom name for it: Bowman's capsule around glomerulus |
| `abct2326-digestive-pathway` | [3] "Ingestion occurs when conscious food materials enter the digestive tract via the mouth" | Compulsory III(b) Nutrition heading **"Ingestion"** (p.16/PDF20) |
| `abct2326-digestive-small-intestine-accessory` | [8] liver performs metabolic/synthetic/regulatory functions and produces bile | Compulsory III(b) Nutrition heading **"Role of liver"** (p.16) |
| `abct2326-nucleus-genetic-code` | [3] the genetic code as triplets determining codons and amino acids | Compulsory II(b) footnote 4: translation scope **"Limit to the concepts of codon and anticodon"** (p.9/PDF13) — the codon concept IS the DSE limit |
| `abct2326-cell-division` | [2] mitosis vs meiosis comparison (2 identical diploid vs 4 haploid gametes) | Compulsory I(d) outcome **"Outline and compare the processes of mitosis and meiosis"** (p.3/PDF7) — this line IS that outcome |
| `abct2326-renal-countercurrent-vasarecta` | [2] ADH modulates collecting-duct permeability to hold plasma concentration | Elective V(a) heading **"Action of antidiuretic hormone (ADH)"** + outcome "Understand the action of ADH" (p.32) — same failure as renal-tubular-clearance[10], missed on the first pass |
| `abct2326-renal-tubular-clearance-sympathetic` | [6] PCT bulk reabsorption of ions, organic molecules, vitamins, water | Elective V(a) heading **"Processes in urine formation — … Reabsorption"** (p.32); selective reabsorption in the PCT is the classic classroom lesson of that heading |

### Group G2 — `beyond` deletions by DSE-CLASSROOM calibration (18 lines — YOUR CALL)

Classic textbook/exam content absent from the syllabus text, like systole and the SA
node. I cannot verify these from the documents; you are the calibration authority.
Delete = the line was already known to a DSE Bio student.

| Item | Line | Classroom content it restates |
| :--- | :--- | :--- |
| `abct2326-cvs-circuits` | [0] systemic flow = pulmonary flow because the circuits run in series | Double circulation with equal flows — the DSE circulation lesson |
| `abct2326-cvs-circuits` | [1] the whole route as one recitable sequence, vena cava → aorta | Path of blood through the heart — the most-classic DSE content there is |
| `abct2326-cvs-heart-structure` | [4] right ventricle pouch-shaped/thin vs left ventricle thick-walled, high pressure | "Left ventricle has the thicker wall to pump blood around the whole body" — DSE exam classic |
| `abct2326-muscle-action` | [0] origin and insertion as named attachments | Origin/insertion of biceps–triceps is how DSE classroom teaches opposing pairs |
| `abct2326-muscle-neural-tissue` | [2] dendrites receive, cell body integrates, axon conducts | Neurone structure — the DSE "distinguish neurone types by structure and function" lesson |
| `abct2326-digestive-pathway` | [0] muscular propulsion into esophagus, transport to stomach | Swallowing and peristalsis — standard classroom content |
| `abct2326-digestive-stomach-control` | [3] stomach performs preliminary digestion of proteins by pepsin | Pepsin/protein digestion in the stomach — DSE classic |
| `abct2326-digestive-small-intestine-accessory` | [6] pancreatic exocrine cells secrete digestive enzymes and alkaline buffer | Pancreatic amylase/trypsin/lipase + alkaline pancreatic juice — DSE classic |
| `abct2326-digestive-small-intestine-accessory` | [9] bile salts emulsify lipids into micro-droplets | "Bile emulsifies fats" — DSE classic |
| `abct2326-digestive-hormones-colon` | [7] rectum as expandable organ for faecal storage | Standard classroom large-intestine anatomy |
| `abct2326-resp-ventilation-chemoreceptors` | [0] external vs internal respiration | Gaseous exchange vs tissue respiration — standard classroom distinction |
| `abct2326-resp-ventilation-chemoreceptors` | [2] air is filtered, warmed and humidified by the upper airway | Nasal functions — DSE classic |
| `abct2326-resp-ventilation-mechanics` | [1] airflow direction governed by atmosphere-vs-intrapulmonary pressure gradients | Pressure-change ventilation mechanism — the DSE ventilation lesson |
| `abct2326-resp-ventilation-mechanics` | [3] inhalation: ribs up/out + diaphragm contracts → volume up, pressure down | Same — taught verbatim at DSE |
| `abct2326-resp-ventilation-mechanics` | [4] exhalation: diaphragm relaxes, elastic recoil → pressure up | Same |
| `abct2326-immune-adaptive` | [2] active/passive × natural/artificial four-cell grid | The four-cell grid is standard DSE immunity classroom content; the line's own "where DSE stops at the pair" is wrong |
| `abct2326-cvs-hemodynamics-tutorial` | [3] blood colloid osmotic pressure is most affected by plasma protein concentration | Tissue-fluid formation by hydrostatic vs plasma-protein osmotic pressure — compulsory heading "Formation of tissue fluid" + classroom mechanism |
| `abct2326-cvs-hemodynamics-tutorial` | [4] pulmonary circuit components are pulmonary arteries and veins | Pulmonary artery/vein — path-of-blood classroom content |

### Group H — `beyond` TRIMS (22 lines — mixed DSE + new; keep only the new part)

| Item | Line | Trim to what |
| :--- | :--- | :--- |
| `abct2326-feedback-loops` | [0] negative-vs-positive defining distinction | Positive-feedback half only — footnote 9 confines DSE assessment to negative feedback, so the negative half was taught |
| `abct2326-protein-synthesis` | [1] transcription: template strand, RNA polymerase, pre-mRNA, codons | RNA polymerase + pre-mRNA only — footnote 3 limits DSE to "template strand and base pairing" |
| `abct2326-protein-synthesis` | [2] translation at P/A sites, AUG, anticodon, peptide bonds, stop | P/A-site machinery, AUG initiation, peptide-bond formation, stop codons — footnote 4 gives DSE the codon/anticodon concepts |
| `abct2326-cell-division` | [1] four mitosis phases by spindle, kinetochores, chromatid migration | Spindle/kinetochore detail only — the four phases themselves are DSE ("Outline… mitosis") |
| `abct2326-renal-nephron` | [3] nephron functional unit, >1 million per kidney | The >1-million figure only — "functional unit" is the elective's own framing |
| `abct2326-renal-nephron` | [4] interlobular → afferent → glomerulus → efferent | Interlobular-artery naming only — afferent/efferent arterioles are classroom ultrafiltration content |
| `abct2326-renal-nephron` | [7] PCT single cuboidal layer with dense microvilli | Histology naming only — the microvilli/brush-border reabsorption adaptation is classroom |
| `abct2326-cvs-circuits` | [5] veins as capacitance reservoirs, ~2 mmHg, muscle pump + valves | Reservoir role + 2 mmHg figure — valves and the skeletal-muscle pump are DSE classroom vein-return content |
| `abct2326-cvs-heart-structure` | [5] papillary muscles contracting through chordae tendineae | Active papillary-muscle contraction mechanism only — chordae preventing valve eversion is classroom heart-dissection content |
| `abct2326-resp-pathway` | [3] trachea branching into primary/secondary/tertiary bronchi | Lobar/segmental naming only — the branching itself is classroom airway anatomy |
| `abct2326-muscle-types` | [2] voluntary = by thought; involuntary = by autonomic system | Autonomic attribution only — the voluntary/involuntary split itself is classroom |
| `abct2326-resp-ventilation-mechanics` | [8] internal intercostals, transversus thoracis, abdominals | Transversus thoracis + abdominal muscles, forced exhalation — internal intercostals are classroom |
| `abct2326-digestive-wall-motility` | [4] peristalsis and segmentation | Segmentation only — peristalsis is classroom |
| `abct2326-digestive-stomach-control` | [0] storage, mechanical breakdown, chemical digestion, intrinsic factor | Intrinsic factor only — storage/churning/chemical are classroom |
| `abct2326-digestive-stomach-control` | [2] parietal cells secrete intrinsic factor and HCl | Parietal-cell naming + intrinsic factor — gastric HCl is classroom |
| `abct2326-digestive-small-intestine-accessory` | [1] duodenum as mixing bowl neutralising acid | "Mixing bowl" framing — duodenum receiving bile/pancreatic juice and alkaline neutralisation are classroom |
| `abct2326-digestive-small-intestine-accessory` | [7] alpha-amylase hydrolysing starch to oligosaccharides | Oligosaccharide-product detail — pancreatic amylase on starch is classroom |
| `abct2326-digestive-small-intestine-accessory` | [10] gallbladder stores/concentrates bile, releases under CCK | CCK control + concentration — gallbladder storing bile is classroom |
| `abct2326-digestive-hormones-colon` | [6] four colon regions | Sigmoid naming/detail — ascending/transverse/descending are classroom diagrams |
| `abct2326-digestive-hormones-colon` | [8] reabsorption of water, bile salts, vitamins K/biotin/B5 | Bile-salt + vitamin reabsorption — water uptake in the large intestine is classroom |
| `abct2326-resp-carbon-dioxide-control` | [3] involuntary centres in medulla AND PONS, + cortical modulation | Pons + cortical voluntary modulation — "respiratory centre" alone is the elective's named content |
| `abct2326-cvs-conduction` | [2] internodal pathways; AV bundle, branches, Purkinje | Internodal pathways + Purkinje distribution — the bundle of His is DSE-classroom per your calibration |

### Kept but borderline (disclosed, not changed — rule on any of these too)

- `abct2326-innate-adaptive` [0]/[1]: the numbered-set framing and phagocyte
  subclassification — defensible as list/terminology adds.
- `abct2326-immune-adaptive` [1]: the four-sign inflammation set — inflammation is a
  listed non-specific defence; the *set* is the add.
- `abct2326-resp-oxygen-transport` [0] and `abct2326-resp-gas-transport` [2]:
  partial-pressure *terminology* over the classroom diffusion-gradient concept.
- `abct2326-resp-carbon-dioxide-control` [0]/[1]/[2]: CO₂ mostly as bicarbonate is
  textbook-standard; the 7/23/70 quantification is the add the lines actually carry.
- `abct2326-resp-ventilation-chemoreceptors` [3]: vital-capacity definition — spirometer
  traces appear in DSE textbooks; if you count VC as known, this line goes and the
  lung-volumes untagging (Group F) is reinforced.
- `abct2326-digestive-pathway` [1]: the accessory-organ list; [4]: secretion detail.
- `abct2326-muscle-action` [1]: agonist/antagonist as swappable roles over the
  classroom's fixed flexor/extensor pairs.
- `abct2326-plasma-membrane` [3]: compartment naming over the classroom tissue-fluid
  concept; `abct2326-resp-pathway` [1]: upper/lower split naming.
- `abct2326-cvs-heart-structure` [1]: wall-layer naming over classroom heart structure.

### Second-pass tag verdicts

- **`abct2326-renal-nephron`: `covers` 'part' → 'most'.** With G1+G2+H applied, its
  beyond list collapses to figures and naming (>1 million nephrons, interlobular
  arteries, cuboidal histology). The nephron itself was elective content — the item is
  mostly re-tread plus terminology, which is 'most' by definition.
- `abct2326-resp-ventilation-mechanics` stays 'part' even with [1]/[3]/[4] deleted —
  compliance, intrapleural-pressure mechanics, the 75% figure and forced-exhalation
  muscles are substantial new material. Flag if you disagree.
- All other covers values unchanged by the second pass.

---

## Part 2 — Diff table, per item (40 tagged items)

Legend: ✅ = verified against the Supplement, no change. ⚠Q = quote-precision fix to
`syllabusRef.location`, tag values unchanged. ⚠TAG = tag-value change proposed.
Files: **PI** = physiology-items.js, **PD** = physiology-depth.js, **EX** = expansion-items.js.

### Group A — verified, no change (first-pass verdicts; second-pass moves listed beneath)

> **Second pass (Part 1.5) supersedes several rows:** `homeostasis` → G1 deletes [0][2];
> `cvs-circuits` → G2 deletes [0][1], H trims [5]; `cvs-heart-structure` → G2 deletes [4],
> H trims [5]; `resp-pathway` → H trims [3]; `digestive-pathway` → G1 deletes [3], G2
> deletes [0]; `muscle-types` → H trims [2]; `muscle-action` → G2 deletes [0];
> `cell-division` → G1 deletes [2], H trims [1]; `feedback-loops` → H trims [0];
> `renal-nephron` → moved to Group D (covers 'most'). The **tag values** on all these
> rows were verified correct by both passes; only their `beyond` lists change.

| Item (file) | covers / dsePart | What the Supplement confirms |
| :--- | :--- | :--- |
| `abct2326-cells-organisation` (PI) | part / core | Comp I cellular organisation (p.2/PDF6); tissue classification absent from both docs, so beyond[0] stands |
| `abct2326-homeostasis` (PI) | most / core | Comp III(e) concept + parameters + glucose regulation (pp.23–24); autoregulation/extrinsic regulation absent → beyond[1] stands |
| `abct2326-cvs-circuits` (PI) | most / core | Comp III(b) general plan of circulatory + lymphatic, blood composition (p.17/PDF21) |
| `abct2326-cvs-heart-structure` (PI) | part / core | General plan only; pig-heart dissection is the curriculum's heart-structure depth (p.17) |
| `abct2326-resp-pathway` (PI) | part / core | General plan of the breathing system (p.17); pneumocytes/surfactant absent from both docs |
| `abct2326-renal-nephron` (PI) | part / elective-hp | Elective V(a) exactly as quoted: urinary plan, nephron structure/function, ultrafiltration, reabsorption, ADH (p.32) |
| `abct2326-digestive-pathway` (PI) | part / core | Nutrition in humans headings (p.16); swallowing/peristalsis absent → beyond[0] stands |
| `abct2326-blood-composition` (PI) | part / core | "Composition and functions of blood, tissue fluid and lymph" (p.17); the syllabus never quantifies — haematocrit/plasma-protein figures stand |
| `abct2326-nervous-divisions` (PI) | most / core | CNS, brain parts, neurone types, synapse, reflex arc all DSE (p.22); PNS somatic/autonomic branching absent → beyond[0] stands |
| `abct2326-muscle-types` (PI) | part / core | Movement in humans lists skeleton/muscles/joints/tendons/ligaments only (p.23); no histology, no tissue types |
| `abct2326-muscle-action` (PI) | part / core | Opposing muscle pairs + neuromuscular junction DSE (p.23); origin/insertion/motor unit absent |
| `abct2326-innate-adaptive` (PI) | part / core | Non-specific list as quoted (p.30); interferons/complement/NK absent |
| `abct2326-endocrine-receptors` (PI) | part / core | Hormonal coordination is two headings + hormone-mediated-response example (p.22); receptor occupancy/up-downregulation absent |
| `abct2326-plasma-membrane` (PI) | most / core | Fluid-mosaic-model outcome (p.2); simple-diffusion-only footnote (p.3); six protein classes stand as beyond |
| `abct2326-cell-division` (PI) | most / core | Mitosis/meiosis DSE (p.3); footnote 4 puts G0/G1/S/G2 detail beyond — beyond[0] stands |
| `abct2326-feedback-loops` (PI) | most / core | Footnote 9 **strengthens** this tag: positive feedback is explicitly outside the L&A focus (p.23), so beyond[0]/[2] stand |
| `abct2326-cvs-conduction` (EX) | part / elective-hp | `dsePart` and ref confirmed (elective "Pacemaker and cardiac cycle", p.34). Structural beyond lines ([1][2][5]–[8]: SA/AV nodes, bundle branches, Purkinje pathway, AV-only route through the fibrous skeleton) are DSE-classroom content on the learner's calibration; beyond[3] deleted in Group E (pacemaker identity). The electrical-mechanism lines ([4] prepotential/HCN, [9] contractile AP) rest on the unseen depolarisation concept but sit inside a tagged item whose structural foundation is genuinely DSE — `covers: part` fits. Kept tagged. |

### Group B — `syllabusRef` quote fixes only (tag values unchanged) (12 items)

| Item (file) | tags | Problem found | Proposed `syllabusRef.location` fix |
| :--- | :--- | :--- | :--- |
| `abct2326-epithelium-classification` (PI) | part / core | Cites "Compulsory I — human tissues": **no such heading exists**; tissues appear nowhere in S4-6 | Compulsory I(b) "Cellular organisation" — cell structure only; the four-tissue classification is not in the S4-6 curriculum at all |
| `abct2326-connective-tissue-classes` (PI) | part / core | Same phantom "human tissues" heading | Same as above |
| `abct2326-muscle-neural-tissue` (PI) | most / core | Same phantom "animal tissues" heading; second ref "Compulsory III Nervous coordination" fine | Compulsory I(b) "Cellular organisation" + Compulsory III(d) "Nervous coordination in humans — neurone: sensory neurone, interneurone and motor neurone"; tissue histology not in the curriculum |
| `abct2326-nucleus-genetic-code` (PI) | most / core | Second ref **"Compulsory IV 'Applied Ecology and Genetics'" is wrong** — Comp IV is Health and Diseases; Applied Ecology is Elective VI | Compulsory I(b) "Cellular organisation — nucleus and chromosomes" + Compulsory II(b) "Molecular genetics — chromosomes, genes and nucleic acids" (p.9/PDF13) |
| `abct2326-protein-synthesis` (PI) | most / core | Cites Compulsory I only; the DSE home of transcription/translation is Comp II(b), with depth-limiting footnotes 3–4 | Compulsory II(b) "Gene expression and protein synthesis: transcription and translation" — outcome "Outline the process of protein synthesis"; footnotes 3–4 limit depth to template strand/base pairing and codon/anticodon (p.9/PDF13) — the lecture's P/A-site detail is past it |
| `abct2326-resp-pathway` (PI) | part / core | Paraphrase "structure of the respiratory system" | Compulsory III(b) "Gas exchange in humans — general plan of the breathing system" (p.17/PDF21) |
| `abct2326-innate-adaptive` (PI) | part / core | Quote drops "and other secretions" | Compulsory IV(c) — "Skin, mucus and other secretions, cilia, phagocytes, blood clotting and inflammatory responses" (p.30/PDF34) |
| `abct2326-renal-filtration-countercurrent` (PI) | part / elective-hp | "hydrostatic pressure and composition of filtrate" not the curriculum's wording; footnote 1 unmentioned | Elective V(a) "Processes in urine formation — ultrafiltration, reabsorption" (p.32/PDF36); **footnote 1: countercurrent multiplier is not the learning and assessment focus**, so beyond[4]–[5] are doubly beyond |
| `abct2326-renal-countercurrent-vasarecta` (PI) | part / elective-hp | "hairpin loop of Henle and creation of osmotic gradients" not the curriculum's wording | Elective V(a) "Structure and function of nephron" (p.32/PDF36) + footnote 1 excluding the countercurrent multiplier from the L&A focus — the multiplier/vasa recta mechanics are past DSE depth, not just past the compulsory part |
| `abct2326-cvs-hemodynamics-tutorial` (PI) | part / elective-hp | "cardiovascular control and hemodynamics" is not an elective heading | Elective V(c) "Control of cardiac output — heart rate and stroke volume, pacemaker and cardiac cycle" (p.34/PDF38); the elective does not name hemodynamics — Poiseuille and the resistance determinants are past it entirely |
| `abct2326-resp-ventilation-chemoreceptors` (PI) | part / elective-hp | Paraphrase "respiratory control centers and chemoreceptor regulation" | Elective V(c) "Control of rate and depth of breathing — nervous control, respiratory centre and chemoreceptors, effects of carbon dioxide concentration in blood" (pp.33–34/PDF37–38) |
| `abct2326-cvs-conduction` (EX) | part / elective-hp | Quote is right but cites only the Guide; anchor it to both | Add Supplement p.34/PDF38 alongside the Guide heading |

### Group C — `dsePart` corrections (the elective got claimed for compulsory material) (3 items)

| Item (file) | now | proposed | Why |
| :--- | :--- | :--- | :--- |
| `abct2326-resp-ventilation-mechanics` (PD) | part / **elective-hp** | part / **core** | The ref "Elective V(c) — mechanism of breathing" cites a heading that does not exist in the elective. **"Mechanism of ventilation" is Compulsory III(b)** (p.17/PDF21: general plan of the breathing system, gas exchange in air sacs, routes of transport, mechanism of ventilation). Elective V(c) adds only the *control* of rate and depth. Tagging ventilation mechanics as elective wrongly assumed every candidate lacked it. `covers` stays `part` (compliance, intrapleural/respiratory-pump mechanics, active-exhalation muscle names, Boyle's-law framing are past the compulsory depth). |
| `abct2326-resp-oxygen-transport` (PD) | part / **elective-hp** | part / **core** | The ref quotes "Transport of respiratory gases: oxygen dissociation curve of haemoglobin" — **the dissociation curve appears nowhere in either document**. The only DSE anchor is Compulsory III(b) "Routes of transport of respiratory gases" (p.17/PDF21), which is compulsory. Curve, Bohr effect and partial-pressure figures all stay `beyond`. |
| `abct2326-resp-gas-transport` (EX) | part / **elective-hp** | part / **core** | Same fabricated elective heading ("oxygen and carbon dioxide transport mechanisms"). Same fix: anchor to the compulsory "Routes of transport of respiratory gases"; everything quantified in the item (98.5%/70%/23%/7%, sigmoid curve, Bohr) is past DSE. |

### Group D — `covers` corrections recommended (3 items — judgement calls, please rule)

| Item (file) | now | proposed | Why |
| :--- | :--- | :--- | :--- |
| `abct2326-organelles` (PI) | most | **part** | The Supplement's sub-cellular list (p.2/PDF6) holds exactly: nucleus and chromosomes, ER, mitochondrion, chloroplast, cell wall, vacuole. **Golgi, lysosomes, ribosomes, cilia, proteasomes are not in it.** All four `beyond` lines are genuinely new, and the item's own framing (nonmembranous vs membranous) is not DSE. By the given definitions — 'most' = mostly re-treads — this sits better as `part`. |
| `abct2326-muscle-neural-tissue` (PI) | most | **part** | No tissue histology in the curriculum (Group B row); neurons-vs-neuroglia split is not DSE (the Guide names only the three neurone types). With G2 deleting beyond[2] (dendrite–soma–axon = the DSE neurone-structure lesson), what remains with real DSE footing shrinks further. A substantial part is new → `part`. |
| `abct2326-renal-nephron` (PI) | part | **most** | Second-pass promotion: the nephron itself, the urinary plan and the kidney's excretory role are ELECTIVE V(a) content ("Structure and function of nephron", "General plan of the urinary system", outcome "Recognise the excretory function of the kidney", p.32). After G1/G2/H strip its beyond list to figures and naming (>1 million nephrons, interlobular arteries, cuboidal histology), the item is mostly re-tread plus terminology — 'most' by definition. |

### Group E — `beyond[]` deletions (lines the Supplement shows were already DSE) (2 items)

| Item (file) | Line to delete | Why |
| :--- | :--- | :--- |
| `abct2326-endocrine-delivery` (PI) | beyond[3] "A comparison of nervous against endocrine signalling: impulses fast and short-lived, hormones slow and long-lasting." | The DSE outcome **"Compare hormonal and nervous coordination"** is printed in the Guide/Supplement (p.22/PDF26). This line is DSE-level, not beyond. |
| `abct2326-renal-tubular-clearance-sympathetic` (PI) | beyond[10] "When ADH levels rise, the amount of water reabsorbed increases dramatically across collecting ducts." | Elective V(a) outcome: **"Understand the action of ADH"** (p.32/PDF36) — ADH-driven collecting-duct water reabsorption is exactly what the elective taught. Also fix the item's `syllabusRef`: "osmoreceptors … voluntary versus involuntary urination" appear **nowhere** in either document (grep-verified) — re-anchor to "Action of antidiuretic hormone (ADH)" + note the rest (clearance, sympathetic innervation, JG complex, micturition control) is past the curriculum. |
| `abct2326-cvs-ecg-cycle` (EX) | beyond[3] — SUPERSEDED by Group F: the whole tag goes. (Was: trim the systole/diastole clause. Unnecessary once the item is untagged and taught in full.) |
| `abct2326-cvs-conduction` (EX) | beyond[3] "Sinoatrial (SA) node in posterior wall of right atrium contains autorhythmic pacemaker cells that initiate atrial activation." | The elective's named content **is "Pacemaker"** (p.34/PDF38), and on the learner's own calibration the SA node itself is DSE-classroom content — the deletion holds a fortiori. beyond[4] (prepotential/HCN) carries what's genuinely beyond. |
| `abct2326-cvs-hemodynamics-tutorial` (PI) | beyond[5] "The sinoatrial (SA) node is the intrinsic primary pacemaker initiating heartbeats." | Same as above — this is the elective's "Pacemaker" restated, cited to a tutorial answer key (phys.cvs.tut) besides. Move to Group B's quote fix only; the deletion here does the work. |

### Group F — tag removal candidates (2 items — behaviour change, needs your explicit call)

| Item (file) | now | proposed | Why |
| :--- | :--- | :--- | :--- |
| `abct2326-resp-lung-volumes` (PD) | part / elective-hp | **remove `priorKnowledge` entirely** | The ref quotes "Measurement of lung volumes: tidal volume, vital capacity" — **this heading exists in neither document; the words "tidal volume", "vital capacity" and "lung volume" appear nowhere in either** (grep-verified). There is no DSE basis for the tag at all: the item (minute ventilation, TV/IRV/ERV/RV, capacities, obstructive vs restrictive) was never taught to a DSE Biologist. Keeping the tag would mean claiming prior knowledge sourced to a quote that doesn't exist. Removal makes it a normal taught item (opens on Learn, no assumed half-credit, no "adds beyond DSE" card). |
| `abct2326-cvs-ecg-cycle` (EX) | part / elective-hp | **remove `priorKnowledge` entirely** | The tag's DSE foundation is the elective's cardiac-cycle outline — but the item's substance (ECG waves: P/QRS/T as atrial/ventricular depolarisation–repolarisation; the 250–300 ms action potential and refractory period) is built on **depolarisation, a concept that appears nowhere in DSE Biology** (0 hits for depolar/repolar/action potential/membrane potential in both documents). "Almost all of what this tag calls DSE-covered is unseen" — the learner's own report: they do not know what polarisation is. The tag would open this item on Practise with assumed half-credit on exactly the material the framework's own rule says must never happen ("sending anyone else straight to a question on unseen material would be the opposite of helpful"). Removing the tag teaches the item in full; the genuinely-DSE overlap (cardiac-cycle events, heart sounds) loses nothing but a little redundancy. |

### Post-change counts (both passes combined)

- Tagged items: 40 → **38** (resp-lung-volumes and cvs-ecg-cycle untagged, Group F).
- `elective-hp`: 13 → **8** (resp-ventilation-mechanics, resp-oxygen-transport,
  resp-gas-transport move to core; the two untagged items leave).
- `covers` changes: **3** (organelles, muscle-neural-tissue: most→part;
  renal-nephron: part→most).
- `beyond[]` lines: 241 → **194** — 47 deleted (4 in Group E, 13 leave with the two
  Group F tag removals, 12 in Group G1, 18 in Group G2) and 22 of the survivors
  trimmed in place (Group H).
- Second-pass deltas to earlier rows: `nucleus` (B) also loses beyond[3] (G1);
  `protein-synthesis` (B) trims [1][2] (H); `renal-countercurrent-vasarecta` (B) loses
  [2] (G1); `renal-tubular-clearance` loses [6] (G1) on top of E's [10];
  `cvs-hemodynamics-tutorial` (B) loses [3][4] (G2) on top of E's [5];
  `resp-ventilation-chemoreceptors` (B) loses [0][2] (G2); `cvs-conduction` trims [2]
  (H) on top of E's [3] deletion. The six items the first table never listed
  (`resp-carbon-dioxide-control`, `digestive-wall-motility`, `digestive-stomach-control`,
  `digestive-small-intestine-accessory`, `digestive-hormones-colon`, `immune-adaptive`)
  keep their `part`/`core` tags — verified — with the G1/G2/H line changes above.
- README's current "Fifteen of the twenty-three" and "4 of the 17" are stale either way —
  rewritten in step 5.
- schema.js `DSE_PARTS` comment (nephron / cardiac cycle / pacemaker / respiratory
  centres in the elective) — re-verified, still true; keep.

---

## Part 3 — What I did NOT find grounds to change

- `covers` on the items with 5+ genuine `beyond` lines but a solid DSE core
  (digestive-pathway, feedback-loops): the Supplement's depth markers support the
  current values. (`homeostasis` beyond[2] was initially left standing here as
  "borderline" — the second pass (Group G1) deleted it: the receptor / coordination
  system / effector outcome is printed in the Guide.)
- The borderline-keep list at the end of Part 1.5 — each entry defensible as a
  terminology/quantification add; rule on any of them and they move.
