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
import { useUserStore, useUserActions } from '../state/userStore';
import { Lesson } from '../types';
import { LayoutDashboard, BookOpen, Compass, Settings as SettingsIcon, ClipboardCheck, Zap, BookCopy, ShieldCheck } from 'lucide-react';
import { GLOSSARY } from '../content/glossary';
import { CHEATSHEETS } from '../content/cheatsheets';

/**
 * AcademyApp is the main container for the Airframe learning experience.
 */

interface AcademyAppProps {
  onExit: () => void;
  demoMode?: boolean;
}

const DEMO_LESSON_IDS = ['1.1', '1.3', '5.1', '1.assessment'];
const ADMIN_EMAIL = "tinurajan1@gmail.com";

const AcademyApp: React.FC<AcademyAppProps> = ({ onExit, demoMode = false }) => {
  // --- State ---
  const [view, setView] = useState(demoMode ? 'learn' : 'dashboard');
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
            },
            token: 'firebase_auth'
          });
          loadLessons();
          loadGlossary();
          syncProgress();
        } else {
          useUserStore.setState({ 
            isAuthReady: true,
            // Only clear if not using legacy token (optional, but safer for transitions)
            ...(useUserStore.getState().token === 'firebase_auth' ? { currentUser: null, token: null } : {})
          });
          loadLessons();
          loadGlossary();
        }
      });

      return () => unsubscribe();
    };

    initApp();
  }, []);

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
    if (demoMode) {
      return allLessons
        .filter(l => DEMO_LESSON_IDS.includes(l.id))
        .map(l => ({ ...l, locked: false }));
    }
    return allLessons;
  }, [allLessons, demoMode]);

  // --- Navigation Config ---
  const navItems: NavItem[] = useMemo(() => {
    const items: NavItem[] = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'learn', label: demoMode ? 'Airframe Demo' : 'Airframe Labs', icon: BookOpen },
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
  }, [demoMode, isAdmin]);

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
      completeLesson(lessonId, currentLesson.xpReward, demoMode);
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

    switch (view) {
      case 'dashboard':
        return <Dashboard onContinue={() => setView('learn')} />;
      case 'learn':
        return <CourseMap lessons={mainLessons} onSelectLesson={handleSelectLesson} />;
      case 'lesson':
        return selectedLesson ? (
          <LessonView 
            lessonId={selectedLesson.id} 
            onBack={handleBackFromLesson}
            onComplete={handleLessonComplete}
          />
        ) : (
          <div className="p-10 text-center text-slate-500">Lesson not found</div>
        );
      case 'databank':
        return (
          <Databank 
            lessons={mainLessons} 
            glossary={glossary}
            onSelectLesson={handleSelectLesson}
            initialTerm={initialDatabankTerm}
            onClearInitialTerm={() => setInitialDatabankTerm(null)}
          />
        );
      case 'refresher':
        return <QuickRefresher />;
      case 'demo-copilot':
        return <DemoCopilot lessons={mainLessons} onSelectLesson={handleSelectLesson} />;
      case 'scorecard':
        return <DemoScorecard />;
      case 'settings':
        return <Settings />;
      case 'cms':
        return isAdmin ? <CMSDashboard /> : <Dashboard onContinue={() => setView('learn')} />;
      default:
        return <Dashboard onContinue={() => setView('learn')} />;
    }
  };

  const activeNavId = view === 'lesson' ? 'learn' : view;

  return (
    <Layout 
      currentView={activeNavId} 
      onChangeView={(v) => { setView(v); setSelectedLesson(null); }}
      navItems={navItems}
      title={demoMode ? "Airframe Demo" : "Airframe"}
      onExitApp={onExit}
      searchData={searchData}
      onSearchResultClick={handleSearchNavigation}
    >
      {renderContent()}
    </Layout>
  );
};

export default AcademyApp;
