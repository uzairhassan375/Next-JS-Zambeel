# Zambeel E-commerce Solutions Website

A modern, multilingual Next.js website for Zambeel E-commerce Solutions, featuring service pages, team information, and educational content.

## Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **React**: 19.2.3
- **Styling**: Tailwind CSS 4
- **Internationalization**: i18next & react-i18next
- **Animations**: GSAP
- **UI Components**: Headless UI, Lucide React
- **Icons**: Font Awesome

## Features

- 🌍 Multi-language support (English & Arabic)
- 📱 Fully responsive design
- 🎨 Modern UI with smooth animations
- 🚀 Optimized for performance
- ♿ Accessible components

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd zambeel
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Admin Dashboard (Blogs)

Blogs are stored in MongoDB and managed from the admin dashboard.

### Setup

1. **Environment variables** (already in `.env.local`):
   - `MONGODB_URI` – your MongoDB connection string
   - `ADMIN_SECRET` – password to log in at `/admin` (use a strong password in production)

2. **Save current blogs to MongoDB Atlas (one-time)**
   - **Option A:** Go to [http://localhost:5000/admin](http://localhost:5000/admin) → sign in → **Blogs** → click **Seed from existing blogs**. This copies all existing hardcoded blogs into your Atlas database.
   - **Option B:** With the app running, run:  
     `curl -X POST http://localhost:5000/api/admin/seed-blogs -H "Content-Type: application/json" -d "{\"secret\":\"YOUR_ADMIN_SECRET\"}"`  
     (Replace `YOUR_ADMIN_SECRET` with the value from `.env.local`.)

3. **New blogs**
   - All new blogs created in the admin (**New Blog**) are saved to MongoDB Atlas. They appear on the public blog list and detail pages immediately.

4. **Fetching from DB**
   - The public **Blog** and **Blog/[slug]** pages load blogs from the database via `GET /api/blogs` and `GET /api/blogs/[slug]`. If the DB is empty or the API fails, the site falls back to the static blog data.

5. **Managing blogs**
   - **Blogs** – list, edit, delete (all persisted in Atlas)
   - **New Blog** – create with English & Arabic title, description, image URL, and markdown content (supports **bold**, `##` headings, `-` lists)

### Folder structure (admin & blogs)

```
src/
├── app/
│   ├── api/
│   │   ├── blogs/           # GET list, POST create; GET/PUT/DELETE by slug
│   │   └── admin/          # auth, me, seed-blogs
│   └── admin/              # Admin UI (login, blogs list, new/edit form)
├── lib/
│   ├── db.js               # MongoDB connection
│   ├── adminAuth.js        # Admin session cookie
│   └── blogs.js            # fetchBlogList / fetchBlogBySlug
└── models/
    └── Blog.js             # Mongoose schema
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── layout/      # Layout components
│   └── UI/          # UI components
├── models/          # Mongoose models (Blog)
├── pages/           # Page components
├── locales/         # i18n translations
├── data/            # Data files (blogs used as fallback until seeded)
└── lib/             # Utility functions & DB
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

This project is configured for deployment on Vercel. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

1. Push your code to GitHub/GitLab/Bitbucket
2. Import the project on [Vercel](https://vercel.com/new)
3. Vercel will auto-detect Next.js and deploy

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment](https://vercel.com/docs)
