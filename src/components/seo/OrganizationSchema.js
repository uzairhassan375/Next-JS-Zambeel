import { getOrganizationJsonLd } from '../../lib/businessInfo';

export default function OrganizationSchema() {
  const jsonLd = getOrganizationJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
  );
}
