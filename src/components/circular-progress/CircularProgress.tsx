import styles from './CircularProgress.module.css'

interface CircularProgressProps {
  progress: number
}

export const CircularProgress = ({ progress }: CircularProgressProps) => {
  return (
    <div
      className={styles.circularProgress}
      style={{ '--progress': `${progress}%` } as React.CSSProperties}
    >
      <span>{progress}%</span>
    </div>
  )
}
