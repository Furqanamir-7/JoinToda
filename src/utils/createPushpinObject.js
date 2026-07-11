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
 * Spain: large camera-facing sprites so the pin + association logo stay readable.
 * Other countries: simple red pushpins.
 */
export function createPushpinObject(pin) {
  if (pin?.id === 'spain') {
    const group = new THREE.Group();

    const pinMap = getTexture('/pins/spain-pin.png');
    const logoMap = getTexture('/pins/spain-logo.jpg');

    // Composited location-pin with logo in the circle
    const pinSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: pinMap,
        transparent: true,
        depthTest: true,
        sizeAttenuation: true,
      })
    );
    pinSprite.scale.set(10, 14.7, 1);
    pinSprite.position.y = 7;
    group.add(pinSprite);

    // Clear circular logo badge above the pin (easy to spot when zoomed out)
    const logoSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: logoMap,
        transparent: true,
        depthTest: true,
        sizeAttenuation: true,
      })
    );
    logoSprite.scale.set(6, 6, 1);
    logoSprite.position.y = 16;
    group.add(logoSprite);

    // Surface anchor so the marker sits on Spain
    const anchor = new THREE.Mesh(
      new THREE.SphereGeometry(0.4, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xef4444 })
    );
    group.add(anchor);

    return group;
  }

  return buildRedPin();
}
