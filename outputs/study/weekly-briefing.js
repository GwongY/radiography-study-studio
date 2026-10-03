/*
 * Weekly briefing — this week's university notices, on Today.
 *
 * The Sunday task reads the reader's PolyU mail, summarises it, and pushes one
 * file to the PRIVATE pack repository (see briefing-format.js). This part reads
 * that file with the read-only token question-pack.js already holds, so a
 * device that can fetch question packs can read its briefing, and a device
 * that cannot sees nothing. No new credential, no server.
 *
 * WHAT NEVER LEAVES. The briefing quotes real email. It is cached in its own
 * localStorage key, outside STORAGE_PREFIX, so it is not in the progress
 * export, the answer log or the gist; it is never in the SW shell; and
 * disconnecting the pack forgets it with the token.
 *
 * Split out per docs/CODEMAP.md. Nothing runs at module scope.
 */
import { $$, esc } from './imports.js';
import { isPackConnected, packConfig, packRequestFor, packMessageFor } from './question-pack.js';
import { BRIEFING_PATH, briefingProblem, orderNotices } from './briefing-format.js';

const CACHE_KEY = 'rss-briefing-cache';
const REFETCH_MS = 30 * 60 * 1000;
/* The task runs every Sunday. A briefing older than this means a run was
   missed, and the page should say so rather than present last week as current. */
const STALE_MS = 9 * 24 * 60 * 60 * 1000;
const HK = { timeZone: 'Asia/Hong_Kong' };

let held = null;
let lastTry = 0;
let lastError = null;
let busy = false;

function readCache() {
  try {
    const b = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    return b && !briefingProblem(b) ? b : null;
  } catch { return null; }
}
function writeCache(b) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(b)); } catch { /* quota or private mode */ }
}
export function forgetBriefing() {
  held = null;
  try { localStorage.removeItem(CACHE_KEY); } catch { /* nothing to do */ }
}

const day = (iso) => new Date(iso).toLocaleDateString('en-GB', { ...HK, weekday: 'short', day: 'numeric', month: 'short' });
const when = (iso) => new Date(iso).toLocaleString('en-GB', { ...HK, weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
const LABEL = { urgent: 'Urgent', normal: 'Notice', check: 'Check this' };
const COLOUR = { urgent: 'var(--red)', normal: 'var(--teal)', check: 'var(--orange)' };

export function paintBriefing() {
  const card = $$('briefingCard');
  if (!card) return;
  if (!isPackConnected()) { forgetBriefing(); card.hidden = true; card.replaceChildren(); return; }
  if (!held) held = readCache();
  if (!held) {
    card.hidden = !lastError;
    card.innerHTML = lastError ? `<div class="task-kicker">University notices</div><p class="empty" style="margin-top:8px">${esc(lastError)}</p>` : '';
    return;
  }
  const b = held;
  const notices = orderNotices(b.notices);
  const stale = Date.now() - Date.parse(b.generatedAt) > STALE_MS;
  const warn = [
    stale ? `This briefing is from ${day(b.generatedAt)}. The weekly update may not have run since.` : '',
    b.incomplete ? `Incomplete: ${b.incomplete}` : '',
    lastError ? `Could not refresh (${lastError}). Showing the last saved briefing.` : '',
  ].filter(Boolean);
  card.hidden = false;
  card.innerHTML = `
    <div class="task-kicker">University notices</div>
    <p class="small" style="margin-top:6px">Email from ${esc(day(b.coverageStart))} to ${esc(day(b.coverageEnd))} · AI summary — check the quoted email before acting.</p>
    ${warn.map((w) => `<p class="small" style="color:var(--orange);margin-top:6px">${esc(w)}</p>`).join('')}
    <div style="display:grid;gap:9px;margin-top:12px">${notices.length ? notices.map((n) => `
      <article style="border:1px solid var(--line);border-left:3px solid ${COLOUR[n.priority]};border-radius:11px;padding:11px 13px">
        <span class="tag" style="color:${COLOUR[n.priority]}">${LABEL[n.priority]}</span>
        <b style="display:block;margin-top:7px">${esc(n.title)}</b>
        <p class="task-copy" style="margin-top:4px">${esc(n.summary)}</p>
        <p class="task-copy" style="margin-top:6px;color:inherit"><b>${esc(n.action)}</b>${n.deadline ? ` · by ${esc(when(n.deadline))}` : ''}</p>
        <details style="margin-top:6px"><summary class="small">${esc(n.source.from)} · ${esc(when(n.source.receivedAt))}</summary>
          <p class="task-copy" style="margin-top:6px;white-space:pre-wrap">“${esc(n.source.quote)}”</p></details>
      </article>`).join('') : '<div class="empty">Nothing important in this week\'s university email.</div>'}</div>
    ${b.skipped.length ? `<details style="margin-top:10px"><summary class="small">Skipped (${b.skipped.length})</summary>${b.skipped.map((s) => `<p class="small" style="margin-top:4px">${esc(s)}</p>`).join('')}</details>` : ''}`;
}

export async function refreshBriefing({ force = false } = {}) {
  if (busy || !isPackConnected()) return;
  if (!force && Date.now() - lastTry < REFETCH_MS) return;
  busy = true;
  lastTry = Date.now();
  const { repo, token } = packConfig();
  try {
    const { url, init } = packRequestFor(`/repos/${repo}/contents/${BRIEFING_PATH}`, { token });
    const res = await fetch(url, init);
    if (res.status === 404) { lastError = null; return; } // no briefing pushed yet
    if (!res.ok) throw new Error(packMessageFor(res.status));
    const b = JSON.parse(await res.text());
    const problem = briefingProblem(b);
    if (problem) throw new Error(`The briefing file is malformed: ${problem}`);
    held = b;
    writeCache(b);
    lastError = null;
  } catch (e) {
    lastError = e instanceof TypeError ? 'offline' : String(e.message || e);
  } finally {
    busy = false;
    paintBriefing();
  }
}

/* Runs after every part has evaluated — see the entry point. */
export function init() {
  paintBriefing();
  void refreshBriefing({ force: true });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) void refreshBriefing(); });
}
