import { InputProps } from '../input/input.types'

export interface InputWithSuggestionsProps extends Omit<
  InputProps,
  'initialStateIcon' | 'finalStateIcon'
> {
  suggestionData: string[]
  allowCreateIfNotExists?: boolean
  loading?: boolean
  onSuggestionClick?: (value: string) => void
  onCreateNew?: (value: string) => void
}
