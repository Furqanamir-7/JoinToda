const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const LOGO_DIR = 'C:/Users/Dell/Desktop/JOINTODA LOGOS';
const OUT_LOGOS = path.join('public', 'logos');
const OUT_PINS = path.join('public', 'pins');
const OUT_FAVICON = path.join('public', 'favicon.png');

fs.mkdirSync(OUT_LOGOS, { recursive: true });
fs.mkdirSync(OUT_PINS, { recursive: true });

/** Map chapter id → source filename in JOINTODA LOGOS (unique, no repeats). */
const CHAPTER_LOGOS = {
  toda: 'Truck Owners and Drivers Association of USA.png',
  usa: 'Truck Owners and Drivers Association of United States.png',
  usa_west: 'Truck Owners and Drivers Association of West.png',
  usa_texas: 'Truck Owners and Drivers Association of Texas.png',
  usa_midwest: 'Truck Owners and Drivers Association of Midwest.png',
  usa_northeast: 'Truck Owners and Drivers Association of Northeast.png',
  usa_southeast: 'Truck Owners and Drivers Association of Southeast.png',
  usa_southwest: 'Truck Owners and Drivers Association of Southwest.png',
  americas: 'Truck Owners and Drivers Association of America.png',
  canada: 'Truck Owners and Drivers Association of Canada.png',
  mexico: 'Truck Owners and Drivers Association of Mexico.png',
  mexico_es: 'Asociación de Propietarios y Conductores de Camión de México.png',
  brazil: 'Associação de Proprietários e Caminhoneiros de Caminhão do Brasil.png',
  europe: 'Truck Owners and Drivers Association of Europe.png',
  uk: 'Lorry Owners and Drivers Association of United Kingdom.png',
  spain: 'Asociación de Propietarios y Conductores de Camión de España.png',
  france: 'Association des Propriétaires et Conducteurs de Camion de France.png',
  germany: 'Verband der Lastwagen Besitzer und Fahrer Deutschlands.png',
  italy: 'Associazione Italiana Proprietari e Conducenti di Camion.png',
  denmark: 'Lastbil Ejere og Chauffører Forening af Danmark.png',
  norway: 'Lastebil Eiere og Sjåfører Forening av Norge.png',
  sweden: 'Lastbil Ägare och Förare Förening av Sverige.png',
  poland: 'Stowarzyszenie Właścicieli i Kierowców Ciężarówek w Polsce.png',
  ukraine: 'Асоціація Власників та Водіїв Вантажівок України.png',
  greece: 'Ένωση Ιδιοκτητών και Οδηγών Φορτηγών της Ελληνικής Δημοκρατίας.png',
  turkey: 'Türkiye Kamyon Sahipleri ve Şoförleri Derneği.png',
  israel: 'איגוד בעלי ונהגי משאיות של ישראל.png',
  arabia: 'Truck Owners and Drivers Association of Arabia.png',
  arabia_ar: 'جمعية أصحاب وسائقي الشاحنات في العربية.png',
  uae: 'جمعية أصحاب وسائقي الشاحنات في الإمارات العربية المتحدة.png',
  saudi: 'جمعية أصحاب وسائقي الشاحنات في العربية السعودية.png',
  africa: 'Truck Owners and Drivers Association of Africa.png',
  china: 'Truck Owners and Drivers Association of China.png',
  china_zh: '中国卡车车主和司机协会.png',
  australasia: 'Truck Owners and Drivers Association of Australasia.png',
};

async function makePin(logoPath, outPath) {
  const size = 256;
  const headR = 96;
  const cx = size / 2;
  const headCy = 108;
  const tipY = 248;
  const holeR = headR - 8;
  const logoSize = holeR * 2;

  const pinSvg = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <defs>
        <filter id="shadow" x="-25%" y="-15%" width="150%" height="150%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#000" flood-opacity="0.5"/>
        </filter>
      </defs>
      <g filter="url(#shadow)">
        <path fill="#111111" stroke="#ffffff" stroke-width="5" stroke-linejoin="round"
          d="M ${cx - 34} ${headCy + 70} L ${cx} ${tipY} L ${cx + 34} ${headCy + 70} Z"/>
        <circle cx="${cx}" cy="${headCy}" r="${headR}" fill="#111111" stroke="#ffffff" stroke-width="5"/>
      </g>
    </svg>
  `);

  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${logoSize}" height="${logoSize}"><circle cx="${holeR}" cy="${holeR}" r="${holeR}" fill="white"/></svg>`
  );

  const logo = await sharp(logoPath)
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
    .toFile(outPath);
}

async function main() {
  const files = new Set(fs.readdirSync(LOGO_DIR));
  const used = new Set();

  // Favicon
  const favSrc = path.join(LOGO_DIR, 'Truckers Of The World, Unite!.png');
  await sharp(favSrc).resize(64, 64, { fit: 'cover' }).png().toFile(OUT_FAVICON);
  await sharp(favSrc).resize(32, 32, { fit: 'cover' }).png().toFile(path.join('public', 'favicon-32.png'));
  console.log('favicon ok');

  for (const [id, filename] of Object.entries(CHAPTER_LOGOS)) {
    if (!files.has(filename)) {
      throw new Error(`Missing logo file for ${id}: ${filename}`);
    }
    if (used.has(filename)) {
      throw new Error(`Logo reused: ${filename}`);
    }
    used.add(filename);

    const src = path.join(LOGO_DIR, filename);
    const logoOut = path.join(OUT_LOGOS, `${id}.png`);
    const pinOut = path.join(OUT_PINS, `${id}-pin.png`);

    await sharp(src).resize(512, 512, { fit: 'cover', position: 'centre' }).png().toFile(logoOut);
    await makePin(logoOut, pinOut);
    console.log('ok', id);
  }

  console.log('done', Object.keys(CHAPTER_LOGOS).length, 'chapters');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
