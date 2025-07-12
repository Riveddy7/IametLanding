/**
 * ChatAssistant component for IAMET Zebra landing page
 * Floating chat button and chat window integration
 */

'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Bot, Minimize2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ChatWindow from './ChatWindow';
import { cn } from '@/lib/utils';
import { ChatAssistantProps } from '@/types/zebra';

const ChatAssistant: React.FC<ChatAssistantProps> = ({
  isOpen: controlledIsOpen,
  onToggle,
  initialMessage = '¡Hola! Soy Zara, tu especialista en soluciones Zebra. ¿En qué puedo ayudarte hoy?'
}) => {
  const [isOpen, setIsOpen] = useState(controlledIsOpen || false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle controlled vs uncontrolled state
  const chatIsOpen = controlledIsOpen !== undefined ? controlledIsOpen : isOpen;
  
  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setIsOpen(!isOpen);
    }
    setHasNewMessage(false);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    setTimeout(() => setIsMinimized(false), 200);
  };

  // Auto-show after some time (for demo purposes)
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasNewMessage(true);
    }, 10000); // Show notification after 10 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      id="chat-assistant"
      className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-4"
    >
      {/* Chat Window */}
      {chatIsOpen && !isMinimized && (
        <Card 
          variant="glassmorphism" 
          className={cn(
            'w-80 sm:w-96 h-[500px] flex flex-col shadow-2xl',
            'animate-slide-up',
            isAnimating && 'animate-fade-in'
          )}
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-zebra-blue-600/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-zebra-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Zara</h3>
                <p className="text-xs text-white/60">Especialista en Zebra</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMinimize}
                className="p-2 h-8 w-8"
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggle}
                className="p-2 h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Chat Content */}
          <div className="flex-1 overflow-hidden">
            <ChatWindow 
              initialMessage={initialMessage}
              onNewMessage={() => setHasNewMessage(true)}
            />
          </div>
        </Card>
      )}

      {/* Floating Chat Button */}
      <div className="relative">
        <Button
          variant="primary"
          size="lg"
          onClick={handleToggle}
          className={cn(
            'w-14 h-14 rounded-full shadow-lg p-0',
            'hover:scale-110 transition-transform duration-200',
            'group relative overflow-hidden',
            chatIsOpen && 'bg-zebra-gray-600/80 hover:bg-zebra-gray-500/80'
          )}
        >
          <div className="relative z-10">
            {chatIsOpen ? (
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

        {/* Notification badge */}
        {hasNewMessage && !chatIsOpen && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
            <span className="text-xs text-white font-bold">1</span>
          </div>
        )}

        {/* Tooltip */}
        {!chatIsOpen && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-zebra-gray-800/90 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
            Habla con Zara - Especialista Zebra
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-zebra-gray-800/90" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatAssistant;