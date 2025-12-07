import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { GoogleOAuthProvider } from '@react-oauth/google'

import { getEnvVariables } from '@/helpers/getEnvVariables'

import { useServerWarmup } from '@/hooks/useServerWarmup'

import { AppRouter } from '@/router/AppRouter'
import { NavigationProvider } from '@/context/navigation/NavigationProvider'

import { store } from '@/store/store'
import { ToastContainer } from '@/components/toast/ToastContainer'
import { SocketProvider } from '@/context/websocket/SocketProvider'
import { SidebarProvider } from '@/context/sidebar/SidebarProvider'

const v7DocDisabledWarnings = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
}

function EvenTask() {
  const { VITE_GOOGLE_CLIENT_ID } = getEnvVariables()
  useServerWarmup()

  return (
    <GoogleOAuthProvider clientId={VITE_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <ToastContainer />
        <SocketProvider>
          <NavigationProvider>
            <BrowserRouter future={v7DocDisabledWarnings}>
              <SidebarProvider>
                <StrictMode>
                  <AppRouter />
                </StrictMode>
              </SidebarProvider>
            </BrowserRouter>
          </NavigationProvider>
        </SocketProvider>
      </Provider>
    </GoogleOAuthProvider>
  )
}

export default EvenTask
