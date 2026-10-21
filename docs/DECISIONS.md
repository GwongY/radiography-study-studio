# Decisions

The owner's settled decisions, newest first, one paragraph each. Do not reopen
one without new source evidence. The longer reasoning is in the linked spec or
in [`history/README-archive.md`](history/README-archive.md) (the old
`outputs/README.md`, kept whole).

### 2026-10-21 — Six model-only cell levels: red cell, hemoglobin, plasma, kidney tubule cell, SA node, myocardium

The owner asked to zoom into a red cell, to see the plasma proteins, a proximal tubule cell showing its apical and
basolateral membranes, tubular fluid, interstitial fluid and blood with its channels and secondary active
transport, and the SA node and ventricular muscle ion channels. These six levels are Blender models alone, with no
drawn version (zoom-scene.js `MODEL_ONLY`, per the model rule: no code-drawn 3D); until the model loads the panel says
so. Labels keep to the 2026 slide words. "Secondary active transport" is not in the 2026 Renal deck, so the
transporter is labelled with the deck's own "Coupled transport (glucose and Na+)" (L5 p24). The K+ leak channels
of the tubule cell cite the Nervous deck's "Passive Channels - Not gated (always open)" (L8 p24), the only 2026 page
naming them. The ventricular level uses the deck's title, "Myocardial Action Potential" (L2 p58). The centrosome is
now a Blender model with one centriole end on, so the 9 + 0 array L1 p5 states is what opens; the "Structure of
Centrosome" download (86 tubes, not nine triplets) is no longer used or credited. It shows the two centrioles in their matrix and nothing else: the microtubules first drawn radiating
from it looked like spikes, and no 2026 slide pictures them there. Spec:
[`2026-10-20-cell-zoom.md`](superpowers/specs/2026-10-20-cell-zoom.md), "Assets".

### 2026-10-21 — Life cycle in G1, S and G2; a real spindle; protein synthesis and the parietal cell remade

The owner found the life cycle's spindle broken, meiosis without one, interphase one undivided step, and the protein
synthesis and parietal cell models rough enough to mislead. Interphase is now G1, S and G2 under one Interphase
group. The 2026 Lecture 1 names no phases of interphase (its figure is headed only "INTERPHASE (G2)"), so the
phase notes come from the older edition of the same lecture (`phys.cells.old`, p33), a named fallback. Each
centriole is nine triplets around an empty centre, the 9 + 0 array L1 p5 states; centrioles double in S and G2 and
the pairs part for the poles. Kinetochore fibres end on the kinetochores, polar fibres overlap at the equator,
astral fibres point out; meiosis I pulls homologues apart, meiosis II sisters. Protein synthesis and the parietal
cell were modelled again, with the molecules and steps their slides name and nothing beyond them. Spec:
[`2026-10-20-cell-zoom.md`](superpowers/specs/2026-10-20-cell-zoom.md), "Sources" and "Assets".

### 2026-10-21 — Cell zoom wears 3D models: downloads where they exist, Blender for the rest

The owner found the drawn levels buggy, asked for online models wherever possible (signing in to Sketchfab for the
downloads) and for every model not found online to be made in Blender. So every level now wears a .glb
(`outputs/cell/models/`): eleven CC BY 4.0 Sketchfab downloads cut into the level's labelled parts, and everything
they lack modelled in Blender, with the drawn level's stage choreography keyed on the timeline. The drawing stays as
what shows first and offline before a model has been fetched. No CC BY-NC model; the "Mitosis Stage" scans are not
used because nothing labelled can be cut out of a photographed clay model. Labels, notes and cites are unchanged;
the models carry the same parts. Supersedes the "everything else is built in three.js" line of the entry below.
Spec: [`2026-10-20-cell-zoom.md`](superpowers/specs/2026-10-20-cell-zoom.md), "Assets".

### 2026-10-20 — Cell zoom: a Viewer mode from the cell to the nucleosome, and the cells of every lecture

The Viewer's dock has **Cell**, and Revise boxes on the same things have **Show in 3D**: a typical cell cut open,
Zoom in to the nucleus, the organisation of DNA (Nondividing cell ↔ Cell prepared for division) and one
nucleosome; beside them the cell life cycle with a mitosis stage slider, meiosis, protein synthesis with a
lipophilic or hydrophilic hormone acting on the gene (the owner's endocrine example), and the cells the other
ABCT2326 lectures and HSS2011 W5 draw (plasma membrane, epithelium, blood, alveolus, parietal cell, spermatozoon,
neuron, NK cell, antigen-presenting cell). Every label, stage and note is on the page it cites
(`work/cell-zoom-check.mjs`); stage names come from the tutorials where the deck has no word for them; CREB and the
hormone response element come from the older ABCT2326 Hormone Mechanism handout, the one named fallback, because
the 2026 Endocrine deck stops at the kinase. Terms no source page uses (base pair, tetrad, homologous, linker DNA,
the histone type names) are drawn but left unlabelled. The nucleosome is PDB 3AFA (CC0); everything else is built
in three.js because no other open model could be downloaded and licence-checked. Spec:
[`2026-10-20-cell-zoom.md`](superpowers/specs/2026-10-20-cell-zoom.md).

### 2026-10-20 — Joint movements removed, engine and all

The owner asked for the **Moves** tool to go "totally and its code". The bottom
bar's Moves button and panel, `outputs/movements.js`, the joint-movement engine
in `studio/live-physiology.js` (pivot groups, soft-tissue holding), its
`__osteo` methods and both movement checks are gone. Revise's Movement
vocabulary box is untouched. This supersedes the entry below of the same day;
do not bring the tool back without the owner asking.

### 2026-10-20 — Muscle zoom: the model's muscle, then procedural levels

Tap a skeletal muscle, then **Zoom inside**: the muscle (the model's own mesh),
Organization of muscle, Fascicle, Muscle fiber, Myofibril, Sarcomere, and from
the fiber the Neuromuscular Junction, with a relaxed ↔ contracted slider on the
myofibril and sarcomere that does only what ABCT2326 Muscle p27 says. Every
label and note is 2026 slide text on the page it cites
(`work/muscle-zoom-check.mjs`); links into Revise follow its week gate. No
openly licensed mesh of these levels could be downloaded and licence-checked
(the one sarcomere found is CC BY-NC), so the levels below the muscle are
built in three.js. Spec: [`2026-10-20-muscle-zoom.md`](superpowers/specs/2026-10-20-muscle-zoom.md).

### 2026-10-20 — Joint movements are back, as a Viewer tool

The Viewer's bottom bar has **Moves**: supination and pronation (radioulnar
joint), flexion and extension (elbow joint), abduction and adduction
(glenohumeral joint), each a slider on the right arm with Stop and reset, and a
link to Revise's Movement vocabulary box. Every name is a 2026 HSS2011 slide
term, cited to its page (`outputs/movements.js`). Opposition of the thumb was
not brought back: no 2026 slide names it. No teaching prose.

### 2026-10-20 — Core courses only

The app serves the important core courses only: **HSS2011 Human Anatomy** and
**ABCT2326 Human Physiology** this semester. HTI17103 Medical Radiation Science
has no exam; DSAI1202 AI Literacy and APSS1A08 Sociology need minimal revision.
No Revise map or other study feature is built for those three; they stay in the
Course tab (timetable, deadlines, marks). Semester 2 adds imaging anatomy, and
the four-year programme has other core courses: add those when they come, and
keep the app focused on them rather than on every enrolled subject.

### 2026-10-20 — What on a slide counts as taught

The slide's **text** counts, as committed in `work/source-text.json`. A **label
in a figure does not count**: the pictures come from online with every label
their maker drew. A label the lecturer **marked** (circled, boxed, highlighted)
does count, and the build records how it is marked (`FIGURE_LABELS` in
`work/build-viewer-lecture-names.mjs` refuses an entry with no `mark`). This
governs the viewer's names, Revise rows and links.

### 2026-10-20 — The viewer's names follow the 2026 decks

`work/build-viewer-lecture-names.mjs` reads the 2026 HSS2011 decks, and
`build-mesh-index.mjs` lets them decide what a tap selects and what it is
called. A slide name beats the atlas name, and a whole the slide names becomes
one unit. In the muscle layer an older file alone no longer makes a name a
course name. Body regions not yet taught this year keep the older decks,
corrected in `work/lib/fallback-names.mjs`. Guarded by
`work/viewer-lecture-names-check.mjs`.

### 2026-10-20 — Physiology Threads, Tables and Decoder are complete

There are 17 cross-lecture concepts, each with a thread. The Decoder lists key
words (substances and cells) as well as long words, and every map name
`wordparts.js` can read. A coverage rule in `work/revision-check.mjs` fails if
a week, a concept or a multi-lecture box loses coverage. Note:
`superpowers/notes/2026-10-20-physiology-gap-analysis.md`.

### 2026-10-20 — One check runner; LF everywhere; the viewer boots from the skeleton

`work/check.mjs` lists every check that needs no browser and no drive, and CI
runs it, including an ESLint no-undef pass. `.gitattributes` makes every text
file LF. The hidden five-bone upper-limb set was removed: its failure path
called a deleted function and blanked a working viewer.

### 2026-10-19 — Physiology joins Revise

ABCT2326 is in Revise for the whole term, from the ten 2026 lecture decks only.
There are no labs, tutorials or old decks, except the merged tissue tutorial.
There is a subject switch, cross-subject links appear in the notes panel,
Cantonese lines appear on threads, and ★ textbook facts appear on thread steps
only, each cited to a Martini page. Anatomy's tissue topics moved to physiology
Lecture 1. Spec: [`2026-10-19-physiology-revise.md`](superpowers/specs/2026-10-19-physiology-revise.md).

### 2026-10-19 — The app does not test

"I don't need any test in this app. Remove it." Practise, Apply, mastery,
review scheduling, mistakes, the answer log, Gist sync, progress
export/import, the question corpus, and the 3D studio's drill modes are all
gone. The first load after the change purges the saved answer history
(`purgeTesting()`). Do not restore study items, questions, answer recording or
a review scheduler. Spec: [`2026-10-19-remove-testing.md`](superpowers/specs/2026-10-19-remove-testing.md).

### 2026-10-19 — Revise goes down to single structures; a 3D connections hub

Leaf rows are a name, one function line in the slide's words, and the slide
page. They are recall cues, not prose. Bones link to muscles through the joint
they form and the muscle moves, because the 2026 deck teaches actions by
joint. Link reasons are numbered dots plus a list. The 3D view is a hub around
one topic. Spec: [`2026-10-19-revise-depth-and-3d-hub.md`](superpowers/specs/2026-10-19-revise-depth-and-3d-hub.md).

### 2026-10-19 — Live physiology starts off; muscles do not animate

The Live chip turns physiology on. The heart, lungs, gut and vessels move;
muscles are coloured, not animated. (Commit 45bc9bf.)

### 2026-10-18 — Revise replaces Learn

The owner learns each chapter with ChatGPT or Claude; the app's job is to link
what has been learnt. The Learn tab and its reading half are gone. Revise shows
one cumulative map per subject, gated by teaching week: the week follows the
calendar, an earlier one can be picked, and topics not yet taught are hidden.
Spec: [`2026-10-18-revision-map.md`](superpowers/specs/2026-10-18-revision-map.md).

### 2026-10-14 — Heart atlas scenarios are the ones a radiographer meets

The scenarios are cath pressures, PCI, IVUS/OCT, and rhythms with ablation.
Device therapies (TAVI, closures, MitraClip, pacing) are left out as cardiology
procedure detail. BetterHeart's teaching text is used with the author's
permission, which the owner holds in writing. Spec:
[`2026-10-10-heart-atlas-design.md`](superpowers/specs/2026-10-10-heart-atlas-design.md).

### 2026-10-04 — Bone landmark labels come only from the current lectures

Labels are curated on the shipped skeleton from the supplied 2026 Human Anatomy
lectures, keeping the features the lecture highlights and identifies and
dropping background diagram labels. Spec:
[`2026-10-04-viewer-bone-landmarks.md`](superpowers/specs/2026-10-04-viewer-bone-landmarks.md).

### 2026-10-03 — Public GitHub Pages

The owner returned to public GitHub Pages after trying owner-only hosting. So
no email text, names or student details go into commits, `outputs/` or docs.
The weekly briefing lives in a private repository and is read with a read-only
token. Old hosting notes: [`archive/PRIVATE-HOSTING.md`](archive/PRIVATE-HOSTING.md).

### 2026-10-02 — Old sources are `E:\UNI sources`

The pre-2026 material is one organised offline collection. It is read-only
reference, and any reorganisation is journalled. The 2026/27 iCloud subject
folders win on precedence. Details: [`SOURCES.md`](SOURCES.md).

### Standing — Which names count as examinable

A structure is "course-named" only if the HSS2011 / ABCT2326 taught or assessed
material names it. The set textbook (Martini) is a source for facts but not
evidence that a name must be memorised, because it names everything. Student
coursework is evidence of topic scope only. The publisher's question bank is
not taught material.

### Standing — Source precedence and intake

Primary: the 2026/27 documents in the iCloud subject folders. Fallback: older
PolyU decks, tutorials and past papers in `E:\UNI sources`. New files follow
the intake workflow in
[`2026-09-10-new-source-intake-workflow.md`](superpowers/specs/2026-09-10-new-source-intake-workflow.md).
