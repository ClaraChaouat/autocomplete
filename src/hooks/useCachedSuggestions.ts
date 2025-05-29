import { useRef } from 'react'
import type { SuggestionItem } from '../types'
import { getSuggestions } from '../utils/getSuggestions'

export const useCachedSuggestions = () => {
    const cache = useRef<Record<string, SuggestionItem[]>>({})

    const fetchSuggestions = async (query: string): Promise<SuggestionItem[]> => {
        const key = query.toLowerCase().trim()
        if (!key) return []

        if (cache.current[key]) {
            return cache.current[key]
        }

        const results = await getSuggestions(key)
        cache.current[key] = results
        return results
    }

    return { fetchSuggestions }
}
