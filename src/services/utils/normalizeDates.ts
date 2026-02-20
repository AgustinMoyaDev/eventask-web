const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

export function normalizeDatesToISOString<T>(value: T): T {
  if (value instanceof Date) {
    return value.toISOString() as T
  }

  if (Array.isArray(value)) {
    return value.map(item => normalizeDatesToISOString(item)) as T
  }

  if (isPlainObject(value)) {
    const entries = Object.entries(value).map(([key, nested]) => [
      key,
      normalizeDatesToISOString(nested),
    ])
    return Object.fromEntries(entries) as T
  }

  return value
}
