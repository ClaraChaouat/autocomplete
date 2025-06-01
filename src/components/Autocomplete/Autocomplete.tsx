import { forwardRef, useEffect } from "react";
import styles from "./Autocomplete.module.css";

import NoResult from "../NoResults/NoResults";
import MenuItem from "../MenuItem/MenuItem";
import HighlightedText from "../HighlightedText/HighlightedText";
import SearchField from "../SearchField/SearchField";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

import { AutocompleteProps, SuggestionItem } from "../../types/suggestion";

export const Autocomplete = forwardRef<HTMLDivElement, AutocompleteProps>(
  (
    {
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
      label,
      setActiveIndex,
    },
    outerRef
  ) => {
    useEffect(() => {
      if (!isOpen || activeIndex < 0) return;

      const activeId = `option-${suggestions[activeIndex]?.id}`;
      const el = document.getElementById(activeId);
      el?.scrollIntoView({ block: "nearest" });
    }, [activeIndex, isOpen, suggestions]);

    return (
      <div ref={outerRef} className={styles.container}>
        <div className={styles.statusRow}>
          <div className={styles.loadingSlot}>
            {isLoading && <LoadingIndicator />}
          </div>
        </div>

        {label && (
          <label htmlFor="autocomplete-input" className={styles.label}>
            {label}
          </label>
        )}

        <div className={styles.inputWrapper}>
          <SearchField
            id="autocomplete-input"
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
            <ul
              className={styles.suggestionsList}
              role="listbox"
              id="autocomplete-listbox"
            >
              {suggestions.length > 0 ? (
                suggestions.map((item: SuggestionItem, index: number) => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    isActive={index === activeIndex}
                    onClick={() => onSelect(item)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`${styles.suggestionItem} ${
                      index === activeIndex ? styles.active : ""
                    }`}
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
  }
);

export default Autocomplete;
