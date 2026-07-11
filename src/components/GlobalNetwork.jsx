import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { networkData } from '../data/networkData';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const card = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function GlobalNetwork() {
  return (
    <section id="network" className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-orange-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono tracking-[0.25em] text-orange-400 uppercase mb-3">
            OUR REACH
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
            Global Network
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500 to-orange-400 mx-auto mt-4 rounded-full" />
          <p className="text-neutral-400 text-lg mt-4 max-w-xl mx-auto">
            Connecting trucking communities across the world.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12"
        >
          {networkData.map((r) => (
            <motion.div
              key={r.id}
              variants={card}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="bg-[#111111] rounded-2xl p-6 border border-white/[0.06] hover:border-orange-500/35 cursor-pointer relative overflow-hidden group transition-colors duration-300"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-orange-500/[0.05] to-transparent rounded-2xl pointer-events-none" />
              <div className="flex items-start justify-between relative">
                <span className="text-3xl">{r.emoji}</span>
                <FiArrowUpRight className="text-neutral-600 group-hover:text-orange-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-xl" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mt-3 relative">
                {r.region}
              </h3>
              <p className="text-sm text-neutral-400 mt-2 leading-relaxed relative">
                {r.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-5 relative">
                <span className="text-xs glass px-2.5 py-1 rounded-full text-orange-300/80">
                  {r.countries} Countries
                </span>
                <span className="text-xs glass px-2.5 py-1 rounded-full text-orange-300/80">
                  {r.members} Members
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
