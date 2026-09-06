/*
 * Separating the layers — the arithmetic, driven without a GPU.
 *
 * outputs/studio/tools-and-capture.js slides each loaded layer's ROOT sideways
 * so the layers can be read one at a time. Three things about that are easy to
 * get wrong and impossible to see in a screenshot:
 *
 *   it must be IDEMPOTENT. loadExtraModel calls applySeparation again for every
 *   layer switched on, so an offset applied relative to the CURRENT position
 *   rather than to a remembered home walks the body sideways a little further
 *   with every layer — slowly, plausibly, and permanently, because collapsing
 *   the slider would return it to wherever it had drifted to;
 *
 *   it must COLLAPSE EXACTLY. Anything left over at spread 0 is a body that is
 *   quietly no longer registered with the skeleton every cavity is measured
 *   against;
 *
 *   the SLOTS must be counted over the layers actually loaded. Counted over the
 *   fixed list, muscles and nerves land in slots 1 and 5 with two body-widths
 *   of nothing between them.
 *
 * The browser smoke test covers what it looks like. This covers what it is.
 *
 * Usage: node work/separation-check.mjs
 */
const stub = () => {
  const fn = function () { return p; };
  const p = new Proxy(fn, {
    get: (t, k) => (k === 'then' ? undefined : k === Symbol.toPrimitive ? () => '{}' : p),
    apply: () => p, construct: () => p, set: () => true, has: () => true,
  });
  return p;
};
for (const n of ['document', 'window', 'localStorage', 'sessionStorage', 'navigator', 'location',
  'requestAnimationFrame', 'cancelAnimationFrame', 'matchMedia', 'indexedDB', 'caches', 'history',
  'getComputedStyle', 'addEventListener', 'removeEventListener', 'screen', 'visualViewport',
  'performance', 'ResizeObserver', 'IntersectionObserver', 'Image', 'fetch']) {
  if (globalThis[n] === undefined) globalThis[n] = stub();
}

const { state } = await import('../outputs/studio/imports.js');
const { SEPARATION_ORDER, SEPARATION_STEP, applySeparation, separation, setSeparation } =
  await import('../outputs/studio/tools-and-capture.js');

let failures = 0;
const fail = (m) => { failures += 1; console.log(`  FAIL  ${m}`); };
const ok = (m) => console.log(`  ok    ${m}`);
const expect = (label, got, want) => (Object.is(got, want) ? ok(`${label} → ${got}`)
  : fail(`${label} → ${got}, expected ${want}`));

/* A layer root is only ever read for .position.x and .userData here. */
const HOME = { muscle: 0.11, joint: 0.11, organs: 0.11, circulatory: 0.11, nervous: 0.11, lymphatic: 0.11 };
function load(...keys) {
  state.extraModels = {};
  keys.forEach((k) => { state.extraModels[k] = { root: { position: { x: HOME[k], y: 1, z: 2 }, userData: {} } }; });
}
const x = (k) => state.extraModels[k].root.position.x;
/* which slot a root ended up in, read back off the geometry rather than
   asked of the allocator — this is the number that actually shipped */
const slot = (k, t = 1) => Math.round((x(k) - HOME[k]) / (SEPARATION_STEP * t));

function reset() { state.concepts = new Set(); state._conceptObjs = new Map(); state._cavInfo = new Map(); state.cavityMode = 'normal'; state.xray = null; state.separation = 0; }
reset();

console.log('— the fan —');
expect('the skeleton is not in it', SEPARATION_ORDER.includes('skeleton'), false);
expect('all six other layers are', SEPARATION_ORDER.length, 6);
load('muscle', 'organs');
setSeparation(1);
expect('two layers sit one slot out on opposite sides', `${slot('muscle')},${slot('organs')}`, '1,-1');
load(...SEPARATION_ORDER);
setSeparation(1);
expect('six layers fill three slots a side',
  SEPARATION_ORDER.map((k) => slot(k)).join(','), '1,-1,2,-2,3,-3');
expect('and stay balanced about the midline',
  Math.round(SEPARATION_ORDER.reduce((n, k) => n + slot(k), 0)), 0);

console.log('\n— slots are counted over what is LOADED —');
/* The bug this is here for: with the two ends of the fixed list on, a fixed
   ranking puts two body-widths of nothing between them. */
load('muscle', 'lymphatic');
setSeparation(1);
expect('muscles and lymphatic, the far ends of the list, are neighbours',
  `${slot('muscle')},${slot('lymphatic')}`, '1,-1');

console.log('\n— idempotence, which is the one that drifts silently —');
load('muscle', 'organs', 'nervous');
setSeparation(0.6);
const once = SEPARATION_ORDER.filter((k) => state.extraModels[k]).map((k) => x(k));
for (let i = 0; i < 12; i++) applySeparation();
const twelve = SEPARATION_ORDER.filter((k) => state.extraModels[k]).map((k) => x(k));
expect('twelve re-applications land in exactly the same place',
  twelve.every((v, i) => v === once[i]), true);

console.log('\n— collapsing is exact —');
setSeparation(1);
setSeparation(0);
expect('every root is back on its home x, to the bit',
  Object.keys(state.extraModels).every((k) => x(k) === HOME[k]), true);
expect('and separation() says so', separation(), 0);

console.log('\n— a layer switched on mid-spread —');
load('muscle', 'organs');
setSeparation(1);
const muscleAt2 = x('muscle');
state.extraModels.nervous = { root: { position: { x: HOME.nervous, y: 1, z: 2 }, userData: {} } };
applySeparation();          /* what loadExtraModel does */
expect('the new layer is placed rather than left at the midline', slot('nervous'), 2);
expect('it does not disturb the ones already out', x('muscle'), muscleAt2);
setSeparation(0);
expect('and it collapses home with the rest', x('nervous'), HOME.nervous);

console.log('\n— the projection refuses to be lied to —');
load('muscle', 'organs');
setSeparation(0);
state.xray = { on: true };
expect('setSeparation is refused while the projection is up', setSeparation(1), 0);
expect('and nothing moved', x('muscle'), HOME.muscle);
state.xray = null;
expect('with the projection gone it works again', setSeparation(1), 1);

console.log('\n— the derived-geometry caches —');
/*
 * meshPointsLocal caches vertices per mesh for the life of the session, in the
 * skeleton pivot's frame. A cavity built while the layers are apart would not
 * just draw one wrong overlay; it would leave that mesh permanently wrong.
 */
state._cavPts = new Map([['x', 1]]);
state._cavCtx = { sig: 'skeleton,muscle' };
setSeparation(0.3);
expect('a change of spread drops the vertex cache', state._cavPts, null);
expect('and the build context with it', state._cavCtx, null);
state._cavPts = new Map();
setSeparation(0.3);
expect('an unchanged spread leaves them alone', state._cavPts instanceof Map, true);
setSeparation(0);

console.log(failures ? `\n${failures} FAILED` : '\nALL PASS');
process.exit(failures ? 1 : 0);
