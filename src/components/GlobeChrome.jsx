import { Link } from 'react-router-dom';

/**
 * Brand chrome — official PNG assets from Desktop/Mobile folders.
 * Black plates knock out via .toda-title-img (mix-blend-mode: screen)
 * so the live globe background shows through.
 */
export default function GlobeChrome() {
  return (
    <>
      {/* —— Mobile top —— */}
      <header className="md:hidden pointer-events-none absolute inset-x-0 top-0 z-30 pt-[max(0.2rem,env(safe-area-inset-top,0px))] px-3 pb-2">
        <div className="flex justify-end">
          <a
            href="https://jointoda.com/resources/"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto hover:opacity-80"
            aria-label="Resources"
          >
            <img
              src="/images/chrome/mobile-resources.png"
              alt="Resources"
              className="toda-title-img block w-[5.75rem] h-auto"
              width={233}
              height={101}
              draggable={false}
            />
          </a>
        </div>
        <div className="mt-0.5 text-center">
          <h1 className="m-0">
            <img
              src="/images/chrome/mobile-toda.png"
              alt="Truck Owners and Driver Association"
              className="toda-title-img mx-auto block w-[min(94vw,23rem)] h-auto"
              width={1016}
              height={301}
              draggable={false}
            />
          </h1>
          <img
            src="/images/chrome/mobile-slogan.png"
            alt="Truckers of the World, Unite!"
            className="toda-title-img mx-auto block -mt-1 w-[min(88vw,20rem)] h-auto"
            width={752}
            height={157}
            draggable={false}
          />
        </div>
      </header>

      {/* —— Desktop top —— */}
      <header className="hidden md:block pointer-events-none absolute inset-x-0 top-0 z-30 pt-5 pl-10 pr-8">
        <div className="flex items-start justify-between gap-6">
          <div className="max-w-[min(42rem,44vw)] text-center pl-1">
            <h1 className="m-0">
              <img
                src="/images/chrome/desktop-toda.png"
                alt="Truck Owners and Driver Association"
                className="toda-title-img mx-auto block w-full max-w-[34rem] h-auto"
                width={925}
                height={310}
                draggable={false}
              />
            </h1>
            <img
              src="/images/chrome/desktop-slogan.png"
              alt="Truckers of the World, Unite!"
              className="toda-title-img mx-auto block -mt-10 w-[min(100%,30rem)] h-auto"
              width={720}
              height={175}
              draggable={false}
            />
          </div>
          <a
            href="https://jointoda.com/resources/"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto shrink-0 hover:opacity-80"
            aria-label="Resources"
          >
            <img
              src="/images/chrome/desktop-resources.png"
              alt="Resources"
              className="toda-title-img block w-[7.25rem] h-auto"
              width={255}
              height={128}
              draggable={false}
            />
          </a>
        </div>
      </header>

      {/* —— Desktop bottom —— */}
      <footer className="hidden md:flex pointer-events-none absolute inset-x-0 bottom-0 z-30 pb-6 px-8 items-end justify-between gap-6">
        <div>
          <img
            src="/images/chrome/desktop-jointoda.png"
            alt="#JoinTODA — Declaration of Unity — The Truckers Manifesto"
            className="toda-title-img block w-[min(20rem,30vw)] h-auto"
            width={539}
            height={172}
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
