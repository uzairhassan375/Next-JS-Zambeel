import mongoose from 'mongoose';

const partnerAgencySchema = new mongoose.Schema(
  {
    tier: { type: String, required: true, enum: ['diamond', 'gold', 'silver'] },
    order: { type: Number, default: 0 },
    nameEn: { type: String, required: true },
    nameAr: { type: String, default: '' },
    countryEn: { type: String, default: '' },
    countryAr: { type: String, default: '' },
    descriptionEn: { type: String, default: '' },
    descriptionAr: { type: String, default: '' },
    contact: { type: String, default: '' },
    phone: { type: String, default: '' },
    website: { type: String, default: '' },
    logo: { type: String, default: '' }, // base64 data URL or external URL
  },
  { timestamps: true }
);

export default mongoose.models.PartnerAgency || mongoose.model('PartnerAgency', partnerAgencySchema);
