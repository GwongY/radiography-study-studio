# Y1S1 Source-Lesson Organization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Organize the original New and old source files under the current Y1S1 syllabus lessons, identify New sources automatically, and show the grouped source files in the Course and Coverage views without generating replacement teaching notes.

**Architecture:** Keep the existing `STUDY_ITEMS` and their verified `sourceRefs` as the teaching-content boundary. Add a generated, compact source-map module that indexes each Y1S1 lesson to its original source references and records New/old roles; a Node generator also writes a gitignored local audit for files that are not safe or not evidenced enough for the public app. The Course and Coverage renderers consume the map, so one source file can appear under several lessons without copying its text or creating duplicate notes.

**Tech Stack:** Vanilla browser ES modules, existing static HTML/CSS PWA, Node.js ES-module work scripts, committed generated data modules, and the existing real-browser smoke path. No framework, bundler, or new dependency.

**Spec:** `docs/superpowers/specs/2026-09-05-y1s1-source-lesson-organization-design.md`

## Global Constraints

- The current Y1S1 syllabus and current Y1S1 schedule decide which lessons exist and how they are ordered.
- The original source files are the teaching notes by default: they are grouped and opened as supplied, rather than rewritten into a second note.
- A verified file from `New sources` is the preferred current source; an older file is supporting evidence or an explicitly labelled fallback.
- Only files evidenced as Y1S1 are lesson-mapped; other files remain `not mapped — future scope` and are not assigned using a guessed syllabus.
- An unread or OCR-failed file cannot support a factual lesson claim until its page text has passed the existing source-verification gate.
- No shared-drive file is moved, deleted, or renamed.
- The map adds organization and version metadata; it does not create an alternate copy of source content or bypass exact page/quote traceability.
- Every shell change, including JavaScript or CSS, requires a `CACHE_VERSION` bump in `outputs/sw.js`.
- Generated files are rebuilt by their existing generators and are never hand-edited: `docs/CODEMAP.md`, `docs/DATA-INDEX.md`, and the committed runtime source-map module.
- Preserve the existing dirty worktree; stage only files belonging to the current task in each commit.

## File map

| File | Responsibility |
| --- | --- |
| `work/lib/source-lesson-map.mjs` | Pure filename normalization, New/old detection, role selection, lesson status, and map-shape helpers used by the generator and verifier. |
| `work/source-lesson-check.mjs` | Runtime-map integrity checker plus a deterministic `--selftest` fixture path. |
| `work/fixtures/source-lesson-map-selftest.json` | Two-version fixture proving New-source precedence, one lesson index, and explicit gap handling. |
| `work/build-source-lesson-map.mjs` | Reads the committed catalogue, source registry, coverage intake, schedule, corpus, and local OCR cache; emits the compact runtime module and local audit. |
| `outputs/study/corpus/source-lesson-map.js` | Generated public Y1S1 map containing source references and labels, never copied source prose. |
| `outputs/study-data.js` | Re-exports the map through the existing data barrel. |
| `outputs/study/imports.js` | Makes the map helpers available to study-system modules. |
| `outputs/study/course-timetable.js` | Shows grouped source badges/files under each current Y1S1 lesson. |
| `outputs/study/source-dialog.js` | Shows New/old and role metadata beside the existing source filename, folder, and page/section fields. |
| `outputs/study/coverage-report.js` | Replaces the flat primary source view with a Y1S1 subject/week/lesson source grouping and a clear future-scope note. |
| `outputs/app.css` | Adds only the layout rules needed for source groups; content text continues to scale through the existing `--ts` contract. |
| `.gitignore` | Keeps the local source audit, which may contain private filenames, out of the public repository. |
| `outputs/sw.js` | Precaches the new runtime map and increments `CACHE_VERSION`. |
| `outputs/README.md` | Documents source-index ownership, New-source precedence, source-as-note behavior, and Y1S1-only scope. |
| `docs/CODEMAP.md` | Regenerated after adding the new code files. |
| `docs/DATA-INDEX.md` | Regenerated after adding the new public data exports. |

## Runtime data contract

The generated `outputs/study/corpus/source-lesson-map.js` must export exactly
these public names:

```js
export const SOURCE_MAP_VERSION = '2026-09-05';
export const Y1S1_SOURCE_MAP = {
  scope: 'Y1S1',
  byLesson: {
    'lesson-id': {
      id: 'lesson-id',
      subject: 'HSS2011',
      week: 1,
      title: 'Lesson title',
      status: 'complete', // complete | partial | missing | needs-review
      sources: [
        { ref: 'source-ref', set: 'new', role: 'current-primary' },
        { ref: 'older-ref', set: 'old', role: 'older-supporting' },
      ],
      reasons: [],
    },
  },
  byWeek: { HSS2011: { 1: ['lesson-id'] } },
  bySource: { 'source-ref': [{ lessonId: 'lesson-id', set: 'new', role: 'current-primary' }] },
};

export function sourceGroupFor(lessonId) {
  return Y1S1_SOURCE_MAP.byLesson[lessonId] || null;
}
export function sourceGroupsForWeek(subject, week) {
  return (Y1S1_SOURCE_MAP.byWeek[subject]?.[week] || [])
    .map(sourceGroupFor).filter(Boolean);
}
export function sourceMetaFor(ref, lessonId = '') {
  const group = lessonId ? sourceGroupFor(lessonId) : null;
  return group?.sources.find((s) => s.ref === ref)
    || Y1S1_SOURCE_MAP.bySource[ref]?.[0]
    || null;
}
export function sourceSetLabel(set) {
  return set === 'new' ? 'New source' : 'Old source';
}
export function sourceRoleLabel(role) {
  return ({
    'current-primary': 'primary',
    'older-supporting': 'supporting',
    'older-fallback': 'fallback',
    assessment: 'assessment/practice',
    administration: 'administration',
    'student-work': 'student work',
    'not-mapped-future': 'future scope',
    'needs-review': 'needs review',
  })[role] || 'source';
}
```

The generated file contains no `lesson`, `memory`, `practice`, `application`,
or copied source-text field. The original item content remains in the existing
corpus, and the source map only points to `SOURCE_FILES` references.

Source roles use these stable values:

| Source evidence | Role | Public treatment |
| --- | --- | --- |
| New intake, verified teaching source, linked to a Y1S1 item | `current-primary` | `New source · primary` |
| Old verified teaching source, with a New primary for the same lesson | `older-supporting` | `Old source · supporting` |
| Old verified teaching source, no usable New primary for the lesson | `older-fallback` | `Old source · fallback` |
| Assessment or practice file | `assessment` | Separate context group |
| Timetable, syllabus, or administration file | `administration` | Course/source context only |
| Student-produced work | `student-work` | Never factual teaching evidence |
| Candidate not evidenced as current Y1S1 | `not-mapped-future` | Local audit only |
| Current-subject candidate with insufficient source evidence | `needs-review` | Gap/review state, not primary |

## Implementation tasks

### Task 1: Establish the source-map contract and failing self-test

**Files:**

- Create: `work/lib/source-lesson-map.mjs`
- Create: `work/source-lesson-check.mjs`
- Create: `work/fixtures/source-lesson-map-selftest.json`

**Interfaces:**

- `work/source-lesson-check.mjs` consumes pure helpers from `work/lib/source-lesson-map.mjs`.
- Later generator code consumes `normaliseSourceFile`, `sourceSetFor`, `sourceRoleFor`, `lessonStatus`, and `indexMap`.

- [ ] **Step 1: Write the self-test fixture and assertions first.**

  Store this fixture in `work/fixtures/source-lesson-map-selftest.json`:

  ```json
  {
    "newFile": "Lecture 1 (2026).pdf",
    "oldFile": "Lecture 1 (2020).pdf",
    "lessonId": "demo-lesson",
    "newKind": "primary",
    "oldKind": "primary"
  }
  ```

  Make `node work/source-lesson-check.mjs --selftest` assert the following
  behavior:

  ```js
  const newFiles = new Set([normaliseSourceFile(fixture.newFile)]);
  assert.equal(sourceSetFor({ file: fixture.newFile, locations: [] }, newFiles), 'new');
  assert.equal(sourceSetFor({ file: fixture.oldFile, locations: [] }, newFiles), 'old');
  assert.equal(sourceRoleFor({ set: 'new', kind: 'primary', verified: true, hasNewPrimary: true }), 'current-primary');
  assert.equal(sourceRoleFor({ set: 'old', kind: 'primary', verified: true, hasNewPrimary: true }), 'older-supporting');
  assert.equal(sourceRoleFor({ set: 'old', kind: 'primary', verified: true, hasNewPrimary: false }), 'older-fallback');
  assert.equal(lessonStatus({ primary: [], supporting: [], unresolved: true, hasGap: false }), 'needs-review');
  assert.equal(lessonStatus({ primary: [], supporting: [], unresolved: false, hasGap: true }), 'missing');
  ```

- [ ] **Step 2: Run the new self-test and verify it fails for the intended reason.**

  Run:

  ```bash
  node work/source-lesson-check.mjs --selftest
  ```

  Expected: failure because the pure helper module and runtime map contract do
  not exist yet; no existing app verifier should be changed by this failure.

- [ ] **Step 3: Implement the pure helpers with deterministic rules.**

  `normaliseSourceFile(name)` must URL-decode filenames such as
  `ER_Lec1%282026%29.pdf`, replace backslashes with slashes, remove directory
  prefixes, lowercase, and collapse whitespace. `sourceSetFor(source, newFiles)`
  returns `new` when the normalized filename is in `newFiles` or one of the
  resolved catalogue locations is below a `New source` directory; otherwise it
  returns `old` for course-source material. It must never use a newer-looking
  filename alone to promote an old file.

  `sourceRoleFor({ set, kind, verified, hasNewPrimary })` must return
  `needs-review` when `verified` is false, `assessment` for `kind ===
  'assessment'`, `administration` for `kind === 'admin' || kind === 'syllabus'`,
  `student-work` for `kind === 'student'`, `current-primary` for verified New
  teaching evidence, `older-supporting` for verified old teaching evidence when
  `hasNewPrimary` is true, and `older-fallback` otherwise.

  `lessonStatus({ primary, supporting, unresolved, hasGap })` returns
  `complete` when `primary.length > 0`, `partial` when there is verified
  supporting/fallback evidence but no primary, `needs-review` when unresolved
  evidence exists without a usable source, and `missing` when no verified
  teaching source exists. `hasGap` supplies the reason for a missing group; it
  does not change the status calculation.

- [ ] **Step 4: Run the self-test and commit the contract.**

  Run:

  ```bash
  node work/source-lesson-check.mjs --selftest
  ```

  Expected: `SELFTEST PASS` with the New/old and status assertions passing.

  Commit only the three Task 1 files:

  ```bash
  git add work/lib/source-lesson-map.mjs work/source-lesson-check.mjs work/fixtures/source-lesson-map-selftest.json
  git commit -m "test: define Y1S1 source-map contract"
  ```

### Task 2: Generate the Y1S1 map and local audit

**Files:**

- Create: `work/build-source-lesson-map.mjs`
- Create: `outputs/study/corpus/source-lesson-map.js`
- Modify: `.gitignore`

**Interfaces:**

- Consumes `SOURCE_FILES`, `COVERAGE.newSourceIntake`, `STUDY_ITEMS`,
  `STUDY_SUBJECTS`, `WEEK_STUDY`, `WEEK_GAPS`, and `resolveSource()`.
- Produces the exact exports in the Runtime data contract and
  `work/.source-lesson-audit/INDEX.tsv`.

- [ ] **Step 1: Add the local audit directory to `.gitignore`.**

  Add this exact entry below the existing local source-text cache entry:

  ```text
  # Local New/old source-to-lesson audit; may contain private filenames.
  work/.source-lesson-audit/
  ```

- [ ] **Step 2: Write the generator’s input and output assertions before its map implementation.**

  `work/build-source-lesson-map.mjs` must exit with status 2 and leave the last
  committed map untouched when `work/source-catalogue.json` is absent. When the
  catalogue exists, it must write the generated module only after all current
  Y1S1 lessons have been assembled.

  The generator must derive expected lessons exactly as follows:

  ```js
  const expected = Object.entries(WEEK_STUDY).flatMap(([subject, weeks]) =>
    Object.entries(weeks).flatMap(([week, ids]) => ids.map((id) => ({
      id, subject, week: Number(week), item: getItem(id),
    })))
  );
  ```

  It must reject a missing `item`, a duplicate lesson ID with different
  subject/week placement, or a lesson whose item has no explicit
  `sourceRefs` and no matching `WEEK_GAPS` entry.

- [ ] **Step 3: Implement source-set detection from the catalogue and New intake.**

  Build `newFiles` from the normalized literal filenames in
  `COVERAGE.newSourceIntake`. Also inspect every resolved catalogue location;
  a path component named `New source` is `new`, a path under the local
  `Old source` folder is `old`, and a shared course-folder document not in the
  New intake is `old`. Store the evidence in the audit as `intake`, `catalogue
  path`, or `registry-only`; do not infer `new` from date or filename wording.

  Resolve registry entries with the existing `resolveSource(entry, cat,
  SOURCE_ROOTS)` helper so a repeated filename such as `Lecture notes.pdf` is
  not accidentally associated with the wrong lecture folder. Use the existing
  source-text cache index when present to set `readState`. A source is
  `verified` only when its registry entry resolves to the intended catalogue
  document and every quoted `sourceRef` for the item passes the existing
  exact-page/source-text comparison. Do not promote a cache-only or unread
  document into factual teaching evidence.

- [ ] **Step 4: Build one group per current Y1S1 lesson from existing `sourceRefs`.**

  For each expected lesson, deduplicate its `item.sourceRefs` by `ref`, classify
  each resolved reference with `sourceRoleFor`, and set `hasNewPrimary` before
  assigning old supporting/fallback roles. The group construction must be
  equivalent to:

  ```js
  const refs = unique(item.sourceRefs || []);
  const resolved = refs.map((r) => sourceRecord(r));
  const hasNewPrimary = resolved.some((r) => r.set === 'new' && r.kind === 'primary' && r.verified);
  const sources = resolved.map((r) => ({
    ref: r.ref,
    set: r.set,
    role: sourceRoleFor({ ...r, hasNewPrimary }),
  }));
  ```

  Keep assessment, administration, and student-work references in the group’s
  metadata only; `current-primary`, `older-supporting`, and `older-fallback`
  are the only roles that count as teaching evidence. `reasons` must explicitly
  name `WEEK_GAPS[subject][week]`, missing OCR, unresolved source, or a
  current-source substitution when one applies.

- [ ] **Step 5: Write the compact module and the local audit.**

  The public module contains only the map contract fields and helper functions.
  The local audit has this exact tab-separated header:

  ```text
  sourceSet	scope	subject	kind	classification	lessonIds	readState	identity	reason	name
  ```

  For each catalogue document, write `scope=Y1S1` only when its subject code or
  verified registry subject matches the current Y1S1 subject set. Write
  `scope=future` and `classification=not-mapped-future` when the current
  syllabus cannot place it. A current-subject teaching candidate not linked by
  a verified `sourceRef` is `needs-review`, never silently mapped from a
  filename. Keep the audit path and any private drive path out of the public
  generated module.

- [ ] **Step 6: Generate and run the map checks.**

  Run:

  ```bash
  node work/build-source-lesson-map.mjs
  node work/source-lesson-check.mjs
  node work/source-lesson-check.mjs --selftest
  ```

  Expected: one group for every current `WEEK_STUDY` lesson, every public source
  reference resolves through `SOURCE_FILES`, no map entry contains copied lesson
  prose, and the self-test remains green. If a New candidate is unread, the
  output must say `needs OCR` and the lesson must remain partial/missing rather
  than silently becoming complete.

- [ ] **Step 7: Commit the generator and generated map.**

  ```bash
  git add .gitignore work/build-source-lesson-map.mjs outputs/study/corpus/source-lesson-map.js
  git commit -m "feat: generate Y1S1 source lesson map"
  ```

### Task 3: Wire the map through the study data barrel and source dialog

**Files:**

- Modify: `outputs/study-data.js:24-106`
- Modify: `outputs/study/imports.js:1-100`
- Modify: `outputs/study/source-dialog.js:13-50`

**Interfaces:**

- Consumes `sourceGroupFor`, `sourceMetaFor`, `sourceSetLabel`, and
  `sourceRoleLabel` from the generated map.
- Produces source metadata for both Course and item source dialogs without
  changing `STUDY_ITEMS` or its source references.

- [ ] **Step 1: Add barrel exports and the study-import bridge.**

  Add the exact names below to the explicit `study-data.js` re-export list and
  to the named import/export lists in `study/imports.js`:

  ```js
  SOURCE_MAP_VERSION,
  Y1S1_SOURCE_MAP,
  sourceGroupFor,
  sourceGroupsForWeek,
  sourceMetaFor,
  sourceSetLabel,
  sourceRoleLabel,
  ```

  Do not use `export *`; the existing barrel deliberately controls its public
  surface.

- [ ] **Step 2: Add the New/old role column to the existing source dialog.**

  Change the helper signature to `sourceTableHTML(refs, heading, lessonId = '')`
  and look up `sourceMetaFor(r.ref, lessonId)`. Add a final `Status` column. The
  cell must render `sourceSetLabel(meta.set)` and `sourceRoleLabel(meta.role)`
  when metadata exists, and `Source record not in current Y1S1 map` when it does
  not. Pass `item.id` for the item source table and the question source table;
  pass no lesson ID for the existing `priorSources` table. Keep the existing
  file, subject, folder, page/section, and type columns and the existing
  student-work/app-authored wording.

- [ ] **Step 3: Run module and source checks.**

  ```bash
  node work/syntax-check.mjs
  node work/verify-modules.mjs
  node work/source-lesson-check.mjs
  node work/source-check.mjs
  ```

  Expected: all modules load, every existing exact citation still passes, and
  the new map contains no source ref absent from `SOURCE_FILES`.

- [ ] **Step 4: Commit the data-barrel integration.**

  ```bash
  git add outputs/study-data.js outputs/study/imports.js outputs/study/source-dialog.js
  git commit -m "feat: expose Y1S1 source roles in study data"
  ```

### Task 4: Show grouped original sources under each Course lesson

**Files:**

- Modify: `outputs/study/course-timetable.js:158-245,348-413`
- Modify: `outputs/app.css`

**Interfaces:**

- Consumes `sourceGroupFor(item.id)`, `describeSource(sourceRef)`, and the
  source-label helpers through `study/imports.js`.
- Produces a source group below each lesson in the existing Week/Full-term
  reading cards; existing `data-item` and `Study all` behavior remains unchanged.

- [ ] **Step 1: Add the source-group renderer before changing the lesson row.**

  Add a local `lessonSourceHTML(item)` helper whose output follows this shape:

  ```js
  function lessonSourceHTML(item) {
    const group = sourceGroupFor(item.id);
    if (!group) return '<div class="lesson-sources missing">Source map entry unavailable.</div>';
    const rows = group.sources.map((s) => {
      const d = describeSource({ ref: s.ref });
      return `<li><span class="source-badge ${esc(s.set)}">${esc(sourceSetLabel(s.set))}</span>`
        + `<span class="source-role">${esc(sourceRoleLabel(s.role))}</span>`
        + `<strong>${esc(d.file || s.ref)}</strong>${d.location ? ` · ${esc(d.location)}` : ''}</li>`;
    }).join('');
    return `<details class="lesson-sources"><summary>Sources for this lesson</summary>`
      + `<ul class="source-group-list">${rows || '<li>Source gap — see the weekly gap notice.</li>'}</ul>`
      + `${group.reasons.length ? `<p class="source-reason">${esc(group.reasons.join(' '))}</p>` : ''}</details>`;
  }
  ```

  This helper must render filenames and existing page/section locations only; it
  must not render extracted source prose.

- [ ] **Step 2: Attach the group to each existing lesson row.**

  Wrap the existing lesson button in a `.lesson-readrow` container and append
  `lessonSourceHTML(it)` after the button. Leave the button’s `data-item`, its
  mastery label, `readOrder`, `Study all`, and click handler intact. A lesson
  with an older fallback must visibly say `Old source · fallback`; a lesson with
  a current New source must visibly say `New source · primary`.

- [ ] **Step 3: Add responsive source-group layout rules.**

  Add only display, gap, border, padding, and wrapping rules for
  `.lesson-readrow`, `.lesson-sources`, `.source-group-list`, `.source-badge`,
  `.source-role`, and `.source-reason`. Do not add a fixed content font size;
  inherit the surrounding reading-card size so `--ts` continues to scale the
  source names and locations.

- [ ] **Step 4: Run the required study checks.**

  ```bash
  node work/load-check.mjs
  node work/syntax-check.mjs
  node work/verify-modules.mjs
  node work/binding-check.mjs
  node work/text-size-check.mjs
  node work/source-lesson-check.mjs
  ```

  Expected: the Course renderer loads without TDZ errors, every new helper name
  is imported, and every source-group content size passes the text-size rule.

- [ ] **Step 5: Commit the Course rendering change.**

  ```bash
  git add outputs/study/course-timetable.js outputs/app.css
  git commit -m "feat: group Y1S1 sources under Course lessons"
  ```

### Task 5: Make Coverage show Y1S1 source organization, not a flat intake list

**Files:**

- Modify: `outputs/study/coverage-report.js:14-59`

**Interfaces:**

- Consumes `Y1S1_SOURCE_MAP`, `sourceGroupsForWeek`, `sourceMetaFor`,
  `describeSource`, `COVERAGE`, `WEEK_GAPS`, and existing subject/item helpers.
- Produces a subject → week → lesson → source display for current Y1S1 and a
  non-public-audit explanation for material not mapped to Y1S1.

- [ ] **Step 1: Write the grouped Coverage helper.**

  Add `sourceMapHTML(focusSubject)` that iterates the current subject IDs and
  numeric weeks in `Y1S1_SOURCE_MAP.byWeek`. For each lesson, render the existing
  title and a compact list grouped under these labels in order:

  ```text
  New sources — primary
  Old sources — supporting/fallback
  Assessment/practice context
  Source gap or review state
  ```

  Use `describeSource` for filenames and locations. Do not include the local
  audit path or private drive path in the dialog.

- [ ] **Step 2: Replace the flat New-source block as the primary source view.**

  Keep the existing filename-first intake as a short provenance note or count,
  but place the grouped Y1S1 map before it. Add this exact explanatory copy:

  ```text
  New and old files are grouped under the same Y1S1 lesson. The original source
  file remains the teaching note; this view only identifies which version to use.
  Files without a current Y1S1 syllabus placement remain retained for future
  work and are not assigned to another year here.
  ```

  Keep duplicate/conflict notes and live corpus validation output intact.

- [ ] **Step 3: Verify Coverage behavior in the real app path.**

  Run:

  ```bash
  node work/load-check.mjs
  node work/source-lesson-check.mjs
  node work/codemap-check.mjs
  ```

  Then open the Coverage dialog in Chrome and verify that HSS2011, ABCT2326,
  HTI17103, APSS1A08, and DSAI1202 are grouped by week and lesson; LEI1101
  remains a schedule-only/no-source state; and no future-year file is presented
  as a current lesson source.

- [ ] **Step 4: Commit the Coverage change.**

  ```bash
  git add outputs/study/coverage-report.js
  git commit -m "feat: organize Y1S1 source coverage by lesson"
  ```

### Task 6: Update documentation, offline shell, and generated indexes

**Files:**

- Modify: `outputs/README.md`
- Modify: `outputs/sw.js`
- Regenerate: `docs/CODEMAP.md`
- Regenerate: `docs/DATA-INDEX.md`
- Regenerate/update: `work/baselines/corpus-snapshot.txt`, `work/baselines/ui-strings.txt` when their checks report the intentional new exports/strings

- [ ] **Step 1: Document the source-as-note rule and Y1S1 boundary.**

  Add a short source-map section to `outputs/README.md` stating that the
  original source file is the teaching note, New sources are current-primary,
  old sources are supporting/fallback, only Y1S1 is lesson-mapped, and future
  material is retained but not syllabus-assigned without a newer syllabus and
  schedule. State that `work/.source-lesson-audit/` is local and may contain
  private filenames.

- [ ] **Step 2: Add the generated module to the service-worker shell and bump the cache.**

  In `outputs/sw.js`, add the exact shell entry beside the other corpus modules:

  ```js
  './study/corpus/source-lesson-map.js',
  ```

  Change `const CACHE_VERSION = 'v106';` to `const CACHE_VERSION = 'v107';`.
  Do not change `MODEL_VERSION` or `CDN_VERSION`.

- [ ] **Step 3: Regenerate the documentation indexes.**

  ```bash
  node work/codemap.mjs
  node work/data-index.mjs
  ```

  Review the diffs and keep only generated changes caused by the new map and
  already-present source-map work; do not revert or stage unrelated dirty
  changes from other tasks.

- [ ] **Step 4: Refresh baselines after the generated export/UI changes.**

  ```bash
  node work/baseline.mjs
  node work/baseline.mjs --check
  ```

  Expected: the second command reports matching baselines. A baseline update is
  valid only for the new source-map export and visible labels; it must not hide
  an unrelated corpus or UI-string change.

- [ ] **Step 5: Commit documentation and offline-shell changes.**

  ```bash
  git add outputs/README.md outputs/sw.js docs/CODEMAP.md docs/DATA-INDEX.md work/baselines/corpus-snapshot.txt work/baselines/ui-strings.txt
  git commit -m "docs: publish Y1S1 source-map contract"
  ```

### Task 7: Run the complete verification suite and browser acceptance test

**Files:**

- Test only: all modified and generated files from Tasks 1–6.

- [ ] **Step 1: Run every repository verifier required by the working guide.**

  ```bash
  node work/load-check.mjs
  node work/syntax-check.mjs
  node work/verify-modules.mjs
  node work/shell-check.mjs
  node work/binding-check.mjs
  node work/search-probe.mjs
  node work/region-probe.mjs
  node work/system-check.mjs
  node work/figure-key-check.mjs
  node work/codemap-check.mjs
  node work/data-index-check.mjs
  node work/schedule-check.mjs
  node work/cut-level-check.mjs
  node work/text-size-check.mjs
  node work/source-check.mjs
  node work/source-lesson-check.mjs
  node work/source-lesson-check.mjs --selftest
  node work/baseline.mjs --check
  ```

  Expected: every command exits 0; the source checker reports the existing
  exact-page citation count without new failures; the source-map checker reports
  all `WEEK_STUDY` lessons represented; and the shell checker finds the new
  module under the exact import URL used by the barrel.

- [ ] **Step 2: Run the Y1S1 unread/OCR gate for any newly discovered candidate.**

  ```bash
  node work/unread-manifest.mjs
  ```

  Any Y1S1 candidate marked `NEEDS-OCR` stays `needs OCR` in the local audit.
  Export only that candidate through the existing `handoff-export.mjs`, obtain
  the fixed `SOURCE/PAGE/QUOTE` format, and run `verify-notes.mjs` before adding
  it to `SOURCE_FILES` or allowing it to become a primary source. No unread
  document is promoted merely because its filename matches a lesson.

- [ ] **Step 3: Perform the Chrome acceptance test.**

  Start the static server:

  ```bash
  node work/dev-server.mjs
  ```

  In real Chrome, open `http://localhost:8420/radiography-study-studio.html`.
  Verify all of the following:

  1. Course → This week and Course → Full term show the existing schedule and
     study buttons unchanged.
  2. A current New-backed Y1S1 lesson shows `New source · primary` and the
     original filename; its old copy, when present, shows `Old source ·
     supporting` in the same expandable group.
  3. A lesson relying on an older official source shows `Old source · fallback`
     rather than looking current.
  4. Expanding a source group shows filenames and page/section locations, not a
     second copy of the teaching note or extracted source text.
  5. Coverage groups sources by subject, week, and lesson; missing APSS/DSAI
     weeks remain explicit gaps; LEI1101 remains no-source.
  6. The source dialog’s Status column agrees with the Course badge.
  7. Browser console has no errors or warnings, and changing the text-size
     control scales source labels with the lesson content.

- [ ] **Step 4: Commit only after the complete suite and browser test pass.**

  ```bash
  git status --short
  git diff --check
  git add work/source-lesson-check.mjs work/lib/source-lesson-map.mjs work/build-source-lesson-map.mjs work/fixtures/source-lesson-map-selftest.json outputs/study/corpus/source-lesson-map.js outputs/study-data.js outputs/study/imports.js outputs/study/source-dialog.js outputs/study/course-timetable.js outputs/study/coverage-report.js outputs/app.css outputs/sw.js outputs/README.md .gitignore docs/CODEMAP.md docs/DATA-INDEX.md work/baselines/corpus-snapshot.txt work/baselines/ui-strings.txt
  git commit -m "feat: organize Y1S1 sources by syllabus lesson"
  ```

  Confirm the final status shows unrelated pre-existing changes still present
  and no source-drive files moved, deleted, or renamed.
