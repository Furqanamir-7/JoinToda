import { useEffect, useMemo, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { FiPlus, FiMinus, FiArrowRight } from 'react-icons/fi';
import { globePins, chapterUrlForPin } from '../data/networkData';
import { createPushpinObject } from '../utils/createPushpinObject';

/**
 * Full-page interactive rotating 3D globe with map pushpins and labels.
 */
const MIN_ALTITUDE = 0.6;
const MAX_ALTITUDE = 4;
const ZOOM_STEP = 0.6;

export default function InteractiveGlobe() {
  const globeRef = useRef(null);
  const wrapperRef = useRef(null);
  const hoveredPinRef = useRef(null);
  const hintTimerRef = useRef(null);
  const [size, setSize] = useState({ width: 1, height: 1 });
  const [hint, setHint] = useState(null);

  useEffect(() => {
    const update = () => {
      if (!wrapperRef.current) return;
      setSize({
        width: wrapperRef.current.clientWidth,
        height: wrapperRef.current.clientHeight,
      });
    };
    update();
    const ro = new ResizeObserver(update);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.rotateSpeed = 0.8;
    controls.minDistance = 110;
    controls.maxDistance = 600;
    const isMobile = window.innerWidth < 640;
    globeRef.current.pointOfView(
      { lat: 25, lng: -30, altitude: isMobile ? 2.6 : 2.0 },
      0
    );
  }, []);

  useEffect(() => {
    return () => {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    };
  }, []);

  const zoomBy = (delta) => {
    if (!globeRef.current) return;
    const pov = globeRef.current.pointOfView();
    const altitude = Math.min(
      MAX_ALTITUDE,
      Math.max(MIN_ALTITUDE, pov.altitude + delta)
    );
    globeRef.current.pointOfView({ ...pov, altitude }, 350);
  };

  const handlePinHover = (pin) => {
    hoveredPinRef.current = pin || null;
    if (!globeRef.current) return;
    globeRef.current.controls().autoRotate = !pin;
    if (wrapperRef.current) {
      wrapperRef.current.style.cursor = pin ? 'pointer' : 'grab';
    }
  };

  const handlePinClick = (pin) => {
    if (!pin) return;
    setHint(pin);
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    hintTimerRef.current = setTimeout(() => setHint(null), 3500);
  };

  const openChapter = (pin) => {
    if (!pin) return;
    setHint(null);
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    window.open(chapterUrlForPin(pin.id), '_blank', 'noopener,noreferrer');
  };

  const handleDoubleClick = () => {
    if (hoveredPinRef.current) openChapter(hoveredPinRef.current);
  };

  const hubData = useMemo(() => globePins.map((p) => ({ ...p })), []);

  const labels = useMemo(
    () =>
      globePins.map((p) => ({
        ...p,
        text: p.name,
        lat: p.lat + (p.labelLatOffset || 0),
        lng: p.lng + (p.labelLngOffset || 0),
      })),
    []
  );

  const arcs = useMemo(() => {
    const out = [];
    const arcColor = [
      'rgba(96,165,250,0)',
      'rgba(96,165,250,0.85)',
      'rgba(96,165,250,0)',
    ];
    for (let i = 0; i < globePins.length; i++) {
      for (let j = i + 1; j < globePins.length; j++) {
        out.push({
          startLat: globePins[i].lat,
          startLng: globePins[i].lng,
          endLat: globePins[j].lat,
          endLng: globePins[j].lng,
          color: arcColor,
          stroke: 0.35,
        });
      }
    }
    return out;
  }, []);

  const rings = useMemo(
    () =>
      globePins.map((p) => ({
        lat: p.lat,
        lng: p.lng,
        maxR: 7,
        propagationSpeed: 3.5,
        repeatPeriod: 1400,
        color: p.color,
      })),
    []
  );

  return (
    <div
      ref={wrapperRef}
      onDoubleClick={handleDoubleClick}
      className="relative w-full h-full overflow-hidden bg-black"
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
        objectsData={hubData}
        objectLat="lat"
        objectLng="lng"
        objectAltitude={0.002}
        objectFacesSurfaces
        objectThreeObject={createPushpinObject}
        onObjectClick={handlePinClick}
        onObjectHover={handlePinHover}
        labelsData={labels}
        labelLat="lat"
        labelLng="lng"
        labelText="text"
        labelSize={1.5}
        labelDotRadius={0}
        labelIncludeDot={false}
        labelColor={() => '#ffffff'}
        labelAltitude={0.028}
        labelResolution={2}
        arcsData={arcs}
        arcColor="color"
        arcStroke="stroke"
        arcDashLength={0.45}
        arcDashGap={1.5}
        arcDashAnimateTime={4500}
        arcAltitudeAutoScale={0.38}
        ringsData={rings}
        ringColor={(r) => () => r.color}
        ringMaxRadius="maxR"
        ringPropagationSpeed="propagationSpeed"
        ringRepeatPeriod="repeatPeriod"
      />

      {hint && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-2rem)] max-w-sm pb-[env(safe-area-inset-bottom)]">
          <div className="bg-[#0E0E0E]/95 backdrop-blur-xl border border-sky-500/40 rounded-2xl px-5 py-4 sm:px-6 sm:py-5 shadow-[0_8px_32px_rgba(0,0,0,0.6)] text-center">
            <div className="text-[10px] font-mono tracking-[0.25em] text-sky-400 uppercase">
              {hint.code} · {hint.region}
            </div>
            <div className="font-display font-bold text-white text-base sm:text-lg mt-1" dir="auto">
              {hint.name}
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
