# Traps

Bugs this repo already paid for. Each section names the file it governs; read
the section before editing that file. `CLAUDE.md` carries only what is true for
every session — everything area-specific lives here.

Grouped by file. `docs/CODEMAP.md` links each file to its section.

### The studio block — `outputs/studio.js`, `outputs/studio/visualisation-modes.js`, `outputs/studio/depth-picking.js`

- **The 3D module's top-level code is fatal ground.** It wires ~20 buttons as bare
  `$('id').onclick = …` at module top level; deleting any element throws and aborts
  the whole module *before* `window.__osteo` is assigned — the viewer dies silently
  while the page still looks fine. Move buttons, never delete them; diff the DOM id
  inventory before/after restructures.
- **The two inline modules have separate import scopes.** Block 0 (3D studio) and
  block 1 (study system) each have their own `import` lines; a symbol imported into
  one is *not* visible in the other, and there is no shared module scope beyond
  `window.__osteo`. New engine capability that needs a data module must import it in
  block 0 — importing it only in block 1 gives a `ReferenceError` that no load-time
  check catches, because the dead reference sits inside a method that only runs on
  user action. New engine methods graft on via `Object.assign(window.__osteo, …)`
  after the `},state};` literal, never inside it.
- **All GLB layers share one body frame** (native y 0.00–1.70, x ±0.33 —
  `loadExtraModel` applies the skeleton's transform verbatim to every layer, captured
  once as `state.bodyTransform`). Anything positioned relative to the body — overlays,
  hotspots, pivots — must map through that transform, and must be measured in the
  model's own upright frame, not the world frame (the idle turntable spins the pivot,
  so a world-space measurement swings with it).
- **Mesh names normalise on import**: `Scaphoid bone.r` → `Scaphoid_boner`. Matchers
  must *append* a candidate side letter, never strip one, or Femur and Vomer get
  corrupted. Parenthesised names like `Olfactory_nerve_(I)r` are their own trap — the
  normaliser turns `(` `)` into spaces.
- **The layer key is `muscle`, not `muscles`.** `BODY_LAYERS`, `STRUCTURE_MODELS`,
  `XRAY_MU` and `landmarks.js` all agree on it. `setLayer('muscles', …)` silently
  loads a second copy of `kas.glb` under a key nothing resolves against, so the
  diaphragm and the abdominal wall never appear.
- **Names in the GLB are not names in the scene.** three.js runs every node name
  through `sanitizeNodeName` on import: whitespace → `_`, and `[ ] . : /` are
  deleted. `Pharynx.j` becomes `Pharynxj`. `normName` turns a dot into a SPACE,
  so it read the catalogue name as "pharynx j" and never matched — the search
  result said "could not locate" for a mesh that was loaded and visible. Resolve
  layer meshes through `meshesFor()`, which has a tight (letters-and-digits)
  pass; `search-probe.mjs` checks all 1,686 rows survive it.
- The render loop stops while the studio view is hidden, so animated controls only
  work on that view.
- Picking is restricted to the taught layer inside a focused lesson, or the ghosted
  body behind it steals the tap.
- The legacy `assets/bodyparts3d/` upper-limb GLBs are **not** the active anatomical
  source (the 7-layer system is); they remain only as the anchor that positions the
  landmark hotspots.
- `MODEL_CATALOG` in `anatomy-data.js` records each layer's coverage *and its gaps* —
  check it before assuming a structure exists.

### Overlays and cavities — `outputs/cavity-build.js`, `outputs/cavity-geom.js`, `outputs/studio.js`

- **Measure with `state.scene.updateMatrixWorld(true)`, not the object's own.**
  A layer loaded moments ago has a pivot that is scaled and offset but not yet
  flushed, so `o.updateMatrixWorld()` composes against a stale parent and the
  mesh reports raw GLB metres. That put the epiglottis at y 1.6 among six
  cartilages at y 5.3 and dragged the larynx callout to mid-chest.
- **Measure through `state.scene.updateMatrixWorld(true)`, in EVERY place that
  measures.** `cavityContext` and `bodyMetrics` each flushed only the
  skeleton's branch, so a layer whose pivot was scaled and offset into the body
  frame but never flushed had all of its meshes read through the skeleton's
  inverse alone. Measured: the left lung came back at x 0.06-0.18, y -0.08-0.10
  while the ribs it sits inside are x +/-0.99, y 2.39-5.10. No lung point then
  lands in a mediastinal band, so the mediastinum built from nothing and
  returned null, and the pericardial sac inside it went with it -- the picture
  says "cavity missing" or "cavity out in front of the body", never "wrong
  transform". Worse, `state._cavPts` caches vertices by mesh uuid and used to
  survive every rebuild, so one bad measurement poisoned the session; it is
  dropped whenever the layer signature changes.
- **A cavity built before its layer loaded stays wrong until something
  rebuilds it.** The pericardial sac has no bony definition at all: with the
  vessel layer unloaded it is placed in the lower mediastinum and flagged as
  estimated. Turning the vessels on afterwards left that tapered drum on
  screen beside the heart it is meant to wrap, because nothing re-ran the
  builders. `loadExtraModel` now ends with `rebuildConcepts()`, which is a
  no-op when no overlay is showing. Check `conceptProvenance(id).exact`, not
  the picture: the estimate and the measurement look similar from the front.
- **Overlay groups ride the pivots.** The animate loop yaws `fullModel`,
  `realModel`, `conceptGroup`, `pickGroup` and every layer pivot together. A new
  group must be measured in the un-rotated frame AND adopt the current yaw
  (`syncOverlayYaw`) — while the turntable is paused the loop will not do it.
- **A callout anchors on the STRUCTURE, not on its bounding-box centre.**
  A box centre is off the thing whenever the thing is curved, hollow or
  elongated -- most of the body. The oesophagus runs behind the trachea and
  swings forward to the stomach, so its centre sat ~1.7 cm anterior to the
  tube, in the trachea's depth: the leader appeared to point at empty space in
  front of the windpipe. `nearestSurfacePoint` snaps to the nearest vertex
  (strided pass to find the mesh, exact pass within it).
- **Verify overlay positions in the BODY frame, not the world frame.** The
  turntable yaws the pivots continuously, so comparing a world-space dot
  against world-space vertices read a moment later shows a phantom few-mm
  error. Measured through the same inverse the anchor was built with, the gap
  is exactly 0.
- **Sprites anchor by edge, not centre** (`lab.center`). `updateHudSprites`
  rescales tags every frame, so a centre-anchored tag positioned from its
  creation-time half-width walks outward as you zoom and leaves the stage.

See also: **The nine regions and four quadrants are topographic, not derived
shapes** — in "The region grid and classifiers" below.

### The region grid and classifiers — `outputs/studio.js`, `outputs/cavity-build.js`

- **The nine regions and four quadrants are topographic, not derived shapes.**
  `measureGrid` returns measured CONSTANTS — midclavicular lines, subcostal,
  transtubercular, median, transumbilical — and the renderer only projects them onto
  the anterior surface. Never let a structure become a boundary: an earlier version
  used the costal arch as the top row's edge and the epigastric region came out as a
  triangle pointed at the xiphoid. Organs are excluded from every grid measurement,
  including the surface, on the same principle.
- **The region classifiers had no catch-all and now must not get one.**
  `importedRegion` used to end in a bare `return 'skull'`, so every unmatched
  name was absorbed into the cranium; `mapImportedName` walked an object literal
  with `String.includes`, so `phalanx -> hand` beat `metatarsal -> foot` on key
  order and sixty toe phalanges classified as upper limb. Both are ordered rule
  lists returning `null` when nothing matches, and `region-probe.mjs` fails if
  one of the 277 meshes is unplaced.
- **The region filter reaches the soft-tissue layers by a MEASURED box**, not by
  a guess from the name. That region's own bones give an AABB in the body frame;
  paired limbs get one box per side. The upper-limb box is measured from the
  FREE limb only — the clavicle reaches the midline at the sternoclavicular
  joint, so including the girdle drew a box that swallowed the trunk and
  "Upper limb" showed 90 of the 120 organs.

### Visibility and hiding — `outputs/studio.js`

- **`revealStructure` must dedupe its targets.** Each part of a multi-part spec
  widens to its whole unit, so a 39-part spec collected the same 77 meshes 39
  times and the card read "3003 parts".
- **The hidden tray lists STRUCTURES, not meshes.** `hideMesh` takes the whole
  `kinOf`, so a per-mesh tray showed "Phalanges of the hand" fourteen times with
  fourteen identical show buttons. `hiddenRows()` collapses on `canonicalId` and
  both the tray and `__osteo.hiddenList` go through it.
- **`applyVisibility` is the only thing that turns system-layer meshes back on.**
  `applyLayers` sets the layer ROOT's visibility and nothing else, so a mesh
  hidden by hand kept `visible === false` for ever and "show" in the hidden tray
  was a silent no-op. It restores every non-hidden mesh on every pass — which is
  also why `applyConnectiveVisibility` needs its `!state.flow` guard, since
  `applyVisibility` now runs during boot, before `state.flow` exists.
- **Hiding takes the whole structure.** `hideMesh` walks `canonicalId`, so
  hiding the deltoid hides all three of its parts rather than the one tapped.
- **Live physiology owns the connective layer.** Unhiding a bursa or a fascia
  while physiology is running restores nothing, because `applyConnectiveVisibility`
  hides it again. `unhide` checks for that and names the switch instead of
  leaving an empty tray and no explanation.

### The mesh index — `work/build-mesh-index.mjs`, `work/lib/mesh-names.mjs`

- **One node in the whole set is not anatomy.** `Pharynx.j` in the organs layer
  has zero height (extent [0.038, 0.000007, 0]) — a construction artefact that
  won the name "Pharynx" and framed an invisible sliver. The index generator
  drops any node with a zero-extent axis (from the POSITION accessor min/max),
  and the pharynx is a COMPOSITE of naso-, oro- and laryngopharynx.
- **The layer counts are STRUCTURES, not meshes.** The chips used to show raw
  mesh counts (skeleton 277, muscles 683); the same structure is counted once
  per side, again per duplicate export, and again per sub-part. `layerCount`
  and `updateStageMeta` read `MESH_INDEX`, so chips, stage caption and search
  all agree. The chips carry TWO numbers -- what the course names over what
  is modelled: 80/159, 115/344, 16/236, 62/104, 186/419, 127/317, 33/107.
  A THIRD number, how many things a tap can select, lives in the chip's
  tooltip and in the stage caption; it is `UNITS`, and it is neither of the
  two on the chip.
- **Every indexed mesh takes its STUDY UNIT's `canonicalId`**, in
  `loadExtraModel` (`sys:<layer>:u:<unitId>[:side]`) and in
  `prepareFullReference` (`full:u:<unitId>[:side]`). Picking, highlighting,
  hiding, isolation and the quiz all key off `canonicalId`, so setting it here
  merges them everywhere at once. **Sides stay separate**: telling left from
  right is the L2 drill. Meshes the index does not know keep the old per-mesh
  id. Before this the skeleton gave every mesh its own id, so tapping a toe
  answered "Distal phalanx of fifth finger of foot".
- **A group is named after the WHOLE when the whole has no mesh.** Deltoid,
  trapezius, pectoralis major, digastric and the aortic valve are modelled only
  as pieces, so the group takes the structure's name. Where the whole DOES
  exist in the same layer the pieces are ABSORBED into it instead (the branches
  of the ulnar nerve are the ulnar nerve), and the absorption walks the
  IMMEDIATE "of", not the last: "Anterior division of inferior trunk of
  brachial plexus" is a piece of the trunk, and the plexus has no mesh.
  "of" is not "part of" -- only the head nouns in `ABSORB` absorb, so a bursa
  of the piriformis and a ligament of the radius stay separate.
- **Where a structure IS is measured, never read off the name.** Nothing in
  "capitohamate interosseous ligament" says hand. `measureStructures` reads
  each structure's box out of the GLB in the shared body frame; the zone is the
  nearest bone's for the limbs and a height band for the axial body. Two traps:
  a PAIRED structure's union box straddles the midline and centres at x = 0, so
  zoning reads `sideBox` (one side) and not `box`; and a BONE takes its zone
  from its own name, because a height band put four of the twelve ribs "in the
  abdomen" and split the costal cartilages in half.
- **A kind is split by place only where the split is real.** Ligaments need it
  (39 in the foot, 33 in the hand); the three taeniae of the colon do not, and
  splitting them gave "Taeniae of the pelvis" plus one lonely free taenia. Two
  places must each hold two or more, or the kind is one group named after where
  most of it is. `SELF_LOCATING` (Ribs, Teeth, Vertebrae) drops the place
  entirely -- "Ribs of the thorax" says nothing "Ribs" does not.
- **The index is tiered, and the tier decides the UNIT, not the display.**
  `tier: 0` is what the course names; everything else resolves to a group. The
  search lists units, never rows -- but it MATCHES on both, so typing
  "cuboideonavicular" still works and the result says "found under ...".
  Removing that second match is how "lymph node" came back empty: no row is
  called that, only the unit is.
- **Search covers `mesh-index.js`, not just the curated lists.** The curated
  records are ~50 structures; the model has 1,686. Before the index, "pharynx"
  found nothing while four pharynx meshes sat in the organs layer.
- **Check a "not modelled" claim against the index before writing it.** A first
  draft of `NOT_MODELLED` asserted the larynx, eye, ear and thymus were all
  absent. Every one was wrong — they are modelled as *parts* (laryngeal
  cartilages, ocular coats, ossicles, thymic lobes), which is what `COMPOSITES`
  is for. Only breast, female reproductive organs and skin are genuinely
  missing. `search-probe.mjs` fails the build if a NOT_MODELLED term names a
  mesh that exists.
- **A unit label is derived, so check the derivation on the whole set.**
  It used to be assembled by pluralising the structure's own head phrase, and
  string surgery on Latin does not end well: "Axillary nodeses", "Orbital
  gyris", "Fasciculus propriuses", "Minimis of foot" (the abductor and the
  flexor of digiti minimi merged on their shared last word). The plural is now
  looked up in the fixed `KIND` table and nothing is pluralised by rule; a head
  noun that is not in the table falls back to `LAYER_KIND`, never to a guess,
  which is why "Abductor pollicis brevis" is a muscle and not a "Brevis".
  `search-probe.mjs` still scans every label for double plurals and for the
  "of the body" shrug, because the table is the kind of thing that grows.

### Study depth and course terms — `work/build-course-terms.mjs`

- **A numbered series the sources keep naming is named as a series.** The
  corpus names Vertebra T1, T2, T4, T5, T6 and T12 in six separate documents
  and never spells out T3 or T7-T11, which is not a distinction the course
  draws. `build-course-terms.mjs`'s fifth pass fills the rest in as evidence
  `series`. The bar -- three members named, and at least a quarter of the set
  -- admits exactly two series in the whole model (thoracic and lumbar
  vertebrae) and leaves the twelve ribs (two named) and the five cervical discs
  (one) alone. Do not lower it.
- **Study depth is READ from the sources, never guessed.** The tier used to come
  from a hand-written regex of "detail" words in `build-mesh-index.mjs`. That is
  the syllabus being invented in this repo, and it left 1,488 of 1,686 rows at
  course level. `work/build-course-terms.mjs` now asks the HSS2011 / ABCT2326
  teaching and assessment material; 619 rows are named by it and carry the file
  that names them. **The Martini eBook is excluded on purpose** — a 1,300-page
  reference names everything, so counting it marks everything examinable and
  destroys the distinction. So are student coursework and the question bank.
  Do not "improve" recall by adding them back.
- **Exact phrase matching alone loses the lung lobes.** The atlas says "Superior
  lobe of right lung"; the notes say "the right lung is divided into superior,
  middle and inferior lobes". Hence the proximity pass (all content words in one
  short window) and the Latin stem (`bronchus` must reach `bronchi`, or the main
  bronchi drop below course level). Proximity never runs over `Vocabulary.pdf`:
  it is a two-column term list, and flattening it to prose puts unrelated
  entries next to each other — that adjacency alone "found" the third rib.

### CSS — `outputs/app.css`

- An inline `style="display:grid"` outranks any stylesheet rule.
- A single-class rule declared later beats an equally-specific earlier one, so toggles
  need the two-class form (`.vsheet.hidden`, `#sessionView.hidden`).
- `dvh` declarations always follow their `vh` twin — never delete the `vh` line.
- `:hover` rules are wrapped in `@media(hover:hover){…}`; keep new ones that way.
- **Any rule that sets `display` on `.view` must carry `:not(.hidden)`.**
  `.navcontent.bleed>.view{display:flex}` is more specific than
  `.view.hidden{display:none}`, so it put all five views on screen at once.
- **Two sticky siblings with a hand-computed offset will drift.** `.studypool`
  was pinned at `top:calc(2 * (…))` assuming a two-row mode ladder; it is three
  rows, so on scroll the pool line landed on top of the L5 button. Wrap
  co-sticky elements in one sticky parent instead (`.selpanel-top`).
- The layout tiers are 700 (phone) / 1023 (iPad portrait) / 1500 / 1900 / 2400.
  `--content-max` steps with them; the viewer opts out via `.navcontent.bleed`.

#### Layout model

- **The viewer fills the window; every other view scrolls.** `setActiveNav`
  puts `.bleed` on `.navcontent` and `.compact` on `.navhead` for the viewer
  only. Under `.bleed` the page does not scroll: the stage is `flex:1` and the
  "⋯" sheet takes a bounded slice. The projection pane is the exception — it
  has controls and notes *below* the film, so it scrolls and `.xraywrap` keeps
  a real height.
- **The Explore panel is always inside the stage.** Below 1023px it docks to
  the bottom of the stage rather than going `position:static` under it; that
  static form is how it vanished on iPad portrait. Anything else pinned in the
  stage (layer rail, control pill) has to be sized around it — see the
  `calc(60% - 140px)` rail heights.

### The viewer is a manipulation surface — `outputs/studio.js`, `outputs/app.css`

- **A hidden element measures 0×0 — never write that into the camera.** `resize()`
  ran on `window.resize` alone, so "boot on Today, then open Viewer" never sized
  the canvas while the stage had a size and the model came up squeezed into a
  phone-shaped strip; the same on rotation and Split View. It now refuses a
  degenerate measurement and a `ResizeObserver` on `#stage` catches every cause.
- **The viewer is a manipulation surface, not a document.** `#viewerView *` sets
  `user-select:none` and `-webkit-touch-callout:none`; without it a long press
  anywhere in the stage started a text selection on iPadOS and threw up the
  Copy / Look Up callout.

### The split app — `outputs/study.js`, `outputs/studio.js`, `outputs/study/state.js`

- **Nothing may run at module scope in `study/*.js` or `studio/*.js`.** The parts import each
  other cyclically, so a part pulled in early as somebody's dependency evaluates
  before another part has reached a `let` it needs. `dialog-behaviour-applied.js`
  calling `renderToday()` at module scope gave
  `Cannot access 'currentTab' before initialization` — the same class of failure
  that killed the app on 2026-08-29. Side effects go in the part's exported
  `init()`, which `study.js` calls after every import has evaluated.
- **The five mutable UI bindings live in `study/state.js` as `ui.*`.** An
  imported binding is read-only, so `session`, `learnFilter`, `learnTopic`,
  `learnDrill` and `viewerTab` cannot be plain `let`s once anything else writes
  them. Add a new cross-part mutable there, not as a module-level `let`.
- **A rename that runs over source text will rewrite prose too.** Hoisting
  `session` to `ui.session` skipped comments but not string literals, and
  shipped "Start a ui.session below to begin." to the interface. Seven strings.
  `work/ui-strings.mjs` fingerprints every sentence the interface can show and
  is a committed baseline; run `node work/baseline.mjs --check` after any rename.
- **A browser check can be served a stale module.** `study.js?v=1` did not
  change when the file changed, so a reload returned the cached body and the
  behavioural check passed against code that was no longer on disk. Clear
  `caches`, unregister the service worker, or bump the query before trusting a
  before/after comparison in the browser.
- **Indentation does not tell you what is top level in `studio/*.js`.** That
  code writes its top level at column 0 AND at indent 2 — `els` and `state`, which
  every part uses, are at indent 2, alongside hundreds of nested locals at the
  same column. A brace counter fails too: the parts embed GLSL and HTML in
  multi-line template literals whose braces and column-0 lines defeat it. Ask V8
  instead — `node work/toplevel.mjs outputs/studio/<part>.js` appends
  `export { name }` per candidate and reads the link error, so the answer comes
  from the parser that will run the code. Use it before moving anything.
- **A column-0 line can be inside a template literal, or end by opening a block
  comment.** Both bit the phase-5 split: GLSL like `uniform float uMu;` was
  lifted out of a shader as if it were a statement, and a boot line ending in
  `/*` took the next section's comment opener with it and commented out what
  followed. Any tool that classifies lines in this file has to track backtick
  parity and dangling `/*`.

### Reading is not answering — `outputs/study/storage-versioned-keys.js`, `outputs/study/session-engine.js`

- **The app had no record that a lesson had been read.** Mastery only moves when
  a question is answered, and `itemAttempted` is derived from mastery, so
  opening an item, reading all of it and leaving — by Save & exit, by the close
  button, by killing the app — left the row saying "Not started", exactly as it
  had before it was opened. Nothing was failing to save; there was nothing to
  save. `markRead` / `itemRead` keep that in `store.items` as `readAt`.
- **Do not fold it into the mastery record.** `itemAttempted` decides what is
  due, what counts as unseen, and how the queue is ordered. A reading written
  in as an attempt would put lessons you have only looked at into the revision
  queue and drag the accuracy figures down with attempts nobody made. Read is
  read; answered is answered, and the dots on a row stay a mastery reading.
- **`saveContinue` had exactly one caller, and it was `setStep`.** So a resume
  point existed only if you *changed step* — open an item, read it, leave, and
  Today's Continue card still pointed at whatever you studied last week.
  `startSession` writes it too now.
- **A stored step can name a step this build no longer has.** Review was one.
  The Continue card looks the step up by name to print its label, so an
  unrecognised one used to throw; `getContinueTarget` falls back to `learn`.

### The progress log must reproduce the record, not resemble it — `outputs/study/progress-log.js`, `work/progress-log-check.mjs`

- **The log is only worth having if a replay is EXACT.** `rebuild()` folds
  `schedule()` over the events of one (item, dimension); if that lands anywhere
  other than the live record, a rebuild stops being a repair and becomes a
  corruption, and a merge that trusts the log quietly rewrites history. That is
  the whole contract, and `verify()` is the assertion of it.
- **`ms` arrives as a float, and the first attempt stores it unrounded.**
  `schedule()` sets `avgMs = outcome.ms` on the first rep and only rounds on
  later ones, so a `performance.now()` difference like `5524.800000011921` goes
  into the record verbatim. Rounding it on the way into the EVENT but not on
  the way into the record made the two disagree in the twelfth decimal place —
  invisible, permanent, and enough to fail `verify()` on the very first answer
  ever recorded. Normalise once in `recordAttempt`, then use that one value for
  both. Never round in only one of the two places.
- **One timestamp per answer, passed in, not three `Date.now()` calls.**
  `finishQuestion` schedules up to three dimensions and writes `items.lastSeen`;
  if each read the clock separately the replay would be milliseconds out on
  every record. The call site takes `at` once and hands it to every
  `recordAttempt` and to `lastSeen`.
- **`markRead` throttles, so `recordRead` must ask whether it wrote.** The
  one-minute floor means most calls do nothing; a log that appended on every
  call would rebuild a reads count the app never had. `markRead` returns a
  boolean for exactly this, and nothing else uses it — do not "simplify" it
  back to returning nothing.
- **Erasing progress has to erase the log.** For the same reason the reset
  banner gives about `osteology-studio-stats`: events left behind let a rebuild
  resurrect the history the reader just deleted, and the erase looks broken.
  `clearLog()` runs inside `resetProgress`, before the keys go.
- **A check that builds its own events cannot see a bug in the recorder.**
  Every property test in `progress-log-check.mjs` synthesises a log, so all of
  them passed while the float bug shipped; the browser's `verify()` caught it.
  The last section now drives the real `recordAttempt` with float `ms` and
  compares against the records it wrote. Reintroduce the bug and that section
  fails — it was confirmed by doing so.

### A name classifier is fed a different name than the GLB holds — `outputs/systems.js`, `work/system-check.mjs`

The skeleton split into Axial and Appendicular shipped with an axial rule
written as `rib`. `work/system-check.mjs` read the GLB's own node names,
found `Eighth rib.l`, flattened it to `eighth rib l`, matched, and passed.

The browser does not see that name. `prepareFullReference` reads each mesh's
own name, and for a paired structure the side letter is glued straight onto the
last word: **`Eighth_ribl`**, which flattens to `eighth ribl`, where a trailing
`` cannot match. All 24 side-suffixed ribs classified into nothing and
followed the layer instead of their chip — found by counting visible meshes in
a live page, not by any probe.

- **systems.js has said "no trailing word boundary" at the top of the file
  since it was written.** The rule was right and unenforced, which is the same
  as absent. `system-check.mjs` now classifies every paired name a second time
  in its glued form and fails if the two disagree.
- **Leading boundaries are fine and worth keeping** — `radius` stops
  `radius` matching inside a longer word without depending on what follows it.
- **A checker reading a different string than the app is not a checker.** This
  is the third time in this repo a classifier passed a probe and failed on
  screen; the other two are the toe phalanges and the carpals, both recorded
  above.

### The viewer is a workspace, and a lesson must not inherit it — `outputs/studio/live-physiology.js`, `outputs/study/lesson-visuals.js`

There is one WebGL context. The lesson card does not get a copy of the stage, it
gets THE stage, moved into it — so every setting the Viewer page was left in is
still in force when a lesson mounts. `focusStructures` handled the layers from
the start and nothing else, and each of the five it missed breaks the lesson
quietly rather than loudly:

- **the cut.** `renderer.clippingPlanes` is global state on the renderer. A
  coronal cut left armed in the Viewer sliced the lesson's carpal bones in half.
- **hidden meshes.** `focusStructures` ended by calling `enforceHidden()`, so a
  bone hidden by hand stayed hidden in the lesson teaching that bone. Worst of
  the five: the card renders successfully and shows nothing.
- **the region filter**, for a spec with `isolate:false`.
- **isolation**, same expression, same result.
- **an armed tool.** `bindCanvas` returns early when `state.tool` is set, so a
  tap placed ink or a pin instead of naming the structure — on a card whose own
  caption says "tap to name".

They are **suspended, not cleared**: the Viewer is a workspace and the state a
reader set up in it is theirs. `suspendViewerState` saves and neutralises,
`resumeViewerState` puts it back, and `clearStudyFocus` calls resume even when
there was no focus to clear — a lesson whose names did not resolve still
suspended on the way in. `focusStructures` calls `releaseFocusMeshes` rather
than `clearStudyFocus` when replacing one focus with another, or it would hand
the Viewer's state back halfway through mounting.

### Where you were is not the same as which tab you were on — `outputs/study/navigation-five-destinations.js`

`closeSessionOverlay` restored the destination by calling `goTo()`, and `goTo`
clears `ui.learnDrill` — correctly, because that is what pressing Learn in the
tab bar should do. The result was that leaving a lesson opened from inside a
topic put you back at the grid of topics, one level above where you were, with
the item list you had picked from closed.

The drill-down is part of where you were. `openSessionOverlay` saves
`learnDrill`, `learnTopic` and `learnFilter` with the tab; `closeSessionOverlay`
restores them and then renders the destination **directly**, bypassing `goTo`'s
reset. Returning to the same view id also means `showView` does not scroll to
top, so the list comes back where it was.

### Gestures that fire without being asked for — `outputs/studio/depth-picking.js`

Two lived on the stage on top of the single tap. A second tap within 320ms flew
the camera to the selection; a second tap within fourteen PIXELS, with no time
limit at all, walked one step deeper into the pick stack and peeled the surface
structure away to get there. On a phone a repeat tap lands inside fourteen
pixels most of the time, so reading a label twice was enough to trigger either
one — the model zoomed, or a bone vanished, in response to what the reader
thought was the tap they had just made.

Both are gone, and neither capability went with them: focus is the Focus button,
and depth is the stack list the tap publishes, which names everything under the
pointer and selects or hides any of it **by name**. When a gesture and a control
do the same job, the control is the one that can be found, undone and explained.

### Missing imports in a split part — `work/binding-check.mjs`

- **A missing import loads clean and fails only when that code path runs.**
  `study/reading-help.js` referenced `plateFor` without importing it. Every
  module loaded, the corpus was intact, all ten baselines matched, and the app
  looked normal — until you opened a lesson, where the render threw a
  ReferenceError, left the DOM half-built, and never reached the line that wires
  the close button. The lesson was blank AND you could not get out of it.
  `node work/binding-check.mjs` after any edit to `study/` or `studio/`.
- **`load-check.mjs` cannot see this.** It evaluates module scope; the name is
  only reached inside a function. And a ReferenceError is what a missing browser
  global looks like under stubs, so it cannot fail on the message either.
- **The cause was an identifier scan that stripped comments and strings.**
  `/*` sequences inside string literals shift the non-greedy comment pairing, so
  one bad pair silently ate real code and the names in it were never imported.
  Scan raw text: over-importing a name that exists is inert, missing one is not.

### The source drive — `work/build-source-catalogue.mjs`, `work/source-check.mjs`

- **Google Drive materialises a shortcut target only once something opens it.**
  Enumerating `G:\.shortcut-targets-by-id` on a cold drive listed 3 folders; the
  real number is 28. Reading the `.lnk` files first is what makes the rest
  appear, so the generator resolves shortcuts *before* it enumerates, and
  re-enumerates after every round. Without the re-enumeration the build
  converges only across repeated runs — the first one quietly reports a smaller
  corpus than the second, and both look successful.
- **Shortcuts are nested.** One shared folder is nothing but shortcuts to twelve
  others. Walking only the shortcuts in this repo missed 3,642 documents (21 GB),
  including `21 Torti Source` and `extra source` — two roots `SOURCE_ROOTS`
  already cites. Follow every `.lnk` met during the walk, to a fixpoint, and keep
  a visited-directory set: the roots overlap and one is inside another.
- **One of those shortcuts points at `G:\` itself.** Following it swept in 476
  files from outside the course folders, personal My Drive content included. A
  source lives at `G:/.shortcut-targets-by-id/<id>/<folder>/…` and nowhere else;
  the generator drops anything else and prints what it dropped.
- **A `SOURCE_FILES` entry is not always one filename.** It can name a folder
  cited as a set (`Exam Past paper by year 2003-2013/ (11 papers)`), photographs
  that no document index can see, or an external URL fetched from edb.gov.hk.
  The first version of `source-check.mjs` reported six failures and every one was
  the check being wrong. Ask the right question per shape, and report
  "not checkable here" separately from "missing" — they mean opposite things.

### Source text — `work/build-source-text.mjs`, `work/lib/source-resolve.mjs`

- **A `SOURCE_FILES` entry is not identified by its filename.** Eighteen distinct
  documents on the drive are called `Lecture notes.pptx` or `Lecture notes.pdf`,
  one per lecture, and the registry separates them by `folder` alone. Resolving
  on the name gave every one of `phys.1`…`phys.10` the text of the same anatomy
  lecture — not an empty result, a confidently WRONG one that read as properly
  sourced. `lib/source-resolve.mjs` exists for this; it returns `ambiguous` when
  the folder still cannot separate the candidates, so a caller can refuse rather
  than take the first. The quoted-citation check is what caught it.
- **`pdftotext` on Windows cannot open a non-ASCII path.** Most of these shared
  folders are named things like `🏅🥇依吖温金牌梳士🥇🏅/Sem 1我哋又重新上路🌟`. It
  fails with a bare "Command failed", which is indistinguishable from a corrupt
  PDF — nine of ten "unreadable" documents extracted first try once copied to an
  ASCII temp path. Copy only when the path needs it; some of these are 200 MB.
- **A path at or past 260 characters fails the same way, and hides better.**
  Windows MAX_PATH still applies to `pdftotext`, and these folders nest deeply:
  the Green Group copy of `New development in arc radiation therapy.pdf` sits at
  exactly 260. The file is fine and extracts in a second once copied; the PATH
  is what cannot be passed. `unread-manifest.mjs` recorded the failure as "no
  extractable text (scanned images?)" and filed three readable journal articles
  under NEEDS-OCR - the one pile where the work is expensive, slow and manual,
  so nobody goes back to re-check the diagnosis. A wrong verdict that sends work
  to the costly pile is worse than one that sends it to the cheap pile, because
  only the cheap pile gets revisited. `needsCopy()` in `lib/doc-text.mjs` now
  covers both causes; the threshold is 220, leaving room for the temp dir.
- **An em dash inside a quoted citation is usually the citation's own
  connector.** `Slide "Fibrous joints — Sutures"` points at a slide headed
  "Fibrous joints" with "Sutures" below it — two lines apart in the extracted
  text, and no such literal string anywhere. Match the parts, not the whole.
- **Never commit the set textbook's extracted text.** The eBook and the publisher
  question bank were 89% of the committed file, and this repository is public;
  extracting them into it republishes two commercial works. They live in the
  gitignored cache, where they are just as searchable here. `PUBLISHER` in
  `build-source-text.mjs` holds them back and records why, so their absence does
  not later read as a missing source.
- **The cache pass is Drive-bound, not CPU-bound.** One process managed ~3
  documents a minute — forty hours for 8,114. Six `--shard i/6` processes do
  ~75 a minute. Each shard writes its own `index-<i>.json`; a reader unions
  every `index*.json` it finds.

### The projection's film — `outputs/studio/live-physiology.js`, `outputs/studio/region-boxes-how.js`

- **The offscreen target must be sized in DEVICE pixels.** `renderer.getSize()`
  returns CSS pixels; the canvas the post pass blits onto is `pixelRatio` times
  that (capped at 1.7 in `boot3D`). Sizing the target from `getSize` rendered
  the whole projection at 1/pixelRatio and let the GPU upscale it, so the one
  view meant to look like a radiograph was the softest thing on screen. Use
  `getDrawingBufferSize`, and multiply by `getPixelRatio()` in `resize()` — the
  resize path will silently undo the fix otherwise.
- **A screenshot of the Browser pane is not a measurement.** Chasing "the
  projection is off-centre" cost four wrong diagnoses: the pane crops the page
  (it showed the left 66% of a 1342px viewport at 0.89 scale), so a correctly
  centred image sat visibly right of centre. Calibrate against two known
  element rects before believing pixel positions, or read the canvas directly —
  centre of mass of the composited buffer settled it in one call.
- **Re-rendering to measure measures the wrong thing.** `renderer.render(scene,
  camera)` draws the raw scene, NOT the x-ray post pass, so sampling after it
  reports what an ordinary render would look like. Capture inside a
  `requestAnimationFrame` after the app's own loop has drawn instead.
- **A browser check can pass on a cached module.** The dev page is service-worker
  controlled, so an edited module kept loading in its old form and the fix
  appeared not to work. `fetch(url, {cache:'no-store'})` tells you what the
  SERVER has; unregister the worker and clear caches before believing a
  before/after.

### Tools: cut, ink, pins — `outputs/studio/tools-and-capture.js`, `outputs/study/viewer-tools.js`

- **Two pointer-capture owners for one pointer breaks OrbitControls.** The pen
  captured the pointer on `#stage` while OrbitControls had already captured it
  on the canvas inside it, so the library's own `pointerup` never fired, its
  `pointers` array kept a stale id, and the NEXT gesture threw
  `Cannot read properties of undefined (reading 'x')` from
  `pointerPositions[staleId]` — inside three.js, on a later interaction, with
  nothing pointing back at this file. The pen sets `controls.enabled = false`
  instead and takes the surface outright; events still reach the stage by
  bubbling. Never call `setPointerCapture` on an ancestor of the canvas.
- **The clipping plane must be re-derived from the root's world matrix every
  frame.** The turntable yaws the pivots continuously, so a plane computed once
  in world space when you press "Axial" swings away from the body as it turns.
  `state.cut.local` is stored in the body frame and `syncCut()` maps it out on
  each frame, from `animate()` via `syncTools()`.
- **The annotation group is a scene sibling, not a child of `fullModel`.** It
  shares that root's frame and copies its world matrix each frame, because
  `applyVisibility()` sets `fullModel.visible` from the skeleton chip — parented,
  a pen stroke on the liver would vanish when somebody turned the bones off.
- **`LineBasicMaterial.linewidth` is ignored by every desktop WebGL driver.**
  A finished pen stroke is a `TubeGeometry` for that reason; the `Line` is only
  the live preview, because it is free to rebuild on every pointermove.
- **`renderer.clippingPlanes` is global and clips sprites too.** Pinned labels
  are placed clear of the silhouette, so they normally sit on the kept side, but
  a cut CAN eat a tag — that is the plane doing its job, not a bug to route
  around with per-material planes.
- **Which way each cut plane faces was measured, not assumed** — right clavicle
  x −0.58 (so +x is the patient's LEFT), sternum z +0.55 against T8 z −0.53 (+z
  ANTERIOR), frontal bone y 6.5 against femur y −0.4 (+y SUPERIOR). A clipping
  plane keeps the half its normal points into; get one backwards and the app
  teaches a student the wrong side of their own section. Re-measure before
  changing a normal.
- **The raycaster does not know about the clipping plane**, so with a cut open
  the pen can land on a surface the cut has removed. The card says draw first,
  section second.

### Named cut levels — `outputs/studio/tools-and-capture.js`, `outputs/landmarks.js`

- **A level is a source claim, and `source-check.mjs` cannot see it.** That
  check walks `STUDY_ITEMS` only, so a citation written into viewer code is
  outside every existing gate: the quote could drift, or name a page that never
  said it, and the whole suite would stay green. `work/cut-level-check.mjs` is
  the gate for these, and it uses the *same* `flat()` comparison as
  `source-check.mjs` on purpose — a level that passes there would still pass if
  it were later moved into the corpus.
- **`thorax.sternum` matches all three pieces of the sternum.** Its patterns
  are `['sternum', '^xiphoid process']`, so it catches the manubrium and the
  body and the xiphoid together. The manubriosternal and xiphisternal junctions
  need them apart, which is what `thorax.sternumBody` is for. Reaching for
  `thorax.sternum` to place a level puts the plane through the middle of the
  whole bone.
- **A junction is the midpoint of the gap, not either edge.** The manubrium
  ends at y 1.350 and the body of the sternum begins at 1.359 — they overlap by
  a few millimetres rather than meeting at a point. Taking `minY` of the upper
  bone or `maxY` of the lower biases the plane onto one of them by that much.
- **The sternal angle is measured from bone, and CHECKED against the vertebrae.**
  It is placed at the manubriosternal junction, which is its definition and
  what `1.3 Regional Anatomy of the Thorax.pdf` p5 says it is. That it then
  lands at y 1.354, inside the T4–T5 span of 1.321–1.397, is the independent
  confirmation that the measurement is right — the lecture's "vertebral level
  of T4/T5" and this model's geometry agreeing without either being derived
  from the other. `cut-level-check.mjs` asserts it. Do not "simplify" the level
  to read straight off a vertebra: that throws away the only cross-check there is.
- **Levels are placed through `t`, not through a second plane API.** `cutPoint()`
  is the one place that maps a 0–1 position onto the body; `levelT()` inverts
  exactly that map, so the slider, the flip and the cut outline all keep working
  and the two cannot drift. Add a level by giving it a measurement, never by
  building its plane directly.
- **`state.cut` is rebuilt from scratch by every `setCut`,** so `state.cut.level`
  is dropped the moment the slider moves — which is correct, the label must not
  outlive the position it described. It also means **flip has to go back through
  `setCutLevel`**, or flipping silently un-names a level that has not moved.
- **What is NOT offered, and why.** The subcostal plane is measured in
  `cavity-build.js` (it is one of the nine-region grid's lines) but no cited
  source calls it that, so it is not a level. The iliac crest / L4 level is
  named only in a surface-anatomy handout that is not in `SOURCE_FILES`, so its
  quote cannot be checked and the claim is not made. Coronal has no levels at
  all: it would be named against the mid-axillary line, which no cited source
  names. Adding any of these means adding the source first.

### The projection and the tools — `outputs/studio/live-physiology.js`

- **`renderer.clippingPlanes` does nothing to the x-ray pass — that is the bug,
  not the fix.** `xrayDepthMaterial` builds a raw `ShaderMaterial`, and three.js
  only clips a material that opts into clipping, so a section cut was *silently
  ignored* in the projection rather than corrupting it. Measured: with a cut set
  and no suspension, a chest PA came back at mean density 26.210 against 26.207
  with no cut — inside the film grain. The user-facing defect was a control that
  quietly did nothing, so the cut is now suspended explicitly and the card says
  so. Do not "fix" this by giving the x-ray material clipping support: the depth
  integral is front faces minus back faces and assumes closed shells, so an open
  cut face WOULD then run the integral away. Emptying the list is what stops that
  change from silently corrupting the film later.
- **`state.toolGroup` leaking into the film was the real one, and it is large.**
  `renderXray` renders the WHOLE scene, and `enterXray` swaps materials only on
  `state.fullMeshes` and the `extraModels`, so annotation materials survive into
  an additive beam and composite as light. Measured before the fix: five pinned
  labels lifted a chest PA from mean density 19.15 to 25.86, a third brighter.
  The group is a scene sibling rather than a child of the body root, so hiding
  the model does not hide it — it has to be turned off by name. It goes off with
  `conceptGroup` and `pickGroup`, for the reason those already were: a radiograph
  has nothing painted on it.
- **Measure this pair rather than reasoning about it.** Both of the above were
  written down backwards on the first pass, from correct general three.js
  knowledge that did not apply to these particular materials. `snapshot()`
  renders and reads in one task, so mean pixel value over a fixed region is a
  cheap and decisive test — but take three readings under identical conditions
  first, because the quantum-mottle term moves the mean by about 0.02 on its
  own and a smaller "difference" than that is noise.
- **Anything else `enterXray` changes must be saved into `state.xray` and put
  back in `exitXray`.** Both of the above are stored there (`clip`, `tools`)
  rather than recomputed on the way out, because the way out has no way to know
  what the state was on the way in.

### Body systems, not files — `outputs/systems.js`, `outputs/study/subject.js`, `outputs/studio/live-physiology.js`

- **`state.layers` is keyed by CHIP, not by GLB.** Two of the seven files draw
  several chips each, so `state.layers[glbKey]` is `undefined` everywhere and
  reads as off. Every place that asks whether a layer is showing goes through
  `layerOn(glbKey)` (any of its systems on) or `meshOn(mesh)` (one of the
  mesh's own systems on), both exported from `live-physiology.js`. There were
  eleven such sites; a twelfth would fail silently by hiding a whole layer.
- **`focusStructures`, `setExtraVisible` and the search still speak in GLB
  layers**, because a lesson or a search result names a file, not a system.
  They turn on every chip that file draws. Do not "fix" that by classifying the
  result's mesh name — that is a second classifier, and two classifiers drift.
- **The colour key must count what is VISIBLE.** `flowCounts(layer)` is a
  property of the FILE, measured once as it loaded. Turning Venous off left the
  key printing the vein swatch and its count beside a screen with no veins in
  it. `visibleFlowCounts()` walks the meshes instead. It reads `o.visible`, so
  it counts a mesh under a hidden ROOT as visible — fine for the key, wrong if
  you reuse it for anything that cares.
- **Three meshes in the circulatory GLB have no readable name** — `????????`,
  `?x.l`, `?x.r` — and they are not empty: 1173 and 213 vertices each. They are
  real structures whose names were destroyed in some encoding step upstream.
  They cannot be classified and must not be guessed at, so they follow their
  LAYER: on whenever any vessel chip is on. `work/system-check.mjs` prints them
  so the count is in the baseline; a fourth appearing silently would be a
  structure on screen that no chip can turn off. `classify()` calls them
  arteries by fallback, so the colour key lists three arteries that are not.
- **Adding a REGIONS entry edits the corpus.** `derived-items.js` builds an
  "In which region does the X sit?" MCQ whose options are `REGIONS.map(label)`.
  Appending is safe (`findIndex` still lands right); inserting would silently
  re-key 127 items' answers. `bones:false` keeps a region out of that question
  entirely — the abdomen needs it, or "Abdomen & pelvis" sits beside "Pelvis"
  as a second defensible answer for every bone of the pelvic ring and is
  marked wrong.

### The abdomen has no bones of its own — `outputs/studio/region-boxes-how.js`

- **Every other region is a set of bones; this one is a space.** Its frame is
  borrowed — lower ribs and costal margin above, lumbar column and sacrum
  behind, hip bones below — so it exists only as a SECONDARY membership in
  `REGION_ALSO`, and the primary-region distribution reports it as empty. That
  is why `region-probe.mjs` checks it separately by name and by exact count
  (28); the distribution table alone would have said nothing at all.
- **Its floor and roof come from `measureGrid`, not from the bones.** A box
  round the borrowed frame runs from the seventh rib to the ischial tuberosity
  — most of the chest and all of the perineum. `regionBoxes` clips y to
  `G.topY`/`G.bottomY`, the xiphoid tip and the top of the pubic symphysis, so
  the filter selects exactly the body the nine-region grid is painted on. Take
  those two numbers from anywhere else and the overlay and the filter stop
  agreeing. `gridMetrics()` returns null until every measurement it needs is
  in; the bone box then stands unclipped — too tall, but never empty.
- **Measured, filtering to Abdomen & pelvis with the organ layer on**: 22 of
  the 23 gut meshes are in (the oesophagus is the one out, correctly), 2 of 35
  airway (the lung bases, below the xiphoid), 0 of the head structures.

### The back is a half-space — `outputs/studio/region-boxes-how.js`, `outputs/anatomy-data.js`

Every other region filter is a box around that region's own bones. The back is
"everything behind the vertebral column", and three things follow that are easy
to get wrong.

- **A flat depth will not do.** Measured on this model, the front of the column
  sweeps `z −0.067 .. 0.019` between the cervical lordosis and the sacrum —
  **34.4% of the skeleton's whole front-to-back depth**. A single plane drawn
  at the lumbar depth cuts the neck in half; one drawn at the cervical depth
  puts the kidneys in the back. `columnFront` therefore measures band by band,
  one band per vertebra, and `work/region-probe.mjs` fails if that travel ever
  drops below 8% — at which point the honest move is to DELETE the function,
  not to keep it out of habit.
- **The ribs are deliberately not back bones.** Their posterior thirds are, but
  a rib is one mesh and most of it is not, so including them would draw a whole
  ribcage under a chip called Back *and* push the measured box forward to the
  sternum. Column + scapulae only: 28 meshes, asserted.
- **Six deep neck muscles come along, and that is not a bug to fix in code.**
  The prevertebral three, both posterior scalenes and the posterior
  crico-arytenoid genuinely lie behind the front of the cervical column, so the
  rule admits them while a textbook files them under the neck. A vertex-fraction
  test ("is most of this mesh behind the line") was tried instead of the
  centroid and classified **the same six the same way** for twice the work — the
  centroid is not the problem. Naming muscles in the app to force the issue
  would be an unsourced claim about the course; the exception list lives in
  `region-probe.mjs` instead, asserted, so a change to the profile is reported
  rather than found on screen.

### Phone and tablet layout — `outputs/app.css`, `outputs/study/small-ui-helpers.js`

- **Do not MEASURE the iOS viewport. Pin to it.** Three attempts at the height
  of `.shell` failed the same way: `height:100%`, then `100dvh`, then a `--vh`
  custom property written from `window.innerHeight` on load, resize,
  orientationchange and pageshow. Every one is a number obtained from the web
  view, and on an installed iOS web app every one came back short. Measured off
  the phone screenshot at 3x, after the `--vh` fix had shipped: 402x874pt
  screen, tab bar's last pixel at 813pt, 61pt of `--bg` below it — `--bg` being
  the body background propagated to the canvas, painting an area the page had
  never laid out into. The bar's own height was right (81pt: 44 content + 2 +
  34 of `env(safe-area-inset-bottom)`, which also proves the web view *does*
  reach the bottom of the screen and the band is inside the page). The fix is
  to stop supplying a number: `.shell` is `position:fixed` with `top` and
  `bottom` both pinned to 0, which the browser resolves against the initial
  containing block and re-resolves when that changes. `#sessionView` had been
  `position:fixed; inset:0` from the start and never showed the band — that was
  the clue. Verified at 402x874 on all six destinations: shell bottom 874,
  bar bottom 874, gap 0.
- **A `min` under a safe-area inset does nothing where it matters.** The tab
  bar's `padding-bottom:max(22px, env(safe-area-inset-bottom))` was 34px on a
  phone with a home indicator (the inset already covers it) and 22px of dead
  bar on one without. The floor is 8px now.
- **Two width caps, and the obvious one is not the limiter.** On a 1024pt iPad
  the lesson measured 820px — set by `.sessioncol`, not by `.lesson`'s own
  820px. Raising `.lesson` alone changes nothing. Both are raised, *after* the
  `min-width:1024px` block: equal specificity means source order decides, and
  wrapping a rule in a media query does not change that. Measured: column
  820 → 953, lesson 774 → 907. iPad **portrait** gains nothing — the pane's
  padding and scrollbar already bring it to 709px, under the 720px cap.
- **A re-render is not a navigation.** Every render function ends by calling
  `showView(<its own id>)` and every control ends by calling its render
  function, so `showView`'s unconditional scroll-to-top threw the reader back
  to the top of the Course page on every tap. It now scrolls only when the
  destination changes; the two learn drill-downs, which are the same view with
  new content, ask by hand with `scrollViewTop()`.

### The tucking header must not change the scroller's geometry — `outputs/app.css`, `outputs/study/small-ui-helpers.js`

The first version collapsed the header with a negative margin. It reclaims the
space and it looks wrong: the scroller's top edge moves up by the header's
height at the same instant, so every line of text jumps 73px under the reader's
thumb, and at the end of a page the scroller's maximum scrollTop shrinks and the
content lurches a second time. **Reclaiming the space and holding the reading
position still are the same problem**, and only one shape solves both — take the
header out of flow, reserve its height as padding, and slide the overlay with a
transform. Measured across a tuck and an untuck afterwards: pane top, pane
height and maxScroll all constant, in both the main view and the session
overlay.

**Which box carries that padding is the whole of the second half of it.** The
first version put it on the *container*, outside the scroller. Geometry stayed
constant, as intended — and the reserved band stayed too, so tucking the header
swapped it for an empty black strip that scrolled with nothing in it. Reading
past the tuck showed a hole where the header had been. The padding belongs on
the **scroller itself** (`.navmain > .navcontent`, `#sessionView >
.navcontent`): the first line still starts below the header, the text then
travels up *under* it the way it does in a native app, and the moment the header
lifts there is already page behind it. The scroller's own box is full height and
never changes, so the tuck still moves nothing.

Three things that fall out of it:

- **Write that rule after every other `.navcontent` padding rule.** Four
  shorthands set `padding` on it later in the file — the mobile one, the
  viewer's `.bleed`, the session overlay's, and the iPad-landscape override —
  and any of them silently resets the top value. The first attempt appeared to
  do nothing for exactly that reason.
- **`--headh` is load-bearing layout, not decoration.** The scroller's top
  padding is that variable. Stale by 39px on the session overlay meant the
  header covering the first two lines of the lesson; stale by 35px on the main
  view — first paint measures the title in the fallback face, at 108px against
  the 73px it settles to — meant a dead band above every page. `document.fonts.ready`
  triggers a re-measure, alongside the ResizeObserver and the MutationObserver.
- **`overscroll-behavior: contain` is not enough** on the reading panes. It
  stops the chain but keeps the scroller's own rubber band, and at the end of a
  list that bounce reads as the page coming loose. `overscroll-behavior-y: none`
  on `.navcontent` and `#sessionView .navcontent`, written as a longhand AFTER
  the existing shorthand — the shorthand would reset the x axis with it, and the
  first attempt at this was placed *above* the shorthand and silently lost.

### Anything driven by the frame loop dies in a tab that stops painting — `outputs/study/small-ui-helpers.js`

This bit twice, in two different APIs, and the second one was worse.

**`requestAnimationFrame`.** The standard shape for a scroll handler is a
`queued` flag cleared inside a rAF callback. Measured in a backgrounded tab:
`document.hidden` true, zero frames in 800 ms — the frame that would clear the
flag never arrives and the handler is dead for the rest of the page's life,
leaving the header stuck wherever it was. `tuckOnRead` does its work
synchronously; what was being throttled is a subtraction and a class toggle.

**`ResizeObserver`.** Its callbacks are delivered as part of the rendering
steps, so they do not arrive either. The session overlay's header went from
hidden to 113px tall and RO said nothing, leaving `--headh` unset and the
header lying over the first 39px of the lesson — load-bearing layout silently
wrong, rather than an animation stuck. `publishHeadHeight` keeps RO for the
ordinary cases but adds a **MutationObserver** on the container's class, which
runs on the microtask checkpoint and fires the moment the overlay loses
`hidden`, plus an explicit call from `showView`.

The rule to take from both: if a value is needed for CORRECTNESS rather than
for animation, do not let a frame-driven API be the only thing that supplies
it.

Related: this is also why a browser check can *look* like it is failing when it
is not. In a hidden pane, style recalculation and transitions do not run, so
`getComputedStyle` returns the pre-transition value and screenshots come back
garbled. The class toggling was correct all along; the confirmation had to come
from a real, visible Chrome window.

### The dev server had no cache headers — `work/dev-server.mjs`

It sent none at all, so the browser cached by heuristic and modules imported
without a `?v=` query kept loading in their old form after an edit. A fix then
appears not to work — or, worse, a broken one appears to. `Cache-Control:
no-store` now. `docs/TRAPS.md` already recorded this trap one layer up, against
the service worker; it cost a wrong diagnosis to find it again underneath.

### The UI-string baseline reads comments too — `work/ui-strings.mjs`

It fingerprints quoted prose out of the HTML and the JS **including comments**.
A deleted sentence quoted in a comment that explains the deletion lives on in
the baseline as though it were still on screen, and a comment that quotes a
phrase adds a string the interface cannot show. Both happened here. Write the
comment without quoting the string; the baseline is then empty of drift, which
is what makes a real change legible when one comes.

### The text-size control — `outputs/app.css`, `outputs/study/text-size.js`, `work/text-size-check.mjs`

The scaling used to be opt-in: a list of selectors at the end of app.css got a
`* var(--ts)`, everything else did not. Counted when the reader reported the
control did nothing: **27 selectors scaled and 198 did not.** An opt-in list
whose default is "wrong" rots by simply being left alone, and the failure is
invisible until someone tries to read the app.

It is opt-out now — every content font size carries its own multiplier, and
what stays fixed is stated in `work/text-size-check.mjs`, which fails the build
on a new unscaled size. Four things that only showed up by measuring:

- **Inline `style="font-size:…"` in the templates is invisible to CSS.** The
  Learn page's topic titles sat at 17px through all three settings while every
  label around them grew — the largest text on that screen. The checker scans
  the templates too.
- **The checker's own parser was the next blind spot.** A line-anchored
  `/^selector{body}$/` read 116 rules in a stylesheet that packs several per
  line, and it stopped at the text-size block, leaving the last 108 lines
  unchecked — a deliberately broken rule appended to the file was not reported.
  It walks braces over the whole file now, blanks comments first (it was
  reading prose inside them as selectors), and counts its own findings against
  a textual count so going blind again is itself a failure.
- **`font:` shorthand needs a separate `font-size` after it**, not a `calc()`
  inside it. Testing for a raw px first then flags all 39 of those as broken —
  what settles it is whether a scaled `font-size` follows.
- **The header must not scale.** `--headh` makes its height the layout, so
  every pixel it gains comes off the lesson. `.small` is used inside it, and at
  Largest one wrapping line of metadata took the session header from 113px to
  **208px — a quarter of a phone screen**. `.navhead .small` is pinned.

One more, for the `ui-strings` baseline: write inline calc without spaces
(`calc(17px*var(--ts))`). With them, the style attribute reads as a phrase and
six style strings land in the prose fingerprint for good.
