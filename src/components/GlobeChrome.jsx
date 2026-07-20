import { Link } from 'react-router-dom';
import { brandColor } from '../data/brandTheme';

const AVENIR = "'Avenir Next', Avenir, 'Helvetica Neue', Arial, sans-serif";
const VALLEY = 'Valley, cursive, serif';

/**
 * Brand chrome — colors from client reference screenshot.
 * Fonts: Avenir Pro for names/titles, Valley for slogan / Resources.
 */
export default function GlobeChrome() {
  return (
    <>
      {/* —— Mobile top —— */}
      <header className="md:hidden pointer-events-none absolute inset-x-0 top-0 z-30 pt-[max(0.5rem,env(safe-area-inset-top,0px))] px-3 pb-5">
        <div className="flex justify-end">
          <a
            href="https://jointoda.com/resources/"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto text-[13px] font-semibold active:opacity-80"
            style={{ color: brandColor.resources, fontFamily: VALLEY }}
          >
            Resources
          </a>
        </div>
        <div className="mt-2 text-center px-2">
          <h1
            className="uppercase text-[25px] sm:text-[27px] leading-[1.12] tracking-[0.01em]"
            style={{
              color: brandColor.title,
              fontFamily: AVENIR,
              fontWeight: 800,
            }}
          >
            Truck Owners and
            <br />
            Driver Association
          </h1>
          <p
            className="mt-2.5 text-[14px] sm:text-[15px] uppercase tracking-[0.06em]"
            style={{
              color: brandColor.slogan,
              fontFamily: VALLEY,
              fontWeight: 400,
            }}
          >
            Truckers of the World, Unite!
          </p>
        </div>
      </header>

      {/* —— Desktop top —— */}
      <header className="hidden md:block pointer-events-none absolute inset-x-0 top-0 z-30 pt-6 px-8">
        <div className="flex items-start justify-between gap-6">
          <div className="max-w-[min(36rem,38vw)] text-center">
            <h1
              className="uppercase leading-[1.08] tracking-tight text-[clamp(2.2rem,3.5vw,3.4rem)]"
              style={{
                color: brandColor.title,
                fontFamily: AVENIR,
                fontWeight: 800,
              }}
            >
              Truck Owners and
              <br />
              Driver
              <br />
              Association
            </h1>
            <p
              className="mt-2.5 text-[clamp(1.15rem,1.7vw,1.55rem)] uppercase tracking-[0.05em]"
              style={{
                color: brandColor.slogan,
                fontFamily: VALLEY,
                fontWeight: 400,
              }}
            >
              Truckers of the World, Unite!
            </p>
          </div>
          <a
            href="https://jointoda.com/resources/"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto shrink-0 text-lg font-semibold hover:opacity-80"
            style={{ color: brandColor.resources, fontFamily: VALLEY }}
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
              fontWeight: 600,
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
