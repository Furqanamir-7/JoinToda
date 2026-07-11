import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiShield,
  FiFileText,
  FiTrendingUp,
  FiUsers,
  FiHeart,
  FiArrowRight,
} from 'react-icons/fi';

const benefits = [
  {
    icon: FiShield,
    title: 'Industry Representation',
    desc: 'Your voice in government and regulatory discussions.',
  },
  {
    icon: FiFileText,
    title: 'Legal & Compliance Resources',
    desc: 'Up-to-date guidance on permits, ELDs, and cross-border rules.',
  },
  {
    icon: FiTrendingUp,
    title: 'Business Growth',
    desc: 'Tools, discounts, and partnerships to improve your bottom line.',
  },
  {
    icon: FiUsers,
    title: 'Networking Events',
    desc: 'Connect with operators, shippers, and fleet managers globally.',
  },
  {
    icon: FiHeart,
    title: 'Driver Advocacy',
    desc: 'Mental health, safety, and welfare programs for every driver.',
  },
];

export default function MembershipBenefits() {
  return (
    <section id="membership" className="py-24 bg-[#0D0D0D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT — image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[4/3] sm:aspect-[4/5] rounded-3xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&q=85"
              alt="Truck driver in the cab looking out at the road ahead"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/70 to-transparent" />
            <span className="absolute -top-px -left-px w-24 h-24 border-t-2 border-l-2 border-orange-500/60 rounded-tl-3xl" />
            <span className="absolute -bottom-px -right-px w-24 h-24 border-b-2 border-r-2 border-orange-500/60 rounded-br-3xl" />

            <div className="absolute bottom-6 left-6 glass rounded-xl p-4 text-sm max-w-[80%]">
              <div className="text-white font-medium">✓ Member-verified resources</div>
              <div className="text-xs text-neutral-400 mt-0.5">Updated weekly</div>
            </div>
          </motion.div>

          {/* RIGHT — content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-mono tracking-[0.25em] text-orange-400 uppercase">
              WHY JOIN
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mt-2">
              Why Become a Member?
            </h2>
            <p className="text-neutral-400 leading-relaxed mt-4 text-base">
              TODA members gain exclusive access to industry resources, legal guidance, global
              networking, and a unified voice in policy decisions that affect your livelihood.
            </p>

            <ul className="mt-8 space-y-4">
              {benefits.map((b, i) => (
                <motion.li
                  key={b.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="flex items-start gap-4"
                >
                  <span className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                    <b.icon className="text-orange-400 text-lg" />
                  </span>
                  <div>
                    <div className="text-white font-semibold text-sm">{b.title}</div>
                    <div className="text-neutral-500 text-xs mt-0.5">{b.desc}</div>
                  </div>
                </motion.li>
              ))}
            </ul>

            <div className="mt-10">
              <Link
                to="/become-member"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold shadow-[0_0_20px_rgba(249,115,22,0.35)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] hover:scale-105 transition-all duration-200"
              >
                Become a Member <FiArrowRight />
              </Link>
              <p className="text-xs text-neutral-500 mt-3">
                Free 30-day trial · No credit card required
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
