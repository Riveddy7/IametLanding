/**
 * Unit tests for utility functions
 */

import { cn, generateWhatsAppURL, generateCalendlyURL, isValidEmail, formatProductName, generateSlug, formatCurrency, formatDate, isValidMexicanPhone } from '@/lib/utils'

// Mock product for testing
const mockProduct = {
  id: 'zt411',
  name: 'ZT411 Industrial',
  category: 'impresoras',
  description: 'Test printer',
  icon: '🖨️',
  slug: 'zt411',
  features: ['Feature 1'],
  industries: ['Manufacturing']
}

describe('Utils Functions', () => {
  describe('cn (className merger)', () => {
    it('merges class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2')
    })

    it('handles conditional classes', () => {
      expect(cn('base', true && 'conditional', false && 'hidden')).toBe('base conditional')
    })

    it('handles undefined and null values', () => {
      expect(cn('base', undefined, null, 'end')).toBe('base end')
    })

    it('handles empty strings', () => {
      expect(cn('', 'class1', '', 'class2')).toBe('class1 class2')
    })

    it('handles tailwind class conflicts', () => {
      // Should keep the last occurrence for conflicting classes
      expect(cn('p-2', 'p-4')).toBe('p-4')
    })
  })

  describe('generateWhatsAppURL', () => {
    it('generates correct WhatsApp URL with default message', () => {
      const url = generateWhatsAppURL()
      expect(url).toBe('https://wa.me/526647880797?text=Hola%2C%20me%20interesa%20obtener%20informaci%C3%B3n%20sobre%20las%20soluciones%20Zebra%20para%20mi%20empresa.')
    })

    it('generates correct WhatsApp URL with product name', () => {
      const url = generateWhatsAppURL('ZT411 Industrial')
      expect(url).toContain('526647880797')
      expect(url).toContain('ZT411%20Industrial')
      expect(url).toContain('cotizaci%C3%B3n')
    })

    it('generates correct WhatsApp URL with custom message', () => {
      const customMessage = 'Necesito información sobre impresoras'
      const url = generateWhatsAppURL(undefined, customMessage)
      expect(url).toBe('https://wa.me/526647880797?text=Necesito%20informaci%C3%B3n%20sobre%20impresoras')
    })

    it('handles empty custom message', () => {
      const url = generateWhatsAppURL(undefined, '')
      // Empty string falls back to default message
      expect(url).toBe('https://wa.me/526647880797?text=Hola%2C%20me%20interesa%20obtener%20informaci%C3%B3n%20sobre%20las%20soluciones%20Zebra%20para%20mi%20empresa.')
    })

    it('properly encodes special characters', () => {
      const message = 'Consulta: ¿Cuáles son los precios?'
      const url = generateWhatsAppURL(undefined, message)
      expect(url).toContain('%C2%BF') // Encoded ¿
      expect(url).toContain('%3A') // Encoded :
    })
  })

  describe('generateCalendlyURL', () => {
    it('generates correct Calendly URL with default parameters', () => {
      const url = generateCalendlyURL()
      expect(url).toBe('https://calendly.com/test')
    })

    it('generates correct Calendly URL with product interest', () => {
      const url = generateCalendlyURL('zebra-impresoras')
      expect(url).toBe('https://calendly.com/test?text=Consulta+sobre+zebra-impresoras&details=Inter%C3%A9s+en+soluciones+Zebra+para+zebra-impresoras')
    })

    it('handles empty product interest', () => {
      const url = generateCalendlyURL('')
      expect(url).toBe('https://calendly.com/test')
    })
  })

  describe('formatProductName', () => {
    it('formats product name correctly', () => {
      expect(formatProductName(mockProduct)).toBe('ZT411 Industrial - impresoras')
    })
  })

  describe('generateSlug', () => {
    it('generates SEO-friendly slug', () => {
      expect(generateSlug('Hello World Test')).toBe('hello-world-test')
    })

    it('handles special characters', () => {
      expect(generateSlug('Hello, World! Test')).toBe('hello-world-test')
    })

    it('handles multiple spaces', () => {
      expect(generateSlug('Hello    World    Test')).toBe('hello-world-test')
    })

    it('handles empty string', () => {
      expect(generateSlug('')).toBe('')
    })
  })

  describe('formatCurrency', () => {
    it('formats Mexican peso correctly', () => {
      const formatted = formatCurrency(1000)
      expect(formatted).toMatch(/\$1,000/)
    })

    it('handles zero amount', () => {
      const formatted = formatCurrency(0)
      expect(formatted).toMatch(/\$0/)
    })

    it('handles decimal amounts', () => {
      const formatted = formatCurrency(1000.99)
      expect(formatted).toMatch(/\$1,001/) // Rounds to nearest peso
    })
  })

  describe('formatDate', () => {
    it('formats date in Spanish', () => {
      const date = new Date(2024, 0, 15) // January 15, 2024
      const formatted = formatDate(date)
      expect(formatted).toMatch(/15.*enero.*2024/)
    })
  })

  describe('isValidEmail', () => {
    it('validates correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true)
      expect(isValidEmail('test+tag@example.org')).toBe(true)
    })

    it('rejects invalid email addresses', () => {
      expect(isValidEmail('invalid-email')).toBe(false)
      expect(isValidEmail('test@')).toBe(false)
      expect(isValidEmail('@domain.com')).toBe(false)
      expect(isValidEmail('')).toBe(false)
    })

    it('handles edge cases', () => {
      expect(isValidEmail('a@b.c')).toBe(true) // Minimal valid email
      expect(isValidEmail('test@domain')).toBe(false) // Missing TLD
      expect(isValidEmail('test@domain.')).toBe(false) // Empty TLD
    })
  })

  describe('isValidMexicanPhone', () => {
    it('validates correct Mexican phone numbers', () => {
      expect(isValidMexicanPhone('+526647880797')).toBe(true)
      expect(isValidMexicanPhone('+52 664 788 0797')).toBe(true)
    })

    it('rejects invalid phone numbers', () => {
      expect(isValidMexicanPhone('6647880797')).toBe(false) // Missing country code
      expect(isValidMexicanPhone('+5266478807')).toBe(false) // Too short
      expect(isValidMexicanPhone('+526647880797123')).toBe(false) // Too long
      expect(isValidMexicanPhone('+1234567890')).toBe(false) // Wrong country code
    })

    it('handles various formats', () => {
      expect(isValidMexicanPhone('+52 664 788 0797')).toBe(true)
      expect(isValidMexicanPhone('+52-664-788-0797')).toBe(false) // Dashes not handled
    })
  })

  describe('Environment Variables', () => {
    it('uses correct WhatsApp number from environment', () => {
      const url = generateWhatsAppURL()
      expect(url).toContain('526647880797')
    })

    it('uses correct Calendly URL from environment', () => {
      const url = generateCalendlyURL()
      expect(url).toContain('calendly.com/test')
    })
  })
})