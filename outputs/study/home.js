/*
 * Home
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import {
  $$, STORAGE_PREFIX, esc, fmtDate, fmtTime, fmtWhen, getItem, isOtherGroup,
  itemsForSubject, itemsForUnit, sessionsWithStatus, ui,
} from './imports.js';
import { myGroups } from './course-timetable.js';
import { renderLearn } from './subject.js';
import { STEPS, setStep } from './session-engine.js';
import { goTo, openSessionOverlay, setActiveNav } from './navigation-five-destinations.js';
import { read, write } from './storage-versioned-keys.js';
import { showView } from './small-ui-helpers.js';
import { paintBriefing, refreshBriefing } from './weekly-briefing.js';
import { DEADLINES, SOON_MS, paintImminent, untilText } from './assessments-and-marks.js';

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
    const order = STEPS.map((s) => s.id);
    const highest = order[Math.max(order.indexOf(getItemStep(itemId)), order.indexOf(step))];
    if (highest) {
      write('rss-step:' + itemId, highest);
      write(STORAGE_PREFIX + 'step:' + itemId, highest);
    }
  }
}
export function getItemStep(itemId) {
  const order = STEPS.map((s) => s.id);
  const saved = [read('rss-step:' + itemId, null), read(STORAGE_PREFIX + 'step:' + itemId, null)];
  return order[Math.max(...saved.map((s) => s === 'review' ? 3 : order.indexOf(s)))] || null;
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
 * This week -- the one thing that matters most in the next seven days.
 *
 * It replaced the Continue card at the top of Today. Worked out from the
 * timetable every time Today is drawn, so it follows outputs/schedule.js --
 * which the Sunday email task keeps current -- without anything else having
 * to write to it: the heaviest assessment due in the next seven days, else
 * the next class worth preparing for. Rooms and times a course email filled
 * in simply show as the row's own details; nothing here flags them, at the
 * owner's request.
 */
const WEEK_MS = 7 * 86400000;
/* Ranking only, never shown. A sitting with no weight of its own (the ABCT2326
   quiz counts towards a 35% component) still outranks a 2% exercise. */
const rankOf = (s) => s.weight ?? (/quiz|test|exam/i.test(s.title) ? 25 : 0);
function weekFocus(now) {
  const groups = myGroups();
  const horizon = now.getTime() + WEEK_MS;
  const due = DEADLINES.filter((r) => r.to >= now && r.to <= horizon && !isOtherGroup(r.s, groups))
    .sort((a, b) => rankOf(b.s) - rankOf(a.s) || a.to - b.to);
  if (due.length) return { main: { kind: 'due', r: due[0] }, more: due.length - 1 };
  const prep = sessionsWithStatus(now).find((r) => r.s.on && r.from > now && r.from <= horizon
    && TEACHING.includes(r.s.kind) && !r.s.noStudy && r.s.unit && !isOtherGroup(r.s, groups)
    && itemsForUnit(r.s.subject, r.s.unit).length);
  return { main: prep ? { kind: 'prep', r: prep } : null, more: 0 };
}

function paintWeekFocus(now) {
  const { main, more } = weekFocus(now);
  const where = (s) => [s.subject, fmtWhen(s), s.room].filter(Boolean).join(' · ');
  /* A hand-in has no length: 'due Sun 4 Oct, 23:59', not '23:59–23:59'. */
  const whenDue = (r) => (r.s.on && +r.from === +r.to
    ? [r.s.subject, `due ${fmtDate(r.to)}, ${fmtTime(r.to)}`, r.s.room].filter(Boolean).join(' · ')
    : where(r.s));
  const head = !main ? 'Nothing due this week'
    : main.kind === 'due' ? main.r.s.title
    : `Prepare: ${main.r.s.title}`;
  const sub = !main ? 'No assessment in the next seven days. A good week to get ahead.'
    : main.kind === 'prep' ? where(main.r.s)
    : `${whenDue(main.r)} · ${untilText(main.r.to, now)}${more ? ` · ${more} more due this week` : ''}`;
  const unit = main?.r.s.unit && itemsForUnit(main.r.s.subject, main.r.s.unit).length ? main.r.s.unit : null;
  const action = unit ? '<button class="primary" id="focusStudyBtn">Study for it →</button>'
    : main ? '<button class="primary" id="focusAssessBtn">See assessments →</button>'
    : '<button class="primary" id="openLearnBtn">Choose a topic →</button>';
  $$('continueCard').innerHTML = `
    <div class="task-kicker">This week</div>
    <h2 class="editorial" style="font-size:calc(24px*var(--ts));margin:8px 0 0">${esc(head)}</h2>
    <p class="small" style="margin-top:6px">${esc(sub)}</p>
    ${main?.r.s.note ? `<p class="small" style="margin-top:6px">${esc(main.r.s.note)}</p>` : ''}
    <div style="margin-top:14px">${action}</div>`;
  if (unit) $$('focusStudyBtn').onclick = () => { ui.learnFilter = 'all'; ui.learnTopic = unit; ui.learnDrill = true; renderLearn(); };
  if ($$('focusAssessBtn')) $$('focusAssessBtn').onclick = () => { ui.courseTab = 'assess'; goTo('course'); };
  if ($$('openLearnBtn')) $$('openLearnBtn').onclick = () => goTo('learn');
}

/*
 * Work to do, first half: the classes worth preparing for.
 *
 * Today's remaining classes and those on the next day that has any — so on a
 * Saturday it is Monday's, not an empty box — plus anything running now or
 * open this week. Only teaching sessions whose unit has lessons; another
 * group's slot is left out, as it is in the Course tab's counts. Each row
 * hands its unit to Learn, the same way the timetable's "Study this" does.
 */
const TEACHING = ['lecture', 'tutorial', 'lab', 'seminar', 'observation', 'activity'];
const dayKey = (d) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
function renderWorkPrep(now) {
  const groups = myGroups();
  const prep = sessionsWithStatus(now).filter((r) =>
    ['now', 'open', 'next', 'upcoming'].includes(r.status)
    && TEACHING.includes(r.s.kind) && !r.s.noStudy && r.s.unit
    && !isOtherGroup(r.s, groups)
    && itemsForUnit(r.s.subject, r.s.unit).length);
  const dated = prep.filter((r) => r.s.on && r.from > now);
  const nextDay = dated.find((r) => dayKey(r.from) !== dayKey(now));
  const days = new Set([dayKey(now), nextDay ? dayKey(nextDay.from) : null]);
  const rows = prep.filter((r) => r.status === 'now' || r.status === 'open'
    || (r.s.on && days.has(dayKey(r.from)))).slice(0, 5);
  $$('workPrep').innerHTML = rows.length ? rows.map((r) => `
    <div class="unit-row" style="cursor:default">
      <span class="grow"><b>${esc(r.s.title)}</b><small>${esc([r.s.subject, fmtWhen(r.s)].join(' · '))}</small></span>
      <button class="ghost" data-prepunit="${esc(r.s.unit)}" style="flex:none">Study this →</button>
    </div>`).join('')
    : '<div class="empty">No upcoming class has lessons to prepare.</div>';
  $$('workPrep').querySelectorAll('[data-prepunit]').forEach((b) => {
    b.onclick = () => { ui.learnFilter = 'all'; ui.learnTopic = b.dataset.prepunit; ui.learnDrill = true; renderLearn(); };
  });
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

  paintWeekFocus(new Date());

  /* After a pack is fetched or removed this re-runs, so the briefing appears
     or disappears with the token it is read by. */
  paintBriefing();
  void refreshBriefing();

  renderWorkPrep(new Date());

  /*
   * What is due, beside what is mastered.
   *
   * Mastery answers "have I learnt it"; this answers "is anything about to be
   * taken off me". They are different anxieties and the app only ever spoke to
   * the first, which is how a 60%-weighted test can arrive as a surprise in a
   * study app that knew its date all along.
   */
  const nowT = new Date();
  const upcoming = DEADLINES
    .filter((r) => r.to >= nowT)
    .slice(0, 3);
  $$('deadlineList').innerHTML = upcoming.length ? upcoming.map((r) => `
    <div class="unit-row" style="cursor:default">
      <span class="grow"><b>${esc(r.s.title)}</b><small>${esc(r.s.subject)}${r.s.weight ? ` · ${r.s.weight}%` : ''}</small></span>
      <span class="pc" style="color:${r.to - nowT <= SOON_MS ? 'var(--orange)' : 'var(--muted)'}">${esc(untilText(r.to, nowT))}</span>
    </div>`).join('')
    : '<div class="empty">Nothing left on the published deadlines.</div>';
  $$('allDeadlinesBtn').onclick = () => { ui.courseTab = 'assess'; goTo('course'); };

  showView('todayView');
  /* After showView, or the banner writes into a view still marked hidden and
     clears itself. */
  paintImminent(nowT);
}
