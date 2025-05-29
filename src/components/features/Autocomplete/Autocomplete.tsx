import type { FC } from 'react'
import { useState, useRef, useCallback } from 'react'
import styles from './Autocomplete.module.css'
import type { AutocompleteProps, SuggestionItem } from './types'
import { useOnClickOutside } from './hooks/useOnClickOutside'
import { useSuggestionFetcher } from './hooks/useSuggestionFetcher'
import { AUTOCOMPLETE_CONFIG } from './constants/autocompleteConstants'
import { getKeyDownHandler } from './helpers/listNavigationHandler'
import { highlightTextMatch } from './helpers/highlightTextMatch'
import LoadingIndicator from '../../common/LoadingIndicator'
import ErrorMessage from '../../common/ErrorMessage'

const Autocomplete: FC<AutocompleteProps> = ({
    placeholder,
    onSelect,
    maxSuggestions = AUTOCOMPLETE_CONFIG.MAX_SUGGESTIONS
}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const [inputValue, setInputValue] = useState('')
    const [inputError, setInputError] = useState<string | null>(null)
    const [activeIndex, setActiveIndex] = useState(-1)
    const [justSelected, setJustSelected] = useState(false)


    const {
        suggestions,
        isLoading,
        error,
        isOpen,
        setIsOpen
    } = useSuggestionFetcher({ query: inputValue, maxSuggestions, justSelected })

    const handleKeyDown = getKeyDownHandler({
        isOpen,
        suggestions,
        activeIndex,
        setActiveIndex,
        onSelect,
        setIsOpen,
        setInputValue
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
                setInputValue(item.name)
                onSelect(item)
                setIsOpen(false)
                setJustSelected(true)

            }}
        >
            {highlightTextMatch(item.name, inputValue, styles.highlight)}
        </li>
    )


    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.statusRow}>
                <div className={styles.loadingSlot}>
                    {isLoading && < LoadingIndicator />}
                </div>
            </div>

            <div className={styles.inputWrapper}>
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                        const raw = e.target.value
                        const isValid = /^[a-zA-ZÀ-ÿ\s'-]*$/.test(raw)

                        if (!isValid) {
                            setInputError('Invalid input – only letters, spaces, apostrophes, and hyphens are allowed.')
                        } else {
                            setInputError(null)
                        }

                        setInputValue(raw.trimStart())
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className={styles.input}
                    aria-expanded={isOpen}
                    role="combobox"
                    aria-autocomplete="list"
                    aria-controls="autocomplete-listbox"
                    aria-activedescendant={activeIndex >= 0 ? `option-${activeIndex}` : undefined}
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

            <ErrorMessage message={inputError || error} />
        </div>
    )

}

export default Autocomplete
