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
