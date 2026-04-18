# Sifiso — High-Performance Portfolio v1.0

Sifiso is a premium, high-fidelity multidisciplinary portfolio built for designers and developers who want to stand out. It features a brutalist-modern aesthetic with glassmorphism, dynamic animations, and a robust administrative backend.

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router + Turbopack)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.motion.dev/)
- **Database:** Hybrid (SQLite for Local / Vercel Postgres for Production)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication:** [Better Auth v2](https://better-auth.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Deployment:** [Vercel](https://vercel.com/)

## ✨ Key Features

- **Dynamic Work Gallery:** Filterable portfolio grid with interactive hover effects and awaited params compatibility.
- **Client Management:** Fully functional admin dashboard to manage projects and testimonials with image previews.
- **Dynamic SEO Dashboard:** Integrated management for Meta Titles, Descriptions, and Keywords that update the site in real-time.
- **Real-time Inquiry System:** Functional contact form connected to a backend inbox for lead management.
- **Hybrid DB Logic:** Seamlessly switches between local SQLite and production PostgreSQL based on environment.
- **Performance Optimized:** ISR (Incremental Static Regeneration) for lightning-fast delivery.

## 🛠️ Local Development

### Prerequisites

- Node.js 20+ 
- npm / Turborepo

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/adimaryanto-stack/Sifiso-Portofolio-.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:
   Create a `.env.local` file in `apps/web/`:
   ```env
   # No DATABASE_URL needed for local (defaults to SQLite)
   BETTER_AUTH_SECRET=your-secret
   BETTER_AUTH_URL=http://localhost:3000
   ```

4. Populate Database (SQLite):
   ```bash
   npx tsx src/scratch/seed-full.ts
   ```

5. Run development server:
   ```bash
   npm run dev
   ```

## 🌐 Production Deployment (Vercel)

### Environment Variables
For production, the app automatically switches to PostgreSQL. You must set:
- `POSTGRES_URL`: The Vercel Postgres connection string.
- `BETTER_AUTH_SECRET`: Random hash.
- `BETTER_AUTH_URL`: Your production domain.

### Database Sync
```bash
npx drizzle-kit push
```

## 🛠️ Troubleshooting: Vercel Monorepo

If you see the error **"No Next.js version detected"**:
1. Go to your **Vercel Project Settings**.
2. Under **General**, find **Root Directory**.
3. Set it to `apps/web`.
4. Ensure the **Framework Preset** is set to **Next.js**.
5. Redeploy the project.

I have included a `vercel.json` in the root to automate this, but manual verification in the dashboard is recommended.

## 📈 SEO & Performance

The project is built with SEO best practices:
- **ISR:** Syncs content every 3600s or on-demand via dashboard.
- **Dynamic Sitemap:** Auto-generated at `/sitemap.xml`.
- **Structured Data:** Person & Organization schema included.

---

Crafted with precision by **Sifiso & Antigravity**.
