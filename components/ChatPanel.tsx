'use client';

import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { Bot, Send, X, MessageSquare, Loader2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import ReactMarkdown from 'react-markdown'; // Added Markdown parser

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ChatPanelProps {
  isChatOpen: boolean;
  setIsChatOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ChatPanel({ isChatOpen, setIsChatOpen }: ChatPanelProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpen = () => setIsChatOpen(true);
    window.addEventListener('open-chatbot', handleOpen);
    return () => window.removeEventListener('open-chatbot', handleOpen);
  }, [setIsChatOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!res.body) throw new Error("No response body");

      // 1. Add an empty assistant message to the screen immediately
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      // 2. Read the stream chunk by chunk
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let assistantContent = '';

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value, { stream: true });
        assistantContent += chunkValue;

        // 3. Update the very last message in the array with the new text
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = assistantContent;
          return newMessages;
        });
      }
    } catch (err) {
      setMessages((prev) => [...prev, { 
        role: 'assistant', 
        content: '⚠️ Connection error. Please check your network or API limits.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#00C2CB] text-[#0D1B2A] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-[100]"
        aria-label="Toggle Chat"
      >
        {isChatOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] md:w-[400px] h-[500px] bg-[#0D1B2A] border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-[100] animate-in fade-in slide-in-from-bottom-4">
          
          <div className="p-5 border-b border-slate-800 bg-slate-900/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#00C2CB]/20 flex items-center justify-center text-[#00C2CB]">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">TruthLens Assistant</h3>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">RAG Educational Prototype</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 [scrollbar-width:none]">
            {messages.length === 0 && (
              <div className="text-center mt-10">
                <p className="text-slate-500 text-xs italic px-4">
                  Ask about deepfakes, "The Liar's Dividend", or specific verified cases from our database.
                </p>
              </div>
            )}
            
            {messages.map((m, i) => (
              <div key={i} className={cn("flex w-full", m.role === 'user' ? "justify-end" : "justify-start")}>
                <div className={cn(
                  "max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed",
                  m.role === 'user' 
                    ? "bg-[#00C2CB] text-[#0D1B2A] font-medium rounded-tr-none" 
                    : "bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700 shadow-sm"
                )}>
                  {/* Markdown Renderer replacing raw text */}
                  {m.role === 'assistant' ? (
                    <ReactMarkdown
                      components={{
                        p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-2" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal ml-4 mb-2" {...props} />,
                        li: ({node, ...props}) => <li className="mb-1" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-bold text-[#00C2CB]" {...props} />
                      }}
                    >
                      {m.content}
                    </ReactMarkdown>
                  ) : (
                    m.content
                  )}
                </div>
              </div>
            ))}
            
            {/* Kept the loading spinner just in case the stream takes a second to start */}
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex justify-start">
                <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-700">
                  <Loader2 size={16} className="text-[#00C2CB] animate-spin" />
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-4 bg-slate-900/50 border-t border-slate-800 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your query..."
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#00C2CB] transition-colors"
            />
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-10 h-10 bg-[#00C2CB] rounded-xl flex items-center justify-center text-[#0D1B2A] hover:bg-[#00a8b0] disabled:opacity-50 transition-colors shadow-lg"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}