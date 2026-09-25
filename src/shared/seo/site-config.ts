export const SITE_NAME = "Delosi Store";

export const SITE_DEFAULT_DESCRIPTION =
  "Tienda en línea con catálogo, filtros por URL, carrito persistente y checkout simulado.";

export const SITE_LOCALE = "es_PE";

/** URL pública del sitio (canonical, Open Graph, JSON-LD). */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
