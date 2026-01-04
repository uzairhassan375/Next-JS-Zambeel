// Import all blog data files
import { zambeelDropshippingBlog } from './zambeel-dropshipping';
import { zambeel360Blog } from './zambeel-360';
import { warehousing3plBlog } from './warehousing-3pl';

// Export all blogs as an object keyed by slug
export const blogs = {
  'zambeel-dropshipping': zambeelDropshippingBlog,
  'zambeel-360': zambeel360Blog,
  'warehousing-3pl': warehousing3plBlog,
  // Keep old slugs for backward compatibility
  'cash-on-delivery': {
    slug: 'cash-on-delivery',
    titleKey: 'about.whyZambeel.features.cod.title',
    descKey: 'about.whyZambeel.features.cod.desc',
    img: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FzaCUyMG9uJTIwZGVsaXZlcnl8ZW58MHwxfDB8fHww',
    contentKey: 'blog.cod.content',
  },
  'ai-enabled-economy': {
    slug: 'ai-enabled-economy',
    titleKey: 'about.whyZambeel.features.ai.title',
    descKey: 'about.whyZambeel.features.ai.desc',
    img: 'https://plus.unsplash.com/premium_photo-1677269465314-d5d2247a0b0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEFJfGVufDB8MXwwfHx8MA%3D%3D',
    contentKey: 'blog.ai.content',
  },
  'learn-ecommerce': {
    slug: 'learn-ecommerce',
    titleKey: 'homepage.whyZambeel.features.learnEcommerce.title',
    descKey: 'homepage.whyZambeel.features.learnEcommerce.desc',
    img: 'https://plus.unsplash.com/premium_photo-1683120966127-14162cdd0935?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fEFJfGVufDB8MXwwfHx8MA%3D%3D',
    contentKey: 'blog.learnEcommerce.content',
  },
};

// Export blog list for listing page (without full content)
export const blogList = [
  {
    slug: zambeelDropshippingBlog.slug,
    titleKey: zambeelDropshippingBlog.titleKey,
    descKey: zambeelDropshippingBlog.descKey,
    img: zambeelDropshippingBlog.img,
  },
  {
    slug: zambeel360Blog.slug,
    titleKey: zambeel360Blog.titleKey,
    descKey: zambeel360Blog.descKey,
    img: zambeel360Blog.img,
  },
  {
    slug: warehousing3plBlog.slug,
    titleKey: warehousing3plBlog.titleKey,
    descKey: warehousing3plBlog.descKey,
    img: warehousing3plBlog.img,
  },
];

