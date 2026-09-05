/*
 * Coverage report
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, COVERAGE, SOURCE_FILES, STUDY_ITEMS, STUDY_SUBJECTS, WEEK_GAPS, WEEK_STUDY, allQuestions, describeSource, esc, getSubject, itemsForSubject, sourceGroupsForWeek, sourceMetaFor, validateApplications, validateCorpus } from './imports.js';
import { coveragePill } from './small-ui-helpers.js';
import { openDialog } from './dialog-behaviour-applied.js';

/* ------------------------------------------------------------------ *
 * Coverage report
 * ------------------------------------------------------------------ */

function sourceMapHTML(focusSubject) {
  const sourceKinds = [
    { label: 'New sources — primary', roles: ['current-primary'] },
    { label: 'Old sources — supporting/fallback', roles: ['older-supporting', 'older-fallback'] },
    { label: 'Assessment/practice context', roles: ['assessment'] },
    { label: 'Source gap or review state', roles: ['administration', 'student-work', 'needs-review'] },
  ];
  const subjectIds = STUDY_SUBJECTS
    .filter((id) => !focusSubject || id === focusSubject);
  const showLEI = !focusSubject || focusSubject === 'LEI1101';
  if (!subjectIds.length && !showLEI) return '';

  const sourceLine = (source, lesson) => {
    const mapMeta = sourceMetaFor(source.ref, lesson.id) || source;
    const item = STUDY_ITEMS.find((candidate) => candidate.id === lesson.id);
    const itemSources = (item?.sourceRefs || []).filter((entry) => entry.ref === mapMeta.ref);
    const descriptions = (itemSources.length ? itemSources : [mapMeta]).map(describeSource);
    const described = descriptions[0];
    const locations = [...new Set(descriptions.map((entry) => entry.location).filter(Boolean))];
    return `<li><strong style="color:var(--text)">${esc(described.file || mapMeta.ref)}</strong>${locations.map((location) => `<br><span class="small">${esc(location)}</span>`).join('')}</li>`;
  };
  const lessonHTML = (lesson) => {
    const sourceLists = sourceKinds.slice(0, 3).map((kind) => {
      const sources = lesson.sources.filter((source) => kind.roles.includes(source.role));
      return sources.length ? `<div class="subhead" style="margin:8px 0 2px">${kind.label}</div><ul>${sources.map((source) => sourceLine(source, lesson)).join('')}</ul>` : '';
    }).join('');
    const gapSources = lesson.sources.filter((source) => sourceKinds[3].roles.includes(source.role));
    const reasons = lesson.reasons || [];
    const hasGapState = lesson.status !== 'complete' || reasons.length > 0 || gapSources.length > 0;
    const gapHTML = hasGapState
      ? `<div class="subhead" style="margin:8px 0 2px">${sourceKinds[3].label}</div><p class="small" style="margin:6px 0 0">Status: ${esc(lesson.status || 'needs-review')}${reasons.length ? ` — ${reasons.map(esc).join(' ')}` : ''}</p>${gapSources.length ? `<ul>${gapSources.map((source) => sourceLine(source, lesson)).join('')}</ul>` : ''}`
      : '';
    return `<li><strong style="color:var(--text)">${esc(lesson.title)}</strong> <span class="tag">${esc(lesson.status)}</span>${sourceLists}${gapHTML}</li>`;
  };
  const weekHTML = (subjectId, week) => {
    const lessons = sourceGroupsForWeek(subjectId, week);
    const gap = WEEK_GAPS[subjectId]?.[week] || '';
    const body = lessons.length
      ? `<ul>${lessons.map(lessonHTML).join('')}</ul>`
      : `<p class="small" style="margin:6px 0 0"><strong>Source gap · missing</strong>${gap ? ` — ${esc(gap)}` : ' — No source-backed lesson is assigned.'}</p>`;
    return `<div style="margin:8px 0"><strong>Week ${week}</strong>${body}</div>`;
  };
  return `<div class="cov-sec">
    <h4>Y1S1 source map</h4>
    <p class="small">New and old files are grouped under the same Y1S1 lesson. The original source file remains the teaching note; this view only identifies which version to use. Files without a current Y1S1 syllabus placement remain retained for future work and are not assigned to another year here.</p>
    ${subjectIds.map((subjectId) => {
      const subject = getSubject(subjectId);
      const weeks = Object.keys(WEEK_STUDY[subjectId] || {}).map(Number).sort((a, b) => a - b);
      return `<div class="subhead" style="margin:12px 0 2px">${esc(subject ? `${subject.code} — ${subject.title}` : subjectId)}</div>
        ${weeks.map((week) => weekHTML(subjectId, week)).join('')}`;
    }).join('')}
    ${showLEI ? `<div class="subhead" style="margin:12px 0 2px">LEI1101 — AI as a Tool for Language Learning</div>
      <p class="small" style="margin:6px 0 0"><strong>Schedule only · no teaching source</strong> — The timetable slot remains visible, but no verified LEI1101 syllabus or teaching file has been supplied.</p>` : ''}
  </div>`;
}

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

    ${sourceMapHTML(focusSubject)}

    ${focusSubject ? '' : `
    <div class="cov-sec">
      <h4>New source — filename-first intake (${COVERAGE.newSourceIntake.length} files)</h4>
      <p class="small">Every upload was sorted by its literal filename before reading. “Administration” and “Timetable” files can change the Course tab but do not become factual study lessons.</p>
      <ul>${COVERAGE.newSourceIntake.map((f) => `<li><strong style="color:var(--text)">${esc(f.file)}</strong><br>${esc(f.role)} — ${esc(f.used)}</li>`).join('')}</ul>
    </div>
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
