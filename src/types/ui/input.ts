export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur'> {
  id?: string
  name: string
  label: string
  hint?: string
  error?: string | null
  touched?: boolean
  withFeedback?: boolean
  initialStateIcon?: React.ElementType | null
  finalStateIcon?: React.ElementType | null
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}

export interface InputWithSuggestionsProps
  extends Omit<InputProps, 'initialStateIcon' | 'finalStateIcon'> {
  suggestionData: string[]
  allowCreateIfNotExists: boolean
  loading?: boolean
  onSuggestionClick?: (value: string) => void
  onCreateNew?: (value: string) => void
}

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
