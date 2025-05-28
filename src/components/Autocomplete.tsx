import type { FC } from 'react'
import { useState, useEffect, useRef } from 'react'
import type { KeyboardEvent } from 'react'
import { getSuggestions } from '../utils/getSuggestions'
import styles from './Autocomplete.module.css'
import type { AutocompleteProps, SuggestionItem } from '../types'
import { AUTOCOMPLETE_CONFIG } from '../constants/autocompleteVariables'


const Autocomplete: FC<AutocompleteProps> = ({
    placeholder = 'Search...',
    onSelect,
    maxSuggestions = AUTOCOMPLETE_CONFIG.MAX_SUGGESTIONS
}) => {
    // States
    const [inputValue, setInputValue] = useState('')
    const [suggestions, setSuggestions] = useState<SuggestionItem[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(-1)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Refs
    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)



    // Implement async search with error handling
    useEffect(() => {
        if (inputValue.length < AUTOCOMPLETE_CONFIG.MIN_SEARCH_LENGTH) {
            setSuggestions([])
            setIsOpen(false)
            return
        }

        const timeoutId = setTimeout(async () => {
            setIsLoading(true)
            setError(null)

            try {
                const results = await getSuggestions(inputValue)
                setSuggestions(results.slice(0, maxSuggestions))
                setIsOpen(true)
            } catch (err) {
                setError(`Failed to fetch suggestions: ${err instanceof Error ? err.message : String(err)}`)
                setSuggestions([])
            } finally {
                setIsLoading(false)
            }
        }, 300)

        return () => clearTimeout(timeoutId)
    }, [inputValue, maxSuggestions])

    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!isOpen) return

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault()
                setActiveIndex(prev => Math.min(prev + 1, suggestions.length - 1))
                break
            case 'ArrowUp':
                e.preventDefault()
                setActiveIndex(prev => Math.max(prev - 1, -1))
                break
            case 'Enter':
                e.preventDefault()
                if (activeIndex >= 0) {
                    onSelect(suggestions[activeIndex])
                    setIsOpen(false)
                }
                break
            case 'Escape':
                e.preventDefault()
                setIsOpen(false)
                break
        }
    }

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div ref={containerRef} className={styles.container}>
            <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className={styles.input}
                aria-expanded={isOpen}
                role="combobox"
            />

            {isLoading && (
                <div className={styles.loading}>Loading...</div>
            )}

            {error && (
                <div className={styles.error} role="alert">
                    {error}
                </div>
            )}

            {isOpen && suggestions.length > 0 && (
                <ul className={styles.suggestionsList} role="listbox">
                    {suggestions.map((item, index) => (
                        <li
                            key={item.id}
                            role="option"
                            aria-selected={index === activeIndex}
                            className={`${styles.suggestionItem} ${index === activeIndex ? styles.active : ''}`}
                            onClick={() => {
                                onSelect(item)
                                setIsOpen(false)
                            }}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Autocomplete