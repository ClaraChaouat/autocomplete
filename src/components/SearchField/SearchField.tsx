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
}

const SearchField: React.FC<SearchFieldProps> = ({
    value,
    onChange,
    onKeyDown,
    inputRef,
    placeholder,
    ariaLabel,
    error,
    className
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
                aria-invalid={!!error}
                aria-describedby={error ? errorId : undefined}
                aria-label={ariaLabel} />
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
