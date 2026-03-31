'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import TableOfContents from '@/components/TableOfContents';
import ChatPanel from '@/components/ChatPanel';

export default function InteractiveLayout({ children }: { children: React.ReactNode }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200">
      <Navbar setIsChatOpen={setIsChatOpen} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12 items-start">
        <TableOfContents />
        {children}
      </main>

      <ChatPanel isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
    </div>
  );
}