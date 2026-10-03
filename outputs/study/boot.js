/*
 * Boot
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, ui } from './imports.js';
import { migrate } from './storage-versioned-keys.js';
import { renderLayerRail, renderLearn } from './subject.js';
import { renderNavButtons } from './navigation-five-destinations.js';
import { renderOverlayCard } from './spatial-overlay-controls.js';
import { renderViewerTools } from './viewer-tools.js';
import { isPhoneViewer, scrollViewTop, setTaskPanelExpanded, setToolsPanelOpen } from './small-ui-helpers.js';

/* ------------------------------------------------------------------ *
 * Boot
 * ------------------------------------------------------------------ */

/* Contextual back: only meaningful on a phone drilled into a topic. */
/* The bottom bar's Spread, Cut and Regions buttons each open the Tools panel
   on their own section; pressing the one already open closes it. */
document.querySelectorAll('.ctrlpill [data-tsec]').forEach((b) => {
  b.onclick = () => {
    const panel = $$('viewerToolsPanel');
    const showing = !panel.classList.contains('tools-collapsed') && panel.dataset.show === b.dataset.tsec;
    setToolsPanelOpen(!showing, b.dataset.tsec);
    /* One panel at a time on a phone — see setToolsPanelOpen. */
    if (!showing && isPhoneViewer()) setTaskPanelExpanded(false);
    if (!showing) { renderOverlayCard(); renderViewerTools(); $$('viewerSheet').scrollTop = 0; }
  };
});
$$('layerRailToggle').onclick = () => {
  const open = getComputedStyle($$('layerRail')).display === 'none';
  $$('stageHome').classList.toggle('layers-open', open);
  $$('stageHome').classList.toggle('layers-closed', !open);
  $$('layerRailToggle').setAttribute('aria-expanded', String(open));
};
$$('layerRailToggle').setAttribute('aria-expanded', String(!matchMedia('(max-width:1023px)').matches));
matchMedia('(max-width:1023px)').addEventListener('change', () => {
  $$('layerRailToggle').setAttribute('aria-expanded', String(getComputedStyle($$('layerRail')).display !== 'none'));
});

/* Runs after every part has evaluated — see the entry point. */
/*
 * Ask the browser to keep what has been downloaded.
 *
 * The model cache holds up to 14 MB of .glb, and until this call every byte of
 * it sat in best-effort storage the browser may evict under pressure without
 * telling anyone -- along with the shell, and with the localStorage a student's
 * whole progress record lives in. A student who studied on the train and came
 * back to an empty app would have no way to tell that from a bug.
 *
 * Deliberately fire-and-forget. It resolves false when the browser declines
 * (Chrome grants it on engagement and site-install signals, so a first visit
 * often does not get it), it is absent entirely in some browsers, and there is
 * nothing useful to say to the reader either way. Nothing downstream waits on
 * it, and the catch is what keeps that true.
 */
function askForPersistence() {
  try { navigator.storage?.persist?.().catch(() => {}); } catch { /* no storage manager */ }
}

export function init() {
  window.addEventListener('rss:physiologychange',renderLayerRail);
  askForPersistence();
  migrate();
  renderNavButtons();
  $$('closeSource').onclick = () => $$('sourceDialog').close();
  $$('closeCoverage').onclick = () => $$('coverageDialog').close();
  $$('closeAbout').onclick = () => $$('aboutDialog').close();
  /* ...and so does coming back out of one. */
  $$('navBackBtn').onclick = () => { ui.learnDrill = false; renderLearn(); scrollViewTop(); };
}

