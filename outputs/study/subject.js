/*
 * Subject
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, FLOW_CLASSES, ITEM_TYPES, LAYER_CLASSES, MESH_INDEX, RATES, SOURCE_FILES, SOURCE_ROOTS, STRUCTURE_MODELS, SUBJECTS, SYSTEMS, UNITS, describeSource, esc, itemsForUnit, layerOf, priorOf, systemCounts, tierFor, ui } from './imports.js';
import { adjScore, itemAttempted, itemScore, read } from './storage-versioned-keys.js';
import { goTo, setActiveNav } from './navigation-five-destinations.js';
import { leaveProjection } from './what-is-under.js';
import { showView, toast } from './small-ui-helpers.js';
import { startSession } from './session-engine.js';
import { studyItemWithin } from './global-search-one.js';

/* ------------------------------------------------------------------ *
 * Subject
 * ------------------------------------------------------------------ */

function fileRowsHTML(refs) {
  return `<div class="filelist">${refs.map((r) => {
    const s = SOURCE_FILES[r];
    if (!s) return '';
    return `<div class="filerow"><div class="fn">${esc(s.file)}</div><div class="fp">${esc((SOURCE_ROOTS[s.root] || s.root) + ' / ' + s.folder)} · ${esc(s.kind)}${s.note ? ' · ' + esc(s.note) : ''}</div></div>`;
  }).join('')}</div>`;
}

const SUBJECT_GROUP = { HSS2011: { label: 'Anatomy', accent: '#72e3cf' }, ABCT2326: { label: 'Physiology', accent: '#ffba67' }, HTI17103: { label: 'Radiation science', accent: '#8ea9ff' }, DSAI1202: { label: 'AI & data', accent: '#7fd1a0' } };
const LEARN_FILTERS = [['all', 'Everything'], ['Anatomy', 'Anatomy'], ['Physiology', 'Physiology'], ['Radiation science', 'Radiation science'], ['AI & data', 'AI & data'], ['3d', 'Has 3D / images']];

/*
 * A "topic" is one subject.unit that actually has study items.
 *
 * TWO gates, and the second one used to be described as the only one. A unit
 * with no items drops out below; a subject with no SUBJECT_GROUP entry never
 * gets that far. The comment here claimed subjects dropped out on their own,
 * which was true only while the subjects lacking a group also lacked items --
 * DSAI1202 gained items and stayed invisible until it was given a group.
 * Adding a subject to the tree means adding it to SUBJECT_GROUP and, if it
 * deserves its own chip, to LEARN_FILTERS.
 */
export function topicsWithContent() {
  const list = [];
  for (const subject of SUBJECTS) {
    const group = SUBJECT_GROUP[subject.id];
    if (!group) continue;
    for (const unit of subject.units) {
      const items = itemsForUnit(subject.id, unit.id);
      if (!items.length) continue;
      list.push({ subject, unit, group, items });
    }
  }
  return list;
}
function topicHasViewer(items) { return items.some((i) => ['id3d', 'structure', 'movement', 'diagram'].includes(i.type)); }
function topicPct(items) { return items.length ? Math.round(items.reduce((n, i) => n + itemScore(i.id), 0) / items.length * 100) : 0; }

export function renderLearn() {
  leaveProjection();
  setActiveNav('learn');
  const visible = topicsWithContent().filter((t) => ui.learnFilter === 'all' || (ui.learnFilter === '3d' ? topicHasViewer(t.items) : t.group.label === ui.learnFilter));
  if (!ui.learnTopic || !visible.some((t) => t.unit.id === ui.learnTopic)) ui.learnTopic = visible[0] ? visible[0].unit.id : null;

  $$('learnFilters').innerHTML = LEARN_FILTERS.map(([id, label]) =>
    `<button class="filter-chip${ui.learnFilter === id ? ' active' : ''}" data-filter="${esc(id)}">${esc(label)}</button>`).join('');
  $$('learnFilters').querySelectorAll('[data-filter]').forEach((b) => { b.onclick = () => { ui.learnFilter = b.dataset.filter; renderLearn(); }; });

  $$('topicGrid').innerHTML = visible.map((t) => `
    <button class="topic-card${t.unit.id === ui.learnTopic ? ' active' : ''}" style="--accent:${t.group.accent}" data-topic="${esc(t.unit.id)}">
      <span class="topic-tag">${esc(t.group.label)} \u00b7 ${esc(t.subject.code)}</span>
      <span class="editorial" style="font-size:17px">${esc(t.unit.label)}</span>
      <span class="topic-bar"><span style="width:${topicPct(t.items)}%"></span></span>
      <span class="small">${t.items.length} item${t.items.length === 1 ? '' : 's'}${topicHasViewer(t.items) ? ' \u00b7 3D studio' : ''}</span>
    </button>`).join('') || '<div class="empty">No topics match this filter yet.</div>';
  $$('topicGrid').querySelectorAll('[data-topic]').forEach((b) => { b.onclick = () => { ui.learnTopic = b.dataset.topic; ui.learnDrill = true; renderLearn(); }; });

  const T = visible.find((t) => t.unit.id === ui.learnTopic);
  $$('topicDetailPane').innerHTML = !T ? '' : `
    <div class="card" style="animation:fadeUp .22s ease;--accent:${T.group.accent}">
      <span class="topic-tag">${esc(T.group.label)} \u00b7 ${esc(T.subject.code)}</span>
      <h2 class="editorial" style="font-size:22px;margin:7px 0 0">${esc(T.unit.label)}</h2>
      <p class="small" style="margin-top:7px">${esc(T.subject.blurb)}</p>
      <div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap">
        <button class="primary" id="studyTopicBtn">Study this topic</button>
        ${topicHasViewer(T.items) ? '<button class="ghost" id="openViewerBtn">Open in Viewer</button>' : ''}
      </div>
      <div class="task-kicker" style="margin:18px 0 8px">${T.items.length} items \u00b7 weakest first</div>
      <div style="display:grid;gap:7px">
        ${T.items.slice().sort((a, b) => adjScore(a) - adjScore(b)).map((i) => {
          const attempted = itemAttempted(i.id);
          const assumed = !attempted ? priorOf(i) : null;
          /* Assumed items are ringed in the dim colour: those marks are carried
             over from another syllabus, not earned against this one. */
          const tier = tierFor(adjScore(i), attempted || !!assumed);
          const color = assumed ? 'var(--dim)' : tier >= 3 ? 'var(--green)' : tier === 2 ? 'var(--orange)' : 'var(--red)';
          const sub = (ITEM_TYPES[i.type] || {}).label || i.type;
          return `<button class="unit-row" data-item="${esc(i.id)}"><span class="grow"><b>${esc(i.title)}</b><small>${esc(sub)}${assumed ? esc(' · assumed from ' + assumed.short + ', unverified') : ''}</small></span><span class="mono" style="color:${color}">${'\u25cf'.repeat(tier)}${'\u25cb'.repeat(4 - tier)}</span></button>`;
        }).join('')}
      </div>
      <div class="small" style="margin-top:14px;padding-top:12px;border-top:1px solid var(--line)">Sourced from <span style="color:var(--teal)">${esc(describeSource(T.items[0].sourceRefs[0]).file)}</span> \u00b7 every item carries its own reference</div>
    </div>`;
  if ($$('studyTopicBtn')) $$('studyTopicBtn').onclick = () => startSession({ mode: 'subject', subject: T.subject.id, unit: T.unit.id });
  if ($$('openViewerBtn')) $$('openViewerBtn').onclick = () => goTo('viewer');
  /*
   * A row in the item list opens THAT item.
   *
   * It used to throw away data-item and start the ordinary topic session, whose
   * queue is due-first and then shuffled -- so tapping the sixth row opened
   * whichever item the shuffle happened to put in front, and the list read as
   * broken. The clicked item leads; the rest of the topic follows behind it in
   * the order the list is already showing, so "next" still walks the topic.
   */
  $$('topicDetailPane').querySelectorAll('[data-item]').forEach((b) => {
    b.onclick = () => studyItemWithin(T, b.dataset.item);
  });

  $$('learnGrid').classList.toggle('drilled', ui.learnDrill);
  $$('navBackBtn').classList.toggle('hidden', !ui.learnDrill);
  showView('learnView');
}

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
 * Layers load on demand. Precaching six models is ~37 MB of download for
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
export let layerState = { skeleton: 'solid' };

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

export function renderLayerRail() {
  const rail = $$('layerRail');
  if (!rail) return;
  const live = !!(window.__osteo && window.__osteo.physiologyOn && window.__osteo.physiologyOn());
  rail.innerHTML = `<button class="livechip" id="liveChip" data-on="${live ? 1 : 0}" aria-pressed="${live}">
      <span class="pulse"></span><span>${live ? 'Live physiology' : 'Static model'}</span>
    </button>` + BODY_LAYERS.map((l, i) => {
    const st = layerState[l.key] || 'off';
    /* Chips that share one GLB are marked as a group, so twelve chips read as
       seven models rather than twelve peers -- and so it is visible that the
       first tap on any of the three vessel chips is the same one download. */
    const group = BODY_LAYERS.filter((x) => x.layer === l.layer).length > 1;
    const sub = !group ? '' : ` data-sub="${BODY_LAYERS.findIndex((x) => x.layer === l.layer) === i ? 'first' : 'more'}"`;
    return `<button class="layerchip" data-layer="${esc(l.key)}" data-state="${st}"${sub} aria-pressed="${st !== 'off'}">
      <span class="dot"></span><span>${esc(l.label)}</span><span class="cnt" title="${layerCourseCount(l.key)} named by your course · ${layerCount(l.key)} modelled · ${layerUnitCount(l.key)} separately selectable">${layerCourseCount(l.key)}<i>/${layerCount(l.key)}</i></span>
    </button>`;
  }).join('') + '<div class="layerhint">tap to cycle · solid → ghost → off</div>' + renderFlowKey();
  rail.querySelectorAll('[data-layer]').forEach((b) => { b.onclick = () => cycleLayer(b.dataset.layer, b); });
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
  const needsLoad = next !== 'off' && key !== 'skeleton' && !(window.__osteo && window.__osteo.layerLoaded(key));
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
