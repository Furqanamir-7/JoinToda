/**
 * Globe chapter markers — positions spread for readable labels / logos.
 */

function lines(...parts) {
  return parts.filter(Boolean);
}

export const globePins = [
  // —— United States (vertical + horizontal spread for readable logos) ——
  {
    id: 'toda',
    name: 'Truck Owners and Drivers Association',
    labelLines: lines('Truck Owners and Drivers', 'Association'),
    code: 'TODA',
    region: 'United States',
    lat: 37.5,
    lng: -97.0,
    logoUrl: '/logos/toda.png',
  },
  {
    id: 'usa',
    name: 'Truck Owners and Drivers Association of United States',
    labelLines: lines('Truck Owners and Drivers Association', 'of United States'),
    code: 'US',
    region: 'United States',
    lat: 50.5,
    lng: -93.0,
    logoUrl: '/logos/usa.png',
  },
  {
    id: 'usa_west',
    name: 'Truck Owners and Drivers Association of West',
    labelLines: lines('Truck Owners and Drivers Association', 'of West'),
    code: 'WEST',
    region: 'United States',
    lat: 46.5,
    lng: -122.5,
    logoUrl: '/logos/usa_west.png',
  },
  {
    id: 'usa_texas',
    name: 'Truck Owners and Drivers Association of Texas',
    labelLines: lines('Truck Owners and Drivers Association', 'of Texas'),
    code: 'TX',
    region: 'United States',
    lat: 25.5,
    lng: -99.0,
    logoUrl: '/logos/usa_texas.png',
  },
  {
    id: 'usa_midwest',
    name: 'Truck Owners and Drivers Association of Midwest',
    labelLines: lines('Truck Owners and Drivers Association', 'of Midwest'),
    code: 'MW',
    region: 'United States',
    lat: 43.5,
    lng: -87.5,
    logoUrl: '/logos/usa_midwest.png',
  },
  {
    id: 'usa_northeast',
    name: 'Truck Owners and Drivers Association of Northeast',
    labelLines: lines('Truck Owners and Drivers Association', 'of Northeast'),
    code: 'NE',
    region: 'United States',
    lat: 44.5,
    lng: -69.5,
    logoUrl: '/logos/usa_northeast.png',
  },
  {
    id: 'usa_southeast',
    name: 'Truck Owners and Drivers Association of Southeast',
    labelLines: lines('Truck Owners and Drivers Association', 'of Southeast'),
    code: 'SE',
    region: 'United States',
    lat: 28.0,
    lng: -80.5,
    logoUrl: '/logos/usa_southeast.png',
  },
  {
    id: 'usa_southwest',
    name: 'Truck Owners and Drivers Association of Southwest',
    labelLines: lines('Truck Owners and Drivers Association', 'of Southwest'),
    code: 'SW',
    region: 'United States',
    lat: 32.5,
    lng: -112.5,
    logoUrl: '/logos/usa_southwest.png',
  },

  // —— Americas ——
  {
    id: 'americas',
    name: 'Truck Owners and Drivers Association of Americas',
    labelLines: lines('Truck Owners and Drivers Association', 'of Americas'),
    code: 'AM',
    region: 'Americas',
    lat: 2.0,
    lng: -72.0,
    logoUrl: '/logos/americas.png',
  },
  {
    id: 'canada',
    name: 'Truck Owners and Drivers Association of Canada',
    labelLines: lines('Truck Owners and Drivers Association', 'of Canada'),
    code: 'CA',
    region: 'Canada',
    lat: 58.5,
    lng: -106.0,
    logoUrl: '/logos/canada.png',
  },
  {
    id: 'mexico',
    name: 'Truck Owners and Drivers Association of Mexico',
    labelLines: lines('Truck Owners and Drivers Association', 'of Mexico'),
    code: 'MX',
    region: 'Mexico',
    lat: 21.5,
    lng: -104.5,
    logoUrl: '/logos/mexico.png',
  },
  {
    id: 'mexico_es',
    name: 'Asociación de Propietarios y Conductores de Camión de México',
    labelLines: lines(
      'Asociación de Propietarios y Conductores',
      'de Camión de México'
    ),
    code: 'MX-ES',
    region: 'Mexico',
    lat: 16.0,
    lng: -93.5,
    logoUrl: '/logos/mexico_es.png',
  },
  {
    id: 'brazil',
    name: 'Associação de Proprietários e Caminhoneiros de Caminhão do Brasil',
    labelLines: lines(
      'Associação de Proprietários e Caminhoneiros',
      'de Caminhão do Brasil'
    ),
    code: 'BR',
    region: 'Brazil',
    lat: -14.0,
    lng: -48.0,
    logoUrl: '/logos/brazil.png',
  },

  // —— Europe (spread N–S so logos don’t stack) ——
  {
    id: 'europe',
    name: 'Truck Owners and Drivers Association of Europe',
    labelLines: lines('Truck Owners and Drivers Association', 'of Europe'),
    code: 'EU',
    region: 'Europe',
    lat: 47.0,
    lng: 6.5,
    logoUrl: '/logos/europe.png',
  },
  {
    id: 'uk',
    name: 'Lorry Owners and Drivers Association of United Kingdom',
    labelLines: lines('Lorry Owners and Drivers Association', 'of United Kingdom'),
    code: 'UK',
    region: 'United Kingdom',
    lat: 55.5,
    lng: -3.5,
    logoUrl: '/logos/uk.png',
  },
  {
    id: 'spain',
    name: 'Asociación de Propietarios y Conductores de Camión de España',
    labelLines: lines(
      'Asociación de Propietarios y Conductores',
      'de Camión de España'
    ),
    code: 'ES',
    region: 'Spain',
    lat: 37.5,
    lng: -5.0,
    logoUrl: '/logos/spain.png',
  },
  {
    id: 'france',
    name: 'Association des Propriétaires et Conducteurs de Camion de France',
    labelLines: lines(
      'Association des Propriétaires et Conducteurs',
      'de Camion de France'
    ),
    code: 'FR',
    region: 'France',
    lat: 44.0,
    lng: 1.5,
    logoUrl: '/logos/france.png',
  },
  {
    id: 'germany',
    name: 'Verband der Lastwagen Besitzer und Fahrer Deutschlands',
    labelLines: lines(
      'Verband der Lastwagen Besitzer',
      'und Fahrer Deutschlands'
    ),
    code: 'DE',
    region: 'Germany',
    lat: 51.5,
    lng: 11.0,
    logoUrl: '/logos/germany.png',
  },
  {
    id: 'italy',
    name: 'Associazione Italiana Proprietari e Conducenti di Camion',
    labelLines: lines(
      'Associazione Italiana Proprietari',
      'e Conducenti di Camion'
    ),
    code: 'IT',
    region: 'Italy',
    lat: 40.0,
    lng: 14.0,
    logoUrl: '/logos/italy.png',
  },
  {
    id: 'denmark',
    name: 'Lastbil Ejere og Chauffører Forening af Danmark',
    labelLines: lines('Lastbil Ejere og Chauffører', 'Forening af Danmark'),
    code: 'DK',
    region: 'Denmark',
    lat: 57.0,
    lng: 9.5,
    logoUrl: '/logos/denmark.png',
  },
  {
    id: 'norway',
    name: 'Lastebil Eiere og Sjåfører Forening av Norge',
    labelLines: lines('Lastebil Eiere og Sjåfører', 'Forening av Norge'),
    code: 'NO',
    region: 'Norway',
    lat: 64.0,
    lng: 9.0,
    logoUrl: '/logos/norway.png',
  },
  {
    id: 'sweden',
    name: 'Lastbil Ägare och Förare Förening av Sverige',
    labelLines: lines('Lastbil Ägare och Förare', 'Förening av Sverige'),
    code: 'SE',
    region: 'Sweden',
    lat: 61.0,
    lng: 17.5,
    logoUrl: '/logos/sweden.png',
  },
  {
    id: 'poland',
    name: 'Stowarzyszenie Właścicieli i Kierowców Ciężarówek w Polsce',
    labelLines: lines(
      'Stowarzyszenie Właścicieli i Kierowców',
      'Ciężarówek w Polsce'
    ),
    code: 'PL',
    region: 'Poland',
    lat: 52.5,
    lng: 20.5,
    logoUrl: '/logos/poland.png',
  },
  {
    id: 'ukraine',
    name: 'Асоціація Власників та Водіїв Вантажівок України',
    labelLines: lines('Асоціація Власників та Водіїв', 'Вантажівок України'),
    code: 'UA',
    region: 'Ukraine',
    lat: 48.5,
    lng: 32.5,
    logoUrl: '/logos/ukraine.png',
  },
  {
    id: 'greece',
    name: 'Ένωση Ιδιοκτητών και Οδηγών Φορτηγών της Ελληνικής Δημοκρατίας',
    labelLines: lines(
      'Ένωση Ιδιοκτητών και Οδηγών Φορτηγών',
      'της Ελληνικής Δημοκρατίας'
    ),
    code: 'GR',
    region: 'Greece',
    lat: 36.5,
    lng: 23.5,
    logoUrl: '/logos/greece.png',
  },

  // —— Middle East ——
  {
    id: 'turkey',
    name: 'Türkiye Kamyon Sahipleri ve Şoförleri Derneği',
    labelLines: lines('Türkiye Kamyon Sahipleri', 've Şoförleri Derneği'),
    code: 'TR',
    region: 'Türkiye',
    lat: 39.0,
    lng: 34.0,
    logoUrl: '/logos/turkey.png',
  },
  {
    id: 'israel',
    name: 'איגוד בעלי ונהגי משאיות של ישראל',
    labelLines: lines('איגוד בעלי ונהגי משאיות', 'של ישראל'),
    code: 'IL',
    region: 'Israel',
    lat: 31.5,
    lng: 35.0,
    logoUrl: '/logos/israel.png',
    rtl: true,
  },
  {
    id: 'arabia',
    name: 'Truck Owners and Drivers Association of Arabia',
    labelLines: lines('Truck Owners and Drivers Association', 'of Arabia'),
    code: 'AR',
    region: 'Middle East',
    lat: 23.5,
    lng: 45.0,
    logoUrl: '/logos/arabia.png',
  },
  {
    id: 'arabia_ar',
    name: 'جمعية أصحاب وسائقي الشاحنات في العربية',
    labelLines: lines('جمعية أصحاب وسائقي الشاحنات', 'في العربية'),
    code: 'AR-AR',
    region: 'Middle East',
    lat: 28.0,
    lng: 48.0,
    logoUrl: '/logos/arabia_ar.png',
    rtl: true,
  },
  {
    id: 'uae',
    name: 'جمعية أصحاب وسائقي الشاحنات في الإمارات العربية المتحدة',
    labelLines: lines(
      'جمعية أصحاب وسائقي الشاحنات',
      'في الإمارات العربية المتحدة'
    ),
    code: 'UAE',
    region: 'United Arab Emirates',
    lat: 24.0,
    lng: 54.5,
    logoUrl: '/logos/uae.png',
    rtl: true,
  },
  {
    id: 'saudi',
    name: 'جمعية أصحاب وسائقي الشاحنات في المملكة العربية السعودية',
    labelLines: lines(
      'جمعية أصحاب وسائقي الشاحنات',
      'في المملكة العربية السعودية'
    ),
    code: 'SA',
    region: 'Saudi Arabia',
    lat: 19.0,
    lng: 42.5,
    logoUrl: '/logos/saudi.png',
    rtl: true,
  },

  // —— Africa / Asia / Australasia ——
  {
    id: 'africa',
    name: 'Truck Owners and Drivers Association of Africa',
    labelLines: lines('Truck Owners and Drivers Association', 'of Africa'),
    code: 'AF',
    region: 'Africa',
    lat: 2.0,
    lng: 22.0,
    logoUrl: '/logos/africa.png',
  },
  {
    id: 'china',
    name: 'Truck Owners and Drivers Association of China',
    labelLines: lines('Truck Owners and Drivers Association', 'of China'),
    code: 'CN',
    region: 'China',
    lat: 33.0,
    lng: 105.0,
    logoUrl: '/logos/china.png',
  },
  {
    id: 'china_zh',
    name: '中国卡车车主和司机协会',
    labelLines: lines('中国卡车车主和司机协会'),
    code: 'CN-ZH',
    region: 'China',
    lat: 40.5,
    lng: 118.0,
    logoUrl: '/logos/china_zh.png',
  },
  {
    id: 'australasia',
    name: 'Truck Owners and Drivers Association of Australasia',
    labelLines: lines('Truck Owners and Drivers Association', 'of Australasia'),
    code: 'AU',
    region: 'Australasia',
    lat: -25.0,
    lng: 138.0,
    logoUrl: '/logos/australasia.png',
  },
];

/** Latitude band of association markers — used to limit interactive tilt. */
export const associationLatBounds = (() => {
  const lats = globePins.map((p) => p.lat);
  return {
    minLat: Math.min(...lats) - 8,
    maxLat: Math.max(...lats) + 8,
  };
})();

export const chapterLinks = {
  toda: 'https://jointoda.com/',
  usa: 'https://jointoda.com/category/homepage/',
  usa_west: 'https://jointoda.com/',
  usa_texas: 'https://jointoda.com/',
  usa_midwest: 'https://jointoda.com/',
  usa_northeast: 'https://jointoda.com/',
  usa_southeast: 'https://jointoda.com/',
  usa_southwest: 'https://jointoda.com/',
  americas: 'https://jointoda.com/',
  canada: 'https://jointoda.com/canada/',
  mexico: 'https://jointoda.com/mexico/',
  mexico_es: 'https://jointoda.com/mexico/',
  brazil: 'https://jointoda.com/europe/',
  europe: 'https://jointoda.com/europe/',
  uk: 'https://jointoda.com/uk/',
  spain: 'https://jointoda.com/spain/',
  france: 'https://jointoda.com/europe/',
  germany: 'https://jointoda.com/europe/',
  italy: 'https://jointoda.com/europe/',
  denmark: 'https://jointoda.com/europe/',
  norway: 'https://jointoda.com/europe/',
  sweden: 'https://jointoda.com/europe/',
  poland: 'https://jointoda.com/europe/',
  ukraine: 'https://jointoda.com/europe/',
  greece: 'https://jointoda.com/europe/',
  turkey: 'https://jointoda.com/turkey/',
  israel: 'https://jointoda.com/israel/',
  arabia: 'https://jointoda.com/arabia/',
  arabia_ar: 'https://jointoda.com/arabia/',
  uae: 'https://jointoda.com/arabia/',
  saudi: 'https://jointoda.com/arabia/',
  africa: 'https://jointoda.com/africa/',
  china: 'https://jointoda.com/china/',
  china_zh: 'https://jointoda.com/china/',
  australasia: 'https://jointoda.com/australasia/',
};

export function chapterUrlForPin(id) {
  return chapterLinks[id] || 'https://jointoda.com/';
}

export const networkData = [];
export const globeSatellites = [];
