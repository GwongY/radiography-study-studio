#!/usr/bin/env node
/*
 * The writer's half of the weekly briefing (the reader is
 * outputs/study/weekly-briefing.js). The Sunday task uses it to read last
 * week's briefing and to publish this week's — to the PRIVATE pack repository,
 * never to this public one.
 *
 *   node work/weekly-briefing.mjs pull          last briefing → work/.briefing/previous.json
 *   node work/weekly-briefing.mjs check <file>  validate only
 *   node work/weekly-briefing.mjs push <file>   validate, refuse an older one, publish,
 *                                                read it back, then delete <file>
 *   node work/weekly-briefing.mjs --selftest    the validator still bites
 *
 * Uses the `gh` CLI's existing login; no token is read, printed or written by
 * this script. Prints counts and dates only — never a notice's text, because
 * this output can end up in a log or a chat.
 *
 * work/.briefing/ is gitignored. Plaintext belongs there and nowhere else.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BRIEFING_PATH, briefingProblem } from '../outputs/study/briefing-format.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const REPO = process.env.BRIEFING_REPO || 'GwongY/rss-packs';
const DIR = join(root, 'work/.briefing');

const gh = (args, opts = {}) => execFileSync('gh', args, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'], ...opts });

function remote() {
  try {
    const sha = gh(['api', `repos/${REPO}/contents/${BRIEFING_PATH}`, '--jq', '.sha']).trim();
    const raw = gh(['api', '-H', 'Accept: application/vnd.github.raw', `repos/${REPO}/contents/${BRIEFING_PATH}`]);
    return { sha, raw, briefing: JSON.parse(raw) };
  } catch (e) {
    if (/404|Not Found/.test(String(e.stderr || e.message))) return null;
    throw new Error(`Could not read the private repository: ${String(e.stderr || e.message).split('\n')[0]}`);
  }
}

function assertPrivate() {
  const vis = gh(['api', `repos/${REPO}`, '--jq', '.private']).trim();
  if (vis !== 'true') throw new Error(`${REPO} is not private. Refusing to publish email there.`);
}

const describe = (b) => `${b.notices.length} notices (${b.notices.filter((n) => n.priority === 'urgent').length} urgent, ${b.notices.filter((n) => n.priority === 'check').length} check), ${b.skipped.length} skipped, covering ${b.coverageStart} → ${b.coverageEnd}`;

function load(file) {
  if (!file || !existsSync(file)) throw new Error('Pass the path of a briefing JSON file.');
  const b = JSON.parse(readFileSync(file, 'utf8'));
  const problem = briefingProblem(b);
  if (problem) throw new Error(`Invalid briefing: ${problem}`);
  return b;
}

function selftest() {
  const good = {
    version: 1, generatedAt: '2026-10-04T08:00:00+08:00', coverageStart: '2026-09-27T00:00:00+08:00',
    coverageEnd: '2026-10-04T08:00:00+08:00', skipped: ['Library survey'],
    notices: [{ id: 'a', title: 't', summary: 's', priority: 'urgent', action: 'do', deadline: null,
      source: { threadId: '19a2b', from: 'x', receivedAt: '2026-10-01T09:00:00+08:00', quote: 'q' } }],
  };
  const cases = [
    ['valid', good, true],
    ['deadline without offset', { ...good, notices: [{ ...good.notices[0], deadline: '2026-10-05T10:00:00' }] }, false],
    ['bad priority', { ...good, notices: [{ ...good.notices[0], priority: 'high' }] }, false],
    ['non-hex thread', { ...good, notices: [{ ...good.notices[0], source: { ...good.notices[0].source, threadId: 'xyz!' } }] }, false],
    ['duplicate id', { ...good, notices: [good.notices[0], good.notices[0]] }, false],
    ['no quote', { ...good, notices: [{ ...good.notices[0], source: { ...good.notices[0].source, quote: ' ' } }] }, false],
    ['end before start', { ...good, coverageEnd: '2026-09-01T00:00:00+08:00' }, false],
    ['version 2', { ...good, version: 2 }, false],
  ];
  let bad = 0;
  for (const [name, b, want] of cases) {
    const got = briefingProblem(b) === null;
    console.log(`${got === want ? 'ok  ' : 'FAIL'} ${name}`);
    if (got !== want) bad++;
  }
  if (bad) { console.error(`${bad} self-test case(s) failed`); process.exit(1); }
}

try {
  const [cmd, file] = process.argv.slice(2);
  if (cmd === '--selftest') selftest();
  else if (cmd === 'check') console.log(`Valid: ${describe(load(file))}`);
  else if (cmd === 'pull') {
    const r = remote();
    mkdirSync(DIR, { recursive: true });
    if (!r) console.log('No briefing published yet — this is the first run.');
    else {
      const problem = briefingProblem(r.briefing);
      writeFileSync(join(DIR, 'previous.json'), r.raw);
      console.log(`Previous briefing → work/.briefing/previous.json: ${describe(r.briefing)}${problem ? ` (INVALID: ${problem})` : ''}`);
    }
  } else if (cmd === 'push') {
    const b = load(file);
    assertPrivate();
    const prev = remote();
    if (prev && Date.parse(b.generatedAt) < Date.parse(prev.briefing.generatedAt)) {
      throw new Error(`Refusing: this briefing (${b.generatedAt}) is older than the published one (${prev.briefing.generatedAt}).`);
    }
    const body = JSON.stringify(b, null, 2) + '\n';
    mkdirSync(DIR, { recursive: true });
    const req = join(DIR, '.put-request.json');
    writeFileSync(req, JSON.stringify({
      message: `Weekly briefing ${b.generatedAt.slice(0, 10)}`,
      content: Buffer.from(body, 'utf8').toString('base64'),
      ...(prev ? { sha: prev.sha } : {}),
    }));
    try { gh(['api', '-X', 'PUT', `repos/${REPO}/contents/${BRIEFING_PATH}`, '--input', req, '--jq', '.commit.sha']); }
    finally { rmSync(req, { force: true }); }
    const back = remote();
    if (!back || back.raw !== body) throw new Error('Published, but reading it back did not match. Check the private repository.');
    rmSync(file, { force: true });
    console.log(`Published to the private repository and verified: ${describe(b)}. Removed the local plaintext.`);
  } else {
    console.error('Usage: node work/weekly-briefing.mjs pull | check <file> | push <file> | --selftest');
    process.exit(2);
  }
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
