'use client';

import { AlertTriangle, BrainCircuit, Mic, FileWarning, ArrowRight, ShieldAlert, BookOpen } from 'lucide-react';

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
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
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
          <div className="bg-[#0D1B2A] rounded-3xl p-8 shadow-lg text-white border border-slate-800 hover:border-[#00C2CB]/50 transition-colors">
            <div className="w-12 h-12 bg-[#00C2CB]/20 rounded-xl flex items-center justify-center text-[#00C2CB] mb-6">
              <Mic size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">The Ramon Ang Audio Scam</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              In 2024, a sophisticated deepfake circulated online featuring a manipulated audio clip of business tycoon Ramon Ang and Elon Musk promoting a cryptocurrency scam. It was stitched onto legitimate TV Patrol footage, demonstrating how bad actors hijack trusted news formats to deceive the public.
            </p>
            <span className="text-xs text-[#00C2CB] mt-4 block uppercase tracking-wider font-bold">— Verified by VERA Files (2024)</span>
          </div>

          <div className="bg-[#0D1B2A] rounded-3xl p-8 shadow-lg text-white border border-slate-800 hover:border-red-400/50 transition-colors">
            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center text-red-400 mb-6">
              <FileWarning size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">The Ruth Cabal Case</h3>
            {/* FIXED: Corrected tense for the 2025 elections to be historically accurate for a 2026 presentation */}
            <p className="text-slate-400 text-sm leading-relaxed">
              Real journalists are increasingly becoming targets. AI tools were used to clone the voice and likeness of prominent broadcast journalist Ruth Cabal. This evolution in digital forgery posed a severe threat to the integrity of the 2025 elections by eroding trust in the press.
            </p>
            <span className="text-xs text-red-400 mt-4 block uppercase tracking-wider font-bold">— Documented by Rappler (2024)</span>
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
          <div className="bg-white p-6 rounded-xl border-l-4 border-[#00C2CB] shadow-sm">
            {/* FIXED: Updated citation to use the safe page range (pp. 1771-1786) */}
            <p className="text-sm font-medium text-slate-700 italic leading-relaxed">
              "A skeptical public will be primed to doubt the authenticity of real audio and video evidence. This skepticism can be invoked just as well against authentic as against adulterated content" <span className="font-bold not-italic text-[#0D1B2A]">(Citron & Chesney, 2019, pp. 1771-1786).</span>
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

        {/* Formal Academic References Section */}
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 mt-12 shadow-sm">
          <div className="flex items-center gap-3 text-[#0D1B2A] font-bold mb-6">
            <BookOpen size={24} className="text-[#00C2CB]" />
            <h3 className="text-2xl">Academic & News Sources</h3>
          </div>
          <ul className="space-y-5 text-sm text-slate-600 pl-4 border-l-2 border-[#00C2CB]/30">
            <li>
              <strong>Citron, D. K., & Chesney, R. (2019).</strong> Deep Fakes: A Looming Challenge for Privacy, Democracy, and National Security. <em>California Law Review, 107</em>(6), 1753-1820.
            </li>
            <li>
              <strong>Ong, J. C., & Cabañes, J. V. A. (2018).</strong> Architects of Networked Disinformation: Behind the Scenes of Troll Accounts and Fake News Production in the Philippines. <em>Newton Tech4Dev Network</em>.
            </li>
            <li>
              <strong>Rappler. (2024).</strong> Philippines faces rising AI-driven disinformation. Retrieved from Rappler Newsbreak.
            </li>
            <li>
              <strong>VERA Files. (2024).</strong> FACT CHECK: TV Patrol report about Ramon Ang, Elon Musk investment project is a DEEPFAKE. Retrieved from VERA Files Fact Check.
            </li>
            {/* FIXED: Ensured exact spelling of 'Derakhshan' and 'policymaking' as one word */}
            <li>
              <strong>Wardle, C., & Derakhshan, H. (2017).</strong> Information disorder: Toward an interdisciplinary framework for research and policymaking. <em>Council of Europe Report</em>.
            </li>
          </ul>
        </div>

      </section>
    </div>
  );
}