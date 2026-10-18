/*
 * Reading help
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, decompose, esc, memoryTip, partOf, termGloss, termNote } from './imports.js';
import { openDialog } from './dialog-behaviour-applied.js';

/* ------------------------------------------------------------------ *
 * Reading help
 *
 * Revision notes, threads and tables are authored as HTML. Any word the app can
 * genuinely help with is underlined and tappable. Tapping gives the three things
 * that actually help -- how to SAY it, what it means in ordinary English, and
 * which shorter words it is built out of.
 *
 * The breakdown comes from the HSS2011 word-part list. The pronunciation and
 * the plain-English line are written by this app, and the panel says so.
 * ------------------------------------------------------------------ */

const glossCache = new Map();

export function lookupTerm(word) {
  const key = word.toLowerCase();
  if (glossCache.has(key)) return glossCache.get(key);
  const note = termNote(word);
  const split = decompose(word);
  /* 'epi-' and 'cardi/o' are single parts, not compounds, so decompose() will
     never resolve them -- they get looked up directly instead. */
  const part = partOf(word);
  /* The meaning and the Chinese. A word is not worth tapping for a breakdown
     alone, so this is what the dialog leads with wherever it exists. */
  const gloss = termGloss(word);
  const tip = memoryTip(word);
  /* The glossary alone is enough to make a word tappable — the old condition
     dropped it, so words that resolve only through TERM_GLOSS (cavity, heart,
     and every adjective the fold maps to its noun) were silently inert. */
  const found = (note || split || part || gloss || tip) ? { word, note, split, part, gloss, tip } : null;
  glossCache.set(key, found);
  return found;
}

/*
 * Wraps helpable words in the ALREADY-ESCAPED text. Escaping first is what
 * makes this safe: by the time the regex runs there are no angle brackets or
 * ampersands left to break, only entities, and \w never matches those.
 *
 * ONE pass, with the alternatives in a single regex, because two passes would
 * let the second one scan the markup the first one just inserted.
 *
 * Word-part tokens are matched too -- epi-, -graphy, cardi/o. On the
 * terminology items the text IS a list of those, and leaving them inert while
 * the app carries an 814-stem glossary was daft.
 */
/*
 * FIVE-LETTER WORDS. The floor used to be six, which quietly made fossa,
 * bursa, ramus, gyrus, crest, facet, hilum, sulci, cilia, codon, actin and
 * exons permanently inert however good their glossary entry was — and those
 * are anatomy's own working vocabulary. The floor is now five, but a
 * five-letter word has to earn it: it needs a curated WHOLE-WORD glossary
 * entry, not merely a decomposition. Without that guard "costs" underlines
 * as the rib root cost/o, "later" as later/o (side) and "inter" as the
 * prefix — ordinary English wearing an anatomical meaning it does not have,
 * which is worse than leaving it plain.
 */
const GLOSS_RE = /([a-z]{2,12}\/[oi])|(^|[\s(])(-[a-z]{2,12})\b|\b([a-z]{2,12}-)(?=[\s,;)])|\b([A-Za-z][a-z]{4,})\b/g;

/* A five-letter token is only helpable through a whole-word glossary entry
   whose key is not itself a word part. Six and over keep the old rule. */
function shortWordOk(token) {
  if (token.length > 5) return true;
  const hit = termGloss(token);
  return !!hit && !partOf(hit.key);
}

export function glossify(escaped) {
  return String(escaped).replace(GLOSS_RE, (m, combForm, pre, sufForm, preForm, word) => {
    const token = combForm || sufForm || preForm || word;
    const lead = pre || '';
    if (word && !shortWordOk(token)) return m;
    const hit = lookupTerm(token);
    if (!hit) return m;
    return lead + `<button type="button" class="term" data-term="${esc(token)}">${token}</button>`;
  });
}

/*
 * Reading help for markup that is already HTML — the revision notes, threads and
 * tables, which are authored as HTML and so cannot go through glossify(esc(text)).
 * Only text nodes are touched, never a tag or an attribute, and never text inside
 * something that is already a control or a heading cell, so a button is not wrapped
 * in a button. Safe to call again on the same node: words already wrapped sit
 * inside a <button> and are skipped.
 */
export function glossifyNode(root, skip = 'button, a, th, summary, script, style, select, option, textarea') {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  for (let n = walker.nextNode(); n; n = walker.nextNode()) nodes.push(n);
  for (const t of nodes) {
    const text = t.nodeValue;
    if (!text.trim() || (t.parentElement && t.parentElement.closest(skip))) continue;
    const escaped = esc(text);
    const html = glossify(escaped);
    if (html === escaped) continue;
    const tpl = document.createElement('template');
    tpl.innerHTML = html;
    t.replaceWith(tpl.content);
  }
  wireTerms(root);
}

/* Delegated: the chips are rebuilt on every render, so binding per chip would leak. */
export function wireTerms(root) {
  (root || document).querySelectorAll('[data-term]').forEach((b) => { b.onclick = () => openTermDialog(b.dataset.term); });
}

/* Parse a curated `from` string — "Built out of: a-, near + b/o, thing" — into
   the shape decompose() returns, so one renderer draws both kinds of breakdown. */
function fromSplit(fromStr) {
  if (!fromStr) return null;
  const body = String(fromStr).replace(/^\s*Built out of:\s*/i, '').trim();
  if (!body) return null;
  const parts = body.split(/\s*\+\s*/).map((seg) => {
    const s = seg.trim();
    const ci = s.indexOf(',');
    const text = (ci === -1 ? s : s.slice(0, ci)).trim();
    const means = ci === -1 ? '' : s.slice(ci + 1).trim();
    const kind = /^-/.test(text) ? 'suffix' : /-$/.test(text) ? 'prefix' : 'root';
    return { text, kind, means };
  }).filter((p) => p.text);
  return parts.length ? { parts } : null;
}

function partsHTML(split) {
  if (!split || !split.parts || !split.parts.length) return '';
  const cells = split.parts.map((p) => {
    const cls = p.kind === 'link' ? 'link' : p.kind === 'ending' ? 'ending' : p.kind;
    return `<span class="termpart ${esc(cls)}"><b>${esc(p.text)}</b><span>${esc(p.means || '')}</span></span>`;
  });
  const reads = split.parts
    .filter((p) => p.kind !== 'link' && p.kind !== 'ending')
    .map((p) => (p.means || '').split(',')[0].trim())
    .filter(Boolean).join(' + ');
  return `<div class="subhead">Built out of</div>
    <div class="termparts">${cells.join('<span class="termplus">+</span>')}</div>
    ${reads ? `<p class="small" style="margin-top:9px">Reads as: <strong>${esc(reads)}</strong></p>` : ''}`;
}

export function numberHTML(note) {
  if (!note || !note.number || !note.other) return '';
  const isSingular = note.number === 'singular';
  const label = isSingular
    ? `This is the <b>singular</b>. Plural: <b>${esc(note.other)}</b>`
    : `This is the <b>plural</b>. Singular: <b>${esc(note.other)}</b>`;
  return `<p class="small term-number" style="margin:9px 0 0;color:var(--muted)">${label}</p>`;
}

export function memoryHTML(tip) {
  if (!tip) return '';
  return `<div class="memory-tip"><div class="subhead">Memory tip</div><p>${esc(tip)}</p></div>`;
}

/*
 * The dialog leads with what the word MEANS, in English and in Chinese.
 *
 * It used to lead with the breakdown and then spend two notice boxes saying
 * where the breakdown came from, which is the one thing nobody taps a word to
 * find out. Being told that radioulnar is radi/o + ulnar does not tell you it
 * names the joints the forearm rotates about, and it certainly does not tell
 * you it is 橈尺的 — the name a good deal of this material is already filed
 * under for anyone who met the anatomy in Chinese first.
 *
 * So: meaning first, Chinese with it, then how to say it, then the parts — and
 * no provenance notices anywhere. The part lists are definition_wordparts.pdf
 * material and speak for themselves; the rest reads as the study help it is.
 */
function openTermDialog(word) {
  const hit = lookupTerm(word);
  if (!hit) return;
  const { note, split, part, gloss, tip } = hit;
  /* note.plain is written for this exact word, so it wins over the glossary's
     line where both exist. The Chinese only ever comes from the glossary. */
  const plain = (note && note.plain) || (gloss && gloss.meaning) || '';
  const zh = gloss ? gloss.zh : '';
  /* On a bare word part the chip below already carries the sourced meaning, and
     'upon, above' over 'above, upon' is not worth two lines. Same words in a
     different order: show the Chinese on its own and let the chip say it once. */
  const words = (t) => String(t).toLowerCase().split(/[^a-z]+/).filter(Boolean).sort().join(' ');
  const meaning = (part && !split && words(part.means) === words(plain)) ? '' : plain;
  /* When the fold or an alias resolved this word to its noun — pericardial ->
     pericardium, thoracic -> thorax — name that base form so the connection
     between the adjective and the noun is made instead of silently assumed. */
  const canon = gloss && gloss.key !== word.toLowerCase() ? gloss.key : null;
  /* One breakdown per term. A curated `from` is the hand-checked reading, so it
     is preferred over decompose()'s automatic split where a word has both
     (glomerulus has only a `from`; vestibulocochlear used to show both). */
  const breakdown = fromSplit(note && note.from) || split;
  $$('termTitle').textContent = word;
  $$('termBody').innerHTML = `
    ${canon ? `<p class="small" style="margin:0 0 10px;color:var(--muted)">Base form: <strong style="color:var(--ink)">${esc(canon)}</strong></p>` : ''}
    ${(meaning || zh) ? `<div class="meaning">
      ${meaning ? `<p class="en">${esc(meaning)}</p>` : ''}
      ${zh ? `<p class="zh" lang="zh-Hant">${esc(zh)}</p>` : ''}
    </div>` : ''}
    ${note && note.say ? `<div class="subhead">Say it</div><p class="say">${esc(note.say)}</p>` : ''}
    ${numberHTML(note)}
    ${memoryHTML(tip)}
    ${part && !split ? `<div class="subhead">Word part</div>
      <div class="termparts"><span class="termpart ${esc(part.kind)}"><b>${esc(part.forms)}</b><span>${esc(part.means)}</span></span></div>
      <p class="small" style="margin-top:9px">${part.kind === 'root'
        ? 'A root — the part carrying the meaning. The /o on the end is the vowel that joins it to whatever follows.'
        : esc('A ' + part.kind + ' — it does not stand alone, it attaches to a root.')}</p>` : ''}
    ${partsHTML(breakdown)}`;
  openDialog($$('termDialog'));
}
