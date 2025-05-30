import type { FC } from 'react'
import styles from './Autocomplete.module.css'
import NoResult from '../NoResults/NoResults'
import MenuItem from '../MenuItem/MenuItem'
import HighlightedText from '../HighlightedText/HighlightedText'
import SearchField from '../SearchField/SearchField'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'
import { AutocompleteProps } from '../../types/suggestion'


const Autocomplete: FC<AutocompleteProps> = ({
    value,
    suggestions,
    isOpen,
    isLoading,
    error,
    onChange,
    onKeyDown,
    onSelect,
    inputRef,
    activeIndex,
    placeholder,
    ariaLabel,
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.statusRow}>
                <div className={styles.loadingSlot}>
                    {isLoading && <LoadingIndicator />}
                </div>
            </div>

            <div className={styles.inputWrapper}>
                <SearchField
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={onKeyDown}
                    inputRef={inputRef}
                    placeholder={placeholder}
                    ariaLabel={ariaLabel}
                    error={error}
                    className={styles.input}
                    isOpen={isOpen}
                    activeIndex={activeIndex}
                    suggestions={suggestions}
                />

                {isOpen && (
                    <ul className={styles.suggestionsList} role="listbox" id="autocomplete-listbox">
                        {suggestions.length > 0 ? (
                            suggestions.map((item, index) => (
                                <MenuItem
                                    key={item.id}
                                    item={item}
                                    isActive={index === activeIndex}
                                    onClick={() => onSelect(item)}
                                    className={`${styles.suggestionItem} ${index === activeIndex ? styles.active : ''}`}
                                >
                                    <HighlightedText
                                        text={item.name}
                                        query={value}
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
    );
};

export default Autocomplete
