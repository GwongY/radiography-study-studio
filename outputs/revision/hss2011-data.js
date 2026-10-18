/*
 * HSS2011 Human Anatomy — revision data, Weeks 1-7.
 *
 * Ported from the owner's HSS2011_build reference (51_data.js, 53_tree.js).
 * NODES: one topic each; w = the weeks it was taught (the first is when it
 * appears), s = body-system colour group, th = thread ids, t = the note.
 * EDGES: [a, b, reason], an undirected cross-link. TREE: one parent per topic,
 * the mind-map skeleton. A star in a note marks a fact added from a textbook
 * that is not on the slides. Cantonese memory lines are the owner's request.
 */
/* s = system colour group, w = weeks taught, th = thread ids to open */
export const NODES = [
/* ---------------- tissues & cells ---------------- */
{id:'tissues', l:'4 tissue types', s:'tissue', w:[2], th:['t11'],
 t:`<b>Epithelial</b> covers, lines and secretes (every gland is epithelium). <b>Connective</b> supports, binds and stores (cells + fibres + ground substance; blood and lymph are the fibre-less members). <b>Muscle</b> contracts. <b>Nervous</b> conducts.<br>Every organ in Weeks 1–7 is these four stacked together. An eye = epithelium (conjunctiva) + connective (sclera) + muscle (iris, extraocular) + nervous (retina).`},
{id:'junctions', l:'Cell junctions', s:'tissue', w:[2,5,6],
 t:`<b>Tight</b> = seal (zip-lock). <b>Adherens</b> = anchor (velcro, rivets). <b>Gap</b> = tunnel (connexons pass ions and signals).<br>They come back as the tight junctions of the blood–brain barrier (W6), the gap junctions of electrical synapses (W5), and the intercalated discs of the heart (Module 3).`},
{id:'epithelium', l:'Epithelium', s:'tissue', w:[2,6,7], th:['t11'],
 t:`Sheets that cover, line and secrete: simple squamous (filter), cuboidal (absorb/secrete), columnar (absorb + mucus); stratified (protect); keratinised epidermis (dead cells, waterproof).<br>Nervous-system cameos: <b>ependymal cells</b> (line ventricles, make CSF), <b>taste cells</b> (epithelial, not neurons), <b>spiral organ</b> (thick epithelium), <b>olfactory epithelium</b> (its receptor cells ARE neurons), <b>conjunctiva</b>.`},
{id:'connective', l:'Connective tissue', s:'tissue', w:[1,2,6,7], th:['t11'],
 t:`Bone, cartilage, tendon, ligament, blood, fat. Cartilage types tie to organs: <b>hyaline</b> = articular surfaces <span class="star">★</span>, <b>fibrocartilage</b> = meniscus, <b>elastic</b> = the ear's auricle (W7).<br><b>Dura</b> is dense fibrous tissue, <b>sclera</b> dense collagenous, <b>tendon</b> dense regular.`},
/* ---------------- skeleton ---------------- */
{id:'bone', l:'Bone & marrow', s:'skel', w:[1],
 t:`<b>Compact</b> (dense outer shell, bears weight) + <b>spongy</b> (inner trabeculae, lighter, absorbs shock). Matrix: ⅔ calcium hydroxyapatite (strong, stiff) + ⅓ collagen (flexible).<br>Osteo<b>blast</b> builds, osteo<b>cyte</b> maintains, osteo<b>clast</b> dissolves. <b>Periosteum</b> wraps the outside (rich in vessels and nerves). Red marrow makes blood cells, yellow marrow stores fat. Five shapes: long, short, flat, irregular, sesamoid.`},
{id:'joints', l:'Joints', s:'skel', w:[1], th:['t1'],
 t:`Classified by region, mobility (synarthrosis, amphiarthrosis, diarthrosis) and structure (fibrous, cartilaginous, synovial).<br><b>Synovial</b> = capsule + synovial fluid (lubricates, absorbs shock, feeds cartilage) + articular cartilage ± meniscus ± bursae.<br><b>Shape decides motion:</b> plane (glide), hinge (one axis), pivot (rotate), condyloid (two axes), saddle (thumb CMC), ball-and-socket (all directions + rotation). See the Joints table.`},
{id:'ligcart', l:'Ligaments & cartilage', s:'skel', w:[1,2],
 t:`<b>Ligament</b> = bone-to-bone stabiliser (intrinsic e.g. cruciates; extrinsic e.g. collaterals). At the ankle an inversion sprain hits the <b>ATFL</b>, then the <b>CFL</b>; the strong <b>deltoid ligament</b> makes eversion injuries rarer. Knee <b>menisci</b> are fibrocartilage and can tear.`},
{id:'skull', l:'Skull', s:'skel', w:[4],
 t:`<b>8 cranial</b> bones (frontal, 2 parietal, 2 temporal, occipital, ethmoid, sphenoid) protect the brain. <b>14 facial</b> bones frame the airway and food entrance. Sutures: coronal, sagittal, lambdoid, squamous.<br><b>Doorways:</b> foramen magnum (brainstem ↔ cord), optic canal (CN II), orbital fissures, infraorbital foramen, internal acoustic meatus (CN VII/VIII <span class="star">★</span>). Mastoid process anchors SCM <span class="star">★</span>. The TMJ is temporal bone + mandible.`},
{id:'vertebrae', l:'Vertebral column', s:'skel', w:[4],
 t:`33 vertebrae: <b>C7 · T12 · L5 · S5 (fused) · Co4</b>. Atlas (C1) carries the skull (nod); axis (C2) with its <b>odontoid process</b> gives the "no" rotation. Facet orientation decides motion: cervical ~45° (everything), thoracic mostly frontal (rotation; ribs limit the rest), lumbar mostly sagittal (flex/extend). Discs cushion; the canal protects the cord.`},
{id:'ll_bones', l:'Pelvis & lower-limb bones', s:'skel', w:[2],
 t:`Hip bone = ilium + ischium + pubis; with sacrum and coccyx it forms the bony pelvis (carries weight, shields lower viscera). Femur → knee (patella, tibia) → tibia + fibula (interosseous membrane) → talus (ankle) → calcaneus, navicular, cuboid, 3 cuneiforms → metatarsals → phalanges.<br><b>Condyle</b> = joint surface; <b>epicondyle</b> = muscle attachment.`},
{id:'ul_bones', l:'Shoulder girdle & arm bones', s:'skel', w:[3],
 t:`Clavicle + scapula hang the arm from the sternum (manubrium). Humerus → radius (thumb side) + ulna (little-finger side), joined by the interosseous membrane → 8 carpals → 5 metacarpals → phalanges (3 per finger, 2 in the thumb).<br>Carpals: <b>S</b>am <b>L</b>ikes <b>T</b>o <b>P</b>ush <b>T</b>he <b>T</b>oy <b>C</b>ar <b>H</b>ard = Scaphoid, Lunate, Triquetrum, Pisiform, Trapezium, Trapezoid, Capitate, Hamate.`},
{id:'orbit', l:'Orbit (eye socket)', s:'skel', w:[4,7], th:['t3'],
 t:`Bony socket made of 7 bones: frontal, sphenoid, ethmoid, lacrimal, zygomatic, maxilla, palatine. Landmarks: supraorbital notch, <b>optic canal</b> (CN II), superior and inferior orbital fissures, infraorbital groove/foramen, lacrimal sulcus → <b>nasolacrimal canal</b> (tears drain into the nose).`},
/* ---------------- vocabulary ---------------- */
{id:'movements', l:'Movement vocabulary', s:'skel', w:[1,2,3,4],
 t:`Flexion/extension · abduction/adduction · medial/lateral rotation · pronation/supination (forearm) · dorsiflexion/plantarflexion (ankle) · inversion/eversion (foot) · elevation/depression · protraction/retraction (scapula) vs protrusion/retrusion (mandible) · circumduction · intorsion/extorsion (eye).<br><b>ab-</b> = away, <b>ad-</b> = toward. So the <i>abducens</i> nerve moves the eye away from the nose, and lateral rectus abducts.`},
{id:'orient', l:'Position & planes', s:'skel', w:[1],
 t:`Anterior/posterior (= ventral/dorsal), superior/inferior (cranial/caudal), medial/lateral, proximal/distal. Planes: coronal (front/back), sagittal (left/right), transverse (top/bottom).<br>These words return as anterior/posterior <i>horns, roots and rami</i> of the cord, and the planes are the ones you will scan in CT and MRI.`},
/* ---------------- muscles ---------------- */
{id:'musclestruct', l:'Muscle organisation', s:'musc', w:[1], th:['t1','t10'],
 t:`Muscle → fascicle → fibre (cell) → myofibril → <b>sarcomere</b> (actin + myosin, the contracting unit).<br>Wrappers: <b>epimysium</b> (whole muscle) → <b>perimysium</b> (each fascicle) → <b>endomysium</b> (each fibre), continuous with the tendon. Origin stays fixed; insertion moves. Fascicle patterns: fusiform, parallel, convergent, circular, pennate (uni/bi/multi). The Golgi tendon organ at the myotendinous junction senses tension.`},
{id:'motorunit', l:'Motor unit & tone', s:'musc', w:[1,5], th:['t1','t8'],
 t:`<b>Motor unit = one motor neuron + every fibre it supplies.</b> Eye muscle ≈ 13–20 fibres per neuron (fine control); calf ≈ 2000 (power).<br><b>Tone</b> = small groups of units firing in rotation even at rest, so the muscle stays firm.`},
{id:'fibretypes', l:'Fibre types', s:'musc', w:[1],
 t:`Slow oxidative (small, many capillaries and mitochondria, slow, weak, fatigue-resistant) ↔ fast glycolytic (large, fast, strong, tires quickly), with fast oxidative in between. Posture and endurance muscles lean slow <span class="star">★</span>; sprint and power muscles lean fast <span class="star">★</span>.`},
{id:'muscleroles', l:'Muscle teamwork', s:'musc', w:[2],
 t:`<b>Prime mover</b> (iliopsoas for hip flexion) · <b>synergist</b> (sartorius, TFL, pectineus) · <b>antagonist</b> (gluteus maximus, hamstrings) · <b>fixator</b> (abdominals steady the trunk). Muscles seldom work alone, which is also why the brain has a coordinator, the cerebellum.`},
{id:'ll_muscles', l:'Lower-limb muscles', s:'musc', w:[2], th:['t1'],
 t:`<b>Gluteal:</b> maximus (extend, lateral rotate), medius + minimus (abduct, medial rotate, steady the pelvis), deep lateral rotators (piriformis…).<br><b>Thigh:</b> anterior = iliopsoas, sartorius, TFL, quadriceps; medial = adductors + pectineus; posterior = hamstrings.<br><b>Leg:</b> anterior (dorsiflex), lateral (evert), deep posterior (plantarflex, invert), superficial posterior (gastrocnemius, soleus, plantaris).`},
{id:'ul_muscles', l:'Upper-limb muscles', s:'musc', w:[3], th:['t1'],
 t:`<b>Girdle</b> (trapezius, levator scapulae, rhomboids, serratus anterior, pec minor) positions the scapula. <b>Arm</b> (deltoid, pec major, lat dorsi, teres major) plus the <b>rotator cuff</b> SITS: supraspinatus (starts abduction 0–15°), infraspinatus + teres minor (lateral rotate), subscapularis (medial rotate); together they press the head into the glenoid.<br><b>Elbow:</b> brachialis, biceps, brachioradialis flex; triceps extends. <b>Forearm:</b> anterior = flexors/pronators, posterior = extensors/supinator. <b>Hand:</b> thenar, hypothenar, adductor pollicis, lumbricals, interossei.`},
{id:'headneck_muscles', l:'Head & neck muscles', s:'musc', w:[4], th:['t7'],
 t:`<b>Mastication:</b> temporalis, masseter, medial and lateral pterygoids. <b>Eye:</b> 4 recti + 2 obliques. <b>Tongue:</b> intrinsic (shape) + extrinsic (position). <b>Platysma</b> (expression). <b>SCM</b> and scalenes flex the neck; trapezius, splenius, semispinalis extend it. Suprahyoids and infrahyoids help open the mouth.`},
{id:'trunk_muscles', l:'Back & abdominal muscles', s:'musc', w:[4], th:['t8'],
 t:`<b>Back:</b> extrinsic (move shoulders, limbs, ribs) vs intrinsic (move and stabilise the spine): erector spinae (extend; lateral flex if one side), transversospinalis incl. multifidus and rotatores (fine control, posture).<br><b>Abdomen:</b> rectus abdominis, external and internal obliques, transversus abdominis. <b>Posterior wall:</b> psoas major, iliacus, quadratus lumborum.`},
{id:'extraocular', l:'Extraocular muscles', s:'musc', w:[4,6], th:['t3'],
 t:`Six per eye. MR adducts, LR abducts, SR elevates/intorts/adducts, IR depresses/extorts/adducts, SO intorts/depresses/abducts, IO extorts/elevates/abducts.<br><b>LR6, SO4, the rest 3</b> <span class="star">★</span> = which nerve drives which (VI, IV, III). The SO tendon loops through the <b>trochlea</b> (pulley), hence "trochlear".`},
/* ---------------- peripheral nerves ---------------- */
{id:'neuron', l:'Neuron', s:'pns', w:[5],
 t:`Soma (organelles) · dendrites (receive) · axon (conduct). Functional types: <b>afferent/sensory</b>, <b>interneuron</b> (≈90% of all neurons, integrate), <b>efferent/motor</b>. Structural types: multipolar, bipolar, unipolar (pseudounipolar is the posterior-root-ganglion kind <span class="star">★</span>). Properties: excitability, conductivity, secretion.`},
{id:'glia', l:'Glia', s:'pns', w:[5],
 t:`<b>CNS:</b> oligodendrocyte (myelin; one cell → several segments), ependymal (line ventricles, make CSF), microglia (immune), astrocyte (framework, blood–brain barrier, chemistry).<br><b>PNS:</b> Schwann (myelin; one cell → one segment; helps regeneration), satellite (around somas in ganglia).<br>Brain tumours mostly arise from glia, not neurons. In multiple sclerosis the myelin degenerates.`},
{id:'synapse', l:'Synapse & NMJ', s:'pns', w:[5], th:['t1'],
 t:`Pre- and postsynaptic cells; axodendritic, axosomatic, axoaxonic. <b>Chemical</b> (cleft; excitatory or inhibitory) vs <b>electrical</b> (gap junctions).<br><b>Cholinergic / NMJ sequence:</b> action potential arrives → Ca²⁺ enters terminal → ACh released → binds postsynaptic receptors (depolarises) → AChE removes ACh.`},
{id:'nervestruct', l:'Nerve structure', s:'pns', w:[5], th:['t10'],
 t:`Axon → myelin → <b>endoneurium</b> → <b>perineurium</b> (around a fascicle) → <b>epineurium</b> (whole nerve). Same three prefixes as muscle, and both have <i>fascicles</i>. A mixed nerve carries sensory and motor axons.`},
{id:'spinalnerves', l:'Spinal nerves', s:'pns', w:[5], th:['t1','t2'],
 t:`31 pairs: <b>8 C · 12 T · 5 L · 5 S · 1 Co</b>. Posterior (dorsal) root = sensory, carries the posterior root ganglion; anterior (ventral) root = motor. They merge → spinal nerve → <b>anterior ramus</b> (front and sides, forms plexuses), <b>posterior ramus</b> (back), meningeal branch.`},
{id:'plexuses', l:'Nerve plexuses', s:'pns', w:[5,2,3], th:['t1'],
 t:`Anterior rami weave into plexuses: <b>cervical</b> C1–C5 (diaphragm, neck), <b>brachial</b> C5–T1 (whole upper limb), <b>lumbar</b> L1–L4 (hip, thigh, genital skin), <b>sacral</b> L4–S4 (→ sciatic).<br><b>Rule:</b> the nerve follows the muscle compartment, so the compartment tells you the nerve. See the spinal-level table.`},
{id:'dermatomes', l:'Dermatomes', s:'pns', w:[5], th:['t2'],
 t:`Skin map of the spinal nerves (every one except C1). Neighbouring dermatomes overlap, so 2–3 nerves share a patch. <b>Shingles</b> = varicella-zoster travelling along one sensory nerve → a band-like rash in one dermatome.`},
{id:'cranialnerves', l:'12 cranial nerves', s:'pns', w:[6], th:['t7'],
 t:`Twelve pairs straight from brain and brainstem. <b>Sensory:</b> I, II, VIII · <b>Motor:</b> III, IV, VI, XI, XII · <b>Mixed:</b> V, VII, IX, X. Nuclei: midbrain (III, IV), pons (V–VIII), medulla (VIII–XII). Full table under Tables.`},
{id:'reflexes', l:'Reflexes', s:'pns', w:[5,7], th:['t2'],
 t:`Receptor → afferent → cord (interneuron) → efferent → effector; involuntary and stereotyped (spinal cord function no. 4). A <b>visceral reflex</b> uses the same circuit for organs, slower (e.g. baroreflex: high blood pressure → baroreceptors → medulla → vagus/sympathetic response). Muscle spindles and Golgi tendon organs feed these loops.`},
/* ---------------- brain & cord ---------------- */
{id:'spinalcord', l:'Spinal cord', s:'cns', w:[5], th:['t1','t2'],
 t:`45 cm × 1.8 cm from the brainstem down the vertebral canal; <b>cervical</b> and <b>lumbosacral enlargements</b> supply the limbs; ends as the <b>cauda equina</b> ("horse's tail").<br><b>Cross-section:</b> gray matter inside as an H (posterior horn = sensory, anterior horn = motor, lateral horn at T/L = sympathetic), white matter outside (posterior, lateral, anterior columns = tracts). Functions: conduction, integration, locomotion (CPGs), reflexes.`},
{id:'tracts', l:'Tracts & decussation', s:'cns', w:[5,6], th:['t1','t2'],
 t:`<b>Ascending</b> = sensory up to the brain; <b>descending</b> = motor down to effectors. <b>Decussation</b> (X-cross): left brain commands the right body.<br>Cerebral white matter: <b>projection</b> (up/down, e.g. corticospinal), <b>commissural</b> (left↔right, corpus callosum), <b>association</b> (same hemisphere).`},
{id:'meninges', l:'Meninges', s:'cns', w:[5,6], th:['t10'],
 t:`<b>Dura</b> (tough; cranial dura has an endosteal layer fixed to the skull and a meningeal layer, with sinuses between; folds = falx cerebri/cerebelli) → <b>arachnoid</b> (web; subarachnoid space holds CSF) → <b>pia</b> (hugs the tissue). Brain and cord share the same three.`},
{id:'csf', l:'CSF & ventricles', s:'cns', w:[6], th:['t10'],
 t:`Made by the <b>choroid plexus</b> (capillary tufts covered by ependymal cells). Route: 2 lateral ventricles → (interventricular foramen) 3rd → (cerebral aqueduct) 4th → central canal of the cord + subarachnoid space.<br>Jobs: buoyancy, cushioning, chemical stability.`},
{id:'bbb', l:'Brain barriers', s:'cns', w:[6], th:['t10'],
 t:`<b>Blood–brain barrier:</b> astrocytes touch capillaries and induce tight junctions between endothelial cells. <b>Blood–CSF barrier:</b> at the choroid plexus, formed by ependymal cells.`},
{id:'brainstem', l:'Brainstem', s:'cns', w:[6],
 t:`<b>Midbrain</b> (colliculi, cerebral peduncles, red nucleus, substantia nigra, CN III/IV) → <b>pons</b> (bridge; middle cerebellar peduncle; CN V–VIII) → <b>medulla</b> (cardiovascular and respiratory centres; nuclei gracilis, cuneatus, olivary, solitary; CN VIII–XII) → spinal cord through the foramen magnum.`},
{id:'reticular', l:'Reticular formation', s:'cns', w:[6], th:['t8'],
 t:`Loose gray "net" from medulla to midbrain. Adjusts muscle tone, balance and posture; cardiovascular control; blocks or modulates pain; sets sleep and consciousness; habituation (ignores repetitive stimuli).`},
{id:'cerebellum', l:'Cerebellum', s:'cns', w:[6], th:['t8'],
 t:`"Little brain" (~10% of volume): two hemispheres + vermis, folia, arbor vitae, Purkinje and granule cells. Peduncles: inferior (medulla), middle (pons), superior (midbrain).<br><b>Compares the motor command with proprioceptive input and corrects it</b>: posture, balance, fine-tuning.`},
{id:'thalamus', l:'Thalamus', s:'cns', w:[6], th:['t2'],
 t:`Final relay and filter for ascending sensation before the primary sensory cortex (five nucleus groups). Touch/pain, vision (lateral geniculate nucleus), taste (→ insula) and hearing <span class="star">★</span> all pass through. <b>Smell is the one sense that bypasses it.</b>`},
{id:'hypothalamus', l:'Hypothalamus', s:'cns', w:[6], th:['t5','t6'],
 t:`Walls and floor of the 3rd ventricle. Hormones (growth, metabolism, reproduction), autonomic control (heart rate, BP, digestion), emotion and feeding, thermoregulation, circadian rhythm. <b>Boss of the ANS.</b>`},
{id:'cerebrum', l:'Cerebrum & lobes', s:'cns', w:[6],
 t:`83% of brain volume. Hemispheres split by the longitudinal fissure, joined by the corpus callosum; folds = gyri, grooves = sulci. Lobes: <b>frontal</b> (higher cognition, motor), <b>parietal</b> (sensation), <b>occipital</b> (vision), <b>temporal</b> (hearing, smell), <b>insula</b> (taste, visceral sensation). Gray cortex outside, white matter inside, nuclei deep.`},
{id:'basalnuclei', l:'Basal nuclei', s:'cns', w:[6], th:['t8'],
 t:`Caudate, putamen, globus pallidus (lateral to the thalamus): plan and execute movement and send feedback to the motor cortex. Also called "basal ganglia", though strictly a ganglion is a PNS structure.`},
{id:'limbic', l:'Limbic system', s:'cns', w:[6], th:['t5'],
 t:`Emotion and learning: hippocampus, amygdala (no amygdala, no fear), cingulate gyrus. Smell connects here directly; the hypothalamus links emotion to the body.`},
{id:'cortexareas', l:'Cortical areas', s:'cns', w:[6], th:['t1','t7'],
 t:`<b>Primary</b> motor and sensory cortex (wired to upper motor and third-order neurons) · <b>association</b> areas (interpret sensation, plan movement) · <b>integrative</b>: prefrontal cortex, general interpretive area (language comprehension, usually left), speech centre = <b>Broca</b> (coordinates respiratory and tongue muscles), frontal eye field (saccades, visual attention).`},
/* ---------------- senses & autonomic ---------------- */
{id:'receptors', l:'Receptors', s:'sense', w:[7,1], th:['t2'],
 t:`By modality (thermo-, chemo-, noci-, mechano-, photo-) and origin (extero-, intero-, proprio-). <b>General senses</b> use simple receptors anywhere: pain, touch/pressure/vibration (free endings, hair, Merkel, tactile and lamellated corpuscles, Ruffini), temperature, chemistry, baroreceptors, <b>proprioceptors</b> (muscle spindles, Golgi tendon organs).<br>Smaller receptive field = denser receptors = finer two-point discrimination.`},
{id:'sensorypath', l:'Sensory pathway', s:'sense', w:[7,5,6], th:['t2'],
 t:`Pain example: nociceptor → <b>1st-order</b> neuron (soma in posterior root ganglion) → synapse in cord gray matter → <b>2nd-order</b> neuron decussates, climbs an ascending tract → synapse in thalamus or reticular formation → <b>3rd-order</b> neuron → primary somatosensory cortex → association area interprets.<br>Fast pain = myelinated Type A fibres; slow pain = Type C.`},
{id:'taste', l:'Taste', s:'sense', w:[7], th:['t5'],
 t:`Taste buds sit in filiform (texture only, no buds), fungiform (~5 buds) and circumvallate (>100 buds, V at the back) papillae, plus palate, pharynx, epiglottis. Taste cells are epithelial, live 7–10 days, replaced by basal cells. Five tastes: sweet, salty, sour, bitter, umami.<br>Nerves: VII (front ⅔), IX (back ⅓), X (palate/pharynx/epiglottis) → medulla → hypothalamus + amygdala (reflexes) and thalamus → insula (perception).`},
{id:'smell', l:'Smell', s:'sense', w:[7], th:['t5'],
 t:`Olfactory receptor cells are the <b>only neurons directly exposed to the outside world</b> (~60-day turnover). Cells with the same receptor converge on one glomerulus in the olfactory bulb → mitral and tufted cells → olfactory tract → primary olfactory cortex (<b>no thalamic relay</b>) → insula + limbic system, which is why smells trigger emotion.`},
{id:'ear_hearing', l:'Hearing (ear)', s:'sense', w:[7], th:['t4'],
 t:`<b>Outer:</b> auricle (elastic cartilage) → external acoustic meatus. <b>Middle:</b> tympanic membrane → malleus, incus, stapes (→ oval window); tensor tympani and stapedius dampen; eustachian tube to the nasopharynx. <b>Inner:</b> cochlea, spiral organ in the cochlear duct (hair cells under the tectorial membrane; K⁺ in → signal).<br>Path: drum → ossicles → inner-ear fluid → basilar membrane → hair cells → CN VIII.`},
{id:'ear_balance', l:'Balance (vestibular)', s:'sense', w:[7], th:['t4','t8'],
 t:`<b>Saccule</b> (vertical) and <b>utricle</b> (horizontal) maculae with otoliths sense static position and linear acceleration. <b>Semicircular ducts</b>: endolymph lags → the cupula bends hair cells in the ampulla → angular acceleration. All reported by CN VIII.`},
{id:'eye', l:'Eyeball', s:'sense', w:[7], th:['t3'],
 t:`<b>Accessory:</b> lashes, lids (tarsal glands), conjunctiva, lacrimal apparatus. <b>Wall:</b> fibrous (sclera + cornea) · vascular/uvea (choroid, ciliary body, iris) · neural (retina).<br><b>Optics:</b> cornea, aqueous humor, lens (suspensory ligament), vitreous. <b>Retina:</b> pigment epithelium, photoreceptors (rods night/mono; cones day/trichromatic), bipolar, ganglion (+melanopsin), amacrine, horizontal, Müller glia.`},
{id:'visualpath', l:'Visual pathway', s:'sense', w:[7,6], th:['t3'],
 t:`Photoreceptor → bipolar (1st) → retinal ganglion (2nd) → optic nerve (II) → <b>optic chiasm</b> (hemidecussation) → optic tract → lateral geniculate nucleus of the thalamus (3rd) → optic radiation → primary visual cortex (occipital).<br>Side branches: melanopsin ganglion cells → pretectal nucleus + superior colliculus (reflexes) and circadian rhythm.`},
{id:'ans', l:'Autonomic NS', s:'sense', w:[7], th:['t6'],
 t:`Unconscious control of heart rate, BP, temperature and digestion through visceral reflexes. <b>Two-neuron motor pathway</b> (preganglionic soma in brainstem/cord → autonomic ganglion → postganglionic → target), unlike somatic motor (one neuron). Hypothalamus and medulla are the command centres.`},
{id:'symp', l:'Sympathetic', s:'sense', w:[7], th:['t6'],
 t:`Fight-or-flight. <b>Thoracolumbar</b> outflow (lateral horn of T and L cord) → short preganglionic fibres → <b>sympathetic chain (paravertebral) ganglia</b> beside the vertebral column → long postganglionic fibres.`},
{id:'parasymp', l:'Parasympathetic', s:'sense', w:[7,6], th:['t6'],
 t:`Rest-and-digest. <b>Craniosacral</b>: CN III, VII, IX (head) and X (viscera) + sacral cord → long preganglionic fibres → terminal ganglia in or near the target → very short postganglionic fibres.`}
];

export const EDGES = [
/* tissues */
['tissues','epithelium','type 1'],['tissues','connective','type 2'],['tissues','musclestruct','type 3: muscle'],['tissues','neuron','type 4: nervous'],['tissues','junctions','held together by'],
['epithelium','glia','ependymal cells are epithelium-like'],['epithelium','taste','taste cells are epithelial'],['epithelium','smell','olfactory epithelium'],['epithelium','ear_hearing','spiral organ = thick epithelium'],['epithelium','eye','conjunctiva, pigment layer'],['epithelium','csf','covers the choroid plexus'],
['connective','bone','bone is connective tissue'],['connective','ligcart','cartilage, ligament'],['connective','meninges','dura = dense fibrous'],['connective','eye','sclera = dense collagenous'],['connective','ear_hearing','auricle = elastic cartilage'],['connective','musclestruct','tendon continues the wrappers'],
['junctions','bbb','tight junctions seal it'],['junctions','synapse','gap junctions = electrical synapse'],
/* skeleton */
['bone','joints','bones meet at'],['joints','ligcart','stabilised by'],['bone','skull','e.g.'],['bone','vertebrae','e.g.'],['bone','ll_bones','e.g.'],['bone','ul_bones','e.g.'],['bone','ear_hearing','ossicles are bones'],
['joints','movements','shape sets the movement'],['joints','ll_bones','hip, knee, ankle'],['joints','ul_bones','shoulder, elbow, wrist'],['joints','vertebrae','facet joints (plane)'],['joints','skull','TMJ, atlanto-occipital'],
['orient','movements','same vocabulary'],['orient','spinalcord','anterior / posterior roots and horns'],
['movements','ll_muscles','muscles produce them'],['movements','ul_muscles','muscles produce them'],['movements','headneck_muscles','muscles produce them'],['movements','trunk_muscles','muscles produce them'],
['skull','orbit','forms'],['skull','ear_hearing','houses the inner ear'],['skull','meninges','dura lined to skull'],['skull','cranialnerves','foramina are the doorways'],['skull','headneck_muscles','attachments'],['skull','vertebrae','atlas carries the skull'],['skull','brainstem','foramen magnum'],['skull','cerebrum','shields'],
['vertebrae','spinalcord','canal protects'],['vertebrae','spinalnerves','foramina let nerves out'],['vertebrae','trunk_muscles','move and stabilise'],['vertebrae','symp','chain ganglia lie alongside'],
['ll_bones','ll_muscles','attachments'],['ul_bones','ul_muscles','attachments'],
['orbit','eye','houses'],['orbit','extraocular','muscles inside'],['orbit','cranialnerves','optic canal, orbital fissures'],
/* muscle */
['musclestruct','motorunit','functional unit'],['musclestruct','fibretypes','fibre kinds'],['musclestruct','nervestruct','same wrappers: endo / peri / epi'],['musclestruct','ll_muscles','organised as'],['musclestruct','ul_muscles','organised as'],['musclestruct','headneck_muscles','organised as'],['musclestruct','trunk_muscles','organised as'],['musclestruct','receptors','tendon organ and spindle report back'],
['motorunit','synapse','NMJ'],['motorunit','spinalcord','motor neuron sits in anterior horn'],['motorunit','fibretypes','unit type matches fibre type'],['motorunit','reticular','reticular formation sets tone'],['motorunit','extraocular','13–20 fibres: precision'],['motorunit','cortexareas','upper motor neuron drives it'],
['muscleroles','ll_muscles','iliopsoas, sartorius…'],['muscleroles','ul_muscles','biceps, brachialis…'],['muscleroles','cerebellum','coordination in the brain'],
['ll_muscles','plexuses','lumbar + sacral plexus'],['ul_muscles','plexuses','brachial plexus'],['headneck_muscles','cranialnerves','V3, VII, XI, XII'],['trunk_muscles','spinalnerves','posterior / anterior rami'],['ll_muscles','trunk_muscles','iliopsoas and QL cross trunk ↔ hip'],['ul_muscles','headneck_muscles','trapezius also extends the neck (CN XI)'],['headneck_muscles','extraocular','includes'],['extraocular','cranialnerves','III, IV, VI'],['extraocular','eye','rotate'],['trunk_muscles','cerebellum','posture is corrected here'],
/* peripheral nerve */
['neuron','glia','supported by'],['neuron','synapse','talks across'],['neuron','nervestruct','axons bundle into'],['glia','nervestruct','Schwann cells myelinate'],['glia','csf','ependymal cells make CSF'],['glia','bbb','astrocytes build'],['neuron','spinalcord','cell bodies in gray matter'],['neuron','tracts','axons bundle into tracts'],['neuron','ans','pre- and postganglionic neurons'],
['nervestruct','spinalnerves','spinal nerve is one'],['spinalnerves','spinalcord','roots'],['spinalnerves','plexuses','anterior rami merge'],['spinalnerves','dermatomes','sensory skin strips'],['spinalnerves','symp','preganglionic fibres leave in the ventral root'],
['spinalcord','tracts','white matter = tracts'],['spinalcord','meninges','wrapped by'],['spinalcord','brainstem','continues as'],['spinalcord','csf','central canal'],['spinalcord','reflexes','reflex centre'],
['dermatomes','receptors','skin receptors'],['reflexes','receptors','spindles and tendon organs'],['reflexes','ans','visceral reflex'],
/* brain */
['tracts','cortexareas','corticospinal tract'],['tracts','sensorypath','ascending tracts'],['tracts','cerebrum','projection / commissural / association'],
['meninges','csf','subarachnoid space'],['meninges','cerebrum','wrap'],['csf','bbb','blood–CSF barrier'],['csf','brainstem','4th ventricle'],['csf','cerebrum','lateral ventricles'],
['brainstem','cranialnerves','nuclei of III–XII'],['brainstem','reticular','contains'],['brainstem','cerebellum','three peduncles'],['brainstem','thalamus','diencephalon sits on top'],['brainstem','ans','medulla: cardiovascular and respiratory centres'],['brainstem','visualpath','superior colliculus'],['brainstem','ear_hearing','inferior colliculus'],['brainstem','sensorypath','relay nuclei, pain via reticular formation'],
['cerebellum','receptors','compares with proprioception'],['cerebellum','ear_balance','balance'],['cerebellum','cortexareas','fine-tunes motor output'],
['reticular','sensorypath','pain relay and modulation'],
['thalamus','sensorypath','relay'],['thalamus','cortexareas','to primary cortex'],['thalamus','visualpath','lateral geniculate nucleus'],['thalamus','taste','→ insula'],['thalamus','smell','bypassed by smell'],['thalamus','hypothalamus','diencephalon'],
['hypothalamus','ans','controls'],['hypothalamus','visualpath','circadian rhythm'],['hypothalamus','taste','autonomic reflexes'],['hypothalamus','limbic','emotion ↔ body'],
['cerebrum','cortexareas','lobes hold'],['cerebrum','basalnuclei','nuclei deep inside'],['cerebrum','limbic','contains'],
['basalnuclei','cortexareas','plan and execute movement'],['limbic','smell','direct input'],['limbic','taste','amygdala'],
['cortexareas','headneck_muscles','Broca: tongue + breathing for speech'],['cortexareas','extraocular','frontal eye field'],
/* senses */
['cranialnerves','taste','VII, IX, X'],['cranialnerves','smell','I'],['cranialnerves','eye','II'],['cranialnerves','ear_hearing','VIII'],['cranialnerves','ear_balance','VIII'],['cranialnerves','parasymp','III, VII, IX, X'],
['receptors','sensorypath','1st-order neuron'],['ear_hearing','ear_balance','same inner ear'],['eye','visualpath','retina → brain'],['eye','ans','iris and ciliary muscle'],
['ans','symp','division'],['ans','parasymp','division'],['symp','spinalcord','lateral horn T/L'],['parasymp','spinalcord','sacral outflow']
];

/* One parent per topic = the mind-map skeleton. Cross-links (EDGES) are drawn on demand. */
export const TREE = {label:'HSS2011 · Weeks 1–7', kids:[
 {sys:'tissue', label:'Tissues & cells', kids:[
   {id:'tissues', kids:[{id:'epithelium'},{id:'connective'},{id:'junctions'}]}]},
 {sys:'skel', label:'Skeleton & joints', kids:[
   {id:'orient'},{id:'movements'},
   {id:'bone', kids:[{id:'skull', kids:[{id:'orbit'}]},{id:'vertebrae'},{id:'ll_bones'},{id:'ul_bones'}]},
   {id:'joints', kids:[{id:'ligcart'}]}]},
 {sys:'musc', label:'Muscles', kids:[
   {id:'musclestruct', kids:[{id:'motorunit'},{id:'fibretypes'},{id:'muscleroles'}]},
   {label:'Muscles by region', kids:[{id:'ll_muscles'},{id:'ul_muscles'},{id:'headneck_muscles', kids:[{id:'extraocular'}]},{id:'trunk_muscles'}]}]},
 {sys:'pns', label:'Peripheral nerves', kids:[
   {id:'neuron', kids:[{id:'glia'},{id:'synapse'}]},
   {id:'nervestruct', kids:[{id:'spinalnerves', kids:[{id:'plexuses'},{id:'dermatomes'}]}]},
   {id:'cranialnerves'},{id:'reflexes'}]},
 {sys:'cns', label:'Brain & spinal cord', kids:[
   {id:'spinalcord', kids:[{id:'tracts'}]},
   {label:'Brain', kids:[{id:'cerebrum', kids:[{id:'cortexareas'},{id:'basalnuclei'},{id:'limbic'}]},{id:'brainstem', kids:[{id:'reticular'}]},{id:'cerebellum'},{id:'thalamus'},{id:'hypothalamus'}]},
   {label:'Wrappers & barriers', kids:[{id:'meninges'},{id:'csf'},{id:'bbb'}]}]},
 {sys:'sense', label:'Senses & autonomic', kids:[
   {id:'receptors', kids:[{id:'sensorypath'}]},
   {label:'Special senses', kids:[{id:'taste'},{id:'smell'},{id:'eye', kids:[{id:'visualpath'}]},{label:'Ear', kids:[{id:'ear_hearing'},{id:'ear_balance'}]}]},
   {id:'ans', kids:[{id:'symp'},{id:'parasymp'}]}]}
]};
