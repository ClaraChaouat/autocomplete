import React from 'react';

interface NoResultProps {
    message?: string;
    className?: string;
}

const NoResult: React.FC<NoResultProps> = ({
    message = 'No results found',
    className,
}) => (
    <li
        className={className}
        role="option"
        aria-disabled="true"
        tabIndex={-1}
    >
        {message}
    </li>
);

export default NoResult;
