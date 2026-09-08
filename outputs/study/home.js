/*
 * Home
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, STORAGE_PREFIX, STUDY_MODES, esc, getItem, getSubject, itemsForSubject, ui } from './imports.js';
import { examPool } from './exam-mode.js';
import { STEPS, pickItems, setStep, startSession } from './session-engine.js';
import { goTo, openSessionOverlay, setActiveNav } from './navigation-five-destinations.js';
import { itemScore, read, write } from './storage-versioned-keys.js';
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
/*
 * THREE ELEMENTS: where was I, what shall I do, what is coming.
 *
 * Weakest, the Today stat row and Recent were all removed together, and for
 * one reason between them: each restated something another element already
 * said. Weakest and Recent are both views of the mistakes list that "Explain
 * my mistakes" opens and explains; the stat row led with a day streak, which
 * measures showing up rather than knowing anything.
 *
 * The streak is still WRITTEN -- endSession keeps folding it into store.meta,
 * so the append-only log, the export and the gist sync are all untouched and
 * work/progress-log-check.mjs is unaffected. It is only no longer the first
 * number on the first screen.
 */
export function renderToday() {
  setActiveNav('today');

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
    <p class="small" style="margin-top:6px">Pick up the daily warm-up, or choose another session below.</p>
    <div style="margin-top:14px"><button class="primary" id="startDailyBtn">Start today's session →</button></div>`;
  /*
   * The empty state used to be a sentence pointing at the tiles underneath it.
   * With the page down to three elements it is the largest thing on screen and
   * saying nothing, so it carries the default action instead of describing it.
   */
  if (cont) $$('continueBtn').onclick = () => resumeContinue(cont);
  else $$('startDailyBtn').onclick = () => startSession({ mode: 'daily' });

  /*
   * One row, three buttons, and the hint is gone.
   *
   * There were eight tiles here, each carrying a glyph, a label, a sentence of
   * hint and a count, at a 104px floor -- roughly two phone screens of chooser
   * before the reader reached anything to do. Five of the modes were cut in
   * schema.js; what is left is short enough to sit in a single row, so the
   * hint sentence goes too. It survives as the title attribute, which is where
   * an explanation belongs once the label is doing its job.
   *
   * The count is still the real thing, taken by running the picker rather than
   * by an estimate that could drift from it, and a mode with nothing to offer
   * is still disabled and still says why rather than opening an empty session
   * and toasting an apology.
   */
  const TILE_COLOR = { daily: 'var(--teal)', exam: 'var(--blue)', mistakes: 'var(--red)' };
  const EMPTY_WHY = { mistakes: 'None logged — good', daily: 'Nothing to warm up on', exam: 'No questions yet' };
  const tiles = STUDY_MODES.filter((m) => m.id !== 'subject').map((m) => {
    /* Exam mode builds a PAPER, so its tile counts questions rather than
       items -- and counts them from the same pool buildPaper draws on, so the
       number on the card cannot drift from the questions actually available. */
    const isExam = m.id === 'exam';
    const count = isExam ? examPool().length : pickItems({ mode: m.id }).length;
    return { ...m, count, noun: isExam ? 'question' : 'item', color: TILE_COLOR[m.id] || 'var(--teal)' };
  });
  $$('sessionTiles').innerHTML = tiles.map((m) => `
    <button class="rss-mode" style="flex-direction:column;align-items:flex-start;gap:4px;min-height:78px" data-mode="${esc(m.id)}" title="${esc(m.hint)}"${m.count ? '' : ' disabled'}>
      <span class="ic" style="font-size:16px;color:${m.color}">${m.icon}</span>
      <b>${esc(m.label)}</b>
      <span class="cnt">${m.count ? m.count.toLocaleString() + ' ' + m.noun + (m.count === 1 ? '' : 's') : esc(EMPTY_WHY[m.id] || 'Nothing to study')}</span>
    </button>`).join('');
  $$('sessionTiles').querySelectorAll('[data-mode]').forEach((b) => {
    if (b.disabled) return;
    b.onclick = () => startSession({ mode: b.dataset.mode });
  });

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

  showView('todayView');
  /* After showView, or the banner writes into a view still marked hidden and
     clears itself. */
  paintImminent(nowT);
}
