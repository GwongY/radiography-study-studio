/*
 * cavity-geom.js -- deriving cavity surfaces from real anatomy.
 *
 * Everything here is pure: point clouds in, plain shape descriptions out. No
 * three.js, no DOM. That is deliberate -- the maths is the part that can be
 * quietly wrong, so it has to be runnable and checkable outside a browser
 * (see work/cavity-probe.mjs).
 *
 * THREE SHAPE FAMILIES
 *
 *   ringStack   a stack of closed cross-sections, lofted into a tube-like
 *               surface. The thorax, abdomen, pelvis and pleural sacs are all
 *               "a wall that encircles a space", so they are all this.
 *
 *   starShell   radius sampled over latitude/longitude from one centre. The
 *               cranial cavity and the pericardial sac are blobs, not tubes.
 *
 *   heightField y = f(x, z) over a grid. The diaphragm: the thoracic floor and
 *               the abdominal roof are the SAME surface, so both cavities read
 *               it from one field and cannot disagree.
 *
 * THE CENTRAL TRICK: PERCENTILE RADIUS
 *
 * To find the inside of the rib cage, sweep a ray out from an axis inside the
 * chest and ask where it first hits bone. Taking the literal minimum radius is
 * too brittle -- one stray vertex, one bit of costal cartilage poking inward,
 * and the wall dents. Taking a low percentile of the radii in that direction
 * is the same idea with the outliers ignored, which is what `percentile` does.
 *
 * COVERAGE AND HONEST GAPS
 *
 * A horizontal band through the lower abdomen contains no bone at all: there
 * is nothing there but muscle, and the muscle layer may not be loaded. Rather
 * than inventing a wall, a band with too few points in a direction is marked
 * uncovered and its radius is interpolated vertically between the nearest
 * covered bands -- the costal margin above and the iliac crest below, both of
 * which are real bone. If the muscle layer IS loaded those same bands get real
 * data and the interpolation never runs. One mechanism, and it degrades in the
 * direction of "reasoned from the nearest real structure" rather than "made up".
 */

const TAU = Math.PI * 2;

/* ------------------------------------------------------------------ *
 * small helpers
 * ------------------------------------------------------------------ */

export function boundsOf(points) {
  const b = { minX: Infinity, minY: Infinity, minZ: Infinity, maxX: -Infinity, maxY: -Infinity, maxZ: -Infinity };
  for (const p of asList(points)) {
    for (let i = 0; i < p.length; i += 3) {
      const x = p[i], y = p[i + 1], z = p[i + 2];
      if (x < b.minX) b.minX = x; if (x > b.maxX) b.maxX = x;
      if (y < b.minY) b.minY = y; if (y > b.maxY) b.maxY = y;
      if (z < b.minZ) b.minZ = z; if (z > b.maxZ) b.maxZ = z;
    }
  }
  b.empty = !(b.minY <= b.maxY);
  return b;
}

/** accept a single Float32Array or a list of them */
function asList(points) {
  if (!points) return [];
  return ArrayBuffer.isView(points) ? [points] : points.filter(Boolean);
}

function percentileOf(sorted, q) {
  if (!sorted.length) return NaN;
  const i = Math.min(sorted.length - 1, Math.max(0, Math.round(q * (sorted.length - 1))));
  return sorted[i];
}

/** circular moving average over a ring of values, ignoring NaN */
function smoothRing(arr, radius) {
  if (!radius) return arr.slice();
  const n = arr.length, out = new Array(n);
  for (let i = 0; i < n; i++) {
    let s = 0, c = 0;
    for (let k = -radius; k <= radius; k++) {
      const v = arr[(i + k + n * 2) % n];
      if (Number.isFinite(v)) { s += v; c++; }
    }
    out[i] = c ? s / c : NaN;
  }
  return out;
}

/* ------------------------------------------------------------------ *
 * ringStack -- cross-sections of an enclosing wall
 * ------------------------------------------------------------------ */

/**
 * points   Float32Array (or list) of wall vertices, xyz, in the body frame.
 * opts
 *   y0, y1        vertical extent to slice (defaults to the cloud's own)
 *   bands         number of cross-sections
 *   sectors       angular resolution of each cross-section
 *   percentile    0 = the innermost point in that direction, 0.15 = robust inner surface
 *   minPerSector  below this many points a direction counts as uncovered
 *   inset         shrink every radius by this much (wall thickness)
 *   axis          'auto' (per-band bbox centre) or [x, z] to pin it
 *   axisSmooth    vertical smoothing of the axis, in bands
 *   smoothA       angular smoothing radius, in sectors
 *   smoothV       vertical smoothing radius, in bands
 *   bandOverlap   each band samples this multiple of its own height
 *
 * Returns { ys, cx, cz, r: number[bands][sectors], covered: bool[bands][sectors], sectors, bands }
 */
export function ringStack(points, opts = {}) {
  const list = asList(points);
  const b = boundsOf(list);
  const y0 = opts.y0 != null ? opts.y0 : b.minY;
  const y1 = opts.y1 != null ? opts.y1 : b.maxY;
  const bands = opts.bands || 24;
  const sectors = opts.sectors || 48;
  const percentile = opts.percentile != null ? opts.percentile : 0.12;
  const minPerSector = opts.minPerSector || 2;
  const inset = opts.inset || 0;
  const overlap = opts.bandOverlap || 1.6;
  const dy = (y1 - y0) / bands;
  const half = dy * overlap / 2;

  /* ---- pass 1: bucket every vertex into (band, sector) ---- */
  const bandPts = Array.from({ length: bands }, () => []);
  for (const p of list) {
    for (let i = 0; i < p.length; i += 3) {
      const y = p[i + 1];
      if (y < y0 - half || y > y1 + half) continue;
      /* a vertex can land in more than one band when bands overlap */
      const lo = Math.max(0, Math.floor((y - half - y0) / dy));
      const hi = Math.min(bands - 1, Math.floor((y + half - y0) / dy));
      for (let k = lo; k <= hi; k++) {
        const yc = y0 + (k + 0.5) * dy;
        if (Math.abs(y - yc) <= half) bandPts[k].push(p[i], y, p[i + 2]);
      }
    }
  }

  /* ---- pass 2: axis per band ---- */
  let cx = new Array(bands).fill(NaN), cz = new Array(bands).fill(NaN);
  for (let k = 0; k < bands; k++) {
    const pts = bandPts[k];
    if (!pts.length) continue;
    if (Array.isArray(opts.axis)) { cx[k] = opts.axis[0]; cz[k] = opts.axis[1]; continue; }
    let mnx = Infinity, mxx = -Infinity, mnz = Infinity, mxz = -Infinity;
    for (let i = 0; i < pts.length; i += 3) {
      if (pts[i] < mnx) mnx = pts[i]; if (pts[i] > mxx) mxx = pts[i];
      if (pts[i + 2] < mnz) mnz = pts[i + 2]; if (pts[i + 2] > mxz) mxz = pts[i + 2];
    }
    cx[k] = (mnx + mxx) / 2; cz[k] = (mnz + mxz) / 2;
  }
  fillGapsLinear(cx); fillGapsLinear(cz);
  if (opts.axisSmooth) { cx = smoothColumn(cx, opts.axisSmooth); cz = smoothColumn(cz, opts.axisSmooth); }

  /* ---- pass 3: percentile radius per (band, sector) ---- */
  const r = [], covered = [];
  for (let k = 0; k < bands; k++) {
    const buckets = Array.from({ length: sectors }, () => []);
    const pts = bandPts[k];
    for (let i = 0; i < pts.length; i += 3) {
      const dx = pts[i] - cx[k], dz = pts[i + 2] - cz[k];
      const rad = Math.hypot(dx, dz);
      if (!(rad > 1e-6)) continue;
      let a = Math.atan2(dz, dx); if (a < 0) a += TAU;
      buckets[Math.min(sectors - 1, Math.floor(a / TAU * sectors))].push(rad);
    }
    const row = new Array(sectors), cov = new Array(sectors);
    for (let s = 0; s < sectors; s++) {
      const bs = buckets[s];
      if (bs.length < minPerSector) { row[s] = NaN; cov[s] = false; continue; }
      bs.sort((a, c) => a - c);
      row[s] = Math.max(percentileOf(bs, percentile) - inset, 1e-4);
      cov[s] = true;
    }
    r.push(row); covered.push(cov);
  }

  /* ---- pass 4: fill uncovered directions, then smooth ---- */
  /*
   * `capUncovered` bounds what an interpolated direction is allowed to claim.
   * The pelvis needs it: at the level of the iliac wings there is bone to the
   * side but nothing at all in front, and an unbounded fill happily runs the
   * cavity out past the brim and into the false pelvis. Capping an uncovered
   * direction at a multiple of the ring's own measured radii keeps the guess
   * tethered to the bone that IS there.
   */
  if (opts.capUncovered) {
    for (let k = 0; k < bands; k++) {
      const known = r[k].filter((v, s) => covered[k][s] && Number.isFinite(v)).sort((a, c) => a - c);
      if (!known.length) continue;
      const cap = percentileOf(known, 0.75) * opts.capUncovered;
      for (let s = 0; s < sectors; s++) if (!covered[k][s]) r[k][s] = NaN;
      r[k] = fillGapsCircular(r[k]);
      for (let s = 0; s < sectors; s++) if (!covered[k][s]) r[k][s] = Math.min(r[k][s], cap);
    }
  }
  /* first around each ring (a gap between two ribs), then down each sector
     (a whole band with no bone in it, e.g. mid-abdomen with no muscle layer) */
  for (let k = 0; k < bands; k++) r[k] = fillGapsCircular(r[k]);
  for (let s = 0; s < sectors; s++) {
    const col = r.map((row) => row[s]);
    fillGapsLinear(col);
    for (let k = 0; k < bands; k++) r[k][s] = col[k];
  }
  const smoothA = opts.smoothA != null ? opts.smoothA : 2;
  const smoothV = opts.smoothV != null ? opts.smoothV : 1;
  let out = r.map((row) => smoothRing(row, smoothA));
  if (smoothV) {
    const copy = out.map((row) => row.slice());
    for (let k = 0; k < bands; k++) {
      for (let s = 0; s < sectors; s++) {
        let sum = 0, c = 0;
        for (let d = -smoothV; d <= smoothV; d++) {
          const kk = k + d;
          if (kk < 0 || kk >= bands) continue;
          const v = copy[kk][s];
          if (Number.isFinite(v)) { sum += v; c++; }
        }
        out[k][s] = c ? sum / c : copy[k][s];
      }
    }
  }

  const ys = Array.from({ length: bands }, (_, k) => y0 + (k + 0.5) * dy);
  return { ys, cx, cz, r: out, covered, sectors, bands, y0, y1 };
}

/** [NaN, NaN, 3, NaN, 5, NaN] -> ends held flat, middles interpolated */
function fillGapsLinear(a) {
  const n = a.length;
  let first = -1, last = -1;
  for (let i = 0; i < n; i++) if (Number.isFinite(a[i])) { if (first < 0) first = i; last = i; }
  if (first < 0) return a;
  for (let i = 0; i < first; i++) a[i] = a[first];
  for (let i = last + 1; i < n; i++) a[i] = a[last];
  let i = first;
  while (i < last) {
    if (Number.isFinite(a[i + 1])) { i++; continue; }
    let j = i + 1;
    while (j <= last && !Number.isFinite(a[j])) j++;
    for (let k = i + 1; k < j; k++) a[k] = a[i] + (a[j] - a[i]) * ((k - i) / (j - i));
    i = j;
  }
  return a;
}

/** same, but the array wraps around (an angular ring) */
function fillGapsCircular(a) {
  const n = a.length;
  const idx = [];
  for (let i = 0; i < n; i++) if (Number.isFinite(a[i])) idx.push(i);
  if (!idx.length) return a.slice();
  if (idx.length === n) return a.slice();
  const out = a.slice();
  for (let i = 0; i < n; i++) {
    if (Number.isFinite(out[i])) continue;
    /* nearest covered sector each way, wrapping */
    let back = 0, fwd = 0;
    while (!Number.isFinite(a[(i - back - 1 + n * 2) % n]) && back < n) back++;
    while (!Number.isFinite(a[(i + fwd + 1) % n]) && fwd < n) fwd++;
    const lo = a[(i - back - 1 + n * 2) % n], hi = a[(i + fwd + 1) % n];
    const t = (back + 1) / (back + fwd + 2);
    out[i] = lo + (hi - lo) * t;
  }
  return out;
}

function smoothColumn(a, radius) {
  const n = a.length, out = new Array(n);
  for (let i = 0; i < n; i++) {
    let s = 0, c = 0;
    for (let k = -radius; k <= radius; k++) {
      const j = i + k;
      if (j < 0 || j >= n) continue;
      if (Number.isFinite(a[j])) { s += a[j]; c++; }
    }
    out[i] = c ? s / c : a[i];
  }
  return out;
}

/** world position of one ring vertex */
export function ringPoint(stack, band, sector) {
  const a = sector / stack.sectors * TAU;
  const rad = stack.r[band][sector];
  return [stack.cx[band] + Math.cos(a) * rad, stack.ys[band], stack.cz[band] + Math.sin(a) * rad];
}

/**
 * A stack whose cross-sections are given as explicit polygons in (x, z).
 *
 * The mediastinum needs this rather than a rectangle: it is broad in front,
 * where the heart pushes the lungs apart, and narrow behind, where they close
 * in beside the vertebral bodies. A single width per height cannot say that,
 * and it is the difference between the compartment and a slot.
 *
 * The polygon is converted to a radius per sector about its own centroid,
 * which is valid as long as the shape is star-shaped from there -- true of a
 * cross-section that is widest where the centroid falls.
 *
 * bands: [{ y, poly: [[x, z], ...] }]
 */
export function polyStack(bands, opts = {}) {
  const sectors = opts.sectors || 44;
  const ys = [], cx = [], cz = [], r = [], covered = [];
  for (const b of bands) {
    const poly = b.poly;
    let sx = 0, sz = 0;
    for (const p of poly) { sx += p[0]; sz += p[1]; }
    const c = [sx / poly.length, sz / poly.length];
    const row = new Array(sectors).fill(NaN);
    for (let s = 0; s < sectors; s++) {
      const a = s / sectors * TAU, dx = Math.cos(a), dz = Math.sin(a);
      let best = Infinity;
      for (let i = 0; i < poly.length; i++) {
        const p0 = poly[i], p1 = poly[(i + 1) % poly.length];
        /* ray c + t*d against segment p0->p1 */
        const ex = p1[0] - p0[0], ez = p1[1] - p0[1];
        const den = dx * ez - dz * ex;
        if (Math.abs(den) < 1e-12) continue;
        const qx = p0[0] - c[0], qz = p0[1] - c[1];
        const t = (qx * ez - qz * ex) / den;
        const u = (qx * dz - qz * dx) / den;
        if (t > 1e-9 && u >= -1e-9 && u <= 1 + 1e-9 && t < best) best = t;
      }
      row[s] = Number.isFinite(best) ? best : NaN;
    }
    ys.push(b.y); cx.push(c[0]); cz.push(c[1]);
    r.push(fillGapsCircular(row));
    covered.push(new Array(sectors).fill(true));
  }
  /* a little vertical smoothing so the compartment does not step band to band */
  const sm = opts.smoothV != null ? opts.smoothV : 1;
  if (sm) {
    const copy = r.map((row) => row.slice());
    for (let k = 0; k < r.length; k++) for (let s = 0; s < sectors; s++) {
      let sum = 0, c2 = 0;
      for (let d = -sm; d <= sm; d++) {
        const kk = k + d;
        if (kk < 0 || kk >= r.length) continue;
        if (Number.isFinite(copy[kk][s])) { sum += copy[kk][s]; c2++; }
      }
      if (c2) r[k][s] = sum / c2;
    }
  }
  return { ys, cx, cz, r, covered, sectors, bands: bands.length,
    y0: ys[0], y1: ys[ys.length - 1] };
}

/**
 * Turn a ring stack into a closed surface.
 *
 * The ends are the interesting part. A cavity's lid and floor are rarely flat:
 * the thoracic floor is the dome of the diaphragm, the top of the pelvic cavity
 * is the oblique pelvic inlet. So rather than capping with a flat disc, any
 * vertex that falls outside `floor`/`roof` is moved ONTO that surface, and the
 * caps are drawn as concentric rings whose vertices are placed on it too. The
 * result is a domed floor that is the same surface the abdominal cavity uses as
 * its roof, so the two meet exactly instead of overlapping or leaving a gap.
 *
 * opts
 *   floor(x, z) -> y   lower boundary, or null for a flat bottom
 *   roof(x, z)  -> y   upper boundary, or null for a flat top
 *   adjust(p)   -> p   arbitrary extra clipping (the pleural sacs' medial wall)
 *   capBottom / capTop   close the ends (default true)
 *   capRings           concentric rings per cap
 */
export function stackMesh(stack, opts = {}) {
  const { sectors, bands } = stack;
  const floor = opts.floor || null;
  const roof = opts.roof || null;
  const capRings = opts.capRings || 4;
  const capBottom = opts.capBottom !== false;
  const capTop = opts.capTop !== false;
  const pos = [], idx = [];

  const place = (x, y, z) => {
    if (floor) { const f = floor(x, z); if (Number.isFinite(f) && y < f) y = f; }
    if (roof) { const r = roof(x, z); if (Number.isFinite(r) && y > r) y = r; }
    let p = [x, y, z];
    if (opts.adjust) p = opts.adjust(p) || p;
    return p;
  };
  const add = (p) => { pos.push(p[0], p[1], p[2]); return pos.length / 3 - 1; };

  /* ---- side wall ---- */
  const wall = [];
  for (let i = 0; i < bands; i++) {
    const row = [];
    for (let j = 0; j < sectors; j++) {
      const a = j / sectors * TAU;
      const rad = stack.r[i][j];
      row.push(add(place(stack.cx[i] + Math.cos(a) * rad, stack.ys[i], stack.cz[i] + Math.sin(a) * rad)));
    }
    wall.push(row);
  }
  for (let i = 0; i < bands - 1; i++) {
    for (let j = 0; j < sectors; j++) {
      const j2 = (j + 1) % sectors;
      idx.push(wall[i][j], wall[i + 1][j], wall[i][j2], wall[i][j2], wall[i + 1][j], wall[i + 1][j2]);
    }
  }

  /* ---- caps: concentric rings shrinking to the axis, laid on the boundary ---- */
  const buildCap = (band, surface, flip) => {
    const rings = [wall[band]];
    for (let q = 1; q <= capRings; q++) {
      const t = 1 - q / capRings;
      const row = [];
      for (let j = 0; j < sectors; j++) {
        const a = j / sectors * TAU;
        const rad = stack.r[band][j] * t;
        const x = stack.cx[band] + Math.cos(a) * rad;
        const z = stack.cz[band] + Math.sin(a) * rad;
        const y = surface ? surface(x, z) : stack.ys[band];
        row.push(add(place(x, Number.isFinite(y) ? y : stack.ys[band], z)));
      }
      rings.push(row);
    }
    for (let q = 0; q < capRings; q++) {
      for (let j = 0; j < sectors; j++) {
        const j2 = (j + 1) % sectors;
        const a = rings[q][j], b = rings[q][j2], c = rings[q + 1][j], d = rings[q + 1][j2];
        if (flip) idx.push(a, b, c, b, d, c);
        else idx.push(a, c, b, b, c, d);
      }
    }
  };
  if (capBottom) buildCap(0, floor, false);
  if (capTop) buildCap(bands - 1, roof, true);

  return { positions: new Float32Array(pos), indices: idx };
}

/**
 * A plane through three-ish anatomical points, returned as y = f(x, z). Used
 * for the pelvic inlet: sacral promontory behind, pubic symphysis in front,
 * which is why the true pelvis is entered at a slope and not through a lid.
 */
export function planeThrough(p0, p1, opts = {}) {
  /* p0 posterior/high, p1 anterior/low: interpolate in z, flat across x */
  const dz = p1[2] - p0[2];
  const tiltX = opts.tiltX || 0;
  return (x, z) => {
    const t = Math.abs(dz) < 1e-9 ? 0 : (z - p0[2]) / dz;
    return p0[1] + (p1[1] - p0[1]) * t + tiltX * x;
  };
}

/* ------------------------------------------------------------------ *
 * heightField -- the diaphragm
 * ------------------------------------------------------------------ */

/**
 * Build y = f(x, z) over a grid. `mode` picks which surface of the cloud you
 * want: 'max' is the top (the dome of the diaphragm seen from the chest),
 * 'min' the underside.
 */
export function heightField(points, opts = {}) {
  const list = asList(points);
  const b = boundsOf(list);
  const pad = opts.pad || 0;
  const nx = opts.nx || 24, nz = opts.nz || 24;
  const x0 = (opts.x0 != null ? opts.x0 : b.minX) - pad;
  const x1 = (opts.x1 != null ? opts.x1 : b.maxX) + pad;
  const z0 = (opts.z0 != null ? opts.z0 : b.minZ) - pad;
  const z1 = (opts.z1 != null ? opts.z1 : b.maxZ) + pad;
  const mode = opts.mode || 'max';
  const h = Array.from({ length: nx }, () => new Array(nz).fill(NaN));
  const dx = (x1 - x0) / nx, dz = (z1 - z0) / nz;
  for (const p of list) {
    for (let i = 0; i < p.length; i += 3) {
      const gx = Math.floor((p[i] - x0) / dx), gz = Math.floor((p[i + 2] - z0) / dz);
      if (gx < 0 || gx >= nx || gz < 0 || gz >= nz) continue;
      const cur = h[gx][gz], v = p[i + 1];
      if (!Number.isFinite(cur)) h[gx][gz] = v;
      else h[gx][gz] = mode === 'max' ? Math.max(cur, v) : Math.min(cur, v);
    }
  }
  const field = { x0, z0, dx, dz, nx, nz, h };
  fillFieldGaps(field);
  for (let i = 0; i < (opts.smooth || 1); i++) smoothField(field);
  return field;
}

function fillFieldGaps(f) {
  /* nearest-covered fill; the grid is small so a couple of dilation passes do */
  for (let pass = 0; pass < f.nx + f.nz; pass++) {
    let holes = 0;
    const next = f.h.map((c) => c.slice());
    for (let i = 0; i < f.nx; i++) for (let j = 0; j < f.nz; j++) {
      if (Number.isFinite(f.h[i][j])) continue;
      let s = 0, c = 0;
      for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) {
        const ii = i + a, jj = j + b;
        if (ii < 0 || ii >= f.nx || jj < 0 || jj >= f.nz) continue;
        if (Number.isFinite(f.h[ii][jj])) { s += f.h[ii][jj]; c++; }
      }
      if (c) next[i][j] = s / c; else holes++;
    }
    f.h = next;
    if (!holes) break;
  }
}

function smoothField(f) {
  const next = f.h.map((c) => c.slice());
  for (let i = 0; i < f.nx; i++) for (let j = 0; j < f.nz; j++) {
    let s = 0, c = 0;
    for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) {
      const ii = i + a, jj = j + b;
      if (ii < 0 || ii >= f.nx || jj < 0 || jj >= f.nz) continue;
      if (Number.isFinite(f.h[ii][jj])) { s += f.h[ii][jj]; c++; }
    }
    if (c) next[i][j] = s / c;
  }
  f.h = next;
}

/** bilinear sample, clamped at the edges */
export function sampleField(f, x, z) {
  if (!f) return NaN;
  const gx = Math.min(f.nx - 1, Math.max(0, (x - f.x0) / f.dx - 0.5));
  const gz = Math.min(f.nz - 1, Math.max(0, (z - f.z0) / f.dz - 0.5));
  const i0 = Math.floor(gx), j0 = Math.floor(gz);
  const i1 = Math.min(f.nx - 1, i0 + 1), j1 = Math.min(f.nz - 1, j0 + 1);
  const tx = gx - i0, tz = gz - j0;
  const a = f.h[i0][j0], b = f.h[i1][j0], c = f.h[i0][j1], d = f.h[i1][j1];
  return (a * (1 - tx) + b * tx) * (1 - tz) + (c * (1 - tx) + d * tx) * tz;
}

/**
 * No diaphragm mesh loaded? Build one from the rib cage instead of guessing a
 * flat lid. The rim is the inferior edge of the lower ribs -- real bone, one
 * height per direction -- and the dome rises from that rim to an apex, higher
 * in front than behind, which is the shape that gives the posterior
 * costodiaphragmatic recess its depth.
 */
export function domeFromRim(rimStack, opts = {}) {
  /*
   * apexRise is a fraction of the rim's own radius, so this is scale-free and
   * works the same in GLB metres and in the viewer's scaled units.
   *
   * The defaults are not invented: they were fitted against the real Diaphragm
   * mesh in the muscle layer, and reproduce its dome to about 28 mm RMS over
   * the front, back, lateral and central probes. So the fallback is calibrated
   * to the structure it stands in for, not to how it looks.
   */
  const { apexRise = 1.75, apexShiftZ = 0, power = 3.0 } = opts;
  const k = 0;                                   /* lowest band = the costal margin */
  const cx = rimStack.cx[k], cz = rimStack.cz[k];
  const rimY = opts.rimY != null ? opts.rimY : rimStack.ys[k];
  const nx = opts.nx || 22, nz = opts.nz || 22;
  let maxR = 0;
  for (let s = 0; s < rimStack.sectors; s++) maxR = Math.max(maxR, rimStack.r[k][s]);
  const x0 = cx - maxR, x1 = cx + maxR, z0 = cz - maxR, z1 = cz + maxR;
  const dx = (x1 - x0) / nx, dz = (z1 - z0) / nz;
  const apexY = rimY + apexRise * maxR;
  const apexZ = cz + apexShiftZ * maxR;
  const h = Array.from({ length: nx }, () => new Array(nz).fill(NaN));
  for (let i = 0; i < nx; i++) for (let j = 0; j < nz; j++) {
    const x = x0 + (i + 0.5) * dx, z = z0 + (j + 0.5) * dz;
    let a = Math.atan2(z - cz, x - cx); if (a < 0) a += TAU;
    const s = Math.min(rimStack.sectors - 1, Math.floor(a / TAU * rimStack.sectors));
    const rim = rimStack.r[k][s];
    const d = Math.hypot(x - cx, z - cz) / (rim || 1e-6);
    /* normalised distance from the apex, which sits forward of the axis */
    const t = Math.min(1, Math.hypot(x - cx, z - apexZ) / (rim || 1e-6));
    h[i][j] = d >= 1 ? rimY : apexY - (apexY - rimY) * Math.pow(t, power);
  }
  const f = { x0, z0, dx, dz, nx, nz, h };
  fillFieldGaps(f); smoothField(f);
  return f;
}

/* ------------------------------------------------------------------ *
 * starShell -- blobs (cranial cavity, pericardial sac)
 * ------------------------------------------------------------------ */

/**
 * Radius sampled over a lat/lon grid from one centre.
 *   mode 'min'  the inner surface of a shell (inside of the skull vault)
 *   mode 'max'  the outer surface of a solid (around the heart)
 */
export function starShell(points, opts = {}) {
  const list = asList(points);
  const b = boundsOf(list);
  const lat = opts.lat || 14, lon = opts.lon || 28;
  const mode = opts.mode || 'min';
  const percentile = opts.percentile != null ? opts.percentile : (mode === 'min' ? 0.10 : 0.94);
  const centre = opts.centre || [(b.minX + b.maxX) / 2, (b.minY + b.maxY) / 2, (b.minZ + b.maxZ) / 2];
  const scaleY = opts.scaleY || 1;              /* squash before measuring, unsquash after */
  const buckets = Array.from({ length: lat }, () => Array.from({ length: lon }, () => []));
  for (const p of list) {
    for (let i = 0; i < p.length; i += 3) {
      const dx = p[i] - centre[0], dy = (p[i + 1] - centre[1]) / scaleY, dz = p[i + 2] - centre[2];
      const rad = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (!(rad > 1e-6)) continue;
      const phi = Math.acos(Math.max(-1, Math.min(1, dy / rad)));       /* 0 = up */
      let th = Math.atan2(dz, dx); if (th < 0) th += TAU;
      const li = Math.min(lat - 1, Math.floor(phi / Math.PI * lat));
      const oi = Math.min(lon - 1, Math.floor(th / TAU * lon));
      buckets[li][oi].push(rad);
    }
  }
  const r = [];
  for (let i = 0; i < lat; i++) {
    const row = new Array(lon);
    for (let j = 0; j < lon; j++) {
      const bs = buckets[i][j];
      if (bs.length < (opts.minPerCell || 2)) { row[j] = NaN; continue; }
      bs.sort((a, c) => a - c);
      row[j] = percentileOf(bs, percentile);
    }
    r.push(fillGapsCircular(row));
  }
  /* a pole row with nothing in it borrows from its neighbour */
  for (let j = 0; j < lon; j++) {
    const col = r.map((row) => row[j]);
    fillGapsLinear(col);
    for (let i = 0; i < lat; i++) r[i][j] = col[i];
  }
  let out = r.map((row) => smoothRing(row, opts.smooth != null ? opts.smooth : 2));
  if (opts.inset) out = out.map((row) => row.map((v) => Math.max(v - opts.inset, 1e-4)));
  if (opts.grow) out = out.map((row) => row.map((v) => v + opts.grow));
  /*
   * A shell with a hole in it -- and the skull has a large one, the foramen
   * magnum -- lets the ray in that direction escape, and the gap-fill then
   * hands back a radius far outside the bone. Cap every direction at the
   * distance from the centre to the cloud's own bounding box, so the cavity can
   * never be larger than the structure it was measured from.
   */
  if (opts.capBox !== false) {
    const inset = opts.capInset || 0;
    for (let i = 0; i < lat; i++) {
      for (let j = 0; j < lon; j++) {
        const phi = (i + 0.5) / lat * Math.PI, th = j / lon * TAU;
        const ux = Math.sin(phi) * Math.cos(th);
        const uy = Math.cos(phi) * scaleY;
        const uz = Math.sin(phi) * Math.sin(th);
        let t = Infinity;
        if (Math.abs(ux) > 1e-9) t = Math.min(t, ((ux > 0 ? b.maxX : b.minX) - centre[0]) / ux);
        if (Math.abs(uy) > 1e-9) t = Math.min(t, ((uy > 0 ? b.maxY : b.minY) - centre[1]) / uy);
        if (Math.abs(uz) > 1e-9) t = Math.min(t, ((uz > 0 ? b.maxZ : b.minZ) - centre[2]) / uz);
        if (Number.isFinite(t) && t > 0) out[i][j] = Math.min(out[i][j], Math.max(t - inset, 1e-4));
      }
    }
  }
  return { centre, lat, lon, r: out, scaleY, box: b };
}

/**
 * Triangulate a starShell. `clampY` lets a caller cut the blob off at a real
 * anatomical floor -- the cranial cavity stops at the skull base rather than
 * ballooning down through the foramen magnum into the neck.
 */
export function starMesh(shell, opts = {}) {
  const { lat, lon } = shell;
  const clampY = opts.clampY || null;
  const pos = [], idx = [];
  const push = (p) => { pos.push(p[0], clampY ? clampY(p[0], p[1], p[2]) : p[1], p[2]); };
  /* north pole row, body rows, south pole row */
  const rows = lat + 2;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < lon; j++) {
      if (i === 0) push([shell.centre[0], shell.centre[1] + shell.r[0][j] * shell.scaleY, shell.centre[2]]);
      else if (i === rows - 1) push([shell.centre[0], shell.centre[1] - shell.r[lat - 1][j] * shell.scaleY, shell.centre[2]]);
      else push(starPoint(shell, i - 1, j));
    }
  }
  for (let i = 0; i < rows - 1; i++) {
    for (let j = 0; j < lon; j++) {
      const a = i * lon + j, b2 = i * lon + (j + 1) % lon;
      const c = (i + 1) * lon + j, d = (i + 1) * lon + (j + 1) % lon;
      idx.push(a, c, b2, b2, c, d);
    }
  }
  return { positions: new Float32Array(pos), indices: idx };
}

export function starPoint(shell, i, j) {
  const phi = (i + 0.5) / shell.lat * Math.PI;
  const th = j / shell.lon * TAU;
  const rad = shell.r[i][j];
  return [
    shell.centre[0] + rad * Math.sin(phi) * Math.cos(th),
    shell.centre[1] + rad * Math.cos(phi) * shell.scaleY,
    shell.centre[2] + rad * Math.sin(phi) * Math.sin(th),
  ];
}

/* ------------------------------------------------------------------ *
 * vertebral canal
 * ------------------------------------------------------------------ */

/**
 * Find the vertebral foramen of one vertebra: the enclosed empty space between
 * the body in front and the arch behind.
 *
 * Rasterise the vertebra's vertices into an occupancy grid in (x, z) at
 * mid-height, flood-fill the empty cells inward from the border, and whatever
 * empty cells the fill could NOT reach are enclosed by bone -- that is the
 * foramen. Its centroid is the canal centre and its area gives the radius.
 *
 * This is worth the effort over "put a tube a bit behind the bodies": the canal
 * then genuinely tracks the cervical lordosis, the thoracic kyphosis and the
 * lumbar lordosis, because each vertebra reports its own hole.
 */
export function foramenOf(meshes, opts = {}) {
  /*
   * One fixed slice does not work across the whole column: the lamina of a
   * thoracic vertebra closes at a different height within the bone than that of
   * a lumbar one, and a slice taken where the arch happens to be open leaks and
   * reports either nothing or the whole outside. So try a spread of slices and
   * grid resolutions and keep the best-scoring hole -- see scoreForamen.
   */
  /*
   * The canal only shows as an enclosed hole in a THIN slice taken at the level
   * of the pedicles. Project the whole bone from above instead and the superior
   * and inferior articular processes close over the canal, leaving only the
   * transverse foramina -- which is exactly what the first attempt at this
   * produced. And the pedicles sit at a different height within the bone in the
   * cervical, thoracic and lumbar regions, so no single fixed slice works
   * either. So scan thin slices up the bone and keep the best-scoring hole.
   */
  const list = Array.isArray(meshes) ? meshes : [meshes];
  const b0 = boundsOf(list.map((m) => m.positions));
  if (b0.empty) return null;
  const scan = (n, halfWidth, grid) => {
    let best = null;
    for (let i = 0; i < n; i++) {
      const c = 0.08 + 0.84 * (i / (n - 1));
      const cands = foramenCandidates(list, {
        ...opts, yLo: Math.max(0, c - halfWidth), yHi: Math.min(1, c + halfWidth), grid,
      });
      for (const cand of cands) {
        cand.score = scoreForamen(cand, b0);
        if (cand.score > 0 && (!best || cand.score > best.score)) best = cand;
      }
    }
    return best;
  };
  return scan(16, 0.055, 40) || scan(12, 0.10, 52) || scan(10, 0.16, 34);
}

/**
 * A believable vertebral foramen is a modest hole, roughly on the midline, and
 * behind the centre of the bone (the body is in front of it). Anything that
 * fails those is a leak or a different hole, not the canal.
 */
function scoreForamen(f, b) {
  const w = b.maxX - b.minX, d = b.maxZ - b.minZ;
  const cx = (b.minX + b.maxX) / 2, cz = (b.minZ + b.maxZ) / 2;
  const rel = f.r / (w || 1e-6);
  if (rel < 0.05 || rel > 0.45) return 0;              /* too small / swallowed the bone */
  if (Math.abs(f.x - cx) > w * 0.18) return 0;          /* a transverse foramen, not the canal */
  if (f.z > cz + d * 0.32) return 0;                    /* in front of the body: wrong hole */
  /* prefer holes near the ideal size and well centred */
  return (1 - Math.abs(rel - 0.17) / 0.32) + (1 - Math.abs(f.x - cx) / (w * 0.18)) * 0.4;
}

/**
 * Rasterise the outline where a horizontal plane cuts a set of triangle
 * meshes. Every triangle straddling the plane contributes one segment; drawn
 * together they form the closed cross-section of the bone at that height,
 * which is what makes the flood fill below trustworthy.
 */
function sliceInto(grid2, meshes, y, x0, z0, dx, dz, grid) {
  let any = false;
  const line = (ax, az, bx, bz) => {
    const gx0 = (ax - x0) / dx, gz0 = (az - z0) / dz;
    const gx1 = (bx - x0) / dx, gz1 = (bz - z0) / dz;
    const steps = Math.max(1, Math.ceil(Math.max(Math.abs(gx1 - gx0), Math.abs(gz1 - gz0)) * 2));
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      const gx = Math.floor(gx0 + (gx1 - gx0) * t), gz = Math.floor(gz0 + (gz1 - gz0) * t);
      if (gx < 0 || gx >= grid || gz < 0 || gz >= grid) continue;
      grid2[gx][gz] = 1; any = true;
    }
  };
  for (const m of meshes) {
    const p = m.positions, ix = m.indices;
    if (!p || !ix) continue;
    for (let t = 0; t + 2 < ix.length; t += 3) {
      const a = ix[t] * 3, b = ix[t + 1] * 3, c = ix[t + 2] * 3;
      const ya = p[a + 1], yb = p[b + 1], yc = p[c + 1];
      if ((ya < y && yb < y && yc < y) || (ya > y && yb > y && yc > y)) continue;
      /* the two edges that cross the plane give the segment */
      const hits = [];
      const edge = (i, j, yi, yj) => {
        if ((yi < y && yj < y) || (yi > y && yj > y)) return;
        const d = yj - yi;
        const s = Math.abs(d) < 1e-12 ? 0 : (y - yi) / d;
        hits.push([p[i] + (p[j] - p[i]) * s, p[i + 2] + (p[j + 2] - p[i + 2]) * s]);
      };
      edge(a, b, ya, yb); edge(b, c, yb, yc); edge(c, a, yc, ya);
      if (hits.length >= 2) line(hits[0][0], hits[0][1], hits[1][0], hits[1][1]);
    }
  }
  return any;
}

export function foramenCandidates(meshes, opts = {}) {
  const list = Array.isArray(meshes) ? meshes : [meshes];
  const b = boundsOf(list.map((m) => m.positions));
  if (b.empty) return [];
  const grid = opts.grid || 34;
  const yLo = b.minY + (b.maxY - b.minY) * (opts.yLo != null ? opts.yLo : 0.30);
  const yHi = b.minY + (b.maxY - b.minY) * (opts.yHi != null ? opts.yHi : 0.72);
  const pad = (b.maxX - b.minX) * 0.06 + 1e-6;
  const x0 = b.minX - pad, x1 = b.maxX + pad, z0 = b.minZ - pad, z1 = b.maxZ + pad;
  const dx = (x1 - x0) / grid, dz = (z1 - z0) / grid;
  const occ = Array.from({ length: grid }, () => new Uint8Array(grid));
  /* a few planes across the window, so a slightly-off level still catches the ring */
  const planes = opts.planes || 3;
  let any = false;
  for (let k = 0; k < planes; k++) {
    const y = yLo + (yHi - yLo) * (planes === 1 ? 0.5 : k / (planes - 1));
    if (sliceInto(occ, list, y, x0, z0, dx, dz, grid)) any = true;
  }
  if (!any) return [];
  /* close single-cell pinholes left by the rasteriser */
  const closed = occ.map((c) => Uint8Array.from(c));
  for (let i = 1; i < grid - 1; i++) for (let j = 1; j < grid - 1; j++) {
    if (occ[i][j]) continue;
    let n = 0;
    if (occ[i - 1][j]) n++; if (occ[i + 1][j]) n++; if (occ[i][j - 1]) n++; if (occ[i][j + 1]) n++;
    if (n >= 3) closed[i][j] = 1;
  }
  /* flood the outside */
  const outside = Array.from({ length: grid }, () => new Uint8Array(grid));
  const stack = [];
  for (let i = 0; i < grid; i++) {
    for (const j of [0, grid - 1]) if (!closed[i][j] && !outside[i][j]) { outside[i][j] = 1; stack.push(i, j); }
  }
  for (let j = 0; j < grid; j++) {
    for (const i of [0, grid - 1]) if (!closed[i][j] && !outside[i][j]) { outside[i][j] = 1; stack.push(i, j); }
  }
  while (stack.length) {
    const j = stack.pop(), i = stack.pop();
    const nb = [[i - 1, j], [i + 1, j], [i, j - 1], [i, j + 1]];
    for (const [ii, jj] of nb) {
      if (ii < 0 || ii >= grid || jj < 0 || jj >= grid) continue;
      if (closed[ii][jj] || outside[ii][jj]) continue;
      outside[ii][jj] = 1; stack.push(ii, jj);
    }
  }
  /*
   * Every enclosed empty region is a candidate, not just the biggest: a
   * cervical vertebra also encloses its two transverse foramina, and on a bad
   * slice one of those can out-measure the canal. The caller scores them all
   * and keeps whichever actually looks like a vertebral canal.
   */
  const seen = Array.from({ length: grid }, () => new Uint8Array(grid));
  const out = [];
  for (let i = 0; i < grid; i++) for (let j = 0; j < grid; j++) {
    if (closed[i][j] || outside[i][j] || seen[i][j]) continue;
    const blob = [];
    const st = [i, j]; seen[i][j] = 1;
    while (st.length) {
      const jj = st.pop(), ii = st.pop();
      blob.push(ii, jj);
      for (const [a, c] of [[ii - 1, jj], [ii + 1, jj], [ii, jj - 1], [ii, jj + 1]]) {
        if (a < 0 || a >= grid || c < 0 || c >= grid) continue;
        if (closed[a][c] || outside[a][c] || seen[a][c]) continue;
        seen[a][c] = 1; st.push(a, c);
      }
    }
    if (blob.length < 6) continue;
    let sx = 0, sz = 0;
    for (let k = 0; k < blob.length; k += 2) {
      sx += x0 + (blob[k] + 0.5) * dx;
      sz += z0 + (blob[k + 1] + 0.5) * dz;
    }
    const n = blob.length / 2;
    out.push({
      x: sx / n, z: sz / n, y: (b.minY + b.maxY) / 2,
      r: Math.sqrt(n * dx * dz / Math.PI),
      yMin: b.minY, yMax: b.maxY, cells: n,
    });
  }
  return out;
}

/**
 * The whole canal: one foramen per vertebra, sorted head-to-tail and smoothed
 * into a path. Vertebrae whose hole could not be found are simply skipped --
 * the neighbours carry the curve through.
 */
export function canalPath(vertebraClouds, opts = {}) {
  const nodes = [];
  for (const v of vertebraClouds) {
    const f = foramenOf(v.meshes || v, opts);
    if (f) nodes.push({ ...f, name: v.name });
  }
  nodes.sort((a, b) => b.y - a.y);                    /* superior first */
  if (nodes.length < 3) return { nodes, path: nodes.map((n) => [n.x, n.y, n.z]), radius: [] };

  /*
   * The canal is a midline structure, so a single vertebra whose hole was found
   * slightly off-centre should not make the tube swerve. Pin x to the median of
   * what was actually measured -- still derived from the bone, just not hostage
   * to one bad slice. Radii get the same treatment against outliers.
   */
  const med = (a) => { const s = [...a].sort((p, q) => p - q); return s[Math.floor(s.length / 2)]; };
  const xMid = med(nodes.map((n) => n.x));
  const rMed = med(nodes.map((n) => n.r));
  for (const n of nodes) n.r = Math.min(Math.max(n.r, rMed * 0.55), rMed * 1.7);

  const sm = opts.pathSmooth != null ? opts.pathSmooth : 1;
  const path = [], radius = [];
  for (let i = 0; i < nodes.length; i++) {
    let sy = 0, sz = 0, sr = 0, c = 0;
    for (let k = -sm; k <= sm; k++) {
      const j = i + k;
      if (j < 0 || j >= nodes.length) continue;
      sy += nodes[j].y; sz += nodes[j].z; sr += nodes[j].r; c++;
    }
    path.push([xMid, sy / c, sz / c]);
    radius.push(sr / c);
  }
  return { nodes, path, radius, xMid };
}

/**
 * A tube of varying radius swept along a path. three.js TubeGeometry takes a
 * single radius, and the canal genuinely is not one: it is widest in the
 * cervical and lumbar enlargements and narrowest in the mid-thoracic spine,
 * which is measured per vertebra, so the tube carries a radius per node.
 */
export function tubeMesh(path, radii, opts = {}) {
  const sides = opts.sides || 14;
  const smooth = opts.resample || 3;               /* extra points between nodes */
  /* Catmull-Rom resample so the tube curves smoothly through the foramina */
  const P = [], Rd = [];
  const at = (i) => path[Math.min(path.length - 1, Math.max(0, i))];
  const rat = (i) => radii[Math.min(radii.length - 1, Math.max(0, i))];
  for (let i = 0; i < path.length - 1; i++) {
    for (let s = 0; s < smooth; s++) {
      const t = s / smooth, t2 = t * t, t3 = t2 * t;
      const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
      const q = [0, 1, 2].map((k) => 0.5 * ((2 * p1[k]) + (-p0[k] + p2[k]) * t
        + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2
        + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3));
      P.push(q);
      Rd.push(rat(i) + (rat(i + 1) - rat(i)) * t);
    }
  }
  P.push(at(path.length - 1)); Rd.push(rat(radii.length - 1));

  const pos = [], idx = [];
  let prevN = [1, 0, 0];
  for (let i = 0; i < P.length; i++) {
    const a = P[Math.max(0, i - 1)], b = P[Math.min(P.length - 1, i + 1)];
    let t = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
    const tl = Math.hypot(...t) || 1; t = t.map((v) => v / tl);
    /* parallel-transport a reference vector so the tube does not twist */
    let n = [prevN[0], prevN[1], prevN[2]];
    const d = n[0] * t[0] + n[1] * t[1] + n[2] * t[2];
    n = [n[0] - t[0] * d, n[1] - t[1] * d, n[2] - t[2] * d];
    let nl = Math.hypot(...n);
    if (nl < 1e-6) { n = Math.abs(t[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0]; nl = 1; }
    n = n.map((v) => v / nl);
    prevN = n;
    const bn = [t[1] * n[2] - t[2] * n[1], t[2] * n[0] - t[0] * n[2], t[0] * n[1] - t[1] * n[0]];
    for (let s = 0; s < sides; s++) {
      const a2 = s / sides * TAU, ca = Math.cos(a2), sa = Math.sin(a2), r = Rd[i];
      pos.push(P[i][0] + (n[0] * ca + bn[0] * sa) * r,
        P[i][1] + (n[1] * ca + bn[1] * sa) * r,
        P[i][2] + (n[2] * ca + bn[2] * sa) * r);
    }
  }
  for (let i = 0; i < P.length - 1; i++) {
    for (let s = 0; s < sides; s++) {
      const s2 = (s + 1) % sides;
      const a = i * sides + s, b = i * sides + s2, c = (i + 1) * sides + s, d = (i + 1) * sides + s2;
      idx.push(a, c, b, b, c, d);
    }
  }
  return { positions: new Float32Array(pos), indices: idx };
}

/* ------------------------------------------------------------------ *
 * anterior surface -- where the region grid gets painted
 * ------------------------------------------------------------------ */

/**
 * z = f(x, y) of the front of the body: the largest z at each (x, y) cell.
 * The nine regions and four quadrants are drawn ON this, so the lines curve
 * with the belly instead of floating on a flat sheet in front of it.
 */
export function frontSurface(points, opts = {}) {
  const list = asList(points);
  const b = boundsOf(list);
  const nx = opts.nx || 26, ny = opts.ny || 30;
  const x0 = opts.x0 != null ? opts.x0 : b.minX, x1 = opts.x1 != null ? opts.x1 : b.maxX;
  const y0 = opts.y0 != null ? opts.y0 : b.minY, y1 = opts.y1 != null ? opts.y1 : b.maxY;
  const dx = (x1 - x0) / nx, dy = (y1 - y0) / ny;
  const h = Array.from({ length: nx }, () => new Array(ny).fill(NaN));
  /*
   * zMin discards the back of the body before measuring. Without it, a band
   * with no anterior structure in it -- the belly, when only the skeleton is
   * loaded -- has nothing but lumbar vertebrae in its cells, and the "front"
   * surface collapses onto the spine, putting the region grid inside the
   * patient. Dropping posterior points leaves those cells empty instead, and
   * the fill then interpolates between the costal margin above and the pelvis
   * below, which are both genuinely at the front.
   */
  const zMin = opts.zMin != null ? opts.zMin : -Infinity;
  for (const p of list) {
    for (let i = 0; i < p.length; i += 3) {
      const v = p[i + 2];
      if (v < zMin) continue;
      const gx = Math.floor((p[i] - x0) / dx), gy = Math.floor((p[i + 1] - y0) / dy);
      if (gx < 0 || gx >= nx || gy < 0 || gy >= ny) continue;
      if (!Number.isFinite(h[gx][gy]) || v > h[gx][gy]) h[gx][gy] = v;
    }
  }
  const f = { x0, z0: y0, dx, dz: dy, nx, nz: ny, h };   /* reuse the field sampler */
  fillFieldGaps(f);
  for (let i = 0; i < (opts.smooth || 2); i++) smoothField(f);
  return f;
}
