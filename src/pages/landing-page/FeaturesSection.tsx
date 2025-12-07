interface Feature {
  icon: string
  title: string
  description: string
}

const FEATURES: Feature[] = [
  {
    icon: '/images/order-category.webp',
    title: 'Organize by Categories',
    description: 'Create custom categories and assign priorities to keep everything under control.',
  },
  {
    icon: '/images/onboarding/schedule.webp',
    title: 'Integrated Calendar',
    description:
      'Visualize your events and tasks in a clear calendar. Never miss an important date.',
  },
  {
    icon: '/images/team.webp',
    title: 'Team Collaboration',
    description: 'Invite your team, assign tasks, and work together efficiently.',
  },
  {
    icon: '/images/bell.webp',
    title: 'Real-Time Notifications',
    description: 'Stay updated with instant notifications about changes and new assignments.',
  },
]

import clsx from 'clsx'
import styles from './FeaturesSection.module.css'

export const FeaturesSection = () => {
  return (
    <section className={styles.features}>
      <div className={styles.featuresContainer}>
        <h2 className={clsx('text-headline-lg', styles.featuresTitle)}>
          Everything you need in one place
        </h2>

        <div className={styles.featuresGrid}>
          {FEATURES.map((feature, index) => (
            <article key={index} className={styles.featureCard}>
              <img
                className={styles.featureCardIcon}
                src={feature.icon}
                alt="feature icon"
                aria-hidden="true"
              />

              <h3 className={clsx('text-title-lg', styles.featureCardTitle)}>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
