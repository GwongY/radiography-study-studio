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
import { init as init_visualisation_modes_js } from './studio/visualisation-modes.js';
import './studio/region-boxes-how.js';
import { init as init_depth_picking_js } from './studio/depth-picking.js';
import { init as init_live_physiology_js } from './studio/live-physiology.js';

init_hide_and_search_js();
init_spatial_concept_overlays_js();
init_visualisation_modes_js();
init_depth_picking_js();
init_live_physiology_js();
