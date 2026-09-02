/*
 * study.js — entry point.
 *
 * The parts are imported in their original order, then their init()s are
 * called in that same order. The two steps are separate on purpose: the
 * parts import each other cyclically, so a part's body can run before
 * another part has reached a `let` it needs. Declarations first, side
 * effects afterwards, exactly as one top-to-bottom file used to guarantee.
 */
import './study/imports.js';
import './study/storage-versioned-keys.js';
import './study/moving-progress-between.js';
import './study/reset.js';
import { init as init_small_ui_helpers_js } from './study/small-ui-helpers.js';
import './study/home.js';
import './study/navigation-five-destinations.js';
import './study/review-mistakes-due.js';
import './study/more-sources-coverage.js';
import './study/global-search-one.js';
import './study/search-viewer-open.js';
import './study/hidden-tray.js';
import './study/spatial-overlay-controls.js';
import './study/subject.js';
import './study/what-is-under.js';
import './study/session-engine.js';
import './study/lesson-visuals.js';
import './study/reading-help.js';
import { init as init_layout_figures_js } from './study/layout-figures.js';
import { init as init_source_dialog_js } from './study/source-dialog.js';
import './study/coverage-report.js';
import './study/mastery-dashboard.js';
import { init as init_course_timetable_js } from './study/course-timetable.js';
import { init as init_viewer_tools_js } from './study/viewer-tools.js';
import { init as init_boot_js } from './study/boot.js';
import { init as init_dialog_behaviour_applied_js } from './study/dialog-behaviour-applied.js';

init_small_ui_helpers_js();
init_layout_figures_js();
init_source_dialog_js();
init_boot_js();
init_dialog_behaviour_applied_js();
init_course_timetable_js();
init_viewer_tools_js();
