import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { FiPlus, FiMinus, FiArrowRight } from 'react-icons/fi';
import { globePins, chapterUrlForPin } from '../data/networkData';
import { createPushpinObject } from '../utils/createPushpinObject';

const MIN_ALTITUDE = 0.55;
const MAX_ALTITUDE = 4.5;
const ZOOM_STEP = 0.55;
const LABEL_COLOR = '#d8eeef';

function isMobileViewport() {
  return typeof window !== 'undefined' && window.innerWidth < 768;
}

function makeChapterLabelEl(pin, mobile) {
  const wrap = document.createElement('div');
  wrap.style.cssText = [
    'transform: translate(-50%, 6px)',
    'text-align: center',
    'pointer-events: none',
    'user-select: none',
    `-webkit-user-select: none`,
    `max-width: ${mobile ? '140px' : '200px'}`,
    "font-family: 'DM Sans', 'Segoe UI', Arial, sans-serif",
    'font-weight: 600',
    `font-size: ${mobile ? '9px' : '11px'}`,
    'line-height: 1.2',
    `color: ${LABEL_COLOR}`,
    'text-shadow: 0 1px 2px rgba(0,0,0,0.95), 0 0 6px rgba(0,0,0,0.7)',
  ].join(';');

  if (pin.rtl) {
    wrap.dir = 'rtl';
    wrap.style.fontFamily =
      "'Segoe UI', 'Noto Sans Arabic', 'Noto Sans Hebrew', Arial, sans-serif";
  }

  const lines = pin.labelLines?.length ? pin.labelLines : [pin.name];
  lines.forEach((text) => {
    const row = document.createElement('div');
    row.textContent = text;
    row.style.whiteSpace = 'nowrap';
    row.style.overflow = 'hidden';
    row.style.textOverflow = 'ellipsis';
    wrap.appendChild(row);
  });

  return wrap;
}

export default function InteractiveGlobe() {
  const globeRef = useRef(null);
  const wrapperRef = useRef(null);
  const hintTimerRef = useRef(null);
  const [mobile, setMobile] = useState(() => isMobileViewport());
  const [size, setSize] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  }));
  const [hint, setHint] = useState(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return undefined;

    const update = () => {
      const w = Math.max(el.clientWidth || window.innerWidth, 320);
      const h = Math.max(
        el.clientHeight || window.innerHeight || window.visualViewport?.height || 0,
        320
      );
      setSize({ width: w, height: h });
      setMobile(isMobileViewport());
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    };
  }, []);

  const onReady = useCallback(() => {
    const globe = globeRef.current;
    if (!globe) return;

    try {
      const controls = globe.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = mobile ? 0.35 : 0.4;
      controls.enableZoom = true;
      controls.enablePan = false;
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.rotateSpeed = mobile ? 0.55 : 0.8;
      controls.minDistance = mobile ? 140 : 120;
      controls.maxDistance = 520;
    } catch {
      /* ignore */
    }

    try {
      const mat = globe.globeMaterial();
      mat.color.setHex(0xffffff);
    } catch {
      /* ignore */
    }

    globe.pointOfView(
      { lat: 18, lng: -15, altitude: mobile ? 2.85 : 2.25 },
      0
    );
  }, [mobile]);

  const zoomBy = (delta) => {
    const globe = globeRef.current;
    if (!globe) return;
    const pov = globe.pointOfView();
    const altitude = Math.min(
      MAX_ALTITUDE,
      Math.max(MIN_ALTITUDE, (pov.altitude || 2) + delta)
    );
    globe.pointOfView({ ...pov, altitude }, 350);
  };

  const handlePinHover = useCallback((pin) => {
    const globe = globeRef.current;
    if (!globe) return;
    try {
      globe.controls().autoRotate = !pin;
    } catch {
      /* ignore */
    }
    if (wrapperRef.current && !isMobileViewport()) {
      wrapperRef.current.style.cursor = pin ? 'pointer' : 'grab';
    }
  }, []);

  const handlePinClick = useCallback((pin) => {
    if (!pin) return;
    setHint(pin);
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    hintTimerRef.current = setTimeout(() => setHint(null), 4500);
  }, []);

  const hubData = useMemo(
    () => globePins.map((p) => ({ ...p, __mobile: mobile })),
    [mobile]
  );

  const htmlData = useMemo(() => globePins.map((p) => ({ ...p })), []);

  const makeLabelEl = useCallback(
    (pin) => makeChapterLabelEl(pin, mobile),
    [mobile]
  );

  const arcs = useMemo(() => {
    const hubs = ['toda', 'europe', 'china', 'australasia', 'arabia', 'africa', 'brazil'];
    const hubPins = globePins.filter((p) => hubs.includes(p.id));
    const color = ['rgba(96,165,250,0)', 'rgba(96,165,250,0.35)', 'rgba(96,165,250,0)'];
    const out = [];
    for (let i = 0; i < hubPins.length; i++) {
      for (let j = i + 1; j < hubPins.length; j++) {
        out.push({
          startLat: hubPins[i].lat,
          startLng: hubPins[i].lng,
          endLat: hubPins[j].lat,
          endLng: hubPins[j].lng,
          color,
          stroke: 0.18,
        });
      }
    }
    return out;
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-screen overflow-hidden bg-black touch-manipulation"
      style={{ height: '100dvh', minHeight: '100vh' }}
    >
      <Globe
        ref={globeRef}
        width={size.width}
        height={size.height}
        backgroundColor="#000000"
        globeImageUrl="/textures/earth-blue-marble.jpg"
        bumpImageUrl="/textures/earth-topology.png"
        showAtmosphere
        atmosphereColor="#4da3ff"
        atmosphereAltitude={0.18}
        onGlobeReady={onReady}
        objectsData={hubData}
        objectLat="lat"
        objectLng="lng"
        objectAltitude={0.02}
        objectFacesSurfaces
        objectThreeObject={createPushpinObject}
        onObjectClick={handlePinClick}
        onObjectHover={handlePinHover}
        htmlElementsData={htmlData}
        htmlLat="lat"
        htmlLng="lng"
        htmlAltitude={mobile ? 0.055 : 0.065}
        htmlElement={makeLabelEl}
        arcsData={arcs}
        arcColor="color"
        arcStroke="stroke"
        arcDashLength={0.4}
        arcDashGap={1.8}
        arcDashAnimateTime={5500}
        arcAltitudeAutoScale={0.32}
      />

      {hint && (
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-1.5rem)] max-w-md pb-[env(safe-area-inset-bottom)]">
          <div className="bg-[#0E0E0E]/95 backdrop-blur-xl border border-sky-500/40 rounded-2xl px-4 py-3 sm:px-5 sm:py-4 shadow-[0_8px_32px_rgba(0,0,0,0.6)] text-center">
            <div className="text-[10px] font-mono tracking-[0.25em] text-sky-400 uppercase">
              {hint.code} · {hint.region}
            </div>
            <div
              className="font-display font-bold text-sm sm:text-base mt-1"
              style={{ color: LABEL_COLOR }}
              dir={hint.rtl ? 'rtl' : 'auto'}
            >
              {hint.name}
            </div>
            <a
              href={chapterUrlForPin(hint.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 sm:mt-4 inline-flex w-full items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold px-4 py-3 rounded-xl min-h-[44px]"
            >
              Open chapter <FiArrowRight />
            </a>
          </div>
        </div>
      )}

      <div className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-6 flex flex-col gap-2 z-10 pt-[env(safe-area-inset-top)]">
        <button
          type="button"
          onClick={() => zoomBy(-ZOOM_STEP)}
          aria-label="Zoom in"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/20 text-white flex items-center justify-center"
        >
          <FiPlus size={20} />
        </button>
        <button
          type="button"
          onClick={() => zoomBy(ZOOM_STEP)}
          aria-label="Zoom out"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/20 text-white flex items-center justify-center"
        >
          <FiMinus size={20} />
        </button>
      </div>
    </div>
  );
}
