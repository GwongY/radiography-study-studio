# SP3 — HSS2011 Human Anatomy Weeks 11–12 Source Scope Pass

Contract for rewriting the **HSS2011 Human Anatomy Weeks 11–12** corpus (Digestive
System; Urogenital System). Every row below is one intended study item. All 13 existing
item ids are preserved (rescoped in place); **one new item** is added
(`hss2011-uro-nephron-renal-microanatomy`, W12 — see the count rationale). Cite only the
pages named here; all were read from `work/source-text.json`, not the drive.

## Current state (measured 2026-09-08)

| Week | Lecture | Authored items (excl. 3D companion) | Median lesson chars | Real image | Visuals/item |
| --- | --- | --- | --- | --- | --- |
| W11 | Digestive | 6 (of 7 incl. `hss2011-structures-digestiveTract`) | 1,120 authored median | 0/7 | 1.0 |
| W12 | Urogenital | 5 (of 6 incl. `hss2011-structures-urinaryTract`) | 1,886 authored median | 0/6 | 1.0 |

W11 sits at 6 authored items, so no new item is added there (rule: add only where the
lecture is below 6 items). W12 sits at 5 authored items and its deck devotes 7 dense
pages (hss.3.2 p7–13) to renal microanatomy that the current `hss2011-uro-kidneys-urinary-tract`
item crams into 1,930 chars; the study manual's guiding questions 1–2 ("What are the major
components of a kidney lobe? Describe the locations of the two types of nephrons") and the
recurring "glomerulus" / "minor calyx" / "arcuate arteries" blanks target exactly that
block, so it gets its own item and W12 reaches 6 authored.

## Decks by week (HSS2011 2026 schedule)

| Week | Lecture title | Primary deck | Support & tested anchors |
| --- | --- | --- | --- |
| **W11** | Digestive System | `hss.3.1` pp.1–43 ("2.1 Digestive System": tract overview & organ functions, oral cavity, pharynx, oesophagus, stomach wall & gastric glands, small intestine segments & surface amplification, large intestine, rectum/anal canal, 4-layer wall summary, salivary glands, liver gross & lobule histology, pancreas, gallbladder & biliary tree, foregut/midgut/hindgut blood supply, hepatic portal system, peritoneum/mesenteries/omenta) | `hss.3.1.2019` pp.1–36 (1920 revision of the same lecture with "description for students' revision" prose); `hss.3.3.2019` pp.20–38 (peritoneum, intraperitoneal vs retroperitoneal, stomach/duodenum/colon regional, liver functional division, hepatobiliary flow); `hss.manual1920` p33–34 (Module 3.1 guiding questions, MCQs, fill-in-blanks); `hss.revans` p3 (Module 3.1 FIB answers), p4 (More exercises labelling A–V) |
| **W12** | Urogenital System | `hss.3.2` pp.1–40 ("2.2 Urogenital System": kidney gross & sectional, renal circulation, nephrons, renal corpuscle & JG complex, ureters, bladder, male/female urethra, urothelium, perineum, male reproductive — scrotum, spermatic cord, testis, epididymis, ductus deferens, accessory glands, penis; female reproductive — ovary, uterine tubes, uterus & wall, vagina, vulva, clitoris) | `hss.3.3` pp.1–19, 29–39 and `hss.3.3.2019` pp.39–58 (regional: kidney level T12–L3, ureteric constrictions, bladder, male/female pelvis, uterine position, venous drainage); `hss.manual1920` p35–36 (Module 3.2 guiding questions, MCQs, fill-in-blanks); `hss.revans` p3 (Module 3.2 FIB answers), p4 (ureteric-stone sites, 10th-rib organs, crossword); `hss.fib5yr` p7–12 (the recurring Module-3 blank table — every one of the 25 rows is W11/W12 scope) |

Note on deck numbering: `hss.3.1`/`hss.3.2`/`hss.3.3` are titled "2.1 / 2.2 / 2.3" in their
slide decks (the 1920 numbering). The current schedule teaches them as **Module 3** weeks
11–12, matching `hss.manual1920` "Module 3.1 Digestive System / 3.2 Urogenital / 3.3
Regional Anatomy of the Abdomen and Pelvic". All of it is the current schedule's W11/W12.

## Existing items in scope (12 authored, all rescoped in place) + 1 new + 2 3D companions (touched: no)

### Week 11 — Digestive System (6 authored)

1. `hss2011-m3-digestive` (existing): Corpus overview — the two anatomical subdivisions
   (digestive tract/alimentary canal 9 m = 30 ft mouth→anus, vs accessory organs: teeth,
   tongue, salivary glands, liver, gallbladder, pancreas); GI tract = stomach + intestines;
   per-organ functions table; the four tissue layers of the tract wall (mucosa with
   epithelium/lamina propria/muscularis mucosae, submucosa with vessels and
   submucosal plexus, muscularis externa inner circular + outer longitudinal — three layers
   in the stomach — and serosa), epithelium types along the tract (simple columnar vs
   stratified squamous at mouth/pharynx/oesophagus/anal canal), myenteric plexus.
2. `hss2011-digestive-tract-upper` (existing): Oral cavity (buccal) boundaries, vestibule,
   fauces, non-keratinized stratified squamous lining mucosa; the three salivary gland
   pairs and their duct openings (parotid = largest); pharynx (3 regions, 2 skeletal
   muscle constrictor layers, nasopharynx respiratory only, upper oesophageal sphincter);
   oesophagus (25–30 cm muscular tube posterior to trachea, oesophageal hiatus, cardiac
   orifice, lower oesophageal sphincter, serosa only below the diaphragm, muscularis
   externa thirds = skeletal/mixed/smooth, voluntary→involuntary swallowing);
   stomach (J-shaped, 4 regions — cardia/fundus/body/pylorus — lesser/greater curvatures,
   3 smooth-muscle layers with the innermost oblique, rugae, pyloric sphincter; gastric
   pits and glands: mucous neck cells, parietal cells → HCl + intrinsic factor, chief
   cells → pepsinogen, G/enteroendocrine cells, regenerative cells).
3. `hss2011-digestive-tract-small-large-bowel` (existing): Small intestine three segments
   (duodenum first 10 in. — receives bile and pancreatic enzymes at the
   hepatopancreatic sphincter; jejunum 8 ft proximal 40% — most digestion/absorption,
   thick wall, rich blood supply; ileum 12 ft distal 60% — Peyer's patches, ileocecal
   junction/valve); surface amplification (circular folds → villi, largest in duodenum →
   microvilli/brush border ≈ 1 µm; ~200 m²); absorptive columnar + goblet cells, tight
   junctions, lacteals; large intestine (5 ft; caecum + appendix; ascending/transverse/
   descending/sigmoid colon; rectal valves; teniae coli → haustra; omental appendices;
   no villi/circular folds; goblet-cell mucous; lymphatic tissue); rectum (S2, ~6 in.) and
   anal canal (internal anal sphincter = smooth, involuntary; external = skeletal,
   voluntary; anal columns/sinuses; levator ani).
4. `hss2011-digestive-accessory-liver-pancreas` (existing): Salivary glands recap
   (parotid/submandibular/sublingual); liver (right/left/caudate/quadrate lobes,
   falciform + coronary ligaments, porta hepatis = entry hepatic portal vein & hepatic
   artery proper / exit bile passages; lobule histology — hepatocyte plates, sinusoids,
   Kupffer cells, bile canaliculi, portal area triad = branch of portal vein + branch of
   hepatic artery + bile duct; 70–80% of liver blood is portal, ~30% arterial);
   gallbladder (fundus/body/neck, stores and concentrates bile, cystic duct);
   biliary tree (right/left hepatic → common hepatic + cystic → common bile duct →
   duodenal ampulla → major duodenal papilla, hepatopancreatic sphincter);
   pancreas (head tucked in the C of the duodenum, body, tail to spleen; acinar exocrine
   cells secrete pancreatic juice — enzymes activated in the duodenum; pancreatic islet
   endocrine cells secrete insulin and glucagon).
5. `hss2011-digestive-peritoneum-portal-circulation` (existing): Peritoneum (parietal
   lines the wall, visceral = serosa covers organs, peritoneal cavity between, lubricated);
   intraperitoneal (stomach, liver, jejunum/ileum, transverse & sigmoid colon) vs
   retroperitoneal (kidneys, ureters, pancreas, duodenum last ¾, ascending/descending
   colon) organs; mesenteries (mesentery proper fan suspending jejunum/ileum; transverse
   & sigmoid mesocolons; functions — suspend, store fat, prevent twisting, passage for
   vessels/nerves, lymph nodes); omenta (greater from greater curvature apron-like,
   lesser from lesser curvature to liver; isolate infection, immune cells); arterial
   supply — abdominal aorta → coeliac trunk (foregut: mouth→proximal duodenum),
   superior mesenteric (midgut: distal duodenum→proximal ⅔ transverse colon), inferior
   mesenteric (hindgut: distal ⅓ transverse colon→upper rectum), esophageal branches
   above the diaphragm; venous drainage — all below-diaphragm digestive blood → hepatic
   portal vein (a portal vessel connects two capillary beds; tributaries splenic, SMV,
   IMV) → liver sinusoids → hepatic veins → IVC; first-pass metabolism.
6. `hss2011-digestive-tutorial-pastpaper-practice` (existing): worked past-paper synthesis:
   the 5 Module 3.1 fill-in-blanks (simple columnar epithelium, oblique muscle, cardiac
   orifice, duodenojejunal junction, hepatic portal vein), the 5 MCQs (ileum longest gut
   segment, gastric pits in mucosa, teniae coli in colon, parotid largest salivary gland,
   six portal areas per lobule), the recurring 5-year blanks (fundic region, pyloric
   sphincter, duodenum villi largest, Peyer patches, ileocecal valve/teniae coli/haustra,
   pancreas uncinate/ampulla, liver lobes/falciform/porta hepatis) and the More-exercises
   labelling chain A–V (gallbladder, cystic duct, common hepatic duct, common bile duct,
   hepatic portal vein, coeliac trunk, hepatic artery proper, SMA, IMA).

7. `hss2011-structures-digestiveTract` (existing 3D companion — generated from
   `structures.js`; verified correct, not touched): oesophagus → stomach → duodenum →
   jejunum → colon segments → appendix → liver → gallbladder → pancreas on the organs
   layer.

### Week 12 — Urogenital System (5 authored + 1 NEW)

1. `hss2011-m3-urogenital-pelvis` (existing): Regional anatomy of the abdominopelvic
   region — 4 quadrants and 9 regions (transpyloric plane L1, transtubercular plane L5,
   midclavicular lines; midline regions epigastric/umbilical/hypogastric); physical
   examination landmarks (gallbladder ~midclavicular × costal margin; McBurney's point
   ⅓ ASIS→umbilicus; femoral artery ½ ASIS→pubic tubercle); abdominal wall boundaries
   (external oblique, internal oblique, transversus abdominis, rectus abdominis, linea
   alba, rectus sheath; posterior wall = psoas major, quadratus lumborum, erector spinae
   — the tested FIB answer); diaphragm as abdominal inlet with the three hiatuses
   (caval T8, oesophageal T10 — the tested FIB answer, aortic T12); pelvic inlet (sacral
   promontory–pelvic brim–superior pubic symphysis) vs outlet (coccyx tip–inferior pubic
   symphysis); pelvic diaphragm = levator ani + coccygeus; perineum diamond = urogenital
   + anal triangles, perineal body; male vs female bony pelvis; urinary bladder
   infraperitoneal; venous drainage (internal/external iliac → common iliac → IVC L5–T8;
   right gonadal vein → IVC directly, left → left renal vein; spread of malignancy via
   vertebral venous plexus); the two More-exercises clinical keys (three potential sites
   of ureteric-stone obstruction; broken left 10th rib → left kidney + spleen).
2. `hss2011-uro-kidneys-urinary-tract` (existing): Kidney gross (reddish-brown bean,
   T12–L3, ~10×5.5×3 cm, ~150 g, right slightly inferior (liver), adrenal gland on
   superior surface, retroperitoneal; connective layers = fibrous capsule, perinephric
   fat, renal fascia; hilum = entry renal artery/nerves, exit renal vein + ureter);
   sectional anatomy (cortex, medulla, pyramids, renal columns, sinus, 4–5 minor calyces
   → 2–3 major calyces → renal pelvis → ureter); ureters (triple-layered muscular tubes,
   retroperitoneal, oblique entry through posterior bladder wall); urinary bladder
   (hollow muscular, superior surface peritoneal, rugae, detrusor = inner/outer
   longitudinal + circular, trigone = two ureteral openings + internal urethral
   sphincter, internal sphincter involuntary); male urethra 18–20 cm in three parts
   (prostatic/membranous/spongy) vs female 3–5 cm bladder→vestibule; external urethral
   sphincter (urogenital diaphragm) voluntary in both sexes; urothelium/transitional
   epithelium lines calyces→bladder→proximal urethra.
3. **NEW: `hss2011-uro-nephron-renal-microanatomy`**: Kidney lobe (pyramid + overlying
   cortex); renal circulation route (renal artery → segmental → interlobar → arcuate
   (cortex/medulla boundary — the tested MCQ) → cortical radiate → afferent arteriole →
   glomerulus → efferent arteriole → peritubular capillaries / vasa recta); two nephron
   types (cortical ~85% with short loops vs juxtamedullary near the medulla with long
   loops + vasa recta); renal corpuscle (glomerulus = compact ball of capillaries — the
   every-year blank; glomerular capsule with parietal/visceral epithelium, podocytes,
   capsular space); juxtaglomerular complex (JG cells = smooth muscle of the afferent
   arteriole; macula densa of the DCT); tubule functions (PCT reabsorbs water/ions/all
   organic nutrients, abundant microvilli + mitochondria; nephron loop descending limb
   water, thin ascending squamous, thick ascending Na+Cl−; DCT secretes ions/acids/drugs,
   variable hormonal reabsorption, few microvilli; collecting duct → papillary duct →
   renal papilla → minor calyx).
4. `hss2011-uro-male-reproductive-anatomy` (existing): Scrotum (fleshy pouch, median
   septum + perineal raphe; three layers — scrotal skin, dartos smooth muscle (wrinkling),
   superficial fascia; tunica vaginalis serous pouch; cremaster skeletal muscle pulls
   testes closer when cold — the every-year blank); spermatic cord (fascia + muscle from
   abdominopelvic cavity through inguinal canal enclosing ductus deferens, testicular
   artery, pampiniform plexus — countercurrent heat exchanger, deferential artery,
   genitofemoral nerve); testis (septa → ~800 lobules → seminiferous tubules where sperm
   are synthesized — tested; tight-junction blood–testis barrier from sustentacular
   cells; straight tubules → rete testis → 15–20 efferent ductules — the tested MCQ);
   epididymis head/body/tail (tail re-curves ascending to ductus deferens); ductus
   deferens (ciliated muscular tube via inguinal canal, posterior bladder, terminal
   ampulla); seminal glands (≈60% of semen — tested); ejaculatory duct (union of ampulla
   + seminal gland duct, penetrates prostate); prostate gland; bulbourethral glands (the
   tested Module 3.2 FIB — at the base of penis / urogenital diaphragm); penis (three
   cylinders — paired corpora cavernosa + corpus spongiosum enclosing the urethra —
   tested; lacunae/trabeculae; flaccid 8–10 cm vs erect 13–18 cm; prepuce; glans).
5. `hss2011-uro-female-reproductive-pelvis` (existing): Ovaries (small almond organs near
   lateral pelvic wall; tunica albuginea + germinal columnar epithelium under visceral
   peritoneum; stroma = superficial cortex (gametes produced) + deeper medulla (vessels
   and nerves — the tested blank)); uterine tubes (Fallopian) — infundibulum with
   fimbriae capturing the ovum, ampulla (fertilization site), isthmus (the recurring
   three-segment blank and the 2017 exam Figure-1 labels); uterus (fundus/body/cervix;
   internal os, cervical canal, external os projecting ~1.25 cm into vagina; wall =
   endometrium 10% cyclic / myometrium 90% / perimetrium incomplete serosa — the
   recurring blank; uterine artery from internal iliac, ovarian arteries anastomose in
   the broad ligament); vagina (elastic distensible tube cervix→vestibule, rectum behind
   urethra in front, fornix, hymen — the tested FIB); vulva & vestibule (mons pubis, labia
   majora/minora, lesser + greater vestibular (Bartholin's) glands; clitoris = pair of
   corpora cavernosa, no corpus spongiosum, sensory only; vestibular bulbs ≈ corpus
   spongiosum — note the answer-key discrepancy in commonMistakes); position
   (anteversion vs anteflexion; body rests on bladder; vesicouterine & rectouterine
   pouches; broad/suspensory/ovarian/uterosacral ligaments — the 13/14 blank).
6. `hss2011-uro-tutorial-pastpaper-practice` (existing): worked past-paper synthesis: the
   5 Module 3.2 fill-in-blanks (bulbourethral, detrusor, calyx, clitoris, hymen), the 5
   MCQs (arcuate arteries, DCT distal to loop, spermatic cord contents *except*
   seminiferous tubule, cervical canal, 15–20 efferent ductules), the recurring five-year
   blanks (hilum, ureter penetrates posterior wall, corpus spongiosum, seminal gland,
   cremaster, glomerulus, uterine-tube segments, endometrium/myometrium/perimetrium,
   pampiniform plexus, blood–testis barrier, medulla of ovary, uterosacral/ovarian/
   suspensory ligaments, seminiferous tubules, trigone, minor calyx) and the
   More-exercises keys (ureteric stones, 10th-rib organs).
7. `hss2011-structures-urinaryTract` (existing 3D companion — generated from
   `structures.js`; verified correct, not touched): suprarenal gland → kidney → renal
   pelvis → ureter → bladder → urethra on the organs layer.

---

## Tested-anchor map (what MUST be covered)

| Anchor | Where it lives now |
| --- | --- |
| `hss.manual1920` p34 Module 3.1 MCQs 1–5 + FIBs 1–5 | items W11-2, W11-3, W11-4, W11-5, W11-6 |
| `hss.manual1920` p36 Module 3.2 MCQs 1–5 + FIBs 1–5 | items W12-2, W12-3, W12-4, W12-5, W12-6 |
| `hss.manual1920` p38 Module 3.3 MCQs 1–5 + FIBs 1–5 | items W12-1, W12-5, W12-6 |
| `hss.revans` p3 (Module 3.1/3.2/3.3 answer keys) | items W11-6, W12-6 + all commonMistakes |
| `hss.revans` p4 More exercises (labelling A–V, ureteric stones, 10th rib) | items W11-4, W11-5, W12-1, W12-6 |
| `hss.fib5yr` p7–12 recurring Module-3 blanks (25 rows) | every W11/W12 item's commonMistakes + W11-6/W12-6 |
| `hss.pp1718` p3 / `hss.ppans` p7–12 (2017 exam FIBs 19–27 + answers) | items W12-1, W12-2, W12-4, W12-5 |

## Cut / deliberately out of scope

- **Urinary physiology (filtration/absorption rates, ADH/aldosterone mechanics)**
  (`phys.5`) — belongs to ABCT2326 SP5's renal items (`abct2326-renal-*`,
  `countercurrentMultiplierMechanism` figure). HSS2011 stops at anatomical structure:
  corpuscle parts, tubule segments, what each absorbs/secretes per `hss.3.2` p12.
- **Reproductive hormone cycles and gametogenesis staging** (`phys.7`) — ABCT2326 SP6
  scope. HSS2011 names insulin/glucagon for the pancreas (p30) and stops.
- **Liver functional/surgical segmentectomy detail** (`hss.3.3.2019` p32 "advanced") —
  the functional left/right lobe division is named in one line in W11-4; no standalone
  segment anatomy lesson.
- **Inguinal canal walls and hernia classification** (`hss.3.3.2019` p11 mentions the
  ring) — the canal is named as the spermatic cord's route; no hernia lesson.
- **Rectal/anal sphincter nerve supply detail (pudendal vs autonomic naming)** —
  `hss.3.1.2019` p33 asks the guiding question but no cached page gives the named
  nerves; the items teach involuntary vs voluntary control only (as the decks do).
- **Female urethra / urogenital diaphragm beyond the named sphincters** — the decks name
  the external sphincter and its voluntary control; deeper perineal pouches are not in
  any cached page.

## Visuals strategy

Every authored item carries 2–4 visuals. Reused free-licensed figures already in
`outputs/figures.js` from SP4/SP5: `digestiveSystemOverview`, `digestiveWallLayers`,
`stomachWallGlands`, `smallIntestineVillus`, `liverLobuleAnatomy`,
`kidneyGrossAnatomy`, `nephronVascularMicroanatomy`, `glomerularFiltrationMembrane`,
`nephronSecretionReabsorption`, `abdominalQuadrantsRegions`, `maleFemalePelvis`,
`thoracicDiaphragm`; the existing `nephron` schematic in `outputs/schematics.js`;
3D model views from the `organs` layer (Stomach, Oesophagus, Duodenum, colon segments,
Liver segments, Gallbladder, Pancreas, Kidney, Ureter, Urinary bladder, Prostate,
Testis).

New figures to fetch via `work/fetch-figure.mjs` (Wikimedia CC-BY/PD only):

1. `salivaryGlands` — the three gland pairs + duct openings.
2. `stomachRegions` — the four gastric regions + curvatures + pyloric sphincter.
3. `largeIntestineAnatomy` — caecum/colon/rectum with teniae coli, haustra, omental
   appendices.
4. `biliaryPancreaticDucts` — liver/gallbladder/pancreas duct system + duodenal ampulla.
5. `peritoneumMesenteries` — sagittal peritoneal relations, greater/lesser omentum,
   mesentery, retroperitoneal vs intraperitoneal.
6. `maleReproductiveSagittal` — mid-sagittal male reproductive tract.
7. `testisSeminiferousTubules` — testis lobules, seminiferous tubules, rete testis,
   epididymis.
8. `femaleReproductiveSagittal` — mid-sagittal female reproductive tract.
9. `uterineTubeOvary` — posterior view of uterus, tubes (fimbriae/ampulla/isthmus) and
   ovaries.
10. `urinaryBladderTrigone` — bladder + trigone + ureteral oblique entry (male/female
    urethra comparison if the free figure supports it).

Any fetch refusal → app-authored schematic in `outputs/schematics.js`, never a slide.

## Technical & verification rules

1. `outputs/study/corpus/hss-modules.js` is a pure-JSON array literal, CRLF — edit
   programmatically (parse → replace by id → re-stringify → CRLF), never by hand.
2. Preserve all 13 existing ids.
3. Every `sourceRefs`/`practice.src` `location` written as `p<N> "quoted phrase"` with the
   quote verified on that exact page via `citationEvidence` before the item is written.
4. Target ~3,000–5,000 chars per lesson, 10 keyFacts, 4–6 practice items with verified
   `src`, one clinical scenario with a 3-point rubric, tagged memory aids, commonMistakes
   from the real distractors above.
5. No visual hallucinations: every `visuals` key must resolve (visuals-check).
