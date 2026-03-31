'use client';

type NavbarProps = {
  setIsChatOpen: (isOpen: boolean) => void;
};

export default function Navbar({ setIsChatOpen }: NavbarProps) {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">TL</div>
          <span className="text-xl font-bold tracking-tight text-slate-800">TruthLens</span>
          <span className="hidden sm:inline-block px-2 py-1 bg-slate-100 text-slate-500 text-xs font-semibold rounded-md ml-2">v1.0</span>
        </div>
        
        <button
          onClick={() => setIsChatOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full transition-all shadow-sm hover:shadow-md"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          Ask AI Guide
        </button>
      </div>
    </nav>
  );
}