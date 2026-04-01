'use client';

import FadeIn from '@/components/FadeIn';
import { BrainCircuit, ShieldCheck, Database, ArrowRight, Bot, FileText, Search } from 'lucide-react';
import Link from 'next/link';

export default function PrototypePage() {
  const openChatbot = () => window.dispatchEvent(new CustomEvent('open-chatbot'));

  return (
    <div className="bg-slate-50 pt-20 pb-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24 mt-8">
          
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00C2CB]/10 text-[#00C2CB] text-xs font-bold uppercase tracking-widest mb-6">
              <BrainCircuit size={16} /> Interactive Prototype
            </span>
            <h1 className="text-5xl md:text-6xl font-serif text-[#0D1B2A] font-bold mb-6 leading-[1.1] text-balance">
              Combating <span className="text-[#00C2CB]">AI</span> with AI
            </h1>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg font-sans">
              TruthLens employs Retrieval-Augmented Generation (RAG) to ensure the chatbot grounds its answers exclusively in a curated knowledge base of media literacy principles and verified deepfake detection guidelines.
            </p>
            <button 
              onClick={openChatbot} 
              className="bg-[#0D1B2A] hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Bot size={20} className="text-[#00C2CB]" /> Initialize Chatbot Demo
            </button>
          </FadeIn>

          {/* Right Architecture Diagram */}
          <FadeIn delay={0.2} className="relative">
            <div className="bg-[#0D1B2A] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl h-[380px] flex flex-col justify-between border border-slate-800 group">
               <div className="absolute top-0 right-0 w-72 h-72 bg-[#00C2CB]/15 rounded-full blur-[80px] -mr-20 -mt-20 group-hover:bg-[#00C2CB]/25 transition-colors duration-700"></div>
               
               <div className="flex justify-between items-start relative z-10">
                 <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 backdrop-blur-sm">
                   <ShieldCheck size={24} className="text-[#00C2CB]" />
                 </div>
                 <div className="text-right">
                   <p className="text-[#00C2CB] font-bold text-xs uppercase tracking-widest mb-1">Educational Prototype</p>
                   <p className="text-slate-400 text-xs flex items-center justify-end gap-1.5">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                     Status: Operational
                   </p>
                 </div>
               </div>

               {/* FIX: 3-Node Architecture Flowchart */}
               <div className="flex items-center justify-between relative z-10 px-0 sm:px-2">
                  
                  {/* Node 1: Database */}
                  <div className="flex flex-col items-center gap-3 w-20 sm:w-24">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner group-hover:border-[#00C2CB]/30 transition-colors">
                      <Database size={24} className="text-slate-300" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-slate-400 text-center font-medium uppercase tracking-wider leading-tight">Supabase<br/>Vector DB</span>
                  </div>
                  
                  {/* Arrow 1 */}
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-slate-700 to-[#00C2CB]/50 mx-2 relative items-center justify-center hidden sm:flex">
                    <ArrowRight size={14} className="text-[#00C2CB] bg-[#0D1B2A] px-1" />
                  </div>

                  {/* Node 2: Retrieval */}
                  <div className="flex flex-col items-center gap-3 w-20 sm:w-24">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#00C2CB]/10 border border-[#00C2CB]/30 flex items-center justify-center shadow-inner">
                      <Search size={24} className="text-[#00C2CB]" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-[#00C2CB] text-center font-bold uppercase tracking-wider leading-tight">Semantic<br/>Retrieval</span>
                  </div>

                  {/* Arrow 2 */}
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-[#00C2CB]/50 to-slate-700 mx-2 relative items-center justify-center hidden sm:flex">
                    <ArrowRight size={14} className="text-slate-500 bg-[#0D1B2A] px-1" />
                  </div>
                  
                  {/* Node 3: LLM */}
                  <div className="flex flex-col items-center gap-3 w-20 sm:w-24">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#00C2CB] border border-[#00C2CB] flex items-center justify-center shadow-[0_0_30px_rgba(0,194,203,0.2)] group-hover:shadow-[0_0_40px_rgba(0,194,203,0.4)] transition-shadow">
                      <Bot size={28} className="text-[#0D1B2A]" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-white text-center font-bold uppercase tracking-wider leading-tight">Llama 3.3<br/><span className="text-slate-400 font-normal">(via Groq)</span></span>
                  </div>

               </div>
            </div>
          </FadeIn>
        </div>

        {/* HOW IT WORKS SECTION */}
        <div className="mt-32">
          <FadeIn delay={0.1} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-[#0D1B2A] font-bold mb-4">How the Architecture Works</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Unlike standard conversational AI which relies on pre-training data and often hallucinates facts, TruthLens acts as a secure pedagogical layer.
            </p>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[ 
              { 
                icon: <FileText size={24} />, 
                title: '1. The Query', 
                desc: <>A user asks about a suspicious video spreading on Philippine TikTok. The system interprets the intent without relying solely on its internal memory.</> 
              },
              { 
                icon: <Database size={24} />, 
                title: '2. Vector Retrieval', 
                desc: <>The query is embedded and matched against our Supabase database containing curated educational materials, pulling only highly relevant context.</> 
              },
              { 
                icon: <BrainCircuit size={24} />, 
                title: '3. Augmented Response', 
                desc: <>The LLM synthesizes an answer using <em>only</em> the retrieved context, citing its sources directly. If the information isn't in the database, it is instructed to explicitly decline rather than guess.</> 
              }
            ].map((step, i) => (
              <FadeIn key={i} delay={0.2 + (i * 0.1)} className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-[#0D1B2A] text-white flex items-center justify-center mb-8 shadow-md">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0D1B2A] mb-4">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
        {/* ETHICS CTA SECTION (The missing block!) */}
        <div className="mt-32 mb-8">
          <FadeIn delay={0.3}>
            <div className="bg-[#0D1B2A] rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
              {/* Subtle dot pattern background */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none" 
                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}
              ></div>

              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-serif text-white font-bold mb-6">Built for Transparency</h2>
                <p className="text-slate-300 text-lg mb-10 leading-relaxed font-sans">
                  We explicitly chose a text-only interface to avoid the ethical pitfalls of building an automated "truth oracle" that users blindly trust. The goal is education, not automation.
                </p>
                <Link 
                  href="/ethics" 
                  className="inline-block bg-white hover:bg-slate-100 text-[#0D1B2A] font-bold px-8 py-4 rounded-xl transition-transform hover:-translate-y-0.5 shadow-lg"
                >
                  Read the Ethical Framework
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>

      </div>
    </div>
  );
}