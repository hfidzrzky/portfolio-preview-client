import React from "react";

interface FilmRollSvgProps {
  className?: string;
  size?: number;
}

export function FilmRollSvg({ className = "", size = 120 }: FilmRollSvgProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 transition-transform duration-700 hover:rotate-12"
      >
        {/* Outer Reel Ring */}
        <circle
          cx="80"
          cy="80"
          r="68"
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-white/20"
        />

        {/* Film Strip Border */}
        <circle
          cx="80"
          cy="80"
          r="54"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className="text-white/30"
        />

        {/* Center Hub */}
        <circle
          cx="80"
          cy="80"
          r="26"
          fill="#0a0a0a"
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-white/40"
        />
        <circle
          cx="80"
          cy="80"
          r="10"
          fill="currentColor"
          className="text-white/10"
        />

        {/* Reel Cutout Holes (Cinematic Film Spool) */}
        <circle cx="80" cy="42" r="7" fill="currentColor" className="text-white/15" />
        <circle cx="113" cy="61" r="7" fill="currentColor" className="text-white/15" />
        <circle cx="113" cy="99" r="7" fill="currentColor" className="text-white/15" />
        <circle cx="80" cy="118" r="7" fill="currentColor" className="text-white/15" />
        <circle cx="47" cy="99" r="7" fill="currentColor" className="text-white/15" />
        <circle cx="47" cy="61" r="7" fill="currentColor" className="text-white/15" />

        {/* Spool Spokes */}
        <line x1="80" y1="54" x2="80" y2="70" stroke="currentColor" strokeWidth="2" className="text-white/20" />
        <line x1="102" y1="67" x2="89" y2="75" stroke="currentColor" strokeWidth="2" className="text-white/20" />
        <line x1="102" y1="93" x2="89" y2="85" stroke="currentColor" strokeWidth="2" className="text-white/20" />
        <line x1="80" y1="106" x2="80" y2="90" stroke="currentColor" strokeWidth="2" className="text-white/20" />
        <line x1="58" y1="93" x2="71" y2="85" stroke="currentColor" strokeWidth="2" className="text-white/20" />
        <line x1="58" y1="67" x2="71" y2="75" stroke="currentColor" strokeWidth="2" className="text-white/20" />

        {/* Perforations trailing out / Film Leader accent */}
        <path
          d="M136 70 C 145 72, 152 78, 154 86"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-white/40"
        />
        <circle cx="150" cy="77" r="1.5" fill="currentColor" className="text-white/60" />
        <circle cx="154" cy="85" r="1.5" fill="currentColor" className="text-white/60" />
      </svg>
    </div>
  );
}


