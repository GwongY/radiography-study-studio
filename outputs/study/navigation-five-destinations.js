/*
 * Navigation -- five destinations, rendered into both the icon rail and
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, esc, ui } from './imports.js';
import { openViewer } from './what-is-under.js';
import { releaseLessonVisual } from './lesson-visuals.js';
import { renderLearn } from './subject.js';
import { renderMore, renderToday } from './spatial-overlay-controls.js';
import { renderReviewTab, reviewTab } from './review-mistakes-due.js';
import { renderCourse } from './course-timetable.js';

/* ------------------------------------------------------------------ *
 * Navigation -- five destinations, rendered into both the icon rail and
 * the phone tab bar from one definition.
 * ------------------------------------------------------------------ */

const NAV_DESTS = [
  ['today', 'Today', '\u25d4', () => renderToday()],
  ['learn', 'Learn', '\u25a6', () => renderLearn()],
  ['viewer', 'Viewer', '\u25c9', () => openViewer()],
  ['course', 'Course', '\u25f3', () => renderCourse()],
  ['review', 'Review', '\u21bb', () => renderReviewTab(reviewTab)],
  ['more', 'More', '\u22ef', () => renderMore()],
];
const NAV_TITLES = { today: 'Today', learn: 'One learning tree', viewer: 'Viewer', course: 'Course', review: 'Review', more: 'More' };
const NAV_KICKERS = {
  today: 'What to do now',
  learn: 'Anatomy \u00b7 physiology \u00b7 radiation science \u00b7 AI',
  viewer: 'Model and images in one place',
  course: 'Timetable, syllabus, attendance',
  review: 'Mistakes, due items, mastery',
  more: 'Sources, coverage, settings',
};
let currentTab = 'today';

export function setActiveNav(id) {
  currentTab = id;
  $$('navTitle').textContent = NAV_TITLES[id] || 'Study Studio';
  if (id !== 'learn') $$('navBackBtn').classList.add('hidden');
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
  ui.learnDrill = false;
  const dest = NAV_DESTS.find((d) => d[0] === id);
  if (dest) dest[3]();
}
export function renderNavButtons() {
  const html = NAV_DESTS.map(([id, label, icon]) =>
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
/*
 * The destination alone was not enough to come back to.
 *
 * Closing a session called goTo(), and goTo() clears ui.learnDrill because
 * that is what pressing Learn in the tab bar should do. So leaving a lesson
 * you had opened from inside a topic put you back at the grid of topics, one
 * level above where you were, with the topic you were working through closed
 * -- and the item list you had picked from was the one thing you wanted back.
 * The drill-down is part of where you were, so it is saved and restored with
 * the tab, and the return path renders the destination WITHOUT going through
 * goTo's reset.
 */
let placeBeforeSession = null;
export function openSessionOverlay() {
  tabBeforeSession = currentTab || 'today';
  placeBeforeSession = { drill: ui.learnDrill, topic: ui.learnTopic, filter: ui.learnFilter };
  $$('sessionView').classList.remove('hidden');
  /* Without this the rail, tab bar and search button stay in the tab order
     behind the overlay. `inert` needs no focus-trap code. */
  const shell = document.querySelector('.app-shell');
  if (shell) shell.inert = true;
}
export function closeSessionOverlay() {
  releaseLessonVisual();
  $$('sessionView').classList.add('hidden');
  const shell = document.querySelector('.app-shell');
  if (shell) shell.inert = false;
  if (placeBeforeSession) {
    ui.learnDrill = placeBeforeSession.drill;
    ui.learnTopic = placeBeforeSession.topic;
    ui.learnFilter = placeBeforeSession.filter;
    placeBeforeSession = null;
  }
  const dest = NAV_DESTS.find((d) => d[0] === tabBeforeSession);
  if (dest) dest[3]();
}
