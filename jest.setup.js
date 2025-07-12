import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/zebra'
  },
  notFound: jest.fn(),
}))

// Mock environment variables
process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = '+526647880797'
process.env.NEXT_PUBLIC_CALENDLY_URL = 'https://calendly.com/test'
process.env.NEXT_PUBLIC_SITE_URL = 'https://iamet.mx'
process.env.GEMINI_API_KEY = 'test-api-key'

// Mock window.open
Object.defineProperty(window, 'open', {
  writable: true,
  value: jest.fn(),
})

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn()

// Mock fetch for API calls
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      message: 'Test response from Zara',
      conversationFlow: {
        type: 'general',
        stage: 'initial',
        nextAction: 'continue'
      }
    }),
  })
)