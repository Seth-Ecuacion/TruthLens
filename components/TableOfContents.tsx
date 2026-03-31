'use client';

import { useState, useEffect } from 'react';

const sections = [
  { id: "what-is-a-deepfake", title: "What is a Deepfake?" },
  { id: "how-to-spot-signs", title: "How to Spot the Signs" },
  { id: "verification-toolkit", title: "The Verification Toolkit" },
];

export default function TableOfContents() {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    if (window.location.hash) {
      const hashId = window.location.hash.substring(1);
      if (sections.some(s => s.id === hashId)) {
        setActiveSection(hashId);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px" } 
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    window.history.pushState(null, '', `#${id}`);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <aside className="hidden lg:block w-56 shrink-0 sticky top-32">
      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">On this page</h4>
      <nav className="flex flex-col gap-1 text-sm border-l-2 border-slate-200">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`text-left py-1.5 pl-4 -ml-[2px] border-l-2 transition-all duration-200 ${
              activeSection === section.id
                ? 'border-blue-600 text-blue-700 font-semibold bg-blue-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            {section.title}
          </button>
        ))}
      </nav>
    </aside>
  );
}