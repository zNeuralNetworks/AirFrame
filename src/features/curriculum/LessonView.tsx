
import React, { useState, useMemo, useEffect, Suspense, lazy } from 'react';
import { Lesson, GlossaryTerm } from '../../types';
import { ChevronLeft, CheckCircle, BookOpen, Gamepad2, GraduationCap } from 'lucide-react';
import { LAB_SPECS } from '../../content/labs';
import { useUserStore, useUserActions } from '../../state/userStore';
import { track } from '../../services/telemetry';
import { getSimulationComponent } from '../simulations/SimulationRegistry';

// Lazy-loaded sub-components for performance
const BriefingView = lazy(() => import('./BriefingView'));
const LabManager = lazy(() => import('./LabManager'));
const QuizEngine = lazy(() => import('./QuizEngine'));
const GlossaryDrawer = lazy(() => import('./GlossaryDrawer'));
const Assessment = lazy(() => import('./Assessment'));

const ViewLoading: React.FC<{ label?: string }> = ({ label = "Loading module..." }) => (
  <div className="flex flex-col items-center justify-center p-20 animate-fade-in text-slate-400">
    <div className="w-8 h-8 border-2 border-slate-200 border-t-brand-500 rounded-full animate-spin mb-4" />
    <span className="text-sm font-medium">{label}</span>
  </div>
);

interface LessonViewProps {
  lessonId: string; // Switched from full object to ID for store reactivity
  onBack: () => void;
  onComplete: (lessonId: string, score: number) => void;
}

type Tab = 'briefing' | 'simulation' | 'quiz';

const LessonView: React.FC<LessonViewProps> = ({ lessonId, onBack, onComplete }) => {
  // Select lesson reactively from store
  const lesson = useUserStore(state => state.lessons.find(l => l.id === lessonId));
  
  const [activeTab, setActiveTab] = useState<Tab>('briefing');
  const [activeGlossaryTerm, setActiveGlossaryTerm] = useState<GlossaryTerm | null>(null);
  
  const [simKey, setSimKey] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [reflectionText, setReflectionText] = useState("");
  const [savedReflection, setSavedReflection] = useState(false);
  const { setSimCompleted, saveReflection, getReflection } = useUserActions();

  // Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const SimulationComponent = useMemo(() => 
    lesson?.simulationId ? getSimulationComponent(lesson.simulationId) : null, 
    [lesson?.simulationId]
  );

  useEffect(() => {
    if (!lesson) return;
    
    setActiveTab('briefing');
    setShowSummary(false);
    setQuizScore(0);
    setCurrentQuestionIndex(0);
    setIsAnswered(false);
    setSelectedOption(null);
    setActiveGlossaryTerm(null);
    setSimKey(0);
    setCompletedChallenges([]);
    
    const existingReflection = getReflection(lesson.id);
    setReflectionText(existingReflection || "");
    setSavedReflection(!!existingReflection);
    
    track('lesson_viewed', { 
        lessonId: lesson.id, 
        title: lesson.title,
        category: lesson.category 
    });
  }, [lessonId, getReflection]); // Using lessonId for identity

  // Guard for missing lesson data
  if (!lesson) return <div className="p-20 text-center text-slate-500">Lesson data synchronization error.</div>;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeGlossaryTerm) {
        setActiveGlossaryTerm(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeGlossaryTerm]);

  const handleSimCompleteTrigger = () => {
    const spec = lesson.simulationId ? LAB_SPECS[lesson.simulationId] : null;
    if (spec) {
       // Support checking multiple auto-challenges simultaneously
       const autoChalIds = spec.challenges.filter(c => c.isAuto).map(c => c.id);
       
       if (autoChalIds.length > 0) {
          const newCompleted = Array.from(new Set([...completedChallenges, ...autoChalIds]));
          setCompletedChallenges(newCompleted);
          
          // If the simulation is finished, we should unlock the 'quiz' tab even if 
          // some manual qualitative checkmarks are missing, but let's stick to the 
          // 'all requirements' rule for now but ensure auto-checks WORK.
          if (newCompleted.length === spec.challenges.length) {
              setSimCompleted(lesson.id);
              track('sim_completed', { simId: lesson.simulationId, lessonId: lesson.id });
          }
       }
    } else {
       setSimCompleted(lesson.id);
       track('sim_completed', { simId: lesson.simulationId, lessonId: lesson.id });
    }
  };

  const toggleChallenge = (id: string) => {
     const spec = lesson.simulationId ? LAB_SPECS[lesson.simulationId] : null;
     if (!spec) return;

     if (completedChallenges.includes(id)) {
        setCompletedChallenges(prev => prev.filter(c => c !== id));
     } else {
        const newCompleted = [...completedChallenges, id];
        setCompletedChallenges(newCompleted);
        if (newCompleted.length === spec.challenges.length) {
           setSimCompleted(lesson.id);
           track('sim_completed', { simId: lesson.simulationId, lessonId: lesson.id });
        }
     }
  };

  const handleResetSim = () => {
     track('sim_reset', { simId: lesson.simulationId, lessonId: lesson.id });
     setSimKey(prev => prev + 1);
     setCompletedChallenges([]);
  };

  const handleSaveReflection = () => {
      saveReflection(lesson.id, reflectionText);
      setSavedReflection(true);
      track('reflection_saved', { lessonId: lesson.id });
  };

  const handleTabChange = (tab: Tab) => {
      if (tab === 'quiz' && !lesson.simCompleted && lesson.simulationId) return;
      setActiveTab(tab);
      if (tab === 'simulation') {
          track('sim_opened', { simId: lesson.simulationId, lessonId: lesson.id });
      }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < lesson.quiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowSummary(true);
      track('lesson_completed', { lessonId: lesson.id, score: quizScore, maxScore: lesson.quiz.length });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 flex flex-col h-full relative">
      <div className="flex items-center gap-4 mb-6 sticky top-0 bg-app/95 backdrop-blur-md z-30 py-2 border-b border-border-DEFAULT">
        <button onClick={onBack} className="p-2 hover:bg-surface-highlight rounded-full transition-colors group">
          <ChevronLeft className="w-6 h-6 text-text-muted group-hover:text-text-primary" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <button
              onClick={onBack}
              className="text-2xs font-bold text-brand-500 hover:text-brand-600 hover:underline transition-colors shrink-0"
            >
              {lesson.category}
            </button>
            <span className="text-2xs text-text-muted">›</span>
            <span className="text-2xs font-bold text-text-muted truncate">{lesson.title}</span>
          </div>
          <h2 className="text-lg font-bold text-text-primary leading-none truncate">{lesson.title}</h2>
        </div>
        
        <div className="hidden md:flex gap-1 bg-white p-1 rounded-full border border-border apple-shadow">
            {[
                { id: 'briefing', label: 'Brief', icon: BookOpen },
                ...(lesson.simulationId ? [{ id: 'simulation', label: 'Lab', icon: Gamepad2 }] : []),
                { id: 'quiz', label: 'Quiz', icon: GraduationCap }
            ].map((step) => {
                const isActive = activeTab === step.id;
                const isCompleted = 
                    (step.id === 'briefing' && activeTab !== 'briefing') ||
                    (step.id === 'simulation' && lesson.simCompleted);

                return (
                    <button 
                        key={step.id} 
                        onClick={() => handleTabChange(step.id as Tab)}
                        className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all cursor-pointer disabled:cursor-not-allowed ${
                        isActive 
                            ? 'bg-brand-500 text-white apple-shadow font-bold' 
                            : isCompleted
                                ? 'text-apple-green'
                                : 'text-text-muted hover:text-text-primary'
                    }`}
                     disabled={step.id === 'quiz' && !lesson.simCompleted && !!lesson.simulationId}
                    >
                        {isCompleted ? <CheckCircle className="w-4 h-4 stroke-[2.5]" /> : <step.icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.5]'}`} />}
                        <span className="text-xs uppercase tracking-widest font-bold">{step.label}</span>
                    </button>
                )
            })}
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <Suspense fallback={<ViewLoading />}>
          {activeTab === 'briefing' && (
            <BriefingView 
              content={lesson.content}
              onSetActiveGlossaryTerm={setActiveGlossaryTerm}
              onAdvance={() => {
                  handleTabChange(lesson.simulationId ? 'simulation' : 'quiz');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              advanceLabel={lesson.simulationId ? 'Initialize Lab' : 'Start Assessment'}
            />
          )}

          {activeTab === 'simulation' && (
            <LabManager 
              lessonId={lesson.id}
              simulationId={lesson.simulationId || 'none'}
              SimulationComponent={SimulationComponent}
              simKey={simKey}
              completedChallenges={completedChallenges}
              simCompleted={lesson.simCompleted}
              reflectionText={reflectionText}
              savedReflection={savedReflection}
              onSimComplete={handleSimCompleteTrigger}
              onToggleChallenge={toggleChallenge}
              onResetSim={handleResetSim}
              onReflectionChange={(text) => {
                  setReflectionText(text);
                  setSavedReflection(false);
              }}
              onSaveReflection={handleSaveReflection}
              onCompleteLab={() => handleTabChange('quiz')}
              onSkipLab={() => setSimCompleted(lesson.id)}
            />
          )}

          {activeTab === 'quiz' && (
              lesson.id.endsWith('assessment') ? (
                  <Assessment lessonId={lesson.id} onComplete={onComplete} />
              ) : (
                  <QuizEngine 
                      questions={lesson.quiz}
                      currentQuestionIndex={currentQuestionIndex}
                      selectedOption={selectedOption}
                      isAnswered={isAnswered}
                      score={quizScore}
                      showSummary={showSummary}
                      xpReward={lesson.xpReward}
                      onOptionSelect={(idx) => { if (!isAnswered) setSelectedOption(idx); }}
                      onSubmitAnswer={() => {
                          setIsAnswered(true);
                          if (lesson.quiz[currentQuestionIndex].correctIndex === selectedOption) setQuizScore(s => s + 1);
                      }}
                      onNextQuestion={handleNextQuestion}
                      onFinalCompletion={(passed) => {
                          if (passed) {
                              onComplete(lesson.id, quizScore);
                          } else {
                              setCurrentQuestionIndex(0);
                              setSelectedOption(null);
                              setIsAnswered(false);
                              setQuizScore(0);
                              setShowSummary(false);
                          }
                      }}
                  />
              )
          )}
        </Suspense>
      </div>

      <Suspense fallback={null}>
        <GlossaryDrawer 
          term={activeGlossaryTerm} 
          onClose={() => setActiveGlossaryTerm(null)} 
        />
      </Suspense>
    </div>
  );
};

export default LessonView;
