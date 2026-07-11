import * as THREE from 'three';

const textureCache = new Map();

function getTexture(url) {
  if (textureCache.has(url)) return textureCache.get(url);
  const tex = new THREE.TextureLoader().load(url);
  tex.colorSpace = THREE.SRGBColorSpace;
  textureCache.set(url, tex);
  return tex;
}

/** Custom map pin sprite — smaller on mobile to reduce clutter. */
export function createPushpinObject(pin) {
  const group = new THREE.Group();
  const url = pin?.pinImageUrl || '/pins/toda-pin.png';
  const map = getTexture(url);
  const mobile = Boolean(pin?.__mobile);
  const scale = mobile ? 5.2 : 6.4;

  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map,
      transparent: true,
      depthTest: true,
      sizeAttenuation: true,
    })
  );
  sprite.scale.set(scale, scale, 1);
  sprite.center.set(0.5, 0);
  sprite.position.y = 0.12;
  group.add(sprite);

  return group;
}
