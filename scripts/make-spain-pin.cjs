const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function main() {
  const pinIn = path.join('public', 'pins', 'location-pin.webp');
  const logoIn = path.join('public', 'pins', 'spain-logo.jpg');
  const out = path.join('public', 'pins', 'spain-pin.png');

  const { data, info } = await sharp(pinIn)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;

  for (let i = 0; i < data.length; i += 4) {
    const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i + 3] = lum > 200 ? 0 : 255;
  }

  const pinBuf = await sharp(data, {
    raw: { width: w, height: h, channels: 4 },
  })
    .png()
    .toBuffer();

  let minX = w;
  let minY = h;
  let maxX = 0;
  let maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * 4 + 3] > 20) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  const pinW = maxX - minX + 1;
  const cx = Math.round(minX + pinW / 2);
  const cy = Math.round(minY + pinW * 0.38);
  const holeR = Math.round(pinW * 0.22);
  const logoSize = holeR * 2;
  const logoLeft = cx - holeR;
  const logoTop = cy - holeR;

  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${logoSize}" height="${logoSize}"><circle cx="${holeR}" cy="${holeR}" r="${holeR}" fill="white"/></svg>`
  );

  const logo = await sharp(logoIn)
    .resize(logoSize, logoSize)
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  const full = await sharp({
    create: {
      width: w,
      height: h,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: logo, top: Math.max(0, logoTop), left: Math.max(0, logoLeft) },
      { input: pinBuf, top: 0, left: 0 },
    ])
    .png()
    .toBuffer();

  await sharp(full).trim().png().toFile(out);
  const meta = await sharp(out).metadata();
  console.log('wrote', out, meta.width + 'x' + meta.height, fs.statSync(out).size);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
