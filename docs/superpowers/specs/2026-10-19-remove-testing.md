# Remove all testing from the app

Owner, 2026-10-19: "I don't need any test in this app. Remove it", choosing "All testing in the
app" over "only Revise's Test me". The owner now learns each chapter with ChatGPT or Claude, and the
app only links and revises it (CLAUDE.md principle 0).

## Decisions (owner, 2026-10-19)

| Question | Answer |
| --- | --- |
| Existing answer history (mastery, mistakes, answer log) | **Delete it from the device.** One-time purge on first load; no export step. |
| Gist sync | **Remove entirely**, with the transfer/export dialog and Reset. |
| Question corpus | **Delete the whole corpus** (items, questions, validators). See "What the corpus deletion costs". |
| Today and Course | **Revise links only.** |

The private Gist on GitHub is never touched by the app. The owner can delete it by hand at
github.com; the spec's closing note tells them so.

## Out of scope

- Revise's own "Test me" (`#rvQuiz`): removed by the Revise redesign (spec
  `2026-10-19-revise-depth-and-3d-hub.md`). Do not touch `revise.js`, `revise-brain.js` or
  `outputs/revision/`.
- The Assessments tab in Course (`assessments-and-marks.js`, `DEADLINES`, the running weighted mark).
  These are the owner's real course assessments (dates, weights, marks they typed in), not tests
  inside the app. They stay.
- The university-notice token and weekly briefing (`briefing-access.js`, `weekly-briefing.js`): a
  separate credential for a separate private repository. They stay.
- The 3D studio, the Heart and Limb atlases, search over structures, the reading help and glossary.

## What goes

**Study parts (`outputs/study/`)**
- `session-engine.js`, `layout-figures.js` (Practise, Apply, the session overlay, answer matching,
  the stage nav), `progress-log.js`, `gist-sync.js`, `moving-progress-between.js`, `reset.js`.
- From `home.js`: the resume-point (`continue`) state, `STEPS`, `getItemStep`, `saveContinue`.
- From `dialog-behaviour-applied.js`: the session wiring (`rssSkipBtn`, `#mode=` launch shortcut,
  the transfer/sync/reset dialog handlers). The dialog opener itself stays.
- From `navigation-destinations.js`: `openSessionOverlay`, `closeSessionOverlay`,
  `suspendSessionForViewer`, the viewer "back to session" bar.
- From `more-sources-coverage.js`: the backup, sync and reset rows and the corpus-validation row.
- From `global-search-one.js`: the session-dismiss calls; any result that opens a study item.
- From `storage-versioned-keys.js`: the mastery/item/mistake/log stores, migration of them,
  `K.mastery`, `K.items`, `K.mistakes`, the answer-log keys. Plain `read`/`write` stay for the
  settings that remain.

**Markup and manifest**: `#sessionView`, `#viewerSessionReturn`, `#transferDialog`,
`#syncDialog`, `#resetDialog`, the Today stat/mistake remnants, `#mode=` shortcuts in the web
manifest, and the CSS used only by them (checked against `text-size-check`).

**Corpus**: `study-data.js` barrel and the corpus files that hold items and questions
(`study/corpus/*-items.js`, `hss-*.js`, `physiology-*.js`, `expansion-items.js`,
`derived-items.js`, `corpus.js`, `mastery.js`, `coverage.js`, `notices.js`), plus `validateCorpus`,
`validateApplications`, `allQuestions`, `itemsForUnit`, `priorOf`, `entryStep`.

**Schedule**: `outputs/schedule.js` loses item ids: `WEEK_STUDY`, `studyFor`, `relatedFor`,
`weekTopicId`'s item mapping, the `unit:` field's "Study this" use. Dated sessions, weeks,
staff, assessments and `WEEK_GAPS` remain only if they do not name items (the plan checks each).

**Coverage report** (`coverage-report.js`): it counts study items and maps item sources. It goes.

## What the corpus deletion costs, and what is kept

Deleting "the corpus" does not mean deleting everything that lives next to it. These are not
questions and other features read them, so they move into one small module,
`outputs/study/course-data.js` (no items, no mastery, no questions):

| Kept | Used by |
| --- | --- |
| `STRUCTURE_MODELS` (layer to GLB, label) | the 3D viewer, search, Subject, layer rail |
| `SUBJECTS` (id, title, accent colour only; units list dropped) | Course accents, assessments |
| `SOURCE_ROOTS`, `SOURCE_FILES`, `describeSource`, source map helpers | the source dialog, Viewer tools citations, bone landmarks and cut levels, the Course syllabus text |
| `REVEAL_MODES`, `DIAGRAMS` | only if the plan finds a live reader; otherwise deleted too |

`mesh-index.js` (generated) keeps its `UNITS`: they are study-unit ids used for layer counts and
search grouping, not items. They are left as they are.

**Lost for good** (the owner has accepted this by choosing the whole-corpus option): the question
text, the worked explanations and "common mistakes" in every item, the per-item `sourceRefs` page
citations, the coverage report, and the Course/Today "Study this" links. The facts are not lost from
the world: the lecture decks in the iCloud subject folders remain the source; git history keeps the
corpus (`git show 235c93f:outputs/study/corpus/...`).

## Checks

Retired with their subject: `progress-log-check`, `gist-sync-check`, `corpus-check`,
`array-integrity-check`, `corpus-snapshot`, `study-regression-check`, `source-lesson-check`,
`build-source-lesson-map`, and the item subcommands of `work/query.mjs` and `data-index.mjs`.

Narrowed: `source-check` (keeps bone-landmark and cut-level citations), `schedule-check` (dated
sessions, weights, no item ids), `assessment-check`, `binding-check`, `bridge-check`, `shell-check`,
`load-check` (drop `study-data.js` from its list), `search-probe`, `codemap-check`,
`data-index-check`, `text-size-check`, `baseline.mjs --check` (the retired probes leave the
baseline; `ui-strings` is regenerated and its diff reviewed line by line: it should lose only
testing sentences).

Every retirement goes into `outputs/README.md` and the CLAUDE.md "After every edit" list in the same
commit, so no check is silently missing.

## One-time purge

First load after this ships, `purgeTesting()` (in `boot.js`, guarded by a marker key and run once)
removes, from `localStorage`: the answer log and its months, mastery, item records, mistakes, meta
(streak), resume point, per-item steps (`rss-step:*`, `rss.v1.step:*`), the gist connection settings
and last-sync state, and the legacy `osteology-studio-stats`; and deletes the old answer-log
IndexedDB if one exists. It uses an explicit key list built from `K`, never a prefix sweep, so
Revise's week pick, text size, briefing token and viewport keys survive. The marker is
`rss.v1.testing-purged`.

## Today and Course

- **Today**: This week (next deadline) and the deadline list stay; the buttons are Assessments and
  Revise. Nothing about mastery, streaks, due reviews or practice remains.
- **Course**: a session row keeps "Revise" where the subject has revision data (currently HSS2011)
  and nothing otherwise, as it does now. "Study this" and gap-to-item links are removed.

## Verification

1. All kept checks above pass; `git grep` for `recordAttempt`, `startSession`, `practiseHTML`,
   `getMastery`, `logMistake`, `STUDY_ITEMS` returns nothing outside git history and the retired-note.
2. `CACHE_VERSION` bumped; `shell-check` clean (deleted modules are out of SHELL).
3. Browser at phone width (375x812) after unregistering the service worker and clearing caches:
   Today, Revise, Viewer, Course, More all open with no console errors; search works; a pre-seeded
   `localStorage` with fake mastery and mistakes is empty after one load while text size survives.
4. `CODEMAP.md` and `DATA-INDEX.md` regenerated after `git status` shows only this work in them
   (someone else already has uncommitted edits in `docs/CODEMAP.md`; their hunks are not swept in:
   regenerate last, review the diff).
5. CLAUDE.md: principle 0 loses "Practise and Apply remain as the testing half"; principle 1 and the
   hard rules about `sourceRefs`, `validateCorpus()` and "taught and tested syllabus scope" are
   rewritten to describe what is now true; the layout table, `outputs/study/corpus` row and check
   list are updated.

## Order of work (one commit per step, locally; nothing pushed)

1. Spec (this file).
2. Extract `course-data.js`; repoint importers; no behaviour change; checks green.
3. Remove the session overlay, Practise/Apply, progress log, Gist, transfer, reset, with markup/CSS.
4. Strip schedule items, Today and Course remnants, coverage report.
5. Delete the corpus and its barrel; retire and narrow checks.
6. Purge, SW bump, docs and CLAUDE.md, regenerate CODEMAP/DATA-INDEX, browser verification.

## Addendum, found during implementation

- **The 3D studio has its own drill.** The viewer's Explore panel carries Identify, Left / right,
  Landmarks, Find and Memory modes (`studio/visualisation-modes.js`, `depth-picking.js`, the
  `#studyModes` markup) with a private score history in `osteology-studio-stats`. They were not in
  the list of surfaces and CLAUDE.md calls the studio a reference tool, so this change leaves them
  and the purge does not touch their key. Removing them is a separate decision for the owner.
- **`gloss-coverage-check`** swept study items. It now sweeps the Revise notes and reports 17
  untappable words as warnings, because closing them is gloss work, not part of this change.
- **`search-accuracy-check.mjs`** fails on the untouched HEAD ("full model names must remain
  individually accessible"); not caused by this change.
- Order of work changed: the study parts went first, and `course-data.js` was cut from what the
  surviving code still imported, rather than before.

## Part 2: the 3D studio's drill modes (owner, 2026-10-19: "Yes, remove them")

The owner chose to remove Identify, Left / right, Landmarks, Find and Memory, and to delete
`osteology-studio-stats`. Same rules as above: no history export, no dead imports.

**Goes**
- Markup: the `#studyModes` mode bar with its six buttons, `#studyPool`, `#feedback`, `#answers`,
  `#nextBtn`, and the CSS only they use (`.modebar`, `.mode-btn`, `.studypool`, `.feedback`,
  `.answers`, `.answer`, `.studyscore`; each checked for another user first).
- `studio/visualisation-modes.js`: `setMode` (reduced to nothing: the panel is always Explore),
  `renderStudyPool`, `scoreHTML`, `applyModeVisuals`, `MODE_ASK`/`MODE_LABEL`, `startQuestion`,
  `startQuestionFor`, `distractorPool`, `renderAnswers`, `renderMemoryAnswers`, `renderMemoryCloze`,
  `renderLandmarkQuestion`, `answer`, `recordAnswer`, `record`, `saveStats`, `weightedPick`,
  `modePool`, `pool`/`selectableIds` if nothing else reads them, `renderReview`, `clearFeedback`,
  and the `resetStats` / `refreshStudyPool` bridge entries (with the call in `study/subject.js`).
- `onBonePicked` loses its Find and Landmarks branches; tapping a bone still selects it.
- `studio/imports.js`: `state.mode/current/quizStarted/memoryStreak/runStreak/stats`, `loadStats`,
  the quiz `els`. `studio/depth-picking.js`: the `.mode-btn` wiring, `setMode('explore')`, the
  `hotspotTargets` branch. `studio/region-boxes-how.js` and `live-physiology.js`: the landmark
  hotspots (`addHotspots`, `showHotspots`, `remapHotspotsToReal`, `state.hotspots`) which were only
  ever shown in Landmarks mode, and `LANDMARK_HOTSPOTS` in `anatomy-data.js` once nothing reads it.
- Purge: `osteology-studio-stats` joins the one-time list, and the purge marker is bumped to a new
  key (`rss.v1.testing-purged-2`) so devices that already ran the first purge run this one too.

**Stays**: `MEMORY_TIPS` and `memoryTipHTML`. The selected-structure card shows a bone's mnemonic
under its landmarks; that is reading, not testing. The `bone-landmarks.js` close-view labels are a
different thing from `LANDMARK_HOTSPOTS` and are untouched. `state.region` and the region filter
stay (they filter the viewer, not a drill).

**Checks**: `toplevel.mjs` before touching the studio parts' structure, then `binding-check`,
`bridge-check`, `load-check`, `shell-check`, `region-probe`, `search-probe`, `text-size-check`,
`codemap-check`, baselines (`ui-strings` diff reviewed), plus a browser run at 375x812: select a
structure by tap and by search, open the detail dialog, switch layers, no console errors.
CLAUDE.md principle 0 loses its "left alone" sentence; README's note is updated.
