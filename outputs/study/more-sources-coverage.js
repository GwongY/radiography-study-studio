/*
 * More -- sources, coverage, and the things demoted out of the topbar.
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, esc } from './imports.js';
import { setActiveNav } from './navigation-destinations.js';
import { openDialog } from './dialog-behaviour-applied.js';
import { showView } from './small-ui-helpers.js';
import { exportCalendar } from './assessments-and-marks.js';
import { recoverByHand, stripMode, toggleStripFill, viewportNote, viewportReport } from './viewport-recovery.js';
import { isBriefingConnected, openBriefingAccessDialog } from './briefing-access.js';

/* ------------------------------------------------------------------ *
 * More -- sources, coverage, and the things demoted out of the topbar.
 * ------------------------------------------------------------------ */

/* The badge is the state, in one word. "shrunk" is the one worth noticing, so
   it is the only one that is not simply reassuring. */
function viewportBadge() {
  return { shrunk: 'short', keyboard: 'keyboard', browser: 'browser tab', ok: 'full height' }[viewportReport().state] || 'unknown';
}

/* A settings row should say what the state IS, not what the feature is for. */
export function renderMore() {
  window.__rssRenderMore = renderMore;
  setActiveNav('more');
  const rows = [
    /*
     * Three rows were removed here, and they had one thing in common: no
     * `open`. "Subjects with no material", "Offline & storage" and
     * "Scheduling rules" were paragraphs formatted as buttons -- they
     * explained a design decision, could not be acted on, and were read once.
     * Everything left either opens something or reports a live state.
     *
     * This row is NOT one of them and must stay: BodyParts3D is CC BY-SA and
     * the attribution is a licence condition, not a courtesy.
     */
    { title: 'Sources & model attribution', badge: 'CC BY-SA', color: 'var(--muted)',
      note: 'BodyParts3D / Anatomography model licensing and the candidate sources that were reviewed.',
      open: () => openDialog($$('aboutDialog')) },
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
    { title: 'University notice access', badge: isBriefingConnected() ? 'connected' : 'off',
      color: isBriefingConnected() ? 'var(--teal)' : 'var(--muted)',
      note: 'Connect a read-only GitHub token to read the private weekly university notice summary on Today.',
      open: () => openBriefingAccessDialog() },
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
