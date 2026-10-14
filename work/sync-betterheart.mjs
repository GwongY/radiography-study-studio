/*
 * Follow BetterHeart's three 3D pages:
 *   heart   https://skypray.synology.me/betterheart/heart-anatomy/
 *   upper   https://skypray.synology.me/betterheart/upper-extremity-anatomy/
 *   lower   https://skypray.synology.me/betterheart/lower-extremity-anatomy/
 *
 *   node work/sync-betterheart.mjs                 report: what changed upstream since the last accept, per page
 *   node work/sync-betterheart.mjs --write         also pull the DATA that changed (see below)
 *   node work/sync-betterheart.mjs --accept        record the upstream state as "reviewed" in work/betterheart-baseline.json
 *   node work/sync-betterheart.mjs --only lower    one page (heart | upper | lower), with any of the above
 *
 * Two kinds of upstream change, handled differently on purpose:
 *   - DATA is a straight copy. Heart: the mesh payload (CC BY-SA 4.0) into outputs/heart/. Limbs: the vessel
 *     centre-line routes into outputs/limb/routes-<page>.json, and the vessel meshes' bounding boxes into
 *     work/limb-boxes.json (the offline fit check needs them; the 3 MB limb meshes themselves are NOT kept --
 *     the viewer draws its own circulatory layer, which is the same source). Nothing is fetched at run time.
 *   - CODE is adapted (our modules read `ha-` ids, import three through the import map, run inside the
 *     explorer scene), so it can never be overwritten. The report lists which upstream modules changed since
 *     the last --accept, says whether each is re-ported by work/port-betterheart.mjs or hand-adapted, and
 *     lists modules that are new. A limb page script (arm.js / leg.js) is mostly page chrome; the parts we
 *     use are extracted from it by the port script, so a change there is re-ported the same way.
 * Hashes ignore line endings and the copyright banner on the first lines.
 */
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { VERSIONS } from './lib/bh-js.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const HEART = join(ROOT, 'outputs', 'heart');
const LIMB = join(ROOT, 'outputs', 'limb');
const BASELINE = join(ROOT, 'work', 'betterheart-baseline.json');
const BOXES = join(ROOT, 'work', 'limb-boxes.json');
const SITE = 'https://skypray.synology.me/betterheart/';
const PAGES = { heart: 'heart-anatomy/', upper: 'upper-extremity-anatomy/', lower: 'lower-extremity-anatomy/' };
const LIMB_SCRIPT = { upper: 'arm', lower: 'leg' };
const args = process.argv.slice(2);
const flag = (f) => args.includes(f);
const onlyIdx = args.indexOf('--only');
const wanted = onlyIdx >= 0 ? [args[onlyIdx + 1]] : Object.keys(PAGES);
for (const p of wanted) if (!PAGES[p]) { console.error(`unknown page "${p}" (heart | upper | lower)`); process.exit(2); }

const get = async (page, path, as = 'text') => {
  const r = await fetch(SITE + PAGES[page] + path, { headers: { 'cache-control': 'no-cache' } });
  if (!r.ok) throw new Error(`${page}/${path}: HTTP ${r.status}`);
  return as === 'buffer' ? Buffer.from(await r.arrayBuffer()) : r.text();
};
const sha = (s) => createHash('sha256').update(s).digest('hex').slice(0, 16);
const normalise = (s) => s.replace(/\r/g, '').replace(/^\/\*![\s\S]*?\*\/\n?/, '');

/* ---------- modules of one page ---------- */
async function moduleHashes(page, entries) {
  const specs = new Set(entries);
  const html = await get(page, '');
  for (const m of html.matchAll(/['"]\.?\/?([\w-]+\.js)(?:\?v=\d+)?['"]/g)) if (!m[1].startsWith('three')) specs.add(m[1]);
  /* the closure of what those scripts import from their own directory (a worklist: `specs` grows as it is walked) */
  const walked = new Set();
  for (let more = true; more;) {
    more = false;
    for (const s of [...specs]) {
      if (walked.has(s) || s === 'umami.js') continue;
      walked.add(s); more = true;
      try { for (const m of (await get(page, s)).matchAll(/from\s*['"]\.\/([\w-]+\.js)/g)) specs.add(m[1]); } catch { /* listed but gone */ }
    }
  }
  specs.delete('umami.js'); /* the site's own analytics, not ours */
  const out = {};
  for (const s of [...specs].sort()) { try { out[s] = sha(normalise(await get(page, s))); } catch (e) { out[s] = 'MISSING ' + e.message; } }
  return out;
}

/* ---------- state of one page ---------- */
async function stateOf(page) {
  if (page === 'heart') {
    const manifest = JSON.parse(await get(page, 'heart-manifest.json'));
    const bin = await get(page, 'heart-meshes.bin', 'buffer');
    return {
      kind: 'heart', buildTag: manifest.buildTag || null,
      data: { meshes: sha(sha(bin) + JSON.stringify([manifest.meshes, manifest.alignment])) },
      modules: await moduleHashes(page, ['heart.js']),
      keep: { manifest, bin },
    };
  }
  const script = LIMB_SCRIPT[page];
  const html = await get(page, '');
  const entry = (html.match(new RegExp(script + '[.]js[?]v=[0-9]+')) || [script + '.js'])[0];
  const src = (await get(page, entry)).replace(/\r/g, '');
  /* data files are named by string literals in the page script: './arm-manifest.json?v=2' */
  const file = (re) => { const m = src.match(re); if (!m) throw new Error(`${page}: no ${re} in ${script}.js`); return m[0].replace(/^['"][.]\//, '').replace(/['"]$/, ''); };
  const manifestPath = file(/['"][.]\/[\w-]+-manifest[.]json[^'"]*['"]/), binPath = file(/['"][.]\/[\w-]+-meshes[.]bin[^'"]*['"]/), routesPath = file(/['"][.]\/[\w-]+-routes[.]json[^'"]*['"]/);
  const manifest = JSON.parse(await get(page, manifestPath));
  const bin = await get(page, binPath, 'buffer');
  const routesText = await get(page, routesPath);
  return {
    kind: 'limb', buildTag: (src.match(/dataset[.]bh3d='([^']+)'/) || html.match(/data-bh3d="([^"]+)"/) || [])[1] || null,
    data: { manifest: sha(JSON.stringify([manifest.version, manifest.origin, manifest.scale, manifest.meshes.map((m) => [m.name, m.side, m.group, m.min, m.max])])), meshes: sha(bin), routes: sha(routesText) },
    modules: await moduleHashes(page, [`${script}.js`]),
    keep: { manifest, routesText },
  };
}

/* ---------- local comparison + data pulls ---------- */
function localMatch(page, st) {
  if (st.kind === 'heart') {
    const bp = join(HEART, 'heart-meshes.bin'), mp = join(HEART, 'heart-manifest.json');
    if (!existsSync(bp) || !existsSync(mp)) return false;
    const lm = JSON.parse(readFileSync(mp, 'utf8')), { manifest, bin } = st.keep;
    return readFileSync(bp).equals(bin) && JSON.stringify([lm.meshes, lm.alignment]) === JSON.stringify([manifest.meshes, manifest.alignment]);
  }
  const rp = join(LIMB, `routes-${page}.json`);
  return existsSync(rp) && sha(readFileSync(rp, 'utf8').replace(/\r/g, '')) === st.data.routes;
}

function limbBoxes(st) {
  return { origin: st.keep.manifest.origin, scale: st.keep.manifest.scale,
    vessels: st.keep.manifest.meshes.filter((m) => m.group === 'artery' || m.group === 'vein').map((m) => ({ name: m.name, side: m.side, group: m.group, min: m.min, max: m.max })) };
}

function writeData(page, st) {
  if (st.kind === 'heart') {
    const { manifest, bin } = st.keep;
    /* Only what atlas.js and the checks read; upstream's own build metadata stays in the baseline. */
    const kept = { version: manifest.version, meshes: manifest.meshes, alignment: manifest.alignment, source: manifest.source };
    writeFileSync(join(HEART, 'heart-manifest.json'), JSON.stringify(kept, null, 2) + '\n');
    writeFileSync(join(HEART, 'heart-meshes.bin'), bin);
    console.log('  wrote outputs/heart/heart-manifest.json and heart-meshes.bin. Next:');
    console.log('    node work/build-heart-alignment.mjs --write   (refit to dolasim.glb)');
    console.log('    node work/heart-atlas-check.mjs');
    console.log('    bump CACHE_VERSION in outputs/sw.js, then commit');
    return;
  }
  writeFileSync(join(LIMB, `routes-${page}.json`), st.keep.routesText.replace(/\r/g, ''));
  const boxes = existsSync(BOXES) ? JSON.parse(readFileSync(BOXES, 'utf8')) : {};
  boxes[page] = limbBoxes(st);
  writeFileSync(BOXES, JSON.stringify(boxes) + '\n');
  console.log(`  wrote outputs/limb/routes-${page}.json and work/limb-boxes.json (${page}). Next:`);
  console.log("    node work/limb-check.mjs   (the frame still fits the viewer's circulatory layer, the routes still sit in the vessels)");
  console.log('    bump the routes version in outputs/limb/limb.js and CACHE_VERSION in outputs/sw.js, then commit');
}

/* ---------- baseline ---------- */
let base = existsSync(BASELINE) ? JSON.parse(readFileSync(BASELINE, 'utf8')) : null;
/* the first format was the heart page's state, flat */
if (base && !base.pages) base = { version: 2, pages: { heart: { buildTag: base.buildTag, data: { meshes: base.meshesHash }, modules: base.modules } } };
const next = base ? { version: 2, pages: { ...base.pages } } : { version: 2, pages: {} };

for (const page of wanted) {
  const st = await stateOf(page);
  const mine = { buildTag: st.buildTag, data: st.data, modules: st.modules };
  console.log(`\n== ${page}   ${SITE}${PAGES[page]}`);
  console.log(`   build ${st.buildTag || '(none)'} -- ${Object.keys(st.modules).length} modules`);
  const was = base && base.pages[page];
  if (!was) console.log('   no baseline for this page yet: run with --accept once you have reviewed the current upstream state');
  else {
    const changed = Object.keys(st.modules).filter((k) => was.modules[k] && was.modules[k] !== st.modules[k]);
    const added = Object.keys(st.modules).filter((k) => !(k in was.modules));
    const removed = Object.keys(was.modules).filter((k) => !(k in st.modules));
    console.log(`   build tag     ${was.buildTag === st.buildTag ? 'unchanged' : `${was.buildTag} -> ${st.buildTag}`}`);
    for (const [k, v] of Object.entries(st.data)) console.log(`   ${k.padEnd(13)} ${was.data && was.data[k] === v ? 'unchanged' : 'CHANGED'}`);
    console.log(`   modules       ${changed.length} changed, ${added.length} new, ${removed.length} removed`);
    /* modules in VERSIONS are re-ported by work/port-betterheart.mjs; the rest carry hand adaptations, or (a limb
       page script) hold pieces the port script extracts */
    const how = (k) => (k in VERSIONS ? `-> node work/port-betterheart.mjs ${k}` : /^(arm|leg)[.]js$/.test(k) ? '-> page script: re-run node work/port-betterheart.mjs (limb-text.js and limb-flow.js are extracted from it)' : '-> hand-adapted: diff it against outputs/' + (page === 'heart' ? 'heart/' : 'limb/') + k);
    for (const k of changed) console.log('   changed  ' + k + '   ' + how(k));
    for (const k of added) console.log('   new      ' + k + '   ' + how(k));
    for (const k of removed) console.log('   removed  ' + k);
  }
  const match = localMatch(page, st);
  console.log(`   local ${st.kind === 'heart' ? 'mesh data' : 'routes'} ${match ? 'match upstream' : 'DIFFER from upstream'}`);
  const haveBoxes = st.kind === 'heart' || (existsSync(BOXES) && JSON.parse(readFileSync(BOXES, 'utf8'))[page]);
  if (flag('--write') && (!match || !haveBoxes)) writeData(page, st);
  next.pages[page] = mine;
}
if (flag('--accept')) { writeFileSync(BASELINE, JSON.stringify(next, null, 2) + '\n'); console.log('\nbaseline written: ' + BASELINE); }
