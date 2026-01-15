'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const RefundReplacementPolicyPage = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';
  const [activeTab, setActiveTab] = useState('customers');

  return (
    <div className="min-h-screen bg-[#FBFCFE] py-8 md:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#2E3B78] mb-8 text-center">
          {t('refundReplacement.title')}
        </h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b-2 border-gray-200">
          <button
            onClick={() => setActiveTab('customers')}
            className={`px-6 py-3 font-semibold text-lg transition-all ${
              activeTab === 'customers'
                ? 'text-[#2E3B78] border-b-2 border-[#2E3B78] -mb-[2px]'
                : 'text-gray-500 hover:text-[#2E3B78]'
            }`}
          >
            {t('refundReplacement.tabs.customers')}
          </button>
          <button
            onClick={() => setActiveTab('resellers')}
            className={`px-6 py-3 font-semibold text-lg transition-all ${
              activeTab === 'resellers'
                ? 'text-[#2E3B78] border-b-2 border-[#2E3B78] -mb-[2px]'
                : 'text-gray-500 hover:text-[#2E3B78]'
            }`}
          >
            {t('refundReplacement.tabs.resellers')}
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
          {activeTab === 'customers' ? (
            <div className="space-y-6">
              {/* Intro */}
              <p className="text-gray-700 leading-relaxed">
                {t('refundReplacement.customers.intro')}
              </p>

              {/* Effective Date */}
              <p className="text-sm text-gray-600 font-semibold">
                {t('refundReplacement.customers.effectiveDate')}
              </p>

              {/* Thank You */}
              <p className="text-gray-700 leading-relaxed">
                {t('refundReplacement.customers.thankYou')}
              </p>

              {/* Replacement Eligibility */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-[#2E3B78]">
                  {t('refundReplacement.customers.replacementEligibility')}
                </h2>

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-[#2E3B78]">
                    {t('refundReplacement.customers.productEligibility')}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t('refundReplacement.customers.productEligibilityDesc')}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-[#2E3B78]">
                    {t('refundReplacement.customers.timeframe')}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t('refundReplacement.customers.timeframeDesc')}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {t('refundReplacement.customers.timeframeDesc2')}
                  </p>
                </div>
              </div>

              {/* Replacement Process */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-[#2E3B78]">
                  {t('refundReplacement.customers.replacementProcess')}
                </h2>

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-[#2E3B78]">
                    {t('refundReplacement.customers.initiation')}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t('refundReplacement.customers.initiationDesc')}
                  </p>
                </div>

                {/* Option A */}
                <div className="bg-[#F0F8FF] rounded-lg p-6 space-y-3 border-l-4 border-[#2E3B78]">
                  <h3 className="text-lg font-bold text-[#2E3B78]">
                    {t('refundReplacement.customers.optionA')}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t('refundReplacement.customers.optionADesc')}
                  </p>
                  <p className="text-gray-700 font-semibold bg-white p-3 rounded">
                    {t('refundReplacement.customers.warehouseAddress')}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {t('refundReplacement.customers.optionADesc2')}
                  </p>
                </div>

                {/* Option B */}
                <div className="bg-[#FFF7E0] rounded-lg p-6 space-y-3 border-l-4 border-[#FCD64C]">
                  <h3 className="text-lg font-bold text-[#2E3B78]">
                    {t('refundReplacement.customers.optionB')}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t('refundReplacement.customers.optionBDesc')}
                  </p>
                </div>

                <p className="text-gray-700 leading-relaxed italic">
                  {t('refundReplacement.customers.note')}
                </p>
              </div>

              {/* Refund */}
              <div className="space-y-3 border-t-2 border-gray-200 pt-6">
                <h2 className="text-2xl font-bold text-[#2E3B78]">
                  {t('refundReplacement.customers.refund')}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('refundReplacement.customers.refundDesc')}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Effective Date */}
              <p className="text-sm text-gray-600 font-semibold">
                {t('refundReplacement.resellers.effectiveDate')}
              </p>

              {/* Thank You */}
              <p className="text-gray-700 leading-relaxed">
                {t('refundReplacement.resellers.thankYou')}
              </p>

              {/* Recommendation */}
              <p className="text-gray-700 leading-relaxed">
                {t('refundReplacement.resellers.recommendation')}
              </p>

              {/* Product Listing */}
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-[#2E3B78]">
                  {t('refundReplacement.resellers.productListing')}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('refundReplacement.resellers.productListingDesc')}
                </p>
              </div>

              {/* Warehousing Service */}
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-[#2E3B78]">
                  {t('refundReplacement.resellers.warehousingService')}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('refundReplacement.resellers.warehousingServiceDesc')}
                </p>
              </div>

              {/* Refund and Replacement */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-[#2E3B78]">
                  {t('refundReplacement.resellers.refundAndReplacement')}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('refundReplacement.resellers.refundAndReplacementDesc')}
                </p>

                <p className="text-gray-700 leading-relaxed">
                  {t('refundReplacement.resellers.customizedPolicy')}
                </p>

                {/* Replacement Non-Faulty */}
                <div className="bg-[#F0F8FF] rounded-lg p-6 space-y-3 border-l-4 border-[#2E3B78]">
                  <h3 className="text-lg font-bold text-[#2E3B78]">
                    {t('refundReplacement.resellers.replacementNonFaulty')}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t('refundReplacement.resellers.replacementNonFaultyDesc')}
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>{t('refundReplacement.resellers.uae')}</li>
                    <li>{t('refundReplacement.resellers.ksa')}</li>
                  </ul>
                </div>

                {/* Refund */}
                <div className="bg-[#FFF7E0] rounded-lg p-6 space-y-3 border-l-4 border-[#FCD64C]">
                  <h3 className="text-lg font-bold text-[#2E3B78]">
                    {t('refundReplacement.resellers.refund')}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t('refundReplacement.resellers.refundDesc')}
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>{t('refundReplacement.resellers.fulfillmentCost')}</li>
                    <li>{t('refundReplacement.resellers.pickupCost')}</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed italic mt-3">
                    {t('refundReplacement.resellers.refundNote')}
                  </p>
                </div>

                {/* Special Case Refund */}
                <div className="bg-[#F3F4F6] rounded-lg p-6 space-y-3">
                  <h3 className="text-lg font-bold text-[#2E3B78]">
                    {t('refundReplacement.resellers.specialCaseRefund')}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t('refundReplacement.resellers.specialCaseRefundDesc')}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RefundReplacementPolicyPage;
