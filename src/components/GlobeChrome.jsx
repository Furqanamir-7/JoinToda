import { Link } from 'react-router-dom';
import { brandColor } from '../data/brandTheme';

const AVENIR = "'Avenir Next', Avenir, 'Helvetica Neue', Arial, sans-serif";

/** Resources / Manifesto — same Avenir + primary copper as mobile */
const META = {
  color: brandColor.resources,
  fontFamily: AVENIR,
  fontWeight: 500,
  letterSpacing: '0.01em',
};

/**
 * Brand chrome — title uses baked glow PNG from client screenshot.
 * Resources + Manifesto share muted gold Avenir styling.
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
            className="pointer-events-auto shrink-0 text-[14px] leading-none hover:opacity-80"
            style={META}
          >
            Resources
          </a>
        </div>
      </header>

      {/* —— Desktop bottom —— */}
      <footer className="hidden md:flex pointer-events-none absolute inset-x-0 bottom-0 z-30 pb-6 px-8 items-end justify-between gap-6">
        <div>
          <div
            className="text-lg tracking-tight"
            style={{
              color: brandColor.joinToda,
              fontFamily: AVENIR,
              fontWeight: 800,
            }}
          >
            #JoinTODA
          </div>
          <div
            className="mt-0.5 text-2xl leading-tight tracking-tight"
            style={{
              color: brandColor.declaration,
              fontFamily: AVENIR,
              fontWeight: 800,
            }}
          >
            Declaration of Unity
          </div>
          <div
            className="mt-0.5 text-[14px] leading-none"
            style={META}
          >
            The Truckers Manifesto
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Link
            to="/cookies"
            className="pointer-events-auto text-xs text-neutral-400 hover:text-neutral-200 underline-offset-2 hover:underline"
            style={{ fontFamily: AVENIR }}
          >
            Cookie settings
          </Link>
        </div>
      </footer>
    </>
  );
}
