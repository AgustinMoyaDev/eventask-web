import React from 'react'

import clsx from 'clsx'

import { ButtonProps, VARIANT } from '@/types/ui/button'

import styles from './Button.module.css'

export const Button: React.FC<ButtonProps> = ({
  variant = VARIANT.filled,
  size = 'md',
  type = 'button',
  children,
  className,
  ...props
}) => {
  const classNames = clsx(styles.btn, styles[size], styles[variant], className)

  return (
    <button type={type} className={classNames} {...props}>
      <span className={styles.content}>{children}</span>
    </button>
  )
}
