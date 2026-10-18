/*
 * University notice access.
 *
 * The weekly notice file lives in a private GitHub repository. Its read-only
 * credential is kept separately from the retired question-pack setting.
 * During the upgrade, only the old repo and token move; pack metadata and the
 * local question bank are discarded.
 */
import { $$, STORAGE_PREFIX } from './imports.js';

export const BRIEFING_CONFIG_KEY = STORAGE_PREFIX + 'briefingcfg';
const LEGACY_PACK_CONFIG_KEY = STORAGE_PREFIX + 'packcfg';
const LEGACY_PACK_DB = 'rss-packs';
const API_ROOT = 'https://api.github.com';

export function briefingConfig() {
  try { return JSON.parse(localStorage.getItem(BRIEFING_CONFIG_KEY) || '{}') || {}; }
  catch { return {}; }
}

function validRepo(repo) {
  return typeof repo === 'string' && /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo);
}

export function saveBriefingConfig(patch) {
  const next = { ...briefingConfig(), ...patch };
  try { localStorage.setItem(BRIEFING_CONFIG_KEY, JSON.stringify(next)); } catch { /* quota */ }
  return next;
}

export function isBriefingConnected() {
  const c = briefingConfig();
  return validRepo(c.repo) && typeof c.token === 'string' && !!c.token;
}

export function briefingRequestFor(path, { token, method = 'GET' } = {}) {
  const headers = { Accept: 'application/vnd.github.raw' };
  if (token) headers.Authorization = `Bearer ${token}`;
  return {
    url: API_ROOT + path,
    init: { method, headers, cache: 'no-store' },
  };
}

export function briefingMessageFor(status) {
  if (status === 401) return 'The GitHub token was rejected. Check it in University notice access.';
  if (status === 403) return 'GitHub denied access. Check the token permissions or try again later.';
  if (status === 404) return 'The private repository or notice file was not found.';
  return `GitHub returned HTTP ${status}.`;
}

function migrateLegacyPackConfig() {
  let legacy = {};
  try { legacy = JSON.parse(localStorage.getItem(LEGACY_PACK_CONFIG_KEY) || '{}') || {}; }
  catch { /* discard malformed retired config */ }

  const current = briefingConfig();
  if ((!current.repo || !current.token) && legacy.repo && legacy.token) {
    saveBriefingConfig({ repo: current.repo || legacy.repo, token: current.token || legacy.token });
  }
  try { localStorage.removeItem(LEGACY_PACK_CONFIG_KEY); } catch { /* nothing to do */ }
}

function retireLegacyPackDatabase() {
  if (!globalThis.indexedDB) return;
  try {
    const request = indexedDB.deleteDatabase(LEGACY_PACK_DB);
    request.onblocked = () => {
      if (window.__rssToast) window.__rssToast('Close older Study Studio tabs to finish removing the retired question bank.');
    };
  } catch { /* unsupported or unavailable; retry on the next app load */ }
}

export function renderBriefingAccessDialog() {
  const c = briefingConfig();
  const summary = $$('briefingAccessSummary');
  if (summary) summary.textContent = isBriefingConnected()
    ? 'Connected. The credential is stored in this browser.'
    : 'Not connected. Add a read-only token for the private weekly notice repository.';

  const repo = $$('briefingRepo');
  if (repo) repo.value = c.repo || '';
  const token = $$('briefingToken');
  if (token) {
    token.value = '';
    token.placeholder = c.token ? 'A token is stored — enter a new one to replace it' : 'github_pat_…';
  }
  const disconnect = $$('briefingAccessDisconnect');
  if (disconnect) disconnect.disabled = !c.repo && !c.token;
  const error = $$('briefingAccessError');
  if (error) error.classList.add('hidden');
}

export function openBriefingAccessDialog() {
  renderBriefingAccessDialog();
  const dialog = $$('briefingAccessDialog');
  if (!dialog) return;
  if (window.__rssOpenDialog) window.__rssOpenDialog(dialog);
  else if (typeof dialog.showModal === 'function') dialog.showModal();
}

export function handleBriefingAccessSave() {
  const repo = ($$('briefingRepo')?.value || '').trim();
  const token = ($$('briefingToken')?.value || '').trim() || briefingConfig().token || '';
  const error = $$('briefingAccessError');
  const fail = (message) => {
    if (error) { error.textContent = message; error.classList.remove('hidden'); }
    return false;
  };

  if (!validRepo(repo)) return fail('Enter a repository as owner/repository.');
  if (!token) return fail('Enter a read-only GitHub token.');
  saveBriefingConfig({ repo, token });
  if (error) error.classList.add('hidden');
  if (window.__rssToast) window.__rssToast('University notice access saved.');
  return true;
}

export function handleBriefingDisconnect() {
  try { localStorage.removeItem(BRIEFING_CONFIG_KEY); } catch { /* nothing to do */ }
  try { localStorage.removeItem('rss-briefing-cache'); } catch { /* nothing to do */ }
  if (window.__rssToast) window.__rssToast('University notice access disconnected and saved notices cleared.');
}

/* Runs after every part has evaluated — see the entry point. */
export function init() {
  migrateLegacyPackConfig();
  retireLegacyPackDatabase();
}
