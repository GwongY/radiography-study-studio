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
| `study-data.js` | The study layer: source registry, subject registry, 69 study items, spaced repetition, coverage report, corpus validator. |
| `anatomy-data.js` | Unchanged. Canonical bone records, landmark hotspots and the 3D model adapter metadata. |
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
| HSS2011 Human Anatomy | Full | Vocabulary, Study Manuals 1819/1920, Modules 0–4, revision exercises with model answers, past papers |
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

## Item model

Each item carries a teaching explanation, key facts, one or more memory aids, practice questions, an
explanation of the correct answer, common mistakes or confusions, source references and a mastery
record. Supported item types: definition, multiple choice, typed recall, cloze, sequence ordering,
matching, diagram labelling, 3D identification, laterality, landmark identification, comparison,
short explanation and scenario application.

Diagram labelling uses inline SVG schematics authored by the app — no supplied labelled diagram
images exist in the assets folder, only `.glb` models. The label names come from the cited sources.

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
explanation, application and confidence. Scheduling is SM-2 shaped and then modified by:

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

## Offline behaviour

The study system makes no network requests at all. Three.js is loaded from a CDN by dynamic import
**only** when the 3D studio is opened — a pre-existing dependency of the original app. If it or the
GLB assets are unavailable, `boot3D()` fails into a retry state confined to the stage panel and
everything else keeps working. 3D identification and laterality questions each state a non-3D route
to the answer in their explanation.

## Validation

`validateCorpus()` and `validateApplications()` run on every open of the coverage report and check
that every question has a resolvable correct answer and an explanation, every item has a teaching
explanation and at least one practice question, and every item carries a source reference. Current
state: **69 items, 315 questions, 66 source files cited, 0 validation failures.**

## Osteology studio — unchanged behaviour

Explore, Identify (L1), Left/right (L2), Landmarks (L3), Find (L4) and Memory hooks (L5) all work as
before, along with the 277-mesh Z-Anatomy / BodyParts3D skeleton, the five-bone BodyParts3D upper-limb
study set, search across atlas structures, region filtering, isolation, camera views, double-tap
focus, pick cycling and the local review meter. See the in-app **Sources & model** dialog for model
attribution and licensing.
