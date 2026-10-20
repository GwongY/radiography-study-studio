# Physiology Revise — links, threads, ★ facts and decoder (Tasks 20 and 21)

Every link below cites a page of a registered 2026 lecture deck whose words state it
(`work/revision-check.mjs` re-reads each one). Slide-line reasons are the slide's own words.

## Task 20 — what was added

- **Row links (35):** W3 haemoglobin and carbaminohaemoglobin to the W2 red-cell rows; W3 type I
  pneumocytes to W1 simple epithelium; W3 hypercapnia, W5 renin release, W5 sympathetic activity,
  W8 target-gland feedback to W1 negative feedback; W7 oxytocin and W8 LH surge to W1 positive
  feedback; W4 mucosa to W1 epithelial tissue; W4 GIP and pancreatic islets to W8 insulin and
  glucagon; W5 afferent arteriole to W2 arterioles; W5 plasma volume and renin release to W2
  plasma; W7 primary spermatocytes to W1 meiosis; W8 oxytocin, aldosterone, ADH, gonadotropins and
  testosterone to the W7 and W5 rows naming the same hormone; W8 adrenal medulla to W9 sympathetic
  pathways; W9 muscarinic receptors to the heart; W11 ACh to W9 acetylcholine; W11 voluntary and
  involuntary muscle, compact bone and osteocytes to the W1 tissue rows; W12 fixed macrophages,
  alveolar macrophages and mast cells to the rows of the same name in W1 and W3.
- **Topic links (9):** oxygen transport–blood, gas exchange–pulmonary/systemic circulations,
  spermatogenesis–meiosis, pituitary feedback–feedback, parturition–feedback, islets–pancreas,
  adrenal–sympathetic pathways, NMJ–acetylcholine, RAAS–plasma.
- **Cross-subject links (25 new, on top of the 29 from Task 10):**
  heart, valves and conducting system (with SA node, AV node, Purkinje fibres, the four valves,
  papillary muscles, gap junctions) to the anatomy Week 8 heart boxes; neurons, glia, synapses,
  sympathetic and parasympathetic pathways to the anatomy nervous boxes; NMJ, motor unit, compact
  and spongy bone, bone, muscle spindle to the anatomy muscle and bone boxes; hypothalamic control
  to the anatomy hypothalamus.

## Task 20 — candidates not added, and why

- W5 tubule rows to W1 epithelial rows: no W5 page says "epithelium".
- W4 villus capillaries to W2 capillary types: the W4 page says only "capillary network".
- W9 action potential to W2 myocardial action potential and refractory periods: no W9 page names the
  heart's action potential (only the muscarinic/heart sentence, which is linked).
- W4 gastrin, secretin and CCK to W8: the W8 deck never names them.
- W1 negative feedback to W7 hormonal control of spermatogenesis: the W7 page does not say "feedback".
- W1 positive feedback to W8 oxytocin: the W8 page gives no feedback wording (W7 oxytocin and the LH
  surge are linked instead).
- Cross-subject: W3 respiratory portion to anatomy lungs and airways: anatomy has no lung or airway
  box. W8 pituitary, thyroid, adrenal to anatomy: anatomy has no gland box (hypothalamus only, linked).

## Check fix made on the way

`work/revision-check.mjs` treated the whole fourth element of a topic link as the page list, so the
words-on-the-page string failed the integer-page test. It now reads the pages and the words
separately; the requirement (the words are on a cited page) is unchanged.

## Task 21 — threads, tables, decoder, tours

Six threads (43 steps, each on a page that says it), 29 table rows, 51 decoder terms and six tours.
Every thread has a 廣東話 line that `yueProblems` accepts (no English word or number the steps lack).

### ★ textbook facts (Martini, PDF page of `Fundamentals of Anatomy and Physiology_eBook.pdf`, for the owner to check)

| Thread, step | PDF page | Chapter | The sentence |
| --- | --- | --- | --- |
| t1 Carried on hemoglobin | 889 | 23 | Each hemoglobin molecule has four globular protein subunits, and each subunit contains a heme unit. |
| t3 Negative feedback | 39 | 1 | Negative feedback opposes variations from normal, whereas positive feedback exaggerates them. |
| t4 Bile | 943 | 24 | Without CCK the hepatopancreatic sphincter stays closed, so bile cannot flow through the common bile duct into the duodenum. |
| t5 Relaxation | 336 | 10 | Acetylcholinesterase breaks ACh down, which ends action potential generation in the muscle fibre. |
| t6 Mast cells | 830 | 22 | Histamine released by mast cells makes capillaries more permeable and speeds up blood flow through the area. |

Thread t2 (blood pressure and volume) has no ★: a first look in chapters 19 to 21 and 26 found only
sentences that repeat the slide, so none was written. Steps t3 (renin, aldosterone), t5 and others carry none either (at most one per step, only where it adds).

### Decoder terms dropped, and why (superseded on 20 Oct 2026: the whole-reading rule was removed and the wrong roots fixed in `wordparts.js`; see 2026-10-20-physiology-gap-analysis.md)

The reading `decoderReading` gives was checked against the slide's use of each word. Dropped:
Oxyhemoglobin and Oxygen–hemoglobin saturation curve (`oxy-` is read as "rapid, fast"; it means oxygen),
Spermatogonia (`goni/o` read as "angle"), Interphase (`phas/o` read as "speech"), Steroids (`ster/o` is
the word itself), Paracrine (`para-` read as "abnormal"), Trophoblast (`troph/o` read as "development"),
Osmosis (`-osis` read as "abnormal condition"), Nucleoplasm and Cytoplasm (`-plasm` read as
"formation, production"), Glucose (`-ose` read as "pertaining to"), Cytokines and Lymphokines (`-kine`
read as "movement"), and every term where a word of a multi-word name has no reading (for example
Seminiferous tubules, Efferent ductules, Primary spermatocytes): only whole readings are kept.
Wrong or doubtful roots in `wordparts.js` (a separate task, not edited here): `oxy-`, `goni/o`, `phas/o`,
`ster/o`, `para-` (beside), `troph/o`, `-plasm`, `-kine`, `cycl/o` read as "ciliary body" in cyclase and
recycling, `press/o` + `ur/o` for "pressure", `ur/o` in "natural killer".

### Tables not written

Tables hold slide facts only (no ★). No row for FSH and LH "made by": the Week 7 slide does not
say it (the cell reads "Not stated on this slide").
