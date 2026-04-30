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
    status: { type: String, enum: ['draft', 'published'], default: 'published', index: true },
    sortOrder: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

const BlogModel = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

// In dev, Next.js hot-reload can keep an old compiled model in memory.
// Ensure new fields exist on the active schema so updates persist reliably.
if (!BlogModel.schema.path('status')) {
  BlogModel.schema.add({
    status: { type: String, enum: ['draft', 'published'], default: 'published', index: true },
  });
}
if (!BlogModel.schema.path('sortOrder')) {
  BlogModel.schema.add({
    sortOrder: { type: Number, default: 0, index: true },
  });
}

export default BlogModel;
