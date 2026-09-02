/*
 * Binding check — does every split part import the names it uses?
 *
 * This exists because a split shipped with a missing import and every other
 * check passed. `study/reading-help.js` referenced `plateFor` without importing
 * it: the module loaded fine, the corpus was intact, all ten baselines matched,
 * and the app looked normal until you opened a lesson — at which point the
 * render threw a ReferenceError, left the DOM half-built, and the close button
 * was never wired, so the lesson was blank AND you could not get out of it.
 *
 * Nothing existing could see it. load-check evaluates module scope and this name
 * is only reached inside a function; a ReferenceError under stubs is normal, so
 * it cannot fail on the message either.
 *
 * The rule, scoped to one group of parts at a time:
 *
 *   A part may reference a name only if it declares it, imports it, or the name
 *   is not one of the group's shared top-level names at all.
 *
 * Scoping to the group is what makes this precise. `between`, `read` and `tube`
 * are ordinary locals in half the data modules; they are only interesting inside
 * the group whose original file had them at top level. Data modules are never
 * cross-checked — they are separate modules and never shared a scope.
 *
 * KNOWN LIMIT: prose inside a TEMPLATE literal is still scanned. Quoted
 * strings are stripped below, but template literals nest, and a mis-split
 * there could hide a real reference — which is the one thing this check
 * exists to catch. So a false positive on rendered prose is left in place
 * deliberately: reword the sentence, do not weaken the scan.
 *
 * Usage: node work/binding-check.mjs
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(root, 'outputs');

/* The groups: a directory of parts that were one file before the split. */
const GROUPS = [['studio', 'outputs/studio'], ['study', 'outputs/study']];

const EXPORT_DECL = /^\s*export\s+(?:async\s+)?(?:const|let|var|function|class)\s+([A-Za-z_$][\w$]*)/gm;
const EXPORT_LIST = /export\s*\{([^}]*)\}/g;
const IMPORT_LIST = /import\s*\{([^}]*)\}\s*from/g;
/* Any binding form at all, at any depth: declarations, params, destructuring,
   catch clauses. Over-collecting here only makes the check quieter, never
   wronger — a name this misses is still caught if some sibling exports it. */
const BINDS = [
  /(?:^|[^\w.$])(?:const|let|var|function|class)\s+([A-Za-z_$][\w$]*)/g,
  /(?:^|[^\w.$])(?:function\s*[\w$]*\s*)\(([^)]*)\)/g,
  /\(([^)]*)\)\s*=>/g,
  /(?:^|[^\w.$])([A-Za-z_$][\w$]*)\s*=>/g,
  /(?:const|let|var)\s*[[{]([^}\]]*)[}\]]/g,
  /catch\s*\(\s*([A-Za-z_$][\w$]*)/g,
  /for\s*\(\s*(?:const|let|var)\s+([A-Za-z_$][\w$]*)/g,
];

const names = (chunk) => chunk.split(',')
  .map((n) => n.trim().split(/\s+as\s+/).pop().trim().split(':').pop().trim().split('=')[0].trim().replace(/^\.\.\./, ''))
  .filter((n) => /^[A-Za-z_$][\w$]*$/.test(n));

let fail = 0;
const ok = (good, msg) => { console.log(`  ${good ? 'ok  ' : 'FAIL'} ${msg}`); if (!good) fail++; };

let groupsSeen = 0;
for (const [label, relDir] of GROUPS) {
  const dir = join(root, relDir);
  if (!existsSync(dir)) continue;
  groupsSeen++;
  const files = readdirSync(dir).filter((f) => f.endsWith('.js')).sort();

  /* Everything the group shares between its parts. */
  const shared = new Map();          /* name -> file that exports it */
  const read = new Map();
  for (const f of files) {
    const src = readFileSync(join(dir, f), 'utf8');
    read.set(f, src);
    for (const m of src.matchAll(EXPORT_DECL)) shared.set(m[1], f);
    for (const m of src.matchAll(EXPORT_LIST)) for (const n of names(m[1])) if (n !== 'default') shared.set(n, f);
  }

  console.log(`— ${relDir}/*.js: every part imports what it uses (${shared.size} shared names) —`);
  for (const f of files) {
    const src = read.get(f);
    const bound = new Set();
    for (const re of BINDS) for (const m of src.matchAll(re)) for (const n of names(m[1])) bound.add(n);
    for (const m of src.matchAll(IMPORT_LIST)) for (const n of names(m[1])) bound.add(n);

    /*
     * Scan CODE lines only. Whole-line comments carry prose — "an imported
     * binding is read-only" flagged `read` — and an import line carries a
     * filename, where `./small-ui-helpers.js` flagged `ui`. Dropping both kinds
     * of line is enough; it cannot hide a real reference, because a reference
     * has to appear on a line that runs.
     */
    let inBlock = false;
    const code = src.split(/\r?\n/).filter((l) => {
      const t = l.trim();
      const wasBlock = inBlock;
      if (!inBlock && t.includes('/*') && !t.includes('*/')) inBlock = true;
      else if (inBlock && t.includes('*/')) inBlock = false;
      if (wasBlock || t.startsWith('*') || t.startsWith('/*') || t.startsWith('//')) return false;
      return !/^\s*(?:import|export)\s*[{*]?[^=]*from\s*'/.test(l) && !/^\s*import\s+'/.test(l);
    }).join('\n')
      /*
       * ...then quoted strings, which carry prose for the same reason a
       * comment does: STORAGE_PREFIX + 'attendance' is not a call to
       * attendance(), and a nav kicker listing the word is not one either.
       * Template literals are deliberately NOT stripped -- they nest, and a
       * mis-split there could hide a real reference instead of prose.
       */
      .replace(/'(?:[^'\\\n]|\\.)*'/g, "''")
      .replace(/"(?:[^"\\\n]|\\.)*"/g, '""');

    const missing = new Set();
    /*
     * A reference: an identifier not preceded by a dot and not an object key.
     * `(?![\w$])` pins the end of the identifier — without it the engine
     * backtracks into the name to satisfy the key guard, so `answer:` matched as
     * `answe` + `r` and every object key looked like a free variable.
     */
    for (const m of code.matchAll(/(?:^|[^\w.$])([A-Za-z_$][\w$]*)(?![\w$])(?!\s*:)/g)) {
      const n = m[1];
      if (bound.has(n)) continue;
      const owner = shared.get(n);
      if (owner && owner !== f) missing.add(`${n} (exported by ${owner})`);
    }
    for (const m of [...missing].sort()) ok(false, `${relDir}/${f} uses ${m} but does not import it`);
  }
}

if (!groupsSeen) console.log('  no split groups present — nothing to check');
console.log(fail ? `\n${fail} FAILED` : '\nALL PASS');
process.exit(fail ? 1 : 0);
