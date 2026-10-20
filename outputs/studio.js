/*
 * studio.js — entry point.
 *
 * The parts are imported in their original order, then their init()s are
 * called in that same order. The two steps are separate on purpose: the
 * parts import each other cyclically, so a part's body can run before
 * another part has reached a `let` it needs. Declarations first, side
 * effects afterwards, exactly as one top-to-bottom file used to guarantee.
 */
import './studio/imports.js';
import { init as init_hide_and_search_js } from './studio/hide-and-search.js';
import './studio/search-viewer-frame.js';
import { init as init_spatial_concept_overlays_js } from './studio/spatial-concept-overlays.js';
import './studio/cavity-geometry-derived.js';
import { init as init_visualisation_modes_js } from './studio/modes-and-bridge.js';
import './studio/scene.js';
import { init as init_depth_picking_js } from './studio/depth-picking.js';
import { init as init_live_physiology_js } from './studio/live-physiology.js';
import { init as init_tools_and_capture_js } from './studio/tools-and-capture.js';
import { init as init_heart_atlas_js } from './studio/heart-atlas.js';
import { init as init_limb_atlas_js } from './studio/limb-atlas.js';
import { init as init_muscle_zoom_js } from './studio/muscle-zoom.js';
import { init as init_cell_zoom_js } from './studio/cell-zoom.js';
import { init as init_circulation_extras_js } from './studio/circulation-extras.js';

init_hide_and_search_js();
init_spatial_concept_overlays_js();
init_visualisation_modes_js();
init_depth_picking_js();
init_live_physiology_js();
init_tools_and_capture_js();
init_heart_atlas_js();
init_limb_atlas_js(); /* after the heart atlas: it wraps window.__osteo.exitHeartAtlas */
init_muscle_zoom_js(); /* after the limb vessels: it wraps the same hook again */
init_cell_zoom_js(); /* after the muscle zoom: and again */
init_circulation_extras_js();
/* Last: its __osteo surface must exist by the time the study half's viewer
   page asks for it, and the ctrlpill routing it reads was wired by
   depth-picking's init above. */
