/*
 * Corpus verification — the study-data barrel imports the split corpus and
 * these checks keep every question, source reference and application valid.
 *
 * Usage: node work/corpus-check.mjs
 */
import { validateCorpus, validateApplications } from '../outputs/study-data.js';

const corpus = validateCorpus();
const applications = validateApplications();
for (const failure of [...corpus, ...applications]) {
  console.error(failure.itemId, failure.qid || '', failure.problems.join('; '));
}
console.log(`validateCorpus() → ${corpus.length} failures`);
console.log(`validateApplications() → ${applications.length} failures`);
if (corpus.length || applications.length) process.exit(1);
console.log('ALL PASS');
