
import React from 'react';
import { Question } from '../../types';
import { Info, CheckCircle, XCircle, ArrowRight, Award } from 'lucide-react';
import Mascot from '../../shared/ui/Mascot';

interface QuizEngineProps {
  questions: Question[];
  currentQuestionIndex: number;
  selectedOption: number | null;
  isAnswered: boolean;
  score: number;
  showSummary: boolean;
  xpReward: number;
  onOptionSelect: (index: number) => void;
  onSubmitAnswer: () => void;
  onNextQuestion: () => void;
  onFinalCompletion: (passed: boolean) => void;
}

const QuizEngine: React.FC<QuizEngineProps> = ({
  questions,
  currentQuestionIndex,
  selectedOption,
  isAnswered,
  score,
  showSummary,
  xpReward,
  onOptionSelect,
  onSubmitAnswer,
  onNextQuestion,
  onFinalCompletion
}) => {
  const currentQuestion = questions[currentQuestionIndex];
  const passed = score >= questions.length / 2;

  if (showSummary) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-scale-in p-4">
        <div className="max-w-md w-full p-8 bg-surface rounded-4xl shadow-2xl border border-border-DEFAULT text-center relative overflow-hidden">
          {passed && <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-success to-brand-500"></div>}
          {!passed && <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-error to-orange-500"></div>}
          
          <div className="mb-6 flex justify-center">
            <div className={`w-32 h-32 rounded-full flex items-center justify-center border-4 ${passed ? 'bg-emerald-50 border-success/30' : 'bg-red-50 border-error/30'}`}>
                <Mascot size="md" expression={passed ? 'excited' : 'confused'} />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-2 text-text-primary">{passed ? 'Mission Accomplished!' : 'Mission Failed'}</h2>
          <p className="text-text-muted mb-8 text-lg">Score: <span className={passed ? "font-bold text-success" : "font-bold text-error"}>{score}</span> / {questions.length}</p>
          
          {passed && (
            <div className="bg-corgi-500/10 border border-corgi-500/20 rounded-2xl p-6 mb-8 flex flex-col items-center gap-2">
               <span className="text-corgi-600 text-xs font-bold uppercase tracking-wider">Rewards</span>
              <p className="text-2xl font-bold text-corgi-600 flex items-center justify-center gap-2">
                <Award className="w-6 h-6 fill-corgi-500" /> +{xpReward} XP
              </p>
            </div>
          )}

          <button 
            onClick={() => onFinalCompletion(passed)}
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all ${passed ? 'bg-brand-600 text-white hover:bg-brand-700 shadow-brand-900/20' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}
          >
            {passed ? 'Return to Base' : 'Retry'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto flex flex-col animate-fade-in max-w-2xl mx-auto w-full pb-20 pt-10 px-4">
      <div className="bg-surface rounded-4xl p-8 md:p-12 shadow-xl border border-border-DEFAULT relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
          <div 
            className="h-full bg-brand-500 transition-all duration-500 ease-out"
            style={{ width: `${((currentQuestionIndex + (isAnswered ? 1 : 0)) / questions.length) * 100}%` }}
          ></div>
        </div>

        <div className="mb-8 mt-2">
          <div className="flex justify-between items-center mb-6">
            <span className="text-2xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
                Question {currentQuestionIndex + 1} / {questions.length}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-text-primary leading-snug">{currentQuestion.text}</h3>
        </div>

        <div className="space-y-4">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = currentQuestion.correctIndex === idx;
            
            let styles = "border-border hover:border-brand-300 hover:bg-app text-text-secondary";
            let icon = <div className="w-6 h-6 rounded-full border-2 border-border group-hover:border-brand-500 transition-all"></div>;
            
            if (isAnswered) {
              if (isCorrect) {
                  styles = "bg-green-50 border-apple-green text-apple-green ring-1 ring-apple-green";
                  icon = <CheckCircle className="w-6 h-6 text-apple-green stroke-[2.5]" />;
              } else if (isSelected && !isCorrect) {
                  styles = "bg-red-50 border-apple-red text-apple-red ring-1 ring-apple-red";
                  icon = <XCircle className="w-6 h-6 text-apple-red stroke-[2.5]" />;
              } else {
                  styles = "opacity-40 border-border";
              }
            } else if (isSelected) {
              styles = "border-brand-500 bg-brand-50 text-brand-500 ring-1 ring-brand-500 apple-shadow";
              icon = <div className="w-6 h-6 rounded-full border-[7px] border-brand-500 bg-white shadow-inner"></div>;
            }

            return (
              <button
                key={idx}
                onClick={() => onOptionSelect(idx)}
                disabled={isAnswered}
                className={`w-full text-left p-5 rounded-2xl border-2 font-medium transition-all duration-200 group flex items-center justify-between ${styles}`}
              >
                <span className="text-lg">{option}</span>
                {icon}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="mt-8 p-6 bg-brand-50 text-slate-700 rounded-2xl border border-brand-200 animate-slide-up flex gap-4">
            <div className="p-2 bg-surface rounded-lg h-fit border border-brand-100 shadow-sm">
              <Info className="w-5 h-5 text-brand-600" />
            </div>
            <div className="text-base leading-relaxed">
              <strong className="block mb-1 text-brand-700 font-bold uppercase text-xs tracking-wide">Explanation</strong> 
              {currentQuestion.explanation}
            </div>
          </div>
        )}

        <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end">
          {!isAnswered ? (
            <button 
              onClick={onSubmitAnswer}
              disabled={selectedOption === null}
              className="px-10 py-4 bg-brand-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-brand-900/10 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-700 hover:scale-105 active:scale-95 transition-all w-full md:w-auto"
            >
              Submit Answer
            </button>
          ) : (
            <button 
              onClick={onNextQuestion}
              className="px-10 py-4 bg-surface text-slate-900 rounded-xl font-bold text-lg shadow-md border border-slate-200 hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all w-full md:w-auto flex items-center justify-center gap-2"
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'} <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizEngine;
