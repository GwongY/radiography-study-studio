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
import { init as init_small_ui_helpers_js } from './study/small-ui-helpers.js';
import { init as init_viewport_recovery_js } from './study/viewport-recovery.js';
import './study/home.js';
import './study/navigation-destinations.js';
import './study/more.js';
import './study/global-search.js';
import './study/search-viewer-open.js';
import './study/hidden-tray.js';
import './study/spatial-overlay-controls.js';
import './study/subject.js';
import { init as init_revise_js } from './study/revise.js';
import './study/what-is-under.js';
import './study/reading-help.js';
import { init as init_assessments_and_marks_js } from './study/assessments-and-marks.js';
import { init as init_briefing_access_js } from './study/briefing-access.js';
import { init as init_weekly_briefing_js } from './study/weekly-briefing.js';
import { init as init_course_timetable_js } from './study/course-timetable.js';
import { init as init_text_size_js } from './study/text-size.js';
import { init as init_viewer_tools_js } from './study/viewer-tools.js';
import { init as init_boot_js } from './study/boot.js';
import { init as init_dialog_behaviour_applied_js } from './study/dialogs.js';

init_small_ui_helpers_js();
/* Before anything measures a header: the viewport is what every other
   measurement in the app is taken against. */
init_viewport_recovery_js();
init_text_size_js();
init_boot_js();
init_dialog_behaviour_applied_js();
init_course_timetable_js();
init_revise_js();
init_assessments_and_marks_js();
init_viewer_tools_js();
/* Migrate the old notice credential and retire the device-only question bank. */
init_briefing_access_js();
init_weekly_briefing_js();
