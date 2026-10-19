/*
 * Revision fragments — Threads, Tables and Decoder rendered from structured data.
 *
 * Pure: no DOM. HSS2011's fragments are ported HTML; a subject written from
 * scratch (ABCT2326) keeps them as data instead, so every step and row carries
 * its week and its slide page and work/revision-check.mjs can hold each one to
 * the page it cites. The HTML is the classes study/revise.js already handles.
 * docs/superpowers/specs/2026-10-19-physiology-revise.md section 4.5.
 */

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const weeksOf = (list) => [...new Set(list)].sort((a, b) => a - b).map((w) => `W${w}`).join(' · ');
const cite = ([sid, page], sources) => `${sources[sid] || sid}, p${page}`;

/** The set textbook a ★ fact cites (SOURCE_FILES `phys.ebook`, Martini). Its text is not in this public repo. */
export const STAR_SOURCE = 'phys.ebook';

/**
 * threads: [{ id: 't1', title, yue, steps: [{ wk, hd, text, src: [id, page], match, star? }] }]
 * star: { text, page, ch } — one textbook sentence, shown with ★ and its page (owner, 19 Oct 2026).
 * yue: the 廣東話 retelling; it carries the thread's last week, so it hides until every step is taught.
 */
export function renderThreads(threads, sources = {}, intro = '') {
  if (!threads.length) return '';
  const star = (s) => (s.star ? ` ${esc(s.star.text)} <span class="star">★</span> <span class="rv-src">${esc(sources[STAR_SOURCE] || 'Martini textbook')}, p${s.star.page}</span>` : '');
  const one = (t, i) => {
    const steps = t.steps.map((s) => `  <li data-wk="${s.wk}"><span class="wk">W${s.wk}</span><span class="hd">${esc(s.hd)}</span> ${esc(s.text)} <span class="rv-src">${esc(cite(s.src, sources))}</span>${star(s)}</li>`).join('\n');
    const yue = t.yue ? `\n<div class="yue" data-wk="${Math.max(...t.steps.map((s) => s.wk))}"><b>廣東話</b>${esc(t.yue)}</div>` : '';
    return `<details class="thread" id="${esc(t.id)}"${i === 0 ? ' open' : ''}>\n<summary>${esc(t.title)}<small>${weeksOf(t.steps.map((s) => s.wk))}</small></summary>\n<div class="tbody">\n<ol class="chain">\n${steps}\n</ol>${yue}\n</div>\n</details>`;
  };
  return `<h2>Threads</h2>\n  <p>${esc(intro)}</p>\n\n${threads.map(one).join('\n\n')}`;
}

/** tables: [{ id: 'tb-x', title, head: [...], rows: [{ wk, cells: [...], src: [id, page], match }] }] */
export function renderTables(tables, sources = {}, intro = '') {
  if (!tables.length) return '';
  const nav = tables.map((t) => `<a href="#${esc(t.id)}" data-jump="${esc(t.id)}">${esc(t.title)}</a>`).join('\n    ');
  const one = (t) => {
    const head = `<tr>${t.head.map((h) => `<th>${esc(h)}</th>`).join('')}<th>Slide</th></tr>`;
    const rows = t.rows.map((r) => `  <tr data-wk="${r.wk}">${r.cells.map((c) => `<td>${esc(c)}</td>`).join('')}<td>${esc(cite(r.src, sources))}</td></tr>`).join('\n');
    return `<div class="rv-sec"><h3 id="${esc(t.id)}">${esc(t.title)}</h3>\n  <div class="tw"><table>\n  <thead>${head}</thead>\n  <tbody>\n${rows}\n  </tbody>\n  </table></div></div>`;
  };
  return `<h2>Tables</h2>\n  <p>${esc(intro)}</p>\n  <div class="subnav">\n    ${nav}\n  </div>\n\n${tables.map(one).join('\n\n')}`;
}

/** A term's word-part reading from wordparts.js `decompose`: "forms = meaning + …", one group per word. */
export function decoderReading(term, decompose) {
  return term.split(/[\s-]+/).map((w) => decompose(w)).filter(Boolean)
    .map((d) => d.parts.filter((p) => p.kind === 'root' || p.kind === 'prefix' || p.kind === 'suffix').map((p) => `${p.forms || p.text} = ${p.means}`).join(' + '))
    .filter(Boolean).join(' · ');
}

/**
 * What is wrong with the decoder list (empty = fine). terms: [{ term, wk, reading }],
 * `reading` being the one a session checked against the slide's meaning of the word
 * and approved (owner, 19 Oct 2026: "ensure they are correct"). It fails when a term
 * has no reading, when decompose() now gives a different one, or when the term is not
 * a name on the map (`labels`).
 */
export function decoderProblems(terms, decompose, labels) {
  const out = [];
  for (const t of terms) {
    const now = decoderReading(t.term, decompose);
    if (!now) out.push(`${t.term}: no word-part reading`);
    else if (now !== t.reading) out.push(`${t.term}: reading changed (reviewed "${t.reading}", now "${now}")`);
    if (!labels.has(t.term)) out.push(`${t.term}: not a row or topic name`);
  }
  return out;
}

/**
 * terms: [{ term, wk, reading }]; `decompose` is wordparts.js's. A term shows only
 * while its reading is still the reviewed one; anything else is left out here and
 * failed by work/revision-check.mjs, never thrown (this runs as the registry loads).
 */
export function renderDecoder(terms, decompose, intro = '') {
  const good = terms.filter((t) => t.reading && decoderReading(t.term, decompose) === t.reading);
  if (!good.length) return '';
  const byWeek = new Map();
  for (const t of good) {
    if (!byWeek.has(t.wk)) byWeek.set(t.wk, []);
    byWeek.get(t.wk).push(`  <tr data-wk="${t.wk}"><td><b>${esc(t.term)}</b></td><td>${esc(t.reading)}</td></tr>`);
  }
  const body = [...byWeek.keys()].sort((a, b) => a - b).map((w) => `  <tr class="grp" data-wk="${w}"><td colspan="2">Week ${w}</td></tr>\n${byWeek.get(w).join('\n')}`).join('\n');
  return `<h2>Decoder</h2>\n  <p>${esc(intro)}</p>\n  <div class="dq">\n    <label for="dq" class="mono">Filter</label>\n    <input id="dq" type="search" placeholder="e.g. glomerular, pneumocyte" autocomplete="off">\n    <span id="dcount" class="mono"></span>\n  </div>\n  <div class="tw"><table id="dtable">\n  <thead><tr data-wk="1"><th>Term</th><th>Word parts</th></tr></thead>\n  <tbody>\n${body}\n  </tbody>\n  </table></div>`;
}
