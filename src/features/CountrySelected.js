import { jsx as _jsx } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { useSuggestionFetcher } from "../hooks/useSuggestionFetcher";
import { getKeyDownHandler } from "../helpers/listNavigationHandler";
import Autocomplete from "../components/Autocomplete/Autocomplete";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { getSuggestions } from "../helpers/getSuggestions";
const CountrySelect = ({ fetchSuggestions = getSuggestions }) => {
  const [inputValue, setInputValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [justSelected, setJustSelected] = useState(false);
  const [inputError, setInputError] = useState();
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const { suggestions, error, isOpen, isLoading, setIsOpen } =
    useSuggestionFetcher({
      query: inputValue,
      justSelected,
      fetchFn: fetchSuggestions,
    });
  const handleChange = (value) => {
    const isValid = /^[a-zA-ZÀ-ÿ\s'-]*$/.test(value);
    setInputError(
      isValid
        ? undefined
        : "Invalid input – only letters, spaces, apostrophes, and hyphens are allowed.",
    );
    setInputValue(value.trimStart());
    setJustSelected(false);
  };
  const handleSelect = (item) => {
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
  return _jsx(Autocomplete, {
    value: inputValue,
    suggestions: suggestions,
    isLoading: isLoading,
    isOpen: isOpen,
    error: inputError ?? (error ? `Server error: ${error}` : undefined),
    onChange: handleChange,
    onSelect: handleSelect,
    placeholder: "Select a country...",
    onKeyDown: handleKeyDown,
    inputRef: inputRef,
    activeIndex: activeIndex,
    ref: containerRef,
    label: "Country of residence",
  });
};
export default CountrySelect;
