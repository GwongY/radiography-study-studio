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
    /* Show that there IS something below, without hiding the model to do it. */
    requestAnimationFrame(() => sheet.scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
  } else {
    $$('viewerSkeletonPane').scrollTop = 0;
  }
};

/* Runs after every part has evaluated — see the entry point. */
export function init() {
  migrate();
  renderNavButtons();
  $$('closeSource').onclick = () => $$('sourceDialog').close();
  $$('closeCoverage').onclick = () => $$('coverageDialog').close();
  $$('closeAbout').onclick = () => $$('aboutDialog').close();
  $$('navBackBtn').onclick = () => { ui.learnDrill = false; renderLearn(); };
}
