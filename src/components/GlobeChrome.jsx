import { Link } from 'react-router-dom';
import { brandColor } from '../data/brandTheme';

const AVENIR = "'Avenir Next', Avenir, 'Helvetica Neue', Arial, sans-serif";
const ANTON = "Anton, Impact, 'Arial Narrow', sans-serif";
const OSWALD = "Oswald, 'Arial Narrow', sans-serif";

/**
 * Brand chrome — matched to client reference screenshots (2026-07-21).
 * Title: Anton + blue glow. Slogan / Resources: Oswald. Bottom names: Avenir.
 */
export default function GlobeChrome() {
  return (
    <>
      {/* —— Mobile top —— */}
      <header className="md:hidden pointer-events-none absolute inset-x-0 top-0 z-30 pt-[max(0.35rem,env(safe-area-inset-top,0px))] px-3 pb-4">
        <div className="flex justify-end pr-0.5">
          <a
            href="https://jointoda.com/resources/"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto text-[15px] leading-none active:opacity-80"
            style={{
              color: brandColor.resources,
              fontFamily: OSWALD,
              fontWeight: 500,
              letterSpacing: '0.02em',
            }}
          >
            Resources
          </a>
        </div>
        <div className="mt-1.5 text-center px-1">
          <h1
            className="title-glow uppercase text-[26px] sm:text-[28px] leading-[1.05] tracking-[0.02em]"
            style={{
              color: brandColor.title,
              fontFamily: ANTON,
              fontWeight: 400,
            }}
          >
            Truck Owners and Driver
            <br />
            Association
          </h1>
          <p
            className="mt-2 text-[13px] sm:text-[14px] uppercase tracking-[0.08em]"
            style={{
              color: brandColor.slogan,
              fontFamily: OSWALD,
              fontWeight: 500,
            }}
          >
            Truckers of the World, Unite!
          </p>
        </div>
      </header>

      {/* —— Desktop top —— */}
      <header className="hidden md:block pointer-events-none absolute inset-x-0 top-0 z-30 pt-6 px-8">
        <div className="flex items-start justify-between gap-6">
          <div className="max-w-[min(40rem,42vw)] text-center">
            <h1
              className="title-glow uppercase leading-[1.05] tracking-[0.02em] text-[clamp(2.4rem,3.6vw,3.6rem)]"
              style={{
                color: brandColor.title,
                fontFamily: ANTON,
                fontWeight: 400,
              }}
            >
              Truck Owners and Driver
              <br />
              Association
            </h1>
            <p
              className="mt-2.5 text-[clamp(1.05rem,1.55vw,1.4rem)] uppercase tracking-[0.08em]"
              style={{
                color: brandColor.slogan,
                fontFamily: OSWALD,
                fontWeight: 500,
              }}
            >
              Truckers of the World, Unite!
            </p>
          </div>
          <a
            href="https://jointoda.com/resources/"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto shrink-0 text-lg leading-none hover:opacity-80"
            style={{
              color: brandColor.resources,
              fontFamily: OSWALD,
              fontWeight: 500,
              letterSpacing: '0.02em',
            }}
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
            className="mt-0.5 text-sm"
            style={{
              color: brandColor.manifesto,
              fontFamily: AVENIR,
              fontWeight: 500,
            }}
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
