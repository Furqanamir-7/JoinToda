import { FiPhone } from 'react-icons/fi';

export default function TopBar() {
  return (
    <div className="hidden sm:block bg-[#0A0A0A] border-b border-white/[0.06] h-9">
      <div className="max-w-7xl mx-auto px-4 h-full flex justify-between items-center">
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <FiPhone className="text-orange-400" />
          <span>Support: +1 800-TODA-HELP</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-neutral-400">
          <a
            href="#shop"
            className="hover:text-orange-400 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded px-1"
          >
            Truck Shop
          </a>
          <span className="text-neutral-700">|</span>
          <a
            href="#subscribe"
            className="hover:text-orange-400 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded px-1"
          >
            Subscribe
          </a>
        </div>
      </div>
    </div>
  );
}
