import type { MetadataRoute } from "next";
import { buildAbsoluteUrl } from "./metadata-builders";
import { getSiteUrl } from "./site-config";

type SitemapEntryOptions = {
  lastModified?: Date | string;
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority?: number;
};

export function createSitemapEntry(
  path: string,
  options: SitemapEntryOptions = {},
): MetadataRoute.Sitemap[number] {
  return {
    url: buildAbsoluteUrl(path),
    lastModified: options.lastModified ?? new Date(),
    changeFrequency: options.changeFrequency ?? "weekly",
    priority: options.priority ?? 0.5,
  };
}

export function getSitemapUrl(): string {
  return buildAbsoluteUrl("/sitemap.xml");
}

export function buildRobotsConfig(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: getSitemapUrl(),
    host: getSiteUrl(),
  };
}
