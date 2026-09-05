/*
 * Dialog behaviour, applied to all seven at once
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$, STUDY_MODES, ui } from './imports.js';
import { K } from './storage-versioned-keys.js';
import { closeSearchSheet, openSearchSheet, runSearch } from './global-search-one.js';
import { closeSessionOverlay } from './navigation-five-destinations.js';
import { commitTransfer, exportProgress, handleTransferFile } from './reset.js';
import { handleConnect, handleDisconnect, handleSyncNow } from './gist-sync.js';
import { endSession } from './layout-figures.js';
import { renderToday } from './spatial-overlay-controls.js';
import { setStep, startSession } from './session-engine.js';

/* ------------------------------------------------------------------ *
 * Dialog behaviour, applied to all seven at once
 *
 * Two things a keyboard user is entitled to, neither of which was happening.
 *
 * ESCAPE. A modal <dialog> is supposed to close on Escape without any help,
 * and these are genuinely modal -- ':modal' reports true. But a keydown that
 * reached the document produced no 'cancel' event and left the dialog open,
 * and rather than decide whether that is the embedded browser or the page, the
 * handler below just does it. It costs nothing where the platform already
 * works, because by then there is no open dialog left to close.
 *
 * FOCUS. Closing a dialog dropped focus on the floor: the element that had it
 * was inside the dialog that just went away, so the next Tab started again
 * from the top of the document. Every term lookup cost a keyboard user their
 * place on the page. The opener is remembered and focus goes back to it.
 * ------------------------------------------------------------------ */

let dialogOpener = null;


export function openDialog(dlg) {
  /* Remember where we came from, but only a real element still on the page. */
  const from = document.activeElement;
  dialogOpener = from && from !== document.body && document.contains(from) ? from : null;
  dlg.showModal();
}

function closeTopDialog() {
  const open = [...document.querySelectorAll('dialog[open]')];
  if (!open.length) return false;
  open[open.length - 1].close();
  return true;
}

for (const dlg of document.querySelectorAll('dialog')) {
  dlg.addEventListener('close', () => {
    const back = dialogOpener;
    dialogOpener = null;
    /* Only if nothing else has taken focus in the meantime, and it is still there. */
    if (back && document.contains(back) && (document.activeElement === document.body || !document.activeElement)) {
      try { back.focus({ preventScroll: true }); } catch { /* not focusable any more */ }
    }
  });
}

/* Global search: one sheet, reachable from every destination and Cmd/Ctrl-K. */
window.addEventListener('keydown', (e) => {
  const open = !$$('searchScrim').classList.contains('hidden');
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); open ? closeSearchSheet() : openSearchSheet(); return; }
  if (e.key === 'Escape' && open) { e.preventDefault(); closeSearchSheet(); return; }
  if (e.key === 'Escape' && closeTopDialog()) e.preventDefault();
});
$$('rssSkipBtn').onclick = () => {
  if (!ui.session) return;
  if (ui.session.index >= ui.session.items.length - 1) return endSession();
  ui.session.index += 1; ui.session.qIndex = 0; ui.session.seqOrder = null; ui.session.matchRights = null; ui.session.diagramTarget = null; ui.session.diagramReveal = null; if (window.__osteo && window.__osteo.endMovement) { window.__osteo.endMovement(); const b=$$('mvBar'); if(b) b.classList.add('hidden'); const bk=$$('mvBackToSession'); if(bk) bk.classList.add('hidden'); }
  setStep('learn');
};
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !document.querySelector('dialog[open]') && ui.session) { /* let the osteology handler own Escape in its own view */ }
});

/*
 * Manifest shortcuts land here as #mode=daily etc. Start that session straight
 * away, then clear the hash so a later reload does not silently restart it.
 */
(() => {
  const wanted = window.__rssLaunchMode;
  if (!wanted) return;
  const mode = STUDY_MODES.find((m) => m.id === wanted);
  if (!mode || mode.id === 'subject') return;
  history.replaceState(null, '', location.pathname + location.search);
  startSession({ mode: mode.id });
})();

/* Runs after every part has evaluated — see the entry point. */
export function init() {
  window.__rssOpenDialog = (d) => openDialog(d);
  $$('rssSearchBtn').onclick = openSearchSheet;
  $$('rssSessionSearch').onclick = openSearchSheet;
  $$('searchClose').onclick = closeSearchSheet;
  $$('searchScrim').onclick = (e) => { if (e.target === $$('searchScrim')) closeSearchSheet(); };
  $$('globalSearch').oninput = (e) => runSearch(e.target.value);
  $$('rssSessionClose').onclick = () => { if (ui.session) endSession(); else closeSessionOverlay(); };
  $$('rssEndBtn').onclick = () => { if (ui.session) endSession(); else closeSessionOverlay(); };
  $$('closeTransfer').onclick = () => $$('transferDialog').close();
  $$('transferExport').onclick = () => exportProgress();
  $$('transferFile').onchange = (e) => handleTransferFile(e.target.files && e.target.files[0]);
  $$('transferMerge').onclick = () => commitTransfer('merge');
  $$('transferReplace').onclick = () => commitTransfer('replace');
  $$('closeSync').onclick = () => $$('syncDialog').close();
  $$('syncConnect').onclick = () => handleConnect();
  $$('syncNowBtn').onclick = () => handleSyncNow();
  $$('syncDisconnect').onclick = () => handleDisconnect();
  renderToday();
}
