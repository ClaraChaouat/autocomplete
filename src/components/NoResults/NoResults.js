import { jsx as _jsx } from "react/jsx-runtime";
import styles from "./NoResults.module.css";
const NoResult = ({ message = "No results found", className }) =>
  _jsx("li", {
    className: className
      ? `${styles.noResults} ${className}`
      : styles.noResults,
    role: "option",
    "aria-disabled": "true",
    tabIndex: -1,
    children: message,
  });
export default NoResult;
