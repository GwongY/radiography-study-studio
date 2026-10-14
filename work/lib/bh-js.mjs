/*
 * A scanner just good enough for BetterHeart's source: it finds string literals while skipping
 * comments, template literals and regular-expression literals, so a port transform can wrap the
 * strings that carry Chinese text without touching a `'` inside a comment. It is not a parser.
 */
const CJK = /[　-〿一-鿿＀-￯]/;
export const hasCjk = (s) => CJK.test(s);

/* Calls fn({start, end, quote, body}) for every '...' / "..." literal; returns the rewritten source
   when fn returns a string, keeps the literal when it returns undefined. */
export function mapStrings(src, fn) {
  let out = '', i = 0, last = 0;
  const n = src.length;
  const regexOk = (j) => { for (j--; j >= 0 && /\s/.test(src[j]); j--); return j < 0 || /[(,=:[!&|?{};+\-*%<>~^]/.test(src[j]) || /\breturn$|\btypeof$/.test(src.slice(Math.max(0, j - 6), j + 1)); };
  while (i < n) {
    const c = src[i], d = src[i + 1];
    if (c === '/' && d === '/') { while (i < n && src[i] !== '\n') i++; continue; }
    if (c === '/' && d === '*') { const e = src.indexOf('*/', i + 2); i = e < 0 ? n : e + 2; continue; }
    if (c === '`') { /* template literal: skip, tracking ${ } nesting */
      i++;
      for (let depth = 0; i < n; i++) {
        if (src[i] === '\\') { i++; continue; }
        if (depth === 0 && src[i] === '`') { i++; break; }
        if (src[i] === '$' && src[i + 1] === '{') { depth++; i++; continue; }
        if (depth > 0 && src[i] === '}') depth--;
      }
      continue;
    }
    if (c === '/' && regexOk(i)) { /* regex literal */
      let j = i + 1, cls = false;
      for (; j < n && src[j] !== '\n'; j++) { if (src[j] === '\\') { j++; continue; } if (src[j] === '[') cls = true; else if (src[j] === ']') cls = false; else if (src[j] === '/' && !cls) break; }
      if (src[j] === '/') { i = j + 1; continue; }
    }
    if (c === '"' || c === "'") {
      let j = i + 1;
      for (; j < n && src[j] !== c; j++) { if (src[j] === '\\') j++; if (src[j] === '\n') break; }
      if (src[j] === c) {
        const r = fn({ start: i, end: j + 1, quote: c, body: src.slice(i + 1, j), before: src.slice(Math.max(0, i - 3), i) });
        if (typeof r === 'string') { out += src.slice(last, i) + r; last = j + 1; }
        i = j + 1; continue;
      }
    }
    i++;
  }
  return out + src.slice(last);
}

/* Template literals that contain Chinese: the transform cannot wrap them, so the port reports them. */
export function cjkTemplates(src) {
  const found = []; let i = 0; const n = src.length;
  while (i < n) {
    if (src[i] === '/' && src[i + 1] === '/') { while (i < n && src[i] !== '\n') i++; continue; }
    if (src[i] === '/' && src[i + 1] === '*') { const e = src.indexOf('*/', i + 2); i = e < 0 ? n : e + 2; continue; }
    if (src[i] === '"' || src[i] === "'") { const q = src[i]; i++; while (i < n && src[i] !== q && src[i] !== '\n') { if (src[i] === '\\') i++; i++; } i++; continue; }
    if (src[i] === '`') {
      const s = i; i++;
      for (let depth = 0; i < n; i++) {
        if (src[i] === '\\') { i++; continue; }
        if (depth === 0 && src[i] === '`') { i++; break; }
        if (src[i] === '$' && src[i + 1] === '{') { depth++; i++; continue; }
        if (depth > 0 && src[i] === '}') depth--;
      }
      const body = src.slice(s, i);
      if (hasCjk(body)) found.push(body.length > 90 ? body.slice(0, 90) + '…' : body);
      continue;
    }
    i++;
  }
  return found;
}

/* The one specifier each ported module is imported by, everywhere under outputs/heart. Bump the number
   when the module's content changes (it is the browser's cache key; the SW list must name it too). */
/* The source of `const NAME=...;` (top-level, a single statement) from a minified module. */
export function constStatement(src, name) {
  const m = new RegExp('^const ' + name + '=', 'm').exec(src);
  if (!m) throw new Error('const ' + name + ' not found');
  let depth = 0;
  for (let i = m.index; i < src.length; i++) {
    const c = src[i];
    if (c === '"' || c === "'" || c === '`') { for (i++; i < src.length && src[i] !== c; i++) if (src[i] === '\\') i++; continue; }
    if (c === '/' && src[i + 1] === '/') { while (i < src.length && src[i] !== '\n') i++; continue; }
    if ('{[('.includes(c)) depth++;
    else if ('}])'.includes(c)) depth--;
    else if (c === ';' && depth === 0) return src.slice(m.index, i + 1);
  }
  throw new Error('const ' + name + ' does not end');
}

export const VERSIONS = {
  'heartbeat.js': 11, 'hemo-model.js': 4, 'hemo-explain.js': 2, 'hemo-panel.js': 11, 'hemo-sim.js': 3, 'pci-sim.js': 17, 'coronary-flow.js': 19, 'heart-text.js': 1, 'scenarios.js': 1,
  'lumen-fit.js': 1, 'mmode.js': 9, 'arrhythmia.js': 10, 'ivus-sim.js': 7, 'ivus-image.js': 6,
};
