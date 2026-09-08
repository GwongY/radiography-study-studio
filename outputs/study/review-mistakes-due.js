/*
 * Exam — past papers, timed practice, mistakes, short answer, and the mastery map.
 *
 * Renamed from "Review" to "Exam" so the tab is a one-stop exam-prep destination.
 * The Exam Mode panel (timed papers) sits at the top; mistakes / short answer /
 * mastery remain as sub-tabs underneath — they are exam-prep data, not a
 * separate idea.
 *
 * The four sub-tabs now split the bank by what can be MARKED: a timed paper
 * takes the mcq and cloze questions, "Short answer" takes everything else and
 * lets the reader mark themselves. A "Due" tab used to sit where Short answer
 * is; it listed items the Daily session already picks up and its one action
 * duplicated the mistakes tab's.
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, STUDY_ITEMS, SUBJECTS, esc, getItem, getSubject, itemsForSubject, itemsForUnit, tierFor, TIER_LABELS, SUBJECT_ADMIN } from './imports.js';
import { K, itemAttempted, itemScore, store } from './storage-versioned-keys.js';
import { setActiveNav } from './navigation-five-destinations.js';
import { showView } from './small-ui-helpers.js';
import { startSession } from './session-engine.js';
import { startExam, examPool, EXAM_DEFAULTS } from './exam-mode.js';
import { packQuestions, packShortQuestions } from './question-pack.js';
import { recordAttempt } from './progress-log.js';

/* ------------------------------------------------------------------ *
 * Exam — past papers, timed practice, mistakes, due items, mastery.
 * ------------------------------------------------------------------ */

export let examTab = 'papers';

function reviewRow(title, note, badge, color) {
  return `<div class="unit-row" style="cursor:default"><span class="grow"><b>${esc(title)}</b><small>${esc(note)}</small></span><span class="mono" style="color:${color}">${esc(badge)}</span></div>`;
}

/* ------------------------------------------------------------------ *
 * Exam papers panel — corpus + optional pack launcher
 * ------------------------------------------------------------------ */
function examPapersHTML() {
  const corpus = examPool({ corpusOnly: true });
  const pack = packQuestions();
  const packTotal = pack.length;
  const total = corpus.length + packTotal;
  const subjectRows = Object.keys(SUBJECT_ADMIN).map((code) => {
    const n = examPool({ subject: code }).length;
    if (!n) return '';
    const admin = SUBJECT_ADMIN[code];
    const examish = (admin.assessment || []).filter((a) => /exam|test|quiz/i.test(a.name));
    const note = examish.length
      ? examish.map((a) => `${a.name} (${a.weight}%)`).join(', ')
      : '';
    return `<div class="unit-row">
      <span class="grow"><b>${esc(code)}</b><small>${esc(admin.title)}${note ? ' · ' + esc(note) : ''}</small></span>
      <span class="mono">${n} q</span>
      <button class="ghost" data-exam-subject="${esc(code)}" style="margin-left:8px">Start →</button>
    </div>`;
  }).filter(Boolean).join('');

  const packNote = packTotal > 0
    ? `<div class="notice" style="margin-top:10px"><strong>Question pack loaded:</strong> ${packTotal.toLocaleString()} additional MCQs available in mixed and matching subject papers. Other formats are in Short answer.</div>`
    : `<div class="notice" style="margin-top:10px">No question pack loaded. Open <strong>More → Question pack</strong> to add your private question bank (past papers, publisher test bank).</div>`;

  return `
    <div class="task-kicker" style="margin-bottom:9px">Practice paper</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
      <button class="primary" id="examStartMixed">Mixed paper (all subjects) →</button>
      <button class="ghost" id="examStartCustom">Custom length / time →</button>
    </div>
    <p class="small" style="margin-top:0">${total.toLocaleString()} questions in the pool${packTotal > 0 ? ` (${corpus.length} corpus + ${packTotal.toLocaleString()} pack)` : ' (corpus only)'}. A paper picks one question per topic, so no two questions test the same idea.</p>
    ${packNote}
    <div class="task-kicker" style="margin:14px 0 9px">By subject</div>
    <div class="reviewrows">${subjectRows}</div>`;
}

/* ------------------------------------------------------------------ *
 * Custom paper config dialog (rendered inline)
 * ------------------------------------------------------------------ */
function examCustomHTML() {
  return `<div style="display:grid;gap:10px;margin-top:8px">
    <label class="small">Questions
      <input type="range" id="examCountSlider" min="5" max="50" step="5" value="${EXAM_DEFAULTS.count}" style="width:100%;margin-top:4px">
      <span class="mono" id="examCountRead">${EXAM_DEFAULTS.count} questions</span>
    </label>
    <label class="small">Time limit
      <input type="range" id="examTimeSlider" min="10" max="90" step="5" value="${EXAM_DEFAULTS.minutes}" style="width:100%;margin-top:4px">
      <span class="mono" id="examTimeRead">${EXAM_DEFAULTS.minutes} minutes</span>
    </label>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:4px">
      <button class="primary" id="examCustomGo">Start paper →</button>
      <button class="ghost" id="examCustomCancel">Cancel</button>
    </div>
  </div>`;
}

function wireExamPapers(body) {
  const startMixed = body.querySelector('#examStartMixed');
  if (startMixed) startMixed.onclick = () => startExam({ count: EXAM_DEFAULTS.count, minutes: EXAM_DEFAULTS.minutes });

  const startCustomBtn = body.querySelector('#examStartCustom');
  if (startCustomBtn) startCustomBtn.onclick = () => {
    startCustomBtn.insertAdjacentHTML('afterend', examCustomHTML());
    startCustomBtn.remove();
    wireCustom(body);
  };

  body.querySelectorAll('[data-exam-subject]').forEach((b) => {
    b.onclick = () => startExam({ subject: b.dataset.examSubject, count: EXAM_DEFAULTS.count, minutes: EXAM_DEFAULTS.minutes });
  });
}

function wireCustom(body) {
  const countSlider = body.querySelector('#examCountSlider');
  const countRead = body.querySelector('#examCountRead');
  const timeSlider = body.querySelector('#examTimeSlider');
  const timeRead = body.querySelector('#examTimeRead');
  if (countSlider) countSlider.oninput = () => { if (countRead) countRead.textContent = `${countSlider.value} questions`; };
  if (timeSlider) timeSlider.oninput = () => { if (timeRead) timeRead.textContent = `${timeSlider.value} minutes`; };
  const goBtn = body.querySelector('#examCustomGo');
  if (goBtn) goBtn.onclick = () => startExam({ count: Number(countSlider?.value || EXAM_DEFAULTS.count), minutes: Number(timeSlider?.value || EXAM_DEFAULTS.minutes) });
  const cancelBtn = body.querySelector('#examCustomCancel');
  if (cancelBtn) cancelBtn.onclick = () => renderExamTab(examTab);
}

/* ------------------------------------------------------------------ *
 * Short answer — the half of the bank a timed paper cannot mark
 *
 * One question at a time, no clock: read, reveal the model answer, say
 * whether you had it. The reader marks themselves because they are comparing
 * MEANING, and the alternative — running looseMatch() over a sentence of
 * prose — would produce a verdict that is confidently wrong often enough to
 * make the whole surface untrustworthy.
 *
 * The deck is shuffled once and walked, rather than re-picked at random each
 * time. Random picking on a 1,150-question pool serves a repeat every few
 * questions by the birthday problem alone, which reads as a broken shuffle.
 * ------------------------------------------------------------------ */

let shortSubject = '';
let shortDeck = [];
let shortAt = 0;
let shortRevealed = false;
/* Reshuffle only when the pool itself changes — otherwise every re-render
   (and every answer) would restart the deck from the top. */
let shortDeckFor = -1;

function shortDeckEnsure(pool) {
  if (shortDeckFor === pool.length && shortDeck.length) return;
  shortDeck = pool.map((q) => [Math.random(), q]).sort((a, b) => a[0] - b[0]).map((p) => p[1]);
  shortDeckFor = pool.length;
  shortAt = 0;
  shortRevealed = false;
}

function shortAnswerHTML() {
  const pool = packShortQuestions().filter((q) => !shortSubject || q.subject === shortSubject);
  if (!pool.length) {
    return `<p class="small">Short-answer, true/false and matching questions from a loaded question pack appear here — the formats a timed paper cannot mark, which includes the format the real HSS2011 paper uses.</p>
      <div class="notice" style="margin-top:10px">No question pack is loaded on this device. Open <strong>More → Question pack</strong> to fetch one.</div>`;
  }
  shortDeckEnsure(pool);
  if (shortAt >= shortDeck.length) {
    return `<p class="small">You have been through all ${shortDeck.length.toLocaleString()} short-answer questions in this pack.</p>
      <button class="primary" id="shortRestart" style="margin-top:12px">Shuffle and go again →</button>`;
  }
  const q = shortDeck[shortAt];
  const kind = { tf: 'True / false', matching: 'Matching' }[q.type] || 'Short answer';
  return `
    <label class="small">Subject <select id="shortSubject"><option value="">All subjects</option>${Object.keys(SUBJECT_ADMIN).filter((code) => packShortQuestions().some((q) => q.subject === code)).map((code) => `<option value="${code}"${shortSubject === code ? ' selected' : ''}>${code} (${packShortQuestions().filter((q) => q.subject === code).length})</option>`).join('')}</select></label>
    <div style="display:flex;gap:10px;align-items:baseline;justify-content:space-between">
      <p class="small" style="margin:0">${esc(kind)} · ${esc(q.unit)}</p>
      <span class="mono" style="color:var(--dim)">${shortAt + 1} / ${shortDeck.length.toLocaleString()}</span>
    </div>
    <div class="card" style="margin-top:10px">
      <p style="font-size:calc(16px*var(--ts));line-height:1.5;margin:0">${esc(q.prompt)}</p>
    </div>
    ${shortRevealed ? `
      <div class="card" style="margin-top:10px;border-color:var(--teal)">
        <div class="task-kicker" style="color:var(--teal)">Model answer</div>
        <p style="font-size:calc(15px*var(--ts));line-height:1.5;margin:8px 0 0">${esc(q.answer)}</p>
      </div>
      <p class="small" style="margin-top:12px">Did you have it? This is the only thing that scores — nothing is checked against what you typed, because nothing was typed.</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
        <button class="primary" id="shortGot">Got it</button>
        <button class="ghost" id="shortMissed">Missed it</button>
        <button class="ghost" id="shortSkip">Skip — do not score</button>
      </div>`
      : `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px">
        <button class="primary" id="shortReveal">Reveal answer →</button>
        <button class="ghost" id="shortSkip">Skip</button>
      </div>`}`;
}

function wireShortAnswer(body) {
  const subject = body.querySelector('#shortSubject');
  if (subject) subject.onchange = () => { shortSubject = subject.value; shortDeckFor = -1; renderExamTab('short'); };
  const restart = body.querySelector('#shortRestart');
  if (restart) restart.onclick = () => { shortDeckFor = -1; renderExamTab('short'); };

  const reveal = body.querySelector('#shortReveal');
  if (reveal) reveal.onclick = () => { shortRevealed = true; renderExamTab('short'); };

  const skip = body.querySelector('#shortSkip');
  if (skip) skip.onclick = () => { shortAt += 1; shortRevealed = false; renderExamTab('short'); };

  const rate = (correct) => {
    const q = shortDeck[shortAt];
    if (q) {
      /*
       * typedRecall, not dimensionFor(q).
       *
       * dimensionFor would land these on 'recognition', because that is its
       * fallback for a type it does not know. Recognition is picking the right
       * answer out of a set, and there is no set here — the reader produced
       * the answer from nothing and then checked it. Scoring free recall as
       * recognition would inflate the one dimension it does not test.
       *
       * confidence 2 is the neutral value recordAttempt defaults to; there is
       * no confidence prompt on this surface and inventing one from the
       * button pressed would just be the same bit twice.
       */
      recordAttempt(
        q.itemId,
        'typedRecall',
        { correct, confidence: 2, ms: 0, expectedMs: 20000 },
        { qid: q.qid, qtype: q.type, primary: true },
      );
    }
    shortAt += 1;
    shortRevealed = false;
    renderExamTab('short');
  };
  const got = body.querySelector('#shortGot');
  if (got) got.onclick = () => rate(true);
  const missed = body.querySelector('#shortMissed');
  if (missed) missed.onclick = () => rate(false);
}

/* ------------------------------------------------------------------ *
 * Main render
 * ------------------------------------------------------------------ */
export function renderExamTab(tab) {
  examTab = tab || 'papers';
  setActiveNav('exam');
  /*
   * "Due" was removed and "Short answer" took its place.
   *
   * Due listed items whose review had come round — the same set the Daily
   * session already picks up, presented as a list you could only read. Its
   * one action ("Start due session") ran mode 'weakest', which is what the
   * mistakes tab's action does. Two doors, one room, and the list in between
   * was work for the reader rather than for the app.
   */
  $$('examTabs').innerHTML = [['papers', 'Exam papers'], ['mistakes', 'My mistakes'], ['short', 'Short answer'], ['mastery', 'Mastery']]
    .map(([id, label]) => `<button class="seg${examTab === id ? ' active' : ''}" data-etab="${esc(id)}">${esc(label)}</button>`).join('');
  $$('examTabs').querySelectorAll('[data-etab]').forEach((b) => { b.onclick = () => renderExamTab(b.dataset.etab); });

  let rows = '', cta = '', ctaMode = null;
  const body = $$('examBody');

  if (examTab === 'papers') {
    body.innerHTML = `<div>${examPapersHTML()}</div>`;
    wireExamPapers(body);
    showView('examView');
    return;
  }

  if (examTab === 'mistakes') {
    const ids = [];
    store.mistakes.forEach((m) => { if (ids.indexOf(m.itemId) < 0) ids.push(m.itemId); });
    const entries = ids.map((id) => ({ item: getItem(id), n: store.mistakes.filter((m) => m.itemId === id).length }))
      .filter((r) => r.item).sort((a, b) => b.n - a.n);
    const copy = 'Everything you have got wrong, most-repeated first. Each one keeps its own explanation and the confusion that caused it.';
    rows = entries.map((r) => reviewRow(r.item.title, getSubject(r.item.subject).title,
      r.n + ' lapse' + (r.n === 1 ? '' : 's'), r.n >= 3 ? 'var(--red)' : 'var(--orange)')).join('')
      || '<div class="empty">No mistakes recorded yet.</div>';
    if (entries.length) { cta = 'Drill these ' + entries.length + ' \u2192'; ctaMode = { mode: 'mistakes' }; }
    body.innerHTML = `<p class="small">${esc(copy)}</p><div class="reviewrows">${rows}</div>`
      + (cta ? `<button class="primary" id="examCtaBtn" style="margin-top:14px">${esc(cta)}</button>` : '');
  } else if (examTab === 'short') {
    body.innerHTML = shortAnswerHTML();
    wireShortAnswer(body);
    showView('examView');
    return;
  } else if (examTab === 'mastery') {
    const copy = 'Cross-subject progress across five mastery tiers, from unattempted to retained delayed recall.';
    const legend = `<div class="dash-legend">`
      + TIER_LABELS.map((label, idx) => `<span><span class="tier-dot t${idx}"></span>${esc(label)}</span>`).join('')
      + `</div>`;
    const subjectBlocks = SUBJECTS.filter((s) => itemsForSubject(s.id).length > 0).map((s) => {
      const units = (s.units || []).map((u) => {
        const uItems = itemsForUnit(u.id);
        if (!uItems.length) return '';
        const recalled = uItems.filter((i) => tierFor(itemScore(i.id), itemAttempted(i.id)) >= 3).length;
        const dots = uItems.map((i) => {
          const t = tierFor(itemScore(i.id), itemAttempted(i.id));
          return `<span class="tier-dot t${t}" title="${esc(i.title)}: ${TIER_LABELS[t]}"></span>`;
        }).join('');
        return `<div class="dash-unit">`
          + `<div class="lab"><b>${esc(u.label || u.id)}</b><span class="mono">${recalled}/${uItems.length} recalled+</span></div>`
          + `<div class="dots">${dots}</div>`
          + `</div>`;
      }).filter(Boolean).join('');
      if (!units) return '';
      return `<div style="margin-top:16px"><div class="task-kicker" style="margin-bottom:7px">${esc(s.code)} · ${esc(s.title)}</div><div class="reviewrows">${units}</div></div>`;
    }).filter(Boolean).join('');

    const attemptedCount = STUDY_ITEMS.filter((i) => itemAttempted(i.id)).length;
    if (attemptedCount) { cta = 'Drill weakest ' + Math.min(20, attemptedCount) + ' \u2192'; ctaMode = { mode: 'weakest', limit: 20 }; }

    body.innerHTML = `<p class="small">${esc(copy)}</p>`
      + (cta ? `<button class="primary" id="examCtaBtn" style="margin-top:14px">${esc(cta)}</button>` : '')
      + `${legend}${subjectBlocks || '<div class="empty">No study items found.</div>'}`;
  }

  if (ctaMode && $$('examCtaBtn')) $$('examCtaBtn').onclick = () => startSession(ctaMode);
  showView('examView');
}
