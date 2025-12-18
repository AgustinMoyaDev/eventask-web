import { useState } from 'react'

const STORAGE_KEY = 'hasSeenWelcome'

/**
 * Hook to manage first-time user experience
 * Shows welcome slide only on first visit
 */
export const useFirstTimeUser = () => {
  const [showWelcome, setShowWelcome] = useState(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome')
    return !hasSeenWelcome
  })

  const markAsCompleted = () => {
    localStorage.setItem(STORAGE_KEY, 'true')
    setShowWelcome(false)
  }

  const resetWelcome = () => {
    localStorage.removeItem(STORAGE_KEY)
    setShowWelcome(true)
  }

  return {
    showWelcome,
    markAsCompleted,
    resetWelcome,
  }
}
