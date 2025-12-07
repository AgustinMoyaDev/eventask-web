import { render, screen, fireEvent } from '@testing-library/react'
import { InputWithSuggestions } from '@/components/input-with-suggestions/InputWithSuggestions'
import React from 'react'

describe('InputWithSuggestions', () => {
  const baseProps = {
    allowCreateIfNotExists: false,
    name: 'city',
    label: 'City',
    value: '',
    suggestionData: ['Madrid', 'Barcelona', 'Valencia'],
    onChange: vi.fn(),
    onBlur: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render input and label with correct attributes', () => {
    render(<InputWithSuggestions {...baseProps} />)
    const input = screen.getByRole('combobox', { name: /city/i })
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('name', 'city')
    expect(screen.getByLabelText(/city/i)).toBe(input)
  })

  it('shows suggestions when focused and filters as user types', () => {
    function Wrapper() {
      const [val, setVal] = React.useState('')
      return (
        <InputWithSuggestions {...baseProps} value={val} onChange={e => setVal(e.target.value)} />
      )
    }

    render(<Wrapper />)

    const input = screen.getByRole('combobox')
    fireEvent.focus(input)

    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getByText('Madrid')).toBeInTheDocument()
    expect(screen.getByText('Barcelona')).toBeInTheDocument()
    expect(screen.getByText('Valencia')).toBeInTheDocument()

    fireEvent.change(input, { target: { value: 'Bar' } })

    expect(screen.getByRole('option', { name: 'Barcelona' })).toBeInTheDocument()
    expect(screen.queryByRole('option', { name: 'Madrid' })).not.toBeInTheDocument()
  })

  it('calls onChange when suggestion is clicked', () => {
    const onChange = vi.fn()
    render(<InputWithSuggestions {...baseProps} onChange={onChange} value="M" />)
    const input = screen.getByRole('combobox')
    fireEvent.focus(input)
    fireEvent.click(screen.getByText('Madrid'))
    expect(onChange).toHaveBeenCalledWith({ target: { name: 'city', value: 'Madrid' } })
    //? Allow partial match: only requires the object have at least those properties and values.
    // expect(onChange).toHaveBeenCalledWith(
    //   expect.objectContaining({
    //     target: expect.objectContaining({ name: 'city', value: 'Madrid' }),
    //   })
    // )
  })

  it('shows "No results found" when no match', () => {
    render(<InputWithSuggestions {...baseProps} value="Zaragoza" />)
    const input = screen.getByRole('combobox')
    fireEvent.focus(input)
    expect(screen.getByText(/no results found/i)).toBeInTheDocument()
  })

  it('shows create option and calls onCreateNew when clicked', () => {
    const onCreateNew = vi.fn()
    render(
      <InputWithSuggestions
        {...baseProps}
        value="Bilbao"
        allowCreateIfNotExists
        onCreateNew={onCreateNew}
      />
    )
    const input = screen.getByRole('combobox')
    fireEvent.focus(input)
    const createOption = screen.getByText(/create/i)
    expect(createOption).toBeInTheDocument()
    fireEvent.click(createOption)
    expect(onCreateNew).toHaveBeenCalledWith('Bilbao')
  })

  it('shows loading indicator when loading', () => {
    render(<InputWithSuggestions {...baseProps} loading />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('shows error message and aria-describedby when error and touched', () => {
    render(<InputWithSuggestions {...baseProps} error="Campo requerido" touched />)
    const input = screen.getByRole('combobox')
    expect(screen.getByText('Campo requerido')).toBeInTheDocument()
    expect(input).toHaveAttribute('aria-describedby')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('shows hint when provided and no error', () => {
    render(<InputWithSuggestions {...baseProps} hint="Introduce una ciudad" />)
    expect(screen.getByText(/eg: introduce una ciudad/i)).toBeInTheDocument()
  })

  it('closes suggestions when clicking outside', () => {
    render(<InputWithSuggestions {...baseProps} />)
    const input = screen.getByRole('combobox')
    fireEvent.focus(input)
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    fireEvent.mouseDown(document.body)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })
})
