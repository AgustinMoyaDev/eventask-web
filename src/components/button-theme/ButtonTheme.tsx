import { useEffect, useState } from 'react'

import clsx from 'clsx'

import { MoonIcon, SunIcon } from '../icons/Icons.tsx'
import { Button } from '../button/Button.tsx'

import styles from './ButtonTheme.module.css'

export const ButtonTheme = () => {
  const lightTheme = 'light'
  const darkTheme = 'dark'

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('selected-theme') || lightTheme
  })

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
    localStorage.setItem('selected-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === lightTheme ? darkTheme : lightTheme))
  }

  return (
    <Button
      variant="icon"
      size="sm"
      id="button-theme"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <span
        className={clsx(styles.buttonThemeIcon, {
          [styles.buttonThemeIconLight]: theme === lightTheme,
          [styles.buttonThemeIconDark]: theme === darkTheme,
        })}
      >
        {theme === lightTheme ? <MoonIcon /> : <SunIcon />}
      </span>
    </Button>
  )
}
