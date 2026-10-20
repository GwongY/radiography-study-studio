/*
 * Dialog behaviour, applied to all seven at once
 *
 * Split out of study.js along its banner sections. See docs/CODEMAP.md.
 */
import { $$ } from './imports.js';
import { closeSearchSheet, openSearchSheet, runSearch, searchKeydown } from './global-search.js';
import { handleBriefingAccessSave, handleBriefingDisconnect, renderBriefingAccessDialog } from './briefing-access.js';
import { forgetBriefing, paintBriefing, refreshBriefing } from './weekly-briefing.js';
import { renderToday } from './home.js';

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

/* Runs after every part has evaluated — see the entry point. */
export function init() {
  window.__rssOpenDialog = (d) => openDialog(d);
  $$('rssSearchBtn').onclick = openSearchSheet;
  $$('searchClose').onclick = closeSearchSheet;
  $$('searchScrim').onclick = (e) => { if (e.target === $$('searchScrim')) closeSearchSheet(); };
  $$('globalSearch').oninput = (e) => runSearch(e.target.value);
  $$('globalSearch').addEventListener('keydown', searchKeydown);
  $$('closeBriefingAccess').onclick = () => $$('briefingAccessDialog').close();
  $$('briefingAccessSave').onclick = () => {
    if (!handleBriefingAccessSave()) return;
    $$('briefingAccessDialog').close();
    paintBriefing();
    void refreshBriefing({ force: true });
  };
  $$('briefingAccessDisconnect').onclick = () => {
    handleBriefingDisconnect();
    forgetBriefing();
    renderBriefingAccessDialog();
    paintBriefing();
  };
  renderToday();
}
