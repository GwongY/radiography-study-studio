/*
 * Boot
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, ui } from './imports.js';
import { migrate } from './storage-versioned-keys.js';
import { renderLearn } from './subject.js';
import { renderNavButtons } from './navigation-five-destinations.js';
import { renderOverlayCard } from './spatial-overlay-controls.js';
import { renderViewerTools } from './viewer-tools.js';
import { scrollViewTop } from './small-ui-helpers.js';

/* ------------------------------------------------------------------ *
 * Boot
 * ------------------------------------------------------------------ */

/* Contextual back: only meaningful on a phone drilled into a topic. */
/* The viewer keeps four primary controls on the canvas; everything the old
   studio showed at once now sits behind this one toggle. */
$$('viewerMoreBtn').onclick = () => {
  const sheet = $$('viewerSheet');
  const open = sheet.classList.toggle('hidden') === false;
  $$('viewerMoreBtn').classList.toggle('active', open);
  $$('viewerMoreBtn').setAttribute('aria-expanded', open ? 'true' : 'false');
  /* Opening the model controls must not shrink the model: the pane becomes a
     scroller and the sheet sits below a full-height stage. */
  $$('viewerSkeletonPane').classList.toggle('sheet-open', open);
  if (open) {
    renderOverlayCard();
    /* The sheet is the only place the tools are shown, and the engine can have
       moved underneath it — a region preset, a cut, a pin — so it is redrawn
       from engine state on open rather than trusted to be current. */
    renderViewerTools();
    /* Show that there IS something below, without hiding the model to do it. */
    /* Smooth only if the reader has not asked for stillness — this is a real
       animation and prefers-reduced-motion covers scrolling too. */
    const still = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    requestAnimationFrame(() => sheet.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'nearest' }));
  } else {
    $$('viewerSkeletonPane').scrollTop = 0;
  }
};

/* Runs after every part has evaluated — see the entry point. */
/*
 * Ask the browser to keep what has been downloaded.
 *
 * The model cache holds up to 39 MB of .glb, and until this call every byte of
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
  askForPersistence();
  migrate();
  renderNavButtons();
  $$('closeSource').onclick = () => $$('sourceDialog').close();
  $$('closeCoverage').onclick = () => $$('coverageDialog').close();
  $$('closeAbout').onclick = () => $$('aboutDialog').close();
  /* ...and so does coming back out of one. */
  $$('navBackBtn').onclick = () => { ui.learnDrill = false; renderLearn(); scrollViewTop(); };
}
