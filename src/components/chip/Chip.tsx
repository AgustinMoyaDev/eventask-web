import clsx from 'clsx'

import { ChipProps } from './chip.types'

import styles from './Chip.module.css'

export const Chip = ({
  label,
  role,
  color = 'default',
  variant = 'filled',
  className,
  onClick,
  disabled = false,
}: ChipProps) => {
  const commonClasses = clsx(
    styles.chip,
    styles[variant],
    styles[color],
    className,
    !!onClick && styles.interactive
  )

  if (onClick) {
    return (
      <button
        className={commonClasses}
        onClick={onClick}
        disabled={disabled}
        aria-disabled={disabled}
        role={role ?? 'button'}
      >
        {label}
      </button>
    )
  }

  return (
    <span role={role ?? 'status'} className={commonClasses} aria-readonly="true">
      {label}
    </span>
  )
}
