export interface SuggestionItem {
    id: number;
    name: string;
}

export interface AutocompleteProps {
    placeholder?: string;
    onSelect: (item: SuggestionItem) => void;
    maxSuggestions?: number;
}