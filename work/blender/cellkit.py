"""
Cell zoom, step 2 of work/build-cell-models.mjs: the Blender helpers every level script uses.

Coordinates are written as three.js / glTF (x, y, z) with y up, the frame the app's levels are drawn in
(outputs/cell/zoom-scene.js), and turned into Blender's z-up here (T); the glTF exporter turns them back. A part is an
object with the custom property czPart (exported as extras); a shell (picked only when nothing else is under the tap)
also has czShell; an unlabelled piece has czDecor. A label anchor is an empty with czAnchorOf, parented to what it
labels when that moves. The stage slider is the scene timeline: stage k runs from second k to second k + 1 (FPS frames
a second); a hormone signal's run starts at the second scene extras czClips names.
"""
import bpy
import bmesh
import math
import random
from mathutils import Vector, Matrix, Quaternion
from mathutils.bvhtree import BVHTree

FPS = 24
_mats = {}
C3 = Matrix(((1, 0, 0), (0, 0, -1), (0, 1, 0)))   # three.js -> Blender


def T(x, y=None, z=None):
    """a three.js point (x, y, z) in Blender's frame"""
    if y is None:
        x, y, z = x
    return Vector((x, -z, y))


def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    _mats.clear()
    sc = bpy.context.scene
    sc.render.fps = FPS
    sc.frame_start = 0
    return sc


def mat(name, colour, rough=0.55, alpha=1.0, metal=0.0, emit=None):
    """a Principled material, cached by name; alpha below 1 exports as glTF BLEND"""
    if name in _mats:
        return _mats[name]
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes.get('Principled BSDF')
    c = colour if isinstance(colour, (tuple, list)) else hexrgb(colour)
    b.inputs['Base Color'].default_value = (*c, 1)
    b.inputs['Roughness'].default_value = rough
    b.inputs['Metallic'].default_value = metal
    if alpha < 1:
        b.inputs['Alpha'].default_value = alpha
        if hasattr(m, 'surface_render_method'):
            m.surface_render_method = 'BLENDED'
        else:
            m.blend_method = 'BLEND'
    if emit is not None:
        b.inputs['Emission Color'].default_value = (*hexrgb(emit), 1)
        b.inputs['Emission Strength'].default_value = 0.6
    _mats[name] = m
    return m


def hexrgb(h):
    """sRGB hex -> linear rgb, as Blender wants it"""
    def lin(c):
        c = c / 255
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    return (lin((h >> 16) & 255), lin((h >> 8) & 255), lin(h & 255))


def link(o):
    bpy.context.scene.collection.objects.link(o)
    return o


def mesh_obj(name, bm, material=None):
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    o = link(bpy.data.objects.new(name, me))
    if material:
        o.data.materials.append(material)
    return o


def part(o, name, shell=False):
    o['czPart'] = name
    if shell:
        o['czShell'] = True
    o.name = f'cz-{name}'
    return o


def decor(o, name='decor'):
    o['czDecor'] = True
    o.name = f'cz-{name}'
    return o


def anchor(name, at, parent=None):
    e = link(bpy.data.objects.new(f'cz-anchor-{name}', None))
    e['czAnchorOf'] = name
    e.empty_display_size = 0.2
    e.location = at if isinstance(at, Vector) else T(at)
    if parent is not None:
        # the anchor's own transform is its place in the parent's frame (no parent-inverse matrix: the .glb has none);
        # a new parent's matrix_world is stale until the view layer updates
        bpy.context.view_layer.update()
        e.parent = parent
        e.matrix_parent_inverse = Matrix.Identity(4)
        e.location = parent.matrix_world.inverted() @ e.location
    return e


def smooth(o, level=0, angle=None):
    for p in o.data.polygons:
        p.use_smooth = True
    if level:
        m = o.modifiers.new('sub', 'SUBSURF')
        m.levels = level
        m.render_levels = level
    return o


def lumpy(o, strength=0.08, size=0.6, seed=0):
    """an organic wobble: a Displace modifier on a noise texture"""
    tex = bpy.data.textures.new(f'n{seed}{o.name}', 'CLOUDS')
    tex.noise_scale = size
    m = o.modifiers.new('lump', 'DISPLACE')
    m.texture = tex
    m.strength = strength
    m.mid_level = 0.5
    return o


def sphere(r, at=(0, 0, 0), material=None, seg=(32, 16), scale=None, name='sphere'):
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=seg[0], v_segments=seg[1], radius=r)
    o = mesh_obj(name, bm, material)
    o.location = T(at) if not isinstance(at, Vector) else at
    if scale:
        o.scale = (scale[0], scale[2], scale[1])
    return smooth(o)


def ico(r, at=(0, 0, 0), material=None, level=2, name='ico'):
    bm = bmesh.new()
    bmesh.ops.create_icosphere(bm, subdivisions=level, radius=r)
    o = mesh_obj(name, bm, material)
    o.location = T(at) if not isinstance(at, Vector) else at
    return smooth(o)


def box(size, at=(0, 0, 0), material=None, name='box', bevel=0.0):
    """size and at in three.js order (x, y, z)"""
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1)
    o = mesh_obj(name, bm, material)
    o.scale = (size[0], size[2], size[1])
    o.location = T(at)
    if bevel:
        m = o.modifiers.new('bev', 'BEVEL')
        m.width = bevel
        m.segments = 3
    return o


def rounded_box(size, at=(0, 0, 0), material=None, name='box', radius=1.0, segments=10):
    """a box of `size` (three.js x, y, z) with its edges and corners rounded to `radius`: the mesh is made at its
    size and then bevelled (box()'s bevel acts on the unit cube before its scale, which rounds a long box into an
    ellipsoid). in_rounded_box() is its inside test."""
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1)
    bmesh.ops.scale(bm, vec=(size[0], size[2], size[1]), verts=bm.verts)
    o = mesh_obj(name, bm, material)
    o.location = T(at)
    m = o.modifiers.new('bev', 'BEVEL')
    m.width = radius
    m.segments = segments
    m.limit_method = 'NONE'
    return smooth(apply(o))


def in_rounded_box(c, size, bevel, clear):
    """a three.js point c is at least `clear` inside a box of `size` (centred on the origin) whose edges are
    rounded with radius `bevel` (box(..., bevel=...))"""
    q = [max(0.0, abs(c[i]) - (size[i] / 2 - bevel)) for i in range(3)]
    return all(abs(c[i]) <= size[i] / 2 - clear for i in range(3)) and math.sqrt(sum(x * x for x in q)) <= bevel - clear


def curve_tube(points, r, material=None, name='tube', closed=False, caps=True, res=6):
    """a smooth tube through three.js points (a bevelled NURBS-ish poly curve), as a mesh"""
    cu = bpy.data.curves.new(name, 'CURVE')
    cu.dimensions = '3D'
    cu.bevel_depth = r
    cu.bevel_resolution = 3
    cu.resolution_u = res
    cu.use_fill_caps = caps
    sp = cu.splines.new('BEZIER')
    pts = [T(p) if not isinstance(p, Vector) else p for p in points]
    sp.bezier_points.add(len(pts) - 1)
    for bp, p in zip(sp.bezier_points, pts):
        bp.co = p
        bp.handle_left_type = bp.handle_right_type = 'AUTO'
    sp.use_cyclic_u = closed
    o = link(bpy.data.objects.new(name, cu))
    if material:
        o.data.materials.append(material)
    return to_mesh(o)


def to_mesh(o):
    """apply modifiers / convert a curve: what is exported is what is seen"""
    dg = bpy.context.evaluated_depsgraph_get()
    ev = o.evaluated_get(dg)
    me = bpy.data.meshes.new_from_object(ev)
    n = link(bpy.data.objects.new(o.name, me))
    n.matrix_world = o.matrix_world
    for k in o.keys():
        n[k] = o[k]
    if not me.materials and getattr(o.data, 'materials', None):
        for m in o.data.materials:
            me.materials.append(m)
    bpy.data.objects.remove(o)
    for p in me.polygons:
        p.use_smooth = True
    return n


def between(a, b, r, material=None, name='rod', seg=12):
    """a cylinder from three.js point a to b"""
    a, b = (T(a) if not isinstance(a, Vector) else a), (T(b) if not isinstance(b, Vector) else b)
    d = b - a
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=seg, radius1=r, radius2=r, depth=d.length)
    o = mesh_obj(name, bm, material)
    o.location = (a + b) / 2
    o.rotation_mode = 'QUATERNION'
    o.rotation_quaternion = Vector((0, 0, 1)).rotation_difference(d.normalized())
    return smooth(o)


def torus(R, r, at=(0, 0, 0), material=None, name='torus', axis=(0, 1, 0), seg=(32, 10)):
    bm = bmesh.new()
    bpy.ops.mesh.primitive_torus_add(major_radius=R, minor_radius=r, major_segments=seg[0], minor_segments=seg[1])
    o = bpy.context.object
    o.name = name
    if material:
        o.data.materials.append(material)
    o.location = T(at)
    o.rotation_mode = 'QUATERNION'
    o.rotation_quaternion = Vector((0, 0, 1)).rotation_difference(T(axis).normalized())
    bm.free()
    return smooth(o)


def join(objs, name):
    objs = [o for o in objs if o is not None]
    if len(objs) == 1:
        objs[0].name = name
        return objs[0]
    for o in bpy.context.selected_objects:
        o.select_set(False)
    for o in objs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    bpy.ops.object.join()
    o = bpy.context.object
    o.name = name
    return o


def apply(o):
    """bake an object's modifiers into its mesh"""
    if o.type == 'MESH' and o.modifiers:
        return to_mesh(o)
    return o


def import_glb(path):
    """the prepared download (work/.cell-build/prep/*.glb); returns its mesh objects, keyed by czPart"""
    before = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=path)
    got = [o for o in bpy.data.objects if o not in before]
    out = {}
    for o in got:
        if o.type == 'MESH':
            o.parent = None
            out.setdefault(o.get('czPart', o.name), []).append(o)
        elif o.type == 'EMPTY':
            bpy.data.objects.remove(o)
    return out


def place3(o, at, q=None, s=None):
    """pose an object with a three.js position, quaternion (x, y, z, w) and scale"""
    o.rotation_mode = 'QUATERNION'
    o.location = T(at)
    if q is not None:
        m3 = Quaternion((q[3], q[0], q[1], q[2])).to_matrix()
        o.rotation_quaternion = (C3 @ m3 @ C3.inverted()).to_quaternion()
    if s is not None:
        s = s if isinstance(s, (list, tuple)) else (s, s, s)
        o.scale = (s[0], s[2], s[1])
    return o


def dup(o, linked=True):
    n = o.copy()
    if not linked:
        n.data = o.data.copy()
    return link(n)


def bvh(objs):
    dg = bpy.context.evaluated_depsgraph_get()
    trees = []
    for o in objs:
        bm = bmesh.new()
        bm.from_object(o.evaluated_get(dg), dg)
        bm.transform(o.matrix_world)
        trees.append((o, BVHTree.FromBMesh(bm)))
        bm.free()
    return trees


def cast(trees, origin, direction):
    """the nearest hit among (object, tree) pairs: (object, location) or None"""
    best = None
    for o, t in trees:
        loc, nrm, idx, dist = t.ray_cast(origin, direction)
        if loc is not None and (best is None or dist < best[2]):
            best = (o, loc, dist)
    return None if best is None else (best[0], best[1])


def key(o, frame, loc=None, scale=None, rot=None, interp=None):
    """keyframe a pose at a frame (positions and scales in three.js terms)"""
    sc = bpy.context.scene
    sc.frame_set(int(frame))
    if loc is not None:
        o.location = T(loc) if not isinstance(loc, Vector) else loc
        o.keyframe_insert('location', frame=frame)
    if scale is not None:
        s = scale if isinstance(scale, (list, tuple)) else (scale, scale, scale)
        o.scale = (s[0], s[2], s[1])
        o.keyframe_insert('scale', frame=frame)
    if rot is not None:
        o.rotation_mode = 'QUATERNION'
        o.rotation_quaternion = rot
        o.keyframe_insert('rotation_quaternion', frame=frame)
    if interp and o.animation_data and o.animation_data.action:
        for fc in fcurves_of(o):
            for kp in fc.keyframe_points:
                if abs(kp.co.x - frame) < 1e-3:
                    kp.interpolation = interp


def fcurves_of(o):
    a = o.animation_data.action if o.animation_data else None
    if a is None:
        return []
    if hasattr(a, 'fcurves'):
        return list(a.fcurves)
    out = []                                     # Blender 4.4+ layered actions
    for layer in a.layers:
        for strip in layer.strips:
            for bag in strip.channelbags:
                out.extend(bag.fcurves)
    return out


def shown(o, frames):
    """o is there (scale 1) only on the listed (from, to) spans of seconds, popping in and out over ~0.15 s"""
    eps = 0.15
    key(o, 0, scale=0.001)
    for a, b in frames:
        key(o, max(0, (a - eps)) * FPS, scale=0.001)
        key(o, a * FPS, scale=1)
        key(o, b * FPS, scale=1)
        key(o, (b + eps) * FPS, scale=0.001)


def export(path, extras=None, sampled=True):
    """the scene as a .glb. sampled: bake every frame (the downloads' levels); else the keyframes as they are (the
    modelled levels key every frame or two already, linearly)"""
    sc = bpy.context.scene
    for k, v in (extras or {}).items():
        sc[k] = v
    end = 0
    for o in bpy.data.objects:
        keyed = [o] + ([o.data.shape_keys] if o.type == 'MESH' and o.data.shape_keys else [])
        for x in keyed:
            for fc in fcurves_of(x):
                end = max(end, max(kp.co.x for kp in fc.keyframe_points))
    sc.frame_end = max(1, int(math.ceil(end)))
    kw = dict(filepath=path, export_format='GLB', export_extras=True, export_apply=True, export_yup=True,
              export_cameras=False, export_lights=False, export_animations=end > 0)
    if end > 0:
        kw.update(export_animation_mode='SCENE', export_force_sampling=sampled, export_frame_range=False)
    try:
        bpy.ops.export_scene.gltf(**kw)
    except TypeError:
        kw.pop('export_animation_mode', None)
        bpy.ops.export_scene.gltf(**kw)


def scatter(rnd, n, inside, tries=20000):
    out = []
    for _ in range(tries):
        if len(out) >= n:
            break
        p = inside(rnd)
        if p is not None:
            out.append(p)
    return out


def separate(o):
    """split an object into its loose parts; returns the pieces"""
    for x in bpy.context.selected_objects:
        x.select_set(False)
    o.select_set(True)
    bpy.context.view_layer.objects.active = o
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.mesh.separate(type='LOOSE')
    bpy.ops.object.mode_set(mode='OBJECT')
    return list(bpy.context.selected_objects)


def bounds(o):
    """world-space (min, max) Vectors of an object's vertices"""
    pts = [o.matrix_world @ v.co for v in o.data.vertices]
    return (Vector((min(p.x for p in pts), min(p.y for p in pts), min(p.z for p in pts))),
            Vector((max(p.x for p in pts), max(p.y for p in pts), max(p.z for p in pts))))


def recolour(o, material):
    o.data.materials.clear()
    o.data.materials.append(material)
    return o


def inside_test(objs):
    """p (Blender) inside the closed surface of objs: a ray crosses it an odd number of times"""
    trees = bvh(objs)
    d = Vector((0.577, 0.577, 0.577))

    def inside(p):
        n = 0
        for _, t in trees:
            q = p.copy()
            for _ in range(64):
                loc, nrm, idx, dist = t.ray_cast(q, d)
                if loc is None:
                    break
                n += 1
                q = loc + d * 1e-4
        return n % 2 == 1
    return inside
