import { render, screen, fireEvent } from '@testing-library/react'

import { UserAvatar } from '@/components/user-avatar/UserAvatar'

describe('UserAvatar', () => {
  it('should render initials when no imageUrl and not loading', () => {
    render(<UserAvatar firstName="John" lastName="Doe" />)
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('should render image when imageUrl is provided', () => {
    render(<UserAvatar firstName="Jane" lastName="Smith" imageUrl="https://img.com/avatar.png" />)
    const img = screen.getByAltText('Jane Smith avatar')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', expect.stringContaining('avatar.png'))
  })

  it('renders loader when loading', () => {
    render(<UserAvatar firstName="Jane" lastName="Smith" loading />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('renders file input when editable', () => {
    render(<UserAvatar firstName="Jane" lastName="Smith" editable />)
    expect(screen.getByLabelText(/upload profile picture/i)).toBeInTheDocument()
  })

  it('calls onFileChange with valid file', () => {
    const handleFileChange = vi.fn()
    render(
      <UserAvatar firstName="Jane" lastName="Smith" editable onFileChange={handleFileChange} />
    )
    const input = screen
      .getByLabelText(/upload profile picture/i)
      .querySelector('input[type="file"]') as HTMLInputElement
    const file = new File(['avatar'], 'avatar.png', { type: 'image/png' })
    fireEvent.change(input, { target: { files: [file] } })
    expect(handleFileChange).toHaveBeenCalledWith(file)
  })

  it('shows error for invalid file type', () => {
    render(<UserAvatar firstName="Jane" lastName="Smith" editable onFileChange={vi.fn()} />)
    const input = screen
      .getByLabelText(/upload profile picture/i)
      .querySelector('input[type="file"]') as HTMLInputElement
    const file = new File(['avatar'], 'avatar.gif', { type: 'image/gif' })
    fireEvent.change(input, { target: { files: [file] } })
    expect(screen.getByRole('alert')).toHaveTextContent(/only png, jpeg or webp/i)
  })

  it('shows error for file too large', () => {
    render(<UserAvatar firstName="Jane" lastName="Smith" editable onFileChange={vi.fn()} />)
    const input = screen
      .getByLabelText(/upload profile picture/i)
      .querySelector('input[type="file"]') as HTMLInputElement
    const file = new File(['a'.repeat(1024 * 1024 + 1)], 'avatar.png', { type: 'image/png' })
    Object.defineProperty(file, 'size', { value: 1024 * 1024 + 1 })
    fireEvent.change(input, { target: { files: [file] } })
    expect(screen.getByRole('alert')).toHaveTextContent(/file must be less than 1 mb/i)
  })

  it('applies custom className', () => {
    render(<UserAvatar firstName="Jane" lastName="Smith" className="custom-avatar" />)
    expect(screen.getByLabelText(/jane smith avatar/i)).toHaveClass('custom-avatar')
  })
})
