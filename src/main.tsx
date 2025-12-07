import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import EvenTask from './EvenTask'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EvenTask />
  </StrictMode>
)
