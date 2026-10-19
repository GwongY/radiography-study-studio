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
import { dropSystem, leafLine, mergeLeaves, topicNodes } from '../outputs/revision/leaves.js';
import { linkRows } from '../outputs/revision/link-rows.js';
import { describe, firstSentence } from '../outputs/revision/describe.js';
import { HUB, angle, hubLayout, pickFirst, SYSORDER } from '../outputs/revision/hub.js';
import { checkSystems, colourDistance, contrast, crossFor, legendKeys, lineIsUseful, needsOwn, ownProblems, rowWeekOk, starProblems, viewerEligible, yueProblems } from '../outputs/revision/rules.js';

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

/* ---- a row folded into its same-named parent still gives its own rows a colour group ---- */
const am = mergeLeaves({ NODES: [{ id: 'b', l: 'Brainstem', s: 'cns', w: [6], t: '' }], EDGES: [], TREE: { label: 'r', kids: [{ id: 'b' }] } }, [{ k: 'part', id: 'rb', l: 'Brainstem', parent: 'b', w: 6, src: ['x.2026', 1] }, { k: 'part', id: 'rm', l: 'Medulla', parent: 'rb', w: 6, src: ['x.2026', 1] }]);
ok(am.NODES.find((n) => n.id === 'rm').s === 'cns', 'a row under a folded row keeps its colour group');


console.log('\nrules (spec 2026-10-19-physiology-revise.md section 2)');
ok(!lineIsUseful('x2') && !lineIsUseful('(1-7)') && !lineIsUseful('8 pairs') && !lineIsUseful('lateral rotation'), 'counts, ranges and two-word fragments are not useful lines');
ok(!lineIsUseful('acetabulofemoral; ball-and-socket'), 'a 25+ character line of under three words is not useful');
ok(!lineIsUseful('12 345 678 (90) x 1234567 - 89'), 'digits and brackets alone are not useful however long');
ok(lineIsUseful('mature bone cells in lacunae'), 'a short real sentence is useful');
ok(needsOwn({ line: '' }) && needsOwn({}) && !needsOwn({ line: 'the spaces that hold osteocytes' }), 'needsOwn follows lineIsUseful');
ok(ownProblems('', 'X').join() === 'missing', 'an empty own sentence is missing');
ok(ownProblems('Renin.', 'Renin').includes('under 40 characters'), 'too short');
ok(ownProblems('An enzyme released by the kidney that starts a hormone chain', 'Renin').includes('no full stop at the end'), 'needs a full stop');
ok(ownProblems('An enzyme released by the kidney at 125 ml per minute.', 'Renin').some((p) => p.startsWith('a digit')), 'no digits: numbers come from slides');
ok(ownProblems('An enzyme released by the kidney ★ that starts a chain.', 'Renin').some((p) => p.startsWith('a star')), 'no stars in own words: a ★ fact belongs on a thread step with its page');
ok(ownProblems('An enzyme released by the kidney that starts a hormone chain.', 'Renin').length === 0, 'a plain sentence passes');
ok(viewerEligible({ id: 'a' }) && !viewerEligible({ id: 'a', viewer: false }), 'a topic is eligible unless it says viewer: false');
ok(['part', 'muscle', 'bone', 'joint', 'nerve'].every((k) => viewerEligible({ leaf: k })), 'structure rows are eligible');
ok(['group', 'cell', 'substance', 'process'].every((k) => !viewerEligible({ leaf: k })), 'groups, cells, substances and processes never get a viewer button');
ok(!viewerEligible({ leaf: 'part', viewer: false }), 'a structure row can opt out');
const ldata = { NODES: [{ id: 'a', s: 'x' }, { id: 'b', s: 'y' }, { id: 'c', s: 'x' }] };
ok([...legendKeys(ldata, new Set(['a', 'c']))].join() === 'x', 'the legend holds only the systems of what is shown');
ok(legendKeys(ldata, new Set()).size === 0, 'nothing shown, no legend entry');
ok(Math.round(colourDistance('#000000', '#ffffff')) === 442 && contrast('#000000', '#ffffff') > 20.9, 'colour maths');
const goodSys = [{ id: 'A', systems: [{ key: 'a1', label: 'A1', col: '#9fb2bb', body: 'cells' }, { key: 'a2', label: 'A2', col: '#e879c6' }], hubOrder: ['a1', 'a2'], data: { NODES: [{ id: 'n', s: 'a1' }] } },
  { id: 'B', systems: [{ key: 'b1', label: 'B1', col: '#9FB2BB', body: 'cells' }], hubOrder: ['b1'], data: { NODES: [{ id: 'm', s: 'b1' }] } }];
ok(checkSystems(goodSys).length === 0, 'a valid pair of subjects passes (a shared colour for the same body system is fine)');
ok(checkSystems([{ ...goodSys[0], systems: [...goodSys[0].systems, { key: 'a3', label: 'A3', col: '#e97ac5' }] }]).some((p) => p.includes('too alike')), 'two near-identical colours in one subject fail');
ok(checkSystems([{ ...goodSys[0], systems: [{ key: 'a1', label: 'A1', col: '#203038' }, goodSys[0].systems[1]] }]).some((p) => p.includes('4.5:1')), 'a colour that disappears on the legend fails');
ok(checkSystems([goodSys[0], { ...goodSys[1], systems: [{ key: 'a1', label: 'B1', col: '#5b8def' }], hubOrder: ['a1'], data: { NODES: [{ id: 'm', s: 'a1' }] } }]).some((p) => p.includes('used by')), 'a key used by two subjects fails');
ok(checkSystems([goodSys[0], { ...goodSys[1], systems: [{ key: 'b1', label: 'B1', col: '#e879c6', body: 'heart' }] }]).some((p) => p.includes('different body system')), 'the same colour for a different body system fails');
ok(checkSystems([{ ...goodSys[0], data: { NODES: [{ id: 'n', s: 'zz' }] } }]).some((p) => p.includes('not in the list')), 'a node whose system is not listed fails');
const sessions = [{ subject: 'S', week: 2, kind: 'lecture' }, { subject: 'S', week: 6, kind: 'tutorial' }, { subject: 'S', week: 9, kind: 'lecture' }, { subject: 'S', week: 11, kind: 'lecture' }, { subject: 'T', week: 10, kind: 'lecture' }];
const decks = { d2: { weeks: [2] }, d6: { weeks: [6] }, d9: { weeks: [9, 11] } };
ok(rowWeekOk({ w: 2, src: ['d2', 1] }, decks, sessions, 'S') === '', 'a row in its deck\'s week passes');
ok(rowWeekOk({ w: 3, src: ['d2', 1] }, decks, sessions, 'S').includes('deck weeks'), 'a row in another week fails');
ok(rowWeekOk({ w: 2, src: ['zz', 1] }, decks, sessions, 'S').includes('not one of'), 'a source that is not one of the decks fails (labs, tutorials, old decks)');
ok(rowWeekOk({ w: 6, src: ['d6', 1] }, decks, sessions, 'S').includes('no S lecture'), 'a week with only a tutorial is not a lecture week');
ok(rowWeekOk({ w: 11, src: ['d9', 1] }, decks, sessions, 'S') === '' && rowWeekOk({ w: 10, src: ['d9', 1] }, decks, sessions, 'S') !== '', 'a deck taught over two lectures allows either week and nothing between');
const cx = [{ a: ['A', 'x'], b: ['B', 'y'], why: 'w', src: ['s', 1], match: 'w' }];
const fw = (s, id) => ({ 'A|x': 1, 'B|y': 8 }[`${s}|${id}`] ?? null);
ok(crossFor(cx, 'A', 'x', 8, fw).map((c) => `${c.subject}:${c.id}:${c.why}`).join() === 'B:y:w', 'a cross-subject link shows its far end and reason');
ok(crossFor(cx, 'B', 'y', 8, fw)[0].id === 'x', 'from either end');
ok(crossFor(cx, 'A', 'x', 7, fw).length === 0, 'not before the far end is taught');
ok(crossFor(cx, 'A', 'z', 8, fw).length === 0 && crossFor([{ ...cx[0], b: ['B', 'gone'] }], 'A', 'x', 8, fw).length === 0, 'nothing for another box, or for a far end that does not exist');
ok(yueProblems('', ['a']).join() === 'missing', 'a thread needs its 廣東話 line');
ok(yueProblems('肺 → 血（hemoglobin）→ 細胞', ['Oxygen binds hemoglobin in the lungs']).length === 0, "a retelling that uses the steps' own English words passes");
ok(yueProblems('肺 → 血（myoglobin）', ['Oxygen binds hemoglobin']).some((p) => p.includes('myoglobin')), 'an English word the steps never used fails');
ok(yueProblems('每分鐘 125 ml', ['GFR is 120 ml/min']).some((p) => p.includes('125')), 'a number the steps never gave fails');
ok(yueProblems('Oxygen binds hemoglobin', ['Oxygen binds hemoglobin']).includes('no Chinese'), 'it is Cantonese');
ok(starProblems({ text: 'Each hemoglobin molecule can carry four oxygen molecules.', page: 812, ch: 23 }, [23]).length === 0, "a ★ fact with a page from the lecture's chapter passes");
ok(starProblems({ text: 'Each hemoglobin molecule can carry four oxygen molecules.', page: 812, ch: 19 }, [23]).some((p) => p.startsWith('chapter')), "a ★ from a chapter the lecture is not built on fails");
ok(starProblems({ text: 'Each hemoglobin molecule can carry four oxygen molecules.', ch: 23 }, [23]).includes('no textbook page'), 'a ★ needs its page');
ok(starProblems({ text: 'Short', page: 1, ch: 23 }, [23]).some((p) => p.startsWith('text')), 'a ★ is one real sentence');


console.log('\nphysiology kinds and sourced topics');
const pbase = { NODES: topicNodes([{ id: 'p_k', l: 'Kidney', s: 'p_renal', w: 5, src: ['k.2026', 2], line: 'regulates plasma by forming urine' }], { 'k.2026': 'K slides' }), EDGES: [], TREE: { label: 'root', kids: [{ sys: 'p_renal', label: 'Kidney', kids: [{ id: 'p_k' }] }] } };
ok(pbase.NODES[0].w.join() === '5' && pbase.NODES[0].src.join() === 'k.2026,2' && pbase.NODES[0].viewer === false, 'a topic keeps its week as a list, its source, and is not a viewer target unless it says so');
ok(pbase.NODES[0].t.includes('regulates plasma') && pbase.NODES[0].t.includes('From K slides, p2'), "a topic's note is its slide line and its source");
ok(topicNodes([{ id: 't', l: 'T', s: 's', w: 1, src: ['k.2026', 1], viewer: true }])[0].viewer === true, 'a topic can ask for the viewer button');
const prows = [
  { k: 'cell', id: 'p5_jg', l: 'Juxtaglomerular cells', parent: 'p_k', w: 5, makes: { p5_renin: 'secrete renin' }, src: ['k.2026', 39] },
  { k: 'substance', id: 'p5_renin', l: 'Renin', parent: 'p_k', w: 5, acts: { p5_raas: 'starts the cascade' }, own: 'An enzyme from the kidney that starts a chain of hormones.', src: ['k.2026', 40] },
  { k: 'process', id: 'p5_raas', l: 'RAAS', parent: 'p_k', w: 5, next: { p_k: 'raises blood pressure' }, line: 'renin to angiotensin to aldosterone', src: ['k.2026', 40] },
];
const pm = mergeLeaves(pbase, prows, { 'k.2026': 'K slides' });
const phas = (a, b, why) => pm.EDGES.some((e) => pairKey(e[0], e[1]) === pairKey(a, b) && e[2] === why);
ok(phas('p5_jg', 'p5_renin', 'secrete renin'), 'a cell links to what it makes');
ok(phas('p5_renin', 'p5_raas', 'starts the cascade'), 'a substance links to what it acts on');
ok(phas('p5_raas', 'p_k', 'raises blood pressure'), 'a process links to what it leads to');
ok(pm.NODES.find((n) => n.id === 'p5_renin').own === 'An enzyme from the kidney that starts a chain of hormones.', 'own words travel with the row');
ok(leafLine({ k: 'substance', acts: { a: 'x', b: 'y' } }) === 'x, y' && leafLine({ k: 'process' }) === '', 'a substance with no line shows what it does; a process with no line shows nothing');
const ordered = pickFirst([{ id: 'a', sys: 'p_gi', deg: 1 }, { id: 'b', sys: 'p_cvs', deg: 1 }], 14, ['p_cvs', 'p_gi']).shown.map((n) => n.id).join();
ok(ordered === 'b,a', 'the hub groups balls in the order the subject gives');

console.log(fail ? `\n${fail} FAILED` : '\nALL PASS');
process.exit(fail ? 1 : 0);
