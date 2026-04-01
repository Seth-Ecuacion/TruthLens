'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import ChatPanel from '@/components/ChatPanel';

export default function InteractiveLayout({ children }: { children: React.ReactNode }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const pathname = usePathname();

  useEffect(() => {
    const handleOpenChat = () => setIsChatOpen(true);
    window.addEventListener('open-chatbot', handleOpenChat);
    return () => window.removeEventListener('open-chatbot', handleOpenChat);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/issue', label: 'The Issue' },
    { path: '/prototype', label: 'The Prototype' },
    { path: '/ethics', label: 'Ethics' },
    { path: '/conclusion', label: 'Conclusion' },
  ];

  return (
    <div className="min-h-screen flex flex-col relative bg-slate-50">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#00C2CB] origin-left z-50" style={{ scaleX }} />
      
      {/* Navbar */}
      <nav className="sticky top-0 z-40 w-full bg-[#0D1B2A] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 flex items-center justify-center text-[#00C2CB]">
               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
            <span className="text-2xl font-serif font-bold text-white tracking-tight group-hover:text-[#00C2CB] transition-colors">
              TruthLens
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path} className={`text-sm font-medium transition-colors ${pathname === link.path ? 'text-[#00C2CB]' : 'text-slate-300 hover:text-white'}`}>
                {link.label}
              </Link>
            ))}
            <button onClick={() => setIsChatOpen(true)} className="bg-[#00C2CB] hover:bg-[#00a8b0] text-[#0D1B2A] font-semibold px-6 py-2.5 rounded-full text-sm transition-all transform hover:scale-105">
              Try the Chatbot
            </button>
          </div>

          <button className="md:hidden text-white hover:text-[#00C2CB] transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden bg-[#0D1B2A] border-b border-white/10 overflow-hidden">
              <div className="flex flex-col px-6 py-4 gap-4 pb-6">
                {navLinks.map((link) => (
                  <Link key={link.path} href={link.path} onClick={() => setIsMobileMenuOpen(false)} className={`text-sm font-medium ${pathname === link.path ? 'text-[#00C2CB]' : 'text-slate-300 hover:text-white'}`}>
                    {link.label}
                  </Link>
                ))}
                <button onClick={() => { setIsChatOpen(true); setIsMobileMenuOpen(false); }} className="bg-[#00C2CB] text-[#0D1B2A] font-semibold px-5 py-3 rounded-xl text-sm w-full mt-2">
                  Try the Chatbot
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer - Updated Background Color and Added Image */}
      <footer className="bg-[#0D1B2A] text-white pt-20 pb-16 mt-20 border-t border-white/5 relative overflow-hidden">
        
        {/* Abstract Glowing Lens Image (Positioned Right) */}
        <div 
          className="absolute right-0 bottom-0 w-[500px] h-[500px] opacity-20 pointer-events-none translate-x-1/4 translate-y-1/4"
          style={{ WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)' }}
        >
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Cyber Lens" 
            className="w-full h-full object-cover mix-blend-screen" 
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 flex items-center justify-center text-[#00C2CB]">
                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              </div>
              <span className="text-2xl font-serif font-bold text-white tracking-tight">TruthLens</span>
            </div>
            <p className="text-slate-400 text-sm mb-8 max-w-sm leading-relaxed">
              "See Through the Noise." Combating misinformation and deepfakes in the Philippine context.
            </p>
            <p className="text-[#00C2CB] text-xs font-bold tracking-widest uppercase">
              Built for the Filipino Digital Citizen
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6">Explore</h4>
            <ul className="space-y-4">
              {navLinks.slice(1).map(link => (
                <li key={link.path}>
                  <Link href={link.path} className="text-slate-400 hover:text-[#00C2CB] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><a href="https://verafiles.org/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#00C2CB] text-sm transition-colors">VERA Files Fact Check</a></li>
              <li><a href="https://www.rappler.com/newsbreak/fact-check/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#00C2CB] text-sm transition-colors">Rappler Fact Check</a></li>
            </ul>
          </div>
        </div>
      </footer>

      <ChatPanel isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
    </div>
  );
}