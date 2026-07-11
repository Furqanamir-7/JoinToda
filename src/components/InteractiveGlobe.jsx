import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { FiPlus, FiMinus, FiArrowRight } from 'react-icons/fi';
import { globePins, chapterUrlForPin } from '../data/networkData';
import { createPinElement } from '../utils/createPinElement';

const MIN_ALTITUDE = 0.6;
const MAX_ALTITUDE = 4;
const ZOOM_STEP = 0.6;

export default function InteractiveGlobe() {
  const globeRef = useRef(null);
  const wrapperRef = useRef(null);
  const hintTimerRef = useRef(null);
  const configuredRef = useRef(false);
  const [size, setSize] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  }));
  const [hint, setHint] = useState(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return undefined;

    const update = () => {
      const width = el.clientWidth || window.innerWidth;
      const height = el.clientHeight || window.innerHeight;
      if (width > 1 && height > 1) setSize({ width, height });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    };
  }, []);

  const configureGlobe = useCallback(() => {
    const globe = globeRef.current;
    if (!globe || configuredRef.current) return;
    configuredRef.current = true;

    try {
      const controls = globe.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.45;
      controls.enableZoom = true;
      controls.enablePan = false;
      controls.rotateSpeed = 0.8;
      controls.minDistance = 110;
      controls.maxDistance = 600;
    } catch {
      /* ignore */
    }

    try {
      const mat = globe.globeMaterial?.();
      if (mat?.color?.set) mat.color.set('#ffffff');
    } catch {
      /* ignore */
    }

    const isMobile = window.innerWidth < 640;
    try {
      globe.pointOfView({ lat: 25, lng: -10, altitude: isMobile ? 2.6 : 2.0 }, 0);
    } catch {
      /* ignore */
    }
  }, []);

  // Configure as soon as the ref is usable; don't block UI on a ready flag.
  useEffect(() => {
    const id = window.setInterval(() => {
      if (globeRef.current) {
        configureGlobe();
        window.clearInterval(id);
      }
    }, 100);
    const timeout = window.setTimeout(() => window.clearInterval(id), 8000);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(timeout);
    };
  }, [configureGlobe]);

  const zoomBy = (delta) => {
    if (!globeRef.current) return;
    const pov = globeRef.current.pointOfView();
    const altitude = Math.min(
      MAX_ALTITUDE,
      Math.max(MIN_ALTITUDE, pov.altitude + delta)
    );
    globeRef.current.pointOfView({ ...pov, altitude }, 350);
  };

  const handlePinHover = useCallback((pin) => {
    if (!globeRef.current) return;
    try {
      globeRef.current.controls().autoRotate = !pin;
    } catch {
      /* ignore */
    }
    if (wrapperRef.current) {
      wrapperRef.current.style.cursor = pin ? 'pointer' : 'grab';
    }
  }, []);

  const handlePinClick = useCallback((pin) => {
    if (!pin) return;
    setHint(pin);
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    hintTimerRef.current = setTimeout(() => setHint(null), 3500);
  }, []);

  const hubData = useMemo(() => globePins.map((p) => ({ ...p })), []);

  const labels = useMemo(
    () =>
      globePins.map((p) => ({
        ...p,
        text: p.name,
      })),
    []
  );

  const arcs = useMemo(() => {
    const hubs = ['usa', 'spain', 'china', 'australia', 'saudi', 'kenya'];
    const hubPins = globePins.filter((p) => hubs.includes(p.id));
    const out = [];
    const arcColor = [
      'rgba(96,165,250,0)',
      'rgba(96,165,250,0.65)',
      'rgba(96,165,250,0)',
    ];
    for (let i = 0; i < hubPins.length; i++) {
      for (let j = i + 1; j < hubPins.length; j++) {
        out.push({
          startLat: hubPins[i].lat,
          startLng: hubPins[i].lng,
          endLat: hubPins[j].lat,
          endLng: hubPins[j].lng,
          color: arcColor,
          stroke: 0.3,
        });
      }
    }
    return out;
  }, []);

  const makePinEl = useCallback(
    (pin) => {
      const el = createPinElement(pin);
      el.style.pointerEvents = 'auto';
      el.onclick = (e) => {
        e.stopPropagation();
        handlePinClick(pin);
      };
      el.onmouseenter = () => handlePinHover(pin);
      el.onmouseleave = () => handlePinHover(null);
      el.ondblclick = (e) => {
        e.stopPropagation();
        window.open(chapterUrlForPin(pin.id), '_blank', 'noopener,noreferrer');
      };
      return el;
    },
    [handlePinClick, handlePinHover]
  );

  return (
    <div
      ref={wrapperRef}
      className="relative w-screen h-screen overflow-hidden bg-black"
    >
      <Globe
        ref={globeRef}
        width={size.width}
        height={size.height}
        backgroundColor="#000000"
        showGlobe
        showAtmosphere
        atmosphereColor="#3B82F6"
        atmosphereAltitude={0.22}
        globeImageUrl="/textures/earth-blue-marble.jpg"
        bumpImageUrl="/textures/earth-topology.png"
        onGlobeReady={configureGlobe}
        htmlElementsData={hubData}
        htmlLat="lat"
        htmlLng="lng"
        htmlAltitude={0.015}
        htmlElement={makePinEl}
        labelsData={labels}
        labelLat="lat"
        labelLng="lng"
        labelText="text"
        labelSize={1.1}
        labelDotRadius={0}
        labelIncludeDot={false}
        labelColor={() => 'rgba(255,255,255,0.92)'}
        labelAltitude={0.022}
        labelResolution={2}
        arcsData={arcs}
        arcColor="color"
        arcStroke="stroke"
        arcDashLength={0.45}
        arcDashGap={1.5}
        arcDashAnimateTime={4500}
        arcAltitudeAutoScale={0.38}
      />

      {hint && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-2rem)] max-w-sm pb-[env(safe-area-inset-bottom)]">
          <div className="bg-[#0E0E0E]/95 backdrop-blur-xl border border-sky-500/40 rounded-2xl px-5 py-4 sm:px-6 sm:py-5 shadow-[0_8px_32px_rgba(0,0,0,0.6)] text-center">
            <div className="text-[10px] font-mono tracking-[0.25em] text-sky-400 uppercase">
              {hint.code} · {hint.region}
            </div>
            <div className="font-display font-bold text-white text-base sm:text-lg mt-1" dir="auto">
              {hint.fullName || hint.name}
            </div>
            <a
              href={chapterUrlForPin(hint.id)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setHint(null);
                if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
              }}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 active:scale-[0.98] text-white text-sm font-semibold px-4 py-3 rounded-xl shadow-[0_0_18px_rgba(59,130,246,0.4)] transition-all"
            >
              Open chapter <FiArrowRight />
            </a>
          </div>
        </div>
      )}

      <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-6 flex flex-col gap-2 z-10">
        <button
          type="button"
          onClick={() => zoomBy(-ZOOM_STEP)}
          aria-label="Zoom in"
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-colors shadow-[0_4px_18px_rgba(0,0,0,0.5)]"
        >
          <FiPlus size={22} />
        </button>
        <button
          type="button"
          onClick={() => zoomBy(ZOOM_STEP)}
          aria-label="Zoom out"
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-colors shadow-[0_4px_18px_rgba(0,0,0,0.5)]"
        >
          <FiMinus size={22} />
        </button>
      </div>
    </div>
  );
}
