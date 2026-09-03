/*
 * Small UI helpers
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, esc } from './imports.js';

/* ------------------------------------------------------------------ *
 * Small UI helpers
 * ------------------------------------------------------------------ */

let toastTimer = null;
export function toast(msg) {
  const el = $$('toast');
  if (!el) return;
  el.textContent = msg; el.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 4200);
}

/* A missing radiograph image degrades to a plain notice instead of a
   broken-image icon or a blocked session. */
export function xrayFallback(el) {
  const div = document.createElement('div');
  div.className = 'emptybox';
  div.textContent = 'Image not found — add it to assets/xray/ and reload.';
  el.replaceWith(div);
}

const VIEWS = ['todayView', 'learnView', 'viewerView', 'courseView', 'reviewView', 'moreView'];
/*
 * Which view is up, so a RE-RENDER can be told from a NAVIGATION.
 *
 * Every render function ends by calling showView with its own id, and every
 * control on the page ends by calling its render function -- so switching the
 * Course tab, marking attendance, choosing a tutorial group or stepping a week
 * all used to throw the reader back to the top of the page. On a phone that
 * meant losing your place on every single tap.
 *
 * Scrolling to the top is right when the DESTINATION changes, and wrong when
 * the same page redraws itself. Somewhere in between is drilling into a topic:
 * same view, new content, and it does want the top -- those two callers ask
 * for it by hand with scrollViewTop().
 */
let shownView = null;
export function scrollViewTop() {
  const pane = $$('navContent');
  if (pane) pane.scrollTo({ top: 0, behavior: 'smooth' });
}
export function showView(id) {
  const moved = id !== shownView;
  shownView = id;
  VIEWS.forEach((v) => $$(v).classList.toggle('hidden', v !== id));
  if (moved) { scrollViewTop(); untuck(); }
  if (id === 'viewerView' && window.__osteo) {
    window.__osteo.boot();
    setTimeout(() => window.__osteo.resize(), 60);
  }
  if (id !== 'viewerView' && window.__osteo) {
    /* Hiding and the concept overlays are a within-viewer working state. */
    if (window.__osteo.clearConcepts) window.__osteo.clearConcepts();
    if (window.__osteo.unhide) window.__osteo.unhide('all');
  }
}

export function coveragePill(status) {
  const map = { full: ['full', 'Full coverage'], substitute: ['substitute', 'Substitute source'], limited: ['limited', 'Limited source coverage'], none: ['none', 'No source materials'] };
  const [cls, label] = map[status] || ['none', status];
  return `<span class="pill ${cls}">${esc(label)}</span>`;
}

/*
 * The header tucks away while you read downwards.
 *
 * Two headers, two scrollers: the main one over #navContent, and the session
 * overlay's own over its .navcontent, which is where a lesson is actually
 * read. Each pairs with the .navhead immediately before it, so nothing here
 * needs to know which is which.
 *
 * Three things it deliberately does not do:
 *   - tuck in the VIEWER. That pane sets overflow:hidden and never scrolls,
 *     and its header carries the 3D/Projection switch, which has to stay put.
 *     (No scroll events arrive there, so this is a fact rather than a guard.)
 *   - tuck on a jitter. Under 8px of travel is a finger resting, not a read.
 *   - tuck at the top. Above 90px there is nothing to reclaim yet, and a
 *     header that vanishes on the first flick reads as a glitch.
 *
 * The height is measured, not assumed: --tuck is written from the element
 * before the class goes on, so a header wrapped to two lines still clears.
 */
function untuck() {
  document.querySelectorAll('.navhead.tucked').forEach((h) => h.classList.remove('tucked'));
}
function tuckOnRead() {
  document.querySelectorAll('.navcontent').forEach((pane) => {
    const head = pane.previousElementSibling;
    if (!head || !head.classList.contains('navhead')) return;
    let last = pane.scrollTop;
    /*
     * Synchronous, deliberately: no requestAnimationFrame throttle.
     *
     * The obvious shape here is a queued flag cleared inside a rAF callback.
     * It does not survive a tab that stops painting -- a backgrounded tab, or
     * one iOS has suspended -- because the frame that would clear the flag
     * never arrives, and the handler is then dead for the rest of the page's
     * life. Measured: in a hidden tab, document.hidden true, zero frames in
     * 800ms, and the header stuck wherever it was when the tab went away.
     *
     * The work being throttled is a subtraction and a class toggle. offsetHeight
     * is the only layout read, and it happens on the transition into tucked --
     * a few times a page, not a few times a second.
     */
    pane.addEventListener('scroll', () => {
      const y = pane.scrollTop;
      const moved = y - last;
      if (Math.abs(moved) < 8) return;
      last = y;
      const tuck = moved > 0 && y > 90;
      if (tuck && !head.classList.contains('tucked')) head.style.setProperty('--tuck', `${head.offsetHeight}px`);
      head.classList.toggle('tucked', tuck);
    }, { passive: true });
  });
}

/* Runs after every part has evaluated — see the entry point. */
export function init() {
  window.xrayFallback = xrayFallback;
  tuckOnRead();
}
