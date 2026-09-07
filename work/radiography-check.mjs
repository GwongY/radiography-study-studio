/*
 * The projection's physics, checked without a browser.
 *
 * Every number the film is made of is a published one, and the point of
 * putting them in a pure module is that a wrong one is a wrong number here
 * rather than "a picture that looks a bit off" in a canvas. Bone reading
 * 6.4x soft tissue at 30 keV is checkable; bone "looking about right" is not.
 *
 * Usage: node work/radiography-check.mjs
 */
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const R = await import(pathToFileURL(join(root, 'outputs/radiography.js')).href);

let failures = 0;
const fail = (m) => { failures += 1; console.log(`  FAIL  ${m}`); };
const ok = (m) => console.log(`  ok    ${m}`);
const near = (got, want, tol, m) => {
  if (Math.abs(got - want) <= tol) ok(`${m} (${got.toFixed(4)})`);
  else fail(`${m}: got ${got.toFixed(4)}, want ${want} +/- ${tol}`);
};

console.log('- mass attenuation reproduces every NIST row exactly -');
/* Every tabulated row of every tissue, not a spot check. An interpolator that
   is right at 30 keV and wrong at 80 is exactly the failure this catches. */
const NIST = {
  bone:   [4.001, 1.331, 0.6655, 0.4242, 0.3148, 0.2229, 0.1855, 0.1480],
  soft:   [0.8230, 0.3790, 0.2688, 0.2264, 0.2048, 0.1823, 0.1693, 0.1492],
  marrow: [0.5677, 0.3063, 0.2396, 0.2123, 0.1974, 0.1800, 0.1688, 0.1500],
  lung:   [0.8316, 0.3815, 0.2699, 0.2270, 0.2053, 0.1826, 0.1695, 0.1493],
};
let rows = 0, rowsBad = 0;
for (const [tissue, want] of Object.entries(NIST)) {
  R.KEV_ROWS.forEach((keV, i) => {
    rows += 1;
    if (Math.abs(R.massAtten(tissue, keV) - want[i]) > 1e-9) {
      rowsBad += 1;
      fail(`${tissue} at ${keV} keV: got ${R.massAtten(tissue, keV)}, want ${want[i]}`);
    }
  });
}
if (!rowsBad) ok(`all ${rows} tabulated rows returned verbatim`);

console.log('- interpolation stays between the rows it sits between -');
for (const tissue of Object.keys(NIST)) {
  const a = R.massAtten(tissue, 35);
  if (a < R.massAtten(tissue, 30) && a > R.massAtten(tissue, 40)) ok(`${tissue} at 35 keV is bracketed`);
  else fail(`${tissue} at 35 keV escapes its bracket: ${a}`);
}

console.log('- linear attenuation is mass attenuation times density -');
near(R.muAt('bone', 30), 2.5555, 1e-3, 'bone mu at 30 keV, cm^-1');
near(R.muAt('soft', 30), 0.4017, 1e-3, 'soft mu at 30 keV, cm^-1');
near(R.muAt('lung', 30), 0.0992, 1e-3, 'inflated lung mu at 30 keV, cm^-1');

console.log('- lung is lucent by density alone, not by composition -');
near(R.massAtten('lung', 30) / R.massAtten('soft', 30), 1.0, 0.02,
  'lung and soft tissue share a mass attenuation coefficient');
if (R.TISSUES.lung.rho < 0.3) ok('inflated lung density is the in-vivo value');
else fail(`inflated lung density is ${R.TISSUES.lung.rho}, expected ~0.26 (ICRU-46)`);

console.log(failures ? `\n${failures} FAILED` : '\nALL PASS');
process.exit(failures ? 1 : 0);
