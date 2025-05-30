import styles from './LoadingIndicator.module.css'

const LoadingIndicator = () => (
    <div className={styles.statusRow}>
        <div className={styles.loadingSlot}>
            <span>Loading...</span>
        </div>
    </div>
)

export default LoadingIndicator
