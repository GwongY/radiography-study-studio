/*
 * Term notes — say it, then mean it.
 *
 * `wordparts.js` handles compounds: it can take glossopharyngeal apart because
 * every piece of it is in the HSS2011 word-part list. That does nothing for a
 * word like `glomerulus`, which is one root and a Latin ending, or `detrusor`,
 * which you simply have to be told. Those are the words that make a page feel
 * unreadable, and the two things that actually help are being able to SAY it and
 * being told in ordinary English WHAT it is before the technical sentence lands.
 *
 * Both of those are written by this app.
 *
 * `say` and `plain` below are NOT claims traced to the supplied source files.
 * They are study scaffolding, the same category as the memory aids; the About
 * panel and the per-item reference view say so. The reading-help dialog itself
 * just shows the help now, without the disclaimer boilerplate. `from` is
 * different -- where a note names the parts a word is built from, that reading
 * comes from the word-part list (`hss.wordparts`). Write it as
 * "Built out of: <parts>"; the dialog prints the string as-is.
 *
 * Stress is marked by the CAPITALISED syllable. These are the anglicised
 * pronunciations used in an English-language anatomy course, not IPA and not a
 * claim about Latin or Greek.
 */

export const TERM_NOTES = {
  /* ---------------- Renal ---------------- */
  glomerulus: { say: 'glo-MER-yoo-luss', plain: 'The little ball of leaky capillaries that blood is filtered through.', from: 'Built out of: glomerul/o, a small ball' },
  glomerular: { say: 'glo-MER-yoo-lar', plain: 'To do with that ball of filtering capillaries.' },
  nephron: { say: 'NEF-ron', plain: 'One kidney filter unit. You have over a million per kidney.', from: 'Built out of: nephr/o, kidney' },
  detrusor: { say: 'dee-TROO-zor', plain: 'The muscle in the bladder wall that squeezes urine out.' },
  calyx: { say: 'KAY-liks', plain: 'A cup inside the kidney that catches urine. Several minor ones join into a major one.', from: 'Built out of: cali/o, calyx' },
  calyces: { say: 'KAL-ih-seez', plain: 'More than one calyx — the cups collecting urine inside the kidney.' },
  vasa: { say: 'VAY-za', plain: 'Latin for vessels. Vasa recta are the straight vessels running down beside the loop of Henle.' },
  juxtaglomerular: { say: 'juks-ta-glo-MER-yoo-lar', plain: 'Sitting right next to the glomerulus.', from: 'Built out of: juxta-, near + glomerul/o' },
  osmolality: { say: 'oz-mo-LAL-ih-tee', plain: 'How concentrated a fluid is — how much dissolved stuff per kilogram of water.' },
  aldosterone: { say: 'al-DOS-ter-own', plain: 'The hormone that tells the kidney to hold on to sodium, and water with it.' },
  angiotensin: { say: 'an-jee-o-TEN-sin', plain: 'A blood-borne signal that raises blood pressure.', from: 'Built out of: angi/o, vessel + tens/o, tension' },
  renin: { say: 'REE-nin', plain: 'The kidney enzyme that starts the blood-pressure cascade.', from: 'Built out of: ren/o, kidney' },
  urogenital: { say: 'yoor-o-JEN-it-al', plain: 'To do with the urinary and reproductive systems together — they share embryonic origins and much of their anatomy.', from: 'Built out of: ur/o, urinary + genit/o, reproduction' },

  /* ---------------- Cardiovascular ---------------- */
  atrioventricular: { say: 'ay-tree-o-ven-TRIK-yoo-lar', plain: 'Between an atrium and a ventricle.', from: 'Built out of: atri/o + ventricul/o' },
  semilunar: { say: 'sem-ee-LOO-nar', plain: 'Half-moon shaped — the shape of the valve cusps at the two ventricle exits.', from: 'Built out of: semi-, half + lun/o, moon' },
  'chordae tendineae': { say: 'KOR-dee ten-DIN-ee-ee', plain: 'The stringy cords holding the valve flaps down, like the guy-ropes of a tent.' },
  papillary: { say: 'PAP-ih-lair-ee', plain: 'Nipple-shaped. The papillary muscles are the little mounds the valve cords anchor into.', from: 'Built out of: papill/o, nipple' },
  epicardium: { say: 'ep-ih-KAR-dee-um', plain: 'The outer skin of the heart.', from: 'Built out of: epi-, upon + cardi/o, heart' },
  myocardium: { say: 'my-o-KAR-dee-um', plain: 'The heart muscle itself — the thick middle layer that does the pumping.', from: 'Built out of: my/o, muscle + cardi/o, heart' },
  endocardium: { say: 'en-do-KAR-dee-um', plain: 'The smooth lining inside the heart chambers.', from: 'Built out of: endo-, within + cardi/o, heart' },
  pericardium: { say: 'pair-ih-KAR-dee-um', plain: 'The bag around the heart.', from: 'Built out of: peri-, around + cardi/o, heart' },
  intercalated: { say: 'in-TER-kal-ay-ted', plain: 'Inserted between. Intercalated discs are the join lines between heart muscle cells.' },
  desmosome: { say: 'DEZ-mo-sohm', plain: 'A rivet holding two cells together so they do not tear apart.', from: 'Built out of: desm/o, band + som/o, body' },
  sinoatrial: { say: 'sy-no-AY-tree-al', plain: 'In the sinus of the atrium — where the heart’s own pacemaker sits.', from: 'Built out of: sin/o, sinus + atri/o, atrium' },
  purkinje: { say: 'per-KIN-jee', plain: 'The fast conducting fibres that spread the signal through the ventricles. Named after Jan Purkyně.' },
  haematocrit: { say: 'HEE-mat-o-krit', plain: 'What fraction of your blood is red cells, once you spin it in a tube.', from: 'Built out of: hemat/o, blood + crit, to separate' },
  fibrinogen: { say: 'fy-BRIN-o-jen', plain: 'The dissolved protein that turns into the mesh of a clot.', from: 'Built out of: fibrin/o, fibres + -gen, producing' },
  albumin: { say: 'AL-byoo-min', plain: 'The most common blood protein. It holds water inside your vessels.' },
  fenestrated: { say: 'FEN-es-tray-ted', plain: 'Having windows in it — a capillary with pores that let things through quickly.' },
  endothelium: { say: 'en-do-THEE-lee-um', plain: 'The single smooth layer of cells lining the inside of every blood vessel.', from: 'Built out of: endo-, within + theli/o, nipple/lining' },
  tunica: { say: 'TYOO-nih-ka', plain: 'A coat. Blood vessel walls are three coats: outer, middle, inner.' },
  anastomosis: { say: 'an-ass-toh-MOH-sis', plain: 'A place where two vessels join up, so blood has a second way round.' },
  biconcave: { say: 'by-KON-kayv', plain: 'Curved inward on both faces, like a red blood cell — the shape that maximises surface area for gas exchange.' },
  megakaryocytes: { say: 'meg-a-KAR-ee-o-sites', plain: 'The giant bone-marrow cells that break apart to shed platelets.', from: 'Built out of: mega-, large + kary/o, nucleus + -cyte, cell' },

  /* ---------------- Respiratory ---------------- */
  alveolus: { say: 'al-VEE-o-luss', plain: 'One air sac. Gas crosses into blood here.', from: 'Built out of: alveol/o, alveolus' },
  alveoli: { say: 'al-VEE-o-lye', plain: 'The air sacs, plural — the business end of the lung.' },
  bronchiole: { say: 'BRONK-ee-ohl', plain: 'A small airway, past the point where cartilage rings stop.', from: 'Built out of: bronchiol/o, bronchiole' },
  pneumocyte: { say: 'NEW-mo-site', plain: 'A lung cell. Type I is thin for gas to cross; type II makes surfactant.', from: 'Built out of: pneum/o, lung + -cyte, cell' },
  surfactant: { say: 'sur-FAK-tant', plain: 'The soapy film that stops air sacs sticking shut when you breathe out.' },
  larynx: { say: 'LAIR-inks', plain: 'The voice box. It is also the dividing line between the upper and lower airway.', from: 'Built out of: laryng/o, larynx' },
  pharynx: { say: 'FAIR-inks', plain: 'The throat — the shared passage behind the nose and mouth.', from: 'Built out of: pharyng/o, throat' },
  oropharynx: { say: 'OR-o-FAIR-inks', plain: 'The middle part of the throat, behind the mouth — between the nasopharynx above and the laryngopharynx below.', from: 'Built out of: or/o, mouth + pharyng/o, throat' },
  glossopharyngeal: { say: 'gloss-o-fair-IN-jee-al', plain: 'The nerve running to the tongue and throat. It carries the carotid body’s reports on your blood.', from: 'Built out of: gloss/o, tongue + pharyng/o, throat' },
  pneumotaxic: { say: 'new-mo-TAK-sik', plain: 'The pons centre that fine-tunes the breathing rhythm the medulla sets.', from: 'Built out of: pneum/o, breathing + tax/o, arrangement' },
  apneustic: { say: 'ap-NEW-stik', plain: 'The pons centre that lengthens a breath in.', from: 'Built out of: a-, without + pne/o, breathing' },
  chemoreceptor: { say: 'KEE-mo-ree-sep-tor', plain: 'A sensor that reads the chemistry of blood or spinal fluid — mostly CO₂ and pH.', from: 'Built out of: chem/o, chemical + receptor' },
  baroreceptor: { say: 'BAR-o-ree-sep-tor', plain: 'A pressure sensor in an artery wall.', from: 'Built out of: bar/o, pressure + receptor' },
  ventrolateral: { say: 'ven-tro-LAT-er-al', plain: 'On the front-and-side surface.', from: 'Built out of: ventr/o, belly side + later/o, side' },

  /* ---------------- Digestive ---------------- */
  mucosa: { say: 'myoo-KOH-za', plain: 'The wet inner lining of the gut tube.', from: 'Built out of: muc/o, mucus' },
  submucosa: { say: 'sub-myoo-KOH-za', plain: 'The layer of vessels and nerves just under that lining.', from: 'Built out of: sub-, under + muc/o' },
  muscularis: { say: 'muss-kyoo-LAIR-iss', plain: 'The muscle coat of the gut that squeezes food along.' },
  serosa: { say: 'seer-OH-za', plain: 'The slippery outer wrapping so the gut can slide against its neighbours.' },
  peristalsis: { say: 'pair-ih-STAL-siss', plain: 'The squeezing wave that pushes food along the tube.', from: 'Built out of: peri-, around + stal/o, contraction' },
  mastication: { say: 'mass-tih-KAY-shun', plain: 'Chewing.' },
  duodenum: { say: 'dew-oh-DEE-num, or dew-ODD-en-um', plain: 'The first stretch of small intestine, just past the stomach.' },
  vermiform: { say: 'VER-mih-form', plain: 'Worm-shaped — the vermiform appendix is the worm-shaped pouch off the first part of the large intestine.' },
  mesenteric: { say: 'mez-en-TER-ik', plain: 'To do with the mesentery — the fan of tissue that slings the intestines from the back wall of the abdomen and carries their blood vessels.', from: 'Built out of: mes/o, middle + enter/o, intestine' },

  /* ---------------- Endocrine / cells ---------------- */
  autocrine: { say: 'AW-toh-krin', plain: 'A signal a cell sends to itself.', from: 'Built out of: auto-, self + crin/o, to secrete' },
  paracrine: { say: 'PAIR-a-krin', plain: 'A signal to the cell next door, without going through blood.', from: 'Built out of: para-, beside + crin/o, to secrete' },
  neuroendocrine: { say: 'new-ro-EN-do-krin', plain: 'A nerve cell releasing a hormone into the blood.', from: 'Built out of: neur/o, nerve + endo-, within + crin/o' },
  lipophilic: { say: 'lip-o-FIL-ik', plain: 'Fat-loving, so it slips straight through a cell membrane.', from: 'Built out of: lip/o, fat + phil/o, attraction' },
  hydrophilic: { say: 'hy-dro-FIL-ik', plain: 'Water-loving, so it cannot cross a membrane and must knock at a surface receptor.', from: 'Built out of: hydr/o, water + phil/o, attraction' },
  squamous: { say: 'SKWAY-muss', plain: 'Flat and scale-like — the shape of the thinnest lining cells.', from: 'Built out of: squam/o, scale' },
  stratified: { say: 'STRAT-ih-fyd', plain: 'Arranged in layers, stacked one on top of another — stratified epithelium is several cells deep.' },
  pseudostratified: { say: 'SOO-doh-STRAT-ih-fyd', plain: 'Looking layered because the cell nuclei sit at different heights, but really one layer deep — every cell still touches the base.' },
  mesothelium: { say: 'mez-o-THEE-lee-um', plain: 'The thin membrane lining the body’s major cavities and covering the organs inside them — the pleura, pericardium and peritoneum are all mesothelium.', from: 'Built out of: mes/o, middle + theli/o, lining' },
  cytoplasm: { say: 'SY-toh-plaz-um', plain: 'Everything inside a cell except the nucleus.', from: 'Built out of: cyto-, cell + -plasm, formation' },
  isoenzyme: { say: 'EYE-so-EN-zime', plain: 'One of several slightly different forms of the same enzyme, letting different tissues run the same reaction at a different rate.' },
  avascularity: { say: 'ay-vas-kyoo-LAIR-ih-tee', plain: 'Having no blood vessels of its own.', from: 'Built out of: a-, without + vascul/o, vessel' },
  homeostasis: { say: 'home-ee-o-STAY-siss', plain: 'Holding the inside of the body steady while the outside changes.', from: 'Built out of: home/o, same + -stasis, standing still' },
  hypoglycaemia: { say: 'HY-po-gly-SEE-mee-a', plain: 'Low blood sugar.', from: 'Built out of: hypo-, deficient + glyc/o, sugar + -emia, blood condition' },

  /* ---------------- Immune ---------------- */
  phagocyte: { say: 'FAG-o-site', plain: 'A cell that eats things — bacteria, debris, dead cells.', from: 'Built out of: phag/o, eat + -cyte, cell' },
  macrophage: { say: 'MAK-ro-fayj', plain: 'The big eater. Grown from a monocyte that left the blood.', from: 'Built out of: macro-, large + phag/o, eat' },
  histiocyte: { say: 'HISS-tee-o-site', plain: 'A macrophage that has settled down in one tissue and stays there.', from: 'Built out of: histi/o, tissue + -cyte, cell' },
  microglia: { say: 'my-KROG-lee-a', plain: 'The brain’s own resident macrophages.', from: 'Built out of: micro-, small + gli/o, glue' },
  perforin: { say: 'PER-for-in', plain: 'The protein NK cells use to punch holes in a target cell. It perforates.' },
  interferon: { say: 'in-ter-FEER-on', plain: 'A signal that warns neighbouring cells to switch on anti-virus defences. It interferes with the virus copying itself.' },
  complement: { say: 'KOM-pleh-ment', plain: 'A chain of about thirty blood proteins that ends by drilling a hole in a bacterium.' },
  properdin: { say: 'proh-PER-din', plain: 'A complement protein (factor P) that stabilises the enzyme which starts the alternative pathway of the complement cascade.' },
  convertase: { say: 'kon-VER-tayss', plain: 'An enzyme that activates the next protein in the complement cascade by splitting it in two — as in C3 convertase.' },
  cytotoxic: { say: 'sy-toh-TOK-sik', plain: 'Directly poisonous to a target cell — what cytotoxic T cells and NK cells do to an infected or cancerous cell.', from: 'Built out of: cyto-, cell + toxic/o, poison' },
  costimulation: { say: 'ko-stim-yoo-LAY-shun', plain: 'A second signal a cell needs, alongside the first, before it will actually respond — a safety check against attacking healthy tissue.' },
  lymphotoxin: { say: 'lim-fo-TOK-sin', plain: 'A cell-killing protein released by an activated cytotoxic cell onto its target.', from: 'Built out of: lymph/o, lymph + toxic/o, poison' },
  reticuloendothelial: { say: 'reh-tik-yoo-lo-en-doh-THEE-lee-al', plain: 'The old name for the body’s scattered network of phagocytic cells — monocytes and the macrophages they grow into — now usually called the mononuclear phagocyte system.', from: 'Built out of: reticul/o, network + endo-, within + theli/o, lining' },
  opsonisation: { say: 'op-son-eye-ZAY-shun', plain: 'Coating a germ so phagocytes find it appetising.' },
  lymphoid: { say: 'LIM-foyd', plain: 'Made of, or to do with, lymph tissue.', from: 'Built out of: lymph/o, lymph + -oid, resembling' },
  cisterna: { say: 'sis-TER-na', plain: 'A reservoir. The cisterna chyli is the sac where lymph from the lower body pools.' },

  /* ---------------- Musculoskeletal ---------------- */
  sarcomere: { say: 'SAR-ko-meer', plain: 'The repeating unit that actually shortens when muscle contracts.', from: 'Built out of: sarc/o, flesh + -mere, part' },
  sarcoplasmic: { say: 'sar-ko-PLAZ-mik', plain: 'To do with the inside of a muscle cell. Its reticulum stores the calcium that triggers contraction.', from: 'Built out of: sarc/o, flesh + plasm/o' },
  sarcolemma: { say: 'sar-ko-LEM-a', plain: 'The cell membrane of a muscle fibre.', from: 'Built out of: sarc/o, flesh + -lemma, husk' },
  reticulum: { say: 'reh-TIK-yoo-lum', plain: 'A network of tubes inside a cell; the sarcoplasmic reticulum stores the calcium that triggers a muscle contraction.', from: 'Built out of: reticul/o, network' },
  myofibril: { say: 'my-o-FY-bril', plain: 'One of the many rod-like strands packed inside a muscle fibre; each is banded with sarcomeres.', from: 'Built out of: my/o, muscle + fibr/o, fibre' },
  myoglobin: { say: 'my-o-GLOH-bin', plain: 'The oxygen-storing protein inside muscle cells, cousin to haemoglobin.', from: 'Built out of: my/o, muscle + -globin, protein substance' },
  myosin: { say: 'MY-o-sin', plain: 'The motor protein of the thick filament; its head pulls on actin to shorten a sarcomere.', from: 'Built out of: my/o, muscle' },
  tropomyosin: { say: 'tro-po-MY-o-sin', plain: 'The thread-like protein that blocks the myosin-binding site on actin until calcium moves it aside.', from: 'Built out of: trop/o, turning + my/o, muscle' },
  troponin: { say: 'TRO-po-nin', plain: 'The regulatory protein on actin that calcium binds to, swinging tropomyosin aside so the myosin head can attach.' },
  phosphocreatine: { say: 'fos-fo-KREE-a-teen', plain: 'A stored high-energy phosphate that regenerates ATP within seconds, for the shortest, most explosive efforts.' },
  extrafusal: { say: 'eks-tra-FEW-zal', plain: 'The ordinary, force-producing muscle fibres outside a muscle spindle’s capsule.', from: 'Built out of: extra-, outside + fus/o, spindle' },
  intrafusal: { say: 'in-tra-FEW-zal', plain: 'The small sensory muscle fibres inside a muscle spindle’s capsule, which detect stretch rather than produce force.', from: 'Built out of: intra-, within + fus/o, spindle' },
  popliteus: { say: 'pop-LIT-ee-us', plain: 'The small muscle behind the knee that unlocks it from full extension so the leg can bend.', from: 'Built out of: poplite/o, back of the knee' },
  apophyseal: { say: 'ap-o-FIZ-ee-al', plain: 'To do with an apophysis, a bony outgrowth — the apophyseal (facet) joints are the small gliding joints between vertebrae.' },
  titin: { say: 'TY-tin', plain: 'A giant springy protein. It is why a stretched muscle recoils.' },
  epiphysis: { say: 'eh-PIF-ih-siss', plain: 'The knobbly end of a long bone.', from: 'Built out of: epi-, upon + physis, growth' },
  diaphysis: { say: 'dy-AF-ih-siss', plain: 'The shaft down the middle of a long bone.', from: 'Built out of: dia-, through + physis, growth' },
  metaphysis: { say: 'meh-TAF-ih-siss', plain: 'The flared bit between the shaft and the end, where a bone grew in length.', from: 'Built out of: meta-, beyond + physis, growth' },
  periosteum: { say: 'pair-ee-OSS-tee-um', plain: 'The living skin on the outside of a bone. It is what hurts when you bark your shin.', from: 'Built out of: peri-, around + oste/o, bone' },
  supraspinatus: { say: 'soo-pra-spy-NAY-tuss', plain: 'The rotator cuff muscle sitting above the spine of the scapula. It starts the arm lifting.', from: 'Built out of: supra-, above + spin/o, spine' },
  infraspinatus: { say: 'in-fra-spy-NAY-tuss', plain: 'The rotator cuff muscle below the scapular spine.', from: 'Built out of: infra-, below + spin/o, spine' },
  subscapularis: { say: 'sub-skap-yoo-LAIR-iss', plain: 'The rotator cuff muscle on the front of the shoulder blade, against the ribs.', from: 'Built out of: sub-, under + scapul/o, shoulder blade' },
  acetabulum: { say: 'ass-eh-TAB-yoo-lum', plain: 'The hip socket. The word is Latin for a vinegar cup.' },
  olecranon: { say: 'o-LEK-ra-non', plain: 'The point of your elbow.' },
  trochanter: { say: 'tro-KAN-ter', plain: 'The big bump at the top of the femur where hip muscles pull.' },
  tuberosity: { say: 'too-ber-OSS-ih-tee', plain: 'A roughened lump on a bone where a tendon grips.' },
  condyle: { say: 'KON-dyle', plain: 'A rounded knuckle at the end of a bone, made to roll against another.', from: 'Built out of: condyl/o, knuckle' },
  epicondyle: { say: 'ep-ih-KON-dyle', plain: 'The bump just above a condyle. Muscles anchor there, not the joint.', from: 'Built out of: epi-, upon + condyl/o, knuckle' },
  foramen: { say: 'for-AY-men', plain: 'A hole in a bone for something to pass through — usually a nerve or a vessel.' },
  symphysis: { say: 'SIM-fih-siss', plain: 'A joint where two bones are held by cartilage and barely move, like the pubic symphysis.', from: 'Built out of: sym-, together + physis, growth' },
  styloid: { say: 'STY-loyd', plain: 'Shaped like a pen or spike.', from: 'Built out of: styl/o, pen + -oid, resembling' },
  interosseous: { say: 'in-ter-OSS-ee-uss', plain: 'Between two bones — like the sheet of tissue joining radius and ulna.', from: 'Built out of: inter-, between + osse/o, bone' },

  /* ---------------- Terminology: cavities and regions ---------------- */
  cavity: { say: 'KAV-ih-tee', plain: 'A hollow space inside the body that holds organs.' },
  thoracic: { say: 'thor-ASS-ik', plain: 'To do with the thorax, the chest — the part of the trunk inside the rib cage.', from: 'Built out of: thorac/o, chest' },
  pericardial: { say: 'pair-ih-KAR-dee-al', plain: 'To do with the pericardium — the bag around the heart.', from: 'Built out of: peri-, around + cardi/o, heart' },
  pleural: { say: 'PLOOR-al', plain: 'To do with the pleura — the wet two-layer wrap around each lung.', from: 'Built out of: pleur/o, the pleura' },
  abdominal: { say: 'ab-DOM-in-al', plain: 'To do with the abdomen, the part of the trunk below the diaphragm.', from: 'Built out of: abdomin/o, abdomen' },
  pelvic: { say: 'PEL-vik', plain: 'To do with the pelvis — the basin of bone at the base of the trunk.', from: 'Built out of: pelv/i, pelvis' },
  peritoneal: { say: 'pair-ih-toh-NEE-al', plain: 'To do with the peritoneum — the slippery lining of the abdominal cavity.', from: 'Built out of: peritone/o, peritoneum' },
  interstitial: { say: 'in-ter-STISH-al', plain: 'In the spaces between cells or tissues — not inside a vessel or inside a cell.', from: 'Built out of: interstit/o, space between' },
  oral: { say: 'OR-al', plain: 'To do with the mouth.' },
  scrotal: { say: 'SKROH-tal', plain: 'To do with the scrotum, the pouch that holds the testes.', from: 'Built out of: scrot/o, scrotum' },
  lumbar: { say: 'LUM-bar', plain: 'To do with the loins — the lower back on each side.', from: 'Built out of: lumb/o, lower back' },
  inguinal: { say: 'ING-gwin-al', plain: 'To do with the groin.', from: 'Built out of: inguin/o, groin' },

  /* ---------------- Nervous system ---------------- */
  neuron: { say: 'NOO-ron', plain: 'A nerve cell — the basic unit of the nervous system.', from: 'Built out of: neur/o, nerve' },
  innervation: { say: 'in-er-VAY-shun', plain: 'The nerve supply to a muscle or organ — which nerve controls it, and how densely.', from: 'Built out of: in-, into + nerv/o, nerve' },
  extrapyramidal: { say: 'eks-tra-pi-RAM-ih-dal', plain: 'The motor tracts outside the pyramidal (corticospinal) system — they coordinate and fine-tune movement rather than command it directly.', from: 'Built out of: extra-, outside + pyramid, pyramid-shaped' },
  commissural: { say: 'kom-ih-SHOOR-al', plain: 'To do with a commissure — a tract of fibres joining the two halves of the brain, like the corpus callosum.', from: 'Built out of: commissur/o, connection' },
  astrocytes: { say: 'AS-tro-sites', plain: 'Star-shaped support cells in the brain and spinal cord; they help form the blood–brain barrier.', from: 'Built out of: astr/o, star + -cyte, cell' },
  acetylcholinesterase: { say: 'a-see-til-KOH-lin-ESS-ter-ays', plain: 'The enzyme at the neuromuscular junction that breaks acetylcholine down, ending the signal.' },
  calmodulin: { say: 'kal-MOD-yoo-lin', plain: 'The calcium-binding protein that switches on a cell’s response once calcium rushes in.' },
  noradrenaline: { say: 'nor-a-DREN-a-lin', plain: 'The neurotransmitter (and hormone) that raises alertness and arousal; also called norepinephrine.' },
  downregulation: { say: 'down-reg-yoo-LAY-shun', plain: 'A cell reducing the number of receptors it displays, to turn down its own sensitivity to a signal.' },
  upregulation: { say: 'up-reg-yoo-LAY-shun', plain: 'A cell increasing the number of receptors it displays, to turn up its own sensitivity to a signal.' },
  dendrite: { say: 'DEN-dryt', plain: 'The branching part of a neuron that receives signals.', from: 'Built out of: dendro, tree' },
  axon: { say: 'AK-son', plain: 'The long extension of a neuron that sends signals away.', from: 'Built out of: axo, axis' },
  synapse: { say: 'SIN-aps', plain: 'The gap between two neurons where signals jump across.', from: 'Built out of: syn-, together + haptein, to fasten' },
  myelin: { say: 'MY-eh-lin', plain: 'The fatty insulation around nerve fibres that speeds up signal conduction.' },
  pons: { say: 'ponz', plain: 'The bridge on the brainstem that connects the two halves.' },
  medulla: { say: 'meh-DUL-ah', plain: 'The very top of the spinal cord where vital centres sit.' },
  cortex: { say: 'KOR-teks', plain: 'The outer layer of the brain where all the higher thinking happens.', from: 'Built out of: cortic/o, cortex' },
  meninges: { say: 'meh-NIN-jeez', plain: 'The three-layer wrapping around the brain and spinal cord.', from: 'Built out of: meninx, membrane' },
  cerebrospinal: { say: 'seh-ree-bro-SPY-nal', plain: 'To do with the brain and spinal cord together.', from: 'Built out of: cerebr/o + spin/al' },
  ganglion: { say: 'GANG-glee-on', plain: 'A collection of nerve cell bodies outside the brain.', from: 'Built out of: ganglion, knot' },
  neurotransmitter: { say: 'new-ro-trans-MIT-er', plain: 'A chemical that carries a signal across a synapse.', from: 'Built out of: neur/o + transmitter' },
  hemisphere: { say: 'hem-ih-sfeer', plain: 'Half the brain — left or right.', from: 'Built out of: hemisphere' },
  ventricle: { say: 'VEN-trih-kul', plain: 'A fluid-filled space in the brain.', from: 'Built out of: ventricul/o, ventricle' },
  gyrus: { say: 'GY-russ', plain: 'A fold on the brain surface.', from: 'Built out of: gyr/o, circle' },
  sulcus: { say: 'SUL-kuss', plain: 'A groove on the brain surface.', from: 'Built out of: sulcus, furrow' },
  occipital: { say: 'ok-SIP-it-al', plain: 'At the back of the head — the occipital lobe handles vision.', from: 'Built out of: occiput, back of head' },
  parietal: { say: 'pa-RY-e-tal', plain: 'On the side — the parietal lobe handles touch and space.', from: 'Built out of: pariet/o, side' },
  temporal: { say: 'TEM-po-ral', plain: 'Near the temples — the temporal lobe handles hearing and memory.', from: 'Built out of: temporal, time' },
  frontal: { say: 'FRON-tal', plain: 'At the front — the frontal lobe handles thinking and planning.', from: 'Built out of: front, front' },
  basal: { say: 'BAY-sal', plain: 'At the base — the basal ganglia are deep brain clusters.' },
  thalamus: { say: 'THAL-ah-muss', plain: 'The brain relay station that sends signals to the cortex.', from: 'Built out of: thalamus, inner chamber' },
  hypothalamus: { say: 'hye-po-THAL-ah-muss', plain: 'Below the thalamus — controls basic drives like hunger and temperature.', from: 'Built out of: hypo-, under + thalamus' },
  cerebellum: { say: 'ser-eh-BELL-um', plain: 'The little brain at the back that coordinates movement.', from: 'Built out of: cerebellum, little brain' },
  brainstem: { say: 'BRAYN-stem', plain: 'The stalk connecting the brain to the spinal cord — controls vital functions.', from: 'Built out of: brain + stem' },
  reflex: { say: 'REF-leks', plain: 'An automatic response that bypasses conscious thought.', from: 'Built out of: reflect, to bend back' },
  afferent: { say: 'AF-er-ent', plain: 'Carrying signals toward the brain or spinal cord.', from: 'Built out of: ad-, to + ferens, carrying' },
  efferent: { say: 'EF-er-ent', plain: 'Carrying signals away from the brain or spinal cord.', from: 'Built out of: e-, out + ferens, carrying' },

  /* ---------------- Integumentary ---------------- */
  epidermis: { say: 'ep-ih-DER-miss', plain: 'The outer layer of skin.', from: 'Built out of: epi-, upon + derm/o, skin' },
  dermis: { say: 'DER-miss', plain: 'The inner layer of skin with blood vessels and nerves.', from: 'Built out of: derm/o, skin' },
  hypodermis: { say: 'hye-po-DER-miss', plain: 'The fatty layer below the skin.', from: 'Built out of: hypo-, under + derm/o, skin' },
  keratin: { say: 'KER-ah-tin', plain: 'The tough protein that makes up skin, hair and nails.', from: 'Built out of: kerat/o, hard' },
  melanin: { say: 'MEL-ah-nin', plain: 'The pigment that gives skin its colour.', from: 'Built out of: melan/o, black' },
  sweat: { say: 'swet', plain: 'The salty fluid produced by sweat glands to cool the body.' },
  sebaceous: { say: 'si-BAY-shuss', plain: 'To do with oil glands.', from: 'Built out of: sebum, oil' },
  eccrine: { say: 'EK-rin', plain: 'The sweat glands all over your body that make watery sweat.', from: 'Built out of: ekkrine, separate' },
  apocrine: { say: 'AP-o-kreen', plain: 'The sweat glands in armpits that make thicker sweat.', from: 'Built out of: apocrine, separate' },
  subcutaneous: { say: 'sub-kyoo-TAY-nee-us', plain: 'Under the skin.', from: 'Built out of: sub-, under + cutaneous, skin' },
  blister: { say: 'BLIS-ter', plain: 'A pocket of fluid under the skin caused by friction.' },
  callus: { say: 'KAL-uss', plain: 'A thickened patch of skin from repeated pressure.' },

  /* ---------------- Special senses ---------------- */
  retina: { say: 'RET-in-ah', plain: 'The light-sensitive layer at the back of the eye.', from: 'Built out of: retina, net' },
  pupil: { say: 'PYOO-pul', plain: 'The black hole in the centre of the iris that lets light in.' },
  iris: { say: 'YE-riss', plain: 'The coloured part of the eye that controls pupil size.', from: 'Built out of: iris, rainbow' },
  lens: { say: 'lenz', plain: 'The clear structure that focuses light onto the retina.' },
  cornea: { say: 'KOR-nee-ah', plain: 'The clear front window of the eye.', from: 'Built out of: cornea, horn-like' },
  optic: { say: 'OP-tik', plain: 'To do with sight.', from: 'Built out of: optikos, visible' },
  cochlea: { say: 'KOK-lee-ah', plain: 'The snail-shaped part of the inner ear that hears sound.', from: 'Built out of: cochlea, snail' },
  tympanic: { say: 'tim-PAN-ik', plain: 'To do with the eardrum.', from: 'Built out of: tympanum, drum' },
  vestibular: { say: 'ves-TIB-yoo-lar', plain: 'To do with balance.', from: 'Built out of: vestibule, entrance' },
  semicircular: { say: 'sem-ee-SIR-kyoo-lar', plain: 'Half-circle — the three canals in the ear that sense rotation.', from: 'Built out of: semi-, half + circular' },
  olfactory: { say: 'ol-FAK-tor-ee', plain: 'To do with smell.', from: 'Built out of: olfact/o, smell' },
  gustatory: { say: 'GUS-ta-tor-ee', plain: 'To do with taste.', from: 'Built out of: gust/o, taste' },
  auditory: { say: 'AW-dih-tor-ee', plain: 'To do with hearing.', from: 'Built out of: audit/o, hearing' },
  visual: { say: 'VI-zhoo-al', plain: 'To do with sight.', from: 'Built out of: vis/o, vision' },
  conjunctiva: { say: 'kon-junk-TY-vah', plain: 'The thin membrane covering the front of the eye and inside the eyelids.', from: 'Built out of: con-, together + junct, join' },
  lacrimal: { say: 'LAK-rih-mal', plain: 'To do with tears.', from: 'Built out of: lacrima, tear' },
  photoreceptor: { say: 'fo-to-ree-SEP-tor', plain: 'A cell that detects light.', from: 'Built out of: photo-, light + receptor' },
  stereocilia: { say: 'ster-ee-OH-sih-lee-ah', plain: 'Tiny hair-like structures in the inner ear that bend with sound waves.', from: 'Built out of: stereo-, solid + cilia, hairs' },
  mechanoreceptor: { say: 'mek-ah-no-ree-SEP-tor', plain: 'A cell that detects mechanical force like pressure or stretch.', from: 'Built out of: mechan/o, machine + receptor' },
  chemoreceptor: { say: 'kee-mo-ree-SEP-tor', plain: 'A cell that detects chemicals.', from: 'Built out of: chem/o, chemical + receptor' },
  nociceptor: { say: 'no-se-SEP-tor', plain: 'A pain receptor.', from: 'Built out of: nocicept/o, pain + receptor' },
  proprioceptor: { say: 'pro-pree-o-SEP-tor', plain: 'A receptor that senses body position.', from: 'Built out of: proprio-, one\'s own + receptor' },

  /* ---------------- Say-it only: hard words the glossary already defines ----------------
     These carry the pronunciation only. The meaning and the Chinese come from
     term-gloss.js, so no `plain` here -- adding one would hide the paired line. */
  /* Bones and joints */
  synovial: { say: 'sih-NOH-vee-al', from: 'Built out of: synovi/o, synovium' },
  coccyx: { say: 'KOK-siks', from: 'Built out of: coccyg/o, tailbone' },
  coccygeal: { say: 'kok-SIJ-ee-al', from: 'Built out of: coccyg/o, tailbone' },
  scaphoid: { say: 'SKAF-oyd' },
  calcaneus: { say: 'kal-KAY-nee-us', from: 'Built out of: calcane/o, heel bone' },
  trapezium: { say: 'tra-PEE-zee-um' },
  trapezius: { say: 'tra-PEE-zee-us' },
  ischium: { say: 'ISS-kee-um', from: 'Built out of: ischi/o, ischium' },
  triquetrum: { say: 'try-KWEE-trum' },
  manubrium: { say: 'ma-NOO-bree-um' },
  pisiform: { say: 'PY-sih-form' },
  capitate: { say: 'KAP-ih-tayt', from: 'Built out of: capit/o, head' },
  hamate: { say: 'HAM-ayt' },
  coracoid: { say: 'KOR-a-koyd' },
  xiphoid: { say: 'ZIF-oyd', from: 'Built out of: xiph/i, xiphoid (sword-shaped)' },
  acromion: { say: 'a-KROH-mee-on' },
  diaphragm: { say: 'DY-a-fram' },
  promontory: { say: 'PROM-on-tor-ee' },
  cancellous: { say: 'KAN-sel-uss' },
  trabeculae: { say: 'tra-BEK-yoo-lee', from: 'Built out of: trabecul/o, little beam' },
  zygomatic: { say: 'zy-go-MAT-ik', from: 'Built out of: zygomat/o, cheekbone' },
  sphenoid: { say: 'SFEE-noyd' },
  ethmoid: { say: 'ETH-moyd' },
  sternoclavicular: { say: 'ster-no-kla-VIK-yoo-lar', from: 'Built out of: stern/o, breastbone + clavicul/o, collarbone' },
  acromioclavicular: { say: 'a-kroh-mee-o-kla-VIK-yoo-lar', from: 'Built out of: acromion + clavicul/o, collarbone' },
  cuneiform: { say: 'KYOO-nee-form' },
  cuneiforms: { say: 'KYOO-nee-formz' },
  glenohumeral: { say: 'glee-no-HYOO-mer-al', from: 'Built out of: humer/o, upper-arm bone' },
  hyaline: { say: 'HY-a-lin' },
  synchondrosis: { say: 'sin-kon-DROH-sis', from: 'Built out of: syn-, together + chondr/o, cartilage + -osis, condition' },
  syndesmosis: { say: 'sin-dez-MOH-sis', from: 'Built out of: syndesm/o, ligament + -osis, condition' },
  diarthrosis: { say: 'dy-ar-THROH-sis', from: 'Built out of: arthr/o, joint + -osis, condition' },
  gomphosis: { say: 'gom-FOH-sis' },
  gomphoses: { say: 'gom-FOH-seez' },
  temporomandibular: { say: 'tem-po-ro-man-DIB-yoo-lar', from: 'Built out of: tempor/o, temple + mandibul/o, lower jaw' },
  /* Muscles */
  pectoralis: { say: 'pek-tor-AL-iss', from: 'Built out of: pector/o, chest' },
  latissimus: { say: 'la-TISS-ih-muss' },
  gastrocnemius: { say: 'gas-trok-NEE-mee-uss' },
  quadratus: { say: 'kwod-RAY-tuss' },
  brachii: { say: 'BRAY-kee-eye', from: 'Built out of: brachi/o, arm' },
  /* Cardiovascular and respiratory */
  oesophagus: { say: 'ee-SOF-a-guss', from: 'Built out of: esophag/o, esophagus' },
  oesophageal: { say: 'ee-so-FAY-jee-al', from: 'Built out of: esophag/o, esophagus' },
  haemoglobin: { say: 'HEE-mo-gloh-bin', from: 'Built out of: hem/o, blood + -globin, protein' },
  oxyhaemoglobin: { say: 'ok-see-HEE-mo-gloh-bin', from: 'Built out of: hem/o, blood + -globin, protein' },
  mediastinum: { say: 'mee-dee-a-STY-num', from: 'Built out of: mediastin/o, mediastinum' },
  arteriole: { say: 'ar-TEER-ee-ohl', from: 'Built out of: arteriol/o, arteriole' },
  arterioles: { say: 'ar-TEER-ee-ohlz', from: 'Built out of: arteriol/o, arteriole' },
  depolarisation: { say: 'dee-poh-lar-eye-ZAY-shun' },
  repolarisation: { say: 'ree-poh-lar-eye-ZAY-shun' },
  refractory: { say: 'ree-FRAK-tor-ee' },
  prepotential: { say: 'pree-po-TEN-shal', from: 'Built out of: pre-, before + potential' },
  /* Digestive */
  jejunum: { say: 'jeh-JOO-num' },
  pylorus: { say: 'py-LOR-uss' },
  duodenojejunal: { say: 'dew-oh-dee-no-jeh-JOO-nal', from: 'Built out of: duoden/o, duodenum + jejun/o, jejunum' },
  transpyloric: { say: 'tranz-py-LOR-ik', from: 'Built out of: trans-, across + pylor/o, pylorus' },
  parotid: { say: 'pa-ROT-id' },
  teniae: { say: 'TEE-nee-ee' },
  /* Nervous system */
  oblongata: { say: 'ob-long-GAH-ta' },
  convoluted: { say: 'KON-vo-loo-ted' },
  hippocampus: { say: 'hip-o-KAM-puss' },
  amygdala: { say: 'a-MIG-da-la' },
  subarachnoid: { say: 'sub-a-RAK-noyd', from: 'Built out of: sub-, under + arachnoid' },
  arachnoid: { say: 'a-RAK-noyd' },
  oligodendrocytes: { say: 'ol-ih-go-DEN-dro-sites', from: 'Built out of: olig/o, few + dendr/o, branches + -cyte, cell' },
  diencephalon: { say: 'dy-en-SEF-a-lon', from: 'Built out of: encephal/o, brain' },
  cerebelli: { say: 'seh-reh-BEL-eye', from: 'Built out of: cerebell/o, cerebellum' },
  schwann: { say: 'shvahn' },
  trigeminal: { say: 'try-JEM-in-al', from: 'Built out of: tri-, three (branches)' },
  abducens: { say: 'ab-DYOO-senz' },
  vestibulocochlear: { say: 'ves-tib-yoo-lo-KOK-lee-ar', from: 'Built out of: vestibul/o, vestibule + cochle/o, cochlea' },
  /* Radiation science */
  technetium: { say: 'tek-NEE-shee-um' },
  dosimetrist: { say: 'do-SIM-eh-trist' },
  dosimetrists: { say: 'do-SIM-eh-trists' },
  sievert: { say: 'SEE-vert' },
  roentgen: { say: 'RENT-gen' },
  cyclotron: { say: 'SY-klo-tron' },
  positron: { say: 'POZ-ih-tron' },
};

/* Every note is keyed lower case; plurals and adjectives fall back to the stem. */
const KEYS = Object.keys(TERM_NOTES);

export function termNote(word) {
  const w = String(word || '').toLowerCase().replace(/[^a-z ]/g, '');
  if (TERM_NOTES[w]) return { key: w, ...TERM_NOTES[w] };
  /* alveoli -> alveolus, macrophages -> macrophage, valves -> valve */
  for (const [from, to] of [[/i$/, 'us'], [/ae$/, 'a'], [/es$/, 'e'], [/s$/, ''], [/al$/, ''], [/ic$/, '']]) {
    const alt = w.replace(from, to);
    if (alt !== w && TERM_NOTES[alt]) return { key: alt, ...TERM_NOTES[alt] };
  }
  return null;
}

export function hasNote(word) { return !!termNote(word); }
export const TERM_COUNT = KEYS.length;
