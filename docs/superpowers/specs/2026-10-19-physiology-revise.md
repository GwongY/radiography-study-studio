# ABCT2326 Human Physiology in Revise — design

Date: 19 October 2026 (Monday of teaching week 8). Status: design, not built.
Plan: `docs/superpowers/plans/2026-10-19-physiology-revise.md`.

Builds on `2026-10-18-revision-map.md` (the week rule) and
`2026-10-19-revise-depth-and-3d-hub.md` (leaf rows, the 3D hub). Everything those
specs settle for HSS2011 holds here unless this document says otherwise.

## 1. What the owner gets

The Revise tab gains a subject switch: **Anatomy | Physiology**. Physiology opens the
same five views as anatomy (Map, Brain 3D, Threads, Tables, Decoder), over one
cumulative ABCT2326 map gated by teaching week, with the depth anatomy has: topics that
open into one-line rows read off the 2026 slides, each row's name checked against the
page it cites, links between rows with a reason in the slide's words, and a notes panel
that says something useful about every box.

Nothing here teaches, tests, schedules or records answers (CLAUDE.md principles 0, 1).

## 2. The owner's standing rules, and how each is enforced

Every rule from the anatomy build is a design rule here and has a mechanical guard.
"Node check" means `work/revision-check.mjs` or `work/revise-pure-check.mjs` (both run
in `pages.yml`, so a failure blocks the deploy). "Browser check" means
`work/revise-browser-check.js`, a new script run in the Browser pane like the other
`work/*-browser-check.js` files.

| # | Rule | Design | Guard |
| --- | --- | --- | --- |
| 1 | Revise links what is learnt; sourced only | No items, quiz, scheduler. Every row AND every physiology topic cites a `SOURCE_FILES` id and pages. Thread and table steps are structured data with a source, not free HTML. Words only in slide pictures are not written; each data task lists them and the README records them. | Node: every row's and every ABCT2326 topic's name (or `match`) is on a page it cites; every ABCT2326 topic edge, thread step and table row carries a source whose page contains its `match`. Image-only words: process (a list in each task's report, collected into README). |
| 2 | Week gating: later weeks removed, not dimmed; Auto = last fully taught week; every week with content is a chip; no `released` cap | Unchanged week code (`weeks.js`, `autoNow`). Physiology rows carry the week of the lecture that taught them, from `outputs/schedule.js`. | Node: the existing monotonic / prune / clean-link checks run for every subject; `released` is unset for ABCT2326; NEW: a row's week is never before its deck's week and is a week in which the deck's subject has a lecture or tutorial in `SESSIONS`. |
| 3 | Clean map: no sentence under a box; sentence in the notes; tapping a branch frames it | Map content builder unchanged (label, week tags, "new"). `focusBranch` unchanged. | Node: `revision-check` reads `outputs/study/revise.js` and fails if `deriveWeek()` calls `describe(` or emits `rv-said`. Browser: no Map node has text other than its label, `.mwk` and `.wknew`. |
| 4 | Every row's notes say something useful | A general rule, not examples: a row (or physiology topic) needs an own-words sentence unless its slide line is **useful**: at least 25 characters, not a count or fragment (only digits, brackets, `x2`-style tokens), and at least three words. Physiology own-words sentences live on the row as `own` (parallel-safe), are shown labelled as the app's own words, and may hold no digit and no star (numbers and textbook facts come only from slides). | Node: `rules.js needsOwn()` over every leaf of every subject (anatomy keeps its existing Week 1 position-word exemptions); `ownProblems()` over every ABCT2326 `own` (missing, under 40 or over 220 characters, no full stop, a digit, a star, only the name). |
| 5 | No box has a child of the same name | Reuse `mergeLeaves` ALIAS folding. Within one parent, no two rows share a label. | Node: the existing twins check (now per subject, unconditional); NEW: no two rows of one subject share label and parent. |
| 6 | Legend and colours appear only once something of that system is taught; physiology has its own groups | Systems move from hard-coded maps (`SYS`, `SYSVAR` in revise.js, `COL` in revise-brain.js, `SYSORDER` in hub.js, static legend spans in the HTML) to `systems` on each registry entry. The legend is generated from the active subject's list and every entry carries `data-sys` (today five anatomy entries do not, so they show from week 1). | Node: `rules.js checkSystems()` — every node's `s` is in its subject's list; keys unique across subjects; colours within a subject at least 50 apart (RGB distance) and at least 4.5:1 against the legend surface `#162428`; a colour shared across subjects only for the same body system. Pure test of `legendKeys()` at each week. Browser: at physiology W1 only the Cells & tissues entry shows. |
| 7 | Revise connects to the Viewer where a structure exists | "Show in the viewer" only for nodes `viewerEligible()` allows: topics flagged `viewer: true` and rows of kind part, muscle, bone, joint, nerve; never for cell, substance, process or group rows. The jump keeps `revealStructure`'s `osteo:layers` chip lighting. | Pure test of `viewerEligible`. Browser: at physiology W7 list every node whose button shows; none is a cell, substance, process or group; jump to "Stomach" lights the organ chip. |
| 8 | Touch first; phone and iPad; no build; line endings; `$` in replacements | Subject switch is two 44 px buttons; no hover. Plain modules. | Browser at 390x844 and 820x1180. Process: Edit tool for existing files; any node patch script asserts `includes(old)` before replacing and uses a function replacer. |
| 9 | Process traps | `CACHE_VERSION` bump; every new module in SHELL with its exact specifier; CODEMAP and baselines regenerated only after reading the diff; clear the service worker before testing; check `git status` for other sessions. | `shell-check`, `codemap-check`, `baseline --check` (all in `pages.yml`). |
| 10 | Deploy trap: `pages.yml` must not reference a missing script | `pages.yml` today runs: load-check, syntax-check, revision-check + revise-pure-check, today-navigation-check, shell-check, binding-check, search-probe, region-probe, system-check, codemap-check, data-index-check, schedule-check, limb-check, cut-level-check, build-bone-landmarks --check, bone-landmark-check, source-check, bridge-check, baseline --check. | NEW `work/pages-workflow-check.mjs`: every `node work/<file>` in `pages.yml` exists. It is added to `pages.yml` itself and to the after-every-edit list. |

## 3. Sources and weeks (the inventory)

Teaching weeks from `outputs/schedule.js` (Group 4; week 1 starts Monday 31 August 2026).
Today is Monday of week 8, so Auto shows weeks 1–7.

| Week | ABCT2326 session | 2026 deck (iCloud `Human Physology`) | Pages | Registered? | Revise |
| --- | --- | --- | --- | --- | --- |
| 1 | Lecture 1 Cells & body organisation (2 Sep) | `Lecture 1 - Cells and Body Organization.pdf` | 62 | yes, `phys.1.2026`, text cached | build |
| 2 | Lecture 2 Cardiovascular (9 Sep) | `ABCT2326 Cardiovascular System.pdf` (Ch 19–21) | 68 | no | build after intake as `phys.l2.2026` |
| 3 | Lecture 3 Respiratory (16 Sep) | `ABCT2326 Respiratory System.pdf` (Ch 23) | 75 | no | build after intake as `phys.l3.2026` |
| 4 | Lecture 4 Digestive (23 Sep) | `ABCT2326_L4 -Digestive.pdf` (Ch 24) | 68 | no | build after intake as `phys.l4.2026` |
| 5 | Lecture 5 Renal (30 Sep) | `ABCT2326 Renal System 2019.pdf` (Ch 26) | 46 | no | build after intake as `phys.l5.2026` (see Q3) |
| 6 | Quiz on Lectures 1–5; no lecture, no tutorial | — | — | — | no rows; the W6 chip adds nothing |
| 7 | Lecture 6 Reproductive (14 Oct) | `ABCT2326 Reproduction(1).pdf` (Ch 28–29) | 60 | no | build after intake as `phys.l6.2026` |
| 8 | Lecture 7 Endocrine (21 Oct, not yet delivered) | `ABCT2326 Endocrine System.pdf` (Ch 18) | 55 | no | later (Q1) |
| 9 | Lecture 8 Nervous (28 Oct) | `ABCT2326 Nervous system.pdf` (Ch 12) | 66 | no | later |
| 10 | No class | — | — | — | — |
| 11 | Lecture 9 Nerve / musculoskeletal (11 Nov) | `ABCT2326 Muscle.pdf` (Ch 10) | 70 | no | later |
| 12 | Lecture 10 Musculoskeletal / immune (18 Nov) | `ABCT2326 Immune v2.pdf` | 71 | yes, `phys.10.2026` | later |
| 13 | Lecture 11 Immune (25 Nov) | same deck | — | — | later |

Not used for rows: the 2026 tutorial scan (`phys.tut.scan2026`, image only, not
text-checkable); the digestion lab manual `Digestion Updated.pdf` and the lab report
guides (labs are not lectures; Q2); older decks (`phys.2`…`phys.10`, `phys.*.deck`), which
stay fallback support only where a 2026 slide is image-only (`old: true`, as anatomy did).

Page counts above are from `pdftotext` form feeds; intake confirms them.

## 4. Data model

The registry shape is unchanged: `REVISION.ABCT2326 = { id, label, data, rows, threads,
tables, decoder, sources, tours }`, plus three new fields every subject now has:

```js
systems: [{ key, label, col, map, body }],  // legend order; col = legend and 3D, map = Markmap shade
hubOrder: ['p_cvs', ...],                   // 3D hub grouping order
copy: { name, leafWords, findHint },        // switch button name, and the few words revise.js used to hard-code for anatomy
```

### 4.1 Topics

Physiology topics are written like rows (`outputs/revision/abct2326-topics.js`), so the
same source gate holds them: `{ id, l, s, w, src: [id, page…], line?, own?, match?, th?, viewer? }`.
`topicNodes()` (new, in `leaves.js`) turns them into `NODES` with the note built from the
slide line and the source, exactly as a leaf's note is. No hand-written HTML topic notes,
no stars (textbook additions), no Cantonese lines unless the owner asks (Q6). Topic ids are
prefixed `p_`, row ids `p<week>_`, so nothing collides with anatomy.

The tree is: root → one branch per system → its topics → rows. Topic-level cross-links are
`[a, b, reason, [sourceId, page]]`; the fourth element is required for ABCT2326.

### 4.2 What a leaf is in physiology

Anatomy leaves are structures. Physiology is mostly processes, so a leaf is **one named
thing the slide teaches as a unit**, in one of five kinds:

| Kind | What | Example (slide words) | Derived link field |
| --- | --- | --- | --- |
| `group` | a heading that holds rows | Formed elements | — |
| `part` | an organ, region, tissue or structure | Glomerular capsule, SA node, Alveoli | `makes: { substanceRow: 'secretes …' }` |
| `cell` | a cell type | Type II pneumocyte, Parietal cell, Sertoli cell | `makes` |
| `substance` | a hormone, enzyme, ion, gas, molecule | Renin, Pepsinogen, Oxyhemoglobin | `acts: { target: 'effect' }` |
| `process` | a step, mechanism, reflex or phase | Glomerular filtration, Micturition reflex, Luteal phase | `next: { processRowOrTopic: 'leads to …' }` |

Justification: these are the units the decks' headings and bullet lists name (section 3's
outlines), each fits on one line, and each kind has a natural link that the slides state
in words (made by, acts on, leads to). **Values are not rows**: a number (GFR 125 ml/min,
threshold −40 mV) is part of the line of the row it describes, so no row is a bare number
(rule 4). Reflexes and feedback loops are `process` rows; a loop is a chain of `next`
links whose last step links back with the slide's word ("negative feedback").

Fields otherwise as anatomy: `{ k, id, l, parent, w, src, match?, old?, line?, own?, links? }`.
The links are still undirected on screen; the reason carries the direction.

### 4.3 Systems (colour groups)

From the lecture content, one group per lecture system:

| key | Label | Colour | Body | Weeks |
| --- | --- | --- | --- | --- |
| `p_cell` | Cells & tissues | `#9FB2BB` | cells (same as anatomy's tissue grey) | 1, 2 |
| `p_cvs` | Blood & heart | `#E879C6` | heart (same as anatomy's Heart & vessels) | 2 |
| `p_resp` | Breathing | `#7DD3F0` | — | 3 |
| `p_gi` | Digestion | `#C6D86B` | — | 4 |
| `p_renal` | Kidney & urine | `#F2A65A` | — | 5 |
| `p_repro` | Reproduction | `#B58CF0` | — | 7 |

Reserved for later weeks, checked now so the palette holds: `p_endo` Hormones `#F5E08A`,
`p_nerve` Nerve `#5B8DEF`, `p_musc` Muscle `#E3786B` (anatomy's muscle red, body muscle),
`p_immune` Immunity `#4FD1B0`. The smallest distance in the full ten is 51; every colour
is at least 4.9:1 on `#162428`. Homeostasis and feedback (Lecture 1) sit under `p_cell`.
Reusing anatomy's hue for the same body system is a default, not settled (Q5).

### 4.4 The Tissues & cells rows (re-homed, not lost, not doubled)

The 60 tissue rows in `hss2011-leaves-w1.js` (all week 2; sources `hss.tut.tissues` and
`hss.w1.2026`) are hidden from anatomy by `dropSystem`. They **move** to a new
`abct2326-leaves-tissues.js` and are deleted from the anatomy file:

- Their week stays 2 (the tutorial was given in week 2; the term calendar is shared).
- Where physiology Lecture 1 (week 1) names the same structure, the Lecture 1 row is
  the one row; the tutorial row is dropped and its slide line, if Lecture 1 has none, is
  carried as the Lecture 1 row's line only if the tutorial page says it (the source
  stays the page that says it, so the row then cites the tutorial page).
- The other rows are re-parented to physiology topics/rows (`p_epithelial`,
  `p_connective`, `p_muscle_t`, `p_neural_t`, `p_tissues`, `p_body_org`).
- Their 14 links to anatomy rows (`w6_bbbarrier`, `w5_elecsyn`, `bone`, `glia`…) are
  removed (no cross-subject links, Q8) and listed in README. The one anatomy row that
  linked into them (`w2_tis_proteoglycans → w2_tis_conn`) loses that link.
- `dropSystem(…, 'tissue')` stays in the anatomy registry, hiding the four anatomy
  tissue topics, whose notes speak in anatomy weeks (Q10).
- The removed tissue thread (`t11`, last in `git show 0358b27^:outputs/revision/hss2011-threads.js`)
  is reference only; physiology threads are written fresh in physiology weeks.

Guard: row ids and node ids are disjoint across subjects, and no `(source, page, label)`
appears in two subjects.

### 4.5 Threads, Tables, Decoder

Anatomy's fragments are ported HTML with textbook stars. Physiology's are structured
data in `abct2326-fragments.js`, rendered by pure functions in a new
`outputs/revision/fragments.js` into the same classes revise.js already handles:

- **Threads**: `{ id: 't1', title, steps: [{ wk, hd, text, src: [id, page], match }] }`.
  Candidates (each step must be on a slide): oxygen from air to cell (W3 ventilation →
  gas exchange → oxygen transport → W2 blood and circulation); blood pressure and volume
  (W2 vessels, heart → W5 GFR, sympathetic effects, RAAS); feedback loops (W1 negative
  and positive feedback → W3 PCO2 control → W5 renin regulation → W7 hormonal control and
  parturition); a meal (W4 mouth to large intestine, its regulation phases).
- **Tables**: `{ id, title, head, rows: [{ wk, cells, src, match }] }`. Candidates:
  hormone → made by → acts on → effect (W4, W5, W7); pressures, volumes and rates
  with their slide values (W2, W3, W5).
- **Decoder**: a hand-picked list of row labels `{ term, wk }`; the word parts come from
  `wordparts.js decompose()`, which is already the app's labelled reading help. Splits it
  gets wrong (it reads oxyhemoglobin's `oxy-` as "rapid") are left out (Q9).
- **Tours** (Brain 3D): one per thread, stops are topic ids.

Until those are written the registry carries `requireFragments: false` and the three tabs
are hidden for physiology; the fragment task deletes the flag.

## 5. Code: generalised vs duplicated

Generalised (one code path for both subjects):

| File | Today (anatomy-only) | Change |
| --- | --- | --- |
| `outputs/study/revise.js` | `SYS`, `SYSVAR` (lines 37–38); `SYSVAR[sy]` in `deriveWeek` (156); `SYS`/`SYSVAR` in `renderPanel` (215, 236); `rv.subject = DEFAULT_SUBJECT` only, no switch (41); root label uses the code (151); `homeHTML` says "single muscles, bones, joints and nerves" (187); OWN note says "the slides give only the name" (218); viewer button for every node (224, 876); fragment tabs always shown (676–704) | Systems from the registry; CSS variables set from it; generated legend; subject switch (`setSubject`, saved as `revise:subject`); copy from `copy`; `n.own || OWN[id]` with a truthful label; `viewerEligible`; tabs hidden when a fragment is empty. |
| `outputs/study/revise-brain.js` | `COL`, `DIM` (23, 38); `COL[n.s]` (75, 180); `hubLayout` without order (70) | Colours and order from `env.colour(s)` / `env.order()`. |
| `outputs/revision/hub.js` | `SYSORDER` fixed (15); `pickFirst` ranks by it (22, 34) | `hubLayout({…, order})`, `pickFirst(first, max, order)`; `SYSORDER` stays the default. |
| `outputs/radiography-study-studio.html` | static legend spans (145–151, 185–191); no subject control; anatomy aria-label (156) | Legend spans removed (the label stays); `#rvSubjects` group added; aria-label set by JS. |
| `outputs/revision/leaves.js` | kinds group, muscle, bone, joint, nerve, part | adds cell, substance, process, fields `acts`, `makes`, `next`, carries `own`; adds `topicNodes()`. |
| `outputs/revision/registry.js` | one subject | adds `systems`, `hubOrder`, `copy` to HSS2011 (values copied from app.css lines 1409 and 1441, so anatomy looks the same); adds ABCT2326. |
| `work/revision-check.mjs` | own-words rule inside `if (subject.id === 'HSS2011')` (39–49); fragments required | Rules for every subject via `rules.js`; new guards in section 2. |

New, pure (checked in node): `outputs/revision/rules.js` (`lineIsUseful`, `needsOwn`,
`ownProblems`, `viewerEligible`, `legendKeys`, `checkSystems`, `rowWeekOk`),
`outputs/revision/fragments.js` (`renderThreads`, `renderTables`, `renderDecoder`).

Duplicated per subject (data only): `abct2326-topics.js`, `abct2326-leaves-w1.js`, `-w2`,
`-w3`, `-w4`, `-w5`, `-w7`, `abct2326-leaves-tissues.js`, `abct2326-fragments.js`.

Unchanged: `weeks.js`, `describe.js`, `link-rows.js`, `own-words.js` (anatomy's), the
Markmap/3D vendor files, `focusBranch`.

## 6. Build order (waves)

- **Wave 0** (one session, in order): intake of five decks; `rules.js`, `leaves.js`,
  `fragments.js` with tests; check generalisation and `pages-workflow-check`; registry
  wiring with empty leaf stubs; physiology topics; the UI (subject switch, systems,
  legend, viewer gating); shell. After it the app shows a physiology map of topics only.
- **Wave 1** (six parallel sessions, disjoint files): one per week's leaf file; Week 1
  also moves the tissue rows. Each writes its own `own` sentences.
- **Wave 2** (one session): cross-week row links, threads, tables, decoder, tours.
- **Wave 3** (one session): glosses, docs, baselines, browser verification.

## 7. Risks

- **Own-words volume.** Physiology slides are bullet-heavy; expect a third to a half of
  rows to need an own sentence (anatomy's moved tissue rows: 23 of 60). Budgeted as part of
  every data task, not a clean-up.
- **The general own rule may flag anatomy rows** the 25-character rule missed (lines of
  25+ characters with fewer than three words, or fragment-only). Wave 0 lists them and
  writes their sentences in `own-words.js`; if more than 20, it stops and asks.
- **Own sentences drifting into teaching.** Guarded by no digits, no stars, length cap,
  and the review step; still a judgement call per sentence.
- **Image-only content.** Graphs (oxyhemoglobin curve, ECG, pressure–volume loop) carry
  much of the meaning; their words are not written. Recorded, not guessed.
- **Viewer false hits.** `viewerHit` matches titles; a physiology part named like a mesh
  ("Heart") is right, but a part named loosely ("Pyloric sphincter") may miss. Eligible
  only, never forced.
- **Week 6 chip is empty** (quiz week). It stays a chip because every week up to the last
  with content is one; the week note says nothing new was added.
- **Markmap size.** Six weeks of ~100 rows is about anatomy's Weeks 1–6; "Open all" was
  acceptable there.
- **Found while planning (anatomy, live):** rows under a row that `mergeLeaves` folds into
  its same-named topic (ALIAS, commit 8f05070) get no colour group: 59 HSS2011 rows under
  Vertebral column, Brainstem and Cerebellum have `s` undefined, so `renderPanel`'s
  `SYSVAR[n.s].replace` would throw when one is tapped. Plan Task 3 fixes it (one line in
  the ALIAS branch, with a test); `checkSystems` would otherwise fail on anatomy.
- **Concurrent sessions** touching `course-data.js`, `source-text.json`, `sw.js`,
  `term-gloss.js`: only Wave 0 and Wave 3 touch shared files.

## 8. Open questions for the owner

1. **Week 8 Endocrine** is in iCloud but not lectured until 21 October. Build its rows now
   (the W8 chip would then be offered before the lecture, since there is no `released` cap)
   or only after the lecture? Default: after.
2. **Labs and tutorials.** Leave out the CVS/respiratory/digestion labs and the image-only
   2026 tutorial scan? Default: leave out.
3. **The renal deck is named "2019"** but sits in the 2026 folder. Treat it as the 2026
   deck? Default: yes.
4. **Tissue rows' week.** Keep week 2 (the tutorial) although physiology's Lecture 1 taught
   tissues in week 1? Default: keep 2; Lecture 1's own rows are week 1.
5. **Colours.** Reuse anatomy's hue where the body system is the same (heart pink, cells
   grey, muscle red), or an all-new palette? Default: reuse.
6. **Cantonese memory lines** (anatomy threads have them): add for physiology? Default: no.
7. **Textbook additions** (anatomy's ★ facts): allowed in physiology? Default: no, slides only.
8. **Cross-subject links** (physiology CVS ↔ anatomy Week 8 heart): none for now? Default: none.
9. **Decoder**: built from `wordparts.js` with wrong splits left out, hand-written, or
   no Decoder tab for physiology? Default: wordparts, wrong splits left out.
10. **The four anatomy tissue topics** stay in `hss2011-data.js`, hidden by `dropSystem`,
    or are deleted? Default: stay hidden (less risk to anatomy data).
11. **Legend change for anatomy.** Five anatomy legend entries now show from week 1 even
    with nothing taught; after this change they appear only once taught. Confirm.
12. **Which subject opens first**: the last one chosen (default), or the one whose lecture
    is next?
