/*
 * Layout figures
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, DIAGRAMS, MASTERY_DIMENSIONS, MEMORY_METHODS, REVEAL_MODES, STRUCTURE_MODELS, decompose, describeSource, dimensionFor, esc, getSubject, isDelayedAttempt, jointMovement, layoutFor, moduleInfo, priorOf, questionsOf, readingOf, schedule, structureSet, ui } from './imports.js';
import { K, getMastery, itemAttempted, logMistake, read, setMastery, store, write } from './storage-versioned-keys.js';
import { advanceItem, renderSessionFoot, renderStep, setStep, typeLabel } from './session-engine.js';
import { closeSessionOverlay } from './navigation-five-destinations.js';
import { glossify, lookupTerm, plateHTML, proseHTML, wireTerms } from './reading-help.js';
import { openSourceDialog } from './source-dialog.js';
import { openViewer } from './what-is-under.js';
import { priorLeadHTML, visualSlotHTML } from './lesson-visuals.js';
import { renderToday } from './spatial-overlay-controls.js';
import { showView, toast, xrayFallback } from './small-ui-helpers.js';

/* ------------------------------------------------------------------ *
 * Layout figures
 *
 * The replacement for the hand-plotted SVG layouts. Cards size themselves to
 * their text, so the overflow that was measured at up to 15.4px is not a bug
 * that got fixed -- it is a bug that can no longer be expressed.
 * ------------------------------------------------------------------ */

const LAY_TONE = { teal: 'var(--teal)', orange: 'var(--orange)', blue: 'var(--blue)',
  red: 'var(--red)', green: 'var(--green)', dim: 'var(--dim)' };

function layCard(c) {
  const tone = LAY_TONE[c.tone] || LAY_TONE.teal;
  return `<div class="lay-card" style="--tone:${tone}"><b>${glossify(esc(c.t))}</b>${
    c.b ? `<span>${glossify(esc(c.b))}</span>` : ''}</div>`;
}

function layBlock(b) {
  switch (b.type) {
    case 'heading':
      return `<div class="lay-h">${esc(b.text)}</div>`;
    case 'row':
      return `<div class="lay-row${b.dense ? ' dense' : ''}">${b.cards.map(layCard).join('')}</div>`;
    case 'stack':
      return `<div class="lay-stack">${b.cards.map(layCard).join('')}</div>`;
    case 'flow':
      return `<div class="lay-flow">${b.cards.map(layCard).join('<span class="lay-arrow">\u2192</span>')}</div>`;
    case 'terms':
      return `<div class="termgrid">${b.pairs.map(([term, gloss]) => {
        const hit = lookupTerm(term);
        const tag = hit ? 'button' : 'span';
        const attrs = hit ? ` type="button" data-term="${esc(term)}"` : '';
        return `<${tag} class="gt"${attrs}><b>${esc(term)}</b><span>${esc(gloss)}</span></${tag}>`;
      }).join('')}</div>`;
    case 'scale':
      return `<div><div class="lay-scale"><span class="end">${esc(b.from)}</span><span class="bar"></span><span class="end">${esc(b.to)}</span></div>${
        b.note ? `<div class="lay-note dim" style="margin-top:7px">${glossify(esc(b.note))}</div>` : ''}</div>`;
    case 'note':
    default:
      return `<div class="lay-note${b.dim ? ' dim' : ''}${b.tone ? ' tone' : ''}">${glossify(esc(b.text))}</div>`;
  }
}

export function layoutHTML(id, sc) {
  const lay = layoutFor(id);
  if (!lay) return '';
  return `<figure class="lessonvis" data-kind="layout">
    <div class="lessonvis-head"><span class="lessonvis-kick">Drawn by this app</span><span class="lessonvis-title">${esc(sc.title)}</span></div>
    <div class="lay">${lay.blocks.map(layBlock).join('')}</div>
    <figcaption class="lessonvis-cap">${esc(sc.caption)}
      <span class="figcredit">A layout, not a depiction \u2014 no anatomy is being drawn to scale here.</span>
    </figcaption>
  </figure>`;
}

/* Where in the HSS2011 course this lesson sits — app-authored framing, not a source claim. */
function moduleLine(item) {
  const m = moduleInfo(item);
  if (!m) return '';
  return `<div class="moduleline"><span class="apptag">App note</span>From <strong>Module ${m.n}</strong> · ${esc(m.name)} — ${esc(m.plain)}</div>`;
}

/* App-authored plain-English lead — a hook for dense lessons so the sourced
   explanation below has something to hang on. Tagged; not a source claim.
   Glossified like key facts so the hard words stay tappable here too. */
function plainLeadHTML(item) {
  const p = item.lesson && item.lesson.plain;
  if (!p) return '';
  return `<div class="plainlead"><span class="apptag">App note</span> ${glossify(esc(p))}</div>`;
}

/*
 * Key-facts block. Structure-set lessons carry a grouped form — an app-authored
 * hook with the organising idea (tagged APP NOTE, a study device not a source
 * claim), then the members under the group headings that already exist in the
 * data. Every other lesson renders the flat list unchanged. Member strings stay
 * glossified either way so the hard words remain tappable.
 */
function factsHTML(item) {
  const lesson = item.lesson || {};
  const groups = lesson.keyFactsGroups;
  if (groups && groups.length) {
    const hook = lesson.hook
      ? `<div class="hook"><span class="apptag">App note</span> The idea to hang it on: ${glossify(esc(lesson.hook))}</div>`
      : '';
    const blocks = groups.map((bucket) => `<div class="factgroup"><div class="factgroup-head">${esc(bucket.group)}</div>`
      + `<ul class="facts">${bucket.items.map((f) => `<li>${glossify(esc(f))}</li>`).join('')}</ul></div>`).join('');
    return `${hook}<div class="subhead">Key facts to remember</div>${blocks}`;
  }
  return lesson.keyFacts && lesson.keyFacts.length
    ? `<div class="subhead">Key facts to remember</div><ul class="facts">${lesson.keyFacts.map((f) => `<li>${glossify(esc(f))}</li>`).join('')}</ul>` : '';
}

export function learnHTML(item) {
  const subject = getSubject(item.subject);
  const prior = priorOf(item);
  const facts = factsHTML(item);
  const examples = item.lesson.examples && item.lesson.examples.length
    ? `<div class="subhead">Examples</div><ul class="facts">${item.lesson.examples.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>` : '';
  const teaching = prior
    ? `${plainLeadHTML(item)}${priorLeadHTML(item, prior)}${facts}${examples}
    <details class="priorback"><summary>${esc(prior.short)}-level background — the part you already have</summary>${proseHTML(item.lesson.explanation)}</details>`
    : `${plainLeadHTML(item)}${proseHTML(item.lesson.explanation)}${facts}${examples}`;
  /*
   * "Skills to build" — app-authored and content-embedded: each entry is an
   * insight that lives inside this item's own knowledge — a misconception
   * with its correction, a distinction with the discriminator that separates
   * it, a discrimination pattern, a trap in an otherwise reasonable
   * assumption — never generic how-to-study advice. Tagged App note because
   * the insight framing is study scaffolding, even though every fact it
   * turns is source-traced on this card.
   */
  const skillsBlock = item.skills && item.skills.length
    ? `<div class="subhead">Skills to build with this content</div><ul class="facts">${item.skills.map((s) => `<li>${glossify(esc(s))}</li>`).join('')}</ul><p class="small" style="color:var(--muted);margin-top:8px"><span class="apptag">App note</span> Written by this app from the content above. The facts are the sourced ones; the insight framing is study scaffolding.</p>`
    : '';
  return `<div class="lesson">
    <div class="eyebrow" style="color:${subject ? subject.accent : 'var(--teal)'}">${esc(subject ? subject.code : item.subject)} · ${esc(typeLabel(item.type))}</div>
    ${moduleLine(item)}
    <h2>${esc(item.title)}</h2>
    ${visualSlotHTML(item)}
    ${teaching}
    ${skillsBlock}
    ${item.lesson.studyNote ? `<div class="notice"><strong>Radiography study note — written by this app</strong>${esc(item.lesson.studyNote)}<p>This framing is not a claim from the supplied sources. The anatomy above is; this sentence is study scaffolding.</p></div>` : ''}
    ${plateHTML(item)}
    ${item.tags && item.tags.length ? `<div class="tagrow">${item.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>` : ''}
    <div class="rss-actions"><button class="primary" data-nav="remember">Give me the memory aids →</button><button class="ghost" data-nav="practise">Skip to practice</button></div>
  </div>`;
}

/*
 * The nine structure-set items carry no memory aids, so the first two stages
 * used to fall back on filler -- "Attach the fact to something you already know
 * well" is not a hint, it is a sentence shaped like one. They do carry
 * something better: each member has its own note off the lecture, and the
 * members are grouped. Those make an actual clue.
 */
function setHint(item, wantGroups) {
  const set = item.structureSet && structureSet(item.structureSet);
  if (!set) return null;
  const members = set.members || [];
  if (wantGroups) {
    const groups = [...new Set(members.map((m) => m.group).filter(Boolean))];
    if (groups.length > 1) return `${members.length} structures in ${groups.length} groups: ${groups.join(', ')}. Name the group first, then place the members inside it.`;
    if (members.length) return `${members.length} structures to name. Work round them in a fixed order every time, so the order itself becomes the cue.`;
    return null;
  }
  const withNote = members.filter((m) => m.note);
  if (!withNote.length) return null;
  const m = withNote[0];
  return `One to start you off — ${m.label}: ${m.note}`;
}

/*
 * A hint built from the word itself, for items whose memory aids run out.
 *
 * The app already carries an 814-stem word-part list; on an item called
 * "Radioulnar joints" that is a real clue -- radi/o + ulnar, so the name is
 * telling you which two bones -- and it beats the filler line that used to sit
 * here by a distance.
 */
function originHint(item) {
  const words = String(item.title || '').split(/[^A-Za-z]+/).filter((w) => w.length >= 8);
  for (const w of words) {
    const d = decompose(w);
    if (d) return `The name is doing the work: ${w.toLowerCase()} reads as ${readingOf(d)}.`;
  }
  return null;
}

/*
 * The stages are resolved together rather than independently: each one takes
 * the first of its candidates that no earlier stage has already claimed, so a
 * hint is never shown twice inside one ladder.
 */
export const REVEAL_STAGES = [
  { lab: 'Stage 1 — small clue',
    candidates: (item) => [
      { k: 'chunking', v: item.memory.chunking }, { k: 'wordOrigin', v: item.memory.wordOrigin },
      { k: 'location', v: item.memory.location }, { k: 'comparison', v: item.memory.comparison },
      { v: setHint(item, true) },
      { k: 'mnemonic', v: item.memory.mnemonic }, { k: 'firstLetter', v: item.memory.firstLetter },
      { k: 'visualCue', v: item.memory.visualCue }, { k: 'sequence', v: item.memory.sequence },
      { k: 'teachBack', v: item.memory.teachBack }, { v: originHint(item) },
    ],
    fallback: 'Start from the title and ask what category the answer belongs to.' },
  { lab: 'Stage 2 — memory hook',
    candidates: (item) => [
      { v: item.lesson.hook },
      { k: 'mnemonic', v: item.memory.mnemonic }, { k: 'firstLetter', v: item.memory.firstLetter },
      { k: 'visualCue', v: item.memory.visualCue }, { k: 'sequence', v: item.memory.sequence },
      { k: 'chunking', v: item.memory.chunking }, { v: setHint(item, false) }, { v: originHint(item) },
      { k: 'comparison', v: item.memory.comparison }, { k: 'wordOrigin', v: item.memory.wordOrigin },
      { k: 'location', v: item.memory.location }, { k: 'teachBack', v: item.memory.teachBack },
    ],
    fallback: 'Attach the fact to something you already know well.' },
  { lab: 'Stage 3 — before you move on',
    candidates: (item) => (item.commonMistakes || []).map((m) => ({ v: `Watch out: ${m}` })),
    fallback: 'Try to answer out loud before revealing anything. Producing the answer is the skill the exam tests — recognising it is not the same skill.' },
];

/*
 * Stage 3 is content-anchored, not generic: it shows this item's own common
 * confusions (authored in the corpus) as the trap to avoid, and only falls
 * back to a plain retrieval instruction when the item has none.
 */

const sameText = (a, b) => String(a).trim().toLowerCase().replace(/\s+/g, ' ') === String(b).trim().toLowerCase().replace(/\s+/g, ' ');

function stageTexts(item) {
  const out = new Array(REVEAL_STAGES.length).fill('');
  const usedKeys = new Set();
  const used = [];
  const claim = (i, cand) => {
    if (!cand || !cand.v || used.some((u) => sameText(u, cand.v))) return false;
    out[i] = cand.v;
    if (cand.k) usedKeys.add(cand.k);
    used.push(cand.v);
    return true;
  };
  REVEAL_STAGES.forEach((s, i) => {
    if (!s.candidates(item).some((c) => claim(i, c))) {
      out[i] = (typeof s.fallback === 'function' ? s.fallback(item) : s.fallback) || '';
    }
  });
  return { texts: out, usedKeys, used };
}

export function rememberHTML(item) {
  const hooks = Object.entries(item.memory || {}).filter(([, v]) => v);
  const { texts, usedKeys, used } = stageTexts(item);
  const stack = REVEAL_STAGES.map((s, i) =>
    `<div class="reveal ${i < ui.session.reveal ? 'open' : ''}" data-stage="${i}">
      <div class="lab">${esc(s.lab)}</div>
      <div class="txt">${i < ui.session.reveal ? glossify(esc(texts[i]))
        : '<em style="color:var(--muted)">Hidden — reveal only if you need it. Trying to retrieve first is what makes it stick.</em>'}</div>
    </div>`).join('');
  /*
   * The coach does not list every memory aid underneath the ladder any more —
   * that list repeated the very texts the stages reveal. Once the ladder is
   * fully open, only the hooks the stages did not already show appear here.
   * Hooks-only mode has no ladder, so it keeps the full list.
   */
  const moreHooks = ui.session.reveal >= REVEAL_STAGES.length
    ? hooks.filter(([k, v]) => v && !usedKeys.has(k) && !used.some((u) => sameText(u, v)))
    : [];
  const hooksList = (list) => `${list.map(([k, v]) => `<div class="hookcard"><div class="kind">${esc(MEMORY_METHODS[k] || k)}</div><div class="txt">${esc(v)}</div></div>`).join('')}
      <p class="small" style="color:var(--muted);margin-top:10px">Memory aids are written by this app. The facts they point at are the source-traced ones on the Learn card.</p>`;
  return `<div class="lesson">
    <div class="eyebrow">Memory Coach</div>
    <h2>${esc(item.title)}</h2>
    <p class="task-copy">${ui.session.hooksOnly ? 'Browsing memory hooks — nothing is scored in this mode.' : 'Hints come one stage at a time. Try to answer before opening the next one.'}</p>
    ${ui.session.hooksOnly ? '' : `<div class="reveal-stack">${stack}</div>`}
    <div class="rss-actions">
      ${ui.session.hooksOnly ? '' : `<button class="ghost" id="rssRevealBtn">${ui.session.reveal >= REVEAL_STAGES.length ? 'All hints shown' : 'Reveal next hint'}</button>`}
      ${ui.session.hooksOnly
        ? (ui.session.index >= ui.session.items.length - 1 ? '<button class="primary" id="rssFinish">Finish</button>' : '<button class="primary" id="rssNextItem">Next hook →</button>')
        : '<button class="primary" data-nav="practise">Test me →</button>'}
    </div>
    ${item.selfCheck ? `<div class="subhead" style="margin-top:14px">Prove it to yourself</div>
      <div class="hookcard"><div class="kind">Blank-page check · <span class="apptag">App note</span></div><div class="txt">${glossify(esc(item.selfCheck))}</div></div>` : ''}
    ${ui.session.hooksOnly
      ? (hooks.length ? `<div class="subhead">All memory aids for this item</div>${hooksList(hooks)}` : '<div class="emptybox" style="margin-top:14px">No memory aid authored for this item yet.</div>')
      : (moreHooks.length ? `<div class="subhead" style="margin-top:14px">More hooks for this item</div>${hooksList(moreHooks)}` : '')}
  </div>`;
}

export function wireReveal(item) {
  wireTerms($$('rssStage'));
  const b = $$('rssRevealBtn');
  if (!b) return;
  b.disabled = ui.session.reveal >= REVEAL_STAGES.length;
  b.onclick = () => { ui.session.reveal = Math.min(REVEAL_STAGES.length, ui.session.reveal + 1); renderStep(); };
}

/* ---------------- question rendering ---------------- */

function questionBody(q) {
  switch (q.type) {
    case 'mcq': case 'comparison':
      return `<div class="opts">${q.options.map((o, i) => `<button class="opt" data-opt="${i}">${esc(o)}</button>`).join('')}</div>`;
    case 'typed': case 'cloze': case 'landmark':
      return `<div class="typed-row"><input id="rssTypedInput" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${q.type === 'landmark' ? 'List the landmarks, separated by commas' : 'Type your answer'}"><button class="primary" id="rssTypedGo">Check</button></div>`;
    case 'sequence': {
      const order = ui.session.seqOrder || (ui.session.seqOrder = q.items.map((v, i) => i).sort(() => Math.random() - 0.5));
      return `<div class="seq-list" id="rssSeq">${order.map((oi, pos) => `<div class="seq-item" data-pos="${pos}"><span class="n">${pos + 1}</span><span class="grow">${esc(q.items[oi])}</span><span class="mv"><button data-up="${pos}" aria-label="Move up">↑</button><button data-down="${pos}" aria-label="Move down">↓</button></span></div>`).join('')}</div>
        <button class="primary" id="rssSeqGo">Check order</button>`;
    }
    case 'matching': {
      const rights = ui.session.matchRights || (ui.session.matchRights = q.pairs.map((p) => p[1]).sort(() => Math.random() - 0.5));
      return `<div class="match-grid" id="rssMatch">${q.pairs.map((p, i) => `<div class="match-row" data-row="${i}"><span class="lhs">${esc(p[0])}</span><select data-sel="${i}"><option value="">Choose…</option>${rights.map((r) => `<option value="${esc(r)}">${esc(r)}</option>`).join('')}</select></div>`).join('')}</div>
        <button class="primary" id="rssMatchGo" style="margin-top:10px">Check matches</button>`;
    }
    case 'diagram': {
      const d = DIAGRAMS[q.diagram];
      if (!d) return '<div class="emptybox">Diagram unavailable.</div>';
      const target = ui.session.diagramTarget ?? (ui.session.diagramTarget = Math.floor(Math.random() * q.labels.length));
      /*
       * Blank mode: labelled teaches, guided leaves a couple of anchors in,
       * blank tests. Defaults to blank so the question stays a question —
       * the learner opens the labelled view deliberately.
       */
      const reveal = ui.session.diagramReveal || (ui.session.diagramReveal = 'blank');
      const anchorCount = Math.max(1, Math.round(q.labels.length / 4));
      const named = (l, i) => reveal === 'labelled' || (reveal === 'guided' && i < anchorCount);
      const hotspots = q.labels.map((l, i) => {
        const pt = d.labels[l.id];
        if (!pt) return '';
        const text = named(l, i)
          ? `<text x="${pt[0] + 17}" y="${pt[1] + 4}" class="dlab">${esc(l.label)}</text>`
          : '';
        return `<circle class="hot" data-hot="${esc(l.id)}" cx="${pt[0]}" cy="${pt[1]}" r="13"></circle>${text}`;
      }).join('');
      const modeBtns = REVEAL_MODES.map((r) =>
        `<button class="conf ${reveal === r.id ? 'on' : ''}" data-reveal="${r.id}" title="${esc(r.hint)}">${esc(r.label)}</button>`).join('');
      return `<div class="conf-row" style="margin:0 0 10px"><span class="lab">View</span>${modeBtns}</div>
      <div class="diagram-wrap"><svg viewBox="${d.viewBox}" role="img" aria-label="${esc(d.title)}">
        ${d.shapes.map((s) => s.kind === 'ellipse' ? `<ellipse class="sk" cx="${s.cx}" cy="${s.cy}" rx="${s.rx}" ry="${s.ry}"/>`
          : s.kind === 'circle' ? `<circle class="sk" cx="${s.cx}" cy="${s.cy}" r="${s.r}" ${s.faint ? 'opacity=".4"' : ''}/>`
          : `<path class="sk" d="${s.d}"/>`).join('')}
        ${hotspots}
      </svg><p class="small" style="text-align:center;color:var(--muted);margin:8px 0 0">${esc(d.caption)}</p></div>
      <div class="q-prompt" style="font-size:15px">Click the hotspot for: <strong>${esc(q.labels[target].label)}</strong></div>`;
    }
    case 'movement': {
      const mv = jointMovement(q.movementId);
      if (!mv) return '<div class="emptybox">Movement unavailable.</div>';
      return `<div class="notice" style="margin-top:0"><strong>${esc(mv.joint)}</strong>${esc(mv.summary)}</div>
      <div class="mv-panel">
        <div class="mv-meta">
          <span><b>Range:</b> ${mv.range[0]}° to ${mv.range[1]}° — ${esc(mv.labels.min)} through ${esc(mv.labels.max)}</span>
          <span><b>Moves:</b> ${esc(mv.moves.slice(0,3).join(', '))}${mv.moves.length>3?` +${mv.moves.length-3} more`:''}</span>
          <span><b>Held still:</b> ${esc(mv.fixed.join(', '))}</span>
        </div>
        ${(mv.stages||[]).length?`<ul class="facts" style="margin-top:10px">${mv.stages.map(s=>`<li><strong>${s.at}°</strong> — ${esc(s.note)}</li>`).join('')}</ul>`:''}
        <p class="small" style="color:var(--muted);margin:11px 0 0">The controls live with the model — the render loop only runs while the studio is on screen, so a slider here would move bones you cannot see.</p>
      </div>
      <div class="rss-actions">
        <button class="primary" id="mvStudio">Open the studio and drive it →</button>
        <button class="ghost" id="mvDone">I can see how it moves</button>
        <button class="ghost" id="mvFail">I could not follow it</button>
      </div>`;
    }
    case 'structure': {
      const set = structureSet(q.setId);
      if (!set) return '<div class="emptybox">Structure set unavailable.</div>';
      const reveal = q.reveal || 'blank';
      const groups = [...new Set(set.members.map((mem) => mem.group))];
      const isNamed = (mem) => reveal === 'labelled' || (reveal === 'guided' && set.anchors.includes(mem.id));
      const rows = groups.map((g) => {
        const inGroup = set.members.filter((mem) => mem.group === g);
        return `<div class="subhead" style="margin:12px 0 6px">${esc(g)}</div>
          <div class="struct-grid">${inGroup.map((mem) => `
            <button class="struct" data-struct="${esc(mem.id)}" data-mesh="${esc(mem.mesh)}">
              <span class="n">${mem.order}</span>
              <span class="grow">${isNamed(mem) ? esc(mem.label) : '<em style="color:var(--muted)">tap to reveal</em>'}
                ${isNamed(mem) && mem.note ? `<small>${esc(mem.note)}</small>` : ''}</span>
              <span class="go">3D</span>
            </button>`).join('')}</div>`;
      }).join('');
      return `<div class="notice" style="margin-top:0"><strong>${esc(REVEAL_MODES.find((r) => r.id === reveal).label)} view</strong>${esc(REVEAL_MODES.find((r) => r.id === reveal).hint)}
        ${set.paired ? ' These are paired — the side is part of the answer.' : ''}</div>
      <div id="rssStructList">${rows}</div>
      <div class="rss-actions">
        <button class="ghost" id="rssStructStudio">Open the 3D studio</button>
        <button class="primary" id="rssStructDone">I identified them all</button>
        <button class="ghost" id="rssStructFail">I could not</button>
      </div>`;
    }
    case 'id3d': case 'laterality':
      return `<div class="notice"><strong>This one is best answered on the 3D skeleton</strong>Open the Osteology studio to find it on the model. If 3D is unavailable, answer from the landmark list instead — the explanation below covers both routes.</div>
        <div class="opts"><button class="opt" data-opt="0">I found it / I know where it is</button><button class="opt" data-opt="1">I could not place it</button></div>
        <div class="rss-actions"><button class="ghost" id="rssGoStudio">Open the 3D studio</button></div>`;
    case 'explain': case 'scenario':
      return `<div class="typed-row"><input id="rssTypedInput" autocomplete="off" placeholder="Answer in your own words, then check against the model answer"></div>
        <button class="primary" id="rssSelfGo" style="margin-top:9px">Show the model answer</button>`;
    default:
      return '<div class="emptybox">This question type is not renderable.</div>';
  }
}

export function practiseHTML(item) {
  const qs = questionsOf(item);
  if (!qs.length) return '<div class="emptybox">No practice questions on this item.</div>';
  const q = qs[Math.min(ui.session.qIndex, qs.length - 1)];
  ui.session.currentQ = q;
  /*
   * A prior-knowledge item with nothing recorded against it yet opened straight
   * onto this step. Say so, rather than leaving it looking like the lesson was
   * lost, and keep the lesson one click away for when the answer does not come.
   */
  const prior = priorOf(item);
  const verifying = prior && !itemAttempted(item.id)
    ? `<div class="priorbar"><div class="txt"><span class="kick">Verifying, not teaching</span>${esc(prior.label)} already covered this, so the session opens on the question.<p>Nothing is assumed about your answer — this is the first thing recorded for the item.</p></div><button class="ghost" id="rssPriorLesson">Show the lesson first</button></div>`
    : '';
  return `<div class="lesson">
    ${verifying}
    <div class="eyebrow">Practise · ${esc(typeLabel(q.type))} · question ${Math.min(ui.session.qIndex, qs.length - 1) + 1} of ${qs.length}</div>
    <div class="q-prompt">${glossify(esc(q.prompt))}</div>
    ${q.image ? `<img class="xray-img" src="assets/xray/${esc(q.image)}" alt="Radiograph" onerror="xrayFallback(this)">` : ''}
    <div id="rssQBody">${questionBody(q)}</div>
    <div id="rssVerdict"></div>
    <div class="rss-actions" id="rssPractiseNav"></div>
  </div>`;
}

function normalise(s) {
  return String(s).toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9;,\s]/g, ' ').replace(/\s+/g, ' ').trim();
}
function looseMatch(given, accepted) {
  const g = normalise(given);
  if (!g) return false;
  return accepted.some((a) => {
    const n = normalise(a);
    if (g === n) return true;
    /* multi-part answers: accept the same set of parts in any order */
    const gp = g.split(/[;,]\s*|\s+and\s+/).map((x) => x.trim()).filter(Boolean).sort();
    const np = n.split(/[;,]\s*|\s+and\s+/).map((x) => x.trim()).filter(Boolean).sort();
    if (np.length > 1 && gp.length === np.length && gp.every((x, i) => x === np[i])) return true;
    return false;
  });
}
function spellingNear(given, accepted) {
  const g = normalise(given);
  return accepted.some((a) => {
    const n = normalise(a);
    if (Math.abs(g.length - n.length) > 3) return false;
    let d = 0, i = 0, j = 0;
    while (i < g.length && j < n.length) {
      if (g[i] === n[j]) { i++; j++; continue; }
      d++; if (d > 2) return false;
      if (g.length > n.length) i++; else if (n.length > g.length) j++; else { i++; j++; }
    }
    return d + (g.length - i) + (n.length - j) <= 2;
  });
}

function verdictHTML(item, q, correct, extra) {
  const rationale = q.explanation || q.model || '';
  const srcBtn = q.src ? ` <button class="srcbtn" id="rssQSrc">Source for this answer</button>` : '';
  return `<div class="verdict ${correct ? 'ok' : 'no'}">
    <h4>${correct ? 'Correct' : 'Not right — here is why'}</h4>
    <div class="why">${glossify(esc(rationale))}${extra ? ' ' + extra : ''}</div>
    ${!correct && item.commonMistakes && item.commonMistakes.length ? `<ul class="mistakes">${item.commonMistakes.map((m) => `<li>${glossify(esc(m))}</li>`).join('')}</ul>` : ''}
    <div class="srcline"><span>Traced to ${esc(item.sourceRefs.map((r) => describeSource(r).file).join(', '))}</span><button class="srcbtn" id="rssVSrc">Open source dialog</button>${srcBtn}</div>
  </div>`;
}

function finishQuestion(item, q, correct, extra, conf = 2) {
  if (ui.session.answered) return;
  ui.session.answered = true;
  /* Read before scheduling: the first answer is what flips itemAttempted. */
  const untestedPrior = !!priorOf(item) && !itemAttempted(item.id);
  const ms = Math.max(400, performance.now() - ui.session.startedAt);
  const dim = dimensionFor(q);

  const priorRec = getMastery(item.id, dim);
  const rec = schedule(priorRec, { correct, confidence: conf, ms, expectedMs: q.type === 'explain' || q.type === 'scenario' ? 45000 : 14000 });
  setMastery(item.id, dim, rec);
  /*
   * Delayed recall is scored only when this is the first attempt after a real
   * gap — checked against the record as it stood before this attempt. Getting
   * it right three times in one sitting says nothing about surviving a night.
   */
  if (isDelayedAttempt(priorRec)) {
    const delayedRec = schedule(getMastery(item.id, 'delayedRecall'), { correct, confidence: conf, ms, expectedMs: 20000 });
    setMastery(item.id, 'delayedRecall', delayedRec);
  }
  if ((q.type === 'typed' || q.type === 'cloze' || q.type === 'landmark')) {
    const spellRec = schedule(getMastery(item.id, 'spelling'), { correct: correct && !extra, confidence: conf, ms, expectedMs: 14000 });
    setMastery(item.id, 'spelling', spellRec);
  }
  store.items[item.id] = { ...(store.items[item.id] || {}), status: correct ? 'review' : 'learning', seen: (store.items[item.id]?.seen || 0) + 1, lastSeen: Date.now() };
  write(K.items, store.items);
  if (!correct) logMistake({ itemId: item.id, qid: q.qid, type: q.type, prompt: q.prompt });
  ui.session.results.push({ itemId: item.id, qid: q.qid, correct, ms });

  $$('rssVerdict').innerHTML = verdictHTML(item, q, correct, extra);
  wireTerms($$('rssVerdict'));
  const vs = $$('rssVSrc'); if (vs) vs.onclick = () => openSourceDialog(item);
  const qs2 = $$('rssQSrc'); if (qs2) qs2.onclick = () => openSourceDialog(item, q);

  const qs = questionsOf(item);
  const nav = $$('rssPractiseNav');
  nav.innerHTML = ui.session.qIndex < qs.length - 1
    ? '<button class="primary" id="rssNextQ">Next question →</button><button class="ghost" data-nav="apply">Go to apply</button>'
    : '<button class="primary" data-nav="apply">Apply it →</button>';
  if (untestedPrior && !correct) {
    /* The assumption that this was already known has just failed, so put the
       lesson back in front of the one item that turned out to need it. */
    nav.insertAdjacentHTML('afterbegin', '<button class="ghost" id="rssPriorLesson">Read the lesson</button>');
    const pl = $$('rssPriorLesson');
    if (pl) pl.onclick = () => setStep('learn');
    toast('Carried over as known, but missed — worth reading the lesson on this one.');
  }
  const nq = $$('rssNextQ');
  if (nq) nq.onclick = () => { ui.session.qIndex += 1; ui.session.answered = false; ui.session.seqOrder = null; ui.session.matchRights = null; ui.session.diagramTarget = null; ui.session.diagramReveal = null; if (window.__osteo && window.__osteo.endMovement) { window.__osteo.endMovement(); const b=$$('mvBar'); if(b) b.classList.add('hidden'); const bk=$$('mvBackToSession'); if(bk) bk.classList.add('hidden'); } ui.session.startedAt = performance.now(); renderStep(); };
  wireStageNav(item);
}

/*
 * Route a structure to the right bundled model. The skeleton is already in the
 * scene; organ and circulatory models are fetched the first time one is asked for.
 */
/*
 * Arms the movement control bar inside the studio. The bar lives there rather
 * than on the question because the render loop only runs while the studio is
 * on screen — a slider next to the question would move bones nobody can see.
 */
function armMovementBar(mv, cameFromSession) {
  if (!window.__osteo) { toast('The 3D model is not available.'); return false; }
  window.__osteo.showSystem(null);
  const ok = window.__osteo.startMovement(mv);
  const bar = $$('mvBar');
  if (!ok) { bar.classList.add('hidden'); toast('Could not set that movement up on the model.'); return false; }

  bar.classList.remove('hidden');
  $$('mvBarTitle').textContent = mv.label;
  $$('mvBarMin').textContent = mv.labels.min;
  $$('mvBarMid').textContent = mv.labels.mid;
  $$('mvBarMax').textContent = mv.labels.max;
  const slider = $$('mvBarSlider');
  slider.min = String(mv.range[0]); slider.max = String(mv.range[1]); slider.value = String(mv.range[0]);
  slider.oninput = () => { const wanted = +slider.value; window.__osteo.setMovementAngle(wanted); };
  const play = $$('mvBarPlay');
  play.textContent = '▶ Play';
  play.onclick = () => {
    const st = window.__osteo.state.movement;
    if (!st) return;
    st.playing = !st.playing;
    play.textContent = st.playing ? '❚❚ Pause' : '▶ Play';
  };
  $$('mvBarStop').onclick = () => {
    const st = window.__osteo.state.movement;
    if (st) { st.playing = false; play.textContent = '▶ Play'; }
    window.__osteo.setMovementAngle(mv.range[0]);
  };
  const back = $$('mvBackToSession');
  back.classList.toggle('hidden', !cameFromSession);
  back.onclick = () => {
    window.__osteo.endMovement();
    bar.classList.add('hidden'); back.classList.add('hidden');
    if (ui.session) { showView('sessionView'); renderStep(); } else { renderToday(); }
  };
  return true;
}

function targetIn3D(set, member) {
  if (!window.__osteo) return;
  const modelKey = set.model || 'skeleton';
  if (modelKey === 'skeleton') { window.__osteo.showSystem(null); window.__osteo.selectMesh(member.mesh); return; }
  const model = STRUCTURE_MODELS[modelKey];
  if (!model) return;
  window.__osteo.selectInSystem(modelKey, model.file, member.mesh);
}

export function wirePractise(item) {
  const q = ui.session.currentQ;
  if (!q) return;
  /* Survives renderSessionFoot, which strips [data-nav] buttons out of the card. */
  const showLesson = $$('rssPriorLesson');
  if (showLesson) showLesson.onclick = () => setStep('learn');
  if (!ui.session.startedAt) ui.session.startedAt = performance.now();

  const lockOpts = (correctIdx, chosen) => {
    document.querySelectorAll('[data-opt]').forEach((b) => {
      const i = +b.dataset.opt;
      b.disabled = true;
      if (i === correctIdx) b.classList.add('right');
      else if (i === chosen) b.classList.add('wrong');
    });
  };

  if (q.type === 'mcq' || q.type === 'comparison') {
    document.querySelectorAll('[data-opt]').forEach((b) => {
      b.onclick = () => { const i = +b.dataset.opt; lockOpts(q.answer, i); finishQuestion(item, q, i === q.answer); };
    });
  } else if (q.type === 'typed' || q.type === 'cloze' || q.type === 'landmark') {
    const input = $$('rssTypedInput'); const go = $$('rssTypedGo');
    const submit = () => {
      const val = input.value;
      if (!val.trim()) return toast('Type an answer first — a guess still teaches you more than skipping.');
      let correct = looseMatch(val, q.accept);
      let extra = '';
      if (!correct && q.type === 'landmark') {
        const parts = normalise(val).split(/[;,]/).map((x) => x.trim()).filter(Boolean);
        const hits = q.accept.filter((a) => parts.some((p) => normalise(a).includes(p) || p.includes(normalise(a))));
        if (hits.length >= Math.ceil(q.accept.length / 2)) { correct = true; extra = `You named ${hits.length} of ${q.accept.length}.`; }
      }
      if (!correct && spellingNear(val, q.accept)) { correct = true; extra = `Spelling was off — the exact form is "${esc(q.accept[0])}".`; }
      input.disabled = true; go.disabled = true;
      if (!correct) extra = `You wrote "${esc(val.trim())}". Accepted: ${q.accept.map((a) => esc(a)).join(' / ')}.`;
      finishQuestion(item, q, correct, extra);
    };
    go.onclick = submit;
    input.onkeydown = (e) => { if (e.key === 'Enter') submit(); };
    input.focus();
  } else if (q.type === 'sequence') {
    const redraw = () => {
      const list = $$('rssSeq');
      list.innerHTML = ui.session.seqOrder.map((oi, pos) => `<div class="seq-item" data-pos="${pos}"><span class="n">${pos + 1}</span><span class="grow">${esc(q.items[oi])}</span><span class="mv"><button data-up="${pos}">↑</button><button data-down="${pos}">↓</button></span></div>`).join('');
      bindMoves();
    };
    const bindMoves = () => {
      document.querySelectorAll('[data-up]').forEach((b) => { b.onclick = () => { const p = +b.dataset.up; if (p > 0) { const a = ui.session.seqOrder; [a[p - 1], a[p]] = [a[p], a[p - 1]]; redraw(); } }; });
      document.querySelectorAll('[data-down]').forEach((b) => { b.onclick = () => { const p = +b.dataset.down; const a = ui.session.seqOrder; if (p < a.length - 1) { [a[p + 1], a[p]] = [a[p], a[p + 1]]; redraw(); } }; });
    };
    bindMoves();
    $$('rssSeqGo').onclick = () => {
      const correct = ui.session.seqOrder.every((oi, pos) => oi === pos);
      document.querySelectorAll('#rssSeq .seq-item').forEach((el, pos) => el.classList.add(ui.session.seqOrder[pos] === pos ? 'right' : 'wrong'));
      document.querySelectorAll('#rssSeq button').forEach((b) => { b.disabled = true; });
      $$('rssSeqGo').disabled = true;
      finishQuestion(item, q, correct, correct ? '' : `Correct order: ${q.items.map((x, i) => `${i + 1}. ${esc(x)}`).join(' → ')}.`);
    };
  } else if (q.type === 'matching') {
    $$('rssMatchGo').onclick = () => {
      const sels = [...document.querySelectorAll('[data-sel]')];
      if (sels.some((s) => !s.value)) return toast('Match every row before checking.');
      let allRight = true;
      sels.forEach((s) => {
        const i = +s.dataset.sel;
        const ok = s.value === q.pairs[i][1];
        if (!ok) allRight = false;
        s.closest('.match-row').classList.add(ok ? 'right' : 'wrong');
        s.disabled = true;
      });
      $$('rssMatchGo').disabled = true;
      finishQuestion(item, q, allRight, allRight ? '' : `Correct pairs: ${q.pairs.map((p) => `${esc(p[0])} → ${esc(p[1])}`).join('; ')}.`);
    };
  } else if (q.type === 'movement') {
    const mv = jointMovement(q.movementId);
    const studio = $$('mvStudio');
    if (studio) studio.onclick = () => { openViewer(); setTimeout(() => armMovementBar(mv, true), 500); };
    const finish = (correct) => {
      [$$('mvStudio'), $$('mvDone'), $$('mvFail')].forEach((b) => b && (b.disabled = true));
      finishQuestion(item, q, correct, correct ? '' : `Held still for reference: ${esc(mv.fixed.join(', '))}. Without a fixed bone there is nothing to see the movement against.`);
    };
    $$('mvDone').onclick = () => finish(true);
    $$('mvFail').onclick = () => finish(false);
  } else if (q.type === 'structure') {
    const set = structureSet(q.setId);
    const revealed = new Set();
    document.querySelectorAll('[data-struct]').forEach((b) => {
      b.onclick = () => {
        const mem = set.members.find((mm) => mm.id === b.dataset.struct);
        if (!mem) return;
        revealed.add(mem.id);
        b.classList.add('shown');
        b.querySelector('.grow').innerHTML = `${esc(mem.label)}${mem.note ? `<small>${esc(mem.note)}</small>` : ''}`;
        /* Tapping also drives the 3D model, so the name and the place arrive together. */
        targetIn3D(set, mem);
      };
    });
    const studio = $$('rssStructStudio');
    if (studio) studio.onclick = () => { openViewer(); targetIn3D(set, set.members[0]); };
    const finish = (correct) => {
      const missed = set.members.filter((mem) => !revealed.has(mem.id));
      const note = correct
        ? (revealed.size ? `You revealed ${revealed.size} of ${set.members.length} along the way.` : '')
        : `Still unnamed: ${missed.map((mem) => esc(mem.label)).join(', ') || 'none'}.`;
      document.querySelectorAll('[data-struct]').forEach((b) => { b.disabled = true; });
      $$('rssStructDone').disabled = true; $$('rssStructFail').disabled = true;
      finishQuestion(item, q, correct, note);
    };
    $$('rssStructDone').onclick = () => finish(true);
    $$('rssStructFail').onclick = () => finish(false);
  } else if (q.type === 'diagram') {
    const target = q.labels[ui.session.diagramTarget];
    document.querySelectorAll('[data-reveal]').forEach((b) => {
      b.onclick = () => {
        if (ui.session.answered) return;
        ui.session.diagramReveal = b.dataset.reveal;
        renderStep();
      };
    });
    document.querySelectorAll('[data-hot]').forEach((c) => {
      c.onclick = () => {
        if (ui.session.answered) return;
        const ok = c.dataset.hot === target.id;
        c.classList.add(ok ? 'right' : 'wrong');
        if (!ok) { const right = document.querySelector(`[data-hot="${target.id}"]`); if (right) right.classList.add('right'); }
        finishQuestion(item, q, ok, ok ? '' : `The highlighted hotspot is the ${esc(target.label)}.`);
      };
    });
  } else if (q.type === 'id3d' || q.type === 'laterality') {
    const studio = $$('rssGoStudio');
    if (studio) studio.onclick = () => { openViewer(); if (window.__osteo && q.boneId) window.__osteo.select(q.boneId); };
    document.querySelectorAll('[data-opt]').forEach((b) => {
      b.onclick = () => { const found = +b.dataset.opt === 0; document.querySelectorAll('[data-opt]').forEach((x) => { x.disabled = true; }); b.classList.add(found ? 'right' : 'wrong'); finishQuestion(item, q, found); };
    });
  } else if (q.type === 'explain' || q.type === 'scenario') {
    $$('rssSelfGo').onclick = () => {
      const val = ($$('rssTypedInput').value || '').trim();
      if (!val) return toast('Write something first — even a rough answer. Comparing beats reading.');
      $$('rssTypedInput').disabled = true;
      $$('rssSelfGo').disabled = true;
      const model = q.model || q.explanation;
      const rubric = q.rubric || [];
      $$('rssVerdict').innerHTML = `<div class="verdict"><h4>Compare with the model answer</h4><div class="why">${esc(model)}</div>
        ${rubric.length ? `<ul class="mistakes">${rubric.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>` : ''}
        <div class="conf-row"><span class="lab">Did you cover it?</span><button class="conf" id="rssSelfYes">Yes, I had it</button><button class="conf" id="rssSelfPart">Partly</button><button class="conf" id="rssSelfNo">No</button></div></div>`;
      const grade = (correct, note, conf) => finishQuestion(item, q, correct, note, conf);
      $$('rssSelfYes').onclick = () => grade(true, 'Self-graded as covered.', 2);
      $$('rssSelfPart').onclick = () => grade(false, 'Self-graded as partial — the points you missed are listed above.', 0);
      $$('rssSelfNo').onclick = () => grade(false, 'Self-graded as missed.', 0);
    };
  }
}

export function applyHTML(item) {
  const apps = item.application || [];
  if (!apps.length) return `<div class="lesson"><div class="eyebrow">Apply</div><h2>${esc(item.title)}</h2><div class="emptybox">No application task authored for this item.</div><div class="rss-actions"><button class="primary" data-nav="review">Go to review →</button></div></div>`;
  const a = apps[0];
  return `<div class="lesson">
    <div class="eyebrow">Apply · scenario</div>
    <h2>${esc(item.title)}</h2>
    <div class="q-prompt">${glossify(esc(a.prompt))}</div>
    <div class="typed-row"><input id="rssApplyInput" autocomplete="off" placeholder="Work it out in your own words"></div>
    <button class="primary" id="rssApplyGo" style="margin-top:9px">Show the model answer</button>
    <div id="rssApplyVerdict"></div>
    <div class="rss-actions" id="rssApplyNav"></div>
  </div>`;
}

export function wireApply(item) {
  const apps = item.application || [];
  if (!apps.length) return;
  const a = apps[0];
  if (!ui.session.startedAt) ui.session.startedAt = performance.now();
  const go = $$('rssApplyGo');
  go.onclick = () => {
    const val = ($$('rssApplyInput').value || '').trim();
    if (!val) return toast('Have a go first. Applying it badly and then correcting beats reading the answer.');
    $$('rssApplyInput').disabled = true; go.disabled = true;
    $$('rssApplyVerdict').innerHTML = `<div class="verdict"><h4>Model answer</h4><div class="why">${glossify(esc(a.model))}</div>
      <ul class="mistakes">${(a.rubric || []).map((r) => `<li>${glossify(esc(r))}</li>`).join('')}</ul>
      <div class="conf-row"><span class="lab">Did you get there?</span><button class="conf" id="rssAppYes">Yes</button><button class="conf" id="rssAppPart">Partly</button><button class="conf" id="rssAppNo">No</button></div></div>`;
    /*
     * Three buttons used to produce two outcomes -- "Partly" was scored exactly
     * as "No", which made the middle button a lie and put a lapse on the record
     * of someone who had most of it. Partly now counts as reached, but at the
     * lowest confidence, so it earns the shortest interval without the lapse
     * penalty that repeated failure carries.
     */
    const grade = (correct, conf) => {
      const ms = Math.max(800, performance.now() - ui.session.startedAt);
      for (const dim of ['application', 'explanation']) {
        setMastery(item.id, dim, schedule(getMastery(item.id, dim), { correct, confidence: conf, ms, expectedMs: 60000 }));
      }
      if (!correct) {
        logMistake({ itemId: item.id, qid: `${item.id}!app0`, type: 'scenario', prompt: a.prompt });
        /* So the Review step's missed-question recap includes the Apply miss. */
        ui.session.results.push({ itemId: item.id, qid: `${item.id}!app0`, correct, ms });
      }
      $$('rssApplyNav').innerHTML = '<button class="primary" data-nav="review">See what was scheduled →</button>';
      wireStageNav(item);
      toast(!correct ? 'Recorded — this one will come back sooner.'
        : conf >= 2 ? 'Application recorded.'
        : 'Recorded as partly — no mistake logged, but it comes back soon.');
    };
    wireTerms($$('rssApplyVerdict'));
    $$('rssAppYes').onclick = () => grade(true, 2);
    $$('rssAppPart').onclick = () => grade(true, 0);
    $$('rssAppNo').onclick = () => grade(false, 0);
  };
}

export function reviewHTML(item) {
  const mine = ui.session.results.filter((r) => r.itemId === item.id);
  const right = mine.filter((r) => r.correct).length;
  const recs = MASTERY_DIMENSIONS.map((d) => ({ d, rec: getMastery(item.id, d.id) })).filter((x) => x.rec && x.rec.attempts);
  const soonest = recs.length ? Math.min(...recs.map((x) => x.rec.due)) : 0;
  const days = soonest ? Math.max(0, Math.round((soonest - Date.now()) / 86400000)) : 0;
  const last = ui.session.index >= ui.session.items.length - 1;
  /*
   * The Review step recaps what actually went wrong in this session — the
   * exact questions missed, with their own explanations — rather than generic
   * study advice. Clean pass falls back to the item's authored confusions.
   */
  const qs = questionsOf(item);
  const appTask = (item.application || [])[0];
  const missedQs = mine.filter((r) => !r.correct)
    .map((r) => r.qid === `${item.id}!app0`
      ? { prompt: appTask ? appTask.prompt : '', why: appTask ? appTask.model : '' }
      : qs.find((q) => q.qid === r.qid))
    .filter(Boolean);
  const fixBlock = missedQs.length
    ? `<div class="subhead" style="margin-top:14px">What you missed — to fix before it comes back</div>
       <ul class="facts">${missedQs.map((q) => `<li><strong>${esc(q.prompt)}</strong><br>${esc(q.why)}</li>`).join('')}</ul>`
    : (item.commonMistakes && item.commonMistakes.length
      ? `<div class="subhead" style="margin-top:14px">Common confusions on this item</div><ul class="facts">${item.commonMistakes.map((m) => `<li>${esc(m)}</li>`).join('')}</ul>`
      : '');
  return `<div class="lesson">
    <div class="eyebrow">Review · scheduled</div>
    <h2>${esc(item.title)}</h2>
    <div class="body">${mine.length ? `You answered ${right} of ${mine.length} correctly on this item.` : 'No answers recorded for this item in this session.'}
      ${soonest ? (soonest <= Date.now() ? ' It stays in today’s queue.' : ` Next review in about ${days} day${days === 1 ? '' : 's'}.`) : ''}</div>
    ${fixBlock}
    ${item.selfCheck ? `<div class="subhead" style="margin-top:14px">Before it comes back</div>
      <div class="hookcard"><div class="kind">Blank-page check · <span class="apptag">App note</span></div><div class="txt">${glossify(esc(item.selfCheck))}</div></div>` : ''}
    <div class="rss-actions">
      ${last ? '<button class="primary" id="rssFinish">Finish session</button>' : '<button class="primary" id="rssNextItem">Next item →</button>'}
      <button class="ghost" data-nav="learn">Re-read the lesson</button>
    </div>
  </div>`;
}

export function wireStageNav(item) {
  document.querySelectorAll('#rssStage [data-nav]').forEach((b) => { b.onclick = () => setStep(b.dataset.nav); });
  const next = $$('rssNextItem');
  if (next) next.onclick = advanceItem;
  const fin = $$('rssFinish');
  if (fin) fin.onclick = endSession;
}

/*
 * A day streak that survives a gap is not a day streak.
 *
 * The old line incremented whenever the last session was on any earlier day,
 * so coming back after three weeks away read as one day longer rather than as
 * a broken run. The number is there to tell you something true about your
 * habit; inflating it makes it worth nothing.
 *
 * Same day  -> unchanged. Yesterday -> +1. Anything longer -> back to 1.
 * Exported shape kept simple and pure so it can be tested without a browser.
 */
function nextStreak(current, lastDay, today) {
  if (!lastDay) return 1;
  const gap = Math.round((Date.parse(today) - Date.parse(lastDay)) / 86400000);
  if (gap <= 0) return current || 1;
  if (gap === 1) return (current || 0) + 1;
  return 1;
}

export function endSession() {
  const right = ui.session.results.filter((r) => r.correct).length;
  const total = ui.session.results.length;
  const meta = store.meta || {};
  const today = new Date().toISOString().slice(0, 10);
  meta.sessionsDone = (meta.sessionsDone || 0) + 1;
  meta.streak = nextStreak(meta.streak, meta.lastSessionDay, today);
  meta.lastSessionDay = today;
  store.meta = meta; write(K.meta, meta);
  toast(total ? `Session done — ${right}/${total} correct. Reviews scheduled.` : 'Session ended.');
  ui.session = null;
  /* The resume point is deliberately NOT cleared here. Ending a session still
     leaves a sensible "pick up where you left off" target; clearing it would
     leave Today's Continue card empty almost always, which is the one thing
     that card exists to avoid. */
  closeSessionOverlay();
}

/* Runs after every part has evaluated — see the entry point. */
export function init() {
  window.__rssNextStreak = nextStreak;   /* so the behaviour can be checked from a test */
}
