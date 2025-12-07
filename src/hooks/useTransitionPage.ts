import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import { getEnvVariables } from '../helpers/getEnvVariables'

import '../styles/transition-page.css'

export const useTransitionPage = () => {
  const { DEV } = getEnvVariables()
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionPage, setTransitionPage] = useState('page page-enter') // Start visible

  /**
   * Safety timeout to prevent stuck transitions
   * If animation doesn't complete (browser reload, interruption), force completion
   */
  const timeoutRef = useRef<number>()

  useEffect(() => {
    /**
     * ROUTE CHANGE DETECTION: Trigger transition only on actual navigation
     *
     * Key insight: With CSS base state (.main), content is visible by default
     * This eliminates the need for complex initialization logic
     */
    if (location.pathname !== displayLocation.pathname) {
      setTransitionPage('page page-exit')

      /**
       * SAFETY TIMEOUT: Prevent stuck page-exit state
       *
       * Problem: Browser reloads can interrupt CSS animations
       * Solution: Force transition completion if onAnimationEnd doesn't fire
       * Timeout is longer than CSS animation (0.3s) to avoid conflicts
       */
      timeoutRef.current = window.setTimeout(() => {
        if (DEV) console.warn('Animation timeout - forcing page-enter state')
        setDisplayLocation(location)
        setTransitionPage('page page-enter')
      }, 500)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, displayLocation.pathname, DEV])

  /**
   * Handle CSS animation completion
   * When page-exit animation finishes, update displayLocation and start page-enter
   */
  const handleTransitionEnd = () => {
    if (transitionPage === 'page page-exit') {
      // Clear timeout since animation completed successfully
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = undefined
      }

      setDisplayLocation(location)
      setTransitionPage('page page-enter')
    }
  }

  /**
   * Cleanup timeout on unmount to prevent memory leaks
   */
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return { location, displayLocation, transitionPage, handleTransitionEnd }
}
