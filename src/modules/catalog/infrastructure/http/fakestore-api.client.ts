const API_BASE = "https://fakestoreapi.com";
export const FAKESTORE_REVALIDATE_SECONDS = 3600;

export async function fakeStoreFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    next: { revalidate: FAKESTORE_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Fake Store API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
