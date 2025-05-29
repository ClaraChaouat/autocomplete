import { useEffect, useState, useCallback } from 'react'
import type { SuggestionItem } from '../types'
import { getSuggestions } from '../utils/getSuggestions'
import { AUTOCOMPLETE_CONFIG } from '../constants/autocompleteConstants'

interface FetchState {
    suggestions: SuggestionItem[]
    isLoading: boolean
    error: string | null
    isOpen: boolean
}

const initialState: FetchState = {
    suggestions: [],
    isLoading: false,
    error: null,
    isOpen: false
}

interface UseSuggestionFetcherProps {
    query: string
    maxSuggestions?: number
}

export const useSuggestionFetcher = ({
    query,
    maxSuggestions = AUTOCOMPLETE_CONFIG.MAX_SUGGESTIONS
}: UseSuggestionFetcherProps) => {
    const [state, setState] = useState<FetchState>(initialState)

    const fetchSuggestions = useCallback(async () => {
        const trimmedQuery = query.trim()

        const isValid = /^[a-zA-ZÀ-ÿ\s'-]*$/.test(trimmedQuery)
        if (!isValid || trimmedQuery.length < AUTOCOMPLETE_CONFIG.MIN_SEARCH_LENGTH) {
            setState(initialState)
            return
        }

        setState(prev => ({ ...prev, isLoading: true, error: null }))

        try {
            const results = await getSuggestions(trimmedQuery)
            setState({
                suggestions: results.slice(0, maxSuggestions),
                isLoading: false,
                error: null,
                isOpen: results.length > 0
            })
        } catch (err) {
            setState({
                suggestions: [],
                isLoading: false,
                error: err instanceof Error ? err.message : 'Unknown error',
                isOpen: false
            })
        }
    }, [query, maxSuggestions])

    useEffect(() => {
        const debounceMs = 300
        const timeoutId = setTimeout(fetchSuggestions, debounceMs)
        return () => clearTimeout(timeoutId)
    }, [fetchSuggestions])

    return {
        ...state,
        setIsOpen: (value: boolean) => setState(prev => ({ ...prev, isOpen: value }))
    }
}
