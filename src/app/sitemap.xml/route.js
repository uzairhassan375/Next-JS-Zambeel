import { getSitemapIndexEntries } from '../../lib/sitemapEntries';
import { buildSitemapIndexXml, xmlResponse } from '../../lib/sitemapXml';

export const dynamic = 'force-dynamic';

export async function GET() {
  const sitemaps = await getSitemapIndexEntries();
  return xmlResponse(buildSitemapIndexXml(sitemaps));
}
