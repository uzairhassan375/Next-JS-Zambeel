export const TICKER_PAGES = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'learn-ecommerce-main', label: 'Learn Ecommerce - Main Ticker', path: '/learn-ecommerce' },
  { id: 'learn-ecommerce-price', label: 'Learn Ecommerce - Price Ticker', path: '/learn-ecommerce' },
  { id: 'dropshipping', label: 'Dropshipping', path: '/pages/dropshipping-uae-and-ksa' },
  { id: 'zambeel360', label: 'Zambeel 360', path: '/pages/zambeel-360' },
  { id: 'zambeel3pl', label: 'Zambeel 3PL', path: '/pages/warehousing-3pl' },
];

export const DEFAULT_TICKER_TEXT_EN = "Try Gold subscription Risk-FREE — achieve a small monthly target and we'll return your $69.";
export const DEFAULT_TICKER_TEXT_AR = 'جرّب اشتراك Gold بدون مخاطر — حقّق هدفًا شهريًا صغيرًا وسنُعيد لك مبلغ 69 دولارًا.';

export function getDefaultTickerItem(pageId) {
  const page = TICKER_PAGES.find((p) => p.id === pageId);
  const isLearnMain = pageId === 'learn-ecommerce-main';
  const isLearnPrice = pageId === 'learn-ecommerce-price';

  const textEn = isLearnMain
    ? 'Starts 27th March 2026 · Live Online'
    : isLearnPrice
      ? 'Starts 27th March 2026 · Live Online · $50 Only'
      : DEFAULT_TICKER_TEXT_EN;
  const textAr = isLearnMain
    ? 'يبدأ في 27 مارس 2026 · بث مباشر عبر الإنترنت'
    : isLearnPrice
      ? 'يبدأ في 27 مارس 2026 · بث مباشر عبر الإنترنت · فقط 50 دولار'
      : DEFAULT_TICKER_TEXT_AR;

  return {
    pageId,
    label: page?.label || pageId,
    path: page?.path || '',
    textEn,
    textAr,
    isBold: false,
    isUnderline: false,
    isHighlight: false,
    isBlink: false,
  };
}
