import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { GoogleOAuthProvider } from '@react-oauth/google'

import { store } from '@/store/store'

import { getEnvVariables } from '@/helpers/getEnvVariables'

import { AppRouter } from '@/router/AppRouter'

import { NavigationProvider } from '@/context/navigation/NavigationProvider'
import { SocketProvider } from '@/context/websocket/SocketProvider'
import { SidebarProvider } from '@/context/sidebar/SidebarProvider'

import { ToastContainer } from '@/components/toast-container/ToastContainer'

const v7DocDisabledWarnings = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
}

function EvenTask() {
  const { VITE_GOOGLE_CLIENT_ID } = getEnvVariables()

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
