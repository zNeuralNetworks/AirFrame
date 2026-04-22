import React from 'react';
import { Radio, ArrowLeft, Printer, User, LogOut, ShieldCheck } from 'lucide-react';
import { NavItem, SearchableItem } from '../Layout';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';
import { useUserStore } from '../../../state/userStore';

interface SidebarProps {
  title: string;
  navItems: NavItem[];
  currentView: string;
  onChangeView: (view: string) => void;
  onExitApp?: () => void;
  onPrint?: () => void;
  onAuthClick?: () => void;
  searchData: SearchableItem[];
  onSearchResultClick?: (id: string) => void;
}

const ADMIN_EMAIL = 'tinurajan1@gmail.com';

const Sidebar: React.FC<SidebarProps> = ({
  title,
  navItems,
  currentView,
  onChangeView,
  onExitApp,
  onPrint,
  onAuthClick,
  searchData,
  onSearchResultClick
}) => {
  const { currentUser, actions, user } = useUserStore();
  const email = currentUser?.email?.toLowerCase() || '';
  const isAdmin = email === ADMIN_EMAIL || email.endsWith('@arista.com');

  return (
    <aside className="hidden md:flex flex-col w-72 bg-surface-sidebar backdrop-blur-2xl border-r border-border no-print z-20 transition-all duration-500">
      <div className="p-8 flex items-center gap-4">
        <div className="bg-brand-500 p-2.5 rounded-2xl transition-all shadow-lg shadow-brand-500/20">
          <Radio className="text-white w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">
          {title}
        </h1>
      </div>

      <div className="px-4 mb-6">
        <SearchBar searchData={searchData} onSearchResultClick={onSearchResultClick} />
      </div>

      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-apple transition-all duration-300 font-semibold text-sm ${
                isActive 
                  ? 'bg-surface text-brand-500 apple-shadow scale-[1.02]' 
                  : 'text-text-secondary hover:bg-surface/50 hover:text-text-primary'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5] text-brand-500' : 'stroke-[1.5]'}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-6 border-t border-border space-y-3">
        {currentUser ? (
          <div className="flex flex-col gap-2 p-4 bg-surface rounded-apple border border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-500/10 text-brand-600 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-black text-brand-600 uppercase tracking-widest mb-0.5">{user.username || 'Learner'}</p>
                  {user.isApproved && (
                    <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-brand-500/10 text-brand-600 rounded text-[9px] font-black uppercase tracking-tighter border border-brand-500/20">
                      <ShieldCheck className="w-2.5 h-2.5" />
                      Arista
                    </div>
                  )}
                </div>
                <p className="text-sm font-bold text-text-primary truncate">{currentUser.email}</p>
              </div>
            </div>
            <button
              onClick={() => actions.logout()}
              className="mt-2 w-full flex items-center justify-center gap-2 py-2 text-apple-red hover:bg-apple-red/10 rounded-lg transition-all text-xs font-bold uppercase"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={onAuthClick}
            className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-brand-500 text-white rounded-apple apple-shadow hover:bg-brand-600 hover:scale-[1.02] active:scale-[0.98] transition-all font-bold text-sm"
          >
            <User className="w-5 h-5" /> Sign In / Up
          </button>
        )}

        <ThemeToggle showLabel />

        {onPrint && (
          <button 
            type="button"
            onClick={onPrint}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 text-text-muted hover:text-text-primary hover:bg-surface/50 rounded-apple transition-all text-xs font-bold uppercase tracking-wider"
          >
            <Printer className="w-4 h-4" /> Print / Save PDF
          </button>
        )}

        {onExitApp && isAdmin && (
          <button
            onClick={onExitApp}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 text-text-muted hover:text-text-primary hover:bg-surface/50 rounded-apple transition-all text-xs font-bold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" /> Switch App
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
