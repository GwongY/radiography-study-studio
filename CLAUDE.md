# Radiography Study Studio — working guide

Read the root `README.md`, `docs/DECISIONS.md` and `git log` before making
changes; all three are kept current. Settled content decisions (subject scope,
source substitutions, what was deliberately left out) live in `DECISIONS.md` —
do not reopen them without new source evidence. The long history is
`docs/history/README-archive.md`.

## Mission

The owner's **personal study platform for HKPolyU Radiography**, Year 1
Semester 1 now. It **links what has already been learnt**; it does not teach and
it does not test.

0. **Core courses only.** HSS2011 Human Anatomy and ABCT2326 Human Physiology are
   the core courses and the only ones with Revise. HTI17103 (no exam), DSAI1202
   and APSS1A08 (minimal revision) live in the Course tab only — **build no Revise
   maps or features for them.** Which subjects of the four-year programme are the
   important core courses is decided by `outputs/programme.js` (`important`, derived
   by the rule in its header from the official 2026-intake progression pattern, MI and
   RT streams) — not by a list here. Semester 2 brings imaging anatomy: add core
   courses from that module when they come, and keep the app to them. `chosenStream`
   there is `null` until the owner picks RT or MI; do not assume either.
1. **Revise, not Learn; no testing.** The Revise tab (`outputs/study/revise.js`,
   data in `outputs/revision/`) is one cumulative map per core subject plus a 3D
   connections hub, Threads, Tables and a Decoder, gated by teaching week (the
   calendar by default, an earlier week on request; untaught topics hidden). Do
   not restore study items, questions, answer recording or any review scheduler,
   and do not add teaching prose for single bones, landmarks or joint motions.
   Leaf rows (a name, one function line in the slide's words, the slide page) are
   recall cues and are allowed. Specs: `docs/superpowers/specs/2026-10-18-revision-map.md`,
   `2026-10-19-remove-testing.md`, `2026-10-19-revise-depth-and-3d-hub.md`.
2. **The viewer is a reference tool**, not lessons: the 3D body, Projection, the
   Heart atlas and Limb vessels.
3. **Strict syllabus alignment and sourced content only.** Facts stay within
   delivered lectures and tutorials. Source precedence: the 2026/27 iCloud subject
   folders first, the older PolyU material in `E:\UNI sources` as fallback; new
   files follow `docs/superpowers/specs/2026-09-10-new-source-intake-workflow.md`.
   Where sources live and how the tooling reads them: `docs/SOURCES.md`. **Never
   walk `G:` or the iCloud root** — ask `work/query.mjs`.

## Find things here first

**Read `docs/CODEMAP.md` before grepping.** Generated from the code's own banner
comments (`node work/codemap.mjs`), so it is always current: every section of the
app, its file, its line range, and a link to the traps that govern it.

| Want | Read | Not |
| --- | --- | --- |
| Where a behaviour lives | `docs/CODEMAP.md` | a grep sweep |
| What breaks when you edit file F | the `docs/TRAPS.md` section CODEMAP links | this file |
| What the model contains | `docs/DATA-INDEX.md`, then `node work/query.mjs` | `outputs/mesh-index.js` |
| What one structure says | `node work/query.mjs unit\|mesh\|layer\|source <term>` | `outputs/mesh-index.js` |
| Whether a source file exists, and where | `node work/query.mjs file\|where <term>` | walking `G:` |
| What a source actually SAYS, and on which page | `node work/query.mjs text <term>` | opening the PDF |
| Why a decision was made | `docs/DECISIONS.md`, `git log`, `docs/history/README-archive.md` | reopening it |

`outputs/mesh-index.js`, `work/course-terms.json` and `work/source-catalogue.json`
are **generated** — never read or edit them, ask `work/query.mjs`. **Never walk
`G:` for a source**: minutes of network stats, and the catalogue already knows.

## Layout

`outputs/` is the app, deployed as-is (no build step): `radiography-study-studio.html`
(markup), `app.css`, then `studio.js` (3D studio, parts in `outputs/studio/`) and
`study.js` (everything else, parts in `outputs/study/`) as two module scripts that
talk only through `window.__osteo`. The parts import each other cyclically, so
**nothing may run at module scope** — side effects go in `init()`. Revise data and
pure logic: `outputs/revision/`. Data modules: `outputs/*.js`, each imported with
`?v=N`. Node verifiers and generators: `work/`. Specs and plans:
`docs/superpowers/`. The full tables (every folder, data module and check, with
what each guards): **`docs/LAYOUT.md`**.

## Run

```bash
node work/dev-server.mjs        # static server on port 8420
```

Then `http://localhost:8420/radiography-study-studio.html`. ES modules need http://,
never file://. `work/dev-server.mjs` is what `.claude/launch.json` starts, and it
sends `Cache-Control: no-store` for the reason docs/TRAPS.md records — do not swap
it for a plain static server. Use real Chrome for install/offline behaviour; the
in-app Browser pane freezes animations. The pane DOES register the service worker,
so after editing a module there, unregister it and clear caches or you are testing
the last CACHE_VERSION rather than your edit.

## Hard rules

- **Source traceability.** Every factual claim the app still makes (bone
  landmark names, section-cut levels, the Revise links, the Course syllabus) cites a
  `SOURCE_FILES` entry keyed to a file that actually exists in the supplied source
  folders — checked by `source-check.mjs`, `bone-landmark-check.mjs` and
  `cut-level-check.mjs`. No internet research, no generic textbook expansion, no
  invented syllabus. App-authored reading-help notes must be identified as such
  and must not introduce unsourced subject claims.
- **Syllabus scope.** Revise links and Course content correspond strictly to real
  lecture topics and tutorial material, and no unverified curriculum expansion.
- **No build step, no framework, no bundler.** Plain HTML + vanilla ES modules is a
  product constraint, not an oversight.
- **Patch `radiography-study-studio.html` directly.** Never re-run the old scratchpad
  `build.py` — it regenerates from an older template and wipes later work.

## After every edit

```bash
node work/check.mjs             # every check that needs no browser and no drive, once
node work/check.mjs revision    # just the checks whose name contains a word
```

`npm ci --prefix work/lint` once, for the ESLint no-undef pass. CI runs the same
command. What each check guards, and which are REQUIRED for which files:
`docs/LAYOUT.md`. Browser checks (`work/*-browser-check.js`) run inside a page.
Not automated, so on you:



- Added, moved or renamed a section banner, a file, or an export? Run
  `node work/codemap.mjs` and commit `docs/CODEMAP.md` — the check fails until you do.
- Changed a synonym, a `COMPOSITE`, or rebuilt `mesh-index.js`? Run
  `node work/data-index.mjs` and commit `docs/DATA-INDEX.md` — likewise.
- **Another session may be editing this tree.** `git fetch` before pushing, and
  `git status` for files you did not touch before running `codemap.mjs`,
  `data-index.mjs` or `baseline.mjs` — regenerating sweeps their unfinished work
  into your commit, and can paper over a check that is red for their reasons.
- **Line endings are LF everywhere** (`.gitattributes`: `* text=auto eol=lf`), in
  the repository and in every checkout, Windows included. Generators write LF.
  Anything that hashes a text file must still normalise `\r\n` first, as
  `work/build-physiology-paths.mjs` does, so an old CRLF working copy cannot move a stamp.
- A trap you learn the hard way goes in `docs/TRAPS.md`, under the file it
  governs — not here. This file is loaded into every session; that one is read
  only by a session working in that file.
- Any shell change (HTML, `app.css`, any JS module) → bump `CACHE_VERSION` in `sw.js`.
- **The cache key is the whole URL, query and all.** Every module reachable from
  the app, at any depth, must be in the SW SHELL under the *identical* specifier
  it is imported by — a mismatch is a 404 that appears only offline, the one
  condition this app is built for. `shell-check.mjs` walks the import graph and
  enforces it. A file imported both with and without a query needs **both**.
- **Heart atlas verification has two layers.** `heart-atlas-check.mjs` validates
  manifest-to-model alignment and mesh payload integrity. Its optional Node
  builder section skips when local `three` is unavailable, so exercise actual
  entry, failed-load rollback, focus/projection transitions and narrow layouts
  in a browser before calling an integration change complete. The atlas data and
  notice are shell-cached; the circulatory GLB is still fetched on first use.
- Touched `mesh-index.js`? Rerun `node work/build-mesh-index.mjs` rather than
  editing it, then `node work/search-probe.mjs`.
- Added or renamed a `SOURCE_FILES` entry? Run `node work/source-check.mjs` — it
  is the only mechanical enforcement the source-traceability rule has.

## Git / deploy

Branch is `master`. On 2026-10-03 the owner returned to public GitHub Pages after
trying owner-only Sites hosting. The repository is public again and
`.github/workflows/pages.yml` verifies changes before publishing `outputs/`.
Pushing master updates https://gwongy.github.io/radiography-study-studio/.
No Google Cloud project or server is involved. A weekly briefing of the owner's
university email is written by a local scheduled task and pushed with
`work/weekly-briefing.mjs` to a PRIVATE repository; Today reads it with the
university-notice token (`study/weekly-briefing.js`). **This repository is public: no email
text, names, addresses or student details in commits, `outputs/`, docs or commit
messages** — plaintext lives only in ignored `work/.briefing/`. Commits use the
GitHub noreply address (repo-local `user.email`). The previous Sites publication
is a separate snapshot; see `docs/archive/PRIVATE-HOSTING.md`.

What `master` carries is `git log --oneline` — not repeated here, because a
changelog in the one file every session loads is one that goes stale unread.
