// Run this default function through the Browser pane's javascript_tool (or Chrome evaluate_script) on the local app.
// Holds the owner's rules 2, 3, 6 and 7, the subject switch and the links into the other subject in a real page.
// docs/superpowers/specs/2026-10-19-physiology-revise.md section 2.
export default async function () {
  const assert = (ok, message) => { if (!ok) throw new Error(message); };
  const until = async (fn) => { for (let i = 0; i < 150; i++) { if (fn()) return; await new Promise((r) => setTimeout(r, 100)); } throw new Error('Timed out'); };
  const rv = await import('./study/revise.js');
  /* Opening a box is asynchronous (a folded branch is unfolded first): wait for its own notes before reading them. */
  const open = async (id) => { const j = document.getElementById('rvJump'); j.value = id; j.dispatchEvent(new Event('change')); try { await until(() => document.querySelector('#rvSide [data-to3d="' + CSS.escape(id) + '"]')); } catch (e) { throw new Error('the notes of ' + id + ' never opened (' + rv.reviseState().subject + ' W' + rv.reviseState().week + ')'); } };
  const { REVISION } = await import('./revision/registry.js?v=1');
  const { viewerEligible } = await import('./revision/rules.js?v=1');
  const { pruneTree } = await import('./revision/weeks.js?v=1');
  rv.renderRevise();
  const report = [];
  for (const id of Object.keys(REVISION)) {
    rv.setSubject(id);
    const st0 = rv.reviseState();
    assert(st0.subject === id, `switch to ${id}`);
    assert(document.querySelector(`#rvSubjects [data-subject="${id}"]`).getAttribute('aria-pressed') === 'true', `${id}: its button is pressed`);
    assert(document.querySelectorAll('#rvWeekBar [data-week]').length === st0.last, `${id}: one chip per week up to ${st0.last}`);
    for (let n = 1; n <= st0.last; n++) {
      rv.setWeek(n, 'manual');
      await new Promise((r) => setTimeout(r, 400)); /* the Map is made again on a week change */
      await until(() => document.querySelectorAll('#rvMm .markmap-node').length > 0);
      /* rule 3: a Map box shows its name, its week tags and "new", nothing else */
      for (const fo of document.querySelectorAll('#rvMm .markmap-node foreignObject')) {
        const c = fo.cloneNode(true);
        c.querySelectorAll('.mmt,.mwk,.wknew').forEach((e) => e.remove());
        assert(!c.textContent.trim(), `${id} W${n}: a Map box carries "${c.textContent.trim().slice(0, 40)}"`);
      }
      /* rule 6: the legend is exactly the systems taught by week n, in both legends */
      const want = new Set(REVISION[id].data.NODES.filter((x) => Math.min(...x.w) <= n).map((x) => x.s));
      for (const lg of document.querySelectorAll('#reviseView .rv-legend')) {
        const shown = new Set([...lg.querySelectorAll('[data-sys]')].filter((e) => !e.hidden).map((e) => e.dataset.sys));
        assert(shown.size === want.size && [...want].every((k) => shown.has(k)), `${id} W${n}: legend ${[...shown]} but taught ${[...want]}`);
      }
      /* rule 2: nothing taught later is drawn. A heading pruneTree keeps for week n (a branch with no id) may share a later row's name. */
      const data = REVISION[id].data;
      const keptHeads = new Set();
      const heads = (t) => { if (!t.id && t.label) keptHeads.add(t.label); (t.kids || []).forEach(heads); };
      heads(pruneTree(data, n).tree);
      const taught = new Set(data.NODES.filter((x) => Math.min(...x.w) <= n).map((x) => x.l));
      const later = data.NODES.filter((x) => Math.min(...x.w) > n).map((x) => x.l);
      const drawn = new Set([...document.querySelectorAll('#rvMm .mmt')].map((e) => e.textContent));
      const culprits = later.filter((l) => drawn.has(l) && !taught.has(l) && !keptHeads.has(l));
      assert(!culprits.length, `${id} W${n}: a later topic is drawn: ${culprits.join(', ')}`);
    }
    /* rule 7: the viewer button only where it may be — every topic, and up to 25 rows of each kind */
    const st = rv.reviseState();
    const jump = document.getElementById('rvJump');
    const offered = [];
    const perKind = {};
    const sample = REVISION[id].data.NODES.filter((x) => Math.min(...x.w) <= st.week).filter((x) => { const k = x.leaf || 'topic'; perKind[k] = (perKind[k] || 0) + 1; return k === 'topic' || perKind[k] <= 25; });
    for (const node of sample) {
      await open(node.id);
      const btn = document.querySelector(`#rvSide [data-toviewer="${CSS.escape(node.id)}"]`);
      if (btn) { offered.push(`${node.l} (${node.leaf || 'topic'})`); assert(viewerEligible(node), `${id}: viewer button on ${node.l}, a ${node.leaf}`); }
    }
    report.push({ subject: id, last: st0.last, autoWeek: st0.week, checked: sample.length, viewer: offered });
    rv.setWeek(st0.week, 'auto'); /* hand the subject back to the calendar */
  }
  /* the owner's answer 8: a link into the other subject switches subject and opens the far box (a = ABCT2326 end) */
  const { CROSS } = await import('./revision/cross-links.js?v=1');
  const crossed = [];
  for (const c of CROSS.filter((_, i) => i % 6 === 0)) { /* every sixth: the first five-odd and the heart, nerve and muscle ones added later */
    rv.setSubject(c.a[0]);
    rv.setWeek(rv.reviseState().last, 'manual');
    const jump = document.getElementById('rvJump');
    await open(c.a[1]);
    const btn = document.querySelector(`#rvSide [data-cross="${CSS.escape(c.b[0])}"][data-crossid="${CSS.escape(c.b[1])}"]`);
    assert(btn, `cross link ${c.a.join(':')} to ${c.b.join(':')}: no button in the notes`);
    btn.click();
    await until(() => rv.reviseState().subject === c.b[0] && document.getElementById('rvJump').value === c.b[1]);
    crossed.push(`${c.a.join(':')} to ${c.b.join(':')}`);
  }
  for (const r of report) { rv.setSubject(r.subject); rv.setWeek(r.autoWeek, 'auto'); } /* back to the calendar */
  rv.setSubject(Object.keys(REVISION)[0]);
  return { subjects: report, crossed };
}
