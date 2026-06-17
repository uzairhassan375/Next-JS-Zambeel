'use client';

import Image from 'next/image';
import Marquee from 'react-fast-marquee';

export default function AgencyLogoTicker({ companies, onLogoClick, getInitials }) {
  if (!companies?.length) return null;

  return (
    <div className="relative w-full overflow-hidden py-3 md:py-5">
      <Marquee pauseOnHover speed={40} gradient gradientWidth={64} gradientColor={[45, 62, 126]} autoFill>
        {companies.map((company) => (
          <button
            key={company.id}
            type="button"
            onClick={() => onLogoClick(company)}
            className="mx-3 md:mx-5 flex h-[72px] w-[120px] md:h-[88px] md:w-[148px] flex-shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2E3B78]/25 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#2E3B78]/20"
            aria-label={company.name}
            title={company.name}
          >
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
                className="text-sm md:text-base font-bold text-[#2E3B78]"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                {getInitials(company.name)}
              </span>
            )}
          </button>
        ))}
      </Marquee>
    </div>
  );
}
