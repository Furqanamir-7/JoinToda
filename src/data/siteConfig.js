/**
 * Tracking IDs — set via Vercel env or `.env`:
 *   VITE_GTM_ID=GTM-XXXXXXX
 *   VITE_META_PIXEL_ID=1234567890
 * Scripts load only after the visitor accepts cookies.
 */
export const SITE_URL =
  import.meta.env.VITE_SITE_URL || 'https://www.truckersoftheworld.com';

export const TRACKING = {
  GTM_ID: import.meta.env.VITE_GTM_ID || '',
  META_PIXEL_ID: import.meta.env.VITE_META_PIXEL_ID || '',
};

export const OG = {
  title: 'Truckers of the World — TODA',
  description:
    'Truck Owners and Drivers Association. Truckers of the World, Unite! Explore our global chapter network.',
  image: `${SITE_URL}/og-image.png`,
  url: SITE_URL,
};

const CONSENT_KEY = 'toda_cookie_consent';

export function getCookieConsent() {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setCookieConsent(prefs) {
  const payload = {
    necessary: true,
    analytics: Boolean(prefs.analytics),
    marketing: Boolean(prefs.marketing),
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(payload));
  window.dispatchEvent(new CustomEvent('toda-cookie-consent', { detail: payload }));
  return payload;
}

function injectGtm(id) {
  if (!id || document.getElementById('toda-gtm')) return;
  const s = document.createElement('script');
  s.id = 'toda-gtm';
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

  const noscript = document.createElement('noscript');
  noscript.id = 'toda-gtm-ns';
  noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${id}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
  document.body.prepend(noscript);
}

function injectMetaPixel(id) {
  if (!id || document.getElementById('toda-meta-pixel')) return;
  /* eslint-disable */
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.id = 'toda-meta-pixel';
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */
  window.fbq('init', id);
  window.fbq('track', 'PageView');
}

/** Apply consent: load analytics/marketing tags when allowed. */
export function applyTrackingConsent(consent = getCookieConsent()) {
  if (!consent) return;
  if (consent.analytics && TRACKING.GTM_ID) injectGtm(TRACKING.GTM_ID);
  if (consent.marketing && TRACKING.META_PIXEL_ID) {
    injectMetaPixel(TRACKING.META_PIXEL_ID);
  }
}
