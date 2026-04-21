
import React from 'react';
import { Box, Lightbulb, Gamepad2, FileText, Sparkles, Rocket, Globe, Zap, Cpu, Activity, Cloud } from 'lucide-react';
import { LEGACY_MODULES } from '../../content/design-system/curriculum';
import { getIcon } from '../../shared/ui/IconRegistry';

const ROADMAP_IDEAS = [
  {
    title: 'RF Spectrum & Sensing',
    description: 'Deep dive into 6GHz sensing mechanics and non-Wi-Fi interference signatures (Microwaves, Radar, Bluetooth Coexistence).',
    status: 'Ideation',
    icon: Activity,
    color: 'bg-rose-50 text-rose-600',
  },
  {
    title: 'Adaptive QoS (Layer 7)',
    description: 'Moving from static DSCP tags to dynamic, AI-informed traffic prioritization for low-latency AR/VR environments.',
    status: 'Backlog',
    icon: Zap,
    color: 'bg-amber-50 text-amber-600',
  },
  {
    title: 'Sustainability & Green Wi-Fi',
    description: 'Implementing power-save modes (TWT, BSS Color) at scale for ESG/Sustainability reporting in corporate networks.',
    status: 'Research',
    icon: Globe,
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    title: 'Hybrid Cloud Control',
    description: 'Architecture design patterns for unified management across global multi-cloud and sovereign on-prem deployments.',
    status: 'Ideation',
    icon: Cloud,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Simulation Forensics',
    description: 'Adding a "Time Machine" feature to simulations to replay pcap files and visualize L2 frame exchanges in real-time.',
    status: 'Proposed',
    icon: Rocket,
    color: 'bg-indigo-50 text-indigo-600',
  }
];

const CurriculumLegacy: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 space-y-24 pb-64 animate-fade-in bg-slate-50 min-h-screen">
       
       <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-white text-slate-600 rounded-2xl mb-4 shadow-sm border border-slate-200">
             <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Pedagogy, Curriculum and Roadmap</h1>
          <p className="text-slate-500 text-lg leading-relaxed">
             The original curriculum architecture designed to map core wireless concepts directly to interactive simulation mechanics, now evolving into the next generation of Arista Wi-Fi training.
          </p>
       </div>

       {/* Roadmap Ideas Section */}
       <section className="space-y-8">
          <div className="flex items-center gap-3 px-4">
             <Sparkles className="w-6 h-6 text-brand-500" />
             <h2 className="text-2xl font-bold text-slate-900 tracking-tight italic">Curriculum Future Roadmap</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {ROADMAP_IDEAS.map((idea, i) => (
                <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <idea.icon className="w-20 h-20" />
                   </div>
                   <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${idea.color}`}>
                      <idea.icon className="w-6 h-6" />
                   </div>
                   <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                         {idea.status}
                      </span>
                   </div>
                   <h3 className="text-xl font-bold text-slate-900 mb-3">{idea.title}</h3>
                   <p className="text-sm text-slate-500 leading-relaxed">
                      {idea.description}
                   </p>
                </div>
             ))}
          </div>
       </section>

       <div className="space-y-12">
          <div className="flex items-center gap-3 px-4">
             <Box className="w-6 h-6 text-slate-400" />
             <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Core Curriculum Modules</h2>
          </div>
          {LEGACY_MODULES.map((module) => {
             const ModuleIcon = getIcon(module.icon, Box);
             return (
             <div key={module.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                
                {/* Module Header */}
                <div className="p-8 pb-4">
                   <div className="flex items-start gap-6">
                      <div className={`p-4 rounded-2xl ${module.color} shrink-0`}>
                         <ModuleIcon className="w-8 h-8" />
                      </div>
                      <div>
                         <div className="flex items-center gap-3 mb-2">
                            <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-slate-200">
                               {module.tag}
                            </span>
                            <span className="text-brand-600 text-[10px] font-bold uppercase tracking-widest">
                               {module.subtitle}
                            </span>
                         </div>
                         <h2 className="text-2xl font-bold text-slate-900 mb-3">{module.title}</h2>
                         <div className="flex gap-4 mb-4">
                            <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                               <Zap className="w-3.5 h-3.5" />
                               {module.lessons.filter(l => l.simulationId).length} Labs
                            </div>
                            <div className="flex items-center gap-1.5 text-brand-600 text-[10px] font-black uppercase tracking-widest">
                               <Sparkles className="w-3.5 h-3.5" />
                               {module.lessons.filter(l => l.quiz && l.quiz.length > 0).length} Assessments
                            </div>
                         </div>
                         <p className="text-slate-500 leading-relaxed max-w-3xl">
                            {module.description}
                         </p>
                      </div>
                   </div>
                </div>

                {/* Lessons List */}
                <div className="divide-y divide-slate-100">
                   {module.lessons.map((lesson) => (
                      <div key={lesson.id} className="p-8 hover:bg-slate-50 transition-colors group">
                         <div className="flex flex-col md:flex-row gap-8">
                            
                            {/* Left: Content */}
                            <div className="flex-1">
                               <div className="flex flex-wrap items-center gap-3 mb-3">
                                  <h3 className="text-lg font-bold text-slate-900 leading-none">
                                     {lesson.id} {lesson.title}
                                  </h3>
                                  <div className="flex gap-2">
                                     {lesson.simulationId && (
                                        <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border border-emerald-100 shadow-sm transition-all hover:scale-105">
                                           <Zap className="w-3 h-3" />
                                           Lab: {lesson.simulationId}
                                        </div>
                                     )}
                                     {lesson.quiz && lesson.quiz.length > 0 && (
                                        <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border border-indigo-100 shadow-sm transition-all hover:scale-105">
                                           <Sparkles className="w-3 h-3" />
                                           Quiz: {lesson.quiz.length}Q
                                        </div>
                                     )}
                                  </div>
                               </div>
                               <div className="flex items-start gap-3 mb-6">
                                  <div className="mt-1">
                                     <Box className="w-4 h-4 text-slate-400" />
                                  </div>
                                  <p className="text-slate-600 text-sm leading-relaxed">
                                     {lesson.objective}
                                  </p>
                               </div>

                               {/* Suggestion Box */}
                               <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 flex gap-4">
                                  <div className="mt-0.5">
                                     <Lightbulb className="w-5 h-5 text-sky-600" />
                                  </div>
                                  <div>
                                     <div className="text-sky-700 text-xs font-bold uppercase tracking-wide mb-1">
                                        Content Suggestion
                                     </div>
                                     <p className="text-sky-900 text-sm leading-relaxed">
                                        {lesson.suggestion}
                                     </p>
                                  </div>
                               </div>
                            </div>

                            {/* Right: Format */}
                            <div className="md:w-48 shrink-0 flex flex-col items-end justify-center border-l border-slate-100 md:pl-8 md:border-l-0 border-t md:border-t-0 pt-4 md:pt-0">
                               <div className="text-right">
                                  <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">
                                     Format
                                  </div>
                                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg font-medium text-xs border border-slate-200">
                                     <Gamepad2 className="w-3 h-3" />
                                     {lesson.format}
                                  </div>
                               </div>
                            </div>

                         </div>
                      </div>
                   ))}
                </div>

             </div>
          )})}
       </div>
    </div>
  );
};

export default CurriculumLegacy;
