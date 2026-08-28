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
 * That matters, so it is stated plainly rather than buried: `say` and `plain`
 * below are NOT claims traced to the supplied source files, and the app labels
 * them as app-authored wherever it shows them, under the same rule the memory
 * aids follow. `from` is different -- where a note names the origin of a word,
 * that reading comes from the word-part list (`hss.wordparts`).
 *
 * Stress is marked by the CAPITALISED syllable. These are the anglicised
 * pronunciations used in an English-language anatomy course, not IPA and not a
 * claim about Latin or Greek.
 */

export const TERM_NOTES = {
  /* ---------------- Renal ---------------- */
  glomerulus: { say: 'glo-MER-yoo-luss', plain: 'The little ball of leaky capillaries that blood is filtered through.', from: 'glomerul/o, a small ball' },
  glomerular: { say: 'glo-MER-yoo-lar', plain: 'To do with that ball of filtering capillaries.' },
  nephron: { say: 'NEF-ron', plain: 'One kidney filter unit. You have over a million per kidney.', from: 'nephr/o, kidney' },
  detrusor: { say: 'dee-TROO-zor', plain: 'The muscle in the bladder wall that squeezes urine out.' },
  calyx: { say: 'KAY-liks', plain: 'A cup inside the kidney that catches urine. Several minor ones join into a major one.', from: 'cali/o, calyx' },
  calyces: { say: 'KAL-ih-seez', plain: 'More than one calyx — the cups collecting urine inside the kidney.' },
  vasa: { say: 'VAY-za', plain: 'Latin for vessels. Vasa recta are the straight vessels running down beside the loop of Henle.' },
  juxtaglomerular: { say: 'juks-ta-glo-MER-yoo-lar', plain: 'Sitting right next to the glomerulus.', from: 'juxta-, near + glomerul/o' },
  osmolality: { say: 'oz-mo-LAL-ih-tee', plain: 'How concentrated a fluid is — how much dissolved stuff per kilogram of water.' },
  aldosterone: { say: 'al-DOS-ter-own', plain: 'The hormone that tells the kidney to hold on to sodium, and water with it.' },
  angiotensin: { say: 'an-jee-o-TEN-sin', plain: 'A blood-borne signal that raises blood pressure.', from: 'angi/o, vessel + tens/o, tension' },
  renin: { say: 'REE-nin', plain: 'The kidney enzyme that starts the blood-pressure cascade.', from: 'ren/o, kidney' },

  /* ---------------- Cardiovascular ---------------- */
  atrioventricular: { say: 'ay-tree-o-ven-TRIK-yoo-lar', plain: 'Between an atrium and a ventricle.', from: 'atri/o + ventricul/o' },
  semilunar: { say: 'sem-ee-LOO-nar', plain: 'Half-moon shaped — the shape of the valve cusps at the two ventricle exits.', from: 'semi-, half + lun/o, moon' },
  'chordae tendineae': { say: 'KOR-dee ten-DIN-ee-ee', plain: 'The stringy cords holding the valve flaps down, like the guy-ropes of a tent.' },
  papillary: { say: 'PAP-ih-lair-ee', plain: 'Nipple-shaped. The papillary muscles are the little mounds the valve cords anchor into.', from: 'papill/o, nipple' },
  epicardium: { say: 'ep-ih-KAR-dee-um', plain: 'The outer skin of the heart.', from: 'epi-, upon + cardi/o, heart' },
  myocardium: { say: 'my-o-KAR-dee-um', plain: 'The heart muscle itself — the thick middle layer that does the pumping.', from: 'my/o, muscle + cardi/o, heart' },
  endocardium: { say: 'en-do-KAR-dee-um', plain: 'The smooth lining inside the heart chambers.', from: 'endo-, within + cardi/o, heart' },
  pericardium: { say: 'pair-ih-KAR-dee-um', plain: 'The bag around the heart.', from: 'peri-, around + cardi/o, heart' },
  intercalated: { say: 'in-TER-kal-ay-ted', plain: 'Inserted between. Intercalated discs are the join lines between heart muscle cells.' },
  desmosome: { say: 'DEZ-mo-sohm', plain: 'A rivet holding two cells together so they do not tear apart.', from: 'desm/o, band + som/o, body' },
  sinoatrial: { say: 'sy-no-AY-tree-al', plain: 'In the sinus of the atrium — where the heart’s own pacemaker sits.', from: 'sin/o, sinus + atri/o, atrium' },
  purkinje: { say: 'per-KIN-jee', plain: 'The fast conducting fibres that spread the signal through the ventricles. Named after Jan Purkyně.' },
  haematocrit: { say: 'HEE-mat-o-krit', plain: 'What fraction of your blood is red cells, once you spin it in a tube.', from: 'hemat/o, blood + crit, to separate' },
  fibrinogen: { say: 'fy-BRIN-o-jen', plain: 'The dissolved protein that turns into the mesh of a clot.', from: 'fibrin/o, fibres + -gen, producing' },
  albumin: { say: 'AL-byoo-min', plain: 'The most common blood protein. It holds water inside your vessels.' },
  fenestrated: { say: 'FEN-es-tray-ted', plain: 'Having windows in it — a capillary with pores that let things through quickly.' },
  endothelium: { say: 'en-do-THEE-lee-um', plain: 'The single smooth layer of cells lining the inside of every blood vessel.', from: 'endo-, within + theli/o, nipple/lining' },
  tunica: { say: 'TYOO-nih-ka', plain: 'A coat. Blood vessel walls are three coats: outer, middle, inner.' },
  anastomosis: { say: 'an-ass-toh-MOH-sis', plain: 'A place where two vessels join up, so blood has a second way round.' },

  /* ---------------- Respiratory ---------------- */
  alveolus: { say: 'al-VEE-o-luss', plain: 'One air sac. Gas crosses into blood here.', from: 'alveol/o, alveolus' },
  alveoli: { say: 'al-VEE-o-lye', plain: 'The air sacs, plural — the business end of the lung.' },
  bronchiole: { say: 'BRONK-ee-ohl', plain: 'A small airway, past the point where cartilage rings stop.', from: 'bronchiol/o, bronchiole' },
  pneumocyte: { say: 'NEW-mo-site', plain: 'A lung cell. Type I is thin for gas to cross; type II makes surfactant.', from: 'pneum/o, lung + -cyte, cell' },
  surfactant: { say: 'sur-FAK-tant', plain: 'The soapy film that stops air sacs sticking shut when you breathe out.' },
  larynx: { say: 'LAIR-inks', plain: 'The voice box. It is also the dividing line between the upper and lower airway.', from: 'laryng/o, larynx' },
  pharynx: { say: 'FAIR-inks', plain: 'The throat — the shared passage behind the nose and mouth.', from: 'pharyng/o, throat' },
  glossopharyngeal: { say: 'gloss-o-fair-IN-jee-al', plain: 'The nerve running to the tongue and throat. It carries the carotid body’s reports on your blood.', from: 'gloss/o, tongue + pharyng/o, throat' },
  pneumotaxic: { say: 'new-mo-TAK-sik', plain: 'The pons centre that fine-tunes the breathing rhythm the medulla sets.', from: 'pneum/o, breathing + tax/o, arrangement' },
  apneustic: { say: 'ap-NEW-stik', plain: 'The pons centre that lengthens a breath in.', from: 'a-, without + pne/o, breathing' },
  chemoreceptor: { say: 'KEE-mo-ree-sep-tor', plain: 'A sensor that reads the chemistry of blood or spinal fluid — mostly CO₂ and pH.', from: 'chem/o, chemical + receptor' },
  baroreceptor: { say: 'BAR-o-ree-sep-tor', plain: 'A pressure sensor in an artery wall.', from: 'bar/o, pressure + receptor' },
  ventrolateral: { say: 'ven-tro-LAT-er-al', plain: 'On the front-and-side surface.', from: 'ventr/o, belly side + later/o, side' },

  /* ---------------- Digestive ---------------- */
  mucosa: { say: 'myoo-KOH-za', plain: 'The wet inner lining of the gut tube.', from: 'muc/o, mucus' },
  submucosa: { say: 'sub-myoo-KOH-za', plain: 'The layer of vessels and nerves just under that lining.', from: 'sub-, under + muc/o' },
  muscularis: { say: 'muss-kyoo-LAIR-iss', plain: 'The muscle coat of the gut that squeezes food along.' },
  serosa: { say: 'seer-OH-za', plain: 'The slippery outer wrapping so the gut can slide against its neighbours.' },
  peristalsis: { say: 'pair-ih-STAL-siss', plain: 'The squeezing wave that pushes food along the tube.', from: 'peri-, around + stal/o, contraction' },
  mastication: { say: 'mass-tih-KAY-shun', plain: 'Chewing.' },
  duodenum: { say: 'dew-oh-DEE-num, or dew-ODD-en-um', plain: 'The first stretch of small intestine, just past the stomach.' },

  /* ---------------- Endocrine / cells ---------------- */
  autocrine: { say: 'AW-toh-krin', plain: 'A signal a cell sends to itself.', from: 'auto-, self + crin/o, to secrete' },
  paracrine: { say: 'PAIR-a-krin', plain: 'A signal to the cell next door, without going through blood.', from: 'para-, beside + crin/o, to secrete' },
  neuroendocrine: { say: 'new-ro-EN-do-krin', plain: 'A nerve cell releasing a hormone into the blood.', from: 'neur/o, nerve + endo-, within + crin/o' },
  lipophilic: { say: 'lip-o-FIL-ik', plain: 'Fat-loving, so it slips straight through a cell membrane.', from: 'lip/o, fat + phil/o, attraction' },
  hydrophilic: { say: 'hy-dro-FIL-ik', plain: 'Water-loving, so it cannot cross a membrane and must knock at a surface receptor.', from: 'hydr/o, water + phil/o, attraction' },
  squamous: { say: 'SKWAY-muss', plain: 'Flat and scale-like — the shape of the thinnest lining cells.', from: 'squam/o, scale' },
  avascularity: { say: 'ay-vas-kyoo-LAIR-ih-tee', plain: 'Having no blood vessels of its own.', from: 'a-, without + vascul/o, vessel' },
  homeostasis: { say: 'home-ee-o-STAY-siss', plain: 'Holding the inside of the body steady while the outside changes.', from: 'home/o, same + -stasis, standing still' },

  /* ---------------- Immune ---------------- */
  phagocyte: { say: 'FAG-o-site', plain: 'A cell that eats things — bacteria, debris, dead cells.', from: 'phag/o, eat + -cyte, cell' },
  macrophage: { say: 'MAK-ro-fayj', plain: 'The big eater. Grown from a monocyte that left the blood.', from: 'macro-, large + phag/o, eat' },
  histiocyte: { say: 'HISS-tee-o-site', plain: 'A macrophage that has settled down in one tissue and stays there.', from: 'histi/o, tissue + -cyte, cell' },
  microglia: { say: 'my-KROG-lee-a', plain: 'The brain’s own resident macrophages.', from: 'micro-, small + gli/o, glue' },
  perforin: { say: 'PER-for-in', plain: 'The protein NK cells use to punch holes in a target cell. It perforates.' },
  interferon: { say: 'in-ter-FEER-on', plain: 'A signal that warns neighbouring cells to switch on anti-virus defences. It interferes with the virus copying itself.' },
  complement: { say: 'KOM-pleh-ment', plain: 'A chain of about thirty blood proteins that ends by drilling a hole in a bacterium.' },
  opsonisation: { say: 'op-son-eye-ZAY-shun', plain: 'Coating a germ so phagocytes find it appetising.' },
  lymphoid: { say: 'LIM-foyd', plain: 'Made of, or to do with, lymph tissue.', from: 'lymph/o, lymph + -oid, resembling' },
  cisterna: { say: 'sis-TER-na', plain: 'A reservoir. The cisterna chyli is the sac where lymph from the lower body pools.' },

  /* ---------------- Musculoskeletal ---------------- */
  sarcomere: { say: 'SAR-ko-meer', plain: 'The repeating unit that actually shortens when muscle contracts.', from: 'sarc/o, flesh + -mere, part' },
  sarcoplasmic: { say: 'sar-ko-PLAZ-mik', plain: 'To do with the inside of a muscle cell. Its reticulum stores the calcium that triggers contraction.', from: 'sarc/o, flesh + plasm/o' },
  titin: { say: 'TY-tin', plain: 'A giant springy protein. It is why a stretched muscle recoils.' },
  epiphysis: { say: 'eh-PIF-ih-siss', plain: 'The knobbly end of a long bone.', from: 'epi-, upon + physis, growth' },
  diaphysis: { say: 'dy-AF-ih-siss', plain: 'The shaft down the middle of a long bone.', from: 'dia-, through + physis, growth' },
  metaphysis: { say: 'meh-TAF-ih-siss', plain: 'The flared bit between the shaft and the end, where a bone grew in length.', from: 'meta-, beyond + physis, growth' },
  periosteum: { say: 'pair-ee-OSS-tee-um', plain: 'The living skin on the outside of a bone. It is what hurts when you bark your shin.', from: 'peri-, around + oste/o, bone' },
  supraspinatus: { say: 'soo-pra-spy-NAY-tuss', plain: 'The rotator cuff muscle sitting above the spine of the scapula. It starts the arm lifting.', from: 'supra-, above + spin/o, spine' },
  infraspinatus: { say: 'in-fra-spy-NAY-tuss', plain: 'The rotator cuff muscle below the scapular spine.', from: 'infra-, below + spin/o, spine' },
  subscapularis: { say: 'sub-skap-yoo-LAIR-iss', plain: 'The rotator cuff muscle on the front of the shoulder blade, against the ribs.', from: 'sub-, under + scapul/o, shoulder blade' },
  acetabulum: { say: 'ass-eh-TAB-yoo-lum', plain: 'The hip socket. The word is Latin for a vinegar cup.' },
  olecranon: { say: 'o-LEK-ra-non', plain: 'The point of your elbow.' },
  trochanter: { say: 'tro-KAN-ter', plain: 'The big bump at the top of the femur where hip muscles pull.' },
  tuberosity: { say: 'too-ber-OSS-ih-tee', plain: 'A roughened lump on a bone where a tendon grips.' },
  condyle: { say: 'KON-dyle', plain: 'A rounded knuckle at the end of a bone, made to roll against another.', from: 'condyl/o, knuckle' },
  epicondyle: { say: 'ep-ih-KON-dyle', plain: 'The bump just above a condyle. Muscles anchor there, not the joint.', from: 'epi-, upon + condyl/o, knuckle' },
  foramen: { say: 'for-AY-men', plain: 'A hole in a bone for something to pass through — usually a nerve or a vessel.' },
  symphysis: { say: 'SIM-fih-siss', plain: 'A joint where two bones are held by cartilage and barely move, like the pubic symphysis.', from: 'sym-, together + physis, growth' },
  styloid: { say: 'STY-loyd', plain: 'Shaped like a pen or spike.', from: 'styl/o, pen + -oid, resembling' },
  interosseous: { say: 'in-ter-OSS-ee-uss', plain: 'Between two bones — like the sheet of tissue joining radius and ulna.', from: 'inter-, between + osse/o, bone' },
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
