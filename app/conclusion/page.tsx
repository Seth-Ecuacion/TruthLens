'use client';

import FadeIn from '@/components/FadeIn';
import { BookOpen, CheckCircle2, FileText } from 'lucide-react';

export default function ConclusionPage() {
  const openChatbot = () => window.dispatchEvent(new CustomEvent('open-chatbot'));

  return (
    <div className="bg-slate-50 pb-32 min-h-screen">
      
      {/* HERO SECTION */}
      <section className="bg-[#0D1B2A] text-white pt-32 pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 text-[#00C2CB] font-bold tracking-widest uppercase text-xs mb-6">
              <BookOpen size={16} /> Synthesis
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-8 leading-[1.1] text-balance">
              Restoring the Lens of Truth
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
              AI-generated deception is inevitable, but algorithmic fatalism is not.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* SYNTHESIS PROSE */}
      <section className="max-w-3xl mx-auto px-6 mt-24">
        <FadeIn>
          <p className="text-2xl text-slate-700 font-light leading-relaxed mb-12 text-center text-balance">
            We cannot code our way out of a trust deficit. The solution to synthetic media is not merely synthetic detection, but pedagogical empowerment.
          </p>
        </FadeIn>
        
        <FadeIn delay={0.1}>
          <div className="space-y-8 text-slate-600 text-lg leading-relaxed">
            <p>
              The TruthLens prototype demonstrates that Retrieval-Augmented Generation can be responsibly deployed as a localized, highly-constrained educational tool. By refusing to ingest the open web and strictly curating its knowledge base with verified journalistic outputs from VERA Files and Rappler, the chatbot significantly mitigates the hallucination issues inherent in foundational models.
            </p>
            <p>
              Most importantly, TruthLens refuses to automate critical thinking. It doesn't tell a Filipino voter, "This video is fake." Instead, it says, "Here is how to check if a video like this is fake, and here is what journalists have found regarding this claim."
            </p>
          </div>
        </FadeIn>
      </section>

      {/* PROJECT TAKEAWAYS GRID */}
      <section className="max-w-7xl mx-auto px-6 mt-32">
        <FadeIn delay={0.2} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-[#0D1B2A] font-bold">Project Takeaways</h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Defensive RAG",
              desc: "Using AI to retrieve human fact-checks scales journalistic impact without replacing the journalist."
            },
            {
              title: "Friction as a Feature",
              desc: "Text-only interfaces force users to articulate queries, reducing the automation bias seen in 'one-click' detectors."
            },
            {
              title: "Localization is Key",
              desc: "Global models fail to understand Taglish nuances or local political context. Curated databases solve this."
            },
            {
              title: "Rejecting the Liar's Dividend",
              desc: "The platform emphasizes rebuilding trust in institutions rather than amplifying digital paranoia."
            }
          ].map((item, i) => (
            /* FIX: Capped delay to max 0.35s for fast scrolling */
            <FadeIn key={i} delay={0.2 + (i * 0.05)} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-[#00C2CB]/10 flex items-center justify-center text-[#00C2CB] mb-6">
                <CheckCircle2 size={20} />
              </div>
              <h3 className="font-bold text-[#0D1B2A] mb-3">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* REFERENCES & CTA SECTION */}
      <section className="max-w-6xl mx-auto px-6 mt-32">
        <FadeIn delay={0.3}>
          {/* FIX: Added md:grid-cols-2 for tablet breakpoint gracefully collapsing */}
          <div className="bg-white rounded-[40px] p-8 md:p-12 border border-slate-100 shadow-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-20 items-center">
            
            {/* Left: References */}
            <div className="md:col-span-1 lg:col-span-3">
              <div className="flex items-center gap-3 mb-10 pb-6 border-b border-slate-100">
                <FileText size={24} className="text-[#0D1B2A]" />
                <h3 className="text-2xl font-serif font-bold text-[#0D1B2A]">Academic & Journalistic References</h3>
              </div>

              <ul className="space-y-8">
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#00C2CB]"></span>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">VERA Files • 2023</p>
                  {/* FIX: Real VERA Files citation */}
                  <p className="text-[#0D1B2A] font-medium leading-relaxed">VERA FILES FACT SHEET: What you need to know about deepfakes</p>
                </li>
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#00C2CB]"></span>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Rappler • 2024</p>
                  {/* FIX: Real Rappler citation */}
                  <p className="text-[#0D1B2A] font-medium leading-relaxed">Bracing for artificial intelligence misuse in campaigns and elections</p>
                </li>
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#00C2CB]"></span>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Citron, D. & Chesney, R. • 2019</p>
                  <p className="text-[#0D1B2A] font-medium leading-relaxed">Deep Fakes: A Looming Challenge for Privacy, Democracy, and National Security</p>
                </li>
              </ul>
            </div>

            {/* Right: CTA Card */}
            <div className="md:col-span-1 lg:col-span-2">
              <div className="bg-slate-50 rounded-3xl p-10 text-center border border-slate-100">
                <div className="w-16 h-16 bg-[#0D1B2A] rounded-full flex items-center justify-center text-white font-serif font-bold text-2xl mx-auto mb-6 shadow-md">
                  T
                </div>
                <h4 className="text-xl font-serif font-bold text-[#0D1B2A] mb-4">Join the Effort</h4>
                {/* FIX: Removed false open-source claim */}
                <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                  TruthLens is an academic research prototype. Help us expand the knowledge base to combat localized misinformation.
                </p>
                <button 
                  onClick={openChatbot}
                  className="bg-[#0D1B2A] hover:bg-slate-800 text-white font-bold px-8 py-3.5 rounded-xl w-full transition-transform hover:-translate-y-0.5 shadow-lg text-sm"
                >
                  Test the Prototype
                </button>
              </div>
            </div>

          </div>
        </FadeIn>
      </section>

    </div>
  );
}