import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId } from "react";
import styles from "./SearchField.module.css";
const SearchField = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
  placeholder,
  ariaLabel,
  error,
  className,
  isOpen,
  suggestions,
  activeIndex,
}) => {
  const id = useId();
  const errorId = `${id}-error`;
  return _jsxs("div", {
    className: styles.fieldWrapper,
    children: [
      _jsx("input", {
        ref: inputRef,
        type: "text",
        value: value,
        onChange: onChange,
        onKeyDown: onKeyDown,
        placeholder: placeholder,
        className: className,
        "aria-label": ariaLabel,
        "aria-invalid": !!error,
        "aria-describedby": error ? errorId : undefined,
        "aria-autocomplete": "list",
        "aria-controls": "autocomplete-listbox",
        "aria-activedescendant":
          isOpen && activeIndex >= 0
            ? `option-${suggestions[activeIndex]?.id}`
            : undefined,
        role: "combobox",
        "aria-expanded": isOpen,
      }),
      _jsx("div", {
        id: errorId,
        className: styles.errorMessage,
        role: "alert",
        children: error || "\u00A0",
      }),
    ],
  });
};
export default SearchField;
