import type { SuggestionItem } from '../types'
import { mockData } from '../data/mockData'

/**
 * Simulates an API call to fetch suggestions based on search query
 * @param query - Search query string
 * @returns Promise<SuggestionItem[]> - Filtered suggestions
 */
export const getSuggestions = async (query: string): Promise<SuggestionItem[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300))

    // Return empty array for empty query
    if (!query.trim()) return []

    // Case insensitive search
    const normalizedQuery = query.toLowerCase()

    return mockData.filter(item =>
        item.name.toLowerCase().includes(normalizedQuery)
    )
}