import { useEffect, useState } from 'react'

import dayjs from 'dayjs'

import styles from './Clock.module.css'

export const Clock = () => {
  const [currentTime, setCurrentTime] = useState<string>(() => dayjs().format('hh:mm:ss A'))

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().format('hh:mm:ss A'))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return <time className={styles.clock}>{currentTime}</time>
}
