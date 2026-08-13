'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import { Check } from 'lucide-react';
import PricingSection from '../components/PricingSection';

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
        <h1
          className="text-[clamp(2rem,8vw,4rem)] font-bold text-white tracking-tight leading-tight animate-pulse"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          {t('usDropshipping.comingSoon')}
        </h1>
        <p className="mt-8 max-w-lg text-lg text-white/85 md:text-xl">
          {t('usDropshipping.comingSoonSub')}
        </p>
        <p className="mt-6 max-w-2xl text-sm text-white/75 md:text-base leading-relaxed">
          {t('usDropshipping.seoIntro')}
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

  // Same card UI as the Dropshipping / 3PL / 360 pages, fed with the USA content
  const usPlans = planKeys.map((planKey) => {
    const rawPrice = String(t(`usDropshipping.${planKey}.price`) || '');
    const [amount, period] = rawPrice.split(' / ');
    const features = t(`usDropshipping.${planKey}.featureList`, { returnObjects: true });
    const list = Array.isArray(features) ? features : [];

    return {
      tag: t(`usDropshipping.${planKey}.tag`),
      name: t(`usDropshipping.${planKey}.name`),
      monthlyPrice: amount,
      yearlyPrice: amount,
      pricePeriod: period ? `/${period}` : '',
      description: '',
      features: list.map((line) => ({ text: line, included: true })),
    };
  });

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
      <section className="relative overflow-hidden px-4 pb-10 pt-24 text-center md:pt-28">
        {/* Left side SVGs */}
        <div className="absolute left-[3%] top-[50%] hidden md:block">
          <svg width="80" height="93" viewBox="0 0 106 124" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-1.68109e-06 55.9593C-4.18271e-06 84.5745 20.406 124 23.039 124C30.2799 106.195 106 95.3848 106 74.4002C106 48.3289 84.2674 5.72947e-06 84.2674 5.72947e-06C53.3291 29.8871 3.20237e-07 33.0668 -1.68109e-06 55.9593Z" fill="#F4D03F" fillOpacity="0.3"/>
          </svg>
        </div>
        <div className="absolute left-[3%] top-[64%] hidden md:block">
          <svg width="80" height="93" viewBox="0 0 106 124" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-1.68109e-06 55.9593C-4.18271e-06 84.5745 20.406 124 23.039 124C30.2799 106.195 106 95.3848 106 74.4002C106 48.3289 84.2674 5.72947e-06 84.2674 5.72947e-06C53.3291 29.8871 3.20237e-07 33.0668 -1.68109e-06 55.9593Z" fill="#F4D03F" fillOpacity="0.3"/>
          </svg>
        </div>

        {/* Right side SVGs */}
        <div className="absolute right-[4%] top-[10%] hidden md:block">
          <svg width="80" height="93" viewBox="0 0 106 124" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-1.68109e-06 55.9593C-4.18271e-06 84.5745 20.406 124 23.039 124C30.2799 106.195 106 95.3848 106 74.4002C106 48.3289 84.2674 5.72947e-06 84.2674 5.72947e-06C53.3291 29.8871 3.20237e-07 33.0668 -1.68109e-06 55.9593Z" fill="#F4D03F" fillOpacity="0.3"/>
          </svg>
        </div>
        <div className="absolute right-[4%] top-[25%] hidden md:block">
          <svg width="80" height="93" viewBox="0 0 106 124" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-1.68109e-06 55.9593C-4.18271e-06 84.5745 20.406 124 23.039 124C30.2799 106.195 106 95.3848 106 74.4002C106 48.3289 84.2674 5.72947e-06 84.2674 5.72947e-06C53.3291 29.8871 3.20237e-07 33.0668 -1.68109e-06 55.9593Z" fill="#F4D03F" fillOpacity="0.3"/>
          </svg>
        </div>

        {/* Center SVG */}
        <div className="absolute left-1/2 top-[50%] transform -translate-x-1/2 hidden md:block">
          <svg width="80" height="93" viewBox="0 0 106 124" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-1.68109e-06 55.9593C-4.18271e-06 84.5745 20.406 124 23.039 124C30.2799 106.195 106 95.3848 106 74.4002C106 48.3289 84.2674 5.72947e-06 84.2674 5.72947e-06C53.3291 29.8871 3.20237e-07 33.0668 -1.68109e-06 55.9593Z" fill="#F4D03F" fillOpacity="0.3"/>
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

      <div className="pb-8">
        <PricingSection
          title={t('usDropshipping.packagesTitle')}
          subtitle={t('usDropshipping.packagesSubtitle')}
          customPlans={usPlans}
          ctaLabelKey="usDropshipping.talkToUs"
          ctaHref={usaTalkToUsLink}
          showTerms={false}
        />
      </div>

      <section className="mx-auto max-w-2xl px-4 text-center">
        <TalkButton className="w-full sm:w-auto" />
      </section>
    </div>
  );
}
