import styles from './ContentLoader.module.css'

/**
 * Lightweight loader for Suspense fallback during lazy route loading.
 * Non-fullscreen version, respects parent container layout.
 */
export const ContentLoader = () => {
  return (
    <div className={styles.contentLoader}>
      <div className={styles.contentLoaderSpinnerContainer}>
        <span className={styles.contentLoaderSpinner} />
        <span className={`${styles.contentLoaderSpinner} ${styles.contentLoaderSpinnerDelayed}`} />
      </div>
      <p className={styles.contentLoaderText}>Loading...</p>
    </div>
  )
}
