export const BUSINESS_INFO = {
  name: 'MyZambeel',
  url: 'https://www.myzambeel.com',
  streetAddress: '160 Robinson Rd, #14-04 Singapore Business Federation Center',
  addressLocality: 'Singapore',
  postalCode: '068914',
  addressCountry: 'SG',
  fullAddress:
    '160 Robinson Rd, #14-04 Singapore Business Federation Center, Singapore 068914',
};

export function getLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BUSINESS_INFO.name,
    url: BUSINESS_INFO.url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.streetAddress,
      addressLocality: BUSINESS_INFO.addressLocality,
      postalCode: BUSINESS_INFO.postalCode,
      addressCountry: BUSINESS_INFO.addressCountry,
    },
  };
}
