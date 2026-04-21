
import React from 'react';
import { GlossaryTerm } from '../../types';
import { GLOSSARY } from '../../content/glossary';
import { getVisualComponent } from './visuals/VisualRegistry';
import { Info, ArrowRight } from 'lucide-react';

interface BriefingViewProps {
  content: string;
  onSetActiveGlossaryTerm: (term: GlossaryTerm) => void;
  onAdvance: () => void;
  advanceLabel: string;
}

const BriefingView: React.FC<BriefingViewProps> = ({ 
  content, 
  onSetActiveGlossaryTerm, 
  onAdvance,
  advanceLabel
}) => {
  const renderRichText = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    
    return parts.map((part, idx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={idx} className="text-text-primary font-bold bg-brand-50/50 px-1.5 py-0.5 rounded-md border border-brand-100">{part.slice(2, -2)}</strong>;
        }
        
        const techRegex = /\b([+-]?\d+\s?dB|5GHz|2\.4GHz|6GHz|802\.\d+[a-z]+)\b/gi;
        const subPartsTech = part.split(techRegex);
        
        const processGlossary = (textPart: string, pIdx: number, sIdx: number) => {
            const allTerms: string[] = [];
            GLOSSARY.forEach(t => {
              allTerms.push(t.term);
              if (t.aliases) {
                allTerms.push(...t.aliases);
              }
            });

            const sortedTerms = allTerms.sort((a, b) => b.length - a.length);
            const regex = new RegExp(`\\b(${sortedTerms.join('|')})\\b`, 'gi');
            const subParts = textPart.split(regex);
            
            return subParts.map((subPart, subSubIdx) => {
                const termObj = GLOSSARY.find(t => 
                    t.term.toLowerCase() === subPart.toLowerCase() ||
                    (t.aliases && t.aliases.find(a => a.toLowerCase() === subPart.toLowerCase()))
                );
                if (termObj) {
                    return (
                        <button 
                            key={`${pIdx}-${sIdx}-${subSubIdx}`}
                            onClick={(e) => { e.stopPropagation(); onSetActiveGlossaryTerm(termObj); }}
                            className="group relative text-brand-600 font-semibold underline decoration-brand-600/20 decoration-2 underline-offset-4 hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:decoration-brand-600 rounded-md px-0.5 transition-all text-left"
                        >
                            {subPart}
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 bg-white dark:bg-slate-900 text-text-primary text-sm rounded-2xl p-4 apple-shadow-lg border border-border opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20 text-left normal-case font-normal leading-relaxed scale-95 group-hover:scale-100 shadow-xl">
                                <strong className="block text-brand-600 mb-1.5 font-bold text-base">{termObj.term}</strong>
                                {termObj.definition}
                                <em className="block mt-3 opacity-60 text-xs text-text-muted not-italic font-semibold uppercase tracking-wider">Tap for details</em>
                            </span>
                        </button>
                    );
                }
                return <span key={`${pIdx}-${sIdx}-${subSubIdx}`}>{subPart}</span>;
            });
        };

        return subPartsTech.map((subPart, sIdx) => {
            if (subPart.match(techRegex)) {
                return (
                    <code key={`${idx}-${sIdx}`} className="font-mono bg-slate-100 text-brand-600 px-1.5 py-0.5 rounded text-[0.9em] font-bold border border-slate-200 mx-0.5 shadow-sm">
                        {subPart}
                    </code>
                );
            }
            return processGlossary(subPart, idx, sIdx);
        });
    });
  };

  const renderContent = (content: string) => {
    if (!content) return null;
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();

      if (trimmedLine.startsWith('# ')) {
        elements.push(
          <div key={`h1-${i}`} className="mb-4 mt-2 text-center">
             <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight font-sans tracking-tight uppercase">
                {renderRichText(trimmedLine.replace('# ', ''))}
             </h1>
             <div className="w-12 h-1 bg-brand-600 mx-auto mt-2 rounded-full shadow-sm"></div>
          </div>
        );
      } else if (trimmedLine.startsWith('## ')) {
        elements.push(
          <div key={`h2-${i}`} className="mb-1 mt-3 text-center">
             <h2 className="text-2xl md:text-3xl font-black text-slate-900 font-sans tracking-tight uppercase">
               {renderRichText(trimmedLine.replace('## ', ''))}
             </h2>
             <div className="w-8 h-0.5 bg-brand-200 mx-auto mt-1 rounded-full opacity-60"></div>
          </div>
        );
      } else if (trimmedLine.startsWith('### ')) {
        elements.push(
          <div key={`h3-${i}`} className="mb-2 mt-4">
             <span className="small-caps text-brand-600 text-[10px] font-bold mb-1 block opacity-80">Strategic Application</span>
             <h3 className="text-xl md:text-2xl font-bold text-slate-800 font-sans tracking-tight border-b border-slate-100 pb-1.5">
               {renderRichText(trimmedLine.replace('### ', ''))}
             </h3>
          </div>
        );
      } else if (trimmedLine.startsWith('[[Visual:') && trimmedLine.endsWith(']]')) {
        const visualId = trimmedLine.slice(9, -2);
        elements.push(
            <div key={`visual-${i}`} className="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm ring-1 ring-slate-100">
                {getVisualComponent(visualId)}
            </div>
        );
      } else if (trimmedLine.startsWith('[[BentoGrid]]')) {
        const gridItems: React.ReactNode[] = [];
        let j = i + 1;
        while (j < lines.length && (lines[j].trim().startsWith('* ') || lines[j].trim() === '')) {
            const gridLine = lines[j].trim();
            if (gridLine.startsWith('* ')) {
                const text = gridLine.substring(2);
                gridItems.push(
                    <div key={`grid-item-${j}`} className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center items-center text-center transition-all hover:bg-white hover:border-brand-200 hover:shadow-md group">
                        <div className="text-slate-800 text-sm md:text-base leading-snug font-bold">
                            {renderRichText(text)}
                        </div>
                    </div>
                );
            }
            j++;
        }
        i = j - 1;
        elements.push(
            <div key={`grid-${i}`} className="grid grid-cols-2 gap-2 my-5 animate-in zoom-in-95 duration-500">
                {gridItems}
            </div>
        );
      } else if (trimmedLine.startsWith('[[KillShot:')) {
        const text = trimmedLine.slice(11, -2);
        elements.push(
            <div key={`killshot-${i}`} className="kill-shot-card my-8 p-5 md:p-7 rounded-2xl relative overflow-hidden ring-1 ring-brand-500/20 shadow-2xl">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-500/10 rounded-full blur-2xl"></div>
                <span className="small-caps text-[10px] text-brand-400 mb-3 block">Critical Success Factor</span>
                <p className="text-xl md:text-2xl font-black text-white leading-tight tracking-tight italic">
                   {renderRichText(text)}
                </p>
            </div>
        );
      } else if (trimmedLine.startsWith('* ')) {
        const text = trimmedLine.substring(2);
        elements.push(
          <div key={`li-${i}`} className="flex items-center gap-4 mb-2 p-3 px-4 bg-slate-50/50 rounded-xl border border-slate-100 group transition-all hover:bg-white hover:border-slate-200 hover:shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-brand-500 transition-colors"></div>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed font-medium">
               {renderRichText(text)}
            </p>
          </div>
        );
      } else if (trimmedLine === '') {
        elements.push(<div key={`spacer-${i}`} className="h-0.5"></div>);
      } else {
        elements.push(
          <p key={`p-${i}`} className="text-slate-600 text-sm md:text-[0.925rem] leading-relaxed mb-2 font-sans font-medium tracking-tight">
             {renderRichText(line)}
          </p>
        );
      }
    }
    return elements;
  };

  return (
    <div className="flex-1 overflow-y-auto max-w-3xl mx-auto w-full animate-fade-in pb-32 px-4">
       <div className="bg-surface rounded-apple-lg p-6 md:p-8 shadow-sm border border-border-DEFAULT relative overflow-hidden mt-4">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50 rounded-bl-[100px] pointer-events-none opacity-60"></div>
          <div className="relative z-10 prose prose-slate max-w-none">
              {renderContent(content)}
          </div>
       </div>
       <div className="mt-12 flex justify-center sticky bottom-8">
          <button 
            onClick={onAdvance}
            className="flex items-center gap-3 px-8 py-4 bg-brand-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-brand-900/20 hover:bg-brand-700 hover:scale-105 active:scale-95 transition-all backdrop-blur-md"
          >
            {advanceLabel} 
            <ArrowRight className="w-5 h-5" />
          </button>
       </div>
    </div>
  );
};

export default BriefingView;
