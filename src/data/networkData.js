export const networkData = [
  {
    id: 1,
    region: 'North America',
    emoji: '🌎',
    countries: 3,
    members: '24,000+',
    description:
      'Serving the US, Canada, and Mexico trucking corridors with regulatory and freight resources.',
  },
  {
    id: 2,
    region: 'Europe',
    emoji: '🌍',
    countries: 8,
    members: '12,000+',
    description:
      'Cross-border compliance, EU logistics standards, and driver rights across the continent.',
  },
  {
    id: 3,
    region: 'Asia Pacific',
    emoji: '🌏',
    countries: 7,
    members: '8,500+',
    description:
      'Emerging freight markets, long-haul routes, and port connectivity across the region.',
  },
  {
    id: 4,
    region: 'Middle East',
    emoji: '🏜️',
    countries: 4,
    members: '3,200+',
    description:
      'Trade routes, cross-border permits, and operator support across Gulf and Levant.',
  },
  {
    id: 5,
    region: 'Africa',
    emoji: '🌍',
    countries: 5,
    members: '1,800+',
    description:
      'Building road freight infrastructure and driver welfare programs across the continent.',
  },
  {
    id: 6,
    region: 'Australasia',
    emoji: '🌏',
    countries: 2,
    members: '1,500+',
    description:
      'Remote logistics, outback freight, and maritime port trucking across AU and NZ.',
  },
];

// Primary chapter hubs — each one is a TODA-family member association.
// These render as large, labeled pins on the globe.
export const globePins = [
  {
    id: 'usa',
    name: 'United States',
    code: 'USA',
    fullName: 'Truck Owners and Drivers Association',
    lat: 39.8283,
    lng: -98.5795,
    members: '18,400+',
    region: 'North America',
    color: '#3B82F6',
    labelLatOffset: 5,
    labelLngOffset: -9,
  },
  {
    id: 'canada',
    name: 'Canada',
    code: 'CAN',
    fullName: 'Truck Owners & Drivers Association of Canada',
    lat: 56.1304,
    lng: -106.3468,
    members: '4,100+',
    region: 'North America',
    color: '#3B82F6',
    labelLatOffset: 4,
    labelLngOffset: 8,
  },
  {
    id: 'mexico',
    name: 'Mexico',
    code: 'MEX',
    fullName: 'Truck Owners and Drivers Association of Mexico',
    lat: 23.6345,
    lng: -102.5528,
    members: '1,500+',
    region: 'North America',
    color: '#3B82F6',
    labelLatOffset: -4,
    labelLngOffset: -8,
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    code: 'UK',
    fullName: 'Lorry Owners & Drivers Association of United Kingdom',
    lat: 51.5074,
    lng: -0.1278,
    members: '3,500+',
    region: 'Europe',
    color: '#3B82F6',
    labelLatOffset: 2,
    labelLngOffset: -10,
  },
  {
    id: 'europe',
    name: 'Europe',
    code: 'EU',
    fullName: 'Truck Owners & Drivers Association of Europe',
    lat: 50.8503,
    lng: 4.3517,
    members: '9,200+',
    region: 'Europe',
    color: '#3B82F6',
    labelLatOffset: 4,
    labelLngOffset: 7,
  },
  {
    id: 'turkey',
    name: 'Türkiye',
    code: 'TUR',
    fullName: 'Türkiye’de Kamyon Sahipleri ve Kamyon Şoförleri Derneği',
    lat: 39.9334,
    lng: 32.8597,
    members: '2,800+',
    region: 'Middle East',
    color: '#3B82F6',
    labelLatOffset: 3,
    labelLngOffset: -9,
  },
  {
    id: 'israel',
    name: 'Israel',
    code: 'ISR',
    fullName: 'איגוד בעלי ונהגי משאיות של ישראל',
    lat: 32.0853,
    lng: 34.7818,
    members: '1,200+',
    region: 'Middle East',
    color: '#3B82F6',
    labelLatOffset: 2,
    labelLngOffset: 8,
  },
  {
    id: 'saudi',
    name: 'Saudi Arabia',
    code: 'SAU',
    fullName: 'Truck Owners & Drivers Association of Arabia',
    lat: 24.7136,
    lng: 46.6753,
    members: '1,250+',
    region: 'Middle East',
    color: '#3B82F6',
    labelLatOffset: -4,
    labelLngOffset: -8,
  },
  {
    id: 'iran',
    name: 'Iran',
    code: 'IRN',
    fullName: 'Truck Owners & Drivers Association of Iran',
    lat: 35.6892,
    lng: 51.389,
    members: '950+',
    region: 'Middle East',
    color: '#3B82F6',
    labelLatOffset: 2,
    labelLngOffset: 9,
  },
  {
    id: 'africa',
    name: 'Africa',
    code: 'AFR',
    fullName: 'Truck Owners & Drivers Association of Africa',
    lat: -1.2921,
    lng: 36.8219,
    members: '3,400+',
    region: 'Africa',
    color: '#3B82F6',
    labelLatOffset: 4,
    labelLngOffset: -8,
  },
  {
    id: 'china',
    name: 'China',
    code: 'CHN',
    fullName: 'Truck Owners & Drivers Association of China',
    lat: 39.9042,
    lng: 116.4074,
    members: '7,100+',
    region: 'Asia Pacific',
    color: '#3B82F6',
    labelLatOffset: 4,
    labelLngOffset: 8,
  },
  {
    id: 'australasia',
    name: 'Australasia',
    code: 'AUS',
    fullName: 'Truck Owners & Drivers Association of Australasia',
    lat: -33.8688,
    lng: 151.2093,
    members: '2,300+',
    region: 'Australasia',
    color: '#3B82F6',
    labelLatOffset: -4,
    labelLngOffset: -9,
  },
];

// Maps each globe pin id to its chapter page on jointoda.com. Clicking a
// pin on the globe redirects the visitor to the matching chapter there.
// USA and Iran have no dedicated chapter page, so they fall back to the
// jointoda.com homepage.
export const chapterLinks = {
  usa: 'https://jointoda.com/category/homepage/',
  canada: 'https://jointoda.com/canada/',
  mexico: 'https://jointoda.com/mexico/',
  uk: 'https://jointoda.com/uk/',
  europe: 'https://jointoda.com/europe/',
  turkey: 'https://jointoda.com/turkey/',
  israel: 'https://jointoda.com/israel/',
  saudi: 'https://jointoda.com/arabia/',
  iran: 'https://jointoda.com/',
  africa: 'https://jointoda.com/africa/',
  china: 'https://jointoda.com/china/',
  australasia: 'https://jointoda.com/australasia/',
};

// Returns the jointoda.com chapter URL for a given globe pin id.
export function chapterUrlForPin(id) {
  return chapterLinks[id] || 'https://jointoda.com/';
}

// Secondary city-level nodes — render as small dots only, no labels.
// Used to make the globe look densely populated with member activity.
// `hub` references a primary pin id so arcs can connect satellite -> hub.
export const globeSatellites = [
  // North America
  { id: 'la', name: 'Los Angeles', lat: 34.0522, lng: -118.2437, hub: 'usa' },
  { id: 'nyc', name: 'New York', lat: 40.7128, lng: -74.006, hub: 'usa' },
  { id: 'chicago', name: 'Chicago', lat: 41.8781, lng: -87.6298, hub: 'usa' },
  { id: 'dallas', name: 'Dallas', lat: 32.7767, lng: -96.797, hub: 'usa' },
  { id: 'miami', name: 'Miami', lat: 25.7617, lng: -80.1918, hub: 'usa' },
  { id: 'seattle', name: 'Seattle', lat: 47.6062, lng: -122.3321, hub: 'usa' },
  { id: 'toronto', name: 'Toronto', lat: 43.6532, lng: -79.3832, hub: 'canada' },
  { id: 'vancouver', name: 'Vancouver', lat: 49.2827, lng: -123.1207, hub: 'canada' },
  { id: 'montreal', name: 'Montreal', lat: 45.5017, lng: -73.5673, hub: 'canada' },
  { id: 'monterrey', name: 'Monterrey', lat: 25.6866, lng: -100.3161, hub: 'mexico' },
  { id: 'guadalajara', name: 'Guadalajara', lat: 20.6597, lng: -103.3496, hub: 'mexico' },

  // South America (linked to USA hub)
  { id: 'sao-paulo', name: 'São Paulo', lat: -23.5505, lng: -46.6333, hub: 'usa' },
  { id: 'buenos-aires', name: 'Buenos Aires', lat: -34.6037, lng: -58.3816, hub: 'usa' },
  { id: 'bogota', name: 'Bogotá', lat: 4.711, lng: -74.0721, hub: 'mexico' },

  // Europe
  { id: 'paris', name: 'Paris', lat: 48.8566, lng: 2.3522, hub: 'europe' },
  { id: 'berlin', name: 'Berlin', lat: 52.52, lng: 13.405, hub: 'europe' },
  { id: 'madrid', name: 'Madrid', lat: 40.4168, lng: -3.7038, hub: 'europe' },
  { id: 'rome', name: 'Rome', lat: 41.9028, lng: 12.4964, hub: 'europe' },
  { id: 'amsterdam', name: 'Amsterdam', lat: 52.3676, lng: 4.9041, hub: 'europe' },
  { id: 'warsaw', name: 'Warsaw', lat: 52.2297, lng: 21.0122, hub: 'europe' },
  { id: 'stockholm', name: 'Stockholm', lat: 59.3293, lng: 18.0686, hub: 'europe' },
  { id: 'manchester', name: 'Manchester', lat: 53.4808, lng: -2.2426, hub: 'uk' },
  { id: 'dublin', name: 'Dublin', lat: 53.3498, lng: -6.2603, hub: 'uk' },

  // Middle East
  { id: 'dubai', name: 'Dubai', lat: 25.2048, lng: 55.2708, hub: 'saudi' },
  { id: 'jeddah', name: 'Jeddah', lat: 21.4858, lng: 39.1925, hub: 'saudi' },
  { id: 'doha', name: 'Doha', lat: 25.2854, lng: 51.531, hub: 'saudi' },
  { id: 'istanbul', name: 'Istanbul', lat: 41.0082, lng: 28.9784, hub: 'turkey' },
  { id: 'haifa', name: 'Haifa', lat: 32.7940, lng: 34.9896, hub: 'israel' },

  // Africa
  { id: 'cairo', name: 'Cairo', lat: 30.0444, lng: 31.2357, hub: 'africa' },
  { id: 'lagos', name: 'Lagos', lat: 6.5244, lng: 3.3792, hub: 'africa' },
  { id: 'johannesburg', name: 'Johannesburg', lat: -26.2041, lng: 28.0473, hub: 'africa' },
  { id: 'casablanca', name: 'Casablanca', lat: 33.5731, lng: -7.5898, hub: 'africa' },
  { id: 'addis', name: 'Addis Ababa', lat: 9.03, lng: 38.74, hub: 'africa' },

  // Asia
  { id: 'shanghai', name: 'Shanghai', lat: 31.2304, lng: 121.4737, hub: 'china' },
  { id: 'guangzhou', name: 'Guangzhou', lat: 23.1291, lng: 113.2644, hub: 'china' },
  { id: 'hongkong', name: 'Hong Kong', lat: 22.3193, lng: 114.1694, hub: 'china' },
  { id: 'mumbai', name: 'Mumbai', lat: 19.076, lng: 72.8777, hub: 'china' },
  { id: 'delhi', name: 'Delhi', lat: 28.7041, lng: 77.1025, hub: 'china' },
  { id: 'karachi', name: 'Karachi', lat: 24.8607, lng: 67.0011, hub: 'iran' },
  { id: 'tehran-sat', name: 'Mashhad', lat: 36.2605, lng: 59.6168, hub: 'iran' },
  { id: 'tokyo', name: 'Tokyo', lat: 35.6762, lng: 139.6503, hub: 'china' },
  { id: 'seoul', name: 'Seoul', lat: 37.5665, lng: 126.978, hub: 'china' },
  { id: 'singapore', name: 'Singapore', lat: 1.3521, lng: 103.8198, hub: 'china' },
  { id: 'jakarta', name: 'Jakarta', lat: -6.2088, lng: 106.8456, hub: 'australasia' },
  { id: 'bangkok', name: 'Bangkok', lat: 13.7563, lng: 100.5018, hub: 'china' },

  // Australasia
  { id: 'melbourne', name: 'Melbourne', lat: -37.8136, lng: 144.9631, hub: 'australasia' },
  { id: 'perth', name: 'Perth', lat: -31.9523, lng: 115.8613, hub: 'australasia' },
  { id: 'brisbane', name: 'Brisbane', lat: -27.4698, lng: 153.0251, hub: 'australasia' },
  { id: 'auckland', name: 'Auckland', lat: -36.8485, lng: 174.7633, hub: 'australasia' },
];
