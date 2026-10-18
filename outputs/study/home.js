/*
 * Home
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, esc, fmtDate, fmtTime, fmtWhen, isOtherGroup, ui } from './imports.js';
import { myGroups } from './course-timetable.js';
import { goTo, setActiveNav } from './navigation-destinations.js';
import { showView } from './small-ui-helpers.js';
import { paintBriefing, refreshBriefing } from './weekly-briefing.js';
import { DEADLINES, SOON_MS, paintImminent, untilText } from './assessments-and-marks.js';

/* ------------------------------------------------------------------ *
 * Home
 * ------------------------------------------------------------------ */

/*
 * This week -- the one thing that matters most in the next seven days.
 *
 * It replaced the Continue card at the top of Today. Worked out from the
 * timetable every time Today is drawn, so it follows outputs/schedule.js --
 * which the Sunday email task keeps current -- without anything else having
 * to write to it: the heaviest assessment due in the next seven days, else
 * nothing, which says so. Rooms and times a course email filled
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
  return { main: null, more: 0 };
}

function paintWeekFocus(now) {
  const { main, more } = weekFocus(now);
  const where = (s) => [s.subject, fmtWhen(s), s.room].filter(Boolean).join(' · ');
  /* A hand-in has no length: 'due Sun 4 Oct, 23:59', not '23:59–23:59'. */
  const whenDue = (r) => (r.s.on && +r.from === +r.to
    ? [r.s.subject, `due ${fmtDate(r.to)}, ${fmtTime(r.to)}`, r.s.room].filter(Boolean).join(' · ')
    : where(r.s));
  const head = !main ? 'Nothing due this week' : main.r.s.title;
  const sub = !main ? 'No assessment in the next seven days. A good week to link what you have learnt.'
    : `${whenDue(main.r)} · ${untilText(main.r.to, now)}${more ? ` · ${more} more due this week` : ''}`;
  const action = main ? '<button class="primary" id="focusAssessBtn">See assessments →</button><button class="ghost" id="focusReviseBtn" style="margin-left:8px">Revise →</button>'
    : '<button class="primary" id="openReviseBtn">Revise →</button>';
  $$('continueCard').innerHTML = `
    <div class="task-kicker">This week</div>
    <h2 class="editorial" style="font-size:calc(24px*var(--ts));margin:8px 0 0">${esc(head)}</h2>
    <p class="small" style="margin-top:6px">${esc(sub)}</p>
    ${main?.r.s.note ? `<p class="small" style="margin-top:6px">${esc(main.r.s.note)}</p>` : ''}
    <div style="margin-top:14px">${action}</div>`;
  if ($$('focusAssessBtn')) $$('focusAssessBtn').onclick = () => { ui.courseTab = 'assess'; goTo('course'); };
  if ($$('focusReviseBtn')) $$('focusReviseBtn').onclick = () => goTo('revise');
  if ($$('openReviseBtn')) $$('openReviseBtn').onclick = () => goTo('revise');
}

/* Today: what is due this week, what is coming, and the weekly notice. */
export function renderToday() {
  setActiveNav('today');

  paintWeekFocus(new Date());

  /* The notice card follows the saved private-repository connection. */
  paintBriefing();
  void refreshBriefing();

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
