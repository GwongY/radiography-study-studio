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

const VIEWS = ['todayView', 'learnView', 'viewerView', 'reviewView', 'moreView'];
export function showView(id) {
  VIEWS.forEach((v) => $$(v).classList.toggle('hidden', v !== id));
  const pane = $$('navContent');
  if (pane) pane.scrollTo({ top: 0, behavior: 'smooth' });
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

/* Runs after every part has evaluated — see the entry point. */
export function init() {
  window.xrayFallback = xrayFallback;
}
