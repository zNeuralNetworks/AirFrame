import React, { useState } from 'react';
import { Radio, ArrowLeft, Printer, User, LogOut, ShieldCheck, MoreHorizontal } from 'lucide-react';
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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const email = currentUser?.email?.toLowerCase() || '';
  const isAdmin = email === ADMIN_EMAIL || email.endsWith('@arista.com');
  const xpInLevel = user.totalXp % 500;
  const xpProgressPct = Math.round((xpInLevel / 500) * 100);

  return (
    <aside className="hidden md:flex flex-col w-64 bg-surface-sidebar backdrop-blur-2xl border-r border-border no-print z-20 transition-all duration-500">
      <div className="px-5 py-4 flex items-center gap-3">
        <div className="bg-brand-500 p-2 rounded-xl transition-all shadow-lg shadow-brand-500/20">
          <Radio className="text-white w-5 h-5" />
        </div>
        <h1 className="text-lg font-bold text-text-primary">
          {title}
        </h1>
      </div>

      <div className="px-3 mb-3">
        <SearchBar searchData={searchData} onSearchResultClick={onSearchResultClick} />
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item, index) => {
          const isActive = currentView === item.id;
          return (
            <React.Fragment key={item.id}>
              {index === 3 && (
                <div className="mx-3 my-2 h-px bg-border/50" />
              )}
              <button
                onClick={() => onChangeView(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-300 font-semibold text-sm ${
                  isActive
                    ? 'bg-surface text-brand-500 apple-shadow'
                    : 'text-text-secondary hover:bg-surface/50 hover:text-text-primary'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5] text-brand-500' : 'stroke-[1.5]'}`} />
                {item.label}
              </button>
            </React.Fragment>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border space-y-1.5">
        {currentUser ? (
          <div className="relative rounded-xl border border-border/60 bg-surface/70 px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsUserMenuOpen((open) => !open)}
                className="w-9 h-9 shrink-0 bg-brand-500/10 text-brand-600 rounded-xl flex items-center justify-center hover:bg-brand-500/15 transition-colors"
                aria-label="Open learner menu"
                aria-expanded={isUserMenuOpen}
              >
                <User className="w-4 h-4" />
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-brand-600 truncate">{user.username || 'Learner'}</p>
                  {user.isApproved && (
                    <div className="flex shrink-0 items-center gap-0.5 px-1.5 py-0.5 bg-brand-500/10 text-brand-600 rounded text-[10px] font-semibold uppercase border border-brand-500/20">
                      <ShieldCheck className="w-2.5 h-2.5" />
                      Arista
                    </div>
                  )}
                </div>
                <p className="text-sm font-semibold text-text-primary truncate">{currentUser.email}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen((open) => !open)}
                className="w-8 h-8 shrink-0 rounded-lg text-text-muted hover:text-text-primary hover:bg-app flex items-center justify-center transition-colors"
                aria-label="Learner actions"
                aria-expanded={isUserMenuOpen}
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between text-[10px] font-bold text-text-muted">
                <span>Lv {user.level} · {user.completedLessonIds.length} lessons</span>
                <span>{user.totalXp} XP</span>
              </div>
              <div className="h-1 bg-app rounded-full overflow-hidden">
                <div className="h-full bg-brand-500 rounded-full transition-all duration-500" style={{ width: `${xpProgressPct}%` }} />
              </div>
            </div>

            {isUserMenuOpen && (
              <div className="absolute left-3 right-3 bottom-[calc(100%+0.5rem)] z-30 overflow-hidden rounded-xl border border-border bg-surface apple-shadow">
                <button
                  type="button"
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    actions.logout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-apple-red hover:bg-apple-red/10 transition-colors text-sm font-semibold"
                >
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={onAuthClick}
            className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-brand-500 text-white rounded-2xl apple-shadow hover:bg-brand-600 hover:scale-[1.02] active:scale-[0.98] transition-all font-semibold text-sm"
          >
            <User className="w-5 h-5" /> Sign In / Up
          </button>
        )}

        <ThemeToggle showLabel />

        {onPrint && (
          <button 
            type="button"
            onClick={onPrint}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3 text-text-muted hover:text-text-primary hover:bg-surface/50 rounded-2xl transition-all text-xs font-semibold uppercase tracking-wider"
          >
            <Printer className="w-4 h-4" /> Print / Save PDF
          </button>
        )}

        {onExitApp && isAdmin && (
          <button
            onClick={onExitApp}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3 text-text-muted hover:text-text-primary hover:bg-surface/50 rounded-2xl transition-all text-xs font-semibold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" /> Switch App
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
