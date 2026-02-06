import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import EvenTask from './EvenTask'

import './index.css'

async function enableMocking() {
  if (import.meta.env.MODE === 'development' && import.meta.env.MODE === 'demo') {
    console.log(`[MSW] Mock API enabled - Running in ${import.meta.env.MODE} mode`)
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
