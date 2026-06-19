'use client';

import Image from 'next/image';
import Marquee from 'react-fast-marquee';

export default function AgencyLogoTicker({ companies, onLogoClick, getInitials }) {
  if (!companies?.length) return null;

  return (
    <div className="relative w-full overflow-hidden py-4 md:py-6">
      <Marquee pauseOnHover speed={40} gradient gradientWidth={64} gradientColor={[45, 62, 126]} autoFill>
        {companies.map((company) => (
          <button
            key={company.id}
            type="button"
            onClick={() => onLogoClick(company)}
            className="group mx-4 md:mx-6 flex w-[110px] md:w-[140px] flex-shrink-0 flex-col items-stretch bg-transparent focus:outline-none"
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
            <span className="h-0.5 w-full rounded-full bg-white/80 transition-colors duration-200 group-hover:bg-white" />
          </button>
        ))}
      </Marquee>
    </div>
  );
}
