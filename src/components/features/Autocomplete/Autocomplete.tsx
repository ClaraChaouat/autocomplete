import type { FC } from 'react'
import { useState, useRef, useCallback } from 'react'
import styles from './Autocomplete.module.css'
import type { AutocompleteProps } from './types'
import { useOnClickOutside } from './hooks/useOnClickOutside'
import { useSuggestionFetcher } from './hooks/useSuggestionFetcher'
import { AUTOCOMPLETE_CONFIG } from './constants/autocompleteConstants'
import { getKeyDownHandler } from './helpers/listNavigationHandler'
import LoadingIndicator from '../../common/LoadingIndicator'
import SearchField from './components/SearchField'
import MenuItem from './components/MenuItem'
import NoResult from './components/NoResults'
import HighlightedText from '../../common/HighlightedText'



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



    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.statusRow}>
                <div className={styles.loadingSlot}>
                    {isLoading && < LoadingIndicator />}
                </div>
            </div>

            <div className={styles.inputWrapper}>

                <SearchField
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
                        setJustSelected(false)
                    }}
                    onKeyDown={(e) => {
                        setJustSelected(true)
                        handleKeyDown(e)

                    }}
                    inputRef={inputRef}
                    placeholder={placeholder}
                    error={inputError}
                    className={styles.input}
                />




                {isOpen && (
                    <ul className={styles.suggestionsList} role="listbox" id="autocomplete-listbox">
                        {suggestions.length > 0 ? (
                            suggestions.map((item, index) => (
                                <MenuItem
                                    key={item.id}
                                    item={item}
                                    isActive={index === activeIndex}
                                    onClick={() => {
                                        setInputValue(item.name)
                                        onSelect(item)
                                        setIsOpen(false)
                                        setJustSelected(true)
                                    }}
                                    className={`${styles.suggestionItem} ${index === activeIndex ? styles.active : ''}`}
                                >
                                    <HighlightedText
                                        text={item.name}
                                        query={inputValue}
                                        highlightClassName={styles.highlight}
                                    />
                                </MenuItem>
                            ))
                        ) : (
                            <NoResult className={styles.noResults} />

                        )}
                    </ul>
                )}

            </div>


        </div>
    )

}

export default Autocomplete
