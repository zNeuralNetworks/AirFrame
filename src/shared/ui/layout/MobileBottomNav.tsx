import React from 'react';
import { NavItem } from '../Layout';

interface MobileBottomNavProps {
  navItems: NavItem[];
  currentView: string;
  onChangeView: (view: string) => void;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ navItems, currentView, onChangeView }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-border z-50 flex justify-around p-3 pb-safe overflow-x-auto no-print">
      {navItems.map((item) => {
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onChangeView(item.id)}
            className={`flex flex-col items-center gap-1 min-w-[70px] transition-all duration-300 ${isActive ? 'text-brand-500 scale-110' : 'text-text-muted'}`}
          >
            <item.icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.5]'}`} />
            <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'opacity-100' : 'opacity-60'}`}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MobileBottomNav;
