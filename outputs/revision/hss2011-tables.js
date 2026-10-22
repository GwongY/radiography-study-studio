/* HSS2011 tables — ported from HSS2011_build/30_tables.html. Each numbered section is wrapped and tagged data-wk, the latest week it mentions. */
export const TABLES_HTML = `<h2>Tables</h2>
  <p>Four look-ups that stitch the weeks together: spinal levels to plexuses, the cranial nerves with the bones and muscles they serve, every joint with its movers, and the pairs of look-alike terms.</p>
  <div class="subnav">
    <a href="#tb-spinal" data-jump="tb-spinal">Spinal level → plexus</a>
    <a href="#tb-cn" data-jump="tb-cn">Cranial nerves</a>
    <a href="#tb-joints" data-jump="tb-joints">Joints</a>
    <a href="#tb-twins" data-jump="tb-twins">Twin pairs</a>
    <a href="#tb-nums" data-jump="tb-nums">Numbers</a>
    <a href="#tb-check" data-jump="tb-check">Double-check list</a>
  </div>

  <div class="rv-sec"><h3 id="tb-spinal">1 · Spinal level → plexus → region (W5 joined to W2, W3, W4)</h3>
  <div class="tw"><table>
  <thead><tr><th>Cord level</th><th>Plexus</th><th>Serves</th><th>Muscles live in</th></tr></thead>
  <tbody>
  <tr data-wk="5"><td>C1–C5</td><td><b>Cervical plexus</b></td><td>Diaphragm, some neck and back muscles.</td><td>W4 (neck); breathing is Module 3</td></tr>
  <tr data-wk="5"><td>C5–T1<br><span class="pill">cervical enlargement</span></td><td><b>Brachial plexus</b>, from the ventral rami of C5–T1</td><td>The upper limb: the arm is basically innervated by the brachial plexus.</td><td>W3</td></tr>
  <tr data-wk="5"><td>T1–T12</td><td>No plexus <span class="star">★</span></td><td>Lateral horn here = sympathetic outflow.</td><td>W4, W7</td></tr>
  <tr data-wk="5"><td>L1–L4<br><span class="pill">lumbosacral enlargement</span></td><td><b>Lumbar plexus</b></td><td>Sensory from the hip and knee joints; motor to the hip, thigh and scrotum.</td><td>W2</td></tr>
  <tr data-wk="5"><td>L4–S4<br><span class="pill">lumbosacral enlargement</span></td><td><b>Sacral plexus</b></td><td>Gives rise to the sciatic nerve.</td><td>W2</td></tr>
  <tr data-wk="5"><td>Below the cord</td><td><b>Cauda equina</b> (roots hanging in the vertebral canal)</td><td>Innervates pelvic and lower limbs (slide). The adult cord ends around L1–L2 <span class="star">★</span>, shorter than the 33-vertebra column.</td><td>W4 + W5</td></tr>
  </tbody></table></div>
  <p class="hint">Which named nerve supplies which muscle is not examined in HSS2011; the plexuses and their levels are.</p></div>
<div class="rv-sec"><h3 id="tb-cn">2 · The 12 cranial nerves, tied to bone, muscle and brain (W4 + W6 + W7)</h3>
  <div class="note-box">Names (slide mnemonic): <b>O</b>h <b>o</b>nce <b>o</b>ne <b>t</b>akes <b>t</b>he <b>a</b>natomy <b>f</b>inal, <b>v</b>ery <b>g</b>ood <b>v</b>acation <b>ah</b>ead.
  Types <span class="star">★</span>: <b>S</b>ome <b>S</b>ay <b>M</b>arry <b>M</b>oney, <b>B</b>ut <b>M</b>y <b>B</b>rother <b>S</b>ays <b>B</b>ig <b>B</b>rains <b>M</b>atter <b>M</b>ore = S S M M B M B S B B M M. Nuclei: <b>midbrain</b> III–IV · <b>pons</b> V–VIII · <b>medulla</b> VIII–XII.</div>
  <div class="tw"><table>
  <thead><tr><th>Nerve</th><th>Type</th><th>Job (from slides)</th><th>Level</th><th>Link back to bone / muscle (W4)</th><th>Link forward / sideways</th></tr></thead>
  <tbody>
  <tr data-wk="7"><td>I Olfactory</td><td>Sensory</td><td>Smell</td><td>Mucosa → olfactory bulb</td><td>Fibres cross the ethmoid bone <span class="star">★</span></td><td>Straight to olfactory cortex, limbic system; skips thalamus</td></tr>
  <tr data-wk="7"><td>II Optic</td><td>Sensory</td><td>Vision</td><td>Retina → thalamus / midbrain</td><td>Optic canal (sphenoid) in the orbit</td><td>Chiasm, LGN, occipital lobe</td></tr>
  <tr data-wk="6"><td>III Oculomotor</td><td>Motor</td><td>SR, MR, IR, IO</td><td>Midbrain</td><td>Four extraocular muscles</td><td>Parasympathetic: pupil and lens <span class="star">★</span></td></tr>
  <tr data-wk="6"><td>IV Trochlear</td><td>Motor</td><td>Superior oblique</td><td>Midbrain</td><td>SO tendon through the trochlea</td><td>Smallest job, longest name: pulley</td></tr>
  <tr data-wk="6"><td>V Trigeminal</td><td>Mixed</td><td>V1 upper face, V2 middle, V3 lower face + chewing</td><td>Pons</td><td>V2 ↔ maxilla, V3 ↔ mandible. V3 drives temporalis, masseter, pterygoids</td><td>TMJ movements</td></tr>
  <tr data-wk="6"><td>VI Abducens</td><td>Motor</td><td>Lateral rectus</td><td>Pons</td><td>Abducts the eye</td><td>Pairs with III for horizontal gaze</td></tr>
  <tr data-wk="6"><td>VII Facial</td><td>Mixed</td><td>Facial expression; taste front ⅔; tears, saliva, nasal and oral mucus</td><td>Pons</td><td>Facial expression muscles</td><td>Parasympathetic (craniosacral list)</td></tr>
  <tr data-wk="7"><td>VIII Vestibulocochlear</td><td>Sensory</td><td>Hearing and equilibrium</td><td>Inner ear → medulla + pons</td><td>Temporal bone: internal acoustic meatus <span class="star">★</span></td><td>Cerebellum, eye muscles, posture</td></tr>
  <tr data-wk="6"><td>IX Glossopharyngeal</td><td>Mixed</td><td>Taste back ⅓; pharynx and soft palate sensation; salivation; swallowing</td><td>Medulla</td><td>Pharyngeal muscle</td><td>Parasympathetic (parotid <span class="star">★</span>)</td></tr>
  <tr data-wk="6"><td>X Vagus</td><td>Mixed</td><td>Taste (palate, pharynx, epiglottis); hunger, GI discomfort; swallowing, speech, heart rate, bronchoconstriction</td><td>Medulla</td><td>Pharynx, larynx, tongue base</td><td>Parasympathetic to the viscera (Modules 3 and 4)</td></tr>
  <tr data-wk="6"><td>XI Accessory</td><td>Motor</td><td>Swallowing; head, neck, shoulder movement</td><td>Medulla + C1–C6</td><td>Trapezius (W3/W4) and SCM (W4), palate, pharynx</td><td>Cervical cord roots</td></tr>
  <tr data-wk="6"><td>XII Hypoglossal</td><td>Motor</td><td>Tongue movement: speech, food handling, swallowing</td><td>Medulla</td><td>Tongue muscles</td><td>Speech and swallowing thread</td></tr>
  </tbody></table></div></div>
<div class="rv-sec"><h3 id="tb-joints">3 · Joints: type → movements → movers (W1 + W2 + W3 + W4)</h3>
  <div class="tw"><table>
  <thead><tr><th>Joint</th><th>Type</th><th>Movements</th><th>Main movers</th></tr></thead>
  <tbody>
  <tr data-wk="3"><td>Shoulder (glenohumeral)</td><td>Ball-and-socket</td><td>Flex, extend, abduct, adduct, circumduct, rotate</td><td>Flex: anterior deltoid, clavicular pec major · Extend: posterior deltoid, lat dorsi, teres major · Abduct: supraspinatus (first 0–15°) then deltoid · Adduct: pec major, lat dorsi, teres major · Medial rotation: subscapularis · Lateral rotation: infraspinatus, teres minor</td></tr>
  <tr data-wk="3"><td>Scapula (pectoral girdle)</td><td>Glides on the chest wall</td><td>Elevate, depress, protract, retract, rotate up/down</td><td>Elevate: upper trapezius, levator scapulae · Depress: lower trapezius, pec minor · Protract: serratus anterior · Retract: middle trapezius, rhomboids · Upward rotation: trapezius + serratus anterior</td></tr>
  <tr data-wk="3"><td>Elbow (humeroulnar, humeroradial)</td><td>Hinge</td><td>Flexion, extension</td><td>Flex: brachialis (always), biceps (supinated), brachioradialis (mid-prone) · Extend: triceps</td></tr>
  <tr data-wk="3"><td>Radioulnar</td><td>Pivot</td><td>Pronation, supination</td><td>Supinate: biceps, supinator · Pronate: pronator teres, pronator quadratus</td></tr>
  <tr data-wk="3"><td>Wrist (radiocarpal + intercarpal)</td><td>Condyloid (+ plane)</td><td>Flex, extend, radial and ulnar deviation</td><td>Flex: FCR, FCU · Extend: ECRL, ECRB, ECU</td></tr>
  <tr data-wk="3"><td>Fingers: MCP (2–5) / IP</td><td>Condyloid / hinge</td><td>Flex, extend, abduct, adduct</td><td>FDS (middle phalanx), FDP (distal), ED, EI · Lumbricals flex MCP + extend IP · <b>PAD</b>: palmar interossei adduct · <b>DAB</b>: dorsal interossei abduct</td></tr>
  <tr data-wk="3"><td>Thumb CMC</td><td>Saddle</td><td>Flex, extend, abduct, adduct, circumduct, oppose</td><td>FPL, FPB, abductor pollicis brevis, opponens pollicis, adductor pollicis, EPL, EPB</td></tr>
  <tr data-wk="2"><td>Hip (acetabulofemoral)</td><td>Ball-and-socket</td><td>Flex, extend, abduct, adduct, rotate</td><td>Flex: iliopsoas (strongest), pectineus, rectus femoris, sartorius, TFL · Extend: gluteus maximus (strongest), hamstrings, adductor magnus (posterior) · Abduct: gluteus medius, minimus, TFL · Adduct: adductor group · Medial rotate: glut. medius, minimus, TFL · Lateral rotate: glut. maximus + deep lateral rotators</td></tr>
  <tr data-wk="2"><td>Knee</td><td>Hinge (tibiofemoral + patellofemoral)</td><td>Flexion, extension</td><td>Extend: quadriceps (rectus femoris + 3 vasti) · Flex: hamstrings · Rectus femoris is the only quadriceps muscle that also flexes the hip</td></tr>
  <tr data-wk="2"><td>Ankle (talocrural)</td><td>Hinge</td><td>Dorsiflexion, plantarflexion</td><td>Dorsiflex: tibialis anterior (+EHL, EDL) · Plantarflex: gastrocnemius, soleus</td></tr>
  <tr data-wk="2"><td>Subtalar</td><td>Plane</td><td>Inversion, eversion</td><td>Invert: tibialis anterior + posterior · Evert: fibularis longus + brevis</td></tr>
  <tr data-wk="4"><td>Atlanto-occipital</td><td>Condyloid</td><td>Nodding "yes" <span class="star">★</span></td><td>Flex: SCM, scalenes · Extend: trapezius, splenius</td></tr>
  <tr data-wk="4"><td>Atlantoaxial</td><td>Pivot</td><td>Rotation "no" <span class="star">★</span></td><td>SCM (rotates to the opposite side), splenius (same side <span class="star">★</span>)</td></tr>
  <tr data-wk="4"><td>Vertebral facet joints</td><td>Plane</td><td>Cervical: all · Thoracic: rotation (ribs limit the rest) · Lumbar: flex/extend</td><td>Erector spinae (extend; lateral flex one side) · Transversospinalis (stabilise) · Rectus abdominis, obliques, transversus (flex, rotate)</td></tr>
  <tr data-wk="4"><td>Temporomandibular</td><td>Hinge + glide</td><td>Elevate, depress, protrude, retrude, side-to-side</td><td>Elevate: temporalis, masseter, medial pterygoid · Depress: lateral pterygoid · Protrude: pterygoids · Retrude: temporalis</td></tr>
  </tbody></table></div></div>
<div class="rv-sec"><h3 id="tb-twins">4 · Twin pairs: look-alike terms, one rule each</h3>
  <div class="tw"><table>
  <thead><tr><th>Pair</th><th>Rule that separates them</th></tr></thead>
  <tbody>
  <tr data-wk="5"><td>Ganglion vs nucleus</td><td>Both = clump of cell bodies. <b>Ganglion = PNS</b> (posterior root ganglion, autonomic ganglia). <b>Nucleus = CNS</b> (cranial nerve nuclei, basal nuclei).</td></tr>
  <tr data-wk="5"><td>Tract vs nerve</td><td>Both = bundle of axons. <b>Tract = CNS</b> (corticospinal). <b>Nerve = PNS</b> (epineurium, perineurium, endoneurium).</td></tr>
  <tr data-wk="5"><td>Oligodendrocyte vs Schwann</td><td>Both make myelin. <b>Oligodendrocyte = CNS, one cell → several segments.</b> <b>Schwann = PNS, one cell → one segment</b> and helps regeneration.</td></tr>
  <tr data-wk="5"><td>Afferent vs efferent</td><td><b>Af</b>ferent = <b>a</b>rrives at the CNS (sensory). <b>Ef</b>ferent = <b>e</b>xits the CNS (motor).</td></tr>
  <tr data-wk="5"><td>Somatic vs visceral</td><td>Somatic = skin, muscle, bone, joint (voluntary). Visceral = internal organs, involuntary muscle.</td></tr>
  <tr data-wk="5"><td>Posterior vs anterior root</td><td>Posterior (dorsal) = sensory, has the ganglion. Anterior (ventral) = motor.</td></tr>
  <tr data-wk="5"><td>Anterior vs posterior ramus</td><td>Anterior = front and sides, forms plexuses → limbs. Posterior = back muscles and skin.</td></tr>
  <tr data-wk="5"><td>Gray vs white (cord vs brain)</td><td>Cord: gray inside (H), white outside. Brain: gray outside (cortex) plus deeper nuclei, white inside.</td></tr>
  <tr data-wk="6"><td>Projection, commissural, association</td><td>Projection = up and down. Commissural = across (corpus callosum). Association = same side.</td></tr>
  <tr data-wk="6"><td>Cerebral vs cerebellar peduncle</td><td>Cerebral peduncle = midbrain stalk carrying tracts to the cerebrum. Cerebellar peduncles (inferior, middle, superior) = medulla, pons, midbrain links to the cerebellum.</td></tr>
  <tr data-wk="6"><td>Superior vs inferior colliculus</td><td>Superior = sight (visual reflex, tracking). Inferior = sound (auditory reflex, startle).</td></tr>
  <tr data-wk="6"><td>Primary vs association cortex</td><td>Primary = directly wired to sensory/motor neurons. Association = interprets and plans.</td></tr>
  <tr data-wk="7"><td>Sympathetic vs parasympathetic</td><td>See the autonomic thread: thoracolumbar + short pre/long post vs craniosacral + long pre/short post.</td></tr>
  <tr data-wk="5"><td>Chemical vs electrical synapse</td><td>Chemical = cleft + neurotransmitter (ACh). Electrical = gap junction, ions pass directly.</td></tr>
  <tr data-wk="7"><td>Utricle vs saccule</td><td>Utricle = horizontal macula. Saccule = vertical macula. Both = linear movement; semicircular ducts = rotation.</td></tr>
  <tr data-wk="7"><td>Rods vs cones</td><td>Rods = night, monochrome. Cones = day, colour (trichromatic).</td></tr>
  <tr data-wk="7"><td>Taste cell vs olfactory receptor</td><td>Taste cell = epithelial, 7–10 days, via thalamus. Olfactory receptor = true neuron, ~60 days, skips the thalamus.</td></tr>
  <tr data-wk="6"><td>Fast pain vs slow pain</td><td>Fast = myelinated Type A, localised. Slow = Type C, diffuse.</td></tr>
  <tr data-wk="7"><td>Aqueous humor vs vitreous body</td><td>Aqueous = watery fluid made by the ciliary processes, front chambers. Vitreous = jelly behind the lens, holds the shape.</td></tr>
  <tr data-wk="7"><td>Palpebral vs bulbar conjunctiva</td><td>Palpebral lines the eyelid. Bulbar covers the front of the eyeball.</td></tr>
  <tr data-wk="1"><td>Origin vs insertion</td><td>Origin = fixed end (usually proximal). Insertion = moving end (usually distal).</td></tr>
  <tr data-wk="1"><td>Myotendinous vs osteotendinous</td><td>Myo = tendon meets muscle (tendon organ sits here). Osteo = tendon meets bone.</td></tr>
  <tr data-wk="1"><td>Intrinsic vs extrinsic ligament</td><td>Intrinsic = thickening of the capsule. Extrinsic = separate from the capsule.</td></tr>
  <tr data-wk="1"><td>Compact vs spongy bone</td><td>Compact = outer shell, strength. Spongy = inner web, light, shock.</td></tr>
  <tr data-wk="1"><td>Red vs yellow marrow</td><td>Red = makes blood cells. Yellow = fat and mesenchymal stem cells.</td></tr>
  </tbody></table></div></div>
<div class="rv-sec"><h3 id="tb-nums">5 · Numbers worth knowing cold</h3>
  <div class="tw"><table class="num">
  <thead><tr><th>Item</th><th>Number</th><th>Breakdown</th></tr></thead>
  <tbody>
  <tr data-wk="1"><td>Bones</td><td>206</td><td>Axial 80 + appendicular 126</td></tr>
  <tr data-wk="4"><td>Skull</td><td>22</td><td>8 cranial + 14 facial</td></tr>
  <tr data-wk="4"><td>Vertebrae</td><td>33</td><td>7 C + 12 T + 5 L + 5 S (fused) + 4 Co</td></tr>
  <tr data-wk="5"><td>Spinal nerves</td><td>31 pairs</td><td>8 C + 12 T + 5 L + 5 S + 1 Co. Eight cervical nerves exist because C1–C7 leave above their vertebra and C8 leaves below C7 <span class="star">★</span></td></tr>
  <tr data-wk="6"><td>Cranial nerves</td><td>12 pairs</td><td>3 sensory, 5 motor, 4 mixed</td></tr>
  <tr data-wk="5"><td>Spinal cord</td><td>45 cm × 1.8 cm</td><td>4 regions, 2 enlargements</td></tr>
  <tr data-wk="6"><td>Meninges</td><td>3</td><td>Dura, arachnoid, pia</td></tr>
  <tr data-wk="6"><td>Ventricles</td><td>4</td><td>2 lateral, 3rd, 4th</td></tr>
  <tr data-wk="5"><td>Glia</td><td>6</td><td>CNS 4 (oligodendrocyte, ependymal, microglia, astrocyte) + PNS 2 (Schwann, satellite)</td></tr>
  <tr data-wk="6"><td>Cerebral lobes</td><td>5</td><td>Frontal, parietal, occipital, temporal, insula</td></tr>
  <tr data-wk="6"><td>Brain shares</td><td>83% / 10%</td><td>Cerebrum / cerebellum</td></tr>
  <tr data-wk="6"><td>Brainstem</td><td>3 parts</td><td>Midbrain, pons, medulla</td></tr>
  <tr data-wk="4"><td>Extraocular muscles</td><td>6</td><td>4 recti + 2 obliques</td></tr>
  <tr data-wk="4"><td>Orbit bones</td><td>7</td><td>Frontal, sphenoid, ethmoid, lacrimal, zygomatic, maxilla, palatine</td></tr>
  <tr data-wk="7"><td>Eye tunics</td><td>3</td><td>Fibrous, vascular (uvea), neural (retina)</td></tr>
  <tr data-wk="7"><td>Ear ossicles</td><td>3</td><td>Malleus, incus, stapes</td></tr>
  <tr data-wk="7"><td>Primary tastes</td><td>5</td><td>Sweet, salty, sour, bitter, umami</td></tr>
  <tr data-wk="3"><td>Carpal bones</td><td>8</td><td>Sam Likes To Push The Toy Car Hard</td></tr>
  <tr data-wk="1"><td>Motor unit size</td><td>13–20 vs ~2000</td><td>Eye muscle vs calf</td></tr>
  <tr data-wk="7"><td>Receptor turnover</td><td>7–10 days / ~60 days</td><td>Taste cells / olfactory receptors</td></tr>
  </tbody></table></div></div>
<div class="rv-sec"><h3 id="tb-check">6 · Double-check list: where the slides and standard textbooks differ or stay silent</h3>
  <div class="note-box" data-wk="6"><b>Facial nerve and chewing.</b> The W6 slide lists "muscles for mastication" under VII's motor targets. Standard textbooks give the chewing muscles to <b>V3</b>; VII is for facial expression (plus stapedius <span class="star">★</span>, tears, saliva). Use V3 for chewing unless your lecturer says otherwise.</div>
  <div class="note-box" data-wk="5"><b>Plexus ranges.</b> The slide gives sacral + coccygeal plexus as "L4 to S4". Many texts call L4–S4 the <i>sacral</i> plexus (part of the lumbosacral plexus) and put the coccygeal plexus at S4–Co1.</div>
  <div class="note-box" data-wk="6"><b>"Basal ganglia".</b> Slide uses basal nuclei. "Ganglion" strictly means PNS, so "nuclei" is the neat name.</div>
  <div class="note-box" data-wk="7"><b>Hearing route.</b> The slides stop at CN VIII → medulla/pons and list the inferior colliculus for auditory reflexes. The thalamus and temporal-lobe steps are standard-textbook <span class="star">★</span>.</div></div>`;
