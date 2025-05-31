import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import styles from "./HighlightedText.module.css";
const HighlightedText = ({ text, query }) => {
  if (!query.trim()) return _jsx(_Fragment, { children: text });
  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);
  return _jsx(_Fragment, {
    children: parts.map((part, index) =>
      regex.test(part)
        ? _jsx("mark", { className: styles.highlight, children: part }, index)
        : part,
    ),
  });
};
export default HighlightedText;
