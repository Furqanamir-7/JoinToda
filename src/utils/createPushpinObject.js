import * as THREE from 'three';

const textureCache = new Map();

function getTexture(url) {
  if (textureCache.has(url)) return textureCache.get(url);
  const tex = new THREE.TextureLoader().load(url);
  tex.colorSpace = THREE.SRGBColorSpace;
  textureCache.set(url, tex);
  return tex;
}

/** Custom map pin sprite with each chapter's unique logo in the circular head. */
export function createPushpinObject(pin) {
  const group = new THREE.Group();
  const url = pin?.pinImageUrl || '/pins/toda-pin.png';
  const map = getTexture(url);

  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map,
      transparent: true,
      depthTest: true,
      sizeAttenuation: true,
    })
  );
  sprite.scale.set(7.5, 7.5, 1);
  sprite.center.set(0.5, 0);
  sprite.position.y = 0.15;
  group.add(sprite);

  return group;
}
