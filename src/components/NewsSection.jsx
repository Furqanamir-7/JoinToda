import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { newsData } from '../data/newsData';

const featured = newsData.find((n) => n.featured);
const others = newsData.filter((n) => !n.featured);

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};
const row = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function NewsSection() {
  return (
    <section id="resources" className="py-20 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
          <div>
            <p className="text-xs font-mono tracking-[0.25em] text-sky-400 uppercase mb-3">
              NEWSROOM
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Latest Industry Updates
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-sky-400 mt-4 rounded-full" />
          </div>
          <Link
            to="/blog"
            className="hidden sm:inline-flex items-center gap-1 text-sky-400 text-sm hover:gap-2 transition-all"
          >
            View All Articles <FiArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* FEATURED — left column, boxed panel */}
          {featured && (
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-1 group relative rounded-2xl border-2 border-white/[0.08] hover:border-sky-400/60 bg-gradient-to-b from-[#141414] to-[#0E0E0E] shadow-[0_4px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_40px_rgba(59,130,246,0.25)] transition-all duration-300 overflow-hidden flex flex-col"
            >
              <Link to={`/blog/${featured.slug}`} className="flex flex-col flex-1">
                <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-white/[0.06]">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] font-mono text-sky-200 bg-black/70 border border-sky-400/50 px-2.5 py-1 rounded-full backdrop-blur-sm">
                    {featured.category}
                  </span>
                  <span className="absolute bottom-3 left-3 text-[10px] font-mono tracking-widest text-white/90">
                    FEATURED · {featured.date.toUpperCase()}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-snug group-hover:text-sky-100 transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-sm text-neutral-400 mt-3 leading-relaxed line-clamp-3">
                    {featured.excerpt}
                  </p>
                  <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                    <span className="text-xs text-neutral-500">{featured.readTime}</span>
                    <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-[0_0_18px_rgba(59,130,246,0.35)] group-hover:shadow-[0_0_28px_rgba(59,130,246,0.55)] transition-all">
                      Read More <FiArrowRight />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          )}

          {/* GRID — right side, each is a boxed panel */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {others.map((n) => (
              <motion.article
                key={n.id}
                variants={row}
                className="group relative rounded-xl border-2 border-white/[0.07] hover:border-sky-400/55 bg-gradient-to-br from-[#131313] to-[#0D0D0D] shadow-[0_2px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_28px_rgba(59,130,246,0.2)] transition-all duration-300 overflow-hidden"
              >
                <Link to={`/blog/${n.slug}`} className="flex gap-3 p-3 w-full h-full min-w-0">
                  <div className="w-24 sm:w-28 h-28 sm:h-32 shrink-0 overflow-hidden rounded-lg bg-[#1a1a1a] border border-white/[0.06]">
                    <img
                      src={n.image}
                      alt={n.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-1 min-w-0 py-1">
                    <div className="min-w-0">
                      <span className="text-[9px] font-mono tracking-widest text-sky-400 uppercase">
                        {n.category}
                      </span>
                      <h3 className="font-display font-semibold text-sm leading-snug text-white mt-1 group-hover:text-sky-100 transition-colors line-clamp-3">
                        {n.title}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/[0.05] gap-2">
                      <time className="text-[11px] text-neutral-500 truncate">{n.date}</time>
                      <span className="text-sky-400 text-[11px] inline-flex items-center gap-1 group-hover:gap-2 transition-all shrink-0">
                        Read <FiArrowRight />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>

        <div className="mt-8 sm:hidden text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-sky-400 text-sm"
          >
            View All Articles <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
