import { RefObject } from "react";

export interface SuggestionItem {
    id: number;
    name: string;
}

export interface AutocompleteProps {
    value: string;
    suggestions: Array<{ id: number; name: string }>;
    isOpen: boolean;
    isLoading: boolean;
    error?: string;
    onChange: (value: string) => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
    onSelect: (item: SuggestionItem) => void;
    inputRef: RefObject<HTMLInputElement | null>
    activeIndex: number;
    placeholder?: string;
    ariaLabel?: string;
    label: string;
}