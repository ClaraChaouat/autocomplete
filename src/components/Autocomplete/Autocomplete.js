import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useEffect } from "react";
import styles from "./Autocomplete.module.css";
import NoResult from "../NoResults/NoResults";
import MenuItem from "../MenuItem/MenuItem";
import HighlightedText from "../HighlightedText/HighlightedText";
import SearchField from "../SearchField/SearchField";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
export const Autocomplete = forwardRef(
  (
    {
      value,
      suggestions,
      isOpen,
      isLoading,
      error,
      onChange,
      onKeyDown,
      onSelect,
      inputRef,
      activeIndex,
      placeholder,
      ariaLabel,
      label,
    },
    outerRef,
  ) => {
    useEffect(() => {
      if (!isOpen || activeIndex < 0) return;
      const activeId = `option-${suggestions[activeIndex]?.id}`;
      const el = document.getElementById(activeId);
      el?.scrollIntoView({ block: "nearest" });
    }, [activeIndex, isOpen, suggestions]);
    return _jsxs("div", {
      ref: outerRef,
      className: styles.container,
      children: [
        _jsx("div", {
          className: styles.statusRow,
          children: _jsx("div", {
            className: styles.loadingSlot,
            children: isLoading && _jsx(LoadingIndicator, {}),
          }),
        }),
        label &&
          _jsx("label", {
            htmlFor: "autocomplete-input",
            className: styles.label,
            children: label,
          }),
        _jsxs("div", {
          className: styles.inputWrapper,
          children: [
            _jsx(SearchField, {
              id: "autocomplete-input",
              value: value,
              onChange: (e) => onChange(e.target.value),
              onKeyDown: onKeyDown,
              inputRef: inputRef,
              placeholder: placeholder,
              ariaLabel: ariaLabel,
              error: error,
              className: styles.input,
              isOpen: isOpen,
              activeIndex: activeIndex,
              suggestions: suggestions,
            }),
            isOpen &&
              _jsx("ul", {
                className: styles.suggestionsList,
                role: "listbox",
                id: "autocomplete-listbox",
                children:
                  suggestions.length > 0
                    ? suggestions.map((item, index) =>
                        _jsx(
                          MenuItem,
                          {
                            item: item,
                            isActive: index === activeIndex,
                            onClick: () => onSelect(item),
                            className: `${styles.suggestionItem} ${index === activeIndex ? styles.active : ""}`,
                            children: _jsx(HighlightedText, {
                              text: item.name,
                              query: value,
                              highlightClassName: styles.highlight,
                            }),
                          },
                          item.id,
                        ),
                      )
                    : _jsx(NoResult, { className: styles.noResults }),
              }),
          ],
        }),
      ],
    });
  },
);
export default Autocomplete;
