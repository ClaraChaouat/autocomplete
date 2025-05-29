import { mockData } from '../data/mockData'
import type { SuggestionItem } from '../types'

const USE_MOCK = false
const REST_COUNTRIES_API_URL = 'https://restcountries.com/v3.1/name/'

interface CountryResponseItem {
    name: {
        common: string
    }
}

class ApiError extends Error {
    status: number
    constructor(status: number, message: string) {
        super(message)
        this.name = 'ApiError'
        this.status = status
    }
}

interface CacheItem {
    timestamp: number
    data: SuggestionItem[]
}

const CACHE_DURATION = 5 * 60 * 1000
const cache = new Map<string, CacheItem>()

const isCacheValid = (item: CacheItem): boolean =>
    Date.now() - item.timestamp < CACHE_DURATION

const normalizeString = (str: string): string => str.toLowerCase().trim()

export const getSuggestions = async (query: string): Promise<SuggestionItem[]> => {
    const normalizedQuery = normalizeString(query)
    if (!normalizedQuery) return []

    const cached = cache.get(normalizedQuery)
    if (cached && isCacheValid(cached)) {
        return cached.data
    }

    if (USE_MOCK) {
        const results = mockData.filter(item =>
            normalizeString(item.name).includes(normalizedQuery)
        )
        cache.set(normalizedQuery, {
            timestamp: Date.now(),
            data: results
        })
        return results
    }

    try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)

        const response = await fetch(`${REST_COUNTRIES_API_URL}${encodeURIComponent(normalizedQuery)}`, {
            signal: controller.signal
        })

        clearTimeout(timeoutId)

        if (response.status === 404) {
            return []
        }

        if (!response.ok) {
            throw new ApiError(response.status, `API request failed with status ${response.status}`)
        }

        const data: CountryResponseItem[] = await response.json()
        const results = data
            .map((country, index) => ({
                id: index,
                name: country.name.common
            }))
            // The REST Countries API performs fuzzy matching and may return results 
            // that do not include the actual query string. We filter the API response 
            // client-side to ensure only items whose names contain the normalized query 
            // are shown in the dropdown.
            .filter(item =>
                normalizeString(item.name).includes(normalizedQuery)
            )

        cache.set(normalizedQuery, {
            timestamp: Date.now(),
            data: results
        })

        return results
    } catch (error: unknown) {
        if (error instanceof ApiError) {
            console.error(`API Error (${error.status}):`, error.message)
            throw error
        } else if (error instanceof Error && error.name === 'AbortError') {
            console.error('Request timed out')
            throw new Error('Request timed out after 5 seconds')
        } else {
            console.error('Unexpected error:', error)
            throw new Error('Failed to fetch suggestions')
        }
    }
}
