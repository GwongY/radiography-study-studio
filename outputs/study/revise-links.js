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
  el.innerHTML = `<li class="rv-lhead">Links (${rows.length})</li>${rows.map((r) => `<li><button type="button" class="rv-lrow" data-node="${esc(r.id)}"><span class="rv-ln">${r.n}</span><span class="rv-lname">${esc(r.label)}${r.inside ? ` <small>inside ${esc(r.inside)}</small>` : ''}</span><span class="rv-lwhy">${esc(r.why)}</span></button></li>`).join('')}`;
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
