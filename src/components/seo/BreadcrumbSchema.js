import { getCanonicalUrl } from '../../lib/seo';

/**
 * BreadcrumbList JSON-LD.
 * @param {{ items: Array<{ name: string, path: string }>, locale: 'en'|'ar' }} props
 *   `path` is the locale-less site path, e.g. '/blog'.
 */
export default function BreadcrumbSchema({ items = [], locale = 'en' }) {
  if (!items.length) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.path, locale),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
  );
}
