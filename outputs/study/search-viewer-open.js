/*
 * Search -> viewer: open the model, select the part, auto-uncover, and
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, ui } from './imports.js';
import { closeSearchSheet } from './global-search.js';
import { goTo } from './navigation-destinations.js';
import { isPhoneViewer, setTaskPanelExpanded, setToolsPanelOpen } from './small-ui-helpers.js';

/* ------------------------------------------------------------------ *
 * Search -> viewer: open the model, select the part, auto-uncover, and
 * say what was hidden.
 * ------------------------------------------------------------------ */
export function openStructureInViewer(spec) {
  closeSearchSheet();
  ui.viewerTab = '3d';
  goTo('viewer');
  /* The card that names what was found lives in Explore. A desktop opens it; a phone stays on the model (one panel at a time, and the tools panel closes). */
  if (isPhoneViewer()) setToolsPanelOpen(false); else setTaskPanelExpanded(true);
  setTimeout(async () => {
    if (!window.__osteo || !window.__osteo.revealStructure) return;
    await window.__osteo.revealStructure(spec);
    hideUncoverBanner();
  }, 140);
}
/* Revise's "Show in 3D": the viewer's Cell mode, at a level, stage and label (outputs/cell-zoom.js SHOW_IN_3D). */
export function openCellInViewer(target) {
  ui.viewerTab = '3d';
  goTo('viewer');
  setTimeout(() => {
    if (window.__osteo && window.__osteo.enterCellZoom) void window.__osteo.enterCellZoom(target).catch((error) => console.error('Cell zoom failed.', error));
  }, 140);
}
export function hideUncoverBanner() {
  const el = $$('uncoverBanner');
  if (el) el.classList.add('hidden');
}
