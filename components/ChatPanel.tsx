'use client';

import { useRef, useEffect } from 'react';
import { useChat } from '@/hooks/useChat';

type ChatPanelProps = {
  isChatOpen: boolean;
  setIsChatOpen: (isOpen: boolean) => void;
};

const suggestions = [
  "What exactly is a deepfake?",
  "How can I spot manipulated media?",
  "What tools can I use to verify images?"
];

export default function ChatPanel({ isChatOpen, setIsChatOpen }: ChatPanelProps) {
  const { messages, input, setInput, isLoading, sendMessage, clearChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isChatOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isChatOpen]);

  return (
    <>
      {isChatOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsChatOpen(false)}
        />
      )}

      <div className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out border-l border-slate-200 ${
        isChatOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        <div className="bg-white p-4 flex items-center justify-between border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <h2 className="font-bold text-slate-800">TruthLens Guide</h2>
          </div>
          <div className="flex items-center gap-1">
            {messages.length > 0 && (
              <button onClick={clearChat} className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded-md hover:bg-slate-100 transition-colors">
                Clear
              </button>
            )}
            <button onClick={() => setIsChatOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-slate-50/50">
          {messages.length === 0 ? (
            <div className="flex flex-col h-full justify-center px-2 pb-10">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-sm border border-blue-200">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">How can I help?</h3>
              <p className="text-sm text-slate-500 mb-6">I'm your AI guide for this module. Ask me questions about the material or how to verify information online.</p>
              
              <div className="space-y-2 w-full">
                {suggestions.map((s) => (
                  <button key={s} onClick={() => { setInput(s); sendMessage(undefined, s); }} className="w-full text-left text-sm px-4 py-3 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50 text-slate-700 shadow-sm transition-all">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap leading-relaxed ${
                    msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none shadow-sm' : 'bg-white text-slate-800 rounded-bl-none shadow-sm border border-slate-100'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))
          )}
          
          {isLoading && messages[messages.length - 1]?.role === 'user' && (
             <div className="flex justify-start">
               <div className="max-w-[85%] rounded-2xl px-4 py-3 bg-white text-slate-500 rounded-bl-none shadow-sm border border-slate-100 flex items-center gap-1.5 h-11">
                 <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                 <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                 <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-white border-t border-slate-100 flex-shrink-0">
          <form onSubmit={sendMessage} className="flex gap-2 relative">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a question..." className="flex-1 pl-4 pr-12 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm text-slate-900 bg-slate-50 transition-all shadow-sm" disabled={isLoading} />
            <button type="submit" disabled={isLoading || !input.trim()} className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
              <svg className="w-4 h-4 translate-x-[1px] translate-y-[1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </form>
          <div className="text-center mt-3">
            <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">AI can make mistakes. Verify important info.</span>
          </div>
        </div>

      </div>
    </>
  );
}