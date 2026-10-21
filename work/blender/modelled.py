"""
Cell zoom levels with no download to wear: modelled here whole, in the level's own frame (three.js coordinates, y up:
cellkit.T). build.py runs them like the others. Where a level has a stage slider, its choreography is the drawn
level's (outputs/cell/zoom-scene.js, outputs/cell/lecture-cells.js), stage k running from second k: place(s) poses
every moving object for a slider value s, and Track samples it into linear keyframes. A part is on show while its
scale is above 2% (outputs/cell/models.js), so "hidden" is a scale of 0.001.

Downloads used here too: "Chromosome X" (LucasPresoto) is the visible chromosome of the DNA level and the chromatid
of the cell cycle and meiosis; "Macrophage" (andrewfrueh) is the antigen-presenting cell and its bacteria.
"""
import math
import random

import bpy
import bmesh
from mathutils import Vector, Quaternion, Matrix
import cellkit as K
from cellkit import T

FPS = K.FPS
HIDE = 0.001


# ------------------------------------------------------------------ the drawn levels' arithmetic, in Python ----
def V(x=0.0, y=0.0, z=0.0):
    return Vector((x, y, z))


def clamp01(x):
    return max(0.0, min(1.0, x))


def span(f, a, b):
    """smoothstep of f over [a, b], as the drawn levels' span()"""
    k = clamp01((f - a) / (b - a))
    return k * k * (3 - 2 * k)


def mix(a, b, k):
    return a + (b - a) * k


def lerp(a, b, t):
    return a + (b - a) * t


def along(pts, t):
    n = len(pts) - 1
    u = clamp01(t) * n
    i = min(n - 1, int(math.floor(u)))
    return lerp(pts[i], pts[i + 1], u - i)


def stage_prog(s, n):
    """progress through stage i at slider value s (stage k runs from s = k to k + 1)"""
    k = min(n - 1, int(math.floor(s)))
    f = s - k
    return lambda i: 1.0 if k > i else 0.0 if k < i else f


def q_three(axis, angle):
    """a rotation about a three.js axis, as a Blender quaternion"""
    return Quaternion(T(tuple(axis)).normalized(), angle)


def q_euler(x, y, z):
    """three.js Euler XYZ (object.rotation.set(x, y, z)) as a Blender quaternion"""
    return q_three((1, 0, 0), x) @ q_three((0, 1, 0), y) @ q_three((0, 0, 1), z)


# ------------------------------------------------------------------ keyframes from a place(s) function ----
class Track:
    """poses per object per frame, written as linear keyframes (location, rotation, scale)"""

    def __init__(self):
        self.poses = {}

    def pose(self, o, frame, at=None, rot=None, scale=1.0):
        """at: three.js point; rot: Blender quaternion; scale: number or three.js (x, y, z)"""
        self.poses.setdefault(o, []).append((frame, at, rot, scale))

    def hide(self, o, frame):
        self.pose(o, frame, None, None, HIDE)

    def rod(self, o, frame, a, b, r, on=True):
        """a unit rod (cellkit-free: unit_rod()) from three.js a to b, radius r"""
        d = T(tuple(b)) - T(tuple(a))
        if not on or d.length < 1e-5:
            self.pose(o, frame, None, None, HIDE)
            return
        q = Vector((0, 0, 1)).rotation_difference(d.normalized())
        self.poses.setdefault(o, []).append((frame, (a + b) / 2, q, ('blender', (r, r, d.length))))

    def write(self):
        for o, poses in self.poses.items():
            o.rotation_mode = 'QUATERNION'
            prev = None
            last_at, last_q = None, None
            for frame, at, rot, scale in poses:
                if at is not None:
                    last_at = at
                if rot is not None:
                    last_q = rot.copy()
                if last_at is not None:
                    o.location = T(tuple(last_at))
                    o.keyframe_insert('location', frame=frame)
                if last_q is not None:
                    q = last_q.copy()
                    if prev is not None and q.dot(prev) < 0:
                        q.negate()
                    prev = q
                    o.rotation_quaternion = q
                    o.keyframe_insert('rotation_quaternion', frame=frame)
                if isinstance(scale, tuple) and scale and scale[0] == 'blender':
                    o.scale = scale[1]
                elif isinstance(scale, (tuple, list)):
                    o.scale = (scale[0], scale[2], scale[1])
                else:
                    o.scale = (scale, scale, scale)
                o.keyframe_insert('scale', frame=frame)
            for fc in K.fcurves_of(o):
                for kp in fc.keyframe_points:
                    kp.interpolation = 'LINEAR'


def sample(place, seconds, step=2, extra=()):
    """call place(s, frame) every `step` frames over [0, seconds], and at the extra slider values"""
    frames = sorted(set([f for f in range(0, int(round(seconds * FPS)) + 1, step)] + [round(x * FPS, 3) for x in extra]))
    for f in frames:
        place(f / FPS, f)


# ------------------------------------------------------------------ shapes ----
def unit_rod(material=None, name='rod', seg=8):
    """a cylinder of radius 1 and length 1 along Blender z, centred: Track.rod scales it into place"""
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=seg, radius1=1, radius2=1, depth=1)
    o = K.mesh_obj(name, bm, material)
    return K.smooth(o)


def empty(name, at=(0, 0, 0), parent=None):
    e = K.link(bpy.data.objects.new(name, None))
    e.location = T(at)
    if parent is not None:
        e.parent = parent
    return e


def adopt(child, parent):
    """child keeps its world pose, now under parent. The pose is put in the child's own (local) transform, with no
    parent-inverse matrix, so the .glb carries it as is; matrices are brought up to date first (a new object's are
    stale until the view layer updates)."""
    bpy.context.view_layer.update()
    local = parent.matrix_world.inverted() @ child.matrix_world
    child.parent = parent
    child.matrix_parent_inverse = Matrix.Identity(4)
    child.matrix_basis = local
    return child


def lathe(profile, seg, axis='x'):
    """vertices of a lathe of [(w, t)] about the three.js axis (x or y), as Blender points, ring by ring"""
    out = []
    for w, t in profile:
        for j in range(seg):
            a = 2 * math.pi * j / seg
            if axis == 'x':
                p = (t, w * math.cos(a), w * math.sin(a))
            else:
                p = (w * math.cos(a), t, w * math.sin(a))
            out.append(T(p))
    return out


def lathe_mesh(profile, seg, material, name, axis='x'):
    bm = bmesh.new()
    vs = [bm.verts.new(p) for p in lathe(profile, seg, axis)]
    n = len(profile)
    for i in range(n - 1):
        for j in range(seg):
            a, b = i * seg + j, i * seg + (j + 1) % seg
            c, d = (i + 1) * seg + (j + 1) % seg, (i + 1) * seg + j
            bm.faces.new((vs[a], vs[b], vs[c], vs[d]))
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-5)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return K.smooth(K.mesh_obj(name, bm, material))


def peanut_profile(R, d, pinch, n=48):
    """the drawn kit's peanut: two spheres of radius R at -d and +d along the axis, pinched in the middle"""
    H = d + R
    pts = []
    for i in range(n + 1):
        t = -H + 2 * H * i / n
        a = math.sqrt(max(0, R * R - (t - d) ** 2))
        b = math.sqrt(max(0, R * R - (t + d) ** 2))
        w = max(a, b, R if abs(t) < d else 0) * (1 - pinch * math.exp(-((t / (0.35 * R)) ** 2)))
        pts.append((max(0.001, w), t))
    pts[0] = (0.001, pts[0][1])
    pts[-1] = (0.001, pts[-1][1])
    return pts


def morph(o, states, axis='x', seg=40):
    """shape keys on a lathe object for each (name, profile); returns the key blocks"""
    o.shape_key_add(name='Basis')
    keys = []
    for name, prof in states:
        kb = o.shape_key_add(name=name)
        for v, p in zip(kb.data, lathe(prof, seg, axis)):
            v.co = p
        keys.append(kb)
    return keys


def key_weights(keys, frame, weights):
    for kb, w in zip(keys, weights):
        kb.value = w
        kb.keyframe_insert('value', frame=frame)


def hat_weights(xs, x):
    """piecewise-linear weights over states at xs (state 0 is the basis: weight implied)"""
    w = [0.0] * len(xs)
    if x <= xs[0]:
        return w
    for i in range(len(xs) - 1):
        if xs[i] <= x <= xs[i + 1]:
            t = (x - xs[i]) / (xs[i + 1] - xs[i])
            w[i] = 1 - t
            w[i + 1] = t
            return w
    w[-1] = 1.0
    return w


def linear_keys(idblock):
    a = idblock.animation_data.action if idblock.animation_data else None
    if not a:
        return
    fcs = list(a.fcurves) if hasattr(a, 'fcurves') else [fc for L in a.layers for s in L.strips for b in s.channelbags for fc in b.fcurves]
    for fc in fcs:
        for kp in fc.keyframe_points:
            kp.interpolation = 'LINEAR'


def walk(rnd, R, n, step, start=None):
    """a random walk inside a ball of radius R (chromatin), as the drawn levels' walk()"""
    pts = [start.copy() if start else V((rnd.random() - 0.5) * R, (rnd.random() - 0.5) * R, (rnd.random() - 0.5) * R)]
    for _ in range(1, n):
        d = V(rnd.random() - 0.5, rnd.random() - 0.5, rnd.random() - 0.5).normalized()
        p = pts[-1] + d * step
        if p.length > R:
            p = p * (R / p.length * 0.9)
        pts.append(p)
    return pts


def recolour(o, m):
    return K.recolour(o, m)


def cut_sphere(r, material, name, thick, seg=(64, 32)):
    """a sphere with the wedge facing the default view (+x, +z in three.js) cut away, given a wall"""
    o = K.sphere(r, (0, 0, 0), material, seg=seg, name=name)
    bm = bmesh.new()
    bm.from_mesh(o.data)
    gone = [f for f in bm.faces if f.calc_center_median().x > 0.02 and f.calc_center_median().y < -0.02]
    bmesh.ops.delete(bm, geom=gone, context='FACES')
    bm.to_mesh(o.data)
    bm.free()
    if thick:
        m = o.modifiers.new('wall', 'SOLIDIFY')
        m.thickness = thick
        m.offset = -1
    return K.apply(o)


def fib(n):
    out = []
    for i in range(n):
        y = 1 - (2 * (i + 0.5)) / n
        r = math.sqrt(1 - y * y)
        t = i * math.pi * (3 - math.sqrt(5))
        out.append(V(math.cos(t) * r, y, math.sin(t) * r))
    return out


def in_wedge(p):
    return p.x > 0 and p.z > 0


def tube(pts, r, material=None, name='tube', res=4, caps=True):
    return K.curve_tube([T(tuple(p)) for p in pts], r, material, name, caps=caps, res=res)


# ------------------------------------------------------------------ set by build.py ----
PREP = None          # prep(name) -> {czPart: [objects]} of work/.cell-build/prep/<name>.glb
OUT = None           # the folder the level .glb files go to
JSON = None          # json(name) -> work/.cell-build/prep/<name>.json, parsed
VIEW = {'nucleus': [1, 0.5, 1], 'nucleosome': [0.15, 0.35, 1], 'apc': [1, 0.4, 1.1]}


def export(lv, sources=(), clips=None):
    import os
    extras = {'czLevel': lv, 'czSources': list(sources)}
    if lv in VIEW:
        extras['czView'] = VIEW[lv]
    if clips:
        extras['czClips'] = clips
    K.export(os.path.join(OUT, f'{lv}.glb'), extras, sampled=False)


# ------------------------------------------------------------------ the nucleus ----
def nucleus():
    """The nucleus cut open: the double nuclear envelope with its pores, nucleoplasm, a nucleolus and chromatin."""
    K.reset()
    rnd = random.Random(23)
    inner = cut_sphere(8.0, K.mat('envelope', 0x8f7fd6, 0.45, alpha=0.8), 'env-in', 0.12)
    outer = cut_sphere(8.45, K.mat('envelope-outer', 0x8f7fd6, 0.5, alpha=0.4), 'env-out', 0.12)
    K.part(K.join([inner, outer], 'envelope'), 'envelope', shell=True)
    K.anchor('envelope', (5.8, 5.8, 0))
    K.part(cut_sphere(7.6, K.mat('nucleoplasm', 0xc9b8f5, 0.8, alpha=0.2), 'nucleoplasm', 0), 'nucleoplasm', shell=True)
    K.anchor('nucleoplasm', (3.2, -3.6, 1.2))
    # nuclear pores: a ring through both membranes, with the basket of the pore complex inside it
    p0 = V(0.6, 0.5, -0.62).normalized()
    dirs = [p0] + [p for p in fib(70) if not in_wedge(p)]
    pm = K.mat('pores', 0x3c2f80, 0.5)
    rings = []
    for d in dirs:
        rings.append(K.torus(0.55, 0.17, tuple(d * 8.22), pm, 'pore', axis=tuple(d), seg=(16, 6)))
        rings.append(K.ico(0.16, tuple(d * 8.22), pm, level=1))
    K.part(K.join(rings, 'pores'), 'pores')
    K.anchor('pores', tuple(p0 * 8.47))
    nuc = V(2, 1.5, 2.2)
    o = K.sphere(2, tuple(nuc), K.mat('nucleolus', 0x4b2a7b, 0.6), seg=(40, 24))
    K.lumpy(o, 0.35, 0.6, 3)
    K.part(K.apply(o), 'nucleolus')
    K.anchor('nucleolus', tuple(nuc + V(0, 2.1, 0)))
    cm = K.mat('chromatin', 0x7b4fa3, 0.5)
    strands, first = [], None
    for i in range(22):
        pts = walk(rnd, 7, 10, 1.3)
        strands.append(tube(pts, 0.1, cm, 'chromatin', res=5))
        first = first or pts[4]
    K.part(K.join(strands, 'chromatin'), 'chromatin')
    K.anchor('chromatin', tuple(first))
    export('nucleus')


# ------------------------------------------------------------------ the organisation of DNA ----
def bead(m_core, m_dna, wrap=True):
    """a nucleosome: a disc of histones (axis Blender z) with its DNA wrapped 1.65 turns round it"""
    core = K.sphere(1, (0, 0, 0), m_core, seg=(16, 8))
    core.scale = (0.5, 0.5, 0.3)
    parts = [core]
    if wrap:
        pts = []
        for i in range(41):
            t = i / 40
            a = t * 1.65 * 2 * math.pi
            pts.append(Vector((0.55 * math.cos(a), 0.55 * math.sin(a), (t - 0.5) * 0.36)))
        parts.append(K.curve_tube(pts, 0.06, m_dna, 'wrap', caps=True, res=3))
    return K.join(parts, 'bead')


def dna():
    """Nucleosomes on their DNA, the chromatin fibre they pack into, its supercoiled loops, and the visible chromosome
    ("Chromosome X", LucasPresoto): its two sister chromatids, centromere and kinetochores. The slider (Nondividing
    cell to Cell prepared for division) coils the fibre and condenses the chromosome, as the drawn level does."""
    K.reset()
    m_core, m_dna = K.mat('bead', 0xf4a261, 0.5), K.mat('dna', 0xe9ecef, 0.4)
    # nucleosomes on their string of DNA
    string = [V(x, 0.25 * math.sin(x * 2), 0) for x in [-16 + 0.25 * i for i in range(29)]]
    objs = [tube(string, 0.07, m_dna, 'string', res=4)]
    for k in range(5):
        x = -15.2 + 1.4 * k
        b = bead(m_core, m_dna)
        b.location = T((x, 0.25 * math.sin(x * 2), 0))
        b.rotation_mode = 'QUATERNION'
        b.rotation_quaternion = Vector((0, 0, 1)).rotation_difference(T((0, 0, 1)))
        objs.append(b)
    K.part(K.join(objs, 'nucleosome'), 'nucleosome')
    K.anchor('nucleosome', (-12.4, 0.9, 0))
    # chromatin: the nucleosomes packed into a coiled fibre
    fibre = [V(-9 + i * 0.1, 0.9 * math.sin(i * math.pi / 3), 0.9 * math.cos(i * math.pi / 3)) for i in range(71)]
    objs = [tube(fibre, 0.06, m_dna, 'linker', res=3)]
    for p in fibre:
        b = bead(m_core, m_dna, wrap=False)
        b.location = T(tuple(p))
        b.scale = (0.31, 0.31, 0.19)
        b.rotation_mode = 'QUATERNION'
        b.rotation_quaternion = Vector((0, 0, 1)).rotation_difference((T((p.x, 0, 0)) - T(tuple(p))).normalized())
        objs.append(b)
    K.part(K.join(objs, 'chromatin'), 'chromatin')
    K.anchor('chromatin', (-5.5, 1.2, 0.6))
    # the supercoiled region: the fibre coiled again
    coil = [V(-2 + 6.3 * (i / 120), 1.5 * math.sin(i / 120 * 7 * math.pi), 1.5 * math.cos(i / 120 * 7 * math.pi)) for i in range(121)]
    sup = tube(coil, 0.36, K.mat('supercoiled', 0xc77dff, 0.5), 'supercoiled', res=6)
    K.lumpy(sup, 0.08, 0.15, 5)
    sup = K.part(K.apply(sup), 'supercoiled')
    pivot = empty('supercoiled-at', (1.15, 0, 0))
    adopt(sup, pivot)
    K.anchor('supercoiled', (1.2, 2.1, 0), pivot)
    # the visible chromosome
    grp = empty('chromosome-at', (9.5, 0, 0))
    got = PREP('chromosome')
    # the download is centred on its centromere: it goes in the group as it is
    for o in got['left'] + got['right']:
        K.part(o, 'sisters').parent = grp
    for o in got['centromere']:
        K.part(o, 'centromere').parent = grp
    halo_m = K.mat('chromosome', 0xe0aaff, 0.6, alpha=0.16)
    for o in got['left'] + got['right']:
        h = o.copy()
        h.data = o.data.copy()
        K.link(h)
        h.data.materials.clear()
        h.data.materials.append(halo_m)
        d = h.modifiers.new('halo', 'DISPLACE')
        d.strength = 0.28
        d.mid_level = 0
        h = K.apply(h)
        for k in ('czPart', 'czShell'):
            if k in h.keys():
                del h[k]
        # the copy came from a child of grp, and apply() gave it that child's world pose: back to grp's frame
        K.part(h, 'chromosome', shell=True).parent = grp
        h.matrix_parent_inverse = Matrix.Identity(4)
        h.matrix_basis = Matrix.Identity(4)
    km = K.mat('kinetochore', 0xffd166, 0.45)
    for z in (0.68, -0.68):
        k = K.between((9.5, 0, z), (9.5, 0, z + (0.16 if z > 0 else -0.16)), 0.42, km, 'kinetochore', seg=20)
        adopt(K.part(k, 'kinetochore'), grp)
    K.anchor('chromosome', (9.5, 3.4, 0), grp)
    K.anchor('sisters', (11.0, -1.9, 0.8), grp)
    K.anchor('centromere', (8.9, -0.6, 0.6), grp)
    K.anchor('kinetochore', (9.5, 0, 0.95), grp)
    tr = Track()

    def place(c, frame):
        s, x = span(c, 0.25, 0.6), span(c, 0.55, 1)
        tr.pose(pivot, frame, scale=s if s > 0.02 else HIDE)
        tr.pose(grp, frame, scale=mix(0.35, 1, x) if x > 0.02 else HIDE)
    sample(place, 1, step=1)
    tr.write()
    export('dna', ['chromosome'])


# ------------------------------------------------------------------ one nucleosome (PDB 3AFA) ----
HISTONE_COLOUR = {'H3.1': 0x4895ef, 'H4': 0x4cc9f0, 'H2A': 0xf72585, 'H2B': 0xb5179e}
BASE_COLOUR = {'A': 0xe76f51, 'T': 0xf4a261, 'G': 0x2a9d8f, 'C': 0x8ab17d}


def surface(points, r, name, material, resolution=0.16, keep=0.3):
    """a smooth molecular surface over points (Blender), from metaballs, decimated"""
    mb = bpy.data.metaballs.new(name)
    mb.resolution = resolution
    mb.render_resolution = resolution
    mb.threshold = 0.6
    o = K.link(bpy.data.objects.new(name, mb))
    for p in points:
        e = mb.elements.new()
        e.co = p
        e.radius = r
    bpy.context.view_layer.update()
    m = K.to_mesh(o)
    m.data.materials.clear()
    m.data.materials.append(material)
    d = m.modifiers.new('less', 'DECIMATE')
    d.ratio = keep
    return K.apply(m)


def nucleosome():
    """One nucleosome from PDB 3AFA: each histone chain's surface over its C-alpha trace, the DNA's two backbones
    (the first 58 base pairs as a gene), its bases, linker DNA leaving each end as a double helix, and a neighbouring
    nucleosome at each end, as the drawn level has them."""
    K.reset()
    data = JSON('nucleosome')

    def P(arr, i):
        return V(arr[3 * i], arr[3 * i + 1], arr[3 * i + 2])
    # histones: one surface per chain, coloured by histone
    hist, all_ca = [], []
    for k, h in enumerate(data['histones']):
        pts = [P(h['ca'], i) for i in range(len(h['ca']) // 3)]
        all_ca += pts
        m = K.mat(f"histone-{h['name']}", HISTONE_COLOUR.get(h['name'], 0x7aa6e0), 0.55)
        hist.append(K.part(surface([T(tuple(p)) for p in pts], 0.62, f'h{chr(65 + k)}', m), 'histones'))
    K.anchor('histones', tuple(all_ca[len(all_ca) // 3] + V(0, 0.4, 0)))
    s0, s1 = data['strands']
    n = len(s0['bases'])
    pair = {data['pairs'][k]: data['pairs'][k + 1] for k in range(0, len(data['pairs']), 2)}
    bb0 = [P(s0['backbone'], i) for i in range(n)]
    bb1 = [P(s1['backbone'], i) for i in range(n)]
    c10 = [P(s0['c1'], i) for i in range(n)]
    c11 = [P(s1['c1'], i) for i in range(n)]
    GENE = 58
    gm, dm = K.mat('gene', 0xffb703, 0.4), K.mat('dna', 0xe9ecef, 0.4)
    gene = [tube(bb0[:GENE + 1], 0.13, gm, 'gene', res=3)]
    rest = [tube(bb0[GENE:], 0.13, dm, 'dna', res=3)]
    partner = [pair[i] for i in range(GENE) if i in pair]
    lo, hi = min(partner), max(partner)
    gene.append(tube(bb1[lo:hi + 1], 0.13, gm, 'gene', res=3))
    if lo > 0:
        rest.append(tube(bb1[:lo + 1], 0.13, dm, 'dna', res=3))
    if hi < n - 1:
        rest.append(tube(bb1[hi:], 0.13, dm, 'dna', res=3))
    K.part(K.join(gene, 'gene'), 'gene')
    K.part(K.join(rest, 'dna'), 'dna')
    K.anchor('gene', tuple(bb0[25] + V(0, 0.3, 0)))
    K.anchor('dna', tuple(bb0[105] + V(0, 0.3, 0)))
    # the bases: half a rung from each strand's sugar to the middle, coloured A, T, C or G
    rungs = {b: [] for b in BASE_COLOUR}
    for i, j in pair.items():
        mid = (c10[i] + c11[j]) / 2
        rungs[s0['bases'][i]].append(K.between(tuple(c10[i]), tuple(mid), 0.08, None, 'base', seg=6))
        rungs[s1['bases'][j]].append(K.between(tuple(c11[j]), tuple(mid), 0.08, None, 'base', seg=6))
    for b, objs in rungs.items():
        if objs:
            K.part(K.recolour(K.join(objs, f'bases-{b}'), K.mat(f'base-{b}', BASE_COLOUR[b], 0.5)), 'bases')
    j120 = pair[120]
    K.anchor('bases', tuple((c10[120] + c11[j120]) / 2 + V(0, 0.2, 0)))
    # linker DNA leaving each end as a right-handed double helix, to a neighbouring nucleosome
    hm, rm = K.mat('helix', 0xd0dbe6, 0.4), K.mat('rung', 0x9aa5b1, 0.5)
    nb_core, nb_dna = K.mat('neighbour', 0x7aa6e0, 0.55, alpha=0.95), K.mat('neighbour-dna', 0xd0dbe6, 0.45)
    STEPS, RISE, TURN = 34, 0.34, 2 * math.pi / 10.5

    def axis(i):
        return (c10[i] + c11[pair[i]]) / 2
    helix, neigh = [], []
    linker_mid = neighbour = None
    for end, inner in ((0, 4), (n - 1, n - 5)):
        a0 = axis(end)
        d = (a0 - axis(inner)).normalized()

        def rad(p):
            u = p - a0
            return u - d * u.dot(d)
        u0, u1 = rad(bb0[end]), rad(bb1[pair[end]])
        st0, st1 = [bb0[end]], [bb1[pair[end]]]
        for m in range(1, STEPS + 1):
            c = a0 + d * (m * RISE)
            q = Quaternion(d, m * TURN)
            p0, p1 = c + q @ u0, c + q @ u1
            st0.append(p0)
            st1.append(p1)
            helix.append(K.between(tuple(p0), tuple(p1), 0.06, rm, 'rung', seg=6))
        helix.append(tube(st0, 0.12, hm, 'helix', res=3))
        helix.append(tube(st1, 0.12, hm, 'helix', res=3))
        linker_mid = linker_mid or st0[STEPS // 2]
        tip = a0 + d * (STEPS * RISE)
        side = d.cross(V(0, 0, 1))
        if side.length_squared < 1e-3:
            side = V(1, 0, 0)
        side.normalize()
        ax2 = d.cross(side).normalized()
        centre = tip + side * 4.2 + d * 1.2
        core = K.sphere(1, tuple(centre), nb_core, seg=(32, 16), name='core')
        core.scale = (3.2, 3.2, 2.1)
        core.rotation_mode = 'QUATERNION'
        core.rotation_quaternion = Vector((0, 0, 1)).rotation_difference(T(tuple(ax2)))
        K.lumpy(core, 0.35, 0.9, len(neigh))
        neigh.append(K.apply(core))
        e1, e2 = -side, d
        wrap = [centre + e1 * (4.2 * math.cos(t * 3.3 * math.pi)) + e2 * (4.2 * math.sin(t * 3.3 * math.pi)) + ax2 * ((t - 0.5) * 2.6)
                for t in [i / 80 for i in range(81)]]
        neigh.append(tube(wrap, 0.5, nb_dna, 'wrap', res=5))
        neighbour = neighbour or centre + ax2 * 2.4
    K.part(K.join(helix, 'helix'), 'helix')
    K.part(K.join(neigh, 'nucleosome'), 'nucleosome')
    K.anchor('helix', tuple(linker_mid + V(0, 0.3, 0)))
    K.anchor('nucleosome', tuple(neighbour))
    export('nucleosome')


# ------------------------------------------------------------------ chromatids and centrioles ----
def chromatid_templates():
    """the two chromatids of "Chromosome X", each 1 tall and made twice as thick, its inner waist (where it meets its sister) at the origin.
    Returns (left, right, waist width): left bows to -x, right to +x."""
    got = PREP('chromosome')
    for o in got.get('centromere', []):
        bpy.data.objects.remove(o)
    out = []
    for side in ('left', 'right'):
        o = K.join(got[side], f'chromatid-{side}')
        bpy.context.view_layer.update()
        me = o.data
        me.transform(o.matrix_world)
        o.matrix_world = Matrix.Identity(4)
        pts = [v.co.copy() for v in me.vertices]
        H = max(p.z for p in pts) - min(p.z for p in pts)
        mid = [p for p in pts if abs(p.z) < 0.05 * H]
        inner = max(p.x for p in mid) if side == 'left' else min(p.x for p in mid)
        outer = min(p.x for p in mid) if side == 'left' else max(p.x for p in mid)
        # twice as thick as the download: at a chromosome's size in a cell, its own arms read as threads
        for v in me.vertices:
            v.co = Vector(((v.co.x - inner) / H * 2, v.co.y / H * 2, v.co.z / H))
        out.append((o, abs(outer - inner) / H * 2))
    return out[0][0], out[1][0], (out[0][1] + out[1][1]) / 2


def chromatid(tpl, colour_mat, cen_mat, kin_mat, sgn, width, name, kin=True, cen_part='centromere'):
    """one chromatid of a chromosome: its body (part sisters), a centromere ball at the waist and, facing its pole, a
    kinetochore. An empty at the waist carries them; scale it to the chromatid's length."""
    g = empty(name)
    body = tpl.copy()
    body.data = tpl.data.copy()
    K.link(body)
    K.recolour(body, colour_mat)
    body.parent = g
    K.part(body, 'sisters')
    ball = K.sphere(0.07, (0, 0, 0), cen_mat, seg=(14, 8), name='cen')
    ball.parent = g
    K.part(ball, cen_part)
    if kin:
        k = K.between((sgn * width, 0, 0), (sgn * (width + 0.04), 0, 0), 0.07, kin_mat, 'kin', seg=14)
        k.parent = g
        K.part(k, 'kinetochore')
    return g


def bake(o):
    """put an object's transform into its mesh: the object then sits at the origin with no rotation or scale"""
    bpy.context.view_layer.update()
    o.data.transform(o.matrix_world)
    o.matrix_world = Matrix.Identity(4)
    return o


def centriole(m, L=1.0, name='centriole'):
    """one centriole: nine triplets of microtubules round an empty centre (the 9 + 0 array), L long along three.js +y
    from its proximal end (the object's origin), 0.5 across. Each triplet is a blade of three fused tubules leaning
    out from the tangent, as a pinwheel seen end on; each tubule is hollow, so the 27 rings read end on."""
    bm = bmesh.new()
    rA, step, lean = 0.155, 0.058, math.radians(50)
    ro, ri, n = 0.031, 0.018, 10
    for i in range(9):
        ang = i * 2 * math.pi / 9
        out = V(math.cos(ang), 0, math.sin(ang))
        along = V(-math.sin(ang), 0, math.cos(ang))
        d = along * math.cos(lean) + out * math.sin(lean)
        for k in range(3):
            c = out * rA + d * (step * k)
            ring = [(math.cos(j * 2 * math.pi / n), math.sin(j * 2 * math.pi / n)) for j in range(n)]
            vo = [bm.verts.new(T((c.x + ro * a, 0, c.z + ro * b))) for a, b in ring]
            vi = [bm.verts.new(T((c.x + ri * a, 0, c.z + ri * b))) for a, b in ring]
            for j in range(n):
                bm.faces.new((vo[j], vo[(j + 1) % n], vi[(j + 1) % n], vi[j]))
    got = bmesh.ops.extrude_face_region(bm, geom=list(bm.faces))
    bmesh.ops.translate(bm, vec=T((0, L, 0)), verts=[g for g in got['geom'] if isinstance(g, bmesh.types.BMVert)])
    bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
    return K.mesh_obj(name, bm, m)


def centriole_pair(m, name='centrioles'):
    """two centrioles at right angles (L1 p5), each nine triplets in a 9 + 0 array: one along y, the other along x
    beside its proximal end; the origin is the first one's middle"""
    a = centriole(m, 1.0, 'a')
    a.data.transform(Matrix.Translation(T((0, -0.5, 0))))
    b = centriole(m, 1.0, 'b')
    b.data.transform(Matrix.Translation(T((0.3, -0.3, 0))) @ q_three((0, 0, 1), -math.pi / 2).to_matrix().to_4x4())
    return K.join([a, b], name)


def anchors(names):
    """animated anchor empties, one per part"""
    out = {}
    for p in names:
        e = empty(f'cz-anchor-{p}')
        e['czAnchorOf'] = p
        out[p] = e
    return out


def three_of(b):
    """a Blender point back in three.js terms"""
    return V(b.x, b.z, -b.y)


def envelope_pieces(r, m, n=14):
    """a nuclear envelope (a sphere of radius r) as n pieces, each with its origin at its own centre, so that in
    prophase it can come apart into fragments (L1 p25: "Fragments of the nuclear envelope")"""
    dirs = [T(tuple(d)) for d in fib(n)]
    out = []
    for i in range(n):
        o = K.sphere(r, (0, 0, 0), m, seg=(36, 24), name='envelope')
        bm = bmesh.new()
        bm.from_mesh(o.data)
        gone = [f for f in bm.faces if max(range(n), key=lambda j: f.calc_center_median().dot(dirs[j])) != i]
        bmesh.ops.delete(bm, geom=gone, context='FACES')
        c = sum((v.co for v in bm.verts), Vector()) / len(bm.verts)
        for v in bm.verts:
            v.co -= c
        bm.to_mesh(o.data)
        bm.free()
        o.location = c
        out.append(o)
    return out


def kinetochore_at(at, rot, sgn, width, length):
    """where a chromatid's kinetochore is: the chromatid's empty is at `at`, turned rot about z and scaled to `length`;
    the kinetochore sits on the outer face of its waist, sgn * (width + 0.04) along the chromatid's own x"""
    d = (width + 0.04) * length * sgn
    return at + V(d * math.cos(rot), d * math.sin(rot), 0)


def fibre(tr, o, frame, pole, end, grow, r, on):
    """a spindle microtubule from round a centrosome (not through its centrioles) toward end, grown to grow (0-1)"""
    d = end - pole
    if d.length < 0.7:
        on = False
    a = pole + d.normalized() * 0.6 if d.length > 1e-6 else pole
    tr.rod(o, frame, a, lerp(a, end, grow), r, on and grow > 0.05)


def spindle_rods(n, name='spindle', part=True):
    sm = K.mat('spindle', 0x2a9d8f, 0.45, alpha=0.85)
    rods = [unit_rod(sm, name, seg=6) for _ in range(n)]
    return [K.part(o, 'spindle') if part else K.decor(o, 'spindle') for o in rods]


# ------------------------------------------------------------------ the cell life cycle ----
def cycle():
    """The cell life cycle as Lecture 1 draws it (pp 24-26): interphase as G1, S and G2, the four steps of mitosis and
    cytokinesis. G1: the cell grows; one centrosome, two centrioles at right angles. S: the chromatin doubles, and a
    new centriole starts beside each old one. G2: the new centrioles are finished and the two centrosomes, each a
    pair, part. Prophase: the chromatin condenses into duplicated chromosomes ("Chromosome X" chromatids), the
    centrosomes go to the poles, the spindle grows and the envelope breaks into fragments; late in it, kinetochore
    microtubules reach the kinetochores. Metaphase: the chromosomes on the plate, each sister's kinetochore tied to
    the pole it faces. Anaphase: the sisters pulled apart along their microtubules. Telophase: envelopes form again
    round each set; cytokinesis: two daughter cells, each with one centrosome. Every spindle microtubule runs from a
    centrosome to where the thing it reaches actually is that frame."""
    K.reset()
    rnd = random.Random(31)
    R = 8
    tr = Track()
    mem = lathe_mesh(peanut_profile(R, 0, 0, 40), 36, K.mat('membrane', 0xe7a0b4, 0.5, alpha=0.28), 'membrane')
    K.part(mem, 'membrane', shell=True)
    dm = K.mat('daughters', 0xe7a0b4, 0.5, alpha=0.3)
    daughters = [K.part(K.sphere(6.2, (sgn * 6.6, 0, 0), dm, seg=(40, 28), name='daughter'), 'daughters', shell=True) for sgn in (-1, 1)]
    em = K.mat('envelope', 0x8f7fd6, 0.45, alpha=0.45)
    pieces = [K.part(p, 'envelope', shell=True) for p in envelope_pieces(3.4, em)]
    piece_at = [three_of(p.location) for p in pieces]
    envD = [K.part(K.sphere(2.2, (0, 0, 0), em, seg=(28, 20)), 'envelope', shell=True) for _ in range(2)]
    cm = K.mat('chromatin', 0x7b4fa3, 0.5)

    def chromatin_group(name, n, Rr, steps, step, r):
        g = empty(name)
        for _ in range(n):
            t = tube(walk(rnd, Rr, steps, step), r, cm, 'chromatin', res=4)
            t.parent = g
            K.part(t, 'chromatin')
        return g
    chromA = chromatin_group('chromA', 7, 2.9, 9, 0.9, 0.07)
    chromB = chromatin_group('chromB', 7, 2.9, 9, 0.9, 0.07)
    chromD = [chromatin_group(f'chromD{i}', 5, 1.8, 8, 0.7, 0.06) for i in range(2)]
    # four chromosomes, each two sister chromatids
    LEN, COLS, PLATE = [2.2, 1.7, 2.0, 1.4], [0xe63946, 0x457b9d, 0x2a9d8f, 0xf4a261], [-3.6, -1.2, 1.2, 3.6]
    left, right, width = chromatid_templates()
    cen_m, kin_m = K.mat('centromere', 0x3d0e61, 0.45), K.mat('kinetochore', 0xffd166, 0.45)
    chromatids = []
    for i, L in enumerate(LEN):
        m = K.mat(f'chromosome-{i}', COLS[i], 0.5)
        chromatids.append([chromatid(left if sgn < 0 else right, m, cen_m, kin_m, sgn, width, f'c{i}{sgn}') for sgn in (-1, 1)])
    for t in (left, right):
        bpy.data.objects.remove(t)
    pro_pos = [V((rnd.random() - 0.5) * 3.4, (rnd.random() - 0.5) * 3.4, (rnd.random() - 0.5) * 1.6) for _ in LEN]
    pro_rot = [rnd.random() * math.pi for _ in LEN]
    # two centrosomes. In G1 they are one: two centrioles at right angles. Each old centriole grows a new one at right
    # angles to it (S, finished in G2), and each old-and-new pair is then a centrosome of its own.
    ctm = K.mat('centrioles', 0xffb703, 0.45)
    cs = [empty(f'centrosome{i}') for i in range(2)]
    for g in cs:
        g.rotation_mode = 'QUATERNION'
    old, new = [], []
    for i in range(2):
        o = K.part(centriole(ctm, 1.0, f'old{i}'), 'centrioles')
        o.parent = cs[i]
        o.location = T((0, -0.5, 0))
        old.append(o)
        n = K.part(centriole(ctm, 1.0, f'new{i}'), 'centrioles')
        n.parent = cs[i]
        new.append(n)
    Q_NEW = q_three((0, 0, 1), -math.pi / 2)
    Q_TURN = q_three((1, 0, 0), math.pi / 2)
    P0 = V(0, 4.6, 1.5)
    P1 = P0 + V(0, -0.35, 0.8)
    P1_APART = P0 + V(1.9, -0.4, 1.2)
    spindle = spindle_rods(36)
    astral = [V(0, math.cos(i / 8 * 2 * math.pi), math.sin(i / 8 * 2 * math.pi) * 0.6) for i in range(8)]
    polar = [V(0, (i - 2.5) * 0.7, ((i % 2) - 0.5) * 0.8) for i in range(6)]
    an = anchors(('envelope', 'chromatin', 'centrioles', 'spindle'))
    K.anchor('membrane', (0, 7.6, 2.2))
    K.anchor('daughters', (6.6, 6.0, 1.2))
    N = len(CYCLE_STAGES)

    def outline(s):
        """the cell outline (radius, centres apart, pinch) at slider value s: elongating in anaphase, pinched in
        telophase, two daughters by the end of cytokinesis"""
        k = min(N - 1, int(math.floor(s)))
        f = s - k
        at = lambda i: 1.0 if k > i else 0.0 if k < i else f
        ana, telo, cyto = at(5), at(6), at(7)
        Rm, d, pinch = R, 0.0, 0.0
        if k >= 5:
            d = mix(0, 1.2, ana) * 0.5
        if k >= 6:
            d, pinch = mix(0.6, 1.2, telo), mix(0, 0.25, telo)
        if k >= 7:
            Rm, d, pinch = mix(R, 6.2, cyto), mix(1.2, 6.6, cyto), mix(0.25, 1, cyto)
        return Rm, d, pinch
    XS = [5.5, 6.0, 6.5, 7.0, 7.3, 7.6, 7.85, 8.0]
    keys = morph(mem, [(f's{x}', peanut_profile(*outline(x), 40)) for x in XS], 'x', 36)

    def place(s, frame):
        k = min(N - 1, int(math.floor(s)))
        f = s - k
        at = lambda i: 1.0 if k > i else 0.0 if k < i else f
        g1, meta, ana, telo, cyto = at(0), at(4), at(5), at(6), at(7)
        key_weights(keys, frame, hat_weights([5.0] + XS, s)[1:])
        split = k >= 7 and f > 0.85
        # G1: the cell grows
        tr.pose(mem, frame, scale=HIDE if split else mix(0.86, 1, span(g1, 0, 0.9)))
        for o in daughters:
            tr.pose(o, frame, scale=1 if split else HIDE)
        cx = mix(4.6, 6.6, cyto) if k >= 7 else 4.6
        pole = cx + 2.4 if k >= 7 else 5.8 + 1.2 * telo if k >= 6 else 5.8
        # the envelope breaks into fragments late in prophase; a new one forms round each set in telophase
        frag = 0 if k < 3 else span(f, 0.45, 0.95) if k == 3 else 1
        for p, c in zip(pieces, piece_at):
            tr.pose(p, frame, c * (1 + 0.35 * frag), scale=HIDE if frag > 0.97 else 1 - 0.45 * frag)
        grow = 0 if k < 6 else span(f, 0.4, 1) if k == 6 else 1
        for i, e in enumerate(envD):
            tr.pose(e, frame, V((1 if i else -1) * cx, 0, 0), scale=grow if grow > 0.02 else HIDE)
        # chromatin: doubled in S, condensing away in prophase, back in telophase
        early = k < 3 or (k == 3 and f < 0.3)
        tr.pose(chromA, frame, V(0, 0, 0), scale=1 if early else HIDE)
        b = HIDE if k == 0 else max(HIDE, f) if k == 1 else 1 if early else HIDE
        tr.pose(chromB, frame, V(0.25, 0.2, 0), scale=b)
        back = 0 if k < 6 else span(f, 0.5, 1) if k == 6 else 1
        for i, g in enumerate(chromD):
            tr.pose(g, frame, V((1 if i else -1) * cx, 0, 0), scale=back if back > 0.02 else HIDE)
        tr.pose(an['envelope'], frame, V(0, 3.4, 0) if k < 4 else V(cx, 2.2, 0))
        tr.pose(an['chromatin'], frame, V(0.6, 0.9, 0.6) if k < 4 else V(cx, 0.6, 0.6))
        # chromosomes
        cond = 0 if k < 3 else span(f, 0.1, 0.7) if k == 3 else 1 if k < 6 else 1 - span(f, 0.4, 1) if k == 6 else 0
        kins = []
        for i, L in enumerate(LEN):
            plate = V(0, PLATE[i], 0.4 if i % 2 else -0.4)
            centre = pro_pos[i].copy()
            rot = pro_rot[i] * (1 - span(meta, 0, 0.6))
            if k >= 4:
                centre = lerp(pro_pos[i], plate, 1 if k > 4 else span(f, 0, 0.6))
            for ci, g in enumerate(chromatids[i]):
                sgn = 1 if ci else -1
                x, y, z = centre.x + sgn * 0.3, centre.y, centre.z
                if k >= 5:
                    x = sgn * mix(0.3, pole - 1.2, 1 if k > 5 else span(ana, 0, 1))
                if k >= 6:
                    x, y = sgn * (pole - 1.2), PLATE[i] * mix(1, 0.45, telo)
                sc = mix(0.4, 1, span(f, 0.1, 0.7)) if k == 3 else 1
                g_at = V(x - sgn * 0.3, y, z)
                tr.pose(g, frame, g_at, q_three((0, 0, 1), rot), (L * sc) if cond > 0.15 else HIDE)
                kins.append((sgn, kinetochore_at(g_at, rot, sgn, width, L * sc)))
        # centrosomes: a new centriole grows beside each old one (S, finished in G2), the pairs part (G2) and go to
        # the poles (prophase)
        dup = 0 if k == 0 else 0.6 * span(f, 0.1, 1) if k == 1 else mix(0.6, 1, span(f, 0, 0.6)) if k == 2 else 1
        apart = 0 if k < 2 else span(f, 0.5, 1) if k == 2 else 1
        to_pole = 0 if k < 3 else span(f, 0, 0.8) if k == 3 else 1
        c0 = lerp(P0, V(-pole, 0, 0), to_pole)
        c1 = lerp(lerp(P1, P1_APART, apart), V(pole, 0, 0), to_pole)
        tr.pose(cs[0], frame, c0, Quaternion())
        tr.pose(cs[1], frame, c1, Q_TURN)
        for n in new:
            tr.pose(n, frame, V(0.3, -0.3, 0), Q_NEW, (1, dup, 1) if dup > 0.05 else HIDE)
        # the spindle: astral and polar microtubules from the poles in prophase; kinetochore ones reach each sister's
        # kinetochore at the end of prophase, shorten as anaphase pulls the sisters to the poles, and all go in
        # telophase
        sp = 0 if k < 3 else span(f, 0.25, 0.8) if k == 3 else 1 if k < 6 else 1 - span(f, 0, 0.7) if k == 6 else 0
        sk = 0 if k < 3 else span(f, 0.7, 1) if k == 3 else 1 if k < 6 else 1 - span(f, 0, 0.7) if k == 6 else 0
        r = 0
        for pi, p in enumerate((c0, c1)):
            toward = -1 if pi else 1
            for a in astral:
                end = p + V(-toward, a.y, a.z).normalized() * 1.8
                fibre(tr, spindle[r], frame, p, end, sp, 0.035, True)
                r += 1
            for q in polar:
                end = V(toward * 0.9 * (1 + 0.6 * ana if k >= 5 else 1), q.y, q.z)
                fibre(tr, spindle[r], frame, p, end, sp, 0.035, True)
                r += 1
            for sgn, kp in [kk for kk in kins if kk[0] == (1 if pi else -1)]:
                fibre(tr, spindle[r], frame, p, kp, sk, 0.035, cond > 0.15)
                r += 1
        tr.pose(an['centrioles'], frame, c0 + V(0, 0.9, 0))
        tr.pose(an['spindle'], frame, lerp(c1, V(0, 0.6, 0), 0.45))
    sample(place, N, step=2, extra=[N - 0.14, N - 0.1])
    linear_keys(mem.data.shape_keys)
    # labels that ride on a chromatid: anchors parented to it (the chromatid is 1 tall, scaled to its length)
    for p, off, src in (('sisters', (0, 0.55, 0.15), chromatids[0][0]), ('centromere', (0, 0, 0.12), chromatids[3][1]),
                        ('kinetochore', (0.12, 0, 0.05), chromatids[0][1])):
        e = empty(f'cz-anchor-{p}', off, src)
        e['czAnchorOf'] = p
    tr.write()
    export('cycle', ['chromosome'])


CYCLE_STAGES = ['g1', 'replication', 'g2', 'prophase', 'metaphase', 'anaphase', 'telophase', 'cytokinesis']


def arc(R, r, ang, m, name='arc', n=24):
    """a curved tube: an arc of radius R through angle ang in the three.js xy plane, centred on the y axis"""
    pts = [V(R * math.sin(-ang / 2 + ang * i / n), R * math.cos(-ang / 2 + ang * i / n) - R, 0) for i in range(n + 1)]
    return tube(pts, r, m, name, res=4)


def flat_box(size, at, material, name, bevel=0.4, lump=0.0, seed=0):
    o = K.box(size, at, material, name)
    o.data.transform(Matrix.Diagonal((*o.scale, 1)))
    o.scale = (1, 1, 1)
    if bevel:
        m = o.modifiers.new('bev', 'BEVEL')
        m.width = bevel
        m.segments = 4
    if lump:
        K.smooth(o, 2)
        K.lumpy(o, lump, 1.5, seed)
    return K.apply(o)


# ------------------------------------------------------------------ meiosis ----
def meiosis():
    """Spermatocytes through meiosis, after Lecture 1's figures (pp 28-29): a primary spermatocyte, its two secondary
    spermatocytes and four spermatids (each cell morphing as it divides), two pairs of chromosomes ("Chromosome X"
    chromatids), and while a cell divides, a centrosome (two centrioles, each 9 + 0) at each pole with the spindle
    between them. Meiosis I: each homologue's kinetochore microtubules come from the pole it goes to, and the
    homologues part. Meiosis II: in each secondary spermatocyte the spindle turns across, and each sister's
    microtubules come from the pole it faces, so the sisters part."""
    K.reset()
    rnd = random.Random(41)
    R, CX, CY = 5, 4.6, 3.4
    tr = Track()
    m1 = K.mat('primary', 0xe7a0b4, 0.5, alpha=0.3)
    m2 = K.mat('secondary', 0xf2b5d4, 0.5, alpha=0.3)
    m3 = K.mat('spermatids', 0xcdb4db, 0.5, alpha=0.34)
    primary = K.part(lathe_mesh(peanut_profile(R, 0, 0, 40), 36, m1, 'primary'), 'primary', shell=True)
    US = [0.25, 0.5, 0.75, 1.0]
    pkeys = morph(primary, [(f'u{u}', peanut_profile(mix(R, 3.9, u), mix(0, CX, u), u, 40)) for u in US], 'x', 36)
    secondary, skeys = [], []
    for sgn in (-1, 1):
        o = K.part(lathe_mesh(peanut_profile(3.9, 0, 0, 40), 36, m2, 'secondary', axis='y'), 'secondary', shell=True)
        o.location = T((sgn * CX, 0, 0))
        skeys.append(morph(o, [(f'v{u}', peanut_profile(mix(3.9, 3.0, u), mix(0, CY, u), u, 40)) for u in US], 'y', 36))
        secondary.append(o)
    spermatids = [K.part(K.sphere(3.0, (sx * CX, sy * CY, 0), m3, seg=(32, 22)), 'spermatids', shell=True) for sx in (-1, 1) for sy in (-1, 1)]
    DEF = [(2.2, 0xe63946, 0, -1), (2.2, 0x457b9d, 0, 1), (1.5, 0xf4a261, 1, -1), (1.5, 0x2a9d8f, 1, 1)]
    left, right, width = chromatid_templates()
    cen_m = K.mat('centromere', 0x3d0e61, 0.45)
    chroms = []
    for i, (L, c, pair, side) in enumerate(DEF):
        m = K.mat(f'chromosome-{i}', c, 0.5)
        chroms.append([chromatid(left if sd < 0 else right, m, cen_m, None, sd, width, f'm{i}{sd}', kin=False, cen_part='sisters') for sd in (-1, 1)])
    for t in (left, right):
        bpy.data.objects.remove(t)
    start = [V((rnd.random() - 0.5) * 4, (rnd.random() - 0.5) * 4, (rnd.random() - 0.5) * 1.5) for _ in DEF]
    ctm = K.mat('centrioles', 0xffb703, 0.45)
    cpairs = [K.part(centriole_pair(ctm, f'cp{i}'), 'centrioles') for i in range(4)]
    spindle = spindle_rods(44, part=False)
    astral = [V(0, math.cos(i / 5 * 2 * math.pi), math.sin(i / 5 * 2 * math.pi) * 0.6) for i in range(5)]
    polar = [((i - 1.5) * 0.6, ((i % 2) - 0.5) * 0.7) for i in range(4)]
    K.anchor('primary', (0, 4.8, 1.2))
    K.anchor('secondary', (-CX, 3.8, 0.8))
    K.anchor('spermatids', (-CX, CY + 2.9, 0.6))
    an = anchors(('centrioles',))
    first_cen = V(-3.8, 0.5, 0)

    def place(s, frame):
        nonlocal first_cen
        k = min(4, int(math.floor(s)))
        f = s - k
        at = lambda i: 1.0 if k > i else 0.0 if k < i else f
        mI, mII = at(1), at(3)
        u, v = span(mI, 0.5, 1), span(mII, 0.45, 1)
        key_weights(pkeys, frame, hat_weights([0.0] + US, u)[1:])
        for ks in skeys:
            key_weights(ks, frame, hat_weights([0.0] + US, v)[1:])
        tr.pose(primary, frame, scale=1 if s < 1.95 else HIDE)
        for o in secondary:
            tr.pose(o, frame, scale=1 if 1.95 <= s < 3.95 else HIDE)
        for o in spermatids:
            tr.pose(o, frame, scale=1 if s >= 3.95 else HIDE)
        ends = []        # (pole index, where a kinetochore microtubule ends)
        for i, (L, c, pair, side) in enumerate(DEF):
            y = -1.3 if pair else 1.3
            cell_x = side * CX
            centre, theta, sep = start[i].copy(), 0.0, 0.28
            if k >= 1:
                plate, there = V(side * 0.55, y, 0), V(cell_x, -1.0 if pair else 1.0, 0)
                centre = lerp(lerp(start[i], plate, span(mI, 0, 0.35)), there, span(mI, 0.35, 1))
            if k >= 3:
                centre = lerp(centre, V(cell_x + (0.8 if pair else -0.8), 0, 0), span(mII, 0, 0.3))
                theta = (math.pi / 2) * span(mII, 0, 0.3)
                sep = mix(0.28, CY, span(mII, 0.3, 0.8))
            for ci, g in enumerate(chroms[i]):
                sgn = 1 if ci else -1
                off = Quaternion((0, 0, 1), theta) @ V(sgn * sep, 0, 0)
                inward = Quaternion((0, 0, 1), theta) @ V(sgn * 0.28, 0, 0)
                waist = centre + off - inward
                tr.pose(g, frame, waist, q_three((0, 0, 1), theta), L)
                face = waist + Quaternion((0, 0, 1), theta) @ V(sgn * width * L, 0, 0)
                if k == 3:
                    # meiosis II: each sister to the pole it faces, in its own cell
                    ends.append((2 * (0 if side < 0 else 1) + (0 if sgn < 0 else 1), face))
                elif k == 1 and sgn == side:
                    # meiosis I: the homologue, both sisters, to the pole on its side
                    ends.append((0 if side < 0 else 1, face))
        # centrosomes at the poles while a cell divides, and the spindle between them
        poses, axes = [], []
        if k == 1:
            x = mix(3.8, CX + 2.2, span(mI, 0.4, 1))
            poses = [V(-x, 0, 0), V(x, 0, 0)]
            axes = [V(1, 0, 0), V(-1, 0, 0)]
            first_cen = V(-3.8, 0.5, 0)
        if k == 3:
            yy = mix(3.0, CY + 1.6, span(mII, 0.4, 1))
            poses = [V(sx * CX, sy * yy, 0) for sx in (-1, 1) for sy in (-1, 1)]
            axes = [V(0, -sy, 0) for sx in (-1, 1) for sy in (-1, 1)]
            first_cen = V(-CX, 3.4, 0)
        for i, o in enumerate(cpairs):
            if i < len(poses):
                tr.pose(o, frame, poses[i], scale=1)
            else:
                tr.pose(o, frame, None, scale=HIDE)
        tr.pose(an['centrioles'], frame, first_cen)
        prog = mI if k == 1 else mII if k == 3 else 0
        sp = span(prog, 0, 0.2) * (1 - span(prog, 0.8, 0.97))
        r = 0
        for pi, (p, toward) in enumerate(zip(poses, axes)):
            side_x = V(toward.y, -toward.x, 0)       # across the spindle
            for a in astral:
                end = p + (-toward + side_x * a.y + V(0, 0, a.z)).normalized() * 1.5
                fibre(tr, spindle[r], frame, p, end, sp, 0.03, True)
                r += 1
            centre_of_cell = p + toward * (p - poses[pi ^ 1]).length / 2
            for a, z in polar:
                end = centre_of_cell + toward * 0.7 + side_x * a + V(0, 0, z)
                fibre(tr, spindle[r], frame, p, end, sp, 0.03, True)
                r += 1
            for _, e in [x for x in ends if x[0] == pi]:
                fibre(tr, spindle[r], frame, p, e, sp, 0.03, True)
                r += 1
        while r < len(spindle):
            tr.rod(spindle[r], frame, V(), V(), 0.03, False)
            r += 1
    sample(place, 5, step=2, extra=[1.94, 1.96, 3.94, 3.96])
    linear_keys(primary.data.shape_keys)
    for o in secondary:
        linear_keys(o.data.shape_keys)
    e = empty('cz-anchor-sisters', (0, 0.5, 0.15), chroms[0][0])
    e['czAnchorOf'] = 'sisters'
    tr.write()
    export('meiosis', ['chromosome'])


# ------------------------------------------------------------------ immunological surveillance (NK cell) ----
def nk():
    """An NK cell ("Lympocyte", Vikrama Raghuraman: a large lymphocyte) meeting an abnormal cell, as the drawn level:
    it adheres, its Golgi apparatus turns to face the contact, perforin vesicles bud off and release perforins, and
    the perforins form pores in the abnormal cell's membrane."""
    K.reset()
    tr = Track()
    got = PREP('lymphocyte')
    nkg = empty('nk-at', (-5, 0, 0))
    surf = K.join(got['wbc'], 'nkcell')
    K.recolour(surf, K.mat('nkcell', 0x90e0ef, 0.55, alpha=0.38))
    nucl = K.join(got['wbcnucleus'], 'nknucleus')
    K.recolour(nucl, K.mat('nknucleus', 0x0077b6, 0.45))
    # the cell at the drawn size; its nucleus smaller and to the back, leaving room for the Golgi apparatus
    surf.location, surf.scale = T((-5, 0, 0)), (3.6, 3.6, 3.6)
    nucl.location, nucl.scale = T((-6.3, -0.4, -0.4)), (1.9, 1.9, 1.9)
    for o in (surf, nucl):
        adopt(K.part(o, 'nkcell', shell=o is surf), nkg)
    ab = K.sphere(4, (4.2, 0, 0), K.mat('abnormal', 0xffadad, 0.55, alpha=0.42), seg=(48, 32), name='abnormal')
    K.smooth(ab, 1)
    K.lumpy(ab, 0.35, 1.2, 9)
    ab = K.part(K.apply(ab), 'abnormal', shell=True)
    # the abnormal cell's own nucleus, drawn darker, so a viewer sees a cell
    abn = K.sphere(1.5, (5.2, 0.3, 0), K.mat('abnormal-nucleus', 0x9d0208, 0.5), seg=(28, 18), name='abn')
    K.lumpy(abn, 0.25, 0.8, 4)
    abn = K.apply(abn)
    K.part(adopt(abn, ab), 'abnormal')
    ab_pivot = empty('ab-at', (4.2, 0, 0))
    adopt(ab, ab_pivot)
    gm = K.mat('golgi', 0xf2c14e, 0.45)
    golgi = empty('golgi-at')
    for k in range(4):
        c = arc(1.0 - 0.12 * k, 0.1, 2.2, gm, 'golgi')
        c.rotation_mode = 'QUATERNION'
        c.rotation_quaternion = q_three((0, 0, 1), -1.1)
        c.location = T((-0.25 * k, 0, 0))
        c.parent = golgi
        K.part(c, 'golgi')
    vm, pm, rm = K.mat('vesicles', 0xb5179e, 0.45), K.mat('perforin', 0xf72585, 0.45), K.mat('pores', 0x7209b7, 0.45)
    ves = [K.part(K.sphere(0.24, (0, 0, 0), vm, seg=(14, 10)), 'vesicles') for _ in range(6)]
    mol = [K.part(K.between((-0.28, 0, 0), (0.28, 0, 0), 0.05, pm, 'perforin', seg=6), 'perforin') for _ in range(18)]
    pores = []
    for i in range(5):
        # a pore: a ring of perforin molecules standing in the membrane
        ring = [K.between((0, 0.32 * math.cos(a), 0.32 * math.sin(a)), (0.3, 0.32 * math.cos(a), 0.32 * math.sin(a)), 0.06, rm, 'p', seg=5)
                for a in [j * 2 * math.pi / 10 for j in range(10)]]
        pores.append(K.part(K.join(ring, 'pores'), 'pores'))
    an = anchors(('nkcell', 'golgi', 'vesicles', 'perforin', 'pores'))
    K.anchor('abnormal', (5.5, 3.6, 0.8))

    def place(s, frame):
        p = stage_prog(s, 4)
        adh, re, sec, lys = p(0), p(1), p(2), p(3)
        nk_x = mix(-5.5, -3.55, span(adh, 0, 1))
        tr.pose(nkg, frame, V(nk_x, 0, 0), scale=1)
        contact = V(nk_x + 3.6, 0, 0)
        gp = lerp(V(nk_x - 1.2, 1.2, 0), V(nk_x + 1.8, 0.3, 0), span(re, 0, 1))
        tr.pose(golgi, frame, gp, q_three((0, 0, 1), mix(0, -0.6, span(re, 0, 1))))
        tr.pose(an['golgi'], frame, gp + V(0, 0.9, 0.3))
        von = re > 0.4 and sec < 0.6
        for i, o in enumerate(ves):
            off = V(0, (i - 2.5) * 0.42, ((i % 2) - 0.5) * 0.5)
            q = lerp(gp + V(0.6, 0, 0) + off, contact + V(-0.5, 0, 0) + off, span(sec, 0, 0.5))
            tr.pose(o, frame, q, scale=1 if von else HIDE)
            if i == 1:
                tr.pose(an['vesicles'], frame, q + V(0, 0.3, 0.3))
        mon = sec > 0.5 and lys < 0.5
        for i, o in enumerate(mol):
            y, z = ((i % 6) - 2.5) * 0.4, (i // 6 - 1) * 0.45
            q = lerp(contact + V(-0.2, y, z), V(4.2 - 3.95, y * 0.9, z * 0.9), span(sec, 0.5, 1))
            tr.pose(o, frame, q, scale=1 if mon else HIDE)
            if i == 7:
                tr.pose(an['perforin'], frame, q + V(0, 0.3, 0.3))
        for i, o in enumerate(pores):
            y = (i - 2) * 0.7
            q = V(4.2 - math.sqrt(16 - y * y) - 0.15, y, (i % 2 - 0.5) * 0.6)
            sc = span(lys, 0, 0.5)
            tr.pose(o, frame, q, scale=sc if sc > 0.02 else HIDE)
            if i == 2:
                tr.pose(an['pores'], frame, q + V(0, 0.4, 0.3))
        tr.pose(ab_pivot, frame, scale=mix(1, 1.08, span(lys, 0.4, 1)))
        tr.pose(an['nkcell'], frame, V(nk_x - 1.5, 3.4, 0.6))
    sample(place, 4, step=2)
    tr.write()
    export('nk', ['lymphocyte'])


# ------------------------------------------------------------------ phagocytic antigen-presenting cell ----
def apc():
    """A phagocytic antigen-presenting cell ("Macrophage", andrewfrueh, made see-through) and its bacteria, as the
    drawn level: it engulfs a pathogen, a lysosome breaks it into antigenic fragments, the ER makes Class II MHC
    proteins, the fragments bind them, and they are displayed on the plasma membrane."""
    K.reset()
    R = 6
    tr = Track()
    got = PREP('macrophage')
    cellm = K.join(got['macrophage'], 'membrane')
    K.recolour(cellm, K.mat('membrane', 0xcaffbf, 0.55, alpha=0.32))
    cellm.scale = (R, R, R)
    K.part(cellm, 'membrane', shell=True)
    bugs_all = K.separate(K.join(got['bacteria'], 'bacteria'))
    bugs_all.sort(key=lambda o: -len(o.data.vertices))
    bm_ = K.mat('pathogen', 0x80b918, 0.5)
    outside = [V(9.2, 2.5, 0.6), V(8.6, -1.6, -0.8), V(10.2, 0.4, 1.4)]
    bugs = []
    for i, p in enumerate(outside):
        o = bugs_all[i]
        bpy.context.view_layer.objects.active = o
        o.select_set(True)
        bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='BOUNDS')
        o.select_set(False)
        lo, hi = K.bounds(o)
        sz = max(hi - lo)
        o.scale = (1.5 / sz,) * 3
        o.location = T(tuple(p))
        bugs.append(K.part(K.recolour(o, bm_), 'pathogen'))
    for o in bugs_all[3:]:
        bpy.data.objects.remove(o)
    nucl = K.sphere(1.8, (-2.2, -1.5, -1.5), K.mat('nucleus', 0x6a4c93, 0.5), seg=(32, 20))
    K.lumpy(nucl, 0.2, 0.8, 2)
    K.part(K.apply(nucl), 'nucleus')
    erm = K.mat('er', 0x5fa8d3, 0.5, alpha=0.85)
    sheets = []
    for k in range(3):
        rr = 2.4 + 0.45 * k
        o = K.sphere(rr, (-2.2, -1.5, -1.5), erm, seg=(40, 20), name='er')
        bmx = bmesh.new()
        bmx.from_mesh(o.data)
        c0 = Vector((0, 0, 0))
        out = []
        for f in bmx.faces:
            d = (f.calc_center_median() - c0).normalized()
            th = math.acos(max(-1, min(1, d.z)))           # Blender z is three.js y
            ph = math.atan2(-d.y, -d.x)                    # three.js phi = atan2(z, -x)
            if not (0.9 < th < 2.1 and 0.2 < (ph % (2 * math.pi)) < 1.6):
                out.append(f)
        bmesh.ops.delete(bmx, geom=out, context='FACES')
        bmx.to_mesh(o.data)
        bmx.free()
        m = o.modifiers.new('wall', 'SOLIDIFY')
        m.thickness = 0.1
        K.lumpy(o, 0.12, 0.5, k)
        sheets.append(K.apply(o))
    K.part(K.join(sheets, 'er'), 'er')
    lyso = K.part(K.sphere(0.55, (0, 0, 0), K.mat('lysosome', 0x9b5de5, 0.45), seg=(20, 14)), 'lysosome')
    vesicle = K.part(K.sphere(0.95, (0, 0, 0), K.mat('vesicle', 0xd8f3dc, 0.5, alpha=0.4), seg=(24, 16)), 'pathogen')
    fm, mm = K.mat('fragments', 0xff006e, 0.45), K.mat('mhc', 0xffbe0b, 0.45)
    frags = [K.part(K.ico(0.17, (0, 0, 0), fm, level=1), 'fragments') for _ in range(6)]
    mhc = []
    for _ in range(6):
        # a Class II MHC protein: two chains side by side, a groove at the top where a fragment sits
        a = K.between((-0.07, -0.45, 0), (-0.07, 0.4, 0), 0.08, mm, 'mhc', seg=8)
        b = K.between((0.07, -0.45, 0), (0.07, 0.4, 0), 0.08, mm, 'mhc', seg=8)
        mhc.append(K.part(K.join([a, b], 'mhc'), 'mhc'))
    an = anchors(('lysosome', 'pathogen', 'fragments', 'mhc'))
    # where each MHC protein is displayed: on the cell's own surface, along the drawn level's directions
    skin = K.bvh([cellm])
    shown = []
    for i in range(6):
        a = (i / 6) * 1.6 - 0.8
        d = V(math.cos(a) * R, math.sin(a) * R * 0.9, 1.6 + 0.3 * (i % 2)).normalized()
        hit = K.cast(skin, Vector((0, 0, 0)), T(tuple(d)))
        h = hit[1] if hit else T(tuple(d * R))
        shown.append(V(h.x, h.z, -h.y) + d * 0.1)
    K.anchor('membrane', (-R * 0.6, R * 0.6, -R * 0.3))
    K.anchor('nucleus', (-2.2, -1.5, 0.4))
    K.anchor('er', (-2.2, 1.0, -0.4))

    def place(s, frame):
        p = stage_prog(s, 5)
        eng, dig, mk, bd, dsp = p(0), p(1), p(2), p(3), p(4)
        v_at = lerp(V(R + 0.6, 1.6, 0.4), V(2.6, 1.6, 0.4), span(eng, 0, 1))
        b0 = lerp(outside[0], v_at, span(eng, 0, 0.6))
        tr.pose(bugs[0], frame, b0, scale=1 if dig < 0.5 else HIDE)
        tr.pose(vesicle, frame, v_at, scale=1 if eng > 0.5 else HIDE)
        ly = lerp(V(-1, 2.5, 0.5), v_at + V(-0.6, 0.3, 0), span(dig, 0, 0.5))
        tr.pose(lyso, frame, ly)
        tr.pose(an['lysosome'], frame, ly + V(0, 0.6, 0))
        tr.pose(an['pathogen'], frame, (b0 if dig < 0.5 else outside[1]) + V(0, 0.7, 0))
        frag_on = dig > 0.4
        mhc_from, meet = V(-0.6, 0.4, 0.8), v_at + V(-0.2, -0.2, 0)
        for i in range(6):
            shown_at = shown[i]
            jit = V(((i * 37) % 7) / 7 - 0.5, ((i * 53) % 5) / 5 - 0.5, ((i * 11) % 3) / 3 - 0.5) * 0.7
            m = lerp(lerp(mhc_from + jit, meet + jit * 0.6, span(bd, 0, 0.6)), shown_at, span(dsp, 0, 1))
            out = m.normalized() if dsp > 0.5 else V(0, 1, 0)
            q = Vector((0, 0, 1)).rotation_difference(T(tuple(out)))
            tr.pose(mhc[i], frame, m, q, min(1, mk * 1.2) if mk > 0.2 else HIDE)
            f_at = m + out * 0.55 if (bd > 0.4 or dsp > 0) else v_at + jit * 0.8
            tr.pose(frags[i], frame, f_at, scale=1 if frag_on else HIDE)
            if i == 2:
                tr.pose(an['fragments'], frame, f_at + V(0, 0.3, 0.2))
                tr.pose(an['mhc'], frame, m + V(0, -0.4, 0.3))
    sample(place, 5, step=2)
    tr.write()
    export('apc', ['macrophage'])


# ------------------------------------------------------------------ the parietal cell ----
ATOM = {'C': (0x5c5c5c, 0.2), 'O': (0xe63946, 0.22), 'H': (0xf1f1f1, 0.13)}


def molecule(atoms, name, scale=1.0):
    """a ball-and-stick molecule: atoms [(element, three.js offset)], a stick between atoms closer than 0.6"""
    objs = []
    for el, p in atoms:
        c, r = ATOM[el]
        objs.append(K.sphere(r * scale, tuple(p * scale), K.mat(f'atom-{el}', c, 0.4), seg=(14, 10)))
    stick = K.mat('stick', 0xbfc5cc, 0.5)
    for i in range(len(atoms)):
        for j in range(i + 1, len(atoms)):
            a, b = atoms[i][1] * scale, atoms[j][1] * scale
            if (a - b).length < 0.6 * scale:
                objs.append(K.between(tuple(a), tuple(b), 0.05 * scale, stick, 'stick', seg=6))
    return bake(K.join(objs, name))


def CO2():
    return [('C', V()), ('O', V(0.42, 0, 0)), ('O', V(-0.42, 0, 0))]


def H2O():
    return [('O', V()), ('H', V(0.3, 0.22, 0)), ('H', V(-0.3, 0.22, 0))]


def H2CO3():
    return [('C', V()), ('O', V(0.42, 0, 0)), ('O', V(-0.21, 0.36, 0)), ('O', V(-0.21, -0.36, 0)),
            ('H', V(-0.5, 0.5, 0)), ('H', V(-0.5, -0.5, 0))]


def HCO3():
    return [('C', V()), ('O', V(0.42, 0, 0)), ('O', V(-0.21, 0.36, 0)), ('O', V(-0.21, -0.36, 0)), ('H', V(-0.5, 0.5, 0))]


def transmembrane(at, m, n, ring, r, name, head=None):
    """a protein through a membrane (normal along x, membrane 0.9 thick at x = at.x): n helices round a ring, with an
    optional globular domain on the cytoplasmic side (head: its centre)"""
    objs = []
    for j in range(n):
        a = j * 2 * math.pi / n
        p = at + V(0, ring * math.cos(a), ring * math.sin(a))
        objs.append(K.between(tuple(p + V(-0.5, 0, 0)), tuple(p + V(0.5, 0, 0)), r, m, name, seg=10))
    if head is not None:
        h = K.sphere(0.42, tuple(head), m, seg=(20, 14), name=name)
        h.scale = (0.8, 1, 1)
        objs.append(K.apply(h))
    return K.join(objs, name)


def parietal():
    """A parietal cell making acid, laid out as Lecture 4's figure (p29): interstitial fluid on the left (basolateral
    side, with a capillary: "Enters bloodstream"), the lumen of the gastric gland on the right (apical side).
    1: carbonic anhydrase (an enzyme, one of several in the cell) joins CO2 and H2O into H2CO3, which dissociates into
    H+ and HCO3-. 4 (the slider's second step): the H+ is actively transported through a pump into the lumen.
    2: a countertransporter in the basolateral membrane swaps HCO3- out for Cl- in; the HCO3- is the alkaline tide,
    into the capillary. 3: the Cl- diffuses across the cell and leaves through open chloride channels into the lumen,
    beside the H+. Molecules are ball and stick (C grey, O red, H white); H+ and Cl- are coloured balls. Nothing is to
    scale: the proteins and ions are drawn far larger than they are against the cell."""
    K.reset()
    tr = Track()
    W = 6.0                                              # the membranes: basolateral at x = -W, apical at x = +W
    cell = flat_box((2 * W, 9, 6.4), (0, 0, 0), K.mat('cell', 0xbde0fe, 0.6, alpha=0.2), 'cell', bevel=0.9)
    wall = cell.modifiers.new('wall', 'SOLIDIFY')
    wall.thickness = 0.3
    wall.offset = 0
    K.decor(K.apply(cell), 'cell')
    K.part(flat_box((3.8, 9, 6.4), (-W - 2.2, 0, 0), K.mat('isf', 0xffd6e0, 0.8, alpha=0.16), 'isf', bevel=0.3), 'isf', shell=True)
    K.part(flat_box((3.8, 9, 6.4), (W + 2.2, 0, 0), K.mat('lumen', 0xfff3b0, 0.8, alpha=0.16), 'lumen', bevel=0.3), 'lumen', shell=True)
    K.anchor('isf', (-W - 2.2, 4.0, 2.6))
    K.anchor('lumen', (W + 2.2, 4.0, 2.6))
    CAP = V(-W - 2.4, -3.0, 0)
    vessel = K.between(tuple(CAP + V(0, 0, -3.2)), tuple(CAP + V(0, 0, 3.2)), 0.85, K.mat('capillary', 0xd62828, 0.5, alpha=0.35), 'capillary', seg=28)
    K.decor(vessel, 'capillary')
    ZS = [-1.8, 0.0, 1.8]                                 # three of everything, one behind the other
    # carbonic anhydrase: a globular enzyme, the reaction at it
    cam = K.mat('ca', 0x2a9d8f, 0.45)
    DX = [-1.3, 0.0, 1.3]                                # and spread across, so they do not hide each other
    CA = [V(-1.4 + DX[i], 2.0 - 0.25 * i, z) for i, z in enumerate(ZS)]
    for i, p in enumerate(CA):
        o = K.sphere(0.6, tuple(p), cam, seg=(28, 18), name='ca')
        o.scale = (1.15, 1.0, 0.9)
        K.lumpy(o, 0.14, 0.35, 10 + i)
        K.part(K.apply(o), 'ca')
    K.anchor('ca', tuple(CA[2] + V(0, 0.75, 0.3)))
    # the transporters, through the membranes; the KEY's colours: active transport yellow, countertransport purple
    PUMP = [V(W, 0.7 - 0.7 * i, z) for i, z in enumerate(ZS)]
    SWAP = [V(-W, -0.2 - 0.7 * i, z) for i, z in enumerate(ZS)]
    CHAN = [V(W, -2.2 - 0.6 * i, z) for i, z in enumerate(ZS)]
    pm, xm, chm = K.mat('pump', 0xffd60a, 0.45), K.mat('swap', 0x8e7cc3, 0.45), K.mat('clchannels', 0x4cc9f0, 0.45)
    for p in PUMP:
        K.decor(transmembrane(p, pm, 6, 0.3, 0.12, 'pump', head=p + V(-0.75, 0, 0)), 'pump')
    for p in SWAP:
        K.decor(transmembrane(p, xm, 6, 0.3, 0.12, 'countertransporter'), 'countertransporter')
    # a channel: five subunits round an open pore wide enough for a chloride ion
    K.part(K.join([transmembrane(p, chm, 5, 0.42, 0.15, 'channel') for p in CHAN], 'clchannels'), 'clchannels')
    K.anchor('clchannels', tuple(CHAN[2] + V(0.2, -0.7, 0.5)))
    # the molecules and ions
    MS = 1.4                                              # molecules drawn larger still, so they read
    co2 = [K.decor(molecule(CO2(), 'co2', MS), 'co2') for _ in ZS]
    h2o = [K.decor(molecule(H2O(), 'h2o', MS), 'h2o') for _ in ZS]
    h2co3 = [K.decor(molecule(H2CO3(), 'h2co3', MS), 'h2co3') for _ in ZS]
    hco3 = [K.part(molecule(HCO3(), 'hco3', MS), 'hco3') for _ in ZS]
    # H+ magenta (not red: red is oxygen here), Cl- green
    hm, clm = K.mat('hplus', 0xf72585, 0.35), K.mat('cl', 0x2dc653, 0.4)
    hplus = [K.part(K.sphere(0.24, (0, 0, 0), hm, seg=(16, 10), name='hplus'), 'hplus') for _ in ZS]
    cl = [K.part(K.sphere(0.33, (0, 0, 0), clm, seg=(16, 10), name='cl'), 'cl') for _ in ZS]
    # the alkaline tide: bicarbonate leaving the interstitial fluid into the capillary
    tide = [K.part(molecule(HCO3(), 'tide', 0.75), 'tide') for _ in range(10)]
    TIDE = [CAP + V(1.8, 2.6, 0), CAP + V(1.0, 1.4, 0), CAP + V(0.1, 0.2, 0), CAP + V(0, 0, 0)]
    K.anchor('tide', tuple(CAP + V(0.3, -1.3, 1.2)))
    an = anchors(('hplus', 'hco3', 'cl'))
    rot = [q_three((0.3, 1, 0.2), i * 1.7) for i in range(10)]

    def wob(i, t, a=0.25):
        """a little Brownian wobble"""
        return V(math.sin(t * 9.1 + i * 2.3), math.sin(t * 7.3 + i * 1.1), math.sin(t * 8.2 + i * 3.7)) * a

    def place(s, frame):
        p = stage_prog(s, 4)
        make, pump, cnt, dif = p(0), p(1), p(2), p(3)
        for i, z in enumerate(ZS):
            ca = CA[i]
            # 1: CO2 and H2O meet at the enzyme; H2CO3 forms there and drops away to dissociate
            meet, formed, split = span(make, 0.05, 0.4), span(make, 0.4, 0.5), span(make, 0.72, 0.82)
            tr.pose(co2[i], frame, lerp(V(-4.0, 3.4, z + 0.6), ca + V(-0.35, -0.75, 0), meet) + wob(i, s, 0.15 * (1 - meet)),
                    rot[i], 1 if formed < 0.5 else HIDE)
            tr.pose(h2o[i], frame, lerp(V(1.6, 3.6, z - 0.5), ca + V(0.35, -0.75, 0), meet) + wob(i + 3, s, 0.15 * (1 - meet)),
                    rot[i + 3], 1 if formed < 0.5 else HIDE)
            DROP = V(-1.0 + DX[i], 0.1 - 0.25 * i, z)
            tr.pose(h2co3[i], frame, lerp(ca + V(0, -0.85, 0), DROP, span(make, 0.5, 0.7)), rot[i + 1],
                    1 if 0.5 <= formed and split < 0.5 else HIDE)
            born = split >= 0.5
            # 4: H+ to the pump and through it into the lumen
            hp = along([DROP + V(0.5, 0, 0), PUMP[i] + V(-1.3, 0, 0), PUMP[i] + V(-0.3, 0, 0), PUMP[i] + V(1.4, 0.1, 0)], pump)
            hp = hp + V(0.5 * span(make, 0.82, 1), 0, 0) * (1 - pump) + wob(i, s, 0.1 * (1 - pump))
            tr.pose(hplus[i], frame, hp, scale=1 if born else HIDE)
            # 2: HCO3- to the countertransporter, out to the interstitial fluid, and into the capillary (the alkaline
            # tide); Cl- in through the same transporter
            bc = along([DROP + V(-0.6, 0, 0), SWAP[i] + V(1.3, 0.5, 0), SWAP[i] + V(0.3, 0.2, 0), SWAP[i] + V(-1.2, 0.5, 0)],
                       span(cnt, 0, 0.75))
            bc = bc + V(-0.5 * span(make, 0.82, 1), 0, 0) * (1 - span(cnt, 0, 0.1))
            bc = lerp(bc, CAP + V(0.2 * (i - 1), 0.15 * i, z * 0.9), span(cnt, 0.75, 1))
            tr.pose(hco3[i], frame, bc + wob(i + 6, s, 0.08), rot[i + 4], 1 if born else HIDE)
            c_in = along([SWAP[i] + V(-1.7, -0.5, 0.4), SWAP[i] + V(-1.1, -0.4, 0), SWAP[i] + V(0.3, -0.25, 0), SWAP[i] + V(1.3, -0.6, 0)],
                         span(cnt, 0.1, 0.85))
            # 3: Cl- diffuses across the cell (a wandering path) and out through a channel into the lumen
            walk_pts = [SWAP[i] + V(1.3, -0.6, 0), V(-2.5, -1.4 - 0.4 * i, z + 0.5), V(0.5, -2.6 - 0.3 * i, z - 0.4), V(3.4, -1.8 - 0.5 * i, z + 0.3),
                        CHAN[i] + V(-1.2, 0, 0), CHAN[i] + V(-0.3, 0, 0), CHAN[i] + V(1.4, 0.4, 0)]
            c = along(walk_pts, dif) if dif > 0 else c_in
            tr.pose(cl[i], frame, c + wob(i + 9, s, 0.12 * (1 - dif) if dif < 1 else 0.05))
            if i == 2:
                tr.pose(an['hplus'], frame, hp + V(0, 0.4, 0.3))
                tr.pose(an['hco3'], frame, bc + V(0, 0.55, 0.3))
                tr.pose(an['cl'], frame, c + V(0, 0.45, 0.3))
        t = span(cnt, 0.65, 1)
        for j, o in enumerate(tide):
            u = clamp01(t * 1.6 - j * 0.06)
            q = along(TIDE, u) + V(0, 0, (j - 4.5) * 0.55 * u) + V(0, -0.15 * (j % 3), 0)
            tr.pose(o, frame, q + wob(j + 12, s, 0.06), rot[j], 1 if 0.02 < u else HIDE)
    sample(place, 4, step=2)
    tr.write()
    export('parietal')


# ------------------------------------------------------------------ protein synthesis, and a hormone signal ----
def catmull(points, n=400):
    """a Catmull-Rom curve through three.js points, as a dense polyline, and point_at(u) by arc length"""
    P = [points[0]] + list(points) + [points[-1]]
    dense = []
    for i in range(1, len(P) - 2):
        p0, p1, p2, p3 = P[i - 1], P[i], P[i + 1], P[i + 2]
        for k in range(n // (len(points) - 1)):
            t = k / (n // (len(points) - 1))
            t2, t3 = t * t, t * t * t
            dense.append(0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3))
    dense.append(points[-1].copy())
    acc = [0.0]
    for a, b in zip(dense, dense[1:]):
        acc.append(acc[-1] + (b - a).length)
    total = acc[-1]

    def point_at(u):
        d = clamp01(u) * total
        lo, hi = 0, len(acc) - 1
        while hi - lo > 1:
            mid = (lo + hi) // 2
            if acc[mid] < d:
                lo = mid
            else:
                hi = mid
        seg = acc[hi] - acc[lo]
        return lerp(dense[lo], dense[hi], 0 if seg == 0 else (d - acc[lo]) / seg)
    return point_at, total


EXPRESSION_STAGES = {
    'none': ['activation', 'transcription', 'export', 'translation', 'processing'],
    'lipophilic': ['lipo_enter', 'lipo_bind', 'activation', 'transcription', 'export', 'translation', 'processing'],
    'hydrophilic': ['hydro_bind', 'hydro_camp', 'hydro_creb', 'activation', 'transcription', 'export', 'translation', 'processing'],
}
EXPRESSION_CLIPS = {'none': 0, 'lipophilic': 6, 'hydrophilic': 14}


def resample(pts, step):
    """three.js points every `step` along a polyline, and their arc lengths"""
    acc = [0.0]
    for a, b in zip(pts, pts[1:]):
        acc.append(acc[-1] + (b - a).length)
    total = acc[-1]
    n = max(2, int(round(total / step)))
    out, j = [], 0
    for i in range(n + 1):
        d = total * i / n
        while j < len(acc) - 2 and acc[j + 1] < d:
            j += 1
        seg = acc[j + 1] - acc[j]
        out.append(lerp(pts[j], pts[j + 1], 0 if seg == 0 else (d - acc[j]) / seg))
    return out, [total * i / n for i in range(n + 1)]


def frames(pts):
    """parallel-transport normals and binormals along three.js points"""
    n = len(pts)
    ts = [(pts[min(n - 1, i + 1)] - pts[max(0, i - 1)]).normalized() for i in range(n)]
    up = V(0, 0, 1) if abs(ts[0].z) < 0.9 else V(0, 1, 0)
    nn = (up - ts[0] * up.dot(ts[0])).normalized()
    ns = [nn]
    for i in range(1, n):
        axis = ts[i - 1].cross(ts[i])
        if axis.length > 1e-9:
            nn = Quaternion(axis.normalized(), ts[i - 1].angle(ts[i])) @ nn
        nn = (nn - ts[i] * nn.dot(ts[i])).normalized()
        ns.append(nn)
    return ns, [t.cross(m) for t, m in zip(ts, ns)]


def double_helix(centre, m_strand, m_rung, name, r=0.25):
    """a stretch of DNA double helix round a centre line (three.js points): two strands and a base pair every 0.34,
    a whole number of turns long so that stretches laid end to end join up"""
    pts, acc = resample(centre, 0.12)
    L = acc[-1]
    per = L / max(1, round(L / 3.4))
    ns, bs = frames(pts)
    s1, s2 = [], []
    for p, s, nn, bb in zip(pts, acc, ns, bs):
        a = 2 * math.pi * s / per
        s1.append(p + (nn * math.cos(a) + bb * math.sin(a)) * r)
        s2.append(p + (nn * math.cos(a + 2.4) + bb * math.sin(a + 2.4)) * r)
    objs = [tube(s1, 0.06, m_strand, 'strand', res=1), tube(s2, 0.06, m_strand, 'strand', res=1)]
    nr = max(1, int(L / 0.34))
    for i in range(nr):
        j = min(len(pts) - 1, int(round((i + 0.5) / nr * (len(pts) - 1))))
        objs.append(K.between(tuple(s1[j]), tuple(s2[j]), 0.035, m_rung, 'pair', seg=5))
    return K.join(objs, name)


def wrapped(x0, x1, beads, y=-3.0, Rw=1.0, pitch=0.6):
    """the centre line of DNA along x from x0 to x1 at height y, wrapped twice round a histone core hanging below it at
    each x in beads"""
    pts = [V(x0, y, 0)]
    for xb in beads:
        pts.append(V(xb - 1.0, y, 0))
        for i in range(97):
            ph = 4 * math.pi * i / 96
            pts.append(V(xb + Rw * math.sin(ph), y - Rw + Rw * math.cos(ph), -pitch + pitch * ph / (2 * math.pi)))
        pts.append(V(xb + 1.0, y, 0))
    pts.append(V(x1, y, 0))
    return pts


def histone_core(at, m, name='nucleosome'):
    """the histone core of a nucleosome, its axis along z, under the DNA wrapped round it"""
    o = K.between(tuple(at + V(0, 0, -0.55)), tuple(at + V(0, 0, 0.55)), 0.72, m, name, seg=28)
    K.lumpy(o, 0.06, 0.3, 7)
    o = bake(K.apply(o))
    o.data.transform(Matrix.Translation(-T(tuple(at))))
    o.location = T(tuple(at))
    return o


def dish(R, bend, thick, m, name):
    """a curved, flattened sac (a Golgi cisterna): a lathe about y, rim turned up by `bend`"""
    n = 14
    prof = [(0.001, thick)] + [(R * i / n, thick + bend * (i / n) ** 2) for i in range(1, n + 1)]
    prof += [(R * (n - i) / n, bend * ((n - i) / n) ** 2) for i in range(n)] + [(0.001, 0.0)]
    return lathe_mesh(prof, 36, m, name, axis='y')


def expression():
    """Protein synthesis, after Lecture 1 (pp 21-22), with a hormone signal in front of it.
    The nucleus on the left: its DNA a double helix, wound twice round histone cores (nucleosomes); the gene (gold),
    its promoter (green) and, for the lipophilic hormone, its hormone response element (pink) are stretches of that
    helix. The nuclear envelope is two membranes, joined round each nuclear pore, a ring of pore proteins on each face.
    Gene activation: the histones come off the gene and its DNA uncoils. Transcription: RNA polymerase binds at the
    promoter and runs along the gene, the mRNA growing behind it. The mRNA leaves through a nuclear pore to the rough
    ER, a flattened sac studded with ribosomes. Translation: a ribosome, its two subunits either side of the mRNA, moves
    along it; tRNAs bring amino acids in and leave without them; the polypeptide chain grows out of the ribosome
    through the ER membrane into the lumen. Processing: the chain folds in the ER and a vesicle carries it to the
    Golgi apparatus. A lipophilic hormone comes off its carrier, through the plasma membrane, to a nuclear hormone
    receptor and with it through a pore to its response element; a hydrophilic one binds a G-protein coupled
    receptor, a G-protein subunit goes to adenylate cyclase, cAMP is made, protein kinase goes to the nucleus and
    CREB onto the DNA. Each signal is its own run of the timeline (scene extras czClips: its first second)."""
    K.reset()
    tr = Track()
    # ---- the nuclear envelope: two membranes, holes through both at each pore, joined round it
    em = K.mat('envelope', 0x8f7fd6, 0.45, alpha=0.45)
    PORES = [(1.5, 0.0), (4.8, -2.6), (-1.2, 3.6), (4.6, 3.4), (-5.6, -2.8), (-6.0, 2.8), (6.6, 0.4), (1.8, -4.4)]
    walls = []
    for x in (-2.3, -1.7):
        w = K.box((0.18, 16, 12), (x, 0, 0), em, 'wall')
        for py, pz in PORES:
            hole = K.between((x - 0.5, py, pz), (x + 0.5, py, pz), 0.7, None, 'hole', seg=24)
            b = w.modifiers.new('pore', 'BOOLEAN')
            b.object = hole
            b.operation = 'DIFFERENCE'
            w = K.apply(w)
            bpy.data.objects.remove(hole)
        walls.append(w)
    for py, pz in PORES:
        walls.append(K.torus(0.78, 0.3, (-2.0, py, pz), em, 'rim', axis=(1, 0, 0), seg=(28, 10)))
    K.part(K.join(walls, 'envelope'), 'envelope', shell=True)
    K.anchor('envelope', (-2, 6.5, 3))
    pm = K.mat('pores', 0x3c2f80, 0.5)
    pore = []
    for py, pz in PORES:
        for xf in (-2.55, -1.45):
            for j in range(8):
                a = j * 2 * math.pi / 8
                pore.append(K.sphere(0.15, (xf, py + 0.62 * math.cos(a), pz + 0.62 * math.sin(a)), pm, seg=(8, 5), name='pore'))
        for j in range(8):
            a = (j + 0.5) * 2 * math.pi / 8
            pore.append(K.between((-2.55, py + 0.58 * math.cos(a), pz + 0.58 * math.sin(a)),
                                  (-1.45, py + 0.58 * math.cos(a), pz + 0.58 * math.sin(a)), 0.07, pm, 'spoke', seg=6))
    K.part(K.join(pore, 'pores'), 'pores')
    K.anchor('pores', (-1.2, 2.5, 0.6))
    # ---- the DNA, its gene wound round two nucleosomes until gene activation
    dm, rm = K.mat('dna', 0xe9ecef, 0.4), K.mat('rung', 0x9aa5b1, 0.5)
    HRE, PROM, GENE = (-11.3, -10.6), (-10.5, -9.5), (-9.4, -3.6)
    K.decor(double_helix(wrapped(-15.0, HRE[0], [-13.0]), dm, rm, 'dna'), 'dna')
    hre_plain = K.decor(double_helix([V(HRE[0], -3, 0), V(HRE[1], -3, 0)], dm, rm, 'dna'), 'dna')
    hre = K.part(double_helix([V(HRE[0], -3, 0), V(HRE[1], -3, 0)], K.mat('hre', 0xff8fab, 0.45), rm, 'hre'), 'hre')
    K.decor(double_helix([V(HRE[1], -3, 0), V(PROM[0], -3, 0)], dm, rm, 'dna'), 'dna')
    K.part(double_helix([V(PROM[0], -3, 0), V(PROM[1], -3, 0)], K.mat('promoter', 0x80ed99, 0.45), rm, 'promoter'), 'promoter')
    K.decor(double_helix([V(PROM[1], -3, 0), V(GENE[0], -3, 0)], dm, rm, 'dna'), 'dna')
    gm = K.mat('gene', 0xffb703, 0.45)
    BEADS = [-8.2, -5.0]
    gene_closed = K.part(double_helix(wrapped(GENE[0], GENE[1], BEADS), gm, rm, 'gene'), 'gene')
    gene_open = K.part(double_helix([V(GENE[0], -3, 0), V(GENE[1], -3, 0)], gm, rm, 'gene'), 'gene')
    K.anchor('hre', (sum(HRE) / 2, -2.2, 0.6))
    K.anchor('promoter', (sum(PROM) / 2, -2.2, 0.6))
    hm_ = K.mat('histone', 0x7aa6e0, 0.5)
    K.decor(histone_core(V(-13.0, -4.0, 0), hm_), 'nucleosome')
    cores = [K.decor(histone_core(V(x, -4.0, 0), hm_), 'nucleosome') for x in BEADS]
    an_gene = empty('cz-anchor-gene')
    an_gene['czAnchorOf'] = 'gene'
    # ---- RNA polymerase: a protein that clamps the DNA
    pol = K.sphere(0.85, (0, 0, 0), K.mat('polymerase', 0x06d6a0, 0.45), seg=(32, 20))
    pol.scale = (1.1, 0.9, 0.9)
    K.lumpy(pol, 0.16, 0.45, 2)
    pol = K.part(K.apply(pol), 'polymerase')
    # ---- the mRNA: 39 short pieces, each posed between two of its points
    mm = K.mat('mrna', 0xef476f, 0.45)
    M, STEP = 40, 0.22
    seg = [K.part(unit_rod(mm, 'mrna', seg=6), 'mrna') for _ in range(M - 1)]
    joints = [K.part(K.sphere(0.12, (0, 0, 0), mm, seg=(8, 6), name='mrna'), 'mrna') for _ in range(M)]
    ER_TOP, ER_Y = -2.15, -2.55
    MR = ER_TOP + 0.7                                    # the height the mRNA lies at, between a ribosome's subunits
    point_at, TL = catmull([V(-6.4, -1.6, 0.4), V(-3.6, 0.9, 0), V(-2, 1.5, 0), V(0.4, 1.3, 0), V(1.3, -0.6, 0),
                            V(2.3, MR, 0), V(9.6, MR, 0)])
    # ---- the rough ER: a flattened sac, ribosomes bound to its cytoplasmic face
    er_parts = [flat_box((9.0, 0.8, 7.0), (5.0, ER_Y, 0), K.mat('rer', 0x5fa8d3, 0.5, alpha=0.4), 'rer', bevel=0.38, lump=0.08)]
    big, small = K.mat('ribo-large', 0x24395c, 0.5), K.mat('ribo-small', 0x3a5a80, 0.5)
    rnd = random.Random(7)
    for i in range(34):
        x, z = 1.0 + rnd.random() * 8.0, (rnd.random() - 0.5) * 6.2
        if abs(z) < 0.9:
            z = 0.9 * (1 if z >= 0 else -1) + z
        lg = K.sphere(0.3, (x, ER_TOP + 0.2, z), big, seg=(10, 7), name='bound')
        lg.scale = (1.15, 1, 0.75)
        er_parts += [K.apply(lg), K.sphere(0.2, (x, ER_TOP + 0.58, z), small, seg=(8, 6), name='bound')]
    K.part(K.join(er_parts, 'rer'), 'rer', shell=True)
    K.anchor('rer', (2.0, ER_TOP + 0.2, 3.5))
    # ---- the translating ribosome: the large subunit on the ER membrane, the small one above, the mRNA between
    ribo = empty('ribosome-at')
    for r, y, sc, mtl in ((0.42, -0.4, (1.15, 0.75, 1.0), big), (0.3, 0.3, (1.1, 0.7, 0.95), small)):
        o = K.sphere(r, (0, y, 0), mtl, seg=(22, 14), name='ribosome')
        o.scale = (sc[0], sc[2], sc[1])
        o = K.apply(o)
        o.parent = ribo
        K.part(o, 'ribosome')
    # ---- tRNAs: an L, the anticodon end at the mRNA, the amino acid at the other end
    tm, aam = K.mat('trna', 0xb5838d, 0.5), K.mat('chain', 0xffd166, 0.45)
    trnas, aas = [], []
    for _ in range(3):
        g = empty('trna-at')
        for a, b in (((0, 0, 0), (0, -0.55, 0)), ((0, -0.55, 0), (0.42, -0.55, 0))):
            o = K.between(a, b, 0.075, tm, 'trna', seg=8)
            o.parent = g
            K.part(o, 'trna')
        aa = K.sphere(0.12, (0.52, -0.55, 0), aam, seg=(10, 8), name='aa')
        aa.parent = g
        K.part(aa, 'trna')
        trnas.append(g)
        aas.append(aa)
    NB, SP = 24, 0.25
    chain = [K.part(K.sphere(0.12, (0, 0, 0), aam, seg=(10, 8)), 'chain') for _ in range(NB)]
    X0 = 2.8                                              # where translation starts on the mRNA
    # ---- processing: a transport vesicle from the ER to the Golgi apparatus (unlabelled here)
    ves = K.decor(K.sphere(0.55, (0, 0, 0), K.mat('vesicle', 0xf7e1a0, 0.4, alpha=0.4), seg=(22, 14), name='vesicle'), 'vesicle')
    GOLGI = V(4.6, -5.6, 1.4)
    gom = K.mat('golgi', 0xf2c14e, 0.45)
    for k in range(4):
        d = dish(1.45 - 0.1 * k, 0.16, 0.11, gom, 'golgi')
        d.location = T(tuple(GOLGI + V(0, -0.3 * k, 0)))
        d.rotation_mode = 'QUATERNION'
        d.rotation_quaternion = q_three((1, 0, 0), 0.55)
        K.decor(d, 'golgi')
    FOLD = V(5.4, ER_Y, -0.3)
    # ---- the plasma membrane on the right, the extracellular fluid beyond it
    K.part(flat_box((0.6, 16, 12), (11.5, 0, 0), K.mat('membrane', 0xe7a0b4, 0.5, alpha=0.45), 'membrane', bevel=0.2), 'membrane', shell=True)
    K.anchor('membrane', (11.5, 6.5, 3))
    # ---- the lipophilic hormone, its carrier and the nuclear hormone receptor
    carrier = K.sphere(0.8, (14.6, 4, 0), K.mat('carrier', 0x8d99ae, 0.5), seg=(24, 16))
    K.lumpy(carrier, 0.12, 0.4, 3)
    carrier = K.part(K.apply(carrier), 'carrier')
    lipo = K.part(K.sphere(0.32, (0, 0, 0), K.mat('lipo', 0xffd60a, 0.4), seg=(16, 10)), 'lipo')
    nhr = K.sphere(0.5, (0, 0, 0), K.mat('nreceptor', 0xff8fab, 0.45), seg=(24, 16))
    K.lumpy(nhr, 0.1, 0.4, 4)
    nhr = K.part(K.apply(nhr), 'nreceptor')
    # ---- the hydrophilic hormone, its G-protein coupled receptor (seven helices across the membrane), the G-protein
    # subunit, adenylate cyclase, cAMP, protein kinase and CREB
    hydro = K.part(K.sphere(0.4, (0, 0, 0), K.mat('hydro', 0x4cc9f0, 0.4), seg=(16, 10)), 'hydro')
    gp_m, ac_m = K.mat('gpcr', 0x4361ee, 0.45), K.mat('ac', 0x7209b7, 0.45)
    g7 = [K.between((10.9, -2.5 + 0.48 * math.cos(i * 2 * math.pi / 7), 2 + 0.48 * math.sin(i * 2 * math.pi / 7)),
                    (12.1, -2.5 + 0.48 * math.cos(i * 2 * math.pi / 7), 2 + 0.48 * math.sin(i * 2 * math.pi / 7)), 0.17, gp_m, 'gpcr', seg=10) for i in range(7)]
    gpcr = K.part(K.join(g7, 'gpcr'), 'gpcr')
    a6 = [K.between((10.9, -5.8 + 0.45 * math.cos(i * 2 * math.pi / 6), -1 + 0.45 * math.sin(i * 2 * math.pi / 6)),
                    (12.1, -5.8 + 0.45 * math.cos(i * 2 * math.pi / 6), -1 + 0.45 * math.sin(i * 2 * math.pi / 6)), 0.2, ac_m, 'ac', seg=10) for i in range(6)]
    ac = K.part(K.join(a6, 'ac'), 'ac')
    K.anchor('gpcr', (11.5, -1.6, 2.5))
    K.anchor('ac', (11.5, -4.9, -1))
    gpr = K.part(K.sphere(0.34, (0, 0, 0), K.mat('gprotein', 0xb5179e, 0.45), seg=(16, 10)), 'gprotein')
    camp_pts = [V(math.cos(i * 2.4), math.sin(i * 1.7), math.sin(i * 3.1)).normalized() for i in range(14)]
    camp_m = K.mat('camp', 0xf72585, 0.45)
    camp = [K.part(K.sphere(0.2, (0, 0, 0), camp_m, seg=(10, 8)), 'camp') for _ in range(14)]
    camp_at = V(10.0, -5.8, -1)
    K.anchor('camp', tuple(camp_at + V(-1.4, 0.6, 0)))
    kin = K.sphere(0.5, (0, 0, 0), K.mat('kinase', 0xffb703, 0.45), seg=(24, 16))
    K.lumpy(kin, 0.1, 0.4, 6)
    kin = K.part(K.apply(kin), 'kinase')
    creb = K.part(K.sphere(0.45, (0, 0, 0), K.mat('creb', 0xfb5607, 0.45), seg=(20, 14)), 'creb')
    an = anchors(('mrna', 'ribosome', 'trna', 'chain'))
    hydro_parts = [hydro, gpcr, gpr, ac, kin, creb] + camp

    def place(signal, s, frame):
        ids = EXPRESSION_STAGES[signal]
        k = min(len(ids) - 1, int(math.floor(s)))
        f = s - k

        def prog(i):
            if i not in ids:
                return 0.0
            j = ids.index(i)
            return 1.0 if k > j else 0.0 if k < j else f
        lipo_on, hydro_on = signal == 'lipophilic', signal == 'hydrophilic'
        tr.pose(hre, frame, scale=1 if lipo_on else HIDE)
        tr.pose(hre_plain, frame, scale=HIDE if lipo_on else 1)
        if not lipo_on:
            for o in (lipo, carrier, nhr):
                tr.pose(o, frame, scale=HIDE)
        else:
            a, b = prog('lipo_enter'), prog('lipo_bind')
            h = along([V(14.6, 4.75, 0), V(13.4, 4.4, 0), V(9.6, 3.9, 0.8), V(5, 4.15, 1.5)], a)
            rr = along([V(5, 3.5, 1.5), V(0.4, 1.5, 0), V(-3.6, 1.5, 0), V(-8.0, -0.6, 0.3), V(sum(HRE) / 2, -2.3, 0.3)], b)
            tr.pose(nhr, frame, rr, scale=1)
            tr.pose(lipo, frame, rr + V(0, 0.55, 0) if b > 0 else h, scale=1)
            tr.pose(carrier, frame, scale=1)
        if not hydro_on:
            for o in hydro_parts:
                tr.pose(o, frame, scale=HIDE)
        else:
            a, c, d = prog('hydro_bind'), prog('hydro_camp'), prog('hydro_creb')
            tr.pose(hydro, frame, lerp(V(14.6, -2.5, 2), V(12.45, -2.5, 2), span(a, 0, 0.5)), scale=1)
            tr.pose(gpr, frame, lerp(V(10.5, -2.5, 2), V(10.5, -5.4, -1), span(a, 0.5, 1)), scale=1)
            tr.pose(gpcr, frame, scale=1)
            tr.pose(ac, frame, scale=1)
            for i, o in enumerate(camp):
                p = camp_at + camp_pts[i] * (0.4 + 1.6 * c * ((i % 4) + 1) / 4) + V(-1.0 * c, 0.3 * c, 0)
                tr.pose(o, frame, p, scale=1 if c > 0.02 else HIDE)
            # protein kinase round the end of the ER and in through a nuclear pore; CREB onto the DNA by the promoter
            tr.pose(kin, frame, along([V(9.2, -5.0, -1.2), V(10.2, -3.6, -1.0), V(10.2, -1.0, -0.4), V(6.0, 0.8, 0.4), V(1.0, 1.4, 0.2),
                                       V(-0.6, 1.5, 0), V(-3.6, 1.3, 0.6)], span(d, 0, 0.6)), scale=1)
            tr.pose(creb, frame, lerp(V(-6.0, 1.0, 1.0), V(sum(PROM) / 2 - 0.3, -2.3, 0.5), span(d, 0.5, 1)), scale=1)
        act, trn, ex, tl, pr = prog('activation'), prog('transcription'), prog('export'), prog('translation'), prog('processing')
        # gene activation: the histones come off the gene and its DNA uncoils
        opened = act >= 0.5
        tr.pose(gene_closed, frame, scale=HIDE if opened else 1)
        tr.pose(gene_open, frame, scale=1 if opened else HIDE)
        off = span(act, 0.5, 1)
        for x, o in zip(BEADS, cores):
            tr.pose(o, frame, V(x + (0.6 if x > -6 else -0.6) * off, -4.0 - 2.2 * off, 0.8 * off), scale=1 - off if off < 0.95 else HIDE)
        tr.pose(an_gene, frame, V(-6.5, -2.0, 0.8) if opened else V(-6.6, -1.9, 0.9))
        # transcription: RNA polymerase onto the promoter, along the gene, and off it
        pol_at = lerp(lerp(lerp(V(-10.0, 0.2, 1.8), V(sum(PROM) / 2, -3, 0), span(act, 0.4, 1)), V(-4.0, -3, 0), trn),
                      V(-4.6, -0.6, 2.2), span(ex, 0, 0.4))
        tr.pose(pol, frame, pol_at)
        pts = None
        if trn > 0.02:
            n = max(3, round(M * trn))
            frm = lerp(V(sum(PROM) / 2, -3, 0), V(-4.0, -3, 0), trn) + V(0, 0.9, 0)
            made = [frm + V(-0.16 * j, 0.1 * j + 0.3 * math.sin(j * 0.6), 0.3 * math.cos(j * 0.5)) for j in range(n)]
            pts = made
            if ex > 0 or tl > 0 or pr > 0:
                w = mix(0, TL - M * STEP, span(ex, 0.2, 1))
                on_track = [point_at((w + (M - 1 - j) * STEP) / TL) for j in range(M)]
                blend = span(ex, 0, 0.3)
                pts = [lerp(made[j] if j < len(made) else made[-1], p, blend) for j, p in enumerate(on_track)]
        for j in range(M - 1):
            ok = pts is not None and j + 1 < len(pts)
            tr.rod(seg[j], frame, pts[j] if ok else V(), pts[j + 1] if ok else V(), 0.12, ok)
        for j in range(M):
            ok = pts is not None and j < len(pts)
            tr.pose(joints[j], frame, pts[j] if ok else None, scale=1 if ok else HIDE)
        if pts:
            tr.pose(an['mrna'], frame, pts[len(pts) // 3] + V(0, 0.3, 0))
        # translation: the ribosome moves one amino acid's width along the mRNA for each amino acid added
        made_n = NB * span(tl, 0.05, 0.95)
        rp = V(X0 + SP * made_n, MR, 0)
        on = ex > 0.95 or tl > 0 or pr > 0
        tr.pose(ribo, frame, rp, scale=1 if on else HIDE)
        tr.pose(an['ribosome'], frame, rp + V(0, 0.9, 0))
        tr.pose(an['trna'], frame, rp + V(-0.3, 1.5, 0.9))
        for i, g in enumerate(trnas):
            ph = (tl * 6 + i / 3) % 1
            dock = rp + V(0.2, 0.02, 0.55)
            p = (lerp(rp + V(0.9, 1.6, 1.0), dock, span(ph, 0, 0.35)) if ph < 0.35 else dock if ph < 0.65
                 else lerp(dock, rp + V(-1.0, 1.5, 1.0), span(ph, 0.65, 1)))
            vis = 0.04 < tl < 0.96
            tr.pose(g, frame, p, scale=1 if vis else HIDE)
            tr.pose(aas[i], frame, V(0.52, -0.55, 0), scale=1 if ph < 0.55 else HIDE)
        # the chain: out of the large subunit, through the ER membrane, lying in the lumen behind the ribosome
        nb = int(made_n)
        mid = None
        ves_at = lerp(FOLD + V(0, -0.85, 0), GOLGI + V(0, 0.75, 0), span(pr, 0.5, 0.85))
        for b, o in enumerate(chain):
            j = nb - 1 - b
            if j <= 0:
                q = rp + V(-0.05, -0.75, 0)
            elif j == 1:
                q = V(rp.x - 0.15, ER_TOP - 0.15, 0)
            else:
                q = V(X0 + SP * (b + 1) - 0.25, ER_Y - 0.05 + 0.12 * math.sin(b * 1.3), 0.18 * math.cos(b * 0.9))
            ball = FOLD + V(math.sin(b * 2.1), math.cos(b * 1.3) * 0.6, math.sin(b * 0.7)) * 0.32
            q = lerp(q, ball, span(pr, 0, 0.3))
            q = lerp(q, ves_at + (ball - FOLD), span(pr, 0.35, 0.5))
            if pr >= 0.5:
                q = ves_at + (ball - FOLD)
            q = lerp(q, GOLGI + V(0, 0.08, 0) + (ball - FOLD) * 0.8, span(pr, 0.86, 1))
            tr.pose(o, frame, q, scale=1 if (b < nb and tl > 0.04) else HIDE)
            if b == nb // 2:
                mid = q
        bud = span(pr, 0.33, 0.5) * (1 - span(pr, 0.85, 0.92))
        tr.pose(ves, frame, ves_at if pr >= 0.5 else FOLD + V(0, -0.85, 0), scale=bud if bud > 0.03 else HIDE)
        if mid is not None:
            tr.pose(an['chain'], frame, mid + V(0, 0.35, 0.3))
    for signal, off in EXPRESSION_CLIPS.items():
        n = len(EXPRESSION_STAGES[signal])
        for f in range(0, n * FPS + 1, 2):
            place(signal, f / FPS, off * FPS + f)
    tr.write()
    export('expression', [], clips=dict(EXPRESSION_CLIPS))
