import mongoose from 'mongoose';

const tickerSettingSchema = new mongoose.Schema(
  {
    pageId: { type: String, required: true, unique: true, index: true },
    textEn: { type: String, default: '' },
    textAr: { type: String, default: '' },
    isBold: { type: Boolean, default: false },
    isUnderline: { type: Boolean, default: false },
    isHighlight: { type: Boolean, default: false },
    isBlink: { type: Boolean, default: false },
    // Visual / attention settings
    barColor: { type: String, default: '#2E3B78' },
    textColor: { type: String, default: '#FFFFFF' },
    speed: { type: Number, default: 50 },
    separator: { type: String, default: '•' },
    showGradient: { type: Boolean, default: true },
    pauseOnHover: { type: Boolean, default: true },
    barEffect: { type: String, default: 'none' }, // none | pulse | glow | shine
    fontScale: { type: String, default: 'md' }, // sm | md | lg
    uppercase: { type: Boolean, default: false },
    emojiPrefix: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.TickerSetting || mongoose.model('TickerSetting', tickerSettingSchema);
