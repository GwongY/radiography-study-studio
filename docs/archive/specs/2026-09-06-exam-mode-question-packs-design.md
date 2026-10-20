# Exam mode — question packs the deploy never carries

## Problem

The app has no exam rehearsal. The 150 corpus items teach and drill, but none of
them is MCQ-shaped and nothing serves them under exam conditions.

The obvious raw material does not survive contact with the licence. Of the 47
exam-shaped Semester 1 documents `work/unread-manifest.mjs` lists, the split is:

| | Files | Answered MCQs |
| --- | --- | --- |
| Publisher test bank | 30 | 7,380 |
| Everything else | 17 | 0 |

The 30 sit in a Drive folder named `question blank` and carry Pearson test-bank
metadata (`Diff: 1`, `Skill: Level 1 Questions: Reviewing Facts and Terms`); the
815-page `Martini-Test-Bank_FundamentalsOfA_P.pdf` is the same bank whole. This
is the material `CLAUDE.md` already excludes from `work/source-text.json`:
*the set textbook and the publisher question bank are deliberately absent, this
repo is public and they are not ours to republish.* That decision is not being
re-opened — it is being honoured in a place it currently has no way to reach.

The clean remainder is real but thin, and contains no MCQs at all: one genuine
PolyU ABCT2326 final paper, four tutorials with model answers, two HSS2011
in-class activities.

## Non-goals

- Putting one licensed question into `outputs/`, into git, or into the corpus.
- Re-opening the source-traceability rule. Pack questions are NOT study items and
  carry no `sourceRefs`; they never enter `validateCorpus()`.
- A build step. The pack is data fetched at runtime, not a compilation input.
- Replacing the mastery scheduler. Exam mode reads it and writes to it; it does
  not become a second one.

## Approach

A **question pack** is a JSON file the app fetches at runtime and stores in
IndexedDB. It is generated on the user's own machine from the drive, uploaded to
a **private** GitHub repository, and pulled onto the iPad with the PAT the app
already holds for gist sync. The public Pages deploy never contains it, the git
history never contains it, and a reader of the public repo learns only that the
feature can load a pack — not what any pack says.

Three properties make this work rather than merely sound safe:

1. **The transport already exists.** `outputs/study/gist-sync.js` authenticates
   to GitHub with a classic PAT, and `work/gist-sync-check.mjs` already asserts
   the token reaches the Authorization header and never a URL, a body, or the
   payload. A pack fetch is the same call shape against a different endpoint.
2. **The storage already exists.** The answer log is IndexedDB (`rss-progress`),
   so a second object store is a known pattern, not new infrastructure. A parsed
   pack measured 0.78 MB of JSON for 3,320 questions — around 1.7 MB if every one
   of the 7,380 is captured. That is a twentieth of the GLB payload.
3. **The device survives it.** An installed Home Screen web app has a storage
   container Safari cannot see and is exempt from the 7-day eviction applied to
   ordinary tabs. Unlike progress, a pack is regenerable from the drive, so the
   one action that destroys the container — deleting the icon — costs a re-fetch
   and nothing more.

## What must never leak

The pack is licensed content on a device that syncs. Two seams have to hold:

- **The sync payload carries outcomes, never stems.** `recordAttempt` already
  stores ids and outcomes rather than text. Pack attempts log a pack-scoped id
  (`pack:<packId>:<qid>`) and the outcome. A gist that is read back must not be
  able to reconstruct a single question.
- **The pack is not part of the exported progress file.** `buildProgressExport()`
  must skip the pack store outright, so the transfer file stays what it claims
  to be.

Both are mechanical, so both get checked rather than reviewed.

## Target shape

### `work/build-question-pack.mjs` — new, needs the drive

Reads the `question blank` chapter PDFs through `lib/doc-text.mjs`, parses stem /
options / answer, and writes a pack JSON plus a manifest line. Output path is
gitignored. It reports what it could not parse rather than silently dropping it —
the crude parse in review caught 3,320 of 7,380 answer lines, and the gap between
those numbers is the thing to close.

### `outputs/study/question-pack.js` — new part

Fetch, validate, store, and serve. Validation refuses a pack that is not the
declared shape, exactly as `validateProgressFile()` refuses a foreign transfer
file. No pack, no exam mode — the feature degrades to the blueprint mode below
rather than erroring.

### `outputs/study/exam-mode.js` — new part

Two ways in, one engine:

- **Timed paper** — fixed count, countdown, no feedback until submitted, then a
  mark expressed against the real weighting already in `outputs/schedule.js`.
- **Weak-spot drill** — untimed, drawn from what the mastery record says is
  weakest, feedback per question.

With no pack loaded, both run over the existing 150 corpus items, weighted by the
assessment blueprint. That is the honest floor: exam mode works for everyone who
clones this repo, and works *better* for the one person holding a pack.

### `work/pack-privacy-check.mjs` — new

The guard that makes the rest safe to believe:

- no pack file is reachable from `outputs/` or listed in the SW SHELL
- `buildProgressExport()` output contains no pack store and no question text
- a synthetic pack attempt logs an id and an outcome, and the serialised event
  contains no substring of the stem it came from
- the pack fetch sends its token in a header, never a URL or a body

Modelled on `gist-sync-check.mjs`, which drives the real protocol against a
stubbed `fetch` — the only honest way to check a network path from here.

## Verification

The full suite, plus `pack-privacy-check`. `shell-check` matters more than usual:
it walks the import graph and would catch a pack accidentally made reachable.
`assessment-check` guards the weighting exam mode reports against.

## Success criteria

- Exam mode runs on the iPad with no pack, over the 150 existing items.
- A pack fetched onto the iPad survives closing and reopening the app offline.
- `git log -S` over any question stem returns nothing, forever.
- The public site, byte for byte, is what it would have been without any of this.

## Open decision

Where the private pack lives — a private repo (versioned, diffable, one more
thing to own) or a second private gist (reuses the sync path exactly, awkward
above a few MB). The plan assumes a private repo and the choice is reversible;
only the fetch URL changes.
