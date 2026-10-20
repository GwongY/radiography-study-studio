/*
 * Home
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, KINDS, esc, fmtDate, fmtTime, isOtherGroup, sessionsWithStatus, ui } from './imports.js';
import { REVISION } from '../revision/registry.js?v=1';
import { newToLink, openRevise } from './revise.js';
import { myGroups } from './course-timetable.js';
import { goTo, setActiveNav } from './navigation-destinations.js';
import { showView } from './small-ui-helpers.js';
import { paintBriefing, refreshBriefing } from './weekly-briefing.js';
import { DEADLINES, SOON_MS, paintImminent, untilText } from './assessments-and-marks.js';

/* ------------------------------------------------------------------ *
 * Home
 * ------------------------------------------------------------------ */

/*
 * Next up, and new to link.
 *
 * This card used to name the heaviest assessment due in the next seven days,
 * which the Work to do card below already lists. Now it answers the two
 * questions Today is opened for: what class is next (today or tomorrow), and
 * what joined Revise in the week it shows. Both come from data that is
 * already sourced: outputs/schedule.js and the Revise maps. Every line opens
 * Revise where it applies; a subject with no Revise map gets no link.
 */
const DAY_MS = 86400000;
function nextClasses(now) {
  const groups = myGroups();
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2);
  return sessionsWithStatus(now)
    .filter((r) => !r.vague && r.to >= now && r.from < end && r.s.kind !== 'assessment' && !isOtherGroup(r.s, groups))
    .slice(0, 4);
}
const dayWord = (d, now) => {
  const days = Math.round((new Date(d.getFullYear(), d.getMonth(), d.getDate()) - new Date(now.getFullYear(), now.getMonth(), now.getDate())) / DAY_MS);
  return days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : fmtDate(d);
};

function paintNextAndNew(now) {
  const classes = nextClasses(now);
  const classRows = classes.length ? classes.map((r, n) => {
    const s = r.s;
    const kind = (KINDS[s.kind] || { label: s.kind }).label;
    const when = r.status === 'now' ? 'On now' : `${dayWord(r.from, now)} ${fmtTime(r.from)}`;
    const link = REVISION[s.subject] ? `<button class="ghost" data-todayrev="${n}" style="padding:6px 10px">Revise →</button>` : '';
    return `<div class="unit-row" style="cursor:default">
      <span class="grow"><b>${esc(s.title)}</b><small>${esc([when, s.subject, kind, s.room].filter(Boolean).join(' · '))}</small></span>${link}</div>`;
  }).join('') : '<div class="empty">No classes today or tomorrow.</div>';

  const fresh = newToLink().filter((f) => f.count);
  const freshRows = fresh.length ? fresh.map((f, n) => `<div class="unit-row" style="cursor:default">
      <span class="grow"><b>${esc(f.name)} · week ${esc(f.week)}</b><small>${f.count} new: ${f.first.map((x) => esc(x.label)).join(', ')}${f.count > f.first.length ? '…' : ''}</small></span>
      <button class="ghost" data-todaynew="${n}" style="padding:6px 10px">Link them →</button></div>`).join('')
    : '<div class="empty">Nothing new in Revise for the week shown.</div>';

  $$('continueCard').innerHTML = `
    <div class="task-kicker">Next up</div>
    <div style="display:grid;gap:7px;margin-top:11px">${classRows}</div>
    <div class="task-kicker" style="margin-top:16px">New to link</div>
    <div style="display:grid;gap:7px;margin-top:11px">${freshRows}</div>`;
  $$('continueCard').querySelectorAll('[data-todayrev]').forEach((b) => {
    const s = classes[+b.dataset.todayrev].s;
    /* revise what is taught so far in that subject, at the week Revise already shows */
    b.onclick = () => openRevise({ subject: s.subject });
  });
  $$('continueCard').querySelectorAll('[data-todaynew]').forEach((b) => {
    const f = fresh[+b.dataset.todaynew];
    b.onclick = () => openRevise({ subject: f.subject, week: f.week });
  });
}

/* Today: the next classes, what is new to link, what is due, and the weekly notice. */
export function renderToday() {
  setActiveNav('today');

  paintNextAndNew(new Date());

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
