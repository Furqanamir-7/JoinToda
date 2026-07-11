import * as THREE from 'three';

let pinTemplate = null;

const HEAD_RADIUS = 1.35;
const STEM_DEPTH = 5;

/**
 * Classic map pushpin: red head sitting ON the globe surface, silver stem
 * buried inside the globe (local −Y points toward the core when
 * objectFacesSurface is enabled). Only the head is visible above the map.
 */
export function createPushpinObject() {
  if (!pinTemplate) {
    const group = new THREE.Group();

    // Stem — entirely below the surface (y < 0), hidden inside the globe.
    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.22, STEM_DEPTH, 10),
      new THREE.MeshPhongMaterial({
        color: 0xb0b0b0,
        emissive: 0x1a1a1a,
        emissiveIntensity: 0.1,
        shininess: 60,
        specular: 0xdddddd,
      })
    );
    stem.position.y = -STEM_DEPTH / 2;
    group.add(stem);

    // Red head — bottom of sphere sits at y = 0 (globe surface).
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(HEAD_RADIUS, 24, 24),
      new THREE.MeshPhongMaterial({
        color: 0xef4444,
        emissive: 0x991b1b,
        emissiveIntensity: 0.15,
        shininess: 100,
        specular: 0xffffff,
      })
    );
    head.position.y = HEAD_RADIUS;
    group.add(head);

    // Small specular highlight on the head (matches reference pin).
    const highlight = new THREE.Mesh(
      new THREE.SphereGeometry(HEAD_RADIUS * 0.22, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55 })
    );
    highlight.position.set(-HEAD_RADIUS * 0.28, HEAD_RADIUS * 1.18, HEAD_RADIUS * 0.32);
    group.add(highlight);

    pinTemplate = group;
  }

  return pinTemplate.clone(true);
}
