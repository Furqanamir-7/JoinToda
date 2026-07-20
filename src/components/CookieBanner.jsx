import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  applyTrackingConsent,
  getCookieConsent,
  setCookieConsent,
} from '../data/siteConfig';

export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    const existing = getCookieConsent();
    if (existing) {
      applyTrackingConsent(existing);
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, []);

  const save = (prefs) => {
    const consent = setCookieConsent(prefs);
    applyTrackingConsent(consent);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 z-[200] p-3 sm:p-4 bottom-[8.5rem] md:bottom-0 md:pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/15 bg-[#0E0E0E] shadow-[0_12px_40px_rgba(0,0,0,0.55)] px-4 py-4 sm:px-5">
        <p className="text-sm text-neutral-300 leading-relaxed">
          We use cookies for essential site functions and, with your permission,
          analytics (Google Tag Manager) and marketing (Meta Pixel) so we can
          improve the network experience.{' '}
          <Link to="/cookies" className="text-sky-400 hover:underline">
            Cookie settings
          </Link>
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => save({ analytics: true, marketing: true })}
            className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2.5 min-h-[44px]"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={() => save({ analytics: false, marketing: false })}
            className="rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold px-4 py-2.5 min-h-[44px]"
          >
            Necessary only
          </button>
          <button
            type="button"
            onClick={() =>
              save({ analytics, marketing })
            }
            className="rounded-xl border border-white/20 text-neutral-200 text-sm font-semibold px-4 py-2.5 min-h-[44px]"
          >
            Save choices
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-4 text-xs text-neutral-400">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="rounded border-white/30"
            />
            Analytics (Google Tags)
          </label>
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="rounded border-white/30"
            />
            Marketing (Meta Pixel)
          </label>
        </div>
      </div>
    </div>
  );
}
