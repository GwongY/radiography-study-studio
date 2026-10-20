/*
 * ESLint for one rule only: no-undef. A name that is defined nowhere loads
 * fine and throws only when its code path runs -- addHotspots() did exactly
 * that until 2026-10-20. Run through work/undef-check.mjs.
 */
import globals from 'globals';

export default [
  {
    files: ['**/*.js'],
    ignores: ['**/vendor/**'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: { ...globals.browser },
    },
    linterOptions: { reportUnusedDisableDirectives: 'off' },
    rules: { 'no-undef': 'error' },
  },
  {
    files: ['sw.js'],
    languageOptions: { globals: { ...globals.serviceworker } },
  },
];
