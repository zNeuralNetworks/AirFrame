
import React from 'react';
import { Info, CheckCircle, RefreshCcw, CheckSquare, Square, PenTool, ArrowRight } from 'lucide-react';
import { LAB_SPECS } from '../../content/labs';
import SimulationLoader from '../simulations/SimulationLoader';

interface LabManagerProps {
  lessonId: string;
  simulationId: string;
  SimulationComponent: React.LazyExoticComponent<React.FC<{ onComplete: () => void }>> | null;
  simKey: number;
  completedChallenges: string[];
  simCompleted: boolean;
  reflectionText: string;
  savedReflection: boolean;
  onSimComplete: () => void;
  onToggleChallenge: (id: string) => void;
  onResetSim: () => void;
  onReflectionChange: (text: string) => void;
  onSaveReflection: () => void;
  onCompleteLab: () => void;
  onSkipLab: () => void;
}

const LabManager: React.FC<LabManagerProps> = ({
  lessonId,
  simulationId,
  SimulationComponent,
  simKey,
  completedChallenges,
  simCompleted,
  reflectionText,
  savedReflection,
  onSimComplete,
  onToggleChallenge,
  onResetSim,
  onReflectionChange,
  onSaveReflection,
  onCompleteLab,
  onSkipLab
}) => {
  const labSpec = LAB_SPECS[simulationId] || null;

  return (
    <div className="flex-1 flex flex-col animate-fade-in w-full h-full pb-10">
      <div className="flex flex-col md:flex-row gap-6 h-full min-h-[600px]">
        
        {/* Left: Lab Guide Panel */}
        <div className="w-full md:w-80 bg-surface rounded-3xl border border-border-DEFAULT shadow-lg flex flex-col overflow-hidden shrink-0 max-h-[500px] md:max-h-none">
          {labSpec ? (
            <>
              <div className="p-6 border-b border-slate-100 bg-slate-50">
                <span className="text-2xs font-bold uppercase tracking-wider text-brand-600 block mb-1">Lab Objective</span>
                <h3 className="font-bold text-text-primary leading-snug">{labSpec.objective}</h3>
              </div>
              <div className="p-6 flex-1 overflow-y-auto space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Info className="w-3 h-3" /> Baseline
                  </h4>
                  <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    {labSpec.baseline}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <CheckCircle className="w-3 h-3" /> Challenges
                  </h4>
                  <div className="space-y-3">
                    {labSpec.challenges.map(challenge => (
                      <button 
                        key={challenge.id}
                        onClick={() => !challenge.isAuto && onToggleChallenge(challenge.id)}
                        disabled={challenge.isAuto}
                        className={`w-full text-left flex items-start gap-3 p-3 rounded-xl border transition-all ${
                          completedChallenges.includes(challenge.id) 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-surface border-slate-200 hover:border-brand-200'
                        }`}
                      >
                        <div className={`mt-0.5 ${completedChallenges.includes(challenge.id) ? 'text-success' : 'text-slate-300'}`}>
                          {completedChallenges.includes(challenge.id) ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                        </div>
                        <span className={`text-sm ${completedChallenges.includes(challenge.id) ? 'text-text-primary font-medium' : 'text-slate-600'}`}>
                          {challenge.text}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {simCompleted && (
                  <div className="animate-fade-in pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 flex items-center gap-2">
                      <PenTool className="w-3 h-3" /> Engineer's Log
                    </h4>
                    <textarea
                      value={reflectionText}
                      onChange={(e) => onReflectionChange(e.target.value)}
                      onBlur={onSaveReflection}
                      placeholder="What surprised you about this simulation?"
                      className="w-full text-sm p-3 bg-surface border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 text-text-primary min-h-[80px]"
                    />
                    <div className="flex justify-end mt-1">
                      {savedReflection
                        ? <span className="text-2xs text-success font-bold flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Saved</span>
                        : reflectionText
                          ? <span className="text-2xs text-text-muted">Auto-saves on blur...</span>
                          : null
                      }
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Expected Result</h4>
                  <p className="text-sm text-text-muted italic">
                    "{labSpec.observation}"
                  </p>
                </div>
              </div>
              <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-col gap-3">
                <button 
                  onClick={onResetSim}
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-text-muted hover:text-text-primary transition-colors"
                >
                  <RefreshCcw className="w-3 h-3" /> Reset to Baseline
                </button>
                <button 
                  onClick={onCompleteLab}
                  disabled={!simCompleted}
                  className="w-full py-3 bg-brand-600 text-white rounded-xl font-bold shadow-md hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  Complete Lab <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-slate-400">
              <Info className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No lab guide available for this simulation.</p>
              <button 
                onClick={onSkipLab}
                className="mt-4 text-xs underline"
              >
                Skip Lab
              </button>
            </div>
          )}
        </div>

        {/* Right: Simulation Viewport */}
        <div className="flex-1 bg-surface rounded-3xl shadow-xl border border-border-DEFAULT overflow-hidden flex flex-col relative min-h-[500px]">
          <div className="flex-1 bg-slate-50 p-4 md:p-8 overflow-hidden flex items-center justify-center relative">
            <SimulationLoader 
              key={simKey}
              simId={simulationId} 
              lessonId={lessonId} 
              onComplete={onSimComplete} 
              Component={SimulationComponent} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabManager;
