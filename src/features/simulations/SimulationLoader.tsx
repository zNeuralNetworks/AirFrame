import React, { Suspense } from 'react';
import SimulationErrorBoundary from './SimulationErrorBoundary';

interface SimulationLoaderProps {
  simId: string;
  lessonId?: string;
  onComplete: () => void;
  Component: React.LazyExoticComponent<React.FC<{ onComplete: () => void }>> | null;
}

const SimulationLoading: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-slate-500 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 animate-pulse">
    <div className="w-12 h-12 border-4 border-slate-200 border-t-brand-500 rounded-full animate-spin mb-4"></div>
    <h3 className="text-lg font-bold text-slate-700">Initializing Lab...</h3>
    <p className="text-sm font-medium text-slate-400">Calibrating virtual environment</p>
  </div>
);

/**
 * SimulationLoader provides a standardized way to render interactive simulations
 * with consistent loading states and error handling.
 */
const SimulationLoader: React.FC<SimulationLoaderProps> = ({ simId, lessonId, onComplete, Component }) => {
  if (!Component) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-8 bg-slate-50 rounded-2xl border border-slate-200 text-center">
        <div className="p-4 bg-slate-100 rounded-full mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <h3 className="text-lg font-bold text-slate-800">Simulation Not Found</h3>
        <p className="text-sm text-slate-500 max-w-xs mx-auto">
          The lab module <code className="text-brand-600 font-mono">{simId}</code> is not registered in the current system build.
        </p>
      </div>
    );
  }

  return (
    <SimulationErrorBoundary simId={simId} lessonId={lessonId}>
      <Suspense fallback={<SimulationLoading />}>
        <Component onComplete={onComplete} />
      </Suspense>
    </SimulationErrorBoundary>
  );
};

export default SimulationLoader;
