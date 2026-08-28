# Lesson learning experience — design

Date: 2026-08-28
Project: Radiography Study Studio (`outputs/radiography-study-studio.html`,
`outputs/study-data.js`, `outputs/term-gloss.js`, `outputs/wordparts.js`)

## Background

The user is pre-learning each lesson before class from PolyU course sources.
They finished DSE biology and are meeting anatomical vocabulary for the first
time. Using the "Body cavities, regions and quadrants" lesson as the example,
four concrete problems:

1. **"Module 0 is mentioned without module 0 on image or introduction."** The
   lesson text says "Module 0 introduces the body cavities…" but nothing on
   screen says what Module 0 *is*.
2. **"pericardial / peritoneal / etc difficult words has no explanation or
   tappable."** These terms are new to a DSE-bio graduate, and they are not
   tappable in the app today — `termGloss()` cannot resolve any adjective form,
   and `decompose()` returns nothing for `peritoneal`/`pleural`/`thoracic`.
3. **Dense sentences are incomprehensible.** The sentence "The glossary fixes
   which cavity and surface-region names are examinable: the thoracic cavity
   with the pericardial and pleural cavities inside it, the abdominal and pelvic
   cavities which together form the abdominopelvic cavity, and the peritoneal
   cavity" reads as a single wall of nested clauses.
4. **Context is missing.** The lesson is a pre-learning aid, but nothing frames
   *where* in the course it sits.

**Governing rule (unchanged):** every factual study claim must trace to a file
that actually exists in the user's supplied source folders. No internet
research, no generic textbook expansion, no invented syllabus. App-authored
framing and memory aids are allowed but **must be tagged** so the UI labels them
as study devices rather than source claims. `validateCorpus()` must stay at
zero failures.

## Workstream A — Glossary mechanism (`term-gloss.js`)

### A.1 Guarded adjective→noun fold

`termGloss(token)` currently folds only noun endings. Extend the fold step:

1. Strip one adjective suffix: `-ial / -eal / -al / -ic / -ar / -ous / -ary /
   -ac`.
2. Take the resulting stem and try noun endings in order: `-um / -us / -a /
   -is / -e / -ium / -ax`. Return the **first** that exists.
3. **Accept only if the target key already exists in `TERM_GLOSS`.** Never
   synthesise a meaning.

Example: `pericardial` → strip `-ial` → `pericard` → try `pericardium` (exists)
→ return it. `thoracic` → `thorac` → `thorax` (exists) → return it.
`abdominopelvic` already resolves directly and must keep working.

### A.2 `ALIASES` map for irregulars

A small explicit map for folds that cannot reach the target: `abdominal→abdomen`,
`pelvic→pelvis`, `cardiac→heart`, `oral→mouth`. Entries only where the target
exists in `TERM_GLOSS`. This is the escape hatch the fold cannot express; keep
it small.

### A.3 Dialog reads the canonical noun

When a fold or alias resolves, `openTermDialog` leads with the canonical form:
tapping **pericardial** reads "**pericardium** — the bag around the heart."
`decompose()` / `partOf` still run first so existing word-part breakdowns keep
working where they already do.

### A.4 Missing base entries

Add English + 繁體中文 for: `cavity`, `pleura`, `peritoneum`, `abdomen`, `pelvis`,
`lumbar`, `inguinal`, `scrotal`, `oral`, `umbilical` — then genuine domain terms
found by the corpus sweep (Workstream B). Every entry must be traceable to the
supplied sources; where a Chinese gloss is not in the sources, the entry may
carry an app-authored label marked as such (same tagging rule as elsewhere).

## Workstream B — Corpus sweep + curated fill

- Add `work/gloss-gap-scan.mjs` — a re-runnable scan that imports
  `study-data.js`, runs the same `GLOSS_RE` tokenisation the app uses over every
  study text (lesson explanation, key facts, memory aids, practice prompts,
  model answers, common mistakes), and reports words ≥6 chars that resolve to
  nothing. It is a **regression check**: re-run it after each change and the
  untappable count must not grow.
- The scan output is a **stoplist gate, not a blind fill.** The user's sources
  are the only authority for meaning. Common English ("inflammation") stays
  plain. Genuine domain words across all 94 items get curated entries.
  **Never invent a definition for a word not in the sources** — such an item is
  excluded and recorded rather than guessed.

## Workstream C — Module context

- Add `MODULES` to `study-data.js`: Module 0–4 with the official unit names
  **plus one plain-English line per module** describing what it actually is
  (e.g. Module 0 = the orientation and terminology the whole course stands on).
- Add `moduleOf(item)` helper mapping by unit: `hss.term/osteo/joints → 0`,
  `hss.m1..m4 → 1..4`, `null` for physiology/radiography units.
- The lesson eyebrow gains a second line when `moduleOf(item)` is non-null:
  **"From Module 0 · <name> — <plain line>"**, styled as app-authored framing
  (visibly a study aid, not a source claim).

## Workstream D — Plain-English leads

- Add `lesson.plain` (optional, additive, unvalidated — so `validateCorpus()`
  is untouched) to the densest lessons, starting with the body-cavities item and
  ~15 others where the explanation packs nested clauses.
- Render it as the **first line** of the teaching block: "**In plain English:**
  …", tagged as app-authored, followed by the full sourced explanation
  underneath. The body-cavities sentence is split into its parts in the plain
  version (list the cavities and regions; say what "examinable" means) so the
  reader can follow the sourced sentence after reading the plain one.

## Deliberately out of scope

- Workstream 5 (redundant clicks) was proposed and **dropped by the user**.
- No changes to scheduling, mastery dimensions, or the source-trace rule.
- No invented content of any kind; no new subjects.

## Verification

- `validateCorpus()` at 0 failures after all edits.
- Serve `python -m http.server 8420 --directory outputs`, test in **real
  Chrome** — the in-app Browser pane breaks animation timing and cannot register
  the service worker.
- Regression: a word that resolves today must still resolve after the fold
  changes (the existing direct keys must not regress).
- Bump `?v=` query strings on `term-gloss.js` / `wordparts.js` in the HTML
  import lines and `CACHE_VERSION` in `sw.js`, since the shell changes.
- Do **not** re-run the old `build.py`; patch the HTML directly.
