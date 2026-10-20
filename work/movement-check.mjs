/*
 * Movement check — the Viewer's Movements panel says only what a 2026 slide says,
 * and drives bones that exist.
 *
 *   node work/movement-check.mjs
 *
 * outputs/movements.js names each movement, its joint and the two ends of its
 * range. Those names are presented as course terms, so each movement cites a
 * 2026 HSS2011 deck and a quote; this holds every quote against the committed
 * page text (work/source-text.json) with the same comparison revision-check
 * uses. It also holds every bone a movement moves, holds still or pivots on to
 * a mesh in the skeleton GLB, matched the way studio/live-physiology.js
 * meshesNamed matches it at run time (three.js drops the dot before the side
 * letter: "Radius.r" loads as "Radiusr").
 */
import { readFileSync } from 'node:fs';
import { MOVEMENTS, MOVEMENT_REVISE } from '../outputs/movements.js';
import { SOURCE_FILES } from '../outputs/study/course-data.js';
import { REVISION } from '../outputs/revision/registry.js';
import { normaliseCitationText } from './lib/source-lesson-map.mjs';
import { namesIn } from './lib/mesh-names.mjs';

let fail = 0;
const ok = (good, msg) => { console.log(`  ${good ? 'ok  ' : 'FAIL'} ${msg}`); if (!good) fail++; };
const TEXT = JSON.parse(readFileSync(new URL('./source-text.json', import.meta.url), 'utf8')).sources;

/* three.js PropertyBinding.sanitizeNodeName, then meshesNamed's own normalising */
const loaded = namesIn('assets/z-anatomy-skeleton.glb').names.map((n) => n.replace(/\s/g, '_').replace(/[[\].:/]/g, ''));
const norm = (s) => String(s || '').toLowerCase().replace(/[()'’]/g, '').replace(/[_\-.,]+/g, ' ').replace(/\s+/g, ' ').trim();
const LOADED = new Set(loaded.map(norm));
const resolves = (name, side) => {
  const w = norm(name);
  const suffix = side === 'left' ? 'l' : side === 'right' ? 'r' : null;
  return LOADED.has(w) || (suffix && LOADED.has(w + suffix)) || (!suffix && (LOADED.has(`${w}l`) || LOADED.has(`${w}r`)));
};

console.log('— every movement cites a 2026 slide that says it —');
ok(MOVEMENTS.length > 0 && new Set(MOVEMENTS.map((m) => m.id)).size === MOVEMENTS.length, `${MOVEMENTS.length} movements, ids unique`);
for (const m of MOVEMENTS) {
  ok(Array.isArray(m.cite) && m.cite.length > 0, `${m.id}: cites at least one page`);
  for (const c of m.cite || []) {
    const src = SOURCE_FILES[c.ref];
    ok(!!src && src.subject === 'HSS2011' && /\.2026$/.test(c.ref), `${m.id}: ${c.ref} is a registered 2026 HSS2011 source`);
    const text = TEXT[c.ref];
    const page = text && text.pages[c.page - 1];
    ok(!!page && normaliseCitationText(page).includes(normaliseCitationText(c.match)), `${m.id}: "${c.match}" is on ${c.ref} p${c.page}`);
  }
  /* the shown words come off those pages: the joint, and each end of the range */
  const pages = (m.cite || []).map((c) => normaliseCitationText((TEXT[c.ref] || { pages: [] }).pages[c.page - 1] || '')).join(' ');
  for (const word of [m.joint, ...m.ends]) ok(pages.includes(normaliseCitationText(word)), `${m.id}: "${word}" is on a cited page`);
  ok(Array.isArray(m.range) && m.range.length === 2 && m.range[0] < m.range[1], `${m.id}: a range low to high`);
}

console.log('— every bone named is in the skeleton GLB —');
for (const m of MOVEMENTS) {
  const named = [...m.moves, ...m.fixed, m.pivot.mesh, ...(m.axis.from ? [m.axis.from.mesh, m.axis.to.mesh] : [])];
  const missing = [...new Set(named)].filter((n) => !resolves(n, m.side));
  ok(!missing.length, `${m.id}: ${new Set(named).size} bones resolve${missing.length ? ` — missing: ${missing.join(', ')}` : ''}`);
  ok(!m.moves.some((n) => m.fixed.includes(n)), `${m.id}: nothing both moves and holds still`);
}

console.log('— a movement that moves the hand moves all of it —');
{
  const HANDLIKE = /(of hand|metacarpal|scaphoid|lunate|triquetrum|pisiform|trapezium|trapezoid|capitate|hamate)/i;
  /* the right hand's bones as the GLB names them, side letter off */
  const handBones = namesIn('assets/z-anatomy-skeleton.glb').names.filter((n) => /\.r$/.test(n) && HANDLIKE.test(n)).map((n) => n.replace(/\.r$/, ''));
  ok(handBones.length >= 27, `the GLB has ${handBones.length} right-hand bones`);
  for (const m of MOVEMENTS.filter((x) => x.side === 'right' && x.moves.some((n) => HANDLIKE.test(n)))) {
    const left = handBones.filter((n) => !m.moves.some((x) => norm(x) === norm(n)));
    ok(!left.length, `${m.id}: carries every hand bone${left.length ? ` — left behind: ${left.join(', ')}` : ''}`);
  }
}

console.log('— the Revise link goes to a real box —');
ok(!!REVISION[MOVEMENT_REVISE.subject] && REVISION[MOVEMENT_REVISE.subject].data.NODES.some((n) => n.id === MOVEMENT_REVISE.id),
  `${MOVEMENT_REVISE.subject} box "${MOVEMENT_REVISE.id}" exists`);

console.log(fail ? `\n${fail} FAILED` : '\nALL PASS');
process.exit(fail ? 1 : 0);
