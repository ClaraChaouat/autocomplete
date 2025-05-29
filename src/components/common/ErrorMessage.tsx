import styles from '../features/Autocomplete/Autocomplete.module.css'

interface ErrorMessageProps {
    message: string | null
}

const ErrorMessage = ({ message }: ErrorMessageProps) => (
    <div className={styles.statusRow}>
        <div className={styles.error} role="alert">
            {message || '\u00A0'}
        </div>
    </div>
)

export default ErrorMessage
