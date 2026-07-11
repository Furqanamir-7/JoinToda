import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiMail, FiMapPin, FiUsers, FiCalendar } from 'react-icons/fi';
import { chapters, findChapter, findParent } from '../data/chaptersData';

export default function ChapterPage() {
  const { slug } = useParams();
  const chapter = findChapter(slug);

  if (!chapter) {
    return <Navigate to="/global-network" replace />;
  }

  const parent = findParent(slug);
  const siblings = parent
    ? parent.children.filter((c) => c.slug !== slug)
    : [];
  const otherParents = !parent
    ? chapters.filter((c) => c.slug !== slug)
    : [];

  return (
    <>
      <section className="relative overflow-hidden pt-10 pb-12 bg-[#0A0A0A]">
        <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
        <div
          className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full blur-[140px] opacity-30"
          style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 65%)' }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <nav className="mb-6 text-xs font-mono tracking-[0.2em] text-neutral-500">
            <Link to="/" className="hover:text-white">HOME</Link>
            <span className="mx-2 text-neutral-700">/</span>
            <Link to="/global-network" className="hover:text-white">GLOBAL NETWORK</Link>
            {parent && (
              <>
                <span className="mx-2 text-neutral-700">/</span>
                <Link to={`/global-network/${parent.slug}`} className="hover:text-white">
                  {parent.code}
                </Link>
              </>
            )}
            <span className="mx-2 text-neutral-700">/</span>
            <span className="text-sky-400">{chapter.code}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-5xl sm:text-6xl" aria-hidden>{chapter.flag}</span>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono tracking-[0.25em] text-sky-400">
                    {chapter.code}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-600">·</span>
                  <span className="text-[10px] font-mono text-neutral-500">{chapter.region}</span>
                </div>
                <h1
                  dir="auto"
                  className="font-display font-extrabold text-white leading-tight tracking-tight text-[clamp(1.75rem,5vw,3rem)] mt-2"
                >
                  {chapter.name}
                </h1>
              </div>
            </div>

            <p dir="auto" className="text-base sm:text-lg text-neutral-300 leading-relaxed mt-6 max-w-3xl">
              {chapter.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
              <StatCard icon={<FiUsers />} label="Members" value={chapter.members} />
              <StatCard icon={<FiMapPin />} label="Headquarters" value={chapter.headquarters} />
              {chapter.founded && (
                <StatCard icon={<FiCalendar />} label="Founded" value={chapter.founded} />
              )}
              <StatCard icon={<FiMail />} label="Contact" value={chapter.contact} mono />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                to="/become-member"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:shadow-[0_0_30px_rgba(59,130,246,0.55)] hover:scale-[1.02] transition-all"
              >
                Become a Member <FiArrowRight />
              </Link>
              <Link
                to="/global-network"
                className="inline-flex items-center justify-center gap-2 glass border border-white/10 rounded-xl px-6 py-3 font-medium text-sm text-white hover:border-sky-400/40 transition-all"
              >
                <FiArrowLeft /> All Chapters
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {chapter.children && chapter.children.length > 0 && (
        <section className="py-14 bg-[#0A0A0A] border-t border-white/[0.04]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-8">
              <span className="text-[10px] font-mono tracking-[0.3em] text-sky-400">
                ◉ SUB-CHAPTERS
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-2">
                {chapter.children.length} associations under {chapter.shortName}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {chapter.children.map((c) => (
                <ChapterCard key={c.slug} chapter={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      {siblings.length > 0 && (
        <section className="py-14 bg-[#0A0A0A] border-t border-white/[0.04]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-8">
              <span className="text-[10px] font-mono tracking-[0.3em] text-sky-400">
                ◉ SISTER CHAPTERS
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-2">
                More chapters under {parent.shortName}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siblings.map((c) => (
                <ChapterCard key={c.slug} chapter={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      {otherParents.length > 0 && (
        <section className="py-14 bg-[#0A0A0A] border-t border-white/[0.04]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-8">
              <span className="text-[10px] font-mono tracking-[0.3em] text-sky-400">
                ◉ OTHER FEDERATIONS
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-2">
                Explore other regional federations
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherParents.map((c) => (
                <ChapterCard key={c.slug} chapter={c} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function StatCard({ icon, label, value, mono }) {
  return (
    <div className="bg-[#111111] border border-white/[0.06] rounded-xl p-4">
      <div className="flex items-center gap-2 text-sky-400 text-xs">
        {icon}
        <span className="font-mono tracking-[0.2em] uppercase">{label}</span>
      </div>
      <div
        className={`text-white mt-2 ${mono ? 'font-mono text-xs sm:text-sm break-all' : 'text-sm sm:text-base font-semibold'}`}
        dir="auto"
      >
        {value}
      </div>
    </div>
  );
}

function ChapterCard({ chapter }) {
  return (
    <Link
      to={`/global-network/${chapter.slug}`}
      className="group bg-[#111111] border border-white/[0.06] hover:border-blue-500/40 rounded-2xl p-5 transition-colors flex flex-col"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl shrink-0" aria-hidden>{chapter.flag}</span>
        <div className="min-w-0">
          <div className="text-[10px] font-mono tracking-[0.25em] text-sky-400">
            {chapter.code}
          </div>
          <div className="text-sm font-bold text-white truncate group-hover:text-sky-300 transition-colors" dir="auto">
            {chapter.shortName}
          </div>
        </div>
      </div>
      <p className="text-[11px] text-neutral-400 mt-3 leading-snug" dir="auto">
        {chapter.name}
      </p>
      <div className="flex items-center justify-between mt-auto pt-3 text-xs">
        <span className="text-sky-300 font-semibold">{chapter.members}</span>
        <span className="text-sky-400 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          View <FiArrowRight />
        </span>
      </div>
    </Link>
  );
}
