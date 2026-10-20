/*
 * Radiography Study Studio — service worker
 *
 * Caching strategy, and why it is split:
 *
 *   SHELL (precached on install) — the HTML, app modules, revision data, heart
 *   atlas data, manifest and icons. It stays small enough for a fast first
 *   install, so the study system and heart atlas can open offline immediately.
 *
 *   MODELS (cached on first use) — the seven .glb files total ~21 MB, down
 *   from ~37 MB when they were quantized (KHR_mesh_quantization). That is the
 *   one thing MODEL_VERSION exists to express: m1 -> m2 replaces geometry a
 *   reader may already hold, and is the only reason to move it.
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
const CACHE_VERSION = 'v258';
const SHELL_CACHE = `rss-shell-${CACHE_VERSION}`;

/*
 * The models and the CDN get their OWN versions, and they do not move when the
 * shell does.
 *
 * They used to be keyed to CACHE_VERSION, and `activate` deletes every rss-*
 * cache not in ALL_CACHES — so every single shell edit threw away all ~21 MB of
 * downloaded anatomy and all of three.js. Eight shell bumps in one day meant
 * eight full re-downloads, which on a slow or metered connection is
 * indistinguishable from "the layers will not load".
 *
 * Neither needs the shell's version. A .glb is addressed by its filename and its
 * contents never change in place; the CDN URLs pin three.js to 0.161.0. Bump
 * MODEL_VERSION only when a .glb file is actually replaced.
 */
const MODEL_VERSION = 'm3';
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
  './studio/modes-and-bridge.js',
  './studio/scene.js',
  './studio/depth-picking.js',
  './studio/live-physiology.js',
  './studio/heart-atlas.js',
  './studio/limb-atlas.js',
  './studio/muscle-zoom.js',
  './studio/circulation-extras.js',
  './studio/tools-and-capture.js',
  /*
   * The heart atlas. studio/heart-atlas.js reaches heart/atlas.js by a dynamic
   * import() only, so none of these load until the mode is first opened -- but
   * they are precached all the same, because a mode that cannot open offline is
   * the failure this app exists to avoid. Each specifier is exactly the one its
   * importer writes (query and all); shell-check walks the dynamic literals.
   * The small atlas payload and source notice are also precached, so first use
   * works offline; the much larger circulatory GLB remains lazy.
   */
  './heart/atlas.js?v=7',
  /* Limb vessels: studio/limb-atlas.js reaches limb/limb.js by a dynamic import, like the heart atlas. The routes
     are small (~380 KB together) and cached whole so the mode opens offline; the circulatory GLB stays lazy. */
  './limb/limb.js?v=1',
  './limb/alignment.js?v=1',
  './limb/limb-flow.js?v=1',
  './limb/vessel-dots.js?v=1',
  './limb/leg-proc.js?v=11',
  './limb/limb-text.js?v=1',
  './limb/routes-upper.json?v=1',
  './limb/routes-lower.json?v=1',
  './heart/camera-follow.js?v=1',
  './heart/proc-hud.js?v=2',
  './heart/mmode-ui.js?v=1',
  './heart/mmode.js?v=9',
  './heart/scenarios.js?v=4',
  './heart/arrhythmia.js?v=10',
  './heart/heart-text.js?v=2',
  './heart/ivus-sim.js?v=7',
  './heart/ivus-image.js?v=6',
  './heart/panels.js?v=1',
  './heart/i18n.js?v=1',
  './heart/i18n-en.js?v=1',
  './heart/hemo-sim.js?v=3',
  './heart/hemo-panel.js?v=11',
  './heart/hemo-model.js?v=4',
  './heart/hemo-explain.js?v=2',
  './heart/pci-sim.js?v=17',
  './heart/lumen-fit.js?v=1',
  './heart/alignment.js?v=1',
  './heart/descriptions.js?v=2',
  './heart/conduction.js?v=3',
  './heart/heart-motion.js?v=26',
  './heart/heartbeat.js?v=11',
  './heart/echo-sim.js?v=21',
  './heart/cardiac-cycle.js',
  './heart/valve-surfaces.js?v=4',
  './heart/valve-apparatus.js?v=7',
  './heart/heart-manifest.json',
  './heart/heart-meshes.bin',
  './heart/MODEL-NOTICES.txt',
  './heart/valve-rings.js?v=2',
  './heart/coronary-flow.js?v=19',
  './heart/coronary-routes.js?v=1',
  './heart/transvalvular-flow.js?v=2',
  './studio/packed-spread.js','./studio/explosion-layout.js','./THIRD-PARTY-NOTICES.txt',
  /*
   * study.js is an entry point that imports these and then calls their init()s.
   * Every one has to be in the shell or the study system is blank offline.
   */
  './study/imports.js',
  './study/state.js',
  './study/storage-versioned-keys.js',
  './study/course-data.js',
  /* Muscle zoom: its labels, and the procedural levels studio/muscle-zoom.js reaches by a dynamic import. Both are
     small code, no model file, so they are precached and the mode opens offline from the first install. */
  './muscle-zoom.js?v=1',
  './muscle/zoom-scene.js?v=1',
  './study/small-ui-helpers.js',
  './study/viewport-recovery.js',
  './study/home.js',
  './study/navigation-destinations.js',
  './study/more.js',
  './study/global-search.js',
  './study/search-viewer-open.js',
  './study/hidden-tray.js',
  './study/spatial-overlay-controls.js',
  './study/subject.js',
  './study/revise.js',
  './study/revise-brain.js',
  './study/revise-links.js',
  './study/text-size.js',
  './study/what-is-under.js',
  './study/briefing-access.js',
  './study/briefing-format.js',
  './study/weekly-briefing.js',
  './study/reading-help.js',
  './study/assessments-and-marks.js',
  './study/course-timetable.js',
  './study/viewer-tools.js',
  './study/boot.js',
  './study/dialogs.js',
  './anatomy-data.js?v=5',
  /*
   * cavity-geom.js again, unversioned — NOT a duplicate. A cache key is the
   * whole URL, query included, and cavity-build.js imports './cavity-geom.js'
   * without the query. Precaching only the ?v= form left the overlay engine
   * 404ing offline. work/shell-check.mjs walks the imports and enforces this.
   */
  './cavity-geom.js',
  './wordparts.js?v=3',
  './term-notes.js?v=6',
  './term-gloss.js?v=5',
  './physiology.js?v=4',
  './physiology-mechanics.js',
  './physiology-shape.js',
  './physiology-path.js',
  './physiology-paths.js',
  './radiography.js?v=1',
  './schedule.js?v=1',
  /* Revise: the week rule, the subject registry and the HSS2011 content. d3 and markmap are the
     map's libraries and are small enough for the shell; 3d-force-graph (1.4 MB, three.js inside it)
     is cached on first use like the models, so Brain 3D works offline after it has been opened once. */
  './revision/weeks.js?v=1',
  './revision/registry.js?v=1',
  './revision/hub.js?v=1',
  './revision/hub.js',
  './revision/link-rows.js?v=1',
  './revision/describe.js?v=1',
  './revision/own-words.js?v=1',
  './revision/rules.js?v=1',
  './revision/cross-links.js?v=1',
  './revision/viewer-units.js?v=1',
  './revision/hss2011-data.js',
  './revision/leaves.js',
  './revision/hss2011-leaves-w1.js',
  './revision/hss2011-leaves-w2.js',
  './revision/hss2011-leaves-w3.js',
  './revision/hss2011-leaves-w4.js',
  './revision/hss2011-leaves-w5.js',
  './revision/hss2011-leaves-w6.js',
  './revision/hss2011-leaves-w7.js',
  './revision/hss2011-leaves-w8.js',
  './revision/hss2011-threads.js',
  './revision/hss2011-tables.js',
  './revision/hss2011-decoder.js',
  './revision/fragments.js',
  './revision/abct2326-topics.js',
  './revision/abct2326-leaves-w1.js',
  './revision/abct2326-leaves-tissues.js',
  './revision/abct2326-leaves-w2.js',
  './revision/abct2326-leaves-w3.js',
  './revision/abct2326-leaves-w4.js',
  './revision/abct2326-leaves-w5.js',
  './revision/abct2326-leaves-w7.js',
  './revision/abct2326-leaves-w8.js',
  './revision/abct2326-leaves-w9.js',
  './revision/abct2326-leaves-w11.js',
  './revision/abct2326-leaves-w12.js',
  './revision/abct2326-fragments.js',
  './revision/abct2326-threads.js',
  './revision/abct2326-tables.js',
  './revision/abct2326-decoder.js',
  './revision/vendor/d3.min.js',
  './revision/vendor/markmap-view.min.js',
  './bodymap.js?v=4',
  /* the search index: every named mesh in every layer, plus the synonym table
     that maps "collarbone" and "voice box" onto what the model calls them */
  './mesh-index.js?v=5',
  './synonyms.js?v=3',
  './search-name.js',
  './bone-landmarks.js',
  './viewer-lecture-names.js',
  './systems.js?v=1',
  /* the cavity engine: resolver, maths, builders. Small, and the overlays are
     part of the study system, so they belong in the offline shell. */
  './landmarks.js?v=2',
  './cavity-geom.js?v=2',
  './cavity-build.js?v=2',
  './manifest.webmanifest',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/icon-maskable-512.png',
  './assets/icons/apple-touch-icon.png',
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
    /* Model files the app no longer loads: drop them from the model cache. */
    const RETIRED_MODELS=['/assets/bodyparts3d/'];
    const models=await caches.open(MODEL_CACHE);
    await Promise.all((await models.keys()).filter(request=>{
      const url=new URL(request.url);
      return url.origin===self.location.origin&&RETIRED_MODELS.some(p=>url.pathname.includes(p));
    }).map(request=>models.delete(request)));
    await self.clients.claim();
  })());
});

/*
 * The .glb layers and the tube-route payloads that go with them.
 *
 * The routes are keyed to a specific GLB's contents, so they belong in the same
 * cache as the model and on the same lifetime: they arrive when their layer is
 * first opened, not in the install-time shell, and a regenerated payload is a
 * different URL because the manifest stamps it with a ?g= of the generator, the
 * kernel, the route definitions and MODEL_VERSION. That is deliberately NOT
 * CACHE_VERSION -- see the note above about which version means what.
 *
 * The heart atlas data is small enough to live in SHELL, rather than joining
 * the lazy model cache: first use now works offline. Do not add a broad
 * '/heart/heart-' model-cache rule; it would catch heart-motion.js and pull a
 * precached shell module out of the shell cache.
 */
function isModel(url) { return url.pathname.endsWith('.glb') || url.pathname.includes('/assets/physiology/') || url.pathname.includes('/revision/vendor/3d-force-graph'); }
/*
 * The IA redesign loads Instrument Sans and Newsreader from Google Fonts.
 * Without caching them the app is not genuinely offline-first: the font FILES
 * are max-age=1y, but the stylesheet declaring the @font-face rules is only
 * max-age=1d, so studying offline more than a day after the last online visit
 * loses both typefaces.
 *
 * Both hosts DO send `Access-Control-Allow-Origin: *`, and this comment used
 * to conclude from that alone that cacheFirst worked on them unchanged. It did
 * not. A <link> carrying no `crossorigin` attribute is fetched in no-cors
 * mode, so the response is opaque whatever the server sends: `response.ok` is
 * false, and cacheFirst's `if (response.ok)` guard below silently declined to
 * store it. Measured in Chrome against rss-cdn-c1: both .woff2 files were
 * cached and the stylesheet naming them was not, so an offline reader held the
 * typefaces on disk with no @font-face rule left to reach them by, and fell
 * back to system fonts — the exact failure this block exists to prevent.
 *
 * The fix is the `crossorigin` attribute on the stylesheet <link> in
 * radiography-study-studio.html. It makes the request CORS, the response
 * non-opaque, and this code correct as first written. Removing that attribute
 * silently reintroduces the bug, so the two are a pair.
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
  if (response && response.ok && !response.redirected) cache.put(request, response.clone());
  return response;
}

/*
 * Stale-while-revalidate for the shell's subresources: answer from the cache
 * the instant there is a copy, and refresh it behind the reader for next time.
 *
 * This replaced a network-first shell whose stated reason was "so edits show up
 * without a hard reload during development". That is a development affordance,
 * and every student was paying for it: network-first AWAITS fetch() for all 82
 * shell entries on every warm load, and reaches the cache only from its catch.
 * A connection that is attached but not moving — a tunnel, a full carriage,
 * hotel wifi behind a captive portal — is the worst case precisely because
 * nothing throws. The fetch just hangs, and the app hangs with it, while a
 * complete copy sits in the cache it has not looked at.
 *
 * The cost is that an edited module now lands one load later. That is already
 * the beat this app moves on: a new service worker only takes over on the next
 * navigation, and it is the ?v= query plus a CACHE_VERSION bump that actually
 * publishes a change. In development, DevTools' "Bypass for network" is the
 * switch that used to be hard-coded here for everyone.
 */
async function staleWhileRevalidate(event, request, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  const network = fetch(request).then((response) => {
    if (response && response.ok) cache.put(request, response.clone());
    return response;
  });
  if (!hit) return network;
  /* Keep the worker alive for the refresh, but never fail this response over it. */
  event.waitUntil(network.catch(() => {}));
  return hit;
}

/*
 * Network-first for the navigation only, and only while the network is
 * answering. The document is the one response worth waiting for — it is what
 * carries a new CACHE_VERSION into play — but not worth waiting for forever.
 * After SHELL_TIMEOUT_MS we serve the cached shell and let the fetch land in
 * the cache behind us, so lie-fi costs a stale page rather than a dead one.
 */
const SHELL_TIMEOUT_MS = 3000;
const TIMED_OUT = Symbol('timed out');

async function networkFirst(event, request, cacheName) {
  const cache = await caches.open(cacheName);
  const network = fetch(request).then((response) => {
    if (response && response.ok) cache.put(request, response.clone());
    return response;
  });

  let timer;
  const expired = new Promise((resolve) => {
    timer = setTimeout(() => resolve(TIMED_OUT), SHELL_TIMEOUT_MS);
  });

  try {
    const first = await Promise.race([network, expired]);
    clearTimeout(timer);
    if (first !== TIMED_OUT) return first;
    /* Slow, not dead: serve the cache and let the fetch land for next time. */
    const hit = await cache.match(request);
    if (hit) { event.waitUntil(network.catch(() => {})); return hit; }
    return await network;
  } catch (e) {
    clearTimeout(timer);
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
  /*
   * The document gets a bounded wait; its subresources do not. A stale
   * subresource is refreshed behind the reader, and a CACHE_VERSION bump
   * re-precaches the whole shell on install, so staleness cannot accumulate.
   */
  if (request.mode === 'navigate') { event.respondWith(networkFirst(event, request, SHELL_CACHE)); return; }
  event.respondWith(staleWhileRevalidate(event, request, SHELL_CACHE));
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
