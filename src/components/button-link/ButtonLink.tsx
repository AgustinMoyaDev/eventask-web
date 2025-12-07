import { Link } from 'react-router-dom'

import clsx from 'clsx'

import { ButtonLinkProps, VARIANT } from '@/types/ui/button'

import styles from '../button/Button.module.css'

export const ButtonLink = ({
  variant = VARIANT.text,
  size = 'md',
  disabled = false,
  children,
  className,
  to,
  ...rest
}: ButtonLinkProps) => {
  const classNames = clsx(
    styles.btn,
    styles[size],
    styles[variant],
    disabled && styles.disabled,
    className
  )

  return (
    <Link to={to} className={classNames} aria-disabled={disabled} {...rest}>
      <span className={styles.content}>{children}</span>
    </Link>
  )
}
