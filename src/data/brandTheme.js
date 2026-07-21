/**
 * Brand colors sampled from client reference screenshots
 * (WhatsApp Image 2026-07-21).
 */
export const BRAND = {
  /** Main title — TRUCK OWNERS AND DRIVER ASSOCIATION */
  title: '#1A3A6E',
  /** Soft cyan/blue bloom behind the main title */
  titleGlow:
    '0 0 6px rgba(90, 180, 255, 0.55), 0 0 18px rgba(70, 160, 230, 0.45), 0 0 36px rgba(50, 130, 200, 0.3), 0 0 64px rgba(40, 110, 180, 0.18)',
  /** Slogan — TRUCKERS OF THE WORLD, UNITE! */
  slogan: '#9BA1A8',
  /** Resources link */
  resources: '#C49A4A',
  /** #JoinTODA */
  joinToda: '#1A3A6E',
  /** Declaration of Unity (desktop) */
  declaration: '#F09214',
  /** The Truckers Manifesto */
  manifesto: '#B08A4A',
  /** iUnity accent orange */
  accent: '#F09214',
  /** Chapter labels on the globe */
  label: '#d8eeef',
};

/** Convenience aliases used by chrome components */
export const brandColor = {
  title: BRAND.title,
  titleGlow: BRAND.titleGlow,
  slogan: BRAND.slogan,
  resources: BRAND.resources,
  joinToda: BRAND.joinToda,
  declaration: BRAND.declaration,
  manifesto: BRAND.manifesto,
  accent: BRAND.accent,
  label: BRAND.label,
};
