import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiSearch } from 'react-icons/fi';
import PageHero from '../components/PageHero';
import { newsData } from '../data/newsData';

const categories = ['All', ...Array.from(new Set(newsData.map((n) => n.category)))];

const guides = [
  {
    title: 'ELD Quick-Reference Card',
    type: 'PDF · 2 pages',
    desc: 'Pocket-friendly summary of the latest FMCSA ELD rules.',
  },
  {
    title: 'Cross-Border Permit Checklist',
    type: 'PDF · 4 pages',
    desc: 'Step-by-step for US-Canada, US-Mexico, and Gulf corridors.',
  },
  {
    title: 'Hours-of-Service Calculator',
    type: 'Tool',
    desc: 'Plug in your last shift to see your remaining drive time.',
  },
  {
    title: 'Fuel Cost Tracker (Template)',
    type: 'Spreadsheet',
    desc: 'Monthly fuel + maintenance template used by 1,200+ members.',
  },
];

export default function Resources() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState('All');

  const filtered = useMemo(() => {
    return newsData.filter((n) => {
      const matchesCat = active === 'All' || n.category === active;
      const q = query.trim().toLowerCase();
      const matchesQ =
        !q ||
        n.title.toLowerCase().includes(q) ||
        n.excerpt.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [query, active]);

  return (
    <>
      <PageHero
        eyebrow="RESOURCES"
        title="Everything you need,"
        accentTitle="on the road."
        subtitle="Guides, articles, tools, and templates — built by the TODA team and battle-tested by members in 25+ countries."
      />

      <section className="py-12 bg-[#0A0A0A] border-b border-white/[0.05]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, guides, tools…"
              className="w-full bg-[#111111] border border-white/[0.06] focus:border-orange-400/50 outline-none rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-neutral-500 transition-colors"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                className={`text-xs font-medium px-4 py-2 rounded-full border transition-colors ${
                  active === c
                    ? 'bg-orange-500/15 text-orange-300 border-orange-400/40'
                    : 'bg-transparent text-neutral-400 border-white/[0.08] hover:border-white/20'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-mono tracking-[0.25em] text-orange-400 uppercase mb-6">
            ARTICLES ({filtered.length})
          </p>
          {filtered.length === 0 ? (
            <p className="text-neutral-500 text-sm">No articles match your search.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((n, i) => (
                <motion.article
                  key={n.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="bg-[#111111] rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.12] group cursor-pointer transition-colors"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={n.image}
                      alt={n.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-mono text-orange-400 border border-orange-400/30 px-2 py-0.5 rounded-full inline-block">
                      {n.category}
                    </span>
                    <h3 className="font-semibold text-base text-white mt-3 leading-snug group-hover:text-sky-100 transition-colors line-clamp-2">
                      {n.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-2 line-clamp-2">{n.excerpt}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xs text-neutral-500">
                        {n.date} · {n.readTime}
                      </span>
                      <span className="text-orange-400 text-xs inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read <FiArrowRight />
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-mono tracking-[0.25em] text-orange-400 uppercase mb-3">
            TOOLKIT
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Member-only guides &amp; tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
            {guides.map((g, i) => (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="bg-[#111111] border border-white/[0.06] hover:border-orange-500/35 transition-colors rounded-2xl p-5"
              >
                <div className="text-[10px] font-mono text-orange-400 tracking-widest">
                  {g.type}
                </div>
                <h3 className="font-display text-lg font-bold text-white mt-2">{g.title}</h3>
                <p className="text-xs text-neutral-400 mt-2">{g.desc}</p>
                <button
                  type="button"
                  className="mt-4 text-sm text-orange-400 inline-flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Download <FiArrowRight />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
