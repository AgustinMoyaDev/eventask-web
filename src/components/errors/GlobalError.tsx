import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom'
import { getEnvVariables } from '@/helpers/getEnvVariables'

import { Button } from '@/components/button/Button'
import { AlertIcon } from '@/components/icons/Icons'

import styles from './GlobalError.module.css'

export const GlobalError = () => {
  const error = useRouteError()
  const navigate = useNavigate()

  let title = 'Something went wrong'
  let message = 'An unexpected error occurred.'
  let stackTrace: string | null = null

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = 'Page Not Found'
      message = "We couldn't find the page you're looking for."
    } else if (error.status === 401) {
      title = 'Unauthorized'
      message = "You aren't authorized to see this."
    } else {
      title = `Error ${error.status}`
      message = error.statusText
    }
  } else if (error instanceof Error) {
    message = 'An unexpected error occurred.'
    const { DEV } = getEnvVariables()
    if (DEV) {
      stackTrace = error.stack ?? null
      console.warn('Error stack trace:', stackTrace)
      console.error('Error details:', error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          <AlertIcon className={styles.alert} /> {title}
        </h1>
        <p className={styles.message}>{message}</p>

        <div className={styles.actions}>
          <Button onClick={() => navigate(-1)} variant="outlined">
            Go Back
          </Button>
          <Button onClick={() => navigate('/')} variant="filled">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}
