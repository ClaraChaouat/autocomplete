import { useRef, useState } from "react";
import { useSuggestionFetcher } from "../hooks/useSuggestionFetcher";
import { getKeyDownHandler } from "../helpers/listNavigationHandler";
import { SuggestionItem } from "../types/suggestion";
import Autocomplete from "../components/Autocomplete/Autocomplete";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { VALID_INPUT_REGEX } from "../constants/input";

const CountrySelect = () => {
  const [inputValue, setInputValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [justSelected, setJustSelected] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputError, setInputError] = useState<string | undefined>(undefined);

  const containerRef = useRef<HTMLDivElement>(null);

  const { suggestions, error, isOpen, isLoading, setIsOpen } =
    useSuggestionFetcher({
      query: inputValue,
      justSelected,
    });

  const handleChange = (value: string) => {
    const isValid = VALID_INPUT_REGEX.test(value);

    if (!isValid) {
      setInputError(
        "Invalid input – only letters, spaces, apostrophes, and hyphens are allowed."
      );
    } else {
      setInputError(undefined);
    }

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
      ariaLabel="Country selector"
      onKeyDown={handleKeyDown}
      inputRef={inputRef}
      activeIndex={activeIndex}
      ref={containerRef}
      label="Country of residence"
    />
  );
};

export default CountrySelect;
