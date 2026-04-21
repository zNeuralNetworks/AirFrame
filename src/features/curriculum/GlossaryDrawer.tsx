
import React from 'react';
import { GlossaryTerm } from '../../types';
import { Book, X, Info } from 'lucide-react';

interface GlossaryDrawerProps {
  term: GlossaryTerm | null;
  onClose: () => void;
}

const GlossaryDrawer: React.FC<GlossaryDrawerProps> = ({ term, onClose }) => {
  if (!term) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity animate-fade-in"
        onClick={onClose}
      ></div>
      <div className="fixed right-0 top-0 bottom-0 w-full md:w-96 bg-surface z-50 shadow-2xl border-l border-slate-200 p-6 flex flex-col animate-slide-in-right overflow-y-auto">
         <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
               <div className="p-4 bg-brand-50 text-brand-500 rounded-2xl apple-shadow">
                  <Book className="w-7 h-7 stroke-[2.5]" />
               </div>
               <h3 className="text-2xl font-extrabold text-text-primary tracking-tight">Glossary</h3>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-app rounded-full transition-colors">
               <X className="w-6 h-6 text-text-muted stroke-[2.5]" />
            </button>
         </div>

         <div className="flex-1 space-y-10">
            <div>
               <span className="text-xs font-bold text-text-muted uppercase tracking-widest mb-3 block">Term</span>
               <h2 className="text-5xl font-extrabold text-text-primary mb-6 tracking-tighter">{term.term}</h2>
               <p className="text-xl text-text-secondary leading-relaxed font-serif">
                  {term.definition}
               </p>
            </div>

            <div className="p-8 bg-orange-50 border border-orange-100 rounded-apple apple-shadow">
               <div className="flex items-center gap-2.5 text-apple-orange font-bold mb-3 uppercase tracking-widest text-xs">
                  <Info className="w-4 h-4 stroke-[2.5]" /> Common Misconception
               </div>
               <p className="text-orange-900 text-base leading-relaxed font-medium">
                  {term.misconception}
               </p>
            </div>
         </div>
         
         <div className="mt-auto pt-6 border-t border-slate-100">
            <button 
               onClick={onClose}
               className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors"
            >
               Close Definition
            </button>
         </div>
      </div>
    </>
  );
};

export default GlossaryDrawer;
