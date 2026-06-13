'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Gem, Crown, Medal } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PricingSection from '../components/PricingSection';
import AgencyWhySection from '../components/partner_agencies/AgencyWhySection';
import AgencyFaqSection from '../components/partner_agencies/AgencyFaqSection';

const AGENCY_TIER_TABS = [
  { key: 'gold', tabLabelKey: 'tabs.gold', Icon: Crown, activeClass: 'bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#1a1a2e] shadow-[0_6px_20px_rgba(251,191,36,0.35)]' },
  { key: 'silver', tabLabelKey: 'tabs.silver', Icon: Medal, activeClass: 'bg-gradient-to-r from-[#cbd5e1] to-[#94a3b8] text-[#1e293b] shadow-[0_6px_20px_rgba(148,163,184,0.35)]' },
  { key: 'diamond', tabLabelKey: 'tabs.diamond', Icon: Gem, activeClass: 'bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white shadow-[0_6px_20px_rgba(59,130,246,0.35)]' },
];

const TIER_COLORS = {
  diamond: { accent: '#3b82f6', card: 'rgba(59, 130, 246, 0.15)', cardStyle: 'solid', label: 'text-[#70DEFF]', headingColor: '#70DEFF', clickDetailsColor: '#70DEFF', TierIcon: Gem, tierIconColor: '#70DEFF' },
  gold: {
    accent: '#fbbf24',
    card: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(251, 191, 36, 0.2) 50%, rgba(251, 191, 36, 0.15) 100%)',
    cardStyle: 'gradient',
    label: 'text-[#fcd34d]',
    headingColor: '#fcd34d',
    clickDetailsColor: '#fcd34d',
    TierIcon: Crown,
    tierIconColor: '#fcd34d',
  },
  silver: { accent: '#94a3b8', card: 'rgba(148, 163, 184, 0.15)', cardStyle: 'solid', label: 'text-[#cbd5e1]', headingColor: '#cbd5e1', clickDetailsColor: '#cbd5e1', TierIcon: Medal, tierIconColor: '#cbd5e1' },
};

function buildCompaniesByTier(agencies, lang) {
  const isAr = lang === 'ar';
  const byTier = { diamond: [], gold: [], silver: [] };
  (agencies || []).forEach((a) => {
    const tier = a.tier && byTier[a.tier] ? a.tier : 'silver';
    // Use logoUrl from API (fast list) or logo (admin/edit / legacy)
    const logo = a.logoUrl || a.logo || '';
    byTier[tier].push({
      id: a.id || a._id,
      name: (isAr && a.nameAr ? a.nameAr : a.nameEn) || '',
      country: (isAr && a.countryAr ? a.countryAr : a.countryEn) || '',
      description: (isAr && a.descriptionAr ? a.descriptionAr : a.descriptionEn) || '',
      contact: a.contact ?? '',
      phone: a.phone ?? '',
      website: a.website ?? '',
      logo,
    });
  });
  return byTier;
}

function PartnerAgenciesPage({ initialAgencies, initialCopy }) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';
  // Use server-passed copy so server and client render the same (avoids hydration mismatch)
  const c = (key, fallback = '') => initialCopy?.[key] ?? t(`partnerAgencies.${key}`, fallback);
  const [agencies, setAgencies] = useState(initialAgencies ?? []);
  const [loading, setLoading] = useState(typeof initialAgencies === 'undefined');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedTier, setSelectedTier] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeAgencyTier, setActiveAgencyTier] = useState('gold');
  const [currentSlide, setCurrentSlide] = useState({ diamond: 0, gold: 0, silver: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const companies = useMemo(() => buildCompaniesByTier(agencies, currentLanguage), [agencies, currentLanguage]);

  const agencyPricingPlans = useMemo(
    () => [
      {
        tag: 'FREE',
        tagTranslationKey: 'partnerAgencies.pricing.plans.free.tag',
        name: 'Free',
        nameTranslationKey: 'partnerAgencies.pricing.plans.free.name',
        monthlyPrice: '$0',
        yearlyPrice: '$0',
        pricePeriodTranslationKey: 'partnerAgencies.pricing.plans.free.period',
        description: '',
        features: [
          { translationKey: 'partnerAgencies.pricing.features.affiliateEarningLimited', included: true },
          { translationKey: 'partnerAgencies.pricing.features.dropshippingMarkets3', included: true },
          { translationKey: 'partnerAgencies.pricing.features.clientReferral', included: false },
          { translationKey: 'partnerAgencies.pricing.features.winningProducts', included: false },
          { translationKey: 'partnerAgencies.pricing.features.prioritySupport', included: false },
          { translationKey: 'partnerAgencies.pricing.features.socialMediaPromotion', included: false },
          { translationKey: 'partnerAgencies.pricing.features.validity', included: false },
        ],
      },
      {
        tag: 'GOLD',
        tagTranslationKey: 'partnerAgencies.pricing.plans.gold.tag',
        name: 'Gold',
        nameTranslationKey: 'partnerAgencies.pricing.plans.gold.name',
        monthlyPrice: '$120',
        yearlyPrice: '$120',
        pricePeriodTranslationKey: 'partnerAgencies.pricing.plans.gold.period',
        description: '',
        features: [
          { translationKey: 'partnerAgencies.pricing.features.affiliateEarningUnlimited', included: true },
          { translationKey: 'partnerAgencies.pricing.features.dropshippingMarketsAll', included: true },
          { translationKey: 'partnerAgencies.pricing.features.clientReferral', included: true },
          { translationKey: 'partnerAgencies.pricing.features.winningProducts', included: true },
          { translationKey: 'partnerAgencies.pricing.features.prioritySupport', included: true },
          { translationKey: 'partnerAgencies.pricing.features.socialMediaPromotion', included: true },
          { translationKey: 'partnerAgencies.pricing.features.validity1Month', included: true },
        ],
      },
      {
        tag: 'Diamond',
        tagTranslationKey: 'partnerAgencies.pricing.plans.diamond.tag',
        name: 'Diamond',
        nameTranslationKey: 'partnerAgencies.pricing.plans.diamond.name',
        monthlyPrice: '$499',
        yearlyPrice: '$499',
        pricePeriodTranslationKey: 'partnerAgencies.pricing.plans.diamond.period',
        description: '',
        features: [
          { translationKey: 'partnerAgencies.pricing.features.affiliateEarningUnlimited', included: true },
          { translationKey: 'partnerAgencies.pricing.features.dropshippingMarketsAll', included: true },
          { translationKey: 'partnerAgencies.pricing.features.clientReferral', included: true },
          { translationKey: 'partnerAgencies.pricing.features.winningProducts', included: true },
          { translationKey: 'partnerAgencies.pricing.features.prioritySupport', included: true },
          { translationKey: 'partnerAgencies.pricing.features.socialMediaPromotion', included: true },
          { translationKey: 'partnerAgencies.pricing.features.validity6Months', included: true },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    if (initialAgencies !== undefined) return; // already have server data
    fetch('/api/partner-agencies', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setAgencies(data);
        else setAgencies([]);
      })
      .catch(() => setAgencies([]))
      .finally(() => setLoading(false));
  }, [initialAgencies]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setCurrentSlide((prev) => ({ ...prev, [activeAgencyTier]: 0 }));
  }, [activeAgencyTier]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const list = companies[activeAgencyTier] || [];
        const perSlide = isMobile ? 2 : 3;
        const total = Math.ceil(list.length / perSlide);
        if (total <= 1) return prev;
        return {
          ...prev,
          [activeAgencyTier]: (prev[activeAgencyTier] + 1) % total,
        };
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isMobile, companies, activeAgencyTier]);

  const getInitials = (name) =>
    name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  const openDetails = (company, tierKey) => {
    setSelectedCompany(company);
    setSelectedTier(tierKey);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCompany(null);
    setSelectedTier(null);
  };

  const renderTierSection = (tierKey, tierLabel, subtitle) => {
    const list = companies[tierKey] || [];
    const colors = TIER_COLORS[tierKey];
    const perSlideDesktop = 3;
    const perSlideMobile = 2;
    const perSlide = isMobile ? perSlideMobile : perSlideDesktop;
    const totalSlides = Math.ceil(list.length / perSlide);
    const slideIndex = currentSlide[tierKey] % Math.max(1, totalSlides);
    const start = slideIndex * perSlide;
    const displayed = list.slice(start, start + perSlide);

    const goTo = (index) => setCurrentSlide(prev => ({ ...prev, [tierKey]: index % Math.max(1, totalSlides) }));
    const next = () => goTo(slideIndex + 1);
    const prev = () => goTo(slideIndex - 1 + totalSlides);

    if (list.length === 0) {
      return (
        <div className="w-full max-w-6xl mx-auto mb-8 md:mb-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-6 py-14 md:py-16 text-center">
            <div
              className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: `${colors.accent}25`, color: colors.headingColor }}
            >
              {colors.TierIcon && <colors.TierIcon className="w-7 h-7" strokeWidth={1.5} />}
            </div>
            <p className="text-white/50 text-sm md:text-base">{c('noAgenciesInTier', 'No agencies in this tier yet.')}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full max-w-6xl mx-auto mb-8 md:mb-10">
        <div className="text-center mb-6 md:mb-8">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold mb-3 border"
            style={{
              color: colors.headingColor,
              borderColor: `${colors.accent}40`,
              backgroundColor: `${colors.accent}15`,
            }}
          >
            {colors.TierIcon && <colors.TierIcon className="w-4 h-4" strokeWidth={1.75} />}
            {tierLabel}
          </div>
          <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto leading-relaxed">{subtitle}</p>
        </div>

        <div className="py-6 md:py-8">
          {/* Top line: light at sides, full color in middle */}
          <div
            className="w-full h-0.5 mb-6 md:mb-8"
            style={{
              background: `linear-gradient(90deg, ${colors.accent}20 0%, ${colors.accent} 25%, ${colors.accent} 75%, ${colors.accent}20 100%)`,
            }}
          />
          <div className="flex items-stretch gap-3 md:gap-4">
          <button
            onClick={prev}
            className="flex-shrink-0 self-center w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border border-[#22d3ee]/50 text-[#22d3ee] hover:bg-[#22d3ee]/10 transition-colors"
            aria-label={currentLanguage === 'ar' ? 'السابق' : 'Previous'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>

          <div className="flex-1 min-w-0">
            {/* Web: horizontal row of 3 cards */}
            <div className="hidden md:grid grid-cols-3 gap-4">
              {displayed.map((company) => (
                <PartnerCard
                  key={company.id}
                  company={company}
                  accentColor={colors.accent}
                  cardBg={colors.card}
                  cardStyle={colors.cardStyle}
                  TierIcon={colors.TierIcon}
                  tierIconColor={colors.tierIconColor}
                  clickToSeeDetailsLabel={c('clickHereToSeeDetails')}
                  clickDetailsColor={colors.clickDetailsColor}
                  getInitials={getInitials}
                  onTap={(company) => openDetails(company, tierKey)}
                />
              ))}
            </div>
            {/* Mobile: 2 cards stacked vertically (2 rows) */}
            <div className="md:hidden flex flex-col gap-4">
              {displayed.map((company) => (
                <PartnerCard
                  key={company.id}
                  company={company}
                  accentColor={colors.accent}
                  cardBg={colors.card}
                  cardStyle={colors.cardStyle}
                  TierIcon={colors.TierIcon}
                  tierIconColor={colors.tierIconColor}
                  clickToSeeDetailsLabel={c('clickHereToSeeDetails')}
                  clickDetailsColor={colors.clickDetailsColor}
                  getInitials={getInitials}
                  onTap={(company) => openDetails(company, tierKey)}
                  compact
                />
              ))}
            </div>
          </div>

          <button
            onClick={next}
            className="flex-shrink-0 self-center w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border border-[#22d3ee]/50 text-[#22d3ee] hover:bg-[#22d3ee]/10 transition-colors"
            aria-label={currentLanguage === 'ar' ? 'التالي' : 'Next'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
          </div>
          {/* Bottom line: light at sides, full color in middle */}
          <div
            className="w-full h-0.5 mt-6 md:mt-8"
            style={{
              background: `linear-gradient(90deg, ${colors.accent}20 0%, ${colors.accent} 25%, ${colors.accent} 75%, ${colors.accent}20 100%)`,
            }}
          />
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all ${i === slideIndex ? 'w-6 bg-[#22d3ee]' : 'w-2 bg-white/30'}`}
              aria-label={currentLanguage === 'ar' ? `الشريحة ${i + 1}` : `Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div
        className="min-h-screen overflow-x-hidden flex flex-col items-center justify-center gap-4"
        style={{ background: 'linear-gradient(180deg, #0b0f1a 0%, #0f172a 50%, #0b122a 100%)' }}
      >
        <div className="w-10 h-10 rounded-full border-2 border-[#22d3ee]/30 border-t-[#22d3ee] animate-spin" />
        <p className="text-white/60 text-sm">{c('loading', 'Loading partners...')}</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen overflow-x-hidden relative"
      style={{ background: 'linear-gradient(180deg, #0b0f1a 0%, #0f172a 50%, #0b122a 100%)' }}
    >
      <div className="absolute top-24 left-[10%] w-72 h-72 bg-[#3b82f6]/10 rounded-full blur-3xl pointer-events-none" aria-hidden />
      <div className="absolute top-[45%] right-0 w-96 h-96 bg-[#8b5cf6]/8 rounded-full blur-3xl pointer-events-none" aria-hidden />
      <div className="absolute bottom-[20%] left-0 w-80 h-80 bg-[#22d3ee]/5 rounded-full blur-3xl pointer-events-none" aria-hidden />

      <section className="relative pt-24 md:pt-32 pb-8 md:pb-10 px-4 md:px-6 text-center">
        <h1
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-5 md:mb-6 leading-tight"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          <span className="text-white">{c('globalTitlePrefix')} </span>
          <span className="bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
            {c('globalTitle')}
          </span>
        </h1>
        <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
          {c('globalSubtitle')}
        </p>
        <div
          className="w-24 h-1 mx-auto rounded-full mb-8"
          style={{ background: 'linear-gradient(90deg, transparent, #22d3ee, transparent)' }}
        />
        <p className="inline-flex items-center gap-2 text-[#FCD64C] text-sm md:text-base font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#FCD64C] animate-pulse" />
          {c('partnersCount', 'Partners Across 8 Countries')}
        </p>
      </section>

      <section className="relative pb-10 md:pb-14 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-8 md:mb-10">
            <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
              {AGENCY_TIER_TABS.map(({ key, tabLabelKey, Icon, activeClass }) => {
                const isActive = activeAgencyTier === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveAgencyTier(key)}
                    className={`inline-flex items-center gap-2 px-5 md:px-7 py-2.5 md:py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ${
                      isActive
                        ? activeClass
                        : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                    }`}
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    <Icon className="w-4 h-4" strokeWidth={isActive ? 2 : 1.75} />
                    {c(tabLabelKey, key.charAt(0).toUpperCase() + key.slice(1))}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-4 md:p-6">
            {activeAgencyTier === 'gold' && renderTierSection('gold', c('goldPartners'), c('goldSubtitle'))}
            {activeAgencyTier === 'silver' && renderTierSection('silver', c('silverPartners'), c('silverSubtitle'))}
            {activeAgencyTier === 'diamond' && renderTierSection('diamond', c('diamondPartners'), c('diamondSubtitle'))}
          </div>

          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 mt-8 md:mt-10 text-center px-6 py-8 md:py-10">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(36,58,134,0.4) 0%, rgba(59,130,246,0.15) 50%, rgba(139,92,246,0.15) 100%)' }}
              aria-hidden
            />
            <div className="relative z-10">
              <p className="text-white/70 text-sm md:text-base mb-4 max-w-md mx-auto">
                {c('becomePartnerSubtitle', 'Join our global network and start earning with every merchant you onboard.')}
              </p>
              <a
                href={currentLanguage === 'ar' ? 'https://forms.gle/jN9ohywiuXwAZ5hQ6' : 'https://forms.gle/TgCpb8KXjxRpKLG39'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm md:text-base text-white transition-all hover:scale-[1.03] shadow-lg shadow-[#3b82f6]/25"
                style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', fontFamily: 'DM Sans, sans-serif' }}
              >
                {c('becomePartner')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div
        className="max-w-6xl mx-auto px-4 md:px-6 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.3), transparent)' }}
        aria-hidden
      />

      <AgencyWhySection
        getCopy={(key, fallback) => t(`partnerAgencies.whyZambeel.${key}`, fallback)}
      />

      <div
        className="max-w-6xl mx-auto px-4 md:px-6 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(252,214,76,0.25), transparent)' }}
        aria-hidden
      />

      <section className="relative pb-4 md:pb-8 pt-4 md:pt-6">
        <PricingSection
          title={c('pricing.title', 'Agency Partner Plans')}
          subtitle={c('pricing.subtitle', 'Choose your plan · Scale your business · Earn cashback rewards')}
          customPlans={agencyPricingPlans}
        />
        <p className="text-center text-white/80 text-sm md:text-base max-w-3xl mx-auto px-4 -mt-2 pb-8">
          <span className="inline-flex flex-wrap items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            {c('pricing.cashbackPrefix', 'Earn up to')}{' '}
            <span className="font-bold text-[#FCD64C]">{c('pricing.cashbackAmount', '25,000 AED')}</span>{' '}
            {c('pricing.cashbackSuffix', 'in cashback rewards as you grow')} ·{' '}
            <a
              href="https://www.myzambeel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white hover:text-[#FCD64C] transition-colors"
            >
              myzambeel.com
            </a>
          </span>
        </p>
      </section>

      <AgencyFaqSection
        getCopy={(key, fallback) => t(`partnerAgencies.faq.${key}`, fallback)}
      />

      {/* Details modal – dark card style */}
      {showModal && selectedCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={closeModal}>
          <div
            className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            style={{ background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start gap-4 mb-6">
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden p-1.5 ${selectedCompany.logo ? 'bg-white/95' : ''}`} style={!selectedCompany.logo ? { backgroundColor: 'rgba(59, 130, 246, 0.5)' } : undefined}>
                    {selectedCompany.logo ? (
                      <Image src={selectedCompany.logo} alt={selectedCompany.name} width={80} height={80} className="w-full h-full object-contain" unoptimized={selectedCompany.logo?.startsWith('data:') || selectedCompany.logo?.startsWith('/api/')} />
                    ) : (
                      <span className="text-white font-bold text-lg md:text-xl">{getInitials(selectedCompany.name)}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xl md:text-2xl font-bold text-white truncate" style={{ fontFamily: 'DM Sans, sans-serif' }}>{selectedCompany.name}</h2>
                    {selectedCompany.country?.trim() && <p className="text-[#22d3ee] text-sm">{selectedCompany.country}</p>}
                  </div>
                </div>
                <button onClick={closeModal} className="text-white/60 hover:text-white text-2xl leading-none p-1">×</button>
              </div>
              <div className="space-y-4 text-sm md:text-base">
                {selectedCompany.description?.trim() && (
                  <div>
                    <h3 className="text-[#22d3ee] font-semibold mb-1">{c('about')}</h3>
                    <p className="text-white/80 leading-relaxed">{selectedCompany.description.trim()}</p>
                  </div>
                )}
                {selectedCompany.contact?.trim() && (
                  <div>
                    <h3 className="text-[#22d3ee] font-semibold mb-1">{c('contact')}</h3>
                    <p className="text-white/80">{selectedCompany.contact.trim()}</p>
                  </div>
                )}
                {selectedCompany.phone?.trim() && (
                  <div>
                    <h3 className="text-[#22d3ee] font-semibold mb-1">{c('phone')}</h3>
                    <a href={`tel:${selectedCompany.phone.replace(/\s/g, '')}`} className="text-white/80 hover:text-[#22d3ee]" dir="ltr">{selectedCompany.phone.trim()}</a>
                  </div>
                )}
                {selectedCompany.website?.trim() && (
                  <div>
                    <h3 className="text-[#22d3ee] font-semibold mb-1">{c('website')}</h3>
                    <a href={selectedCompany.website.startsWith('http') ? selectedCompany.website : `https://${selectedCompany.website}`} target="_blank" rel="noopener noreferrer" className="text-[#22d3ee] hover:underline break-all" dir="ltr">{selectedCompany.website.trim()}</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PartnerCard({ company, accentColor, cardBg, cardStyle = 'solid', TierIcon, tierIconColor, clickToSeeDetailsLabel, clickDetailsColor, getInitials, onTap, compact }) {
  return (
    <button
      type="button"
      onClick={() => onTap(company)}
      className="group relative w-full text-left rounded-2xl p-4 md:p-6 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:border-[#22d3ee]/40 hover:shadow-xl hover:shadow-[#22d3ee]/10 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#22d3ee]/50 flex flex-col md:items-center md:justify-between min-h-0 md:min-h-[200px]"
      style={cardStyle === 'gradient' ? { background: cardBg } : { backgroundColor: cardBg }}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${accentColor}18, transparent 70%)` }}
        aria-hidden
      />
      {TierIcon && tierIconColor && (
        <div className="absolute top-3 right-3 w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center bg-white/5" style={{ color: tierIconColor }} aria-hidden>
          <TierIcon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
        </div>
      )}

      {/* Mobile: horizontal row (logo left, text right) - fixed logo size + light bg for visibility */}
      <div className="flex items-center gap-3 md:hidden w-full">
        {company.logo ? (
          <div className="w-14 h-14 flex-shrink-0 rounded-lg flex items-center justify-center bg-white/95 p-1.5 overflow-hidden">
            <Image
              src={company.logo}
              alt={company.name}
              width={56}
              height={56}
              className="object-contain w-full h-full"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              unoptimized={company.logo?.startsWith('data:') || company.logo?.startsWith('/api/')}
            />
          </div>
        ) : (
          <div
            className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-sm"
            style={{ backgroundColor: `${accentColor}40` }}
          >
            {getInitials(company.name)}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-white font-semibold truncate text-sm" style={{ fontFamily: 'DM Sans, sans-serif' }}>{company.name}</p>
          {company.country?.trim() && <p className="text-white/60 text-xs">{company.country}</p>}
        </div>
      </div>

      {/* Desktop: centered card layout - fixed logo size + light bg for visibility */}
      <div className="hidden md:flex flex-col items-center w-full flex-1 justify-center">
        <div className="mb-4">
          {company.logo ? (
            <div className="w-[88px] h-[88px] flex-shrink-0 rounded-xl flex items-center justify-center bg-white/95 p-2 overflow-hidden">
              <Image
                src={company.logo}
                alt={company.name}
                width={80}
                height={80}
                className="object-contain w-full h-full"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                unoptimized={company.logo?.startsWith('data:') || company.logo?.startsWith('/api/')}
              />
            </div>
          ) : (
            <div
              className="w-[88px] h-[88px] rounded-xl flex items-center justify-center text-white font-bold text-xl"
              style={{ backgroundColor: `${accentColor}40` }}
            >
              {getInitials(company.name)}
            </div>
          )}
        </div>
        <div className="text-center w-full space-y-1">
          <p className="text-white font-semibold text-lg truncate w-full px-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            {company.name}
          </p>
          {company.country?.trim() && <p className="text-white/60 text-sm">{company.country}</p>}
        </div>
      </div>

      {/* Click here - below on both */}
      {clickToSeeDetailsLabel && (
        <span className="relative mt-3 md:mt-4 text-sm font-medium inline-flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity" style={{ color: clickDetailsColor || '#22d3ee' }}>
          {clickToSeeDetailsLabel}
          <svg className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </span>
      )}
    </button>
  );
}

export default PartnerAgenciesPage;
