import * as THREE from 'three';

const HEAD_RADIUS = 1.15;
const STEM_DEPTH = 4.2;

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

/**
 * BasicMaterials so pins stay visible even if scene lighting is off.
 * Spain pin head uses the association logo texture.
 */
export function createPushpinObject(pin) {
  const isSpain = pin?.id === 'spain';

  if (!isSpain) {
    return buildPin(
      new THREE.MeshBasicMaterial({ color: 0xef4444 })
    );
  }

  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const group = buildPin(material);

  const loader = new THREE.TextureLoader();
  loader.load(
    pin.pinImageUrl || '/pins/spain-logo.jpg',
    (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      material.map = tex;
      material.needsUpdate = true;
    },
    undefined,
    () => {
      material.color.set(0xef4444);
    }
  );

  return group;
}
