/*
 * cavity-build.js -- one builder per cavity, each defined by the structures
 * that actually bound it.
 *
 * Reading a builder should read like the anatomical definition. The thoracic
 * cavity is "inside the ribs, the sternum and the thoracic vertebrae, floored
 * by the diaphragm" -- and that is literally what buildThoracic asks for. No
 * builder contains a coordinate; every number it uses is measured from the
 * meshes at build time, so the overlays follow the model rather than a
 * remembered screenshot of it.
 *
 * INPUT
 *
 * ctx.meshesFor(landmarkKey) -> [{ positions, indices }] in the body frame,
 * ctx.tier(cavityId)         -> which references resolved (see landmarks.js),
 * ctx.body                   -> bounds of the whole model.
 *
 * OUTPUT
 *
 * { parts: [{positions, indices}], centroid, exact, basis, note }
 *
 * `exact` is false when a cavity had to be reasoned from something other than
 * the structure that defines it -- a pericardial sac with no heart loaded, a
 * mediastinum with no lungs. The UI shows that rather than presenting every
 * cavity as equally well grounded.
 */

import {
  ringStack, stackMesh, starShell, starMesh, heightField, sampleField, domeFromRim,
  canalPath, tubeMesh, boundsOf, planeThrough, torsoProfile, polyStack,
} from './cavity-geom.js';

const pos = (meshes) => meshes.map((m) => m.positions);

/* ------------------------------------------------------------------ *
 * shared anatomical measurements
 *
 * Computed once per build and handed to every builder, because several
 * cavities have to agree about them: the thoracic floor and the abdominal roof
 * are the same diaphragm, and the pelvic roof and the abdominal floor are the
 * same pelvic inlet. Measuring them twice is how two cavities end up with a
 * gap between them.
 * ------------------------------------------------------------------ */
export function measureLandmarks(ctx) {
  const M = {};
  const grab = (k) => ctx.meshesFor(k);

  /* ---- the diaphragm, as a height field ---- */
  const dia = grab('diaphragm');
  if (dia.length) {
    M.diaphragm = heightField(pos(dia), { nx: 26, nz: 26, mode: 'max', smooth: 1 });
    M.diaphragmReal = true;
    M.diaphragmBox = boundsOf(pos(dia));
  } else {
    /* no muscle layer: raise a dome off the costal margin, which is real bone */
    const rimPts = pos(grab('thorax.ribsLower')).concat(pos(grab('thorax.costalCartilage')));
    if (rimPts.length) {
      const rim = ringStack(rimPts, { bands: 10, sectors: 40, percentile: 0.10 });
      M.diaphragm = domeFromRim(rim);
      M.diaphragmReal = false;
      M.diaphragmBox = boundsOf(rimPts);
    }
  }
  M.diaphragmAt = M.diaphragm ? (x, z) => sampleField(M.diaphragm, x, z) : null;

  /* ---- the pelvic inlet: sacral promontory behind, pubic symphysis in front ---- */
  const sac = pos(grab('spine.sacrum'));
  const hip = pos(grab('pelvis.hipBone'));
  if (sac.length && hip.length) {
    const sb = boundsOf(sac);
    let promY = -Infinity, promZ = 0;
    for (const p of sac) for (let i = 0; i < p.length; i += 3) {
      if (p[i + 2] > sb.maxZ - (sb.maxZ - sb.minZ) * 0.22 && p[i + 1] > promY) {
        promY = p[i + 1]; promZ = p[i + 2];
      }
    }
    let symY = -Infinity, symZ = 0;
    for (const p of hip) for (let i = 0; i < p.length; i += 3) {
      /* the pubic bones meet at the midline, well forward */
      if (Math.abs(p[i]) < (boundsOf(hip).maxX) * 0.09 && p[i + 2] > 0 && p[i + 1] > symY) {
        symY = p[i + 1]; symZ = p[i + 2];
      }
    }
    if (Number.isFinite(promY) && Number.isFinite(symY)) {
      M.promontory = [0, promY, promZ];
      M.symphysis = [0, symY, symZ];
      M.pelvicInlet = planeThrough(M.promontory, M.symphysis);
      M.pelvicBox = boundsOf(hip.concat(sac));
    }
  }

  /* ---- the thoracic inlet: the top of the first ribs ---- */
  const first = pos(grab('thorax.ribFirst'));
  if (first.length) M.thoracicInletY = boundsOf(first).maxY;

  /* ---- the costal margin, per direction: the lowest edge of the rib cage ---- */
  const margin = pos(grab('thorax.ribsLower')).concat(pos(grab('thorax.costalCartilage')));
  if (margin.length) M.costalBox = boundsOf(margin);

  M.xiphoidBox = grab('thorax.xiphoid').length ? boundsOf(pos(grab('thorax.xiphoid'))) : null;
  return M;
}

/* ------------------------------------------------------------------ *
 * builders
 * ------------------------------------------------------------------ */

/*
 * CRANIAL -- the space inside the vault.
 *
 * Measured as the nearest bone in every direction from a centre in the middle
 * of the braincase, which is the inner table of the skull. Capped by the
 * vault's own bounding box so the ray that escapes through the foramen magnum
 * cannot drag the cavity down into the neck.
 */
function buildCranial(ctx, M) {
  const vault = ctx.meshesFor('skull.vault');
  if (!vault.length) return null;
  const p = pos(vault);
  const b = boundsOf(p);
  const shell = starShell(p, {
    lat: 16, lon: 32, mode: 'min', percentile: 0.06, smooth: 2,
    capInset: (b.maxY - b.minY) * 0.03,
    centre: [(b.minX + b.maxX) / 2, b.minY + (b.maxY - b.minY) * 0.62, (b.minZ + b.maxZ) / 2 - (b.maxZ - b.minZ) * 0.03],
  });
  const mesh = starMesh(shell);
  return {
    parts: [mesh],
    centroid: shell.centre,
    exact: true,
    basis: ['skull.vault'],
  };
}

/*
 * VERTEBRAL CANAL -- the real foramen of every vertebra, threaded together.
 * Narrow, behind the bodies, and it follows the cervical, thoracic and lumbar
 * curves because each vertebra reports its own hole rather than sharing one
 * guessed axis.
 */
function buildVertebral(ctx, M) {
  const verts = ctx.entriesFor(['spine.cervical', 'spine.thoracic', 'spine.lumbar', 'spine.sacrum']);
  if (verts.length < 4) return null;
  const clouds = verts.map((e) => ({ name: e.name, meshes: [e.mesh] }));
  const canal = canalPath(clouds, { pathSmooth: 1 });
  if (canal.path.length < 3) return null;
  const mesh = tubeMesh(canal.path, canal.radius, { sides: 14, resample: 4 });
  const mid = canal.path[Math.floor(canal.path.length / 2)];
  return {
    parts: [mesh],
    centroid: mid,
    exact: true,
    basis: ['spine.cervical', 'spine.thoracic', 'spine.lumbar', 'spine.sacrum'],
    note: `${canal.nodes.length} vertebral foramina located`,
  };
}

/* the wall of the chest, as one point cloud */
function thoraxWall(ctx) {
  return pos(ctx.meshesFor('thorax.ribs'))
    .concat(pos(ctx.meshesFor('thorax.sternum')),
      pos(ctx.meshesFor('spine.thoracic')),
      pos(ctx.meshesFor('thorax.costalCartilage')));
}

function thoraxStack(ctx, M, opts = {}) {
  const wall = thoraxWall(ctx);
  if (!wall.length) return null;
  const b = boundsOf(wall);
  const y0 = M.diaphragmBox ? Math.max(b.minY, M.diaphragmBox.minY - (b.maxY - b.minY) * 0.02) : b.minY;
  const y1 = M.thoracicInletY != null ? M.thoracicInletY : b.maxY;
  return ringStack(wall, {
    y0, y1, bands: opts.bands || 26, sectors: opts.sectors || 56,
    percentile: 0.10, inset: (b.maxX - b.minX) * 0.02, smoothA: 2, smoothV: 1,
    axisSmooth: 2,
  });
}

/*
 * THORACIC -- inside the ribs, sternum and thoracic vertebrae, floored by the
 * diaphragm. The floor is the single most important part: a flat lid would put
 * the lung bases level, when in life the posterior recess runs several
 * centimetres lower than the front, which is where an effusion collects.
 */
function buildThoracic(ctx, M) {
  const stack = thoraxStack(ctx, M);
  if (!stack) return null;
  const mesh = stackMesh(stack, { floor: M.diaphragmAt, capRings: 5 });
  return {
    parts: [mesh],
    centroid: [stack.cx[Math.floor(stack.bands / 2)],
      (stack.ys[0] + stack.ys[stack.bands - 1]) / 2,
      stack.cz[Math.floor(stack.bands / 2)]],
    exact: true,
    basis: ['thorax.ribs', 'thorax.sternum', 'spine.thoracic'],
    note: M.diaphragmReal ? 'floor is the diaphragm mesh'
      : 'floor raised off the costal margin (muscle layer not loaded)',
  };
}

/*
 * PLEURAL -- one sac per lung.
 *
 * With the organ layer loaded these are measured from the lungs themselves,
 * which is what a pleural cavity actually wraps. Without it, the hemithorax is
 * used and the medial wall is placed at the edge of the vertebral bodies --
 * real bone, but an approximation of the mediastinal pleura, so `exact` is
 * false and the caption says so.
 */
function buildPleural(ctx, M) {
  const L = ctx.meshesFor('lung.left'), R = ctx.meshesFor('lung.right');
  const parts = [];
  if (L.length && R.length) {
    const lb = boundsOf(pos(L)), rb = boundsOf(pos(R));
    for (const [lung, sign] of [[L, 1], [R, -1]]) {
      const p = pos(lung);
      const b = boundsOf(p);
      const st = ringStack(p, {
        bands: 20, sectors: 40, percentile: 0.97, smoothA: 2, smoothV: 1,
        y0: b.minY, y1: b.maxY,
      });
      /* the sac is the lung plus the thin space around it */
      const grow = (b.maxX - b.minX) * 0.045;
      for (let i = 0; i < st.bands; i++) for (let s = 0; s < st.sectors; s++) st.r[i][s] += grow;
      /*
       * The two sacs must not meet: the mediastinum lies between them, and a
       * sac that grew across the midline would erase exactly the point of
       * drawing them separately. Hold each at its own lung's medial surface.
       */
      const medial = sign > 0 ? lb.minX : rb.maxX;
      parts.push(stackMesh(st, {
        capRings: 4,
        adjust: (q) => [sign > 0 ? Math.max(q[0], medial) : Math.min(q[0], medial), q[1], q[2]],
      }));
    }
    return {
      parts,
      centroid: [0, (lb.minY + lb.maxY) / 2, (lb.minZ + lb.maxZ) / 2],
      exact: true,
      basis: ['lung.left', 'lung.right'],
    };
  }
  /* fallback: split the thorax at the mediastinum */
  const stack = thoraxStack(ctx, M, { sectors: 48 });
  if (!stack) return null;
  const medial = mediastinalHalfWidth(ctx, stack);
  for (const side of [1, -1]) {
    parts.push(stackMesh(stack, {
      floor: M.diaphragmAt,
      capRings: 4,
      adjust: (p) => {
        const lim = medial(p[1]);
        /* keep this half only: everything past the midline collapses onto it */
        return [side > 0 ? Math.max(p[0], lim) : Math.min(p[0], -lim), p[1], p[2]];
      },
    }));
  }
  return {
    parts,
    centroid: [0, (stack.ys[0] + stack.ys[stack.bands - 1]) / 2, 0],
    exact: false,
    basis: ['thorax.ribs', 'spine.thoracic'],
    note: 'lungs not loaded — medial wall placed at the vertebral bodies',
  };
}

/* half-width of the mediastinum at a given height, from the vertebral bodies */
function mediastinalHalfWidth(ctx, stack) {
  const vt = pos(ctx.meshesFor('spine.thoracic'));
  const b = vt.length ? boundsOf(vt) : null;
  const w = b ? (b.maxX - b.minX) * 0.55 : 0.02;
  return () => w;
}

/*
 * MEDIASTINUM -- the space between the two pleural sacs.
 *
 * Named walls rather than a sweep, and a real cross-section rather than a
 * width. At each height, and at each depth within that height, the compartment
 * runs from the medial surface of one lung to the other; front to back it runs
 * from the back of the sternum to the front of the vertebral bodies. That is
 * the textbook definition, and it is the only construction that gets the shape
 * right -- broad in front where the heart pushes the lungs apart, narrow behind
 * where they close in beside the vertebral column.
 */
function buildMediastinum(ctx, M) {
  const L = ctx.meshesFor('lung.left'), R = ctx.meshesFor('lung.right');
  const sternum = ctx.meshesFor('thorax.sternum');
  const spine = ctx.meshesFor('spine.thoracic');
  if (!sternum.length || !spine.length) return null;
  const haveLungs = L.length && R.length;
  const sb = boundsOf(pos(sternum));
  const vb = boundsOf(pos(spine));
  const bands = 18, depth = 9;
  /*
   * Start at the diaphragm, not at the xiphoid. The last centimetre or two
   * above the xiphoid cuts the lungs at their very base, where each one is a
   * thin crescent lying on the dome and its medial edge has already swung far
   * out to the side. Measured there, "the gap between the lungs" is most of the
   * chest, and the compartment ends in a pair of wings twice the width of the
   * heart. The mediastinum's floor is the diaphragm, so that is where it starts.
   */
  const y1 = sb.maxY;
  const midZ = (vb.maxZ + boundsOf(pos(sternum)).minZ) / 2;
  const dFloor = M.diaphragmAt ? M.diaphragmAt(0, midZ) : NaN;
  const y0 = Number.isFinite(dFloor) ? Math.max(sb.minY, Math.min(dFloor, sb.maxY - (sb.maxY - sb.minY) * 0.3)) : sb.minY;
  const dy = (y1 - y0) / bands;
  const halfY = dy * 0.9;

  const inBand = (y, k) => Math.abs(y - (y0 + (k + 0.5) * dy)) <= halfY;
  /* extreme of a cloud within a band, optionally within a depth window too */
  const extreme = (clouds, k, wantMax, zLo, zHi) => {
    let best = NaN;
    for (const cl of clouds) {
      for (let i = 0; i < cl.length; i += 3) {
        const y = cl[i + 1];
        if (!inBand(y, k)) continue;
        const z = cl[i + 2];
        if (zLo != null && (z < zLo || z > zHi)) continue;
        const v = cl[i];
        if (!Number.isFinite(best) || (wantMax ? v > best : v < best)) best = v;
      }
    }
    return best;
  };
  const zExtreme = (clouds, k, wantMax) => {
    let best = NaN;
    for (const cl of clouds) {
      for (let i = 0; i < cl.length; i += 3) {
        if (!inBand(cl[i + 1], k)) continue;
        const v = cl[i + 2];
        if (!Number.isFinite(best) || (wantMax ? v > best : v < best)) best = v;
      }
    }
    return best;
  };
  const hold = (arr) => {
    let first = arr.findIndex(Number.isFinite);
    if (first < 0) return arr;
    let last = arr.length - 1;
    while (!Number.isFinite(arr[last])) last--;
    for (let i = 0; i < first; i++) arr[i] = arr[first];
    for (let i = last + 1; i < arr.length; i++) arr[i] = arr[last];
    for (let i = first; i <= last; i++) if (!Number.isFinite(arr[i])) arr[i] = arr[i - 1];
    return arr;
  };

  const back = hold(Array.from({ length: bands }, (_, k) => zExtreme(pos(spine), k, true)));
  const front = hold(Array.from({ length: bands }, (_, k) => zExtreme(pos(sternum), k, false)));
  const minWidth = (vb.maxX - vb.minX) * 0.32;

  const out = [];
  for (let k = 0; k < bands; k++) {
    const zb = back[k], zf = front[k];
    if (!(zf > zb + 1e-4)) continue;
    const dz = (zf - zb) / (depth - 1);
    const leftAt = [], rightAt = [];
    for (let j = 0; j < depth; j++) {
      const z = zb + j * dz;
      if (haveLungs) {
        leftAt.push(extreme(pos(L), k, false, z - dz * 0.75, z + dz * 0.75));
        rightAt.push(extreme(pos(R), k, true, z - dz * 0.75, z + dz * 0.75));
      } else {
        /* no organ layer: the vertebral bodies are the only honest guide */
        leftAt.push(vb.maxX * 0.85); rightAt.push(vb.minX * 0.85);
      }
    }
    hold(leftAt); hold(rightAt);
    if (!Number.isFinite(leftAt[0]) || !Number.isFinite(rightAt[0])) continue;
    const poly = [];
    /* up the left wall from back to front, then back down the right wall */
    for (let j = 0; j < depth; j++) {
      poly.push([Math.max(leftAt[j], minWidth), zb + j * dz]);
    }
    for (let j = depth - 1; j >= 0; j--) {
      poly.push([Math.min(rightAt[j], -minWidth), zb + j * dz]);
    }
    out.push({ y: y0 + (k + 0.5) * dy, poly });
  }
  if (out.length < 3) return null;
  const stack = polyStack(out, { sectors: 44, smoothV: 1 });
  const mesh = stackMesh(stack, { floor: M.diaphragmAt, capRings: 4 });
  return {
    parts: [mesh],
    stack,                       /* the pericardial fallback subsets this */
    centroid: [0, (y0 + y1) / 2, (back[Math.floor(bands / 2)] + front[Math.floor(bands / 2)]) / 2],
    exact: haveLungs,
    basis: haveLungs ? ['lung.left', 'lung.right', 'thorax.sternum', 'spine.thoracic']
      : ['thorax.sternum', 'spine.thoracic'],
    note: haveLungs ? 'lateral walls are the medial surfaces of the lungs'
      : 'organ layer not loaded — width estimated from the vertebral bodies',
  };
}

/*
 * PERICARDIAL -- wrapped straight round the heart when the circulatory layer
 * is loaded. It is the one cavity with no bony definition at all, so with no
 * heart it is placed in the lower mediastinum, tilted left, and flagged.
 */
function buildPericardial(ctx, M) {
  const heart = ctx.meshesFor('heart');
  if (heart.length) {
    const p = pos(heart);
    const b = boundsOf(p);
    const shell = starShell(p, {
      lat: 14, lon: 28, mode: 'max', percentile: 0.96, smooth: 2, capBox: false,
      grow: (b.maxX - b.minX) * 0.05,
    });
    return {
      parts: [starMesh(shell)],
      centroid: shell.centre,
      exact: true,
      basis: ['heart'],
    };
  }
  /*
   * No heart to wrap. Rather than dropping a sphere in at a guessed spot, take
   * the mediastinum -- which IS derived from bone -- and occupy the lower part
   * of it, shifted left the way a real heart is. The sac is then guaranteed to
   * sit inside its parent cavity, which is the relationship that matters most
   * for teaching, and the caption says it is not measured from the heart.
   */
  const med = buildMediastinum(ctx, M);
  if (!med || !med.stack) return null;
  const st = med.stack;
  const lo = Math.floor(st.bands * 0.10), hi = Math.floor(st.bands * 0.62);
  const bands = Math.max(3, hi - lo);
  const shift = (Math.max(...st.r[lo]) || 0.02) * 0.30;
  const sub = {
    sectors: st.sectors, bands,
    ys: st.ys.slice(lo, lo + bands),
    cx: st.cx.slice(lo, lo + bands).map((v) => v + shift),
    cz: st.cz.slice(lo, lo + bands),
    r: st.r.slice(lo, lo + bands).map((row, i) => {
      /* taper towards the apex so it reads as a heart-shaped sac, not a drum */
      const t = i / Math.max(1, bands - 1);
      const k = 0.86 - 0.26 * t * t;
      return row.map((v) => v * k);
    }),
  };
  const centre = [shift, (sub.ys[0] + sub.ys[bands - 1]) / 2, sub.cz[Math.floor(bands / 2)]];
  return {
    parts: [stackMesh(sub, { capRings: 4 })],
    centroid: centre,
    exact: false,
    basis: ['thorax.sternum', 'spine.thoracic'],
    note: 'circulatory layer not loaded — sac occupies the lower mediastinum, not measured from the heart',
  };
}

/* the wall of the belly: bone above and below, muscle in between if we have it */
function abdomenWall(ctx) {
  return pos(ctx.meshesFor('thorax.ribsLower'))
    .concat(pos(ctx.meshesFor('thorax.costalCartilage')),
      pos(ctx.meshesFor('spine.lumbar')),
      pos(ctx.meshesFor('pelvis.hipBone')),
      pos(ctx.meshesFor('wall.abdominal')));
}

/*
 * ABDOMINAL -- roofed by the same diaphragm surface the thorax is floored by,
 * so the two meet exactly; floored by the pelvic inlet, which the pelvic
 * cavity uses as its roof for the same reason.
 *
 * The lateral wall is the honest part. Between the costal margin and the iliac
 * crest there is no bone at all. With the muscle layer loaded that gap is
 * measured from the abdominal wall; without it the radius interpolates between
 * the two bony rings above and below, which is a reasoned shape rather than an
 * invented one.
 */
function buildAbdominal(ctx, M) {
  const wall = abdomenWall(ctx);
  if (!wall.length || !M.pelvicInlet) return null;
  const b = boundsOf(wall);
  const hasMuscle = ctx.meshesFor('wall.abdominal').length > 0;
  const top = M.diaphragmBox ? M.diaphragmBox.maxY : b.maxY;
  const bottom = M.promontory ? Math.min(M.symphysis[1], M.promontory[1]) : b.minY;
  const stack = ringStack(wall, {
    y0: bottom, y1: top,
    bands: 24, sectors: 48, percentile: hasMuscle ? 0.55 : 0.12,
    inset: hasMuscle ? (b.maxX - b.minX) * 0.02 : 0,
    smoothA: 2, smoothV: 2, axisSmooth: 3, capUncovered: 1.12,
  });
  const mesh = stackMesh(stack, { roof: M.diaphragmAt, floor: M.pelvicInlet, capRings: 5 });
  return {
    parts: [mesh],
    centroid: [0, (bottom + top) / 2, stack.cz[Math.floor(stack.bands / 2)]],
    exact: true,
    basis: ['thorax.ribsLower', 'spine.lumbar', 'pelvis.hipBone'],
    note: hasMuscle ? 'lateral wall measured from the abdominal muscles'
      : 'lateral wall interpolated between the costal margin and the iliac crest',
  };
}

/*
 * PELVIC -- inside the true pelvis, entered through the tilted brim.
 * The roof is the pelvic inlet plane, so nothing spills up into the false
 * pelvis, which belongs to the abdominal cavity.
 */
function buildPelvic(ctx, M) {
  const ring = pos(ctx.meshesFor('pelvis.ring'));
  if (!ring.length || !M.pelvicInlet) return null;
  const b = boundsOf(ring);
  const stack = ringStack(ring, {
    y0: b.minY + (b.maxY - b.minY) * 0.02,
    y1: M.promontory ? M.promontory[1] : b.maxY,
    bands: 18, sectors: 44, percentile: 0.10,
    inset: (b.maxX - b.minX) * 0.012,
    smoothA: 2, smoothV: 1, capUncovered: 1.15,
  });
  const mesh = stackMesh(stack, { roof: M.pelvicInlet, capRings: 4 });
  const mid = Math.floor(stack.bands / 2);
  return {
    parts: [mesh],
    centroid: [0, (stack.ys[0] + stack.ys[stack.bands - 1]) / 2, stack.cz[mid]],
    exact: true,
    basis: ['pelvis.ring'],
  };
}

/* ------------------------------------------------------------------ *
 * the surface grid: nine regions and four quadrants
 * ------------------------------------------------------------------ */

/*
 * The nine regions and the four quadrants are TOPOGRAPHIC divisions: lines a
 * clinician draws on a patient's skin, defined by named reference planes and by
 * nothing else. The anatomy underneath is what the lines are used to talk
 * ABOUT -- it is never allowed to bend one. The liver crosses three regions;
 * that does not make the epigastric boundary liver-shaped.
 *
 * So each boundary here is one measurement of one landmark, and every one of
 * them comes out as a CONSTANT -- a flat plane, not a curve:
 *
 *   median          the true midline of this body, from the axial skeleton
 *   midclavicular   dropped from the midpoint of each clavicle
 *   subcostal       the inferior border of the tenth costal cartilage (~L3)
 *   transtubercular the tubercles of the iliac crest (~L5)
 *   transumbilical  the L3/L4 junction, the skeletal level of the umbilicus
 *
 * plus the two levels at which the drawing simply stops -- the xiphisternal
 * joint above and the top of the pubic symphysis below. Those two are not
 * dividing planes and nothing is defined by them; they are the ends of the
 * lines.
 *
 * The lines are then painted on the front of the torso (see torsoProfile), so
 * they curve with the body in three dimensions while their anatomical levels
 * stay exactly where they were measured.
 */

/** the median-plane distance of the 1st and 99th percentile of a half-cloud */
function spanOf(values) {
  if (values.length < 8) return null;
  values.sort((a, b) => a - b);
  const at = (q) => values[Math.min(values.length - 1, Math.round(q * (values.length - 1)))];
  return [at(0.01), at(0.99)];
}

export function measureGrid(ctx, M) {
  const G = {};
  const grab = (k) => pos(ctx.meshesFor(k));

  /*
   * The median plane. Measured, not assumed to be x = 0: it is the plane the
   * quadrants are actually divided by, so it is taken from the structures that
   * define the midline -- the vertebral column and the sternum.
   */
  const axial = grab('spine.lumbar').concat(grab('spine.thoracic'), grab('thorax.sternum'));
  if (axial.length) { const b = boundsOf(axial); G.medianX = (b.minX + b.maxX) / 2; }
  else G.medianX = 0;

  /*
   * The two midclavicular lines: vertical, parallel, one per side, each dropped
   * from the midpoint of its own clavicle -- halfway between the sternal and
   * the acromial end, which is what the line is named for. Taken per side and
   * then averaged, so the pair is symmetric about the median plane and cannot
   * converge on anything lower down.
   */
  const clav = grab('thorax.clavicle');
  if (clav.length) {
    const side = [[], []];                 /* 0 = patient's right (-x), 1 = left */
    for (const p of clav) {
      for (let i = 0; i < p.length; i += 3) {
        const d = p[i] - G.medianX;
        side[d < 0 ? 0 : 1].push(Math.abs(d));
      }
    }
    const mids = side.map(spanOf).filter(Boolean).map(([sternal, acromial]) => (sternal + acromial) / 2);
    if (mids.length) G.midclavicularX = mids.reduce((a, b) => a + b, 0) / mids.length;
  }

  /* the subcostal plane: the inferior border of the tenth costal cartilage */
  const tenth = grab('thorax.cartilageTenth');
  if (tenth.length) G.subcostalY = boundsOf(tenth).minY;

  const l3 = grab('spine.L3'), l4 = grab('spine.L4'), l5 = grab('spine.L5');
  /* the umbilicus is not a mesh in any of these layers; L3/L4 is its level */
  if (l3.length && l4.length) {
    const a = boundsOf(l3), b = boundsOf(l4);
    G.transumbilicalY = (a.minY + b.maxY) / 2;
  }
  if (l3.length && G.subcostalY == null) G.subcostalY = boundsOf(l3).maxY;

  /*
   * The transtubercular plane: through the tubercle of each iliac crest -- the
   * point at which the crest bulges furthest laterally, a couple of centimetres
   * behind and below its summit. Asking each hip bone for its own widest point
   * finds it directly, so the plane is measured from the landmark it is named
   * for rather than read off a vertebra. (L5 is the fallback, and on this model
   * the two agree to within a millimetre, which is the check that it is right.)
   */
  const tub = [];
  for (const sign of [-1, 1]) {
    let best = -Infinity, bestY = NaN;
    for (const p of grab('pelvis.hipBone')) {
      for (let i = 0; i < p.length; i += 3) {
        const d = (p[i] - G.medianX) * sign;
        if (d > best) { best = d; bestY = p[i + 1]; }
      }
    }
    if (Number.isFinite(bestY)) tub.push(bestY);
  }
  if (tub.length) G.transtubercularY = tub.reduce((a, b) => a + b, 0) / tub.length;
  else if (l5.length) { const b = boundsOf(l5); G.transtubercularY = (b.minY + b.maxY) / 2; }

  /*
   * Where the drawing stops. Above: the tip of the xiphoid process, the lowest
   * point of the sternum and the one a clinician can put a finger on. Below:
   * the top of the pubic symphysis. Both are levels, not dividing planes --
   * nothing is defined by them, they are simply the ends of the lines. The
   * costal margin is deliberately NOT used: following that arch is what turned
   * the epigastric region into a triangle pointed at the xiphoid.
   */
  const xiph = grab('thorax.xiphoid');
  const hip = grab('pelvis.hipBone');
  const hb = hip.length ? boundsOf(hip) : null;
  if (xiph.length) G.topY = boundsOf(xiph).minY;
  else if (tenth.length) G.topY = boundsOf(tenth).maxY;
  G.bottomY = M.symphysis ? M.symphysis[1] : (hb ? hb.minY + (hb.maxY - hb.minY) * 0.25 : 0);

  /*
   * The torso the grid is painted on. The wall only -- bone, plus the abdominal
   * muscles when that layer is loaded. Organs are deliberately excluded: they
   * are the contents, and letting them into this measurement is how a boundary
   * ends up following the liver.
   *
   * The femur is in the list because the drawing runs down to the pubic
   * symphysis, and at that level the outline of the body is the hip, not the
   * pelvis: the ilium has already fallen away towards the acetabulum while the
   * greater trochanter is still carrying the flank. Leave it out and the
   * silhouette pinches in below the iliac crest, which squeezes the two iliac
   * regions to slivers.
   */
  const wall = grab('wall.abdominal')
    .concat(grab('thorax.ribsLower'), grab('thorax.costalCartilage'), grab('thorax.sternum'),
      grab('pelvis.hipBone'), grab('pelvis.femur'));
  if (wall.length && G.topY != null) {
    const wb = boundsOf(wall);
    const pad = (G.topY - G.bottomY) * 0.06;
    const profile = torsoProfile(wall, {
      bands: 26, smooth: 2, centreX: G.medianX,
      y0: G.bottomY - pad, y1: G.topY + pad,
      /* stand the lines a few millimetres clear of the wall they lie on */
      lift: (wb.maxX - wb.minX) * 0.018,
    });
    if (profile) {
      G.halfWidthAt = profile.halfWidthAt;
      G.surfaceAt = profile.surfaceAt;
      G.halfX = profile.halfWidthAt((G.topY + G.bottomY) / 2);
      G.wallMeasured = ctx.meshesFor('wall.abdominal').length > 0;
      G.wallCoverage = profile.coverage;
    }
  }
  return G;
}

/**
 * The boundaries the renderer draws, for one grid.
 *
 * `verticals` and `horizontals` are the defining lines -- constants, so they
 * are straight and level and the same two verticals run through all three rows.
 * `cols` and `rows` add the outer edges so a single cell can be filled: the
 * outer column edge is a function of height, because it is the body's own
 * silhouette rather than a box drawn round the abdomen.
 */
export function gridBounds(kind, G) {
  const quad = kind === 'quadrant';
  const verticals = quad ? [G.medianX]
    : [G.medianX - G.midclavicularX, G.medianX + G.midclavicularX];
  const horizontals = quad ? [G.transumbilicalY] : [G.subcostalY, G.transtubercularY];
  const left = (y) => G.medianX - G.halfWidthAt(y);
  const right = (y) => G.medianX + G.halfWidthAt(y);
  return {
    verticals,
    horizontals,
    cols: [left, ...verticals, right],
    rows: [G.topY, ...horizontals, G.bottomY],
    top: G.topY,
    bottom: G.bottomY,
  };
}

const BUILDERS = {
  'cav-cranial': buildCranial,
  'cav-vertebral': buildVertebral,
  'cav-thoracic': buildThoracic,
  'cav-pleural': buildPleural,
  'cav-mediastinum': buildMediastinum,
  'cav-pericardial': buildPericardial,
  'cav-abdominal': buildAbdominal,
  'cav-pelvic': buildPelvic,
};

/**
 * Build one cavity. `combine` cavities (abdominopelvic, dorsal, ventral) are
 * not built here -- they are unions of others, and the caller renders their
 * members so the shared boundaries are the same geometry, not two copies of it
 * that can drift apart.
 */
export function buildCavityGeometry(id, ctx, measured) {
  const fn = BUILDERS[id];
  if (!fn) return null;
  const M = measured || measureLandmarks(ctx);
  try {
    return fn(ctx, M);
  } catch (e) {
    if (typeof console !== 'undefined') console.warn('[cavity] build failed for', id, e);
    return null;
  }
}

export const BUILDABLE = Object.keys(BUILDERS);
