
import React from 'react';
import Mascot from './Mascot';

interface ObservationBlockProps {
  title?: string;
  children: React.ReactNode;
  mascot?: boolean;
}

const ObservationBlock: React.FC<ObservationBlockProps> = ({ 
  title = "Observation", 
  children, 
  mascot = true 
}) => {
  return (
    <div className="bg-surface rounded-xl border border-slate-800 p-5 flex gap-5 items-start shadow-sm my-4">
      {mascot && (
        <div className="shrink-0 mt-1">
          <Mascot size="xs" />
        </div>
      )}
      <div className="flex-1">
        <h4 className="text-corgi-500 text-xs font-bold uppercase tracking-wider mb-2">
          {title}
        </h4>
        <div className="text-slate-300 text-sm leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ObservationBlock;
