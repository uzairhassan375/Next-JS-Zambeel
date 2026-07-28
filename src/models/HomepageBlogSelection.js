import mongoose from 'mongoose';

/**
 * Single settings document holding which blogs the homepage shows.
 * Slugs are stored in display order; an empty list means "fall back to the
 * most recent blogs" so the homepage never renders empty.
 */
const homepageBlogSelectionSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: 'home', index: true },
    webSlugs: { type: [String], default: [] },
    mobileSlugs: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.HomepageBlogSelection ||
  mongoose.model('HomepageBlogSelection', homepageBlogSelectionSchema);
