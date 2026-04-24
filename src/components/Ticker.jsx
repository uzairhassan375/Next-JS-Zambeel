'use client';

import Marquee from 'react-fast-marquee';
import { useTranslation } from 'react-i18next';
import { GoldTickerBlinkLead } from './GoldRiskFreeTickerMarquee';

function TickerStrip() {
  const { t } = useTranslation();
  return (
    <div className="mx-6 flex items-center whitespace-nowrap text-sm text-white md:mx-10 md:text-base">
      <span className="whitespace-nowrap">
        <GoldTickerBlinkLead>{t('pricing.goldRiskFreeTickerLead')}</GoldTickerBlinkLead>
        <span className="font-normal">{t('pricing.goldRiskFreeTickerMiddle')}</span>
        <span className="ms-1 inline-block font-bold md:ms-1.5">
          {t('pricing.goldRiskFreeTickerRefund')}
        </span>
      </span>
      <span className="mx-4 text-white/60 md:mx-6" aria-hidden>
        •
      </span>
    </div>
  );
}

export default function Ticker() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';

  return (
    <div
      className="relative z-10 mt-4 w-screen overflow-hidden bg-[#2E3B78] py-2 text-white md:mt-0 md:py-3"
      style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}
    >
      <Marquee
        key={currentLanguage}
        speed={50}
        gradient
        gradientColor={[46, 59, 120]}
        gradientWidth={50}
        pauseOnHover
        direction={currentLanguage === 'ar' ? 'left' : 'right'}
        autoFill
      >
        <TickerStrip />
        <TickerStrip />
        <TickerStrip />
      </Marquee>
    </div>
  );
}
