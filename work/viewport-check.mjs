/*
 * The viewport diagnosis — driven with readings no phone here can produce.
 *
 * outputs/study/viewport-recovery.js decides whether the app is sitting in a
 * layout viewport the browser has silently shortened. That decision has two
 * ways to be wrong and both are expensive:
 *
 *   a FALSE POSITIVE fires the recovery flip — a visible reconfiguration of
 *   the page — on a device that is perfectly healthy, and drops the tab bar's
 *   safe-area inset, putting the buttons under the home indicator;
 *   a FALSE NEGATIVE leaves the band exactly where four previous fixes left
 *   it, and reports all clear while the reader is looking at it.
 *
 * Nothing in this repo runs on the affected device, so the readings are
 * supplied here instead — including the pair the first version of this file
 * got wrong, which cost a shipped fix that could not see the bug at all:
 *
 *   812 of 874 WITH a top inset   the page covers the status bar, so its top
 *                                 edge is pinned to the top of the screen and
 *                                 the missing 62px can only be at the bottom.
 *                                 That is the defect.
 *   812 of 874 with NO top inset  the status bar is opaque, the page starts
 *                                 below it and reaches the bottom. Identical
 *                                 shortfall, nothing wrong — and firing here
 *                                 would drop a safe-area inset that is real.
 *
 * The first version compared only against a remembered peak. On a device that
 * has NEVER reported the full height that reads 812 against 812 and says all
 * clear, which is exactly what the reader was shown. That case is still here,
 * now expected to be caught by the screen comparison instead.
 *
 * Usage: node work/viewport-check.mjs
 */
import { SHRINK_FLOOR, describeViewport, detailViewport, diagnose, peakKey } from '../outputs/study/viewport-recovery.js';

let failures = 0;
const fail = (msg) => { failures += 1; console.log(`  FAIL  ${msg}`); };
const ok = (msg) => console.log(`  ok    ${msg}`);
const expect = (label, got, want) => (got === want ? ok(`${label} → ${got}`) : fail(`${label} → ${got}, expected ${want}`));

/*
 * The measurements off the reported device: a 402x874pt screen, a layout
 * viewport of 812, and a 62px top inset — which is what says the page is
 * painting under the status bar, and therefore that the missing 62 is at the
 * bottom. Read from the app itself on 2026-09-06, not assumed.
 */
const PHONE = {
  screenW: 402, screenH: 874, innerW: 402, standalone: true, keyboard: false,
  insetTop: 62, insetBottom: 34,
};
/* The same phone with an OPAQUE status bar. Identical shortfall, no defect:
   the viewport starts below the status bar and reaches the screen bottom, and
   iOS says so by reporting no top inset. */
const OPAQUE = { ...PHONE, insetTop: 0 };

console.log('— the state a reading is in —');
expect('healthy standalone portrait',
  diagnose({ ...PHONE, innerH: 874, peakH: 874 }).state, 'ok');
expect('THE REPORTED DEFECT — 812 of 874 with a top inset, never seen taller',
  diagnose({ ...PHONE, innerH: 812, peakH: 812 }).state, 'shrunk');
expect('...and it is diagnosed as floating above the screen bottom',
  diagnose({ ...PHONE, innerH: 812, peakH: 812 }).floating, true);
expect('an opaque status bar — same 812 of 874, no top inset, NOT a defect',
  diagnose({ ...OPAQUE, innerH: 812, peakH: 812 }).state, 'ok');
expect('...and its bottom inset is left alone',
  diagnose({ ...OPAQUE, innerH: 812, peakH: 812 }).insetDead, false);
expect('the keyboard shape as well — shrunk from a height it once reported',
  diagnose({ ...OPAQUE, innerH: 812, peakH: 874 }).state, 'shrunk');
expect('a browser tab, legitimately shorter than the screen',
  diagnose({ ...PHONE, standalone: false, innerH: 730, peakH: 874 }).state, 'browser');
expect('a keyboard up right now',
  diagnose({ ...PHONE, keyboard: true, innerH: 380, peakH: 874 }).state, 'keyboard');

console.log('\n— dropping the bottom inset, which is the part that can hurt —');
/* Getting this wrong puts the tab buttons under the home indicator. */
expect('62px short with a 34px inset: the indicator is outside the page',
  diagnose({ ...PHONE, innerH: 812, peakH: 812 }).insetDead, true);
expect('a healthy full-height viewport keeps its inset',
  diagnose({ ...PHONE, innerH: 874, peakH: 874 }).insetDead, false);
expect('short by less than the inset itself: not proven, keep it',
  diagnose({ ...PHONE, innerH: 874 - 30, peakH: 874 }).insetDead, false);
expect('a keyboard shrink never drops it — the screen is still reachable',
  diagnose({ ...OPAQUE, innerH: 812, peakH: 874 }).insetDead, false);
expect('a phone with no home indicator (inset 0) has nothing to drop',
  diagnose({ ...PHONE, insetBottom: 0, innerH: 812, peakH: 812 }).insetDead, false);

console.log('\n— the floor —');
expect(`${SHRINK_FLOOR - 1}px short is rounding`,
  diagnose({ ...PHONE, innerH: 874 - (SHRINK_FLOOR - 1), peakH: 874 - (SHRINK_FLOOR - 1) }).state, 'ok');
expect(`${SHRINK_FLOOR}px short is the defect`,
  diagnose({ ...PHONE, innerH: 874 - SHRINK_FLOOR, peakH: 874 - SHRINK_FLOOR }).state, 'shrunk');

console.log('\n— rotation is not a shrink —');
/* The trap this guards: landscape innerH is 402 against a portrait peak of
   874. A peak that is not kept per orientation calls that a 472px defect and
   flips the viewport on every rotation, forever. */
const land = { screenW: 402, screenH: 874, innerW: 874, innerH: 402, standalone: true, keyboard: false };
expect('landscape, against its OWN peak', diagnose({ ...land, peakH: 402 }).state, 'ok');
if (peakKey({ ...PHONE, innerH: 874 }) === peakKey(land)) {
  fail('portrait and landscape share a peak key — a rotation would read as a shrink');
} else ok(`portrait and landscape keys differ (${peakKey({ ...PHONE, innerH: 874 })} vs ${peakKey(land)})`);
/* And the same device held either way must not get two different DEVICE keys,
   or every rotation starts a fresh peak and the defect is never seen again. */
const rotatedScreen = { ...land, screenW: 874, screenH: 402 };
if (peakKey(rotatedScreen) !== peakKey(land)) {
  fail('screen.width/height swapping on rotation starts a new peak — the key must be orientation-independent');
} else ok('a screen that swaps its own width and height on rotation keys the same');

console.log('\n— the offset the strip fill is driven by —');
/*
 * This is the one that would have shipped a disaster. The strip fill gives
 * .shell a bottom of `-1 * --vp-shortfall`. With an OPAQUE status bar the
 * viewport is STILL 62px shorter than the screen — but it starts 62px lower
 * and already reaches the bottom, so an offset there drags the shell, and the
 * tab bar with it, clean off the device. The offset is only ever the gap that
 * is genuinely underneath the page, which is what `floating` means.
 */
const offset = (r) => { const x = diagnose(r); return x.floating ? x.screenShortfall : 0; };
expect('translucent, floating: the strip is real, offset by it',
  offset({ ...PHONE, innerH: 812, peakH: 812 }), 62);
expect('OPAQUE, same 62px shortfall, page reaches the bottom: offset 0',
  offset({ ...OPAQUE, innerH: 812, peakH: 812 }), 0);
expect('a healthy full-height viewport: offset 0',
  offset({ ...PHONE, innerH: 874, peakH: 874 }), 0);
expect('a keyboard shrink is not a strip: offset 0',
  offset({ ...OPAQUE, innerH: 812, peakH: 874 }), 0);
expect('a browser tab is not a strip: offset 0',
  offset({ ...PHONE, standalone: false, innerH: 730, peakH: 874 }), 0);

console.log('\n— the 11" iPad Pro, landscape: a real reading off the device —');
/*
 * Taken from the affected iPad, pasted verbatim out of the More readout:
 *
 *   screen 834, viewport 1210x802, insets top 32 bottom 25, peak 834,
 *   short by 32 (screen) / 32 (peak), state shrunk, floating, inset dead
 *
 * The diagnosis was never the problem here — every one of these assertions
 * ALREADY passed before the fix. The band survived because both CSS rules
 * that consume the finding were written inside `@media(max-width:700px)`, and
 * this viewport is 1210 wide. So the value of this case is narrow and exact:
 * it pins the numbers a non-phone device produces, so that if anyone ever
 * retunes SHRINK_FLOOR or the `covering` discriminator for a phone, the iPad
 * stops being collateral damage nobody measures.
 *
 * Note it is LANDSCAPE (1210 > 802) and that `expected` is therefore the
 * SHORTER screen dimension. A tablet used sideways is the ordinary case, and
 * it is the one where an orientation-blind peak does the most damage.
 */
const IPAD11 = {
  screenW: 834, screenH: 1210, innerW: 1210, innerH: 802,
  standalone: true, keyboard: false, insetTop: 32, insetBottom: 25,
};
const ipad = diagnose({ ...IPAD11, peakH: 834 });
expect('iPad 11" landscape state', ipad.state, 'shrunk');
expect('iPad 11" is floating (top inset 32 → the gap is underneath)', ipad.floating, true);
expect('iPad 11" screen shortfall', ipad.screenShortfall, 32);
expect('iPad 11" published --vp-shortfall', ipad.shortfall, 32);
expect('iPad 11" strip offset', offset({ ...IPAD11, peakH: 834 }), 32);
/* 25px of home-indicator inset against a 32px gap: the indicator is outside
   the page entirely, so the padding is protecting nothing. */
expect('iPad 11" bottom inset is dead', ipad.insetDead, true);
/* The same tablet with an opaque status bar is NOT a defect, at any width —
   the discriminator has to hold above 700px exactly as it does below it. */
expect('iPad 11", opaque status bar: no band, offset 0',
  offset({ ...IPAD11, insetTop: 0, peakH: 834 }), 0);
/* A healthy iPad must publish 0, or the new width-independent rule would drag
   the shell off the bottom of every tablet that was fine. */
expect('iPad 11" at full height: offset 0',
  offset({ ...IPAD11, innerH: 834, peakH: 834 }), 0);

console.log('\n— the numbers that get printed —');
const d = diagnose({ ...PHONE, innerH: 812, peakH: 812 });
if (d.screenShortfall !== 62) fail(`screenShortfall ${d.screenShortfall}, expected 62`); else ok('shortfall 62px, as measured off the phone');
if (d.shortfall !== 62) fail(`published shortfall ${d.shortfall}, expected 62`); else ok('the published --vp-shortfall is 62px');
for (const [label, reading] of [
  ['floating', { ...PHONE, innerH: 812, peakH: 812 }],
  ['keyboard-shrunk', { ...OPAQUE, innerH: 812, peakH: 874 }],
  ['ok', { ...PHONE, innerH: 874, peakH: 874 }],
  ['ok, opaque status bar', { ...OPAQUE, innerH: 812, peakH: 812 }],
  ['keyboard', { ...PHONE, keyboard: true, innerH: 380, peakH: 874 }],
  ['browser', { ...PHONE, standalone: false, innerH: 730, peakH: 874 }],
]) {
  const dd = diagnose(reading);
  const line = describeViewport(dd);
  const detail = detailViewport(dd);
  if (!line || /NaN|undefined/.test(line)) fail(`${label} readout is unusable: ${line}`);
  else ok(`${label}: ${line}`);
  if (/NaN|undefined/.test(detail)) fail(`${label} detail is unusable: ${detail}`);
}
ok(`detail line: ${detailViewport(d)}`);

console.log(failures ? `\n${failures} FAILED` : '\nALL PASS');
process.exit(failures ? 1 : 0);
