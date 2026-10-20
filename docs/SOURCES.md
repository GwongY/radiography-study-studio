# Sources

Where the course material lives and how the tooling reads it. Moved out of
`CLAUDE.md` on 2026-10-20; the rule itself (every claim cites a real source on
the page named) stays there and in the root `README.md`.

## New sources: iCloud Drive

The 2026/27 material is read from `%USERPROFILE%\iCloudDrive` (override with the
`RSS_ICLOUD` env var), from exactly five subject folders: `Human Anatomy`,
`Human Physology`, `Medical Radiology`, `Socio`, `AI`. The iCloud root also holds
unrelated folders (Biology, DSE, Maths …) — never walk it. The list lives in
`NEW_SOURCE_DIRS` in `work/build-source-catalogue.mjs`. Rebuild the catalogue with
`node work/build-source-catalogue.mjs` (or `--add-file <path>` for one document).
`source-text.json` and the `SOURCE_FILES` registry still name these files by filename,
so they stay valid.

## Old sources: `E:\UNI sources`

The old (pre-2026) materials live in one organised offline collection,
`E:\UNI sources` (31.6 GiB, 9,668 files after the records clean-up; it was 66.8 GB, 17,380 files). It replaced the `Old source/` `.lnk`
shortcuts and the Drive walk. It is **local disk, so listing it is cheap** — the
`G:` warning above does not apply to it. It is read-only reference: do not move,
rename or delete anything in it unprompted. It was reorganised twice on request
(2026-10-02, folder moves only, journalled and undoable with
`_Organization Records\Reorganisation 2026-10-02\undo-reorganisation.mjs`); any further
change should be journalled the same way. The iCloud subject folders stay the home of 2026/27
material and wins on precedence; `E:` is the fallback.

Layout (reorganised 2026-10-02 to follow PolyU's degree structure; `E:\UNI sources\README.md`
explains it and lists the open decisions):

| Folder | Holds |
| --- | --- |
| `1 Radiography Programme` → `Year N` → `Sem N` → `<CODE Subject>` → material type | The programme's own subjects, plus `Clinical Placement`. Material type is one of `Notes`, `Exams`, `Labs`, `Assignments`, `Tutorials`, `References`, `Course Information`; dated sub-folders (`2019-2020`…) sit under that. `Midterm`/`Final` only where a course has both. |
| `2 GUR` | General University Requirements for students admitted **2022/23 or later**, as PolyU publishes them (checked 2026-10-02): `AIDA`, `Innovation and Entrepreneurship`, `Language` (`English`, `Chinese`), `Leadership`, `Service-Learning`, and the four Cluster Areas Requirement groups `CAR A Human Nature`, `CAR D Science Tech`, `CAR M Chinese Culture`, `CAR N Societies`. The old A/B/C/D scheme was replaced by A/D/M/N and B/C subjects re-coded (`APSS1B16` → `APSS1BN16`), so old B/C folders were matched to the official lists by code or title. `CAR Unlisted` holds 5 courses in no current list. **APSS1A08 Introduction to Sociology is under `CAR A`, not under Year 1.** Freshman Seminar is not a 2022/23+ GUR, so `HSS1010` is in Year 1 Sem 1; `ELC3626` and `CLC3265P` are discipline-specific and sit in Year 3. |
| `3 Other Subjects` | Subjects outside the programme or with no confirmed place (Optometry physiology, University Physics II, Applied Psychology, IT). |
| `4 Additional Radiography Subjects` | Legacy radiography curriculum (Radiography Studies I–VI, older Medical Imaging Studies, AP204). |
| `5 Reference Library` | Textbooks, papers, supplementary anatomy, software, postgraduate info. |
| `_Organization Records` | 12 MiB. The original provenance and process records were summarised into `E:\UNI sources\README.md` ("What the original organisation records said") and the rest moved to `E:\TO DELETE - UNI sources records` for the user to delete — never treat that folder as a source and do not delete it for them. The 29.4 GiB `Offline Originals` (other programmes' source packs, unique content) went the same way and the user has already deleted them. Kept: `Reorganisation 2026-10-02/` (plans, journals, before-manifests, verifications, `undo-reorganisation.mjs`), `current-file-index.csv` (SHA-256 of every file; **pre-reorganisation paths**), `provisional-placement-review.csv`, `offline-unavailable-sources.md`, `Provenance Links`, `Source Index Documents`. Translate old paths through `reorganisation-plan.json` then `reorganisation-plan-pass2.json`. |

Why the names are short (`2 GUR`, `CAR D Science Tech`): Windows is unreliable above
259 characters, and the official cluster names pushed 21 files over. The longest
study path is now 257. Keep new folder names short.

Where this semester's five subjects sit (old-source predecessors by course code —
the codes changed, so a lesson may cite a predecessor only as old-source support):

| 2026/27 subject | Old-source location |
| --- | --- |
| HSS2011 Human Anatomy | `1 Radiography Programme\Year 1\Sem 1\HSS2011 Human Anatomy` (730 files; 536 of them `Exams`) |
| ABCT2326 Human Physiology | `1 Radiography Programme\Year 1\Sem 1\ABCT2326 Human Physiology` (639; `Notes` has the lecture decks, `Labs`, `Exams`) |
| HTI17103 Medical Radiation Science | no folder under that code; nearest is `1 Radiography Programme\Year 1\Sem 1\HTI17101 Exploring Radiography` (61) — treat the match as unconfirmed |
| APSS1A08 Sociology | `2 GUR\CAR A Human Nature\APSS1A08 Introduction to Sociology` (22) |
| DSAI1202 AI Literacy | no folder under that code. It is PolyU's AIDA GUR; its predecessor is `2 GUR\AIDA\COMP1004 AI` (8; the files are titled "AIDA Quiz" / "AIDA main quiz 2023-24"), plus the loose `2 GUR\AIDA\AIDA (course code unspecified)` |

Completeness (checked 2026-10-02, against `work/source-catalogue.json`): 8,762 of
the 8,794 catalogued documents are on `E:` (7,278 by name and size, 1,470 by size
and extension where the file was renamed during organising, 14 zero-byte).
The 32 not found are 29 `New source/` files (expected — they are not old) and 3
4 KB OT Theory & Process placeholders from a non-radiography course. The
collection's own checks (`final-collection-hash-verification.json`, summarised in the E: README) report all
9,482 active files hash-verified and no missing targets. Known gaps it records: 6 linked folders, 11
linked files and 20 old Dropbox links were inaccessible (`offline-unavailable-sources.md`),
and 12 files carry provisional placements.

Tooling has **not** been repointed: `work/build-source-catalogue.mjs`,
`build-course-terms.mjs` and `source-resolve-check.mjs` still default to the `G:`
shortcuts and `Old source/`. The committed catalogue and `source-text.json` stay
valid, so nothing needs re-running; for a rebuild pass `--root "E:/UNI sources"`
(supported by `build-course-terms.mjs`) and check the result before committing.

`UNI sources/` inside the repo is an untracked partial copy (1.97 GB, 1,677 files)
of `E:`. It is gitignored: this repository is public and the material is not ours
to publish. Do not read from it in place of `E:`.

