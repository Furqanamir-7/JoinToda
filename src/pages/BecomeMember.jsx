import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiArrowRight } from 'react-icons/fi';
import PageHero from '../components/PageHero';

const tiers = [
  {
    name: 'Driver',
    price: 'Free',
    period: '30-day trial · then $9/mo',
    description: 'For independent owner-operators and company drivers.',
    features: [
      'Member Portal Access',
      'Weekly Industry Briefing',
      'Driver Welfare Hotline',
      'Community Forums',
      'Discount Marketplace',
    ],
    cta: 'Start Free Trial',
    highlight: false,
  },
  {
    name: 'Fleet',
    price: '$49',
    period: 'per month',
    description: 'For small to mid-size fleets (2–50 trucks).',
    features: [
      'Everything in Driver',
      'Compliance Toolkit',
      'Multi-driver Accounts',
      'Cross-border Permit Help',
      'Dedicated Account Manager',
      'Quarterly Cost Reports',
    ],
    cta: 'Join Fleet Tier',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'tailored to your operation',
    description: 'For large carriers and logistics organizations.',
    features: [
      'Everything in Fleet',
      'Custom Integrations',
      'Policy Advocacy Seat',
      'Bulk Driver Training',
      'API Access',
      'White-glove Onboarding',
    ],
    cta: 'Talk to Sales',
    highlight: false,
  },
];

const steps = [
  { n: 1, title: 'Create your account', text: 'Sign up in under 2 minutes with your email.' },
  { n: 2, title: 'Verify your operation', text: 'Upload basic credentials — we keep it simple.' },
  { n: 3, title: 'Access the network', text: 'Unlock resources, forums, and member-only events.' },
];

export default function BecomeMember() {
  const [selected, setSelected] = useState('Fleet');

  return (
    <>
      <PageHero
        eyebrow="MEMBERSHIP"
        title="Become a"
        accentTitle="TODA Member"
        subtitle="Choose the tier that fits your operation. All plans include free access to our global community and core advocacy resources."
      />

      <section className="py-16 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setSelected(t.name)}
              className={`relative rounded-3xl p-6 sm:p-8 border cursor-pointer transition-all ${
                selected === t.name || t.highlight
                  ? 'bg-gradient-to-b from-[#161616] to-[#0D0D0D] border-orange-500/40 shadow-[0_0_40px_rgba(249,115,22,0.12)]'
                  : 'bg-[#111111] border-white/[0.06] hover:border-white/[0.12]'
              }`}
            >
              {t.highlight && (
                <span className="absolute top-4 right-4 text-[10px] font-mono tracking-widest text-orange-400 border border-orange-400/40 px-2 py-1 rounded-full">
                  MOST POPULAR
                </span>
              )}
              <div className="font-display text-2xl font-bold text-white">{t.name}</div>
              <p className="text-sm text-neutral-400 mt-2">{t.description}</p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-5xl font-extrabold text-gradient">
                  {t.price}
                </span>
              </div>
              <div className="text-xs text-neutral-500 mt-1">{t.period}</div>

              <ul className="mt-6 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-neutral-300">
                    <FiCheck className="text-orange-400 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={`mt-8 w-full inline-flex items-center justify-center gap-2 font-semibold py-3 rounded-xl transition-all ${
                  selected === t.name || t.highlight
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-[0_0_20px_rgba(249,115,22,0.35)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]'
                    : 'glass border border-white/10 text-white hover:border-orange-400/40'
                }`}
              >
                {t.cta} <FiArrowRight />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-[#0D0D0D]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-mono tracking-[0.25em] text-orange-400 uppercase mb-3">
              HOW IT WORKS
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
              Join in 3 simple steps
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {steps.map((s) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: s.n * 0.08 }}
                className="bg-[#111111] border border-white/[0.06] rounded-2xl p-6"
              >
                <div className="font-display text-3xl font-extrabold text-gradient">
                  0{s.n}
                </div>
                <div className="font-display text-lg font-bold text-white mt-3">
                  {s.title}
                </div>
                <p className="text-sm text-neutral-400 mt-2">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
