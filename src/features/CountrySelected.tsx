import { useRef, useState } from "react";
import { useSuggestionFetcher } from "../hooks/useSuggestionFetcher";
import { getKeyDownHandler } from "../helpers/listNavigationHandler";
import { SuggestionItem } from "../types/suggestion";
import Autocomplete from "../components/Autocomplete/Autocomplete";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { getSuggestions } from "../helpers/getSuggestions";

export interface CountrySelectProps {
  fetchSuggestions?: (query: string) => Promise<SuggestionItem[]>;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  fetchSuggestions = getSuggestions,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [justSelected, setJustSelected] = useState(false);
  const [inputError, setInputError] = useState<string | undefined>();

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { suggestions, error, isOpen, isLoading, setIsOpen } =
    useSuggestionFetcher({
      query: inputValue,
      justSelected,
      fetchFn: fetchSuggestions,
    });

  const handleChange = (value: string) => {
    const isValid = /^[a-zA-ZÀ-ÿ\s'-]*$/.test(value);
    setInputError(
      isValid
        ? undefined
        : "Invalid input – only letters, spaces, apostrophes, and hyphens are allowed."
    );
    setInputValue(value.trimStart());
    setJustSelected(false);
  };

  const handleSelect = (item: SuggestionItem) => {
    setInputValue(item.name);
    setJustSelected(true);
    setIsOpen(false);
  };

  const handleKeyDown = getKeyDownHandler({
    isOpen,
    suggestions,
    activeIndex,
    setActiveIndex,
    onSelect: handleSelect,
    setIsOpen,
    setInputValue,
  });

  useOnClickOutside(containerRef, () => {
    setIsOpen(false);
    setActiveIndex(-1);
    setJustSelected(false);
  });

  return (
    <Autocomplete
      value={inputValue}
      suggestions={suggestions}
      isLoading={isLoading}
      isOpen={isOpen}
      error={inputError ?? (error ? `Server error: ${error}` : undefined)}
      onChange={handleChange}
      onSelect={handleSelect}
      placeholder="Select a country..."
      onKeyDown={handleKeyDown}
      inputRef={inputRef}
      activeIndex={activeIndex}
      ref={containerRef}
      label="Country of residence"
    />
  );
};

export default CountrySelect;
