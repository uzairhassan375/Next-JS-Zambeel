import DOMPurify from 'isomorphic-dompurify';

const BLOG_ALLOWED_TAGS = [
  'a', 'b', 'blockquote', 'br', 'caption', 'code', 'del', 'div', 'em',
  'figcaption', 'figure', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr',
  'i', 'img', 'li', 'ol', 'p', 'pre', 's', 'span', 'strong', 'sub',
  'sup', 'table', 'tbody', 'td', 'th', 'thead', 'tr', 'u', 'ul',
];

const BLOG_ALLOWED_ATTRIBUTES = [
  'alt', 'class', 'colspan', 'dir', 'height', 'href', 'lang', 'rel',
  'rowspan', 'src', 'style', 'target', 'title', 'width',
];

export function sanitizeBlogHtml(content) {
  if (content == null) return '';

  return DOMPurify.sanitize(String(content), {
    ALLOWED_TAGS: BLOG_ALLOWED_TAGS,
    ALLOWED_ATTR: BLOG_ALLOWED_ATTRIBUTES,
  });
}
