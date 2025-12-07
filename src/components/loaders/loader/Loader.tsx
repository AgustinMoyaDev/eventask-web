import styles from './Loader.module.css'

export const Loader = () => {
  return (
    <div className={styles.loader} role="status" aria-live="polite">
      <span className={styles.loaderSpinner}></span>
    </div>
  )
}
