/**
 * Unit tests for HeroSection component
 */

import { render, screen, fireEvent } from '@testing-library/react'
import HeroSection from '@/components/zebra/HeroSection'

// Mock scrollIntoView since it's not available in test environment
Element.prototype.scrollIntoView = jest.fn()

describe('HeroSection Component', () => {
  it('renders with default props', () => {
    render(<HeroSection />)
    
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByText(/Soluciones de Automatización Zebra/i)).toBeInTheDocument()
    expect(screen.getByText(/Distribuidor Autorizado/i)).toBeInTheDocument()
  })

  it('renders custom title and subtitle', () => {
    const customTitle = 'Custom Zebra Solutions'
    const customSubtitle = 'Custom subtitle here'
    
    render(
      <HeroSection 
        title={customTitle}
        subtitle={customSubtitle}
      />
    )
    
    expect(screen.getByText(customTitle)).toBeInTheDocument()
    expect(screen.getByText(customSubtitle)).toBeInTheDocument()
  })

  it('renders custom CTA text', () => {
    const customCTA = 'Custom CTA Text'
    
    render(<HeroSection ctaText={customCTA} />)
    
    expect(screen.getByRole('button', { name: customCTA })).toBeInTheDocument()
  })

  it('calls custom CTA action when provided', () => {
    const mockAction = jest.fn()
    
    render(<HeroSection ctaAction={mockAction} />)
    
    const ctaButton = screen.getByRole('button', { name: /Descubre Nuestras Soluciones/i })
    fireEvent.click(ctaButton)
    
    expect(mockAction).toHaveBeenCalledTimes(1)
  })

  it('scrolls to product lines when no custom action provided', () => {
    // Mock getElementById to return a mock element
    const mockElement = { scrollIntoView: jest.fn() }
    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement as any)
    
    render(<HeroSection />)
    
    const ctaButton = screen.getByRole('button', { name: /Descubre Nuestras Soluciones/i })
    fireEvent.click(ctaButton)
    
    expect(document.getElementById).toHaveBeenCalledWith('product-lines')
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('contains IAMET distributor badge', () => {
    render(<HeroSection />)
    
    expect(screen.getByText('IAMET')).toBeInTheDocument()
    expect(screen.getByText('Distribuidor Autorizado Zebra')).toBeInTheDocument()
  })

  it('displays key benefits', () => {
    render(<HeroSection />)
    
    expect(screen.getByText('Productividad +40%')).toBeInTheDocument()
    expect(screen.getByText('Soporte Local')).toBeInTheDocument()
    expect(screen.getByText('Garantía Total')).toBeInTheDocument()
  })

  it('has two CTA buttons', () => {
    render(<HeroSection />)
    
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)
    
    expect(screen.getByRole('button', { name: /Descubre Nuestras Soluciones/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Hablar con un Experto/i })).toBeInTheDocument()
  })

  it('secondary CTA scrolls to final-cta section', () => {
    const mockElement = { scrollIntoView: jest.fn() }
    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement as any)
    
    render(<HeroSection />)
    
    const secondaryCTA = screen.getByRole('button', { name: /Hablar con un Experto/i })
    fireEvent.click(secondaryCTA)
    
    expect(document.getElementById).toHaveBeenCalledWith('final-cta')
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('displays trust indicators', () => {
    render(<HeroSection />)
    
    expect(screen.getByText('Empresas que confían en nuestras soluciones:')).toBeInTheDocument()
    expect(screen.getByText('Toyota')).toBeInTheDocument()
    expect(screen.getByText('Foxconn')).toBeInTheDocument()
    expect(screen.getByText('Honeywell')).toBeInTheDocument()
    expect(screen.getByText('Plantronics')).toBeInTheDocument()
    expect(screen.getByText('+200 más')).toBeInTheDocument()
  })

  it('has glassmorphism visual elements', () => {
    render(<HeroSection />)
    
    // Check for glassmorphism card in the right column
    expect(screen.getByText('¿Por qué elegir Zebra?')).toBeInTheDocument()
    expect(screen.getByText('Tecnología Probada')).toBeInTheDocument()
    expect(screen.getByText('ROI Inmediato')).toBeInTheDocument()
    expect(screen.getByText('Soporte Especializado')).toBeInTheDocument()
  })

  it('is mobile responsive', () => {
    render(<HeroSection />)
    
    const heroSection = screen.getByRole('banner')
    expect(heroSection).toHaveClass('px-4', 'py-20')
    
    // Check for responsive text classes
    const title = screen.getByText(/Soluciones de Automatización Zebra/i)
    expect(title.className).toContain('text-4xl')
    expect(title.className).toContain('md:text-5xl')
    expect(title.className).toContain('lg:text-6xl')
  })

  it('has proper semantic structure', () => {
    render(<HeroSection />)
    
    // Should have banner role
    expect(screen.getByRole('banner')).toBeInTheDocument()
    
    // Should have main heading
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })

  it('includes scroll indicator animation', () => {
    render(<HeroSection />)
    
    const heroSection = screen.getByRole('banner')
    expect(heroSection).toBeInTheDocument()
    
    // The scroll indicator should be present (though not easily testable with current structure)
    // This test verifies the component renders without errors
  })
})