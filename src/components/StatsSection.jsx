import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { FiUsers, FiGlobe, FiBook, FiAward } from 'react-icons/fi';

const stats = [
  { value: 50000, suffix: '+', label: 'Active Members', icon: FiUsers },
  { value: 25, suffix: '+', label: 'Countries', icon: FiGlobe },
  { value: 100, suffix: '+', label: 'Resources', icon: FiBook },
  { value: 15, suffix: '+', label: 'Years Supporting Drivers', icon: FiAward },
];

function AnimatedNumber({ to, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1800, stiffness: 80, damping: 20 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, to, mv]);

  useEffect(() => {
    const unsub = spring.on('change', (v) => setDisplay(Math.round(v)));
    return () => unsub();
  }, [spring]);

  return (
    <span ref={ref} className="font-display text-5xl font-extrabold text-gradient">
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-24 bg-[#0D0D0D] relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/[0.08] blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono tracking-[0.25em] text-orange-400 uppercase mb-3">
            BY THE NUMBERS
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight">
            Trusted by the
            <br />
            <span className="text-gradient">Global Trucking Industry</span>
          </h2>
          <p className="text-neutral-400 mt-4">Real numbers from a real community.</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-orange-500/[0.07] to-transparent rounded-2xl pointer-events-none" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto">
                  <s.icon className="text-orange-400 text-xl" />
                </div>
                <div className="mt-4">
                  <AnimatedNumber to={s.value} suffix={s.suffix} />
                </div>
                <div className="text-neutral-400 text-sm mt-2 font-medium">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
