/*
 * Source dialog
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, MEMORY_METHODS, describeSource, esc, priorSources } from './imports.js';
import { armReset, exportProgress } from './reset.js';
import { openDialog } from './dialog-behaviour-applied.js';
import { read } from './storage-versioned-keys.js';
import { toast } from './small-ui-helpers.js';

/* ------------------------------------------------------------------ *
 * Source dialog
 * ------------------------------------------------------------------ */

function sourceTableHTML(refs, heading) {
  const rows = refs.map((r) => {
    const d = describeSource(r);
    return `<tr>
      <td class="k"><strong>${esc(d.file)}</strong>${d.note ? `<div style="color:var(--muted);font-size:calc(11.5px*var(--ts));margin-top:3px">${esc(d.note)}</div>` : ''}</td>
      <td>${esc(d.subject)}</td>
      <td>${esc(d.folder)}</td>
      <td>${esc(d.location || '—')}</td>
      <td>${d.authored ? '<span class="pill">App-authored aid</span>' : `<span class="pill ${d.kind === 'student' ? 'limited' : 'full'}">${esc(d.kind === 'student' ? 'Student work' : d.kind === 'assessment' ? 'Assessment' : d.kind === 'admin' ? 'Admin' : 'Source-derived')}</span>`}</td>
    </tr>`;
  }).join('');
  return `${heading ? `<div class="subhead">${esc(heading)}</div>` : ''}<table class="srctable"><thead><tr><th>File</th><th>Subject</th><th>Folder</th><th>Page / section</th><th>Type</th></tr></thead><tbody>${rows}</tbody></table>`;
}

export function openSourceDialog(item, question) {
  $$('sourceTitle').textContent = item.title;
  const memoryKeys = Object.keys(item.memory || {}).filter((k) => item.memory[k]);
  $$('sourceBody').innerHTML = `
    <p class="task-copy" style="margin-top:0">Every factual claim on this item traces to a file below. Memory aids are written by this app and are marked separately.</p>
    ${question && question.src ? sourceTableHTML([question.src], 'Source for the answer you just saw') : ''}
    ${sourceTableHTML(item.sourceRefs, question && question.src ? 'Sources for the whole item' : '')}
    ${priorSources(item).length ? sourceTableHTML(priorSources(item), 'Slides behind the "beyond DSE Biology" lines') : ''}
    ${memoryKeys.length ? `<div class="subhead">App-authored memory aids on this item</div>
      <div class="notice">These are study devices, not source claims. ${memoryKeys.map((k) => esc(MEMORY_METHODS[k] || k)).join(', ')}.</div>` : ''}
    <div class="subhead">How to read the type column</div>
    <ul class="facts">
      <li><strong>Source-derived</strong> — teaching material issued by the subject: lecture handouts, study manuals, slide decks.</li>
      <li><strong>Assessment</strong> — past papers, revision exercises, model answers and question banks.</li>
      <li><strong>Student work</strong> — coursework produced by students. Used only to confirm topic scope, never as a fact source.</li>
      <li><strong>App-authored aid</strong> — written by this app to help you remember. Not a claim from your sources.</li>
    </ul>`;
  openDialog($$('sourceDialog'));
}


/* Runs after every part has evaluated — see the entry point. */
export function init() {
  $$('closeTerm').onclick = () => $$('termDialog').close();
  $$('closeReset').onclick = () => $$('resetDialog').close();
  $$('resetGo').onclick = armReset;
  $$('resetExportFirst').onclick = () => { exportProgress(); toast('Backup exported. The erase button is still there when you are ready.'); };
}
