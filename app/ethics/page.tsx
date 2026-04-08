'use client';

import FadeIn from '@/components/FadeIn';
import { Scale, ScanLine, FileCheck, Users, AlertOctagon, FileCode2 } from 'lucide-react';

export default function EthicsPage() {
  return (
    <div className="bg-white pb-32 min-h-screen">
      
      {/* HERO SECTION */}
      <section className="bg-[#0D1B2A] text-white pt-24 pb-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 text-[#00C2CB] font-bold tracking-widest uppercase text-xs mb-6">
              <Scale size={16} /> Design Ethics
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-8 leading-[1.1] text-balance">
              The Principles Behind TruthLens
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
              Designing anti-misinformation tools requires a careful balance between utility and harm mitigation, guided strictly by the Association for Computing Machinery (ACM) Code of Ethics.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CORE PRINCIPLES SECTION (Merged with ACM Code of Ethics) */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
        <FadeIn delay={0.1} className="text-center mb-16 pt-24">
          <h2 className="text-3xl md:text-4xl font-serif text-[#0D1B2A] font-bold mb-4">The ACM Code of Ethics</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            We approach AI implementation with skepticism, optimizing for user empowerment while strictly aligning our architecture with globally recognized professional conduct standards.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Principle 1: ACM 1.3 */}
          <FadeIn delay={0.2} className="bg-white rounded-3xl p-8 lg:p-10 border border-[#00C2CB]/30 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#00C2CB]"></div>
            <div className="w-14 h-14 rounded-2xl bg-[#0D1B2A] flex items-center justify-center text-white mb-8 shadow-md">
              <ScanLine size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#0D1B2A] mb-2">ACM 1.3: Be Honest & Trustworthy</h3>
            <span className="block text-[#00C2CB] font-bold text-sm mb-4 uppercase tracking-wider">Transparency</span>
            <p className="text-slate-600 text-sm leading-relaxed">
              The AI is instructed to explicitly state when it lacks verified context, rather than guessing. To ensure trustworthiness, the source of every verified response is linked directly.
            </p>
          </FadeIn>

          {/* Principle 2: ACM 1.2 */}
          <FadeIn delay={0.3} className="bg-white rounded-3xl p-8 lg:p-10 border border-[#00C2CB]/30 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-[#00C2CB]"></div>
            <div className="w-14 h-14 rounded-2xl bg-[#0D1B2A] flex items-center justify-center text-white mb-8 shadow-md">
              <FileCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#0D1B2A] mb-2">ACM 1.2: Avoid Harm</h3>
            <span className="block text-[#00C2CB] font-bold text-sm mb-4 uppercase tracking-wider">Accountability</span>
            <p className="text-slate-600 text-sm leading-relaxed">
              To prevent AI hallucinations from contributing to the disinformation ecosystem, our knowledge base is entirely human-curated by journalistic entities. We do not ingest the open web.
            </p>
          </FadeIn>

          {/* Principle 3: ACM 2.5 */}
          <FadeIn delay={0.4} className="bg-white rounded-3xl p-8 lg:p-10 border border-[#00C2CB]/30 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-[#00C2CB]"></div>
            <div className="w-14 h-14 rounded-2xl bg-[#0D1B2A] flex items-center justify-center text-white mb-8 shadow-md">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#0D1B2A] mb-2">ACM 2.5: Evaluate Risks</h3>
            <span className="block text-[#00C2CB] font-bold text-sm mb-4 uppercase tracking-wider">User Empowerment</span>
            <p className="text-slate-600 text-sm leading-relaxed">
              We proactively evaluated our system's risks. Instead of automating fact-checking, the chatbot acts as a pedagogical tool, teaching users how to identify deepfakes manually to build resilience.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* REJECTED VISION MODELS SECTION */}
      <section className="max-w-7xl mx-auto px-6 mt-32">
        <FadeIn delay={0.2} className="bg-slate-50 rounded-[40px] p-8 md:p-16 lg:p-20 border border-slate-100 relative">
          <div className="absolute top-8 right-8 bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Risk Mitigation
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 shrink-0">
                  <AlertOctagon size={24} />
                </div>
                <h2 className="text-3xl md:text-4xl font-serif text-[#0D1B2A] font-bold">Why We Rejected Vision Models</h2>
              </div>
              <p className="text-slate-600 mb-10 leading-relaxed text-lg">
                Initially, the prototype aimed to let users upload videos or images for immediate AI analysis. We explicitly abandoned this feature for two reasons:
              </p>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 flex gap-6 shadow-sm border border-slate-100">
                  <span className="text-xl font-bold text-[#0D1B2A]">01</span>
                  <div>
                    <h4 className="font-bold text-[#0D1B2A] mb-2">Automation Bias</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Users inherently trust the machine's verdict. If a vision model misclassifies a real video as fake, the tool becomes a vector for misinformation itself.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 flex gap-6 shadow-sm border border-slate-100">
                  <span className="text-xl font-bold text-[#0D1B2A]">02</span>
                  <div>
                    <h4 className="font-bold text-[#0D1B2A] mb-2">Evolving Adversaries</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Generative tools evolve faster than detection algorithms. Relying on "deepfake detectors" offers a false sense of security that adversaries easily bypass.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image/Mockup */}
            <div className="relative rounded-3xl overflow-hidden aspect-square md:aspect-[4/3] lg:aspect-square bg-slate-200 shadow-2xl">
              <img 
                src="/social-feed.jpg" 
                alt="Smartphone showing social media feed" 
                className="w-full h-full object-cover blur-[2px] scale-105"
              />
              <div className="absolute inset-0 bg-[#0D1B2A]/20"></div>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] sm:w-2/3 bg-white/95 backdrop-blur-md rounded-2xl p-8 text-center shadow-2xl border border-white">
                <AlertOctagon size={36} className="text-rose-500 mx-auto mb-4" />
                <h4 className="font-bold text-[#0D1B2A] text-xl mb-3">Upload Disabled</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Video analysis is intentionally restricted to prevent algorithmic bias.
                </p>
              </div>
            </div>

          </div>
        </FadeIn>
      </section>

      {/* LIAR'S DIVIDEND SECTION */}
      <section className="max-w-7xl mx-auto px-6 mt-32">
        <FadeIn delay={0.2}>
          <div className="bg-[#0D1B2A] rounded-[40px] p-10 md:p-16 lg:p-24 relative overflow-hidden text-white shadow-2xl">
            
            <div className="absolute -right-20 -bottom-20 opacity-5 pointer-events-none text-white">
               <FileCode2 size={400} />
            </div>

            <div className="relative z-10 max-w-3xl">
              <span className="inline-block bg-[#00C2CB] text-[#0D1B2A] font-bold px-4 py-1.5 rounded-full text-xs tracking-widest uppercase mb-8 shadow-md">
                Core Concept
              </span>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-8">
                The "Liar's Dividend"
              </h2>
              
              <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-10 font-light">
                Coined by legal scholars Danielle Citron and Robert Chesney, the Liar's Dividend describes the phenomenon where the mere existence of deepfakes allows politicians to dismiss real, damaging evidence as "AI-generated" <span className="font-bold text-[#00C2CB]">(Citron & Chesney, 2019)</span>.
              </p>

              <div className="border-l-4 border-[#00C2CB] pl-6 md:pl-8 py-2 bg-white/5 rounded-r-2xl p-6 backdrop-blur-sm">
                <p className="text-slate-200 leading-relaxed font-medium">
                  By creating a tool like TruthLens, we must be careful not to amplify the paranoia that "everything is fake." Our educational framework explicitly focuses on rebuilding trust in traditional investigative journalism, rather than merely instilling doubt in digital media.
                </p>
              </div>
            </div>

          </div>
        </FadeIn>
      </section>

    </div>
  );
}