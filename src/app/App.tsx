
import React, { useState } from 'react';
import AcademyApp from './AcademyApp';
import DesignSystem from './DesignSystem';
import HeroPage from '../features/landing/HeroPage';

type AppMode = 'landing' | 'launcher' | 'airframe' | 'design';

function App() {
  const [mode, setMode] = useState<AppMode>('landing');

  if (mode === 'landing') {
    return <HeroPage onEnter={() => setMode('airframe')} />;
  }

  if (mode === 'airframe') {
    return <AcademyApp onExit={() => setMode('launcher')} />;
  }

  if (mode === 'design') {
    return <DesignSystem onExit={() => setMode('launcher')} />;
  }

  // Launcher (Dashboard) State
  return (
    <div className="min-h-screen bg-app flex flex-col items-center p-6 font-sans relative overflow-y-auto">
      {/* Background Ambience - Light Theme */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-200/40 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-100/60 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-5xl w-full relative z-10 my-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight mb-3">
            Mission Control
          </h1>
          <p className="text-text-muted font-medium text-lg">Select your flight path.</p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          {/* Airframe Labs Card */}
          <button 
            onClick={() => setMode('airframe')}
            className="group relative bg-surface border border-border rounded-3xl p-8 text-left transition-all duration-300 hover:scale-[1.02] hover:border-brand-500/50 hover:shadow-[0_0_40px_rgba(14,165,233,0.15)] flex flex-col h-80"
          >
            <div className="mb-6 p-4 bg-brand-500/10 rounded-2xl w-fit group-hover:bg-brand-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600 group-hover:text-white"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">Airframe Labs</h2>
            <p className="text-text-secondary mb-8 flex-1 text-sm leading-relaxed font-medium">
              The complete certification track. Interactive wireless engineering simulations, assessments, and field demos.
            </p>
            <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-wider group-hover:gap-3 transition-all">
              Enter Labs <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </div>
          </button>

          {/* Design System Card */}
          <button 
            onClick={() => setMode('design')}
            className="group relative bg-surface border border-border rounded-3xl p-8 text-left transition-all duration-300 hover:scale-[1.02] hover:border-slate-500/50 hover:shadow-[0_0_40px_rgba(148,163,184,0.15)] flex flex-col h-80"
          >
            <div className="mb-6 p-4 bg-app rounded-2xl w-fit group-hover:bg-slate-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600 group-hover:text-white"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">Design System</h2>
            <p className="text-text-secondary mb-8 flex-1 text-sm leading-relaxed font-medium">
              Internal documentation for UI patterns, product strategy, mascot identity, and visual systems.
            </p>
            <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-wider group-hover:gap-3 transition-all">
              View Reference <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
