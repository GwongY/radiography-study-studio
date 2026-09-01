# Radiography Study Studio

An offline-first personal self-learning tool built on top of the existing Osteology Studio. The 3D
skeleton and everything around it is preserved intact and now lives inside the broader HSS2011
Anatomy section rather than being the whole app.

The workflow is the same for every subject:

> **Learn** → **Remember** → **Practise** → **Apply** → **Review**

## Files

| File | What it is |
| --- | --- |
| `radiography-study-studio.html` | The app. Subject selector, learning workflow, Memory Coach, source dialogs, coverage report, and the full osteology 3D studio embedded as the HSS2011 Osteology module. |
| `study-data.js` | The study layer: source registry, subject registry, 106 study items, prior-knowledge registry, spaced repetition, coverage report, corpus validator. |
| `wordparts.js` | 814 medical word parts, inverted from the HSS2011 glossary, plus the segmenter that takes a long term apart. |
| `term-notes.js` | 89 hand-written pronunciations and plain-English readings for the terms word parts alone cannot rescue. App-authored, labelled as such. |
| `assets/plates/` | Five public-domain anatomy plates from Gray's Anatomy (1918), licence-verified through the Wikimedia Commons API before download. |
| `anatomy-data.js` | Unchanged. Canonical bone records, landmark hotspots and the 3D model adapter metadata. |
| `visual-data.js` | The visual registry: which model layer and meshes each study item is about, and which items get a schematic or figure instead. Verified mesh names, not guesses. Also `PLATES` — the Gray's plate on five physiology items, each with its `intro` and callout `key`. |
| `layouts.js` | The 16 non-depictions as HTML layout data — cards, flows, term grids. Replaced the hand-plotted SVG versions. |
| `schematics.js` | The retired SVG plotter. Still the fallback for anything without a layout entry; nothing currently uses it. |
| `figures.js` | 18 published figures that replaced the hand-drawn *anatomy*, each with author/licence/source captured from the Wikimedia API and an `intro` + callout `key` so the lesson teaches from the image. |
| `assets/figures/` | Those 18 image files. Licence-gated at download: anything not demonstrably free is refused. |
| `assets/` | Local GLB models. Unchanged. |
| `mesh-index.js` | **Generated.** Every named structure in every GLB layer (1,686), with the course file that names it and the study unit it resolves to (`UNITS`, 787 of them). Rebuild with `node work/build-mesh-index.mjs`; never hand-edit. |
| `synonyms.js` | Query expansion (collarbone → clavicle), composites (a name with no mesh but real parts), and the three structures genuinely not modelled. |
| `bodymap.js`, `landmarks.js`, `cavity-geom.js`, `cavity-build.js` | The spatial-overlay engine: concept metadata, the semantic landmark resolver, the overlay maths and one builder per cavity. |

## Run

Serve the `outputs` folder over a local web server so ES modules resolve:

```bash
python -m http.server 8080 --directory .
```

Then open `http://localhost:8080/radiography-study-studio.html`.

## Source discipline

Every factual claim in `study-data.js` carries a `sourceRefs` entry pointing at a file that exists in
the supplied shared folders. Nothing came from internet research, generic textbook expansion or
invented syllabus content. The source dialog on every item shows filename, subject, folder and
page/slide/section, and labels each reference as one of:

- **Source-derived** — teaching material issued by the subject (lecture handouts, study manuals, decks)
- **Assessment** — past papers, revision exercises, model answers, question banks
- **Student work** — student coursework. Used only to confirm topic scope, never as a fact source
- **App-authored aid** — memory hooks and study framing written by this app, not a claim from the sources

Answers taken from the HSS2011 revision-exercise model answers were re-extracted with PDF layout
preserved, because the three-column answer table flattens into an ambiguous single column under
ordinary text extraction and silently mis-assigns answers between Modules 3.3, 4.1 and 4.2. Every
answer used was then cross-checked against its question text.

## Subject coverage

| Subject | Status | Notes |
| --- | --- | --- |
| ABCT2326 Human Physiology | Full | 10 system lectures, supplementary decks, the lecturer's own prose notes for the endocrine, nervous, musculoskeletal and immune units, tutorial answers, extra exercises, Martini eBook |
| HSS2011 Human Anatomy | Full | Vocabulary, Study Manuals 1819/1920, Modules 0–4, revision exercises with model answers, and past papers back to 2003–04 |
| HTI17103 Introduction to Medical Radiation Science | **Substitute source** | The exact HTI17103 set was not found. Built from HTI17101 Exploring Radiography, the closest available material. Not silently renamed — every source reference still shows the HTI17101 filename and folder. |
| APSS1A08 Introduction to Sociology | **Limited source coverage** | No verified lecture syllabus found. Only student assignments and papers. No study content generated. |
| DSAI1202 Introduction to AI and Data Analytics | **No materials** | Placeholder page. No lessons or flashcards invented. |
| LEI1101 AI as a Tool for Language Learning | **No materials** | Placeholder page. ELC1011/ELC1012 exist but are different subjects and were deliberately not substituted. |

The in-app **Coverage report** lists covered topics, missing coverage, duplicate materials across the
shared folders, source conflicts and how each was handled, plus live validator output.

### Deliberate content limits

- Projection terminology for HTI17103 is limited to **PA** and **Lat**, the only projection
  abbreviations that appear anywhere in the supplied Exploring Radiography lecture set (one worked
  chest X-ray request form). No item claims AP or oblique.
- Advanced muscle attachments, detailed vascular branches, pathology and clinical anatomy were not
  added beyond what the supplied revision-exercise answers and lecture slides actually name.
- Three questions from the HSS2011 revision exercises were excluded rather than propagated: one whose
  model answer contradicts its own study-guide text, and two whose wording is ambiguous. All three are
  listed in the coverage report's conflicts section.
- The topic-sorted past-paper bank was confirmed in scope — the 2012–13 paper header reads
  `HSS201/HSS2011(2012)`, so `HSS201` is just the older code for the same subject. But **it carries no
  answer key**; the only answers are photographs of handwritten pages. Items were therefore built only
  from questions whose answers a current HSS2011 lecture or the revision-exercise key independently
  confirms. Questions it asks that nothing on hand can verify — brachial plexus M-shape, femoral
  triangle borders, epimysium, amphiarthroses/synarthroses, TMJ muscles — were left out.

## Item model

Each item carries a teaching explanation, key facts, one or more memory aids, per-item skills (see
*Memory Coach* below), practice questions, an explanation of the correct answer, common mistakes or
confusions, source references and a mastery record. Supported item types: definition, multiple choice, typed recall, cloze, sequence ordering,
matching, diagram labelling, 3D identification, structure set, joint movement, laterality, landmark
identification, comparison, short explanation and scenario application.

Diagram labelling uses inline SVG schematics authored by the app — no supplied labelled diagram
images exist in the assets folder, only `.glb` models. The label names come from the cited sources.

## Every lesson opens with a visual

No lesson is a wall of prose. All 106 items resolve to a visual, and the resolver never invents one:

| Kind | Items | What it is |
| --- | --- | --- |
| **model** | 58 | The real named meshes for the structure being taught. The studio canvas is *moved into* the lesson card and focused on those meshes — still rotatable, still tappable, with a readout naming whatever you tap. One WebGL context, relocated rather than duplicated. |
| **figure** | 16 | A published Wikimedia/OpenStax/Gray's image (`figures.js`), rendered through the schematic/labelled path when a figure exists for the id. |
| **schematic** | 16 | A hand-authored SVG or HTML layout, for what no mesh or photograph can show — a feedback loop, the EM spectrum, a decision table. |
| **generated** | 14 | Drawn from the item's own sourced data — a sequence item's ordered steps become a flow, a matching item's pairs become a grid. A change of form, not of content. |
| **labelled** | 2 | An app-authored labelling diagram from `DIAGRAMS` — the vertebra and the heart — used by the two `diagram` items. |

Every model spec was checked against the actual GLB name index: **all resolve, with no dead mesh
names**. A spec that resolved to nothing would show a short note saying so rather than quietly
falling back to the whole skeleton — a lesson on the carpal bones must never render as an entire
body and let you assume that was the answer.

Every schematic label is a term that appears in that item's own lesson or key facts. Nothing came
from outside the supplied sources; these are drawings of content the app already carried. Where a
bundled model genuinely cannot show something — the cardiac conducting system, an alveolus, the
inside of a long bone — the caption says so instead of pretending otherwise.

**Every figure teaches from the image.** A published figure used to render as image + one-line
caption + credit, with nothing tying it to the lesson and nothing explaining the callouts drawn on
it — the body-cavities figure carried twelve marks (`1`–`7`, `a`–`e`) and the lesson named none of
them. Each `FIGURES`/`PLATES` entry now carries an `intro` (one or two sentences: what the image
shows, why it is on this lesson, how to read it) and a `key` (every visible callout resolved to a
name, glossary terms tappable). A key entry marked `beyond` is a callout this lesson's own sources
do not name — it is read off the figure's own published labelling, which is legitimate because the
figure is a cited, attributed source on the page; the renderer dims those and adds a note.
`work/figure-key-check.mjs` fails the build if a figure a lesson shows has no `intro`, no `key`, or a
malformed key row.

The survey that added this also fixed the figures that did not match their lesson: the
*Structures of a synovial joint* figure was pointing at Gray 349 (the knee from above); the
*six synovial joint types* figure was actually the structure cross-section; the vertebra figure
labelled only the processes, missing the body / arch / foramen the labelling exercise is built on;
and the gas-exchange lesson carried a whole-airway overview instead of an alveolus. Those were
repointed or replaced with licence-checked OpenStax figures (`909`, `718`, `2611`, `2310`).

Layout is checked mechanically rather than by eye: every hand-authored schematic is verified to have
**no text overflowing its canvas and no overlapping text runs**.

## Body layers

The Viewer carries a layer rail. Each layer cycles **off → solid → ghost**, and any combination can
be on at once, because peeling is the point: vessels solid with the skeleton ghosted behind them is
how you see where they actually run.

| Layer | Meshes |
| --- | --- |
| Skeleton | 277 |
| Muscles | 683 |
| Ligaments | 413 |
| Organs | 120 |
| Vessels | 676 |
| Nerves | 582 |
| Lymphatic | 163 |

That is 2,914 individually named, individually tappable structures in one registered body. Layers
load on demand — turning one on fetches its GLB the first time and never again.

The lymphatic layer (`lenf.glb`, 1.4 MB) was added after the other six, from the same project and the
same export pipeline. Registration was **measured before it was wired in**, not assumed: its x-centre
matches the skeleton's to 0.0000 and its envelope (y 0.317–1.595) sits cleanly inside the skeleton's.
It carries every named node group plus the spleen, both lobes of thymus and the palatine tonsils —
which is also where the organ layer's missing spleen came from.

It holds nodes and lymphoid organs but **no lymphatic vessels**, so the cisterna chyli and the
thoracic duct are not in it. The lesson that uses it says so in its own caption rather than letting
you assume the drainage route is on screen.

Inside a focused lesson, picking is restricted to the layer being taught. Otherwise the ghosted body
behind it steals the tap, and tapping a lymph node answers "Sacrum".

Tapping any mesh in any layer names it. That needed a fix beyond the loader: system-layer meshes
previously carried no canonical id, so they could only be selected programmatically from a
structure-set question — tapping a kidney did nothing.

One further bug the mesh audit caught: the name normaliser turned `(` and `)` into spaces, so
`Olfactory_nerve_(I)r` normalised to `olfactory nerve i r` and could never match its own name plus a
side letter. Every parenthesised structure — the twelve cranial nerves among them — was unmatchable,
including in the pre-existing cranial-nerve structure set.

## Blank mode

Diagram and structure-set questions each render in three states:

1. **Teaching** — everything named
2. **Guided** — a couple of anchors left in, the rest worked out from them
3. **Test** — nothing named, identify everything yourself

Test is the default, so a question stays a question; the labelled view is opened deliberately.

## Structure sets

Tapping a name in a structure set also selects that mesh in the 3D studio, so the name and the place
arrive together. Thirteen sets cover 115 tappable structures across the bundled models:

| Model | Sets | Structures |
| --- | --- | --- |
| `z-anatomy-skeleton.glb` | carpals, tarsals, skull bones, vertebral regions | 34 |
| `ic-organlar.glb` | airway tree, urinary tract, digestive tract | 30 |
| `dolasim.glb` | heart chambers & valves, great vessels | 16 |
| `sinir.glb` | cranial nerves, brainstem & ventricles | 21 |
| `kas.glb` | rotator cuff & abduction muscles | 8 |
| `eklem.glb` | knee joint | 6 |

Every one of the 115 mesh references is verified to resolve against its model.

Models load **on demand**, not at boot. They are **layers of one body**, not alternatives to each
other, and any combination can be shown at once.

An earlier version of this file claimed the captures were not spatially registered and that
overlaying would place organs wrongly relative to bone. That was wrong, and the app's own loader was
what made it look true. Measured directly from the GLBs, every full-body layer spans y 0.00–1.70 and
x ±0.33 to within a few millimetres of the skeleton, and the torso-only organ layer (y 0.73–1.62)
sits exactly where the ribcage puts it. They were exported from one source body and were aligned all
along.

What broke it: `loadExtraModel` normalised **each layer to its own bounding box**, fitting it to the
same 11 units. The organ layer is torso-only, so that scaled it about 1.9× and floated it off the
skeleton. The fix is one line of intent — capture the skeleton's transform once as the canonical body
frame and apply it verbatim to every other layer.

All seven come from `DrMuratAltun/anatomi-simulatoru` under CC BY-SA 4.0, derived from BodyParts3D
(DBCLS) via Z-Anatomy. `MODEL_CATALOG` in `anatomy-data.js` records each model's coverage **and its
gaps** — the circulatory model has no conducting system, the nervous model has few named cortical
gyri, and the joint model has no synovial membrane or joint cavity.

## Joint movements

Four movements can be driven on the model: supination/pronation, elbow flexion/extension, abduction
of the arm, and opposition of the thumb.

The skeleton GLB has no skin and no animation track — it is 277 rigid meshes. That is not a
limitation to work around: a bone genuinely *is* a rigid body rotating about a joint axis, so the
movements are driven by reparenting the moving meshes into a pivot group and rotating it. Pivot and
axis are resolved at runtime from the bounding boxes of named bones, never hard-coded, because the
model is rescaled and recentred on import.

Verified: each movement sweeps its exact stated range, every moving bone shifts in world space, and
**every fixed reference bone shifts by exactly 0** — supination moves the radius and not the ulna,
abduction moves the humerus and not the scapula. Mesh count is unchanged after arm/teardown cycles.

### What the soft tissue does

Once layers composite, rotating only the bones looks broken: the forearm swings and its muscle stays
pointing at the floor. But rigidly rotating all of it would be worse than broken, it would be wrong —
a muscle crossing a joint shortens and bulges, it does not swing, and swinging it tears it off its
origin.

So a movement splits the visible soft tissue in two, by bounding box against that movement's own
fixed and moving bone sets:

- **Distal to the joint** — the hand's intrinsic muscles, the forearm flexors during elbow flexion.
  These travel with the segment as one piece, so rigid rotation *is* correct for them and they are
  attached to the pivot group along with the bones.
- **Crossing the joint** — biceps during elbow flexion, anything anchored on a bone being held still.
  Ghosted to 10% and held. The movement panel says how many, and why.

Measured on elbow flexion with the muscle layer on: right radius moves 1.99, right ulna 1.24,
flexor digitorum profundus 3.31 — while the right humerus, the left radius and the long head of
biceps each move **exactly 0**. Ending the movement restores every parent and every opacity, and the
mesh count is unchanged across all four movements.

The margin is deliberately biased towards holding: anything that merely grazes a fixed bone is held
rather than rotated, because a structure wrongly swung is a worse error than one wrongly frozen.

The controls sit **in the studio, not next to the question**, because the render loop only runs while
the studio is on screen. A slider beside the question would have moved bones nobody could see.

## Memory Coach

Every item has memory aids drawn from: mnemonic, first-letter mnemonic, chunking, word origin, visual
association, contrast with a confusable, sequence grouping, teach-back and location-based
association. Hints are revealed progressively rather than all at once:

1. **Small clue** — the gentlest aid the item has: a chunking, a word origin, a location, a contrast.
2. **Memory hook** — the strongest organising idea: the lesson's hook or a mnemonic.
3. **Before you move on** — this item's own authored confusions ("Watch out: …"), the specific
   trap most people fall into on this fact, not general study advice.

Each stage shows an aid the earlier stages have not already shown, so the ladder never repeats
itself. After the final stage, any aids the ladder did not use appear under *More hooks for this
item*. Memory aids are app-authored study devices; the facts they point at are the source-traced
ones on the Learn card.

The Review step is specific in the same way: when something was missed it recaps **the exact
questions you answered wrong, with their explanations** (including the Apply scenario), rather
than generic guidance. A clean pass instead shows the item's authored *common confusions*.

Two more content-anchored fields sit alongside the ladder, authored for every item:

- **Skills to build with this content** (Learn card, after the teaching) — one or two
  content-embedded insights that live inside this item's own knowledge: a misconception with its
  correction, a distinction with the discriminator that separates it, a discrimination pattern, a
  trap in an otherwise reasonable assumption. Each is derived from that item's key facts, memory
  aids, practice and common mistakes, so a skills line teaches something about the knowledge
  itself — never a generic "say it aloud" study tip.
- **Prove it to yourself** (Memory Coach and Review steps) — the item's blank-page standard: a
  single sentence saying exactly what you should be able to reproduce from nothing ("From a blank
  page: …"). On Review it is the check to pass before the item's next scheduled return.

Both are app-authored study scaffolding and tagged *App note* wherever they appear; the facts they
point at are the source-traced ones on the same card.

## Reading help — chunks, and the long words

Two different problems make a physiology page feel unreadable, so there are two fixes.

**Paragraphs.** Lesson prose is no longer a single block. `chunkText()` splits it at sentence
boundaries into numbered cards of about two sentences or 210 characters, whichever comes first, and
never leaves a lone tail clause.

Sentence boundaries alone were not enough. The word-parts lesson is **one 961-character sentence**
held together with semicolons, so it sailed straight through the first version and landed as exactly
the wall the chunker existed to prevent. Oversized pieces are now broken again at semicolons, then at
comma-and-conjunction boundaries, against a 300-character hard cap — and `splitTopLevel()` ignores
any separator inside brackets, because splitting "hypo- (below; also deficient)" tore a definition in
half and left the next card opening with *"also deficient)"*.

Across the corpus that took chunks over the cap from **32 down to 4**, and the worst case from 961
characters to 322 — and the four that remain are rendered as grids rather than prose, so their length
does not reach the reader.

**Enumerations become tables, because that is what they are.** Three or more `term (gloss)` pairs
covering most of a chunk render as a grid of cards instead of a paragraph: the lead-in stays prose,
each term gets its own cell, and every cell whose term is in the glossary is tappable. The word-parts
lesson went from one 961-character block to five cards carrying **36 term cells, 34 of them tappable**.

**Word parts are tappable as themselves.** `epi-`, `-graphy` and `cardi/o` are matched directly
against the glossary now, not just as pieces of longer words — on the terminology items the text *is*
a list of them, and leaving them inert while the app shipped an 814-stem glossary was daft.

**The words.** Any term the app can genuinely help with is underlined and tappable. Tapping gives
three things:

- **How to say it** — `glo-MER-yoo-luss`, stress in capitals.
- **What it is, in ordinary English** — "the little ball of leaky capillaries that blood is filtered through".
- **What it is built out of** — `inter` + `ventricul` + `ar` = between + ventricle.

The breakdown is real, not decorative: `wordparts.js` holds 814 stems inverted out of
`definition_wordparts.pdf`, and the segmenter returns **nothing at all** unless the whole word
resolves into known parts and recognised endings. That rule is what stops it splitting *glossary*
into gloss + ary, or *properties* into pro + per. Four glossary rows that wrapped in the source PDF
were corrected by hand — one of them was making `diagnosis` read as "through + kneecap".

Pronunciations and plain-English lines are **written by this app**. The term panel says so, under the
same rule the memory aids follow.

## Prior knowledge — what not to teach from zero

Fifteen of the twenty-three ABCT2326 Human Physiology items cover material HKDSE Biology already
taught. Teaching those from zero wastes the session and buries the two or three things the PolyU
lecture actually adds on top, so they carry a `priorKnowledge` field and are **verified rather than
taught**:

- The session opens them on **Practise**, not Learn, with a banner saying why and a "Show the lesson
  first" button for when the answer does not come.
- Their **Learn card leads with "What this lecture adds beyond DSE Bio"** — the named lists, the
  terminology and the specific numbers from the lecture slides. The full explanation is not deleted;
  it drops into a fold at the foot of the card labelled as background you already have.
- **Weakest-first queues** treat them as half known rather than as a zero they have not earned, so
  they sort behind material no syllabus ever taught. "Teach me something new" excludes them until the
  genuinely new items run out.
- **Getting one wrong** puts the lesson back in front of that item — the assumption failed, so the
  teaching is worth reading after all.

### Checked against the actual syllabus, not against a guess

Every tag carries a `syllabusRef` into the **EDB Biology Curriculum and Assessment Guide (S4–6)**,
registered as `edb.bio` with `kind: 'syllabus'` — a kind that is allowed to support exactly one sort
of claim, "a previous course already taught this", and never a fact about anatomy or physiology.

Reading it changed the tagging, because assumptions about DSE turned out to be wrong:

- The **nephron, the cardiac cycle, the pacemaker and the respiratory centres are not in the
  compulsory part at all.** They sit in the elective *Human Physiology: Regulation and Control*.
  `dsePart` records which part covered each item, and 4 of the 17 rest on that elective.
- DSE **does** name sensory, inter- and motor neurones. A `beyond` line claiming interneurones were
  new material was wrong and has been replaced.
- DSE never groups tissues into epithelial/connective/muscle/neural, so the cells item covers *less*
  prior ground than first assumed and was downgraded from `most` to `part`.

`covers: 'most'` means the lecture mostly re-treads DSE and adds terminology or a list;
`covers: 'part'` means a substantial part is genuinely new. Lymphoid tissue / MALT stays untagged:
no DSE topic covers the cisterna chyli, and the only source for it is an answer key rather than a
physiology deck.

Every `beyond` line was written against the lecture deck itself and carries its own citation, the
same way a practice question does:

```js
{ t: 'GFR as a figure: 115 ml/min in women, 125 ml/min in men, about 180 L a day…',
  src: { ref: 'phys.5', location: 'Slide 17 "Glomerular Filtration Rate (GFR)"' } }
```

All 69 of them point at a `kind: 'primary'` ABCT2326 teaching deck — `phys.1`–`phys.10`, the
`Lecture notes.pptx` and `.pdf` files — never at a past paper, a tutorial answer or student work,
and never at the textbook. `validateCorpus()` fails the build on a line with no `src`, an
unresolvable `ref`, or no slide named, so a line cannot quietly become textbook expansion later. The
source dialog on a prior-knowledge item lists those slides in their own table.

Nothing about this writes to the mastery store. `priorAdjustedScore()` is derived at read time for
ordering and for the dashboard label, so attempts, accuracy, lapses and intervals stay a record of
what was actually answered in this subject — no seeded attempts inflate them. The dashboard rings an
assumed item in the dim colour and labels it `assumed from DSE Bio, unverified` until the first real
answer replaces the assumption with evidence.

## Mastery and scheduling

Mastery is tracked separately for recognition, typed recall, spelling, location, sequence,
explanation, application, comparison and delayed recall. Delayed recall scores only the
first attempt after a gap of 20 hours or more — answering correctly three times inside one sitting
says nothing about whether it survived a night's sleep. Scheduling is SM-2 shaped and then modified by:

- **Response time** — a slow correct answer earns a shorter interval than a fast one.
- **Repeat mistakes** — items with 2 lapses cap at 9 days, items with 3+ cap at 4 days regardless of
  how well the current rep went.

There is no confidence picker: a wrong answer is a miss worth fixing, full stop. The only
self-reported signals left are the self-grades (Yes / Partly / No) on the Explain/Scenario
questions and the Apply scenario, where Partly is scored as reached-but-shaky.

## Study modes

Teach me something new · Daily pre-study session · Review my weakest topics · Quick 10-minute session
· Exam-style recall · Memory hooks only · Explain my mistakes · Subject-specific study · Mixed
Semester 1 review.

The daily session deliberately mixes anatomy terminology, bone names, one physiology sequence and one
radiation-science concept.

**All of them now have a way in.** Six of the nine were implemented in `pickItems()` and never given
a tile — including *Explain my mistakes*, which is the one you want most in the week before an exam,
and *Quick 10-minute session*. Today renders a tile per mode instead of three hardcoded ones.
(*Subject-specific* is the exception: it is entered by choosing a topic in Learn, so a tile for it
would be a second door onto the same room with no topic chosen.)

The count under each tile comes from **running the picker**, not from a separate estimate that could
drift away from what the session would actually contain, and a mode with nothing to offer is disabled
and says why — *"No mistakes logged — good"* — rather than opening an empty session and apologising
in a toast.

## Reading help reaches the questions now

The term layer stopped at the lesson. **107 distinct words the glossary can explain also appear in
question prompts, answer explanations and Apply scenarios** — which is exactly where you are under
time pressure and least able to go and look something up. Prompts, verdict explanations, common
mistakes, Apply scenarios, model answers and rubrics are all glossified now.

The one place it deliberately does not go is the MCQ option buttons: a `<button>` inside a
`<button data-opt>` is invalid HTML, and the inner one would swallow the click meant to answer the
question. Verified zero nested buttons.

## Dialogs and the keyboard

Seven dialogs, two things a keyboard user was owed.

**Escape did not close them.** They are genuinely modal — `:modal` reports true — but a keydown that
demonstrably reached the document produced no `cancel` event and left the dialog open. Rather than
work out whether that is the browser or the page, a global handler now closes the topmost open
dialog; it costs nothing where the platform already does it, because by then there is nothing left
to close.

**Focus was dropped on the floor.** The focused element was inside the dialog that had just gone, so
the next Tab restarted from the top of the document — every term lookup cost a keyboard user their
place. `openDialog()` remembers the opener and restores focus on close. All seven go through it,
including the one in the osteology module, which reaches it via the same `window` bridge it already
uses. Verified with a real key press: Escape closes, and focus lands back on the exact chip.

## The day streak counted wrong

```js
meta.streak = meta.lastSessionDay === today ? (meta.streak || 1)
            : (meta.lastSessionDay ? (meta.streak || 0) + 1 : 1);
```

Any earlier day incremented it, so returning after three weeks away read as *one day longer* rather
than as a broken run. `nextStreak()` replaces it — same day unchanged, yesterday +1, anything longer
back to 1 — and it is a pure function so it can be checked without a browser. Eight cases pass,
including both calendar boundaries and a clock that went backwards.

## Quick 10 handed over two items

```js
[...due.slice(0, 4), ...shuffle(unseen).slice(0, 2)].slice(0, 6)
```

Nothing can be due on a fresh install, so the mode advertised as a ten-minute session delivered
**two** items — under-delivering worst at the exact moment someone was trying the app for the first
time. It now takes due work first and fills the remaining room from unseen, then from the weakest,
to reach six. Verified at 6 on a clean install.

## Memory Coach — why stage 4 is gone

The old ladder ended with **Stage 4 — the full explanation**, which repeated the Learn card's
teaching verbatim (up to 1,181 characters on the word-parts item), so the Remember step asked you to
read the same paragraph twice. Stage 3 was the first sentence of that same explanation, so the ladder
repeated itself twice before it was done. The ladder now ends at three stages and its last stage
surfaces this item's own authored confusions ("Watch out: …") rather than a re-read or generic
advice, and every stage is deduped against the ones before it — no aid is shown twice.

**The nine structure-set items had no hints at all**, so the early stages fell back on filler —
*"Attach the fact to something you already know well"* is not a hint, it is a sentence shaped like
one. Those items do carry something better: every member has a note off the lecture, and the members
are grouped. `setHint()` uses them:

> **Stage 1** — 8 structures in 3 groups: Chambers, Valves, Valve apparatus. Name the group first, then place the members inside it.
> **Stage 2** — One to start you off — Right atrium: Receives from the venae cavae.

## Grading an Apply answer

Yes / Partly / No are three buttons, and they used to produce two outcomes: **Partly was scored
exactly as No**, logging a mistake and taking the lapse penalty from someone who had most of it.

Partly now records as reached but at the lowest confidence, so it earns the shortest interval —
verified as `attempts 1, correct 1, lapses 0, intervalDays 1`, with no mistake written to the log.

## Storage and migration

Progress is kept in `localStorage` under versioned keys: `rss.v1.mastery`, `rss.v1.items`,
`rss.v1.mistakes`, `rss.v1.meta`.

On first run the app migrates any existing `osteology-studio-stats` history into the new mastery
record, mapping each bone id (including `full:`/`real:` prefixed and side-suffixed atlas ids) onto its
`hss2011-bone-*` item under the recognition dimension, and converting the old 0–100 confidence figure
onto the new 0–3 scale. **The legacy key is left in place**, because the embedded osteology module
still writes its own review history there. The standalone `osteology-studio.html` it was also serving
has been deleted — the module inside the study studio replaced it, and keeping a second copy of the
same app around meant two places to fix every bug.

## Resetting

**More → Reset progress on this device.** It shows what is about to go — how many mastery records,
across how many items, how many logged mistakes — offers an export first, and needs the erase button
pressed twice before it acts.

It deletes all five `rss.v1.*` keys **and** `osteology-studio-stats`. That last one is not optional:
`migrate()` re-runs whenever the stored meta version does not match, and it imports the legacy key, so
a reset that left it behind would resurrect your bone history on the next load and look broken. A
completed `meta` is written immediately afterwards so the migration has nothing left to redo, and the
embedded studio's in-memory stats are cleared through `__osteo.resetStats()` so its review meter does
not go on showing a history whose storage is already gone.

There is no server, so an export file is the only undo that exists.

## Installable app (PWA)

The app installs to an iPhone home screen or a desktop via `manifest.webmanifest` and `sw.js`.
Manifest shortcuts jump straight into a daily, weakest-topics or quick-10 session.

Caching is deliberately split three ways, because precaching everything would mean a ~37 MB install
that downloads neuroanatomy for someone who only studies bones:

| Cache | Contents | Strategy | When |
| --- | --- | --- | --- |
| `rss-shell` | HTML, the four data modules, manifest, icons (~700 KB) | network-first, cache fallback | precached at install |
| `rss-models` | the seven `.glb` files (~39 MB) | cache-first | each cached the first time it is opened |
| `rss-cdn` | three.js, its loaders, the Draco wasm decoder | cache-first | on first 3D use |

So the offline footprint grows to match what you actually study. Bump `CACHE_VERSION` in `sw.js` on
any shell change; old caches are pruned on activate.

**Verified offline** with the dev server stopped: the app loads, a full study session runs and writes
mastery to `localStorage`, the 3D studio boots with all 277 skeleton meshes, and a previously-opened
model loads from cache. A model that was never opened returns `false` and shows a toast rather than
hanging — the studio stays usable.

Service workers need a secure context, so this is a no-op on `file://`. Serve over `http://localhost`
or `https://` to get offline support. Note that the worker script itself must not be served with
`Cache-Control: no-store` — Chrome refuses to register it.

## Offline behaviour

The study system makes no network requests at all. Three.js is loaded from a CDN by dynamic import
**only** when the 3D studio is opened — a pre-existing dependency of the original app, now cached by
the service worker so it works offline after the first use. If it or the GLB assets are unavailable,
`boot3D()` fails into a retry state confined to the stage panel and everything else keeps working. 3D
identification and laterality questions each state a non-3D route to the answer in their explanation.

## Validation

`validateCorpus()` and `validateApplications()` run on every open of the coverage report and check
that every question has a resolvable correct answer and an explanation, every item has a teaching
explanation and at least one practice question, and every item carries a source reference. Current
state: **106 items, 487 questions, 82 source files registered, 0 validation failures.**

## Which structure names you are asked to know

The seven layers name 1,686 structures. A first- and second-year radiography student is not asked to
memorise 1,686 names, and an index that offers all of them as equal, individually pressable rows
teaches nothing about what matters — twenty-two segmental bronchi buried the lobar bronchi, and
fourteen phalanges of one foot buried the foot.

An earlier version decided this with a hand-written regex of "detail" words (`segmental`,
`branch of`, …). That was this repo guessing at the syllabus, which is the one thing the source
rule forbids, and it left 1,488 of the 1,686 at course level — every lymph node, every ligament,
every named sulcus.

`work/build-course-terms.mjs` replaces the guess with the sources. It reads the HSS2011 and ABCT2326
**taught and assessed** material off the shared drive — the examinable glossary, both study manuals,
every module lecture (2019/20 and the previous-year sets), every revision exercise, the model
answers, the MOOCs, every past paper, and the ten physiology lectures with their tutorials and
exercises — and asks of each structure whether the course names it. The answer, plus which file said
so, is committed as `work/course-terms.json` and baked into `mesh-index.js`.

**619 of the 1,686 are named by the course:**

| Evidence | Count | What it means |
| --- | --- | --- |
| `listed` | 261 | in `Vocabulary.pdf`, the course's own statement of which term names are examinable |
| `named` | 244 | the exact name appears in a lecture, exercise, model answer or past paper |
| `described` | 106 | all of its words appear together in one sentence of one — the notes say "the right lung is divided into superior, middle and inferior lobes", never "Superior lobe of right lung" |
| `mirrored` | 1 | the same structure on the other side of a body that is symmetrical about it |
| `series` | 7 | the rest of a numbered set the sources name over and over: six thoracic vertebrae and one lumbar. The bar is three members named and a quarter of the set, which admits these two series and nothing else in the model — not the twelve ribs (two named), not the five cervical discs (one) |

Three things are excluded from that corpus **on purpose**, and the exclusion is the whole point:

- **Martini, *Fundamentals of Anatomy & Physiology*** (the set eBook). It is a 1,300-page reference
  that names essentially every structure in the body; counting it would mark almost all 1,686 as
  course level and rebuild the problem. It stays a source for facts. It is not evidence that a NAME
  must be memorised.
- **Student coursework**, recognised by where it sits — a Lab Report folder, an Assignment. The
  source registry already treats student work as evidence of topic scope only.
- **The publisher's question bank**, which is not taught material.

"Susan notes" was on that list and should not have been. Those four files sit one per system inside
the numbered lecture folders (7. Endocrine, 8. Nervous, 9. Musculoskeletal, 10. Immune), the
catalogue classifies all four `primary`, and the endocrine one is byte-identical to
`ABCT2326 Hormone Mechanism _ABCT2326_.pdf` — registered as `phys.hormech`, and already taught from.
The exclusion was withholding, from the evidence of what the course teaches, a document the course
teaches. Exclusions here go by **provenance**: decide them by folder, never by filename.

Nothing is removed by any of this:

- each layer chip shows both numbers — `Vessels 186/419` is 186 names to learn inside an atlas of 419;
- a course-named row in search says where it is named ("in the examinable glossary", "named in 1.2
  Cardiopulmonary System and Associated Structures"), and the selection card carries the same chip;
- all 1,686 stay modelled and searchable. What changes is what a tap can *select* — see below.

`work/search-probe.mjs` asserts all of it, including that the lung lobes survive (they are
`described`, never named verbatim) and that the first rib, which the glossary lists, stays out of the
"Ribs" group.

## Study units — what a tap can select

Knowing which names matter is only half of it. The model splits further than any course does: the
deltoid exists only as three "parts", the left lung as eleven segmental bronchi, the wrist as
thirty-three separately named ligaments. Every one of those used to be individually selectable, so
tapping the wrist answered **"Dorsal scaphotriquetral ligament"** — a name in no lecture, no
exercise and no paper. 1,686 structures meant 1,374 separately selectable things.

Every row now resolves to a **unit**, and the unit is the only thing the viewer selects. Rows keep
their own names in the index and in search; the unit is the identity behind them, and it is what
`canonicalId` is built from, so picking, highlighting, hiding, isolation and the quiz all agree.

| Unit kind | Count | What it is |
| --- | --- | --- |
| `course` | 619 | a structure the course names. Its own unit, under its own name |
| `group` | 158 | finer structures selected together under a more general name |
| `lone` | 10 | one structure with nothing to group with. Stays selectable and says it is beyond the course |

A row joins a unit in the order the anatomy allows:

1. **Absorbed into the whole it is a piece of**, where the model has that whole in the same layer.
   The branches of the ulnar nerve *are* the ulnar nerve; the eight liver segments are the liver;
   the two roots of the trigeminal nerve are that nerve. Only genuine part-of relations absorb —
   "of" is not "part of", so a bursa *of* the piriformis and a ligament *of* the radius do not.
2. **Named after the whole they collectively make up**, where the model has no mesh for it. There
   is no "Deltoid muscle" mesh, only three "parts"; selecting the three IS selecting the deltoid, so
   the unit is called "Deltoid muscle". Same for the trapezius, the pectoralis major, the digastric,
   and the aortic valve, whose three cusps are named "Left coronary leaflet", "Right coronary
   leaflet" and "Non-coronary leaflet" and never say which valve.
3. **Grouped by kind and place** otherwise: "Ligaments of the foot" (39), "Bronchi of the left lung"
   (11), "Lymph nodes of the abdomen" (15), "Gyri of the brain" (12), "Ribs" (10).

The place is **measured, not read off the name**. Nothing in the words "capitohamate interosseous
ligament" says hand, and nothing in "dorsal cuboideonavicular ligament" says foot. Each structure's
box is read out of the GLB in the shared body frame, and the zone is the nearest bone's for the
limbs and a height band for the axial body — bands taken off the model itself (jugular notch 1.404,
mandible 1.496, diaphragm 1.042–1.262, iliac crest 1.012). A bone is the one exception: its own
name settles it, because splitting the rib cage by height put four of the twelve ribs "in the
abdomen".

Two rules keep the labels readable. A whole the model keeps referring to beats a body zone, even
when it has no mesh — there is no "Right lung", only its three lobes, and yet thirty-two rows are
named "… of right lung", so the bronchi and vessels there are named after it. And a kind is only
split by place where the split is real: ligaments need it (39 in the foot, 33 in the hand), the
three taeniae of the colon do not, and a kind that occurs in one place only drops the place from its
name ("Ribs", "Teeth").

In the app: the group's name is what the callout and the selection card show, the card carries a
grey **"Beyond your course — N under one name"** chip beside the teal source chip, search returns
one row per unit and says which member name it was found under, and the stage caption reads
"159 structures, 80 named by your course, 88 you can select".

`work/search-probe.mjs` asserts the whole resolution: every row has a unit, no course-named
structure is grouped away, a unit never spans two layers, the labels carry no double plurals and no
"of the body" shrug, and thirty-odd specific structures land where they should.

## Region filter

The six regions filter the skeleton by an ordered classifier over the mesh names, and the six
soft-tissue layers by a **measured box**: that region's own bones give an axis-aligned box in the
body frame, and a soft-tissue structure belongs to the region when its centre lies inside it. Paired
limbs get one box per side, and the upper-limb box is measured from the free limb only — the
clavicle reaches the midline at the sternoclavicular joint, so including the pectoral girdle drew a
box that swallowed the whole trunk. The sacrum and coccyx belong to two regions, the vertebral
column and the pelvic ring, so a mesh carries a list rather than a single region.

Two bugs are recorded here because they were silent for a long time: `mapImportedName` walked an
object literal with `String.includes`, so `phalanx → hand` beat `metatarsal → foot` on key order and
all sixty phalanges of the toes classified as upper limb; and `importedRegion` ended in a bare
`return 'skull'`, so every name no rule matched was absorbed into the cranium — the carpals, the
tarsals and the ear ossicles among them. `work/region-probe.mjs` lifts both classifiers out of the
HTML and runs them over the real GLB names, and fails if a single one of the 277 meshes is unplaced.

## Osteology studio — unchanged behaviour

Explore, Identify (L1), Left/right (L2), Landmarks (L3), Find (L4) and Memory hooks (L5) all work as
before, along with the Z-Anatomy / BodyParts3D skeleton (277 meshes, 159 structures), search across every indexed structure, region filtering, isolation, camera views, double-tap
focus, pick cycling and the local review meter. See the in-app **Sources & model** dialog for model
attribution and licensing.

## The five-bone upper-limb set, retired from display

The original app carried five separate per-bone BodyParts3D GLBs — clavicle, scapula, humerus, radius,
ulna — because it needed individually selectable bones. The active skeleton is now a 277-mesh
structure-level model that already names all five, so the separate set no longer adds anything, and it
is no longer drawn. It stays loaded as the anchor that positions the landmark hotspots.

It had the same self-normalising bug the system layers had, and worse: `prepareImportedModel` fitted
those five arm bones to an 11-unit box — **measured at 19.9x**, five arm bones scaled to the height of
an entire body. Nothing revealed it while the set was shown alone on a black background. The moment
layers composited at true body scale, it appeared as a body-sized arm floating beside the figure with
a detached clavicle in mid-air.

Two things made it worse:

- Tapping a clavicle, scapula, humerus, radius or ulna **silently switched the viewer to the
  upper-limb region**, which swapped the model out from under you. Tapping a bone now just selects it.
- That switch hid all 277 skeleton meshes to show 5, so the muscle layer was left with nothing inside
  it. `upper_limb` is now an ordinary region filter on the full skeleton.

The five bones were in the body frame all along: measured, the separate right humerus matches the
skeleton's own to within 3% of size. Applying the shared transform puts the landmark hotspots where
they belong — all 8 now land **inside** their parent bone in the real skeleton, distance 0, where
before they were positioned against a 20x-oversized arm.

## Projection view

The Viewer's second tab was an empty placeholder. It renders the bundled model
as a simulated projection.

The first attempt accumulated surfaces: every polygon the ray crossed added a
fixed amount of brightness. That is wrong in a way worth spelling out. These
meshes are hollow shells, so a femur contributed the same two crossings as a
sheet of bone a millimetre thick, and everything came out looking like outlines.

It now measures the path length **through** material and applies Beer-Lambert.
Each fragment writes its own distance from the camera, signed by facing: back
faces add, front faces subtract. Summed along a ray with additive blending,
`sum(exits) - sum(entries)` is exactly the distance spent inside solid material,
and it stays correct for any number of separate objects stacked along the ray.
Scaled by a per-tissue coefficient that sum is optical depth, and the film reads
`1 - exp(-tau)`. So bone is bright because the ray spent longer in bone, not
because it crossed more polygons.

**Collimation.** A whole-body film is not a thing anyone is handed, so the view
offers regions that are: chest, abdomen, pelvis, hand, plus whole body. Every
centre and field size was measured off the loaded skeleton rather than guessed —
ribs centre at y 3.74 and stand 2.71 tall, the hip bones centre at y 1.33, a hand
centres near x 2.1, y 0.47. The model is 11.8 units for a 1.7 m body, so one
metre is about 6.94 units, and source-to-image distances are set in real terms:
180 cm for a chest, 100 cm for the rest.

**PA, AP and Lateral.** The beam diverges from a point at that distance, which is
what makes PA and AP genuinely different here rather than a label — whatever lies
further from the detector is magnified more. +z is anterior on this model, so PA
puts the source behind the patient and AP in front. Both films are read as though
you were facing the patient, their right on your left; viewed from behind PA comes
out mirrored, so the image is flipped to match how it would actually be hung.

Exposure is adjustable, quantum mottle rises where fewer photons arrive, and
picking still works — tap a bone in the projection and it names itself.
Highlighting had to change for it: a shader material has no emissive channel, so
a pick raises that mesh's attenuation instead.

**Zoom is source-to-image distance.** The clip planes follow the dolly, so zooming
out no longer pushes the body past the far plane and blanks the pane, and the
caption reports the effective SID as it changes. Orbit more than 4 degrees off
the nominal axis and the caption stops claiming PA or AP and reads *oblique, N
degrees off* instead — saying "AP" over an oblique is exactly the quiet
wrongness this view exists to avoid.

**AP and PA** are explained in the pane, in a box labelled as app-authored. The
supplied set names only PA and Lat, in one worked chest request form, and never
contrasts them with AP, so that explanation is study scaffolding rather than a
sourced claim and is marked as such. It also states the one thing the view
cannot show: real PA positioning rolls the shoulders forward to swing the
scapulae off the lung fields, which is patient positioning rather than beam
direction, and the model cannot move its arms.

### What it still is not

Stated in the pane, not left to be discovered:

- The coefficients are **relative**, chosen for familiar contrast. No kVp, no mAs,
  no dose.
- No scatter, no grid, no pathology.
- The source meshes are hollow surfaces, so **cortex and marrow do not differ**. A
  long bone reads as uniformly dense where a real film shows a bright cortex
  around a darker medullary cavity.

Use it for projection anatomy — what overlaps what, and where a structure lands
when the body is flattened onto a detector. It will not teach you to read a film.

`assets/xray/` is still scaffolded and empty. A real radiograph needs both a
licence-cleared image and a source that says what it shows, and neither was in
the supplied material.

## Side letters on skeleton labels

148 of the 277 skeleton structures displayed their glued side letter as part of the name — "Costal
cartilage of fifth ribl", "Incusr". cleanImportedLabel only knew a fixed list of bone words. The
partner-aware strip already used for the system layers now runs over the skeleton too: strip the
trailing letter only when the opposite-side twin actually exists. Down to 10, and those ten are
Femur, Vomer, incisor, premolar and molar — real words that end in l or r and have no twin.

## Published

Live at **https://gwongy.github.io/radiography-study-studio/**, deployed by
`.github/workflows/pages.yml` on every push to `master`.

Pages' deploy-from-a-branch mode can only serve the repo root or `/docs`, and the
app lives in `outputs/`, so the workflow uploads that directory as the site
artifact instead. The site root is therefore the app directory, and every
relative path in it — the service worker scope, the manifest, `./assets/*.glb` —
resolves unchanged. `outputs/index.html` redirects the bare URL to the app,
carrying query and hash through so the manifest's daily / weakest / quick-10
shortcuts keep their mode.

HTTPS is what makes the service worker register at all, so the published site is
the only place the PWA genuinely works offline. On iPad: open in **Safari**
(other iOS browsers cannot install to the home screen), Share → Add to Home
Screen, then open Viewer and toggle each layer once while on wifi. Models cache
on first use rather than upfront, so that is what pulls the ~39 MB down. Keeping
it on the home screen also matters: installed PWAs are exempt from the 7-day
storage eviction Safari applies to ordinary tabs.

A `gh-pages` branch from the earlier manual `git subtree push` deployment is
left in place as a fallback. It is no longer what serves the site.

## Diagrams — what is drawn here and what is not

The hand-plotted SVGs were the wrong tool for anatomy. They were laid out from guessed coordinates,
so proportions and positions were whatever the numbers happened to be, and at least one actively
contradicted its own lesson: the nephron schematic's loop of Henle descended 118 px while the
collecting duct beside it ran 126 px, and the figure carried **no cortex/medulla boundary at all** —
on an item whose teaching is about salt pumping building an osmotic gradient down the medulla.

So the split is now explicit:

- **Depictions use published figures.** 18 of them, in `figures.js`, each carrying an `intro` and a
  callout `key` (see "Every lesson opens with a visual"). If it is a picture of a real structure, it
  is a real picture.
- **Layouts are laid out, not drawn.** 16 of them, in `layouts.js`, rendered as HTML. They are still
  labelled *"Drawn by this app"* with the line *"A layout, not a depiction — no anatomy is being drawn
  to scale here."* A feedback loop, a modality decision table and the six named digestive functions
  are arrangements of the lecture's own words; there is no photograph of those.

### Why they stopped being SVG

Two measured faults, both of them consequences of drawing a layout rather than laying one out.

**Text escaped its boxes.** `box()` drew a rect at a fixed height, then poured wrapped text into it
with the wrap estimated at 0.55em per character. Guess low and the text runs out of the bottom, and
nothing in the code can notice — measured at up to **15.4 px of overflow across three figures**.

**The text was tiny.** An SVG with a 720-wide viewBox rendered into a 645 px card scales everything
by 0.9, so 11 px body text arrived at **9.9 px** beside 14.5 px lesson prose. On a phone the card is
nearer 340 px — a scale of 0.47 — and the same text arrives at about **5 px**.

As HTML the cards size themselves to their content, so the overflow is not a bug that got fixed, it
is a bug that can no longer be expressed. Verified across all 16 at both 645 px and 340 px:

| | before | after |
| --- | --- | --- |
| figures with text outside its box | 3 | **0** |
| smallest rendered text, desktop | 9.9 px | **13.5 px** |
| smallest rendered text, phone | ~5 px | **13.5 px** |
| horizontal overflow at 340 px | — | **none** |

Terms inside them are tappable now too, since they are ordinary DOM text going through the same
`glossify()` as everything else — the word-parts figure alone carries 25 tappable cells.

Two depictions could not be replaced and are still drawn: **`anatomicalPosition`** (a stick figure
with the palms-forward callout) and **`muscleAction`** (a lever with origin and insertion marked).
Nothing suitably licensed and small enough turned up for either. They are the remaining weak spots.

### The two labelled diagrams, and why they were the worst of them

`DIAGRAMS` held two hand-plotted figures that were not decoration — they were the picture a
**labelling question** was scored against. The heart one placed all four chambers at mirrored
coordinates as equal quadrants of a single oval, with both semilunar valves at identical height. The
same corpus teaches that *"the right ventricle wall is thinner and pouch-shaped; the left ventricle is
round and develops more pressure."* The learner was being tested against geometry that contradicted
the lesson.

Both are retired. A hotspot question needs coordinates on the picture it is drawn over, and there is
no honest way to place those on a photograph nobody has measured — so the questions were rebuilt as
**matching**, which examines the same knowledge with nothing invented, and the source references from
the Module 4 answer key were carried into the new explanations rather than lost with the drawing.

Locating structures in space is still examined, in the place where it is correct: the
**Heart chambers and valves structure set**, which runs tap-to-identify against the real circulatory
meshes and already carries the right notes — *"Thinner, pouch-shaped wall"* on the right ventricle,
*"Round and thick-walled"* on the left.

There are now **zero** diagram-labelling questions scored against a plotted figure.

### Licensing

Every figure was licence-checked against the Wikimedia Commons API *before* download — the fetch
reads `extmetadata.LicenseShortName` and refuses anything that is not demonstrably free, so the gate
runs before the request, not after. The author, licence, licence URL and source page in `figures.js`
are written from that same API response rather than typed by hand, so the credit the app shows
cannot drift from the credit the licence requires. CC BY and CC BY-SA both require attribution; the
app renders it on the figure itself, with the licence name linking to the deed.

Across the 18: 4 public domain, 6 CC BY 3.0, 2 CC BY 4.0, 5 CC BY-SA 3.0, 1 CC BY-SA 4.0.

### Size

The ones under ~360 KB are precached in the service-worker shell; the four largest
(`body-cavities.png`, `body-movements.jpg`, `muscle-tissue-types.jpg`, `synovial-joints.jpg`) are
deliberately left out so a first install stays lean, and `networkFirst` caches them into the same
shell cache the first time a lesson shows one — so they end up offline either way.

## Plates — the only pictures not made here

Five illustrations from **Gray's Anatomy of the Human Body, 1918**, in `assets/plates/`. Every one
was licence-checked through the Wikimedia Commons API *before* download — `Public domain`, verified,
not assumed — and each is stored locally and precached in the service worker, so the app stays
offline-first. They are credited on the picture itself rather than in a footnote.

| Plate | On which item |
| --- | --- |
| Scheme of renal tubule and its vascular supply | Nephron tubule and the urine pathway |
| Bronchi and bronchioles | The respiratory pathway and its two zones |
| The pancreas and duodenum from behind | Digestive tract and accessory organs |
| Three cusps of the aortic valve | Heart chambers, valves and the cardiac skeleton |
| Front view of heart and lungs | Lungs and airway (HSS2011 Module 1) |

They illustrate; they do not source. A 1918 plate never overrides a 2019 lecture slide, and every
factual claim on those items still traces to the supplied lecture material.
