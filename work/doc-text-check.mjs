/*
 * Regression check for PDF extraction when Poppler's pdftotext executable is
 * unavailable. The desktop workspace ships Python with pypdf, and doc-text's
 * RSS_PYTHON fallback must preserve one array entry per PDF page.
 *
 * Usage:
 *   node work/doc-text-check.mjs <absolute path to python.exe>
 */
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractText } from './lib/doc-text.mjs';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const python = process.argv[2];
if (!python) {
  console.error('python path required');
  process.exit(2);
}

/* Hide pdftotext deliberately: this check is for the fallback, even on a
   development machine where Poppler happens to be installed. */
process.env.PATH = join(ROOT, 'work', '.no-pdftotext-here');
process.env.RSS_PYTHON = python;

const result = extractText(join(ROOT, 'New source', 'Topic 01.pdf'));
const checks = [
  [result.ok, result.why || 'PDF extracted'],
  [result.pages.length === 20, `kept 20 page boundaries (got ${result.pages.length})`],
  [/What is Sociology/i.test(result.pages[0] || ''), 'page 1 text belongs to Topic 01'],
  [/Karl Marx/i.test(result.pages[16] || ''), 'page 17 stayed on page 17'],
];

let fail = 0;
for (const [good, message] of checks) {
  console.log(`  ${good ? 'ok  ' : 'FAIL'} ${message}`);
  if (!good) fail++;
}
console.log(fail ? `\n${fail} FAILED` : '\nALL PASS');
process.exit(fail ? 1 : 0);
