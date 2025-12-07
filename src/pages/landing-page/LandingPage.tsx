import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'

import { Button } from '@/components/button/Button'

import { HeroSection } from './HeroSection'
import { FeaturesSection } from './FeaturesSection'

import styles from './LandingPage.module.css'

export const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.landingPage}>
      <HeroSection />
      <FeaturesSection />

      <section className={styles.landingCta}>
        <div className={styles.landingCtaContainer}>
          <h2 className={clsx('text-headline-lg', styles.landingCtaTitle)}>
            Ready to get started?
          </h2>
          <p className={clsx('text-body-lg', styles.landingCtaSubtitle)}>
            Start using EvenTask and enjoy organizing your events.
          </p>
          <Button variant="filled" size="lg" onClick={() => navigate('/auth/register')}>
            Create a free account
          </Button>
        </div>
      </section>
    </div>
  )
}
