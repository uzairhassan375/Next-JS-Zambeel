'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import { Check } from 'lucide-react';

export default function USDropshippingPage() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');
  const usaTalkToUsLink =
    'https://wa.me/971568472271?text=Hey!%20I%20want%20to%20start%20dropshipping%20in%20USA%20with%20Zambeel';

  // Scroll to hash target (e.g. #pricing) once async content has settled
  useEffect(() => {
    if (isArabic) return;
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.substring(1);
    const scrollToTarget = () => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    const timer1 = setTimeout(scrollToTarget, 150);
    const timer2 = setTimeout(scrollToTarget, 800);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isArabic]);

  if (isArabic) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{
          background:
            'linear-gradient(186.57deg, rgba(89, 10, 10, 0.75) 5.1%, rgba(31, 46, 100, 0.96) 12.51%, rgba(48, 41, 90, 0.9) 31.86%, rgba(125, 20, 20, 0.79) 47.98%, rgba(75, 72, 147, 0.92) 63.78%, #4A61C4 81.76%)',
        }}
      >
        <p
          className="text-[clamp(3rem,12vw,7rem)] font-bold text-white tracking-tight leading-none animate-pulse"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          {t('usDropshipping.comingSoon')}
        </p>
        <p className="mt-8 max-w-lg text-lg text-white/85 md:text-xl">
          {t('usDropshipping.comingSoonSub')}
        </p>
      </div>
    );
  }

  const usServices = [
    {
      key: 'dropshipping',
      title: t('usDropshipping.serviceDropshipping.title'),
      description: t('usDropshipping.serviceDropshipping.description'),
    },
    {
      key: '360',
      title: t('usDropshipping.serviceZambeel360.title'),
      description: t('usDropshipping.serviceZambeel360.description'),
    },
    {
      key: '3pl',
      title: t('usDropshipping.serviceZambeel3PL.title'),
      description: t('usDropshipping.serviceZambeel3PL.description'),
    },
  ];

  const planKeys = ['planFree', 'plan49', 'plan99'];
  const planMeta = {
    planFree: { border: 'border-white/20', featured: false },
    plan49: { border: 'border-[#FCD64C]', featured: true },
    plan99: { border: 'border-violet-300/50', featured: false },
  };

  const TalkButton = ({ className = '' }) => (
    <a
      href={usaTalkToUsLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#ffd24c] px-8 py-3.5 text-base font-bold text-[#243a86] shadow-lg transition hover:brightness-95 md:text-lg ${className}`}
    >
      <i className="fa-brands fa-whatsapp text-xl" aria-hidden />
      {t('usDropshipping.talkToUs')}
    </a>
  );

  return (
    <div
      className="min-h-screen overflow-x-hidden pb-16"
      style={{
        background:
          'linear-gradient(186.57deg, rgba(89, 10, 10, 0.75) 5.1%, rgba(31, 46, 100, 0.958277) 12.51%, rgba(48, 41, 90, 0.897201) 31.86%, rgba(125, 20, 20, 0.793286) 47.98%, rgba(75, 72, 147, 0.918182) 63.78%, #4A61C4 81.76%)',
      }}
    >
      <section className="relative px-4 pb-10 pt-24 text-center md:pt-28">
        <div className="pointer-events-none absolute left-[10%] top-[22%] hidden opacity-30 md:block">
          <svg width="120" height="100" viewBox="0 0 255 217" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M115.078 217C173.923 217 255 175.225 255 169.835C218.385 155.012 196.154 0 153 0C99.386 0 0 44.4904 0 44.4904C61.4613 107.826 68.0003 217 115.078 217Z"
              fill="#F4D03F"
            />
          </svg>
        </div>
        <div className="pointer-events-none absolute right-[8%] top-[18%] hidden opacity-25 md:block">
          <svg width="180" height="140" viewBox="0 0 255 217" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M115.078 217C173.923 217 255 175.225 255 169.835C218.385 155.012 196.154 0 153 0C99.386 0 0 44.4904 0 44.4904C61.4613 107.826 68.0003 217 115.078 217Z"
              fill="#F4D03F"
            />
          </svg>
        </div>

        <h1
          className="relative z-10 mx-auto mb-4 max-w-4xl text-[28px] font-bold leading-tight text-white md:text-5xl"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          {t('usDropshipping.welcomeTitle')}
        </h1>
        <p className="relative z-10 mx-auto mb-8 max-w-2xl text-base text-white/90 md:text-xl md:leading-relaxed">
          {t('usDropshipping.tagline')}
        </p>
        <div className="relative z-10 flex justify-center">
          <TalkButton />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12">
        <div className="rounded-3xl border border-white/15 bg-white/95 p-8 shadow-2xl backdrop-blur-sm md:p-12">
          <h2 className="mb-6 text-center text-2xl font-bold text-[#2E3B78] md:text-3xl">
            {t('usDropshipping.servicesTitle')}
          </h2>
          <ul className="mx-auto grid max-w-5xl gap-4 text-left text-[#2E3B78]/90 md:grid-cols-3">
            {usServices.map((item) => (
              <li
                key={item.key}
                className="flex flex-col gap-3 rounded-2xl border border-[#2E3B78]/10 bg-[#E8F0FE]/60 px-4 py-4 text-sm md:px-5 md:py-5 md:text-base"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2E3B78] text-xs text-[#FCD64C]">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="font-bold text-[#2E3B78]">{item.title}</span>
                </div>
                <p className="pl-9 text-[#2E3B78]/85 leading-snug">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-4 pb-8">
        <h2 className="mb-2 text-center text-2xl font-bold text-white md:text-3xl">
          {t('usDropshipping.packagesTitle')}
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-white/80 md:text-base">
          {t('usDropshipping.packagesSubtitle')}
        </p>

        <div className="grid gap-6 md:grid-cols-3 md:items-stretch">
          {planKeys.map((planKey) => {
            const meta = planMeta[planKey];
            const features = t(`usDropshipping.${planKey}.featureList`, { returnObjects: true });
            const list = Array.isArray(features) ? features : [];
            return (
              <div
                key={planKey}
                className={`relative flex flex-col rounded-3xl border-2 bg-white/95 p-6 shadow-xl md:p-8 ${
                  meta.featured
                    ? 'border-[#FCD64C] bg-white shadow-[0_0_0_4px_rgba(252,214,76,0.25)] md:-mt-2 md:pb-10'
                    : `${meta.border} bg-white/95`
                }`}
              >
                {meta.featured && (
                  <span className="absolute -top-3 left-1/2 z-[1] -translate-x-1/2 rounded-full bg-[#FCD64C] px-4 py-1 text-xs font-bold uppercase text-[#243a86] shadow-md">
                    {t('usDropshipping.popular')}
                  </span>
                )}
                <div
                  className={`flex flex-wrap items-center justify-between gap-2.5 gap-y-2 border-b border-[#2E3B78]/12 pb-4 md:flex-nowrap ${meta.featured ? 'mt-2' : ''}`}
                >
                  <span className="min-w-0 text-base font-bold text-[#2E3B78] md:text-lg md:whitespace-nowrap">
                    {t(`usDropshipping.${planKey}.name`)}
                  </span>
                  <span
                    className={`shrink-0 rounded-xl px-3 py-1.5 shadow-sm ${
                      meta.featured
                        ? 'bg-[#FCD64C] text-[#243a86] ring-2 ring-[#FCD64C]/50'
                        : 'bg-[#243a86]/10 text-[#243a86] ring-1 ring-[#243a86]/15'
                    }`}
                  >
                    {(() => {
                      const rawPrice = String(t(`usDropshipping.${planKey}.price`) || '');
                      const [amount, period] = rawPrice.split(' / ');
                      if (!period) {
                        return <span className="text-base font-extrabold tracking-tight md:text-lg">{rawPrice}</span>;
                      }
                      return (
                        <span className="inline-flex items-end gap-0.5">
                          <span className="text-base font-extrabold tracking-tight md:text-lg">{amount}</span>
                          <span className="text-sm font-medium opacity-90 md:text-base">/{period}</span>
                        </span>
                      );
                    })()}
                  </span>
                </div>
                <ul className="mt-5 flex-1 space-y-2.5 text-left text-sm text-[#2E3B78]">
                  {list.map((line, idx) => (
                    <li key={`${planKey}-${idx}`} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#2E3B78]" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 text-center">
        <TalkButton className="w-full sm:w-auto" />
      </section>
    </div>
  );
}
