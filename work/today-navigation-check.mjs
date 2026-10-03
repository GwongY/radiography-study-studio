/* The requested hidden destination stays reachable through real search actions. */
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
const read = (p) => readFile(new URL(`../${p}`, import.meta.url), 'utf8');
const html = await read('outputs/radiography-study-studio.html');
assert.equal(html.includes('id="sessionTiles"'), false);
assert.equal(html.includes('Start a session'), false);
assert.equal(html.includes('id="weeklyBriefingCard"'), false);
assert.equal(html.includes('id="mailUpdatesCard"'), false);
const home = await read('outputs/study/home.js');
assert.equal(home.includes("$$('sessionTiles')"), false);
const nav = await read('outputs/study/navigation-five-destinations.js');
const nodes = { navRail: { insertAdjacentHTML: (_, value) => { nodes.rail = value; } }, bottomTab: {} };
const setup = nav.slice(nav.indexOf('const NAV_DESTS'), nav.indexOf('const NAV_TITLES'));
const render = nav.slice(nav.indexOf('export function renderNavButtons'), nav.indexOf('/* The session'));
const scope = { $$: (id) => nodes[id], esc: (s) => s, renderToday() {}, renderLearn() {}, openViewer() {}, renderCourse() {}, renderExamTab() {}, renderMore() {}, examTab: '', document: { querySelectorAll: () => [] } };
runInNewContext(setup + render.replace('export function', 'function') + '\nrenderNavButtons();', scope);
assert.equal((nodes.bottomTab.innerHTML.match(/data-nav=/g) || []).length, 5);
assert.equal(nodes.bottomTab.innerHTML.includes('data-nav="more"'), false);
assert.equal(nodes.rail.includes('data-nav="more"'), false);
const search = await read('outputs/study/global-search-one.js');
const searchFunction = search.slice(search.indexOf('export function searchHits'), search.indexOf('export function runSearch'));
let destination;
const searchScope = { closeSearchSheet() {}, dismissSessionForNav() {}, goTo: (id) => { destination = id; } };
runInNewContext(searchFunction.replace('export function', 'function'), searchScope);
for (const q of ['more', 'settings', 'about', 'MORE/SETTINGS/ABOUT']) {
  const hits = searchScope.searchHits(q); assert.equal(hits.length, 1); hits[0].go(); assert.equal(destination, 'more');
}
console.log('PASS: Today chooser removed, five visible destinations, More reachable by all search aliases.');
