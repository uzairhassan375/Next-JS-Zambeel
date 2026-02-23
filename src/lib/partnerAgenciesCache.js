/**
 * In-memory cache for public partner agencies list.
 * Same data for all users; invalidate when admin adds/updates/deletes.
 * Cache entries store { data, timestamp } so we can check staleness via DB.
 */

let cachedPublicList = null;

export function getCachedPartnerAgencies() {
  return cachedPublicList?.data ?? cachedPublicList;
}

export function setCachedPartnerAgencies(data) {
  cachedPublicList = data;
}

export function invalidatePartnerAgenciesCache() {
  cachedPublicList = null;
}

/**
 * Returns cached list if present and not stale, otherwise calls fetcher(), caches and returns.
 * @param {() => Promise<Array>} fetcher - async function that returns the agencies array
 * @param {((cacheTimestamp: number) => Promise<boolean>)|null} checkStale - if provided, called with cache timestamp; return true to force refetch (e.g. newer data in DB)
 * @returns {Promise<Array>}
 */
export async function getCachedOrFetch(fetcher, checkStale = null) {
  if (cachedPublicList != null) {
    const cacheEntry = cachedPublicList.data !== undefined ? cachedPublicList : { data: cachedPublicList, timestamp: 0 };
    const data = cacheEntry.data;
    const timestamp = cacheEntry.timestamp || 0;
    if (checkStale && timestamp) {
      const stale = await checkStale(timestamp);
      if (stale) {
        cachedPublicList = null;
      } else {
        return data;
      }
    } else if (!checkStale) {
      return data;
    }
  }
  const data = await fetcher();
  cachedPublicList = { data, timestamp: Date.now() };
  return data;
}
