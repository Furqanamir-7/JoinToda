import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export default function CTASection() {
  return (
    <section id="join" className="relative py-32 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1920&q=85"
        alt="Convoy of trucks on the highway at dusk"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/85 via-[#0A0A0A]/75 to-[#0A0A0A]/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.18)_0%,transparent_70%)]" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="relative z-10 text-center max-w-4xl mx-auto px-4"
      >
        <motion.div variants={item}>
          <span className="glass inline-flex px-4 py-2 rounded-full text-xs font-mono text-orange-400 tracking-wider mb-6">
            🚛 THE WORLD&apos;S LARGEST TRUCKING ASSOCIATION
          </span>
        </motion.div>

        <motion.h2
          variants={item}
          className="font-display font-extrabold text-white leading-[1.05] text-[clamp(2rem,8vw,4.5rem)]"
        >
          Join the Largest
          <br />
          <span className="text-gradient">Trucking Community</span>
          <br />
          Network
        </motion.h2>

        <motion.p
          variants={item}
          className="text-base sm:text-lg text-neutral-300 mt-6 max-w-2xl mx-auto leading-relaxed"
        >
          Become part of a movement supporting truck owners and drivers worldwide. Access
          resources, connect globally, and make your voice heard.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/become-member"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg px-10 py-5 rounded-2xl shadow-[0_0_30px_rgba(249,115,22,0.5)] hover:shadow-[0_0_50px_rgba(249,115,22,0.7)] hover:scale-105 transition-all"
          >
            Become a Member <FiArrowRight />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center justify-center glass border border-white/20 px-10 py-5 rounded-2xl font-semibold text-white hover:border-orange-400/40 transition-all"
          >
            Contact Us →
          </Link>
        </motion.div>

        <motion.p variants={item} className="text-xs text-neutral-500 mt-6">
          Join 50,000+ members in 25+ countries · Free to start · Cancel anytime
        </motion.p>
      </motion.div>
    </section>
  );
}
