'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import PricingSection from '../components/PricingSection';
import Ticker from '../components/Ticker.jsx';
import { trackButtonClick } from '../lib/analytics';

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

  const platforms = [
    { name: 'Shopify', colorClass: 'text-[#96BF48]' },
    { name: 'Amazon', colorClass: 'text-[#E58E26]' },
    { name: 'eBay', colorClass: 'text-[#C0392B]' },
    { name: 'Etsy', colorClass: 'text-[#D35400]' },
    { name: 'Walmart', colorClass: 'text-[#2E5FDB]' },
  ];

  const steps = ['step1', 'step2', 'step3', 'step4'].map((stepKey) => ({
    key: stepKey,
    label: t(`usDropshipping.${stepKey}.label`),
    title: t(`usDropshipping.${stepKey}.title`),
    description: t(`usDropshipping.${stepKey}.description`),
  }));

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
      onClick={() => trackButtonClick({ name: 'talk_to_us', href: usaTalkToUsLink, page: 'usa_dropshipping', location: 'hero' })} className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#ffd24c] px-8 py-3.5 text-base font-bold text-[#243a86] shadow-lg transition hover:brightness-95 md:text-lg ${className}`}
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
      <section className="relative overflow-hidden px-4 pb-16 pt-24 text-center md:pt-28">
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
          className="relative z-10 mx-auto mb-3 max-w-4xl text-[34px] font-bold leading-tight text-white md:text-6xl"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          {t('usDropshipping.welcomeTitle')}
        </h1>

        <div className="relative z-10 mx-auto mb-2 flex max-w-md items-center justify-center gap-4">
          <span className="h-px flex-1 bg-white/30" />
          <span className="shrink-0 text-xs font-semibold uppercase tracking-widest text-[#FCD64C] md:text-sm">
            {t('usDropshipping.bestPartLabel')}
          </span>
          <span className="h-px flex-1 bg-white/30" />
        </div>

        <p
          className="relative z-10 mx-auto mb-6 max-w-4xl text-[24px] font-bold leading-tight text-white/60 md:text-4xl"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          {t('usDropshipping.noLlcRequired')}
        </p>

        <p className="relative z-10 mx-auto mb-8 max-w-2xl text-base text-white/90 md:text-xl md:leading-relaxed">
          {t('usDropshipping.tagline')}
        </p>

        <div className="relative z-10 mx-auto mb-8 flex max-w-lg flex-wrap items-center justify-center gap-3">
          <span className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm md:text-base">
            {t('usDropshipping.badgeNoLlc')}
          </span>
          <span className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm md:text-base">
            {t('usDropshipping.badgeNoBankAccount')}
          </span>
        </div>

        <div className="relative z-10 mb-2 flex justify-center">
          <TalkButton />
        </div>

        <Ticker pageId="dropshipping-usa" variant="yellow" className="mt-6 md:mt-8" />
      </section>

      <section className="px-4 py-12 md:py-16">
        <div className="mx-auto max-w-[1200px] overflow-hidden rounded-[2rem] shadow-2xl md:rounded-[3rem]">
          <div className="bg-white px-6 pb-10 pt-10 text-center md:px-12 md:pt-12">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#2E5FDB] md:text-sm">
              {t('usDropshipping.platformsEyebrow')}
            </p>
            <h2 className="mx-auto mb-4 max-w-3xl text-3xl font-extrabold leading-tight text-[#2E3B78] md:text-5xl">
              {t('usDropshipping.platformsTitle')}
            </h2>
            <p className="mx-auto mb-14 max-w-2xl text-base text-[#2E3B78]/70 md:text-lg">
              {t('usDropshipping.platformsSubtitle')}
            </p>

            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
              {platforms.map(({ name, colorClass }) => (
                <div
                  key={name}
                  className="flex items-center justify-center rounded-2xl border border-[#2E3B78]/10 bg-[#F5F7FC] px-4 py-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className={`text-base font-extrabold md:text-lg ${colorClass}`}>{name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-200 px-6 py-10 text-center md:px-12">
            <p className="mx-auto mb-6 max-w-xl text-sm font-semibold text-[#2E3B78]/70 md:text-base">
              {t('usDropshipping.platformsClosingLine')}
            </p>

            <a
              href="https://products.myzambeel.com/collections/all-usa-products"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick({ name: 'view_products', href: 'https://products.myzambeel.com/collections/all-usa-products', page: 'usa_dropshipping', location: 'platforms' })}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2E3B78] px-8 py-3.5 text-base font-bold text-white shadow-lg transition hover:brightness-110 md:text-lg"
            >
              {t('usDropshipping.viewProducts')}
            </a>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:py-16">
        <div className="mx-auto max-w-[1200px] rounded-[2rem] bg-white px-6 py-10 text-center shadow-2xl md:rounded-[3rem] md:p-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#2E5FDB] md:text-sm">
            {t('usDropshipping.howItWorksEyebrow')}
          </p>
          <h2 className="mx-auto mb-4 max-w-3xl text-3xl font-extrabold leading-tight text-[#2E3B78] md:text-5xl">
            {t('usDropshipping.howItWorksTitle')}
          </h2>
          <p className="mx-auto mb-14 max-w-2xl text-base text-[#2E3B78]/70 md:text-lg">
            {t('usDropshipping.howItWorksSubtitle')}
          </p>

          <div className="mx-auto grid max-w-6xl gap-8 text-left sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.key} className="flex flex-col">
                <span className="mb-4 h-0.5 w-full bg-[#2E5FDB]" />
                <span className="mb-2 text-xs font-bold uppercase tracking-widest text-[#2E5FDB]">
                  {step.label}
                </span>
                <h3 className="mb-2 text-lg font-extrabold text-[#2E3B78] md:text-xl">{step.title}</h3>
                <p className="text-sm leading-relaxed text-[#2E3B78]/70 md:text-base">{step.description}</p>
              </div>
            ))}
          </div>
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
