'use client';

import { useState } from 'react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';

export default function AgencyLogoTicker({ companies, getInitials }) {
  const [isPaused, setIsPaused] = useState(false);

  if (!companies?.length) return null;

  return (
    <div className="relative w-full overflow-hidden py-4 md:py-6">
      <Marquee play={!isPaused} speed={40} gradient gradientWidth={64} gradientColor={[45, 62, 126]} autoFill>
        {companies.map((company, index) => (
          <div
            key={`${company.id}-${index}`}
            className="group mx-4 md:mx-6 flex w-[110px] md:w-[140px] flex-shrink-0 flex-col items-stretch"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            aria-label={company.name}
            title={company.name}
          >
            <span className="flex h-[68px] md:h-[80px] items-center justify-center px-1 pb-3 md:pb-4 transition-transform duration-200 group-hover:-translate-y-0.5">
              {company.logo ? (
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={120}
                  height={72}
                  className="max-h-full max-w-full object-contain"
                  unoptimized={company.logo?.startsWith('data:') || company.logo?.startsWith('/api/')}
                />
              ) : (
                <span
                  className="text-sm md:text-base font-bold text-white"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  {getInitials(company.name)}
                </span>
              )}
            </span>
            <span className="relative block h-0.5 w-full" aria-hidden>
              <span className="absolute inset-0 rounded-full bg-white/70" />
              <span className="absolute inset-0 rounded-full bg-white origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
