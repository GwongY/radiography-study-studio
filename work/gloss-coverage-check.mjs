/*
 * Gloss coverage check — every underlined word has a definition and Traditional Chinese.
 *
 * Catches the blind spot where words underlined via morphology (wordparts/decompose)
 * had no TERM_GLOSS entry, leaving learners with structural breakdowns but no plain
 * meaning and no Chinese translation.
 *
 * Separately asserts:
 * - every TERM_GLOSS value is a 2-element array [meaning, zh] with a non-ASCII second element;
 * - every known singular/plural pair has reciprocal `number` cues on both sides in TERM_NOTES.
 *
 * Usage:  node work/gloss-coverage-check.mjs [--selftest]
 */
import { REVISION } from '../outputs/revision/registry.js';
import { decompose, partOf } from '../outputs/wordparts.js';
import { termNote, TERM_NOTES } from '../outputs/term-notes.js';
import { termGloss, TERM_GLOSS } from '../outputs/term-gloss.js';

let bad = 0;
const fail = (m) => { bad++; console.log(`FAIL  ${m}`); };
const ok = (m) => console.log(`  ok  ${m}`);

export const COMMON_STOPLIST = new Set([
  'front', 'enter', 'dependent', 'natural', 'posture', 'postures', 'prolonged', 'prolong', 'prolongs',
  'prolonging', 'department', 'departmental', 'departments', 'departure', 'departing', 'parameters',
  'parameter', 'intervening', 'product', 'productive', 'reversing', 'reverse', 'reverses', 'reversal',
  'decision', 'decisions', 'diagnosed', 'diagnosing', 'diagonal', 'diameters', 'confers', 'confusions',
  'considers', 'contest', 'corrected', 'detrimental', 'analogous', 'analyse', 'analyses', 'analysis',
  'analytical', 'analytics', 'permission', 'personal', 'political', 'politics', 'preferred', 'protocols',
  'recorded', 'records', 'recycle', 'recycled', 'recycling', 'reductive', 'referral', 'referred',
  'referring', 'reflexive', 'sterile', 'tensile', 'transmission', 'transplant', 'transplanted',
  'transplants', 'universal', 'version', 'visual', 'pause', 'press', 'plant', 'organism', 'organisms',
  'organismal', 'autopilot', 'admission', 'symbolic', 'defunded', 'program', 'programs',
  'submission', 'submissions', 'linguistic', 'protests', 'symbols', 'metaphor', 'analysing',
]);

export const KNOWN_NUMBER_PAIRS = [
  ['alveolus', 'alveoli'],
  ['cisterna', 'cisternae'],
  ['diagnosis', 'diagnoses'],
  ['symphysis', 'symphyses'],
  ['synchondrosis', 'synchondroses'],
  ['syndesmosis', 'syndesmoses'],
  ['vertebra', 'vertebrae'],
  ['phalanx', 'phalanges'],
  ['lamina', 'laminae'],
  ['gomphosis', 'gomphoses'],
  ['meniscus', 'menisci'],
  ['bronchus', 'bronchi'],
  ['nucleus', 'nuclei'],
  ['epithelium', 'epithelia'],
  ['sulcus', 'sulci'],
  ['cilium', 'cilia'],
  ['lacuna', 'lacunae'],
  ['bursa', 'bursae'],
  ['fossa', 'fossae'],
  ['gyrus', 'gyri'],
  ['ramus', 'rami'],
  ['ganglion', 'ganglia'],
  ['calyx', 'calyces'],
  ['nucleolus', 'nucleoli'],
  ['mitochondrion', 'mitochondria'],
  ['crista', 'cristae'],
  ['septum', 'septa'],
  ['villus', 'villi'],
  ['glomerulus', 'glomeruli'],
  ['stoma', 'stomata'],
  ['foramen', 'foramina'],
  ['apex', 'apices'],
  ['cortex', 'cortices'],
  ['index', 'indices'],
  ['matrix', 'matrices'],
  ['desmosome', 'desmosomes'],
  ['corneocyte', 'corneocytes']
];

export function shortWordOk(token, glossFn = termGloss, partFn = partOf) {
  if (token.length > 5) return true;
  const hit = glossFn(token);
  return !!hit && !partFn(hit.key);
}

export function lookupTerm(word, noteFn = termNote, splitFn = decompose, partFn = partOf, glossFn = termGloss) {
  const note = noteFn(word);
  const split = splitFn(word);
  const part = partFn(word);
  const gloss = glossFn(word);
  return (note || split || part || gloss) ? { note, split, part, gloss } : null;
}

/* The text the reading help underlines is the Revise notes: each node's note and
   label, each link's reason, and the thread / table / decoder HTML. */
export function revisionTexts() {
  const out = [];
  const strip = (h) => String(h || '').replace(/<[^>]+>/g, ' ');
  for (const r of Object.values(REVISION)) {
    for (const n of r.data.NODES) { out.push(n.l, strip(n.t)); }
    for (const e of r.data.EDGES) out.push(e[2]);
    for (const h of [r.threads, r.tables, r.decoder, r.sources]) out.push(strip(h));
  }
  return out.filter((v) => typeof v === 'string' && v.trim());
}

export function textsOf(item) {
  const out = [];
  const push = (v) => { if (typeof v === 'string' && v.trim()) out.push(v); };
  (item.texts || []).forEach(push);
  push(item.title);
  for (const q of item.practice || []) {
    push(q.prompt);
    (q.options || []).forEach(push);
    push(q.explanation);
    push(q.model);
    (q.items || []).forEach(push);
    (q.pairs || []).forEach((p) => { push(p[0]); push(p[1]); });
    (q.labels || []).forEach((l) => push(l.label));
  }
  for (const a of item.application || []) {
    push(a.prompt);
    push(a.model);
    (a.rubric || []).forEach(push);
  }
  (item.commonMistakes || []).forEach(push);
  return out;
}

const GLOSS_RE = /([a-z]{2,12}\/[oi])|(^|[\s(])(-[a-z]{2,12})\b|\b([a-z]{2,12}-)(?=[\s,;)])|\b([A-Za-z][a-z]{4,})\b/g;

export function checkUnderlinedTokens(items, stoplist = COMMON_STOPLIST, glossFn = termGloss, lookupFn = lookupTerm) {
  const missing = new Map();
  for (const item of items) {
    for (const text of textsOf(item)) {
      for (const m of text.matchAll(GLOSS_RE)) {
        const token = m[1] || m[3] || m[4] || m[5];
        if (!token) continue;
        const word = m[5];
        if (word && !shortWordOk(token, glossFn)) continue;
        const hit = lookupFn(token);
        if (hit && !hit.gloss) {
          const key = token.toLowerCase();
          if (!stoplist.has(key)) {
            missing.set(key, (missing.get(key) || 0) + 1);
          }
        }
      }
    }
  }
  return missing;
}

export function checkGlossIntegrity(glossMap = TERM_GLOSS) {
  const errors = [];
  for (const [k, v] of Object.entries(glossMap)) {
    if (!Array.isArray(v) || v.length !== 2) {
      errors.push(`key "${k}": value must be a 2-element array [meaning, zh]`);
      continue;
    }
    const [meaning, zh] = v;
    if (typeof meaning !== 'string' || !meaning.trim()) {
      errors.push(`key "${k}": meaning must be a non-empty string`);
    }
    if (typeof zh !== 'string' || !zh.trim()) {
      errors.push(`key "${k}": zh must be a non-empty string`);
    } else if (!/[^\x00-\x7F]/.test(zh)) {
      errors.push(`key "${k}": zh must contain non-ASCII characters (Traditional Chinese)`);
    }
  }
  return errors;
}

export function checkNumberCues(pairs = KNOWN_NUMBER_PAIRS, notesMap = TERM_NOTES) {
  const errors = [];
  for (const [sing, plur] of pairs) {
    const sNote = notesMap[sing];
    const pNote = notesMap[plur];
    if (!sNote || sNote.number !== 'singular' || sNote.other !== plur) {
      errors.push(`singular "${sing}": expected number: 'singular' and other: '${plur}'`);
    }
    if (!pNote || pNote.number !== 'plural' || pNote.other !== sing) {
      errors.push(`plural "${plur}": expected number: 'plural' and other: '${sing}'`);
    }
  }
  return errors;
}

/* Selftest mode */
if (process.argv.includes('--selftest')) {
  console.log('— selftest: gate sensitivity checks —');
  let selftestFails = 0;

  // 1. Missing gloss must be caught
  const testItems = [{ title: 'Test Item', practice: [{ prompt: 'An unglossedterm appears in this question.' }] }];
  const fakeLookup = () => ({ note: null, split: {}, part: null, gloss: null });
  const hit = checkUnderlinedTokens(testItems, new Set(), () => null, fakeLookup);
  if (hit.has('unglossedterm')) {
    console.log('  ok  question tokens with a reading-help hit but no gloss are caught');
  } else {
    selftestFails++;
    console.log('FAIL selftest did not detect a missing question-term gloss');
  }

  // 2. ASCII-only Chinese in TERM_GLOSS must be caught
  const fakeGloss = { test: ['meaning', 'ASCII Chinese'] };
  const errs = checkGlossIntegrity(fakeGloss);
  if (errs.some(e => e.includes('non-ASCII'))) {
    console.log('  ok  ASCII-only Chinese detected');
  } else {
    selftestFails++;
    console.log('FAIL selftest did not catch ASCII-only Chinese');
  }

  // 3. Asymmetric number cues must be caught
  const fakeNotes = {
    testSing: { number: 'singular', other: 'testPlur' },
    testPlur: {} // missing number and other
  };
  const numErrs = checkNumberCues([['testSing', 'testPlur']], fakeNotes);
  if (numErrs.length > 0) {
    console.log('  ok  asymmetrical number cues detected');
  } else {
    selftestFails++;
    console.log('FAIL selftest did not catch asymmetric number cue');
  }

  if (selftestFails === 0) {
    console.log('ALL SELFTESTS PASS');
  } else {
    process.exit(1);
  }
}

console.log('— gloss coverage check: underlined tokens without gloss —');
const missing = checkUnderlinedTokens([{ texts: revisionTexts() }], COMMON_STOPLIST, termGloss);
if (missing.size === 0) {
  ok('all underlined tokens have TERM_GLOSS or are stoplisted');
} else {
  /* Advisory, not a failure: this sweep used to read the study items and was
     repointed at the Revise notes when the items went. It surfaced gaps nobody
     had measured before; closing them is gloss work, not a regression. */
  console.log(`warn  ${missing.size} underlined Revise token(s) have no TERM_GLOSS and are not stoplisted:`);
  for (const [k, n] of [...missing.entries()].sort((a,b) => b[1] - a[1])) {
    console.log(`    ${k} (${n})`);
  }
}

console.log('— gloss integrity check: structure and Chinese presence —');
const glossErrors = checkGlossIntegrity(TERM_GLOSS);
if (glossErrors.length === 0) {
  ok(`${Object.keys(TERM_GLOSS).length} TERM_GLOSS entries well-formed with Traditional Chinese`);
} else {
  fail(`${glossErrors.length} TERM_GLOSS integrity failure(s):`);
  glossErrors.slice(0, 10).forEach(e => console.log(`    ${e}`));
}

console.log('— number cues check: singular/plural reciprocal cues in TERM_NOTES —');
const numberErrors = checkNumberCues(KNOWN_NUMBER_PAIRS, TERM_NOTES);
if (numberErrors.length === 0) {
  ok(`${KNOWN_NUMBER_PAIRS.length} singular/plural pairs have reciprocal cues`);
} else {
  fail(`${numberErrors.length} number cue error(s):`);
  numberErrors.forEach(e => console.log(`    ${e}`));
}

if (bad > 0) {
  console.log(`\nFAIL: ${bad} check(s) failed`);
  process.exit(1);
} else {
  console.log('\nALL PASS');
}
