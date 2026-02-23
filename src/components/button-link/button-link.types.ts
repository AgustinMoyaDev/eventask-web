import { LinkProps } from 'react-router-dom'

import { ButtonSize, VariantType } from '../button/button.types'

export interface ButtonLinkProps extends LinkProps {
  variant?: VariantType
  size?: ButtonSize
  disabled?: boolean
  children: React.ReactNode
  className?: string
}
