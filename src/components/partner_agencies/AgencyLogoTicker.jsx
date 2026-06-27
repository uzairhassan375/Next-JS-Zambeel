'use client';

import { useState } from 'react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';

export default function AgencyLogoTicker({ companies, getInitials }) {
  const [isPaused, setIsPaused] = useState(false);

  if (!companies?.length) return null;

  return (
    <div className="relative mx-0 overflow-hidden rounded-none border-y border-white/10 bg-white/[0.04] px-3 py-5 shadow-[0_10px_40px_rgba(2,6,23,0.22)] backdrop-blur-sm sm:px-4 md:px-6 md:py-6 md:pt-7">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_62%)]" />
      <Marquee play={!isPaused} speed={40} gradient gradientWidth={64} gradientColor={[45, 62, 126]} autoFill>
        {companies.map((company, index) => (
          <div
            key={`${company.id}-${index}`}
            className="group mx-3 flex w-[118px] flex-shrink-0 flex-col items-center md:mx-5 md:w-[150px]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            aria-label={company.name}
            title={company.name}
          >
            <div className="flex h-[80px] w-full items-center justify-center px-2 pt-0.5 pb-0 transition-all duration-300 group-hover:-translate-y-1">
              {company.logo ? (
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={120}
                  height={72}
                  className="max-h-full max-w-full object-contain opacity-95 contrast-110 brightness-110 drop-shadow-[0_0_14px_rgba(255,255,255,0.16)] transition-transform duration-300 group-hover:scale-[1.04]"
                  unoptimized={company.logo?.startsWith('data:') || company.logo?.startsWith('/api/')}
                />
              ) : (
                <span
                  className="text-sm font-black tracking-[0.2em] text-white md:text-base"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  {getInitials(company.name)}
                </span>
              )}
            </div>
            <span className="mt-0 inline-flex h-[2px] w-[72%] max-w-[92px] items-center justify-center" aria-hidden>
              <span className="h-full w-full rounded-full bg-gradient-to-r from-transparent via-white/80 to-transparent" />
            </span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
