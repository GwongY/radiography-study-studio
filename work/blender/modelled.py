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
    kinetochore. An empty at the waist carries them; scale it to the chromatid's length. g['body'] and g['kin'] name
    the body and the kinetochore, which anaphase moves (pull())."""
    g = empty(name)
    body = tpl.copy()
    body.data = tpl.data.copy()
    K.link(body)
    K.recolour(body, colour_mat)
    body.parent = g
    K.part(body, 'sisters')
    g['body'] = body.name
    ball = K.sphere(0.07, (0, 0, 0), cen_mat, seg=(14, 8), name='cen')
    ball.parent = g
    K.part(ball, cen_part)
    if kin:
        k = K.between((-0.02, 0, 0), (0.02, 0, 0), 0.07, kin_mat, 'kin', seg=14)
        bake(k)
        k.parent = g
        k.location = T((sgn * (width + 0.02), 0, 0))
        K.part(k, 'kinetochore')
        g['kin'] = k.name
    return g


def pull(tr, g, frame, sgn, width, u):
    """anaphase on one chromatid, u from 0 (still as at metaphase) to 1 (pulled): its centromere leads toward its pole
    and its arms trail behind toward the equator, so the body turns over in x (the waist stays put: the arms, which
    splay toward the pole at metaphase, swing round to the other side) and the kinetochore moves to the leading face.
    Returns where, along the chromatid's own x and in its units, the kinetochore's outer face is."""
    tr.pose(bpy.data.objects[g['body']], frame, V(), Quaternion(), (mix(1, -1, u), 1, 1))
    # the body's waist runs from 0 (the face it shared with its sister) to sgn * width; turned over, to -sgn * width,
    # and the leading face is then the centromere ball's (radius 0.07) on the pole side
    kx = mix(width + 0.02, 0.09, u)
    if 'kin' in g:
        tr.pose(bpy.data.objects[g['kin']], frame, V(sgn * kx, 0, 0))
    return sgn * (kx + 0.02)


def bake(o):
    """put an object's transform into its mesh: the object then sits at the origin with no rotation or scale"""
    bpy.context.view_layer.update()
    o.data.transform(o.matrix_world)
    o.matrix_world = Matrix.Identity(4)
    return o


def centriole(m, L=1.0, name='centriole', blades=range(9)):
    """one centriole: nine triplets of microtubules round an empty centre (the 9 + 0 array), L long along three.js +y
    from its proximal end (the object's origin), 0.5 across. Each triplet is a blade of three fused tubules leaning
    out from the tangent, as a pinwheel seen end on; each tubule is hollow, so the 27 rings read end on."""
    bm = bmesh.new()
    rA, step, lean = 0.155, 0.058, math.radians(50)
    ro, ri, n = 0.031, 0.018, 10
    for i in blades:
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


def aim(o, direction, at):
    """turn an object built along three.js +y so that +y points along `direction`, its origin moved to `at`"""
    o.rotation_mode = 'QUATERNION'
    o.rotation_quaternion = Vector((0, 0, 1)).rotation_difference(T(tuple(direction)).normalized())
    o.location = T(tuple(at))
    return bake(o)


# ------------------------------------------------------------------ the centrosome ----
TRIPLET = dict(rA=0.155, step=0.058, lean=math.radians(50))


def blade_centre(i):
    """the middle tubule of triplet i of a centriole, in its built frame (three.js, at y = 0)"""
    ang = i * 2 * math.pi / 9
    out = V(math.cos(ang), 0, math.sin(ang))
    along = V(-math.sin(ang), 0, math.cos(ang))
    d = along * math.cos(TRIPLET['lean']) + out * math.sin(TRIPLET['lean'])
    return out * TRIPLET['rA'] + d * TRIPLET['step']


def centrosome():
    """Centrosome and Centrioles (L1 p5): "Cytoplasm contains two centrioles at right angles; each centriole is
    composed of 9 microtubule triplets in a 9 + 0 array". Two centrioles (centriole(): nine triplets of hollow
    tubules round an empty centre), one turned end on toward the opening view so the 9 + 0 array reads, the other
    across it at right angles; the centrosome's matrix round them; One triplet of the end-on centriole is its own part, so its label points at a
    triplet. Replaces the "Structure of Centrosome" download, whose centrioles are not nine triplets (86 tubes)."""
    K.reset()
    S = 4.0                                              # a centriole drawn 4 long
    view = V(1, 0.6, 1).normalized()
    VIEW['centrosome'] = [1, 0.6, 1]                     # the app opens on this view, so the 9 + 0 array faces it
    axis = (view + V(0.02, -0.01, -0.01)).normalized()   # end on (a hair off, so the tubules' length just shows)
    up = (V(0, 1, 0) - view * view.y).normalized()       # up on the screen
    right = V(0, 1, 0).cross(view).normalized()          # right on the screen (the camera's x)
    base = -axis * S * 0.5                               # the end-on centriole's proximal end; its distal end faces us
    q = Vector((0, 0, 1)).rotation_difference(T(tuple(axis)).normalized())
    at_screen = lambda i: three_of(q @ (T(tuple(blade_centre(i) + V(0, 1.0, 0))) * S) + T(tuple(base)))
    lone = max(range(9), key=lambda i: at_screen(i).dot(right))   # the triplet on the screen's right, labelled
    ctm, tpm = K.mat('centrioles', 0xffb703, 0.45), K.mat('triplets', 0xfb5607, 0.4)
    a = centriole(ctm, 1.0, 'a', blades=[i for i in range(9) if i != lone])
    a.scale = (S, S, S)
    a = aim(a, axis, base)
    t = centriole(tpm, 1.0, 'triplet', blades=[lone])
    t.scale = (S, S, S)
    K.part(aim(t, axis, base), 'triplets')
    b = centriole(ctm, 1.0, 'b')
    b.scale = (S, S, S)
    b_at = -right * 2.6 - up * S * 0.5 - view * 1.2     # to the left, upright on the screen: at right angles to the first
    b = aim(b, up, b_at)
    K.part(K.join([a, b], 'centrioles'), 'centrioles')
    # the centrosome: a soft matrix round both
    halo = K.ico(1.0, (-0.6, 0, 0), K.mat('centrosome', 0xffe08a, 0.75, alpha=0.12), level=4, name='centrosome')
    halo.scale = (S * 0.95, S * 0.95, S * 0.95)
    K.lumpy(halo, 0.3, 1.1, 3)
    K.part(K.apply(halo), 'centrosome', shell=True)
    K.anchor('triplets', T(tuple(at_screen(lone) + right * 0.35)))
    K.anchor('centrioles', T(tuple(b_at + up * S * 0.95)))
    K.anchor('centrosome', T((0, S * 1.0, 0)))
    export('centrosome')


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


def kinetochore_at(at, rot, face, length):
    """where a chromatid's kinetochore microtubule ends: the chromatid's empty is at `at`, turned rot about z and
    scaled to `length`; the kinetochore's outer face is `face` along the chromatid's own x (pull() says where)"""
    d = face * length
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
    spindle = spindle_rods(32)
    astral = [V(0, math.cos(i / 8 * 2 * math.pi), math.sin(i / 8 * 2 * math.pi) * 0.6) for i in range(8)]
    # the fibres that "extend between centriole pairs" (L1 old p37): each pole's half meets the other's at the
    # equator, in front of and behind the plate, so each reads as one fibre from pole to pole; no free ends
    polar = [V(0, sy * 2.4, sz * 1.7) for sy in (-1, 1) for sz in (-1, 1)]
    an = anchors(('envelope', 'chromatin', 'centrioles', 'spindle'))
    K.anchor('membrane', (0, 7.6, 2.2))
    K.anchor('daughters', (6.6, 6.0, 1.2))
    N = len(CYCLE_STAGES)

    def outline(s):
        """the cell outline (radius, centres apart, pinch) at slider value s: the poles pushed apart in anaphase
        stretch it into an oval and a cleavage furrow starts at the equator late in it; pinched deeper in
        telophase; two daughters by the end of cytokinesis"""
        k = min(N - 1, int(math.floor(s)))
        f = s - k
        at = lambda i: 1.0 if k > i else 0.0 if k < i else f
        ana, telo, cyto = at(5), at(6), at(7)
        Rm, d, pinch = R, 0.0, 0.0
        if k >= 5:
            Rm, d, pinch = mix(R, 7.0, ana), mix(0, 2.6, ana), 0.12 * span(ana, 0.4, 1)
        if k >= 6:
            Rm, d, pinch = 7.0, mix(2.6, 3.2, telo), mix(0.12, 0.4, telo)
        if k >= 7:
            Rm, d, pinch = mix(7.0, 6.2, cyto), mix(3.2, 6.6, cyto), mix(0.4, 1, cyto)
        return Rm, d, pinch
    XS = [5.25, 5.5, 5.75, 6.0, 6.5, 7.0, 7.3, 7.6, 7.85, 8.0]
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
        # the poles: pushed apart through anaphase (the overlapping polar microtubules), then with each daughter
        cx = mix(5.8, 6.6, cyto) if k >= 7 else 5.8
        pole = cx + 1.8 if k >= 7 else 7.6 if k >= 6 else 5.8 + 1.8 * ana if k >= 5 else 5.8
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
                    # by the end of anaphase the kinetochore microtubules are nearly gone: each set a tight
                    # cluster right by its centrioles
                    u = 1 if k > 5 else span(ana, 0, 0.85)
                    x = sgn * mix(0.3, pole - 0.6, u)
                    y, z = PLATE[i] * mix(1, 0.3, u), mix(z, 0.8 if i % 2 else -0.8, u)
                sc = mix(0.4, 1, span(f, 0.1, 0.7)) if k == 3 else 1
                g_at = V(x - sgn * 0.3, y, z)
                tr.pose(g, frame, g_at, q_three((0, 0, 1), rot), (L * sc) if cond > 0.15 else HIDE)
                # parted, each chromatid goes centromere first, its arms trailing
                face = pull(tr, g, frame, sgn, width, 0 if k < 5 else span(ana, 0, 0.25) if k == 5 else 1)
                kins.append((sgn, kinetochore_at(g_at, rot, face, L * sc)))
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
        # the spindle: astral microtubules and the pole-to-pole fibres from the poles in prophase; kinetochore ones
        # reach each sister's kinetochore at the end of prophase, shorten as anaphase pulls the sisters to the poles;
        # the pole-to-pole fibres lengthen as the poles part; all go in telophase
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
                fibre(tr, spindle[r], frame, p, q, sp, 0.035, True)
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
    # the fibres that "extend between centriole pairs" (L1 old p37): each pole's half meets the other pole's at the
    # middle of the cell, in front of and behind the chromosomes, so each is one fibre from pole to pole
    polar = [(sy * 1.6, sz * 1.2) for sy in (-1, 1) for sz in (-1, 1)]
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
                # meiosis II parts the sisters: each goes centromere first, its arms trailing (meiosis I keeps each
                # homologue's sisters together, so they keep their shape)
                lead = pull(tr, g, frame, sgn, width, span(mII, 0.3, 0.45) if k == 3 else 1 if k > 3 else 0)
                face = waist + Quaternion((0, 0, 1), theta) @ V(lead * L, 0, 0)
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
            across = V(abs(toward.y), abs(toward.x), 0)   # the same for both poles of a cell, so the halves meet
            for a, z in polar:
                end = centre_of_cell + across * a + V(0, 0, z)
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


def molecule(atoms, name, scale=1.0, seg=(14, 10)):
    """a ball-and-stick molecule: atoms [(element, three.js offset)], a stick between atoms closer than 0.6. Its
    materials are its own (named after it), so lighting one labelled molecule never lights another."""
    objs = []
    for el, p in atoms:
        c, r = ATOM[el]
        objs.append(K.sphere(r * scale, tuple(p * scale), K.mat(f'{name}-{el}', c, 0.4), seg=seg))
    stick = K.mat(f'{name}-stick', 0xbfc5cc, 0.5)
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
    K.part(K.apply(cell), 'cell', shell=True)
    K.anchor('cell', (-1.0, 4.9, 2.8))
    K.part(flat_box((3.8, 9, 6.4), (-W - 2.2, 0, 0), K.mat('isf', 0xffd6e0, 0.8, alpha=0.16), 'isf', bevel=0.3), 'isf', shell=True)
    K.part(flat_box((3.8, 9, 6.4), (W + 2.2, 0, 0), K.mat('lumen', 0xfff3b0, 0.8, alpha=0.16), 'lumen', bevel=0.3), 'lumen', shell=True)
    K.anchor('isf', (-W - 2.2, 4.0, 2.6))
    K.anchor('lumen', (W + 2.2, 4.0, 2.6))
    CAP = V(-W - 2.4, -3.0, 0)
    vessel = K.between(tuple(CAP + V(0, 0, -3.2)), tuple(CAP + V(0, 0, 3.2)), 0.85, K.mat('capillary', 0xd62828, 0.5, alpha=0.35), 'capillary', seg=28)
    K.part(vessel, 'blood', shell=True)
    K.anchor('blood', tuple(CAP + V(0.4, -0.9, -2.6)))
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
    K.part(K.join([transmembrane(p, pm, 6, 0.3, 0.12, 'pump', head=p + V(-0.75, 0, 0)) for p in PUMP], 'pump'), 'pump')
    K.part(K.join([transmembrane(p, xm, 6, 0.3, 0.12, 'counter') for p in SWAP], 'counter'), 'counter')
    K.anchor('pump', tuple(PUMP[0] + V(0.3, 0.75, 0.4)))
    K.anchor('counter', tuple(SWAP[0] + V(-0.3, 0.75, 0.4)))
    # a channel: five subunits round an open pore wide enough for a chloride ion
    K.part(K.join([transmembrane(p, chm, 5, 0.42, 0.15, 'channel') for p in CHAN], 'clchannels'), 'clchannels')
    K.anchor('clchannels', tuple(CHAN[2] + V(0.2, -0.7, 0.5)))
    # the molecules and ions
    MS = 1.4                                              # molecules drawn larger still, so they read
    co2 = [K.part(molecule(CO2(), 'co2', MS), 'co2') for _ in ZS]
    h2o = [K.part(molecule(H2O(), 'h2o', MS), 'h2o') for _ in ZS]
    h2co3 = [K.part(molecule(H2CO3(), 'h2co3', MS), 'h2co3') for _ in ZS]
    hco3 = [K.part(molecule(HCO3(), 'hco3', MS), 'hco3') for _ in ZS]
    # H+ magenta (not red: red is oxygen here), Cl- green
    hm, clm = K.mat('hplus', 0xf72585, 0.35), K.mat('cl', 0x2dc653, 0.4)
    hplus = [K.part(K.sphere(0.24, (0, 0, 0), hm, seg=(16, 10), name='hplus'), 'hplus') for _ in ZS]
    cl = [K.part(K.sphere(0.33, (0, 0, 0), clm, seg=(16, 10), name='cl'), 'cl') for _ in ZS]
    # the alkaline tide: bicarbonate leaving the interstitial fluid into the capillary
    tide = [K.part(molecule(HCO3(), 'tide', 0.75, seg=(10, 7)), 'tide') for _ in range(10)]
    TIDE = [CAP + V(1.8, 2.6, 0), CAP + V(1.0, 1.4, 0), CAP + V(0.1, 0.2, 0), CAP + V(0, 0, 0)]
    K.anchor('tide', tuple(CAP + V(0.3, -1.3, 1.2)))
    an = anchors(('hplus', 'hco3', 'cl', 'co2', 'h2o', 'h2co3'))
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
                tr.pose(an['co2'], frame, lerp(V(-4.0, 3.4, z + 0.6), ca + V(-0.35, -0.75, 0), meet) + V(0, 0.5, 0.3))
                tr.pose(an['h2o'], frame, lerp(V(1.6, 3.6, z - 0.5), ca + V(0.35, -0.75, 0), meet) + V(0, 0.5, 0.3))
                tr.pose(an['h2co3'], frame, lerp(ca + V(0, -0.85, 0), DROP, span(make, 0.5, 0.7)) + V(0, 0.6, 0.3))
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


# ------------------------------------------------------------------ inside a red blood cell ----
def rbc_half_thickness(rho):
    """Evans & Fung's red cell: half the thickness at rho (0 at the centre, 1 at the rim), the radius being 1"""
    rho = min(1.0, rho)
    return 0.5 * math.sqrt(max(0.0, 1 - rho * rho)) * (0.207 + 2.003 * rho ** 2 - 1.123 * rho ** 4)


def hb_icon(at, m, rnd, r=0.11):
    """a hemoglobin molecule, small: four globular chains packed together (four icosahedra), turned at random"""
    q = Quaternion((rnd.random() - 0.5, rnd.random() - 0.5, rnd.random() - 0.5, rnd.random() - 0.5)).normalized()
    objs = []
    for d in (V(1, 1, 1), V(1, -1, -1), V(-1, 1, -1), V(-1, -1, 1)):
        o = K.ico(r, tuple(at + (q @ d) * r * 0.62), m, level=1, name='hb')
        objs.append(o)
    return objs


def rbc_level():
    """Inside a red blood cell (L2 p7): "RBCs are flattened biconcave discs", "Lack nuclei and mitochondria", "Each
    RBC contains 280 million hemoglobin molecules". The cell is Evans and Fung's measured biconcave shape, 10 across,
    with a quarter cut away toward the opening view; inside, no nucleus and no mitochondria, only hemoglobin, packed
    (drawn hugely enlarged: a molecule is about 5.5 nm against a 7.8 µm cell, and these are a token few hundred)."""
    K.reset()
    rnd = random.Random(11)
    Rr = 5.0
    n_prof = 40
    # the outline in (rho, height), top centre round the rim to the bottom centre
    prof = []
    for i in range(n_prof + 1):
        rho = math.sin(i / n_prof * math.pi / 2)
        prof.append((rho * Rr, rbc_half_thickness(rho) * Rr))
    outline = prof + [(w, -h) for w, h in reversed(prof[:-1])]
    gap = (math.radians(-90), 0.0)                       # the cut-away quarter, between +z and +x: toward the view
    seg = 72
    bm = bmesh.new()
    rings = []
    for j in range(seg + 1):
        a = gap[1] + (2 * math.pi - (gap[1] - gap[0])) * j / seg
        rings.append([bm.verts.new(T((w * math.cos(a), h, -w * math.sin(a)))) for w, h in outline])
    for j in range(seg):
        for i in range(len(outline) - 1):
            bm.faces.new((rings[j][i], rings[j + 1][i], rings[j + 1][i + 1], rings[j][i + 1]))
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-5)
    surf = K.smooth(K.mesh_obj('rbc', bm, K.mat('rbc', 0xc1121f, 0.55)))
    wall = surf.modifiers.new('wall', 'SOLIDIFY')
    wall.thickness = 0.08
    wall.offset = -1
    K.part(K.apply(surf), 'rbc')
    # the two cut faces: the cell's section, see-through, so the hemoglobin inside reads
    faces = []
    for a in gap:
        bmf = bmesh.new()
        vs = [bmf.verts.new(T((w * math.cos(a), h, -w * math.sin(a)))) for w, h in outline]
        bmf.faces.new(vs)
        bmesh.ops.triangulate(bmf, faces=list(bmf.faces))
        faces.append(K.mesh_obj('section', bmf, K.mat('section', 0xe5383b, 0.7, alpha=0.18)))
    K.part(K.join(faces, 'section'), 'rbc', shell=True)
    # hemoglobin: near the two cut faces (where it can be seen), and a scatter through the rest of the opening
    hm = K.mat('hemoglobin', 0xff4d6d, 0.45)
    hb = []
    tries = 0
    while len(hb) < 900 and tries < 400000:
        tries += 1
        rho = math.sqrt(rnd.random()) * 0.97
        # just behind one cut face or the other (within 0.7 of it), in what is left of the cell
        depth = 0.05 + rnd.random() * 0.55
        a = gap[1] + depth / max(0.3, rho * Rr) if rnd.random() < 0.5 else gap[0] - depth / max(0.3, rho * Rr)
        h = rbc_half_thickness(rho) * Rr - 0.2
        if h < 0.05:
            continue
        p = V(rho * Rr * math.cos(a), (rnd.random() * 2 - 1) * h, -rho * Rr * math.sin(a))
        if all((p - q).length > 0.3 for q in hb):
            hb.append(p)
    objs = []
    for p in hb:
        objs += hb_icon(p, hm, rnd)
    K.part(K.join(objs, 'hemoglobin'), 'hemoglobin')
    print(f'rbc: {len(hb)} hemoglobin molecules')
    K.anchor('rbc', (-1.5, rbc_half_thickness(0.7) * Rr + 0.3, -3.0))
    near = max(hb, key=lambda p: p.x + p.z + 0.4 * p.y)
    K.anchor('hemoglobin', tuple(near + V(0, 0.25, 0)))
    export('redcell')


# ------------------------------------------------------------------ one hemoglobin molecule ----
def frame_of(n):
    """two unit vectors at right angles to n (three.js)"""
    a = V(0, 1, 0) if abs(n.y) < 0.9 else V(1, 0, 0)
    u = n.cross(a).normalized()
    return u, n.cross(u).normalized()


def heme(at, n, m_ring, r=0.55):
    """a heme unit: the flat porphyrin ring (four pyrrole rings, each a thin pentagon, joined round a square) facing
    n, centred at `at`; its iron ion is placed by the caller at the centre"""
    u, w = frame_of(n)
    objs = []
    for k in range(4):
        a = k * math.pi / 2
        c = at + (u * math.cos(a) + w * math.sin(a)) * r
        objs.append(K.between(tuple(c - n * 0.06), tuple(c + n * 0.06), r * 0.42, m_ring, 'pyrrole', seg=5))
        b = a + math.pi / 4
        objs.append(K.sphere(r * 0.16, tuple(at + (u * math.cos(b) + w * math.sin(b)) * r * 0.95), m_ring, seg=(10, 6), name='bridge'))
    # the macrocycle joining them round the iron
    ring = K.torus(r * 0.92, r * 0.09, (0, 0, 0), m_ring, 'ring', axis=tuple(n), seg=(28, 6))
    ring.location = T(tuple(at))
    objs.append(K.apply(ring))
    return K.join(objs, 'heme')


def hemoglobin():
    """One hemoglobin molecule (L3 pp 45-46, 56-57): four globular protein chains, each holding a heme unit with an
    iron ion at its centre. Slider: "O2 binds to iron ions in hemoglobin (Hb) molecules", four, one to each iron,
    making oxyhemoglobin (HbO2); then, in the tissues, the O2 leaves, CO2 binds to amino groups of the globular
    proteins (carbaminohemoglobin) and hydrogen ions bind to the hemoglobin. The chains are lumpy globules, not the
    measured fold; the arrangement (two pairs, crossed) is hemoglobin's."""
    K.reset()
    tr = Track()
    gm = K.mat('globin', 0xe76f51, 0.6)
    CH = [V(-1.15, 0.85, 0.5), V(1.15, 0.85, -0.5), V(1.15, -0.85, 0.5), V(-1.15, -0.85, -0.5)]
    # each heme sits in a cleft on its chain's outer side, turned out toward the front, so its ring and iron show
    OUT = [V(1 if c.x > 0 else -1, 0.55 if c.y > 0 else -0.55, 0.75).normalized() for c in CH]
    chains = []
    for i, c in enumerate(CH):
        o = K.ico(1.45, tuple(c), gm, level=4, name='chain')
        o.scale = (1.0, 0.9, 1.1)
        K.lumpy(o, 0.38, 0.5, 20 + i)
        o = K.apply(o)
        # the cleft: push the surface in round where the heme sits
        cleft = c + OUT[i] * 1.45
        for v in o.data.vertices:
            p = three_of(v.co)
            dd = (p - cleft).length
            if dd < 0.95:
                v.co = T(tuple(p - OUT[i] * (0.95 - dd) * 0.75))
        chains.append(o)
    K.part(K.join(chains, 'globin'), 'globin')
    # each heme in a cleft on its chain's outer face, tilted toward the viewer so its face and its iron show
    hm, fem = K.mat('heme', 0x6a040f, 0.45), K.mat('iron', 0xf48c06, 0.35, metal=0.3)
    HEME = [c + n * 1.3 for c, n in zip(CH, OUT)]
    NORM = OUT
    K.part(K.join([heme(p, n, hm, r=0.62) for p, n in zip(HEME, NORM)], 'heme'), 'heme')
    K.part(K.join([K.sphere(0.24, tuple(p + n * 0.04), fem, seg=(16, 10), name='iron') for p, n in zip(HEME, NORM)], 'iron'), 'iron')
    # O2: two oxygen atoms; CO2 on an amino group; H+
    om = K.mat('o2', 0xd00000, 0.4)
    o2 = []
    for _ in range(4):
        a = K.sphere(0.21, (0, 0, -0.16), om, seg=(14, 10), name='o')
        b = K.sphere(0.21, (0, 0, 0.16), om, seg=(14, 10), name='o')
        o2.append(K.part(bake(K.join([a, b], 'o2')), 'o2'))
    co2 = [K.part(molecule(CO2(), 'co2', 1.5), 'co2') for _ in range(4)]
    hpm = K.mat('hplus', 0xf72585, 0.35)
    hplus = [K.part(K.sphere(0.22, (0, 0, 0), hpm, seg=(14, 10), name='hplus'), 'hplus') for _ in range(4)]
    # the amino ends of the four chains, where CO2 binds; the places H+ binds
    AMINO = [c + V(0.4 * (1 if c.x > 0 else -1), 1.55 if c.y > 0 else -1.55, 0) for c in CH]
    HSITE = [c + V(-0.9 if c.x > 0 else 0.9, 0, 1.35 if c.z > 0 else -1.35) for c in CH]
    FAR = [V(-6, 4.5, 3), V(6, 4.0, -2), V(6, -4.5, 3), V(-6, -4.0, -2)]
    an = anchors(('o2', 'co2', 'hplus'))
    K.anchor('globin', tuple(CH[0] + V(-0.6, 1.4, 0.6)))
    K.anchor('heme', tuple(HEME[2] + NORM[2] * 0.2 + V(0.45, -0.55, 0)))
    K.anchor('iron', tuple(HEME[1] + NORM[1] * 0.3 + V(0.2, 0.3, 0)))
    order = [0, 2, 1, 3]                                 # the first O2 binds slowest; the rest follow more easily

    def place(s, frame):
        p = stage_prog(s, 2)
        oxy, tis = p(0), p(1)
        for j, i in enumerate(order):
            t0 = [0.05, 0.4, 0.52, 0.62][j]
            arrive = span(oxy, t0, t0 + 0.3)
            leave = span(tis, 0.05 + 0.05 * j, 0.4 + 0.05 * j)
            bound = HEME[i] + NORM[i] * 0.52
            q = Vector((0, 0, 1)).rotation_difference(T(tuple((NORM[i] + V(0.5, 0.3, 0)).normalized())))
            at = lerp(FAR[i], bound, arrive) if leave == 0 else lerp(bound, FAR[i] * 1.1, leave)
            tr.pose(o2[i], frame, at, q, 1 if (arrive > 0.02 and leave < 0.98) else HIDE)
            # CO2 to the amino groups, H+ to the protein
            c_in = span(tis, 0.35 + 0.07 * j, 0.75 + 0.05 * j)
            c_far = AMINO[i] + (AMINO[i] - V()).normalized() * 3.5
            c_at = AMINO[i] + (AMINO[i] - CH[i]).normalized() * 0.35
            tr.pose(co2[i], frame, lerp(c_far, c_at, c_in), q_three((0.2, 1, 0.4), i * 1.3), 1 if c_in > 0.02 else HIDE)
            h_in = span(tis, 0.5 + 0.06 * j, 0.9)
            out = (HSITE[i] - CH[i]).normalized()
            h_at = lerp(HSITE[i] + out * 3.0, HSITE[i] + out * 0.25, h_in)
            tr.pose(hplus[i], frame, h_at, scale=1 if h_in > 0.02 else HIDE)
            if i == 0:
                tr.pose(an['o2'], frame, at + V(0, 0.5, 0.2))
                tr.pose(an['co2'], frame, lerp(c_far, c_at, c_in) + V(0, 0.55, 0.2))
                tr.pose(an['hplus'], frame, h_at + V(0, 0.45, 0.2))
    sample(place, 2, step=2)
    tr.write()
    VIEW['hemoglobin'] = [0.35, 0.3, 1]
    export('hemoglobin')


# ------------------------------------------------------------------ plasma ----
def plasma():
    """Plasma (L2 pp 5-6): "straw-colored liquid consisting of H2O and dissolved solutes", which "Includes ions";
    plasma proteins, three types: albumins (60-80% of them), globulins (which "carry lipids"; gamma globulins are
    antibodies) and fibrinogen. Shapes are the molecules' own in outline: albumin a heart-shaped globule, globulins
    globular, an antibody a Y, fibrinogen a long rod with a knob at each end and one in the middle. Sizes keep their
    order (water far smaller than any protein; fibrinogen, 45 nm, the longest), though water and ions are drawn larger
    than they are, and there are a token few."""
    K.reset()
    rnd = random.Random(23)
    BOX = V(22.0, 10.0, 13.0)
    K.part(K.rounded_box(tuple(BOX), material=K.mat('plasma', 0xf3d98b, 0.8, alpha=0.08), name='plasma', radius=2.0), 'plasma', shell=True)
    placed = {}

    def spot(kind, r, tries=5000, ext=None):
        ext = ext or (r, r, r)
        for _ in range(tries):
            c = V((rnd.random() - 0.5) * BOX.x, (rnd.random() - 0.5) * BOX.y, (rnd.random() - 0.5) * BOX.z)
            if any(abs(c[i]) > BOX[i] / 2 - ext[i] - 0.5 for i in range(3)) or not K.in_rounded_box(c, BOX, 2.0, max(ext) + 0.3):
                continue
            if all((c - p).length > r + q + 0.25 for ps in placed.values() for p, q in ps):
                placed.setdefault(kind, []).append((c, r))
                return c
        return None

    def turned(o, c, level=False):
        o.rotation_mode = 'QUATERNION'
        if level:                                        # a long molecule lies roughly level, so it fits the box
            o.rotation_quaternion = q_three((0, 1, 0), rnd.random() * math.pi) @ q_three((0, 0, 1), (rnd.random() - 0.5) * 0.5)
        else:
            o.rotation_quaternion = Quaternion((rnd.random() - 0.5, rnd.random() - 0.5, rnd.random() - 0.5, rnd.random() - 0.5)).normalized()
        o.location = T(tuple(c))
        return bake(o)
    # fibrinogen first (the longest), then antibodies, globulins, albumins
    fm = K.mat('fibrinogen', 0x2a9d8f, 0.5)
    fib_objs = []

    def rod_spot(half, r, tries=8000):
        """a place and a turn for a long rod: five balls along it, each clear of everything placed and in the box"""
        for _ in range(tries):
            c = V((rnd.random() - 0.5) * BOX.x, (rnd.random() - 0.5) * BOX.y, (rnd.random() - 0.5) * BOX.z)
            # across the opening view (along x - z, give or take), so the rod is seen at its length
            q = q_three((0, 1, 0), math.pi / 4 + (rnd.random() - 0.5) * 1.0) @ q_three((0, 0, 1), (rnd.random() - 0.5) * 0.6)
            d = three_of(q @ T((1, 0, 0)))
            pts = [c + d * (half * k / 2) for k in (-2, -1, 0, 1, 2)]
            if not all(K.in_rounded_box(p, BOX, 2.0, r + 0.3) for p in pts):
                continue
            if all((p - o).length > r + ro + 0.25 for p in pts for ps in placed.values() for o, ro in ps):
                placed.setdefault('fibrinogen', []).extend((p, r) for p in pts)
                return c, q
        raise RuntimeError('no room for fibrinogen')
    for _ in range(3):
        c, q = rod_spot(4.3, 0.8)
        bits = [K.between((-4.2, 0, 0), (4.2, 0, 0), 0.16, fm, 'rod', seg=10),
                K.sphere(0.75, (-4.3, 0, 0), fm, seg=(18, 12), name='d'), K.sphere(0.75, (4.3, 0, 0), fm, seg=(18, 12), name='d'),
                K.sphere(0.55, (0, 0, 0), fm, seg=(16, 10), name='e')]
        o = bake(K.join(bits, 'fibrinogen'))     # the rod's own turn into its mesh, before the placing turn
        o.rotation_mode = 'QUATERNION'
        o.rotation_quaternion = q
        o.location = T(tuple(c))
        fib_objs.append(bake(o))
    K.part(K.join(fib_objs, 'fibrinogen'), 'fibrinogen')
    gam = K.mat('gamma', 0x7209b7, 0.5)
    ys = []
    for c in [spot('gamma', 1.6) for _ in range(5)]:
        bits = [K.between((0, -1.4, 0), (0, 0, 0), 0.32, gam, 'stem', seg=10)]
        for sx in (-1, 1):
            bits.append(K.between((0, 0, 0), (sx * 1.0, 1.15, 0), 0.32, gam, 'arm', seg=10))
            bits.append(K.sphere(0.36, (sx * 1.05, 1.2, 0), gam, seg=(12, 8), name='tip'))
        bits.append(K.sphere(0.36, (0, -1.4, 0), gam, seg=(12, 8), name='tip'))
        bits.append(K.sphere(0.36, (0, 0, 0), gam, seg=(12, 8), name='hinge'))
        ys.append(turned(K.join(bits, 'gamma'), c))
    K.part(K.join(ys, 'gamma'), 'gamma')
    glm, lpm = K.mat('globulins', 0x4361ee, 0.5), K.mat('lipids', 0xfff3b0, 0.35)
    globs, lips = [], []
    for k, c in enumerate([spot('globulins', 1.3) for _ in range(7)]):
        o = K.ico(0.95, (0, 0, 0), glm, level=3, name='globulin')
        o.scale = (1.15, 0.9, 1.0)
        K.lumpy(o, 0.22, 0.5, 40 + k)
        globs.append(turned(K.apply(o), c))
        if k % 2 == 0:                                   # some carrying a lipid
            d = V(rnd.random() - 0.5, rnd.random() - 0.5, rnd.random() - 0.5).normalized()
            lips.append(K.sphere(0.45, tuple(c + d * 1.15), lpm, seg=(16, 10), name='lipid'))
            placed.setdefault('lipids', []).append((c + d * 1.15, 0.45))
    K.part(K.join(globs, 'globulins'), 'globulins')
    K.part(K.join(lips, 'lipids'), 'lipids')
    alm = K.mat('albumin', 0xf4a261, 0.5)
    albs = []
    for k, c in enumerate([spot('albumin', 0.95) for _ in range(20)]):
        if c is None:
            continue
        lobes = [K.ico(0.55, (-0.33, 0.12, 0), alm, level=2, name='lobe'), K.ico(0.55, (0.33, 0.12, 0), alm, level=2, name='lobe'),
                 K.ico(0.45, (0, -0.38, 0), alm, level=2, name='lobe')]
        o = K.join(lobes, 'albumin')
        K.lumpy(o, 0.1, 0.4, 60 + k)
        albs.append(turned(K.apply(o), c))
    K.part(K.join(albs, 'albumin'), 'albumin')
    # ions and water: small, many
    im = K.mat('ions', 0x80ed99, 0.35)
    ions = [K.ico(0.16, tuple(c), im, level=1, name='ion') for c in [spot('ions', 0.16, 400) for _ in range(40)] if c is not None]
    K.part(K.join(ions, 'ions'), 'ions')
    wo, wh = K.mat('water-O', 0x48cae4, 0.4), K.mat('water-H', 0xf1f1f1, 0.4)
    water = []
    for c in [spot('water', 0.16, 300) for _ in range(220)]:
        if c is None:
            continue
        q = Quaternion((rnd.random() - 0.5, rnd.random() - 0.5, rnd.random() - 0.5, rnd.random() - 0.5)).normalized()
        water.append(K.sphere(0.12, tuple(c), wo, seg=(8, 5), name='O'))
        for sx in (-1, 1):
            water.append(K.sphere(0.075, tuple(c + q @ V(sx * 0.11, 0.08, 0)), wh, seg=(6, 4), name='H'))
    K.part(K.join(water, 'water'), 'water')
    near = lambda kind: max((c for c, _ in placed[kind]), key=lambda c: c.x + c.y + c.z)
    for kind, up in (('fibrinogen', 1.0), ('gamma', 1.7), ('globulins', 1.3), ('albumin', 0.9), ('lipids', 0.6), ('ions', 0.3), ('water', 0.3)):
        K.anchor(kind, tuple(near(kind) + V(0, up, 0)))
    K.anchor('plasma', (BOX.x / 2 - 3.0, BOX.y / 2 - 0.3, BOX.z / 2 - 1.0))
    export('plasma')


# ------------------------------------------------------------------ a proximal tubule cell ----
def membrane_protein(at, m, n, ring, r, name, half=0.45, head=None, head_r=0.42):
    """a protein through a membrane lying flat (normal along y, the membrane at at.y): n helices round a ring,
    and optionally a globular domain on one side (head: its centre)"""
    objs = []
    for j in range(n):
        a = j * 2 * math.pi / n
        p = at + V(ring * math.cos(a), 0, ring * math.sin(a))
        objs.append(K.between(tuple(p + V(0, -half, 0)), tuple(p + V(0, half, 0)), r, m, name, seg=10))
    if head is not None:
        objs.append(K.sphere(head_r, tuple(head), m, seg=(18, 12), name=name))
    return K.join(objs, name)


def glucose_molecule(name, scale=1.0):
    """glucose, ball and stick: the six-membered ring (five C, one O) with its CH2OH"""
    atoms = []
    for k in range(6):
        a = k * math.pi / 3
        atoms.append(('O' if k == 0 else 'C', V(0.34 * math.cos(a), 0.34 * math.sin(a), 0.06 * (-1) ** k)))
    atoms.append(('C', V(0.34 * math.cos(-math.pi / 3) * 1.9, 0.34 * math.sin(-math.pi / 3) * 1.9, 0.1)))
    atoms.append(('O', V(0.34 * math.cos(-math.pi / 3) * 2.7, 0.34 * math.sin(-math.pi / 3) * 2.3, 0.1)))
    for k in (2, 3, 4):
        a = k * math.pi / 3
        atoms.append(('O', V(0.34 * math.cos(a) * 1.75, 0.34 * math.sin(a) * 1.75, 0.0)))
    return molecule(atoms, name, scale, seg=(10, 7))


def pct():
    """The mechanism of reabsorption in the proximal tubule (L5 pp 12, 21-26), as its figure (p23, Martini 26-11)
    lays it out: tubular fluid above, the cells' apical surfaces with their microvilli, the cells (cuboidal, joined
    by cell junctions), their basolateral membranes on the basement membrane, interstitial fluid, and a peritubular
    capillary. Slider, the slide's steps: (1) "Primary active transport of Na+ across basolateral membrane by Na+/K+
    pump", 3 Na+ out for 2 K+ in, the K+ leaving again through passive (leak) channels; (2) "coupled transport of
    glucose and Na+ into the cytoplasm", Na+ running down into the cell and carrying glucose with it; (3) "Glucose is
    then transported out of cell by facilitated diffusion and is reabsorbed into the blood", the Na+ pumped out
    again; (4) "Cl- transport (passive)", between the cells, and "H2O follows salt by osmosis", through aquaporins
    and between the cells, all into the capillary. Proteins and ions are drawn far larger than they are."""
    K.reset()
    tr = Track()
    CW, CH, CD = 7.0, 5.0, 6.0                           # the cell in the middle: x across, y apical up, z deep
    TOP, BOT = CH / 2, -CH / 2
    GAP = 0.36                                           # between cells: the lateral intercellular space
    # the middle cell's membrane, as the slide's figure cuts it: apical (the top, facing the lumen) and basolateral
    # (the two lateral faces, against the neighbours, and the basal face, on the basement membrane); the front and
    # back are only where the drawing cuts the cell, so they belong to the cell, not to either membrane
    shell = K.rounded_box((CW, CH, CD), (0, 0, 0), None, 'cell', radius=0.5)
    bm = bmesh.new()
    bm.from_mesh(shell.data)
    side = lambda f: max(range(3), key=lambda i: abs(f.normal[i]))   # Blender axes: 0 across, 1 front-back, 2 up
    which = lambda f: 'ap' if side(f) == 2 and f.normal.z > 0 else 'cut' if side(f) == 1 else 'bl'
    pieces = {}
    for key in ('ap', 'bl', 'cut'):
        b = bm.copy()
        bmesh.ops.delete(b, geom=[f for f in b.faces if which(f) != key], context='FACES')
        pieces[key] = b
    bm.free()
    bpy.data.objects.remove(shell)
    def sheet(name, b, m):
        """a membrane: the faces given a thickness, inward, so it reads as a band where it is seen edge-on"""
        o = K.mesh_obj(name, b, m)
        sol = o.modifiers.new('sheet', 'SOLIDIFY')
        sol.thickness, sol.offset = 0.14, -1.0
        return K.smooth(K.apply(o))
    K.part(sheet('apical', pieces['ap'], K.mat('apical', 0x52b788, 0.5, alpha=0.7)), 'apical')
    K.part(sheet('basolateral', pieces['bl'], K.mat('basolateral', 0xf4a261, 0.5, alpha=0.7)), 'basolateral')
    # the neighbouring cells, cut off at the sides; the middle cell's own cut faces are cell too
    nw = 5.0
    cm = K.mat('cells', 0xcdb4db, 0.6, alpha=0.2)
    K.part(K.smooth(K.mesh_obj('cells', pieces['cut'], cm)), 'cells', shell=True)
    for sx in (-1, 1):
        K.part(K.rounded_box((nw, CH, CD), (sx * (CW / 2 + GAP + nw / 2), 0, 0), cm, 'cells', radius=0.5), 'cells', shell=True)
    # cell junctions: a seal round the top of each gap
    jm = K.mat('junctions', 0x3a0ca3, 0.45, alpha=0.75)
    K.part(K.join([K.box((GAP + 0.2, 0.5, CD - 0.6), (sx * (CW / 2 + GAP / 2), TOP - 0.45, 0), jm, 'junction') for sx in (-1, 1)], 'junctions'), 'junctions')
    # basement membrane, interstitial fluid, the capillary
    W = CW + 2 * (GAP + nw)
    K.part(K.rounded_box((W, 0.28, CD + 0.6), (0, BOT - 0.3, 0), K.mat('basement', 0x6c757d, 0.6, alpha=0.55), 'basement', radius=0.12), 'basement')
    K.part(K.rounded_box((W, 7.4, CD + 0.6), (0, BOT - 0.45 - 3.7, 0), K.mat('isf', 0xffd6e0, 0.8, alpha=0.08), 'isf', radius=0.4), 'isf', shell=True)
    K.part(K.rounded_box((W, 4.2, CD + 0.6), (0, TOP + 2.15, 0), K.mat('fluid', 0xfff3b0, 0.8, alpha=0.1), 'fluid', radius=0.4), 'fluid', shell=True)
    CAP_Y = BOT - 4.6
    capm = K.mat('capillary', 0xd62828, 0.5, alpha=0.28)
    cap = K.between((-W / 2 + 0.8, CAP_Y, 0.4), (W / 2 - 0.8, CAP_Y, 0.4), 1.6, capm, 'capillary', seg=40)
    rbcs = []
    try:
        src = PREP('rbc')['rbc'][0]
        copies = [src] + [K.dup(src, linked=False) for _ in range(2)]   # copied before any is placed
        for k, x in enumerate((-4.5, 1.0, 5.5)):
            o = copies[k]
            o.rotation_mode = 'QUATERNION'
            o.rotation_quaternion = q_three((0, 0, 1), math.pi / 2 + 0.35 * (k - 1)) @ q_three((1, 0, 0), 0.3 * k)
            o.location = T((x, CAP_Y, 0.4))
            o.scale = (1.05, 1.05, 1.05)
            rbcs.append(bake(o))
    except Exception as e:                               # the download not prepared: the capillary on its own
        print('pct: no red cells in the capillary', e)
    K.part(K.join([cap] + rbcs, 'capillary'), 'capillary', shell=True)
    # microvilli on every apical surface, clear of the apical proteins
    # the proteins in rows along the front of the cut, where they can be seen: apical, one row; basolateral, two
    COUP = [V(-2.4, TOP, 2.1), V(0.0, TOP, 2.1), V(2.4, TOP, 2.1)]
    AQ_A = [V(-1.2, TOP, 2.2), V(1.2, TOP, 2.2)]
    PUMP = [V(-2.6, BOT, 2.15), V(-0.3, BOT, 2.15), V(2.0, BOT, 2.15)]
    CARR = [V(-1.45, BOT, 2.15), V(0.85, BOT, 2.15), V(2.95, BOT, 1.2)]
    KCH = [V(-2.2, BOT, 0.6), V(0.2, BOT, 0.6), V(2.1, BOT, 0.3)]
    AQ_B = [V(-0.95, BOT, 0.5), V(1.2, BOT, 0.4)]
    vm = K.mat('microvilli', 0x95d5b2, 0.5)
    vill = []
    xs = [x * 0.5 for x in range(-int(W), int(W) + 1)]
    for x in xs:
        for z in [k * 0.5 - CD / 2 + 0.5 for k in range(int(CD * 2) - 1)]:
            if abs(x) > W / 2 - 0.4 or (CW / 2 - 0.1 < abs(x) < CW / 2 + GAP + 0.1):
                continue
            if abs(x) < CW / 2 + 0.2 and z > CD / 2 - 1.6:   # the middle cell's front strip: its apical proteins
                continue
            h = 1.3 + 0.2 * math.sin(x * 3.1 + z * 1.7)
            vill.append(K.between((x, TOP, z), (x, TOP + h, z), 0.12, vm, 'villus', seg=8))
            vill.append(K.sphere(0.12, (x, TOP + h, z), vm, seg=(8, 4), name='tip'))
    K.part(K.join(vill, 'microvilli'), 'microvilli')
    # inside the cell: its nucleus, and mitochondria by the basolateral membrane (the pumps' ATP)
    K.part(K.sphere(1.1, (0.2, 0.8, -1.3), K.mat('nucleus', 0x7b2cbf, 0.5), seg=(28, 18), name='nucleus'), 'nucleus')
    mm = K.mat('mito', 0xe4774a, 0.5)
    mitos = []
    for k, (x, z) in enumerate(((-2.0, -0.6), (0.9, -0.4), (-0.6, -2.0), (2.4, -1.6))):
        y = BOT + 1.75 + 0.15 * (k % 2)
        o = K.between((x - 0.55, y, z), (x + 0.55, y + 0.05, z), 0.28, mm, 'mito', seg=12)
        mitos.append(o)
        mitos += [K.sphere(0.28, (x + sx * 0.55, y + 0.05 * (sx > 0), z), mm, seg=(12, 8), name='end') for sx in (-1, 1)]
    K.part(K.join(mitos, 'mito'), 'mito')
    # the transport proteins
    K.part(K.join([membrane_protein(p, K.mat('coupled', 0x2d6a4f, 0.45), 7, 0.34, 0.13, 'coupled') for p in COUP], 'coupled'), 'coupled')
    K.part(K.join([membrane_protein(p, K.mat('pump', 0xffd60a, 0.45), 7, 0.34, 0.13, 'pump', head=p + V(0, 0.8, 0)) for p in PUMP], 'pump'), 'pump')
    K.part(K.join([membrane_protein(p, K.mat('carrier', 0x4895ef, 0.45), 5, 0.3, 0.13, 'carrier') for p in CARR], 'carrier'), 'carrier')
    K.part(K.join([membrane_protein(p, K.mat('kchannels', 0x5a189a, 0.45), 4, 0.27, 0.12, 'kchannel') for p in KCH], 'kchannels'), 'kchannels')
    K.part(K.join([membrane_protein(p, K.mat('aquaporins', 0x48cae4, 0.45), 4, 0.2, 0.09, 'aquaporin') for p in AQ_A + AQ_B], 'aquaporins'), 'aquaporins')
    # ions and molecules: Na+ blue, K+ violet, Cl- green, glucose and water ball and stick
    nam, km, clm = K.mat('na', 0x3a86ff, 0.35), K.mat('k', 0xc77dff, 0.35), K.mat('cl', 0x2dc653, 0.4)
    ball = lambda r, m, name: K.part(K.sphere(r, (0, 0, 0), m, seg=(14, 10), name=name), name)
    na_p = [[ball(0.2, nam, 'na') for _ in range(3)] for _ in PUMP]        # pumped out in step 1
    k_p = [[ball(0.24, km, 'k') for _ in range(2)] for _ in PUMP]          # pumped in, then out through the channels
    na_c = [ball(0.2, nam, 'na') for _ in COUP]                            # in with glucose (step 2), out again (step 3)
    glu = [K.part(glucose_molecule('glucose', 0.9), 'glucose') for _ in COUP]
    cl = [ball(0.3, clm, 'cl') for _ in range(4)]
    h2o = [K.part(molecule(H2O(), 'h2o', 1.1, seg=(10, 7)), 'h2o') for _ in range(6)]
    an = anchors(('na', 'k', 'glucose', 'cl', 'h2o'))
    rot = [q_three((0.3, 1, 0.2), i * 1.7) for i in range(12)]
    LUMEN, ISF, CAP = TOP + 3.0, BOT - 1.9, V(0, CAP_Y, 0.4)

    def into_cap(p, i):
        return CAP + V(-5.5 + 1.0 * (i % 12), 0.45 * ((i % 3) - 1), 0.5 * ((i % 4) - 1.5))

    def wob(i, t, a=0.12):
        return V(math.sin(t * 9.1 + i * 2.3), math.sin(t * 7.3 + i * 1.1), math.sin(t * 8.2 + i * 3.7)) * a

    def place(s, frame):
        p = stage_prog(s, 4)
        pump, coup, gl, salt = p(0), p(1), p(2), p(3)
        for i, P in enumerate(PUMP):
            # step 1: 3 Na+ from the cytoplasm through the pump into the interstitial fluid; then on to the blood (4)
            for j, o in enumerate(na_p[i]):
                d = V((j - 1) * 0.45, 0, 0.25 * (j - 1))
                path = [P + V(0, 1.6, 0) + d * 2, P + V(0, 0.7, 0) + d * 0.3, P + V(0, -0.7, 0) + d * 0.3, P + V(0, -1.6, 0) + d * 2.2]
                at = along(path, span(pump, 0.05 + 0.05 * j, 0.5 + 0.05 * j))
                at = lerp(at, into_cap(at, i * 3 + j), span(salt, 0.1, 0.8))
                tr.pose(o, frame, at + wob(i * 3 + j, s, 0.06))
            # 2 K+ from the interstitial fluid in through the pump, then out through a passive channel
            for j, o in enumerate(k_p[i]):
                d = V((j - 0.5) * 0.6, 0, 0.3)
                inn = [P + V(0, -1.6, 0) + d * 2, P + V(0, -0.7, 0) + d * 0.3, P + V(0, 0.7, 0) + d * 0.3, P + V(0, 1.4, 0) + d]
                Kc = KCH[i]
                out = [P + V(0, 1.4, 0) + d, Kc + V(0, 0.9, 0), Kc + V(0, 0.3, 0), Kc + V(0, -0.6, 0), Kc + V(0.5 * (j - 0.5), -1.8, 0.3)]
                at = along(inn, span(pump, 0.2 + 0.05 * j, 0.6)) if pump < 0.62 else along(out, span(pump, 0.62, 1))
                tr.pose(o, frame, at + wob(i * 2 + j + 9, s, 0.05))
        for i, C in enumerate(COUP):
            # step 2: Na+ and glucose from the tubular fluid, down through the coupled transporter together
            n0, g0 = C + V(-0.6, 2.4, 0.3), C + V(0.6, 2.6, -0.2)
            top, inside = C + V(0, 0.7, 0), C + V(0, -0.8, 0)
            u = span(coup, 0, 0.35)
            v = span(coup, 0.35, 0.75)
            na_at = lerp(n0, top + V(-0.18, 0, 0), u) if v == 0 else lerp(top + V(-0.18, 0, 0), inside + V(-0.3, -0.3, 0), v)
            g_at = lerp(g0, top + V(0.2, 0.15, 0), u) if v == 0 else lerp(top + V(0.2, 0.15, 0), inside + V(0.3, 0, 0), v)
            g_at = lerp(g_at, V(C.x * 0.4, 0.2, C.z * 0.6), span(coup, 0.75, 1))
            # step 3: glucose to a carrier and out by facilitated diffusion, on into the blood; the Na+ is pumped out
            Q = CARR[i]
            g_path = [V(C.x * 0.4, 0.2, C.z * 0.6), Q + V(0, 1.0, 0), Q + V(0, 0.2, 0), Q + V(0, -0.8, 0), Q + V(0, -2.2, 0)]
            if gl > 0:
                g_at = along(g_path, span(gl, 0, 0.75))
                g_at = lerp(g_at, into_cap(g_at, i + 6), span(gl, 0.75, 1))
            P = PUMP[i]
            n_path = [inside + V(-0.3, -0.3, 0), P + V(0.35, 0.9, 0), P + V(0.2, -0.4, 0), P + V(0.5, -1.5, 0.3)]
            if gl > 0:
                na_at = along(n_path, span(gl, 0.1, 0.7))
            na_at = lerp(na_at, into_cap(na_at, i + 9), span(salt, 0.2, 0.9))
            tr.pose(na_c[i], frame, na_at + wob(i + 20, s, 0.05))
            tr.pose(glu[i], frame, g_at + wob(i + 23, s, 0.05), rot[i])
            if i == 1:
                tr.pose(an['na'], frame, na_at + V(0, 0.4, 0.25))
                tr.pose(an['glucose'], frame, g_at + V(0, 0.55, 0.25))
        # step 4: Cl- between the cells (through the junction, down the gap) and into the blood; H2O through the
        # aquaporins and between the cells
        for j, o in enumerate(cl):
            sx = -1 if j % 2 else 1
            gx = sx * (CW / 2 + GAP / 2)
            z = -1.5 + j * 1.0
            path = [V(gx + sx * 0.8, LUMEN, z), V(gx, TOP + 0.4, z), V(gx, TOP - 0.45, z), V(gx, BOT + 0.3, z), V(gx * 0.8, ISF, z)]
            at = along(path, span(salt, 0.05 + 0.04 * j, 0.7))
            at = lerp(at, into_cap(at, j + 12), span(salt, 0.7, 1))
            tr.pose(o, frame, at + wob(j + 30, s, 0.06 * (1 - salt)))
            if j == 0:
                tr.pose(an['cl'], frame, at + V(0.35, 0.45, 0.3))
        for j, o in enumerate(h2o):
            if j < 4:                                    # through the cell: apical aquaporin, basolateral aquaporin
                A, B = AQ_A[j % 2], AQ_B[j % 2]
                d = V(0.15 * (j // 2), 0, 0.15 * (j // 2))
                path = [A + V(0.3, 2.6, 0.2) + d * 3, A + V(0, 0.8, 0), A + V(0, -0.6, 0), B + V(0, 0.8, 0) + d, B + V(0, -0.6, 0), B + V(0, -2.0, 0) + d * 2]
            else:                                        # between the cells, beside the Cl-
                sx = -1 if j % 2 else 1
                gx = sx * (CW / 2 + GAP / 2)
                path = [V(gx + sx * 1.1, LUMEN + 0.3, 1.5), V(gx, TOP + 0.4, 1.2), V(gx, BOT + 0.3, 1.0), V(gx * 0.8, ISF - 0.3, 1.0)]
            at = along(path, span(salt, 0.12 + 0.04 * j, 0.78))
            at = lerp(at, into_cap(at, j + 16), span(salt, 0.78, 1))
            tr.pose(o, frame, at + wob(j + 40, s, 0.05 * (1 - salt)), rot[j + 3])
            if j == 0:
                tr.pose(an['h2o'], frame, at + V(0.3, 0.4, 0.3))
    # the K+ label rides the first pumped K+: posed again here from the same path as the ion
    def k_anchor(s, frame):
        p = stage_prog(s, 4)
        P, d, Kc = PUMP[1], V(-0.3, 0, 0.3), KCH[1]
        pump = p(0)
        inn = [P + V(0, -1.6, 0) + d * 2, P + V(0, -0.7, 0) + d * 0.3, P + V(0, 0.7, 0) + d * 0.3, P + V(0, 1.4, 0) + d]
        out = [P + V(0, 1.4, 0) + d, Kc + V(0, 0.9, 0), Kc + V(0, 0.3, 0), Kc + V(0, -0.6, 0), Kc + V(-0.25, -1.8, 0.3)]
        at = along(inn, span(pump, 0.2, 0.6)) if pump < 0.62 else along(out, span(pump, 0.62, 1))
        tr.pose(an['k'], frame, at + V(0.3, 0.45, 0.3))
    sample(place, 4, step=2)
    sample(k_anchor, 4, step=2)
    tr.write()
    K.anchor('fluid', (W / 2 - 2.2, TOP + 3.9, CD / 2))
    K.anchor('microvilli', (CW / 2 + GAP + 1.4, TOP + 1.5, CD / 2 - 0.3))
    K.anchor('apical', (-1.0, TOP + 0.15, CD / 2 + 0.1))
    K.anchor('basolateral', (-CW / 2 - 0.02, BOT + 1.0, CD / 2 - 0.7))
    K.anchor('cells', (-(CW / 2 + GAP + nw / 2), 0.6, CD / 2))
    K.anchor('junctions', (CW / 2 + GAP / 2, TOP - 0.2, CD / 2 - 0.2))
    K.anchor('basement', (W / 2 - 2.5, BOT - 0.3, CD / 2 + 0.3))
    K.anchor('isf', (-(W / 2) + 2.2, BOT - 1.5, CD / 2 + 0.3))
    K.anchor('capillary', (-W / 2 + 3.0, CAP_Y + 1.7, 1.2))
    K.anchor('nucleus', (0.2, 2.0, -1.0))
    K.anchor('mito', (-2.0, BOT + 2.1, -0.4))
    K.anchor('coupled', tuple(COUP[0] + V(0, 0.9, 0.3)))
    K.anchor('pump', tuple(PUMP[0] + V(0, 1.4, 0.3)))
    K.anchor('carrier', tuple(CARR[0] + V(0, -0.85, 0.3)))
    K.anchor('kchannels', tuple(KCH[0] + V(0.2, -0.8, 0.3)))
    K.anchor('aquaporins', tuple(AQ_A[0] + V(0, 0.45, 0.3)))
    VIEW['pct'] = [0.3, 0.25, 1]
    export('pct', ['rbc'])



# ------------------------------------------------------------------ cardiac action potentials ----
def text_mesh(body, at, size, m, name, align='RIGHT', res=None):
    """a line of text as a mesh, standing up and facing +z (the opening views), its anchor point at `at`; res, the
    curve resolution of its letters (fewer triangles)"""
    cu = bpy.data.curves.new(name, 'FONT')
    cu.body = body
    if res:
        cu.resolution_u = res
    cu.size = size
    cu.extrude = 0.02
    cu.align_x = align
    cu.align_y = 'CENTER'
    o = K.link(bpy.data.objects.new(name, cu))
    o.data.materials.append(m)
    o.rotation_mode = 'XYZ'
    o.rotation_euler = (math.pi / 2, 0, 0)
    o.location = T(tuple(at))
    return K.to_mesh(o)


def bilayer_with_holes(holes, r):
    """the "Plasma Membrane" download's bilayer (its heads and tails), with every lipid within r of a hole's axis
    (holes: three.js x, z) taken out, for a channel to stand in"""
    got = PREP('membrane')
    for k in list(got):
        if k not in ('heads', 'tails'):
            for o in got[k]:
                bpy.data.objects.remove(o)
    out = []
    for o in got['heads'] + got['tails']:
        bake(o)
        bm = bmesh.new()
        bm.from_mesh(o.data)
        bm.faces.ensure_lookup_table()
        seen, gone = set(), []
        for f in bm.faces:
            if f.index in seen:
                continue
            isl, stack = [], [f]
            seen.add(f.index)
            while stack:
                x = stack.pop()
                isl.append(x)
                for e in x.edges:
                    for g in e.link_faces:
                        if g.index not in seen:
                            seen.add(g.index)
                            stack.append(g)
            c = sum((v.co for x in isl for v in x.verts), Vector()) / sum(len(x.verts) for x in isl)
            if any((c.x - hx) ** 2 + (-c.y - hz) ** 2 < r * r for hx, hz in holes):
                gone += isl
        bmesh.ops.delete(bm, geom=gone, context='FACES')
        bm.to_mesh(o.data)
        bm.free()
        out.append(o)
    return out


def channel(at, m, name, h=6.2, r=0.48):
    """an ion channel: four subunits round a pore along y at `at` (three.js), each a capsule centred on its own
    origin, posed by open_close()"""
    subs = []
    for j in range(4):
        parts = [K.between((0, -h / 2 + r, 0), (0, h / 2 - r, 0), r, m, name, seg=14),
                 K.sphere(r, (0, -h / 2 + r, 0), m, seg=(14, 8), name=name), K.sphere(r, (0, h / 2 - r, 0), m, seg=(14, 8), name=name)]
        o = K.join(parts, name)
        bake(o)
        subs.append(o)
    return (at, subs)


def open_close(tr, ch, frame, u):
    """pose a channel u open (0 closed: the four subunits drawn in and leaning together at the cytoplasmic end,
    the gate shut; 1 open: upright round a wide pore)"""
    at, subs = ch
    ring, tilt = mix(0.6, 0.86, u), mix(0.24, 0.0, u)
    for j, o in enumerate(subs):
        a = j * math.pi / 2 + math.pi / 4
        rh = V(math.cos(a), 0, math.sin(a))
        t = V(math.sin(a), 0, -math.cos(a))
        tr.pose(o, frame, at + rh * ring, q_three(tuple(t), tilt))


def ap_graph(curve, t_end, v_lo, v_hi, ticks):
    """the membrane potential against time, drawn behind and above the membrane: axes, the trace, the tick values
    (mV) and, for the caller to move, a marker. Returns (point_at(t), the marker)."""
    X0, X1, Y0, Hg, Z = -7.0, 7.0, 6.6, 5.0, -5.4
    px = lambda t: X0 + (X1 - X0) * t / t_end
    py = lambda v: Y0 + (v - v_lo) / (v_hi - v_lo) * Hg
    at = lambda t: V(px(t), py(curve(t)), Z)
    gm = K.mat('potential', 0xffd166, 0.4)
    am = K.mat('potential-axes', 0xadb5bd, 0.6)
    tm = K.mat('potential-text', 0xe9ecef, 0.6)
    pts = [at(t_end * i / 220) for i in range(221)]
    objs = [K.curve_tube([T(tuple(p)) for p in pts], 0.07, gm, 'trace', res=2)]
    objs.append(K.between((X0 - 0.3, Y0 - 0.3, Z), (X0 - 0.3, Y0 + Hg + 0.4, Z), 0.04, am, 'axis', seg=6))
    objs.append(K.between((X0 - 0.3, Y0 - 0.3, Z), (X1 + 0.3, Y0 - 0.3, Z), 0.04, am, 'axis', seg=6))
    for v in ticks:
        objs.append(K.between((X0 - 0.5, py(v), Z), (X0 - 0.3, py(v), Z), 0.04, am, 'tick', seg=6))
        objs.append(text_mesh(('+' if v > 0 else '') + str(v), (X0 - 0.65, py(v), Z), 0.42, tm, 'tick-text'))
    objs.append(text_mesh('mV', (X0 - 0.3, Y0 + Hg + 0.85, Z), 0.42, tm, 'unit', align='CENTER'))
    K.part(K.join(objs, 'potential'), 'potential')
    marker = K.part(K.sphere(0.22, (0, 0, 0), K.mat('potential-marker', 0xff006e, 0.35, emit=0xff006e), seg=(16, 10), name='marker'), 'potential')
    return at, marker, (px, py, Z)


def through_point(ch_at, inward, u0, u1, f, j, n, spread=0.0):
    """where the j-th of n ions passing through a channel at ch_at is, as ions_through() moves it"""
    src_y, dst_y = (4.2, -4.0) if inward else (-4.0, 4.2)
    a = u0 + (u1 - u0) * j / max(1, n) * 0.85
    b = a + (u1 - u0) * 0.4
    k = span(f, a, b) if f < 1.5 else 1.0
    off = V(0.5 * math.cos(j * 2.1 + spread), 0, 0.5 * math.sin(j * 2.1 + spread))
    start = ch_at + V(0, src_y, 0) + off * 1.6 + V(0, 0.4 * j, 0) * (1 if inward else -1)
    end = ch_at + V(0, dst_y, 0) + off * 2.2 - V(0, 0.4 * j, 0) * (1 if inward else -1)
    path = [start, ch_at + V(0, src_y * 0.6, 0) + off * 0.2, ch_at, ch_at + V(0, dst_y * 0.6, 0) + off * 0.2, end]
    return along(path, k)


def ions_through(tr, frame, ions, ch_at, inward, u0, u1, f, spread=0.0, rest_in=None, rest_out=None):
    """ions passing one at a time through a channel at ch_at while f runs from u0 to u1: from the side they are
    concentrated on to the other; before, they wait near the pore, after, they drift off"""
    for j, o in enumerate(ions):
        tr.pose(o, frame, through_point(ch_at, inward, u0, u1, f, j, len(ions), spread))



# where the channels stand: the gaps in the "Plasma Membrane" download's bilayer (its own channel, integral and inner
# proteins, taken out, and the four spots the prep carves for the proteins the membrane level adds), three.js (x, z)
SPOTS = {'B': (-3.0, 1.8), 'F': (3.2, -2.6), 'G': (-0.13, 3.45), 'E': (-5.56, -3.2), 'C': (3.6, 3.6), 'A': (-6.0, 2.6), 'D': (6.4, 1.72)}


def pacemaker():
    """SA node (pacemaker) action potential (L2 pp 48-51): a patch of the pacemaker cell's plasma membrane, the
    extracellular fluid above (Na+ and Ca2+ ions concentrated there) and the cytoplasm below (K+ concentrated), with
    its three kinds of channel: HCN channels (teal), voltage-gated Ca2+ channels (orange) and voltage-gated K+ channels
    (violet). Above, the membrane potential of pacemaker cells: from about -60 mV it drifts up to the -40 mV threshold
    (the prepotential: "HCN channels open", "Na+ ions into cells"), at threshold the Ca2+ channels open and Ca2+ rushes
    in (the upstroke), then the Ca2+ channels close, the K+ channels open and K+ goes out (repolarization), until the
    hyperpolarized membrane opens the HCN channels again. The marker on the trace follows the slider."""
    K.reset()
    tr = Track()
    HCN, CA, KC = [SPOTS['B'], SPOTS['F']], [SPOTS['G'], SPOTS['E']], [SPOTS['C'], SPOTS['A'], SPOTS['D']]
    COLS = HCN + CA + KC
    lip = bilayer_with_holes(COLS, 1.4)
    K.part(K.join(lip, 'membrane'), 'membrane')
    ecf = K.rounded_box((16.0, 3.4, 10.0), (0, 4.5, 0.3), K.mat('ecf', 0xcaf0f8, 0.8, alpha=0.08), 'ecf', radius=0.5)
    K.part(ecf, 'ecf', shell=True)
    cyt = K.rounded_box((16.0, 3.4, 10.0), (0, -4.3, 0.3), K.mat('cytoplasm', 0xffe5ec, 0.8, alpha=0.08), 'cytoplasm', radius=0.5)
    K.part(cyt, 'cytoplasm', shell=True)
    hm, cm, km = K.mat('hcn', 0x2a9d8f, 0.45), K.mat('cachannels', 0xe85d04, 0.45), K.mat('kchannels', 0x5a189a, 0.45)
    hcn = [channel(V(x, 0.1, z), hm, 'hcn') for x, z in HCN]
    cac = [channel(V(x, 0.1, z), cm, 'cachannels') for x, z in CA]
    kch = [channel(V(x, 0.1, z), km, 'kchannels') for x, z in KC]
    for part, chs in (('hcn', hcn), ('cachannels', cac), ('kchannels', kch)):
        for _, subs in chs:
            for o in subs:
                K.part(o, part)
    nam, cam, kim = K.mat('na', 0x3a86ff, 0.35), K.mat('ca', 0xffb703, 0.35), K.mat('k', 0xc77dff, 0.35)
    ball = lambda r, m, name: K.part(K.sphere(r, (0, 0, 0), m, seg=(12, 8), name=name), name)
    na_in = [[ball(0.2, nam, 'na') for _ in range(3)] for _ in hcn]
    ca_in = [[ball(0.24, cam, 'ca') for _ in range(4)] for _ in cac]
    k_out = [[ball(0.26, kim, 'k') for _ in range(4)] for _ in kch]
    # the gradients: Na+ and Ca2+ crowd the extracellular fluid, K+ the cytoplasm
    rnd = random.Random(3)
    rest = []
    for m, name, n, y0 in ((nam, 'na', 12, 4.6), (cam, 'ca', 6, 4.6), (kim, 'k', 12, -4.4)):
        for _ in range(n):
            c = V((rnd.random() - 0.5) * 13, y0 + (rnd.random() - 0.5) * 2.0, (rnd.random() - 0.5) * 7.5 + 0.3)
            if any((c.x - x) ** 2 + (c.z - z) ** 2 < 2.6 for x, z in COLS):
                continue
            rest.append((ball(0.2 if name == 'na' else 0.24 if name == 'ca' else 0.26, m, name), c))

    def curve(t):
        if t < 0.45:
            return -60 + 20 * (t / 0.45) ** 1.4
        if t < 0.55:
            return -40 + 60 * math.sin(math.pi / 2 * (t - 0.45) / 0.1)
        if t < 0.8:
            return 20 - 80 * span(t, 0.55, 0.8)
        return -60 + 20 * ((t - 0.8) / 0.45) ** 1.4
    point_at, marker, (px, py, Z) = ap_graph(curve, 1.1, -70, 30, [20, 0, -40, -60])
    thm = K.mat('threshold', 0xef476f, 0.5)
    dashes = [K.between((x, py(-40), Z), (x + 0.35, py(-40), Z), 0.035, thm, 'dash', seg=6) for x in [-7 + 0.6 * i for i in range(24)]]
    K.part(K.join(dashes, 'threshold'), 'threshold')
    an = anchors(('na', 'ca', 'k'))

    def place(s, frame):
        p = stage_prog(s, 3)
        pre, up, rep = p(0), p(1), p(2)
        # the channels: HCN open through the prepotential, shutting in the upstroke and opening again at the end;
        # Ca2+ open at threshold, shut as repolarization starts; K+ open in repolarization, shutting in the prepotential
        h_open = (1 - span(up, 0.0, 0.3)) if s < 2 else span(rep, 0.85, 1.0)
        c_open = span(up, 0.0, 0.2) * (1 - span(rep, 0.0, 0.2))
        k_open = (1 - span(pre, 0.0, 0.35)) if s < 1 else span(rep, 0.1, 0.3)
        for ch in hcn:
            open_close(tr, ch, frame, h_open)
        for ch in cac:
            open_close(tr, ch, frame, c_open)
        for ch in kch:
            open_close(tr, ch, frame, k_open)
        for i, ch in enumerate(hcn):
            ions_through(tr, frame, na_in[i], ch[0], True, 0.15, 0.95, pre if s < 1 else 2)
        for i, ch in enumerate(cac):
            ions_through(tr, frame, ca_in[i], ch[0], True, 0.15, 0.9, up if s >= 1 else 0, spread=1.0)
        for i, ch in enumerate(kch):
            ions_through(tr, frame, k_out[i], ch[0], False, 0.25, 0.95, rep if s >= 2 else 0, spread=2.0)
        for j, (o, c) in enumerate(rest):
            tr.pose(o, frame, c + V(math.sin(s * 5.1 + j * 2.3), math.sin(s * 4.3 + j * 1.1), math.sin(s * 4.7 + j * 3.7)) * 0.12)
        # the marker on the trace: stage 0 the prepotential, 1 the upstroke, 2 repolarization
        t = 0.45 * pre if s < 1 else 0.45 + 0.1 * up if s < 2 else 0.55 + 0.25 * rep
        tr.pose(marker, frame, point_at(t))
    sample(place, 3, step=2)

    def labels(s, frame):
        p = stage_prog(s, 3)
        pre, up, rep = p(0), p(1), p(2)
        tr.pose(an['na'], frame, V(HCN[0][0] - 0.8, 3.0 - 6.0 * span(pre if s < 1 else 1, 0.15, 0.55), HCN[0][1] + 0.6))
        tr.pose(an['ca'], frame, V(CA[0][0] - 0.8, 3.0 - 6.0 * span(up if s >= 1 else 0, 0.15, 0.55), CA[0][1] + 0.6))
        tr.pose(an['k'], frame, V(KC[0][0] + 0.8, -3.0 + 6.0 * span(rep if s >= 2 else 0, 0.25, 0.65), KC[0][1] + 0.6))
    sample(labels, 3, step=2)
    tr.write()
    K.anchor('membrane', (-6.6, 2.9, 4.6))
    K.anchor('ecf', (6.0, 6.0, 4.8))
    K.anchor('cytoplasm', (6.0, -5.8, 4.8))
    K.anchor('hcn', (HCN[0][0], 3.6, HCN[0][1] + 0.5))
    K.anchor('cachannels', (CA[0][0], 3.6, CA[0][1] + 0.5))
    K.anchor('kchannels', (KC[0][0], 3.6, KC[0][1] + 0.5))
    K.anchor('potential', (2.0, py(30) + 0.4, Z))
    K.anchor('threshold', (5.5, py(-40) + 0.35, Z))
    VIEW['pacemaker'] = [0.2, 0.35, 1]
    export('pacemaker', ['membrane'])


def myocardial():
    """Myocardial (ventricular muscle) action potential (L2 pp 56-58): the same membrane patch with voltage-gated Na+
    channels (blue), Ca2+ channels (orange) and K+ channels (violet). Rest at about -90 mV; the upstroke as the
    voltage-gated Na+ channels open and Na+ rushes in, then they close; the plateau, Ca2+ channels and K+ channels
    open, Ca2+ in and K+ out in near balance, for 200-300 msec; repolarization, the Ca2+ channels closed and more K+
    channels open, more K+ out, back to rest."""
    K.reset()
    tr = Track()
    NA, CA, KC = [SPOTS['B'], SPOTS['F']], [SPOTS['G'], SPOTS['E']], [SPOTS['C'], SPOTS['A'], SPOTS['D']]
    COLS = NA + CA + KC
    lip = bilayer_with_holes(COLS, 1.4)
    K.part(K.join(lip, 'membrane'), 'membrane')
    K.part(K.rounded_box((16.0, 3.4, 10.0), (0, 4.5, 0.3), K.mat('ecf', 0xcaf0f8, 0.8, alpha=0.08), 'ecf', radius=0.5), 'ecf', shell=True)
    K.part(K.rounded_box((16.0, 3.4, 10.0), (0, -4.3, 0.3), K.mat('cytoplasm', 0xffe5ec, 0.8, alpha=0.08), 'cytoplasm', radius=0.5), 'cytoplasm', shell=True)
    nm, cm, km = K.mat('nachannels', 0x0353a4, 0.45), K.mat('cachannels', 0xe85d04, 0.45), K.mat('kchannels', 0x5a189a, 0.45)
    nac = [channel(V(x, 0.1, z), nm, 'nachannels') for x, z in NA]
    cac = [channel(V(x, 0.1, z), cm, 'cachannels') for x, z in CA]
    kch = [channel(V(x, 0.1, z), km, 'kchannels') for x, z in KC]
    for part, chs in (('nachannels', nac), ('cachannels', cac), ('kchannels', kch)):
        for _, subs in chs:
            for o in subs:
                K.part(o, part)
    nam, cam, kim = K.mat('na', 0x3a86ff, 0.35), K.mat('ca', 0xffb703, 0.35), K.mat('k', 0xc77dff, 0.35)
    ball = lambda r, m, name: K.part(K.sphere(r, (0, 0, 0), m, seg=(12, 8), name=name), name)
    na_in = [[ball(0.2, nam, 'na') for _ in range(5)] for _ in nac]
    ca_in = [[ball(0.24, cam, 'ca') for _ in range(3)] for _ in cac]
    k_out = [[ball(0.26, kim, 'k') for _ in range(5)] for _ in kch]
    rnd = random.Random(4)
    rest = []
    for m, name, n, y0 in ((nam, 'na', 12, 4.6), (cam, 'ca', 6, 4.6), (kim, 'k', 12, -4.4)):
        for _ in range(n):
            c = V((rnd.random() - 0.5) * 13, y0 + (rnd.random() - 0.5) * 2.0, (rnd.random() - 0.5) * 7.5 + 0.3)
            if any((c.x - x) ** 2 + (c.z - z) ** 2 < 2.6 for x, z in COLS):
                continue
            rest.append((ball(0.2 if name == 'na' else 0.24 if name == 'ca' else 0.26, m, name), c))

    def curve(t):
        if t < 0.08:
            return -90
        if t < 0.095:
            return -90 + 110 * span(t, 0.08, 0.095)
        if t < 0.12:
            return 20 - 15 * span(t, 0.095, 0.12)
        if t < 0.34:
            return 5 - 15 * (t - 0.12) / 0.22
        if t < 0.44:
            return -10 - 80 * span(t, 0.34, 0.44)
        return -90
    point_at, marker, (px, py, Z) = ap_graph(curve, 0.55, -100, 30, [20, 0, -90])
    an = anchors(('na', 'ca', 'k'))

    def place(s, frame):
        p = stage_prog(s, 4)
        rest_, dep, pla, rep = p(0), p(1), p(2), p(3)
        n_open = span(dep, 0.0, 0.15) * (1 - span(dep, 0.7, 0.95)) if s >= 1 and s < 2 else 0
        c_open = (span(pla, 0.0, 0.15) if s < 3 else 1 - span(rep, 0.0, 0.2)) if s >= 2 else 0
        k_open2 = (span(pla, 0.05, 0.2) if s < 3 else 1 - span(rep, 0.85, 1.0)) if s >= 2 else 0
        k_open3 = span(rep, 0.05, 0.25) * (1 - span(rep, 0.85, 1.0)) if s >= 3 else 0
        for ch in nac:
            open_close(tr, ch, frame, n_open)
        for ch in cac:
            open_close(tr, ch, frame, c_open)
        for i, ch in enumerate(kch):
            open_close(tr, ch, frame, k_open3 if i == 2 else k_open2)
        for i, ch in enumerate(nac):
            ions_through(tr, frame, na_in[i], ch[0], True, 0.1, 0.75, dep if s >= 1 and s < 2 else (2 if s >= 2 else 0))
        for i, ch in enumerate(cac):
            ions_through(tr, frame, ca_in[i], ch[0], True, 0.15, 0.95, pla if s >= 2 and s < 3 else (2 if s >= 3 else 0), spread=1.0)
        for i, ch in enumerate(kch):
            if i < 2:
                # two K+ out through each K+ channel in the plateau, the rest in repolarization
                k = (pla * 0.4 if s < 3 else 0.4 + 0.6 * rep) if s >= 2 else 0
                ions_through(tr, frame, k_out[i], ch[0], False, 0.05, 0.95, k, spread=2.0)
            else:
                ions_through(tr, frame, k_out[i], ch[0], False, 0.2, 0.9, rep if s >= 3 else 0, spread=2.0)
        for j, (o, c) in enumerate(rest):
            tr.pose(o, frame, c + V(math.sin(s * 5.1 + j * 2.3), math.sin(s * 4.3 + j * 1.1), math.sin(s * 4.7 + j * 3.7)) * 0.12)
        t = 0.08 * rest_ if s < 1 else 0.08 + 0.04 * dep if s < 2 else 0.12 + 0.22 * pla if s < 3 else 0.34 + 0.1 * rep
        tr.pose(marker, frame, point_at(t))
        tr.pose(an['na'], frame, V(NA[0][0] - 0.8, 3.0 - 6.0 * (span(dep, 0.1, 0.5) if s >= 1 else 0) if s < 2 else -3.0, NA[0][1] + 0.6))
        tr.pose(an['ca'], frame, V(CA[0][0] - 0.8, 3.0 - 6.0 * (span(pla, 0.15, 0.55) if s >= 2 else 0) if s < 3 else -3.0, CA[0][1] + 0.6))
        tr.pose(an['k'], frame, V(KC[0][0] + 0.8, -3.0 + 6.0 * (span(pla, 0.05, 0.4) * 0.6 if s < 3 else 0.6 + 0.4 * rep) if s >= 2 else -3.0, KC[0][1] + 0.6))
    sample(place, 4, step=2)
    tr.write()
    K.anchor('membrane', (-6.6, 2.9, 4.6))
    K.anchor('ecf', (6.0, 6.0, 4.8))
    K.anchor('cytoplasm', (6.0, -5.8, 4.8))
    K.anchor('nachannels', (NA[0][0], 3.6, NA[0][1] + 0.5))
    K.anchor('cachannels', (CA[0][0], 3.6, CA[0][1] + 0.5))
    K.anchor('kchannels', (KC[0][0], 3.6, KC[0][1] + 0.5))
    K.anchor('potential', (2.0, py(30) + 0.4, Z))
    VIEW['myocardial'] = [0.2, 0.35, 1]
    export('myocardial', ['membrane'])


def rmp():
    """The resting membrane potential (L8 pp 23-31): the membrane patch of the heart levels, with the extracellular
    fluid above (Na+ crowded there) and the cytosol below (K+ crowded there, with negatively charged proteins too large
    to leave). In it: passive K+ channels (four, as the membrane has many more of them), one passive Na+ channel and
    two Na+/K+ pumps. Slider: (1) "Concentration Gradient": Na+ diffuses in through its channel, K+ out through its
    channels; (2) "The membrane is more permeable to K+ at rest": more K+ leaves while the proteins stay, so the inner
    surface is left negative to the outer (the - and + rows, and the -70 mV of p23); (3) the Na+/K+ pump: 3 Na+ out
    and 2 K+ in through each pump, "a net transfer of positive ions outside the cell". Ions drawn far larger, and far
    fewer, than they are."""
    K.reset()
    tr = Track()
    KP, NP, PU = [SPOTS['C'], SPOTS['A'], SPOTS['D'], SPOTS['E']], [SPOTS['G']], [SPOTS['B'], SPOTS['F']]
    COLS = KP + NP + PU
    lip = bilayer_with_holes(COLS, 1.4)
    K.part(K.join(lip, 'membrane'), 'membrane')
    K.part(K.rounded_box((16.0, 3.4, 10.0), (0, 4.5, 0.3), K.mat('ecf', 0xcaf0f8, 0.8, alpha=0.08), 'ecf', radius=0.5), 'ecf', shell=True)
    K.part(K.rounded_box((16.0, 3.4, 10.0), (0, -4.3, 0.3), K.mat('cytoplasm', 0xffe5ec, 0.8, alpha=0.08), 'cytoplasm', radius=0.5), 'cytoplasm', shell=True)
    km, nm = K.mat('kpassive', 0x5a189a, 0.45), K.mat('napassive', 0x0353a4, 0.45)
    kch = [channel(V(x, 0.1, z), km, 'kpassive') for x, z in KP]
    nch = [channel(V(x, 0.1, z), nm, 'napassive') for x, z in NP]
    for part, chs in (('kpassive', kch), ('napassive', nch)):
        for _, subs in chs:
            for o in subs:
                K.part(o, part)
    # the pumps: seven helices round a pore, the head behind it, in the cytosol, so the ions in front can be seen
    pm = K.mat('pump', 0xffd60a, 0.45)
    K.part(K.join([membrane_protein(V(x, 0.1, z), pm, 7, 0.78, 0.36, 'pump', half=2.7, head=V(x, -3.0, z - 1.3), head_r=0.85)
                   for x, z in PU], 'pump'), 'pump')
    # the negatively charged proteins: large, in the cytosol, each with its minus sign
    prm, sgm = K.mat('proteins', 0x8d99ae, 0.55), K.mat('minus', 0x4cc9f0, 0.4, emit=0x4cc9f0)
    prot = []
    for x, z in ((-4.6, 1.2), (-1.4, -1.0), (1.5, 1.6), (4.9, 0.0), (6.8, -2.8)):
        blob = K.ico(0.75, (0, 0, 0), prm, level=3, name='protein')
        dash = K.box((0.55, 0.13, 0.13), (0, 0, 0.78), sgm, 'minus')
        prot.append((K.part(bake(K.join([blob, dash], 'proteins')), 'proteins'), V(x, -4.7, z)))
    # the charge on the two faces: + along the outside, - along the inside, at the front of the patch
    chm, cmm = K.mat('charge-plus', 0xe63946, 0.4), K.mat('charge', 0x4cc9f0, 0.4, emit=0x4cc9f0)
    signs = []
    for x in [-7.0 + 1.4 * i for i in range(11)]:
        plus = K.join([K.box((0.7, 0.17, 0.17), (0, 0, 0), chm, 'plus'), K.box((0.17, 0.7, 0.17), (0, 0, 0), chm, 'plus')], 'charge')
        signs.append((K.part(bake(plus), 'charge'), V(x + 0.7, 3.1, 5.3)))           # baked: posed at scale 1
        signs.append((K.part(bake(K.box((0.7, 0.17, 0.17), (0, 0, 0), cmm, 'minus')), 'charge'), V(x, -2.9, 5.3)))
    # which side is which, in p27's words, on the back wall of each side
    tm = K.mat('side-text', 0x22333b, 0.6)
    for body, at, part in (('Extracellular fluid', (-7.4, 6.6, -4.4), 'ecf'), ('Na+ more highly concentrated', (-7.4, 5.4, -4.4), 'ecf'),
                           ('Cytosol', (-7.4, -3.4, -4.4), 'cytoplasm'), ('K+ more concentrated', (-7.4, -4.6, -4.4), 'cytoplasm')):
        K.part(text_mesh(body, at, 0.75, tm, part, align='LEFT', res=3), part)
    # the potential: a meter at the side, one lead in the cytosol and one in the extracellular fluid; it reads the
    # inside against the outside
    MX, MY, MZ = 11.2, 0.4, 2.6
    mb, ms = K.mat('potential', 0x495057, 0.5), K.mat('potential-screen', 0x0b1d13, 0.4)
    meter = [K.box((3.4, 2.4, 0.6), (MX, MY, MZ), mb, 'meter', bevel=0.1), K.box((2.8, 1.1, 0.1), (MX, MY + 0.35, MZ + 0.32), ms, 'screen')]
    lin, lout = K.mat('lead-in', 0x4cc9f0, 0.4, emit=0x4cc9f0), K.mat('lead-out', 0xe63946, 0.4)
    for m, a, b in ((lin, (MX - 1.2, MY - 1.2, MZ), (7.4, -4.4, 2.6)), (lout, (MX - 1.2, MY + 1.2, MZ), (7.4, 4.8, 2.6))):
        meter.append(K.between(a, (8.6, b[1], MZ), 0.07, m, 'lead', seg=8))
        meter.append(K.between((8.6, b[1], MZ), b, 0.07, m, 'lead', seg=8))
        meter.append(K.sphere(0.2, b, m, seg=(12, 8), name='tip'))
    K.part(K.join(meter, 'potential'), 'potential')
    rm = K.mat('potential-reading', 0xffd166, 0.4, emit=0xffd166)
    reading = (K.part(bake(text_mesh('-70 mV', (0, 0, 0), 0.75, rm, 'potential', align='CENTER', res=3)), 'potential'), V(MX, MY + 0.35, MZ + 0.4))

    def arrow(L, up, m, name, text=None):
        """an arrow L long pointing up (out of the cell) or down (in), centred on the origin, with optional words at
        its point"""
        sg = 1 if up else -1
        objs = [K.between((0, -sg * L / 2, 0), (0, sg * (L / 2 - 0.6), 0), 0.13, m, name, seg=10)]
        bm = bmesh.new()
        bmesh.ops.create_cone(bm, cap_ends=True, segments=18, radius1=0.38, radius2=0.0, depth=0.6)
        head = K.mesh_obj(name, bm, m)
        head.rotation_euler = (0 if up else math.pi, 0, 0)
        head.location = T((0, sg * (L / 2 - 0.3), 0))
        objs.append(bake(head))
        if text:
            objs.append(bake(text_mesh(text, (0, sg * (L / 2 + 0.55), 0), 0.6, m, name, align='CENTER', res=3)))
        return bake(K.join(objs, name))
    arm_k, arm_na = K.mat('k-arrow', 0xc77dff, 0.4, emit=0xc77dff), K.mat('na-arrow', 0x3a86ff, 0.4, emit=0x3a86ff)
    B, C, G = PU[0], KP[0], NP[0]
    arrows = [(K.part(arrow(5.6, True, arm_k, 'kpassive'), 'kpassive'), V(C[0] + 0.6, 0.3, 5.9), lambda s: s < 2),
              (K.part(arrow(5.6, False, arm_na, 'napassive'), 'napassive'), V(G[0], 0.3, 5.9), lambda s: s < 1),
              (K.part(arrow(5.6, True, arm_na, 'pump', '3 Na+'), 'pump'), V(B[0] - 0.9, 0.0, 5.9), lambda s: s >= 2),
              (K.part(arrow(5.6, False, arm_k, 'pump', '2 K+'), 'pump'), V(B[0] + 0.9, 0.0, 5.9), lambda s: s >= 2)]
    nam, kim = K.mat('na', 0x3a86ff, 0.35), K.mat('k', 0xc77dff, 0.35)
    ball = lambda r, m, name: K.part(K.sphere(r, (0, 0, 0), m, seg=(12, 8), name=name), name)
    k_leak = [[ball(0.26, kim, 'k') for _ in range(2)] for _ in kch]          # out, one in stage 1 and one in stage 2
    na_leak = [[ball(0.2, nam, 'na') for _ in range(2)] for _ in nch]         # in, stage 1
    na_pump = [[ball(0.2, nam, 'na') for _ in range(3)] for _ in PU]          # 3 out per pump, stage 3
    k_pump = [[ball(0.26, kim, 'k') for _ in range(2)] for _ in PU]           # 2 in per pump, stage 3
    # the gradients: many Na+ outside and few in, many K+ inside and few out
    rnd = random.Random(5)
    rest = []
    for m, name, n, y0 in ((nam, 'na', 16, 4.6), (kim, 'k', 3, 4.6), (kim, 'k', 14, -4.4), (nam, 'na', 3, -4.4)):
        got = 0
        while got < n:
            c = V((rnd.random() - 0.5) * 13, y0 + (rnd.random() - 0.5) * 2.0, (rnd.random() - 0.5) * 7.5 + 0.3)
            if any((c.x - x) ** 2 + (c.z - z) ** 2 < 2.6 for x, z in COLS) or any((c - p).length < 1.3 for _, p in prot):
                continue
            rest.append((ball(0.2 if name == 'na' else 0.26, m, name), c))
            got += 1
    an = anchors(('na', 'k'))
    PU3 = [V(x, 0.1, z) for x, z in PU]

    def place(s, frame):
        p = stage_prog(s, 3)
        grad, perm, pump = p(0), p(1), p(2)
        for ch in kch + nch:
            open_close(tr, ch, frame, 1.0)                  # passive: not gated, always open
        for i, ch in enumerate(kch):
            ions_through(tr, frame, k_leak[i][:1], ch[0], False, 0.2 + 0.1 * i, 0.7 + 0.05 * i, grad if s < 1 else 2, spread=2.0)
            ions_through(tr, frame, k_leak[i][1:], ch[0], False, 0.1 + 0.12 * i, 0.6 + 0.08 * i, perm if 1 <= s < 2 else (2 if s >= 2 else 0), spread=3.0)
        for i, ch in enumerate(nch):
            ions_through(tr, frame, na_leak[i], ch[0], True, 0.3, 0.9, grad if s < 1 else 2)
        for i, P in enumerate(PU3):
            ions_through(tr, frame, na_pump[i], P, False, 0.05, 0.55, pump if s >= 2 else 0, spread=0.5 + i)
            ions_through(tr, frame, k_pump[i], P, True, 0.45, 0.95, pump if s >= 2 else 0, spread=1.5 + i)
        for j, (o, c) in enumerate(rest):
            tr.pose(o, frame, c + V(math.sin(s * 5.1 + j * 2.3), math.sin(s * 4.3 + j * 1.1), math.sin(s * 4.7 + j * 3.7)) * 0.12)
        for j, (o, c) in enumerate(prot):
            tr.pose(o, frame, c + V(math.sin(s * 2.1 + j * 1.3), 0.4 * math.sin(s * 1.7 + j * 2.1), math.sin(s * 1.9 + j * 0.7)) * 0.15)
        # the charge rows come as the K+ leaves the proteins behind, left to right
        grow = span(perm, 0.2, 0.9) if s < 2 else 1.0
        for j, (o, c) in enumerate(signs):
            u = (j // 2) / 11
            tr.pose(o, frame, c, None, max(HIDE, span(grow, 0.6 * u, 0.4 + 0.6 * u)) if s >= 1 else HIDE)
        # the meter reads as the charge builds; the arrows show which way each ion goes in each step
        tr.pose(reading[0], frame, reading[1], None, HIDE if s < 1 else max(HIDE, span(perm, 0.3, 0.9)) if s < 2 else 1)
        for o, at, when in arrows:
            tr.pose(o, frame, at, None, 1 if when(s) else HIDE)
        # the labels ride a moving ion: the Na+ coming in, then the first one pumped out; the first K+ out, then in
        na_at = through_point(nch[0][0], True, 0.3, 0.9, grad if s < 1 else 2, 0, 2) if s < 2 else through_point(PU3[0], False, 0.05, 0.55, pump, 0, 3, 0.5)
        k_at = through_point(kch[0][0], False, 0.2, 0.7, grad if s < 1 else 2, 0, 1, 2.0) if s < 2 else through_point(PU3[0], True, 0.45, 0.95, pump, 0, 2, 1.5)
        tr.pose(an['na'], frame, na_at + V(0.3, 0.4, 0.3))
        tr.pose(an['k'], frame, k_at + V(0.35, 0.45, 0.3))
    sample(place, 3, step=2)
    tr.write()
    K.anchor('membrane', (-6.6, 2.0, 4.6))
    K.anchor('ecf', (-7.2, 6.0, -4.3))
    K.anchor('cytoplasm', (-7.2, -3.6, -4.3))
    K.anchor('kpassive', (KP[0][0], 3.6, KP[0][1] + 0.5))
    K.anchor('napassive', (NP[0][0], 3.6, NP[0][1] + 0.5))
    K.anchor('pump', (PU[0][0], 3.4, PU[0][1] + 0.6))
    K.anchor('proteins', tuple(prot[0][1] + V(0, 0.9, 0.3)))
    K.anchor('charge', (-5.6, -2.9, 5.4))
    K.anchor('potential', (MX, MY + 1.4, MZ + 0.3))
    VIEW['rmp'] = [0.2, 0.35, 1]
    export('rmp', ['membrane'])


# ------------------------------------------------------------------ reproduction: testis and follicle ----
def hormone(r, m, name):
    """a hormone molecule, drawn as a glowing bead far larger than it is"""
    return K.part(K.sphere(r, (0, 0, 0), m, seg=(14, 10), name=name), name)


def fib_dirs(n, z_max=1.0, seed=0):
    """n directions spread evenly over the sphere, kept to three z <= z_max (behind a cut made at the front)"""
    out, i = [], 0
    while len(out) < n:
        y = 1 - 2 * (i + 0.5) / (n * 3)
        r = math.sqrt(max(0.0, 1 - y * y))
        a = i * 2.39996 + seed
        d = V(r * math.cos(a), y, r * math.sin(a))
        if d.z <= z_max:
            out.append(d)
        i += 1
    return out


def testis():
    """Hormonal Control of Spermatogenesis (L6 pp 3-15), on a slice of one seminiferous tubule as the p3 figure cuts
    it: the spermatogonia at the outermost layer, primary and secondary spermatocytes and spermatids toward the lumen,
    the nurse (Sertoli) cells reaching from the wall to the lumen, the interstitial (Leydig) cells outside the tubule
    and a capillary. Slider, the slide's own steps (p15, p11): (1) LH, brought by the blood, reaches the Leydig cells,
    which secrete testosterone into the tubule; (2) FSH reaches the Sertoli cells, which make androgen-binding protein
    (ABP); ABP binds the testosterone, concentrating it round the developing cells; (3) spermatogenesis proceeds toward
    the lumen: spermatids differentiate into spermatozoa, which lose contact with the wall and enter the fluid in the
    lumen; (4) the Sertoli cells' inhibin goes into the blood, to the pituitary, which secretes less FSH. Hormones are
    drawn as beads far larger than they are."""
    K.reset()
    tr = Track()
    rnd = random.Random(61)
    R, H = 7.6, 2.8                                   # the tubule's radius; the slice's depth (three z)
    CX = R + 3.4                                      # the capillary runs up the right side, outside the tubule
    K.part(K.between((0, 0, -H / 2), (0, 0, H / 2), R + 0.35, K.mat('tubule', 0xf1c0c8, 0.6, alpha=0.16), 'tubule', seg=72), 'tubule', shell=True)
    K.part(K.between((0, 0, -H / 2 + 0.05), (0, 0, H / 2 - 0.05), 2.3, K.mat('lumen', 0xf8f9fa, 0.8, alpha=0.1), 'lumen', seg=48), 'lumen', shell=True)
    SA = [2 * math.pi * k / 9 + 0.17 for k in range(9)]           # the nurse cells' angles

    def clear(a, r, gap):
        return all(abs(((a - s + math.pi) % (2 * math.pi)) - math.pi) * r > gap for s in SA)
    # the nurse (Sertoli) cells: each a column from the wall to the lumen, its broad base on the wall
    sm = K.mat('sertoli', 0x9d4edd, 0.5)
    ser = []
    for s in SA:
        u = V(math.cos(s), math.sin(s), 0)
        ser.append(K.between(tuple(u * (R - 0.3)), tuple(u * 2.5), 0.4, sm, 'sertoli', seg=12))
        ser.append(K.sphere(0.62, tuple(u * (R - 0.75)), sm, seg=(16, 10), scale=(1.0, 1.0, 1.4), name='sertoli'))
    K.part(bake(K.join(ser, 'sertoli')), 'sertoli')

    def ring(r, cell, m, name, rows=(-0.6, 0.6), gap=0.95):
        objs, n = [], int(2 * math.pi * r / (cell * 2.25))
        for z in rows:
            for i in range(n):
                a = 2 * math.pi * (i + (0.5 if z > 0 else 0)) / n
                if not clear(a, r, gap):
                    continue
                p = V(math.cos(a) * r, math.sin(a) * r, z) + V(rnd.random() - 0.5, rnd.random() - 0.5, 0) * 0.15
                objs.append(K.sphere(cell, tuple(p), m, seg=(16, 10), name=name))
        return bake(K.join(objs, name))
    K.part(ring(6.85, 0.5, K.mat('spermatogonium', 0x1d4e89, 0.5), 'spermatogonium'), 'spermatogonium')
    K.part(ring(5.6, 0.66, K.mat('primary', 0x3a7ca5, 0.5), 'primary'), 'primary')
    K.part(ring(4.3, 0.5, K.mat('secondary', 0x5fa8d3, 0.5), 'secondary'), 'secondary')
    # spermatids, one by one (each becomes a spermatozoon), and the spermatozoa they become
    sid_a = [a for a in (2 * math.pi * i / 22 + 0.05 for i in range(22)) if clear(a, 3.2, 0.55)]
    dm, zm = K.mat('spermatids', 0x90e0ef, 0.5), K.mat('spermatozoa', 0x343a40, 0.45)
    spermatids = [K.part(K.sphere(0.36, (0, 0, 0), dm, seg=(14, 10), name='spermatids'), 'spermatids') for _ in sid_a]

    def spermatozoon():
        head = K.sphere(0.24, (0, 0, 0), zm, seg=(14, 10), scale=(1.5, 0.9, 0.9), name='head')
        tail = K.curve_tube([(-0.3, 0, 0), (-1.0, 0.14, 0), (-1.7, -0.14, 0), (-2.4, 0.1, 0), (-3.0, 0, 0)], 0.05, zm, 'tail', res=4)
        return K.part(bake(K.join([head, tail], 'spermatozoa')), 'spermatozoa')
    sperm = [spermatozoon() for _ in sid_a]
    sperm_end = [(V(math.cos(a), math.sin(a), 0) * (1.2 + 0.6 * rnd.random()) + V(0, 0, (rnd.random() - 0.5) * 1.2),
                  a + (rnd.random() - 0.5) * 1.2) for a in sid_a]
    # interstitial (Leydig) cells, in clusters outside the tubule, and the capillary
    lm = K.mat('leydig', 0xe5989b, 0.5)
    LY = [V(R + 1.5, 4.7, 0), V(R + 1.5, -4.7, 0), V(-(R + 1.3), 5.2, 0), V(-(R + 1.3), -5.2, 0)]
    ley = []
    for c in LY:
        for d in (V(-0.5, 0.45, 0.3), V(0.5, 0.4, -0.3), V(0.0, -0.5, 0.2), V(-0.1, 0.1, -0.6)):
            ley.append(K.sphere(0.6, tuple(c + d), lm, seg=(16, 10), name='leydig'))
    K.part(bake(K.join(ley, 'leydig')), 'leydig')
    K.part(K.between((CX, -10.5, 0), (CX, 10.5, 0), 0.75, K.mat('capillary', 0xd62828, 0.5, alpha=0.35), 'capillary', seg=24), 'capillary', shell=True)
    # the hormones
    lhm, fsm = K.mat('lh', 0xff9f1c, 0.35, emit=0xff9f1c), K.mat('fsh', 0x2dc653, 0.35, emit=0x2dc653)
    tm_, abm = K.mat('testosterone', 0xffd60a, 0.35, emit=0xffd60a), K.mat('abp', 0x4cc9f0, 0.35)
    inm = K.mat('inhibin', 0xf15bb5, 0.35, emit=0xf15bb5)
    lh = [hormone(0.26, lhm, 'lh') for _ in range(8)]
    fsh = [hormone(0.28, fsm, 'fsh') for _ in range(8)]
    tes = [hormone(0.2, tm_, 'testosterone') for _ in range(12)]
    abp = [hormone(0.24, abm, 'abp') for _ in range(12)]
    inh = [hormone(0.24, inm, 'inhibin') for _ in range(6)]
    RIGHT = [s for s in SA if math.cos(s) > 0.2]
    t_at = [V(math.cos(a) * r, math.sin(a) * r, (rnd.random() - 0.5) * 1.6)
            for a, r in ((-1.0 + 2.0 * j / 11, 3.6 + 2.6 * rnd.random()) for j in range(12))]
    an = anchors(('lh', 'fsh', 'testosterone', 'abp', 'inhibin', 'spermatozoa'))

    def wob(i, s, a=0.08):
        return V(math.sin(s * 6.1 + i * 2.3), math.sin(s * 5.3 + i * 1.1), math.sin(s * 5.7 + i * 3.7)) * a

    def place(s, frame):
        p = stage_prog(s, 4)
        lhs, fs, gen, inb = p(0), p(1), p(2), p(3)
        # (1) LH up the capillary to the Leydig cells; testosterone from them into the tubule
        for j, o in enumerate(lh):
            tgt = LY[j % 2] + V(0.9, 0.0, 0.0) + V(0, 0.35 * (j // 2 - 1.5), 0.5 * ((j % 4) - 1.5) * 0.5)
            path = [V(CX, -10.0 - 0.8 * j, 0.1), V(CX, tgt.y, 0.1), tgt]
            k = span(lhs, 0.05 * j, 0.4 + 0.05 * j)
            tr.pose(o, frame, along(path, k) + wob(j, s))
        for j, o in enumerate(tes):
            src = LY[j % 2]
            k = span(lhs, 0.45 + 0.03 * j, 0.8 + 0.015 * j)
            at = lerp(src, t_at[j], k)
            if fs > 0:                                   # bound to ABP, held among the developing cells
                at = lerp(at, t_at[j] * 0.92, span(fs, 0.6, 1.0))
            tr.pose(o, frame, at + wob(j + 10, s, 0.05), None, 1 if k > 0.02 else HIDE)
        # (2) FSH to the Sertoli cells; ABP from them, binding the testosterone
        for j, o in enumerate(fsh):
            sa = RIGHT[j % len(RIGHT)]
            tgt = V(math.cos(sa), math.sin(sa), 0) * (R - 0.2) + V(0, 0, 0.5 * ((j // len(RIGHT)) - 0.5) * 2)
            path = [V(CX, -10.0 - 0.8 * j, -0.1), V(CX, tgt.y, -0.1), tgt]
            k = span(fs, 0.04 * j, 0.4 + 0.04 * j)
            tr.pose(o, frame, along(path, k) + wob(j + 30, s), None, max(HIDE, 1 - span(inb, 0.4, 0.9)))
        for j, o in enumerate(abp):
            sa = min(SA, key=lambda q: abs(((q - math.atan2(t_at[j].y, t_at[j].x) + math.pi) % (2 * math.pi)) - math.pi))
            src = V(math.cos(sa), math.sin(sa), 0) * 5.0
            k = span(fs, 0.45 + 0.03 * j, 0.85 + 0.01 * j)
            at = lerp(src, t_at[j] * 0.92 + V(0.25, 0.2, 0.15), k)
            tr.pose(o, frame, at + wob(j + 10, s, 0.05), None, 1 if k > 0.02 else HIDE)
        # (3) spermatids become spermatozoa, which leave the wall and enter the fluid in the lumen
        for j, (o, z) in enumerate(zip(spermatids, sperm)):
            a = sid_a[j]
            home = V(math.cos(a), math.sin(a), 0) * 3.2
            k = span(gen, 0.05 + 0.025 * j, 0.45 + 0.025 * j)
            tr.pose(o, frame, home, None, max(HIDE, 1 - k))
            end, rot = sperm_end[j]
            m = span(gen, 0.45 + 0.02 * j, 0.95)
            at = lerp(home + V(math.cos(a), math.sin(a), 0) * 0.2, end, m)
            tr.pose(z, frame, at + wob(j + 50, s, 0.05 * m), q_three((0, 0, 1), mix(a, rot, m)), max(HIDE, k))
        # (4) inhibin from the Sertoli cells into the blood; less FSH arrives
        for j, o in enumerate(inh):
            sa = RIGHT[j % len(RIGHT)]
            src = V(math.cos(sa), math.sin(sa), 0) * 5.4
            path = [src, V(math.cos(sa), math.sin(sa), 0) * (R + 0.6), V(CX, src.y, 0.3), V(CX, 11.0 + 0.6 * j, 0.3)]
            k = span(inb, 0.05 + 0.06 * j, 0.6 + 0.06 * j)
            tr.pose(o, frame, along(path, k) + wob(j + 70, s), None, 1 if 0.01 < k < 0.99 else HIDE)
        tr.pose(an['lh'], frame, along([V(CX, -10.0, 0.1), V(CX, LY[0].y, 0.1), LY[0] + V(0.9, -0.5, 0)], span(lhs, 0, 0.4)) + V(0.4, 0.5, 0.4))
        tr.pose(an['testosterone'], frame, lerp(LY[0], t_at[0], span(lhs, 0.45, 0.8)) + V(0.3, 0.4, 0.3))
        tr.pose(an['fsh'], frame, along([V(CX, -10.0, -0.1), V(CX, (R - 0.2) * math.sin(RIGHT[0]), -0.1), V(math.cos(RIGHT[0]), math.sin(RIGHT[0]), 0) * (R - 0.2)], span(fs, 0, 0.4)) + V(0.4, 0.5, 0.4))
        tr.pose(an['abp'], frame, t_at[3] * 0.92 + V(0.6, 0.6, 0.5))
        sa = RIGHT[0]
        tr.pose(an['inhibin'], frame, along([V(math.cos(sa), math.sin(sa), 0) * 5.4, V(math.cos(sa), math.sin(sa), 0) * (R + 0.6), V(CX, 5.4 * math.sin(sa), 0.3), V(CX, 11.0, 0.3)], span(inb, 0.05, 0.6)) + V(0.4, 0.5, 0.4))
        tr.pose(an['spermatozoa'], frame, sperm_end[0][0] + V(0.3, 0.5, 0.5))
    sample(place, 4, step=2)
    tr.write()
    K.anchor('tubule', (0, R + 0.4, 1.4))
    K.anchor('lumen', (-1.2, 0.6, 0.6))
    K.anchor('sertoli', tuple(V(math.cos(SA[2]), math.sin(SA[2]), 0) * 4.4 + V(0, 0, 0.5)))
    K.anchor('spermatogonium', tuple(V(math.cos(-2.3), math.sin(-2.3), 0) * 6.85 + V(0, 0, 0.9)))
    K.anchor('primary', tuple(V(math.cos(-1.9), math.sin(-1.9), 0) * 5.6 + V(0, 0, 1.2)))
    K.anchor('secondary', tuple(V(math.cos(2.6), math.sin(2.6), 0) * 4.3 + V(0, 0, 1.0)))
    K.anchor('spermatids', tuple(V(math.cos(sid_a[5]), math.sin(sid_a[5]), 0) * 3.2 + V(0, 0, 0.5)))
    K.anchor('leydig', tuple(LY[2] + V(0, 0.9, 0.5)))
    K.anchor('capillary', (CX, 8.5, 0.8))
    VIEW['testis'] = [0.12, 0.2, 1]
    export('testis', [])


def half_shell(r, thick, m, name, lump=0.0, seed=0, seg=(48, 24)):
    """the back half of a hollow sphere (three z <= 0), r its outside, thick its wall: a follicle's layer cut open
    toward the viewer"""
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=seg[0], v_segments=seg[1], radius=r)
    bmesh.ops.delete(bm, geom=[f for f in bm.faces if f.calc_center_median().y < 0], context='FACES')   # a meridian lies on the cut
    o = K.mesh_obj(name, bm, m)
    if lump:
        K.lumpy(o, lump, 0.35, seed)
        o = K.apply(o)
    if thick:
        sol = o.modifiers.new('wall', 'SOLIDIFY')
        sol.thickness, sol.offset, sol.use_rim = thick, -1.0, True
        o = K.apply(o)
    return K.smooth(o)


def half_ball(r, m, name):
    """the back half of a solid sphere, its cut face closed: fluid filling a cut-open follicle"""
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=40, v_segments=20, radius=r)
    bmesh.ops.delete(bm, geom=[f for f in bm.faces if f.calc_center_median().y < 0], context='FACES')   # a meridian lies on the cut
    bmesh.ops.holes_fill(bm, edges=bm.edges[:], sides=0)
    return K.smooth(K.mesh_obj(name, bm, m))


def follicle():
    """The ovarian cycle (L6 pp 24-37) in one follicle, cut open toward the viewer, in a block of the ovary below its
    outer surface, with a capillary: the oocyte in its zona pellucida, the granulosa cells round it, the theca outside
    them (the p28 figure's layers). Slider, the slide's phases: (1) Follicular phase, "Initiated by FSH": FSH from the
    blood binds the follicle, which grows from a primary follicle to a Graafian follicle, its antrum filling with
    follicular fluid and the oocyte in its corona radiata; estrogen rises; (2) the LH surge: LH floods in, and "FSH
    causes the Graafian follicle to bulge out of the ovary wall"; (3) Ovulation: the follicle ruptures, releasing the
    secondary oocyte within its corona radiata, with follicular fluid; (4) Luteal phase: LH turns the ruptured follicle
    into a corpus luteum, which secretes estrogen and progesterone; their high levels shut FSH and LH down. Hormones
    are drawn as beads far larger than they are."""
    K.reset()
    tr = Track()
    rnd = random.Random(71)
    TOP = 5.0                                          # the outer surface of the ovary
    K.part(K.rounded_box((20.0, 12.0, 9.0), (0, TOP - 6.0, 0), K.mat('ovary', 0xf5cac3, 0.7, alpha=0.12), 'ovary', radius=0.6), 'ovary', shell=True)
    CAP_Y = -5.6
    K.part(K.between((-10.2, CAP_Y, 0.6), (10.2, CAP_Y, 0.6), 0.75, K.mat('capillary', 0xd62828, 0.5, alpha=0.35), 'capillary', seg=24), 'capillary', shell=True)
    # primordial follicles, waiting in the ovary: a small oocyte in one layer of flat cells
    pm, pcm = K.mat('primordial', 0x7fd1d6, 0.5), K.mat('primordial-cells', 0xf4a259, 0.5)
    prim = []
    for c in (V(-7.6, 2.8, -1.0), V(-6.2, -1.2, 1.4), V(6.8, 3.0, -1.2), V(7.6, -1.6, 0.8), V(-8.0, -3.4, -0.4), V(5.4, -3.6, 1.6)):
        prim.append(K.sphere(0.32, tuple(c), pm, seg=(14, 10), name='primordial'))
        for d in fib_dirs(10, seed=c.x):
            prim.append(K.sphere(0.13, tuple(c + d * 0.44), pcm, seg=(8, 6), scale=(1.3, 1.3, 0.6), name='primordial'))
    K.part(bake(K.join(prim, 'primordial')), 'primordial')
    # the follicle's layers, made at unit size round the origin and posed (scaled) each frame
    theca = K.part(half_shell(1.0, 0.07, K.mat('theca', 0x8c4a1c, 0.55), 'follicle'), 'follicle')     # its wall: outer layer
    gran = K.part(half_shell(0.93, 0.26, K.mat('granulosa', 0xf6bd60, 0.6), 'follicle'), 'follicle')   # and its cells
    antrum = K.part(half_ball(1.0, K.mat('antrum', 0xffe8a3, 0.8, alpha=0.4), 'antrum'), 'antrum', shell=True)
    om = K.mat('oocyte', 0x7fd1d6, 0.4, alpha=0.85)
    oocyte = K.part(bake(K.join([K.sphere(1.0, (0, 0, 0), om, seg=(32, 20), name='oocyte'),
                                 K.sphere(0.3, (0.1, 0.15, 0.2), K.mat('oocyte-nucleus', 0x1b6f75, 0.4), seg=(16, 10), name='oocyte')], 'oocyte')), 'oocyte')
    zona = K.part(K.sphere(1.0, (0, 0, 0), K.mat('zona', 0xf1faee, 0.5, alpha=0.35), seg=(32, 20), name='zona'), 'zona', shell=True)
    crm = K.mat('corona', 0xf6bd60, 0.6)
    corona = K.part(bake(K.join([K.sphere(0.17, tuple(d * 1.25), crm, seg=(8, 6), name='corona') for d in fib_dirs(46, seed=3)], 'corona')), 'corona')
    cl = K.part(K.apply(K.lumpy(K.ico(1.0, (0, 0, 0), K.mat('cl', 0xffd60a, 0.55), level=4, name='cl'), 0.12, 0.4, 5)), 'cl')
    fluid = [K.part(K.sphere(0.32, (0, 0, 0), K.mat('antrum-drop', 0xffe8a3, 0.8, alpha=0.5), seg=(12, 8), name='antrum'), 'antrum', shell=True) for _ in range(7)]
    # the hormones
    fsm, lhm = K.mat('fsh', 0x2dc653, 0.35, emit=0x2dc653), K.mat('lh', 0xff9f1c, 0.35, emit=0xff9f1c)
    esm, prm = K.mat('estrogen', 0xff70a6, 0.35, emit=0xff70a6), K.mat('progesterone', 0x9b5de5, 0.35, emit=0x9b5de5)
    fsh = [hormone(0.26, fsm, 'fsh') for _ in range(10)]
    lh = [hormone(0.26, lhm, 'lh') for _ in range(12)]
    est = [hormone(0.22, esm, 'estrogen') for _ in range(14)]
    pro = [hormone(0.22, prm, 'progesterone') for _ in range(9)]
    DF, DL = fib_dirs(10, 0.15, seed=1), fib_dirs(12, 0.15, seed=2)
    ESC = [V(-8.5 + 1.2 * j, CAP_Y + 0.25 * ((j % 3) - 1), 0.6 + 0.3 * ((j % 2) - 0.5)) for j in range(14)]
    PSC = [V(-7.9 + 1.7 * j, CAP_Y - 0.3, 0.9) for j in range(9)]
    an = anchors(('oocyte', 'zona', 'corona', 'follicle', 'antrum', 'cl', 'fsh', 'lh', 'estrogen', 'progesterone'))

    def state(s):
        """the follicle at slider value s: its centre, radius, antrum radius, oocyte radius and place"""
        p = stage_prog(s, 4)
        fol, surge, ovu, lut = p(0), p(1), p(2), p(3)
        g = span(fol, 0.0, 0.9)
        Rf = mix(1.3, 3.7, g * g * (3 - 2 * g)) + 0.55 * span(surge, 0.1, 0.9) - 1.2 * span(ovu, 0.35, 1.0)
        F = V(0, mix(-2.4, 0.4, g) + 1.15 * span(surge, 0.1, 0.9) - 0.6 * span(ovu, 0.4, 1.0), 0)
        ant = Rf * 0.8 * span(fol, 0.3, 0.85) * (1 - span(ovu, 0.15, 0.7))
        orad = mix(0.55, 0.85, span(fol, 0.0, 0.3))
        o_at = F + V(0, -(Rf - orad - 0.55) * span(fol, 0.3, 0.85), 0.25) if ovu == 0 else None
        return p, F, Rf, ant, orad, o_at

    def place(s, frame):
        (p, F, Rf, ant, orad, o_at) = state(s)
        fol, surge, ovu, lut = p(0), p(1), p(2), p(3)
        wall = 1 - span(lut, 0.1, 0.6)                      # the ruptured wall gives way to the corpus luteum
        tr.pose(theca, frame, F, None, max(HIDE, Rf * wall))
        tr.pose(gran, frame, F, None, max(HIDE, Rf * wall))
        tr.pose(antrum, frame, F, None, max(HIDE, ant))
        tr.pose(cl, frame, F + V(0, -0.2, 0), None, max(HIDE, mix(0, 2.6, span(lut, 0.05, 0.6))))
        # the oocyte: grows in the primary follicle, is pushed to one side as the antrum fills, and at ovulation
        # leaves through the ruptured wall, in its corona radiata, with the follicular fluid
        _, F0, R0, _, _, at0 = state(min(s, 1.999))
        leave = span(ovu, 0.1, 0.85)
        out = [at0, F0 + V(0.4, R0 + 0.4, 0.4), V(2.4, TOP + 2.2, 1.0)]
        at = o_at if o_at is not None else along(out, leave)
        tr.pose(oocyte, frame, at, None, orad)
        tr.pose(zona, frame, at, None, max(HIDE, (orad + 0.13) * span(fol, 0.1, 0.3)))
        tr.pose(corona, frame, at, None, max(HIDE, (orad + 0.13) * span(fol, 0.45, 0.8)))
        for j, o in enumerate(fluid):
            d = V(math.cos(j * 0.9) * 0.9, 0, math.sin(j * 0.9) * 0.6)
            path = [F0 + d * 0.5, F0 + V(0, R0, 0) + d * 0.3, F0 + V(0, R0 + 2.2 + 0.4 * j, 0) + d * 2.2]
            k = span(ovu, 0.1 + 0.05 * j, 0.7 + 0.04 * j)
            tr.pose(o, frame, along(path, k), None, max(HIDE, (1.0 if 0.02 < k else 0) * (1 - span(lut, 0.2, 0.6))))
        # FSH from the blood to the follicle, held there; shut down in the luteal phase
        for j, o in enumerate(fsh):
            on_f = F + DF[j] * (Rf * wall + 0.25)
            path = [V(-10.4 - 0.8 * j, CAP_Y, 0.6), V(-2.0 + 0.5 * j, CAP_Y, 0.6), on_f]
            k = span(fol, 0.03 * j, 0.35 + 0.03 * j)
            tr.pose(o, frame, along(path, k), None, max(HIDE, 1 - span(lut, 0.55, 0.95) - span(ovu, 0.3, 0.8)))
        # LH: the surge floods in to the Graafian follicle; after ovulation it turns the ruptured follicle into the
        # corpus luteum; shut down at the end
        for j, o in enumerate(lh):
            r_on = Rf * wall + 0.25 if lut < 0.3 else mix(Rf * wall + 0.25, 2.85, span(lut, 0.1, 0.6))
            on_f = F + DL[j] * r_on
            path = [V(-10.4 - 0.6 * j, CAP_Y, 0.4), V(-1.5 + 0.4 * j, CAP_Y, 0.4), on_f]
            k = span(surge, 0.02 * j, 0.4 + 0.03 * j)
            tr.pose(o, frame, along(path, k), None, max(HIDE, 1 - span(lut, 0.65, 1.0)))
        # estrogen: rising through the follicular phase (into the blood), and again from the corpus luteum
        for j, o in enumerate(est):
            if j < 9:
                src = F + DF[j % 10] * Rf
                k = span(fol, 0.3 + 0.06 * j, 0.55 + 0.05 * j)
            else:
                src = F + DL[j % 12] * 2.6
                k = span(lut, 0.35 + 0.08 * (j - 9), 0.6 + 0.07 * (j - 9))
            tr.pose(o, frame, lerp(src, ESC[j], k) + V(0, 0, 0.08 * math.sin(s * 5 + j)), None, 1 if k > 0.01 else HIDE)
        for j, o in enumerate(pro):
            src = F + DL[j % 12] * 2.6
            k = span(lut, 0.3 + 0.05 * j, 0.62 + 0.04 * j)
            tr.pose(o, frame, lerp(src, PSC[j], k) + V(0, 0, 0.08 * math.sin(s * 5 + j)), None, 1 if k > 0.01 else HIDE)
        # labels
        tr.pose(an['oocyte'], frame, at + V(0, orad + 0.3, 0.6))
        tr.pose(an['zona'], frame, at + V(orad + 0.1, 0, 0.5))
        tr.pose(an['corona'], frame, at + V(-orad - 0.3, 0.3, 0.5))
        tr.pose(an['follicle'], frame, F + V(-0.75, 0.35, 0) * (Rf * wall))
        tr.pose(an['antrum'], frame, F + V(0.2, 0.25, 0.2) * max(ant, 0.4))
        tr.pose(an['cl'], frame, F + V(0, 2.6, 0.8))
        tr.pose(an['fsh'], frame, F + DF[0] * (Rf * wall + 0.25) + V(0.3, 0.3, 0.3) if fol > 0.35 else along([V(-10.4, CAP_Y, 0.6), V(-2.0, CAP_Y, 0.6), F + DF[0] * (Rf + 0.25)], span(fol, 0, 0.35)) + V(0.3, 0.4, 0.3))
        tr.pose(an['lh'], frame, F + DL[0] * (Rf * wall + 0.25) + V(0.3, 0.3, 0.3) if surge >= 0.4 else along([V(-10.4, CAP_Y, 0.4), V(-1.5, CAP_Y, 0.4), F + DL[0] * (Rf + 0.25)], span(surge, 0, 0.4)) + V(0.3, 0.4, 0.3))
        tr.pose(an['estrogen'], frame, ESC[0] + V(0, 0.5, 0.4))
        tr.pose(an['progesterone'], frame, PSC[4] + V(0, -0.6, 0.4))
    sample(place, 4, step=2)
    tr.write()
    K.anchor('ovary', (7.0, TOP + 0.05, 2.0))
    K.anchor('capillary', (8.4, CAP_Y + 0.8, 1.2))
    K.anchor('primordial', (-7.6, 3.4, -0.6))
    VIEW['follicle'] = [0.12, 0.22, 1]
    export('follicle', [])


def oogenesis():
    """Oogenesis as the L6 p23 figure draws it, a lineage read top to bottom beside a timeline of a woman's life:
    an oogonium divides by mitosis into oogonia (fetal life), one becomes a primary oocyte (46 chromosomes; seven
    million are made in the first six months of embryonic life, p22), the first meiotic division (begun in utero,
    finished before ovulation) makes a secondary oocyte (23) and the first polar body, and the second meiotic division,
    which takes place only if there is fertilization (p24), makes the ovum (23) and the second polar body; both polar
    bodies disintegrate (the lecturer's red arrows). Every cell stays in the tree, as in the figure; each new one grows
    out of its parent along the connecting line."""
    K.reset()
    tr = Track()
    gm, pm, sm, om = K.mat('oogonia', 0xbc4b21, 0.5), K.mat('primary', 0x7ec4cf, 0.45), K.mat('secondary', 0x5fb8c4, 0.45), K.mat('ovum', 0xa05fb0, 0.45)
    bm_ = K.mat('polar1', 0x22223b, 0.5)
    b2m = K.mat('polar2', 0x22223b, 0.5)
    nuc = K.mat('nuclei', 0x2b2d42, 0.4)

    def cell(r, m, name, n_r=0.28):
        return K.part(bake(K.join([K.sphere(r, (0, 0, 0), m, seg=(28, 18), name=name),
                                   K.sphere(n_r, (0, 0, r * 0.88), nuc, seg=(12, 8), name=name)], name)), name)
    # where each cell sits (three.js), its parent, and its radius
    G0 = V(0, 7.2, 0)
    G1 = [V(-2.4, 4.9, 0), V(2.4, 4.9, 0)]
    G2 = [V(-3.6, 2.7, 0), V(-1.2, 2.7, 0), V(1.2, 2.7, 0), V(3.6, 2.7, 0)]
    P, S, B1, O, B2 = V(1.2, -0.7, 0), V(2.6, -4.0, 0), V(-0.4, -3.7, 0), V(3.6, -7.3, 0), V(1.2, -7.0, 0)
    og = [cell(0.75, gm, 'oogonia') for _ in range(7)]
    og_at = [G0] + G1 + G2
    og_from = [G0, G0, G0, G1[0], G1[0], G1[1], G1[1]]
    primary = cell(1.3, pm, 'primary', 0.42)
    secondary = cell(1.2, sm, 'secondary', 0.38)
    ovum = cell(1.1, om, 'ovum', 0.36)
    pb1 = K.part(K.sphere(0.32, (0, 0, 0), bm_, seg=(14, 10), name='polar1'), 'polar1')
    pb2 = K.part(K.sphere(0.28, (0, 0, 0), b2m, seg=(14, 10), name='polar2'), 'polar2')
    bits = [K.part(K.sphere(0.09, (0, 0, 0), bm_ if j < 5 else b2m, seg=(8, 6), name='polar1' if j < 5 else 'polar2'), 'polar1' if j < 5 else 'polar2') for j in range(10)]
    # the lines of descent, each a unit rod grown from parent to child as the child appears
    lm = K.mat('lineage', 0x6c757d, 0.6)
    links = [(og_from[i], og_at[i]) for i in range(1, 7)] + [(G2[2], P), (P, S), (P, B1), (S, O), (S, B2)]
    rods = [K.decor(unit_rod(lm, 'lineage', seg=8), 'lineage') for _ in links]
    # chromosomes per cell, as the figure's table gives them
    tm = K.mat('counts', 0xe9ecef, 0.6)
    counts = []
    for body, at in (('46', G0), ('46', P), ('23', S), ('23', O)):
        counts.append((K.decor(bake(text_mesh(body, (0, 0, 0), 0.55, tm, 'count', align='LEFT', res=3)), 'count'), at))
    # the timeline of a woman's life down the left, as the figure has it, with a marker that follows the slider
    xm = K.mat('timeline', 0xadb5bd, 0.6)
    TL = -7.2
    tl = [K.between((TL, 8.2, 0), (TL, -8.4, 0), 0.05, xm, 'timeline', seg=8)]
    for body, y in (('Fetal life', 5.2), ('Birth', 1.1), ('Childhood', 0.0), ('Puberty', -1.6), ('Adult reproductive life', -5.2)):
        tl.append(text_mesh(body, (TL - 0.4, y, 0), 0.45, xm, 'timeline', res=3))
    for y in (1.1, -1.6):
        tl += [K.between((x, y, 0), (x + 0.35, y, 0), 0.03, xm, 'timeline', seg=6) for x in [TL + 0.4 + 0.6 * i for i in range(14)]]
    K.decor(K.join(tl, 'timeline'), 'timeline')
    marker = K.decor(K.sphere(0.22, (0, 0, 0), K.mat('timeline-marker', 0xff006e, 0.35, emit=0xff006e), seg=(14, 10), name='marker'), 'marker')
    # the sperm whose entry lets the second meiotic division take place
    zm = K.mat('sperm', 0x343a40, 0.45)
    sperm = K.part(bake(K.join([K.sphere(0.2, (0, 0, 0), zm, seg=(12, 8), scale=(1.5, 0.9, 0.9), name='sperm'),
                                K.curve_tube([(0.25, 0, 0), (0.9, 0.12, 0), (1.5, -0.12, 0), (2.1, 0.1, 0), (2.6, 0, 0)], 0.045, zm, 'sperm', res=4)], 'sperm')), 'sperm')
    an = anchors(('oogonia', 'primary', 'secondary', 'polar1', 'polar2', 'ovum', 'sperm'))
    rnd = random.Random(81)
    drift = [V(rnd.random() - 0.5, rnd.random() - 0.5, rnd.random() - 0.5) * 1.6 for _ in bits]

    def grow(o, frame, src, dst, k, size=1.0):
        """a cell growing out of its parent: from src (small) to dst (full size) as k goes 0 to 1"""
        tr.pose(o, frame, lerp(src, dst, k), None, max(HIDE, size * mix(0.35, 1.0, k)) if k > 0.01 else HIDE)

    def place(s, frame):
        p = stage_prog(s, 4)
        mit, pri, m1, m2 = p(0), p(1), p(2), p(3)
        # (1) mitosis: one oogonium, then two, then four
        tr.pose(og[0], frame, G0)
        for i in range(1, 7):
            k = span(mit, 0.05, 0.45) if i < 3 else span(mit, 0.5, 0.95)
            grow(og[i], frame, og_from[i], og_at[i], k)
        # (2) one oogonium becomes a primary oocyte
        kp = span(pri, 0.1, 0.8)
        grow(primary, frame, G2[2], P, kp)
        # (3) the first meiotic division: a secondary oocyte and the first polar body, by far the smaller
        k1 = span(m1, 0.15, 0.85)
        grow(secondary, frame, P, S, k1)
        gone1 = span(m2, 0.75, 1.0)
        tr.pose(pb1, frame, lerp(P, B1, k1), None, max(HIDE, mix(0.35, 1.0, k1) * (1 - gone1)) if k1 > 0.01 else HIDE)
        # (4) a sperm reaches the secondary oocyte; the second meiotic division: the ovum and the second polar body;
        # both polar bodies disintegrate
        ks = span(m2, 0.0, 0.3)
        tip = S + V(1.25, 0.3, 0.2)
        tr.pose(sperm, frame, lerp(S + V(7.0, 2.2, 0.4), tip, ks), q_three((0, 0, 1), 0.2), 1 if m2 > 0.01 and m2 < 0.98 else HIDE)
        k2 = span(m2, 0.3, 0.75)
        grow(ovum, frame, S, O, k2)
        tr.pose(pb2, frame, lerp(S, B2, k2), None, max(HIDE, mix(0.35, 1.0, k2) * (1 - gone1)) if k2 > 0.01 else HIDE)
        for j, o in enumerate(bits):
            home = B1 if j < 5 else B2
            tr.pose(o, frame, home + drift[j] * gone1, None, 1 if 0.02 < gone1 < 0.98 else HIDE)
        for idx, (o, (a, b)) in enumerate(zip(rods, links)):
            k = (span(mit, 0.05, 0.45) if idx < 2 else span(mit, 0.5, 0.95)) if idx < 6 else kp if idx == 6 else k1 if idx < 9 else k2
            if idx in (8, 10):                           # the polar bodies' lines go as they disintegrate
                k *= 1 - gone1
            tr.rod(o, frame, a, lerp(a, b, k), 0.05, k > 0.05)
        for o, at in counts:
            show = 1 if at == G0 else kp if at == P else k1 if at == S else k2
            tr.pose(o, frame, at + V(1.5, 0.3, 0), None, 1 if show > 0.9 else HIDE)
        # the marker on the timeline: fetal life through mitosis and the primary oocyte, birth to puberty while
        # the oocyte waits, adult life for both divisions
        y = mix(6.8, 2.0, mit) if s < 1 else mix(2.0, -1.6, pri) if s < 2 else mix(-1.6, -4.2, m1) if s < 3 else mix(-4.2, -7.4, m2)
        tr.pose(marker, frame, V(TL, y, 0))
        tr.pose(an['oogonia'], frame, G2[0] + V(0, 0.95, 0.4))
        tr.pose(an['primary'], frame, lerp(G2[2], P, kp) + V(0, 1.5, 0.5))
        tr.pose(an['secondary'], frame, lerp(P, S, k1) + V(0, 1.4, 0.5))
        tr.pose(an['polar1'], frame, lerp(P, B1, k1) + V(0, 0.5, 0.3))
        tr.pose(an['polar2'], frame, lerp(S, B2, k2) + V(0, 0.5, 0.3))
        tr.pose(an['ovum'], frame, lerp(S, O, k2) + V(0, 1.3, 0.5))
        tr.pose(an['sperm'], frame, lerp(S + V(7.0, 2.2, 0.4), tip, ks) + V(0.8, 0.5, 0.3))
    sample(place, 4, step=2)
    tr.write()
    VIEW['oogenesis'] = [0.05, 0.1, 1]
    export('oogenesis', [])
