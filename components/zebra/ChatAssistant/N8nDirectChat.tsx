/**
 * N8n Direct Chat - Conecta directamente al webhook de n8n
 * Diseño acorde a la estética glassmorphism de la landing page
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, MessageCircle, X, Loader2, Zap } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isLoading?: boolean;
  hasCTA?: boolean;
  ctaType?: 'whatsapp' | 'calendly' | 'both';
  processedContent?: string;
}

interface N8nDirectChatProps {
  className?: string;
}

const N8nDirectChat: React.FC<N8nDirectChatProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `iamet-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // URL del webhook de n8n (DIRECTA - SIN FUNCIONALIDAD LOCAL)
  const n8nWebhookUrl = 'https://riveddy7.app.n8n.cloud/webhook/5a6d3896-65ca-4b5e-ab47-2be3e7b7af63';

  /**
   * Procesa la respuesta de n8n y extrae CTAs
   */
  const processN8nResponse = (rawResponse: string): { content: string; hasCTA: boolean; ctaType?: 'whatsapp' | 'calendly' | 'both' } => {
    try {
      console.log('🔍 PROCESANDO RESPUESTA N8N:', rawResponse);

      // Parsear el array de respuesta de n8n
      const responseArray = JSON.parse(rawResponse);
      if (!Array.isArray(responseArray) || responseArray.length === 0) {
        return { content: rawResponse, hasCTA: false };
      }

      // Obtener el primer output
      const firstOutput = responseArray[0]?.output;
      if (!firstOutput) {
        return { content: rawResponse, hasCTA: false };
      }

      console.log('📄 FIRST OUTPUT:', firstOutput);

      // Intentar parsear diferentes formatos
      let parsedData;
      
      // Si viene como JSON directo
      try {
        parsedData = JSON.parse(firstOutput);
      } catch {
        // Si viene como string con JSON interno o markdown
        if (firstOutput.includes('```json')) {
          // Extraer JSON de markdown
          const jsonMatch = firstOutput.match(/```json\n([\s\S]*?)\n```/);
          if (jsonMatch) {
            parsedData = JSON.parse(jsonMatch[1]);
          }
        } else {
          return { content: firstOutput, hasCTA: false };
        }
      }

      console.log('📋 DATOS PARSEADOS:', parsedData);

      // Manejar formato simple con response/has_cta
      if (parsedData.response) {
        let { response, has_cta } = parsedData;
        let ctaType: 'whatsapp' | 'calendly' | 'both' | undefined;
        let cleanContent = response;

        if (has_cta && typeof response === 'string') {
          if (response.includes('[CTA_WP]') || response.includes('[CTA_WA]')) {
            ctaType = 'whatsapp';
            cleanContent = response.replace(/\[CTA_WP\]|\[CTA_WA\]/g, '').trim();
          } else if (response.includes('[CTA_CLD]') || response.includes('[CTA_CALENDLY]')) {
            ctaType = 'calendly';
            cleanContent = response.replace(/\[CTA_CLD\]|\[CTA_CALENDLY\]/g, '').trim();
          }
        }

        return {
          content: cleanContent,
          hasCTA: has_cta && !!ctaType,
          ctaType
        };
      }

      // Manejar formato de array con text/cta/botones
      if (Array.isArray(parsedData)) {
        let fullContent = '';
        let hasCTA = false;
        let ctaType: 'whatsapp' | 'calendly' | 'both' | undefined;

        parsedData.forEach((item) => {
          if (item.text) {
            fullContent += item.text + ' ';
          }
          
          if (item.cta && item.botones) {
            hasCTA = true;
            const hasWhatsApp = item.botones.includes('[CTA_WP]') || item.botones.includes('[CTA_WA]');
            const hasCalendly = item.botones.includes('[CTA_CLD]') || item.botones.includes('[CTA_CALENDLY]');
            
            if (hasWhatsApp && hasCalendly) {
              ctaType = 'both';
            } else if (hasWhatsApp) {
              ctaType = 'whatsapp';
            } else if (hasCalendly) {
              ctaType = 'calendly';
            }
          }
        });

        return {
          content: fullContent.trim(),
          hasCTA: hasCTA && !!ctaType,
          ctaType
        };
      }

      // Fallback
      return { content: rawResponse, hasCTA: false };

    } catch (error) {
      console.error('❌ ERROR PROCESANDO RESPUESTA N8N:', error);
      return { content: rawResponse, hasCTA: false };
    }
  };

  /**
   * Abre WhatsApp con mensaje predefinido
   */
  const openWhatsApp = (context?: string) => {
    const phone = '5216647880797';
    const baseMessage = 'Hola, vengo del sitio web de IAMET y me interesa información sobre soluciones Zebra';
    const message = context ? `${baseMessage}. ${context}` : baseMessage;
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  /**
   * Abre Calendly para agendar reunión
   */
  const openCalendly = () => {
    const calendlyUrl = 'https://calendly.com/eduardo-rivera-baja-net/30min';
    window.open(calendlyUrl, '_blank');
  };

  // Mensaje de bienvenida
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome-n8n',
        content: '¡Hola! Soy Zara 🦓, tu especialista en soluciones Zebra para IAMET en Tijuana.\n\n¿En qué puedo ayudarte hoy?',
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // FUNCIÓN PRINCIPAL: Enviar mensaje DIRECTAMENTE a n8n
  const sendMessageToN8n = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    // Agregar mensaje del usuario
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Mostrar indicador de carga
    const loadingMessage: Message = {
      id: `loading-${Date.now()}`,
      content: 'Zara está escribiendo...',
      role: 'assistant',
      timestamp: new Date(),
      isLoading: true,
    };
    setMessages(prev => [...prev, loadingMessage]);

    try {
      console.log('🚀 ENVIANDO DIRECTAMENTE A N8N:', n8nWebhookUrl);
      
      // LLAMADA DIRECTA AL WEBHOOK DE N8N
      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          sessionId: sessionId,
          timestamp: new Date().toISOString(),
          source: 'IAMET-Zebra-Chat',
        }),
      });

      // Remover mensaje de carga
      setMessages(prev => prev.filter(m => !m.isLoading));

      console.log('📨 RESPUESTA DE N8N:', {
        status: response.status,
        ok: response.ok,
        url: n8nWebhookUrl
      });

      let responseContent = '';

      if (response.ok) {
        // Obtener respuesta de n8n
        const responseText = await response.text();
        console.log('📄 CONTENIDO N8N RAW:', responseText);

        if (responseText) {
          // Procesar la respuesta usando nuestra función
          const processedResponse = processN8nResponse(responseText);
          
          const assistantMessage: Message = {
            id: `assistant-${Date.now()}`,
            content: processedResponse.content,
            role: 'assistant',
            timestamp: new Date(),
            hasCTA: processedResponse.hasCTA,
            ctaType: processedResponse.ctaType,
          };

          setMessages(prev => [...prev, assistantMessage]);
        } else {
          // Respuesta vacía
          const fallbackMessage: Message = {
            id: `assistant-${Date.now()}`,
            content: 'Recibí tu mensaje. ¿Podrías darme más detalles sobre tus necesidades específicas?',
            role: 'assistant',
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, fallbackMessage]);
        }
      } else {
        // Error de n8n
        const errorText = await response.text();
        console.error('❌ ERROR N8N:', errorText);
        
        const errorMessage: Message = {
          id: `assistant-${Date.now()}`,
          content: `Disculpa, tengo problemas técnicos momentáneos.\n\n📱 Contáctanos directamente:\nWhatsApp: +52 664 788 0797\nEmail: info@iamet.mx`,
          role: 'assistant',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
      }

    } catch (error) {
      console.error('🌐 ERROR DE CONEXIÓN:', error);
      
      setMessages(prev => prev.filter(m => !m.isLoading));

      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: 'Sin conexión al servidor.\n\n📱 Contáctanos:\nWhatsApp: +52 664 788 0797\nLlamada: +52 664 788 0797\nEmail: info@iamet.mx',
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
      sendMessageToN8n();
    }
  };

  return (
    <div 
      className={cn(
        'fixed bottom-4 right-4 z-50 flex flex-col items-end gap-4',
        className
      )}
    >
      {/* Chat Window con estética glassmorphism */}
      {isOpen && (
        <Card 
          variant="glassmorphism" 
          className="w-80 sm:w-96 h-[600px] animate-slide-up shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header glassmorphism */}
          <div className="relative p-4 border-b border-white/10">
            {/* Decoración de fondo */}
            <div className="absolute inset-0 bg-gradient-to-r from-zebra-blue-600/20 to-zebra-blue-500/10 backdrop-blur-md" />
            
            {/* Contenido del header */}
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-zebra-blue-600/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <Bot className="w-6 h-6 text-zebra-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">Zara</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <p className="text-sm text-white/80">Especialista Zebra - IAMET</p>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleChat}
                className="p-2 h-8 w-8 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Decoración flotante */}
            <div className="absolute top-2 right-20 w-4 h-4 bg-zebra-blue-500/30 rounded-full blur-sm animate-pulse" />
          </div>

          {/* Messages con scroll personalizado */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map((message) => (
              <MessageBubbleGlass 
                key={message.id} 
                message={message}
                onWhatsAppClick={openWhatsApp}
                onCalendlyClick={openCalendly}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Botones de acción rápida */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                <QuickActionButton
                  icon="🖨️"
                  label="Impresoras"
                  onClick={() => setInputValue('Necesito cotizar impresoras Zebra para mi línea de producción')}
                />
                <QuickActionButton
                  icon="📱"
                  label="Escáneres"
                  onClick={() => setInputValue('Quiero información sobre escáneres de códigos de barras')}
                />
                <QuickActionButton
                  icon="📡"
                  label="RFID"
                  onClick={() => setInputValue('Necesito implementar tecnología RFID en mi empresa')}
                />
              </div>
            </div>
          )}

          {/* Input glassmorphism */}
          <div className="relative p-4 border-t border-white/10">
            {/* Fondo glassmorphism */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-md" />
            
            {/* Input container */}
            <div className="relative flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-zebra-blue-500/50 focus:border-zebra-blue-500/50 backdrop-blur-sm"
                disabled={isLoading}
              />
              <Button
                variant="primary"
                size="sm"
                onClick={sendMessageToN8n}
                disabled={!inputValue.trim() || isLoading}
                className="px-4 py-3 rounded-xl"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Floating Chat Button con efectos glassmorphism */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-zebra-blue-600 to-zebra-blue-500 rounded-full opacity-20 blur-xl animate-pulse-slow" />
        
        <Button
          variant="primary"
          size="lg"
          onClick={toggleChat}
          className={cn(
            'relative w-16 h-16 rounded-full shadow-2xl p-0',
            'hover:scale-110 transition-all duration-300',
            'border border-white/20 backdrop-blur-sm',
            'bg-gradient-to-r from-zebra-blue-600/90 to-zebra-blue-500/90',
            isOpen && 'bg-zebra-gray-600/80 hover:bg-zebra-gray-500/80'
          )}
        >
          <div className="relative z-10">
            {isOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <MessageCircle className="w-7 h-7" />
            )}
          </div>
        </Button>

        {/* Pulse indicator */}
        {!isOpen && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce border-2 border-white/20 backdrop-blur-sm">
            <Zap className="w-3 h-3 text-white" />
          </div>
        )}

        {/* Tooltip glassmorphism */}
        {!isOpen && (
          <div className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-black/80 backdrop-blur-md text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20">
            💬 Habla con Zara - Especialista Zebra
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Message bubble con efecto glassmorphism y CTAs estilo iMessage
 */
interface MessageBubbleGlassProps {
  message: Message;
  onWhatsAppClick?: (context?: string) => void;
  onCalendlyClick?: () => void;
}

const MessageBubbleGlass: React.FC<MessageBubbleGlassProps> = ({ 
  message, 
  onWhatsAppClick, 
  onCalendlyClick 
}) => {
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  return (
    <div className={cn(
      'flex gap-3',
      isUser ? 'justify-end' : 'justify-start'
    )}>
      {/* Avatar */}
      {isAssistant && (
        <div className="w-8 h-8 bg-zebra-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-sm border border-white/20">
          {message.isLoading ? (
            <Loader2 className="w-4 h-4 text-zebra-blue-400 animate-spin" />
          ) : (
            <Bot className="w-4 h-4 text-zebra-blue-400" />
          )}
        </div>
      )}

      {/* Message content container */}
      <div className="max-w-[80%] space-y-2">
        {/* Message bubble */}
        <div className={cn(
          'px-4 py-3 rounded-2xl backdrop-blur-md border',
          isUser 
            ? 'bg-gradient-to-r from-zebra-blue-600/80 to-zebra-blue-500/80 text-white border-white/20 rounded-br-md' 
            : 'bg-white/10 text-white border-white/20 rounded-bl-md',
          message.isLoading && 'animate-pulse'
        )}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
          
          {/* Timestamp */}
          {!message.isLoading && (
            <div className={cn(
              'text-xs mt-2 opacity-70',
              isUser ? 'text-white/70' : 'text-white/50'
            )}>
              {message.timestamp.toLocaleTimeString('es-MX', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          )}
        </div>

        {/* CTA Buttons - Estilo iMessage */}
        {message.hasCTA && !message.isLoading && (
          <div className="space-y-2">
            {(message.ctaType === 'whatsapp' || message.ctaType === 'both') && (
              <button
                onClick={() => onWhatsAppClick?.(message.content)}
                className="group w-full px-4 py-3 bg-green-500/90 hover:bg-green-500 rounded-2xl backdrop-blur-md border border-green-400/30 transition-all duration-200 flex items-center justify-center gap-2 text-white font-medium text-sm shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-xs">💬</span>
                </div>
                Continuar por WhatsApp
                <div className="opacity-60 group-hover:opacity-100 transition-opacity">
                  →
                </div>
              </button>
            )}

            {(message.ctaType === 'calendly' || message.ctaType === 'both') && (
              <button
                onClick={() => onCalendlyClick?.()}
                className="group w-full px-4 py-3 bg-blue-500/90 hover:bg-blue-500 rounded-2xl backdrop-blur-md border border-blue-400/30 transition-all duration-200 flex items-center justify-center gap-2 text-white font-medium text-sm shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-xs">📅</span>
                </div>
                Agendar Reunión
                <div className="opacity-60 group-hover:opacity-100 transition-opacity">
                  →
                </div>
              </button>
            )}
          </div>
        )}
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-sm border border-white/20">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
};

/**
 * Botón de acción rápida
 */
interface QuickActionButtonProps {
  icon: string;
  label: string;
  onClick: () => void;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs text-white/90 hover:bg-white/20 transition-all duration-200 flex items-center gap-2"
  >
    <span>{icon}</span>
    <span>{label}</span>
  </button>
);

export default N8nDirectChat;