import clsx from 'clsx'

import { Button } from '@/components/button/Button'
import { SlideTransition } from '@/components/slide-transition/SlideTransition'

import { OnboardingStep } from './onboardingSteps'

import styles from './WelcomeSlideContent.module.css'

interface WelcomeSlideContentProps {
  step: OnboardingStep
  currentStepIndex: number
  totalSteps: number
  direction: 'left' | 'right' | null
  isAnimating: boolean
  onNext: () => void
  onPrevious: () => void
  onClose: () => void
  onAnimationEnd: () => void
}

export const WelcomeSlideContent = ({
  step,
  currentStepIndex,
  totalSteps,
  direction,
  isAnimating,
  onNext,
  onPrevious,
  onClose,
  onAnimationEnd,
}: WelcomeSlideContentProps) => {
  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === totalSteps - 1

  return (
    <div className={styles.welcomeSlideContent} role="region" aria-label="Onboarding tour">
      <SlideTransition direction={direction} onAnimationEnd={onAnimationEnd}>
        <div className={styles.welcomeSlideContentHeader}>
          {step.image && (
            <img
              src={step.image}
              alt={`${step.title} illustration`}
              className={styles.welcomeSlideContentImage}
            />
          )}
          <h2
            id="welcome-slide-title"
            className={clsx('text-title-lg', styles.welcomeSlideContentTitle)}
          >
            {step.title}
          </h2>
        </div>

        <p id="welcome-slide-description" className={styles.welcomeSlideContentDescription}>
          {step.description}
        </p>
      </SlideTransition>

      <div className={styles.welcomeSlideContentDots} aria-hidden="true">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <small
            key={index}
            className={clsx(
              styles.welcomeSlideContentDot,
              index === currentStepIndex && styles.welcomeSlideContentDotActive
            )}
          />
        ))}
      </div>
      <small className={styles.welcomeSlideContentProgress} aria-live="polite" aria-atomic="true">
        Step {currentStepIndex + 1} of {totalSteps}
      </small>
      <div className={styles.welcomeSlideContentActions}>
        <Button
          disabled={isFirstStep || isAnimating}
          variant="outlined"
          className={styles.welcomeSlideContentButton}
          onClick={onPrevious}
          aria-label="Go to previous step"
        >
          Previous
        </Button>
        <Button
          disabled={isAnimating}
          variant="filled"
          className={styles.welcomeSlideContentButton}
          onClick={isLastStep ? onClose : onNext}
          aria-label={
            isLastStep
              ? 'Complete tour and start using the app'
              : `Go to step ${currentStepIndex + 2} of ${totalSteps}`
          }
        >
          {isLastStep ? "Let's start!" : 'Next'}
        </Button>
      </div>
    </div>
  )
}
