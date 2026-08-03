export function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Google accepts W3C date (YYYY-MM-DD) or full datetime for lastmod */
export function formatLastMod(date) {
  if (!date) return null;
  const parsed = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString().slice(0, 10);
}

export function buildUrlsetXml(entries) {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ];

  for (const entry of entries) {
    lines.push('  <url>');
    lines.push(`    <loc>${escapeXml(entry.url)}</loc>`);

    if (entry.alternates?.languages) {
      for (const [lang, href] of Object.entries(entry.alternates.languages)) {
        lines.push(
          `    <xhtml:link rel="alternate" hreflang="${escapeXml(lang)}" href="${escapeXml(href)}" />`,
        );
      }
    }

    const lastMod = formatLastMod(entry.lastModified);
    if (lastMod) {
      lines.push(`    <lastmod>${lastMod}</lastmod>`);
    }

    if (entry.changeFrequency) {
      lines.push(`    <changefreq>${escapeXml(entry.changeFrequency)}</changefreq>`);
    }

    if (entry.priority != null) {
      lines.push(`    <priority>${entry.priority}</priority>`);
    }

    lines.push('  </url>');
  }

  lines.push('</urlset>');
  return `${lines.join('\n')}\n`;
}

export function buildSitemapIndexXml(sitemaps) {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '  <!-- Parent sitemap linking to pages and blog sub-sitemaps. Generated dynamically. -->',
  ];

  for (const sitemap of sitemaps) {
    lines.push('  <sitemap>');
    lines.push(`    <loc>${escapeXml(sitemap.loc)}</loc>`);

    const lastMod = formatLastMod(sitemap.lastModified);
    if (lastMod) {
      lines.push(`    <lastmod>${lastMod}</lastmod>`);
    }

    lines.push('  </sitemap>');
  }

  lines.push('</sitemapindex>');
  return `${lines.join('\n')}\n`;
}

export function xmlResponse(body) {
  const isDev = process.env.NODE_ENV === 'development';

  return new Response(body, {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': isDev
        ? 'no-store, no-cache, must-revalidate'
        : 'public, max-age=3600, s-maxage=3600',
    },
  });
}
