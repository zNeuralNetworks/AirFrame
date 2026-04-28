
import React, { useState } from 'react';
import { MessageSquarePlus } from 'lucide-react';
import Sidebar from './layout/Sidebar';
import MobileBottomNav from './layout/MobileBottomNav';
import MobileTopBar from './layout/MobileTopBar';
import FeedbackModal from './layout/FeedbackModal';
import AuthModal from '../../components/auth/AuthModal';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

export interface SearchableItem {
  id: string;
  title: string;
  category: string;
  content: string; // Used for indexing, snippet extraction
}

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onChangeView: (view: string) => void;
  navItems: NavItem[];
  title?: string;
  themeColor?: string; // Kept for API compat, but overridden by theme rules
  onExitApp?: () => void;
  onPrint?: () => void;
  searchData?: SearchableItem[];
  onSearchResultClick?: (id: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentView, 
  onChangeView, 
  navItems,
  title = "Airframe",
  onExitApp,
  onPrint,
  searchData = [],
  onSearchResultClick
}) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div data-galen-app-shell className="flex h-screen h-[100dvh] bg-app text-text-primary overflow-hidden font-sans transition-colors duration-300">
      <style>{`
        @media print {
          @page { margin: 1.5cm; size: auto; }
          body * { visibility: hidden; }
          #print-area, #print-area * { visibility: visible; }
          #print-area { position: absolute; left: 0; top: 0; width: 100%; margin: 0; padding: 0; background: white; color: black; }
          html, body { height: auto !important; overflow: visible !important; background: white !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .no-print { display: none !important; }
        }
        /* Mobile scroll fix */
        .safe-scroll {
          -webkit-overflow-scrolling: touch;
        }
      `}</style>

      <Sidebar 
        title={title}
        navItems={navItems}
        currentView={currentView}
        onChangeView={onChangeView}
        onExitApp={onExitApp}
        onPrint={onPrint}
        onAuthClick={() => setIsAuthOpen(true)}
        searchData={searchData}
        onSearchResultClick={onSearchResultClick}
      />

      <MobileBottomNav 
        navItems={navItems}
        currentView={currentView}
        onChangeView={onChangeView}
      />

      <main id="print-area" data-galen-main className="flex-1 flex flex-col min-h-0 relative h-full pb-20 md:pb-0 bg-app transition-colors duration-300">
        <MobileTopBar title={title} onExitApp={onExitApp} />
        
        <div className="w-full flex-1 min-h-0 overflow-y-auto safe-scroll">
          {children}
        </div>
      </main>

      <button 
        onClick={() => setIsFeedbackOpen(true)}
        className="no-print fixed bottom-28 md:bottom-8 right-6 md:right-8 bg-brand-500 hover:bg-brand-600 text-white rounded-full px-5 md:px-6 py-3.5 md:py-4 apple-shadow-lg hover:scale-105 active:scale-95 transition-all z-40 flex items-center gap-3 group"
        aria-label="Submit Feedback"
        title="Submit Feedback"
      >
        <MessageSquarePlus className="w-5 h-5 stroke-[2.5]" />
        <span className="font-semibold text-sm md:text-base">Feedback</span>
      </button>

      <FeedbackModal 
        isOpen={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)} 
        pageContext={currentView}
      />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
};

export default Layout;
