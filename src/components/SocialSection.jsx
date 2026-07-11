import { motion } from 'framer-motion';
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';

const platforms = [
  {
    name: 'Facebook',
    handle: '@TODAInternational',
    followers: '28K',
    color: '#1877F2',
    icon: FaFacebook,
    bg: 'rgba(24,119,242,0.10)',
  },
  {
    name: 'Instagram',
    handle: '@toda.intl',
    followers: '41K',
    color: '#E1306C',
    icon: FaInstagram,
    bg: 'rgba(225,48,108,0.10)',
  },
  {
    name: 'TikTok',
    handle: '@toda.drivers',
    followers: '62K',
    color: '#69C9D0',
    icon: FaTiktok,
    bg: 'rgba(105,201,208,0.10)',
  },
  {
    name: 'X (Twitter)',
    handle: '@TODAOfficial',
    followers: '19K',
    color: '#FFFFFF',
    icon: FaXTwitter,
    bg: 'rgba(255,255,255,0.06)',
  },
  {
    name: 'YouTube',
    handle: 'TODA International',
    followers: '15K',
    color: '#FF0000',
    icon: FaYoutube,
    bg: 'rgba(255,0,0,0.10)',
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const card = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function SocialSection() {
  return (
    <section className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-mono tracking-[0.25em] text-orange-400 uppercase mb-3">
            COMMUNITY
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
            Let&apos;s Connect
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500 to-orange-400 mx-auto mt-4 rounded-full" />
          <p className="text-neutral-400 text-lg mt-4 max-w-xl mx-auto">
            Join our growing community across social platforms.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-wrap justify-center gap-5"
        >
          {platforms.map((p) => (
            <motion.div
              key={p.name}
              variants={card}
              whileHover={{ scale: 1.04, y: -4 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              className="w-[150px] sm:w-52 rounded-2xl p-4 sm:p-6 text-center cursor-pointer border bg-[#111111] relative overflow-hidden group transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity pointer-events-none"
                style={{ background: p.bg }}
              />
              <div className="relative">
                <p.icon className="mx-auto mb-3 text-5xl" style={{ color: p.color }} />
                <div className="font-display font-bold text-white text-lg">{p.name}</div>
                <div className="text-xs text-neutral-500 mt-0.5">{p.handle}</div>
                <div className="font-semibold text-sm text-neutral-300 mt-2">
                  {p.followers} Followers
                </div>
                <button
                  type="button"
                  className="mt-4 w-full py-2 rounded-xl text-xs font-semibold border transition-colors"
                  style={{ borderColor: `${p.color}66`, color: p.color }}
                >
                  Follow
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
