'use client';

import { useTranslation } from 'react-i18next';

export default function TermsOfServicePage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <div className="min-h-screen bg-[#FBFCFE] pt-24 md:pt-28 pb-8 md:pb-16 px-4" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2E3B78] mb-8 text-center" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          {t('termsOfService.pageTitle')}
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-6">{t('termsOfService.intro1')}</p>
          <p className="text-gray-700 leading-relaxed mb-6">{t('termsOfService.intro2')}</p>
          <p className="text-gray-700 leading-relaxed mb-8 font-semibold">{t('termsOfService.acceptanceNotice')}</p>

          <h2 className="text-2xl font-bold text-[#2E3B78] mt-10 mb-4">{t('termsOfService.recitalsTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            {isArabic ? t('termsOfService.whereas1') : (<><strong>WHEREAS</strong> {t('termsOfService.whereas1')}</>)}
          </p>
          <p className="text-gray-700 leading-relaxed mb-3">
            {isArabic ? t('termsOfService.whereas2') : (<><strong>WHEREAS</strong> {t('termsOfService.whereas2')}</>)}
          </p>
          <p className="text-gray-700 leading-relaxed mb-3">
            {isArabic ? t('termsOfService.whereas3') : (<><strong>WHEREAS</strong> {t('termsOfService.whereas3')}</>)}
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            {isArabic ? t('termsOfService.whereas4') : (<><strong>WHEREAS</strong> {t('termsOfService.whereas4')}</>)}
          </p>
          <p className="text-gray-700 leading-relaxed mb-8 font-semibold">{t('termsOfService.nowTherefore')}</p>

          <h2 className="text-2xl font-bold text-[#2E3B78] mt-10 mb-4">{t('termsOfService.definitionsTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{t('termsOfService.definitionsIntro')}</p>
          <p className="text-gray-700 leading-relaxed mb-2 ml-4"><strong>&quot;Confidential Information&quot;</strong> {t('termsOfService.confidentialInfo')}</p>
          <p className="text-gray-700 leading-relaxed mb-2 ml-4"><strong>&quot;Customer&quot;</strong> {t('termsOfService.customerDef')}</p>
          <p className="text-gray-700 leading-relaxed mb-2 ml-4"><strong>&quot;Effective Date&quot;</strong> {t('termsOfService.effectiveDateDef')}</p>
          <p className="text-gray-700 leading-relaxed mb-6 ml-4"><strong>&quot;Products&quot;</strong> {t('termsOfService.productsDef')}</p>

          <h2 className="text-2xl font-bold text-[#2E3B78] mt-10 mb-4">{t('termsOfService.kycTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-3">2.1. <strong>{t('termsOfService.labels.complianceWithLaws')}</strong> {t('termsOfService.complianceWithLaws')}</p>
          <p className="text-gray-700 leading-relaxed mb-3">2.2. <strong>{t('termsOfService.labels.recordKeeping')}</strong> {t('termsOfService.recordKeeping')}</p>
          <p className="text-gray-700 leading-relaxed mb-3">2.3. <strong>{t('termsOfService.labels.reportingObligations')}</strong> {t('termsOfService.reportingObligations')}</p>
          <p className="text-gray-700 leading-relaxed mb-3">2.4. <strong>{t('termsOfService.labels.auditAndInspection')}</strong> {t('termsOfService.auditAndInspection')}</p>
          <p className="text-gray-700 leading-relaxed mb-3">2.5. <strong>{t('termsOfService.labels.fraudulentActivity')}</strong> {t('termsOfService.fraudulentActivity')}</p>
          <p className="text-gray-700 leading-relaxed mb-3">2.6. <strong>{t('termsOfService.labels.sanctionsCompliance')}</strong> {t('termsOfService.sanctionsCompliance')}</p>
          <p className="text-gray-700 leading-relaxed mb-6">2.7. <strong>{t('termsOfService.labels.breachAndTermination')}</strong> {t('termsOfService.breachAndTermination')}</p>

          <h2 className="text-2xl font-bold text-[#2E3B78] mt-10 mb-4">{t('termsOfService.ordersTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-3">3.1. <strong>{t('termsOfService.labels.orderPlacement')}</strong> {t('termsOfService.orderPlacement')}</p>
          <p className="text-gray-700 leading-relaxed mb-3 bg-yellow-200 bg-opacity-60 py-2 px-3 rounded border-l-4 border-yellow-500">3.2. <strong>{t('termsOfService.labels.invoice')}</strong> {t('termsOfService.invoice')}</p>
          <p className="text-gray-700 leading-relaxed mb-3">3.3. <strong>{t('termsOfService.labels.orderFulfillment')}</strong> {t('termsOfService.orderFulfillment')}</p>
          <p className="text-gray-700 leading-relaxed mb-6">3.4. <strong>{t('termsOfService.labels.liability')}</strong> {t('termsOfService.liability')}</p>

          <h2 className="text-2xl font-bold text-[#2E3B78] mt-10 mb-4">{t('termsOfService.compensationTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-6 bg-yellow-200 bg-opacity-60 py-2 px-3 rounded border-l-4 border-yellow-500">{t('termsOfService.compensation')}</p>

          <h2 className="text-2xl font-bold text-[#2E3B78] mt-10 mb-4">{t('termsOfService.refundsTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-3"><strong>5.1.</strong> {t('termsOfService.refunds51')}</p>
          <p className="text-gray-700 leading-relaxed mb-6"><strong>5.2.</strong> {t('termsOfService.refunds52')}</p>

          <h2 className="text-2xl font-bold text-[#2E3B78] mt-10 mb-4">{t('termsOfService.customerSupportTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-3">6.1. <strong>{t('termsOfService.labels.provisionOfSupport')}</strong> {t('termsOfService.provisionOfSupport')}</p>
          <p className="text-gray-700 leading-relaxed mb-6">6.2. <strong>{t('termsOfService.labels.reportingAndFeedback')}</strong> {t('termsOfService.reportingAndFeedback')}</p>

          <h2 className="text-2xl font-bold text-[#2E3B78] mt-10 mb-4">{t('termsOfService.crossBorderTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-3">7.1. <strong>{t('termsOfService.labels.internationalPayments')}</strong> {t('termsOfService.internationalPayments')}</p>
          <p className="text-gray-700 leading-relaxed mb-3">7.2. <strong>{t('termsOfService.labels.domesticPayments')}</strong> {t('termsOfService.domesticPayments')}</p>
          <p className="text-gray-700 leading-relaxed mb-3">7.3. <strong>{t('termsOfService.labels.complianceAndSecurity')}</strong> {t('termsOfService.complianceAndSecurity')}</p>
          <p className="text-gray-700 leading-relaxed mb-6">7.4. <strong>{t('termsOfService.labels.notificationOfChanges')}</strong> {t('termsOfService.notificationOfChanges')}</p>

          <h2 className="text-2xl font-bold text-[#2E3B78] mt-10 mb-4">{t('termsOfService.exchangeRatesTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-3">8.1. <strong>{t('termsOfService.labels.exchangeRates')}</strong> {t('termsOfService.exchangeRates')}</p>
          <p className="text-gray-700 leading-relaxed mb-3">8.2. <strong>{t('termsOfService.labels.transactionFees')}</strong> {t('termsOfService.transactionFees')}</p>
          <p className="text-gray-700 leading-relaxed mb-3">8.3. <strong>{t('termsOfService.labels.transparency')}</strong> {t('termsOfService.transparency')}</p>
          <p className="text-gray-700 leading-relaxed mb-6">8.4. <strong>{t('termsOfService.labels.acknowledgment')}</strong> {t('termsOfService.acknowledgment')}</p>

          <h2 className="text-2xl font-bold text-[#2E3B78] mt-10 mb-4">{t('termsOfService.taxTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-3">9.1. <strong>{t('termsOfService.labels.complianceWithTaxLaws')}</strong> {t('termsOfService.complianceWithTaxLaws')}</p>
          <p className="text-gray-700 leading-relaxed mb-3">9.2. <strong>{t('termsOfService.labels.taxOnServices')}</strong> {t('termsOfService.taxOnServices')}</p>
          <p className="text-gray-700 leading-relaxed mb-3">9.3. <strong>{t('termsOfService.labels.invoicingAndTax')}</strong> {t('termsOfService.invoicingAndTax')}</p>
          <p className="text-gray-700 leading-relaxed mb-6">9.4. <strong>{t('termsOfService.labels.indemnificationTax')}</strong> {t('termsOfService.indemnificationTax')}</p>

          <h2 className="text-2xl font-bold text-[#2E3B78] mt-10 mb-4">{t('termsOfService.dataProtectionTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-3">10.1. <strong>{t('termsOfService.labels.dataProtectionCommitment')}</strong> {t('termsOfService.dataProtectionCommitment')}</p>
          <p className="text-gray-700 leading-relaxed mb-3">10.2. <strong>{t('termsOfService.labels.complianceWithLocalLaws')}</strong> {t('termsOfService.complianceWithLocalLaws')}</p>
          <p className="text-gray-700 leading-relaxed mb-3">10.3. <strong>{t('termsOfService.labels.securityMeasures')}</strong> {t('termsOfService.securityMeasures')}</p>
          <p className="text-gray-700 leading-relaxed mb-3">10.4. <strong>{t('termsOfService.labels.confidentiality')}</strong> {t('termsOfService.confidentiality')}</p>
          <p className="text-gray-700 leading-relaxed mb-3">10.5. <strong>{t('termsOfService.labels.notificationOfBreaches')}</strong> {t('termsOfService.notificationOfBreaches')}</p>
          <p className="text-gray-700 leading-relaxed mb-3">10.6. <strong>{t('termsOfService.labels.indemnification')}</strong> {t('termsOfService.indemnification')}</p>
          <p className="text-gray-700 leading-relaxed mb-6">10.7. <strong>{t('termsOfService.labels.termOfDataRetention')}</strong> {t('termsOfService.termOfDataRetention')}</p>

          <h2 className="text-2xl font-bold text-[#2E3B78] mt-10 mb-4">{t('termsOfService.termAndTerminationTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-3">11.1. <strong>{t('termsOfService.labels.term')}</strong> {t('termsOfService.term')}</p>
          <p className="text-gray-700 leading-relaxed mb-6">11.2. <strong>{t('termsOfService.labels.termination')}</strong> {t('termsOfService.termination')}</p>

          <h2 className="text-2xl font-bold text-[#2E3B78] mt-10 mb-4">{t('termsOfService.confidentialityTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-3">12.1. <strong>{t('termsOfService.labels.confidentialInfo')}</strong> {t('termsOfService.confidentialInfoClause')}</p>
          <p className="text-gray-700 leading-relaxed mb-3">12.2. <strong>{t('termsOfService.labels.obligationOfConfidentiality')}</strong> {t('termsOfService.obligationOfConfidentiality')}</p>
          <p className="text-gray-700 leading-relaxed mb-2 ml-4"><strong>12.2.1.</strong> {t('termsOfService.conf121')}</p>
          <p className="text-gray-700 leading-relaxed mb-2 ml-4"><strong>12.2.2.</strong> {t('termsOfService.conf122')}</p>
          <p className="text-gray-700 leading-relaxed mb-2 ml-4"><strong>12.2.3.</strong> {t('termsOfService.conf123')}</p>
          <p className="text-gray-700 leading-relaxed mb-3 ml-4"><strong>12.2.4.</strong> {t('termsOfService.conf124')}</p>
          <p className="text-gray-700 leading-relaxed mb-3">12.3. <strong>{t('termsOfService.labels.exceptions')}</strong> {t('termsOfService.exceptions')}</p>
          <p className="text-gray-700 leading-relaxed mb-2 ml-4"><strong>12.3.1.</strong> {t('termsOfService.conf131')}</p>
          <p className="text-gray-700 leading-relaxed mb-2 ml-4"><strong>12.3.2.</strong> {t('termsOfService.conf132')}</p>
          <p className="text-gray-700 leading-relaxed mb-6 ml-4"><strong>12.3.3.</strong> {t('termsOfService.conf133')}</p>

          <h2 className="text-2xl font-bold text-[#2E3B78] mt-10 mb-4">{t('termsOfService.generalProvisionsTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-3">13.1. <strong>{t('termsOfService.labels.governingLaw')}</strong> {t('termsOfService.governingLaw')}</p>
          <p className="text-gray-700 leading-relaxed mb-3">13.2. <strong>{t('termsOfService.labels.disputeResolution')}</strong> {t('termsOfService.disputeResolution')}</p>
          <p className="text-gray-700 leading-relaxed mb-3">13.3. <strong>{t('termsOfService.labels.notices')}</strong> {t('termsOfService.notices')}</p>
          <p className="text-gray-700 leading-relaxed mb-3">13.4. <strong>{t('termsOfService.labels.amendmentAndWaiver')}</strong> {t('termsOfService.amendmentAndWaiver')}</p>
          <p className="text-gray-700 leading-relaxed mb-3">13.5. <strong>{t('termsOfService.labels.severability')}</strong> {t('termsOfService.severability')}</p>
          <p className="text-gray-700 leading-relaxed mb-8">13.6. <strong>{t('termsOfService.labels.entireAgreement')}</strong> {t('termsOfService.entireAgreement')}</p>

          <h2 className="text-2xl font-bold text-[#2E3B78] mt-10 mb-4">{t('termsOfService.electronicAcceptanceTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{t('termsOfService.electronicAcceptance')}</p>

          <h2 className="text-2xl font-bold text-[#2E3B78] mt-10 mb-4">{t('termsOfService.noPhysicalSignatureTitle')}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{t('termsOfService.resellerAcknowledges')}</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
            <li>{t('termsOfService.noSignature1')}</li>
            <li>{t('termsOfService.noSignature2')}</li>
            <li>{t('termsOfService.noSignature3')}</li>
          </ul>

          <p className="text-gray-700 leading-relaxed mb-6 font-semibold">{t('termsOfService.inWitness')}</p>
          <p className="text-gray-700 leading-relaxed">{t('termsOfService.agentSignature')}</p>
        </div>
      </div>
    </div>
  );
}
