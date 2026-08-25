# Mastery dashboard + radiograph scaffold — design

Date: 2026-08-26
Project: Radiography Study Studio (`outputs/radiography-study-studio.html`, `outputs/study-data.js`)

## Background

An earlier session proposed a mastery-tracking dashboard, confidence-based spaced
repetition, a terminology module, a radiograph-image quiz mode and an
articulation/comparison mode — all targeted at the old `osteology-studio.html`.
None of that was ever applied to that file. Since then the project moved on to
`radiography-study-studio.html`, a much more complete rebuild that already has:

- Per-item mastery across 8 dimensions (`MASTERY_DIMENSIONS`), SM-2-shaped
  scheduling modified by confidence, response time and repeat lapses
  (`schedule()` in `study-data.js`).
- A `comparison` item type and real terminology items (`definition`,
  `comparison`) with `sourceRefs` — the old plan's terminology/articulation
  goals, done with real sourced content.
- A `weakest` study mode already wired into `pickItems()`.
- A hard governing rule: every factual claim must trace to a real file in the
  user's source folders (see `[[project_radiography-study-studio]]` memory).
  This rules out inventing radiograph positioning notes, mnemonics or
  articulation facts the way the old plan did.

What's still missing, and genuinely useful: a cross-subject visual view of
mastery (the old plan's "5-tier ladder" idea, adapted), and infrastructure so
real radiograph images can be dropped in later without a refactor — with zero
invented content.

## Part A — Mastery dashboard

### Tiers

Reuse the existing `itemScore(itemId)` (0–1, already blends accuracy, depth,
confidence and a lapse penalty). No new scoring math.

| Tier | Label | Condition |
|---|---|---|
| 0 | Not started | `!itemAttempted(id)` |
| 1 | Seen | attempted, score < 0.4 |
| 2 | Recognised | score 0.4–0.65 |
| 3 | Recalled | score 0.65–0.85 |
| 4 | Mastered | score ≥ 0.85 |

`tierFor(itemId)` is a small pure function in the module script, next to
`itemScore`.

### UI

A dialog, `dashDialog`, opened by a new "Mastery map" button placed next to
the existing "Coverage report" / "Sources & model" buttons in `.top-actions`.
Same dialog pattern as `coverageDialog` (`.dlg-scroll` body, close button).

Content:

- A short legend (five tier labels with their dot color).
- One block per subject that has at least one `STUDY_ITEM` (skips
  DSAI1202/LEI1101/APSS1A08, which have none). Each block: subject code/title,
  then one row per unit — unit label, then one dot per item in that unit
  colored by tier, then a small `n/total recalled+` count.
- A "Drill weakest 20" button at the top of the dialog: closes the dialog and
  calls `startSession({ mode: 'weakest', limit: 20 })`.

### Data-layer change

`pickItems()`'s `'weakest'` case currently hardcodes `.slice(0, 10)`. Change
to `.slice(0, opts.limit || 10)` — one line, keeps the existing home-page
"Review my weakest topics" mode (which doesn't pass `limit`) unchanged at 10.

### Styling

New CSS only for the dot grid and legend, reusing existing tokens:
`--muted` (tier 0), `--red` (tier 1), `--orange` (tier 2), `--teal` (tier 3),
`--green` (tier 4) — the palette already in `:root`, not new colors.

```css
.tier-dot{display:inline-block;width:9px;height:9px;border-radius:50%;margin:0 3px 3px 0}
.tier-dot.t0{background:var(--muted);opacity:.5}
.tier-dot.t1{background:var(--red)}
.tier-dot.t2{background:var(--orange)}
.tier-dot.t3{background:var(--teal)}
.tier-dot.t4{background:var(--green)}
.dash-unit{margin:10px 0;padding:10px 12px;border:1px solid var(--line);border-radius:11px;background:rgba(255,255,255,.02)}
.dash-unit .lab{display:flex;justify-content:space-between;gap:8px;font-size:13px;margin-bottom:6px}
.dash-legend{display:flex;gap:14px;flex-wrap:wrap;font-size:12px;color:var(--muted);margin-bottom:14px}
```

## Part B — Radiograph scaffold

No new item type. Any existing question object (`mcq`, `typed`, etc.) may
carry an optional `image` field — a filename resolved against
`assets/xray/`. This is simpler than the old plan's separate `xray` type and
reuses all existing rendering/scoring code paths.

### `study-data.js` changes

- `dimensionFor(question)`: if `question.image` is set, return `'location'`
  (same bucket as `landmark`/`diagram`/`id3d` — "can you find/read it")
  regardless of the underlying question type.
- A documented, non-live schema comment near `HTI_ITEMS` showing the shape a
  future real item would take (subject, unit, type, title, lesson, one
  `practice` question with an `image` field and a real `sourceRefs` entry).
  No array of invented cases — nothing is added to `STUDY_ITEMS` by this
  change.

### `radiography-study-studio.html` changes

- `questionBody(q)`: if `q.image` is set, prepend
  `<img class="xray-img" src="assets/xray/${esc(q.image)}" alt="radiograph" onerror="...">`
  before the existing type-specific body. The `onerror` handler replaces the
  image with `<div class="emptybox">Image not found — add it to
  assets/xray/ and reload.</div>` so a missing file degrades to a clear
  message instead of a broken-image icon or a stuck session.
- No pre-boot probing / pool pre-filtering. With zero real cases today,
  building an async "check every declared image before showing the pool"
  step would be speculative machinery for data that doesn't exist yet.
  Render-time graceful failure is sufficient: by the time someone adds a
  case to `STUDY_ITEMS`, they're also dropping in the matching image file.
- New CSS: `.xray-img{width:100%;max-height:42vh;object-fit:contain;border-radius:12px;background:#000;border:1px solid var(--line);margin-bottom:10px}`

### `outputs/assets/xray/`

A new folder containing only a `README.md` (not app content) documenting:
filename convention, that cases must be added to `study-data.js` as real
`STUDY_ITEMS` with a real `sourceRefs` entry, and that the project's
no-invented-content rule applies to radiograph cases exactly as it does to
everything else.

## Out of scope (explicitly deferred)

- Any actual radiograph case data or images — blocked on the user sourcing
  licensed material, per the existing project memory note.
- Pool-time image availability pre-filtering — deferred until there's real
  data to filter.
- Any new mastery-scoring formula — Part A reuses `itemScore()` as-is.

## Testing / verification

- Manual: open the app, answer a few items across at least two subjects with
  varying confidence, open "Mastery map", confirm dot tiers and counts match
  expectations, click "Drill weakest 20" and confirm a 20-item session starts
  (or fewer, if fewer than 20 attempted items exist).
- Manual: confirm the existing "Review my weakest topics" home-page mode
  still returns 10 items (unaffected by the `limit` change).
- Manual: temporarily add one throwaway `image` field to an existing
  question in `study-data.js` pointing at a nonexistent file, confirm the
  `onerror` fallback renders instead of a broken image, then revert.
- No automated test suite exists for this project (static HTML + ES module,
  no build step) — verification is manual in a browser via
  `python -m http.server`.
