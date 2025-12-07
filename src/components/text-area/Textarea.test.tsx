import { render, screen, fireEvent } from '@testing-library/react'
import { Textarea } from '@/components/text-area/Textarea'

describe('Textarea', () => {
  const handleOnChange = vi.fn()
  const handleOnBlur = vi.fn()

  it('should render label and textarea with correct attributes', () => {
    render(
      <Textarea
        id="desc"
        name="description"
        label="Description"
        value="Initial text"
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        placeholder="Event description"
        rows={6}
        required
      />
    )
    const textarea = screen.getByRole('textbox', { name: /description/i })
    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveAttribute('id', 'desc')
    expect(textarea).toHaveAttribute('name', 'description')
    expect(textarea).toHaveAttribute('placeholder', 'Event description')
    expect(textarea).toHaveAttribute('rows', '6')
    expect(textarea).toBeRequired()
    expect(screen.getByLabelText(/description/i)).toBe(textarea)
  })

  it('should call onChange when value changes', () => {
    render(
      <Textarea
        id="desc"
        name="description"
        label="Description"
        value=""
        onChange={handleOnChange}
        onBlur={handleOnBlur}
      />
    )
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'new text' } })
    expect(handleOnChange).toHaveBeenCalledTimes(1)
  })

  it('should call onBlur when textarea loses focus', () => {
    render(
      <Textarea
        id="desc"
        name="description"
        label="Description"
        value=""
        onChange={handleOnChange}
        onBlur={handleOnBlur}
      />
    )
    const textarea = screen.getByRole('textbox')
    fireEvent.blur(textarea)
    expect(handleOnBlur).toHaveBeenCalledTimes(1)
  })

  it('should show error message and aria-describedby when error and touched', () => {
    render(
      <Textarea
        id="desc"
        name="description"
        label="Description"
        value=""
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        error="Required field"
        touched
      />
    )
    const textarea = screen.getByRole('textbox')
    expect(screen.getByText('Required field')).toBeInTheDocument()
    expect(textarea).toHaveAttribute('aria-describedby', 'desc-error')
  })

  it('should show hint when provided', () => {
    render(
      <Textarea
        id="desc"
        name="description"
        label="Description"
        value=""
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        hint="Describe your task"
      />
    )
    expect(screen.getByText(/eg: describe your task/i)).toBeInTheDocument()
  })

  it('should be disabled when disabled prop is true', () => {
    render(
      <Textarea
        id="desc"
        name="description"
        label="Description"
        value=""
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        disabled
      />
    )
    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeDisabled()
  })
})
