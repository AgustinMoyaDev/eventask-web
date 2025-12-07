export interface ApiResponse {
  status: number
  data: ApiResponseBody
}

export interface ApiResponseBody {
  ok: boolean // true if 2xx, false otherwise
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
