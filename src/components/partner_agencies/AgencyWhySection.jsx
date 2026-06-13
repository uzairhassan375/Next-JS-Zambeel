'use client';

import { Wallet, Users, Package, LayoutGrid, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PORTAL_URL = 'https://portal.myzambeel.com/login';

const FEATURE_ICONS = [Wallet, Users, Package, LayoutGrid];

const CARD_ACCENTS = [
  { iconBg: 'bg-[#22d3ee]/15', iconColor: 'text-[#22d3ee]', borderHover: 'hover:border-[#22d3ee]/40', glow: 'group-hover:shadow-[#22d3ee]/10' },
  { iconBg: 'bg-[#FCD64C]/20', iconColor: 'text-[#b8860b]', borderHover: 'hover:border-[#FCD64C]/50', glow: 'group-hover:shadow-[#FCD64C]/10' },
  { iconBg: 'bg-[#243a86]/10', iconColor: 'text-[#243a86]', borderHover: 'hover:border-[#243a86]/30', glow: 'group-hover:shadow-[#243a86]/10' },
  { iconBg: 'bg-[#8b5cf6]/15', iconColor: 'text-[#7c3aed]', borderHover: 'hover:border-[#8b5cf6]/40', glow: 'group-hover:shadow-[#8b5cf6]/10' },
];

const STAT_KEYS = ['earnings', 'dashboard', 'commission'];

export default function AgencyWhySection({ getCopy }) {
  const { t } = useTranslation();
  const c = getCopy || ((key, fallback = '') => t(`partnerAgencies.whyZambeel.${key}`, fallback));

  const features = [
    { titleKey: 'features.income.title', descKey: 'features.income.desc' },
    { titleKey: 'features.dashboard.title', descKey: 'features.dashboard.desc' },
    { titleKey: 'features.commission.title', descKey: 'features.commission.desc' },
    { titleKey: 'features.unified.title', descKey: 'features.unified.desc' },
  ];

  return (
    <section className="relative px-4 md:px-6 py-14 md:py-16 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(59, 130, 246, 0.12) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#22d3ee]/40 text-[#22d3ee] text-xs md:text-sm mb-5">
            {c('badge', 'Partner Benefits')}
          </div>
          <h2
            className="text-2xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            {c('title', 'Why with')}{' '}
            <span className="bg-gradient-to-r from-[#3b82f6] to-[#a855f7] bg-clip-text text-transparent">
              {c('titleHighlight', 'Zambeel')}
            </span>
          </h2>
          <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {c(
              'subtitle',
              'Turn your merchant network into recurring revenue with commissions, unified dashboards, and enterprise-grade dropshipping infrastructure.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-8 md:mb-10">
          {STAT_KEYS.map((key, i) => (
            <div
              key={key}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-5 text-center transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20"
            >
              <p
                className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#FCD64C] to-[#fbbf24] bg-clip-text text-transparent mb-1"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                {c(`stats.${key}.value`)}
              </p>
              <p className="text-white/50 text-xs md:text-sm">{c(`stats.${key}.label`)}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {features.map((feature, index) => {
            const Icon = FEATURE_ICONS[index];
            const accent = CARD_ACCENTS[index];
            return (
              <div
                key={feature.titleKey}
                className={`group bg-white rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-lg border border-white/10 flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${accent.borderHover} ${accent.glow}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${accent.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className={`w-6 h-6 md:w-7 md:h-7 ${accent.iconColor}`} strokeWidth={1.75} />
                  </div>
                  <span
                    className="text-[11px] font-bold text-gray-300 tabular-nums"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3
                  className="text-base md:text-lg font-bold text-gray-900 mb-2 leading-snug"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  {c(feature.titleKey)}
                </h3>
                <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed flex-1">
                  {c(feature.descKey)}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
          <a
            href={PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-3.5 rounded-full font-semibold text-sm md:text-base text-white transition-all hover:scale-[1.03] shadow-lg shadow-[#3b82f6]/25"
            style={{
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            {c('portalCta', 'Sign up here')}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
