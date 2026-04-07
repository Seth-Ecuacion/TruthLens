'use client';

import { AlertTriangle, BrainCircuit, Mic, FileWarning, ArrowRight, ShieldAlert } from 'lucide-react';

export default function IssuePage() {
  // Triggers the global chatbot event we set up in the Navbar
  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent('open-chatbot'));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Hero Section */}
      <section className="bg-[#0D1B2A] text-white pt-20 pb-16 px-4 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00C2CB] rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-pulse"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 text-[#00C2CB] font-bold tracking-widest text-sm uppercase mb-6">
            <ShieldAlert size={20} />
            The Information Crisis
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            The weaponization of <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2CB] to-blue-400">
              artificial intelligence.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
            The Philippine digital landscape is facing an unprecedented crisis. The boundaries between authentic news and fabricated content are blurring, driven by organized disinformation architectures and the rapid evolution of deepfake technology.
          </p>
        </div>
      </section>

      {/* Main Content Areas */}
      <section className="max-w-4xl mx-auto px-4 mt-12 space-y-16">

        {/* Pillar 1: Troll Farms */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-200">
          <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-700 mb-6">
            <BrainCircuit size={28} />
          </div>
          <h2 className="text-2xl font-bold text-[#0D1B2A] mb-4">The Architects of Networked Disinformation</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Misinformation in the Philippines is rarely accidental. As detailed by researchers Ong and Cabañes, the country relies on highly professionalized, tiered "troll farms." These networks are run by elite PR strategists who employ anonymous digital influencers and low-level click-farm operators to create artificial "illusions of engagement" and drown out legitimate discourse.
          </p>
        </div>

        {/* Pillar 2: The Deepfake Threat (Verified Cases) */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#0D1B2A] rounded-3xl p-8 shadow-lg text-white border border-slate-800">
            <div className="w-12 h-12 bg-[#00C2CB]/20 rounded-xl flex items-center justify-center text-[#00C2CB] mb-6">
              <Mic size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">The Ramon Ang Audio Scam</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              In 2024, a sophisticated deepfake circulated online featuring a manipulated audio clip of business tycoon Ramon Ang and Elon Musk promoting a cryptocurrency scam. It was stitched onto legitimate TV Patrol footage, demonstrating how bad actors hijack trusted news formats to deceive the public.
            </p>
            <span className="text-xs text-slate-500 mt-4 block uppercase tracking-wider font-bold">— Verified by VERA Files</span>
          </div>

          <div className="bg-[#0D1B2A] rounded-3xl p-8 shadow-lg text-white border border-slate-800">
            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center text-red-400 mb-6">
              <FileWarning size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">The Ruth Cabal Case</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Real journalists are increasingly becoming targets. AI tools were used to clone the voice and likeness of prominent broadcast journalist Ruth Cabal. This evolution in digital forgery poses a severe threat to the integrity of the upcoming 2025 elections by eroding trust in the press.
            </p>
            <span className="text-xs text-slate-500 mt-4 block uppercase tracking-wider font-bold">— Documented by Rappler</span>
          </div>
        </div>

        {/* Pillar 3: The Liar's Dividend */}
        <div className="bg-slate-100 rounded-3xl p-8 md:p-10 border border-slate-200">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#0D1B2A] mb-6 shadow-sm">
            <AlertTriangle size={28} />
          </div>
          <h2 className="text-2xl font-bold text-[#0D1B2A] mb-4">The "Liar's Dividend"</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Perhaps the most dangerous threat of deepfakes isn't the fake videos themselves, but what academics Citron & Chesney call the <strong>"Liar's Dividend."</strong> As the public becomes more aware that video and audio can be convincingly faked, guilty politicians and bad actors will exploit this skepticism. They will attempt to escape accountability by denouncing authentic, real video evidence of their wrongdoings as "just another deepfake."
          </p>
          <div className="bg-white p-5 rounded-xl border-l-4 border-[#00C2CB] shadow-sm">
            <p className="text-sm font-medium text-slate-700 italic">
              "A skeptical public will be primed to doubt the authenticity of real audio and video evidence. This skepticism can be invoked just as well against authentic as against adulterated content."
            </p>
          </div>
        </div>

        {/* Call to Action connecting to the RAG Prototype */}
        <div className="text-center pt-8 pb-12">
          <h2 className="text-3xl font-bold text-[#0D1B2A] mb-4">Don't just read about it. Test it.</h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            We built TruthLens to help users navigate this complex landscape. Ask our AI pedagogical tool about any of the cases mentioned above.
          </p>
          <button 
            onClick={handleOpenChat}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#00C2CB] hover:bg-[#00a8b0] text-[#0D1B2A] font-bold rounded-full transition-transform hover:scale-105 shadow-xl"
          >
            Launch TruthLens AI
            <ArrowRight size={20} />
          </button>
        </div>

      </section>
    </div>
  );
}