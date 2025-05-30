import React from 'react'
import { SuggestionItem } from '../../types/suggestion'

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
        className={className}
        onClick={onClick}
    >
        {children || item.name}
    </li>
)

export default MenuItem
