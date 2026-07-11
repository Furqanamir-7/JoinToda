const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function main() {
  const pinIn = path.join('public', 'pins', 'location-pin.webp');
  const pinOut = path.join('public', 'pins', 'location-pin.png');
  const spainOut = path.join('public', 'pins', 'spain-pin.png');
  const pinRedOut = path.join('public', 'pins', 'location-pin-red.png');

  const { data, info } = await sharp(pinIn)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;

  // Black filled pin on white -> keep dark body, transparent whites (bg + hole)
  for (let i = 0; i < data.length; i += 4) {
    const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;
    if (lum > 200) {
      data[i + 3] = 0;
    } else {
      data[i + 3] = 255;
    }
  }

  const pinBuf = await sharp(data, {
    raw: { width: w, height: h, channels: 4 },
  })
    .png()
    .toBuffer();

  await sharp(pinBuf).toFile(pinOut);

  // Red tinted variant for visibility on the globe (non-logo countries)
  const redData = Buffer.from(data);
  for (let i = 0; i < redData.length; i += 4) {
    if (redData[i + 3] > 20) {
      redData[i] = 220;
      redData[i + 1] = 38;
      redData[i + 2] = 38;
    }
  }
  await sharp(redData, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toFile(pinRedOut);

  // Bounds of opaque pin body
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
  // Circular hole is centered in the upper bulb; classic icon proportions:
  const cx = Math.round(minX + pinW / 2);
  const cy = Math.round(minY + pinW * 0.38);
  const holeR = Math.round(pinW * 0.22);
  const logoSize = holeR * 2;
  const logoLeft = cx - holeR;
  const logoTop = cy - holeR;

  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${logoSize}" height="${logoSize}"><circle cx="${holeR}" cy="${holeR}" r="${holeR}" fill="white"/></svg>`
  );

  const logo = await sharp(path.join('public', 'pins', 'spain-logo.jpg'))
    .resize(logoSize, logoSize)
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // White ring behind logo for contrast, then logo, then black pin on top
  const ring = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${logoSize + 4}" height="${logoSize + 4}"><circle cx="${holeR + 2}" cy="${holeR + 2}" r="${holeR + 1}" fill="white"/></svg>`
  );

  await sharp({
    create: {
      width: w,
      height: h,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: ring, top: Math.max(0, logoTop - 2), left: Math.max(0, logoLeft - 2) },
      { input: logo, top: Math.max(0, logoTop), left: Math.max(0, logoLeft) },
      { input: pinBuf, top: 0, left: 0 },
    ])
    .png()
    .toFile(spainOut);

  console.log({
    bounds: { minX, minY, maxX, maxY, pinW },
    hole: { cx, cy, holeR },
    files: fs.readdirSync(path.join('public', 'pins')),
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
