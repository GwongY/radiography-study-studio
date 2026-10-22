/* HSS2011 threads — ported from HSS2011_build/20_threads.html. Each step <li> carries data-wk, the latest week it draws on. */
export const THREADS_HTML = `<h2>Threads</h2>
  <p>Each thread follows one real pathway and tags every step with the week it came from. Read them like a story: one signal, many weeks.</p>

<details class="thread" id="t1" open>
<summary>Brain to muscle: lifting a cup<small>W1 · W2 · W3 · W5 · W6</small></summary>
<div class="tbody">
<ol class="chain">
  <li data-wk="6"><span class="wk">W6</span><span class="hd">Plan.</span> Prefrontal and somatic motor association cortex plan the movement. The basal nuclei help plan and execute it. The cerebellum waits to compare the command with feedback.</li>
  <li data-wk="6"><span class="wk">W6</span><span class="hd">Command.</span> Primary motor cortex (frontal lobe) fires its <b>upper motor neurons</b>. Their axons run down as the <b>corticospinal tract</b>, a projection tract, through the cerebral peduncle (midbrain), pons and medulla.</li>
  <li data-wk="5"><span class="wk">W5</span><span class="hd">Cross.</span> The fibres <b>decussate</b>: the left hemisphere drives the right arm. The slide says "left brain sends motor commands to the right side of the body"; the crossing happens low in the medulla <span class="star">★</span>.</li>
  <li data-wk="5"><span class="wk">W5</span><span class="hd">Cord.</span> The tract synapses on a motor neuron in the <b>anterior horn</b> of gray matter at the <b>cervical enlargement</b> (the segments that feed the arm; C5–C6 for elbow flexion <span class="star">★</span>).</li>
  <li data-wk="5"><span class="wk">W5</span><span class="hd">Exit.</span> The axon leaves in the <b>anterior (ventral) root</b>, joins the posterior root to form the <b>spinal nerve</b>, then travels in the <b>anterior ramus</b> into the <b>brachial plexus</b> (C5–T1).</li>
  <li data-wk="3"><span class="wk">W3</span><span class="hd">Plexus to arm.</span> The arm is basically innervated by the <b>brachial plexus</b>, from the ventral rami of C5–T1.</li>
  <li data-wk="5"><span class="wk">W5</span><span class="wk">W1</span><span class="hd">Junction.</span> At the neuromuscular junction: action potential arrives → Ca²⁺ enters the terminal → ACh released → binds receptors and depolarises the fibre → AChE clears the ACh. One motor neuron plus the fibres it supplies is a <b>motor unit</b>; this one is calf-style big or eye-style tiny depending on the muscle.</li>
  <li data-wk="1"><span class="wk">W1</span><span class="hd">Muscle.</span> Sarcomeres shorten (actin sliding on myosin), the fascicle pulls, and force passes through the epimysium into the <b>tendon</b> and onto the insertion, the end that moves. The origin stays still.</li>
  <li data-wk="3"><span class="wk">W1</span><span class="wk">W3</span><span class="hd">Joint.</span> The elbow is a <b>hinge</b> (humeroulnar, humeroradial): flexion. Brachialis works in every forearm position, biceps works best with the palm up, brachioradialis best in mid-pronation. Triceps is the <b>antagonist</b>; shoulder muscles act as <b>fixators</b> (W2 teamwork vocabulary).</li>
  <li data-wk="7"><span class="wk">W1</span><span class="wk">W7</span><span class="wk">W6</span><span class="hd">Feedback.</span> The Golgi tendon organ (tension, at the myotendinous junction) and muscle spindles (length) fire sensory neurons up the posterior root and into the cord. The <b>cerebellum</b> compares them with the command and corrects it.</li>
</ol>
<div class="yue" data-wk="7"><b>廣東話</b>大腦落命令 → 上運動神經元（皮質脊髓束）→ 交叉（decussation，好似個「X」）→ 脊髓前角嘅運動神經元 → 前根 → 脊神經 → 神經叢 → 神經 → 肌肉 → 關節郁動。左腦控制右手；反饋由肌腱同肌梭上返小腦。</div>
<div class="cols">
  <div class="col"><h4>Same chain, kicking a ball</h4><p>Motor cortex → corticospinal tract → <b>lumbosacral enlargement</b> → anterior horn → <b>lumbar plexus</b> (L1–L4) → quadriceps extend the knee (rectus femoris also flexes the hip).</p></div>
  <div class="col"><h4>Same chain, lifting the toes</h4><p>… → <b>sacral plexus</b> (L4–S4) → tibialis anterior and the other anterior-compartment muscles dorsiflex the ankle.</p></div>
  <div class="col"><h4>Same chain, chewing</h4><p>Motor cortex → pons (CN V motor nucleus) → <b>V3</b> → temporalis, masseter, pterygoids → TMJ (hinge then glide). No plexus involved: cranial nerves go straight from brainstem to muscle.</p></div>
</div>
</div>
</details>

<details class="thread" id="t2">
<summary>Skin to cortex: pain, touch and the reflex shortcut<small>W5 · W6 · W7</small></summary>
<div class="tbody">
<ol class="chain">
  <li data-wk="7"><span class="wk">W7</span><span class="hd">Receptor.</span> Nociceptors are free nerve endings with large receptive fields, triggered by extreme temperature, mechanical damage and injured cells. Touch uses tactile receptors (hair, Merkel, tactile corpuscles, lamellated, Ruffini). Muscles, tendons and joints carry proprioceptors.</li>
  <li data-wk="5"><span class="wk">W5</span><span class="hd">1st-order neuron.</span> Its soma sits in the <b>posterior root ganglion</b>, wrapped by satellite cells. It enters the cord by the posterior root. Fast pain rides myelinated <b>Type A</b> fibres (myelin = speed); slow, diffuse pain rides <b>Type C</b>.</li>
  <li data-wk="5"><span class="wk">W5</span><span class="hd">Synapse in the cord.</span> Onto the 2nd-order neuron in gray matter (posterior horn).</li>
  <li data-wk="5"><span class="wk">W5</span><span class="hd">Cross and climb.</span> The 2nd-order axon <b>decussates in the cord</b> and ascends in an ascending tract of the white matter.</li>
  <li data-wk="6"><span class="wk">W6</span><span class="hd">Brainstem.</span> Pain collateral reaches the <b>reticular formation</b>, which both relays and modulates pain.</li>
  <li data-wk="7"><span class="wk">W6</span><span class="wk">W7</span><span class="hd">Thalamus.</span> Second synapse, onto the 3rd-order neuron. The thalamus filters: only a small part of incoming sensation passes.</li>
  <li data-wk="6"><span class="wk">W6</span><span class="hd">Cortex.</span> The 3rd-order neuron reaches the <b>primary somatosensory cortex</b> (parietal lobe); the somatic sensory association area interprets it.</li>
</ol>
<div class="cols">
  <div class="col"><h4>Reflex shortcut</h4><p>At step 3 a branch also reaches the anterior horn, so the muscle withdraws before the cortex knows (spinal cord function no. 4). Visceral reflexes, like the baroreflex, use the same logic but run through the medulla and the autonomic system.</p></div>
  <div class="col"><h4>Receptive field maths</h4><p>Small receptive field → dense receptors → fine two-point discrimination (fingertips, lips). Large fields (back) can't tell two points apart.</p></div>
  <div class="col"><h4>Where it shows up clinically</h4><p><b>Shingles</b>: virus rides one sensory nerve → band rash in one dermatome. <b>Sciatica</b>: sacral plexus pressure → pain from buttock down the leg (piriformis, a deep lateral rotator from W2, sits beside the sciatic nerve <span class="star">★</span>). <b>Rabies</b> travels the opposite way: up somatic motor nerves, then out along autonomic fibres.</p></div>
</div>
<div class="yue" data-wk="7"><b>廣東話</b>感覺嘅路：感受器 → 第一級神經元（胞體喺後根神經節）→ 脊髓灰質 → 第二級神經元<b>喺脊髓入面交叉</b>，沿上行傳導束上去 → 丘腦（第三級）→ 頂葉初級體感覺皮質。丘腦係所有感覺嘅「總站」，淨係嗅覺唔經丘腦。</div>
</div>
</details>

<details class="thread" id="t3">
<summary>The eye, from socket to cortex<small>W4 · W6 · W7</small></summary>
<div class="tbody">
<ol class="chain">
  <li data-wk="4"><span class="wk">W4</span><span class="hd">Bone.</span> The orbit uses seven bones: frontal, sphenoid, ethmoid, lacrimal, zygomatic, maxilla, palatine. Tears drain from it into the nose.</li>
  <li data-wk="7"><span class="wk">W7</span><span class="hd">Protect and lubricate.</span> Lashes, lids (tarsal glands add oil so tears don't evaporate), conjunctiva. Tears: lacrimal gland → conjunctiva → lacrimal caruncle → punctum → canaliculus → sac → <b>nasolacrimal duct</b> → nasal cavity. Tear secretion is a CN VII job.</li>
  <li data-wk="6"><span class="wk">W4</span><span class="wk">W6</span><span class="hd">Move.</span> Six muscles: <b>III</b> drives SR, MR, IR and IO; <b>IV</b> drives SO (its tendon loops through the trochlea); <b>VI</b> drives LR (abducens). Nuclei: III and IV in the midbrain, VI in the pons. The <b>frontal eye field</b> orders saccades; the <b>superior colliculus</b> tracks moving objects and handles visual reflexes. Each motor unit here is tiny (13–20 fibres), hence the precision.</li>
  <li data-wk="7"><span class="wk">W7</span><span class="hd">Focus and light control.</span> Cornea and lens bend light; the ciliary body (ciliary muscle + suspensory ligament) adjusts the lens; the iris constrictor and dilator set the pupil; aqueous humor fills the front, vitreous jelly keeps the shape. Parasympathetic CN III supplies the sphincter pupillae and ciliary muscle <span class="star">★</span>, so the oculomotor nerve is both a somatic and an autonomic nerve (W7 craniosacral list).</li>
  <li data-wk="7"><span class="wk">W7</span><span class="hd">Retina.</span> Pigment epithelium absorbs stray light; rods (night, monochrome) and cones (day, colour) transduce; bipolar cells pass signals on; ganglion cells' axons form the optic nerve.</li>
  <li data-wk="7"><span class="wk">W7</span><span class="wk">W6</span><span class="hd">Pathway.</span> Bipolar (1st) → ganglion (2nd) → optic nerve → <b>optic chiasm</b> (hemidecussation) → optic tract → <b>lateral geniculate nucleus</b> of the thalamus (3rd) → optic radiation → primary visual cortex in the occipital lobe.</li>
  <li data-wk="7"><span class="wk">W7</span><span class="wk">W6</span><span class="hd">Side branches.</span> Melanopsin-containing ganglion cells send signals to the pretectal nucleus and superior colliculus (reflexes) and set circadian rhythm, which links to the hypothalamus.</li>
  <li data-wk="7"><span class="wk">W4</span><span class="wk">W7</span><span class="hd">Link to the ear.</span> The W4 slide shows the eyeball counter-rolling when the head tilts (intorsion/extorsion). The signal for that comes from the vestibular organs of the inner ear; see the ear thread.</li>
</ol>
<div class="cols">
  <div class="col"><h4>Which nerve for which muscle</h4><p>Name the nerves by the muscle's action. LR (lateral rectus) abducts → <b>VI abducens</b> (ab-ducens = leading away). SO's tendon uses the pulley (trochlea) → <b>IV trochlear</b>. Everything else → <b>III</b>. Memory frame <span class="star">★</span>: <b>LR6, SO4, rest 3</b>.</p></div>
  <div class="col"><h4>Three tunics</h4><p>Outer fibrous (sclera + cornea) · middle vascular, the <b>uvea</b> (choroid, ciliary body, iris) · inner neural (retina). A wall in three layers, just like the meninges (W5/6) and the muscle wrappers (W1).</p></div>
</div>
</div>
</details>

<details class="thread" id="t4">
<summary>The ear: bones, muscles, nerve and balance<small>W1 · W2 · W4 · W7</small></summary>
<div class="tbody">
<ol class="chain">
  <li data-wk="7"><span class="wk">W7</span><span class="wk">W2</span><span class="hd">Outer ear.</span> The auricle is supported by <b>elastic cartilage</b> (the third cartilage type from W1/W2). Guard hairs and cerumen protect the canal.</li>
  <li data-wk="7"><span class="wk">W7</span><span class="wk">W1</span><span class="hd">Middle ear.</span> The tympanic membrane attaches to three ossicles (malleus, incus, stapes), the smallest bones in the body <span class="star">★</span>. Two tiny <b>skeletal muscles</b> (tensor tympani on the malleus, stapedius on the stapes) dampen loud sound. The eustachian tube links the ear to the nasopharynx.</li>
  <li data-wk="7"><span class="wk">W4</span><span class="wk">W7</span><span class="hd">Inner ear in bone.</span> The bony labyrinth is carved into the temporal bone.</li>
  <li data-wk="7"><span class="wk">W7</span><span class="hd">Hearing.</span> Sound → drum → ossicles → inner-ear fluid → basilar membrane up and down → stereocilia rock → K⁺ enters hair cells → neurotransmitter → CN VIII. Inner hair cells supply 90–95% of the sensory fibres; outer hair cells tune to frequency.</li>
  <li data-wk="7"><span class="wk">W7</span><span class="hd">Balance.</span> Saccule and utricle (linear movement and static position, otoliths on the otolithic membrane); three semicircular ducts (rotation: endolymph lags, cupula bends hair cells).</li>
  <li data-wk="6"><span class="wk">W6</span><span class="hd">Into the brain.</span> CN VIII ends in the medulla and pons. The <b>inferior colliculus</b> handles auditory reflexes such as the startle response; hearing is perceived in the temporal lobe <span class="star">★</span>.</li>
  <li data-wk="6"><span class="wk">W6</span><span class="wk">W4</span><span class="hd">Outputs for balance.</span> The cerebellum adjusts postural muscles, the reticular formation sets tone, and the eye muscles (III, IV, VI) keep the picture steady. See the posture thread.</li>
</ol>
<div class="yue" data-wk="7"><b>廣東話</b>耳朵三層：外耳（耳廓＝彈性軟骨）→ 中耳（鼓膜、三塊聽小骨、兩條骨骼肌）→ 內耳（耳蝸＝聽覺；前庭＋半規管＝平衡）。全部經第 VIII 對腦神經（前庭蝸神經）入腦幹。</div>
</div>
</details>

<details class="thread" id="t5">
<summary>Taste, smell and why food feels emotional<small>W2 · W6 · W7</small></summary>
<div class="tbody">
<ol class="chain">
  <li data-wk="7"><span class="wk">W7</span><span class="hd">Flavour</span> = primary tastes + smell + food texture + temperature + appearance.</li>
  <li data-wk="7"><span class="wk">W7</span><span class="wk">W2</span><span class="hd">Taste cells are epithelial.</span> They live 7–10 days and are replaced by basal stem cells. Papillae: filiform (texture, no taste buds), fungiform (~5 buds), circumvallate (>100 buds, V at the back).</li>
  <li data-wk="7"><span class="wk">W7</span><span class="hd">Three cranial nerves.</span> CN VII = front ⅔; CN IX = back ⅓; CN X = palate, pharynx, epiglottis.</li>
  <li data-wk="7"><span class="wk">W6</span><span class="wk">W7</span><span class="hd">Taste destination.</span> Medulla → hypothalamus and amygdala (autonomic reflexes, emotion) and thalamus → <b>insula</b> (perception; insula = taste and visceral sensation).</li>
  <li data-wk="7"><span class="wk">W7</span><span class="hd">Smell is different.</span> Olfactory receptor cells are true neurons, the only ones directly exposed to the outside world, replaced every ~60 days. Axons (CN I) end in glomeruli of the olfactory bulb → mitral/tufted cells → olfactory tract → primary olfactory cortex <b>without a thalamic stop</b> → insula and limbic system (amygdala, hippocampus).</li>
  <li data-wk="6"><span class="wk">W6</span><span class="hd">So smell hits emotion first.</span> That direct limbic wiring is why a bad smell triggers disgust before you can name it.</li>
  <li data-wk="6"><span class="wk">W4</span><span class="wk">W6</span><span class="hd">Eating as a muscle story.</span> Chewing = V3 → temporalis, masseter, pterygoids. Tongue = XII. Saliva = VII and IX. Swallowing = IX, X, XI, XII (see the speech and swallowing thread).</li>
</ol>
<div class="note-box"><span class="star">★</span> Hook for the two stem-cell stories: <b>smell neurons</b> turn over in ~60 days, <b>taste cells</b> in 7–10. Taste cells are not neurons, so the fast turnover is just normal epithelium.</div>
</div>
</details>

<details class="thread" id="t6">
<summary>Autonomic: the second motor system<small>W5 · W6 · W7</small></summary>
<div class="tbody">
<div class="tw"><table>
<thead><tr><th>Feature</th><th>Somatic motor (W5)</th><th>Sympathetic</th><th>Parasympathetic</th></tr></thead>
<tbody>
<tr data-wk="7"><td>Neurons from CNS to target</td><td>1 (cell body in CNS)</td><td>2: preganglionic + postganglionic</td><td>2: preganglionic + postganglionic</td></tr>
<tr data-wk="7"><td>Outflow</td><td>Brainstem and every cord level</td><td><b>Thoracolumbar</b>: lateral horn of thoracic and lumbar cord</td><td><b>Craniosacral</b>: CN III, VII, IX, X + sacral cord</td></tr>
<tr data-wk="7"><td>Ganglion</td><td>none</td><td><b>Sympathetic chain</b> (paravertebral), beside the vertebrae</td><td><b>Terminal ganglia</b> in or near the organ</td></tr>
<tr data-wk="7"><td>Fibre lengths</td><td>one long axon</td><td>short pre, <b>long post</b></td><td><b>long pre</b>, very short post</td></tr>
<tr data-wk="7"><td>Job</td><td>Skeletal muscle, voluntary</td><td>Fight-or-flight: alertness, heart rate, BP up</td><td>Rest-and-digest: lower energy use, maintenance</td></tr>
</tbody></table></div>
<ol class="chain">
  <li data-wk="6"><span class="wk">W6</span><span class="hd">Command centres.</span> The hypothalamus (heart rate, BP, digestion, temperature) and the medulla (cardiovascular and respiratory centres) direct the ANS.</li>
  <li data-wk="5"><span class="wk">W5</span><span class="wk">W4</span><span class="hd">Spatial logic of the sympathetic.</span> The lateral horn exists only at the thoracic and lumbar cord (W5 cross-section). The preganglionic axons leave in the ventral root, then synapse in the chain of ganglia that runs down beside the thoracic and lumbar vertebrae (W4). Ganglion far from the target → long postganglionic fibre.</li>
  <li data-wk="7"><span class="wk">W6</span><span class="wk">W7</span><span class="hd">Spatial logic of the parasympathetic.</span> CN III, VII, IX supply the head (pupil and ciliary muscle <span class="star">★</span>; tears, saliva and nasal mucus; parotid saliva <span class="star">★</span>); <b>X (vagus)</b> supplies the viscera (heart rate, bronchoconstriction, gut). Ganglion parked at the organ → very short postganglionic fibre.</li>
  <li data-wk="7"><span class="wk">W7</span><span class="hd">Visceral reflex example.</span> High blood pressure → baroreceptors in vessel walls → afferent neurons → medulla (interneurons) → efferent autonomic neurons → heart and vessels adjust. It is the same afferent → centre → efferent chain as the spinal reflex, just slower.</li>
</ol>
<div class="yue" data-wk="7"><b>廣東話</b>記法：<b>交感</b>神經節喺脊柱旁邊（遠離器官）→ 節前纖維<b>短</b>、節後纖維<b>長</b>。<b>副交感</b>神經節貼住器官 → 節前<b>長</b>、節後<b>短</b>。交感＝胸腰段（thoracolumbar）；副交感＝腦＋骶段（craniosacral：III、VII、IX、X）。</div>
</div>
</details>

<details class="thread" id="t7">
<summary>Speech and swallowing: a cranial-nerve team event<small>W4 · W5 · W6</small></summary>
<div class="tbody">
<div class="cols">
  <div class="col"><h4>Speech</h4>
  <ul>
    <li data-wk="6"><span class="wk">W6</span> General interpretive area (usually left) understands language.</li>
    <li data-wk="6"><span class="wk">W6</span> <b>Broca's area</b> (speech centre, same hemisphere) coordinates the breathing and tongue muscles.</li>
    <li data-wk="5"><span class="wk">W5</span><span class="wk">W4</span> Breath: diaphragm via the <b>cervical plexus</b> (C1–C5); intercostals for forced breathing.</li>
    <li data-wk="6"><span class="wk">W6</span> Voice and larynx: <b>X</b>. Tongue: <b>XII</b>. Lips and cheeks: <b>VII</b> <span class="star">★</span>. Jaw: <b>V3</b>.</li>
  </ul></div>
  <div class="col"><h4>Swallowing</h4>
  <ul>
    <li data-wk="6"><span class="wk">W4</span><span class="wk">W6</span> Tongue: nerve <b>XII</b>.</li>
    <li data-wk="6"><span class="wk">W6</span> Pharynx: <b>IX</b> (motor, dilates pharynx) and <b>X</b>; <b>XI</b> to palate and pharynx.</li>
    <li data-wk="6"><span class="wk">W6</span> Medulla coordinates. Slides list "swallowing" under IX, X, XI and XII.</li>
  </ul></div>
</div>
<p>Cranial nerves V, VII, IX, X, XI, XII cover most of the head and neck muscles from Week 4. Use the Tables tab to match each nerve to the muscles it drives.</p>
</div>
</details>

<details class="thread" id="t8">
<summary>Posture and balance: who keeps you upright<small>W1 · W2 · W4 · W6 · W7</small></summary>
<div class="tbody">
<div class="cols">
  <div class="col"><h4>1. Inputs</h4>
    <ul>
      <li data-wk="7"><span class="wk">W7</span> Vestibular organs (saccule, utricle, semicircular ducts)</li>
      <li data-wk="7"><span class="wk">W7</span> Eyes</li>
      <li data-wk="7"><span class="wk">W1</span><span class="wk">W7</span> Muscle spindles and Golgi tendon organs (proprioceptors), joint receptors</li>
      <li data-wk="7"><span class="wk">W7</span> Skin pressure and touch</li>
    </ul></div>
  <div class="col"><h4>2. Integrators</h4>
    <ul>
      <li data-wk="6"><span class="wk">W6</span> <b>Cerebellum</b>: compares command with proprioceptive input; rapid automatic postural adjustment</li>
      <li data-wk="6"><span class="wk">W6</span> <b>Reticular formation</b>: tone, balance, posture</li>
      <li data-wk="6"><span class="wk">W6</span> <b>Red nucleus</b>: subconscious upper-limb control and tone</li>
      <li data-wk="6"><span class="wk">W6</span> <b>Basal nuclei</b> and motor cortex</li>
    </ul></div>
  <div class="col"><h4>3. Outputs</h4>
    <ul>
      <li data-wk="1"><span class="wk">W1</span> Muscle tone: motor units firing in rotation</li>
      <li data-wk="4"><span class="wk">W4</span> Erector spinae (keep the trunk upright), transversospinalis (fine control), abdominals, quadratus lumborum</li>
      <li data-wk="2"><span class="wk">W2</span> Gluteus medius and minimus level the pelvis; soleus and gastrocnemius hold you standing; tibialis posterior supports the medial arch</li>
    </ul></div>
</div>
<p>Hook: a postural muscle is the endpoint of a loop. Sensors (W7) → cerebellum and brainstem (W6) → motor neurons (W5) → muscles (W1–W4) → joints that move → sensors again.</p>
</div>
</details>

<details class="thread" id="t10">
<summary>Wrappers, cushions and barriers: patterns that repeat<small>W1 · W2 · W5 · W6 · W7</small></summary>
<div class="tbody">
<div class="cols">
  <div class="col"><h4>Wrappers (three layers, out to in)</h4>
    <ul>
      <li data-wk="1"><b>Muscle:</b> epi- → peri- → endomysium, continuous with tendon</li>
      <li data-wk="5"><b>Nerve:</b> epi- → peri- → endoneurium around the myelinated axon</li>
      <li data-wk="5"><b>CNS:</b> dura → arachnoid → pia</li>
      <li data-wk="7"><b>Eye:</b> fibrous → vascular → neural tunics</li>
      <li data-wk="1"><b>Bone:</b> periosteum; the joint capsule's fibrous layer is continuous with it</li>
    </ul>
    <p style="margin-top:8px"><b>Rule:</b> epi = on top (whole thing), peri = around a bundle (fascicle), endo = inside, next to a single fibre or axon.</p></div>
  <div class="col"><h4>Cushions (fluid + soft tissue)</h4>
    <ul>
      <li data-wk="1">Synovial fluid, articular cartilage, menisci, bursae (W1)</li>
      <li data-wk="4">Intervertebral discs (W4)</li>
      <li data-wk="6">CSF: buoyancy, cushioning, chemical stability (W6)</li>
      <li data-wk="7">Aqueous humor and vitreous body (W7)</li>
      <li data-wk="7">Endolymph and perilymph <span class="star">★</span> (W7)</li>
    </ul></div>
  <div class="col"><h4>Barriers and boxes</h4>
    <ul>
      <li data-wk="4"><b>Bony boxes:</b> skull → brain, vertebral canal → cord, orbit → eye, bony pelvis → lower viscera</li>
      <li data-wk="6"><b>Tight junctions:</b> blood–brain barrier, blood–CSF barrier (W2 → W6)</li>
      <li data-wk="2"><b>Keratinised epidermis:</b> dead, waterproof outer skin</li>
      <li data-wk="7"><b>Conjunctiva + tears:</b> moisten and clean the eye</li>
    </ul></div>
</div>
<div class="yue" data-wk="7"><b>廣東話</b>肌肉同神經包膜用同一套字頭：<b>epi</b>＝最外層（成條肌／成條神經）、<b>peri</b>＝包住一束（fascicle）、<b>endo</b>＝包住單一條肌纖維／軸突。保護好似「盒＋膜＋液」：骨盒、三層膜、腦脊髓液。</div>
</div>
</details>


<p class="foot" style="margin-top:12px">Week sources: W1 orientation + musculoskeletal system · W2 lower limb + body tissues · W3 upper limb · W4 head, neck and trunk · W5 nervous tissue, spinal cord, spinal nerves · W6 brain and cranial nerves · W7 special senses and autonomic nervous system.</p>`;
