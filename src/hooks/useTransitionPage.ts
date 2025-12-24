import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import '../styles/transition-page.css'

export const useTransitionPage = () => {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionPage, setTransitionPage] = useState('page')

  // It tracks the previous location to detect changes
  // during rendering, evaluating the path and search type
  // and leaving out sorting parameters.
  const [prevLocation, setPrevLocation] = useState(location)
  const locationKey = `${location.pathname}${location.search.split('&')[0]}`
  const prevKey = `${prevLocation.pathname}${prevLocation.search.split('&')[0]}`

  // Adjust state during rendering when location changes
  if (locationKey !== prevKey) {
    setPrevLocation(location)
    setTransitionPage('page page-exit')
  }

  const handleTransitionEnd = () => {
    if (transitionPage === 'page page-exit') {
      setDisplayLocation(location)
      setTransitionPage('page page-enter')
    }
  }

  return { location, displayLocation, transitionPage, handleTransitionEnd }
}
