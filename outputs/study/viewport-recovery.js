/*
 * The band below the tab bar — measuring it, and asking for the space back
 *
 * WHAT IS ACTUALLY WRONG
 *
 * On an installed iOS Home Screen app the shell has repeatedly ended a strip
 * short of the bottom of the screen, with the body background showing through
 * beneath it. Three fixes were tried and all three failed the same way:
 * `height:100%`, then `100dvh`, then a `--vh` custom property written from
 * `window.innerHeight`. A fourth pinned `.shell` with `position:fixed` and
 * `top`/`bottom` both zero, which stops supplying a number at all.
 *
 * They fail together because none of them is wrong. They all faithfully fill
 * THE VIEWPORT THE BROWSER SUPPLIED, and on the affected devices that viewport
 * is itself short: WebKit hands a standalone web app a layout viewport around
 * 60px shorter than the screen and never gives it back. `window.innerHeight`,
 * `visualViewport.height` and `100dvh` all agree with each other and all agree
 * on the wrong number, so every measurement AND every pin lands in the same
 * place. There is nothing a length can do about a viewport that lies.
 *
 * WHAT TRIGGERS IT
 *
 * The soft keyboard, on the reports that describe the mechanism: in standalone
 * mode the keyboard is a viewport resize rather than an overlay, and the
 * viewport does not grow back when it closes — it stays short until the app is
 * force-quit. This app has four ways to raise a keyboard (global search, the
 * typed answer boxes, the gist token, the mark boxes on Course), so one tap on
 * the magnifier in week one is enough to leave a band under every screen for
 * the rest of the session, which is exactly the shape of the complaint.
 *
 * That is a diagnosis, not a proof: it is consistent with the measurements off
 * the phone (874pt screen, 812pt viewport, a 62pt strip) and with what the
 * reports describe, and nothing in this repo can run on the device to settle
 * it. So this part does two separable things, and the second does not depend
 * on the first being right:
 *
 *   1. MEASURE, and publish what it found — as `html[data-viewport]`, as
 *      `--vp-shortfall`, and as a readable line under More. A screenshot of a
 *      black strip cannot be debugged; "portrait peak 874, now 812, short by
 *      62, standalone, no keyboard" can.
 *   2. RECOVER, by rewriting the viewport meta and putting it straight back.
 *      The value it flips to is deliberately equivalent — it is the CHANGE
 *      that makes WebKit re-run viewport configuration, which is the only
 *      lever a page has over a viewport it did not choose.
 *
 * WHAT IT DELIBERATELY DOES NOT DO
 *
 * It never sets a height, a bottom offset or a screen-derived length on
 * anything. docs/TRAPS.md is emphatic about that and it is still right: a
 * number that is wrong the other way puts controls off the bottom of the page
 * on a device nobody here can test. The peak height recorded below is used to
 * decide WHETHER to ask the browser to reconfigure, and to print a number in a
 * diagnostic — never to lay anything out.
 */
import { STORAGE_PREFIX } from './imports.js';
import { read, write } from './storage-versioned-keys.js';
import { toast } from './small-ui-helpers.js';

/* ------------------------------------------------------------------ *
 * The pure half — what a reading means
 * ------------------------------------------------------------------ */

/* The tag this page ships with. Written out here rather than read off the
   element: recovery rewrites the tag, and reading it back after a flip that
   did not complete would quietly promote the fallback to the new base. */
export const VIEWPORT_BASE = 'width=device-width,initial-scale=1,viewport-fit=cover';
/* The flip target. `height=device-height` is legacy WebKit viewport syntax and
   changes nothing about how this page lays out; it is here because it is a
   DIFFERENT STRING, which is the whole mechanism. */
export const VIEWPORT_FLIP = 'width=device-width,initial-scale=1,viewport-fit=cover,height=device-height';

/*
 * Below this a difference is rounding, a rotation still settling, or a
 * scrollbar. The defect measures 59–62px where it is reported, so the line has
 * a wide margin on both sides and does not need to be tuned per device.
 */
export const SHRINK_FLOOR = 24;

/**
 * What one reading of the environment means.
 *
 * `peakH` is the tallest layout viewport this device has ever reported IN THIS
 * ORIENTATION, remembered across loads. Comparing against the device's own
 * previous best is what makes this safe: it needs no assumption about how much
 * of the screen a standalone app is supposed to get, which differs by OS
 * version, by status-bar style and by whether the app is installed at all.
 * `screenShortfall` is computed too, but only ever printed — a browser tab is
 * legitimately shorter than the screen, and deciding on it would fire on every
 * ordinary Safari visit.
 *
 * Pure, so work/viewport-check.mjs can drive it with readings no phone here
 * can produce.
 */
export function diagnose(r) {
  const innerH = Number(r.innerH) || 0;
  const innerW = Number(r.innerW) || 0;
  const peak = Math.max(Number(r.peakH) || 0, innerH);
  const shortfall = Math.max(0, Math.round(peak - innerH));
  const landscape = innerW > innerH;
  const sw = Number(r.screenW) || 0;
  const sh = Number(r.screenH) || 0;
  const expected = sw && sh ? (landscape ? Math.min(sw, sh) : Math.max(sw, sh)) : 0;
  const base = {
    peak, shortfall, expected, landscape,
    screenShortfall: expected ? Math.max(0, Math.round(expected - innerH)) : 0,
  };
  /* A browser tab's chrome is not a defect, and a keyboard that is up right
     now is not one either — both are the viewport doing its job. */
  if (!r.standalone) return { ...base, state: 'browser' };
  if (r.keyboard) return { ...base, state: 'keyboard' };
  return { ...base, state: shortfall >= SHRINK_FLOOR ? 'shrunk' : 'ok' };
}

/** The orientation key a peak is remembered under. */
export function peakKey(reading) {
  const innerW = Number(reading.innerW) || 0;
  const innerH = Number(reading.innerH) || 0;
  const sw = Number(reading.screenW) || 0;
  const sh = Number(reading.screenH) || 0;
  return `${Math.max(sw, sh)}x${Math.min(sw, sh)}:${innerW > innerH ? 'land' : 'port'}`;
}

/** One line of English for the readout. Pure for the same reason. */
export function describeViewport(d) {
  const px = (n) => `${Math.round(n)}px`;
  const now = px(d.peak - d.shortfall);
  if (d.state === 'browser') return `Browser tab · viewport ${now} tall. The band this watches for only appears in the installed app.`;
  if (d.state === 'keyboard') return `Keyboard up · viewport ${now} of ${px(d.peak)}. Nothing is judged while it is.`;
  if (d.state === 'shrunk') return `Short by ${px(d.shortfall)} · viewport ${now} where this device has reported ${px(d.peak)}. That is the band.`;
  return `Full height · viewport ${now}, the tallest this device has reported. No band.`;
}

/* ------------------------------------------------------------------ *
 * The browser half — measure, publish, and ask once
 * ------------------------------------------------------------------ */

const PEAK_KEY = STORAGE_PREFIX + 'viewportpeak';

/*
 * Three flips is the cap, and the reason is not politeness.
 *
 * A flip is a visible reconfiguration of the page. If two of them have not
 * moved the number, the third will not either, and a check that keeps firing
 * would strobe the layout for the rest of the session over a defect it cannot
 * reach. Whatever is left after three is reported and left alone.
 */
const MAX_FLIPS = 3;
const FLIP_GAP_MS = 2000;

let flips = 0;
let lastFlipAt = 0;
let latest = null;

function isStandalone() {
  if (typeof navigator !== 'undefined' && navigator.standalone === true) return true;
  try { return matchMedia('(display-mode: standalone)').matches; } catch { return false; }
}

/*
 * Is a keyboard up? Two independent signs, because neither is reliable alone:
 * an editable element can hold focus with the keyboard dismissed, and the
 * visual viewport shrinks for a form-assistant bar with nothing focused.
 */
function keyboardUp() {
  const el = document.activeElement;
  const editable = !!el && (el.isContentEditable
    || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName));
  const vv = window.visualViewport;
  const squeezed = !!vv && window.innerHeight - vv.height > 120;
  return editable || squeezed;
}

function reading() {
  const s = window.screen || {};
  return {
    standalone: isStandalone(),
    keyboard: keyboardUp(),
    innerW: window.innerWidth,
    innerH: window.innerHeight,
    screenW: s.width || 0,
    screenH: s.height || 0,
  };
}

function peaks() { return read(PEAK_KEY, {}) || {}; }

/*
 * Remembering the peak across loads is what lets a RELOAD inside an already
 * shrunken app still see the defect. The viewport does not recover until the
 * app is force-quit, so a page that only remembered this session's tallest
 * reading would adopt the short one as normal and report all clear.
 */
function rememberPeak(r, d) {
  if (r.keyboard) return d.peak;
  const key = peakKey(r);
  const all = peaks();
  const known = Number(all[key]) || 0;
  if (r.innerH > known) {
    all[key] = r.innerH;
    write(PEAK_KEY, all);
    return r.innerH;
  }
  return known;
}

function publish(d) {
  latest = d;
  const el = document.documentElement;
  el.dataset.viewport = d.state;
  el.style.setProperty('--vp-shortfall', `${d.shortfall}px`);
}

/** The last diagnosis, for the More row. */
export function viewportReport() { return latest || diagnose(reading()); }

/*
 * Rewrite the viewport tag and put it straight back.
 *
 * The two-frame shape matters: setting the same attribute twice inside one
 * task is coalesced and WebKit never sees a change. The re-check afterwards is
 * what turns this from a hope into a measurement — whatever the flip did or
 * did not do is published, and the readout says which.
 */
export function attemptRecovery(now = Date.now()) {
  const meta = document.querySelector('meta[name=viewport]');
  if (!meta || flips >= MAX_FLIPS || now - lastFlipAt < FLIP_GAP_MS) return false;
  flips += 1;
  lastFlipAt = now;
  meta.setAttribute('content', VIEWPORT_FLIP);
  requestAnimationFrame(() => {
    meta.setAttribute('content', VIEWPORT_BASE);
    setTimeout(() => checkViewport(false), 400);
  });
  return true;
}

/** Measure, publish, and — unless told not to — ask for the space back once. */
export function checkViewport(mayRecover = true) {
  const r = reading();
  const d = diagnose({ ...r, peakH: 0 });
  const peak = rememberPeak(r, d);
  const full = diagnose({ ...r, peakH: peak });
  publish(full);
  if (mayRecover && full.state === 'shrunk') attemptRecovery();
  return full;
}

/** The More row's button: try again by hand, and say what happened. */
export function recoverByHand() {
  const before = checkViewport(false);
  if (before.state !== 'shrunk') { toast(describeViewport(before)); return; }
  /* By hand means by hand: the automatic cap must not silently refuse. */
  flips = 0; lastFlipAt = 0;
  attemptRecovery();
  setTimeout(() => toast(describeViewport(checkViewport(false))), 700);
}

/** The note under the More row — the numbers, in a sentence. */
export function viewportNote() {
  const d = viewportReport();
  return describeViewport(d);
}

/*
 * When to look.
 *
 * `focusout` is the one that matters — it is the moment after a keyboard
 * closes, which is when the viewport either comes back or does not. The rest
 * are the ordinary ways a viewport changes size, plus `pageshow`, which fires
 * on a return from the back-forward cache where no resize ever arrives.
 */
export function init() {
  const soon = (() => {
    let t = null;
    return () => { clearTimeout(t); t = setTimeout(() => checkViewport(), 250); };
  })();
  addEventListener('resize', soon, { passive: true });
  addEventListener('orientationchange', soon, { passive: true });
  addEventListener('pageshow', soon, { passive: true });
  addEventListener('focusout', soon, { passive: true });
  addEventListener('visibilitychange', () => { if (!document.hidden) soon(); }, { passive: true });
  if (window.visualViewport) window.visualViewport.addEventListener('resize', soon, { passive: true });
  /* First reading after layout has settled: at load the fonts have not swapped
     and the shell has not been through a frame, so an immediate one measures a
     page mid-assembly. */
  requestAnimationFrame(() => checkViewport());
}
