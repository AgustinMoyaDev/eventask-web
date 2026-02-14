import { render, screen, fireEvent } from '@testing-library/react'
import { MultiSelectInput } from '@/components/multi-select-input/MultiSelectInput'

interface Option {
  id: string
  label: string
}

const options: Option[] = [
  { id: '1', label: 'Alice' },
  { id: '2', label: 'Bob' },
  { id: '3', label: 'Charlie' },
]

const getOptionLabel = (o: Option) => o.label
const getOptionKey = (o: Option) => o.id

describe('MultiSelectInput', () => {
  it('should render label and input', () => {
    render(
      <MultiSelectInput<Option>
        label="Users"
        typeOption="user"
        options={options}
        getOptionLabel={getOptionLabel}
        getOptionKey={getOptionKey}
      />
    )
    const label = screen.getByText(/users:/i)
    const input = screen.getByPlaceholderText(/search by user/i)
    expect(label).toBeInTheDocument()
    expect(input).toBeInTheDocument()
  })

  it('should show filtered options as user types', () => {
    render(
      <MultiSelectInput<Option>
        label="Users"
        typeOption="user"
        options={options}
        getOptionLabel={getOptionLabel}
        getOptionKey={getOptionKey}
      />
    )
    const input = screen.getByLabelText(/search users/i)
    fireEvent.change(input, { target: { value: 'bob' } })
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.queryByText('Alice')).not.toBeInTheDocument()
  })

  it('should call onAddItem when option is clicked', () => {
    const onAddItem = vi.fn()
    render(
      <MultiSelectInput<Option>
        label="Users"
        typeOption="user"
        options={options}
        getOptionLabel={getOptionLabel}
        getOptionKey={getOptionKey}
        onAddItem={onAddItem}
      />
    )
    fireEvent.click(screen.getByText('Alice'))
    expect(onAddItem).toHaveBeenCalledWith(options[0])
  })

  it('should show selected options as chips and allows removal', () => {
    const onRemoveItem = vi.fn()
    render(
      <MultiSelectInput<Option>
        label="Users"
        typeOption="user"
        options={options}
        selectedOptions={[options[1]]}
        getOptionLabel={getOptionLabel}
        getOptionKey={getOptionKey}
        onRemoveItem={onRemoveItem}
        onAddItem={vi.fn()}
      />
    )
    const span = screen.getByText('Bob')
    expect(span).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /remove bob/i }))
    expect(onRemoveItem).toHaveBeenCalledWith(options[1])
  })

  it('should show error message and sets aria attributes', () => {
    render(
      <MultiSelectInput<Option>
        label="Users"
        typeOption="user"
        options={options}
        getOptionLabel={getOptionLabel}
        getOptionKey={getOptionKey}
        error="Required"
      />
    )
    expect(screen.getByText('Required')).toBeInTheDocument()
    const input = screen.getByLabelText(/search users/i)
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-describedby')
  })

  it('should show loader when loading', () => {
    render(
      <MultiSelectInput<Option>
        label="Users"
        typeOption="user"
        options={options}
        getOptionLabel={getOptionLabel}
        getOptionKey={getOptionKey}
        loading
      />
    )
    expect(screen.getAllByRole('status').length).toBeGreaterThan(0)
  })

  it('shows action button and calls actionMethod', () => {
    const actionMethod = vi.fn()
    render(
      <MultiSelectInput<Option>
        label="Users"
        options={options}
        getOptionLabel={getOptionLabel}
        getOptionKey={getOptionKey}
        actionMethod={actionMethod}
        actionLabel="Invite"
        typeOption="email"
        actionOnEmpty={true}
      />
    )
    const input = screen.getByLabelText(/search users/i)
    fireEvent.change(input, { target: { value: 'new@email.com' } })
    const btn = screen.getByRole('button', { name: /invite/i })
    fireEvent.click(btn)
    expect(actionMethod).toHaveBeenCalledWith('new@email.com')
  })
})
