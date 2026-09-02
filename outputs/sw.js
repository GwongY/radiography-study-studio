/*
 * Radiography Study Studio — service worker
 *
 * Caching strategy, and why it is split:
 *
 *   SHELL (precached on install) — the HTML, the four data modules (study,
 *   anatomy, visual registry and schematics), the manifest and the icons.
 *   Still well under a megabyte, so installing is fast and the whole study
 *   system — including every lesson schematic — works offline immediately
 *   after the first visit.
 *
 *   MODELS (cached on first use) — the six .glb files total ~37 MB.
 *   Precaching those would make installation slow and would download
 *   neuroanatomy for someone who only ever studies bones. Instead each
 *   model is cached the first time it is actually opened, so the app grows
 *   its offline footprint to match what you study.
 *
 *   CDN (cached on first use) — three.js and its loaders. jsDelivr sends
 *   CORS headers, so these are ordinary cacheable responses rather than
 *   opaque ones, and they become available offline after the 3D studio has
 *   been opened once.
 *
 * Bump CACHE_VERSION on any shell change; old caches are pruned on activate.
 * MODEL_VERSION and CDN_VERSION are deliberately separate, so a shell edit does
 * not throw away the anatomy someone has already downloaded — see below.
 */

/*
 * Cache versions only ever increase — a version that goes BACKWARDS leaves
 * whatever a browser already stored under the newer name in play. v59 shipped a
 * split that was reverted, so the revert went to v60 rather than back to v53.
 */
const CACHE_VERSION = 'v73';
const SHELL_CACHE = `rss-shell-${CACHE_VERSION}`;

/*
 * The models and the CDN get their OWN versions, and they do not move when the
 * shell does.
 *
 * They used to be keyed to CACHE_VERSION, and `activate` deletes every rss-*
 * cache not in ALL_CACHES — so every single shell edit threw away up to 37 MB of
 * downloaded anatomy and all of three.js. Eight shell bumps in one day meant
 * eight full re-downloads, which on a slow or metered connection is
 * indistinguishable from "the layers will not load".
 *
 * Neither needs the shell's version. A .glb is addressed by its filename and its
 * contents never change in place; the CDN URLs pin three.js to 0.161.0. Bump
 * MODEL_VERSION only when a .glb file is actually replaced.
 */
const MODEL_VERSION = 'm1';
const CDN_VERSION = 'c1';
const MODEL_CACHE = `rss-models-${MODEL_VERSION}`;
const CDN_CACHE = `rss-cdn-${CDN_VERSION}`;
const ALL_CACHES = [SHELL_CACHE, MODEL_CACHE, CDN_CACHE];

const SHELL = [
  './',
  './index.html',
  './radiography-study-studio.html',
  /* The app itself. Lifted out of the HTML in phase 2 — same code, three files.
     The queries MUST match the <link> and <script src> in the HTML exactly;
     work/shell-check.mjs enforces that. */
  './app.css?v=1',
  './studio.js?v=1',
  './study.js?v=1',
  /*
   * studio.js is an entry point that imports these in order. They are listed in
   * that order, not alphabetically, so the shell reads like the module graph.
   */
  './studio/imports.js',
  './studio/hide-and-search.js',
  './studio/search-viewer-frame.js',
  './studio/spatial-concept-overlays.js',
  './studio/cavity-geometry-derived.js',
  './studio/visualisation-modes.js',
  './studio/region-boxes-how.js',
  './studio/depth-picking.js',
  './studio/live-physiology.js',
  /*
   * study.js is an entry point that imports these and then calls their init()s.
   * Every one has to be in the shell or the study system is blank offline.
   */
  './study/imports.js',
  './study/state.js',
  './study/storage-versioned-keys.js',
  './study/moving-progress-between.js',
  './study/reset.js',
  './study/small-ui-helpers.js',
  './study/home.js',
  './study/navigation-five-destinations.js',
  './study/review-mistakes-due.js',
  './study/more-sources-coverage.js',
  './study/global-search-one.js',
  './study/search-viewer-open.js',
  './study/hidden-tray.js',
  './study/spatial-overlay-controls.js',
  './study/subject.js',
  './study/what-is-under.js',
  './study/session-engine.js',
  './study/lesson-visuals.js',
  './study/reading-help.js',
  './study/layout-figures.js',
  './study/source-dialog.js',
  './study/coverage-report.js',
  './study/mastery-dashboard.js',
  './study/course-timetable.js',
  './study/boot.js',
  './study/dialog-behaviour-applied.js',
  './study-data.js',
  /*
   * study-data.js is a barrel; these are what it re-exports. The app never
   * imports them directly, but the browser fetches every one of them, so all
   * seventeen have to be in the shell or the study system is empty offline.
   * work/shell-check.mjs walks the import graph and will name any that is
   * missing.
   */
  './study/corpus/schema.js',
  './study/corpus/hss-terminology.js',
  './study/corpus/hss-osteology.js',
  './study/corpus/hss-joints.js',
  './study/corpus/modules.js',
  './study/corpus/hss-modules.js',
  './study/corpus/physiology-items.js',
  './study/corpus/hti-items.js',
  './study/corpus/dsai-items.js',
  './study/corpus/notices.js',
  './study/corpus/structures.js',
  './study/corpus/expansion-items.js',
  './study/corpus/derived-items.js',
  './study/corpus/corpus.js',
  './study/corpus/validate.js',
  './study/corpus/diagrams.js',
  './study/corpus/coverage.js',
  './study/corpus/mastery.js',
  './anatomy-data.js?v=5',
  /*
   * The same two files again, unversioned — NOT a duplicate. A cache key is the
   * whole URL, query included, and two modules import these without the query:
   * study-data.js imports './anatomy-data.js' and cavity-build.js imports
   * './cavity-geom.js'. Precaching only the ?v= form left both 404ing offline —
   * the bone records and the entire overlay engine. Found by the transitive
   * import walk in work/shell-check.mjs; the old one-level scrape could not see
   * a second-level import at all.
   */
  './anatomy-data.js',
  './cavity-geom.js',
  './visual-data.js?v=4',
  './schematics.js?v=2',
  './wordparts.js?v=3',
  './term-notes.js?v=4',
  './term-gloss.js?v=3',
  './physiology.js?v=4',
  './schedule.js?v=1',
  './bodymap.js?v=4',
  /* the search index: every named mesh in every layer, plus the synonym table
     that maps "collarbone" and "voice box" onto what the model calls them */
  './mesh-index.js?v=5',
  './synonyms.js?v=3',
  /* the cavity engine: resolver, maths, builders. Small, and the overlays are
     part of the study system, so they belong in the offline shell. */
  './landmarks.js?v=2',
  './cavity-geom.js?v=2',
  './cavity-build.js?v=2',
  './figures.js?v=2',
  './layouts.js?v=1',
  './manifest.webmanifest',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/icon-maskable-512.png',
  './assets/icons/apple-touch-icon.png',
  /* Public-domain plates. Small, and the app is offline-first, so they belong in
     the shell rather than being something a lesson has to go and fetch. */
  './assets/plates/nephron-tubule.png',
  './assets/plates/bronchi-bronchioles.png',
  './assets/plates/pancreas-duodenum.png',
  './assets/plates/aortic-valve-cusps.png',
  './assets/plates/heart-and-lungs.png',
  /*
   * Replacement figures. The small ones ship in the shell; the larger ones
   * (body-cavities.png, body-movements.jpg, muscle-tissue-types.jpg, synovial-joints.jpg)
   * are left out on purpose so a first install stays lean -- networkFirst caches
   * them into this same shell cache the first time a lesson shows them, so they
   * end up available offline either way.
   */
  './assets/figures/anatomy-planes.svg',
  './assets/figures/blood-components.jpg',
  './assets/figures/cardiac-conduction.svg',
  './assets/figures/ecg-sinus-rhythm.svg',
  './assets/figures/em-spectrum.svg',
  './assets/figures/heart-diagram.svg',
  './assets/figures/heart-interior.svg',
  './assets/figures/long-bone.jpg',
  './assets/figures/nephron-blood-flow.jpg',
  './assets/figures/nervous-system-overview.jpg',
  './assets/figures/respiratory-system.svg',
  './assets/figures/respiratory-zone.jpg',
  './assets/figures/synovial-joint-types.jpg',
  './assets/figures/vertebra-parts.jpg',
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL_CACHE);
    /*
     * addAll is atomic — one 404 fails the whole install. Add individually so
     * a single missing file degrades rather than bricking the worker.
     */
    await Promise.all(SHELL.map(async (url) => {
      try { await cache.add(new Request(url, { cache: 'reload' })); }
      catch (e) { console.warn('[sw] could not precache', url, e); }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith('rss-') && !ALL_CACHES.includes(k))
      .map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

function isModel(url) { return url.pathname.endsWith('.glb'); }
/*
 * The IA redesign loads Instrument Sans and Newsreader from Google Fonts.
 * Without caching them the app is not genuinely offline-first: the font FILES
 * are max-age=1y, but the stylesheet declaring the @font-face rules is only
 * max-age=1d, so studying offline more than a day after the last online visit
 * loses both typefaces. Both hosts send CORS headers, so the responses are
 * non-opaque and cacheFirst works on them unchanged.
 */
function isCdn(url) {
  return url.hostname === 'cdn.jsdelivr.net'
      || url.hostname === 'fonts.googleapis.com'
      || url.hostname === 'fonts.gstatic.com';
}

/* Cache-first: for immutable assets where freshness does not matter. */
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  if (hit) return hit;
  const response = await fetch(request);
  if (response && response.ok) cache.put(request, response.clone());
  return response;
}

/*
 * Network-first for the shell, so edits show up without a hard reload during
 * development, with the cache as the offline fallback.
 */
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response && response.ok) cache.put(request, response.clone());
    return response;
  } catch (e) {
    const hit = await cache.match(request);
    if (hit) return hit;
    /* A navigation with nothing cached still needs to render something. */
    if (request.mode === 'navigate') {
      const shell = await cache.match('./radiography-study-studio.html');
      if (shell) return shell;
    }
    throw e;
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  if (isCdn(url)) { event.respondWith(cacheFirst(request, CDN_CACHE)); return; }
  if (url.origin !== self.location.origin) return;  /* leave other origins alone */
  if (isModel(url)) { event.respondWith(cacheFirst(request, MODEL_CACHE)); return; }
  event.respondWith(networkFirst(request, SHELL_CACHE));
});

/* Lets the page report how much of the 3D set is already available offline. */
self.addEventListener('message', (event) => {
  if (event.data !== 'rss-cache-status') return;
  event.waitUntil((async () => {
    const cache = await caches.open(MODEL_CACHE);
    const keys = await cache.keys();
    const models = keys.map((r) => new URL(r.url).pathname.split('/').pop());
    event.source?.postMessage({ type: 'rss-cache-status', models });
  })());
});
