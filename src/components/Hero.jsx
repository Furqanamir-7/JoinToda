import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlay, FiArrowRight } from 'react-icons/fi';
import InteractiveGlobe from './InteractiveGlobe';
import ErrorBoundary from './ErrorBoundary';
import { globePins } from '../data/networkData';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-2 sm:pt-4 pb-12"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&q=85')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/90 to-[#0A0A0A]/55 z-0" />
      <div className="absolute inset-0 grid-bg opacity-25 z-0" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none z-0" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-14 items-center">
          {/* LEFT — concise */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-5 w-full min-w-0 lg:max-w-xl"
          >
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-sky-400 text-[10px] sm:text-xs font-mono tracking-wider">
                🚛 GLOBAL MEMBER NETWORK
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="font-display font-extrabold text-white leading-[1.05] tracking-tight text-[clamp(1.875rem,6.5vw,3.25rem)]"
            >
              Truck Owners &amp; Drivers <span className="text-gradient">Association</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-sm sm:text-base text-neutral-400 max-w-md leading-relaxed"
            >
              A global network for truck owners, drivers, and transportation professionals —
              representing you everywhere the road takes you.
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 mt-1 w-full">
              <Link
                to="/become-member"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:shadow-[0_0_30px_rgba(59,130,246,0.55)] hover:scale-[1.03] transition-all duration-200 w-full sm:w-auto"
              >
                Become a Member <FiArrowRight />
              </Link>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 glass border border-white/10 rounded-xl px-6 py-3 font-medium text-sm text-white hover:border-sky-400/40 transition-all w-full sm:w-auto"
              >
                <FiPlay /> Learn More
              </button>
            </motion.div>

            <motion.div
              variants={item}
              className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-xs sm:text-sm text-neutral-500 items-center"
            >
              <span>
                <span className="text-white font-semibold">50K+</span> Members
              </span>
              <span className="text-neutral-700">|</span>
              <span>
                <span className="text-white font-semibold">25+</span> Countries
              </span>
              <span className="text-neutral-700">|</span>
              <span>
                <span className="text-white font-semibold">100+</span> Resources
              </span>
            </motion.div>
          </motion.div>

          {/* RIGHT — Globe (responsive height) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative w-full min-w-0"
          >
            <div className="glass rounded-2xl p-2 sm:p-4 bg-black/40">
              <div className="flex items-center justify-between mb-2 px-2 gap-2">
                <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] sm:tracking-[0.25em] text-sky-400 truncate">
                  ◉ LIVE GLOBAL NETWORK
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono text-neutral-500 truncate">
                  {globePins.length} HUBS · ROTATING
                </span>
              </div>
              <ErrorBoundary
                fallback={
                  <div className="w-full rounded-2xl bg-black border border-white/10 flex items-center justify-center h-[360px] sm:h-[480px] lg:h-[620px]">
                    <div className="text-center px-4">
                      <div className="text-[10px] font-mono tracking-[0.25em] text-sky-400 mb-2">
                        ◉ LIVE GLOBAL NETWORK
                      </div>
                      <div className="text-neutral-400 text-sm">Globe is loading — drag to orbit when ready.</div>
                    </div>
                  </div>
                }
              >
                <div className="h-[360px] sm:h-[480px] lg:h-[620px]">
                  <InteractiveGlobe />
                </div>
              </ErrorBoundary>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
