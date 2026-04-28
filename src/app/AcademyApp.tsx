import React, { useState, useEffect, useMemo } from 'react';
import Layout, { NavItem, SearchableItem } from '../shared/ui/Layout';
import Dashboard from '../features/dashboard/Dashboard';
import CourseMap from '../features/curriculum/CourseMap';
import LessonView from '../features/curriculum/LessonView';
import DemoCopilot from '../features/demo/DemoCopilot';
import DemoScorecard from '../features/dashboard/DemoScorecard';
import Settings from '../features/dashboard/Settings';
import QuickRefresher from '../features/demo/QuickRefresher';
import Databank from '../features/dashboard/Databank';
import CMSDashboard from '../features/cms/CMSDashboard';
import AuthModal from '../components/auth/AuthModal';
import { useUserStore, useUserActions } from '../state/userStore';
import { Lesson } from '../types';
import { LayoutDashboard, BookOpen, Compass, Settings as SettingsIcon, ClipboardCheck, Zap, BookCopy, ShieldCheck, Lock } from 'lucide-react';
import { GLOSSARY } from '../content/glossary';
import { CHEATSHEETS } from '../content/cheatsheets';

const AuthWall: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center h-full p-12 text-center gap-8 select-none">
      <div className="p-6 bg-brand-500/10 rounded-[32px] border border-brand-500/20">
        <Lock className="w-16 h-16 text-brand-500" />
      </div>
      <div className="space-y-3 max-w-sm">
        <h2 className="text-3xl font-extrabold text-text-primary tracking-tight">Sign in to fly</h2>
        <p className="text-text-muted text-lg font-medium leading-relaxed">
          Create a free account to access all labs, track your progress, and earn your certification.
        </p>
      </div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-10 py-5 bg-brand-500 text-white rounded-apple font-bold text-lg hover:bg-brand-600 transition-all hover:scale-105 active:scale-95 apple-shadow-lg"
      >
        Sign In / Create Account
      </button>
      <AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

/**
 * AcademyApp is the main container for the Airframe learning experience.
 */

interface AcademyAppProps {
  onExit: () => void;
}

const ADMIN_EMAIL = "tinurajan1@gmail.com";
const isE2EAuthEnabled = import.meta.env.VITE_AIRFRAME_E2E_AUTH === '1';
const GALEN_VIEWS = new Set([
  'dashboard',
  'learn',
  'databank',
  'refresher',
  'demo-copilot',
  'scorecard',
  'settings',
  'cms',
]);

const getInitialView = () => {
  if (!isE2EAuthEnabled) return 'dashboard';
  const view = new URLSearchParams(window.location.search).get('galenView');
  return view && GALEN_VIEWS.has(view) ? view : 'dashboard';
};

const wrapGalenPage = (id: string, content: React.ReactNode) => (
  <div data-galen-page={id} className="min-h-full">
    {content}
  </div>
);

const AcademyApp: React.FC<AcademyAppProps> = ({ onExit }) => {
  // --- State ---
  const [view, setView] = useState(getInitialView);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [initialDatabankTerm, setInitialDatabankTerm] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // --- Store Hooks ---
  const allLessons = useUserStore(state => state.lessons);
  const glossary = useUserStore(state => state.glossary);
  const isLoading = useUserStore(state => state.isLoading);
  const isAuthReady = useUserStore(state => state.isAuthReady);
  const currentUser = useUserStore(state => state.currentUser);
  const { completeLesson, loadLessons, loadGlossary, syncProgress } = useUserActions();

  // --- Effects ---
  useEffect(() => {
    if (isE2EAuthEnabled) {
      useUserStore.setState((state) => ({
        isAuthReady: true,
        isLoading: false,
        currentUser: {
          id: 'e2e-user',
          uid: 'e2e-user',
          email: 'e2e@arista.com'
        },
        user: {
          ...state.user,
          isApproved: true
        }
      }));
      return;
    }

    const initApp = async () => {
      const { auth, onAuthStateChanged } = await import('../lib/firebase');
      
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          useUserStore.setState({ 
            isAuthReady: true,
            currentUser: {
              id: user.uid,
              uid: user.uid,
              email: user.email || ''
            }
          });
          loadLessons();
          loadGlossary();
          syncProgress();
        } else {
          useUserStore.setState({ 
            isAuthReady: true,
            currentUser: null
          });
          loadLessons();
          loadGlossary();
        }
      });

      return () => unsubscribe();
    };

    initApp();
  }, [loadGlossary, loadLessons, syncProgress]);

  useEffect(() => {
    const email = currentUser?.email?.toLowerCase() || '';
    if (email === ADMIN_EMAIL || email.endsWith('@arista.com')) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [currentUser]);

  // --- Derived State ---
  const mainLessons = useMemo(() => {
    return allLessons;
  }, [allLessons]);

  // --- Navigation Config ---
  const navItems: NavItem[] = useMemo(() => {
    const items: NavItem[] = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'learn', label: 'Airframe Academy', icon: BookOpen },
      { id: 'databank', label: 'Databank', icon: BookCopy },
      { id: 'refresher', label: 'Refresher', icon: Zap },
      { id: 'demo-copilot', label: 'Demo Co-Pilot', icon: Compass },
      { id: 'scorecard', label: 'Demo Scorecard', icon: ClipboardCheck },
      { id: 'settings', label: 'Settings', icon: SettingsIcon },
    ];

    if (isAdmin) {
      items.push({ id: 'cms', label: 'CMS', icon: ShieldCheck });
    }

    return items;
  }, [isAdmin]);

  // --- Search Indexing ---
  const searchData: SearchableItem[] = useMemo(() => {
    const lessonItems = mainLessons.map(l => ({ 
      id: l.id, 
      title: l.title, 
      category: l.category, 
      content: `${l.description} ${l.content}` 
    }));
    
    const glossaryItems = glossary.map(g => ({ 
      id: g.term, 
      title: g.term, 
      category: 'Glossary', 
      content: `${g.definition} ${g.misconception}` 
    }));
    
    const cheatsheetItems = CHEATSHEETS.map(c => ({ 
      id: c.id, 
      title: c.title, 
      category: 'Cheatsheet', 
      content: `${c.description} ${c.content.map(s => `${s.title} ${s.points.join(" ")}`).join(" ")}` 
    }));
    
    return [...lessonItems, ...glossaryItems, ...cheatsheetItems];
  }, [mainLessons, glossary]);

  // --- Handlers ---
  const handleSelectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setView('lesson');
  };

  const handleSearchNavigation = (itemId: string) => {
    const lesson = mainLessons.find(l => l.id === itemId);
    const glossaryItem = glossary.find(g => g.term === itemId);
    
    if (lesson) {
      handleSelectLesson(lesson);
    } else if (glossaryItem) {
      setInitialDatabankTerm(glossaryItem.term);
      setView('databank');
    } else {
      // Default to databank for cheatsheets or other items
      setView('databank');
    }
  };

  const handleLessonComplete = (lessonId: string, score: number) => {
    const currentLesson = mainLessons.find(l => l.id === lessonId);
    if (currentLesson) {
      completeLesson(lessonId, currentLesson.xpReward);
    }
    setView('learn');
    setSelectedLesson(null);
  };

  const handleBackFromLesson = () => {
    setView('learn');
    setSelectedLesson(null);
  };

  // --- Render Helpers ---
  const renderContent = () => {
    if ((isLoading && allLessons.length === 0) || !isAuthReady) {
      return (
        <div className="flex items-center justify-center h-full text-slate-400">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600 mr-3"></div>
          Loading Academy...
        </div>
      );
    }

    if (!currentUser) {
      return wrapGalenPage('auth', <AuthWall />);
    }

    switch (view) {
      case 'dashboard':
        return wrapGalenPage('dashboard', <Dashboard onContinue={() => setView('learn')} />);
      case 'learn':
        return wrapGalenPage('learn', <CourseMap lessons={mainLessons} onSelectLesson={handleSelectLesson} />);
      case 'lesson':
        return wrapGalenPage('lesson', selectedLesson ? (
          <LessonView 
            lessonId={selectedLesson.id} 
            onBack={handleBackFromLesson}
            onComplete={handleLessonComplete}
          />
        ) : (
          <div className="p-10 text-center text-slate-500">Lesson not found</div>
        ));
      case 'databank':
        return wrapGalenPage('databank', (
          <Databank 
            lessons={mainLessons} 
            glossary={glossary}
            onSelectLesson={handleSelectLesson}
            initialTerm={initialDatabankTerm}
            onClearInitialTerm={() => setInitialDatabankTerm(null)}
          />
        ));
      case 'refresher':
        return wrapGalenPage('refresher', <QuickRefresher />);
      case 'demo-copilot':
        return wrapGalenPage('demo-copilot', <DemoCopilot lessons={mainLessons} onSelectLesson={handleSelectLesson} />);
      case 'scorecard':
        return wrapGalenPage('scorecard', <DemoScorecard />);
      case 'settings':
        return wrapGalenPage('settings', <Settings />);
      case 'cms':
        return wrapGalenPage('cms', isAdmin ? <CMSDashboard /> : <Dashboard onContinue={() => setView('learn')} />);
      default:
        return wrapGalenPage('dashboard', <Dashboard onContinue={() => setView('learn')} />);
    }
  };

  const activeNavId = view === 'lesson' ? 'learn' : view;

  return (
    <Layout 
      currentView={activeNavId} 
      onChangeView={(v) => { setView(v); setSelectedLesson(null); }}
      navItems={navItems}
      title="Airframe"
      onExitApp={onExit}
      searchData={searchData}
      onSearchResultClick={handleSearchNavigation}
    >
      {renderContent()}
    </Layout>
  );
};

export default AcademyApp;
