import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    titleEn: { type: String, required: true },
    titleAr: { type: String, default: '' },
    descriptionEn: { type: String, default: '' },
    descriptionAr: { type: String, default: '' },
    metaTitleEn: { type: String, default: '' },
    metaTitleAr: { type: String, default: '' },
    metaDescriptionEn: { type: String, default: '' },
    metaDescriptionAr: { type: String, default: '' },
    image: { type: String, default: '' }, // Default/English thumbnail: base64 or external URL
    imageAr: { type: String, default: '' }, // Arabic thumbnail: base64 or external URL
    contentEn: { type: String, default: '' },
    contentAr: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);
