
import React from 'react';
import { Type, AlignLeft, Terminal, MoveHorizontal, Baseline, CheckCircle2, Shapes, Zap, Search } from 'lucide-react';

const TypographyReference: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 md:p-16 space-y-32 pb-64 animate-fade-in bg-[#FAFAFA] dark:bg-[#050505] min-h-screen font-sans selection:bg-brand-500/20 selection:text-brand-600">
      
      {/* Dynamic Header */}
      <header className="relative">
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-brand-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="mb-8 flex items-center gap-4">
           <div className="px-3 py-1 bg-brand-500 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full">
              Style System v4.0
           </div>
           <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
           <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Standardized
           </div>
        </div>
        <h1 className="text-6xl lg:text-9xl font-black text-slate-900 dark:text-white mb-10 tracking-tighter leading-[0.85] italic group">
           The Type <br />
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-indigo-500 dark:to-indigo-400 group-hover:tracking-tight transition-all duration-700">Hierarchy</span>
        </h1>
        <p className="text-xl lg:text-3xl text-slate-500 dark:text-slate-400 font-medium max-w-3xl leading-tight">
          A multi-font architecture designed for <span className="text-brand-600 font-bold italic">Information Density</span> and engineering precision.
        </p>
      </header>

      {/* Font Foundations */}
      <section className="space-y-12">
        <div className="flex items-center gap-4 mb-16">
           <div className="w-12 h-0.5 bg-brand-500 rounded-full" />
           <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Foundation Stacks</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* SF Pro / Inter */}
           <div className="bg-white dark:bg-[#0c0c0c] p-10 rounded-[40px] border border-slate-200/50 dark:border-white/5 apple-shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
                 <AlignLeft className="w-24 h-24 text-brand-500" />
              </div>
              <div className="w-14 h-14 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white mb-8 border border-slate-200/50 dark:border-white/5">
                 <Baseline className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">SF Sans / Inter</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-12">
                 Primary interface font. Optimized for readability and information-dense dashboards.
              </p>
              <div className="space-y-6 pt-8 border-t border-slate-100 dark:border-white/5">
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Display Bold</span>
                    <span className="text-3xl font-black italic tracking-tighter">Aa</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Normal 400</span>
                    <span className="text-lg font-normal">The quick brown fox</span>
                 </div>
              </div>
           </div>

           {/* JetBrains Mono */}
           <div className="bg-[#0c0c0c] p-10 rounded-[40px] border border-white/10 shadow-2xl relative overflow-hidden group text-white">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Terminal className="w-24 h-24 text-brand-500" />
              </div>
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-brand-400 mb-8 border border-white/5">
                 <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-2">JetBrains Mono</h3>
              <p className="text-sm text-slate-400 font-medium mb-12">
                 Technical font for data, addresses, and logic snippets. Ensures perfect character alignment.
              </p>
              <div className="space-y-6 pt-8 border-t border-white/5 font-mono">
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ligatures</span>
                    <span className="text-3xl font-bold text-brand-500">{"=>"}</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Data View</span>
                    <span className="text-emerald-400 text-sm">#F2F2F7</span>
                 </div>
              </div>
           </div>

           {/* Source Serif */}
           <div className="bg-white dark:bg-[#0c0c0c] p-10 rounded-[40px] border border-slate-200/50 dark:border-white/5 apple-shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
                 <Shapes className="w-24 h-24 text-brand-500" />
              </div>
              <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-600 mb-8 border border-indigo-100 dark:border-indigo-500/20">
                 <Type className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Source Serif 4</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-12">
                 Applied as an italic editorial accent to emphasize high-fidelity research and vision notes.
              </p>
              <div className="space-y-6 pt-8 border-t border-slate-100 dark:border-white/5 font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed">
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-sans not-italic">Accent Style</span>
                    <span className="text-3xl">Editorial</span>
                 </div>
                 <p className="text-sm">"Understanding by Design, not intuition by accident."</p>
              </div>
           </div>
        </div>
      </section>

      {/* The Production Scale */}
      <section className="space-y-12">
        <div className="flex items-center gap-4 mb-16">
           <div className="w-12 h-0.5 bg-brand-500 rounded-full" />
           <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Production Scale</h2>
        </div>

        <div className="bg-white dark:bg-[#0c0c0c] rounded-[48px] border border-slate-200/50 dark:border-white/5 apple-shadow-2xl overflow-hidden">
           <div className="grid grid-cols-12 p-8 bg-slate-50 dark:bg-white/5 border-b border-slate-200/50 dark:border-white/5 items-center">
              <div className="col-span-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Token</div>
              <div className="col-span-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Properties</div>
              <div className="col-span-7 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Visual Sample</div>
           </div>
           
           <div className="divide-y divide-slate-100 dark:divide-white/5">
              {[
                  { token: 'text-8xl', weight: 'Black / Italic', props: '80px / -0.05em', sample: 'Display' },
                  { token: 'text-5xl', weight: 'Bold', props: '48px / -0.04em', sample: 'Main Heading' },
                  { token: 'text-2xl', weight: 'Bold', props: '24px / -0.02em', sample: 'Section Title' },
                  { token: 'text-base', weight: 'Medium', props: '16px / -0.01em', sample: 'The Quick Brown Fox' },
                  { token: 'text-sm', weight: 'Normal', props: '14px / 0em', sample: 'Primary body content for lessons.' },
                  { token: 'text-xs', weight: 'SemiBold', props: '12px / 0.02em', sample: 'SECONDARY UI LABEL' },
                  { token: 'text-[10px]', weight: 'Black', props: '10px / 0.25em', sample: 'METADATA TAG' },
              ].map((row, i) => (
                  <div key={i} className="grid grid-cols-12 p-10 items-center hover:bg-slate-50 dark:hover:bg-white/5 transition-all group">
                      <div className="col-span-3 font-mono text-xs text-brand-600 dark:text-brand-400 font-bold uppercase tracking-widest">{row.token}</div>
                      <div className="col-span-2">
                         <div className="text-[11px] font-bold text-slate-900 dark:text-white uppercase leading-none mb-1">{row.weight}</div>
                         <div className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">{row.props}</div>
                      </div>
                      <div className={`col-span-7 transition-all group-hover:translate-x-2 ${row.token} ${row.weight.includes('Black') ? 'font-black' : row.weight.includes('Bold') ? 'font-bold' : row.weight.includes('Medium') ? 'font-medium' : 'font-normal'} ${row.weight.includes('Italic') ? 'italic' : ''} text-slate-900 dark:text-white tracking-tighter`}>
                         {row.sample}
                      </div>
                  </div>
              ))}
           </div>
        </div>
      </section>

      {/* Rules of engagement */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
         {/* Density Philosophy */}
         <div className="bg-slate-900 text-white p-12 rounded-[52px] shadow-2xl relative overflow-hidden group">
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-500/20 blur-[80px] rounded-full" />
            <div className="flex items-center gap-4 mb-10">
               <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-brand-400">
                  <MoveHorizontal className="w-6 h-6" />
               </div>
               <h3 className="text-2xl font-bold tracking-tight italic">Density Philosophy</h3>
            </div>
            
            <p className="text-slate-400 leading-relaxed mb-10 text-lg">
               Our typography is optimized for the <span className="text-white font-bold">"Engineers Flow."</span> We avoid empty decorative space in favor of logical grouping and scanning efficiency.
            </p>

            <div className="space-y-6">
               <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                     <div className="text-sm font-black uppercase tracking-widest text-white mb-1">Optical Alignment</div>
                     <p className="text-xs text-slate-500 italic">Always check baseline alignment when mixing Sans and Mono font blocks.</p>
                  </div>
               </div>
               <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                     <div className="text-sm font-black uppercase tracking-widest text-white mb-1">Contrast Over Scale</div>
                     <p className="text-xs text-slate-500 italic">Use weight (Black vs Light) before changing font size to maintain vertical rhythm.</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Tech Specs */}
         <div className="bg-brand-500 text-white p-12 rounded-[52px] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 scale-150 opacity-10 rotate-12">
               <Search className="w-32 h-32" />
            </div>
            <div className="flex items-center gap-4 mb-10">
               <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white">
                  <Zap className="w-6 h-6 fill-white" />
               </div>
               <h3 className="text-2xl font-bold tracking-tight italic">Rendering Engine</h3>
            </div>
            
            <div className="p-8 bg-black/10 border border-white/20 rounded-3xl mb-8 backdrop-blur-md">
               <p className="text-xs font-black uppercase tracking-widest text-brand-100 mb-6">Global Directives</p>
               <ul className="space-y-4 font-mono text-[11px] leading-relaxed">
                  <li className="flex justify-between border-b border-white/5 pb-2">
                     <span className="text-brand-200">antialiased</span>
                     <span className="text-white">true</span>
                  </li>
                  <li className="flex justify-between border-b border-white/5 pb-2">
                     <span className="text-brand-200">letter-spacing</span>
                     <span className="text-white">-0.011em</span>
                  </li>
                  <li className="flex justify-between">
                     <span className="text-brand-200">text-rendering</span>
                     <span className="text-white">optimizeLegibility</span>
                  </li>
               </ul>
            </div>

            <p className="text-sm text-brand-100 leading-relaxed font-medium">
               Airframe utilizes the browser's hardware acceleration for font rendering to ensure that even at 2xs sizes, technical data remains sharp and error-free.
            </p>
         </div>
      </section>

      {/* Footer Disclaimer */}
      <footer className="text-center px-12 pt-12 border-t border-slate-200/50 dark:border-white/5">
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">TSA-Verified System Blueprint</p>
      </footer>

    </div>
  );
};

export default TypographyReference;
