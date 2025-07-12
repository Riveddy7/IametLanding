/**
 * Unit tests for Card component
 */

import { render, screen, fireEvent } from '@testing-library/react'
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card'

describe('Card Component', () => {
  it('renders card with children', () => {
    render(
      <Card>
        <div data-testid="card-content">Test Content</div>
      </Card>
    )
    expect(screen.getByTestId('card-content')).toBeInTheDocument()
  })

  it('applies default variant styles', () => {
    render(<Card data-testid="card">Default Card</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('bg-white/5', 'backdrop-blur-sm')
  })

  it('applies glassmorphism variant styles', () => {
    render(<Card variant="glassmorphism" data-testid="card">Glass Card</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('bg-white/10', 'backdrop-blur-lg')
  })

  it('applies solid variant styles', () => {
    render(<Card variant="solid" data-testid="card">Solid Card</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('bg-zebra-gray-800/90')
  })

  it('applies hover effects when hover prop is true', () => {
    render(<Card hover={true} data-testid="card">Hover Card</Card>)
    const card = screen.getByTestId('card')
    
    // Should have hover classes applied
    expect(card.className).toContain('hover:')
  })

  it('handles click events when onClick is provided', () => {
    const handleClick = jest.fn()
    render(<Card onClick={handleClick} data-testid="card">Clickable Card</Card>)
    
    fireEvent.click(screen.getByTestId('card'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('has cursor pointer when clickable', () => {
    const handleClick = jest.fn()
    render(<Card onClick={handleClick} data-testid="card">Clickable Card</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('cursor-pointer')
  })

  it('supports keyboard navigation when clickable', () => {
    const handleClick = jest.fn()
    render(<Card onClick={handleClick} data-testid="card">Clickable Card</Card>)
    
    const card = screen.getByTestId('card')
    fireEvent.keyDown(card, { key: 'Enter', code: 'Enter' })
    expect(handleClick).toHaveBeenCalledTimes(1)

    fireEvent.keyDown(card, { key: ' ', code: 'Space' })
    expect(handleClick).toHaveBeenCalledTimes(2)
  })

  it('has proper ARIA attributes when clickable', () => {
    const handleClick = jest.fn()
    render(<Card onClick={handleClick} data-testid="card">Clickable Card</Card>)
    const card = screen.getByTestId('card')
    
    expect(card).toHaveAttribute('role', 'button')
    expect(card).toHaveAttribute('tabIndex', '0')
  })

  it('applies custom className', () => {
    render(<Card className="custom-class" data-testid="card">Custom Card</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('custom-class')
  })
})

describe('Card Sub-components', () => {
  describe('CardHeader', () => {
    it('renders header with correct spacing', () => {
      render(<CardHeader data-testid="header">Header Content</CardHeader>)
      const header = screen.getByTestId('header')
      expect(header).toHaveClass('p-6', 'pb-4')
    })
  })

  describe('CardTitle', () => {
    it('renders as h3 with correct styling', () => {
      render(<CardTitle>Test Title</CardTitle>)
      const title = screen.getByRole('heading', { level: 3 })
      expect(title).toHaveClass('text-lg', 'font-semibold', 'text-white')
      expect(title).toHaveTextContent('Test Title')
    })
  })

  describe('CardDescription', () => {
    it('renders description with correct styling', () => {
      render(<CardDescription data-testid="description">Test Description</CardDescription>)
      const description = screen.getByTestId('description')
      expect(description).toHaveClass('text-sm', 'text-white/70')
    })
  })

  describe('CardContent', () => {
    it('renders content with correct padding', () => {
      render(<CardContent data-testid="content">Content</CardContent>)
      const content = screen.getByTestId('content')
      expect(content).toHaveClass('p-6', 'pt-0')
    })
  })

  describe('CardFooter', () => {
    it('renders footer with correct styling', () => {
      render(<CardFooter data-testid="footer">Footer</CardFooter>)
      const footer = screen.getByTestId('footer')
      expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0')
    })
  })

  describe('Card Composition', () => {
    it('renders complete card composition correctly', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Product Card</CardTitle>
            <CardDescription>Product description here</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Main content area</p>
          </CardContent>
          <CardFooter>
            <button>Action Button</button>
          </CardFooter>
        </Card>
      )

      expect(screen.getByRole('heading', { name: /product card/i })).toBeInTheDocument()
      expect(screen.getByText('Product description here')).toBeInTheDocument()
      expect(screen.getByText('Main content area')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /action button/i })).toBeInTheDocument()
    })
  })
})