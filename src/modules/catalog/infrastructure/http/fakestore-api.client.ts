import { getCatalogFallback } from "../data/catalog-fallback";

const API_BASE = "https://fakestoreapi.com";
export const FAKESTORE_REVALIDATE_SECONDS = 3600;

export async function fakeStoreFetch<T>(path: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: FAKESTORE_REVALIDATE_SECONDS },
    });

    if (response.ok) {
      return response.json() as Promise<T>;
    }
  } catch {
    // Red caída o bloqueo (p. ej. 403 en datacenters); usar snapshot local.
  }

  const fallback = getCatalogFallback<T>(path);
  if (fallback !== null) {
    return fallback;
  }

  throw new Error(`Fake Store API unavailable for ${path}`);
}
