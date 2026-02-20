export interface ApiErrorBody {
  ok: boolean
  message: string
  errors?: ValidationErrors
}

interface FieldErrorDetail {
  location: string
  msg: string
  path: string
  type: string
  value: string
}

export type ValidationErrors = Record<string, FieldErrorDetail>
