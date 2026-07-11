import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import Logo from './Logo';
import { chapters } from '../data/chaptersData';

const navLinks = [
  { to: '/', label: 'Truckers of the World, Unite!' },
  { to: '/become-member', label: 'Become Member' },
  { to: '/about', label: 'About Us' },
  { to: '/resources', label: 'Resources' },
  {
    to: '/global-network',
    label: 'Global Network',
    children: chapters.map((c) => ({
      to: `/global-network/${c.slug}`,
      label: c.shortName,
      sub: c.name,
      code: c.code,
      flag: c.flag,
    })),
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // path of open dropdown
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const closeTimer = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
    setMobileExpanded(null);
  }, [location.pathname]);

  const openWithDelay = (path) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(path);
  };
  const closeWithDelay = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 180);
  };

  return (
    <nav
      className={`sticky top-0 sm:top-9 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Logo />

        <ul className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) =>
            link.children ? (
              <li
                key={link.to}
                className="relative"
                onMouseEnter={() => openWithDelay(link.to)}
                onMouseLeave={closeWithDelay}
              >
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `relative inline-flex items-center gap-1 text-sm font-medium transition-colors group ${
                      isActive ? 'text-white' : 'text-neutral-300 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.label}</span>
                      <FiChevronDown
                        className={`text-xs transition-transform ${
                          openMenu === link.to ? 'rotate-180' : ''
                        }`}
                      />
                      <span
                        className={`absolute left-0 -bottom-1.5 h-0.5 bg-blue-500 transition-all duration-300 ${
                          isActive ? 'w-[calc(100%-12px)]' : 'w-0 group-hover:w-[calc(100%-12px)]'
                        }`}
                      />
                    </>
                  )}
                </NavLink>

                <AnimatePresence>
                  {openMenu === link.to && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 pt-3 w-[340px]"
                    >
                      <div className="bg-[#0E0E0E]/95 backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.55)] overflow-hidden">
                        <Link
                          to={link.to}
                          className="block px-4 py-3 border-b border-white/[0.06] hover:bg-white/[0.04] transition-colors"
                        >
                          <div className="text-[10px] font-mono tracking-[0.25em] text-sky-400">
                            ◉ ALL CHAPTERS
                          </div>
                          <div className="text-sm font-semibold text-white mt-0.5">
                            Browse the worldwide network
                          </div>
                        </Link>
                        <ul className="max-h-[60vh] overflow-y-auto py-1">
                          {link.children.map((child) => (
                            <li key={child.to}>
                              <Link
                                to={child.to}
                                className="group flex items-start gap-3 px-4 py-2.5 hover:bg-white/[0.04] transition-colors"
                              >
                                <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-base shrink-0 mt-0.5">
                                  <span aria-hidden>{child.flag}</span>
                                </span>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-mono tracking-[0.2em] text-sky-400">
                                      {child.code}
                                    </span>
                                    <span className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors truncate" dir="auto">
                                      {child.label}
                                    </span>
                                  </div>
                                  <div className="text-[11px] text-neutral-500 leading-snug line-clamp-1" dir="auto">
                                    {child.sub}
                                  </div>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `relative text-sm font-medium transition-colors group ${
                      isActive ? 'text-white' : 'text-neutral-300 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.label}</span>
                      <span
                        className={`absolute left-0 -bottom-1.5 h-0.5 bg-blue-500 transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            )
          )}
        </ul>

        <div className="hidden lg:block">
          <Link
            to="/become-member"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-105 transition-all duration-200"
          >
            Join Now
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden text-white w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="lg:hidden overflow-hidden bg-[#111111]/95 backdrop-blur-xl border-t border-white/[0.06]"
          >
            <ul className="px-4 py-2">
              {navLinks.map((link) =>
                link.children ? (
                  <li key={link.to} className="border-b border-white/[0.06] last:border-b-0">
                    <div className="flex items-center justify-between">
                      <NavLink
                        to={link.to}
                        end={link.to === '/'}
                        className={({ isActive }) =>
                          `block flex-1 py-4 text-sm font-medium ${
                            isActive ? 'text-sky-400' : 'text-neutral-200'
                          }`
                        }
                      >
                        {link.label}
                      </NavLink>
                      <button
                        type="button"
                        onClick={() =>
                          setMobileExpanded((cur) => (cur === link.to ? null : link.to))
                        }
                        className="p-2 text-neutral-400 hover:text-white"
                        aria-label={`Toggle ${link.label} sub-menu`}
                      >
                        <FiChevronDown
                          className={`transition-transform ${
                            mobileExpanded === link.to ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </div>
                    <AnimatePresence>
                      {mobileExpanded === link.to && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pb-2"
                        >
                          {link.children.map((child) => (
                            <li key={child.to}>
                              <Link
                                to={child.to}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.04]"
                              >
                                <span className="text-lg" aria-hidden>{child.flag}</span>
                                <div className="min-w-0">
                                  <div className="text-[9px] font-mono tracking-[0.2em] text-sky-400">
                                    {child.code}
                                  </div>
                                  <div className="text-sm text-white truncate" dir="auto">
                                    {child.label}
                                  </div>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li key={link.to} className="border-b border-white/[0.06] last:border-b-0">
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      className={({ isActive }) =>
                        `block py-4 text-sm font-medium ${
                          isActive ? 'text-sky-400' : 'text-neutral-200'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                )
              )}
              <li className="py-4">
                <Link
                  to="/become-member"
                  className="block w-full text-center bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.35)]"
                >
                  Join Now
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
