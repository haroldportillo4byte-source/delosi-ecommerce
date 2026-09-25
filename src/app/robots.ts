import type { MetadataRoute } from "next";
import { buildRobotsConfig } from "@/shared/seo/sitemap-builders";

export default function robots(): MetadataRoute.Robots {
  return buildRobotsConfig();
}
