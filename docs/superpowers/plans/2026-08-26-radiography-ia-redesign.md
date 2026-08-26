# Radiography Study Studio — IA Redesign Integration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current 6-subject / 9-mode / breadcrumb-driven UI of `outputs/radiography-study-studio.html` with the 5-destination IA specified in `../design_handoff_study_studio_ia/README.md` and prototyped pixel-for-pixel in `../design_handoff_study_studio_ia/Study Studio Redesign.dc.html`, without touching `study-data.js`, `anatomy-data.js`, `assets/`, `manifest.webmanifest`, or `osteology-studio.html`, and without breaking the embedded three.js Osteology module.

**Architecture:** This is a static, build-step-free HTML file with two `<script type="module">` blocks (the 3D studio, then the study system) that talk through `window.__osteo`. The redesign only changes the `<style>` block, the `<body>` markup, and the view/nav render functions in the second script block. All data access (`SUBJECTS`, `STUDY_ITEMS`, `itemScore`, `startSession`, `pickItems`, `renderStep`, etc.) is reused as-is — this is a shell/markup/CSS reskin around existing logic, not a rewrite of the study engine. There is no test runner in this project, so "tests" in this plan are manual verification steps: serve `outputs/` locally and check the result in a real browser (the in-app Browser pane does not register service workers, so PWA-specific checks need real Chrome).

**Tech Stack:** Vanilla HTML/CSS/ES modules, three.js via CDN import map, `localStorage` for persistence, `sw.js` for offline caching. No framework, no bundler — keep it that way.

---

## Before you start

- [ ] **Step 0a: Confirm a clean tree and create a branch**

```bash
cd "/c/Users/leung/Documents/Codex/2026-08-24/files-pasted-by-the-user-yes"
git status
git checkout -b ia-redesign
```
Expected: `nothing to commit, working tree clean` before branching.

- [ ] **Step 0b: Start the local server used for every manual check in this plan**

```bash
cd "/c/Users/leung/Documents/Codex/2026-08-24/files-pasted-by-the-user-yes/outputs"
python3 -m http.server 8080
```
Open `http://localhost:8080/radiography-study-studio.html` in a real browser tab and confirm the current app still loads (subject grid visible) before making any change. Leave this server running for the rest of the plan.

- [ ] **Step 0c: Keep the design reference open for comparison**

Open `../design_handoff_study_studio_ia/Study Studio Redesign.dc.html` (served locally, per that folder's own README) side by side. Every task below tells you exactly which section of that file to match and which literal values (colors, spacing, radii) to carry over — copy those values verbatim, do not eyeball them.

---

## Data mapping (read this before Task 3 or 4 — it is the one non-obvious translation in the whole plan)

The prototype invents sample "topics", "sessions" and "filters". Here is what each one is in the real data, so every later task binds to real fields instead of guessing:

| Prototype concept | Real source |
|---|---|
| "Topic" card in Learn | One entry of `subject.units` (from `SUBJECTS[].units`) that has at least one item: `itemsForUnit(subject.id, unit.id).length > 0` |
| Topic's subject-accent group ("Anatomy" / "Physiology" / "Radiation science") | `HSS2011 → 'Anatomy' (#72e3cf)`, `ABCT2326 → 'Physiology' (#ffba67)`, `HTI17103 → 'Radiation science' (#8ea9ff)`. `APSS1A08`, `DSAI1202`, `LEI1101` have zero items in `STUDY_ITEMS` today, so they are automatically absent from Learn — no manual hide-list needed. |
| "Has 3D / images" filter | `itemsForUnit(...).some(i => ['id3d','structure','movement','diagram'].includes(i.type))` |
| Topic progress % | `items.length ? Math.round(items.reduce((n,i)=>n+itemScore(i.id),0)/items.length*100) : 0` (this expression already exists in `renderSubject`, line 946 — reuse it) |
| Topic items list, "weakest first" | `itemsForUnit(subjectId, unitId).slice().sort((a,b)=>itemScore(a.id)-itemScore(b.id))` |
| Item's 4-dot mastery indicator | `tierFor(itemScore(item.id), itemAttempted(item.id))` already returns 0–4 (used today in `openDashboard`, line 1820) — map tier ≥3 → green, tier 2 → orange, ≤1 → red, matching `.tier-dot` colors already defined in CSS |
| The 3 Today sessions (Daily / Weak spots / Exam recall) | `STUDY_MODES` ids `'daily'`, `'weakest'`, `'exam'` — call `startSession({mode:'daily'})` etc. exactly as today. Modes `new`, `quick10`, `hooks`, `subject`, `mistakes`, `mixed` are **not** deleted from `study-data.js` (do not touch that file) — they simply stop having a direct button. `mistakes` becomes the Review → My mistakes CTA (`startSession({mode:'mistakes'})`); the rest become genuinely unreachable from the UI, which matches the settled decision in the handoff doc. |
| "Weakest right now" list (Today, right column) | `STUDY_ITEMS.filter(i=>itemAttempted(i.id)).sort((a,b)=>itemScore(a.id)-itemScore(b.id)).slice(0,3)` |
| Review → My mistakes rows | `[...new Set(store.mistakes.map(m=>m.itemId))].map(getItem)`, badge = count of `store.mistakes.filter(m=>m.itemId===id).length` |
| Review → Due rows | `STUDY_ITEMS.filter(i=>itemAttempted(i.id)&&itemDue(i.id))` |
| Review → Mastery map rows | `MASTERY_DIMENSIONS.map(d=>({...d, pct: <average masteryScore for that dim across all attempted items>}))`, sorted weakest-first (already partially exists in `openDashboard`, but that renders per-unit tier dots, not per-dimension — Task 7 writes the per-dimension aggregate fresh since nothing today computes it) |
| More → Sources & coverage / Subjects with no material / Offline & storage / Scheduling rules / Legacy studio | Static rows + `COVERAGE` object (already imported) — this is `openCoverage()`'s content (line ~1766) moved into a plain view instead of a `<dialog>` |
| "Continue" card | New: persist `{itemId, step}` on every `setStep()` call to `localStorage` under a new key `rss.v1.continue` (see Task 5) — nothing today tracks "last item, last step" across a reload |
| Viewer's `Selected` panel | Existing `#selectedName` / `#selectedChips` / `#selectedDetails` elements from the Osteology module, just repositioned by CSS (Task 6) — do not touch the JS that fills them |

---

## Task 1: Design tokens and base shell CSS

**Files:**
- Modify: `outputs/radiography-study-studio.html:17` (the `:root` line) and the block ending `outputs/radiography-study-studio.html:193` (`</style>`)

- [ ] **Step 1: Replace the `:root` custom properties**

Current (line 17):
```css
:root{--bg:#081016;--panel:#0e1820;--panel-2:#111f29;--line:#21333d;--text:#f0eee7;--muted:#91a4ad;--teal:#72e3cf;--orange:#ffba67;--red:#f18181;--green:#8ce2ae;--shadow:0 18px 55px rgba(0,0,0,.28)}
```
Replace with (adds the blue accent for Radiation science and the two new font families; keeps every existing variable name so nothing downstream in the file breaks):
```css
:root{--bg:#05090d;--panel:#0e1820;--panel-2:#111f29;--line:#21333d;--text:#f0eee7;--muted:#91a4ad;--dim:#6f858f;--teal:#72e3cf;--orange:#ffba67;--blue:#8ea9ff;--red:#f18181;--green:#8ce2ae;--onaccent:#071316;--shadow:0 18px 55px rgba(0,0,0,.28)}
```

- [ ] **Step 2: Add the Google Fonts link and switch the body font stack**

In `<head>`, immediately after the existing `<meta name="description" ...>` line (line 15), add:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&display=swap" rel="stylesheet">
```
Then change line 18 from:
```css
*{box-sizing:border-box}html,body{margin:0;min-height:100%;background:radial-gradient(circle at 80% -10%,#16313b 0,#081016 42%);color:var(--text);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}body{padding:24px clamp(14px,3vw,42px) 46px}.shell{max-width:1440px;margin:auto}
```
to:
```css
*{box-sizing:border-box}html,body{margin:0;height:100%;background:var(--bg);color:var(--text);font-family:'Instrument Sans',ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;-webkit-font-smoothing:antialiased}body{padding:0;overflow:hidden}.shell{height:100vh;display:flex;flex-direction:column;overflow:hidden}
.editorial{font-family:Newsreader,serif;letter-spacing:-.02em}
```
This drops the old radial-gradient page background and the centered `max-width:1440px` shell — per the earlier "make it fullscreen instead of deadspace outside" decision already applied to the prototype, the real app should fill the viewport the same way. `overflow:hidden` on `body`/`.shell` is intentional: internal panes scroll themselves (Task 2 gives the body/content area its own `overflow:auto`), so there is no outer page scrollbar.

- [ ] **Step 3: Add the nav-rail, bottom-tab, and sheet CSS**

Append this block right before the `</style>` tag (current line 193), keeping every existing rule above it untouched (they are still used by session content, forms, etc. in later tasks):
```css
/* ---------- IA redesign: nav shell ---------- */
.app-shell{flex:1;min-height:0;display:flex;flex-direction:column}
.app-topbar{flex:none;display:flex;align-items:center;justify-content:space-between;padding:9px 18px 7px;font:600 12px ui-monospace,Menlo,monospace;color:var(--muted)}
.app-body{flex:1;min-height:0;display:flex}
.navrail{flex:none;width:86px;border-right:1px solid var(--line);background:rgba(8,16,22,.6);padding:14px 10px;display:flex;flex-direction:column;gap:6px}
.navrail .navlabel{font:700 10px ui-monospace,Menlo,monospace;letter-spacing:.16em;text-transform:uppercase;color:var(--dim);padding:0 8px 10px}
.navrail button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;min-height:46px;border:0;border-radius:11px;cursor:pointer;background:transparent;color:var(--muted);font:600 10.5px 'Instrument Sans',sans-serif}
.navrail button .ic{font:16px ui-monospace,Menlo,monospace;line-height:1}
.navrail button.active{background:rgba(114,227,207,.13);color:var(--teal)}
.navmain{flex:1;min-width:0;display:flex;flex-direction:column}
.navhead{flex:none;display:flex;align-items:center;gap:14px;padding:14px 22px;border-bottom:1px solid var(--line)}
.navhead .kicker{font:700 10px ui-monospace,Menlo,monospace;letter-spacing:.14em;text-transform:uppercase;color:var(--teal)}
.navhead .htitle{font:500 24px/1.15 Newsreader,serif;letter-spacing:-.02em;margin-top:3px}
.navhead .grow{flex:1;min-width:0}
.navcontent{flex:1;min-height:0;overflow:auto;padding:22px}
.bottomtab{display:none}
@media(max-width:900px){
  .navrail{display:none}
  .navmain{width:100%}
  .app-body{flex-direction:column}
  .bottomtab{display:flex;flex:none;border-top:1px solid var(--line);background:rgba(8,16,22,.94);padding:6px 4px 22px}
  .bottomtab button{flex:1;min-height:52px;border:0;background:none;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;color:var(--muted);font:600 10.5px 'Instrument Sans',sans-serif}
  .bottomtab button .ic{font:17px ui-monospace,Menlo,monospace;line-height:1}
  .bottomtab button.active{color:var(--teal)}
  .navcontent{padding:14px 14px 20px}
}
```
Note: this reuses the design tokens from the prototype (`Study Studio Redesign.dc.html` lines 36–52 for the rail, lines 260–269 for the bottom tab) but as real CSS classes instead of inline `{{ }}`-bound styles, since this file has no templating runtime.

- [ ] **Step 4: Verify no visual regression yet**

Reload `http://localhost:8080/radiography-study-studio.html`. The page will look broken/unstyled in places (old `.topbar`, `.crumbs`, `.subject-grid` markup is still there and now sits on a black full-height background) — that is expected until Task 2 replaces the body markup. Just confirm the page doesn't throw a JS console error and the fonts loaded (inspect `document.fonts` or just eyeball the Newsreader serif once Task 3 adds a heading that uses it).

- [ ] **Step 5: Commit**

```bash
git add outputs/radiography-study-studio.html
git commit -m "style: add IA redesign design tokens and nav shell CSS"
```

---

## Task 2: Replace the body skeleton with the 5-destination nav shell

**Files:**
- Modify: `outputs/radiography-study-studio.html:195-348` (everything from `<body>` through the closing `</div>` of `.shell`, i.e. the old topbar/crumbs/homeView/subjectView/sessionView/osteologyView wrapper — the *contents* of `osteologyView` from Task 6 onward are kept, only the wrapping view divs and topbar/crumbs change)

- [ ] **Step 0: Fixes folded in from the Task 1 code review — do these FIRST**

The Task 1 review found six issues that are plan gaps rather than defects in that commit. They all bite the moment this task lands markup, so clear them before touching the body. All are in `outputs/radiography-study-studio.html`.

**0a — Delete the stale mobile body padding.** The pre-existing `@media(max-width:560px)` block (was line 26, now ~line 29) still contains `body{padding:16px 10px 30px}`. Task 1 set `body{padding:0;overflow:hidden}`, but this later rule has equal specificity and wins on source order, so at ≤560px the body regains 46px of vertical padding while `.shell` is `height:100vh` — the shell overflows its parent's content box and `overflow:hidden` clips the bottom, which is exactly where `.bottomtab` lives. Remove **only** the `body{...}` declaration from that block; leave `.title`, `.stage`, `.stage-head`, `.stage-controls`, `.card`, `.info-grid`, `.ghost,.primary` alone. The block becomes:
```css
@media(max-width:560px){.title{font-size:31px}.stage{min-height:360px;height:55vh}.stage-head{padding:12px}.stage-controls{padding:10px 12px}.card{padding:14px}.info-grid{grid-template-columns:1fr 1fr}.ghost,.primary{padding:9px 11px}}
```

**0b — `.shell{height:100vh}` → `height:100%`.** `100vh` is the *large* viewport on mobile browsers: it excludes the retractable URL bar, so with `overflow:hidden` and no page scroll the tab bar sits under the browser chrome and is unreachable. `body` is already `height:100%`, so change the `.shell` rule Task 1 wrote to `.shell{height:100%;display:flex;flex-direction:column;overflow:hidden}`.

**0c — Add `min-height:0` to `.navmain`.** It is the only element in the new nav block without it. `min-width:0` is the right axis for the desktop row, but the `@media(max-width:900px)` block flips `.app-body` to `flex-direction:column`, flipping the constraining axis with it. Per spec it should still work, but iOS Safari is historically unreliable here and the failure mode is severe (no page scroll to recover an off-screen tab bar). Change to:
```css
.navmain{flex:1;min-width:0;min-height:0;display:flex;flex-direction:column}
```

**0d — Give the serif stack a real fallback.** `.editorial{font-family:Newsreader,serif}` falls back to Times New Roman on Windows, which reads as broken rather than as a fallback for a display face. Change the `.editorial` rule Task 1 added to:
```css
.editorial{font-family:Newsreader,ui-serif,Georgia,'Times New Roman',serif;letter-spacing:-.02em}
```
Then reduce `.navhead .htitle` to stop duplicating it — it currently re-declares the same family and letter-spacing. Use **longhand**, not the `font` shorthand: `font:500 24px/1.15` is invalid CSS because the shorthand requires a `font-family`, so the whole declaration would be dropped and the title would silently render at inherited 16px/400.
```css
.navhead .htitle{font-weight:500;font-size:24px;line-height:1.15;margin-top:3px}
```
and render the header title with **both** classes in Step 1's markup: `<div class="htitle editorial" id="navTitle">`. This keeps the serif fallback defined in exactly one place.

**0e — Add safe-area insets.** `<meta viewport>` already sets `viewport-fit=cover` and the app declares `apple-mobile-web-app-status-bar-style: black-translucent`, but the file uses zero `env(safe-area-inset-*)`. That was cosmetically absorbed by the old body padding; now the shell is viewport-locked with edge-anchored chrome, so the top bar renders under the notch and the `22px` bottom padding is a magic number that is ~12px short on notched iPhones. Update the two rules Task 1 added:
```css
.app-topbar{flex:none;display:flex;align-items:center;justify-content:space-between;padding:calc(9px + env(safe-area-inset-top)) 18px 7px;font:600 12px ui-monospace,Menlo,monospace;color:var(--muted)}
```
and inside the `@media(max-width:900px)` block:
```css
.bottomtab{display:flex;flex:none;border-top:1px solid var(--line);background:rgba(8,16,22,.94);padding:6px 4px calc(6px + env(safe-area-inset-bottom))}
```

**0f — Update `theme-color`.** Line 6 is `<meta name="theme-color" content="#0b1118">`, and `manifest.webmanifest` sets `background_color`/`theme_color` to `#081016` — both are the *old* `--bg`. Change the meta tag to `content="#05090d"`. The manifest is on the do-not-modify list, so the installed PWA will still flash `#081016` on splash before painting `#05090d`; that seam cannot be closed under the current constraints. Note it in your report rather than modifying the manifest.

(A seventh review finding, `showView()`'s now-dead `window.scrollTo`, is handled in Step 4b below since it is a JS change.)

- [ ] **Step 1: Replace the topbar and breadcrumb nav**

Delete lines 196–211 (the `<div class="shell"><header class="topbar">...</header><nav class="crumbs" id="rssCrumbs" ...></nav>`) and replace with:
```html
<div class="shell">
  <div class="app-shell">
    <div class="app-topbar">
      <span>Study Studio — offline ready</span>
      <span id="appStatusRight">⌁ ready</span>
    </div>
    <div class="app-body">
      <nav class="navrail" id="navRail" aria-label="Destinations">
        <div class="navlabel">Studio</div>
      </nav>
      <div class="navmain">
        <header class="navhead">
          <div class="grow">
            <div class="kicker" id="navKicker">Today</div>
            <div class="htitle" id="navTitle">Today</div>
          </div>
          <button class="icon-btn" id="rssSearchBtn" aria-label="Search" style="min-width:44px;min-height:44px;border-radius:11px">⌕</button>
        </header>
        <div class="navcontent" id="navContent">
```
This opens `.navcontent` but does not close it yet — the four destination `<section>`s (Today/Learn/Viewer/Review are Tasks 3/4/6/7; More is Task 8) render inside it. Leave a placeholder for now so the file stays valid HTML while you work task by task:
```html
          <section class="view" id="todayView">Today — replaced in Task 3</section>
          <section class="view hidden" id="learnView">Learn — replaced in Task 4</section>
```
- [ ] **Step 2: Keep `osteologyView` and `sessionView`, move them, add `reviewView`/`moreView` placeholders**

The existing `osteologyView` section (old lines 273–339, the whole 3D studio markup) is **not rewritten** — Task 6 only wraps it. Cut it (and only it — not `homeView`, not `subjectView`) from its old location and paste it inside `.navcontent`, right after the two placeholder lines above, renaming `id="osteologyView"` to `id="viewerView"` and adding `hidden` to its class:
```html
<section class="view hidden" id="viewerView">
  <!-- ...unchanged contents of the old #osteologyView, lines 274-338... -->
</section>
```
Do **not** rename any id *inside* that block (`#stage`, `#taskCard`, `#selectedName`, etc. all stay — the 3D module's `$()` lookups depend on them).

Then add the two remaining placeholders and close `.navcontent`:
```html
          <section class="view hidden" id="reviewView">Review — replaced in Task 7</section>
          <section class="view hidden" id="moreView">More — replaced in Task 8</section>
        </div>
      </div>
    </div>
    <nav class="bottomtab" id="bottomTab" aria-label="Destinations"></nav>
  </div>
</div>
```
- [ ] **Step 3: Delete the old `homeView` and `subjectView` sections entirely**

Delete the old `<section class="view" id="homeView">...</section>` block (old lines 213–225) and `<section class="view hidden" id="subjectView">...</section>` block (old lines 227–240) completely — Tasks 3 and 4 build their replacements (`#todayView`, `#learnView`) from scratch, they do not reuse this markup.

- [ ] **Step 4: Move `sessionView` out of the tab flow — it becomes an overlay**

Cut the old `<section class="view hidden" id="sessionView">...</section>` block (old lines 242–271) from wherever it now sits and paste it as a **sibling of `.app-shell`**, not inside `.navcontent` (Task 5 makes it a full-screen overlay, which requires it to sit outside the tab content so it can cover the whole shell regardless of which tab is behind it):
```html
  </div> <!-- closes .app-shell -->
  <section class="view hidden" id="sessionView">
    <!-- ...unchanged contents, old lines 243-271... -->
  </section>
</div> <!-- closes .shell -->
```

- [ ] **Step 4b: Redirect the now-dead scroll-to-top**

`showView(id)` (around line 846) ends with `window.scrollTo({ top: 0, behavior: 'smooth' });`. Task 1 made `body{overflow:hidden}`, so the document never scrolls — scroll position now lives in `.navcontent`, and this line is a permanent no-op. It is the only scroll-dependent line in the file (verified by grepping `scrollIntoView`, `scrollTop`, `scrollY`, scroll listeners and `position:sticky` — one hit total), so the fix is contained. Replace that line with:
```javascript
  const pane = $$('navContent');
  if (pane) pane.scrollTo({ top: 0, behavior: 'smooth' });
```

- [ ] **Step 5: Verify the page is still valid HTML**

```bash
python3 -c "import re,sys; s=open('/c/Users/leung/Documents/Codex/2026-08-24/files-pasted-by-the-user-yes/outputs/radiography-study-studio.html').read(); import html.parser
class P(html.parser.HTMLParser):
    pass
P().feed(s)
print('parsed OK')"
```
Expected: `parsed OK` with no traceback. Then reload the browser tab — expect to see only the flat placeholder text ("Today — replaced in Task 3" etc.) with no console errors. If the console shows `Cannot read properties of null` from the old script block, that's expected until Task 3–8 update the JS to match — note it and continue, later tasks fix it.

- [ ] **Step 6: Commit**

```bash
git add outputs/radiography-study-studio.html
git commit -m "refactor: replace topbar/breadcrumb shell with 5-destination nav skeleton"
```

---

## Task 3: Today screen

**Files:**
- Modify: `outputs/radiography-study-studio.html` — the `#todayView` placeholder from Task 2, plus the JS `renderHome()` function (currently lines 841–876) and its call sites (`$$('rssHomeBtn').onclick = renderHome;` at line 1838, and `renderHome();` at line 1856)

- [ ] **Step 1: Write the real `#todayView` markup**

Replace the Task 2 placeholder line `<section class="view" id="todayView">Today — replaced in Task 3</section>` with:
```html
<section class="view" id="todayView">
  <div style="display:grid;grid-template-columns:minmax(0,1.6fr) minmax(280px,.7fr);gap:14px;align-items:start" id="todayGrid">
    <div style="display:grid;gap:14px;min-width:0">
      <div id="continueCard" style="border:1px solid rgba(114,227,207,.4);border-radius:16px;background:linear-gradient(180deg,rgba(114,227,207,.12),rgba(114,227,207,.03));padding:18px"></div>
      <div>
        <div class="task-kicker" style="margin-bottom:9px">Start a session</div>
        <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px" id="sessionTiles"></div>
      </div>
      <div class="card">
        <div style="display:flex;align-items:baseline;justify-content:space-between;gap:10px">
          <div class="task-kicker" style="color:var(--orange)">Weakest right now</div>
          <button class="ghost" id="allWeakBtn" style="border:0;background:none;color:var(--teal);padding:6px 0">All weak spots →</button>
        </div>
        <div style="display:grid;gap:7px;margin-top:11px" id="weakestList"></div>
      </div>
    </div>
    <div style="display:grid;gap:14px;min-width:0">
      <div class="card">
        <div class="task-kicker">Today</div>
        <div class="statrow" id="todayStatrow" style="margin-top:12px"></div>
        <p class="small" style="margin-top:13px">Delayed recall is the only dimension counted here — three right answers in one sitting do not move it.</p>
      </div>
      <div class="card">
        <div class="task-kicker">Recent</div>
        <div style="display:grid;gap:9px;margin-top:11px" id="recentList"></div>
      </div>
    </div>
  </div>
</section>
```
(`.card`, `.task-kicker`, `.statrow`, `.small` are all existing classes from the original `<style>` block — reused rather than duplicated.)

- [ ] **Step 2: Replace `renderHome()` with `renderToday()`**

Replace the whole function body (old lines 841–876) with:
```javascript
function renderToday() {
  setActiveNav('today');
  const totalItems = STUDY_ITEMS.length;
  const attempted = STUDY_ITEMS.filter((i) => itemAttempted(i.id));
  const due = attempted.filter((i) => itemDue(i.id));
  const mistakeItemIds = [...new Set(store.mistakes.map((m) => m.itemId))];

  const cont = getContinueTarget();
  $$('continueCard').innerHTML = cont ? `
    <div class="task-kicker">Continue</div>
    <h2 class="editorial" style="font-size:24px;margin:8px 0 0">${esc(cont.item.title)}</h2>
    <p class="small" style="margin-top:6px">${esc(getSubject(cont.item.subject).title)} · item ${cont.index + 1} of ${cont.total} · left off at ${esc(STEPS.find((s) => s.id === cont.step).label)}</p>
    <div style="height:6px;border-radius:99px;background:rgba(255,255,255,.09);overflow:hidden;margin-top:14px"><div style="height:100%;width:${Math.round(itemScore(cont.item.id) * 100)}%;border-radius:99px;background:var(--teal)"></div></div>
    <div style="display:flex;align-items:center;gap:12px;margin-top:14px">
      <button class="primary" id="continueBtn">Continue →</button>
      <span class="small">${Math.round(itemScore(cont.item.id) * 100)}% mastered</span>
    </div>` : `
    <div class="task-kicker">Continue</div>
    <h2 class="editorial" style="font-size:24px;margin:8px 0 0">Nothing in progress</h2>
    <p class="small" style="margin-top:6px">Start a session below to begin.</p>`;
  if (cont) $$('continueBtn').onclick = () => resumeContinue(cont);

  $$('sessionTiles').innerHTML = [
    ['daily', 'Daily session', '◔', 'var(--teal)', `${pickItems({ mode: 'daily' }).length} mixed items`],
    ['weakest', 'Weak spots', '▼', 'var(--orange)', `${attempted.filter((i) => itemScore(i.id) < .5).length} items you keep getting wrong`],
    ['exam', 'Exam recall', '⌸', 'var(--blue)', 'Past-paper style, no options shown'],
  ].map(([mode, label, icon, color, hint]) => `
    <button class="rss-mode" style="flex-direction:column;align-items:flex-start;gap:5px;min-height:96px" data-mode="${mode}">
      <span class="ic" style="font-size:17px;color:${color}">${icon}</span>
      <b>${esc(label)}</b><small>${esc(hint)}</small>
    </button>`).join('');
  $$('sessionTiles').querySelectorAll('[data-mode]').forEach((b) => { b.onclick = () => startSession({ mode: b.dataset.mode }); });

  const weakest = attempted.slice().sort((a, b) => itemScore(a.id) - itemScore(b.id)).slice(0, 3);
  $$('weakestList').innerHTML = weakest.length ? weakest.map((i) => `
    <button class="unit-row" data-weak="${esc(i.id)}">
      <span class="grow"><b>${esc(i.title)}</b><small>${esc(getSubject(i.subject).title)}</small></span>
      <span class="meter"><span style="width:${Math.round(itemScore(i.id) * 100)}%;background:var(--orange)"></span></span>
      <span class="pc">${Math.round(itemScore(i.id) * 100)}%</span>
    </button>`).join('') : '<div class="empty">Nothing studied yet — start a session to build this list.</div>';
  $$('weakestList').querySelectorAll('[data-weak]').forEach((b) => { b.onclick = () => renderReviewTab('mistakes'); });
  $$('allWeakBtn').onclick = () => goTo('review');

  const streak = computeStreak();
  $$('todayStatrow').innerHTML = [
    [String(streak), 'day streak'], [String(due.length), 'due now'],
    [`${totalItems ? Math.round(attempted.reduce((n, i) => n + itemScore(i.id), 0) / totalItems * 100) : 0}%`, 'mastered'],
  ].map(([v, l], idx) => `<div class="s"><b${idx === 1 ? ' style="color:var(--orange)"' : ''}>${esc(v)}</b><small>${esc(l)}</small></div>`).join('');

  $$('recentList').innerHTML = store.mistakes.slice(0, 4).map((m) => {
    const item = getItem(m.itemId);
    return item ? `<div style="display:flex;gap:10px;align-items:baseline;font-size:12.5px"><span style="color:${m.correct ? 'var(--green)' : 'var(--red)'}">●</span><span style="flex:1">${esc(item.title)}</span><span class="small">${esc(relativeTime(m.at))}</span></div>` : '';
  }).join('') || '<div class="empty">No activity yet.</div>';

  showView('todayView');
}
```

- [ ] **Step 3: Add the three small helpers `renderToday()` calls**

`getContinueTarget`, `resumeContinue`, `computeStreak`, and `relativeTime` do not exist yet. Add them directly above `renderToday()`:
```javascript
function getContinueTarget() {
  const raw = read(STORAGE_PREFIX + 'continue', null);
  if (!raw || !raw.itemId) return null;
  const item = getItem(raw.itemId);
  if (!item) return null;
  const siblings = itemsForSubject(item.subject);
  const index = siblings.findIndex((i) => i.id === item.id);
  return { item, step: raw.step || 'learn', index: index < 0 ? 0 : index, total: siblings.length };
}
function saveContinue(itemId, step) { write(STORAGE_PREFIX + 'continue', { itemId, step }); }
function resumeContinue(cont) {
  session = { opts: { mode: 'subject', subject: cont.item.subject }, mode: null, items: [cont.item], index: 0, step: cont.step, reveal: 0, qIndex: 0, answered: false, confidence: null, startedAt: 0, results: [], hooksOnly: false };
  openSessionOverlay();
  setStep(cont.step);
}
function computeStreak() {
  const days = new Set(store.mistakes.concat(Object.values(store.mastery).flatMap((m) => (m.lastSeen ? [m] : []))).map((r) => new Date(r.at || r.lastSeen).toDateString()));
  let n = 0, d = new Date();
  while (days.has(d.toDateString())) { n += 1; d.setDate(d.getDate() - 1); }
  return n;
}
function relativeTime(ts) {
  const mins = Math.round((Date.now() - ts) / 60000);
  if (mins < 60) return `${mins}m`;
  if (mins < 1440) return `${Math.round(mins / 60)}h`;
  return `${Math.round(mins / 1440)}d`;
}
```
`STORAGE_PREFIX` is already imported at the top of this script block (line 681) — no new import needed. `openSessionOverlay` and `goTo` are defined in Task 9 (nav wiring); leave them as forward references for now, they will exist by the time this file is loaded end-to-end after Task 9.

- [ ] **Step 3b: Update `VIEWS` and delete the dead topbar wiring — REQUIRED before this task can be verified**

Task 2 deleted the old topbar and the `homeView`/`subjectView` sections, but their JavaScript references survive and currently abort the second script block's boot. Two fixes, both mandatory here rather than in a later task:

**`VIEWS` is stale.** In `showView(id)` (around line 846) it still reads:
```javascript
const VIEWS = ['homeView', 'subjectView', 'sessionView', 'osteologyView'];
```
`showView` does `VIEWS.forEach((v) => $$(v).classList.toggle(...))`, so with the old list `$$('homeView')` is `null` and `renderToday()`'s closing `showView('todayView')` throws. Replace it with:
```javascript
const VIEWS = ['todayView', 'learnView', 'viewerView', 'reviewView', 'moreView'];
```
Also update the special-case id in the same function — `if (id === 'osteologyView' && window.__osteo)` becomes `if (id === 'viewerView' && window.__osteo)`. (`sessionView` is deliberately absent from `VIEWS`: Task 5 makes it an overlay managed by its own open/close helpers, not by `showView`.)

**Delete all four dead topbar wirings** in the boot section near the end of the second script block. These reference buttons Task 2 removed from the markup, and the first one throws before `renderToday()` is ever called:
```javascript
$$('rssHomeBtn').onclick = renderHome;          // delete
$$('rssDashBtn').onclick = openDashboard;        // delete
$$('rssCoverageBtn').onclick = () => openCoverage(null);  // delete
$$('rssBackSubject').onclick = () => renderSubject('HSS2011');  // delete
```
Leave `$$('closeSource')`, `$$('closeCoverage')`, `$$('rssSkipBtn')` and `$$('rssEndBtn')` alone — their elements still exist. Do **not** delete `openDashboard`/`openCoverage`/`$$('closeDash')` yet; Tasks 7 and 8 own those.

After this step the app should boot cleanly to a working Today screen, which is what makes Steps 5's verification meaningful.

- [ ] **Step 4: Update remaining call sites**

Change line 1856 from `renderHome();` to `renderToday();`.
Search the whole file for remaining calls to `renderHome` (`grep -n "renderHome" outputs/radiography-study-studio.html`) and change each to `renderToday` — expect matches inside `crumbs([{ label: 'All subjects', go: renderHome }...` calls in `renderSubject`, `startSession`, `openOsteology`; those whole `crumbs([...])` calls are deleted in Task 9 when the breadcrumb bar is removed, so it is fine to leave them pointing at `renderToday` in the meantime (a stale but harmless reference) — Task 9 removes the calls outright.

- [ ] **Step 5: Verify in browser**

Reload. Expect: Today screen shows a Continue card ("Nothing in progress" on a fresh profile), 3 session tiles, an empty "Weakest right now" list, stat row (0 streak / due / mastered), empty Recent. Click "Daily session" — expect `startSession` to run (it will currently render into the still-unstyled `#sessionView`, which is fine — Task 5 restyles it). Open devtools console — expect no errors other than a possible `openSessionOverlay is not defined` if you clicked a session tile before Task 9; if so, that confirms the forward reference and is expected at this point in the plan.

- [ ] **Step 6: Commit**

```bash
git add outputs/radiography-study-studio.html
git commit -m "feat: replace subject-grid home with Today screen"
```

---

## Task 4: Learn screen

**Files:**
- Modify: `outputs/radiography-study-studio.html` — the `#learnView` placeholder, plus a new `renderLearn()` function replacing `renderSubject()` (old lines 890–982)

- [ ] **Step 1: Write the `#learnView` markup**

Replace the Task 2 placeholder with:
```html
<section class="view hidden" id="learnView">
  <div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(320px,.9fr);gap:14px;align-items:start" id="learnGrid">
    <div style="min-width:0;display:grid;gap:12px" id="topicListPane">
      <div style="display:flex;gap:7px;flex-wrap:wrap" id="learnFilters"></div>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px" id="topicGrid"></div>
    </div>
    <div id="topicDetailPane"></div>
  </div>
</section>
```

- [ ] **Step 2: Add the CSS this screen needs that isn't already defined**

Append to the `<style>` block (same location as Task 1 Step 3):
```css
.filter-chip{min-height:38px;border:1px solid var(--line);border-radius:99px;background:rgba(255,255,255,.03);color:var(--muted);font:600 12.5px 'Instrument Sans',sans-serif;padding:0 14px;cursor:pointer}
.filter-chip.active{border-color:var(--accent,var(--teal));color:var(--accent,var(--teal));background:rgba(114,227,207,.12)}
.topic-card{text-align:left;border:1px solid var(--line);border-radius:14px;background:rgba(255,255,255,.03);padding:14px;cursor:pointer;color:inherit;display:flex;flex-direction:column;gap:7px}
.topic-card:hover{border-color:var(--accent,var(--teal))}
.topic-card.active{border-color:var(--accent,var(--teal));background:rgba(114,227,207,.07)}
.topic-tag{font:700 10px ui-monospace,Menlo,monospace;letter-spacing:.12em;text-transform:uppercase;color:var(--accent,var(--teal))}
.topic-bar{height:5px;border-radius:99px;background:rgba(255,255,255,.09);overflow:hidden}
.topic-bar span{display:block;height:100%;background:var(--accent,var(--teal))}
```

- [ ] **Step 3: Write `renderLearn()` and its helpers**

This fully replaces `renderSubject()` (delete old lines 878–982, i.e. `fileRowsHTML` through the end of `openOsteology`'s old body — but **keep** `fileRowsHTML`, it is still used by Task 8's More screen; only delete `renderSubject` and `openOsteology`, and rewrite `openOsteology` in Task 6). Add:
```javascript
const SUBJECT_GROUP = { HSS2011: { label: 'Anatomy', accent: '#72e3cf' }, ABCT2326: { label: 'Physiology', accent: '#ffba67' }, HTI17103: { label: 'Radiation science', accent: '#8ea9ff' } };
const LEARN_FILTERS = [['all', 'Everything'], ['Anatomy', 'Anatomy'], ['Physiology', 'Physiology'], ['Radiation science', 'Radiation science'], ['3d', 'Has 3D / images']];
let learnFilter = 'all';
let learnTopic = null;

function topicsWithContent() {
  const list = [];
  for (const subject of SUBJECTS) {
    const group = SUBJECT_GROUP[subject.id];
    if (!group) continue;
    for (const unit of subject.units) {
      const items = itemsForUnit(subject.id, unit.id);
      if (!items.length) continue;
      list.push({ subject, unit, group, items });
    }
  }
  return list;
}
function topicHasViewer(items) { return items.some((i) => ['id3d', 'structure', 'movement', 'diagram'].includes(i.type)); }
function topicPct(items) { return items.length ? Math.round(items.reduce((n, i) => n + itemScore(i.id), 0) / items.length * 100) : 0; }

function renderLearn() {
  setActiveNav('learn');
  const all = topicsWithContent();
  const visible = all.filter((t) => learnFilter === 'all' || (learnFilter === '3d' ? topicHasViewer(t.items) : t.group.label === learnFilter));
  if (!learnTopic || !visible.some((t) => t.unit.id === learnTopic)) learnTopic = visible[0] ? visible[0].unit.id : null;

  $$('learnFilters').innerHTML = LEARN_FILTERS.map(([id, label]) =>
    `<button class="filter-chip${learnFilter === id ? ' active' : ''}" data-filter="${id}">${esc(label)}</button>`).join('');
  $$('learnFilters').querySelectorAll('[data-filter]').forEach((b) => { b.onclick = () => { learnFilter = b.dataset.filter; renderLearn(); }; });

  $$('topicGrid').innerHTML = visible.map((t) => `
    <button class="topic-card${t.unit.id === learnTopic ? ' active' : ''}" style="--accent:${t.group.accent}" data-topic="${esc(t.unit.id)}">
      <span class="topic-tag">${esc(t.group.label)} · ${esc(t.subject.code)}</span>
      <span class="editorial" style="font-size:17px">${esc(t.unit.label)}</span>
      <span class="topic-bar"><span style="width:${topicPct(t.items)}%"></span></span>
      <span class="small">${t.items.length} item${t.items.length === 1 ? '' : 's'}${topicHasViewer(t.items) ? ' · 3D studio' : ''}</span>
    </button>`).join('') || '<div class="empty">No topics match this filter yet.</div>';
  $$('topicGrid').querySelectorAll('[data-topic]').forEach((b) => { b.onclick = () => { learnTopic = b.dataset.topic; renderLearn(); }; });

  const T = visible.find((t) => t.unit.id === learnTopic);
  $$('topicDetailPane').innerHTML = !T ? '' : `
    <div class="card" style="animation:fadeUp .22s ease">
      <span class="topic-tag">${esc(T.group.label)} · ${esc(T.subject.code)}</span>
      <h2 class="editorial" style="font-size:22px;margin:7px 0 0">${esc(T.unit.label)}</h2>
      <p class="small" style="margin-top:7px">${esc(T.subject.blurb)}</p>
      <div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap">
        <button class="primary" id="studyTopicBtn">Study this topic</button>
        ${topicHasViewer(T.items) ? '<button class="ghost" id="openViewerBtn">Open in Viewer</button>' : ''}
      </div>
      <div class="task-kicker" style="margin:18px 0 8px">${T.items.length} items · weakest first</div>
      <div style="display:grid;gap:7px">
        ${T.items.slice().sort((a, b) => itemScore(a.id) - itemScore(b.id)).map((i) => {
          const tier = tierFor(itemScore(i.id), itemAttempted(i.id));
          const color = tier >= 3 ? 'var(--green)' : tier === 2 ? 'var(--orange)' : 'var(--red)';
          return `<button class="unit-row" data-item="${esc(i.id)}"><span class="grow"><b>${esc(i.title)}</b><small>${esc((ITEM_TYPES[i.type] || {}).label || i.type)}</small></span><span class="mono" style="color:${color}">${'●'.repeat(tier)}${'○'.repeat(4 - tier)}</span></button>`;
        }).join('')}
      </div>
      <div class="small" style="margin-top:14px;padding-top:12px;border-top:1px solid var(--line)">Sourced from ${describeSource(T.items[0].sourceRefs[0]).file} · every item carries its own reference</div>
    </div>`;
  if ($$('studyTopicBtn')) $$('studyTopicBtn').onclick = () => startSession({ mode: 'subject', subject: T.subject.id, unit: T.unit.id });
  if ($$('openViewerBtn')) $$('openViewerBtn').onclick = () => goTo('viewer');
  $$('topicDetailPane').querySelectorAll('[data-item]').forEach((b) => { b.onclick = () => startSession({ mode: 'subject', subject: T.subject.id, unit: T.unit.id }); });

  showView('learnView');
}
```
`describeSource(entry)` is already imported (line 683) and returns an object — `{ file, subject, folder, location, kind, note, authored }` (study-data.js:134). `describeSource(T.items[0].sourceRefs[0]).file` above is correct as written. Note it falls back to `file: 'App-authored'` for a ref with no matching `SOURCE_FILES` entry, which is the desired display for app-authored memory aids.

- [ ] **Step 4: Verify in browser**

Reload, click Learn (once Task 9 wires nav) or temporarily call `renderLearn()` from the console. Expect: filter chips, a grid of topic cards for every unit that actually has items (spot-check: `hss.term`, `hss.osteo`, `hss.joints` should appear; `soc.files` should not, since APSS1A08 has zero `STUDY_ITEMS`), and a detail pane for the first topic showing its items sorted weakest-first with correct dot coloring.

- [ ] **Step 5: Commit**

```bash
git add outputs/radiography-study-studio.html
git commit -m "feat: replace per-subject unit list with unified Learn tree"
```

---

## Task 5: Session overlay reskin + Continue persistence

**Files:**
- Modify: `outputs/radiography-study-studio.html` — the `#sessionView` CSS only (its inner content, produced by `renderStep()`/`learnHTML()`/`rememberHTML()`/`practiseHTML()`/`applyHTML()`/`reviewHTML()`, is **not** touched by this task); `setStep()` (currently around line 1080) gains one line; `showView()` and `endSession()` get updated to treat the session as an overlay, not a routed view

- [ ] **Step 1: Give `#sessionView` overlay CSS**

Add to the `<style>` block:
```css
#sessionView.hidden{display:none}
#sessionView{position:fixed;inset:0;z-index:10;background:var(--bg);display:flex;flex-direction:column;animation:fadeUp .2s ease}
#sessionView .navcontent{flex:1;min-height:0;overflow:auto;padding:22px}
@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
```
Wrap the existing inner markup of `#sessionView` (the `.steps` div and `.session-grid`) inside a `<div class="navcontent">` so it inherits the scroll/padding behavior — i.e. change:
```html
<section class="view hidden" id="sessionView">
  <div class="steps" id="rssSteps"></div>
  <div class="session-grid">
```
to:
```html
<section class="view hidden" id="sessionView">
  <div class="navhead"><button class="ghost close" id="rssSessionClose" style="min-width:44px;min-height:44px">✕</button></div>
  <div class="navcontent">
  <div class="steps" id="rssSteps"></div>
  <div class="session-grid">
```
and add one closing `</div>` right before the section's existing closing `</section>` tag to balance the new wrapper.

- [ ] **Step 2: Persist Continue state on every step change**

In `setStep(step)` (around line 1080), after the line `session.step = step;`, add:
```javascript
  if (session.items[session.index]) saveContinue(session.items[session.index].id, step);
```

- [ ] **Step 3: Make opening/closing the session an overlay operation, not a `showView` call**

Add near the other view-management helpers (next to `showView`, around line 813):
```javascript
let tabBeforeSession = 'today';
function openSessionOverlay() {
  tabBeforeSession = currentTab || 'today';
  $$('sessionView').classList.remove('hidden');
}
function closeSessionOverlay() {
  $$('sessionView').classList.add('hidden');
  goTo(tabBeforeSession);
}
```
`currentTab` is defined in Task 9 — leave as a forward reference for now.

In `startSession(opts)` (around line 1050), replace the line `showView('sessionView');` with `openSessionOverlay();`.

Find `endSession()` (search for `function endSession`) and replace its call to `renderHome()` (if present) or `showView('homeView')` with `closeSessionOverlay(); write(STORAGE_PREFIX + 'continue', null);` — clearing Continue on a completed/ended session is intentional: a finished session has nothing left to resume.

Wire the new close button:
```javascript
$$('rssSessionClose').onclick = () => { if (session) endSession(); };
```
(replace the old `$$('rssEndBtn').onclick = ...` line, or keep both if `#rssEndBtn` still exists in the side panel — check whether Task 2's copy of the session markup kept the "End session" button; if so leave its existing handler alone and just add the new `✕` handler alongside it.)

- [ ] **Step 4: Verify in browser**

Start a Daily session from Today. Expect: full-screen overlay covers the whole app (nav rail included), stepper visible, clicking ✕ or "End session" returns to whichever tab was active before (Today, in this test). Reload the page mid-session (after clicking into Practise on some item) — Today's Continue card should now show that item at "left off at Practise" instead of "Nothing in progress".

- [ ] **Step 5: Commit**

```bash
git add outputs/radiography-study-studio.html
git commit -m "feat: make session a full-screen overlay with resumable Continue state"
```

---

## Task 6: Viewer screen (merge Osteology 3D + Radiograph placeholder)

**Files:**
- Modify: `outputs/radiography-study-studio.html` — the `#viewerView` section (renamed from `#osteologyView` in Task 2), plus `openOsteology` (deleted in Task 4, replaced here), plus `showView()`

- [ ] **Step 1: Add the segmented Viewer-source switch and Radiograph placeholder around the existing 3D markup**

Inside `#viewerView`, **before** the existing `<div class="notice">` line (the HSS2011 module notice), add:
```html
<div style="display:flex;gap:6px;padding:5px;border:1px solid var(--line);border-radius:12px;background:rgba(14,24,32,.8);align-self:flex-start;margin-bottom:12px" id="viewerTabs"></div>
```
Wrap the existing `<main class="layout">...</main>` block (the 3D skeleton stage) in a new div so it can be hidden when Radiograph is selected:
```html
<div id="viewerSkeletonPane">
  <!-- existing <main class="layout">...</main>, unchanged -->
</div>
<div id="viewerXrayPane" class="hidden">
  <div class="emptybox">No radiograph images exist in this repo yet (assets/xray/ is scaffolded and empty). Add a licence-cleared image and this pane will display it — see the note in outputs/README.md.</div>
</div>
```

- [ ] **Step 2: Wire the segmented switch in JS**

Add near `openOsteology`'s replacement:
```javascript
let viewerTab = '3d';
function renderViewerTabs() {
  const tabs = [['3d', '3D skeleton'], ['xray', 'Radiograph']];
  $$('viewerTabs').innerHTML = tabs.map(([id, label]) =>
    `<button class="ghost" style="border:0;border-radius:8px;padding:9px 15px;${viewerTab === id ? 'background:var(--teal);color:var(--onaccent)' : 'background:transparent'}" data-vtab="${id}">${esc(label)}</button>`).join('');
  $$('viewerTabs').querySelectorAll('[data-vtab]').forEach((b) => { b.onclick = () => { viewerTab = b.dataset.vtab; renderViewerTabs(); }; });
  $$('viewerSkeletonPane').classList.toggle('hidden', viewerTab !== '3d');
  $$('viewerXrayPane').classList.toggle('hidden', viewerTab !== 'xray');
}
function openViewer() {
  setActiveNav('viewer');
  renderViewerTabs();
  showView('viewerView');
}
```
(Compare mode from the prototype is deliberately **not** implemented here — the handoff doc lists "Compare mode's synchronised highlighting" under Out of scope / open questions. Two tabs, not three.)

- [ ] **Step 3: Confirm `showView` was already updated in Task 3**

Task 3's Step 3b already changed `VIEWS` to `['todayView','learnView','viewerView','reviewView','moreView']` and the special case to `if (id === 'viewerView' && window.__osteo)`. Verify both are in place — `grep -n "const VIEWS\|=== 'viewerView'" outputs/radiography-study-studio.html`. If either still names `osteologyView`, apply the change now; otherwise change nothing and move on.

Also confirm `window.__osteo` is actually defined at runtime (`typeof window.__osteo` in the console) before testing the 3D pane. Task 2's follow-up commit removed a dead `$('aboutBtn')` handler that had been aborting the entire three.js module at evaluation time; if that regressed, the Viewer will look correct but be inert.

- [ ] **Step 4: Fix the one remaining internal reference**

Search for `openOsteology` (`grep -n "openOsteology" outputs/radiography-study-studio.html`) — every call site (Task 4's "Open in Viewer" button already calls `goTo('viewer')` instead; the old call in `renderSubject` no longer exists since Task 4 deleted that function) should now be `openViewer`. Confirm none remain pointing at the deleted `openOsteology` name.

- [ ] **Step 4b: Re-check the viewport-relative sizings inside the new scroll container**

The Task 1 code review flagged that `.stage{height:min(70vh,690px);min-height:430px}` and `.dlg-scroll{max-height:min(68vh,620px)}` were both written for a page that scrolled the document. They now live inside `.navcontent`, which is itself a `flex:1;min-height:0;overflow:auto` pane under a topbar and a header — so `70vh` is no longer 70% of the space actually available to the stage, and on a short window `min-height:430px` can force the stage taller than its container.

Load the Viewer at a deliberately short window (~700px tall) and at ~600px tall. Confirm the 3D canvas is fully visible and `.navcontent` scrolls to reach the controls beneath it, rather than the stage being clipped or the page becoming unreachable. If it misbehaves, change `.stage` to be relative to its container instead of the viewport — `height:min(70vh,690px)` → `height:clamp(360px,60vh,690px)` is usually enough; report what you changed and why. If it behaves correctly at both sizes, change nothing and say so.

`.dlg-scroll` is used only inside `<dialog>` elements opened with `showModal()`, which render in the top layer outside the shell's `overflow:hidden` — so it is very likely unaffected. Confirm by opening the coverage dialog at a short window, then leave it alone.

- [ ] **Step 5: Verify in browser**

Navigate to Viewer. Expect: segmented "3D skeleton / Radiograph" switch, 3D skeleton stage boots exactly as before (drag/pinch/tap still work — this is unchanged three.js code), clicking Radiograph shows the empty-state notice instead of a broken image.

- [ ] **Step 6: Commit**

```bash
git add outputs/radiography-study-studio.html
git commit -m "feat: unify Osteology 3D studio and radiograph placeholder into one Viewer destination"
```

---

## Task 7: Review screen

**Files:**
- Modify: `outputs/radiography-study-studio.html` — the `#reviewView` placeholder; deletes `dashDialog` and `openDashboard()` (old lines 1812–1831 and the `<dialog id="dashDialog">` markup)

- [ ] **Step 1: Write the `#reviewView` markup**

```html
<section class="view hidden" id="reviewView">
  <div style="display:flex;gap:6px;padding:5px;border:1px solid var(--line);border-radius:12px;background:rgba(14,24,32,.8);align-self:flex-start;margin-bottom:13px;flex-wrap:wrap" id="reviewTabs"></div>
  <div class="card" id="reviewBody"></div>
</section>
```

- [ ] **Step 2: Write `renderReviewTab()` and the per-dimension mastery aggregate**

```javascript
let reviewTab = 'mistakes';
function dimensionAggregate(dimId) {
  const recs = Object.entries(store.mastery).filter(([k]) => k.endsWith('::' + dimId)).map(([, v]) => v).filter((r) => r.attempts > 0);
  if (!recs.length) return 0;
  return Math.round(recs.reduce((n, r) => n + masteryScore(r), 0) / recs.length * 100);
}
function renderReviewTab(tab) {
  reviewTab = tab;
  setActiveNav('review');
  $$('reviewTabs').innerHTML = [['mistakes', 'My mistakes'], ['due', 'Due'], ['mastery', 'Mastery map']].map(([id, label]) =>
    `<button class="ghost" style="border:0;border-radius:8px;padding:0 14px;min-height:38px;${reviewTab === id ? 'background:var(--teal);color:var(--onaccent)' : 'background:transparent'}" data-rtab="${id}">${esc(label)}</button>`).join('');
  $$('reviewTabs').querySelectorAll('[data-rtab]').forEach((b) => { b.onclick = () => renderReviewTab(b.dataset.rtab); });

  if (tab === 'mistakes') {
    const ids = [...new Set(store.mistakes.map((m) => m.itemId))];
    const rows = ids.map((id) => ({ item: getItem(id), n: store.mistakes.filter((m) => m.itemId === id).length })).filter((r) => r.item).sort((a, b) => b.n - a.n);
    $$('reviewBody').innerHTML = `<p class="small">Everything you have got wrong, grouped by item — not by subject.</p>
      <div style="display:grid;gap:8px;margin-top:13px">${rows.map((r) => `<div class="unit-row" style="cursor:default"><span class="grow"><b>${esc(r.item.title)}</b><small>${esc(getSubject(r.item.subject).title)}</small></span><span class="mono" style="color:${r.n >= 3 ? 'var(--red)' : 'var(--orange)'}">${r.n} lapse${r.n === 1 ? '' : 's'}</span></div>`).join('') || '<div class="empty">No mistakes recorded yet.</div>'}</div>
      ${rows.length ? '<button class="primary" id="drillMistakesBtn" style="margin-top:14px">Drill these ' + rows.length + ' →</button>' : ''}`;
    if ($$('drillMistakesBtn')) $$('drillMistakesBtn').onclick = () => startSession({ mode: 'mistakes' });
  } else if (tab === 'due') {
    const due = STUDY_ITEMS.filter((i) => itemAttempted(i.id) && itemDue(i.id));
    $$('reviewBody').innerHTML = `<p class="small">${due.length} items are due. Delayed recall only scores on the first attempt after a gap.</p>
      <div style="display:grid;gap:8px;margin-top:13px">${due.map((i) => `<div class="unit-row" style="cursor:default"><span class="grow"><b>${esc(i.title)}</b><small>${esc(getSubject(i.subject).title)}</small></span><span class="mono" style="color:var(--teal)">due</span></div>`).join('') || '<div class="empty">Nothing due right now.</div>'}</div>
      ${due.length ? '<button class="primary" id="startDueBtn" style="margin-top:14px">Start due session →</button>' : ''}`;
    if ($$('startDueBtn')) $$('startDueBtn').onclick = () => startSession({ mode: 'weakest', limit: due.length });
  } else {
    const rows = MASTERY_DIMENSIONS.map((d) => ({ ...d, pct: dimensionAggregate(d.id) })).sort((a, b) => a.pct - b.pct);
    $$('reviewBody').innerHTML = `<p class="small">Ten dimensions per item. The weakest dimension is surfaced, not the average.</p>
      <div style="display:grid;gap:8px;margin-top:13px">${rows.map((d) => `<div class="unit-row" style="cursor:default"><span class="grow"><b>${esc(d.label)}</b><small>${esc(d.hint)}</small></span><span class="mono" style="color:${d.pct >= 70 ? 'var(--green)' : d.pct >= 40 ? 'var(--orange)' : 'var(--red)'}">${d.pct}%</span></div>`).join('')}</div>
      <button class="primary" id="drillWeakest20Btn" style="margin-top:14px">Drill weakest 20 →</button>`;
    $$('drillWeakest20Btn').onclick = () => startSession({ mode: 'weakest', limit: 20 });
  }
  showView('reviewView');
}
```

- [ ] **Step 3: Delete the old dashboard**

Delete `function openDashboard() {...}` (old lines 1812–1831) and the `<dialog id="dashDialog">...</dialog>` element (old line 347). Delete the wiring lines `$$('rssDashBtn').onclick = openDashboard;`, `$$('closeDash').onclick = ...`, and `$$('dashWeakestBtn').onclick = ...` (old lines 1841, 1844, 1845) — Task 9's nav rail replaces `rssDashBtn` entirely.

- [ ] **Step 4: Verify in browser**

Navigate to Review. Click through My mistakes / Due / Mastery map. On a fresh profile expect empty states in all three; after completing a few practice questions (via a Daily session), expect populated rows with correct badge coloring.

- [ ] **Step 5: Commit**

```bash
git add outputs/radiography-study-studio.html
git commit -m "feat: replace Mastery map dialog with Review destination (mistakes/due/mastery tabs)"
```

---

## Task 8: More screen

**Files:**
- Modify: `outputs/radiography-study-studio.html` — the `#moreView` placeholder; deletes `coverageDialog`/`openCoverage()` and `aboutDialog` as separate dialogs, folding their content into this view (source-trace-per-item stays a small dialog per the handoff doc — only the *dialog-opening buttons* move to More, `openSourceDialog` itself is untouched)

- [ ] **Step 1: Write the `#moreView` markup and its render function**

```html
<section class="view hidden" id="moreView">
  <div style="display:grid;gap:11px;max-width:640px" id="moreRows"></div>
</section>
```
```javascript
function renderMore() {
  setActiveNav('more');
  /* validateCorpus() and validateApplications() each return an ARRAY of failure
     objects (study-data.js:3787 and :3802) — not a count, and COVERAGE has no
     `failures` key. The badge is the combined length. */
  const failures = validateCorpus().length + validateApplications().length;
  const hiddenSubjects = SUBJECTS.filter((s) => !itemsForSubject(s.id).length);
  const rows = [
    { title: 'Sources & coverage report', badge: `${failures} failures`, color: (failures ? 'var(--red)' : 'var(--green)'), note: `${STUDY_ITEMS.length} items, ${allQuestions().length} questions, ${Object.keys(SOURCE_FILES).length} files cited. Conflicts and duplicates listed in full.`, open: () => openCoverage(null) },
    { title: 'Subjects with no material', badge: `${hiddenSubjects.length} hidden`, color: 'var(--muted)', note: hiddenSubjects.map((s) => s.code).join(' and ') + ' have no verified sources, so they are hidden from Learn rather than shown as empty shelves.' },
    { title: 'Offline & storage', badge: '—', color: 'var(--muted)', note: 'Shell cached at install. Each 3D model caches the first time you open it.' },
    { title: 'Scheduling rules', badge: 'SM-2+', color: 'var(--muted)', note: 'SM-2 shaped, then modified by confidence, response time and repeat mistakes.' },
    { title: 'Legacy Osteology Studio', badge: 'kept', color: 'var(--muted)', note: 'The original app is still there and still works: osteology-studio.html.', open: () => window.open('./osteology-studio.html', '_blank') },
  ];
  $$('moreRows').innerHTML = rows.map((r, i) => `
    <button class="card" data-row="${i}" style="text-align:left;cursor:${r.open ? 'pointer' : 'default'}">
      <div style="display:flex;gap:12px;align-items:baseline"><span style="font-weight:700;flex:1">${esc(r.title)}</span><span class="mono" style="color:${r.color}">${esc(r.badge)}</span></div>
      <div class="small" style="margin-top:5px">${esc(r.note)}</div>
    </button>`).join('');
  rows.forEach((r, i) => { if (r.open) $$('moreRows').querySelector(`[data-row="${i}"]`).onclick = r.open; });
  showView('moreView');
}
```
`SOURCE_FILES`, `allQuestions`, `validateCorpus` and `validateApplications` are all already imported at the top of this script block (lines 680, 682 and 686 respectively) — no import changes needed.

- [ ] **Step 2: Keep `openCoverage()` as a dialog, just remove its trigger button from the topbar**

`openCoverage(focusSubject)` (old line ~1766) stays exactly as-is — it's now triggered only from the More row's `onclick`. Delete the old topbar wiring line `$$('rssCoverageBtn').onclick = () => openCoverage(null);` (old line 1840) and delete the `<button class="ghost" id="rssCoverageBtn">Coverage report</button>` markup (already removed in Task 2 Step 1 along with the rest of the old topbar — confirm it's gone, it should be).

- [ ] **Step 3: Retire the `aboutDialog` content or fold it in**

The old `#aboutDialog` (model attribution, candidate sources) has no explicit slot in the new IA. Simplest correct choice: keep the dialog and its markup exactly as-is (delete nothing here), and add one more row to the `rows` array in Step 1:
```javascript
{ title: 'Sources & model attribution', badge: '—', color: 'var(--muted)', note: 'BodyParts3D / Anatomography model licensing and candidate sources reviewed.', open: () => $$('aboutDialog').showModal() },
```

**Important — this dialog currently has no way to open or close.** Its old handlers lived in the *first* script block (the three.js module) on the long wiring line ~476, and Task 2's follow-up commit deleted them: `$('aboutBtn').onclick` referenced a button that no longer exists, and because that line is top-level module code the resulting TypeError aborted the whole 3D module before `window.__osteo` was published. Removing it was necessary to bring the 3D studio back.

The consequence is that `$('closeAbout').onclick` went with it, so the dialog's own Close button is dead. Re-wire it here, in the **second** script block, alongside the other dialog close handlers in the boot section:
```javascript
$$('closeAbout').onclick = () => $$('aboutDialog').close();
```
Do **not** put this back in the first script block — the three.js module should own only 3D concerns, and a null-reference there is fatal to the whole viewer rather than merely to one dialog.

- [ ] **Step 4: Verify in browser**

Navigate to More. Expect 6 rows (5 from the handoff spec plus the folded-in "Sources & model attribution"). Click "Sources & coverage report" — the existing coverage dialog should open unchanged. Click "Legacy Osteology Studio" — `osteology-studio.html` opens in a new tab.

- [ ] **Step 5: Commit**

```bash
git add outputs/radiography-study-studio.html
git commit -m "feat: fold coverage/about/legacy links into More destination"
```

---

## Task 9: Nav wiring, responsive rail/bottom-tab, and cleanup

**Files:**
- Modify: `outputs/radiography-study-studio.html` — `#navRail`/`#bottomTab` population, `goTo()`/`setActiveNav()` (new), final boot wiring (old lines 1837–1869), remove dead breadcrumb code

- [ ] **Step 1: Add `goTo`, `setActiveNav`, and populate both nav lists**

```javascript
const NAV_DESTS = [['today', 'Today', '◔', renderToday], ['learn', 'Learn', '▦', renderLearn], ['viewer', 'Viewer', '◉', openViewer], ['review', 'Review', '↻', () => renderReviewTab(reviewTab)], ['more', 'More', '⋯', renderMore]];
const NAV_TITLES = { today: 'Today', learn: 'One learning tree', viewer: 'Viewer', review: 'Review', more: 'More' };
let currentTab = 'today';
function setActiveNav(id) {
  currentTab = id;
  $$('navTitle').textContent = NAV_TITLES[id];
  $$('navKicker').textContent = { today: '14 due · streak', learn: 'Anatomy · physiology · radiation science', viewer: 'Model and images in one place', review: 'Mistakes, due items, mastery', more: 'Sources, coverage, settings' }[id];
  document.querySelectorAll('.navrail button, .bottomtab button').forEach((b) => b.classList.toggle('active', b.dataset.nav === id));
}
function goTo(id) { const dest = NAV_DESTS.find((d) => d[0] === id); if (dest) dest[3](); }
function renderNavButtons() {
  const html = NAV_DESTS.map(([id, label, icon]) => `<button data-nav="${id}"><span class="ic">${icon}</span><span>${esc(label)}</span></button>`).join('');
  $$('navRail').insertAdjacentHTML('beforeend', html);
  $$('bottomTab').innerHTML = html;
  document.querySelectorAll('.navrail [data-nav], .bottomtab [data-nav]').forEach((b) => { b.onclick = () => goTo(b.dataset.nav); });
}
```

- [ ] **Step 2: Replace the old boot wiring**

Replace old lines 1837–1856:
```javascript
migrate();
$$('rssHomeBtn').onclick = renderHome;
$$('rssBackSubject').onclick = () => renderSubject('HSS2011');
$$('rssCoverageBtn').onclick = () => openCoverage(null);
$$('rssDashBtn').onclick = openDashboard;
$$('closeSource').onclick = () => $$('sourceDialog').close();
$$('closeCoverage').onclick = () => $$('coverageDialog').close();
$$('closeDash').onclick = () => $$('dashDialog').close();
$$('dashWeakestBtn').onclick = () => { $$('dashDialog').close(); startSession({ mode: 'weakest', limit: 20 }); };
$$('rssSkipBtn').onclick = () => { ... };
$$('rssEndBtn').onclick = () => { if (session) endSession(); else renderHome(); };
window.addEventListener('keydown', (e) => { ... });
renderHome();
```
with:
```javascript
migrate();
renderNavButtons();
$$('closeSource').onclick = () => $$('sourceDialog').close();
$$('closeCoverage').onclick = () => $$('coverageDialog').close();
$$('rssSkipBtn').onclick = () => {
  if (!session) return;
  if (session.index >= session.items.length - 1) return endSession();
  session.index += 1; session.qIndex = 0; session.seqOrder = null; session.matchRights = null; session.diagramTarget = null; session.diagramReveal = null;
  if (window.__osteo && window.__osteo.endMovement) { window.__osteo.endMovement(); const b = $$('mvBar'); if (b) b.classList.add('hidden'); const bk = $$('mvBackToSession'); if (bk) bk.classList.add('hidden'); }
  setStep('learn');
};
$$('rssEndBtn').onclick = () => { if (session) endSession(); };
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !document.querySelector('dialog[open]') && session) { /* let the osteology handler own Escape in its own view */ }
});
renderToday();
```
(the `rssBackSubject` button was inside the old osteology notice block — check whether Task 2's cut-and-paste of that markup into `#viewerView` kept `id="rssBackSubject"`; if so, either delete that button from the markup entirely — Viewer no longer has a concept of "back to HSS2011" since it's a top-level destination — or repoint it to `() => { learnFilter = 'Anatomy'; learnTopic = 'hss.osteo'; goTo('learn'); }`. Prefer deleting the button; simpler and matches the "back is contextual, only on iPhone" rule from the handoff doc.)

- [ ] **Step 3: Remove all remaining dead breadcrumb code**

```bash
grep -n "crumbs(\|rssCrumbs\|function crumbs" outputs/radiography-study-studio.html
```
Delete the `function crumbs(parts) {...}` definition (old lines 822–829) and every call site the grep finds (inside the old `renderSubject`/`startSession`/`openOsteology`, all already superseded by Tasks 4/5/6 — if any call sites still exist after those tasks, delete just the `crumbs([...])` line, leaving the rest of the surrounding function intact).

- [ ] **Step 4: Full manual QA pass**

Reload from a cleared profile (`localStorage.clear()` in devtools console, then reload):
- [ ] Today loads by default, all three session tiles start a session
- [ ] Nav rail (desktop width) and bottom tab bar (resize below 900px) both navigate correctly and highlight the active destination
- [ ] Learn: filters work, topic detail updates, "Study this topic" and "Open in Viewer" both work
- [ ] A full Learn → Practise → correct/incorrect → confidence → Review step run completes without console errors, and Continue reflects it correctly if you exit mid-session
- [ ] Viewer: 3D drag/zoom/tap-to-select still works exactly as before; Radiograph tab shows the placeholder
- [ ] Review: all three tabs render, "Drill" CTAs start the right session
- [ ] More: coverage dialog, about dialog, and the legacy studio link all open correctly
- [ ] Resize to <900px width — nav rail hides, bottom tab bar appears, session overlay still covers full screen

- [ ] **Step 5: Commit**

```bash
git add outputs/radiography-study-studio.html
git commit -m "feat: wire nav rail/bottom-tab destinations, remove dead breadcrumb code"
```

---

## Task 10: Service worker cache bump and final README note

**Files:**
- Modify: `outputs/sw.js` (bump `CACHE_VERSION`), `outputs/README.md` (one line noting the IA redesign date)

- [ ] **Step 0: Cache the Google Fonts so the app stays genuinely offline-first**

Task 1 added `<link>` tags for Instrument Sans and Newsreader from `fonts.googleapis.com` / `fonts.gstatic.com`. The service worker does **not** cache them: `isCdn()` (`outputs/sw.js:66`) matches only `cdn.jsdelivr.net`, and the fetch handler bails on all other cross-origin requests (`outputs/sw.js:106`, `if (url.origin !== self.location.origin) return;`). So offline typography rests entirely on the HTTP cache — and while the font *files* are `max-age=31536000`, the *stylesheet* declaring the `@font-face` rules is only `max-age=86400`. Study offline more than a day after your last online visit and no `@font-face` is ever declared, so both typefaces fall back regardless of what is cached.

This is the constraint the handoff doc raised (`README.md:197`: "if the codebase must stay offline-only, self-host both or fall back to `ui-sans-serif` and a system serif") and which the plan dropped in translation. Self-hosting would require new files under `assets/`, which is on the do-not-modify list — so extend the existing cache-first CDN path instead. This matches the strategy `sw.js` already documents for three.js at lines 16–19, and both Google hosts send CORS headers so responses are non-opaque and `response.ok` is true, meaning the existing `cacheFirst` helper works unmodified.

Change `outputs/sw.js:66` from:
```javascript
function isCdn(url) { return url.hostname === 'cdn.jsdelivr.net'; }
```
to:
```javascript
function isCdn(url) {
  return url.hostname === 'cdn.jsdelivr.net'
      || url.hostname === 'fonts.googleapis.com'
      || url.hostname === 'fonts.gstatic.com';
}
```
Read the actual line before editing — the exact formatting may differ from what is quoted here.

- [ ] **Step 1: Bump `CACHE_VERSION`**

It is currently `'v1'` at `outputs/sw.js:24`, and feeds three derived cache names on lines 25–27 (`rss-shell-`, `rss-models-`, `rss-cdn-`). Change just the one line:
```javascript
const CACHE_VERSION = 'v2';
```
This forces every previously-installed PWA client to refetch the new shell instead of serving the stale cached HTML/CSS indefinitely; old caches are pruned on activate (per the comment at sw.js:21).

- [ ] **Step 2: Verify offline behavior in real Chrome (not the in-app Browser pane — service workers don't register there)**

Open `http://localhost:8080/radiography-study-studio.html` in actual Chrome, DevTools → Application → Service Workers, confirm the new worker activates and the old cache name is evicted (check the Cache Storage list). Then toggle "Offline" in the Network tab and reload — the app shell should still load.

- [ ] **Step 3: Commit and merge**

```bash
git add outputs/sw.js
git commit -m "chore: bump CACHE_VERSION for IA redesign shell rewrite"
```
Then follow `superpowers:finishing-a-development-branch` to decide how `ia-redesign` gets merged back to `master` — do not merge silently; that skill will walk through the options.

---

## Self-review notes (already applied above, recorded for the executor's awareness)

- **Compare mode** (Viewer's third segment in the prototype) is explicitly out of scope per the handoff doc's own "Out of scope" section — Task 6 implements only 3D skeleton + Radiograph, two segments, not three. Do not add Compare without checking with the user first, since the handoff doc itself flags it as undesigned.
- **Bottom sheets** from the prototype (search sheet, source sheet, "⋯" viewer controls sheet) are **not** rebuilt as a new custom component in this plan — the app already has working `<dialog>` elements (`sourceDialog`, `coverageDialog`, `aboutDialog`) and this plan reuses them as-is rather than reimplementing a sheet system, to minimize risk. If the user specifically wants the visual bottom-sheet treatment (full-width, bottom-anchored, `fadeUp` animation) instead of the browser's native centered `<dialog>` chrome, that is a follow-up CSS-only task against the existing dialogs, not covered here.
- **Radiograph windowing/isolate/region-filter controls**, listed in the prototype's `⋯` sheet, already exist as the individual icon buttons in the old `.stage-controls` row (`#isolateBtn`, `#regionButtons`, etc.) — Task 6 does not hide them behind a new menu; they stay visible exactly as today. Consolidating them into a menu is a cosmetic follow-up, not required for the IA to be correct.
- Every task that adds a new `localStorage` key (`rss.v1.continue` via `STORAGE_PREFIX + 'continue'`) uses the existing `read`/`write` helpers and the existing `STORAGE_PREFIX`/versioning convention — no new persistence pattern introduced.
