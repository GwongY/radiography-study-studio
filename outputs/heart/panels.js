/* Panel markup for the clinical scenarios, mounted into the heart atlas panel after the atlas
 * modules load (studio/heart-atlas.js). Ids are `ha-` prefixed: the ported modules look them up by
 * those ids (work/port-betterheart.mjs adds the prefix). English; the Chinese the site shows is
 * not repeated here.
 *
 * Nothing here runs at module scope. */

const DISEASES = [
  ['normal', 'Normal'], ['tr', 'Tricuspid regurgitation (TR)'], ['mr', 'Mitral regurgitation (MR), chronic'], ['mr_acute', 'Mitral regurgitation (MR), acute'],
  ['ms', 'Mitral stenosis (MS)'], ['as', 'Aortic stenosis (AS)'], ['ar', 'Aortic regurgitation (AR), chronic'], ['ar_acute', 'Aortic regurgitation (AR), acute'],
  ['hocm', 'Hypertrophic obstructive cardiomyopathy (HOCM)'], ['ph', 'Pulmonary hypertension (pre-capillary)'], ['tamponade', 'Cardiac tamponade'], ['constriction', 'Constrictive pericarditis'],
];

export function hemoPanelHtml() {
  return `<section id="ha-hemoPanel" class="ha-hemo-panel" aria-label="Haemodynamic pressure monitor" hidden>
    <p class="ha-note">Drag the catheters in. The Swan-Ganz catheter goes right atrium, right ventricle, pulmonary artery, wedge; the pigtail goes from the aorta across the aortic valve into the left ventricle. The monitor shows the ECG and both pressure traces.</p>
    <div class="ha-hemo-controls">
      <div class="ha-hemo-cath sw"><label for="ha-hemoSwan">Swan-Ganz catheter</label><output id="ha-hemoSwanSite">RA</output><input type="range" id="ha-hemoSwan" min="0" max="1000" value="0">
        <div class="ha-hemo-ticks" id="ha-hemoSwanTicks"><span>RA</span><span>RV</span><span>PA</span><span>PCW</span></div></div>
      <div class="ha-hemo-cath pg"><label for="ha-hemoPig">Pigtail catheter</label><output id="ha-hemoPigSite">Ao</output><input type="range" id="ha-hemoPig" min="0" max="1000" value="0">
        <div class="ha-hemo-ticks" id="ha-hemoPigTicks"><span>Ao</span><span>LVOT</span><span>LV</span></div></div>
      <div class="ha-hemo-dz"><label>Condition <select id="ha-hemoDisease">${DISEASES.map(([v, l]) => `<option value="${v}">${l}</option>`).join('')}</select></label>
        <label>Severity <input type="range" id="ha-hemoSev" min="0" max="100" value="100"><output id="ha-hemoSevText">-</output></label></div>
      <div class="ha-hemo-opts"><label><input type="checkbox" id="ha-hemoOverlay"> Overlay both traces</label>
        <span id="ha-hemoScaleWrap" hidden><label>Scale <select id="ha-hemoScale"><option value="0">Auto</option><option value="40">0-40</option><option value="200">0-200</option></select></label></span>
        <label><input type="checkbox" id="ha-hemoMarks" checked> Mark a c v x y</label></div>
    </div>
    <svg id="ha-hemoChart" class="ha-hemo-chart" viewBox="0 0 700 286" role="img" aria-label="ECG and catheter pressure waveforms"></svg>
    <div class="ha-hemo-legend"><span class="sw">Swan-Ganz</span><span class="pg">Pigtail</span><span class="ref">Aortic reference (femoral sheath side port)</span></div>
    <div id="ha-hemoExplain" class="ha-hemo-explain" aria-live="polite"></div>
    <div id="ha-hemoRead" class="ha-hemo-read" aria-live="polite"></div>
    <p class="ha-note">Typical teaching waveforms, not patient recordings. The same waveform change can occur in different conditions (a large PCWP v wave is not specific to MR); interpret with the clinical picture. Click a trace to pause at that moment.</p>
  </section>`;
}

/* Step player shared by the procedure scenarios (heart/proc-hud.js). */
export function procPanelHtml() {
  return `<section id="ha-procPanel" class="ha-proc" aria-label="Procedure steps" hidden>
    <p class="ha-note" id="ha-procHint"></p>
    <div class="ha-row"><button type="button" id="ha-procPlay" aria-pressed="true">Pause</button><button type="button" id="ha-procReplay">Replay</button></div>
    <input type="range" id="ha-procScrub" min="0" max="1000" value="0" aria-label="Position in the procedure">
    <ol id="ha-procSteps" class="ha-proc-steps" aria-label="Procedure steps"></ol>
    <p id="ha-procCaption" class="ha-proc-caption" aria-live="polite"></p>
  </section>`;
}

export function ivusPanelHtml() {
  return `<section id="ha-ivusPanel" class="ha-ivus" aria-label="Intravascular imaging" hidden>
    <div class="ha-row" role="group" aria-label="IVUS or OCT"><button type="button" class="active" data-ha-ivus="ivus" aria-pressed="true">IVUS</button><button type="button" data-ha-ivus="oct" aria-pressed="false">OCT</button></div>
    <p class="ha-note" id="ha-ivusModeName"></p>
    <div class="ha-ivus-wrap"><canvas id="ha-ivusCanvas" width="560" height="560" role="img" aria-label="Cross-section of the vessel as the imaging catheter sees it"></canvas>
      <button type="button" id="ha-ivusMeasure" class="active" aria-pressed="true" aria-label="Automatic contours on or off" title="Automatic contours on or off">&#9678;</button></div>
    <canvas id="ha-ivusLmode" class="ha-ivus-lmode" width="640" height="140" role="img" aria-label="Longitudinal L-mode view; tap to jump to a position"></canvas>
    <p class="ha-note">Longitudinal view (L-mode): proximal on the left, distal on the right, the blue line is the current position. Drag the round image or the longitudinal view to move along the vessel; while paused the lumen and vessel boundaries are measured automatically (the circle button switches the contours).</p>
    <p id="ha-ivusFind" class="ha-ivus-find" aria-live="polite"></p>
    <p class="ha-note">Teaching images generated from a parametric model, not real patient images; lesion positions, sizes and measurements are for comparison only.</p>
  </section>`;
}

/* The panel sections each scenario preset shows (a preset's panel is hidden otherwise). */
export const PANEL_SECTIONS = { hemo: ['ha-hemoPanel'], pci: ['ha-procPanel'], ivus: ['ha-procPanel', 'ha-ivusPanel'] };

export function mountClinicalPanels(host) {
  if (host.querySelector('#ha-hemoPanel')) return;
  host.insertAdjacentHTML('beforeend', hemoPanelHtml() + procPanelHtml() + ivusPanelHtml());
}
