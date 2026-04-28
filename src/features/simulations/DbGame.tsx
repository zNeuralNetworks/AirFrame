
import React, { useState, useEffect } from 'react';
import { Calculator, CheckCircle2, RefreshCw, ArrowRight } from 'lucide-react';
import ObservationBlock from '../../shared/ui/ObservationBlock';
import { applyDb, isLevelComplete } from './dbGameLogic';

interface DbGameProps {
  onComplete: () => void;
}

const LEVELS = [
  { startMw: 100, targetMw: 50, moves: 3 }, // 100 -> -3dB = 50
  { startMw: 10, targetMw: 200, moves: 3 }, // 10 -> +10dB -> +3dB = 200
  { startMw: 4, targetMw: 1, moves: 4 }, // 4 -> -3dB -> -3dB = 1
  { startMw: 100, targetMw: 25, moves: 4 }, // 100 -> -3 -> -3 = 25
];

const DbGame: React.FC<DbGameProps> = ({ onComplete }) => {
  const [level, setLevel] = useState(0);
  const [currentMw, setCurrentMw] = useState(LEVELS[0].startMw);
  const [history, setHistory] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const currentLevel = LEVELS[level];

  useEffect(() => {
    if (isLevelComplete(currentMw, currentLevel.targetMw)) {
      setShowSuccess(true);
      setTimeout(() => {
        if (level < LEVELS.length - 1) {
          setLevel(l => l + 1);
          setHistory([]);
          setShowSuccess(false);
        } else {
          onComplete();
        }
      }, 1500);
    }
  }, [currentMw, currentLevel, level, onComplete]);

  // Reset when level changes
  useEffect(() => {
    setCurrentMw(LEVELS[level].startMw);
  }, [level]);

  const handleApplyDb = (db: number) => {
    const label = db > 0 ? `+${db} dB` : `${db} dB`;
    setCurrentMw(applyDb(currentMw, db));
    setHistory([...history, label]);
  };

  const resetLevel = () => {
    setCurrentMw(currentLevel.startMw);
    setHistory([]);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 text-slate-900 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Calculator className="w-5 h-5 text-brand-600" />
            RF Math Challenge <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">Lvl {level + 1}/{LEVELS.length}</span>
          </h3>
          <p className="text-slate-500 text-sm">Use the Rule of 3s and 10s to match the target power.</p>
        </div>
        <button onClick={resetLevel} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
           <RefreshCw className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      <ObservationBlock title="System Intuition">
        Notice how a small number like <strong>-3 dB</strong> cuts your actual power in half. 
        In the field, a 3 dB mismatch between AP and Client causes "One-Way Audio" (you can hear them, they can't hear you).
      </ObservationBlock>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
         <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col items-center justify-center relative shadow-inner">
            <div className="text-xs text-slate-400 uppercase tracking-widest mb-2">Current Power</div>
            <div className={`text-4xl font-mono font-bold transition-all ${showSuccess ? 'text-green-600 scale-110' : 'text-slate-900'}`}>
               {currentMw} <span className="text-lg text-slate-400">mW</span>
            </div>
            {history.length > 0 && (
               <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-brand-600 font-mono">
                  {LEVELS[level].startMw} {history.map(h => ` ${h}`)}
               </div>
            )}
         </div>

         <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col items-center justify-center shadow-inner">
            <div className="text-xs text-slate-400 uppercase tracking-widest mb-2">Target Power</div>
            <div className="text-4xl font-mono font-bold text-brand-600">
               {currentLevel.targetMw} <span className="text-lg text-slate-400">mW</span>
            </div>
         </div>
      </div>

      {showSuccess ? (
         <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center animate-pulse">
            <div className="text-green-700 font-bold text-xl flex items-center justify-center gap-2">
               <CheckCircle2 className="w-6 h-6" /> Target Acquired!
            </div>
         </div>
      ) : (
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button onClick={() => handleApplyDb(3)} className="bg-white hover:bg-slate-50 border-b-4 border-slate-200 active:border-b-0 active:translate-y-1 p-4 rounded-xl font-bold text-lg transition-all border border-slate-100 shadow-sm text-slate-700">
               +3 dB
               <div className="text-[10px] text-slate-400 font-normal">Double (x2)</div>
            </button>
            <button onClick={() => handleApplyDb(-3)} className="bg-white hover:bg-slate-50 border-b-4 border-slate-200 active:border-b-0 active:translate-y-1 p-4 rounded-xl font-bold text-lg transition-all border border-slate-100 shadow-sm text-slate-700">
               -3 dB
               <div className="text-[10px] text-slate-400 font-normal">Halve (/2)</div>
            </button>
            <button onClick={() => handleApplyDb(10)} className="bg-white hover:bg-slate-50 border-b-4 border-slate-200 active:border-b-0 active:translate-y-1 p-4 rounded-xl font-bold text-lg transition-all border border-slate-100 shadow-sm text-slate-700">
               +10 dB
               <div className="text-[10px] text-slate-400 font-normal">Tenfold (x10)</div>
            </button>
            <button onClick={() => handleApplyDb(-10)} className="bg-white hover:bg-slate-50 border-b-4 border-slate-200 active:border-b-0 active:translate-y-1 p-4 rounded-xl font-bold text-lg transition-all border border-slate-100 shadow-sm text-slate-700">
               -10 dB
               <div className="text-[10px] text-slate-400 font-normal">Tenth (/10)</div>
            </button>
         </div>
      )}
    </div>
  );
};

export default DbGame;
