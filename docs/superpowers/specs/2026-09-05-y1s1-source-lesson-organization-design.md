# Y1S1 source-to-lesson organization design

## Decision

The study system will have one canonical teaching note for each current Y1S1
lesson. Files from `New sources` and old sources are evidence attached to that
same lesson; they are not separate lesson notes. The current Y1S1 syllabus and
current Y1S1 schedule decide which lessons exist and how they are ordered.
Within that scope, a verified file from `New sources` is the preferred current
source, and an older file is supporting evidence or an explicitly labelled
fallback.

This is a source-organization change, not a request to move or rename files on
the shared drive.

## Scope

The current Y1S1 scope is the five source-backed subjects already represented
by `STUDY_SUBJECTS`: HSS2011, ABCT2326, HTI17103, APSS1A08, and DSAI1202. The
schedule-only LEI1101 slot remains visible as a Y1S1 schedule item with an
explicit no-teaching-source state; it must not disappear merely because no
course notes have been supplied.

The system will lesson-map only files that can be evidenced as Y1S1 material.
Files that cannot be placed using the current Y1S1 syllabus and schedule will
not be assigned to a lesson or course. They may be retained in the local
inventory as `not mapped — future scope`, with their source identity, but this
is deliberately not a claim about their eventual syllabus placement. A later
year's newest syllabus and schedule can promote the same source family when
that scope is provided, without treating it as permanently rejected.

The system will not publish private student work, unrelated personal files, or
the exhaustive old-source inventory in the public app. The local audit may
contain those filenames because it is the accountability record for the source
folder.

## Source precedence and version policy

Each Y1S1 candidate source record has a stable source-family identity and these
independent properties:

- source set: `new` or `old`;
- lesson links: one or more current Y1S1 lesson IDs, or an explicit `not
  mapped — future scope` / unresolved state;
- role: `current primary`, `older supporting`, `older fallback`, `assessment`,
  `administration`, `duplicate`, `student work`, `not mapped — future scope`,
  or `needs review`;
- reading state: `verified`, `OCR-verified`, `unread`, or `needs OCR`;
- version evidence: intake set, normalized title, date/edition markers, exact
  content hash, and any verified relationship to another copy.

`New sources` membership is the automatic signal that a file is new. The
generated Y1S1 source map will show a `NEW SOURCE` badge and will record the
source set that caused the decision, so a newly added intake file that belongs
to Y1S1 is identified during the next catalogue/map refresh without asking the
student to label it by hand.
An old file that has a newer-looking filename but is not in the new intake is
not silently promoted; it is a review candidate until its source-set and
syllabus relationship are verified.

Version grouping is conservative. Exact hashes and clear normalized title,
edition, or date matches may be grouped automatically. A merely similar title
is a candidate relationship, not proof. Where two versions materially differ,
the canonical note remains one lesson note and receives a concise update or
difference marker with citations to both versions. The older citation is kept
when it still supports the teaching point; it is not copied into a second
lesson.

Priority for a current Y1S1 lesson is:

1. a read and page-verified New source that matches the current syllabus;
2. a read and page-verified older source supporting the same lesson;
3. an older source as a visibly labelled fallback when no usable New source is
   available;
4. an explicit missing-source notice when no verified teaching source exists.

Assessment sheets, timetables, administrative notices, and student results can
be linked as context where useful, but they cannot silently become the primary
teaching note. An unread or OCR-failed file cannot support a factual lesson
claim until its page text has been checked by the existing source-verification
gate.

## Runtime organization

The app will consume a compact, curated Y1S1 source map rather than exposing
the full shared-drive catalogue. Its hierarchy is:

`subject → syllabus week/topic → canonical lesson → source groups`

Each canonical lesson group contains:

- the existing lesson ID, title, subject, and syllabus week;
- the existing teaching note/content once;
- `New sources` marked as current primary evidence;
- old sources marked as supporting or fallback evidence;
- assessment/practice material separated from teaching evidence;
- a status of complete, partial, missing, or needs review;
- a short explanation whenever the newest source is not used, such as
  out-of-Y1S1 scope, unread/OCR-required, or administrative-only.

One source may appear in several lesson groups when the source genuinely covers
several syllabus lessons. The note is still not duplicated: each group points
to the same source record and the same canonical lesson content.

The Course tab will show these groups directly under the relevant week and
lesson. The student should be able to answer “what do I study this week?” and
“which file supports this note?” from the same subject/week view. The coverage
view will provide the corresponding Y1S1 completeness summary and the New
source badges. It will not present a flat unlabelled list as the primary view.

The local Y1S1 audit will retain the New/old classification for Y1S1 candidates,
including files excluded from the public view. Its rows will contain the source
filename, source set, detected family, classification, linked lesson or
`not mapped — future scope` reason, reading/OCR state, and verification status.
Files outside the supplied Y1S1 evidence boundary are not falsely lesson-mapped;
they remain inventory entries for later work. This audit is the place to
inspect unresolved Y1S1 candidates without cluttering the learning view or
exposing private student material.

## Data flow and boundaries

The source catalogue remains the inventory authority, and the existing source
text/OCR cache remains the text authority. The current syllabus and schedule
remain the lesson and ordering authorities. The implementation will add a
source-to-lesson mapping layer between those authorities and the runtime
corpus:

1. refresh the catalogue and source text/OCR inputs;
2. detect the New and old source sets and group clear Y1S1 versions;
3. match only verified teaching evidence to current Y1S1 lesson IDs;
4. emit the compact runtime map and the local exhaustive audit;
5. render the grouped sources from the Course/Coverage tabs;
6. run source, schedule, corpus, and source-map validation before release.

The canonical study corpus remains the owner of teaching claims and
`sourceRefs`. The new map adds organization and version metadata; it must not
create an alternate copy of lesson claims or bypass exact page/quote
traceability. The schedule remains authoritative for week placement even when
a source filename uses a different topic order.

## Validation and failure behavior

The source-map verifier will fail when:

- a current Y1S1 lesson is absent from the map without an explicit missing
  source state;
- a source link does not resolve to a catalogue/source-file record;
- a teaching source has no verified page/quote evidence;
- a New-source intake file evidenced as Y1S1 is unclassified;
- a source is promoted to current Y1S1 despite being assessment-only,
  administrative, student work, unread, or not mapped — future scope;
- a source is assigned to a subject/week that conflicts with the syllabus,
  schedule, or verified source evidence;
- two source versions produce duplicate canonical lesson notes;
- an older fallback is shown without its older/fallback label.

The existing checks remain required: corpus validation, exact source-page
checking, schedule checking, module/binding/shell checks, data-index and
CODEMAP checks, and the real-browser Course-tab smoke test. The new verifier
will also include a small fixture for a newly added New-source file and a
same-family old copy, proving that the New badge and single-note grouping are
deterministic.

If a file cannot be read, the map will say `needs OCR` or `needs review`; it
will not infer lesson coverage from a filename alone. If a file has not been
shown to belong to Y1S1, it remains `not mapped — future scope` rather than
being assigned using an older or guessed syllabus. If a Y1S1 syllabus lesson
has no verified source, the Course tab will show the gap and still preserve the
lesson's scheduled position. If the catalogue cannot be refreshed, the last
verified map remains readable but the audit is marked stale rather than being
silently rebuilt from partial input.

## Files expected to change during implementation

The implementation plan will make the smallest changes needed to:

- add the compact source-map data module under `outputs/study/corpus/`;
- add the catalogue/OCR-to-map generator and source-map verifier under `work/`;
- render grouped Y1S1 sources in `outputs/study/course-timetable.js` and the
  related Coverage view;
- update the data barrel, documentation indexes, service-worker shell/cache
  version, and generated audit artifacts according to repository rules.

No shared-drive file will be moved, deleted, or renamed. No future-year source
will be thrown away merely because it cannot yet be mapped without that year's
newest syllabus and schedule.
