import React from 'react';
import styles from './NoResults.module.css'

interface NoResultProps {
    message?: string;
    className?: string;
}

const NoResult: React.FC<NoResultProps> = ({
    message = 'No results found',
    className,
}) => (
    <li
        className={className ? `${styles.noResults} ${className}` : styles.noResults}
        role="option"
        aria-disabled="true"
        tabIndex={-1}
    >
        {message}
    </li>
)


export default NoResult;
