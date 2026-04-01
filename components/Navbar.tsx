'use client';

// No props needed anymore, making this much more stable!
export default function Navbar() {
  
  const handleOpenChat = () => {
    // This sends a signal that ChatPanel is listening for
    window.dispatchEvent(new CustomEvent('open-chatbot'));
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Section */}
        <div className="flex items-center gap-3">
          {/* Updated to TruthLens Navy */}
          <div className="w-8 h-8 bg-[#0D1B2A] rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
            TL
          </div>
          <span className="text-xl font-bold tracking-tight text-[#0D1B2A]">TruthLens</span>
          <span className="hidden sm:inline-block px-2 py-1 bg-slate-100 text-slate-500 text-xs font-semibold rounded-md ml-2">
            v1.0
          </span>
        </div>
        
        {/* The Action Button */}
        <button
          onClick={handleOpenChat}
          // Updated to TruthLens Teal
          className="flex items-center gap-2 px-5 py-2.5 bg-[#00C2CB] hover:bg-[#00a8b0] text-[#0D1B2A] text-sm font-bold rounded-full transition-all shadow-sm hover:shadow-md active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Ask AI Guide
        </button>
      </div>
    </nav>
  );
}