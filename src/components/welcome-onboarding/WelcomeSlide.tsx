import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import { CloseIcon } from '@/components/icons/Icons'
import { Button } from '@/components/button/Button'

import styles from './WelcomeSlide.module.css'

interface WelcomeSlideProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

/**
 * Lateral drawer that slides in from the right
 * Used for onboarding experience on first login
 */
export const WelcomeSlide = ({ isOpen, onClose, children }: WelcomeSlideProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      if (!dialog.open) dialog.showModal()
      // Focus the first interactive element
      const firstFocusable = dialog.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      firstFocusable?.focus()
    } else {
      if (dialog.open) dialog.close()
    }
  }, [isOpen])

  const handleKeydownCloseSlide = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') onClose()
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className={styles.welcomeSlide}
      aria-modal="true"
      aria-labelledby="welcome-slide-title"
      aria-describedby="welcome-slide-description"
      role="dialog"
      onKeyDown={handleKeydownCloseSlide}
    >
      <div className={styles.welcomeSlideContent}>
        <Button
          variant="icon"
          size="sm"
          className={styles.welcomeSlideButtonClose}
          aria-label="Close welcome guide"
          onClick={onClose}
        >
          <CloseIcon aria-hidden="true" focusable="false" />
        </Button>
        {children}
      </div>
    </dialog>,
    document.body
  )
}
