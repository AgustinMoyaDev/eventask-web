import { useEffect } from 'react'

import { Search } from '@/components/search/Search'
import { CategoryList } from '@/category/components/categories/CategoryList'
import { OngoingTaskList } from '@/task/components/ongoing-task-list/OngoingTaskList'

import { WelcomeSlide } from '@/components/welcome-onboarding/WelcomeSlide'
import { WelcomeSlideContent } from '@/components/welcome-onboarding/WelcomeSlideContent'
import { ONBOARDING_STEPS } from '@/components/welcome-onboarding/onboardingSteps'
import { useFirstTimeUser } from '@/components/welcome-onboarding/useFirstTimeUser'
import { useStepTransition } from '@/components/welcome-onboarding/useStepTransition'

import { SearchProvider } from '@/context/search/SearchProvider'

function HomePage() {
  const { showWelcome, markAsCompleted } = useFirstTimeUser()
  const {
    currentStepIndex,
    direction,
    isAnimating,
    handleNextStep,
    handlePreviousStep,
    handleAnimationEnd,
    resetStep,
  } = useStepTransition(ONBOARDING_STEPS.length)

  const handleCloseWelcome = () => {
    markAsCompleted()
    resetStep()
  }

  useEffect(() => {
    if (!showWelcome) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        handleNextStep()
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        handlePreviousStep()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showWelcome, handleNextStep, handlePreviousStep])

  return (
    <>
      <SearchProvider>
        <Search />
        <OngoingTaskList />
        <CategoryList />
      </SearchProvider>
      <WelcomeSlide isOpen={showWelcome} onClose={handleCloseWelcome}>
        <WelcomeSlideContent
          step={ONBOARDING_STEPS[currentStepIndex]}
          currentStepIndex={currentStepIndex}
          totalSteps={ONBOARDING_STEPS.length}
          direction={direction}
          isAnimating={isAnimating}
          onNext={handleNextStep}
          onPrevious={handlePreviousStep}
          onClose={handleCloseWelcome}
          onAnimationEnd={handleAnimationEnd}
        />
      </WelcomeSlide>
    </>
  )
}

export default HomePage
