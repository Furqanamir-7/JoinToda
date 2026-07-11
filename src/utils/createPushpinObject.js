import * as THREE from 'three';

const HEAD_RADIUS = 1.2;
const STEM_DEPTH = 4.5;

const textureCache = new Map();
const loader = new THREE.TextureLoader();

function loadTexture(url) {
  if (!url) return Promise.resolve(null);
  if (textureCache.has(url)) return textureCache.get(url);
  const promise = new Promise((resolve) => {
    loader.load(
      url,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        resolve(tex);
      },
      undefined,
      () => resolve(null)
    );
  });
  textureCache.set(url, promise);
  return promise;
}

function buildPinGroup(headMaterial) {
  const group = new THREE.Group();

  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.18, STEM_DEPTH, 10),
    new THREE.MeshPhongMaterial({
      color: 0xb0b0b0,
      shininess: 60,
      specular: 0xdddddd,
    })
  );
  stem.position.y = -STEM_DEPTH / 2;
  group.add(stem);

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(HEAD_RADIUS, 24, 24),
    headMaterial
  );
  head.position.y = HEAD_RADIUS;
  group.add(head);

  const highlight = new THREE.Mesh(
    new THREE.SphereGeometry(HEAD_RADIUS * 0.2, 12, 12),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.45 })
  );
  highlight.position.set(-HEAD_RADIUS * 0.28, HEAD_RADIUS * 1.15, HEAD_RADIUS * 0.3);
  group.add(highlight);

  return group;
}

/**
 * react-globe.gl objectThreeObject callback.
 * Spain gets the association logo on the pin head; others get a red pushpin.
 */
export function createPushpinObject(pin) {
  const logoUrl = pin?.pinImageUrl || (pin?.id === 'spain' ? '/pins/spain-logo.jpg' : null);

  if (!logoUrl) {
    return buildPinGroup(
      new THREE.MeshPhongMaterial({
        color: 0xef4444,
        emissive: 0x7f1d1d,
        emissiveIntensity: 0.12,
        shininess: 90,
        specular: 0xffffff,
      })
    );
  }

  // Placeholder red head while texture loads; swap map when ready.
  const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    map: null,
    shininess: 40,
  });
  const group = buildPinGroup(material);

  loadTexture(logoUrl).then((tex) => {
    if (!tex) return;
    material.map = tex;
    material.needsUpdate = true;
  });

  return group;
}
