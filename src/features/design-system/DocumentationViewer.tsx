
import React, { useMemo, useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  ArrowRight, CheckCircle2, Info, Boxes, Zap, 
  ExternalLink, Code2, Cloud, Fingerprint, ShieldCheck
} from 'lucide-react';

interface DocumentationViewerProps {
  content: string;
  title: string;
  description: string;
  iconMap: Record<string, any>;
  version?: string;
  sourcePath: string;
}

const StyledMarkdown: React.FC<{ content: string }> = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        h3: ({ children }) => (
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-10 mb-6 flex items-center gap-3">
            <span className="w-1.5 h-6 bg-brand-500 rounded-full shadow-[0_0_12px_rgba(var(--brand-500-rgb),0.4)]" />
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-5 text-[15px]">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="space-y-4 mb-8">
            {children}
          </ul>
        ),
        li: ({ children }) => (
          <li className="flex items-start gap-4 group/li">
            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0 group-hover/li:scale-125 transition-transform shadow-[0_0_8px_rgba(var(--brand-500-rgb),0.5)]" />
            <span className="text-slate-700 dark:text-slate-300 text-[15px] leading-snug">{children}</span>
          </li>
        ),
        code: ({ children }) => (
          <code className="font-mono text-[13px] font-medium px-2 py-0.5 bg-slate-100 dark:bg-brand-900/10 text-brand-700 dark:text-brand-400 rounded-md border border-slate-200/50 dark:border-brand-500/20">
            {children}
          </code>
        ),
        strong: ({ children }) => (
          <strong className="font-bold text-slate-900 dark:text-white bg-slate-100/50 dark:bg-white/5 px-1 rounded transition-colors hover:bg-brand-50 dark:hover:bg-brand-500/10 hover:text-brand-600 dark:hover:text-brand-400">
            {children}
          </strong>
        ),
        blockquote: ({ children }) => (
          <div className="relative overflow-hidden bg-brand-50/30 dark:bg-brand-500/5 border border-brand-100 dark:border-brand-500/10 p-6 rounded-2xl mb-8 flex gap-4 backdrop-blur-sm group/quote">
            <div className="absolute top-0 right-0 p-2 opacity-5 group-hover/quote:opacity-10 transition-opacity">
               <Info className="w-16 h-16 text-brand-500" />
            </div>
            <Info className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
            <div className="relative text-slate-700 dark:text-slate-300 italic text-[14px] leading-relaxed">
              {children}
            </div>
          </div>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

const DocumentationViewer: React.FC<DocumentationViewerProps> = ({ 
  content: fullContent,
  title: pageTitle,
  description: pageDescription,
  iconMap,
  version = "v1.0",
  sourcePath
}) => {
  const [activeSection, setActiveSection] = useState<string>('');

  // Parse markdown into sections based on ##
  const sections = useMemo(() => {
    const parts = fullContent.split(/\n##\s+/);
    const [titleSection, ...contentSections] = parts;

    return contentSections.map(section => {
      const lines = section.split('\n');
      const title = lines[0].trim();
      const content = lines.slice(1).join('\n').trim();
      const id = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      const Icon = iconMap[title] || Boxes;

      return { title, content, id, Icon };
    });
  }, [fullContent, iconMap]);

  // Intersection Observer for scroll tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1, rootMargin: '-10% 0px -80% 0px' }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="flex min-h-screen bg-[#F5F5F7] dark:bg-[#050505] font-sans selection:bg-brand-500/20 selection:text-brand-600">
      {/* Refined Navigation Sidebar */}
      <aside className="hidden xl:block w-80 h-screen sticky top-0 border-r border-slate-200 dark:border-white/5 p-8 pt-16 bg-white/50 dark:bg-black/20 backdrop-blur-md z-40">
        <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
           <div className="w-1 h-4 bg-brand-500 rounded-full" />
           Project Index
        </div>
        
        <nav className="space-y-4">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`group flex flex-col gap-1 transition-all p-3 rounded-2xl hover:bg-white dark:hover:bg-white/5 ${
                activeSection === section.id ? 'bg-white dark:bg-white/10 apple-shadow-sm' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                 <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all border ${
                   activeSection === section.id 
                    ? 'bg-brand-500 text-white border-brand-500 shadow-lg shadow-brand-500/20' 
                    : 'bg-white dark:bg-slate-900 text-slate-400 border-slate-100 dark:border-white/5 group-hover:border-brand-200 dark:group-hover:border-brand-500/30'
                 }`}>
                    <section.Icon className="w-4.5 h-4.5" />
                 </div>
                 <span className={`text-sm font-bold tracking-tight transition-colors ${
                   activeSection === section.id ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'
                 }`}>
                   {section.title.split(' ')[0]} 
                 </span>
              </div>
              <div className={`ml-12 text-[11px] font-medium transition-colors ${
                activeSection === section.id ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
              }`}>
                {section.title.substring(section.title.indexOf(' ') + 1)}
              </div>
            </a>
          ))}
        </nav>

        <div className="absolute bottom-12 left-8 right-8">
           <div className="p-5 rounded-[24px] bg-slate-900/5 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 overflow-hidden relative group/spec">
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-brand-500/10 blur-2xl rounded-full group-hover/spec:scale-150 transition-transform duration-500" />
              <div className="flex items-center gap-2 mb-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                 <p className="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-widest leading-none">Live Sync Ready</p>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                Parsing <code>{sourcePath}</code> at runtime.
              </p>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-24 lg:px-20 scroll-smooth">
        <header className="mb-32 relative">
          <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-brand-500/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="mb-8 flex items-center gap-4">
             <div className="px-3 py-1 bg-brand-500 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full">
                Engineering {version}
             </div>
             <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
             <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                TSA-Verified
             </div>
          </div>
          <h1 className="text-6xl lg:text-7xl font-black text-slate-900 dark:text-white mb-10 tracking-tighter leading-[0.9] group/title capitalize">
             {pageTitle.split(': ')[0]} <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-indigo-500 dark:to-indigo-400 group-hover:tracking-tight transition-all duration-700">
               {pageTitle.includes(': ') ? pageTitle.split(': ')[1] : 'Specification'}
             </span>
          </h1>
          <p className="text-xl lg:text-2xl text-slate-500 dark:text-slate-400 font-medium max-w-3xl leading-relaxed">
            {pageDescription}
          </p>
        </header>

        <div className="space-y-32">
          {sections.map((section, index) => (
            <section 
              key={section.id} 
              id={section.id} 
              className="scroll-mt-24 group/section"
            >
              <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
                 {/* Sidebar meta block */}
                 <div className="lg:w-1/3 flex-shrink-0">
                    <div className="sticky top-24">
                       <div className="flex items-center gap-6 mb-8">
                          <div className="w-20 h-20 rounded-[28px] bg-white dark:bg-white/5 apple-shadow-lg flex items-center justify-center text-brand-500 border border-slate-100 dark:border-white/5 transition-all group-hover/section:scale-105 group-hover/section:border-brand-500/20">
                             <section.Icon className="w-9 h-9" />
                          </div>
                          <div>
                             <div className="text-[11px] font-black text-brand-600 dark:text-brand-400 uppercase tracking-[0.25em] mb-1">
                                Section 0{index + 1}
                             </div>
                             <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-400 italic">Core Spec</span>
                                <ArrowRight className="w-3 h-3 text-slate-300" />
                             </div>
                          </div>
                       </div>
                       <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tighter leading-tight mb-6">
                         {section.title}
                       </h2>
                       <div className="space-y-3">
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-white/5 rounded-full w-fit">
                             <Fingerprint className="w-3 h-3 text-slate-400" />
                             <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none">Security context: High</span>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-white/5 rounded-full w-fit">
                             <Cloud className="w-3 h-3 text-slate-400" />
                             <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none">Status: Production</span>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* High-Fidelity Content Card */}
                 <div className="lg:w-2/3">
                    <div className="relative group/card">
                       <div className="absolute -inset-0.5 bg-gradient-to-br from-brand-500 to-indigo-600 rounded-[40px] opacity-0 group-hover/card:opacity-10 dark:group-hover/card:opacity-20 blur-xl transition-opacity duration-500" />
                       <div className="relative apple-shadow-lg lg:apple-shadow-2xl rounded-[40px] bg-white dark:bg-[#0c0c0c] border border-slate-100 dark:border-white/5 p-10 lg:p-14 transition-all duration-500">
                          <StyledMarkdown content={section.content} />
                          
                          <div className="mt-14 pt-10 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                             <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-slate-50 dark:bg-white/5">
                                   <Code2 className="w-4 h-4 text-slate-400" />
                                </div>
                                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                   Hash: 0x{Math.random().toString(16).substring(2, 10)}
                                </div>
                             </div>
                             <button className="px-6 py-2.5 bg-slate-900 dark:bg-white dark:text-black text-white text-[11px] font-black rounded-xl hover:scale-105 transition-all shadow-xl shadow-slate-900/10 active:scale-95 flex items-center gap-2 group/btn">
                                VIEW SOURCE
                                <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                             </button>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-48 mb-32 p-16 lg:p-24 rounded-[60px] bg-[#0c0c0c] text-white relative overflow-hidden group/footer">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/15 blur-[160px] -translate-y-1/2 translate-x-1/2 group-hover/footer:scale-110 transition-transform duration-1000" />
           <div className="relative z-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-16">
              <div className="max-w-xl">
                 <div className="w-16 h-1 bg-brand-500 mb-8 rounded-full" />
                 <h2 className="text-4xl lg:text-6xl font-black mb-8 tracking-tighter leading-none italic">Documentation <br /> Verified</h2>
                 <p className="text-slate-400 leading-relaxed text-lg font-medium">
                   This document serves as the official source of truth for the Airframe project, maintaining high-fidelity alignment between product vision and technical execution.
                 </p>
                 <div className="mt-12 flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-brand-500 font-black text-xs uppercase tracking-widest">
                       <Zap className="w-4 h-4 fill-brand-500" />
                       Real-time sync
                    </div>
                    <div className="w-1 h-1 rounded-full bg-slate-700" />
                    <div className="flex items-center gap-2 text-brand-500 font-black text-xs uppercase tracking-widest">
                       <ShieldCheck className="w-4 h-4 fill-brand-500" />
                       Version control
                    </div>
                 </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 w-full xl:w-auto">
                 <div className="p-8 bg-white/5 border border-white/10 rounded-[32px] flex flex-col items-center gap-2 backdrop-blur-xl">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Status</span>
                    <span className="text-3xl font-black italic">Active</span>
                 </div>
                 <div className="p-8 bg-brand-500 border border-brand-400 rounded-[32px] flex flex-col items-center gap-2 shadow-2xl shadow-brand-500/20">
                    <span className="text-[10px] font-black text-brand-100 uppercase tracking-widest leading-none">Version</span>
                    <span className="text-3xl font-black italic">{version}</span>
                 </div>
              </div>
           </div>
        </footer>
      </main>
    </div>
  );
};

export default DocumentationViewer;
