/* HSS2011 decoder — ported from HSS2011_build/40_decoder.html. Each row carries data-wk, the week of its group. */
export const DECODER_HTML = `<h2>Decoder</h2>
  <div class="dq">
    <label for="dq" class="mono" style="color:var(--muted);text-transform:uppercase;letter-spacing:.06em;font-size:.78rem">Filter</label>
    <input id="dq" type="search" placeholder="e.g. tongue, hammer, tail, knee…" autocomplete="off">
    <span id="dcount" class="mono" style="color:var(--muted)"></span>
  </div>

  <div class="note-box"><b>Reading muscle names (W2–W4).</b> Almost every limb muscle = <b>action + target + side or size</b>. <i>Flexor carpi ulnaris</i> = wrist (carpi) flexor on the ulnar side. <i>Extensor hallucis longus</i> = long big-toe (hallucis) extensor. Key words: <b>pollicis</b> = thumb · <b>hallucis</b> = big toe · <b>digitorum</b> = fingers or toes · <b>digiti minimi</b> = little finger or toe · <b>longus / brevis</b> = long / short · <b>superficialis / profundus</b> = near the surface / deep · <b>rectus / transversus / obliquus</b> = straight / across / slanting.</div>

  <div class="tw"><table id="dtable">
  <thead><tr data-wk="1"><th>Term</th><th>Decode → one hook</th></tr></thead>
  <tbody>
  <tr class="grp" data-wk="1"><td colspan="2">Week 1 · bone, joint, muscle</td></tr>
  <tr data-wk="1"><td>Periosteum</td><td>peri (around) + osteo (bone) → the bone's sleeve, and it has pain nerves, so a bruised shin really hurts.</td></tr>
  <tr data-wk="1"><td>Osteoblast / -cyte / -clast</td><td>-blast builds, -cyte is the mature resident, -clast cracks it open → <b>Blast Builds, Clast Crushes</b>.</td></tr>
  <tr data-wk="1"><td>Synarthrosis, amphiarthrosis, diarthrosis</td><td>syn (together) = stuck · amphi (both sides) = a little · dia (apart) = dances freely → <b>Stuck, a little, Dance</b>.</td></tr>
  <tr data-wk="1"><td>Synovial</td><td>syn + ovum (egg) → the fluid looks like slippery raw egg white.</td></tr>
  <tr data-wk="1"><td>Bursa</td><td>Latin "purse" → a small fluid-filled purse stuffed between tendon and bone.</td></tr>
  <tr data-wk="1"><td>Condyloid</td><td>condyle = knuckle → knuckle joints bend and wiggle side to side but don't twist (MCP, wrist).</td></tr>
  <tr data-wk="1"><td>Sesamoid</td><td>sesame seed → a seed buried inside a tendon "bun" (the kneecap is the big one).</td></tr>
  <tr data-wk="1"><td>Sarcomere</td><td>sarco (flesh) + mere (part) → one Lego brick of flesh; thousands in a row make a myofibril.</td></tr>
  <tr data-wk="1"><td>Epi-, peri-, endo-mysium (and -neurium)</td><td>epi on top · peri around a bundle · endo inside → <b>Epi = whole, Peri = bundle, Endo = each single fibre</b>. Muscle = -mysium, nerve = -neurium.</td></tr>
  <tr data-wk="1"><td>Fascicle</td><td>"little bundle of sticks" → a tied-up bundle inside a muscle or a nerve.</td></tr>
  <tr data-wk="1"><td>Fusiform / pennate</td><td>fusus (spindle) → torpedo shape · penna (feather) → fascicles slant off the tendon like a feather's barbs; uni = half feather, bi = full, multi = many.</td></tr>
  <tr data-wk="1"><td>Origin vs insertion</td><td><b>Origin stays, Insertion Itches (moves)</b>.</td></tr>
  <tr data-wk="1"><td>Tendon vs ligament</td><td><b>tEndon = muscle to bone</b>; ligament = ligature, a knot between bone and bone.</td></tr>
  <tr class="grp" data-wk="2"><td colspan="2">Week 2 · pelvis and lower limb</td></tr>
  <tr data-wk="2"><td>Acetabulum</td><td>"little vinegar cup" → the cup-shaped hip socket (acetabulo-femoral joint).</td></tr>
  <tr data-wk="2"><td>Gluteus maximus / medius / minimus</td><td>gloutos (buttock) + biggest / middle / smallest → max extends, medius + minimus level the pelvis.</td></tr>
  <tr data-wk="2"><td>Iliopsoas</td><td>ilium + psoas (loin) → sits on the iliac bone and the loin; the strongest hip flexor.</td></tr>
  <tr data-wk="2"><td>Sartorius</td><td>sartor = tailor → picture a tailor seated cross-legged.</td></tr>
  <tr data-wk="2"><td>Quadriceps</td><td>quad (four) + ceps (head) → four heads: rectus femoris + three vasti.</td></tr>
  <tr data-wk="2"><td>Hamstring</td><td>butchers hung hams by these cords → the stringy tendons at the back of the knee.</td></tr>
  <tr data-wk="2"><td>Gastrocnemius</td><td>gastro (belly) + kneme (leg) → the belly of the leg, i.e. the calf bulge.</td></tr>
  <tr data-wk="2"><td>Soleus</td><td>solea = sole (the flatfish or the sandal) → a flat muscle under the gastrocnemius that works when you stand.</td></tr>
  <tr data-wk="2"><td>Tibia / fibula</td><td>tibia = flute (the big shin pipe) · fibula = brooch or pin (the thin pin beside it).</td></tr>
  <tr data-wk="2"><td>Peroneal = fibular</td><td>Same bone, two names: <b>peroneal</b> and <b>fibularis</b> both mean "of the fibula".</td></tr>
  <tr data-wk="2"><td>Talus / calcaneus</td><td>talus = ankle · calcaneus from calx = heel → the heel bone.</td></tr>
  <tr data-wk="2"><td>Navicular, cuboid, cuneiform</td><td>little boat · cube · wedge → shapes of three tarsal bones.</td></tr>
  <tr data-wk="2"><td>Dorsiflexion / plantarflexion</td><td>dorsum of the foot up toward the shin vs plantar sole pushed down → <b>Plantar = Press the pedal</b>.</td></tr>
  <tr class="grp" data-wk="3"><td colspan="2">Week 3 · shoulder girdle and upper limb</td></tr>
  <tr data-wk="3"><td>Clavicle</td><td>"little key" → the collarbone looks like an old skeleton key.</td></tr>
  <tr data-wk="3"><td>Radius / ulna</td><td>radius = spoke, it rotates around the ulna; thumb side · ulna = elbow, little-finger side.</td></tr>
  <tr data-wk="3"><td>Pronation / supination</td><td>prone = face down, supine = face up → <b>supination = carrying a bowl of soup</b>.</td></tr>
  <tr data-wk="3"><td>Biceps / triceps brachii</td><td>two heads / three heads of the arm (brachium) → triceps = long, lateral, medial.</td></tr>
  <tr data-wk="3"><td>Deltoid, trapezius, rhomboid, serratus</td><td>Δ shape · trapezoid shape · rhombus shape · serra = saw (jagged saw-tooth edge).</td></tr>
  <tr data-wk="3"><td>Latissimus dorsi</td><td>widest muscle of the back (latissimus = widest).</td></tr>
  <tr data-wk="3"><td>Supraspinatus / infraspinatus / subscapularis</td><td>above the spine of the scapula / below it / under the scapula → plus teres minor = <b>SITS</b>, the rotator cuff.</td></tr>
  <tr data-wk="3"><td>Lumbricals</td><td>lumbricus = earthworm → thin worm-like muscles in the palm.</td></tr>
  <tr data-wk="3"><td>Interossei</td><td>inter + ossei = between the bones → <b>PAD</b>: Palmar ADduct · <b>DAB</b>: Dorsal ABduct.</td></tr>
  <tr data-wk="3"><td>Thenar / hypothenar</td><td>thenar = palm pad at the thumb · hypo = under → the pad at the little finger.</td></tr>
  <tr data-wk="3"><td>Flexor digitorum superficialis / profundus</td><td>superficial = near the surface, reaches the middle phalanges · profundus = deep, reaches the <b>D</b>istal phalanges → <b>Deep goes Distal</b>.</td></tr>
  <tr data-wk="3"><td>Pollicis / hallucis</td><td>thumb / big toe → FPL = flexor pollicis longus (long thumb flexor); EHL = extensor hallucis longus (long big-toe extender).</td></tr>
  <tr class="grp" data-wk="4"><td colspan="2">Week 4 · head, neck and trunk</td></tr>
  <tr data-wk="4"><td>Sphenoid / ethmoid</td><td>sphen = wedge (wedged in the middle of the skull) · ethmos = sieve (the olfactory plate is full of holes).</td></tr>
  <tr data-wk="4"><td>Zygomatic, vomer, mandible</td><td>yoke (cheek bar) · ploughshare · mandere = to chew.</td></tr>
  <tr data-wk="4"><td>Lambdoid suture</td><td>shaped like the Greek letter λ at the back of the skull.</td></tr>
  <tr data-wk="4"><td>Masseter / temporalis / pterygoid</td><td>masseter = chewer · temporalis over the temple · pterygoid = wing-like (pterodactyl wings from the sphenoid).</td></tr>
  <tr data-wk="4"><td>Sternocleidomastoid</td><td>stern + cleido (clavicle) + mastoid. Neck flexor; unilateral = turns the face to the opposite side.</td></tr>
  <tr data-wk="4"><td>Scalene</td><td>scalenos = uneven triangle → three muscles of unequal length.</td></tr>
  <tr data-wk="4"><td>Splenius</td><td>splenion = bandage → a bandage wrapped over the back of the neck.</td></tr>
  <tr data-wk="4"><td>Erector spinae</td><td>"makes the spine erect" → the thick columns on each side of your spine.</td></tr>
  <tr data-wk="4"><td>Rectus / oblique / transversus abdominis</td><td>fibres run straight · slanting · across → three directions like plywood layers.</td></tr>
  <tr data-wk="4"><td>Quadratus lumborum</td><td>four-sided muscle of the loin (lumbar).</td></tr>
  <tr data-wk="4"><td>Atlas / axis</td><td>Atlas carries the sky (skull) · axis = pivot, the one the atlas turns on for "no".</td></tr>
  <tr data-wk="4"><td>Sacrum / coccyx</td><td>os sacrum = sacred bone · kokkyx = cuckoo → the tail-bone is a cuckoo's beak.</td></tr>
  <tr data-wk="4"><td>Intorsion / extorsion</td><td>torsion = twist; in = top of the eye twists toward the nose, ex = away.</td></tr>
  <tr class="grp" data-wk="5"><td colspan="2">Week 5 · nervous tissue, cord, spinal nerves</td></tr>
  <tr data-wk="5"><td>Afferent / efferent</td><td><b>Af</b>ferent = <b>a</b>rrives at the CNS, <b>ef</b>ferent = <b>e</b>xits.</td></tr>
  <tr data-wk="5"><td>Soma, axon, dendrite</td><td>body · axis (the axle) · dendron = tree → branches that catch signals.</td></tr>
  <tr data-wk="5"><td>Pseudounipolar</td><td>pseudo = false, uni = one → the name describes its apparent single stem; picture the Y-shaped branch.</td></tr>
  <tr data-wk="5"><td>Ganglion</td><td>Greek "knot" → a knot of cell bodies tied onto a PNS nerve like a knot on a rope.</td></tr>
  <tr data-wk="5"><td>Satellite cell</td><td>circles the soma in a ganglion like a satellite.</td></tr>
  <tr data-wk="5"><td>Astrocyte, microglia, oligodendrocyte, ependymal</td><td>star cell · tiny glue cell (immune) · few-branched cell (that wraps many axons) · ependyma = "outer garment", the coat lining the cavities.</td></tr>
  <tr data-wk="5"><td>Glia</td><td>"glue" → sticks neurons together and looks after them.</td></tr>
  <tr data-wk="5"><td>Myelin</td><td>myelos = marrow → the fatty white sheath; makes white matter white.</td></tr>
  <tr data-wk="5"><td>Synapse</td><td>syn + haptein (clasp) → two cells clasped at a gap.</td></tr>
  <tr data-wk="5"><td>Acetylcholinesterase</td><td>-ase = enzyme that breaks down → the ACh eraser that ends each signal.</td></tr>
  <tr data-wk="5"><td>Decussation</td><td>decussis = Roman numeral X (ten) → crossing in the shape of an X: left brain controls the right body.</td></tr>
  <tr data-wk="5"><td>Cauda equina / caudal / caudate</td><td>cauda = tail → horse's tail of nerve roots · toward the tail · the tail-shaped nucleus of the basal nuclei.</td></tr>
  <tr data-wk="5"><td>Dura, arachnoid, pia mater</td><td>tough mother · spider-web · tender mother → <b>Dura Durable outside, Arachnoid spiderweb under it, Pia hugs the brain</b>. Sub-arachnoid = the space under the web, filled with CSF.</td></tr>
  <tr data-wk="5"><td>Plexus</td><td>Latin "braid" → anterior rami plait together like hair. The choroid plexus is a braid of capillaries.</td></tr>
  <tr data-wk="5"><td>Ramus</td><td>"branch" → anterior / posterior ramus of the spinal nerve.</td></tr>
  <tr data-wk="5"><td>Dermatome</td><td>derma (skin) + tome (slice) → a slice of skin served by one spinal nerve.</td></tr>
  <tr data-wk="5"><td>Shingles</td><td>cingulum = belt → a belt-shaped rash. The cingulate gyrus of the limbic system shares the same "belt" root.</td></tr>
  <tr class="grp" data-wk="6"><td colspan="2">Week 6 · brain and cranial nerves</td></tr>
  <tr data-wk="6"><td>Gyrus / sulcus / fissure</td><td>Gyrus = a hill (gyrate), sulcus = a groove you sulk in, fissure = a deeper big groove (longitudinal fissure).</td></tr>
  <tr data-wk="6"><td>Cerebellum</td><td>cerebrum + -ellum (little) → "little brain" tucked under the back.</td></tr>
  <tr data-wk="6"><td>Vermis, folia, arbor vitae</td><td>worm (midline strip) · leaves (surface folds) · tree of life (white matter branching like a tree).</td></tr>
  <tr data-wk="6"><td>Pons</td><td>Latin "bridge" → bridge between the cerebellum, midbrain and medulla.</td></tr>
  <tr data-wk="6"><td>Medulla oblongata</td><td>medulla = marrow, oblongata = elongated → the elongated marrow where the brainstem turns into the cord.</td></tr>
  <tr data-wk="6"><td>Colliculus</td><td>little hill → <b>Superior = Sight, Inferior = "Inner-ear" sound</b>.</td></tr>
  <tr data-wk="6"><td>Substantia nigra, red nucleus</td><td>black substance (dark pigment) · red nucleus (rich blood supply) → both in the midbrain, both tune movement.</td></tr>
  <tr data-wk="6"><td>Reticular formation</td><td>reticulum = little net → loose net of gray matter running up the brainstem.</td></tr>
  <tr data-wk="6"><td>Peduncle</td><td>ped = foot → a stalk. Cerebral = to the cerebrum (midbrain); cerebellar = three stalks to the cerebellum (medulla, pons, midbrain).</td></tr>
  <tr data-wk="6"><td>Diencephalon, thalamus, hypothalamus</td><td>di- = between, encephalon = brain · thalamos = inner chamber (the brain's bedroom/switchboard) · hypo = under it.</td></tr>
  <tr data-wk="6"><td>Corpus callosum</td><td>"tough body" (callous) → thick bridge of fibres between hemispheres.</td></tr>
  <tr data-wk="6"><td>Insula</td><td>insula = island → picture a small island of cortex tucked within a larger fold.</td></tr>
  <tr data-wk="6"><td>Limbic, hippocampus, amygdala</td><td>limbus = border (rim around the brainstem) · seahorse · almond → <b>"hippo never forgets"</b> (memory) and the almond-shaped fear centre.</td></tr>
  <tr data-wk="6"><td>Putamen, globus pallidus</td><td>husk or shell · pale globe → two basal nuclei beside the tail-shaped caudate.</td></tr>
  <tr data-wk="6"><td>Saccade</td><td>French "jerk" → the jerky fast eye jump orchestrated by the frontal eye field.</td></tr>
  <tr data-wk="6"><td>Oculomotor</td><td>oculus (eye) + motor → the eye mover.</td></tr>
  <tr data-wk="6"><td>Trochlear</td><td>trochlea = pulley → superior oblique's tendon runs through a pulley.</td></tr>
  <tr data-wk="6"><td>Trigeminal</td><td>tri + gemini (twins) → "triple twin": three branches V1, V2, V3 down the face.</td></tr>
  <tr data-wk="6"><td>Abducens</td><td>ab + ducere (lead) → leads the eye away: lateral rectus.</td></tr>
  <tr data-wk="6"><td>Vestibulocochlear</td><td>vestibule (entrance hall) + cochlea (snail) → hearing from the snail, balance from the hall.</td></tr>
  <tr data-wk="6"><td>Glossopharyngeal</td><td>glossa (tongue) + pharynx (throat) → tongue + throat nerve (back-third taste, swallow).</td></tr>
  <tr data-wk="6"><td>Vagus</td><td>"wanderer" (vagabond) → wanders from the brainstem all the way to the gut.</td></tr>
  <tr data-wk="6"><td>Hypoglossal</td><td>hypo (under) + glossa (tongue) → the nerve under the tongue; moves it.</td></tr>
  <tr class="grp" data-wk="7"><td colspan="2">Week 7 · senses and autonomic</td></tr>
  <tr data-wk="7"><td>Nociceptor</td><td>nocere = to harm (noxious) → harm sensor = pain receptor.</td></tr>
  <tr data-wk="7"><td>Exteroceptor, interoceptor, proprioceptor</td><td>outside · inside · proprius (one's own) → <b>my own position</b>: muscle spindle, Golgi tendon organ.</td></tr>
  <tr data-wk="7"><td>Thermo-, chemo-, mechano-, photo-</td><td>heat · chemicals · mechanical deformation · light.</td></tr>
  <tr data-wk="7"><td>Lamellated corpuscle</td><td>lamella = thin layer → onion-skin capsule that senses deep pressure and high-frequency vibration.</td></tr>
  <tr data-wk="7"><td>Gustation / olfaction</td><td>gustus = taste · olfacere = to smell.</td></tr>
  <tr data-wk="7"><td>Papilla: filiform, fungiform, circumvallate</td><td>thread-like (no taste buds) · mushroom-like · surrounded by a wall (circum + vallum: a trench) → V at the back with >100 buds.</td></tr>
  <tr data-wk="7"><td>Umami</td><td>Japanese 旨味・うま味, "delicious taste" → the meaty, glutamate taste.</td></tr>
  <tr data-wk="7"><td>Glomerulus</td><td>"little ball" → a ball of converging olfactory axons in the bulb.</td></tr>
  <tr data-wk="7"><td>Auricle, tympanic, ossicle</td><td>little ear · drum (tympanon) · little bone.</td></tr>
  <tr data-wk="7"><td>Malleus, incus, stapes</td><td>hammer · anvil · stirrup → hammer strikes the anvil, the anvil rocks the stirrup into the oval window.</td></tr>
  <tr data-wk="7"><td>Labyrinth, vestibule, cochlea</td><td>maze · entrance hall · snail shell → the inner ear's maze of tubes.</td></tr>
  <tr data-wk="7"><td>Utricle, saccule, otolith</td><td>little bag · little sac · oto (ear) + lith (stone) = ear stones → <b>Saccule = Standing (vertical), Utricle = U-shaped floor (horizontal)</b>.</td></tr>
  <tr data-wk="7"><td>Ampulla, cupula</td><td>flask · little cup → the flask that holds the cup-shaped gel that endolymph pushes.</td></tr>
  <tr data-wk="7"><td>Stereocilia, tectorial</td><td>stiff hairs · roof (tectum) → stiff hairs under a roof membrane.</td></tr>
  <tr data-wk="7"><td>Sclera, cornea, choroid</td><td>hard (white of the eye) · horn (clear horn-like window) · like a membrane (dark vascular layer).</td></tr>
  <tr data-wk="7"><td>Uvea</td><td>uva = grape → choroid + ciliary body + iris, like a peeled dark grape.</td></tr>
  <tr data-wk="7"><td>Iris, pupil, retina</td><td>rainbow · little doll (tiny reflection) · rete = net.</td></tr>
  <tr data-wk="7"><td>Ciliary body</td><td>cilium = eyelash → hair-like folds around the lens.</td></tr>
  <tr data-wk="7"><td>Conjunctiva, palpebra</td><td>"joins together" (lid to eyeball) · eyelid.</td></tr>
  <tr data-wk="7"><td>Lacrimal, caruncle, punctum, canaliculus</td><td>tear · little flesh · point · little canal → follow the tear: gland → caruncle → punctum → canaliculus → sac → duct → nose.</td></tr>
  <tr data-wk="7"><td>Rods / cones</td><td>shape of the receptor → <b>Cones = Colour, rods = night "rods of dusk"</b>.</td></tr>
  <tr data-wk="7"><td>Melanopsin</td><td>melano (dark) + opsin (light protein) → the clock-setting pigment of some ganglion cells.</td></tr>
  <tr data-wk="7"><td>Optic chiasm</td><td>Greek letter chi Χ → an X where the optic nerves cross. Chiasm and decussation are both "X crossings".</td></tr>
  <tr data-wk="7"><td>Lateral geniculate nucleus</td><td>genu = knee → the knee-bent nucleus of the thalamus (same root as genu valgum, knock-knee).</td></tr>
  <tr data-wk="7"><td>Autonomic</td><td>auto + nomos (law) → self-governing.</td></tr>
  <tr data-wk="7"><td>Sympathetic / parasympathetic</td><td>"feeling with" (the body responds together under stress) · para = beside → the one next to it that calms.</td></tr>
  <tr data-wk="7"><td>Preganglionic / postganglionic</td><td>before the ganglion / after it → <b>pre = from the CNS to the ganglion, post = from ganglion to organ</b>.</td></tr>
  <tr data-wk="7"><td>Thoracolumbar / craniosacral</td><td>chest + loin cord segments = sympathetic · skull + sacrum = parasympathetic.</td></tr>
  <tr data-wk="7"><td>Baroreceptor</td><td>baros = pressure (as in barometer) → pressure sensor in vessel walls.</td></tr>
  <tr class="grp" data-wk="8"><td colspan="2">Week 8 · heart and vessels</td></tr>
  <tr data-wk="8"><td>Pericardium</td><td>peri (around) + kardia (heart); the same peri- prefix appears in periosteum, around bone.</td></tr>
  <tr data-wk="8"><td>Epicardium, myocardium, endocardium</td><td>epi (upon) · myo (muscle) · endo (inside) + cardium → <b>outside skin, middle muscle, inner lining</b>.</td></tr>
  <tr data-wk="8"><td>Mesothelium</td><td>meso (middle) + thele (nipple, thin layer) → the thin cell layer that makes pericardial fluid.</td></tr>
  <tr data-wk="8"><td>Atrium, ventricle</td><td>Latin "entrance hall" · "little belly" → the receiving room and the pumping belly.</td></tr>
  <tr data-wk="8"><td>Septum</td><td>Latin "partition" → the wall between two chambers.</td></tr>
  <tr data-wk="8"><td>Tricuspid, bicuspid, mitral</td><td>three points · two points · a bishop's mitre (two-peaked hat) → the mitral valve is the two-flap one.</td></tr>
  <tr data-wk="8"><td>Semilunar</td><td>semi (half) + luna (moon) → valve cusps shaped like half-moons.</td></tr>
  <tr data-wk="8"><td>Chordae tendineae</td><td>tendinous cords → the heart strings that hold the valve flaps.</td></tr>
  <tr data-wk="8"><td>Papillary muscle</td><td>papilla (nipple) → the nipple-shaped muscle that pulls on the cords.</td></tr>
  <tr data-wk="8"><td>Trabeculae carneae</td><td>little beams + fleshy → the fleshy ridges inside the ventricles.</td></tr>
  <tr data-wk="8"><td>Fossa ovalis, foramen ovale</td><td>oval pit · oval hole → <b>the hole closes after birth and leaves a pit</b>.</td></tr>
  <tr data-wk="8"><td>Coronary</td><td>corona (crown) → the arteries that crown the heart.</td></tr>
  <tr data-wk="8"><td>Aorta</td><td>Greek "that which is lifted" → the great artery rising from the left ventricle.</td></tr>
  <tr data-wk="8"><td>Arteriole, venule, metarteriole</td><td>-ole (little) · meta (beyond) → little artery · little vein · the branch beyond the arteriole.</td></tr>
  <tr data-wk="8"><td>Anastomosis</td><td>ana + stoma (mouth) → a joining of two channels, mouth to mouth.</td></tr>
  <tr data-wk="8"><td>Fenestrated</td><td>fenestra (window) → capillaries with windows (pores).</td></tr>
  <tr data-wk="8"><td>Sinusoid</td><td>sinus (hollow) + -oid (like) → a wide, leaky, hollow-like capillary.</td></tr>
  <tr data-wk="8"><td>Tunica intima, media, externa</td><td>coat · innermost, middle, outer → <b>In, Mid, Ex</b>.</td></tr>
  <tr data-wk="8"><td>Vasa vasorum, nervi vasorum</td><td>vessels of the vessels · nerves of the vessels.</td></tr>
  <tr data-wk="8"><td>Azygos, hemiazygos</td><td>a (not) + zygon (yoke, pair) → the unpaired vein · hemi (half) → the half-azygos on the left.</td></tr>
  <tr data-wk="8"><td>Ischaemia, infarct</td><td>ischein (hold back) + haima (blood) → blood held back · Latin "stuffed in" → the dead patch of tissue.</td></tr>
  <tr data-wk="8"><td>Angina</td><td>Latin "a strangling" → the tight, squeezing chest pain.</td></tr>
  <tr data-wk="8"><td>Atherosclerosis</td><td>athere (porridge) + sclerosis (hardening) → soft fatty plaque that hardens the artery wall.</td></tr>
  <tr data-wk="8"><td>Tamponade</td><td>French "plug" → fluid plugging the sac so the heart cannot fill.</td></tr>
  <tr class="grp" data-wk="9"><td colspan="2">Week 9 · respiratory system</td></tr>
  <tr data-wk="9"><td>Pharynx</td><td>Greek pharynx = throat; pharyng/o is the root in nasopharynx, oropharynx and laryngopharynx.</td></tr>
  <tr data-wk="9"><td>Nasopharynx, oropharynx, laryngopharynx</td><td>naso (nose) · oro (mouth) · laryngo (voice box) + pharynx → the throat named for what lies in front of it.</td></tr>
  <tr data-wk="9"><td>Choanae</td><td>Greek "funnel" → the funnel-shaped back openings of the nasal cavity.</td></tr>
  <tr data-wk="9"><td>Adenoids</td><td>aden (gland) + -oid (like) → gland-like lymphoid tissue in the nasopharynx.</td></tr>
  <tr data-wk="9"><td>Uvula</td><td>Latin "little grape" → the small hanging lobe of the soft palate.</td></tr>
  <tr data-wk="9"><td>Piriform recess</td><td>pirum (pear) + form → a pear-shaped pocket beside the laryngeal inlet.</td></tr>
  <tr data-wk="9"><td>Epiglottis, glottis</td><td>epi (upon) + glottis (the opening of the larynx) → the lid sitting on the glottis.</td></tr>
  <tr data-wk="9"><td>Cricoid</td><td>krikos (ring) + -oid (like) → the ring-shaped cartilage.</td></tr>
  <tr data-wk="9"><td>Arytenoid</td><td>Greek "ladle-like" → the small cartilages shaped like a jug lip.</td></tr>
  <tr data-wk="9"><td>Trachea</td><td>Greek "rough (windpipe)" → the ridged tube of cartilage rings.</td></tr>
  <tr data-wk="9"><td>Bronchus, bronchiole</td><td>bronchos (windpipe) · -ole (small) → <b>-ole = little</b>, as in arteriole and venule.</td></tr>
  <tr data-wk="9"><td>Alveolus</td><td>Latin "small hollow" → the tiny air sac where gas is exchanged.</td></tr>
  <tr data-wk="9"><td>Pneumocyte</td><td>pneumo (air, lung) + cyte (cell) → a lung cell; Type I thin, Type II makes surfactant.</td></tr>
  <tr data-wk="9"><td>Surfactant</td><td>surface + active + agent → it lowers surface tension so alveoli do not collapse.</td></tr>
  <tr data-wk="9"><td>Pleura</td><td>Greek "rib, side" → the membrane lining the chest wall and covering the lung.</td></tr>
  <tr data-wk="9"><td>Visceral / parietal</td><td>viscera (organs) · paries (wall) → <b>visceral hugs the lung, parietal lines the wall</b>.</td></tr>
  <tr data-wk="9"><td>Diaphragm</td><td>dia (across) + phragma (partition) → the muscle wall across the body.</td></tr>
  <tr data-wk="9"><td>Phrenic</td><td>phren (diaphragm) → the nerve of the diaphragm.</td></tr>
  <tr data-wk="9"><td>Pneumothorax</td><td>pneumo (air) + thorax (chest) → air in the chest cavity.</td></tr>
  <tr data-wk="9"><td>Atelectasis</td><td>a (not) + telos (complete) + ektasis (stretching) → incomplete expansion, a collapsed lung or alveoli.</td></tr>
  <tr data-wk="9"><td>Apnoea</td><td>a (without) + pnoia (breathing) → breathing that stops, as in sleep apnoea.</td></tr>
  </tbody></table></div>`;
export const SOURCES_HTML = `<p class="foot">Free sources to confirm anything here: <a href="https://openstax.org/books/anatomy-and-physiology-2e/pages/4-introduction" target="_blank" rel="noopener">OpenStax Anatomy &amp; Physiology 2e</a> (the tissues chapter is linked on your Week 2 tutorial), the <a href="https://www.edx.org/course/human-anatomy" target="_blank" rel="noopener">ANA101x Human Anatomy MOOC</a> from the Week 1 reference list, and Martini's <i>Fundamentals of Anatomy &amp; Physiology</i> (the course textbook). Built from your Week 1–9 slides, the Week 2 tissue tutorial and the movement-terminology handout.</p>`;
