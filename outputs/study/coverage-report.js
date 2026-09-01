/*
 * Coverage report
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, COVERAGE, SOURCE_FILES, STUDY_ITEMS, allQuestions, esc, getSubject, itemsForSubject, validateApplications, validateCorpus } from './imports.js';
import { coveragePill } from './small-ui-helpers.js';
import { openDialog } from './dialog-behaviour-applied.js';

/* ------------------------------------------------------------------ *
 * Coverage report
 * ------------------------------------------------------------------ */

export function openCoverage(focusSubject) {
  const failures = validateCorpus().concat(validateApplications());
  const qCount = allQuestions().length;
  const subjects = focusSubject ? COVERAGE.subjects.filter((s) => s.id === focusSubject) : COVERAGE.subjects;
  $$('coverageBody').innerHTML = `
    <p class="task-copy" style="margin-top:0">${esc(COVERAGE.generated)}</p>
    <div class="statrow" style="margin:12px 0 16px">
      <div class="s"><b>${STUDY_ITEMS.length}</b><small>Study items</small></div>
      <div class="s"><b>${qCount}</b><small>Questions</small></div>
      <div class="s"><b>${Object.keys(SOURCE_FILES).length}</b><small>Source files cited</small></div>
      <div class="s"><b>${failures.length}</b><small>Validation failures</small></div>
    </div>
    ${failures.length
      ? `<div class="notice stop"><strong>${failures.length} question${failures.length === 1 ? '' : 's'} failed validation</strong>${failures.slice(0, 12).map((f) => esc(`${f.qid || f.itemId}: ${f.problems.join('; ')}`)).join('<br>')}</div>`
      : '<div class="notice"><strong>Every question validates</strong>All ' + qCount + ' questions have a resolvable correct answer and an explanation, every item has a teaching explanation, and every item carries at least one source reference.</div>'}

    ${subjects.map((s) => {
      const subject = getSubject(s.id);
      const n = itemsForSubject(s.id).length;
      return `<div class="cov-sec">
        <h4>${esc(subject ? subject.code + ' — ' + subject.title : s.id)} ${coveragePill(s.status)} <span class="tag">${n} item${n === 1 ? '' : 's'}</span> <span class="tag">${s.files} source file${s.files === 1 ? '' : 's'}</span></h4>
        ${s.covered.length ? `<div class="subhead" style="margin:8px 0 2px">Covered</div><ul class="good">${s.covered.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>` : ''}
        ${s.gaps.length ? `<div class="subhead" style="margin:10px 0 2px">Missing or limited</div><ul>${s.gaps.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>` : ''}
      </div>`;
    }).join('')}

    ${focusSubject ? '' : `
    <div class="cov-sec">
      <h4>Duplicate materials</h4>
      <ul>${COVERAGE.duplicates.map((d) => `<li><strong style="color:var(--text)">${esc(d.what)}</strong><br>${d.where.map((w) => esc(w)).join('<br>')}</li>`).join('')}</ul>
    </div>
    <div class="cov-sec">
      <h4>Source conflicts and how each was handled</h4>
      <ul>${COVERAGE.conflicts.map((c) => `<li><strong style="color:var(--text)">${esc(c.what)}</strong><br>${esc(c.detail)}<br><em style="color:var(--teal)">${esc(c.handled)}</em></li>`).join('')}</ul>
    </div>
    <div class="cov-sec">
      <h4>Notes</h4>
      <ul>${COVERAGE.notes.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>
    </div>`}`;
  openDialog($$('coverageDialog'));
}
