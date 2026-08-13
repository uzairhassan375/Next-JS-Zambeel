#!/usr/bin/env node
/**
 * One-time fix: replace broken internal links inside blog HTML (MongoDB).
 * Run: node scripts/fix-broken-blog-links.mjs
 */
import mongoose from 'mongoose';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

function loadEnvFile(name) {
  try {
    const raw = readFileSync(resolve(root, name), 'utf8');
    for (const line of raw.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    // optional file
  }
}

loadEnvFile('.env.local');
loadEnvFile('.env');

const BLOG_SLUG = 'e-commerce-the-complete-guide-to-building-a-profitable-online-business-in-2026';

const REPLACEMENTS = [
  [
    /\/blog\/dropshipping-in-qatar-the-complete-remote-sellers-market-guide/g,
    '/ar/blog/dropshipping-in-qatar-the-complete-remote-seller-s-market-guide',
  ],
  [
    /https:\/\/www\.myzambeel\.com\/blog\/dropshipping-in-qatar-the-complete-remote-sellers-market-guide/g,
    'https://www.myzambeel.com/ar/blog/dropshipping-in-qatar-the-complete-remote-seller-s-market-guide',
  ],
  [/\/pages\/contact-us/g, '/about'],
  [/https:\/\/www\.myzambeel\.com\/pages\/contact-us/g, 'https://www.myzambeel.com/about'],
];

function applyReplacements(html) {
  if (!html) return html;
  let out = html;
  for (const [pattern, replacement] of REPLACEMENTS) {
    out = out.replace(pattern, replacement);
  }
  return out;
}

const blogSchema = new mongoose.Schema(
  {
    slug: String,
    contentEn: String,
    contentAr: String,
  },
  { strict: false },
);

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI not set');
    process.exit(1);
  }

  await mongoose.connect(uri);
  const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
  const doc = await Blog.findOne({ slug: BLOG_SLUG });

  if (!doc) {
    console.log(`Blog not found: ${BLOG_SLUG}`);
    await mongoose.disconnect();
    process.exit(0);
  }

  const nextEn = applyReplacements(doc.contentEn);
  const nextAr = applyReplacements(doc.contentAr);

  if (nextEn === doc.contentEn && nextAr === doc.contentAr) {
    console.log('No link changes needed (already fixed or patterns not found).');
  } else {
    doc.contentEn = nextEn;
    doc.contentAr = nextAr;
    await doc.save();
    console.log(`Updated broken links in blog: ${BLOG_SLUG}`);
  }

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
