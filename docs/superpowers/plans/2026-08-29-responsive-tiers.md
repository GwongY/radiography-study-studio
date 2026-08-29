# Responsive Tiers Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the app's two-tier responsive model (≤900px phone / >900px desktop) into three designed tiers — phone ≤700px, tablet 701–1020px, desktop ≥1021px — so iPad portrait gets the icon rail and two-column layouts, iPad landscape gets tuned stage heights, and PC gets reading caps.

**Architecture:** Pure CSS re-tiering plus migration of three inline grid styles to classes. No JavaScript changes, no viewer DOM changes (the 3D module's top-level button wiring is fatal ground — nothing is deleted). Spec: `docs/superpowers/specs/2026-08-29-responsive-tiers-design.md`.

**Tech Stack:** Plain HTML/CSS/vanilla ES modules (no build step — patch `radiography-study-studio.html` directly, never `build.py`). Service worker cache bump in `sw.js`.

**Key repo facts:**
- App: `outputs/radiography-study-studio.html` (single file, ~5000 lines; CSS in two `<style>`-equivalent blocks inside `<head>`, all shown as single long lines in places).
- Serve: `python -m http.server 8420 --directory outputs` → `http://localhost:8420/radiography-study-studio.html`. ES modules will not load over `file://`.
- After any edit run `node work/load-check.mjs` (evaluates both inline modules; catches load-time kills like the TDZ bug of 2026-08-28).
- Line numbers below refer to the file as of this writing; verify with Grep/Read before each edit. All `old_string` values are unique substrings — if one fails to match, re-read the area and adapt rather than guessing.

---

### Task 1: Baseline snapshot and docs commit

**Files:**
- Create: `work/id-inventory-before.txt` (untracked scratch — `work/scan-output.txt` is already deliberately untracked)
- Commit: `docs/superpowers/specs/2026-08-29-responsive-tiers-design.md`, `docs/superpowers/plans/2026-08-29-responsive-tiers.md`

- [ ] **Step 1: Capture the button/id inventory baseline** (viewer fragility insurance — diffed again in Task 8)

```bash
node -e "const fs=require('fs');const s=fs.readFileSync('outputs/radiography-study-studio.html','utf8');const ids=[...s.matchAll(/id=\"([^\"]+)\"/g)].map(m=>m[1]).sort();fs.writeFileSync('work/id-inventory-before.txt',ids.join('\n'));console.log(ids.length+' ids captured')"
```

Expected: prints a count (should be several hundred — the app is large). Record the number.

- [ ] **Step 2: Baseline load-check**

```bash
node work/load-check.mjs
```

Expected: clean output, no load-time errors. If this fails BEFORE any edits, stop and investigate — do not start on a broken baseline.

- [ ] **Step 3: Commit the spec and plan docs**

```bash
git add docs/superpowers/specs/2026-08-29-responsive-tiers-design.md docs/superpowers/plans/2026-08-29-responsive-tiers.md
git commit -m "docs: responsive tiers spec and implementation plan"
```

---

### Task 2: Migrate inline view grids to classes (enables all tiers; fixes the Learn drill squeeze bug)

**Files:**
- Modify: `outputs/radiography-study-studio.html` (three markup attributes at lines ~549, ~554, ~578, ~581; one new CSS block after line ~357)

The inline `style="display:grid…"` on `#todayGrid`, `#sessionTiles`, `#learnGrid`, `#topicGrid` outranks every stylesheet rule, so no media query can respond to them today. On narrow screens the drilled Learn pane is squeezed into the `1fr` track beside a reserved empty 320px column.

- [ ] **Step 1: Replace the Today grid markup**

Edit (old → new):

```html
<div style="display:grid;grid-template-columns:minmax(0,1.6fr) minmax(280px,.7fr);gap:14px;align-items:start" id="todayGrid">
```

becomes

```html
<div class="today-grid" id="todayGrid">
```

- [ ] **Step 2: Replace the session tiles markup**

```html
<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px" id="sessionTiles"></div>
```

becomes

```html
<div class="session-tiles" id="sessionTiles"></div>
```

- [ ] **Step 3: Replace the Learn grid markup**

```html
<div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(320px,.9fr);gap:14px;align-items:start" id="learnGrid">
```

becomes

```html
<div class="learn-grid" id="learnGrid">
```

- [ ] **Step 4: Replace the topic grid markup**

```html
<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px" id="topicGrid"></div>
```

becomes

```html
<div id="topicGrid"></div>
```

- [ ] **Step 5: Add the grid CSS with tier rules**

Insert immediately AFTER the line `@media(min-width:901px){#navBackBtn{display:none}}` (~line 357, will become 701 in Task 3):

```css
/* ---------- Responsive view grids (migrated from inline styles so tiers apply) ---------- */
.today-grid{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(280px,.7fr);gap:14px;align-items:start}
.session-tiles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.learn-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(320px,.9fr);gap:14px;align-items:start}
#topicGrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(232px,1fr));gap:10px}
@media(max-width:700px){
  .today-grid{grid-template-columns:1fr}
  .session-tiles{grid-template-columns:1fr}
  .learn-grid{grid-template-columns:1fr}
}
```

Note: `#topicGrid` deliberately becomes `auto-fill minmax(232px,1fr)` — topic cards flow 3–4 across on wide screens instead of being pinned at two. The `#learnGrid.drilled` pane-swap rules elsewhere key off the id, which is unchanged.

- [ ] **Step 6: Load-check**

```bash
node work/load-check.mjs
```

Expected: clean.

- [ ] **Step 7: Browser verification**

With `python -m http.server 8420 --directory outputs` running, open `http://localhost:8420/radiography-study-studio.html` in Chrome DevTools responsive mode:
- 1194×834 (iPad landscape): Today shows main + right sidebar column; Learn shows list + detail side by side; three session tiles in a row.
- 834×1194 (iPad portrait): grids are two-column already (the classes respond from 701px up) — bottom tabs will still be present because the nav re-tier is Task 3. Expected at this stage.
- 390×844 (phone): Today single column (sidebar cards stack below), session tiles stacked, Learn drill: tap a topic → detail pane now **full width** (this is the bug fix; before, it was squeezed beside a ghost 320px track).

Expected: all three pass. Commit:

```bash
git add outputs/radiography-study-studio.html
git commit -m "responsive: migrate inline view grids to tiered CSS classes"
```

---

### Task 3: Re-tier navigation (rail from 701px, bottom tabs phone-only)

**Files:**
- Modify: `outputs/radiography-study-studio.html` (~lines 295–304 and ~357)

- [ ] **Step 1: Move the nav-shell phone block to ≤700px**

The block at ~295 (containing `.navrail{display:none}`, `.navmain{width:100%}`, `.app-body{flex-direction:column}`, `.bottomtab{display:flex…}`, `.navcontent{padding:14px 14px 20px}`) — change only its query:

```css
@media(max-width:900px){
```

becomes (the nav-shell block only — it is followed by the comment `/* ---------- IA redesign: session overlay ---------- */`):

```css
@media(max-width:700px){
```

This single edit makes `.navrail` visible again from 701–900px (iPad portrait) because the rail's base rule (~283) is no longer overridden there.

- [ ] **Step 2: Keep the back button off tablet**

```css
@media(min-width:901px){#navBackBtn{display:none}}
```

becomes

```css
@media(min-width:701px){#navBackBtn{display:none}}
```

- [ ] **Step 3: Load-check**

```bash
node work/load-check.mjs
```

Expected: clean.

- [ ] **Step 4: Browser verification**

- 834×1194 (iPad portrait): icon rail on the left; bottom tab bar gone; back button (if Learn drilled state was left on, reload first) not visible.
- 390×844 (phone): bottom tab bar present, rail gone.
- 1194×834 (iPad landscape): rail present (unchanged behavior).

Commit:

```bash
git add outputs/radiography-study-studio.html
git commit -m "responsive: icon rail from 701px, bottom tabs phone-only"
```

---

### Task 4: Re-triage every remaining 900/960px rule

**Files:**
- Modify: `outputs/radiography-study-studio.html` (lines ~74, ~336, ~349, ~353–356, ~391, ~439, ~443–447, ~455–460, ~479–482, ~512–518)

Keep all `vh` values exactly as they are in this task (Task 5 converts them to `dvh`). Each edit changes only the query value or relocates rules between blocks.

Deliberately NOT touched: the legacy osteology-studio block at ~lines 29–30 (`@media(max-width:900px)` and `(max-width:560px)`). Its `.layout/.below/.topbar` selectors are gone from the DOM, and its `.stage{height:58vh…}` rules are overridden everywhere by the more specific `.stagewrap .stage{height:100%}` (~line 361) — provably inert, and that area borders the fragile 3D module.

- [ ] **Step 1: Session-grid collapse point to ≤1020px** (~line 74)

```css
@media(max-width:960px){.session-grid{grid-template-columns:1fr}}
```

becomes

```css
@media(max-width:1020px){.session-grid{grid-template-columns:1fr}}
```

- [ ] **Step 2: Search sheet bottom-sheet style to ≤700px** (~line 336)

```css
@media(max-width:900px){.sheetscrim{padding:0}.sheet{max-width:none;border-radius:18px 18px 0 0;max-height:80vh}}
```

becomes

```css
@media(max-width:700px){.sheetscrim{padding:0}.sheet{max-width:none;border-radius:18px 18px 0 0;max-height:80vh}}
```

- [ ] **Step 3: Session column phone paddings to ≤700px** (~line 349)

```css
@media(max-width:900px){.sessioncol .stagecard{padding:16px}.sessprog{width:70px}}
```

becomes

```css
@media(max-width:700px){.sessioncol .stagecard{padding:16px}.sessprog{width:70px}}
```

- [ ] **Step 4: Learn drill-in to phone-only** (~lines 353–356)

```css
@media(max-width:900px){
  #learnGrid.drilled #topicListPane{display:none}
  #learnGrid:not(.drilled) #topicDetailPane{display:none}
}
```

becomes

```css
@media(max-width:700px){
  #learnGrid.drilled #topicListPane{display:none}
  #learnGrid:not(.drilled) #topicDetailPane{display:none}
}
```

(Tablet now shows both panes side by side via `.learn-grid` from Task 2; the `drilled` class is simply inert above 700px.)

- [ ] **Step 5: X-ray pane height rule to ≤700px** (~line 391)

```css
@media(max-width:900px){.xraywrap{height:min(58vh,460px)}}
```

becomes

```css
@media(max-width:700px){.xraywrap{height:min(58vh,460px)}}
```

- [ ] **Step 6: Flowkey hidden through tablet** (~line 439)

```css
@media (max-width:900px){.flowkey{display:none}}
```

becomes

```css
@media (max-width:1020px){.flowkey{display:none}}
```

- [ ] **Step 7: Layerrail bottom-row mode to phone-only** (~lines 443–447)

```css
@media(max-width:900px){
  .layerrail{max-width:none;left:14px;right:14px;top:auto;bottom:64px;flex-direction:row;flex-wrap:wrap;gap:5px}
  .layerchip{min-height:36px;padding:6px 10px}
  .layerchip .cnt,.layerhint{display:none}
}
```

becomes the same block with `@media(max-width:700px){` — tablet portrait keeps the left overlay chip column.

- [ ] **Step 8: Compact ctrlpill labels to phone-only** (~lines 455–460)

```css
@media(max-width:900px){
  .ctrlpill{gap:4px;padding:5px;max-width:calc(100% - 16px)}
  .ctrlpill .icon-btn{min-width:44px;padding:0 9px;font-size:12px}
  .lbl-full{display:none}
  .lbl-abbr{display:inline}
}
```

becomes the same block with `@media(max-width:700px){`.

- [ ] **Step 9: Rewrite the viewer narrow block into two tiers and drop the duplicate** (~lines 479–482 and ~512–518)

Delete the standalone phone-static block at ~479–482 (it merges into the ≤1020 block below, which sits later in the file so the cascade order documented in its comment is preserved):

```css
/* On a phone the panel is not a scroll box -- it stacks under the model -- so
   pinning the controls would float them over the page instead. Must come after
   the rules above: same specificity, later wins. */
@media (max-width:900px){.modebar.tight,.studypool{position:static;background:none}}
```

becomes

```css
/* Docked below the stage on tablet and phone, the panel is not a scroll box --
   so pinning the controls would float them over the page instead. Must come
   after the sticky rules above: same specificity, later wins. */
```

(the comment stays; the media rule moves into the next block)

Then replace the viewer narrow block at ~512–518:

```css
@media(max-width:900px){
  .stagewrap{height:min(58vh,460px)}
  .selpanel{position:static;width:auto;max-height:none;margin-top:10px;backdrop-filter:none;background:rgba(14,24,32,.9)}
  .stagenote{max-width:calc(100% - 28px)}
  .ctrlpill{bottom:10px;gap:4px;padding:5px}
  .ctrlpill .icon-btn{min-width:44px;padding:0 8px;font-size:11px}
}
```

becomes

```css
@media(max-width:1020px){
  .stagewrap{height:min(64vh,620px)}
  .selpanel{position:static;width:auto;max-height:none;margin-top:10px;backdrop-filter:none;background:rgba(14,24,32,.9)}
  .stagenote{max-width:calc(100% - 28px)}
  .modebar.tight,.studypool{position:static;background:none}
}
@media(max-width:700px){
  .stagewrap{height:min(58vh,460px)}
  .ctrlpill{bottom:10px;gap:4px;padding:5px;max-width:calc(100% - 16px)}
  .ctrlpill .icon-btn{min-width:44px;padding:0 8px;font-size:11px}
}
```

(The ≤700 ctrlpill rules duplicate the ~455 block moved in Step 8 — the later block wins, which is the existing behavior. The selpanel dock and study-mode unpinning now apply through tablet, per the spec.)

- [ ] **Step 10: Load-check**

```bash
node work/load-check.mjs
```

Expected: clean.

- [ ] **Step 11: Browser verification**

- 834×1194 (iPad portrait): Viewer shows rail; stage ~620px capped; study panel docked full-width **below** the stage (not a 250px overlay); layer chips as a left overlay column; ctrlpill full-size labels.
- 1194×834 (iPad landscape): same docking (this is the ≤1020 tier); stage height capped by 64vh.
- 390×844 (phone): unchanged phone behaviors — compact ctrlpill, bottom-row layer chips, docked panel.
- 1440×900 (PC): unchanged — sticky study panel in its 250px overlay, flowkey visible.

Commit:

```bash
git add outputs/radiography-study-studio.html
git commit -m "responsive: re-triage 900/960px rules into tablet (701-1020) and phone (<=700) tiers"
```

---

### Task 5: dvh conversion and viewer stage tiers

**Files:**
- Modify: `outputs/radiography-study-studio.html` (lines ~133, ~323, ~360, ~407, plus the Task 4 blocks)

Pattern for every conversion: keep the `vh` declaration, then repeat it with `dvh` — older engines ignore the second. Never delete the `vh` line.

- [ ] **Step 1: Viewer stage base + iPad-landscape band** (~line 360)

```css
.stagewrap{position:relative;height:min(72vh,700px);min-height:400px;border:1px solid var(--line);border-radius:16px;overflow:hidden;background:radial-gradient(circle at 50% 42%,#1d2e35 0,#0d1820 45%,#050b10 100%)}
```

becomes

```css
.stagewrap{position:relative;height:min(72vh,700px);height:min(72dvh,700px);min-height:400px;border:1px solid var(--line);border-radius:16px;overflow:hidden;background:radial-gradient(circle at 50% 42%,#1d2e35 0,#0d1820 45%,#050b10 100%)}
@media(min-width:1021px) and (max-height:900px){.stagewrap{height:min(62vh,540px);height:min(62dvh,540px)}}
```

(The band sits directly after the base rule so it wins the source-order tie when it matches — iPad landscape windows at ~768px tall get a tighter stage so tabs + stage + caption fit one screen.)

- [ ] **Step 2: Tier stage heights to dvh** (the Task 4 blocks at ~512)

In the ≤1020 block: `.stagewrap{height:min(64vh,620px)}` becomes `.stagewrap{height:min(64vh,620px);height:min(64dvh,620px)}`
In the ≤700 block: `.stagewrap{height:min(58vh,460px)}` becomes `.stagewrap{height:min(58vh,460px);height:min(58dvh,460px)}`

- [ ] **Step 3: Search sheet base height** (~line 323)

`.sheet{width:100%;max-width:520px;…max-height:min(70vh,560px)}` — replace the substring `max-height:min(70vh,560px)` with `max-height:min(70vh,560px);max-height:min(70dvh,560px)`.

- [ ] **Step 4: Sheet mobile height** (the ≤700 block from Task 4 Step 2)

Replace `max-height:80vh}}` with `max-height:80vh;max-height:80dvh}}`.

- [ ] **Step 5: X-ray pane height** (the ≤700 block from Task 4 Step 5)

Replace `.xraywrap{height:min(58vh,460px)}` with `.xraywrap{height:min(58vh,460px);height:min(58dvh,460px)}`.

- [ ] **Step 6: Lesson figure and mount heights** (~lines 133, ~407)

Replace substring `max-height:min(52vh,430px)` with `max-height:min(52vh,430px);max-height:min(52dvh,430px)`.

In the ≤640 block: replace `height:min(42vh,300px)` with `height:min(42vh,300px);height:min(42dvh,300px)`.

- [ ] **Step 7: Load-check**

```bash
node work/load-check.mjs
```

Expected: clean.

- [ ] **Step 8: Browser verification**

- 1194×834 (iPad landscape): stage noticeably shorter than the 72vh desktop value (band active); tabs, stage and caption visible without scrolling.
- 1440×900 (PC): stage fills as before (72vh ≈ old look; dvh == vh on desktop).
- No horizontal or vertical overflow anywhere on the Viewer at all three sizes.

Commit:

```bash
git add outputs/radiography-study-studio.html
git commit -m "responsive: dvh stage/sheet heights with vh fallback, iPad-landscape stage band"
```

---

### Task 6: PC reading caps

**Files:**
- Modify: `outputs/radiography-study-studio.html` (~line 293 and ~77)

- [ ] **Step 1: Cap navcontent width** (~line 293)

```css
.navcontent{flex:1;min-height:0;overflow:auto;padding:22px}
```

becomes

```css
.navcontent{flex:1;min-height:0;overflow:auto;padding:22px;max-width:1180px;margin:0 auto}
```

(`.navmain` is a flex column, so `margin:0 auto` centers the capped column; `#sessionView .navcontent` shares the class — harmless, `.sessioncol` inside it is already capped at 720px.)

- [ ] **Step 2: Cap lesson reading width** (~line 77)

Replace substring `.lesson .body{font-size:15px;line-height:1.68;color:#dfe6ea}` with:

```css
.lesson{max-width:880px;margin:0 auto}.lesson .body{font-size:15px;line-height:1.68;color:#dfe6ea}
```

(No-op wherever the lesson already renders in a narrower container — `.sessioncol` at 720px, topic detail pane — and protects any full-width render path.)

- [ ] **Step 3: Load-check**

```bash
node work/load-check.mjs
```

Expected: clean.

- [ ] **Step 4: Browser verification**

- 1920×1080 (PC): app content centered at ≤1180px — the Viewer stage no longer stretches edge to edge; Learn topic cards flow 3–4 across within the cap.
- 1366×1024 (iPad Pro 13" landscape): content fills comfortably (cap not reached).

Commit:

```bash
git add outputs/radiography-study-studio.html
git commit -m "responsive: reading caps (navcontent 1180px, lesson 880px)"
```

---

### Task 7: Touch comfort

**Files:**
- Modify: `outputs/radiography-study-studio.html` (17 lines carrying 19 `:hover` sub-rules, plus small additions)

Wrap each hover rule in its own `@media(hover:hover){…}` **at its current position** — zero cascade change on hover-capable devices, no sticky hover on touch. The `:focus-visible` selectors inside two rules stay wrapped (harmless: keyboard focus works in the media query too).

- [ ] **Step 1: Wrap the three hover rules embedded in long base lines** (exact substring edits)

Line ~23, first occurrence:

`.ghost:hover,.icon-btn:hover,.mode-btn:hover,.region-btn:hover,.answer:hover{border-color:var(--teal);transform:translateY(-1px)}`

becomes

`@media(hover:hover){.ghost:hover,.icon-btn:hover,.mode-btn:hover,.region-btn:hover,.answer:hover{border-color:var(--teal);transform:translateY(-1px)}}`

Line ~23, second occurrence:

`.primary:hover{filter:brightness(1.08)}`

becomes

`@media(hover:hover){.primary:hover{filter:brightness(1.08)}}`

Line ~27:

`.result:hover{border-color:var(--line);background:rgba(255,255,255,.05)}`

becomes

`@media(hover:hover){.result:hover{border-color:var(--line);background:rgba(255,255,255,.05)}}`

- [ ] **Step 2: Wrap the standalone hover rules** (each is a full line; wrap the whole line)

| Line | Old (whole line or exact substring) | New |
|---|---|---|
| ~37 | `.subject-card:hover{transform:translateY(-2px);border-color:var(--accent,var(--teal))}` | `@media(hover:hover){.subject-card:hover{transform:translateY(-2px);border-color:var(--accent,var(--teal))}}` |
| ~55 | `.rss-mode:hover{border-color:var(--teal);transform:translateY(-1px)}` | `@media(hover:hover){.rss-mode:hover{border-color:var(--teal);transform:translateY(-1px)}}` |
| ~61 | `.unit-row:hover{border-color:var(--teal)}` | `@media(hover:hover){.unit-row:hover{border-color:var(--teal)}}` |
| ~109 | `.term:hover,.term:focus-visible{background:rgba(114,227,207,.13);border-radius:3px;outline:none}` | `@media(hover:hover){.term:hover,.term:focus-visible{background:rgba(114,227,207,.13);border-radius:3px;outline:none}}` |
| ~144 | `.termgrid button.gt:hover{border-color:rgba(114,227,207,.5);background:rgba(114,227,207,.07)}` | `@media(hover:hover){.termgrid button.gt:hover{border-color:rgba(114,227,207,.5);background:rgba(114,227,207,.07)}}` |
| ~148 | `.rss-mode[disabled]:hover{border-color:var(--line);background:inherit}` | `@media(hover:hover){.rss-mode[disabled]:hover{border-color:var(--line);background:inherit}}` |
| ~185 | `.opt:hover:not(:disabled){border-color:var(--teal)}` | `@media(hover:hover){.opt:hover:not(:disabled){border-color:var(--teal)}}` |
| ~198 | `.seq-item .mv button:hover{color:var(--teal);border-color:var(--teal)}` | `@media(hover:hover){.seq-item .mv button:hover{color:var(--teal);border-color:var(--teal)}}` |
| ~218 | `.struct:hover:not(:disabled){border-color:var(--teal)}` | `@media(hover:hover){.struct:hover:not(:disabled){border-color:var(--teal)}}` |
| ~235 | `.conf:hover{border-color:var(--teal)}.conf.on{border-color:var(--teal);background:rgba(114,227,207,.13);color:var(--teal);font-weight:700}` | `@media(hover:hover){.conf:hover{border-color:var(--teal)}}.conf.on{border-color:var(--teal);background:rgba(114,227,207,.13);color:var(--teal);font-weight:700}` |
| ~313 | `.topic-card:hover{border-color:var(--accent,var(--teal))}` | `@media(hover:hover){.topic-card:hover{border-color:var(--accent,var(--teal))}}` |
| ~330 | `.sres:hover,.sres:focus-visible{border-color:var(--teal);outline:none}` | `@media(hover:hover){.sres:hover,.sres:focus-visible{border-color:var(--teal);outline:none}}` |
| ~414 | `.layerchip:hover{color:var(--teal);border-color:rgba(114,227,207,.45)}` | `@media(hover:hover){.layerchip:hover{color:var(--teal);border-color:rgba(114,227,207,.45)}}` |
| ~451 | `.ctrlpill .icon-btn:hover{background:rgba(114,227,207,.16);color:var(--teal);transform:none}` | `@media(hover:hover){.ctrlpill .icon-btn:hover{background:rgba(114,227,207,.16);color:var(--teal);transform:none}}` |
| ~498 | `.pickstack li button:hover{background:rgba(255,255,255,.06);color:var(--text)}` | `@media(hover:hover){.pickstack li button:hover{background:rgba(255,255,255,.06);color:var(--text)}}` |

(Caution on line ~235: wrap ONLY the `.conf:hover` half — the `.conf.on` rule must stay outside the media query. Line ~148's `[disabled]:hover` reset stays wrapped: disabled buttons have no hover need on touch either.)

- [ ] **Step 3: Tap highlight, touch targets, input zoom insurance**

On line ~23, replace the substring `button{color:inherit}` with `button{color:inherit;-webkit-tap-highlight-color:transparent}`.

Immediately after the line `.seg.active{background:var(--teal);color:var(--onaccent)}` (~line 320), insert:

```css
@media(hover:none){.seg,.filter-chip{min-height:42px}}
.sheethead input,.search-row input,.typed-row input{font-size:16px}
```

(Inputs already inherit 16px via `button,input{font:inherit}`; the explicit rule is insurance against iOS focus-zoom if a parent font-size ever changes.)

- [ ] **Step 4: Load-check**

```bash
node work/load-check.mjs
```

Expected: clean.

- [ ] **Step 5: Browser verification**

- 1440×900 (PC): hover styles still work (mode buttons lift, options highlight) — proves the wraps did not kill desktop hover.
- Chrome DevTools "Touch" device mode at 834×1194: no sticky hover after tapping options/buttons; `.seg` chips are 42px tall.

Commit:

```bash
git add outputs/radiography-study-studio.html
git commit -m "responsive: hover styles gated to hover-capable devices, touch comfort"
```

---

### Task 8: Service worker bump and full verification sweep

**Files:**
- Modify: `outputs/sw.js` (~line 26)
- Create: `work/id-inventory-after.txt` (scratch)

- [ ] **Step 1: Bump the cache version**

```js
const CACHE_VERSION = 'v34';
```

becomes

```js
const CACHE_VERSION = 'v35';
```

(Shell changed → old caches pruned on activate. No data modules were touched, so no `?v=` changes and no SHELL alignment needed.)

- [ ] **Step 2: Diff the id inventory**

```bash
node -e "const fs=require('fs');const s=fs.readFileSync('outputs/radiography-study-studio.html','utf8');const ids=[...s.matchAll(/id=\"([^\"]+)\"/g)].map(m=>m[1]).sort();fs.writeFileSync('work/id-inventory-after.txt',ids.join('\n'));console.log(ids.length+' ids captured')"
node -e "const fs=require('fs');const a=fs.readFileSync('work/id-inventory-before.txt','utf8').split('\n');const b=fs.readFileSync('work/id-inventory-after.txt','utf8').split('\n');const added=b.filter(x=>!a.includes(x));const removed=a.filter(x=>!b.includes(x));console.log('added:',added,'removed:',removed);if(added.length||removed.length)process.exit(1)"
```

Expected: `added: [] removed: []`, exit 0. **This must pass — the plan was scoped to change zero DOM ids.**

- [ ] **Step 3: Final load-check**

```bash
node work/load-check.mjs
```

Expected: clean.

- [ ] **Step 4: Full emulation walkthrough** (server: `python -m http.server 8420 --directory outputs`)

Walk this checklist at **each** size — 1366×1024, 1194×834 (iPad landscape), 834×1194, 820×1180 (iPad portrait), 1440×900, 1920×1080 (PC):
- Today: two-column on tablet/desktop, single column on phone-tier only; Continue card renders; tiles row of 3 (tablet+) / stacked (≤700).
- Learn: topic list + detail side by side (701px+); topic cards flow naturally; open a lesson — body within 880px, figure heights sane.
- Viewer: stage height correct per tier; select a structure — study panel docked below (≤1020) or overlay right (>1020); layer chips left column; ctrlpill labels full-size (701px+); flowkey visible >1020 only.
- Session: open any session overlay — 720px column centered; options tappable; source-inline row wraps cleanly; progress bar visible.
- Search: Cmd-K / ⌕ — centered 520px sheet on tablet/desktop; results scroll within 80dvh.
- No horizontal scrollbars at any size; no element clipped at the right edge.

- [ ] **Step 5: Commit**

```bash
git add outputs/sw.js
git commit -m "sw: CACHE_VERSION v35 for responsive shell change"
```

- [ ] **Step 6: Report the iPad handoff**

Tell the user: final touch verification on a real iPad (dvh behavior, safe areas, focus-zoom, PWA re-install to pick up v35) is theirs to do over LAN — serve `outputs/` and open the page in Safari, then Add to Home Screen again if installed.
