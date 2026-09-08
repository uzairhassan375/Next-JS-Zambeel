export const BUSINESS_INFO = {
  name: 'MyZambeel',
  legalName: 'Tazah technologies PTE LTD',
  licenseNumber: '202131566W',
  url: 'https://www.myzambeel.com',
  logo: 'https://www.myzambeel.com/blue_logo.png',
  streetAddress: '160 ROBINSON ROAD, #14-04, SINGAPORE BUSINESS FEDERATION CENTER',
  addressLocality: 'Singapore',
  postalCode: '068914',
  addressCountry: 'SG',
  fullAddress:
    '160 ROBINSON ROAD, #14-04, SINGAPORE BUSINESS FEDERATION CENTER, SINGAPORE 068914',
  warehouseAddress:
    '17440 West Little York Rd, SUITE A, Houston, Texas 77084, United States of America',
  // Public profiles, mirroring the links in Footer.jsx
  sameAs: [
    'https://www.instagram.com/zambeel.ecommerce',
    'https://www.facebook.com/share/1CHT3yCtCm/',
    'https://www.linkedin.com/company/myzambeel/',
  ],
};

export function getLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BUSINESS_INFO.name,
    url: BUSINESS_INFO.url,
    logo: BUSINESS_INFO.logo,
    image: BUSINESS_INFO.logo,
    sameAs: BUSINESS_INFO.sameAs,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.streetAddress,
      addressLocality: BUSINESS_INFO.addressLocality,
      postalCode: BUSINESS_INFO.postalCode,
      addressCountry: BUSINESS_INFO.addressCountry,
    },
  };
}

/**
 * Organization node used as the publisher/author for site content.
 * Shares the '#organization' @id so other schemas (BlogPosting) can reference it.
 */
export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BUSINESS_INFO.url}/#organization`,
    name: BUSINESS_INFO.name,
    url: BUSINESS_INFO.url,
    logo: {
      '@type': 'ImageObject',
      url: BUSINESS_INFO.logo,
    },
    sameAs: BUSINESS_INFO.sameAs,
  };
}
