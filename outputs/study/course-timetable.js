/*
 * Course — the syllabus and the timetable, with attendance
 *
 * The rest of the app answers "what should I study". This answers "where am I
 * meant to be, and what have I already missed". It reads outputs/schedule.js
 * and holds two pieces of state of its own, both in localStorage:
 *
 *   attendance   sessionId -> 'went' | 'missed'
 *   groups       groupSetId -> chosen option id (the tutorial and lab groups
 *                the supplied schedule does not say the student is in)
 *
 * The clock is live. A session is past once its end time has gone by, and an
 * HSS2011 session — which has a teaching week but no published time — is past
 * once its week is over. Nothing here guesses a time that was never published.
 *
 * Split out along its banner sections. See docs/CODEMAP.md.
 */
import {
  $$, GROUP_CHOICES, KINDS, SCHEDULE_SOURCES, SESSIONS, SUBJECT_ADMIN, TERM,
  describeSource, esc, fmtWeekRange, fmtWhen, getSubject, isOtherGroup,
  getItem, itemsForUnit, sessionsWithStatus, studyFor, weekOf, weekStart, STAFF, ui,
} from './imports.js';
import { showView } from './small-ui-helpers.js';
import { setActiveNav } from './navigation-five-destinations.js';
import { K, itemAttempted, itemRead, itemScore, read, store, write } from './storage-versioned-keys.js';
import { renderLearn } from './subject.js';
import { startSession } from './session-engine.js';

/* ------------------------------------------------------------------ *
 * State — attendance and the two unknown groups
 * ------------------------------------------------------------------ */

function attendanceMap() {
  if (!store.attendance) store.attendance = read(K.attendance, {});
  return store.attendance;
}
function myGroups() {
  if (!store.groups) store.groups = read(K.groups, {});
  return store.groups;
}
function setAttendance(id, value) {
  const a = attendanceMap();
  if (a[id] === value) delete a[id]; else a[id] = value;
  write(K.attendance, a);
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
 * One row. `status` decides the whole visual treatment: a past row is dimmed
 * and grows the two attendance buttons, a running one is ringed, the next one
 * up carries a countdown.
 */
function sessionRow(r, now) {
  const s = r.s;
  const kind = KINDS[s.kind] || { label: s.kind, tone: 'muted' };
  const att = attendanceMap()[s.id];
  const other = isOtherGroup(s, myGroups());
  const teacher = s.teacher && STAFF[s.teacher] ? STAFF[s.teacher].name : '';
  const bits = [kind.label, s.room, teacher, s.group ? `Group ${s.group}` : ''].filter(Boolean);

  /* Only a past teaching session asks whether you went. A cancelled week,
     a holiday or a revision slot has no attendance to record. */
  const asks = r.status === 'past' && !['none', 'revision'].includes(s.kind) && !other;
  const marks = asks
    ? `<div class="attrow">
        <button class="attbtn${att === 'went' ? ' on' : ''}" data-att="went" data-sid="${esc(s.id)}">Went</button>
        <button class="attbtn miss${att === 'missed' ? ' on' : ''}" data-att="missed" data-sid="${esc(s.id)}">Missed</button>
      </div>`
    : '';

  /* Three of the six subjects have no lessons in this app at all. Saying so
     on the row beats an absent button, which reads as "not written yet". */
  const lessons = s.noStudy
    ? '<span class="nostudy">No lessons here — timetable only</span>'
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
      <div class="sessacts">${lessons}${marks}</div>
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
 * What to read before a week's class.
 *
 * 128 lessons in subject order is not a study plan. WEEK_STUDY says which
 * of them cover the topic this week teaches, and an EMPTY list is printed
 * as a gap rather than hidden — week 7 is Special Senses and nothing in the
 * corpus covers it, which the student should find out from here and not in
 * the exam.
 *
 * The first version of this printed every lesson as a button. Week 1 is
 * twenty-two of them, which is a wall of identical pills: it tells you the
 * work exists and nothing about whether you have done it. So the unit here
 * is the WEEK'S PROGRESS, and the individual lessons are secondary —
 * collapsed to the few you have not got to yet, with the rest one tap away.
 *
 * "Studied" and "mastered" are two different questions and both are shown.
 * Attempted counts lessons you have answered anything on; the percentage is
 * mean mastery across the whole week, so it can only reach 100 by actually
 * getting things right, and a week of half-remembered lessons reads as such.
 */

/* Lessons you have not attempted first, then weakest first. This is the
   order "Study all" runs them in as well, so the list is the plan. */
function readOrder(items) {
  return items.slice().sort((a, b) => {
    const aa = itemAttempted(a.id); const ba = itemAttempted(b.id);
    if (aa !== ba) return aa ? 1 : -1;
    /* Among the untested, the ones never opened come before the ones read. */
    const ar = itemRead(a.id); const br = itemRead(b.id);
    if (!aa && ar !== br) return ar ? 1 : -1;
    return itemScore(a.id) - itemScore(b.id);
  });
}

function lessonRow(it) {
  const attempted = itemAttempted(it.id);
  const pc = Math.round(itemScore(it.id) * 100);
  /* Read but never answered is its own state. Calling it "Not started" after
     someone had read the whole lesson was the app forgetting them. */
  const state = attempted ? (pc >= 80 ? 'strong' : pc >= 45 ? 'part' : 'weak') : itemRead(it.id) ? 'read' : 'new';
  const label = attempted ? `${pc}%` : itemRead(it.id) ? 'Read' : 'Not started';
  return `<button class="readline ${state}" data-item="${esc(it.id)}">
    <span class="readdot" aria-hidden="true"></span>
    <span class="readname">${esc(it.title)}</span>
    <span class="readpc">${esc(label)}</span>
  </button>`;
}

const PREVIEW = 3;

function subjectReading(subject, week) {
  const list = studyFor(subject, week);
  if (!list) return '';
  if (!list.length) {
    return `<div class="readgap"><span class="sesscode">${esc(subject)}</span>Nothing in the corpus covers this week yet — your timetable teaches it, we do not.</div>`;
  }
  const items = readOrder(list.map(getItem).filter(Boolean));
  if (!items.length) return '';

  const done = items.filter((i) => itemAttempted(i.id)).length;
  const opened = items.filter((i) => !itemAttempted(i.id) && itemRead(i.id)).length;
  const pc = Math.round(items.reduce((n, i) => n + itemScore(i.id), 0) / items.length * 100);
  const open = !!ui.readOpen[subject];
  const shown = open ? items : items.slice(0, PREVIEW);
  const rest = items.length - shown.length;

  /* The one line worth reading if you read nothing else on the card. */
  const verdict = done === 0 ? (opened ? `${opened} of ${items.length} read, none tested` : 'Not started')
    : done < items.length ? `${done} of ${items.length} started`
      : pc >= 80 ? 'All started, and holding' : 'All started';

  return `<section class="readcard" style="--acc:${esc(subjectAccent(subject))}">
    <div class="readtop">
      <span class="sesscode">${esc(subject)}</span>
      <b>Read before this week</b>
      <span class="readcount">${items.length} lesson${items.length === 1 ? '' : 's'}</span>
    </div>
    <div class="readbar"><span style="width:${pc}%"></span></div>
    <div class="readstat"><b>${pc}%</b> mastered · ${esc(verdict)}</div>
    <div class="readlines">${shown.map(lessonRow).join('')}</div>
    <div class="readacts">
      <button class="primary readall" data-week-subject="${esc(subject)}" data-week="${esc(week)}">${
  done ? 'Continue' : 'Start'} — all ${items.length} in order</button>
      ${items.length > PREVIEW
    ? `<button class="ghost readmore" data-readtoggle="${esc(subject)}">${
      open ? 'Show fewer' : `Show all ${items.length}`}</button>`
    : ''}
    </div>
    ${!open && rest > 0
    ? `<p class="readhint">Weakest first. ${rest} more behind “Show all”.</p>` : ''}
  </section>`;
}

function readingHTML(week) {
  return ['HSS2011', 'ABCT2326', 'HTI17103'].map((s) => subjectReading(s, week)).join('');
}

function weekPanel(rows, now) {
  const wk = weekOf(now);
  if (!wk) return '<div class="emptybox">Outside the teaching term — use the full-term view.</div>';
  const mine = rows.filter((r) => r.s.week === wk);
  if (!mine.length) return '<div class="emptybox">Nothing scheduled this week.</div>';
  return `<ul class="sesslist">${mine.map((r) => sessionRow(r, now)).join('')}</ul>${readingHTML(wk)}`;
}

function termPanel(rows, now) {
  const byWeek = new Map();
  for (const r of rows) {
    if (!byWeek.has(r.s.week)) byWeek.set(r.s.week, []);
    byWeek.get(r.s.week).push(r);
  }
  const here = weekOf(now);
  return [...byWeek.keys()].sort((a, b) => a - b).map((w) => `
    <section class="weekblock${w === here ? ' thisweek' : ''}">
      <h3 class="weekhead">Week ${w}<span>${esc(fmtWeekRange(w))}${w === here ? ' · this week' : ''}</span></h3>
      <ul class="sesslist">${byWeek.get(w).map((r) => sessionRow(r, now)).join('')}</ul>
    </section>`).join('');
}

function attendanceSummary(rows) {
  const a = attendanceMap();
  const past = rows.filter((r) => r.status === 'past' && !['none', 'revision'].includes(r.s.kind) && !isOtherGroup(r.s, myGroups()));
  const went = past.filter((r) => a[r.s.id] === 'went').length;
  const missed = past.filter((r) => a[r.s.id] === 'missed').length;
  const unmarked = past.length - went - missed;
  if (!past.length) return '';
  return `<div class="attsum">
    <span class="s"><b>${went}</b><small>attended</small></span>
    <span class="s"><b>${missed}</b><small>missed</small></span>
    <span class="s"><b>${unmarked}</b><small>unmarked</small></span>
    <span class="s"><b>${past.length}</b><small>held so far</small></span>
  </div>`;
}

function groupPickerHTML() {
  const g = myGroups();
  return `<div class="card grouppick">
    <div class="task-kicker">Your groups</div>
    <p class="small" style="margin:9px 0 12px">The supplied timetable lists all three tutorial and lab groups without saying which is yours. Pick them once and the other groups’ slots stop counting against your attendance.</p>
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
    return `<section class="card sylcard" style="--acc:${esc(subjectAccent(a.code))}">
      <div class="sylhead">
        <span class="sesscode">${esc(a.code)}</span>
        <b>${esc(a.title)}</b>
        <span class="sylmeta">${esc(a.credits)} credits · Level ${esc(a.level)} · Pre-requisite: ${esc(a.prereq)}</span>
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
      <div class="subhead">Study effort</div>
      <ul class="efflist">${a.effort.map((e) => `<li${e.total ? ' class="tot"' : ''}><span>${esc(e.what)}</span><b>${esc(e.hours)} h</b></li>`).join('')}</ul>
      ${a.effortNote ? `<p class="small">${esc(a.effortNote)}</p>` : ''}
      ${a.teaching ? `<div class="subhead">How it is taught</div><p class="small">${esc(a.teaching)}</p>` : ''}
      ${a.texts.length ? `<div class="subhead">Books</div>
        <ul class="txtlist">${a.texts.map((t) => `<li><span class="txtrole">${esc(t.role)}</span>${
          t.url ? `<a href="${esc(t.url)}" target="_blank" rel="noreferrer">${esc(t.cite)}</a>` : esc(t.cite)}</li>`).join('')}</ul>` : ''}
    </section>`;
  }).join('') + `<section class="card">
    <div class="task-kicker">Where all of this came from</div>
    <ul class="txtlist" style="margin-top:10px">${SCHEDULE_SOURCES.map((s) =>
      `<li><span class="txtrole">${esc(s.subject)}</span>${esc(s.label || describeSource({ ref: s.ref }).file || s.ref)} — ${esc(s.what)}</li>`).join('')}</ul>
    <p class="small" style="margin-top:11px">Two of those are screenshots of Canvas rather than documents, because no document copy was supplied. They cannot be text-checked the way a lecture can, so everything taken from them is written out in this repo’s timetable data module, in full, where it can be read and corrected.</p>
  </section>`;
}

/* ------------------------------------------------------------------ *
 * The view
 * ------------------------------------------------------------------ */

const TABS = [['week', 'This week'], ['term', 'Full term'], ['syllabus', 'Syllabus']];

export function renderCourse() {
  showView('courseView');
  setActiveNav('course');
  const now = new Date();
  const tab = ui.courseTab || 'week';
  const rows = sessionsWithStatus(now);

  const body = tab === 'syllabus' ? syllabusPanel()
    : tab === 'term' ? termPanel(rows, now)
      : weekPanel(rows, now);

  $$('courseView').innerHTML = `
    ${nowNextHTML(rows, now)}
    <div class="segbar coursetabs">${TABS.map(([id, label]) =>
    `<button class="seg${tab === id ? ' active' : ''}" data-ctab="${esc(id)}">${esc(label)}</button>`).join('')}</div>
    ${tab === 'syllabus' ? '' : attendanceSummary(rows)}
    <div class="coursebody">${body}</div>
    ${tab === 'syllabus' ? '' : groupPickerHTML()}`;

  $$('courseView').querySelectorAll('[data-ctab]').forEach((b) => {
    b.onclick = () => { ui.courseTab = b.dataset.ctab; renderCourse(); };
  });
  $$('courseView').querySelectorAll('[data-readtoggle]').forEach((b) => {
    b.onclick = () => {
      const k = b.dataset.readtoggle;
      ui.readOpen = { ...ui.readOpen, [k]: !ui.readOpen[k] };
      renderCourse();
    };
  });
  $$('courseView').querySelectorAll('[data-att]').forEach((b) => {
    b.onclick = () => { setAttendance(b.dataset.sid, b.dataset.att); renderCourse(); };
  });
  $$('courseView').querySelectorAll('[data-groupset]').forEach((b) => {
    b.onclick = () => { setGroup(b.dataset.groupset, b.dataset.groupopt); renderCourse(); };
  });
  $$('courseView').querySelectorAll('[data-item]').forEach((b) => {
    b.onclick = () => startSession({ mode: 'ids', ids: [b.dataset.item] });
  });
  $$('courseView').querySelectorAll('[data-week-subject]').forEach((b) => {
    /* Same order the card lists them in — unstarted first, then weakest.
       If the button ran the declared order instead, the card would be
       showing you one plan and the button would run a different one. */
    b.onclick = () => startSession({
      mode: 'ids',
      ids: readOrder((studyFor(b.dataset.weekSubject, Number(b.dataset.week)) || [])
        .map(getItem).filter(Boolean)).map((i) => i.id),
    });
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
