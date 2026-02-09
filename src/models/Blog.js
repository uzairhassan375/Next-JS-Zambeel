import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    titleEn: { type: String, required: true },
    titleAr: { type: String, default: '' },
    descriptionEn: { type: String, default: '' },
    descriptionAr: { type: String, default: '' },
    image: { type: String, default: '' }, // Stores base64 data URL or external URL
    contentEn: { type: String, default: '' },
    contentAr: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);
