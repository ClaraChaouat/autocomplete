import type { FC } from 'react'
import { useState, useRef, useCallback } from 'react'
import styles from './Autocomplete.module.css'
import type { AutocompleteProps, SuggestionItem } from '../types'
import { useOnClickOutside } from '../hooks/useOnClickOutside'
import { useSuggestionFetcher } from '../hooks/useSuggestionFetcher'
import { AUTOCOMPLETE_CONFIG } from '../constants/autocompleteVariables'
import { getKeyDownHandler } from '../helpers/listNavigationHandler'
import { highlightTextMatch } from '../helpers/highlightTextMatch'

const Autocomplete: FC<AutocompleteProps> = ({
    placeholder = 'Search...',
    onSelect,
    maxSuggestions = AUTOCOMPLETE_CONFIG.MAX_SUGGESTIONS
}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const [inputValue, setInputValue] = useState('')
    const [activeIndex, setActiveIndex] = useState(-1)

    const {
        suggestions,
        isLoading,
        error,
        isOpen,
        setIsOpen
    } = useSuggestionFetcher({ query: inputValue, maxSuggestions })

    const handleKeyDown = getKeyDownHandler({
        isOpen,
        suggestions,
        activeIndex,
        setActiveIndex,
        onSelect,
        setIsOpen
    })

    const closeDropdown = useCallback(() => {
        setIsOpen(false)
        setActiveIndex(-1)
    }, [setIsOpen])

    useOnClickOutside(containerRef, closeDropdown)

    const renderSuggestionItem = (
        item: SuggestionItem,
        index: number
    ) => (
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
            {highlightTextMatch(item.name, inputValue, styles.highlight)}
        </li>
    )

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.statusRow}>
                <div className={styles.loadingSlot}>
                    {isLoading && <span>Loading...</span>}
                </div>
            </div>

            <div className={styles.inputWrapper}>
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

                {isOpen && (
                    <ul className={styles.suggestionsList} role="listbox">
                        {suggestions.length > 0 ? (
                            suggestions.map((item, index) => renderSuggestionItem(item, index))
                        ) : (
                            <li className={styles.noResults} role="option" aria-disabled="true">
                                No results found
                            </li>
                        )}
                    </ul>
                )}
            </div>

            {error && <div className={styles.error}>{error}</div>}
        </div>
    )
}

export default Autocomplete
