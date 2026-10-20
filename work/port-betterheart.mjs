/*
 * Port BetterHeart's modules into outputs/heart/ and outputs/limb/ -- repeatably.
 *
 *   node work/port-betterheart.mjs                 dry run: transform every listed module, report, write nothing
 *   node work/port-betterheart.mjs --write         write them
 *   node work/port-betterheart.mjs --write hemo-panel.js heartbeat.js     only those
 *
 * The site's code cannot be copied verbatim: it looks up bare element ids (we prefix `ha-`), is Chinese
 * only (we show English, from the site's own en.json dictionary, via tr()), imports its own vendored
 * three, and owns the whole page. This script holds every change we make to it, as data:
 *   1. the copyright banner is dropped (the licence statement lives in MODEL-NOTICES.txt)
 *   2. EDITS: exact string replacements. One that no longer matches is an ERROR, never a silent skip --
 *      that is the signal that the site changed under a line we adapted, and the line needs re-porting.
 *   3. every string literal containing Chinese is wrapped in tr() (outputs/heart/i18n.js)
 *   4. every `./x.js?v=N` import is rewritten to the version in VERSIONS, so the service-worker shell
 *      list (checked by work/shell-check.mjs) names one specifier per module
 * Entries carry `page` (which of the three pages the file comes from; default the heart page), `dir`
 * (heart or limb) and, for things that live inside a page script rather than in a module of their own,
 * `extract`: a list of { from, consts, functions } lifted out whole -- a const may be [name, exportedAs].
 * Then run `node work/build-heart-i18n.mjs` for the dictionary and `node work/sync-betterheart.mjs --accept`
 * once the result is reviewed.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mapStrings, hasCjk, cjkTemplates, constStatement, functionStatement, VERSIONS } from './lib/bh-js.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://skypray.synology.me/betterheart/';
const PAGES = { heart: 'heart-anatomy/', upper: 'upper-extremity-anatomy/', lower: 'lower-extremity-anatomy/' };
const DIRS = { heart: join(ROOT, 'outputs', 'heart'), limb: join(ROOT, 'outputs', 'limb') };
/* where a module in each directory finds the translator */
const I18N = { heart: "./i18n.js?v=1", limb: "../heart/i18n.js?v=1" };

const PORTS = {
  'heartbeat.js': {
    edits: [
      ['export function createHeartbeat({meshes}){const $=id=>document.getElementById(id);', "export function createHeartbeat({meshes,startPaused=false}){const $=id=>document.getElementById('ha-'+id);"],
      ['playing=true,lastPhase', 'playing=!startPaused,lastPhase'],
      ["document.querySelectorAll('.ecg-chart text')", "document.querySelectorAll('.ha-ecg-chart text')"],
      ["document.querySelector('.ecg-chart')", "document.querySelector('.ha-ecg-chart')"],
    ],
  },
  'hemo-model.js': {}, 'hemo-explain.js': {}, 'lumen-fit.js': {}, 'pci-sim.js': {}, 'hemo-sim.js': {},
  'coronary-flow.js': {}, 'ivus-sim.js': {}, 'arrhythmia.js': {}, 'mmode.js': {}, 'echo-sim.js': {},
  /* constants the site keeps inside its page script, lifted out whole */
  'heart-text.js': { extract: [{ from: 'heart.js', consts: ['IVUS_HINT', 'IVUS_TXT', 'IVUS_FIND', 'RTXT', 'ARR_DONE', 'CONDUCTION_CAM'] }] },
  /* the site passes its own tr() in; ours is imported, so drop the parameter that would shadow it */
  'ivus-image.js': { edits: [['createIvusView({canvas,lmode,tr=s=>s})', 'createIvusView({canvas,lmode})']] },
  'hemo-panel.js': {
    prefixIds: true,
    edits: [
      ["for(const [id,z] of [['hemoSwanTicks',sim.zones.swan],['hemoPigTicks',sim.zones.pig]])", "for(const [id,z] of [['ha-hemoSwanTicks',sim.zones.swan],['ha-hemoPigTicks',sim.zones.pig]])"],
      ["for(const id of ['hemoOverlay','hemoMarks','hemoScale'])", "for(const id of ['ha-hemoOverlay','ha-hemoMarks','ha-hemoScale'])"],
      ["d.className='hemo-block '+cls", "d.className='ha-hemo-block '+cls"],
      ["h.className='hemo-explain-head'", "h.className='ha-hemo-explain-head'"],
    ],
  },

  /* ---- the limb pages (outputs/limb/) ---- */
  /* the three peripheral-intervention simulations; its one import is the PCI helper we already ported */
  'leg-proc.js': { dir: 'limb', page: 'lower', edits: [["'../heart-anatomy/pci-sim.js?v=17'", "'../heart/pci-sim.js?v=17'"]] },
  /* the procedure texts and the camera regions, which the site keeps inside leg.js / arm.js */
  'limb-text.js': {
    dir: 'limb',
    extract: [
      { from: 'lower:leg.js', consts: ['PX'] },
      { from: 'lower:leg.js', consts: [['FOCUS', 'LEG_FOCUS']] },
      { from: 'upper:arm.js', consts: [['FOCUS', 'ARM_FOCUS']] },
    ],
  },
  /* the travelling dots along every centreline route; the page's version adds its dots to its own world */
  'limb-flow.js': {
    dir: 'limb',
    header: "import * as THREE from 'three';\n",
    extract: [{ from: 'lower:leg.js', functions: ['createFlow'] }],
    edits: [
      ['function createFlow(routes,{color,vein=false}){', 'export function createFlow(routes,{color,vein=false,parent}){'],
      ['world.add(mesh)', 'parent.add(mesh)'],
    ],
  },
};

/* `lower:leg.js` -> the lower-limb page's leg.js; a bare name is the heart page's. The module query the page
   imports it with does not matter for fetching, and the site serves the current file at every version. */
const urlOf = (page, name) => SITE + PAGES[page] + name;
const where = (spec, fallbackPage) => { const [p, n] = spec.includes(':') ? spec.split(':') : [fallbackPage, spec]; return [p, n]; };
const fetchText = async (page, name) => { const r = await fetch(urlOf(page, name)); if (!r.ok) throw new Error(`${page}/${name}: HTTP ${r.status}`); return r.text(); };

export function transform(name, src, { edits = [], prefixIds = false, dir = 'heart', header = '', page = 'heart' } = {}) {
  let s = src.replace(/\r/g, '').replace(/^\/\*![\s\S]*?\*\/\n?/, '');
  for (const [from, to] of edits) {
    if (!s.includes(from)) throw new Error(`${name}: edit no longer matches -- the site changed this line:\n   ${from.slice(0, 140)}`);
    s = s.split(from).join(to);
  }
  /* bare element ids -> ha- ids (the host panel builds them); the explicit edits above handle ids held in arrays */
  if (prefixIds) s = s.replace(/(\$\(|getElementById\()'([A-Za-z][\w-]*)'\)/g, "$1'ha-$2')");
  s = s.replace(/(\.\/[\w-]+\.js)\?v=\d+/g, (m, p) => { const v = VERSIONS[p.slice(2)]; return v ? `${p}?v=${v}` : m; });
  let wrapped = 0;
  s = mapStrings(s, ({ quote, body, before }) => {
    if (!hasCjk(body) || before === 'tr(') return undefined; /* already translated by the site */
    wrapped++;
    return `tr(${quote}${body}${quote})`;
  });
  const templates = cjkTemplates(s);
  const imports = [];
  if (header) imports.push(header.trimEnd());
  if (wrapped || /(^|[^\w$.])tr\(/.test(s)) imports.push(`import {tr} from '${I18N[dir]}';`);
  if (imports.length) {
    const lines = s.split('\n');
    const at = lines.findIndex((l) => !/^\s*(\/\/|\/\*|\*)/.test(l));
    lines.splice(Math.max(0, at), 0, ...imports);
    s = lines.join('\n');
  }
  const url = SITE + PAGES[page];
  const banner = `/* Adapted from BetterHeart (${url}) with the owner's permission; see MODEL-NOTICES.txt.\n * Generated by work/port-betterheart.mjs -- edit the port script, not this file. */\n`;
  return { text: banner + s, wrapped, templates };
}

async function sourceOf(name, cfg) {
  const page = cfg.page || 'heart';
  if (!cfg.extract) return fetchText(page, name);
  const cache = new Map();
  const get = async (spec) => { if (!cache.has(spec)) { const [p, n] = where(spec, page); cache.set(spec, (await fetchText(p, n)).replace(/\r/g, '')); } return cache.get(spec); };
  const parts = [];
  for (const e of cfg.extract) {
    const text = await get(e.from);
    for (const c of e.consts || []) {
      const [nm, as] = Array.isArray(c) ? c : [c, c];
      parts.push('export ' + constStatement(text, nm).replace('const ' + nm + '=', 'const ' + as + '='));
    }
    for (const f of e.functions || []) parts.push(functionStatement(text, f));
  }
  return parts.join('\n') + '\n';
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const args = process.argv.slice(2);
  const write = args.includes('--write');
  const only = args.filter((a) => a.endsWith('.js'));
  let failed = 0;
  for (const [name, cfg] of Object.entries(PORTS)) {
    if (only.length && !only.includes(name)) continue;
    try {
      const dir = cfg.dir || 'heart';
      const { text, wrapped, templates } = transform(name, await sourceOf(name, cfg), { edits: cfg.edits, prefixIds: cfg.prefixIds, dir, header: cfg.header, page: cfg.page || (cfg.extract && where(cfg.extract[0].from, 'heart')[0]) || 'heart' });
      console.log(`${name}: ${text.split('\n').length} lines, ${wrapped} Chinese literals wrapped in tr()${templates.length ? `, ${templates.length} template literal(s) with Chinese NOT wrapped` : ''}`);
      for (const t of templates) console.log('   template: ' + t.replace(/\n/g, ' '));
      if (write) writeFileSync(join(DIRS[dir], name), text);
    } catch (e) { failed++; console.log('ERROR ' + e.message); }
  }
  if (!write) console.log('(dry run -- pass --write to write outputs/heart/ and outputs/limb/)');
  process.exitCode = failed ? 1 : 0;
}
