import { mockData } from "../api/mockData";
import { SuggestionItem } from "../types/suggestion";

const USE_MOCK = false; // Set to true to use mock data
const REST_COUNTRIES_API_URL = "https://restcountries.com/v3.1/name/";
// const REST_COUNTRIES_API_URL = "https://restcountries-BROKEN.com/v3.1/name/";

interface CountryResponseItem {
  name: { common: string };
}

class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

interface CacheItem {
  timestamp: number;
  data: SuggestionItem[];
}
const CACHE_DURATION = 5 * 60 * 1000;
const cache = new Map<string, CacheItem>();
const isCacheValid = (item: CacheItem) =>
  Date.now() - item.timestamp < CACHE_DURATION;
const normalizeString = (s: string) => s.toLowerCase().trim();

export async function getSuggestions(query: string): Promise<SuggestionItem[]> {
  const normalizedQuery = normalizeString(query);
  if (!normalizedQuery) return [];

  const cached = cache.get(normalizedQuery);
  if (cached && isCacheValid(cached)) return cached.data;

  let data: CountryResponseItem[];

  if (USE_MOCK) {
    data = mockData.map((n) => ({ name: { common: n.name } }));
  } else {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(
      `${REST_COUNTRIES_API_URL}${encodeURIComponent(normalizedQuery)}`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (res.status === 404) return [];
    if (!res.ok) throw new ApiError(res.status, res.statusText);

    data = await res.json();
  }

  const all: SuggestionItem[] = data.map((country, idx) => ({
    id: idx,
    name: country.name.common,
  }));

  const norm = normalizeString;

  const prefix = all.filter((c) => norm(c.name).startsWith(normalizedQuery));

  const substr = all
    .filter(
      (c) =>
        !norm(c.name).startsWith(normalizedQuery) &&
        norm(c.name).includes(normalizedQuery)
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
