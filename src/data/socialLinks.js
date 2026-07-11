import { findParent } from './chaptersData';

// Official TODA social media accounts (sourced from jointoda.com).
//
// `socials` are the global accounts shown in the footer and on the
// chapter pages. `chapterFacebook` maps a chapter slug to the
// federation/country-specific Facebook page — every chapter on
// jointoda.com runs its own Facebook presence, but shares the global
// Instagram, X, TikTok and YouTube accounts.

export const MAIN_FACEBOOK =
  'https://www.facebook.com/TruckOwnersDriversAssociation';

export const socials = [
  {
    id: 'facebook',
    label: 'Facebook',
    href: MAIN_FACEBOOK,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/jointoda/',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    href: 'https://www.tiktok.com/@join_toda',
  },
  {
    id: 'x',
    label: 'X (Twitter)',
    href: 'https://twitter.com/join_toda',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UCRNrzRXhU3Sz2YVXdIfjaTg',
  },
];

// Slug → chapter-specific Facebook URL. Keys MUST match a `slug` in
// `chaptersData.js`. Anything missing falls back to the parent chapter's
// Facebook (if any), then to the global TODA Facebook page.
export const chapterFacebook = {
  // USA — parent + regional sub-chapters
  usa: MAIN_FACEBOOK,
  'toda-west': 'https://www.facebook.com/TODAofWest',
  'toda-texas': 'https://www.facebook.com/TODAofTexas',
  'toda-midwest': 'https://www.facebook.com/TODAofMidwest',
  'toda-northeast': 'https://www.facebook.com/TODAofNortheast',
  'toda-southeast': 'https://www.facebook.com/TODAofSoutheast',
  'toda-southwest': 'https://www.facebook.com/TODAofSouthwestf',

  // Canada + Mexico
  canada: 'https://www.facebook.com/TODAofCanada',
  mexico: 'https://www.facebook.com/TODAofMexico',
  'asociacion-mexico': 'https://www.facebook.com/TODAdeLatinos',

  // UK + LODA sub-chapters
  uk: 'https://www.facebook.com/TODAofUK',
  'loda-england': 'https://www.facebook.com/TODAofUK',
  'loda-scotland': 'https://www.facebook.com/TODAofUK',
  'loda-wales': 'https://www.facebook.com/TODAofUK',
  'loda-ni': 'https://www.facebook.com/TODAofUK',

  // Europe federation + national chapters
  europe: 'https://www.facebook.com/TODAofEurope',
  spain: 'https://www.facebook.com/TODAofSpain',
  brazil: 'https://www.facebook.com/TODAdeLatinos',
  france: 'https://www.facebook.com/TODAofFrance',
  germany: 'https://www.facebook.com/TODAofGermany',
  italy: 'https://www.facebook.com/TODAofItaly',
  denmark: 'https://www.facebook.com/TODAofDenmark',
  norway: 'https://www.facebook.com/TODAofNorway',
  sweden: 'https://www.facebook.com/TODAofSweden',
  poland: 'https://www.facebook.com/TODAofPoland',
  ukraine: 'https://www.facebook.com/TODAofUkraine',
  greece: 'https://www.facebook.com/TODAofGreece',

  // Türkiye
  turkiye: 'https://www.facebook.com/TODAofTurkey',
  'tur-istanbul': 'https://www.facebook.com/TODAofTurkey',
  'tur-mersin': 'https://www.facebook.com/TODAofTurkey',
  'tur-anatolia': 'https://www.facebook.com/TODAofTurkey',

  // Arabia federation + national chapters
  arabia: 'https://www.facebook.com/TODAofArabia',
  'arabia-general': 'https://www.facebook.com/TODAofArabiya',
  uae: 'https://www.facebook.com/TODAofEmirates',
  'saudi-arabia': 'https://www.facebook.com/TODAofSaudia',

  // Africa
  africa: 'https://www.facebook.com/TODAofAfrica',
  'africa-egypt': 'https://www.facebook.com/TODAofAfrica',
  'africa-nigeria': 'https://www.facebook.com/TODAofAfrica',
  'africa-southafrica': 'https://www.facebook.com/TODAofAfrica',
  'africa-morocco': 'https://www.facebook.com/TODAofAfrica',
  'africa-kenya': 'https://www.facebook.com/TODAofAfrica',

  // China + Australasia + Israel
  china: 'https://www.facebook.com/TODAofChinaEN',
  australasia: 'https://www.facebook.com/TODAofAustralasia',
  'aus-eastern': 'https://www.facebook.com/TODAofAustralasia',
  'aus-western': 'https://www.facebook.com/TODAofAustralasia',
  'aus-nz': 'https://www.facebook.com/TODAofAustralasia',
  israel: MAIN_FACEBOOK,
};

// Returns the best Facebook URL for a chapter slug:
//   1. Chapter's own Facebook (if mapped)
//   2. Its parent federation's Facebook (if mapped)
//   3. The global TODA Facebook page
export function facebookForChapter(slug) {
  if (!slug) return MAIN_FACEBOOK;
  if (chapterFacebook[slug]) return chapterFacebook[slug];
  const parent = findParent(slug);
  if (parent && chapterFacebook[parent.slug]) return chapterFacebook[parent.slug];
  return MAIN_FACEBOOK;
}

// Per-chapter socials returned as an array of `{ id, label, href }`
// items in the same order as `socials`. Only the Facebook link is
// chapter-specific; the rest reuse the global TODA accounts.
export function socialsForChapter(slug) {
  const fb = facebookForChapter(slug);
  return socials.map((s) => (s.id === 'facebook' ? { ...s, href: fb } : s));
}
