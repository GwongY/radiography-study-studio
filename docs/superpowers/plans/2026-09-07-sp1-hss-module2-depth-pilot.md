# SP1 — HSS2011 Module 2 Depth Pilot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Rewrite the 13 existing HSS2011 Module 2 lessons (weeks 5–7: neuroanatomy, brain & cranial nerves, special senses) to full source-backed depth (~3000–5000 chars each), add ~7 new items so each lecture holds 6–9, and give every lesson 2–5 topic-appropriate visuals — as the pilot that sets the format for SP2–SP8.

**Architecture:** Pure content edits to `outputs/study/corpus/hss-modules.js` and `outputs/study/corpus/hss-special-senses.js` plus new-item wiring into `outputs/schedule.js` `WEEK_STUDY.HSS2011[5..7]`. Visuals attach via the SP0 `visuals: [...]` field. New figures fetched with `work/fetch-figure.mjs` (Wikimedia-licence-gated); new schematics/layouts added to `outputs/schematics.js` / `outputs/layouts.js` where a pathway has no free photo. Every factual sentence cites a `sourceRefs` entry verified by `work/source-check.mjs` against the page text already in `work/source-text.json`.

**Tech Stack:** Vanilla ES modules. Sources read offline via `node work/query.mjs text <term>` and `node work/query.mjs pages <ref> <N-M>`. No build.

**Branch:** stack on `worktree-sp0-visual-system` (SP0). Worktree at `.claude/worktrees/sp0-visual-system`.

---

## Sources (all cached in work/source-text.json — no drive needed)

| ref | file | pages | covers |
| --- | --- | --- | --- |
| `hss.2.2` | 3.2 Nervous System and Special Sense.pdf | 55 | CNS gross anatomy, spinal cord, meninges, ear, some special sense |
| `hss.2.3` | 3.3 Neuroanatomy.pdf | 46 | brain regions, brainstem, reticular formation, cerebrum, ventricles/CSF, cranial nerves |
| `hss.special.2017` | Anat L9 The special senses.pdf | 38 | eye + visual pathway, ear + cochlea, equilibrium, gustation (olfaction = pointer only) |
| `hss.mooc3` | MOOC 3 Anatomical Correlates of Stroke.pdf | 26 | cerebral arterial territories, stroke correlates (see coverage.js gap note) |
| `hss.revans` | Revision Exercise Answer.pdf | 28 | model answers — the "tested" anchor for M2 |
| `hss.fib5yr` | 5yrs PP module 1-4 FIB.pdf | 27 | fill-in-the-blank past questions by module |
| `hss.pp1718` / `hss.ppans` | 2017-2018 exam + 2012-2017 answers | 7 / 28 | past-paper scope |
| `hss.manual1920` | Study Manual 1920.pdf | — | guiding questions, revision-exercise structure |

Olfaction anatomy is completed from `hss.2.3` (neuro deck), per `coverage.js` — `hss.special.2017`'s olfaction slide is a reading-list pointer only.

## Current items (all 13 rewritten; ids stay stable so progress is preserved)

Week 5 (unit `hss.m2`, `hss.osteo`→no, all `hss.m2`): `hss2011-m2-cns-basics`, `hss2011-cns-spinal-cord-meninges`, `hss2011-cns-brainstem-reticular`, `hss2011-cns-cerebrum-cortex-basal`, `hss2011-cns-ventricles-csf-blood`
Week 6: `hss2011-m2-brain-regions`, `hss2011-neuro-cranial-nerves-distribution`, `hss2011-structures-brainAndCsf`, `hss2011-structures-cranialNerves`
Week 7: `hss2011-m2-eye-visual-pathway`, `hss2011-m2-ear-hearing`, `hss2011-m2-static-dynamic-equilibrium`, `hss2011-m2-taste-smell`

Current lesson bodies: 1116–2398 chars. Target: 3000–5000.

## New items to add (~7, ids provisional — confirm against source scope in Task 1)

- W5: `hss2011-cns-grey-white-matter-tracts` (grey vs white matter, ascending/descending tracts, decussation) — `hss.2.2`/`hss.2.3`
- W5: `hss2011-cns-spinal-nerves-plexuses` (31 pairs, roots/rami, the four plexuses named in the deck) — `hss.2.2`
- W6: `hss2011-neuro-cerebral-blood-supply` (circle of Willis, ACA/MCA/PCA territories) — `hss.mooc3` + `hss.2.3` (flag: `coverage.js` says no items built from MOOC yet — this closes that gap)
- W6: `hss2011-neuro-cerebellum-function` (lobes, peduncles, role) — `hss.2.3`
- W6: `hss2011-neuro-limbic-diencephalon` (thalamus, hypothalamus, limbic structures) — `hss.2.3`
- W7: `hss2011-special-eye-gross-anatomy` (three tunics, refractive media, chambers) — `hss.special.2017`
- W7: `hss2011-special-ear-three-regions` (external/middle/inner as a structural walk before the hearing pathway) — `hss.special.2017` + `hss.2.2`

Confirm each is genuinely in the taught+tested scope before writing (Task 1). Drop any the sources do not support; add any the source review surfaces.

---

## Task 1: Source scope pass — decide the final item list

**Files:** none yet — produces `docs/superpowers/notes/sp1-m2-scope.md` (working note, committed).

- [ ] **Step 1: Read the three decks end to end**

```bash
node work/query.mjs pages hss.2.2 1-55
node work/query.mjs pages hss.2.3 1-46
node work/query.mjs pages hss.special.2017 1-38
```

- [ ] **Step 2: Read the tested anchor**

```bash
node work/query.mjs text "Module 2" ; node work/query.mjs text "neuroanatomy"
node work/query.mjs pages hss.revans 1-28
node work/query.mjs pages hss.fib5yr 1-27
```
Note every Module-2 revision-exercise question and every M2 fill-in-the-blank — these define what MUST be covered.

- [ ] **Step 3: Write the scope note**

Create `docs/superpowers/notes/sp1-m2-scope.md`: for each of weeks 5/6/7, a table of sub-topics the deck teaches × whether a revision/past-paper question tests it × which item (existing id or new id) will carry it × the 2–4 `sourceRefs` pages. Target 6–9 items per week. This table is the contract for Tasks 2–4.

- [ ] **Step 4: Commit**

```bash
git add docs/superpowers/notes/sp1-m2-scope.md
git commit -m "docs(sp1): Module 2 source-scope pass — final item list and page map"
```

---

## Task 2: Week 5 — spinal cord and CNS foundations

**Files:**
- Modify: `outputs/study/corpus/hss-modules.js` (the `hss.m2` items — grep `hss2011-m2-cns-basics`)
- Modify: `outputs/schedule.js` (`WEEK_STUDY.HSS2011[5]` — add new ids)

For EACH of the 5 existing W5 items + the new W5 items from Task 1:

- [ ] **Step 1: Draft the lesson**

Rewrite `lesson.explanation` (and `keyFacts`) to ~3000–5000 chars covering everything the deck presents on that sub-topic. EVERY factual sentence must be traceable to a specific page in `hss.2.2` / `hss.2.3` / `hss.revans`. Use `node work/query.mjs text "<phrase>"` to find and confirm the exact page before citing it. App-authored memory aids go in `memory` / `lesson.studyNote` and are tagged (the existing templates show the tag markup).

- [ ] **Step 2: Set `sourceRefs`**

Every page cited in the prose gets a `sourceRefs` entry `{ ref, location: 'p<N> <short quote>' }`. `work/source-check.mjs` verifies the quote is on that page.

- [ ] **Step 3: Practice + commonMistakes**

Keep/expand `practice` (≥1 question, `validateQuestion` must pass). Fill `commonMistakes` from past-paper distractors where Task 1 found them.

- [ ] **Step 4: Visuals**

Add `visuals: [...]`. For CNS structure: a 3D model view from the `nervous` layer (`{ model: { layer:'nervous', meshes:[...], label, caption } }` — verify mesh names with `node work/query.mjs mesh <term>`), plus a free figure (run `node work/fetch-figure.mjs search "spinal cord cross section grey matter"`, then `get` the one whose licence verifies — it prints the `figures.js` stanza; paste it into `outputs/figures.js` with an `intro` + `key`), plus a schematic for the tract layout if no free figure fits (add to `outputs/schematics.js` or a layout to `outputs/layouts.js`). 2–5 per item, per the SP0 density guidance.

- [ ] **Step 5: New items into WEEK_STUDY**

Add each new item's id to the `HSS2011: { 5: [...] }` array in `outputs/schedule.js`.

- [ ] **Step 6: Check**

```bash
node work/verify-modules.mjs      # validateCorpus 0 failures, validateVisuals clean
node work/source-check.mjs        # every new citation on its page
node work/visuals-check.mjs       # every visuals[] entry resolves
node work/figure-key-check.mjs    # new figures have intro + key
node work/binding-check.mjs
node work/schedule-check.mjs      # new ids resolve, still in-week
node work/load-check.mjs
```

- [ ] **Step 7: Commit** — `git commit -m "feat(hss-m2): week 5 spinal cord and CNS foundations at full depth + visuals"`

---

## Task 3: Week 6 — brain regions, cerebral blood supply, cranial nerves

**Files:**
- Modify: `outputs/study/corpus/hss-modules.js`
- Modify: `outputs/study/corpus/structures.js` (if `hss2011-structures-brainAndCsf` / `-cranialNerves` structure sets need more members)
- Modify: `outputs/schedule.js` (`WEEK_STUDY.HSS2011[6]`)

Same 7 steps as Task 2, for the 4 existing W6 items + new W6 items. Notes:
- `hss2011-neuro-cerebral-blood-supply` is new and uses `hss.mooc3` — this is the first item built from any MOOC; update `outputs/study/corpus/coverage.js` HSS2011 `gaps` to remove or amend the "MOOC 1–3 … no study items … yet" line.
- Cranial nerves: the deck gives function, foramen, and lesion signs for each — the rewrite should carry all three per nerve, cited.
- Visuals: `nervous` layer for the brain and CN roots; Gray's plates / OpenStax for the circle of Willis; a schematic for the CN-to-foramen mapping.

- [ ] Commit — `git commit -m "feat(hss-m2): week 6 brain regions, cerebral circulation, cranial nerves at full depth + visuals"`

---

## Task 4: Week 7 — special senses

**Files:**
- Modify: `outputs/study/corpus/hss-special-senses.js`
- Modify: `outputs/schedule.js` (`WEEK_STUDY.HSS2011[7]`)

Same 7 steps for the 4 existing W7 items + new W7 items, cited to `hss.special.2017` (+ `hss.2.2` for the ear, `hss.2.3` for olfaction). Notes:
- The eye: three tunics, refractive media, aqueous/vitreous chambers, the full visual pathway retina→optic nerve→chiasm→tract→LGN→radiation→occipital cortex, with the visual-field defect at each level.
- The ear: external/middle/inner walk, then the hearing pathway, then the two equilibrium mechanisms (static = utricle/saccule/maculae, dynamic = semicircular canals/cristae).
- Gustation + olfaction: receptors, cranial nerves, central projection.
- Visuals: OpenStax eye/ear cross-sections (free), a visual-pathway schematic (add to `schematics.js` — the retired plotter still renders, or a layout), `organs` layer for the eyeball if a mesh exists (`node work/query.mjs mesh eyeball` — note `synonyms.js` lists Eyeball as a COMPOSITE).

- [ ] Commit — `git commit -m "feat(hss-m2): week 7 special senses at full depth + visuals"`

---

## Task 5: Coverage residue, docs, baselines

**Files:** `outputs/study/corpus/coverage.js`, regenerated docs, baselines.

- [ ] **Step 1: Record what was left out**

```bash
node work/coverage-gap.mjs --list HSS2011
```
For every M2-relevant document it still lists, add a line to `outputs/study/corpus/coverage.js` HSS2011 `gaps` (or `covered`) saying why. Remove the now-false "MOOC … no study items yet" line if Task 3 built the blood-supply item.

- [ ] **Step 2: Regenerate**

```bash
node work/data-index.mjs      # item count + type counts changed
node work/codemap.mjs         # only if a banner/section moved
node work/baseline.mjs        # corpus-snapshot + ui-strings WILL move — regen after eyeballing the diff is only the M2 items
node work/baseline.mjs --check
```

- [ ] **Step 3: Full sweep**

```bash
node work/load-check.mjs
node work/verify-modules.mjs
node work/source-check.mjs
node work/visuals-check.mjs
node work/visuals-check.mjs --selftest
node work/figure-key-check.mjs
node work/binding-check.mjs
node work/schedule-check.mjs
node work/shell-check.mjs      # if outputs/figures.js grew, its ?v= may need a bump + sw shell alignment
node work/codemap-check.mjs
node work/data-index-check.mjs
node work/text-size-check.mjs
node work/baseline.mjs --check
```

- [ ] **Step 4: Commit** — `git commit -m "chore(sp1): Module 2 coverage residue, data-index, baselines"`

---

## Task 6: Real-Chrome acceptance

- [ ] Serve the worktree `outputs/` (a static server on a spare port — the main dev server on 8420 serves master), open the app, unregister the SW, clear caches, reload.
- [ ] Open each of the 3 weeks in Learn. Every lesson: reads at ~3–5k without wall-of-text (headings/lists render), every `visuals` entry shows, figure credits render, the 3D entry mounts and is tappable, glossary terms are tappable, no console errors beyond the pre-existing `boot.js:29`.
- [ ] Check one lesson at mobile width (`resize_window` mobile) — visuals stack, no horizontal scroll.
- [ ] `node work/query.mjs text` spot-check: pick 5 random new sentences, confirm each is on the page its `sourceRefs` cites.
- [ ] Screenshot a rewritten lesson with a multi-visual stack; send to the user.

---

## Self-Review

**Spec coverage (against the design doc "SP1 — pilot" section):**
- 13 → ~20 items, long-form, fully cited → Tasks 2–4.
- 2–5 visuals per item from free sources + schematics + 3D → Task 2–4 Step 4.
- ids wired into `WEEK_STUDY` → Task 2–4 Step 5.
- `coverage-gap --list HSS2011` residue recorded → Task 5 Step 1.
- Review gate (user reads the pilot before SP2–SP8) → Task 6 + handoff.
- ids stay stable so progress is preserved → stated in "Current items".

**Placeholder scan:** The new-item list (Task 1 preamble) is explicitly provisional and Task 1 finalises it against the sources — that is a real step, not a placeholder. Per-item prose is not pre-written here because it must be authored from the source pages during execution; the constraint (every sentence page-cited, 3–5k, `source-check` green) is concrete.

**Type consistency:** `visuals: [...]` entries use the SP0 shapes (`{fig}`, `{plate}`, `{schematic}`, `{model:{layer,meshes,label,caption}}`, `{gen}`) validated by `validateVisuals` and `work/visuals-check.mjs`. New figure ids must exist in `FIGURES` (Task 2–4 Step 4 adds them via `fetch-figure.mjs`).

---

## Notes for the implementer

- **Do not invent.** If a sentence cannot be cited to a page in `work/source-text.json`, it does not go in the lesson — or it goes in a tagged app-authored memory aid. `work/source-check.mjs` at 0 misplaced/missing is the gate.
- `outputs/` is CRLF; `work/*.mjs` LF. Use the Edit tool.
- `git status` before regenerating baselines — this is an isolated worktree so it should only ever show SP1 files, but check.
- One lecture per commit keeps the review tractable. The user reviews after Task 6.
- If `fetch-figure.mjs` cannot find a free image for a structure, author a schematic — do not use a non-free image and do not leave the lesson pictureless.
