/**
 * Test utilities for rendering components with providers
 * @see https://redux.js.org/usage/writing-tests#setting-up-a-reusable-test-render-function
 */
import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { rootReducer } from '@/store/rootReducer'
import { baseApi } from '@/services/baseApi'
import { RootState } from '@/store/store'

/**
 * Creates a fresh Redux store for testing with the same config as production.
 * Each test gets an isolated store to prevent state contamination.
 *
 * @param preloadedState - Initial state for the store (optional)
 * @returns Configured Redux store for testing
 */
export function setupTestStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(baseApi.middleware),
  })
}

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: ReturnType<typeof setupTestStore>
  initialRoute?: string
}

/**
 * Custom render function that wraps component with all necessary providers.
 * Use this instead of @testing-library/react's render in tests.
 *
 * @param ui - Component to render
 * @param options - Render options including preloadedState, store, and initialRoute
 * @returns Render result with store attached
 *
 * @example
 * ```typescript
 * const { store } = renderWithProviders(<MyComponent />, {
 *   preloadedState: { auth: { user: mockUser } },
 *   initialRoute: '/see-all?type=tasks'
 * })
 * ```
 */
export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState,
    store = setupTestStore(preloadedState),
    initialRoute = '/',
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[initialRoute]}>{children}</MemoryRouter>
      </Provider>
    )
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
