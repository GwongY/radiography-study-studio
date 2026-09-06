# Implementation checklist

Design: `docs/superpowers/specs/2026-09-06-exam-mode-question-packs-design.md`

## Phase 0 — the guard first

- [ ] Write `work/pack-privacy-check.mjs` against the seams that do not exist yet,
      and prove it FAILS. A privacy check written after the feature only ever
      confirms what was built.
- [ ] Add `.gitignore` entries for the pack output directory; confirm with
      `git check-ignore` rather than by eye.

## Phase 1 — the pack, on this machine only

- [ ] `work/build-question-pack.mjs`: parse the 30 `question blank` chapters via
      `lib/doc-text.mjs` into stem / options / answer / chapter.
- [ ] Report the parse gap explicitly — 7,380 answer lines exist and the review
      parse caught 3,320. Close it or state per chapter what was dropped and why.
- [ ] Tag each question with the study unit it belongs to, so exam mode can weight
      by the blueprint and drill by the mastery record.
- [ ] Verify no pack artefact is tracked: `git status` clean after a full run.

## Phase 2 — exam mode with NO pack

- [ ] `outputs/study/exam-mode.js`: timed paper and weak-spot drill over the
      existing 150 items, weighted by `outputs/schedule.js`.
- [ ] Wire into `study.js` in order, `init()` only — nothing at module scope.
- [ ] Add to the SW SHELL under the identical specifier; bump `CACHE_VERSION`.
- [ ] Marks reported through the same arithmetic `assessment-check.mjs` guards.
- [ ] This phase ships on its own. If phase 3 never happens, exam mode still works.

## Phase 3 — the pack path

- [ ] `outputs/study/question-pack.js`: fetch, validate, store in a new IndexedDB
      object store, serve. Refuse a malformed pack the way
      `validateProgressFile()` refuses a foreign transfer file.
- [ ] Pack attempts log `pack:<packId>:<qid>` plus outcome — never stem text.
- [ ] `buildProgressExport()` skips the pack store; confirm the transfer file is
      unchanged in shape from today.
- [ ] Make `pack-privacy-check.mjs` pass, having watched it fail in phase 0.

## Phase 4 — the device

- [ ] Confirm on the iPad: exam mode with no pack, offline, after a cold open.
- [ ] Fetch a pack; close, reopen offline, confirm it is still there.
- [ ] Confirm the progress export still imports cleanly on the other device.

## Verification

- [ ] Full suite, plus `pack-privacy-check.mjs`, plus `shell-check` (it would
      catch a pack made reachable from `outputs/`).
- [ ] `node work/codemap.mjs` and `node work/data-index.mjs`, committed.
- [ ] `git log -S` over a sample of question stems returns nothing.

## Constraints carried from CLAUDE.md

Pack questions are not study items, carry no `sourceRefs`, and never enter
`validateCorpus()` — the source-traceability rule is unchanged, not bent. No
build step. No licensed text in `outputs/`, in git, or in the synced payload.

## Decision needed before phase 3

Private repo or second private gist for the pack. Phases 0-2 do not depend on it.
