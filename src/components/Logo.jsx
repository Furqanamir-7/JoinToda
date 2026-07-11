import { Link } from 'react-router-dom';

export default function Logo({ to = '/' }) {
  return (
    <Link to={to} className="flex items-center gap-3 group" aria-label="TODA International home">
      <div className="relative">
        <svg width="38" height="42" viewBox="0 0 38 42" className="drop-shadow-[0_0_8px_rgba(249,115,22,0.5)] transition-transform duration-300 group-hover:scale-105">
          <defs>
            <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#FB923C" />
            </linearGradient>
          </defs>
          <path
            d="M19 1 L36 11 V31 L19 41 L2 31 V11 Z"
            fill="url(#hexGrad)"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
          />
          <text
            x="19"
            y="27"
            textAnchor="middle"
            fontFamily="Syne, sans-serif"
            fontWeight="900"
            fontSize="18"
            fill="#fff"
          >
            T
          </text>
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display font-bold text-xl tracking-widest text-white">TODA</span>
        <span className="text-[8px] tracking-[0.3em] text-orange-400/80 mt-0.5">
          INTERNATIONAL
        </span>
      </div>
    </Link>
  );
}
