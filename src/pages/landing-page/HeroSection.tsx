import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/button/Button'

import styles from './HeroSection.module.css'
import clsx from 'clsx'

export const HeroSection = () => {
  const navigate = useNavigate()
  const heroImg = '/images/landing/preview-eventask.webp'

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={clsx('text-display-md', styles.heroTitle)}>
          Manage your tasks with <span className={styles.heroHighlight}>ease</span>
        </h1>

        <h2 className={clsx('text-title-lg', styles.heroSubtitle)}>
          Organize your day, collaborate with your team, and achieve your goals. All in one place.
        </h2>

        <div className={styles.heroActions}>
          <Button
            variant="filled"
            size="lg"
            className={styles.heroButton}
            onClick={() => navigate('/auth/register')}
          >
            Start for free
          </Button>

          <Button
            variant="outlined"
            size="lg"
            className={styles.heroButton}
            onClick={() => navigate('/auth/login')}
          >
            Log in
          </Button>
        </div>
      </div>

      <div className={styles.heroImageWrapper}>
        <img className={styles.heroImage} src={heroImg} alt="EvenTask app interface preview" />
      </div>
    </section>
  )
}
