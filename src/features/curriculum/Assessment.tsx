
import React, { useState } from 'react';
import { SCENARIOS } from '../../content/scenarios';
import { useUserActions } from '../../state/userStore';
import { track } from '../../services/telemetry';
import { CheckCircle2, XCircle, AlertTriangle, ArrowRight, Award } from 'lucide-react';
import Mascot from '../../shared/ui/Mascot';

interface AssessmentProps {
  lessonId: string;
  onComplete: (id: string, score: number) => void;
}

const Assessment: React.FC<AssessmentProps> = ({ lessonId, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const { recordQuizAttempt } = useUserActions();

  const questions = SCENARIOS[lessonId] || [];

  const handleSelect = (idx: number) => {
    if (!isAnswered) setSelectedOption(idx);
  };

  const handleSubmit = () => {
    setIsAnswered(true);
    if (selectedOption === questions[currentIndex].correctIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      const isCorrect = selectedOption === questions[currentIndex].correctIndex;
      const finalScore = score + (isCorrect ? 1 : 0);
      
      track('assessment_submitted', { lessonId, score: finalScore, maxScore: questions.length });
      recordQuizAttempt(lessonId, finalScore, questions.length);
      
      if (isCorrect) {
          setScore(s => s + 1);
      }
      setShowSummary(true);
    }
  };

  if (questions.length === 0) {
    return <div className="p-8 text-center text-text-muted">No assessment data found for {lessonId}.</div>;
  }

  if (showSummary) {
    const isPass = score >= 2;

    return (
      <div className="bg-surface rounded-[2rem] p-8 shadow-xl border border-border-DEFAULT text-center max-w-lg mx-auto">
         <div className="flex justify-center mb-6">
            <div className={`p-6 rounded-full ${isPass ? 'bg-success/20' : 'bg-error/20'}`}>
               <Mascot size="md" expression={isPass ? 'excited' : 'confused'} outfit={isPass ? 'engineer' : 'none'} />
            </div>
         </div>
         
         <h2 className="text-3xl font-bold text-white mb-2">{isPass ? 'Field Ready!' : 'Back to Training'}</h2>
         <p className="text-text-secondary mb-8">You scored {score} out of {questions.length}</p>

         <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-surface-highlight rounded-xl border border-border-DEFAULT">
               <div className="text-xs text-text-muted uppercase font-bold">Accuracy</div>
               <div className="text-2xl font-bold text-white">{Math.round((score/questions.length)*100)}%</div>
            </div>
            <div className="p-4 bg-surface-highlight rounded-xl border border-border-DEFAULT">
               <div className="text-xs text-text-muted uppercase font-bold">XP Earned</div>
               <div className="text-2xl font-bold text-brand-500">+{score * 50}</div>
            </div>
         </div>

         <button 
            onClick={() => onComplete(lessonId, score)}
            className="w-full py-4 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-500 transition-all flex items-center justify-center gap-2 shadow-lg"
         >
            {isPass ? 'Return to Base' : 'Retry Module'}
         </button>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="max-w-3xl mx-auto">
       <div className="mb-8 flex gap-2">
          {questions.map((_, idx) => (
             <div key={idx} className={`h-2 flex-1 rounded-full transition-colors ${
                idx < currentIndex ? 'bg-brand-500' : 
                idx === currentIndex ? 'bg-brand-700' : 'bg-surface-highlight'
             }`}></div>
          ))}
       </div>

       <div className="bg-surface rounded-[2rem] p-8 md:p-10 shadow-xl border border-border-DEFAULT relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-500 to-indigo-600"></div>
          
          <div className="flex items-start gap-4 mb-6">
             <div className="p-3 bg-brand-900/30 text-brand-500 rounded-xl shrink-0">
                <AlertTriangle className="w-6 h-6" />
             </div>
             <div>
                <span className="text-xs font-bold text-brand-500 uppercase tracking-wider block mb-1">Scenario {currentIndex + 1}</span>
                <h3 className="text-xl font-bold text-white leading-snug">{currentQ.scenario}</h3>
             </div>
          </div>

          <div className="space-y-3">
             {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = currentQ.correctIndex === idx;
                
                let style = "border-border-DEFAULT hover:border-brand-500/50 hover:bg-surface-highlight text-text-secondary";
                if (isAnswered) {
                   if (isCorrect) style = "border-success bg-success/10 text-success ring-1 ring-success";
                   else if (isSelected) style = "border-error bg-error/10 text-error";
                   else style = "border-border-DEFAULT opacity-30";
                } else if (isSelected) {
                   style = "border-brand-500 bg-brand-900/20 ring-1 ring-brand-500 text-white";
                }

                return (
                   <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      disabled={isAnswered}
                      className={`w-full text-left p-5 rounded-xl border-2 font-medium transition-all ${style} flex justify-between items-center group`}
                   >
                      <span>{opt}</span>
                      {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-success" />}
                      {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-error" />}
                   </button>
                );
             })}
          </div>

          {isAnswered && (
             <div className="mt-6 p-5 bg-brand-900/20 text-brand-100 rounded-xl border border-brand-500/30 animate-slide-up">
                <div className="font-bold text-xs uppercase tracking-wider text-brand-400 mb-2">Debrief</div>
                <p className="text-sm leading-relaxed">{currentQ.explanation}</p>
             </div>
          )}

          <div className="mt-8 pt-6 border-t border-border-DEFAULT flex justify-end">
             {!isAnswered ? (
                <button 
                   onClick={handleSubmit}
                   disabled={selectedOption === null}
                   className="px-8 py-3 bg-brand-600 text-white rounded-xl font-bold shadow-lg shadow-brand-900/30 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all"
                >
                   Commit Answer
                </button>
             ) : (
                <button 
                   onClick={handleNext}
                   className="px-8 py-3 bg-surface-highlight text-white rounded-xl font-bold shadow-lg border border-border-DEFAULT hover:bg-border-highlight transition-all flex items-center gap-2"
                >
                   Next Scenario <ArrowRight className="w-4 h-4" />
                </button>
             )}
          </div>
       </div>
    </div>
  );
};

export default Assessment;
