/*
 * Reading help
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { decompose, esc, partOf, termGloss, termNote } from './imports.js';
import { figureKeyHTML } from './lesson-visuals.js';

/* ------------------------------------------------------------------ *
 * Reading help
 *
 * Two things make a physiology page feel unreadable, and they are different
 * problems. One is the paragraph: eight sentences of continuous prose with no
 * foothold. The other is the words: nobody remembers "glossopharyngeal" as a
 * seventeen-letter string, and pretending otherwise is why it will not stick.
 *
 * So: prose is broken into numbered chunks of a couple of sentences each, and
 * any word the app can genuinely help with is underlined and tappable. Tapping
 * gives the three things that actually help -- how to SAY it, what it means in
 * ordinary English, and which shorter words it is built out of.
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
  /* The glossary alone is enough to make a word tappable — the old condition
     dropped it, so words that resolve only through TERM_GLOSS (cavity, heart,
     and every adjective the fold maps to its noun) were silently inert. */
  const found = (note || split || part || gloss) ? { word, note, split, part, gloss } : null;
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
const GLOSS_RE = /([a-z]{2,12}\/[oi])|(^|[\s(])(-[a-z]{2,12})\b|\b([a-z]{2,12}-)(?=[\s,;)])|\b([A-Za-z][a-z]{5,})\b/g;

export function glossify(escaped) {
  return String(escaped).replace(GLOSS_RE, (m, combForm, pre, sufForm, preForm, word) => {
    const token = combForm || sufForm || preForm || word;
    const lead = pre || '';
    const hit = lookupTerm(token);
    if (!hit) return m;
    return lead + `<button type="button" class="term" data-term="${esc(token)}">${token}</button>`;
  });
}

/*
 * Chunking.
 *
 * The first version split on . ! ? alone, which is fine until a lecture writes
 * one 961-character sentence held together with semicolons -- and then the
 * whole thing lands as a single wall, which is exactly the case this was
 * supposed to prevent. So oversized pieces are broken again at semicolons, and
 * then at comma-and-conjunction boundaries, before anything is given up on.
 */
const CHUNK_SOFT = 210;   /* aim for this */
const CHUNK_HARD = 300;   /* never knowingly exceed this */

/* Split on a separator, ignoring any that sits inside ( ) or [ ]. */
function splitTopLevel(text, sep) {
  const out = [];
  let depth = 0, buf = '';
  for (const ch of String(text)) {
    if (ch === '(' || ch === '[') depth += 1;
    else if (ch === ')' || ch === ']') depth = Math.max(0, depth - 1);
    if (ch === sep && depth === 0) { out.push(buf); buf = ''; continue; }
    buf += ch;
  }
  if (buf.trim()) out.push(buf);
  return out.map((x) => x.trim()).filter(Boolean);
}

function splitLong(piece) {
  if (piece.length <= CHUNK_HARD) return [piece];
  /*
   * Semicolons first: they are the author's own clause boundaries. But only at
   * bracket depth zero -- "hypo- (below; also deficient)" carries a semicolon
   * inside the parenthesis, and splitting there tore a definition in half and
   * left the following chunk starting with "also deficient)".
   */
  let parts = splitTopLevel(piece, ';');
  if (parts.length === 1) parts = piece.split(/,\s+(?=and\b|or\b|then\b|while\b|whereas\b|but\b)/i).filter(Boolean);
  if (parts.length === 1) return [piece];
  const out = [];
  let buf = '';
  for (let i = 0; i < parts.length; i += 1) {
    const bit = parts[i].trim() + (i < parts.length - 1 && !/[.!?]$/.test(parts[i].trim()) ? ';' : '');
    const joined = buf ? buf + ' ' + bit : bit;
    if (buf && joined.length > CHUNK_SOFT) { out.push(buf); buf = bit; } else buf = joined;
  }
  if (buf) { if (out.length && buf.length < 50) out[out.length - 1] += ' ' + buf; else out.push(buf); }
  return out.flatMap((x) => (x.length > CHUNK_HARD && x !== piece ? splitLong(x) : [x]));
}

function chunkText(text) {
  const sentences = String(text || '').match(/[^.!?]+[.!?]+["')\]]*\s*|[^.!?]+$/g) || [];
  const out = [];
  let buf = '';
  for (const raw of sentences) {
    const sen = raw.trim();
    if (!sen) continue;
    const joined = buf ? buf + ' ' + sen : sen;
    if (buf && (joined.length > CHUNK_SOFT || (buf.match(/[.!?]/g) || []).length >= 2)) { out.push(buf); buf = sen; }
    else buf = joined;
  }
  if (buf) {
    if (out.length && buf.length < 60) out[out.length - 1] += ' ' + buf;
    else out.push(buf);
  }
  const sized = out.flatMap(splitLong);
  return sized.length ? sized : [String(text || '')];
}

/*
 * "epi- (above, upon), hypo- (below; also deficient), inter- (between)" is a
 * table that happens to have been typed as a sentence. Three or more of those
 * pairs and it is rendered as one: the lead-in stays prose, the pairs become
 * cards, and each term is tappable like any other.
 */
/* The leading hyphen is part of the term: -graphy, not graphy. */
const PAIR_RE = /(-?[A-Za-z][A-Za-z\/-]{1,18})\s+\(([^()]{2,60})\)/g;

function asPairs(chunk) {
  const pairs = [...chunk.matchAll(PAIR_RE)];
  if (pairs.length < 3) return null;
  /* only when the pairs really are most of the chunk, not an aside in prose */
  const covered = pairs.reduce((a, m) => a + m[0].length, 0);
  if (covered / chunk.length < 0.45) return null;
  const lead = chunk.slice(0, pairs[0].index).replace(/[\s,;:]+$/, '');
  return { lead, pairs: pairs.map((m) => ({ term: m[1], gloss: m[2] })) };
}

function pairsHTML(block) {
  const cells = block.pairs.map((p) => {
    const hit = lookupTerm(p.term);
    const tag = hit ? 'button' : 'span';
    const attrs = hit ? ` type="button" data-term="${esc(p.term)}"` : '';
    return `<${tag} class="gt"${attrs}><b>${esc(p.term)}</b><span>${esc(p.gloss)}</span></${tag}>`;
  }).join('');
  return `${block.lead ? `<div class="chunklead">${glossify(esc(block.lead))}</div>` : ''}<div class="termgrid">${cells}</div>`;
}

function listHTML(chunk) {
  const bits = splitTopLevel(chunk, ';');
  if (bits.length < 3) return null;
  const lead = /:\s*$/.test(bits[0]) ? bits.shift() : '';
  return `${lead ? `<div class="chunklead">${glossify(esc(lead))}</div>` : ''}<ul class="chunklist">${bits.map((b) => `<li>${glossify(esc(b))}</li>`).join('')}</ul>`;
}

export function proseHTML(text) {
  const chunks = chunkText(text);
  const body = chunks.map((c) => {
    const pairs = asPairs(c);
    if (pairs) return `<li>${pairsHTML(pairs)}</li>`;
    if (c.length > CHUNK_SOFT) {
      const list = listHTML(c);
      if (list) return `<li>${list}</li>`;
    }
    return `<li>${glossify(esc(c))}</li>`;
  }).join('');
  return `<ol class="chunks">${body}</ol>`;
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
  const { note, split, part, gloss } = hit;
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
    ${note ? `<div class="subhead">Say it</div><p class="say">${esc(note.say)}</p>` : ''}
    ${part && !split ? `<div class="subhead">Word part</div>
      <div class="termparts"><span class="termpart ${esc(part.kind)}"><b>${esc(part.forms)}</b><span>${esc(part.means)}</span></span></div>
      <p class="small" style="margin-top:9px">${part.kind === 'root'
        ? 'A root — the part carrying the meaning. The /o on the end is the vowel that joins it to whatever follows.'
        : esc('A ' + part.kind + ' — it does not stand alone, it attaches to a root.')}</p>` : ''}
    ${partsHTML(breakdown)}`;
  openDialog($$('termDialog'));
}

/*
 * The plate sits under the teaching, not over it. It is an illustration from
 * 1918, and the credit line saying so is part of the picture rather than a
 * footnote -- the same rule the rest of the app follows about where a thing
 * came from.
 */
export function plateHTML(item) {
  const pl = plateFor(item);
  if (!pl) return '';
  return `<figure class="plate">
    <img src="${esc(pl.src)}" alt="${esc(pl.title)}" loading="lazy">
    <figcaption>${pl.intro ? `<p class="figintro">${glossify(esc(pl.intro))}</p>` : ''}<strong>${esc(pl.title)}</strong><br>${esc(pl.caption)}
      <span class="credit">${esc(pl.work)} \u00b7 <span class="pd">${esc(pl.licence)}</span> \u00b7 via ${esc(pl.via)}</span>
      <span class="credit">${esc(pl.note)}</span>
      ${figureKeyHTML(pl)}
    </figcaption>
  </figure>`;
}
