import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import EvenTask from './EvenTask'

import './index.css'

async function enableMocking() {
  if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_API === 'true') {
    console.log('[MSW] Mock API enabled - Running in demo mode')
    const { worker } = await import('./tests/mocks/browser')

    await worker.start({
      onUnhandledRequest: 'bypass',
    })
    console.log('✅ [MSW] Service Worker ready')
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <EvenTask />
    </StrictMode>
  )
})
