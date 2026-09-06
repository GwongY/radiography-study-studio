/*
 * More -- sources, coverage, and the things demoted out of the topbar.
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, SOURCE_FILES, STUDY_ITEMS, SUBJECTS, allQuestions, esc, itemsForSubject, validateApplications, validateCorpus } from './imports.js';
import { setActiveNav } from './navigation-five-destinations.js';
import { openCoverage } from './coverage-report.js';
import { openDialog } from './dialog-behaviour-applied.js';
import { openResetDialog, openTransferDialog } from './reset.js';
import { isConnected, openSyncDialog, syncConfig } from './gist-sync.js';
import { showView } from './small-ui-helpers.js';
import { exportCalendar } from './assessments-and-marks.js';
import { recoverByHand, stripMode, toggleStripFill, viewportNote, viewportReport } from './viewport-recovery.js';
import { isPackConnected, loadedPack, openPackDialog, packCounts } from './question-pack.js';

/* ------------------------------------------------------------------ *
 * More -- sources, coverage, and the things demoted out of the topbar.
 * ------------------------------------------------------------------ */

/* The badge is the state, in one word. "shrunk" is the one worth noticing, so
   it is the only one that is not simply reassuring. */
function viewportBadge() {
  return { shrunk: 'short', keyboard: 'keyboard', browser: 'browser tab', ok: 'full height' }[viewportReport().state] || 'unknown';
}

/* A settings row should say what the state IS, not what the feature is for. */
function syncBadge() {
  const c = syncConfig();
  if (!isConnected()) return 'off';
  if (c.lastError) return 'failing';
  if (!c.lastPushAt) return 'connected';
  const days = Math.floor((Date.now() - c.lastPushAt) / 86400000);
  return days < 1 ? 'synced today' : `${days}d ago`;
}

export function renderMore() {
  window.__rssRenderMore = renderMore;
  setActiveNav('more');
  /* validateCorpus/validateApplications each return an ARRAY of failures. */
  const failures = validateCorpus().length + validateApplications().length;
  const hidden = SUBJECTS.filter((x) => !itemsForSubject(x.id).length);
  const rows = [
    { title: 'Sources & coverage report', badge: failures + ' failures', color: failures ? 'var(--red)' : 'var(--green)',
      note: STUDY_ITEMS.length + ' items, ' + allQuestions().length + ' questions, ' + Object.keys(SOURCE_FILES).length
        + ' files cited. Conflicts and duplicates listed in full.', open: () => openCoverage(null) },
    { title: 'Subjects with no material', badge: hidden.length + ' hidden', color: 'var(--muted)',
      note: hidden.map((x) => x.code).join(' and ') + ' have no verified sources, so they are hidden from Learn rather than shown as empty shelves.' },
    { title: 'Sources & model attribution', badge: 'CC BY-SA', color: 'var(--muted)',
      note: 'BodyParts3D / Anatomography model licensing and the candidate sources that were reviewed.',
      open: () => openDialog($$('aboutDialog')) },
    { title: 'Offline & storage', badge: 'PWA', color: 'var(--muted)',
      note: 'Shell cached at install. Each 3D model caches the first time you open it, so the footprint grows to match what you study.' },
    { title: 'Timetable to your calendar', badge: 'ICS', color: 'var(--teal)',
      note: 'Writes every dated class, lab and deadline as a standard .ics file. Open it and your phone or laptop calendar offers to add them — after which the reminders are the calendar\'s job, not this app\'s.',
      open: () => exportCalendar() },
    { title: 'Screen fit on this device', badge: viewportBadge(), color: viewportReport().state === 'shrunk' ? 'var(--orange)' : 'var(--muted)',
      note: viewportNote() + ' Tap to ask the browser to reconfigure the viewport.',
      open: () => { recoverByHand(); renderMore(); } },
    /* Only offered where there is a measured strip to fill, or where it has
       been switched off by hand. A toggle that does nothing on every device it
       appears on is a toggle nobody trusts. */
    ...(viewportReport().floating || stripMode() === 'off' ? [{
      title: 'Fill the bottom strip', badge: stripMode() === 'off' ? 'off' : 'on',
      color: stripMode() === 'off' ? 'var(--muted)' : 'var(--teal)',
      note: stripMode() === 'off'
        ? 'Off. The app stops at the bottom of the viewport, leaving the strip below it empty.'
        : 'On where the page is measured short of the screen — it extends the app into the strip so the tab bar reaches the edge. What is left after that is the screen\'s own rounded corner, which no page can fill.',
      open: () => { toggleStripFill(); renderMore(); },
    }] : []),
    { title: 'Scheduling rules', badge: 'SM-2+', color: 'var(--muted)',
      note: 'SM-2 shaped, then modified by response time and repeat mistakes.' },
    { title: 'Question pack', badge: loadedPack() ? `${packCounts().total} loaded` : (isPackConnected() ? 'connected' : 'off'),
      color: loadedPack() ? 'var(--teal)' : 'var(--muted)',
      note: loadedPack()
        ? `Holding ${packCounts().total} questions (${packCounts().mcq} MCQs in Exam Mode) from "${loadedPack().packId}". Stored in IndexedDB on this device.`
        : 'Load a private question bank JSON file or sync from a private repository to expand the exam pool with thousands of chapter questions.',
      open: () => openPackDialog() },
    { title: 'Back up to a private GitHub gist', badge: syncBadge(), color: isConnected() ? 'var(--green)' : 'var(--muted)',
      note: 'An off-device copy that happens on its own — the only thing here that survives losing this device, reinstalling the app, or the browser clearing its storage. Needs a GitHub token scoped to gists and nothing else.',
      open: () => openSyncDialog() },
    { title: 'Move progress to another device', badge: 'JSON', color: 'var(--teal)',
      note: 'Mastery lives in this browser only, so the desktop and the iPad keep separate schedules. Export a file here and import it on the other device.',
      open: () => openTransferDialog() },
    { title: 'Reset progress on this device', badge: 'erase', color: 'var(--red)',
      note: 'Delete every mastery record, mistake and schedule stored in this browser. There is no server and no undo, so export a backup first if you might want it.',
      open: () => openResetDialog() },
  ];
  $$('moreRows').innerHTML = rows.map((r, i) => `
    <button class="card" data-row="${i}" style="text-align:left;cursor:${r.open ? 'pointer' : 'default'};width:100%">
      <div style="display:flex;gap:12px;align-items:baseline"><span style="font-weight:700;flex:1">${esc(r.title)}</span><span class="mono" style="color:${r.color}">${esc(r.badge)}</span></div>
      <div class="small" style="margin-top:5px">${esc(r.note)}</div>
    </button>`).join('');
  rows.forEach((r, i) => {
    if (!r.open) return;
    const el = $$('moreRows').querySelector('[data-row="' + i + '"]');
    if (el) el.onclick = r.open;
  });
  showView('moreView');
}
