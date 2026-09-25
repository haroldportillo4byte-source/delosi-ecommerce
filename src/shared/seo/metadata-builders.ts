import type { Metadata } from "next";
import type { Product } from "@/modules/catalog/domain/entities/product";
import type { ProductQuery } from "@/modules/catalog/domain/value-objects/product-query";
import { getSiteUrl, SITE_DEFAULT_DESCRIPTION, SITE_LOCALE, SITE_NAME } from "./site-config";

const META_DESCRIPTION_MAX = 160;

export function truncateMetaDescription(text: string, max = META_DESCRIPTION_MAX): string {
  const normalized = text.trim().replace(/\s+/g, " ");
  if (normalized.length <= max) return normalized;
  return `${normalized.slice(0, max - 1).trimEnd()}…`;
}

export function buildAbsoluteUrl(path: string): string {
  const base = getSiteUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

type PageMetadataInput = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description = SITE_DEFAULT_DESCRIPTION,
  path = "/",
  image,
  imageAlt,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const metaDescription = truncateMetaDescription(description);
  const canonical = buildAbsoluteUrl(path);
  const ogImage = image ? [{ url: image, alt: imageAlt ?? title }] : undefined;

  return {
    title,
    description: metaDescription,
    alternates: { canonical },
    openGraph: {
      title,
      description: metaDescription,
      url: canonical,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type: "website",
      ...(ogImage ? { images: ogImage } : {}),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description: metaDescription,
      ...(ogImage ? { images: ogImage.map((entry) => entry.url) } : {}),
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export function buildRootMetadata(): Metadata {
  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DEFAULT_DESCRIPTION,
    openGraph: {
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
    robots: { index: true, follow: true },
  };
}

export function buildCatalogMetadata(query: ProductQuery): Metadata {
  const parts: string[] = [];
  if (query.category) parts.push(`Categoría ${query.category}`);
  if (query.q) parts.push(`Búsqueda “${query.q}”`);
  if (query.minRating !== undefined) parts.push(`Calificación ${query.minRating}+`);
  if (query.priceRange) parts.push(`Precio ${query.priceRange}`);

  const title = parts.length > 0 ? parts.join(" · ") : "Catálogo de productos";
  const description =
    parts.length > 0
      ? `Resultados del catálogo Delosi: ${parts.join(", ")}. Filtra, ordena y compra online.`
      : "Explora el catálogo con filtros por categoría, búsqueda y ordenamiento por precio.";

  const search = new URLSearchParams();
  if (query.category) search.set("category", query.category);
  if (query.q) search.set("q", query.q);
  if (query.sort && query.sort !== "relevance") search.set("sort", query.sort);
  if (query.minRating !== undefined) search.set("minRating", String(query.minRating));
  if (query.priceRange) search.set("price", query.priceRange);
  const qs = search.toString();
  const path = qs ? `/products?${qs}` : "/products";

  return buildPageMetadata({ title, description, path });
}

export function buildProductMetadata(product: Product): Metadata {
  const description = truncateMetaDescription(product.description);
  return buildPageMetadata({
    title: product.title,
    description,
    path: `/products/${product.id}`,
    image: product.image,
    imageAlt: product.title,
  });
}

export function buildProductNotFoundMetadata(): Metadata {
  return buildPageMetadata({
    title: "Producto no encontrado",
    description: "El producto solicitado no está disponible en el catálogo de Delosi Store.",
    path: "/products",
    noIndex: true,
  });
}
