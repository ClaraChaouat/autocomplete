import React from 'react'
import type { SuggestionItem } from '../types'

interface MenuItemProps {
    item: SuggestionItem
    isActive: boolean
    onClick: () => void
    children?: React.ReactNode
    className?: string
}

const MenuItem: React.FC<MenuItemProps> = ({
    item,
    isActive,
    onClick,
    children,
    className
}) => (
    <li
        key={item.id}
        id={`option-${item.id}`}
        role="option"
        aria-selected={isActive}
        className={`${className || ''} ${isActive ? 'active' : ''}`}
        onClick={onClick}
    >
        {children || item.name}
    </li>
)

export default MenuItem
