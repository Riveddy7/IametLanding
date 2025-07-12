/**
 * Simple N8n Chat Integration for IAMET Zebra landing page
 * Direct implementation with iframe approach as fallback
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface SimpleN8nChatProps {
  className?: string;
}

/**
 * Simple N8n Chat component with built-in state management
 */
const SimpleN8nChat: React.FC<SimpleN8nChatProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatInitialized, setChatInitialized] = useState(false);
  const [useIframe, setUseIframe] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Initialize chat when first opened
    const initializeChat = async () => {
      if (chatInitialized || !isOpen || typeof window === 'undefined') return;

      console.log('Initializing n8n chat...');

      try {
        // First try the n8n chat widget
        const { createChat } = await import('@n8n/chat');
        
        const chatConfig = {
          webhookUrl: 'https://riveddy7.app.n8n.cloud/webhook/53c136fe-3e77-4709-a143-fe82746dd8b6/chat',
          target: '#n8n-chat-container',
          mode: 'window' as const,
          loadPreviousSession: false,
          showWelcomeScreen: true,
          initialMessages: [
            '¡Hola! Soy Zara, tu especialista en soluciones Zebra para IAMET en Tijuana.',
            '¿En qué industria trabajas y qué desafíos de identificación o automatización enfrentas?'
          ],
        };

        console.log('Creating chat with config:', chatConfig);
        
        await createChat(chatConfig);
        setChatInitialized(true);
        console.log('n8n chat initialized successfully');

      } catch (error) {
        console.error('Failed to initialize n8n chat widget:', error);
        console.log('Falling back to iframe implementation...');
        setUseIframe(true);
        setChatInitialized(true);
      }
    };

    if (isOpen) {
      // Small delay to ensure DOM is ready
      setTimeout(initializeChat, 100);
    }
  }, [isOpen, chatInitialized]);

  return (
    <div 
      className={cn(
        'fixed bottom-4 right-4 z-50 flex flex-col items-end gap-4',
        className
      )}
    >
      {/* Chat container */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[500px] animate-slide-up bg-white rounded-lg shadow-2xl overflow-hidden">
          {!useIframe ? (
            <div 
              id="n8n-chat-container"
              ref={chatContainerRef}
              className="w-full h-full"
            />
          ) : (
            <iframe
              src="https://riveddy7.app.n8n.cloud/webhook/53c136fe-3e77-4709-a143-fe82746dd8b6/chat"
              className="w-full h-full border-0"
              title="Chat con Zara - Especialista Zebra"
              allow="microphone; camera"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          )}
          
          {/* Loading state */}
          {!chatInitialized && (
            <div className="absolute inset-0 bg-white flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-zebra-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-gray-600 text-sm">Cargando chat...</p>
              </div>
            </div>
          )}
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

export default SimpleN8nChat;