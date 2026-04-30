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
  },
  { timestamps: true }
);

export default mongoose.models.TickerSetting || mongoose.model('TickerSetting', tickerSettingSchema);
