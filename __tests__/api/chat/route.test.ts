/**
 * Unit tests for chat API endpoint
 */

import { NextRequest } from 'next/server'
import { POST } from '@/app/api/chat/route'

// Mock the genkit module
jest.mock('@/lib/genkit', () => ({
  analyzeConversation: jest.fn(),
  generateChatResponse: jest.fn(),
  validateGenkitSetup: jest.fn(),
}))

import { analyzeConversation, generateChatResponse, validateGenkitSetup } from '@/lib/genkit'

const mockAnalyzeConversation = analyzeConversation as jest.MockedFunction<typeof analyzeConversation>
const mockGenerateChatResponse = generateChatResponse as jest.MockedFunction<typeof generateChatResponse>
const mockValidateGenkitSetup = validateGenkitSetup as jest.MockedFunction<typeof validateGenkitSetup>

describe('/api/chat', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    
    // Default mock responses
    mockValidateGenkitSetup.mockReturnValue(true)
    mockAnalyzeConversation.mockResolvedValue({
      type: 'general',
      stage: 'initial',
      nextAction: 'continue'
    })
    mockGenerateChatResponse.mockResolvedValue({
      message: 'Test response from Zara',
      conversationFlow: {
        type: 'general',
        stage: 'initial',
        nextAction: 'continue'
      }
    })
  })

  describe('POST /api/chat', () => {
    it('handles valid chat message', async () => {
      const request = new NextRequest('http://localhost:3000/api/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: 'Hello, I need help with printers',
          conversationHistory: []
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toHaveProperty('message')
      expect(data).toHaveProperty('conversationFlow')
      expect(data.message).toBe('Test response from Zara')
      expect(mockAnalyzeConversation).toHaveBeenCalledWith('Hello, I need help with printers', [])
      expect(mockGenerateChatResponse).toHaveBeenCalledWith('Hello, I need help with printers', [], expect.any(Object))
    })

    it('handles message with conversation history', async () => {
      const history = [
        { role: 'user', content: 'Hi' },
        { role: 'assistant', content: 'Hello! How can I help you?' }
      ]

      const request = new NextRequest('http://localhost:3000/api/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: 'I need scanner information',
          conversationHistory: history
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(mockAnalyzeConversation).toHaveBeenCalledWith('I need scanner information', history)
      expect(mockGenerateChatResponse).toHaveBeenCalledWith('I need scanner information', history, expect.any(Object))
    })

    it('handles empty message', async () => {
      const request = new NextRequest('http://localhost:3000/api/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: '',
          conversationHistory: []
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data).toHaveProperty('error')
      expect(data.error).toBe('Message cannot be empty')
    })

    it('handles missing message field', async () => {
      const request = new NextRequest('http://localhost:3000/api/chat', {
        method: 'POST',
        body: JSON.stringify({
          conversationHistory: []
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data).toHaveProperty('error')
      expect(data.error).toBe('Message is required and must be a string')
    })

    it('handles invalid JSON', async () => {
      const request = new NextRequest('http://localhost:3000/api/chat', {
        method: 'POST',
        body: 'invalid json',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data).toHaveProperty('error')
    })

    it('handles message too long', async () => {
      const longMessage = 'a'.repeat(1001)

      const request = new NextRequest('http://localhost:3000/api/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: longMessage,
          conversationHistory: []
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data).toHaveProperty('error')
      expect(data.error).toBe('Message too long. Maximum 1000 characters allowed.')
    })

    it('handles bot user agents', async () => {
      const request = new NextRequest('http://localhost:3000/api/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: 'Hello',
          conversationHistory: []
        }),
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'GoogleBot/2.1'
        }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(403)
      expect(data).toHaveProperty('error')
      expect(data.error).toBe('Automated requests not allowed')
    })

    it('handles genkit setup failure', async () => {
      mockValidateGenkitSetup.mockReturnValue(false)

      const request = new NextRequest('http://localhost:3000/api/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: 'Hello',
          conversationHistory: []
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(503)
      expect(data).toHaveProperty('error')
      expect(data.error).toBe('Chat service temporarily unavailable')
    })

    it('handles AI service error', async () => {
      mockAnalyzeConversation.mockRejectedValue(new Error('AI service unavailable'))

      const request = new NextRequest('http://localhost:3000/api/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: 'Hello',
          conversationHistory: []
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data).toHaveProperty('error')
      expect(data.error).toBe('Internal server error')
    })

    it('handles conversation history too long', async () => {
      const longHistory = Array(51).fill({ role: 'user', content: 'test' })

      const request = new NextRequest('http://localhost:3000/api/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: 'Hello',
          conversationHistory: longHistory
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data).toHaveProperty('error')
      expect(data.error).toBe('Conversation history too long')
    })

    it('trims whitespace from message', async () => {
      const request = new NextRequest('http://localhost:3000/api/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: '  Hello, I need help  ',
          conversationHistory: []
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await POST(request)
      
      expect(response.status).toBe(200)
      expect(mockAnalyzeConversation).toHaveBeenCalledWith('Hello, I need help', [])
    })
  })
})