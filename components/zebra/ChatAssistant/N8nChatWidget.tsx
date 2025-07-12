/**
 * N8n Chat Widget Integration for IAMET Zebra landing page
 * Replaces the custom chat implementation with n8n chat widget
 */

'use client';

import React, { useEffect, useRef } from 'react';
import { MessageCircle, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { n8nChatConfig } from '@/lib/n8n-chat';

// Import n8n chat styles
import '@n8n/chat/style.css';

interface N8nChatWidgetProps {
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

/**
 * N8n Chat Widget component that integrates with the n8n webhook
 */
const N8nChatWidget: React.FC<N8nChatWidgetProps> = ({
  isOpen = false,
  onToggle,
  className
}) => {
  const chatInitialized = useRef(false);
  const chatContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    const initializeChat = async () => {
      if (chatInitialized.current || typeof window === 'undefined') return;

      try {
        const { createChat } = await import('@n8n/chat');
        
        createChat({
          ...n8nChatConfig,
          target: '#n8n-chat-container',
          mode: 'window',
        });

        chatInitialized.current = true;
      } catch (error) {
        console.error('Failed to initialize n8n chat:', error);
      }
    };

    if (isOpen) {
      initializeChat();
    }
  }, [isOpen]);

  return (
    <div 
      className={cn(
        'fixed bottom-4 right-4 z-50 flex flex-col items-end gap-4',
        className
      )}
    >
      {/* Chat container - only show when open */}
      {isOpen && (
        <div 
          id="n8n-chat-container"
          ref={chatContainer}
          className="w-80 sm:w-96 h-[500px] animate-slide-up"
        />
      )}

      {/* Floating Chat Button */}
      <div className="relative">
        <Button
          variant="primary"
          size="lg"
          onClick={onToggle}
          className={cn(
            'w-14 h-14 rounded-full shadow-lg p-0',
            'hover:scale-110 transition-transform duration-200',
            'group relative overflow-hidden',
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
          
          {/* Pulse effect */}
          <div className="absolute inset-0 bg-zebra-blue-500/30 rounded-full animate-ping" />
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

export default N8nChatWidget;