// Import all blog data files
import { zambeelDropshippingBlog } from './zambeel-dropshipping';
import { zambeel360Blog } from './zambeel-360';
import { warehousing3plBlog } from './warehousing-3pl';
import { tiktokDropshippingSaudiBlog } from './tiktok-dropshipping-saudi';
import { trendingProductsDropshipSaudiBlog } from './trending-products-dropship-saudi';
import { codDropshippingBlog } from './cod-dropshipping';
import { winningProductsBlog } from './winning-products';
import { uaeProfitableProductsBlog } from './uae-profitable-products';
import { howToStartDropshippingBlog } from './how-to-start-dropshipping';
import { uaeDigitalMarketingBlog } from './uae-digital-marketing';
import { dropshippingVsWholesaleKsaBlog } from './dropshipping-vs-wholesale-ksa';
import { uaeSocialMediaAdsBlog } from './uae-social-media-ads';
import { uaeCustomsImportRegulationsBlog } from './uae-customs-import-regulations';
import { uaeDropshippingComprehensiveGuideBlog } from './uae-dropshipping-comprehensive-guide';
import { ksaDropshippingComprehensiveGuideBlog } from './ksa-dropshipping-comprehensive-guide';

// Export all blogs as an object keyed by slug
export const blogs = {
  'zambeel-dropshipping': zambeelDropshippingBlog,
  'zambeel-360': zambeel360Blog,
  'warehousing-3pl': warehousing3plBlog,
  'tiktok-dropshipping-saudi': tiktokDropshippingSaudiBlog,
  'trending-products-dropship-saudi': trendingProductsDropshipSaudiBlog,
  'cod-dropshipping': codDropshippingBlog,
  'how-to-find-winning-products': winningProductsBlog,
  'top-10-profitable-products-uae': uaeProfitableProductsBlog,
  'how-to-start-dropshipping': howToStartDropshippingBlog,
  'uae-dropshipping-digital-marketing': uaeDigitalMarketingBlog,
  'dropshipping-vs-wholesale-ksa': dropshippingVsWholesaleKsaBlog,
  'uae-social-media-ads-dropshipping': uaeSocialMediaAdsBlog,
  'uae-customs-import-regulations': uaeCustomsImportRegulationsBlog,
  'uae-dropshipping-comprehensive-guide': uaeDropshippingComprehensiveGuideBlog,
  'ksa-dropshipping-comprehensive-guide': ksaDropshippingComprehensiveGuideBlog,
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
    slug: tiktokDropshippingSaudiBlog.slug,
    titleKey: tiktokDropshippingSaudiBlog.titleKey,
    descKey: tiktokDropshippingSaudiBlog.descKey,
    img: tiktokDropshippingSaudiBlog.img,
  },
  {
    slug: trendingProductsDropshipSaudiBlog.slug,
    titleKey: trendingProductsDropshipSaudiBlog.titleKey,
    descKey: trendingProductsDropshipSaudiBlog.descKey,
    img: trendingProductsDropshipSaudiBlog.img,
  },
  {
    slug: codDropshippingBlog.slug,
    titleKey: codDropshippingBlog.titleKey,
    descKey: codDropshippingBlog.descKey,
    img: codDropshippingBlog.img,
  },
  {
    slug: winningProductsBlog.slug,
    titleKey: winningProductsBlog.titleKey,
    descKey: winningProductsBlog.descKey,
    img: winningProductsBlog.img,
  },
  {
    slug: uaeProfitableProductsBlog.slug,
    titleKey: uaeProfitableProductsBlog.titleKey,
    descKey: uaeProfitableProductsBlog.descKey,
    img: uaeProfitableProductsBlog.img,
  },
  {
    slug: howToStartDropshippingBlog.slug,
    titleKey: howToStartDropshippingBlog.titleKey,
    descKey: howToStartDropshippingBlog.descKey,
    img: howToStartDropshippingBlog.img,
  },
  {
    slug: uaeDigitalMarketingBlog.slug,
    titleKey: uaeDigitalMarketingBlog.titleKey,
    descKey: uaeDigitalMarketingBlog.descKey,
    img: uaeDigitalMarketingBlog.img,
  },
  {
    slug: dropshippingVsWholesaleKsaBlog.slug,
    titleKey: dropshippingVsWholesaleKsaBlog.titleKey,
    descKey: dropshippingVsWholesaleKsaBlog.descKey,
    img: dropshippingVsWholesaleKsaBlog.img,
  },
  {
    slug: uaeSocialMediaAdsBlog.slug,
    titleKey: uaeSocialMediaAdsBlog.titleKey,
    descKey: uaeSocialMediaAdsBlog.descKey,
    img: uaeSocialMediaAdsBlog.img,
  },
  {
    slug: uaeCustomsImportRegulationsBlog.slug,
    titleKey: uaeCustomsImportRegulationsBlog.titleKey,
    descKey: uaeCustomsImportRegulationsBlog.descKey,
    img: uaeCustomsImportRegulationsBlog.img,
  },
  {
    slug: uaeDropshippingComprehensiveGuideBlog.slug,
    titleKey: uaeDropshippingComprehensiveGuideBlog.titleKey,
    descKey: uaeDropshippingComprehensiveGuideBlog.descKey,
    img: uaeDropshippingComprehensiveGuideBlog.img,
  },
  {
    slug: ksaDropshippingComprehensiveGuideBlog.slug,
    titleKey: ksaDropshippingComprehensiveGuideBlog.titleKey,
    descKey: ksaDropshippingComprehensiveGuideBlog.descKey,
    img: ksaDropshippingComprehensiveGuideBlog.img,
  },
];

