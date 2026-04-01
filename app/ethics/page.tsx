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
              Designing anti-misinformation tools requires a careful balance between utility and harm mitigation.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CORE PRINCIPLES SECTION */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
        <FadeIn delay={0.1} className="text-center mb-16 pt-24">
          <h2 className="text-3xl md:text-4xl font-serif text-[#0D1B2A] font-bold mb-4">Core Principles</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            We approach AI implementation with skepticism, optimizing for user empowerment rather than automated solutionism.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Principle 1 */}
          <FadeIn delay={0.2} className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-[#0D1B2A] flex items-center justify-center text-white mb-8 shadow-md">
              {/* FIX: Swapped EyeOff for ScanLine */}
              <ScanLine size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#0D1B2A] mb-4">Transparency</h3>
            {/* FIX: Softened the hallucination claim */}
            <p className="text-slate-600 text-sm leading-relaxed">
              The AI is instructed to explicitly state when it lacks verified context, rather than guessing. The source of every verified response is linked directly.
            </p>
          </FadeIn>

          {/* Principle 2 */}
          <FadeIn delay={0.3} className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-[#0D1B2A] flex items-center justify-center text-white mb-8 shadow-md">
              <FileCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#0D1B2A] mb-4">Accountability</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              The knowledge base is entirely human-curated by journalistic entities. We do not ingest the open web or untested social media datasets.
            </p>
          </FadeIn>

          {/* Principle 3 */}
          <FadeIn delay={0.4} className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-[#0D1B2A] flex items-center justify-center text-white mb-8 shadow-md">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#0D1B2A] mb-4">User Empowerment</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              The chatbot teaches users how to identify deepfakes manually instead of simply labeling a video 'fake' on their behalf.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* REJECTED VISION MODELS SECTION */}
      <section className="max-w-7xl mx-auto px-6 mt-32">
        <FadeIn delay={0.2} className="bg-slate-50 rounded-[40px] p-8 md:p-16 lg:p-20 border border-slate-100">
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
              {/* FIX: Local image path to avoid hotlinking */}
              <img 
                src="/social-feed.jpg" 
                alt="Smartphone showing social media feed" 
                className="w-full h-full object-cover blur-[2px] scale-105"
              />
              <div className="absolute inset-0 bg-[#0D1B2A]/20"></div>
              
              {/* FIX: Safer explicit centering for the overlay card */}
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
              
              {/* FIX: "phenomena" -> "phenomenon" */}
              <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-10 font-light">
                Coined by legal scholars Danielle Citron and Robert Chesney, the Liar's Dividend describes the phenomenon where the mere existence of deepfakes allows politicians to dismiss real, damaging evidence as "AI-generated."
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