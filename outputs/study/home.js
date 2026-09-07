/*
 * Home
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, STORAGE_PREFIX, STUDY_ITEMS, STUDY_MODES, esc, getItem, getSubject, itemsForSubject, ui } from './imports.js';
import { examPool } from './exam-mode.js';
import { STEPS, pickItems, setStep, startSession } from './session-engine.js';
import { goTo, openSessionOverlay, setActiveNav } from './navigation-five-destinations.js';
import { itemAttempted, itemDue, itemScore, read, store, write } from './storage-versioned-keys.js';
import { renderExamTab } from './review-mistakes-due.js';
import { showView } from './small-ui-helpers.js';
import { DEADLINES, SOON_MS, deadlineStats, isDone, paintImminent, untilText } from './assessments-and-marks.js';

/* ------------------------------------------------------------------ *
 * Home
 * ------------------------------------------------------------------ */

export function getContinueTarget() {
  const raw = read(STORAGE_PREFIX + 'continue', null);
  if (!raw || !raw.itemId) return null;
  const item = getItem(raw.itemId);
  if (!item) return null;
  const siblings = itemsForSubject(item.subject);
  const subjectIndex = siblings.findIndex((i) => i.id === item.id);
  /* A resume point saved by an older build can name a step this one no longer
     has -- Review was one -- and the card looks that step up by name to print
     its label. Anything unrecognised opens the lesson. */
  const step = STEPS.some((x) => x.id === raw.step) ? raw.step : 'learn';
  const hasSessionItems = Array.isArray(raw.itemIds) && raw.itemIds.length > 0;
  const index = typeof raw.index === 'number' ? raw.index : (subjectIndex < 0 ? 0 : subjectIndex);
  const total = typeof raw.total === 'number' && raw.total > 0 ? raw.total : siblings.length;
  return {
    item,
    step,
    index,
    total,
    itemIds: hasSessionItems ? raw.itemIds : null,
    opts: raw.opts || null,
    modeLabel: raw.modeLabel || null,
  };
}
export function saveContinue(itemId, step) {
  const itemIds = ui.session?.items ? ui.session.items.map((i) => i.id) : null;
  const index = typeof ui.session?.index === 'number' ? ui.session.index : 0;
  const total = itemIds ? itemIds.length : 1;
  const opts = ui.session?.opts || null;
  const modeLabel = ui.session?.modeLabel || null;
  write(STORAGE_PREFIX + 'continue', { itemId, step, itemIds, index, total, opts, modeLabel });
  if (itemId && step) {
    write('rss-step:' + itemId, step);
    write(STORAGE_PREFIX + 'step:' + itemId, step);
  }
}
export function getItemStep(itemId) {
  return read('rss-step:' + itemId, null) || read(STORAGE_PREFIX + 'step:' + itemId, null);
}
export function resumeContinue(cont) {
  const items = (cont.itemIds && cont.itemIds.length)
    ? cont.itemIds.map(getItem).filter(Boolean)
    : [cont.item];
  const index = cont.index >= 0 && cont.index < items.length ? cont.index : 0;
  ui.session = {
    opts: cont.opts || { mode: 'ids', ids: items.map((i) => i.id) },
    mode: null,
    items,
    index,
    step: cont.step,
    qIndex: 0,
    answered: false,
    startedAt: 0,
    results: [],
    hooksOnly: cont.step === 'remember' && !!cont.opts?.hooksOnly,
  };
  ui.session.modeLabel = cont.modeLabel || 'Study session';
  openSessionOverlay();
  setStep(cont.step);
}
function relativeTime(ts) {
  const mins = Math.round((Date.now() - ts) / 60000);
  if (mins < 60) return `${mins}m`;
  if (mins < 1440) return `${Math.round(mins / 60)}h`;
  return `${Math.round(mins / 1440)}d`;
}

export function renderToday() {
  setActiveNav('today');
  const totalItems = STUDY_ITEMS.length;
  const attempted = STUDY_ITEMS.filter((i) => itemAttempted(i.id));
  const due = attempted.filter((i) => itemDue(i.id));

  const cont = getContinueTarget();
  $$('continueCard').innerHTML = cont ? `
    <div class="task-kicker">Continue</div>
    <h2 class="editorial" style="font-size:calc(24px*var(--ts));margin:8px 0 0">${esc(cont.item.title)}</h2>
    <p class="small" style="margin-top:6px">${esc(getSubject(cont.item.subject).title)} · item ${cont.index + 1} of ${cont.total} · left off at ${esc(STEPS.find((s) => s.id === cont.step).label)}</p>
    <div style="height:6px;border-radius:99px;background:rgba(255,255,255,.09);overflow:hidden;margin-top:14px"><div style="height:100%;width:${Math.round(itemScore(cont.item.id) * 100)}%;border-radius:99px;background:var(--teal)"></div></div>
    <div style="display:flex;align-items:center;gap:12px;margin-top:14px">
      <button class="primary" id="continueBtn">Continue →</button>
      <span class="small">${Math.round(itemScore(cont.item.id) * 100)}% mastered</span>
    </div>` : `
    <div class="task-kicker">Continue</div>
    <h2 class="editorial" style="font-size:calc(24px*var(--ts));margin:8px 0 0">Nothing in progress</h2>
    <p class="small" style="margin-top:6px">Start a session below to begin.</p>`;
  if (cont) $$('continueBtn').onclick = () => resumeContinue(cont);

  /*
   * Every mode that pickItems() implements gets a tile.
   *
   * Six of the nine were built and then never given a way in -- including
   * "Explain my mistakes", which is the one a learner wants most in the week
   * before an exam. 'subject' is the exception: it is reached by choosing a
   * topic in Learn, so a tile for it would be a second door onto the same room
   * with no topic chosen.
   *
   * The count under each tile is the real thing, taken by running the picker
   * rather than by a separate estimate that could drift from it, and a mode
   * with nothing to offer is disabled and says why instead of opening an empty
   * session and toasting an apology.
   */
  const TILE_COLOR = { new: 'var(--green)', daily: 'var(--teal)', weakest: 'var(--orange)',
    quick10: 'var(--teal)', exam: 'var(--blue)', hooks: 'var(--blue)',
    mistakes: 'var(--red)', mixed: 'var(--muted)' };
  const EMPTY_WHY = {
    new: 'Every item has been seen',
    weakest: 'Nothing attempted yet',
    quick10: 'Nothing due or weak yet',
    mistakes: 'No mistakes logged — good',
    hooks: 'No memory aids found',
  };
  const tiles = STUDY_MODES.filter((m) => m.id !== 'subject').map((m) => {
    /* Exam mode builds a PAPER, so its tile counts questions rather than
       items -- and counts them from the same pool buildPaper draws on, so the
       number on the card cannot drift from the questions actually available. */
    const isExam = m.id === 'exam';
    const count = isExam ? examPool().length : pickItems({ mode: m.id }).length;
    return { ...m, count, noun: isExam ? 'question' : 'item', color: TILE_COLOR[m.id] || 'var(--teal)' };
  });
  $$('sessionTiles').innerHTML = tiles.map((m) => `
    <button class="rss-mode" style="flex-direction:column;align-items:flex-start;gap:5px;min-height:104px" data-mode="${esc(m.id)}"${m.count ? '' : ' disabled'}>
      <span class="ic" style="font-size:17px;color:${m.color}">${m.icon}</span>
      <b>${esc(m.label)}</b><small>${esc(m.hint)}</small>
      <span class="cnt">${m.count ? m.count + ' ' + m.noun + (m.count === 1 ? '' : 's') + ' ready' : esc(EMPTY_WHY[m.id] || 'Nothing to study')}</span>
    </button>`).join('');
  $$('sessionTiles').querySelectorAll('[data-mode]').forEach((b) => {
    if (b.disabled) return;
    b.onclick = () => startSession({ mode: b.dataset.mode });
  });

  const weakest = attempted.slice().sort((a, b) => itemScore(a.id) - itemScore(b.id)).slice(0, 3);
  $$('weakestList').innerHTML = weakest.length ? weakest.map((i) => `
    <button class="unit-row" data-weak="${esc(i.id)}">
      <span class="grow"><b>${esc(i.title)}</b><small>${esc(getSubject(i.subject).title)}</small></span>
      <span class="meter"><span style="width:${Math.round(itemScore(i.id) * 100)}%;background:var(--orange)"></span></span>
      <span class="pc">${Math.round(itemScore(i.id) * 100)}%</span>
    </button>`).join('') : '<div class="empty">Nothing studied yet — start a session to build this list.</div>';
  $$('weakestList').querySelectorAll('[data-weak]').forEach((b) => { b.onclick = () => renderExamTab('mistakes'); });
  $$('allWeakBtn').onclick = () => goTo('exam');

  const streak = (store.meta && store.meta.streak) || 0;
  $$('todayStatrow').innerHTML = [
    [String(streak), 'day streak'], [String(due.length), 'due now'],
    [`${totalItems ? Math.round(attempted.reduce((n, i) => n + itemScore(i.id), 0) / totalItems * 100) : 0}%`, 'mastered'],
  ].map(([v, l], idx) => `<div class="s"><b${idx === 1 ? ' style="color:var(--orange)"' : ''}>${esc(v)}</b><small>${esc(l)}</small></div>`).join('');

  /*
   * What is due, beside what is mastered.
   *
   * Mastery answers "have I learnt it"; this answers "is anything about to be
   * taken off me". They are different anxieties and the app only ever spoke to
   * the first, which is how a 60%-weighted test can arrive as a surprise in a
   * study app that knew its date all along.
   */
  const nowT = new Date();
  const dstats = deadlineStats(nowT);
  $$('deadlineStatrow').innerHTML = [
    [String(dstats.open), 'to hand in', ''],
    [String(dstats.soon), 'this week', dstats.soon ? 'var(--orange)' : ''],
    [String(dstats.overdue), 'overdue', dstats.overdue ? 'var(--red)' : ''],
  ].map(([v, l, colour]) => `<div class="s"><b${colour ? ` style="color:${colour}"` : ''}>${esc(v)}</b><small>${esc(l)}</small></div>`).join('');
  const upcoming = DEADLINES
    .filter((r) => !isDone(r.s.id) && r.to >= nowT)
    .slice(0, 3);
  $$('deadlineList').innerHTML = upcoming.length ? upcoming.map((r) => `
    <div class="unit-row" style="cursor:default">
      <span class="grow"><b>${esc(r.s.title)}</b><small>${esc(r.s.subject)}${r.s.weight ? ` · ${r.s.weight}%` : ''}</small></span>
      <span class="pc" style="color:${r.to - nowT <= SOON_MS ? 'var(--orange)' : 'var(--muted)'}">${esc(untilText(r.to, nowT))}</span>
    </div>`).join('')
    : `<div class="empty">${dstats.overdue ? 'Nothing ahead — but something is overdue.' : 'Nothing left on the published deadlines.'}</div>`;
  $$('allDeadlinesBtn').onclick = () => { ui.courseTab = 'assess'; goTo('course'); };

  $$('recentList').innerHTML = store.mistakes.slice(0, 4).map((m) => {
    const item = getItem(m.itemId);
    return item ? `<div style="display:flex;gap:10px;align-items:baseline;font-size:calc(12.5px*var(--ts))"><span style="color:${m.correct ? 'var(--green)' : 'var(--red)'}">●</span><span style="flex:1">${esc(item.title)}</span><span class="small">${esc(relativeTime(m.at))}</span></div>` : '';
  }).join('') || '<div class="empty">No activity yet.</div>';

  showView('todayView');
  /* After showView, or the banner writes into a view still marked hidden and
     clears itself. */
  paintImminent(nowT);
}
