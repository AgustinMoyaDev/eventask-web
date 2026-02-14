import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { GoogleOAuthProvider } from '@react-oauth/google'

import { store } from '@/store/store'

import { getEnvVariables } from '@/helpers/getEnvVariables'

import { AppRouter } from '@/router/AppRouter'

import { BreadcrumbProvider } from '@/context/breadcrumb/BreadcrumbProvider'
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
    <BrowserRouter future={v7DocDisabledWarnings}>
      <GoogleOAuthProvider clientId={VITE_GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          <ToastContainer />
          <SocketProvider>
            <BreadcrumbProvider>
              <SidebarProvider>
                <StrictMode>
                  <AppRouter />
                </StrictMode>
              </SidebarProvider>
            </BreadcrumbProvider>
          </SocketProvider>
        </Provider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  )
}

export default EvenTask
