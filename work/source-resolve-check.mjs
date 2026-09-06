/* Regression checks for duplicate filenames across New and old source roots. */
import { resolveSource } from './lib/source-resolve.mjs';

const cat = {
  roots: ['G:/New source', 'G:/extra source'],
  docs: [
    { n: 'Lecture 1.pdf', b: 100, at: [[0, 'Lecture 1.pdf']] },
    { n: 'Lecture 1.pdf', b: 200, at: [[1, 'Year 1/Lecture 1.pdf']] },
  ],
};
const roots = { newsrc: 'New source' };

const current = resolveSource({ file: 'Lecture 1.pdf', root: 'newsrc', folder: '' }, cat, roots);
if (!current || current.ambiguous || current.doc.b !== 100) {
  throw new Error('A unique registered root must beat a same-named file outside that root.');
}

const unresolved = resolveSource({ file: 'Lecture 1.pdf', root: 'missing', folder: '' }, cat, roots);
if (!unresolved?.ambiguous) {
  throw new Error('Different same-named files must remain ambiguous when no registered root matches.');
}

console.log('SOURCE RESOLVE PASS');
