/*
 * Circulation extras
 *
 * What BetterHeart's pages add to the explorer's own Arterial, Venous and Heart layers, without opening an atlas
 * mode. The layer rail (study/subject.js) shows them whenever one of those chips is on and reaches them through
 * `window.__osteo.circulation`:
 *
 *   - flow dots     travelling dots along the vessel centre-lines (outputs/limb/vessel-dots.js)
 *   - enhanced heart the atlas heart in place of the explorer's heart, beating with Live physiology
 *                   (studio/heart-atlas.js: enterEnhancedHeart)
 *   - scenarios     shortcuts that open the Heart atlas or the Limb vessels straight into a scenario
 *
 * Colours and tap-to-select are deliberately NOT changed here: the rail's colour key already follows the
 * oxygenation convention, and a tap selects one side at a time because telling left from right is the viewer's L2
 * drill (see loadExtraModel). The both-sides trace lives in the Limb vessels mode.
 *
 * Nothing runs at module scope; init() publishes the API.
 */
import { state } from './imports.js';
import { showToast } from './visualisation-modes.js';
import { enterEnhancedHeart, exitEnhancedHeart, openHeartScenario } from './heart-atlas.js';
import { openLimbScenario } from './limb-atlas.js';

/* [id, label]; the ids are the atlas presets' names */
export const HEART_SCENARIOS = [['dynamic', 'Heartbeat'], ['hemo', 'Cath pressures'], ['pci', 'PCI (right coronary)'], ['ivus', 'IVUS / OCT'], ['conduction', 'Conduction & rhythms'], ['echo', 'Ultrasound & M-mode']];
export const LIMB_SCENARIOS = [['flow', 'Blood flow'], ['thromb', 'Clot retrieval'], ['lysis', 'Clot lysis (DVT)'], ['calc', 'Calcium treatment']];

let dots = null, dotsOn = false, dotsLoading = false;

const notify = () => window.dispatchEvent(new CustomEvent('osteo:layers'));

function dotsTick(seconds) {
  try {
    if (!dotsOn || !dots) return;
    dots.update(seconds, {
      arterial: !!state.layers.arterial, venous: !!state.layers.venous,
      visible: !state.heartAtlasOn, /* the atlas modes draw their own */
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
    if (state.extrasTick === dotsTick) state.extrasTick = null;
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
    state.extrasTick = dotsTick;
    notify();
    return true;
  } catch (error) {
    console.error('Flow dots failed to load.', error);
    showToast(navigator.onLine === false ? 'Connect once to download the vessel routes for offline use.' : 'The flow dots could not load. Try again.');
    return false;
  } finally { dotsLoading = false; }
}

async function setHeart(on) {
  if (!on) { exitEnhancedHeart(); return false; }
  return enterEnhancedHeart();
}

async function openScenario(spec) {
  const [kind, name] = String(spec).split(':');
  if (kind === 'heart') return openHeartScenario(name);
  if (kind === 'limb') return openLimbScenario(name);
  return false;
}

export function init() {
  window.__osteo = window.__osteo || {};
  window.__osteo.circulation = {
    state: () => ({ dots: dotsOn, heart: !!state.enhancedHeartOn }),
    setDots, setHeart, openScenario,
    scenarios: () => ({ heart: HEART_SCENARIOS, limb: LIMB_SCENARIOS }),
  };
}
