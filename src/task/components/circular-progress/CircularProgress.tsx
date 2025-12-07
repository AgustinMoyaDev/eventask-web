import styles from './CircularProgress.module.css'

export const CircularProgress = ({ progress }: { progress: number }) => {
  return (
    <div
      className={styles.circularProgress}
      style={{ '--progress': `${progress}%` } as React.CSSProperties}
    >
      <span>{progress}%</span>
    </div>
  )
}
