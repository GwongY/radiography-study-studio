// Run this async function in a dev-server tab (it boots the viewer itself), at a phone
// width (390x844) and a tablet width (820x1180). It drives the Viewer's Movements panel
// through its own sliders and asserts, for every movement in outputs/movements.js:
//   - exactly the named bones move (the right side), and nothing else in the skeleton;
//   - each moves the right way: flexion brings the hand forward and up, abduction takes it
//     away from the midline and up, pronation carries the thumb forward then medially;
//   - Stop and reset puts every bone back exactly (matrixWorld identical) and the slider at rest;
// and that the panel's "In Revise" button opens the HSS2011 Movement vocabulary box.
async () => {
  const checks = [];
  const assert = (v, label) => { if (!v) throw new Error(label); checks.push(label); };
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const viewer = await import('./study/what-is-under.js');
  viewer.openViewer(); await window.__osteo.boot(); await wait(1000);
  const { state: s } = await import('./studio/imports.js');
  const { MOVEMENTS } = await import('./movements.js?v=1');
  const T = s.THREE;
  document.querySelector('.ctrlpill [data-tsec="moves"]').click(); await wait(300);
  const pill = document.querySelector('.ctrlpill');
  assert(pill.scrollWidth <= pill.clientWidth + 1, `bottom bar fits (${pill.scrollWidth} <= ${pill.clientWidth})`);
  assert(document.documentElement.scrollWidth <= innerWidth, 'no sideways page scroll');
  const label = (m) => String(m.userData.label || m.name).replace(/_/g, ' ').toLowerCase();
  const snap = () => new Map(s.fullMeshes.map((m) => { m.updateMatrixWorld(true); return [m, m.matrixWorld.toArray()]; }));
  const centre = (n) => { const b = new T.Box3(); s.fullMeshes.filter((m) => label(m) === n).forEach((m) => b.expandByObject(m)); return b.getCenter(new T.Vector3()); };
  const midX = (() => { const b = new T.Box3(); s.fullMeshes.forEach((m) => b.expandByObject(m)); return b.getCenter(new T.Vector3()).x; })();
  const anterior = Math.sign(centre('sternum').z - centre('vertebra t6').z);
  const drive = async (m, a) => { const sl = document.querySelector(`[data-mvslider="${m.id}"]`); sl.value = String(a); sl.dispatchEvent(new Event('input')); await wait(60); return sl; };
  for (const m of MOVEMENTS) {
    const want = new Set(m.moves.map((n) => `${n.toLowerCase()}r`));
    const before = snap();
    const hand0 = centre('third metacarpal boner'), thumb0 = centre('first metacarpal boner');
    const mid = Math.round((m.range[0] + m.range[1]) / 2);
    await drive(m, mid);
    const thumbMid = centre('first metacarpal boner');
    const sl = await drive(m, m.range[1]);
    assert(Math.round(s.movement.angle) === m.range[1], `${m.id}: slider drives the angle to ${m.range[1]}`);
    const after = snap();
    const moved = [...before].filter(([mesh, a]) => a.some((v, i) => Math.abs(v - after.get(mesh)[i]) > 1e-6)).map(([mesh]) => label(mesh));
    assert(moved.length === want.size && moved.every((n) => want.has(n)), `${m.id}: exactly its ${want.size} bones move (${moved.length} moved)`);
    const hand1 = centre('third metacarpal boner'), thumb1 = centre('first metacarpal boner');
    const side = Math.sign(hand0.x - midX);
    if (m.id === 'elbowFlexion') assert((hand1.z - hand0.z) * anterior > 0.5 && hand1.y > hand0.y + 2, `${m.id}: the hand comes forward and up`);
    if (m.id === 'shoulderAbduction') assert((hand1.x - midX) * side > (hand0.x - midX) * side + 2 && hand1.y > hand0.y + 2, `${m.id}: the hand goes away from the midline and up`);
    if (m.id === 'supination') assert((thumbMid.z - thumb0.z) * anterior > 0.1 && Math.abs(thumb1.x - midX) < Math.abs(thumb0.x - midX) - 0.5, `${m.id}: the thumb comes forward, then medially`);
    document.getElementById('mvReset').click(); await wait(30);
    const back = snap();
    let worst = 0; for (const [mesh, a] of before) a.forEach((v, i) => { worst = Math.max(worst, Math.abs(v - back.get(mesh)[i])); });
    assert(worst === 0 && !s.movement && sl.value === sl.dataset.rest, `${m.id}: Stop and reset restores every bone exactly (worst ${worst})`);
  }
  document.querySelector('#mvList').closest('section').querySelector('[data-openrevise]').click(); await wait(2500);
  const { reviseState } = await import('./study/revise.js');
  assert(reviseState().subject === 'HSS2011' && /Movement vocabulary/.test(document.querySelector('#rvSide h3')?.textContent || ''), 'In Revise opens the Movement vocabulary box');
  return { pass: true, viewport: [innerWidth, innerHeight], checks };
}
