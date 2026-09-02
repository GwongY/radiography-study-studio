/*
 * Session engine
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, ITEM_TYPES, STUDY_ITEMS, STUDY_MODES, describeSource, entryStep, esc, getItem, priorOf, questionsOf, ui } from './imports.js';
import { REVEAL_STAGES, applyHTML, endSession, learnHTML, practiseHTML, rememberHTML, reviewHTML, wireApply, wirePractise, wireReveal, wireStageNav } from './layout-figures.js';
import { adjScore, itemAttempted, itemDue, itemLapses, store } from './storage-versioned-keys.js';
import { mountLessonVisual, releaseLessonVisual } from './lesson-visuals.js';
import { openSessionOverlay } from './navigation-five-destinations.js';
import { openSourceDialog } from './source-dialog.js';
import { saveContinue } from './spatial-overlay-controls.js';
import { toast } from './small-ui-helpers.js';
import { wireTerms } from './reading-help.js';

/* ------------------------------------------------------------------ *
 * Session engine
 * ------------------------------------------------------------------ */

export const STEPS = [
  { id: 'learn', label: 'Learn', copy: 'Read the teaching explanation and the key facts.' },
  { id: 'remember', label: 'Remember', copy: 'Memory Coach — hints revealed one stage at a time.' },
  { id: 'practise', label: 'Practise', copy: 'Answer, then see why.' },
  { id: 'apply', label: 'Apply', copy: 'Use the idea on something you have not seen.' },
  { id: 'review', label: 'Review', copy: 'Confirm what was scheduled and what to fix.' },
];


export function pickItems(opts) {
  const now = Date.now();
  let pool = STUDY_ITEMS.slice();
  if (opts.subject) pool = pool.filter((i) => i.subject === opts.subject);
  if (opts.unit) pool = pool.filter((i) => i.unit === opts.unit);

  const unseen = pool.filter((i) => !itemAttempted(i.id));
  const due = pool.filter((i) => itemAttempted(i.id) && itemDue(i.id, now));
  const byWeak = (a, b) => (adjScore(a) - adjScore(b)) || (itemLapses(b.id) - itemLapses(a.id));
  const shuffle = (arr) => arr.map((v) => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map((p) => p[1]);

  switch (opts.mode) {
    case 'ids':
      /* The order is the caller’s: a week’s reading list is a sequence,
         not a pool to shuffle. Unknown ids drop out silently rather than
         emptying the session -- work/schedule-check.mjs is what stops them
         being unknown in the first place. */
      return (opts.ids || []).map(getItem).filter(Boolean);
    case 'new': {
      /* Revision dressed as novelty is still revision: prior-knowledge items
         fill the tail of this queue only once the genuinely new ones run out. */
      const novel = unseen.filter((i) => !priorOf(i));
      const revision = unseen.filter((i) => priorOf(i));
      return [...shuffle(novel), ...shuffle(revision)].slice(0, 8);
    }
    case 'weakest':
      return pool.filter((i) => itemAttempted(i.id)).sort(byWeak).slice(0, opts.limit || 10);
    case 'quick10': {
      /*
       * Due work first, then new material to fill the gap. The old version took
       * four due plus two unseen and stopped, so on a fresh install -- when
       * nothing can be due yet -- a session advertised as ten minutes handed
       * over two items. It under-delivered worst exactly when someone was
       * trying the app for the first time.
       */
      const QUICK = 6;
      const picked = due.sort(byWeak).slice(0, 4);
      const room = QUICK - picked.length;
      if (room > 0) picked.push(...shuffle(unseen).slice(0, room));
      /* still short (everything seen, little due)? top up with the weakest. */
      if (picked.length < QUICK) {
        const have = new Set(picked.map((i) => i.id));
        picked.push(...pool.filter((i) => itemAttempted(i.id) && !have.has(i.id)).sort(byWeak).slice(0, QUICK - picked.length));
      }
      return picked.slice(0, QUICK);
    }
    case 'exam': {
      const examItems = pool.filter((i) => questionsOf(i).some((q) => q.src && (q.type === 'mcq' || q.type === 'cloze')));
      return shuffle(examItems).slice(0, 10);
    }
    case 'hooks':
      return shuffle(pool.filter((i) => i.memory && Object.keys(i.memory).length)).slice(0, 12);
    case 'mistakes': {
      const ids = [...new Set(store.mistakes.map((m) => m.itemId))];
      return ids.map(getItem).filter(Boolean).filter((i) => !opts.subject || i.subject === opts.subject).slice(0, 12);
    }
    case 'daily': {
      const grab = (subject, unit, n) => shuffle(STUDY_ITEMS.filter((i) => i.subject === subject && (!unit || i.unit === unit))).sort((a, b) => (itemDue(b.id) - itemDue(a.id))).slice(0, n);
      return [
        ...grab('HSS2011', 'hss.term', 2),
        ...grab('HSS2011', 'hss.osteo', 3),
        ...grab('ABCT2326', null, 2),
        ...grab('HTI17103', null, 1),
      ];
    }
    case 'mixed':
      return shuffle(STUDY_ITEMS.filter((i) => ['HSS2011', 'ABCT2326', 'HTI17103', 'DSAI1202'].includes(i.subject))).slice(0, 14);
    case 'subject':
    default: {
      /* Study this topic walks the whole topic in the weakest-first order the
         list already shows -- no shuffle, no 12-item cap. */
      return pool.slice().sort(byWeak);
    }
  }
}

export function startSession(opts) {
  const items = pickItems(opts).filter(Boolean);
  if (!items.length) {
    if (opts.mode === 'mistakes') return toast('No mistakes recorded yet — nothing to explain.');
    if (opts.mode === 'new') return toast('Every item has been seen at least once. Try "Review my weakest topics".');
    return toast('Nothing to study for that selection yet.');
  }
  const mode = STUDY_MODES.find((m) => m.id === opts.mode);
  const hooksOnly = opts.mode === 'hooks';
  const first = items[0];
  ui.session = {
    opts, mode, items, index: 0, step: hooksOnly ? 'remember' : entryStep(first, itemAttempted(first.id)),
    /* Hooks-only is a browsing mode, so open every hint straight away. */
    reveal: hooksOnly ? REVEAL_STAGES.length : 0,
    qIndex: 0, answered: false, startedAt: 0,
    results: [], hooksOnly,
  };
  ui.session.modeLabel = mode ? mode.label : 'Study session';
  openSessionOverlay();
  renderStep();
}

function currentItem() { return ui.session.items[ui.session.index]; }

/*
 * Moving to the next item. The footer control and the review card's own button
 * both land here, so where an item opens is decided once: material a previous
 * syllabus already covered opens on Practise to be verified, everything else
 * opens on Learn to be taught.
 */
export function advanceItem() {
  ui.session.index += 1; ui.session.qIndex = 0; ui.session.seqOrder = null; ui.session.matchRights = null;
  ui.session.diagramTarget = null; ui.session.diagramReveal = null;
  if (window.__osteo && window.__osteo.endMovement) {
    window.__osteo.endMovement();
    const b = $$('mvBar'); if (b) b.classList.add('hidden');
    const bk = $$('mvBackToSession'); if (bk) bk.classList.add('hidden');
  }
  const next = ui.session.items[ui.session.index];
  setStep(ui.session.hooksOnly ? 'remember' : entryStep(next, itemAttempted(next.id)));
}

export function setStep(step) {
  /* Step buttons stay in the DOM after a session ends; ignore late clicks. */
  if (!ui.session) return;
  ui.session.step = step;
  if (ui.session.items[ui.session.index]) saveContinue(ui.session.items[ui.session.index].id, step);
  ui.session.reveal = ui.session.hooksOnly ? REVEAL_STAGES.length : 0;
  ui.session.answered = false;
  if (step === 'practise' || step === 'apply') ui.session.startedAt = performance.now();
  renderStep();
}

function renderSteps() {
  const el = $$('rssSteps');
  const order = STEPS.map((s) => s.id);
  el.innerHTML = STEPS.map((s) => {
    const done = order.indexOf(s.id) < order.indexOf(ui.session.step);
    return `<button class="step ${s.id === ui.session.step ? 'active' : ''} ${done ? 'done' : ''}" data-step="${s.id}"><b>${esc(s.label)}</b>${esc(s.copy)}</button>`;
  }).join('');
  el.querySelectorAll('[data-step]').forEach((b) => { b.onclick = () => setStep(b.dataset.step); });
}

function renderSessionMeter() {
  const total = ui.session.items.length;
  const n = ui.session.index + 1;
  $$('rssSessionCount').textContent = `${n}/${total}`;
  $$('rssSessionMeta').textContent = `Item ${n} of ${total} \u00b7 ${ui.session.modeLabel || 'Session'}`;
  $$('rssSessionBar').style.width = `${Math.round((ui.session.index / total) * 100)}%`;
}

/* The source trace is inline under every item now, not a side card. */
function renderSourceCard(item) {
  const refs = item.sourceRefs || [];
  const first = refs.length ? describeSource(refs[0]) : null;
  const btn = $$('rssSourceInline');
  const extra = refs.length > 1 ? ` \u00b7 +${refs.length - 1} more` : '';
  btn.textContent = first ? first.file + (first.authored ? ' (app-authored)' : '') + extra : 'No reference';
  btn.onclick = () => openSourceDialog(item);
}


/* One consistent advance control. The per-step buttons the HTML builders
   emit are removed so there is never a second Next in the card. */
export function renderSessionFoot(item) {
  $$('rssStage').querySelectorAll('[data-nav], #rssNextItem, #rssFinish').forEach((b) => {
    const wrap = b.closest('.rss-actions');
    b.remove();
    if (wrap && !wrap.querySelector('button')) wrap.remove();
  });
  const order = STEPS.map((x) => x.id);
  const at = order.indexOf(ui.session.step);
  const lastStep = at === order.length - 1;
  const lastItem = ui.session.index >= ui.session.items.length - 1;
  const btn = $$('rssNextStep');
  if (!lastStep) {
    btn.textContent = `Next: ${STEPS[at + 1].label} \u2192`;
    btn.onclick = () => setStep(order[at + 1]);
  } else if (!lastItem) {
    btn.textContent = 'Finish \u00b7 next item \u2192';
    btn.onclick = advanceItem;
  } else {
    btn.textContent = 'Finish session \u2192';
    btn.onclick = endSession;
  }
  $$('rssFootHint').textContent = lastStep ? 'Review scheduled from your answers' : 'Autosaves as you go';
}
export function renderStep() {
  const item = currentItem();
  const stepDef = STEPS.find((x) => x.id === ui.session.step) || STEPS[0];
  $$('rssSessionKicker').textContent = stepDef.label;
  renderSteps();
  renderSessionMeter();
  renderSourceCard(item);
  const stage = $$('rssStage');
  if (ui.session.step === 'learn') { stage.innerHTML = learnHTML(item); mountLessonVisual(item); }
  else if (ui.session.step === 'remember') { releaseLessonVisual(); stage.innerHTML = rememberHTML(item); wireReveal(item); }
  else if (ui.session.step === 'practise') { releaseLessonVisual(); stage.innerHTML = practiseHTML(item); wirePractise(item); }
  else if (ui.session.step === 'apply') { releaseLessonVisual(); stage.innerHTML = applyHTML(item); wireApply(item); }
  else { releaseLessonVisual(); stage.innerHTML = reviewHTML(item); }
  wireStageNav(item);
  wireTerms($$('rssStage'));
  renderSessionFoot(item);
}

export function typeLabel(t) { return (ITEM_TYPES[t] || {}).label || t; }
