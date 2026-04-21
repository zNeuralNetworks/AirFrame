
import React, { useState, useMemo } from 'react';
import { Lesson } from '../../types';
import { 
  CheckCircle2, 
  Lock, 
  Play, 
  Clock, 
  ChevronRight, 
  ChevronDown,
  BookOpen,
  Eye,
  Network,
  List,
  X,
  Wifi,
  Zap,
  Gauge,
  Library,
  DraftingCompass,
  CloudCog,
  Move,
  ShieldCheck,
  Wrench,
  BrainCircuit,
  Beaker
} from 'lucide-react';

interface CourseMapProps {
  lessons: Lesson[];
  onSelectLesson: (lesson: Lesson) => void;
}

const GALAXY_LAYOUT: Record<number, { x: number; y: number; connections: number[] }> = {
  1: { x: 10, y: 50, connections: [2, 3] },
  2: { x: 24, y: 30, connections: [4] },
  3: { x: 24, y: 70, connections: [4] },
  4: { x: 38, y: 50, connections: [5, 6] },
  5: { x: 52, y: 30, connections: [7] },
  6: { x: 52, y: 70, connections: [7] },
  7: { x: 66, y: 50, connections: [8, 9] },
  8: { x: 78, y: 70, connections: [10] },
  9: { x: 78, y: 30, connections: [10] },
  10: { x: 86, y: 50, connections: [11] },
  11: { x: 91, y: 35, connections: [12] },
  12: { x: 91, y: 65, connections: [] },
};

const getModuleNumber = (name: string) => {
  const match = name.match(/^Module\s+(\d+)/i);
  return match ? Number(match[1]) : null;
};

const getModuleTitle = (name: string) => name.split(':').slice(1).join(':').trim() || name;

const CourseMap: React.FC<CourseMapProps> = ({ lessons, onSelectLesson }) => {
  const [expandedModule, setExpandedModule] = useState<string | null>("Module 1: Physics");
  const [referenceMode, setReferenceMode] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'galaxy'>('list');
  const [selectedGalaxyModule, setSelectedGalaxyModule] = useState<string | null>(null);

  // Group lessons by Module (Category)
  const modules = useMemo(() => {
    const grouped = lessons.reduce((acc, lesson) => {
      if (!acc[lesson.category]) {
        acc[lesson.category] = [];
      }
      acc[lesson.category].push(lesson);
      return acc;
    }, {} as Record<string, Lesson[]>);

    return Object.entries(grouped)
      .sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true, sensitivity: 'base' }))
      .map(([name, items]) => {
      const lessonItems = items as Lesson[];
      const completedCount = lessonItems.filter(l => l.completed).length;
      const totalCount = lessonItems.length;
      const progress = Math.round((completedCount / totalCount) * 100);
      const isLocked = lessonItems.every(l => l.locked);
      
      let icon = Wifi;
      let color = "bg-brand-500";
      
      if (name.includes('Physics')) { icon = Zap; color = "bg-brand-500"; }
      else if (name.includes('Airtime')) { icon = Gauge; color = "bg-brand-500"; }
      else if (name.includes('Standards')) { icon = Library; color = "bg-brand-500"; }
      else if (name.includes('Design')) { icon = DraftingCompass; color = "bg-violet-500"; }
      else if (name.includes('Architecture')) { icon = CloudCog; color = "bg-brand-500"; }
      else if (name.includes('Roaming')) { icon = Move; color = "bg-brand-500"; }
      else if (name.includes('Security')) { icon = ShieldCheck; color = "bg-indigo-500"; }
      else if (name.includes('Troubleshooting')) { icon = Wrench; color = "bg-brand-500"; }
      else if (name.includes('Synthesis')) { icon = BrainCircuit; color = "bg-apple-orange"; }
      else if (name.includes('Hardware')) { icon = Wrench; color = "bg-slate-700"; }
      else if (name.includes('Wired Foundation')) { icon = Network; color = "bg-indigo-600"; }

      return {
        name,
        items: lessonItems,
        progress,
        isLocked,
        icon,
        color,
        moduleNumber: getModuleNumber(name),
      };
    });
  }, [lessons]);

  const toggleReferenceMode = () => {
      setReferenceMode(!referenceMode);
      if (!referenceMode) setExpandedModule(null);
  };

  const renderLessonsList = (modItems: Lesson[], isLocked: boolean) => (
    <div className="space-y-4">
        {modItems.map((lesson) => {
        const isLessonLocked = referenceMode ? false : lesson.locked;
        
        let statusLabel = "";
        let statusColor = "";
        let statusIcon = null;

        if (lesson.completed) {
            statusLabel = "Applied";
            statusColor = "bg-brand-50 text-brand-500 border-brand-100";
            statusIcon = CheckCircle2;
        } else if (lesson.simCompleted) {
            statusLabel = "Understood";
            statusColor = "bg-orange-50 text-apple-orange border-orange-100";
            statusIcon = Beaker;
        } else {
            statusLabel = "Observed";
            statusColor = "bg-app text-text-muted border-border";
            statusIcon = Eye;
        }

        const StatusIcon = statusIcon;

        return (
            <button
            key={lesson.id}
            onClick={() => onSelectLesson(lesson)}
            disabled={isLessonLocked}
            className={`
                w-full flex items-center gap-6 p-6 rounded-apple border text-left group transition-all
                ${isLessonLocked 
                    ? 'bg-app border-border opacity-50 cursor-not-allowed' 
                    : 'bg-white border-border apple-shadow hover:scale-[1.01] cursor-pointer'}
            `}
            >
            <div className={`
                w-14 h-14 rounded-full flex items-center justify-center shrink-0 border-2 transition-all
                ${lesson.completed 
                    ? 'bg-brand-50 border-brand-500 text-brand-500' 
                    : (isLessonLocked ? 'bg-transparent border-border text-text-muted' : 'bg-transparent border-brand-500 text-brand-500')}
            `}>
                {lesson.completed ? <CheckCircle2 className="w-7 h-7 stroke-[2.5]" /> : (isLessonLocked ? <Lock className="w-6 h-6 stroke-[1.5]" /> : <Play className="w-6 h-6 fill-current stroke-[2]" />)}
            </div>
            
            <div className="flex-1">
                <h3 className={`font-extrabold text-xl tracking-tight ${isLessonLocked ? 'text-text-muted' : 'text-text-primary group-hover:text-brand-500'}`}>
                    {lesson.title}
                </h3>
                <p className="text-base text-text-muted line-clamp-1 mt-1 font-medium">{lesson.description}</p>
            </div>

            {!isLessonLocked && (
                <div className="flex flex-col items-end gap-2.5">
                    <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border ${statusColor}`}>
                        <StatusIcon className="w-4 h-4 stroke-[2.5]" /> {statusLabel}
                    </div>
                    <span className="text-xs text-text-muted flex items-center gap-2 font-bold uppercase tracking-widest">
                        <Clock className="w-4 h-4 stroke-[2]" /> {lesson.durationMinutes}m
                    </span>
                </div>
            )}
            </button>
        );
        })}
    </div>
  );
  
  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12 space-y-12 pb-32 min-h-full">
       
       <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
             <h1 className="text-5xl font-extrabold text-text-primary tracking-tight font-serif">
                {viewMode === 'galaxy' ? 'Knowledge Constellation' : (referenceMode ? 'Airframe Reference' : 'Mission Log')}
             </h1>
             <p className="text-text-muted mt-2 text-xl font-medium font-serif leading-relaxed">
                {viewMode === 'galaxy'
                   ? 'Visualize the connections between concepts. Unlock nodes to reveal the path.' 
                   : (referenceMode 
                      ? 'Access any simulation or concept instantly.' 
                      : 'Complete modules sequentially to achieve certification.')}
             </p>
          </div>

          <div className="flex items-center gap-4">
             {/* View Mode Toggle */}
             <div className="flex bg-app p-1 rounded-2xl border border-border apple-shadow">
                <button
                   onClick={() => setViewMode('list')}
                   className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white apple-shadow text-brand-500' : 'text-text-muted hover:text-text-primary'}`}
                   title="List View"
                >
                   <List className="w-6 h-6 stroke-[2]" />
                </button>
                <button
                   onClick={() => setViewMode('galaxy')}
                   className={`p-3 rounded-xl transition-all ${viewMode === 'galaxy' ? 'bg-white apple-shadow text-brand-500' : 'text-text-muted hover:text-text-primary'}`}
                   title="Galaxy View"
                >
                   <Network className="w-6 h-6 stroke-[2]" />
                </button>
             </div>

             {/* Reference Toggle (Only in List View) */}
             {viewMode === 'list' && (
                <button 
                   onClick={toggleReferenceMode}
                   className={`flex items-center gap-1 p-1 rounded-full border transition-all apple-shadow ${
                      referenceMode ? 'bg-white border-border' : 'bg-app border-border'
                   }`}
                >
                   <div className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${!referenceMode ? 'bg-brand-500 text-white apple-shadow' : 'text-text-muted hover:text-text-primary'}`}>
                      Learn Path
                   </div>
                   <div className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${referenceMode ? 'bg-brand-500 text-white apple-shadow' : 'text-text-muted hover:text-text-primary'}`}>
                      Reference
                   </div>
                </button>
             )}
          </div>
       </div>

       {viewMode === 'list' ? (
           <div className="space-y-8 relative animate-fade-in">
              {!referenceMode && <div className="absolute left-[40px] top-10 bottom-10 w-1 bg-border z-0 rounded-full opacity-50"></div>}

              {modules.map((mod) => {
                 const isLocked = referenceMode ? false : mod.isLocked;
                 const isExpanded = expandedModule === mod.name || referenceMode;
                 const isComplete = mod.progress === 100;

                 return (
                    <div key={mod.name} className="relative z-10">
                       <button 
                          onClick={() => !isLocked && setExpandedModule(expandedModule === mod.name ? null : mod.name)}
                          disabled={isLocked || referenceMode}
                          className={`
                             w-full flex items-center gap-8 p-8 rounded-apple-lg border transition-all duration-500 text-left
                             ${isLocked 
                                ? 'bg-app border-border opacity-60 cursor-not-allowed' 
                                : 'bg-white border-border apple-shadow hover:scale-[1.01]'}
                          `}
                       >
                          <div className={`
                             w-20 h-20 rounded-apple flex items-center justify-center text-white shrink-0 apple-shadow z-20 transition-all border-4 border-white
                             ${isLocked ? 'bg-slate-200' : (isComplete ? 'bg-brand-500' : mod.color)}
                          `}>
                             {isLocked ? <Lock className="w-10 h-10 text-slate-400 stroke-[1.5]" /> : (referenceMode ? <BookOpen className="w-10 h-10 stroke-[2]" /> : (isComplete ? <CheckCircle2 className="w-10 h-10 stroke-[2.5]" /> : <mod.icon className="w-10 h-10 stroke-[2]" />))}
                          </div>

                          <div className="flex-1">
                             <div className="flex justify-between items-center">
                                <h2 className={`text-2xl font-extrabold tracking-tight ${isLocked ? 'text-text-muted' : 'text-text-primary'}`}>
                                   {mod.name}
                                </h2>
                                {!referenceMode && (
                                   expandedModule === mod.name ? <ChevronDown className="w-7 h-7 text-text-muted stroke-[2.5]" /> : <ChevronRight className="w-7 h-7 text-text-muted stroke-[2.5]" />
                                )}
                             </div>
                             {!referenceMode && (
                                <div className="flex items-center gap-6 mt-4">
                                   <div className="h-3 w-40 bg-app rounded-full overflow-hidden border border-border shadow-inner">
                                   <div style={{ width: `${mod.progress}%` }} className={`h-full transition-all duration-1000 ${isLocked ? 'bg-slate-300' : 'bg-apple-green'}`}></div>
                                   </div>
                                   <span className="text-sm font-bold text-text-muted uppercase tracking-widest">{mod.items.length} Units</span>
                                </div>
                             )}
                          </div>
                       </button>

                       <div className={`
                          overflow-hidden transition-all duration-700 ease-in-out pl-[6.5rem]
                          ${isExpanded ? 'max-h-[2000px] opacity-100 mt-6' : 'max-h-0 opacity-0'}
                       `}>
                          <div className="pb-6">
                             {renderLessonsList(mod.items, isLocked)}
                          </div>
                       </div>
                    </div>
                 );
              })}
           </div>
       ) : (
           <div className="relative h-[700px] bg-slate-900 rounded-apple-lg border border-slate-800 shadow-2xl overflow-hidden animate-fade-in select-none">
              {/* Star Background */}
              <div className="absolute inset-0 opacity-20" 
                   style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
              </div>
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

              {/* Connections (Edges) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                 {Object.entries(GALAXY_LAYOUT).map(([moduleNumber, layout]) => {
                    const sourceMod = modules.find(m => m.moduleNumber === Number(moduleNumber));
                    if (!sourceMod) return null;
                    const isSourceUnlocked = !sourceMod.isLocked;

                    return layout.connections.map(targetNumber => {
                       const targetLayout = GALAXY_LAYOUT[targetNumber];
                       const targetMod = modules.find(m => m.moduleNumber === targetNumber);
                       if (!targetLayout || !targetMod) return null;
                       
                       const isTargetUnlocked = !targetMod.isLocked;
                       const isActivePath = isSourceUnlocked && isTargetUnlocked;

                       return (
                          <line 
                             key={`${moduleNumber}-${targetNumber}`}
                             x1={`${layout.x}%`} y1={`${layout.y}%`}
                             x2={`${targetLayout.x}%`} y2={`${targetLayout.y}%`}
                             stroke={isActivePath ? '#38bdf8' : '#334155'}
                             strokeWidth={isActivePath ? 3 : 1.5}
                             strokeDasharray={isActivePath ? 'none' : '6 6'}
                             className={`transition-all duration-1000 ${isActivePath ? 'opacity-80' : 'opacity-20'}`}
                          />
                       );
                    });
                 })}
              </svg>

              {/* Nodes */}
              {modules.map((mod) => {
                 const layout = mod.moduleNumber ? GALAXY_LAYOUT[mod.moduleNumber] : null;
                 if (!layout) return null;
                 
                 const isLocked = mod.isLocked;
                 const isCompleted = mod.progress === 100;
                 const isSelected = selectedGalaxyModule === mod.name;
                 const labelAlign = layout.x > 82 ? 'right-0 text-right' : layout.x < 18 ? 'left-0 text-left' : 'left-1/2 -translate-x-1/2 text-center';

                 return (
                    <button
                       key={mod.name}
                       onClick={() => !isLocked && setSelectedGalaxyModule(mod.name)}
                       disabled={isLocked}
                       className={`
                          absolute w-16 h-16 -ml-8 -mt-8 rounded-full flex items-center justify-center transition-all duration-500 z-10
                          ${isLocked 
                             ? 'bg-slate-800 border-2 border-slate-700 text-slate-600 grayscale cursor-not-allowed' 
                             : (isCompleted 
                                ? 'bg-brand-500 border-4 border-white text-white shadow-[0_0_30px_rgba(56,189,248,0.8)] hover:scale-110' 
                                : 'bg-slate-900 border-2 border-brand-400 text-brand-400 shadow-[0_0_20px_rgba(56,189,248,0.4)] animate-pulse hover:scale-110')}
                          ${isSelected ? 'ring-8 ring-white/20 scale-110' : ''}
                       `}
                       style={{ left: `${layout.x}%`, top: `${layout.y}%` }}
                    >
                       {isLocked ? <Lock className="w-6 h-6 stroke-[1.5]" /> : (isCompleted ? <CheckCircle2 className="w-8 h-8 stroke-[2.5]" /> : <mod.icon className="w-8 h-8 stroke-[2]" />)}
                       
                       <span className="absolute -top-8 text-[10px] font-bold uppercase tracking-widest text-white/35">
                          M{mod.moduleNumber}
                       </span>

                       {/* Label */}
                       <div className={`absolute top-20 min-w-36 max-w-44 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest leading-snug transition-all ${labelAlign} ${
                          isLocked ? 'bg-slate-800 text-slate-500' : 'bg-white/10 text-white backdrop-blur-md border border-white/20'
                       }`}>
                          {getModuleTitle(mod.name)}
                       </div>
                    </button>
                 );
              })}

              {/* Module Detail Overlay */}
              {selectedGalaxyModule && (
                 <div className="absolute right-0 top-0 bottom-0 w-96 bg-slate-900/95 backdrop-blur-xl border-l border-white/10 shadow-2xl p-8 overflow-y-auto animate-slide-in-right z-30">
                    <button 
                       onClick={() => setSelectedGalaxyModule(null)}
                       className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                       <X className="w-6 h-6 text-white/60 stroke-[2.5]" />
                    </button>
                    
                    <div className="mt-10">
                       <span className="text-xs font-bold text-brand-400 uppercase tracking-widest mb-3 block">Module Detail</span>
                       <h2 className="text-3xl font-extrabold text-white mb-8 tracking-tight">{selectedGalaxyModule}</h2>
                       
                       <div className="galaxy-lessons-list">
                          {(() => {
                             const mod = modules.find(m => m.name === selectedGalaxyModule);
                             return mod ? renderLessonsList(mod.items, false) : null;
                          })()}
                       </div>
                    </div>
                 </div>
              )}
           </div>
       )}
    </div>
  );
};

export default CourseMap;
