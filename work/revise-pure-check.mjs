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
import { dropSystem, leafLine, mergeLeaves } from '../outputs/revision/leaves.js';
import { linkRows } from '../outputs/revision/link-rows.js';
import { describe, firstSentence } from '../outputs/revision/describe.js';
import { HUB, angle, hubLayout, pickFirst, SYSORDER } from '../outputs/revision/hub.js';

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
const eye = { k: 'muscle', id: 'sr', l: 'Superior rectus', parent: 'm', w: 2, moves: { ey: 'elevation; adduction' }, note: 'cranial nerve III', src: ['x.2026', 1] };
const mv = mergeLeaves(base, [{ k: 'part', id: 'ey', l: 'Eyeball', parent: 'm', w: 2, src: ['x.2026', 1] }, eye]);
ok(mv.EDGES.some((e) => pairKey(e[0], e[1]) === pairKey('sr', 'ey') && e[2] === 'elevation; adduction'), 'a muscle links to a structure it moves that is not a joint, with the action as the reason');
ok(leafLine(eye) === 'elevation; adduction · cranial nerve III', "a muscle's one line carries what it moves as well as the joints it acts at");
ok(mergeLeaves(base, []).EDGES.length === 1, 'no rows, no change');

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

/* ---- describe: every box gets a sentence ---- */
ok(describe({ leaf: true, line: 'flexion' }) === 'flexion.', "a leaf's own line is the sentence");
ok(describe({ leaf: false, t: '<b>Epithelial</b> covers, lines and secretes. <b>Connective</b> binds.' }) === 'Epithelial covers, lines and secretes.', "a topic's first note sentence");
ok(describe({ leaf: true, line: '' }, { kids: ['a', 'b', 'c', 'd', 'e'] }) === 'Covers a, b, c, d and 1 more.', 'a box with nothing of its own says what it covers');
ok(describe({ leaf: true }, { parent: 'Facial bones', grand: 'Skull' }) === 'Part of Facial bones, in Skull.', 'a bare leaf says what it is part of and what that is in');
ok(describe(null, { parent: '' }) === 'Part of this map.' && describe(null, { kids: ['One'] }) === 'Covers One.', 'a group heading and the root are never empty');
ok(firstSentence('x'.repeat(300)).length <= 150 && firstSentence('x'.repeat(300)).endsWith('…'), 'a long first sentence is cut at the limit');
ok(describe({ leaf: true, line: '  ' }, {}).length > 3, 'a blank line falls back to the derived sentence');

/* ---- dropSystem: a body-system group left out of the map ---- */
{
  const base = { NODES: [{ id: 'a', s: 'x', w: [1] }, { id: 'b', s: 'y', w: [1] }], EDGES: [['a', 'b', 'why']],
    TREE: { label: 'r', kids: [{ sys: 'x', label: 'X', kids: [{ id: 'a' }] }, { sys: 'y', label: 'Y', kids: [{ id: 'b' }] }] } };
  const rs = [{ k: 'part', id: 'a1', l: 'A1', parent: 'a', w: 1, src: ['s', 1] },
    { k: 'part', id: 'b1', l: 'B1', parent: 'b', w: 1, links: { a1: 'x', b: 'y' }, from: 'a1', src: ['s', 1] }];
  const d = dropSystem(base, rs, 'x');
  ok(d.base.NODES.length === 1 && d.base.EDGES.length === 0, 'the headings of the group and the links ending at them go');
  ok(d.rows.length === 1 && d.rows[0].id === 'b1' && Object.keys(d.rows[0].links).join() === 'b' && !('from' in d.rows[0]), 'its rows go, and links from other rows into it are stripped');
  ok(d.base.TREE.kids.length === 1 && d.base.TREE.kids[0].label === 'Y', 'its branch of the tree goes');
}

console.log(fail ? `\n${fail} FAILED` : '\nALL PASS');
process.exit(fail ? 1 : 0);
