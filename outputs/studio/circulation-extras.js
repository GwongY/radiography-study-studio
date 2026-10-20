/*
 * Circulation extras
 *
 * What BetterHeart's pages add to the explorer's own Arterial, Venous and Heart layers, without opening an atlas
 * mode:
 *
 *   - the heart     the atlas heart IS the Heart chip's heart: whenever the chip is on, the atlas heart (moving
 *                   valves, coronaries, four-chamber colours when ghosted) stands in for the explorer's heart meshes
 *                   (studio/heart-atlas.js: enterEnhancedHeart). Anything that needs the explorer's own meshes --
 *                   focus, Projection, isolation, the atlas modes -- switches it off through the usual exit hook;
 *                   the watcher below brings it back once the viewer has been calm for half a second.
 *   - flow dots     travelling dots along the vessel centre-lines (outputs/limb/vessel-dots.js), a switch in the
 *                   layer rail (study/subject.js) through `window.__osteo.circulation`
 *
 * Colours and tap-to-select are deliberately NOT changed here: the rail's colour key already follows the
 * oxygenation convention, and a tap selects one side at a time because telling left from right is the viewer's L2
 * drill (see loadExtraModel). The both-sides trace lives in the Limb vessels mode.
 *
 * Nothing runs at module scope; init() publishes the API and starts the per-frame watcher.
 */
import { state } from './imports.js';
import { showToast } from './visualisation-modes.js';
import { enterEnhancedHeart } from './heart-atlas.js';

let dots = null, dotsOn = false, dotsLoading = false;
let calm = 0, heartFailed = false;
const CALM_FRAMES = 30;

const notify = () => window.dispatchEvent(new CustomEvent('osteo:layers'));

/* The enhanced heart is wanted whenever the Heart chip is on and nothing else has claimed the heart meshes. A
   failed start (alignment check, no network for the first load) is not retried until the page is reloaded. */
function watchHeart() {
  const idle = !!state.layers.heart && !!(state.extraModels && state.extraModels.circulatory) && !state.heartAtlasOn
    && !state.heartAtlasLoading && !state.xray && !heartFailed;
  if (!idle) { calm = 0; return; }
  if (++calm < CALM_FRAMES) return;
  calm = 0;
  void enterEnhancedHeart({ quiet: true }).then((ok) => { if (!ok && !state.heartAtlasOn) heartFailed = true; });
}

function tick(seconds) {
  watchHeart();
  try {
    if (!dotsOn || !dots) return;
    dots.update(seconds, {
      arterial: !!state.layers.arterial, venous: !!state.layers.venous,
      visible: !state.heartAtlasOn || !!state.enhancedHeartOn, /* the atlas modes draw their own */
      run: !!(window.__osteo && window.__osteo.physiologyOn && window.__osteo.physiologyOn()),
    });
  } catch (error) {
    console.error('Flow dots stopped.', error);
    setDots(false);
  }
}

async function setDots(on) {
  if (!on) {
    dotsOn = false;
    if (dots) dots.detach();
    notify();
    return false;
  }
  if (dotsOn || dotsLoading) return dotsOn;
  const circ = state.extraModels && state.extraModels.circulatory;
  if (!circ) { showToast('Turn on the Arterial or Venous layer first.'); return false; }
  dotsLoading = true;
  try {
    if (!dots) {
      const mod = await import('../limb/vessel-dots.js?v=1');
      dots = await mod.createVesselDots();
    }
    dots.attach(circ.root);
    dotsOn = true;
    notify();
    return true;
  } catch (error) {
    console.error('Flow dots failed to load.', error);
    showToast(navigator.onLine === false ? 'Connect once to download the vessel routes for offline use.' : 'The flow dots could not load. Try again.');
    return false;
  } finally { dotsLoading = false; }
}

export function init() {
  window.__osteo = window.__osteo || {};
  window.__osteo.circulation = {
    state: () => ({ dots: dotsOn }),
    setDots,
  };
  state.extrasTick = tick;
}
