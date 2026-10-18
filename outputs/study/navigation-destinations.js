/*
 * Navigation -- four destinations, rendered into both the icon rail and
 * the phone tab bar from one definition.
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, esc, ui } from './imports.js';
import { openViewer, leaveProjection } from './what-is-under.js';
import { renderRevise } from './revise.js';
import { renderMore } from './more-sources-coverage.js';
import { renderToday } from './home.js';
import { renderCourse } from './course-timetable.js';

/* ------------------------------------------------------------------ *
 * Navigation -- four destinations, rendered into both the icon rail and
 * the phone tab bar from one definition.
 * ------------------------------------------------------------------ */

const NAV_DESTS = [
  ['today', 'Today', '\u25d4', () => renderToday()],
  ['revise', 'Revise', '\u25a6', () => renderRevise()],
  ['viewer', 'Viewer', '\u25c9', () => openViewer()],
  ['course', 'Course', '\u25f3', () => renderCourse()],
  ['more', 'More', '\u22ef', () => renderMore()],
];
const NAV_TITLES = { today: 'Today', revise: 'Revise', viewer: 'Viewer', course: 'Course', more: 'More' };
const NAV_KICKERS = {
  today: 'What to do now',
  revise: 'Link what you have learnt \u00b7 week by week',
  viewer: 'Model and images in one place',
  course: 'Timetable, syllabus, assessments',
  more: 'Sources, coverage, settings',
};
let currentTab = 'today';

export function setActiveNav(id) {
  /*
   * The one assignment that makes `currentTab` mean anything.
   *
   * It was declared, defaulted to 'today', and read by openSessionOverlay --
   * and never written. So `tabBeforeSession` was 'today' whatever destination
   * you were on, and quitting a session from any destination put you on Home
   * every time. The drill-down restore below it was already correct and was
   * being handed the wrong tab to restore INTO.
   */
  currentTab = id;
  /* pauseFullAtlas() stood beside leaveProjection() until the Full Atlas was
     removed; there is no second source to pause any more. */
  if (id !== 'viewer') {leaveProjection();}
  $$('navTitle').textContent = NAV_TITLES[id] || 'Study Studio';
  $$('navKicker').textContent = NAV_KICKERS[id] || '';
  /*
   * The viewer takes over the window: the page stops scrolling, the width cap
   * comes off, the header tightens and the 3D/Projection switch appears beside
   * the title. Everything else gets the ordinary reading layout back.
   */
  const viewer = id === 'viewer';
  $$('navContent').classList.toggle('bleed', viewer);
  document.querySelector('.navmain > .navhead').classList.toggle('compact', viewer);
  $$('viewerTabs').classList.toggle('hidden', !viewer);
  /* The canvas box changed size; tell the renderer before the next frame. */
  if (viewer && window.__osteo && window.__osteo.resize) requestAnimationFrame(() => window.__osteo.resize());
  document.querySelectorAll('.navrail [data-nav], .bottomtab [data-nav]').forEach((b) => {
    const on = b.dataset.nav === id;
    b.classList.toggle('active', on);
    /* .active is only a visual cue; aria-current is what gets announced. */
    b.setAttribute('aria-current', on ? 'page' : 'false');
  });
}
export function goTo(id) {
  if (id !== 'viewer' && viewerSession) {
    viewerSession = null;
    ui.session = null;
    $$('viewerSessionReturn').classList.add('hidden');
  }
  const dest = NAV_DESTS.find((d) => d[0] === id);
  if (dest) dest[3]();
}
export function renderNavButtons() {
  const html = NAV_DESTS.filter(([id]) => id !== 'more').map(([id, label, icon]) =>
    `<button data-nav="${esc(id)}"><span class="ic">${icon}</span><span>${esc(label)}</span></button>`).join('');
  $$('navRail').insertAdjacentHTML('beforeend', html);
  $$('bottomTab').innerHTML = html;
  document.querySelectorAll('.navrail [data-nav], .bottomtab [data-nav]').forEach((b) => {
    b.onclick = () => goTo(b.dataset.nav);
  });
}

/* The session is a full-screen overlay rather than a routed view, so it can
   cover the shell whatever destination is behind it. */
let tabBeforeSession = 'today';
export function openSessionOverlay() {
  viewerSession = null;
  $$('viewerSessionReturn').classList.add('hidden');
  tabBeforeSession = currentTab || 'today';
  $$('sessionView').classList.remove('hidden');
  /* Without this the rail, tab bar and search button stay in the tab order
     behind the overlay. `inert` needs no focus-trap code. */
  const shell = document.querySelector('.app-shell');
  if (shell) shell.inert = true;
}
let viewerSession = null;
export function suspendSessionForViewer() {
  const session = $$('sessionView');
  if (!ui.session || session.classList.contains('hidden')) return false;
  viewerSession = { session: ui.session, scroll: session.querySelector('.navcontent').scrollTop, at: performance.now() };
  session.classList.add('hidden');
  session.inert = false;
  document.querySelector('.app-shell').inert = false;
  const back = $$('viewerSessionReturn');
  back.classList.remove('hidden');
  back.onclick = () => {
    if (!viewerSession) return;
    leaveProjection();
    ui.session = viewerSession.session;
    if (ui.session.startedAt) ui.session.startedAt += performance.now() - viewerSession.at;
    session.classList.remove('hidden');
    document.querySelector('.app-shell').inert = true;
    session.querySelector('.navcontent').scrollTop = viewerSession.scroll;
    viewerSession = null;
    back.classList.add('hidden');
  };
  return true;
}

export function closeSessionOverlay() {
  $$('sessionView').classList.add('hidden');
  const shell = document.querySelector('.app-shell');
  if (shell) shell.inert = false;
  const dest = NAV_DESTS.find((d) => d[0] === tabBeforeSession);
  if (dest) dest[3]();
}
