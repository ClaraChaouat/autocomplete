import React, { memo } from "react";
import { SuggestionItem } from "../../types/suggestion";

interface MenuItemProps {
  item: SuggestionItem;
  isActive: boolean;
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
  onMouseEnter?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  item,
  isActive,
  onClick,
  children,
  className,
  onMouseEnter,
}) => (
  <li
    id={`option-${item.id}`}
    role="option"
    aria-selected={isActive}
    className={className}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
  >
    {children || item.name}
  </li>
);

export default memo(MenuItem);
