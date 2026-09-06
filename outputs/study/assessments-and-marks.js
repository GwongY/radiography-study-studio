/*
 * Course — assessments, deadlines and the running mark
 *
 * The timetable answers "where am I meant to be". This answers the two
 * questions a student actually loses sleep over: what is due, and where the
 * mark currently stands.
 *
 * NOTHING HERE INVENTS A DEADLINE.
 *
 * Every row in the list is a `kind: 'assessment'` session out of
 * outputs/schedule.js — already dated, already weighted, already citing the
 * document it came off. Every weighted component is an entry in
 * SUBJECT_ADMIN[code].assessment, which is the subject description form. This
 * part adds exactly two things that no document can know:
 *
 *   assessDone   sessionId -> true          "I have handed this in"
 *   marks        subject::component -> %    "this is what I got"
 *
 * Both are the student's own record of their own work, so neither is a source
 * claim and neither is checked against one. What IS checked is that the rows
 * they hang off exist — work/schedule-check.mjs already proves every session
 * id and weight is real, and work/assessment-check.mjs drives the arithmetic
 * below, which is written pure for that reason.
 *
 * WHY MARKS ARE ENTERED AGAINST COMPONENTS AND NOT AGAINST DEADLINES
 *
 * The two do not line up, and pretending they do would produce a wrong total.
 * HSS2011's 8% "Revision exercise" component is FOUR dated deadlines of 2%
 * each; ABCT2326's 15% "Lab reports" is three reports the timetable does not
 * separately date. A deadline is a thing you hand in; a component is a thing
 * that carries weight. So a deadline row carries a done flag and nothing else,
 * and the mark boxes live on the component, where the weights sum to 100 and
 * the arithmetic closes.
 */
import {
  $$, SESSIONS, STUDY_SUBJECTS, SUBJECT_ADMIN, esc, fmtDate, fmtTime,
  getSubject, sessionSpan, sessionsWithStatus,
} from './imports.js';
import { K, read, store, write } from './storage-versioned-keys.js';
import { toast } from './small-ui-helpers.js';

/* ------------------------------------------------------------------ *
 * The deadlines, derived from the schedule
 * ------------------------------------------------------------------ */

/*
 * `to` is the due instant. For a submission row the schedule writes
 * `at: [23, 59, 23, 59]`, so span start and end are the same minute; for a
 * sat test it is the end of the sitting. Either way the moment it stops being
 * "upcoming" is the moment it is over, which is what a deadline list means.
 */
export const DEADLINES = SESSIONS
  .filter((s) => s.kind === 'assessment')
  .map((s) => ({ s, ...sessionSpan(s) }))
  .sort((a, b) => a.to - b.to);

const DAY = 86400000;
/* "Soon" is one week. Short enough that it is not the whole term, long enough
   that a piece of coursework can still be started when it turns amber. */
export const SOON_MS = 7 * DAY;

export function deadlineState(row, now, done) {
  if (done) return 'done';
  if (now > row.to) return 'overdue';
  return row.to - now <= SOON_MS ? 'soon' : 'later';
}

/**
 * How long until (or how long since) a moment, in the coarsest unit that is
 * still true. Pure, and exported because the countdown is the one thing on a
 * deadline row that has to be right.
 */
export function untilText(to, now) {
  const ms = to - now;
  const past = ms < 0;
  const mins = Math.round(Math.abs(ms) / 60000);
  const unit = mins < 60 ? `${mins} min`
    : mins < 1440 ? `${Math.round(mins / 60)} h`
      : `${Math.round(mins / 1440)} day${Math.round(mins / 1440) === 1 ? '' : 's'}`;
  return past ? `${unit} ago` : `in ${unit}`;
}

/* ------------------------------------------------------------------ *
 * The two pieces of state
 * ------------------------------------------------------------------ */

function doneMap() {
  if (!store.assessDone) store.assessDone = read(K.assessDone, {});
  return store.assessDone;
}
function marksMap() {
  if (!store.marks) store.marks = read(K.marks, {});
  return store.marks;
}
export function isDone(id) { return !!doneMap()[id]; }
export function setDone(id, value) {
  const d = doneMap();
  if (value) d[id] = true; else delete d[id];
  write(K.assessDone, d);
}

/* A component is identified by its name, not its position: the syllabus data
   is edited when a subject description form is re-read, and a mark that
   silently moved from "Quiz" to "Final exam" because a row was inserted above
   it would be worse than one that was lost. */
const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
export const markKey = (subject, name) => `${subject}::${slug(name)}`;

export function getMark(subject, name) {
  const v = marksMap()[markKey(subject, name)];
  return typeof v === 'number' && Number.isFinite(v) ? v : null;
}
export function setMark(subject, name, value) {
  const m = marksMap();
  const key = markKey(subject, name);
  if (value === null || value === '' || Number.isNaN(value)) delete m[key];
  else m[key] = Math.max(0, Math.min(100, Number(value)));
  write(K.marks, m);
}

/* ------------------------------------------------------------------ *
 * The arithmetic — pure, so work/assessment-check.mjs can drive it
 * ------------------------------------------------------------------ */

/**
 * What a set of weighted components with some marks entered adds up to.
 *
 *   banked   percentage points of the final mark already secured
 *   entered  the weight those marks cover
 *   pending  the weight still to come
 *   average  the mean mark ACROSS WHAT IS MARKED, weighted — not across the
 *            subject, which would read as a catastrophe in week two when 92%
 *            of the weight has simply not happened yet
 *   best     the highest final mark still reachable
 *
 * `components` is `[{ name, weight }]`; `marks` maps name -> percentage.
 */
export function computeMark(components, marks) {
  const total = components.reduce((n, c) => n + (Number(c.weight) || 0), 0);
  let banked = 0;
  let entered = 0;
  for (const c of components) {
    const v = marks[c.name];
    if (typeof v !== 'number' || !Number.isFinite(v)) continue;
    banked += (v / 100) * (Number(c.weight) || 0);
    entered += Number(c.weight) || 0;
  }
  const pending = Math.max(0, total - entered);
  return {
    total,
    banked,
    entered,
    pending,
    average: entered ? (banked / entered) * 100 : null,
    best: banked + pending,
  };
}

/**
 * What the remaining weight has to average for the subject to finish on
 * `target` percent. null when nothing is left to mark; over 100 means the
 * target is already out of reach, and the caller says so rather than printing
 * an impossible number as advice.
 */
export function needFor(m, target) {
  if (m.pending <= 0) return null;
  return ((target - m.banked) / m.pending) * 100;
}

/** Open, overdue and imminent counts — the dashboard line. */
export function deadlineStats(now) {
  let open = 0;
  let overdue = 0;
  let soon = 0;
  let next = null;
  for (const row of DEADLINES) {
    const state = deadlineState(row, now, isDone(row.s.id));
    if (state === 'done') continue;
    open += 1;
    if (state === 'overdue') overdue += 1;
    if (state === 'soon') soon += 1;
    if (!next && row.to >= now) next = row;
  }
  return { open, overdue, soon, next, total: DEADLINES.length };
}

/* ------------------------------------------------------------------ *
 * The imminent-event banner
 * ------------------------------------------------------------------ */

/* Twenty minutes is enough to walk across campus and not so much that the
   banner is up for half the morning. */
export const IMMINENT_MS = 20 * 60000;

/**
 * The next class or sitting that starts within twenty minutes, or the one
 * running right now. Returns null the rest of the time, which is most of it —
 * a banner that is always up is furniture, not a warning.
 */
export function imminent(now, rows) {
  for (const r of rows) {
    if (r.status === 'now') return { row: r, live: true };
    if (r.status === 'next' || r.status === 'upcoming') {
      if (r.from - now <= IMMINENT_MS && r.from >= now) return { row: r, live: false };
      return null;
    }
  }
  return null;
}

export function imminentHTML(now, rows) {
  const hit = imminent(now, rows);
  if (!hit) return '';
  const s = hit.row.s;
  const where = [s.subject, s.room, hit.live ? 'on now' : untilText(hit.row.from, now)].filter(Boolean);
  return `<div class="upnext${hit.live ? ' islive' : ''}" role="status">
    <span class="upflag">${hit.live ? 'On now' : 'Starts soon'}</span>
    <b>${esc(s.title)}</b>
    <span class="upmeta">${esc(where.join(' · '))}</span>
  </div>`;
}

/* ------------------------------------------------------------------ *
 * Export to calendar
 * ------------------------------------------------------------------ */

/* Escaping for RFC 5545 text values: backslash, comma and semicolon are
   delimiters in the format, and a literal newline ends the property. */
const ics = (s) => String(s ?? '').replace(/([\\,;])/g, '\\$1').replace(/\r?\n/g, '\\n');
const p2 = (n) => String(n).padStart(2, '0');
/** Local wall-clock, with no zone — see the note on buildICS. */
const stamp = (d) => `${d.getFullYear()}${p2(d.getMonth() + 1)}${p2(d.getDate())}`
  + `T${p2(d.getHours())}${p2(d.getMinutes())}00`;
/** DTSTAMP is when the FILE was written, which is a real instant, so it is UTC. */
const utcStamp = (d) => `${d.getUTCFullYear()}${p2(d.getUTCMonth() + 1)}${p2(d.getUTCDate())}`
  + `T${p2(d.getUTCHours())}${p2(d.getUTCMinutes())}${p2(d.getUTCSeconds())}Z`;

/*
 * Floating local time, deliberately: no VTIMEZONE and no Z suffix.
 *
 * Every date in outputs/schedule.js is a local wall-clock time built with
 * `new Date(y, m, d, h, min)` and there is no IANA zone anywhere in the data,
 * so converting to UTC here would be inventing an offset. A floating time
 * means the calendar shows 16:30 wherever the phone is, which is exactly what
 * the timetable means.
 */
export function buildICS(sessions = SESSIONS, now = new Date()) {
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0',
    'PRODID:-//Radiography Study Studio//Timetable//EN',
    'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    'X-WR-CALNAME:Radiography Study Studio',
  ];
  let n = 0;
  for (const s of sessions) {
    /* An undated row spans a whole teaching week. The schedule refuses to
       guess a time for it and so does this: a week-long all-day block in a
       calendar is noise, and a made-up hour is worse. */
    if (!s.on || !s.at) continue;
    const { from, to } = sessionSpan(s);
    n += 1;
    const uid = `${s.id || `${s.subject}-w${s.week}-${n}`}@radiography-study-studio`;
    const desc = [s.note, s.room ? `Room ${s.room}` : '', s.group ? `Group ${s.group}` : '']
      .filter(Boolean).join(' — ');
    /* A 23:59 submission deadline has a zero-length span, and a zero-length
       event is dropped or shown as a point by most calendars. Half an hour
       before the deadline is the reminder the row is actually for. */
    const end = to > from ? to : from;
    const start = to > from ? from : new Date(from.getTime() - 1800000);
    lines.push('BEGIN:VEVENT', `UID:${ics(uid)}`, `DTSTAMP:${utcStamp(now)}`,
      `DTSTART:${stamp(start)}`, `DTEND:${stamp(end)}`,
      `SUMMARY:${ics(`${s.subject} · ${s.title}`)}`);
    if (s.room) lines.push(`LOCATION:${ics(s.room)}`);
    if (desc) lines.push(`DESCRIPTION:${ics(desc)}`);
    lines.push('END:VEVENT');
  }
  lines.push('END:VCALENDAR');
  /* RFC 5545 wants CRLF, and the calendars that are strict about it are the
     ones that refuse the file rather than the ones that complain. */
  return `${lines.join('\r\n')}\r\n`;
}

export function exportCalendar() {
  const text = buildICS();
  const blob = new Blob([text], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'radiography-timetable.ics';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
  const events = (text.match(/BEGIN:VEVENT/g) || []).length;
  toast(`${events} dated sessions written to radiography-timetable.ics — open it to add them to your calendar.`);
}

/* ------------------------------------------------------------------ *
 * The panel
 * ------------------------------------------------------------------ */

const FILTERS = [['open', 'To do'], ['soon', 'This week'], ['overdue', 'Overdue'], ['done', 'Handed in'], ['all', 'All']];

function passesFilter(state, filter) {
  if (filter === 'all') return true;
  if (filter === 'open') return state !== 'done';
  return state === filter;
}

const accentOf = (code) => (getSubject(code) || {}).accent || 'var(--teal)';

function deadlineRow(row, now) {
  const s = row.s;
  const done = isDone(s.id);
  const state = deadlineState(row, now, done);
  const when = s.at && s.at[0] === 23 && s.at[1] === 59
    ? `${fmtDate(row.to)}, ${fmtTime(row.to)}`
    : `${fmtDate(row.from)} · ${fmtTime(row.from)}–${fmtTime(row.to)}`;
  const meta = [s.subject, `Week ${s.week}`, s.room, s.weight ? `${s.weight}% of the subject` : '']
    .filter(Boolean).join(' · ');
  return `<li class="assrow ${esc(state)}" style="--acc:${esc(accentOf(s.subject))}">
    <div class="assdue">${esc(when)}<br>${esc(done ? 'handed in' : untilText(row.to, now))}</div>
    <div>
      <div class="assname">${esc(s.title)}</div>
      <div class="assmeta">${esc(meta)}</div>
      ${s.note ? `<div class="assmeta">${esc(s.note)}</div>` : ''}
      <div class="assacts">
        <button class="conf${done ? ' on' : ''}" data-done="${esc(s.id)}">${done ? 'Handed in ✓' : 'Mark handed in'}</button>
      </div>
    </div>
  </li>`;
}

/* The four targets are plain percentages on purpose. Turning them into letter
   grades would need a grading scale, and no document in this repo supplies
   one — an invented band is exactly the kind of claim the source rule is
   there to stop. */
const TARGETS = [50, 60, 70, 80];

function markCard(code) {
  const admin = SUBJECT_ADMIN[code];
  if (!admin || !admin.assessment.length) return '';
  const components = admin.assessment.map((c) => ({ name: c.name, weight: c.weight, note: c.note }));
  const marks = {};
  for (const c of components) {
    const v = getMark(code, c.name);
    if (v !== null) marks[c.name] = v;
  }
  const m = computeMark(components, marks);
  const pc = (n) => Math.round(n * 10) / 10;

  const rows = components.map((c) => {
    const v = getMark(code, c.name);
    /* Deliberately not the deadline row's `done` state: a component with a
       mark in it is the OPPOSITE of finished-with — it is the row carrying
       the number — and dimming it would bury the thing the card is for. */
    return `<div class="assrow">
      <div class="assdue">${esc(c.weight)}%<br><span class="marklab">of the mark</span></div>
      <div>
        <div class="assname">${esc(c.name)}</div>
        <div class="assacts">
          <input class="markin" type="number" inputmode="decimal" min="0" max="100" step="0.1"
            value="${v === null ? '' : esc(v)}" placeholder="—"
            aria-label="Your mark for ${esc(c.name)}, as a percentage"
            data-mark="${esc(code)}" data-component="${esc(c.name)}">
          <span class="marklab">% scored${v === null ? '' : ` · ${esc(pc((v / 100) * c.weight))} of ${esc(c.weight)} banked`}</span>
        </div>
      </div>
    </div>`;
  }).join('');

  /* The reachable targets, and only those. Printing "you need 140%" as advice
     is how a progress display starts lying to the person using it. */
  const reach = m.pending > 0
    ? TARGETS.map((t) => ({ t, need: needFor(m, t) })).filter((x) => x.need !== null && x.need <= 100 && x.need > 0)
    : [];
  const verdict = m.entered === 0
    ? 'Nothing marked yet — enter a mark as each piece comes back.'
    : m.pending === 0
      ? `Everything is marked. Final: ${pc(m.banked)}%.`
      : `${pc(m.banked)}% banked from ${m.entered}% of the weight, ${m.pending}% still to come. Highest still reachable: ${pc(m.best)}%.`;

  return `<section class="markcard" style="--acc:${esc(accentOf(code))}">
    <div class="marktop">
      <span class="sesscode">${esc(code)}</span>
      <b>Running mark</b>
      <span class="markcount">${esc(m.entered)}% of ${esc(m.total)}% marked</span>
    </div>
    <div class="markbar">
      <span class="banked" style="width:${m.total ? (m.banked / m.total) * 100 : 0}%"></span>
      <span class="pending" style="width:${m.total ? (m.pending / m.total) * 100 : 0}%"></span>
    </div>
    <div class="markstat">${m.average === null ? '<b>—</b> so far' : `<b>${esc(pc(m.average))}%</b> average on what is marked`}</div>
    <p class="marknote">${esc(verdict)}</p>
    ${reach.length ? `<p class="marknote">To finish on ${reach.map((x) =>
    `${x.t}% you need ${pc(x.need)}%`).join(', on ')} across the rest.</p>` : ''}
    <div class="asslines">${rows}</div>
    ${admin.assessmentNote ? `<p class="marknote">${esc(admin.assessmentNote)}</p>` : ''}
  </section>`;
}

export function assessmentsPanel(now, filter) {
  const stats = deadlineStats(now);
  const shown = DEADLINES.filter((row) =>
    passesFilter(deadlineState(row, now, isDone(row.s.id)), filter));

  const head = `<div class="attsum">
    <span class="s"><b>${STUDY_SUBJECTS.length}</b><small>subjects</small></span>
    <span class="s"><b>${stats.open}</b><small>still to hand in</small></span>
    <span class="s"><b style="${stats.soon ? 'color:var(--orange)' : ''}">${stats.soon}</b><small>due this week</small></span>
    <span class="s"><b style="${stats.overdue ? 'color:var(--red)' : ''}">${stats.overdue}</b><small>overdue</small></span>
  </div>`;

  const bar = `<div class="assbar">
    <div class="segbar assfilters">${FILTERS.map(([id, label]) =>
    `<button class="seg${filter === id ? ' active' : ''}" data-afilter="${esc(id)}">${esc(label)}</button>`).join('')}</div>
    <button class="ghost" id="icsExport">Export timetable to calendar</button>
  </div>`;

  const list = shown.length
    ? `<ul class="asslines" style="margin-top:12px">${shown.map((r) => deadlineRow(r, now)).join('')}</ul>`
    : `<div class="emptybox">Nothing under “${esc((FILTERS.find((f) => f[0] === filter) || [])[1] || filter)}”.</div>`;

  return `${head}${bar}${list}
    ${Object.keys(SUBJECT_ADMIN).map(markCard).join('')}
    <p class="marknote" style="margin-top:14px">Deadlines and weights come from the subject documents on the Syllabus tab.
      What you handed in and what you scored are yours, kept on this device with the rest of your progress.</p>`;
}

/** Wire the panel's controls. `rerender` redraws whichever view hosts it. */
export function wireAssessments(root, rerender, setFilter) {
  root.querySelectorAll('[data-afilter]').forEach((b) => {
    b.onclick = () => { setFilter(b.dataset.afilter); rerender(); };
  });
  root.querySelectorAll('[data-done]').forEach((b) => {
    b.onclick = () => { setDone(b.dataset.done, !isDone(b.dataset.done)); rerender(); };
  });
  root.querySelectorAll('[data-mark]').forEach((input) => {
    /*
     * `change`, not `input`: a redraw on every keystroke would take the field's
     * focus away mid-number, and on iOS closing that keyboard is what the
     * viewport bug in viewport-recovery.js hangs off. One write when the field
     * is left, one redraw after it.
     */
    input.onchange = () => {
      const raw = input.value.trim();
      setMark(input.dataset.mark, input.dataset.component, raw === '' ? null : Number(raw));
      rerender();
    };
  });
  const ex = root.querySelector('#icsExport');
  if (ex) ex.onclick = () => exportCalendar();
}

/* ------------------------------------------------------------------ *
 * The minute tick behind the Today banner
 * ------------------------------------------------------------------ */

/*
 * Written straight into one element rather than through renderToday().
 *
 * A full re-render every minute would reset the scroll position of whatever
 * the reader was looking at, and re-run nine session pickers to change one
 * line of text. This writes the banner and nothing else, so a class coming up
 * is an appearance on the page rather than an interruption of it.
 */
export function paintImminent(now = new Date()) {
  const host = $$('upNextBanner');
  if (!host) return;
  const view = $$('todayView');
  if (!view || view.classList.contains('hidden')) { host.innerHTML = ''; return; }
  host.innerHTML = imminentHTML(now, sessionsWithStatus(now));
}

let tick = null;
export function init() {
  if (tick) clearInterval(tick);
  tick = setInterval(() => paintImminent(), 60000);
  paintImminent();
}
