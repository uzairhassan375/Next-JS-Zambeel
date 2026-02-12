import mongoose from 'mongoose';

const pageMetaSchema = new mongoose.Schema(
  {
    pageId: { type: String, required: true, unique: true },
    metaTitleEn: { type: String, default: '' },
    metaTitleAr: { type: String, default: '' },
    metaDescriptionEn: { type: String, default: '' },
    metaDescriptionAr: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.PageMeta || mongoose.model('PageMeta', pageMetaSchema);
