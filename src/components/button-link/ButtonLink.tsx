import { Link } from 'react-router-dom'

import clsx from 'clsx'

import { ButtonLinkProps } from './button-link.types'
import { VARIANT } from '../button/button.types'

import styles from '../button/Button.module.css'

export const ButtonLink = ({
  variant = VARIANT.text,
  size = 'md',
  disabled = false,
  children,
  className,
  to,
  onClick,
  ...rest
}: ButtonLinkProps) => {
  const classNames = clsx(
    styles.btn,
    styles[size],
    styles[variant],
    disabled && styles.disabled,
    className
  )

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault()
      return
    }
    if (onClick) onClick(e)
  }

  return (
    <Link to={to} className={classNames} aria-disabled={disabled} onClick={handleClick} {...rest}>
      <span className={styles.content}>{children}</span>
    </Link>
  )
}
