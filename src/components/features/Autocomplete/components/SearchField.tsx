import React from 'react'

interface SearchFieldProps {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
    inputRef?: React.Ref<HTMLInputElement>
    placeholder?: string
    error?: string | null
    className?: string
}

const SearchField: React.FC<SearchFieldProps> = ({
    value,
    onChange,
    onKeyDown,
    inputRef,
    placeholder,
    error,
    className
}) => (
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
            aria-describedby={error ? "input-error" : undefined}
            aria-label={placeholder}
        />
        {/* {error && (
            <div
                id="input-error"
                style={{ color: 'var(--color-error)', fontSize: '0.9em', marginTop: 4 }}
            >
                {error}
            </div>
        )} */}
    </div>
)

export default SearchField
