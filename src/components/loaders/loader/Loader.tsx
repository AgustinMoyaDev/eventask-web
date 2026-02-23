import styles from './Loader.module.css'

interface Props {
  text?: string
}

export const Loader = ({ text }: Props) => {
  return (
    <div className={styles.loader} role="status" aria-live="polite">
      {text && <span className={styles.loaderText}>{text}</span>}
      <span className={styles.loaderSpinner}></span>
    </div>
  )
}
