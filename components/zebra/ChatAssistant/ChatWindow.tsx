/**
 * ChatWindow component for IAMET Zebra landing page
 * Handles chat interface and message flow
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, ExternalLink, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { cn, generateWhatsAppURL, generateCalendlyURL } from '@/lib/utils';
import { ChatMessage, ChatResponse } from '@/types/zebra';

interface ChatWindowProps {
  initialMessage?: string;
  onNewMessage?: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  initialMessage = '¡Hola! Soy Zara, tu especialista en soluciones Zebra. ¿En qué puedo ayudarte hoy?',
  onNewMessage
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      content: initialMessage,
      role: 'assistant',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, [initialMessage]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Call the chat API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversationHistory: messages.slice(-5), // Send last 5 messages for context
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const chatResponse: ChatResponse = await response.json();

      // Simulate typing delay
      setTimeout(() => {
        const assistantMessage: ChatMessage = {
          id: Date.now().toString(),
          content: chatResponse.message,
          role: 'assistant',
          timestamp: new Date(),
          metadata: {
            conversationFlow: chatResponse.conversationFlow,
          },
        };

        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
        setIsLoading(false);

        // Handle next actions
        if (chatResponse.nextAction) {
          handleNextAction(chatResponse.nextAction);
        }

        if (onNewMessage) {
          onNewMessage();
        }
      }, 1000);

    } catch (error) {
      console.error('Chat error:', error);
      
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        content: 'Disculpa, tengo problemas técnicos. ¿Podrías intentar de nuevo o contactarnos directamente?',
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const handleNextAction = (nextAction: ChatResponse['nextAction']) => {
    if (!nextAction) return;

    if (nextAction.type === 'whatsapp' && nextAction.url) {
      window.open(nextAction.url, '_blank');
    } else if (nextAction.type === 'calendly' && nextAction.url) {
      window.open(nextAction.url, '_blank');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-white/60">
            <Bot className="w-4 h-4" />
            <span className="text-sm">Zara está escribiendo...</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-zebra-blue-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-zebra-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-2 h-2 bg-zebra-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu mensaje..."
            className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-zebra-blue-500/50 focus:border-zebra-blue-500/50"
            disabled={isLoading}
          />
          <Button
            variant="primary"
            size="sm"
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="px-3"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

/**
 * Individual message bubble component
 */
interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  return (
    <div className={cn(
      'flex gap-2',
      isUser ? 'justify-end' : 'justify-start'
    )}>
      {/* Avatar */}
      {isAssistant && (
        <div className="w-8 h-8 bg-zebra-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-zebra-blue-400" />
        </div>
      )}

      {/* Message content */}
      <div className={cn(
        'max-w-[80%] px-4 py-2 rounded-lg',
        isUser ? 'bg-zebra-blue-600/80 text-white' : 'bg-white/10 text-white'
      )}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
        
        {/* Timestamp */}
        <div className={cn(
          'text-xs mt-1 opacity-70',
          isUser ? 'text-white/70' : 'text-white/50'
        )}>
          {message.timestamp.toLocaleTimeString('es-MX', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
};

export default ChatWindow;