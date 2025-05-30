import { type ReactNode } from 'react'

export const highlightTextMatch = (
    text: string,
    query: string,
    highlightClassName?: string
): ReactNode[] => {
    if (!query.trim()) return [text]

    const regex = new RegExp(`(${query})`, 'gi')
    const parts = text.split(regex)

    return parts.map((part, index) =>
        regex.test(part) ? (
            <mark key={index} className={highlightClassName}>
                {part}
            </mark>
        ) : part
    )
}