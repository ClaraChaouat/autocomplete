import React from "react";
import styles from "./HighlightedText.module.css";

interface HighlightedTextProps {
  text: string;
  query: string;
  highlightClassName?: string;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({ text, query }) => {
  if (!query.trim()) return <>{text}</>;

  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark key={index} className={styles.highlight}>
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
};

export default HighlightedText;
