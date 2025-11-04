export async function fetchJson(path: string, init?: RequestInit) {
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  const url = path.startsWith("http") ? path : `${base}${path}`;
  const baseHeaders: Record<string, string> = { "Content-Type": "application/json" };
  let headers: HeadersInit = baseHeaders;
  if (init?.headers) {
    const h = init.headers as HeadersInit;
    if (Array.isArray(h)) {
      for (const [k, v] of h) baseHeaders[k] = String(v);
    } else if (typeof Headers !== "undefined" && h instanceof Headers) {
      h.forEach((v, k) => {
        baseHeaders[k] = v;
      });
    } else {
      headers = { ...baseHeaders, ...(h as Record<string, string>) };
    }
  }
  const res = await fetch(url, { ...init, headers, cache: "no-store" });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(text || res.statusText);
  }
  if (res.status === 204) return null;
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : (await res.text());
}

export const apiFetcher = (path: string) => fetchJson(path);
