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
| `study-data.js` | The study layer: source registry, subject registry, 94 study items, spaced repetition, coverage report, corpus validator. |
| `anatomy-data.js` | Unchanged. Canonical bone records, landmark hotspots and the 3D model adapter metadata. |
| `visual-data.js` | The visual registry: which of the six model layers and which named meshes each study item is about, and which items get a hand-drawn schematic instead. Verified mesh names, not guesses. |
| `schematics.js` | 31 hand-authored SVG diagrams for the concepts no mesh can show — the feedback loop, the inside of a long bone, the EM spectrum, the cardiac conducting system. |
| `osteology-studio.html` | The original app, left in place and still working, as a fallback. |
| `assets/` | Local GLB models. Unchanged. |

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
| ABCT2326 Human Physiology | Full | 10 system lectures, supplementary decks, tutorial answers, extra exercises, Martini eBook |
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

Each item carries a teaching explanation, key facts, one or more memory aids, practice questions, an
explanation of the correct answer, common mistakes or confusions, source references and a mastery
record. Supported item types: definition, multiple choice, typed recall, cloze, sequence ordering,
matching, diagram labelling, 3D identification, structure set, joint movement, laterality, landmark
identification, comparison, short explanation and scenario application.

Diagram labelling uses inline SVG schematics authored by the app — no supplied labelled diagram
images exist in the assets folder, only `.glb` models. The label names come from the cited sources.

## Every lesson opens with a visual

No lesson is a wall of prose. All 94 items resolve to a visual, and the resolver never invents one:

| Kind | Items | What it is |
| --- | --- | --- |
| **model** | 59 | The real named meshes for the structure being taught. The studio canvas is *moved into* the lesson card and focused on those meshes — still rotatable, still tappable, with a readout naming whatever you tap. One WebGL context, relocated rather than duplicated. |
| **schematic** | 31 | A hand-authored SVG in `schematics.js`, for what no mesh can show. |
| **labelled** | 2 | The existing authored diagram, shown as the teaching view. |
| **generated** | 2 | Drawn from the item's own sourced data — a sequence item's ordered steps become a flow, a matching item's pairs become a grid. A change of form, not of content. |

Every one of the 59 model specs was checked against the actual GLB name index: **59 of 59 resolve,
with no dead mesh names**. A spec that resolved to nothing would show a short note saying so rather
than quietly falling back to the whole skeleton — a lesson on the carpal bones must never render as
an entire body and let you assume that was the answer.

Every schematic label is a term that appears in that item's own lesson or key facts. Nothing came
from outside the supplied sources; these are drawings of content the app already carried. Where a
bundled model genuinely cannot show something — the cardiac conducting system, an alveolus, the
inside of a long bone — the caption says so instead of pretending otherwise.

Layout is checked mechanically rather than by eye: all 31 schematics are verified to have **no text
overflowing its canvas and no overlapping text runs**.

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

1. Small clue
2. Memory hook
3. Partial answer
4. Full explanation

## Mastery and scheduling

Mastery is tracked separately for recognition, typed recall, spelling, location, sequence,
explanation, application, comparison, delayed recall and confidence. Delayed recall scores only the
first attempt after a gap of 20 hours or more — answering correctly three times inside one sitting
says nothing about whether it survived a night's sleep. Scheduling is SM-2 shaped and then modified by:

- **Confidence** — a confidently wrong answer costs more ease than a hesitant one, because a
  well-learned mistake is harder to unlearn. Confidence is also scored as its own dimension: was your
  certainty justified?
- **Response time** — a slow correct answer earns a shorter interval than a fast one.
- **Repeat mistakes** — items with 2 lapses cap at 9 days, items with 3+ cap at 4 days regardless of
  how well the current rep went.

## Study modes

Teach me something new · Daily pre-study session · Review my weakest topics · Quick 10-minute session
· Exam-style recall · Memory hooks only · Explain my mistakes · Subject-specific study · Mixed
Semester 1 review.

The daily session deliberately mixes anatomy terminology, bone names, one physiology sequence and one
radiation-science concept.

## Storage and migration

Progress is kept in `localStorage` under versioned keys: `rss.v1.mastery`, `rss.v1.items`,
`rss.v1.mistakes`, `rss.v1.meta`.

On first run the app migrates any existing `osteology-studio-stats` history into the new mastery
record, mapping each bone id (including `full:`/`real:` prefixed and side-suffixed atlas ids) onto its
`hss2011-bone-*` item under the recognition dimension, and converting the old 0–100 confidence figure
onto the new 0–3 scale. **The legacy key is left in place**, so the original `osteology-studio.html`
and the embedded studio's own review history keep working unchanged.

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
state: **94 items, 434 questions, 75 source files cited, 0 validation failures.**

## Osteology studio — unchanged behaviour

Explore, Identify (L1), Left/right (L2), Landmarks (L3), Find (L4) and Memory hooks (L5) all work as
before, along with the 277-mesh Z-Anatomy / BodyParts3D skeleton, the five-bone BodyParts3D upper-limb
study set, search across atlas structures, region filtering, isolation, camera views, double-tap
focus, pick cycling and the local review meter. See the in-app **Sources & model** dialog for model
attribution and licensing.
