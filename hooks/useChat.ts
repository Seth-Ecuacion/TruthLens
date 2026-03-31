'use client';

import { useState } from 'react';
import { Message } from '@/types';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e?: React.FormEvent, overridingInput?: string) => {
    if (e) e.preventDefault();
    const textToSend = overridingInput || input;
    if (!textToSend.trim() || isLoading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: textToSend }]);
    setIsLoading(true);
    let isStreamActive = false;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`Server Error (${response.status || 'Unknown'})`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let isFirstChunk = true;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        
        if (value) {
          isStreamActive = true;
          const chunkValue = decoder.decode(value, { stream: !done });

          if (isFirstChunk) {
            setIsLoading(false);
            setMessages((prev) => [...prev, { role: 'assistant', content: chunkValue }]);
            isFirstChunk = false;
          } else {
            setMessages((prev) => {
              const lastMessage = prev[prev.length - 1];
              const updatedMessages = prev.slice(0, -1);
              return [
                ...updatedMessages, 
                { ...lastMessage, content: lastMessage.content + chunkValue }
              ];
            });
          }
        }
      }
    } catch (error) { 
      console.error("Fetch error:", error);
      const errorMessage = error instanceof Error ? error.message : "Error connecting to the server.";
      setMessages((prev) => {
        if (isStreamActive) {
          const lastMessage = prev[prev.length - 1];
          const updatedMessages = prev.slice(0, -1);
          return [
            ...updatedMessages, 
            { ...lastMessage, content: lastMessage.content + `\n\n[Network error: ${errorMessage}]` }
          ];
        } else {
          return [...prev, { role: 'assistant', content: errorMessage }];
        }
      });
    } finally {
      if (!isStreamActive) {
        setIsLoading(false);
      }
    }
  };

  const clearChat = () => setMessages([]);

  return { messages, input, setInput, isLoading, sendMessage, clearChat };
}