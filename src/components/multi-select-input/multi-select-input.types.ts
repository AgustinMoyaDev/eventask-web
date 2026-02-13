export interface MultiSelectProps<T> {
  label: string
  typeOption: string
  options: T[]
  actionOnEmpty?: boolean
  actionLabel?: string
  selectedOptions?: T[]
  touched?: boolean
  error?: string
  loading?: boolean
  actionMethod?: (item: string) => void
  getOptionLabel: (item: T) => string
  getOptionKey: (item: T) => string
  onAddItem?: (item: T) => void
  onRemoveItem?: (item: T) => void
}
