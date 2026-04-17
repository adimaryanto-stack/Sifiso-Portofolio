# 🔄 Flowchart & Diagram Alir
# Sifiso — Dynamic Portfolio Website

**Version:** 1.0  
**Date:** 14 April 2026

---

## 1. System Architecture Overview

```mermaid
graph TB
    subgraph "Client Browser"
        A[Public Website<br/>Next.js SSR/SSG] 
        B[Admin Dashboard<br/>Client Components]
    end

    subgraph "Vercel Edge Network"
        C[Next.js 14 Server<br/>App Router]
        D[API Routes<br/>REST Endpoints]
        E[Better Auth v2<br/>Auth Handler]
        F[Middleware<br/>Auth Guard]
    end

    subgraph "Data Persistence"
        G[(Hybrid Database<br/>Postgres Prod / SQLite Local)]
        H[Vercel Storage<br/>Images & Files]
    end

    subgraph "External Services"
        I[Resend<br/>Email Service]
        J[Vercel Analytics<br/>Page Views]
    end

    A --> C
    B --> C
    C --> D
    C --> F
    F --> E
    D --> G
    D --> H
    D --> I
    C --> J

    style A fill:#DC2626,stroke:#fff,color:#fff
    style B fill:#991B1B,stroke:#fff,color:#fff
    style C fill:#1E293B,stroke:#475569,color:#fff
    style D fill:#1E293B,stroke:#475569,color:#fff
    style E fill:#1E293B,stroke:#475569,color:#fff
    style F fill:#1E293B,stroke:#475569,color:#fff
    style G fill:#3ECF8E,stroke:#fff,color:#000
    style H fill:#3ECF8E,stroke:#fff,color:#000
    style I fill:#6366F1,stroke:#fff,color:#fff
    style J fill:#000,stroke:#fff,color:#fff
```

---

## 2. User Flow — Public Visitor

```mermaid
flowchart TD
    Start([Visitor Opens Website]) --> Nav{Choose Section}
    
    Nav -->|Home| Hero[Hero Section<br/>I Design Websites...]
    Nav -->|Work| WorkPage[Portfolio Grid Page]
    Nav -->|Services| ServicesPage[Services & Pricing]
    Nav -->|About| AboutPage[About Sifiso]
    Nav -->|Contact| ContactPage[Contact Form]
    
    Hero --> Scroll[Scroll Down Landing Page]
    Scroll --> About[About Preview<br/>Who is Sifiso?]
    About --> Services[Services Grid<br/>What I Can Do For You]
    Services --> Process[Creative Process<br/>4 Steps]
    Process --> Quotes[Inspiration Quotes]
    Quotes --> Portfolio[Portfolio Grid<br/>Recent Work]
    Portfolio --> Testimonials[Testimonials Carousel]
    Testimonials --> CTA[Contact Form<br/>Hire Me Section]
    CTA --> Footer[Footer]
    
    Portfolio -->|Click Project| ProjDetail[Project Detail Page<br/>/work/slug]
    ProjDetail --> ProjHero[Project Hero Image]
    ProjHero --> ProjOverview[Role / Timeline / Tools]
    ProjOverview --> ProjGallery[Process Gallery]
    ProjGallery --> ProjResults[Results & Impact]
    ProjResults --> ProjNav{Navigate}
    ProjNav -->|Next Project| ProjDetail
    ProjNav -->|Back to Work| WorkPage
    
    WorkPage -->|Filter by Category| FilteredGrid[Filtered Portfolio Grid]
    FilteredGrid -->|Click Project| ProjDetail
    
    ContactPage --> FillForm[Fill Contact Form<br/>Name, Email, Message]
    CTA --> FillForm
    FillForm --> Submit{Submit Form}
    Submit -->|Valid| SaveDB[(Save to Database<br/>inquiries table)]
    SaveDB --> SuccessMsg[Thank You Message<br/>✅ Confirmation]
    Submit -->|Invalid| ShowErrors[Show Validation Errors]
    ShowErrors --> FillForm
    
    ServicesPage --> ViewPricing[View Pricing Packages]
    ViewPricing -->|Get Started| ContactPage

    style Start fill:#DC2626,stroke:#fff,color:#fff
    style Hero fill:#1A1A1A,stroke:#DC2626,color:#fff
    style ProjDetail fill:#1A1A1A,stroke:#DC2626,color:#fff
    style SaveDB fill:#3ECF8E,stroke:#fff,color:#000
    style SuccessMsg fill:#16A34A,stroke:#fff,color:#fff
```

---

## 3. User Flow — Admin (CMS)

```mermaid
flowchart TD
    AdminStart([Admin Navigates to /admin]) --> AuthCheck{Authenticated?}
    
    AuthCheck -->|No| LoginPage[Login Page<br/>Email + Password]
    LoginPage --> AuthSubmit{Login Attempt}
    AuthSubmit -->|Success| SetSession[Set HTTP-Only Cookie<br/>Better Auth Session]
    SetSession --> Dashboard
    AuthSubmit -->|Failed| LoginError[Show Error Message]
    LoginError --> LoginPage
    
    AuthCheck -->|Yes| Dashboard[Admin Dashboard]
    
    Dashboard --> DashNav{Navigate Admin}
    
    DashNav -->|Projects| ProjList[Projects List<br/>Table View]
    DashNav -->|Testimonials| TestList[Testimonials List]
    DashNav -->|Inquiries| InqList[Inquiries Inbox]
    DashNav -->|Settings| Settings[Site Settings]
    DashNav -->|View Site| PublicSite([Open Public Website])
    
    %% Projects CRUD
    ProjList -->|+ New| ProjCreate[Create Project Form]
    ProjList -->|Edit| ProjEdit[Edit Project Form]
    ProjList -->|Delete| ProjDelete{Confirm Delete?}
    ProjList -->|Toggle| ProjToggle[Publish/Unpublish]
    
    ProjCreate --> UploadImages[Upload Images<br/>to Supabase Storage]
    UploadImages --> SaveProject[(Save to Database)]
    SaveProject --> ProjList
    
    ProjEdit --> UpdateImages[Update Images]
    UpdateImages --> UpdateProject[(Update in Database)]
    UpdateProject --> ProjList
    
    ProjDelete -->|Yes| DeleteProject[(Delete from Database)]
    DeleteProject --> ProjList
    ProjDelete -->|No| ProjList
    
    ProjToggle --> ToggleDB[(Update is_published)]
    ToggleDB --> ProjList
    
    %% Testimonials CRUD
    TestList -->|+ New| TestCreate[Create Testimonial<br/>Dialog Modal]
    TestList -->|Edit| TestEdit[Edit Testimonial<br/>Dialog Modal]
    TestList -->|Delete| TestDelete{Confirm Delete?}
    
    TestCreate --> SaveTest[(Save Testimonial)]
    SaveTest --> TestList
    TestEdit --> UpdateTest[(Update Testimonial)]
    UpdateTest --> TestList
    TestDelete -->|Yes| DeleteTest[(Delete Testimonial)]
    DeleteTest --> TestList
    
    %% Inquiries
    InqList -->|Click| InqDetail[View Inquiry Detail]
    InqDetail --> MarkRead[(Mark as Read)]
    MarkRead --> InqList
    InqDetail -->|Reply| ComposeReply[Reply via Email]
    ComposeReply --> MarkReplied[(Mark as Replied)]
    MarkReplied --> InqList

    style AdminStart fill:#DC2626,stroke:#fff,color:#fff
    style Dashboard fill:#1A1A1A,stroke:#DC2626,color:#fff
    style SaveProject fill:#3ECF8E,stroke:#fff,color:#000
    style SaveTest fill:#3ECF8E,stroke:#fff,color:#000
    style UpdateProject fill:#3ECF8E,stroke:#fff,color:#000
    style DeleteProject fill:#EF4444,stroke:#fff,color:#fff
    style DeleteTest fill:#EF4444,stroke:#fff,color:#fff
```

---

## 4. Authentication Flow (Better Auth v2)

```mermaid
sequenceDiagram
    participant Browser as Admin Browser
    participant MW as Next.js Middleware
    participant API as API Route<br/>/api/auth/[...all]
    participant BA as Better Auth v2
    participant DB as PostgreSQL<br/>(Drizzle ORM)

    Note over Browser,DB: === Login Flow ===
    
    Browser->>API: POST /api/auth/sign-in/email<br/>{email, password}
    API->>BA: Process sign-in request
    BA->>DB: SELECT user WHERE email = ?
    DB-->>BA: User record
    BA->>BA: Verify password (bcrypt)
    BA->>DB: INSERT session {token, userId, expiresAt}
    DB-->>BA: Session created
    BA-->>API: Set-Cookie: better-auth.session_token=xxx
    API-->>Browser: 200 OK + Session Cookie

    Note over Browser,DB: === Protected Route Access ===

    Browser->>MW: GET /admin/dashboard<br/>Cookie: session_token=xxx
    MW->>BA: Validate session token
    BA->>DB: SELECT session WHERE token = ?
    DB-->>BA: Valid session
    BA-->>MW: Session valid + user data
    MW-->>Browser: Allow access → Render page

    Note over Browser,DB: === Session Expired ===
    
    Browser->>MW: GET /admin/projects<br/>Cookie: session_token=expired
    MW->>BA: Validate session token
    BA->>DB: SELECT session WHERE token = ?
    DB-->>BA: Session expired
    BA-->>MW: Unauthorized
    MW-->>Browser: 302 Redirect → /admin/login
```

---

## 5. Data Flow — Project CRUD

```mermaid
sequenceDiagram
    participant Admin as Admin Browser
    participant RSC as React Server Component
    participant SA as Server Action
    participant API as API Route
    participant ORM as Drizzle ORM
    participant DB as PostgreSQL
    participant Storage as Supabase Storage

    Note over Admin,Storage: === Create Project ===
    
    Admin->>RSC: Navigate to /admin/projects/new
    RSC->>ORM: Fetch tags, categories
    ORM->>DB: SELECT * FROM tags
    DB-->>ORM: Tags list
    ORM-->>RSC: Tags data
    RSC-->>Admin: Render form with options
    
    Admin->>Admin: Fill form + select images
    Admin->>API: POST /api/upload<br/>FormData {images[]}
    API->>Storage: Upload images to bucket
    Storage-->>API: Return public URLs
    API-->>Admin: Image URLs
    
    Admin->>SA: Submit form via Server Action
    SA->>ORM: db.insert(projects).values({...})
    ORM->>DB: INSERT INTO projects (...)
    DB-->>ORM: New project ID
    SA->>ORM: db.insert(project_images).values({...})
    ORM->>DB: INSERT INTO project_images (...)
    SA->>ORM: db.insert(project_tags).values({...})
    ORM->>DB: INSERT INTO project_tags (...)
    SA-->>Admin: Redirect to /admin/projects

    Note over Admin,Storage: === Public View ===
    
    Admin->>RSC: Visit /work/project-slug
    RSC->>ORM: db.query.projects.findFirst({where: slug})
    ORM->>DB: SELECT * FROM projects<br/>JOIN project_images<br/>JOIN project_tags<br/>WHERE slug = ?
    DB-->>ORM: Full project data
    ORM-->>RSC: Typed project object
    RSC-->>Admin: Render project detail page
```

---

## 6. Contact Form Submission Flow

```mermaid
sequenceDiagram
    participant Visitor as Visitor Browser
    participant Form as Contact Form<br/>(Client Component)
    participant API as API Route<br/>/api/inquiries
    participant Zod as Zod Validation
    participant ORM as Drizzle ORM
    participant DB as PostgreSQL
    participant Email as Resend<br/>(Post-MVP)

    Visitor->>Form: Fill form fields
    Form->>Form: Client-side validation<br/>(React Hook Form + Zod)
    
    alt Invalid Input
        Form-->>Visitor: Show field errors
    end
    
    Form->>API: POST /api/inquiries<br/>{name, email, message, subject}
    API->>Zod: Server-side validation
    
    alt Invalid Data
        Zod-->>API: Validation errors
        API-->>Form: 400 {errors: [...]}
        Form-->>Visitor: Show server errors
    end
    
    Zod-->>API: Valid data
    API->>ORM: db.insert(inquiries).values({...})
    ORM->>DB: INSERT INTO inquiries (...)
    DB-->>ORM: New inquiry ID
    ORM-->>API: Success
    
    opt Post-MVP: Email Notification
        API->>Email: Send notification email<br/>to admin
        Email-->>API: Email sent
    end
    
    API-->>Form: 201 {success: true}
    Form-->>Visitor: Show success message<br/>"Thank you for reaching out!"
```

---

## 7. Image Upload Pipeline

```mermaid
flowchart LR
    A[Admin selects<br/>images] --> B[Client-side<br/>preview & resize]
    B --> C[FormData<br/>multipart upload]
    C --> D[API Route<br/>/api/upload]
    D --> E{Validate}
    E -->|Invalid| F[Return error<br/>size/type]
    E -->|Valid| G[Generate unique<br/>filename]
    G --> H[Upload to<br/>Supabase Storage]
    H --> I[Get public URL]
    I --> J[Return URL<br/>to client]
    J --> K[Display preview<br/>in form]

    style A fill:#1A1A1A,stroke:#DC2626,color:#fff
    style H fill:#3ECF8E,stroke:#fff,color:#000
    style J fill:#16A34A,stroke:#fff,color:#fff
    style F fill:#EF4444,stroke:#fff,color:#fff
```

---

## 8. Monorepo Build Pipeline

```mermaid
flowchart TD
    subgraph "Developer Machine"
        A[Code Change] --> B[Git Commit]
        B --> C[Husky Pre-commit]
        C --> D[lint-staged<br/>ESLint + Prettier]
    end

    subgraph "GitHub"
        D --> E[Push to GitHub]
        E --> F{Branch?}
    end

    subgraph "Vercel CI/CD"
        F -->|main| G[Production Build]
        F -->|feature/*| H[Preview Build]
        
        G --> I[Turborepo Build]
        H --> I
        
        I --> J[Build packages/ui]
        J --> K[Build apps/web]
        K --> L{Build Success?}
        
        L -->|Yes, main| M[Deploy to Production<br/>sifiso.dev]
        L -->|Yes, feature| N[Deploy to Preview<br/>*.vercel.app]
        L -->|No| O[Notify Failure]
    end

    subgraph "Production"
        M --> P[Next.js SSR/SSG<br/>on Vercel Edge]
        P --> Q[CDN Cache<br/>Static Assets]
    end

    style A fill:#1A1A1A,stroke:#DC2626,color:#fff
    style M fill:#16A34A,stroke:#fff,color:#fff
    style N fill:#EAB308,stroke:#fff,color:#000
    style O fill:#EF4444,stroke:#fff,color:#fff
```

---

## 9. Page Rendering Strategy

```mermaid
flowchart TD
    subgraph "Static Generation (SSG)"
        A[Landing Page<br/>Home] -->|ISR revalidate: 3600| A1[Cached 1hr]
        B[About Page] -->|ISR revalidate: 86400| B1[Cached 24hr]
        C[Services Page] -->|ISR revalidate: 86400| C1[Cached 24hr]
    end

    subgraph "Server-Side Rendering (SSR)"
        D[Project Detail<br/>/work/slug] -->|generateStaticParams| D1[Pre-rendered at build]
        D1 -->|ISR revalidate: 3600| D2[Re-rendered on demand]
    end

    subgraph "Client-Side Rendering (CSR)"
        E[Admin Dashboard] -->|useSession + SWR| E1[Real-time data]
        F[Admin Forms] -->|React Hook Form| F1[Interactive UI]
    end

    subgraph "Server Components (RSC)"
        G[Portfolio Grid] -->|Direct DB query| G1[Zero JS sent to client]
        H[Testimonials] -->|Direct DB query| H1[Zero JS sent to client]
    end

    style A fill:#3ECF8E,stroke:#fff,color:#000
    style B fill:#3ECF8E,stroke:#fff,color:#000
    style C fill:#3ECF8E,stroke:#fff,color:#000
    style D fill:#6366F1,stroke:#fff,color:#fff
    style E fill:#DC2626,stroke:#fff,color:#fff
    style F fill:#DC2626,stroke:#fff,color:#fff
    style G fill:#0EA5E9,stroke:#fff,color:#fff
    style H fill:#0EA5E9,stroke:#fff,color:#fff
```

---

## 10. Database Migration Flow

```mermaid
flowchart TD
    A[Developer modifies<br/>schema.ts] --> B[Run drizzle-kit generate]
    B --> C[Migration SQL files<br/>created in /drizzle]
    C --> D{Environment}
    
    D -->|Development| E[drizzle-kit push<br/>Direct schema sync]
    D -->|Production| F[drizzle-kit migrate<br/>Apply migration files]
    
    E --> G[Local Supabase<br/>schema updated]
    F --> H[Production Supabase<br/>schema updated]
    
    H --> I[Verify migration<br/>Check tables & data]
    I --> J{Success?}
    J -->|Yes| K[Deploy application]
    J -->|No| L[Rollback migration]
    L --> M[Fix schema & retry]
    M --> A

    style A fill:#1A1A1A,stroke:#DC2626,color:#fff
    style G fill:#3ECF8E,stroke:#fff,color:#000
    style H fill:#3ECF8E,stroke:#fff,color:#000
    style K fill:#16A34A,stroke:#fff,color:#fff
    style L fill:#EF4444,stroke:#fff,color:#fff
```

---

## 11. Complete Page Map (Sitemap)

```mermaid
graph TD
    Root[sifiso.dev] --> Public
    Root --> Admin
    Root --> API
    
    subgraph "Public Pages"
        Public["/"] --> Home["/ (Home Landing)"]
        Public --> About["/about"]
        Public --> Work["/work"]
        Work --> WorkDetail["/work/[slug]"]
        Public --> ServicesPg["/services"]
        Public --> Contact["/contact"]
        Public --> NotFound["/404"]
    end
    
    subgraph "Admin Pages (Auth Required)"
        Admin["/admin"] --> Login["/admin/login"]
        Admin --> Dash["/admin/dashboard"]
        Admin --> AdminProj["/admin/projects"]
        AdminProj --> NewProj["/admin/projects/new"]
        AdminProj --> EditProj["/admin/projects/[id]/edit"]
        Admin --> AdminTest["/admin/testimonials"]
        Admin --> AdminInq["/admin/inquiries"]
        Admin --> AdminSet["/admin/settings"]
    end
    
    subgraph "API Routes"
        API["/api"] --> AuthAPI["/api/auth/[...all]"]
        API --> ProjAPI["/api/projects"]
        ProjAPI --> ProjSlugAPI["/api/projects/[slug]"]
        API --> ServAPI["/api/services"]
        API --> TestAPI["/api/testimonials"]
        API --> InqAPI["/api/inquiries"]
        API --> UploadAPI["/api/upload"]
        API --> AdminAPI["/api/admin/*"]
    end

    style Root fill:#DC2626,stroke:#fff,color:#fff
    style Home fill:#1A1A1A,stroke:#DC2626,color:#fff
    style Dash fill:#991B1B,stroke:#fff,color:#fff
    style AuthAPI fill:#6366F1,stroke:#fff,color:#fff
```

---

## 12. State Management Architecture

```mermaid
flowchart TD
    subgraph "Server State (No Client JS)"
        RSC[React Server Components] --> DB[(Database<br/>via Drizzle)]
        RSC --> Cache[Next.js Cache<br/>ISR + revalidate]
    end
    
    subgraph "Auth State"
        Session[Better Auth Session] --> Cookie[HTTP-Only Cookie]
        Cookie --> MW[Middleware Check]
        MW --> RSC
    end
    
    subgraph "Client State (Interactive)"
        RHF[React Hook Form] --> FormState[Form State<br/>validation, dirty, etc.]
        Toast[Sonner Toast] --> NotifState[Notification State]
        Dialog[Radix Dialog] --> ModalState[Modal Open/Close]
    end
    
    subgraph "Client Data Fetching"
        SA[Server Actions] --> Revalidate[revalidatePath<br/>revalidateTag]
        Revalidate --> RSC
    end

    style RSC fill:#0EA5E9,stroke:#fff,color:#fff
    style DB fill:#3ECF8E,stroke:#fff,color:#000
    style Session fill:#DC2626,stroke:#fff,color:#fff
    style RHF fill:#EAB308,stroke:#fff,color:#000
```

---

## Ringkasan Diagram

| # | Diagram | Tipe | Tujuan |
|---|---------|------|--------|
| 1 | System Architecture | Graph | Overview seluruh stack & koneksi |
| 2 | Public Visitor Flow | Flowchart | Navigasi pengunjung website |
| 3 | Admin CMS Flow | Flowchart | Alur kerja admin mengelola konten |
| 4 | Authentication Flow | Sequence | Detail teknis Better Auth v2 |
| 5 | Project CRUD Flow | Sequence | Alur data create/read project |
| 6 | Contact Form Flow | Sequence | Alur submit contact form |
| 7 | Image Upload Pipeline | Flowchart | Proses upload gambar |
| 8 | Build Pipeline | Flowchart | CI/CD dari commit sampai deploy |
| 9 | Page Rendering Strategy | Flowchart | SSG vs SSR vs CSR decisions |
| 10 | Database Migration | Flowchart | Alur migrasi database |
| 11 | Sitemap | Graph | Peta halaman lengkap |
| 12 | State Management | Flowchart | Arsitektur state management |
