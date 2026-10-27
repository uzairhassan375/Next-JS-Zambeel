# Threat Model

## Project Overview

Zambeel (`zambeel`) is a Next.js 16 (App Router, React 19) marketing/content website
deployed on Replit Autoscale at `https://www.myzambeel.com` (public visibility).
It uses MongoDB via Mongoose for content storage (blogs, partner agencies, tickers,
page SEO metadata, homepage blog selection). There is a single-role **admin** area
(`/admin/*`) protected by a shared password, plus Meta Conversions API and PostHog
analytics integrations. There are no end-user accounts — the only privileged subject
is the site administrator.

## Assets

- **Admin session / shared password** — `ADMIN_SECRET` is both the login password and
  the HMAC signing key for the `admin_session` cookie. Compromise grants full control
  over all site content.
- **Unpublished content** — draft blog posts (titles, slugs, imagery, body) that are not
  yet meant to be public.
- **Application secrets** — `MONGODB_URI`, `META_CAPI_TOKEN`, `ADMIN_SECRET`. Kept
  server-side only.
- **Public content integrity** — blogs, tickers, partner agencies rendered to all
  visitors; tampering would deface the site.

## Trust Boundaries

- **Browser to API** — all `/api/*` routes. Content mutation routes require a valid
  `admin_session` cookie. The client is untrusted.
- **API to MongoDB** — Mongoose queries. Object IDs validated with `isValidObjectId`;
  slugs are path strings.
- **Public vs Admin** — public read endpoints (`/api/blogs`, `/api/tickers`,
  `/api/partner-agencies`, `/api/homepage-blogs`) filter to published content; admin
  read/write endpoints must enforce `getAdminSession()`.
- **API to external services** — Meta CAPI (`graph.facebook.com`, fixed host).

## Scan Anchors

- Production entry points: `src/app/api/**/route.js` (REST handlers),
  `src/middleware.js`, server components under `src/app/**/page.js`.
- Auth enforcement: `src/lib/adminAuth.js` (HMAC cookie), `getAdminSession()` is the
  single server-side authorization check used across admin + write routes.
- Highest-risk areas: `src/app/api/blogs/route.js` (admin/public list branch),
  `src/app/api/admin/auth/route.js` (login, no rate limiting), blog content rendering
  `src/pages/BlogDetailPage.jsx` (`dangerouslySetInnerHTML`).
- Client-only guard: `src/app/admin/AdminGuard.jsx` is UI-only; real protection is in
  the API routes.
- Dev-only / non-reachable: `src/pages/*.jsx` legacy components (301-redirected in
  `next.config.mjs`).

## Threat Categories

### Spoofing / Improper Authentication

The admin area is guarded by a single shared password compared in constant time and an
HMAC-signed session cookie. The login endpoint `/api/admin/auth` has **no rate limiting
or lockout**, so the shared password is subject to online brute force. Sessions cannot
be revoked server-side before expiry (logout only clears the client cookie).

### Information Disclosure / Broken Access Control

Public list endpoints must only return published content. The admin list branch of
`GET /api/blogs?admin=true` omits the `getAdminSession()` check that its partner-agency
counterpart has, leaking all blogs — including unpublished drafts — to anyone.

### Tampering / Elevation of Privilege

All content write endpoints (`POST/PUT/DELETE` on blogs, partner agencies, tickers,
page-meta, homepage-blogs) correctly enforce `getAdminSession()` and whitelist fields,
so there is no mass-assignment or unauthorized write surface for anonymous users.

### Cross-Site Scripting

Admin-authored blog content is stored as raw HTML and rendered with
`dangerouslySetInnerHTML` without sanitization. Only the trusted admin can author it, so
impact is bounded by admin trust, but any admin-credential compromise yields persistent
site-wide XSS. Ticker HTML is sanitized before rendering.
