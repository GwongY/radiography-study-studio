// SP3 Week 12 — rewrite the five urogenital items, add the NEW nephron item,
// and wire the new id into WEEK_STUDY.HSS2011[12].
// Run: node work/.sp3-w12-build.mjs
import fs from 'fs';

const FILE = 'outputs/study/corpus/hss-modules.js';
const MARK = 'export const HSS_MODULES = ';
const txt = fs.readFileSync(FILE, 'utf8');
const head = txt.slice(0, txt.indexOf(MARK));
const arr = JSON.parse(txt.slice(txt.indexOf(MARK) + MARK.length).replace(/;\s*$/, ''));

const items = [

/* ---------------------------------------------------------------- W12-1 */
{
id: 'hss2011-m3-urogenital-pelvis',
subject: 'HSS2011', unit: 'hss.m3', type: 'concept',
title: 'Regional anatomy of the abdomen and pelvis: quadrants, regions, walls, hiatuses, pelvic floor and perineum',
tags: ['urogenital','pelvis','regional-anatomy','high-yield'],
visuals: [
  { fig: 'abdominalQuadrantsRegions' },
  { fig: 'thoracicDiaphragm' },
  { fig: 'maleFemalePelvis' },
  { gen: true }
],
lesson: {
explanation: `QUADRANTS AND REGIONS. The abdominopelvic cavity is mapped for description and examination in two ways. Four abdominopelvic quadrants — right upper (RUQ), left upper (LUQ), right lower (RLQ) and left lower (LLQ) — are formed by two perpendicular lines intersecting at the navel. The finer grid is nine abdominopelvic regions: three down the midline (epigastric, umbilical, hypogastric/pubic — the recurring blank) and two columns of three either side (right/left hypochondriac, lumbar and inguinal), separated by the two mid-clavicular lines and by two horizontal planes — the transpyloric plane at L1 and the transtubercular plane at L5. The umbilicus itself sits at vertebral level L3.

EXAMINATION LANDMARKS. Three surface markings are examined clinically: the gallbladder at about the midclavicular line crossing the costal margin (the Murphy sign point); the caecum and appendix at McBurney's point, one-third of the way from the anterior superior iliac spine to the umbilicus; and the femoral artery at the midpoint of the line from ASIS to the pubic tubercle.

WALLS OF THE CAVITY. The abdomen is bounded by the anterolateral abdominal wall — external oblique, internal oblique, transversus abdominis, and rectus abdominis in the midline within its rectus sheath, the paired muscles separated by the linea alba and crossed by tendinous intersections — and by the posterior abdominal wall, formed mainly by the psoas major and quadratus lumborum muscles (the tested FIB), with erector spinae behind them. Psoas major joins iliacus as iliopsoas, crossing the inguinal ligament to insert on the lesser trochanter of the femur as the powerful flexor of the thigh at the hip. The diaphragm domes up as the roof: the abdominal inlet. Its three openings — the tested 3.3 material — are the caval hiatus at T8 in the central tendon (IVC, right phrenic nerve), the oesophageal hiatus at T10 (oesophagus and vagus nerves — the Module 3.3 fill-in-the-blank answers T10 and 'posterior'), and the aortic hiatus at T12 between the crura (aorta, azygos vein, thoracic duct).

PELVIS. The pelvic inlet (brim) is the plane from the sacral promontory along the pelvic brim to the superior margin of the pubic symphysis; the pelvic outlet runs from the tip of the coccyx to the inferior margin of the pubic symphysis. The floor is the pelvic diaphragm — levator ani plus coccygeus. The perineum below is the diamond-shaped region bounded by the pubic symphysis, the ischial tuberosities and the coccyx, divided into an anterior urogenital triangle and a posterior anal triangle; at its centre is the perineal body, a fibromuscular node (central tendon of the pelvic diaphragm) between the anus and the vaginal opening in the female or the posterior scrotal skin in the male — if it is damaged, pelvic diaphragm efficiency fails, giving incontinence and prolapse of pelvic organs. The female bony pelvis is broader and smoother with an oval inlet and a pubic angle of 100° or more; the male is heavier and narrower, heart-shaped inlet, pubic angle under 90°, sacrum longer with more pronounced curvature, sacrococcygeal joint fused where the female's is flexible.

VESSELS OF THE REGION. The abdominal aorta begins at T12 and ends at L4, dividing into the two common iliac arteries; the IVC begins at L5 (common iliac union) and terminates at T8, piercing the caval hiatus. Pelvic organs drain to internal iliac veins, the lower limbs to external iliac veins; the right gonadal vein drains directly into the IVC but the left gonadal vein drains into the left renal vein — hence the left-sided predilection of varicocele — and malignancies may spread via the vertebral venous plexus to the vertebral column. Two clinical keys from the More-exercises sheet close the map: the three potential sites of obstruction by ureteric stones are the ureteropelvic junction, where the ureter crosses the external iliac vessels and/or pelvic brim, and where the ureter enters the urinary bladder wall; and a broken left 10th rib can damage the left kidney and the spleen, which sit behind it.`,
plain: `Map the abdomen: four quadrants crossing at the navel, or nine regions between the mid-clavicular lines and the L1 (transpyloric) and L5 (transtubercular) planes — midline top-to-bottom is epigastric, umbilical, hypogastric. Exam landmarks: gallbladder under the right costal margin at the mid-clavicular line, appendix at McBurney's point (1/3 ASIS→umbilicus), femoral artery midway ASIS→pubic tubercle. Walls: four anterolateral muscles; posterior wall = psoas + quadratus lumborum (+ erector spinae). Diaphragm holes: IVC at T8, oesophagus at T10, aorta at T12. Pelvis: inlet from sacral promontory to pubic symphysis, outlet from coccyx tip; floor = levator ani + coccygeus; below, the diamond perineum splits into urogenital and anal triangles around the perineal body. Female pelvis is broader with an obtuse pubic angle. Aorta T12→L4, IVC L5→T8; right gonadal vein into the IVC, left into the left renal vein.`,
keyFacts: [
'Four quadrants from two perpendicular lines intersecting at the umbilicus; nine regions use mid-clavicular lines plus the transpyloric (L1) and transtubercular (L5) planes.',
'Midline regions superior to inferior: epigastric, umbilical, hypogastric (pubic).',
'Landmarks: gallbladder ~midclavicular line × costal margin; McBurney point 1/3 ASIS→umbilicus; femoral artery 1/2 ASIS→pubic tubercle.',
'Anterolateral wall: external oblique, internal oblique, transversus abdominis, rectus abdominis (linea alba, rectus sheath).',
'Posterior abdominal wall mainly psoas major + quadratus lumborum, with erector spinae; iliopsoas flexes the thigh at the hip.',
'Diaphragm hiatuses: caval T8 (IVC, right phrenic), oesophageal T10 (oesophagus, vagus), aortic T12 between crura (aorta, azygos, thoracic duct).',
'Pelvic inlet: sacral promontory → pelvic brim → superior pubic symphysis; outlet: coccyx tip → inferior pubic symphysis.',
'Pelvic diaphragm = levator ani + coccygeus; perineum = urogenital + anal triangles with the perineal body at the centre.',
'Female pelvis: broader, oval inlet, pubic angle ≥100°, flexible sacrococcygeal joint; male: heart-shaped inlet, angle <90°.',
'Abdominal aorta T12→L4; IVC L5→T8; right gonadal vein → IVC, left gonadal vein → left renal vein.'
],
prerequisites: ['hss2011-digestive-peritoneum-portal-circulation'],
examples: [
'Suspected appendicitis is tested at McBurney point — the surface mark of the caecum/appendix at one-third ASIS→umbilicus.',
'Left renal carcinoma can present as a LEFT varicocele (tumour blocking the left gonadal vein where it joins the left renal vein) — the asymmetry is pure anatomy.'
]
},
memory: {
chunking: 'Hiatuses T8–T10–T12 = IVC–oesophagus–aorta: "I 8 10 EGGs A 12" (SP2 mnemonic, still the answer).',
firstLetter: 'Posterior wall: "PQE" — Psoas, Quadratus lumborum, Erector spinae (the FIB asks the first two).',
location: 'Planes L1 and L5: pylorus at L1 (transpyloric), tubercles at L5 (transtubercular); umbilicus at L3 in between.'
},
practice: [
{ type: 'cloze',
  prompt: 'The posterior abdominal wall is mainly formed by the ______ and ______ muscles.',
  accept: ['psoas; quadratus lumborum','psoas major and quadratus lumborum','psoas, quadratus lumborum'],
  explanation: 'Model answer: psoas; quadratus lumborum — with erector spinae behind them.',
  src: { ref: 'hss.revans', location: 'p3 "Psoas; Quadratus lumborum; erector spinae"' } },
{ type: 'cloze',
  prompt: 'The oesophagus pierces through the diaphragm at the level of ______.',
  accept: ['T10','the 10th thoracic vertebra','the 10th thoracic vertebra (T10)'],
  explanation: 'Model answer: T10 — the oesophageal hiatus carrying oesophagus and vagus nerves.',
  src: { ref: 'hss.revans', location: 'p3 "The 10th thoracic vertebra (T10)"' } },
{ type: 'mcq',
  prompt: 'The regions along the midline, from superior to inferior, are:',
  options: ['Hypogastric, umbilical, epigastric','Epigastric, umbilical, hypogastric','Umbilical, epigastric, hypogastric','Epigastric, hypogastric, umbilical'],
  answer: 1,
  explanation: 'Model answer B: epigastric → umbilical → hypogastric — asked every year since 12/13.',
  src: { ref: 'hss.pp1718', location: 'p3 "The regions along the midline (from superior to inferior)"' } },
{ type: 'mcq',
  prompt: 'Which statement about the FEMALE pelvis is FALSE?',
  options: ['It is more massive than the male pelvis','The subpubic arch is an obtuse angle','It is oval in shape','The ischial spine is less pointed into the outlet'],
  answer: 0,
  explanation: 'It is the MALE pelvis that is heavier/more massive; the female pelvis is broader, smoother, oval-inlet with pubic angle ≥100°.',
  src: { ref: 'hss.manual1920', location: 'p38 "FALSE about the female pelvis"' } },
{ type: 'mcq',
  prompt: 'Name the three potential sites of ureteric-stone obstruction in order.',
  options: ['UPJ, pelvic brim/external iliac crossing, bladder wall','Bladder wall, UPJ, renal pelvis','Pelvic brim, UPJ, urethra','UPJ, inguinal canal, bladder wall'],
  answer: 0,
  explanation: 'Model answer: ureteropelvic junction; crossing the external iliac vessels and/or pelvic brim; where the ureter traverses the bladder wall.',
  src: { ref: 'hss.revans', location: 'p4 "Ureteropelvic junction"' } },
{ type: 'mcq',
  prompt: 'A fracture of the LEFT 10th rib can damage which organs?',
  options: ['Liver and right kidney','Spleen only','Left kidney and spleen','Stomach and pancreas'],
  answer: 2,
  explanation: 'Model answer: left kidney and spleen — both sit posterosuperiorly behind the left lower ribs.',
  src: { ref: 'hss.revans', location: 'p4 "Left kidney"' } }
],
application: [
{ type: 'scenario',
  prompt: 'A trauma CT shows free fluid tracking from the left lower ribs into the pelvis and a fractured left 10th rib. State which organs are at risk and why, name the two peritoneal pouches in a female pelvis where blood would collect, and give the vertebral levels the blood would cross entering the IVC.',
  model: 'A left 10th rib fracture endangers the spleen (ruptured spleen is the classic rib-10/left trauma injury) and the left kidney, which sit directly deep to the posterolateral left ribs. Blood draining into the pelvis collects in the dependent peritoneal pouches: the rectouterine pouch (pouch of Douglas) between uterus and rectum — the most dependent in the female — and the vesicouterine pouch between bladder and uterus. From the pelvis, blood returns by the internal/external iliac veins → common iliac veins, which unite at L5 to form the IVC, which ascends to terminate at T8 passing through the caval hiatus.',
  rubric: [
'Identifies spleen + left kidney behind the left 10th rib',
'Names rectouterine and vesicouterine pouches as the collection sites in the female',
'Gives the iliac→IVC path with L5 formation and T8 termination'
  ]
}
],
commonMistakes: [
'Putting the oesophageal hiatus at T12 or the caval one at T10 — order is IVC T8, oesophagus T10, aorta T12.',
'Listing rectus abdominis among the posterior wall muscles — it is anterolateral; the posterior wall is psoas + quadratus lumborum (+ erector spinae).',
'Saying both gonadal veins drain into the renal veins — the RIGHT one drains directly into the IVC.',
'Calling the perineum part of the pelvic diaphragm — the diaphragm (levator ani + coccygeus) is the floor ABOVE the perineum.'
],
skills: [
'Name the quadrant/region any organ occupies from a surface view.',
'Recite the three hiatuses with vertebral level and contents, and the inlet/outlet boundaries.'
],
selfCheck: 'From memory: 4 quadrants and 9 regions with their planes; the three exam landmarks; the four + three wall muscles; T8/T10/T12 contents; pelvic inlet/outlet; pelvic diaphragm muscles; perineal triangles and the perineal body; aorta and IVC levels; gonadal-vein asymmetry.',
sourceRefs: [
  { ref: 'hss.3.3', location: 'p2 "4 abdominopelvic quadrants"' },
  { ref: 'hss.3.3', location: 'p2 "intersect at the navel"' },
  { ref: 'hss.3.3', location: 'p3 "9 abdominopelvic regions"' },
  { ref: 'hss.3.3', location: 'p3 "L1 - transpyloric"' },
  { ref: 'hss.3.3', location: 'p3 "L5 - transtubercular"' },
  { ref: 'hss.3.3', location: 'p3 "Mid-clavicular lines"' },
  { ref: 'hss.3.3', location: 'p6 "McBurney\'s point"' },
  { ref: 'hss.3.3', location: 'p6 "midclavicular line x costal margin"' },
  { ref: 'hss.3.3', location: 'p6 "Femoral artery"' },
  { ref: 'hss.3.3', location: 'p8 "External oblique"' },
  { ref: 'hss.3.3', location: 'p8 "Transversus abdominis"' },
  { ref: 'hss.3.3', location: 'p8 "linea alba"' },
  { ref: 'hss.3.3', location: 'p10 "Quadratus lumborum"' },
  { ref: 'hss.3.3', location: 'p10 "Psoas major muscle"' },
  { ref: 'hss.3.3', location: 'p10 "powerful flexor"' },
  { ref: 'hss.3.3', location: 'p13 "caval hiatus T8"' },
  { ref: 'hss.3.3', location: 'p13 "oesophageal hiatus T10"' },
  { ref: 'hss.3.3', location: 'p13 "aortic hiatus T12"' },
  { ref: 'hss.3.3', location: 'p13 "between crura"' },
  { ref: 'hss.3.3', location: 'p14 "Pelvic Inlet"' },
  { ref: 'hss.3.3', location: 'p14 "sacral promontory"' },
  { ref: 'hss.3.3', location: 'p14 "tip of coccyx"' },
  { ref: 'hss.3.3', location: 'p15 "Levator ani"' },
  { ref: 'hss.3.3', location: 'p15 "Coccygeus"' },
  { ref: 'hss.3.3', location: 'p16 "perineal body"' },
  { ref: 'hss.3.3', location: 'p16 "incontinence and prolapse"' },
  { ref: 'hss.3.3', location: 'p17 "Sacrococcygeal joint"' },
  { ref: 'hss.3.3.2019', location: 'p5 "Transtubercular plane (L5)"' },
  { ref: 'hss.3.3.2019', location: 'p5 "plane (L1)"' },
  { ref: 'hss.3.3.2019', location: 'p42 "abdominal aorta begins at T12 and ends at L4"' },
  { ref: 'hss.3.3.2019', location: 'p42 "IVC begins at L5 and terminates at T8"' },
  { ref: 'hss.3.3.2019', location: 'p42 "right gonadal vein drains directly into IVC"' },
  { ref: 'hss.3.3.2019', location: 'p42 "left gonadal vein drains into the left renal vein"' },
  { ref: 'hss.3.3.2019', location: 'p44 "Pubic angle"' },
  { ref: 'hss.3.3.2019', location: 'p44 "Broader, smoother, less robust"' },
  { ref: 'hss.3.3.2019', location: 'p57 "venous plexus to vertebral column"' },
  { ref: 'hss.3.3.2019', location: 'p18 "central tendon of the pelvic"' },
  { ref: 'hss.revans', location: 'p3 "The 10th thoracic vertebra (T10)"' },
  { ref: 'hss.revans', location: 'p3 "Psoas; Quadratus lumborum; erector spinae"' },
  { ref: 'hss.revans', location: 'p4 "Ureteropelvic junction"' },
  { ref: 'hss.revans', location: 'p4 "Crossing external iliac vessels"' },
  { ref: 'hss.revans', location: 'p4 "Ureter entering the urinary bladder"' },
  { ref: 'hss.revans', location: 'p4 "Left kidney"' },
  { ref: 'hss.revans', location: 'p4 "Spleen"' },
  { ref: 'hss.manual1920', location: 'p38 "posterior abdominal wall is mainly formed by"' },
  { ref: 'hss.manual1920', location: 'p38 "oesophagus pierces through the diaphragm at the level"' },
  { ref: 'hss.manual1920', location: 'p40 "sites of obstruction by ureteric stones"' },
  { ref: 'hss.manual1920', location: 'p40 "broken 10th rib on the left"' },
  { ref: 'hss.fib5yr', location: 'p11 "perineum is a diamond shaped region"' },
  { ref: 'hss.fib5yr', location: 'p11 "urogenital and the posterior anal triangles"' },
  { ref: 'hss.pp1718', location: 'p3 "The regions along the midline (from superior to inferior)"' }
]
},

/* ---------------------------------------------------------------- W12-2 */
{
id: 'hss2011-uro-kidneys-urinary-tract',
subject: 'HSS2011', unit: 'hss.m3', type: 'concept',
title: 'Kidneys and the urinary tract: gross anatomy, ureters, bladder, urethra, urothelium',
tags: ['urogenital','kidney','bladder','urethra','high-yield'],
visuals: [
  { fig: 'kidneyGrossAnatomy' },
  { fig: 'urinaryBladderTrigone' },
  { model: { layer: 'organs', meshes: ['Kidney','Ureter','Urinary bladder'], label: 'Kidneys, ureters and bladder on the 3D model', caption: 'The paired kidneys against the posterior wall (right one lower, under the liver), ureters descending on psoas to the bladder behind the pubis. Tap the hilum — artery in, vein and ureter out.' } }
],
lesson: {
explanation: `THE KIDNEYS — GROSS. Each kidney is a reddish-brown, bean-shaped, highly vascular organ about 10 cm long × 5.5 cm wide × 3 cm thick and roughly 150 g, lying against the posterior abdominal wall between T12 and L3. The right kidney sits slightly inferior to the left (the liver claims the space above it), and each carries an adrenal (suprarenal) gland capping its superior surface. Both kidneys are retroperitoneal. Their connective-tissue layers, outside in: the fibrous capsule directly on the organ, the perinephric fat cushion, and the renal fascia anchoring the whole to the body wall — posteriorly fusing with the deep fascia, anteriorly blending with the peritoneum. On the medial concave margin is the hilum: the point of entry for the renal artery and renal nerves and of exit for the renal vein and the ureter — "the point of entry and exit of renal vessels" is the five-year blank.

DRAINAGE INSIDE THE KIDNEY. On section, an outer renal cortex over an inner renal medulla of triangular renal pyramids, separated by renal columns of cortex. Urine drips from each pyramid's papilla into a minor calyx; 4–5 minor calyces merge into a major calyx, and 2–3 major calyces form the renal pelvis, the funnel that drains into the ureter.

URETERS. A pair of muscular tubes with triple-layered walls — an inner mucosa of transitional epithelium and lamina propria, a middle muscular layer of longitudinal and circular smooth muscle, and an outer connective-tissue layer continuous with the renal capsule and peritoneum. They run from renal pelvis to bladder, retroperitoneal on the posterior abdominal wall (descending on the anterior surface of psoas major), and penetrate the posterior wall of the urinary bladder at an oblique angle as the ureteral openings — the five-year blank — that obliquity acting as a one-way valve against reflux. Their three normal constrictions are where stones lodge: the ureteropelvic junction, the crossing of the external iliac vessels/pelvic brim, and the bladder-wall traverse.

URINARY BLADDER. A hollow, muscular organ whose superior surface alone is covered by peritoneum (infraperitoneal when full); its posterior, inferior and anterolateral surfaces lie in the pelvis anchored by ligamentous bands. Its mucosa folds into rugae that disappear when the bladder fills. The muscularis is the detrusor muscle — inner and outer longitudinal layers with a circular layer between — the tested blank. The trigone is the smooth triangle defined by the two ureteral openings and the urethral entrance; it acts as a funnel channelling urine into the urethra. Around the urethral opening, the neck of the bladder contains the internal urethral sphincter of smooth muscle under involuntary control.

URETHRA. The male urethra extends 18–20 cm from bladder neck to the tip of the penis in three parts: prostatic (through the centre of the prostate), membranous (a short segment through the urogenital diaphragm, ringed by the voluntary external urethral sphincter), and spongy (penile) urethra to the external orifice. The female urethra is very short — 3–5 cm — from bladder to vestibule, opening near the anterior vaginal wall; the external urethral sphincter is under voluntary control in BOTH sexes. This length difference is why urinary infections ascend far more easily in women.

UROTHELIUM. The whole urine-contacting lining — minor and major calyces, renal pelvis, ureters, bladder and the proximal urethra — is urothelium: transitional epithelium, multiple cell layers that allow cycles of contraction and distention without leaking.`,
plain: `Kidneys: bean-shaped, ~10 cm, T12–L3, retroperitoneal; right one lower (liver above it), adrenal gland on top; capsule → perinephric fat → renal fascia. Hilum: artery in, vein and ureter out. Inside: cortex, pyramids, papillae dripping into minor calyces → 4–5 merge to major → 2–3 to the renal pelvis → ureter. Ureters are triple-layered muscle tubes running retroperitoneally and entering the BACK of the bladder obliquely (anti-reflux). Bladder: detrusor muscle wall, rugae that flatten when full, smooth trigone between the two ureteral openings and the urethra; internal sphincter involuntary. Male urethra 18–20 cm in three parts (prostatic, membranous, spongy); female 3–5 cm straight to the vestibule; the external sphincter is voluntary in both sexes. Everything urine touches is transitional epithelium (urothelium).`,
keyFacts: [
'Kidneys: bean-shaped, highly vascular, ~10 × 5.5 × 3 cm, ~150 g, between T12 and L3, retroperitoneal.',
'The right kidney is slightly inferior to the left (liver above); an adrenal gland caps each superior surface.',
'Connective layers: fibrous capsule, perinephric fat, renal fascia.',
'Hilum = point of entry of renal artery and nerves; exit of renal vein and ureter (five-year blank).',
'4–5 minor calyces merge into a major calyx; 2–3 major calyces form the renal pelvis draining to the ureter.',
'Ureters: triple-layered walls (transitional mucosa, muscular, outer connective tissue), retroperitoneal.',
'Ureters penetrate the POSTERIOR bladder wall at an oblique angle — anti-reflux.',
'Bladder wall = mucosa, submucosa, muscularis; the detrusor has inner/outer longitudinal + circular layers (blank).',
'Trigone = two ureteral openings + urethral entrance; funnels urine to the urethra.',
'Male urethra 18–20 cm: prostatic, membranous, spongy; female 3–5 cm; external urethral sphincter voluntary in both sexes.'
],
prerequisites: ['hss2011-m3-urogenital-pelvis'],
examples: [
'IVU/CT reconstructed coronals show the three ureteric constrictions — which is where stones stick (the More-exercises answer).',
'A catheter meeting resistance at ~18–20 cm in a male has reached the membranous urethra/prostate — the fixed narrowest part.'
]
},
memory: {
chunking: 'Calyx funnel: 4–5 minor → 2–3 major → 1 pelvis → ureter (counts are the tested numbers).',
firstLetter: 'Male urethra P-M-S: "Prostate, Membrane, Sponge" — long then short then long.',
location: 'Ureter entries: TWO ureteral openings + ONE internal urethral orifice = the trigone.'
},
practice: [
{ type: 'cloze',
  prompt: 'The ______ is the point of entry and exit of renal vessels.',
  accept: ['hilum','hilus','renal hilum'],
  explanation: 'The hilum — renal artery and nerves in; renal vein and ureter out. Five-year blank (12/13–16/17).',
  src: { ref: 'hss.fib5yr', location: 'p7 "hilum is the point of entry and exit of renal vessels"' } },
{ type: 'cloze',
  prompt: 'The structure that conveys urine from the kidney to the bladder is the ______; it penetrates the ______ wall of the urinary bladder.',
  accept: ['ureter; posterior','ureter, posterior'],
  explanation: 'The ureter — and the oblique entry through the POSTERIOR wall forms the anti-reflux valve.',
  src: { ref: 'hss.fib5yr', location: 'p7 "conveys urine from the kidney to the bladder is the ureter"' } },
{ type: 'mcq',
  prompt: 'The arterial vessel arch along the boundary between the cortex and medulla of the kidney is the:',
  options: ['Interlobar arteries','Arcuate arteries','Cortical radiate arteries','Afferent arterioles'],
  answer: 1,
  explanation: 'Model answer B: the arcuate arteries arch along the cortex–medulla junction.',
  src: { ref: 'hss.manual1920', location: 'p36 "arch along the boundary between the cortex and medulla"' } },
{ type: 'cloze',
  prompt: 'The powerful muscle in the muscularis layer of the bladder wall is called the ______.',
  accept: ['detrusor','detrusor muscle'],
  explanation: 'Model answer: detrusor — inner and outer longitudinal layers with circular between.',
  src: { ref: 'hss.revans', location: 'p3 "Detrusor"' } },
{ type: 'mcq',
  prompt: 'The female urethra measures approximately:',
  options: ['3–5 cm','8–10 cm','18–20 cm','25–30 cm'],
  answer: 0,
  explanation: 'The female urethra is very short (3–5 cm), bladder to vestibule — versus 18–20 cm in the male.',
  src: { ref: 'hss.3.2', location: 'p19 "very short (3–5 cm)"' } },
{ type: 'cloze',
  prompt: 'The opening of the two ureters and the urethra form the boundaries of a smooth area called the ______ on the bladder floor.',
  accept: ['trigone'],
  explanation: 'The trigone — it acts as a funnel channelling urine into the urethra.',
  src: { ref: 'hss.fib5yr', location: 'p11 "Trigone on the floor of the bladder"' } }
],
application: [
{ type: 'scenario',
  prompt: 'A 32-year-old man has colicky left flank pain radiating to the groin with microscopic haematuria. CT shows a 4 mm stone at the level of the pelvic brim. Using the ureter\'s course, state where the stone is and name the other two classic impaction sites; explain why the ureteric entry into the bladder does not normally allow backflow.',
  model: 'The stone has reached the second classic constriction — where the ureter crosses the external iliac vessels and/or the pelvic brim. The other two sites are the ureteropelvic junction (pelvis narrowing to ureter) and the intramural traverse of the bladder wall. Backflow is prevented because the ureters penetrate the posterior bladder wall at an OBLIQUE angle: as the detrusor contracts, the intramural segment is compressed shut, so the ureteral openings act as one-way valves. Colicky pain radiates groin-ward because the ureter shares its T11–L2 sensory supply with those skin areas.',
  rubric: [
'Localises the stone to the pelvic-brim/external-iliac crossing',
'Names UPJ and the bladder-wall traverse as the other two sites',
'Explains the oblique intramural entry as the anti-reflux mechanism'
  ]
}
],
commonMistakes: [
'Saying the ureters enter the anterior or superior bladder wall — they pierce the POSTERIOR wall obliquely (five-year blank).',
'Putting the kidneys at L1–L5 or "in the peritoneal cavity" — they are retroperitoneal, T12–L3, right lower than left.',
'Making the bladder fully peritoneal — only the SUPERIOR surface is covered; the organ is otherwise infraperitoneal.',
'Reversing calyx counts — 4–5 MINOR merge to a major; 2–3 MAJOR form the pelvis.'
],
skills: [
'On a coronal CT urogram, name every segment from calyx to external urethral orifice.',
'Draw the trigone and label its three boundaries and the sphincters around them.'
],
selfCheck: 'From memory: kidney levels and coverings; hilum contents; the calyx→pelvis funnel with counts; ureter wall layers, course and three constrictions; detrusor layers; trigone; the two sphincters and which is voluntary; male urethra parts with lengths.',
sourceRefs: [
  { ref: 'hss.3.2', location: 'p4 "T12 and L3"' },
  { ref: 'hss.3.2', location: 'p4 "Right kidney is slightly"' },
  { ref: 'hss.3.2', location: 'p4 "adrenal gland at the"' },
  { ref: 'hss.3.2', location: 'p4 "highly vascular"' },
  { ref: 'hss.3.2', location: 'p5 "It is retroperitoneal"' },
  { ref: 'hss.3.2', location: 'p5 "Fibrous capsule"' },
  { ref: 'hss.3.2', location: 'p5 "Perinephric fat"' },
  { ref: 'hss.3.2', location: 'p5 "Renal fascia"' },
  { ref: 'hss.3.2', location: 'p6 "Point of entry for renal artery"' },
  { ref: 'hss.3.2', location: 'p6 "4-5 minor calyces are merged to form a"' },
  { ref: 'hss.3.2', location: 'p6 "major calyx, and 2-3 major calyces"' },
  { ref: 'hss.3.2', location: 'p14 "triple-layered walls"' },
  { ref: 'hss.3.2', location: 'p14 "Transitional epithelium"' },
  { ref: 'hss.3.2', location: 'p14 "retroperitoneal being attached"' },
  { ref: 'hss.3.2', location: 'p14 "oblique angle"' },
  { ref: 'hss.3.2', location: 'p15 "Hollow, muscular organ"' },
  { ref: 'hss.3.2', location: 'p15 "Rugae"' },
  { ref: 'hss.3.2', location: 'p15 "disappear when the bladder"' },
  { ref: 'hss.3.2', location: 'p16 "Trigone as defined by the"' },
  { ref: 'hss.3.2', location: 'p16 "funnel to"' },
  { ref: 'hss.3.2', location: 'p16 "Internal urethral"' },
  { ref: 'hss.3.2', location: 'p17 "mucosa, submucosa, and muscularis"' },
  { ref: 'hss.3.2', location: 'p17 "detrusor muscle"' },
  { ref: 'hss.3.2', location: 'p17 "Inner and outer layers of longitudinal smooth"' },
  { ref: 'hss.3.2', location: 'p18 "18–20 cm"' },
  { ref: 'hss.3.2', location: 'p18 "Prostatic urethra"' },
  { ref: 'hss.3.2', location: 'p18 "Membranous urethra"' },
  { ref: 'hss.3.2', location: 'p18 "Spongy urethra"' },
  { ref: 'hss.3.2', location: 'p18 "urogenital diaphragm"' },
  { ref: 'hss.3.2', location: 'p19 "voluntary control in"' },
  { ref: 'hss.3.2', location: 'p20 "transitional epithelium"' },
  { ref: 'hss.3.2', location: 'p20 "minor and"' },
  { ref: 'hss.3.2', location: 'p20 "proximal portion of urethra"' },
  { ref: 'hss.3.3.2019', location: 'p39 "T12 – L3"' },
  { ref: 'hss.3.3.2019', location: 'p39 "9 – 13 cm"' },
  { ref: 'hss.3.3.2019', location: 'p39 "retroperitoneal organs"' },
  { ref: 'hss.3.3.2019', location: 'p43 "Ureteropelvic junction"' },
  { ref: 'hss.3.3.2019', location: 'p43 "external iliac"' },
  { ref: 'hss.3.3.2019', location: 'p49 "infraperitoneal"' },
  { ref: 'hss.fib5yr', location: 'p7 "hilum is the point of entry and exit of renal vessels"' },
  { ref: 'hss.fib5yr', location: 'p7 "conveys urine from the kidney to the bladder is the ureter"' },
  { ref: 'hss.fib5yr', location: 'p7 "penetrates the posterior wall of the urinary bladder"' },
  { ref: 'hss.fib5yr', location: 'p11 "Trigone on the floor of the bladder"' },
  { ref: 'hss.revans', location: 'p3 "Calyx"' }
]
},

/* ------------------------------------------------------- W12-3 (NEW) */
{
id: 'hss2011-uro-nephron-renal-microanatomy',
subject: 'HSS2011', unit: 'hss.m3', type: 'concept',
title: 'Renal microanatomy: the kidney lobe, the two nephrons, the renal corpuscle and the tubule segments',
tags: ['urogenital','kidney','nephron','histology','high-yield'],
visuals: [
  { schematic: 'nephron' },
  { fig: 'nephronVascularMicroanatomy' },
  { fig: 'glomerularFiltrationMembrane' },
  { fig: 'nephronSecretionReabsorption' }
],
lesson: {
explanation: `THE KIDNEY LOBE. The gross unit you can see on section is the kidney lobe: one renal pyramid plus the cortical tissue overlying it. The study manual's guiding question asks exactly this — pyramid + its cap of cortex, with the columns of cortex running between neighbouring pyramids. Urine leaves each lobe at its papilla into a minor calyx.

THE VASCULAR TREE. The renal artery at the hilum branches into segmental arteries, which divide into interlobar arteries running between the pyramids in the renal columns. At the cortex–medulla junction each interlobar artery turns to arch as an arcuate artery — "the arterial vessel arch along the boundary between the cortex and medulla" is the revision MCQ. From the arcuates arise the cortical radiate (interlobular) arteries, which give off the afferent arterioles, one per glomerulus. Blood leaves each glomerulus through an efferent arteriole — unusual: a capillary bed between two arterioles — and flows on into the peritubular capillaries around the tubule (or the long vasa recta that follow the medullary loops in juxtamedullary nephrons), then venules, cortical radiate veins, arcuate, interlobar veins, and out the renal vein.

TWO TYPES OF NEPHRON. Each kidney holds over a million nephrons, of two types. Cortical nephrons sit high in the cortex with short nephron loops reaching only into the outer medulla — the majority, doing most reabsorptive housekeeping. Juxtamedullary nephrons sit next to the medulla with long loops (and their vasa recta) reaching deep into the pyramids — they build the osmotic gradient that concentrates urine.

THE RENAL CORPUSCLE. Filtration starts at the renal corpuscle: the glomerulus — "the compact ball of capillaries in a nephron", the every-year blank — inside the glomerular (Bowman's) capsule, whose parietal epithelium continues into the tubule and whose visceral epithelium cells are podocytes wrapping the capillaries; between them is the capsular space receiving the filtrate. Production of filtrate is the corpuscle's job. At the vascular pole sits the juxtaglomerular complex: juxtaglomerular cells — smooth-muscle fibres in the wall of the afferent arteriole — and the macula densa, epithelial cells of the distal convoluted tubule pressed against the corpuscle, which together monitor flow and signal for renin.

TUBULE SEGMENTS AND THEIR JOBS. The proximal convoluted tubule reabsorbs water, ions and ALL organic nutrients — its cells are cuboidal with abundant microvilli (a brush border) and packed mitochondria to power the transport. The nephron loop then descends: the descending limb further reabsorbs water; the thin ascending limb is squamous; the thick ascending limb pumps sodium and chloride ions out. The distal convoluted tubule secretes ions, acids, drugs and toxins and varies its reabsorption of water, sodium and calcium under hormonal control — cuboidal cells with few microvilli. The collecting duct then drains the nephron through the medulla, receiving variable water/solute adjustment itself, and several collecting ducts join as papillary ducts that open at the renal papilla into the minor calyx — "each renal pyramid drains into a separate cuplike urine receptacle called a minor calyx", the recurring blank, and the model answer "calyx" for the Module 3.2 FIB.`,
plain: `A kidney lobe = one pyramid + its cap of cortex. Plumbing: renal artery → segmental → interlobar (between pyramids) → arcuate (arching at the cortex–medulla border) → cortical radiate → afferent arteriole → glomerulus (the compact ball of capillaries) → efferent arteriole → peritubular capillaries/vasa recta → veins out. Nephrons: cortical ones (short loops, the majority) and juxtamedullary ones (long loops + vasa recta that concentrate urine). The corpuscle = glomerulus inside the capsule (podocytes, capsular space); the juxtaglomerular complex (JG cells of the afferent arteriole + macula densa of the DCT) monitors pressure and flow. Tubule jobs: PCT grabs back water, ions and all organic nutrients (microvilli + mitochondria); loop descends (water out), thick ascending limb pumps out NaCl; DCT secretes acids/drugs and fine-tunes under hormones; collecting → papillary ducts drip into the minor calyx.`,
keyFacts: [
'Kidney lobe = renal pyramid + overlying cortex (the manual\'s guiding question).',
'Arterial route: renal → segmental → interlobar → arcuate (at the cortex/medulla boundary) → cortical radiate → afferent arteriole.',
'Glomerulus = compact ball of capillaries; blood leaves via the efferent arteriole to peritubular capillaries (or vasa recta).',
'Two nephron types: cortical (short loops, majority) and juxtamedullary (long loops + vasa recta, urine concentration).',
'Renal corpuscle = glomerulus + glomerular capsule (parietal epithelium, podocyte visceral layer, capsular space).',
'Juxtaglomerular complex: JG cells (smooth muscle of afferent arteriole) + macula densa (epithelial cells of the DCT).',
'PCT reabsorbs water, ions and all organic nutrients — abundant microvilli and mitochondria.',
'Nephron loop: descending limb reabsorbs water; thin ascending squamous; thick ascending limb reabsorbs Na and Cl.',
'DCT secretes ions, acids, drugs and toxins; variable hormonal reabsorption of water, Na, Ca — few microvilli.',
'Collecting ducts → papillary ducts → renal papilla → minor calyx (each pyramid drains into its own minor calyx).'
],
prerequisites: ['hss2011-uro-kidneys-urinary-tract'],
examples: [
'On a contrast CT nephrogram, the cortex brightens first (cortical nephron glomeruli) — the anatomy behind the imaging phases.',
'Diuretics act at named segments: loop diuretics block the thick ascending limb\'s Na-K-2Cl pump — the segment anatomy is the drug map.'
]
},
memory: {
chunking: 'Arteries: Segmental → Interlobar → Arcuate → Cortical radiate → Afferent — "Some Interneurons Actually Coordinate Action".',
firstLetter: 'Tubule jobs: P-A-D-C — PCT all-nutrients, Ascending NaCl, Descending water, DCT secretion + hormones.',
location: 'Corpuscle pole logic: macula densa = DCT touching its OWN glomerulus — that is why it can signal renin fast.'
},
practice: [
{ type: 'mcq',
  prompt: 'The arterial vessel arch along the boundary between the cortex and medulla of the kidney is:',
  options: ['Interlobar arteries','Arcuate arteries','Cortical radiate arteries','Afferent arterioles'],
  answer: 1,
  explanation: 'Model answer B — the arcuate arteries arch between cortex and medulla, feeding the cortical radiate arteries.',
  src: { ref: 'hss.manual1920', location: 'p36 "arch along the boundary between the cortex and medulla"' } },
{ type: 'mcq',
  prompt: 'In a typical nephron, the tubular portion that is distal to the loop of Henle is the:',
  options: ['Proximal convoluted tubule','Distal convoluted tubule','Ascending limb','Descending limb'],
  answer: 1,
  explanation: 'Model answer B: the DCT follows the loop of Henle — it secretes ions, acids, drugs and fine-tunes reabsorption under hormonal control.',
  src: { ref: 'hss.manual1920', location: 'p36 "tubular portion that is distal to the loop of Henle"' } },
{ type: 'cloze',
  prompt: 'The compact ball of capillaries in a nephron is called the ______.',
  accept: ['glomerulus'],
  explanation: 'The glomerulus — inside the glomerular capsule, together forming the renal corpuscle.',
  src: { ref: 'hss.fib5yr', location: 'p8 "glomerulus"' } },
{ type: 'cloze',
  prompt: 'Each renal pyramid drains into a separate cuplike urine receptacle called a minor ______.',
  accept: ['calyx','calyces','minor calyx'],
  explanation: 'The minor calyx — the model answer for the Module 3.2 FIB "calyx"; 4–5 merge into a major calyx.',
  src: { ref: 'hss.revans', location: 'p3 "Calyx"' } },
{ type: 'mcq',
  prompt: 'Which tubule segment secretes ions, acids, drugs and toxins, with variable hormonal reabsorption?',
  options: ['Proximal convoluted tubule','Thin descending limb','Distal convoluted tubule','Collecting duct only'],
  answer: 2,
  explanation: 'The DCT secretes ions/acids/drugs/toxins and reabsorbs water, Na and Ca variably under hormonal control — cuboidal cells with few microvilli.',
  src: { ref: 'hss.3.2', location: 'p12 "Secretion of ions, acids, drugs, toxins"' } },
{ type: 'mcq',
  prompt: 'The macula densa of the juxtaglomerular complex consists of:',
  options: ['Smooth muscle of the efferent arteriole','Epithelial cells of the DCT near the renal corpuscle','Podocytes of the visceral layer','Squamous cells of the descending limb'],
  answer: 1,
  explanation: 'The macula densa is the tightly packed epithelial cells of the distal convoluted tubule pressed against the renal corpuscle.',
  src: { ref: 'hss.3.2', location: 'p13 "Macula densa"' } }
],
application: [
{ type: 'scenario',
  prompt: 'A renal biopsy cores a pyramid and its overlying cortex. Name the unit sampled, and for each named vessel — segmental, interlobar, arcuate, cortical radiate — state where the pathologist sees it. Then explain why long-loop nephrons, not cortical ones, set the urine-concentrating ability.',
  model: 'The core samples one kidney lobe (pyramid + cortical cap). Segmental arteries branch at the hilum/sinus; interlobar arteries run in the renal columns between pyramids; arcuate arteries arch along the cortex–medulla boundary at the pyramid base; cortical radiate arteries ascend in the cortex, giving the afferent arterioles to the glomeruli. Concentration depends on juxtamedullary nephrons because their long loops of Henle dip deep into the medullary pyramids and their vasa recta maintain the medullary osmotic gradient — cortical nephrons\' short loops never reach it, so the collecting ducts have no gradient to draw water into.',
  rubric: [
'Names the kidney lobe and maps each artery to its anatomical position',
'Identifies afferent arterioles arising from cortical radiate arteries',
'Explains the juxtamedullary loop/vasa-recta mechanism for concentration'
  ]
}
],
commonMistakes: [
'Routing blood glomerulus → peritubular capillaries directly — it passes through the EFFERENT arteriole first (arteriole-capillary-arteriole).',
'Calling the arcuate arteries interlobar — interlobar run between pyramids; the arcuate ARCH at the cortex–medulla boundary (the MCQ stem is almost verbatim).',
'Giving the PCT the secretion job — secretion of acids/drugs is DCT; PCT is the bulk REABSORPTION segment.',
'Saying "minor calyces merge into minor" — 4–5 minor → major; 2–3 major → pelvis.'
],
skills: [
'Sketch the arterial tree from renal artery to afferent arteriole and place each on a coronal section.',
'For each tubule segment, state its epithelium, its microvilli and what it moves.'
],
selfCheck: 'From memory: lobe definition; the five arterial steps to the glomerulus; cortical vs juxtamedullary nephrons; corpuscle parts including podocytes and the JG complex; the four tubule-segment functions; and how urine leaves at the papilla.',
sourceRefs: [
  { ref: 'hss.3.2', location: 'p6 "Renal pyramid"' },
  { ref: 'hss.3.2', location: 'p6 "Renal cortex"' },
  { ref: 'hss.3.2', location: 'p6 "Renal medulla"' },
  { ref: 'hss.3.2', location: 'p6 "Renal columns"' },
  { ref: 'hss.3.2', location: 'p6 "Renal papilla"' },
  { ref: 'hss.3.2', location: 'p7 "Segmental arteries"' },
  { ref: 'hss.3.2', location: 'p7 "Interlobar"' },
  { ref: 'hss.3.2', location: 'p7 "Arcuate"' },
  { ref: 'hss.3.2', location: 'p7 "Cortical"' },
  { ref: 'hss.3.2', location: 'p7 "Afferent arterioles"' },
  { ref: 'hss.3.2', location: 'p7 "Glomerulus"' },
  { ref: 'hss.3.2', location: 'p7 "Peritubular"' },
  { ref: 'hss.3.2', location: 'p7 "Efferent"' },
  { ref: 'hss.3.2', location: 'p8 "Juxtamedullary"' },
  { ref: 'hss.3.2', location: 'p9 "Collecting"' },
  { ref: 'hss.3.2', location: 'p9 "Papillary"' },
  { ref: 'hss.3.2', location: 'p10 "Vasa recta"' },
  { ref: 'hss.3.2', location: 'p10 "Distal"' },
  { ref: 'hss.3.2', location: 'p10 "Proximal"' },
  { ref: 'hss.3.2', location: 'p12 "Reabsorption of water, ions,"' },
  { ref: 'hss.3.2', location: 'p12 "Secretion of ions, acids, drugs, toxins"' },
  { ref: 'hss.3.2', location: 'p12 "Variable reabsorption of water"' },
  { ref: 'hss.3.2', location: 'p12 "Further reabsorption"' },
  { ref: 'hss.3.2', location: 'p12 "chloride ions"' },
  { ref: 'hss.3.2', location: 'p12 "Production of filtrate"' },
  { ref: 'hss.3.2', location: 'p12 "Glomerular capsule"' },
  { ref: 'hss.3.2', location: 'p12 "microvilli"' },
  { ref: 'hss.3.2', location: 'p12 "Mitochondria"' },
  { ref: 'hss.3.2', location: 'p13 "Juxtaglomerular"' },
  { ref: 'hss.3.2', location: 'p13 "Macula densa"' },
  { ref: 'hss.3.2', location: 'p13 "podocyte"' },
  { ref: 'hss.3.2', location: 'p13 "Capsular"' },
  { ref: 'hss.3.2', location: 'p13 "Smooth muscle fibers in wall of"' },
  { ref: 'hss.manual1920', location: 'p35 "What are the major components of a kidney lobe?"' },
  { ref: 'hss.manual1920', location: 'p35 "two types of nephrons and their structures"' },
  { ref: 'hss.manual1920', location: 'p36 "arch along the boundary between the cortex and medulla"' },
  { ref: 'hss.manual1920', location: 'p36 "tubular portion that is distal to the loop of Henle"' },
  { ref: 'hss.fib5yr', location: 'p8 "glomerulus"' },
  { ref: 'hss.fib5yr', location: 'p11 "Each renal pyramid drains into a separate cuplike"' },
  { ref: 'hss.fib5yr', location: 'p11 "minor calyx"' },
  { ref: 'hss.revans', location: 'p3 "Calyx"' }
]
},

/* ---------------------------------------------------------------- W12-4 */
{
id: 'hss2011-uro-male-reproductive-anatomy',
subject: 'HSS2011', unit: 'hss.m3', type: 'concept',
title: 'Male reproductive anatomy: scrotum, spermatic cord, testis, duct system, glands and penis',
tags: ['urogenital','male-reproductive','high-yield'],
visuals: [
  { fig: 'maleReproductiveSagittal' },
  { fig: 'testisSeminiferousTubules' },
  { model: { layer: 'organs', meshes: ['Testis','Prostate'], label: 'Testis and prostate on the 3D model', caption: 'The gonad in its scrotal position and the prostate at the bladder neck, where the ejaculatory ducts enter the prostatic urethra.' } },
  { gen: true }
],
lesson: {
explanation: `SCROTUM. A fleshy pouch suspended inferior to the perineum — anterior to the anus, posterior to the base of the penis. A median septum divides it into right and left scrotal cavities, marked externally by the perineal raphe. Its three layers: thin scrotal skin, the dartos muscle (a subcutaneous layer of SMOOTH muscle in the dermis causing the characteristic wrinkling of the scrotal surface), and the underlying superficial fascia. Deep to the dermis, the cremaster — a layer of SKELETAL muscle — contracts to tense the scrotum and pull the testes closer to the body during sexual arousal or cold (the every-year blank); lining the cavity is the tunica vaginalis, a pouch of serous membrane derived from the peritoneum.

SPERMATIC CORD. Layers of fascia and muscle extending between the abdominopelvic cavity and the testes through the inguinal canal, enclosing the structures that serve the testis: the ductus (vas) deferens, the testicular artery, the pampiniform plexus of testicular veins, the deferential artery, and branches of the genitofemoral nerve. The pampiniform plexus is an extensive venous network surrounding the testicular artery and acts as a countercurrent heat exchanger, cooling arterial blood so the testis stays ~2–3 °C below core — sperm need it. (Revision-note contrast: the cord contains the ductus deferens but NOT seminiferous tubules — the "contains the following EXCEPT" MCQ.)

TESTIS. Septa divide the testis into about 250 lobules containing some 800 slender, tightly coiled seminiferous tubules — where sperm are synthesized (the blank). Spermatogenic cells sit on the basal lamina in sequence; sustentacular (Sertoli) cells support them, and the tight junctions between sustentacular cells form the blood-testis barrier isolating the luminal compartment (the tested blank). Testosterone comes from interstitial cells between tubules. The tubules straighten (straight tubules), interconnect as the rete testis — a network of passageways within the testis — and 15–20 efferent ductules carry sperm out to the epididymis (the tested count MCQ); their ciliated lining moves the sperm along.

EPIDIDYMIS AND DUCT SYSTEM. The epididymis has head, body and tail; its tail re-curves and ascends to connect with the ductus deferens inside the spermatic cord. The ductus deferens is a muscular tube lined by ciliated epithelium ascending the cord through the inguinal canal, then curving down the posterior side of the bladder, widening into the terminal ampulla, where it joins the seminal gland duct to become the ejaculatory duct — a short passageway that penetrates the prostate wall and empties into the urethra (the union of vas deferens and seminal vesicle — the 3.3.2019 description). 

ACCESSORY GLANDS. The seminal glands (vesicles) — active secretory structures posterior to the bladder — contribute about 60% of the semen volume (the blank). The prostate gland encircles the prostatic urethra. The pair of bulbourethral (Cowper's) glands sits at the base of the penis in the urogenital diaphragm — the Module 3.2 fill-in-the-blank answer — each duct travelling alongside the penile urethra to empty into the urethral lumen (pre-ejaculatory lubricant).

PENIS. Three erectile cylinders: paired corpora cavernosa dorsally and the corpus spongiosum ventrally, which passes along the ventral side and ENCLOSES the urethra and expands as the glans (the tested blank). The cylinders are spongy vascular tissue — blood sinuses (lacunae) separated by trabeculae of connective and smooth muscle — flaccid about 8–10 cm and 3 cm across, erect 13–18 cm and 4 cm as the lacunae engorge. The prepuce (foreskin) is the skin fold over the glans. (Female-equivalent anatomy is in the female item: vestibular bulbs ≈ corpus spongiosum, clitoral crura ≈ corpora cavernosa.)`,
plain: `Scrotum: skin + dartos (smooth muscle, wrinkles it) + cremaster (skeletal muscle, pulls testes up when cold); lined by the peritoneal remnant tunica vaginalis. The spermatic cord carries ductus deferens, testicular artery and the pampiniform plexus — a venous net that cools the artery (countercurrent) — through the inguinal canal. In the testis: ~250 lobules of seminiferous tubules make sperm (Sertoli-cell tight junctions = blood-testis barrier; interstitial cells make testosterone); tubules → straight tubules → rete testis → 15–20 efferent ductules → epididymis (head-body-tail) → ductus deferens → ampulla → joins seminal vesicle duct = ejaculatory duct → through prostate → urethra. Seminal glands give ~60% of semen; bulbourethral glands sit at the penis base. The penis has three cylinders: two corpora cavernosa + the corpus spongiosum that wraps the urethra.`,
keyFacts: [
'Scrotum layers: scrotal skin, dartos (smooth muscle — wrinkling), superficial fascia; tunica vaginalis lines the cavity.',
'Cremaster = skeletal muscle; contracts when cold/arousal to pull the testes closer (every-year blank).',
'Spermatic cord = ductus deferens + testicular artery + pampiniform plexus + deferential artery + genitofemoral nerve — through the inguinal canal.',
'Pampiniform plexus = countercurrent heat exchanger cooling the testicular artery.',
'Seminiferous tubules synthesise sperm; sustentacular-cell tight junctions form the blood-testis barrier; interstitial cells produce testosterone.',
'Tubule drainage: seminiferous → straight tubules → rete testis → 15–20 efferent ductules → epididymis.',
'Epididymis = head/body/tail; its tail re-curves to the ductus deferens.',
'Ductus deferens → terminal ampulla behind the bladder → joins the seminal gland duct → ejaculatory duct → penetrates prostate → urethra.',
'Seminal glands contribute ~60% of semen volume; bulbourethral (Cowper) glands sit at the base of the penis in the urogenital diaphragm.',
'Penis = 2 corpora cavernosa + corpus spongiosum enclosing the urethra; lacunae/trabeculae; flaccid 8–10 cm, erect 13–18 cm.'
],
prerequisites: ['hss2011-uro-kidneys-urinary-tract'],
examples: [
'A left varicocele feels like "a bag of worms" — pampiniform plexus engorgement, left-sided because of the left renal vein drainage.',
'Vasectomy cuts the ductus deferens in the scrotal cord — distal to the epididymis, so ejaculation volume changes little (seminal fluid still added).'
]
},
memory: {
chunking: 'Cord contents: "3 Ds" — Ductus deferens, Deferential artery, plus testicular artery, pampiniform plexus, genitofemoral nerve.',
firstLetter: 'Duct chain: SET-RED-P — Seminiferous tubule, Epididymis, Testis-network (rete), Efferent ductules, Ductus deferens, Prostate-urethra.',
location: 'Glands by urethra segment: prostate → prostatic; bulbourethral at membranous/urogenital diaphragm; nothing at spongy except bulbourethral ducts.'
},
practice: [
{ type: 'cloze',
  prompt: 'The pair of glands located at the base of the penis are known as ______ glands.',
  accept: ['bulbourethral','bulbourethral (Cowper)','cowper'],
  explanation: 'Model answer: bulbourethral (Cowper) glands — in the urogenital diaphragm, ducts emptying into the spongy urethra.',
  src: { ref: 'hss.revans', location: 'p3 "Bulbourethral"' } },
{ type: 'mcq',
  prompt: 'The spermatic cord contains all of the following EXCEPT:',
  options: ['Testicular artery','Seminiferous tubule','Pampiniform plexus','Ductus deferens'],
  answer: 1,
  explanation: 'Model answer B: seminiferous tubules are INSIDE the testis, not in the cord.',
  src: { ref: 'hss.manual1920', location: 'p36 "Spermatic cord contains the following except"' } },
{ type: 'mcq',
  prompt: 'How many efferent ductules are present in a testis to connect the rete testis and epididymis?',
  options: ['3–6','8–12','10–15','15–20'],
  answer: 3,
  explanation: 'Model answer D: 15–20 efferent ductules connect rete testis to epididymis.',
  src: { ref: 'hss.manual1920', location: 'p36 "How many efferent ductules"' } },
{ type: 'cloze',
  prompt: 'The ______ muscle contracts when cold; it tenses the scrotum taut and pulls the testes closer to the body.',
  accept: ['cremaster'],
  explanation: 'The cremaster — skeletal muscle deep to the dermis. Five-year blank; dartos is the smooth-muscle wrinkler.',
  src: { ref: 'hss.fib5yr', location: 'p7 "cremaster muscle contracts when cold"' } },
{ type: 'cloze',
  prompt: 'The erectile tissue of the penis which passes along the ventral side and encloses the urethra is the ______.',
  accept: ['corpus spongiosum'],
  explanation: 'The corpus spongiosum — expands as the glans; the corpora cavernosa are the paired dorsal cylinders.',
  src: { ref: 'hss.fib5yr', location: 'p7 "encloses the urethra is known as the corpus spongiosum"' } },
{ type: 'cloze',
  prompt: 'The pampiniform plexus acts as a ______ heat exchanger to cool down the testis.',
  accept: ['countercurrent','counter current'],
  explanation: 'Countercurrent exchange — the venous plexus surrounding the testicular artery in the spermatic cord.',
  src: { ref: 'hss.fib5yr', location: 'p9 "countercurrent heat exchanger"' } }
],
application: [
{ type: 'scenario',
  prompt: 'An infertile man has a left varicocele and a low sperm count. Trace the sperm route from tubule to urethra, explain how the varicocele connects to his infertility through the pampiniform plexus, and state why the swelling is on the LEFT.',
  model: 'Sperm are made in the seminiferous tubules → straight tubules → rete testis → 15–20 efferent ductules → epididymis (head/body/tail, where they mature) → ductus deferens via the spermatic cord → ampulla → ejaculatory duct (joined by the seminal gland) → prostatic/membranous/spongy urethra. The varicocele is engorgement of the pampiniform plexus; a failed countercurrent exchanger lets testicular temperature rise, impairing spermatogenesis — hence the oligospermia. It is LEFT-sided because the left gonadal (testicular) vein drains into the left renal vein at a right angle, raising venous pressure, whereas the right gonadal vein drains obliquely and directly into the IVC.',
  rubric: [
'Recites the full sperm pathway in order with the efferent-ductule count',
'Links plexus failure → raised testicular temperature → impaired spermatogenesis',
'Explains left-sidedness via left renal vein drainage asymmetry'
  ]
}
],
commonMistakes: [
'Listing seminiferous tubules among cord contents — they are inside the testis (the EXCEPT MCQ).',
'Credit dartos with pulling the testes up — dartos (smooth) wrinkles the skin; the CREMASTER (skeletal) retracts.',
'Saying the urethra runs through the corpus cavernosum — it runs in the ventral CORPUS SPONGIOSUM.',
'Putting the bulbourethral glands behind the bladder — those are the seminal glands; bulbourethral sit at the penis base in the urogenital diaphragm.'
],
skills: [
'Trace the sperm pathway on the sagittal chart without labels.',
'Name the cord contents and the three urethra segments in order on a dissection photo.'
],
selfCheck: 'From memory: scrotal layers and both muscles\' fibre type; cord contents; lobule → rete → efferent ductule → epididymis route with counts; ductus → ampulla → ejaculatory duct; the three glands and their contributions; the three cylinders of the penis.',
sourceRefs: [
  { ref: 'hss.3.2', location: 'p22 "Ductus deferens"' },
  { ref: 'hss.3.2', location: 'p23 "Dartos"' },
  { ref: 'hss.3.2', location: 'p23 "Cremaster"' },
  { ref: 'hss.3.2', location: 'p23 "Median septum"' },
  { ref: 'hss.3.2', location: 'p23 "perineal raphe"' },
  { ref: 'hss.3.2', location: 'p23 "pouch of serous membrane"' },
  { ref: 'hss.3.2', location: 'p23 "wrinkling"' },
  { ref: 'hss.3.2', location: 'p23 "closer to the body"' },
  { ref: 'hss.3.2', location: 'p24 "Pampiniform plexus"' },
  { ref: 'hss.3.2', location: 'p24 "Testicular artery"' },
  { ref: 'hss.3.2', location: 'p24 "genitofemoral"' },
  { ref: 'hss.3.2', location: 'p24 "Deferential artery"' },
  { ref: 'hss.3.2', location: 'p24 "tunica vaginalis"' },
  { ref: 'hss.3.2', location: 'p25 "seminiferous tubules"' },
  { ref: 'hss.3.2', location: 'p25 "testis barrier"' },
  { ref: 'hss.3.2', location: 'p25 "about 800 slender"' },
  { ref: 'hss.3.2', location: 'p25 "rete testis"' },
  { ref: 'hss.3.2', location: 'p25 "Septa subdivide testis into lobules"' },
  { ref: 'hss.3.2', location: 'p25 "Tight junctions"' },
  { ref: 'hss.3.2', location: 'p25 "Straight tubules"' },
  { ref: 'hss.3.2', location: 'p26 "15-20 large efferent ductules"' },
  { ref: 'hss.3.2', location: 'p26 "Epididymis (head"' },
  { ref: 'hss.3.2', location: 'p26 "re-curves"' },
  { ref: 'hss.3.2', location: 'p26 "cilia lining of"' },
  { ref: 'hss.3.2', location: 'p27 "terminal ampulla"' },
  { ref: 'hss.3.2', location: 'p27 "become ejaculatory duct"' },
  { ref: 'hss.3.2', location: 'p27 "posterior side of the urinary"' },
  { ref: 'hss.3.2', location: 'p28 "Seminal gland"' },
  { ref: 'hss.3.2', location: 'p28 "Bulbourethral glands"' },
  { ref: 'hss.3.2', location: 'p28 "penetrates wall of prostate"' },
  { ref: 'hss.3.2', location: 'p28 "18–20 cm (7–8 in.)"' },
  { ref: 'hss.3.2', location: 'p30 "Corpus spongiosum"' },
  { ref: 'hss.3.2', location: 'p30 "corpus cavernosum"' },
  { ref: 'hss.3.2', location: 'p30 "lacunae"' },
  { ref: 'hss.3.2', location: 'p30 "trabeculae"' },
  { ref: 'hss.3.2', location: 'p30 "8-10 cm"' },
  { ref: 'hss.3.2', location: 'p30 "13-18 cm"' },
  { ref: 'hss.3.2', location: 'p30 "Prepuce (Foreskin)"' },
  { ref: 'hss.3.3.2019', location: 'p47 "union of the vas deferens and the seminal vesicle"' },
  { ref: 'hss.3.3.2019', location: 'p47 "bulbourethral gland"' },
  { ref: 'hss.3.3.2019', location: 'p52 "Tunica vaginalis"' },
  { ref: 'hss.3.3.2019', location: 'p52 "Dartos muscle is a subcutaneous"' },
  { ref: 'hss.3.3.2019', location: 'p52 "Cremaster muscle is a layer of skeletal"' },
  { ref: 'hss.fib5yr', location: 'p7 "cremaster muscle contracts when cold"' },
  { ref: 'hss.fib5yr', location: 'p7 "encloses the urethra is known as the corpus spongiosum"' },
  { ref: 'hss.fib5yr', location: 'p7 "seminal gland is an active secretory structure posterior"' },
  { ref: 'hss.fib5yr', location: 'p9 "pampiniform plexus is an extensive network of veins"' },
  { ref: 'hss.fib5yr', location: 'p9 "countercurrent heat exchanger"' },
  { ref: 'hss.fib5yr', location: 'p10 "blood-testis barrier is formed by tight junctions"' },
  { ref: 'hss.fib5yr', location: 'p11 "Sperm are synthesized in the seminiferous tubules"' },
  { ref: 'hss.fib5yr', location: 'p11 "approximately 60% of the seminal fluid are the"' },
  { ref: 'hss.fib5yr', location: 'p11 "produce testosterone are Interstitial cells"' },
  { ref: 'hss.revans', location: 'p3 "Bulbourethral"' },
  { ref: 'hss.manual1920', location: 'p36 "Spermatic cord contains the following except"' },
  { ref: 'hss.manual1920', location: 'p36 "How many efferent ductules"' },
  { ref: 'hss.manual1920', location: 'p36 "pair of glands located at the base of the penis"' }
]
},

/* ---------------------------------------------------------------- W12-5 */
{
id: 'hss2011-uro-female-reproductive-pelvis',
subject: 'HSS2011', unit: 'hss.m3', type: 'concept',
title: 'Female reproductive anatomy: ovary, uterine tubes, uterus and wall, vagina, vulva and pelvic position',
tags: ['urogenital','female-reproductive','pelvis','high-yield'],
visuals: [
  { fig: 'femaleReproductiveSagittal' },
  { fig: 'uterineTubeOvary' },
  { gen: true }
],
lesson: {
explanation: `OVARIES. Small, almond-shaped organs near the lateral walls of the pelvic cavity, held by the suspensory ligament laterally and the ovarian ligament medially to the uterus. The external surface is tunica albuginea — a dense connective-tissue layer lined with a columnar (germinal) epithelium — itself covered by visceral peritoneum. The interior stroma divides into a superficial cortex, where gametes are produced, and a deeper medulla carrying the vessels and nerves (the tested blank: "medulla of ovary = blood vessels and nerves").

UTERINE TUBES. Also called Fallopian tubes or oviducts — hollow, muscular tubes transporting oocytes from ovary to uterus, in three segments from the ovary side: the infundibulum, an expanded funnel near the ovary whose fimbriae extend into the pelvic cavity and sweep the released ovum in (the recurring blank: "the portion of the uterine tube that contains the fimbriae is the infundibulum"); the ampulla, the middle segment with smooth-muscle walls — the usual fertilisation site ("after ovulation the ovum will be captured by the fimbriae and stay in the ampulla for fertilization"); and the isthmus, the short segment between ampulla and uterine wall. The 2017 exam labelled these three regions on a posterior view — [28] infundibulum, [29] ampulla, [30] isthmus. The inner surface is ciliated; cilia plus peristalsis move the egg.

UTERUS AND WALL. A pear-shaped organ that normally bends anteriorly (anteverted over the bladder, anteflexed on the cervix — the body rests on the superior bladder surface). Parts: the body (largest portion), the fundus (the rounded portion above the uterine-tube attachment — the tested 3.3 FIB "most superior part of the stomach" counterpart here is fundus of uterus), and the cervix, the inferior portion extending from the isthmus of uterus into the vagina, its distal end projecting about 1.25 cm; the internal os opens into the cervical canal, a constricted passageway between internal and external os (the tested MCQ answer). The wall: outer thick muscular myometrium — about 90% of the uterine mass, arranged in longitudinal, circular and oblique layers, covered by the perimetrium; and the inner thin glandular endometrium — about 10%, whose thickness varies through the uterine cycle and which is shed at menses. The perimetrium is an incomplete serous membrane continuous with the peritoneum over fundus and posterior body. Blood supply: uterine arteries from the internal iliac arteries, with the ovarian arteries anastomosing in the broad ligament.

VAGINA. An elastic, highly distensible muscular tube between cervix and vestibule, lying parallel to the rectum posteriorly and the urethra anteriorly; the cervix projects into its canal, and the fornix is the shallow recess around that protrusion. The hymen is an elastic epithelial fold partially blocking the entrance (the Module 3.2 FIB answer), usually ruptured by first intercourse or tampon use; the vaginal wall has rugae, and its blood supply is the vaginal branches of the internal iliac vessels.

VULVA AND VESTIBULE. The vulva is the area containing the female external genitalia: mons pubis and labia majora form its outer limits; the labia minora are inner hairless folds; between them the vestibule receives the urethra in front and the vagina behind. Vestibular glands: lesser vestibular glands near the urethral orifice, and the greater vestibular (Bartholin's) glands at the distal vagina secreting into the vestibule near the vaginal entrance. The clitoris is a small protuberance whose circulation and innervation mirror the penis: a PAIR of corpora cavernosa diverging as crura to the pubic arch, with NO corpus spongiosum and no urinary role — entirely sensory. The vestibular bulbs beneath the muscles are the erectile masses equivalent to the male corpus spongiosum — note the revision answer key gives "clitoris" for the "female erectile tissue" blank; the deck's segment-by-segment equivalence is bulbs ≈ spongiosum, crura ≈ cavernosa. Position and support: the uterus is intraperitoneal, supported by the broad ligament, with the vesicouterine pouch in front and the deeper rectouterine pouch behind; uterosacral ligaments attach the uterus to the sacrum, the ovarian ligament ties ovary to uterus, the suspensory ligament ties ovary to the pelvic wall (the 13/14 blank).`,
plain: `Ovary: almond-sized by the pelvic side wall; cortex makes the eggs, medulla carries vessels and nerves; tunica albuginea capsule. Tube, ovary→uterus: infundibulum (funnel with fimbriae that catch the egg) → ampulla (fertilisation) → isthmus (short, at the wall). Uterus: body, fundus, cervix (internal os → cervical canal → external os, projecting ~1.25 cm into the vagina); wall is myometrium (90% muscle) + endometrium (10%, sheds monthly) + perimetrium (incomplete serosa); fed by uterine arteries from the internal iliac. Vagina: distensible tube cervix→vestibule, rectum behind, urethra in front, fornix around the cervix, hymen at the entrance. Vulva: mons, labia majora/minora, vestibule with Bartholin glands; the clitoris has paired cavernosa but NO spongiosum (vestibular bulbs ≈ spongiosum). Uterus tilts forward over the bladder, held by the broad, uterosacral, ovarian and suspensory ligaments; peritoneum makes the vesicouterine and rectouterine pouches.`,
keyFacts: [
'Ovaries: almond-shaped, near the lateral pelvic wall; tunica albuginea under visceral peritoneum.',
'Ovarian stroma: superficial cortex (gametes produced) + deeper medulla (vessels and nerves) — the tested blank.',
'Uterine tube segments, ovary→uterus: infundibulum (with fimbriae) → ampulla (fertilisation site) → isthmus.',
'The 2017 exam labelled the tube regions: infundibulum [28], ampulla [29], isthmus [30].',
'Uterus: body (largest), fundus (above tube attachment), cervix; internal os → cervical canal → external os, projecting ~1.25 cm into the vagina.',
'Uterine wall: myometrium ~90% (longitudinal/circular/oblique), endometrium ~10% (cyclic, shed at menses), perimetrium incomplete serosa.',
'Uterine arteries from internal iliac; ovarian arteries anastomose with them in the broad ligament.',
'Vagina: elastic distensible tube, rectum posterior, urethra anterior; fornix around the cervix; hymen a partial fold at the entrance.',
'Clitoris = pair of corpora cavernosa as crura, no corpus spongiosum, no urinary role; vestibular bulbs ≈ corpus spongiosum.',
'Position/support: anteverted + anteflexed over the bladder; broad, uterosacral, ovarian, suspensory ligaments; vesicouterine + rectouterine pouches.'
],
prerequisites: ['hss2011-uro-kidneys-urinary-tract'],
examples: [
'Ectopic pregnancy implants in the ampulla most often — the widest tube segment where fertilisation happens.',
'Culdocentesis/colpotomy reach the rectouterine pouch through the posterior fornix — the deepest peritoneal point accessible from the vagina.'
]
},
memory: {
chunking: 'Tube = I-A-I: Infundibulum (fimbriae) → Ampulla (fertilise) → Isthmus (into uterus).',
firstLetter: 'Uterine wall outside-in: Peri-Myo-Endo ("Please My Endo") = perimetrium, myometrium 90%, endometrium 10%.',
location: 'Ovary ligaments: lateral = suspensory (to wall), medial = ovarian (to uterus), posterior = uterosacral (to sacrum).'
},
practice: [
{ type: 'cloze',
  prompt: 'After ovulation, the ovum will be captured by the ______ and it will stay in the ______ of the uterine tube for fertilization.',
  accept: ['fimbriae; ampulla','fimbriae, ampulla'],
  explanation: 'Fimbriae sweep the egg into the infundibulum; fertilisation happens in the ampulla — the recurring blank and 2017 labels [28]–[30].',
  src: { ref: 'hss.fib5yr', location: 'p9 "ampulla of the uterine tube for fertilization"' } },
{ type: 'cloze',
  prompt: 'The portion of the uterine tube that contains the fimbriae is known as the ______.',
  accept: ['infundibulum'],
  explanation: 'The infundibulum — the expanded funnel near the ovary.',
  src: { ref: 'hss.fib5yr', location: 'p11 "contains the fimbriae is known as the"' } },
{ type: 'cloze',
  prompt: 'The uterine wall consists of an inner ______, a muscular ______, and a superficial ______ (an incomplete serous layer).',
  accept: ['endometrium; myometrium; perimetrium','endometrium, myometrium, perimetrium'],
  explanation: 'Endometrium ~10% cyclic; myometrium ~90% muscular; perimetrium the incomplete serosa — the five-year blank row.',
  src: { ref: 'hss.fib5yr', location: 'p12 "Endometrium + myometrium + perimetrium"' } },
{ type: 'mcq',
  prompt: 'The constricted passageway area between the internal os and external os is the:',
  options: ['Cervical canal','Uterine cavity','Isthmus','Fundus'],
  answer: 0,
  explanation: 'Model answer A: the cervical canal — inside the cervix, between internal and external os.',
  src: { ref: 'hss.manual1920', location: 'p36 "passageway area between the internal os and external os"' } },
{ type: 'cloze',
  prompt: 'The epithelial fold that partially blocks the entrance of the vagina is known as the ______.',
  accept: ['hymen'],
  explanation: 'Model answer: hymen — an elastic epithelial fold, usually ruptured by first intercourse or tampon use.',
  src: { ref: 'hss.revans', location: 'p3 "Hymen"' } },
{ type: 'mcq',
  prompt: 'The connective-tissue layer of the ovary that contains blood vessels and nerves is the:',
  options: ['Cortex','Medulla','Tunica albuginea','Germinal epithelium'],
  answer: 1,
  explanation: 'The medulla of the ovary carries vessels and nerves; the cortex produces gametes; tunica albuginea is the capsule.',
  src: { ref: 'hss.fib5yr', location: 'p10 "medulla of ovary"' } }
],
application: [
{ type: 'scenario',
  prompt: 'A 28-year-old with left-sided pelvic pain and a positive pregnancy test has an ultrasound showing a mass in the left adnexa and free fluid in a peritoneal pouch behind the uterus. Name the most likely implantation site, the segment of tube it involves, the pouch holding the fluid, and the structure a surgeon traverses reaching it from the vagina.',
  model: 'This is an ectopic pregnancy: the most common implantation site is the uterine tube, specifically its AMPULLA — the middle, widest segment where fertilisation normally occurs. Rupture bleeds into the peritoneal cavity, pooling in the rectouterine pouch (of Douglas), the most dependent pouch between uterus and rectum. A surgeon reaches it through the posterior vaginal fornix — the recess around the cervix — which directly abuts the pouch; the exam finding is cervical-motion tenderness plus blithe peritoneal fluid. The tube cannot accommodate a growing embryo because it is a narrow muscular tube held by the mesosalpinx portion of the broad ligament.',
  rubric: [
'Identifies tubal (ampullary) ectopic as the likely diagnosis',
'Names the rectouterine pouch as the fluid collection site',
'Describes the posterior fornix route and why the tube ruptures'
  ]
}
],
commonMistakes: [
'Fertilisation in the uterus or isthmus — it is normally in the AMPULLA.',
'Giving the endometrium 90% of uterine mass — the MYOMETRIUM is 90%; endometrium ~10%.',
'Saying the clitoris has a corpus spongiosum — it has paired corpora cavernosa only; the spongiosum-equivalent is the vestibular BULBS (the answer key wants "clitoris" for the erectile-tissue blank — know both framings).',
'Calling the perimetrium complete — it is an INCOMPLETE serous membrane (fundus and posterior body only).'
],
skills: [
'Label the tube segments on a posterior view as the 2017 exam did.',
'On a mid-sagittal pelvis, name pouches, ligaments and the uterine axes (anteversion/anteflexion).'
],
selfCheck: 'From memory: ovarian coverings and stroma; tube segments with fimbriae; uterus parts and os/canal; wall layers with percentages; uterine arteries; vaginal relations and fornix; vestibule glands; clitoris vs vestibular bulbs; the four ligaments and two pouches.',
sourceRefs: [
  { ref: 'hss.3.2', location: 'p31 "Ovary"' },
  { ref: 'hss.3.2', location: 'p32 "Tunica albuginea"' },
  { ref: 'hss.3.2', location: 'p32 "Stroma"' },
  { ref: 'hss.3.2', location: 'p32 "Gametes are produced in"' },
  { ref: 'hss.3.2', location: 'p32 "Suspensory"' },
  { ref: 'hss.3.2', location: 'p32 "almond-shaped"' },
  { ref: 'hss.3.2', location: 'p33 "Infundibulum"' },
  { ref: 'hss.3.2', location: 'p33 "Ampulla"' },
  { ref: 'hss.3.2', location: 'p33 "Isthmus"' },
  { ref: 'hss.3.2', location: 'p33 "Fimbriae"' },
  { ref: 'hss.3.2', location: 'p33 "Fallopian"' },
  { ref: 'hss.3.2', location: 'p33 "Ciliated inner surface"' },
  { ref: 'hss.3.2', location: 'p34 "Fundus"' },
  { ref: 'hss.3.2', location: 'p34 "Cervical canal"' },
  { ref: 'hss.3.2', location: 'p34 "Isthmus of uterus"' },
  { ref: 'hss.3.2', location: 'p34 "1.25 cm"' },
  { ref: 'hss.3.2', location: 'p34 "Pear-shaped"' },
  { ref: 'hss.3.2', location: 'p35 "90% of the uterine"' },
  { ref: 'hss.3.2', location: 'p35 "10% of the"' },
  { ref: 'hss.3.2', location: 'p35 "incomplete serous"' },
  { ref: 'hss.3.2', location: 'p35 "longitudinal, circular, and"' },
  { ref: 'hss.3.2', location: 'p35 "menses"' },
  { ref: 'hss.3.2', location: 'p36 "internal iliac"' },
  { ref: 'hss.3.2', location: 'p36 "uterine arteries"' },
  { ref: 'hss.3.2', location: 'p36 "Anastamose"' },
  { ref: 'hss.3.2', location: 'p36 "broad ligament"' },
  { ref: 'hss.3.2', location: 'p37 "Fornix"' },
  { ref: 'hss.3.2', location: 'p37 "Hymen"' },
  { ref: 'hss.3.2', location: 'p37 "Rectum, posteriorly"' },
  { ref: 'hss.3.2', location: 'p37 "Urethra, anteriorly"' },
  { ref: 'hss.3.2', location: 'p37 "Highly distensible"' },
  { ref: 'hss.3.2', location: 'p37 "partially blocks entrance"' },
  { ref: 'hss.3.2', location: 'p38 "Greater vestibular"' },
  { ref: 'hss.3.2', location: 'p38 "Lesser vestibular glands"' },
  { ref: 'hss.3.2', location: 'p38 "Vestibule"' },
  { ref: 'hss.3.2', location: 'p39 "corpus spongiosum"' },
  { ref: 'hss.3.2', location: 'p39 "corpora cavernosa"' },
  { ref: 'hss.3.2', location: 'p39 "no urinary role"' },
  { ref: 'hss.3.2', location: 'p39 "Vestibular bulbs"' },
  { ref: 'hss.3.2', location: 'p39 "crura"' },
  { ref: 'hss.3.3.2019', location: 'p53 "Vesicouterine"' },
  { ref: 'hss.3.3.2019', location: 'p53 "Rectouterine pouch"' },
  { ref: 'hss.3.3.2019', location: 'p53 "Levator"' },
  { ref: 'hss.3.3.2019', location: 'p54 "broad ligament"' },
  { ref: 'hss.3.3.2019', location: 'p54 "Anteflexion"' },
  { ref: 'hss.3.3.2019', location: 'p54 "Anteversion"' },
  { ref: 'hss.3.3.2019', location: 'p54 "rests on the superior surface"' },
  { ref: 'hss.3.3.2019', location: 'p56 "Bartholin\'s gland"' },
  { ref: 'hss.fib5yr', location: 'p9 "ovum will be captured by the fimbriae"' },
  { ref: 'hss.fib5yr', location: 'p10 "medulla of ovary"' },
  { ref: 'hss.fib5yr', location: 'p10 "ovarian ligament"' },
  { ref: 'hss.fib5yr', location: 'p10 "suspensory ligament"' },
  { ref: 'hss.fib5yr', location: 'p10 "uterosacral"' },
  { ref: 'hss.fib5yr', location: 'p12 "Endometrium + myometrium + perimetrium"' },
  { ref: 'hss.revans', location: 'p3 "Hymen"' },
  { ref: 'hss.revans', location: 'p3 "Clitoris"' },
  { ref: 'hss.revans', location: 'p3 "Fimbriae; ampulla; uterine (fallopian) tube"' },
  { ref: 'hss.revans', location: 'p3 "Fundus"' },
  { ref: 'hss.manual1920', location: 'p36 "passageway area between the internal os and external os"' },
  { ref: 'hss.manual1920', location: 'p36 "epithelial fold that partially blocks the entrance"' },
  { ref: 'hss.manual1920', location: 'p38 "ovum will be captured by the"' }
]
},

/* ---------------------------------------------------------------- W12-6 */
{
id: 'hss2011-uro-tutorial-pastpaper-practice',
subject: 'HSS2011', unit: 'hss.m3', type: 'cloze',
title: 'Urogenital system: worked revision exercises and past-paper practice (Modules 3.2 and 3.3)',
tags: ['urogenital','assessment','tutorial','high-yield'],
visuals: [
  { fig: 'urinaryBladderTrigone' },
  { fig: 'maleReproductiveSagittal' }
],
lesson: {
explanation: `The exam-facing drill for Module 3.2 (urogenital) and the 3.3 items that ride on it, drawn from the Study Manual revision exercises, the five-year blank bank and the 2017 paper.

THE FIVE FILL-IN-THE-BLANKS (Module 3.2): (1) the pair of glands at the base of the penis are the bulbourethral glands; (2) the powerful muscle of the bladder muscularis is the detrusor; (3) the cup-shaped drain receiving urine from a renal papilla is the calyx (minor calyx); (4) the female erectile tissue question — the answer key gives the clitoris (deck equivalence: vestibular bulbs ≈ corpus spongiosum); (5) the epithelial fold partially blocking the vaginal entrance is the hymen.

THE FIVE MCQs (Module 3.2): arcuate arteries arch at the cortex–medulla boundary; the DCT is the tubule distal to the loop of Henle; the spermatic cord contains everything EXCEPT seminiferous tubules; the passageway between internal and external os is the cervical canal; a testis has 15–20 efferent ductules.

THE FIVE-YEAR RECURRING BLANKS (12/13 → 16/17, unbroken): hilum = entry/exit of renal vessels; the ureter conveys urine and penetrates the POSTERIOR bladder wall; corpus spongiosum encloses the urethra; the seminal gland is the secretory structure posterior to the bladder contributing ~60% of semen; the cremaster contracts when cold; the glomerulus is the compact ball of capillaries; the uterine-tube segments fimbriae/infundibulum/ampulla/isthmus; endometrium + myometrium + perimetrium; the pampiniform plexus countercurrent exchanger; Peyer patches; the blood-testis barrier of sustentacular cells; medulla of ovary; uterosacral + ovarian + suspensory ligaments; the ileocecal valve + teniae coli + haustra trio; seminiferous tubules; the trigone; each pyramid drains into a minor calyx.

AND FROM 3.3 / THE 2017 PAPER: midline regions epigastric-umbilical-hypogastric; the oesophageal hiatus at T10; the posterior abdominal wall of psoas + quadratus lumborum; the fundus as most superior part; the ureteric stones' three sites; the left 10th rib endangering left kidney and spleen; uterine-tube labelling [28] infundibulum, [29] ampulla, [30] isthmus. Drill them all until the answers are reflexes.`,
plain: `Blanks for 3.2: bulbourethral, detrusor, calyx, clitoris (hymen completes the five). MCQs: arcuate arteries, DCT after the loop, cord-except-seminiferous, cervical canal, 15–20 efferent ductules. Repeaters: hilum, ureter-posterior-wall, corpus spongiosum, seminal gland 60%, cremaster, glomerulus, tube segments, peri-myo-endo wall, pampiniform, Peyer patches, blood-testis barrier, medulla of ovary, three uterine ligaments, ileocecal/teniae/haustra, trigone, minor calyx. 3.3 add-ons: midline regions, T10 hiatus, psoas+quadratus, stones' three sites, left 10th-rib organs, tube labelling.`,
keyFacts: [
'FIB: bulbourethral glands sit at the base of the penis.',
'FIB: detrusor = the bladder\'s powerful muscularis.',
'FIB: calyx (minor calyx) drains a renal papilla.',
'FIB: answer key gives "clitoris" for female erectile tissue; the deck maps vestibular bulbs ≈ corpus spongiosum.',
'FIB: hymen partially blocks the vaginal entrance.',
'MCQ: arcuate arteries (cortex/medulla), DCT (distal to loop), cord EXCEPT seminiferous tubules, cervical canal, 15–20 efferent ductules.',
'Repeater: hilum = renal vessel entry/exit; ureter penetrates the posterior bladder wall.',
'Repeater: corpus spongiosum encloses the urethra; seminal gland ~60% of semen; cremaster contracts when cold.',
'Repeater: glomerulus = compact ball; tube segments fimbriae→infundibulum/ampulla/isthmus; endo+myo+perimetrium.',
'Repeater: pampiniform plexus, Peyer patches, blood-testis barrier, medulla of ovary, three uterine ligaments, trigone, minor calyx.'
],
prerequisites: ['hss2011-m3-urogenital-pelvis','hss2011-uro-kidneys-urinary-tract','hss2011-uro-nephron-renal-microanatomy','hss2011-uro-male-reproductive-anatomy','hss2011-uro-female-reproductive-pelvis'],
examples: [
'The 2017 paper (pp.1718) repeats the hilum/ureter/corpus-spongiosum/seminal-gland/cremaster block verbatim — five marks for five memorised sentences.'
]
},
memory: {
teachBack: 'Recite the five 3.2 FIBs, then the five MCQs, then the repeater list in under three minutes; check against the answer key.'
},
practice: [
{ type: 'cloze',
  prompt: 'Model-answer check: the pair of glands at the base of the penis are the ______ glands; the bladder\'s powerful muscularis muscle is the ______; the cup receiving a renal papilla\'s urine is a minor ______.',
  accept: ['bulbourethral; detrusor; calyx','bulbourethral, detrusor, calyx'],
  explanation: 'The three anatomical FIBs of Module 3.2 — all answer-key exact.',
  src: { ref: 'hss.revans', location: 'p3 "Bulbourethral"' } },
{ type: 'mcq',
  prompt: 'The ______ is the most superior part of the stomach (3.3 FIB), while the ______ is the rounded part of the uterus above the tube attachment.',
  options: ['Fundus; fundus','Cardia; fundus','Fundus; cervix','Body; fundus'],
  answer: 0,
  explanation: '"Fundus" names the dome in BOTH organs — a favourite paired-blank trap.',
  src: { ref: 'hss.revans', location: 'p3 "Fundus"' } },
{ type: 'cloze',
  prompt: '2017 exam labels: the uterine-tube regions [28], [29], [30] are the ______, ______ and ______.',
  accept: ['infundibulum, ampulla, isthmus','infundibulum; ampulla; isthmus'],
  explanation: 'From ovary side to uterus: infundibulum (fimbriae), ampulla, isthmus.',
  src: { ref: 'hss.pp1718', location: 'p3 "Regions of the uterine tube (posterior view)"' } },
{ type: 'mcq',
  prompt: 'The ureter penetrates the ______ wall of the urinary bladder (5-year repeater):',
  options: ['anterior','posterior','lateral','superior'],
  answer: 1,
  explanation: 'POSTERIOR — at an oblique angle, forming the anti-reflux valve.',
  src: { ref: 'hss.pp1718', location: 'p3 "penetrates the"' } },
{ type: 'cloze',
  prompt: 'Crossword-check: the muscle wrinkling the scrotal skin is the ______; the muscle retracting the testes is the ______; the renal vessel entry/exit is the ______.',
  accept: ['dartos; cremaster; hilum','dartos, cremaster, hilum'],
  explanation: 'Dartos (smooth, wrinkles), cremaster (skeletal, retracts), hilum — all Module-3 crossword answers.',
  src: { ref: 'hss.revans', location: 'p4 "Cremaster"' } },
{ type: 'mcq',
  prompt: 'Which of these does NOT originate from the aorta?',
  options: ['Suprarenal artery','Testicular artery','Uterine artery','Ovarian artery'],
  answer: 2,
  explanation: 'Model answer C: the uterine artery arises from the INTERNAL ILIAC artery; gonadal and suprarenal arteries come from the aorta.',
  src: { ref: 'hss.manual1920', location: 'p38 "NOT originate from the aorta"' } }
],
application: [
{ type: 'scenario',
  prompt: 'Run a five-minute mock for a classmate covering Module 3: ask one FIB from each of the five-year repeater rows (hilum, ureter, corpus spongiosum, seminal gland, cremaster) plus the tube-segment labelling. Which five wrong answers should you expect, and what is the correction for each?',
  model: 'Expect: (1) "renal pelvis" or "medulla" for the vessel entry/exit — correct to the HILUM; (2) "anterior" or "superior" bladder wall — correct to POSTERIOR (oblique, anti-reflux); (3) corpora cavernosa enclosing the urethra — correct to the corpus SPONGIOSUM; (4) prostate as the 60%-of-semen gland — correct to the SEMINAL GLAND (prostate adds the rest, bulbourethral the pre-ejaculate); (5) dartos retracting the testes — correct to the CREMASTER (dartos wrinkles), and the tube segments in order infundibulum→ampulla→isthmus, NOT isthmus first.',
  rubric: [
'Asks all five repeater FIBs plus the tube labelling',
'Catches all five predictable wrong answers',
'Gives the deck-correct answer for each with the distinguishing detail'
  ]
}
],
commonMistakes: [
'Writing "renal pelvis" where the blank wants the hilum.',
'Writing "hepatic vein"-style shortcuts — in 3.2 the trap pair is clitoris vs vestibular bulbs; give the answer-key term but know the deck equivalence.',
'Ordering the uterine tube isthmus → ampulla → infundibulum — it runs infundibulum → ampulla → isthmus from the ovary.',
'Claiming the uterine artery comes from the aorta — it springs from the internal iliac.'
],
skills: [
'Score the Module 3.2 revision exercise full marks in under five minutes.',
'Recite the five-year repeater list from memory on demand.'
],
selfCheck: 'Blank page: five FIBs, five MCQs, the repeater list, and the [28]/[29]/[30] tube labels — then check the answer key.',
sourceRefs: [
  { ref: 'hss.revans', location: 'p3 "Bulbourethral"' },
  { ref: 'hss.revans', location: 'p3 "Detrusor"' },
  { ref: 'hss.revans', location: 'p3 "Calyx"' },
  { ref: 'hss.revans', location: 'p3 "Clitoris"' },
  { ref: 'hss.revans', location: 'p3 "Hymen"' },
  { ref: 'hss.revans', location: 'p3 "Psoas; Quadratus lumborum; erector spinae"' },
  { ref: 'hss.revans', location: 'p3 "The 10th thoracic vertebra (T10)"' },
  { ref: 'hss.revans', location: 'p3 "Fundus"' },
  { ref: 'hss.revans', location: 'p3 "Fimbriae; ampulla; uterine (fallopian) tube"' },
  { ref: 'hss.revans', location: 'p4 "Ureteropelvic junction"' },
  { ref: 'hss.revans', location: 'p4 "Left kidney"' },
  { ref: 'hss.revans', location: 'p4 "Spleen"' },
  { ref: 'hss.revans', location: 'p4 "Trigone"' },
  { ref: 'hss.revans', location: 'p4 "Cremaster"' },
  { ref: 'hss.manual1920', location: 'p36 "arch along the boundary between the cortex and medulla"' },
  { ref: 'hss.manual1920', location: 'p36 "tubular portion that is distal to the loop of Henle"' },
  { ref: 'hss.manual1920', location: 'p36 "Spermatic cord contains the following except"' },
  { ref: 'hss.manual1920', location: 'p36 "passageway area between the internal os and external os"' },
  { ref: 'hss.manual1920', location: 'p36 "How many efferent ductules"' },
  { ref: 'hss.manual1920', location: 'p38 "NOT originate from the aorta"' },
  { ref: 'hss.manual1920', location: 'p38 "most superior part of the stomach"' },
  { ref: 'hss.fib5yr', location: 'p12 "Hilum: entry and exit of renal vessels"' },
  { ref: 'hss.fib5yr', location: 'p12 "Ureter penetrates posterior wall"' },
  { ref: 'hss.fib5yr', location: 'p12 "cremaster muscle"' },
  { ref: 'hss.fib5yr', location: 'p12 "Glomerulus: compact ball"' },
  { ref: 'hss.fib5yr', location: 'p12 "pampiniform plexus"' },
  { ref: 'hss.fib5yr', location: 'p12 "blood-testis barrier: sustentacular cells"' },
  { ref: 'hss.fib5yr', location: 'p12 "medulla of ovary: blood vessels and nerves"' },
  { ref: 'hss.fib5yr', location: 'p12 "Uterosacral + ovarian + suspensory ligament"' },
  { ref: 'hss.fib5yr', location: 'p12 "minor calyx"' },
  { ref: 'hss.fib5yr', location: 'p12 "seminiferous tubules"' },
  { ref: 'hss.pp1718', location: 'p3 "point of entry and exit of renal vessels"' },
  { ref: 'hss.pp1718', location: 'p3 "conveys urine from the kidney to the bladder"' },
  { ref: 'hss.pp1718', location: 'p3 "active secretory structure posterior"' },
  { ref: 'hss.pp1718', location: 'p3 "tenses the scrotum taut"' },
  { ref: 'hss.pp1718', location: 'p3 "Regions of the uterine tube (posterior view)"' }
]
}
];

// insert the NEW item right after hss2011-uro-kidneys-urinary-tract
const after = items.find((x) => x.id === 'hss2011-uro-kidneys-urinary-tract');
for (const item of items) {
  const i = arr.findIndex((x) => x.id === item.id);
  if (item.id === 'hss2011-uro-nephron-renal-microanatomy') {
    if (arr.some((x) => x.id === item.id)) throw new Error('new item already exists');
    const at = arr.findIndex((x) => x.id === after.id) + 1;
    arr.splice(at, 0, item);
    continue;
  }
  if (i < 0) throw new Error('id not found: ' + item.id);
  arr[i] = item;
}
const out = head + MARK + JSON.stringify(arr, null, 2) + ';\n';
fs.writeFileSync(FILE, out.replace(/\r?\n/g, '\r\n'));

// wire the new id into WEEK_STUDY.HSS2011[12]
const SCHED = 'outputs/schedule.js';
let s = fs.readFileSync(SCHED, 'utf8');
const needle = "'hss2011-uro-kidneys-urinary-tract',\n      'hss2011-uro-male-reproductive-anatomy',";
if (!s.includes(needle)) throw new Error('schedule WEEK_STUDY[12] pattern not found');
s = s.replace(needle, "'hss2011-uro-kidneys-urinary-tract',\n      'hss2011-uro-nephron-renal-microanatomy',\n      'hss2011-uro-male-reproductive-anatomy',");
fs.writeFileSync(SCHED, s.replace(/\r?\n/g, '\r\n'));
console.log('wrote', FILE, '-', items.length, 'items (1 NEW), total', arr.length, '; schedule[12] wired');
