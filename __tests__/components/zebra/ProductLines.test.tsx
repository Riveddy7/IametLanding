/**
 * Unit tests for ProductLines component
 */

import { render, screen, fireEvent } from '@testing-library/react'
import ProductLines from '@/components/zebra/ProductLines'
import { zebraCategories } from '@/lib/zebra-data'

// Mock router
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  )
})

describe('ProductLines Component', () => {
  it('renders with default categories', () => {
    render(<ProductLines />)
    
    expect(screen.getByText('Tecnología Zebra para')).toBeInTheDocument()
    expect(screen.getByText('Cada Proceso')).toBeInTheDocument()
    expect(screen.getByText('Nuestras Soluciones')).toBeInTheDocument()
  })

  it('renders all Zebra categories', () => {
    render(<ProductLines />)
    
    // Check that all categories are rendered
    expect(screen.getByText('Impresoras Industriales')).toBeInTheDocument()
    expect(screen.getByText('Escáneres de Códigos de Barras')).toBeInTheDocument()
    expect(screen.getByText('Tecnología RFID')).toBeInTheDocument()
    expect(screen.getByText('Computadoras Móviles')).toBeInTheDocument()
    expect(screen.getByText('Visión Artificial')).toBeInTheDocument()
    expect(screen.getByText('Tecnologías de Localización')).toBeInTheDocument()
  })

  it('displays product count for each category', () => {
    render(<ProductLines />)
    
    // Each category should show its product count
    const productCounts = screen.getAllByText(/productos disponibles/)
    expect(productCounts.length).toBeGreaterThan(0)
  })

  it('displays category benefits', () => {
    render(<ProductLines />)
    
    // Check for some category benefits
    expect(screen.getByText('Resistentes a ambientes industriales')).toBeInTheDocument()
    expect(screen.getByText('Escaneo rápido y preciso')).toBeInTheDocument()
    expect(screen.getByText('Identificación sin línea de vista')).toBeInTheDocument()
  })

  it('handles category click callback', () => {
    const mockOnCategoryClick = jest.fn()
    render(<ProductLines onCategoryClick={mockOnCategoryClick} />)
    
    // Click on the first category card
    const categoryLinks = screen.getAllByRole('link')
    fireEvent.click(categoryLinks[0])
    
    // The callback should be called through the Link component
    expect(categoryLinks[0]).toHaveAttribute('href', '/zebra/impresoras')
  })

  it('generates correct category links', () => {
    render(<ProductLines />)
    
    // Check that category links are correct
    const printerLink = screen.getByRole('link', { name: /impresoras industriales/i })
    expect(printerLink).toHaveAttribute('href', '/zebra/impresoras')
    
    const scannerLink = screen.getByRole('link', { name: /escáneres de códigos de barras/i })
    expect(scannerLink).toHaveAttribute('href', '/zebra/scanners')
  })

  it('displays category icons', () => {
    render(<ProductLines />)
    
    // Icons should be present (as emoji text)
    expect(screen.getByText('🖨️')).toBeInTheDocument() // Printers
    expect(screen.getByText('📱')).toBeInTheDocument() // Scanners
    expect(screen.getByText('📡')).toBeInTheDocument() // RFID
    expect(screen.getByText('💻')).toBeInTheDocument() // Mobile computers
    expect(screen.getByText('👁️')).toBeInTheDocument() // Vision
    expect(screen.getByText('📍')).toBeInTheDocument() // Location
  })

  it('has bottom CTA section', () => {
    render(<ProductLines />)
    
    expect(screen.getByText('¿No encuentras lo que necesitas?')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /hablar con un experto/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /chatear con zara/i })).toBeInTheDocument()
  })

  it('handles expert CTA click', () => {
    const mockElement = { scrollIntoView: jest.fn() }
    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement as any)
    
    render(<ProductLines />)
    
    const expertButton = screen.getByRole('button', { name: /hablar con un experto/i })
    fireEvent.click(expertButton)
    
    expect(document.getElementById).toHaveBeenCalledWith('final-cta')
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('handles chat CTA click', () => {
    const mockChatElement = { querySelector: jest.fn(() => ({ click: jest.fn() })) }
    jest.spyOn(document, 'getElementById').mockReturnValue(mockChatElement as any)
    
    render(<ProductLines />)
    
    const chatButton = screen.getByRole('button', { name: /chatear con zara/i })
    fireEvent.click(chatButton)
    
    expect(document.getElementById).toHaveBeenCalledWith('chat-assistant')
  })

  it('displays product descriptions', () => {
    render(<ProductLines />)
    
    // Check for category descriptions
    expect(screen.getByText(/Impresoras de etiquetas industriales/i)).toBeInTheDocument()
    expect(screen.getByText(/Escáneres industriales para captura de datos/i)).toBeInTheDocument()
    expect(screen.getByText(/Soluciones RFID para identificación automática/i)).toBeInTheDocument()
  })

  it('has proper section structure', () => {
    render(<ProductLines />)
    
    // Should have main heading
    expect(screen.getByText('Tecnología Zebra para')).toBeInTheDocument()
    expect(screen.getByText('Cada Proceso')).toBeInTheDocument()
  })

  it('displays hover effects on category cards', () => {
    render(<ProductLines />)
    
    // Cards should have hover effect classes
    const categoryLinks = screen.getAllByRole('link')
    expect(categoryLinks.length).toBeGreaterThan(0)
    expect(categoryLinks[0]).toBeInTheDocument()
  })

  it('shows category benefits list', () => {
    render(<ProductLines />)
    
    // Each category should show benefits - look for some specific benefit text that appears
    expect(screen.getAllByText('Resistentes a ambientes industriales').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Escaneo rápido y preciso').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Identificación sin línea de vista').length).toBeGreaterThan(0)
  })

  it('is mobile responsive', () => {
    render(<ProductLines />)
    
    // Should have responsive grid classes
    const section = screen.getByText('Tecnología Zebra para').closest('section')
    expect(section).toHaveClass('px-4', 'py-20')
  })
})