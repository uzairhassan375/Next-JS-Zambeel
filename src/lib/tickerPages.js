export const TICKER_PAGES = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'dropshipping', label: 'Dropshipping', path: '/pages/dropshipping-uae-and-ksa' },
  { id: 'zambeel360', label: 'Zambeel 360', path: '/pages/zambeel-360' },
  { id: 'zambeel3pl', label: 'Zambeel 3PL', path: '/pages/warehousing-3pl' },
];

export const DEFAULT_TICKER_TEXT_EN = "Try Gold subscription Risk-FREE — achieve a small monthly target and we'll return your $69.";
export const DEFAULT_TICKER_TEXT_AR = 'جرّب اشتراك Gold بدون مخاطر — حقّق هدفًا شهريًا صغيرًا وسنُعيد لك مبلغ 69 دولارًا.';

export function getDefaultTickerItem(pageId) {
  const page = TICKER_PAGES.find((p) => p.id === pageId);
  return {
    pageId,
    label: page?.label || pageId,
    path: page?.path || '',
    textEn: DEFAULT_TICKER_TEXT_EN,
    textAr: DEFAULT_TICKER_TEXT_AR,
    isBold: false,
    isUnderline: false,
    isHighlight: false,
    isBlink: false,
  };
}
