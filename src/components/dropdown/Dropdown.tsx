import { useEffect, useRef, useState } from 'react'

import clsx from 'clsx'

import styles from './Dropdown.module.css'

interface DropdownProps {
  children: React.ReactNode
  className?: string
  classNameMenuWrapper?: string
  trigger: React.ReactNode
}

/**
 * Generic dropdown component using native HTML details element
 * @param children - Menu items to render inside dropdown
 * @param className - Additional CSS classes for styling
 * @param trigger - Element that triggers the dropdown (button, image, icon, etc.)
 * @returns JSX.Element - Accessible dropdown component
 */
export const Dropdown = ({ children, className, trigger, classNameMenuWrapper }: DropdownProps) => {
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  /**
   * Handle keyboard navigation for dropdown
   * @param e - Keyboard event
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDetailsElement>) => {
    if (e.key === 'Escape') {
      detailsRef.current?.removeAttribute('open')
      setIsOpen(false)
    }
  }

  useEffect(() => {
    /**
     * Handle clicks outside dropdown to close it
     * @param e - Mouse click event
     */
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node

      // Only close if click is truly outside the dropdown content
      if (detailsRef.current && !detailsRef.current.contains(target)) {
        detailsRef.current.removeAttribute('open')
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <details
      name="dropdown"
      className={clsx(styles.dropdown, className)}
      ref={detailsRef}
      onToggle={e => setIsOpen(e.currentTarget.open)}
    >
      <summary
        className={styles.dropdownSummary}
        onKeyDown={handleKeyDown}
        role="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
      </summary>
      <div className={clsx(styles.dropdownMenuWrapper, classNameMenuWrapper)}>{children}</div>
    </details>
  )
}
