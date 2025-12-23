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

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── layout/      # Layout components
│   └── UI/          # UI components
├── pages/           # Page components
├── locales/         # i18n translations
├── data/            # Data files
└── lib/             # Utility functions
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
