import {
  sqliteTable,
  text,
  integer,
} from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

// Better Auth v2 Schema (SQLite version)
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull(),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp" }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp" }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
});

// Sifiso Portfolio Core Schema

export const projects = sqliteTable("projects", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  brief: text("brief"),
  role: text("role"),
  timeline: text("timeline"),
  tools: text("tools"),
  clientName: text("client_name"),
  category: text("category"),
  thumbnailUrl: text("thumbnail_url"),
  heroImageUrl: text("hero_image_url"),
  processGallery: text("process_gallery", { mode: "json" }),
  resultsMetrics: text("results_metrics", { mode: "json" }),
  sortOrder: integer("sort_order").default(0),
  isFeatured: integer("is_featured", { mode: "boolean" }).default(false),
  isPublished: integer("is_published", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
  createdBy: text("created_by").references(() => user.id, { onDelete: "set null" }),
});

export const projectImages = sqliteTable("project_images", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  imageUrl: text("image_url").notNull(),
  caption: text("caption"),
  sortOrder: integer("sort_order").default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
});

export const services = sqliteTable("services", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  title: text("title").notNull(),
  description: text("description"),
  iconName: text("icon_name"),
  sortOrder: integer("sort_order").default(0),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
});

export const testimonials = sqliteTable("testimonials", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  clientName: text("client_name").notNull(),
  clientTitle: text("client_title"),
  content: text("content").notNull(),
  avatarUrl: text("avatar_url"),
  rating: integer("rating").default(5),
  isFeatured: integer("is_featured", { mode: "boolean" }).default(false),
  isPublished: integer("is_published", { mode: "boolean" }).default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
});

export const inquiries = sqliteTable("inquiries", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phoneNumber: text("phone_number"),
  socialMedia: text("social_media"),
  message: text("message").notNull(),
  subject: text("subject"),
  budgetRange: text("budget_range"),
  projectInterest: text("project_interest").references(() => projects.id, { onDelete: "set null" }),
  status: text("status").default("unread"),
  isRead: integer("is_read", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
});

export const tags = sqliteTable("tags", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
});

export const projectTags = sqliteTable("project_tags", {
  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  tagId: text("tag_id")
    .notNull()
    .references(() => tags.id, { onDelete: "cascade" }),
});

export const pricingPackages = sqliteTable("pricing_packages", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  name: text("name").notNull(),
  price: text("price").notNull(),
  badge: text("badge"),
  features: text("features", { mode: "json" }),
  isPopular: integer("is_popular", { mode: "boolean" }).default(false),
  sortOrder: integer("sort_order").default(0),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
});

export const siteSettings = sqliteTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value", { mode: "json" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
});

export const creativeProcessSteps = sqliteTable("creative_process_steps", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  stepNumber: text("step_number").notNull(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  description: text("description"),
  iconName: text("icon_name"),
  sortOrder: integer("sort_order").default(0),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
});

export const quotes = sqliteTable("quotes", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  content: text("content").notNull(),
  author: text("author").notNull(),
  sortOrder: integer("sort_order").default(0),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
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

export const loginLogs = sqliteTable("login_logs", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  email: text("email").notNull(),
  status: text("status").notNull(), // success, failed
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  timestamp: integer("timestamp", { mode: "timestamp" }).default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Inquiry = typeof inquiries.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type LoginLog = typeof loginLogs.$inferSelect;
