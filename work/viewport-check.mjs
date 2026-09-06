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
