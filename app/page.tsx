'use client';

import FadeIn from '@/components/FadeIn';
import AnimatedCounter from '@/components/AnimatedCounter';
import { AlertTriangle, ArrowRight, Bot, ShieldCheck, FileText, Database } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const openChatbot = () => window.dispatchEvent(new CustomEvent('open-chatbot'));

  return (
    <div className="bg-[#0D1B2A] min-h-screen">
      
      {/* HERO SECTION */}
      <section className="pt-24 pb-32 px-6 relative overflow-hidden">
        {/* Subtle Geometric Background Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-[15%] left-[20%] w-32 h-16 bg-[#162537] rounded-sm transform -rotate-12"></div>
          <div className="absolute top-[25%] right-[25%] w-40 h-24 bg-[#162537] rounded-sm transform rotate-6"></div>
          <div className="absolute bottom-[20%] left-[30%] w-48 h-32 bg-[#162537] rounded-sm transform rotate-12"></div>
          <div className="absolute top-[45%] left-[10%] w-24 h-24 bg-[#162537] rounded-sm transform -rotate-6"></div>
          <div className="absolute top-[60%] right-[20%] w-32 h-32 bg-[#162537] rounded-sm transform rotate-3"></div>
          <div className="absolute top-[10%] right-[40%] w-20 h-12 bg-[#162537] rounded-sm"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs font-semibold tracking-wide mb-8">
              <AlertTriangle size={14} /> Alert: Imposter Scams Rising
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-6xl md:text-7xl lg:text-[88px] font-serif text-white font-bold leading-[1.05] tracking-tight mb-8 max-w-4xl text-balance">
              The Philippines is <br/>
              Ground Zero for <br/>
              <span className="text-[#00C2CB]">Misinformation.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-12 leading-relaxed font-sans">
              We are combatting the surge of deepfakes and AI-generated deception targeting Filipino voters and digital citizens. Equip yourself with the lens of truth.
            </p>
          </FadeIn>

          <FadeIn delay={0.3} className="flex flex-wrap items-center gap-4">
            <Link href="/issue" className="bg-white hover:bg-slate-100 text-[#0D1B2A] font-bold px-8 py-4 rounded-lg flex items-center gap-2 transition-colors text-sm">
              Explore The Issue <ArrowRight size={16} />
            </Link>
            <button onClick={openChatbot} className="border border-[#00C2CB] bg-transparent text-white hover:bg-[#00C2CB]/10 font-bold px-8 py-4 rounded-lg flex items-center gap-2 transition-colors text-sm">
              <Bot size={18} className="text-white" /> Try the AI Prototype
            </button>
          </FadeIn>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-white pt-24 pb-24 px-6 border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            
            <div className="flex flex-col items-start">
              <div className="font-serif text-[#0D1B2A] mb-2 flex items-baseline">
                {/* Wrapped the number with AnimatedCounter */}
                <span className="text-7xl md:text-8xl font-bold tracking-tighter"><AnimatedCounter target={86} /></span>
                <span className="text-4xl md:text-5xl font-sans text-[#00C2CB] font-bold ml-1">%</span>
              </div>
              <div className="h-1 w-16 bg-[#00C2CB] mb-6"></div>
              <p className="text-slate-600 font-sans text-sm md:text-base leading-relaxed max-w-[220px]">
                Of adult Filipinos consider fake news a severe problem (Pulse Asia, 2022).
              </p>
            </div>

            <div className="flex flex-col items-start">
              <div className="font-serif text-[#0D1B2A] mb-2 flex items-baseline">
                {/* Wrapped the number with AnimatedCounter */}
                <span className="text-7xl md:text-8xl font-bold tracking-tighter"><AnimatedCounter target={51} /></span>
                <span className="text-4xl md:text-5xl font-sans text-[#00C2CB] font-bold ml-1">%</span>
              </div>
              <div className="h-1 w-16 bg-[#00C2CB] mb-6"></div>
              <p className="text-slate-600 font-sans text-sm md:text-base leading-relaxed max-w-[220px]">
                Admit it is difficult to spot fake news on television, radio, or social media.
              </p>
            </div>

            <div className="flex flex-col items-start">
              <div className="font-serif text-[#0D1B2A] mb-2 flex items-baseline">
                {/* Wrapped the number with AnimatedCounter */}
                <span className="text-7xl md:text-8xl font-bold tracking-tighter"><AnimatedCounter target={90} /></span>
                <span className="text-4xl md:text-5xl font-sans text-[#00C2CB] font-bold ml-1">%</span>
              </div>
              <div className="h-1 w-16 bg-[#00C2CB] mb-6"></div>
              <p className="text-slate-600 font-sans text-sm md:text-base leading-relaxed max-w-[220px]">
                Report reading or watching fake political news online during the election cycle.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* EDUCATIONAL CASE STUDY SECTION */}
      <section className="bg-slate-50 pt-24 pb-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-serif text-[#0D1B2A] font-bold mb-6 leading-tight">
              An Educational Case Study <br className="hidden md:block" /> in AI Trust
            </h2>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed font-sans max-w-lg">
              TruthLens is a conceptual prototype demonstrating how Retrieval-Augmented Generation (RAG) can be used defensively to educate users against synthetic media. It is not an automated fact-checker, but a guided pedagogical tool.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-5 p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default group">
                <div className="w-10 h-10 shrink-0 rounded-full bg-[#00C2CB]/10 flex items-center justify-center text-[#00C2CB] group-hover:bg-[#00C2CB] group-hover:text-white transition-colors">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-[#0D1B2A] mb-1">Defensive Design</h4>
                  <p className="text-sm text-slate-500">Built with guardrails to prevent hallucination.</p>
                </div>
              </div>

              <div className="flex items-center gap-5 p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default group">
                <div className="w-10 h-10 shrink-0 rounded-full bg-[#00C2CB]/10 flex items-center justify-center text-[#00C2CB] group-hover:bg-[#00C2CB] group-hover:text-white transition-colors">
                  <FileText size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-[#0D1B2A] mb-1">Editorial Context</h4>
                  <p className="text-sm text-slate-500">Grounded in investigative journalism principles.</p>
                </div>
              </div>

              <div className="flex items-center gap-5 p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default group">
                <div className="w-10 h-10 shrink-0 rounded-full bg-[#00C2CB]/10 flex items-center justify-center text-[#00C2CB] group-hover:bg-[#00C2CB] group-hover:text-white transition-colors">
                  <Database size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-[#0D1B2A] mb-1">RAG Architecture</h4>
                  <p className="text-sm text-slate-500">Powered by curated, verified knowledge bases.</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="relative mt-12 lg:mt-0">
            <div className="rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] aspect-[4/5] max-w-md ml-auto relative bg-slate-200">
              <img 
                src="/manila-city.jpg" 
                alt="Manila Cityscape" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -bottom-8 left-4 lg:-left-12 bg-white rounded-2xl p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-100 max-w-sm z-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[#0D1B2A] rounded-full flex items-center justify-center text-white font-serif font-bold text-sm">
                  T
                </div>
                <span className="font-bold text-[#0D1B2A] text-sm">TruthLens AI</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                "According to VERA Files, the viral video of the anchor was digitally altered using voice cloning..."
              </p>
              <button onClick={openChatbot} className="text-[#00C2CB] text-xs font-bold uppercase tracking-wider hover:text-[#0D1B2A] transition-colors flex items-center gap-1">
                TRY IT NOW <ArrowRight size={14} />
              </button>
            </div>
          </FadeIn>

        </div>
      </section>

    </div>
  );
}