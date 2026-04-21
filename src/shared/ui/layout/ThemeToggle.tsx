import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = "", showLabel = false }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className={`flex items-center justify-center gap-2 px-4 py-3 text-text-muted hover:text-text-primary hover:bg-surface border border-transparent hover:border-border-DEFAULT hover:shadow-sm rounded-xl transition-all text-sm font-medium ${className}`}
    >
      {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      {showLabel && (theme === 'dark' ? 'Light Mode' : 'Dark Mode')}
    </button>
  );
};

export default ThemeToggle;
