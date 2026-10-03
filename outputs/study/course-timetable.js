/*
 * Course — the syllabus and the timetable
 *
 * The rest of the app answers "what should I study". This answers "where am I
 * meant to be". It reads outputs/schedule.js and holds one piece of state of
 * its own, in localStorage:
 *
 *   groups       groupSetId -> chosen option id (the tutorial and lab groups
 *                the supplied schedule does not say the student is in)
 *
 * Attendance marking was removed at the owner's request (2026-10-03). Records
 * already saved under K.attendance are left untouched, not deleted.
 *
 * The clock is live. A session is past once its end time has gone by, and an
 * HSS2011 session — which has a teaching week but no published time — is past
 * once its week is over. Nothing here guesses a time that was never published.
 *
 * Split out along its banner sections. See docs/CODEMAP.md.
 */
import {
  $$, GROUP_CHOICES, KINDS, SCHEDULE_SOURCES, SUBJECT_ADMIN, TERM,
  describeSource, esc, fmtWeekRange, fmtWhen, getSubject, isOtherGroup,
  gapFor, itemsForUnit, sessionsWithStatus, weekOf, weekStart, STAFF, ui,
} from './imports.js';
import { showView } from './small-ui-helpers.js';
import { setActiveNav } from './navigation-five-destinations.js';
import { K, read, store, write } from './storage-versioned-keys.js';
import { renderLearn } from './subject.js';
import { assessmentsPanel, imminentHTML, wireAssessments } from './assessments-and-marks.js';

/* ------------------------------------------------------------------ *
 * State — the two unknown groups
 * ------------------------------------------------------------------ */

export function myGroups() {
  if (!store.groups) store.groups = read(K.groups, {});
  return store.groups;
}
function setGroup(setId, optionId) {
  const g = myGroups();
  if (g[setId] === optionId) delete g[setId]; else g[setId] = optionId;
  write(K.groups, g);
}

/* ------------------------------------------------------------------ *
 * Small render helpers
 * ------------------------------------------------------------------ */

const subjectAccent = (code) => (getSubject(code) || {}).accent || 'var(--teal)';

function countdown(from, now) {
  const ms = from - now;
  if (ms <= 0) return '';
  const mins = Math.round(ms / 60000);
  if (mins < 60) return `in ${mins} min`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `in ${hrs} h`;
  const days = Math.round(hrs / 24);
  return days === 1 ? 'tomorrow' : `in ${days} days`;
}

/*
 * One row. `status` decides the whole visual treatment: a past row is dimmed,
 * a running one is ringed, the next one up carries a countdown.
 */
function sessionRow(r, now) {
  const s = r.s;
  const kind = KINDS[s.kind] || { label: s.kind, tone: 'muted' };
  const other = isOtherGroup(s, myGroups());
  const teacher = s.teacher && STAFF[s.teacher] ? STAFF[s.teacher].name : '';
  const bits = [kind.label, s.room, teacher, s.group ? `Group ${s.group}` : ''].filter(Boolean);

  /* A row can be real while its official teaching notes are still absent.
     Name that state instead of letting an absent button look accidental. */
  const teachingGap = gapFor(s.subject, s.week)
    && ['lecture', 'tutorial', 'lab', 'seminar', 'observation', 'consultation', 'activity'].includes(s.kind);
  const lessons = s.noStudy
    ? `<span class="nostudy">${teachingGap ? 'Official notes missing — see weekly gap' : 'No lesson for this administrative row'}</span>`
    : s.unit && itemsForUnit(s.subject, s.unit).length
      ? `<button class="ghost tolesson" data-unit="${esc(s.unit)}">Study this →</button>` : '';

  return `<li class="sessrow ${esc(r.status)}${other ? ' otherg' : ''}" style="--acc:${esc(subjectAccent(s.subject))}">
    <div class="sesswhen">
      <span class="sessdate">${esc(fmtWhen(s))}</span>
      ${r.status === 'now' ? '<span class="livenow">On now</span>' : ''}
      ${r.status === 'open' ? '<span class="openwk">This week</span>' : ''}
      ${r.status === 'next' ? `<span class="nextin">${esc(countdown(r.from, now))}</span>` : ''}
      ${!s.on ? '<span class="vague" title="No time published for this subject">week only</span>' : ''}
    </div>
    <div class="sessbody">
      <div class="sesshead"><span class="sesscode">${esc(s.subject)}</span><b>${esc(s.title)}</b></div>
      <div class="sessmeta">${esc(bits.join(' · '))}</div>
      ${s.note ? `<div class="sessnote">${esc(s.note)}</div>` : ''}
      ${other ? '<div class="sessnote">Another group’s slot — hidden from your counts.</div>' : ''}
      <div class="sessacts">${lessons}</div>
    </div>
  </li>`;
}

/* ------------------------------------------------------------------ *
 * The three panels
 * ------------------------------------------------------------------ */

function nowNextHTML(rows, now) {
  const live = rows.filter((r) => r.status === 'now');
  /* A week-long span is not 'on now'; it gets its own quieter line below. */
  const openNow = rows.filter((r) => r.status === 'open');
  const next = rows.find((r) => r.status === 'next');
  const wk = weekOf(now);
  const head = wk
    ? `Teaching week ${wk} of ${TERM.weeks} · ${esc(fmtWeekRange(wk))}`
    : (now < weekStart(1) ? 'The term has not started yet' : 'The teaching term is over');

  if (!live.length && !next && !openNow.length) {
    return `<div class="nowcard"><div class="task-kicker">${head}</div>
      <p class="small" style="margin-top:10px">Nothing left on the published timetable.</p></div>`;
  }
  const one = (r, lead) => `<div class="nowline">
      <span class="nowlead">${esc(lead)}</span>
      <b>${esc(r.s.title)}</b>
      <span class="nowmeta">${esc([r.s.subject, fmtWhen(r.s), r.s.room].filter(Boolean).join(' · '))}</span>
    </div>`;
  return `<div class="nowcard${live.length ? ' islive' : ''}">
    <div class="task-kicker">${head}</div>
    ${live.map((r) => one(r, 'On now')).join('')}
    ${next ? one(next, live.length ? 'Then' : `Next · ${countdown(next.from, now)}`) : ''}
    ${openNow.length ? `<div class="alsowk">Also this week, at a time the timetable does not publish: ${
      esc(openNow.map((r) => r.s.title).join('; '))}</div>` : ''}
  </div>`;
}

/*
 * There used to be a per-week lesson showcase here.
 *
 * Every week printed one card per subject: a mastery bar, a verdict line, the
 * first three lessons as buttons, "Show all", and a source list folded under
 * each lesson. It was the Learn tab rewritten in a second place, and the two
 * drifted — Learn is now the page that teaches, orders and cites the lessons,
 * and it does all of it better than a card wedged between two timetable rows.
 *
 * What is kept is the ONE thing the timetable is uniquely able to say: which
 * unit a session teaches. That is the "Study this →" button on the row itself,
 * which hands the week's topic to Learn instead of restating it here.
 */

/*
 * The teaching week that "next week" means. Before the term starts it is
 * week 1 — the first week there is — and in the last week there is none.
 */
function nextWeekOf(now) {
  const wk = weekOf(now);
  if (wk) return wk < TERM.weeks ? wk + 1 : null;
  return now < weekStart(1) ? 1 : null;
}

function weekPanel(rows, now, which = 'this') {
  const wk = which === 'next' ? nextWeekOf(now) : weekOf(now);
  if (!wk) {
    return which === 'next'
      ? '<div class="emptybox">There is no next teaching week — the term ends this week.</div>'
      : '<div class="emptybox">Outside the teaching term — use the full-term view.</div>';
  }
  const mine = rows.filter((r) => r.s.week === wk);
  const head = which === 'next'
    ? `<h3 class="weekhead">Week ${wk}<span>${esc(fmtWeekRange(wk))}</span></h3>` : '';
  if (!mine.length) return `${head}<div class="emptybox">Nothing scheduled ${which === 'next' ? 'next' : 'this'} week.</div>`;
  return `${head}<ul class="sesslist">${mine.map((r) => sessionRow(r, now)).join('')}</ul>`;
}

/* The week "Jump to today" lands on: this one, or the nearest end of the term. */
function todayWeek(now) {
  return weekOf(now) || (now < weekStart(1) ? 1 : TERM.weeks);
}

function termPanel(rows, now) {
  const byWeek = new Map();
  for (const r of rows) {
    if (!byWeek.has(r.s.week)) byWeek.set(r.s.week, []);
    byWeek.get(r.s.week).push(r);
  }
  const here = weekOf(now);
  return `<div class="jumptoday"><button class="ghost" id="jumpTodayBtn">Jump to today ↓</button></div>` +
    [...byWeek.keys()].sort((a, b) => a - b).map((w) => `
    <section class="weekblock${w === here ? ' thisweek' : ''}" data-week="${w}">
      <h3 class="weekhead">Week ${w}<span>${esc(fmtWeekRange(w))}${w === here ? ' · this week' : ''}</span></h3>
      <ul class="sesslist">${byWeek.get(w).map((r) => sessionRow(r, now)).join('')}</ul>
    </section>`).join('');
}

/*
 * Scroll the full term to today: the session on now, else the next one up,
 * else the top of this week's block. The term is ~150 rows long, which is
 * several phone screens of scrolling to find where you are.
 */
function jumpToToday(now) {
  const view = $$('courseView');
  const block = view.querySelector(`.weekblock[data-week="${todayWeek(now)}"]`);
  if (!block) return;
  const target = view.querySelector('.sessrow.now, .sessrow.next, .sessrow.open')
    || block;
  target.scrollIntoView({ behavior: 'smooth', block: target === block ? 'start' : 'center' });
  target.classList.add('flashrow');
  setTimeout(() => target.classList.remove('flashrow'), 1600);
}

function groupPickerHTML() {
  const g = myGroups();
  return `<div class="card grouppick">
    <div class="task-kicker">Your groups</div>
    <p class="small" style="margin:9px 0 12px">The supplied timetable lists all three tutorial and lab groups without saying which is yours. Pick them once and the other groups’ slots are dimmed and left out of your counts.</p>
    ${GROUP_CHOICES.map((set) => `<div class="grouprow">
      <span class="grouplab">${esc(set.label)}</span>
      <span class="groupopts">${set.options.map((o) =>
        `<button class="conf${g[set.id] === o.id ? ' on' : ''}${!g[set.id] && set.suggested === o.id ? ' sugg' : ''}" data-groupset="${esc(set.id)}" data-groupopt="${esc(o.id)}">${esc(o.label)}</button>`).join('')}</span>
      ${!g[set.id] && set.suggestedWhy ? `<span class="groupwhy">${esc(set.suggestedWhy)} Confirm it if that is right.</span>` : ''}
    </div>`).join('')}
  </div>`;
}

function syllabusPanel() {
  return Object.values(SUBJECT_ADMIN).map((a) => {
    const total = a.assessment.reduce((n, x) => n + x.weight, 0);
    const cite = (src) => (src ? `<span class="beyondcite">${esc((describeSource(src).file || src.ref) + ' · ' + src.location)}</span>` : '');
    const meta = [
      a.credits != null ? `${a.credits} credits` : '',
      a.level ? `Level ${a.level}` : '',
      a.prereq ? `Pre-requisite: ${a.prereq}` : '',
    ].filter(Boolean).join(' · ');
    return `<section class="card sylcard" style="--acc:${esc(subjectAccent(a.code))}">
      <div class="sylhead">
        <span class="sesscode">${esc(a.code)}</span>
        <b>${esc(a.title)}</b>
        ${meta ? `<span class="sylmeta">${esc(meta)}</span>` : ''}
      </div>
      <p class="sylobj">${esc(a.objective)}</p>
      ${a.objectiveNote ? `<p class="small"><span class="apptag">App note</span>${esc(a.objectiveNote)}</p>` : ''}
      ${a.ilos.length ? `<div class="subhead">Intended learning outcomes</div>
        <ol class="ilos">${a.ilos.map((t) => `<li>${esc(t)}</li>`).join('')}</ol>` : ''}
      <div class="subhead">Assessment${total === 100 ? '' : ` — the parts listed here sum to ${total}%`}</div>
      <ul class="asslist">${a.assessment.map((x) => `<li>
        <span class="assw">${esc(x.weight)}%</span>
        <span class="assn"><b>${esc(x.name)}</b>${x.note ? `<small>${esc(x.note)}</small>` : ''}${cite(x.src)}</span>
      </li>`).join('')}</ul>
      ${a.assessmentNote ? `<p class="small">${esc(a.assessmentNote)}</p>` : ''}
      ${a.effort.length ? `<div class="subhead">Study effort</div>
      <ul class="efflist">${a.effort.map((e) => `<li${e.total ? ' class="tot"' : ''}><span>${esc(e.what)}</span><b>${esc(e.hours)} h</b></li>`).join('')}</ul>` : ''}
      ${a.effortNote ? `<p class="small">${esc(a.effortNote)}</p>` : ''}
      ${a.teaching ? `<div class="subhead">How it is taught</div><p class="small">${esc(a.teaching)}</p>` : ''}
      ${a.texts.length ? `<div class="subhead">Books</div>
        <ul class="txtlist">${a.texts.map((t) => `<li><span class="txtrole">${esc(t.role)}</span>${
          t.url ? `<a href="${esc(t.url)}" target="_blank" rel="noreferrer">${esc(t.cite)}</a>` : esc(t.cite)}</li>`).join('')}</ul>` : ''}
      ${a.textNote ? `<p class="small">${esc(a.textNote)}</p>` : ''}
    </section>`;
  }).join('') + `<section class="card">
    <div class="task-kicker">Where all of this came from</div>
    <ul class="txtlist" style="margin-top:10px">${SCHEDULE_SOURCES.map((s) =>
      `<li><span class="txtrole">${esc(s.subject)}</span>${esc(s.label || describeSource({ ref: s.ref }).file || s.ref)} — ${esc(s.what)}</li>`).join('')}</ul>
    <p class="small" style="margin-top:11px">Current files take priority for dates, topics and assessment. Older official lectures are used only to teach a current syllabus topic when the matching 2026 lecture is absent; student coursework is never used as a factual source.</p>
  </section>`;
}

/* ------------------------------------------------------------------ *
 * The view
 * ------------------------------------------------------------------ */

const TABS = [['week', 'This week'], ['next', 'Next week'], ['term', 'Full term'], ['assess', 'Assessments'], ['syllabus', 'Syllabus']];

/* Which tabs carry a timetable, and so want the group
   picker under them. Naming the ones that do, rather than testing for the
   others one by one in three places. */
const TIMETABLE_TABS = ['week', 'next', 'term'];

export function renderCourse() {
  showView('courseView');
  setActiveNav('course');
  const now = new Date();
  const tab = ui.courseTab || 'week';
  const rows = sessionsWithStatus(now);
  const timetable = TIMETABLE_TABS.includes(tab);

  const body = tab === 'syllabus' ? syllabusPanel()
    : tab === 'assess' ? assessmentsPanel(now, ui.assessFilter || 'open')
      : tab === 'term' ? termPanel(rows, now)
        : tab === 'next' ? weekPanel(rows, now, 'next')
          : weekPanel(rows, now);

  $$('courseView').innerHTML = `
    ${imminentHTML(now, rows)}
    ${nowNextHTML(rows, now)}
    <div class="segbar coursetabs">${TABS.map(([id, label]) =>
    `<button class="seg${tab === id ? ' active' : ''}" data-ctab="${esc(id)}">${esc(label)}</button>`).join('')}</div>
    <div class="coursebody">${body}</div>
    ${timetable ? groupPickerHTML() : ''}`;

  $$('courseView').querySelectorAll('[data-ctab]').forEach((b) => {
    b.onclick = () => { ui.courseTab = b.dataset.ctab; renderCourse(); };
  });
  if (tab === 'assess') {
    wireAssessments($$('courseView'), renderCourse, (f) => { ui.assessFilter = f; });
  }
  if (tab === 'term') $$('jumpTodayBtn').onclick = () => jumpToToday(new Date());
  $$('courseView').querySelectorAll('[data-groupset]').forEach((b) => {
    b.onclick = () => { setGroup(b.dataset.groupset, b.dataset.groupopt); renderCourse(); };
  });
  $$('courseView').querySelectorAll('[data-unit]').forEach((b) => {
    b.onclick = () => { ui.learnFilter = 'all'; ui.learnTopic = b.dataset.unit; ui.learnDrill = true; renderLearn(); };
  });
}

/*
 * The clock has to keep moving while the tab is open, or "On now" is only ever
 * true for whoever happened to load the page during a lecture. One minute is
 * fine: nothing here is finer-grained than a minute.
 */
let tick = null;
export function init() {
  if (tick) clearInterval(tick);
  tick = setInterval(() => {
    const v = $$('courseView');
    if (v && !v.classList.contains('hidden')) renderCourse();
  }, 60000);
}
