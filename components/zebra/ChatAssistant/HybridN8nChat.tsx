/**
 * Hybrid N8n Chat Integration - Widget + Iframe fallback
 */

'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, X, ExternalLink } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface HybridN8nChatProps {
  className?: string;
}

const HybridN8nChat: React.FC<HybridN8nChatProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [useIframe, setUseIframe] = useState(true); // Start with iframe for reliability
  const [isLoading, setIsLoading] = useState(false);

  const webhookUrl = 'https://riveddy7.app.n8n.cloud/webhook/53c136fe-3e77-4709-a143-fe82746dd8b6/chat';

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsLoading(true);
      // Set loading to false after a brief delay
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const openInNewWindow = () => {
    window.open(webhookUrl, '_blank', 'width=400,height=600,scrollbars=yes,resizable=yes');
  };

  const tryWidgetMode = async () => {
    setIsLoading(true);
    try {
      const { createChat } = await import('@n8n/chat');
      
      // Clear the container first
      const container = document.getElementById('n8n-hybrid-chat');
      if (container) {
        container.innerHTML = '';
      }

      await createChat({
        webhookUrl,
        target: '#n8n-hybrid-chat',
        mode: 'fullscreen' as const,
        showWelcomeScreen: true,
        initialMessages: ['¡Hola! Soy Zara de IAMET Tijuana 🦓'],
      });

      setUseIframe(false);
      console.log('✅ Widget mode activated');
    } catch (error) {
      console.error('❌ Widget failed, using iframe:', error);
      setUseIframe(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className={cn(
        'fixed bottom-4 right-4 z-50 flex flex-col items-end gap-4',
        className
      )}
    >
      {/* Chat container */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[500px] animate-slide-up bg-white rounded-lg shadow-2xl overflow-hidden relative">
          {/* Header with mode toggle */}
          <div className="bg-gradient-to-r from-zebra-blue-600 to-zebra-blue-500 text-white p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">Z</span>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Zara - IAMET</h3>
                <p className="text-xs opacity-80">Especialista Zebra</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={tryWidgetMode}
                disabled={isLoading}
                className="p-1 hover:bg-white/20 rounded text-xs disabled:opacity-50"
                title="Probar modo widget"
              >
                🔄
              </button>
              <button
                onClick={openInNewWindow}
                className="p-1 hover:bg-white/20 rounded"
                title="Abrir en nueva ventana"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat content */}
          <div className="h-[calc(100%-60px)] relative">
            {isLoading ? (
              <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-gray-600 text-sm">Cargando chat...</p>
                </div>
              </div>
            ) : useIframe ? (
              <iframe
                src={webhookUrl}
                className="w-full h-full border-0"
                title="Chat con Zara - Especialista Zebra"
                allow="microphone; camera"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  console.error('Iframe failed to load');
                  setIsLoading(false);
                }}
              />
            ) : (
              <div 
                id="n8n-hybrid-chat"
                className="w-full h-full"
              />
            )}

            {/* Fallback message */}
            {!isLoading && useIframe && (
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                  <p className="text-blue-800 text-sm mb-2">
                    ¿No se carga el chat?
                  </p>
                  <button
                    onClick={openInNewWindow}
                    className="text-blue-600 hover:text-blue-800 text-sm underline"
                  >
                    Abrir en nueva ventana
                  </button>
                </div>
              </div>
            )}
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

        {/* Notification badge */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
          <span className="text-xs text-white font-bold">!</span>
        </div>

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

export default HybridN8nChat;