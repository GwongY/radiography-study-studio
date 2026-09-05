import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  indexMap,
  lessonStatus,
  normaliseSourceFile,
  sourceRoleFor,
  sourceSetFor,
} from './lib/source-lesson-map.mjs';

const fixture = JSON.parse(await readFile(new URL('./fixtures/source-lesson-map-selftest.json', import.meta.url)));

if (process.argv.includes('--selftest')) {
  const newFiles = new Set([normaliseSourceFile(fixture.newFile)]);
  assert.equal(sourceSetFor({ file: fixture.newFile, locations: [] }, newFiles), 'new');
  assert.equal(sourceSetFor({ file: fixture.oldFile, locations: [] }, newFiles), 'old');
  assert.equal(sourceRoleFor({ set: 'new', kind: 'primary', verified: true, hasNewPrimary: true }), 'current-primary');
  assert.equal(sourceRoleFor({ set: 'old', kind: 'primary', verified: true, hasNewPrimary: true }), 'older-supporting');
  assert.equal(sourceRoleFor({ set: 'old', kind: 'primary', verified: true, hasNewPrimary: false }), 'older-fallback');
  assert.equal(lessonStatus({ primary: [], supporting: [], unresolved: true, hasGap: false }), 'needs-review');
  assert.equal(lessonStatus({ primary: [], supporting: [], unresolved: false, hasGap: true }), 'missing');
  assert.equal(typeof indexMap, 'function');
  console.log('SELFTEST PASS');
}
