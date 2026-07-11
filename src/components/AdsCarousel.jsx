import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMail, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Each slide shows three banner slots side by side.
const slides = [
  [
    { type: 'ad' },
    { type: 'brand' },
    { type: 'ad' },
  ],
  [
    { type: 'ad' },
    { type: 'membership' },
    { type: 'ad' },
  ],
  [
    { type: 'ad' },
    { type: 'resources' },
    { type: 'ad' },
  ],
];

function Banner({ type }) {
  if (type === 'brand') {
    return (
      <div className="h-28 sm:h-32 rounded-xl border border-blue-500/30 bg-gradient-to-br from-[#0c1a36] via-[#0a1124] to-[#050a18] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.18),transparent_70%)] pointer-events-none" />
        <div className="font-display text-2xl sm:text-3xl font-extrabold text-white relative">
          <span className="text-sky-400">#</span>
          <span>JoinTODA</span>
        </div>
        <div className="text-[10px] sm:text-xs text-neutral-400 mt-1 tracking-widest relative">
          TRUCK OWNERS &amp; DRIVERS ASSOCIATION — WEST
        </div>
        <div className="w-16 h-0.5 bg-gradient-to-r from-sky-400 to-blue-500 mt-2 relative" />
      </div>
    );
  }
  if (type === 'membership') {
    return (
      <div className="h-28 sm:h-32 rounded-xl border border-blue-500/30 bg-gradient-to-br from-[#0c1a36] via-[#0a1124] to-[#050a18] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.18),transparent_70%)] pointer-events-none" />
        <div className="font-display text-xl sm:text-2xl font-extrabold text-white relative">
          BECOME A MEMBER
        </div>
        <div className="text-[10px] sm:text-xs text-neutral-400 mt-1 tracking-widest relative">
          FREE 30-DAY TRIAL · 50K+ DRIVERS
        </div>
        <div className="w-16 h-0.5 bg-gradient-to-r from-sky-400 to-blue-500 mt-2 relative" />
      </div>
    );
  }
  if (type === 'resources') {
    return (
      <div className="h-28 sm:h-32 rounded-xl border border-blue-500/30 bg-gradient-to-br from-[#0c1a36] via-[#0a1124] to-[#050a18] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.18),transparent_70%)] pointer-events-none" />
        <div className="font-display text-xl sm:text-2xl font-extrabold text-white relative">
          DRIVER RESOURCES
        </div>
        <div className="text-[10px] sm:text-xs text-neutral-400 mt-1 tracking-widest relative">
          GUIDES · TOOLS · COMPLIANCE
        </div>
        <div className="w-16 h-0.5 bg-gradient-to-r from-sky-400 to-blue-500 mt-2 relative" />
      </div>
    );
  }
  // ad placeholder
  return (
    <a
      href="mailto:info@toda-international.org?subject=Advertise%20on%20TODA"
      className="h-28 sm:h-32 rounded-xl border border-white/[0.08] bg-[#111111] flex flex-col items-center justify-center text-center px-4 group hover:border-sky-400/40 transition-colors"
    >
      <div className="font-display text-lg sm:text-xl font-bold text-neutral-300 tracking-wider group-hover:text-white transition-colors">
        TO ADVERTISE HERE
      </div>
      <div className="mt-2 inline-flex items-center gap-2 text-[10px] sm:text-xs text-sky-400 tracking-widest">
        <FiMail /> CONTACT US
      </div>
    </a>
  );
}

export default function AdsCarousel() {
  const [index, setIndex] = useState(0);
  const total = slides.length;

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % total), 5000);
    return () => clearInterval(t);
  }, [total]);

  const go = (dir) => setIndex((i) => (i + dir + total) % total);

  return (
    <section className="py-10 bg-[#0A0A0A] border-y border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
            >
              {slides[index].map((slot, i) => (
                <Banner key={i} type={slot.type} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Arrows */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous slide"
          className="hidden sm:flex absolute -left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-blue-500/70 border border-white/[0.08] hover:border-blue-400 text-white items-center justify-center transition-colors"
        >
          <FiChevronLeft />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next slide"
          className="hidden sm:flex absolute -right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-blue-500/70 border border-white/[0.08] hover:border-blue-400 text-white items-center justify-center transition-colors"
        >
          <FiChevronRight />
        </button>

        {/* Dots */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-6 bg-sky-400' : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
