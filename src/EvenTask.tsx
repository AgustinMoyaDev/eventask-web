import { StrictMode } from 'react'
import { Provider } from 'react-redux'

import { GoogleOAuthProvider } from '@react-oauth/google'

import { store } from '@/store/store'

import { getEnvVariables } from '@/helpers/getEnvVariables'

import { SocketProvider } from '@/context/websocket/SocketProvider'

import { ToastContainer } from '@/components/toast-container/ToastContainer'
import { AppShell } from '@/AppShell'

function EvenTask() {
  const { VITE_GOOGLE_CLIENT_ID } = getEnvVariables()

  return (
    <GoogleOAuthProvider clientId={VITE_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <ToastContainer />
        <SocketProvider>
          <StrictMode>
            <AppShell />
          </StrictMode>
        </SocketProvider>
      </Provider>
    </GoogleOAuthProvider>
  )
}

export default EvenTask
