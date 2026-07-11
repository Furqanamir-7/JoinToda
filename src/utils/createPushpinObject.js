import * as THREE from 'three';

const HEAD_RADIUS = 1.15;
const STEM_DEPTH = 4.2;
const textureCache = new Map();

function getLogoTexture(url) {
  if (textureCache.has(url)) return textureCache.get(url);
  const tex = new THREE.TextureLoader().load(url);
  tex.colorSpace = THREE.SRGBColorSpace;
  textureCache.set(url, tex);
  return tex;
}

function buildPin(headMaterial) {
  const group = new THREE.Group();

  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.16, STEM_DEPTH, 8),
    new THREE.MeshBasicMaterial({ color: 0xc0c0c0 })
  );
  stem.position.y = -STEM_DEPTH / 2;
  group.add(stem);

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(HEAD_RADIUS, 20, 20),
    headMaterial
  );
  head.position.y = HEAD_RADIUS;
  group.add(head);

  return group;
}

/** Pushpin markers — Spain uses the chapter logo on the head. */
export function createPushpinObject(pin) {
  if (pin?.id === 'spain') {
    const map = getLogoTexture(pin.pinImageUrl || '/pins/spain-logo.jpg');
    return buildPin(new THREE.MeshBasicMaterial({ map }));
  }

  return buildPin(new THREE.MeshBasicMaterial({ color: 0xef4444 }));
}
