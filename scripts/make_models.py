"""Генерирует упрощённые low-poly 3D-модели (GLB) для AR-блока.
Это стилизованные макеты, а не точные копии объектов. Замените файлы
в assets/models/ на детальные модели, когда они появятся.
Запуск: python3 scripts/make_models.py
"""
import json, math, struct

class Mesh:
    def __init__(self):
        self.parts = {}  # color -> (pos, nrm, idx)
    def _p(self, color):
        return self.parts.setdefault(color, ([], [], []))
    def tri_list(self, color, verts, normals, faces):
        pos, nrm, idx = self._p(color)
        base = len(pos)
        pos += verts; nrm += normals
        idx += [i + base for f in faces for i in f]
    def box(self, color, cx, cy, cz, sx, sy, sz):
        x0,x1 = cx-sx/2, cx+sx/2; y0,y1 = cy, cy+sy; z0,z1 = cz-sz/2, cz+sz/2
        faces = [((0,0,1),[(x0,y0,z1),(x1,y0,z1),(x1,y1,z1),(x0,y1,z1)]),
                 ((0,0,-1),[(x1,y0,z0),(x0,y0,z0),(x0,y1,z0),(x1,y1,z0)]),
                 ((1,0,0),[(x1,y0,z1),(x1,y0,z0),(x1,y1,z0),(x1,y1,z1)]),
                 ((-1,0,0),[(x0,y0,z0),(x0,y0,z1),(x0,y1,z1),(x0,y1,z0)]),
                 ((0,1,0),[(x0,y1,z1),(x1,y1,z1),(x1,y1,z0),(x0,y1,z0)]),
                 ((0,-1,0),[(x0,y0,z0),(x1,y0,z0),(x1,y0,z1),(x0,y0,z1)])]
        for n, q in faces:
            self.tri_list(color, q, [n]*4, [(0,1,2),(0,2,3)])
    def cylinder(self, color, cx, cy, cz, r, h, seg=16, r_top=None):
        r_top = r if r_top is None else r_top
        v, n, f = [], [], []
        for i in range(seg):
            a0, a1 = 2*math.pi*i/seg, 2*math.pi*(i+1)/seg
            for a in (a0, a1):
                pass
            p = [(cx+r*math.cos(a0), cy, cz+r*math.sin(a0)), (cx+r*math.cos(a1), cy, cz+r*math.sin(a1)),
                 (cx+r_top*math.cos(a1), cy+h, cz+r_top*math.sin(a1)), (cx+r_top*math.cos(a0), cy+h, cz+r_top*math.sin(a0))]
            am = (a0+a1)/2; k = (r-r_top)/h if h else 0
            nn = (math.cos(am), k, math.sin(am)); L = math.sqrt(sum(c*c for c in nn)); nn = tuple(c/L for c in nn)
            b = len(v); v += p; n += [nn]*4; f += [(b,b+2,b+1),(b,b+3,b+2)]
            if r_top > 0:
                b = len(v); v += [(cx,cy+h,cz), p[3], p[2]]; n += [(0,1,0)]*3; f += [(b,b+1,b+2)]
        self.tri_list(color, v, n, f)
    def dome(self, color, cx, cy, cz, r, seg=16, rings=8, stretch=1.0):
        v, n, f = [], [], []
        for j in range(rings+1):
            t = (math.pi/2)*j/rings
            for i in range(seg+1):
                a = 2*math.pi*i/seg
                nx, ny, nz = math.cos(t)*math.cos(a), math.sin(t), math.cos(t)*math.sin(a)
                v.append((cx+r*nx, cy+r*ny*stretch, cz+r*nz)); n.append((nx, ny, nz))
        for j in range(rings):
            for i in range(seg):
                a = j*(seg+1)+i; b = a+seg+1
                f += [(a,b,a+1),(a+1,b,b+1)]
        self.tri_list(color, v, n, f)
    def ring(self, color, cx, cy, cz, rx, rz, w, h, seg=40):
        for i in range(seg):
            a0, a1 = 2*math.pi*i/seg, 2*math.pi*(i+1)/seg
            def pt(a, k, y): return (cx+(rx+k)*math.cos(a), y, cz+(rz+k)*math.sin(a))
            v = [pt(a0,0,cy+h),pt(a1,0,cy+h),pt(a1,w,cy+h),pt(a0,w,cy+h)]
            self.tri_list(color, v, [(0,1,0)]*4, [(0,2,1),(0,3,2)])
            v = [pt(a0,w,cy),pt(a1,w,cy),pt(a1,w,cy+h),pt(a0,w,cy+h)]
            am=(a0+a1)/2
            self.tri_list(color, v, [(math.cos(am),0,math.sin(am))]*4, [(0,2,1),(0,3,2)])
    def disc(self, color, cx, cy, cz, rx, rz, seg=40):
        v=[(cx,cy,cz)]+[(cx+rx*math.cos(2*math.pi*i/seg),cy,cz+rz*math.sin(2*math.pi*i/seg)) for i in range(seg)]
        f=[(0,1+(i+1)%seg,1+i) for i in range(seg)]
        self.tri_list(color, v, [(0,1,0)]*len(v), f)

    def save(self, path):
        bin_ = bytearray(); bviews=[]; acc=[]; meshes_prims=[]; mats=[]
        def add_view(data, target):
            while len(bin_) % 4: bin_.append(0)
            off = len(bin_); bin_.extend(data)
            bviews.append({"buffer":0,"byteOffset":off,"byteLength":len(data),"target":target})
            return len(bviews)-1
        for ci, (color, (pos, nrm, idx)) in enumerate(self.parts.items()):
            r,g,b = [int(color[i:i+2],16)/255 for i in (1,3,5)]
            lin = lambda c: c/12.92 if c<=0.04045 else ((c+0.055)/1.055)**2.4
            mats.append({"pbrMetallicRoughness":{"baseColorFactor":[lin(r),lin(g),lin(b),1],"metallicFactor":0.05,"roughnessFactor":0.75},"doubleSided":True})
            pv = add_view(b''.join(struct.pack('<3f',*p) for p in pos), 34962)
            mn = [min(p[i] for p in pos) for i in range(3)]; mx=[max(p[i] for p in pos) for i in range(3)]
            acc.append({"bufferView":pv,"componentType":5126,"count":len(pos),"type":"VEC3","min":mn,"max":mx}); pa=len(acc)-1
            nv = add_view(b''.join(struct.pack('<3f',*p) for p in nrm), 34962)
            acc.append({"bufferView":nv,"componentType":5126,"count":len(nrm),"type":"VEC3"}); na=len(acc)-1
            iv = add_view(b''.join(struct.pack('<I',i) for i in idx), 34963)
            acc.append({"bufferView":iv,"componentType":5125,"count":len(idx),"type":"SCALAR"}); ia=len(acc)-1
            meshes_prims.append({"attributes":{"POSITION":pa,"NORMAL":na},"indices":ia,"material":ci})
        while len(bin_) % 4: bin_.append(0)
        gltf = {"asset":{"version":"2.0","generator":"kod-druzhby make_models.py"},"scene":0,
                "scenes":[{"nodes":[0]}],"nodes":[{"mesh":0}],"meshes":[{"primitives":meshes_prims}],
                "materials":mats,"accessors":acc,"bufferViews":bviews,"buffers":[{"byteLength":len(bin_)}]}
        js = json.dumps(gltf,separators=(',',':')).encode()
        while len(js) % 4: js += b' '
        total = 12 + 8 + len(js) + 8 + len(bin_)
        with open(path,'wb') as fh:
            fh.write(struct.pack('<III',0x46546C67,2,total))
            fh.write(struct.pack('<II',len(js),0x4E4F534A)); fh.write(js)
            fh.write(struct.pack('<II',len(bin_),0x004E4942)); fh.write(bin_)

TURQ, GOLD, SAND, BLUE, DARK, WHITE = '#1BA8A6', '#D4A23C', '#E6CFA3', '#1E3A6E', '#2A2A35', '#F4EFE6'

def registan():
    m = Mesh()
    m.box(SAND, 0, -0.02, 0.1, 1.9, 0.02, 1.5)  # площадь
    for x, rot in ((-0.65, 'L'), (0.65, 'R'), (0, 'C')):
        z = -0.35 if rot == 'C' else 0.05
        w, d = (0.55, 0.42) if rot=='C' else (0.42, 0.55)
        if rot=='C':
            m.box(SAND, x, 0, z, 0.55, 0.3, 0.3)                 # корпус
            m.box(TURQ, x, 0, z+0.16, 0.26, 0.42, 0.04)          # пештак
            m.box(DARK, x, 0, z+0.18, 0.15, 0.3, 0.02)           # арка
            m.cylinder(TURQ, x, 0.3, z-0.02, 0.1, 0.06); m.dome(TURQ, x, 0.36, z-0.02, 0.1, stretch=1.3)
            m.dome(GOLD, x, 0.48, z-0.02, 0.02)
            for dx in (-0.25, 0.25):
                m.cylinder(SAND, x+dx, 0, z+0.13, 0.03, 0.5); m.cylinder(TURQ, x+dx, 0.5, z+0.13, 0.04, 0.03)
        else:
            sgn = -1 if rot=='L' else 1
            m.box(SAND, x, 0, z, 0.3, 0.3, 0.6)
            m.box(TURQ, x - sgn*0.16, 0, z, 0.04, 0.42, 0.26)
            m.box(DARK, x - sgn*0.18, 0, z, 0.02, 0.3, 0.15)
            for dz in (-0.25, 0.25):
                m.cylinder(SAND, x - sgn*0.13, 0, z+dz, 0.03, 0.55); m.cylinder(TURQ, x - sgn*0.13, 0.55, z+dz, 0.04, 0.03)
            for dz in (-0.15, 0.15):
                m.cylinder(TURQ, x+sgn*0.02, 0.3, z+dz, 0.07, 0.04); m.dome(TURQ, x+sgn*0.02, 0.34, z+dz, 0.07, stretch=1.2)
    return m

def cascade():
    m = Mesh()
    steps = 6
    for i in range(steps):
        z = 0.5 - i*0.18; y = i*0.12
        m.box(WHITE, 0, 0, z, 0.9, y+0.12, 0.18)
        m.box(GOLD, 0, y+0.12, z, 0.22, 0.01, 0.16)           # лестница
        for dx in (-0.3, 0.3):
            m.box(TURQ, dx, y+0.12, z, 0.12, 0.012, 0.1)        # фонтаны
    m.box(WHITE, 0, 0, -0.65, 0.9, 0.82, 0.16)
    m.cylinder(SAND, 0, 0.82, -0.65, 0.04, 0.35, r_top=0.0)  # монумент
    for dx in (-0.6, 0.6):
        m.box('#4F7F4A', dx, 0, -0.05, 0.25, 0.08, 1.3)          # зелень
    return m

def medeu():
    m = Mesh()
    m.disc('#CFE8F2', 0, 0.01, 0, 0.55, 0.32)                 # лёд
    m.ring(WHITE, 0, 0, 0, 0.55, 0.32, 0.04, 0.04)
    for i in range(4):
        m.ring(SAND if i%2 else '#B9A27A', 0, 0, 0, 0.6+i*0.06, 0.37+i*0.06, 0.06, 0.06+i*0.05)
    m.box(BLUE, 0.85, 0, -0.1, 0.08, 0.5, 0.08)              # табло-башня
    m.box(GOLD, 0.85, 0.5, -0.1, 0.12, 0.08, 0.12)
    for x, z, r, h in ((-0.6,-0.85,0.45,0.75),(0.2,-0.95,0.55,0.95),(0.85,-0.8,0.35,0.6)):
        m.cylinder('#5E7E6A', x, 0, z, r, h, seg=7, r_top=0.0)
        m.cylinder(WHITE, x, h*0.72, z, r*0.28, h*0.28, seg=7, r_top=0.0)
    return m

if __name__ == '__main__':
    registan().save('assets/models/registan.glb')
    cascade().save('assets/models/cascade.glb')
    medeu().save('assets/models/medeu.glb')
    print('ok')
