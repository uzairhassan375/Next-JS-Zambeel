import { getDefaultStyleForPageId, normalizeTickerStyle } from './tickerStyle';

export const TICKER_PAGES = [
  { id: 'home', label: 'Home', path: '/', pageGroup: 'Home' },
  {
    id: 'learn-ecommerce-main',
    label: 'Main Ticker',
    path: '/learn-ecommerce',
    pageGroup: 'Learn Ecommerce',
  },
  {
    id: 'learn-ecommerce-price',
    label: 'Price Ticker',
    path: '/learn-ecommerce',
    pageGroup: 'Learn Ecommerce',
  },
  {
    id: 'dropshipping',
    label: 'Gold Risk-Free Ticker',
    path: '/pages/dropshipping-uae-and-ksa',
    pageGroup: 'Dropshipping (UAE & KSA)',
  },
  {
    id: 'dropshipping-usa',
    label: 'USA Announcement Ticker',
    path: '/pages/dropshipping-uae-and-ksa',
    pageGroup: 'Dropshipping (UAE & KSA)',
  },
  {
    id: 'zambeel360',
    label: 'Main Ticker',
    path: '/pages/zambeel-360',
    pageGroup: 'Zambeel 360',
  },
  {
    id: 'zambeel3pl',
    label: 'Main Ticker',
    path: '/pages/warehousing-3pl',
    pageGroup: 'Warehousing 3PL',
  },
  {
    id: 'amazon-usa',
    label: 'Main Ticker',
    path: '/pages/amazon-usa',
    pageGroup: 'Amazon USA',
  },
];

/** Unique page groups for admin page picker */
export function getTickerPageGroups() {
  const map = new Map();
  for (const page of TICKER_PAGES) {
    const key = page.pageGroup || page.path;
    if (!map.has(key)) {
      map.set(key, {
        group: key,
        path: page.path,
        tickers: [],
      });
    }
    map.get(key).tickers.push(page);
  }
  return Array.from(map.values());
}

export const DEFAULT_TICKER_TEXT_EN =
  "Try Gold subscription Risk-FREE — achieve a small monthly target and we'll return your $79.";
export const DEFAULT_TICKER_TEXT_AR =
  'جرّب اشتراك Gold بدون مخاطر — حقّق هدفًا شهريًا صغيرًا وسنُعيد لك مبلغ 79 دولارًا.';

const USA_PRODUCTS_URL_EN = 'https://products.myzambeel.com/collections/all-usa-products';
const USA_PRODUCTS_URL_AR = 'https://products.myzambeel.com/ar/collections/all-usa-products';

export const DEFAULT_DROPSHIPPING_USA_TICKER_EN = `USA Dropshipping is now live! Check out our trending products. <a href="${USA_PRODUCTS_URL_EN}" title="Click here" class="ticker-link" data-ticker-underline="true" data-ticker-underline-color="#000000" style="text-decoration: underline rgb(0, 0, 0); text-underline-offset: 2px; text-decoration-skip-ink: none;"><span style="color: rgb(0, 0, 0);">Click here</span></a>.`;

export const DEFAULT_DROPSHIPPING_USA_TICKER_AR = `خدمة الشحن المباشر من الولايات المتحدة متاحة الآن! اطلع على منتجاتنا الرائجة. <a href="${USA_PRODUCTS_URL_AR}" title="اضغط هنا" class="ticker-link" data-ticker-underline="true" data-ticker-underline-color="#000000" style="text-decoration: underline rgb(0, 0, 0); text-underline-offset: 2px; text-decoration-skip-ink: none;"><span style="color: rgb(0, 0, 0);">اضغط هنا</span></a>`;

export const DEFAULT_AMAZON_USA_TICKER_EN =
  'Amazon USA Gold Plan — Your shortcut from zero to a scaled Amazon business. Talk to an agent today!';

export const DEFAULT_AMAZON_USA_TICKER_AR =
  'خطة أمازون USA الذهبية — طريقك المختصر من الصفر إلى أعمال أمازون متوسعة. تحدث مع مستشار اليوم!';

export function getDefaultTickerItem(pageId) {
  const page = TICKER_PAGES.find((p) => p.id === pageId);
  const isLearnMain = pageId === 'learn-ecommerce-main';
  const isLearnPrice = pageId === 'learn-ecommerce-price';
  const isDropshippingUsa = pageId === 'dropshipping-usa';
  const isAmazonUsa = pageId === 'amazon-usa';

  const textEn = isLearnMain
    ? 'Starts 27th March 2026 · Live Online'
    : isLearnPrice
      ? 'Starts 27th March 2026 · Live Online · $50 Only'
      : isDropshippingUsa
        ? DEFAULT_DROPSHIPPING_USA_TICKER_EN
        : isAmazonUsa
          ? DEFAULT_AMAZON_USA_TICKER_EN
          : DEFAULT_TICKER_TEXT_EN;
  const textAr = isLearnMain
    ? 'يبدأ في 27 مارس 2026 · بث مباشر عبر الإنترنت'
    : isLearnPrice
      ? 'يبدأ في 27 مارس 2026 · بث مباشر عبر الإنترنت · فقط 50 دولار'
      : isDropshippingUsa
        ? DEFAULT_DROPSHIPPING_USA_TICKER_AR
        : isAmazonUsa
          ? DEFAULT_AMAZON_USA_TICKER_AR
          : DEFAULT_TICKER_TEXT_AR;

  const style = getDefaultStyleForPageId(pageId);

  return {
    pageId,
    label: page?.label || pageId,
    path: page?.path || '',
    pageGroup: page?.pageGroup || page?.path || '',
    textEn,
    textAr,
    isBold: false,
    isUnderline: false,
    isHighlight: false,
    isBlink: false,
    ...style,
  };
}

export function mergeTickerFields(pageId, saved = {}) {
  const defaults = getDefaultTickerItem(pageId);
  const style = normalizeTickerStyle(
    {
      barColor: saved.barColor,
      textColor: saved.textColor,
      speed: saved.speed,
      separator: saved.separator,
      showGradient: saved.showGradient,
      pauseOnHover: saved.pauseOnHover,
      barEffect: saved.barEffect,
      fontScale: saved.fontScale,
      uppercase: saved.uppercase,
      emojiPrefix: saved.emojiPrefix,
    },
    pageId
  );

  return {
    ...defaults,
    textEn: saved.textEn ?? defaults.textEn,
    textAr: saved.textAr ?? defaults.textAr,
    isBold: saved.isBold === true,
    isUnderline: saved.isUnderline === true,
    isHighlight: saved.isHighlight === true,
    isBlink: saved.isBlink === true,
    ...style,
  };
}
