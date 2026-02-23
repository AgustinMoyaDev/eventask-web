import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { Breadcrumb } from './Breadcrumb'
import { SidebarProvider } from '@/context/sidebar/SidebarProvider'

vi.mock('@/context/breadcrumb/BreadcrumbContext', () => ({
  useBreadcrumbContext: vi.fn(),
}))

import { useBreadcrumbContext } from '@/context/breadcrumb/BreadcrumbContext'

function renderWithProviders(ui: React.ReactNode) {
  return render(
    <MemoryRouter>
      <SidebarProvider>{ui}</SidebarProvider>
    </MemoryRouter>
  )
}

describe('Breadcrumb', () => {
  vi.mocked(useBreadcrumbContext).mockReturnValue({
    breadcrumbs: [
      { path: '/', label: 'Home' },
      { path: '/tasks', label: 'Tasks' },
      { path: '/tasks/123', label: 'Task Details' },
    ],
    setBreadcrumbs: vi.fn(),
  })

  it('should render accessible structure and elements correctly', () => {
    renderWithProviders(<Breadcrumb />)

    const nav = screen.queryByLabelText('breadcrumb')
    expect(nav).toBeInTheDocument()

    // Should render an ordered list
    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()

    // Should render breadcrumb elements
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Tasks')).toBeInTheDocument()
    expect(screen.getByText('Task Details')).toBeInTheDocument()

    // Links should be present except for the last one
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Tasks' })).toHaveAttribute('href', '/tasks')
    // The last breadcrumb should have aria-current="page"
    const current = screen.getByText('Task Details')
    expect(current).toHaveAttribute('aria-current', 'page')
  })

  it('should not render anything if breadcrumbs is empty', () => {
    vi.mocked(useBreadcrumbContext).mockReturnValue({
      breadcrumbs: [],
      setBreadcrumbs: vi.fn(),
    })
    renderWithProviders(<Breadcrumb />)
    expect(screen.queryByLabelText('breadcrumb')).not.toBeInTheDocument()
  })
})
