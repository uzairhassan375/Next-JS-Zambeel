/**
 * Utility functions for locale-aware routing
 */

/**
 * Get the locale-aware path for a given route
 * @param {string} path - The path (e.g., '/about', '/blog', '/')
 * @param {string} currentPathname - Current pathname from usePathname()
 * @returns {string} - Locale-aware path (e.g., '/ar/about' if on Arabic, '/about' if on English)
 */
export function getLocalePath(path, currentPathname) {
  // Check if we're currently on an Arabic route
  const isArabic = currentPathname && currentPathname.startsWith('/ar');
  
  // If path is already absolute with /ar, return as is
  if (path.startsWith('/ar')) {
    return path;
  }
  
  // If path is external (http/https/mailto/#), return as is
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('mailto:') || path.startsWith('#')) {
    return path;
  }
  
  // Handle homepage
  if (path === '/' || path === '') {
    return isArabic ? '/ar' : '/';
  }
  
  // Remove leading slash for processing
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // If we're on Arabic route, prefix with /ar
  if (isArabic) {
    return `/ar/${cleanPath}`;
  }
  
  // Otherwise, return with leading slash
  return `/${cleanPath}`;
}

/**
 * Get the equivalent path in the other language, so the language switcher can
 * render a real crawlable <a href> instead of a JS-only handler.
 * @param {string} pathname - Current pathname from usePathname()
 * @param {'en' | 'ar'} lang - Target language
 * @returns {string} - Path for the same page in `lang`
 */
export function getLanguageSwitchPath(pathname, lang) {
  const currentPath = pathname || '/';

  if (lang === 'ar') {
    if (currentPath.startsWith('/ar')) return currentPath;
    if (currentPath === '/') return '/ar';
    const pathWithoutSlash = currentPath.startsWith('/') ? currentPath.slice(1) : currentPath;
    return `/ar/${pathWithoutSlash}`;
  }

  if (currentPath === '/ar') return '/';
  if (currentPath.startsWith('/ar/')) return currentPath.replace(/^\/ar/, '') || '/';
  return currentPath;
}

/**
 * Get current locale from pathname
 * @param {string} pathname - Current pathname
 * @returns {'en' | 'ar'} - Current locale
 */
export function getLocaleFromPath(pathname) {
  return pathname.startsWith('/ar') ? 'ar' : 'en';
}

