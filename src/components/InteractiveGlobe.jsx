import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { TOUCH } from 'three';
import { FiPlus, FiMinus, FiArrowRight, FiX } from 'react-icons/fi';
import {
  globePins,
  chapterUrlForPin,
  associationLatBounds,
} from '../data/networkData';
import { BRAND, brandColor } from '../data/brandTheme';
import GlobeChrome from './GlobeChrome';

const MIN_ALTITUDE = { mobile: 0.55, desktop: 1.2 };
/** Max zoom-out — keep globe large like the WhatsApp Pacific reference. */
const MAX_ALTITUDE = { mobile: 2.35, desktop: 2.15 };
const ZOOM_STEP = 0.28;
const LABEL_COLOR = BRAND.label;
/** Just above max zoom-out so dots always grow within the allowed range. */
const MARKER_SHOW_ALTITUDE = { mobile: 2.45, desktop: 2.2 };
/** Altitude where mobile logos are smallest (deep zoom-in clears clusters). */
const MARKER_NEAR_ALTITUDE = { mobile: 0.55, desktop: 1.25 };
/** Mobile: larger when zoomed out, shrink as you zoom in. Desktop: grow on zoom-in. */
const LOGO_SIZE = {
  mobileFar: 30,
  mobileNear: 12,
  mobileDot: 8,
  desktopMax: 36,
  desktopMin: 10,
};

function isMobileViewport() {
  if (typeof window === 'undefined') return false;
  try {
    return window.matchMedia('(max-width: 767.98px)').matches;
  } catch {
    return window.innerWidth < 768;
  }
}

function latToPolar(lat) {
  return ((90 - lat) * Math.PI) / 180;
}

/**
 * Marker sizing by altitude:
 * - Mobile: logos shrink as you zoom in so dense clusters clear.
 * - Desktop: logos grow as you zoom in (readable at close range).
 */
function markerVisibilityForAltitude(altitude, mobile) {
  const showBelow = mobile
    ? MARKER_SHOW_ALTITUDE.mobile
    : MARKER_SHOW_ALTITUDE.desktop;
  const nearAt = mobile
    ? MARKER_NEAR_ALTITUDE.mobile
    : MARKER_NEAR_ALTITUDE.desktop;
  const alt = altitude ?? (mobile ? MAX_ALTITUDE.mobile : MAX_ALTITUDE.desktop);

  if (alt > showBelow) {
    return {
      logosVisible: true,
      scale: 1,
      logoPx: mobile ? LOGO_SIZE.mobileDot : LOGO_SIZE.desktopMin,
      fontPx: 0,
      showName: false,
    };
  }

  const t = Math.min(1, Math.max(0, (showBelow - alt) / (showBelow - nearAt)));

  if (mobile) {
    // t=0 far → larger logos; t=1 near → smaller logos (clusters clear)
    const logoPx = Math.round(
      LOGO_SIZE.mobileFar - t * (LOGO_SIZE.mobileFar - LOGO_SIZE.mobileNear)
    );
    const fontPx = Math.round(6 + t * 5);
    return {
      logosVisible: true,
      scale: 1,
      logoPx,
      fontPx,
      showName: true,
    };
  }

  const logoPx = Math.round(
    LOGO_SIZE.desktopMin + t * (LOGO_SIZE.desktopMax - LOGO_SIZE.desktopMin)
  );
  const fontPx = t > 0.05 ? Math.round(7 + t * 3) : 0;
  return {
    logosVisible: true,
    scale: 1,
    logoPx,
    fontPx,
    showName: fontPx > 0,
  };
}

function applyAssociationRotationLimits(controls) {
  const { minLat, maxLat } = associationLatBounds;
  controls.minPolarAngle = latToPolar(maxLat);
  controls.maxPolarAngle = latToPolar(minLat);
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
}

/** Push nearby pins apart into emptier globe space. */
function spreadPins(
  pins,
  minSepDeg,
  latBias = 1.85,
  lngBias = 0.55,
  iterations = 16
) {
  const { minLat, maxLat } = associationLatBounds;
  const out = pins.map((p) => ({ ...p, lat: p.lat, lng: p.lng }));
  for (let iter = 0; iter < iterations; iter++) {
    for (let i = 0; i < out.length; i++) {
      for (let j = i + 1; j < out.length; j++) {
        let dlat = out[j].lat - out[i].lat;
        let dlng = out[j].lng - out[i].lng;
        if (dlng > 180) dlng -= 360;
        if (dlng < -180) dlng += 360;
        // Break near-stacks by fanning left/right into open ocean / empty land
        if (Math.abs(dlng) < 0.55 && Math.abs(dlat) < minSepDeg * 0.85) {
          const side = (i + j) % 2 === 0 ? -1 : 1;
          dlng = side * (1.15 + (iter % 3) * 0.35);
        }
        const dist = Math.hypot(dlat * latBias, dlng * Math.max(1, lngBias));
        if (dist >= minSepDeg || dist < 0.001) continue;
        const push = ((minSepDeg - dist) / 2 / dist) * 0.82;
        out[i].lat -= dlat * push * latBias;
        out[i].lng -= dlng * push * lngBias;
        out[j].lat += dlat * push * latBias;
        out[j].lng += dlng * push * lngBias;
      }
    }
  }
  // Keep markers in the association band so rotation limits still feel natural
  for (const p of out) {
    p.lat = Math.min(maxLat - 1.5, Math.max(minLat + 1.5, p.lat));
  }
  return out;
}

/** Extra repulsion for the dense Europe / Med band (lng −20…45). */
function spreadEuropeCluster(pins, minSepDeg = 15) {
  const out = pins.map((p) => ({ ...p }));
  const inBand = (p) => p.lng >= -20 && p.lng <= 48 && p.lat >= 28 && p.lat <= 72;
  for (let iter = 0; iter < 36; iter++) {
    for (let i = 0; i < out.length; i++) {
      if (!inBand(out[i])) continue;
      for (let j = i + 1; j < out.length; j++) {
        if (!inBand(out[j])) continue;
        let dlat = out[j].lat - out[i].lat;
        let dlng = out[j].lng - out[i].lng;
        if (dlng > 180) dlng -= 360;
        if (dlng < -180) dlng += 360;
        if (Math.abs(dlng) < 0.8) {
          dlng = ((i + j) % 2 === 0 ? -1 : 1) * 1.4;
        }
        const dist = Math.hypot(dlat * 2.4, dlng * 2.0);
        if (dist >= minSepDeg || dist < 0.001) continue;
        const push = ((minSepDeg - dist) / 2 / dist) * 0.9;
        out[i].lat -= dlat * push * 2.4;
        out[i].lng -= dlng * push * 2.0;
        out[j].lat += dlat * push * 2.4;
        out[j].lng += dlng * push * 2.0;
      }
    }
  }
  return out;
}

/** Fan chapter labels left / center / right so text uses empty gaps. */
function assignLabelSides(pins) {
  const sorted = [...pins].sort(
    (a, b) => a.lng - b.lng || b.lat - a.lat || a.id.localeCompare(b.id)
  );
  const sideById = new Map();
  sorted.forEach((p, idx) => {
    // L / R / C pattern spreads text into open space beside logos
    const side = idx % 3 === 0 ? -1 : idx % 3 === 1 ? 1 : 0;
    sideById.set(p.id, side);
  });
  return pins.map((p) => ({ ...p, __labelSide: sideById.get(p.id) ?? 0 }));
}

/**
 * HTML marker: circular logo that grows with zoom + chapter name.
 */
function makeChapterMarkerEl(pin, onSelect) {
  const mobile = Boolean(pin?.__mobile);
  const logoSize = mobile ? LOGO_SIZE.mobileFar : LOGO_SIZE.desktopMax;
  const logoHalf = logoSize / 2;

  const wrap = document.createElement('div');
  wrap.style.cssText = 'pointer-events:none;user-select:none;';

  const inner = document.createElement('div');
  inner.dataset.chapterMarker = '1';
  inner.dataset.logoHalf = String(logoHalf);
  inner.dataset.logoSize = String(logoSize);
  inner.style.cssText = [
    'position:absolute',
    'left:0',
    'top:0',
    'transform:translate(-50%, -50%)',
    'transform-origin:50% 50%',
    'display:flex',
    'flex-direction:column',
    'align-items:center',
    'text-align:center',
    'width:max-content',
    mobile ? 'max-width:min(150px,44vw)' : 'max-width:min(220px,18vw)',
  ].join(';');
  inner.dataset.labelSide = String(pin.__labelSide ?? 0);

  const logoBtn = document.createElement('button');
  logoBtn.type = 'button';
  logoBtn.setAttribute('aria-label', pin.name);
  logoBtn.className = 'chapter-logo-btn';
  logoBtn.style.cssText = [
    'pointer-events:none',
    'cursor:pointer',
    'padding:0',
    'border:0',
    'background:transparent',
    'line-height:0',
    `width:${mobile ? 9 : 11}px`,
    `height:${mobile ? 9 : 11}px`,
    'opacity:1',
    'overflow:hidden',
    'border-radius:9999px',
    'box-shadow:0 0 0 1.5px rgba(220,60,60,0.9)',
    'flex-shrink:0',
  ].join(';');

  const img = document.createElement('img');
  img.src = pin.logoUrl || '/logos/toda.png';
  img.alt = '';
  img.draggable = false;
  img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
  logoBtn.appendChild(img);

  const select = (e) => {
    e.stopPropagation();
    onSelect?.(pin);
  };
  logoBtn.addEventListener('click', select);
  logoBtn.addEventListener('pointerdown', (e) => e.stopPropagation());

  const nameBox = document.createElement('div');
  nameBox.className = 'chapter-name';
  nameBox.style.cssText = [
    'margin-top:0',
    "font-family:'Avenir Next',Avenir,'Helvetica Neue',Arial,sans-serif",
    'font-weight:700',
    'font-size:0px',
    'line-height:1.25',
    `color:${LABEL_COLOR}`,
    'text-shadow:0 1px 3px rgba(0,0,0,0.95),0 0 8px rgba(0,0,0,0.8)',
    'width:100%',
    'max-width:inherit',
    'pointer-events:none',
    'cursor:pointer',
    'opacity:0',
  ].join(';');

  if (pin.rtl) {
    nameBox.dir = 'rtl';
    nameBox.style.fontFamily =
      "'Segoe UI','Noto Sans Arabic','Noto Sans Hebrew',Arial,sans-serif";
  }

  const lines = (pin.labelLines?.length ? pin.labelLines : [pin.name]).slice(
    0,
    2
  );
  lines.forEach((text) => {
    const row = document.createElement('div');
    row.textContent = text;
    row.style.cssText =
      'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;';
    nameBox.appendChild(row);
  });

  nameBox.addEventListener('click', select);
  nameBox.addEventListener('pointerdown', (e) => e.stopPropagation());

  inner.appendChild(logoBtn);
  inner.appendChild(nameBox);
  wrap.appendChild(inner);
  return wrap;
}

function syncMarkerScales(root, altitude, mobile) {
  if (!root) return false;
  const { logosVisible, logoPx, fontPx, showName } =
    markerVisibilityForAltitude(altitude, mobile);
  root.querySelectorAll('[data-chapter-marker]').forEach((el) => {
    const half = logoPx > 0 ? logoPx / 2 : Number(el.dataset.logoHalf) || 23;
    const logo = el.querySelector('.chapter-logo-btn');
    const name = el.querySelector('.chapter-name');

    if (logosVisible && logoPx > 0) {
      // No CSS scale — pixel size alone grows with zoom (avoids zoom glitches)
      el.style.transform = `translate(-50%, -${half}px)`;
      el.style.transformOrigin = '50% 0';
      if (logo) {
        logo.style.width = `${logoPx}px`;
        logo.style.height = `${logoPx}px`;
        logo.style.opacity = '1';
        logo.style.boxShadow =
          logoPx < 16
            ? '0 0 0 1.5px rgba(220,60,60,0.9)'
            : '0 0 0 2px rgba(255,255,255,0.55),0 4px 14px rgba(0,0,0,0.5)';
        logo.style.margin = logoPx >= 22 ? (mobile ? '3px' : '4px') : '0';
        logo.style.pointerEvents = logoPx >= 16 ? 'auto' : 'none';
      }
      if (name) {
        if (showName && fontPx > 0) {
          const side = Number(el.dataset.labelSide) || 0;
          const ox = mobile ? side * Math.round(logoPx * 0.95 + 14) : 0;
          name.style.marginTop = mobile ? '3px' : '5px';
          name.style.fontSize = `${fontPx}px`;
          name.style.opacity = '1';
          name.style.pointerEvents = 'auto';
          name.style.transform = ox ? `translateX(${ox}px)` : '';
          name.style.textAlign =
            side < 0 ? 'right' : side > 0 ? 'left' : 'center';
        } else {
          name.style.marginTop = '0';
          name.style.fontSize = '0px';
          name.style.opacity = '0';
          name.style.pointerEvents = 'none';
          name.style.transform = '';
        }
      }
    } else {
      el.style.transform = 'translate(-50%, -50%)';
      el.style.transformOrigin = '50% 50%';
      if (logo) {
        logo.style.width = '11px';
        logo.style.height = '11px';
        logo.style.opacity = '1';
        logo.style.boxShadow = '0 0 0 1.5px rgba(220,60,60,0.9)';
        logo.style.margin = '0';
        logo.style.pointerEvents = 'none';
      }
      if (name) {
        name.style.marginTop = '0';
        name.style.fontSize = '0px';
        name.style.opacity = '0';
        name.style.pointerEvents = 'none';
      }
    }
  });
  return logosVisible;
}

export default function InteractiveGlobe() {
  const globeRef = useRef(null);
  const wrapperRef = useRef(null);
  const hintTimerRef = useRef(null);
  const onSelectRef = useRef(null);
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
      // Use the shell’s laid-out box only — visualViewport differs by browser
      // and was causing mismatched canvas sizes (esp. Safari vs Chrome).
      const rect = el.getBoundingClientRect();
      const w = Math.max(Math.round(rect.width || el.clientWidth || 0), 320);
      const h = Math.max(Math.round(rect.height || el.clientHeight || 0), 320);
      setSize((prev) =>
        prev.width === w && prev.height === h ? prev : { width: w, height: h }
      );
      setMobile(isMobileViewport());
    };

    update();
    const ro = new ResizeObserver(() => {
      // rAF batches Safari/Chrome resize thrash into one paint
      requestAnimationFrame(update);
    });
    ro.observe(el);
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    try {
      window
        .matchMedia('(max-width: 767.98px)')
        .addEventListener('change', update);
    } catch {
      /* older Safari */
    }
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

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    try {
      globe.controls().autoRotate = !hint;
    } catch {
      /* ignore */
    }
  }, [hint]);

  const handlePinClick = useCallback((pin) => {
    if (!pin) return;
    setHint({
      id: pin.id,
      name: pin.name,
      labelLines: pin.labelLines,
      code: pin.code,
      region: pin.region,
      rtl: pin.rtl,
      logoUrl: pin.logoUrl,
      lat: pin.lat,
      lng: pin.lng,
    });
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    if (!isMobileViewport()) {
      hintTimerRef.current = setTimeout(() => setHint(null), 5000);
    }

    const globe = globeRef.current;
    if (globe) {
      try {
        const alt = isMobileViewport()
          ? MIN_ALTITUDE.mobile
          : MIN_ALTITUDE.desktop;
        globe.pointOfView({ lat: pin.lat, lng: pin.lng, altitude: alt }, 650);
      } catch {
        /* ignore */
      }
    }
  }, []);

  onSelectRef.current = handlePinClick;

  const onReady = useCallback(() => {
    const globe = globeRef.current;
    if (!globe) return;

    try {
      const controls = globe.controls();
      applyAssociationRotationLimits(controls);
      controls.autoRotate = true;
      controls.autoRotateSpeed = mobile ? 0.22 : 0.28;
      controls.enableZoom = true;
      controls.zoomSpeed = mobile ? 1.35 : 1.0;
      controls.rotateSpeed = mobile ? 0.45 : 0.6;
      // Closer minDistance = deeper zoom-in (pins separate; logos shrink)
      controls.minDistance = mobile ? 95 : 220;
      controls.maxDistance = mobile ? 340 : 315;
      // One finger rotate, two-finger pinch zoom (dolly)
      if (controls.touches) {
        controls.touches.ONE = TOUCH.ROTATE;
        controls.touches.TWO = TOUCH.DOLLY_PAN;
      }
    } catch {
      /* ignore */
    }

    // Cap DPR so retina Safari / Chrome / Firefox render at comparable sharpness
    try {
      const renderer = globe.renderer?.();
      if (renderer?.setPixelRatio) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        renderer.setPixelRatio(dpr);
      }
    } catch {
      /* ignore */
    }

    try {
      const mat = globe.globeMaterial();
      mat.color.setHex(0xffffff);
    } catch {
      /* ignore */
    }

    try {
      const camera = globe.camera();
      if (camera) {
        camera.fov = 50;
        camera.updateProjectionMatrix();
      }
    } catch {
      /* ignore */
    }

    // Open at max zoom-out — Pacific frame (matches WhatsApp reference)
    const startAlt = mobile ? MAX_ALTITUDE.mobile : MAX_ALTITUDE.desktop;
    const startLat = mobile ? 5 : 20;
    const startLng = mobile ? 165 : -30;
    globe.pointOfView({ lat: startLat, lng: startLng, altitude: startAlt }, 0);
    syncMarkerScales(wrapperRef.current, startAlt, mobile);
  }, [mobile]);

  const onZoom = useCallback(
    (pov) => {
      const globe = globeRef.current;
      const minAlt = mobile ? MIN_ALTITUDE.mobile : MIN_ALTITUDE.desktop;
      const maxAlt = mobile ? MAX_ALTITUDE.mobile : MAX_ALTITUDE.desktop;
      let alt = pov?.altitude;
      if (globe && typeof alt === 'number') {
        if (alt > maxAlt || alt < minAlt) {
          try {
            const cur = globe.pointOfView();
            const clamped = Math.min(maxAlt, Math.max(minAlt, alt));
            globe.pointOfView({ ...cur, altitude: clamped }, 0);
            alt = clamped;
          } catch {
            /* ignore */
          }
        }
      }
      syncMarkerScales(wrapperRef.current, alt, mobile);
    },
    [mobile]
  );

  const zoomBy = useCallback(
    (delta) => {
      const globe = globeRef.current;
      if (!globe) return;
      const pov = globe.pointOfView();
      const minAlt = mobile ? MIN_ALTITUDE.mobile : MIN_ALTITUDE.desktop;
      const maxAlt = mobile ? MAX_ALTITUDE.mobile : MAX_ALTITUDE.desktop;
      const altitude = Math.min(
        maxAlt,
        Math.max(minAlt, (pov.altitude || 2) + delta)
      );
      const { minLat, maxLat } = associationLatBounds;
      const lat = Math.min(maxLat, Math.max(minLat, pov.lat ?? 18));
      globe.pointOfView({ ...pov, lat, altitude }, 320);

      // Keep logos in sync during the animated zoom
      let frames = 0;
      const tick = () => {
        try {
          syncMarkerScales(
            wrapperRef.current,
            globe.pointOfView().altitude,
            mobile
          );
        } catch {
          /* ignore */
        }
        frames += 1;
        if (frames < 40) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    },
    [mobile]
  );

  const clearHint = useCallback(() => {
    setHint(null);
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
  }, []);

  const htmlData = useMemo(() => {
    if (hint) return [];
    let base = mobile
      ? spreadPins(globePins, 17.5, 2.25, 1.75, 46)
      : spreadPins(globePins, 8.0, 2.1, 0.55, 16);
    if (mobile) base = spreadEuropeCluster(base, 16.5);
    return assignLabelSides(base).map((p) => ({ ...p, __mobile: mobile }));
  }, [mobile, hint]);

  const makeLabelEl = useCallback(
    (pin) => makeChapterMarkerEl(pin, (p) => onSelectRef.current?.(p)),
    []
  );

  // Brief sync after markers remount (hint close / mobile toggle). onZoom covers live zoom.
  useEffect(() => {
    if (hint) return undefined;
    let cancelled = false;
    let id = 0;
    let frames = 0;
    const tick = () => {
      if (cancelled) return;
      const globe = globeRef.current;
      if (globe) {
        try {
          syncMarkerScales(
            wrapperRef.current,
            globe.pointOfView().altitude,
            mobile
          );
        } catch {
          /* ignore */
        }
      }
      frames += 1;
      if (frames < 45) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
    };
  }, [mobile, hint, htmlData]);

  const arcs = useMemo(() => {
    const hubs = ['toda', 'europe', 'china', 'australasia'];
    const hubPins = globePins.filter((p) => hubs.includes(p.id));
    const color = [
      'rgba(96,165,250,0)',
      'rgba(96,165,250,0.18)',
      'rgba(96,165,250,0)',
    ];
    const out = [];
    for (let i = 0; i < hubPins.length; i++) {
      for (let j = i + 1; j < hubPins.length; j++) {
        out.push({
          startLat: hubPins[i].lat,
          startLng: hubPins[i].lng,
          endLat: hubPins[j].lat,
          endLng: hubPins[j].lng,
          color,
          stroke: mobile ? 0.1 : 0.12,
        });
      }
    }
    return out;
  }, [mobile]);

  const titleLines = hint
    ? (hint.labelLines?.length ? hint.labelLines : [hint.name]).slice(0, 2)
    : [];

  // Desktop: globe in right panel. Mobile: middle band — match WhatsApp reference framing.
  const DESKTOP_LEFT_FRAC = 0.38;
  const mobileTopPx = Math.round(Math.max(size.height * 0.28, 200));
  const mobileBottomPx = Math.round(Math.max(size.height * 0.18, 120));
  const globeW = mobile
    ? size.width
    : Math.max(320, Math.round(size.width * (1 - DESKTOP_LEFT_FRAC)));
  const globeH = mobile
    ? Math.max(260, size.height - mobileTopPx - mobileBottomPx)
    : size.height;
  const desktopLeftPx = mobile ? 0 : Math.round(size.width - globeW);

  return (
    <div
      ref={wrapperRef}
      className="relative h-full w-full overflow-hidden bg-black isolate"
      style={{ touchAction: 'none' }}
    >
      <div
        className="globe-stage absolute z-0 overflow-hidden bg-black"
        style={
          mobile
            ? {
                top: mobileTopPx,
                bottom: mobileBottomPx,
                left: 0,
                right: 0,
                width: globeW,
                height: globeH,
              }
            : {
                top: 0,
                right: 0,
                bottom: 0,
                left: desktopLeftPx,
              }
        }
      >
        <Globe
          ref={globeRef}
          width={globeW}
          height={globeH}
          animateIn={false}
          backgroundColor="#000000"
          globeImageUrl="/textures/earth-blue-marble.jpg"
          bumpImageUrl="/textures/earth-topology.png"
          showAtmosphere
          atmosphereColor="#4da3ff"
          atmosphereAltitude={0.18}
          onGlobeReady={onReady}
          onZoom={onZoom}
          htmlElementsData={htmlData}
          htmlLat="lat"
          htmlLng="lng"
          htmlAltitude={0.018}
          htmlElement={makeLabelEl}
          arcsData={arcs}
          arcColor="color"
          arcStroke="stroke"
          arcDashLength={0.4}
          arcDashGap={2.2}
          arcDashAnimateTime={6500}
          arcAltitudeAutoScale={0.28}
        />
      </div>

      {/* Desktop: soft fade into globe — no hard vertical seam */}
      {!mobile && (
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-[40]"
          style={{
            width: `calc(${desktopLeftPx}px + 5rem)`,
            background:
              'linear-gradient(90deg, #000 0%, #000 58%, rgba(0,0,0,0.85) 78%, transparent 100%)',
          }}
          aria-hidden
        />
      )}

      {/* Mobile: soft text safe zones (no hard grey edge lines) */}
      {mobile && (
        <>
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-[40]"
            style={{
              height: mobileTopPx + 28,
              background:
                'linear-gradient(180deg, #000 0%, #000 72%, transparent 100%)',
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[40]"
            style={{
              height: mobileBottomPx + 28,
              background:
                'linear-gradient(0deg, #000 0%, #000 72%, transparent 100%)',
            }}
            aria-hidden
          />
        </>
      )}

      {/* Headings + zoom always on top of the globe/markers */}
      <div className="pointer-events-none absolute inset-0 z-50">
        <GlobeChrome />

        {/* Desktop: zoom on the right */}
        <div className="pointer-events-auto absolute top-1/2 -translate-y-1/2 right-3 sm:right-6 hidden md:flex flex-col gap-2">
          <button
            type="button"
            onClick={() => zoomBy(-ZOOM_STEP)}
            aria-label="Zoom in"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/70 active:bg-white/30 border border-white/20 text-white flex items-center justify-center shadow-lg"
          >
            <FiPlus size={20} />
          </button>
          <button
            type="button"
            onClick={() => zoomBy(ZOOM_STEP)}
            aria-label="Zoom out"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/70 active:bg-white/30 border border-white/20 text-white flex items-center justify-center shadow-lg"
          >
            <FiMinus size={20} />
          </button>
        </div>

        {/* Mobile: zoom above the bottom headings */}
        <div className="pointer-events-auto absolute left-1/2 -translate-x-1/2 bottom-[5rem] flex md:hidden flex-row items-center gap-4 z-40">
          <button
            type="button"
            onClick={() => zoomBy(ZOOM_STEP)}
            aria-label="Zoom out"
            className="w-11 h-11 rounded-full bg-black/70 active:bg-white/30 border border-white/20 text-white flex items-center justify-center shadow-lg"
          >
            <FiMinus size={20} />
          </button>
          <button
            type="button"
            onClick={() => zoomBy(-ZOOM_STEP)}
            aria-label="Zoom in"
            className="w-11 h-11 rounded-full bg-black/70 active:bg-white/30 border border-white/20 text-white flex items-center justify-center shadow-lg"
          >
            <FiPlus size={20} />
          </button>
        </div>

        {/* Mobile bottom — JoinTODA left + iUnity Download right */}
        <div
          className="md:hidden absolute inset-x-0 z-50 px-3"
          style={{
            bottom: 0,
            paddingBottom:
              'max(1rem, calc(env(safe-area-inset-bottom, 0px) + 0.75rem))',
            paddingTop: '0.5rem',
          }}
        >
          <div className="flex items-end justify-between gap-3">
            <img
              src="/images/chrome/mobile-jointoda.png"
              alt="#JoinTODA — The Truckers Manifesto"
              className="toda-title-img block w-[min(38vw,9rem)] h-auto"
              width={397}
              height={128}
              draggable={false}
            />
            <a
              href="https://jointoda.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto shrink-0 hover:opacity-80"
              aria-label="iUnity Download"
            >
              <img
                src="/images/chrome/mobile-iunity.png"
                alt="iUnity Download"
                className="toda-title-img block w-[min(30vw,7rem)] h-auto"
                width={349}
                height={178}
                draggable={false}
              />
            </a>
          </div>
        </div>
      </div>

      {hint && (
        <div
          className="absolute inset-0 z-[60] flex items-center justify-center px-5"
          onClick={clearHint}
          role="presentation"
        >
          <div className="absolute inset-0 bg-black/70" aria-hidden />
          <div
            key={hint.id}
            className="relative z-[61] w-full max-w-[22rem] rounded-2xl border border-white/15 bg-[#0E0E0E] px-5 py-5 shadow-[0_16px_48px_rgba(0,0,0,0.75)] text-center"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={hint.name}
          >
            <button
              type="button"
              onClick={clearHint}
              aria-label="Close"
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/10 text-white/80 flex items-center justify-center"
            >
              <FiX size={16} />
            </button>

            {hint.logoUrl && (
              <img
                src={hint.logoUrl}
                alt=""
                className="mx-auto mb-3 h-12 w-12 rounded-full object-cover border border-white/15 bg-black/40"
              />
            )}

            <div
              className="font-display font-bold text-[15px] sm:text-base leading-snug px-2 pr-6"
              style={{ color: LABEL_COLOR }}
              dir={hint.rtl ? 'rtl' : 'auto'}
            >
              {titleLines.map((line) => (
                <div key={`${hint.id}-${line}`} className="break-words">
                  {line}
                </div>
              ))}
            </div>

            <a
              href={chapterUrlForPin(hint.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 text-white text-sm font-semibold px-4 py-3.5 rounded-xl min-h-[48px]"
              style={{ backgroundColor: brandColor.title }}
            >
              Open chapter <FiArrowRight />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
