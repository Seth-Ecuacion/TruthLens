export default function ArticleContent() {
    return (
      <article className="flex-1 max-w-3xl bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-slate-100">
        <span className="text-blue-600 font-semibold tracking-wide uppercase text-xs">Digital Literacy • Module 1</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-3 mb-8 text-slate-900 leading-tight">
          Understanding Deepfakes: The New Era of Digital Deception
        </h1>
        
        <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            In recent years, the phrase "seeing is believing" has lost its absolute truth. With the rapid advancement of Artificial Intelligence, a new form of synthetic media has emerged: the deepfake.
          </p>
  
          <h2 id="what-is-a-deepfake" className="text-2xl font-bold text-slate-900 mt-10 mb-4 pb-2 border-b border-slate-100 scroll-mt-24">
            What is a Deepfake?
          </h2>
          <p>
            A deepfake is a type of artificial intelligence used to create convincing image, audio, and video hoaxes. The term is a portmanteau of "deep learning" and "fake." By training neural networks on massive datasets of a person's face and voice, software can now seamlessly stitch one person's face onto another's body, or generate audio of them saying things they never actually said.
          </p>
  
          <h2 id="how-to-spot-signs" className="text-2xl font-bold text-slate-900 mt-10 mb-4 pb-2 border-b border-slate-100 scroll-mt-24">
            How to Spot the Signs
          </h2>
          <p>
            While models are getting better, they still leave behind digital artifacts. When verifying media, look for these common flaws:
          </p>
          <ul className="list-disc pl-6 space-y-3 marker:text-blue-500 mt-4">
            <li><strong className="text-slate-900">Unnatural Blinking:</strong> Early deepfakes often failed to replicate natural human blinking patterns.</li>
            <li><strong className="text-slate-900">Lighting Inconsistencies:</strong> Check if the shadows on a person's face match the lighting of the room they are supposedly in.</li>
            <li><strong className="text-slate-900">Mismatched Audio:</strong> Listen closely to see if the lip movements perfectly sync with the spoken syllables.</li>
            <li><strong className="text-slate-900">Blurry Edges:</strong> Look at the perimeter of the face and the hair; AI often struggles to render individual hair strands clearly against complex backgrounds.</li>
          </ul>
  
          <h2 id="verification-toolkit" className="text-2xl font-bold text-slate-900 mt-10 mb-4 pb-2 border-b border-slate-100 scroll-mt-24">
            The Verification Toolkit
          </h2>
          <p>
            You don't have to rely purely on the naked eye. There are free, authoritative tools available online to help you verify if an image or piece of news has been manipulated:
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <a href="https://toolbox.google.com/factcheck/explorer" target="_blank" rel="noreferrer" className="block p-5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 hover:shadow-sm transition-all group">
              <h3 className="font-bold text-slate-900 group-hover:text-blue-700 flex items-center gap-2">Google Fact Check</h3>
              <p className="text-sm mt-2 text-slate-600 line-clamp-3">Search for topics or specific claims to see if authoritative organizations have already debunked them.</p>
            </a>
            <a href="https://tineye.com/" target="_blank" rel="noreferrer" className="block p-5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 hover:shadow-sm transition-all group">
              <h3 className="font-bold text-slate-900 group-hover:text-blue-700 flex items-center gap-2">TinEye Reverse Image</h3>
              <p className="text-sm mt-2 text-slate-600 line-clamp-3">Upload an image to see where else it has appeared on the internet. Find the original source.</p>
            </a>
            <a href="https://detectfakes.media.mit.edu/" target="_blank" rel="noreferrer" className="block p-5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 hover:shadow-sm transition-all group sm:col-span-2">
              <h3 className="font-bold text-slate-900 group-hover:text-blue-700 flex items-center gap-2">MIT Detect Fakes Project</h3>
              <p className="text-sm mt-2 text-slate-600">An interactive research project teaching you the exact visual anomalies to look for in manipulated media.</p>
            </a>
          </div>
        </div>
      </article>
    );
  }