'use client';

import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Info } from 'lucide-react';
import PricingCard from "./PricingCard";
import { pricingPlans as defaultPricingPlans } from "../data/pricingPlans";

// --- Main Pricing Section Component ---
const PricingSection = ({ 
  title = "Clear Pricing. Great Value.",
  subtitle = "Click on any plan to see full details and features.",
  defaultActiveIndex = null,
  customPlans = null 
}) => {
  const { t } = useTranslation();
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Use custom plans if provided, otherwise use default
  const plans = customPlans || defaultPricingPlans;
  
  // Find the index of "GOLD" to set it as the default active card on mobile, or use provided default
  const goldIndex = plans.findIndex(plan => plan.tag === "GOLD");
  const premiumIndex = plans.findIndex(plan => plan.tag === "Premium");
  const initialActiveIndex = defaultActiveIndex !== null 
    ? defaultActiveIndex 
    : (goldIndex !== -1 ? goldIndex : (premiumIndex !== -1 ? premiumIndex : 0));
  
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  // Detect desktop view - only on client side after mount
  useEffect(() => {
    setMounted(true);
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  return (
    <section
      className="w-full mx-auto py-8 md:py-8 px-4 sm:px-6 md:px-8"
      style={{
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div className="max-w-[1050px] mx-auto text-center">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-4 text-white">
          {mounted && isDesktop ? title : (title === "Clear Pricing. Great Value." || title === "Our pricing is clear and transparent" ? "Choose your plan" : title)}
        </h2>
        <p className="text-white text-opacity-80 mb-8 text-sm sm:text-base">
          {mounted && isDesktop ? subtitle : (subtitle === "Click on any plan to see full details and features." ? "Swipe or Tap to explore our pricing options" : subtitle)}
        </p>

        {/* Card Layout - Vertical on mobile, horizontal on desktop */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-6 items-center justify-center w-full max-w-7xl mx-auto relative">
          {plans.map((plan, idx) => {
            const middleIndex = Math.floor(plans.length / 2);
            const isMiddle = idx === middleIndex;
            const isActiveCard = mounted && isDesktop ? true : activeIndex === idx;
            return (
            <div key={idx} className="relative w-full md:w-auto flex flex-col items-center">
              <PricingCard
                plan={plan}
                isActive={isActiveCard}
                onClick={() => setActiveIndex(idx)}
                isLast={idx === plans.length - 1}
                isMiddle={isMiddle}
                cardIndex={idx}
              />
              {/* Terms and conditions notice - shown below active card on mobile, hidden on desktop */}
              {!isDesktop && isActiveCard && (
                <div className="mt-4 w-full flex items-center justify-center px-4">
                  <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
                    <Info className="w-3.5 h-3.5 shrink-0 text-[#ffd24c]" />
                    <p className="text-xs font-normal text-center text-white" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      {t('pricing.nonRefundable')}
                    </p>
                  </div>
                </div>
              )}
            </div>
            );
          })}
        </div>
        
        {/* Terms and conditions notice - shown once for all plans on desktop only */}
        <div className="hidden md:flex mt-6 md:mt-8 w-full items-center justify-center px-4">
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2 md:px-4 md:py-2.5 border border-white/10">
            <Info className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0 text-[#ffd24c]" />
            <p className="text-xs md:text-sm font-normal text-center text-white" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {t('pricing.nonRefundable')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

