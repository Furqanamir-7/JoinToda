import { motion } from 'framer-motion';

export default function PageHero({ eyebrow, title, accentTitle, subtitle }) {
  return (
    <section className="relative pt-40 pb-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center"
      >
        {eyebrow && (
          <p className="text-xs font-mono tracking-[0.25em] text-orange-400 uppercase mb-4">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display font-extrabold text-white leading-[1.05] text-[clamp(2.25rem,9vw,4.5rem)]">
          {title} {accentTitle && <span className="text-gradient">{accentTitle}</span>}
        </h1>
        {subtitle && (
          <p className="text-lg text-neutral-400 mt-6 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </motion.div>
    </section>
  );
}
