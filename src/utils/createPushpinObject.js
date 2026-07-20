import * as THREE from 'three';

const textureCache = new Map();

/**
 * Build a circular logo texture (transparent outside the disc).
 * Replaces the old teardrop pin design entirely.
 */
function getCircularLogoTexture(url) {
  if (textureCache.has(url)) return textureCache.get(url);

  const canvas = document.createElement('canvas');
  const size = 256;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  textureCache.set(url, tex);

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    ctx.clearRect(0, 0, size, size);
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.save();
    ctx.clip();
    ctx.drawImage(img, 0, 0, size, size);
    ctx.restore();
    // Soft white ring so logos read on dark oceans
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 3, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.55)';
    ctx.lineWidth = 6;
    ctx.stroke();
    tex.needsUpdate = true;
  };
  img.src = url;

  return tex;
}

/** Circular chapter logo sprite — scaled for desktop vs mobile. */
export function createPushpinObject(pin) {
  const group = new THREE.Group();
  const url = pin?.logoUrl || pin?.pinImageUrl || '/logos/toda.png';
  const map = getCircularLogoTexture(url);
  const mobile = Boolean(pin?.__mobile);
  // Tuned for widescreen desktop + phone: readable but not overwhelming labels
  const scale = mobile ? 3.1 : 4.15;

  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map,
      transparent: true,
      depthTest: true,
      sizeAttenuation: true,
    })
  );
  sprite.scale.set(scale, scale, 1);
  // Center on the surface point (no pin stem)
  sprite.center.set(0.5, 0.5);
  sprite.position.y = 0;
  group.add(sprite);

  return group;
}
