import { motion } from 'framer-motion';
import { FiTarget, FiCompass, FiUsers, FiAward } from 'react-icons/fi';
import PageHero from '../components/PageHero';

const pillars = [
  {
    icon: FiTarget,
    title: 'Our Mission',
    text: 'Empower truck owners and drivers worldwide through advocacy, education, and an unbreakable global community.',
  },
  {
    icon: FiCompass,
    title: 'Our Vision',
    text: 'A world where every driver has a seat at the table — and every operator has the tools to thrive.',
  },
  {
    icon: FiUsers,
    title: 'Our Community',
    text: '50,000+ members across 25+ countries, from solo owner-operators to multinational fleets.',
  },
  {
    icon: FiAward,
    title: 'Our Track Record',
    text: '15 years of policy wins, fuel programs, welfare initiatives, and member-led campaigns.',
  },
];

const timeline = [
  { year: '2010', title: 'TODA founded', text: 'Began as a US owner-operator coalition.' },
  { year: '2014', title: 'Cross-border expansion', text: 'Canada & Mexico chapters launched.' },
  { year: '2018', title: 'Atlantic crossing', text: 'EU partner network formed.' },
  { year: '2021', title: 'MENA chapter', text: 'Saudi Arabia & Iran nodes opened.' },
  { year: '2025', title: '50K members', text: 'Largest independent trucking network worldwide.' },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT US"
        title="Built by drivers,"
        accentTitle="for drivers."
        subtitle="TODA International exists because the road shouldn't be walked alone. We are a member-driven, non-profit association representing the interests of truck owners and drivers everywhere."
      />

      <section className="py-16 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="bg-[#111111] border border-white/[0.06] hover:border-orange-500/35 transition-colors rounded-2xl p-6"
            >
              <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                <p.icon className="text-orange-400 text-xl" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mt-4">{p.title}</h3>
              <p className="text-sm text-neutral-400 mt-2 leading-relaxed">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-[#0D0D0D] relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-mono tracking-[0.25em] text-orange-400 uppercase mb-3">
              OUR JOURNEY
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
              15 years on the road
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-3 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-orange-500/40 to-transparent" />
            <div className="space-y-10">
              {timeline.map((t, i) => (
                <motion.div
                  key={t.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex ${
                    i % 2 === 0 ? 'sm:justify-start' : 'sm:justify-end'
                  } pl-10 sm:pl-0`}
                >
                  <span className="absolute left-2 sm:left-1/2 sm:-translate-x-1/2 top-2 w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.7)]" />
                  <div
                    className={`bg-[#111111] border border-white/[0.06] rounded-2xl p-5 max-w-sm w-full ${
                      i % 2 === 0 ? 'sm:mr-auto sm:pr-8' : 'sm:ml-auto sm:pl-8'
                    }`}
                  >
                    <div className="font-mono text-xs text-orange-400 tracking-widest">
                      {t.year}
                    </div>
                    <div className="font-display text-lg font-bold text-white mt-1">
                      {t.title}
                    </div>
                    <p className="text-sm text-neutral-400 mt-1">{t.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-[#0A0A0A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-mono tracking-[0.25em] text-orange-400 uppercase mb-3">
            GET IN TOUCH
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
            Talk to the team
          </h2>
          <p className="text-neutral-400 text-lg mt-4">
            For partnership, press, or general questions — we usually reply within one
            business day.
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href="mailto:info@toda-international.org"
              className="glass rounded-2xl p-6 text-left hover:border-orange-400/40 transition-colors"
            >
              <div className="text-xs text-neutral-500 font-mono tracking-widest">EMAIL</div>
              <div className="text-white font-semibold mt-1 break-all">
                info@toda-international.org
              </div>
            </a>
            <a
              href="tel:+18008632435"
              className="glass rounded-2xl p-6 text-left hover:border-orange-400/40 transition-colors"
            >
              <div className="text-xs text-neutral-500 font-mono tracking-widest">PHONE</div>
              <div className="text-white font-semibold mt-1">+1 800-TODA-HELP</div>
            </a>
            <div className="glass rounded-2xl p-6 text-left">
              <div className="text-xs text-neutral-500 font-mono tracking-widest">HQ</div>
              <div className="text-white font-semibold mt-1">Washington, D.C.</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
