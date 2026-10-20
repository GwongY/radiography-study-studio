# ABCT2326 Human Physiology in Revise — design

Date: 19 October 2026 (Monday of teaching week 8). Status: built 19–20 October 2026 (ABCT2326 in Revise: `outputs/revision/abct2326-*.js`, guarded by `work/revision-check.mjs`). The owner
answered the open questions the same day; section 8 records the answers and this
document follows them.
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

**Every lecture of the term is built now** (owner, answer 1), Weeks 1 to 13, from the ten
2026 lecture decks already in iCloud. The week rule is unchanged: Auto shows the last
fully taught week (week 7 today), and every later week is a chip the owner can pick.

Anatomy's Tissues & cells rows **join physiology's Lecture 1** (answer 10): one place for
tissues, week 1. Where a physiology box and an anatomy box are about the same thing, the
notes panel offers **"In Anatomy" / "In Physiology"** links that switch subject and open
the other box (answer 8).

Nothing here teaches, tests, schedules or records answers (CLAUDE.md principles 0, 1).

## 2. The owner's standing rules, and how each is enforced

Every rule from the anatomy build is a design rule here and has a mechanical guard.
"Node check" means `work/revision-check.mjs` or `work/revise-pure-check.mjs` (both run
in `pages.yml`, so a failure blocks the deploy). "Browser check" means
`work/revise-browser-check.js`, a new script run in the Browser pane like the other
`work/*-browser-check.js` files.

| # | Rule | Design | Guard |
| --- | --- | --- | --- |
| 1 | Revise links what is learnt; sourced only | No items, quiz, scheduler. Every physiology row, topic, topic link, thread step, table row and cross-subject link cites a page of a **lecture deck in the iCloud `Human Physology` folder** (answers 2, 3); no `old: true` fallback. The one other source is the Martini textbook, only for ★ facts (answer 7, section 4.5). Words only in slide pictures are not written; each data task lists them and the README records them. | Node: every name, `match` and reason is on a page it cites; every row's and topic's source is one of the subject's `decks` (`rowWeekOk`); no ABCT2326 row is `old`. Image-only words: process (a list per task, collected into the README). |
| 2 | Week gating: later weeks removed, not dimmed; Auto = last fully taught week; every week with content is a chip; no `released` cap | Unchanged week code (`weeks.js`, `autoNow`). A row carries the week of the lecture that taught it; a deck taught over two lectures lists both weeks (section 3). Fragment parts that retell a whole thread (the 廣東話 line) wait for the thread's last week. | Node: the monotonic / prune / clean-link checks for every subject; `released` unset for ABCT2326; `rowWeekOk`: a row's or topic's week is one of its deck's weeks and holds an ABCT2326 **lecture** in `SESSIONS`; every `.yue` carries `data-wk` (anatomy's five gain one too). |
| 3 | Clean map: no sentence under a box; sentence in the notes; tapping a branch frames it | Map content builder unchanged (label, week tags, "new"). `focusBranch` unchanged. | Node: `revision-check` fails if `deriveWeek()` calls `describe(` or emits `rv-said`. Browser: no Map node has text other than its label, `.mwk` and `.wknew`. |
| 4 | Every row's notes say something useful | A general rule, not examples: a row (or physiology topic) needs an own-words sentence unless its slide line is **useful**: at least 25 characters, not a count or fragment, and at least three words. Physiology own words live on the row as `own`, are shown labelled as the app's own words, and hold no digit and no star. | Node: `rules.js needsOwn()` over every leaf of every subject; `ownProblems()` over every ABCT2326 `own`. |
| 5 | No box has a child of the same name | Reuse `mergeLeaves` ALIAS folding. Within one parent, no two rows share a label; no topic is named like its branch heading. | Node: the twins check (per subject, unconditional); no two rows of one subject share label and parent. |
| 6 | Legend and colours only once taught; physiology has its own groups | Systems move from hard-coded maps (`SYS`, `SYSVAR` in revise.js, `COL` in revise-brain.js, `SYSORDER` in hub.js, static legend spans in the HTML) to `systems` on each registry entry. The legend is generated from the active subject and every entry carries `data-sys`. | Node: `rules.js checkSystems()`; pure test of `legendKeys()`. Browser: at physiology W1 only Cells & tissues shows; at anatomy W1 only what week 1 teaches. |
| 7 | Revise connects to the Viewer where a structure exists | "Show in the viewer" only for nodes `viewerEligible()` allows: topics flagged `viewer: true` and rows of kind part, muscle, bone, joint, nerve; never cell, substance, process or group rows. The jump keeps `revealStructure`'s `osteo:layers` chip lighting. | Pure test of `viewerEligible`. Browser: list every node whose button shows; none is a cell, substance, process or group; "Stomach" lights the organ chip. |
| 8 | Touch first; phone and iPad; no build; line endings; `$` in replacements | Subject switch is two 44 px buttons; cross-subject links are ordinary 44 px list buttons; no hover. Plain modules. | Browser at 390x844 and 820x1180. Process: Edit tool for existing files; any node patch script asserts `includes(old)` and uses a function replacer. |
| 9 | Process traps | `CACHE_VERSION` bump; every new module in SHELL with its exact specifier; CODEMAP and baselines regenerated only after reading the diff; clear the service worker before testing; check `git status` for other sessions. | `shell-check`, `codemap-check`, `baseline --check` (all in `pages.yml`). |
| 10 | Deploy trap: `pages.yml` must not reference a missing script | `pages.yml` runs the list in plan Task 24. | NEW `work/pages-workflow-check.mjs`: every `node work/<file>` in `pages.yml` exists; added to `pages.yml` and to the after-every-edit list. |

## 3. Sources and weeks (the inventory)

Teaching weeks from `outputs/schedule.js` (Group 4; week 1 starts Monday 31 August 2026).
Today is Monday of week 8, so Auto shows weeks 1–7. Sources are the lecture decks in
iCloud `Human Physology` and nothing else (answers 2, 3).

| Week | ABCT2326 lecture | 2026 deck (iCloud `Human Physology`) | Martini ch | Pages | Source id |
| --- | --- | --- | --- | --- | --- |
| 1 | Lecture 1 Cell / Body (2 Sep) | `Lecture 1 - Cells and Body Organization.pdf` | 1, 3, 4 | 62 | `phys.1.2026` (registered) |
| 1 | (merged, answer 10) | `Tutorial2_HSS2011_HumanAnatomy_WEEK2_202627_BodyTissues.pdf`, the tissue tutorial filed in this folder | 4 | 24 | `hss.tut.tissues` (registered) |
| 2 | Lecture 2 Cardiovascular (9 Sep) | `ABCT2326 Cardiovascular System.pdf` | 19–21 | 68 | `phys.l2.2026` (intake) |
| 3 | Lecture 3 Respiratory (16 Sep) | `ABCT2326 Respiratory System.pdf` | 23 | 75 | `phys.l3.2026` (intake) |
| 4 | Lecture 4 Digestive (23 Sep) | `ABCT2326_L4 -Digestive.pdf` | 24 | 68 | `phys.l4.2026` (intake) |
| 5 | Lecture 5 Renal (30 Sep) | `ABCT2326 Renal System 2019.pdf` (named 2019, filed with the 2026 decks, so used) | 26 | 46 | `phys.l5.2026` (intake) |
| 6 | Quiz on Lectures 1–5; no lecture | — | — | — | no rows; the W6 chip adds nothing |
| 7 | Lecture 6 Reproductive (14 Oct) | `ABCT2326 Reproduction(1).pdf` | 28, 29 | 60 | `phys.l6.2026` (intake) |
| 8 | Lecture 7 Endocrine (21 Oct) | `ABCT2326 Endocrine System.pdf` | 18 | 55 | `phys.l7.2026` (intake) |
| 9 | Lecture 8 Nervous (28 Oct) | `ABCT2326 Nervous system.pdf` (22 pages are figures only) | 12 | 66 | `phys.l8.2026` (intake), weeks 9 and 11 |
| 10 | No class | — | — | — | — |
| 11 | Lecture 9 Nerve / Musculoskeletal (11 Nov) | `ABCT2326 Muscle.pdf` (pages 64–70 are bone) | 10 | 70 | `phys.l9.2026` (intake), weeks 11 and 12 |
| 12 | Lecture 10 Musculoskeletal / Immune (18 Nov) | `ABCT2326 Immune v2.pdf` | 22 | 71 | `phys.10.2026` (registered), weeks 12 and 13 |
| 13 | Lecture 11 Immune (25 Nov) | same deck | — | — | — |

**Decks taught over two lectures.** The schedule's titles show the Nervous deck running
into Lecture 9, the Muscle deck into Lecture 10 and the Immune deck into Lecture 11. Each such deck lists both weeks and
its rows sit at the **first** lecture's week. The owner learns from the slides on their
own rather than in the lecture, and will have covered everything before the final, so no
row is moved later (owner, 19 Oct 2026). `rowWeekOk` still allows either week.

Not sources (answers 2, 3): the 2026 tutorial scan (`phys.tut.scan2026`, image only), the
labs (`Digestion Updated.pdf`, the CVS and respiratory lab material), the lab report
guides, the offline writing plan and the recording in the same folder, and every older
deck on `E:` (`phys.2`…`phys.10`, `phys.*.deck`).

Page counts above are from `pdftotext` form feeds; intake confirms them. Two decks share a
filename with an old deck on `E:` (`ABCT2326 Muscle.pdf` is also `phys.muscle.deck`), so
intake proves it cached the iCloud copy by a page only the 2026 copy has.

## 4. Data model

The registry shape is unchanged: `REVISION.ABCT2326 = { id, label, data, rows, threads,
tables, decoder, sources, tours }`, plus fields every subject now has:

```js
systems: [{ key, label, col, map, body }],  // legend order; col = legend and 3D, map = Markmap shade
hubOrder: ['p_cell', ...],                  // 3D hub grouping order
copy: { name, leafWords, findHint },        // switch button name, and the few words revise.js used to hard-code for anatomy
```

and, for a subject written from scratch, `sourced: true` and
`decks: { sourceId: { weeks: [..], ch: [..] } }` (the only sources its rows may cite, their
teaching weeks, and their Martini chapters for ★ facts).

### 4.1 Topics

Physiology topics are written like rows (`outputs/revision/abct2326-topics.js`), so the
same source gate holds them: `{ id, l, s, w, src: [id, page…], line?, own?, match?, th?, viewer? }`.
`topicNodes()` (new, in `leaves.js`) turns them into `NODES` with the note built from the
slide line and the source, exactly as a leaf's note is. No hand-written HTML topic notes.
Topic ids are prefixed `p_`, row ids `p<week>_`, so nothing collides with anatomy.

147 topics: Weeks 1–7 as before (76), Week 8 endocrine 16, Week 9 nervous 18, Week 11
muscle and bone 20, Week 12 immunity 17. Every name was checked against its page during
planning. The tree is root → one branch per system → its topics → rows; no topic is named
like its branch (the endocrine topic is "What is a hormone", not "Hormones").
Topic-level links are `[a, b, reason, [sourceId, page, words?]]`; the source is required.

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

These are the units the decks' headings and bullet lists name, each fits on one line, and
each kind has a natural link the slides state in words (made by, acts on, leads to).
**Values are not rows**: a number (GFR 125 ml/min, threshold −55 mV) is part of the line of
the row it describes. Reflexes and feedback loops are `process` rows; a loop is a chain of
`next` links whose last step links back with the slide's word ("negative feedback").

Fields otherwise as anatomy: `{ k, id, l, parent, w, src, match?, line?, own?, links? }`.
The links are undirected on screen; the reason carries the direction.

### 4.3 Systems (colour groups)

One group per lecture system. Anatomy's hue is reused where the body system is the same
(answer 5):

| key | Label | Colour | Body | Weeks |
| --- | --- | --- | --- | --- |
| `p_cell` | Cells & tissues | `#9FB2BB` | cells (anatomy's old tissue grey) | 1 |
| `p_cvs` | Blood & heart | `#E879C6` | heart (anatomy's Heart & vessels) | 2 |
| `p_resp` | Breathing | `#7DD3F0` | — | 3 |
| `p_gi` | Digestion | `#C6D86B` | — | 4 |
| `p_renal` | Kidney & urine | `#F2A65A` | — | 5 |
| `p_repro` | Reproduction | `#B58CF0` | — | 7 |
| `p_endo` | Hormones | `#F5E08A` | — | 8 |
| `p_nerve` | Nerves | `#5B8DEF` | — | 9, 11 |
| `p_musc` | Muscle & bone | `#E3786B` | muscle (anatomy's Muscles) | 11, 12 |
| `p_immune` | Immunity | `#4FD1B0` | — | 12, 13 |

The smallest distance between two of the ten is 51; every colour is at least 4.9:1 on
`#162428`. Homeostasis and feedback (Lecture 1) sit under `p_cell`. Anatomy's nerve blue
`#6FA8E8` is not reused: it sits 46 from Breathing.

### 4.4 Tissues: one place, merged into Lecture 1 (answers 4, 10)

Today anatomy holds four tissue topics (`tissues`, `junctions`, `epithelium`,
`connective` in `hss2011-data.js`) and 62 rows (`w2_tis_*` in `hss2011-leaves-w1.js`: 56
from the tissue tutorial `hss.tut.tissues`, 6 from the anatomy orientation deck
`hss.w1.2026`). 60 hang under the tissue topics and are hidden from the anatomy map by
`dropSystem(…, 'tissue')`; 2 (Proteoglycans, Glycosaminoglycans) cite the tutorial but hang
under anatomy's Ground substance row and show in anatomy from week 2. The 60 move, not
hide; the 2 are deleted from anatomy first and not added to physiology (owner, 19 Oct 2026):

- **Anatomy loses them.** The two ground-substance rows, the four topics, their tree
  branch, their 19 topic edges, the four W8 topic edges and four W8 row links into them, and
  `dropSystem` itself (function, call and tests) are deleted. Anatomy's visible map changes
  only in that Ground substance loses its two tutorial rows.
- **One row per thing, week 1.** Physiology Lecture 1 (week 1) and the tissue tutorial
  name many of the same things: a plain word match finds 28 of the 60 on a Lecture 1 page
  (some loosely, such as "Organ" inside "Organization"; the task decides each by reading
  the page). Where both name it, there is one row: its source is the page whose words make
  the more useful line (`lineIsUseful`), Lecture 1 when both do. The other rows keep their
  tutorial page. All are week 1 (answer 4).
- **Sources stay physiology's.** The tutorial file is in iCloud `Human Physology`, so it is
  a physiology source (deck weeks `[1]`). The 6 orientation-deck rows are not: each is
  re-cited to the Lecture 1 page that names it (cellular level, tissue, organ, system,
  organism) or dropped and listed.
- **Parents** become `p_tissues`, `p_epithelial`, `p_connective`, `p_muscle_t`,
  `p_neural_t`, `p_body_org`, `p_cells`, or a Lecture 1 row.
- **Links that crossed into anatomy become cross-subject links** (section 4.6): the 14
  row links out (`w6_bbbarrier`, `w5_elecsyn`, `w1_cartilage`, `bone`, `w1_collagen`,
  `w1_musfibre`, `w1_fascicle`, `w1_perimysium`, `w1_epimysium`, `w1_tendon`, `neuron`,
  `w1_motorneuron`, `glia`), the 4 anatomy W8 rows that link in (`w8_mesothelium`,
  `w8_areolar`, `w8_gapj`, `w8_contcap`), the 4 W8 topic edges and the 16 topic edges from
  the tissue topics to anatomy topics. Each becomes a cross link only if a page states it
  (the source rule); the rest are listed.

Guard: row ids and node ids are disjoint across subjects; no `(source, page, label)` is in
two subjects; no anatomy row, edge or tree node names a deleted tissue id.

### 4.5 Threads, Tables, Decoder

Anatomy's fragments are ported HTML. Physiology's are structured data in
`abct2326-fragments.js`, rendered by pure functions in a new `outputs/revision/fragments.js`
into the classes revise.js already handles:

- **Threads**: `{ id, title, steps: [{ wk, hd, text, src: [id, page], match, star? }], yue }`.
  Candidates (each step on a slide): oxygen from air to cell (W3 → W2); blood pressure and
  volume (W2 → W5 → W8 hormones); feedback loops (W1 → W3 → W5 → W7 → W8 pituitary axis); a
  meal (W4); a signal from nerve to muscle (W9 synapse → W11 neuromuscular junction and
  contraction); defence (W12 innate → adaptive).
- **廣東話 lines (answer 6).** Every physiology thread ends with one, as anatomy's do: a
  retelling of that thread's steps in Cantonese, labelled 廣東話. It adds no fact: every
  English word and every number in it must already be in one of the thread's steps
  (`yueProblems`). It carries the thread's last week, so it hides until the whole thread is
  taught. Anatomy's five 廣東話 lines get the same `data-wk` (today they show at any week).
- **★ textbook facts (answer 7).** A thread step may carry
  `star: { text, page, ch }`: one sentence from the Martini textbook (`phys.ebook`, PDF
  page `page`) that joins or explains the step's slide fact, from a chapter the step's own
  deck is built on (`decks[…].ch`). It renders with ★ and its page; the Threads intro says
  what ★ means. ★ facts are never on rows, topics or own words. The textbook's text is
  deliberately not in the repo (public), so the check holds the citation's shape and chapter;
  the words are the task's responsibility, read from the PDF on `E:`.
- **Tables**: `{ id, title, head, rows: [{ wk, cells, src, match }] }`. Candidates: hormone →
  made by → acts on → effect (W4, W5, W7, W8); values with their slide numbers (W2, W3, W5,
  W9, W11). Slides only.
- **Decoder (answer 9: "ensure they are correct").** A list `{ term, wk, reading }`. The
  reading comes from `wordparts.js decompose()`, the app's labelled reading help; the task
  reads every reading against the slide's meaning of the word, keeps it only if every part
  is right for this word (it drops, for example, `oxy-` read as "rapid" in oxyhemoglobin),
  and writes the reading it approved into `reading`. The app shows a term only while
  `decompose()` still gives exactly that reading, and the check fails if it ever differs,
  so a later change to `wordparts.js` cannot slip a wrong split in. A term must be a row or
  topic name.
- **Tours** (Brain 3D): one per thread, stops are topic ids.

Until those are written the registry carries `requireFragments: false` and the three tabs
are hidden for physiology; the fragment task deletes the flag.

### 4.6 Cross-subject links (answer 8)

`outputs/revision/cross-links.js` holds
`CROSS = [{ a: ['ABCT2326', id], b: ['HSS2011', id], why, src: [sourceId, page], match }]`.
The reason is in a slide's words and `match` is on the cited page (either subject's slide).
They are not drawn on the Map or in Brain 3D (each subject keeps its own graph); the notes
panel lists them under "In Anatomy" or "In Physiology", shown only once the far end's week
is reached. Tapping one switches subject (keeping the week if the far end needs it) and
opens that box. `crossFor()` in `rules.js` is the one place that decides which show.

Candidates: the tissue links (section 4.4); physiology W2 heart, valves and conduction ↔
anatomy W8 heart; W3 breathing ↔ anatomy W8 lungs; W9 nervous ↔ anatomy W5–W6 nervous;
W11 muscle and bone ↔ anatomy W1–W3 muscles and bones; W8 glands ↔ anatomy rows naming
them. Guard: both ends exist, the subjects differ, no pair twice, the reason on its page.

## 5. Code: generalised vs duplicated

Generalised (one code path for both subjects):

| File | Today (anatomy-only) | Change |
| --- | --- | --- |
| `outputs/study/revise.js` | `SYS`, `SYSVAR` (lines 37–38); `SYSVAR[sy]` in `deriveWeek` (156); `SYS`/`SYSVAR` in `renderPanel` (215, 236); no subject switch (41); `homeHTML` says "single muscles, bones, joints and nerves" (187); OWN note says "the slides give only the name" (218); viewer button for every node (224, 876); fragment tabs always shown (676–704); `.yue` never gated (720) | Systems from the registry; CSS variables set from it; generated legend; subject switch (`setSubject`, saved as `revise:subject`); copy from `copy`; `n.own || OWN[id]` with a truthful label; `viewerEligible`; tabs hidden when a fragment is empty; cross-subject links in the notes; `.yue[data-wk]` gated. |
| `outputs/study/revise-brain.js` | `COL`, `DIM` (23, 38); `COL[n.s]` (75, 180); `hubLayout` without order (70) | Colours and order from `env.colour(s)` / `env.order()`. |
| `outputs/revision/hub.js` | `SYSORDER` fixed (15); `pickFirst` ranks by it (22, 34) | `hubLayout({…, order})`, `pickFirst(first, max, order)`; `SYSORDER` stays the default. |
| `outputs/radiography-study-studio.html` | static legend spans (145–151, 185–191); no subject control; anatomy aria-label (156) | Legend spans removed (the label stays); `#rvSubjects` added; aria-label set by JS. |
| `outputs/revision/leaves.js` | kinds group, muscle, bone, joint, nerve, part; `dropSystem` | adds cell, substance, process, fields `acts`, `makes`, `next`, carries `own`; adds `topicNodes()`; `dropSystem` deleted (plan Task 10). |
| `outputs/revision/registry.js` | one subject; `dropSystem(…, 'tissue')` | adds `systems`, `hubOrder`, `copy` to HSS2011 (values from app.css lines 1409 and 1441, so anatomy looks the same); adds ABCT2326; the `dropSystem` call goes. |
| `work/revision-check.mjs` | own-words rule inside `if (subject.id === 'HSS2011')` (39–49); fragments required | Rules for every subject via `rules.js`; the guards in section 2; cross links; 廣東話, ★ and decoder checks. |

Anatomy data changed by the tissue merge only: `hss2011-data.js` (four topics, their edges
and branch deleted), `hss2011-leaves-w1.js` (62 rows out), `hss2011-leaves-w8.js` (four
topic edges and four row links out, to cross links), `hss2011-threads.js` (`data-wk` on five
廣東話 lines).

New, pure (checked in node): `outputs/revision/rules.js` (`lineIsUseful`, `needsOwn`,
`ownProblems`, `viewerEligible`, `legendKeys`, `checkSystems`, `rowWeekOk`, `crossFor`,
`yueProblems`, `starProblems`), `outputs/revision/fragments.js` (`renderThreads`,
`renderTables`, `renderDecoder`, `decoderReading`, `decoderProblems`).

Duplicated per subject (data only): `abct2326-topics.js`, `abct2326-leaves-w1.js`, `-w2`,
`-w3`, `-w4`, `-w5`, `-w7`, `-w8`, `-w9`, `-w11`, `-w12`, `abct2326-leaves-tissues.js`,
`abct2326-fragments.js`; shared data `cross-links.js`.

Unchanged: `weeks.js`, `describe.js`, `link-rows.js`, `own-words.js` (anatomy's), the
Markmap/3D vendor files, `focusBranch`.

## 6. Build order (waves)

- **Wave 0** (one session, in order): intake of eight decks; `rules.js`, `leaves.js`,
  `fragments.js` with tests; check generalisation and `pages-workflow-check`; registry
  wiring with empty leaf stubs and an empty `cross-links.js`; the 147 topics; the UI
  (subject switch, systems, legend, viewer gating, cross links, 廣東話 gating); shell. After
  it the app shows a physiology map of topics only.
- **Wave 1** (ten parallel sessions, disjoint files): one per lecture deck's leaf file;
  Week 1 also merges the tissue rows and is the only one touching anatomy files.
- **Wave 2** (one session): links across weeks and across subjects; threads, tables,
  decoder, tours.
- **Wave 3** (one session): glosses, docs, baselines, browser verification.

## 7. Risks

- **Volume.** Ten decks (about 650 pages) instead of six; expect well over a thousand rows.
  A third to a half need an own sentence; budgeted inside every data task, not a clean-up.
- **The general own rule may flag anatomy rows** the 25-character rule missed. Wave 0
  lists them and writes their sentences in `own-words.js`; if more than 20, it stops and asks.
- **Own sentences, ★ facts and 廣東話 lines drifting into teaching.** Own words: no digits,
  no stars, length cap. ★: one sentence, the lecture's own chapter, a page. 廣東話: no
  English word or number the steps did not use. Each is still a judgement call per line.
- **★ cannot be checked by machine** against the textbook (its text is not in the public
  repo). The check holds chapter and page; the task reads the page.
- **Split decks.** Nervous, Muscle and Immune rows sit at their first lecture's week, so
  Auto may show some slides one lecture early. Accepted by the owner, who self-studies the
  slides and covers all before the final.
- **Image-only content.** The Nervous deck has 22 figure-only pages; graphs (oxyhemoglobin
  curve, ECG, action potential) carry much of the meaning. Their words are not written.
- **Viewer false hits.** `viewerHit` matches titles; a loosely named part may miss.
  Eligible only, never forced.
- **Weeks 6 and 10 chips are empty** (quiz week, no class). They stay chips because every
  week up to the last with content is one; the week note says nothing new was added.
- **Markmap size.** 147 topics and over a thousand rows is larger than anatomy's eight weeks;
  "Open all" at week 12 may be slow on a phone. Wave 3 measures it at 390x844; if a full
  expand takes over two seconds the owner decides whether "Open all" opens one level.
- **Concurrent sessions** touching `course-data.js`, `source-text.json`, `sw.js`,
  `term-gloss.js`: only Wave 0 and Wave 3 touch shared files; in Wave 1 only the Week 1
  session touches anatomy files.

## 8. The owner's answers (19 October 2026)

| # | Question | Answer | What the design does |
| --- | --- | --- | --- |
| 1 | Build Week 8 now or after its lecture? | Build all weeks now, not only to week 8. | All ten decks, Weeks 1–13. Auto still stops at the last fully taught week. |
| 2 | Labs and the tutorial scan? | Skip labs and tutorials. | Lecture decks only; `rowWeekOk` needs a lecture in the row's week. The tissue tutorial is merged by answer 10. |
| 3 | The renal deck named "2019"? | Use the iCloud physiology folder as the source; past sources not needed. | iCloud `Human Physology` only, the renal file included; no `old` rows. ★ facts are the one exception (answer 7). |
| 4 | Tissue rows' week? | Week 1. | All tissue rows are week 1. |
| 5 | Reuse anatomy's hues? | OK. | Cells grey, heart pink, muscle red reused. |
| 6 | 廣東話 lines? | Can. | One per thread, guarded (4.5). |
| 7 | ★ textbook additions? | Can. | In thread steps only, cited to a Martini page of the lecture's chapter (4.5). |
| 8 | Cross-subject links? | Can; confirmed "yes". | Section 4.6. |
| 9 | Decoder? | Ensure the splits are correct. | Every reading reviewed and frozen (4.5). |
| 10 | Anatomy's tissue topics? | They belong to physiology, the same as Lecture 1: merge, do not hide. | Section 4.4; `dropSystem` deleted. |
| 11 | Anatomy legend change? | Asked what it meant. | The colour key under the map lists body systems. Today anatomy's shows five of them even at Week 1, before those systems are taught; after this change an entry appears only from the week something of that colour is taught. That is the owner's own rule 6, so it is applied. |
| 12 | Which subject opens first? | Asked what it meant. | When Revise opens: the subject used last on this device, or the one whose lecture is next. The design keeps "used last". |
| A | Decks taught over two lectures: which week? | The owner self-studies from the slides and will cover everything before the final: "you decide". | Rows sit at the first lecture's week; nothing is moved later (section 3). |
| B | Proteoglycans and Glycosaminoglycans (tutorial rows under anatomy's Ground substance)? | Delete from anatomy first; no need to add them to physiology. | Deleted in plan Task 10 before the merge; not moved; no cross link for them (4.4). |

Nothing is open.
