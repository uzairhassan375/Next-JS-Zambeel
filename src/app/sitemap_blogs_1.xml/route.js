import { getBlogSitemapEntries } from '../../lib/sitemapEntries';
import { buildUrlsetXml, xmlResponse } from '../../lib/sitemapXml';

export const dynamic = 'force-dynamic';

export async function GET() {
  const entries = await getBlogSitemapEntries();
  return xmlResponse(buildUrlsetXml(entries));
}
