import styles from './LinearProgress.module.css'

interface Props {
  value: number
  showLabel?: boolean
}

export const LinearProgress = ({ value, showLabel = false }: Props) => {
  return (
    <div className={styles.linearProgressWrapper}>
      <div
        className={styles.linearProgress}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className={styles.linearProgressBar} style={{ width: `${value}%` }} />
      </div>
      {showLabel && <span className={styles.linearProgressLabel}>{value}%</span>}
    </div>
  )
}
