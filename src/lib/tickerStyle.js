/** Shared ticker style defaults & helpers (admin + public). */

export const TICKER_BAR_PRESETS = [
  { label: 'Zambeel Blue', value: '#2E3B78' },
  { label: 'Gold Yellow', value: '#FCD64C' },
  { label: 'Deep Navy', value: '#1a234d' },
  { label: 'Orange', value: '#FF9900' },
  { label: 'Emerald', value: '#059669' },
  { label: 'Rose', value: '#E11D48' },
  { label: 'Violet', value: '#7C3AED' },
  { label: 'Black', value: '#111827' },
  { label: 'White', value: '#FFFFFF' },
];

export const TICKER_SEPARATORS = [
  { label: 'Dot •', value: '•' },
  { label: 'Star ★', value: '★' },
  { label: 'Diamond ◆', value: '◆' },
  { label: 'Sparkle ✦', value: '✦' },
  { label: 'Fire 🔥', value: '🔥' },
  { label: 'Pipe |', value: '|' },
  { label: 'Dash —', value: '—' },
];

export const TICKER_BAR_EFFECTS = [
  { id: 'none', label: 'None' },
  { id: 'pulse', label: 'Pulse' },
  { id: 'glow', label: 'Glow' },
  { id: 'shine', label: 'Shine sweep' },
];

export const TICKER_SPEED_MIN = 20;
export const TICKER_SPEED_MAX = 120;
export const TICKER_SPEED_DEFAULT = 50;

export const DEFAULT_TICKER_STYLE = {
  barColor: '#2E3B78',
  textColor: '#FFFFFF',
  speed: TICKER_SPEED_DEFAULT,
  separator: '•',
  showGradient: true,
  pauseOnHover: true,
  barEffect: 'none',
  fontScale: 'md',
  uppercase: false,
  emojiPrefix: '',
};

/** Pages that traditionally use yellow bars */
const YELLOW_DEFAULT_IDS = new Set([
  'learn-ecommerce-main',
  'learn-ecommerce-price',
  'dropshipping',
  'dropshipping-usa',
  'zambeel360',
  'zambeel3pl',
  'amazon-usa',
]);

/** Yellow bars that used navy text (not pure black) */
const YELLOW_NAVY_TEXT_IDS = new Set(['learn-ecommerce-main', 'learn-ecommerce-price']);

export function getDefaultStyleForPageId(pageId) {
  if (YELLOW_DEFAULT_IDS.has(pageId)) {
    return {
      ...DEFAULT_TICKER_STYLE,
      barColor: '#FCD64C',
      textColor: YELLOW_NAVY_TEXT_IDS.has(pageId) ? '#2E3B78' : '#000000',
      showGradient: pageId === 'learn-ecommerce-main',
      speed: pageId === 'learn-ecommerce-price' ? 40 : TICKER_SPEED_DEFAULT,
    };
  }
  return { ...DEFAULT_TICKER_STYLE };
}

export function normalizeHexColor(value, fallback = '#2E3B78') {
  if (!value || typeof value !== 'string') return fallback;
  let hex = value.trim();
  if (!hex.startsWith('#')) hex = `#${hex}`;
  if (/^#[0-9A-Fa-f]{3}$/.test(hex)) {
    hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  }
  if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) return fallback;
  return hex.toUpperCase();
}

export function hexToRgbArray(hex) {
  const h = normalizeHexColor(hex);
  return [
    parseInt(h.slice(1, 3), 16),
    parseInt(h.slice(3, 5), 16),
    parseInt(h.slice(5, 7), 16),
  ];
}

/** Pick readable default text color for a bar background */
export function contrastTextColor(barColor) {
  const [r, g, b] = hexToRgbArray(barColor);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? '#000000' : '#FFFFFF';
}

export function clampSpeed(speed) {
  const n = Number(speed);
  if (!Number.isFinite(n)) return TICKER_SPEED_DEFAULT;
  return Math.min(TICKER_SPEED_MAX, Math.max(TICKER_SPEED_MIN, Math.round(n)));
}

export function normalizeTickerStyle(partial = {}, pageId = '') {
  const defaults = getDefaultStyleForPageId(pageId);
  const barColor = normalizeHexColor(partial.barColor ?? defaults.barColor, defaults.barColor);
  const textColor = normalizeHexColor(
    partial.textColor ?? defaults.textColor ?? contrastTextColor(barColor),
    contrastTextColor(barColor)
  );
  const barEffect = TICKER_BAR_EFFECTS.some((e) => e.id === partial.barEffect)
    ? partial.barEffect
    : defaults.barEffect;
  const separator =
    typeof partial.separator === 'string' && partial.separator.length > 0
      ? partial.separator.slice(0, 4)
      : defaults.separator;
  const fontScale = ['sm', 'md', 'lg'].includes(partial.fontScale)
    ? partial.fontScale
    : defaults.fontScale;

  return {
    barColor,
    textColor,
    speed: clampSpeed(partial.speed ?? defaults.speed),
    separator,
    showGradient: partial.showGradient !== undefined ? Boolean(partial.showGradient) : defaults.showGradient,
    pauseOnHover: partial.pauseOnHover !== undefined ? Boolean(partial.pauseOnHover) : defaults.pauseOnHover,
    barEffect,
    fontScale,
    uppercase: Boolean(partial.uppercase ?? defaults.uppercase),
    emojiPrefix: typeof partial.emojiPrefix === 'string' ? partial.emojiPrefix.slice(0, 8) : '',
  };
}

export function fontScaleClass(scale) {
  if (scale === 'sm') return 'text-xs md:text-sm';
  if (scale === 'lg') return 'text-base md:text-lg';
  return 'text-sm md:text-base';
}

export function barEffectClass(effect) {
  if (effect === 'pulse') return 'ticker-bar-pulse';
  if (effect === 'glow') return 'ticker-bar-glow';
  if (effect === 'shine') return 'ticker-bar-shine';
  return '';
}
