import * as THREE from 'three';

const HEAD_RADIUS = 1.15;
const STEM_DEPTH = 4.2;
const textureCache = new Map();

function getTexture(url) {
  if (textureCache.has(url)) return textureCache.get(url);
  const tex = new THREE.TextureLoader().load(url);
  tex.colorSpace = THREE.SRGBColorSpace;
  textureCache.set(url, tex);
  return tex;
}

function buildRedPin() {
  const group = new THREE.Group();

  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.16, STEM_DEPTH, 8),
    new THREE.MeshBasicMaterial({ color: 0xc0c0c0 })
  );
  stem.position.y = -STEM_DEPTH / 2;
  group.add(stem);

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(HEAD_RADIUS, 20, 20),
    new THREE.MeshBasicMaterial({ color: 0xef4444 })
  );
  head.position.y = HEAD_RADIUS;
  group.add(head);

  return group;
}

/**
 * Custom Spain marker: ONE camera-facing pin sprite
 * (black map pin with the association logo only in the circular hole).
 */
export function createPushpinObject(pin) {
  if (pin?.id === 'spain') {
    const group = new THREE.Group();

    const map = getTexture('/pins/spain-pin.png');
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map,
        transparent: true,
        depthTest: true,
        sizeAttenuation: true,
      })
    );
    // Pin art is ~136×200 — keep aspect, size readable on the globe
    sprite.scale.set(8, 11.8, 1);
    sprite.center.set(0.5, 0);
    sprite.position.y = 0.2;
    group.add(sprite);

    return group;
  }

  return buildRedPin();
}
