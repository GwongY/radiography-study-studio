"""
The heart atlas's pericardium, built in Blender from the atlas's own heart (HSS2011 Cardiovascular system p7: "The
pericardium is a double-walled sac that surrounds and protects the heart": outer fibrous pericardium; inner serous
pericardium, its outer parietal layer and inner visceral layer (epicardium); the pericardial cavity between the
parietal and visceral layers, containing pericardial fluid).

    node work/build-pericardium.mjs                    # the atlas wall and great-vessel roots -> work/.heart-build/heart.obj
    blender --background --factory-startup --python work/blender/pericardium.py
    node work/heart-atlas-check.mjs                    # what this wrote, held to the heart and to the slide

Everything stays in the atlas's (BetterHeart's) frame: y up, +z anterior, +x the patient's left; nothing is turned
into Blender's axes, so the numbers go back out as they came in. Each layer is a sphere shrink-wrapped onto the heart
at its own distance, so the sac is smooth where the epicardium follows the sulci. A window is cut in the front of
the sac (wider in the fibrous layer than the parietal, so both edges show) to let the heart be seen inside. The
pericardial cavity is drawn far wider than it is (it holds only 15-50 mL of fluid), so it can be seen and tapped.

Writes outputs/heart/pericardium.json (the heart-manifest.json shape) and outputs/heart/pericardium.bin.
"""
import os
import sys
import json
import math
import struct
import bpy
import bmesh
from mathutils import Vector

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
OBJ = os.path.join(ROOT, 'work', '.heart-build', 'heart.obj')
OUT = os.path.join(ROOT, 'outputs', 'heart')

# the layers, inside out: distance from the heart, thickness, the window's radius (0: no window), triangles kept
EPI = dict(key='EPI', offset=0.025, thick=0.0, window=0.0, tris=5000)
CAVITY = dict(key='PC', offset=0.165, thick=0.0, window=0.78, tris=5000)    # the volume inside the parietal layer
PARIETAL = dict(key='PP', offset=0.165, thick=0.025, window=0.78, tris=4000)
FIBROUS = dict(key='FP', offset=0.19, thick=0.07, window=0.95, tris=4000)
WINDOW_AT = Vector((-0.1, -0.45))          # the window's centre, (x, y), looking from the front (+z)
TOP, BOTTOM = 1.12, -1.95                  # the sac is open above TOP (round the great vessels) and the IVC is cut at BOTTOM


def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def read_obj(path):
    """{object name: (vertices, faces)} from the exporter's OBJ"""
    out, name, base, verts = {}, None, 1, []
    for line in open(path):
        p = line.split()
        if not p:
            continue
        if p[0] == 'o':
            name = p[1]
            out[name] = ([], [])
        elif p[0] == 'v':
            v = tuple(float(x) for x in p[1:4])
            out[name][0].append(v)
            verts.append(v)
        elif p[0] == 'f':
            out[name][1].append(tuple(int(x) - 1 for x in p[1:4]))
    # faces index the whole file; make them local
    start = 0
    for k, (vs, fs) in out.items():
        out[k] = (vs, [tuple(i - start for i in f) for f in fs])
        start += len(vs)
    return out


def mesh(name, verts, faces):
    me = bpy.data.meshes.new(name)
    me.from_pydata(verts, [], faces)
    me.update()
    o = bpy.data.objects.new(name, me)
    bpy.context.scene.collection.objects.link(o)
    return o


def apply_all(o):
    bpy.context.view_layer.objects.active = o
    for m in list(o.modifiers):
        bpy.ops.object.modifier_apply(modifier=m.name)
    return o


def clip(o, lo, hi):
    """keep the part of o between heights lo and hi"""
    bm = bmesh.new()
    bm.from_mesh(o.data)
    for co, no, inner in ((Vector((0, hi, 0)), Vector((0, 1, 0)), True), (Vector((0, lo, 0)), Vector((0, -1, 0)), True)):
        geom = bm.verts[:] + bm.edges[:] + bm.faces[:]
        bmesh.ops.bisect_plane(bm, geom=geom, plane_co=co, plane_no=no, clear_outer=inner)
    bm.to_mesh(o.data)
    bm.free()
    return o


def outer_skin(o):
    """keep the largest connected piece of a mesh: after a voxel remesh, the outside of the heart (the chambers'
    insides come out as pieces of their own)"""
    bm = bmesh.new()
    bm.from_mesh(o.data)
    bm.verts.ensure_lookup_table()
    seen, best = set(), []
    for v in bm.verts:
        if v.index in seen:
            continue
        piece, stack = [], [v]
        seen.add(v.index)
        while stack:
            x = stack.pop()
            piece.append(x)
            for e in x.link_edges:
                y = e.other_vert(x)
                if y.index not in seen:
                    seen.add(y.index)
                    stack.append(y)
        if len(piece) > len(best):
            best = piece
    keep = set(v.index for v in best)
    bmesh.ops.delete(bm, geom=[v for v in bm.verts if v.index not in keep], context='VERTS')
    bm.to_mesh(o.data)
    bm.free()
    return o


def wrapped(target, offset, voxel, smooth, name):
    """a closed surface round target: remeshed into one solid at `voxel`, its outer skin kept and smoothed
    `smooth` times, then pushed out along its normals by `offset` and evened out"""
    o = target.copy()
    o.data = target.data.copy()
    o.name = name
    bpy.context.scene.collection.objects.link(o)
    rm = o.modifiers.new('remesh', 'REMESH')
    rm.mode = 'VOXEL'
    rm.voxel_size = voxel
    apply_all(o)
    outer_skin(o)
    sm = o.modifiers.new('smooth', 'LAPLACIANSMOOTH')
    sm.iterations = smooth
    sm.lambda_factor = 1.0
    apply_all(o)
    bm = bmesh.new()
    bm.from_mesh(o.data)
    bm.normal_update()
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    bm.normal_update()
    for v in bm.verts:
        v.co += v.normal * offset
    bm.to_mesh(o.data)
    bm.free()
    rm = o.modifiers.new('even', 'REMESH')
    rm.mode = 'VOXEL'
    rm.voxel_size = 0.03
    apply_all(o)
    outer_skin(o)
    return o


def window(o, r):
    """cut a round window through the front of the sac"""
    if r <= 0:
        return o
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=48, radius1=r, radius2=r, depth=4.0)
    me = bpy.data.meshes.new('cutter')
    bm.to_mesh(me)
    bm.free()
    cutter = bpy.data.objects.new('cutter', me)
    bpy.context.scene.collection.objects.link(cutter)
    cutter.location = (WINDOW_AT.x, WINDOW_AT.y, 2.0)       # a cylinder along z, from z = 0 forward
    b = o.modifiers.new('window', 'BOOLEAN')
    b.operation = 'DIFFERENCE'
    b.object = cutter
    b.solver = 'EXACT'
    apply_all(o)
    bpy.data.objects.remove(cutter)
    return o


def open_top(o):
    """the sac stops where it turns onto the great vessels"""
    bm = bmesh.new()
    bm.from_mesh(o.data)
    bmesh.ops.bisect_plane(bm, geom=bm.verts[:] + bm.edges[:] + bm.faces[:], plane_co=(0, TOP, 0), plane_no=(0, 1, 0), clear_outer=True)
    bm.to_mesh(o.data)
    bm.free()
    return o


def window_faces(o, r):
    """take out the faces of an open surface inside the window (in front, within r of its centre)"""
    bm = bmesh.new()
    bm.from_mesh(o.data)
    gone = [f for f in bm.faces if (lambda c: c.z > 0 and (c.x - WINDOW_AT.x) ** 2 + (c.y - WINDOW_AT.y) ** 2 < r * r)(f.calc_center_median())]
    bmesh.ops.delete(bm, geom=gone, context='FACES')
    bm.to_mesh(o.data)
    bm.free()
    return o


def layer(o, spec):
    if spec['thick'] > 0:
        # a sheet: windowed first, then given its thickness, so the window has a clean rim
        o = window_faces(o, spec['window'])
        s = o.modifiers.new('solid', 'SOLIDIFY')
        s.thickness = spec['thick']
        s.offset = 1.0                                          # outward from the wrapped surface
        s.use_rim = True
        apply_all(o)
    else:
        o = window(o, spec['window'])
    n = len(o.data.polygons)
    if n > spec['tris']:
        d = o.modifiers.new('decimate', 'DECIMATE')
        d.ratio = spec['tris'] / n
        apply_all(o)
    bm = bmesh.new()
    bm.from_mesh(o.data)
    bmesh.ops.triangulate(bm, faces=bm.faces[:])
    bm.to_mesh(o.data)
    bm.free()
    return o


def payload(o):
    me = o.data
    pos = [c for v in me.vertices for c in v.co]
    idx = [i for p in me.polygons for i in p.vertices]
    return pos, idx


def main():
    reset()
    parts = read_obj(OBJ)

    def together(name, keys):
        vs, fs = [], []
        for k in keys:
            v, f = parts[k]
            fs += [tuple(i + len(vs) for i in t) for t in f]
            vs += v
        return mesh(name, vs, fs)
    # the wall alone (for the epicardium) and the wall with the great vessels' roots (for the sac)
    wall = together('wall', [k for k in parts if k.startswith('wall_')])
    sac_target = clip(together('sac-target', list(parts)), BOTTOM, TOP + 0.3)

    out = []
    epi = wrapped(wall, EPI['offset'], 0.07, 4, 'EPI')    # coarse enough that the four chambers fuse into one
    out.append((EPI, layer(epi, EPI)))
    # the sac: one smooth shape round the heart and the great vessels' roots, each layer at its own distance
    sac = lambda spec: wrapped(sac_target, spec['offset'], 0.12, 30, spec['key'])
    # the pericardial cavity: inside the parietal layer, outside the epicardium
    cav = sac(CAVITY)
    b = cav.modifiers.new('heart', 'BOOLEAN')
    b.operation = 'DIFFERENCE'
    b.object = epi
    b.solver = 'EXACT'
    apply_all(cav)
    out.append((CAVITY, layer(open_top(cav), CAVITY)))
    for spec in (PARIETAL, FIBROUS):
        out.append((spec, layer(open_top(sac(spec)), spec)))

    names = {'EPI': 'Visceral layer (epicardium)', 'PC': 'Pericardial cavity', 'PP': 'Parietal layer', 'FP': 'Fibrous pericardium'}
    blob, metas = bytearray(), []
    for spec, o in out:
        pos, idx = payload(o)
        xs, ys, zs = pos[0::3], pos[1::3], pos[2::3]
        meta = {'group': 'pericardium', 'key': spec['key'], 'english': names[spec['key']],
                'positionOffset': len(blob), 'positionCount': len(pos)}
        blob += struct.pack(f'<{len(pos)}f', *pos)
        meta.update(indexOffset=len(blob), indexCount=len(idx))
        blob += struct.pack(f'<{len(idx)}I', *idx)
        meta.update(min=[min(xs), min(ys), min(zs)], max=[max(xs), max(ys), max(zs)])
        metas.append(meta)
        print(f'{spec["key"]}: {len(pos) // 3} vertices, {len(idx) // 3} triangles')
    open(os.path.join(OUT, 'pericardium.bin'), 'wb').write(bytes(blob))
    json.dump({'version': 1, 'meshes': metas}, open(os.path.join(OUT, 'pericardium.json'), 'w', newline='\n'), indent=1)
    print('wrote outputs/heart/pericardium.json and pericardium.bin')


main()
