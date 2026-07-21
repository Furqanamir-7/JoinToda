import { Link } from 'react-router-dom';

/**
 * Brand chrome — baked PNGs for exact type/glow.
 * Mobile: meow.png (top) + meow-2.png (bottom, in InteractiveGlobe).
 * Desktop: toda-title-desktop.png (title), web.png (Resources), web-2.png (bottom left).
 */
export default function GlobeChrome() {
  return (
    <>
      {/* —— Mobile top —— */}
      <header className="md:hidden pointer-events-none absolute inset-x-0 top-0 z-30 pt-[max(0.25rem,env(safe-area-inset-top,0px))] px-2 pb-2">
        <div className="relative mx-auto w-[min(96vw,22.5rem)]">
          <h1 className="m-0 overflow-hidden">
            <img
              src="/images/meow.png"
              alt="Truck Owners and Driver Association — Truckers of the World, Unite!"
              className="toda-title-img mx-auto block w-full h-auto"
              width={346}
              height={178}
              draggable={false}
            />
          </h1>
          {/* Hit target over baked-in Resources (top-right of meow.png) */}
          <a
            href="https://jointoda.com/resources/"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto absolute top-0 right-0 w-[38%] h-[22%]"
            aria-label="Resources"
          />
        </div>
      </header>

      {/* —— Desktop top —— */}
      <header className="hidden md:block pointer-events-none absolute inset-x-0 top-0 z-30 pt-6 pl-10 pr-8">
        <div className="flex items-start justify-between gap-6">
          <div className="max-w-[min(40rem,42vw)] text-center pl-2">
            <h1 className="m-0 overflow-hidden">
              <img
                src="/images/toda-title-desktop.png"
                alt="Truck Owners and Driver Association — Truckers of the World, Unite!"
                className="toda-title-img mx-auto block w-full max-w-[34rem] h-auto"
                width={781}
                height={258}
                draggable={false}
              />
            </h1>
          </div>
          <a
            href="https://jointoda.com/resources/"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto shrink-0 hover:opacity-80"
            aria-label="Resources"
          >
            <img
              src="/images/web.png"
              alt="Resources"
              className="toda-title-img block w-[7.5rem] h-auto"
              width={148}
              height={61}
              draggable={false}
            />
          </a>
        </div>
      </header>

      {/* —— Desktop bottom —— */}
      <footer className="hidden md:flex pointer-events-none absolute inset-x-0 bottom-0 z-30 pb-6 px-8 items-end justify-between gap-6">
        <div className="overflow-hidden">
          <img
            src="/images/web-2.png"
            alt="#JoinTODA — Declaration of Unity — The Truckers Manifesto"
            className="toda-title-img block w-[min(26rem,38vw)] h-auto"
            width={405}
            height={121}
            draggable={false}
          />
        </div>
        <div className="flex flex-col items-end gap-2">
          <Link
            to="/cookies"
            className="pointer-events-auto text-xs text-neutral-400 hover:text-neutral-200 underline-offset-2 hover:underline"
            style={{
              fontFamily:
                "'Avenir Next', Avenir, 'Helvetica Neue', Arial, sans-serif",
            }}
          >
            Cookie settings
          </Link>
        </div>
      </footer>
    </>
  );
}
