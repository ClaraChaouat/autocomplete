import React, { useId } from 'react'
import styles from './SearchField.module.css'

interface SearchFieldProps {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
    inputRef: React.RefObject<HTMLInputElement | null>
    placeholder?: string
    ariaLabel?: string
    error?: string | null
    className?: string
    isOpen?: boolean
    suggestions: Array<{ id: number; name: string }>;
    activeIndex: number

}

const SearchField: React.FC<SearchFieldProps> = ({
    value,
    onChange,
    onKeyDown,
    inputRef,
    placeholder,
    ariaLabel,
    error,
    className,
    isOpen,
    suggestions,
    activeIndex
}) => {
    const id = useId()
    const errorId = `${id}-error`

    return (
        <div>
            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                className={className}
                aria-label={ariaLabel}
                aria-invalid={!!error}
                aria-describedby={error ? errorId : undefined}
                aria-autocomplete="list"
                aria-controls="autocomplete-listbox"
                aria-activedescendant={
                    isOpen && activeIndex >= 0 ? `option-${suggestions[activeIndex]?.id}` : undefined
                }
                role="combobox"
                aria-expanded={isOpen} />
            <div
                id={errorId}
                className={styles.errorMessage}
                role="alert"
            >
                {error || '\u00A0'}
            </div>
        </div>
    )
}

export default SearchField
