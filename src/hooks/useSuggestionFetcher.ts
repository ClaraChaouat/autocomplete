
import { useEffect, useState } from 'react'
import type { SuggestionItem } from '../types'
import { getSuggestions } from '../utils/getSuggestions'
import { AUTOCOMPLETE_CONFIG } from '../constants/autocompleteVariables'

interface UseSuggestionFetcherProps {
    query: string
    maxSuggestions?: number
}

export const useSuggestionFetcher = ({
    query,
    maxSuggestions = AUTOCOMPLETE_CONFIG.MAX_SUGGESTIONS
}: UseSuggestionFetcherProps) => {
    const [suggestions, setSuggestions] = useState<SuggestionItem[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const trimmedQuery = query.trim()
        if (trimmedQuery.length < AUTOCOMPLETE_CONFIG.MIN_SEARCH_LENGTH) {
            setSuggestions([])
            setIsOpen(false)
            setIsLoading(false)
            setError(null)
            return
        }

        const timeoutId = setTimeout(async () => {
            setIsLoading(true)
            setError(null)

            try {
                const results = await getSuggestions(trimmedQuery)
                setSuggestions(results.slice(0, maxSuggestions))
                setIsOpen(true)
            } catch (err) {
                setError(`Failed to fetch suggestions: ${err instanceof Error ? err.message : String(err)}`)
                setSuggestions([])
            } finally {
                setIsLoading(false)
            }
        }, 300)

        return () => {
            clearTimeout(timeoutId)
            setIsLoading(false)
        }
    }, [query, maxSuggestions])

    return { suggestions, isLoading, error, isOpen, setIsOpen }
}
