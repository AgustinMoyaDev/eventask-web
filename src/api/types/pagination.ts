export interface IPaginationOptions {
  page?: number
  perPage?: number
}

export interface IPaginationResult<T> {
  items: T[]
  total: number
}
