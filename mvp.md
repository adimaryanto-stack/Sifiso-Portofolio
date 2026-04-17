# 🚀 MVP (Minimum Viable Product) Specification
# Sifiso — Dynamic Portfolio Website

**Version:** 1.0  
**Date:** 14 April 2026  
**Priority:** Ship in 2 Sprints (~10 hari kerja)

---

## 1. MVP Philosophy

> **"Ship the core, iterate the rest."**

MVP Sifiso fokus pada dua pilar utama:
1. **Public Portfolio** — Landing page yang stunning + project detail yang informatif
2. **Admin CMS** — Kemampuan mengelola konten tanpa coding

Fitur-fitur advanced seperti analytics, dynamic OG images, dan email notifications akan ditambahkan di iterasi berikutnya.

---

## 2. MVP Scope Matrix

### ✅ IN SCOPE (MVP)

| Feature | Priority | Sprint |
|---------|----------|--------|
| Monorepo setup (Turborepo + pnpm) | P0 | Sprint 1 |
| Database schema + migrations | P0 | Sprint 1 |
| Better Auth v2 (admin login) | P0 | Sprint 1 |
| Landing page — Hero section | P0 | Sprint 1 |
| Landing page — About preview | P0 | Sprint 1 |
| Landing page — Services grid | P0 | Sprint 1 |
| Landing page — Portfolio grid | P0 | Sprint 1 |
| Landing page — Testimonials | P0 | Sprint 1 |
| Landing page — Contact form | P0 | Sprint 1 |
| Navigation + Footer | P0 | Sprint 1 |
| Project detail page (`/work/[slug]`) | P0 | Sprint 1 |
| 404 page | P1 | Sprint 1 |
| Admin — Dashboard overview | P0 | Sprint 2 |
| Admin — Projects CRUD | P0 | Sprint 2 |
| Admin — Testimonials CRUD | P0 | Sprint 2 |
| Admin — Inquiries list | P0 | Sprint 2 |
| Admin — Image upload (Supabase Storage) | P0 | Sprint 2 |
| Responsive design (mobile + desktop) | P0 | Sprint 2 |
| SEO basics (meta tags, sitemap) | P1 | Sprint 2 |
| Database seeding (sample data) | P0 | Sprint 1 |
| Vercel deployment | P1 | Sprint 2 |

### ❌ OUT OF SCOPE (Post-MVP)

| Feature | Reason | Target |
|---------|--------|--------|
| Creative Process section | Nice to have | v1.1 |
| Quotes section | Nice to have | v1.1 |
| Pricing packages page | Requires business validation | v1.1 |
| Email notifications (Resend) | Non-critical for launch | v1.1 |
| Dynamic OG images | Enhancement | v1.2 |
| Analytics dashboard | Enhancement | v1.2 |
| Dark/Light mode toggle | Design is dark-only MVP | v1.2 |
| Blog/Articles section | Future expansion | v2.0 |
| Multi-language support | Future expansion | v2.0 |
| Admin — Services CRUD | Can use seed data | v1.1 |
| Admin — Site Settings | Can use env vars | v1.1 |
| Drag-and-drop reorder | UX enhancement | v1.1 |

---

## 3. Sprint Breakdown

### 📦 Sprint 1: Foundation + Public Website (5 hari)

#### Day 1: Project Bootstrap
```
[x] Init Turborepo monorepo dengan npm workspaces
[x] Setup packages/ui dengan shadcn/ui
[x] Setup packages/typescript-config
[x] Setup packages/eslint-config
[x] Setup apps/web dengan Next.js 14 (App Router)
[x] Configure Tailwind CSS v4
[x] Install dependencies (Drizzle, Better Auth, Framer Motion)
[x] Setup environment variables (.env.local)
```

#### Day 2: Database + Auth
```
[ ] Define Drizzle schema (all MVP tables)
[ ] Connect to Supabase PostgreSQL
[ ] Run initial migration (drizzle-kit push)
[ ] Setup Better Auth v2 server config
[ ] Create auth API route handler
[ ] Create auth client
[ ] Build login page (/admin/login)
[ ] Create admin middleware guard
[ ] Seed database dengan sample data
```

#### Day 3: Public Layout + Hero + About
```
[ ] Create root layout (fonts, metadata, providers)
[ ] Build Navbar component (sticky, responsive)
[ ] Build Footer component
[ ] Build Hero section (typewriter animation, CTA)
[ ] Build About Preview section
[ ] Build page transition wrapper (Framer Motion)
[ ] Setup global styles (dark theme tokens)
```

#### Day 4: Portfolio + Services + Testimonials
```
[ ] Build Services Grid section (4 cards)
[ ] Build Portfolio Grid section (masonry/filtered)
[ ] Build Testimonials Carousel
[ ] Build Contact Form section (with validation)
[ ] Build complete Landing Page assembling all sections
[ ] Create API routes: GET projects, services, testimonials
```

#### Day 5: Project Detail + 404 + Polish
```
[ ] Build Project Detail page (/work/[slug])
   - Hero banner
   - Project overview (role, timeline, tools)
   - Image gallery
   - Results/impact metrics
   - Next/Previous navigation
[ ] Build 404 page (neon glitch effect)
[ ] API route: GET project by slug
[ ] Polish animations and transitions
[ ] Mobile responsiveness audit
```

---

### 📦 Sprint 2: Admin Dashboard + Deployment (5 hari)

#### Day 6: Admin Layout + Dashboard
```
[ ] Build admin layout (sidebar navigation)
[ ] Build auth guard wrapper component
[ ] Build Dashboard overview page
   - Stats cards (total projects, inquiries, testimonials)
   - Recent inquiries list
   - Quick action buttons
[ ] Setup admin API middleware (auth check)
```

#### Day 7: Projects CRUD
```
[ ] Build Projects list page (table view)
   - Thumbnail, title, category, status, actions
[ ] Build Project create form
   - Title, slug (auto-generate), description
   - Category, tags (multi-select)
   - Image upload (Supabase Storage integration)
   - Featured/Published toggles
[ ] Build Project edit form (pre-populated)
[ ] API routes: POST, PUT, DELETE projects
[ ] Image upload API route
```

#### Day 8: Testimonials + Inquiries
```
[ ] Build Testimonials CRUD page
   - Table list view
   - Create/Edit modal (dialog)
   - Delete with confirmation
[ ] Build Inquiries page
   - Inbox-style list
   - Detail view (expandable)
   - Mark as read/replied
[ ] API routes: CRUD testimonials, inquiries
```

#### Day 9: Integration + SEO
```
[ ] Connect all public pages to real API data
[ ] Implement ISR (revalidate) for public pages
[ ] Add SEO metadata per page
[ ] Generate sitemap.xml
[ ] Generate robots.txt
[ ] Add structured data (JSON-LD)
[ ] Cross-browser testing
[ ] Performance optimization (Image, lazy loading)
```

#### Day 10: Deploy + QA
```
[ ] Final responsive design audit
[ ] Lighthouse audit & fixes
[ ] Setup Vercel project
[ ] Configure environment variables on Vercel
[ ] Connect Supabase production
[ ] Deploy to Vercel
[ ] Smoke test production
[ ] Create README.md documentation
```

---

## 4. MVP Database Schema (Simplified)

Untuk MVP, berikut tabel-tabel yang **wajib ada**:

### Core Tables
| Table | Columns (simplified) | Priority |
|-------|---------------------|----------|
| `users` | id, name, email, emailVerified, image, createdAt, updatedAt | P0 (Better Auth) |
| `sessions` | id, userId, token, expiresAt, ipAddress, userAgent | P0 (Better Auth) |
| `accounts` | id, userId, accountId, providerId, password, ... | P0 (Better Auth) |
| `projects` | id, title, slug, description, brief, role, timeline, tools, client_name, category, thumbnail_url, hero_image_url, process_gallery (jsonb), results_metrics (jsonb), sort_order, is_featured, is_published, created_at, updated_at | P0 |
| `project_images` | id, project_id, image_url, caption, sort_order | P0 |
| `tags` | id, name, slug | P1 |
| `project_tags` | project_id, tag_id | P1 |
| `testimonials` | id, client_name, client_title, content, avatar_url, rating, is_featured, is_published, sort_order | P0 |
| `services` | id, title, description, icon_name, sort_order, is_active | P0 (seed only) |
| `inquiries` | id, name, email, message, subject, status, is_read, created_at | P0 |

### Deferred Tables (Post-MVP)
| Table | Reason |
|-------|--------|
| `pricing_packages` | Business validation needed |
| `site_settings` | Use env vars for MVP |
| `creative_process_steps` | Hardcode for MVP |
| `quotes` | Hardcode for MVP |

---

## 5. MVP API Endpoints

### Public (No Auth)
```
GET  /api/projects              → List published projects
GET  /api/projects/[slug]       → Get project by slug
GET  /api/services              → List services
GET  /api/testimonials          → List testimonials  
POST /api/inquiries             → Submit contact form
```

### Admin (Auth Required)
```
POST /api/auth/[...all]         → Better Auth handler

GET    /api/admin/projects      → List all projects
POST   /api/admin/projects      → Create project
PUT    /api/admin/projects/[id] → Update project
DELETE /api/admin/projects/[id] → Delete project

GET    /api/admin/testimonials      → List all testimonials
POST   /api/admin/testimonials      → Create testimonial
PUT    /api/admin/testimonials/[id] → Update testimonial
DELETE /api/admin/testimonials/[id] → Delete testimonial

GET    /api/admin/inquiries         → List all inquiries
PUT    /api/admin/inquiries/[id]    → Update inquiry status

POST   /api/upload                  → Upload image
```

---

## 6. MVP Success Criteria

| Criteria | Target |
|----------|--------|
| ✅ Landing page loads and displays all sections | Required |
| ✅ Projects loaded from database, not hardcoded | Required |
| ✅ Project detail page renders correctly | Required |
| ✅ Contact form submits and saves to DB | Required |
| ✅ Admin can login securely | Required |
| ✅ Admin can CRUD projects with images | Required |
| ✅ Admin can CRUD testimonials | Required |
| ✅ Admin can view/manage inquiries | Required |
| ✅ Site is responsive (mobile + desktop) | Required |
| ✅ Lighthouse Performance ≥ 80 | Required |
| ✅ Deployed on Vercel | Required |

---

## 7. Tech Decisions for MVP

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Package Manager | npm | Built-in workspaces, zero extra install, universal |
| State Management | React Server Components + Server Actions | No extra state library needed for CRUD |
| Form Handling | React Hook Form + Zod | Type-safe validation |
| Animation | Framer Motion | Best React animation library |
| Image Upload | Supabase Storage + signed URLs | Integrated, free tier generous |
| Rich Text | Textarea (MVP) → TipTap (v1.1) | Keep it simple |
| Data Fetching | Server Components (direct DB) + API Routes | Best practices Next.js 14 |
| Caching | ISR with `revalidate: 3600` | Balance freshness vs performance |

---

## 8. Seed Data Requirements

### Projects (6 sample)
1. **Aura Mobile App** — Meditation app UI/UX
2. **Nexus Dashboard** — Analytics dashboard
3. **Luminary Store** — E-commerce website
4. **Eclipse Branding** — Corporate branding project
5. **Vertex 3D** — 3D product visualization
6. **Horizon Web** — Portfolio website redesign

### Testimonials (3 sample)
1. Seano Udstve — Modern Management President
2. Jane Minoer — Client
3. Soor Nuoda — Modern Management President

### Services (4 items)
1. UI/UX Design
2. Web Development
3. 3D Visualization
4. Branding & Identity

---

## 9. Risk Mitigation (MVP-specific)

| Risk | Mitigation |
|------|------------|
| Supabase connection issues | Test early, have connection fallback |
| Better Auth v2 auth flow bugs | Keep auth simple (email/password only) |
| Monorepo build complexity | Follow official Turborepo starter template |
| Image optimization | Use Next.js `<Image>` component everywhere |
| Time overrun | Cut testimonials CRUD first, then pricing |

---

## 10. Post-MVP Roadmap

### v1.1 (Week 3)
- [ ] Creative Process animated section
- [ ] Quotes section from CMS
- [ ] Pricing page from CMS
- [ ] Admin Services CRUD
- [ ] Admin Site Settings
- [ ] Email notifications (Resend)
- [ ] Drag-and-drop reorder

### v1.2 (Week 4)
- [ ] Dynamic OG images (Satori)
- [ ] Analytics dashboard (page views, inquiry trends)
- [ ] Image optimization pipeline
- [ ] Performance review & optimization

### v2.0 (Month 2)
- [ ] Blog section
- [ ] Multi-language support (i18n)
- [ ] Client portal (project tracking)
- [ ] Invoice/proposal integration
