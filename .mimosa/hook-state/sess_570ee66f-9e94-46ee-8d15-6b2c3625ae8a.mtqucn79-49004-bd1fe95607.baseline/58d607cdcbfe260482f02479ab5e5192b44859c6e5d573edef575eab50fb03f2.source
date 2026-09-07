/*
 * Hidden tray
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, esc } from './imports.js';
import { hideUncoverBanner } from './search-viewer-open.js';

/* ------------------------------------------------------------------ *
 * Hidden tray
 * ------------------------------------------------------------------ */
export function renderHiddenTray(rows) {
  const tray = $$('hiddenTray');
  if (!tray) return;
  rows = rows || (window.__osteo && window.__osteo.hiddenList ? window.__osteo.hiddenList() : []);
  tray.classList.toggle('empty', !rows.length);
  $$('hiddenCount').textContent = rows.length ? `Hidden (${rows.length})` : 'Hidden';
  if (!rows.length) { tray.classList.remove('open'); $$('hiddenToggle').setAttribute('aria-expanded', 'false'); }
  $$('hiddenList').innerHTML = rows.map((r) =>
    `<div class="hrow"><span class="hn">${esc(r.name)}</span>${r.auto ? '<span class="hy">auto</span>' : ''}<span class="hl">${esc(r.layer)}</span><button data-show="${esc(r.token)}">show</button></div>`).join('')
    + (rows.length > 1 ? `<button class="hall" id="hiddenShowAll">Show all</button>` : '');
  $$('hiddenList').querySelectorAll('[data-show]').forEach((b) => {
    b.onclick = () => { if (window.__osteo) window.__osteo.unhide(b.dataset.show); };
  });
  const all = $$('hiddenShowAll');
  if (all) all.onclick = () => { if (window.__osteo) window.__osteo.unhide('all'); hideUncoverBanner(); };
}
