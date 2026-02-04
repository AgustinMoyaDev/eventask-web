export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string
  name: string
  label: string
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  onBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  error?: string | null
  touched?: boolean
  hint?: string
  disabled?: boolean
  required?: boolean
  rows?: number
  cols?: number
}
