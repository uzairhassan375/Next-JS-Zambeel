'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Gem, Crown, Medal } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PricingSection from '../components/PricingSection';
import AgencyWhySection from '../components/partner_agencies/AgencyWhySection';
import AgencyFaqSection from '../components/partner_agencies/AgencyFaqSection';
import AgencyLogoTicker from '../components/partner_agencies/AgencyLogoTicker';

const PARTNER_PORTAL_URL = 'https://portal.myzambeel.com/login';

const PAGE_BG =
  'linear-gradient(186.57deg, rgba(18, 75, 61, 0.75) 5.1%, rgba(31, 46, 100, 0.958277) 12.51%, rgba(28, 54, 89, 0.911419) 31.95%, rgba(22, 81, 66, 0.793286) 47.98%, rgba(51, 88, 140, 0.913498) 70.93%, #4A61C4 81.76%)';

const AGENCY_TIER_TABS = [
  { key: 'diamond', tabLabelKey: 'tabs.diamond', Icon: Gem, activeClass: 'bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white shadow-[0_6px_20px_rgba(59,130,246,0.35)]' },
  { key: 'gold', tabLabelKey: 'tabs.gold', Icon: Crown, activeClass: 'bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#1a1a2e] shadow-[0_6px_20px_rgba(251,191,36,0.35)]' },
  { key: 'silver', tabLabelKey: 'tabs.silver', Icon: Medal, activeClass: 'bg-gradient-to-r from-[#cbd5e1] to-[#94a3b8] text-[#1e293b] shadow-[0_6px_20px_rgba(148,163,184,0.35)]' },
];

const TIER_COLORS = {
  diamond: { accent: '#3b82f6', card: '#eff6ff', cardStyle: 'solid', label: 'text-[#2563eb]', headingColor: '#2563eb', clickDetailsColor: '#2563eb', TierIcon: Gem, tierIconColor: '#3b82f6' },
  gold: {
    accent: '#f59e0b',
    card: '#fffbeb',
    cardStyle: 'solid',
    label: 'text-[#b45309]',
    headingColor: '#b45309',
    clickDetailsColor: '#b45309',
    TierIcon: Crown,
    tierIconColor: '#f59e0b',
  },
  silver: { accent: '#94a3b8', card: '#f8fafc', cardStyle: 'solid', label: 'text-[#64748b]', headingColor: '#64748b', clickDetailsColor: '#64748b', TierIcon: Medal, tierIconColor: '#94a3b8' },
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
  const [activeAgencyTier, setActiveAgencyTier] = useState('diamond');

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

  const renderTierBadge = (tierKey, tierLabel) => {
    const colors = TIER_COLORS[tierKey];
    return (
      <div className="text-center mb-4 md:mb-6">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold border"
          style={{
            color: colors.headingColor,
            borderColor: `${colors.accent}40`,
            backgroundColor: `${colors.accent}15`,
          }}
        >
          {colors.TierIcon && <colors.TierIcon className="w-4 h-4" strokeWidth={1.75} />}
          {tierLabel}
        </div>
      </div>
    );
  };

  const renderTierContent = (tierKey, tierLabel) => {
    const list = companies[tierKey] || [];
    const colors = TIER_COLORS[tierKey];

    if (list.length === 0) {
      return (
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {renderTierBadge(tierKey, tierLabel)}
          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-14 md:py-16 text-center">
            <div
              className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: `${colors.accent}20`, color: colors.headingColor }}
            >
              {colors.TierIcon && <colors.TierIcon className="w-7 h-7" strokeWidth={1.5} />}
            </div>
            <p className="text-gray-500 text-sm md:text-base">{c('noAgenciesInTier', 'No agencies in this tier yet.')}</p>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="max-w-6xl mx-auto px-4 md:px-6">{renderTierBadge(tierKey, tierLabel)}</div>
        <AgencyLogoTicker
          companies={list}
          onLogoClick={(company) => openDetails(company, tierKey)}
          getInitials={getInitials}
        />
      </>
    );
  };

  if (loading) {
    return (
      <div
        className="min-h-screen overflow-x-hidden flex flex-col items-center justify-center gap-4 -mt-20 pt-20"
        style={{ background: PAGE_BG }}
      >
        <div className="w-10 h-10 rounded-full border-2 border-white/30 border-t-white animate-spin" />
        <p className="text-white/80 text-sm">{c('loading', 'Loading partners...')}</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen overflow-x-hidden relative -mt-20 pt-20"
      style={{ background: PAGE_BG }}
    >
      <div className="absolute left-[3%] top-[30%] hidden md:block pointer-events-none">
        <svg width="80" height="93" viewBox="0 0 106 124" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-1.68109e-06 55.9593C-4.18271e-06 84.5745 20.406 124 23.039 124C30.2799 106.195 106 95.3848 106 74.4002C106 48.3289 84.2674 5.72947e-06 84.2674 5.72947e-06C53.3291 29.8871 3.20237e-07 33.0668 -1.68109e-06 55.9593Z" fill="#F4D03F" fillOpacity="0.3" />
        </svg>
      </div>
      <div className="absolute right-[3%] top-[40%] hidden md:block pointer-events-none">
        <svg width="100" height="110" viewBox="0 0 106 124" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-1.68109e-06 55.9593C-4.18271e-06 84.5745 20.406 124 23.039 124C30.2799 106.195 106 95.3848 106 74.4002C106 48.3289 84.2674 5.72947e-06 84.2674 5.72947e-06C53.3291 29.8871 3.20237e-07 33.0668 -1.68109e-06 55.9593Z" fill="#F4D03F" fillOpacity="0.3" />
        </svg>
      </div>

      <section className="relative pt-24 md:pt-28 pb-8 md:pb-10 px-4 md:px-6 text-center overflow-hidden">
        <h1
          className="text-[28px] md:text-[44px] lg:text-[52px] font-bold mb-5 md:mb-6 leading-tight text-white"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          {c('globalTitlePrefix')}{' '}
          <span className="text-[#FCD64C]">{c('globalTitle')}</span>
        </h1>
        <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
          {c('globalSubtitle')}
        </p>
        <a
          href={PARTNER_PORTAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm md:text-base text-[#243a86] bg-[#ffd24c] hover:bg-[#ffc933] transition-all hover:scale-[1.03] shadow-lg mb-8"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          {c('applyNow', 'Apply Now')}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </a>
      </section>

      <section className="relative pb-10 md:pb-14">
        <div className="max-w-6xl mx-auto px-4 md:px-6 mb-8 md:mb-10">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-white/95 backdrop-blur-md border border-white/60 shadow-lg">
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
                        : 'text-[#2E3B78]/50 hover:text-[#2E3B78] hover:bg-gray-100'
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
        </div>

        {activeAgencyTier === 'diamond' && renderTierContent('diamond', c('diamondPartners'))}
        {activeAgencyTier === 'gold' && renderTierContent('gold', c('goldPartners'))}
        {activeAgencyTier === 'silver' && renderTierContent('silver', c('silverPartners'))}
      </section>

      <div
        className="max-w-6xl mx-auto px-4 md:px-6 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)' }}
        aria-hidden
      />

      <AgencyWhySection
        getCopy={(key, fallback) => t(`partnerAgencies.whyZambeel.${key}`, fallback)}
      />

      <div
        className="max-w-6xl mx-auto px-4 md:px-6 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)' }}
        aria-hidden
      />

      <section className="relative pb-4 md:pb-8 pt-4 md:pt-6">
        <PricingSection
          title={c('pricing.title', 'Agency Plans')}
          subtitle={c('pricing.subtitle', 'Choose your plan · Scale your business · Earn cashback rewards')}
          customPlans={agencyPricingPlans}
          ctaLabelKey="partnerAgencies.applyNow"
          ctaHref={PARTNER_PORTAL_URL}
        />
      </section>

      <AgencyFaqSection
        getCopy={(key, fallback) => t(`partnerAgencies.faq.${key}`, fallback)}
      />

      {/* Details modal */}
      {showModal && selectedCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={closeModal}>
          <div
            className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start gap-4 mb-6">
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden p-1.5 ${selectedCompany.logo ? 'bg-gray-50 border border-gray-100' : ''}`} style={!selectedCompany.logo ? { backgroundColor: 'rgba(59, 130, 246, 0.15)' } : undefined}>
                    {selectedCompany.logo ? (
                      <Image src={selectedCompany.logo} alt={selectedCompany.name} width={80} height={80} className="w-full h-full object-contain" unoptimized={selectedCompany.logo?.startsWith('data:') || selectedCompany.logo?.startsWith('/api/')} />
                    ) : (
                      <span className="text-[#2E3B78] font-bold text-lg md:text-xl">{getInitials(selectedCompany.name)}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xl md:text-2xl font-bold text-[#2E3B78] truncate" style={{ fontFamily: 'DM Sans, sans-serif' }}>{selectedCompany.name}</h2>
                    {selectedCompany.country?.trim() && <p className="text-[#3b82f6] text-sm">{selectedCompany.country}</p>}
                  </div>
                </div>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-2xl leading-none p-1">×</button>
              </div>
              <div className="space-y-4 text-sm md:text-base">
                {selectedCompany.description?.trim() && (
                  <div>
                    <h3 className="text-[#2E3B78] font-semibold mb-1">{c('about')}</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedCompany.description.trim()}</p>
                  </div>
                )}
                {selectedCompany.contact?.trim() && (
                  <div>
                    <h3 className="text-[#2E3B78] font-semibold mb-1">{c('contact')}</h3>
                    <p className="text-gray-600">{selectedCompany.contact.trim()}</p>
                  </div>
                )}
                {selectedCompany.phone?.trim() && (
                  <div>
                    <h3 className="text-[#2E3B78] font-semibold mb-1">{c('phone')}</h3>
                    <a href={`tel:${selectedCompany.phone.replace(/\s/g, '')}`} className="text-gray-600 hover:text-[#3b82f6]" dir="ltr">{selectedCompany.phone.trim()}</a>
                  </div>
                )}
                {selectedCompany.website?.trim() && (
                  <div>
                    <h3 className="text-[#2E3B78] font-semibold mb-1">{c('website')}</h3>
                    <a href={selectedCompany.website.startsWith('http') ? selectedCompany.website : `https://${selectedCompany.website}`} target="_blank" rel="noopener noreferrer" className="text-[#3b82f6] hover:underline break-all" dir="ltr">{selectedCompany.website.trim()}</a>
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

export default PartnerAgenciesPage;
