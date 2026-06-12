import { getLocalBusinessJsonLd } from '../../lib/businessInfo';

export default function LocalBusinessSchema() {
  const jsonLd = getLocalBusinessJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
  );
}
