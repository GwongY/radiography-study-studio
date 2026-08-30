# Search + viewer enhancements — design

**Date:** 2026-08-30
**Status:** approved (brainstorm answers: corpus C, occlusion C, lesson entry A, overlay fidelity A; staged single spec)

## Goal

1. The global search is reachable from **every** screen, including inside a lesson.
2. Searching a body part opens the 3D viewer **and** selects / frames that part.
3. The viewer can **hide** an individual part to uncover what sits behind it, with a
   tray of what is currently hidden and a one-tap restore.
4. Searching a part that is covered **auto-hides the occluders**, and tells the user
   exactly what was hidden (with Show / Keep).
5. The viewer can show **body cavities, regions, quadrants and planes** as procedural
   overlays, on request from a viewer control and from search. Planes are captioned
   with what each one separates.

## Non-goals

- No new GLB assets. Cavities / regions / quadrants / planes are drawn procedurally.
- No raw search over all ~2,750 atlas mesh names (corpus decision C).
- No change to the study/scheduling logic, X-ray simulator, or physiology engine.

## Architecture

### New data module: `outputs/bodymap.js`

Added to the service-worker shell list; `CACHE_VERSION` bumps `v35 → v36`.

```js
export const SEARCH_EXTRAS = [
  // high-yield structures beyond ANATOMY_DATABASE, resolvable to a loaded system layer
  { id:'x-supraspinatus', name:'Supraspinatus', aliases:['rotator cuff'],
    system:'muscle', mesh:'Supraspinatus', blurb:'Rotator cuff — initiates abduction.' },
  // heart chambers, great vessels, major muscles, cranial nerves, lung lobes, kidney …
];

export const BODY_CONCEPTS = [
  { id:'cav-thoracic', kind:'cavity', name:'Thoracic cavity',
    aliases:['chest cavity'], blurb:'…',
    box:{ x:[-0.30,0.30], y:[0.98,1.38], z:[-0.16,0.14] }, color:0x3aa4c8 },
  { id:'reg-epigastric', kind:'region', name:'Epigastric region', grid:{col:1,row:0}, … },
  { id:'quad-ruq', kind:'quadrant', name:'Right upper quadrant (RUQ)', quad:{x:0,y:0}, … },
  { id:'plane-sagittal', kind:'plane', name:'Sagittal plane',
    aliases:['median plane','midsagittal'], axis:'x',
    separates:'left from right', blurb:'…' },
  // coronal/frontal → anterior (front) from posterior (back)
  // transverse/horizontal/axial → superior (upper) from inferior (lower)
  // oblique → any angled cut
];
```

Geometry is expressed in **normalised body-frame units** (the same 0–1.7 y / ±0.33 x
space every GLB layer already shares — see `loadExtraModel`). At runtime the viewer
maps those to world space with `state.bodyTransform` (`scalar`, `offset`), so overlays
register against the skeleton exactly like the other layers do.

The 9 regions and 4 quadrants are a labelled grid over the trunk box; individual
regions/quadrants carry a `grid` / `quad` cell so search can open just that one
highlighted within the full set.

### Search (`radiography-study-studio.html`, `searchHits`)

Extend `searchHits(q)` after the existing `searchAnatomy` block:

- **SEARCH_EXTRAS** matches → `kind:'Structure'`, note `"<system> · opens in Viewer"`,
  `go`: close sheet → `goTo('viewer')` → `__osteo.revealStructure({system, mesh})`.
- **BODY_CONCEPTS** matches → `kind:'Cavity'|'Region'|'Quadrant'|'Plane'`,
  note = `blurb` (planes: `"separates <separates>"`), `go`: close sheet →
  `goTo('viewer')` → `__osteo.showConcept(id)`.

Existing curated `Structure` hits switch from bare `select(id)` to
`revealStructure({ id })` so they get the same auto-uncover behaviour.

### Search reachable during a lesson (`sessionView`)

- Add a `⌕` icon button (`id="rssSessionSearch"`) to the `sessionView` `.navhead`,
  left of the ✕, styled like `rssSearchBtn`.
- Wire `rssSessionSearch.onclick = openSearchSheet`.
- `openSearchSheet` / `closeSearchSheet` also toggle `inert` on `#sessionView`
  (currently only `.app-shell`), so focus can't leak behind the scrim during a lesson.
  The scrim is already `z-index:30` over the session's `z-index:10`, and the
  Cmd/Ctrl-K handler is already on `window`, so nothing else is needed.

### Viewer engine (`window.__osteo`)

New state: `state.hidden = new Set()` (manual) and `state.autoHidden = new Set()`
(hidden by an auto-uncover, tracked separately so the UI can say "these were hidden
for you" and restore them as a group).

New helper `enforceHidden()` sets `.visible = false` for every mesh in either set;
it is called at the tail of `applyVisibility()`, `applyLayers()`, `focusStructures()`
and `clearStudyFocus()` so no existing visibility pass silently un-hides a part.

New `__osteo` methods:

| method | behaviour |
|---|---|
| `hide(mesh?)` | hide the given mesh, or the current selection anchor; add to `state.hidden`; `enforceHidden()`; publish tray |
| `unhide(token)` | remove one mesh (or `'auto'` / `'all'`) from the hidden sets; `applyLayers()`; publish tray |
| `hiddenList()` | `[{ token, name, layer, auto }]` for the tray |
| `setHiddenHook(fn)` | panel subscribes; engine publishes the tray on every change |
| `revealStructure({id?, system?, mesh?})` | resolve to mesh(es): curated `id` via `selectBone`; `{system,mesh}` via `loadExtraModel` + name match. Frame camera on it (reuse the `focusStructures` framing math). Then **raycast** from the framed camera to the target centre; every mesh hit with `distance < targetDistance − ε` and a `canonicalId` goes into `state.autoHidden`. `enforceHidden()`, select + highlight the target, return `{ found, covered:[names] }`. If the target's own system layer is off, turn it on first (layer fallback). |
| `showConcept(id)` / `hideConcept(id)` / `toggleConcept(id)` / `activeConcepts()` | build / remove procedural overlay geometry in `state.overlayGroup` |

### Concept overlays

- One `THREE.Group` (`state.overlayGroup`) added to the scene at world origin, given the
  same idle-rotation as the layer pivots in `animate()`.
- **Cavity**: translucent `BoxGeometry` (`MeshBasicMaterial`, `opacity 0.14`,
  `depthWrite:false`) + wireframe edges, from the concept's `box` mapped through
  `bodyTransform`.
- **Region / quadrant**: a flat grid of thin translucent panels over the trunk front;
  opening one concept highlights its cell and dims the others.
- **Plane**: a large translucent quad on the concept's axis + a **caption chip**
  (DOM, bottom-centre of the stage) reading e.g. *"Sagittal plane — separates left
  from right"*, with `← left | right →` style end labels as sprites.
- Labels are `CanvasTexture` sprites parented to the overlay group (no new renderer,
  no per-frame DOM). Max ~15 sprites at once.
- A new `overlayRail` under the existing `layerRail`: four chips
  **Cavities · Regions · Quadrants · Planes**, each cycling off → all → off; plus the
  individual concepts reachable from search. `activeConcepts()` keeps the rail in sync.

### Hidden tray + auto-uncover disclosure (UI)

- **Tray**: a `Hidden (n)` chip pinned near `.stagenote` / above `.ctrlpill`. Tap to
  expand a small list — each row `name · layer · [show]`, plus `Show all`. Hidden
  driven by `hiddenList()` / `setHiddenHook`.
- **Hide affordance**: a `Hide` button in the selection panel (`#selectedCard`, next
  to *Open detail*) and a `hide` action on each `pickStack` row.
- **Auto-uncover banner**: when `revealStructure` returns `covered.length > 0`, show a
  toast-style banner: *"Hid deltoid, pectoralis major to uncover supraspinatus."*
  with **Show them** (`unhide('auto')`) and **Keep hidden** (dismiss). Auto-hidden
  parts also appear in the tray, tagged *auto*.
- Leaving the viewer (`goTo` away, or session close) clears both hidden sets and all
  concept overlays — hiding is a within-viewer working state, not persisted.

## Testing

Manual, via the dev preview:

1. Open a lesson → `⌕` in the lesson header opens the search sheet; Esc / tap-out closes; focus returns.
2. Search "supraspinatus" → viewer opens, muscle layer on, camera framed, banner lists the deltoid etc. it hid; Show them restores; tray shows the same list.
3. Search "radius" (curated) → opens + selects, nothing needed hiding.
4. Select a rib → Hide → rib disappears, tray shows `Ribs (right) · Skeleton`; Show all restores.
5. Search "thoracic cavity" → translucent box appears registered on the ribcage; rail chip reflects it; toggle off.
6. Search "coronal plane" → quad + caption "separates anterior from posterior".
7. Cavities/Regions/Quadrants/Planes rail chips each toggle the whole set.
8. Reload offline (SW v36) → `bodymap.js` served from cache, everything above still works.
9. `node work/verify-modules.mjs` / `work/syntax-check.mjs` pass.

## Risks

- **Raycast occlusion depends on camera angle** (accepted, decision C) — a big rotate
  after an auto-uncover can re-cover the part; re-running the search fixes it.
- Overlay registration relies on `state.bodyTransform` being set (it is, as soon as the
  skeleton loads). If the skeleton failed and the procedural fallback is up,
  `showConcept` falls back to measuring the current model bbox.
- `bodymap.js` must stay ASCII-clean and pass the existing module verifier.
