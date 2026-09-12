/*
 * Array integrity check — fails on orphaned array elements left by broad
 * text-replaces and catches malformed syllabusRef / src reference objects.
 *
 * In this codebase, two or more consecutive blank/whitespace-only lines
 * between array entries, or immediately after `[` or before `]`, is the
 * exact fingerprint of content deleted down to nothing instead of cleanly
 * removed by a broad text-replace script.
 *
 * Also flags malformed `syllabusRef` or `beyond[].src` reference objects
 * that carry a `ref` key but no `location` key.
 *
 * Usage: node work/array-integrity-check.mjs [--selftest]
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const corpusDir = join(__dirname, '..', 'outputs', 'study', 'corpus');

let bad = 0;
const fail = (m) => { bad++; console.log(`FAIL  ${m}`); };
const ok = (m) => console.log(`  ok  ${m}`);

// Check if a line range in lines (1-indexed) contains two or more consecutive blank/whitespace-only lines
function hasConsecutiveBlankLines(lines, startLine1Based, endLine1Based) {
  let consecutive = 0;
  for (let l = startLine1Based; l <= endLine1Based; l++) {
    if (l >= 1 && l <= lines.length && lines[l - 1].trim() === '') {
      consecutive++;
      if (consecutive >= 2) return true;
    } else {
      consecutive = 0;
    }
  }
  return false;
}

export function scanCode(code, filename) {
  const lines = code.split(/\r?\n/);
  const findings = [];

  let pos = 0;
  const len = code.length;
  let line = 1;

  const stack = [];
  let currentItemId = null;
  let arrayCount = 0;

  function peekTokenBefore(p) {
    let i = p - 1;
    while (i >= 0 && /\s/.test(code[i])) i--;
    if (i >= 0 && code[i] === ':') {
      i--;
      while (i >= 0 && /\s/.test(code[i])) i--;
      let end = i + 1;
      if (i >= 0 && (code[i] === '"' || code[i] === "'")) {
        const q = code[i];
        i--;
        while (i >= 0 && code[i] !== q) i--;
        return code.slice(i + 1, end - 1);
      } else {
        while (i >= 0 && /[a-zA-Z0-9_$]/.test(code[i])) i--;
        return code.slice(i + 1, end);
      }
    } else if (i >= 0 && code[i] === '=') {
      i--;
      while (i >= 0 && /\s/.test(code[i])) i--;
      let end = i + 1;
      while (i >= 0 && /[a-zA-Z0-9_$]/.test(code[i])) i--;
      return code.slice(i + 1, end);
    }
    return null;
  }

  while (pos < len) {
    const ch = code[pos];

    if (ch === '\n') {
      line++;
      pos++;
      continue;
    }

    if (/\s/.test(ch)) {
      pos++;
      continue;
    }

    // Single-line comment
    if (ch === '/' && code[pos + 1] === '/') {
      pos += 2;
      while (pos < len && code[pos] !== '\n') pos++;
      continue;
    }

    // Block comment
    if (ch === '/' && code[pos + 1] === '*') {
      pos += 2;
      while (pos < len && !(code[pos] === '*' && code[pos + 1] === '/')) {
        if (code[pos] === '\n') line++;
        pos++;
      }
      if (pos < len) pos += 2;
      continue;
    }

    // String literals
    if (ch === '"' || ch === "'") {
      const q = ch;
      const strStartPos = pos;
      pos++;
      let strVal = '';
      while (pos < len && code[pos] !== q) {
        if (code[pos] === '\\') {
          strVal += code[pos + 1] || '';
          pos += 2;
        } else {
          if (code[pos] === '\n') line++;
          strVal += code[pos];
          pos++;
        }
      }
      if (pos < len) pos++; // closing quote

      // Check if this string was an id property value: "id": "val" or 'id': 'val'
      let before = strStartPos - 1;
      while (before >= 0 && /\s/.test(code[before])) before--;
      if (before >= 0 && code[before] === ':') {
        before--;
        while (before >= 0 && /\s/.test(code[before])) before--;
        if (before >= 0 && (code[before] === '"' || code[before] === "'")) {
          const q2 = code[before];
          let keyEnd = before;
          before--;
          while (before >= 0 && code[before] !== q2) before--;
          const key = code.slice(before + 1, keyEnd);
          if (key === 'id') {
            currentItemId = strVal;
          }
        }
      } else {
        // Check if this string is a property key in an object: "key":
        let after = pos;
        while (after < len && /\s/.test(code[after])) after++;
        if (after < len && code[after] === ':') {
          if (stack.length && stack[stack.length - 1].type === 'object') {
            const obj = stack[stack.length - 1];
            if (obj.keys) obj.keys.add(strVal);
          }
        }
      }

      if (stack.length && stack[stack.length - 1].type === 'array') {
        const arr = stack[stack.length - 1];
        if (!arr.currentEntry) {
          arr.currentEntry = { startLine: line, endLine: line };
        } else {
          arr.currentEntry.endLine = line;
        }
      }
      continue;
    }

    // Template literal
    if (ch === '`') {
      pos++;
      while (pos < len && code[pos] !== '`') {
        if (code[pos] === '\\') {
          pos += 2;
        } else if (code[pos] === '$' && code[pos + 1] === '{') {
          pos += 2;
          let depth = 1;
          while (pos < len && depth > 0) {
            if (code[pos] === '{') depth++;
            else if (code[pos] === '}') depth--;
            else if (code[pos] === '\n') line++;
            pos++;
          }
        } else {
          if (code[pos] === '\n') line++;
          pos++;
        }
      }
      if (pos < len) pos++;
      if (stack.length && stack[stack.length - 1].type === 'array') {
        const arr = stack[stack.length - 1];
        if (!arr.currentEntry) {
          arr.currentEntry = { startLine: line, endLine: line };
        } else {
          arr.currentEntry.endLine = line;
        }
      }
      continue;
    }

    // Identifiers: id: 'xxx' or bare JS keys: location: 'xxx', etc.
    if (/[a-zA-Z0-9_$]/.test(ch)) {
      let startPos = pos;
      while (pos < len && /[a-zA-Z0-9_$]/.test(code[pos])) pos++;
      const ident = code.slice(startPos, pos);

      let p = pos;
      while (p < len && /\s/.test(code[p])) p++;
      if (code[p] === ':') {
        if (stack.length && stack[stack.length - 1].type === 'object') {
          const obj = stack[stack.length - 1];
          if (obj.keys) obj.keys.add(ident);
        }

        // Bare JS style id: '...' or id: "..."
        if (ident === 'id') {
          p++;
          while (p < len && /\s/.test(code[p])) p++;
          if (code[p] === '"' || code[p] === "'") {
            const q = code[p];
            let valStart = p + 1;
            let valEnd = code.indexOf(q, valStart);
            if (valEnd !== -1) {
              currentItemId = code.slice(valStart, valEnd);
            }
          }
        }
      }

      if (stack.length && stack[stack.length - 1].type === 'array') {
        const arr = stack[stack.length - 1];
        if (!arr.currentEntry) {
          arr.currentEntry = { startLine: line, endLine: line };
        } else {
          arr.currentEntry.endLine = line;
        }
      }
      continue;
    }

    // Array start `[`
    if (ch === '[') {
      arrayCount++;
      const field = peekTokenBefore(pos) || (stack.length && stack[stack.length - 1].type === 'array' ? `${stack[stack.length - 1].fieldName}[]` : 'array');
      if (stack.length && stack[stack.length - 1].type === 'array') {
        const parentArr = stack[stack.length - 1];
        if (!parentArr.currentEntry) {
          parentArr.currentEntry = { startLine: line, endLine: line };
        }
      }

      stack.push({
        type: 'array',
        fieldName: field,
        openLine: line,
        currentItemId,
        entries: [],
        currentEntry: null,
      });
      pos++;
      continue;
    }

    // Array end `]`
    if (ch === ']') {
      if (stack.length && stack[stack.length - 1].type === 'array') {
        const arr = stack.pop();
        if (arr.currentEntry) {
          arr.entries.push(arr.currentEntry);
          arr.currentEntry = null;
        }

        // Check 1: immediately after `[`
        const firstEntryStart = arr.entries.length > 0 ? arr.entries[0].startLine : line;
        if (hasConsecutiveBlankLines(lines, arr.openLine + 1, firstEntryStart - 1)) {
          findings.push({
            file: filename,
            itemId: arr.currentItemId || '<unknown>',
            field: arr.fieldName,
            reason: 'two or more consecutive blank lines immediately after [',
            line: arr.openLine + 1,
          });
        }

        // Check 2: between two entries
        for (let i = 0; i < arr.entries.length - 1; i++) {
          const e1 = arr.entries[i];
          const e2 = arr.entries[i + 1];
          const checkStart = Math.max(e1.endLine, e1.commaLine || e1.endLine) + 1;
          const checkEnd = e2.startLine - 1;
          if (hasConsecutiveBlankLines(lines, checkStart, checkEnd)) {
            findings.push({
              file: filename,
              itemId: arr.currentItemId || '<unknown>',
              field: arr.fieldName,
              reason: 'two or more consecutive blank lines between entries',
              line: checkStart,
            });
          }
        }

        // Check 3: immediately before `]`
        if (arr.entries.length > 0) {
          const lastEntry = arr.entries[arr.entries.length - 1];
          const checkStart = Math.max(lastEntry.endLine, lastEntry.commaLine || lastEntry.endLine) + 1;
          const checkEnd = line - 1;
          if (hasConsecutiveBlankLines(lines, checkStart, checkEnd)) {
            findings.push({
              file: filename,
              itemId: arr.currentItemId || '<unknown>',
              field: arr.fieldName,
              reason: 'two or more consecutive blank lines immediately before ]',
              line: checkStart,
            });
          }
        }

        if (stack.length && stack[stack.length - 1].type === 'array') {
          const parentArr = stack[stack.length - 1];
          if (parentArr.currentEntry) {
            parentArr.currentEntry.endLine = line;
          }
        }
      }
      pos++;
      continue;
    }

    // Object start `{`
    if (ch === '{') {
      if (stack.length && stack[stack.length - 1].type === 'array') {
        const arr = stack[stack.length - 1];
        if (!arr.currentEntry) {
          arr.currentEntry = { startLine: line, endLine: line };
        }
      }
      const propBefore = peekTokenBefore(pos);
      const isRefObj = propBefore === 'syllabusRef' || propBefore === 'src';
      stack.push({
        type: 'object',
        fieldName: propBefore || 'object',
        startLine: line,
        currentItemId,
        isRefObj,
        keys: new Set(),
      });
      pos++;
      continue;
    }

    // Object end `}`
    if (ch === '}') {
      if (stack.length && stack[stack.length - 1].type === 'object') {
        const obj = stack.pop();

        // Check 4: Malformed reference object check (has 'ref' but no 'location')
        if (obj.isRefObj) {
          if (obj.keys.has('ref') && !obj.keys.has('location')) {
            findings.push({
              file: filename,
              itemId: obj.currentItemId || '<unknown>',
              field: obj.fieldName,
              reason: `malformed ${obj.fieldName} object: has 'ref' but no 'location' key`,
              line: obj.startLine,
            });
          }
        }

        if (stack.length && stack[stack.length - 1].type === 'array') {
          const arr = stack[stack.length - 1];
          if (arr.currentEntry) {
            arr.currentEntry.endLine = line;
          }
        }
      }
      pos++;
      continue;
    }

    // Comma `,`
    if (ch === ',') {
      if (stack.length && stack[stack.length - 1].type === 'array') {
        const arr = stack[stack.length - 1];
        if (!arr.currentEntry) {
          findings.push({
            file: filename,
            itemId: arr.currentItemId || '<unknown>',
            field: arr.fieldName,
            reason: 'orphaned array element (bare comma with no preceding entry)',
            line,
          });
        } else {
          arr.currentEntry.commaLine = line;
          arr.entries.push(arr.currentEntry);
          arr.currentEntry = null;
        }
      }
      pos++;
      continue;
    }

    // Any other token character
    if (stack.length && stack[stack.length - 1].type === 'array') {
      const arr = stack[stack.length - 1];
      if (!arr.currentEntry) {
        arr.currentEntry = { startLine: line, endLine: line };
      } else {
        arr.currentEntry.endLine = line;
      }
    }

    pos++;
  }

  return { findings, arrayCount };
}

// -----------------------------------------------------------------------------
// Self-test mode
// -----------------------------------------------------------------------------
if (process.argv.includes('--selftest')) {
  console.log('— selftest: known-good arrays must pass, orphaned elements and malformed refs must fail —');

  const SYNTHETIC_FIXTURE = `
export const TEST_ITEMS = [
  {
    "id": "item-json-good",
    "visuals": [
      { "fig": "goodFig" },
      { "gen": true }
    ],
    "priorKnowledge": {
      "syllabusRef": { "ref": "edb.bio", "location": "Compulsory I" },
      "beyond": [
        { "t": "Good point", "src": { "ref": "phys.1", "location": "p10" } }
      ]
    }
  },
  {
    "id": "item-json-bad-ref",
    "priorKnowledge": {
      "syllabusRef": {
        "ref": "edb.bio",
        "Compulsory I(b) Cellular organisation": "Compulsory I"
      }
    }
  },
  {
    id: 'item-js-bad-array-middle',
    visuals: [
      { fig: 'figA' },


      { gen: true }
    ],
    priorKnowledge: {
      beyond: [
        {
          t: 'Beyond point',
          src: {
            ref: 'phys.1'
          }
        }
      ]
    }
  },
  {
    id: 'item-js-bad-array-start',
    visuals: [


      { fig: 'figB' }
    ]
  },
  {
    "id": "item-json-bad-array-end",
    "keyFacts": [
      "Fact 1"


    ]
  }
];
`;

  const { findings } = scanCode(SYNTHETIC_FIXTURE, 'synthetic-fixture.js');

  const byItem = (id) => findings.filter((r) => r.itemId === id);
  const good = byItem('item-json-good');
  if (good.length === 0) {
    ok('known-good item passed cleanly (0 findings)');
  } else {
    fail(`known-good item produced unexpected findings: ${JSON.stringify(good)}`);
  }

  const badRef = byItem('item-json-bad-ref');
  if (badRef.length === 1 && badRef[0].field === 'syllabusRef' && /has 'ref' but no 'location'/.test(badRef[0].reason)) {
    ok(`malformed syllabusRef (JSON style) caught: ${badRef[0].itemId} ${badRef[0].field}`);
  } else {
    fail(`malformed syllabusRef was NOT caught as expected: ${JSON.stringify(badRef)}`);
  }

  const badMid = byItem('item-js-bad-array-middle');
  const arrMid = badMid.find((f) => f.field === 'visuals');
  const srcMid = badMid.find((f) => f.field === 'src');
  if (arrMid && /between entries/.test(arrMid.reason)) {
    ok(`orphaned array element between entries (JS style) caught: ${arrMid.itemId} ${arrMid.field}[]`);
  } else {
    fail(`orphaned array element between entries was NOT caught: ${JSON.stringify(badMid)}`);
  }
  if (srcMid && /has 'ref' but no 'location'/.test(srcMid.reason)) {
    ok(`malformed beyond[].src (JS style) caught: ${srcMid.itemId} ${srcMid.field}`);
  } else {
    fail(`malformed beyond[].src was NOT caught: ${JSON.stringify(badMid)}`);
  }

  const badStart = byItem('item-js-bad-array-start');
  if (badStart.length === 1 && badStart[0].field === 'visuals' && /after \[/.test(badStart[0].reason)) {
    ok(`orphaned array element after [ caught: ${badStart[0].itemId} ${badStart[0].field}[]`);
  } else {
    fail(`orphaned array element after [ was NOT caught: ${JSON.stringify(badStart)}`);
  }

  const badEnd = byItem('item-json-bad-array-end');
  if (badEnd.length === 1 && badEnd[0].field === 'keyFacts' && /before \]/.test(badEnd[0].reason)) {
    ok(`orphaned array element before ] caught: ${badEnd[0].itemId} ${badEnd[0].field}[]`);
  } else {
    fail(`orphaned array element before ] was NOT caught: ${JSON.stringify(badEnd)}`);
  }

  console.log(bad === 0 ? '\nSELFTEST OK' : `\n${bad} SELFTEST FAILURES`);
  process.exit(bad === 0 ? 0 : 1);
}

// -----------------------------------------------------------------------------
// Live corpus check
// -----------------------------------------------------------------------------
console.log('— checking array literals and reference objects across outputs/study/corpus/*.js —');

const files = readdirSync(corpusDir).filter((f) => f.endsWith('.js')).sort();
let totalArrays = 0;
let allFindings = [];

for (const f of files) {
  const code = readFileSync(join(corpusDir, f), 'utf8');
  const { findings, arrayCount } = scanCode(code, `outputs/study/corpus/${f}`);
  totalArrays += arrayCount;
  for (const item of findings) {
    allFindings.push(item);
    fail(`${item.file}:${item.line}: item "${item.itemId}" ${item.field}[]: ${item.reason}`);
  }
}

if (bad === 0) {
  ok(`${files.length} corpus files scanned, ${totalArrays} array literals checked clean`);
  console.log('\nALL PASS');
  process.exit(0);
} else {
  console.log(`\n${bad} FAILURES`);
  process.exit(1);
}
