import {
  pgTable,
  text as pgText,
  integer as pgInteger,
  timestamp as pgTimestamp,
  boolean as pgBoolean,
} from "drizzle-orm/pg-core";
import {
  sqliteTable,
  text as sqText,
  integer as sqInteger,
} from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

const isPg = !!(
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL ||
  process.env.VERCEL === "1" ||
  process.env.NODE_ENV === "production"
);

// Helper to switch between PG and SQLite
// NOTE: `as any` is required — pgTable and sqliteTable have incompatible
// column type constraints that prevent a clean union or intersection type.
export const table = (isPg ? pgTable : sqliteTable) as any;

// Helper for Text columns
const textCol = (name: string) => {
  if (isPg) return pgText(name);
  return sqText(name);
};

// Helper for Integer columns
const intCol = (name: string) => {
  if (isPg) return pgInteger(name);
  return sqInteger(name);
};

// Helper for Boolean columns
const boolCol = (name: string) => {
  if (isPg) return pgBoolean(name);
  return sqInteger(name, { mode: "boolean" });
};

// Helper for Timestamp columns
const tsCol = (name: string) => {
  if (isPg) return pgTimestamp(name, { mode: "date", withTimezone: true });
  return sqInteger(name, { mode: "timestamp" });
};

import { customType } from "drizzle-orm/pg-core";

const pgJsonText = customType<{ data: any; driverData: string }>({
  dataType() {
    return 'text';
  },
  toDriver(value: any): string {
    return JSON.stringify(value);
  },
  fromDriver(value: string): any {
    if (value === "[object Object]") return {};
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  },
});

// Helper for JSON columns
const jsonCol = (name: string) => {
  if (isPg) return pgJsonText(name); 
  return sqText(name, { mode: "json" });
};

// Helper for dynamic "now" timestamp
const nowHelper = () => {
  if (isPg) return sql`now()`; // PostgreSQL native timestamp default
  return sql`(strftime('%s', 'now') * 1000)`; // SQLite unix timestamp in ms
};

// Better Auth v2 Schema (Hybrid version)
export const user = table("user", {
  id: textCol("id").primaryKey(),
  name: textCol("name").notNull(),
  email: textCol("email").notNull().unique(),
  emailVerified: boolCol("email_verified").notNull(),
  image: textCol("image"),
  createdAt: tsCol("created_at").notNull(),
  updatedAt: tsCol("updated_at").notNull(),
});

export const session = table("session", {
  id: textCol("id").primaryKey(),
  expiresAt: tsCol("expires_at").notNull(),
  token: textCol("token").notNull().unique(),
  createdAt: tsCol("created_at").notNull(),
  updatedAt: tsCol("updated_at").notNull(),
  ipAddress: textCol("ip_address"),
  userAgent: textCol("user_agent"),
  userId: textCol("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = table("account", {
  id: textCol("id").primaryKey(),
  accountId: textCol("account_id").notNull(),
  providerId: textCol("provider_id").notNull(),
  userId: textCol("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: textCol("access_token"),
  refreshToken: textCol("refresh_token"),
  idToken: textCol("id_token"),
  accessTokenExpiresAt: tsCol("access_token_expires_at"),
  refreshTokenExpiresAt: tsCol("refresh_token_expires_at"),
  scope: textCol("scope"),
  password: textCol("password"),
  createdAt: tsCol("created_at").notNull(),
  updatedAt: tsCol("updated_at").notNull(),
});

export const verification = table("verification", {
  id: textCol("id").primaryKey(),
  identifier: textCol("identifier").notNull(),
  value: textCol("value").notNull(),
  expiresAt: tsCol("expires_at").notNull(),
  createdAt: tsCol("created_at"),
  updatedAt: tsCol("updated_at"),
});

// Sifiso Portfolio Core Schema

export const projects = table("projects", {
  id: textCol("id").primaryKey().$defaultFn(() => uuidv4()),
  title: textCol("title").notNull(),
  slug: textCol("slug").notNull().unique(),
  description: textCol("description"),
  brief: textCol("brief"),
  role: textCol("role"),
  timeline: textCol("timeline"),
  tools: textCol("tools"),
  clientName: textCol("client_name"),
  category: textCol("category"),
  thumbnailUrl: textCol("thumbnail_url"),
  heroImageUrl: textCol("hero_image_url"),
  processGallery: jsonCol("process_gallery"),
  resultsMetrics: jsonCol("results_metrics"),
  sortOrder: intCol("sort_order").default(0),
  isFeatured: boolCol("is_featured").default(false),
  isPublished: boolCol("is_published").default(false),
  createdAt: tsCol("created_at").default(nowHelper()).notNull(),
  updatedAt: tsCol("updated_at").default(nowHelper()).notNull(),
  createdBy: textCol("created_by").references(() => user.id, { onDelete: "set null" }),
});

export const projectImages = table("project_images", {
  id: textCol("id").primaryKey().$defaultFn(() => uuidv4()),
  projectId: textCol("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  imageUrl: textCol("image_url").notNull(),
  caption: textCol("caption"),
  sortOrder: intCol("sort_order").default(0),
  createdAt: tsCol("created_at").default(nowHelper()).notNull(),
});

export const services = table("services", {
  id: textCol("id").primaryKey().$defaultFn(() => uuidv4()),
  title: textCol("title").notNull(),
  description: textCol("description"),
  iconName: textCol("icon_name"),
  sortOrder: intCol("sort_order").default(0),
  isActive: boolCol("is_active").default(true),
  createdAt: tsCol("created_at").default(nowHelper()).notNull(),
  updatedAt: tsCol("updated_at").default(nowHelper()).notNull(),
});

export const testimonials = table("testimonials", {
  id: textCol("id").primaryKey().$defaultFn(() => uuidv4()),
  clientName: textCol("client_name").notNull(),
  clientTitle: textCol("client_title"),
  content: textCol("content").notNull(),
  avatarUrl: textCol("avatar_url"),
  rating: intCol("rating").default(5),
  isFeatured: boolCol("is_featured").default(false),
  isPublished: boolCol("is_published").default(true),
  sortOrder: intCol("sort_order").default(0),
  createdAt: tsCol("created_at").default(nowHelper()).notNull(),
  updatedAt: tsCol("updated_at").default(nowHelper()).notNull(),
});

export const inquiries = table("inquiries", {
  id: textCol("id").primaryKey().$defaultFn(() => uuidv4()),
  name: textCol("name").notNull(),
  email: textCol("email").notNull(),
  phoneNumber: textCol("phone_number"),
  socialMedia: textCol("social_media"),
  message: textCol("message").notNull(),
  subject: textCol("subject"),
  budgetRange: textCol("budget_range"),
  projectInterest: textCol("project_interest").references(() => projects.id, { onDelete: "set null" }),
  status: textCol("status").default("unread"),
  isRead: boolCol("is_read").default(false),
  createdAt: tsCol("created_at").default(nowHelper()).notNull(),
  updatedAt: tsCol("updated_at").default(nowHelper()).notNull(),
});

export const tags = table("tags", {
  id: textCol("id").primaryKey().$defaultFn(() => uuidv4()),
  name: textCol("name").notNull().unique(),
  slug: textCol("slug").notNull().unique(),
  createdAt: tsCol("created_at").default(nowHelper()).notNull(),
});

export const projectTags = table("project_tags", {
  projectId: textCol("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  tagId: textCol("tag_id")
    .notNull()
    .references(() => tags.id, { onDelete: "cascade" }),
});

export const pricingPackages = table("pricing_packages", {
  id: textCol("id").primaryKey().$defaultFn(() => uuidv4()),
  name: textCol("name").notNull(),
  price: textCol("price").notNull(),
  badge: textCol("badge"),
  features: jsonCol("features"),
  isPopular: boolCol("is_popular").default(false),
  sortOrder: intCol("sort_order").default(0),
  isActive: boolCol("is_active").default(true),
  createdAt: tsCol("created_at").default(nowHelper()).notNull(),
  updatedAt: tsCol("updated_at").default(nowHelper()).notNull(),
});

export const siteSettings = table("site_settings", {
  key: textCol("key").primaryKey(),
  value: jsonCol("value").notNull(),
  updatedAt: tsCol("updated_at").default(nowHelper()).notNull(),
});

export const creativeProcessSteps = table("creative_process_steps", {
  id: textCol("id").primaryKey().$defaultFn(() => uuidv4()),
  stepNumber: textCol("step_number").notNull(),
  title: textCol("title").notNull(),
  subtitle: textCol("subtitle"),
  description: textCol("description"),
  iconName: textCol("icon_name"),
  sortOrder: intCol("sort_order").default(0),
  isActive: boolCol("is_active").default(true),
  createdAt: tsCol("created_at").default(nowHelper()).notNull(),
});

export const quotes = table("quotes", {
  id: textCol("id").primaryKey().$defaultFn(() => uuidv4()),
  content: textCol("content").notNull(),
  author: textCol("author").notNull(),
  sortOrder: intCol("sort_order").default(0),
  isActive: boolCol("is_active").default(true),
  createdAt: tsCol("created_at").default(nowHelper()).notNull(),
});

// Relations

export const projectsRelations = relations(projects, ({ many }) => ({
  images: many(projectImages),
  tags: many(projectTags),
  inquiries: many(inquiries),
}));

export const projectImagesRelations = relations(projectImages, ({ one }) => ({
  project: one(projects, {
    fields: [projectImages.projectId],
    references: [projects.id],
  }),
}));

export const projectTagsRelations = relations(projectTags, ({ one }) => ({
  project: one(projects, {
    fields: [projectTags.projectId],
    references: [projects.id],
  }),
  tag: one(tags, {
    fields: [projectTags.tagId],
    references: [tags.id],
  }),
}));

export const inquiriesRelations = relations(inquiries, ({ one }) => ({
  project: one(projects, {
    fields: [inquiries.projectInterest],
    references: [projects.id],
  }),
}));

export const loginLogs = table("login_logs", {
  id: textCol("id").primaryKey().$defaultFn(() => uuidv4()),
  email: textCol("email").notNull(),
  status: textCol("status").notNull(), // success, failed
  ipAddress: textCol("ip_address"),
  userAgent: textCol("user_agent"),
  timestamp: tsCol("timestamp").default(nowHelper()).notNull(),
});

export const pageViews = table("page_views", {
  id: textCol("id").primaryKey().$defaultFn(() => uuidv4()),
  path: textCol("path").notNull(),
  userAgent: textCol("user_agent"),
  ipAddress: textCol("ip_address"),
  timestamp: tsCol("timestamp").default(nowHelper()).notNull(),
});

// v2.0 Blog Schema
export const blogCategories = table("blog_categories", {
  id: textCol("id").primaryKey().$defaultFn(() => uuidv4()),
  name: textCol("name").notNull().unique(),
  slug: textCol("slug").notNull().unique(),
  description: textCol("description"),
  createdAt: tsCol("created_at").default(nowHelper()).notNull(),
});

export const blogPosts = table("blog_posts", {
  id: textCol("id").primaryKey().$defaultFn(() => uuidv4()),
  title: textCol("title").notNull(),
  slug: textCol("slug").notNull().unique(),
  excerpt: textCol("excerpt"),
  content: textCol("content").notNull(), // Markdown or HTML
  coverImage: textCol("cover_image"),
  authorId: textCol("author_id").references(() => user.id, { onDelete: "set null" }),
  isPublished: boolCol("is_published").default(false),
  publishedAt: tsCol("published_at"),
  createdAt: tsCol("created_at").default(nowHelper()).notNull(),
  updatedAt: tsCol("updated_at").default(nowHelper()).notNull(),
});

export const postCategories = table("post_categories", {
  postId: textCol("post_id")
    .notNull()
    .references(() => blogPosts.id, { onDelete: "cascade" }),
  categoryId: textCol("category_id")
    .notNull()
    .references(() => blogCategories.id, { onDelete: "cascade" }),
});

export const blogPostsRelations = relations(blogPosts, ({ many, one }) => ({
  categories: many(postCategories),
  author: one(user, {
    fields: [blogPosts.authorId],
    references: [user.id],
  }),
}));

export const postCategoriesRelations = relations(postCategories, ({ one }) => ({
  post: one(blogPosts, {
    fields: [postCategories.postId],
    references: [blogPosts.id],
  }),
  category: one(blogCategories, {
    fields: [postCategories.categoryId],
    references: [blogCategories.id],
  }),
}));

export type Project = typeof projects.$inferSelect;
export type Inquiry = typeof inquiries.$inferSelect;
export type NewInquiry = typeof inquiries.$inferInsert;
export type Testimonial = typeof testimonials.$inferSelect;
export type NewTestimonial = typeof testimonials.$inferInsert;

// v2.0 Client Portal Schema
export const clients = table("clients", {
  id: textCol("id").primaryKey().$defaultFn(() => uuidv4()),
  userId: textCol("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  companyName: textCol("company_name"),
  phoneNumber: textCol("phone_number"),
  status: textCol("status").default("active"),
  createdAt: tsCol("created_at").default(nowHelper()).notNull(),
});

export const projectMilestones = table("project_milestones", {
  id: textCol("id").primaryKey().$defaultFn(() => uuidv4()),
  projectId: textCol("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  title: textCol("title").notNull(),
  description: textCol("description"),
  status: textCol("status").default("pending"), // pending, in_progress, completed, approved
  dueDate: tsCol("due_date"),
  completedAt: tsCol("completed_at"),
  sortOrder: intCol("sort_order").default(0),
  createdAt: tsCol("created_at").default(nowHelper()).notNull(),
});

export const projectApprovals = table("project_approvals", {
  id: textCol("id").primaryKey().$defaultFn(() => uuidv4()),
  milestoneId: textCol("milestone_id").notNull().references(() => projectMilestones.id, { onDelete: "cascade" }),
  clientId: textCol("client_id").notNull().references(() => clients.id, { onDelete: "cascade" }),
  status: textCol("status").default("pending"), // pending, approved, rejected
  feedback: textCol("feedback"),
  createdAt: tsCol("created_at").default(nowHelper()).notNull(),
});

export const clientRelations = relations(clients, ({ one, many }) => ({
  user: one(user, {
    fields: [clients.userId],
    references: [user.id],
  }),
  approvals: many(projectApprovals),
}));

export const projectMilestoneRelations = relations(projectMilestones, ({ one, many }) => ({
  project: one(projects, {
    fields: [projectMilestones.projectId],
    references: [projects.id],
  }),
  approvals: many(projectApprovals),
}));

export const invoices = table("invoices", {
  id: textCol("id").primaryKey().$defaultFn(() => uuidv4()),
  clientId: textCol("client_id").notNull().references(() => clients.id, { onDelete: "cascade" }),
  projectId: textCol("project_id").references(() => projects.id, { onDelete: "set null" }),
  invoiceNumber: textCol("invoice_number").notNull().unique(),
  amount: textCol("amount").notNull(),
  currency: textCol("currency").default("USD"),
  status: textCol("status").default("unpaid"), // unpaid, paid, overdue, cancelled
  dueDate: tsCol("due_date"),
  paidAt: tsCol("paid_at"),
  pdfUrl: textCol("pdf_url"),
  paymentLink: textCol("payment_link"),
  createdAt: tsCol("created_at").default(nowHelper()).notNull(),
});

export const invoiceRelations = relations(invoices, ({ one }) => ({
  client: one(clients, {
    fields: [invoices.clientId],
    references: [clients.id],
  }),
  project: one(projects, {
    fields: [invoices.projectId],
    references: [projects.id],
  }),
}));
