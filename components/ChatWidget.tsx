"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot } from 'lucide-react';
import { useTranslation } from '@/lib/translationContext';
import Link from 'next/link';

// Hook to manage chat widget state
export function useChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);

  return { isOpen, openChat, closeChat };
}

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatWidget({ isOpen, onClose }: ChatWidgetProps) {
  const { t, language } = useTranslation();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Helper function to get translation with fallback
  const getTranslation = (key: string, fallback: string) => {
    const translated = t(key as any);
    return translated === key ? fallback : translated;
  };

  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean, timestamp: number}>>([
    {
      text: getTranslation('chatGreeting', "Hello! How can I help you with your shopping today?"),
      isUser: false,
      timestamp: Date.now()
    }
  ]);

  // Update initial message when language changes
  useEffect(() => {
    setMessages(prev => {
      const newMessages = [...prev];
      if (newMessages.length > 0 && !newMessages[0].isUser) {
        newMessages[0] = {
          ...newMessages[0],
          text: getTranslation('chatGreeting', "Hello! How can I help you with your shopping today?")
        };
      }
      return newMessages;
    });
  }, [language]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessageText = message;

    // Add user message
    const userMessage = {
      text: userMessageText,
      isUser: true,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    try {
      // Call AI API
      const response = await fetch('/api/chat/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessageText,
          language: language,
          context: 'fashion_ecommerce'
        })
      });

      const data = await response.json();

      const botResponse = {
        text: data.response || getTranslation('chatResponse', "Thank you for your message! Our customer service team will get back to you soon."),
        isUser: false,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Chat API error:', error);

      // Fallback response
      const botResponse = {
        text: getTranslation('chatResponse', "Thank you for your message! Our customer service team will get back to you soon. In the meantime, feel free to browse our products."),
        isUser: false,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, botResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Function to parse and render text with links
  const renderMessageWithLinks = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      // Add text before the link
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      // Add the link
      const linkText = match[1];
      const linkUrl = match[2];
      parts.push(
        <Link
          key={match.index}
          href={linkUrl}
          className="text-zinc-700 dark:text-white hover:text-zinc-800 dark:hover:text-gray-200 underline"
          onClick={() => onClose()} // Close chat when clicking link
        >
          {linkText}
        </Link>
      );

      lastIndex = linkRegex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };


  return (
    <div key={`chat-widget-${language}`}>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-32 right-6 w-80 h-96 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden`}
          >
            {/* Header */}
            <div className="bg-zinc-700 dark:bg-white text-white dark:text-zinc-700 p-4 rounded-t-3xl flex items-center justify-between relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-zinc-800 dark:bg-gray-200 backdrop-blur-sm rounded-full flex items-center justify-center ring-2 ring-zinc-600 dark:ring-gray-400">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base">
                    {getTranslation('liveSupport', 'Live Support')}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-xs opacity-90">
                      {getTranslation('online', 'Online')}
                    </p>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onClose()}
                className="hover:bg-zinc-800 dark:hover:bg-gray-200 rounded-full p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.isUser
                        ? 'bg-zinc-700 dark:bg-white text-white dark:text-zinc-700'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    {msg.isUser ? msg.text : renderMessageWithLinks(msg.text)}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-zinc-500 dark:bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-zinc-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-zinc-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={getTranslation('typeMessage', 'Type your message...')}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-white bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="bg-zinc-700 dark:bg-white hover:bg-zinc-800 dark:hover:bg-gray-100 disabled:bg-gray-400 text-white dark:text-zinc-700 p-2 rounded-lg transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}