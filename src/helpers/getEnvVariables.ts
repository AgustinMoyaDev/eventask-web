/**
 * Environment variables interface
 * Defines all available environment variables in the application
 */
interface EnvVariables {
  VITE_API_URL: string
  VITE_BACKEND_URL: string
  DEV: boolean
  MODE: string
  PROD: boolean
  SSR: boolean
  BASE_URL: string
}

/**
 * Get typed environment variables
 * @returns Typed environment variables object
 */
export const getEnvVariables = (): EnvVariables => {
  return import.meta.env as EnvVariables
}
