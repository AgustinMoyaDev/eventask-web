export const CHIP_VARIANT = {
  filled: 'filled',
  outlined: 'outlined',
} as const

export const CHIP_COLOR = {
  default: 'default',
  pending: 'pending',
  progress: 'progress',
  completed: 'completed',
} as const

export type ChipColorType = (typeof CHIP_COLOR)[keyof typeof CHIP_COLOR]
export type ChipVariantType = (typeof CHIP_VARIANT)[keyof typeof CHIP_VARIANT]

export interface ChipProps {
  label: string
  role?: string
  color?: ChipColorType
  variant?: ChipVariantType
  className?: string
}
