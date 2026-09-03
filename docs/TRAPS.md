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
