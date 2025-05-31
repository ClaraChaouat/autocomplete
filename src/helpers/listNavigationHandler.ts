import type { KeyboardEvent } from "react";
import { SuggestionItem } from "../types/suggestion";

interface KeyDownHandlerParams {
  isOpen: boolean;
  suggestions: SuggestionItem[];
  activeIndex: number;
  setActiveIndex: (index: number | ((prev: number) => number)) => void;
  onSelect: (item: SuggestionItem) => void;
  setIsOpen: (open: boolean) => void;
  setInputValue: (value: string) => void;
}

export function getKeyDownHandler({
  isOpen,
  suggestions,
  activeIndex,
  setActiveIndex,
  onSelect,
  setIsOpen,
  setInputValue,
}: KeyDownHandlerParams) {
  return (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, -1));
        break;
      case "End":
        e.preventDefault();
        if (suggestions.length) setActiveIndex(suggestions.length - 1);
        break;
      case "Home":
        e.preventDefault();
        if (suggestions.length) setActiveIndex(0);
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0) {
          const selectedItem = suggestions[activeIndex];
          setInputValue(selectedItem.name);
          onSelect(selectedItem);
          setIsOpen(false);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
      case "Tab":
        if (activeIndex >= 0) {
          const selectedItem = suggestions[activeIndex];
          setInputValue(selectedItem.name);
          onSelect(selectedItem);
        }
        setIsOpen(false);
        break;
    }
  };
}
