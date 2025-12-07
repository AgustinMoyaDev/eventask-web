import { useEffect } from 'react'

import { getEnvVariables } from '../helpers/getEnvVariables'

/**
 * Hook to wake up the backend server (Render.com free tier)
 * It fires a lightweight request immediately when the app mounts.
 */
export const useServerWarmup = () => {
  const { VITE_API_URL, DEV } = getEnvVariables()

  useEffect(() => {
    // Fire and forget: we do not wait for response (await), we do not handle error visually.
    // We use native 'fetch' to avoid depending on Axios/Redux interceptors.
    fetch(`${VITE_API_URL}/health`, {
      method: 'GET',
      // 'keepalive' ensures the request stays alive even if the component unmounts quickly
      keepalive: true,
    }).catch(err => {
      if (DEV) console.log('Warmup failed (offline?):', err)
    })
  }, [VITE_API_URL, DEV])
}
