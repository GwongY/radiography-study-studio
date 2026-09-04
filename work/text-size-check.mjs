/*
 * Does the text-size control actually move the text?
 *
 * html[data-ts] scales type through --ts, and for a long time it did so
 * through a hand-kept list of selectors at the end of app.css. Lists like that
 * rot silently: every new element defaults to not scaling, nothing fails, and
 * the only signal is a reader saying the control does nothing. Counted when
 * this check was written, before the fix: 27 selectors scaled, 198 did not.
 *
 * The rule now is the other way round -- everything scales, and what does NOT
 * is stated here, in FIXED. This walks app.css and fails if any rule sets a
 * font size in px without `* var(--ts)` unless its selector is fixed by that
 * list. A new element that forgets to scale is a build failure, not a bug
 * report.
 *
 * WHAT BELONGS IN FIXED, and why each group is there:
 *   - the nav rail and the bottom tab bar. Fixed-height chrome; growing the
 *     label overflows the bar rather than the bar growing to fit.
 *   - the view header. It is measured into --headh and the layout follows it,
 *     so it COULD grow -- but it grows at the expense of the 3D stage, which
 *     is the one thing on that screen you cannot make smaller.
 *   - icon glyphs (.ic) and anything inside an SVG. Symbols sized to their
 *     button, and drawing internals whose coordinates are the layout.
 *   - everything drawn over the stage -- the pick stack, the hidden tray, the
 *     tool chip, the overlay card, the selection panel. They are positioned,
 *     not flowed; there is nowhere for them to grow into.
 *   - the two 16px inputs. 16px is what stops iOS zooming the page on focus.
 *     They may only ever go UP, and --ts never goes below 1, so scaling them
 *     would be safe -- they are here because they are chrome, not prose.
 *
 * Run: node work/text-size-check.mjs
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const raw = readFileSync(join(root, 'outputs', 'app.css'), 'utf8').replace(/\r\n/g, '\n');
/*
 * Blank the comments before parsing, keeping every offset. Without this the
 * walk below reads a sentence inside a comment as a selector and reports
 * "/* 44px is Apple's minimum tap target" as a rule that does not scale --
 * which it did, and which buried the eighty real findings under it.
 */
const css = raw.replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, ' '));

const FIXED = [
  '.navrail', '.bottomtab', '.navhead', '.seg', '.ctrlpill', '.sesscount', '.sessprog',
  '.stagenote', '.uncoverbanner', '.toolchip', '.pickstack', '.hiddentray', '.selpanel',
  '.xray-exp', '.lessonvis-readout', '.flowkey', '.layerchip', '.layerhint', '.livechip',
  '.physline', '.overlaycard', '.vsheet-lab', '.modebar', '.studypool', '.studyscore',
  '.struct', '.mv-read', '.mv-ends', '.lessonvis-busy', '.diagram-wrap', '.lessonvis-mount',
  '.sheethead input', '.typed-row input', '.toast', '.nostudy', '.progress', '.stage-hint',
  '.stage-meta', '.stage-state', '.mode-btn', '.icon-btn', '.stage-label', '.stage-controls',
];
const isFixed = (sel) => {
  if (/\.ic\b/.test(sel) || sel.includes('svg')) return true;
  return FIXED.some((f) => sel === f || sel.startsWith(`${f} `) || sel.startsWith(`${f}.`)
    || sel.startsWith(`${f}>`) || sel.startsWith(`${f}:`));
};

let fails = 0;
const fail = (m) => { console.log(`  !! ${m}`); fails++; };

/*
 * The WHOLE file, with no cut.
 *
 * This used to stop at the text-size block, on the reasoning that the block
 * restates sizes and would report itself. It does not need the exemption --
 * every rule in it is a scaled calc(), so it passes on its own merits -- and
 * the cut had a cost that only showed up under a self-test: 108 lines of
 * stylesheet live after that block, and every rule in them was unchecked. A
 * deliberately broken rule appended to the file was not reported. Eleven real
 * unscaled declarations were sitting in there at the time.
 */

/*
 * Walk the braces rather than the lines.
 *
 * The first version of this matched /^selector{body}$/ per line, and this
 * stylesheet packs several rules onto one line -- so it read 116 rules where
 * the file holds 217 font sizes, and two unscaled declarations sat inside its
 * blind spot while it printed a pass. A checker that cannot see the whole file
 * is worse than no checker, because it is trusted. This tracks depth, steps
 * into at-rules, and yields every style rule wherever it sits.
 */
function* rules(src) {
  let i = 0, selStart = 0, depth = 0, blockStart = 0, sel = '';
  while (i < src.length) {
    const c = src[i];
    if (c === '{') {
      if (depth === 0) { sel = src.slice(selStart, i).trim(); blockStart = i + 1; }
      depth++;
    } else if (c === '}') {
      depth--;
      if (depth === 0) {
        const body = src.slice(blockStart, i);
        /* An at-rule wraps rules; a style rule wraps declarations. */
        if (sel.startsWith('@')) yield* rules(body);
        else if (sel) yield { sel, body, at: blockStart };
        selStart = i + 1;
      }
    }
    i++;
  }
}

console.log('— every content font size scales with --ts —');
let scaled = 0, fixedCount = 0, looked = 0;
for (const { sel, body } of rules(css)) {
  looked++;
  /*
   * A `font:` shorthand keeps its px size and gets a scaled `font-size` after
   * it, because calc() inside the shorthand is not worth relying on. So the
   * presence of a raw px says nothing on its own -- what settles it is whether
   * a scaled font-size follows. Testing the raw px first got this backwards
   * and reported forty-three correctly scaled rules as broken.
   */
  const scaledHere = /font-size:\s*calc\([^;}]*var\(--ts\)/.test(body);
  const rawPx = /font-size:\s*[\d.]+px/.test(body) || /\bfont:[^;}]*?[\d.]+px/.test(body);
  if (!rawPx && !scaledHere) continue;
  if (scaledHere) { scaled++; continue; }
  const parts = sel.split(',').map((s) => s.trim());
  if (parts.every(isFixed)) { fixedCount++; continue; }
  fail(`${parts.filter((s) => !isFixed(s)).join(', ')} sets a font size that does not scale`);
}
console.log(`  ok ${scaled} rules scale, ${fixedCount} are deliberately fixed, ${looked} rules read`);
/*
 * The parser's own guard, and it has earned its place: the first version of
 * this file read 116 rules where the stylesheet holds several hundred, and
 * printed a pass over the ones it could not see.
 *
 * Every scaled declaration before the override block belongs to exactly one
 * rule, so counting them in the text and counting the rules the walk found
 * must agree. If the walk goes blind again, this says so instead of the
 * results quietly narrowing.
 */
const declared = (css.match(/font-size:\s*calc\([^;}]*var\(--ts\)/g) || []).length;
if (declared !== scaled) fail(`${declared} scaled declarations in the text but the walk found ${scaled} rules — the parser is missing some`);

/*
 * The steps themselves. A control with three settings that land within a few
 * per cent of each other is a control that appears not to work, which is how
 * this file came to exist -- so the gaps are asserted, not just the values.
 */
console.log('\n— the three steps are far enough apart to feel like steps —');
const step = (sel) => {
  const m = css.match(new RegExp(`${sel}\\{--ts:([\\d.]+)\\}`));
  return m ? Number(m[1]) : NaN;
};
const std = step(':root'), lg = step('html\\[data-ts="l"\\]'), xl = step('html\\[data-ts="xl"\\]');
console.log(`  Standard ${std}   Large ${lg}   Largest ${xl}`);
if (!(std >= 1)) fail(`Standard is ${std}: --ts below 1 would shrink the app below its designed size`);
if (!(lg / std >= 1.12)) fail(`Large is only ${((lg / std - 1) * 100).toFixed(0)}% above Standard — under 12% does not read as a step`);
if (!(xl / lg >= 1.12)) fail(`Largest is only ${((xl / lg - 1) * 100).toFixed(0)}% above Large`);
if (!(xl <= 1.8)) fail(`Largest is ${xl}: past about 1.8 the fixed chrome and the scaled type stop agreeing`);
if (!fails) console.log('  ok each step is a real step, and the range stays inside what the layout holds');

/*
 * The sizes that are not in the stylesheet at all.
 *
 * A handful of templates set font-size in a style attribute, where no CSS rule
 * can reach them and the walk above cannot see them. That is how the Learn
 * page's topic titles stayed at 17px through all three settings while
 * everything around them grew -- the single most visible thing on that screen,
 * and the reason this section exists.
 *
 * The two allowed to stay fixed are an icon glyph and the movement bar's
 * title, which is drawn over the 3D stage. Anything else must carry its own
 * `* var(--ts)`, inline, exactly as the stylesheet does.
 */
console.log('\n— the sizes written inline in the templates scale too —');
const TEMPLATES = ['radiography-study-studio.html', 'study/subject.js', 'study/layout-figures.js',
  'study/spatial-overlay-controls.js', 'study/source-dialog.js', 'study/what-is-under.js',
  'study/course-timetable.js', 'study/viewer-tools.js', 'study/lesson-visuals.js',
  'study/review-mistakes-due.js', 'study/global-search-one.js', 'study/small-ui-helpers.js'];
const INLINE_FIXED = [/class="ic"/, /id="mvBarTitle"/];
let inlineOk = 0;
for (const rel of TEMPLATES) {
  let src;
  try { src = readFileSync(join(root, 'outputs', rel), 'utf8'); } catch { continue; }
  for (const line of src.split('\n')) {
    for (const m of line.matchAll(/font-size:\s*calc\([^)]*var\(--ts\)/g)) inlineOk++;
    for (const m of line.matchAll(/font-size:\s*([\d.]+px)/g)) {
      if (line.includes('var(--ts)') && line.indexOf('var(--ts)') > m.index - 40) { inlineOk++; continue; }
      if (INLINE_FIXED.some((re) => re.test(line))) { inlineOk++; continue; }
      fail(`${rel}: inline ${m[0]} does not scale — ${line.trim().slice(0, 60)}`);
    }
  }
}
console.log(`  ok ${inlineOk} inline sizes are scaled or deliberately fixed`);

/* The steps in the CSS and the steps in the JS have to be the same set. */
console.log('\n— the CSS steps and the control agree —');
const js = readFileSync(join(root, 'outputs', 'study', 'text-size.js'), 'utf8');
const ids = [...js.matchAll(/\{\s*id:\s*'([^']*)'/g)].map((m) => m[1]);
const want = ['', 'l', 'xl'];
if (ids.join(',') !== want.join(',')) fail(`text-size.js offers [${ids}], app.css defines [${want}]`);
else console.log(`  ok three steps in both: ${ids.map((i) => i || '(default)').join(', ')}`);

console.log(fails ? `\n${fails} PROBLEM(S)` : '\nTEXT SIZE CHECKS OUT');
process.exit(fails ? 1 : 0);
