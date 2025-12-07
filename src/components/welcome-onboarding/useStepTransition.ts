import { useState } from 'react'

type Direction = 'left' | 'right' | null

/**
 * Hook to manage step transitions with animations
 * Returns current step, direction, and navigation handlers
 */
export const useStepTransition = (totalSteps: number) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [direction, setDirection] = useState<Direction>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleNextStep = () => {
    if (isAnimating || currentStepIndex >= totalSteps - 1) return

    setIsAnimating(true)
    setDirection('right')
    setCurrentStepIndex(prev => prev + 1)
  }

  const handlePreviousStep = () => {
    if (isAnimating || currentStepIndex <= 0) return

    setIsAnimating(true)
    setDirection('left')
    setCurrentStepIndex(prev => prev - 1)
  }

  const handleAnimationEnd = () => {
    setIsAnimating(false)
    setDirection(null)
  }

  const resetStep = () => {
    setCurrentStepIndex(0)
    setDirection(null)
    setIsAnimating(false)
  }

  return {
    currentStepIndex,
    direction,
    isAnimating,
    handleNextStep,
    handlePreviousStep,
    handleAnimationEnd,
    resetStep,
  }
}
