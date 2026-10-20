# Radiography Study Studio

A personal, offline-first study app for HKPolyU BSc Radiography, Year 1
Semester 1 (2026/27). The owner learns each chapter elsewhere; this app **links
what has already been learnt** and keeps the course logistics in one place. It
does not teach new material and it does not test.

Published at <https://gwongy.github.io/radiography-study-studio/> (GitHub
Pages, from `outputs/`). Installable as a PWA and works offline once loaded.

## Focus: the core courses

The two core courses are **HSS2011 Human Anatomy** and **ABCT2326 Human
Physiology**, and they are the only ones Revise covers. HTI17103 Medical
Radiation Science has no exam; DSAI1202 AI Literacy and APSS1A08 Sociology need
little revision. Those three appear only in the Course tab (timetable,
deadlines, marks). Semester 2 brings imaging anatomy, and later years have
other core courses. The app grows with the important core courses only, not
with every subject.

## What is in it

| Tab | What it does |
| --- | --- |
| **Today** | What is due soon, your next classes, what joined Revise this week, and the weekly university notice (read from a private repository with a read-only token). |
| **Revise** | One cumulative mind map per core subject, down to single bones, muscles, joints, nerves, cells and substances, each row citing its slide page. It is gated by teaching week: the week follows the calendar, or you can pick an earlier one, and topics not yet taught stay hidden. It also has a 3D connections hub, Threads (one pathway across weeks), Tables and a Decoder of word parts. Boxes about the same thing link across the two subjects. Tap any technical word for its meaning (English and 繁體中文). |
| **Viewer** | A 3D body built from seven Z-Anatomy / BodyParts3D layers: skeleton, muscles, ligaments, organs, vessels, nerves and lymphatic. Structure names follow the 2026 lecture decks. It includes cavities and regions measured from the model, section cuts, layer separation, and a simulated **Projection** (X-ray). There are two atlas modes: the **Heart atlas** (valves, conduction, echo, and cath/PCI/IVUS scenarios) and **Limb vessels**. All of it is a visual reference, not lessons. |
| **Course** | The syllabus and timetable for all five subjects, assessment deadlines, the running weighted mark, and an .ics export. |

## Run it

```bash
node work/dev-server.mjs        # http://localhost:8420/radiography-study-studio.html
```

There is no build step, no framework and no bundler: plain HTML and vanilla ES
modules, deployed as-is. Use `node work/dev-server.mjs` (it sends `no-store`
headers), not a generic static server. ES modules need `http://`, never
`file://`.

## Check it

```bash
npm ci --prefix work/lint       # once: ESLint for the no-undef check
node work/check.mjs             # every check that needs no browser or source drive
```

CI (`.github/workflows/pages.yml`) runs the same command, and a push to `master`
publishes `outputs/` to Pages after it passes. The browser checks
(`work/*-browser-check.js`) run inside a page; each file's header says how.

## The rule that governs the content

**Every factual claim is traceable to a course source.** Viewer names, bone
landmarks, section levels, Revise rows and links, and the syllabus all cite a
`SOURCE_FILES` entry (in `outputs/study/course-data.js`) for a file that really
exists in the course folders, on the page named. `work/source-check.mjs`,
`revision-check.mjs`, `bone-landmark-check.mjs` and `cut-level-check.mjs`
enforce this mechanically. Nothing comes from internet research or generic
textbook expansion. Reading-help notes the app wrote itself are labelled as
the app's own words.

This repository is public. Course slides, textbooks and the owner's email are
not in it.

## Where to read next

- [`docs/DECISIONS.md`](docs/DECISIONS.md): the owner's settled decisions, dated, with links to specs.
- [`CLAUDE.md`](CLAUDE.md): the working guide for anyone (or any agent) editing the code.
- [`docs/CODEMAP.md`](docs/CODEMAP.md): where everything lives (generated).
- [`docs/LAYOUT.md`](docs/LAYOUT.md), [`docs/SOURCES.md`](docs/SOURCES.md), [`docs/TRAPS.md`](docs/TRAPS.md), [`docs/DATA-INDEX.md`](docs/DATA-INDEX.md).
- [`docs/history/README-archive.md`](docs/history/README-archive.md): the full history of how the app got here.

Model data: BodyParts3D / Anatomography © DBCLS (CC BY-SA 2.1 JP), via
Z-Anatomy and anatomi-simulatoru; heart and limb atlas material from
BetterHeart. See `outputs/THIRD-PARTY-NOTICES.txt`.
