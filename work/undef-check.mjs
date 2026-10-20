/*
 * Undef check — is every name the app uses defined somewhere?
 *
 *   npm ci --prefix work/lint      # once: ESLint, check-only tooling
 *   node work/undef-check.mjs
 *
 * binding-check asks whether a split part imports a name a SIBLING exports.
 * It cannot see a name that nothing defines at all: boot3D's fallback called
 * addHotspots() for a month after the function was deleted, and the first
 * failed GLB fetch turned that into "3D model unavailable" over a working
 * skeleton. ESLint's no-undef is the parser-backed answer, and the only rule
 * run here (config: work/lint/eslint.config.mjs).
 *
 * Without the install it says how to get it and exits 0 locally, but fails
 * under CI (CI=true), where pages.yml installs it first.
 */
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const bin = join(root, 'work', 'lint', 'node_modules', 'eslint', 'bin', 'eslint.js');
if (!existsSync(bin)) {
  console.log('  SKIP ESLint is not installed — run: npm ci --prefix work/lint');
  process.exit(process.env.CI ? 1 : 0);
}
const r = spawnSync(process.execPath, [bin, '--no-config-lookup', '-c', join(root, 'work', 'lint', 'eslint.config.mjs'), '.'],
  { cwd: join(root, 'outputs'), encoding: 'utf8' });
process.stdout.write(r.stdout || '');
process.stderr.write(r.stderr || '');
console.log(r.status === 0 ? 'ALL PASS — every name in outputs/ is defined, imported or a browser global' : '\nFAILED — see the no-undef errors above');
process.exit(r.status === 0 ? 0 : 1);
