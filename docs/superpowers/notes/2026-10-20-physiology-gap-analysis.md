# ABCT2326 Revise: gap analysis of Threads, Tables and Decoder (20 October 2026)

The owner, 20 October 2026: Physiology's Threads, Tables and Decoder are far too thin. "Threads such as
ATPase or ion pumps, concepts connecting a lot of chapters, are missing. Histone is missing. Oocyte is
missing. A lot missing."

This note records what the ten 2026 lecture decks and the tissue tutorial teach across lectures, what Revise
had, and what was added. Every page number here is the deck's PDF page, as `node work/query.mjs pages <id> <n>`
prints it. Decks: W1 `phys.1.2026` (and the tissue tutorial `hss.tut.tissues`), W2 `phys.l2.2026` (cardiovascular),
W3 `phys.l3.2026` (respiratory), W4 `phys.l4.2026` (digestive), W5 `phys.l5.2026` (renal), W7 `phys.l6.2026`
(reproduction), W8 `phys.l7.2026` (endocrine), W9 `phys.l8.2026` (nervous), W11 `phys.l9.2026` (muscle and bone),
W12 `phys.10.2026` (immune).

## Cross-chapter concepts

"Before" is the data at commit 516d857: 6 threads (oxygen, blood pressure, feedback, a meal, nerve to muscle,
defence) and 2 tables (hormones, numbers). "Now" is the thread or table that carries the concept after this pass.
Every one of these is also a `concepts` entry in `work/revision-coverage.mjs`, so `work/revision-check.mjs` fails
if its thread disappears or a listed box drops out of it.

| Concept | Where the slides teach it (week, page) | Before | Now |
| --- | --- | --- | --- |
| ATP and the pumps that spend it | W1 p16 (mitochondria make 95% of ATP); W3 p56 (chloride shift "without using ATP"); W4 p29 (H+ actively transported in a parietal cell), p64 (energy for ATP synthesis); W5 p24 (primary active transport by the Na+/K+ pump), p26 (energy cost 6% of calories), p27 (salt pumping); W8 p17 (ATP into cAMP); W9 p29 (3 Na+ out, 2 K+ in); W11 p37 (Ca2+-ATPase), p52 (less ATP in fatigue), p53 (oxidative phosphorylation) | one step (W11 p37, in t5) | thread t7, 12 steps |
| Gradients and transport across membranes | W1 p7, p8, p10; W3 p41; W4 p29 (countertransport), p67; W5 p24 (coupled transport, facilitated diffusion), p30 (urea transporters); W7 p54 (simple diffusion, active transport at the placenta); W8 p13; W9 p26, p27; W11 p30, p42 (GLUT4) | none | thread t8, 14 steps |
| Water follows salt (osmosis) | W2 p3, p6; W4 p60, p67; W5 p21, p22, p27, p31; W8 p27 | ADH and albumin steps in t2 | thread t9, 9 steps |
| Action potentials in heart, nerve and muscle | W2 p23, p48, p50, p56, p59; W4 p12; W5 p6; W9 p23, p33, p38, p45; W11 p31, p32 | nerve only (t5) | thread t10, 13 steps |
| Calcium as a signal | W1 p47; W2 p50, p56; W7 p44; W8 p18, p39, p45; W9 p52; W11 p26, p32, p37, p70 | one step (t5) | thread t11, 12 steps |
| Receptors and second messengers | W1 p10; W5 p6, p16; W7 p32; W8 p13, p15, p17, p18, p19; W9 p24, p60, p61; W11 p30; W12 p19, p63 | none | thread t12, 15 steps |
| Sensors that start a reflex | W1 p58, p60; W3 p67, p71; W4 p18; W5 p19, p31, p43; W11 p59, p61, p62 | baroreceptors in t2 | thread t13, 11 steps |
| From DNA to gametes (histones, oocyte, ovum, sperm) | W1 p4, p12, p15, p21, p24, p27; W7 p4, p5, p15, p22, p24, p33, p44, p45; W8 p13; W12 p51 | none; no histone, oocyte, ovum or sperm box | thread t14, 16 steps, plus new rows (below) |
| Glucose from a meal to a working muscle | W4 p43, p57, p65; W5 p24; W7 p17, p54; W8 p36, p48, p49; W11 p41, p42, p44 | insulin in t4 | thread t15, 12 steps |
| Acid, bicarbonate and pH | W3 p48, p50, p56, p73; W4 p28, p29, p36, p56; W5 p2, p44; W11 p52; W12 p12 | none | thread t16, 12 steps |
| White cells before the immunity lecture | W1 p38, p43, p46; W2 p6, p7; W3 p10; W7 p54; W8 p41, p54; W9 p18; W12 p14, p16, p41, p46 | W12 only (t6) | thread t17, 14 steps |
| Smooth muscle across the systems | W1 p51; W2 p10, p13; W4 p11, p12; W5 p6; W7 p18, p38, p56; W9 p8; W11 p7 | none | thread t18, 11 steps |
| Autonomic nerves across the organs | W3 p69; W4 p16, p53; W5 p6, p19; W7 p18; W8 p35; W9 p8, p60, p61; W11 p6 | none | thread t19, 11 steps |
| Capillaries: where exchange happens | W2 p13, p15; W3 p9; W5 p9, p14; W7 p51; W8 p29; W9 p19; W11 p48; W12 p18 | none | thread t20, 10 steps |
| Hemoglobin and myoglobin | W2 p7; W3 p45, p47, p53, p57; W7 p54; W11 p45, p48, p53 | one step (t1) | thread t21, 9 steps |
| Enzymes and their inactive forms | W1 p10, p20; W3 p50; W4 p26, p39, p65; W5 p40; W7 p41; W8 p17; W11 p29, p53; W12 p17, p31 | pancreas step in t4 | thread t22, 13 steps |
| Homeostasis and feedback | W1 p59, p60, p61; W3 p73, p74; W5 p27, p42, p43; W7 p36, p56; W8 p31 | t3, 5 steps | t3, 13 steps |

## The owner's seed list, checked against the slides

| Seed | On the slides? | Where it is now |
| --- | --- | --- |
| ATPase, ion pumps | Yes: "Ca2+-ATPase" once (W11 p37); the Na+/K+ pump twice (W5 p24, W9 p29) | t7 |
| Primary vs secondary active transport | "Primary active transport" yes (W5 p24). **"Secondary active transport", "symport" and "antiport" are not on any slide.** The slides say "coupled transport" (W5 p24) and "countertransport" (W4 p29). | t7, t8 in the slides' words. The existing row `p5_coupled_transport` has a line that says "secondary active transport"; that wording is the row author's, not the slide's. Recorded, not changed. |
| Gradients | Yes | t8 |
| ATP | Yes | t7, t15 |
| Histones, chromatin | Histones yes (W1 p12, in words). Chromatin is in words on p13 only as part of the nucleoplasm label set; p14 is a figure. | new row `p1_histones` (W1 p12); t14 |
| Gametogenesis, oocyte, ovum, follicle, sperm | Yes (W1 p4, p27; W7 p4, p5, p22, p24, p33, p44) | new rows `p1_oocyte`, `p1_sperm`, `p7_primary_oocytes`, `p7_atresia`, `p7_ovum`; t14 |
| Receptors, second messengers | Yes | t12 |
| Enzymes | Yes | new row `p1_mp_enzymes` (W1 p10); t22 |
| Osmosis, tonicity | Osmosis yes. **No tonicity word (isotonic, hypotonic, hypertonic) is on any slide.** | t9 |
| pH, buffers | Yes | t16 |
| Calcium as a signal | Yes | t11 |
| Action potentials across tissues | Yes | t10, and new rows `p2_threshold`, `p2_depolarization`, `p2_repolarization`, `p2_hyperpolarization` (W2 p48) |
| Homeostasis, feedback | Yes | t3, t13 |
| Hormones by gland | Yes (W8 p7, p9, p25, p34, p39, p47, p52) | tables Hormones and Glands and what they secrete |
| Blood, lymph, immune | Yes | t6, t17, table Blood and plasma |
| Gas exchange | Yes | t1 |
| Acid-base | Yes | t16 |
| Renal handling | Yes | t2, t7, t8, t9, table Secretion and excretion |
| Digestion | Yes | t4, t15, t22 |
| Reproduction | Yes | t14, table Glands and what they secrete |

## New rows

All are read off the page they cite and pass `revision-check`'s name-on-page rule:

- W1: Oocyte and Sperm (p4), Enzymes (p10), Histones (p12, p14), DNA (p12, p15), Messenger RNA (mRNA) (p21) and Extracellular fluid (p8).
- W2: Threshold, Depolarization, Repolarization and Hyperpolarization (p48).
- W5: Receptor-mediated endocytosis (p16).
- W7: Primary oocytes (p22), Atresia (p24) and Ovum (p44, p24).

## Tables added

Every row cites one page and carries `ids`:

- Cell parts, then at work later: W1, W4, W5, W7 and W8.
- Tissues met again: W1, W2, W8, W11 and W12.
- Organs in more than one system: W1, W3, W4, W5, W7, W8 and W12.
- Cortex and medulla, three organs: brain W3, kidney W5, adrenal W8.
- Glands and what they secrete: W7 and W8.
- Secretion and excretion: W4, W5, W8 and W12.
- Nerve cells, met twice: W1 and the tissue tutorial, W9 and W11.
- Blood and plasma: W2, W5 and W12.

## Decoder

Decision of 20 October 2026 (owner: "remove rule 1 2 and 3 ... Just fix when wordparts are wrong"): the three tests of
the 19 October note (a name needs a reading; the reading must cover every word; the reading must be right for the
word) are gone, for physiology and anatomy alike. **Every map name that `wordparts.js` gives a reading for is in the
Decoder**, and where a reading is wrong the fix is made in `wordparts.js`.

What was fixed in `wordparts.js`: oxy- (oxygen; sharp, rapid), -gonia added (seed, stem cell), phas/o (speech; a stage),
ster/o (steroid, a four-ring fat-like molecule), para- (beside, near; abnormal), troph/o (nourishment, growth), -plasm
(formed living substance of a cell), -kine (signalling protein), -ose (sugar), -osis and -cytosis (a process, abnormal
only in disease), cycl/o (circle, cycle; ciliary body), papill/o (a garbled meaning). Words that only look like compounds were
put on `NOT_A_TERM` so they get no reading: adenosine, amniotic, antigen(s), natural, pressure(s), recycling,
reproduce, reproduction, reproductive.

The Decoder went from 54 to 166 terms. The reading of each is frozen by `revision-check` as before.

## Coverage rule

The rule is in `work/revision-check.mjs`, function `coverage()`. Its targets are in `work/revision-coverage.mjs`.
It checks four things:

1. Every teaching week with content has at least 4 thread steps and 2 table rows.
2. Every concept above has its own thread, and each box it lists is a step there.
   Also, every box whose name is printed on the slides of two or more lectures is in a step or a row (`ids`), or is on `skipCross` with a reason. The check computes these names from the slide text itself: 272 boxes.
3. Every name with a word-part reading is in the Decoder.
4. The counts per week are printed.

Skips that are no longer needed fail as stale.

`skipCross` holds 8 boxes:

- Cell, Head and Tail: the other lectures use a different word.
- Trachea and Salivary glands: week 1 names them only as tutorial example sites.
- Tongue, Colon and Sigmoid colon: only figure labels on another lecture's slide.

| | Before (old fragments, the same rule) | After |
| --- | --- | --- |
| Threads / steps | 6 / 43 | 22 / 257 |
| Tables / rows | 2 / 29 | 10 / 114 |
| Decoder terms | 51 | 166 |
| Steps / rows / decoder by week | 1:2/0/10 2:2/4/3 3:5/3/0 4:8/5/5 5:5/5/0 7:1/2/5 8:4/6/13 9:4/2/3 11:4/2/2 12:8/0/10 | 1:23/24/10 2:20/9/4 3:23/6/0 4:32/12/5 5:33/12/0 7:23/7/5 8:26/22/14 9:22/7/3 11:32/10/3 12:23/5/10 |
| Thin weeks | W1 W2 W7 W12 | none |
| Cross-named boxes loose | 264 of 272 | 0 (8 skipped with a reason) |
| Decoder names with a reading but not decoded | 3 of 178 | 0 |
| `revision-check` | 5 FAILED | ALL PASS |

"Before" was produced by running the new check with the committed `abct2326-fragments.js` swapped in through a
Node loader hook, with this pass's rows and skip lists in place.

No ★ textbook fact was added. The five existing ones (PDF pages 889, 39, 943, 336 and 830) are unchanged, and
every pre-existing step is kept word for word.

## Words only in slide pictures, so not written

These follow the owner's rule: a figure label teaches nothing unless the lecturer marks it.

- W1 p14: the chromatin and chromosome figure. Histones are taken from the p12 text instead.
- W1 p50: the bone figure (osteon, lacunae). The osteon row cites W11 p65's text.
- W2 p22, p24: heart wall and cardiac muscle figures.
- W2 p68: heart sounds figure.
- W3 p5, p7: airway figures (tongue, cartilage plates).
- W3 p52: the pH range label.
- W4 p61: the large-intestine figure.
- W4 p68: the water-volume figure.
- W7 p8: the spermatozoon figure (head, middle piece, tail). Only its bullet text, "Mature sperm lacks: ER, Golgi, lysosomes", is used.
- W7 p20: the female pelvis figure (sigmoid colon, rectum).
- W7 p27: tertiary follicle.
- W7 p46: polar bodies, morula and the cleavage stages.
- W9 p12: the multipolar neuron figure (Nissl bodies, axon hillock).
- W12 p54: the MHC figure.
- Many W9 pages that are figure-only.

## Things the owner might expect that the slides do not teach

- Secondary active transport, symport and antiport, by those names.
- Tonicity: isotonic, hypotonic and hypertonic.
- Chromatin and chromosome structure beyond "DNA coiled around histones".
- Polar bodies and the stages from zygote to morula; these are only in a figure.
- A tertiary follicle in words.
- Second messengers other than cAMP, IP3, DAG and Ca2+/calmodulin.
- Tyrosine kinase is the only enzyme-linked receptor.
