import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  applyTrackingConsent,
  getCookieConsent,
  setCookieConsent,
  TRACKING,
} from '../data/siteConfig';

export default function CookiesPage() {
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const c = getCookieConsent();
    if (c) {
      setAnalytics(Boolean(c.analytics));
      setMarketing(Boolean(c.marketing));
    }
  }, []);

  const save = () => {
    const consent = setCookieConsent({ analytics, marketing });
    applyTrackingConsent(consent);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-neutral-200 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-xl">
        <Link
          to="/"
          className="text-sm text-sky-400 hover:underline"
        >
          ← Back to globe
        </Link>
        <h1 className="mt-6 font-display font-bold text-2xl text-white">
          Cookie settings
        </h1>
        <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
          Necessary cookies keep this site working. You can choose whether we
          load Google Tag Manager and Meta Pixel. Change these anytime.
        </p>

        <div className="mt-8 space-y-4">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="font-semibold text-white">Necessary</div>
            <p className="text-xs text-neutral-500 mt-1">
              Always on — remembers your cookie choices and basic preferences.
            </p>
          </div>

          <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 cursor-pointer">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="mt-1"
            />
            <span>
              <span className="block font-semibold text-white">
                Analytics — Google Tags
              </span>
              <span className="block text-xs text-neutral-500 mt-1">
                Helps us understand visits and improve the globe experience.
                {TRACKING.GTM_ID
                  ? ` (GTM: ${TRACKING.GTM_ID})`
                  : ' (ID not set yet — add VITE_GTM_ID)'}
              </span>
            </span>
          </label>

          <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 cursor-pointer">
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="mt-1"
            />
            <span>
              <span className="block font-semibold text-white">
                Marketing — Meta Pixel
              </span>
              <span className="block text-xs text-neutral-500 mt-1">
                Measures campaigns and reach on Meta platforms.
                {TRACKING.META_PIXEL_ID
                  ? ` (Pixel: ${TRACKING.META_PIXEL_ID})`
                  : ' (ID not set yet — add VITE_META_PIXEL_ID)'}
              </span>
            </span>
          </label>
        </div>

        <button
          type="button"
          onClick={save}
          className="mt-8 w-full sm:w-auto rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3"
        >
          {saved ? 'Saved' : 'Save preferences'}
        </button>
      </div>
    </div>
  );
}
