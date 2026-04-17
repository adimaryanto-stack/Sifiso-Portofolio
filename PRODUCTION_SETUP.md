# Production Deployment Guide (Vercel + Supabase)

Follow these steps to deploy Sifiso to production and ensure all features work correctly.

## 1. Supabase Setup
- Go to your Supabase Project Settings > Database.
- Copy the **Connection String (Transaction Mode)** and use it as `DATABASE_URL`.
- Go to Settings > API and copy the `URL` and `Anon Key`.

### Create Storage Bucket
- Go to **Storage** in Supabase.
- Create a new bucket named `portfolio`.
- Make it **Public**.
- Add a policy to allow `Authenticated` users to upload files if needed, or allow all if you're keeping it simple for now (though authenticated is safer).

## 2. Environment Variables
Add these to your Vercel Project Settings:

| Key | Value |
| --- | --- |
| `DATABASE_URL` | Your Supabase connection string |
| `BETTER_AUTH_SECRET` | Generate a random 32-char string |
| `BETTER_AUTH_URL` | `https://your-domain.vercel.app` |
| `SUPABASE_URL` | Your Supabase Project URL |
| `SUPABASE_ANON_KEY` | Your Supabase Anon Key |
| `NEXT_PUBLIC_SUPABASE_URL` | (Same as above) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (Same as above) |

## 3. Database Migration
Run this command from your local machine (connected to production DB):
```bash
npm run db:push
```
This will create the necessary tables on your production Supabase instance.

## 4. Final Audit Checklist
- [ ] Check responsive navigation on iPhone & Android.
- [ ] Test form submission in `/get-started`.
- [ ] Log in to `/admin` to verify Better Auth.
- [ ] Upload a test project image to verify Supabase Storage.
- [ ] Verify `https://your-domain.vercel.app/sitemap.xml` exists.

## 5. Deployment
- Push your code to GitHub.
- Connect your repo to Vercel.
- Select `apps/web` as the root directory if prompted (it's a monorepo).
- Deploy!
