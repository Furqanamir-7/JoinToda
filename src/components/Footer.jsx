import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import Logo from './Logo';
import { socials as socialAccounts } from '../data/socialLinks';

const socialIcons = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  x: FaXTwitter,
  youtube: FaYoutube,
};

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About TODA', to: '/about' },
  { label: 'Membership', to: '/become-member' },
  { label: 'Resources', to: '/resources' },
  { label: 'Global Network', to: '/global-network' },
  { label: 'Contact', to: '/about#contact' },
];

const resourceLinks = [
  'Industry News',
  'Events Calendar',
  'Driver Advocacy',
  'Compliance Guides',
  'Member Portal',
  'Media Center',
];

const socials = socialAccounts.map((s) => ({
  href: s.href,
  label: s.label,
  Icon: socialIcons[s.id],
}));

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/[0.06] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          <div className="col-span-2 lg:col-span-1">
            <Logo />
            <p className="text-sm text-neutral-500 mt-4 leading-relaxed max-w-xs">
              The global voice for truck owners, drivers, and transportation professionals.
              Advocating for your rights, resources, and road.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-neutral-400 hover:text-orange-400 hover:border-orange-400/30 transition-all"
                >
                  <Icon />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-orange-400 font-semibold mb-5">
              Quick Links
            </h4>
            <ul>
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-neutral-500 hover:text-white transition-colors py-1.5 block"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-orange-400 font-semibold mb-5">
              Resources
            </h4>
            <ul>
              {resourceLinks.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm text-neutral-500 hover:text-white transition-colors py-1.5 block"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-orange-400 font-semibold mb-5">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex gap-3 items-start text-sm text-neutral-500">
                <FiMail className="text-orange-400 mt-0.5 shrink-0" />
                <span>info@toda-international.org</span>
              </li>
              <li className="flex gap-3 items-start text-sm text-neutral-500">
                <FiPhone className="text-orange-400 mt-0.5 shrink-0" />
                <span>+1 800-TODA-HELP</span>
              </li>
              <li className="flex gap-3 items-start text-sm text-neutral-500">
                <FiMapPin className="text-orange-400 mt-0.5 shrink-0" />
                <span>
                  1200 Transport Drive, Suite 400
                  <br />
                  Washington, D.C. 20001
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/[0.05]" />

        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-600">
            © 2025 TODA International. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms & Conditions', 'Cookie Policy'].map((t) => (
              <a
                key={t}
                href="#"
                className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors"
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
