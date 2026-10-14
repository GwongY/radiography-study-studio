/*
 * Port BetterHeart's modules into outputs/heart/ -- repeatably.
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
 * Then run `node work/build-heart-i18n.mjs` for the dictionary and `node work/sync-betterheart.mjs --accept`
 * once the result is reviewed.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mapStrings, hasCjk, cjkTemplates, constStatement, VERSIONS } from './lib/bh-js.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'outputs', 'heart');
const BASE = 'https://skypray.synology.me/betterheart/heart-anatomy/';


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
  'heart-text.js': { extract: { from: 'heart.js', consts: ['IVUS_HINT', 'IVUS_TXT', 'IVUS_FIND', 'RTXT', 'ARR_DONE', 'CONDUCTION_CAM'] } },
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
};

const fetchText = async (path) => { const r = await fetch(BASE + path); if (!r.ok) throw new Error(`${path}: HTTP ${r.status}`); return r.text(); };

export function transform(name, src, edits = [], prefixIds = false) {
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
    /* leave import specifiers and anything already inside tr() alone */
    wrapped++;
    return `tr(${quote}${body}${quote})`;
  });
  const templates = cjkTemplates(s);
  if (wrapped || /(^|[^\w$.])tr\(/.test(s)) {
    const imp = "import {tr} from './i18n.js?v=1';\n";
    const lines = s.split('\n');
    const at = lines.findIndex((l) => !/^\s*(\/\/|\/\*|\*)/.test(l));
    lines.splice(Math.max(0, at), 0, imp.trimEnd());
    s = lines.join('\n');
  }
  const header = `/* Adapted from BetterHeart (${BASE}) with the owner's permission; see MODEL-NOTICES.txt.\n * Generated by work/port-betterheart.mjs -- edit the port script, not this file. */\n`;
  return { text: header + s, wrapped, templates };
}

const args = process.argv.slice(2);
const write = args.includes('--write');
const only = args.filter((a) => a.endsWith('.js'));
let failed = 0;
for (const [name, cfg] of Object.entries(PORTS)) {
  if (only.length && !only.includes(name)) continue;
  try {
    let src;
    if (cfg.extract) { const page = (await fetchText(cfg.extract.from)).replace(/\r/g, ''); src = cfg.extract.consts.map((c) => 'export ' + constStatement(page, c)).join('\n') + '\n'; }
    else src = await fetchText(name);
    const { text, wrapped, templates } = transform(name, src, cfg.edits, cfg.prefixIds);
    console.log(`${name}: ${text.split('\n').length} lines, ${wrapped} Chinese literals wrapped in tr()${templates.length ? `, ${templates.length} template literal(s) with Chinese NOT wrapped` : ''}`);
    for (const t of templates) console.log('   template: ' + t.replace(/\n/g, ' '));
    if (write) writeFileSync(join(OUT, name), text.replace(/\n/g, '\r\n'));
  } catch (e) { failed++; console.log('ERROR ' + e.message); }
}
if (!write) console.log('(dry run -- pass --write to write outputs/heart/)');
process.exitCode = failed ? 1 : 0;
