
import React from 'react';
import { 
  CheckCircle2,
  LucideIcon,
  HelpCircle,
  Smartphone,
  Layers
} from 'lucide-react';
import Mascot from '../../shared/ui/Mascot';
import { ED_TECH_SECTIONS } from '../../content/design-system/ed-tech';
import { getIcon } from '../../shared/ui/IconRegistry';


// Component Map for the complex visuals
const Visuals: Record<string, React.ReactNode> = {
  'constructivism': (
     <div className="relative h-24 bg-slate-900 rounded-xl overflow-hidden p-3 border border-slate-700">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.2),transparent_70%)]"></div>
        <div className="flex justify-between items-center h-full relative z-10">
           <div className="w-16 h-16 rounded-full border-2 border-dashed border-cyan-500 animate-spin-slow"></div>
           <div className="space-y-2 w-24">
              <div className="h-1 bg-slate-700 rounded-full"><div className="w-1/2 h-full bg-cyan-400 rounded-full"></div></div>
              <div className="h-1 bg-slate-700 rounded-full"><div className="w-3/4 h-full bg-purple-400 rounded-full"></div></div>
           </div>
        </div>
     </div>
  ),
  'micro-learning': (
     <div className="space-y-2">
        <div className="p-2 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
           <CheckCircle2 className="w-4 h-4 text-green-600" />
           <div className="h-2 w-20 bg-green-200 rounded"></div>
        </div>
        <div className="p-2 bg-white border border-slate-200 rounded-lg flex items-center gap-2 opacity-50">
           <div className="w-4 h-4 rounded-full border border-slate-300"></div>
           <div className="h-2 w-24 bg-slate-200 rounded"></div>
        </div>
     </div>
  ),
  'spaced-repetition': (
    <div className="flex justify-between items-end h-16 px-2">
       {[100, 40, 70, 20, 90].map((h, i) => (
          <div key={i} className="w-4 bg-indigo-200 rounded-t relative">
             <div style={{ height: `${h}%` }} className="absolute bottom-0 w-full bg-indigo-500 rounded-t"></div>
          </div>
       ))}
    </div>
  ),
  'progressive-disclosure': (
    <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
       <div className="flex justify-between items-center mb-2">
          <div className="h-2 w-1/3 bg-slate-800 rounded"></div>
          <div className="w-4 h-4 rounded bg-slate-100"></div>
       </div>
       <div className="space-y-1">
          <div className="h-1.5 w-full bg-slate-100 rounded"></div>
          <div className="h-1.5 w-2/3 bg-slate-100 rounded"></div>
       </div>
       <div className="mt-3 pt-2 border-t border-slate-50 flex justify-center">
          <div className="h-1 w-12 bg-slate-200 rounded-full"></div>
       </div>
    </div>
  ),
  'dual-coding': (
     <div className="flex gap-2 items-center h-full">
        <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center border border-teal-100">
           <Smartphone className="w-6 h-6 text-teal-600" />
        </div>
        <div className="flex-1 space-y-1.5">
           <div className="h-2 w-16 bg-slate-800 rounded"></div>
           <div className="h-1.5 w-24 bg-slate-300 rounded"></div>
        </div>
     </div>
  ),
  'signaling': (
     <div className="space-y-2 p-1">
        <div className="h-2 w-1/3 bg-rose-500 rounded"></div>
        <div className="space-y-1">
           <div className="h-1 w-full bg-slate-200 rounded"></div>
           <div className="h-1 w-full bg-slate-200 rounded"></div>
           <div className="h-1 w-2/3 bg-slate-200 rounded"></div>
        </div>
     </div>
  ),
  'gamification': (
    <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
       <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-orange-500">🔥 12</span>
       </div>
       <div className="h-8 w-px bg-slate-100"></div>
       <div className="flex-1">
          <div className="flex justify-between text-[10px] mb-1">
             <span className="font-bold text-slate-700">Goal</span>
             <span className="text-slate-400">40/50</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
             <div className="h-full bg-yellow-400 w-[80%]"></div>
          </div>
       </div>
    </div>
  ),
  'flow-state': (
     <div className="relative h-20 w-full border-l border-b border-slate-300">
        <div className="absolute bottom-0 left-0 w-full h-full">
           <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
              <path d="M0 50 Q 50 25 100 0" fill="none" stroke="#e879f9" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="50" cy="25" r="4" fill="#d946ef" className="animate-pulse" />
           </svg>
        </div>
        <div className="absolute -bottom-4 right-0 text-[8px] text-slate-400 uppercase">Skill</div>
        <div className="absolute top-0 -left-6 text-[8px] text-slate-400 uppercase -rotate-90">Challenge</div>
     </div>
  ),
  'emotional-connection': (
     <div className="flex items-center justify-center h-full">
        <Mascot size="sm" expression="happy" />
     </div>
  ),
  'winding-path': (
     <div className="relative h-24 w-full flex flex-col items-center justify-center overflow-hidden">
        <svg className="absolute inset-0 w-full h-full text-slate-200" viewBox="0 0 100 60" preserveAspectRatio="none">
           <path d="M 50 60 Q 20 45 50 30 Q 80 15 50 0" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="3 3" />
        </svg>
        <div className="w-6 h-6 rounded-full bg-brand-500 border-2 border-white shadow-sm z-10 mb-4"></div>
     </div>
  ),
  'knowledge-graph': (
     <div className="relative h-24 w-full">
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-slate-800 rounded-full -translate-x-1/2 -translate-y-1/2 z-10 border border-white"></div>
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-slate-300 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-slate-300 rounded-full"></div>
        <svg className="absolute inset-0 w-full h-full text-slate-200">
           <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="currentColor" strokeWidth="1" />
           <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="currentColor" strokeWidth="1" />
        </svg>
     </div>
  ),
  'catalog-grid': (
     <div className="grid grid-cols-3 gap-1.5 p-2">
        {[1,2,3,4,5,6].map(i => (
           <div key={i} className={`h-8 rounded ${i===1 ? 'bg-pink-200' : 'bg-slate-100'}`}></div>
        ))}
     </div>
  ),
  'direct-manipulation': (
     <div className="space-y-2 p-2">
        <div className="flex items-center gap-2">
           <div className="h-1 flex-1 bg-slate-200 rounded-full">
              <div className="w-1/2 h-full bg-cyan-500 rounded-full relative">
                 <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border border-cyan-500 rounded-full shadow-sm"></div>
              </div>
           </div>
        </div>
        <div className="flex items-center gap-2">
            <div className="h-1 flex-1 bg-slate-200 rounded-full">
               <div className="w-3/4 h-full bg-slate-400 rounded-full"></div>
            </div>
        </div>
     </div>
  ),
  'conversational': (
     <div className="space-y-2 p-2">
        <div className="flex gap-2">
           <div className="w-4 h-4 rounded-full bg-emerald-200"></div>
           <div className="bg-emerald-50 rounded-lg rounded-tl-none p-1.5 text-[6px] text-emerald-800 w-2/3">
              What is the frequency?
           </div>
        </div>
        <div className="flex gap-2 flex-row-reverse">
           <div className="w-4 h-4 rounded-full bg-slate-200"></div>
           <div className="bg-slate-100 rounded-lg rounded-tr-none p-1.5 text-[6px] text-slate-800 w-1/2">
              2.4 GHz
           </div>
        </div>
     </div>
  ),
  'feedback-loop': (
    <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
       <div className="text-[8px] text-red-800 font-mono mb-1">Error: Syntax invalid</div>
       <div className="flex gap-1">
          <div className="flex-1 h-4 bg-white border border-red-200 rounded"></div>
          <div className="w-8 h-4 bg-red-500 rounded"></div>
       </div>
    </div>
  )
};

const EdTechGallery: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-16 pb-32">
       
       <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-50 text-indigo-600 rounded-2xl mb-4">
             <Smartphone className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">EdTech Design Laboratory</h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            A comprehensive deconstruction of the UI/UX principles, cognitive frameworks, and interaction models that power modern educational technology.
          </p>
       </div>

       {ED_TECH_SECTIONS.map((section, sectionIdx) => (
          <div key={section.id} className="scroll-mt-20">
             <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-4">
                <div className="bg-slate-900 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold font-mono">
                   {sectionIdx + 1}
                </div>
                <div>
                   <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
                   <p className="text-slate-500">{section.description}</p>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.patterns.map((p, idx) => {
                   const Icon = getIcon(p.icon, Layers);
                   return (
                   <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col h-full group">
                      <div className="flex justify-between items-start mb-6">
                         <div className={`p-3 rounded-xl ${p.color}`}>
                            <Icon className="w-6 h-6" />
                         </div>
                         <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-50 px-2 py-1 rounded text-slate-400 border border-slate-100">
                            {p.appRef}
                         </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{p.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                         {p.description}
                      </p>

                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 group-hover:border-indigo-100 group-hover:bg-indigo-50/30 transition-colors h-32 flex flex-col justify-center">
                         {Visuals[p.id]}
                      </div>
                   </div>
                )})}
             </div>
          </div>
       ))}

       {/* Theoretical Footer */}
       <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden mt-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500 rounded-full blur-[100px] opacity-20"></div>
          
          <h2 className="text-2xl font-bold mb-8 relative z-10">The "Hook" Model in Action</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10 text-center">
             <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="text-brand-400 font-bold mb-2">1. Trigger</div>
                <div className="text-xs text-slate-400">Push Notification or Dashboard Visual</div>
             </div>
             <div className="hidden md:flex items-center justify-center text-slate-600">→</div>
             <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="text-brand-400 font-bold mb-2">2. Action</div>
                <div className="text-xs text-slate-400">Interactive Simulation or Quiz</div>
             </div>
             <div className="hidden md:flex items-center justify-center text-slate-600">→</div>
             <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="text-brand-400 font-bold mb-2">3. Reward</div>
                <div className="text-xs text-slate-400">XP, Streak, and Mastery Unlock</div>
             </div>
             <div className="hidden md:flex items-center justify-center text-slate-600">→</div>
             <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="text-brand-400 font-bold mb-2">4. Investment</div>
                <div className="text-xs text-slate-400">Profile Building & Skill Matrix</div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default EdTechGallery;
