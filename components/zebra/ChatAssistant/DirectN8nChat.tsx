/**
 * Direct N8n Chat Integration - Simple and reliable approach
 */

'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface DirectN8nChatProps {
  className?: string;
}

const DirectN8nChat: React.FC<DirectN8nChatProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatMounted, setChatMounted] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    let chatInstance: any = null;

    const initializeChat = async () => {
      if (!isOpen || chatMounted) return;

      console.log('🔄 Initializing n8n chat...');

      try {
        // Ensure we have the container
        const container = document.getElementById('n8n-direct-chat');
        if (!container) {
          console.error('❌ Chat container not found');
          return;
        }

        // Clear any existing content
        container.innerHTML = '';

        // Import and create chat
        const { createChat } = await import('@n8n/chat');
        
        const config = {
          webhookUrl: 'https://riveddy7.app.n8n.cloud/webhook/53c136fe-3e77-4709-a143-fe82746dd8b6/chat',
          target: '#n8n-direct-chat',
          mode: 'fullscreen' as const,
          showWelcomeScreen: true,
          loadPreviousSession: false,
          initialMessages: [
            'Hola! Soy Zara de IAMET Tijuana 👋',
            '¿En qué puedo ayudarte con soluciones Zebra?'
          ],
        };

        console.log('⚙️ Creating chat with config:', config);
        
        chatInstance = await createChat(config);
        setChatMounted(true);
        
        console.log('✅ Chat initialized successfully');

      } catch (error) {
        console.error('❌ Error initializing chat:', error);
        setChatMounted(false);
      }
    };

    if (isOpen) {
      // Add a small delay to ensure DOM is ready
      const timer = setTimeout(initializeChat, 200);
      return () => clearTimeout(timer);
    } else {
      // Reset when closing
      setChatMounted(false);
    }

    return () => {
      if (chatInstance && typeof chatInstance.destroy === 'function') {
        chatInstance.destroy();
      }
    };
  }, [isOpen, chatMounted]);

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
          <div 
            id="n8n-direct-chat"
            className="w-full h-full"
            style={{ 
              minHeight: '500px',
              backgroundColor: '#f9fafb'
            }}
          />
          
          {/* Fallback content while loading */}
          {!chatMounted && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
              <div className="text-center p-6">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Conectando con Zara</h3>
                <p className="text-gray-600 text-sm">Tu especialista en soluciones Zebra...</p>
                
                {/* Manual fallback button */}
                <button
                  onClick={() => window.open('https://riveddy7.app.n8n.cloud/webhook/53c136fe-3e77-4709-a143-fe82746dd8b6/chat', '_blank')}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  Abrir chat en nueva ventana
                </button>
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

export default DirectN8nChat;