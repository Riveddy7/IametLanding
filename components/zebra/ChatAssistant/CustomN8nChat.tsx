/**
 * Custom N8n Chat Interface for IAMET Zebra
 * Direct webhook integration with custom UI
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, MessageCircle, X, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isLoading?: boolean;
}

interface CustomN8nChatProps {
  className?: string;
}

const CustomN8nChat: React.FC<CustomN8nChatProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const webhookUrl = 'https://riveddy7.app.n8n.cloud/webhook/5a6d3896-65ca-4b5e-ab47-2be3e7b7af63';

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        content: '¡Hola! Soy Zara, tu especialista en soluciones Zebra para IAMET en Tijuana. 🦓\n\nNos especializamos en:\n• Impresoras industriales\n• Escáneres de códigos de barras\n• Tecnología RFID\n• Automatización para maquiladoras\n\n¿En qué industria trabajas y qué desafíos de identificación o automatización enfrentas?\n\n💬 Para respuesta inmediata: WhatsApp +52 664 788 0797',
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    // Add user message
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Add loading message
    const loadingMessage: Message = {
      id: `loading-${Date.now()}`,
      content: 'Zara está escribiendo...',
      role: 'assistant',
      timestamp: new Date(),
      isLoading: true,
    };
    setMessages(prev => [...prev, loadingMessage]);

    try {
      const payload = {
        message: userMessage.content,
        sessionId: sessionId,
        conversationHistory: messages.slice(-10).map(m => ({
          role: m.role,
          content: m.content,
          timestamp: m.timestamp.toISOString(),
        })),
        userInfo: {
          source: 'IAMET Zebra Landing',
          timestamp: new Date().toISOString(),
        },
      };

      console.log('🚀 ENVIANDO A n8n WEBHOOK:', {
        url: webhookUrl,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        payload: payload,
        payloadSize: JSON.stringify(payload).length + ' bytes'
      });

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Remove loading message
      setMessages(prev => prev.filter(m => !m.isLoading));

      console.log('📨 RESPUESTA DE n8n WEBHOOK:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      });

      const responseText = await response.text();
      console.log('📄 CONTENIDO DE RESPUESTA n8n:', {
        rawText: responseText,
        length: responseText.length,
        contentType: response.headers.get('content-type')
      });

      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        data = { rawResponse: responseText };
      }

      let responseContent = '';

      if (!response.ok) {
        // Handle specific n8n errors with detailed diagnostics
        console.error('⚠️ n8n Webhook Error Details:', {
          status: response.status,
          statusText: response.statusText,
          url: webhookUrl,
          data: data
        });

        if (response.status === 500 && data.message && data.message.includes('Workflow could not be started')) {
          responseContent = `🚨 **DIAGNÓSTICO DEL WEBHOOK n8n:**\n\n**Estado:** Workflow no se puede iniciar\n**URL:** ${webhookUrl}\n**Error:** ${data.message}\n\n**Para solucionarlo en n8n:**\n1. ✅ Verifica que el workflow esté ACTIVO\n2. ✅ Confirma que el Webhook Trigger esté configurado\n3. ✅ Revisa que no haya errores en los nodos\n4. ✅ Asegúrate que el workflow esté guardado\n\n**Mientras tanto contacta:**\n📱 WhatsApp: +52 664 788 0797\n📧 Email: info@iamet.mx`;
        } else if (data.message && data.message.includes('Workflow Webhook Error')) {
          responseContent = `🔧 **ERROR DE CONFIGURACIÓN n8n:**\n\nEl workflow existe pero hay un problema de configuración.\n\n**Pasos para revisar:**\n1. Webhook Trigger debe estar conectado correctamente\n2. Los nodos siguientes deben tener conexión válida\n3. Verificar que no hay errores de sintaxis\n4. El workflow debe estar en estado ACTIVO\n\n**URL del webhook:** ${webhookUrl}\n**Error:** ${data.message}\n\n💬 Contacto directo: +52 664 788 0797`;
        } else {
          responseContent = `❌ **ERROR HTTP ${response.status}**\n\n**URL:** ${webhookUrl}\n**Error:** ${data.message || 'Error desconocido'}\n\n**Estado del webhook:** No disponible\n\n**Contacto inmediato:**\n📞 Llámanos: +52 664 788 0797\n💬 WhatsApp: wa.me/5216647880797\n📧 Email: info@iamet.mx`;
        }
      } else {
        // Extract response message from successful response
        if (data.message) {
          responseContent = data.message;
        } else if (data.response) {
          responseContent = data.response;
        } else if (data.text) {
          responseContent = data.text;
        } else if (data.output) {
          responseContent = data.output;
        } else if (typeof data === 'string') {
          responseContent = data;
        } else {
          responseContent = 'Gracias por tu mensaje. ¿Podrías contarme más sobre tus necesidades específicas en automatización e identificación?\n\nPara una respuesta más rápida, contáctanos por WhatsApp: +52 664 788 0797';
        }
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: responseContent,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('Network error sending message:', error);
      
      // Remove loading message
      setMessages(prev => prev.filter(m => !m.isLoading));

      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: '🌐 Sin conexión al servidor.\n\n¡Pero puedo ayudarte de inmediato!\n\n📱 WhatsApp: +52 664 788 0797\n📞 Llamada directa: +52 664 788 0797\n📧 Email: info@iamet.mx\n\n¿Prefieres que te contactemos nosotros?',
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div 
      className={cn(
        'fixed bottom-4 right-4 z-50 flex flex-col items-end gap-4',
        className
      )}
    >
      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[500px] animate-slide-up bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-zebra-blue-600 to-zebra-blue-500 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Zara</h3>
                <p className="text-sm opacity-90">Especialista Zebra - IAMET</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleChat}
              className="p-2 h-8 w-8 text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions - only show when no conversation yet */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setInputValue('Necesito impresoras para mi línea de producción')}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs hover:bg-blue-100 transition-colors"
                >
                  🖨️ Impresoras
                </button>
                <button
                  onClick={() => setInputValue('Quiero cotizar escáneres de códigos de barras')}
                  className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs hover:bg-green-100 transition-colors"
                >
                  📱 Escáneres
                </button>
                <button
                  onClick={() => setInputValue('Información sobre tecnología RFID')}
                  className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs hover:bg-purple-100 transition-colors"
                >
                  📡 RFID
                </button>
                <button
                  onClick={() => window.open('https://wa.me/5216647880797?text=Hola, vengo del sitio web de IAMET y necesito información sobre soluciones Zebra', '_blank')}
                  className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs hover:bg-orange-100 transition-colors"
                >
                  💬 WhatsApp
                </button>
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zebra-blue-500 focus:border-zebra-blue-500"
                disabled={isLoading}
              />
              <Button
                variant="primary"
                size="sm"
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="px-3 py-2"
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
      )}

      {/* Floating Chat Button */}
      <div className="relative group">
        <Button
          variant="primary"
          size="lg"
          onClick={toggleChat}
          className={cn(
            'w-14 h-14 rounded-full shadow-lg p-0',
            'hover:scale-110 transition-transform duration-200',
            'relative overflow-hidden',
            isOpen && 'bg-zebra-gray-600/80 hover:bg-zebra-gray-500/80'
          )}
        >
          <div className="relative z-10">
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <MessageCircle className="w-6 h-6" />
            )}
          </div>
          
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-zebra-blue-600 to-zebra-blue-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
          
          {/* Pulse effect when closed */}
          {!isOpen && (
            <div className="absolute inset-0 bg-zebra-blue-500/30 rounded-full animate-ping" />
          )}
        </Button>

        {/* New message indicator */}
        {!isOpen && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-xs text-white font-bold">!</span>
          </div>
        )}

        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-zebra-gray-800/90 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
            Habla con Zara - Especialista Zebra
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-zebra-gray-800/90" />
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Message bubble component
 */
interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  return (
    <div className={cn(
      'flex gap-3',
      isUser ? 'justify-end' : 'justify-start'
    )}>
      {/* Avatar */}
      {isAssistant && (
        <div className="w-8 h-8 bg-zebra-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          {message.isLoading ? (
            <Loader2 className="w-4 h-4 text-zebra-blue-600 animate-spin" />
          ) : (
            <Bot className="w-4 h-4 text-zebra-blue-600" />
          )}
        </div>
      )}

      {/* Message content */}
      <div className={cn(
        'max-w-[80%] px-4 py-2 rounded-lg',
        isUser 
          ? 'bg-zebra-blue-600 text-white rounded-br-sm' 
          : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100',
        message.isLoading && 'animate-pulse'
      )}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
        
        {/* Timestamp */}
        {!message.isLoading && (
          <div className={cn(
            'text-xs mt-1 opacity-70',
            isUser ? 'text-white/70' : 'text-gray-500'
          )}>
            {message.timestamp.toLocaleTimeString('es-MX', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        )}
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-gray-600" />
        </div>
      )}
    </div>
  );
};

export default CustomN8nChat;