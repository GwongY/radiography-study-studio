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
const is2 = (got, want, m) => {
  if (got === want) ok(`${m} (${got})`);
  else fail(`${m}: got ${got}, want ${want}`);
};
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

console.log('- kVp is a contrast control -');
near(R.effectiveKeV(75), 30, 1e-9, '75 kVp gives a 30 keV effective energy');
near(R.contrastRatio(50), 8.806, 0.02, 'bone:soft at 50 kVp (20 keV)');
near(R.contrastRatio(75), 6.361, 0.02, 'bone:soft at 75 kVp (30 keV)');
near(R.contrastRatio(125), 3.394, 0.02, 'bone:soft at 125 kVp (50 keV)');

let prev = Infinity, mono = true;
for (let kvp = 50; kvp <= 125; kvp += 5) {
  const c = R.contrastRatio(kvp);
  if (c >= prev) mono = false;
  prev = c;
}
if (mono) ok('contrast falls monotonically from 50 to 125 kVp');
else fail('contrast is not monotonic in kVp — the interpolation is wrong');

console.log('- the beam obeys the inverse square law -');
near(R.fluence({ mAs: 10, sidCm: 200 }) / R.fluence({ mAs: 10, sidCm: 100 }),
  0.25, 1e-9, 'doubling SID quarters the fluence');
near(R.fluence({ mAs: 40, sidCm: 200 }) / R.fluence({ mAs: 10, sidCm: 100 }),
  1.0, 1e-9, 'quadrupling mAs restores it');
near(R.fluence({ mAs: 20, sidCm: 100 }) / R.fluence({ mAs: 10, sidCm: 100 }),
  2.0, 1e-9, 'fluence is linear in mAs');

console.log('- mottle is 1/sqrt(N), so it rises with distance -');
const sLo = R.mottleSigma({ mAs: 10, sidCm: 100 });
near(R.mottleSigma({ mAs: 40, sidCm: 100 }) / sLo, 0.5, 1e-9,
  'quadrupling mAs halves the noise');
near(R.mottleSigma({ mAs: 10, sidCm: 200 }) / sLo, 2.0, 1e-9,
  'doubling SID doubles the noise');

console.log('- magnification is SID over SOD -');
near(R.magnification({ sidCm: 100, oidCm: 0 }), 1.0, 1e-9, 'object on the detector');
near(R.magnification({ sidCm: 100, oidCm: 50 }), 2.0, 1e-9, 'object halfway');
near(R.magnification({ sidCm: 180, oidCm: 18 }), 1.111, 1e-3, 'a chest heart at 180 cm');

console.log('- the model is dimensioned -');
near(R.CM_PER_UNIT, 14.409, 1e-3, 'one model unit in centimetres');
near(R.unitsToCm(1), 14.409, 1e-3, 'a one-unit path');

console.log('- the chest the spec claims, from the module constants -');
const tauLung = R.mu('lung', 75) * 15 + R.mu('soft', 75) * 5;
const tauMed = R.mu('soft', 75) * 20;
near(tauLung, 3.497, 0.01, 'tau through a lung field');
near(tauMed, 8.035, 0.01, 'tau through the mediastinum');
near(Math.exp(-tauLung), 0.0303, 1e-3, 'lung field transmits ~3%');
near(Math.exp(-tauMed), 0.00032, 1e-4, 'mediastinum transmits ~0.03%');

console.log('- a log window separates them; a linear one does not -');
const W = { lo: 0.5, hi: 9.0 };
const dLung = R.filmDensity(tauLung, W);
const dMed = R.filmDensity(tauMed, W);
if (dMed - dLung > 0.4) ok(`log window separates lung from mediastinum (${dLung.toFixed(2)} vs ${dMed.toFixed(2)})`);
else fail(`log window collapses them: ${dLung.toFixed(3)} vs ${dMed.toFixed(3)}`);
const linLung = 1 - Math.exp(-tauLung), linMed = 1 - Math.exp(-tauMed);
if (linMed - linLung < 0.05) ok(`the old linear curve collapsed them, as the spec says (${linLung.toFixed(3)} vs ${linMed.toFixed(3)})`);
else fail('the linear curve did not collapse them — recheck the premise');

console.log('- the window clamps and is monotonic -');
near(R.filmDensity(0, W), 0, 1e-9, 'nothing in the beam is black');
near(R.filmDensity(100, W), 1, 1e-9, 'a very long path saturates white');
if (R.filmDensity(4, W) > R.filmDensity(3, W)) ok('density rises with tau');
else fail('density is not monotonic in tau');

console.log('- filmDensity falls back to the default window -');
near(R.filmDensity(4.75), R.filmDensity(4.75, R.DEFAULT_WINDOW), 1e-12,
  'an omitted window is the default window');
near(R.filmDensity(4.75), 0.5, 1e-12, 'and the default window is 0.5 to 9.0');

console.log('- windowFor sizes itself around the median -');
const wBig = R.windowFor(10);
near(wBig.lo, 1, 1e-12, 'a median of 10 opens the window at 1');
near(wBig.hi, 19, 1e-12, 'and closes it at 19');
const wSmall = R.windowFor(1);
near(wSmall.lo, 0, 1e-12, 'a small median clamps lo at zero rather than going negative');
near(wSmall.hi, 3, 1e-12, 'and the span floors at 2 rather than collapsing');
if (R.windowFor(10).hi - R.windowFor(10).lo > R.windowFor(2).hi - R.windowFor(2).lo)
  ok('a denser subject gets a wider window');
else fail('windowFor does not widen with the median');

console.log('- the cortical shell -');
near(R.CORTEX_CM, 0.2, 1e-9, 'cortical thickness is 2 mm');
near(R.GRAZE_CLAMP, 0.05, 1e-9, 'the grazing clamp caps the shell term at 20t');
/* A ray straight through a 4 cm bone: 2 shell crossings plus a marrow bulk. */
const straight = R.boneTau({ pathCm: 4, cosIncidence: 1, kvp: 75 });
const grazing = R.boneTau({ pathCm: 4, cosIncidence: 0.2, kvp: 75 });
if (grazing > straight) ok('a grazing ray spends longer in cortex than a normal one');
else fail('the shell term does not rise at grazing incidence');
const uniform = R.muAt('bone', 30) * 4;
if (straight < uniform) ok('a hollow bone attenuates less than a solid one');
else fail(`shell model is not lighter than solid bone: ${straight} vs ${uniform}`);
near(R.boneTau({ pathCm: 4, cosIncidence: 0.001, kvp: 75 }),
     R.boneTau({ pathCm: 4, cosIncidence: 0.05, kvp: 75 }), 1e-9,
     'the clamp bounds the silhouette edge');
near(R.boneTau({ pathCm: 4, cosIncidence: -1, kvp: 75 }),
     R.boneTau({ pathCm: 4, cosIncidence: 1, kvp: 75 }), 1e-9,
     'incidence sign does not matter, only the angle');

console.log('- air-filled structures are classified as lung, not soft tissue -');
const AIR = ['Superior lobe of left lung','Inferior lobe of left lung',
  'Superior lobe of right lung','Middle lobe of right lung','Inferior lobe of right lung',
  'Trachea','Bronchi of the left lung','Bronchi of the right lung','Pleura'];
AIR.forEach((n)=>{
  const t = R.tissueForMesh(n, 'organs');
  if (t === 'lung') ok(`${n} -> lung`);
  else fail(`${n} -> ${t}, expected lung`);
});

console.log('- and the solid viscera are not -');
['Liver','Stomach','Spleen','Left kidney','Urinary bladder','Heart'].forEach((n)=>{
  const t = R.tissueForMesh(n, 'organs');
  if (t === 'soft') ok(`${n} -> soft`);
  else fail(`${n} -> ${t}, expected soft`);
});

console.log('- the layer still decides where the mesh name does not -');
is2(R.tissueForMesh('Femur', 'skeleton'), 'bone', 'a bone is bone');
is2(R.tissueForMesh('Biceps brachii', 'muscle'), 'soft', 'a muscle is soft tissue');
is2(R.tissueForMesh('Anything at all', 'organs'), 'soft', 'an unrecognised organ defaults to soft');

console.log('- three.js name sanitising must not defeat the classifier -');
/* three.js replaces whitespace with _ and deletes [ ] . : / on import, so the
   loader hands over Superior_lobe_of_left_lung, never the spaced form. */
is2(R.tissueForMesh('Superior_lobe_of_left_lung', 'organs'), 'lung', 'underscored form still classifies');
is2(R.tissueForMesh('Bronchi_of_the_right_lung', 'organs'), 'lung', 'underscored bronchi still classify');

console.log('- lung really is lucent against the tissue around it -');
const rLung = R.muAt('soft', 30) / R.muAt('lung', 30);
if (rLung > 3.5) ok(`soft tissue attenuates ${rLung.toFixed(1)}x an inflated lung`);
else fail(`lung is not lucent enough: ratio ${rLung.toFixed(2)}`);

console.log(failures ? `\n${failures} FAILED` : '\nALL PASS');
process.exit(failures ? 1 : 0);
