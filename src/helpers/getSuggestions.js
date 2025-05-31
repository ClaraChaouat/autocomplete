import { mockData } from "../api/mockData";
const USE_MOCK = false;
const REST_COUNTRIES_API_URL = "https://restcountries.com/v3.1/name/";
class ApiError extends Error {
  status;
  constructor(status, message) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}
const CACHE_DURATION = 5 * 60 * 1000;
const cache = new Map();
const isCacheValid = (item) => Date.now() - item.timestamp < CACHE_DURATION;
const normalizeString = (s) => s.toLowerCase().trim();
export async function getSuggestions(query) {
  const normalizedQuery = normalizeString(query);
  if (!normalizedQuery) return [];
  const cached = cache.get(normalizedQuery);
  if (cached && isCacheValid(cached)) return cached.data;
  let data;
  if (USE_MOCK) {
    data = mockData.map((n) => ({ name: { common: n.name } }));
  } else {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(
      `${REST_COUNTRIES_API_URL}${encodeURIComponent(normalizedQuery)}`,
      { signal: controller.signal },
    );
    clearTimeout(timeoutId);
    if (res.status === 404) return [];
    if (!res.ok) {
      throw new ApiError(
        res.status,
        `API request failed with status ${res.status}`,
      );
    }
    data = await res.json();
  }
  const all = data.map((country, idx) => ({
    id: idx,
    name: country.name.common,
  }));
  const norm = normalizeString;
  const prefix = all.filter((c) => norm(c.name).startsWith(normalizedQuery));
  const substr = all
    .filter(
      (c) =>
        !norm(c.name).startsWith(normalizedQuery) &&
        norm(c.name).includes(normalizedQuery),
    )
    .sort((a, b) => {
      const posA = norm(a.name).indexOf(normalizedQuery);
      const posB = norm(b.name).indexOf(normalizedQuery);
      return posA === posB ? a.name.localeCompare(b.name) : posA - posB;
    });
  const results = [...prefix, ...substr];
  cache.set(normalizedQuery, { timestamp: Date.now(), data: results });
  return results;
}
