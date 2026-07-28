/**
 * How many blogs the homepage shows per viewport.
 * Shared by the admin selection screen, the APIs and the homepage itself.
 */
export const HOMEPAGE_WEB_LIMIT = 5;
export const HOMEPAGE_MOBILE_LIMIT = 2;

export const HOMEPAGE_SELECTION_KEY = 'home';

/** Keep only valid, unique slugs and cap the list at `limit`. */
export function normalizeSlugList(value, limit) {
  if (!Array.isArray(value)) return [];
  const seen = new Set();
  const out = [];
  for (const raw of value) {
    const slug = typeof raw === 'string' ? raw.trim() : '';
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    out.push(slug);
    if (out.length >= limit) break;
  }
  return out;
}

/**
 * Order blogs by the selected slugs, dropping slugs that no longer exist
 * (deleted or switched to draft). Falls back to `blogs` order when nothing
 * is selected so a fresh install still shows content.
 */
export function pickSelectedBlogs(blogs, slugs, limit) {
  const list = Array.isArray(blogs) ? blogs : [];
  const selected = normalizeSlugList(slugs, limit);
  if (selected.length === 0) return list.slice(0, limit);
  const bySlug = new Map(list.map((blog) => [blog.slug, blog]));
  return selected.map((slug) => bySlug.get(slug)).filter(Boolean).slice(0, limit);
}
