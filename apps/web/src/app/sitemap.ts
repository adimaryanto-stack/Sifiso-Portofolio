import { MetadataRoute } from 'next';
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sifiso.pro';

  // Fetch all projects for dynamic links
  let projectLinks: any[] = [];
  try {
    const allProjects = await db.select().from(projects);
    projectLinks = allProjects.map((p: any) => ({
      url: `${baseUrl}/work/${p.slug}`,
      lastModified: new Date(p.updatedAt || p.createdAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));
  } catch (e) {
    console.error("Sitemap: Failed to fetch projects", e);
  }

  const routes = ['', '/work', '/about', '/get-started'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...routes, ...projectLinks] as MetadataRoute.Sitemap;
}
