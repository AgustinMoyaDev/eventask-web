import { VariantType } from './button'
import { ColorProgressType } from './task'

export interface ChipProps {
  label: string
  role: string
  color?: ColorProgressType
  variant?: VariantType
  className?: string
}
