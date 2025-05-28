import { mockData } from '../data/mockData'
import type { SuggestionItem } from '../types'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'
const REST_COUNTRIES_API_URL = import.meta.env.VITE_REST_COUNTRIES_API || 'https://restcountries.com/v3.1/name/'

interface CountryResponseItem {
    name: {
        common: string
    }
}

/**
 * Fetches suggestions from either a public API or mock data
 * depending on the USE_MOCK flag.
 */
export const getSuggestions = async (query: string): Promise<SuggestionItem[]> => {
    if (!query.trim()) return []

    if (USE_MOCK) {
        const normalizedQuery = query.toLowerCase()
        return mockData.filter(item =>
            item.name.toLowerCase().includes(normalizedQuery)
        )
    }

    try {
        const response = await fetch(`${REST_COUNTRIES_API_URL}${query}`)
        if (!response.ok) throw new Error(`API request failed with status ${response.status}`)
        const data: CountryResponseItem[] = await response.json()

        return data.map((country, index) => ({
            id: index,
            name: country.name.common
        }))
    } catch (error) {
        console.error('API error:', error)
        throw error
    }
}
