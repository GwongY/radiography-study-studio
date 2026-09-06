/*
 * Exam mode — a sitting, not a drill.
 *
 * "Exam-style recall" already existed and was a drill wearing the word: ten
 * items, feedback after every answer, no clock and no mark. That is a useful
 * thing and it is not what sitting an exam is. The three properties that make
 * an exam an exam are all absent from it — you cannot see how you did until
 * the end, you cannot take as long as you like, and at the end there is a
 * number.
 *
 * So this is a paper. Questions are answered blind, a clock runs, and
 * submitting produces a mark with a per-unit breakdown of where it was lost.
 *
 * WHY ONLY mcq AND cloze
 *
 * Not because they are easiest to mark, though they are. outputs/schedule.js
 * records the ABCT2326 final exam as "MCQ and fill-in-the-blanks", cited to
 * the subject overview — and mcq and cloze are exactly those two. A paper made
 * of sequence and matching questions would mark cleanly and rehearse a format
 * the reader will never sit.
 *
 * WHAT IT RUNS ON
 *
 * The corpus, always: 246 mcq and cloze questions across the five Semester 1
 * subjects. A question pack, if one is loaded, adds to that pool and changes
 * nothing else here — which is the point of keeping the pack behind its own
 * module. Exam mode has no opinion about where a question came from, so the
 * feature works for anyone who clones this repository and merely works with
 * more questions for whoever holds a pack.
 *
 * Split out per docs/CODEMAP.md. Nothing runs at module scope.
 */
import { $$, SUBJECT_ADMIN, STUDY_ITEMS, dimensionFor, esc, getItem, questionsOf, ui } from './imports.js';
import { looseMatch } from './layout-figures.js';
import { closeSessionOverlay, openSessionOverlay } from './navigation-five-destinations.js';
import { recordAttempt } from './progress-log.js';
import { toast } from './small-ui-helpers.js';

/* The two types the real paper uses. */
export const EXAM_TYPES = ['mcq', 'cloze'];

export const EXAM_DEFAULTS = { count: 20, minutes: 25 };

/* ------------------------------------------------------------------ *
 * Building a paper
 *
 * Pure, and exported, so work/exam-check.mjs can build and mark papers in
 * node without a DOM. A mark is a number the reader makes decisions with;
 * the arithmetic behind it should be reachable by something other than a
 * person clicking through twenty questions.
 * ------------------------------------------------------------------ */

export function examPool(opts = {}) {
  const items = opts.subject ? STUDY_ITEMS.filter((i) => i.subject === opts.subject) : STUDY_ITEMS;
  return items.flatMap((i) => questionsOf(i).filter((q) => EXAM_TYPES.includes(q.type)));
}

export function buildPaper(opts = {}) {
  const pool = (opts.pool || examPool(opts)).slice();
  const count = Math.max(1, opts.count || EXAM_DEFAULTS.count);
  /* Seedable, so a check can build the same paper twice. */
  const rand = opts.random || Math.random;
  const shuffled = pool.map((q) => [rand(), q]).sort((a, b) => a[0] - b[0]).map((p) => p[1]);
  /*
   * One question per item, until the pool of items runs out. Two questions on
   * the same item are two chances at one idea, which flatters the mark and
   * tells the reader less than one question on two ideas would.
   */
  const seen = new Set();
  const spread = [];
  const spare = [];
  for (const q of shuffled) {
    if (seen.has(q.itemId)) { spare.push(q); continue; }
    seen.add(q.itemId);
    spread.push(q);
  }
  return [...spread, ...spare].slice(0, count);
}

/*
 * Marking. `answers` is qid -> chosen option index (mcq) or typed string
 * (cloze). Anything absent is unanswered, which is wrong but is counted
 * separately: leaving six blank and getting six wrong are different failures
 * and the breakdown should not blur them.
 */
export function markQuestion(q, given) {
  if (given === undefined || given === null || given === '') return { answered: false, correct: false };
  if (q.type === 'mcq') return { answered: true, correct: Number(given) === Number(q.answer) };
  return { answered: true, correct: looseMatch(String(given), q.accept || []) };
}

export function markPaper(paper, answers = {}) {
  const rows = paper.map((q) => {
    const given = answers[q.qid];
    const { answered, correct } = markQuestion(q, given);
    const item = getItem(q.itemId);
    return {
      q, given, answered, correct,
      unit: item?.unit || 'unassigned',
      subject: item?.subject || 'unassigned',
      title: item?.title || q.itemId,
    };
  });
  const correct = rows.filter((r) => r.correct).length;
  const blank = rows.filter((r) => !r.answered).length;
  const byUnit = new Map();
  for (const r of rows) {
    const u = byUnit.get(r.unit) || { unit: r.unit, subject: r.subject, total: 0, correct: 0 };
    u.total += 1;
    if (r.correct) u.correct += 1;
    byUnit.set(r.unit, u);
  }
  return {
    rows,
    total: paper.length,
    correct,
    blank,
    /* Rounded once, here, so every place that shows it shows the same number. */
    percent: paper.length ? Math.round((100 * correct) / paper.length) : 0,
    byUnit: [...byUnit.values()].sort((a, b) => (a.correct / a.total) - (b.correct / b.total)),
  };
}

/*
 * What this paper rehearses. The weights in outputs/schedule.js are what each
 * assessment is worth, cited to the subject's own documents — so a single
 * subject paper can say which real assessment it stands in for without
 * inventing anything. A mixed paper stands in for nothing and says so.
 */
export function rehearses(subject) {
  const admin = subject && SUBJECT_ADMIN[subject];
  const rows = admin?.assessment || [];
  if (!rows.length) return null;
  const examish = rows.filter((r) => /exam|test|quiz/i.test(r.name));
  const pick = (examish.length ? examish : rows).slice().sort((a, b) => b.weight - a.weight)[0];
  return pick ? { name: pick.name, weight: pick.weight, subject } : null;
}

/* ------------------------------------------------------------------ *
 * The sitting
 * ------------------------------------------------------------------ */

const fmtClock = (ms) => {
  const s = Math.max(0, Math.round(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

/*
 * The overlay is the session overlay. Everything an exam does not have — the
 * step rail, the inline source button, the study footer — is put away while a
 * paper is running, which adds no CSS and so cannot fight the text-size
 * control for the size of anything.
 *
 * Inline `display`, NOT the `hidden` property. `hidden` only carries
 * `display:none` from the UA stylesheet, and app.css sets `display:flex` on
 * both .sessionfoot and .srcinline — a rule with higher specificity than the
 * UA default, so the elements stayed on screen with hidden === true. The
 * paper rendered underneath the study session's own Next and Save & exit
 * buttons, which do not belong to it and would have ended the sitting.
 */
const STOWED = new Map();
function chrome(on) {
  const parts = [
    $$('rssSteps'),
    document.querySelector('#sessionView .srcinline'),
    document.querySelector('#sessionView .sessionfoot'),
  ].filter(Boolean);
  for (const el of parts) {
    if (on) {
      if (!STOWED.has(el)) STOWED.set(el, el.style.display);
      el.style.display = 'none';
    } else {
      el.style.display = STOWED.has(el) ? STOWED.get(el) : '';
      STOWED.delete(el);
    }
  }
}

export function startExam(opts = {}) {
  const paper = buildPaper(opts);
  if (paper.length < 2) {
    return toast('Not enough exam-style questions for that selection yet.');
  }
  const minutes = opts.minutes || EXAM_DEFAULTS.minutes;
  ui.exam = {
    paper,
    subject: opts.subject || null,
    index: 0,
    answers: {},
    flagged: new Set(),
    startedAt: Date.now(),
    endsAt: Date.now() + minutes * 60000,
    minutes,
    submitted: null,
    tick: null,
  };
  chrome(true);
  openSessionOverlay();
  ui.exam.tick = setInterval(() => {
    if (!ui.exam || ui.exam.submitted) return;
    if (Date.now() >= ui.exam.endsAt) { submitExam(true); return; }
    paintClock();
  }, 1000);
  renderExam();
}

export function endExam() {
  if (ui.exam?.tick) clearInterval(ui.exam.tick);
  ui.exam = null;
  chrome(false);
  closeSessionOverlay();
}

function paintClock() {
  if (!ui.exam) return;
  const meta = $$('rssSessionMeta');
  if (!meta) return;
  const left = ui.exam.endsAt - Date.now();
  const answered = Object.keys(ui.exam.answers).length;
  /* Under two minutes the clock is the thing that matters; say so plainly
     rather than with a colour a colour-blind reader may not see. */
  const urgent = left < 120000 ? ' · time almost up' : '';
  meta.textContent = ui.exam.submitted
    ? `Submitted · ${ui.exam.submitted.correct} of ${ui.exam.submitted.total}`
    : `${fmtClock(left)} left · ${answered} of ${ui.exam.paper.length} answered${urgent}`;
}

function paintHead() {
  const e = ui.exam;
  const k = $$('rssSessionKicker');
  const c = $$('rssSessionCount');
  const bar = $$('rssSessionBar');
  if (k) k.textContent = e.submitted ? 'Exam · results' : 'Exam';
  if (c) c.textContent = e.submitted ? `${e.submitted.correct}/${e.submitted.total}` : `${e.index + 1}/${e.paper.length}`;
  if (bar) {
    const done = e.submitted ? 1 : Object.keys(e.answers).length / e.paper.length;
    bar.style.width = `${Math.round(done * 100)}%`;
  }
  paintClock();
}

function questionHTML(q, given) {
  if (q.type === 'mcq') {
    return `<div class="opts">${q.options.map((o, i) => `<button class="opt${Number(given) === i ? ' chosen' : ''}" data-opt="${i}">${esc(o)}</button>`).join('')}</div>`;
  }
  return `<div class="typed-row"><input id="rssExamInput" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type your answer" value="${esc(given ?? '')}"></div>`;
}

function renderExam() {
  const e = ui.exam;
  if (!e) return;
  if (e.submitted) return renderResults();
  const q = e.paper[e.index];
  const given = e.answers[q.qid];
  const flagged = e.flagged.has(q.qid);
  $$('rssStage').innerHTML = `<div class="lesson">
    <div class="eyebrow">Question ${e.index + 1} of ${e.paper.length} · ${q.type === 'mcq' ? 'Multiple choice' : 'Fill in the blank'}</div>
    <div class="q-prompt">${esc(q.prompt)}</div>
    <div id="rssExamBody">${questionHTML(q, given)}</div>
    <div class="rss-actions" style="margin-top:14px">
      <button class="ghost" id="rssExamPrev"${e.index === 0 ? ' disabled' : ''}>Back</button>
      <button class="ghost" id="rssExamFlag">${flagged ? 'Unflag' : 'Flag for review'}</button>
      <button class="primary" id="rssExamNext">${e.index === e.paper.length - 1 ? 'Finish' : 'Next'}</button>
    </div>
    <div class="rss-actions" style="margin-top:10px">
      <button class="ghost" id="rssExamSubmit">Submit paper</button>
    </div>
  </div>`;
  wireExam();
  paintHead();
}

function wireExam() {
  const e = ui.exam;
  const q = e.paper[e.index];
  const body = $$('rssExamBody');
  if (q.type === 'mcq') {
    body.querySelectorAll('.opt').forEach((b) => {
      b.onclick = () => {
        e.answers[q.qid] = Number(b.dataset.opt);
        /* Repaint only the options: re-rendering the whole card on every tap
           loses the scroll position on a long stem. */
        body.querySelectorAll('.opt').forEach((o) => o.classList.toggle('chosen', Number(o.dataset.opt) === e.answers[q.qid]));
        paintHead();
      };
    });
  } else {
    const input = $$('rssExamInput');
    if (input) {
      input.oninput = () => {
        const v = input.value.trim();
        if (v) e.answers[q.qid] = v; else delete e.answers[q.qid];
        paintHead();
      };
      input.onkeydown = (ev) => { if (ev.key === 'Enter') { ev.preventDefault(); step(1); } };
    }
  }
  $$('rssExamPrev').onclick = () => step(-1);
  $$('rssExamNext').onclick = () => step(1);
  $$('rssExamFlag').onclick = () => {
    if (e.flagged.has(q.qid)) e.flagged.delete(q.qid); else e.flagged.add(q.qid);
    renderExam();
  };
  $$('rssExamSubmit').onclick = () => confirmSubmit();
}

function step(by) {
  const e = ui.exam;
  const next = e.index + by;
  if (next < 0) return;
  if (next >= e.paper.length) return confirmSubmit();
  e.index = next;
  renderExam();
}

function confirmSubmit() {
  const e = ui.exam;
  const blank = e.paper.length - Object.keys(e.answers).length;
  /*
   * The one confirmation. Submitting is the irreversible act of the feature —
   * the clock stops and the answers are recorded against mastery — and doing
   * it with six questions untouched is nearly always a misclick on "Finish".
   */
  if (blank > 0 && !window.confirm(`${blank} question${blank === 1 ? '' : 's'} still blank. Submit anyway?`)) return;
  submitExam(false);
}

function submitExam(byTimeout) {
  const e = ui.exam;
  if (!e || e.submitted) return;
  if (e.tick) { clearInterval(e.tick); e.tick = null; }
  const result = markPaper(e.paper, e.answers);
  result.byTimeout = !!byTimeout;
  result.elapsedMs = Date.now() - e.startedAt;
  e.submitted = result;

  /*
   * Recorded against mastery, one attempt per question, so a paper feeds the
   * scheduler exactly as practice does. The whole paper shares ONE timestamp:
   * these answers were given over twenty minutes, but they were submitted at
   * one moment, and the log is a record of what was submitted.
   */
  const at = Date.now();
  const per = Math.max(1000, Math.round(result.elapsedMs / Math.max(1, e.paper.length)));
  for (const row of result.rows) {
    recordAttempt(
      row.q.itemId,
      dimensionFor(row.q),
      { correct: row.correct, confidence: row.answered ? 2 : 1, ms: per, expectedMs: 14000 },
      { at, qid: row.q.qid, qtype: row.q.type, primary: true },
    );
  }
  renderResults();
}

function renderResults() {
  const e = ui.exam;
  const r = e.submitted;
  const rehearsed = rehearses(e.subject);
  const weakest = r.byUnit.slice(0, 5);
  $$('rssStage').innerHTML = `<div class="lesson">
    <div class="eyebrow">${r.byTimeout ? 'Time up · paper submitted automatically' : 'Paper submitted'}</div>
    <h3 style="margin:.2em 0">${r.correct} of ${r.total} — ${r.percent}%</h3>
    <p class="small">${r.blank ? `${r.blank} left blank. ` : ''}Finished in ${fmtClock(r.elapsedMs)} of ${e.minutes} minutes.</p>
    ${rehearsed ? `<p class="small">This paper rehearses <strong>${esc(rehearsed.name)}</strong>, worth ${rehearsed.weight}% of ${esc(rehearsed.subject)}. The percentage above is this paper only — it is not a prediction of that mark.</p>`
      : '<p class="small">A mixed paper across subjects, so it does not stand in for any one assessment.</p>'}
    <h4 style="margin-top:1.1em">Where it went</h4>
    <div class="opts">${weakest.map((u) => `<div class="opt" style="cursor:default">${esc(u.unit)} — ${u.correct} of ${u.total}</div>`).join('')}</div>
    <h4 style="margin-top:1.1em">Every question</h4>
    <div class="opts">${r.rows.map((row, i) => `<button class="opt ${row.correct ? 'right' : 'wrong'}" data-review="${i}">${i + 1}. ${esc(row.title)} — ${row.correct ? 'correct' : (row.answered ? 'wrong' : 'blank')}</button>`).join('')}</div>
    <div id="rssExamReview" style="margin-top:12px"></div>
    <div class="rss-actions" style="margin-top:14px">
      <button class="primary" id="rssExamDone">Done</button>
    </div>
  </div>`;
  $$('rssStage').querySelectorAll('[data-review]').forEach((b) => {
    b.onclick = () => showReview(Number(b.dataset.review));
  });
  $$('rssExamDone').onclick = () => endExam();
  paintHead();
}

function showReview(i) {
  const row = ui.exam.submitted.rows[i];
  const q = row.q;
  const yours = q.type === 'mcq'
    ? (row.answered ? esc(q.options[Number(row.given)]) : 'left blank')
    : (row.answered ? esc(String(row.given)) : 'left blank');
  const right = q.type === 'mcq' ? esc(q.options[q.answer]) : esc((q.accept || []).join(', '));
  $$('rssExamReview').innerHTML = `<div class="verdict ${row.correct ? 'ok' : 'no'}">
    <h4>${i + 1}. ${row.correct ? 'Correct' : 'Not right'}</h4>
    <div class="why"><p>${esc(q.prompt)}</p>
      <p><strong>Your answer:</strong> ${yours}</p>
      ${row.correct ? '' : `<p><strong>Accepted:</strong> ${right}</p>`}
      ${q.explanation ? `<p>${esc(q.explanation)}</p>` : ''}</div>
  </div>`;
}

/* Runs after every part has evaluated — see the entry point. */
export function init() {
  /*
   * The session overlay's own close and end buttons are wired in
   * dialog-behaviour-applied.js and know nothing about an exam. Rather than
   * teach them, intercept in the capture phase: an exam in progress owns
   * those two buttons, and a half-finished paper should not be able to leave
   * a running interval behind it.
   */
  for (const id of ['rssSessionClose', 'rssEndBtn']) {
    const el = $$(id);
    if (!el) continue;
    el.addEventListener('click', (ev) => {
      if (!ui.exam) return;
      ev.stopPropagation();
      ev.preventDefault();
      if (ui.exam.submitted) return endExam();
      if (window.confirm('Leave this paper? Nothing is recorded until it is submitted.')) endExam();
    }, true);
  }
}
