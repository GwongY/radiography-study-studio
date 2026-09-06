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
 * supplied here instead: the iPhone 17 Pro numbers off the 2026-09-06
 * screenshot, the same device healthy, both orientations, a browser tab, a
 * keyboard, and the awkward one — a page reloaded INSIDE an already-shrunken
 * app, which is the case a session-only peak would miss.
 *
 * Usage: node work/viewport-check.mjs
 */
import { SHRINK_FLOOR, describeViewport, diagnose, peakKey } from '../outputs/study/viewport-recovery.js';

let failures = 0;
const fail = (msg) => { failures += 1; console.log(`  FAIL  ${msg}`); };
const ok = (msg) => console.log(`  ok    ${msg}`);
const expect = (label, got, want) => (got === want ? ok(`${label} → ${got}`) : fail(`${label} → ${got}, expected ${want}`));

/* The measurements in docs/TRAPS.md: 402x874pt screen, and a layout viewport
   of 812 when the band is showing. */
const PHONE = { screenW: 402, screenH: 874, innerW: 402, standalone: true, keyboard: false };

console.log('— the state a reading is in —');
expect('healthy standalone portrait',
  diagnose({ ...PHONE, innerH: 874, peakH: 874 }).state, 'ok');
expect('shrunken standalone portrait (the reported defect)',
  diagnose({ ...PHONE, innerH: 812, peakH: 874 }).state, 'shrunk');
expect('a reload inside an already-shrunken app, peak remembered from before',
  diagnose({ ...PHONE, innerH: 812, peakH: 874 }).state, 'shrunk');
expect('the same reload with NOTHING remembered — nothing to compare against',
  diagnose({ ...PHONE, innerH: 812, peakH: 0 }).state, 'ok');
expect('a browser tab, legitimately shorter than the screen',
  diagnose({ ...PHONE, standalone: false, innerH: 730, peakH: 874 }).state, 'browser');
expect('a keyboard up right now',
  diagnose({ ...PHONE, keyboard: true, innerH: 380, peakH: 874 }).state, 'keyboard');

console.log('\n— the floor —');
expect(`${SHRINK_FLOOR - 1}px short is rounding`,
  diagnose({ ...PHONE, innerH: 874 - (SHRINK_FLOOR - 1), peakH: 874 }).state, 'ok');
expect(`${SHRINK_FLOOR}px short is the defect`,
  diagnose({ ...PHONE, innerH: 874 - SHRINK_FLOOR, peakH: 874 }).state, 'shrunk');

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
const d = diagnose({ ...PHONE, innerH: 812, peakH: 874 });
if (d.shortfall !== 62) fail(`shortfall ${d.shortfall}, expected 62`); else ok('shortfall 62px, as measured off the phone');
if (d.screenShortfall !== 62) fail(`screenShortfall ${d.screenShortfall}, expected 62`); else ok('screen-relative shortfall agrees at 62px');
for (const [label, reading] of [
  ['shrunk', { ...PHONE, innerH: 812, peakH: 874 }],
  ['ok', { ...PHONE, innerH: 874, peakH: 874 }],
  ['keyboard', { ...PHONE, keyboard: true, innerH: 380, peakH: 874 }],
  ['browser', { ...PHONE, standalone: false, innerH: 730, peakH: 874 }],
]) {
  const line = describeViewport(diagnose(reading));
  if (!line || /NaN|undefined/.test(line)) fail(`${label} readout is unusable: ${line}`);
  else ok(`${label}: ${line}`);
}

console.log(failures ? `\n${failures} FAILED` : '\nALL PASS');
process.exit(failures ? 1 : 0);
