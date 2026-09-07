/*
 * Exam — past papers, timed practice, mistakes, due items, and the mastery map.
 *
 * Renamed from "Review" to "Exam" so the tab is a one-stop exam-prep destination.
 * The Exam Mode panel (timed papers) sits at the top; mistakes / due / mastery
 * remain as sub-tabs underneath — they are exam-prep data, not a separate idea.
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, STUDY_ITEMS, SUBJECTS, esc, getItem, getSubject, itemsForSubject, itemsForUnit, tierFor, TIER_LABELS, SUBJECT_ADMIN } from './imports.js';
import { K, itemAttempted, itemDue, itemScore, store } from './storage-versioned-keys.js';
import { setActiveNav } from './navigation-five-destinations.js';
import { showView } from './small-ui-helpers.js';
import { startSession } from './session-engine.js';
import { startExam, examPool, EXAM_DEFAULTS } from './exam-mode.js';
import { packQuestions } from './question-pack.js';

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
    const n = examPool({ subject: code, corpusOnly: true }).length;
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
    ? `<div class="notice" style="margin-top:10px"><strong>Question pack loaded:</strong> ${packTotal.toLocaleString()} additional questions available in mixed papers. Subject papers use corpus questions only.</div>`
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
 * Main render
 * ------------------------------------------------------------------ */
export function renderExamTab(tab) {
  examTab = tab || 'papers';
  setActiveNav('exam');
  $$('examTabs').innerHTML = [['papers', 'Exam papers'], ['mistakes', 'My mistakes'], ['due', 'Due'], ['mastery', 'Mastery']]
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
  } else if (examTab === 'due') {
    const due = STUDY_ITEMS.filter((i) => itemAttempted(i.id) && itemDue(i.id));
    const copy = due.length + ' item' + (due.length === 1 ? ' is' : 's are') + ' due. Delayed recall only scores on the first attempt after a gap of a day or more.';
    rows = due.map((i) => reviewRow(i.title, getSubject(i.subject).title, 'due', 'var(--teal)')).join('')
      || '<div class="empty">Nothing due right now.</div>';
    if (due.length) { cta = 'Start due session \u2192'; ctaMode = { mode: 'weakest', limit: due.length }; }
    body.innerHTML = `<p class="small">${esc(copy)}</p><div class="reviewrows">${rows}</div>`
      + (cta ? `<button class="primary" id="examCtaBtn" style="margin-top:14px">${esc(cta)}</button>` : '');
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
