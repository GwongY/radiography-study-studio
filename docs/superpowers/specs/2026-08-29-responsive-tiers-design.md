# Responsive optimization — PC and iPad (landscape + portrait)

Date: 2026-08-29
Status: Approved design, pending implementation plan
Scope: `radiography-study-studio.html` (CSS + three inline attributes) and `sw.js` (cache version bump)

## Problem

The app has a two-tier responsive model: everything above 900px is "desktop" (icon rail), everything
at or below is "phone" (bottom tabs, single column, Learn drill-in). There is no tablet tier:

- iPad portrait (768–834px wide) gets the phone layout — bottom tabs and a single column that waste
  most of the width.
- iPad landscape (1024–1366px wide, only ~768–834px tall) gets a desktop layout tuned for tall PC
  windows — the 72vh viewer stage and fixed overlays get cramped.
- `#todayGrid`, `#learnGrid`, and `#sessionTiles` set their grid columns with **inline styles**, which
  no media query can override. Their sidebar tracks (280px/320px minimums) are reserved at every
  width. The Learn drill hides one pane at ≤900px but the visible pane stays in the `1fr` track
  beside a reserved empty 320px column — on narrow screens the visible content is squeezed to a
  sliver. This is the known CSS trap (inline style outranks the stylesheet) applied to the main
  view grids.
- Stage and sheet heights use `vh`, which jitters on iPad Safari as toolbars collapse; `dvh` is the
  fix, with a `vh` fallback line first.
- Hover styles apply unguarded on touch (sticky hover), and text inputs can trigger iOS focus-zoom.

The user's usage: iPad-first (landscape for study sessions, portrait for reading), PC secondary.
iPhone is explicitly out of scope — no height guard is needed for phone-landscape.

## Design

### Tier model

Three tiers via plain media queries in the single stylesheet. No container queries, no framework,
no JS `matchMedia` (the Learn drill threshold already lives entirely in CSS classes — `#learnGrid.drilled`
is toggled by existing JS state, and the pane-hiding media queries are pure CSS).

| Tier | Width | Navigation | Content |
|---|---|---|---|
| Phone | ≤700px | Bottom tab bar | Single column, Learn drill-in |
| Tablet | 701–1020px | Icon rail (86px) | Two-column Today/Learn |
| Desktop | ≥1021px | Icon rail | Two-column + reading caps |

Every existing `max-width:900px` rule is re-triaged: phone-only behaviors (bottom tabs, Learn
drill-in, compact ctrlpill labels, sheet bottom-sheet styling) move to ≤700px; tablet-appropriate
behaviors (dvh stage heights, flowkey visibility, compact control styles, docked selpanel) move to
≤1020px. The 960px session-grid collapse becomes ≤1020px. The 640px/560px refinements stay as
very-narrow-phone detail under the phone tier.

### Navigation

- `.navrail` visible from 701px up (currently 901px) — iPad portrait gets the rail.
- `.bottomtab` visible ≤700px only.
- `#navBackBtn` hidden from 701px up (`min-width:901px` rule becomes `min-width:701px`) so the
  back button never appears on tablet, where drill-in does not apply.
- Safe-area paddings on the rail (landscape home-indicator side) and topbar are kept as-is.

### Today + Learn grids (inline-style migration)

The three inline `style="display:grid…"` attributes become CSS classes:

- `.today-grid` — two columns ≥701px (`minmax(0,1.6fr) minmax(280px,.7fr)`), single column ≤700px.
- `.learn-grid` — two columns ≥701px (`minmax(0,1fr) minmax(320px,.9fr)`), single column ≤700px with
  the drill-in pane swap. Single-column at ≤700px also fixes the drill bug: the visible pane no
  longer shares the row with a reserved empty track.
- `.session-tiles` — `repeat(3,minmax(0,1fr))` ≥701px, single column ≤700px.
- `#topicGrid` becomes `repeat(auto-fill,minmax(232px,1fr))` so topic cards flow 3–4 across on wide
  screens instead of being pinned at two.

### Viewer (CSS only — 3D module DOM untouched)

The 3D module's top-level code wires buttons by id and any deletion is fatal; this design changes no
viewer DOM, only sizes and positions in CSS.

- Stage heights convert to `dvh` (with `vh` fallback declared first): desktop
  `min(72dvh,700px)`, tablet `min(64dvh,620px)`, phone `min(58dvh,460px)`.
- iPad-landscape band (`@media (min-width:1021px) and (max-height:900px)`): tighter stage
  `min(62dvh,540px)` so the segbar, stage and caption fit one screen at ~768px window height.
- The study selpanel docks below the stage at ≤1020px (existing ≤900px static rule extended) —
  full-width readable study panel in iPad portrait instead of a 250px overlay competing with the
  layerrail. The layerrail stays as the left overlay column ≥701px.

### Session overlay + search sheet

- `.sessioncol` keeps its 720px cap at all tiers; its ≤900px padding refinements move to ≤700px.
- The sheet's full-width bottom-sheet styling (currently ≤900px) moves to ≤700px; tablet and desktop
  keep the centered 520px sheet.
- All `vh`-based max-heights (sheet 80vh, lesson figures 52vh, xraywrap 58vh) become `dvh` with a
  `vh` fallback line first.

### PC reading comfort

- `.navcontent{max-width:1180px;margin:0 auto}` — dashboards and the viewer stop stretching
  edge-to-edge on wide monitors.
- Lesson content gets a narrower reading cap (~880px, centered) for line lengths.

### Touch comfort

- Every `:hover` rule is wrapped individually in `@media(hover:hover)` at its current stylesheet
  position — zero cascade change on hover-capable devices, no sticky hover on touch.
- `-webkit-tap-highlight-color:transparent` on buttons.
- `.seg` and `.filter-chip` min-height 38→42px on `hover:none` devices.
- Text inputs get explicit `font-size:16px` (prevents iOS focus-zoom).

### Verification and constraints

- Files touched: `radiography-study-studio.html`, `sw.js` (`CACHE_VERSION` v34→v35 — shell change).
  No data modules, no `?v=` changes, `validateCorpus()` untouched.
- Traps honored: no viewer DOM changes (button/id inventory diffed before and after anyway as
  insurance), `node work/load-check.mjs` after edits, patch the HTML directly (never `build.py`).
- Testing: real Chrome against `python -m http.server 8420 --directory outputs`, DevTools emulation
  at 1366×1024 and 1194×834 (iPad landscape), 834×1194 and 820×1180 (portrait), 1440×900 and
  1920×1080 (PC) — walking Today, Learn in both drill states, Viewer, the session overlay and the
  search sheet.
- Honest limit: real iPad Safari behavior (dvh, safe areas, focus-zoom) cannot be verified from the
  dev machine; the user does a quick pass on the iPad over LAN before this is called done.
