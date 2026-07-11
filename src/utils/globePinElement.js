/**
 * Build a map-pushpin DOM marker (red head + tapered stem) with a
 * chapter label offset so nearby pins don't stack their names.
 */
export function createGlobePinElement(pin, handlers = {}) {
  const { onClick, onEnter, onLeave } = handlers;
  const { x = 0, y = -52 } = pin.labelOffset || {};

  const el = document.createElement('div');
  el.className = 'globe-pin';
  el.setAttribute('role', 'button');
  el.setAttribute('aria-label', `${pin.name} chapter`);
  el.title = pin.name;

  el.innerHTML = `
    <div class="globe-pin__label" style="transform: translate(calc(-50% + ${x}px), ${y}px)">
      ${pin.name}
    </div>
    <div class="globe-pin__marker" aria-hidden="true">
      <div class="globe-pin__head"></div>
      <div class="globe-pin__stem"></div>
      <div class="globe-pin__shadow"></div>
    </div>
  `;

  el.style.pointerEvents = 'auto';
  el.style.cursor = 'pointer';

  if (onClick) {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      onClick(pin);
    });
  }
  if (onEnter) el.addEventListener('mouseenter', () => onEnter(pin));
  if (onLeave) el.addEventListener('mouseleave', () => onLeave(null));

  return el;
}
