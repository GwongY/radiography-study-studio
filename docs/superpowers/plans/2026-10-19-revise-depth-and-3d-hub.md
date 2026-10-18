# Revise: deeper Map and 3D connections hub — Implementation Plan (1 of 3)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** The Revise Map goes down to single muscles, bones, joints and nerves (Week 2
lower limb first), link reasons leave the map for numbered dots plus a list, Test me
goes, and Brain 3D becomes a connections hub centred on one topic.

**Architecture:** Depth is added as typed **leaf rows** (`outputs/revision/hss2011-leaves-w*.js`)
that a pure merge (`outputs/revision/leaves.js`) turns into the same `NODES / EDGES / TREE`
the week rule already consumes; links are derived from row fields. The 3D layout is a pure
function (`outputs/revision/hub.js`), and the link numbering is a pure function
(`outputs/revision/link-rows.js`) shared by both views through one DOM component
(`outputs/study/revise-links.js`). `revise-brain.js` is rewritten to draw the hub with the
vendored 3d-force-graph, its forces zeroed.

**Tech Stack:** Plain ES modules, no build step. Markmap (vendored), 3d-force-graph 1.80.1
(vendored), Node 24 for `work/` checks.

**Spec:** `docs/superpowers/specs/2026-10-19-revise-depth-and-3d-hub.md`

**This is plan 1 of 3.** It builds the machinery and the Week 2 data. Plan 2
(W1, W3 upper limb, W4 head, neck and trunk) and plan 3 (intake of the three W5–W7 decks,
then their leaves) are written after this one lands. Their rows have to be read off the
decks, and the row format is only proven once this plan has run.

---

## Before you start (every task)

- **Another session may be editing this tree.** When this plan was written, a second
  session ("part 2: remove the studio's drill modes", spec commit `dfc78f8`) had uncommitted
  changes in `outputs/app.css`, `outputs/radiography-study-studio.html`,
  `outputs/term-gloss.js`, `outputs/study/imports.js`, `outputs/study/reading-help.js`,
  `outputs/study/subject.js`, `outputs/study/storage-versioned-keys.js`,
  `outputs/revision/hss2011-tables.js`, `outputs/anatomy-data.js` and eight
  `outputs/studio/*.js` files. None of those changes are yours. Never `git add -A` or
  `git add .`; add paths one by one. Before committing a file you edited, run
  `git diff <file>`. If it shows hunks you did not write, **stop and ask the owner**;
  do not commit someone else's work. Git cannot stage part of a file non-interactively
  here, so a shared file has to be clean before you start on it (Task 0).
- **Line endings differ per file. Keep each file's own.**
  - CRLF: `outputs/study/revise.js`, `outputs/app.css`,
    `outputs/radiography-study-studio.html`, `CLAUDE.md`, `docs/TRAPS.md`,
    `outputs/README.md`.
  - LF: `outputs/revision/registry.js`, `outputs/study/revise-brain.js`, `outputs/sw.js`,
    `work/*.mjs`.
  - New files are LF.
  - The Edit tool keeps a file's endings. A script that edits a CRLF file should use
    `editFile(path, [[from, to]])` from `work/lib/edit-crlf.mjs`. It matches against LF
    text, writes CRLF back, and throws on a miss, so it cannot "succeed" without changing
    anything.
  - After editing, run this check; it prints `MIXED n` when a file has both endings:

```bash
node -e "const fs=require('fs');for(const f of process.argv.slice(1)){const t=fs.readFileSync(f,'utf8');const crlf=(t.match(/\r\n/g)||[]).length,lf=(t.match(/(?<!\r)\n/g)||[]).length;console.log(f,crlf&&lf?'MIXED '+Math.min(crlf,lf):crlf?'crlf':'lf');}" outputs/study/revise.js outputs/app.css outputs/radiography-study-studio.html outputs/revision/registry.js outputs/study/revise-brain.js outputs/sw.js
```

- Commits are local. **Do not push**: pushing `master` publishes the site. End every
  commit message with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## File structure

| File | Status | Responsibility |
| --- | --- | --- |
| `outputs/revision/leaves.js` | create | Pure. Row kinds, `leafLine`, `mergeLeaves(data, rows, sources)` |
| `outputs/revision/hss2011-leaves-w2.js` | create | W2 rows, read off `hss.ll.2026`, with page citations |
| `outputs/revision/link-rows.js` | create | Pure. `linkRows(nb, {label, visibleAs})`: one numbering for both views |
| `outputs/revision/hub.js` | create | Pure. `hubLayout`, `pickFirst`, `separate`, `angle`, `HUB` |
| `outputs/revision/registry.js` | modify | Merges the W2 rows; exposes `rows` for the checks |
| `outputs/study/revise-links.js` | create | DOM. `renderLinkList`, `markLinkRow`, `bindLinkList` |
| `outputs/study/revise.js` | modify | Leaf lines on the map, numbered dots, list, phone folding, Test me out, Connections in 3D |
| `outputs/study/revise-brain.js` | rewrite | The connections hub |
| `outputs/radiography-study-studio.html` | modify | List containers, 3D trail, dots and More, Test me button out |
| `outputs/app.css` | modify | Leaf line, dots, list, trail, badges; quiz CSS out |
| `outputs/sw.js` | modify | New modules in SHELL; `CACHE_VERSION` bump |
| `work/revise-pure-check.mjs` | create | Node check for the three pure modules |
| `work/revision-check.mjs` | modify | Leaf checks on the merged data, names checked against slide pages |
| `CLAUDE.md`, `docs/TRAPS.md`, `outputs/README.md`, the spec | modify | Record the change |

---

### Task 0: Pre-flight

**Files:** none changed.

- [ ] **Step 1: Record the starting state**

```bash
git status --short
git log --oneline -3
node work/revision-check.mjs | tail -2
node work/gloss-coverage-check.mjs | tail -2
node work/baseline.mjs --check | tail -3
```

Expected: `revision-check` says `ALL PASS`, and `gloss-coverage-check` says `ALL PASS`.
Write down which files `git status` lists. Anything listed now is not yours (see "Before
you start"). Write down any check that is already red too; it is red for someone else's
reasons, and you must not "fix" it.

- [ ] **Step 2: Make sure the files this plan shares with other work are clean**

```bash
git status --short outputs/app.css outputs/radiography-study-studio.html outputs/sw.js outputs/term-gloss.js docs/CODEMAP.md
```

Expected: no output. Tasks 1–4 touch none of these files, so they can go ahead either way.
If any of these files is listed, **stop before Task 5** and ask the owner to let the other
session commit (or to say whose the changes are). Tasks 5–9 edit these files, and their
commits would otherwise sweep in that session's unfinished work.

---

### Task 1: The leaf merge (`outputs/revision/leaves.js`)

**Files:**
- Create: `outputs/revision/leaves.js`
- Create: `work/revise-pure-check.mjs`

- [ ] **Step 1: Write the failing check**

Create `work/revise-pure-check.mjs`:

```js
/*
 * Revise pure-logic check — the leaf merge, the 3D hub layout and the numbered
 * links list, without a browser.
 *
 *   node work/revise-pure-check.mjs
 *
 * Synthetic inputs with known answers. The real HSS2011 data is
 * revision-check.mjs's job; this file holds the three pure modules to what they
 * promise, so a change to one fails here before it reaches a phone.
 */
import { leafLine, mergeLeaves } from '../outputs/revision/leaves.js';

let fail = 0;
const ok = (good, msg) => { console.log(`  ${good ? 'ok  ' : 'FAIL'} ${msg}`); if (!good) fail++; };
const pairKey = (a, b) => (a < b ? `${a}|${b}` : `${b}|${a}`);

console.log('\nleaf merge');
const base = {
  NODES: [{ id: 'm', l: 'Muscles', s: 'musc', w: [1], t: '' }, { id: 'j', l: 'Joints', s: 'skel', w: [1], t: '' }],
  EDGES: [['m', 'j', 'move']],
  TREE: { label: 'root', kids: [{ id: 'm' }, { id: 'j' }] },
};
const baseCopy = JSON.stringify(base);
const rows = [
  { k: 'group', id: 'g', l: 'Group', parent: 'm', w: 2, line: 'does things', src: ['x.2026', 3] },
  { k: 'joint', id: 'jh', l: 'Hip joint', parent: 'j', w: 2, line: 'ball-and-socket', src: ['x.2026', 4] },
  { k: 'muscle', id: 'mm', l: 'Muscle A', parent: 'g', w: 2, joints: { jh: 'flexion' }, note: 'strong', src: ['x.2026', 5, 6] },
  { k: 'nerve', id: 'nn', l: 'Nerve A', parent: 'm', w: 2, supplies: { mm: 'supplies the flexors', g: 'supplies the flexors' }, src: ['x.2026', 6] },
  { k: 'bone', id: 'bb', l: 'Bone A', parent: 'j', w: 2, joints: ['jh'], src: ['x.2026', 7] },
];
const merged = mergeLeaves(base, rows, { 'x.2026': 'X slides' });
ok(JSON.stringify(base) === baseCopy, 'the input data is not changed');
ok(merged.NODES.length === 7, 'every row becomes a node');
const kidsOf = (id) => { let hit = null; (function w(s) { if (s.id === id) hit = s; (s.kids || []).forEach(w); })(merged.TREE); return ((hit && hit.kids) || []).map((k) => k.id); };
ok(kidsOf('m').join() === 'g,nn' && kidsOf('g').join() === 'mm' && kidsOf('j').join() === 'jh,bb', 'each row hangs under its parent, in row order');
const has = (a, b, why) => merged.EDGES.some((e) => pairKey(e[0], e[1]) === pairKey(a, b) && e[2] === why);
ok(has('mm', 'jh', 'flexion'), "a muscle links to the joint it moves, with the action as the reason");
ok(has('nn', 'mm', 'supplies the flexors') && has('nn', 'g', 'supplies the flexors'), 'a nerve links to what it supplies');
ok(has('bb', 'jh', 'forms'), 'a bone links to the joint it forms');
const node = (id) => merged.NODES.find((n) => n.id === id);
ok(node('mm').s === 'musc' && node('jh').s === 'skel' && node('nn').s === 'pns' && node('g').s === 'musc', 'the body system comes from the kind, else from the parent');
ok(node('mm').w.join() === '2' && node('mm').leaf === 'muscle', 'a leaf carries its one week and its kind');
ok(leafLine(rows[2]) === 'flexion · strong' && leafLine(rows[3]) === 'supplies the flexors' && leafLine(rows[0]) === 'does things', "the one line: a muscle's actions and note, a nerve's targets, otherwise its line");
ok(node('mm').line === 'flexion · strong' && node('mm').t.includes('X slides, p5, 6'), 'the note carries the line and the slide pages');
let threw = false;
try { mergeLeaves(base, [{ k: 'part', id: 'p', l: 'P', parent: 'nowhere', w: 2, src: ['x.2026', 1] }]); } catch { threw = true; }
ok(threw, 'a row whose parent is not a topic or an earlier row is refused');
const twice = mergeLeaves(base, [
  { k: 'part', id: 'p', l: 'P', parent: 'm', w: 2, links: { q: 'one' }, src: ['x.2026', 1] },
  { k: 'part', id: 'q', l: 'Q', parent: 'm', w: 2, links: { p: 'two', j: 'move' }, src: ['x.2026', 1] },
]);
ok(twice.EDGES.filter((e) => pairKey(e[0], e[1]) === 'p|q').length === 1, 'the same pair is linked once, the first reason kept');
ok(mergeLeaves(base, []).EDGES.length === 1, 'no rows, no change');

console.log(fail ? `\n${fail} FAILED` : '\nALL PASS');
process.exit(fail ? 1 : 0);
```

- [ ] **Step 2: Run it to see it fail**

Run: `node work/revise-pure-check.mjs`
Expected: it fails with `Cannot find module` … `outputs/revision/leaves.js`.

- [ ] **Step 3: Write the module**

Create `outputs/revision/leaves.js`:

```js
/*
 * Revision leaves — the depth under a topic, one row per structure.
 *
 * Pure: no DOM, so work/ runs the same merge the app does. A row names its
 * parent (a topic, or a row earlier in the list), the week it was taught, the
 * slide page it comes from, and the few fields its kind needs. The links
 * between rows are DERIVED from those fields: a muscle's actions become its
 * links to the joints it moves, a bone's joints become "forms", a nerve's
 * targets become "supplies". So a few hundred leaves need no hand-written link
 * list, and the merged NODES / EDGES / TREE go through the week rule unchanged.
 * docs/superpowers/specs/2026-10-19-revise-depth-and-3d-hub.md has the model.
 *
 * A row:
 *   { k, id, l, parent, w, src: [sourceId, page, page…], match?, old?, line?, note?,
 *     joints?, supplies?, from?, links?, s? }
 *   k        group | muscle | bone | joint | nerve | part
 *   joints   muscle: { jointId: 'action at that joint' }   bone: [jointId…]
 *   supplies nerve:  { targetId: 'reason' }                 from: parent nerve or plexus
 *   links    any:    { id: 'reason' } for a link the fields above cannot say
 *   match    the words to look for on the cited page when the slide names it differently
 *   old      the row comes from an older deck because the 2026 slides do not name it
 */

export const KINDS = ['group', 'muscle', 'bone', 'joint', 'nerve', 'part'];
const KIND_SYS = { muscle: 'musc', bone: 'skel', joint: 'skel', nerve: 'pns' };

const escHTML = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pairKey = (a, b) => (a < b ? `${a}|${b}` : `${b}|${a}`);

/** The one line a leaf shows under its name. */
export function leafLine(row) {
  if (row.k === 'muscle') return [Object.values(row.joints || {}).join('; '), row.note].filter(Boolean).join(' · ');
  if (row.k === 'nerve' && !row.line) return [...new Set(Object.values(row.supplies || {}))].join(', ');
  return row.line || '';
}

function leafNote(row, line, sources) {
  const [sid, ...pages] = row.src || [];
  const from = sources[sid] || sid || 'no source';
  const where = pages.length ? `${from}, p${pages.join(', ')}` : from;
  const old = row.old ? ' · an older deck: the 2026 slides do not name it' : '';
  return `${line ? escHTML(line) : ''}<p class="rv-src">From ${escHTML(where)}${old}</p>`;
}

/**
 * The topics, links and tree with the rows added.
 * Throws when a row's parent is neither a topic nor an earlier row: the tree
 * has one parent per node, so a row cannot hang in the air.
 */
export function mergeLeaves(data, rows, sources = {}) {
  const nodes = data.NODES.slice();
  const edges = data.EDGES.slice();
  const tree = JSON.parse(JSON.stringify(data.TREE));
  const sysOf = new Map(data.NODES.map((n) => [n.id, n.s]));
  const specOf = new Map();
  (function walk(s) { if (s.id) specOf.set(s.id, s); (s.kids || []).forEach(walk); })(tree);
  const seen = new Set(edges.map((e) => pairKey(e[0], e[1])));
  const link = (a, b, why) => { const k = pairKey(a, b); if (seen.has(k)) return; seen.add(k); edges.push([a, b, why]); };

  for (const row of rows) {
    const parent = specOf.get(row.parent);
    if (!parent) throw new Error(`revision leaf ${row.id}: parent ${row.parent} is not a topic or an earlier row`);
    const s = row.s || KIND_SYS[row.k] || sysOf.get(row.parent);
    sysOf.set(row.id, s);
    const line = leafLine(row);
    nodes.push({ id: row.id, l: row.l, s, w: [row.w], t: leafNote(row, line, sources), leaf: row.k, line, src: row.src, old: !!row.old });
    const spec = { id: row.id };
    (parent.kids = parent.kids || []).push(spec);
    specOf.set(row.id, spec);
  }
  for (const row of rows) {
    if (row.k === 'muscle') for (const [j, act] of Object.entries(row.joints || {})) link(row.id, j, act);
    if (row.k === 'bone') for (const j of row.joints || []) link(row.id, j, 'forms');
    if (row.k === 'nerve') {
      for (const [t, why] of Object.entries(row.supplies || {})) link(row.id, t, why);
      if (row.from) link(row.id, row.from, 'branch of');
    }
    for (const [t, why] of Object.entries(row.links || {})) link(row.id, t, why);
  }
  return { NODES: nodes, EDGES: edges, TREE: tree };
}
```

- [ ] **Step 4: Run it to see it pass**

Run: `node work/revise-pure-check.mjs`
Expected: every line `ok`, then `ALL PASS`.

- [ ] **Step 5: Commit**

```bash
git add outputs/revision/leaves.js work/revise-pure-check.mjs
git commit -m "feat(revise): leaf rows and the pure merge that derives their links

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: One numbering for both views (`outputs/revision/link-rows.js`)

**Files:**
- Create: `outputs/revision/link-rows.js`
- Modify: `work/revise-pure-check.mjs`

- [ ] **Step 1: Add the failing checks**

In `work/revise-pure-check.mjs`, add this import under the existing one:

```js
import { linkRows } from '../outputs/revision/link-rows.js';
```

and insert this block immediately before the final `console.log(fail ? …` line:

```js
console.log('\nnumbered links list');
const names = { a: 'Alpha', b: 'Bravo', c: 'Charlie', p: 'Parent branch' };
const R = linkRows([['c', 'why c'], ['a', 'why a'], ['b', 'why b']], {
  label: (id) => names[id],
  visibleAs: (id) => (id === 'b' ? 'p' : id === 'c' ? null : id),
});
ok(R.map((r) => `${r.n}${r.id}`).join() === '1a,2b,3c', 'rows sorted by name and numbered from 1, including links not drawn');
ok(R[1].at === 'p' && R[1].inside === 'Parent branch' && R[0].inside === '', 'a link into a folded branch names the branch it is inside');
ok(R[2].at === null && R[2].inside === '', 'a link with nowhere to draw keeps its number and has no line');
ok(linkRows(undefined, { label: (id) => id }).length === 0, 'no links, no rows');
const plain = linkRows([['b', 'x'], ['a', 'y']], { label: (id) => names[id] });
ok(plain.every((r) => r.at === r.id), 'without visibleAs every link is drawn to itself (the 3D hub)');
```

- [ ] **Step 2: Run it to see it fail**

Run: `node work/revise-pure-check.mjs`
Expected: it fails with `Cannot find module` … `link-rows.js`.

- [ ] **Step 3: Write the module**

Create `outputs/revision/link-rows.js`:

```js
/*
 * Revise · which links a topic lists, in which order, under which numbers.
 *
 * Pure, and shared by the Map and the 3D hub, so a topic's links carry the
 * same numbers in both. Every link is numbered, even one the view cannot draw
 * (its target folded away on the Map, or behind "+N more" in 3D): the number
 * belongs to the link, not to the picture.
 *
 * nb         [[otherId, reason], …], i.e. ix.NB[id]
 * label      id -> display name (a Map heading key included)
 * visibleAs  id -> the id the line is drawn to (itself, or the folded branch it
 *            is inside), or null when there is nowhere to draw it
 */
export function linkRows(nb, { label, visibleAs = (id) => id }) {
  return (nb || [])
    .map(([id, why]) => ({ id, why, label: label(id) }))
    .sort((a, b) => a.label.localeCompare(b.label) || (a.id < b.id ? -1 : 1))
    .map((r, i) => {
      const at = visibleAs(r.id) || null;
      return { ...r, n: i + 1, at, inside: at && at !== r.id ? label(at) : '' };
    });
}
```

- [ ] **Step 4: Run it to see it pass**

Run: `node work/revise-pure-check.mjs`
Expected: `ALL PASS`.

- [ ] **Step 5: Commit**

```bash
git add outputs/revision/link-rows.js work/revise-pure-check.mjs
git commit -m "feat(revise): one numbering of a topic's links for the Map and the 3D

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: The hub layout (`outputs/revision/hub.js`)

**Files:**
- Create: `outputs/revision/hub.js`
- Modify: `work/revise-pure-check.mjs`

- [ ] **Step 1: Add the failing checks**

Add the import:

```js
import { HUB, angle, hubLayout, pickFirst, SYSORDER } from '../outputs/revision/hub.js';
```

and insert before the final `console.log(fail ? …` line:

```js
console.log('\n3D hub layout');
const mk = (n, sys = 'musc') => Array.from({ length: n }, (_, i) => ({ id: `n${String(i).padStart(2, '0')}`, sys, deg: n - i }));
const vec = (p) => [p.x, p.y, p.z];
const one = hubLayout({ first: mk(1) });
ok(one.shown.join() === 'n00' && Math.abs(one.pos.n00.z - HUB.R1) < 1e-6 && Math.abs(one.pos.n00.x) < 1e-6 && Math.abs(one.pos.n00.y) < 1e-6, 'one link sits straight in front of the centre');
const none = hubLayout({});
ok(none.shown.length === 0 && Object.keys(none.pos).length === 0 && none.parent === null, 'no links and no parent: only the centre');
const many = mk(40).map((n, i) => ({ ...n, sys: ['cns', 'musc', 'skel', 'pns'][i % 4] }));
const second = many.slice(0, 14).flatMap((n, i) => ['a', 'b', 'c'].map((x) => ({ id: `s${i}${x}`, via: n.id })));
const A = hubLayout({ first: many, parent: 'up', second });
ok(JSON.stringify(A) === JSON.stringify(hubLayout({ first: many, parent: 'up', second })), 'the same input gives the same layout');
ok(A.shown.length === HUB.MAX1 && A.more.length === 40 - HUB.MAX1, `at most ${HUB.MAX1} balls; the rest wait behind "+N more"`);
ok(A.shown.every((id) => Number(id.slice(1)) < HUB.MAX1), 'the balls go to the links with the most links of their own');
const sysSeq = A.shown.map((id) => many.find((n) => n.id === id).sys);
ok(sysSeq.every((s, i) => i === 0 || SYSORDER.indexOf(sysSeq[i - 1]) <= SYSORDER.indexOf(s)), 'balls of one body system sit together');
let gap1 = Infinity;
A.shown.forEach((a, i) => A.shown.slice(i + 1).forEach((b) => { gap1 = Math.min(gap1, angle(vec(A.pos[a]), vec(A.pos[b]))); }));
ok(gap1 >= HUB.GAP1 - 1e-3, `no two balls closer than ${HUB.GAP1} rad (closest ${gap1.toFixed(3)})`);
ok(A.shown.every((id) => Math.abs(A.pos[id].y) <= HUB.YMAX * HUB.R1 + 1e-6), 'no ball hides straight above or below the centre');
ok(A.parent === 'up' && Math.abs(A.pos.up.y - HUB.R1 * 1.05) < 1e-6 && Math.abs(A.pos.up.x) < 1e-9 && Math.abs(A.pos.up.z) < 1e-9, 'the parent sits at the top');
ok(A.second.length === HUB.MAX2 && new Set(A.second).size === A.second.length, `at most ${HUB.MAX2} faint balls, none twice`);
let gap2 = Infinity; let gap12 = Infinity;
A.second.forEach((a, i) => {
  A.second.slice(i + 1).forEach((b) => { gap2 = Math.min(gap2, angle(vec(A.pos[a]), vec(A.pos[b]))); });
  A.shown.concat('up').forEach((b) => { gap12 = Math.min(gap12, angle(vec(A.pos[a]), vec(A.pos[b]))); });
});
ok(gap2 >= HUB.GAP2 - 1e-3 && gap12 >= HUB.GAP2 - 1e-3, `faint balls keep ${HUB.GAP2} rad from each other and from every ball in front (closest ${Math.min(gap2, gap12).toFixed(3)})`);
ok(A.second.every((id) => Math.abs(Math.hypot(...vec(A.pos[id])) - HUB.R2) < 1e-6 && A.via[id]), 'faint balls sit on the outer sphere and know which ball they hang from');
const P = hubLayout({ first: [{ id: 'up', sys: 'musc', deg: 9 }, { id: 'x', sys: 'musc', deg: 1 }], parent: 'up' });
ok(P.shown.join() === 'x', 'the parent is never also a ball on the sphere');
const S = hubLayout({ first: mk(2), second: [{ id: 'n01', via: 'n00' }, { id: 'z', via: 'hidden' }] });
ok(S.second.length === 0, 'the next step skips what is already shown and anything hanging from a hidden ball');
ok(pickFirst(mk(3), 2).more.join() === 'n02', 'pickFirst keeps the best-linked');
```

- [ ] **Step 2: Run it to see it fail**

Run: `node work/revise-pure-check.mjs`
Expected: it fails with `Cannot find module` … `hub.js`.

- [ ] **Step 3: Write the module**

Create `outputs/revision/hub.js`:

```js
/*
 * Revise · 3D connections hub — where each ball goes.
 *
 * Pure: no three.js, no DOM, so work/revise-pure-check.mjs runs it. The topic
 * you chose sits at the centre. What it links to sits on a sphere round it
 * (shell 1), grouped by body system; the topic it hangs from on the Map sits at
 * the top; the next step out (shell 2) is spread over a larger sphere, so the
 * whole reads as a ball. Same input, same output: no randomness and no force
 * simulation, so a topic you come back to looks the way it did.
 * docs/superpowers/specs/2026-10-19-revise-depth-and-3d-hub.md.
 */

/* Sizes in the 3D library's units. GAP1 is wide enough for a name at phone width. */
export const HUB = { R1: 110, R2: 200, MAX1: 14, MAX2: 30, GAP1: 0.5, GAP2: 0.24, BAND: 0.65, YMAX: 0.8 };
export const SYSORDER = ['cns', 'pns', 'musc', 'skel', 'tissue', 'sense'];
const GOLD = Math.PI * (3 - Math.sqrt(5));
const TOP = [0, 1, 0];

const len = (v) => Math.hypot(v[0], v[1], v[2]);
const unit = (v) => { const l = len(v) || 1; return [v[0] / l, v[1] / l, v[2] / l]; };
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const sysRank = (s) => { const i = SYSORDER.indexOf(s); return i < 0 ? SYSORDER.length : i; };
const byId = (a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);

/** The angle between two directions, in radians. */
export function angle(a, b) {
  const d = (a[0] * b[0] + a[1] * b[1] + a[2] * b[2]) / ((len(a) * len(b)) || 1);
  return Math.acos(Math.max(-1, Math.min(1, d)));
}

/** Which direct links get a ball (the `max` with most links) and which wait behind "+N more". */
export function pickFirst(first, max = HUB.MAX1) {
  const ranked = first.slice().sort((a, b) => (b.deg - a.deg) || byId(a, b));
  const shown = ranked.slice(0, max).sort((a, b) => (sysRank(a.sys) - sysRank(b.sys)) || byId(a, b));
  const more = ranked.slice(max).map((n) => n.id).sort();
  return { shown, more };
}

/* Keep a direction on the unit sphere with |y| <= yMax. */
function clampY(d, yMax) {
  if (Math.abs(d[1]) <= yMax) return d;
  const y = Math.sign(d[1]) * yMax; const r = Math.sqrt(1 - y * y); const h = Math.hypot(d[0], d[2]);
  return h < 1e-9 ? [r, y, 0] : [d[0] / h * r, y, d[2] / h * r];
}

/**
 * Push apart directions closer than `gap`. `fixed` directions push but never
 * move. A pair moves apart along the chord between them, which on a unit sphere
 * opens the angle by about the same amount. Deterministic: fixed order, no
 * randomness, and a coincident pair is split along a fixed axis.
 */
export function separate(dirs, gap, fixed = [], yMax = 1, passes = 300) {
  for (let p = 0; p < passes; p++) {
    let moved = false;
    for (let i = 0; i < dirs.length; i++) {
      const push = (other, j) => {
        const a = dirs[i]; const ang = angle(a, other);
        if (ang >= gap) return;
        let d = [a[0] - other[0], a[1] - other[1], a[2] - other[2]];
        if (len(d) < 1e-9) d = cross(a, [0, 0, 1]);
        if (len(d) < 1e-9) d = [1, 0, 0];
        const both = j !== undefined;
        const k = ((gap - ang) * (both ? 0.5 : 1) + 1e-4) / len(d);
        dirs[i] = clampY(unit([a[0] + d[0] * k, a[1] + d[1] * k, a[2] + d[2] * k]), yMax);
        if (both) dirs[j] = clampY(unit([other[0] - d[0] * k, other[1] - d[1] * k, other[2] - d[2] * k]), yMax);
        moved = true;
      };
      for (let j = i + 1; j < dirs.length; j++) push(dirs[j], j);
      for (const f of fixed) push(f);
    }
    if (!moved) break;
  }
  return dirs;
}

/**
 * first   [{ id, sys, deg }]  the centre's direct links
 * parent  the topic the centre hangs from on the Map, or null
 * second  [{ id, via }]       links of the direct links, in a stable order
 * Returns positions (the centre is the origin and is not listed), and what is
 * shown, what waits behind "+N more", and which ball each faint one hangs from.
 */
export function hubLayout({ first = [], parent = null, second = [] } = {}) {
  const { shown, more } = pickFirst(first.filter((n) => n.id !== parent));
  const k = shown.length;
  const d1 = shown.map((_, i) => {
    const y = k === 1 ? 0 : HUB.BAND - (2 * HUB.BAND * (i + 0.5)) / k;
    const r = Math.sqrt(1 - y * y); const th = Math.PI / 2 + i * GOLD;
    return [Math.cos(th) * r, y, Math.sin(th) * r];
  });
  separate(d1, HUB.GAP1, parent ? [TOP] : [], HUB.YMAX);
  const at = (d, r) => ({ x: d[0] * r, y: d[1] * r, z: d[2] * r });
  const pos = {};
  shown.forEach((n, i) => { pos[n.id] = at(d1[i], HUB.R1); });
  if (parent) pos[parent] = at(TOP, HUB.R1 * 1.05);

  const dirOf = Object.fromEntries(shown.map((n, i) => [n.id, d1[i]]));
  const taken = new Set(shown.map((n) => n.id).concat(parent ? [parent] : []));
  const s2 = [];
  for (const s of second) {
    if (s2.length >= HUB.MAX2) break;
    if (taken.has(s.id) || !dirOf[s.via]) continue;
    taken.add(s.id); s2.push(s);
  }
  const perVia = {};
  const d2 = s2.map((s) => {
    const b = dirOf[s.via]; const j = (perVia[s.via] = (perVia[s.via] || 0) + 1);
    const t1 = unit(cross(b, Math.abs(b[1]) > 0.9 ? [1, 0, 0] : [0, 1, 0])); const t2 = cross(b, t1);
    const a = j * GOLD; const off = 0.32;
    return unit([0, 1, 2].map((c) => b[c] + off * (Math.cos(a) * t1[c] + Math.sin(a) * t2[c])));
  });
  separate(d2, HUB.GAP2, d1.concat(parent ? [TOP] : []), 1);
  s2.forEach((s, i) => { pos[s.id] = at(d2[i], HUB.R2); });
  return {
    pos,
    parent: parent || null,
    shown: shown.map((n) => n.id),
    more,
    second: s2.map((s) => s.id),
    via: Object.fromEntries(s2.map((s) => [s.id, s.via])),
  };
}
```

- [ ] **Step 4: Run it to see it pass**

Run: `node work/revise-pure-check.mjs`
Expected: `ALL PASS`. If only a gap check fails (closest just under the gap), raise the
`passes` default in `separate`. Never lower `GAP1` or `GAP2` to make it pass.

- [ ] **Step 5: Commit**

```bash
git add outputs/revision/hub.js work/revise-pure-check.mjs
git commit -m "feat(revise): pure layout for the 3D connections hub

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Week 2 leaves, merged, and checked against the slides

**Files:**
- Create: `outputs/revision/hss2011-leaves-w2.js`
- Modify: `outputs/revision/registry.js` (LF)
- Modify: `work/revision-check.mjs`

- [ ] **Step 1: Add the leaf checks to `work/revision-check.mjs`**

Add to the imports at the top:

```js
import { readFileSync } from 'node:fs';
import { normaliseCitationText } from './lib/source-lesson-map.mjs';
import { KINDS } from '../outputs/revision/leaves.js';

const SOURCE_TEXT = JSON.parse(readFileSync(new URL('./source-text.json', import.meta.url), 'utf8')).sources;
```

Also add these lines to the header comment's "What it holds" list:

```
 *   - every leaf row (outputs/revision/leaves.js) hangs from a real parent, is not
 *     taught before it, says what it moves or supplies, and its name is on a page
 *     of the slide deck it cites (the comparison source-check.mjs uses);
```

Then insert this block directly after the line that checks tours
(`ok(subject.tours.every(…), 'every tour names a real thread and real topics');`):

```js
  /* ---- leaves: the depth under a topic (outputs/revision/leaves.js) ---- */
  const rows = subject.rows || [];
  if (rows.length) {
    const order = new Map(rows.map((r, i) => [r.id, i]));
    const kindOf = new Map(rows.map((r) => [r.id, r.k]));
    const topicIds = new Set(data.NODES.filter((n) => !n.leaf).map((n) => n.id));
    const nodeOf = new Map(data.NODES.map((n) => [n.id, n]));
    ok(rows.every((r) => KINDS.includes(r.k)), `every leaf has a known kind (${rows.length} leaves)`);
    ok(rows.every((r) => topicIds.has(r.parent) || (order.has(r.parent) && order.get(r.parent) < order.get(r.id))), 'every leaf hangs from a topic or an earlier leaf');
    ok(rows.every((r) => Number.isInteger(r.w) && nodeOf.has(r.parent) && r.w >= firstWeek(nodeOf.get(r.parent))), 'no leaf is taught before what it hangs from');
    ok(rows.filter((r) => r.k === 'muscle').every((r) => { const j = Object.entries(r.joints || {}); return j.length > 0 && j.every(([id, act]) => kindOf.get(id) === 'joint' && String(act).trim()); }), 'every muscle moves at least one joint row, and says how');
    ok(rows.filter((r) => r.k === 'bone').every((r) => (r.joints || []).every((id) => kindOf.get(id) === 'joint')), "every bone's joints are joint rows");
    ok(rows.filter((r) => r.k === 'nerve').every((r) => Object.keys(r.supplies || {}).length > 0 && Object.keys(r.supplies).every((id) => ids.has(id)) && (!r.from || ids.has(r.from))), 'every nerve supplies something real');
    ok(rows.every((r) => Object.keys(r.links || {}).every((id) => ids.has(id))), 'every hand-written leaf link points at something real');
    const badSrc = [];
    for (const r of rows) {
      const [sid, ...pages] = r.src || [];
      const text = SOURCE_TEXT[sid];
      const needle = normaliseCitationText(r.match || r.l);
      const inRange = !!text && pages.length > 0 && pages.every((p) => Number.isInteger(p) && p >= 1 && p <= text.pages.length);
      if (!inRange || !pages.some((p) => normaliseCitationText(text.pages[p - 1]).includes(needle))) badSrc.push(`${r.id} (${sid} p${pages.join(',')}: "${needle}")`);
    }
    ok(!badSrc.length, `every leaf's name is on a page it cites${badSrc.length ? ` — ${badSrc.slice(0, 6).join('; ')}` : ''}`);
    ok(rows.every((r) => (r.old ? !/\.2026$/.test(r.src[0]) : /\.2026$/.test(r.src[0]))), 'a row marked old cites an older deck, and every other row a 2026 one');
  }
```

- [ ] **Step 2: Create the W2 file with one row, and wire the registry**

Create `outputs/revision/hss2011-leaves-w2.js`:

```js
/*
 * HSS2011 · Week 2 leaves — pelvic girdle and lower limb.
 *
 * Read off Week 2_LL _2026_CKK_upload.pdf (hss.ll.2026), page by page. One row
 * per structure the slides name, in the slide's words. `src` is [source, page,
 * page…]; work/revision-check.mjs holds that the name (or `match`, where the
 * slide words it differently) is on one of those pages. A row marked `old`
 * comes from an older deck because the 2026 slides do not name it. Joint type
 * goes in a joint's line. Row kinds and fields: outputs/revision/leaves.js.
 */
const LL = 'hss.ll.2026';
const OLD = 'hss.4.3';

export const SOURCES = {
  [LL]: 'Week 2 lower-limb slides',
  [OLD]: '4.3 Upper and Lower Limbs (older deck)',
};

export const ROWS = [
{ k: 'group', id: 'w2_pelvis', l: 'Pelvic girdle', parent: 'll_bones', w: 2, line: 'joins the lower limb to the axial skeleton; protects lower viscera; carries body weight', src: [LL, 4] },
];
```

Replace the top of `outputs/revision/registry.js` (the import block and the `data:`
line) so it reads:

```js
import * as hss2011 from './hss2011-data.js';
import { mergeLeaves } from './leaves.js';
import * as hss2011W2 from './hss2011-leaves-w2.js';
import { THREADS_HTML } from './hss2011-threads.js';
import { TABLES_HTML } from './hss2011-tables.js';
import { DECODER_HTML, SOURCES_HTML } from './hss2011-decoder.js';

/* Leaf rows, week by week (outputs/revision/leaves.js). */
const HSS2011_ROWS = [...hss2011W2.ROWS];
const HSS2011_LEAF_SOURCES = { ...hss2011W2.SOURCES };
```

and, inside `REVISION.HSS2011`, replace
`data: { NODES: hss2011.NODES, EDGES: hss2011.EDGES, TREE: hss2011.TREE },` with:

```js
    data: mergeLeaves({ NODES: hss2011.NODES, EDGES: hss2011.EDGES, TREE: hss2011.TREE }, HSS2011_ROWS, HSS2011_LEAF_SOURCES),
    rows: HSS2011_ROWS,
```

Update the registry's header comment: "Adding a subject is a new data file (nodes,
edges, tree, threads, tables, decoder) … plus one entry here" gains ", and its depth is
leaf rows merged here (outputs/revision/leaves.js)".

- [ ] **Step 3: Run the check: it passes with one row**

Run: `node work/revision-check.mjs`
Expected: `ALL PASS`, including `every leaf has a known kind (1 leaves)` and
`every leaf's name is on a page it cites`.

- [ ] **Step 4: Prove the source gate bites**

Temporarily change that row's `src: [LL, 4]` to `src: [LL, 9]` and run
`node work/revision-check.mjs`.
Expected: `FAIL every leaf's name is on a page it cites — w2_pelvis (hss.ll.2026 p9: "pelvic girdle")`.
Change it back to `[LL, 4]`.

- [ ] **Step 5: Write all the W2 rows**

Replace the `ROWS` array in `outputs/revision/hss2011-leaves-w2.js` with:

```js
export const ROWS = [
/* ---------------- bones, by region (p4-13) ---------------- */
{ k: 'group', id: 'w2_pelvis', l: 'Pelvic girdle', parent: 'll_bones', w: 2, line: 'joins the lower limb to the axial skeleton; protects lower viscera; carries body weight', src: [LL, 4] },
{ k: 'bone', id: 'w2_hipbone', l: 'Hip bone', parent: 'w2_pelvis', w: 2, line: 'ilium + ischium + pubis; with sacrum and coccyx forms the bony pelvis', joints: ['w2_j_hip', 'w2_j_si'], src: [LL, 6] },
{ k: 'part', id: 'w2_iliaccrest', l: 'Iliac crest', parent: 'w2_hipbone', w: 2, src: [LL, 5] },
{ k: 'group', id: 'w2_femreg', l: 'Femoral region', parent: 'll_bones', w: 2, match: 'femoral', src: [LL, 7] },
{ k: 'bone', id: 'w2_femur', l: 'Femur', parent: 'w2_femreg', w: 2, joints: ['w2_j_hip', 'w2_j_knee'], src: [LL, 16, 7] },
{ k: 'part', id: 'w2_epicondyle', l: 'Epicondyle', parent: 'w2_femur', w: 2, line: 'for muscle attachment', src: [LL, 7] },
{ k: 'part', id: 'w2_condyle', l: 'Condyle', parent: 'w2_femur', w: 2, line: 'for joint articulation', src: [LL, 7] },
{ k: 'group', id: 'w2_kneereg', l: 'Knee region', parent: 'll_bones', w: 2, match: 'knee', src: [LL, 8] },
{ k: 'bone', id: 'w2_patella', l: 'Patella', parent: 'w2_kneereg', w: 2, match: 'patellofemoral', joints: ['w2_j_knee'], src: [LL, 8] },
{ k: 'group', id: 'w2_legreg', l: 'Leg region', parent: 'll_bones', w: 2, match: 'leg', src: [LL, 10] },
{ k: 'bone', id: 'w2_tibia', l: 'Tibia', parent: 'w2_legreg', w: 2, joints: ['w2_j_knee', 'w2_j_ptf', 'w2_j_dtf', 'w2_j_ankle'], src: [LL, 10] },
{ k: 'part', id: 'w2_medcondyle', l: 'Medial tibial condyle', parent: 'w2_tibia', w: 2, src: [LL, 9] },
{ k: 'part', id: 'w2_latcondyle', l: 'Lateral tibial condyle', parent: 'w2_tibia', w: 2, src: [LL, 9] },
{ k: 'part', id: 'w2_medmall', l: 'Medial malleolus', parent: 'w2_tibia', w: 2, line: 'forms the medial wall of the ankle joint', src: [LL, 12] },
{ k: 'bone', id: 'w2_fibula', l: 'Fibula', parent: 'w2_legreg', w: 2, joints: ['w2_j_ptf', 'w2_j_dtf', 'w2_j_ankle'], src: [LL, 10] },
{ k: 'part', id: 'w2_latmall', l: 'Lateral malleolus', parent: 'w2_fibula', w: 2, line: 'forms the lateral wall of the ankle joint', src: [LL, 12] },
{ k: 'part', id: 'w2_iom', l: 'Interosseous membrane', parent: 'w2_legreg', w: 2, line: 'between tibia and fibula', src: [LL, 10] },
{ k: 'group', id: 'w2_ankfoot', l: 'Ankle and foot', parent: 'll_bones', w: 2, match: 'ankle & foot', src: [LL, 12] },
{ k: 'group', id: 'w2_tarsals', l: 'Tarsal bones', parent: 'w2_ankfoot', w: 2, line: 'a proximal group and a distal group', src: [LL, 12] },
{ k: 'bone', id: 'w2_talus', l: 'Talus', parent: 'w2_tarsals', w: 2, joints: ['w2_j_ankle', 'w2_j_subtalar'], src: [LL, 12] },
{ k: 'bone', id: 'w2_calcaneus', l: 'Calcaneus', parent: 'w2_tarsals', w: 2, joints: ['w2_j_subtalar'], src: [LL, 12] },
{ k: 'bone', id: 'w2_navicular', l: 'Navicular', parent: 'w2_tarsals', w: 2, src: [LL, 12] },
{ k: 'bone', id: 'w2_cuboid', l: 'Cuboid', parent: 'w2_tarsals', w: 2, src: [LL, 12] },
{ k: 'bone', id: 'w2_cuneiforms', l: 'Cuneiform bones', parent: 'w2_tarsals', w: 2, line: 'medial, intermediate, lateral', src: [LL, 12] },
{ k: 'bone', id: 'w2_metatarsals', l: 'Metatarsals', parent: 'w2_ankfoot', w: 2, line: 'I to V', match: 'metatarsal', src: [LL, 12] },
{ k: 'bone', id: 'w2_phalanges', l: 'Phalanges', parent: 'w2_ankfoot', w: 2, line: 'proximal, middle, distal', match: 'phalanx', src: [LL, 12] },

/* ---------------- joints (p5-13) ---------------- */
{ k: 'group', id: 'w2_lljoints', l: 'Lower-limb joints', parent: 'joints', w: 2, match: 'lower limb', src: [LL, 5] },
{ k: 'joint', id: 'w2_j_si', l: 'Sacroiliac joint', parent: 'w2_lljoints', w: 2, line: 'the pelvic joint', src: [LL, 6] },
{ k: 'joint', id: 'w2_j_hip', l: 'Hip joint', parent: 'w2_lljoints', w: 2, line: 'acetabulofemoral; ball-and-socket', match: 'acetabulofemoral', src: [LL, 6] },
{ k: 'joint', id: 'w2_j_knee', l: 'Knee joint', parent: 'w2_lljoints', w: 2, line: 'patellofemoral + tibiofemoral; hinge', src: [LL, 8] },
{ k: 'joint', id: 'w2_j_ptf', l: 'Proximal tibiofibular joint', parent: 'w2_lljoints', w: 2, line: 'plane joint', src: [LL, 10] },
{ k: 'joint', id: 'w2_j_dtf', l: 'Distal tibiofibular joint', parent: 'w2_lljoints', w: 2, line: 'fibrous joint', src: [LL, 10] },
{ k: 'joint', id: 'w2_j_ankle', l: 'Ankle joint', parent: 'w2_lljoints', w: 2, line: 'talocrural; hinge; plantarflexion and dorsiflexion', src: [LL, 12] },
{ k: 'joint', id: 'w2_j_subtalar', l: 'Subtalar joint', parent: 'w2_lljoints', w: 2, line: 'plane; talus on calcaneus; inversion and eversion', src: [LL, 13] },

/* ---------------- muscles: gluteal region (p14-17) ---------------- */
{ k: 'group', id: 'w2_gluteal', l: 'Gluteal region', parent: 'll_muscles', w: 2, src: [LL, 14] },
{ k: 'group', id: 'w2_glutei', l: 'Gluteal group', parent: 'w2_gluteal', w: 2, src: [LL, 14] },
{ k: 'muscle', id: 'w2_gmax', l: 'Gluteus maximus', parent: 'w2_glutei', w: 2, joints: { w2_j_hip: 'extension; lateral rotation (the chief lateral rotator)' }, links: { muscleroles: 'antagonist to hip flexion' }, src: [LL, 14, 15, 17, 25] },
{ k: 'muscle', id: 'w2_gmed', l: 'Gluteus medius', parent: 'w2_glutei', w: 2, joints: { w2_j_hip: 'abduction, medial rotation' }, note: 'stabilises the pelvis', src: [LL, 15] },
{ k: 'muscle', id: 'w2_gmin', l: 'Gluteus minimus', parent: 'w2_glutei', w: 2, joints: { w2_j_hip: 'abduction, medial rotation' }, src: [LL, 15, 14, 24] },
{ k: 'group', id: 'w2_deeprot', l: 'Deep lateral rotators', parent: 'w2_gluteal', w: 2, line: 'deep to gluteus maximus; together rotate the head of femur laterally', match: 'deep lateral rotator', src: [LL, 16, 17] },
{ k: 'muscle', id: 'w2_piriformis', l: 'Piriformis', parent: 'w2_deeprot', w: 2, joints: { w2_j_hip: 'lateral rotation' }, src: [LL, 16] },
{ k: 'muscle', id: 'w2_quadfem', l: 'Quadratus femoris', parent: 'w2_deeprot', w: 2, joints: { w2_j_hip: 'lateral rotation' }, src: [LL, 16] },
{ k: 'muscle', id: 'w2_supgem', l: 'Superior gemellus', parent: 'w2_deeprot', w: 2, joints: { w2_j_hip: 'lateral rotation' }, src: [LL, 16] },
{ k: 'muscle', id: 'w2_infgem', l: 'Inferior gemellus', parent: 'w2_deeprot', w: 2, joints: { w2_j_hip: 'lateral rotation' }, src: [LL, 16] },
{ k: 'muscle', id: 'w2_obtint', l: 'Obturator internus', parent: 'w2_deeprot', w: 2, joints: { w2_j_hip: 'lateral rotation' }, src: [LL, 16] },
{ k: 'muscle', id: 'w2_obtext', l: 'Obturator externus', parent: 'w2_deeprot', w: 2, joints: { w2_j_hip: 'lateral rotation' }, src: [LL, 16] },

/* ---------------- muscles: thigh (p18-25) ---------------- */
{ k: 'group', id: 'w2_thigh', l: 'Thigh', parent: 'll_muscles', w: 2, src: [LL, 18] },
{ k: 'group', id: 'w2_antthigh', l: 'Anterior thigh', parent: 'w2_thigh', w: 2, src: [LL, 18] },
{ k: 'muscle', id: 'w2_iliopsoas', l: 'Iliopsoas', parent: 'w2_antthigh', w: 2, joints: { w2_j_hip: 'flexion (the strongest; alone it can perform pure hip flexion)' }, note: 'iliacus + psoas major', links: { muscleroles: 'prime mover of hip flexion' }, src: [LL, 18, 20, 24, 25] },
{ k: 'muscle', id: 'w2_sartorius', l: 'Sartorius', parent: 'w2_antthigh', w: 2, joints: { w2_j_hip: 'flexion, abduction, lateral rotation', w2_j_knee: 'flexion' }, links: { muscleroles: 'synergist of hip flexion' }, src: [LL, 18, 25] },
{ k: 'muscle', id: 'w2_tfl', l: 'Tensor fascia latae', parent: 'w2_antthigh', w: 2, joints: { w2_j_hip: 'abduction, medial rotation, flexion' }, links: { muscleroles: 'synergist of hip flexion' }, src: [LL, 18, 20, 24, 25] },
{ k: 'muscle', id: 'w2_pectineus', l: 'Pectineus', parent: 'w2_antthigh', w: 2, joints: { w2_j_hip: 'adduction, flexion; assists medial rotation' }, links: { muscleroles: 'synergist of hip flexion' }, src: [LL, 18, 20, 25] },
{ k: 'group', id: 'w2_quads', l: 'Quadriceps', parent: 'w2_antthigh', w: 2, line: 'the main knee extensor', src: [LL, 21, 23] },
{ k: 'muscle', id: 'w2_rf', l: 'Rectus femoris', parent: 'w2_quads', w: 2, joints: { w2_j_hip: 'flexion', w2_j_knee: 'extension' }, note: 'the only quadriceps muscle that does both', src: [LL, 21, 23] },
{ k: 'muscle', id: 'w2_vl', l: 'Vastus lateralis', parent: 'w2_quads', w: 2, joints: { w2_j_knee: 'extension' }, src: [LL, 21] },
{ k: 'muscle', id: 'w2_vi', l: 'Vastus intermedius', parent: 'w2_quads', w: 2, joints: { w2_j_knee: 'extension' }, src: [LL, 21] },
{ k: 'muscle', id: 'w2_vm', l: 'Vastus medialis', parent: 'w2_quads', w: 2, joints: { w2_j_knee: 'extension' }, src: [LL, 21] },
{ k: 'group', id: 'w2_medthigh', l: 'Medial thigh (adductor group)', parent: 'w2_thigh', w: 2, line: 'hip adduction', match: 'medial thigh muscles', src: [LL, 19] },
{ k: 'muscle', id: 'w2_addmag', l: 'Adductor magnus', parent: 'w2_medthigh', w: 2, joints: { w2_j_hip: 'adduction (the strongest); extension (its hamstring part)' }, src: [LL, 24, 19] },
{ k: 'group', id: 'w2_postthigh', l: 'Posterior thigh (hamstring)', parent: 'w2_thigh', w: 2, line: 'the main knee flexor; also hip extension', match: 'posterior thigh muscles', links: { muscleroles: 'antagonist to hip flexion' }, src: [LL, 22, 23, 25] },
{ k: 'muscle', id: 'w2_biceps', l: 'Biceps femoris', parent: 'w2_postthigh', w: 2, joints: { w2_j_hip: 'extension', w2_j_knee: 'flexion' }, note: 'long head and short head', src: [LL, 22] },
{ k: 'muscle', id: 'w2_semiten', l: 'Semitendinosus', parent: 'w2_postthigh', w: 2, joints: { w2_j_hip: 'extension', w2_j_knee: 'flexion' }, old: true, src: [OLD, 47] },
{ k: 'muscle', id: 'w2_semimem', l: 'Semimembranosus', parent: 'w2_postthigh', w: 2, joints: { w2_j_hip: 'extension', w2_j_knee: 'flexion' }, old: true, src: [OLD, 47] },

/* ---------------- muscles: leg compartments (p27-32) ---------------- */
{ k: 'group', id: 'w2_legcomp', l: 'Leg compartments', parent: 'll_muscles', w: 2, line: 'anterior, lateral, superficial posterior, deep posterior', match: 'compartment in lower leg', src: [LL, 27] },
{ k: 'group', id: 'w2_antleg', l: 'Anterior compartment', parent: 'w2_legcomp', w: 2, line: 'dorsiflexion', src: [LL, 28] },
{ k: 'muscle', id: 'w2_ta', l: 'Tibialis anterior', parent: 'w2_antleg', w: 2, joints: { w2_j_ankle: 'dorsiflexion (the main one)', w2_j_subtalar: 'inversion (with tibialis posterior)' }, src: [LL, 28, 32] },
{ k: 'muscle', id: 'w2_ehl', l: 'Extensor hallucis longus', parent: 'w2_antleg', w: 2, joints: { w2_j_ankle: 'assists dorsiflexion' }, note: 'extends the big toe', src: [LL, 28, 32] },
{ k: 'muscle', id: 'w2_edl', l: 'Extensor digitorum longus', parent: 'w2_antleg', w: 2, joints: { w2_j_ankle: 'assists dorsiflexion' }, note: 'extends toes 2-5', src: [LL, 28, 32] },
{ k: 'group', id: 'w2_latleg', l: 'Lateral compartment', parent: 'w2_legcomp', w: 2, line: 'plantar flexion, eversion', src: [LL, 29] },
{ k: 'muscle', id: 'w2_fl', l: 'Fibularis longus', parent: 'w2_latleg', w: 2, joints: { w2_j_ankle: 'plantar flexion', w2_j_subtalar: 'eversion' }, src: [LL, 29, 32] },
{ k: 'muscle', id: 'w2_fb', l: 'Fibularis brevis', parent: 'w2_latleg', w: 2, joints: { w2_j_ankle: 'plantar flexion', w2_j_subtalar: 'eversion' }, src: [LL, 29, 32] },
{ k: 'group', id: 'w2_suppost', l: 'Superficial posterior compartment', parent: 'w2_legcomp', w: 2, line: 'plantar flexion (the main one)', src: [LL, 31, 32] },
{ k: 'muscle', id: 'w2_gastroc', l: 'Gastrocnemius', parent: 'w2_suppost', w: 2, joints: { w2_j_ankle: 'plantar flexion', w2_j_knee: 'flexion' }, note: 'running, walking, jumping', src: [LL, 31] },
{ k: 'muscle', id: 'w2_soleus', l: 'Soleus', parent: 'w2_suppost', w: 2, joints: { w2_j_ankle: 'plantar flexion' }, note: 'standing; standing up from sitting', src: [LL, 31] },
{ k: 'muscle', id: 'w2_plantaris', l: 'Plantaris', parent: 'w2_suppost', w: 2, joints: { w2_j_ankle: 'plantar flexion', w2_j_knee: 'flexion' }, src: [LL, 31] },
{ k: 'group', id: 'w2_deeppost', l: 'Deep posterior compartment', parent: 'w2_legcomp', w: 2, line: 'plantar flexion, inversion', src: [LL, 30] },
{ k: 'muscle', id: 'w2_tp', l: 'Tibialis posterior', parent: 'w2_deeppost', w: 2, joints: { w2_j_ankle: 'plantar flexion', w2_j_subtalar: 'inversion' }, note: 'stabilises the lower leg; supports the medial arch', src: [LL, 30, 32] },
{ k: 'muscle', id: 'w2_fdl', l: 'Flexor digitorum longus', parent: 'w2_deeppost', w: 2, joints: { w2_j_ankle: 'plantar flexion' }, note: 'flexes toes 2-5', src: [LL, 30, 32] },
{ k: 'muscle', id: 'w2_fhl', l: 'Flexor hallucis longus', parent: 'w2_deeppost', w: 2, joints: { w2_j_ankle: 'plantar flexion' }, note: 'flexes the big toe', src: [LL, 30, 32] },
{ k: 'group', id: 'w2_footint', l: 'Foot (intrinsic) muscles', parent: 'll_muscles', w: 2, line: 'dorsum, superficial plantar and deep plantar layers move the toes', match: 'superficial plantar', src: [LL, 34] },

/* ---------------- nerves (p33) ---------------- */
{ k: 'group', id: 'w2_llnerves', l: 'Lower-limb nerves', parent: 'plexuses', w: 2, match: 'sciatic n.', src: [LL, 33] },
{ k: 'nerve', id: 'w2_n_supglut', l: 'Superior gluteal nerve', parent: 'w2_llnerves', w: 2, supplies: { w2_gmed: 'supplies the hip abductors', w2_gmin: 'supplies the hip abductors', w2_tfl: 'supplies the hip abductors' }, match: 'superior gluteal n.', src: [LL, 33, 24] },
{ k: 'nerve', id: 'w2_n_infglut', l: 'Inferior gluteal nerve', parent: 'w2_llnerves', w: 2, supplies: { w2_gmax: 'supplies gluteus maximus' }, match: 'inferior gluteal n.', src: [LL, 33] },
{ k: 'nerve', id: 'w2_n_femoral', l: 'Femoral nerve', parent: 'w2_llnerves', w: 2, line: 'hip flexor, knee extensor', supplies: { w2_quads: 'supplies the knee extensors' }, match: 'femoral n.', src: [LL, 33] },
{ k: 'nerve', id: 'w2_n_obturator', l: 'Obturator nerve', parent: 'w2_llnerves', w: 2, supplies: { w2_medthigh: 'supplies the hip adductors' }, match: 'obturator n.', src: [LL, 33] },
{ k: 'nerve', id: 'w2_n_sciatic', l: 'Sciatic nerve', parent: 'w2_llnerves', w: 2, supplies: { w2_postthigh: 'supplies the knee flexors' }, match: 'sciatic n.', src: [LL, 33] },
{ k: 'nerve', id: 'w2_n_tibial', l: 'Tibial nerve', parent: 'w2_llnerves', w: 2, supplies: { w2_suppost: 'supplies the plantarflexors', w2_deeppost: 'supplies the plantarflexors' }, match: 'tibial n', src: [LL, 33] },
{ k: 'nerve', id: 'w2_n_comperon', l: 'Common peroneal nerve', parent: 'w2_llnerves', w: 2, supplies: { w2_antleg: 'supplies the dorsiflexors' }, match: 'common peroneal n.', src: [LL, 33] },
];
```

Notes on the content. These rows were settled with the owner; do not reopen them:
- The femoral nerve links only to the quadriceps. Slide p33 says "hip flexor", but one of
  the p24 hip flexors (TFL) is not supplied by it, so linking "hip flexor" to a muscle
  would assert something the slide does not.
- Semitendinosus and semimembranosus are not in the 2026 deck's text, so they cite the
  older deck and are marked `old`.
- The calf muscles' extras follow slide 31's layout: gastrocnemius also flexes the knee
  (running, walking, jumping), soleus is for standing, plantaris also flexes the knee.

- [ ] **Step 6: Run the checks**

Run: `node work/revision-check.mjs`
Expected: `ALL PASS`. The `growth` line now shows week 2 and later with about 90 more
topics than before.

If `every leaf's name is on a page it cites` fails for a row, read that page's text:

```bash
node -e "console.log(require('./work/source-text.json').sources['hss.ll.2026'].pages[16-1])"
```

(replace `16` with the page). Fix the row's page or `match`. Never loosen the check.

Run: `node work/revise-pure-check.mjs`. Expected: `ALL PASS`.

- [ ] **Step 7: Commit**

```bash
git add outputs/revision/hss2011-leaves-w2.js outputs/revision/registry.js work/revision-check.mjs
git commit -m "feat(revise): Week 2 lower-limb leaves, each name checked against its slide page

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Reading help for the new words

**Files:** possibly modify `outputs/term-gloss.js`.

- [ ] **Step 1: Run the gloss check**

Run: `node work/gloss-coverage-check.mjs`
Expected: either `ALL PASS`, or a list of underlined words with no gloss (the new leaf
labels and lines are now in `revisionTexts()`).

- [ ] **Step 2: If words are listed, add glosses**

First run `git diff outputs/term-gloss.js`. If it shows hunks you did not write (another
session's), **stop and ask the owner** before editing this file.

Otherwise add one entry per listed word in the "whole words" section, in the file's
format, `word: ['Plain meaning in one line.', '繁體中文'],`. For example:

```js
  acetabulofemoral: ['The hip joint: the head of the femur in the acetabulum of the hip bone.', '髖關節（髖臼股骨的）'],
```

Re-run `node work/gloss-coverage-check.mjs` until `ALL PASS`.

- [ ] **Step 3: Commit (only if the file changed)**

```bash
git add outputs/term-gloss.js
git commit -m "feat(revise): glosses for the new lower-limb leaf words

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: The links list component, its containers and CSS

**Files:**
- Create: `outputs/study/revise-links.js`
- Modify: `outputs/radiography-study-studio.html` (CRLF)
- Modify: `outputs/app.css` (CRLF)

- [ ] **Step 1: Create `outputs/study/revise-links.js`**

```js
/*
 * Revise · the numbered links list under the Map and under the 3D hub.
 *
 * One component for both views, so a topic's links read the same in each; the
 * order and numbers come from revision/link-rows.js. Tap a row and its line
 * lights up; tap the same row again and that topic opens. Nothing depends on
 * hover: the app is used on phones and iPads.
 */
import { esc } from './imports.js';

export function renderLinkList(el, rows) {
  if (!rows.length) { el.hidden = true; el.innerHTML = ''; return; }
  el.hidden = false;
  el.innerHTML = `<li class="rv-lhead">Links (${rows.length}): tap one to light it up, tap again to go there</li>${rows.map((r) => `<li><button type="button" class="rv-lrow" data-node="${esc(r.id)}"><span class="rv-ln">${r.n}</span><span class="rv-lname">${esc(r.label)}${r.inside ? ` <small>inside ${esc(r.inside)}</small>` : ''}</span><span class="rv-lwhy">${esc(r.why)}</span></button></li>`).join('')}`;
}

export function markLinkRow(el, id) {
  el.querySelectorAll('.rv-lrow').forEach((b) => b.classList.toggle('hot', b.dataset.node === id));
}

export function bindLinkList(el, { onHot, onOpen }) {
  let last = null;
  el.addEventListener('click', (ev) => {
    const b = ev.target.closest('button[data-node]'); if (!b) return;
    const { node } = b.dataset;
    if (last === node) { last = null; onOpen(node); return; }
    last = node;
    markLinkRow(el, node);
    onHot(node);
  });
  return { reset() { last = null; } };
}
```

- [ ] **Step 2: Map markup**

In `outputs/radiography-study-studio.html`, inside `<section … id="rvMap" …>`, replace

```html
              <div class="rv-mapwrap">
                <div id="rvMmwrap">
```

with

```html
              <div class="rv-mapwrap">
                <div class="rv-col">
                <div id="rvMmwrap">
```

and replace the lines that close `#rvMmwrap` and open the aside:

```html
                  <button class="rv-linkbtn" id="rvNotesBtn" type="button" hidden>Notes ↓</button>
                </div>
                <aside class="rv-side" id="rvSide" aria-live="polite"></aside>
```

with

```html
                  <button class="rv-linkbtn" id="rvNotesBtn" type="button" hidden>Notes ↓</button>
                </div>
                <ol class="rv-links" id="rvLinkList" aria-label="Why each topic links" hidden></ol>
                </div>
                <aside class="rv-side" id="rvSide" aria-live="polite"></aside>
```

- [ ] **Step 3: CSS for the leaf line, the dots and the list**

In `outputs/app.css`, replace these two existing rules:

```css
#rvLinks circle{fill:var(--rv-accent)}
#rvLinks text{font:600 11.5px 'Instrument Sans',sans-serif;font-size:calc(11.5px * var(--ts));fill:var(--rv-ink);paint-order:stroke;stroke:var(--rv-surface);stroke-width:4px;stroke-linejoin:round}
```

with:

```css
#rvLinks .rv-dot{pointer-events:all;cursor:pointer}
#rvLinks .rv-dot .hit{fill:transparent}
#rvLinks .rv-dot .ring{fill:var(--rv-surface);stroke:var(--rv-accent);stroke-width:1.4}
#rvLinks .rv-dot.hot .ring{fill:var(--rv-accent)}
#rvLinks .rv-dot text{font:600 11px 'Instrument Sans',sans-serif;font-size:calc(11px * var(--ts));fill:var(--rv-ink);text-anchor:middle}
#rvLinks .rv-dot.hot text{fill:var(--rv-accent-ink)}
#rvMm .mline{display:block;font:400 12px 'Instrument Sans',sans-serif;font-size:calc(12px * var(--ts));color:var(--rv-muted);margin-top:1px;white-space:normal}
#reviseView .rv-col{min-width:0;display:flex;flex-direction:column;gap:10px}
#reviseView .rv-links{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:4px}
#reviseView .rv-links[hidden]{display:none}
#reviseView .rv-lhead{font:500 12px ui-monospace,SFMono-Regular,Menlo,monospace;font-size:calc(12px * var(--ts));color:var(--rv-muted);text-transform:uppercase;letter-spacing:.06em;padding:2px 2px 4px}
#reviseView .rv-lrow{display:grid;grid-template-columns:28px minmax(0,1fr);gap:2px 10px;width:100%;min-height:44px;text-align:left;align-items:center;background:var(--rv-surface2);border:1px solid transparent;border-radius:8px;padding:6px 10px;cursor:pointer;color:var(--rv-ink)}
#reviseView .rv-lrow.hot{border-color:var(--rv-accent);background:var(--rv-accent-soft)}
#reviseView .rv-ln{grid-row:span 2;width:24px;height:24px;border-radius:50%;display:grid;place-items:center;font:600 12px 'Instrument Sans',sans-serif;font-size:calc(12px * var(--ts));background:var(--rv-surface);border:1.4px solid var(--rv-accent);color:var(--rv-ink)}
#reviseView .rv-lrow.hot .rv-ln{background:var(--rv-accent);color:var(--rv-accent-ink)}
#reviseView .rv-lname{font:500 14px 'Instrument Sans',sans-serif;font-size:calc(14px * var(--ts))}
#reviseView .rv-lname small{font-size:calc(12px * var(--ts));color:var(--rv-muted);font-weight:400}
#reviseView .rv-lwhy{font-size:calc(13px * var(--ts));color:var(--rv-ink2)}
#reviseView .rv-src{font-size:calc(12px * var(--ts));color:var(--rv-muted);margin:8px 0 0}
#reviseView .rv-to3d{margin:10px 0 0}
```

- [ ] **Step 4: Check the CSS rule and the endings**

Run: `node work/text-size-check.mjs`
Expected: passes. Every new size carries `* var(--ts)`.
Then run the line-ending check from "Before you start". Expected: no `MIXED`.

- [ ] **Step 5: Commit**

```bash
git add outputs/study/revise-links.js outputs/radiography-study-studio.html outputs/app.css
git commit -m "feat(revise): the numbered links list component and its place under the map

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: Map — leaf lines, numbered dots, the list, phone folding, no Test me

**Files:**
- Modify: `outputs/study/revise.js` (CRLF)
- Modify: `outputs/radiography-study-studio.html` (CRLF)
- Modify: `outputs/app.css` (CRLF)

- [ ] **Step 1: Imports**

In `outputs/study/revise.js`, replace

```js
import { glossifyNode } from './reading-help.js';
import { DEFAULT_SUBJECT, REVISION } from '../revision/registry.js?v=1';
import { autoWeek, firstWeek, lastWeekOf, newIds, pruneTree, resolveWeek, visibleEdges, visibleIds } from '../revision/weeks.js?v=1';
import { createBrain } from './revise-brain.js';
```

with

```js
import { glossifyNode } from './reading-help.js';
import { bindLinkList, markLinkRow, renderLinkList } from './revise-links.js';
import { DEFAULT_SUBJECT, REVISION } from '../revision/registry.js?v=1';
import { autoWeek, firstWeek, lastWeekOf, newIds, pruneTree, resolveWeek, visibleEdges, visibleIds } from '../revision/weeks.js?v=1';
import { linkRows } from '../revision/link-rows.js?v=1';
import { createBrain } from './revise-brain.js';
```

- [ ] **Step 2: A leaf's line on the map**

In `deriveWeek()`, inside `build`, the `if (real) { … }` block ends with
`if (ix.fresh.has(spec.id)) html += '<span class="wknew">new</span>';`. Add after that
line, still inside the block:

```js
      const line = ix.byId[spec.id].line;
      if (line) html += `<span class="mline">${esc(line.length > 48 ? `${line.slice(0, 47)}…` : line)}</span>`;
```

- [ ] **Step 3: The help text and the topic panel**

Replace the whole `homeHTML()` function with:

```js
function homeHTML() {
  return `<h3>How to read this map</h3><div class="rv-hint"><p>It is a normal mind map: six coloured branches, each opening into topics, and topics opening into single muscles, bones, joints and nerves. Tap a name to open its branch and read it here.</p><ul>
    <li>Before you open a branch, name what is inside it. That is the revision.</li>
    <li>Tapping a topic draws <b>lines to everything it links to</b>, each ending in a <b>number</b>. The <b>Links</b> list under the map gives the reason for each number. Tap a row to light up its line; tap it again to go there.</li>
    <li>The map holds <b>only what you have been taught up to the week chosen above</b>. A new week adds topics (marked <b>new</b>) and the links between them and everything before.</li>
    <li>The small tags (W1…) say when each topic was taught. The grey line under a muscle is what it does, from the slide.</li>
    <li><b>Find</b> searches names and notes. Matches stay inside their branches, so you still see where each one lives.</li>
    <li><b>Connections in 3D</b>, in a topic's notes, opens the same topic in Brain 3D, where you can walk its links.</li>
    <li>Drag to pan. Pinch, or hold Ctrl / ⌘ and scroll, to zoom. <b>Jump to</b> opens any topic by name.</li></ul></div>`;
}
```

In `renderPanel`, replace the whole `} else if (n) { … }` branch (from `} else if (n) {` to
just before `} else {`) with:

```js
  } else if (n) {
    h = `<h3>${esc(n.l)}</h3><div class="rv-tags"><span class="rv-tag sys" style="background:var(${SYSVAR[n.s].replace('--c-', '--rv-c-')})">${esc(SYS[n.s])}</span>${weeksTags(n)}</div>`;
    h += `<div class="rv-note">${n.t}</div>`;
    if (n.th && n.th.length) {
      h += '<h4>Pathways through this topic</h4><div class="nlist">';
      n.th.forEach((t) => { h += `<button type="button" class="nbtn" data-thread="${esc(t)}"><span>${esc(ix.threadTitles[t] || t)}</span><span class="rel">open →</span></button>`; });
      h += '</div>';
    }
```

This drops the old "Connected to (n)" list, because the Links list replaces it, and the
Test me hint. The Connections in 3D button is added in Task 8, together with the 3D code
it calls, so every commit in between still works.

- [ ] **Step 4: New state inside `createMap()`**

After `let tracking = 0;` add:

```js
  let rows = [];
  let hotRow = null;
  let linkList = null;
  const DOT_DX = 24; /* a dot sits this far right of the target's underline, clear of Markmap's fold circle */
  const labelOf = (id) => (ix.byId[id] ? ix.byId[id].l : ix.LABEL[id]);
```

- [ ] **Step 5: Replace `drawLinks()` and add `refreshList()`**

Replace the whole `drawLinks()` function with:

```js
  /* The links list (numbers and reasons) is made when the selection or the folding changes;
     the arcs and their numbered dots are redrawn every frame while the map moves. */
  function refreshList() {
    const list = $$('rvLinkList');
    if (!selId || !ix.byId[selId] || ix.structural.has(selId)) { rows = []; renderLinkList(list, rows); return; }
    const bx = boxes();
    rows = linkRows(ix.NB[selId], {
      label: labelOf,
      visibleAs: (id) => { let k = id; while (k && !bx[k]) k = ix.PARENT[k]; return k && k !== selId && k !== 'root' ? k : null; },
    });
    renderLinkList(list, rows);
    markLinkRow(list, hotRow);
    if (linkList) linkList.reset();
  }

  /* Cross-link arcs for the selected topic. Each leaves from the right end of the selected node's underline,
     bows out into the space beside the tree, and ends in a numbered dot just right of its target. The reason
     is in the Links list under the map, never written over the tree. */
  function drawLinks() {
    const W = wrap.clientWidth; const H = wrap.clientHeight;
    ov.setAttribute('viewBox', `0 0 ${W} ${H}`);
    linkKey = {};
    if (!selId || !rows.length) { ov.innerHTML = ''; markHot(); return; }
    const bx = boxes(); const s = bx[selId]; if (!s) { ov.innerHTML = ''; markHot(); return; }
    const targets = {}; const order = [];
    rows.forEach((r) => {
      /* the list fixed r.at when the folding last changed; while a branch is still animating
         shut, its box can already be gone, so fall back to the nearest box above it */
      let k = r.at;
      while (k && !bx[k]) k = ix.PARENT[k];
      if (!k || k === selId || k === 'root') return;
      linkKey[r.id] = k;
      /* parent and children are already joined by the tree itself, so no extra arc */
      if (ix.PARENT[k] === selId || ix.PARENT[selId] === k) return;
      if (!targets[k]) { targets[k] = { far: true, ns: [] }; order.push(k); }
      if (k === r.id) targets[k].far = false;
      targets[k].ns.push(r.n);
    });
    let paths = ''; let dots = '';
    order.forEach((k) => {
      const t = bx[k]; const { far, ns } = targets[k]; const hot = (k === hotKey);
      const x1 = s.xr + 2; const y1 = s.y; const x2 = t.xr + DOT_DX; const y2 = t.y;
      const dy = Math.abs(y2 - y1);
      let d;
      if (t.xr < s.x1 - 20 && dy < (NARROW ? 160 : 230)) {
        /* nearby target in a column to the left: leave from the start of the underline and cross the gap between
           columns, where only tree lines run, instead of looping back along a row of labels */
        const sx = s.x1 - 9; const g = Math.max(24, (sx - x2) * 0.45);
        d = `M${sx.toFixed(1)},${y1.toFixed(1)} C${(sx - g).toFixed(1)},${y1.toFixed(1)} ${(x2 + g).toFixed(1)},${y2.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
      } else {
        const bow = Math.min(NARROW ? 90 : 220, 26 + dy * (NARROW ? 0.3 : 0.42));
        const xm = Math.max(x1, x2) + bow;
        d = `M${x1.toFixed(1)},${y1.toFixed(1)} C${xm.toFixed(1)},${y1.toFixed(1)} ${xm.toFixed(1)},${y2.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
      }
      paths += `<path class="${far ? 'far' : ''}${hot ? ' hot' : ''}" d="${d}"/>`;
      dots += `<g class="rv-dot${hot ? ' hot' : ''}" data-at="${esc(k)}" transform="translate(${x2.toFixed(1)},${y2.toFixed(1)})"><circle class="hit" r="22"/><circle class="ring" r="9"/><text dy="3.8">${ns.length === 1 ? ns[0] : `${ns[0]}+`}</text></g>`;
    });
    ov.innerHTML = paths + dots;
    markHot();
  }
```

- [ ] **Step 6: Call `refreshList()` where the selection or the folding changes**

In `makeInstance()`, replace

```js
    setTimeout(() => { applyMarks(); fitNow(); drawLinks(); }, 60);
```

with

```js
    setTimeout(() => { applyMarks(); fitNow(); refreshList(); drawLinks(); }, 60);
```

and inside `renderPatched` replace `applyMarks(); track(500);` with
`applyMarks(); refreshList(); track(500);`.

In the `makeInstance()` options, change `spacingVertical: 9,` to
`spacingVertical: NARROW ? 12 : 14,`.

Replace `select()` and `clearSel()` with:

```js
  function select(id) {
    if (!(id in ix.PARENT)) return;
    hotKey = null; hotRow = null;
    selId = (id === 'root') ? null : id;
    if (!selId) { home(); refreshList(); applyMarks(); track(300); $$('rvJump').value = ''; return; }
    renderPanel(id);
    $$('rvJump').value = ix.byId[id] ? id : '';
    notesBtn.hidden = false;
    refreshList();
    applyMarks(); track(500);
  }
  function clearSel() { selId = null; hotKey = null; hotRow = null; home(); refreshList(); applyMarks(); drawLinks(); $$('rvJump').value = ''; }
```

- [ ] **Step 7: Wire taps on the list and the dots; Test me out**

In `doMount()`, replace the side-panel click handler (the one starting with
`side.addEventListener('click', (ev) => {` and containing the `/* Test me: … */` block)
with:

```js
    side.addEventListener('click', (ev) => {
      const b = ev.target.closest('button'); if (!b) return;
      if (b.dataset.node) reveal(b.dataset.node);
      if (b.dataset.thread) openThread(b.dataset.thread);
    });
    linkList = bindLinkList($$('rvLinkList'), {
      onHot: (id) => { hotRow = id; setHot(linkKey[id] || null); },
      onOpen: (id) => { reveal(id); },
    });
    ov.addEventListener('click', (ev) => {
      const g = ev.target.closest && ev.target.closest('.rv-dot'); if (!g) return;
      const r = rows.find((x) => x.at === g.dataset.at);
      hotRow = r ? r.id : null;
      markLinkRow($$('rvLinkList'), hotRow);
      linkList.reset();
      setHot(g.dataset.at);
    });
```

Delete the whole `$$('rvQuiz').addEventListener('click', () => { … });` block (seven
lines, ending `});` after `if (selId) renderPanel(selId); else home();`).

In the object `createMap()` returns, add `selected: () => selId,` after `ready: () => !!mm,`.

- [ ] **Step 8: Phone folding: opening a branch folds the ones beside it**

Inside `createMap()`, after `findNode`, add:

```js
  /* On a phone, opening a branch folds the open branches beside it, so the map stays about one screen tall. */
  function foldSiblings(id) {
    (ix.KIDS[ix.PARENT[id]] || []).forEach((k) => {
      if (k === id) return;
      const n = findNode(k);
      if (n && (n.children || []).length && !n.payload.fold) n.payload = Object.assign({}, n.payload, { fold: 1 });
    });
  }
```

In the map's `svgEl` click handler, replace

```js
      if (hasKids && (folded || wasSel)) {
        mm.toggleNode(d, false).then(() => {
```

with

```js
      if (hasKids && (folded || wasSel)) {
        if (NARROW && folded) foldSiblings(id);
        mm.toggleNode(d, false).then(() => {
```

- [ ] **Step 9: Find searches a leaf's name and line, not its source note**

In `indexText()`, replace

```js
      TEXT[k] = (n && !ix.structural.has(k) ? `${n.l} ${n.t.replace(/<[^>]+>/g, ' ')}` : ix.LABEL[k]).toLowerCase();
```

with

```js
      const text = n && n.leaf ? `${n.l} ${n.line}` : n ? `${n.l} ${n.t.replace(/<[^>]+>/g, ' ')}` : '';
      TEXT[k] = (n && !ix.structural.has(k) ? text : ix.LABEL[k]).toLowerCase();
```

- [ ] **Step 10: Remove Test me from the markup and the CSS**

In `outputs/radiography-study-studio.html`, delete the line

```html
                    <button class="rv-linkbtn" id="rvQuiz" type="button" aria-pressed="false" title="Blur the notes so you can recall them first">Test me</button>
```

In `outputs/app.css`, delete the two lines that start with
`#reviseView .rv-side.quiz .rv-note:not(.shown)` and `#reviseView .rv-quizhint`.

Confirm nothing is left:

```bash
grep -n "rvQuiz\|quizhint\|\.quiz\|'quiz'" outputs/study/revise.js outputs/radiography-study-studio.html outputs/app.css
```

Expected: no output. (A plain `quiz` search would also hit the About dialog's unrelated
"quiz choices" sentence in the HTML.)

- [ ] **Step 11: Static checks**

```bash
node work/syntax-check.mjs
node work/binding-check.mjs
node work/load-check.mjs
node work/text-size-check.mjs
```

Expected: all pass. The 3D tab is untouched until Task 8 and still works. Then run the
line-ending check.

- [ ] **Step 12: Commit**

```bash
git add outputs/study/revise.js outputs/radiography-study-studio.html outputs/app.css
git commit -m "feat(revise): map leaves show their action; link reasons move to numbered dots and a list; Test me goes

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Brain 3D becomes the connections hub

**Files:**
- Rewrite: `outputs/study/revise-brain.js` (LF)
- Modify: `outputs/study/revise.js` (CRLF): the 3D entry points and Connections in 3D
- Modify: `outputs/radiography-study-studio.html` (CRLF)
- Modify: `outputs/app.css` (CRLF)

- [ ] **Step 1: Brain markup**

In `outputs/radiography-study-studio.html`, replace the whole
`<section class="rv-panel" id="rvBrain" …> … </section>` with:

```html
            <section class="rv-panel" id="rvBrain" role="tabpanel" aria-labelledby="rvTabBrain" hidden>
              <div class="rv-mapbar">
                <div class="rv-jump">
                  <label for="rvBJump" class="rv-jlab">Centre on</label>
                  <select id="rvBJump"><option value="">Pick a topic…</option></select>
                </div>
                <div class="rv-jump">
                  <label for="rvBTour" class="rv-jlab">Tour</label>
                  <select id="rvBTour"><option value="">Pick a pathway…</option></select>
                  <span class="rv-jbtns">
                    <button class="rv-linkbtn" id="rvBPrev" type="button" aria-label="Previous stop" disabled>◀</button>
                    <button class="rv-linkbtn" id="rvBPlay" type="button" aria-pressed="false" disabled>Play</button>
                    <button class="rv-linkbtn" id="rvBNext" type="button" aria-label="Next stop" disabled>▶</button>
                    <button class="rv-linkbtn" id="rvBSpin" type="button" aria-pressed="true">Spin</button>
                  </span>
                </div>
              </div>
              <div class="rv-legend" aria-label="Colour key">
                <span class="rv-lab">Colour = what it is · grey at the top = the branch it sits in</span>
                <span><i style="background:var(--rv-c-tissue)"></i>Tissues &amp; cells</span>
                <span><i style="background:var(--rv-c-skel)"></i>Skeleton &amp; joints</span>
                <span><i style="background:var(--rv-c-musc)"></i>Muscles</span>
                <span><i style="background:var(--rv-c-pns)"></i>Peripheral nerves</span>
                <span><i style="background:var(--rv-c-cns)"></i>Brain &amp; spinal cord</span>
                <span><i style="background:var(--rv-c-sense)"></i>Senses &amp; autonomic</span>
              </div>
              <div class="rv-mapwrap">
                <div class="rv-col">
                <div id="rvBwrap">
                  <div id="rvBgraph" aria-hidden="true"></div>
                  <div id="rvBlabels" aria-hidden="true"></div>
                  <div id="rvBdots" aria-hidden="true"></div>
                  <nav id="rvBTrail" aria-label="The chain you walked"></nav>
                  <button class="rv-linkbtn" id="rvBMore" type="button" hidden></button>
                  <div id="rvBcap" aria-live="polite" hidden></div>
                  <button class="rv-linkbtn" id="rvBNotesBtn" type="button" hidden>Notes ↓</button>
                </div>
                <ol class="rv-links" id="rvBLinkList" aria-label="Why each topic links" hidden></ol>
                </div>
                <aside class="rv-side" id="rvBside" aria-live="polite"></aside>
              </div>
            </section>
```

(`rvBReset` and `rvBhint` are gone. The trail replaces the hint, and Back replaces Reset.)

- [ ] **Step 2: Brain CSS**

In `outputs/app.css`:

- Delete the rules for `#rvBlabels span i`, `#rvBlabels b.region` and `#rvBhint`.
- Replace `#rvBNotesBtn{position:absolute;right:10px;top:8px;` with
  `#rvBNotesBtn{position:absolute;right:10px;top:96px;` (keep the rest of that rule).
- Add after the `#rvBlabels span.sel{…}` rule:

```css
#rvBlabels span{pointer-events:auto;cursor:pointer}
#rvBlabels span.par{color:#b9ccd1;font-style:italic}
#rvBdots{position:absolute;inset:0;pointer-events:none;overflow:hidden}
#rvBdots span{position:absolute;left:0;top:0;width:20px;height:20px;margin:-10px 0 0 -10px;border-radius:50%;display:grid;place-items:center;font:600 11px 'Instrument Sans',sans-serif;font-size:calc(11px * var(--ts));background:#0b2a31;border:1.4px solid #5cc4d4;color:#e9f3f5;will-change:transform}
#rvBdots span.hot{background:#5cc4d4;color:#06222a}
#rvBTrail{position:absolute;left:10px;right:10px;top:8px;display:flex;flex-wrap:wrap;gap:4px 6px;align-items:center;font-size:calc(13px * var(--ts));color:#b9ccd1;pointer-events:none;z-index:2}
#rvBTrail b{color:#fff}
#rvBTrail button{pointer-events:auto;font:500 13px 'Instrument Sans',sans-serif;font-size:calc(13px * var(--ts));color:#8fe6f2;background:rgba(7,19,24,.8);border:1px solid #1f4650;border-radius:8px;padding:6px 9px;min-height:36px;cursor:pointer}
#rvBTrail .rv-back{margin-left:auto}
#rvBMore{position:absolute;right:10px;top:52px;z-index:2;background:#071318;color:#8fe6f2;border-color:#1f4650}
```

- [ ] **Step 3: Rewrite `outputs/study/revise-brain.js`**

Replace the whole file with:

```js
/*
 * Revise · Brain 3D — the connections hub
 *
 * One topic at the centre, what it links to round it, the next step out faint
 * behind. Tap anything to bring it to the centre; the trail keeps the chain you
 * walked. The Map shows what belongs where; this shows how things connect, so
 * it draws cross-links only, never the tree (the tree appears as one grey ball
 * at the top: the branch the topic sits in on the Map).
 * docs/superpowers/specs/2026-10-19-revise-depth-and-3d-hub.md.
 *
 * Where each ball goes is decided by revision/hub.js (pure, checked in node);
 * the 3d-force-graph library only draws it. Its forces are set to nothing and
 * its engine kept ticking, so every ball sits exactly at fx/fy/fz and moves only
 * when this module tweens it there. The library (three.js inside it) is loaded
 * by revise.js on first open; this module runs only while its tab is showing.
 */
import { $$, esc } from './imports.js';
import { hubLayout } from '../revision/hub.js?v=1';
import { linkRows } from '../revision/link-rows.js?v=1';
import { bindLinkList, markLinkRow, renderLinkList } from './revise-links.js';

/* the stage is dark, so these are the dark-theme system colours */
const COL = { tissue: '#9FB2BB', skel: '#D1A94F', musc: '#E3786B', pns: '#6FA8E8', cns: '#AE98EC', sense: '#55C4A4' };
const BG = '#071318';
const PARENT_COL = '#7F9FA7';
const LINK = '#3B6F7B';
const LINK_FAINT = '#163238';
const LINK_PARENT = '#4D6A71';
const LINK_HOT = '#8FE6F2';
const TWEEN_MS = 600;

function mix(a, b, t) {
  const p = (h, i) => parseInt(h.slice(i, i + 2), 16);
  let out = '#';
  for (let i = 1; i < 7; i += 2) { const v = Math.round(p(a, i) * (1 - t) + p(b, i) * t); out += (`0${v.toString(16)}`).slice(-2); }
  return out;
}
const DIM = Object.fromEntries(Object.keys(COL).map((k) => [k, mix(COL[k], BG, 0.55)]));

export function createBrain(env) {
  const { ix } = env;
  const NARROW = window.matchMedia('(max-width: 700px)').matches;
  const TRAIL_MAX = NARROW ? 3 : 5;
  const wrap = $$('rvBwrap'); const host = $$('rvBgraph');
  const labelsEl = $$('rvBlabels'); const dotsEl = $$('rvBdots'); const cap = $$('rvBcap');
  const side = $$('rvBside'); const trailEl = $$('rvBTrail'); const moreBtn = $$('rvBMore');
  const listEl = $$('rvBLinkList');
  const jump = $$('rvBJump'); const tourSel = $$('rvBTour');
  const bprev = $$('rvBPrev'); const bnext = $$('rvBNext'); const bplay = $$('rvBPlay');
  const bspin = $$('rvBSpin'); const bnotes = $$('rvBNotesBtn');

  let G = null; let visible = false; let looping = false;
  let centre = null; let trail = []; let lay = null; let rows = []; let hot = null;
  let shownNow = new Set(); let tween = null; let seenMapSel = null; let down = null;
  let tour = null; let step = 0; let playTimer = null; let TOURS = [];
  const nodeById = {}; const labelEls = {}; const dotEls = [];

  const label = (id) => ix.byId[id].l;
  const degree = (id) => (ix.NB[id] || []).length;
  const why = (a, b) => { const hit = (ix.NB[a] || []).filter((p) => p[0] === b)[0]; return hit ? hit[1] : ''; };
  /* the nearest real topic above id on the Map, if it is shown this week */
  const parentOf = (id) => { let k = ix.PARENT[id]; while (k && !ix.byId[k]) k = ix.PARENT[k]; return k && ix.ids.has(k) ? k : null; };

  /* ---------- the layout for one centre ---------- */
  function layoutFor(id) {
    const parent = parentOf(id);
    const first = (ix.NB[id] || []).filter(([o]) => ix.ids.has(o) && o !== parent).map(([o]) => ({ id: o, sys: ix.byId[o].s, deg: degree(o) }));
    const second = [];
    first.forEach((f) => (ix.NB[f.id] || []).forEach(([o]) => { if (o !== id && ix.ids.has(o)) second.push({ id: o, via: f.id }); }));
    return hubLayout({ first, parent, second });
  }

  /* ---------- drawing ---------- */
  const nodeVal = (n) => (n.ring === 0 ? 9 : n.ring === 1 ? 2 + Math.min(3, degree(n.id) * 0.15) : n.ring === 'p' ? 1.6 : 0.7);
  const nodeColor = (n) => (n.ring === 'p' ? PARENT_COL : n.ring === 2 ? DIM[n.s] : COL[n.s]);
  const isHot = (l) => l.ring !== 2 && l.id === hot;
  const linkColor = (l) => (isHot(l) ? LINK_HOT : l.ring === 2 ? LINK_FAINT : l.ring === 'p' ? LINK_PARENT : LINK);

  function graphFor(L) {
    const ids = [centre].concat(L.parent ? [L.parent] : [], L.shown, L.second);
    /* a fresh object per layout (the library hangs its own state on node objects, so one it
       dropped is not handed back), carrying the old position so place() can tween from it */
    const nodes = ids.map((id) => {
      const old = nodeById[id];
      const n = { id, s: ix.byId[id].s, ring: id === centre ? 0 : id === L.parent ? 'p' : L.via[id] ? 2 : 1 };
      if (old && old.x !== undefined) { n.x = old.x; n.y = old.y; n.z = old.z; }
      nodeById[id] = n;
      return n;
    });
    const links = L.shown.map((o) => ({ source: centre, target: o, id: o, ring: 1 }));
    if (L.parent) links.push({ source: centre, target: L.parent, id: L.parent, ring: 'p' });
    L.second.forEach((o) => links.push({ source: L.via[o], target: o, id: o, ring: 2 }));
    return { nodes, links };
  }

  /* Hand the library the new set. Each ball starts where it was (or, if new, where the new
     centre was) and tweens to its place, so the chosen topic is seen flying to the middle. */
  function place(L, animate) {
    const c = nodeById[centre];
    const origin = c && c.x !== undefined && shownNow.has(centre) ? { x: c.x, y: c.y, z: c.z } : { x: 0, y: 0, z: 0 };
    const data = graphFor(L);
    const from = {};
    data.nodes.forEach((n) => {
      from[n.id] = n.x !== undefined && shownNow.has(n.id) ? { x: n.x, y: n.y, z: n.z } : origin;
      n.to = n.id === centre ? { x: 0, y: 0, z: 0 } : L.pos[n.id];
      n.x = n.fx = from[n.id].x; n.y = n.fy = from[n.id].y; n.z = n.fz = from[n.id].z;
    });
    shownNow = new Set(data.nodes.map((n) => n.id));
    G.graphData(data);
    tween = { t0: performance.now(), ms: animate ? TWEEN_MS : 0, from, nodes: data.nodes };
    stepTween(performance.now());
  }
  function stepTween(now) {
    if (!tween) return;
    const t = tween.ms ? Math.min(1, (now - tween.t0) / tween.ms) : 1;
    const e = t < 0.5 ? 2 * t * t : 1 - ((-2 * t + 2) ** 2) / 2;
    tween.nodes.forEach((n) => {
      const a = tween.from[n.id]; const b = n.to;
      n.fx = a.x + (b.x - a.x) * e; n.fy = a.y + (b.y - a.y) * e; n.fz = a.z + (b.z - a.z) * e;
    });
    if (t >= 1) tween = null;
  }
  function refresh() {
    if (!G) return;
    G.nodeVal(G.nodeVal()).nodeColor(G.nodeColor()).linkColor(G.linkColor()).linkWidth(G.linkWidth()).linkDirectionalParticles(G.linkDirectionalParticles());
  }

  /* ---------- the list, the trail, the panel ---------- */
  const linkList = bindLinkList(listEl, {
    onHot: (id) => { hot = id; refresh(); },
    onOpen: (id) => { stopTour(); recentre(id, true); wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); },
  });

  function paintTrail() {
    trailEl.innerHTML = trail.map((id, i) => (i === trail.length - 1
      ? `<b>${esc(label(id))}</b>`
      : `<button type="button" data-trail="${i}">${esc(label(id))}</button>`)).join('<span aria-hidden="true">›</span>')
      + (trail.length > 1 ? '<button type="button" class="rv-back" data-back="1">Back</button>' : '');
  }

  function home() {
    side.innerHTML = `<h3>Brain 3D: how things connect</h3><div class="rv-hint"><p>One topic sits in the middle. Round it are the topics it links to; the faint dots further out are the next step. The Map shows what belongs where; this shows the links across it.</p><ul>
      <li><b>Tap any ball or name</b> to bring it to the middle. The trail at the top keeps the chain you walked; <b>Back</b> steps back.</li>
      <li>The numbers on the lines match the <b>Links</b> list under the picture. Tap a row to light up its line, tap it again to go there.</li>
      <li>The grey ball at the top is the branch the topic sits in on the Map.</li>
      <li><b>Tour</b> walks one pathway stop by stop. 跟住條路行一次，個次序就會記得。</li>
      <li>Drag to turn, pinch or scroll to zoom.</li></ul></div>`;
  }

  /* ---------- bring a topic to the centre ---------- */
  function recentre(id, push) {
    if (!ix.ids.has(id)) return;
    if (push) {
      const i = trail.indexOf(id);
      if (i >= 0) trail = trail.slice(0, i + 1);
      else { trail.push(id); if (trail.length > TRAIL_MAX) trail = trail.slice(-TRAIL_MAX); }
    }
    centre = id; hot = null;
    lay = layoutFor(id);
    rows = linkRows(ix.NB[id], { label });
    renderLinkList(listEl, rows);
    linkList.reset();
    jump.value = id;
    env.renderPanel(id, side);
    bnotes.hidden = !NARROW;
    paintTrail();
    moreBtn.hidden = !lay.more.length;
    moreBtn.textContent = `+${lay.more.length} more in the list`;
    if (G) { place(lay, true); refresh(); }
  }

  /* ---------- labels and numbered dots, placed over the 3D every frame ---------- */
  function labelFor(id) {
    let el = labelEls[id];
    if (!el) { el = document.createElement('span'); el.dataset.id = id; el.style.display = 'none'; labelsEl.appendChild(el); labelEls[id] = el; }
    const par = lay && id === lay.parent;
    const cls = id === centre ? 'sel' : par ? 'par' : id === hot ? 'rel' : '';
    const text = par ? `in ${label(id)}` : label(id);
    if (el.className !== cls || el.__t !== text) { el.className = cls; el.textContent = text; el.__t = text; el.__w = 0; }
    el.style.setProperty('--bc', par ? PARENT_COL : COL[ix.byId[id].s]);
    return el;
  }
  function dotEl(i) {
    if (!dotEls[i]) { const s = document.createElement('span'); dotsEl.appendChild(s); dotEls[i] = s; }
    return dotEls[i];
  }
  function loop() {
    if (!visible || !G) { looping = false; return; }
    looping = true;
    stepTween(performance.now());
    const cam = G.camera(); const e = cam.matrixWorld.elements;
    const fx = -e[8]; const fy = -e[9]; const fz = -e[10];
    const cx = cam.position.x; const cy = cam.position.y; const cz = cam.position.z;
    const depthOf = (x, y, z) => (x - cx) * fx + (y - cy) * fy + (z - cz) * fz;
    const W = wrap.clientWidth; const H = wrap.clientHeight;
    const c0 = nodeById[centre];
    const dc = c0 && c0.x !== undefined ? depthOf(c0.x, c0.y, c0.z) : 0;
    const placed = [];
    const free = (r) => placed.every((q) => !(r.x < q.x + q.w && r.x + r.w > q.x && r.y < q.y + q.h && r.y + r.h > q.y));
    const showing = new Set();
    if (lay) {
      const pr = (id) => (id === centre ? 0 : id === hot ? 1 : id === lay.parent ? 2 : 3);
      const cands = [centre].concat(lay.parent ? [lay.parent] : [], lay.shown)
        .map((id) => ({ id, n: nodeById[id] })).filter((c) => c.n && c.n.x !== undefined)
        .map((c) => ({ ...c, d: depthOf(c.n.x, c.n.y, c.n.z) }));
      cands.sort((a, b) => pr(a.id) - pr(b.id) || a.d - b.d);
      cands.forEach((c) => {
        const el = labelFor(c.id);
        const p = G.graph2ScreenCoords(c.n.x, c.n.y, c.n.z);
        if (!el.__w) { el.style.display = ''; el.__w = el.offsetWidth; el.__h = el.offsetHeight; }
        const r = { x: Math.max(2, Math.min(W - el.__w - 2, p.x - el.__w / 2)), y: p.y - el.__h - (c.id === centre ? 16 : 9), w: el.__w, h: el.__h };
        if (r.y < 0 || r.y > H || (pr(c.id) > 1 && !free(r))) return;
        placed.push({ x: r.x - 3, y: r.y - 2, w: r.w + 6, h: r.h + 4 });
        showing.add(c.id);
        el.style.display = '';
        el.style.opacity = c.d > dc + 40 ? '0.4' : '1';
        el.style.transform = `translate(${r.x.toFixed(1)}px,${r.y.toFixed(1)}px)`;
      });
    }
    Object.keys(labelEls).forEach((id) => { if (!showing.has(id)) labelEls[id].style.display = 'none'; });
    let used = 0;
    if (lay && c0 && c0.x !== undefined) {
      rows.forEach((r) => {
        const n = nodeById[r.id];
        if (!lay.pos[r.id] || !n || n.x === undefined || !shownNow.has(r.id)) return;
        const mx = c0.x + (n.x - c0.x) * 0.55; const my = c0.y + (n.y - c0.y) * 0.55; const mz = c0.z + (n.z - c0.z) * 0.55;
        const p = G.graph2ScreenCoords(mx, my, mz);
        const el = dotEl(used++);
        if (el.__t !== r.n) { el.textContent = r.n; el.__t = r.n; }
        el.className = r.id === hot ? 'hot' : '';
        el.style.display = '';
        el.style.opacity = depthOf(mx, my, mz) > dc + 30 ? '0.45' : '1';
        el.style.transform = `translate(${p.x.toFixed(1)}px,${p.y.toFixed(1)}px)`;
      });
    }
    for (let i = used; i < dotEls.length; i++) dotEls[i].style.display = 'none';
    requestAnimationFrame(loop);
  }

  /* ---------- the scene ---------- */
  function supportsWebGL() {
    try { const c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl'))); } catch { return false; }
  }
  function setSpin(on) {
    if (G) G.controls().autoRotate = on;
    bspin.setAttribute('aria-pressed', on ? 'true' : 'false');
  }
  function init() {
    if (G !== null) return;
    if (typeof window.ForceGraph3D !== 'function' || !supportsWebGL()) {
      host.innerHTML = '<div id="rvBfallback">This device cannot draw 3D graphics. The Links list and the Map show the same links.</div>';
      G = false; return;
    }
    G = window.ForceGraph3D({ controlType: 'orbit' })(host)
      .width(wrap.clientWidth).height(wrap.clientHeight)
      .backgroundColor('rgba(0,0,0,0)')
      .showNavInfo(false)
      .enableNodeDrag(false)
      .enablePointerInteraction(false)
      .nodeRelSize(4)
      .nodeResolution(20)
      .nodeOpacity(1)
      .nodeVal(nodeVal)
      .nodeLabel(() => '')
      .nodeColor(nodeColor)
      .linkColor(linkColor)
      .linkOpacity(0.75)
      .linkWidth((l) => (isHot(l) ? 1.4 : 0))
      .linkDirectionalParticles((l) => (isHot(l) ? 3 : 0))
      .linkDirectionalParticleWidth(1.8)
      .linkDirectionalParticleResolution(8)
      .linkDirectionalParticleSpeed(0.008)
      .linkDirectionalParticleColor(() => '#D4FBFF')
      .d3AlphaDecay(0)
      .d3VelocityDecay(1)
      .cooldownTicks(Infinity)
      .cooldownTime(Infinity)
      .graphData({ nodes: [], links: [] });
    /* The balls sit where hub.js puts them: no pull, no push, no drift. The link force
       stays, at zero strength, because it is what turns link ids into node objects. */
    G.d3Force('charge').strength(0);
    G.d3Force('link').strength(0);
    G.d3Force('center', null);
    const ctl = G.controls();
    ctl.autoRotate = true; ctl.autoRotateSpeed = 0.6; ctl.enableDamping = true;
    ctl.addEventListener('start', () => setSpin(false));
    G.cameraPosition({ x: 0, y: 60, z: NARROW ? 560 : 470 }, { x: 0, y: 0, z: 0 });
    if ('ResizeObserver' in window) {
      new ResizeObserver(() => { if (G) G.width(wrap.clientWidth).height(wrap.clientHeight); }).observe(wrap);
    }
  }

  /* ---------- tours ---------- */
  function setTourButtons() {
    const on = !!tour;
    bprev.disabled = !on || step === 0;
    bnext.disabled = !on || step >= tour.stops.length - 1;
    bplay.disabled = !on;
  }
  function startTour(i) {
    stopPlay();
    tour = TOURS[i]; step = 0;
    setSpin(false);
    go(0);
  }
  function go(j) {
    step = j;
    const id = tour.stops[j]; const prev = j ? tour.stops[j - 1] : null;
    trail = tour.stops.slice(0, j + 1).slice(-TRAIL_MAX);
    recentre(id, false);
    hot = prev && lay && lay.pos[prev] ? prev : null;
    markLinkRow(listEl, hot);
    refresh();
    const r = prev ? why(prev, id) : '';
    cap.innerHTML = `<span class="step">${esc(ix.threadTitles[tour.th] || '')} · stop ${j + 1} of ${tour.stops.length}</span>${
      prev ? `${esc(label(prev))} → ` : ''}<b>${esc(label(id))}</b>${r ? `: ${esc(r)}` : ''}`;
    cap.hidden = false;
    setTourButtons();
  }
  function stopPlay() {
    if (playTimer) { clearInterval(playTimer); playTimer = null; }
    bplay.setAttribute('aria-pressed', 'false'); bplay.textContent = 'Play';
  }
  function stopTour() {
    if (!tour) return;
    stopPlay(); tour = null; cap.hidden = true; tourSel.value = '';
    setTourButtons();
  }

  /* ---------- controls: bound once ---------- */
  tourSel.addEventListener('change', () => { if (tourSel.value === '') stopTour(); else startTour(+tourSel.value); });
  bprev.addEventListener('click', () => { if (tour && step > 0) { stopPlay(); go(step - 1); } });
  bnext.addEventListener('click', () => { if (tour && step < tour.stops.length - 1) { stopPlay(); go(step + 1); } });
  bplay.addEventListener('click', () => {
    if (!tour) return;
    if (playTimer) { stopPlay(); return; }
    if (step >= tour.stops.length - 1) go(0);
    bplay.setAttribute('aria-pressed', 'true'); bplay.textContent = 'Pause';
    playTimer = setInterval(() => {
      if (step >= tour.stops.length - 1) { stopPlay(); return; }
      go(step + 1);
    }, 4200);
  });
  jump.addEventListener('change', () => { if (jump.value) { stopTour(); recentre(jump.value, true); } });
  bspin.addEventListener('click', () => { setSpin(bspin.getAttribute('aria-pressed') !== 'true'); });
  bnotes.addEventListener('click', () => { side.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  moreBtn.addEventListener('click', () => { listEl.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  trailEl.addEventListener('click', (ev) => {
    const b = ev.target.closest('button'); if (!b) return;
    stopTour();
    if (b.dataset.back) { trail.pop(); recentre(trail[trail.length - 1], false); return; }
    const i = Number(b.dataset.trail); trail = trail.slice(0, i + 1); recentre(trail[i], false);
  });
  labelsEl.addEventListener('click', (ev) => {
    const s = ev.target.closest('span[data-id]');
    if (s && s.dataset.id !== centre) { stopTour(); recentre(s.dataset.id, true); }
  });
  /* A tap (not a drag) picks the nearest ball within 24 px: easier on a phone than hitting the ball itself. */
  host.addEventListener('pointerdown', (ev) => { down = { x: ev.clientX, y: ev.clientY }; });
  host.addEventListener('pointerup', (ev) => {
    if (!down || !G || Math.hypot(ev.clientX - down.x, ev.clientY - down.y) > 6) { down = null; return; }
    down = null;
    const r = host.getBoundingClientRect(); const x = ev.clientX - r.left; const y = ev.clientY - r.top;
    let best = null; let bd = 24;
    shownNow.forEach((id) => {
      const n = nodeById[id]; if (!n || n.x === undefined) return;
      const p = G.graph2ScreenCoords(n.x, n.y, n.z); const d = Math.hypot(p.x - x, p.y - y);
      if (d < bd) { bd = d; best = id; }
    });
    if (best && best !== centre) { stopTour(); recentre(best, true); }
  });
  side.addEventListener('click', (ev) => {
    const b = ev.target.closest('button'); if (!b) return;
    if (b.dataset.node) { stopTour(); recentre(b.dataset.node, true); wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
    if (b.dataset.thread) env.openThread(b.dataset.thread);
    if (b.dataset.to3d && b.dataset.to3d !== centre) { stopTour(); recentre(b.dataset.to3d, true); }
  });

  /* ---------- the week changed: same centre if it is still taught ---------- */
  function fillControls() {
    jump.innerHTML = '<option value="">Pick a topic…</option>';
    [...ix.ids].map((id) => ix.byId[id]).sort((a, b) => a.l.localeCompare(b.l)).forEach((n) => {
      const o = document.createElement('option'); o.value = n.id; o.textContent = n.l; jump.appendChild(o);
    });
    tourSel.innerHTML = '<option value="">Pick a pathway…</option>';
    TOURS.forEach((t, i) => { const o = document.createElement('option'); o.value = i; o.textContent = ix.threadTitles[t.th] || t.th; tourSel.appendChild(o); });
  }
  function setData() {
    TOURS = env.tours().map((t) => ({ ...t, stops: t.stops.filter((s) => ix.ids.has(s)) })).filter((t) => t.stops.length >= 2);
    fillControls();
    if (tour && !TOURS.some((t) => t.th === tour.th)) stopTour();
    trail = trail.filter((id) => ix.ids.has(id));
    if (centre && !ix.ids.has(centre)) centre = trail.length ? trail[trail.length - 1] : null;
    if (centre) recentre(centre, false); else { lay = null; rows = []; renderLinkList(listEl, rows); home(); }
  }

  /* ---------- only run while the tab is showing ---------- */
  function show() {
    visible = true;
    init();
    const sel = env.mapSelected();
    if (sel && ix.ids.has(sel) && sel !== seenMapSel) {
      seenMapSel = sel;
      if (sel !== centre) { stopTour(); recentre(sel, true); }
    } else if (!centre) {
      const n = env.newest(); if (n) recentre(n, true);
    }
    if (!G) return;
    G.width(wrap.clientWidth).height(wrap.clientHeight);
    G.resumeAnimation();
    if (lay && !shownNow.size) { place(lay, false); refresh(); }
    if (!looping) requestAnimationFrame(loop);
  }
  function hide() {
    visible = false; stopPlay();
    if (G) G.pauseAnimation();
  }

  home();
  return {
    setData, show, hide,
    focus: (id) => { stopTour(); if (id !== centre) recentre(id, true); },
  };
}
```

- [ ] **Step 4: In `outputs/study/revise.js`, the hub's entry points and Connections in 3D**

Replace the whole `ensureBrain()` function (from `async function ensureBrain() {` to its
closing `}`, which includes the `sysName:` line the old 3D needed) with:

```js
/* The 3D tab and "Connections in 3D" can both ask for the hub while the library is
   still loading; one promise, so there is only ever one hub. */
let brainLoading = null;
function ensureBrain() {
  if (!brainLoading) brainLoading = loadBrain().then((b) => { if (!b) brainLoading = null; return b; });
  return brainLoading;
}

async function loadBrain() {
  if (brain) return brain;
  try {
    await loadScript('3d-force-graph.min.js');
  } catch (e) {
    $$('rvBgraph').innerHTML = `<div id="rvBfallback">The 3D library could not load (${esc(e.message)}). The Map has the same topics and links.</div>`;
    return null;
  }
  brain = createBrain({
    ix, rv, renderPanel, openThread,
    tours: () => subjectData().tours,
    mapSelected: () => (map && map.ready() ? map.selected() : null),
    newest: newestTopic,
  });
  brain.setData();
  return brain;
}

/* Where the 3D hub starts when nothing is chosen: the best-linked topic new this week, else the best-linked of all. */
function newestTopic() {
  const deg = (id) => (ix.NB[id] || []).length;
  const pick = (ids) => ids.filter((id) => ix.byId[id] && ix.ids.has(id) && !ix.structural.has(id)).sort((a, b) => deg(b) - deg(a) || (a < b ? -1 : 1))[0] || null;
  return pick([...ix.fresh]) || pick([...ix.ids]);
}

/* "Connections in 3D" in a topic's notes: the same topic, at the centre of the hub. */
async function openIn3D(id) {
  showTab('brain');
  scrollViewTop();
  const b = await ensureBrain();
  if (b) b.focus(id);
}
```

(`showTab('brain')` already asks for the hub and calls `show()`, which centres on the
Map's selection, the same topic; `focus(id)` then finds it already centred and does
nothing. Both wait on the one promise, so only one hub is ever made.)

In `renderPanel`, in the `} else if (n) {` branch, after the line
`` h += `<div class="rv-note">${n.t}</div>`; `` add:

```js
    h += `<p class="rv-to3d"><button type="button" class="rv-linkbtn" data-to3d="${esc(id)}">Connections in 3D (${(ix.NB[id] || []).length})</button></p>`;
```

In `doMount()`, in the side-panel click handler, after
`if (b.dataset.thread) openThread(b.dataset.thread);` add:

```js
      if (b.dataset.to3d) openIn3D(b.dataset.to3d);
```

(The hub's own side panel handles `data-to3d` itself: it re-centres there.)

- [ ] **Step 5: Static checks**

```bash
node work/syntax-check.mjs
node work/binding-check.mjs
node work/bridge-check.mjs
node work/load-check.mjs
node work/text-size-check.mjs
node work/revise-pure-check.mjs
grep -n "sysName\|rvBReset\|rvBhint" outputs/study/revise.js outputs/study/revise-brain.js outputs/radiography-study-studio.html outputs/app.css
```

Expected: every check passes and the grep prints nothing. Then run the line-ending check
from "Before you start".

- [ ] **Step 6: Commit**

```bash
git add outputs/study/revise-brain.js outputs/study/revise.js outputs/radiography-study-studio.html outputs/app.css
git commit -m "feat(revise): Brain 3D becomes a connections hub centred on one topic

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 9: Service worker, the full check set, generated docs

**Files:**
- Modify: `outputs/sw.js` (LF)
- Regenerate: `docs/CODEMAP.md`, possibly `work/baselines/ui-strings.txt`

- [ ] **Step 1: Add the new modules to the SHELL**

Run `git diff outputs/sw.js`. If it shows hunks you did not write, **stop and ask the
owner** before going on.

In `outputs/sw.js`, after `'./study/revise-brain.js',` add `'./study/revise-links.js',`.

After `'./revision/registry.js?v=1',` add:

```js
  './revision/hub.js?v=1',
  './revision/link-rows.js?v=1',
```

After `'./revision/hss2011-data.js',` add:

```js
  './revision/leaves.js',
  './revision/hss2011-leaves-w2.js',
```

Bump `CACHE_VERSION` by one (it reads `'v220'` as this plan is written; use whatever
number is there plus one).

- [ ] **Step 2: Run the after-every-edit set**

```bash
node work/shell-check.mjs
node work/load-check.mjs
node work/syntax-check.mjs
node work/binding-check.mjs
node work/bridge-check.mjs
node work/revision-check.mjs
node work/revise-pure-check.mjs
node work/gloss-coverage-check.mjs
node work/text-size-check.mjs
node work/schedule-check.mjs
node work/data-index-check.mjs
```

Expected: every one passes, apart from any you recorded as already red in Task 0.
`shell-check` must find the five new specifiers reachable and precached. (`corpus-check`
and the other question-corpus checks were retired with the corpus in `cac19b3`.)

- [ ] **Step 3: Regenerate the code map**

Run `git status --short docs/CODEMAP.md`. If it was already modified by someone else
(see Task 0), ask the owner before committing a regenerated copy. Otherwise:

```bash
node work/codemap.mjs
node work/codemap-check.mjs
```

Expected: `codemap-check` passes, and the map lists `revise-links.js`,
`revision/leaves.js`, `hub.js`, `link-rows.js` and `work/revise-pure-check.mjs`.

- [ ] **Step 4: Baselines**

Run: `node work/baseline.mjs --check`
Expected: every probe matches except possibly `ui-strings` (new and removed sentences)
and `gloss-coverage-check` (more texts). For each one that differs, diff it against its
committed baseline (`node work/ui-strings.mjs > %TEMP%\ui.txt`, then
`git diff --no-index work/baselines/ui-strings.txt %TEMP%\ui.txt`). The differences
should be only this work's strings: the help text, Links list, Connections in 3D, the
trail and Back, the leaf names, and Test me removed. If anything else differs, it is
another session's change; ask the owner. When the differences are only yours:

```bash
node work/baseline.mjs
git status --short work/baselines
```

Stage only the baseline files whose differences you just read.

- [ ] **Step 5: Commit**

```bash
git add outputs/sw.js docs/CODEMAP.md work/baselines/ui-strings.txt
git commit -m "chore(revise): precache the new modules; code map and baselines

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

(Add `work/baselines/gloss-coverage-check.txt` to that `git add` only if it changed for
this work's reasons.)

---

### Task 10: Verify in the browser at phone and iPad sizes

**Files:** none changed, unless a fix is needed. A fix goes back through the matching
task's checks and commits.

- [ ] **Step 1: Start the dev server and clear the service worker**

Start the preview with `preview_start` `{ name: … }` from `.claude/launch.json` (it runs
`node work/dev-server.mjs` on port 8420), and open
`http://localhost:8420/radiography-study-studio.html`. Then run this in the page, and
navigate to the same URL twice:

```js
(async () => { for (const r of await navigator.serviceWorker.getRegistrations()) await r.unregister(); for (const k of await caches.keys()) await caches.delete(k); return 'cleared'; })()
```

- [ ] **Step 2: Phone, 390 × 844 (`resize_window` width 390, height 844), Map**

Open Revise → Map with week 7 chosen. Check each of these, using `read_page` or
`javascript_tool` for the values and a screenshot for the look:
- Muscles › Muscles by region › Lower-limb muscles opens into Gluteal region, Thigh,
  Leg compartments and Foot (intrinsic) muscles. Gluteal region opens into Gluteal group
  and Deep lateral rotators. Gluteus medius shows the grey line
  "abduction, medial rotation · stabilises the pelvis".
- Opening Thigh folds the open sibling branch (only one branch open at that level).
- Tap Gluteus medius. The arcs end in numbered dots and no reason text is drawn on the
  map: `document.querySelectorAll('#rvLinks text').length` equals the number of dots, and
  each `text` holds a number. The Links list under the map lists Hip joint (abduction,
  medial rotation) and Superior gluteal nerve (supplies the hip abductors), numbered in
  name order.
- Tap a list row: its arc gets the `hot` class. Tap it again: that topic is selected.
- Tap a dot: the matching row is highlighted.
- No `Test me` button exists: `document.getElementById('rvQuiz') === null`.
- Find "abduction" lists the abductors.
- `read_console_messages` with `onlyErrors: true` shows no errors.

- [ ] **Step 3: Phone, Brain 3D**

From Gluteus medius's notes, tap **Connections in 3D**. Check:
- Brain 3D opens with Gluteus medius at the centre and the trail reads "Gluteus medius".
- The grey "in Gluteal group" label sits at the top.
- The labelled balls are Hip joint and Superior gluteal nerve, plus Gluteus maximus or
  other second-step faint dots further out.
- Numbered dots sit on the two lines, matching the list under the canvas.
- Tap the Hip joint label. It flies to the centre, the trail reads
  "Gluteus medius › Hip joint", and Back appears. Hip joint's balls include Femur, Hip
  bone, and the hip muscles (up to 14), with "+N more in the list" when there are more
  than 14.
- Tap Back: Gluteus medius is at the centre again.
- Pick a Tour (e.g. the first pathway) and press ▶: each stop re-centres and the caption
  shows the link reason.
- Change the week chip to W1: lower-limb leaves disappear and the centre falls back to
  a W1 topic. Choose W7 again.
- `read_console_messages` with `onlyErrors: true` shows no errors.

- [ ] **Step 4: iPad, 820 × 1180, both views**

Repeat the key steps of Steps 2 and 3 at 820 × 1180 (`resize_window` width 820,
height 1180). Check that the Links list sits under the map and the 3D, not beside them,
and that nothing overflows sideways:
`document.documentElement.scrollWidth <= innerWidth`.

- [ ] **Step 5: Proof**

Take a screenshot of each view at phone size, the Map with Gluteus medius selected and
the 3D centred on Hip joint, and send both to the owner with `SendUserFile`. Then reset
the viewport with `resize_window` preset `desktop`.

---

### Task 11: Record it

**Files:** `CLAUDE.md` (CRLF), `docs/TRAPS.md` (CRLF), `outputs/README.md` (CRLF), the spec.

- [ ] **Step 1: CLAUDE.md**

Make these replacements. Each is a single line, so the Edit tool keeps the CRLF endings.

- In principle 0, replace `plus a 3D link graph, threads, tables and a decoder` with
  `plus a 3D connections hub (one topic at the centre, what it links to round it), threads, tables and a decoder`.
- Also in principle 0, replace
  `The reading help (tappable terms, glossary) stays and works inside Revise.` with
  `The reading help (tappable terms, glossary) stays and works inside Revise. The Map goes down to single muscles, bones, joints and nerves as one-line leaf rows (outputs/revision/hss2011-leaves-w*.js, merged by outputs/revision/leaves.js); link reasons are numbered dots plus a list, and the Revise "Test me" is gone (spec: docs/superpowers/specs/2026-10-19-revise-depth-and-3d-hub.md).`
  Leave the rest of principle 0 as the test-removal work wrote it.
- In principle 1, replace
  `single joint motions. The 3D studio remains a separate interactive reference tool.` with
  `single joint motions. Revision leaf rows (a name, one action or function line in the slide's words, and the slide page) are recall cues, not prose, and are allowed. The 3D studio remains a separate interactive reference tool.`
- In the "After every edit" code block, after the line
  `node work/syntax-check.mjs      # data-module syntax`, add two lines (keep CRLF):

```
node work/revision-check.mjs    # REQUIRED for outputs/revision/ — the week rule over the merged data, every leaf name on its slide page
node work/revise-pure-check.mjs # REQUIRED for revision/leaves.js, hub.js, link-rows.js — the merge, the 3D layout, the numbering
```

- In the Layout table's `outputs/revision/` row, after
  ``registry.js (`REVISION[subject]`),`` add
  `leaves.js (leaf rows → nodes, links, tree), hub.js (the 3D hub layout), link-rows.js (one numbering for both views), hss2011-leaves-w*.js (leaf rows, read off the slides),`.

Then run the line-ending check on `CLAUDE.md`. Expected: `crlf`.

- [ ] **Step 2: docs/TRAPS.md**

Under "### Revise — week-gated fragments", add these bullets (CRLF):

```
- **The 3D hub keeps the library's link force, at zero strength.** three-forcegraph turns link `source`/`target` ids into node objects inside the link force; with it removed the ends stay strings and the lines draw from NaN. Charge is zero, centre is removed, alpha never decays, and every ball is pinned with `fx/fy/fz` — hub.js decides positions, not the library.
- **Leaf rows go parent-first.** `mergeLeaves` throws on a parent that is not a topic or an earlier row, and the registry import then fails — `revision-check` reports it as a load error, not a FAIL line.
- **A map dot sits 24 px right of its target's underline**, clear of Markmap's fold circle; nearer, its hit circle steals the fold tap.
```

Add any trap found during Task 10 the same way: what happened, why, and what to do.

- [ ] **Step 3: outputs/README.md**

Under "### Revise replaces Learn (October 2026)", add a paragraph (CRLF):

```
**Deeper Map and a connections hub (19 October 2026).** The Map now goes down to single muscles, bones, joints and nerves — Week 2 lower limb first — as one-line leaf rows read off the slides, each name checked against the page it cites (`work/revision-check.mjs`). Bones link to muscles through the joint they form and the muscle moves, because the 2026 deck teaches actions by joint and not origins or insertions. Link reasons are numbered dots on the map with a list under it; "Test me" is gone. Brain 3D is now a connections hub: the chosen topic in the middle, its links round it, tap to walk a chain. Spec: `docs/superpowers/specs/2026-10-19-revise-depth-and-3d-hub.md`.
```

- [ ] **Step 4: Bring the spec's row table in line with what was built**

In `docs/superpowers/specs/2026-10-19-revise-depth-and-3d-hub.md`, in the "Data" section:
- In the `muscle` row, change "Extra fields" to `joints` and "Derived links" to
  `muscle → joint, reason = the action`.
- In the `nerve` row, set "Extra fields" to `supplies: { <id>: '<reason>' }`, `from`, and
  "Derived links" to `nerve → each target; nerve → from, "branch of"`.
- In the `joint` row, set "Extra fields" to `— (its type goes in its line)`.
- Add under the table: "`src` may list several pages; the name (or `match`, where the
  slide words it differently) must be on one of them."
- In the example row under the table, replace `nerve: 'n_sup_gluteal', ` with nothing
  (a muscle row carries no nerve; the nerve row's `supplies` makes that link).
- In "3D hub" → "Interaction", change "(… the last 5)" to "(the last 5; 3 on a phone, where
  the trail has to fit one line)".

- [ ] **Step 5: Run the checks and commit**

```bash
node work/codemap-check.mjs
node work/revision-check.mjs | tail -1
git add CLAUDE.md docs/TRAPS.md outputs/README.md docs/superpowers/specs/2026-10-19-revise-depth-and-3d-hub.md
git commit -m "docs(revise): record the deeper Map and the connections hub

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

Do not push. Tell the owner the work is committed locally and ask before pushing, since a
push publishes the site.

---

## After this plan

- **Plan 2 — W1, W3, W4 leaves.** Same row format. Read `hss.w1.2026`, `hss.msk.2026`,
  `hss.move.2026`, `hss.ul.2026` and `hss.hnt.2026` page by page, as Task 4 Step 5 does for
  W2. One file per week, merged in `registry.js`.
- **Plan 3 — intake, then W5–W7 leaves.** Take `2627_M2_L5_Nervous system I.pdf`,
  `2627_M2_L6_brain_cranial_N.pdf` and `2627_M2_L7_ANS_spec_sen.pdf` through
  `docs/superpowers/specs/2026-09-10-new-source-intake-workflow.md`, with source ids ending
  `.2026`, so their text is in `work/source-text.json`. Then write their leaves: the 12
  cranial nerves, the named tracts, brain parts, meninges, ventricles, receptors, eye and
  ear parts, and the ANS divisions.
