import React from 'react';
import ThemeToggle from './ThemeToggle';

interface MobileTopBarProps {
  title: string;
  onExitApp?: () => void;
}

const MobileTopBar: React.FC<MobileTopBarProps> = ({ title, onExitApp }) => {
  return (
    <div className="md:hidden p-4 glass sticky top-0 z-40 flex items-center justify-between no-print">
      <div className="font-extrabold text-text-primary tracking-tight">{title}</div>
      <div className="flex gap-3 items-center">
        <ThemeToggle className="p-2 rounded-full bg-app/50 border border-border" />
        {onExitApp && (
          <button 
            onClick={onExitApp} 
            className="text-xs text-text-muted font-bold uppercase tracking-widest border border-border px-4 py-1.5 rounded-full bg-app/50"
          >
            Exit
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileTopBar;
