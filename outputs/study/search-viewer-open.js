/*
 * Search -> viewer: open the model, select the part, auto-uncover, and
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, esc } from './imports.js';
import { closeSearchSheet, dismissSessionForNav } from './global-search-one.js';
import { goTo } from './navigation-five-destinations.js';

/* ------------------------------------------------------------------ *
 * Search -> viewer: open the model, select the part, auto-uncover, and
 * say what was hidden.
 * ------------------------------------------------------------------ */
export function openStructureInViewer(spec) {
  closeSearchSheet();
  dismissSessionForNav();
  goTo('viewer');
  setTimeout(async () => {
    if (!window.__osteo || !window.__osteo.revealStructure) return;
    const res = await window.__osteo.revealStructure(spec);
    if (res && res.ok && res.covered && res.covered.length) {
      showUncoverBanner(spec.name || spec.id || 'that structure', res.covered);
    } else {
      hideUncoverBanner();
    }
  }, 140);
}
function showUncoverBanner(target, names) {
  const el = $$('uncoverBanner');
  if (!el) return;
  const list = names.slice(0, 4).join(', ') + (names.length > 4 ? ` +${names.length - 4} more` : '');
  el.innerHTML = `<span>Hid <b>${esc(list)}</b> to uncover ${esc(target)}.</span>
    <button class="show" id="uncoverShow">Show them</button>
    <button class="keep" id="uncoverKeep">Keep hidden</button>`;
  el.classList.remove('hidden');
  $$('uncoverShow').onclick = () => { if (window.__osteo) window.__osteo.unhide('auto'); hideUncoverBanner(); };
  $$('uncoverKeep').onclick = hideUncoverBanner;
  clearTimeout(showUncoverBanner.t);
  showUncoverBanner.t = setTimeout(hideUncoverBanner, 9000);
}
export function hideUncoverBanner() {
  const el = $$('uncoverBanner');
  if (el) el.classList.add('hidden');
}
