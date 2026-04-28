
import React, { useState, useMemo } from 'react';
import { Lesson } from '../../types';
import { DEMO_TRACKS } from '../../content/copilot';
import { 
  Compass,
  PlayCircle,
  FileText,
  Loader2,
  Wrench,
  Handshake,
  ChevronDown,
  Check,
  MousePointer2,
  Target,
  BookOpen,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';

interface DemoCopilotProps {
  lessons: Lesson[];
  onSelectLesson: (lesson: Lesson) => void;
}

const DemoCopilot: React.FC<DemoCopilotProps> = ({ lessons, onSelectLesson }) => {
  const [activeRole, setActiveRole] = useState<'se' | 'am'>('se');
  const [selectedTrackId, setSelectedTrackId] = useState<number>(0);
  const [activeStepId, setActiveStepId] = useState<string | null>('gp-1');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  const filteredTracks = useMemo(() => DEMO_TRACKS.filter(t => t.roles.includes(activeRole)), [activeRole]);
  
  const currentTrack = useMemo(() => 
    filteredTracks.find(t => t.id === selectedTrackId) || filteredTracks[0], 
  [selectedTrackId, filteredTracks]);
  
  const activeStepData = useMemo(() => 
    currentTrack?.steps.find(s => s.id === activeStepId),
  [currentTrack, activeStepId]);

  const handleToggleStep = (stepId: string) => {
    setActiveStepId(prev => (prev === stepId ? null : stepId));
  };
  
  const handleCompleteStep = (e: React.MouseEvent, stepId: string) => {
    e.stopPropagation();
    setCompletedSteps(prev => 
      prev.includes(stepId) ? prev.filter(id => id !== stepId) : [...prev, stepId]
    );
  };

  const handleExportScript = () => {
    if (!currentTrack) return;
    setIsDownloading(true);
    const lines: string[] = [
      `DEMO SCRIPT: ${currentTrack.title}`,
      `Audience: ${currentTrack.audience} | Focus: ${currentTrack.focus}`,
      '='.repeat(60),
      '',
    ];
    currentTrack.steps.forEach((step, idx) => {
      lines.push(`STEP ${idx + 1}: ${step.title} (${step.duration})`);
      lines.push('-'.repeat(40));
      lines.push('WHAT TO SAY:');
      step.whatToSay.forEach(s => lines.push(`  • ${s}`));
      lines.push('');
      lines.push('WHAT TO DO:');
      step.whatToDo.forEach(s => lines.push(`  • ${s}`));
      lines.push('');
      lines.push(`KEY INSIGHT: ${step.keyInsight}`);
      if (step.trap) lines.push(`TRAP TO AVOID (${step.trap.title}): ${step.trap.content}`);
      lines.push('');
    });
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentTrack.title.replace(/\s+/g, '-').toLowerCase()}-script.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setIsDownloading(false);
  };

  const handleSelectTrack = (trackId: number) => {
    setSelectedTrackId(trackId);
    const newTrack = DEMO_TRACKS.find(t => t.id === trackId);
    if (newTrack && newTrack.steps.length > 0) {
      setActiveStepId(newTrack.steps[0].id);
    } else {
      setActiveStepId(null);
    }
    setCompletedSteps([]);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-8 pb-32">
      {/* Header */}
      <header className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-border-DEFAULT pb-8">
          <div>
             <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Compass className="w-6 h-6" /></div>
                <h1 className="text-3xl font-bold text-slate-900">Demo Co-Pilot</h1>
             </div>
             <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
               Your interactive guide to a perfect, repeatable demonstration.
             </p>
          </div>
          <div className="flex gap-3 shrink-0">
             <button onClick={handleExportScript} disabled={isDownloading} className="flex items-center gap-2 px-4 py-2 bg-white border border-border-DEFAULT rounded-lg text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors disabled:opacity-50">
                {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                {isDownloading ? 'Exporting...' : 'Export Script'}
             </button>
             <button onClick={() => window.open('https://launchpad.arista.com', '_blank')} className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors shadow-sm">
                <PlayCircle className="w-4 h-4" /> Launch Pod
             </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-between">
            {/* Role Toggle */}
            <div className="bg-surface p-2 rounded-xl border border-border-DEFAULT shadow-sm flex flex-wrap gap-2 max-w-xs">
                <button onClick={() => setActiveRole('se')} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeRole === 'se' ? 'bg-brand-600 text-white shadow-md' : 'text-text-secondary hover:bg-surface-highlight'}`}>
                    <Wrench className="w-4 h-4" /> Systems Engineer
                </button>
                <button onClick={() => setActiveRole('am')} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeRole === 'am' ? 'bg-brand-600 text-white shadow-md' : 'text-text-secondary hover:bg-surface-highlight'}`}>
                    <Handshake className="w-4 h-4" /> Account Manager
                </button>
            </div>
            {/* Scenario Dropdown */}
             <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-slate-500 shrink-0">Scenario:</label>
                <select onChange={(e) => handleSelectTrack(Number(e.target.value))} value={selectedTrackId} className="w-full md:w-auto bg-white border border-border-DEFAULT rounded-lg p-2 font-medium text-slate-800 focus:ring-1 focus:ring-brand-500 focus:outline-none shadow-sm">
                  {filteredTracks.map(track => <option key={track.id} value={track.id}>{track.title}</option>)}
                </select>
             </div>
        </div>
      </header>

      {/* Main Co-Pilot View */}
      <main className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Pane: The Script */}
        <div className="lg:col-span-3 space-y-3">
          {currentTrack?.steps.map((step, idx) => {
            const isActive = activeStepId === step.id;
            const isCompleted = completedSteps.includes(step.id);
            return (
              <div key={step.id} className={`bg-white rounded-2xl border transition-all duration-300 ${isActive ? 'border-brand-300 shadow-lg' : 'border-border-DEFAULT shadow-sm'}`}>
                <button onClick={() => handleToggleStep(step.id)} className="w-full flex items-start gap-4 p-5 text-left">
                  <div className="flex items-center gap-3">
                    <div onClick={(e) => handleCompleteStep(e, step.id)} className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-colors ${isCompleted ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>
                      {isCompleted ? <Check className="w-4 h-4" /> : <span className="text-xs font-bold">{idx + 1}</span>}
                    </div>
                    <div className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-brand-100 text-brand-600' : 'bg-slate-100 text-slate-500'}`}>
                      <step.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold transition-colors ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>{step.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">{step.duration}</p>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isActive ? 'rotate-180 text-brand-500' : ''}`} />
                </button>

                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-[800px]' : 'max-h-0'}`}>
                   <div className="px-6 pb-6 pt-2 space-y-6">
                      <div>
                         <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">What to Say (Narrative)</h4>
                         <ul className="space-y-2 list-disc list-inside text-slate-600 text-sm marker:text-brand-500">
                           {step.whatToSay.map((s, i) => <li key={i}>{s}</li>)}
                         </ul>
                      </div>
                      <div>
                         <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">What to Do (Actions)</h4>
                         <ul className="space-y-2 list-disc list-inside text-slate-600 text-sm marker:text-indigo-500">
                           {step.whatToDo.map((s, i) => <li key={i}>{s}</li>)}
                         </ul>
                      </div>
                   </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right Pane: The Context */}
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-8 space-y-6">
            {activeStepData ? (
              <>
                <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-200">
                  <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2"><Target className="w-4 h-4" /> Key Insight</h4>
                  <p className="text-indigo-800 text-sm leading-relaxed font-medium">"{activeStepData.keyInsight}"</p>
                </div>
                {activeStepData.trap && (
                  <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                    <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Trap to Avoid: {activeStepData.trap.title}</h4>
                    <p className="text-amber-800 text-sm leading-relaxed">{activeStepData.trap.content}</p>
                  </div>
                )}
                {activeStepData.relevantConcepts.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 border border-border-DEFAULT shadow-sm">
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2"><BookOpen className="w-4 h-4" /> Relevant Concepts</h4>
                    <div className="space-y-2">
                      {activeStepData.relevantConcepts.map(concept => {
                        const lesson = lessons.find(l => l.id === concept.lessonId);
                        return lesson ? (
                          <button key={concept.lessonId} onClick={() => onSelectLesson(lesson)} className="w-full p-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-left text-sm font-medium text-slate-700 transition-colors">
                            {concept.term}
                          </button>
                        ) : null
                      })}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 text-center text-slate-500">
                <Lightbulb className="w-8 h-8 mx-auto mb-4" />
                <h4 className="font-bold text-slate-700">Contextual Helper</h4>
                <p className="text-sm">Click on a step to see key insights, traps to avoid, and related learning materials here.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DemoCopilot;
