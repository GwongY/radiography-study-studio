/*
 * Review -- mistakes, due items, and the mastery map that replaced the
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, STUDY_ITEMS, esc, getItem, getSubject } from './imports.js';
import { itemAttempted, itemDue, store } from './storage-versioned-keys.js';
import { setActiveNav } from './navigation-five-destinations.js';
import { showView } from './small-ui-helpers.js';
import { startSession } from './session-engine.js';

/* ------------------------------------------------------------------ *
 * Review -- mistakes, due items, and the mastery map that replaced the
 * old dashboard dialog.
 * ------------------------------------------------------------------ */

export let reviewTab = 'mistakes';

function reviewRow(title, note, badge, color) {
  return `<div class="unit-row" style="cursor:default"><span class="grow"><b>${esc(title)}</b><small>${esc(note)}</small></span><span class="mono" style="color:${color}">${esc(badge)}</span></div>`;
}

export function renderReviewTab(tab) {
  reviewTab = tab || 'mistakes';
  setActiveNav('review');
  $$('reviewTabs').innerHTML = [['mistakes', 'My mistakes'], ['due', 'Due']]
    .map(([id, label]) => `<button class="seg${reviewTab === id ? ' active' : ''}" data-rtab="${esc(id)}">${esc(label)}</button>`).join('');
  $$('reviewTabs').querySelectorAll('[data-rtab]').forEach((b) => { b.onclick = () => renderReviewTab(b.dataset.rtab); });

  let copy = '', rows = '', cta = '', ctaMode = null;

  if (reviewTab === 'mistakes') {
    const ids = [];
    store.mistakes.forEach((m) => { if (ids.indexOf(m.itemId) < 0) ids.push(m.itemId); });
    const entries = ids.map((id) => ({ item: getItem(id), n: store.mistakes.filter((m) => m.itemId === id).length }))
      .filter((r) => r.item).sort((a, b) => b.n - a.n);
    copy = 'Everything you have got wrong, most-repeated first. Each one keeps its own explanation and the confusion that caused it.';
    rows = entries.map((r) => reviewRow(r.item.title, getSubject(r.item.subject).title,
      r.n + ' lapse' + (r.n === 1 ? '' : 's'), r.n >= 3 ? 'var(--red)' : 'var(--orange)')).join('')
      || '<div class="empty">No mistakes recorded yet.</div>';
    if (entries.length) { cta = 'Drill these ' + entries.length + ' \u2192'; ctaMode = { mode: 'mistakes' }; }
  } else if (reviewTab === 'due') {
    const due = STUDY_ITEMS.filter((i) => itemAttempted(i.id) && itemDue(i.id));
    copy = due.length + ' item' + (due.length === 1 ? ' is' : 's are') + ' due. Delayed recall only scores on the first attempt after a gap of a day or more.';
    rows = due.map((i) => reviewRow(i.title, getSubject(i.subject).title, 'due', 'var(--teal)')).join('')
      || '<div class="empty">Nothing due right now.</div>';
    if (due.length) { cta = 'Start due session \u2192'; ctaMode = { mode: 'weakest', limit: due.length }; }
  }

  /* .reviewrows wraps into columns instead of running one long list down the
     middle of a wide display -- the mistakes list was a 400px column with two
     thirds of a 4K screen empty on either side of it. */
  $$('reviewBody').innerHTML = `<p class="small">${esc(copy)}</p><div class="reviewrows">${rows}</div>`
    + (cta ? `<button class="primary" id="reviewCtaBtn" style="margin-top:14px">${esc(cta)}</button>` : '');
  if (ctaMode && $$('reviewCtaBtn')) $$('reviewCtaBtn').onclick = () => startSession(ctaMode);

  showView('reviewView');
}
