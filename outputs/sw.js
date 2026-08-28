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
 */

const CACHE_VERSION = 'v20';
const SHELL_CACHE = `rss-shell-${CACHE_VERSION}`;
const MODEL_CACHE = `rss-models-${CACHE_VERSION}`;
const CDN_CACHE = `rss-cdn-${CACHE_VERSION}`;
const ALL_CACHES = [SHELL_CACHE, MODEL_CACHE, CDN_CACHE];

const SHELL = [
  './',
  './index.html',
  './radiography-study-studio.html',
  './study-data.js',
  './anatomy-data.js',
  './visual-data.js?v=3',
  './schematics.js?v=2',
  './wordparts.js?v=2',
  './term-notes.js?v=1',
  './figures.js?v=1',
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
   * (body-cavities.png, body-movements.jpg, muscle-tissue-types.jpg, nephron.jpg, synovial-joints.jpg)
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
  './assets/figures/nervous-system-overview.jpg',
  './assets/figures/respiratory-system.svg',
  './assets/figures/synovial-joint-structure.png',
  './assets/figures/vertebra-superior.png',
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
