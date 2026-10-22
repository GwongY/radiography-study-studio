"""
Cell zoom, step 2 of work/build-cell-models.mjs: build each level's model in Blender.

  blender --background --factory-startup --python work/blender/build.py -- [--level cell,blood] [--build <dir>]
      [--shots 0.5,1.5 --shot-dir <dir>]   (renders each level built at those slider values, to check it by eye)

Reads work/.cell-build/prep/ (the downloads, already renamed to parts and put in the level's frame, and layout.json)
and writes work/.cell-build/blender/<level>.glb; `node work/build-cell-models.mjs finish` checks and ships them. A
level is a download wherever one exists; everything else is modelled here, in the level's own frame (three.js
coordinates, y up: cellkit.T), so the labels, cites and parts are the ones outputs/cell-zoom.js already has.
"""
import sys
import os
import json
import math
import random

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import bpy                                           # noqa: E402
from mathutils import Vector, Quaternion             # noqa: E402
import cellkit as K                                  # noqa: E402
from cellkit import T                                # noqa: E402

argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []


def opt(name, dflt=None):
    return argv[argv.index(name) + 1] if name in argv else dflt


HERE = os.path.dirname(os.path.abspath(__file__))
BUILD = os.path.abspath(opt('--build', os.path.join(HERE, '..', '.cell-build')))
PREP = os.path.join(BUILD, 'prep')
OUT = os.path.join(BUILD, 'blender')
LAYOUT = json.load(open(os.path.join(PREP, 'layout.json'))) if os.path.exists(os.path.join(PREP, 'layout.json')) else {}


def prep(name):
    return K.import_glb(os.path.join(PREP, f'{name}.glb'))


def tag_all(objs, name, shell=False):
    for o in objs:
        K.part(o, name, shell)
    return objs


# ------------------------------------------------------------------ the typical cell ----
def cell():
    """'Animal cell - Downloadable' (Lauri Purhonen), cut across; free ribosomes, smooth ER, peroxisomes, the
    centrosome and microtubules are not in it, so they are modelled here, lying in its cut face."""
    K.reset()
    got = prep('cell')
    for name, objs in got.items():
        tag_all(objs, name, shell=name in ('membrane', 'cytoplasm', 'nucleus'))
    face = got['cytoplasm']
    others = [o for n, objs in got.items() if n not in ('cytoplasm', 'membrane') for o in objs]
    trees = K.bvh(face + others)
    face_set = set(face)
    rnd = random.Random(17)
    xs = [v.co.x for o in got['membrane'] for v in o.data.vertices]
    span = (min(xs), max(xs))
    down = Vector((0, 0, -1))

    def on_face(x, y):
        """a point of the cut face straight below Blender (x, y), or None where an organelle or nothing is"""
        hit = K.cast(trees, Vector((x, y, 20)), down)
        return hit[1] if hit and hit[0] in face_set else None

    def free(pad):
        for _ in range(5000):
            x, y = rnd.uniform(*span), rnd.uniform(*span)
            p = on_face(x, y)
            if p and all(on_face(x + dx, y + dy) for dx, dy in ((pad, 0), (-pad, 0), (0, pad), (0, -pad))):
                return p
        raise RuntimeError('no free spot on the cut face')

    up = Vector((0, 0, 1))
    # free ribosomes: small granules scattered over the face
    gran = [K.ico(0.12, free(0.15) + up * 0.05, level=1) for _ in range(240)]
    K.part(K.join(gran, 'ribosomes'), 'ribosomes').data.materials.append(K.mat('ribosome', 0x24395c, 0.5))
    # smooth ER: branching tubules
    ser = []
    while len(ser) < 7:
        p = free(0.6)
        pts = [p + up * 0.12]
        a = rnd.uniform(0, 2 * math.pi)
        for _ in range(9):
            a += rnd.uniform(-0.6, 0.6)
            q = on_face(p.x + math.cos(a) * 0.5, p.y + math.sin(a) * 0.5)
            if not q:
                break
            p = q
            pts.append(p + up * 0.12)
        if len(pts) >= 5:
            ser.append(K.curve_tube(pts, 0.15, name='ser'))
    o = K.part(K.join(ser, 'ser'), 'ser')
    o.data.materials.clear()
    o.data.materials.append(K.mat('ser', 0x8fd0ea, 0.45))
    # peroxisomes: small round vesicles with a denser core
    per = []
    for _ in range(5):
        at = free(0.5) + up * 0.12
        per.append(K.sphere(0.42, at, seg=(20, 12)))
        per.append(K.sphere(0.2, at + up * 0.18, seg=(12, 8)))
    K.part(K.join(per, 'peroxisomes'), 'peroxisomes').data.materials.append(K.mat('perox', 0x52b788, 0.5))
    # the centrosome round the centrioles, and microtubules radiating from it across the face
    cpts = [o.matrix_world @ v.co for o in got['centrioles'] for v in o.data.vertices]
    cc = sum(cpts, Vector()) / len(cpts)
    cr = max((p - cc).length for p in cpts) * 1.15
    halo = K.sphere(cr, cc, seg=(28, 16), name='centrosome')
    halo.data.materials.append(K.mat('centrosome', 0xffe08a, 0.7, alpha=0.3))
    K.part(halo, 'centrosome', shell=True)
    rods = []
    for i in range(24):
        a = i / 24 * 2 * math.pi + rnd.uniform(0, 0.2)
        d = Vector((math.cos(a), math.sin(a), 0))
        pts = []
        r = cr * 0.8
        while r < 14:
            q = on_face(cc.x + d.x * r, cc.y + d.y * r)
            if not q:
                break
            pts.append(q + up * 0.08)
            r += 0.6
            d = (d + Vector((rnd.uniform(-0.08, 0.08), rnd.uniform(-0.08, 0.08), 0))).normalized()
        if len(pts) >= 4:
            rods.append(K.curve_tube(pts, 0.04, name='mt', res=4))
    o = K.part(K.join(rods, 'microtubules'), 'microtubules')
    o.data.materials.clear()
    o.data.materials.append(K.mat('mt', 0x2a9d8f, 0.4))
    K.export(os.path.join(OUT, 'cell.glb'), {'czLevel': 'cell', 'czSources': ['cell'], 'czView': [0.85, 1.5, 1]})


# ------------------------------------------------------------------ blood ----
def random_turn(rnd):
    """a uniformly random rotation, as a Blender quaternion"""
    u1, u2, u3 = rnd.random(), rnd.random(), rnd.random()
    return Quaternion((math.sqrt(u1) * math.cos(2 * math.pi * u3), math.sqrt(1 - u1) * math.sin(2 * math.pi * u2),
                       math.sqrt(1 - u1) * math.cos(2 * math.pi * u2), math.sqrt(u1) * math.sin(2 * math.pi * u3)))


def blood():
    """Composition of Blood (L2 p5): red cells, two leukocytes and platelets (downloads) in plasma (modelled). Red
    cells far outnumber the rest ("RBCs comprise most of formed elements"); a red cell 2.5 across (7.5 µm), a
    lymphocyte 3.2, a platelet about 1 ("smallest of formed elements"). Every cell is placed where nothing else is: its
    bounding ball clear of every other cell's and inside the plasma, turned at random."""
    K.reset()
    rnd = random.Random(5)
    rbc = prep('rbc')['rbc'][0]
    lym = prep('lymphocyte')
    plt = prep('platelet')['platelets'][0]
    surf = K.join(lym['wbc'], 'wbc')
    surf.data.materials.clear()
    surf.data.materials.append(K.mat('wbc', 0xd9c8f0, 0.5, alpha=0.55))
    nuc = lym['wbcnucleus'][0]
    nuc.data.materials.clear()
    nuc.data.materials.append(K.mat('wbc nucleus', 0x5a189a, 0.5))
    PL = Vector((20.0, 9.0, 12.0))                       # the plasma, three.js x, y, z
    BEVEL = 2.4
    placed = []

    def put(n, r):
        out = []
        for _ in range(20000):
            if len(out) >= n:
                break
            c = Vector(((rnd.random() - 0.5) * PL.x, (rnd.random() - 0.5) * PL.y, (rnd.random() - 0.5) * PL.z))
            if not K.in_rounded_box(c, PL, BEVEL, r + 0.3):
                continue
            if all((c - p).length > r + q + 0.2 for p, q in placed):
                placed.append((c, r))
                out.append(c)
        return out
    wbc_at = put(2, 1.75)
    rbc_at = put(24, 1.3)
    plt_at = put(9, 0.5)
    print(f'blood: {len(rbc_at)} red cells, {len(wbc_at)} leukocytes, {len(plt_at)} platelets')

    def pose(o, c, s):
        o.rotation_mode = 'QUATERNION'
        o.rotation_quaternion = random_turn(rnd)
        o.location = T(tuple(c))
        o.scale = (s, s, s)
        return o
    for i, c in enumerate(rbc_at):
        K.part(pose(rbc if i == 0 else K.dup(rbc), c, 1.25), 'rbc')
    for i, c in enumerate(wbc_at):
        q = random_turn(rnd)
        for src in (surf, nuc):
            o = src if i == 0 else K.dup(src)
            o.rotation_mode = 'QUATERNION'
            o.rotation_quaternion = q
            o.location = T(tuple(c))
            o.scale = (1.6, 1.6, 1.6)
            K.part(o, 'wbc')
    for i, c in enumerate(plt_at):
        K.part(pose(plt if i == 0 else K.dup(plt), c, 0.45), 'platelets')
    K.part(K.rounded_box(tuple(PL), material=K.mat('plasma', 0xf3d98b, 0.8, alpha=0.1), name='plasma', radius=BEVEL), 'plasma', shell=True)
    # labels on things seen from the opening view (+x, +y, +z): the plasma's near top edge, and the nearest cells
    near = lambda c: c.x + c.y + c.z
    K.anchor('plasma', (PL.x / 2 - 3.0, PL.y / 2 - 0.4, PL.z / 2 - 1.0))
    for name, pts, up in (('rbc', rbc_at, 1.3), ('wbc', wbc_at, 1.9), ('platelets', plt_at, 0.6)):
        c = max(pts, key=near)
        K.anchor(name, (c.x, c.y + up, c.z))
    K.export(os.path.join(OUT, 'blood.glb'), {'czLevel': 'blood', 'czSources': ['rbc', 'lymphocyte', 'platelet']})


# ------------------------------------------------------------------ the alveolus ----
def fib(n):
    out = []
    for i in range(n):
        y = 1 - (2 * (i + 0.5)) / n
        r = math.sqrt(1 - y * y)
        t = i * math.pi * (3 - math.sqrt(5))
        out.append((math.cos(t) * r, y, math.sin(t) * r))
    return out


def in_wedge(p):
    return p[0] > 0 and p[2] > 0


def cut_sphere(r, material, name, thick, seg=(64, 32)):
    """a sphere with the wedge facing the default view (+x, +z in three.js) cut away, given a wall"""
    o = K.sphere(r, (0, 0, 0), material, seg=seg, name=name)
    import bmesh
    bm = bmesh.new()
    bm.from_mesh(o.data)
    gone = [f for f in bm.faces if f.calc_center_median().x > 0.02 and f.calc_center_median().y < -0.02]
    bmesh.ops.delete(bm, geom=gone, context='FACES')
    bm.to_mesh(o.data)
    bm.free()
    m = o.modifiers.new('wall', 'SOLIDIFY')
    m.thickness = thick
    m.offset = -1
    return K.apply(o)


def alveolus():
    """The alveolus modelled here (a cut-open sac of type I cells, type II cells set in its wall, surfactant inside,
    a capillary over it); its alveolar macrophage is the 'Macrophage' download (andrewfrueh). Beside it, the respiratory
    membrane enlarged, with gas exchange on the slider (modelled.membrane_inset)."""
    K.reset()
    R = 6
    wall = cut_sphere(R, K.mat('type1', 0xffc8dd, 0.6, alpha=0.6), 'type1', 0.22)
    K.lumpy(wall, 0.12, 2.0, 1)
    K.part(K.apply(wall), 'type1', shell=True)
    surf = cut_sphere(R - 0.24, K.mat('surfactant', 0x90e0ef, 0.3, alpha=0.4), 'surfactant', 0.05)
    K.part(surf, 'surfactant', shell=True)
    K.anchor('type1', (-R * 0.6, R * 0.6, R * 0.3))
    K.anchor('surfactant', (-R * 0.75, -R * 0.2, -0.4))
    t2 = [p for p in fib(14) if not in_wedge(p) and p[1] > -0.6][:4]
    cells = []
    for p in t2:
        at = Vector(p) * (R - 0.15)
        o = K.sphere(0.95, (at.x, at.y, at.z), seg=(24, 14))
        o.scale = (1.0, 1.0, 0.75)
        o.rotation_mode = 'QUATERNION'
        o.rotation_quaternion = Vector((0, 0, 1)).rotation_difference(T(p).normalized())
        K.lumpy(o, 0.1, 0.5, len(cells))
        cells.append(K.apply(o))
    t2o = K.part(K.join(cells, 'type2'), 'type2')
    t2o.data.materials.clear()
    t2o.data.materials.append(K.mat('type2', 0xc9184a, 0.5))
    K.anchor('type2', tuple(Vector(t2[0]) * (R + 0.8)))
    # the alveolar macrophage, lying on the floor of the sac
    got = prep('macrophage')
    for o in got.get('bacteria', []):
        bpy.data.objects.remove(o)
    mac = K.join(got['macrophage'], 'macrophage')
    m = LAYOUT['alveolus']['macrophage'][0]['at']
    at = Vector(m)
    upv = -at.normalized()
    mac.rotation_mode = 'QUATERNION'
    mac.rotation_quaternion = Vector((0, 0, 1)).rotation_difference(T(tuple(upv)).normalized())
    mac.scale = (1.8, 1.8, 1.8)
    mac.location = T(tuple(at + upv * 0.3))
    K.part(mac, 'macrophage')
    K.anchor('macrophage', tuple(at + upv * 1.3))
    # a capillary wrapped over the outside: blood inside an endothelial wall
    pts = []
    for i in range(41):
        a = -0.3 + i / 40 * 4.4
        pts.append((-math.sin(a) * (R + 1.0), 2.8 * math.sin(a * 1.3) - 1, -math.cos(a) * (R + 1.0)))
    cap = K.part(K.curve_tube(pts, 0.55, K.mat('capillary', 0xd00000, 0.45), 'capillary', res=8), 'capillary')
    endo = K.part(K.curve_tube(pts, 0.85, K.mat('endothelial', 0xff99ac, 0.6, alpha=0.45), 'endothelial', res=8), 'endothelial', shell=True)
    K.anchor('endothelial', (pts[12][0], pts[12][1] + 0.9, pts[12][2]))
    K.anchor('capillary', pts[27])
    del cap, endo
    # the respiratory membrane, enlarged on the right, with the gas-exchange slider
    at = M.membrane_inset(15.5, zoom_from=Vector(pts[6]))
    for name in ('basement', 'membrane', 'alveolus', 'rbc'):
        K.anchor(name, at[name])
    K.export(os.path.join(OUT, 'alveolus.glb'), {'czLevel': 'alveolus', 'czSources': ['macrophage'], 'czView': [0.4, 0.35, 1]})


# ------------------------------------------------------------------ the neuron ----
def neuron():
    """'Neuron' (Versal), split into its parts: cell body (see-through), dendrites, axon hillock, axon, myelin, Schwann
    cells' nuclei, axon terminals. The nucleus, nucleolus, Nissl bodies, neurofibrils and the nodes of Ranvier are
    modelled here. Soma at the origin, radius about 2.2; the axon runs along +x."""
    K.reset()
    got = prep('neuron')
    look = {'body': K.mat('body', 0xffafcc, 0.6, alpha=0.42), 'dendrites': K.mat('dendrites', 0xff8fab, 0.55),
            'hillock': K.mat('hillock', 0xff70a6, 0.5), 'axon': K.mat('axon', 0xf72585, 0.5),
            'terminals': K.mat('terminals', 0xb5179e, 0.5), 'myelin': K.mat('myelin', 0xf1faee, 0.45),
            'schwann': K.mat('schwann', 0x48cae4, 0.5)}
    for name, objs in got.items():
        for o in objs:
            K.recolour(o, look[name])
    body = K.part(K.join(got['body'], 'body'), 'body', shell=True)
    for name in ('dendrites', 'hillock', 'axon', 'terminals'):
        K.part(K.join(got[name], name), name)
    axon = bpy.data.objects['cz-axon']
    pieces = K.separate(K.join(got['myelin'], 'myelin'))
    segs = sorted([o for o in pieces if (K.bounds(o)[1] - K.bounds(o)[0]).length > 0.6], key=lambda o: K.bounds(o)[0].x)
    for o in pieces:
        if o not in segs:
            bpy.data.objects.remove(o)
    # nodes of Ranvier: a ring round the axon in each gap between two segments
    apts = [axon.matrix_world @ v.co for v in axon.data.vertices]
    rings = []
    for a, b in zip(segs, segs[1:]):
        x0, x1 = K.bounds(a)[1].x, K.bounds(b)[0].x
        xm = (x0 + x1) / 2
        near = [p for p in apts if abs(p.x - xm) < max(0.25, (x1 - x0))] or apts
        c = sum(near, Vector()) / len(near)
        r = max(0.12, max((Vector((0, p.y, p.z)) - Vector((0, c.y, c.z))).length for p in near))
        ahead = [p for p in apts if xm + 0.3 < p.x < xm + 0.9] or near
        behind = [p for p in apts if xm - 0.9 < p.x < xm - 0.3] or near
        d = (sum(ahead, Vector()) / len(ahead) - sum(behind, Vector()) / len(behind)).normalized()
        bpy.ops.mesh.primitive_torus_add(major_radius=r * 1.35, minor_radius=r * 0.35, major_segments=24, minor_segments=8, location=c)
        t = bpy.context.object
        t.rotation_mode = 'QUATERNION'
        t.rotation_quaternion = Vector((0, 0, 1)).rotation_difference(d)
        rings.append(K.smooth(t))
    K.part(K.recolour(K.join(rings, 'node'), K.mat('node', 0xffd60a, 0.4)), 'node')
    myelin = K.part(K.join(segs, 'myelin'), 'myelin')
    # the Schwann cells' nuclei sit on the sheath, not buried in it
    mb = K.bvh([myelin])
    nuc = []
    for o in K.separate(K.join(got['schwann'], 'schwann')):
        lo, hi = K.bounds(o)
        c = (lo + hi) / 2
        out = Vector((0, c.y, c.z))
        out = out.normalized() if out.length > 1e-3 else Vector((0, 0, 1))
        hit = K.cast(mb, c + out * 5, -out)
        surf = hit[1] if hit else c + out * 0.6
        o.location += surf + out * 0.12 - c
        nuc.append(o)
    K.part(K.join(nuc, 'schwann'), 'schwann')
    # inside the cell body
    rnd = random.Random(81)
    inside = K.inside_test([body])
    nucleus = K.part(K.recolour(K.lumpy(K.sphere(0.95, (-0.35, 0.25, 0), seg=(40, 24)), 0.05, 0.4), K.mat('nucleus', 0x9d7cd8, 0.5, alpha=0.55)), 'nucleus')
    nucleus = K.part(K.apply(nucleus), 'nucleus')
    K.part(K.recolour(K.sphere(0.36, (-0.15, 0.4, 0.45), seg=(20, 12)), K.mat('nucleolus', 0x3c096c, 0.45)), 'nucleolus')
    gran = []
    while len(gran) < 34:
        p = Vector((rnd.uniform(-2.4, 2.4), rnd.uniform(-2.4, 2.4), rnd.uniform(-2.4, 2.4)))
        q = T(p.x, p.y, p.z)
        if 1.35 < (p - Vector((-0.35, 0.25, 0))).length < 2.3 and inside(q):
            g = K.sphere(0.26, q, seg=(12, 8))
            g.scale = (1.0, 0.55, 0.32)
            g.rotation_euler = (rnd.uniform(0, 3), rnd.uniform(0, 3), rnd.uniform(0, 3))
            gran.append(K.apply(g))
    K.part(K.recolour(K.join(gran, 'nissl'), K.mat('nissl', 0x3a0ca3, 0.5)), 'nissl')
    fib = []
    for k in range(7):
        a = k * 0.9
        pts = [(-1.9, math.sin(a) * 1.2, math.cos(a) * 1.0), (-0.6, math.sin(a + 1) * 1.5, math.cos(a + 1) * 0.9),
               (1.2, math.sin(a) * 0.7, math.cos(a) * 0.5), (2.6, math.sin(a) * 0.2, math.cos(a) * 0.2), (4.0, math.sin(a) * 0.06, math.cos(a) * 0.06)]
        fib.append(K.curve_tube(pts, 0.03, name='nf', res=8))
    K.part(K.recolour(K.join(fib, 'neurofibrils'), K.mat('neurofibrils', 0x7209b7, 0.4)), 'neurofibrils')
    K.export(os.path.join(OUT, 'neuron.glb'), {'czLevel': 'neuron', 'czSources': ['neuron'], 'czView': [0.2, 0.3, 1]})


# ------------------------------------------------------------------ the spermatozoon ----
def centreline(o, x0, x1, step):
    """the middle of an object's cross-sections along x, from x0 to x1 (Blender x is three.js x)"""
    pts = [o.matrix_world @ v.co for v in o.data.vertices]
    out = []
    x = x0
    while x <= x1:
        near = [p for p in pts if abs(p.x - x) < step * 0.6]
        if near:
            out.append(sum(near, Vector()) / len(near))
        x += step
    return out


def radius_at(o, x, width=0.15):
    pts = [o.matrix_world @ v.co for v in o.data.vertices if abs((o.matrix_world @ v.co).x - x) < width]
    if not pts:
        return 0.2
    c = sum(pts, Vector()) / len(pts)
    return max((Vector((0, p.y - c.y, p.z - c.z))).length for p in pts)


def sperm():
    """'CC0 - Sperm' (plaggy) in the slide's proportions (head 5, neck 1, middle piece 5, tail 55; 0.4 a unit), split
    into head, neck, middle piece and tail. The nucleus, acrosome, centrioles, mitochondrial spiral and fibrous sheath
    are modelled here, inside or round it."""
    K.reset()
    got = prep('sperm')
    U = 0.4
    look = {'head': K.mat('head', 0xcdb4db, 0.5, alpha=0.45), 'neck': K.mat('neck', 0xa2d2ff, 0.5, alpha=0.55),
            'middle': K.mat('middle', 0xbde0fe, 0.5, alpha=0.5), 'tail': K.mat('tail', 0x8ecae6, 0.5)}
    for name, objs in got.items():
        o = K.join(objs, name)
        K.part(K.recolour(o, look[name]), name, shell=name in ('head', 'middle'))
    tail = bpy.data.objects['cz-tail']
    middle = bpy.data.objects['cz-middle']
    HEAD, NECK, MID = 5 * U, 1 * U, 5 * U
    nuc = K.sphere(1, (HEAD * 0.58, 0, 0), seg=(32, 20))
    nuc.scale = (HEAD * 0.4, 0.5, 0.5)
    K.part(K.recolour(K.apply(nuc), K.mat('nucleus', 0x5a189a, 0.45)), 'nucleus')
    import bmesh
    cap = K.sphere(1, (HEAD * 0.5, 0, 0), seg=(40, 24))
    cap.scale = (HEAD * 0.5, 0.64, 0.64)
    bm = bmesh.new()
    bm.from_mesh(cap.data)
    bmesh.ops.delete(bm, geom=[fc for fc in bm.faces if fc.calc_center_median().x > -0.15], context='FACES')
    bm.to_mesh(cap.data)
    bm.free()
    m = cap.modifiers.new('wall', 'SOLIDIFY')
    m.thickness = 0.06
    K.part(K.recolour(K.apply(cap), K.mat('acrosome', 0xff70a6, 0.45, alpha=0.9)), 'acrosome')
    c1 = K.between((HEAD + 0.1, -0.16, 0), (HEAD + 0.1, 0.16, 0), 0.07)
    c2 = K.between((HEAD + 0.28, 0, -0.16), (HEAD + 0.28, 0, 0.16), 0.07)
    K.part(K.recolour(K.join([c1, c2], 'centrioles'), K.mat('centrioles', 0xffb703, 0.45)), 'centrioles')
    # the mitochondrial spiral: a helix round the middle piece's own line
    x0, x1 = HEAD + NECK, HEAD + NECK + MID
    line = centreline(middle, x0, x1, 0.1)
    rad = radius_at(middle, (x0 + x1) / 2) * 0.82
    helix = []
    for i in range(241):
        t = i / 240
        x = x0 + t * (x1 - x0)
        c = min(line, key=lambda p: abs(p.x - x))
        a = t * 16 * math.pi
        helix.append(Vector((x, c.y + rad * math.cos(a), c.z + rad * math.sin(a))))
    K.part(K.curve_tube(helix, 0.07, K.mat('spiral', 0xe4774a, 0.45), 'spiral', caps=True, res=2), 'spiral')
    # the fibrous sheath round the first 70% of the tail
    t0 = x1 + 0.05
    t1 = t0 + 0.7 * 55 * U
    raw = centreline(tail, t0, t1, 0.3)
    tl = [sum(raw[max(0, i - 3):i + 4], Vector()) / len(raw[max(0, i - 3):i + 4]) for i in range(0, len(raw), 3)]
    rt = max(0.08, radius_at(tail, t0 + 2.0, 0.3))
    K.part(K.curve_tube(tl, rt * 1.45, K.mat('sheath', 0x219ebc, 0.5, alpha=0.55), 'sheath', res=4), 'sheath')
    K.export(os.path.join(OUT, 'sperm.glb'), {'czLevel': 'sperm', 'czSources': ['sperm'], 'czView': [0.2, 0.3, 1]})


# ------------------------------------------------------------------ the plasma membrane ----
def capsule(r, h, at, name='capsule'):
    """an upright capsule (three.js y), radius r, straight part h, centred at a three.js point"""
    x, y, z = at
    return K.curve_tube([(x, y - h / 2, z), (x, y + h / 2, z)], r, name=name, caps=True, res=2)


def membrane():
    """'Plasma Membrane' (Konstantin_Keller): a window of its bilayer, heads and tails apart, with its channel, integral
    protein and inner enzyme. The carrier, receptor, recognition and anchoring proteins, cholesterol, glycolipids,
    microfilaments and the fluid on each side are modelled here (outputs/cell-zoom.js labels each)."""
    K.reset()
    L = LAYOUT['membrane']
    got = prep('membrane')
    look = {'heads': K.mat('heads', 0xef8354, 0.5), 'tails': K.mat('tails', 0xf4d58d, 0.6), 'channels': K.mat('channels', 0x1982c4, 0.45),
            'integral': K.mat('integral', 0x6a4c93, 0.45), 'enzymes': K.mat('enzymes', 0x00b4d8, 0.45)}
    for name, objs in got.items():
        K.part(K.recolour(K.join(objs, name), look[name]), name)
    lo, hi = K.bounds(bpy.data.objects['cz-heads'])
    top, bot = hi.z, lo.z                          # Blender z is the level's y
    W, D = 16, 10
    rnd = random.Random(51)

    def lumpy_capsule(r, h, at, colour, name, seed):
        o = capsule(r, h, at, name)
        K.lumpy(o, 0.12, 0.5, seed)
        return K.recolour(K.apply(o), K.mat(name, colour, 0.45))

    A = L['added']
    span = top - bot
    mid = (top + bot) / 2
    cx, cz = A['carrier']
    a = lumpy_capsule(0.6, span * 0.8, (cx - 0.38, mid, cz), 0x8ac926, 'carrier', 1)
    b = lumpy_capsule(0.6, span * 0.8, (cx + 0.38, mid, cz), 0x8ac926, 'carrier', 2)
    K.part(K.join([a, b], 'carrier'), 'carrier')
    rx, rz = A['receptor']
    rec = [lumpy_capsule(0.85, span * 0.75, (rx, mid + 0.2, rz), 0xff595e, 'receptor', 3)]
    for dx in (-0.35, 0.35):
        rec.append(K.recolour(K.between((rx + dx, top + 0.3, rz), (rx + dx * 2.4, top + 1.3, rz), 0.17), K.mat('receptor', 0xff595e, 0.45)))
    K.part(K.join(rec, 'receptor'), 'receptor')
    gx, gz = A['recognition']
    recog = [lumpy_capsule(0.8, span * 0.7, (gx, mid + 0.2, gz), 0xffca3a, 'recognition', 4)]
    sugar = K.mat('sugar', 0x52b788, 0.5)
    for i in range(5):
        recog.append(K.recolour(K.ico(0.17, (gx + 0.14 * (i % 2) - 0.07, top + 0.45 + 0.34 * i, gz), level=2), sugar))
    K.part(K.join(recog, 'recognition'), 'recognition')
    nx, nz = A['anchoring']
    anch = K.part(lumpy_capsule(0.8, span * 0.35, (nx, bot + span * 0.12, nz), 0xf15bb5, 'anchoring', 5), 'anchoring')
    del anch
    # microfilaments under the membrane, held by the anchoring protein
    fil = []
    for k in range(4):
        pts = [(x, bot - 0.9 - 0.22 * k + 0.12 * math.sin(x * 1.3 + k), nz + (k - 1.5) * 0.35) for x in [-W / 2 + 0.4 + 0.8 * i for i in range(20)]]
        fil.append(K.curve_tube(pts, 0.09, name='mf', res=4))
    K.part(K.recolour(K.join(fil, 'microfilaments'), K.mat('microfilaments', 0x9d0208, 0.45)), 'microfilaments')
    # cholesterol: a stiff ring-and-tail among the tails, where a lipid was left out
    chol = []
    for x, y, z, side in L['cholesterol']:
        c = K.between((x, y + side * 0.55, z), (x, y - side * 0.45, z), 0.12, seg=8)
        chol.append(c)
        chol.append(K.ico(0.13, (x, y + side * 0.7, z), level=1))
    K.part(K.recolour(K.join(chol, 'cholesterol'), K.mat('cholesterol', 0xffe066, 0.4)), 'cholesterol')
    gly = []
    for x, y, z in L['glycolipids']:
        for i in range(3):
            gly.append(K.ico(0.15, (x + 0.08 * (i % 2), y + 0.25 + 0.3 * i, z), level=1))
    K.part(K.recolour(K.join(gly, 'glycolipids'), sugar), 'glycolipids')
    # the fluid either side, and the bilayer as a whole
    K.part(K.box((W, 4.5, D), (0, top + 2.5, 0), K.mat('ecf', 0x90e0ef, 0.8, alpha=0.1), 'ecf'), 'ecf', shell=True)
    K.part(K.box((W, 4.5, D), (0, bot - 2.5, 0), K.mat('cytoplasm', 0xffd6a5, 0.8, alpha=0.1), 'cytoplasm'), 'cytoplasm', shell=True)
    K.part(K.box((W, span + 0.4, D), (0, mid, 0), K.mat('bilayer', 0xf6bd60, 0.8, alpha=0.07), 'bilayer'), 'bilayer', shell=True)
    K.anchor('ecf', (-7, top + 3.8, 4))
    K.anchor('cytoplasm', (-7, bot - 3.8, 4))
    K.anchor('bilayer', (W / 2, mid, D / 2))
    del rnd
    K.export(os.path.join(OUT, 'membrane.glb'), {'czLevel': 'membrane', 'czSources': ['membrane'], 'czView': [0.35, 0.55, 1]})


# ------------------------------------------------------------------ characteristics of epithelia ----
def cisterna(w, at):
    """one flattened, curved sac of a Golgi stack, w across, its rim at Blender point at"""
    import bmesh
    R = w / math.sin(0.7)
    o = K.sphere(R, (0, 0, 0), seg=(20, 16))
    bm = bmesh.new()
    bm.from_mesh(o.data)
    bmesh.ops.delete(bm, geom=[f for f in bm.faces if f.calc_center_median().z > -R * math.cos(0.7)], context='FACES')
    bm.to_mesh(o.data)
    bm.free()
    o.location = at + Vector((0, 0, R * math.cos(0.7)))
    o.scale = (1, 0.6, 1)
    m = o.modifiers.new('wall', 'SOLIDIFY')
    m.thickness = 0.07
    return K.apply(o)


def epithelium():
    """'Epithelium of the Trachea' (Sieben Medical Art): its cells, their crowns of cilia or microvilli and the basement
    membrane, the cells made see-through. In each cell that reaches the surface a nucleus and a junction belt (where it
    meets its neighbours below the apical surface) are modelled here, and in the front ones a Golgi apparatus and
    mitochondria."""
    K.reset()
    got = prep('epithelium')
    look = {'cilia': K.mat('cilia', 0x06d6a0, 0.5), 'microvilli': K.mat('microvilli', 0xff5d8f, 0.5),
            'apical': K.mat('apical', 0xff8fab, 0.55, alpha=0.6), 'basolateral': K.mat('basolateral', 0xffc8dd, 0.6, alpha=0.3),
            'basement': K.mat('basement', 0x8d99ae, 0.7)}
    for name, objs in got.items():
        K.part(K.recolour(K.join(objs, name), look[name]), name, shell=name in ('apical', 'basolateral'))
    body = bpy.data.objects['cz-basolateral']
    top = K.bounds(bpy.data.objects['cz-apical'])[0].z      # the lowest apical point: where the surface begins
    # each cell's own piece of the basolateral surface, to find the cells
    tmp = body.copy()
    tmp.data = body.data.copy()
    bpy.context.collection.objects.link(tmp)
    pieces = K.separate(tmp)
    rnd = random.Random(71)
    nuc, golgi, mito, belts = [], [], [], []
    cells = []
    for p in pieces:
        lo, hi = K.bounds(p)
        if hi.z - lo.z >= 3 and hi.z >= top - 0.6 and min(hi.x - lo.x, hi.y - lo.y) >= 0.5:
            cells.append((p, lo, hi))                        # not a fragment, nor a basal cell short of the surface
    # the Golgi and mitochondria only in the cells nearest the viewer (three.js +z is Blender -y), to keep it light
    front = {c[0].name for c in sorted(cells, key=lambda c: c[1].y)[:16]}
    for p, lo, hi in cells:
        h = hi.z - lo.z
        w = min(hi.x - lo.x, hi.y - lo.y)
        inside = K.inside_test([p])
        cx, cy = (lo.x + hi.x) / 2, (lo.y + hi.y) / 2
        nz = lo.z + h * 0.32
        r = min(w * 0.32, 0.55)
        if not inside(Vector((cx, cy, nz))):
            continue
        n = K.sphere(1, (0, 0, 0), seg=(12, 8))
        n.location = Vector((cx, cy, nz))
        n.scale = (r, r, r * 1.5)
        nuc.append(n)
        # the junction belt: a flattened ring hugging the cell just under its apical surface
        jz = hi.z - 0.3
        sec = [q for q in (p.matrix_world @ v.co for v in p.data.vertices) if abs(q.z - jz) < 0.25]
        if len(sec) >= 6:
            sx = (max(q.x for q in sec) - min(q.x for q in sec)) / 2
            sy = (max(q.y for q in sec) - min(q.y for q in sec)) / 2
            ring = K.torus(1, 0.045 / max(sx, sy), (0, 0, 0), axis=(0, 1, 0), seg=(16, 4))
            ring.location = Vector(((max(q.x for q in sec) + min(q.x for q in sec)) / 2, (max(q.y for q in sec) + min(q.y for q in sec)) / 2, jz))
            ring.scale = (sx * 0.97, sy * 0.97, max(sx, sy))
            belts.append(ring)
        if p.name not in front:
            continue
        gz = nz + r * 1.5 + 0.35
        # a stack of flattened, curved cisternae, the stack bowed like the slide's
        for k in range(3):
            golgi.append(cisterna(r * (1.0 - 0.18 * k), Vector((cx, cy, gz + 0.17 * k))))
        for _ in range(12):
            if len([m for m in mito if m.get('cell') == p.name]) >= 3:
                break
            at = Vector((cx + rnd.uniform(-w, w) * 0.3, cy + rnd.uniform(-w, w) * 0.3, rnd.uniform(nz + r, hi.z - 0.5)))
            if not inside(at) or abs(at.z - gz) < 0.3:
                continue
            m = K.sphere(1, at, seg=(10, 6))
            m.scale = (0.13, 0.13, 0.32)
            m.rotation_euler = (rnd.uniform(0, 3), rnd.uniform(0, 3), 0)
            m['cell'] = p.name
            mito.append(m)
    for p in pieces:
        bpy.data.objects.remove(p)
    for m in mito:
        del m['cell']
    K.part(K.recolour(K.join(nuc, 'nucleus'), K.mat('nucleus', 0x7b2cbf, 0.45)), 'nucleus')
    K.part(K.recolour(K.join(golgi, 'golgi'), K.mat('golgi', 0xf2c14e, 0.45)), 'golgi')
    K.part(K.recolour(K.join(mito, 'mito'), K.mat('mito', 0xe4774a, 0.45)), 'mito')
    K.part(K.recolour(K.join(belts, 'junctions'), K.mat('junctions', 0x3a0ca3, 0.45)), 'junctions')
    print(f'epithelium: {len(nuc)} cells, {len(front)} with Golgi and mitochondria')
    K.export(os.path.join(OUT, 'epithelium.glb'), {'czLevel': 'epithelium', 'czSources': ['trachea'], 'czView': [0.45, 0.35, 1]})


import modelled as M                                 # noqa: E402

M.PREP, M.OUT = prep, OUT
M.JSON = lambda name: json.load(open(os.path.join(PREP, f'{name}.json')))

LEVELS = {'cell': cell, 'centrosome': M.centrosome, 'blood': blood, 'alveolus': alveolus, 'neuron': neuron, 'sperm': sperm, 'membrane': membrane,
          'epithelium': epithelium, 'nucleus': M.nucleus, 'dna': M.dna, 'nucleosome': M.nucleosome, 'cycle': M.cycle, 'meiosis': M.meiosis, 'nk': M.nk, 'apc': M.apc, 'parietal': M.parietal, 'expression': M.expression,
          'redcell': M.rbc_level, 'hemoglobin': M.hemoglobin, 'plasma': M.plasma, 'pct': M.pct,
          'pacemaker': M.pacemaker, 'myocardial': M.myocardial, 'rmp': M.rmp, 'testis': M.testis, 'follicle': M.follicle, 'oogenesis': M.oogenesis,
          'vessels': M.vessels, 'capillaries': M.capillaries, 'gutwall': M.gutwall,
          'capbed': M.capbed, 'stomach': M.stomach, 'glomerulus': M.glomerulus, 'duct': M.duct, 'heartwall': M.heartwall, 'osteon': M.osteon}

def shots(name, seconds, folder):
    """check a level by eye: render the scene just built at the given slider values (workbench, from the level's
    opening view) to <folder>/<level>_<s>.png"""
    sc = bpy.context.scene
    sc.render.engine = 'BLENDER_WORKBENCH'
    sc.display.shading.light = 'STUDIO'
    sc.display.shading.color_type = 'MATERIAL'
    sc.render.resolution_x, sc.render.resolution_y = 1000, 800
    sc.world = bpy.data.worlds.new('w')
    sc.world.color = (0.03, 0.04, 0.05)
    sc.display.shading.show_backface_culling = False
    for m in bpy.data.materials:                         # workbench shows the viewport colour: give it the real one
        b = m.node_tree.nodes.get('Principled BSDF') if m.node_tree else None
        if b:
            m.diffuse_color = (*b.inputs['Base Color'].default_value[:3], b.inputs['Alpha'].default_value)
    bpy.context.view_layer.update()
    lo, hi = Vector((1e9,) * 3), Vector((-1e9,) * 3)
    for o in sc.objects:
        if o.type == 'MESH' and min(o.matrix_world.to_scale()) > 0.02:
            for c in o.bound_box:
                w = o.matrix_world @ Vector(c)
                lo, hi = Vector(map(min, lo, w)), Vector(map(max, hi, w))
    view = sc.get('czView') or [1, 0.6, 1]
    d = Vector((view[0], -view[2], view[1])).normalized()
    cam = bpy.data.objects.new('cam', bpy.data.cameras.new('cam'))
    sc.collection.objects.link(cam)
    sc.camera = cam
    cam.location = (lo + hi) / 2 + d * (hi - lo).length * 1.05
    cam.rotation_mode = 'QUATERNION'
    cam.rotation_quaternion = (-d).to_track_quat('-Z', 'Y')
    cam.data.clip_end = 1000
    for x in seconds:
        sc.frame_set(int(round(x * K.FPS)))
        sc.render.filepath = os.path.join(folder, f'{name}_{x:.2f}.png')
        bpy.ops.render.render(write_still=True)


if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    want = opt('--level', ','.join(LEVELS)).split(',')
    for name in want:
        print(f'— {name}')
        LEVELS[name]()
        print(f'wrote blender/{name}.glb')
        if opt('--shots'):
            shots(name, [float(x) for x in opt('--shots').split(',')], opt('--shot-dir', OUT))
