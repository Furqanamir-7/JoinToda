const sharp = require('sharp');
const path = require('path');

/**
 * Custom Spain map pin — logo fills the circular head, tip below.
 */
async function main() {
  const logoIn = path.join('public', 'pins', 'spain-logo.jpg');
  const out = path.join('public', 'pins', 'spain-pin.png');

  const size = 256;
  const headR = 96;
  const cx = size / 2;
  const headCy = 108;
  const tipY = 248;

  // Tip + dark underlay circle (logo draws on top of the circle area)
  const pinSvg = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <defs>
        <filter id="shadow" x="-25%" y="-15%" width="150%" height="150%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#000" flood-opacity="0.5"/>
        </filter>
      </defs>
      <g filter="url(#shadow)">
        <path
          fill="#111111"
          stroke="#ffffff"
          stroke-width="5"
          stroke-linejoin="round"
          d="M ${cx - 34} ${headCy + 70}
             L ${cx} ${tipY}
             L ${cx + 34} ${headCy + 70}
             Z"
        />
        <circle cx="${cx}" cy="${headCy}" r="${headR}" fill="#111111" stroke="#ffffff" stroke-width="5"/>
      </g>
    </svg>
  `);

  const holeR = headR - 8;
  const logoSize = holeR * 2;
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${logoSize}" height="${logoSize}"><circle cx="${holeR}" cy="${holeR}" r="${holeR}" fill="white"/></svg>`
  );

  const logo = await sharp(logoIn)
    .resize(logoSize, logoSize, { fit: 'cover', position: 'centre' })
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  await sharp(pinSvg)
    .composite([
      {
        input: logo,
        top: Math.round(headCy - holeR),
        left: Math.round(cx - holeR),
      },
    ])
    .png()
    .toFile(out);

  const meta = await sharp(out).metadata();
  console.log('custom spain-pin', `${meta.width}x${meta.height}`, 'logoR', holeR);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
