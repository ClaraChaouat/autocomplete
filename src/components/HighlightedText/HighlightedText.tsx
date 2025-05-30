import React from 'react';

interface HighlightedTextProps {
    text: string;
    query: string;
    highlightClassName?: string;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({
    text,
    query,
    highlightClassName,
}) => {
    if (!query.trim()) return <>{text}</>;

    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);

    return (
        <>
            {parts.map((part, index) =>
                regex.test(part) ? (
                    <mark key={index} className={highlightClassName}>
                        {part}
                    </mark>
                ) : (
                    part
                )
            )}
        </>
    );
};

export default HighlightedText;
