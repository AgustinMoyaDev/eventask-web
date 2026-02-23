import clsx from 'clsx'

import { ChipProps } from './chip.types'

import styles from './Chip.module.css'

export const Chip = ({
  label,
  role = 'status',
  color = 'default',
  variant = 'filled',
  className,
}: ChipProps) => {
  return (
    <span
      role={role}
      className={clsx(styles.chip, styles[variant], styles[color], className)}
      aria-readonly="true"
    >
      {label}
    </span>
  )
}
