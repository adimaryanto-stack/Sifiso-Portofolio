# Production Deployment Guide (Vercel + Hybrid DB)

Follow these steps to deploy Sifiso to production and ensure the Hybrid Database (PostgreSQL) and SEO features work correctly.

## 1. Vercel Postgres Setup
Based on your provided resource, the database is identified as:
- **Internal ID:** `ecfg_aliy3yalh4lokv0dao2ukoihlraa`
- **Resource Digest:** `5bf6b008a9ec05f6870c476d10b53211797aa000f95aae344ae60f9b422286da`

### Linking in Vercel
1. Go to your **Vercel Dashboard** > **Storage**.
2. Connect your project to the Postgres database associated with the IDs above.
3. Vercel will automatically inject the `POSTGRES_URL` environment variable.

### 💡 Vercel Monorepo Tip
Because this is a Turborepo, Vercel needs to know the **Root Directory** for the web application. I have added `vercel.json` to handle this, but please verify in your **Project Settings > General** that the **Root Directory** is set to `apps/web`.

## 2. Environment Variables
Add these to your Vercel Project Settings:

| Key | Value |
| --- | --- |
| `POSTGRES_URL` | (Injected by Vercel Postgres) |
| `BETTER_AUTH_SECRET` | Generate a random 32-char string |
| `BETTER_AUTH_URL` | `https://your-domain.vercel.app` |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` |

## 3. Database Migration
To sync your production schema with the Vercel Postgres database:
1. Ensure your local `.env.local` temporarily contains the production `POSTGRES_URL`.
2. Run:
   ```bash
   npm run db:push
   ```
3. Verify that the tables are created in the Vercel Postgres dashboard.

## 4. Final Audit Checklist
- [x] **Code Pushed**: Already pushed to GitHub `main` branch.
- [ ] **Auth Check**: Visit `/admin/login` on production.
- [ ] **SEO Check**: Go to `/admin/settings` and save a title to verify DB write access.
- [ ] **Inquiry Check**: Submit the contact form on the live site.

## 5. Deployment Info
- **Repo**: `https://github.com/adimaryanto-stack/Sifiso-Portofolio.git`
- **Framework**: Next.js 16 (App Router + Turbopack)
- **Database Logic**: Automatically switches to PostgreSQL if `POSTGRES_URL` is detected, otherwise defaults to local SQLite for zero-config development.
- **Node Version**: Recommended 20.x or 22.x on Vercel.

## 6. Common Issues & Solutions
- **404 Errors on Dynamic Routes**: Ensure you are using the latest version of the code which implements `await params` in `page.tsx` files.
- **Konektivitas Database**: Jika server Vercel gagal terhubung, pastikan `POSTGRES_URL` sudah mencakup parameter `?sslmode=require` jika diperlukan oleh provider database Anda.

---
Crafted with precision by **Sifiso & Antigravity**.
