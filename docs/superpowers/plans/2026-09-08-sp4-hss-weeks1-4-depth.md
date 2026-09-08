# SP4 — HSS2011 Weeks 1–4 Depth and Visuals Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Rewrite the 39 existing HSS2011 Weeks 1–4 lessons (orientation, terminology, osteology, joints, upper limb, lower limb, skull & vertebrae) to full source-backed depth (~3000–5000 chars where source allows), add 9 new items to teach the full scope of lecture decks `hss.4.2` and `hss.4.3` (reaching 48 total items), and give every lesson 2–5 topic-appropriate visuals.

**Architecture:**
- Edits to `outputs/study/corpus/hss-terminology.js`, `outputs/study/corpus/osteology.js`, `outputs/study/corpus/joints.js`, and `outputs/study/corpus/hss-modules.js` (or a dedicated `hss-limbs-head.js` if split).
- New item IDs wired into `WEEK_STUDY.HSS2011[2..4]` in `outputs/schedule.js`.
- Visuals attached via `visuals: [...]` on each item.
- Figures fetched from Wikimedia Commons with `work/fetch-figure.mjs` and registered in `outputs/figures.js` with `intro` and callout `key`.
- Schematics added to `outputs/schematics.js` where no free photo fits.
- Citations verified by `work/source-check.mjs` against `work/source-text.json`.

---

## Sources (All verified in `work/source-text.json`)

| ref | title / file | pages | covers |
| --- | --- | --- | --- |
| `hss.w1.2026` | HSS2011_Wk1__orientat_intro.pdf | 18 | orientation, directions, planes, body cavities |
| `hss.msk.2026` | W1_MusculoskeletalSystem_2026_CKK_upload.pdf | 39 | bone histology, periosteum, marrow, bone types, joint classes & synovial types, ligaments, cartilage, muscle organisation, tendons, motor units |
| `hss.move.2026` | Self-study terminology of movements--for Week 2-4.pdf | 10 | movement terminology, axes, joint motions |
| `hss.4.1` | 4.1 Musculoskeletal System.pdf | 71 | bone structure/shapes, fibrous/cartilaginous/synovial joints, Hilton's law, muscle roles |
| `hss.4.2` | 4.2 Head and Neck.pdf | 61 | skull, sutures, cranial fossae, sinuses, orbits, facial muscles (CN VII), mastication (CN V3), TMJ, vertebrae, C1/C2, neck muscles (CN XI) |
| `hss.4.3` | 4.3 Upper and Lower Limbs.pdf | 58 | pectoral girdle, arm/forearm bones, carpals, rotator cuff, full abduction, brachial plexus, arm muscles, vessels; pelvic girdle, leg bones, tarsals, knee joint, thigh/leg muscles, femoral triangle, foot arches, vessels |
| `hss.manual1920` | Study Manual 1920.pdf | 77 | revision guides, model answers, vessel labeling keys |
| `hss.fib5yr` | 5yrs PP module 1-4 FIB.pdf | 27 | annual past-paper fill-in-the-blank questions |
| `hss.revans` | Revision Exercise Answer.pdf | 28 | model answers for Module 0, 1, 4 |

---

## Task 1: Source Scope Pass (Done)
- [x] Step 1: Read all decks and past exams
- [x] Step 2: Produce and commit `docs/superpowers/notes/sp4-scope.md` (Committed in 8f1a920)

---

## Task 2: Week 1 Implementation — Terminology, Osteology & MSK Foundations

**Files:**
- Modify: `outputs/study/corpus/hss-terminology.js` (6 items)
- Modify: `outputs/study/corpus/osteology.js` (4 items)
- Modify: `outputs/study/corpus/hss-modules.js` (MSK items: 7 items)
- Modify: `outputs/study/corpus/joints.js` (6 items)

For EACH of the 23 existing Week 1 items:
- [ ] **Step 1**: Expand `lesson.explanation`, `plain`, and `keyFacts` to full depth covering all deck points.
- [ ] **Step 2**: Provide verified `sourceRefs` entries `{ ref, location: 'p<N> <quote>' }` matching `work/source-text.json`.
- [ ] **Step 3**: Provide `memory` cues, `practice` questions with `src`, `application` clinical scenarios, and `commonMistakes`.
- [ ] **Step 4**: Attach `visuals: [...]` lists (3D models, figures from `outputs/figures.js`, schematics, `{ gen: true }`).
- [ ] **Step 5**: Run checks and verify passing:
  ```bash
  node work/verify-modules.mjs
  node work/source-check.mjs
  node work/visuals-check.mjs
  node work/figure-key-check.mjs
  ```
- [ ] **Step 6**: Commit Week 1: `git commit -m "feat(sp4): week 1 terminology, osteology and MSK foundations at full depth + visuals"`

---

## Task 3: Week 2 Implementation — Upper Limbs

**Files:**
- Modify: `outputs/study/corpus/joints.js` (`hss2011-joints-movement-map-2026`, `hss2011-structures-rotatorCuff`, `hss2011-joints-rotator-cuff`)
- Modify: `outputs/study/corpus/osteology.js` (`hss2011-osteo-pectoral-girdle`, `hss2011-osteo-forearm-carpals`, `hss2011-structures-carpals`)
- Modify / Add to `outputs/study/corpus/hss-modules.js` (or `hss-limbs.js`):
  - `hss2011-upper-brachial-plexus-nerves` (NEW)
  - `hss2011-upper-limb-muscles-compartments` (NEW)
  - `hss2011-upper-limb-blood-vessels` (NEW)
- Modify: `outputs/schedule.js` (`WEEK_STUDY.HSS2011[2]`)

- [ ] **Step 1**: Rewrite the 6 existing Week 2 items to full depth with verified `sourceRefs` and `visuals: [...]`.
- [ ] **Step 2**: Author the 3 new Week 2 items with citations to `hss.4.3`, `hss.4.1`, `hss.manual1920`.
- [ ] **Step 3**: Fetch needed figures via `node work/fetch-figure.mjs` (e.g. brachial plexus, rotator cuff, carpal bones) and register in `outputs/figures.js` with `intro` + `key`.
- [ ] **Step 4**: Wire new item IDs into `WEEK_STUDY.HSS2011[2]` in `outputs/schedule.js`.
- [ ] **Step 5**: Check verification suite.
- [ ] **Step 6**: Commit Week 2: `git commit -m "feat(sp4): week 2 upper limb at full depth + visuals"`

---

## Task 4: Week 3 Implementation — Lower Limbs

**Files:**
- Modify: `outputs/study/corpus/osteology.js` (`hss2011-osteo-pelvic-girdle`, `hss2011-osteo-leg-tarsals`, `hss2011-structures-tarsals`)
- Modify: `outputs/study/corpus/joints.js` (`hss2011-structures-kneeJoint`)
- Modify / Add:
  - `hss2011-lower-thigh-gluteal-muscles` (NEW)
  - `hss2011-lower-leg-foot-muscles-arches` (NEW)
  - `hss2011-lower-femoral-triangle-vessels-nerves` (NEW)
- Modify: `outputs/schedule.js` (`WEEK_STUDY.HSS2011[3]`)

- [ ] **Step 1**: Rewrite the 4 existing Week 3 items to full depth with verified `sourceRefs` and `visuals: [...]`.
- [ ] **Step 2**: Author the 3 new Week 3 items with citations to `hss.4.3`, `hss.msk.2026`, `hss.manual1920`.
- [ ] **Step 3**: Fetch needed figures via `node work/fetch-figure.mjs` (e.g. knee joint interior, femoral triangle, foot arches) and register in `outputs/figures.js`.
- [ ] **Step 4**: Wire new item IDs into `WEEK_STUDY.HSS2011[3]` in `outputs/schedule.js`.
- [ ] **Step 5**: Check verification suite.
- [ ] **Step 6**: Commit Week 3: `git commit -m "feat(sp4): week 3 lower limb at full depth + visuals"`

---

## Task 5: Week 4 Implementation — Head & Neck (Axial Skeleton & Cervical Anatomy)

**Files:**
- Modify: `outputs/study/corpus/osteology.js` (`hss2011-osteo-skull-sutures`, `hss2011-structures-skullBones`, `hss2011-osteo-vertebra-parts`, `hss2011-osteo-vertebral-column`, `hss2011-osteo-c1-c2`, `hss2011-structures-vertebralRegions`)
- Modify / Add:
  - `hss2011-head-cranial-cavities-sinuses` (NEW)
  - `hss2011-head-facial-expression-muscles` (NEW)
  - `hss2011-head-mastication-neck-muscles` (NEW)
- Modify: `outputs/schedule.js` (`WEEK_STUDY.HSS2011[4]`)

- [ ] **Step 1**: Rewrite the 6 existing Week 4 items to full depth with verified `sourceRefs` and `visuals: [...]`.
- [ ] **Step 2**: Author the 3 new Week 4 items with citations to `hss.4.2`, `hss.fib5yr`, `hss.manual1920`.
- [ ] **Step 3**: Fetch needed figures via `node work/fetch-figure.mjs` (e.g. skull sutures, typical vertebra, C1/C2 atlanto-axial, facial muscles) and register in `outputs/figures.js`.
- [ ] **Step 4**: Wire new item IDs into `WEEK_STUDY.HSS2011[4]` in `outputs/schedule.js`.
- [ ] **Step 5**: Check verification suite.
- [ ] **Step 6**: Commit Week 4: `git commit -m "feat(sp4): week 4 head and neck at full depth + visuals"`

---

## Task 6: Coverage Residue, Docs & Baselines

- [ ] **Step 1**: Run `node work/coverage-gap.mjs --list HSS2011` and update `outputs/study/corpus/coverage.js`.
- [ ] **Step 2**: Regenerate documentation and baselines:
  ```bash
  node work/data-index.mjs
  node work/codemap.mjs
  node work/baseline.mjs
  ```
- [ ] **Step 3**: Bump `CACHE_VERSION` in `outputs/sw.js`.
- [ ] **Step 4**: Run complete 14-check validation sweep:
  ```bash
  node work/load-check.mjs && node work/syntax-check.mjs && node work/verify-modules.mjs && node work/source-check.mjs && node work/visuals-check.mjs && node work/visuals-check.mjs --selftest && node work/figure-key-check.mjs && node work/binding-check.mjs && node work/schedule-check.mjs && node work/shell-check.mjs && node work/codemap-check.mjs && node work/data-index-check.mjs && node work/text-size-check.mjs && node work/baseline.mjs --check
  ```
- [ ] **Step 5**: Commit: `git commit -m "chore(sp4): update coverage, data-index, and baselines for SP4"`

---

## Task 7: Browser Acceptance & Stop Gate

- [ ] Launch `node work/dev-server.mjs`.
- [ ] Verify in Chrome (`http://localhost:8420/radiography-study-studio.html`) with cleared cache:
  - Lessons render legibly without wall-of-text formatting.
  - Visual stacks render properly on desktop and mobile viewports.
  - 3D models mount and respond to interaction.
  - Offline mode retains viewed assets.
- [ ] Measure final depth and visual metrics across Weeks 1–4.
- [ ] Stop and present full report to user for review before proceeding to SP5.
