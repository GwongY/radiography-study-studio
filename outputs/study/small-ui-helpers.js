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
  /* A view that was hidden a moment ago now has a measurable header. */
  measureHeads();
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
 * The header is an OVERLAY on these widths (see .navhead in app.css), so this
 * only adds and removes a class: the scroller's geometry does not change when
 * it goes, which is what keeps the text under your thumb from jumping. The
 * height it needs to reserve is published separately, below.
 */
function untuck() {
  document.querySelectorAll('.navhead.tucked').forEach((h) => h.classList.remove('tucked'));
}

/*
 * The header's own height, published to its container as --headh.
 *
 * The tucking header is an overlay and the scroller underneath reserves that
 * height as its own top padding, so this number IS the layout: a stale one
 * leaves a gap above the content or hides the top of it. It changes for real reasons -- the compact
 * variant, a rotation, the Aa text-size control, a kicker wrapping to two
 * lines -- and a ResizeObserver catches all of them without anyone having to
 * remember to call anything.
 */
let measureHeads = () => {};
function publishHeadHeight() {
  const heads = [...document.querySelectorAll('.navhead')];
  if (!heads.length) return;
  const write = (h) => {
    /* Tucking translates the header, it does not resize it, so offsetHeight is
       still the full height here and there is no need to untuck to measure.
       A header inside a hidden container measures 0; skip it and come back. */
    if (h.parentElement && h.offsetHeight) h.parentElement.style.setProperty('--headh', `${h.offsetHeight}px`);
  };
  measureHeads = () => heads.forEach(write);
  measureHeads();

  /*
   * Three ways of hearing about a change, because the obvious one is not
   * enough on its own.
   *
   * A ResizeObserver is the natural fit and handles the ordinary cases -- the
   * Aa control, a rotation, a kicker wrapping. But RO callbacks are delivered
   * as part of the rendering steps, so in a tab that has stopped painting they
   * never arrive: measured here, the session overlay's header went from hidden
   * to 113px tall and RO said nothing, leaving --headh unset and the header
   * overlapping the first 39px of the lesson. The same frozen-frame trap as
   * the rAF throttle in tuckOnRead, and worse, because this one is load-bearing
   * layout rather than a stuck animation.
   *
   * A MutationObserver on the container's class is not frame-driven -- it runs
   * on the microtask checkpoint -- so it fires the moment the session overlay
   * loses `hidden`, which is exactly when its header first has a height.
   * showView calls measureHeads too, for the case where the class was already
   * right before this ran.
   */
  if (typeof ResizeObserver === 'function') {
    const ro = new ResizeObserver((entries) => entries.forEach((e) => write(e.target)));
    heads.forEach((h) => ro.observe(h));
  }
  const mo = new MutationObserver(() => measureHeads());
  heads.forEach((h) => { if (h.parentElement) mo.observe(h.parentElement, { attributes: true, attributeFilter: ['class'] }); });
  addEventListener('resize', () => measureHeads(), { passive: true });
  /*
   * And once the web fonts arrive. The header is measured on first paint, when
   * the title is still in the fallback face and a wider one -- measured here at
   * 108px against the 73px it settles to, which is 35px of dead band above the
   * first line of every page. A ResizeObserver would normally catch the swap;
   * this promise catches it even where the observer's frame never comes.
   */
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => measureHeads());
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
     * The work being throttled is a subtraction and a class toggle -- there is
     * no layout read left in here at all, now that the height is published by
     * publishHeadHeight instead of measured on the way past.
     */
    pane.addEventListener('scroll', () => {
      const y = pane.scrollTop;
      const moved = y - last;
      if (Math.abs(moved) < 8) return;
      last = y;
      head.classList.toggle('tucked', moved > 0 && y > 90);
    }, { passive: true });
  });
}

/* Runs after every part has evaluated — see the entry point. */
export function init() {
  window.xrayFallback = xrayFallback;
  publishHeadHeight();
  tuckOnRead();
}
