/*
 * Subject
 *
 * This is the viewer's layer rail: body layers, their chips, the colour key
 * and circulation extras. The old Learn topic list moved to Revise
 * (study/revise.js).
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, FLOW_CLASSES, LAYER_CLASSES, MESH_INDEX, RATES, STRUCTURE_MODELS, SYSTEMS, UNITS, esc, layerOf, systemCounts } from './imports.js';
import { toast } from './small-ui-helpers.js';

/* Viewer -- the 3D studio and radiographs share one destination. Compare mode
   from the prototype is deliberately not built: the handoff lists its
   synchronised highlighting as undesigned. */

/*
 * Body layers.
 *
 * All six GLBs are exported in one shared frame, so they are layers of one
 * body rather than six alternative models -- muscle really does sit on the
 * bone it is drawn over. Each chip cycles off -> solid -> ghost, because
 * peeling is the whole point: you want the vessels solid AND the skeleton
 * ghosted behind them to see where they run.
 *
 * Layers load on demand. Precaching six models is ~12 MB of download for
 * someone who may only study bones tonight.
 */
/*
 * The rail is a rail of SYSTEMS, and used to be a rail of FILES.
 *
 * Seven chips, one per GLB, meant "Vessels" stood for the arteries, the veins
 * and the heart at once, and "Organs" for the airway, the gut, the urinary and
 * genital organs and the endocrine glands. HSS2011 sets arterial supply and
 * venous drainage as separate questions, so one chip was standing in front of
 * two answers. outputs/systems.js splits those two files; the other five each
 * still draw exactly one chip, and behave as they always did.
 *
 * Each entry carries the GLB layer it draws from AND that file, so nothing
 * downstream has to map a chip back to a file in order to load it.
 */
export const BODY_LAYERS = SYSTEMS.map((s) => ({
  key: s.key,
  label: s.label,
  layer: s.layer,
  file: (STRUCTURE_MODELS[s.layer] || {}).file || null,
}));
const LAYER_CYCLE = { off: 'solid', solid: 'ghost', ghost: 'off' };
export const GHOST_OPACITY = 0.34;
/* Both halves of the skeleton, on, which is what the single Skeleton chip
   meant before it was split into Axial and Appendicular. Derived from
   SYSTEMS so a further split does not leave a chip dark at boot. */
export let layerState = Object.fromEntries(SYSTEMS.filter((s) => s.layer === 'skeleton').map((s) => [s.key, 'solid']));

/*
 * How many structures a layer contains -- not how many meshes it holds.
 *
 * The chips used to show the raw mesh counts (skeleton 277, muscles 683,
 * vessels 676), which is a count of geometry, not of anatomy. The same
 * structure is counted twice when it is paired, again for each duplicate
 * export, and once more for every sub-part the source split out. The index
 * already collapses all three, so "Muscles 345" is the number of things you
 * can actually name -- and it is the same number the search offers.
 */
/*
 * Two counts per layer, and the difference between them is the point.
 *
 * The chips used to read "Vessels 419" -- 419 individually pressable names in
 * one layer, none of them marked as more or less worth knowing than the rest.
 * mesh-index.js now carries, for every structure, whether the HSS2011 /
 * ABCT2326 material actually names it and which file does. The chip leads with
 * that number: "Vessels 186/419" is 186 names to learn inside an atlas of 419.
 */
const LAYER_STRUCTURES = systemCounts(MESH_INDEX, UNITS);
function layerCount(key) {
  return (LAYER_STRUCTURES[key] || {}).total || 0;
}
function layerCourseCount(key) {
  return (LAYER_STRUCTURES[key] || {}).course || 0;
}
/*
 * How many separate things this layer lets you select.
 *
 * Not the same as either number on the chip, and that is the point: 419
 * vessels are modelled, 186 of them are named by the course, and a tap can
 * land on 217 things -- those 186 plus one per group of the other 233.
 */
function layerUnitCount(key) {
  return (LAYER_STRUCTURES[key] || {}).units || 0;
}

const hex = (n) => '#' + Number(n).toString(16).padStart(6, '0');

/*
 * The colour key.
 *
 * It lists only the classes actually on screen, with the real mesh count beside
 * each, and it leads with the pulmonary pair whenever they are showing --
 * because that is the one place the red/blue convention inverts, and a legend
 * that quietly let a student read 'artery = red = oxygenated' off a pulmonary
 * artery would be teaching the error the colours exist to prevent.
 */
/*
 * Counted from what is VISIBLE, not from what has loaded.
 *
 * The key used to add up each on layer's stored per-file counts. That was the
 * same number whichever chips of that file were on, so turning off Venous and
 * leaving Arterial up still printed the vein colours and their counts beside a
 * screen with no veins in it. The studio counts the visible meshes instead;
 * LAYER_CLASSES survives only to give the rows a stable anatomical order.
 */
function renderFlowKey() {
  if (!window.__osteo || !window.__osteo.visibleFlowCounts) return '';
  const counts = window.__osteo.visibleFlowCounts() || {};
  const rows = [];
  const seen = new Set();
  Object.values(LAYER_CLASSES).flat().forEach((cls) => {
    if (seen.has(cls) || !counts[cls] || !FLOW_CLASSES[cls]) return;
    seen.add(cls);
    rows.push({ cls, n: counts[cls], spec: FLOW_CLASSES[cls] });
  });
  if (!rows.length) return '';
  const pulm = rows.some((r) => r.cls === 'pulmArtery' || r.cls === 'pulmVein');
  return `<div class="flowkey"><div class="kh">What the colours mean</div>${
    rows.map((r) => `<div class="kr"><span class="sw" style="background:${hex(r.spec.color)}"></span>${esc(r.spec.short)}<span class="kn">${r.n}</span></div>`).join('')
  }${pulm ? '<div class="note">Red is oxygenated, blue is not — which is why the pulmonary artery is blue-violet and the pulmonary veins are red. Vessel type does not decide the colour; what it carries does.</div>' : ''}
    <div class="note">Colours and rhythms are drawn by this app, not measured.</div></div>`;
}

/*
 * Circulation extras: what BetterHeart's pages add to the vessel layers, offered whenever one of the vessel or heart chips
 * is on. The studio owns the behaviour (studio/circulation-extras.js); this only draws the flow-dots switch. Colours and
 * tap behaviour are not among them on purpose -- the key below already follows the oxygenation convention, and a tap
 * keeps left and right apart because that is the L2 drill.
 */
function renderCircExtras() {
  const api = window.__osteo && window.__osteo.circulation;
  const on = ['arterial', 'venous', 'heart'].some((k) => (layerState[k] || 'off') !== 'off');
  if (!api || !on) return '';
  const st = api.state();
  return `<div class="circextras"><div class="kh">Circulation extras</div>
    <label class="ce"><input type="checkbox" id="ceDots"${st.dots ? ' checked' : ''}><span>Flow dots</span><small>arteries and veins</small></label>
    <div class="note">The Heart chip draws the enhanced heart -- valves, chambers, beating -- in place of the heart's own meshes, so those cannot be tapped; focus and Projection bring them back.</div></div>`;
}

export function renderLayerRail() {
  const rail = $$('layerRail');
  if (!rail) return;
  const live = !!(window.__osteo && window.__osteo.physiologyOn && window.__osteo.physiologyOn());
  rail.innerHTML = `<button class="livechip" id="liveChip" data-on="${live ? 1 : 0}" aria-pressed="${live}">
      <span class="pulse"></span><span>${live ? 'Live physiology' : 'Static model'}</span>
    </button>` + BODY_LAYERS.map((l, i) => {
    const st = layerState[l.key] || 'off';
    /* Chips that share one GLB are marked as a group, so thirteen chips read
       as seven models rather than thirteen peers -- and so it is visible that
       the first tap on any of the three vessel chips is the same one download.
       The skeleton's two are the exception that proves it: Axial and
       Appendicular are grouped like the rest, and neither downloads anything,
       because the bones are in the scene before the rail is drawn. */
    const group = BODY_LAYERS.filter((x) => x.layer === l.layer).length > 1;
    const sub = !group ? '' : ` data-sub="${BODY_LAYERS.findIndex((x) => x.layer === l.layer) === i ? 'first' : 'more'}"`;
    return `<button class="layerchip" data-layer="${esc(l.key)}" data-state="${st}"${sub} aria-pressed="${st !== 'off'}">
      <span class="dot"></span><span>${esc(l.label)}</span><span class="cnt" title="${layerCourseCount(l.key)} named by your course · ${layerCount(l.key)} modelled · ${layerUnitCount(l.key)} separately selectable">${layerCourseCount(l.key)}<i>/${layerCount(l.key)}</i></span>
    </button>`;
  }).join('') + '<div class="layerhint">tap to cycle · solid → ghost → off</div>' + renderCircExtras() + renderFlowKey();
  rail.querySelectorAll('[data-layer]').forEach((b) => { b.onclick = () => cycleLayer(b.dataset.layer, b); });
  const circ = window.__osteo && window.__osteo.circulation;
  if (circ) {
    const dots = $$('ceDots');
    if (dots) dots.onchange = async () => { await circ.setDots(dots.checked); renderLayerRail(); };
  }
  const chip = $$('liveChip');
  if (chip) chip.onclick = () => {
    if (!window.__osteo || !window.__osteo.setPhysiology) { toast('Open the 3D model first.'); return; }
    const now = window.__osteo.setPhysiology(!window.__osteo.physiologyOn());
    toast(now
      ? `Live — ${RATES.heartBpm} beats and ${RATES.breathsPerMin} breaths a minute`
      : 'Motion off. The anatomical colours stay.');
    renderLayerRail();
  };
}

async function cycleLayer(key, btn) {
  if (btn && btn.dataset.busy === '1') return;
  const next = LAYER_CYCLE[layerState[key] || 'off'];
  const model = STRUCTURE_MODELS[layerOf(key)];
  const needsLoad = next !== 'off' && layerOf(key) !== 'skeleton' && !(window.__osteo && window.__osteo.layerLoaded(key));
  if (needsLoad && btn) { btn.dataset.busy = '1'; btn.querySelector('.cnt').textContent = '···'; }
  try {
    if (!window.__osteo) { toast('Open the 3D model first.'); return; }
    if (next === 'off') {
      await window.__osteo.setLayer(key, false);
    } else {
      const ok = await window.__osteo.setLayer(key, true, model ? model.file : null);
      if (!ok) return;
      window.__osteo.setLayerOpacity(key, next === 'ghost' ? GHOST_OPACITY : 1);
    }
    layerState[key] = next;
  } finally {
    if (btn) { btn.dataset.busy = '0'; }
    renderLayerRail();
    if (window.__osteo && window.__osteo.refreshStudyPool) window.__osteo.refreshStudyPool();
  }
}
