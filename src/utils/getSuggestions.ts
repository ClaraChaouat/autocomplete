import { mockData } from '../data/mockData'
import type { SuggestionItem } from '../types'

const USE_MOCK = false
const REST_COUNTRIES_API_URL = 'https://restcountries.com/v3.1/name/'

interface CountryResponseItem {
    name: {
        common: string
    }
}

const cache: Record<string, SuggestionItem[]> = {}


export const getSuggestions = async (query: string): Promise<SuggestionItem[]> => {
    const normalizedQuery = query.toLowerCase().trim()
    if (!normalizedQuery) return []

    // Check in-memory cache
    if (cache[normalizedQuery]) return cache[normalizedQuery]

    if (USE_MOCK) {
        const filtered = mockData.filter(item =>
            item.name.toLowerCase().includes(normalizedQuery)
        )
        cache[normalizedQuery] = filtered
        return filtered
    }

    try {
        const response = await fetch(`${REST_COUNTRIES_API_URL}${normalizedQuery}`)
        if (!response.ok) throw new Error(`API request failed with status ${response.status}`)
        const data: CountryResponseItem[] = await response.json()

        const results = data.map((country, index) => ({
            id: index,
            name: country.name.common
        }))

        cache[normalizedQuery] = results
        return results
    } catch (error) {
        console.error('API error:', error)
        throw error
    }
}
