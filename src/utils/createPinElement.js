/**
 * Build an HTML map-pin marker for react-globe.gl.
 * Spain uses a pre-composited pin+logo asset; other countries use the plain pin.
 */
export function createPinElement(pin) {
  const wrap = document.createElement('div');
  wrap.className = 'globe-map-pin';
  wrap.style.cssText = [
    'position:relative',
    'width:42px',
    'height:54px',
    'transform:translate(-50%,-100%)',
    'pointer-events:auto',
    'cursor:pointer',
    'filter:drop-shadow(0 3px 6px rgba(0,0,0,0.55))',
    'transition:transform 0.15s ease',
  ].join(';');

  const pinImg = document.createElement('img');
  pinImg.src = pin.pinImageUrl || '/pins/location-pin-red.png';
  pinImg.alt = pin.name || '';
  pinImg.draggable = false;
  pinImg.style.cssText = [
    'position:absolute',
    'inset:0',
    'width:100%',
    'height:100%',
    'object-fit:contain',
    'pointer-events:none',
    'user-select:none',
  ].join(';');

  wrap.appendChild(pinImg);

  wrap.addEventListener('mouseenter', () => {
    wrap.style.transform = 'translate(-50%,-100%) scale(1.12)';
  });
  wrap.addEventListener('mouseleave', () => {
    wrap.style.transform = 'translate(-50%,-100%) scale(1)';
  });

  return wrap;
}
