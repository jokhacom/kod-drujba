import fs from 'fs';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { USDZExporter } from 'three/addons/exporters/USDZExporter.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
console.warn = () => {};
function both(g) {
  g = g.index ? g : g.toNonIndexed();
  const back = g.clone();
  const idx = back.index.array.slice();
  for (let i = 0; i < idx.length; i += 3) { const t = idx[i + 1]; idx[i + 1] = idx[i + 2]; idx[i + 2] = t; }
  back.setIndex(new THREE.BufferAttribute(idx, 1));
  const n = back.attributes.normal; for (let i = 0; i < n.array.length; i++) n.array[i] *= -1;
  return mergeGeometries([g, back]);
}
for (const f of process.argv.slice(2)) {
  const buf = fs.readFileSync(f);
  const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  const gltf = await new Promise((res, rej) => new GLTFLoader().parse(ab, '', res, rej));
  gltf.scene.traverse((o) => { if (o.isMesh && o.material.side === THREE.DoubleSide) { o.geometry = both(o.geometry); o.material.side = THREE.FrontSide; } });
  const out = await new USDZExporter().parseAsync(gltf.scene);
  const o = f.replace(/\.glb$/, '.usdz'); fs.writeFileSync(o, Buffer.from(out)); console.log(o, out.byteLength);
}
