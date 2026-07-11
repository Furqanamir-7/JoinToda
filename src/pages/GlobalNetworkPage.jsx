import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiUsers, FiMapPin, FiCalendar } from 'react-icons/fi';
import InteractiveGlobe from '../components/InteractiveGlobe';
import ErrorBoundary from '../components/ErrorBoundary';
import GlobalNetwork from '../components/GlobalNetwork';
import { globePins } from '../data/networkData';
import { chapters } from '../data/chaptersData';

export default function GlobalNetworkPage() {
  const totalChapters = countAll(chapters);
  const totalMembers = chapters.reduce((sum, p) => sum + memberInt(p.members), 0);

  return (
    <>
      <section className="pt-24 sm:pt-28 pb-12 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="glass rounded-3xl p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 px-2">
              <span className="text-[10px] font-mono tracking-[0.25em] text-sky-400">
                ◉ LIVE NETWORK MAP
              </span>
              <span className="text-[10px] font-mono text-neutral-500">
                {globePins.length} HUBS · DRAG TO ORBIT
              </span>
            </div>
            <ErrorBoundary
              fallback={
                <div className="w-full rounded-2xl bg-black border border-white/10 flex items-center justify-center h-[360px] sm:h-[520px] lg:h-[680px]">
                  <div className="text-center text-neutral-400 text-sm">
                    Globe failed to initialise — please refresh.
                  </div>
                </div>
              }
            >
              <div className="h-[360px] sm:h-[520px] lg:h-[680px]">
                <InteractiveGlobe />
              </div>
            </ErrorBoundary>
          </div>
        </div>
      </section>

      {/* Network at a glance */}
      <section className="py-10 bg-[#0A0A0A] border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatTile value={chapters.length} label="Federations" />
          <StatTile value={totalChapters} label="Total Chapters" />
          <StatTile value={`${totalMembers.toLocaleString()}+`} label="Members" />
          <StatTile value={countContinents(chapters)} label="Continents" />
        </div>
      </section>

      {/* Member chapters — each parent is its own section */}
      <div className="bg-[#0A0A0A]">
        {chapters.map((parent, idx) => (
          <ParentSection key={parent.slug} parent={parent} index={idx} />
        ))}
      </div>

      <GlobalNetwork />
    </>
  );
}

function ParentSection({ parent, index }) {
  const hasChildren = parent.children && parent.children.length > 0;

  return (
    <section
      id={parent.slug}
      className="relative py-14 border-t border-white/[0.04]"
      style={{
        background:
          index % 2 === 0
            ? 'linear-gradient(180deg, #0A0A0A 0%, #0d0d0d 100%)'
            : '#0A0A0A',
      }}
    >
      {/* Soft blue glow */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[140px] opacity-[0.12] pointer-events-none"
        style={{ background: '#3B82F6' }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header band */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-[#111111] to-[#0E0E0E] border border-white/[0.06] rounded-2xl p-6 sm:p-8 mb-6"
        >
          <div className="flex items-start gap-4 flex-wrap">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-3xl sm:text-4xl shrink-0">
              <span aria-hidden>{parent.flag}</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-[10px] font-mono tracking-[0.2em] text-sky-300">
                  {parent.code}
                </span>
                <span className="text-[10px] font-mono text-neutral-600">·</span>
                <span className="text-[10px] font-mono text-neutral-400">{parent.region}</span>
                {parent.founded && (
                  <>
                    <span className="text-[10px] font-mono text-neutral-600">·</span>
                    <span className="text-[10px] font-mono text-neutral-400">EST. {parent.founded}</span>
                  </>
                )}
              </div>
              <Link
                to={`/global-network/${parent.slug}`}
                className="block mt-2 group"
              >
                <h2
                  dir="auto"
                  className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white group-hover:text-sky-300 transition-colors leading-tight"
                >
                  {parent.name}
                </h2>
              </Link>
            </div>
            <Link
              to={`/global-network/${parent.slug}`}
              className="hidden sm:inline-flex items-center gap-1.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 hover:border-blue-500/50 text-sky-300 px-4 py-2 rounded-xl text-sm font-medium transition-all shrink-0"
            >
              View chapter <FiArrowRight />
            </Link>
          </div>

          <p className="text-sm sm:text-base text-neutral-300 mt-5 leading-relaxed max-w-4xl">
            {parent.summary}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-6">
            <MiniStat icon={<FiUsers />} label="Members" value={parent.members} />
            <MiniStat icon={<FiMapPin />} label="HQ" value={parent.headquarters} />
            <MiniStat
              icon={<FiCalendar />}
              label="Founded"
              value={parent.founded || '—'}
            />
            <MiniStat
              icon={<span className="text-xs">⌥</span>}
              label="Sub-chapters"
              value={hasChildren ? `${parent.children.length}` : 'Standalone'}
            />
          </div>

          <Link
            to={`/global-network/${parent.slug}`}
            className="sm:hidden mt-5 inline-flex w-full items-center justify-center gap-2 bg-blue-500/15 border border-blue-500/30 text-sky-300 px-4 py-3 rounded-xl text-sm font-medium"
          >
            View chapter <FiArrowRight />
          </Link>
        </motion.div>

        {/* Sub-chapter grid (fills the space — no empty area) */}
        {hasChildren ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {parent.children.map((child, ci) => (
              <SubChapterCard key={child.slug} chapter={child} delay={ci * 0.04} />
            ))}
          </div>
        ) : (
          <div className="bg-[#111111] border border-white/[0.06] border-dashed rounded-2xl p-6 text-center">
            <div className="text-[10px] font-mono tracking-[0.25em] text-neutral-500 mb-2">
              ◉ STANDALONE CHAPTER
            </div>
            <p className="text-sm text-neutral-400">
              {parent.shortName} operates directly without regional sub-chapters. Reach the team at{' '}
              <a
                href={`mailto:${parent.contact}`}
                className="text-sky-300 hover:text-sky-200 font-mono"
              >
                {parent.contact}
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function SubChapterCard({ chapter, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay }}
    >
      <Link
        to={`/global-network/${chapter.slug}`}
        className="group block h-full bg-[#111111] hover:bg-[#141414] border border-white/[0.06] hover:border-blue-500/40 rounded-xl p-4 transition-all"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xl shrink-0">
            <span aria-hidden>{chapter.flag}</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[9px] font-mono tracking-[0.2em] text-sky-400">
              {chapter.code}
            </div>
            <div
              className="text-sm font-semibold text-white truncate group-hover:text-sky-300 transition-colors"
              dir="auto"
            >
              {chapter.shortName}
            </div>
          </div>
          <FiArrowRight className="text-neutral-600 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all mt-2 shrink-0" />
        </div>
        <p
          className="text-[11px] text-neutral-400 mt-3 leading-snug line-clamp-2"
          dir="auto"
        >
          {chapter.name}
        </p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.04]">
          <span className="text-[10px] text-sky-300 font-mono">
            {chapter.members}
          </span>
          <span className="text-[10px] text-neutral-500 truncate ml-2">
            {chapter.headquarters}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function MiniStat({ icon, label, value }) {
  return (
    <div className="bg-black/40 border border-white/[0.04] rounded-lg px-3 py-2.5 min-w-0">
      <div className="flex items-center gap-1.5 text-sky-400/80 text-[10px] font-mono tracking-[0.15em] uppercase">
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-white text-xs sm:text-sm font-semibold mt-1 truncate" dir="auto">
        {value}
      </div>
    </div>
  );
}

function StatTile({ value, label }) {
  return (
    <div className="bg-gradient-to-br from-[#111111] to-[#0E0E0E] border border-white/[0.06] rounded-xl p-5 text-center">
      <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">
        {value}
      </div>
      <div className="text-[10px] font-mono tracking-[0.25em] text-sky-400 mt-1">
        {label.toUpperCase()}
      </div>
    </div>
  );
}

function countAll(parents) {
  return parents.reduce((sum, p) => sum + 1 + (p.children?.length || 0), 0);
}

function memberInt(str) {
  const m = String(str).match(/[\d,]+/);
  if (!m) return 0;
  return parseInt(m[0].replace(/,/g, ''), 10) || 0;
}

function countContinents(parents) {
  const map = {
    'North America': true,
    Europe: true,
    'Middle East': true,
    'Asia Pacific': true,
    Africa: true,
    Australasia: true,
  };
  const found = new Set();
  for (const p of parents) {
    if (map[p.region]) found.add(p.region);
  }
  return found.size;
}
